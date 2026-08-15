import { ExpirationChain, ChainContract } from './chain-types';
import { OptionLeg } from './payoff';

/**
 * One leg's resolution target within a preset. `delta: 'atm'` picks the strike nearest the spot
 * price; a number picks the contract with |delta| nearest that target. `furtherThan` (index into
 * the same preset's `legs` array) constrains the candidate pool to strikes further OTM than that
 * already-resolved leg — e.g. a protective wing must sit beyond the short strike it protects, or
 * a thin/sparse chain could resolve the wing onto (or past) the short.
 */
export interface LegTarget {
    type: 'call' | 'put';
    side: 'long' | 'short';
    delta: number | 'atm';
    furtherThan?: number;
    quantity?: number;
}

export interface StrategyPreset {
    id: string;
    label: string;
    legs: LegTarget[];
    /** Escape hatch for presets whose structure isn't independent per-leg delta targeting — see call_butterfly. */
    custom?: (chain: ExpirationChain, spot: number) => OptionLeg[];
}

function nearestByDelta(contracts: ChainContract[], targetAbsDelta: number): ChainContract {
    return contracts.reduce((best, c) =>
        Math.abs(Math.abs(c.delta) - targetAbsDelta) < Math.abs(Math.abs(best.delta) - targetAbsDelta) ? c : best
    );
}

function nearestByStrike(contracts: ChainContract[], spot: number): ChainContract {
    return contracts.reduce((best, c) => Math.abs(c.strike - spot) < Math.abs(best.strike - spot) ? c : best);
}

// Real strikes/premiums, but the *target deltas themselves* are conventional retail defaults
// (documented per group below), not derived from a backtest — unlike Iron Condor's 0.10/0.16,
// which came directly from sophie-option-research's real iron_condor_45dte.yaml config.
function buildCallButterflyLegs(chain: ExpirationChain, spot: number): OptionLeg[] {
    // Structural constraint, not a modeling choice: a butterfly is defined by equal-width wings
    // around the body, so this resolves the upper wing by delta and then mirrors that exact
    // dollar width onto the lower wing by nearest strike — independent per-leg delta targeting
    // (like every other preset here) would produce unequal wings and stop being "a butterfly".
    const middle = nearestByStrike(chain.calls, spot);
    const upperCandidates = chain.calls.filter(c => c.strike > middle.strike);
    const upperWing = nearestByDelta(upperCandidates.length ? upperCandidates : chain.calls, 0.16);
    const width = Math.abs(upperWing.strike - middle.strike);
    const lowerTarget = middle.strike - width;
    const lowerWing = chain.calls.reduce((best, c) => Math.abs(c.strike - lowerTarget) < Math.abs(best.strike - lowerTarget) ? c : best);
    return [
        { type: 'call', side: 'long', strike: lowerWing.strike, premium: lowerWing.mid },
        { type: 'call', side: 'short', strike: middle.strike, premium: middle.mid, quantity: 2 },
        { type: 'call', side: 'long', strike: upperWing.strike, premium: upperWing.mid },
    ];
}

// Same structural constraint as the call butterfly (equal-width wings), mirrored onto puts.
// Real premiums can differ meaningfully from the call version due to put skew — that's the
// professional reason to offer both rather than relying on put-call parity as "close enough".
function buildPutButterflyLegs(chain: ExpirationChain, spot: number): OptionLeg[] {
    const middle = nearestByStrike(chain.puts, spot);
    const lowerCandidates = chain.puts.filter(c => c.strike < middle.strike);
    const lowerWing = nearestByDelta(lowerCandidates.length ? lowerCandidates : chain.puts, 0.16);
    const width = Math.abs(middle.strike - lowerWing.strike);
    const upperTarget = middle.strike + width;
    const upperWing = chain.puts.reduce((best, c) => Math.abs(c.strike - upperTarget) < Math.abs(best.strike - upperTarget) ? c : best);
    return [
        { type: 'put', side: 'long', strike: lowerWing.strike, premium: lowerWing.mid },
        { type: 'put', side: 'short', strike: middle.strike, premium: middle.mid, quantity: 2 },
        { type: 'put', side: 'long', strike: upperWing.strike, premium: upperWing.mid },
    ];
}

