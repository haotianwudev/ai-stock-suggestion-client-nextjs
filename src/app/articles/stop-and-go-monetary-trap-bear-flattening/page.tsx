'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

/* Jargon Tooltip Component */
const Jargon = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block border-b border-dashed border-[#A8672E] dark:border-[#D08F52] cursor-help font-medium text-[#A8672E] dark:text-[#D08F52]"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      aria-label={definition}
    >
      {term}
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 dark:bg-slate-100 text-slate-100 dark:text-slate-900 text-sm font-sans rounded shadow-lg z-50 pointer-events-none text-left leading-tight">
          {definition}
        </span>
      )}
    </span>
  );
};

export default function FedDynamicsReport() {
  return (
    <ArticleFrame
      slug="stop-and-go-monetary-trap-bear-flattening"
      additionalDisclaimer="Fixed income term structure models, yield curve forecasts, and duration sensitivity metrics are theoretical approximations and carry market and liquidity risk. Not investment advice."
    >
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 text-slate-900 dark:text-slate-200">
        
        {/* Standout Figures - Compact Stat Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">FOMC Hike</div>
            <div className="font-mono text-2xl text-[#BC4128] dark:text-[#E2694A]">+25 bps</div>
            <div className="text-xs text-slate-500 mt-1">Sept 16, 2026 Surprise</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Fed Funds Target</div>
            <div className="font-mono text-2xl text-slate-800 dark:text-slate-200">3.75%–4.00%</div>
            <div className="text-xs text-slate-500 mt-1">Hawkish Terminal Rate</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Headline CPI</div>
            <div className="font-mono text-2xl text-[#BC4128] dark:text-[#E2694A]">3.4% YoY</div>
            <div className="text-xs text-slate-500 mt-1">Sticky Supply-Driven</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">10Y TIPS Breakeven</div>
            <div className="font-mono text-2xl text-[#BC4128] dark:text-[#E2694A]">&gt; 2.38%</div>
            <div className="text-xs text-slate-500 mt-1">De-anchoring Trigger</div>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-[#A8672E] dark:text-[#D08F52]">
            The September 2026 Macroeconomic Rupture
          </h2>
          <ul className="list-disc pl-5 space-y-3 mb-6">
            <li>
              On September 16, 2026, the FOMC delivered a profound shock by executing a surprise 25-basis-point interest rate hike.
            </li>
            <li>
              The catalyst: Persistently sticky 3.4% YoY headline CPI, driven by exogenous supply-side commodity shocks and rigid domestic services inflation.
            </li>
            <li>
              This event marks the materialization of a <Jargon term="stop-and-go monetary trap" definition="A regime characterized by a central bank prematurely pausing rate hikes to protect growth, only to be forced into abrupt re-tightening when inflation fails to converge to target." />.
            </li>
            <li>
              The updated &ldquo;dot plot&rdquo; revealed significantly more hawkish terminal rate expectations, forcing immediate global non-linear repricing.
            </li>
          </ul>
        </section>

        {/* Macroeconomic Foundations & Dichotomies */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-[#A8672E] dark:text-[#D08F52]">
            Macroeconomic Foundations &amp; The Taylor Principle
          </h2>
          <ul className="list-disc pl-5 space-y-3 mb-8">
            <li>
              The <Jargon term="Taylor Principle" definition="Mandates that the central bank must raise the nominal interest rate by more than one-for-one in response to an increase in inflation to ensure real rates actually tighten." /> is critical for stability in New Keynesian models.
            </li>
            <li>
              Failure to satisfy this principle allows self-fulfilling inflationary spirals to take hold as real rates fall while inflation accelerates.
            </li>
            <li>
              In earlier 2026, the Fed utilized a &ldquo;balanced-approach&rdquo; Taylor Rule to engineer a soft landing, tolerating elevated inflation. 
            </li>
            <li>
              Household surveys and the 10-year TIPS breakeven crossing 2.38% forced the Fed to prioritize aggressive re-anchoring of expectations over stabilizing the output gap.
            </li>
          </ul>

          {/* Comparison: Inflation Drivers */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-t-4 border-[#1D8A70] dark:border-[#3CBF9C]">
              <h3 className="font-serif text-xl mb-3">Demand-Driven Inflation</h3>
              <ul className="list-none space-y-2">
                <li className="flex items-start"><span className="mr-2 text-[#1D8A70] dark:text-[#3CBF9C]">›</span> Moves output and prices in the same direction.</li>
                <li className="flex items-start"><span className="mr-2 text-[#1D8A70] dark:text-[#3CBF9C]">›</span> Central bank should react aggressively under a targeted Taylor rule.</li>
              </ul>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-t-4 border-[#BC4128] dark:border-[#E2694A]">
              <h3 className="font-serif text-xl mb-3">Supply-Driven Inflation</h3>
              <ul className="list-none space-y-2">
                <li className="flex items-start"><span className="mr-2 text-[#BC4128] dark:text-[#E2694A]">›</span> Moves output and prices in opposite directions (e.g., commodity shocks).</li>
                <li className="flex items-start"><span className="mr-2 text-[#BC4128] dark:text-[#E2694A]">›</span> Tightening into this limits aggregate demand further, converting a mild slowdown into a severe recession.</li>
              </ul>
            </div>
          </div>

          {/* Comparison: Historical Context */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-serif text-xl mb-3 text-slate-800 dark:text-slate-200">The 1970s Precedent</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Monetary reaction function characterized by structural breaks.</li>
                <li>Fed continually fell behind the curve.</li>
                <li>Three stop-start episodes resulting in unmoored long-term expectations.</li>
              </ul>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-serif text-xl mb-3 text-slate-800 dark:text-slate-200">The 2026 Reality</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Structural financialization of the economy.</li>
                <li>Unprecedented expansion of US fiscal deficit.</li>
                <li>Systemic reliance of asset managers on volatility-targeted investment strategies.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Yield Curve Modeling & NSS */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-[#A8672E] dark:text-[#D08F52]">
            Yield Curve Modeling: Nelson-Siegel-Svensson Architecture
          </h2>
          <ul className="list-disc pl-5 space-y-3 mb-6">
            <li>
              The NSS framework is used to quantify the morphological shifts in the term structure of interest rates resulting from the Fed&apos;s shock.
            </li>
            <li>
              It features six parameters to fit highly complex, asymmetric hump and S-type shapes observed during monetary transitions.
            </li>
          </ul>

          {/* Formula Panel */}
          <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-5 rounded-lg font-mono overflow-x-auto mb-6 shadow-inner">
            <div className="text-slate-400 text-xs mb-2 uppercase tracking-widest">NSS Continuous Maturity Yield Equation</div>
            <MathBlock
              className="text-white"
              math="y(\tau) = \beta_0 + \beta_1\left[\frac{1 - e^{-\tau/\lambda_1}}{\tau/\lambda_1}\right] + \beta_2\left[\frac{1 - e^{-\tau/\lambda_1}}{\tau/\lambda_1} - e^{-\tau/\lambda_1}\right] + \beta_3\left[\frac{1 - e^{-\tau/\lambda_2}}{\tau/\lambda_2} - e^{-\tau/\lambda_2}\right]"
            />
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-100 dark:bg-slate-800/80 font-serif border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">NSS Parameter</th>
                  <th className="p-3">Economic Interpretation</th>
                  <th className="p-3">Market Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-bold"><InlineMath math="\beta_0" /> (Level)</td>
                  <td className="p-3">Long-term asymptotic rate</td>
                  <td className="p-3">Long-run inflation expectations &amp; equilibrium real rate</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-bold"><InlineMath math="\beta_1" /> (Slope)</td>
                  <td className="p-3">Short-term spread</td>
                  <td className="p-3">Immediate monetary policy rate &amp; near-term expectations</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-bold"><InlineMath math="\beta_2" /> (First Curvature)</td>
                  <td className="p-3">Medium-term hump/trough</td>
                  <td className="p-3">Business cycle pricing &amp; tightening duration</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-bold"><InlineMath math="\beta_3" /> (Second Curvature)</td>
                  <td className="p-3">Long-term structural convexity</td>
                  <td className="p-3">Protracted stagflationary pricing transitions</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-bold"><InlineMath math="\lambda_1, \lambda_2" /> (Decays)</td>
                  <td className="p-3">Curvature positioning</td>
                  <td className="p-3">Maturities at which humps reach mathematical maximums</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* AFNS & Yield Curve Regimes */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-[#A8672E] dark:text-[#D08F52]">
            AFNS &amp; Term Premium Repricing
          </h2>
          <ul className="list-disc pl-5 space-y-3 mb-6">
            <li>
              The Arbitrage-Free Dynamic Nelson-Siegel (AFNS) models the dynamic evolution of the curve by enforcing no-arbitrage constraints under the risk-neutral pricing measure.
            </li>
            <li>
              The long end of the curve (10-year) decompiles into: the average expected path of short-term real rates + the <Jargon term="Term Premium" definition="The excess compensation investors demand for bearing the duration risk of holding a long-term bond, encapsulating inflation uncertainty and liquidity risk." />.
            </li>
            <li>
              The September 2026 shock was dominated by a massive spike in the slope factor (<InlineMath math="S_t" />) and structural distortions in the curvature factor (<InlineMath math="C_t" />).
            </li>
          </ul>

          {/* Formula Panel for AFNS State Vector */}
          <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-5 rounded-lg font-mono overflow-x-auto mb-8 shadow-inner">
            <div className="text-slate-400 text-xs mb-2 uppercase tracking-widest">AFNS Stochastic Differential Equation &amp; Long-Term Yield</div>
            <div className="pb-4 border-b border-slate-700">
              <MathBlock className="text-white" math="dX_t = K^{\mathbb{Q}} (\theta^{\mathbb{Q}} - X_t)dt + \Sigma dW_t^{\mathbb{Q}}" />
            </div>
            <div className="pt-2">
              <MathBlock className="text-white" math="y_{10\text{Y}} = \frac{1}{120} \sum_{i=1}^{120} \mathbb{E}_t[r_{t+i}] + \text{TP}_{10\text{Y}}" />
            </div>
          </div>

          {/* Yield Curve Regimes Grid */}
          <h3 className="font-serif text-xl mb-4 text-slate-800 dark:text-slate-200">Taxonomy of Yield Curve Shifts</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded flex flex-col">
              <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">Bull Steepener</span>
              <span className="text-sm">Short rates fall rapidly; Long rates fall slowly.</span>
              <span className="text-xs text-slate-500 mt-2">Driver: Imminent rate cuts; severe recession pricing.</span>
            </div>
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded flex flex-col">
              <span className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-1">Bear Steepener</span>
              <span className="text-sm">Short rates rise slowly; Long rates rise rapidly.</span>
              <span className="text-xs text-slate-500 mt-2">Driver: Reflation, fiscal dominance, rising term premium.</span>
            </div>
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded flex flex-col">
              <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">Bull Flattener</span>
              <span className="text-sm">Short rates fall slowly; Long rates fall rapidly.</span>
              <span className="text-xs text-slate-500 mt-2">Driver: Long-term growth pessimism; flight to quality.</span>
            </div>
            <div className="p-4 border-2 border-[#BC4128] dark:border-[#E2694A] bg-[#BC4128]/5 dark:bg-[#E2694A]/10 rounded flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#BC4128] dark:bg-[#E2694A] text-white text-[10px] font-bold px-2 py-1 uppercase rounded-bl">2026 Shock Regime</div>
              <span className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-1">Bear Flattener</span>
              <span className="text-sm">Short rates rise rapidly; Long rates rise slowly.</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">Driver: Central bank re-tightening; inflation fighting. Inverts curve.</span>
            </div>
          </div>
        </section>

        {/* Inline Infographic Slot */}
        <div className="my-12">
          <InfographicSlot alt="The Stop-and-Go Monetary Trap and Yield Curve Bear Flattening Dynamics" />
        </div>

        {/* MBS & Convexity Trap */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-[#A8672E] dark:text-[#D08F52]">
            The Negative Convexity Trap of MBS
          </h2>
          <ul className="list-disc pl-5 space-y-3 mb-6">
            <li>
              Unlike standard US Treasuries with positive convexity, Agency Mortgage-Backed Securities (MBS) exhibit <Jargon term="Negative Convexity" definition="A concave price-yield relationship where the effective duration of the security increases exactly when yields are rising, due to prepayment dynamics." />.
            </li>
            <li>
              When rates rise, refinancing halts, Constant Prepayment Rates (CPR) plummet, and the weighted average life of the MBS extends.
            </li>
            <li>
              This triggers the &ldquo;MBS Duration Spiral&rdquo;, exacerbating yield curve shocks.
            </li>
          </ul>

          {/* Formula Panel for Price Sensitivity */}
          <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-5 rounded-lg font-mono overflow-x-auto mb-6 shadow-inner">
            <div className="text-slate-400 text-xs mb-2 uppercase tracking-widest">Taylor Series Price-Yield Approximation</div>
            <div className="pb-4 border-b border-slate-700">
              <MathBlock className="text-white" math="\frac{\Delta P}{P} \approx -D_{\text{mod}}(\Delta y) + \frac{1}{2}C(\Delta y)^2" />
            </div>
            <div className="text-xs text-slate-400 italic pt-2">
              * Illustrative example: If Yield rises (+<InlineMath math="\Delta y" />) and Convexity (<InlineMath math="C" />) is negative (like MBS), the second-order term exacerbates the price drop rather than cushioning it.
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-5 rounded-r-lg">
            <h3 className="font-serif text-lg font-bold mb-3 text-[#BC4128] dark:text-[#E2694A]">The Mechanical MBS Duration Spiral</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li><strong>Trigger:</strong> Fed executes a surprise hike; short end spikes.</li>
              <li><strong>Expectations Shift:</strong> 10-year yield rises via the expectations hypothesis.</li>
              <li><strong>Refinancing Cliff:</strong> Mortgage rates cross critical thresholds; MBS CPR slows rapidly.</li>
              <li><strong>Extension:</strong> Aggregate MBS duration extends mechanically due to negative convexity.</li>
              <li><strong>Forced Hedging:</strong> Portfolio managers aggressively short 10-year Treasuries and pay fixed swaps to offset unbudgeted duration extension.</li>
              <li><strong>The Spiral:</strong> Immense selling pressure drives 10-year yield higher; term premium spikes to clear market, causing further extension and hedging.</li>
            </ol>
          </div>
        </section>

        {/* VaR Shocks & Spillovers */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl mb-6 text-[#A8672E] dark:text-[#D08F52]">
            Systemic VaR Shocks &amp; Cross-Asset Spillovers
          </h2>
          <ul className="list-disc pl-5 space-y-3 mb-6">
            <li>
              <Jargon term="Risk Parity" definition="Capital allocation strategy where each asset class contributes equally to the total ex-ante volatility of the portfolio, often relying heavily on leverage for low-volatility sovereign bonds." /> frameworks dynamically manage exposure using <Jargon term="Value-at-Risk (VaR)" definition="A statistical measure estimating the maximum potential portfolio loss over a specific time horizon at a given confidence level." /> models.
            </li>
            <li>
              The macroeconomic shock shattered two critical variables: Realized historical bond volatility spiked vertically, and the equity-bond correlation flipped violently from negative to positive.
            </li>
          </ul>

          {/* Formula Panel for DCC-GARCH */}
          <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-5 rounded-lg font-mono overflow-x-auto mb-8 shadow-inner">
            <div className="text-slate-400 text-xs mb-2 uppercase tracking-widest">DCC-GARCH Conditional Covariance Evolution</div>
            <MathBlock className="text-white" math="Q_t = (1 - \alpha - \beta)\bar{Q} + \alpha(z_{t-1} z_{t-1}^T) + \beta Q_{t-1}" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-serif text-xl mb-3 text-slate-800 dark:text-slate-200">The Deleveraging Trigger</h3>
              <ul className="list-none space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="mr-3 text-lg leading-none text-[#BC4128] dark:text-[#E2694A]">✕</span>
                  <span>Calculated VaR instantly breached strict internal risk limits.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-lg leading-none text-[#BC4128] dark:text-[#E2694A]">✕</span>
                  <span>Funds mechanically de-grossed, dumping leveraged Treasury futures and equity index futures indiscriminately.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3 text-slate-800 dark:text-slate-200">Credit &amp; Equity Contagion</h3>
              <ul className="list-none space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="mr-3 text-lg leading-none text-[#BC4128] dark:text-[#E2694A]">✕</span>
                  <span>Credit Default Swap (CDS) spreads widened sharply as dealer liquidity vanished.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-lg leading-none text-[#BC4128] dark:text-[#E2694A]">✕</span>
                  <span>Higher Weighted Average Cost of Capital (WACC) and cross-market momentum algorithms forced severe equity de-rating.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Conclusion Key Takeaways */}
        <section className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="font-serif text-2xl mb-4 text-slate-800 dark:text-slate-200">Key Takeaways: The Cost of the Trap</h2>
          <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base">
            <li>
              The Fed&apos;s premature pause created a classic &ldquo;stop-and-go&rdquo; trap, forcing a violent credibility-saving reversal into sticky, supply-driven inflation.
            </li>
            <li>
              This policy shock bypassed a benign parallel shift, initiating a catastrophic <strong>bear flattening</strong> yield curve regime accurately modeled by the AFNS framework.
            </li>
            <li>
              Negative convexity in the multi-trillion-dollar Agency MBS market acted as a structural accelerant, creating a mechanical duration extension spiral.
            </li>
            <li>
              The resulting explosion in bond volatility and breakdown of equity-bond diversification overwhelmed DCC-GARCH limits, turning a targeted monetary adjustment into a mechanical, uncontrollable cross-asset liquidation cascade.
            </li>
          </ul>
        </section>

      </div>
    </ArticleFrame>
  );
}
