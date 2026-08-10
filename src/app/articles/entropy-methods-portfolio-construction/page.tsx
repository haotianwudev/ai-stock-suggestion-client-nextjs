'use client';

import React from 'react';
import { TrendingUp, Network, BarChart4, Layers, CheckCircle2, AlertTriangle, Lightbulb, Cpu, Activity, ChevronRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function EntropyMethodsPortfolioConstruction() {
  return (
    <ArticleFrame slug="entropy-methods-portfolio-construction">
      <div className="pb-24">
        <InfographicSlot alt="Entropy Methods in Portfolio Construction Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1: Evolution of MPT */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Genesis &amp; Evolution of MPT</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  The mathematical architecture of portfolio construction has undergone a profound evolution over the past seven decades. The journey highlights the continuous struggle to bridge the gap between elegant mathematical theory and the noisy, asymmetric, and non-stationary realities of global financial markets.
                </p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">The Mean-Variance Paradigm</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Introduced by Harry Markowitz in 1952, Modern Portfolio Theory (MPT) formalized the concept of investment diversification. It posited that an asset's risk and return must be assessed by how its variance and covariance contribute to the aggregate portfolio, allowing investors to construct an "efficient frontier" of optimal portfolios.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h4 className="font-serif text-xl flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" />
                    Empirical Fragility
                  </h4>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                      <div>
                        <strong className="block text-white mb-1">Estimation Error</strong>
                        Hyper-sensitive to input parameters, behaving as an "error maximizer".
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                      <div>
                        <strong className="block text-white mb-1">Normality Assumption</strong>
                        Structurally assumes symmetric, multivariate normal distribution.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                      <div>
                        <strong className="block text-white mb-1">Covariance Instability</strong>
                        Real-world correlations are volatile and converge toward one during crises.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Black-Litterman */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <Network className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Bayesian Bridge: Black-Litterman</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  To resolve extreme asset concentration, Fischer Black and Robert Litterman introduced the Black-Litterman (BL) model in 1990. It applies Bayesian statistical theory, blending a neutral baseline forecast with subjective tactical views.
                </p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">Reverse Optimization</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Instead of relying on historical mean returns, the BL model derives an "equilibrium prior" through reverse-optimization of the CAPM market capitalization equilibrium, extracting implied returns (Π).
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl h-full">
                  <h4 className="font-serif text-xl flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                    <Layers className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                    Limitations
                  </h4>
                  <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <div>
                        <strong className="block text-slate-900 dark:text-slate-200 mb-1">Gaussian Straitjacket</strong>
                        Relies on the assumption that market prior and views are normally distributed.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <div>
                        <strong className="block text-slate-900 dark:text-slate-200 mb-1">Constraint Inflexibility</strong>
                        Cannot process views on volatility or tail risks.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <div>
                        <strong className="block text-slate-900 dark:text-slate-200 mb-1">Arbitrary Confidence Matrix</strong>
                        Assigns numerical variances based on heavy discretion.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Entropy Paradigm */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Entropy Paradigm</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              To transcend the limitations of parametric normality, financial researchers turned to thermodynamics and communication theory. Edwin T. Jaynes established the <strong className="text-slate-900 dark:text-white">Principle of Maximum Entropy (MaxEnt)</strong> in 1957, positing that the most rational choice for an unknown probability distribution is the one that maximizes information entropy subject to known constraints—remaining unbiased regarding what is not explicitly known.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12 min-w-0">
              <FormulaPanel 
                title="Shannon Entropy"
                formula="H(w) = - \sum w_i \ln(w_i)"
                legend={[
                  { label: "Concept", value: "Quantifies uncertainty. Maximizing it serves as a proxy for maximizing structural diversification." }
                ]}
              />
              <FormulaPanel 
                title="Relative Entropy (KL Divergence)"
                formula="\varepsilon(q, p) = \sum q_i \ln(q_i / p_i)"
                legend={[
                  { label: "Concept", value: "Measures difference between prior p and posterior q. We minimize this to avoid unintended biases." }
                ]}
              />
            </div>
          </section>

          {/* Section 4: Entropy Pooling */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Entropy Pooling Framework</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Introduced by Dr. Attilio Meucci in 2008, <strong className="text-slate-900 dark:text-white">Entropy Pooling (EP)</strong> merges the theoretical purity of minimum relative entropy with the operational complexities of quantitative portfolio management. It is a versatile, non-parametric methodology designed to process fully general market views and execute heavy-tailed stress-tests.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 font-serif">Non-Parametric Mechanics</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 bg-slate-50 dark:bg-slate-900/30 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
              Unlike BL and MPT which impose parametric normal boundaries, EP operates on raw matrices of historical data or Monte Carlo simulations. When a manager injects a view (e.g., "CVaR will not exceed 10%"), EP <strong className="text-slate-900 dark:text-white">does not alter the underlying data points</strong>. Instead, it non-parametrically shifts and adjusts the probability mass (weights) assigned to each specific scenario.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 font-serif">Supported View Types</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
              {[
                { title: 'Absolute & Relative', desc: 'Mean return views and asset outperformance.' },
                { title: 'Ordinal Rankings', desc: 'Processing automated alpha signals via rankings.' },
                { title: 'Volatilities / Variances', desc: 'Views directly altering the risk/volatility profile.' },
                { title: 'Dependence / Correlations', desc: 'Stress-testing network linkages and correlations.' },
                { title: 'Tail Behaviors & VaR', desc: 'Constraints targeting asymmetric risk metrics.' },
                { title: 'Group / Sector Views', desc: 'Aggregated sums and grouped categorical views.' },
              ].map((view, i) => (
                <div key={i} className="bg-white dark:bg-[#05070A] border border-slate-200 dark:border-slate-800 p-6 rounded-3xl min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-[#1D8A70] dark:text-[#3CBF9C] w-4 h-4 shrink-0" />
                    {view.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{view.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Math Methodology & Comparison */}
          <section className="py-16">
            <div className="bg-[#14171B] dark:bg-[#05070A] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative min-w-0 border border-slate-800">
              <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
                <Cpu size={400} />
              </div>
              <div className="relative z-10 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif">Mathematical Generalization &amp; Execution</h2>
                <p className="text-slate-300 text-lg mb-12 max-w-3xl leading-relaxed">
                  EP solves the Minimum Relative Entropy (MRE) problem. Because the primal problem involves tens of thousands of scenario weights, researchers use the <strong className="text-white">Lagrange dual formulation</strong> to drastically reduce dimensionality. The resulting optimal posterior probabilities take an elegant, closed-form <em className="text-[#A8672E] dark:text-[#D08F52]">exponential structure</em>.
                </p>
                
                <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-6 font-serif">Structural Super-Position: BL vs. EP</h3>
                
                <div className="overflow-x-auto rounded-3xl border border-white/10 min-w-0">
                  <table className="min-w-full text-left bg-black/40">
                    <thead className="bg-white dark:bg-[#0A0D14]/5 border-b border-white/10">
                      <tr>
                        <th className="py-5 px-6 text-slate-400 font-bold uppercase tracking-wider text-sm">Analytical Feature</th>
                        <th className="py-5 px-6 text-slate-400 font-bold uppercase tracking-wider text-sm">Black-Litterman</th>
                        <th className="py-5 px-6 text-[#A8672E] dark:text-[#D08F52] font-bold uppercase tracking-wider text-sm">Entropy Pooling</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm md:text-base">
                      <tr className="hover:bg-white dark:bg-[#0A0D14]/5 transition-colors">
                        <td className="py-5 px-6 text-slate-300 font-semibold">Underlying Distribution</td>
                        <td className="py-5 px-6 text-slate-400">Strictly Gaussian (Normal)</td>
                        <td className="py-5 px-6 text-white font-bold">Fully General; Non-parametric Monte Carlo</td>
                      </tr>
                      <tr className="hover:bg-white dark:bg-[#0A0D14]/5 transition-colors">
                        <td className="py-5 px-6 text-slate-300 font-semibold">Investor Views</td>
                        <td className="py-5 px-6 text-slate-400">Linear expected mean returns only</td>
                        <td className="py-5 px-6 text-white font-bold">Fully Flexible; correlations, volatility, bounds</td>
                      </tr>
                      <tr className="hover:bg-white dark:bg-[#0A0D14]/5 transition-colors">
                        <td className="py-5 px-6 text-slate-300 font-semibold">Confidence Input</td>
                        <td className="py-5 px-6 text-slate-400">Arbitrary scalar matrix (Ω)</td>
                        <td className="py-5 px-6 text-white font-bold">Implicit via relative entropy &amp; natural bounds</td>
                      </tr>
                      <tr className="hover:bg-white dark:bg-[#0A0D14]/5 transition-colors">
                        <td className="py-5 px-6 text-slate-300 font-semibold">Risk Function Compatibility</td>
                        <td className="py-5 px-6 text-slate-400">Symmetric variance only</td>
                        <td className="py-5 px-6 text-white font-bold">Asymmetric convex tail-risk (VaR, CVaR)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Advanced Applications */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BarChart4 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Advanced Applications</h2>
            </div>
            
            <ComparisonGrid>
              <ComparisonCard
                title="Non-Linear Views & Options"
                type="neutral"
                items={[
                  "EP natively handles non-linear derivatives.",
                  "Probabilities of underlying asset scenarios are updated via relative entropy and seamlessly passed through deterministic Black-Scholes pricing engines, inherently capturing the 'volatility smirk'."
                ]}
              />
              <ComparisonCard
                title="Effective Number of Scenarios (ENS)"
                type="neutral"
                items={[
                  "To prevent dangerous over-fitting when imposing aggressive views, ENS measures internal diversity.",
                  "It calculates exactly how many independent scenarios meaningfully contribute to the adjusted probability distribution."
                ]}
              />
              <ComparisonCard
                title="Synthetic Data via Vine Copulas"
                type="neutral"
                items={[
                  "EP relies on empirical support. To evaluate unprecedented stress-tests (Black Swans), it pairs with Vine Copulas.",
                  "Generates hundreds of thousands of synthetic scenarios, populating the deep unobserved tails."
                ]}
              />
              <ComparisonCard
                title="Dynamic Entropy Pooling"
                type="neutral"
                items={[
                  "Extends EP across multiple consecutive time steps.",
                  "By modeling risk drivers as continuous stochastic processes, systems can sequence trades optimally, balancing tactical alpha against market impact costs over time."
                ]}
              />
            </ComparisonGrid>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
