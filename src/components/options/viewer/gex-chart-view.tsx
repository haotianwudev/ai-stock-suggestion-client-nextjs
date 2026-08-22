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
import { Zap, ShieldCheck, ShieldAlert, TrendingUp, Sliders, Activity, Info, ZoomIn, Compass, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { blackScholes, blackScholesGamma } from '@/lib/black-scholes';
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
type StrikeRangeOption = 15 | 25 | 'all';

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
  const [scope, setScope] = useState<GexScope>('all');
  const [strikeRange, setStrikeRange] = useState<StrikeRangeOption>(15);
  const [showGuide, setShowGuide] = useState(false);

  const canAggregate = !!allExpirations && allExpirations.length > 1;
  const effectiveScope: GexScope = canAggregate ? scope : 'expiration';

  // Compute Net GEX, Gross GEX, Vanna, Charm, and Price Shift Simulation
  const { 
    chartData, 
    displayChartData,
    shiftCurveData, 
    vannaCharmData, 
    displayVannaCharmData,
    totalNetGex, 
    totalCallGex, 
    totalPutGex, 
    gammaFlipLevel, 
    gammaFlipChartStrike, 
    spotChartStrike, 
    callWallStrike, 
    putWallStrike 
  } = useMemo(() => {
    const contractMultiplier = 100;
    const spotSquared1Pct = (spotPrice * spotPrice * 0.01) / 1_000_000;
    
    // Core calculation band: covers wide range so whole-book GEX, walls, and flip are calculated properly
    const inRange = (strike: number) => strike >= spotPrice * 0.65 && strike <= spotPrice * 1.35;
    // Display zoom band: controlled by user selection (15%, 25%, all)
    const inDisplayRange = (strike: number) => strikeRange === 'all' ? true : (strike >= spotPrice * (1 - strikeRange / 100) && strike <= spotPrice * (1 + strikeRange / 100));

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

    // Build contracts array for continuous spot-shift re-pricing
    type SimContract = {
      strike: number; openInterest: number; isCall: boolean; iv: number; T: number; observedGamma: number;
    };
    const simContracts: SimContract[] = [];
    const pushSim = (o: OptionContractData, isCall: boolean, dteDays: number) => {
      if (!inRange(o.strike)) return;
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
    if (effectiveScope === 'all' && allExpirations) {
      allExpirations.forEach(exp => {
        exp.calls.forEach(c => pushSim(c, true, exp.daysToExpiration));
        exp.puts.forEach(p => pushSim(p, false, exp.daysToExpiration));
      });
    } else {
      calls.forEach(c => pushSim(c, true, dte));
      puts.forEach(p => pushSim(p, false, dte));
    }

    // Call Wall / Put Wall with directional constraint and [0.25, 0.5, 0.25] smoothing
    const smoothPeak = (
      values: { strike: number; value: number }[],
      side: 'above' | 'below'
    ): number | null => {
      let bestStrike: number | null = null;
      let bestValue = 0;
      for (let i = 0; i < values.length; i++) {
        const { strike } = values[i];
        if (side === 'above' && strike < spotPrice) continue;
        if (side === 'below' && strike > spotPrice) continue;
        const prev = values[i - 1]?.value ?? values[i].value;
        const next = values[i + 1]?.value ?? values[i].value;
        const smoothed = 0.5 * values[i].value + 0.25 * prev + 0.25 * next;
        if (smoothed > bestValue) { bestValue = smoothed; bestStrike = strike; }
      }
      return bestStrike;
    };

    const callWallStrike = smoothPeak(rows.map(r => ({ strike: r.strike, value: r.callGex })), 'above');
    const putWallStrike = smoothPeak(rows.map(r => ({ strike: r.strike, value: r.putGex })), 'below');

    const MIN_SIM_T = 0.5 / 365;

    const simNetGexAt = (simSpot: number): number => {
      const scale = contractMultiplier * ((simSpot * simSpot * 0.01) / 1_000_000);
      let total = 0;
      for (const ct of simContracts) {
        let g: number;
        if (ct.iv > 0) {
          g = blackScholesGamma(
            simSpot, ct.strike, Math.max(ct.T, MIN_SIM_T), SPX_DEFAULT_RATE, ct.iv,
            SPX_DEFAULT_DIV_YIELD
          );
        } else {
          g = ct.observedGamma;
        }
        total += (ct.isCall ? g : -g) * ct.openInterest * scale;
      }
      return total;
    };

    // Root-finding for Gamma Flip Level via sweep + bisection
    let flip: number | null = null;
    if (simContracts.length > 0) {
      const evalAt = (pct: number) => ({ spot: spotPrice * (1 + pct / 100), val: simNetGexAt(spotPrice * (1 + pct / 100)) });
      let prev = evalAt(-8);
      let bestDist = Infinity;
      for (let pct = -7; pct <= 8; pct += 1) {
        const cur = evalAt(pct);
        if ((prev.val <= 0 && cur.val > 0) || (prev.val >= 0 && cur.val < 0)) {
          let lo = prev, hi = cur;
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
          const dist = Math.abs(crossing - spotPrice);
          if (dist < bestDist) { bestDist = dist; flip = Math.round(crossing); }
        }
        prev = cur;
      }
    }

    // 2. Simulated Price Shift Curve (-6% to +6%)
    const shiftSteps = [-6, -5, -4, -3, -2, -1, -0.5, 0, 0.5, 1, 2, 3, 4, 5, 6];
    const shiftCurve = shiftSteps.map(pct => {
      const simSpot = spotPrice * (1 + pct / 100);
      const netGex = Number(simNetGexAt(simSpot).toFixed(1));
      return {
        pctShift: `${pct > 0 ? '+' : ''}${pct}%`,
        simSpot: Math.round(simSpot),
        simNetGex: netGex,
        posGex: netGex >= 0 ? netGex : 0,
        negGex: netGex < 0 ? netGex : 0,
        isCurrent: pct === 0
      };
    });

    // 3. Vanna & Charm Exposure
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
        pVanna = -(g.vanna * (p.openInterest || 0) * contractMultiplier);
        pCharm = -(g.charm * (p.openInterest || 0) * contractMultiplier);
      }

      return {
        strike,
        strikeLabel: `$${strike}`,
        vanna: Number((cVanna + pVanna).toFixed(2)),
        charm: Number((cCharm + pCharm).toFixed(2)),
        callVanna: Number(cVanna.toFixed(2)),
        putVanna: Number(pVanna.toFixed(2))
      };
    });

    const nearestChartStrike = (target: number, searchRows: typeof rows): number | null =>
      searchRows.length > 0 ? searchRows.reduce((best, r) => Math.abs(r.strike - target) < Math.abs(best - target) ? r.strike : best, searchRows[0].strike) : null;

    const displayRows = rows.filter(r => inDisplayRange(r.strike));
    const displayVannaCharm = vannaCharmRows.filter(r => inDisplayRange(r.strike));

    return {
      chartData: rows,
      displayChartData: displayRows,
      shiftCurveData: shiftCurve,
      vannaCharmData: vannaCharmRows,
      displayVannaCharmData: displayVannaCharm,
      totalNetGex: Number(totalNet.toFixed(1)),
      totalCallGex: Number(totCallGex.toFixed(1)),
      totalPutGex: Number(totPutGex.toFixed(1)),
      gammaFlipLevel: flip,
      gammaFlipChartStrike: flip !== null ? nearestChartStrike(flip, displayRows) : null,
      spotChartStrike: nearestChartStrike(spotPrice, displayRows),
      callWallStrike,
      putWallStrike
    };
  }, [calls, puts, spotPrice, effectiveScope, allExpirations, dte, strikeRange]);

  const isPositiveRegime = totalNetGex >= 0;

  const hasOpenInterest = calls.some(c => c.openInterest != null && c.openInterest > 0)
    || puts.some(p => p.openInterest != null && p.openInterest > 0);

  if (!hasOpenInterest) {
    return (
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-xs">
        <CardContent className="p-8 flex flex-col items-center text-center gap-2">
          <Info className="h-6 w-6 text-slate-400" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Open interest data not available</p>
          <p className="text-xs text-slate-500 max-w-md">
            Gamma exposure (GEX) is calculated from each contract&apos;s open interest, which the
            Historical Snapshot source doesn&apos;t include. Switch to the Live source to see GEX.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Custom Net GEX Tooltip
  const CustomNetGexTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const strike = data.strike;
      const diffDollars = strike - spotPrice;
      const diffPct = (diffDollars / spotPrice) * 100;
      const isCallWall = strike === callWallStrike;
      const isPutWall = strike === putWallStrike;
      const isFlip = strike === gammaFlipChartStrike;
      const isSpotNear = Math.abs(strike - spotPrice) <= 5;

      return (
        <div className="bg-slate-900/95 dark:bg-slate-950/95 text-white border border-slate-700/80 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs font-mono max-w-xs space-y-2">
          <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-1.5">
            <span className="font-bold text-sm text-amber-400">${strike.toLocaleString()}</span>
            <span className="text-[11px] text-slate-400">
              {diffDollars >= 0 ? `+${diffDollars.toFixed(1)}` : diffDollars.toFixed(1)} ({diffPct >= 0 ? '+' : ''}{diffPct.toFixed(2)}%)
            </span>
          </div>

          {(isCallWall || isPutWall || isFlip || isSpotNear) && (
            <div className="flex flex-wrap gap-1">
              {isSpotNear && <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px] py-0">Spot Reference</Badge>}
              {isCallWall && <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-[10px] py-0">Call Wall (Resistance)</Badge>}
              {isPutWall && <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/40 text-[10px] py-0">Put Wall (Support)</Badge>}
              {isFlip && <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/40 text-[10px] py-0">Gamma Flip Pivot</Badge>}
            </div>
          )}

          <div className="space-y-1 pt-0.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Net Gamma:</span>
              <span className={`font-bold ${data.netGex >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {data.netGex >= 0 ? '+' : ''}${data.netGex}M
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-emerald-400/90">Call GEX:</span>
              <span>+${data.callGex}M</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-rose-400/90">Put GEX:</span>
              <span>-${data.putGex}M</span>
            </div>
          </div>

          <div className="border-t border-slate-700/80 pt-1.5 text-[10px] text-slate-400 leading-tight">
            {data.netGex >= 0 
              ? '🟢 Market makers long gamma: hedging dampens volatility (sell rallies, buy dips).'
              : '🔴 Market makers short gamma: hedging accelerates momentum (sell drops, buy rips).'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* GEX Top HUD KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Total Net GEX */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Net Gamma (GEX)</span>
            <Badge variant="outline" className="text-[9px] font-mono px-1 py-0 border-gray-200 dark:border-gray-700 text-slate-500">
              {effectiveScope === 'all' ? 'Whole Book' : `${dte}d Expiry`}
            </Badge>
          </div>
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
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Gamma Flip Level</span>
            {gammaFlipLevel && (
              <span className="text-[10px] font-mono text-slate-400">
                {gammaFlipLevel >= spotPrice ? `+${(gammaFlipLevel - spotPrice).toFixed(0)}` : (gammaFlipLevel - spotPrice).toFixed(0)}
              </span>
            )}
          </div>
          <div className="text-xl font-mono font-extrabold text-[#A8672E] dark:text-[#D08F52] mt-1">
            {gammaFlipLevel ? `$${gammaFlipLevel.toLocaleString()}` : '—'}
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
            {gammaFlipLevel ? (gammaFlipLevel > spotPrice ? 'Above spot (Currently short gamma)' : 'Below spot (Buffer above flip)') : 'Transition to Short Gamma'}
          </p>
        </div>

        {/* Card 4: Call GEX vs Put GEX & Walls */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Call vs Put Walls</span>
          <div className="flex items-center gap-1.5 mt-1 text-sm sm:text-base font-mono font-bold">
            <span className="text-blue-600 dark:text-blue-400">${callWallStrike ?? '—'}</span>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-rose-600 dark:text-rose-400">${putWallStrike ?? '—'}</span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
            Gross: +${totalCallGex}M C / -${totalPutGex}M P
          </p>
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
              {subView === 'gammaShift' && `Continuous re-pricing of whole dealer book across simulated SPX spot price changes (-6% to +6%)`}
              {subView === 'vannaCharm' && `Flow pressures induced by changes in Implied Volatility (Vanna) and Time Decay (Charm)`}
              {subView === 'heatmap' && `Where dealer gamma concentrates across the whole expiration cycle at a glance`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Strike Range Zoom Controls (shown for strike-based views) */}
            {(subView === 'netGex' || subView === 'grossGex' || subView === 'vannaCharm') && (
              <div className="inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-800/60 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] font-mono">
                <span className="text-slate-400 pl-1.5 pr-0.5 text-[10px]">Range:</span>
                {([15, 25, 'all'] as StrikeRangeOption[]).map(r => (
                  <button
                    key={String(r)}
                    onClick={() => setStrikeRange(r)}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      strikeRange === r
                        ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {r === 'all' ? 'All' : `±${r}%`}
                  </button>
                ))}
              </div>
            )}

            {/* Scope Selector */}
            {canAggregate && subView !== 'vannaCharm' && subView !== 'heatmap' && (
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-[11px] font-semibold">
                <button
                  onClick={() => setScope('expiration')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    scope === 'expiration' 
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  This Expiry
                </button>
                <button
                  onClick={() => setScope('all')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    scope === 'all' 
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  All Expirations
                </button>
              </div>
            )}

            {/* 5-Way Sub-View Selector */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setSubView('netGex')}
                className={`px-3 py-1 rounded-md transition-all ${
                  subView === 'netGex' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Net GEX
              </button>
              <button
                onClick={() => setSubView('grossGex')}
                className={`px-3 py-1 rounded-md transition-all ${
                  subView === 'grossGex' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Gross Call/Put
              </button>
              <button
                onClick={() => setSubView('gammaShift')}
                className={`px-3 py-1 rounded-md transition-all ${
                  subView === 'gammaShift' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Spot Move Sim
              </button>
              <button
                onClick={() => setSubView('vannaCharm')}
                className={`px-3 py-1 rounded-md transition-all ${
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
                  className={`px-3 py-1 rounded-md transition-all ${
                    subView === 'heatmap' 
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Heatmap
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className={`w-full ${subView === 'heatmap' ? '' : 'h-[420px]'}`}>
            {/* VIEW 0: HEATMAP */}
            {subView === 'heatmap' && allExpirations && (
              <GexHeatmapView allExpirations={allExpirations} spotPrice={spotPrice} />
            )}

            {/* VIEW 1: NET GEX */}
            {subView === 'netGex' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayChartData} margin={{ top: 15, right: 30, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:opacity-10" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                    dy={5}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11}
                    tickFormatter={(val) => `$${val}M`}
                  />
                  <Tooltip content={<CustomNetGexTooltip />} />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeWidth={1} />
                  
                  {spotChartStrike !== null && (
                    <ReferenceLine
                      x={spotChartStrike}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                    />
                  )}
                  {gammaFlipLevel && gammaFlipChartStrike !== null && (
                    <ReferenceLine
                      x={gammaFlipChartStrike}
                      stroke="#ea580c"
                      strokeDasharray="3 3"
                      strokeWidth={1.5}
                      label={{ value: `Flip: $${gammaFlipLevel}`, position: 'insideTop', fill: '#ea580c', fontSize: 10, fontWeight: 'bold' }}
                    />
                  )}
                  {callWallStrike !== null && (
                    <ReferenceLine
                      x={callWallStrike}
                      stroke="#2563eb"
                      strokeDasharray="2 2"
                      strokeWidth={1.5}
                      label={{ value: `Call Wall: $${callWallStrike}`, position: 'insideTopLeft', fill: '#1d4ed8', fontSize: 10, fontWeight: 'bold' }}
                    />
                  )}
                  {putWallStrike !== null && (
                    <ReferenceLine
                      x={putWallStrike}
                      stroke="#e11d48"
                      strokeDasharray="2 2"
                      strokeWidth={1.5}
                      label={{ value: `Put Wall: $${putWallStrike}`, position: 'insideTopRight', fill: '#be123c', fontSize: 10, fontWeight: 'bold' }}
                    />
                  )}
                  <Bar dataKey="netGex" name="Net Gamma ($M)" radius={[3, 3, 0, 0]}>
                    {displayChartData.map((entry, index) => (
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
                <BarChart data={displayChartData} margin={{ top: 15, right: 30, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:opacity-10" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                    dy={5}
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
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  {spotChartStrike !== null && (
                    <ReferenceLine
                      x={spotChartStrike}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                    />
                  )}
                  {callWallStrike !== null && (
                    <ReferenceLine
                      x={callWallStrike}
                      stroke="#2563eb"
                      strokeDasharray="2 2"
                      label={{ value: `Call Wall: $${callWallStrike}`, position: 'insideTopLeft', fill: '#1d4ed8', fontSize: 10, fontWeight: 'bold' }}
                    />
                  )}
                  {putWallStrike !== null && (
                    <ReferenceLine
                      x={putWallStrike}
                      stroke="#e11d48"
                      strokeDasharray="2 2"
                      label={{ value: `Put Wall: $${putWallStrike}`, position: 'insideTopRight', fill: '#be123c', fontSize: 10, fontWeight: 'bold' }}
                    />
                  )}
                  <Bar dataKey="callGex" name="Call Gamma ($M)" fill="#10b981" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="putGex" name="Put Gamma ($M)" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 3: SIMULATED SPOT MOVE GAMMA CURVE */}
            {subView === 'gammaShift' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={shiftCurveData} margin={{ top: 15, right: 30, left: 10, bottom: 25 }}>
                  <defs>
                    <linearGradient id="posGexGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:opacity-10" />
                  <XAxis 
                    dataKey="pctShift" 
                    stroke="#64748b" 
                    fontSize={11}
                    dy={5}
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
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeWidth={1.5} />
                  <ReferenceLine 
                    x="0%" 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    strokeWidth={2}
                    label={{ value: `Current Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="simNetGex"
                    name="Simulated Net GEX ($M)"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    fill="url(#posGexGrad)"
                    dot={{ r: 4, fill: '#f59e0b' }}
                    activeDot={{ r: 7 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 4: VANNA & CHARM EXPOSURE */}
            {subView === 'vannaCharm' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayVannaCharmData} margin={{ top: 15, right: 30, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:opacity-10" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                    dy={5}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name === 'vanna' ? 'Net Vanna (dDelta/dVol)' : 'Net Charm (dDelta/dt)'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine y={0} stroke="#94a3b8" />
                  {spotChartStrike !== null && (
                    <ReferenceLine
                      x={spotChartStrike}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                    />
                  )}
                  <Bar dataKey="vanna" name="Vanna Sensitivity (dDelta/dVol)" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="charm" name="Charm Sensitivity (dDelta/dt)" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Actionable GEX Interpretation Guide Bar */}
        <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Current Playbook:
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {isPositiveRegime 
                  ? 'Long Gamma Regime: Volatility dampened. Mean-reverting strategies (Iron Condors, Credit Spreads, selling OTM wings) are structurally favored.' 
                  : 'Short Gamma Regime: Volatility amplified. Trend-following and long-gamma convex strategies (Debit Spreads, Straddles, Breakouts) are favored.'}
              </span>
            </div>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-[#A8672E] dark:text-[#D08F52] font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto flex-shrink-0"
            >
              <span>{showGuide ? 'Hide Methodology' : 'Learn How GEX Works'}</span>
              {showGuide ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {showGuide && (
            <div className="mt-3 pt-3 border-t border-gray-200/60 dark:border-gray-700/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 mb-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Positive Gamma (GEX &gt; 0)
                </span>
                Dealers are net long options against customer short positions. When market rallies, dealers sell index futures to hedge delta; when market drops, dealers buy. This acts as an automated shock absorber.
              </div>
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 mb-1">
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-500" /> Negative Gamma (GEX &lt; 0)
                </span>
                Dealers are net short options (especially customer downside puts). When market falls, dealer delta becomes more negative, forcing dealers to sell more stock/futures into declines, cascading the sell-off.
              </div>
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 mb-1">
                  <Sliders className="h-3.5 w-3.5 text-amber-500" /> Gamma Flip &amp; Walls
                </span>
                The <strong>Gamma Flip</strong> is the exact price level where net dealer gamma crosses zero. <strong>Call Wall</strong> (peak call gamma overhead) and <strong>Put Wall</strong> (peak put gamma below) act as major gravitational pins and hedging barriers.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