export const STRATEGY_PRESETS: StrategyPreset[] = [
    {
        // Deltas straight from sophie-option-research's real iron_condor_45dte.yaml backtest
        // config (see select-default-legs.ts's original comment) — 165 real trades used these.
        // Declared as [longPut, shortPut, shortCall, longCall] — buildPresetLegs' two-pass
        // resolver doesn't need declaration order to match dependency order (furtherThan just
        // names an index), so this stays in the conventional display order consumers expect.
        id: 'iron_condor', label: 'Iron Condor', legs: [
            { type: 'put', side: 'long', delta: 0.10, furtherThan: 1 },
            { type: 'put', side: 'short', delta: 0.16 },
            { type: 'call', side: 'short', delta: 0.16 },
            { type: 'call', side: 'long', delta: 0.10, furtherThan: 2 },
        ]
    },
    {
        id: 'iron_butterfly', label: 'Iron Butterfly', legs: [
            { type: 'put', side: 'long', delta: 0.10, furtherThan: 1 },
            { type: 'put', side: 'short', delta: 'atm' },
            { type: 'call', side: 'short', delta: 'atm' },
            { type: 'call', side: 'long', delta: 0.10, furtherThan: 2 },
        ]
    },
    // Verticals: 0.30-delta short / 0.10-delta protective wing (common retail convention).
    {
        id: 'bull_put_spread', label: 'Bull Put Spread (credit)', legs: [
            { type: 'put', side: 'short', delta: 0.30 },
            { type: 'put', side: 'long', delta: 0.10, furtherThan: 0 },
        ]
    },
    {
        id: 'bear_call_spread', label: 'Bear Call Spread (credit)', legs: [
            { type: 'call', side: 'short', delta: 0.30 },
            { type: 'call', side: 'long', delta: 0.10, furtherThan: 0 },
        ]
    },
    // Debit verticals: buy ATM, sell a 0.20-delta strike further out to reduce cost.
    {
        id: 'bull_call_spread', label: 'Bull Call Spread (debit)', legs: [
            { type: 'call', side: 'long', delta: 'atm' },
            { type: 'call', side: 'short', delta: 0.20, furtherThan: 0 },
        ]
    },
    {
        id: 'bear_put_spread', label: 'Bear Put Spread (debit)', legs: [
            { type: 'put', side: 'long', delta: 'atm' },
            { type: 'put', side: 'short', delta: 0.20, furtherThan: 0 },
        ]
    },
    // Long call spread financed by an independent short put — structurally the same 3 legs as
    // the Strategy Explorer's seagull_spread payoffCalculator (strategy-config.ts):
    // max(0,p-strike1) - max(0,p-strike2) - max(0,strike3-p) - premium. Long call targets 0.40
    // delta rather than dead ATM: checked against the real chain before picking this — ATM made
    // the long leg so expensive the "near-zero-cost" construction the strategy is named for
    // netted a ~$4,810 debit, while 0.40/0.20/0.20 nets ~$540, genuinely close to zero-cost.
    {
        id: 'seagull_spread', label: 'Seagull Spread', legs: [
            { type: 'call', side: 'long', delta: 0.40 },
            { type: 'call', side: 'short', delta: 0.20, furtherThan: 0 },
            { type: 'put', side: 'short', delta: 0.20 },
        ]
    },
    {
        id: 'long_straddle', label: 'Long Straddle', legs: [
            { type: 'call', side: 'long', delta: 'atm' },
            { type: 'put', side: 'long', delta: 'atm' },
        ]
    },
    {
        id: 'short_straddle', label: 'Short Straddle', legs: [
            { type: 'call', side: 'short', delta: 'atm' },
            { type: 'put', side: 'short', delta: 'atm' },
        ]
    },
    {
        id: 'long_strangle', label: 'Long Strangle', legs: [
            { type: 'call', side: 'long', delta: 0.30 },
            { type: 'put', side: 'long', delta: 0.30 },
        ]
    },
    {
        id: 'short_strangle', label: 'Short Strangle', legs: [
            { type: 'call', side: 'short', delta: 0.16 },
            { type: 'put', side: 'short', delta: 0.16 },
        ]
    },
    // Short put + short call spread, deliberately with no put wing: constructed so the total
    // credit exceeds the call spread's width, eliminating upside risk while accepting
    // (uncapped-looking, in practice zero-bounded) downside below the short put — the whole point
    // of the strategy versus an Iron Condor is trading defined upside risk for extra credit.
    // Short put targets 0.35 delta rather than the more common 0.30: checked against the real
    // chain first — at 0.30 the credit fell $3.90 short of the call spread's width (defeating the
    // strategy's whole premise), while 0.35 clears it with a real $4.80 margin.
    {
        id: 'jade_lizard', label: 'Jade Lizard', legs: [
            { type: 'put', side: 'short', delta: 0.35 },
            { type: 'call', side: 'short', delta: 0.16 },
            { type: 'call', side: 'long', delta: 0.10, furtherThan: 1 },
        ]
    },
    { id: 'call_butterfly', label: 'Call Butterfly', legs: [], custom: buildCallButterflyLegs },
    { id: 'put_butterfly', label: 'Put Butterfly', legs: [], custom: buildPutButterflyLegs },
    { id: 'long_call', label: 'Long Call', legs: [{ type: 'call', side: 'long', delta: 'atm' }] },
    { id: 'long_put', label: 'Long Put', legs: [{ type: 'put', side: 'long', delta: 'atm' }] },
    { id: 'short_put', label: 'Short Put', legs: [{ type: 'put', side: 'short', delta: 0.30 }] },
    { id: 'custom', label: 'Custom (start from scratch)', legs: [] },
];

