'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, TrendingUp, Activity, AlertTriangle, Sigma, Scale, Cpu, ShieldCheck, ArrowRight, Music, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable Components ---
const SectionHeader = ({ icon: Icon, title, subtitle, colorClass }: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  colorClass: string;
}) => (
  <div className={`mb-8 border-l-4 ${colorClass} pl-6`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${colorClass.replace('border-', 'bg-').replace('500', '100')} text-gray-800`}>
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 font-serif tracking-tight">{title}</h2>
    </div>
    <p className="text-lg text-slate-600 max-w-2xl">{subtitle}</p>
  </div>
);

const MathBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm md:text-base text-slate-700 overflow-x-auto shadow-inner flex justify-center">
    {children}
  </div>
);

const Callout = ({ title, children, type = "info" }: {
  title: string;
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "finance";
}) => {
  const styles = {
    info: { border: "border-blue-500", bg: "bg-blue-50", text: "text-blue-900", icon: BookOpen },
    warning: { border: "border-orange-500", bg: "bg-orange-50", text: "text-orange-900", icon: AlertTriangle },
    success: { border: "border-emerald-500", bg: "bg-emerald-50", text: "text-emerald-900", icon: Activity },
    finance: { border: "border-indigo-500", bg: "bg-indigo-50", text: "text-indigo-900", icon: TrendingUp },
  };
  const style = styles[type] || styles.info;
  const Icon = style.icon;
  return (
    <div className={`my-6 p-5 rounded-xl border-l-4 ${style.border} ${style.bg} shadow-sm`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className={style.text} />
        <h4 className={`font-bold ${style.text} uppercase text-xs tracking-wider`}>{title}</h4>
      </div>
      <div className="text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
};

const ConceptCard = ({ title, content, badge }: {
  title: string;
  content: string;
  badge?: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-slate-800 font-serif">{title}</h3>
      {badge && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase rounded">{badge}</span>}
    </div>
    <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
  </div>
);

// --- Main Component ---
export default function ConvergenceAnalysisArticle() {
  return (
    <ArticleFrame slug="convergence-analysis-quantitative-finance-measure-theory">
          {/* Section 1: Introduction */}
          <section>
            <div className="max-w-4xl mx-auto mb-16">
              <InfographicSlot alt="Convergence Analysis in Quantitative Finance Infographic" />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6 text-slate-800">The Analytic Bedrock</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Quantitative finance is not just about formulas; it&apos;s about the spaces those formulas live in. The distinction between convergence modes determines whether a model is arbitrage-free or stable.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Just as Riemann integration failed for pathological functions, simple discrete models fail for continuous trading. We need <strong>Lebesgue integration</strong> and <strong>Banach spaces</strong>.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  The mathematical infrastructure of modern finance rests on measure theory—a framework that allows us to handle infinite-dimensional spaces, discontinuous payoffs, and the subtle interplay between probability and geometry. Without this foundation, concepts like risk-neutral pricing and arbitrage-free markets would remain intuitive hunches rather than rigorous theorems.
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Scale size={20} className="text-indigo-500" />
                  Why it matters
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                    <span><strong>Pricing:</strong> FTAP relies on <span className="font-mono text-sm bg-slate-100 px-1 rounded">L¹</span> and <span className="font-mono text-sm bg-slate-100 px-1 rounded">L∞</span> topology.</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                    <span><strong>Stability:</strong> Numerical schemes rely on <span className="font-mono text-sm bg-slate-100 px-1 rounded">L²</span> convergence.</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-xs">3</span>
                    <span><strong>Risk:</strong> Expected Shortfall is an <span className="font-mono text-sm bg-slate-100 px-1 rounded">L¹</span> minimization.</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">4</span>
                    <span><strong>Hedging:</strong> Delta-hedging convergence requires uniform bounds on Greeks.</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs">5</span>
                    <span><strong>Calibration:</strong> Implied volatility surfaces must converge in appropriate norms to avoid arbitrage.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">The Historical Context</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                The 1973 Black-Scholes revolution wasn&apos;t just about finding a formula—it was about proving that continuous-time hedging could replicate option payoffs. But this proof required <strong>Itô calculus</strong>, which itself rests on measure-theoretic probability.
              </p>
              <p className="text-slate-700 leading-relaxed">
                When practitioners discretize these continuous models for implementation, they face a fundamental question: <em>In what sense does my discrete approximation converge to the continuous ideal?</em> The answer determines whether your pricing engine is stable, your Greeks are reliable, and your risk measures are coherent.
              </p>
            </div>
          </section>

          {/* Section 2: Functional Analysis */}
          <section>
            <SectionHeader 
              icon={BookOpen} 
              title="Functional Spaces" 
              subtitle="The geometric stages where financial variables perform."
              colorClass="border-indigo-500" 
            />
            
            <div className="mb-12 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">The Hierarchy of Spaces</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Financial mathematics operates in a hierarchy of function spaces, each with distinct properties that enable different types of analysis. Understanding this hierarchy is crucial for selecting the right mathematical tools for each problem.
              </p>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <p className="font-mono text-sm text-slate-600">
                  Metric Space ⊃ Normed Space ⊃ Banach Space ⊃ Hilbert Space
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <ConceptCard 
                title="Banach Space" 
                badge="Complete Normed Space"
                content="A complete vector space where every Cauchy sequence converges. Vital because it ensures limits of iterative pricing algorithms actually exist. Examples: L¹, L², L∞, C[0,T] (continuous functions)."
              />
              <ConceptCard 
                title="Hilbert Space (L²)" 
                badge="Inner Product Space"
                content="Unique because it allows for orthogonality (correlation = 0). Underpins Conditional Expectation as an orthogonal projection. The inner product structure enables variance decomposition and principal component analysis."
              />
              <ConceptCard 
                title="Dual Pair (L¹ & L∞)" 
                badge="Pricing Duality"
                content="L¹ contains pricing densities (integrable). L∞ contains admissible trading strategies (bounded). Their interaction proves No Arbitrage through the Fundamental Theorem of Asset Pricing."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-3">L¹ Space: Integrable Functions</h4>
                <MathBlock>||f||₁ = ∫ |f(x)| dx &lt; ∞</MathBlock>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Contains probability densities and pricing kernels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Natural space for expected values and risk measures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Dual space is L∞ (bounded measurable functions)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-3">L² Space: Square-Integrable Functions</h4>
                <MathBlock>||f||₂ = (∫ |f(x)|² dx)^(1/2) &lt; ∞</MathBlock>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Hilbert space with inner product structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Natural space for variance and covariance analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Enables orthogonal decomposition (PCA, factor models)</span>
                  </li>
                </ul>
              </div>
            </div>

            <Callout title="Financial Intuition: Orthogonality" type="finance">
              In the <strong>Longstaff-Schwartz algorithm</strong> for American options, we project future cash flows onto a basis set (typically polynomials of the state variable). This is only possible because <span className="font-mono">L²</span> is a Hilbert space, giving us the geometric tool of &quot;projection&quot; to approximate conditional expectations.
              <div className="mt-3 p-3 bg-white rounded border border-indigo-200">
                <p className="text-sm font-mono text-slate-600">E[V(t+1) | S(t)] ≈ Σᵢ βᵢ φᵢ(S(t))</p>
                <p className="text-xs text-slate-500 mt-2">where φᵢ are orthogonal basis functions</p>
              </div>
            </Callout>

            <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="text-lg font-bold text-slate-800 mb-3">The Riesz Representation Theorem</h4>
              <p className="text-slate-700 leading-relaxed mb-4">
                Every continuous linear functional on a Hilbert space can be represented as an inner product. This theorem is the mathematical foundation for:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-slate-200">
                  <h5 className="font-bold text-slate-700 mb-2">Conditional Expectation</h5>
                  <p className="text-sm text-slate-600">The best L² predictor is the orthogonal projection onto the conditioning σ-algebra.</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <h5 className="font-bold text-slate-700 mb-2">Radon-Nikodym Derivative</h5>
                  <p className="text-sm text-slate-600">Change of measure (risk-neutral pricing) is represented as a density in L¹.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Modes of Convergence */}
          <section>
            <SectionHeader 
              icon={ArrowRight} 
              title="Modes of Convergence" 
              subtitle="Not all limits are created equal. A sequence can converge in one way and explode in another."
              colorClass="border-purple-500" 
            />

            <div className="mb-12 bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-3">The Convergence Hierarchy</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Understanding the relationships between different modes of convergence is crucial for financial modeling. Stronger modes imply weaker ones, but the converse is not true.
              </p>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <p className="font-mono text-sm text-slate-600 text-center">
                  Uniform (L∞) ⇒ Mean (L¹) ⇒ Convergence in Measure ⇒ Almost Sure Convergence
                </p>
                <p className="font-mono text-sm text-slate-600 text-center mt-2">
                  Mean-Square (L²) ⇒ Mean (L¹)
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-4">Mode</th>
                      <th className="p-4">Math Notation</th>
                      <th className="p-4">Financial Implication</th>
                      <th className="p-4">Example Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-bold text-purple-700">Uniform (L∞)</td>
                      <td className="p-4 font-mono text-slate-600">sup |fₙ - f| &rarr; 0</td>
                      <td className="p-4 text-sm text-slate-600">Strongest. Preserves continuity. Crucial for stability of exercise boundaries in American options.</td>
                      <td className="p-4 text-sm text-slate-600">Binomial tree convergence to Black-Scholes</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-blue-700">Mean (L¹)</td>
                      <td className="p-4 font-mono text-slate-600">∫ |fₙ - f| &rarr; 0</td>
                      <td className="p-4 text-sm text-slate-600">Gold standard for pricing. Ensures expected payoff converges to true value.</td>
                      <td className="p-4 text-sm text-slate-600">Monte Carlo option pricing convergence</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-green-700">Mean-Square (L²)</td>
                      <td className="p-4 font-mono text-slate-600">(∫ |fₙ - f|²)^(1/2) &rarr; 0</td>
                      <td className="p-4 text-sm text-slate-600">Natural metric for variance/volatility. Used in &quot;Strong Convergence&quot; of SDEs.</td>
                      <td className="p-4 text-sm text-slate-600">Euler-Maruyama scheme for path-dependent options</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-700">Pointwise</td>
                      <td className="p-4 font-mono text-slate-600">fₙ(x) &rarr; f(x) for all x</td>
                      <td className="p-4 text-sm text-slate-600">Weak. Does NOT guarantee integrals converge. Fails in presence of &quot;spikes&quot;.</td>
                      <td className="p-4 text-sm text-slate-600">Dangerous for risk aggregation</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-orange-700">Weak-* (L∞)</td>
                      <td className="p-4 font-mono text-slate-600">∫ fₙ g &rarr; ∫ f g ∀g∈L¹</td>
                      <td className="p-4 text-sm text-slate-600">Used in FTAP. Ensures existence of equivalent martingale measure.</td>
                      <td className="p-4 text-sm text-slate-600">No-arbitrage pricing theory</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Pathological Examples: When Intuition Fails</h3>
              <p className="text-slate-700 leading-relaxed mb-6">
                These examples illustrate why we need rigorous convergence analysis. In each case, a naive approach suggests convergence, but the mathematical reality is different.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Pathology 1: Escape to Horizontal Infinity
                </h4>
                <p className="text-sm text-red-900 mb-4">
                  A sequence of risks that moves further into the future (or tail). Pointwise, it looks like zero risk. But the &quot;mass&quot; of risk (∫ fₙ) is constant.
                </p>
                <div className="text-xs bg-white p-3 rounded border border-red-100 font-mono text-slate-500 mb-3">
                  fₙ(x) = 𝟙[n, n+1](x)
                </div>
                <p className="text-xs text-red-800 mb-2"><strong>Financial Example:</strong></p>
                <div className="text-xs bg-white p-3 rounded border border-red-100 text-slate-600">
                  Analogy: Ignoring tail risk because the probability of it happening <em>today</em> is near zero. The 2008 crisis showed that low-probability events in the far tail can have catastrophic consequences.
                </div>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Pathology 2: Escape to Vertical Infinity
                </h4>
                <p className="text-sm text-orange-900 mb-4">
                  The &quot;Dirac Delta&quot; error. A hedging strategy is perfect almost everywhere, but at one specific strike price, the error explodes infinitely.
                </p>
                <div className="text-xs bg-white p-3 rounded border border-orange-100 font-mono text-slate-500 mb-3">
                  fₙ(x) = n · 𝟙[0, 1/n](x)
                </div>
                <p className="text-xs text-orange-800 mb-2"><strong>Financial Example:</strong></p>
                <div className="text-xs bg-white p-3 rounded border border-orange-100 text-slate-600">
                  Analogy: A &quot;Flash Crash&quot; triggered by a specific barrier being hit. Digital options exhibit this behavior—the payoff is discontinuous, causing Greeks to explode at the strike.
                </div>
              </div>
            </div>

            <Callout title="Dominated Convergence Theorem" type="info">
              <p className="mb-3">
                If fₙ &rarr; f pointwise and |fₙ| ≤ g for some integrable g, then:
              </p>
              <MathBlock>∫ fₙ &rarr; ∫ f</MathBlock>
              <p className="text-sm mt-3">
                This theorem is the workhorse of quantitative finance. It allows us to interchange limits and integrals—essential for proving that discrete approximations converge to continuous models. The &quot;dominating function&quot; g provides the uniform bound that prevents pathological behavior.
              </p>
            </Callout>
          </section>

          {/* Section 4: Stochastic Calculus */}
          <section>
            <SectionHeader 
              icon={Sigma} 
              title="Stochastic Calculus & Discretization" 
              subtitle="Bridging the gap between continuous theory and discrete simulation."
              colorClass="border-emerald-500" 
            />

            <div className="mb-12 bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-3">The Discretization Challenge</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Continuous-time stochastic differential equations (SDEs) are elegant in theory but must be discretized for numerical implementation. The choice of discretization scheme determines both accuracy and computational cost.
              </p>
              <div className="bg-white p-4 rounded-lg border border-emerald-200">
                <p className="font-mono text-sm text-slate-600">
                  dX(t) = μ(X(t), t)dt + σ(X(t), t)dW(t)
                </p>
                <p className="text-xs text-slate-500 mt-2">Continuous SDE &rarr; Discrete approximation with time step Δt</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-800 mb-4">Strong Convergence (Pathwise)</h3>
                <MathBlock>E[|Y_N - X_T|] ≤ C(Δt)^γ</MathBlock>
                <p className="text-slate-600 mb-4">
                  Required for <strong>path-dependent options</strong> (Asian, Barrier, Lookback). The simulated path must stay close to the true path at every point in time.
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-bold text-emerald-800 mb-2 text-sm">When to Use:</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>Barrier options (path must not cross barrier)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>Asian options (average of path matters)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>Delta hedging (need accurate path for rebalancing)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-800 mb-4">Weak Convergence (Distributional)</h3>
                <MathBlock>|E[g(Y_N)] - E[g(X_T)]| ≤ C(Δt)^β</MathBlock>
                <p className="text-slate-600 mb-4">
                  Sufficient for <strong>European options</strong>. We only care that the final distribution of prices is correct, not the specific path taken to get there.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-2 text-sm">When to Use:</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>European options (only terminal value matters)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Faster convergence rate (β &gt; γ typically)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Computational efficiency (larger time steps allowed)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-100 mb-8">
              <h3 className="text-xl font-bold text-emerald-900 mb-6">Euler-Maruyama vs. Milstein</h3>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-1 border border-emerald-100">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">Euler-Maruyama</span>
                    <div className="text-2xl font-bold text-slate-800 mb-1">Order 0.5</div>
                    <div className="text-sm text-slate-500 mb-3">Strong Convergence</div>
                    <div className="bg-emerald-50 p-3 rounded mb-3">
                      <p className="font-mono text-xs text-slate-600">
                        Xₙ₊₁ = Xₙ + μ(Xₙ)Δt + σ(Xₙ)ΔWₙ
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 border-t pt-2 border-slate-100">
                      Ignores the Itô correction term <span className="font-mono">½σσ&apos;(...)</span>. Good for simple additive noise, bad for multiplicative noise (e.g., geometric Brownian motion with large volatility).
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-1 border border-emerald-100">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">Milstein Scheme</span>
                    <div className="text-2xl font-bold text-slate-800 mb-1">Order 1.0</div>
                    <div className="text-sm text-slate-500 mb-3">Strong Convergence</div>
                    <div className="bg-emerald-50 p-3 rounded mb-3">
                      <p className="font-mono text-xs text-slate-600">
                        Xₙ₊₁ = Xₙ + μΔt + σΔWₙ + ½σσ&apos;(ΔWₙ² - Δt)
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 border-t pt-2 border-slate-100">
                      Includes the second-order Itô term. Matches the weak order accuracy. Essential for precision in complex volatility models (Heston, SABR).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-3">The Itô-Taylor Expansion</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Just as Taylor series expand deterministic functions, the Itô-Taylor expansion provides a systematic way to derive higher-order schemes for SDEs.
                </p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <p className="font-mono text-xs text-slate-600">
                    X(t+Δt) = X(t) + μΔt + σΔW + ½σσ&apos;(ΔW² - Δt) + ...
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Truncating at different orders gives different schemes with different convergence rates.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-3">Computational Trade-offs</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Higher-order schemes require more computation per step but allow larger time steps for the same accuracy.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-slate-50 rounded">
                    <span className="font-bold">Euler-Maruyama:</span>
                    <span>N = O(ε⁻²) steps for error ε</span>
                  </div>
                  <div className="flex justify-between p-2 bg-emerald-50 rounded">
                    <span className="font-bold">Milstein:</span>
                    <span>N = O(ε⁻¹) steps for error ε</span>
                  </div>
                </div>
              </div>
            </div>

            <Callout title="Practical Consideration: Variance Reduction" type="success">
              <p className="mb-3">
                Even with strong convergence, Monte Carlo methods suffer from slow convergence of the variance. The standard error decreases as O(N^(-1/2)), requiring 100× more paths for 10× more accuracy.
              </p>
              <p className="text-sm">
                <strong>Solution:</strong> Variance reduction techniques (antithetic variates, control variates, importance sampling) can dramatically improve efficiency without changing the discretization scheme.
              </p>
            </Callout>
          </section>

          {/* Section 5: Computational Methods */}
          <section>
            <SectionHeader 
              icon={Cpu} 
              title="Computational Methods" 
              subtitle="Fourier transforms and spectral filters in pricing."
              colorClass="border-cyan-500" 
            />

            <div className="mb-12 bg-cyan-50 p-6 rounded-xl border border-cyan-100">
              <h3 className="text-xl font-bold text-cyan-900 mb-3">The Fourier Revolution in Finance</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Fourier methods transform option pricing from a PDE problem to an algebraic problem in frequency space. The Fast Fourier Transform (FFT) enables pricing entire option surfaces in milliseconds—but only if the convergence properties are properly managed.
              </p>
              <div className="bg-white p-4 rounded-lg border border-cyan-200">
                <p className="text-sm text-slate-600">
                  <strong>Key Insight:</strong> The characteristic function of a log-price process is often known in closed form (even when the density is not), enabling direct Fourier inversion.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Carr-Madan & Damping</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Call option prices don&apos;t decay to zero as strike <span className="font-mono">k &rarr; -∞</span>, meaning they aren&apos;t in <span className="font-mono">L¹</span>. We can&apos;t Fourier transform them directly.
                  </p>
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100 mb-4">
                    <p className="font-mono text-sm text-slate-600 mb-2">
                      C(k) ~ S₀ - e^k as k &rarr; -∞
                    </p>
                    <p className="text-xs text-slate-500">
                      The call price approaches intrinsic value, which doesn&apos;t decay
                    </p>
                  </div>
                  <Callout title="The Fix" type="info">
                    Multiply by a damping factor <span className="font-mono">e^(αk)</span> to force decay. This pushes the function into <span className="font-mono">L¹</span>, allowing the use of FFT.
                    <div className="mt-3 bg-white p-3 rounded border border-blue-200">
                      <p className="font-mono text-sm text-slate-600">
                        c̃(k) = e^(αk) C(k) ∈ L¹
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Typical choice: α = 1.5 (ensures square-integrability)
                      </p>
                    </div>
                  </Callout>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">The Gibbs Phenomenon</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    For <strong>Digital Options</strong> (step functions), Fourier series oscillate wildly at the jump (discontinuity). This destroys convergence rates.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-4">
                    <p className="text-sm text-orange-900 mb-2">
                      <strong>The Problem:</strong> Truncating the Fourier series at N terms gives:
                    </p>
                    <p className="font-mono text-xs text-slate-600">
                      Error ~ O(1/N) but with 9% overshoot at discontinuity
                    </p>
                  </div>
                  <Callout title="The Fix" type="warning">
                    Use <strong>Spectral Filters</strong> (Lanczos, Fejér). They smooth the discontinuity, restoring accuracy for Greeks (Delta/Gamma).
                    <div className="mt-3 bg-white p-3 rounded border border-orange-200">
                      <p className="text-sm text-slate-600">
                        <strong>Lanczos σ-factor:</strong> Multiplies Fourier coefficients by sinc(πn/N)
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Eliminates overshoot while maintaining spectral accuracy away from discontinuity
                      </p>
                    </div>
                  </Callout>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-4">The COS Method: Cosine Expansion</h4>
                <p className="text-slate-600 mb-4">
                  An alternative to Carr-Madan that uses cosine series expansion directly on the density function. Achieves <strong>exponential convergence</strong> for smooth densities.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-cyan-50 p-4 rounded border border-cyan-100">
                    <h5 className="font-bold text-cyan-800 mb-2 text-sm">Advantages</h5>
                    <ul className="space-y-1 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-600">✓</span>
                        <span>No damping parameter needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-600">✓</span>
                        <span>Exponential convergence for smooth payoffs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-600">✓</span>
                        <span>Direct computation of Greeks</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <h5 className="font-bold text-slate-700 mb-2 text-sm">Convergence Rate</h5>
                    <p className="font-mono text-xs text-slate-600 mb-2">
                      Error ~ O(e^(-cN))
                    </p>
                    <p className="text-xs text-slate-500">
                      Compared to O(N^(-1)) for standard FFT methods
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100">
                <h4 className="text-lg font-bold text-slate-800 mb-4">Practical Implementation: The Lewis Formula</h4>
                <p className="text-slate-600 mb-4">
                  For practitioners, the Lewis (2001) formula provides a robust implementation that handles both calls and puts without damping:
                </p>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <p className="font-mono text-sm text-slate-600 mb-3">
                    C(K) = S₀ - √(S₀K)/π ∫₀^∞ Re[e^(-iφ log(K/S₀)) φ(φ - i/2)] dφ
                  </p>
                  <p className="text-xs text-slate-500">
                    where φ(u) is the characteristic function of log(S_T/S₀)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Risk Management */}
          <section>
            <SectionHeader 
              icon={ShieldCheck} 
              title="Risk: Convexity & Robustness" 
              subtitle="Moving from Variance (L²) to Tail Risk (L¹)."
              colorClass="border-rose-500" 
            />

            <div className="mb-12 bg-rose-50 p-6 rounded-xl border border-rose-100">
              <h3 className="text-xl font-bold text-rose-900 mb-3">The Paradigm Shift in Risk Measurement</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                The 2008 financial crisis exposed fundamental flaws in traditional risk measures. Value-at-Risk (VaR), despite its regulatory popularity, fails basic mathematical coherence properties. The industry has shifted toward <strong>coherent risk measures</strong> that satisfy essential axioms.
              </p>
              <div className="bg-white p-4 rounded-lg border border-rose-200">
                <h4 className="font-bold text-slate-800 mb-2 text-sm">Axioms of Coherent Risk Measures (Artzner et al., 1999)</h4>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">1.</span>
                    <span><strong>Monotonicity:</strong> If X ≤ Y, then ρ(X) ≤ ρ(Y)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">2.</span>
                    <span><strong>Sub-additivity:</strong> ρ(X + Y) ≤ ρ(X) + ρ(Y)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">3.</span>
                    <span><strong>Positive Homogeneity:</strong> ρ(λX) = λρ(X) for λ ≥ 0</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">4.</span>
                    <span><strong>Translation Invariance:</strong> ρ(X + c) = ρ(X) - c</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 opacity-75">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-700">Value-at-Risk (VaR)</h3>
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">Traditional</span>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200 mb-4">
                  <p className="font-mono text-sm text-slate-600">
                    VaR_α(X) = inf&#123;x : P(X ≤ x) ≥ α&#125;
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    The α-quantile of the loss distribution
                  </p>
                </div>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✖</span>
                    <span>Not Sub-additive (Diversification might &quot;increase&quot; risk)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✖</span>
                    <span>Non-convex (Hard to optimize, multiple local minima)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✖</span>
                    <span>Ignorant of the tail shape beyond the quantile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✖</span>
                    <span>Encourages regulatory arbitrage</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-lg border-2 border-rose-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-rose-600">Expected Shortfall (ES)</h3>
                  <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded font-bold">Modern Standard</span>
                </div>
                <div className="bg-rose-50 p-3 rounded border border-rose-200 mb-4">
                  <p className="font-mono text-sm text-slate-600">
                    ES_α(X) = E[X | X ≥ VaR_α(X)]
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Average loss beyond the VaR threshold
                  </p>
                </div>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    <span>Coherent Risk Measure (satisfies all 4 axioms)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    <span><strong>Convex</strong> (Unique optimization solution)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    <span><span className="font-mono">L¹</span> Minimization (Robust to outliers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    <span>Captures tail risk severity</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
              <h4 className="font-bold text-slate-800 mb-3">Lasso (L¹) vs Ridge (L²) in Factor Models</h4>
              <p className="text-slate-600 mb-4">When selecting factors to explain returns:</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 bg-white p-4 border border-slate-200 rounded">
                  <div className="font-mono text-xs text-slate-400 mb-1">Ridge Regression</div>
                  <div className="font-bold text-slate-700 mb-2">L² Norm Penalty</div>
                  <div className="bg-slate-50 p-2 rounded mb-2">
                    <p className="font-mono text-xs text-slate-600">
                      min ||y - Xβ||² + λ||β||²
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">Shrinks all coefficients. Good for correlated data, but keeps all variables.</p>
                </div>
                <div className="flex-1 bg-indigo-50 p-4 border border-indigo-200 rounded">
                  <div className="font-mono text-xs text-indigo-400 mb-1">Lasso Regression</div>
                  <div className="font-bold text-indigo-700 mb-2">L¹ Norm Penalty</div>
                  <div className="bg-white p-2 rounded mb-2">
                    <p className="font-mono text-xs text-slate-600">
                      min ||y - Xβ||² + λ||β||₁
                    </p>
                  </div>
                  <p className="text-xs text-indigo-600">Geometry has &quot;corners&quot;. Forces coefficients to exactly zero. Performs <strong>Feature Selection</strong>.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded border border-slate-200">
                <h5 className="font-bold text-slate-700 mb-2 text-sm">Why L¹ Induces Sparsity</h5>
                <p className="text-xs text-slate-600 mb-2">
                  The L¹ ball has corners at the coordinate axes. When the constraint region touches the objective function&apos;s contours, it&apos;s likely to do so at a corner—where many coordinates are exactly zero.
                </p>
                <p className="text-xs text-slate-500">
                  This geometric property makes Lasso ideal for high-dimensional factor models where most factors are irrelevant.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-3">Robust Optimization</h4>
                <p className="text-slate-600 text-sm mb-4">
                  L¹ norms are more robust to outliers than L² norms because they don&apos;t square the errors. This makes them ideal for financial data with fat tails.
                </p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <p className="text-xs text-slate-600 mb-2">
                    <strong>L² Loss:</strong> Outliers dominate (squared error)
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>L¹ Loss:</strong> Outliers have linear impact (absolute error)
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-3">Convex Duality</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Expected Shortfall can be reformulated as a convex optimization problem, enabling efficient computation via linear programming.
                </p>
                <div className="bg-rose-50 p-3 rounded border border-rose-200">
                  <p className="font-mono text-xs text-slate-600">
                    ES_α(X) = min_t &#123;t + (1-α)⁻¹ E[(X-t)⁺]&#125;
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Rockafellar-Uryasev representation (2000)
                  </p>
                </div>
              </div>
            </div>

            <Callout title="Basel III and the Shift to ES" type="warning">
              <p className="mb-3">
                In 2016, the Basel Committee on Banking Supervision announced that Expected Shortfall would replace Value-at-Risk as the primary risk measure for market risk capital requirements, effective 2019.
              </p>
              <p className="text-sm">
                <strong>Reason:</strong> VaR&apos;s failure to capture tail risk and its non-sub-additive property made it unsuitable for systemic risk management. ES addresses both issues through its coherent mathematical structure.
              </p>
            </Callout>
          </section>

          {/* Synthesis Table */}
          <section className="mb-24">
            <h2 className="text-3xl font-serif font-bold mb-8 text-slate-800 text-center">Synthesis: The Geometric Structure</h2>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-slate-200">
              <table className="w-full text-left bg-white">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-4 font-light tracking-wider">Problem</th>
                    <th className="p-4 font-light tracking-wider">Space</th>
                    <th className="p-4 font-light tracking-wider">Concept</th>
                    <th className="p-4 font-light tracking-wider">Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700">No Arbitrage</td>
                    <td className="p-4 font-mono text-slate-500">L∞ (Dual of L¹)</td>
                    <td className="p-4">Weak-* Convergence</td>
                    <td className="p-4 text-slate-600">Existence of Pricing Measure</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700">SDE Simulation</td>
                    <td className="p-4 font-mono text-slate-500">L² (Pathwise)</td>
                    <td className="p-4">Strong Convergence</td>
                    <td className="p-4 text-slate-600">Accurate Hedging</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700">Fourier Pricing</td>
                    <td className="p-4 font-mono text-slate-500">L¹ (Damped)</td>
                    <td className="p-4">Spectral Convergence</td>
                    <td className="p-4 text-slate-600">Exponential Speed</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700">Risk (ES)</td>
                    <td className="p-4 font-mono text-slate-500">L¹ (Convex)</td>
                    <td className="p-4">Monotonic Convergence</td>
                    <td className="p-4 text-slate-600">Coherent Tail Risk Measure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

    </ArticleFrame>
  );
}
