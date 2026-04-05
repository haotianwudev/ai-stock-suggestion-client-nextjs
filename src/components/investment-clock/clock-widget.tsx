"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_INVESTMENT_CLOCK } from "@/lib/graphql/queries";
import { InvestmentClockResult } from "@/lib/graphql/types";
import { ClockFace } from "./clock-face";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const PHASE_STYLES: Record<string, { border: string; bg: string; text: string; bar: string }> = {
  Recovery:    { border: "border-green-500/30",  bg: "bg-green-500/5",  text: "text-green-500",  bar: "bg-green-500"  },
  Overheat:    { border: "border-red-500/30",    bg: "bg-red-500/5",    text: "text-red-500",    bar: "bg-red-500"    },
  Stagflation: { border: "border-yellow-500/30", bg: "bg-yellow-500/5", text: "text-yellow-500", bar: "bg-yellow-500" },
  Reflation:   { border: "border-blue-500/30",   bg: "bg-blue-500/5",   text: "text-blue-500",   bar: "bg-blue-500"   },
};

const DIRECTION_LABELS: Record<string, string> = {
  clockwise:        "Clockwise ↻",
  counterclockwise: "Counter-clockwise ↺",
  stable:           "Stalling ◆",
};

export function InvestmentClockWidget() {
  const { data, loading } = useQuery<{ investmentClock: InvestmentClockResult }>(
    GET_INVESTMENT_CLOCK,
    { fetchPolicy: "cache-and-network" }
  );

  const clock      = data?.investmentClock;
  const evaluation = clock?.current;
  const latestData = clock?.latestData;

  const phase      = evaluation?.finalPhase ?? latestData?.dataPhase ?? "Recovery";
  const clockAngle = latestData?.clockAngle ?? 45;
  const styles     = PHASE_STYLES[phase] ?? PHASE_STYLES.Recovery;
  const confidence = evaluation?.phaseConfidence;
  const direction  = evaluation?.phaseDirection;

  if (loading && !data) {
    return <div className="animate-pulse rounded-xl border border-border bg-card h-40" />;
  }

  return (
    <Link href="/investment-clock" className="block group">
      <div className={`rounded-xl border-2 ${styles.border} ${styles.bg} px-3 py-2 sm:px-4 sm:py-2 transition-all hover:shadow-lg hover:scale-[1.01]`}>
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Clock — fixed width, never wraps */}
          <div className="shrink-0">
            <ClockFace clockAngle={clockAngle} phase={phase} size={270} />
          </div>

          {/* Right panel — takes remaining width */}
          <div className="flex-1 min-w-0 flex flex-col gap-1.5">

            {/* Title row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Macro Clock
                </span>
                <Badge className={`border ${styles.border} ${styles.bg} ${styles.text} font-bold text-xs px-2 py-0`}>
                  {phase}
                </Badge>
                {direction && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">
                    {DIRECTION_LABELS[direction] ?? direction}
                  </Badge>
                )}
              </div>
              <span className={`shrink-0 text-[11px] font-medium flex items-center gap-0.5 ${styles.text} group-hover:gap-1.5 transition-all`}>
                Full analysis <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            {/* Confidence bar */}
            {confidence !== undefined && (
              <div className="space-y-0.5">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Confidence</span>
                  <span className="font-semibold text-foreground">{confidence.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${styles.bar}`} style={{ width: `${confidence}%` }} />
                </div>
              </div>
            )}

            {/* Phase probabilities */}
            {evaluation?.phaseProbabilities && evaluation.phaseProbabilities.length > 0 && (
              <div className="space-y-1">
                {evaluation.phaseProbabilities.map(({ phase: p, probability }) => (
                  <div key={p} className="flex items-center gap-1.5">
                    <span className="text-[10px] w-20 shrink-0 text-muted-foreground truncate">{p}</span>
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${PHASE_STYLES[p]?.bar ?? "bg-primary"}`}
                        style={{ width: `${probability}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-semibold w-6 text-right shrink-0 ${PHASE_STYLES[p]?.text ?? ""}`}>
                      {probability}%
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer: best asset + date */}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
              {evaluation?.bestAsset && (
                <span>Asset: <span className={`font-semibold ${styles.text}`}>{evaluation.bestAsset}</span></span>
              )}
              {latestData?.bizDate && (
                <span className="hidden sm:inline">As of {latestData.bizDate}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
