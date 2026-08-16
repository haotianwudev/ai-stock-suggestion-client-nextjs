"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw, ChevronDown, Settings2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/hooks/use-user';
import { canAccessLiveOptions, MIN_LIVE_OPTIONS_TIER } from '@/lib/tiers';
import { getPreferredOptionSource } from '@/lib/options/options-preferences';
import { PayoffChartView } from './payoff-chart-view';
import { ProbabilityRangeView, ProbabilityMarker } from './probability-range-view';
import { OptionChainSnapshot, ExpirationChain, ChainContract } from '@/lib/options/chain-types';
import { OptionLeg, legsPnL, netPremium, findBreakevens } from '@/lib/options/payoff';
import { getChainSnapshot, getLiveChainSnapshot } from '@/lib/options/chain-provider';
import { nearestExpiration } from '@/lib/options/select-default-legs';
import { STRATEGY_PRESETS, buildPresetLegs } from '@/lib/options/presets';
import {
    SPX_MULTIPLIER, SPX_DEFAULT_RATE, SPX_DEFAULT_DIV_YIELD,
    solveImpliedVol, positionValueAt, netGreeks, probabilityOfProfit, impliedPriceRange, impliedBoundaryPrice, PricedLeg
} from '@/lib/options/analytics';

type Source = 'historical' | 'live';

function contractsFor(chain: ExpirationChain, type: 'call' | 'put'): ChainContract[] {
    return type === 'call' ? chain.calls : chain.puts;
}

function nearestByStrike(contracts: ChainContract[], spot: number): ChainContract {
    return contracts.reduce((best, c) => Math.abs(c.strike - spot) < Math.abs(best.strike - spot) ? c : best);
}

