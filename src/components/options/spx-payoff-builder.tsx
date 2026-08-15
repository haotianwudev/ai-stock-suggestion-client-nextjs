"use client";
import { useEffect, useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { PayoffChartView } from './payoff-chart-view';
import { OptionChainSnapshot, ExpirationChain, ChainContract } from '@/lib/options/chain-types';
import { OptionLeg, legsPnL, netPremium, findBreakevens } from '@/lib/options/payoff';
import { getChainSnapshot, getLiveChainSnapshot } from '@/lib/options/chain-provider';
import { nearestExpiration } from '@/lib/options/select-default-legs';
import { STRATEGY_PRESETS, buildPresetLegs } from '@/lib/options/presets';
import {
    SPX_MULTIPLIER, SPX_DEFAULT_RATE, SPX_DEFAULT_DIV_YIELD,
    solveImpliedVol, positionValueAt, netGreeks, probabilityOfProfit, PricedLeg
} from '@/lib/options/analytics';

type Source = 'historical' | 'live';

function contractsFor(chain: ExpirationChain, type: 'call' | 'put'): ChainContract[] {
    return type === 'call' ? chain.calls : chain.puts;
}

function nearestByStrike(contracts: ChainContract[], spot: number): ChainContract {
    return contracts.reduce((best, c) => Math.abs(c.strike - spot) < Math.abs(best.strike - spot) ? c : best);
}

let legIdCounter = 0;
interface EditableLeg extends OptionLeg {
    _id: number;
}
const withIds = (legs: OptionLeg[]): EditableLeg[] => legs.map(l => ({ ...l, _id: legIdCounter++ }));

const fmtSigned = (v: number) => `${v >= 0 ? '+' : '-'}$${Math.abs(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtPct = (v: number) => `${(v * 100).toFixed(1)}%`;

export interface SpxPayoffBuilderProps {
    /** Which preset to start from. Defaults to Iron Condor (the Options Viewer tab's usage). */
    initialPresetId?: string;
    /** Hides the preset <select>, showing the preset name as static text instead — for a
     * strategy's own page, where switching away from being e.g. a Long Call would be confusing. */
    lockPreset?: boolean;
    /** DTE target for the initial expiration pick (default 45). Set higher for LEAPS framing. */
    initialExpirationTargetDte?: number;
}

/**
 * Professional-grade, SPX-only payoff builder: any number of legs, any preset from presets.ts,
 * real chain data from either source, net Greeks, solved IV, probability of profit, and a T+0
 * curve alongside the expiration payoff. SPX is unambiguous on contract size (multiplier 100)
 * and settlement (European, no assignment modelling) — the reason this tool doesn't generalize
 * to arbitrary tickers. Mounted both in the Options Viewer tab (unlocked, browse any preset) and
 * on individual Strategy Explorer pages (locked to that strategy's own preset).
 */
export const SpxPayoffBuilder = ({ initialPresetId = 'iron_condor', lockPreset = false, initialExpirationTargetDte = 45 }: SpxPayoffBuilderProps = {}) => {
    const [source, setSource] = useState<Source>('historical');
    const [snapshot, setSnapshot] = useState<OptionChainSnapshot | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [presetId, setPresetId] = useState(initialPresetId);
    const [expiration, setExpiration] = useState<string>('');
    const [legs, setLegs] = useState<EditableLeg[]>([]);
    const [ratePct, setRatePct] = useState(SPX_DEFAULT_RATE * 100);
    const [divYieldPct, setDivYieldPct] = useState(SPX_DEFAULT_DIV_YIELD * 100);

    const loadSource = (next: Source, forceRefresh: boolean = false) => {
        setSource(next);
        setLoading(true);
        setError(null);
        const fetcher = next === 'historical' ? getChainSnapshot(forceRefresh) : getLiveChainSnapshot('^SPX', forceRefresh);
        fetcher
            .then(s => {
                setSnapshot(s);
                const exp = nearestExpiration(s.expirations, initialExpirationTargetDte).expiration;
                setExpiration(exp);
            })
            .catch(e => setError(e instanceof Error ? e.message : 'Failed to load chain data'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadSource('historical'); /* eslint-disable-line react-hooks/exhaustive-deps */ }, []);

    const chain = useMemo<ExpirationChain | null>(() => {
        if (!snapshot) return null;
        return snapshot.expirations.find(e => e.expiration === expiration) ?? snapshot.expirations[0] ?? null;
    }, [snapshot, expiration]);

    const preset = STRATEGY_PRESETS.find(p => p.id === presetId)!;

    // Rebuild legs from the preset whenever the preset or the underlying chain (expiration or
    // data source) changes. Manual per-leg edits below don't fight this — they only apply between
    // rebuilds.
    useEffect(() => {
        if (!chain || !snapshot) return;
        setLegs(withIds(buildPresetLegs(chain, preset, snapshot.underlyingPrice)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain, presetId]);

    const updateLeg = (id: number, patch: Partial<OptionLeg>) => {
        setLegs(prev => prev.map(l => l._id === id ? { ...l, ...patch } : l));
    };
    const removeLeg = (id: number) => setLegs(prev => prev.filter(l => l._id !== id));
    const addLeg = () => {
        if (!chain || !snapshot) return;
        const c = nearestByStrike(chain.calls, snapshot.underlyingPrice);
        setLegs(prev => [...prev, { _id: legIdCounter++, type: 'call', side: 'long', strike: c.strike, premium: c.mid }]);
    };

    const T = chain ? chain.dte / 365 : 0;
    const r = ratePct / 100;
    const q = divYieldPct / 100;

    // Prefer the chain's precomputed IV (export_spx_chain_sample.py) — it's a lookup, not a
    // solve, so long as the leg's premium still matches that contract's real mid. A hand-edited
    // premium genuinely implies a different IV, so it's re-solved live, same as data sources
    // (e.g. the live feed) that don't carry a precomputed value at all.
    const pricedLegs: PricedLeg[] = useMemo(() => {
        if (!snapshot || !chain || T <= 0) return [];
        return legs.map(leg => {
            const contract = contractsFor(chain, leg.type).find(c => c.strike === leg.strike);
            const premiumUnedited = contract && Math.abs(contract.mid - leg.premium) < 0.005;
            const iv = (premiumUnedited && contract.iv != null)
                ? contract.iv
                : solveImpliedVol(leg.premium, snapshot.underlyingPrice, leg.strike, T, r, q, leg.type);
            return { ...leg, iv };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [legs, chain, snapshot, T, r, q]);

    const { labels, payoffData, overlayData } = useMemo(() => {
        if (!snapshot) return { labels: [] as number[], payoffData: [] as number[], overlayData: [] as number[] };
        const center = snapshot.underlyingPrice;
        const points = Array.from({ length: 61 }, (_, i) => center * 0.85 + i * ((center * 0.30) / 60));
        return {
            labels: points,
            payoffData: points.map(p => legsPnL(p, legs) * SPX_MULTIPLIER),
            overlayData: T > 0 ? points.map(p => positionValueAt(p, pricedLegs, T, r, q) * SPX_MULTIPLIER) : [],
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [legs, pricedLegs, snapshot, T, r, q]);

    const breakevens = useMemo(() => findBreakevens(labels, payoffData), [labels, payoffData]);

    const greeks = useMemo(() => {
        if (!snapshot || T <= 0 || pricedLegs.length === 0) return null;
        return netGreeks(pricedLegs, snapshot.underlyingPrice, T, r, q);
    }, [pricedLegs, snapshot, T, r, q]);

    const pop = useMemo(() => {
        if (!snapshot || T <= 0 || legs.length === 0) return null;
        const atmCall = nearestByStrike(chain!.calls, snapshot.underlyingPrice);
        const atmPut = nearestByStrike(chain!.puts, snapshot.underlyingPrice);
        const atmIV = (
            (atmCall.iv ?? solveImpliedVol(atmCall.mid, snapshot.underlyingPrice, atmCall.strike, T, r, q, 'call')) +
            (atmPut.iv ?? solveImpliedVol(atmPut.mid, snapshot.underlyingPrice, atmPut.strike, T, r, q, 'put'))
        ) / 2;
        return probabilityOfProfit(p => legsPnL(p, legs), breakevens, snapshot.underlyingPrice, T, r, q, atmIV);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [legs, breakevens, snapshot, chain, T, r, q]);

    const netCredit = useMemo(() => netPremium(legs) * SPX_MULTIPLIER, [legs]);
    const riskReward = useMemo(() => {
        if (payoffData.length === 0) return null;
        const maxP = Math.max(...payoffData), maxL = Math.min(...payoffData);
        return maxL < 0 ? Math.abs(maxP / maxL) : null;
    }, [payoffData]);

    // Derived from the actual payoff curve's slope at its right (high-price) edge, not the preset
    // — a preset only picks legs, an edited/custom leg set can be genuinely unbounded regardless
    // of what preset built it (e.g. Long Straddle's call leg). Rising into the edge = the call
    // side is naked/net-long and profit keeps growing without limit; falling = it's naked
    // short and loss keeps growing. Flat = capped by a longer call further out. The left (low-
    // price) edge is never claimed unlimited even when it looks that way in this ±15% window —
    // SPX can't go below 0, so downside is always bounded, same convention as Put Writing
    // elsewhere on this site (shown as a large-but-finite number, not "Unlimited").
    const riskProfile = useMemo(() => {
        if (payoffData.length < 2) return 'Defined Risk, Defined Profit';
        const rightSlope = payoffData[payoffData.length - 1] - payoffData[payoffData.length - 2];
        const threshold = 0.5; // dollars/sample-step; filters float noise on a genuinely flat tail
        if (rightSlope > threshold) return 'Defined Risk, Unlimited Profit';
        if (rightSlope < -threshold) return 'Unlimited Risk, Defined Profit';
        return 'Defined Risk, Defined Profit';
    }, [payoffData]);

    if (loading && !snapshot) {
        return <p className="text-sm text-gray-500 py-8 text-center">Loading SPX chain data…</p>;
    }
    if (error && !snapshot) {
        return <p className="text-sm text-red-600 py-8 text-center">{error}</p>;
    }
    if (!snapshot || !chain) return null;

    return (
        <div className="space-y-4">
            {/* Source toggle */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden text-sm">
                    {(['historical', 'live'] as Source[]).map(s => (
                        <button
                            key={s}
                            onClick={() => s !== source && loadSource(s)}
                            className={`px-3 py-1.5 font-medium transition-colors ${
                                source === s
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                            }`}
                        >
                            {s === 'historical' ? `Historical (${snapshot.quoteDate})` : 'Live ^SPX'}
                        </button>
                    ))}
                </div>
                {loading && <span className="text-xs text-gray-500">Loading…</span>}
                {error && <span className="text-xs text-red-600">{error} — showing last loaded data.</span>}
                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-gray-500">Spot: ${snapshot.underlyingPrice.toLocaleString()}</span>
                    {source === 'live' && (
                        <button
                            onClick={() => loadSource('live', true)}
                            disabled={loading}
                            title="Refresh live SPX quotes"
                            className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    )}
                </div>
            </div>

            {/* Preset + expiration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Preset</label>
                    {lockPreset ? (
                        <div className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700 font-medium">
                            {preset.label}
                        </div>
                    ) : (
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                            value={presetId}
                            onChange={e => setPresetId(e.target.value)}
                        >
                            {STRATEGY_PRESETS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                        </select>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Expiration</label>
                    <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                        value={expiration}
                        onChange={e => setExpiration(e.target.value)}
                    >
                        {snapshot.expirations.map(e => (
                            <option key={e.expiration} value={e.expiration}>{e.expiration} ({e.dte} DTE)</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Leg table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                        <tr>
                            <th className="text-left px-3 py-2">Side</th>
                            <th className="text-left px-3 py-2">Qty</th>
                            <th className="text-left px-3 py-2">Type</th>
                            <th className="text-left px-3 py-2">Strike</th>
                            <th className="text-left px-3 py-2">Price</th>
                            <th className="text-left px-3 py-2">IV</th>
                            <th className="text-left px-3 py-2">Delta</th>
                            <th className="px-3 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {legs.map((leg, i) => {
                            const contracts = contractsFor(chain, leg.type);
                            const selected = contracts.find(c => c.strike === leg.strike);
                            // pricedLegs is derived from legs via map(), same order/length, so index correlation is safe.
                            const priced = pricedLegs[i];
                            return (
                                <tr key={leg._id}>
                                    <td className="px-3 py-2">
                                        <select
                                            className="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                                            value={leg.side}
                                            onChange={e => updateLeg(leg._id, { side: e.target.value as 'long' | 'short' })}
                                        >
                                            <option value="long">Buy</option>
                                            <option value="short">Sell</option>
                                        </select>
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="number" min={1}
                                            className="w-14 border border-gray-300 rounded px-2 py-1 text-xs"
                                            value={leg.quantity ?? 1}
                                            onChange={e => updateLeg(leg._id, { quantity: Math.max(1, Number(e.target.value) || 1) })}
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <select
                                            className="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                                            value={leg.type}
                                            onChange={e => {
                                                const type = e.target.value as 'call' | 'put';
                                                const c = nearestByStrike(contractsFor(chain, type), leg.strike);
                                                updateLeg(leg._id, { type, strike: c.strike, premium: c.mid });
                                            }}
                                        >
                                            <option value="call">Call</option>
                                            <option value="put">Put</option>
                                        </select>
                                    </td>
                                    <td className="px-3 py-2">
                                        <select
                                            className="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                                            value={leg.strike}
                                            onChange={e => {
                                                const c = contracts.find(c => c.strike === Number(e.target.value));
                                                if (c) updateLeg(leg._id, { strike: c.strike, premium: c.mid });
                                            }}
                                        >
                                            {contracts.map(c => (
                                                <option key={c.strike} value={c.strike}>
                                                    {c.strike} (Δ{Math.abs(c.delta).toFixed(2)}{c.iv != null ? `, IV ${(c.iv * 100).toFixed(1)}%` : ''}, mid ${c.mid.toFixed(2)})
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="number" step={0.01}
                                            className="w-20 border border-gray-300 rounded px-2 py-1 text-xs"
                                            value={leg.premium}
                                            onChange={e => updateLeg(leg._id, { premium: Number(e.target.value) || 0 })}
                                        />
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{priced ? fmtPct(priced.iv) : '—'}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{selected ? Math.abs(selected.delta).toFixed(2) : '—'}</td>
                                    <td className="px-3 py-2">
                                        <button onClick={() => removeLeg(leg._id)} className="text-xs text-red-600 hover:text-red-800" aria-label="Remove leg">✕</button>
                                    </td>
                                </tr>
                            );
                        })}
                        {legs.length === 0 && (
                            <tr><td colSpan={8} className="px-3 py-4 text-center text-xs text-gray-500">No legs — add one below.</td></tr>
                        )}
                    </tbody>
                </table>
                <button onClick={addLeg} className="w-full text-xs font-medium text-blue-600 hover:bg-blue-50 py-2 border-t border-gray-200">+ Add leg</button>
            </div>

            {/* Assumptions */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                <label className="flex items-center gap-1.5">
                    Rate
                    <input type="number" step={0.1} className="w-16 border border-gray-300 rounded px-2 py-1" value={ratePct} onChange={e => setRatePct(Number(e.target.value) || 0)} />%
                </label>
                <label className="flex items-center gap-1.5">
                    Div yield
                    <input type="number" step={0.1} className="w-16 border border-gray-300 rounded px-2 py-1" value={divYieldPct} onChange={e => setDivYieldPct(Number(e.target.value) || 0)} />%
                </label>
                <span className="text-gray-400">Position size in $ = per-contract × 100 (SPX multiplier).</span>
            </div>

            {/* Chart + stats */}
            {legs.length > 0 && (
                <PayoffChartView
                    labels={labels}
                    payoffData={payoffData}
                    profile={riskProfile}
                    overlaySeries={overlayData.length ? { label: 'Value Today (T+0)', data: overlayData } : undefined}
                    additionalStats={[
                        // netCredit already carries the right sign (netPremium: +credit/-debit) —
                        // a debit reads as a cost ("-$X"), not a gain, so it isn't abs()'d away.
                        { tone: netCredit >= 0 ? 'good' : 'neutral', label: netCredit >= 0 ? 'Net Credit' : 'Net Debit', value: fmtSigned(netCredit) },
                        ...(riskReward !== null ? [{ tone: 'neutral' as const, label: 'Risk/Reward', value: `1 : ${riskReward.toFixed(2)}` }] : []),
                        ...(pop !== null ? [{ tone: 'neutral' as const, label: 'Prob. of Profit', value: fmtPct(pop) }] : []),
                        ...(greeks ? [
                            { tone: 'neutral' as const, label: 'Δ Delta', value: greeks.delta.toFixed(2) },
                            { tone: 'neutral' as const, label: 'Γ Gamma', value: greeks.gamma.toFixed(4) },
                            { tone: greeks.theta >= 0 ? 'good' as const : 'critical' as const, label: 'Θ Theta/day', value: fmtSigned(greeks.theta) },
                            { tone: greeks.vega >= 0 ? 'good' as const : 'critical' as const, label: 'V Vega', value: fmtSigned(greeks.vega) },
                        ] : []),
                    ]}
                />
            )}
        </div>
    );
};
