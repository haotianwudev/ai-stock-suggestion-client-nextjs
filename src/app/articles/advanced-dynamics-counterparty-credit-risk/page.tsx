'use client';

import React, { useState, useEffect } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';

const Tooltip = ({ term, children }: { term: string; children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <span
      tabIndex={0}
      className="relative inline-block border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] cursor-help transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 outline-none focus:ring-2 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm px-0.5"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {term}
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 shadow-xl rounded-md border border-slate-200 dark:border-slate-700 z-20 pointer-events-none font-sans text-left normal-case">
          {children}
        </span>
      )}
    </span>
  );
};

const FormulaPanel = ({
  formula,
  description,
  example,
}: {
  formula: string;
  description?: string;
  example?: React.ReactNode;
}) => (
  <div className="w-full overflow-x-auto rounded-xl shadow-lg my-6">
    <div className="bg-[#14171B] dark:bg-[#05070A] p-6 min-w-[500px]">
      <MathBlock math={formula} className="text-white text-lg" />
      {description && (
        <p className="mt-3 text-xs text-slate-400 font-sans border-t border-slate-800 pt-3 leading-relaxed">
          {description}
        </p>
      )}
      {example && <div className="mt-4">{example}</div>}
    </div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
      {title}
    </h2>
    {children}
  </section>
);

const StatBox = ({
  value,
  label,
  sentiment = 'neutral',
}: {
  value: string;
  label: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}) => {
  const colorClass =
    sentiment === 'positive'
      ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
      : sentiment === 'negative'
      ? 'text-[#BC4128] dark:text-[#E2694A]'
      : 'text-[#A8672E] dark:text-[#D08F52]';

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
      <div className={`font-mono text-3xl font-bold tabular-nums mb-1 ${colorClass}`}>{value}</div>
      <div className="text-xs text-slate-600 dark:text-slate-400 font-sans">{label}</div>
    </div>
  );
};

