'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { FormulaPanel } from '@/components/articles/article-visuals';

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
      <span className="border-b border-dashed border-gray-500 dark:border-gray-400 text-gray-800 dark:text-gray-200">
        {term}
      </span>
      {isVisible && (
        <span className="absolute z-10 w-64 p-2 mt-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded shadow-lg -left-1/2 translate-x-1/4 block font-sans text-left">
          <span className="font-semibold mb-1 text-[#A8672E] dark:text-[#D08F52] flex items-center gap-1">
            <HelpCircle size={14} /> {term}
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-gray-900 dark:text-gray-100 font-sans bg-transparent">

        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-r shadow-sm">
            <h2 className="font-serif text-2xl mb-4 text-[#A8672E] dark:text-[#D08F52]">Core Precepts of Advanced Wealth Preservation</h2>
            <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Gross yield is secondary; the primary metric is <span className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">after-tax, risk-adjusted performance</span>.</li>
              <li>Realizable wealth faces continuous erosion from systemic inefficiencies, hidden statutory liabilities, and cognitive biases.</li>
              <li>Recent legislation (Inflation Reduction Act, OBBBA) radically alters the calculus with novel excise taxes and new MAGI definitions.</li>
              <li>Seemingly isolated decisions cascade through a profile, triggering phase-outs, surcharges, and wealth erosion.</li>
            </ul>
          </div>
        </section>

        <InfographicSlot alt="Strategic wealth preservation: tax mechanics, asset location, and behavioral finance" />

        <section className="mb-16">
          <h2 className="font-serif text-3xl mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            The Intricacies of Municipal Bonds
          </h2>

          <div className="mb-8">
            <p className="mb-4">
              Municipal bonds offer statutory exemption from federal income taxation, but optimizing allocation requires multi-dimensional analysis of state taxes, AMT, and secondary market pricing.
            </p>

            <FormulaPanel
              title="Formula: Tax-Equivalent Yield (TEY)"
              formula="\text{TEY} = \dfrac{\text{Tax-Free Yield}}{1 - \text{Marginal Tax Rate}}"
              legend="Standardizes comparison by determining the yield a taxable bond needs to generate to match the after-tax return of the municipal bond."
            />
          </div>

          <div className="mb-10">
            <h3 className="font-serif text-2xl mb-4 text-[#BC4128] dark:text-[#E2694A]">The De Minimis Secondary Market Trap</h3>
            <p className="mb-4">
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
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-serif text-xl mb-3 text-[#BC4128] dark:text-[#E2694A]">AMT Exposure Risk</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Interest from <Tooltip term="Private Activity Bonds (PABs)" definition="Municipal debt where proceeds are utilized by a private entity for public purposes (airports, stadiums). Interest is an AMT tax preference item." /> must be added to AMTI.</li>
                <li>Subject to AMT rates of 26% or 28%, severely compressing net yield.</li>
                <li><span className="font-mono text-[#BC4128] dark:text-[#E2694A]">OBBBA 2026 Alert:</span> Phase-out thresholds drop precipitously; rate doubles to 50%.</li>
                <li><strong>Defense:</strong> Pivot strictly to General Obligation (GO) bonds.</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-serif text-xl mb-3 text-[#BC4128] dark:text-[#E2694A]">The IRMAA Surcharge Cliff</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Tax-exempt municipal interest must be included in <Tooltip term="MAGI" definition="Modified Adjusted Gross Income, used to determine Medicare premium surcharges." /> for Medicare IRMAA.</li>
                <li>Operates on a strict 2-year lookback (2024 income dictates 2026 surcharges).</li>
                <li>Operates as a <strong>cliff</strong>: exceeding a bracket by $1 triggers the full unprorated surcharge for the year.</li>
                <li><span className="font-mono text-[#BC4128] dark:text-[#E2694A]">Paradox:</span> Minor federal tax savings can trigger thousands in unavoidable Medicare costs.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-serif text-3xl mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            Dividends vs. Capital Gains: Behavioral Anomalies
          </h2>

          <p className="mb-6">
            The pursuit of yield is frequently distorted by the <Tooltip term="Free Dividend Fallacy" definition="A psychological phenomenon where investors conceptually detach dividend distributions from capital gains, treating them as independent and ignoring the mechanical price decline on the ex-dividend date." />, leading to structural overvaluation and tax inefficiency.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded border-t-4 border-[#BC4128] dark:border-[#E2694A] shadow-sm">
              <h3 className="font-serif text-xl mb-4 text-[#BC4128] dark:text-[#E2694A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                The Dividend Trap
              </h3>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li>Forces annual, unavoidable taxation regardless of the investor&apos;s current tax bracket.</li>
                <li>Creates persistent tax drag that hinders long-term compounding.</li>
                <li>Drives &ldquo;dividend month premium&rdquo; overvaluation as investors reach for yield.</li>
                <li>Subject to increased issuance due to the 1% Stock Buyback Excise Tax.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded border-t-4 border-[#1D8A70] dark:border-[#3CBF9C] shadow-sm">
              <h3 className="font-serif text-xl mb-4 text-[#1D8A70] dark:text-[#3CBF9C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                Capital Gains Superiority
              </h3>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li>Gains remain unrealized and untaxed until the asset is proactively sold.</li>
                <li>Affords absolute control over tax timing (e.g., harvesting in low-income years).</li>
                <li>Benefits from tax deferral and the step-up in basis at death (IRC Section 1014).</li>
                <li>Optimized for taxable brokerage accounts.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-serif text-3xl mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            The Perils of Phantom Income
          </h2>

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            <Tooltip term="Phantom Income" definition="The statutory requirement to pay taxes on income or economic gains that have not actually been received in cash by the taxpayer." /> severely disrupts cash flow management, forcing the sourcing of external liquidity to satisfy IRS obligations.
          </p>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-5 rounded border border-gray-200 dark:border-gray-700">
              <div className="md:w-1/3">
                <h3 className="font-serif text-lg text-[#A8672E] dark:text-[#D08F52]">TIPS &amp; OID Taxation</h3>
              </div>
              <div className="md:w-2/3 text-sm text-gray-700 dark:text-gray-300">
                <p className="mb-2">Inflation adjustments applied to the principal of Treasury Inflation-Protected Securities (TIPS) generate Original Issue Discount (OID).</p>
                <ul className="list-disc list-inside">
                  <li>IRS requires taxes paid on this upward adjustment in the year it occurs, despite no cash disbursement.</li>
                  <li><span className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Defense:</span> Hold exclusively in tax-deferred/tax-free vehicles (IRAs).</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-5 rounded border border-gray-200 dark:border-gray-700">
              <div className="md:w-1/3">
                <h3 className="font-serif text-lg text-[#BC4128] dark:text-[#E2694A]">OBBBA 90% Gambling Cap</h3>
              </div>
              <div className="md:w-2/3 text-sm text-gray-700 dark:text-gray-300">
                <p className="mb-2">Effective 2026, deductions for gambling losses are capped at 90% of total winnings.</p>
                <ul className="list-disc list-inside font-mono">
                  <li>Scenario: $100k winnings, $100k losses (net zero economic profit).</li>
                  <li>Deduction capped at $90k.</li>
                  <li className="text-[#BC4128] dark:text-[#E2694A]">$10,000 classified as taxable phantom income.</li>
                </ul>
                <p className="mt-2 text-xs italic">Secondary threat: Artificially inflates AGI, potentially triggering IRMAA cliffs or NIIT exposure.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            Sophisticated Philanthropy Structures
          </h2>

          <p className="mb-6">
            Charitable giving represents a dual opportunity: funding causes while executing high-leverage tax mitigation. Contributing liquid cash is universally considered the least efficient method.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">Donor-Advised Funds (DAFs)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">Optimized for capital gains avoidance and itemized deductions.</p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Contribute highly appreciated, long-term non-cash assets (securities, real estate).</li>
                <li>Avoids capital gains tax upon liquidation.</li>
                <li>Secures immediate federal tax deduction (up to 30% AGI for appreciated assets).</li>
                <li>Enables <span className="font-semibold">&ldquo;bunching&rdquo;</span>: pre-funding several years of assets in a high-income year to crest standard deduction thresholds.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-serif text-xl mb-4 text-[#1D8A70] dark:text-[#3CBF9C]">Qualified Charitable Distributions (QCDs)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">Precision defense for MAGI management (Age 70½+).</p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Direct, untaxed transfer from an IRA to a 501(c)(3) operating charity.</li>
                <li>Uniquely satisfies Required Minimum Distributions (RMDs) without recognizing taxable income.</li>
                <li>Artificially suppresses AGI/MAGI, directly defending against IRMAA cliffs and Social Security taxation.</li>
                <li><span className="font-mono text-[#BC4128] dark:text-[#E2694A]">Strict Rule:</span> Cannot be executed into a DAF.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
