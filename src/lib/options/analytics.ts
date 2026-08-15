import { blackScholes, standardNormalCDF } from '@/lib/black-scholes';
import { OptionLeg } from './payoff';

// SPX-specific constants. Multiplier is unambiguous for an index (100, no exceptions). The rate
// and yield are reasonable defaults around the historical sample's date (2023-12-29: ~3M T-bill
// yield and SPX's trailing dividend yield) — both are user-editable in the UI, these are just
// sane starting points, not hardcoded truth.
export const SPX_MULTIPLIER = 100;
export const SPX_DEFAULT_RATE = 0.054;
export const SPX_DEFAULT_DIV_YIELD = 0.013;

/** An OptionLeg plus the implied vol used to price it — needed for anything beyond expiration payoff. */
export interface PricedLeg extends OptionLeg {
    iv: number;
}

/**
 * Implied vol via bisection on blackScholes' price. Solved uniformly from each leg's mid price
 * regardless of data source (even when a live feed ships its own IV) — the T+0 curve must pass
 * through the position's actual entry cost, which only holds if the IV we price with reproduces
 * the mid we charged.
 */
export function solveImpliedVol(price: number, S: number, K: number, T: number, r: number, q: number, type: 'call' | 'put'): number {
    if (T <= 0 || price <= 0) return 0;
    const bsType = type === 'call' ? 'Call' : 'Put';
    let lo = 0.001, hi = 5;
    for (let i = 0; i < 100; i++) {
        const mid = (lo + hi) / 2;
        const p = blackScholes(S, K, T, r, mid, bsType, q).price;
        if (p > price) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
}

function legValueAt(leg: PricedLeg, spot: number, T: number, r: number, q: number): number {
    const quantity = leg.quantity ?? 1;
    const bsType = leg.type === 'call' ? 'Call' : 'Put';
    // T > 0: Black-Scholes mark (today's fair value). T <= 0: blackScholes' own intrinsic-value
    // edge case — so this converges to legPnL's expiration payoff as T -> 0, by construction.
    const mark = blackScholes(spot, leg.strike, T, r, leg.iv, bsType, q).price;
    const directional = leg.side === 'long' ? mark : -mark;
    const premiumFlow = leg.side === 'long' ? -leg.premium : leg.premium;
    return quantity * (directional + premiumFlow);
}

/**
 * "T+0" position value: what the position is worth right now (at the entry date's remaining
 * time T) if the underlying were at `spot` today — as opposed to legsPnL's expiration payoff
 * (intrinsic value only, T=0). Same P&L convention as legsPnL (premium already netted in), so
 * the two curves overlay directly on one chart.
 */
export function positionValueAt(spot: number, legs: PricedLeg[], T: number, r: number, q: number): number {
    return legs.reduce((sum, leg) => sum + legValueAt(leg, spot, T, r, q), 0);
}

export interface NetGreeks {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
}

/** Position Greeks, signed by side and scaled by quantity x contract multiplier. */
export function netGreeks(legs: PricedLeg[], S: number, T: number, r: number, q: number, multiplier: number = SPX_MULTIPLIER): NetGreeks {
    const totals: NetGreeks = { delta: 0, gamma: 0, theta: 0, vega: 0 };
    for (const leg of legs) {
        const quantity = leg.quantity ?? 1;
        const bsType = leg.type === 'call' ? 'Call' : 'Put';
        const g = blackScholes(S, leg.strike, T, r, leg.iv, bsType, q);
        const sign = leg.side === 'long' ? 1 : -1;
        const scale = sign * quantity * multiplier;
        totals.delta += scale * g.delta;
        totals.gamma += scale * g.gamma;
        totals.theta += scale * g.theta;
        totals.vega += scale * g.vega;
    }
    return totals;
}

/**
 * Risk-neutral probability the position is profitable at expiration, integrating a lognormal
 * terminal-price distribution over whichever price regions the actual expiration payoff (via
 * legsPnL) is positive. Regions are found by testing the midpoint of each interval between
 * sorted breakevens (payoff is piecewise-linear, so sign is constant within an interval).
 */
export function probabilityOfProfit(
    legsPnLAt: (price: number) => number,
    breakevens: number[],
    S: number,
    T: number,
    r: number,
    q: number,
    atmIV: number
): number {
    if (T <= 0 || atmIV <= 0) return legsPnLAt(S) > 0 ? 1 : 0;

    const sorted = [...breakevens].sort((a, b) => a - b);
    const bounds = [0, ...sorted, Infinity];
    const sigmaSqrtT = atmIV * Math.sqrt(T);
    // P(S_T > x) under risk-neutral lognormal drift (r - q - sigma^2/2)T.
    const probAbove = (x: number): number => {
        if (x <= 0) return 1;
        if (x === Infinity) return 0;
        const d2 = (Math.log(S / x) + (r - q - (atmIV * atmIV) / 2) * T) / sigmaSqrtT;
        return standardNormalCDF(d2);
    };

    let pop = 0;
    for (let i = 0; i < bounds.length - 1; i++) {
        const lo = bounds[i], hi = bounds[i + 1];
        const testPoint = hi === Infinity ? lo * 1.5 + 1 : (lo + hi) / 2;
        if (legsPnLAt(testPoint) > 0) {
            pop += probAbove(lo) - probAbove(hi);
        }
    }
    return Math.min(1, Math.max(0, pop));
}
