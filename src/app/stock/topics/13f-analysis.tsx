'use client';

import { FileText, Clock, EyeOff, Vote, LineChart, Globe, ArrowRight } from "lucide-react";
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
      <h3 className="text-lg md:text-xl font-semibold text-violet-900">{title}</h3>
    </div>
  );
}

export function ThirteenFAnalysisContent() {
  // Get configuration for 13F analysis
  const config = getTopicConfig('13f-analysis');

  const heroColorScheme = {
    border: "border-violet-200",
    background: "bg-gradient-to-br from-violet-50 to-purple-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    titleColor: "text-violet-900",
    descriptionColor: "text-violet-700",
    cardBg: "bg-white",
    cardBorder: "border border-violet-100",
    cardText: "text-violet-900",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-800",
    sectionTitle: "text-violet-900"
  };

  const contentSections = (
    <>
      {/* 1. Reading Form 13F */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Reading Form 13F" colorClass="bg-violet-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <FileText className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-violet-900 text-sm md:text-base">What's Disclosed</h4>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed mt-1">
                Any institutional manager with over $100M in U.S. equity AUM must file Form 13F quarterly, disclosing
                every long U.S.-listed equity and options position above a small threshold — giving retail investors a
                genuine, if delayed, window into what the largest players actually own.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <EyeOff className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-violet-900 text-sm md:text-base">What's Omitted, and the Lag</h4>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed mt-1">
                13F reveals long positions only — short positions, most derivatives detail, non-U.S. holdings, and cash
                are invisible. Filings are also due 45 days after quarter-end, so by the time you read one, the position
                could already be a quarter-and-a-half stale; some funds have since exited what you're reading about.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Coattail Investing */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Coattail Investing" colorClass="bg-violet-600" />
        <Card className="border-violet-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-violet-600 flex-shrink-0" /> Reading Conviction, Not Just Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-violet-700 leading-relaxed">
              The signal isn't the position itself — it's the <strong>change</strong> quarter-over-quarter. A brand-new
              position, or a significant increase to an existing one, reflects fresh conviction; a small trim can just be
              routine rebalancing or risk management, not a change of view. Given the reporting lag, coattailing works
              better as a source of research ideas to investigate independently than as a mechanical buy signal.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Investor Philosophies */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Investor Philosophies" colorClass="bg-violet-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-violet-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base">Druckenmiller</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed">
                Highly concentrated, macro-driven conviction — willing to bet a large fraction of the portfolio on a
                single top-down thesis rather than diversify it away.
              </p>
            </CardContent>
          </Card>
          <Card className="border-violet-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base">Burry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed">
                Deep, contrarian value research — willing to hold a position that looks wrong to the market for a long
                time, based on independently-verified fundamentals rather than sentiment.
              </p>
            </CardContent>
          </Card>
          <Card className="border-violet-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base">Buffett</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed">
                Durable competitive moats and long holding periods — position sizing scales with the size and durability
                of the advantage, not with short-term price momentum.
              </p>
            </CardContent>
          </Card>
          <Card className="border-violet-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base">Munger</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed">
                Multidisciplinary "mental models" thinking — cross-checking a thesis against psychology, economics, and
                other fields before sizing a position, to catch blind spots a single-lens analysis would miss.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Political Alpha */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Political Alpha" colorClass="bg-violet-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Vote className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-violet-900 text-sm md:text-base">Congressional Trading Disclosures</h4>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed mt-1">
                The STOCK Act requires members of Congress to disclose trades within 45 days — academic research on these
                filings has found average excess returns in some periods, plausibly linked to informational advantages
                from committee work, though results vary by study period and methodology and shouldn't be over-read as a
                reliable edge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-violet-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <LineChart className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-violet-900 text-sm md:text-base">Stock Analysis</h4>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed mt-1">
                A 13F idea is a starting point, not a conclusion — verify it with your own valuation work — see{" "}
                <Link href="/stock/stock-analysis/stock-analysis" className="underline underline-offset-2 hover:text-violet-900 inline-flex items-center gap-0.5">
                  Stock Analysis <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Globe className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-violet-900 text-sm md:text-base">Macro Analysis</h4>
              <p className="text-xs md:text-sm text-violet-700 leading-relaxed mt-1">
                Understanding the macro backdrop a manager was trading into helps interpret why a position was taken —
                see{" "}
                <Link href="/stock/investment/macro-analysis" className="underline underline-offset-2 hover:text-violet-900 inline-flex items-center gap-0.5">
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
      heroIcon={<FileText className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="13F Analysis Guide"
    />
  );
}
