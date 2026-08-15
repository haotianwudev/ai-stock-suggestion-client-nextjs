"use client";

import React, { useState, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  SlidersHorizontal, 
  Layers, 
  ArrowUpDown, 
  Eye, 
  Check,
  Percent,
  Activity
} from 'lucide-react';

export interface OptionContractData {
  strike: number;
  lastPrice: number;
  impliedVolatilityMid?: number | null;
  delta?: number | null;
  gamma?: number | null;
  theta?: number | null;
  vega?: number | null;
  rho?: number | null;
  theo?: number | null;
  contractSymbol: string;
  lastTradeDate?: string;
  bid?: number | null;
  ask?: number | null;
  midPrice?: number | null;
  volume?: number | null;
  openInterest?: number | null;
}

interface OptionsMatrixTableProps {
  calls: OptionContractData[];
  puts: OptionContractData[];
  spotPrice: number;
  expiration: string;
  dte: number;
}

type ColumnMode = 'standard' | 'greeks' | 'full';
type MoneynessFilter = 'all' | 'itm' | 'otm';
type StrikeRange = 10 | 20 | 50 | 'all';

export function OptionsMatrixTable({
  calls,
  puts,
  spotPrice,
  expiration,
  dte
}: OptionsMatrixTableProps) {
  const [columnMode, setColumnMode] = useState<ColumnMode>('standard');
  const [moneynessFilter, setMoneynessFilter] = useState<MoneynessFilter>('all');
  const [strikeRange, setStrikeRange] = useState<StrikeRange>(20);
  const [hoveredStrike, setHoveredStrike] = useState<number | null>(null);

  // Group by strike price into a unified row structure
  const strikeRows = useMemo(() => {
    const callMap = new Map<number, OptionContractData>();
    const putMap = new Map<number, OptionContractData>();
    const allStrikesSet = new Set<number>();

    calls.forEach(c => {
      callMap.set(c.strike, c);
      allStrikesSet.add(c.strike);
    });

    puts.forEach(p => {
      putMap.set(p.strike, p);
      allStrikesSet.add(p.strike);
    });

    const sortedStrikes = Array.from(allStrikesSet).sort((a, b) => a - b);

    return sortedStrikes.map(strike => ({
      strike,
      call: callMap.get(strike) || null,
      put: putMap.get(strike) || null,
      isCallITM: strike < spotPrice,
      isPutITM: strike > spotPrice,
      diffFromSpot: strike - spotPrice,
      diffPctFromSpot: ((strike - spotPrice) / spotPrice) * 100
    }));
  }, [calls, puts, spotPrice]);

  // Find the exact closest strike to spot (ATM strike)
  const atmStrike = useMemo(() => {
    if (strikeRows.length === 0) return 0;
    return strikeRows.reduce((prev, curr) => 
      Math.abs(curr.strike - spotPrice) < Math.abs(prev.strike - spotPrice) ? curr : prev
    ).strike;
  }, [strikeRows, spotPrice]);

  // Filter strikes by range and moneyness
  const filteredRows = useMemo(() => {
    let list = strikeRows;

    // Range filtering around ATM
    if (strikeRange !== 'all') {
      const atmIndex = list.findIndex(r => r.strike === atmStrike);
      if (atmIndex !== -1) {
        const start = Math.max(0, atmIndex - strikeRange);
        const end = Math.min(list.length, atmIndex + strikeRange + 1);
        list = list.slice(start, end);
      }
    }

    // Moneyness filtering. Each row shows one call leg and one put leg at the same strike, and
    // isCallITM/isPutITM (strike < spot / strike > spot) are mutually exclusive — so a row-level
    // "both ITM" or "both OTM" condition can never hold except right at the ATM strike, which is
    // why `isCallITM || isPutITM` and `!isCallITM || !isPutITM` were both effectively always-true
    // no-ops. Use the call leg as the row's reference side (the conventional default in combined
    // call+put matrix views) so the two filters actually partition the strikes.
    if (moneynessFilter === 'itm') {
      list = list.filter(r => r.strike <= spotPrice);
    } else if (moneynessFilter === 'otm') {
      list = list.filter(r => r.strike > spotPrice);
    }

    return list;
  }, [strikeRows, strikeRange, atmStrike, moneynessFilter]);

  const fmtNum = (val: number | null | undefined, dec = 2) => {
    if (val === null || val === undefined || isNaN(val)) return '—';
    return val.toFixed(dec);
  };

  const fmtInt = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val) || val === 0) return '—';
    return val.toLocaleString();
  };

  const fmtIV = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val) || val <= 0) return '—';
    return `${(val * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-3 bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
      {/* Control Bar: Columns, Moneyness, Strike Range */}
      <div className="p-3 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Column Mode Selector */}
          <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 shadow-2xs">
            <button
              onClick={() => setColumnMode('standard')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                columnMode === 'standard' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setColumnMode('greeks')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                columnMode === 'greeks' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Greeks
            </button>
            <button
              onClick={() => setColumnMode('full')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                columnMode === 'full' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Matrix
            </button>
          </div>

          <div className="h-4 w-px bg-slate-300 hidden sm:block" />

          {/* Strike Range Selector */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium mr-1 hidden sm:inline">Strikes:</span>
            {[10, 20, 50, 'all'].map(r => (
              <button
                key={String(r)}
                onClick={() => setStrikeRange(r as StrikeRange)}
                className={`px-2 py-0.5 rounded text-xs font-semibold border transition-all ${
                  strikeRange === r
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {r === 'all' ? 'All' : `±${r}`}
              </button>
            ))}
          </div>
        </div>

        {/* Legend & Stats */}
        <div className="flex items-center gap-3 text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-100 border border-emerald-300 inline-block" />
            <span className="text-[11px]">In The Money (ITM)</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-600 font-semibold">{filteredRows.length} Strikes Shown</span>
        </div>
      </div>

      {/* Double-Sided Option Chain Matrix */}
      <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
        <table className="w-full text-xs font-mono border-collapse min-w-[980px]">
          {/* Main Top Header */}
          <thead className="sticky top-0 z-20 bg-slate-900 text-white shadow-sm text-center">
            <tr>
              <th colSpan={columnMode === 'standard' ? 5 : columnMode === 'greeks' ? 6 : 9} className="py-2 px-3 text-center border-r border-slate-700 bg-blue-950/80 uppercase font-bold text-[11px] tracking-wider text-blue-200">
                Calls
              </th>
              <th className="py-2 px-4 bg-slate-950 text-amber-300 font-bold uppercase text-[11px] tracking-wider border-x border-slate-700 w-28">
                Strike
              </th>
              <th colSpan={columnMode === 'standard' ? 5 : columnMode === 'greeks' ? 6 : 9} className="py-2 px-3 text-center border-l border-slate-700 bg-purple-950/80 uppercase font-bold text-[11px] tracking-wider text-purple-200">
                Puts
              </th>
            </tr>
            {/* Sub Header for Columns */}
            <tr className="bg-slate-800 text-slate-300 text-[11px] font-semibold tracking-normal border-b border-slate-700">
              {/* Call Columns */}
              {columnMode !== 'greeks' && <th className="py-1.5 px-2 text-right">Vol</th>}
              {columnMode !== 'greeks' && <th className="py-1.5 px-2 text-right">OI</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-right text-purple-300">IV</th>}
              {columnMode !== 'standard' && <th className="py-1.5 px-2 text-right text-blue-300">Delta</th>}
              {columnMode !== 'standard' && <th className="py-1.5 px-2 text-right text-blue-300">Gamma</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-right text-blue-300">Theta</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-right text-blue-300">Vega</th>}
              <th className="py-1.5 px-2 text-right">Bid</th>
              <th className="py-1.5 px-2 text-right">Ask</th>
              <th className="py-1.5 px-2 text-right font-bold text-white border-r border-slate-700">Mid</th>

              {/* Center Strike Column */}
              <th className="py-1.5 px-3 text-center bg-slate-850 font-bold text-amber-300 border-x border-slate-700">
                Strike
              </th>

              {/* Put Columns */}
              <th className="py-1.5 px-2 text-left font-bold text-white border-l border-slate-700">Mid</th>
              <th className="py-1.5 px-2 text-left">Bid</th>
              <th className="py-1.5 px-2 text-left">Ask</th>
              {columnMode === 'full' && <th className="py-1.5 px-2 text-left text-purple-300">IV</th>}
              {columnMode !== 'standard' && <th className="py-1.5 px-2 text-left text-rose-300">Delta</th>}
              {columnMode !== 'standard' && <th className="py-1.5 px-2 text-left text-rose-300">Gamma</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-left text-rose-300">Theta</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-left text-rose-300">Vega</th>}
              {columnMode !== 'greeks' && <th className="py-1.5 px-2 text-left">Vol</th>}
              {columnMode !== 'greeks' && <th className="py-1.5 px-2 text-left">OI</th>}
            </tr>
          </thead>

          {/* Matrix Rows */}
          <tbody className="divide-y divide-slate-200">
            {filteredRows.map(row => {
              const isATM = row.strike === atmStrike;
              const isHovered = hoveredStrike === row.strike;
              const call = row.call;
              const put = row.put;

              return (
                <tr
                  key={row.strike}
                  onMouseEnter={() => setHoveredStrike(row.strike)}
                  onMouseLeave={() => setHoveredStrike(null)}
                  className={`transition-colors text-[11px] sm:text-xs ${
                    isHovered ? 'bg-slate-100 font-semibold' : ''
                  }`}
                >
                  {/* ================= CALL SIDE ================= */}
                  <td className={`py-1.5 px-2 text-right ${row.isCallITM ? 'bg-emerald-50/70 font-medium' : ''} ${columnMode === 'greeks' ? 'hidden' : ''}`}>
                    {fmtInt(call?.volume)}
                  </td>
                  <td className={`py-1.5 px-2 text-right text-slate-500 ${row.isCallITM ? 'bg-emerald-50/70' : ''} ${columnMode === 'greeks' ? 'hidden' : ''}`}>
                    {fmtInt(call?.openInterest)}
                  </td>
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-right text-purple-700 ${row.isCallITM ? 'bg-emerald-50/70' : ''}`}>
                      {fmtIV(call?.impliedVolatilityMid)}
                    </td>
                  )}
                  {columnMode !== 'standard' && (
                    <td className={`py-1.5 px-2 text-right text-blue-700 font-medium ${row.isCallITM ? 'bg-emerald-50/70' : ''}`}>
                      {fmtNum(call?.delta, 3)}
                    </td>
                  )}
                  {columnMode !== 'standard' && (
                    <td className={`py-1.5 px-2 text-right text-slate-600 ${row.isCallITM ? 'bg-emerald-50/70' : ''}`}>
                      {fmtNum(call?.gamma, 4)}
                    </td>
                  )}
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-right text-slate-500 ${row.isCallITM ? 'bg-emerald-50/70' : ''}`}>
                      {fmtNum(call?.theta, 2)}
                    </td>
                  )}
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-right text-slate-500 ${row.isCallITM ? 'bg-emerald-50/70' : ''}`}>
                      {fmtNum(call?.vega, 2)}
                    </td>
                  )}
                  <td className={`py-1.5 px-2 text-right text-slate-600 ${row.isCallITM ? 'bg-emerald-50/70' : ''}`}>
                    {fmtNum(call?.bid)}
                  </td>
                  <td className={`py-1.5 px-2 text-right text-slate-600 ${row.isCallITM ? 'bg-emerald-50/70' : ''}`}>
                    {fmtNum(call?.ask)}
                  </td>
                  <td className={`py-1.5 px-2 text-right font-bold text-slate-900 border-r border-slate-300 ${row.isCallITM ? 'bg-emerald-100/80 text-emerald-900' : 'bg-slate-50/50'}`}>
                    {fmtNum(call?.midPrice)}
                  </td>

                  {/* ================= CENTER STRIKE PIN ================= */}
                  <td className={`py-1.5 px-3 text-center font-bold border-x border-slate-300 tracking-tight ${
                    isATM 
                      ? 'bg-amber-400 text-slate-950 shadow-inner' 
                      : isHovered
                      ? 'bg-slate-900 text-amber-300'
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    <div className="flex items-center justify-center gap-1">
                      <span>{row.strike.toLocaleString()}</span>
                      {isATM && (
                        <span className="text-[9px] px-1 py-0.2 bg-slate-950 text-amber-300 rounded font-bold uppercase">
                          ATM
                        </span>
                      )}
                    </div>
                  </td>

                  {/* ================= PUT SIDE ================= */}
                  <td className={`py-1.5 px-2 text-left font-bold text-slate-900 border-l border-slate-300 ${row.isPutITM ? 'bg-purple-100/80 text-purple-900' : 'bg-slate-50/50'}`}>
                    {fmtNum(put?.midPrice)}
                  </td>
                  <td className={`py-1.5 px-2 text-left text-slate-600 ${row.isPutITM ? 'bg-purple-50/70' : ''}`}>
                    {fmtNum(put?.bid)}
                  </td>
                  <td className={`py-1.5 px-2 text-left text-slate-600 ${row.isPutITM ? 'bg-purple-50/70' : ''}`}>
                    {fmtNum(put?.ask)}
                  </td>
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-left text-purple-700 ${row.isPutITM ? 'bg-purple-50/70' : ''}`}>
                      {fmtIV(put?.impliedVolatilityMid)}
                    </td>
                  )}
                  {columnMode !== 'standard' && (
                    <td className={`py-1.5 px-2 text-left text-rose-700 font-medium ${row.isPutITM ? 'bg-purple-50/70' : ''}`}>
                      {fmtNum(put?.delta, 3)}
                    </td>
                  )}
                  {columnMode !== 'standard' && (
                    <td className={`py-1.5 px-2 text-left text-slate-600 ${row.isPutITM ? 'bg-purple-50/70' : ''}`}>
                      {fmtNum(put?.gamma, 4)}
                    </td>
                  )}
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-left text-slate-500 ${row.isPutITM ? 'bg-purple-50/70' : ''}`}>
                      {fmtNum(put?.theta, 2)}
                    </td>
                  )}
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-left text-slate-500 ${row.isPutITM ? 'bg-purple-50/70' : ''}`}>
                      {fmtNum(put?.vega, 2)}
                    </td>
                  )}
                  <td className={`py-1.5 px-2 text-left ${row.isPutITM ? 'bg-purple-50/70 font-medium' : ''} ${columnMode === 'greeks' ? 'hidden' : ''}`}>
                    {fmtInt(put?.volume)}
                  </td>
                  <td className={`py-1.5 px-2 text-left text-slate-500 ${row.isPutITM ? 'bg-purple-50/70' : ''} ${columnMode === 'greeks' ? 'hidden' : ''}`}>
                    {fmtInt(put?.openInterest)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
