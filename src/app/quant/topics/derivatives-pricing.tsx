'use client';

import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

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
      {/* Core Pricing Models */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Core Pricing Models</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

      {/* Structured Products */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Structured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

      {/* Risk Factors */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Key Risk Factors</h3>
        <div className="bg-white p-4 rounded-lg border border-teal-100">
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

      {/* Implementation Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Implementation Framework</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">QuantLib</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">Python/NumPy</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">MATLAB Financial Toolbox</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">R/RQuantLib</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">Bloomberg API</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">Monte Carlo Methods</Badge>
        </div>
      </div>

      {/* Valuation Components */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Valuation Components</h3>
        <div className="bg-white p-4 rounded-lg border border-teal-100">
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