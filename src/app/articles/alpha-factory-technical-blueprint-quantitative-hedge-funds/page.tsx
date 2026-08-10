'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';
import { Layers, Database, Cpu, Workflow, BarChart3, Server, Network, Zap, Clock, BoxSelect, AlertCircle, RefreshCw, ShieldCheck, HardDrive, Target, Anchor, ShieldAlert, Binary } from 'lucide-react';

export default function AlphaFactoryArticle() {
  return (
    <ArticleFrame slug="alpha-factory-technical-blueprint-quantitative-hedge-funds">
      <div className="pb-24">
        <InfographicSlot alt="Alpha Factory System Architecture Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section I. System Architecture */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">I. System Architecture</h2>
            </div>
            <p className="text-xl text-slate-500 dark:text-slate-400 italic mb-8 border-l-2 border-slate-200 dark:border-slate-800 pl-4 font-serif">
              The Hybrid Cloud Topology: Optimizing for both Latency and Capacity.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">The Hybrid Physical Topology</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              We cannot run everything in the Cloud due to latency, nor everything On-Prem due to cost. The architecture is split into two distinct zones connected by a secure leased line.
            </p>

            <ComparisonGrid>
              <ComparisonCard
                title="Zone A: Co-location (On-Prem)"
                tone="neutral"
              >
                <div className="flex items-start gap-3">
                  <HardDrive className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-bold mb-1">NY4 / NJ2 Data Centers</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Directly cross-connected to exchanges. C++ 20, FPGA, &lt; 5µs Latency.</p>
                  </div>
                </div>
              </ComparisonCard>
              <ComparisonCard
                title="Zone B: The Cloud (AWS/GCP)"
                tone="neutral"
              >
                <div className="flex items-start gap-3">
                  <Server className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-bold mb-1">Elastic Compute</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">For research, massive data storage, and non-latency sensitive tasks. Python, Kubernetes, Petabytes.</p>
                  </div>
                </div>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Logical Microservices</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The monolith is dead. The system is composed of specialized, single-responsibility engines communicating via high-performance messaging buses (Aeron / ZeroMQ).
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Ticker Plant" tone="neutral">
                <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                  <li>Protocol Normalization (SBE/FIX &rarr; Structs).</li>
                  <li>Book Building (L3 &rarr; L2 &rarr; L1).</li>
                  <li>Multicast Distribution to Strategy Engines.</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Alpha Engine" tone="neutral">
                <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                  <li>Receives normalized market data.</li>
                  <li>Computes features & runs inference.</li>
                  <li>Emits "Target Portfolios" (Not orders!).</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Risk Sidecar" tone="neg">
                <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                  <li>Pre-trade checks (&lt; 5µs).</li>
                  <li>Fat-finger limits.</li>
                  <li>Kill switch functionality locally.</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Smart Router (SOR)" tone="pos">
                <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                  <li>Takes target portfolio diffs.</li>
                  <li>Slices orders (TWAP/VWAP/POV).</li>
                  <li>Routes to specific venues (Dark vs Lit).</li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The Network Stack (Latency War)</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              In the co-location zone, the OS kernel is the enemy. Context switches cost microseconds. We bypass the kernel entirely using Solarflare/Mellanox (mapping NIC memory directly to user-space) and isolate specific CPU cores, disabling interrupts to prevent jitter.
            </p>
          </section>

          {/* Section II. The Data Foundation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">II. The Data Foundation</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The 3-Tier Storage Model optimizes for access patterns. Trading engines need nanoseconds; researchers need terabytes.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Tier 1: Hot (kdb+ / Redis)" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">In-memory. Last 24 hours of ticks. Used for live signals and real-time dashboards.</p>
              </ComparisonCard>
              <ComparisonCard title="Tier 2: Warm (Parquet / Delta)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">NVMe SSDs. Recent history (5 years). Used for daily retraining of models.</p>
              </ComparisonCard>
              <ComparisonCard title="Tier 3: Cold (S3 Glacier)" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Object Store. Full history (20+ years). Used for deep-dive research.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Point-in-Time Correctness (Bitemporality)</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Crucial for fundamental data. If a company restates earnings, the database changes, but your backtest must know what the value <strong>was</strong> on the trading day, not what it is now. We store both the "Valid From" (event time) and "Transaction Time" (knowledge time).
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Level 3 Order Book (Microstructure)</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              We don't just use price (L1). We reconstruct the full book (L3) from raw multicast messages (Add/Modify/Delete) to see the queue position of every order.
            </p>
          </section>

          {/* Section III. Machine Learning Design */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">III. Machine Learning Design</h2>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Modern quants use a hybrid approach, combining the interpretability of tree-based models with the feature-extraction power of deep learning.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="TabNet & ResNets" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Neural networks adapted for tabular data. Attention mechanisms select relevant features instance-wise.</p>
              </ComparisonCard>
              <ComparisonCard title="Graph Neural Networks (GNNs)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Used for supply chains. Stocks are nodes, relationships are edges. Shocks propagate through the graph.</p>
              </ComparisonCard>
              <ComparisonCard title="Transformer Encoders" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Applied to time-series (replacing LSTMs). Uses "Time2Vec" encodings to capture microstructure periodicities.</p>
              </ComparisonCard>
              <ComparisonCard title="Meta-Labeling" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">One model predicts the Side (Long/Short), while a secondary meta-model predicts the Probability of Success (Bet Size) to filter false positives.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Differentiable Sharpe Ratio Loss</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Standard loss functions optimize for accuracy, but we care about risk-adjusted returns. We implement differentiable versions of financial metrics directly into the neural network's backpropagation.
            </p>

            <FormulaPanel
              title="Sharpe Optimization Objective"
              formula="\mathcal{L} = - \frac{\mathbb{E}[R_p]}{\sigma_p + \epsilon}"
              legend={[
                { label: "\\mathcal{L}", value: "The loss to minimize (negative Sharpe)" },
                { label: "\\mathbb{E}[R_p]", value: "Expected batch portfolio return" },
                { label: "\\sigma_p", value: "Standard deviation of portfolio returns" },
                { label: "\\epsilon", value: "Small constant for numerical stability" }
              ]}
            />
          </section>

          {/* Section IV. Backtesting & Simulation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Workflow className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">IV. Backtesting & Simulation</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Retail backtests often use "Vectorized" calculations, which are fast but prone to look-ahead bias. Professional backtests use an <strong>Event-Driven</strong> loop that processes data one tick at a time, exactly mimicking the live execution environment. Your backtester code should share the same core logic as your live execution code.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Transaction Costs (Implementation Shortfall)</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The difference between "Paper Returns" and "Live Returns" is cost. We model this using the Square-Root Law of market impact.
            </p>

            <FormulaPanel
              title="Total Cost Model"
              formula="\text{Cost} = \frac{s}{2} + \sigma \cdot 0.1 \cdot \sqrt{\frac{Q}{V}}"
              legend={[
                { label: "s", value: "Bid-Ask Spread" },
                { label: "\\sigma", value: "Asset Volatility" },
                { label: "Q", value: "Order Quantity" },
                { label: "V", value: "Daily Traded Volume" }
              ]}
            />

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The 3 Sins of Simulation (Bias Detector)</h3>
            <ComparisonGrid>
              <ComparisonCard title="Survivorship Bias" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Testing only on stocks that exist today, missing failed companies like Enron. Fix: Use 'Delisted' datasets.</p>
              </ComparisonCard>
              <ComparisonCard title="Look-Ahead Bias" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Using data not available at the time of trade (e.g., trading at Open using the day's High). Fix: Lag all data.</p>
              </ComparisonCard>
              <ComparisonCard title="Restatement Bias" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Using current Macro data for past dates despite revisions. Fix: Point-in-Time (PIT) databases.</p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          {/* Section V. Risk & Convex Optimization */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">V. Risk & Convex Optimization</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              We don't pick stocks; we pick weights. The optimizer solves for the optimal weights $w$ that maximize expected return minus a risk penalty, subject to constraints.
            </p>

            <FormulaPanel
              title="Mean-Variance Objective"
              formula="\max_{w} \left( \mu^T w - \lambda w^T \Sigma w \right)"
              legend={[
                { label: "\\mu", value: "Expected Returns Vector (Alpha)" },
                { label: "w", value: "Target Portfolio Weights" },
                { label: "\\lambda", value: "Risk Aversion Parameter" },
                { label: "\\Sigma", value: "Covariance Matrix (Risk)" }
              ]}
            />

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Constraints</h3>
            <ComparisonGrid>
              <ComparisonCard title="Leverage Limits" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Gross Leverage: Sum of absolute weights. Typical Limit: 2.0x to 4.0x NAV. Limits blowout risk.</p>
              </ComparisonCard>
              <ComparisonCard title="Turnover Constraint" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Transaction costs eat alpha. Limits absolute weight changes between days to throttle trading speed.</p>
              </ComparisonCard>
              <ComparisonCard title="Neutrality" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Dollar Neutral (Longs=Shorts), Beta Neutral, and Sector Neutral limits macro exposure.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Tail Risk: VaR vs. CVaR</h3>
            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/30 min-w-0 shadow-sm">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-2 font-serif text-xl">Expected Shortfall</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                While Value at Risk (VaR) only tells you the 95th percentile worst outcome, Expected Shortfall (CVaR) averages the losses <em>in the tail</em>. We optimize for the "average day," but we survive based on CVaR. Furthermore, CVaR is mathematically convex, allowing it to be natively embedded in our optimization solver.
              </p>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}