/**
 * Resolves a preset's leg targets against a real expiration chain. Two-pass so `furtherThan`
 * anchors are already resolved regardless of declaration order. `spot` is only required when the
 * preset contains an 'atm' target — omitting it for a pure-delta preset (e.g. Iron Condor) is
 * fine, matching selectDefaultIronCondorLegs' existing (spot-less) call sites.
 */
export function buildPresetLegs(chain: ExpirationChain, preset: StrategyPreset, spot?: number): OptionLeg[] {
    if (preset.custom) {
        if (spot === undefined) throw new Error(`Preset "${preset.id}" requires a spot price`);
        return preset.custom(chain, spot);
    }

    const resolved: (ChainContract | undefined)[] = new Array(preset.legs.length).fill(undefined);
    const resolveOne = (i: number, target: LegTarget) => {
        const pool = target.type === 'call' ? chain.calls : chain.puts;
        let candidates = pool;
        if (target.furtherThan !== undefined) {
            const anchor = resolved[target.furtherThan];
            if (anchor) {
                const further = pool.filter(c => target.type === 'put' ? c.strike < anchor.strike : c.strike > anchor.strike);
                if (further.length) candidates = further;
            }
        }
        if (target.delta === 'atm') {
            if (spot === undefined) throw new Error(`Preset "${preset.id}" requires a spot price for its 'atm' leg`);
            resolved[i] = nearestByStrike(candidates, spot);
        } else {
            resolved[i] = nearestByDelta(candidates, target.delta);
        }
    };
    preset.legs.forEach((t, i) => { if (t.furtherThan === undefined) resolveOne(i, t); });
    preset.legs.forEach((t, i) => { if (t.furtherThan !== undefined) resolveOne(i, t); });

    return preset.legs.map((t, i) => {
        const c = resolved[i]!;
        return { type: t.type, side: t.side, strike: c.strike, premium: c.mid, quantity: t.quantity };
    });
}
