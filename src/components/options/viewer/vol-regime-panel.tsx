"use client";

import React, { useMemo, useState } from 'react';
import { useQuery } from "@apollo/client";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
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
  Calendar,
  Layers,
  Activity,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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

type VrpTimeframe = '3M' | '6M' | '1Y' | '2Y' | '5Y' | 'ALL' | 'CUSTOM';
type VrpChartMode = 'levels' | 'backtest' | 'distribution';

// VIX level buckets for the distribution view. Boundaries follow the levels practitioners
// actually talk in (sub-12 complacency, the 15-20 "normal" band, 30+ crisis) rather than
// equal-width bins, which would put ~90% of sessions in two buckets and strand the tail.
const VIX_BUCKETS: { label: string; min: number; max: number }[] = [
  { label: '<12',   min: 0,  max: 12 },
  { label: '12–15', min: 12, max: 15 },
  { label: '15–20', min: 15, max: 20 },
  { label: '20–25', min: 20, max: 25 },
  { label: '25–30', min: 25, max: 30 },
  { label: '30–40', min: 30, max: 40 },
  { label: '40+',   min: 40, max: Infinity },
];

// Earliest date with a computable VRP. The underlying table starts 2000-01-03, but the
// first rows are consumed by the 20-session realized-vol warmup, so the first row with a
// non-null vrp/realizedVol20d is 2000-05-01. Used to bound the custom date pickers.
const EARLIEST_VRP_DATE = '2000-05-01';

const toISODate = (d: Date) => d.toISOString().slice(0, 10);

/** Calendar days between an ISO date and today, floored at 0. */
function daysSince(isoDate: string): number {
  const then = new Date(`${isoDate}T00:00:00Z`).getTime();
  if (Number.isNaN(then)) return 0;
  return Math.max(0, Math.ceil((Date.now() - then) / 86_400_000));
}

// The API window is expressed in CALENDAR days, but the chart is sized in TRADING
// sessions. Under-requesting silently truncates the window rather than erroring: the
// previous hardcoded 280-day request returned only 169 sessions while the UI badge
// claimed "252 Sessions", so "1 Year" was really ~8 months of data.
//
// The textbook 365/252 ratio (1.448) is too optimistic once holidays are counted --
// measured against this API, 1,870 calendar days yields 1,244 sessions (~1.50 calendar
// days per session), which left a 5Y request 16 sessions short. 1.55 plus a flat buffer
// clears every timeframe with margin; over-fetching only costs a slightly larger response
// since the extra rows are trimmed by the slice below.
const calendarDaysFor = (sessions: number) => Math.ceil(sessions * 1.55) + 45;

// vol_regime_data begins 2000-01-03 (~26 years); this covers it with room to grow.
const ALL_HISTORY_DAYS = 20000;

// `sessions: null` means "no trailing-session trim" -- All and Custom are bounded by
// available data / explicit dates rather than by a session count.
const TIMEFRAMES: Record<VrpTimeframe, { label: string; sessions: number | null; fetchDays: number }> = {
  '3M':     { label: '3M',     sessions: 63,   fetchDays: calendarDaysFor(63) },
  '6M':     { label: '6M',     sessions: 126,  fetchDays: calendarDaysFor(126) },
  '1Y':     { label: '1Y',     sessions: 252,  fetchDays: calendarDaysFor(252) },
  '2Y':     { label: '2Y',     sessions: 504,  fetchDays: calendarDaysFor(504) },
  '5Y':     { label: '5Y',     sessions: 1260, fetchDays: calendarDaysFor(1260) },
  'ALL':    { label: 'All',    sessions: null, fetchDays: ALL_HISTORY_DAYS },
  'CUSTOM': { label: 'Custom', sessions: null, fetchDays: ALL_HISTORY_DAYS },
};

// Sessions per rebalance in the backtest view -- ~1 trading month, matching the horizon
// fwdEarnedPremium is measured over (VIX today minus realized vol over the next 21).
const BACKTEST_HOLD_SESSIONS = 21;

const MAX_CHART_POINTS = 900;

