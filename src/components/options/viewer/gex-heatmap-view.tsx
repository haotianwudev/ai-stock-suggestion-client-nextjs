"use client";

import React, { useMemo, useState } from 'react';
import { OptionContractData } from './options-matrix-table';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ShieldAlert, Zap, Info, Crosshair } from 'lucide-react';

interface ExpirationSlice {
  expiration: string;
  daysToExpiration: number;
  calls: OptionContractData[];
  puts: OptionContractData[];
}

interface GexHeatmapViewProps {
  allExpirations: ExpirationSlice[];
  spotPrice: number;
}

type DteWindow = 7 | 21 | 45 | 90 | 'all';

// Moneyness buckets from -10% to +10%
const BUCKET_PCTS = Array.from({ length: 21 }, (_, i) => 10 - i); // [10, 9, ..., -10], high-to-low for display

const POSITIVE_STEPS = ['#d1fae5', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857'];
const NEGATIVE_STEPS = ['#fee2e2', '#fca5a5', '#f87171', '#f43f5e', '#e11d48', '#be123c'];
const NEUTRAL = '#f8fafc';

function cellColor(value: number, maxAbs: number): string {
  if (maxAbs <= 0 || Math.abs(value) < maxAbs * 0.015) return NEUTRAL;
  const steps = value > 0 ? POSITIVE_STEPS : NEGATIVE_STEPS;
  const intensity = Math.min(1, Math.abs(value) / maxAbs);
  const idx = Math.min(steps.length - 1, Math.floor(intensity * steps.length));
  return steps[idx];
}

const fmtM = (v: number) => `${v >= 0 ? '+' : '-'}$${Math.abs(v).toFixed(1)}M`;

export function GexHeatmapView({ allExpirations, spotPrice }: GexHeatmapViewProps) {
  const [dteWindow, setDteWindow] = useState<DteWindow>(45);
  const [hoveredCell, setHoveredCell] = useState<{
    pct: number;
    approxStrike: number;
    expiration: string;
    dte: number;
    netGex: number;
  } | null>(null);

  const { columns, grid, maxAbs, atmStrike } = useMemo(() => {
    const contractMultiplier = 100;
    const spotSquared1Pct = (spotPrice * spotPrice * 0.01) / 1_000_000;

    const filteredExps = (dteWindow === 'all' ? allExpirations : allExpirations.filter(e => e.daysToExpiration <= dteWindow))
      .slice()
      .sort((a, b) => a.daysToExpiration - b.daysToExpiration);

    const bucketIndexFor = (strike: number): number | null => {
      const pct = Math.round((strike / spotPrice - 1) * 100);
      if (pct < -10 || pct > 10) return null;
      return BUCKET_PCTS.indexOf(pct);
    };

    const grid: number[][] = BUCKET_PCTS.map(() => filteredExps.map(() => 0));

    filteredExps.forEach((exp, colIdx) => {
      exp.calls.forEach(c => {
        const idx = bucketIndexFor(c.strike);
        if (idx === null) return;
        grid[idx][colIdx] += (c.gamma || 0) * (c.openInterest || 0) * contractMultiplier * spotSquared1Pct;
      });
      exp.puts.forEach(p => {
        const idx = bucketIndexFor(p.strike);
        if (idx === null) return;
        grid[idx][colIdx] -= (p.gamma || 0) * (p.openInterest || 0) * contractMultiplier * spotSquared1Pct;
      });
    });

    let maxAbs = 0;
    grid.forEach(row => row.forEach(v => { if (Math.abs(v) > maxAbs) maxAbs = Math.abs(v); }));

    const atmStrike = Math.round(spotPrice / 5) * 5;

    return { columns: filteredExps, grid, maxAbs, atmStrike };
  }, [allExpirations, spotPrice, dteWindow]);

  return (
    <div className="space-y-3">
      {/* Controls & Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Net gamma exposure matrix: Strike moneyness (rows, % from spot) × Expiration cycle (columns). Darker = larger dealer gamma cluster.
        </p>
        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-[11px] font-semibold flex-shrink-0">
          <span className="text-slate-400 pl-2 pr-1 self-center text-[10px] font-mono">DTE:</span>
          {([7, 21, 45, 90, 'all'] as DteWindow[]).map(w => (
            <button
              key={String(w)}
              onClick={() => setDteWindow(w)}
              className={`px-2.5 py-1 rounded-lg transition-all font-mono ${
                dteWindow === w 
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {w === 'all' ? 'All Expiries' : `≤${w}d`}
            </button>
          ))}
        </div>
      </div>

      {columns.length === 0 ? (
        <div className="p-8 text-center text-sm font-mono text-slate-500 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-800">
          No expirations in this window. Try selecting a wider DTE filter.
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-xs">
          <table className="border-collapse text-[11px] font-mono w-full" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th className="sticky left-0 z-20 bg-gray-100 dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 px-2 py-2 text-left text-slate-700 dark:text-slate-300 font-bold w-24">
                  Moneyness
                </th>
                {columns.map(col => (
                  <th
                    key={col.expiration}
                    className="bg-gray-50 dark:bg-gray-800/80 border-b border-r border-gray-200 dark:border-gray-700 last:border-r-0 px-1 py-1.5 text-center text-slate-600 dark:text-slate-400 font-semibold whitespace-nowrap"
                    style={{ minWidth: 52 }}
                    title={`${col.expiration} (${col.daysToExpiration} DTE)`}
                  >
                    <div>{col.expiration.slice(5)}</div>
                    <div className="text-[9px] text-slate-400 font-normal">{col.daysToExpiration}d</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BUCKET_PCTS.map((pct, rowIdx) => {
                const approxStrike = Math.round((spotPrice * (1 + pct / 100)) / 5) * 5;
                const isAtm = pct === 0;
                return (
                  <tr key={pct} className={isAtm ? 'ring-1 ring-amber-500/50' : ''}>
                    <td
                      className={`sticky left-0 z-10 border-r border-b border-gray-200 dark:border-gray-700 px-2 py-1 text-right font-medium whitespace-nowrap transition-colors ${
                        isAtm 
                          ? 'bg-amber-500/15 text-amber-900 dark:text-amber-300 font-bold' 
                          : 'bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>{pct > 0 ? `+${pct}%` : `${pct}%`}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal ml-1">
                        ~{approxStrike}
                      </span>
                    </td>
                    {grid[rowIdx].map((value, colIdx) => {
                      const expCol = columns[colIdx];
                      const isHovered = hoveredCell && hoveredCell.pct === pct && hoveredCell.expiration === expCol.expiration;

                      return (
                        <td
                          key={colIdx}
                          tabIndex={0}
                          onMouseEnter={() => setHoveredCell({
                            pct,
                            approxStrike,
                            expiration: expCol.expiration,
                            dte: expCol.daysToExpiration,
                            netGex: value
                          })}
                          className={`border-r border-b border-gray-100 dark:border-gray-800 last:border-r-0 text-center cursor-pointer transition-all ${
                            isHovered ? 'ring-2 ring-[#A8672E] z-10 relative shadow-sm' : ''
                          }`}
                          style={{ backgroundColor: cellColor(value, maxAbs), height: 22 }}
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Dynamic Hover Inspector Card */}
      {hoveredCell ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-50/60 dark:bg-amber-950/20 p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <Crosshair className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Strike ~${hoveredCell.approxStrike.toLocaleString()} ({hoveredCell.pct > 0 ? '+' : ''}{hoveredCell.pct}% from Spot)
              </span>
              <span className="text-slate-500 dark:text-slate-400 ml-2">
                • Exp: {hoveredCell.expiration} ({hoveredCell.dte} DTE)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Net Gamma:</span>
            <span className={`font-bold text-sm ${hoveredCell.netGex >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {fmtM(hoveredCell.netGex)}
            </span>
            <Badge className={`text-[10px] py-0 ${
              hoveredCell.netGex >= 0 
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' 
                : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30'
            }`}>
              {hoveredCell.netGex >= 0 ? 'Stabilizing (Long Γ)' : 'Accelerating (Short Γ)'}
            </Badge>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 p-2.5 flex items-center justify-center text-xs font-mono text-slate-400">
          Hover or tap any cell in the matrix above to inspect exact gamma exposure &amp; strike breakdown.
        </div>
      )}

      {/* Legend & Polarity Explanation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-rose-600 dark:text-rose-400">Short Gamma (-{fmtM(maxAbs)})</span>
          <div
            className="h-2.5 w-32 sm:w-44 rounded-full border border-gray-200 dark:border-gray-700"
            style={{ background: `linear-gradient(to right, ${NEGATIVE_STEPS[NEGATIVE_STEPS.length - 1]}, ${NEUTRAL}, ${POSITIVE_STEPS[POSITIVE_STEPS.length - 1]})` }}
          />
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Long Gamma (+{fmtM(maxAbs)})</span>
        </div>
        <div className="text-[10px] text-slate-400">
          Spot Anchor: ${spotPrice.toFixed(0)} (~{atmStrike})
        </div>
      </div>
    </div>
  );
}
