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
import { computeLiquidity, LiquidityTier } from '@/lib/options/liquidity';

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

type ColumnMode = 'standard' | 'greeks' | 'full' | 'liquidity';

const TIER_STYLE: Record<LiquidityTier, string> = {
  excellent: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  good: 'bg-blue-100 text-blue-800 border-blue-300',
  fair: 'bg-amber-100 text-amber-800 border-amber-300',
  poor: 'bg-rose-100 text-rose-800 border-rose-300',
  unknown: 'bg-slate-100 text-slate-500 border-slate-300',
};
const TIER_LABEL: Record<LiquidityTier, string> = {
  excellent: 'Excellent', good: 'Good', fair: 'Fair', poor: 'Poor', unknown: '—',
};
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
    <div className="space-y-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
      {/* Control Bar: Columns, Moneyness, Strike Range */}
      <div className="p-3 bg-gray-50/70 dark:bg-gray-800/40 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Column Mode Selector */}
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-0.5 shadow-2xs">
            <button
              onClick={() => setColumnMode('standard')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                columnMode === 'standard' 
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setColumnMode('greeks')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                columnMode === 'greeks' 
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Greeks
            </button>
            <button
              onClick={() => setColumnMode('full')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                columnMode === 'full' 
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Full Matrix
            </button>
            <button
              onClick={() => setColumnMode('liquidity')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                columnMode === 'liquidity' 
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Liquidity
            </button>
          </div>

          <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

          {/* Strike Range Selector */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] mr-1 hidden sm:inline">Strikes:</span>
            {[10, 20, 50, 'all'].map(r => (
              <button
                key={String(r)}
                onClick={() => setStrikeRange(r as StrikeRange)}
                className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold border transition-all ${
                  strikeRange === r
                    ? 'border-[#A8672E] bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52] dark:bg-[#D08F52]/15 dark:text-[#D08F52] ring-1 ring-[#A8672E]/30'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400 hover:border-[#A8672E]/40'
                }`}
              >
                {r === 'all' ? 'All' : `±${r}`}
              </button>
            ))}
          </div>
        </div>

        {/* Legend & Stats */}
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-teal-500/20 border border-teal-500/40 inline-block" />
            <span className="text-[11px]">ITM Calls</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-amber-500/20 border border-amber-500/40 inline-block" />
            <span className="text-[11px]">ITM Puts</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span className="text-[11px] text-[#A8672E] dark:text-[#D08F52] font-semibold">{filteredRows.length} Strikes Shown</span>
        </div>
      </div>

      {/* Double-Sided Option Chain Matrix */}
      <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
        <table className="w-full text-xs font-mono border-collapse min-w-[980px]">
          {/* Main Top Header */}
          <thead className="sticky top-0 z-20 bg-slate-900 text-white shadow-xs text-center">
            <tr>
              <th colSpan={columnMode === 'standard' ? 5 : columnMode === 'greeks' ? 6 : columnMode === 'liquidity' ? 7 : 9} className="py-2 px-3 text-center border-r border-gray-700 bg-teal-950/80 uppercase font-serif font-bold text-[11px] tracking-wider text-teal-200">
                Calls
              </th>
              <th className="py-2 px-4 bg-slate-950 text-[#D08F52] font-serif font-bold uppercase text-[11px] tracking-wider border-x border-gray-700 w-28">
                Strike
              </th>
              <th colSpan={columnMode === 'standard' ? 5 : columnMode === 'greeks' ? 6 : columnMode === 'liquidity' ? 7 : 9} className="py-2 px-3 text-center border-l border-gray-700 bg-amber-950/80 uppercase font-serif font-bold text-[11px] tracking-wider text-amber-200">
                Puts
              </th>
            </tr>
            {/* Sub Header for Columns */}
            <tr className="bg-slate-800 text-slate-300 text-[11px] font-semibold tracking-normal border-b border-gray-700">
              {/* Call Columns */}
              {columnMode !== 'greeks' && <th className="py-1.5 px-2 text-right">Vol</th>}
              {columnMode !== 'greeks' && <th className="py-1.5 px-2 text-right">OI</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-right text-purple-300">IV</th>}
              {columnMode !== 'standard' && <th className="py-1.5 px-2 text-right text-teal-300">Delta</th>}
              {columnMode !== 'standard' && <th className="py-1.5 px-2 text-right text-teal-300">Gamma</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-right text-teal-300">Theta</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-right text-teal-300">Vega</th>}
              <th className="py-1.5 px-2 text-right">Bid</th>
              <th className="py-1.5 px-2 text-right">Ask</th>
              <th className={`py-1.5 px-2 text-right font-bold text-white ${columnMode !== 'liquidity' ? 'border-r border-gray-700' : ''}`}>Mid</th>
              {columnMode === 'liquidity' && <th className="py-1.5 px-2 text-right text-cyan-300">Spread %</th>}
              {columnMode === 'liquidity' && <th className="py-1.5 px-2 text-right border-r border-gray-700">Liquidity</th>}

              {/* Center Strike Column */}
              <th className="py-1.5 px-3 text-center bg-slate-850 font-bold text-[#D08F52] border-x border-gray-700">
                Strike
              </th>

              {/* Put Columns */}
              {columnMode === 'liquidity' && <th className="py-1.5 px-2 text-left border-l border-gray-700">Liquidity</th>}
              {columnMode === 'liquidity' && <th className="py-1.5 px-2 text-left text-cyan-300">Spread %</th>}
              <th className={`py-1.5 px-2 text-left font-bold text-white ${columnMode !== 'liquidity' ? 'border-l border-gray-700' : ''}`}>Mid</th>
              <th className="py-1.5 px-2 text-left">Bid</th>
              <th className="py-1.5 px-2 text-left">Ask</th>
              {columnMode === 'full' && <th className="py-1.5 px-2 text-left text-purple-300">IV</th>}
              {columnMode !== 'standard' && <th className="py-1.5 px-2 text-left text-amber-300">Delta</th>}
              {columnMode !== 'standard' && <th className="py-1.5 px-2 text-left text-amber-300">Gamma</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-left text-amber-300">Theta</th>}
              {columnMode === 'full' && <th className="py-1.5 px-2 text-left text-amber-300">Vega</th>}
              {columnMode !== 'greeks' && <th className="py-1.5 px-2 text-left">Vol</th>}
              {columnMode !== 'greeks' && <th className="py-1.5 px-2 text-left">OI</th>}
            </tr>
          </thead>

          {/* Matrix Rows */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredRows.map(row => {
              const isATM = row.strike === atmStrike;
              const isHovered = hoveredStrike === row.strike;
              const call = row.call;
              const put = row.put;
              const callLiq = columnMode === 'liquidity' ? computeLiquidity(call?.bid, call?.ask, call?.midPrice, call?.volume, call?.openInterest) : null;
              const putLiq = columnMode === 'liquidity' ? computeLiquidity(put?.bid, put?.ask, put?.midPrice, put?.volume, put?.openInterest) : null;

              return (
                <tr
                  key={row.strike}
                  onMouseEnter={() => setHoveredStrike(row.strike)}
                  onMouseLeave={() => setHoveredStrike(null)}
                  className={`transition-colors text-[11px] sm:text-xs ${
                    isHovered ? 'bg-gray-50 dark:bg-gray-800/60 font-semibold' : ''
                  }`}
                >
                  {/* ================= CALL SIDE ================= */}
                  <td className={`py-1.5 px-2 text-right ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20 text-teal-800 dark:text-teal-300 font-medium' : ''} ${columnMode === 'greeks' ? 'hidden' : ''}`}>
                    {fmtInt(call?.volume)}
                  </td>
                  <td className={`py-1.5 px-2 text-right text-slate-500 dark:text-slate-400 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''} ${columnMode === 'greeks' ? 'hidden' : ''}`}>
                    {fmtInt(call?.openInterest)}
                  </td>
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-right text-purple-600 dark:text-purple-400 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                      {fmtIV(call?.impliedVolatilityMid)}
                    </td>
                  )}
                  {columnMode !== 'standard' && (
                    <td className={`py-1.5 px-2 text-right text-teal-700 dark:text-teal-400 font-medium ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                      {fmtNum(call?.delta, 3)}
                    </td>
                  )}
                  {columnMode !== 'standard' && (
                    <td className={`py-1.5 px-2 text-right text-slate-600 dark:text-slate-400 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                      {fmtNum(call?.gamma, 4)}
                    </td>
                  )}
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-right text-slate-500 dark:text-slate-400 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                      {fmtNum(call?.theta, 2)}
                    </td>
                  )}
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-right text-slate-500 dark:text-slate-400 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                      {fmtNum(call?.vega, 2)}
                    </td>
                  )}
                  <td className={`py-1.5 px-2 text-right text-slate-600 dark:text-slate-400 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                    {fmtNum(call?.bid)}
                  </td>
                  <td className={`py-1.5 px-2 text-right text-slate-600 dark:text-slate-400 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                    {fmtNum(call?.ask)}
                  </td>
                  <td className={`py-1.5 px-2 text-right font-bold text-slate-900 dark:text-slate-100 ${columnMode !== 'liquidity' ? 'border-r border-gray-200 dark:border-gray-800' : ''} ${row.isCallITM ? 'bg-teal-500/15 dark:bg-teal-950/40 text-teal-900 dark:text-teal-100' : 'bg-gray-50/50 dark:bg-gray-800/30'}`}>
                    {fmtNum(call?.midPrice)}
                  </td>
                  {columnMode === 'liquidity' && (
                    <td className={`py-1.5 px-2 text-right text-cyan-700 dark:text-cyan-400 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                      {callLiq?.spreadPct != null ? `${(callLiq.spreadPct * 100).toFixed(1)}%` : '—'}
                    </td>
                  )}
                  {columnMode === 'liquidity' && (
                    <td className={`py-1.5 px-2 text-right border-r border-gray-200 dark:border-gray-800 ${row.isCallITM ? 'bg-teal-500/10 dark:bg-teal-950/20' : ''}`}>
                      {callLiq && callLiq.tier !== 'unknown' ? (
                        <span className={`inline-block px-1.5 py-0.5 rounded border text-[10px] font-semibold ${TIER_STYLE[callLiq.tier]}`}>
                          {TIER_LABEL[callLiq.tier]}
                        </span>
                      ) : '—'}
                    </td>
                  )}

                  {/* ================= CENTER STRIKE PIN ================= */}
                  <td className={`py-1.5 px-3 text-center font-bold border-x border-gray-200 dark:border-gray-800 tracking-tight ${
                    isATM 
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-inner' 
                      : isHovered
                      ? 'bg-slate-900 text-[#D08F52] dark:bg-gray-800'
                      : 'bg-gray-50/80 dark:bg-gray-800/40 text-slate-800 dark:text-slate-200'
                  }`}>
                    <div className="flex items-center justify-center gap-1 font-mono">
                      <span>{row.strike.toLocaleString()}</span>
                      {isATM && (
                        <span className="text-[9px] px-1 py-0.2 bg-black/30 text-white rounded font-bold uppercase">
                          ATM
                        </span>
                      )}
                    </div>
                  </td>

                  {/* ================= PUT SIDE ================= */}
                  {columnMode === 'liquidity' && (
                    <td className={`py-1.5 px-2 text-left border-l border-gray-200 dark:border-gray-800 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                      {putLiq && putLiq.tier !== 'unknown' ? (
                        <span className={`inline-block px-1.5 py-0.5 rounded border text-[10px] font-semibold ${TIER_STYLE[putLiq.tier]}`}>
                          {TIER_LABEL[putLiq.tier]}
                        </span>
                      ) : '—'}
                    </td>
                  )}
                  {columnMode === 'liquidity' && (
                    <td className={`py-1.5 px-2 text-left text-cyan-700 dark:text-cyan-400 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                      {putLiq?.spreadPct != null ? `${(putLiq.spreadPct * 100).toFixed(1)}%` : '—'}
                    </td>
                  )}
                  <td className={`py-1.5 px-2 text-left font-bold text-slate-900 dark:text-slate-100 ${columnMode !== 'liquidity' ? 'border-l border-gray-200 dark:border-gray-800' : ''} ${row.isPutITM ? 'bg-amber-500/15 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100' : 'bg-gray-50/50 dark:bg-gray-800/30'}`}>
                    {fmtNum(put?.midPrice)}
                  </td>
                  <td className={`py-1.5 px-2 text-left text-slate-600 dark:text-slate-400 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                    {fmtNum(put?.bid)}
                  </td>
                  <td className={`py-1.5 px-2 text-left text-slate-600 dark:text-slate-400 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                    {fmtNum(put?.ask)}
                  </td>
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-left text-purple-600 dark:text-purple-400 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                      {fmtIV(put?.impliedVolatilityMid)}
                    </td>
                  )}
                  {columnMode !== 'standard' && (
                    <td className={`py-1.5 px-2 text-left text-amber-700 dark:text-amber-400 font-medium ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                      {fmtNum(put?.delta, 3)}
                    </td>
                  )}
                  {columnMode !== 'standard' && (
                    <td className={`py-1.5 px-2 text-left text-slate-600 dark:text-slate-400 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                      {fmtNum(put?.gamma, 4)}
                    </td>
                  )}
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-left text-slate-500 dark:text-slate-400 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                      {fmtNum(put?.theta, 2)}
                    </td>
                  )}
                  {columnMode === 'full' && (
                    <td className={`py-1.5 px-2 text-left text-slate-500 dark:text-slate-400 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''}`}>
                      {fmtNum(put?.vega, 2)}
                    </td>
                  )}
                  <td className={`py-1.5 px-2 text-left ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 font-medium' : ''} ${columnMode === 'greeks' ? 'hidden' : ''}`}>
                    {fmtInt(put?.volume)}
                  </td>
                  <td className={`py-1.5 px-2 text-left text-slate-500 dark:text-slate-400 ${row.isPutITM ? 'bg-amber-500/10 dark:bg-amber-950/20' : ''} ${columnMode === 'greeks' ? 'hidden' : ''}`}>
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
