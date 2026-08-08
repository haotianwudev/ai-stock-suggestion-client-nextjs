'use client';

import { Shield, Layers, TrendingDown, Landmark, Waves, AlertTriangle, Dice5, Sigma, ArrowRight } from "lucide-react";
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
      <h3 className="text-lg md:text-xl font-semibold text-rose-900">{title}</h3>
    </div>
  );
}

export function RiskManagementContent() {
  // Get configuration for risk management
  const config = getTopicConfig('risk-management');

  const heroColorScheme = {
    border: "border-rose-200",
    background: "bg-gradient-to-br from-rose-50 to-red-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    titleColor: "text-rose-900",
    descriptionColor: "text-rose-700",
    cardBg: "bg-white",
    cardBorder: "border border-rose-100",
    cardText: "text-rose-900",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    sectionTitle: "text-rose-900"
  };

  const contentSections = (
    <>
      {/* 1. Measuring Risk */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Measuring Risk" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Layers className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Factor Risk Models</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Decomposes a portfolio's risk into exposures to common, systematic factors (market beta, sector, value,
                momentum) plus a residual idiosyncratic piece — far more informative than a single volatility number,
                because it shows <em>where</em> the risk is concentrated, not just how large it is.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <TrendingDown className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Value-at-Risk &amp; Tail Risk</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                VaR answers "what's the most I'd expect to lose on a normal bad day, at a given confidence level" — but
                says nothing about how bad the days beyond that threshold get. Conditional VaR (expected shortfall) and
                skew-based measures fill that gap by specifically quantifying the tail, where VaR's assumptions
                (often normality) tend to break down the most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Counterparty & Systemic Risk */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Counterparty &amp; Systemic Risk" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-rose-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Landmark className="h-4 w-4 text-rose-600 flex-shrink-0" /> Counterparty &amp; Credit Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed">
                The risk that the other side of a trade fails to deliver. Margin and collateral requirements exist
                specifically to bound this — in derivatives and private credit, understanding who holds the default
                risk (and under what stress scenario it gets triggered) is as important as the trade's market risk.
              </p>
            </CardContent>
          </Card>
          <Card className="border-rose-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Waves className="h-4 w-4 text-rose-600 flex-shrink-0" /> Systemic Contagion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed">
                Localized shocks — a forced unwind, a funding squeeze in one market — can propagate to seemingly
                unrelated assets through shared holders, leverage, and liquidity chains. Correlations that looked low in
                calm markets tend to spike toward 1 during a crisis, right when diversification is needed most.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Modeling Approaches */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Modeling Approaches" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Dice5 className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Scenario &amp; Stress Testing</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Rather than trusting a single statistical model, stress testing runs the portfolio through specific
                historical (2008, 2020) or hypothetical shocks to see what breaks — a check on model risk itself, since
                any one model's assumptions can be wrong in ways history reveals faster than math does.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Sigma className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Newer Statistical Tools</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Conformal prediction produces prediction intervals with a guaranteed statistical coverage rate without
                assuming a specific distribution — an increasingly common upgrade over classic parametric VaR, which
                only holds up as well as its normality assumption does.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Related & Advanced Topics" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Monte Carlo Simulation</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Simulation is one of the main engines behind VaR/CVaR estimation and stress testing — see{" "}
                <Link href="/quant/topics/monte-carlo" className="underline underline-offset-2 hover:text-rose-900 inline-flex items-center gap-0.5">
                  Monte Carlo Simulation <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Shield className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Systematic Strategies</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Position sizing and stop rules are risk management applied at the individual-trade level — see{" "}
                <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-rose-900 inline-flex items-center gap-0.5">
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
      heroIcon={<Shield className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Risk Management Guide"
    />
  );
}
