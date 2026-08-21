"use client";

import React, { useMemo } from 'react';
import { useQuery } from "@apollo/client";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import {
  Sprout,
  ShieldAlert,
  Wind,
  Siren,
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react';
import { GET_VOL_REGIME } from "@/lib/graphql/queries";
import type { VolRegimeResult, VolRegimeDataPoint } from "@/lib/graphql/types";

/**
 * Variance Risk Premium / volatility regime panel.
 *
 * Reads precomputed signals from the Sophie GraphQL API (populated daily by
 * sophie-pipeline's vol_regime agent) rather than deriving them from the live
 * chain: vix_rank is a 252-day percentile and vrpZ an EWM z-score, neither of
 * which can be computed from a single quote.
 */

const REGIME_STYLES: Record<string, {
  icon: React.ElementType;
  badge: string;
  dot: string;
  headline: string;
  meaning: string;
}> = {
  "Harvest": {
    icon: Sprout,
    badge: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
    dot: "#059669",
    headline: "Premium is rich in a calm tape",
    meaning: "Implied volatility is running well above what the market is actually delivering, without stress in the term structure — historically the most favourable backdrop for selling premium.",
  },
  "Stressed Premium": {
    icon: ShieldAlert,
    badge: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
    dot: "#D97706",
    headline: "Rich premium, but the tape is stressed",
    meaning: "Sellers are being paid more than usual, but volatility is elevated or the curve is backwardated. The premium is real — the tail risk is too. Size down rather than lean in.",
  },
  "Thin": {
    icon: Wind,
    badge: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    dot: "#64748B",
    headline: "Little compensation for short volatility",
    meaning: "Implied barely exceeds realized. You are taking on gap risk for a thin credit — historically the weakest payoff for premium selling.",
  },
  "Crisis": {
    icon: Siren,
    badge: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
    dot: "#E11D48",
    headline: "Implied is below realized — selling is uncompensated",
    meaning: "The market is delivering more movement than options are pricing. Short-volatility positions are being paid less than the risk they carry.",
  },
};

const FALLBACK_STYLE = REGIME_STYLES["Thin"];

function fmt(n: number | undefined | null, digits = 2, suffix = ""): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return `${n.toFixed(digits)}${suffix}`;
}

function fmtPct(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return `${(n * 100).toFixed(0)}%`;
}

interface StatTileProps {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  hint?: string;
}

function StatTile({ label, value, sub, accent, hint }: StatTileProps) {
  return (
    <div
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all"
      title={hint}
    >
      <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div
        className="mt-1 text-2xl font-mono font-bold tabular-nums"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{sub}</div>
      )}
    </div>
  );
}

