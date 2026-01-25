'use client';

import { PieChart, TrendingUp, Shield, Target, BarChart3, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

export function AssetAllocationContent() {
  // Get configuration for asset allocation
  const config = getQuantTopicConfig('asset-allocation');

  const heroColorScheme = {
    border: "border-green-200",
    background: "bg-gradient-to-br from-green-50 to-emerald-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    descriptionColor: "text-green-700",
    cardBg: "bg-white",
    cardBorder: "border border-green-100",
    cardText: "text-green-900",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    sectionTitle: "text-green-900"
  };

  const contentSections = (
    <>
      {/* Core Asset Allocation Strategies */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Core Allocation Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Strategic Asset Allocation</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Long-term target allocations based on risk tolerance</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Set target percentages for each asset class</li>
              <li>• Rebalance periodically to maintain targets</li>
              <li>• Focus on long-term expected returns</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Tactical Asset Allocation</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Short-term deviations from strategic targets</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Adjust allocations based on market conditions</li>
              <li>• Exploit temporary market inefficiencies</li>
              <li>• Return to strategic allocation over time</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Risk Parity</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Equal risk contribution from each asset class</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Weight assets by inverse volatility</li>
              <li>• Diversify risk rather than capital</li>
              <li>• All Weather portfolio approach</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Factor-Based Allocation</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Allocate based on risk factors and premiums</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Value, momentum, quality factors</li>
              <li>• Size and profitability premiums</li>
              <li>• Smart beta implementation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modern Portfolio Theory Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Modern Portfolio Theory Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Efficient Frontier</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Optimal risk-return combinations</li>
              <li>• Minimize risk for given return</li>
              <li>• Maximize return for given risk</li>
              <li>• Diversification benefits</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Capital Market Line</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Risk-free asset inclusion</li>
              <li>• Tangency portfolio</li>
              <li>• Leverage and lending</li>
              <li>• Sharpe ratio optimization</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Black-Litterman Model</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Market equilibrium assumptions</li>
              <li>• Investor views incorporation</li>
              <li>• Uncertainty quantification</li>
              <li>• Stable portfolio weights</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Asset Classes & Correlations */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Asset Classes & Correlations</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Traditional Assets</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li><strong>Equities:</strong> Growth potential, higher volatility</li>
                <li><strong>Fixed Income:</strong> Stability, income generation</li>
                <li><strong>Cash:</strong> Liquidity, capital preservation</li>
                <li><strong>Real Estate:</strong> Inflation hedge, diversification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Alternative Assets</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li><strong>Commodities:</strong> Inflation protection, crisis alpha</li>
                <li><strong>Private Equity:</strong> Illiquidity premium, growth</li>
                <li><strong>Hedge Funds:</strong> Absolute returns, low correlation</li>
                <li><strong>Crypto:</strong> Digital store of value, high volatility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Rebalancing Strategies */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Rebalancing Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Calendar Rebalancing</h4>
            <p className="text-sm text-green-700 mb-2">Fixed time intervals (monthly, quarterly, annually)</p>
            <div className="text-xs text-green-600">
              <strong>Pros:</strong> Simple, disciplined approach<br/>
              <strong>Cons:</strong> May miss optimal timing
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Threshold Rebalancing</h4>
            <p className="text-sm text-green-700 mb-2">Rebalance when allocations drift beyond set limits</p>
            <div className="text-xs text-green-600">
              <strong>Pros:</strong> Responsive to market moves<br/>
              <strong>Cons:</strong> Higher transaction costs
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Tools */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Implementation Tools & Platforms</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">Portfolio Visualizer</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Morningstar Direct</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Bloomberg Terminal</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Python (PyPortfolioOpt)</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">R (PortfolioAnalytics)</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">MATLAB</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Vanguard Personal Advisor</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Betterment</Badge>
        </div>
      </div>

      {/* Risk Considerations */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Key Risk Considerations</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <strong className="text-yellow-800">Correlation Risk:</strong>
              <span className="text-yellow-700"> Assets may become correlated during crises</span>
            </div>
            <div>
              <strong className="text-yellow-800">Sequence Risk:</strong>
              <span className="text-yellow-700"> Poor returns early in retirement</span>
            </div>
            <div>
              <strong className="text-yellow-800">Inflation Risk:</strong>
              <span className="text-yellow-700"> Purchasing power erosion over time</span>
            </div>
            <div>
              <strong className="text-yellow-800">Liquidity Risk:</strong>
              <span className="text-yellow-700"> Inability to sell assets when needed</span>
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
      infographicAlt="Strategic Asset Allocation Framework"
    />
  );
}