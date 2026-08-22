/**
 * Gamma exposure (GEX) math, shared by the GEX tab, the market-wide HUD, and the per-cycle
 * summary so all three report the same numbers from one implementation.
 *
 * Convention (documented in wiki/option-strategy/gex-methodology):
 *   GEX_strike = gamma * OI * 100 * (S^2 * 0.01)   -- dollars per 1% move, scaled to $M
 * with the naive dealer sign: dealers are long calls / short puts, so put GEX enters negative.
 *
 * Duplicate strikes are SUMMED, never overwritten. A standard SPX monthly shares its date with
 * a separately-traded SPXW contract at the same strike, and gamma exposure is additive across
 * both -- the same reasoning the positioning tab uses for open interest. Overwriting instead of
 * summing silently dropped up to 95% of the gamma on monthly cycles.
 */

import { blackScholesGamma } from '@/lib/black-scholes';
import { SPX_DEFAULT_RATE, SPX_DEFAULT_DIV_YIELD } from '@/lib/options/analytics';

export const CONTRACT_MULTIPLIER = 100;

/** Core calculation band. Wide enough that whole-book totals, walls and the flip are stable. */
export const GEX_BAND_LOW = 0.65;
export const GEX_BAND_HIGH = 1.35;

/** Below this the Black-Scholes gamma solve is numerically unstable, so clamp the tenor. */
const MIN_SIM_T = 0.5 / 365;

export interface GexContractInput {
  strike: number;
  gamma?: number | null;
  openInterest?: number | null;
  impliedVolatilityMid?: number | null;
}

export interface GexExpirationInput {
  expiration: string;
  daysToExpiration: number;
  calls: GexContractInput[];
  puts: GexContractInput[];
}

export interface GexStrikeRow {
  strike: number;
  strikeLabel: string;
  /** Call-side GEX in $M per 1% move (positive). */
  callGex: number;
  /** Put-side GEX magnitude in $M (positive for display; enters netGex negatively). */
  putGex: number;
  netGex: number;
}

export interface GexProfile {
  byStrike: GexStrikeRow[];
  totalCallGex: number;
  totalPutGex: number;
  totalNetGex: number;
  callWall: number | null;
  putWall: number | null;
  gammaFlip: number | null;
  /** Re-prices the whole book's gamma at a hypothetical spot. Used for the flip and shift curve. */
  simNetGexAt: (spot: number) => number;
  /** Contracts that carried open interest and fed the simulation. */
  simContractCount: number;
}

const inBand = (strike: number, spot: number) =>
  strike >= spot * GEX_BAND_LOW && strike <= spot * GEX_BAND_HIGH;

/**
 * Peak finder with a directional constraint and [0.25, 0.5, 0.25] smoothing.
 * Directional: a call wall must sit at or above spot, a put wall at or below -- without that
 * constraint the "wall" can land on the wrong side of spot and invert the reading entirely.
 */
function smoothPeak(
  values: { strike: number; value: number }[],
  side: 'above' | 'below',
  spot: number
): number | null {
  let bestStrike: number | null = null;
  let bestValue = 0;
  for (let i = 0; i < values.length; i++) {
    const { strike } = values[i];
    if (side === 'above' && strike < spot) continue;
    if (side === 'below' && strike > spot) continue;
    const prev = values[i - 1]?.value ?? values[i].value;
    const next = values[i + 1]?.value ?? values[i].value;
    const smoothed = 0.5 * values[i].value + 0.25 * prev + 0.25 * next;
    if (smoothed > bestValue) {
      bestValue = smoothed;
      bestStrike = strike;
    }
  }
  return bestStrike;
}

/**
 * Build the GEX profile for whatever set of expirations is passed in:
 * one slice for a single cycle, every slice for the whole dealer book.
 */
