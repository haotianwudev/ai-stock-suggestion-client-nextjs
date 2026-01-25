'use client';

import { PieChart, TrendingUp, Shield, Target, BarChart3, DollarSign, Activity, Layers, Calculator, Zap } from "lucide-react";
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
      {/* Asset Allocation Approaches */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Asset Allocation Approaches</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Strategic Asset Allocation (SAA)</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Long-term target allocations based on risk tolerance and investment horizon</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Set target percentages for each asset class</li>
              <li>• Rebalance periodically to maintain targets</li>
              <li>• Focus on long-term expected returns and risk</li>
              <li>• Typically reviewed annually or bi-annually</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Tactical Asset Allocation (TAA)</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Short-term deviations from strategic targets based on market conditions</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Adjust allocations based on market outlook</li>
              <li>• Exploit temporary market inefficiencies</li>
              <li>• Return to strategic allocation over time</li>
              <li>• Requires active monitoring and expertise</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Risk Parity</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Equal risk contribution from each asset class or factor</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Weight assets by inverse volatility</li>
              <li>• Diversify risk rather than capital</li>
              <li>• All Weather portfolio approach</li>
              <li>• Better diversification in crisis periods</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Factor-Based Allocation</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Allocate based on risk factors and expected premiums</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Value, momentum, quality, size factors</li>
              <li>• Low volatility and profitability premiums</li>
              <li>• Smart beta and factor ETF implementation</li>
              <li>• Evidence-based factor selection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Portfolio Optimization Techniques */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Portfolio Optimization Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Mean-Variance Optimization</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Efficient frontier construction</li>
              <li>• Risk-return trade-off analysis</li>
              <li>• Sharpe ratio maximization</li>
              <li>• Covariance matrix estimation</li>
            </ul>
            <div className="mt-2 text-xs text-green-600">
              <strong>Formula:</strong> max w'μ - (λ/2)w'Σw
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Black-Litterman Model</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Market equilibrium assumptions</li>
              <li>• Investor views incorporation</li>
              <li>• Uncertainty quantification</li>
              <li>• Stable portfolio weights</li>
            </ul>
            <div className="mt-2 text-xs text-green-600">
              <strong>Advantage:</strong> Addresses MVO instability
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Risk Budgeting</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Equal risk contribution (ERC)</li>
              <li>• Risk parity implementation</li>
              <li>• Marginal risk contribution</li>
              <li>• Component risk decomposition</li>
            </ul>
            <div className="mt-2 text-xs text-green-600">
              <strong>Goal:</strong> RC_i = (1/N) × σ_p for all i
            </div>
          </div>
        </div>
      </div>

      {/* Asset Classes & Characteristics */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Asset Classes & Characteristics</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Traditional Assets</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong className="text-green-800">Equities:</strong>
                  <span className="text-green-700"> Growth potential, higher volatility, inflation hedge</span>
                </div>
                <div>
                  <strong className="text-green-800">Fixed Income:</strong>
                  <span className="text-green-700"> Stability, income generation, duration risk</span>
                </div>
                <div>
                  <strong className="text-green-800">Cash & Equivalents:</strong>
                  <span className="text-green-700"> Liquidity, capital preservation, low returns</span>
                </div>
                <div>
                  <strong className="text-green-800">Real Estate:</strong>
                  <span className="text-green-700"> Inflation hedge, diversification, illiquidity</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Alternative Assets</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong className="text-green-800">Commodities:</strong>
                  <span className="text-green-700"> Inflation protection, crisis alpha, volatility</span>
                </div>
                <div>
                  <strong className="text-green-800">Private Equity:</strong>
                  <span className="text-green-700"> Illiquidity premium, growth potential, long horizon</span>
                </div>
                <div>
                  <strong className="text-green-800">Hedge Funds:</strong>
                  <span className="text-green-700"> Absolute returns, low correlation, high fees</span>
                </div>
                <div>
                  <strong className="text-green-800">Cryptocurrency:</strong>
                  <span className="text-green-700"> Digital store of value, high volatility, emerging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Attribution & Performance Analysis */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Portfolio Attribution & Performance Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Return Attribution</h4>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Asset allocation effect</li>
              <li>• Security selection effect</li>
              <li>• Interaction effect</li>
              <li>• Currency effect (for global portfolios)</li>
            </ul>
            <div className="mt-2 text-xs text-green-600">
              <strong>Brinson Model:</strong> R_p - R_b = AA + SS + I
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Risk Attribution</h4>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Factor risk decomposition</li>
              <li>• Specific risk contribution</li>
              <li>• Marginal contribution to risk</li>
              <li>• Component VaR analysis</li>
            </ul>
            <div className="mt-2 text-xs text-green-600">
              <strong>Formula:</strong> σ²_p = Σ w_i × MCTR_i
            </div>
          </div>
        </div>
      </div>

      {/* Rebalancing Strategies */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Rebalancing Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Calendar Rebalancing</h4>
            <p className="text-sm text-green-700 mb-2">Fixed time intervals</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Monthly, quarterly, annually</li>
              <li>• Simple and disciplined</li>
              <li>• May miss optimal timing</li>
              <li>• Lower monitoring costs</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Threshold Rebalancing</h4>
            <p className="text-sm text-green-700 mb-2">Drift-based triggers</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• 5% or 10% deviation bands</li>
              <li>• Responsive to market moves</li>
              <li>• Higher transaction costs</li>
              <li>• Better risk control</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Volatility-Based</h4>
            <p className="text-sm text-green-700 mb-2">Risk-adjusted triggers</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Volatility-scaled bands</li>
              <li>• Adapts to market conditions</li>
              <li>• More frequent in volatile periods</li>
              <li>• Sophisticated implementation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Techniques */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Advanced Portfolio Construction</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Machine Learning Applications</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Regime detection for TAA</li>
                <li>• Factor timing models</li>
                <li>• Covariance matrix estimation</li>
                <li>• Alternative data integration</li>
                <li>• Reinforcement learning optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">ESG Integration</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• ESG factor incorporation</li>
                <li>• Sustainable investing constraints</li>
                <li>• Impact measurement</li>
                <li>• Climate risk modeling</li>
                <li>• Transition pathway alignment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics & KPIs */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Key Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Risk-Adjusted Returns</h4>
            <div className="space-y-2 text-sm text-green-700">
              <div><strong>Sharpe Ratio:</strong> (R_p - R_f) / σ_p</div>
              <div><strong>Sortino Ratio:</strong> (R_p - R_f) / DD</div>
              <div><strong>Information Ratio:</strong> α / TE</div>
              <div><strong>Calmar Ratio:</strong> CAGR / MaxDD</div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Risk Metrics</h4>
            <div className="space-y-2 text-sm text-green-700">
              <div><strong>Value at Risk (VaR):</strong> Potential loss at confidence level</div>
              <div><strong>Expected Shortfall:</strong> Average loss beyond VaR</div>
              <div><strong>Maximum Drawdown:</strong> Peak-to-trough decline</div>
              <div><strong>Tracking Error:</strong> Standard deviation of excess returns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Tools & Platforms */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Implementation Tools & Platforms</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">Portfolio Visualizer</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Morningstar Direct</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Bloomberg Terminal</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">FactSet</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Python (PyPortfolioOpt)</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">R (PortfolioAnalytics)</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">MATLAB</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Axioma</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Barra</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Northfield</Badge>
        </div>
      </div>

      {/* Risk Considerations & Challenges */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Key Challenges & Considerations</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <strong className="text-yellow-800">Estimation Risk:</strong>
              <span className="text-yellow-700"> Parameter uncertainty in optimization</span>
            </div>
            <div>
              <strong className="text-yellow-800">Correlation Breakdown:</strong>
              <span className="text-yellow-700"> Assets correlate during crises</span>
            </div>
            <div>
              <strong className="text-yellow-800">Transaction Costs:</strong>
              <span className="text-yellow-700"> Rebalancing and implementation costs</span>
            </div>
            <div>
              <strong className="text-yellow-800">Behavioral Biases:</strong>
              <span className="text-yellow-700"> Investor psychology and discipline</span>
            </div>
            <div>
              <strong className="text-yellow-800">Regime Changes:</strong>
              <span className="text-yellow-700"> Structural market shifts</span>
            </div>
            <div>
              <strong className="text-yellow-800">Liquidity Constraints:</strong>
              <span className="text-yellow-700"> Market stress and redemptions</span>
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