'use client';

import { Landmark, Clock, DollarSign, RotateCcw, Waves, PiggyBank, LineChart, ArrowRight } from "lucide-react";
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
      <h3 className="text-lg md:text-xl font-semibold text-emerald-900">{title}</h3>
    </div>
  );
}

export function MacroAnalysisContent() {
  // Get configuration for macro analysis
  const config = getTopicConfig('macro-analysis');

  const heroColorScheme = {
    border: "border-emerald-200",
    background: "bg-gradient-to-br from-emerald-50 to-green-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    titleColor: "text-emerald-900",
    descriptionColor: "text-emerald-700",
    cardBg: "bg-white",
    cardBorder: "border border-emerald-100",
    cardText: "text-emerald-900",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    sectionTitle: "text-emerald-900"
  };

  const contentSections = (
    <>
      {/* 1. Macro Regime Detection */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Macro Regime Detection" colorClass="bg-emerald-600" />
        <Card className="border-emerald-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-600 flex-shrink-0" /> The Investment Clock Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs md:text-sm text-emerald-700 leading-relaxed">
              Maps the economy onto two axes — growth (rising or falling) and inflation (rising or falling) — creating
              four quadrants, each historically favoring a different asset class: <strong>Reflation</strong> (rising
              growth, falling inflation) tends to favor equities; <strong>Overheat</strong> (rising growth, rising
              inflation) favors commodities; <strong>Stagflation</strong> (falling growth, rising inflation) favors cash;
              <strong> Reflation-to-Recovery</strong> transitions (falling growth, falling inflation) favor bonds. It's a
              framework for orientation, not a precise timing tool.
            </p>
            <p className="text-xs text-emerald-600">
              See the live version:{" "}
              <Link href="/investment-clock" className="underline underline-offset-2 hover:text-emerald-900">
                Investment Clock
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Monetary Policy */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Monetary Policy" colorClass="bg-emerald-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Landmark className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900 text-sm md:text-base">Fed Policy Transmission</h4>
              <p className="text-xs md:text-sm text-emerald-700 leading-relaxed mt-1">
                A rate hike raises the discount rate used to value future cash flows, which compresses equity valuations
                (especially long-duration growth stocks whose profits are furthest in the future) and pushes bond yields
                up while bond prices fall — the same mechanism, playing out across two asset classes at once.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <DollarSign className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900 text-sm md:text-base">Dollar Dynamics</h4>
              <p className="text-xs md:text-sm text-emerald-700 leading-relaxed mt-1">
                Higher U.S. rates relative to other countries tend to strengthen the dollar (capital flows to the higher
                yield), which pressures emerging-market borrowers with dollar-denominated debt and squeezes U.S.
                multinationals' overseas earnings when translated back to dollars.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Market Cycle Theory */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Market Cycle Theory" colorClass="bg-emerald-600" />
        <Card className="border-emerald-100 ml-8 md:ml-9">
          <CardContent className="pt-4">
            <p className="text-xs md:text-sm text-emerald-700 leading-relaxed">
              Howard Marks' central idea: markets oscillate between excessive optimism and excessive pessimism far more
              than the underlying fundamentals actually change — "where are we in the cycle" is a more useful question
              than "what's the news today," since sentiment extremes (not headlines) tend to mark the best and worst
              entry points in hindsight.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4. Shocks & Regime Shifts */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Shocks &amp; Regime Shifts" colorClass="bg-emerald-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Waves className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900 text-sm md:text-base">Stagflation Fears</h4>
              <p className="text-xs md:text-sm text-emerald-700 leading-relaxed mt-1">
                The worst quadrant for both stocks and bonds simultaneously — slowing growth removes the earnings case
                for equities while persistent inflation keeps the central bank from cutting rates to support them,
                leaving few traditional assets to hide in besides cash and select commodities.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <RotateCcw className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900 text-sm md:text-base">Carry-Trade Unwinds</h4>
              <p className="text-xs md:text-sm text-emerald-700 leading-relaxed mt-1">
                When investors borrow cheaply in a low-rate currency to fund higher-yielding assets elsewhere, a sudden
                rate move in the funding currency can force a rapid, correlated unwind across seemingly unrelated
                markets — a reminder that leverage embedded in currency markets can transmit shocks globally within days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-emerald-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <PiggyBank className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900 text-sm md:text-base">Wealth Planning</h4>
              <p className="text-xs md:text-sm text-emerald-700 leading-relaxed mt-1">
                For turning a macro regime view into concrete portfolio adjustments — see{" "}
                <Link href="/stock/investment/wealth-planning" className="underline underline-offset-2 hover:text-emerald-900 inline-flex items-center gap-0.5">
                  Wealth Planning <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <LineChart className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900 text-sm md:text-base">Asset Allocation</h4>
              <p className="text-xs md:text-sm text-emerald-700 leading-relaxed mt-1">
                For the systematic, quant side of turning a macro view into portfolio weights — see{" "}
                <Link href="/quant/quanttrading/asset-allocation" className="underline underline-offset-2 hover:text-emerald-900 inline-flex items-center gap-0.5">
                  Asset Allocation <ArrowRight className="h-3 w-3" />
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
      heroIcon={<Landmark className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Macro Analysis Guide"
    />
  );
}
