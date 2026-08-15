// Universal multi-leg option payoff engine.
//
// Any option position — one leg or many, from a fixed illustration or a user-assembled real
// chain selection — reduces to this: sum each leg's intrinsic value at expiration (signed by
// long/short) plus the premium paid or collected. No strategy-specific formulas needed.

// 'stock' is a synthetic underlying position, not a literally deliverable SPX share (SPX is a
// cash-settled index with none) — the same illustrative convention the static per-strategy
// payoffCalculators already used for covered_call/collar_strategy/buffered_strategy before they
// had real chain data. For a stock leg, `strike` is repurposed as the entry price and `premium`
// is unused (always 0) — there's no option premium to track, just a cost basis.
export type OptionLegType = 'call' | 'put' | 'stock';
export type OptionLegSide = 'long' | 'short';

export interface OptionLeg {
    type: OptionLegType;
    side: OptionLegSide;
    /** Strike for call/put; entry price for stock. */
    strike: number;
    /** Per-share premium, always a positive number regardless of side. Unused (0) for stock. */
    premium: number;
    /** Number of contracts (or, for stock, multiples of the same contract-size unit — e.g. 1 = 100
     * shares, matching the SPX_MULTIPLIER scaling applied uniformly to the whole position). Defaults to 1. */
    quantity?: number;
}

/** P&L of a single leg at expiration, at underlying price `price`. */
export function legPnL(price: number, leg: OptionLeg): number {
    const quantity = leg.quantity ?? 1;
    if (leg.type === 'stock') {
        const directional = leg.side === 'long' ? (price - leg.strike) : (leg.strike - price);
        return quantity * directional;
    }
    const intrinsic = leg.type === 'call'
        ? Math.max(0, price - leg.strike)
        : Math.max(0, leg.strike - price);
    const directional = leg.side === 'long' ? intrinsic : -intrinsic;
    const premiumFlow = leg.side === 'long' ? -leg.premium : leg.premium;
    return quantity * (directional + premiumFlow);
}

/** Combined P&L of every leg at expiration, at underlying price `price`. */
export function legsPnL(price: number, legs: OptionLeg[]): number {
    return legs.reduce((total, leg) => total + legPnL(price, leg), 0);
}

/** Net premium across all legs: positive = net credit received, negative = net debit paid.
 * Stock legs contribute nothing — buying/holding stock is a cost basis, not option premium. */
export function netPremium(legs: OptionLeg[]): number {
    return legs.reduce((total, leg) => {
        if (leg.type === 'stock') return total;
        const quantity = leg.quantity ?? 1;
        const flow = leg.side === 'short' ? leg.premium : -leg.premium;
        return total + quantity * flow;
    }, 0);
}

/**
 * Every zero-crossing of a price/P&L series, interpolated so breakevens are exact rather than
 * rounded to the nearest sampled price. Shared by PayoffChartView (chart + chips) and anything
 * that needs breakevens before rendering, e.g. probabilityOfProfit's price-region boundaries —
 * one implementation so both stay consistent.
 */
export function findBreakevens(labels: number[], payoffData: number[]): number[] {
    const breakevens: number[] = [];
    for (let i = 0; i < payoffData.length - 1; i++) {
        const a = payoffData[i], b = payoffData[i + 1];
        if (a === 0) breakevens.push(labels[i]);
        else if ((a < 0 && b > 0) || (a > 0 && b < 0)) {
            const t = -a / (b - a);
            breakevens.push(labels[i] + t * (labels[i + 1] - labels[i]));
        }
    }
    if (payoffData[payoffData.length - 1] === 0) breakevens.push(labels[labels.length - 1]);
    return breakevens;
}
