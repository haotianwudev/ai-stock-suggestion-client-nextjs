"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Cell,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { OptionContractData } from './options-matrix-table';
import { Zap, ShieldCheck, ShieldAlert, TrendingUp, Sliders, Activity, Info } from 'lucide-react';
import { blackScholes } from '@/lib/black-scholes';
import { SPX_DEFAULT_RATE, SPX_DEFAULT_DIV_YIELD } from '@/lib/options/analytics';
import { GexHeatmapView } from './gex-heatmap-view';

interface ExpirationSlice {
  expiration: string;
  daysToExpiration: number;
  calls: OptionContractData[];
  puts: OptionContractData[];
}

interface GexChartViewProps {
  calls: OptionContractData[];
  puts: OptionContractData[];
  spotPrice: number;
  ticker: string;
  expiration: string;
  dte: number;
  /** Every expiration's contracts — enables the "All Expirations" aggregate scope on the Net GEX
   * and Gross GEX views (the standard "whole dealer book" GEX reading), which single-expiration
   * data can't answer. Optional so this component still works if a caller doesn't have it handy. */
  allExpirations?: ExpirationSlice[];
}

type GexSubView = 'netGex' | 'grossGex' | 'gammaShift' | 'vannaCharm' | 'heatmap';
type GexScope = 'expiration' | 'all';

