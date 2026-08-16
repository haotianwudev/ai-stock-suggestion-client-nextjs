import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestmentClockEvaluation } from "@/lib/graphql/types";

interface LlmEvaluationPanelProps {
  evaluation: InvestmentClockEvaluation;
}

const PHASE_COLORS: Record<string, string> = {
  Recovery:    "bg-green-500/10 text-green-600 border-green-500/30",
  Overheat:    "bg-red-500/10 text-red-600 border-red-500/30",
  Stagflation: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  Reflation:   "bg-blue-500/10 text-blue-600 border-blue-500/30",
};

const PHASE_BAR_COLORS: Record<string, string> = {
  Recovery:    "bg-green-500",
  Overheat:    "bg-red-500",
  Stagflation: "bg-yellow-500",
  Reflation:   "bg-blue-500",
};

const DIRECTION_LABELS: Record<string, string> = {
  clockwise:        "Clockwise ↻",
  counterclockwise: "Counter-clockwise ↺",
  stable:           "Stable ◆",
};

// Renders bullet-per-line text (•-prefixed, \n-separated) as a <ul>,
// falls back to a plain <p> for legacy single-paragraph strings.
function BulletOrParagraph({
  text,
  bulletColor = "text-muted-foreground",
  className = "text-sm",
}: {
  text: string;
  bulletColor?: string;
  className?: string;
}) {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^[•\-*]\s*/, "").trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return <p className={`${className} leading-relaxed`}>{text}</p>;
  }
  return (
    <ul className="space-y-1.5">
      {lines.map((line, i) => (
        <li key={i} className={`${className} flex gap-2`}>
          <span className={`shrink-0 mt-0.5 ${bulletColor}`}>•</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

export function LlmEvaluationPanel({ evaluation }: LlmEvaluationPanelProps) {
  const phaseColor = PHASE_COLORS[evaluation.finalPhase] ?? "bg-muted text-foreground border-border";
  const confidence = evaluation.phaseConfidence ?? 0;
  const direction = evaluation.phaseDirection ?? "stable";

  const hasProbs = evaluation.phaseProbabilities && evaluation.phaseProbabilities.length > 0;
  const hasTriggers = evaluation.monitoringTriggers && evaluation.monitoringTriggers.length > 0;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6 space-y-6">
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-100">AI Macro Regime Evaluation</h3>
          <Badge className={`border ${phaseColor} font-semibold`}>
            {evaluation.finalPhase}
          </Badge>
          {evaluation.phaseDirection && (
            <Badge variant="outline" className="text-xs">
              {DIRECTION_LABELS[direction] ?? direction}
            </Badge>
          )}
          {evaluation.phaseConfidence !== undefined && (
            <span className="text-xs text-muted-foreground ml-auto">
              Confidence: <span className="font-bold text-foreground font-mono">{confidence.toFixed(0)}%</span>
            </span>
          )}
        </div>
        {evaluation.phaseConfidence !== undefined && (
          <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#A8672E] dark:bg-[#D08F52] transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Phase Transition Probabilities */}
        {hasProbs && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Phase Transition Probabilities
            </p>
            <div className="space-y-2.5">
              {evaluation.phaseProbabilities!.map(({ phase, probability }) => (
                <div key={phase} className="flex items-center gap-3">
                  <span className="text-xs w-24 shrink-0 font-medium text-gray-700 dark:text-gray-300">{phase}</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${PHASE_BAR_COLORS[phase] ?? "bg-primary"}`}
                      style={{ width: `${probability}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold w-10 text-right">{probability}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {evaluation.reasoning && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Macro Reasoning
            </p>
            <BulletOrParagraph text={evaluation.reasoning} bulletColor="text-[#A8672E] dark:text-[#D08F52]" className="text-sm text-gray-800 dark:text-gray-200" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {evaluation.keyIndicators && evaluation.keyIndicators.length > 0 && (
            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-400 mb-2">
                Key Growth & Inflation Drivers
              </p>
              <ul className="space-y-1.5">
                {evaluation.keyIndicators.map((indicator, i) => (
                  <li key={i} className="text-xs sm:text-sm flex gap-2 text-gray-800 dark:text-gray-200">
                    <span className="text-green-600 dark:text-green-400 shrink-0 font-bold">▲</span>
                    <span>{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.risks && evaluation.risks.length > 0 && (
            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-700 dark:text-red-400 mb-2">
                Risks & Inflection Watches
              </p>
              <ul className="space-y-1.5">
                {evaluation.risks.map((risk, i) => (
                  <li key={i} className="text-xs sm:text-sm flex gap-2 text-gray-800 dark:text-gray-200">
                    <span className="text-red-600 dark:text-red-400 shrink-0 font-bold">▼</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {evaluation.outlook && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              3–6 Month Regime Outlook
            </p>
            <BulletOrParagraph
              text={evaluation.outlook}
              bulletColor="text-muted-foreground"
              className="text-sm text-muted-foreground leading-relaxed"
            />
          </div>
        )}

        {/* Monitoring Triggers */}
        {hasTriggers && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
              Monitor for Phase Transition
            </p>
            <div className="space-y-2.5">
              {evaluation.monitoringTriggers!.map(({ indicator, threshold, meaning }, i) => (
                <div key={i} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3 text-xs sm:text-sm">
                  <div className="shrink-0">
                    <span className="font-mono text-xs bg-white dark:bg-gray-900 px-2 py-0.5 rounded border border-amber-500/30 text-amber-900 dark:text-amber-200 whitespace-normal break-words font-semibold">
                      {threshold}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{indicator}</span>
                    <span className="text-muted-foreground"> — {meaning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {evaluation.geminiResearchSummary && (
          <div className="rounded-xl bg-gray-50 dark:bg-gray-950 p-4 border border-gray-100 dark:border-gray-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
              Gemini Deep Research Synthesis
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">{evaluation.geminiResearchSummary}</p>
          </div>
        )}

        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[11px] text-muted-foreground/70">
          <span>Source: Gemini Deep Research + FRED Quantitative Pipeline</span>
          <span>Last evaluated: <span className="font-mono">{evaluation.bizDate}</span></span>
        </div>
      </div>
    </div>
  );
}
