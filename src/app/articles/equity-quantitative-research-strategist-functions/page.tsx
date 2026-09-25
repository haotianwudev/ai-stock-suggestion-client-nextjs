'use client';

import React, { useState, ReactNode } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';

// Tooltip component utilizing useState as requested
const TermTooltip = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      aria-label={`Definition of ${term}`}
    >
      <span className="border-b border-dashed border-current text-gray-900 dark:text-gray-100 hover:text-[#A8672E] dark:hover:text-[#D08F52] focus:text-[#A8672E] dark:focus:text-[#D08F52] transition-colors">
        {term}
      </span>
      {isVisible && (
        <span className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm shadow-xl font-sans rounded pointer-events-none text-left leading-tight">
          {definition}
        </span>
      )}
    </span>
  );
};

// Layout Components
const Card = ({ children, title }: { children: ReactNode; title?: string }) => (
  <div className="p-5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg flex flex-col h-full">
    {title && <h3 className="font-serif text-lg font-semibold mb-3 text-[#A8672E] dark:text-[#D08F52]">{title}</h3>}
    <div className="flex-grow space-y-2">{children}</div>
  </div>
);

const FormulaPanel = ({ formula, description }: { formula: string; description?: string }) => (
  <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-5 rounded-lg mb-6 overflow-x-auto shadow-inner">
    <MathBlock math={formula} className="text-white text-base md:text-lg" />
    {description && (
      <div className="mt-3 text-sm text-gray-400 font-sans border-t border-gray-700 pt-3">
        {description}
      </div>
    )}
  </div>
);

