import { Landmark, Clock, DollarSign, RotateCcw, Waves, PiggyBank, LineChart } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function MacroAnalysisContent() {
  const config = getTopicConfig('macro-analysis');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Landmark}>
      <div className="space-y-8">
        {/* 1. Macro Regime Detection */}
        <SectionCard title="Macro Regime Detection" icon={Clock} tone="accent">
          <p>
            <strong>The Investment Clock Framework</strong> — Maps the economy onto two axes — growth (rising or falling) and
            inflation (rising or falling) — creating four quadrants, each historically favoring a different asset class:{" "}
            <strong>Reflation</strong> (rising growth, falling inflation) tends to favor equities; <strong>Overheat</strong>{" "}
            (rising growth, rising inflation) favors commodities; <strong>Stagflation</strong> (falling growth, rising
            inflation) favors cash; <strong>Reflation-to-Recovery</strong> transitions (falling growth, falling inflation)
            favor bonds. It's a framework for orientation, not a precise timing tool.
          </p>
          <p className="text-sm">
            See the live version:{" "}
            <Link href="/investment-clock" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Investment Clock</Link>
          </p>
        </SectionCard>

        {/* 2. Monetary Policy */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Monetary Policy" />
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-gray-900 dark:text-gray-100">Fed Policy Transmission</strong> — A rate hike raises the discount rate used to value future cash flows,
              which compresses equity valuations (especially long-duration growth stocks whose profits are furthest in the
              future) and pushes bond yields up while bond prices fall — the same mechanism, playing out across two asset
              classes at once.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-gray-100">Dollar Dynamics</strong> — Higher U.S. rates relative to other countries tend to strengthen the dollar (capital
              flows to the higher yield), which pressures emerging-market borrowers with dollar-denominated debt and
              squeezes U.S. multinationals' overseas earnings when translated back to dollars.
            </p>
          </div>
        </div>

        {/* 3. Market Cycle Theory */}
        <SectionCard title="Market Cycle Theory" icon={RotateCcw} tone="accent">
          <p>
            Howard Marks' central idea: markets oscillate between excessive optimism and excessive pessimism far more
            than the underlying fundamentals actually change — "where are we in the cycle" is a more useful question
            than "what's the news today," since sentiment extremes (not headlines) tend to mark the best and worst
            entry points in hindsight.
          </p>
        </SectionCard>

        {/* 4. Shocks & Regime Shifts */}
        <div className="space-y-3">
          <ChapterHeading number={4} title="Shocks & Regime Shifts" />
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-gray-900 dark:text-gray-100">Stagflation Fears</strong> — The worst quadrant for both stocks and bonds simultaneously — slowing growth
              removes the earnings case for equities while persistent inflation keeps the central bank from cutting rates
              to support them, leaving few traditional assets to hide in besides cash and select commodities.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-gray-100">Carry-Trade Unwinds</strong> — When investors borrow cheaply in a low-rate currency to fund higher-yielding
              assets elsewhere, a sudden rate move in the funding currency can force a rapid, correlated unwind across
              seemingly unrelated markets — a reminder that leverage embedded in currency markets can transmit shocks
              globally within days.
            </p>
          </div>
        </div>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={DollarSign} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <PiggyBank className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Wealth Planning</h4>
                <p>
                  For turning a macro regime view into concrete portfolio adjustments — see{" "}
                  <Link href="/stock/investment/wealth-planning" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Wealth Planning</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <LineChart className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Asset Allocation</h4>
                <p>
                  For the systematic, quant side of turning a macro view into portfolio weights — see{" "}
                  <Link href="/quant/quanttrading/asset-allocation" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Asset Allocation</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
