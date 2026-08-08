'use client';

import { Calculator, Dice5, Target, TrendingUp, Wallet, Landmark, Repeat, BarChart3, Shuffle, AlertTriangle, FlaskConical, LineChart, Sigma } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { TopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-blue-900">{title}</h3>
    </div>
  );
}

export function MonteCarloContent({ config }: { config?: TopicConfig }) {
  const heroColorScheme = {
    border: "border-blue-200",
    background: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    descriptionColor: "text-blue-700",
    cardBg: "bg-white",
    cardBorder: "border border-blue-100",
    cardText: "text-blue-900",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    sectionTitle: "text-blue-900"
  };



  const contentSections = (
    <>
      {/* 1. Foundations */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Foundations" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Dice5 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">What a Simulation Actually Does</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                Instead of solving an equation for one exact answer, a Monte Carlo simulation draws thousands of random,
                equally-plausible future paths for a variable (a stock price, a portfolio's return), then looks at the
                resulting distribution of outcomes. The average of those outcomes approximates the answer; the spread tells
                you how uncertain that answer is.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Sigma className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Why Finance Needs It</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                Closed-form formulas like Black-Scholes only work for simple, well-behaved payoffs. The moment a problem
                involves path-dependency (did the price ever cross a barrier?), multiple correlated assets, or irregular
                cash flows, there's usually no clean formula — simulation handles arbitrary complexity in exchange for
                computation time instead of algebra.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Applications */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Core Applications" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <LineChart className="h-4 w-4 text-blue-600 flex-shrink-0" /> Option Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
                Prices exotic, path-dependent derivatives (Asian, barrier, lookback options) by simulating the underlying's
                price path thousands of times and averaging the discounted payoff — the workhorse method whenever there's
                no closed-form alternative.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600 flex-shrink-0" /> Risk Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
                Simulates portfolio value across thousands of scenarios to estimate Value-at-Risk (VaR) and Conditional
                VaR — how bad the tail of the loss distribution actually is, not just the expected case.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Wallet className="h-4 w-4 text-blue-600 flex-shrink-0" /> Portfolio &amp; Retirement Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
                Simulates thousands of possible market paths to show the full range of retirement/portfolio outcomes (e.g.
                "85% probability the portfolio lasts 30 years") instead of a single deterministic projection.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Landmark className="h-4 w-4 text-blue-600 flex-shrink-0" /> Credit Risk (CVA)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
                Simulates counterparty default scenarios and exposure paths over the life of a trade to price the Credit
                Valuation Adjustment — the cost of the counterparty potentially failing to pay.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. How a Simulation Is Built */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="How a Simulation Is Built" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Shuffle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Random Sampling &amp; Stochastic Processes</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                A process (commonly Geometric Brownian Motion for stock prices) specifies how the variable evolves; at each
                time step a random shock — usually drawn from a normal distribution — is added, and the whole path is
                repeated thousands of times to build a distribution of outcomes.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Repeat className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Convergence &amp; Number of Paths</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                Simulation accuracy improves with the square root of the number of paths — doubling precision requires
                roughly 4x the simulations, not 2x. This is why naive Monte Carlo can be computationally expensive for
                high-precision pricing.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Variance Reduction Techniques</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                Methods like antithetic variates (pairing each random path with its mirror image) and control variates
                (using a related, known quantity to cancel out noise) cut the number of paths needed for a target accuracy,
                since plain random sampling converges slowly on its own.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" /> Where Simulations Mislead
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Model risk:</span>
              <span>The output is only as good as the assumed process — assuming normally distributed returns when real
                markets have fat tails produces confidently wrong risk numbers.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Mistaking a distribution for a prediction:</span>
              <span>A "70% success rate" retirement simulation is a probability band, not a forecast — reading percentile
                outputs as guarantees is one of the most common misreadings of Monte Carlo results.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Underestimating cost at scale:</span>
              <span>Path-dependent payoffs with many time steps, or portfolios of correlated assets, multiply the
                computation needed — this is often where naive implementations become impractically slow.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <FlaskConical className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Derivatives Pricing</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                Monte Carlo is one of several pricing methods alongside closed-form models and binomial trees — see{" "}
                <Link href="/quant/topics/derivatives-pricing" className="underline underline-offset-2 hover:text-blue-900">Derivatives Pricing</Link>{" "}
                for when each approach fits best.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Statistical Analysis</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                The distributional assumptions that drive a simulation — mean, volatility, correlation, fat tails — come
                from statistical estimation; see{" "}
                <Link href="/quant/topics/statistical-analysis" className="underline underline-offset-2 hover:text-blue-900">Statistical Analysis</Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Target className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Risk Management</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                Simulation output (VaR, CVaR, drawdown distributions) directly feeds portfolio risk limits and stress
                testing — see{" "}
                <Link href="/quant/topics/risk-management" className="underline underline-offset-2 hover:text-blue-900">Risk Management</Link>.
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
      heroIcon={<Calculator className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Monte Carlo Simulation in Quantitative Finance"
    />
  );
}