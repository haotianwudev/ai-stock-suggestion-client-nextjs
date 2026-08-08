'use client';

import { Layers, RefreshCw, Scale, Compass, Globe2, GraduationCap, PiggyBank, ArrowRight } from "lucide-react";
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
      <h3 className="text-lg md:text-xl font-semibold text-indigo-900">{title}</h3>
    </div>
  );
}

export function EtfMutualFundContent() {
  // Get configuration for ETF & mutual fund
  const config = getTopicConfig('etf-mutual-fund');

  const heroColorScheme = {
    border: "border-indigo-200",
    background: "bg-gradient-to-br from-indigo-50 to-blue-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    titleColor: "text-indigo-900",
    descriptionColor: "text-indigo-700",
    cardBg: "bg-white",
    cardBorder: "border border-indigo-100",
    cardText: "text-indigo-900",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
    sectionTitle: "text-indigo-900"
  };

  const contentSections = (
    <>
      {/* 1. ETF Mechanics */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="ETF Mechanics" colorClass="bg-indigo-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <RefreshCw className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm md:text-base">Creation &amp; Redemption</h4>
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed mt-1">
                Unlike a mutual fund, an ETF's shares aren't created directly by investor cash — large institutions called
                Authorized Participants assemble a basket of the underlying stocks and swap it with the fund for new ETF
                shares (or vice versa to redeem). This in-kind mechanism is what keeps the ETF's price tightly tethered to
                its underlying holdings throughout the trading day.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Layers className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm md:text-base">Tracking Error &amp; Structural Risk</h4>
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed mt-1">
                Tracking error — the gap between an ETF's return and its index's return — comes from fees, sampling
                (not owning every single constituent), and cash drag. In thinly-traded ETFs, the market price can also
                temporarily decouple from the fund's actual net asset value during periods of market stress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ETFs vs. Mutual Funds */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="ETFs vs. Mutual Funds" colorClass="bg-indigo-600" />
        <Card className="border-indigo-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-indigo-600 flex-shrink-0" /> The Trade-offs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-indigo-700 leading-relaxed">
              The in-kind redemption mechanism above is also what makes ETFs more <strong>tax-efficient</strong> than
              mutual funds — the fund rarely has to sell holdings for cash, so it rarely triggers a taxable capital gains
              distribution the way a mutual fund can even in a losing year. ETFs also trade intraday at live prices
              (mutual funds settle once, at end-of-day NAV) and, index-for-index, typically carry lower expense ratios.
              Mutual funds still win on automatic recurring investment and fractional-dollar purchases in some accounts.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Beyond the Benchmarks */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Beyond the Benchmarks" colorClass="bg-indigo-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Compass className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm md:text-base">Differentiated Exposure</h4>
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed mt-1">
                Beyond SPY/QQQ/VOO-style cap-weighted funds, equal-weight versions (each holding gets the same weight,
                reducing mega-cap concentration risk), factor ETFs (value, quality, low-volatility), and sector-rotation
                funds all target a different risk/return profile than simply owning the market as-is.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Globe2 className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm md:text-base">Index Products &amp; Diversification</h4>
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed mt-1">
                Small-cap and international/global index funds address <strong>home bias</strong> — the common tendency
                to over-concentrate in large, familiar domestic companies — by adding exposure to a broader opportunity
                set with different economic and currency drivers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Related & Advanced Topics" colorClass="bg-indigo-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <PiggyBank className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm md:text-base">Wealth Planning</h4>
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed mt-1">
                For how tax-efficient fund choice fits into a broader plan (including direct indexing as the next step up)
                — see{" "}
                <Link href="/stock/investment/wealth-planning" className="underline underline-offset-2 hover:text-indigo-900 inline-flex items-center gap-0.5">
                  Wealth Planning <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <GraduationCap className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm md:text-base">Finance 101</h4>
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed mt-1">
                New to fund investing generally? Start with the fundamentals — see{" "}
                <Link href="/stock/investment/finance-101" className="underline underline-offset-2 hover:text-indigo-900 inline-flex items-center gap-0.5">
                  Finance 101 <ArrowRight className="h-3 w-3" />
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
      heroIcon={<Layers className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="ETF & Mutual Fund Guide"
    />
  );
}
