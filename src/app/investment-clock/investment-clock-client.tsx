"use client";

import { useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_INVESTMENT_CLOCK } from "@/lib/graphql/queries";
import { InvestmentClockResult } from "@/lib/graphql/types";
import { ClockFace } from "@/components/investment-clock/clock-face";
import { TracerDiagram } from "@/components/investment-clock/tracer-diagram";
import { AssetAllocationCards } from "@/components/investment-clock/asset-allocation-cards";
import { LlmEvaluationPanel } from "@/components/investment-clock/llm-evaluation-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/articles/article-card";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { articles } from "@/data/articles";

const RELATED_ARTICLE_SLUGS = [
  "investment-clock-framework-quantitative-macro-regime-detection",
  "navigating-bull-to-bear-regime-shift-quantitative-signals",
];

const PHASE_COLORS: Record<string, string> = {
  Recovery:    "bg-green-500/10 text-green-600 border-green-500/30",
  Overheat:    "bg-red-500/10 text-red-600 border-red-500/30",
  Stagflation: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  Reflation:   "bg-blue-500/10 text-blue-600 border-blue-500/30",
};

const ROLE_STYLE: Record<string, string> = {
  "Growth 40%":    "bg-green-500/10 text-green-700 border-green-500/20",
  "Growth 35%":    "bg-green-500/10 text-green-700 border-green-500/20",
  "Growth 25%":    "bg-green-500/10 text-green-700 border-green-500/20",
  "Inflation 70%": "bg-orange-500/10 text-orange-700 border-orange-500/20",
  "Inflation 30%": "bg-orange-500/10 text-orange-700 border-orange-500/20",
};

function RawIndicator({
  label, value, unit = "", decimals = 2, yoy, yoySuffix = "% YoY", description, role, invertSignal,
}: {
  label: string; value?: number | null; unit?: string; decimals?: number;
  yoy?: number | null; yoySuffix?: string; description?: string; role?: string; invertSignal?: boolean;
}) {
  const display = value !== undefined && value !== null ? `${value.toFixed(decimals)}${unit}` : "—";
  const yoyDisplay = yoy !== undefined && yoy !== null
    ? `${yoy >= 0 ? "+" : ""}${yoy.toFixed(1)}${yoySuffix}`
    : null;
  const yoyPositive = invertSignal ? (yoy ?? 0) <= 0 : (yoy ?? 0) >= 0;
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-muted-foreground">{label}</span>
        {role && (
          <span className={`text-[9px] font-semibold px-1 py-0 rounded border ${ROLE_STYLE[role] ?? "bg-muted text-muted-foreground border-border"}`}>
            {role}
          </span>
        )}
      </div>
      <span className="text-sm font-semibold">{display}</span>
      {yoyDisplay && (
        <span className={`text-[11px] font-medium ${yoyPositive ? "text-green-500" : "text-red-400"}`}>
          {yoyDisplay}
        </span>
      )}
      {description && (
        <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">{description}</span>
      )}
    </div>
  );
}