export function VolRegimePanel() {
  const { data, loading, error } = useQuery<{ volRegime: VolRegimeResult }>(
    GET_VOL_REGIME,
    { variables: { days: 252 }, fetchPolicy: "cache-and-network" }
  );

  const result = data?.volRegime;
  const latest = result?.latestData;

  const chartData = useMemo(() => {
    if (!result?.history?.length) return [];
    return result.history.map((d: VolRegimeDataPoint) => ({
      date: d.bizDate?.slice(5) ?? "",
      fullDate: d.bizDate,
      vix: d.vix ?? null,
      realized: d.realizedVol20d ?? null,
      vrp: d.vrp ?? null,
      regime: d.regime,
    }));
  }, [result]);

  const currentStat = useMemo(
    () => result?.stats?.find((s) => s.regime === latest?.regime),
    [result, latest]
  );

  if (loading && !data) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-xs animate-pulse">
        <div className="h-5 w-56 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // The live chain still renders without this panel — degrade quietly.
  if (error || !latest) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Info className="h-4 w-4 shrink-0" />
          <span>
            Volatility regime data is unavailable right now. The option chain and
            volatility surface below are unaffected.
          </span>
        </div>
      </div>
    );
  }

  const style = REGIME_STYLES[latest.regime] ?? FALLBACK_STYLE;
  const RegimeIcon = style.icon;
  const vrpPositive = (latest.vrp ?? 0) >= 0;
  const backwardated = latest.termStructure === "Backwardation";

  return (
    <div className="space-y-3">
      {/* Regime headline */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${style.dot}1A`, color: style.dot }}
            >
              <RegimeIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">
                  Volatility Regime
                </span>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${style.badge}`}
                >
                  {latest.regime}
                </span>
              </div>
              <h3 className="mt-1 font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                {style.headline}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
                {style.meaning}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">
              As of
            </div>
            <div className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">
              {latest.bizDate}
            </div>
          </div>
        </div>

        {currentStat && (
          <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 text-xs text-slate-600 dark:text-slate-400">
            Historically this regime covers{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {fmt(currentStat.pctOfDays, 1, "%")}
            </span>{" "}
            of sessions since 2000, with an average premium of{" "}
            <span
              className="font-mono font-semibold"
              style={{ color: (currentStat.avgVrp ?? 0) >= 0 ? "#059669" : "#E11D48" }}
            >
              {(currentStat.avgVrp ?? 0) >= 0 ? "+" : ""}
              {fmt(currentStat.avgVrp, 2)} vol pts
            </span>{" "}
            and an average VIX of {fmt(currentStat.avgVix, 1)}.
          </div>
        )}
      </div>

      {/* Component stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile
          label="Implied (VIX)"
          value={fmt(latest.vix, 2)}
          sub={`1y rank ${fmtPct(latest.vixRank)}`}
          hint="Front-month implied volatility, and where it sits in its trailing 1-year range"
        />
        <StatTile
          label="Realized 20d"
          value={fmt(latest.realizedVol20d, 2)}
          sub={`10d ${fmt(latest.realizedVol10d, 2)}`}
          hint="Annualized standard deviation of SPX log returns over the last 20 / 10 sessions"
        />
        <StatTile
          label="VRP (Implied − Realized)"
          value={`${vrpPositive ? "+" : ""}${fmt(latest.vrp, 2)}`}
          sub={`z-score ${(latest.vrpZ ?? 0) >= 0 ? "+" : ""}${fmt(latest.vrpZ, 2)}`}
          accent={vrpPositive ? "#059669" : "#E11D48"}
          hint="The variance risk premium: how much more volatility options are pricing than the index is delivering"
        />
        <StatTile
          label="Term Structure"
          value={`${(latest.termSlope ?? 0) >= 0 ? "+" : ""}${fmt(latest.termSlope, 2)}`}
          sub={latest.termStructure ?? "—"}
          accent={backwardated ? "#E11D48" : "#059669"}
          hint="3-month VIX minus front-month VIX. Negative (backwardation) signals near-term stress"
        />
      </div>

      {/* Implied vs realized over the last year */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            {vrpPositive ? (
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-rose-600" />
            )}
            <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">
              Implied vs Realized — trailing year
            </h4>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            The gap between the two lines is the premium a seller collects. Below zero, the
            index is moving more than options are pricing.
          </p>
        </div>
        <div className="h-64 w-full px-1 pb-3">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="vrpFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A8672E" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#A8672E" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
                minTickGap={40}
                className="fill-slate-500"
              />
              <YAxis tick={{ fontSize: 10 }} width={38} className="fill-slate-500" />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(148,163,184,0.35)",
                  fontSize: "12px",
                }}
                labelFormatter={(_label, payload) =>
                  payload?.[0]?.payload?.fullDate ?? ""
                }
                formatter={(value: number | string, name: string) => [
                  typeof value === "number" ? value.toFixed(2) : value,
                  name,
                ]}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <ReferenceLine y={0} stroke="#94A3B8" strokeDasharray="2 2" />
              <Area
                type="monotone"
                dataKey="vrp"
                name="VRP"
                stroke="#A8672E"
                strokeWidth={1}
                fill="url(#vrpFill)"
              />
              <Line
                type="monotone"
                dataKey="vix"
                name="Implied (VIX)"
                stroke="#2563EB"
                strokeWidth={1.6}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="realized"
                name="Realized 20d"
                stroke="#E11D48"
                strokeWidth={1.6}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* How each regime has paid */}
      {result?.stats?.length ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">
              How each regime has paid since 2000
            </h4>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Average premium available in each regime across the full sample — the context
              that turns today&apos;s label into a decision.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <th className="px-4 py-2 text-left font-semibold">Regime</th>
                  <th className="px-4 py-2 text-right font-semibold">Avg VRP</th>
                  <th className="px-4 py-2 text-right font-semibold">Avg VIX</th>
                  <th className="px-4 py-2 text-right font-semibold">Sessions</th>
                  <th className="px-4 py-2 text-right font-semibold">% of time</th>
                </tr>
              </thead>
              <tbody>
                {result.stats.map((s) => {
                  const isCurrent = s.regime === latest.regime;
                  const rowStyle = REGIME_STYLES[s.regime] ?? FALLBACK_STYLE;
                  return (
                    <tr
                      key={s.regime}
                      className={`border-b border-gray-100 dark:border-gray-800/60 last:border-0 ${
                        isCurrent ? "bg-[#A8672E]/5 dark:bg-[#D08F52]/10" : ""
                      }`}
                    >
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: rowStyle.dot }}
                          />
                          <span
                            className={`font-medium ${
                              isCurrent
                                ? "text-slate-900 dark:text-slate-100"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {s.regime}
                          </span>
                          {isCurrent && (
                            <span className="rounded-full bg-[#A8672E] px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-[#D08F52] dark:text-[#14171B]">
                              NOW
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className="px-4 py-2.5 text-right font-mono font-semibold tabular-nums"
                        style={{ color: (s.avgVrp ?? 0) >= 0 ? "#059669" : "#E11D48" }}
                      >
                        {(s.avgVrp ?? 0) >= 0 ? "+" : ""}
                        {fmt(s.avgVrp, 2)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {fmt(s.avgVix, 1)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {s.days.toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {fmt(s.pctOfDays, 1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800/60 text-[11px] text-slate-500 dark:text-slate-400">
            Historical averages, not a forecast. Regime is computed from SPX and VIX closes
            through the prior session.
          </div>
        </div>
      ) : null}
    </div>
  );
}
