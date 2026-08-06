'use client';

import React, { useState } from 'react';
import { TrendingUp, Scale, Brain, ShieldCheck, Globe, Server, Activity, AlertTriangle, CheckCircle, ArrowRight, BookOpen, PieChart, Users, Layers, Terminal, Zap, Building2, Briefcase, GitMerge, Network, Music, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function BlackLittermanGuide() {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Math Component for styling formulas
  const MathFormula = ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div className="my-6 p-6 bg-slate-50 border-l-4 border-indigo-500 rounded-r-lg shadow-sm font-mono text-sm md:text-base overflow-x-auto">
      <div className="text-slate-800 font-medium whitespace-nowrap">{children}</div>
      {label && <div className="mt-2 text-xs text-slate-500 uppercase tracking-wider font-semibold">{label}</div>}
    </div>
  );

  const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: React.ComponentType<any>; title: string; subtitle?: string }) => (
    <div className="mb-8 border-b pb-4 border-slate-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <Icon size={24} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
      </div>
      {subtitle && <p className="text-slate-600 text-lg ml-1">{subtitle}</p>}
    </div>
  );

  const ConceptCard = ({ title, children, color = "blue" }: { title: string; children: React.ReactNode; color?: string }) => {
    const colorClasses: Record<string, string> = {
      blue: "bg-blue-50 border-blue-200 text-blue-900",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
      rose: "bg-rose-50 border-rose-200 text-rose-900",
      amber: "bg-amber-50 border-amber-200 text-amber-900",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
      purple: "bg-purple-50 border-purple-200 text-purple-900",
    };

    return (
      <div className={`p-6 rounded-xl border ${colorClasses[color]} mb-6 transition-all hover:shadow-md h-full`}>
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">{title}</h3>
        <div className="leading-relaxed opacity-90 text-sm md:text-base">{children}</div>
      </div>
    );
  };

  const StepCard = ({ number, title, content }: { number: string; title: string; content: React.ReactNode }) => (
    <div className="flex gap-4">
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">
          {number}
        </div>
        <div className="w-0.5 h-full bg-slate-200 my-2"></div>
      </div>
      <div className="pb-12 w-full">
        <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-600">
          {content}
        </div>
      </div>
    </div>
  );

  return (
    <ArticleFrame slug="black-litterman-model-comprehensive-guide-portfolio-optimization">
      <InfographicSlot alt="Black-Litterman Model Infographic" />

        <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">
          {/* 1. Introduction */}
          <section id="intro">
            <SectionHeader 
              icon={TrendingUp} 
              title="The Evolution of Allocation" 
              subtitle="From the Efficient Frontier to Bayesian Beliefs." 
            />
            <div className="space-y-8">
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-slate-700">
                  Modern Portfolio Theory (MPT) began in 1952 with <strong>Harry Markowitz</strong>. He revolutionized finance by mathematically defining diversification: it wasn't just about holding many stocks, but holding stocks that don't move together. This created the <strong>Efficient Frontier</strong>—the set of portfolios that offer the highest return for a given level of risk.
                </p>
              </div>

              <div className="bg-slate-100 rounded-xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">The "Error Maximization" Trap</h3>
                <p className="text-slate-700 mb-6">
                  Despite winning a Nobel Prize, MVO (Mean-Variance Optimization) had a fatal flaw in practice. Richard Michaud famously labeled it an <strong>"Error Maximizer"</strong>.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                    <div className="text-rose-500 font-bold mb-2">1. Input Sensitivity</div>
                    <p className="text-sm text-slate-600">
                      A tiny 0.1% change in expected return can flip a portfolio from 0% to 50% allocation in an asset. The math is precise, but the inputs are guesses.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                    <div className="text-rose-500 font-bold mb-2">2. The Prediction Problem</div>
                    <p className="text-sm text-slate-600">
                      MVO assumes we know future returns with certainty. In reality, historical mean returns are terrible predictors of the future.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                    <div className="text-rose-500 font-bold mb-2">3. Unintuitive Weights</div>
                    <p className="text-sm text-slate-600">
                      Standard optimizers often suggest extreme long/short positions (corner solutions) that no sane manager would implement.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-slate-700">
                By 1990, Goldman Sachs traders Fischer Black and Robert Litterman realized they needed a model that respected the market's collective wisdom while allowing for subtle active management. They moved from asking <em>"What is the absolute return?"</em> to asking <em>"How different are we from the market?"</em>
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-4">
                <ConceptCard title="The Problem: Corner Solutions" color="rose">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="shrink-0 mt-1" size={20} />
                    <div className="space-y-2">
                      <p>Standard optimizers act like "unintelligent amplifiers." If you estimate Microsoft will return 10.1% and Apple 10.0%, MVO might tell you to short Apple to buy more Microsoft.</p>
                      <p className="text-sm font-semibold mt-2">Result: Portfolios that are impossible to implement, high turnover, and extreme concentration.</p>
                    </div>
                  </div>
                </ConceptCard>

                <ConceptCard title="The Solution: Black-Litterman (1990)" color="emerald">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="shrink-0 mt-1" size={20} />
                    <div className="space-y-2">
                      <p>Instead of starting from "zero knowledge," BL assumes the market is in equilibrium (CAPM). It then tilts the portfolio based on investor <strong>Confidence</strong>.</p>
                      <p className="text-sm font-semibold mt-2">Result: Stable, diversified portfolios anchored to the market weights.</p>
                    </div>
                  </div>
                </ConceptCard>
              </div>
            </div>
          </section>

          {/* 2. Mathematical Core */}
          <section id="math">
            <SectionHeader 
              icon={Activity} 
              title="Mathematical Formulation" 
              subtitle="The Bayesian engine under the hood." 
            />
            <div className="space-y-12">
              {/* Introduction to the Math */}
              <div className="prose prose-slate max-w-none text-slate-700">
                <p>The Black-Litterman model is essentially a <strong>Bayesian shrinkage estimator</strong>. It shrinks your subjective views towards the market equilibrium. The math can be intimidating, but it follows a logical four-step process: Prior (Market) + Likelihood (Views) = Posterior (Result) &rarr; Weights.</p>
              </div>

              {/* Step 1: The Prior */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">The Market Prior (Reverse Optimization)</h3>
                    <p className="text-sm text-slate-500">Reverse-engineering what the market is thinking.</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">We assume the market is efficient. Therefore, the current market capitalization weights (w<sub>mkt</sub>) must be optimal relative to some expected returns. We solve for these returns (Π).</p>
                <MathFormula label="Implied Equilibrium Returns">
                  Π = δΣw<sub>mkt</sub>
                </MathFormula>
                <div className="grid md:grid-cols-2 gap-6 mt-6 bg-slate-50 p-4 rounded-lg">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2">Calculating Delta (δ)</h4>
                    <p className="text-sm text-slate-600">The Risk Aversion Coefficient. It represents the market's price of risk.</p>
                    <div className="font-mono text-xs bg-white p-2 mt-1 border border-slate-200 rounded">δ = (R<sub>mkt</sub> - R<sub>f</sub>) / σ²<sub>mkt</sub></div>
                    <p className="text-xs text-slate-500 mt-1">Usually between 2.0 and 4.0 for developed markets.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2">The Covariance (Σ)</h4>
                    <p className="text-sm text-slate-600">Standard historical covariance matrix of asset returns (N x N).</p>
                  </div>
                </div>
              </div>

              {/* Step 2: The Views */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Modeling the Views (P, Q, and Ω)</h3>
                    <p className="text-sm text-slate-500">Quantifying subjective opinions.</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">Views are expressed as <strong>P · E[R] = Q + ε</strong>, where ε is the error term.</p>
                <div className="overflow-x-auto border rounded-lg border-slate-200">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2">Variable</th>
                        <th className="px-4 py-2">Dimensions</th>
                        <th className="px-4 py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-indigo-600">P</td>
                        <td className="px-4 py-3 font-mono text-slate-500">K x N</td>
                        <td className="px-4 py-3"><strong>Selection Matrix.</strong> Identifies which assets are involved in each of the <em>K</em> views.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-indigo-600">Q</td>
                        <td className="px-4 py-3 font-mono text-slate-500">K x 1</td>
                        <td className="px-4 py-3"><strong>View Vector.</strong> The expected return for each view (e.g., "5%" or 0.05).</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold text-indigo-600">Ω</td>
                        <td className="px-4 py-3 font-mono text-slate-500">K x K</td>
                        <td className="px-4 py-3"><strong>Uncertainty Matrix (Diagonal).</strong> The variance of the error term ε. Represents how unsure you are of your own view.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} /> The Hardest Part: Calculating Ω (Omega)
                  </h4>
                  <p className="text-sm text-yellow-900 mb-2">Practitioners rarely know the "variance" of their view. Two common methods exist:</p>
                  <ul className="list-disc list-inside text-sm text-yellow-900 space-y-1">
                    <li><strong>He & Litterman Method:</strong> Assumes the uncertainty is proportional to the prior variance (τPΣP<sup>T</sup>).</li>
                    <li><strong>Idzorek's Method:</strong> User gives a "Confidence %" (0-100%), which is mapped to Ω mathematically.</li>
                  </ul>
                </div>
              </div>

              {/* Step 3: The Master Formula */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">The Master Formula (Posterior)</h3>
                    <p className="text-sm text-slate-500">The Generalized Least Squares (GLS) estimator.</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">We combine the Market Prior with Investor Views. The result (E[R]) is a weighted average of the Implied Returns (Π) and the Views (Q), weighted by their respective precisions (inverse variances).</p>
                <MathFormula label="Posterior Expected Returns">
                  E[R] = [(τΣ)<sup>-1</sup> + P<sup>T</sup>Ω<sup>-1</sup>P]<sup>-1</sup> [(τΣ)<sup>-1</sup>Π + P<sup>T</sup>Ω<sup>-1</sup>Q]
                </MathFormula>
                <div className="mt-4 bg-indigo-50 p-4 rounded-lg text-indigo-900 text-sm">
                  <strong>Intuition:</strong>
                  <ul className="mt-2 space-y-2">
                    <li>If <strong>Ω → ∞</strong> (Zero Confidence), the term P<sup>T</sup>Ω<sup>-1</sup>P vanishes, and E[R] → Π (Result reverts to Market Returns).</li>
                    <li>If <strong>Ω → 0</strong> (Infinite Confidence), the formula ignores the market and forces E[R] to match Q exactly.</li>
                  </ul>
                </div>
              </div>

              {/* Step 4: Final Weights */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Final Portfolio Weights</h3>
                    <p className="text-sm text-slate-500">Turning returns into allocations.</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">Now that we have stable expected returns (E[R]) and a posterior covariance matrix (Σ<sub>post</sub>), we run the standard unconstrained maximization.</p>
                <MathFormula label="Optimal Weights">
                  w* = (δΣ<sub>post</sub>)<sup>-1</sup> E[R]
                </MathFormula>
                <p className="text-sm text-slate-500 mt-2">*Note: In practice, constraints (long-only, sector limits) are applied here using a numerical optimizer (like QuadProg) instead of this closed-form solution.</p>
              </div>
            </div>
          </section>

          {/* 3. Intuition & Examples */}
          <section id="intuition">
            <SectionHeader 
              icon={Scale} 
              title="Intuitive Mechanics" 
              subtitle="Constructing Views: A Concrete Example" 
            />
            <div className="mb-12">
              <p className="text-lg text-slate-700 mb-6">The hardest part of BL is constructing the View Matrix (P) and View Vector (Q). Let's look at a real scenario involving 4 assets: <strong> Apple, Microsoft, Exxon, and Chevron</strong>.</p>
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-slate-800 text-white p-4 font-bold flex justify-between items-center">
                  <span>Scenario: Relative Outperformance</span>
                  <span className="text-xs font-normal bg-slate-700 px-2 py-1 rounded">Matrix Construction</span>
                </div>
                <div className="p-6 grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">The View</h4>
                    <p className="text-slate-600 mb-4 bg-yellow-50 p-4 rounded-lg border border-yellow-100">"I believe Tech (Apple & MSFT) will outperform Energy (Exxon & CVX) by <strong>5%</strong> with high confidence."</p>
                    <h4 className="font-bold text-slate-800 mb-2">Assets in Portfolio</h4>
                    <ol className="list-decimal list-inside text-sm text-slate-600 space-y-1 mb-4 font-mono">
                      <li>Apple (AAPL)</li>
                      <li>Microsoft (MSFT)</li>
                      <li>Exxon (XOM)</li>
                      <li>Chevron (CVX)</li>
                    </ol>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg font-mono text-sm border border-slate-200">
                    <div className="mb-4">
                      <div className="text-slate-500 mb-1">// The P Matrix (The Link)</div>
                      <div className="text-slate-500 mb-1">// AAPL, MSFT, XOM, CVX</div>
                      <div className="text-indigo-700 font-bold">P = [ 0.5, 0.5, -0.5, -0.5 ]</div>
                      <p className="text-xs text-slate-400 mt-2">*Tech assets get positive weights summing to 1. Energy assets get negative weights summing to -1.</p>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-1">// The Q Vector (The Magnitude)</div>
                      <div className="text-indigo-700 font-bold">Q = [ 0.05 ]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 space-y-6">
                  <h3 className="text-2xl font-bold">The Tug of War</h3>
                  <p className="opacity-90 leading-relaxed text-lg">Visualizing the optimization process as a physical system.</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Globe size={24} />
                      </div>
                      <div>
                        <strong className="block text-lg">The Anchor (Market)</strong>
                        <span className="opacity-80">A massive gravity well pulling weights towards the S&P 500 capitalization.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Users size={24} />
                      </div>
                      <div>
                        <strong className="block text-lg">The Challengers (You)</strong>
                        <span className="opacity-80">You pull the rope towards your views. The strength of your pull depends on Ω.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Visual Diagram */}
                <div className="w-full md:w-1/2 bg-white/10 rounded-xl p-8 backdrop-blur-md border border-white/20">
                  <div className="flex justify-between items-center text-center mb-4">
                    <div className="text-xs uppercase tracking-widest opacity-70">Market</div>
                    <div className="text-xs uppercase tracking-widest opacity-70">Result</div>
                    <div className="text-xs uppercase tracking-widest opacity-70">View</div>
                  </div>
                  <div className="relative h-4 bg-white/20 rounded-full my-6">
                    <div className="absolute top-0 bottom-0 left-0 bg-white/40 w-1/3 rounded-l-full" title="Market Pull"></div>
                    <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-yellow-400 rounded-full transform -translate-y-1/2 shadow-[0_0_15px_rgba(250,204,21,0.6)] z-10" title="Equilibrium Point"></div>
                    <div className="absolute top-0 bottom-0 right-0 bg-indigo-500 w-1/4 rounded-r-full opacity-60" title="Investor Pull"></div>
                  </div>
                  <div className="text-center italic opacity-90 text-sm mt-4">"High Confidence reduces Ω, pulling the result closer to your View."</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Implementation Guide */}
          <section id="implementation">
            <SectionHeader 
              icon={Layers} 
              title="Implementation Logic" 
              subtitle="Step-by-Step Workflow for Developers" 
            />
            <div className="relative">
              <div className="absolute left-[1.25rem] top-8 bottom-8 w-0.5 bg-slate-200"></div>
              <div className="space-y-10">
                <StepCard 
                  number="1" 
                  title="Data Ingestion" 
                  content={
                    <div className="space-y-2">
                      <p>Gather historical prices for your universe (N assets). Calculate the <strong>Covariance Matrix (Σ)</strong> and the current <strong>Market Capitalization Weights (w)</strong>.</p>
                      <div className="text-xs font-mono bg-slate-100 p-2 rounded">Input: Price_History[T, N], Market_Caps[N]</div>
                    </div>
                  } 
                />
                <StepCard 
                  number="2" 
                  title="Reverse Optimization" 
                  content={
                    <div className="space-y-2">
                      <p>Determine the risk aversion coefficient (δ). Usually derived from the Market Risk Premium (MRP) / Market Variance.</p>
                      <p>Calculate Implied Equilibrium Returns: <code>Pi = delta * Sigma * weights</code>.</p>
                    </div>
                  } 
                />
                <StepCard 
                  number="3" 
                  title="Define Views" 
                  content={
                    <div className="space-y-2">
                      <p>Construct the P matrix (N x K) and Q vector (K x 1) where K is the number of views.</p>
                      <p><strong>Crucial Step:</strong> Set Ω. A common heuristic is the <em>Idzorek Method</em>, where a user specifies a % confidence (0-100%), which is then mapped mathematically to variance.</p>
                    </div>
                  } 
                />
                <StepCard 
                  number="4" 
                  title="Bayesian Update" 
                  content={
                    <div className="space-y-2">
                      <p>Apply the Master Formula to generate the posterior Expected Returns vector (E) and posterior Covariance.</p>
                      <div className="text-xs font-mono bg-slate-100 p-2 rounded">Output: New_Exp_Returns[N], New_Covariance[N,N]</div>
                    </div>
                  } 
                />
                <StepCard 
                  number="5" 
                  title="Final Optimization" 
                  content={
                    <div className="space-y-2">
                      <p>Feed the <strong>New Expected Returns</strong> and <strong>New Covariance</strong> into a standard Mean-Variance Optimizer to get final weights.</p>
                      <p>The result will be a portfolio that tilts away from the benchmark only where you had strong views.</p>
                    </div>
                  } 
                />
              </div>
            </div>
          </section>

          {/* 5. Institutional Usage - Expanded */}
          <section id="usage">
            <SectionHeader 
              icon={Building2} 
              title="Institutional Adoption" 
              subtitle="The Operating System of Modern Finance." 
            />
            <div className="mb-10 text-slate-700 leading-relaxed text-lg">
              <p>The Black-Litterman model is not just an academic curiosity; it is the standard engine for <strong>Global Tactical Asset Allocation (GTAA)</strong>. It allows institutions to process vast amounts of alternative data (satellite imagery, credit card flows) into a cohesive portfolio without triggering excessive turnover.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Goldman Sachs */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
                <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">Goldman Sachs <Briefcase size={16} className="opacity-50"/></h3>
                    <p className="text-slate-400 text-sm mt-1">Asset Management (GSAM)</p>
                  </div>
                  <div className="bg-slate-800 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Originator</div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">Strategy: Global Tactical Asset Allocation</h4>
                    <p className="text-slate-600 text-sm">GSAM uses BL to blend macro-economic views across disparate asset classes.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <strong className="text-indigo-700 text-sm block mb-2">The "Zero View" Advantage</strong>
                    <p className="text-xs text-slate-600">In a portfolio of 30 currencies, a manager might only have views on the Euro and Yen. Standard optimizers force a view on <em>everything</em>. BL allows GS to hold the other 28 currencies at market weight automatically, drastically reducing model risk.</p>
                  </div>
                </div>
              </div>

              {/* BlackRock */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
                <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">BlackRock <Briefcase size={16} className="opacity-50"/></h3>
                    <p className="text-slate-400 text-sm mt-1">Systematic Active Equity</p>
                  </div>
                  <div className="bg-slate-800 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Scale</div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">Strategy: Human-Machine Integration</h4>
                    <p className="text-slate-600 text-sm">Used within the "Aladdin" platform to blend fundamental analyst ratings with quantitative signals.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <strong className="text-indigo-700 text-sm block mb-2">Scenario Analysis</strong>
                    <p className="text-xs text-slate-600">BlackRock uses BL logic for "Mega Force" adjustments. If a manager wants to test "What if Inflation hits 5%?", they input this as a 100% confidence view. The model propagates this shock across all asset classes via the covariance matrix to show the portfolio impact.</p>
                  </div>
                </div>
              </div>

              {/* Vanguard */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
                <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">Vanguard <Briefcase size={16} className="opacity-50"/></h3>
                    <p className="text-slate-400 text-sm mt-1">Quantitative Equity Group</p>
                  </div>
                  <div className="bg-slate-800 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Efficiency</div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">Strategy: Signal Shrinkage</h4>
                    <p className="text-slate-600 text-sm">Vanguard uses BL to "tame" aggressive machine learning signals.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <strong className="text-indigo-700 text-sm block mb-2">Low-Cost Alpha</strong>
                    <p className="text-xs text-slate-600">Pure ML models often suggest high turnover (buying/selling daily). Vanguard uses the Benchmark as the BL Prior. This forces the ML signal to have "extraordinary evidence" before the model allows it to deviate from the low-cost index, keeping transaction costs minimal.</p>
                  </div>
                </div>
              </div>

              {/* Wealthfront / Betterment */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
                <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">Wealthfront <Briefcase size={16} className="opacity-50"/></h3>
                    <p className="text-slate-400 text-sm mt-1">Robo-Advising</p>
                  </div>
                  <div className="bg-slate-800 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Retail</div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">Strategy: Direct Indexing</h4>
                    <p className="text-slate-600 text-sm">Democratizing advanced allocation for retail accounts with $100k+.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <strong className="text-indigo-700 text-sm block mb-2">Personalization at Scale</strong>
                    <p className="text-xs text-slate-600">If a user works at Google, they shouldn't own Google stock (concentrated risk). BL allows the robo-advisor to set a view of "-100% weight" on GOOG, and then <em>automatically re-optimize</em> the rest of the technology sector to maintain the same beta/risk profile without that single stock.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <h4 className="flex items-center gap-2 font-bold text-indigo-900 mb-2">
                <Server size={20}/> Why do institutions love it?
              </h4>
              <ul className="grid md:grid-cols-2 gap-4 text-sm text-indigo-800">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="shrink-0 mt-0.5"/> 
                  <span><strong>Regulatory Compliance:</strong> It's explainable. "We bought X because the benchmark owns X," is a defensible default position.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="shrink-0 mt-0.5"/> 
                  <span><strong>Capacity Management:</strong> It handles billions of dollars easily because it relies on market liquidity (market cap weights) as the baseline.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 6. Modern Extensions - Expanded */}
          <section id="extensions">
            <SectionHeader 
              icon={Brain} 
              title="Modern Extensions" 
              subtitle="Beyond the Gaussian World: Entropy and Factors." 
            />
            <div className="space-y-12">
              {/* Extension 1: Entropy Pooling */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">1. Entropy Pooling (The Generalization)</h3>
                    <p className="text-slate-500 font-medium mt-1">Attilio Meucci (2008)</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
                    <GitMerge size={24} />
                  </div>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">Classic BL is actually a special case of a broader framework called <strong>Entropy Pooling</strong>. While BL assumes all assets follow a Normal Distribution (Bell Curve), Entropy Pooling makes no assumptions. It allows you to input views on <em>anything</em>: Volatility, Skewness, or Tail Risk.</p>
                <div className="bg-slate-50 border-l-4 border-indigo-500 p-6 my-6 rounded-r-lg">
                  <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">The Core Math: KL Divergence</h4>
                  <p className="text-sm text-slate-600 mb-4">We look for a new distribution (p) that minimizes the "Information Distance" (Relative Entropy) from the market prior (m), subject to the constraints of our views.</p>
                  <div className="font-mono text-sm md:text-base text-slate-800 bg-white p-4 rounded border border-slate-200 overflow-x-auto">
                    argmin(p) ∑ pⱼ [ ln(pⱼ) - ln(mⱼ) ]
                  </div>
                  <div className="mt-2 text-xs text-slate-500">*We find the "Posterior" (p) that satisfies our views while distorting the "Prior" (m) as little as possible.</div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <strong className="text-indigo-900 block mb-1">Why it matters</strong>
                    <p className="text-sm text-indigo-800">You can express non-linear views like: "I believe there is a 30% chance the market crashes by more than 20%." Standard BL cannot handle this "Tail View."</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <strong className="text-indigo-900 block mb-1">The Result</strong>
                    <p className="text-sm text-indigo-800">A full posterior distribution (typically a histogram of Monte Carlo simulations) rather than just a Mean and Covariance matrix.</p>
                  </div>
                </div>
              </div>

              {/* Extension 2: Factor-Based BL */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">2. Factor-Based Black-Litterman</h3>
                    <p className="text-slate-500 font-medium mt-1">Viewing the world through Drivers, not Assets.</p>
                  </div>
                  <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                    <Network size={24} />
                  </div>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">Instead of having views on "Apple" or "Google", quants often have views on <strong>Factors</strong> (Value, Momentum, Inflation, GDP). We project these views onto the assets using a factor loading matrix (B).</p>
                <MathFormula label="Factor View Projection">
                  Q<sub>assets</sub> = B · Q<sub>factors</sub>
                </MathFormula>
                <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-xl">
                  <h4 className="font-bold text-emerald-900 mb-3 text-sm">Example Workflow</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
                    <li><strong>Decompose:</strong> Regress asset returns against factors (e.g., Fama-French 5 factors) to get Beta (B).</li>
                    <li><strong>Form View:</strong> "I believe <em>Value</em> stocks will outperform <em>Growth</em> by 2%."</li>
                    <li><strong>Map:</strong> The model translates this single factor view into tiny adjustments for hundreds of stocks based on their specific exposure to Value.</li>
                  </ol>
                </div>
              </div>

              {/* Extension 3: AI / Deep Learning */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">3. AI Integration (Dynamic Omega)</h3>
                    <p className="text-slate-500 font-medium mt-1">Using Neural Networks to calibrate Confidence.</p>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                    <Zap size={24} />
                  </div>
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">The weakest link in BL is the human "Confidence" parameter (Ω). Modern funds use <strong>Bayesian Neural Networks (BNNs)</strong> or <strong>Dropout</strong> in Deep Learning to estimate this.</p>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  <div className="border border-slate-100 p-4 rounded-lg bg-slate-50">
                    <div className="text-xs font-mono text-slate-400 mb-2">INPUT</div>
                    <div className="font-semibold text-slate-700">LSTM / Transformer Model</div>
                    <div className="my-2 text-sm text-slate-600">Predicts next month's return. Crucially, it outputs a probability distribution, not just a number.</div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <ArrowRight size={16} className="text-slate-400"/>
                      <span className="font-mono text-sm font-bold text-purple-700">Mean (μ) &rarr; View (Q)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ArrowRight size={16} className="text-slate-400"/>
                      <span className="font-mono text-sm font-bold text-purple-700">Variance (σ²) &rarr; Confidence (Ω)</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-4 italic bg-purple-50 p-3 rounded border border-purple-100">"If the AI model is volatile/uncertain in its prediction, BL automatically ignores the view and reverts to the index. It acts as an automatic kill-switch for bad AI predictions."</p>
              </div>
            </div>
          </section>

          {/* 7. Pros and Cons */}
          <section id="summary" className="mb-20">
            <SectionHeader 
              icon={ShieldCheck} 
              title="Critical Evaluation" 
              subtitle="Why use it? Why avoid it?" 
            />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl overflow-hidden">
                <div className="bg-emerald-100 px-6 py-4 border-b border-emerald-200 font-bold text-emerald-800 flex items-center justify-between">
                  <span>Advantages</span>
                  <CheckCircle size={20} />
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                      <span><strong>Intuitive Allocation:</strong> Avoids extreme corner solutions; portfolios look "reasonable".</span>
                    </li>
                    <li className="flex gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                      <span><strong>Stability:</strong> Small changes in views don't cause massive turnover.</span>
                    </li>
                    <li className="flex gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                      <span><strong>Explicit Confidence:</strong> Forces managers to quantify their uncertainty (Ω).</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-rose-200 bg-rose-50/50 rounded-xl overflow-hidden">
                <div className="bg-rose-100 px-6 py-4 border-b border-rose-200 font-bold text-rose-800 flex items-center justify-between">
                  <span>Limitations</span>
                  <AlertTriangle size={20} />
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
                      <span><strong>Complexity:</strong> Requires matrix algebra and specialized software. Harder to explain to retail clients.</span>
                    </li>
                    <li className="flex gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
                      <span><strong>CAPM Reliance:</strong> Assumes market is initially efficient. If there is a massive bubble, the "Anchor" is flawed.</span>
                    </li>
                    <li className="flex gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
                      <span><strong>Parameter Sensitivity:</strong> Incorrect calibration of τ or Ω can negate the benefits.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Comparisons Table */}
          <section className="overflow-x-auto pb-12">
            <SectionHeader 
              icon={PieChart} 
              title="Comparison Data" 
              subtitle="Evolution of Portfolio Models" 
            />
            <table className="w-full text-left border-collapse bg-white rounded-lg overflow-hidden shadow-sm text-sm md:text-base">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Mean-Variance (1952)</th>
                  <th className="p-4 bg-indigo-600">Black-Litterman (1990)</th>
                  <th className="p-4">Entropy Pooling (2008)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-4 font-semibold">Philosophy</td>
                  <td className="p-4">"Data is Truth"</td>
                  <td className="p-4 bg-indigo-50 font-medium text-indigo-900">"Market is Truth"</td>
                  <td className="p-4">"Information Distance"</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Inputs</td>
                  <td className="p-4">Historical Mean/Covariance</td>
                  <td className="p-4 bg-indigo-50 font-medium text-indigo-900">CAPM Prior + Linear Views</td>
                  <td className="p-4">Prior PDF + General Views</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Optimization</td>
                  <td className="p-4">Quadratic Programming</td>
                  <td className="p-4 bg-indigo-50 font-medium text-indigo-900">Bayesian Update</td>
                  <td className="p-4">KL-Divergence Min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Weakness</td>
                  <td className="p-4 text-rose-600">Error Maximization</td>
                  <td className="p-4 bg-indigo-50 font-medium text-indigo-900">Normality Assumption</td>
                  <td className="p-4">Computational Complexity</td>
                </tr>
              </tbody>
            </table>
          </section>

        </main>
    </ArticleFrame>
  );
}