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
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base">AI Evaluation</CardTitle>
          <Badge className={`border ${phaseColor} font-semibold`}>
            {evaluation.finalPhase}
          </Badge>
          {evaluation.phaseDirection && (
            <Badge variant="outline" className="text-xs">
              {DIRECTION_LABELS[direction] ?? direction}
            </Badge>
          )}
          {evaluation.phaseConfidence !== undefined && (
            <span className="text-sm text-muted-foreground ml-auto">
              Confidence: <span className="font-semibold text-foreground">{confidence.toFixed(0)}%</span>
            </span>
          )}
        </div>
        {evaluation.phaseConfidence !== undefined && (
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-5">

        {/* Phase Transition Probabilities */}
        {hasProbs && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Phase Transition Probabilities
            </p>
            <div className="space-y-2">
              {evaluation.phaseProbabilities!.map(({ phase, probability }) => (
                <div key={phase} className="flex items-center gap-3">
                  <span className="text-xs w-24 shrink-0 text-muted-foreground">{phase}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${PHASE_BAR_COLORS[phase] ?? "bg-primary"}`}
                      style={{ width: `${probability}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold w-8 text-right">{probability}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {evaluation.reasoning && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
              Reasoning
            </p>
            <BulletOrParagraph text={evaluation.reasoning} bulletColor="text-primary" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {evaluation.keyIndicators && evaluation.keyIndicators.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                Key Indicators
              </p>
              <ul className="space-y-1">
                {evaluation.keyIndicators.map((indicator, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-green-500 shrink-0">▲</span>
                    <span>{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.risks && evaluation.risks.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                Risks to Watch
              </p>
              <ul className="space-y-1">
                {evaluation.risks.map((risk, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-red-500 shrink-0">▼</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {evaluation.outlook && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
              3–6 Month Outlook
            </p>
            <BulletOrParagraph
              text={evaluation.outlook}
              bulletColor="text-muted-foreground"
              className="text-sm text-muted-foreground"
            />
          </div>
        )}

        {/* Monitoring Triggers */}
        {hasTriggers && (
          <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              Monitor for Phase Transition
            </p>
            <div className="space-y-2">
              {evaluation.monitoringTriggers!.map(({ indicator, threshold, meaning }, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="shrink-0">
                    <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border">
                      {threshold}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">{indicator}</span>
                    <span className="text-muted-foreground"> — {meaning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {evaluation.geminiResearchSummary && (
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              Gemini Research Summary
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">{evaluation.geminiResearchSummary}</p>
          </div>
        )}

        <p className="text-[11px] text-muted-foreground/60 pt-1">
          Last evaluated: {evaluation.bizDate}
        </p>
      </CardContent>
    </Card>
  );
}
