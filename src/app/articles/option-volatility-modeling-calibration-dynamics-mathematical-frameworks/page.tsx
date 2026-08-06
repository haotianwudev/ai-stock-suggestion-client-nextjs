'use client';

import React from 'react';
import { BookOpen, Calculator, LineChart, TrendingUp, Activity, Layers, Zap, BrainCircuit, ShieldCheck, Info, AlertTriangle, Lightbulb, Music, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Shared Components --- //
const MathBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-8 overflow-x-auto bg-slate-800 text-indigo-100 p-6 rounded-2xl shadow-lg flex justify-center items-center text-center font-mono text-lg md:text-xl border border-slate-700">
    {children}
  </div>
);

const InlineMath = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono font-medium text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100/50">
    {children}
  </span>
);

const Callout = ({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'insight'; title?: string; children: React.ReactNode }) => {
  const styles = {
    info: {
      bg: 'bg-blue-50/80',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="text-blue-500" size={24} />,
      titleColor: 'text-blue-900',
    },
    warning: {
      bg: 'bg-amber-50/80',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      titleColor: 'text-amber-900',
    },
    insight: {
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: <Lightbulb className="text-emerald-500" size={24} />,
      titleColor: 'text-emerald-900',
    }
  };
  const config = styles[type];
  return (
    <div className={`my-8 p-6 rounded-2xl border ${config.bg} ${config.border} flex flex-col md:flex-row gap-4 items-start shadow-sm`}>
      <div className="shrink-0 mt-1 bg-white p-2 rounded-full shadow-sm">
        {config.icon}
      </div>
      <div>
        {title && <h4 className={`font-bold text-lg mb-2 ${config.titleColor}`}>{title}</h4>}
        <div className={`leading-relaxed ${config.text}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon: Icon, gradient, children }: { title: string; icon: React.ElementType; gradient: string; children: React.ReactNode }) => (
  <section className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-12 mb-16 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradient}`} />
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg shrink-0`}>
        <Icon size={32} />
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
    </div>
    <div className="text-lg text-slate-600 leading-relaxed space-y-6">
      {children}
    </div>
  </section>
);

// --- Main Application --- //
export default function OptionVolatilityModelingArticle() {
  return (
    <ArticleFrame slug="option-volatility-modeling-calibration-dynamics-mathematical-frameworks">
      <InfographicSlot alt="Option Volatility Modeling Infographic" />

      {/* Main Content Start */}
      <main className="max-w-4xl mx-auto px-6 pb-20 mt-12 relative z-10">

        {/* SECTION 1: Introduction */}
        <Section title="The Volatility Surface Paradigm" icon={BookOpen} gradient="from-blue-500 to-indigo-600">
          <p>
            The genesis of modern quantitative options pricing is indelibly linked to the framework introduced by Fischer Black, Myron Scholes, and Robert Merton in 1973. The foundational assumption of the BSM model is that the underlying asset&apos;s price follows a geometric Brownian motion, defined by a constant drift and, crucially, a <strong className="text-slate-800">constant volatility parameter</strong> across all strike prices and expirations.
          </p>
          <p>
            While this elegant closed-form solution catalyzed the explosive growth of the global derivatives market, the empirical realities of financial markets—most vividly demonstrated during the global equity market crash of October 1987—proved that the assumption of constant, log-normally distributed volatility is structurally flawed.
          </p>
          <Callout type="insight" title="The Market Reality">
            Market participants do not view volatility as a static parameter; rather, they demand a significant premium for out-of-the-money (OTM) options to protect against severe tail-risk events and rapid market drawdowns.
          </Callout>
          <p>
            This dynamic risk pricing manifests as the <strong className="text-slate-800">implied volatility surface (IVS)</strong>, an empirical landscape where implied volatility is a pronounced function of both the option&apos;s <em>moneyness</em> (the strike price relative to the current forward price) and its <em>time to maturity</em>. The cross-sectional plot of implied volatility against strike price typically reveals a &quot;smile&quot; in foreign exchange markets or a pronounced &quot;skew&quot; (or smirk) in equity markets.
          </p>
          <p>
            The evolution of volatility modeling represents a trajectory of increasing mathematical sophistication:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Deterministic parametric fits like the <strong className="text-slate-800">SVI model</strong>.</li>
            <li>Continuous-time frameworks including the <strong className="text-slate-800">Dupire local volatility model</strong>.</li>
            <li>Stochastic frameworks like the <strong className="text-slate-800">Heston model</strong>.</li>
            <li>Hybrid <strong className="text-slate-800">Local-Stochastic Volatility (LSV)</strong> architectures.</li>
            <li>Modern frontiers leveraging <strong className="text-slate-800">Rough Volatility</strong> and deep neural networks.</li>
          </ul>
        </Section>

        {/* SECTION 2: Calibration */}
        <Section title="Mathematical Foundations of Calibration" icon={Calculator} gradient="from-emerald-500 to-teal-500">
          <p>
            Model calibration is the mathematical inverse problem of finding a set of model parameters that minimizes the discrepancy between theoretical option prices generated by a pricing model and empirical prices observed in the highly liquid vanilla options market.
          </p>
          <p>
            The calibration procedure is framed as a high-dimensional, non-linear optimization task. The generic calibration objective function is mathematically expressed as:
          </p>
          <MathBlock>
            <span>Θ* = argmin<sub>Θ</sub> Σ<sub>i=1</sub><sup>N</sup> Σ<sub>j=1</sub><sup>M</sup> w<sub>i,j</sub> (σ<sub>mod</sub>(Θ; K<sub>i</sub>, T<sub>j</sub>) - σ<sub>mkt</sub>(K<sub>i</sub>, T<sub>j</sub>))<sup>2</sup> + λℛ(Θ)</span>
          </MathBlock>
          <p>
            Here, <InlineMath>K<sub>i</sub></InlineMath> represents discrete strike prices, <InlineMath>T<sub>j</sub></InlineMath> expirations, <InlineMath>σ<sub>mkt</sub></InlineMath> the market-quoted implied volatility, and <InlineMath>σ<sub>mod</sub></InlineMath> the model-generated volatility. The weighting matrix <InlineMath>w<sub>i,j</sub></InlineMath> is critical for robust calibration, often assigning heavier weights to liquid ATM options. The regularization term <InlineMath>λℛ(Θ)</InlineMath> prevents overfitting to market micro-structural noise.
          </p>
          <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Algorithmic Optimization Strategies</h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mt-6">
            <table className="w-full text-left text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-800 w-1/5">Category</th>
                  <th className="p-4 font-bold text-slate-800 w-1/4">Algorithms</th>
                  <th className="p-4 font-bold text-slate-800">Advantages</th>
                  <th className="p-4 font-bold text-slate-800">Limitations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-indigo-600">Local Optimizers</td>
                  <td className="p-4 text-slate-600">Levenberg-Marquardt, L-BFGS, SLSQP</td>
                  <td className="p-4 text-slate-600">Highly efficient; converges in ms; ideal for smooth spaces.</td>
                  <td className="p-4 text-slate-600">Sensitive to initial guess; prone to local minima entrapment.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors bg-slate-50/50">
                  <td className="p-4 font-semibold text-purple-600">Global Optimizers</td>
                  <td className="p-4 text-slate-600">Simulated Annealing, Genetic Algorithms</td>
                  <td className="p-4 text-slate-600">Avoids local minima; requires no precise initial guess.</td>
                  <td className="p-4 text-slate-600">Computationally heavy; lethargic convergence.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-teal-600">Hybrid Approaches</td>
                  <td className="p-4 text-slate-600">Grid Search + Levenberg-Marquardt</td>
                  <td className="p-4 text-slate-600">High confidence global minimum; reduced time.</td>
                  <td className="p-4 text-slate-600">Grid density heavily impacts final performance.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* SECTION 3: SVI */}
        <Section title="Stochastic Volatility Inspired (SVI)" icon={LineChart} gradient="from-orange-400 to-red-500">
          <p>
            Before deploying computationally heavy SDEs, traders require a robust, arbitrage-free parametric representation of the implied volatility surface. Conceived by Jim Gatheral, the SVI model provides a highly tractable, smile-consistent framework. It is formulated in terms of total implied variance, <InlineMath>w(k, t) = σ<sub>BS</sub><sup>2</sup>(k, t)t</InlineMath>, where <InlineMath>k = ln(K/F<sub>t</sub>)</InlineMath> is the log-moneyness.
          </p>
          <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Raw SVI Formulation</h3>
          <MathBlock>
            <span>w(k) = a + b(ρ(k - m) + √((k - m)<sup>2</sup> + σ<sup>2</sup>))</span>
          </MathBlock>
          <p>
            The five Raw parameters <InlineMath>χ = &#123;a, b, ρ, m, σ&#125;</InlineMath> dictate vertical shifts, slopes, skews, translations, and ATM curvature respectively. To make these parameters intuitive for trading desks, the industry adopted the <strong>SVI-Jump-Wings (SVI-JW)</strong> formulation.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm my-8">
            <table className="w-full text-left text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-800 w-1/6">SVI-JW</th>
                  <th className="p-4 font-bold text-slate-800 w-2/5">Mathematical Definition</th>
                  <th className="p-4 font-bold text-slate-800">Financial Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-orange-600">v<sub>t</sub></td>
                  <td className="p-4 font-mono text-slate-600">v<sub>t</sub> = (a + b(-ρm + √(m<sup>2</sup> + σ<sup>2</sup>)))/t</td>
                  <td className="p-4 text-slate-600">At-The-Money (ATM) implied variance.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-orange-600">ψ<sub>t</sub></td>
                  <td className="p-4 font-mono text-slate-600">ψ<sub>t</sub> = (1/√w<sub>t</sub>)(b/2)(-m/√(m<sup>2</sup> + σ<sup>2</sup>) + ρ)</td>
                  <td className="p-4 text-slate-600">ATM forward skew (first derivative of volatility).</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-orange-600">p<sub>t</sub></td>
                  <td className="p-4 font-mono text-slate-600">p<sub>t</sub> = (1/√w<sub>t</sub>)b(1 - ρ)</td>
                  <td className="p-4 text-slate-600">Asymptotic slope of the out-of-the-money put wing.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-orange-600">c<sub>t</sub></td>
                  <td className="p-4 font-mono text-slate-600">c<sub>t</sub> = (1/√w<sub>t</sub>)b(1 + ρ)</td>
                  <td className="p-4 text-slate-600">Asymptotic slope of the out-of-the-money call wing.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Callout type="warning" title="Arbitrage-Free Constraints">
            <p className="mb-4">
              Avoiding calendar spread arbitrage requires total variance to monotonically increase with time: <InlineMath>∂<sub>t</sub>w(k, t) ≥ 0</InlineMath>. Butterfly arbitrage is avoided if the implied probability density is strictly non-negative. This is assessed by evaluating:
            </p>
            <div className="bg-amber-100/50 p-4 rounded-lg font-mono text-center mb-2 overflow-x-auto shadow-inner text-amber-900 border border-amber-200">
              g(k) = (1 - kw&apos;(k)/(2w(k)))<sup>2</sup> - (w&apos;(k))<sup>2</sup>/4(1/w(k) + 1/4) + w&apos;&apos;(k)/2
            </div>
            <p>
              For model validity, <InlineMath>g(k) ≥ 0</InlineMath> for all <InlineMath>k ∈ ℝ</InlineMath>.
            </p>
          </Callout>
        </Section>

        {/* SECTION 4: Dupire Local Volatility */}
        <Section title="Dupire Local Volatility Model" icon={TrendingUp} gradient="from-pink-500 to-rose-500">
          <p>
            Introduced independently by Bruno Dupire, Emanuel Derman, and Iraj Kani in 1994, the local volatility (LV) model altered quantitative finance by treating volatility not as constant or stochastic, but as a <strong className="text-slate-800">deterministic mathematical function</strong> of both current asset level <InlineMath>S<sub>t</sub></InlineMath> and time <InlineMath>t</InlineMath>.
          </p>
          <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">The Fokker-Planck Equation</h3>
          <p>
            By assuming the asset follows <InlineMath>dS<sub>t</sub> = (r<sub>t</sub> - q<sub>t</sub>)S<sub>t</sub>dt + σ<sub>loc</sub>(S<sub>t</sub>, t)S<sub>t</sub>dW<sub>t</sub></InlineMath>, Dupire derived a formula linking market call prices <InlineMath>C(K, T)</InlineMath> directly to a unique local volatility surface:
          </p>
          <MathBlock>
            <span>σ<sub>loc</sub><sup>2</sup>(K, T) = (∂C/∂T + (r<sub>T</sub> - q<sub>T</sub>)K∂C/∂K + q<sub>T</sub>C) / ((1/2)K<sup>2</sup>∂<sup>2</sup>C/∂K<sup>2</sup>)</span>
          </MathBlock>
          <Callout type="info" title="Statics vs. Dynamics">
            <strong>The Statics:</strong> Because the LV function is stripped directly from the arbitrage-free surface, it perfectly matches the prices of all liquid vanilla options. It beautifully resolves the ambiguity of which volatility to plug into an exotic pricing engine.<br/><br/>
            <strong>The Dynamics:</strong> However, the LV model is dangerously flawed in dynamics. It assumes future volatility is purely deterministic, forcing smiles to systematically flatten out over time. This contradicts empirical &quot;sticky strike&quot; reality, rendering pure LV perilous for pricing second-generation exotics like cliquets.
          </Callout>
        </Section>

        {/* SECTION 5: Heston Stochastic Volatility */}
        <Section title="Heston Stochastic Volatility" icon={Activity} gradient="from-indigo-500 to-blue-600">
          <p>
            To rectify the unrealistic forward dynamics of local volatility, quantitative finance turned to stochastic volatility (SV) models. The Heston model (1993) allows variance itself to fluctuate unpredictably, driven by its own source of uncertainty.
          </p>
          <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Mathematical Formulation (SDEs)</h3>
          <MathBlock>
            <div className="space-y-2">
              <div>dS<sub>t</sub> = μS<sub>t</sub>dt + √v<sub>t</sub>S<sub>t</sub>dW<sub>1,t</sub></div>
              <div>dv<sub>t</sub> = κ(θ - v<sub>t</sub>)dt + σ√v<sub>t</sub>dW<sub>2,t</sub></div>
            </div>
          </MathBlock>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-indigo-700 block mb-1">θ (Long-Run Average)</strong>
              Theoretical equilibrium variance market gravitates toward.
            </li>
            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-indigo-700 block mb-1">κ (Mean-Reversion)</strong>
              Speed at which volatility spikes decay back to historical average.
            </li>
            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-indigo-700 block mb-1">σ (Vol-of-Vol)</strong>
              Controls variance amplitude; higher value deepens smile convexity.
            </li>
            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-indigo-700 block mb-1">ρ (Correlation)</strong>
              Generates asymmetric downward skew (&quot;leverage effect&quot;).
            </li>
          </ul>
          <Callout type="warning" title="The Feller Condition & Limitations">
            To guarantee variance remains strictly positive, the model must satisfy the Feller condition: <InlineMath>2κθ ≥ σ<sup>2</sup></InlineMath>. When violated (common in real markets), variance can touch zero, requiring numerical truncation. <br/><br/>
            Additionally, Heston fails to capture the explosive skew observed at very short maturities, as its ATM skew behaves asymptotically as <InlineMath>O(T)</InlineMath> as <InlineMath>T &rarr; 0</InlineMath>.
          </Callout>
        </Section>

        {/* SECTION 6: Hybrid LSV */}
        <Section title="Hybrid Local-Stochastic Volatility (LSV)" icon={Layers} gradient="from-purple-500 to-pink-600">
          <p>
            Recognizing that LV perfectly fits static markets while SV provides realistic future dynamics, the industry engineered Hybrid Local-Stochastic Volatility (LSV) models. An LSV model modulates a stochastic variance process with a deterministic local volatility multiplier.
          </p>
          <MathBlock>
            <div className="space-y-2">
              <div>dS<sub>t</sub> = μS<sub>t</sub>dt + L(S<sub>t</sub>, t)√v<sub>t</sub>S<sub>t</sub>dW<sub>1,t</sub></div>
              <div>dv<sub>t</sub> = κ(θ - v<sub>t</sub>)dt + σ√v<sub>t</sub>dW<sub>2,t</sub></div>
            </div>
          </MathBlock>
          <p>
            The absolute mathematical lynchpin is the leverage function <InlineMath>L(S<sub>t</sub>, t)</InlineMath>. By invoking <strong>Gyöngy&apos;s mimicking theorem</strong>, the model guarantees a perfect reproduction of the vanilla market surface if it satisfies the fixed-point condition:
          </p>
          <MathBlock>
            <span>L<sup>2</sup>(K, T) = σ<sub>Dup</sub><sup>2</sup>(K, T) / 𝔼[v<sub>T</sub> | S<sub>T</sub> = K]</span>
          </MathBlock>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mt-8">
            <table className="w-full text-left text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-800">Feature</th>
                  <th className="p-4 font-bold text-pink-600">Dupire LV</th>
                  <th className="p-4 font-bold text-blue-600">Heston SV</th>
                  <th className="p-4 font-bold text-purple-600">Hybrid LSV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Vanilla Fit</td>
                  <td className="p-4 text-slate-600">Perfect</td>
                  <td className="p-4 text-slate-600">Approximate</td>
                  <td className="p-4 text-slate-600 font-bold">Perfect</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Smile Dynamics</td>
                  <td className="p-4 text-slate-600">Deterministic (flattens)</td>
                  <td className="p-4 text-slate-600">Realistic</td>
                  <td className="p-4 text-slate-600 font-bold">Highly realistic</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Primary Use Case</td>
                  <td className="p-4 text-slate-600">1st-gen exotics</td>
                  <td className="p-4 text-slate-600">Vanilla & Greeks</td>
                  <td className="p-4 text-slate-600 font-bold">Complex path-dependent exotics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* SECTION 7 & 8: Frontiers & Deep Learning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Section title="Rough Volatility" icon={Zap} gradient="from-yellow-400 to-orange-500">
            <p>
              Empirical high-frequency data conclusively demonstrates that volatility sample paths are highly jagged and anti-persistent, driven by <strong>fractional Brownian motion (fBm)</strong>.
            </p>
            <p>
              Governed by the Hurst parameter <InlineMath>H ≈ 0.1</InlineMath>, models like Rough Bergomi achieve theoretical supremacy by allowing the ATM skew to scale as a power law <InlineMath>T<sup>H-1/2</sup></InlineMath>.
            </p>
            <Callout type="warning">
              <strong>The Bottleneck:</strong> fBm is non-Markovian. The future strictly depends on the entire continuous history, precluding standard PDE solvers and creating hours-long calculation bottlenecks.
            </Callout>
          </Section>

          <Section title="Deep Learning Models" icon={BrainCircuit} gradient="from-cyan-400 to-blue-500">
            <p>
              To resolve non-Markovian bottlenecks, the industry leverages Deep Neural Networks (DNNs) as <strong>Surrogate Pricing Networks</strong>.
            </p>
            <p>
              Trained offline on millions of simulations, networks replace agonizing Monte Carlo engines, collapsing evaluation time to ~40 milliseconds.
            </p>
            <Callout type="insight">
              <strong>Deep Differential Networks (DDN)</strong> utilize automatic differentiation (<InlineMath>φ<sub>NN</sub></InlineMath>) to extract exact analytical gradients, allowing real-time, instantaneous calibration of rough volatility models.
            </Callout>
          </Section>
        </div>

        {/* SECTION 9: Strategic Utility */}
        <Section title="Strategic Utility & Risk Management" icon={ShieldCheck} gradient="from-red-500 to-orange-600">
          <p>
            The selection of models profoundly dictates P&L dynamics and high-dimensional risk control. In standard delta-hedging, simple BSM constantly bleeds P&L by ignoring &quot;shadow greeks&quot; like Vanna and Volga. Stochastic models ensure mathematically robust hedging across regimes.
          </p>
          <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">The Vanna-Volga Method</h3>
          <p>
            While LSV models dominate structured products, FX traders frequently use the heuristic Vanna-Volga (VV) approach for 1st-generation exotics. Instead of heavy SDEs, traders explicitly replicate the smile hedging cost:
          </p>
          <MathBlock>
            <span>X<sub>VV</sub> = X<sub>BS</sub> + w<sub>ATM</sub>Δ<sub>ATM</sub> + w<sub>RR</sub>Δ<sub>RR</sub> + w<sub>BF</sub>Δ<sub>BF</sub></span>
          </MathBlock>
          <p>
            This adjusts the base BSM price by adding the required weights (<InlineMath>w</InlineMath>) of At-The-Money (Vega), Risk Reversal (Vanna/Skew), and Butterfly (Volga/Convexity) instruments.
          </p>
          <p className="mt-4">
            To manage aggregate portfolio risk under <strong>Model Risk</strong>, traders employ relative indifference pricing, scaling bid-ask spreads dynamically based on personal risk aversion and existing book inventory, optimizing P&L even under chaotic volatility conditions.
          </p>
        </Section>

      </main>
    </ArticleFrame>
  );
}
