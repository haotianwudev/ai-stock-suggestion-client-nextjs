'use client';

import { LineChart, Calculator, Users, Activity, Eye, FileText, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-sky-900">{title}</h3>
    </div>
  );
}

export function StockAnalysisContent() {
  // Get configuration for stock analysis
  const config = getTopicConfig('stock-analysis');

  const heroColorScheme = {
    border: "border-sky-200",
    background: "bg-gradient-to-br from-sky-50 to-blue-50",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    titleColor: "text-sky-900",
    descriptionColor: "text-sky-700",
    cardBg: "bg-white",
    cardBorder: "border border-sky-100",
    cardText: "text-sky-900",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-800",
    sectionTitle: "text-sky-900"
  };

  const contentSections = (
    <>
      {/* 1. Valuation Frameworks */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Valuation Frameworks" colorClass="bg-sky-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Calculator className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sky-900 text-sm md:text-base">DCF (Discounted Cash Flow)</h4>
              <p className="text-xs md:text-sm text-sky-700 leading-relaxed mt-1">
                Projects a company's future free cash flows and discounts them back to today's value using a required
                rate of return — the most theoretically "correct" method, but also the most sensitive to assumptions
                (growth rate, discount rate, terminal value), which is why two analysts can run a DCF on the same company
                and land on wildly different numbers.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <FileText className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sky-900 text-sm md:text-base">EV/EBITDA &amp; Comparable Multiples</h4>
              <p className="text-xs md:text-sm text-sky-700 leading-relaxed mt-1">
                Instead of forecasting the future, multiples ask "what is a similar company trading at right now?" —
                EV/EBITDA is popular because it's capital-structure-neutral (ignores debt vs. equity financing choices),
                while P/E is simpler but distorted by one-time items and differing tax rates across companies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Analyst Consensus */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Analyst Consensus" colorClass="bg-sky-600" />
        <Card className="border-sky-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-sky-600 flex-shrink-0" /> Reading Target Prices Critically
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-sky-700 leading-relaxed">
              Sell-side analysts often work at banks with investment-banking relationships to the companies they cover,
              which structurally skews ratings toward "buy" — genuine sell ratings are rare. The <strong>dispersion</strong>{" "}
              of estimates (how far apart analysts' price targets are) is often a more useful signal than the average
              itself: tight consensus suggests a well-understood story, wide dispersion suggests real uncertainty the
              average target price is quietly papering over.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Technical & Insider Signals */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Technical &amp; Insider Signals" colorClass="bg-sky-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Activity className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sky-900 text-sm md:text-base">Trend vs. Momentum, Support Levels</h4>
              <p className="text-xs md:text-sm text-sky-700 leading-relaxed mt-1">
                A trend describes price direction over time; momentum describes the speed/strength of that move —
                a stock can be in an uptrend while momentum is decelerating, often an early warning sign. Support/
                resistance levels are prior price areas where buying/selling pressure previously reversed a move, useful
                as risk-management markers even if you're not a pure technical trader.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Eye className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sky-900 text-sm md:text-base">What Insider Trading Actually Predicts</h4>
              <p className="text-xs md:text-sm text-sky-700 leading-relaxed mt-1">
                Insider <strong>buying</strong> is a relatively strong signal — executives have countless ways to reduce
                risk, so voluntarily putting personal cash in is meaningful. Insider <strong>selling</strong> is far
                weaker evidence — it's routinely just diversification, tax planning, or a pre-scheduled 10b5-1 plan, not
                a vote against the company.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Case Studies */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Case Studies" colorClass="bg-sky-600" />
        <Card className="border-sky-100 ml-8 md:ml-9">
          <CardContent className="pt-4">
            <p className="text-xs md:text-sm text-sky-700 leading-relaxed">
              These frameworks apply differently depending on the company: <strong>NVIDIA</strong> tests DCF assumptions
              under hyper-growth uncertainty, <strong>Tesla</strong> highlights the gap between narrative-driven valuation
              and traditional multiples, and <strong>Figma</strong> shows how to value a newly-public, high-growth SaaS
              business with limited historical data. Explore each case study on the site for the full walkthrough.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-sky-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <LineChart className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sky-900 text-sm md:text-base">13F Analysis</h4>
              <p className="text-xs md:text-sm text-sky-700 leading-relaxed mt-1">
                Cross-check your own valuation work against what institutional investors are actually buying — see{" "}
                <Link href="/stock/stock-analysis/13f-analysis" className="underline underline-offset-2 hover:text-sky-900 inline-flex items-center gap-0.5">
                  13F Analysis <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Globe className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sky-900 text-sm md:text-base">Macro Analysis</h4>
              <p className="text-xs md:text-sm text-sky-700 leading-relaxed mt-1">
                A company-level valuation is incomplete without the macro backdrop — discount rates, sector rotation, and
                the economic cycle all move the "right" multiple — see{" "}
                <Link href="/stock/investment/macro-analysis" className="underline underline-offset-2 hover:text-sky-900 inline-flex items-center gap-0.5">
                  Macro Analysis <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<LineChart className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Stock Analysis Guide"
    />
  );
}