export function InvestmentClockClient() {
  const { data, loading } = useQuery<{ investmentClock: InvestmentClockResult }>(
    GET_INVESTMENT_CLOCK,
    { fetchPolicy: "cache-and-network" }
  );

  const [tracerHovered, setTracerHovered] = useState<number | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  if (loading && !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-80 bg-muted rounded-lg" />
          <div className="h-80 bg-muted rounded-lg" />
        </div>
        <div className="h-48 bg-muted rounded-lg" />
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-36 bg-muted rounded-lg" />)}
        </div>
      </div>
    );
  }

  const clock = data?.investmentClock;
  const latestData = clock?.latestData;
  const evaluation = clock?.current;
  const history = clock?.history ?? [];

  const displayPhase = evaluation?.finalPhase ?? latestData?.dataPhase ?? "Recovery";
  const clockAngle = latestData?.clockAngle ?? 45;
  const phaseColor = PHASE_COLORS[displayPhase] ?? "";

  // When a dot is hovered in the diagram, scroll the matching row into view
  const handleDotHover = (i: number | null) => {
    setTracerHovered(i);
    if (i == null) return;
    // history is oldest-first; table shows newest-first, so table row index = (history.length - 1 - i)
    const tableRowIdx = history.length - 1 - i;
    rowRefs.current[tableRowIdx]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Investment Clock</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Merrill Lynch macroeconomic cycle tracker
          </p>
        </div>
        <Badge className={`ml-auto border text-sm px-3 py-1 font-semibold ${phaseColor}`}>
          {displayPhase}
        </Badge>
        {(evaluation?.bizDate ?? latestData?.bizDate) && (
          <span className="text-xs text-muted-foreground">{evaluation?.bizDate ?? latestData?.bizDate}</span>
        )}
      </div>

      {/* Clock + Tracer */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-sm text-muted-foreground font-medium">Clock Position</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex items-center justify-center">
            <ClockFace clockAngle={clockAngle} phase={displayPhase} size={480} />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              24-Month Tracer
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3 flex flex-col gap-3">
            {history.length > 0 ? (
              <>
                <TracerDiagram
                  history={history}
                  hoveredIndex={tracerHovered}
                  onHoverIndex={handleDotHover}
                />
                {/* Interactive table */}
                <div
                  ref={tableRef}
                  className="max-h-44 overflow-y-auto rounded-md border border-border text-xs"
                >
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
                      <tr>
                        <th className="text-left px-2 py-1.5 font-semibold text-muted-foreground">Date</th>
                        <th className="text-left px-2 py-1.5 font-semibold text-muted-foreground">Phase</th>
                        <th className="text-right px-2 py-1.5 font-semibold text-muted-foreground">Growth Z</th>
                        <th className="text-right px-2 py-1.5 font-semibold text-muted-foreground">Inflation Z</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...history].reverse().map((d, tableIdx) => {
                        const histIdx = history.length - 1 - tableIdx;
                        const isLatest = histIdx === history.length - 1;
                        const isHovered = tracerHovered === histIdx;
                        const phaseTextColor =
                          d.dataPhase === "Recovery"    ? "text-green-600"  :
                          d.dataPhase === "Overheat"    ? "text-red-600"    :
                          d.dataPhase === "Stagflation" ? "text-yellow-600" :
                          "text-blue-600";
                        return (
                          <tr
                            key={d.bizDate}
                            ref={(el) => { rowRefs.current[tableIdx] = el; }}
                            className={`border-t border-border transition-colors cursor-default
                              ${isHovered ? "bg-accent" : isLatest ? "bg-muted/40" : "hover:bg-muted/30"}`}
                            onMouseEnter={() => setTracerHovered(histIdx)}
                            onMouseLeave={() => setTracerHovered(null)}
                          >
                            <td className="px-2 py-1 font-mono">
                              {d.bizDate.slice(0, 7)}
                              {isLatest && <span className="ml-1 text-[10px] font-bold text-foreground">NOW</span>}
                            </td>
                            <td className={`px-2 py-1 font-semibold ${phaseTextColor}`}>{d.dataPhase}</td>
                            <td className={`px-2 py-1 text-right font-mono ${d.growthZScore >= 0 ? "text-green-600" : "text-red-500"}`}>
                              {d.growthZScore >= 0 ? "+" : ""}{d.growthZScore.toFixed(3)}
                            </td>
                            <td className={`px-2 py-1 text-right font-mono ${d.inflationZScore >= 0 ? "text-orange-500" : "text-blue-500"}`}>
                              {d.inflationZScore >= 0 ? "+" : ""}{d.inflationZScore.toFixed(3)}
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
                No historical data yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* LLM Evaluation */}
      {evaluation ? (
        <LlmEvaluationPanel evaluation={evaluation} />
      ) : (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-sm text-muted-foreground">
              No AI evaluation yet. Run <code className="font-mono text-xs">/investment-clock-prompt</code>, complete Gemini research, then run{" "}
              <code className="font-mono text-xs">/investment-clock-analyze &lt;path&gt;</code>.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Asset Allocation */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Asset Allocation by Phase
        </h2>
        <AssetAllocationCards
          phase={displayPhase}
          bestAsset={evaluation?.bestAsset}
          recommendedSectors={evaluation?.recommendedSectors}
          sectorRationale={evaluation?.sectorRationale}
        />
      </div>

      {/* Raw Indicators */}
      {latestData && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Raw FRED Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Growth signals */}
            <p className="text-[10px] font-semibold uppercase tracking-wide text-green-600 mb-1">Growth Signals</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
              <RawIndicator
                label="OECD CLI" value={latestData.cliValue} decimals={1}
                yoy={latestData.cliYoyChange} yoySuffix=" pts YoY"
                role="Growth 50%" description="Composite Leading Indicator. >100 = expansion; <100 = contraction. Leads GDP by 3-6 months." />
              <RawIndicator
                label="Ind. Production" value={latestData.indproValue} decimals={2} yoy={latestData.indproYoyPct}
                role="Growth 20%" description="Factory & utility output. Coincident indicator of real economic activity." />
              <RawIndicator
                label="Jobless Claims" value={latestData.icsaValue != null ? latestData.icsaValue / 1000 : undefined} unit="k" decimals={0}
                yoy={latestData.icsaYoyPct} invertSignal
                role="Growth 15%" description="Weekly initial claims (monthly avg). Rising = labor market weakening." />
              <RawIndicator
                label="Unemployment" value={latestData.unrateValue} unit="%" decimals={1}
                yoy={latestData.unrateYoyChange} yoySuffix=" pp YoY" invertSignal
                role="Growth 15%" description="Lagging labor confirmation. Rising = growth slowdown confirmed." />
            </div>

            {/* Inflation signals */}
            <p className="text-[10px] font-semibold uppercase tracking-wide text-orange-600 mt-3 mb-1">Inflation Signals</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
              <RawIndicator
                label="5Y Breakeven" value={latestData.t5yieValue} unit="%" decimals={2}
                role="Inflation 30%" description="Market's 5-year inflation expectation (TIPS spread). >2% = above Fed target." />
              <RawIndicator
                label="CPI YoY" value={latestData.cpiYoy} unit="%" decimals={2}
                role="Inflation 25%" description="Core CPI 12-month rate vs 2% target. Lagging trend confirmer." />
              <RawIndicator
                label="PPI Final Demand" value={latestData.ppiYoy} unit="%" decimals={2}
                role="Inflation 20%" description="Producer prices YoY. Leads CPI by 2-6 months — pipeline pressure." />
              <RawIndicator
                label="CPI MoM Ann." value={latestData.cpiMomAnn} unit="%" decimals={2}
                role="Inflation 15%" description="Annualized monthly CPI rate vs 2% target. Most responsive to inflection." />
              <RawIndicator
                label="Cap. Utilization" value={latestData.tcuValue} unit="%" decimals={1}
                role="Inflation 10%" description="% of industrial capacity in use. >80% signals pricing pressure building." />
              <RawIndicator
                label="Real GDP" value={latestData.gdpValue} unit="B$" decimals={0} yoy={latestData.gdpYoyPct}
                description="Inflation-adj. US output. Reference indicator (not in composite)." />
            </div>

            {/* Z-Score panel */}
            <div className="border-t pt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Growth Z-Score</span>
                  <span className={`text-base font-bold ${(latestData.growthZScore ?? 0) >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {latestData.growthZScore !== undefined ? `${latestData.growthZScore >= 0 ? "+" : ""}${latestData.growthZScore.toFixed(3)}` : "—"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                  Weighted composite: CLI (50%) + INDPRO (20%) + inv. Jobless Claims (15%) + inv. Unemployment (15%).
                  Exponential rolling Z-score (span=24). <span className="font-medium">{(latestData.growthZScore ?? 0) >= 0 ? "Above trend → Recovery / Overheat signal." : "Below trend → Reflation / Stagflation signal."}</span>
                </p>
              </div>
              <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 px-3 py-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Inflation Z-Score</span>
                  <span className={`text-base font-bold ${(latestData.inflationZScore ?? 0) >= 0 ? "text-orange-500" : "text-blue-500"}`}>
                    {latestData.inflationZScore !== undefined ? `${latestData.inflationZScore >= 0 ? "+" : ""}${latestData.inflationZScore.toFixed(3)}` : "—"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                  Weighted composite: CPI YoY (40%) + CPI MoM annualized (30%) + Cap. Utilization (30%).
                  Exponential rolling Z-score (span=24). <span className="font-medium">{(latestData.inflationZScore ?? 0) >= 0 ? "Above trend → Overheat / Stagflation signal." : "Below trend → Reflation / Recovery signal."}</span>
                </p>
              </div>
            </div>

            {/* Methodology note */}
            <p className="text-[11px] text-muted-foreground border-t pt-3 leading-relaxed">
              <span className="font-medium">Methodology:</span> Each FRED series is normalized using an exponential-weighted rolling Z-score (span=24 months). Growth axis blends OECD CLI (leading), Industrial Production (coincident), and inverted Jobless Claims + Unemployment (lagging). Inflation axis blends CPI YoY (lagging), CPI MoM annualized (real-time), and Capacity Utilization (leading pressure). The composite scores determine the Investment Clock quadrant and hand position.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Video Tutorial */}
      <VideoTutorial
        videoId="ns0nlaE74Ac"
        title="Mastering the Investment Clock: What is the time now?"
        description="Learn how to map the economic cycle using Growth and Inflation signals to identify the four phases: Reflation, Recovery, Overheat, and Stagflation — and what assets to hold in each."
      />

      <VideoTutorial
        videoId="Zzi1cuaPs7M"
        title="A Quantitative Guide to Calculate The Investment Clock"
        description="A quantitative walkthrough for calculating the Investment Clock — using FRED data to derive Growth and Inflation Z-scores that pinpoint the current macro regime phase for optimal asset allocation."
      />

      {/* Related Articles */}
      {(() => {
        const relatedArticles = articles.filter(a =>
          RELATED_ARTICLE_SLUGS.includes(a.slug || "")
        );
        if (relatedArticles.length === 0) return null;
        return (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Related Articles
            </h2>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {relatedArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  description={article.description}
                  slug={article.slug || ""}
                  date={article.date}
                  imageUrl={article.imageUrl}
                  youtubeUrl={article.youtubeUrl}
                  isVideo={article.isVideo}
                  deepResearch={article.deepResearch}
                  websiteUrl={article.websiteUrl}
                />
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
