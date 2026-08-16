import { RotateCcw, Compass, Shield, Zap, ArrowRight, ListChecks } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { ComparisonGrid, ComparisonCard } from "@/components/articles/article-visuals";
import { getTopicConfig } from "./config";

const DECISION_ROWS = [
  { scenario: "Price moves against, strike breached", thesis: "Intact", thesisTone: "pos", action: "Defensive Roll (Credit)", actionTone: "accent" },
  { scenario: "Price moves against, thesis broken", thesis: "Broken", thesisTone: "neg", action: "Close Position", actionTone: "neg" },
  { scenario: "Captured 80%+ profit", thesis: "Intact", thesisTone: "pos", action: "Offensive Roll", actionTone: "pos" },
  { scenario: "Max loss reached (2-3x credit)", thesis: "Any", thesisTone: "neutral", action: "Close Position", actionTone: "neg" },
] as const;

const badgeClass = {
  pos: "bg-[#1D8A70]/10 text-[#1D8A70] dark:bg-[#3CBF9C]/10 dark:text-[#3CBF9C]",
  neg: "bg-[#BC4128]/10 text-[#BC4128] dark:bg-[#E2694A]/10 dark:text-[#E2694A]",
  accent: "bg-[#A8672E]/10 text-[#A8672E] dark:bg-[#D08F52]/10 dark:text-[#D08F52]",
  neutral: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
} as const;

export function RollContent() {
  const config = getTopicConfig('roll');

  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={RotateCcw}>
      <div className="space-y-8">
        {/* 1. Types of Rolling */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Types of Rolling" />
          <ComparisonGrid>
            <ComparisonCard title="Defensive Rolling" tone="neg" items={[
              "Managing challenged positions when price moves against you",
              "Roll down & out (puts) or up & out (calls)",
              "Must collect net credit",
              "Triggered by Delta: -0.35 to -0.50",
            ]} />
            <ComparisonCard title="Offensive Rolling" tone="pos" items={[
              "Optimizing profitable positions for better capital efficiency",
              "Roll up & out (puts) or down & out (calls)",
              "Capture 80-90% of max profit first",
              "Redeploy capital at better strikes",
            ]} />
          </ComparisonGrid>
        </div>

        {/* 2. Universal Principles */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Universal Principles" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Thesis Check">Only roll if your original thesis remains valid. If broken, close the trade.</StatTile>
            <StatTile title="Net Credit Rule" tone="neg">Defensive rolls MUST collect net credit to lower breakeven point.</StatTile>
            <StatTile title="Volatility Aware">Roll when IV Rank &gt; 50. High volatility inflates premium collection.</StatTile>
            <StatTile title="DTE Management">Manage positions at ≤ 21 DTE to avoid gamma risk near expiration.</StatTile>
          </div>
        </div>

        {/* 3. Decision Framework */}
        <SectionCard title="Decision Framework" icon={ListChecks} tone="accent">
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-2 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Scenario</th>
                  <th className="px-2 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Thesis</th>
                  <th className="px-2 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {DECISION_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td className="px-2 py-2 text-gray-700 dark:text-gray-300">{row.scenario}</td>
                    <td className="px-2 py-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass[row.thesisTone]}`}>{row.thesis}</span>
                    </td>
                    <td className="px-2 py-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass[row.actionTone]}`}>{row.action}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* 4. Greeks as Decision Triggers */}
        <div className="space-y-3">
          <ChapterHeading number={4} title="Greeks as Decision Triggers" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Delta Triggers">
              Use delta as objective probability proxy for management decisions. Short put: delta reaches -0.35 to
              -0.50. Short call: delta reaches +0.35 to +0.50. Avoid emotional price-based decisions.
            </StatTile>
            <StatTile title="Vega Considerations">
              Rolling is most favorable in high volatility environments. Prefer IV Rank &gt; 50 for rolling — high IV
              inflates premium collection. Avoid rolling in low volatility.
            </StatTile>
          </div>
        </div>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>The Greeks</h4>
                <p>
                  Delta and Vega drive every rolling decision above — for the underlying definitions, see{" "}
                  <Link href="/option/topics/greeks" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Greeks <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Zap className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Volatility Risk Premium</h4>
                <p>
                  Rolling for credit is a way of continuing to harvest VRP on a challenged position rather than exiting — see{" "}
                  <Link href="/option/topics/vrp" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    VRP <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Shield className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Options 101</h4>
                <p>
                  New to options? Build the fundamentals before managing challenged positions — see{" "}
                  <Link href="/option/topics/option101" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Options 101 <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
