'use client';

import { Settings, Compass, Search, Layers, FlaskConical, Rocket, Cpu, Database, Cloud, TrendingDown, RefreshCw, Gauge, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-teal-900">{title}</h3>
    </div>
  );
}

export function TradingSystemContent() {
  const config = getQuantTopicConfig('trading-system');
  
  if (!config) return null;

  // Define color scheme for Trading System (teal theme)
  const heroColorScheme = {
    border: "border-teal-200",
    background: "bg-gradient-to-br from-teal-50 to-cyan-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    titleColor: "text-teal-900",
    descriptionColor: "text-teal-700",
    cardBg: "bg-white",
    cardBorder: "border border-teal-100",
    cardText: "text-teal-900",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-800",
    sectionTitle: "text-teal-900"
  };

  // Define custom content sections
  const contentSections = (
    <>
      {/* 1. Foundations */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Foundations" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9">
          <div className="flex gap-2">
            <Compass className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">A Trading System Is the Full Pipeline, Not the Idea</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                A profitable strategy on paper is just an idea. A <strong>trading system</strong> is everything required
                to turn that idea into capital deployed unattended: research, position sizing, execution, monitoring,
                and fail-safes. Most of the engineering effort in quant trading goes into this surrounding
                infrastructure, not the signal itself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. The Four Pillars */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="The Four Pillars" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-teal-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Search className="h-4 w-4 text-teal-600 flex-shrink-0" /> 1. Alpha Discovery &amp; Research
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed">
                Data collection, feature engineering, and model development to find signals with real predictive
                power — the hardest pillar, since most explored ideas produce nothing usable.
              </p>
            </CardContent>
          </Card>
          <Card className="border-teal-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-teal-600 flex-shrink-0" /> 2. Portfolio Construction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed">
                Converts one or many signals into position sizes — risk management, market-neutral positioning, and
                hedging that turn a raw signal into something a real portfolio can actually hold.
              </p>
            </CardContent>
          </Card>
          <Card className="border-teal-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-teal-600 flex-shrink-0" /> 3. Rigorous Backtesting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed">
                Historical simulation with realistic frictions (fees, slippage) and honest bias controls — the gate
                a strategy must pass before it's trusted with real capital.
              </p>
            </CardContent>
          </Card>
          <Card className="border-teal-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Rocket className="h-4 w-4 text-teal-600 flex-shrink-0" /> 4. Automated Execution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed">
                Turns a decision into a filled order with minimal market impact — order type selection, algorithmic
                execution, and transaction cost analysis to keep real-world costs close to the backtest's assumptions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Technology Stack */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Technology Stack" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Cpu className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">Python for Research, C++/Rust for Execution</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                Python's ecosystem (pandas, scikit-learn) makes it the default for research and modeling, where iteration
                speed matters most. Compiled languages like C++ or Rust take over where microseconds matter — the actual
                order-routing path — because Python's overhead there is a genuine cost, not a rounding error.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Database className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">KDB+/q for Time-Series Data</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                A column-oriented database purpose-built for time-series queries at high frequency and volume — the
                industry standard at firms handling tick-level data, where a general-purpose relational database
                would be too slow for the query patterns quant research actually runs.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Cloud className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">Cloud for Scalable Compute</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                Backtesting thousands of parameter combinations or training models is bursty, parallelizable work —
                a natural fit for on-demand cloud compute rather than fixed, always-on hardware.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Perpetual Challenges */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Perpetual Challenges" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 flex-shrink-0" /> Why No System Stays Finished
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Alpha decay:</span>
              <span>Once a signal is discovered and traded by enough capital, competition typically erodes its edge —
                what worked reliably last year may thin out or vanish this year.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Market adaptation:</span>
              <span>Market structure itself changes — new participants, new regulations, new venues — meaning a system
                tuned for yesterday's market microstructure can quietly stop fitting today's.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Continuous research is mandatory:</span>
              <span>Because of decay, a trading system is never "done" — ongoing research to refresh and replace
                aging signals is a permanent cost of staying in the business, not a one-time build.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <RefreshCw className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">Backtesting</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                For the detailed methodology behind Pillar 3 — see{" "}
                <Link href="/quant/quanttrading/backtest" className="underline underline-offset-2 hover:text-teal-900 inline-flex items-center gap-0.5">
                  Backtesting <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Gauge className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">Systematic Strategies</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                For the rule-based foundations that feed Pillar 1's research process — see{" "}
                <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-teal-900 inline-flex items-center gap-0.5">
                  Systematic Strategies <ArrowRight className="h-3 w-3" />
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
      heroIcon={<Settings className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Trading System Architecture Infographic"
    />
  );
}