"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import {
  Compass,
  Activity,
  TrendingUp,
  Layers,
  FileText,
  GraduationCap,
  ExternalLink,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { GET_INVESTMENT_CLOCK } from "@/lib/graphql/queries";
import { InvestmentClockResult } from "@/lib/graphql/types";
import { ClockFace } from "@/components/investment-clock/clock-face";
import { TracerDiagram } from "@/components/investment-clock/tracer-diagram";
import { HistoricalChart } from "@/components/investment-clock/historical-chart";
import { AssetAllocationCards } from "@/components/investment-clock/asset-allocation-cards";
import { LlmEvaluationPanel } from "@/components/investment-clock/llm-evaluation-panel";
import {
  SlotKicker,
  VideoCard,
  PaperCard,
  PaperModal,
  WikiCard,
  WikiModal,
} from "@/components/articles/article-frame";
import { CommentSection } from "@/components/comments/comment-section";
import { getArticleBySlug } from "@/lib/article-utils";
import { getWikiEntryForArticle } from "@/data/wiki";
import { Article } from "@/data/articles/types";

const RELATED_ARTICLE_SLUGS = [
  "investment-clock-framework-quantitative-macro-regime-detection",
  "quantitative-guide-calculate-investment-clock",
  "navigating-bull-to-bear-regime-shift-quantitative-signals",
];

const PHASE_COLORS: Record<string, string> = {
  Recovery: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
  Overheat: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30",
  Stagflation: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  Reflation: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
};

const PHASE_ASSETS: Record<string, string> = {
  Recovery: "Equities",
  Overheat: "Commodities",
  Stagflation: "Cash / Equivalents",
  Reflation: "Government Bonds",
};

const statAccent = {
  regime: "border-[#A8672E] dark:border-[#D08F52]",
  asset: "border-[#1D8A70] dark:border-[#3CBF9C]",
  growth: "border-[#2563eb] dark:border-[#3b82f6]",
  inflation: "border-[#BC4128] dark:border-[#E2694A]",
} as const;

function StatChip({
  label,
  value,
  sublabel,
  accent,
}: {
  label: string;
  value: string;
  sublabel?: string;
  accent: keyof typeof statAccent;
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-l-4 ${statAccent[accent]} rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </p>
        <p className="font-mono text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
          {value}
        </p>
      </div>
      {sublabel && (
        <p className="text-xs text-muted-foreground mt-2 pt-1 border-t border-gray-100 dark:border-gray-800">
          {sublabel}
        </p>
      )}
    </div>
  );
}

const SHORT_TITLES: Record<string, string> = {
  "investment-clock-framework-quantitative-macro-regime-detection": "Macro Regime Detection Framework",
  "quantitative-guide-calculate-investment-clock": "How to Calculate the Clock",
  "navigating-bull-to-bear-regime-shift-quantitative-signals": "Bull-to-Bear Regime Shift Signals",
};

