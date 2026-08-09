'use client';

import React from 'react';
import { TrendingUp, Scale, Brain, ShieldCheck, Globe, Server, Activity, AlertTriangle, CheckCircle, ArrowRight, PieChart, Users, Layers, Zap, Building2, Briefcase, GitMerge, Network } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function BlackLittermanGuide() {
  return (
    <ArticleFrame slug="black-litterman-model-comprehensive-guide-portfolio-optimization">
      <div className="pb-24">
        <InfographicSlot alt="Black-Litterman Model Infographic" />

        <main className="max-w-4xl mx-auto py-16">
          {/* 1. Introduction */}
          <section id="intro">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Evolution of Allocation</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">From the Efficient Frontier to Bayesian Beliefs.</p>
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Modern Portfolio Theory (MPT) began in 1952 with <strong>Harry Markowitz</strong>. He revolutionized finance by mathematically defining diversification: it wasn't just about holding many stocks, but holding stocks that don't move together. This created the <strong>Efficient Frontier</strong>—the set of portfolios that offer the highest return for a given level of risk.
              </p>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">The "Error Maximization" Trap</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Despite winning a Nobel Prize, MVO (Mean-Variance Optimization) had a fatal flaw in practice. Richard Michaud famously labeled it an <strong>"Error Maximizer"</strong>.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="text-rose-500 font-bold mb-2">1. Input Sensitivity</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      A tiny 0.1% change in expected return can flip a portfolio from 0% to 50% allocation in an asset. The math is precise, but the inputs are guesses.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="text-rose-500 font-bold mb-2">2. The Prediction Problem</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      MVO assumes we know future returns with certainty. In reality, historical mean returns are terrible predictors of the future.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="text-rose-500 font-bold mb-2">3. Unintuitive Weights</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Standard optimizers often suggest extreme long/short positions (corner solutions) that no sane manager would implement.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                By 1990, Goldman Sachs traders Fischer Black and Robert Litterman realized they needed a model that respected the market's collective wisdom while allowing for subtle active management. They moved from asking <em>"What is the absolute return?"</em> to asking <em>"How different are we from the market?"</em>
              </p>

              <ComparisonGrid>
                <ComparisonCard title="The Problem: Corner Solutions" tone="neg">
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Standard optimizers act like "unintelligent amplifiers." If you estimate Microsoft will return 10.1% and Apple 10.0%, MVO might tell you to short Apple to buy more Microsoft.</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Result: Portfolios that are impossible to implement, high turnover, and extreme concentration.</p>
                </ComparisonCard>
                <ComparisonCard title="The Solution: Black-Litterman (1990)" tone="pos">
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Instead of starting from "zero knowledge," BL assumes the market is in equilibrium (CAPM). It then tilts the portfolio based on investor <strong>Confidence</strong>.</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Result: Stable, diversified portfolios anchored to the market weights.</p>
                </ComparisonCard>
              </ComparisonGrid>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800 my-16" />

          {/* 2. Mathematical Core */}
          <section id="math">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Mathematical Formulation</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">The Bayesian engine under the hood.</p>
              </div>
            </div>

            <div className="space-y-12">
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                The Black-Litterman model is essentially a <strong>Bayesian shrinkage estimator</strong>. It shrinks your subjective views towards the market equilibrium. The math can be intimidating, but it follows a logical four-step process: Prior (Market) + Likelihood (Views) = Posterior (Result) &rarr; Weights.
              </p>

              {/* Step 1: The Prior */}
              <div className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">The Market Prior (Reverse Optimization)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Reverse-engineering what the market is thinking.</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">We assume the market is efficient. Therefore, the current market capitalization weights (w<sub>mkt</sub>) must be optimal relative to some expected returns. We solve for these returns (Π).</p>
                
                <FormulaPanel 
                  title="Implied Equilibrium Returns"
                  formula="\Pi = \delta \Sigma w_{mkt}"
                  legend={[
                    { label: "Π", value: "Implied Equilibrium Returns Vector" },
                    { label: "δ", value: "Risk Aversion Coefficient" },
                    { label: "Σ", value: "Covariance Matrix" },
                    { label: "w_{mkt}", value: "Market Capitalization Weights" }
                  ]}
                />
              </div>

              {/* Step 2: The Views */}
              <div className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Modeling the Views (P, Q, and Ω)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Quantifying subjective opinions.</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Views are expressed as <strong>P · E[R] = Q + ε</strong>, where ε is the error term.</p>
                
                <div className="overflow-x-auto border rounded-lg border-slate-200 dark:border-slate-800 mb-6">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-4 py-2">Variable</th>
                        <th className="px-4 py-2">Dimensions</th>
                        <th className="px-4 py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">P</td>
                        <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">K x N</td>
                        <td className="px-4 py-3"><strong>Selection Matrix.</strong> Identifies which assets are involved in each of the <em>K</em> views.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">Q</td>
                        <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">K x 1</td>
                        <td className="px-4 py-3"><strong>View Vector.</strong> The expected return for each view (e.g., "5%" or 0.05).</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">Ω</td>
                        <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">K x K</td>
                        <td className="px-4 py-3"><strong>Uncertainty Matrix (Diagonal).</strong> The variance of the error term ε. Represents how unsure you are of your own view.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step 3: The Master Formula */}
              <div className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">The Master Formula (Posterior)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">The Generalized Least Squares (GLS) estimator.</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">We combine the Market Prior with Investor Views. The result (E[R]) is a weighted average of the Implied Returns (Π) and the Views (Q), weighted by their respective precisions (inverse variances).</p>
                
                <FormulaPanel 
                  title="Posterior Expected Returns"
                  formula="E[R] = [(\tau\Sigma)^{-1} + P^T\Omega^{-1}P]^{-1} [(\tau\Sigma)^{-1}\Pi + P^T\Omega^{-1}Q]"
                  legend={[
                    { label: "E[R]", value: "New Expected Returns Vector" },
                    { label: "τ", value: "Scalar indicating uncertainty of the prior" }
                  ]}
                />
              </div>

              {/* Step 4: Final Weights */}
              <div className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Final Portfolio Weights</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Turning returns into allocations.</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Now that we have stable expected returns (E[R]) and a posterior covariance matrix (Σ<sub>post</sub>), we run the standard unconstrained maximization.</p>
                
                <FormulaPanel 
                  title="Optimal Weights"
                  formula="w^* = (\delta\Sigma_{post})^{-1} E[R]"
                  legend={[
                    { label: "w^*", value: "Optimal Weights Vector" },
                    { label: "Σ_{post}", value: "Posterior Covariance Matrix" }
                  ]}
                />
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800 my-16" />

          {/* 4. Implementation Guide */}
          <section id="implementation">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Implementation Logic</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">Step-by-Step Workflow for Developers</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[1.25rem] top-8 bottom-8 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-lg">1</div>
                    <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 my-2"></div>
                  </div>
                  <div className="pb-12 w-full">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Data Ingestion</h4>
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-400">
                      <p className="mb-2">Gather historical prices for your universe (N assets). Calculate the <strong>Covariance Matrix (Σ)</strong> and the current <strong>Market Capitalization Weights (w)</strong>.</p>
                      <div className="text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded text-slate-800 dark:text-slate-200">Input: Price_History[T, N], Market_Caps[N]</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-lg">2</div>
                    <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 my-2"></div>
                  </div>
                  <div className="pb-12 w-full">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Reverse Optimization</h4>
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-400">
                      <p className="mb-2">Determine the risk aversion coefficient (δ). Usually derived from the Market Risk Premium (MRP) / Market Variance.</p>
                      <p>Calculate Implied Equilibrium Returns: <code>Pi = delta * Sigma * weights</code>.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-lg">3</div>
                    <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 my-2"></div>
                  </div>
                  <div className="pb-12 w-full">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Define Views</h4>
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-400">
                      <p className="mb-2">Construct the P matrix (N x K) and Q vector (K x 1) where K is the number of views.</p>
                      <p><strong>Crucial Step:</strong> Set Ω. A common heuristic is the <em>Idzorek Method</em>, where a user specifies a % confidence (0-100%), which is then mapped mathematically to variance.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-lg">4</div>
                    <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 my-2"></div>
                  </div>
                  <div className="pb-12 w-full">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Bayesian Update</h4>
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-400">
                      <p className="mb-2">Apply the Master Formula to generate the posterior Expected Returns vector (E) and posterior Covariance.</p>
                      <div className="text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded text-slate-800 dark:text-slate-200">Output: New_Exp_Returns[N], New_Covariance[N,N]</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-lg">5</div>
                  </div>
                  <div className="pb-12 w-full">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Final Optimization</h4>
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-400">
                      <p className="mb-2">Feed the <strong>New Expected Returns</strong> and <strong>New Covariance</strong> into a standard Mean-Variance Optimizer to get final weights.</p>
                      <p>The result will be a portfolio that tilts away from the benchmark only where you had strong views.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800 my-16" />

          {/* 5. Institutional Usage */}
          <section id="usage">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Institutional Adoption</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">The Operating System of Modern Finance.</p>
              </div>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-10">
              The Black-Litterman model is not just an academic curiosity; it is the standard engine for <strong>Global Tactical Asset Allocation (GTAA)</strong>. It allows institutions to process vast amounts of alternative data (satellite imagery, credit card flows) into a cohesive portfolio without triggering excessive turnover.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Goldman Sachs" tone="neutral">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Strategy: Global Tactical Asset Allocation</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">GSAM uses BL to blend macro-economic views across disparate asset classes.</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">The "Zero View" Advantage: BL allows GS to hold assets at market weight automatically when there is no view, drastically reducing model risk.</p>
              </ComparisonCard>
              <ComparisonCard title="BlackRock" tone="neutral">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Strategy: Human-Machine Integration</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Used within the "Aladdin" platform to blend fundamental analyst ratings with quantitative signals.</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Scenario Analysis: Tests "What if Inflation hits 5%?" by inputting a 100% confidence view, propagating this shock across all asset classes.</p>
              </ComparisonCard>
              <ComparisonCard title="Vanguard" tone="neutral">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Strategy: Signal Shrinkage</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Vanguard uses BL to "tame" aggressive machine learning signals.</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Low-Cost Alpha: Forces the ML signal to have "extraordinary evidence" before deviating from the low-cost index, minimizing transaction costs.</p>
              </ComparisonCard>
              <ComparisonCard title="Wealthfront / Betterment" tone="neutral">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Strategy: Direct Indexing</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Democratizing advanced allocation for retail accounts.</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Personalization at Scale: If a user works at Google, BL sets a "-100% weight" view on GOOG, and automatically re-optimizes the tech sector to maintain the same beta without that single stock.</p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800 my-16" />

          {/* 6. Modern Extensions */}
          <section id="extensions">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Modern Extensions</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">Beyond the Gaussian World: Entropy and Factors.</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2 font-serif">1. Entropy Pooling (The Generalization)</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Attilio Meucci (2008)</p>
                
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">Classic BL is actually a special case of a broader framework called <strong>Entropy Pooling</strong>. While BL assumes all assets follow a Normal Distribution, Entropy Pooling makes no assumptions. It allows you to input views on <em>anything</em>: Volatility, Skewness, or Tail Risk.</p>
                
                <FormulaPanel 
                  title="The Core Math: KL Divergence"
                  formula="\text{argmin}_p \sum p_j [ \ln(p_j) - \ln(m_j) ]"
                />
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white block mb-1">Why it matters</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">You can express non-linear views like: "I believe there is a 30% chance the market crashes by more than 20%." Standard BL cannot handle this "Tail View."</p>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white block mb-1">The Result</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">A full posterior distribution (typically a histogram of Monte Carlo simulations) rather than just a Mean and Covariance matrix.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2 font-serif">2. Factor-Based Black-Litterman</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Viewing the world through Drivers, not Assets.</p>
                
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">Instead of having views on "Apple" or "Google", quants often have views on <strong>Factors</strong> (Value, Momentum, Inflation, GDP). We project these views onto the assets using a factor loading matrix (B).</p>
                
                <FormulaPanel 
                  title="Factor View Projection"
                  formula="Q_{assets} = B \cdot Q_{factors}"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2 font-serif">3. AI Integration (Dynamic Omega)</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Using Neural Networks to calibrate Confidence.</p>
                
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">The weakest link in BL is the human "Confidence" parameter (Ω). Modern funds use <strong>Bayesian Neural Networks (BNNs)</strong> or <strong>Dropout</strong> in Deep Learning to estimate this.</p>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800/50">
                  <p className="text-sm text-indigo-800 dark:text-indigo-200 italic leading-relaxed">"If the AI model is volatile/uncertain in its prediction, BL automatically ignores the view and reverts to the index. It acts as an automatic kill-switch for bad AI predictions."</p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800 my-16" />

          {/* 7. Pros and Cons */}
          <section id="summary">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Critical Evaluation</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">Why use it? Why avoid it?</p>
              </div>
            </div>

            <ComparisonGrid>
              <ComparisonCard title="Intuitive Allocation" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">Avoids extreme corner solutions; portfolios look "reasonable".</p>
              </ComparisonCard>
              <ComparisonCard title="Stability" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">Small changes in views don't cause massive turnover.</p>
              </ComparisonCard>
              <ComparisonCard title="Explicit Confidence" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">Forces managers to quantify their uncertainty (Ω).</p>
              </ComparisonCard>
              <ComparisonCard title="Complexity" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Requires matrix algebra and specialized software. Harder to explain to retail clients.</p>
              </ComparisonCard>
              <ComparisonCard title="CAPM Reliance" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Assumes market is initially efficient. If there is a massive bubble, the "Anchor" is flawed.</p>
              </ComparisonCard>
              <ComparisonCard title="Parameter Sensitivity" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Incorrect calibration of τ or Ω can negate the benefits.</p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800 my-16" />

          {/* Comparisons Table */}
          <section className="overflow-x-auto pb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <PieChart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Comparison Data</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">Evolution of Portfolio Models</p>
              </div>
            </div>
            
            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm text-sm border border-slate-200 dark:border-slate-800">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
                  <th className="p-4 border-b border-slate-200 dark:border-slate-800">Feature</th>
                  <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Mean-Variance (1952)</th>
                  <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-300 font-bold">Black-Litterman (1990)</th>
                  <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Entropy Pooling (2008)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Philosophy</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800">"Data is Truth"</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-900/10 font-medium text-indigo-900 dark:text-indigo-300">"Market is Truth"</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800">"Information Distance"</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Inputs</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800">Historical Mean/Covariance</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-900/10 font-medium text-indigo-900 dark:text-indigo-300">CAPM Prior + Linear Views</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800">Prior PDF + General Views</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Optimization</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800">Quadratic Programming</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-900/10 font-medium text-indigo-900 dark:text-indigo-300">Bayesian Update</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800">KL-Divergence Min</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Weakness</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-rose-500">Error Maximization</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-900/10 font-medium text-indigo-900 dark:text-indigo-300">Normality Assumption</td>
                  <td className="p-4 border-l border-slate-200 dark:border-slate-800">Computational Complexity</td>
                </tr>
              </tbody>
            </table>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}