'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

const Tooltip = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      aria-label={`Definition for ${term}`}
    >
      <span className="border-b border-dashed border-slate-500 dark:border-slate-400 text-slate-800 dark:text-slate-200">
        {term}
      </span>
      {isVisible && (
        <span className="absolute z-10 w-64 p-3 mt-2 text-sm bg-white dark:bg-gray-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded shadow-lg -left-1/2 translate-x-1/4 block font-sans text-left">
          <span className="font-serif font-bold mb-1 text-[#A8672E] dark:text-[#D08F52] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
            {term}
          </span>
          <span className="block mt-1">{definition}</span>
        </span>
      )}
    </span>
  );
};

export default function StrategicWealthConsiderationsArticle() {
  return (
    <ArticleFrame
      slug="strategic-wealth-considerations-tax-and-behavioral-finance"
      additionalDisclaimer="Tax law is complex, jurisdiction-specific, and changes frequently -- the mechanics described here (including OBBBA and Inflation Reduction Act provisions) are illustrative, not a substitute for advice from a qualified CPA or tax attorney."
    >
      <div className="space-y-12">
        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Core Precepts of Advanced Wealth Preservation
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Gross yield is secondary; the primary metric is <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C]">after-tax, risk-adjusted performance</span>.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Realizable wealth faces continuous erosion from systemic inefficiencies, hidden statutory liabilities, and cognitive biases.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Recent legislation (Inflation Reduction Act, OBBBA) radically alters the calculus with novel excise taxes and new MAGI definitions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Seemingly isolated decisions cascade through a profile, triggering phase-outs, surcharges, and wealth erosion.</span>
            </li>
          </ul>
        </div>

        <InfographicSlot alt="Strategic wealth preservation: tax mechanics, asset location, and behavioral finance" />

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Intricacies of Municipal Bonds
          </h2>
          <p className="mb-6">
            Municipal bonds offer statutory exemption from federal income taxation, but optimizing allocation requires multi-dimensional analysis of state taxes, AMT, and secondary market pricing.
          </p>

          <FormulaPanel
            title="Formula: Tax-Equivalent Yield (TEY)"
            formula="\text{TEY} = \dfrac{\text{Tax-Free Yield}}{1 - \text{Marginal Tax Rate}}"
            legend="Standardizes comparison by determining the yield a taxable bond needs to generate to match the after-tax return of the municipal bond."
          />

          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4">
            The De Minimis Secondary Market Trap
          </h3>
          <p className="mb-6">
            While standard municipal bond coupons are tax-shielded, capital appreciation on bonds purchased at a discount in the secondary market is governed by the <Tooltip term="De Minimis Rule" definition="A statutory threshold dictating whether a market discount on a bond is taxed at favorable capital gains rates or highly punitive ordinary income rates." />.
          </p>

          <FormulaPanel
            title="Formula: De Minimis Threshold"
            formula="\text{Threshold} = \text{Bond Face Value} \times 0.25\% \times \text{Full Years to Maturity}"
            legend="Discount below the threshold is taxed at favorable capital gains rates (Safe Harbor); discount above it is taxed as ordinary income (Trap Triggered)."
            example={{
              label: 'Worked Example — $10,000 Par Value, 10 Years to Maturity',
              rows: [
                { label: 'Given', value: 'Face Value = $10,000 · Maturity = 10 years' },
                { label: 'Threshold', value: '$10,000 × 0.25% × 10 = $250' },
              ],
              result: { label: 'Pricing Floor', value: '$9,750' },
              note: 'Buy above $9,750 (e.g. $9,800, a $200 discount): gain taxed at capital-gains rates up to 23.8%. Buy below $9,750 (e.g. $9,500, a $500 discount): the full gain is taxed as ordinary income, up to 40.8%.',
            }}
          />

          <div className="mt-8">
            <ComparisonGrid>
              <ComparisonCard title="AMT Exposure Risk" tone="neg">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                    <span>Interest from <Tooltip term="Private Activity Bonds (PABs)" definition="Municipal debt where proceeds are utilized by a private entity for public purposes (airports, stadiums). Interest is an AMT tax preference item." /> must be added to AMTI.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                    <span>Subject to AMT rates of 26% or 28%, severely compressing net yield.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                    <span><span className="font-mono font-bold">OBBBA 2026 Alert:</span> Phase-out thresholds drop precipitously; rate doubles to 50%.</span>
                  </li>
                  <li className="flex items-start gap-2 border-t border-[#BC4128]/20 dark:border-[#E2694A]/20 pt-2">
                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                    <span><strong className="text-slate-900 dark:text-slate-100">Defense:</strong> Pivot strictly to General Obligation (GO) bonds.</span>
                  </li>
                </ul>
              </ComparisonCard>
              
              <ComparisonCard title="The IRMAA Surcharge Cliff" tone="neg">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                    <span>Tax-exempt municipal interest must be included in <Tooltip term="MAGI" definition="Modified Adjusted Gross Income, used to determine Medicare premium surcharges." /> for Medicare IRMAA.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                    <span>Operates on a strict 2-year lookback (2024 income dictates 2026 surcharges).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                    <span>Operates as a <strong className="text-slate-900 dark:text-slate-100">cliff</strong>: exceeding a bracket by $1 triggers the full unprorated surcharge for the year.</span>
                  </li>
                  <li className="flex items-start gap-2 border-t border-[#BC4128]/20 dark:border-[#E2694A]/20 pt-2">
                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                    <span><strong className="text-slate-900 dark:text-slate-100 font-mono">Paradox:</strong> Minor federal tax savings can trigger thousands in unavoidable Medicare costs.</span>
                  </li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Dividends vs. Capital Gains: Behavioral Anomalies
          </h2>
          <p className="mb-6">
            The pursuit of yield is frequently distorted by the <Tooltip term="Free Dividend Fallacy" definition="A psychological phenomenon where investors conceptually detach dividend distributions from capital gains, treating them as independent and ignoring the mechanical price decline on the ex-dividend date." />, leading to structural overvaluation and tax inefficiency.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="The Dividend Trap" tone="neg">
              <ul className="space-y-2 text-sm">
                <li>• Forces annual, unavoidable taxation regardless of the investor's current tax bracket.</li>
                <li>• Creates persistent tax drag that hinders long-term compounding.</li>
                <li>• Drives "dividend month premium" overvaluation as investors reach for yield.</li>
                <li>• Subject to increased issuance due to the 1% Stock Buyback Excise Tax.</li>
              </ul>
            </ComparisonCard>

            <ComparisonCard title="Capital Gains Superiority" tone="pos">
              <ul className="space-y-2 text-sm">
                <li>• Gains remain unrealized and untaxed until the asset is proactively sold.</li>
                <li>• Affords absolute control over tax timing (e.g., harvesting in low-income years).</li>
                <li>• Benefits from tax deferral and the step-up in basis at death (IRC Section 1014).</li>
                <li>• Optimized for taxable brokerage accounts.</li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Perils of Phantom Income
          </h2>
          <p className="mb-6">
            <Tooltip term="Phantom Income" definition="The statutory requirement to pay taxes on income or economic gains that have not actually been received in cash by the taxpayer." /> severely disrupts cash flow management, forcing the sourcing of external liquidity to satisfy IRS obligations.
          </p>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="font-serif text-lg font-bold text-[#A8672E] dark:text-[#D08F52]">TIPS & OID Taxation</h3>
              </div>
              <div className="md:w-2/3 text-sm">
                <p className="mb-3">Inflation adjustments applied to the principal of Treasury Inflation-Protected Securities (TIPS) generate Original Issue Discount (OID).</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5">•</span>
                    <span>IRS requires taxes paid on this upward adjustment in the year it occurs, despite no cash disbursement.</span>
                  </li>
                  <li className="flex items-start gap-2 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">
                    <span className="mt-0.5">•</span>
                    <span>Defense: Hold exclusively in tax-deferred/tax-free vehicles (IRAs).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="font-serif text-lg font-bold text-[#BC4128] dark:text-[#E2694A]">OBBBA 90% Gambling Cap</h3>
              </div>
              <div className="md:w-2/3 text-sm">
                <p className="mb-3">Effective 2026, deductions for gambling losses are capped at 90% of total winnings.</p>
                <ul className="space-y-2 font-mono text-xs bg-white dark:bg-gray-900 p-3 rounded border border-slate-200 dark:border-slate-700">
                  <li>Scenario: $100k winnings, $100k losses (net zero economic profit).</li>
                  <li>Deduction capped at $90k.</li>
                  <li className="text-[#BC4128] dark:text-[#E2694A] font-bold">$10,000 classified as taxable phantom income.</li>
                </ul>
                <p className="mt-3 text-xs italic text-slate-500">Secondary threat: Artificially inflates AGI, potentially triggering IRMAA cliffs or NIIT exposure.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Sophisticated Philanthropy Structures
          </h2>
          <p className="mb-6">
            Charitable giving represents a dual opportunity: funding causes while executing high-leverage tax mitigation. Contributing liquid cash is universally considered the least efficient method.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Donor-Advised Funds (DAFs)" tone="neutral">
              <p className="text-xs text-[#A8672E] dark:text-[#D08F52] mb-3 italic">Optimized for capital gains avoidance and itemized deductions.</p>
              <ul className="space-y-2 text-sm">
                <li>• Contribute highly appreciated, long-term non-cash assets (securities, real estate).</li>
                <li>• Avoids capital gains tax upon liquidation.</li>
                <li>• Secures immediate federal tax deduction (up to 30% AGI for appreciated assets).</li>
                <li>• Enables <strong className="text-slate-900 dark:text-slate-100">"bunching"</strong>: pre-funding several years of assets in a high-income year to crest standard deduction thresholds.</li>
              </ul>
            </ComparisonCard>

            <ComparisonCard title="Qualified Charitable Distributions (QCDs)" tone="neutral">
              <p className="text-xs text-[#A8672E] dark:text-[#D08F52] mb-3 italic">Precision defense for MAGI management (Age 70½+).</p>
              <ul className="space-y-2 text-sm">
                <li>• Direct, untaxed transfer from an IRA to a 501(c)(3) operating charity.</li>
                <li>• Uniquely satisfies Required Minimum Distributions (RMDs) without recognizing taxable income.</li>
                <li>• Artificially suppresses AGI/MAGI, directly defending against IRMAA cliffs and Social Security taxation.</li>
                <li>• <strong className="text-slate-900 dark:text-slate-100">Strict Rule:</strong> Cannot be executed into a DAF.</li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

      </div>
    </ArticleFrame>
  );
}
