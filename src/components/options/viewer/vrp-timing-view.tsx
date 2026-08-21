"use client";

import React, { useMemo } from 'react';
import { useQuery } from "@apollo/client";
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
} from 'recharts';
import { Target, AlertTriangle } from 'lucide-react';
import { GET_VOL_REGIME } from "@/lib/graphql/queries";
import type { VolRegimeResult } from "@/lib/graphql/types";

/**
 * Does a richer VRP reading actually predict the premium collected 21 sessions
 * later? Static full-sample quintiles of vrp_z against the forward-realized
 * outcome. Spearman IC on this cut comes out ~0.008 — essentially flat, and
 * hit rate falls slightly as the premium gets richer. The honest read: the
 * premium is real and persistent (~+3.5 vol points, ~82% hit rate
 * unconditionally) but VRP *level* does not time it. This view exists to say
 * that plainly rather than bury it.
 */

const QUINTILE_LABELS: Record<number, string> = {
  1: "Q1 — Thin",
  2: "Q2",
  3: "Q3",
  4: "Q4",
  5: "Q5 — Rich",
};

function fmt(n: number | undefined | null, digits = 2, suffix = ""): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return `${n.toFixed(digits)}${suffix}`;
}

function spearmanFromQuintiles(quintiles: { quintile: number; avgForwardEarned?: number }[]): number | null {
  // Rough monotonicity check for the headline callout, not a substitute for the
  // exact IC computed server-side over daily rows — just tells us whether the
  // quintile means move in the "timing works" direction at all.
  if (quintiles.length < 2) return null;
  const sorted = [...quintiles].sort((a, b) => a.quintile - b.quintile);
  const first = sorted[0].avgForwardEarned ?? 0;
  const last = sorted[sorted.length - 1].avgForwardEarned ?? 0;
  return last - first;
}

export function VrpTimingView() {
  const { data, loading, error } = useQuery<{ volRegime: VolRegimeResult }>(
    GET_VOL_REGIME,
    { variables: { days: 30 }, fetchPolicy: "cache-and-network" }
  );

  const quintiles = data?.volRegime?.vrpQuintiles ?? [];

  const chartData = useMemo(
    () =>
      quintiles.map((q) => ({
        label: QUINTILE_LABELS[q.quintile] ?? `Q${q.quintile}`,
        avgForwardEarned: q.avgForwardEarned ?? 0,
        hitRatePct: q.hitRatePct ?? 0,
      })),
    [quintiles]
  );

  const spread = useMemo(() => spearmanFromQuintiles(quintiles), [quintiles]);

  if (loading && !data) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-xs animate-pulse">
        <div className="h-5 w-72 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
        <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl" />
      </div>
    );
  }

  if (error || quintiles.length === 0) {
    return null;
  }

  const overallHitRate =
    quintiles.reduce((sum, q) => sum + (q.hitRatePct ?? 0) * q.days, 0) /
    Math.max(1, quintiles.reduce((sum, q) => sum + q.days, 0));

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
          <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">
            Does the VRP level predict what you actually earn?
          </h4>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-3xl">
          Full-sample quintiles of today&apos;s VRP z-score against the premium a seller of
          today&apos;s implied vol actually collected once the next 21 sessions realized
          (VIX − forward 21d realized vol). If richer VRP meant a bigger edge, the bars
          below would climb steadily left to right.
        </p>
      </div>

      <div className="h-56 w-full px-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} className="fill-slate-500" />
            <YAxis tick={{ fontSize: 10 }} width={36} className="fill-slate-500" />
            <ReferenceLine y={0} stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                borderRadius: "0.75rem",
                border: "1px solid rgba(148,163,184,0.35)",
                fontSize: "12px",
              }}
              formatter={(value: number, name: string) => [
                name === "avgForwardEarned" ? `${value.toFixed(2)} vol pts` : `${value.toFixed(0)}%`,
                name === "avgForwardEarned" ? "Avg forward earned" : "Hit rate",
              ]}
            />
            <Bar dataKey="avgForwardEarned" radius={[6, 6, 0, 0]}>
              {chartData.map((d, i) => (
                <Cell key={i} fill={d.avgForwardEarned >= 0 ? "#A8672E" : "#E11D48"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mx-4 mb-4 mt-1 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 px-4 py-3">
        <div className="flex gap-2.5">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-700 dark:text-amber-400" />
          <div className="text-xs leading-relaxed text-amber-900 dark:text-amber-300">
            <span className="font-semibold">Nearly flat across quintiles</span>{" "}
            {spread !== null && (
              <>
                (Q5 − Q1 spread ≈ {spread >= 0 ? "+" : ""}
                {fmt(spread, 2)} vol pts, hit rate barely moves){" "}
              </>
            )}
            — VRP <em>level</em> is not a reliable entry-timing signal on this cut. The
            premium looks real and persistent unconditionally (~{fmt(overallHitRate, 0)}%
            hit rate across all quintiles), but waiting for a &quot;rich&quot; reading to size up
            adds little to what you&apos;d earn selling every day. Use the regime label for{" "}
            <em>risk</em> (see transition risk below), not for timing entries.
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border-t border-gray-100 dark:border-gray-800/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <th className="px-4 py-2 text-left font-semibold">Quintile</th>
              <th className="px-4 py-2 text-right font-semibold">VRP z-range</th>
              <th className="px-4 py-2 text-right font-semibold">Sessions</th>
              <th className="px-4 py-2 text-right font-semibold">Avg forward earned</th>
              <th className="px-4 py-2 text-right font-semibold">Hit rate</th>
            </tr>
          </thead>
          <tbody>
            {quintiles.map((q) => (
              <tr
                key={q.quintile}
                className="border-b border-gray-100 dark:border-gray-800/60 last:border-0"
              >
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300">
                  {QUINTILE_LABELS[q.quintile] ?? `Q${q.quintile}`}
                </td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                  {fmt(q.vrpZMin, 2)} to {fmt(q.vrpZMax, 2)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                  {q.days.toLocaleString()}
                </td>
                <td
                  className="px-4 py-2.5 text-right font-mono font-semibold tabular-nums"
                  style={{ color: (q.avgForwardEarned ?? 0) >= 0 ? "#059669" : "#E11D48" }}
                >
                  {(q.avgForwardEarned ?? 0) >= 0 ? "+" : ""}
                  {fmt(q.avgForwardEarned, 2)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                  {fmt(q.hitRatePct, 1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 text-[11px] text-slate-500 dark:text-slate-400">
        &quot;Forward earned&quot; is a proxy (VIX − subsequent realized vol), not actual option
        P&amp;L — it ignores strike selection, delta-hedging, and path. Research context, not a
        trading signal.
      </div>
    </div>
  );
}
