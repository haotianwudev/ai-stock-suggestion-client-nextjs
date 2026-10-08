'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

const Jargon = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      aria-describedby="tooltip"
    >
      <span className="border-b border-dashed border-slate-400 dark:border-slate-500 font-semibold text-slate-800 dark:text-slate-200">
        {term}
      </span>
      {isVisible && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 z-50 text-sm font-sans font-normal 
                     bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 rounded shadow-xl pointer-events-none"
          role="tooltip"
        >
          {definition}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800 dark:border-t-slate-100" />
        </span>
      )}
    </span>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-serif text-[#A8672E] dark:text-[#D08F52] border-b border-slate-200 dark:border-slate-800 pb-2 mb-6">
      {title}
    </h2>
    <div className="space-y-6">{children}</div>
  </section>
);

export default function CrossCurrencyAnalysisPage() {
  return (
    <ArticleFrame
      slug="cross-currency-basis-squeeze"
      additionalDisclaimer="Cross-currency basis swaps, foreign exchange hedging, and sovereign debt investments carry significant market, liquidity, and currency risks. Regulatory frameworks and quantitative calculations are presented for educational and analytical purposes only."
    >
      <div className="max-w-5xl mx-auto space-y-12 text-slate-700 dark:text-slate-300 font-sans">
        
        {/* Compact Stat Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">CIP Arbitrage Capital Req</div>
            <div className="font-mono text-2xl text-[#BC4128] dark:text-[#E2694A]">5-6%</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Basis Widening per 1pt USD</div>
            <div className="font-mono text-2xl text-[#BC4128] dark:text-[#E2694A]">-2.3 bps</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">J-ICS ESR Target Ratio</div>
            <div className="font-mono text-2xl text-[#1D8A70] dark:text-[#3CBF9C]">200-270%</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">ESR VaR Confidence Level</div>
            <div className="font-mono text-2xl text-slate-900 dark:text-slate-100">99.5%</div>
          </div>
        </div>

        {/* Section 1 */}
        <Section title="The Foundation: CIP & Global Dollar Funding">
          <ul className="list-disc pl-5 space-y-3">
            <li>
              Historically, <Jargon term="Covered Interest Parity (CIP)" definition="An arbitrage condition dictating that the interest rate differential between two currencies must equal the differential between the forward and spot exchange rates." /> acted as an inviolable law of financial economics.
            </li>
            <li>
              Under theoretical CIP, institutions could perfectly hedge exchange rate risk, yielding a net profit of zero and enabling <span className="text-[#1D8A70] dark:text-[#3CBF9C]">seamless global dollar funding</span>.
            </li>
            <li>
              Since 2007, this condition has systematically failed. Borrowing synthetic dollars via FX swaps is now structurally more expensive than direct dollar cash market funding.
            </li>
            <li>
              This deviation is the <Jargon term="Cross-Currency Basis" definition="A persistent pricing wedge indicating synthetic dollar funding is more expensive than direct funding; acts as an observable intermediation fee." />.
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
              <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-3">Pre-GFC Regime</h3>
              <ul className="list-none space-y-2 text-sm">
                <li className="flex items-start"><span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">✓</span> CIP held with precision.</li>
                <li className="flex items-start"><span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">✓</span> Arbitrageurs instantly closed pricing gaps.</li>
                <li className="flex items-start"><span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">✓</span> Balance sheet capacity was highly elastic.</li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
              <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-3">Post-GFC Regime</h3>
              <ul className="list-none space-y-2 text-sm">
                <li className="flex items-start"><span className="text-[#BC4128] dark:text-[#E2694A] mr-2">✗</span> CIP systematically breaks down.</li>
                <li className="flex items-start"><span className="text-[#BC4128] dark:text-[#E2694A] mr-2">✗</span> Basis remains stubbornly negative for EUR/JPY.</li>
                <li className="flex items-start"><span className="text-[#BC4128] dark:text-[#E2694A] mr-2">✗</span> Shadow costs emerge for dollar intermediation.</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 2 */}
        <Section title="Derivative Mechanics: Short vs. Long-Term Hedging">
          <div className="overflow-x-auto">
            <div className="min-w-[600px] grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">
                  <Jargon term="FX Swap" definition="Two simultaneous transactions (spot and forward) where implied rate of return is determined entirely by forward points." />
                </h3>
                <ul className="space-y-3">
                  <li><strong>Duration:</strong> 1 week to 1 year</li>
                  <li><strong>Cash Flows:</strong> Initial and final principal exchange only</li>
                  <li><strong>Pricing:</strong> Implied via forward points (F - S)</li>
                  <li><strong>Function:</strong> Short-term liquidity, rolling currency hedges</li>
                </ul>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">
                  <Jargon term="Cross-Currency Basis Swap" definition="Long-dated derivative exchanging principal and periodic floating interest rate payments throughout the life of the swap." />
                </h3>
                <ul className="space-y-3">
                  <li><strong>Duration:</strong> 1 year to 30+ years</li>
                  <li><strong>Cash Flows:</strong> Principal + periodic interest payments</li>
                  <li><strong>Pricing:</strong> Floating risk-free rates (SOFR, TONA) + Basis Spread</li>
                  <li><strong>Function:</strong> Structural asset-liability management</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3 */}
        <Section title="The Mathematics of the Basis and the Limits of Arbitrage">
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>
              The basis represents the <span className="text-[#BC4128] dark:text-[#E2694A]">shadow cost of the balance sheet capacity</span> demanded by primary dealers.
            </li>
            <li>
              Regulations like the <Jargon term="Supplementary Leverage Ratio (SLR)" definition="Mandates banks hold capital against total gross notional value of exposures, regardless of underlying credit risk." /> penalize the gross asset/liability expansion required for arbitrage.
            </li>
            <li>
              Holding technically &ldquo;riskless&rdquo; arbitrage positions heavily dilutes top-tier banks&apos; Return on Equity (ROE).
            </li>
          </ul>

          <div className="bg-[#14171B] dark:bg-[#05070A] rounded-xl p-6 shadow-lg border border-slate-800">
            <h3 className="text-slate-400 font-sans text-sm uppercase tracking-widest mb-4">Market-Implied Basis Calculation</h3>
            <MathBlock
              math="x(t, t+n) = y_{\$}(t, t+n) - \left[ y_{\text{JPY}}(t, t+n) - \rho(t, t+n) \right]"
              className="text-white text-lg mb-6"
            />
            <ul className="font-mono text-sm text-slate-300 space-y-2 border-t border-slate-700 pt-4">
              <li><InlineMath math="x(t, t+n)" /> : Cross-Currency Basis (Wedge)</li>
              <li><InlineMath math="y_{\$}(t, t+n)" /> : Direct USD Interest Rate</li>
              <li><InlineMath math="y_{\text{JPY}}(t, t+n)" /> : Direct JPY Interest Rate</li>
              <li><InlineMath math="\rho(t, t+n)" /> : Forward Premium (Cost of hedging FX risk)</li>
            </ul>
          </div>
        </Section>

        {/* Featured Infographic */}
        <InfographicSlot
          alt="Cross-Currency Basis Squeeze and Institutional Hedged Yields"
          label="Featured Infographic"
        />

        {/* Section 4 */}
        <Section title="The Hedging Cost Math: Why Japanese Capital Flashes Warning Signs">
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>
              Japanese investors face a strict yield hurdle: if the yield on a domestic JGB surpasses the FX-hedged yield of a US Treasury, the mandate triggers <span className="text-[#BC4128] dark:text-[#E2694A]">systematic liquidation</span>.
            </li>
            <li>
              A widening (more negative) basis acts as a direct tax, frequently offsetting the benefits of narrowing monetary policy rate differentials.
            </li>
          </ul>

          <div className="bg-[#14171B] dark:bg-[#05070A] rounded-xl p-6 shadow-lg border border-slate-800">
            <h3 className="text-slate-400 font-sans text-sm uppercase tracking-widest mb-4">Hedged Yield Formula</h3>
            <MathBlock
              math="\text{Hedged Yield} \approx y_{\text{UST}} - \left[ (r_{\text{USD}} - r_{\text{JPY}}) - x_t \right]"
              className="text-white text-lg mb-6"
            />
             
            <div className="border-t border-slate-700 pt-6">
              <h4 className="text-[#D08F52] font-sans text-sm uppercase tracking-widest mb-4">Worked Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-sm tabular-nums text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="pb-3 pr-4 font-normal">Component</th>
                      <th className="pb-3 pr-4 font-normal">Fed @ 5.25%, BOJ @ -0.10%</th>
                      <th className="pb-3 font-normal">Fed @ 4.00%, BOJ @ 0.50%</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 pr-4 text-slate-400">US Risk-Free (<InlineMath math="r_{\text{USD}}" />)</td>
                      <td className="py-3 pr-4">5.25%</td>
                      <td className="py-3">4.00%</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 pr-4 text-slate-400">Japan Risk-Free (<InlineMath math="r_{\text{JPY}}" />)</td>
                      <td className="py-3 pr-4">-0.10%</td>
                      <td className="py-3">0.50%</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 pr-4 text-slate-400">Rate Differential</td>
                      <td className="py-3 pr-4">5.35%</td>
                      <td className="py-3">3.50%</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 pr-4 text-[#E2694A]">Basis (<InlineMath math="x_t" />)</td>
                      <td className="py-3 pr-4 text-[#E2694A]">-0.40%</td>
                      <td className="py-3 text-[#E2694A]">-0.60%</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 pr-4 text-[#D08F52]">Total Hedging Cost</td>
                      <td className="py-3 pr-4 text-[#D08F52]">5.75%</td>
                      <td className="py-3 text-[#D08F52]">4.10%</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 pr-4 text-slate-400">10Y UST Yield</td>
                      <td className="py-3 pr-4">4.25%</td>
                      <td className="py-3">3.75%</td>
                    </tr>
                    <tr>
                      <td className="pt-3 pr-4 text-[#E2694A] font-semibold">Realized Hedged Yield</td>
                      <td className="pt-3 pr-4 text-[#E2694A] font-semibold">-1.50%</td>
                      <td className="pt-3 text-[#E2694A] font-semibold">-0.35%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 5 */}
        <Section title="Capital Reallocation: The ESR Regulatory Shock">
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>
              Japan is transitioning to the <Jargon term="Economic Value-Based Solvency Ratio (ESR)" definition="A regulatory framework demanding mark-to-market valuation and measuring risk via a 99.5% VaR over a 1-year horizon." /> in April 2026.
            </li>
            <li>
              Under ESR, long-duration unhedged foreign bonds trigger massive capital charges, while 30-year JGBs create a <span className="text-[#1D8A70] dark:text-[#3CBF9C]">perfect asset-liability match</span>.
            </li>
            <li>
              This shift preemptively forces life insurers to dump foreign sovereign bonds, drying up synthetic dollar supply.
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
              <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-3">Legacy SMR Regime</h3>
              <ul className="space-y-3 text-sm">
                <li><strong>Valuation:</strong> Book value / Historical accounting</li>
                <li><strong>Risk Measurement:</strong> Factor-based static charges</li>
                <li><strong>FX Risk Penalty:</strong> Moderate</li>
                <li><strong>Optimal Asset:</strong> Yield-chasing foreign credit (USTs/CLOs)</li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border-l-4 border-l-[#A8672E] dark:border-l-[#D08F52]">
              <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-3">New ESR Regime (J-ICS 2026)</h3>
              <ul className="space-y-3 text-sm">
                <li><strong>Valuation:</strong> Mark-to-market (Economic Fair Value)</li>
                <li><strong>Risk Measurement:</strong> 99.5% VaR over 1-year horizon</li>
                <li><strong>FX Risk Penalty:</strong> <span className="text-[#BC4128] dark:text-[#E2694A]">High (Cost-of-Capital MOCE approach)</span></li>
                <li><strong>Optimal Asset:</strong> <span className="text-[#1D8A70] dark:text-[#3CBF9C]">Super-long domestic JGBs (30yr/40yr)</span></li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 6 */}
        <Section title="Systemic Risks: The Yen Carry Unwind Reflexivity Loop">
          <p className="mb-4">
            The unwinding of the Yen Carry trade triggers violent chain reactions across leveraged systematic funds:
          </p>
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <strong>Lookback Shocks:</strong> <Jargon term="Commodity Trading Advisors (CTAs)" definition="Systematic macro funds utilizing historical lookback periods and quantitative rules to trade futures." /> relying on low BOJ volatility metrics absorb sudden un-modeled signals as rate differentials collapse.
            </li>
            <li>
              <strong>Volatility-Adjusted Deleveraging:</strong> As USD/JPY volatility spikes, quantitative models mechanically force rapid reduction in gross exposure.
            </li>
            <li>
              <strong>Reflexivity Loop:</strong> Forced yen-buying pushes the currency higher, escalating realized volatility, triggering hard stop-losses, forcing <span className="text-[#BC4128] dark:text-[#E2694A]">violent mechanical unwinds</span>.
            </li>
            <li>
              <strong>Multi-Manager Cross-Margining:</strong> Massive FX pod losses force central risk officers to <span className="text-[#BC4128] dark:text-[#E2694A]">liquidate unrelated profitable positions</span> (US tech stocks, Treasuries) to meet VaR limits, igniting cross-asset flash crashes.
            </li>
            <li>
              <strong>Off-Balance-Sheet Leverage:</strong> Synthetic credit-linked notes and total return swaps mask the scale of margin cascades from policymakers until unwinds accelerate.
            </li>
          </ul>
        </Section>

        {/* Section 7 */}
        <Section title="Synthesis">
          <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 mb-8">
            <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4">Executive Summary</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
              <li>Post-2008 banking regulations fractured Covered Interest Parity, creating a permanent structural wedge (the cross-currency basis) in offshore dollar funding.</li>
              <li>Decades of BOJ zero-interest policy fueled a massive yen carry trade spanning Japanese fiduciaries and speculative hedge funds.</li>
              <li>The BOJ&apos;s current rate normalization coincides with draconian new capital rules (ESR in 2026), systematically forcing the repatriation of trillions back into Japanese sovereign bonds.</li>
              <li>Sudden yen appreciation triggers massive VaR shocks within leveraged CTA and multi-manager pods, transforming currency unwinds into global cross-asset margin cascades.</li>
              <li>The dismantling of this plumbing guarantees structurally heightened cross-border capital volatility.</li>
            </ul>
          </div>

          <h3 className="font-serif text-xl text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            Actionable Checklist for Macro Investors
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="font-mono text-[#A8672E] dark:text-[#D08F52]">01</span>
              <div>
                <strong className="block text-slate-900 dark:text-slate-100">Monitor the Cross-Currency Basis as a Liquidity Early Warning System</strong>
                Track the 3-month and 1-year USD/JPY and EUR/USD basis swap spreads daily. Widening beyond 20-30 bps signals evaporating synthetic dollar liquidity and impending deleveraging.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-[#A8672E] dark:text-[#D08F52]">02</span>
              <div>
                <strong className="block text-slate-900 dark:text-slate-100">Calculate True Institutional Yield Hurdles</strong>
                Use the full Hedged Yield formula. If a hedged 10-year US Treasury yields less than a domestic 30-year JGB, anticipate systematic sovereign selling from Japanese institutions.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-[#A8672E] dark:text-[#D08F52]">03</span>
              <div>
                <strong className="block text-slate-900 dark:text-slate-100">Audit Regulatory Triggers Ahead of ESR Implementation</strong>
                Position for the April 2026 Japanese capital cliff. Anticipate persistent liquidation of unhedged foreign credit in favor of super-long domestic debt as insurers optimize for the new 99.5% VaR requirements.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-[#A8672E] dark:text-[#D08F52]">04</span>
              <div>
                <strong className="block text-slate-900 dark:text-slate-100">Stress-Test for Multi-Manager Cross-Margining Contagion</strong>
                Hedge long equity books with long yen optionality. A 3-standard-deviation move in the yen mechanically forces liquidation of crowded long equity positions due to pod-shop cross-margining.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-[#A8672E] dark:text-[#D08F52]">05</span>
              <div>
                <strong className="block text-slate-900 dark:text-slate-100">Identify Hidden Leverage in Off-Balance-Sheet FX Swaps</strong>
                Adjust systemic risk models to treat total return swaps and short-dated FX forwards as opaque synthetic debt, recognizing that a strengthening dollar tightens global leverage.
              </div>
            </li>
          </ul>
        </Section>
        
      </div>
    </ArticleFrame>
  );
}