export function GexChartView({
  calls,
  puts,
  spotPrice,
  ticker,
  expiration,
  dte,
  allExpirations
}: GexChartViewProps) {
  const [subView, setSubView] = useState<GexSubView>('netGex');
  // Only netGex/grossGex support the aggregate scope — gammaShift's decay-with-distance model
  // and vannaCharm are inherently tied to one expiration's own time-to-expiry, not a sum across
  // many different DTEs, so they always read the single selected expiration regardless of scope.
  const [scope, setScope] = useState<GexScope>('expiration');
  const canAggregate = !!allExpirations && allExpirations.length > 1;
  const effectiveScope: GexScope = canAggregate && (subView === 'netGex' || subView === 'grossGex') ? scope : 'expiration';

  // Compute Net GEX, Gross GEX, Vanna, Charm, and Price Shift Simulation
  const { chartData, shiftCurveData, vannaCharmData, totalNetGex, totalCallGex, totalPutGex, gammaFlipLevel, gammaFlipChartStrike, spotChartStrike, callWallStrike, putWallStrike } = useMemo(() => {
    const contractMultiplier = 100;
    const spotSquared1Pct = (spotPrice * spotPrice * 0.01) / 1_000_000;
    const inRange = (strike: number) => strike >= spotPrice * 0.88 && strike <= spotPrice * 1.12;

    // Always built from the single selected expiration — the shift-sim and vanna/charm sections
    // below use these regardless of scope, and the per-expiration rows branch reuses them too.
    const callMap = new Map<number, OptionContractData>();
    const putMap = new Map<number, OptionContractData>();
    const strikes = new Set<number>();
    calls.forEach(c => { callMap.set(c.strike, c); strikes.add(c.strike); });
    puts.forEach(p => { putMap.set(p.strike, p); strikes.add(p.strike); });
    const filteredStrikes = Array.from(strikes).sort((a, b) => a - b).filter(inRange);

    let totCallGex = 0;
    let totPutGex = 0;
    let rows: { strike: number; strikeLabel: string; callGex: number; putGex: number; netGex: number }[];

    if (effectiveScope === 'all' && allExpirations) {
      // Sum gamma*OI contributions from every expiration that lists a given strike — the "whole
      // book" GEX reading, since dealers' hedging pressure at a strike comes from every open
      // contract there regardless of which expiration it belongs to.
      const strikeAgg = new Map<number, { callGex: number; putGex: number }>();
      allExpirations.forEach(exp => {
        exp.calls.forEach(c => {
          if (!inRange(c.strike)) return;
          const gex = (c.gamma || 0) * (c.openInterest || 0) * contractMultiplier * spotSquared1Pct;
          const entry = strikeAgg.get(c.strike) || { callGex: 0, putGex: 0 };
          entry.callGex += gex;
          strikeAgg.set(c.strike, entry);
        });
        exp.puts.forEach(p => {
          if (!inRange(p.strike)) return;
          const gex = -((p.gamma || 0) * (p.openInterest || 0) * contractMultiplier * spotSquared1Pct);
          const entry = strikeAgg.get(p.strike) || { callGex: 0, putGex: 0 };
          entry.putGex += gex;
          strikeAgg.set(p.strike, entry);
        });
      });
      rows = Array.from(strikeAgg.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([strike, { callGex, putGex }]) => {
          totCallGex += callGex;
          totPutGex += putGex;
          return {
            strike,
            strikeLabel: `$${strike}`,
            callGex: Number(callGex.toFixed(2)),
            putGex: Number(Math.abs(putGex).toFixed(2)),
            netGex: Number((callGex + putGex).toFixed(2))
          };
        });
    } else {
      rows = filteredStrikes.map(strike => {
        const c = callMap.get(strike);
        const p = putMap.get(strike);

        const callGex = (c?.gamma || 0) * (c?.openInterest || 0) * contractMultiplier * spotSquared1Pct;
        // Market makers short customer puts -> negative gamma
        const putGex = -((p?.gamma || 0) * (p?.openInterest || 0) * contractMultiplier * spotSquared1Pct);

        totCallGex += callGex;
        totPutGex += putGex;

        return {
          strike,
          strikeLabel: `$${strike}`,
          callGex: Number(callGex.toFixed(2)),
          putGex: Number(Math.abs(putGex).toFixed(2)),
          netGex: Number((callGex + putGex).toFixed(2))
        };
      });
    }

    const totalNet = totCallGex + totPutGex;

    // Gamma Flip Level: the hypothetical SPOT PRICE at which total dealer gamma exposure —
    // evaluated as if the underlying traded there — crosses zero. This is the actual industry
    // definition (SpotGamma/SqueezeMetrics etc.), and it's a function of *spot*, not of strike —
    // it is NOT "the strike where this strike's own bar changes color" (that's each strike's own
    // local exposure, a different, real, but separate quantity) and NOT "the strike where the
    // cumulative-by-strike sum crosses zero" (an earlier attempt at fixing this — cross-checked
    // against real chain data and found to still misfire: it can report a strike as "the flip"
    // purely because that's where the running total first dips negative, even when dealer gamma
    // stays negative at every nearby *simulated spot price*, i.e. there's no real nearby flip at
    // all). Reuses the same Gaussian-decay spot-shift model as the "Spot Move Sim" view below —
    // that decay weighting also naturally smooths out the single-strike rounding noise 0DTE
    // gamma is prone to, rather than being thrown off by it strike-by-strike.
    const flipFlatContracts: { strike: number; gamma: number; openInterest: number; isCall: boolean }[] = [];
    if (effectiveScope === 'all' && allExpirations) {
      allExpirations.forEach(exp => {
        exp.calls.forEach(c => { if (inRange(c.strike)) flipFlatContracts.push({ strike: c.strike, gamma: c.gamma || 0, openInterest: c.openInterest || 0, isCall: true }); });
        exp.puts.forEach(p => { if (inRange(p.strike)) flipFlatContracts.push({ strike: p.strike, gamma: p.gamma || 0, openInterest: p.openInterest || 0, isCall: false }); });
      });
    } else {
      calls.forEach(c => { if (inRange(c.strike)) flipFlatContracts.push({ strike: c.strike, gamma: c.gamma || 0, openInterest: c.openInterest || 0, isCall: true }); });
      puts.forEach(p => { if (inRange(p.strike)) flipFlatContracts.push({ strike: p.strike, gamma: p.gamma || 0, openInterest: p.openInterest || 0, isCall: false }); });
    }

    // Call Wall / Put Wall: the strike carrying the most resting open interest on each side —
    // the same definition the Positioning tab's HUD cards use, just also plotted here since a
    // wall's location is exactly the kind of thing worth reading alongside GEX (heavy OI at a
    // strike is usually *why* gamma concentrates there). Reuses flipFlatContracts, which already
    // flattens whichever scope is active (single expiration or summed across all of them) into
    // one list — just needs OI summed per strike per side rather than per (strike, expiration).
    let callWallStrike: number | null = null, maxCallOI = 0;
    let putWallStrike: number | null = null, maxPutOI = 0;
    const callOIByStrike = new Map<number, number>();
    const putOIByStrike = new Map<number, number>();
    flipFlatContracts.forEach(({ strike, openInterest, isCall }) => {
      const map = isCall ? callOIByStrike : putOIByStrike;
      map.set(strike, (map.get(strike) || 0) + openInterest);
    });
    callOIByStrike.forEach((oi, strike) => { if (oi > maxCallOI) { maxCallOI = oi; callWallStrike = strike; } });
    putOIByStrike.forEach((oi, strike) => { if (oi > maxPutOI) { maxPutOI = oi; putWallStrike = strike; } });

    const simNetGexAt = (simSpot: number): number => {
      let total = 0;
      flipFlatContracts.forEach(({ strike, gamma, openInterest, isCall }) => {
        const dK = Math.abs(strike - simSpot);
        const decay = Math.exp(-0.5 * ((dK / (simSpot * 0.03)) ** 2));
        const signed = (isCall ? gamma : -gamma) * openInterest * decay;
        total += signed * contractMultiplier * ((simSpot * simSpot * 0.01) / 1_000_000);
      });
      return total;
    };

    let flip: number | null = null;
    if (flipFlatContracts.length > 0) {
      const stepPct = 0.1;
      let prevSpot = spotPrice * (1 - 0.08);
      let prevVal = simNetGexAt(prevSpot);
      let bestDist = Infinity;
      for (let pct = -8 + stepPct; pct <= 8; pct += stepPct) {
        const simSpot = spotPrice * (1 + pct / 100);
        const val = simNetGexAt(simSpot);
        if ((prevVal <= 0 && val > 0) || (prevVal >= 0 && val < 0)) {
          // Linear interpolation between the two bracketing sim-spot points for a precise level.
          const t = -prevVal / (val - prevVal);
          const crossing = prevSpot + t * (simSpot - prevSpot);
          const dist = Math.abs(crossing - spotPrice);
          if (dist < bestDist) { bestDist = dist; flip = Math.round(crossing); }
        }
        prevSpot = simSpot;
        prevVal = val;
      }
    }

    // 2. Simulated Price Shift Curve (Simulating Spot from -5% to +5%)
    const shiftSteps = [-5, -4, -3, -2, -1, -0.5, 0, 0.5, 1, 2, 3, 4, 5];
    const shiftCurve = shiftSteps.map(pct => {
      const simSpot = spotPrice * (1 + pct / 100);
      let simGex = 0;

      filteredStrikes.forEach(strike => {
        const c = callMap.get(strike);
        const p = putMap.get(strike);

        const dK = Math.abs(strike - simSpot);
        // Gamma decays with distance from spot: approx bell curve peak at ATM
        const decay = Math.exp(-0.5 * ((dK / (simSpot * 0.03)) ** 2));

        const cG = (c?.gamma || 0) * (c?.openInterest || 0) * decay;
        const pG = -(p?.gamma || 0) * (p?.openInterest || 0) * decay;

        simGex += (cG + pG) * contractMultiplier * ((simSpot * simSpot * 0.01) / 1_000_000);
      });

      return {
        pctShift: `${pct > 0 ? '+' : ''}${pct}%`,
        simSpot: Math.round(simSpot),
        simNetGex: Number(simGex.toFixed(1)),
        isCurrent: pct === 0
      };
    });

    // 3. Vanna & Charm Exposure — real closed-form Greeks (verified against finite-difference
    // derivatives of delta/vega before shipping — see black-scholes.ts), not a shape-alike proxy.
    // Dollar-exposure scaling matches how GEX itself is scaled: per-contract Greek * open interest
    // * the 100-share multiplier. Needs each contract's own IV, so unlike gamma/theta (already on
    // OptionContractData), this solves fresh per contract from spot/strike/DTE/IV.
    const T = Math.max(dte, 0) / 365;
    const vannaCharmRows = filteredStrikes.map(strike => {
      const c = callMap.get(strike);
      const p = putMap.get(strike);

      let cVanna = 0, cCharm = 0;
      if (c?.impliedVolatilityMid && c.impliedVolatilityMid > 0 && T > 0) {
        const g = blackScholes(spotPrice, strike, T, SPX_DEFAULT_RATE, c.impliedVolatilityMid, 'Call', SPX_DEFAULT_DIV_YIELD);
        cVanna = g.vanna * (c.openInterest || 0) * contractMultiplier;
        cCharm = g.charm * (c.openInterest || 0) * contractMultiplier;
      }
      let pVanna = 0, pCharm = 0;
      if (p?.impliedVolatilityMid && p.impliedVolatilityMid > 0 && T > 0) {
        const g = blackScholes(spotPrice, strike, T, SPX_DEFAULT_RATE, p.impliedVolatilityMid, 'Put', SPX_DEFAULT_DIV_YIELD);
        pVanna = g.vanna * (p.openInterest || 0) * contractMultiplier;
        pCharm = g.charm * (p.openInterest || 0) * contractMultiplier;
      }

      return {
        strike,
        strikeLabel: `$${strike}`,
        vanna: Number((cVanna + pVanna).toFixed(2)),
        charm: Number((cCharm + pCharm).toFixed(2))
      };
    });

    // The Net GEX chart's x-axis is categorical (one bar per listed strike) — a ReferenceLine can
    // only render at a value that's literally one of those categories. gammaFlipLevel itself is a
    // precise, continuously-interpolated price (from the spot-shift simulation, not tied to any
    // listed strike), so drawing the line at that exact value silently fails on this axis type.
    // Snap it to the nearest strike actually in `rows` for the chart; the stat card still shows
    // the precise number.
    const nearestChartStrike = (target: number): number | null =>
      rows.length > 0 ? rows.reduce((best, r) => Math.abs(r.strike - target) < Math.abs(best - target) ? r.strike : best, rows[0].strike) : null;

    return {
      chartData: rows,
      shiftCurveData: shiftCurve,
      vannaCharmData: vannaCharmRows,
      totalNetGex: Number(totalNet.toFixed(1)),
      totalCallGex: Number(totCallGex.toFixed(1)),
      totalPutGex: Number(totPutGex.toFixed(1)),
      gammaFlipLevel: flip,
      gammaFlipChartStrike: flip !== null ? nearestChartStrike(flip) : null,
      spotChartStrike: nearestChartStrike(spotPrice),
      callWallStrike,
      putWallStrike
    };
  }, [calls, puts, spotPrice, effectiveScope, allExpirations, dte]);

  const isPositiveRegime = totalNetGex >= 0;

  // GEX is gamma * open interest at every strike — with no open interest data at all (the
  // Historical Snapshot source, since OptionsDX's EOD schema doesn't carry it), every figure
  // in this tab would compute to a misleading flat zero rather than a real "no data" state.
  const hasOpenInterest = calls.some(c => c.openInterest != null && c.openInterest > 0)
    || puts.some(p => p.openInterest != null && p.openInterest > 0);

  if (!hasOpenInterest) {
    return (
      <Card className="bg-white border-slate-200 shadow-xs">
        <CardContent className="p-8 flex flex-col items-center text-center gap-2">
          <Info className="h-6 w-6 text-slate-400" />
          <p className="text-sm font-semibold text-slate-700">Open interest data not available</p>
          <p className="text-xs text-slate-500 max-w-md">
            Gamma exposure (GEX) is calculated from each contract&apos;s open interest, which the
            Historical Snapshot source doesn&apos;t include. Switch to the Live source to see GEX.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* GEX HUD Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Total Net GEX */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Net Gamma (GEX)</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className={`text-xl font-mono font-extrabold ${isPositiveRegime ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {totalNetGex > 0 ? '+' : ''}${totalNetGex}M
            </span>
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-medium">/ 1% move</span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
            {isPositiveRegime ? 'Dampens volatility (Mean reverting)' : 'Amplifies volatility (Trend following)'}
          </p>
        </div>

        {/* Card 2: Market Maker Regime */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">MM Gamma Regime</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
              {isPositiveRegime ? 'Long Gamma' : 'Short Gamma'}
            </span>
            <Badge className={`text-[10px] font-mono px-1.5 py-0 ${
              isPositiveRegime ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30'
            }`}>
              {isPositiveRegime ? 'Stabilizing' : 'Accelerating'}
            </Badge>
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
            {isPositiveRegime ? 'Dealers buy dips, sell rips' : 'Dealers sell dips, buy rips'}
          </p>
        </div>

        {/* Card 3: Gamma Flip Level */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Gamma Flip Level</span>
          <div className="text-xl font-mono font-extrabold text-[#A8672E] dark:text-[#D08F52] mt-1">
            {gammaFlipLevel ? `$${gammaFlipLevel.toLocaleString()}` : '—'}
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">Transition to Short Gamma regime</p>
        </div>

        {/* Card 4: Call GEX vs Put GEX */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Call vs Put GEX</span>
          <div className="flex items-center gap-1.5 mt-1 text-sm sm:text-base font-mono font-bold">
            <span className="text-emerald-600 dark:text-emerald-400">+${totalCallGex}M</span>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-rose-600 dark:text-rose-400">${totalPutGex}M</span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">Gross market maker inventory</p>
        </div>
      </div>

      {/* Main GEX Chart Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
        <div className="p-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
              {subView === 'netGex' && `SPX Net Gamma Exposure (GEX) by Strike ($M)${effectiveScope === 'all' ? ' — All Expirations' : ''}`}
              {subView === 'grossGex' && `Call Gamma vs Put Gamma Inventory ($M)${effectiveScope === 'all' ? ' — All Expirations' : ''}`}
              {subView === 'gammaShift' && 'Simulated Market Maker Gamma Curve across Spot Moves'}
              {subView === 'vannaCharm' && 'Vanna & Charm Hedging Flow Sensitivity'}
              {subView === 'heatmap' && 'Gamma Exposure Heatmap — Strike × Expiration'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subView === 'netGex' && (effectiveScope === 'all'
                ? 'Every listed expiration — the full dealer book\'s hedging flow pressure per 1% underlying price move'
                : `${expiration} (${dte} DTE) — Hedging flow pressure per 1% underlying price move`)}
              {subView === 'grossGex' && `Gross dealer positioning from customer Call vs Put open interest${effectiveScope === 'all' ? ', summed across every expiration' : ''}`}
              {subView === 'gammaShift' && `How total dealer net gamma changes as SPX price rallies or falls by -5% to +5% (this expiration only)`}
              {subView === 'vannaCharm' && `Flow pressures induced by changes in Implied Volatility (Vanna) and Time Decay (Charm)`}
              {subView === 'heatmap' && `Where dealer gamma concentrates across the whole expiration cycle at a glance`}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setSubView('netGex')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  subView === 'netGex' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Net GEX
              </button>
              <button
                onClick={() => setSubView('grossGex')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  subView === 'grossGex' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Gross Call/Put
              </button>
              <button
                onClick={() => setSubView('gammaShift')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  subView === 'gammaShift' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Spot Move Sim
              </button>
              <button
                onClick={() => setSubView('vannaCharm')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  subView === 'vannaCharm' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Vanna / Charm
              </button>
              {canAggregate && (
                <button
                  onClick={() => setSubView('heatmap')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    subView === 'heatmap' 
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Heatmap
                </button>
              )}
            </div>
            {canAggregate && (subView === 'netGex' || subView === 'grossGex') && (
              <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-[11px] font-semibold">
                <button
                  onClick={() => setScope('expiration')}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    scope === 'expiration' 
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  This Expiration
                </button>
                <button
                  onClick={() => setScope('all')}
                  className={`px-2.5 py-0.5 rounded-lg transition-all ${
                    scope === 'all' 
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  All Expirations
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className={`w-full ${subView === 'heatmap' ? '' : 'h-[400px]'}`}>
            {/* VIEW 0: HEATMAP */}
            {subView === 'heatmap' && allExpirations && (
              <GexHeatmapView allExpirations={allExpirations} spotPrice={spotPrice} />
            )}

            {/* VIEW 1: NET GEX */}
            {subView === 'netGex' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11}
                    tickFormatter={(val) => `$${val}M`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value}M`, 'Net GEX']}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <ReferenceLine y={0} stroke="#94a3b8" />
                  {spotChartStrike !== null && (
                    <ReferenceLine
                      x={spotChartStrike}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                    />
                  )}
                  {gammaFlipLevel && gammaFlipChartStrike !== null && (
                    <ReferenceLine
                      x={gammaFlipChartStrike}
                      stroke="#f97316"
                      strokeDasharray="3 3"
                      label={{ value: `Flip: $${gammaFlipLevel}`, position: 'top', fill: '#ea580c', fontSize: 10 }}
                    />
                  )}
                  {callWallStrike !== null && (
                    <ReferenceLine
                      x={callWallStrike}
                      stroke="#2563eb"
                      strokeDasharray="2 2"
                      label={{ value: `Call Wall: $${callWallStrike}`, position: 'insideTopLeft', fill: '#1d4ed8', fontSize: 10 }}
                    />
                  )}
                  {putWallStrike !== null && (
                    <ReferenceLine
                      x={putWallStrike}
                      stroke="#e11d48"
                      strokeDasharray="2 2"
                      label={{ value: `Put Wall: $${putWallStrike}`, position: 'insideTopRight', fill: '#be123c', fontSize: 10 }}
                    />
                  )}
                  <Bar dataKey="netGex" name="Net Gamma ($M)" radius={[2, 2, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.netGex >= 0 ? '#10b981' : '#f43f5e'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 2: GROSS CALL VS PUT GEX */}
            {subView === 'grossGex' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11}
                    tickFormatter={(val) => `$${val}M`}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `$${value}M`,
                      name === 'callGex' ? 'Call Gamma (+)' : 'Put Gamma (-)'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  {spotChartStrike !== null && (
                    <ReferenceLine
                      x={spotChartStrike}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                    />
                  )}
                  {callWallStrike !== null && (
                    <ReferenceLine
                      x={callWallStrike}
                      stroke="#2563eb"
                      strokeDasharray="2 2"
                      label={{ value: `Call Wall: $${callWallStrike}`, position: 'insideTopLeft', fill: '#1d4ed8', fontSize: 10 }}
                    />
                  )}
                  {putWallStrike !== null && (
                    <ReferenceLine
                      x={putWallStrike}
                      stroke="#e11d48"
                      strokeDasharray="2 2"
                      label={{ value: `Put Wall: $${putWallStrike}`, position: 'insideTopRight', fill: '#be123c', fontSize: 10 }}
                    />
                  )}
                  <Bar dataKey="callGex" name="Call Gamma ($M)" fill="#10b981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="putGex" name="Put Gamma ($M)" fill="#f43f5e" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 3: SIMULATED SPOT MOVE GAMMA CURVE */}
            {subView === 'gammaShift' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={shiftCurveData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="pctShift" 
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11}
                    tickFormatter={(val) => `$${val}M`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value}M`, 'Simulated Net GEX']}
                    labelFormatter={(label, payload) => {
                      const item = payload[0]?.payload;
                      return item ? `SPX Move: ${label} (Simulated Price: $${item.simSpot})` : label;
                    }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine y={0} stroke="#94a3b8" />
                  <ReferenceLine 
                    x="0%" 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Current Spot`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="simNetGex" 
                    name="Simulated Net GEX ($M)" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#f59e0b' }} 
                    activeDot={{ r: 7 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 4: VANNA & CHARM EXPOSURE */}
            {subView === 'vannaCharm' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vannaCharmData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value,
                      name === 'vanna' ? 'Vanna (dDelta/dVol)' : 'Charm (dDelta/dt)'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine y={0} stroke="#94a3b8" />
                  {spotChartStrike !== null && (
                    <ReferenceLine
                      x={spotChartStrike}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                    />
                  )}
                  <Bar dataKey="vanna" name="Vanna Sensitivity" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="charm" name="Charm Sensitivity" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
