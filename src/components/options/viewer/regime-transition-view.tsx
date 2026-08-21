"use client";

import React, { useMemo } from 'react';
import { useQuery } from "@apollo/client";
import { Route, Siren } from 'lucide-react';
import { GET_VOL_REGIME } from "@/lib/graphql/queries";
import type { VolRegimeResult, RegimeTransition } from "@/lib/graphql/types";

/**
 * P(regime 21 sessions from now | regime today). Where the regime label
 * actually earns its keep: it barely predicts the premium you collect (see
 * VrpTimingView), but it predicts transition into Crisis quite differently
 * depending on where you start — Stressed Premium is ~5x more likely to
 * become Crisis than Harvest is. Argues for using the regime to size
 * positions, not to time entries.
 */

const REGIME_ORDER = ["Harvest", "Stressed Premium", "Thin", "Crisis"];

const REGIME_DOT: Record<string, string> = {
  Harvest: "#059669",
  "Stressed Premium": "#D97706",
  Thin: "#64748B",
  Crisis: "#E11D48",
};

function cellColor(pct: number, isCrisisColumn: boolean): string {
  if (!isCrisisColumn) return "";
  if (pct >= 0.2) return "#E11D48";
  if (pct >= 0.1) return "#D97706";
  return "#059669";
}

export function RegimeTransitionView() {
  const { data, loading, error } = useQuery<{ volRegime: VolRegimeResult }>(
    GET_VOL_REGIME,
    { variables: { days: 30 }, fetchPolicy: "cache-and-network" }
  );

  const transitions = data?.volRegime?.transitions ?? [];

  const matrix = useMemo(() => {
    const m = new Map<string, Map<string, RegimeTransition>>();
    for (const t of transitions) {
      if (!m.has(t.fromRegime)) m.set(t.fromRegime, new Map());
      m.get(t.fromRegime)!.set(t.toRegime, t);
    }
    return m;
  }, [transitions]);

  const crisisRisk = useMemo(() => {
    const rows = REGIME_ORDER.map((from) => {
      const cell = matrix.get(from)?.get("Crisis");
      return { regime: from, probability: cell?.probability ?? 0 };
    }).filter((r) => matrix.has(r.regime));
    return rows.sort((a, b) => b.probability - a.probability);
  }, [matrix]);

  if (loading && !data) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-xs animate-pulse">
        <div className="h-5 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
        <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl" />
      </div>
    );
  }

  if (error || transitions.length === 0) {
    return null;
  }

  const presentRegimes = REGIME_ORDER.filter((r) => matrix.has(r));

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <Route className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
          <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">
            Regime transition risk — 21 sessions ahead
          </h4>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-3xl">
          Where the regime label pays off: not by timing entries (see above), but by warning
          how likely today&apos;s regime is to become Crisis about a month out.
        </p>
      </div>

      {/* Headline: P(Crisis) by starting regime */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <Siren className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
          P(Crisis in ~21 sessions), by starting regime
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {crisisRisk.map((r) => (
            <div
              key={r.regime}
              className="rounded-xl border border-gray-200 dark:border-gray-800 px-3 py-2.5"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: REGIME_DOT[r.regime] }}
                />
                {r.regime}
              </div>
              <div
                className="mt-0.5 font-mono text-xl font-bold tabular-nums"
                style={{ color: cellColor(r.probability, true) || "#334155" }}
              >
                {(r.probability * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full matrix */}
      <div className="overflow-x-auto border-t border-gray-100 dark:border-gray-800/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-4 py-2 text-left font-semibold">From \ To</th>
              {presentRegimes.map((to) => (
                <th key={to} className="px-4 py-2 text-right font-semibold">
                  {to}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {presentRegimes.map((from) => (
              <tr key={from} className="border-b border-gray-100 dark:border-gray-800/60 last:border-0">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: REGIME_DOT[from] }}
                    />
                    {from}
                  </div>
                </td>
                {presentRegimes.map((to) => {
                  const cell = matrix.get(from)?.get(to);
                  const pct = cell?.probability ?? 0;
                  const color = cellColor(pct, to === "Crisis");
                  return (
                    <td
                      key={to}
                      className="px-4 py-2.5 text-right font-mono tabular-nums"
                      style={color ? { color, fontWeight: 600 } : undefined}
                    >
                      {cell ? `${(pct * 100).toFixed(0)}%` : "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 text-[11px] text-slate-500 dark:text-slate-400">
        Each row sums to ~100%. Computed by looking 21 trading sessions ahead from every
        historical day in each starting regime — not a Markov-chain assumption, the empirical
        frequency.
      </div>
    </div>
  );
}
