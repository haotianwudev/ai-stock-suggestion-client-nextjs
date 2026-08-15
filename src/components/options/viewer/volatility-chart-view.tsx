"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Legend,
  Area,
  AreaChart,
  BarChart,
  Bar
} from 'recharts';
import { OptionContractData } from './options-matrix-table';
import { 
  Gauge, 
  Activity, 
  Layers, 
  TrendingUp, 
  TrendingDown, 
  Flame, 
  Scale, 
  Sparkles,
  PieChart
} from 'lucide-react';

interface ExpirationItem {
  expiration: string;
  daysToExpiration: number;
  calls: OptionContractData[];
  puts: OptionContractData[];
}

interface VolatilityChartViewProps {
  currentExpiration: string;
  expirations: ExpirationItem[];
  spotPrice: number;
  ticker: string;
}

type VolSubView = 'smile' | 'multiSmile' | 'termStructure' | 'rnd' | 'skewCurve';

export function VolatilityChartView({
  currentExpiration,
  expirations,
  spotPrice,
  ticker
}: VolatilityChartViewProps) {
  const [subView, setSubView] = useState<VolSubView>('smile');
  const [compareExpirations, setCompareExpirations] = useState<string[]>([]);

  // Active expiration data
  const currentExpData = useMemo(() => {
    return expirations.find(e => e.expiration === currentExpiration) || expirations[0];
  }, [expirations, currentExpiration]);

  // Set default comparison expirations (e.g. next 2 liquid cycles)
  useMemo(() => {
    if (expirations.length > 1 && compareExpirations.length === 0) {
      const candidates = expirations.slice(0, 4).map(e => e.expiration);
      setCompareExpirations(candidates);
    }
  }, [expirations, compareExpirations.length]);

  // 1. Single Expiration IV Smile / Skew Dataset (Strike vs IV)
  const smileData = useMemo(() => {
    if (!currentExpData) return [];

    const callMap = new Map<number, number>();
    const putMap = new Map<number, number>();
    const strikes = new Set<number>();

    currentExpData.calls.forEach(c => {
      if (c.impliedVolatilityMid && c.impliedVolatilityMid > 0) {
        callMap.set(c.strike, Math.round(c.impliedVolatilityMid * 1000) / 10);
        strikes.add(c.strike);
      }
    });

    currentExpData.puts.forEach(p => {
      if (p.impliedVolatilityMid && p.impliedVolatilityMid > 0) {
        putMap.set(p.strike, Math.round(p.impliedVolatilityMid * 1000) / 10);
        strikes.add(p.strike);
      }
    });

    const sortedStrikes = Array.from(strikes).sort((a, b) => a - b);
    const filteredStrikes = sortedStrikes.filter(
      s => s >= spotPrice * 0.78 && s <= spotPrice * 1.22
    );

    return filteredStrikes.map(strike => {
      const callIV = callMap.get(strike) ?? null;
      const putIV = putMap.get(strike) ?? null;
      const avgIV = callIV && putIV ? Number(((callIV + putIV) / 2).toFixed(1)) : (callIV || putIV);

      return {
        strike,
        strikeLabel: `$${strike}`,
        callIV,
        putIV,
        midIV: avgIV,
        moneyness: Number((strike / spotPrice).toFixed(3))
      };
    });
  }, [currentExpData, spotPrice]);

  // 2. Multi-Expiration IV Smile Overlay
  const multiSmileData = useMemo(() => {
    if (expirations.length === 0) return [];

    const selectedExps = expirations.filter(e => compareExpirations.includes(e.expiration));
    if (selectedExps.length === 0) return [];

    const allStrikes = new Set<number>();
    const expMaps: Record<string, Map<number, number>> = {};

    selectedExps.forEach(exp => {
      const m = new Map<number, number>();
      exp.calls.forEach(c => {
        if (c.impliedVolatilityMid && c.impliedVolatilityMid > 0) {
          m.set(c.strike, Math.round(c.impliedVolatilityMid * 1000) / 10);
          allStrikes.add(c.strike);
        }
      });
      exp.puts.forEach(p => {
        if (p.impliedVolatilityMid && p.impliedVolatilityMid > 0) {
          if (!m.has(p.strike)) {
            m.set(p.strike, Math.round(p.impliedVolatilityMid * 1000) / 10);
            allStrikes.add(p.strike);
          }
        }
      });
      expMaps[exp.expiration] = m;
    });

    const sortedStrikes = Array.from(allStrikes).sort((a, b) => a - b).filter(
      s => s >= spotPrice * 0.82 && s <= spotPrice * 1.18
    );

    return sortedStrikes.map(strike => {
      const row: Record<string, any> = {
        strike,
        strikeLabel: `$${strike}`
      };
      selectedExps.forEach(exp => {
        row[exp.expiration] = expMaps[exp.expiration]?.get(strike) ?? null;
      });
      return row;
    });
  }, [expirations, compareExpirations, spotPrice]);

  // 3. Vol Term Structure & Forward Implied Volatility
  const termStructureData = useMemo(() => {
    const raw = expirations
      .map(exp => {
        const allContracts = [...exp.calls, ...exp.puts].filter(
          c => c.impliedVolatilityMid && c.impliedVolatilityMid > 0
        );
        if (allContracts.length === 0) return null;

        const atmContract = allContracts.reduce((best, curr) => 
          Math.abs(curr.strike - spotPrice) < Math.abs(best.strike - spotPrice) ? curr : best
        );

        const ivPct = Number((atmContract.impliedVolatilityMid! * 100).toFixed(1));

        return {
          expiration: exp.expiration,
          label: `${exp.expiration.slice(5)} (${exp.daysToExpiration}d)`,
          dte: exp.daysToExpiration,
          atmIV: ivPct,
          atmStrike: atmContract.strike,
          tYears: Math.max(0.001, exp.daysToExpiration / 365)
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => a.dte - b.dte);

    // Compute Forward Implied Volatility: Fwd_IV = sqrt((T2*IV2^2 - T1*IV1^2)/(T2 - T1))
    return raw.map((item, idx) => {
      let fwdIV: number | null = null;
      if (idx > 0) {
        const prev = raw[idx - 1];
        const dt = item.tYears - prev.tYears;
        if (dt > 0.001) {
          const var1 = (prev.atmIV / 100) ** 2 * prev.tYears;
          const var2 = (item.atmIV / 100) ** 2 * item.tYears;
          const fwdVar = (var2 - var1) / dt;
          if (fwdVar > 0) {
            fwdIV = Number((Math.sqrt(fwdVar) * 100).toFixed(1));
          }
        }
      }
      return {
        ...item,
        forwardIV: fwdIV ?? item.atmIV
      };
    });
  }, [expirations, spotPrice]);

  // 4. Risk-Neutral Implied Probability Density Function (RND - Breeden-Litzenberger)
  const rndData = useMemo(() => {
    if (!currentExpData || currentExpData.calls.length < 5) return [];

    const calls = currentExpData.calls
      .filter(c => c.midPrice && c.midPrice > 0)
      .sort((a, b) => a.strike - b.strike);

    if (calls.length < 5) return [];

    const step = 5; // SPX 5-point strike interval
    const densityRows = [];
    let sumDensity = 0;

    for (let i = 1; i < calls.length - 1; i++) {
      const prev = calls[i - 1];
      const curr = calls[i];
      const next = calls[i + 1];

      const dK1 = curr.strike - prev.strike;
      const dK2 = next.strike - curr.strike;

      if (dK1 > 0 && dK2 > 0 && dK1 <= 25 && dK2 <= 25) {
        // Second derivative of Call price with respect to Strike: C''(K)
        const d2C = (next.midPrice! - 2 * curr.midPrice! + prev.midPrice!) / (dK1 * dK2);
        const density = Math.max(0, d2C);
        sumDensity += density;

        densityRows.push({
          strike: curr.strike,
          rawDensity: density,
          midPrice: curr.midPrice
        });
      }
    }

    if (sumDensity === 0) return [];

    // Filter within +/- 15% of spot
    return densityRows
      .filter(r => r.strike >= spotPrice * 0.88 && r.strike <= spotPrice * 1.12)
      .map(r => ({
        strike: r.strike,
        strikeLabel: `$${r.strike}`,
        probabilityPct: Number(((r.rawDensity / sumDensity) * 100).toFixed(3)),
        isATM: Math.abs(r.strike - spotPrice) <= 5
      }));
  }, [currentExpData, spotPrice]);

  // 5. 25-Delta Skew & Kurtosis Curve across all Expirations
  const skewTermData = useMemo(() => {
    return expirations
      .map(exp => {
        const callsWithDelta = exp.calls.filter(c => c.delta && c.delta > 0 && c.impliedVolatilityMid);
        const putsWithDelta = exp.puts.filter(p => p.delta && p.delta < 0 && p.impliedVolatilityMid);

        if (callsWithDelta.length === 0 || putsWithDelta.length === 0) return null;

        const call25 = callsWithDelta.reduce((best, c) => 
          Math.abs((c.delta || 0) - 0.25) < Math.abs((best?.delta || 1) - 0.25) ? c : best, callsWithDelta[0]
        );
        const put25 = putsWithDelta.reduce((best, p) => 
          Math.abs(Math.abs(p.delta || 0) - 0.25) < Math.abs(Math.abs(best?.delta || 1) - 0.25) ? p : best, putsWithDelta[0]
        );
        const atm = exp.calls.reduce((best, c) => 
          Math.abs(c.strike - spotPrice) < Math.abs(best.strike - spotPrice) ? c : best, exp.calls[0]
        );

        if (!call25?.impliedVolatilityMid || !put25?.impliedVolatilityMid || !atm?.impliedVolatilityMid) return null;

        const c25 = call25.impliedVolatilityMid * 100;
        const p25 = put25.impliedVolatilityMid * 100;
        const atmIv = atm.impliedVolatilityMid * 100;

        const skewRR = Number((p25 - c25).toFixed(2));
        const butterfly = Number((((p25 + c25) / 2) - atmIv).toFixed(2));

        return {
          expiration: exp.expiration,
          label: `${exp.expiration.slice(5)} (${exp.daysToExpiration}d)`,
          dte: exp.daysToExpiration,
          riskReversal25: skewRR,
          butterfly25: butterfly,
          put25IV: Number(p25.toFixed(1)),
          call25IV: Number(c25.toFixed(1))
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => a.dte - b.dte);
  }, [expirations, spotPrice]);

  // Overall active summary stats
  const activeMetrics = useMemo(() => {
    if (!currentExpData) return null;

    const currentSmile = smileData.find(d => Math.abs(d.strike - spotPrice) <= 5);
    const atmIV = currentSmile?.midIV ?? null;
    const skewItem = skewTermData.find(s => s.expiration === currentExpData.expiration) ?? skewTermData[0];

    const frontATM = termStructureData[0]?.atmIV ?? 15;
    const backATM = termStructureData[termStructureData.length - 1]?.atmIV ?? 18;
    const isContango = backATM > frontATM;

    return {
      atmIV,
      skewRR: skewItem?.riskReversal25 ?? null,
      fly: skewItem?.butterfly25 ?? null,
      put25: skewItem?.put25IV ?? null,
      call25: skewItem?.call25IV ?? null,
      isContango,
      frontATM,
      backATM
    };
  }, [currentExpData, smileData, spotPrice, skewTermData, termStructureData]);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

  return (
    <div className="space-y-4">
      {/* 4 Top KPI Volatility Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: ATM IV */}
        <Card className="bg-white border-slate-200 shadow-2xs">
          <CardContent className="p-3.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">ATM Implied Volatility</span>
            <div className="text-xl font-extrabold text-purple-700 mt-0.5">
              {activeMetrics?.atmIV ? `${activeMetrics.atmIV.toFixed(1)}%` : '—'}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">{currentExpData?.expiration} ({currentExpData?.daysToExpiration} DTE)</p>
          </CardContent>
        </Card>

        {/* Card 2: 25-Delta Skew / Risk Reversal */}
        <Card className="bg-white border-slate-200 shadow-2xs">
          <CardContent className="p-3.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">25Δ Risk Reversal (Skew)</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-extrabold text-slate-900">
                {activeMetrics?.skewRR !== null ? `${activeMetrics?.skewRR! > 0 ? '+' : ''}${activeMetrics?.skewRR}%` : '—'}
              </span>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${
                (activeMetrics?.skewRR ?? 0) > 0 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {(activeMetrics?.skewRR ?? 0) > 0 ? 'Put Skew' : 'Call Skew'}
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">P 25Δ ({activeMetrics?.put25}%) vs C 25Δ ({activeMetrics?.call25}%)</p>
          </CardContent>
        </Card>

        {/* Card 3: 25-Delta Butterfly (Kurtosis/Tails) */}
        <Card className="bg-white border-slate-200 shadow-2xs">
          <CardContent className="p-3.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">25Δ Butterfly (Convexity)</span>
            <div className="text-xl font-extrabold text-slate-800 mt-0.5">
              {activeMetrics?.fly !== null ? `+${activeMetrics?.fly}%` : '—'}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Wing curvature over ATM base</p>
          </CardContent>
        </Card>

        {/* Card 4: Term Structure Regime */}
        <Card className="bg-white border-slate-200 shadow-2xs">
          <CardContent className="p-3.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Term Structure Slope</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-bold text-slate-900">
                {activeMetrics?.isContango ? 'Contango' : 'Backwardation'}
              </span>
              <Badge className={`text-[10px] px-1.5 py-0 ${
                activeMetrics?.isContango ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {activeMetrics?.isContango ? 'Normal' : 'Inverted'}
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Front {activeMetrics?.frontATM}% → Back {activeMetrics?.backATM}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Comprehensive Chart Window */}
      <Card className="bg-white border-slate-200 shadow-xs">
        <CardHeader className="p-4 pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Gauge className="h-5 w-5 text-purple-600" />
              {subView === 'smile' && `SPX Volatility Smile & Skew (${currentExpData?.expiration})`}
              {subView === 'multiSmile' && `Multi-Expiration Volatility Surface Comparison`}
              {subView === 'termStructure' && `SPX Volatility Term Structure & Forward Vol Curve`}
              {subView === 'rnd' && `Breeden-Litzenberger Implied Probability Density (RND)`}
              {subView === 'skewCurve' && `25-Delta Risk Reversal & Skew Term Structure`}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              {subView === 'smile' && `Implied Volatility (%) curve across strikes for ${currentExpData?.expiration} (${currentExpData?.daysToExpiration} DTE)`}
              {subView === 'multiSmile' && `Comparing volatility smiles across multiple SPX expiration cycles`}
              {subView === 'termStructure' && `ATM Implied Volatility and Forward Volatility across all ${expirations.length} expiration dates`}
              {subView === 'rnd' && `Market-implied probability distribution where SPX will settle at ${currentExpData?.expiration} expiration`}
              {subView === 'skewCurve' && `Put downside tail-risk demand (25Δ Put IV - 25Δ Call IV) plotted across DTE`}
            </CardDescription>
          </div>

          {/* 5-Way Sub-View Selector */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setSubView('smile')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'smile' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IV Smile
            </button>
            <button
              onClick={() => setSubView('multiSmile')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'multiSmile' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Multi-Cycle
            </button>
            <button
              onClick={() => setSubView('termStructure')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'termStructure' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Term Structure
            </button>
            <button
              onClick={() => setSubView('rnd')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'rnd' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Probability (RND)
            </button>
            <button
              onClick={() => setSubView('skewCurve')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'skewCurve' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              25Δ Skew
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="h-[400px] w-full">
            {/* VIEW 1: SINGLE IV SMILE */}
            {subView === 'smile' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={smileData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    domain={['dataMin - 2', 'dataMax + 2']} 
                    tickFormatter={(val) => `${val}%`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${value}%`, name === 'midIV' ? 'Mid IV' : name === 'putIV' ? 'Put IV' : 'Call IV']}
                    labelFormatter={(label) => `Strike: $${label} (Spot: $${spotPrice.toFixed(1)})`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(1)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="midIV" 
                    name="Mid IV" 
                    stroke="#8b5cf6" 
                    strokeWidth={2.5} 
                    dot={{ r: 2, fill: '#8b5cf6' }} 
                    activeDot={{ r: 5 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="putIV" 
                    name="Put IV" 
                    stroke="#f43f5e" 
                    strokeWidth={1.5} 
                    strokeDasharray="3 3"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="callIV" 
                    name="Call IV" 
                    stroke="#3b82f6" 
                    strokeWidth={1.5} 
                    strokeDasharray="3 3"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 2: MULTI-EXPIRATION SMILE OVERLAY */}
            {subView === 'multiSmile' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={multiSmileData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    domain={['dataMin - 2', 'dataMax + 2']} 
                    tickFormatter={(val) => `${val}%`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${value}%`, name]}
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
                  {compareExpirations.map((exp, idx) => (
                    <Line 
                      key={exp}
                      type="monotone" 
                      dataKey={exp} 
                      name={exp} 
                      stroke={COLORS[idx % COLORS.length]} 
                      strokeWidth={2} 
                      dot={false}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 3: TERM STRUCTURE & FORWARD VOL */}
            {subView === 'termStructure' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={termStructureData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="label" 
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    domain={['dataMin - 3', 'dataMax + 3']} 
                    tickFormatter={(val) => `${val}%`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${value}%`, name === 'atmIV' ? 'ATM Implied Vol' : 'Forward Implied Vol']}
                    labelFormatter={(label, payload) => {
                      const item = payload[0]?.payload;
                      return item ? `${item.expiration} (${item.dte} Days) - ATM Strike: $${item.atmStrike}` : label;
                    }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line 
                    type="monotone" 
                    dataKey="atmIV" 
                    name="ATM Implied Vol" 
                    stroke="#7c3aed" 
                    strokeWidth={3} 
                    dot={{ r: 3, fill: '#7c3aed' }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forwardIV" 
                    name="Forward Implied Vol" 
                    stroke="#06b6d4" 
                    strokeWidth={1.5} 
                    strokeDasharray="3 3"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 4: BREEDEN-LITZENBERGER RISK-NEUTRAL DENSITY (RND) */}
            {subView === 'rnd' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rndData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <defs>
                    <linearGradient id="rndGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(val) => `$${val}`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    tickFormatter={(val) => `${val}%`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Implied Settlement Probability']}
                    labelFormatter={(label) => `SPX Strike: $${label}`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="probabilityPct" 
                    name="Probability Density (%)" 
                    stroke="#2563eb" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#rndGrad)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {/* VIEW 5: 25-DELTA SKEW & BUTTERFLY TERM STRUCTURE */}
            {subView === 'skewCurve' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={skewTermData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="label" 
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <YAxis 
                    tickFormatter={(val) => `${val}%`}
                    stroke="#64748b" 
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value}%`, 
                      name === 'riskReversal25' ? '25Δ Risk Reversal (Put - Call)' : '25Δ Butterfly (Wing Curvature)'
                    ]}
                    labelFormatter={(label, payload) => {
                      const item = payload[0]?.payload;
                      return item ? `${item.expiration} (${item.dte}d) - 25Δ Put: ${item.put25IV}% | 25Δ Call: ${item.call25IV}%` : label;
                    }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <ReferenceLine y={0} stroke="#94a3b8" />
                  <Line 
                    type="monotone" 
                    dataKey="riskReversal25" 
                    name="25Δ Risk Reversal (Skew)" 
                    stroke="#f43f5e" 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#f43f5e' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="butterfly25" 
                    name="25Δ Butterfly (Convexity)" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    dot={{ r: 2, fill: '#3b82f6' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
