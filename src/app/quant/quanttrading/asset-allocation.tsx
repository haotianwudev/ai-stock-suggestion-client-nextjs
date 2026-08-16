import { PieChart, TrendingUp, Shield, Target, Layers, AlertTriangle, Compass, Globe } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getQuantTopicConfig } from "./config";

export function AssetAllocationContent() {
  const config = getQuantTopicConfig('asset-allocation');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={PieChart}>
      <div className="space-y-8">
        {/* 1. Allocation Approaches */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Allocation Approaches" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]"><Target className="h-4 w-4" /> Strategic Asset Allocation (SAA)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Long-term target allocations based on risk tolerance and investment horizon.</p>
              <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1 list-disc list-inside">
                <li>Set target percentages for each asset class</li>
                <li>Rebalance periodically to maintain targets</li>
                <li>Focus on long-term expected returns and risk</li>
                <li>Typically reviewed annually or bi-annually</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]"><TrendingUp className="h-4 w-4" /> Tactical Asset Allocation (TAA)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Short-term deviations from strategic targets based on market conditions.</p>
              <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1 list-disc list-inside">
                <li>Adjust allocations based on market outlook</li>
                <li>Exploit temporary market inefficiencies</li>
                <li>Return to strategic allocation over time</li>
                <li>Requires active monitoring and expertise</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]"><Shield className="h-4 w-4" /> Risk Parity</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Equal risk contribution from each asset class or factor.</p>
              <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1 list-disc list-inside">
                <li>Weight assets by inverse volatility</li>
                <li>Diversify risk rather than capital</li>
                <li>All Weather portfolio approach</li>
                <li>Better diversification in crisis periods</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]"><Layers className="h-4 w-4" /> Smart Beta Factor Allocation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Systematic exposure to risk factors and expected premiums.</p>
              <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1 list-disc list-inside">
                <li>Value, momentum, quality, size factors</li>
                <li>Low volatility and profitability premiums</li>
                <li>Smart beta and factor ETF implementation</li>
                <li>Evidence-based factor selection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Smart Beta Factor Investing */}
        <SectionCard title="Smart Beta Factor Investing" icon={Layers} tone="accent">
          <p>
            Smart Beta combines the benefits of passive indexing with active management by systematically tilting
            portfolios toward specific risk factors that have historically delivered excess returns.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 not-prose">
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Value Factor</h5>
              <p className="text-xs text-gray-500 dark:text-gray-500">Low P/E, P/B ratios outperform over long term</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Quality Factor</h5>
              <p className="text-xs text-gray-500 dark:text-gray-500">High ROE, low debt, stable earnings</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Momentum Factor</h5>
              <p className="text-xs text-gray-500 dark:text-gray-500">Recent winners continue outperforming</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Low Volatility</h5>
              <p className="text-xs text-gray-500 dark:text-gray-500">Lower risk stocks with better risk-adjusted returns</p>
            </div>
          </div>
        </SectionCard>

        {/* 3. Portfolio Optimization Techniques */}
        <SectionCard title="Portfolio Optimization Techniques" icon={Target} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4>Mean-Variance Optimization</h4>
              <ul>
                <li>Efficient frontier construction</li>
                <li>Risk-return trade-off analysis</li>
                <li>Sharpe ratio maximization</li>
                <li>Covariance matrix estimation</li>
              </ul>
              <p className="text-xs"><strong>Formula:</strong> max w&apos;μ − (λ/2)w&apos;Σw</p>
            </div>
            <div>
              <h4>Black-Litterman Model</h4>
              <ul>
                <li>Market equilibrium assumptions</li>
                <li>Investor views incorporation</li>
                <li>Uncertainty quantification</li>
                <li>Stable portfolio weights</li>
              </ul>
              <p className="text-xs"><strong>Advantage:</strong> Addresses MVO instability</p>
            </div>
            <div>
              <h4>Risk Budgeting</h4>
              <ul>
                <li>Equal risk contribution (ERC)</li>
                <li>Risk parity implementation</li>
                <li>Marginal risk contribution</li>
                <li>Component risk decomposition</li>
              </ul>
              <p className="text-xs"><strong>Goal:</strong> RC_i = (1/N) × σ_p for all i</p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Common Pitfalls */}
        <SectionCard title="Common Pitfalls" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>MVO&apos;s estimation-error sensitivity:</strong> Mean-variance optimization is notoriously sensitive to small errors in expected-return inputs — tiny changes can flip the &quot;optimal&quot; portfolio dramatically, which is exactly the instability the Black-Litterman model was built to fix.</li>
            <li><strong>Chasing recent performance:</strong> Tactical shifts made after a factor or asset class has already run hot tend to buy in late — the same behavioral trap that hurts individual stock-pickers, just at the portfolio level.</li>
            <li><strong>Rebalancing costs &amp; tax drag:</strong> Frequent rebalancing to stay perfectly on-target generates transaction costs and, in taxable accounts, realized capital gains — the &quot;optimal&quot; weights on paper aren&apos;t optimal after those frictions.</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Systematic Strategies</h4>
                <p>
                  For combining multiple systematic strategies into one diversified system — see{" "}
                  <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Systematic Strategies</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Globe className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Macro Analysis</h4>
                <p>
                  Tactical allocation shifts (TAA) are driven by macro regime views — see{" "}
                  <Link href="/stock/investment/macro-analysis" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Macro Analysis</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
