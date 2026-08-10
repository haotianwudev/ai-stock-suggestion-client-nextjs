'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';
import { TrendingUp, Layers, Database, Calculator, Activity, PieChart, BarChart2, Scale, ShieldAlert, Code, Maximize2, Minimize2 } from 'lucide-react';

export default function DirectIndexingTaxLossHarvestingTutorial() {
  return (
    <ArticleFrame slug="direct-indexing-tax-loss-harvesting-algorithmic-mechanics">
      <div className="pb-24">
        <InfographicSlot alt="Direct Indexing & Tax-Loss Harvesting Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1: Core Foundations */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Core Foundations</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Tax-Loss Harvesting (TLH) is the systematic practice of selling securities at a loss to offset capital gains tax liabilities. While simple in concept, the <strong>quantitative edge</strong> comes from <em>Direct Indexing</em>—owning the 500+ underlying stocks of an index rather than a single ETF wrapper. This granularity transforms a "flat" market return into a rich source of harvestable volatility.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <Layers className="w-5 h-5 text-slate-400" /> The Three Pillars of Tax Alpha
            </h3>
            
            <ComparisonGrid>
              <ComparisonCard title="1. Tax Deferral" tone="pos">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">The "Interest-Free Loan"</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">By realizing a loss today, you reduce your current tax bill. You invest those tax savings. Even if you pay the tax later, the <em>growth</em> on that saved money is yours to keep.</p>
              </ComparisonCard>
              <ComparisonCard title="2. Rate Arbitrage" tone="pos">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">STCG vs. LTCG</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Short-term gains are taxed as ordinary income. Long-term gains are taxed lower. Harvesting losses to offset short-term gains effectively converts high-tax income into low-tax growth.</p>
              </ComparisonCard>
              <ComparisonCard title="3. Forgiveness" tone="pos">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Permanent Elimination</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">If assets are held until death (Step-up in Basis) or donated to charity, the deferred tax liability is wiped out completely.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <Database className="w-5 h-5 text-slate-400" /> The Mechanics: HIFO Accounting
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              To maximize efficiency, we must strictly use <strong>Highest In, First Out (HIFO)</strong> accounting. We cherry-pick specific shares to sell.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-10">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Scenario: You own 2 lots of AAPL</h4>
              <ul className="space-y-2 font-mono text-sm text-slate-600 dark:text-slate-400 mb-6">
                <li className="flex justify-between"><span>Lot A (Bought Jan)</span><span>$150 Cost Basis</span></li>
                <li className="flex justify-between"><span>Lot B (Bought Feb)</span><span>$100 Cost Basis</span></li>
                <li className="flex justify-between font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]"><span>Current Price</span><span>$110</span></li>
              </ul>
              
              <ComparisonGrid>
                <ComparisonCard title="FIFO / Average Cost" tone="neg">
                  <div className="flex justify-between font-bold text-[#BC4128] dark:text-[#E2694A] mb-1">
                    <span>Sells a mix</span><span>-$15 Loss</span>
                  </div>
                  <p className="text-xs text-slate-500">($110 - $125 Avg) = Small benefit.</p>
                </ComparisonCard>
                <ComparisonCard title="HIFO Strategy" tone="pos">
                  <div className="flex justify-between font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                    <span>Sells Lot A</span><span>-$40 Loss</span>
                  </div>
                  <p className="text-xs text-slate-500">Explicitly sells Lot A. ($110 - $150). <strong>2.6x more tax alpha.</strong></p>
                </ComparisonCard>
              </ComparisonGrid>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <Calculator className="w-5 h-5 text-slate-400" /> The Economic Value Equation
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              A $1,000 loss harvested today at a 40% tax rate isn't just $400 in savings. It is the compound growth of that $400 over time (Tax Deferral) plus the difference in tax rates (Rate Arbitrage).
            </p>

            <FormulaPanel
              title="Total Value of Harvesting"
              formula="V_{total} = T_s \cdot L + (T_s \cdot L)((1+r)^n - 1) - T_f \cdot L"
              legend={[
                { label: "V_{total}", value: "Total Value of Harvesting" },
                { label: "T_s \cdot L", value: "Immediate Credit (Current Tax Rate * Loss)" },
                { label: "(T_s \cdot L)((1+r)^n - 1)", value: "Deferral Value (Growth over n years)" },
                { label: "T_f \cdot L", value: "Future Liability (Future Tax Rate * Loss)" }
              ]}
            />
            
            <div className="mt-8 p-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-lg flex items-start gap-3">
              <Activity className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-900 dark:text-indigo-200">
                <strong>The "Basis Gap" Trap:</strong> Every harvested loss lowers your portfolio's cost basis. Over time, your basis becomes very low compared to market value, reducing future harvesting opportunities. This is known as <em>Tax Alpha Decay</em>.
              </p>
            </div>
          </section>

          {/* Section 2: Factor Models */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <PieChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Factor Risk Models & Substitutions</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              In a Wash Sale scenario, we must sell a loser (e.g., AAPL) and cannot buy it back for 31 days. To prevent the portfolio from drifting away from the benchmark (S&P 500), we must buy a <strong>substitute</strong>.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-slate-400" /> The Substitution Problem: Naive vs. Optimized
            </h3>
            
            <div className="overflow-x-auto bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 mb-10 p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                A single stock rarely matches another perfectly. Replacing AAPL with just "MSFT" leaves exposure gaps. We need an <strong>Optimized Basket Substitute</strong>.
              </p>
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="pb-3">Factor Exposure</th>
                    <th className="pb-3 text-[#BC4128] dark:text-[#E2694A]">Sold: AAPL</th>
                    <th className="pb-3 text-slate-400">Naive: MSFT</th>
                    <th className="pb-3 text-[#1D8A70] dark:text-[#3CBF9C]">Optimized Basket*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300">Sector (Tech)</td>
                    <td className="py-3">1.0</td>
                    <td className="py-3">1.0</td>
                    <td className="py-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">1.0</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300">Growth</td>
                    <td className="py-3">0.85</td>
                    <td className="py-3 text-slate-400">0.60</td>
                    <td className="py-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">0.84</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300">Momentum</td>
                    <td className="py-3">0.40</td>
                    <td className="py-3 text-slate-400">0.10</td>
                    <td className="py-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">0.38</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300">Volatility</td>
                    <td className="py-3">0.90</td>
                    <td className="py-3 text-slate-400">0.70</td>
                    <td className="py-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">0.91</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-slate-500 mt-4 text-center">
                *The Optimized Basket might be: 40% MSFT + 30% GOOG + 20% NVDA + 10% V (Hypothetical)
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" /> Structural Risk Models
            </h3>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              We quantify this relationship using a <strong>Factor Risk Model</strong> (e.g., Barra, Axioma). This allows us to decompose the Covariance Matrix into manageable components.
            </p>

            <FormulaPanel
              title="The Structural Risk Equation"
              formula="\Sigma = \mathbf{B} \Omega \mathbf{B}^T + \Delta"
              legend={[
                { label: "\\Sigma", value: "Covariance Matrix (Risk)" },
                { label: "\\mathbf{B} \\Omega \\mathbf{B}^T", value: "Systematic Risk (Factor loadings * Covariance)" },
                { label: "\\Delta", value: "Idiosyncratic Risk (Stock-specific noise)" }
              ]}
            />
            
            <ComparisonGrid>
              <ComparisonCard title="Systematic Risk (Factor)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Common drivers of return (Market, Sector, Style). In Direct Indexing, we aim to keep deviation near zero relative to the benchmark.</p>
              </ComparisonCard>
              <ComparisonCard title="Idiosyncratic Risk (Specific)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Risk unique to the company (e.g., earnings call). We <em>accept</em> small deviations here to harvest losses, relying on diversification.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <Scale className="w-5 h-5 text-slate-400" /> Active Risk Constraints
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              To prevent the optimizer from making unintended bets (e.g., accidentally becoming "Anti-Value"), we set strict bounds on Active Exposure.
            </p>
            <div className="bg-slate-900 p-6 rounded-xl font-mono text-sm text-slate-300 mb-8 border border-slate-800">
              <div className="text-[#1D8A70] dark:text-[#3CBF9C] mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Constraint Configuration
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span>Factor_Exposure(Port) ≈ Factor_Exposure(Bench)</span>
                </div>
                <div className="flex justify-between">
                  <span>| β_port - β_bench |</span>
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C]">&lt; 0.05</span>
                </div>
                <div className="flex justify-between">
                  <span>| Sector_tech% - Bench_tech% |</span>
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C]">&lt; 1.0%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Mathematical Optimization */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Mathematical Optimization</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              We model the portfolio construction problem as a <strong>Quadratic Program (QP)</strong>. The solver must find the optimal trade vectors that balance three competing forces: Tracking Error, Tax Benefits, and Transaction Costs.
            </p>

            <FormulaPanel
              title="QP Formulation (Objective Function)"
              formula="\min_{\mathbf{w}} \left( (\mathbf{w} - \mathbf{w}_b)^T \Sigma (\mathbf{w} - \mathbf{w}_b) - \lambda_{tax} \mathbf{\alpha}^T (\mathbf{w}_0 - \mathbf{w}) + \lambda_{cost} \mathbf{c}^T |\mathbf{w} - \mathbf{w}_0| \right)"
              legend={[
                { label: "(\mathbf{w} - \mathbf{w}_b)^T \Sigma (\mathbf{w} - \mathbf{w}_b)", value: "Risk Penalty: Minimize Tracking Error" },
                { label: "\lambda_{tax} \mathbf{\alpha}^T (\mathbf{w}_0 - \mathbf{w})", value: "Tax Utility: Maximize Realized Losses" },
                { label: "\lambda_{cost} \mathbf{c}^T |\mathbf{w} - \mathbf{w}_0|", value: "Transaction Costs: Minimize Turnover" }
              ]}
            />
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <Minimize2 className="w-5 h-5 text-slate-400" /> Constraint Matrix
            </h3>
            
            <ComparisonGrid>
              <ComparisonCard title="Budget & Long-Only" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Portfolio must be fully invested (no cash drag) and cannot short stocks. Sum of weights = 1.0, w ≥ 0.</p>
              </ComparisonCard>
              <ComparisonCard title="Factor Exposure Bounds" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Limit active exposure to any single risk factor or Sector to be within a tight tolerance (e.g., +/- 2%).</p>
              </ComparisonCard>
              <ComparisonCard title="Wash Sale (Path Dependent)" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">If stock was sold for a loss in the last 30 days, we cannot increase its weight. <em>Requires pre-processing Buy List.</em></p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          {/* Section 4: Implementation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Code className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Algorithmic Implementation</h2>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Data Structures: The Tax Lot</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The core data unit is not the stock, but the <strong>Tax Lot</strong>. A single position in AAPL might consist of 50 distinct lots bought at different times/prices.
            </p>

            <div className="bg-slate-900 rounded-xl overflow-hidden mb-10 border border-slate-800">
              <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-700 flex justify-between">
                <span>TaxLot.ts</span>
              </div>
              <pre className="p-6 text-sm font-mono text-indigo-300 overflow-x-auto">
{`interface TaxLot {
  id: string;              // Unique Lot ID
  ticker: string;          // e.g., "AAPL"
  shares: number;          // Quantity
  cost_basis_per_share: number; 
  purchase_date: string;   // ISO Date
  market_value: number;    // Real-time value
  unrealized_pl: number;   // (Price - Basis) * Shares
  is_wash_sale_restricted: boolean; // Computed daily
  is_long_term: boolean;   // > 365 days held
}`}
              </pre>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">The Scan-and-Optimize Workflow</h3>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Daily Ingestion:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Load all current tax lots, cash balance, and benchmark weights (e.g., SPY holdings). Calculate unrealized P&L and Wash Sale flags.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Opportunity Filtering:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Identify lots with losses exceeding threshold (e.g., loss &gt; $2,000 OR loss &gt; 5%).</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Construct Constraints:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Build the constraint matrices for the QP solver, incorporating wash sale blocks.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Solve & Trade Generation:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Run the solver to generate target weights. Diff(Target - Current) = Trades. Send Sell orders as 'Specific Lot ID'.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 5: Strategy & Realities */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Realities & Alpha Decay</h2>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">The Lifecycle of Tax Alpha</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Tax Alpha is a depleting asset. In a rising market, your cost basis stays fixed while prices rise. Eventually, you run out of losses to harvest. 
            </p>
            
            <ComparisonGrid>
              <ComparisonCard title="The Decay Curve" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Years 1-3 yield high tax alpha. Years 4-7 it degrades. Years 7+ it becomes negligible as the portfolio is steeped in gains.</p>
              </ComparisonCard>
              <ComparisonCard title="The Antidote: Continuous Cash" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">To sustain Tax Alpha, add fresh cash regularly. New cash buys stocks at current high prices, resetting basis and creating new harvesting opportunities.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Operational Pitfalls</h3>
            <ComparisonGrid>
              <ComparisonCard title="The 'Cash Drag' Silent Killer" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Holding uninvested cash during a bull market is expensive. Missing 10% returns on 5% cash loses 0.50% performance. Use tight optimizer cash limits.</p>
              </ComparisonCard>
              <ComparisonCard title="Corporate Action Nightmares" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Spin-offs and mergers cause lots to split. Bad data feeds miss these details, leading to "phantom" gains or incorrect tax filings.</p>
              </ComparisonCard>
            </ComparisonGrid>

          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}