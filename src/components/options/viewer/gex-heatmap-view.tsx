"use client";

import React, { useMemo, useState } from 'react';
import { OptionContractData } from './options-matrix-table';

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

type DteWindow = 21 | 45 | 90 | 'all';

// Moneyness buckets, not raw strikes: different expirations list different strikes, so a grid
// keyed by literal strike wouldn't line up column to column. 1% steps from -10% to +10% is a
// standard resolution for this kind of view — fine enough to see structure, coarse enough that
// SPX's $5-25 strike spacing always has real contracts landing in every bucket near the money.
const BUCKET_PCTS = Array.from({ length: 21 }, (_, i) => 10 - i); // [10, 9, ..., -10], high-to-low for display

// Diverging ramp: same emerald/rose polarity convention as the rest of this GEX tab (Net GEX
// cards, bars) — kept consistent within this view rather than switching hue families for a
// single sub-view. Steps chosen off Tailwind's own emerald/rose scale (already used pervasively
// elsewhere in this file) rather than hand-picked hex values.
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

function cellTextColor(value: number, maxAbs: number): string {
  if (maxAbs <= 0) return '#64748b';
  const intensity = Math.abs(value) / maxAbs;
  return intensity > 0.55 ? '#ffffff' : '#334155';
}

const fmtM = (v: number) => `${v >= 0 ? '+' : '-'}$${Math.abs(v).toFixed(1)}M`;

export function GexHeatmapView({ allExpirations, spotPrice }: GexHeatmapViewProps) {
  const [dteWindow, setDteWindow] = useState<DteWindow>(45);

  const { columns, grid, maxAbs } = useMemo(() => {
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

    return { columns: filteredExps, grid, maxAbs };
  }, [allExpirations, spotPrice, dteWindow]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Net gamma exposure by strike (rows, % from spot) and expiration (columns). Darker = larger dealer gamma concentration.
        </p>
        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-[11px] font-semibold flex-shrink-0">
          {([21, 45, 90, 'all'] as DteWindow[]).map(w => (
            <button
              key={String(w)}
              onClick={() => setDteWindow(w)}
              className={`px-2.5 py-1 rounded-lg transition-all font-mono ${
                dteWindow === w 
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {w === 'all' ? 'All' : `≤${w}d`}
            </button>
          ))}
        </div>
      </div>

      {columns.length === 0 ? (
        <div className="p-8 text-center text-sm font-mono text-slate-500">No expirations in this window.</div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-2xl">
          <table className="border-collapse text-[11px] font-mono" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 px-2 py-1.5 text-left text-slate-500 dark:text-slate-400 font-semibold w-16">
                  Strike
                </th>
                {columns.map(col => (
                  <th
                    key={col.expiration}
                    className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-1 py-1.5 text-center text-slate-500 dark:text-slate-400 font-semibold whitespace-nowrap"
                    style={{ minWidth: 46 }}
                    title={`${col.expiration} (${col.daysToExpiration} DTE)`}
                  >
                    {col.expiration.slice(5)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BUCKET_PCTS.map((pct, rowIdx) => {
                const approxStrike = Math.round((spotPrice * (1 + pct / 100)) / 5) * 5;
                const isAtm = pct === 0;
                return (
                  <tr key={pct}>
                    <td
                      className={`sticky left-0 z-10 border-r border-gray-200 dark:border-gray-700 px-2 py-1 text-right font-medium whitespace-nowrap ${
                        isAtm ? 'bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52]' : 'bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {pct > 0 ? `+${pct}%` : `${pct}%`}
                      <span className="text-slate-400 dark:text-slate-500 font-normal"> · ~{approxStrike}</span>
                    </td>
                    {grid[rowIdx].map((value, colIdx) => (
                      <td
                        key={colIdx}
                        tabIndex={0}
                        title={`Strike ~${approxStrike} (${pct > 0 ? '+' : ''}${pct}% from spot) · ${columns[colIdx].expiration} (${columns[colIdx].daysToExpiration} DTE)\nNet GEX: ${fmtM(value)}`}
                        className="border-r border-b border-gray-100 dark:border-gray-800 last:border-r-0 text-center focus:outline focus:outline-2 focus:outline-[#A8672E] focus:z-10 focus:relative"
                        style={{ backgroundColor: cellColor(value, maxAbs), height: 20 }}
                      />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend: diverging gradient, matches the emerald/rose polarity used across this tab */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <span className="font-medium text-rose-700 dark:text-rose-400">Short Gamma</span>
        <div
          className="h-2.5 flex-1 max-w-[220px] rounded-full"
          style={{ background: `linear-gradient(to right, ${NEGATIVE_STEPS[NEGATIVE_STEPS.length - 1]}, ${NEUTRAL}, ${POSITIVE_STEPS[POSITIVE_STEPS.length - 1]})` }}
        />
        <span className="font-medium text-emerald-700 dark:text-emerald-400">Long Gamma</span>
        <span className="text-slate-400 dark:text-slate-500 ml-1">(max {fmtM(maxAbs)} in view · hover a cell for its exact value)</span>
      </div>
    </div>
  );
}