/**
 * Decimate a long series for chart performance. Plain striding would drop exactly the
 * sessions that matter most in a VRP series -- the COVID crash prints VRP near -33 on a
 * handful of days -- so each bucket contributes its largest-|VRP| row instead. Whole rows
 * are kept, so VIX/realized stay internally consistent with the VRP shown. Summary stats
 * are computed on the FULL window, never on this reduced set.
 */
function downsamplePreservingExtremes<T extends { vrp?: number | null }>(rows: T[], maxPoints: number): T[] {
  if (rows.length <= maxPoints) return rows;
  const bucketSize = rows.length / maxPoints;
  const out: T[] = [];
  for (let i = 0; i < maxPoints; i++) {
    const start = Math.floor(i * bucketSize);
    const end = Math.min(rows.length, Math.floor((i + 1) * bucketSize));
    if (start >= end) continue;
    let best = rows[start];
    for (let j = start + 1; j < end; j++) {
      if (Math.abs(rows[j].vrp ?? 0) > Math.abs(best.vrp ?? 0)) best = rows[j];
    }
    out.push(best);
  }
  const lastRow = rows[rows.length - 1];
  if (out[out.length - 1] !== lastRow) out.push(lastRow); // always end on the latest session
  return out;
}

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
  const [showVix, setShowVix] = useState(true);
  const [showRealized, setShowRealized] = useState(true);
  const [showVrpArea, setShowVrpArea] = useState(true);
  const [timeframe, setTimeframe] = useState<VrpTimeframe>('1Y');
  const [chartMode, setChartMode] = useState<VrpChartMode>('levels');

  // Custom range defaults to the trailing year, so switching to Custom starts from the
  // same window the default preset shows rather than an empty/arbitrary one.
  const today = useMemo(() => toISODate(new Date()), []);
  const oneYearAgo = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return toISODate(d);
  }, []);
  const [customStart, setCustomStart] = useState(oneYearAgo);
  const [customEnd, setCustomEnd] = useState(today);

  const isCustom = timeframe === 'CUSTOM';
  const customRangeValid = !isCustom || (!!customStart && !!customEnd && customStart <= customEnd);

  const tf = TIMEFRAMES[timeframe];

  // For a custom range, fetch back only as far as its start date rather than all 26 years.
  const fetchDays = useMemo(() => {
    if (!isCustom || !customRangeValid) return tf.fetchDays;
    return Math.min(ALL_HISTORY_DAYS, daysSince(customStart) + 60);
  }, [isCustom, customRangeValid, customStart, tf.fetchDays]);

  const { data, loading, error } = useQuery<{ volRegime: VolRegimeResult }>(
    GET_VOL_REGIME,
    { variables: { days: fetchDays }, fetchPolicy: "cache-and-network" }
  );

  const result = data?.volRegime;
  const latest = result?.latestData;

  const rawHistory = result?.history ?? [];

  // Drop uncomputed warmup days, then bound the window: an explicit date range for Custom,
  // otherwise a trailing session count (or everything, for All).
  const filteredHistory = useMemo(() => {
    if (!rawHistory.length) return [];
    const validHistory = rawHistory.filter(d => d.realizedVol20d != null && d.vrp != null);
    if (isCustom) {
      if (!customRangeValid) return [];
      return validHistory.filter(d => d.bizDate >= customStart && d.bizDate <= customEnd);
    }
    return tf.sessions == null ? validHistory : validHistory.slice(-tf.sessions);
  }, [rawHistory, tf.sessions, isCustom, customRangeValid, customStart, customEnd]);

  // Multi-year windows need the year in the axis label; MM-DD alone repeats every cycle.
  const spansMultipleYears = useMemo(() => {
    if (filteredHistory.length < 2) return false;
    return filteredHistory[0].bizDate.slice(0, 4) !== filteredHistory[filteredHistory.length - 1].bizDate.slice(0, 4);
  }, [filteredHistory]);
  const isMultiYear = timeframe === '2Y' || timeframe === '5Y' || timeframe === 'ALL'
    || (isCustom && spansMultipleYears);

  // Chart data with separated positive and negative VRP for dual-color gradient fills
  const chartData = useMemo(() => {
    const sampled = downsamplePreservingExtremes(filteredHistory, MAX_CHART_POINTS);
    return sampled.map((d: VolRegimeDataPoint) => {
      const vrpVal = d.vrp ?? null;
      return {
        date: isMultiYear ? (d.bizDate?.slice(0, 7) ?? "") : (d.bizDate?.slice(5) ?? ""),
        fullDate: d.bizDate,
        vix: d.vix ?? null,
        realized: d.realizedVol20d ?? null,
        vrp: vrpVal,
        posVrp: vrpVal != null ? Math.max(0, vrpVal) : null,
        negVrp: vrpVal != null ? Math.min(0, vrpVal) : null,
        vrpZ: d.vrpZ ?? null,
        vixRank: d.vixRank ?? null,
        regime: d.regime,
      };
    });
  }, [filteredHistory, isMultiYear]);

  const isSampled = filteredHistory.length > MAX_CHART_POINTS;

  /**
   * VIX distribution vs. VRP: bucket the window's sessions by VIX level and show both how
   * often each level occurs and what the premium looked like there. This is the natural
   * companion to the vrp_z quintile test elsewhere on this tab -- that one asks whether the
   * premium being rich *relative to its own history* predicts anything; this one asks the
   * more intuitive question traders actually reach for, whether selling vol pays better
   * when VIX is simply high.
   *
   * `avgFwdEarned` is the honest column: VRP is what was quoted, forward-earned is what a
   * seller of that session's implied vol actually collected once the next 21 sessions
   * realized. They can diverge sharply in exactly the buckets that matter.
   */
  const vixDistribution = useMemo(() => {
    if (!filteredHistory.length) return [];
    const total = filteredHistory.length;
    return VIX_BUCKETS.map(bucket => {
      const rows = filteredHistory.filter(d => {
        const v = d.vix;
        return v != null && v >= bucket.min && v < bucket.max;
      });
      if (!rows.length) {
        return {
          label: bucket.label, sessions: 0, pctOfSessions: 0,
          avgVrp: null, avgFwdEarned: null, pctPositiveVrp: null, avgRealized: null,
        };
      }
      const sum = (pick: (d: VolRegimeDataPoint) => number | null | undefined) =>
        rows.reduce((acc, d) => acc + (pick(d) ?? 0), 0);
      const countOf = (pick: (d: VolRegimeDataPoint) => number | null | undefined) =>
        rows.filter(d => pick(d) != null).length;

      const fwdRows = rows.filter(d => d.fwdEarnedPremium != null);
      return {
        label: bucket.label,
        sessions: rows.length,
        pctOfSessions: Number(((rows.length / total) * 100).toFixed(1)),
        avgVrp: Number((sum(d => d.vrp) / Math.max(1, countOf(d => d.vrp))).toFixed(2)),
        avgRealized: Number((sum(d => d.realizedVol20d) / Math.max(1, countOf(d => d.realizedVol20d))).toFixed(1)),
        avgFwdEarned: fwdRows.length
          ? Number((fwdRows.reduce((a, d) => a + (d.fwdEarnedPremium ?? 0), 0) / fwdRows.length).toFixed(2))
          : null,
        pctPositiveVrp: Number(((rows.filter(d => (d.vrp ?? 0) > 0).length / rows.length) * 100).toFixed(0)),
      };
    });
  }, [filteredHistory]);

  /**
   * Backtest view: the classic VRP harvest, run on non-overlapping ~1-month blocks --
   * sell this session's implied vol, hold to expiry, collect (implied - subsequently
   * realized), repeat. fwdEarnedPremium already carries that per-session outcome, so the
   * only work here is stepping 21 sessions at a time so windows don't overlap (summing it
   * daily would count each session's move ~21 times over).
   *
   * Units are volatility points, not dollars: this is the premium captured per unit of
   * vol exposure, deliberately not converted into a P&L that would imply a position size,
   * a strike, or delta-hedging the platform isn't modelling. The last ~21 sessions have no
   * fwdEarnedPremium yet (the future hasn't happened) and are simply not traded here.
   */
  const backtest = useMemo(() => {
    const trades: { date: string; earned: number; cumulative: number; drawdown: number; regime: string }[] = [];
    let cumulative = 0;
    let peak = 0;
    let wins = 0;
    let worst = 0;

    for (let i = 0; i < filteredHistory.length; i += BACKTEST_HOLD_SESSIONS) {
      const row = filteredHistory[i];
      const earned = row.fwdEarnedPremium;
      if (earned == null) continue;
      cumulative += earned;
      peak = Math.max(peak, cumulative);
      if (earned > 0) wins++;
      if (earned < worst) worst = earned;
      trades.push({
        date: isMultiYear ? (row.bizDate?.slice(0, 7) ?? "") : (row.bizDate?.slice(5) ?? ""),
        earned: Number(earned.toFixed(2)),
        cumulative: Number(cumulative.toFixed(2)),
        drawdown: Number((cumulative - peak).toFixed(2)),
        regime: row.regime,
      });
    }

    if (!trades.length) return null;
    const maxDrawdown = trades.reduce((mn, t) => Math.min(mn, t.drawdown), 0);
    return {
      rows: trades,
      total: cumulative,
      count: trades.length,
      winRatePct: (wins / trades.length) * 100,
      avgPerTrade: cumulative / trades.length,
      maxDrawdown,
      worstTrade: worst,
    };
  }, [filteredHistory, isMultiYear]);

  // High-level summary metrics across the selected window
  const windowStats = useMemo(() => {
    if (!filteredHistory.length) return null;
    let sumVrp = 0;
    let positiveDays = 0;
    let minVrp = Infinity;
    let maxVrp = -Infinity;
    let count = 0;

    filteredHistory.forEach(d => {
      if (d.vrp != null) {
        sumVrp += d.vrp;
        count++;
        if (d.vrp > 0) positiveDays++;
        if (d.vrp < minVrp) minVrp = d.vrp;
        if (d.vrp > maxVrp) maxVrp = d.vrp;
      }
    });

    const avgVrp = count > 0 ? sumVrp / count : 0;
    const positivePct = count > 0 ? (positiveDays / count) * 100 : 0;

    return {
      avgVrp,
      positivePct,
      minVrp: minVrp !== Infinity ? minVrp : 0,
      maxVrp: maxVrp !== -Infinity ? maxVrp : 0,
      sessions: count,
    };
  }, [filteredHistory]);

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

  // Rich Custom Tooltip for VRP History Chart
  const CustomVrpTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      const rStyle = REGIME_STYLES[d.regime] ?? FALLBACK_STYLE;
      const isPositive = (d.vrp ?? 0) >= 0;

      return (
        <div className="bg-slate-900/95 dark:bg-slate-950/95 text-white border border-slate-700/80 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs font-mono max-w-xs space-y-2">
          <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-bold text-sm text-slate-100">{d.fullDate}</span>
            </div>
            {d.regime && (
              <Badge className={`text-[10px] py-0 px-2 font-bold ${rStyle.badge}`}>
                {d.regime}
              </Badge>
            )}
          </div>

          <div className="space-y-1.5 pt-0.5">
            <div className="flex justify-between items-center text-blue-400">
              <span>Implied Vol (VIX):</span>
              <span className="font-bold">{d.vix != null ? `${d.vix.toFixed(2)}%` : '—'}</span>
            </div>
            <div className="flex justify-between items-center text-rose-400">
              <span>Realized Vol (20d):</span>
              <span className="font-bold">{d.realized != null ? `${d.realized.toFixed(2)}%` : '—'}</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-700/60">
              <span className="text-slate-300 font-semibold">Net VRP (Implied − Realized):</span>
              <span className={`font-extrabold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? '+' : ''}{d.vrp != null ? `${d.vrp.toFixed(2)} pts` : '—'}
              </span>
            </div>
            {d.vrpZ != null && (
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>VRP Z-Score:</span>
                <span>{d.vrpZ >= 0 ? '+' : ''}{d.vrpZ.toFixed(2)}σ</span>
              </div>
            )}
            {d.vixRank != null && (
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>VIX 1Y Percentile:</span>
                <span>{(d.vixRank * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-700/80 pt-1.5 text-[10px] text-slate-400 leading-tight">
            {isPositive 
              ? '🟢 Implied exceeds realized: option sellers collected edge over market movement.'
              : '🔴 Realized exceeds implied: market moved more than options priced (seller tail risk).'}
          </div>
        </div>
      );
    }
    return null;
  };

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

      {/* Redesigned VRP History Chart Window */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
        {/* Header & Interactive Filter Bar */}
        <div className="p-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
              <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">
                {chartMode === 'levels' && 'Variance Risk Premium (VRP) History — Implied vs. Realized'}
                {chartMode === 'backtest' && 'VRP Harvest Backtest — Monthly Rebalance'}
                {chartMode === 'distribution' && 'VIX Distribution vs. VRP — Does High Vol Pay Better?'}
              </h4>
            </div>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {chartMode === 'levels' && "The spread between Implied Volatility (VIX) and 20-Day Realized Volatility represents the options seller's edge. Green area = positive VRP; Red area = inverted volatility (seller tail risk)."}
              {chartMode === 'backtest' && `Sell this session's implied vol, hold ~${BACKTEST_HOLD_SESSIONS} sessions to expiry, collect implied minus subsequently-realized, repeat. Non-overlapping windows, measured in volatility points per unit of vol exposure — not a dollar P&L.`}
              {chartMode === 'distribution' && 'Bars show how often each VIX level occurred; lines show the premium there — quoted VRP versus what a seller actually collected over the following 21 sessions. Where the two diverge, the quoted premium was an illusion.'}
            </p>
            {chartMode === 'levels' && isSampled && (
              <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                Showing {chartData.length.toLocaleString()} of {filteredHistory.length.toLocaleString()} sessions — sampled for readability, keeping each interval&apos;s most extreme VRP. Stats below use all sessions.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Series Visibility Toggles — only meaningful for the Levels chart */}
            <div className={`${chartMode === 'levels' ? 'hidden sm:inline-flex' : 'hidden'} items-center gap-1 bg-gray-50 dark:bg-gray-800/60 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] font-mono`}>
              <button
                onClick={() => setShowVix(!showVix)}
                className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1.5 ${
                  showVix
                    ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                VIX
              </button>
              <button
                onClick={() => setShowRealized(!showRealized)}
                className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1.5 ${
                  showRealized
                    ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Realized 20d
              </button>
              <button
                onClick={() => setShowVrpArea(!showVrpArea)}
                className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1.5 ${
                  showVrpArea
                    ? 'bg-[#A8672E]/10 text-[#A8672E] dark:text-[#D08F52] font-semibold'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#A8672E]" />
                VRP Shading
              </button>
            </div>

            {/* Levels vs Backtest mode */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-[11px] font-mono font-semibold">
              <button
                onClick={() => setChartMode('levels')}
                className={`px-2.5 py-0.5 rounded-md transition-all ${
                  chartMode === 'levels'
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Levels
              </button>
              <button
                onClick={() => setChartMode('backtest')}
                className={`px-2.5 py-0.5 rounded-md transition-all ${
                  chartMode === 'backtest'
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Backtest
              </button>
              <button
                onClick={() => setChartMode('distribution')}
                className={`px-2.5 py-0.5 rounded-md transition-all ${
                  chartMode === 'distribution'
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                VIX Dist.
              </button>
            </div>

            {/* Timeframe selector */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-[11px] font-mono font-semibold">
              {(Object.keys(TIMEFRAMES) as VrpTimeframe[]).map(key => (
                <button
                  key={key}
                  onClick={() => setTimeframe(key)}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    timeframe === key
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {TIMEFRAMES[key].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom date range pickers */}
        {isCustom && (
          <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <label className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400">From</span>
              <input
                type="date"
                value={customStart}
                min={EARLIEST_VRP_DATE}
                max={customEnd || today}
                onChange={(e) => setCustomStart(e.target.value)}
                className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52]"
              />
            </label>
            <label className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400">To</span>
              <input
                type="date"
                value={customEnd}
                min={customStart || EARLIEST_VRP_DATE}
                max={today}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52]"
              />
            </label>

            {/* One-click jumps to the episodes this data is most often used to study */}
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-slate-400 dark:text-slate-500">Jump to</span>
            {([
              { label: 'GFC 2008', start: '2008-01-01', end: '2009-06-30' },
              { label: 'COVID 2020', start: '2020-01-01', end: '2020-12-31' },
              { label: 'Volmageddon', start: '2018-01-01', end: '2018-04-30' },
            ] as const).map(preset => (
              <button
                key={preset.label}
                onClick={() => { setCustomStart(preset.start); setCustomEnd(preset.end); }}
                className="px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-400 hover:border-[#A8672E]/50 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-all"
              >
                {preset.label}
              </button>
            ))}

            {!customRangeValid && (
              <span className="text-rose-600 dark:text-rose-400">Start date must be on or before end date.</span>
            )}
            {customRangeValid && filteredHistory.length === 0 && !loading && (
              <span className="text-amber-600 dark:text-amber-400">No sessions in this range.</span>
            )}
          </div>
        )}

        {/* Statistical Summary HUD Bar across active 1Y window */}
        {chartMode === 'levels' && windowStats && (
          <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Avg VRP:</span>
                <span className={`font-bold ${windowStats.avgVrp >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {windowStats.avgVrp >= 0 ? '+' : ''}{windowStats.avgVrp.toFixed(2)} pts
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Positive Sessions:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {windowStats.positivePct.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">VRP Range:</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {windowStats.minVrp.toFixed(1)} → +{windowStats.maxVrp.toFixed(1)} pts
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              {windowStats.sessions.toLocaleString()} sessions
              {filteredHistory.length > 0 && (
                <> · {filteredHistory[0].bizDate} → {filteredHistory[filteredHistory.length - 1].bizDate}</>
              )}
            </div>
          </div>
        )}

        {chartMode === 'distribution' && vixDistribution.some(b => b.sessions > 0) && (
          <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
            <table className="w-full text-[11px] font-mono min-w-[560px]">
              <thead>
                <tr className="text-slate-400 dark:text-slate-500 text-left">
                  <th className="font-semibold pb-1">VIX</th>
                  <th className="font-semibold pb-1 text-right">Sessions</th>
                  <th className="font-semibold pb-1 text-right">% of window</th>
                  <th className="font-semibold pb-1 text-right">Avg realized</th>
                  <th className="font-semibold pb-1 text-right">Avg quoted VRP</th>
                  <th className="font-semibold pb-1 text-right">Avg earned</th>
                  <th className="font-semibold pb-1 text-right">% positive</th>
                </tr>
              </thead>
              <tbody>
                {vixDistribution.filter(b => b.sessions > 0).map(b => (
                  <tr key={b.label} className="border-t border-gray-200/60 dark:border-gray-700/60">
                    <td className="py-1 font-semibold text-slate-700 dark:text-slate-300">{b.label}</td>
                    <td className="py-1 text-right text-slate-600 dark:text-slate-400">{b.sessions.toLocaleString()}</td>
                    <td className="py-1 text-right text-slate-600 dark:text-slate-400">{b.pctOfSessions}%</td>
                    <td className="py-1 text-right text-slate-600 dark:text-slate-400">{b.avgRealized ?? '—'}</td>
                    <td className={`py-1 text-right font-semibold ${(b.avgVrp ?? 0) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {b.avgVrp == null ? '—' : `${b.avgVrp >= 0 ? '+' : ''}${b.avgVrp}`}
                    </td>
                    <td className={`py-1 text-right font-semibold ${(b.avgFwdEarned ?? 0) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {b.avgFwdEarned == null ? '—' : `${b.avgFwdEarned >= 0 ? '+' : ''}${b.avgFwdEarned}`}
                    </td>
                    <td className="py-1 text-right text-slate-600 dark:text-slate-400">{b.pctPositiveVrp}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Reading the gap:</span> quoted VRP compares
              implied against the <em>trailing</em> 20 sessions, while &ldquo;earned&rdquo; compares it against the{' '}
              <em>next</em> {BACKTEST_HOLD_SESSIONS}. In high-VIX buckets trailing realized is already elevated, so quoted VRP
              looks poor — even negative — while forward realized mean-reverts lower and the seller collects more than the
              quote implied. Low-VIX buckets run the other way. That divergence, not the quoted number, is what a seller
              actually receives.
            </p>
          </div>
        )}

        {chartMode === 'backtest' && backtest && (
          <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Total Harvested:</span>
                <span className={`font-bold ${backtest.total >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {backtest.total >= 0 ? '+' : ''}{backtest.total.toFixed(1)} pts
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Avg / Trade:</span>
                <span className={`font-bold ${backtest.avgPerTrade >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {backtest.avgPerTrade >= 0 ? '+' : ''}{backtest.avgPerTrade.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Win Rate:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{backtest.winRatePct.toFixed(0)}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Max Drawdown:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{backtest.maxDrawdown.toFixed(1)} pts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Worst Trade:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{backtest.worstTrade.toFixed(1)}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              {backtest.count.toLocaleString()} non-overlapping trades
            </div>
          </div>
        )}

        {/* Chart Canvas */}
        <div className="h-[360px] w-full p-4">
          {chartMode === 'distribution' ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={vixDistribution} margin={{ top: 12, right: 16, left: 0, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:opacity-10" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#64748b" dy={5} />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  width={48}
                  stroke="#64748b"
                  tickFormatter={(v) => `${v}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                  width={48}
                  stroke="#94a3b8"
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                  formatter={(value, name) => {
                    const label = name === 'sessions'
                      ? 'Frequency'
                      : name === 'avgVrp' ? 'Avg quoted VRP' : 'Avg actually earned';
                    if (typeof value !== 'number') return ['—', label];
                    if (name === 'sessions') return [`${value.toLocaleString()} sessions`, label];
                    return [`${value >= 0 ? '+' : ''}${value} vol pts`, label];
                  }}
                  labelFormatter={(label, payload) => {
                    const d = payload?.[0]?.payload;
                    if (!d) return `VIX ${label}`;
                    return `VIX ${label} — ${d.pctOfSessions}% of window · ${d.pctPositiveVrp}% positive VRP · avg realized ${d.avgRealized}`;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <ReferenceLine yAxisId="right" y={0} stroke="#94a3b8" strokeDasharray="2 2" />
                <Bar yAxisId="left" dataKey="sessions" name="Sessions" fill="#94a3b8" opacity={0.45} radius={[3, 3, 0, 0]} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgVrp"
                  name="Avg quoted VRP"
                  stroke="#A8672E"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  connectNulls
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgFwdEarned"
                  name="Avg actually earned (fwd 21d)"
                  stroke="#059669"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  dot={{ r: 3 }}
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : chartMode === 'backtest' ? (
            backtest ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={backtest.rows} margin={{ top: 12, right: 16, left: 0, bottom: 15 }}>
                  <defs>
                    <linearGradient id="btEquityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A8672E" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#A8672E" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:opacity-10" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    interval="preserveStartEnd"
                    minTickGap={45}
                    stroke="#64748b"
                    dy={5}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 11 }}
                    width={48}
                    stroke="#64748b"
                    tickFormatter={(val) => `${val}`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11 }}
                    width={48}
                    stroke="#94a3b8"
                    tickFormatter={(val) => `${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(value: number, name: string) => {
                      const labels: Record<string, string> = {
                        cumulative: 'Cumulative harvested',
                        earned: 'This trade',
                        drawdown: 'Drawdown from peak',
                      };
                      return [`${value >= 0 ? '+' : ''}${value} vol pts`, labels[name] ?? name];
                    }}
                    labelFormatter={(label, payload) => {
                      const item = payload?.[0]?.payload;
                      return item ? `Entry ${label} — regime at entry: ${item.regime}` : label;
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <ReferenceLine yAxisId="left" y={0} stroke="#94a3b8" strokeDasharray="2 2" />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="drawdown"
                    name="Drawdown"
                    stroke="#f43f5e"
                    strokeWidth={1}
                    fill="#f43f5e"
                    fillOpacity={0.12}
                  />
                  <Bar yAxisId="left" dataKey="earned" name="Per-trade" fill="#94a3b8" opacity={0.45} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="cumulative"
                    name="Cumulative harvested"
                    stroke="#A8672E"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2">
                <Info className="h-5 w-5 text-slate-400" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Not enough completed windows</p>
                <p className="text-xs text-slate-500 max-w-md">
                  The backtest needs at least one {BACKTEST_HOLD_SESSIONS}-session window that has already
                  fully elapsed. Try a longer timeframe.
                </p>
              </div>
            )
          ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 12, right: 16, left: 0, bottom: 15 }}>
              <defs>
                <linearGradient id="vrpGreenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.38} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="vrpRedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.05} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.35} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:opacity-10" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
                minTickGap={45}
                stroke="#64748b"
                dy={5}
              />
              <YAxis 
                tick={{ fontSize: 11 }} 
                width={42} 
                stroke="#64748b" 
                tickFormatter={(val) => `${val}`}
              />
              <Tooltip content={<CustomVrpTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "11px", fontFamily: "monospace" }} />
              <ReferenceLine y={0} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="2 2" />

              {/* Shaded Area for Positive VRP (Harvesting Zone) */}
              {showVrpArea && (
                <Area
                  type="monotone"
                  dataKey="posVrp"
                  name="Positive VRP (Harvest)"
                  stroke="#10b981"
                  strokeWidth={1}
                  fill="url(#vrpGreenGrad)"
                />
              )}

              {/* Shaded Area for Negative VRP (Crisis / Inversion Zone) */}
              {showVrpArea && (
                <Area
                  type="monotone"
                  dataKey="negVrp"
                  name="Negative VRP (Inverted)"
                  stroke="#f43f5e"
                  strokeWidth={1}
                  fill="url(#vrpRedGrad)"
                />
              )}

              {/* Implied Volatility (VIX) */}
              {showVix && (
                <Line
                  type="monotone"
                  dataKey="vix"
                  name="Implied (VIX)"
                  stroke="#2563eb"
                  strokeWidth={2.2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              )}

              {/* Realized Volatility (20d) */}
              {showRealized && (
                <Line
                  type="monotone"
                  dataKey="realized"
                  name="Realized 20d"
                  stroke="#e11d48"
                  strokeWidth={2.2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
          )}
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
                  <th className="px-4 py-2 text-right font-semibold">Avg VRP (vol pts)</th>
                  <th className="px-4 py-2 text-right font-semibold">Avg VRP (variance pts)</th>
                  <th className="px-4 py-2 text-right font-semibold">Downside var. share</th>
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
                      <td
                        className="px-4 py-2.5 text-right font-mono tabular-nums"
                        style={{ color: (s.avgVrpVariance ?? 0) >= 0 ? "#059669" : "#E11D48" }}
                      >
                        {(s.avgVrpVariance ?? 0) >= 0 ? "+" : ""}
                        {fmt(s.avgVrpVariance, 2)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {fmt((s.avgDownsideVarianceShare ?? 0) * 100, 0, "%")}
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
          <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <p>
              &quot;Vol pts&quot; is VIX minus realized vol directly — the number usually quoted, but it
              overstates the true premium (Jensen&apos;s inequality: E[σ] ≠ √E[σ²]). &quot;Variance pts&quot;
              (VIX² − realized²) is what a variance swap actually pays, and shrinks Harvest&apos;s
              headline premium by roughly two-thirds.
            </p>
            <p>
              Historical averages, not a forecast. Regime is computed from SPX and VIX closes
              through the prior session.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
