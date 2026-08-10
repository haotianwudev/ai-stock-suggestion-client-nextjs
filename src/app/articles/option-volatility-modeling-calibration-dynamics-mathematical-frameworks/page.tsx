'use client';

import React from 'react';
import { BookOpen, Calculator, LineChart, TrendingUp, Activity, Layers, Zap, BrainCircuit, ShieldCheck, Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

// --- Shared Components --- //
import { InlineMath } from '@/components/articles/math';

export default function OptionVolatilityModelingArticle() {
  return (
    <ArticleFrame slug="option-volatility-modeling-calibration-dynamics-mathematical-frameworks">
      <div className="pb-24">
        <InfographicSlot alt="Option Volatility Modeling Infographic" />

        <main className="max-w-4xl mx-auto py-16">

          {/* SECTION 1: Introduction */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Volatility Surface Paradigm</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The genesis of modern quantitative options pricing is indelibly linked to the framework introduced by Fischer Black, Myron Scholes, and Robert Merton in 1973. The foundational assumption of the BSM model is that the underlying asset's price follows a geometric Brownian motion, defined by a constant drift and, crucially, a <strong className="text-slate-900 dark:text-white">constant volatility parameter</strong> across all strike prices and expirations.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              While this elegant closed-form solution catalyzed the explosive growth of the global derivatives market, the empirical realities of financial markets—most vividly demonstrated during the global equity market crash of October 1987—proved that the assumption of constant, log-normally distributed volatility is structurally flawed.
            </p>
            
            <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] p-6 rounded-r-xl mb-8">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> The Market Reality
              </h4>
              <p className="text-emerald-800 dark:text-emerald-300/90 text-sm leading-relaxed">
                Market participants do not view volatility as a static parameter; rather, they demand a significant premium for out-of-the-money (OTM) options to protect against severe tail-risk events and rapid market drawdowns.
              </p>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              This dynamic risk pricing manifests as the <strong className="text-slate-900 dark:text-white">implied volatility surface (IVS)</strong>, an empirical landscape where implied volatility is a pronounced function of both the option's <em>moneyness</em> (the strike price relative to the current forward price) and its <em>time to maturity</em>. The cross-sectional plot of implied volatility against strike price typically reveals a "smile" in foreign exchange markets or a pronounced "skew" (or smirk) in equity markets.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              The evolution of volatility modeling represents a trajectory of increasing mathematical sophistication:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600 dark:text-slate-400 mb-10">
              <li>Deterministic parametric fits like the <strong className="text-slate-900 dark:text-white">SVI model</strong>.</li>
              <li>Continuous-time frameworks including the <strong className="text-slate-900 dark:text-white">Dupire local volatility model</strong>.</li>
              <li>Stochastic frameworks like the <strong className="text-slate-900 dark:text-white">Heston model</strong>.</li>
              <li>Hybrid <strong className="text-slate-900 dark:text-white">Local-Stochastic Volatility (LSV)</strong> architectures.</li>
              <li>Modern frontiers leveraging <strong className="text-slate-900 dark:text-white">Rough Volatility</strong> and deep neural networks.</li>
            </ul>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 2: Calibration */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Mathematical Foundations of Calibration</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Model calibration is the mathematical inverse problem of finding a set of model parameters that minimizes the discrepancy between theoretical option prices generated by a pricing model and empirical prices observed in the highly liquid vanilla options market.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The calibration procedure is framed as a high-dimensional, non-linear optimization task. The generic calibration objective function is mathematically expressed as:
            </p>
            
            <FormulaPanel 
              title="Calibration Objective Function"
              formula="\Theta^* = \text{argmin}_{\Theta} \sum_{i=1}^{N} \sum_{j=1}^{M} w_{i,j} (\sigma_{\text{mod}}(\Theta; K_i, T_j) - \sigma_{\text{mkt}}(K_i, T_j))^2 + \lambda\mathcal{R}(\Theta)"
            />
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-8 mb-10">
              Here, <InlineMath math="K_i" /> represents discrete strike prices, <InlineMath math="T_j" /> expirations, <InlineMath math="\sigma_{\text{mkt}}" /> the market-quoted implied volatility, and <InlineMath math="\sigma_{\text{mod}}" /> the model-generated volatility. The weighting matrix <InlineMath math="w_{i,j}" /> is critical for robust calibration, often assigning heavier weights to liquid ATM options. The regularization term <InlineMath math="\lambda\mathcal{R}(\Theta)" /> prevents overfitting to market micro-structural noise.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-6 font-serif">Algorithmic Optimization Strategies</h3>
            
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="p-4 w-1/5">Category</th>
                    <th className="p-4 border-l border-slate-200 dark:border-slate-800 w-1/4">Algorithms</th>
                    <th className="p-4 border-l border-slate-200 dark:border-slate-800">Advantages</th>
                    <th className="p-4 border-l border-slate-200 dark:border-slate-800">Limitations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-semibold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Local Optimizers</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Levenberg-Marquardt, L-BFGS, SLSQP</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Highly efficient; converges in ms; ideal for smooth spaces.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Sensitive to initial guess; prone to local minima entrapment.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Global Optimizers</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Simulated Annealing, Genetic Algorithms</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Avoids local minima; requires no precise initial guess.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Computationally heavy; lethargic convergence.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-semibold text-amber-600 dark:text-amber-400">Hybrid Approaches</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Grid Search + Levenberg-Marquardt</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">High confidence global minimum; reduced time.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Grid density heavily impacts final performance.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 3: SVI */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <LineChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Stochastic Volatility Inspired (SVI)</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Before deploying computationally heavy SDEs, traders require a robust, arbitrage-free parametric representation of the implied volatility surface. Conceived by Jim Gatheral, the SVI model provides a highly tractable, smile-consistent framework. It is formulated in terms of total implied variance, <InlineMath math="w(k, t) = \sigma_{\text{BS}}^2(k, t)t" />, where <InlineMath math="k = \ln(K/F_t)" /> is the log-moneyness.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-6 font-serif">Raw SVI Formulation</h3>
            
            <FormulaPanel 
              title="Raw SVI"
              formula="w(k) = a + b(\rho(k - m) + \sqrt{(k - m)^2 + \sigma^2})"
            />
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-8 mb-8">
              The five Raw parameters <InlineMath math="\chi = \{a, b, \rho, m, \sigma\}" /> dictate vertical shifts, slopes, skews, translations, and ATM curvature respectively. To make these parameters intuitive for trading desks, the industry adopted the <strong>SVI-Jump-Wings (SVI-JW)</strong> formulation.
            </p>
            
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 mb-8">
              <table className="w-full text-left text-sm border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="p-4 w-1/6">SVI-JW</th>
                    <th className="p-4 border-l border-slate-200 dark:border-slate-800 w-2/5">Mathematical Definition</th>
                    <th className="p-4 border-l border-slate-200 dark:border-slate-800">Financial Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-500"><InlineMath math="v_t" /></td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-400"><InlineMath math="v_t = (a + b(-\rho m + \sqrt{m^2 + \sigma^2}))/t" /></td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">At-The-Money (ATM) implied variance.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-500"><InlineMath math="\psi_t" /></td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-400"><InlineMath math="\psi_t = (1/\sqrt{w_t})(b/2)(-m/\sqrt{m^2 + \sigma^2} + \rho)" /></td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">ATM forward skew (first derivative of volatility).</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-500"><InlineMath math="p_t" /></td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-400"><InlineMath math="p_t = (1/\sqrt{w_t})b(1 - \rho)" /></td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Asymptotic slope of the out-of-the-money put wing.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-500"><InlineMath math="c_t" /></td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-400"><InlineMath math="c_t = (1/\sqrt{w_t})b(1 + \rho)" /></td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Asymptotic slope of the out-of-the-money call wing.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Arbitrage-Free Constraints
              </h4>
              <p className="text-amber-800 dark:text-amber-300/90 text-sm leading-relaxed mb-4">
                Avoiding calendar spread arbitrage requires total variance to monotonically increase with time: <InlineMath math="\partial_t w(k, t) \geq 0" />. Butterfly arbitrage is avoided if the implied probability density is strictly non-negative. This is assessed by evaluating:
              </p>
              
              <FormulaPanel 
                title="Butterfly Arbitrage Constraint"
                formula="g(k) = (1 - \frac{kw'(k)}{2w(k)})^2 - \frac{(w'(k))^2}{4(\frac{1}{w(k)} + \frac{1}{4})} + \frac{w''(k)}{2}"
              />
              
              <p className="text-amber-800 dark:text-amber-300/90 text-sm leading-relaxed mt-4">
                For model validity, <InlineMath math="g(k) \geq 0" /> for all <InlineMath math="k \in \mathbb{R}" />.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 4: Dupire Local Volatility */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Dupire Local Volatility Model</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Introduced independently by Bruno Dupire, Emanuel Derman, and Iraj Kani in 1994, the local volatility (LV) model altered quantitative finance by treating volatility not as constant or stochastic, but as a <strong className="text-slate-900 dark:text-white">deterministic mathematical function</strong> of both current asset level <InlineMath math="S_t" /> and time <InlineMath math="t" />.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-6 font-serif">The Fokker-Planck Equation</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              By assuming the asset follows <InlineMath math="dS_t = (r_t - q_t)S_t dt + \sigma_{\text{loc}}(S_t, t)S_t dW_t" />, Dupire derived a formula linking market call prices <InlineMath math="C(K, T)" /> directly to a unique local volatility surface:
            </p>
            
            <FormulaPanel 
              title="Dupire Formula"
              formula="\sigma_{\text{loc}}^2(K, T) = \frac{\frac{\partial C}{\partial T} + (r_T - q_T)K\frac{\partial C}{\partial K} + q_T C}{\frac{1}{2}K^2\frac{\partial^2 C}{\partial K^2}}"
            />
            
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-r-xl mt-8">
              <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" /> Statics vs. Dynamics
              </h4>
              <p className="text-blue-800 dark:text-blue-300/90 text-sm leading-relaxed">
                <strong>The Statics:</strong> Because the LV function is stripped directly from the arbitrage-free surface, it perfectly matches the prices of all liquid vanilla options. It beautifully resolves the ambiguity of which volatility to plug into an exotic pricing engine.<br/><br/>
                <strong>The Dynamics:</strong> However, the LV model is dangerously flawed in dynamics. It assumes future volatility is purely deterministic, forcing smiles to systematically flatten out over time. This contradicts empirical "sticky strike" reality, rendering pure LV perilous for pricing second-generation exotics like cliquets.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 5: Heston Stochastic Volatility */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Heston Stochastic Volatility</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              To rectify the unrealistic forward dynamics of local volatility, quantitative finance turned to stochastic volatility (SV) models. The Heston model (1993) allows variance itself to fluctuate unpredictably, driven by its own source of uncertainty.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-6 font-serif">Mathematical Formulation (SDEs)</h3>
            
            <FormulaPanel 
              title="Heston SDEs"
              formula="\begin{aligned} dS_t &= \mu S_t dt + \sqrt{v_t}S_t dW_{1,t} \\ dv_t &= \kappa(\theta - v_t)dt + \sigma\sqrt{v_t}dW_{2,t} \end{aligned}"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <strong className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] block mb-2 font-serif text-lg">θ (Long-Run Average)</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Theoretical equilibrium variance market gravitates toward.</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <strong className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] block mb-2 font-serif text-lg">κ (Mean-Reversion)</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Speed at which volatility spikes decay back to historical average.</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <strong className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] block mb-2 font-serif text-lg">σ (Vol-of-Vol)</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Controls variance amplitude; higher value deepens smile convexity.</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <strong className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] block mb-2 font-serif text-lg">ρ (Correlation)</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Generates asymmetric downward skew ("leverage effect").</span>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> The Feller Condition & Limitations
              </h4>
              <p className="text-amber-800 dark:text-amber-300/90 text-sm leading-relaxed">
                To guarantee variance remains strictly positive, the model must satisfy the Feller condition: <InlineMath math="2\kappa\theta \geq \sigma^2" />. When violated (common in real markets), variance can touch zero, requiring numerical truncation. <br/><br/>
                Additionally, Heston fails to capture the explosive skew observed at very short maturities, as its ATM skew behaves asymptotically as <InlineMath math="O(T)" /> as <InlineMath math="T \to 0" />.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 6: Hybrid LSV */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Hybrid Local-Stochastic Volatility (LSV)</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Recognizing that LV perfectly fits static markets while SV provides realistic future dynamics, the industry engineered Hybrid Local-Stochastic Volatility (LSV) models. An LSV model modulates a stochastic variance process with a deterministic local volatility multiplier.
            </p>
            
            <FormulaPanel 
              title="LSV SDEs"
              formula="\begin{aligned} dS_t &= \mu S_t dt + L(S_t, t)\sqrt{v_t}S_t dW_{1,t} \\ dv_t &= \kappa(\theta - v_t)dt + \sigma\sqrt{v_t}dW_{2,t} \end{aligned}"
            />
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-8 mb-8">
              The absolute mathematical lynchpin is the leverage function <InlineMath math="L(S_t, t)" />. By invoking <strong>Gyöngy's mimicking theorem</strong>, the model guarantees a perfect reproduction of the vanilla market surface if it satisfies the fixed-point condition:
            </p>
            
            <FormulaPanel 
              title="Leverage Function Condition"
              formula="L^2(K, T) = \frac{\sigma_{\text{Dup}}^2(K, T)}{\mathbb{E}[v_T | S_T = K]}"
            />
            
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 mt-10">
              <table className="w-full text-left text-sm border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="p-4 text-slate-800 dark:text-slate-200">Feature</th>
                    <th className="p-4 border-l border-slate-200 dark:border-slate-800 text-pink-600 dark:text-pink-400">Dupire LV</th>
                    <th className="p-4 border-l border-slate-200 dark:border-slate-800 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Heston SV</th>
                    <th className="p-4 border-l border-slate-200 dark:border-slate-800 text-purple-600 dark:text-purple-400">Hybrid LSV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">Vanilla Fit</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Perfect</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Approximate</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold">Perfect</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">Smile Dynamics</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Deterministic (flattens)</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Realistic</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold">Highly realistic</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">Primary Use Case</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">1st-gen exotics</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Vanilla & Greeks</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold">Complex path-dependent exotics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 7 & 8: Frontiers & Deep Learning */}
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-serif text-slate-900 dark:text-white tracking-tight">Rough Volatility</h2>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Empirical high-frequency data conclusively demonstrates that volatility sample paths are highly jagged and anti-persistent, driven by <strong>fractional Brownian motion (fBm)</strong>.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Governed by the Hurst parameter <InlineMath math="H \approx 0.1" />, models like Rough Bergomi achieve theoretical supremacy by allowing the ATM skew to scale as a power law <InlineMath math="T^{H-1/2}" />.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-xl">
                  <p className="text-amber-800 dark:text-amber-300/90 text-sm leading-relaxed">
                    <strong>The Bottleneck:</strong> fBm is non-Markovian. The future strictly depends on the entire continuous history, precluding standard PDE solvers and creating hours-long calculation bottlenecks.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-serif text-slate-900 dark:text-white tracking-tight">Deep Learning Models</h2>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  To resolve non-Markovian bottlenecks, the industry leverages Deep Neural Networks (DNNs) as <strong>Surrogate Pricing Networks</strong>.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Trained offline on millions of simulations, networks replace agonizing Monte Carlo engines, collapsing evaluation time to ~40 milliseconds.
                </p>
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] p-4 rounded-r-xl">
                  <p className="text-emerald-800 dark:text-emerald-300/90 text-sm leading-relaxed">
                    <strong>Deep Differential Networks (DDN)</strong> utilize automatic differentiation (<InlineMath math="\varphi_{\text{NN}}" />) to extract exact analytical gradients, allowing real-time, instantaneous calibration of rough volatility models.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 9: Strategic Utility */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Strategic Utility & Risk Management</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The selection of models profoundly dictates P&L dynamics and high-dimensional risk control. In standard delta-hedging, simple BSM constantly bleeds P&L by ignoring "shadow greeks" like Vanna and Volga. Stochastic models ensure mathematically robust hedging across regimes.
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-6 font-serif">The Vanna-Volga Method</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              While LSV models dominate structured products, FX traders frequently use the heuristic Vanna-Volga (VV) approach for 1st-generation exotics. Instead of heavy SDEs, traders explicitly replicate the smile hedging cost:
            </p>
            
            <FormulaPanel 
              title="Vanna-Volga Price Adjustment"
              formula="X_{VV} = X_{BS} + w_{\text{ATM}}\Delta_{\text{ATM}} + w_{\text{RR}}\Delta_{\text{RR}} + w_{\text{BF}}\Delta_{\text{BF}}"
            />
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-8 mb-4">
              This adjusts the base BSM price by adding the required weights (<InlineMath math="w" />) of At-The-Money (Vega), Risk Reversal (Vanna/Skew), and Butterfly (Volga/Convexity) instruments.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To manage aggregate portfolio risk under <strong>Model Risk</strong>, traders employ relative indifference pricing, scaling bid-ask spreads dynamically based on personal risk aversion and existing book inventory, optimizing P&L even under chaotic volatility conditions.
            </p>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}
