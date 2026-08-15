"use client";
import { useEffect, useMemo, useState } from 'react';
import type { Strategy } from './strategy-config';
import { PayoffChartView } from './payoff-chart-view';
import { OptionChainSnapshot, ExpirationChain, ChainContract } from '@/lib/options/chain-types';
import { OptionLeg, legsPnL } from '@/lib/options/payoff';
import { getChainSnapshot } from '@/lib/options/chain-provider';
import { selectDefaultIronCondorLegs, nearestExpiration } from '@/lib/options/select-default-legs';

type LegRole = 'longPut' | 'shortPut' | 'shortCall' | 'longCall';

const LEG_ROLES: { role: LegRole; label: string; type: 'call' | 'put'; side: 'long' | 'short' }[] = [
    { role: 'longPut', label: 'Long Put (protection)', type: 'put', side: 'long' },
    { role: 'shortPut', label: 'Short Put', type: 'put', side: 'short' },
    { role: 'shortCall', label: 'Short Call', type: 'call', side: 'short' },
    { role: 'longCall', label: 'Long Call (protection)', type: 'call', side: 'long' },
];

function legsFromDefaults(legs: OptionLeg[]): Record<LegRole, OptionLeg> {
    const [longPut, shortPut, shortCall, longCall] = legs;
    return { longPut, shortPut, shortCall, longCall };
}

function contractsFor(chain: ExpirationChain, type: 'call' | 'put'): ChainContract[] {
    return type === 'call' ? chain.calls : chain.puts;
}

/**
 * The interactive 4-leg Iron Condor builder UI. Takes a chain snapshot as a prop rather than
 * fetching one itself, so it works identically whether that snapshot came from the historical
 * sample (IronCondorBuilder below) or a live feed (Options Viewer's "Build Iron Condor" tab).
 */
export const IronCondorLegPicker = ({ snapshot, profile }: { snapshot: OptionChainSnapshot; profile: string }) => {
    const [expiration, setExpiration] = useState(() => nearestExpiration(snapshot.expirations).expiration);
    const chain = useMemo(
        () => snapshot.expirations.find(e => e.expiration === expiration) ?? snapshot.expirations[0],
        [snapshot, expiration]
    );
    const [legs, setLegs] = useState<Record<LegRole, OptionLeg>>(() => legsFromDefaults(selectDefaultIronCondorLegs(chain)));

    // Re-derive sensible defaults whenever the expiration (and thus the whole strike chain) changes.
    useEffect(() => {
        setLegs(legsFromDefaults(selectDefaultIronCondorLegs(chain)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expiration]);

    const legList = useMemo(() => Object.values(legs), [legs]);

    const { labels, payoffData } = useMemo(() => {
        const center = snapshot.underlyingPrice;
        const points = Array.from({ length: 61 }, (_, i) => center * 0.85 + i * ((center * 0.30) / 60));
        return {
            labels: points,
            payoffData: points.map(p => legsPnL(p, legList)),
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [legList, snapshot.underlyingPrice]);

    const handleLegChange = (role: LegRole, strike: number) => {
        const spec = LEG_ROLES.find(r => r.role === role)!;
        const contract = contractsFor(chain, spec.type).find(c => c.strike === strike);
        if (!contract) return;
        setLegs(prev => ({ ...prev, [role]: { type: spec.type, side: spec.side, strike: contract.strike, premium: contract.mid } }));
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Expiration</label>
                <select
                    className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                    value={expiration}
                    onChange={e => setExpiration(e.target.value)}
                >
                    {snapshot.expirations.map(e => (
                        <option key={e.expiration} value={e.expiration}>{e.expiration} ({e.dte} DTE)</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {LEG_ROLES.map(spec => {
                    const leg = legs[spec.role];
                    const contracts = contractsFor(chain, spec.type);
                    return (
                        <div key={spec.role}>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{spec.label}</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                                value={leg.strike}
                                onChange={e => handleLegChange(spec.role, Number(e.target.value))}
                            >
                                {contracts.map(c => (
                                    <option key={c.strike} value={c.strike}>
                                        {c.strike} &nbsp;(Δ{Math.abs(c.delta).toFixed(2)}, mid ${c.mid.toFixed(2)})
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>

            <PayoffChartView labels={labels} payoffData={payoffData} profile={profile} />
        </div>
    );
};

/** Strategy Explorer wrapper: fetches the historical SPX chain sample, then renders the picker. */
export const IronCondorBuilder = ({ strategy }: { strategy: Strategy }) => {
    const [snapshot, setSnapshot] = useState<OptionChainSnapshot | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getChainSnapshot().then(setSnapshot).catch(e => setError(e instanceof Error ? e.message : 'Failed to load chain data'));
    }, []);

    if (error) {
        return <p className="text-sm text-red-600">{error}</p>;
    }
    if (!snapshot) {
        return <p className="text-sm text-gray-500">Loading real SPX chain data…</p>;
    }
    return <IronCondorLegPicker snapshot={snapshot} profile={strategy.profile} />;
};
