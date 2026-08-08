'use client';

import { PieChart, TrendingUp, Shield, Target, Layers, AlertTriangle, Compass, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

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

export function AssetAllocationContent() {
  // Get configuration for asset allocation
  const config = getQuantTopicConfig('asset-allocation');

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
      {/* 1. Allocation Approaches */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Allocation Approaches" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Strategic Asset Allocation (SAA)</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">Long-term target allocations based on risk tolerance and investment horizon</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Set target percentages for each asset class</li>
              <li>• Rebalance periodically to maintain targets</li>
              <li>• Focus on long-term expected returns and risk</li>
              <li>• Typically reviewed annually or bi-annually</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Tactical Asset Allocation (TAA)</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">Short-term deviations from strategic targets based on market conditions</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Adjust allocations based on market outlook</li>
              <li>• Exploit temporary market inefficiencies</li>
              <li>• Return to strategic allocation over time</li>
              <li>• Requires active monitoring and expertise</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Risk Parity</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">Equal risk contribution from each asset class or factor</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Weight assets by inverse volatility</li>
              <li>• Diversify risk rather than capital</li>
              <li>• All Weather portfolio approach</li>
              <li>• Better diversification in crisis periods</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Smart Beta Factor Allocation</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">Systematic exposure to risk factors and expected premiums</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Value, momentum, quality, size factors</li>
              <li>• Low volatility and profitability premiums</li>
              <li>• Smart beta and factor ETF implementation</li>
              <li>• Evidence-based factor selection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Smart Beta Factor Investing */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Smart Beta Factor Investing" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-blue-800 mb-4 leading-relaxed">
            Smart Beta combines the benefits of passive indexing with active management by systematically 
            tilting portfolios toward specific risk factors that have historically delivered excess returns.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded border border-blue-100">
              <h5 className="font-semibold text-blue-900 mb-1 text-sm">Value Factor</h5>
              <p className="text-xs text-blue-700 leading-relaxed">Low P/E, P/B ratios outperform over long term</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <h5 className="font-semibold text-blue-900 mb-1 text-sm">Quality Factor</h5>
              <p className="text-xs text-blue-700 leading-relaxed">High ROE, low debt, stable earnings</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <h5 className="font-semibold text-blue-900 mb-1 text-sm">Momentum Factor</h5>
              <p className="text-xs text-blue-700 leading-relaxed">Recent winners continue outperforming</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <h5 className="font-semibold text-blue-900 mb-1 text-sm">Low Volatility</h5>
              <p className="text-xs text-blue-700 leading-relaxed">Lower risk stocks with better risk-adjusted returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Portfolio Optimization Techniques */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Portfolio Optimization Techniques" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Mean-Variance Optimization</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Efficient frontier construction</li>
              <li>• Risk-return trade-off analysis</li>
              <li>• Sharpe ratio maximization</li>
              <li>• Covariance matrix estimation</li>
            </ul>
            <div className="mt-2 text-xs text-blue-600">
              <strong>Formula:</strong> max w'μ - (λ/2)w'Σw
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Black-Litterman Model</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Market equilibrium assumptions</li>
              <li>• Investor views incorporation</li>
              <li>• Uncertainty quantification</li>
              <li>• Stable portfolio weights</li>
            </ul>
            <div className="mt-2 text-xs text-blue-600">
              <strong>Advantage:</strong> Addresses MVO instability
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Risk Budgeting</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Equal risk contribution (ERC)</li>
              <li>• Risk parity implementation</li>
              <li>• Marginal risk contribution</li>
              <li>• Component risk decomposition</li>
            </ul>
            <div className="mt-2 text-xs text-blue-600">
              <strong>Goal:</strong> RC_i = (1/N) × σ_p for all i
            </div>
          </div>
        </div>
      </div>

      {/* 4. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardContent className="pt-4 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">MVO's estimation-error sensitivity:</span>
              <span>Mean-variance optimization is notoriously sensitive to small errors in expected-return inputs —
                tiny changes can flip the "optimal" portfolio dramatically, which is exactly the instability the
                Black-Litterman model was built to fix.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Chasing recent performance:</span>
              <span>Tactical shifts made after a factor or asset class has already run hot tend to buy in late —
                the same behavioral trap that hurts individual stock-pickers, just at the portfolio level.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Rebalancing costs &amp; tax drag:</span>
              <span>Frequent rebalancing to stay perfectly on-target generates transaction costs and, in taxable
                accounts, realized capital gains — the "optimal" weights on paper aren't optimal after those frictions.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Compass className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Systematic Strategies</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                For combining multiple systematic strategies into one diversified system — see{" "}
                <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-blue-900 inline-flex items-center gap-0.5">
                  Systematic Strategies <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Globe className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Macro Analysis</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                Tactical allocation shifts (TAA) are driven by macro regime views — see{" "}
                <Link href="/stock/investment/macro-analysis" className="underline underline-offset-2 hover:text-blue-900 inline-flex items-center gap-0.5">
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
      heroIcon={<PieChart className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Asset Allocation & Portfolio Construction Framework"
    />
  );
}