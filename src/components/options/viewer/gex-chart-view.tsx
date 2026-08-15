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
import { Zap, ShieldCheck, ShieldAlert, TrendingUp, Sliders, Activity } from 'lucide-react';

interface GexChartViewProps {
  calls: OptionContractData[];
  puts: OptionContractData[];
  spotPrice: number;
  ticker: string;
  expiration: string;
  dte: number;
}

type GexSubView = 'netGex' | 'grossGex' | 'gammaShift' | 'vannaCharm';

export function GexChartView({
  calls,
  puts,
  spotPrice,
  ticker,
  expiration,
  dte
}: GexChartViewProps) {
  const [subView, setSubView] = useState<GexSubView>('netGex');

  // Compute Net GEX, Gross GEX, Vanna, Charm, and Price Shift Simulation
  const { chartData, shiftCurveData, vannaCharmData, totalNetGex, totalCallGex, totalPutGex, gammaFlipLevel } = useMemo(() => {
    const callMap = new Map<number, OptionContractData>();
    const putMap = new Map<number, OptionContractData>();
    const strikes = new Set<number>();

    calls.forEach(c => {
      callMap.set(c.strike, c);
      strikes.add(c.strike);
    });

    puts.forEach(p => {
      putMap.set(p.strike, p);
      strikes.add(p.strike);
    });

    const sortedStrikes = Array.from(strikes).sort((a, b) => a - b);
    const contractMultiplier = 100;
    const spotSquared1Pct = (spotPrice * spotPrice * 0.01) / 1_000_000;

    let totCallGex = 0;
    let totPutGex = 0;

    const filteredStrikes = sortedStrikes.filter(
      s => s >= spotPrice * 0.88 && s <= spotPrice * 1.12
    );

    // 1. Strike GEX Rows
    const rows = filteredStrikes.map(strike => {
      const c = callMap.get(strike);
      const p = putMap.get(strike);

      const cGamma = c?.gamma || 0;
      const cOI = c?.openInterest || 0;
      const callGex = cGamma * cOI * contractMultiplier * spotSquared1Pct;

      const pGamma = p?.gamma || 0;
      const pOI = p?.openInterest || 0;
      // Market makers short customer puts -> negative gamma
      const putGex = -(pGamma * pOI * contractMultiplier * spotSquared1Pct);

      const netGex = callGex + putGex;

      totCallGex += callGex;
      totPutGex += putGex;

      return {
        strike,
        strikeLabel: `$${strike}`,
        callGex: Number(callGex.toFixed(2)),
        putGex: Number(Math.abs(putGex).toFixed(2)),
        netGex: Number(netGex.toFixed(2))
      };
    });

    const totalNet = totCallGex + totPutGex;

    // Find Gamma Flip Level
    let flip: number | null = null;
    for (let i = 0; i < rows.length - 1; i++) {
      if ((rows[i].netGex <= 0 && rows[i + 1].netGex > 0) || (rows[i].netGex >= 0 && rows[i + 1].netGex < 0)) {
        flip = rows[i].strike;
        break;
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

        const cG = (c?.gamma || 0.001) * (c?.openInterest || 0) * decay;
        const pG = -(p?.gamma || 0.001) * (p?.openInterest || 0) * decay;

        simGex += (cG + pG) * contractMultiplier * ((simSpot * simSpot * 0.01) / 1_000_000);
      });

      return {
        pctShift: `${pct > 0 ? '+' : ''}${pct}%`,
        simSpot: Math.round(simSpot),
        simNetGex: Number(simGex.toFixed(1)),
        isCurrent: pct === 0
      };
    });

    // 3. Vanna & Charm Exposure Estimates
    const vannaCharmRows = filteredStrikes.map(strike => {
      const c = callMap.get(strike);
      const p = putMap.get(strike);

      // Vanna approx: Delta * (1 - Delta) * Vega-weight
      const cDelta = c?.delta || 0;
      const pDelta = p?.delta || 0;
      const cOI = c?.openInterest || 0;
      const pOI = p?.openInterest || 0;

      const vannaFlow = ((cDelta * (1 - cDelta) * cOI) - (Math.abs(pDelta) * (1 - Math.abs(pDelta)) * pOI)) * 0.01;
      const charmFlow = (-((c?.theta || 0) * cOI) + ((p?.theta || 0) * pOI)) * 0.001;

      return {
        strike,
        strikeLabel: `$${strike}`,
        vanna: Number(vannaFlow.toFixed(2)),
        charm: Number(charmFlow.toFixed(2))
      };
    });

    return {
      chartData: rows,
      shiftCurveData: shiftCurve,
      vannaCharmData: vannaCharmRows,
      totalNetGex: Number(totalNet.toFixed(1)),
      totalCallGex: Number(totCallGex.toFixed(1)),
      totalPutGex: Number(totPutGex.toFixed(1)),
      gammaFlipLevel: flip
    };
  }, [calls, puts, spotPrice]);

  const isPositiveRegime = totalNetGex >= 0;

  return (
    <div className="space-y-4">
      {/* GEX HUD Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Total Net GEX */}
        <Card className="bg-white border-slate-200 shadow-2xs">
          <CardContent className="p-3.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Net Gamma (GEX)</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className={`text-xl font-extrabold ${isPositiveRegime ? 'text-emerald-600' : 'text-rose-600'}`}>
                {totalNetGex > 0 ? '+' : ''}${totalNetGex}M
              </span>
              <span className="text-[10px] text-slate-400 font-medium">/ 1% move</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isPositiveRegime ? 'Dampens volatility (Mean reverting)' : 'Amplifies volatility (Trend following)'}
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Market Maker Regime */}
        <Card className="bg-white border-slate-200 shadow-2xs">
          <CardContent className="p-3.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">MM Gamma Regime</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-bold text-slate-900">
                {isPositiveRegime ? 'Long Gamma' : 'Short Gamma'}
              </span>
              <Badge className={`text-[10px] px-1.5 py-0 ${
                isPositiveRegime ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {isPositiveRegime ? 'Stabilizing' : 'Accelerating'}
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isPositiveRegime ? 'Dealers buy dips, sell rips' : 'Dealers sell dips, buy rips'}
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Gamma Flip Level */}
        <Card className="bg-white border-slate-200 shadow-2xs">
          <CardContent className="p-3.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Gamma Flip Level</span>
            <div className="text-xl font-extrabold text-amber-600 mt-0.5">
              {gammaFlipLevel ? `$${gammaFlipLevel.toLocaleString()}` : '—'}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Transition to Short Gamma regime</p>
          </CardContent>
        </Card>

        {/* Card 4: Call GEX vs Put GEX */}
        <Card className="bg-white border-slate-200 shadow-2xs">
          <CardContent className="p-3.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Call vs Put GEX</span>
            <div className="flex items-center gap-1.5 mt-0.5 text-sm sm:text-base font-bold">
              <span className="text-emerald-600">+${totalCallGex}M</span>
              <span className="text-slate-300">/</span>
              <span className="text-rose-600">${totalPutGex}M</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Gross market maker inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Main GEX Chart Card */}
      <Card className="bg-white border-slate-200 shadow-xs">
        <CardHeader className="p-4 pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              {subView === 'netGex' && 'SPX Net Gamma Exposure (GEX) by Strike ($M)'}
              {subView === 'grossGex' && 'Call Gamma vs Put Gamma Inventory ($M)'}
              {subView === 'gammaShift' && 'Simulated Market Maker Gamma Curve across Spot Moves'}
              {subView === 'vannaCharm' && 'Vanna & Charm Hedging Flow Sensitivity'}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              {subView === 'netGex' && `${expiration} (${dte} DTE) — Hedging flow pressure per 1% underlying price move`}
              {subView === 'grossGex' && `Gross dealer positioning from customer Call vs Put open interest`}
              {subView === 'gammaShift' && `How total dealer net gamma changes as SPX price rallies or falls by -5% to +5%`}
              {subView === 'vannaCharm' && `Flow pressures induced by changes in Implied Volatility (Vanna) and Time Decay (Charm)`}
            </CardDescription>
          </div>

          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setSubView('netGex')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'netGex' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Net GEX
            </button>
            <button
              onClick={() => setSubView('grossGex')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'grossGex' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gross Call/Put
            </button>
            <button
              onClick={() => setSubView('gammaShift')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'gammaShift' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Spot Move Sim
            </button>
            <button
              onClick={() => setSubView('vannaCharm')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                subView === 'vannaCharm' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vanna / Charm
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="h-[400px] w-full">
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
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  {gammaFlipLevel && (
                    <ReferenceLine 
                      x={gammaFlipLevel} 
                      stroke="#f97316" 
                      strokeDasharray="3 3" 
                      label={{ value: `Flip: $${gammaFlipLevel}`, position: 'top', fill: '#ea580c', fontSize: 10 }}
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
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
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
                  <ReferenceLine 
                    x={spotPrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="4 4" 
                    label={{ value: `Spot: $${spotPrice.toFixed(0)}`, position: 'top', fill: '#d97706', fontSize: 11 }}
                  />
                  <Bar dataKey="vanna" name="Vanna Sensitivity" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="charm" name="Charm Sensitivity" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
