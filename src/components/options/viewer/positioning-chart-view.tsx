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
import { BarChart3, Target, Shield, Flame, Scale, Layers, Info, Droplets } from 'lucide-react';
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

export function PositioningChartView({
  calls,
  puts,
  spotPrice,
  maxPainStrike,
  expiration,
  dte
}: PositioningChartViewProps) {
  const [subView, setSubView] = useState<PositioningSubView>('oi');

  // OptionsDX's EOD schema (the Historical Snapshot source) carries no open-interest column at
  // all, so every contract's openInterest is null there, not a real zero — gate every OI-derived
  // figure below on this rather than let them silently compute off fabricated zeros.
  const hasOpenInterest = calls.some(c => c.openInterest != null) || puts.some(p => p.openInterest != null);

  // Build strike-by-strike datasets
  const { chartData, maxPainCurveData, cumulativeOIData, liquidityData, callWall, putWall, totalCallOI, totalPutOI, totalCallVol, totalPutVol } = useMemo(() => {
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
      s => s >= spotPrice * 0.84 && s <= spotPrice * 1.16
    );

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

    // 4. Liquidity: composite score (spread + volume + OI) per strike, both sides — see
    // lib/options/liquidity.ts for why spread gates rather than just averages into the score.
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
      maxPainCurveData: painCurve,
      cumulativeOIData: cumOIData,
      liquidityData: liquidity,
      callWall: maxCOI > 0 ? cWallRaw : null,
      putWall: maxPOI > 0 ? pWallRaw : null,
      totalCallOI: totalCOI,
      totalPutOI: totalPOI,
      totalCallVol: totalCVol,
      totalPutVol: totalPVol
    };
  }, [calls, puts, spotPrice, maxPainStrike]);

  return (
    <div className="space-y-4">
      {/* HUD Cards for Positioning */}
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
            {hasOpenInterest ? 'Highest Call Open Interest' : 'No open interest data for this source'}
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
            {hasOpenInterest ? 'Highest Put Open Interest' : 'No open interest data for this source'}
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
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">Where buyers lose most payout</p>
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
                P/C OI: {totalCallOI > 0 ? (totalPutOI / totalCallOI).toFixed(2) : '1.0'}
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
              {subView === 'oi' && `${expiration} (${dte} DTE) — Open contracts resting at each strike`}
              {subView === 'volume' && `${expiration} (${dte} DTE) — Day's traded volume across strikes`}
              {subView === 'maxPainCurve' && `Total dollar amount option sellers must pay out if SPX settles at each strike`}
              {subView === 'cumulativeOI' && `Running sum of open contracts accumulating across the strike spectrum`}
              {subView === 'liquidity' && `Composite of bid-ask spread, volume, and open interest — higher means easier to get filled near mid`}
            </p>
          </div>

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

        <div className="p-4">
          <div className="h-[400px] w-full">
            {!hasOpenInterest && subView !== 'volume' && subView !== 'liquidity' ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2">
                <Info className="h-6 w-6 text-slate-400" />
                <p className="text-sm font-semibold text-slate-700">Open interest data not available</p>
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
                    tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name === 'callOI' ? 'Call OI' : 'Put OI'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  {maxPainStrike && (
                    <ReferenceLine 
                      x={maxPainStrike} 
                      stroke="#06b6d4" 
                      strokeDasharray="3 3" 
                      label={{ value: `Max Pain: $${maxPainStrike}`, position: 'top', fill: '#0891b2', fontSize: 10 }}
                    />
                  )}
                  <Bar dataKey="callOI" name="Call Open Interest" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="putOI" name="Put Open Interest" fill="#f43f5e" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 2: VOLUME */}
            {subView === 'volume' && (
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
                    tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name === 'callVol' ? 'Call Volume' : 'Put Volume'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  <Bar dataKey="callVol" name="Call Volume" fill="#2563eb" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="putVol" name="Put Volume" fill="#e11d48" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 3: MAX PAIN TOTAL LOSS CURVE */}
            {subView === 'maxPainCurve' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={maxPainCurveData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
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
                      name === 'totalPayoutM' ? 'Total Payout' : name === 'callPayoutM' ? 'Call Payout' : 'Put Payout'
                    ]}
                    labelFormatter={(label) => `Settlement Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  {maxPainStrike && (
                    <ReferenceLine 
                      x={maxPainStrike} 
                      stroke="#06b6d4" 
                      strokeWidth={2}
                      label={{ value: `Max Pain: $${maxPainStrike}`, position: 'top', fill: '#0891b2', fontSize: 11 }}
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
                <AreaChart data={cumulativeOIData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
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
                    tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name === 'cumCallOI' ? 'Cumulative Call OI' : 'Cumulative Put OI'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
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
                <BarChart data={liquidityData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
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
                    domain={[0, 100]}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value} / 100`,
                      name === 'callScore' ? 'Call Liquidity' : 'Put Liquidity'
                    ]}
                    labelFormatter={(label) => `Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine
                    x={spotPrice}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  <Bar dataKey="callScore" name="Call Liquidity" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="putScore" name="Put Liquidity" fill="#f43f5e" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
