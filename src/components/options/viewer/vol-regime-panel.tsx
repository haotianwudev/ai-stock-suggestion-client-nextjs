"use client";

import React, { useMemo, useState } from 'react';
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

type VrpTimeframe = '3M' | '6M' | '1Y' | 'ALL';

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
  const [timeframe, setTimeframe] = useState<VrpTimeframe>('1Y');
  const [showVix, setShowVix] = useState(true);
  const [showRealized, setShowRealized] = useState(true);
  const [showVrpArea, setShowVrpArea] = useState(true);

  const { data, loading, error } = useQuery<{ volRegime: VolRegimeResult }>(
    GET_VOL_REGIME,
    { variables: { days: 500 }, fetchPolicy: "cache-and-network" }
  );

  const result = data?.volRegime;
  const latest = result?.latestData;

  const rawHistory = result?.history ?? [];

  // Filter history based on selected timeframe
  const filteredHistory = useMemo(() => {
    if (!rawHistory.length) return [];
    if (timeframe === '3M') return rawHistory.slice(-63);
    if (timeframe === '6M') return rawHistory.slice(-126);
    if (timeframe === '1Y') return rawHistory.slice(-252);
    return rawHistory;
  }, [rawHistory, timeframe]);

  // Chart data with separated positive and negative VRP for dual-color gradient fills
  const chartData = useMemo(() => {
    return filteredHistory.map((d: VolRegimeDataPoint) => {
      const vrpVal = d.vrp ?? null;
      return {
        date: d.bizDate?.slice(5) ?? "",
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
  }, [filteredHistory]);

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
                Variance Risk Premium (VRP) History — Implied vs. Realized
              </h4>
            </div>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              The spread between Implied Volatility (VIX) and 20-Day Realized Volatility represents the options seller&apos;s edge. Green area = positive VRP; Red area = inverted volatility (seller tail risk).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Series Visibility Toggles */}
            <div className="hidden sm:inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-800/60 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] font-mono">
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

            {/* Timeframe Selector Buttons */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-xs font-semibold">
              {(['3M', '6M', '1Y', 'ALL'] as VrpTimeframe[]).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-md transition-all font-mono ${
                    timeframe === tf
                      ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistical Summary HUD Bar across active window */}
        {windowStats && (
          <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Avg VRP:</span>
                <span className={`font-bold ${windowStats.avgVrp >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {windowStats.avgVrp >= 0 ? '+' : ''}{windowStats.avgVrp.toFixed(2)} pts
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Harvest Win Rate:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {windowStats.positivePct.toFixed(1)}% of sessions
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">{timeframe} Range:</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {windowStats.minVrp.toFixed(1)} → +{windowStats.maxVrp.toFixed(1)} pts
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              {windowStats.sessions} trading sessions in view
            </div>
          </div>
        )}

        {/* Chart Canvas */}
        <div className="h-[360px] w-full p-4">
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
