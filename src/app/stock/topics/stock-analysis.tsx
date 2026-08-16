import { LineChart, Calculator, Users, Activity, Eye, FileText, Globe } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function StockAnalysisContent() {
  const config = getTopicConfig('stock-analysis');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={LineChart}>
      <div className="space-y-8">
        {/* 1. Valuation Frameworks */}
        <SectionCard title="Valuation Frameworks" icon={Calculator} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>DCF (Discounted Cash Flow)</h4>
              <p>
                Projects a company&apos;s future free cash flows and discounts them back to today&apos;s value using a
                required rate of return — the most theoretically &quot;correct&quot; method, but also the most
                sensitive to assumptions (growth rate, discount rate, terminal value), which is why two analysts can
                run a DCF on the same company and land on wildly different numbers.
              </p>
            </div>
            <div>
              <h4>EV/EBITDA &amp; Comparable Multiples</h4>
              <p>
                Instead of forecasting the future, multiples ask &quot;what is a similar company trading at right
                now?&quot; — EV/EBITDA is popular because it&apos;s capital-structure-neutral (ignores debt vs. equity
                financing choices), while P/E is simpler but distorted by one-time items and differing tax rates
                across companies.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 2. Analyst Consensus */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Analyst Consensus" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Reading Target Prices Critically</strong> — Sell-side analysts often work at banks with investment-banking relationships to
            the companies they cover, which structurally skews ratings toward &quot;buy&quot; — genuine sell ratings
            are rare. The <strong className="text-gray-900 dark:text-gray-100">dispersion</strong> of estimates (how far apart analysts&apos; price targets
            are) is often a more useful signal than the average itself: tight consensus suggests a well-understood
            story, wide dispersion suggests real uncertainty the average target price is quietly papering over.
          </p>
        </div>

        {/* 3. Technical & Insider Signals */}
        <SectionCard title="Technical & Insider Signals" icon={Activity} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Trend vs. Momentum, Support Levels</h4>
              <p>
                A trend describes price direction over time; momentum describes the speed/strength of that move — a
                stock can be in an uptrend while momentum is decelerating, often an early warning sign.
                Support/resistance levels are prior price areas where buying/selling pressure previously reversed a
                move, useful as risk-management markers even if you&apos;re not a pure technical trader.
              </p>
            </div>
            <div>
              <h4>What Insider Trading Actually Predicts</h4>
              <p>
                Insider <strong>buying</strong> is a relatively strong signal — executives have countless ways to
                reduce risk, so voluntarily putting personal cash in is meaningful. Insider <strong>selling</strong>{" "}
                is far weaker evidence — it&apos;s routinely just diversification, tax planning, or a pre-scheduled
                10b5-1 plan, not a vote against the company.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Case Studies */}
        <div className="space-y-3">
          <ChapterHeading number={4} title="Case Studies" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These frameworks apply differently depending on the company: <strong className="text-gray-900 dark:text-gray-100">NVIDIA</strong> tests DCF
            assumptions under hyper-growth uncertainty, <strong className="text-gray-900 dark:text-gray-100">Tesla</strong> highlights the gap between
            narrative-driven valuation and traditional multiples, and <strong className="text-gray-900 dark:text-gray-100">Figma</strong> shows how to value a
            newly-public, high-growth SaaS business with limited historical data. Explore each case study on the site
            for the full walkthrough.
          </p>
        </div>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Eye} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <FileText className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>13F Analysis</h4>
                <p>
                  Cross-check your own valuation work against what institutional investors are actually buying — see{" "}
                  <Link href="/stock/stock-analysis/13f-analysis" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">13F Analysis</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Globe className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Macro Analysis</h4>
                <p>
                  A company-level valuation is incomplete without the macro backdrop — discount rates, sector
                  rotation, and the economic cycle all move the &quot;right&quot; multiple — see{" "}
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
