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
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { OptionContractData } from './options-matrix-table';
import { BarChart3, Target, Shield, Flame, Scale, Layers, Info, Droplets, Compass, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { computeLiquidity } from '@/lib/options/liquidity';

interface PositioningChartViewProps {
  calls: OptionContractData[];
  puts: OptionContractData[];
  spotPrice: number;
  maxPainStrike: number | null;
  expiration: string;
  dte: number;
}

type PositioningSubView = 'oi' | 'volume' | 'maxPainCurve' | 'cumulativeOI' | 'liquidity';
type StrikeRangeOption = 15 | 25 | 'all';

export function PositioningChartView({
  calls,
  puts,
  spotPrice,
  maxPainStrike,
  expiration,
  dte
}: PositioningChartViewProps) {
  const [subView, setSubView] = useState<PositioningSubView>('oi');
  const [strikeRange, setStrikeRange] = useState<StrikeRangeOption>(15);
  const [showGuide, setShowGuide] = useState(false);

  const hasOpenInterest = calls.some(c => c.openInterest != null) || puts.some(p => p.openInterest != null);

  // Build strike-by-strike datasets
  const { 
    chartData, 
    displayChartData,
    maxPainCurveData, 
    displayMaxPainData,
    cumulativeOIData, 
    displayCumulativeOIData,
    liquidityData, 
    displayLiquidityData,
    callWall, 
    putWall, 
    totalCallOI, 
    totalPutOI, 
    totalCallVol, 
    totalPutVol 
  } = useMemo(() => {
    const callMap = new Map<number, { oi: number; vol: number }>();
    const putMap = new Map<number, { oi: number; vol: number }>();
    const callRawMap = new Map<number, OptionContractData>();
    const putRawMap = new Map<number, OptionContractData>();
    const strikes = new Set<number>();

    let totalCOI = 0;
    let totalPOI = 0;
    let totalCVol = 0;
    let totalPVol = 0;

    let maxCOI = 0;
    let cWallRaw = 0;
    let maxPOI = 0;
    let pWallRaw = 0;

    calls.forEach(c => {
      const oi = c.openInterest || 0;
      const vol = c.volume || 0;
      callMap.set(c.strike, { oi, vol });
      callRawMap.set(c.strike, c);
      strikes.add(c.strike);
      totalCOI += oi;
      totalCVol += vol;

      if (oi > maxCOI) {
        maxCOI = oi;
        cWallRaw = c.strike;
      }
    });

    puts.forEach(p => {
      const oi = p.openInterest || 0;
      const vol = p.volume || 0;
      putMap.set(p.strike, { oi, vol });
      putRawMap.set(p.strike, p);
      strikes.add(p.strike);
      totalPOI += oi;
      totalPVol += vol;

      if (oi > maxPOI) {
        maxPOI = oi;
        pWallRaw = p.strike;
      }
    });

    const sortedStrikes = Array.from(strikes).sort((a, b) => a - b);
    const filteredStrikes = sortedStrikes.filter(
      s => s >= spotPrice * 0.65 && s <= spotPrice * 1.35
    );

    const inDisplayRange = (s: number) => strikeRange === 'all' ? true : (s >= spotPrice * (1 - strikeRange / 100) && s <= spotPrice * (1 + strikeRange / 100));

    // 1. Strike rows
    const rows = filteredStrikes.map(strike => {
      const c = callMap.get(strike) || { oi: 0, vol: 0 };
      const p = putMap.get(strike) || { oi: 0, vol: 0 };

      return {
        strike,
        strikeLabel: `$${strike}`,
        callOI: c.oi,
        putOI: p.oi,
        callVol: c.vol,
        putVol: p.vol,
        netOI: c.oi - p.oi,
        totalOI: c.oi + p.oi
      };
    });

    // 2. Max Pain Total Payout Curve ($ Millions)
    const painCurve = filteredStrikes.map(testStrike => {
      let callPayout = 0;
      let putPayout = 0;

      calls.forEach(c => {
        if (testStrike > c.strike) {
          callPayout += (testStrike - c.strike) * (c.openInterest || 0) * 100;
        }
      });
      puts.forEach(p => {
        if (testStrike < p.strike) {
          putPayout += (p.strike - testStrike) * (p.openInterest || 0) * 100;
        }
      });

      const totalPayoutM = (callPayout + putPayout) / 1_000_000;

      return {
        strike: testStrike,
        strikeLabel: `$${testStrike}`,
        totalPayoutM: Number(totalPayoutM.toFixed(1)),
        callPayoutM: Number((callPayout / 1_000_000).toFixed(1)),
        putPayoutM: Number((putPayout / 1_000_000).toFixed(1)),
        isMaxPain: testStrike === maxPainStrike
      };
    });

    // 3. Cumulative Open Interest Curve
    let runningCallOI = 0;
    let runningPutOI = 0;
    const cumOIData = filteredStrikes.map(strike => {
      const c = callMap.get(strike)?.oi || 0;
      const p = putMap.get(strike)?.oi || 0;
      runningCallOI += c;
      runningPutOI += p;

      return {
        strike,
        strikeLabel: `$${strike}`,
        cumCallOI: runningCallOI,
        cumPutOI: runningPutOI
      };
    });

    // 4. Liquidity: composite score (spread + volume + OI) per strike
    const liquidity = filteredStrikes.map(strike => {
      const c = callRawMap.get(strike);
      const p = putRawMap.get(strike);
      const cLiq = computeLiquidity(c?.bid, c?.ask, c?.midPrice, c?.volume, c?.openInterest);
      const pLiq = computeLiquidity(p?.bid, p?.ask, p?.midPrice, p?.volume, p?.openInterest);
      return {
        strike,
        strikeLabel: `$${strike}`,
        callScore: cLiq.score ?? 0,
        putScore: pLiq.score ?? 0,
        callSpreadPct: cLiq.spreadPct != null ? Number((cLiq.spreadPct * 100).toFixed(2)) : null,
        putSpreadPct: pLiq.spreadPct != null ? Number((pLiq.spreadPct * 100).toFixed(2)) : null,
      };
    });

    return {
      chartData: rows,
      displayChartData: rows.filter(r => inDisplayRange(r.strike)),
      maxPainCurveData: painCurve,
      displayMaxPainData: painCurve.filter(r => inDisplayRange(r.strike)),
      cumulativeOIData: cumOIData,
      displayCumulativeOIData: cumOIData.filter(r => inDisplayRange(r.strike)),
      liquidityData: liquidity,
      displayLiquidityData: liquidity.filter(r => inDisplayRange(r.strike)),
      callWall: maxCOI > 0 ? cWallRaw : null,
      putWall: maxPOI > 0 ? pWallRaw : null,
      totalCallOI: totalCOI,
      totalPutOI: totalPOI,
      totalCallVol: totalCVol,
      totalPutVol: totalPVol
    };
  }, [calls, puts, spotPrice, maxPainStrike, strikeRange]);

  // Custom Rich Tooltip for Open Interest
  const CustomOITooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const strike = data.strike;
      const diffDollars = strike - spotPrice;
      const diffPct = (diffDollars / spotPrice) * 100;
      const isCallWall = strike === callWall;
      const isPutWall = strike === putWall;
      const isMaxPain = strike === maxPainStrike;
      const pcStrikeRatio = data.callOI > 0 ? (data.putOI / data.callOI).toFixed(2) : '—';

      return (
        <div className="bg-slate-900/95 dark:bg-slate-950/95 text-white border border-slate-700/80 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs font-mono max-w-xs space-y-2">
          <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-1.5">
            <span className="font-bold text-sm text-amber-400">${strike.toLocaleString()}</span>
            <span className="text-[11px] text-slate-400">
              {diffDollars >= 0 ? `+${diffDollars.toFixed(1)}` : diffDollars.toFixed(1)} ({diffPct >= 0 ? '+' : ''}{diffPct.toFixed(2)}%)
            </span>
          </div>

          {(isCallWall || isPutWall || isMaxPain) && (
            <div className="flex flex-wrap gap-1">
              {isCallWall && <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-[10px] py-0">Call Wall (Peak OI)</Badge>}
              {isPutWall && <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/40 text-[10px] py-0">Put Wall (Peak OI)</Badge>}
              {isMaxPain && <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 text-[10px] py-0">Max Pain Point</Badge>}
            </div>
          )}

          <div className="space-y-1 pt-0.5">
            <div className="flex justify-between items-center text-blue-400">
              <span>Call Open Interest:</span>
              <span className="font-bold">{data.callOI.toLocaleString()} contracts</span>
            </div>
            <div className="flex justify-between items-center text-rose-400">
              <span>Put Open Interest:</span>
              <span className="font-bold">{data.putOI.toLocaleString()} contracts</span>
            </div>
            <div className="flex justify-between items-center text-slate-300 border-t border-slate-700/60 pt-1">
              <span>Total Strike OI:</span>
              <span className="font-bold">{data.totalOI.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 text-[11px]">
              <span>Put/Call OI Ratio:</span>
              <span>{pcStrikeRatio}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Call Wall */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Call Wall (Resistance)</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-mono font-extrabold text-teal-600 dark:text-teal-400">
              {callWall !== null ? `$${callWall.toLocaleString()}` : '—'}
            </span>
            {callWall !== null && (
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                (+{((callWall - spotPrice) / spotPrice * 100).toFixed(1)}%)
              </span>
            )}
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
            {hasOpenInterest ? 'Highest Call Open Interest cluster' : 'No open interest data for this source'}
          </p>
        </div>

        {/* Card 2: Put Wall */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Put Wall (Support)</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-mono font-extrabold text-[#A8672E] dark:text-[#D08F52]">
              {putWall !== null ? `$${putWall.toLocaleString()}` : '—'}
            </span>
            {putWall !== null && (
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                ({((putWall - spotPrice) / spotPrice * 100).toFixed(1)}%)
              </span>
            )}
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
            {hasOpenInterest ? 'Highest Put Open Interest cluster' : 'No open interest data for this source'}
          </p>
        </div>

        {/* Card 3: Max Pain */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Max Pain Strike</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
              {maxPainStrike ? `$${maxPainStrike.toLocaleString()}` : '—'}
            </span>
            {maxPainStrike && (
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                ({maxPainStrike >= spotPrice ? '+' : ''}{(maxPainStrike - spotPrice).toFixed(1)})
              </span>
            )}
          </div>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">Settlement minimizes option buyer payout</p>
        </div>

        {/* Card 4: Open Interest Distribution */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all">
          <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total OI Ratio</span>
          {hasOpenInterest ? (
            <>
              <div className="flex items-center gap-2 mt-1 font-mono">
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400">C: {(totalCallOI / 1000).toFixed(1)}k</span>
                <span className="text-gray-300 dark:text-gray-700">/</span>
                <span className="text-sm font-bold text-[#A8672E] dark:text-[#D08F52]">P: {(totalPutOI / 1000).toFixed(1)}k</span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                P/C Ratio: {totalCallOI > 0 ? (totalPutOI / totalCallOI).toFixed(2) : '1.0'} {totalPutOI > totalCallOI ? '(Put Skewed)' : '(Call Skewed)'}
              </p>
            </>
          ) : (
            <>
              <div className="text-sm font-mono font-bold text-slate-400 mt-1">—</div>
              <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">No open interest data for this source</p>
            </>
          )}
        </div>
      </div>

      {/* Main Chart */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
        <div className="p-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
              {subView === 'oi' && 'Open Interest (OI) by Strike'}
              {subView === 'volume' && 'Trading Volume Distribution by Strike'}
              {subView === 'maxPainCurve' && 'Max Pain Cumulative Payout Loss Curve ($M)'}
              {subView === 'cumulativeOI' && 'Cumulative Open Interest Curve (Calls vs Puts)'}
              {subView === 'liquidity' && 'Liquidity Score by Strike (0-100)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subView === 'oi' && `${expiration} (${dte} DTE) — Open contracts resting across strikes`}
              {subView === 'volume' && `${expiration} (${dte} DTE) — Day's traded volume across strikes`}
              {subView === 'maxPainCurve' && `Total dollar amount option sellers must pay out if SPX settles at each strike`}
              {subView === 'cumulativeOI' && `Running sum of open contracts accumulating across the strike spectrum`}
              {subView === 'liquidity' && `Composite of bid-ask spread, volume, and open interest — higher means tighter fills near mid`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Strike Range Zoom Controls */}
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

            {/* Sub-view Selector */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setSubView('oi')}
                className={`px-3 py-1 rounded-md transition-all ${
                  subView === 'oi' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Open Interest
              </button>
              <button
                onClick={() => setSubView('volume')}
                className={`px-3 py-1 rounded-md transition-all ${
                  subView === 'volume' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Volume
              </button>
              <button
                onClick={() => setSubView('maxPainCurve')}
                className={`px-3 py-1 rounded-md transition-all ${
                  subView === 'maxPainCurve' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Max Pain Curve
              </button>
              <button
                onClick={() => setSubView('cumulativeOI')}
                className={`px-3 py-1 rounded-md transition-all ${
                  subView === 'cumulativeOI' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Cumulative OI
              </button>
              <button
                onClick={() => setSubView('liquidity')}
                className={`px-3 py-1 rounded-md transition-all ${
                  subView === 'liquidity' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Liquidity
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="h-[420px] w-full">
            {!hasOpenInterest && subView !== 'volume' && subView !== 'liquidity' ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2">
                <Info className="h-6 w-6 text-slate-400" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Open interest data not available</p>
                <p className="text-xs text-slate-500 max-w-md">
                  This view is built from each contract&apos;s open interest, which the Historical
                  Snapshot source doesn&apos;t include. Switch to the Live source, or see the Volume tab
                  for real historical activity.
                </p>
              </div>
            ) : (
              <>
            {/* VIEW 1: OPEN INTEREST */}
            {subView === 'oi' && (
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
                    tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  />
                  <Tooltip content={<CustomOITooltip />} />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    strokeWidth={1.5}
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                  />
                  {maxPainStrike && (
                    <ReferenceLine 
                      x={maxPainStrike} 
                      stroke="#06b6d4" 
                      strokeDasharray="3 3" 
                      strokeWidth={1.5}
                      label={{ value: `Max Pain: $${maxPainStrike}`, position: 'insideTop', fill: '#0891b2', fontSize: 10, fontWeight: 'bold' }}
                    />
                  )}
                  <Bar dataKey="callOI" name="Call Open Interest" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="putOI" name="Put Open Interest" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 2: VOLUME */}
            {subView === 'volume' && (
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
                    tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name === 'callVol' ? 'Call Volume' : 'Put Volume'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                  />
                  <Bar dataKey="callVol" name="Call Volume" fill="#2563eb" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="putVol" name="Put Volume" fill="#e11d48" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 3: MAX PAIN TOTAL LOSS CURVE */}
            {subView === 'maxPainCurve' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayMaxPainData} margin={{ top: 15, right: 30, left: 10, bottom: 25 }}>
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
                      name === 'totalPayoutM' ? 'Total Payout' : name === 'callPayoutM' ? 'Call Payout' : 'Put Payout'
                    ]}
                    labelFormatter={(label) => `Settlement Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                  />
                  {maxPainStrike && (
                    <ReferenceLine 
                      x={maxPainStrike} 
                      stroke="#06b6d4" 
                      strokeWidth={2}
                      label={{ value: `Max Pain: $${maxPainStrike}`, position: 'insideTop', fill: '#0891b2', fontSize: 11, fontWeight: 'bold' }}
                    />
                  )}
                  <Line 
                    type="monotone" 
                    dataKey="totalPayoutM" 
                    name="Total Option Payout ($M)" 
                    stroke="#0284c7" 
                    strokeWidth={3} 
                    dot={false} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="callPayoutM" 
                    name="Call Payout ($M)" 
                    stroke="#3b82f6" 
                    strokeWidth={1.5} 
                    strokeDasharray="3 3" 
                    dot={false} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="putPayoutM" 
                    name="Put Payout ($M)" 
                    stroke="#f43f5e" 
                    strokeWidth={1.5} 
                    strokeDasharray="3 3" 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 4: CUMULATIVE OPEN INTEREST */}
            {subView === 'cumulativeOI' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayCumulativeOIData} margin={{ top: 15, right: 30, left: 10, bottom: 25 }}>
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
                    tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name === 'cumCallOI' ? 'Cumulative Call OI' : 'Cumulative Put OI'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cumCallOI" 
                    name="Cumulative Call OI" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.2} 
                    strokeWidth={2.5} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cumPutOI" 
                    name="Cumulative Put OI" 
                    stroke="#f43f5e" 
                    fill="#f43f5e" 
                    fillOpacity={0.2} 
                    strokeWidth={2.5} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 5: LIQUIDITY */}
            {subView === 'liquidity' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayLiquidityData} margin={{ top: 15, right: 30, left: 10, bottom: 25 }}>
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
                    domain={[0, 100]}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value} / 100`,
                      name === 'callScore' ? 'Call Liquidity' : 'Put Liquidity'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine
                    x={spotPrice}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }}
                  />
                  <Bar dataKey="callScore" name="Call Liquidity" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="putScore" name="Put Liquidity" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
              </>
            )}
          </div>
        </div>

        {/* Positioning Strategy Insights */}
        <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Structure Summary:
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {maxPainStrike 
                  ? `Max Pain sits at $${maxPainStrike} (${maxPainStrike >= spotPrice ? `+$${(maxPainStrike - spotPrice).toFixed(0)} above spot` : `-$${(spotPrice - maxPainStrike).toFixed(0)} below spot`}). Call resistance at $${callWall ?? '—'}, Put floor at $${putWall ?? '—'}.`
                  : 'Open interest and volume distribution across strikes.'}
              </span>
            </div>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-[#A8672E] dark:text-[#D08F52] font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto flex-shrink-0"
            >
              <span>{showGuide ? 'Hide Methodology' : 'Learn Positioning Theory'}</span>
              {showGuide ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {showGuide && (
            <div className="mt-3 pt-3 border-t border-gray-200/60 dark:border-gray-700/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 mb-1">
                  <Target className="h-3.5 w-3.5 text-cyan-500" /> Max Pain Gravitation
                </span>
                Option sellers (institutional market makers) seek to minimize cumulative payouts at expiration. Near expiration, price often exhibits a statistical &ldquo;pin&rdquo; toward the Max Pain point.
              </div>
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 mb-1">
                  <Shield className="h-3.5 w-3.5 text-blue-500" /> Call &amp; Put Walls
                </span>
                Strikes with massive open interest act as structural support and resistance. Call walls create overhead supply as calls are sold to close or dealer hedges unwind; put walls provide downside cushioning.
              </div>
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 mb-1">
                  <Droplets className="h-3.5 w-3.5 text-amber-500" /> Liquidity Composite
                </span>
                Combines proportional bid-ask spread with traded volume and open interest. High liquidity scores indicate deep order books where multi-leg orders execute close to theoretical fair value.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