export default function EquityQuantResearchPage() {
  return (
    <ArticleFrame
      slug="equity-quantitative-research-strategist-functions"
      additionalDisclaimer="Equity quantitative derivatives, exotic structuring, and algorithmic strategies involve complex mathematical models and substantial financial risks. Derivative models and theoretical formulations are presented for educational and analytical purposes only."
    >
      <div className="max-w-5xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-200 font-sans">
        
        {/* Standout Figures Stat Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg text-center bg-white dark:bg-black">
            <div className="font-mono text-3xl text-[#BC4128] dark:text-[#E2694A] mb-1 tabular-nums">40-50%</div>
            <div className="text-sm font-medium uppercase tracking-wide">Index Crash Knock-In Barrier</div>
            <div className="text-xs text-gray-500 mt-1">Triggers catastrophic downside loss in ELS</div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg text-center bg-white dark:bg-black">
            <div className="font-mono text-3xl text-[#A8672E] dark:text-[#D08F52] mb-1 tabular-nums">H &approx; 0.1</div>
            <div className="text-sm font-medium uppercase tracking-wide">Hurst Exponent</div>
            <div className="text-xs text-gray-500 mt-1">Rough volatility anti-persistent mean reversion</div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg text-center bg-white dark:bg-black">
            <div className="font-mono text-3xl text-[#1D8A70] dark:text-[#3CBF9C] mb-1 tabular-nums">&gt;40%</div>
            <div className="text-sm font-medium uppercase tracking-wide">Error Reduction</div>
            <div className="text-xs text-gray-500 mt-1">In out-of-sample directional JVP via DeepONets</div>
          </div>
        </div>

        {/* Section 1: Institutional Architecture */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-medium tracking-tight mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Institutional Architecture &amp; Paradigms
          </h2>
          
          <h3 className="font-serif text-xl font-medium mt-6 mb-4">Fundamental vs. Quantitative Equity Research</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Traditional Fundamental Research">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Qualitative and deterministic financial analysis of public companies.</li>
                <li>Methodologies: Three-statement modeling, DCF, qualitative industry assessment.</li>
                <li>Deliverables: Initiation of coverage, earnings updates, 12-month price targets.</li>
                <li>Data: SEC filings, earnings calls, management interviews.</li>
              </ul>
            </Card>
            <Card title="Quantitative Equity Research">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Treats markets as complex systems governed by statistical probabilities and stochastic processes.</li>
                <li>Methodologies: Stochastic calculus, econometrics, machine learning, signal processing.</li>
                <li>Deliverables: Algorithmic trading strategies, derivative pricing libraries, risk models.</li>
                <li>Data: High-frequency tick data, alternative data (satellite imagery), implied volatility surfaces.</li>
              </ul>
            </Card>
          </div>

          <h3 className="font-serif text-xl font-medium mt-8 mb-4">The Sell-Side vs. Buy-Side Dichotomy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Sell-Side Infrastructure (Banks &amp; Market Makers)">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Mandate: Provide liquidity, structure bespoke products, execute algorithmic trades.</li>
                <li>Goal: Capture bid-ask spread and fees while meticulously neutralizing risk exposures.</li>
                <li>Focuses heavily on exact derivative pricing and calculating hedging ratios (<TermTooltip term="Greeks" definition="Mathematical derivatives measuring sensitivity to various market parameters (e.g., Delta, Gamma, Vega)." />).</li>
                <li>Aggregates order flows in <TermTooltip term="Central Risk Books (CRBs)" definition="Internal systems that aggregate order flows across asset classes to internalize trades and extract systematic alpha." />.</li>
              </ul>
            </Card>
            <Card title="Buy-Side Alpha Engine (Hedge Funds &amp; Asset Managers)">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Mandate: Deploy capital to generate absolute or relative returns (alpha).</li>
                <li>Goal: Deliberately assume calculated directional risks based on statistical models.</li>
                <li>Focuses on predictive econometrics, statistical arbitrage, and execution algorithms.</li>
                <li>Relentless experimentation requiring rapid deployment of novel signals.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Section 2: Theoretical Divides */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-medium tracking-tight mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Theoretical Divides &amp; Taxonomy of Roles
          </h2>

          <h3 className="font-serif text-xl font-medium mt-6 mb-4">P Quant vs. Q Quant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="P-Measure (Physical / Real-World)">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Domain: Buy-side alpha generation, statistical arbitrage, market risk.</li>
                <li>Goal: Forecasting future asset price distributions and real-world expected returns (drift, &mu;).</li>
                <li>Assumption: Assets earn a risk premium commensurate with market beta.</li>
                <li>Techniques: Machine learning, time-series econometrics, Bayesian filtering.</li>
              </ul>
            </Card>
            <Card title="Q-Measure (Risk-Neutral)">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Domain: Sell-side derivative pricing, structuring, and dynamic hedging.</li>
                <li>Goal: Exact calibration to current market prices; modeling volatility (&sigma;) and correlation.</li>
                <li>Assumption: All assets grow at the risk-free rate; risk preferences are mathematically neutralized.</li>
                <li>Techniques: Stochastic calculus, PIDEs, martingale pricing, Girsanov transformations.</li>
              </ul>
            </Card>
          </div>

          <h3 className="font-serif text-xl font-medium mt-8 mb-4">Desk Strats vs. Quantitative Researchers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Quantitative Strategists (Desk Strats)">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Location: Front-office, physically embedded on the trading floor.</li>
                <li>Pacing: Intra-day to days; requires rapid-response to live-market problems.</li>
                <li>Duties: Live pricing, building risk dashboards, algorithmic execution.</li>
                <li>Systems: C++, Java, Python, kdb+/q; integrated into systems like SecDB.</li>
              </ul>
            </Card>
            <Card title="Quantitative Researchers (Core Quants)">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Location: Middle-office or core analytics groups; insulated from trading noise.</li>
                <li>Pacing: Weeks to months; focused on long-term strategic infrastructure.</li>
                <li>Duties: Foundational model derivation, advanced numerical methods, model validation.</li>
                <li>Ensures models avoid <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">arbitrage</span> and pass strict regulatory stress tests.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Featured Infographic Inline */}
        <InfographicSlot
          alt="Equity Quantitative Research and Strategist Functions"
          label="Featured Infographic"
        />

        {/* Section 3: Volatility Surface */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-medium tracking-tight mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            The Volatility Surface and Arbitrage
          </h2>
          <p className="mb-4">
            Equity markets exhibit a pronounced <TermTooltip term="volatility smile" definition="The phenomenon where options on the same underlying asset with different strikes and maturities trade at significantly different implied volatilities." />. Modeling this continuous surface from discrete market data is essential.
          </p>

          <h3 className="font-serif text-xl font-medium mt-6 mb-3">SVI Parameterization (Gatheral)</h3>
          <FormulaPanel 
            formula="w(k; \chi_R) = a + b \left( \rho(k - m) + \sqrt{(k - m)^2 + \sigma^2} \right)"
            description="Models total implied variance w(k, t) as a function of log-moneyness (k). Parameters control shift (a), wing slope (b), skew (ρ), translation (m), and vertex smoothness (σ)."
          />

          <h3 className="font-serif text-xl font-medium mt-6 mb-3">Guaranteeing the Absence of Arbitrage</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Calendar Spread Arbitrage:</strong> Total implied variance must be strictly non-decreasing over time: 
              <span className="font-mono text-sm ml-2 bg-gray-100 dark:bg-gray-800 px-1 rounded">&part;_t w(k, t) &ge; 0</span>.
            </li>
            <li>
              <strong>Butterfly Arbitrage:</strong> The implied risk-neutral probability density must be strictly non-negative.
            </li>
          </ul>
          <FormulaPanel 
            formula="g(k) = \left(1 - \frac{k w'(k)}{2w(k)}\right)^2 - \frac{w'(k)^2}{4} \left(\frac{1}{w(k)} + \frac{1}{4}\right) + \frac{w''(k)}{2} \ge 0"
            description="A maturity slice is entirely free of butterfly arbitrage if this derived function evaluates to greater than or equal to zero across the strike continuum."
          />
          <p className="mb-4">
            To ensure mathematical rigor, researchers developed SSVI (Surface SVI), imposing strict parametric bounds to guarantee <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-medium">absolute absence of static arbitrage</span>.
          </p>
        </section>

        {/* Section 4: Advanced Equity Derivative Models */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-medium tracking-tight mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Advanced Equity Derivative Models
          </h2>

          <h3 className="font-serif text-xl font-medium mt-6 mb-3">Local vs. Stochastic Volatility</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Local Volatility (LV):</strong> Volatility is a deterministic function &sigma;(S_t, t). It perfectly recovers vanilla option prices but fails dynamically (contradicting empirical <TermTooltip term="sticky-strike" definition="The empirical market behavior where the volatility smile retains its convex shape and shifts in tandem with the stock price." /> behavior).</li>
            <li><strong>Stochastic Volatility (SV) - Heston Model:</strong> Volatility is governed by an independent random process.</li>
          </ul>
          <FormulaPanel 
            formula="\begin{aligned} dS_t &= \mu S_t dt + \sqrt{v_t} S_t dW_{1,t} \\ dv_t &= \kappa (\theta - v_t) dt + \sigma_v \sqrt{v_t} dW_{2,t} \end{aligned}"
            description="Heston Model SDEs. Parameters control mean reversion (κ), equilibrium variance (θ), vol-of-vol (σ_v), and correlation (ρ) via the two Wiener processes."
          />

          <h3 className="font-serif text-xl font-medium mt-6 mb-3">Stochastic Local Volatility (SLV)</h3>
          <p className="mb-2">Fuses the exact static calibration of LV with the realistic forward dynamics of SV by introducing a state-dependent leverage function L(S_t, t).</p>
          <FormulaPanel 
            formula="dS_t = \mu S_t dt + L(S_t, t) \sqrt{v_t} S_t dW_{1,t}"
            description="Calibration requires solving high-dimensional forward Fokker-Planck PIDEs or using advanced Monte Carlo particle filtering. The undisputed standard for strongly path-dependent exotics."
          />
        </section>

        {/* Section 5: Systemic Risk, Exotics, and Market Frictions */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-medium tracking-tight mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            Systemic Risk, Exotics, and Market Frictions
          </h2>

          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-4 mb-6">
            <h4 className="font-serif font-semibold text-[#BC4128] dark:text-[#E2694A] mb-2">Autocallables &amp; ELS Knock-In Risk</h4>
            <p className="text-sm">
              Exotic products like Korean ELS feature a catastrophic knock-in put barrier. If the underlying index crashes by <span className="font-mono tabular-nums font-bold">40% to 50%</span>, the bank becomes massively long <TermTooltip term="Vega" definition="Sensitivity of the derivative's value to changes in implied volatility." /> and long <TermTooltip term="Vanna" definition="Sensitivity of Vega to spot price movements." />. Forced aggressive delta-hedging by the bank systematically exacerbates market sell-offs.
            </p>
          </div>

          <h3 className="font-serif text-xl font-medium mt-6 mb-3">The XVA Framework (Valuation Adjustments)</h3>
          <p className="mb-4">Post-2008, &ldquo;risk-free&rdquo; pricing was abandoned for models accounting for real-world frictions and counterparty risks.</p>
          <FormulaPanel 
            formula="V_{\text{adjusted}} = V_{\text{clean}} - \text{CVA} + \text{DVA} - \text{FVA} - \text{MVA} - \text{KVA}"
            description="Comprehensive valuation adjustment equation encompassing credit, debit, funding, initial margin, and regulatory capital costs."
          />
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 dark:border-gray-800 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-3 border border-gray-200 dark:border-gray-700 font-semibold font-serif">Adjustment</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-700 font-semibold font-serif">Definition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-[#A8672E] dark:text-[#D08F52]">CVA (Credit)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Market price of counterparty default risk. Requires nested Monte Carlo simulating Expected Exposure.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-[#A8672E] dark:text-[#D08F52]">DVA (Debit)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Paradoxical mathematical benefit derived from the bank&apos;s <em>own</em> default risk.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-[#A8672E] dark:text-[#D08F52]">FVA (Funding)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Cost incurred when a dealer must fund variation margin at an unsecured rate due to pass-through failure.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-[#A8672E] dark:text-[#D08F52]">MVA (Margin)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Cost of funding regulatory Initial Margin (IM) in segregated clearing accounts.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono text-[#A8672E] dark:text-[#D08F52]">KVA (Capital)</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">Cost of capital required by Basel III/IV regulatory reserves trapped over the trade&apos;s life.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Machine Learning */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-medium tracking-tight mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
            The Machine Learning Paradigm
          </h2>
          
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <strong><TermTooltip term="Automatic Adjoint Differentiation (AAD)" definition="A computational technique generating exact derivatives of pricing functions via reverse-mode algorithmic differentiation." />:</strong> 
              Computes exact risk sensitivities (Greeks) for all inputs simultaneously in a single computational sweep (2-5x the cost of one valuation, regardless of dimension).
            </li>
            <li>
              <strong><TermTooltip term="Differential Machine Learning (DML)" definition="Training neural networks using both target values and their differential sensitivities (Sobolev space objectives) to map complex pricing functions rapidly." />:</strong> 
              Utilizes twin networks trained on Sobolev space objectives (penalizing errors in both price and AAD-generated derivatives), drastically reducing required training data and avoiding overfitting.
            </li>
            <li>
              <strong>Derivative-Informed Operator Learning (DeepONets):</strong> 
              Learns infinite-dimensional function mappings (e.g., mapping a full volatility curve to a dense price surface). 
              Reduces out-of-sample directional Jacobian-vector product errors by <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono tabular-nums font-bold">&gt;40%</span>, 
              vital for ensuring dynamic delta-hedging algorithms do not fail in live trading environments.
            </li>
          </ul>
        </section>

        {/* Section 7: Key Takeaways */}
        <section className="mt-16 bg-gray-100 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="font-serif text-xl font-semibold mb-4 text-[#A8672E] dark:text-[#D08F52]">Key Structural Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 font-medium">
            <li>The division of labor is strictly bifurcated between rapid-deployment, front-office <strong>Desk Strats</strong> and insulated, mathematically rigorous <strong>Core Researchers</strong>.</li>
            <li>Theoretical frameworks heavily depend on the institution: Buy-side targets the <strong>P-measure (forecasting/alpha)</strong>, while Sell-side relies on the <strong>Q-measure (risk-neutral calibration/hedging)</strong>.</li>
            <li>Modern pricing infrastructure fundamentally requires absolute <strong>absence of static arbitrage</strong> (calendar and butterfly), guaranteed via bounded parameterizations like SSVI.</li>
            <li>The rise of computationally immense <strong>SLV models</strong> and <strong>XVA requirements</strong> has mandated the transition toward advanced <strong>AAD</strong> and <strong>Derivative-Informed Deep Learning</strong> to calculate risk in real-time.</li>
          </ul>
        </section>

      </div>
    </ArticleFrame>
  );
}
