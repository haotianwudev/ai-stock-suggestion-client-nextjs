// Universal multi-leg option payoff engine.
//
// Any option position — one leg or many, from a fixed illustration or a user-assembled real
// chain selection — reduces to this: sum each leg's intrinsic value at expiration (signed by
// long/short) plus the premium paid or collected. No strategy-specific formulas needed.

export type OptionLegType = 'call' | 'put';
export type OptionLegSide = 'long' | 'short';

export interface OptionLeg {
    type: OptionLegType;
    side: OptionLegSide;
    strike: number;
    /** Per-share premium, always a positive number regardless of side. */
    premium: number;
    /** Number of contracts; defaults to 1. */
    quantity?: number;
}

/** P&L of a single leg at expiration, at underlying price `price`. */
export function legPnL(price: number, leg: OptionLeg): number {
    const quantity = leg.quantity ?? 1;
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

/** Net premium across all legs: positive = net credit received, negative = net debit paid. */
export function netPremium(legs: OptionLeg[]): number {
    return legs.reduce((total, leg) => {
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