export default function CounterpartyRiskReport() {
  return (
    <ArticleFrame slug="advanced-dynamics-counterparty-credit-risk">
      <div className="space-y-10 pb-16">
        {/* Stat Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox value="~66%" label="Crisis Losses via MtM Declines" sentiment="negative" />
          <StatBox value="10 Days" label="SIMM MPoR Window" sentiment="neutral" />
          <StatBox value=">90%" label="CVA from Exposure Spikes" sentiment="negative" />
          <StatBox value="1.4x" label="SA-CCR Alpha Multiplier" sentiment="neutral" />
        </div>

        <Section title="Evolution of Counterparty Credit Risk">
          <ul className="list-disc pl-5 space-y-3 text-slate-700 dark:text-slate-300">
            <li>Pre-2008 framework assumed risk-free counterparties and relied on rudimentary credit limits.</li>
            <li>
              <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">Systemic realization:</span> Roughly two-thirds of counterparty credit losses during the 2008 crisis were driven by <Tooltip term="Mark-to-Market (MtM)">The dynamic daily valuation of a portfolio based on current market prices.</Tooltip> declines from widening credit spreads, not actual defaults.
            </li>
            <li>
              <Tooltip term="CVA">Credit Valuation Adjustment: The market value of counterparty credit risk, mathematically reducing the value of an asset to the party bearing credit risk.</Tooltip> fluctuates dynamically as a market-priced expected loss.
            </li>
            <li>Day-to-day CVA changes flow directly through the income statement, generating substantial earnings volatility.</li>
            <li>Mandated by fair value standards (IFRS 13, US GAAP ASC 820) and heavily penalized by Basel III capital charges.</li>
          </ul>
        </Section>

        <Section title="Deconstructing Mark-to-Market Exposure">
          <ul className="list-disc pl-5 space-y-3 mb-6 text-slate-700 dark:text-slate-300">
            <li>Unlike corporate loans (deterministic exposure), derivative exposure is highly stochastic and asymmetric.</li>
            <li>Institutions only face credit exposure when the derivative is in their favor (counterparty owes money).</li>
            <li>If a counterparty defaults when the position is a liability to the institution, the default costs nothing.</li>
          </ul>

          <FormulaPanel 
            formula="E(t) = \max(V(t), 0)" 
            description="Modeled analytically as a European call option on the portfolio value V(t) with a strike price of zero."
          />

          <div className="overflow-x-auto mt-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 font-serif font-semibold text-slate-900 dark:text-slate-100">Exposure Metric</th>
                  <th className="p-4 font-serif font-semibold text-slate-900 dark:text-slate-100">Application in Quantitative Finance</th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/40">
                <tr>
                  <td className="p-4 font-mono font-medium text-[#A8672E] dark:text-[#D08F52]">Expected Exposure (EE)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Statistical average of positive MtM value across simulated paths. The fundamental block for pricing CVA.</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-medium text-[#A8672E] dark:text-[#D08F52]">Expected Positive Exposure (EPE)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Time-weighted average of EE. Used for quick CVA approximations.</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-medium text-[#A8672E] dark:text-[#D08F52]">Potential Future Exposure (PFE)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">High-percentile threshold (95&ndash;99%). A conservative worst-case scenario for internal limits and regulatory capital.</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-medium text-[#A8672E] dark:text-[#D08F52]">Expected Negative Exposure (ENE)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Average of negative net market values. Core input for calculating DVA.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <InfographicSlot
          alt="Advanced Dynamics of Counterparty Credit Risk Infographic"
          label="Featured Infographic"
        />

        <Section title="The Triad of Counterparty Risk Mitigation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-serif text-xl mb-4 text-[#1D8A70] dark:text-[#3CBF9C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                Margin Management
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <strong>Variation Margin (VM):</strong> Backward-looking. Daily cash/bond postings collateralizing past MtM fluctuations.
                </li>
                <li>
                  <strong>Initial Margin (IM):</strong> Forward-looking. Ex-ante buffer covering PFE during the <Tooltip term="MPoR">Margin Period of Risk: Time interval from last successful collateral exchange to trade close-out (typically 10 days for SIMM).</Tooltip>.
                </li>
                <li>Operational, legal, and liquidity-driven function.</li>
                <li>Managed by collateral desks ensuring High-Quality Liquid Assets (HQLA) are available.</li>
                <li>No direct P&amp;L impact; purely balance sheet assets/liabilities.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                CVA Management
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li>Forward-looking long-term (Maturity).</li>
                <li>Prices the statistical expected loss from counterparty default over the trade&apos;s lifetime.</li>
                <li>Dynamic derivative pricing and active risk-hedging function.</li>
                <li>Direct impact on daily P&amp;L and earnings volatility.</li>
                <li>Managed by dedicated Front-Office CVA Trading Desks using cross-asset hedging (CDS, swaptions).</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="The Fallacy of Zero Risk">
          <ul className="list-disc pl-5 space-y-3 text-slate-700 dark:text-slate-300">
            <li>Pervasive misconception: Mandatory IM effectively eliminates counterparty credit risk.</li>
            <li>Mathematical reality: Legal time lags between trade payments and margin reposting produce extreme <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold">exposure spikes</span>.</li>
            <li>If a massive scheduled trade payment flows to a defaulting counterparty during MPoR, the bank&apos;s exposure spikes instantly while collateral remains static.</li>
            <li>These deterministic cash flow jumps massively exceed Value-at-Risk (VaR) based Initial Margin levels.</li>
            <li>For standard interest rate swaps, spikes contribute <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-rose-600 dark:text-rose-400 font-semibold">&gt;90%</span> of total CVA.</li>
            <li>Residual exposure is often 5 to 10 times higher than regulatory models anticipated.</li>
          </ul>
        </Section>

        <Section title="Beyond CVA: The Comprehensive xVA Framework">
          <p className="mb-4 text-slate-700 dark:text-slate-300">An arbitrage-free valuation must account for a broader family of valuation adjustments:</p>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-serif text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">Debit Valuation Adjustment (DVA)</h4>
              <ul className="list-disc pl-5 space-y-2 mb-3 text-sm text-slate-700 dark:text-slate-300">
                <li>The mirror image of CVA: The mathematical benefit arising from the institution&apos;s <em>own</em> probability of default.</li>
                <li>
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">Accounting Paradox:</span> As creditworthiness deteriorates (CDS spreads widen), DVA increases, causing the bank to report massive unrealized MtM profits precisely when nearing financial ruin.
                </li>
              </ul>
              <FormulaPanel 
                formula="\text{DVA} \approx \text{LGD}_{\text{own}} \times \sum_{i} \left[ \text{ENE}(t_i) \times \text{PD}_{\text{own}}(t_{i-1}, t_i) \times \text{DF}(t_i) \right]" 
                description="Calculated using Expected Negative Exposure (ENE) and the bank's own market-implied PD."
              />
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">Funding Valuation Adjustment (FVA)</h4>
              <ul className="list-disc pl-5 space-y-2 mb-3 text-sm text-slate-700 dark:text-slate-300">
                <li>Captures friction costs of funding asymmetrically collateralized positions (e.g., uncollateralized client trade vs. collateralized interdealer hedge).</li>
              </ul>
              <FormulaPanel 
                formula="\text{FVA} \approx \sum_{i} \left[ \text{EE}(t_i) \times s_{\text{fund}} \times \Delta t_i \times \text{DF}(t_i) \right]" 
                description="Where s_fund represents the bank's unsecured funding spread."
              />
            </div>

            <div>
              <h4 className="font-serif text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">Margin (MVA) &amp; Capital (KVA) Adjustments</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>MVA:</strong> Cost of funding Initial Margin, which is trapped in segregated accounts and cannot be rehypothecated. Requires forward SIMM projection.</li>
                <li><strong>KVA:</strong> Explicitly charged to the client at inception to remunerate shareholder capital locked up by Basel III Risk-Weighted Asset (RWA) requirements.</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Mathematical Formulation &amp; Wrong-Way Risk">
          <p className="mb-4 text-slate-700 dark:text-slate-300">Integration of market risk (future exposure) and credit risk (default probability density) is strictly executed using market-implied, bootstrapped CDS spreads&mdash;never historical default rates.</p>
          
          <FormulaPanel 
            formula="\text{CVA} \approx \text{LGD} \times \sum_{i} \left[ \text{EE}(t_i) \times \text{PD}(t_{i-1}, t_i) \times \text{DF}(t_i) \right]"
            description="Discrete CVA summation across simulation time steps."
          />

          <div className="mt-8">
            <h4 className="font-serif text-lg font-semibold mb-3 border-b border-slate-200 dark:border-slate-800 pb-1 inline-block text-slate-900 dark:text-slate-100">The Impact of Wrong-Way Risk (WWR)</h4>
            <ul className="list-disc pl-5 space-y-3 mt-4 text-slate-700 dark:text-slate-300">
              <li>
                Standard CVA assumes independence between exposure and default probability. <Tooltip term="Wrong-Way Risk (WWR)">Occurs when exposure to a counterparty increases exactly as their probability of default increases.</Tooltip> severely inflates CVA.
              </li>
              <li><strong>Specific WWR:</strong> Driven by trade structure (e.g., writing a put option on the counterparty&apos;s own stock).</li>
              <li><strong>General WWR:</strong> Driven by macroeconomic correlations (e.g., currency devaluation correlating with sovereign/corporate default).</li>
              <li>Modeled via Static Copulas (forcing default densities around extreme MtM scenarios) or Dynamic Stochastic Intensity Models (correlating Brownian motions).</li>
            </ul>
          </div>
        </Section>

        <Section title="Regulatory Capital Regimes &amp; Basel III Endgame">
          <ul className="list-disc pl-5 space-y-3 mb-6 text-slate-700 dark:text-slate-300">
            <li><strong>SA-CCR (Exposure at Default):</strong> Highly sensitive to margining and netting benefits. Formula structurally inflates exposures by 40% via the alpha multiplier.</li>
          </ul>
          <FormulaPanel 
            formula="\text{EAD} = 1.4 \times \left( \text{Replacement Cost} + \text{Multiplier} \times \text{AddOn} \right)" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] pl-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-r-xl">
              <h4 className="font-serif font-bold text-lg mb-2 text-[#1D8A70] dark:text-[#3CBF9C]">SA-CVA (Standardized Approach)</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Risk-sensitive. Mandates banks compute risk sensitivities (Delta/Vega). <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">Allows banks to recognize capital-reducing benefits of market risk hedges.</span></p>
            </div>
            <div className="border-l-4 border-[#BC4128] dark:border-[#E2694A] pl-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-r-xl">
              <h4 className="font-serif font-bold text-lg mb-2 text-[#BC4128] dark:text-[#E2694A]">BA-CVA (Basic Approach)</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Formulaic fallback. <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold">Critically does NOT allow banks to recognize market risk hedges</span>, leading to potentially punitive, unmitigated capital requirements even for perfectly hedged P&amp;L.</p>
            </div>
          </div>
        </Section>

        {/* Conclusion / Key Takeaways Card */}
        <section className="mt-16">
          <div className="bg-slate-100 dark:bg-[#0F1319] p-8 rounded-xl border border-slate-300 dark:border-slate-700">
            <h2 className="font-serif text-2xl mb-6 text-center text-[#A8672E] dark:text-[#D08F52]">Key Structural Takeaways</h2>
            <ul className="list-none space-y-4 font-sans text-slate-700 dark:text-slate-300">
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">✦</span>
                <span><strong>Collateral framework limits:</strong> Variation and Initial Margin significantly mitigate, but mathematically fail to eradicate, counterparty risk due to the Margin Period of Risk and extreme cash flow spikes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">✦</span>
                <span><strong>Economic friction costs:</strong> The modern xVA framework proves every derivative transaction consumes unsecured funding (FVA), traps margin liquidity (MVA), and demands regulatory capital (KVA).</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">✦</span>
                <span><strong>Regulatory pivot:</strong> The Basel III Endgame shifts the operational burden to SA-CVA, requiring flawless synchronization between front-office accounting models and rigid regulatory risk sensitivities.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
