'use client';

import { TrendingUp, AlertTriangle, Dice5, Sigma, Shield, ArrowRight } from "lucide-react";
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
      <h3 className="text-lg md:text-xl font-semibold text-teal-900">{title}</h3>
    </div>
  );
}

export function DerivativesPricingContent() {
  const config = getTopicConfig('derivatives-pricing');
  
  if (!config) return null;

  // Define teal color scheme for derivatives pricing
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
      {/* 1. Core Pricing Models */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Core Pricing Models" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-900 mb-2">Black-Scholes Model</h4>
            <p className="text-sm text-teal-700">Foundation of options pricing theory. Calculate theoretical values for European options using volatility, time decay, and risk-free rates.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-900 mb-2">Binomial Trees</h4>
            <p className="text-sm text-teal-700">Discrete-time model for pricing American options and complex derivatives. Handle early exercise features and path-dependent payoffs.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-900 mb-2">Monte Carlo Simulation</h4>
            <p className="text-sm text-teal-700">Price exotic derivatives and structured products through stochastic simulation. Handle multiple underlying assets and complex payoff structures.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-900 mb-2">Finite Difference Methods</h4>
            <p className="text-sm text-teal-700">Numerical solutions to partial differential equations. Price derivatives with barriers, early exercise, and time-varying parameters.</p>
          </div>
        </div>
      </div>

      {/* 2. Structured Products */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Structured Products" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-900 mb-2">Principal Protected Notes</h4>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• Zero-coupon bond component</li>
              <li>• Embedded option strategies</li>
              <li>• Capital preservation mechanisms</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-900 mb-2">Market-Linked CDs</h4>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• FDIC insurance protection</li>
              <li>• Index participation rates</li>
              <li>• Barrier and cap features</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-900 mb-2">Reverse Convertibles</h4>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• High coupon payments</li>
              <li>• Knock-in barrier risks</li>
              <li>• Equity conversion features</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Key Risk Factors */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Key Risk Factors" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9 bg-white p-4 rounded-lg border border-teal-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-teal-900 mb-2">Credit Risk</h4>
              <p className="text-sm text-teal-700">Issuer default risk affects all structured products. Senior unsecured debt obligations carry counterparty exposure.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-900 mb-2">Market Risk</h4>
              <p className="text-sm text-teal-700">Underlying asset performance directly impacts returns. Volatility changes affect embedded option values.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-900 mb-2">Liquidity Risk</h4>
              <p className="text-sm text-teal-700">Limited secondary market trading. Early redemption may result in significant losses or penalties.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-900 mb-2">Complexity Risk</h4>
              <p className="text-sm text-teal-700">Intricate payoff structures and multiple embedded features require sophisticated valuation models.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Valuation Components */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Valuation Components" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9 bg-white p-4 rounded-lg border border-teal-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-teal-900 mb-2">Bond Floor Value</h4>
              <p className="text-sm text-teal-700">Present value of guaranteed principal repayment. Provides downside protection in principal-protected structures.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-900 mb-2">Embedded Options</h4>
              <p className="text-sm text-teal-700">Value of derivative components linked to underlying performance. Determines upside participation potential.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-900 mb-2">Credit Spread</h4>
              <p className="text-sm text-teal-700">Issuer-specific risk premium over risk-free rate. Reflects counterparty creditworthiness and market conditions.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-900 mb-2">Volatility Surface</h4>
              <p className="text-sm text-teal-700">Implied volatility across strikes and maturities. Critical for accurate options pricing and risk management.</p>
            </div>
          </div>
        </div>
        <p className="ml-8 md:ml-9 text-xs text-teal-600">
          Common toolkits for implementing these models: QuantLib, Python/NumPy, MATLAB's Financial Toolbox,
          R/RQuantLib, and Bloomberg's API for live market data.
        </p>
      </div>

      {/* 5. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" /> Where Pricing Models Break
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Wrong model for the payoff:</span>
              <span>Using Black-Scholes (built for European exercise) on an American option ignores early-exercise
                value — a binomial tree or finite-difference method is required to price that feature correctly.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Treating the vol surface as flat:</span>
              <span>Real implied volatility varies by strike and maturity (the "smile"/"skew") — pricing off a single
                flat volatility number misprices anything away from at-the-money.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Ignoring dividends and borrow costs:</span>
              <span>Carry costs (dividends paid, cost to borrow shares for shorting) shift the forward price the
                option is really priced against — a common source of small-but-real pricing error.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 6. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={6} title="Related & Advanced Topics" colorClass="bg-teal-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Dice5 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">Monte Carlo Simulation</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                For the mechanics behind pricing exotics via simulation — see{" "}
                <Link href="/quant/topics/monte-carlo" className="underline underline-offset-2 hover:text-teal-900 inline-flex items-center gap-0.5">
                  Monte Carlo Simulation <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Sigma className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">Statistical Analysis</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                The volatility surface and correlation inputs to these models are estimated statistically — see{" "}
                <Link href="/quant/topics/statistical-analysis" className="underline underline-offset-2 hover:text-teal-900 inline-flex items-center gap-0.5">
                  Statistical Analysis <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Shield className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-teal-900 text-sm md:text-base">Risk Management</h4>
              <p className="text-xs md:text-sm text-teal-700 leading-relaxed mt-1">
                Counterparty credit risk on structured products connects directly to portfolio-level risk controls —
                see{" "}
                <Link href="/quant/topics/risk-management" className="underline underline-offset-2 hover:text-teal-900 inline-flex items-center gap-0.5">
                  Risk Management <ArrowRight className="h-3 w-3" />
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
      heroIcon={<TrendingUp className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Derivatives Pricing Models and Structured Products"
    />
  );
}