'use client';

import React from 'react';
import { TrendingUp, Network, BarChart4, Layers, CheckCircle2, AlertTriangle, Lightbulb, Cpu, Activity } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function EntropyMethodsPortfolioConstruction() {
  // Math Component for styling formulas
  const MathFormula = ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div className="my-6 p-6 bg-slate-50 border-l-4 border-indigo-500 rounded-r-lg shadow-sm font-mono text-sm md:text-base overflow-x-auto">
      <div className="text-slate-800 font-medium whitespace-nowrap">{children}</div>
      {label && <div className="mt-2 text-xs text-slate-500 uppercase tracking-wider font-semibold">{label}</div>}
    </div>
  );

  return (
    <ArticleFrame slug="entropy-methods-portfolio-construction">
      <div className="space-y-24">
        <InfographicSlot alt="Entropy Methods in Portfolio Construction Infographic" />

        {/* Section 1: Evolution of MPT */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
              <TrendingUp size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">The Genesis & Evolution of MPT</h2>
          </div>
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-slate-700">
              The mathematical architecture of portfolio construction has undergone a profound evolution over the past seven decades. The journey highlights the continuous struggle to bridge the gap between elegant mathematical theory and the noisy, asymmetric, and non-stationary realities of global financial markets.
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">The Mean-Variance Paradigm</h3>
            <p className="text-slate-700">
              Introduced by Harry Markowitz in 1952, Modern Portfolio Theory (MPT) formalized the concept of investment diversification. It posited that an asset&apos;s risk and return must be assessed by how its variance and covariance contribute to the aggregate portfolio, allowing investors to construct an &quot;efficient frontier&quot; of optimal portfolios.
            </p>
            <div className="my-8 bg-red-50 border-l-4 border-red-400 p-6 rounded-r-2xl">
              <h4 className="flex items-center gap-2 text-red-800 font-bold text-lg mb-3">
                <AlertTriangle size={20} /> Empirical Fragility of MPT
              </h4>
              <ul className="space-y-3 text-red-900/80">
                <li><strong>Estimation Error Maximization:</strong> Hyper-sensitive to input parameters (μ and Σ), behaving as an &quot;estimation-error maximizer&quot; and over-allocating to assets with high historical returns/low variance.</li>
                <li><strong>The Normality Assumption:</strong> Structurally assumes symmetric, multivariate normal distribution, ignoring severe non-normal dynamics (fat tails and skewness).</li>
                <li><strong>Covariance Instability:</strong> Assumes static correlation, whereas real-world correlations are volatile and converge toward one during crises.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Black-Litterman */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Network size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">The Bayesian Bridge: Black-Litterman</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="prose prose-lg prose-slate">
              <p className="text-slate-700">
                To resolve extreme asset concentration, Fischer Black and Robert Litterman introduced the Black-Litterman (BL) model in 1990. It applies Bayesian statistical theory, blending a neutral baseline forecast with subjective tactical views.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-6">Reverse Optimization</h3>
              <p className="text-slate-700">
                Instead of relying on historical mean returns, the BL model derives an &quot;equilibrium prior&quot; through reverse-optimization of the CAPM market capitalization equilibrium, extracting implied returns (Π).
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <Layers size={20} /> Structural Limitations
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-emerald-500 mt-1"><AlertTriangle size={18} /></span>
                  <div>
                    <strong className="block text-emerald-900">Gaussian Straitjacket</strong>
                    <span className="text-sm text-emerald-700">Strictly relies on the assumption that market prior and views are normally distributed.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 mt-1"><AlertTriangle size={18} /></span>
                  <div>
                    <strong className="block text-emerald-900">Constraint Inflexibility</strong>
                    <span className="text-sm text-emerald-700">Only permits linear combinations of expected returns. Cannot process views on volatility or tail risks.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 mt-1"><AlertTriangle size={18} /></span>
                  <div>
                    <strong className="block text-emerald-900">Arbitrary Confidence Matrix (Ω)</strong>
                    <span className="text-sm text-emerald-700">Lacks rigorous scientific foundation; assigns numerical variances based on heavy discretion.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Entropy Paradigm */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
              <Lightbulb size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">The Entropy Paradigm</h2>
          </div>
          <div className="prose prose-lg prose-slate max-w-none mb-12">
            <p className="text-slate-700">
              To transcend the limitations of parametric normality, financial researchers turned to thermodynamics and communication theory. Edwin T. Jaynes established the <strong>Principle of Maximum Entropy (MaxEnt)</strong> in 1957, positing that the most rational choice for an unknown probability distribution is the one that maximizes information entropy subject to known constraints—remaining unbiased regarding what is not explicitly known.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Shannon Entropy</h3>
              <p className="text-indigo-800/80 mb-6">Quantifies uncertainty. In portfolio selection, maximizing Shannon entropy serves as a powerful proxy for maximizing structural diversification.</p>
              <div className="bg-white px-6 py-4 rounded-xl font-mono text-center text-indigo-900 border border-indigo-100 shadow-sm">
                H(w) = - Σ w<sub>i</sub> ln(w<sub>i</sub>)
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-100">
              <h3 className="text-xl font-bold text-pink-900 mb-4">Relative Entropy (KL Divergence)</h3>
              <p className="text-pink-800/80 mb-6">Measures the informational difference between two distributions (prior <em>p</em> and posterior <em>q</em>). We seek to <em>minimize</em> this to avoid unintended biases.</p>
              <div className="bg-white px-6 py-4 rounded-xl font-mono text-center text-pink-900 border border-pink-100 shadow-sm">
                ε(q, p) = Σ q<sub>i</sub> ln(q<sub>i</sub> / p<sub>i</sub>)
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Entropy Pooling */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
              <Activity size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">The Entropy Pooling Framework</h2>
          </div>
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-slate-700">
              Introduced by Dr. Attilio Meucci in 2008, <strong>Entropy Pooling (EP)</strong> merges the theoretical purity of minimum relative entropy with the operational complexities of quantitative portfolio management. It is a versatile, non-parametric methodology designed to process fully general market views and execute heavy-tailed stress-tests.
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Non-Parametric Mechanics</h3>
            <p className="text-slate-700">
              Unlike BL and MPT which impose parametric normal boundaries, EP operates on raw matrices of historical data or Monte Carlo simulations. When a manager injects a view (e.g., &quot;CVaR will not exceed 10%&quot;), EP <strong>does not alter the underlying data points</strong>. Instead, it non-parametrically shifts and adjusts the probability mass (weights) assigned to each specific scenario.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Supported View Types</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Absolute & Relative', desc: 'Mean return views and asset outperformance.' },
                { title: 'Ordinal Rankings', desc: 'Processing automated alpha signals via rankings.' },
                { title: 'Volatilities / Variances', desc: 'Views directly altering the risk/volatility profile.' },
                { title: 'Dependence / Correlations', desc: 'Stress-testing network linkages and correlations.' },
                { title: 'Tail Behaviors & VaR', desc: 'Constraints targeting asymmetric risk metrics.' },
                { title: 'Group / Sector Views', desc: 'Aggregated sums and grouped categorical views.' },
              ].map((view, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-xl flex gap-3">
                  <CheckCircle2 className="text-amber-500 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{view.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{view.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Math Methodology & Comparison */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
            <Cpu size={400} />
          </div>
          <div className="relative z-10 text-white">
            <h2 className="text-3xl font-bold mb-8">Mathematical Generalization & Execution</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-3xl">
              EP solves the Minimum Relative Entropy (MRE) problem. Because the primal problem involves tens of thousands of scenario weights, researchers use the <strong>Lagrange dual formulation</strong> to drastically reduce dimensionality. The resulting optimal posterior probabilities take an elegant, closed-form <em>exponential structure</em>.
            </p>
            <h3 className="text-xl font-bold text-indigo-400 mb-6">Structural Super-Position: BL vs. EP</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="py-4 px-6 text-slate-400 font-medium">Analytical Feature</th>
                    <th className="py-4 px-6 text-slate-400 font-medium">Black-Litterman</th>
                    <th className="py-4 px-6 text-indigo-400 font-medium">Entropy Pooling</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm md:text-base">
                  <tr>
                    <td className="py-4 px-6 text-slate-300">Underlying Distribution</td>
                    <td className="py-4 px-6 text-slate-400">Strictly Gaussian (Normal)</td>
                    <td className="py-4 px-6 text-white font-medium">Fully General; Non-parametric Monte Carlo</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-slate-300">Investor Views</td>
                    <td className="py-4 px-6 text-slate-400">Linear expected mean returns only</td>
                    <td className="py-4 px-6 text-white font-medium">Fully Flexible; correlations, volatility, bounds</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-slate-300">Confidence Input</td>
                    <td className="py-4 px-6 text-slate-400">Arbitrary scalar matrix (Ω)</td>
                    <td className="py-4 px-6 text-white font-medium">Implicit via relative entropy & natural bounds</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-slate-300">Risk Function Compatibility</td>
                    <td className="py-4 px-6 text-slate-400">Symmetric variance only</td>
                    <td className="py-4 px-6 text-white font-medium">Asymmetric convex tail-risk (VaR, CVaR)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 6: Advanced Applications */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-cyan-100 text-cyan-600 rounded-2xl">
              <BarChart4 size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Advanced Applications</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-slate-100 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Non-Linear Views & Options</h3>
              <p className="text-slate-600">EP natively handles non-linear derivatives. Probabilities of underlying asset scenarios are updated via relative entropy and seamlessly passed through deterministic Black-Scholes pricing engines, inherently capturing the &quot;volatility smirk.&quot;</p>
            </div>
            <div className="p-6 border border-slate-100 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Effective Number of Scenarios (ENS)</h3>
              <p className="text-slate-600">To prevent dangerous over-fitting when imposing aggressive views, ENS measures internal diversity. It calculates exactly how many independent scenarios meaningfully contribute to the adjusted probability distribution.</p>
            </div>
            <div className="p-6 border border-slate-100 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Synthetic Data via Vine Copulas</h3>
              <p className="text-slate-600">EP relies on empirical support. To evaluate unprecedented stress-tests (Black Swans), it pairs with Vine Copulas to generate hundreds of thousands of synthetic scenarios, populating the deep unobserved tails.</p>
            </div>
            <div className="p-6 border border-slate-100 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Dynamic Entropy Pooling</h3>
              <p className="text-slate-600">Extends EP across multiple consecutive time steps. By modeling risk drivers as continuous stochastic processes, systems can sequence trades optimally, balancing tactical alpha against market impact costs over time.</p>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