export function computeGexProfile(slices: GexExpirationInput[], spot: number): GexProfile {
  const spotSquared1Pct = (spot * spot * 0.01) / 1_000_000;

  // Accumulate (never overwrite) so same-strike SPX/SPXW pairs both contribute.
  const strikeAgg = new Map<number, { callGex: number; putGex: number }>();
  const bump = (strike: number, callGex: number, putGex: number) => {
    const entry = strikeAgg.get(strike) || { callGex: 0, putGex: 0 };
    entry.callGex += callGex;
    entry.putGex += putGex;
    strikeAgg.set(strike, entry);
  };

  type SimContract = {
    strike: number;
    openInterest: number;
    isCall: boolean;
    iv: number;
    T: number;
    observedGamma: number;
  };
  const simContracts: SimContract[] = [];
  const pushSim = (o: GexContractInput, isCall: boolean, dteDays: number) => {
    if (!inBand(o.strike, spot)) return;
    const oi = o.openInterest || 0;
    if (oi <= 0) return;
    simContracts.push({
      strike: o.strike,
      openInterest: oi,
      isCall,
      iv: o.impliedVolatilityMid && o.impliedVolatilityMid > 0 ? o.impliedVolatilityMid : 0,
      T: Math.max(dteDays, 0) / 365,
      observedGamma: o.gamma || 0,
    });
  };

  for (const slice of slices) {
    for (const c of slice.calls) {
      if (!inBand(c.strike, spot)) continue;
      bump(c.strike, (c.gamma || 0) * (c.openInterest || 0) * CONTRACT_MULTIPLIER * spotSquared1Pct, 0);
      pushSim(c, true, slice.daysToExpiration);
    }
    for (const p of slice.puts) {
      if (!inBand(p.strike, spot)) continue;
      bump(p.strike, 0, -((p.gamma || 0) * (p.openInterest || 0) * CONTRACT_MULTIPLIER * spotSquared1Pct));
      pushSim(p, false, slice.daysToExpiration);
    }
  }

  let totalCallGex = 0;
  let totalPutGex = 0;
  const byStrike: GexStrikeRow[] = Array.from(strikeAgg.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([strike, { callGex, putGex }]) => {
      totalCallGex += callGex;
      totalPutGex += putGex;
      return {
        strike,
        strikeLabel: `$${strike}`,
        callGex: Number(callGex.toFixed(2)),
        putGex: Number(Math.abs(putGex).toFixed(2)),
        netGex: Number((callGex + putGex).toFixed(2)),
      };
    });

  const simNetGexAt = (simSpot: number): number => {
    const scale = CONTRACT_MULTIPLIER * ((simSpot * simSpot * 0.01) / 1_000_000);
    let total = 0;
    for (const ct of simContracts) {
      const g =
        ct.iv > 0
          ? blackScholesGamma(
              simSpot,
              ct.strike,
              Math.max(ct.T, MIN_SIM_T),
              SPX_DEFAULT_RATE,
              ct.iv,
              SPX_DEFAULT_DIV_YIELD
            )
          : ct.observedGamma;
      total += (ct.isCall ? g : -g) * ct.openInterest * scale;
    }
    return total;
  };

  // Gamma flip: sweep -8%..+8% for a sign change, then bisect. Where several crossings exist,
  // keep the one nearest spot -- that's the level price would actually reach first.
  let gammaFlip: number | null = null;
  if (simContracts.length > 0) {
    const evalAt = (pct: number) => ({
      spot: spot * (1 + pct / 100),
      val: simNetGexAt(spot * (1 + pct / 100)),
    });
    let prev = evalAt(-8);
    let bestDist = Infinity;
    for (let pct = -7; pct <= 8; pct += 1) {
      const cur = evalAt(pct);
      if ((prev.val <= 0 && cur.val > 0) || (prev.val >= 0 && cur.val < 0)) {
        let lo = prev;
        let hi = cur;
        for (let i = 0; i < 14; i++) {
          const midSpot = (lo.spot + hi.spot) / 2;
          const midVal = simNetGexAt(midSpot);
          if ((lo.val <= 0 && midVal > 0) || (lo.val >= 0 && midVal < 0)) {
            hi = { spot: midSpot, val: midVal };
          } else {
            lo = { spot: midSpot, val: midVal };
          }
        }
        const crossing = (lo.spot + hi.spot) / 2;
        const dist = Math.abs(crossing - spot);
        if (dist < bestDist) {
          bestDist = dist;
          gammaFlip = Math.round(crossing);
        }
      }
      prev = cur;
    }
  }

  return {
    byStrike,
    totalCallGex: Number(totalCallGex.toFixed(1)),
    totalPutGex: Number(totalPutGex.toFixed(1)),
    totalNetGex: Number((totalCallGex + totalPutGex).toFixed(1)),
    callWall: smoothPeak(byStrike.map(r => ({ strike: r.strike, value: r.callGex })), 'above', spot),
    putWall: smoothPeak(byStrike.map(r => ({ strike: r.strike, value: r.putGex })), 'below', spot),
    gammaFlip,
    simNetGexAt,
    simContractCount: simContracts.length,
  };
}