function StudyGuideCard({
  articles,
  selectedSlug,
  onSelect,
}: {
  articles: Article[];
  selectedSlug: string | undefined;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
      <SlotKicker icon={GraduationCap} label="Study Guide" tone="accent" />
      <div className="flex flex-col gap-2">
        {articles.map((article) => {
          const active = article.slug === selectedSlug;
          const displayTitle = SHORT_TITLES[article.slug] ?? article.title;
          return (
            <div
              key={article.slug}
              className={`flex items-center gap-1 rounded-lg border transition-colors ${
                active
                  ? "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/5 dark:bg-[#D08F52]/10"
                  : "border-gray-200 dark:border-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40"
              }`}
            >
              <button
                onClick={() => onSelect(article.slug!)}
                className={`flex-1 min-w-0 text-left text-xs sm:text-sm font-medium px-3 py-2 truncate transition-colors ${
                  active
                    ? "text-[#A8672E] dark:text-[#D08F52] font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                title={article.title}
              >
                {displayTitle}
              </button>
              <Link
                href={`/articles/${article.slug}`}
                className="shrink-0 pr-3 text-gray-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
                title={`Open article: ${article.title}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function roleStyle(role: string): string {
  if (role.startsWith("Growth"))
    return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
  if (role.startsWith("Inflation"))
    return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20";
  return "bg-muted text-muted-foreground border-border";
}

function RawIndicator({
  label,
  value,
  unit = "",
  decimals = 2,
  yoy,
  yoySuffix = "% YoY",
  description,
  role,
  invertSignal,
}: {
  label: string;
  value?: number | null;
  unit?: string;
  decimals?: number;
  yoy?: number | null;
  yoySuffix?: string;
  description?: string;
  role?: string;
  invertSignal?: boolean;
}) {
  const display =
    value !== undefined && value !== null ? `${value.toFixed(decimals)}${unit}` : "—";
  const yoyDisplay =
    yoy !== undefined && yoy !== null
      ? `${yoy >= 0 ? "+" : ""}${yoy.toFixed(1)}${yoySuffix}`
      : null;
  const yoyPositive = invertSignal ? (yoy ?? 0) <= 0 : (yoy ?? 0) >= 0;
  return (
    <div className="flex flex-col gap-0.5 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-muted-foreground">{label}</span>
        {role && (
          <span
            className={`text-[9px] font-semibold px-1 py-0 rounded border ${roleStyle(
              role
            )}`}
          >
            {role}
          </span>
        )}
      </div>
      <span className="text-sm font-semibold font-mono mt-0.5">{display}</span>
      {yoyDisplay && (
        <span
          className={`text-[11px] font-medium font-mono ${
            yoyPositive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
          }`}
        >
          {yoyDisplay}
        </span>
      )}
      {description && (
        <span className="text-[10px] text-muted-foreground leading-tight mt-1">
          {description}
        </span>
      )}
    </div>
  );
}

export function InvestmentClockClient() {
  const { data, loading, refetch } = useQuery<{ investmentClock: InvestmentClockResult }>(
    GET_INVESTMENT_CLOCK,
    { fetchPolicy: "cache-and-network" }
  );

  const [tracerHovered, setTracerHovered] = useState<number | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>(
    RELATED_ARTICLE_SLUGS[0]
  );
  const [paperOpen, setPaperOpen] = useState(false);
  const [wikiOpen, setWikiOpen] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const relatedArticles = useMemo(() => {
    return RELATED_ARTICLE_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
      (a): a is Article & { slug: string; title: string } => Boolean(a?.slug && a?.title)
    );
  }, []);

  const selectedArticle = useMemo(() => {
    return relatedArticles.find((a) => a.slug === selectedArticleSlug) ?? relatedArticles[0];
  }, [relatedArticles, selectedArticleSlug]);

  const wikiEntry = useMemo(
    () => (selectedArticle ? getWikiEntryForArticle(selectedArticle) : null),
    [selectedArticle]
  );

  const clock = data?.investmentClock;
  const latestData = clock?.latestData;
  const evaluation = clock?.current;
  const history = clock?.history ?? [];

  const displayPhase = evaluation?.finalPhase ?? latestData?.dataPhase ?? "Recovery";
  const clockAngle = latestData?.clockAngle ?? 45;
  const bestAsset = evaluation?.bestAsset ?? PHASE_ASSETS[displayPhase] ?? "Equities";
  const growthZ = latestData?.growthZScore;
  const inflationZ = latestData?.inflationZScore;
  const bizDate = evaluation?.bizDate ?? latestData?.bizDate ?? "";

  // When a dot is hovered in the diagram, scroll the matching row into view
  const handleDotHover = (i: number | null) => {
    setTracerHovered(i);
    if (i == null) return;
    const tableRowIdx = history.length - 1 - i;
    rowRefs.current[tableRowIdx]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  if (loading && !data) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-44 bg-muted/40 rounded-2xl border border-border" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-muted/40 rounded-2xl border border-border" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-96 bg-muted/40 rounded-2xl border border-border" />
            <div className="h-64 bg-muted/40 rounded-2xl border border-border" />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="h-48 bg-muted/40 rounded-2xl border border-border" />
            <div className="h-64 bg-muted/40 rounded-2xl border border-border" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Top Hero Card ─────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <SlotKicker icon={Compass} label="Macroeconomic Framework" tone="accent" />
          <div className="flex items-center gap-2">
            {bizDate && (
              <span className="text-xs font-mono text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-lg border border-border">
                {bizDate}
              </span>
            )}
            <button
              onClick={() => refetch()}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
              title="Refresh Macro Data"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-3">
          Merrill Lynch Investment Clock
        </h1>

        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
          A quantitative macroeconomic regime tracker based on the Merrill Lynch Investment Clock.
          The economy progresses through four distinct regimes — <strong>Reflation</strong>, <strong>Recovery</strong>,{" "}
          <strong>Overheat</strong>, and <strong>Stagflation</strong> — governed by the momentum of composite{" "}
          <strong>Growth</strong> and <strong>Inflation</strong> Z-scores derived from 10 FRED economic indicators.
        </p>

        {/* Stat Chips */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatChip
            label="Current Regime"
            value={displayPhase}
            sublabel={evaluation?.phaseDirection ? `Direction: ${evaluation.phaseDirection}` : "Macro Phase"}
            accent="regime"
          />
          <StatChip
            label="Optimal Asset Class"
            value={bestAsset}
            sublabel="Tactical Overweight"
            accent="asset"
          />
          <StatChip
            label="Growth Z-Score"
            value={growthZ !== undefined ? `${growthZ >= 0 ? "+" : ""}${growthZ.toFixed(3)}` : "—"}
            sublabel={(growthZ ?? 0) >= 0 ? "Above Long-Run Trend" : "Below Long-Run Trend"}
            accent="growth"
          />
          <StatChip
            label="Inflation Z-Score"
            value={inflationZ !== undefined ? `${inflationZ >= 0 ? "+" : ""}${inflationZ.toFixed(3)}` : "—"}
            sublabel={(inflationZ ?? 0) >= 0 ? "Above 2% Target Range" : "Disinflation / Below Target"}
            accent="inflation"
          />
        </div>
      </div>

      {/* ── Main Two-Column Layout ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Clock Position & Phase Tracer */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
            <div>
              <SlotKicker icon={Activity} label="Phase Space Dynamics" tone="accent" />
              <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100">
                Cycle Clock &amp; 24-Month Trajectory Tracer
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                The clock hand indicates the current composite angle in the four quadrants. The 24-month
                phase space tracer plots Growth Z vs. Inflation Z to highlight cycle rotation dynamics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Clock Face */}
              <div className="flex items-center justify-center p-2 rounded-2xl bg-gray-50/50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800">
                <ClockFace clockAngle={clockAngle} phase={displayPhase} size={380} />
              </div>

              {/* 24-Month Tracer & Table */}
              <div className="space-y-3 flex flex-col justify-between">
                {history.length > 0 ? (
                  <>
                    <div className="p-2 rounded-2xl bg-gray-50/50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800 flex justify-center">
                      <TracerDiagram
                        history={history}
                        hoveredIndex={tracerHovered}
                        onHoverIndex={handleDotHover}
                      />
                    </div>

                    {/* Interactive table */}
                    <div
                      ref={tableRef}
                      className="max-h-40 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-800 text-xs"
                    >
                      <table className="w-full border-collapse">
                        <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
                          <tr>
                            <th className="text-left px-2.5 py-1.5 font-semibold text-muted-foreground">Month</th>
                            <th className="text-left px-2.5 py-1.5 font-semibold text-muted-foreground">Phase</th>
                            <th className="text-right px-2.5 py-1.5 font-semibold text-muted-foreground">Growth Z</th>
                            <th className="text-right px-2.5 py-1.5 font-semibold text-muted-foreground">Inflation Z</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...history].reverse().map((d, tableIdx) => {
                            const histIdx = history.length - 1 - tableIdx;
                            const isLatest = histIdx === history.length - 1;
                            const isHovered = tracerHovered === histIdx;
                            const phaseTextColor =
                              d.dataPhase === "Recovery"
                                ? "text-green-600 dark:text-green-400"
                                : d.dataPhase === "Overheat"
                                ? "text-red-600 dark:text-red-400"
                                : d.dataPhase === "Stagflation"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-blue-600 dark:text-blue-400";
                            return (
                              <tr
                                key={d.bizDate}
                                ref={(el) => {
                                  rowRefs.current[tableIdx] = el;
                                }}
                                className={`border-t border-gray-100 dark:border-gray-800 transition-colors cursor-default ${
                                  isHovered
                                    ? "bg-[#A8672E]/10 dark:bg-[#D08F52]/10"
                                    : isLatest
                                    ? "bg-muted/40 font-semibold"
                                    : "hover:bg-muted/30"
                                }`}
                                onMouseEnter={() => setTracerHovered(histIdx)}
                                onMouseLeave={() => setTracerHovered(null)}
                              >
                                <td className="px-2.5 py-1 font-mono">
                                  {d.bizDate.slice(0, 7)}
                                  {isLatest && (
                                    <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                                      NOW
                                    </span>
                                  )}
                                </td>
                                <td className={`px-2.5 py-1 font-medium ${phaseTextColor}`}>{d.dataPhase}</td>
                                <td
                                  className={`px-2.5 py-1 text-right font-mono ${
                                    d.growthZScore >= 0
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-500 dark:text-red-400"
                                  }`}
                                >
                                  {d.growthZScore >= 0 ? "+" : ""}
                                  {d.growthZScore.toFixed(3)}
                                </td>
                                <td
                                  className={`px-2.5 py-1 text-right font-mono ${
                                    d.inflationZScore >= 0
                                      ? "text-orange-500 dark:text-orange-400"
                                      : "text-blue-500 dark:text-blue-400"
                                  }`}
                                >
                                  {d.inflationZScore >= 0 ? "+" : ""}
                                  {d.inflationZScore.toFixed(3)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
                    No historical data available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Historical Timeline & Z-Score Trajectory */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
            <div>
              <SlotKicker icon={TrendingUp} label="Historical Trajectory" tone="accent" />
              <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100">
                Growth &amp; Inflation Momentum Timeline
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                24-month timeline tracing composite Growth Z and Inflation Z against historical regime bands.
              </p>
            </div>
            <HistoricalChart history={history} />
          </div>

          {/* Section 3: AI Macro Regime Evaluation */}
          {evaluation ? (
            <LlmEvaluationPanel evaluation={evaluation} />
          ) : (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm text-center py-10 space-y-2">
              <Sparkles className="h-6 w-6 text-[#A8672E] dark:text-[#D08F52] mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                No AI Deep Research Evaluation Registered Yet
              </p>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Generate prompt via <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">/investment-clock-prompt</code>,
                complete Gemini research, and ingest via <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">/investment-clock-analyze</code>.
              </p>
            </div>
          )}

          {/* Section 4: Asset Allocation Playbook by Regime */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
            <div>
              <SlotKicker icon={Layers} label="Tactical Asset Allocation" tone="accent" />
              <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100">
                Regime Playbook &amp; Sector Rotation
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Theoretical and quantitative sector rotation matrix across all 4 macro phases with highlighted active ETFs.
              </p>
            </div>
            <AssetAllocationCards
              phase={displayPhase}
              bestAsset={evaluation?.bestAsset}
              recommendedSectors={evaluation?.recommendedSectors}
              sectorRationale={evaluation?.sectorRationale}
            />
          </div>

          {/* Section 5: FRED Economic Signals & Composite Breakdown */}
          {latestData && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
              <div>
                <SlotKicker icon={FileText} label="Economic Telemetry" tone="accent" />
                <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100">
                  Raw FRED Macroeconomic Indicators
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  10 federal economic indicators processed via exponential rolling Z-scores (span=24 months).
                </p>
              </div>

              {/* Growth Signals */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-400 mb-2">
                  Growth Signals (Composite: +{(latestData.growthZScore ?? 0) >= 0 ? "+" : ""}{(latestData.growthZScore ?? 0).toFixed(3)})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <RawIndicator
                    label="OECD CLI"
                    value={latestData.cliValue}
                    decimals={1}
                    yoy={latestData.cliYoyChange}
                    yoySuffix=" pts YoY"
                    role="Growth 50%"
                    description="Composite Leading Indicator. >100 = expansion; <100 = contraction. Leads GDP by 3-6 months."
                  />
                  <RawIndicator
                    label="Ind. Production"
                    value={latestData.indproValue}
                    decimals={2}
                    yoy={latestData.indproYoyPct}
                    role="Growth 20%"
                    description="Factory & utility output. Coincident indicator of real economic activity."
                  />
                  <RawIndicator
                    label="Jobless Claims"
                    value={latestData.icsaValue != null ? latestData.icsaValue / 1000 : undefined}
                    unit="k"
                    decimals={0}
                    yoy={latestData.icsaYoyPct}
                    invertSignal
                    role="Growth 15%"
                    description="Weekly initial claims (monthly avg). Rising = labor market weakening."
                  />
                  <RawIndicator
                    label="Unemployment"
                    value={latestData.unrateValue}
                    unit="%"
                    decimals={1}
                    yoy={latestData.unrateYoyChange}
                    yoySuffix=" pp YoY"
                    invertSignal
                    role="Growth 15%"
                    description="Lagging labor confirmation. Rising = growth slowdown confirmed."
                  />
                </div>
              </div>

              {/* Inflation Signals */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-400 mb-2">
                  Inflation Signals (Composite: +{(latestData.inflationZScore ?? 0) >= 0 ? "+" : ""}{(latestData.inflationZScore ?? 0).toFixed(3)})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <RawIndicator
                    label="5Y Breakeven"
                    value={latestData.t5yieValue}
                    unit="%"
                    decimals={2}
                    role="Inflation 30%"
                    description="Market's 5-year inflation expectation (TIPS spread). >2% = above Fed target."
                  />
                  <RawIndicator
                    label="CPI YoY"
                    value={latestData.cpiYoy}
                    unit="%"
                    decimals={2}
                    role="Inflation 25%"
                    description="Core CPI 12-month rate vs 2% target. Lagging trend confirmer."
                  />
                  <RawIndicator
                    label="PPI Final Demand"
                    value={latestData.ppiYoy}
                    unit="%"
                    decimals={2}
                    role="Inflation 20%"
                    description="Producer prices YoY vs 2% target. Leads CPI by 2-6 months."
                  />
                  <RawIndicator
                    label="CPI MoM Ann."
                    value={latestData.cpiMomAnn}
                    unit="%"
                    decimals={2}
                    role="Inflation 15%"
                    description="Annualized monthly CPI rate vs 2% target. Real-time inflection."
                  />
                  <RawIndicator
                    label="Cap. Utilization"
                    value={latestData.tcuValue}
                    unit="%"
                    decimals={1}
                    role="Inflation 10%"
                    description="% of industrial capacity in use. >80% signals pricing pressure."
                  />
                  <RawIndicator
                    label="Real GDP"
                    value={latestData.gdpValue}
                    unit="B$"
                    decimals={0}
                    yoy={latestData.gdpYoyPct}
                    description="Inflation-adj. US output. Reference indicator (not in composite)."
                  />
                </div>
              </div>

              {/* Composite Z-Score Summaries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                      Growth Z-Score Engine
                    </span>
                    <span
                      className={`text-base font-bold font-mono ${
                        (latestData.growthZScore ?? 0) >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {latestData.growthZScore !== undefined
                        ? `${latestData.growthZScore >= 0 ? "+" : ""}${latestData.growthZScore.toFixed(3)}`
                        : "—"}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Weighted composite: CLI (50%) + INDPRO (20%) + inverted Jobless Claims (15%) + inverted Unemployment (15%).
                    {(latestData.growthZScore ?? 0) >= 0 ? " Above trend indicates Recovery/Overheat." : " Below trend indicates Reflation/Stagflation."}
                  </p>
                </div>

                <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs font-semibold text-orange-700 dark:text-orange-400">
                      Inflation Z-Score Engine
                    </span>
                    <span
                      className={`text-base font-bold font-mono ${
                        (latestData.inflationZScore ?? 0) >= 0
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-blue-500 dark:text-blue-400"
                      }`}
                    >
                      {latestData.inflationZScore !== undefined
                        ? `${latestData.inflationZScore >= 0 ? "+" : ""}${latestData.inflationZScore.toFixed(3)}`
                        : "—"}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Weighted composite: 5Y Breakeven (30%) + CPI YoY (25%) + PPI (20%) + CPI MoM Ann (15%) + Cap Utilization (10%).
                    {(latestData.inflationZScore ?? 0) >= 0 ? " Above trend indicates Overheat/Stagflation." : " Below trend indicates Reflation/Recovery."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Community Discussion */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <CommentSection
              contentSlug="investment-clock"
              title="Investment Clock Discussion"
            />
          </div>
        </div>

        {/* ── Sticky Sidebar Column ───────────────────────────────────────── */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 self-start">
          {/* Study Guide Card */}
          {relatedArticles.length > 0 && (
            <StudyGuideCard
              articles={relatedArticles}
              selectedSlug={selectedArticle?.slug}
              onSelect={setSelectedArticleSlug}
            />
          )}

          {/* Video Player */}
          {selectedArticle?.youtubeUrl && (
            <VideoCard
              youtubeUrl={selectedArticle.youtubeUrl}
              bilibiliUrl={selectedArticle.bilibiliUrl}
              title={selectedArticle.title}
              articleSlug={selectedArticle.slug}
            />
          )}

          {/* Deep Research Paper Preview */}
          {selectedArticle?.googleDoc && (
            <PaperCard
              googleDoc={selectedArticle.googleDoc}
              onExpand={() => setPaperOpen(true)}
            />
          )}

          {/* Wiki Term Card */}
          {wikiEntry && (
            <WikiCard
              entry={wikiEntry}
              onExpand={() => setWikiOpen(true)}
            />
          )}
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      {paperOpen && selectedArticle?.googleDoc && (
        <PaperModal
          googleDoc={selectedArticle.googleDoc}
          onClose={() => setPaperOpen(false)}
        />
      )}

      {wikiOpen && wikiEntry && (
        <WikiModal
          entry={wikiEntry}
          onClose={() => setWikiOpen(false)}
        />
      )}
    </div>
  );
}
