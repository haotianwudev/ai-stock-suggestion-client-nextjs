import { FileText, Clock, EyeOff, Vote, LineChart, Globe } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function ThirteenFAnalysisContent() {
  const config = getTopicConfig('13f-analysis');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={FileText}>
      <div className="space-y-8">
        {/* 1. Reading Form 13F */}
        <SectionCard title="Reading Form 13F" icon={FileText} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>What's Disclosed</h4>
              <p>
                Any institutional manager with over $100M in U.S. equity AUM must file Form 13F quarterly, disclosing
                every long U.S.-listed equity and options position above a small threshold — giving retail investors a
                genuine, if delayed, window into what the largest players actually own.
              </p>
            </div>
            <div>
              <h4>What's Omitted, and the Lag</h4>
              <p>
                13F reveals long positions only — short positions, most derivatives detail, non-U.S. holdings, and cash
                are invisible. Filings are also due 45 days after quarter-end, so by the time you read one, the position
                could already be a quarter-and-a-half stale; some funds have since exited what you're reading about.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 2. Coattail Investing */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Coattail Investing" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Reading Conviction, Not Just Holdings</strong> — The signal isn't the position itself — it's the{" "}
            <strong className="text-gray-900 dark:text-gray-100">change</strong> quarter-over-quarter. A brand-new
            position, or a significant increase to an existing one, reflects fresh conviction; a small trim can just be
            routine rebalancing or risk management, not a change of view. Given the reporting lag, coattailing works
            better as a source of research ideas to investigate independently than as a mechanical buy signal.
          </p>
        </div>

        {/* 3. Investor Philosophies */}
        <SectionCard title="Investor Philosophies" icon={Clock} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 not-prose">
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Druckenmiller</h5>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Highly concentrated, macro-driven conviction — willing to bet a large fraction of the portfolio on a
                single top-down thesis rather than diversify it away.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Burry</h5>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Deep, contrarian value research — willing to hold a position that looks wrong to the market for a long
                time, based on independently-verified fundamentals rather than sentiment.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Buffett</h5>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Durable competitive moats and long holding periods — position sizing scales with the size and durability
                of the advantage, not with short-term price momentum.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Munger</h5>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Multidisciplinary "mental models" thinking — cross-checking a thesis against psychology, economics, and
                other fields before sizing a position, to catch blind spots a single-lens analysis would miss.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Political Alpha */}
        <div className="space-y-3">
          <ChapterHeading number={4} title="Political Alpha" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Congressional Trading Disclosures</strong> — The STOCK Act requires members of Congress to disclose trades within 45 days —
            academic research on these filings has found average excess returns in some periods, plausibly linked to
            informational advantages from committee work, though results vary by study period and methodology and
            shouldn't be over-read as a reliable edge.
          </p>
        </div>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Vote} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <LineChart className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Stock Analysis</h4>
                <p>
                  A 13F idea is a starting point, not a conclusion — verify it with your own valuation work — see{" "}
                  <Link href="/stock/stock-analysis/stock-analysis" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Stock Analysis</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Globe className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Macro Analysis</h4>
                <p>
                  Understanding the macro backdrop a manager was trading into helps interpret why a position was taken —
                  see{" "}
                  <Link href="/stock/investment/macro-analysis" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Macro Analysis</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