function nearestByDelta(contracts: ChainContract[], targetAbsDelta: number): ChainContract {
    return contracts.reduce((best, c) => Math.abs(Math.abs(c.delta) - targetAbsDelta) < Math.abs(Math.abs(best.delta) - targetAbsDelta) ? c : best);
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
    const { profile } = useUser();
    const userTier = profile?.tier ?? 1;
    const isTier4Plus = canAccessLiveOptions(userTier);

    const [source, setSource] = useState<Source>(() => getPreferredOptionSource(userTier));
    const [snapshot, setSnapshot] = useState<OptionChainSnapshot | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [presetId, setPresetId] = useState(initialPresetId);
    const [expiration, setExpiration] = useState<string>('');
    const [legs, setLegs] = useState<EditableLeg[]>([]);
    const [ratePct, setRatePct] = useState(SPX_DEFAULT_RATE * 100);
    const [divYieldPct, setDivYieldPct] = useState(SPX_DEFAULT_DIV_YIELD * 100);
    // True once the user hand-edits a leg (side/qty/type/strike/premium, add, or remove) — while
    // dirty, switching expiration or data source remaps existing legs onto the new chain instead
    // of discarding them via a full preset rebuild. Switching preset always rebuilds and clears it.
    const [dirty, setDirty] = useState(false);
    const [addMenuOpen, setAddMenuOpen] = useState(false);
    const [assumptionsOpen, setAssumptionsOpen] = useState(false);
    const [analysisTab, setAnalysisTab] = useState<'payoff' | 'probability'>('payoff');

    const loadSource = (next: Source, forceRefresh: boolean = false) => {
        if (next === 'live' && !canAccessLiveOptions(userTier)) {
            toast.error(`Live Real-Time SPX options data is exclusive to Senior Quant (Tier ${MIN_LIVE_OPTIONS_TIER}+).`);
            return;
        }
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

    useEffect(() => {
        const initial = getPreferredOptionSource(userTier);
        loadSource(initial);
        /* eslint-disable-line react-hooks/exhaustive-deps */
    }, [userTier]);

    const chain = useMemo<ExpirationChain | null>(() => {
        if (!snapshot) return null;
        return snapshot.expirations.find(e => e.expiration === expiration) ?? snapshot.expirations[0] ?? null;
    }, [snapshot, expiration]);

    const preset = STRATEGY_PRESETS.find(p => p.id === presetId)!;
    const prevPresetIdRef = useRef(presetId);

    // Rebuild legs from the preset whenever the preset changes (always) or the chain changes
    // (expiration/source) while the user hasn't hand-edited anything yet. Once dirty, a chain
    // change instead remaps each existing leg onto the new chain (nearest strike, refreshed
    // premium) so manual edits survive switching expiration — only switching preset discards them,
    // since that's an explicit "start over" action.
    useEffect(() => {
        if (!chain || !snapshot) return;
        const presetChanged = prevPresetIdRef.current !== presetId;
        prevPresetIdRef.current = presetId;

        if (presetChanged || !dirty) {
            setLegs(withIds(buildPresetLegs(chain, preset, snapshot.underlyingPrice)));
            setDirty(false);
            return;
        }

        setLegs(prev => prev.map(leg => {
            if (leg.type === 'stock') return leg; // entry price is fixed at when it was "bought", not remapped to the new snapshot's spot
            const nearest = nearestByStrike(contractsFor(chain, leg.type), leg.strike);
            return { ...leg, strike: nearest.strike, premium: nearest.mid };
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain, presetId]);

    const resetToPreset = () => {
        if (!chain || !snapshot) return;
        setLegs(withIds(buildPresetLegs(chain, preset, snapshot.underlyingPrice)));
        setDirty(false);
    };

    const updateLeg = (id: number, patch: Partial<OptionLeg>) => {
        setDirty(true);
        setLegs(prev => prev.map(l => l._id === id ? { ...l, ...patch } : l));
    };
    const removeLeg = (id: number) => {
        setDirty(true);
        setLegs(prev => prev.filter(l => l._id !== id));
    };
    const addLeg = (type: 'call' | 'put' | 'stock') => {
        if (!chain || !snapshot) return;
        setDirty(true);
        setAddMenuOpen(false);
        if (type === 'stock') {
            setLegs(prev => [...prev, { _id: legIdCounter++, type: 'stock', side: 'long', strike: snapshot.underlyingPrice, premium: 0 }]);
            return;
        }
        const c = nearestByStrike(contractsFor(chain, type), snapshot.underlyingPrice);
        setLegs(prev => [...prev, { _id: legIdCounter++, type, side: 'long', strike: c.strike, premium: c.mid }]);
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
            if (leg.type === 'stock') return { ...leg, iv: 0 }; // no volatility concept for a stock leg
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

    // Shared by the probability-of-profit calc below and the implied-probability-range panel —
    // both need "the market's own volatility view for this expiration," not a per-leg one.
    const atmIV = useMemo(() => {
        if (!snapshot || !chain || T <= 0) return null;
        const atmCall = nearestByStrike(chain.calls, snapshot.underlyingPrice);
        const atmPut = nearestByStrike(chain.puts, snapshot.underlyingPrice);
        return (
            (atmCall.iv ?? solveImpliedVol(atmCall.mid, snapshot.underlyingPrice, atmCall.strike, T, r, q, 'call')) +
            (atmPut.iv ?? solveImpliedVol(atmPut.mid, snapshot.underlyingPrice, atmPut.strike, T, r, q, 'put'))
        ) / 2;
    }, [snapshot, chain, T, r, q]);

    // 25-delta risk reversal: the market's own skew reading for this expiration — how much richer
    // (or cheaper) the ~25-delta put trades vs the ~25-delta call. Positive means put skew (the
    // normal equity-index shape: crash protection bid up); this is real chain IV, not a model.
    const skew25Delta = useMemo(() => {
        if (!chain) return null;
        const call25 = nearestByDelta(chain.calls, 0.25);
        const put25 = nearestByDelta(chain.puts, 0.25);
        if (call25.iv == null || put25.iv == null) return null;
        return { callIV: call25.iv, putIV: put25.iv, riskReversal: put25.iv - call25.iv };
    }, [chain]);

    // Skew-aware (asymmetric) counterpart to the flat impliedPriceRange shown in the probability
    // panel: instead of one ATM IV on both sides, each boundary is repriced using the real market
    // IV of the nearest strike to it, iterated a few times to a smile-consistent fixed point (the
    // smile is smooth enough that this converges in 2-3 steps). Verified against real chain data:
    // produces the expected equity-index shape (wider downside, tighter upside) with smooth,
    // sensible numbers — unlike inverting the raw Breeden-Litzenberger density directly, which is
    // far too noisy (real market quotes) to use for a "suggested boundary" a user might act on.
    const skewAdjustedRanges = useMemo(() => {
        if (!chain || !snapshot || atmIV === null || T <= 0) return null;
        const spot = snapshot.underlyingPrice;
        const computeFor = (confidence: number) => {
            let upper = impliedBoundaryPrice(spot, T, r, q, atmIV, confidence, 'upper');
            let lower = impliedBoundaryPrice(spot, T, r, q, atmIV, confidence, 'lower');
            for (let i = 0; i < 4; i++) {
                const callIV = nearestByStrike(chain.calls, upper).iv ?? atmIV;
                const putIV = nearestByStrike(chain.puts, lower).iv ?? atmIV;
                upper = impliedBoundaryPrice(spot, T, r, q, callIV, confidence, 'upper');
                lower = impliedBoundaryPrice(spot, T, r, q, putIV, confidence, 'lower');
            }
            return { lower, upper };
        };
        return { r68: computeFor(0.68), r80: computeFor(0.80) };
    }, [chain, snapshot, atmIV, T, r, q]);

    const pop = useMemo(() => {
        if (!snapshot || T <= 0 || legs.length === 0 || atmIV === null) return null;
        return probabilityOfProfit(p => legsPnL(p, legs), breakevens, snapshot.underlyingPrice, T, r, q, atmIV);
    }, [legs, breakevens, snapshot, T, r, q, atmIV]);

    const netCredit = useMemo(() => netPremium(legs) * SPX_MULTIPLIER, [legs]);
    const riskReward = useMemo(() => {
        if (payoffData.length === 0) return null;
        const maxP = Math.max(...payoffData), maxL = Math.min(...payoffData);
        return maxL < 0 ? Math.abs(maxP / maxL) : null;
    }, [payoffData]);

    // Marks each option leg's own strike on the probability-range plot, so it's visible at a
    // glance whether e.g. an Iron Condor's short strikes sit inside or outside the 68%/80% band.
    // Short legs (the ones actually defining a strategy's range) are colored distinctly from
    // long/protective legs.
    const probabilityMarkers: ProbabilityMarker[] = useMemo(() => legs
        .filter(l => l.type !== 'stock')
        .map(l => ({
            price: l.strike,
            label: `${l.side === 'short' ? 'Short' : 'Long'} ${l.type === 'call' ? 'Call' : 'Put'}`,
            color: l.side === 'short' ? '#f59e0b' : '#94a3b8',
        })), [legs]);

    // Only presets whose two SHORT legs are the ones defining the expected range — Iron
    // Condor/Short Strangle. Iron Butterfly/Short Straddle's short legs are both at-the-money by
    // construction (no range to move them to); other presets don't have a symmetric pair at all.
    const canSnapToBoundary = presetId === 'iron_condor' || presetId === 'short_strangle';
    const snapToBoundary = (confidence: number) => {
        if (!chain || !snapshot || atmIV === null) return;
        const { lower, upper } = impliedPriceRange(snapshot.underlyingPrice, T, r, q, atmIV, confidence);
        setDirty(true);
        setLegs(prev => prev.map(leg => {
            if (leg.side !== 'short') return leg;
            if (leg.type === 'put') {
                const nearest = nearestByStrike(chain.puts, lower);
                return { ...leg, strike: nearest.strike, premium: nearest.mid };
            }
            if (leg.type === 'call') {
                const nearest = nearestByStrike(chain.calls, upper);
                return { ...leg, strike: nearest.strike, premium: nearest.mid };
            }
            return leg;
        }));
    };

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
                    {(['historical', 'live'] as Source[]).map(s => {
                        const isLive = s === 'live';
                        return (
                            <button
                                key={s}
                                onClick={() => {
                                    if (isLive && !isTier4Plus) {
                                        toast.error(`Live Real-Time SPX options data is exclusive to Senior Quant (Tier ${MIN_LIVE_OPTIONS_TIER}+).`);
                                        return;
                                    }
                                    if (s !== source) loadSource(s);
                                }}
                                className={`flex items-center gap-1 px-3 py-1.5 font-medium transition-colors ${
                                    source === s
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : isLive && !isTier4Plus
                                        ? 'bg-white text-gray-400 hover:bg-gray-50'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                                title={isLive && !isTier4Plus ? `Requires Tier ${MIN_LIVE_OPTIONS_TIER} (Senior Quant)` : undefined}
                            >
                                {isLive && !isTier4Plus && <Lock className="h-3 w-3 text-amber-500" />}
                                <span>{s === 'historical' ? `Historical (${snapshot.quoteDate})` : 'Live ^SPX'}</span>
                                {isLive && !isTier4Plus && (
                                    <span className="text-[9px] px-1 py-0 border border-amber-400/40 text-amber-600 bg-amber-50 rounded">
                                        Tier 4+
                                    </span>
                                )}
                            </button>
                        );
                    })}
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
                    <div className="relative">
                        <button
                            onClick={() => setAssumptionsOpen(v => !v)}
                            title="Pricing assumptions (rate, dividend yield)"
                            className={`p-1 rounded transition-colors ${assumptionsOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600 hover:bg-gray-100'}`}
                        >
                            <Settings2 className="h-3.5 w-3.5" />
                        </button>
                        {assumptionsOpen && (
                            <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-56 text-xs space-y-2.5">
                                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Pricing Assumptions</p>
                                <label className="flex items-center justify-between gap-2">
                                    Rate
                                    <span className="flex items-center gap-1">
                                        <input type="number" step={0.1} className="w-16 border border-gray-300 rounded px-2 py-1" value={ratePct} onChange={e => setRatePct(Number(e.target.value) || 0)} />%
                                    </span>
                                </label>
                                <label className="flex items-center justify-between gap-2">
                                    Div yield
                                    <span className="flex items-center gap-1">
                                        <input type="number" step={0.1} className="w-16 border border-gray-300 rounded px-2 py-1" value={divYieldPct} onChange={e => setDivYieldPct(Number(e.target.value) || 0)} />%
                                    </span>
                                </label>
                                <p className="text-gray-400 pt-1 border-t border-gray-100">Position size in $ = per-contract × 100 (SPX multiplier).</p>
                            </div>
                        )}
                    </div>
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

            {dirty && (
                <div className="flex items-center justify-between text-xs bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <span className="text-amber-800">Legs have been hand-edited — they'll carry over if you change the expiration or source.</span>
                    <button onClick={resetToPreset} className="font-medium text-amber-900 underline hover:no-underline flex-shrink-0 ml-3">
                        Reset to preset
                    </button>
                </div>
            )}

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
                            const isStock = leg.type === 'stock';
                            const contracts = leg.type === 'call' || leg.type === 'put' ? contractsFor(chain, leg.type) : [];
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
                                                const type = e.target.value as 'call' | 'put' | 'stock';
                                                if (type === 'stock') {
                                                    updateLeg(leg._id, { type, strike: snapshot.underlyingPrice, premium: 0 });
                                                    return;
                                                }
                                                const c = nearestByStrike(contractsFor(chain, type), leg.strike);
                                                updateLeg(leg._id, { type, strike: c.strike, premium: c.mid });
                                            }}
                                        >
                                            <option value="call">Call</option>
                                            <option value="put">Put</option>
                                            <option value="stock">Stock</option>
                                        </select>
                                    </td>
                                    <td className="px-3 py-2">
                                        {isStock ? (
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs text-gray-400">Entry $</span>
                                                <input
                                                    type="number" step={0.01}
                                                    className="w-20 border border-gray-300 rounded px-2 py-1 text-xs"
                                                    value={leg.strike}
                                                    onChange={e => updateLeg(leg._id, { strike: Number(e.target.value) || 0 })}
                                                />
                                            </div>
                                        ) : (
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
                                        )}
                                    </td>
                                    <td className="px-3 py-2">
                                        {isStock ? (
                                            <span className="text-xs text-gray-400">— (no premium)</span>
                                        ) : (
                                            <input
                                                type="number" step={0.01}
                                                className="w-20 border border-gray-300 rounded px-2 py-1 text-xs"
                                                value={leg.premium}
                                                onChange={e => updateLeg(leg._id, { premium: Number(e.target.value) || 0 })}
                                            />
                                        )}
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{isStock ? '—' : priced ? fmtPct(priced.iv) : '—'}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{isStock ? '1.00' : selected ? Math.abs(selected.delta).toFixed(2) : '—'}</td>
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
                <div className="relative border-t border-gray-200">
                    <button
                        onClick={() => setAddMenuOpen(v => !v)}
                        className="w-full text-xs font-medium text-blue-600 hover:bg-blue-50 py-2 flex items-center justify-center gap-1"
                    >
                        + Add leg <ChevronDown className="h-3 w-3" />
                    </button>
                    {addMenuOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 z-10 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden text-xs">
                            <button onClick={() => addLeg('call')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700">+ Call</button>
                            <button onClick={() => addLeg('put')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 border-t border-gray-100">+ Put</button>
                            <button onClick={() => addLeg('stock')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 border-t border-gray-100">+ Stock</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Analysis: Payoff / Probability */}
            {legs.length > 0 && (
                <div className="border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-1 border-b border-gray-200 px-2 pt-2">
                        <button
                            onClick={() => setAnalysisTab('payoff')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-t-lg transition-colors ${
                                analysisTab === 'payoff' ? 'bg-white text-blue-700 border border-gray-200 border-b-white -mb-px' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Payoff
                        </button>
                        <button
                            onClick={() => setAnalysisTab('probability')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-t-lg transition-colors ${
                                analysisTab === 'probability' ? 'bg-white text-blue-700 border border-gray-200 border-b-white -mb-px' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Probability
                        </button>
                    </div>

                    <div className="p-3">
                        {analysisTab === 'payoff' && (
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

                        {analysisTab === 'probability' && atmIV !== null && (
                            <div>
                                {canSnapToBoundary && (
                                    <div className="flex flex-wrap items-center justify-end gap-1.5 text-xs mb-2">
                                        <span className="text-gray-400">Set short strikes to:</span>
                                        <button onClick={() => snapToBoundary(0.68)} className="px-2 py-1 rounded border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 font-medium">68% boundary</button>
                                        <button onClick={() => snapToBoundary(0.80)} className="px-2 py-1 rounded border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 font-medium">80% boundary</button>
                                    </div>
                                )}
                                <ProbabilityRangeView
                                    spot={snapshot.underlyingPrice}
                                    T={T}
                                    r={r}
                                    q={q}
                                    iv={atmIV}
                                    markers={probabilityMarkers}
                                    skewRanges={skewAdjustedRanges}
                                    skew25Delta={skew25Delta}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
