'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

interface GlossaryEntry {
  term: string;
  definition: string;
}

const GLOSSARY: Record<string, GlossaryEntry> = {
  ROA: {
    term: 'Return on Assets (ROA)',
    definition:
      'Pre-tax portfolio profit normalized by average outstanding credit card balances. General-purpose card portfolios average ~6.0% pre-tax ROA versus 1.5% across the broader commercial banking sector.',
  },
  NCM: {
    term: 'Net Credit Margin (NCM)',
    definition:
      'Operational margin measuring the return on revolving credit balances after funding costs and credit losses; accounts for roughly 80% (65%–92%) of total credit card issuer profitability.',
  },
  NTM: {
    term: 'Net Transaction Margin (NTM)',
    definition:
      'Operational margin measuring the return on purchase volume (interchange revenue minus rewards and processing expenses). Isolated transactor NTM compressed from +0.6% in 2014 to below -0.6% by 2019.',
  },
  Transactors: {
    term: 'Transactors (Convenience Users)',
    definition:
      'Cardholders who pay their statement balance in full every billing cycle, incurring zero interest charges and posing zero default risk during the month while generating 38%–40% of purchase volume.',
  },
  LightRevolvers: {
    term: 'Light Revolvers',
    definition:
      'Cardholders who carry balances episodically or pay down debt rapidly, accounting for 35%–39% of purchase volume and roughly 22% of total revolving balances.',
  },
  HeavyRevolvers: {
    term: 'Heavy Revolvers',
    definition:
      'Cardholders who persistently carry debt month to month; they generate under 10%–25% of purchase volume but hold 78% of revolving balances and pay over 70% of all interest revenue.',
  },
  Interchange: {
    term: 'Interchange Reimbursement Fee',
    definition:
      'A tiered fee (1.15% to 3.15% + flat fee) paid by the merchant’s acquiring bank to the cardholder’s issuing bank whenever a consumer taps or swipes a credit card.',
  },
  LGD: {
    term: 'Loss Given Default (LGD)',
    definition:
      'The fraction of Exposure at Default (EAD) lost after accounting for discounted post-charge-off recoveries and collection costs. Unsecured credit cards average ~90% LGD (5.0% gross charge-off with 0.5% recovery).',
  },
  ChargeOffBeta: {
    term: 'Charge-Off Beta (β_CO)',
    definition:
      'Sensitivity of a credit card portfolio’s ROA to quarterly changes in the aggregate industry charge-off rate, priced at a market risk premium of λ_CO = 4.3% per year.',
  },
  ElasticNet: {
    term: 'Elastic-Net Penalty',
    definition:
      'Regularization penalty P_α(β) combining L1 (Lasso feature selection) and L2 (Ridge shrinkage) norms to estimate default probability across thousands of collinear cash-flow and bureau variables.',
  },
  DPD: {
    term: 'Days Past Due (DPD)',
    definition:
      'Discrete monthly delinquency buckets (0, 30, 60, 90, 120, 150, and 180 DPD) used to classify accounts in Markov Chain roll-rate transition matrices.',
  },
  FundamentalMatrix: {
    term: 'Fundamental Matrix (N)',
    definition:
      'Defined as N = (I_n - Q)^(-1), where Q is the transient transition submatrix; each entry n_ij gives the expected number of billing cycles an account starting in bucket i spends in bucket j before absorption.',
  },
  LossExpectancyRate: {
    term: 'Loss Expectancy Rate',
    definition:
      'The second column of the absorption probability matrix M = N · R, representing the exact lifetime probability that a dollar in a given delinquency bucket will become uncollectible bad debt.',
  },
  ECL: {
    term: 'Expected Credit Loss (ECL)',
    definition:
      'Under IFRS 9 and CECL accounting standards, the probability-weighted lifetime credit loss discounted at the loan’s effective interest rate k_i over expected behavioral life M_i.',
  },
  HazardFunction: {
    term: 'Hazard (Intensity) Function λ_i(τ)',
    definition:
      'The instantaneous conditional default rate at time τ given survival up to time τ, defined as f_i(τ) / S_i(τ).',
  },
  QRRE: {
    term: 'Qualifying Revolving Retail Exposures (QRRE)',
    definition:
      'Basel II/III regulatory classification for unsecured revolving consumer credit cards, granted a fixed, ultra-low statutory asset correlation of R = 0.04 (4.0%) and no maturity adjustment.',
  },
  UnexpectedLoss: {
    term: 'Unexpected Loss (UL)',
    definition:
      'The excess portfolio credit loss occurring in a 99.9th percentile macroeconomic downturn (a 1-in-1,000 bad year) above Expected Loss; regulatory equity capital (K) is held strictly against UL.',
  },
  BellmanEquation: {
    term: 'Bellman Optimality Equation',
    definition:
      'Recursive stochastic dynamic programming equation used by issuers to optimize credit limits (L) over an m-period horizon to maximize discounted Customer Lifetime Value (CLV).',
  },
  Breakage: {
    term: 'Breakage Rate (β_break)',
    definition:
      'Under ASC 606 loyalty accounting, the actuarial fraction of earned points expected never to be redeemed due to expiration, inactivity, account closure, or cardholder death.',
  },
  Stoozing: {
    term: 'Positive-Carry Treasury Arbitrage (Stoozing)',
    definition:
      'Routing routine spending onto a 0% promotional purchase APR card, paying only the minimum monthly installment, and holding the payoff cash in risk-free Treasury bills until the promo window expires.',
  },
  DeferredInterest: {
    term: 'Deferred Interest Promotion',
    definition:
      'A private-label contract clause where failing to pay the balance down to $0.00 by the expiration date (or missing one minimum payment) triggers retroactive ~31.3% interest on the entire original purchase amount back to day one.',
  },
  NumerosityEffect: {
    term: 'Numerosity Effect',
    definition:
      'Cognitive distortion documented in the Journal of Retailing whereby breaking a $100 purchase into ten $10 installments induces far less mental resistance than two $50 payments or a single $100 outflow.',
  },
  InvisibleEstate: {
    term: 'The Invisible Estate',
    definition:
      'Estate law term for loyalty points and miles upon a cardholder’s death; because points are conditional contractual benefits rather than personal property, wills cannot override corporate forfeiture or forced conversion rules.',
  },
};

function Term({
  id,
  children,
}: {
  id: keyof typeof GLOSSARY;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const entry = GLOSSARY[id];

  if (!entry) {
    return <span>{children}</span>;
  }

  return (
    <span className="relative inline-block">
      <span
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={`Definition of ${entry.term}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] font-medium focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm px-0.5 transition-colors"
      >
        {children}
      </span>
      {open && (
        <span
          role="tooltip"
          className="pairs-tooltip z-50 absolute left-0 bottom-full mb-2 w-72 sm:w-80 p-3 rounded-md shadow-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs leading-relaxed pointer-events-none"
        >
          <span className="block font-semibold text-[#A8672E] dark:text-[#D08F52] mb-1 font-sans">
            {entry.term}
          </span>
          <span className="block font-sans text-zinc-700 dark:text-zinc-300">
            {entry.definition}
          </span>
        </span>
      )}
    </span>
  );
}

function FormulaPanel({
  title,
  math,
  variables,
  workedExampleTitle,
  workedExampleItems,
}: {
  title: string;
  math: string[];
  variables?: { symbol: string; desc: string }[];
  workedExampleTitle?: string;
  workedExampleItems?: { label: string; value: string; tone?: 'pos' | 'neg' | 'neutral' }[];
}) {
  return (
    <div className="my-5 rounded-lg overflow-hidden border border-zinc-800 dark:border-zinc-800 bg-[#14171B] dark:bg-[#05070A] text-white shadow-md">
      <div className="px-4 py-2.5 border-b border-zinc-800 dark:border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider font-mono text-[#D08F52] dark:text-[#D08F52]">
          {title}
        </span>
        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
          Quantitative Specification
        </span>
      </div>
      <div className="p-4 sm:p-5 overflow-x-auto space-y-3">
        {math.map((eq, idx) => (
          <MathBlock key={idx} math={eq} className="text-white text-xs sm:text-sm" />
        ))}
        {variables && variables.length > 0 && (
          <div className="mt-4 pt-3 border-t border-zinc-800/90 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-mono tabular-nums text-zinc-300 dark:text-zinc-400">
            {variables.map((v, idx) => (
              <div key={idx} className="flex items-baseline gap-2">
                <span className="text-[#D08F52] dark:text-[#D08F52] shrink-0 font-semibold">
                  <InlineMath math={v.symbol} />:
                </span>
                <span className="font-sans text-zinc-300 dark:text-zinc-300 text-xs">
                  {v.desc}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {workedExampleItems && workedExampleItems.length > 0 && (
        <div className="px-4 py-3.5 bg-zinc-900/90 dark:bg-zinc-950 border-t border-zinc-800 dark:border-zinc-800/90">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-2.5">
            {workedExampleTitle || 'Worked Empirical Calibration & Output'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {workedExampleItems.map((item, i) => {
              const valueColor =
                item.tone === 'pos'
                  ? 'text-[#3CBF9C] dark:text-[#3CBF9C]'
                  : item.tone === 'neg'
                  ? 'text-[#E2694A] dark:text-[#E2694A]'
                  : 'text-white dark:text-zinc-100';
              return (
                <div
                  key={i}
                  className="p-2.5 rounded bg-[#14171B] dark:bg-[#0A0D12] border border-zinc-800 dark:border-zinc-800/80"
                >
                  <div className="text-[11px] font-sans text-zinc-400 dark:text-zinc-400">
                    {item.label}
                  </div>
                  <div className={`mt-0.5 font-mono tabular-nums text-xs sm:text-sm font-semibold ${valueColor}`}>
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const MARKOV_STATES = [
  {
    code: 'x_0',
    name: 'Current (0 DPD)',
    status: 'Transient — Active Transacting / Revolving in Good Standing',
    stayProb: '94.77%',
    cureProb: '94.77% (Remains Current)',
    rollForwardProb: '5.21% (to x_1: 30 DPD)',
    insight:
      'Baseline state where transactors harvest rewards and grace-period float with 0.0% interest.',
  },
  {
    code: 'x_1',
    name: 'Early Delinquency (30 DPD)',
    status: 'Transient — 1 Missed Cycle (Repayment Ratio h_t < 90%)',
    stayProb: '80.78% (Sitters / Partial)',
    cureProb: '9.42% (Returns to x_0)',
    rollForwardProb: '9.80% (to x_2: 60 DPD)',
    insight:
      'Curing probability is still meaningful at 9.42%, though forward roll to 60 DPD nearly doubles.',
  },
  {
    code: 'x_2',
    name: 'Moderate Delinquency (60 DPD)',
    status: 'Transient — Critical Intervention Threshold',
    stayProb: '82.41% (Sitters / Partial)',
    cureProb: '1.38% (Returns to x_0)',
    rollForwardProb: '16.21% (to x_3: 90 DPD)',
    insight:
      'Cure rate collapses from 9.42% to 1.38%. Issuers deploy automated collections and credit line freezes immediately upon crossing 60 DPD.',
  },
  {
    code: 'x_3',
    name: 'Severe Delinquency (90 DPD)',
    status: 'Transient — Basel II/III Default Classification Threshold',
    stayProb: '79.43% (Sitters / Partial)',
    cureProb: '0.64% (Returns to x_0)',
    rollForwardProb: '19.93% (to x_4: 120 DPD)',
    insight:
      'Cure probability falls below 1% (0.64%). Basel rules stipulate regulatory default classification at 90 DPD (3 consecutive missed payments).',
  },
  {
    code: 'x_4 – x_5',
    name: 'Late-Stage Cascade (120–150 DPD)',
    status: 'Transient — Pre-Write-Off Acceleration',
    stayProb: '75.04% (Sitters / Partial at x_5)',
    cureProb: '< 0.50% (Negligible Cure)',
    rollForwardProb: '24.96% (x_5 → x_6: 180 DPD)',
    insight:
      'Nearly one in four accounts in x_5 rolls forward into semi-absorbed 180 DPD pre-write-off status.',
  },
  {
    code: 'x_6 – x_7',
    name: 'Semi-Absorbed & Charge-Off (180 DPD)',
    status: 'Absorbing Default State (U.S. Regulatory Accounting Write-Off)',
    stayProb: '100.0% (Absorbed)',
    cureProb: '0.00% (Expected Receipts Drop to Zero)',
    rollForwardProb: 'Absorbed into Bad Debt Write-Off',
    insight:
      'Gross charge-off rate averages 5.0% with a 0.5% post-charge-off recovery rate, implying ~90% Loss Given Default (LGD).',
  },
];

export default function CreditCardEconomicsArticle() {
  const [selectedMarkovIndex, setSelectedMarkovIndex] = useState<number>(2);

  return (
    <ArticleFrame
      slug="credit-card-profitability-architecture"
      additionalDisclaimer="This research analyzes portfolio accounting identities, regulatory risk models, and consumer financial contracts for educational and analytical purposes. Past performance and regulatory metrics do not constitute individualized credit or investment advice."
    >
      <div className="max-w-5xl mx-auto space-y-12 text-zinc-900 dark:text-zinc-100 font-sans">
        {/* Executive Summary & Macro Telemetry */}
        <section className="space-y-6">
          {/* Compact Stat Row (4 Standout Figures) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                General-Purpose Pre-Tax ROA
              </div>
              <div className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C]">
                6.0%
              </div>
              <div className="mt-1 text-xs font-mono tabular-nums text-zinc-600 dark:text-zinc-400">
                vs. 1.5% banking sector (4.0x)
              </div>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                2024 U.S. Purchase Volume
              </div>
              <div className="mt-1 font-mono tabular-nums text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                $3.6T
              </div>
              <div className="mt-1 text-xs font-mono tabular-nums text-zinc-600 dark:text-zinc-400">
                Up from $3.2T in 2022 ($5.7T lines)
              </div>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                2024 Interest &amp; Fee Revenue
              </div>
              <div className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#BC4128] dark:text-[#E2694A]">
                $191.3B
              </div>
              <div className="mt-1 text-xs font-mono tabular-nums text-zinc-600 dark:text-zinc-400">
                $160B interest (+52.4%) + $31.3B fees
              </div>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                2024 Consumer Rewards Earned
              </div>
              <div className="mt-1 font-mono tabular-nums text-2xl font-bold text-[#A8672E] dark:text-[#D08F52]">
                $47.5B
              </div>
              <div className="mt-1 text-xs font-mono tabular-nums text-zinc-600 dark:text-zinc-400">
                $67.9B across top 6 issuers (2023 all lines)
              </div>
            </div>
          </div>

          {/* Key Takeaways Bulleted Card */}
          <div className="p-5 rounded-lg border border-[#A8672E]/30 dark:border-[#D08F52]/30 bg-amber-50/40 dark:bg-zinc-900/80">
            <h2 className="font-serif text-lg font-normal text-[#A8672E] dark:text-[#D08F52] mb-2.5">
              Executive Key Takeaways
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 list-disc pl-5">
              <li>
                <span className="font-semibold">Macro Scale &amp; Revenue Dominance:</span> Outstanding U.S. revolving balances surpassed{' '}
                <span className="font-mono tabular-nums">$1.2 trillion</span> across more than{' '}
                <span className="font-mono tabular-nums">$5.7 trillion</span> in committed credit lines in 2024; interest charges surged{' '}
                <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">52.4%</span> from{' '}
                <span className="font-mono tabular-nums">$105 billion</span> (2022) to{' '}
                <span className="font-mono tabular-nums">$160 billion</span> (2024), dwarfing the{' '}
                <span className="font-mono tabular-nums">$47.5 billion</span> paid in consumer rewards.
              </li>
              <li>
                <span className="font-semibold">Cross-Subsidization Engine:</span> On an asset-normalized basis, merchant{' '}
                <Term id="Interchange">interchange income</Term> (<span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">7.1%</span> of assets) fully funds rewards expenses (<span className="font-mono tabular-nums">4.8%</span> of assets) with a{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+2.3%</span> surplus, while the{' '}
                <span className="font-mono tabular-nums">11.8%</span> net interest spread paid by revolvers drives roughly{' '}
                <span className="font-mono tabular-nums">80%</span> of industry profitability.
              </li>
              <li>
                <span className="font-semibold">Quantitative Capital &amp; Risk Advantage:</span> Banks price systematic default risk at{' '}
                <span className="font-mono tabular-nums">λ_CO = 4.3%</span> per year while capturing{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">1.38%–1.59%</span> structural alpha and leveraging Basel IRB&apos;s fixed{' '}
                <span className="font-mono tabular-nums">R = 0.04</span> asset correlation for{' '}
                <Term id="QRRE">Qualifying Revolving Retail Exposures</Term> into{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">30%–40%+</span> Return on Allocated Equity (ROE).
              </li>
              <li>
                <span className="font-semibold">Zero Middle Ground for Consumers:</span> Cash users (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-$50/yr</span>) and revolving households (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-$511/yr</span>) subsidize disciplined convenience transactors (<span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+$833/yr</span> net subsidy), provided transactors keep behavioral willingness-to-pay inflation below{' '}
                <span className="font-mono tabular-nums">π_wtp &lt; γ_rew / (1 - γ_rew)</span>.
              </li>
            </ul>
          </div>

          {/* Dichotomy Card: The Credit Card's Two Distinct Financial Instruments */}
          <div>
            <h2 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100 mb-3">
              Structural Dichotomy: Resolving the Rewards-Profitability Paradox
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                  Instrument A · The Transaction Function
                </div>
                <h3 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Unsecured, High-Velocity Payment Network
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    Processes <span className="font-mono tabular-nums">$3.6 trillion</span> in annual U.S. consumer purchase volume (up from <span className="font-mono tabular-nums">$3.2 trillion</span> in 2022).
                  </li>
                  <li>
                    Extracts tiered merchant interchange fees (<span className="font-mono tabular-nums">1.15%</span> to <span className="font-mono tabular-nums">3.15%</span> per swipe) and co-brand loyalty currency spread.
                  </li>
                  <li>
                    Rapid monthly repayments by transactors boost asset velocity: banks capture full interchange immediately without funding receivables long-term.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A] mb-1">
                  Instrument B · The Credit Function
                </div>
                <h3 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Pre-Approved, Variable-Rate Revolving Credit Line
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    Spans over <span className="font-mono tabular-nums">$1.2 trillion</span> in revolving debt across <span className="font-mono tabular-nums">$5.7 trillion</span> in committed credit lines.
                  </li>
                  <li>
                    Assesses <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">$160 billion</span> in annual interest charges (<span className="font-mono tabular-nums">25.2%</span> average general-purpose APR; <span className="font-mono tabular-nums">27.5%</span> on new accounts).
                  </li>
                  <li>
                    Generates an additional <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">$31.3 billion</span> in direct account fees (late, annual, balance transfer, and FX fees).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The Dual-Engine Profit Model & Cross-Subsidization */}
        <section className="space-y-8">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              The Dual-Engine Profit Model and Cross-Subsidization
            </h2>
          </div>

          {/* NCM vs NTM Two-Column Dichotomy Card */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Net Credit Margin vs. Net Transaction Margin
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Federal Reserve quantitative analysis decomposes issuer profitability into two operational margins driven by three self-selected borrower cohorts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-[#A8672E] dark:text-[#D08F52]">
                    Revolving Balance Engine
                  </span>
                  <span className="font-mono tabular-nums text-xs font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                    ~80% of Total Profit (65%–92% of ROA)
                  </span>
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  <Term id="NCM">Net Credit Margin (NCM)</Term> &amp; Fee Engine
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    Measures net return on revolving balances after funding cost and charge-offs.
                  </li>
                  <li>
                    Driven by an <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">11.8%</span> annualized net interest spread (<span className="font-mono tabular-nums">Interest Income - FFR</span>).
                  </li>
                  <li>
                    Late fees and usage charges contribute the remaining <span className="font-mono tabular-nums">16% to 20%</span> of industry profitability.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-[#A8672E] dark:text-[#D08F52]">
                    Purchase Volume Engine
                  </span>
                  <span className="font-mono tabular-nums text-xs font-semibold text-[#BC4128] dark:text-[#E2694A]">
                    -20% to +12% of Total ROA
                  </span>
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  <Term id="NTM">Net Transaction Margin (NTM)</Term>
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    Isolated NTM on purchase volume fell from <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+0.6%</span> (2014) to below <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-0.6%</span> (2019) as quarterly rewards expenses rose <span className="font-mono tabular-nums">25%</span> (from <span className="font-mono tabular-nums">3.5%</span> in 2015 to <span className="font-mono tabular-nums">4.4%</span> in 2020).
                  </li>
                  <li>
                    <span className="font-semibold">Balance-Sheet Reality:</span> Normalized by total card assets, interchange averages <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">7.1%</span> while rewards average <span className="font-mono tabular-nums">4.8%</span>, leaving a <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+2.3%</span> asset-normalized surplus.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Three Behavioral Cohorts Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono text-[#1D8A70] dark:text-[#3CBF9C] uppercase">
                Cohort 1 · Zero Interest
              </div>
              <div className="font-serif text-base text-zinc-900 dark:text-zinc-100 mt-0.5 mb-2">
                <Term id="Transactors">Transactors (Convenience Users)</Term>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                <li>
                  Pay statement balance in full monthly; incur <span className="font-mono tabular-nums">0%</span> interest and pose <span className="font-mono tabular-nums">0%</span> monthly default risk.
                </li>
                <li>
                  Represent <span className="font-mono tabular-nums">~85%</span> prime or super-prime borrowers.
                </li>
                <li>
                  Generate <span className="font-mono tabular-nums font-semibold">38%–40%</span> of purchase volume but hold minimal balance-weighted asset share due to monthly turnover.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] uppercase">
                Cohort 2 · Episodic Debt
              </div>
              <div className="font-serif text-base text-zinc-900 dark:text-zinc-100 mt-0.5 mb-2">
                <Term id="LightRevolvers">Light Revolvers</Term>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                <li>
                  Carry balances episodically or pay down debt rapidly over short horizons.
                </li>
                <li>
                  Account for <span className="font-mono tabular-nums font-semibold">35%–39%</span> of total purchase volume.
                </li>
                <li>
                  Hold approximately <span className="font-mono tabular-nums font-semibold">22%</span> of total outstanding revolving balances.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono text-[#BC4128] dark:text-[#E2694A] uppercase">
                Cohort 3 · Primary Profit Driver
              </div>
              <div className="font-serif text-base text-zinc-900 dark:text-zinc-100 mt-0.5 mb-2">
                <Term id="HeavyRevolvers">Heavy Revolvers</Term>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                <li>
                  Persistently carry debt month-to-month; generate only <span className="font-mono tabular-nums">10%–25%</span> of purchase volume.
                </li>
                <li>
                  Hold <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">78%</span> of revolving balances and pay <span className="font-mono tabular-nums">&gt;$60/month</span> in average interest charges.
                </li>
                <li>
                  Generate <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">&gt;70%</span> of all interest revenue collected by issuing banks.
                </li>
              </ul>
            </div>
          </div>

          {/* Portfolio Metrics and Balance-Sheet Parameters */}
          <div className="space-y-2">
            <h3 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100">
              Portfolio Metrics and Balance-Sheet Parameters
            </h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200">
                    <th className="py-3 px-4 font-semibold">Portfolio Metric / Parameter</th>
                    <th className="py-3 px-4 font-semibold">General Purpose / Bank Portfolio</th>
                    <th className="py-3 px-4 font-semibold">Private Label / Subprime</th>
                    <th className="py-3 px-4 font-semibold">Economic &amp; Balance-Sheet Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Return on Assets (ROA)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">6.0% avg (2.66% zero-beta rate)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums">2.0% avg on private label</td>
                    <td className="py-2.5 px-4">Generates <span className="font-mono tabular-nums">1.38%–1.59%</span> structural alpha over banking sector <span className="font-mono tabular-nums">1.5%</span> ROA</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Average APR (2024)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">25.2% (27.5% on new accounts)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">31.3% avg; 30–40% subprime cost</td>
                    <td className="py-2.5 px-4">Priced at Prime Rate (<span className="font-mono tabular-nums">FFR + 3%</span>) plus <span className="font-mono tabular-nums">15.4%</span> average issuer margin</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Net Interest Spread (% Assets)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">11.8% annualized (Int. - FFR)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums">Scales w/ FICO risk premium (6.5–9.0%)</td>
                    <td className="py-2.5 px-4">Primary driver of NCM, accounting for <span className="font-mono tabular-nums">~80%</span> of profit</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Interchange Income (% Assets)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">7.1% annualized (1.4%–3.15%/swipe)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums">N/A on closed-loop store cards</td>
                    <td className="py-2.5 px-4">Covers rewards expense (<span className="font-mono tabular-nums">4.8%</span> of assets) plus transaction processing</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Rewards Expense (% Assets)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums">4.8% annualized (4.4% purchase vol.)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums">Minimal on subprime / basic tiers</td>
                    <td className="py-2.5 px-4">Customer acquisition &amp; retention subsidy for high-volume transactors</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Gross Charge-Off &amp; Recovery</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">5.0% Charge-Off / 0.5% Recovery</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">3.0% GP vs 3.8% PL delinquency</td>
                    <td className="py-2.5 px-4">Implies <span className="font-mono tabular-nums">~90%</span> <Term id="LGD">LGD</Term>, absorbed by wide APR spreads</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tiered Interchange Architecture */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Tiered Interchange Architecture and Co-Brand Monetization
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                <span className="font-semibold">Identical Rail, Steeply Tiered Pricing:</span> Payment networks (Visa, Mastercard, American Express) charge merchants substantially higher <Term id="Interchange">interchange reimbursement fees</Term> when a consumer presents a premium rewards card (Visa Signature / Infinite) than a basic card, even though the underlying settlement rail is identical.
              </li>
              <li>
                <span className="font-semibold">Wholesale Co-Brand Arbitrage:</span> Issuers buy airline miles and hotel points at wholesale rates (fractions of a cent per point) to distribute as sign-up bonuses and multipliers, while airlines fulfill redemptions using distressed or marginal seat inventory with minimal marginal cost (fuel, catering, taxes).
              </li>
              <li>
                <span className="font-semibold">2025–2026 Co-Brand Valuations:</span> Delta Air Lines received <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">$6.9 billion</span> from American Express across a nine-month reporting period—and <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">$2.4 billion</span> in the June 2026 quarter alone (<span className="font-mono tabular-nums">+16%</span> YoY)—while <span className="font-mono tabular-nums">12%</span> of all Delta revenue passenger miles in 2025 were redeemed via SkyMiles.
              </li>
              <li>
                <span className="font-semibold">Standalone Loyalty Balance Sheets:</span> By 2026, the combined standalone valuation of Delta SkyMiles (<span className="font-mono tabular-nums">$31.7 billion</span>), American AAdvantage, and United MileagePlus reached <span className="font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">$83.7 billion</span>, while Marriott Bonvoy carried nearly <span className="font-mono tabular-nums">$8 billion</span> in deferred loyalty revenue at year-end 2025.
              </li>
            </ul>

            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200">
                    <th className="py-3 px-4 font-semibold">Merchant Category / Settlement Channel</th>
                    <th className="py-3 px-4 font-semibold">Visa Traditional (Basic)</th>
                    <th className="py-3 px-4 font-semibold">Visa Signature (Mass Rewards)</th>
                    <th className="py-3 px-4 font-semibold">Visa Infinite (Ultra-Premium)</th>
                    <th className="py-3 px-4 font-semibold">Non-Qualified / Downgrade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono tabular-nums text-xs text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">Retail Credit (In-Person / Tier I)</td>
                    <td className="py-2.5 px-4">1.43% + $0.10</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">2.00%–2.30% + flat fee</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">2.30%–2.65% + $0.10</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">3.15% + $0.10</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">Travel (Card-Present)</td>
                    <td className="py-2.5 px-4">1.53% + $0.05 (Base)</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">1.95% + $0.10</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">2.55% + $0.10</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">3.15% + $0.10</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">Services (General / Tokenized)</td>
                    <td className="py-2.5 px-4">1.42%–1.52% + $0.10</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">1.80%–1.95% + $0.10–$0.15</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">2.30%–2.42% + $0.10–$0.15</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">2.40% + $0.10</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">Healthcare (Standard / Tokenized)</td>
                    <td className="py-2.5 px-4">1.42%–1.52% + $0.10</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">2.28%–2.40% + $0.10–$0.15</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">2.29%–2.40% + $0.10–$0.15</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">2.38%–2.40% + $0.15</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">Education &amp; Real Estate</td>
                    <td className="py-2.5 px-4">1.42%–1.52% + $0.10</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">2.13%–2.25% + $0.10–$0.15</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">2.14%–2.25% + $0.10–$0.15</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">2.23%–2.25% + $0.15</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">Supermarket Credit (Tier 0 / Other)</td>
                    <td className="py-2.5 px-4">1.15% + $0.25 (Capped)</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">1.65%–2.00% + $0.05–$0.07</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">1.65%–2.00% + $0.05–$0.07</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">3.15% + $0.10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Regressive Wealth Transfers and Regulatory Pressure */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Regressive Wealth Transfers and Regulatory Pressure
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Uniform retail pricing embeds blended <span className="font-mono tabular-nums">2% to 3%</span> card processing costs into goods paid by all shoppers, creating an implicit <span className="font-mono tabular-nums">$8 billion</span> annual monetary transfer from cash payers to credit card users (Federal Reserve Bank of Boston model by Schuh, Shy, and Stavins).
            </p>

            {/* Two-Column Dichotomy Card: Regressive Reverse Robin Hood Tax */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase text-[#BC4128] dark:text-[#E2694A] mb-1">
                  Net Payers · Subsidizing Cohorts
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Cash Users, Low-Income &amp; Revolving Households
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    <span className="font-semibold">Cash-Using Households:</span> Pay an implicit tax of <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">-$50/year</span> into the retail pricing pool.
                  </li>
                  <li>
                    <span className="font-semibold">Low-Income Households (&le;$20,000/yr):</span> Pay a net transfer of <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">-$63/year</span>.
                  </li>
                  <li>
                    <span className="font-semibold">Revolving Debt Households:</span> Pay a net transfer of <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">-$511/year</span> within the cardholder pool.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                  Net Recipients · Subsidized Cohorts
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Card Users, High-Income &amp; Convenience Transactors
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    <span className="font-semibold">Average Card-Using Household:</span> Extracts a net subsidy of <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">+$240/year</span>.
                  </li>
                  <li>
                    <span className="font-semibold">High-Income Households (&ge;$150,000/yr):</span> Spend nearly <span className="font-mono tabular-nums">5x</span> more on cards, are <span className="font-mono tabular-nums">20 percentage points</span> more likely to earn rewards, and capture a net windfall of <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">+$823/year</span>.
                  </li>
                  <li>
                    <span className="font-semibold">Convenience Transactors:</span> Extract a net subsidy of <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">+$833/year</span>.
                  </li>
                </ul>
              </div>
            </div>

            {/* Merchant Lift vs Legislative Intervention Dichotomy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase text-[#A8672E] dark:text-[#D08F52] mb-1">
                  Network Routing Mandate (2026)
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Credit Card Competition Act (S. 3623 / H.R. 7035)
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    Sponsored by Sens. Durbin &amp; Marshall (endorsed by President Trump in 2026); requires banks over <span className="font-mono tabular-nums">$100B</span> in assets to enable at least two unaffiliated networks per card (one outside Visa/Mastercard).
                  </li>
                  <li>
                    Proponents project <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">&gt;$17 billion</span> in annual merchant fee savings; payment researchers counter that a <span className="font-mono tabular-nums">20%</span> retail gross margin on <span className="font-mono tabular-nums">3.5%</span> incremental card sales (<span className="font-mono tabular-nums">0.20 × 3.5% = 0.7%</span> of sales) already offsets card acceptance costs.
                  </li>
                  <li>
                    <span className="font-semibold">Durbin Amendment Precedent (2010):</span> Compressing credit interchange toward a <span className="font-mono tabular-nums">1.25%</span> cap would cut reward funding by <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">40%–50%</span> (compressing <span className="font-mono tabular-nums">2%</span> cash back to <span className="font-mono tabular-nums">1.0%–1.25%</span>). After the 2010 debit cap, <span className="font-mono tabular-nums">77%</span> of merchants left prices unchanged, <span className="font-mono tabular-nums">22%</span> raised prices, and only <span className="font-mono tabular-nums">1.2%</span> lowered prices, while lost free checking cost consumers <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">$22B–$25B</span>.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase text-[#A8672E] dark:text-[#D08F52] mb-1">
                  Penalty Fee Regulation (2024–2026)
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  CFPB $8 Late Fee Cap &amp; Issuer ROA Re-Pricing
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    In 2024, the CFPB promulgated a rule capping credit card late fees at <span className="font-mono tabular-nums">$8</span>, directly targeting the <span className="font-mono tabular-nums">16%–20%</span> fee share of portfolio profitability.
                  </li>
                  <li>
                    Banking trade associations obtained a preliminary injunction in the U.S. District Court for the Northern District of Texas.
                  </li>
                  <li>
                    Issuers immediately initiated mitigation strategies—including higher purchase APRs (<span className="font-mono tabular-nums">27.5%</span> on new accounts) and stricter credit line management—to preserve their <span className="font-mono tabular-nums">6.0%</span> target portfolio ROA.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Infographic Slot placed inline mid-article */}
        <InfographicSlot
          alt="The Quantitative Architecture of Credit Card Profitability"
          label="Featured Infographic"
        />

        {/* Section 2: Quantitative Finance Mathematics */}
        <section className="space-y-10">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              Quantitative Finance Mathematics of Credit Card Portfolios
            </h2>
          </div>

          {/* 1. Portfolio Return Decomposition and Charge-Off Beta Pricing */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Portfolio Return Decomposition and Charge-Off Beta Pricing
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                Pre-tax <Term id="ROA">Return on Assets</Term> (<InlineMath math="\text{ROA}_{i,t}" />), normalized by average outstanding balances <InlineMath math="A_{i,t}" />, decomposes into Net Interest Margin, Asset-Normalized Net Transaction Margin, Fee Income, Net Credit Loss Rate, and Operating Expenses.
              </li>
              <li>
                Because revolvers carry vastly larger balances than transactors, the balance-weighted share of borrowers (<InlineMath math="\omega_{\text{rev},i,t}" />) sits near <span className="font-mono tabular-nums">100%</span> for the lowest FICO scores and remains roughly <span className="font-mono tabular-nums">90%</span> even up to a <span className="font-mono tabular-nums">750</span> FICO score.
              </li>
              <li>
                Why doesn&apos;t competition arbitrage away the <span className="font-mono tabular-nums">11.8%</span> interest spread given a <span className="font-mono tabular-nums">4.5%</span> net charge-off rate (<span className="font-mono tabular-nums">5.0%</span> gross charge-off minus <span className="font-mono tabular-nums">0.5%</span> recovery)? Federal Reserve Bank of New York research shows credit card APRs price in a substantial systematic default risk premium (<Term id="ChargeOffBeta">Charge-Off Beta</Term>) because defaults spike during macroeconomic contractions when bank capital is scarcest.
              </li>
            </ul>

            <FormulaPanel
              title="Portfolio ROA Accounting Identity & Single-Factor Charge-Off Beta Model"
              math={[
                '\\begin{aligned} \\text{ROA}_{i,t} &= \\left[ r_{\\text{int},i,t} \\cdot \\omega_{\\text{rev},i,t} - r_{\\text{fund},t} \\right] && \\text{(Net Interest Margin)} \\\\[4pt] &\\quad + \\left[ (\\gamma_{\\text{ic},i,t} - \\gamma_{\\text{rew},i,t}) \\cdot \\frac{V_{i,t}}{A_{i,t}} \\right] && \\text{(Asset-Normalized NTM)} \\\\[4pt] &\\quad + \\theta_{\\text{fee},i,t} - \\left[ \\text{CO}_{i,t} \\cdot (1 - R_{\\text{rec},i,t}) \\right] - c_{\\text{op},i,t} && \\text{(Fees } - \\text{ Net Credit Loss } - \\text{ OpEx)} \\end{aligned}',
                '\\mathbb{E}[\\text{ROA}_i] = r_0 + \\beta_i^{\\text{CO}} \\cdot \\lambda_{\\text{CO}}, \\quad \\text{where } \\beta_i^{\\text{CO}} = \\frac{\\text{Cov}(\\text{ROA}_{i,t}, \\Delta \\text{CO}_{\\text{agg},t})}{\\text{Var}(\\Delta \\text{CO}_{\\text{agg},t})}',
              ]}
              variables={[
                { symbol: 'r_{\\text{int},i,t}', desc: 'Effective annualized yield on revolving balances' },
                { symbol: '\\omega_{\\text{rev},i,t}', desc: 'Balance-weighted share of revolving borrowers (~90% at 750 FICO; ~100% at lowest FICO)' },
                { symbol: 'r_{\\text{fund},t}', desc: 'Bank cost of funds (proxied by Federal Funds Rate)' },
                { symbol: '\\gamma_{\\text{ic}}, \\gamma_{\\text{rew}}', desc: 'Interchange and reward rates as fraction of purchase volume V_i,t' },
                { symbol: '\\text{CO}_{i,t}, R_{\\text{rec}}', desc: 'Gross charge-off rate (5.0%) and defaulted debt recovery rate (0.5%)' },
                { symbol: '\\Delta \\text{CO}_{\\text{agg},t}', desc: 'Quarterly change in aggregate industry charge-off rate (systematic factor)' },
              ]}
              workedExampleTitle="Federal Reserve Bank of New York Empirical Factor Calibration"
              workedExampleItems={[
                { label: 'Zero-Beta Return (r_0)', value: '2.66% / yr', tone: 'pos' },
                { label: 'Market Price of Charge-Off Beta (λ_CO)', value: '4.30% / yr', tone: 'neutral' },
                { label: 'Structural Alpha vs. Banking Sector (1.5% ROA)', value: 'α ∈ [1.38%, 1.59%]', tone: 'pos' },
                { label: 'Super-Prime Cohort Risk Premium', value: '1.0% – 2.0%', tone: 'pos' },
                { label: 'Subprime (620 FICO) Risk Premium', value: '6.5% – 9.0% (Matches BB/B Bonds)', tone: 'neg' },
                { label: 'Spread Over CCC/C Corporate Bonds', value: '+300 bps Excess Premium', tone: 'pos' },
              ]}
            />
          </div>

          {/* 2. Origination Scorecards and Penalized Logistic Regression */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Origination Scorecards and Penalized Logistic Regression
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                At origination and monthly behavioral review, banks estimate conditional default probability <InlineMath math="p(x_i) = P(Y_i = 1 \mid x_i)" /> using FICO bureau attributes, utilization ratios, and real-time bank account cash-flow telemetry.
              </li>
              <li>
                Because alternative data pipelines introduce thousands of collinear variables, quantitative teams minimize the regularized negative log-likelihood using an <Term id="ElasticNet">Elastic-Net penalty</Term> that blends <InlineMath math="L_1" /> (Lasso feature selection) and <InlineMath math="L_2" /> (Ridge shrinkage) norms before affine-scaling <InlineMath math="p(x_i)" /> into a discrete credit score <InlineMath math="S_i" />.
              </li>
            </ul>

            <FormulaPanel
              title="Logistic Default Probability & Elastic-Net Regularized Log-Likelihood"
              math={[
                '\\ln \\left( \\frac{p(x_i)}{1 - p(x_i)} \\right) = \\beta_0 + x_i^T \\beta \\iff p(x_i) = \\frac{1}{1 + \\exp(-(\\beta_0 + x_i^T \\beta))}',
                '\\min_{\\beta_0, \\beta} \\left\\{ -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\ln p(x_i) + (1 - y_i) \\ln(1 - p(x_i)) \\right] + \\lambda P_\\alpha(\\beta) \\right\\}',
                'P_\\alpha(\\beta) = \\sum_{j=1}^p \\left[ \\frac{1}{2}(1 - \\alpha) \\beta_j^2 + \\alpha |\\beta_j| \\right], \\quad \\alpha \\in [0, 1]',
              ]}
              variables={[
                { symbol: 'x_i \\in \\mathbb{R}^p', desc: 'Borrower feature vector (FICO attributes, utilization, cash-flow telemetry)' },
                { symbol: 'p(x_i)', desc: 'Conditional probability of default mapped to [0, 1] unit interval' },
                { symbol: '\\alpha \\in [0, 1]', desc: 'Elastic-Net mixing hyperparameter between L1 (Lasso) and L2 (Ridge)' },
                { symbol: 'S_i', desc: 'Affine-scaled discrete credit/behavioral score governing APR & credit limit' },
              ]}
            />
          </div>

          {/* 3. Absorbing Markov Chains and Delinquency Roll-Rate Matrices */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Absorbing Markov Chains and Delinquency Roll-Rate Matrices
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                Each billing cycle <InlineMath math="t" />, accounts are classified into discrete delinquency states <InlineMath math="X_t \in \{x_0, x_1, \dots, x_6, x_7\}" /> based on <Term id="DPD">Days Past Due (DPD)</Term> or minimum-payment repayment ratios <InlineMath math="h_t = R_t / I_t" /> (delinquency advances if <InlineMath math="h_t < 90\%" />).
              </li>
              <li>
                Dynamic Markov implementations parameterize transition probabilities <InlineMath math="p_{jk}(t, i_r)" /> as a linear function of account seasoning age <InlineMath math="t" /> and the macroeconomic base rate <InlineMath math="i_r" />.
              </li>
              <li>
                Partitioning the transition matrix <InlineMath math="P" /> into transient states <InlineMath math="Q" /> and absorbing states <InlineMath math="R" /> (Paid-Off/Closed and Charged-Off Bad Debt) yields the closed-form <Term id="FundamentalMatrix">Fundamental Matrix</Term> <InlineMath math="N = (I_n - Q)^{-1}" /> and <Term id="LossExpectancyRate">Loss Expectancy Rate</Term> via <InlineMath math="M = N \\cdot R" />.
              </li>
            </ul>

            <FormulaPanel
              title="Dynamic Roll-Rate Parameterization & Absorbing Markov Chain Fundamental Matrix"
              math={[
                '\\hat{p}_{ij} = \\frac{n(i,j)}{n(i)} \\quad \\text{(Stationary Maximum Likelihood Estimator)}',
                'p_{jk}(t, i_r) = p_{jk}^0 + a_{jk} t + b_{jk} i_r \\quad \\text{s.t. } \\sum_k p_{jk}^0 = 1, \\; \\sum_k a_{jk} = 0, \\; \\sum_k b_{jk} = 0, \\; p_{jk}(t, i_r) \\ge 0',
                'P = \\begin{pmatrix} I_{2 \\times 2} & 0_{2 \\times n} \\\\[2pt] R_{n \\times 2} & Q_{n \\times n} \\end{pmatrix}, \\quad N = \\sum_{k=0}^\\infty Q^k = (I_n - Q)^{-1}, \\quad M = N \\cdot R',
                '\\begin{bmatrix} \\mathbb{E}[\\text{Total Collections}] & \\mathbb{E}[\\text{Total Bad Debt Write-Offs}] \\end{bmatrix} = B_t \\cdot (I_n - Q)^{-1} \\cdot R',
              ]}
              variables={[
                { symbol: 'Q_{n \\times n}', desc: 'Transient submatrix (diagonal = sitters, supradiagonal = forward-movers, col 1 = curers)' },
                { symbol: 'R_{n \\times 2}', desc: 'One-step transition probabilities from transient buckets to 2 absorbing states' },
                { symbol: 'N = (I_n - Q)^{-1}', desc: 'Fundamental Matrix: expected cycles spent in bucket j starting from bucket i' },
                { symbol: 'B_t', desc: 'Row vector of current dollar balances across delinquency age buckets at time t' },
              ]}
              workedExampleTitle="Calibrated Empirical Delinquency Cascade (Roll-Rate Convexity)"
              workedExampleItems={[
                { label: 'Current Account Retention (x_0 → x_0)', value: '94.77% Stay / 5.21% Roll to x_1', tone: 'pos' },
                { label: 'Cure Rate Collapse (Return to x_0)', value: '9.42% (x_1) → 1.38% (x_2) → 0.64% (x_3)', tone: 'neg' },
                { label: 'Forward-Roll Acceleration (Supradiagonal)', value: '9.80% → 16.21% → 19.93% → 24.96%', tone: 'neg' },
              ]}
            />

            {/* Interactive Delinquency State Inspector */}
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  Interactive Markov State Inspector (Click Bucket to Inspect Empirical Roll Rates)
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Critical Line Freeze Threshold: 60 DPD (x_2)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
                {MARKOV_STATES.map((st, idx) => {
                  const active = selectedMarkovIndex === idx;
                  return (
                    <button
                      key={st.code}
                      type="button"
                      onClick={() => setSelectedMarkovIndex(idx)}
                      className={`px-3 py-2 rounded text-left font-mono text-xs border transition-colors ${
                        active
                          ? 'border-[#A8672E] dark:border-[#D08F52] bg-amber-50/70 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                          : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-[#A8672E] dark:text-[#D08F52]">{st.code}</div>
                      <div className="font-sans text-[11px] truncate">{st.name}</div>
                    </button>
                  );
                })}
              </div>
              <div className="p-3.5 rounded bg-zinc-100/80 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400 block">Selected Bucket</span>
                  <span className="font-mono tabular-nums font-semibold text-zinc-900 dark:text-zinc-100">
                    {MARKOV_STATES[selectedMarkovIndex].code} · {MARKOV_STATES[selectedMarkovIndex].name}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400 block">Cure Probability (to x_0)</span>
                  <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                    {MARKOV_STATES[selectedMarkovIndex].cureProb}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400 block">Forward Roll (Supradiagonal)</span>
                  <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">
                    {MARKOV_STATES[selectedMarkovIndex].rollForwardProb}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400 block">Quantitative Risk Behavior</span>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {MARKOV_STATES[selectedMarkovIndex].insight}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Survival Analysis, Hazard Functions, and Lifetime Expected Credit Loss */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Survival Analysis, Hazard Functions, and Lifetime Expected Credit Loss
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                IFRS 9 and CECL accounting standards mandate provisioning for lifetime <Term id="ECL">Expected Credit Loss (ECL)</Term> discounted at the effective interest rate <InlineMath math="k_i" /> over expected behavioral life <InlineMath math="M_i" /> conditional on macroeconomic trajectories <InlineMath math="z_\tau" />.
              </li>
              <li>
                Continuous-time survival models specify time-to-default <InlineMath math="T_i" /> via the <Term id="HazardFunction">hazard function</Term> <InlineMath math="\lambda_i(\tau)" /> and a Cox Proportional Hazards specification <InlineMath math="h_i(t \mid x_i) = h_0(t) \exp(w^T x_i)" /> to extract unconditional marginal default probabilities <InlineMath math="\text{PD}_{i\tau}^m" />.
              </li>
            </ul>

            <FormulaPanel
              title="IFRS 9 / CECL Lifetime Expected Credit Loss & Cox Proportional Hazard Equations"
              math={[
                '\\text{ECL}_i = \\mathbb{E} \\left[ \\sum_{\\tau=1}^{M_i} \\text{PD}_{i\\tau}^m(z_\\tau) \\cdot \\text{LGD}_{i\\tau}(z_\\tau) \\cdot \\text{EAD}_{i\\tau}(z_\\tau) \\cdot (1 + k_i)^{-\\tau} \\;\\middle|\\; z_0 \\right]',
                '\\text{LGD} = 1 - R_{\\text{rec}} = \\frac{\\text{EAD} - \\text{PV}(\\text{Recovery}) + \\text{PV}(\\text{Collection Cost})}{\\text{EAD}}',
                '\\lambda_i(\\tau) = \\lim_{\\Delta \\tau \\to 0} \\frac{P(\\tau \\le T_i < \\tau + \\Delta \\tau \\mid T_i \\ge \\tau)}{\\Delta \\tau} = \\frac{f_i(\\tau)}{S_i(\\tau)} \\implies S_i(\\tau) = \\exp\\left( -\\int_0^\\tau \\lambda_i(u) \\, du \\right)',
                'h_i(t \\mid x_i) = h_0(t) \\exp(w^T x_i)',
                '\\text{PD}_{i\\tau}^c = \\frac{S_i(\\tau - 1) - S_i(\\tau)}{S_i(\\tau - 1)}, \\quad \\text{PD}_{i\\tau}^m = S_i(\\tau - 1) - S_i(\\tau) = S_i(\\tau - 1) \\cdot \\text{PD}_{i\\tau}^c',
              ]}
              variables={[
                { symbol: 'S_i(\\tau)', desc: 'Survival function P(T_i > τ) = 1 - F_i(τ) across multi-year horizon' },
                { symbol: 'h_0(t)', desc: 'Baseline portfolio hazard function scaled by borrower covariates exp(w^T x_i)' },
                { symbol: '\\text{PD}_{i\\tau}^c', desc: 'Conditional probability of default in period τ given survival through τ - 1' },
                { symbol: '\\text{PD}_{i\\tau}^m', desc: 'Unconditional marginal probability of default entering the lifetime ECL summation' },
              ]}
            />
          </div>

          {/* 5. Basel IRB Regulatory Capital and the Vasicek Asset-Correlation Advantage */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Basel IRB Regulatory Capital and the Vasicek Asset-Correlation Advantage
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                Because Expected Loss (<InlineMath math="\text{EL} = \text{PD} \cdot \text{LGD} \cdot \text{EAD}" />) is already priced into credit card APRs and loan-loss provisions, Basel II/III IRB regulatory capital (<InlineMath math="K" />) is held strictly against <Term id="UnexpectedLoss">Unexpected Loss (UL)</Term> at the <span className="font-mono tabular-nums">99.9th</span> percentile (<span className="font-mono tabular-nums">1-in-1,000</span> downturn shock).
              </li>
              <li>
                Econometric studies by Crook and Bellotti confirm credit card defaults are driven by idiosyncratic household shocks (job loss, divorce, medical bills) rather than synchronized corporate debt cycles, justifying the ultra-low statutory correlation <InlineMath math="R = 0.04" /> for <Term id="QRRE">Qualifying Revolving Retail Exposures (QRRE)</Term>.
              </li>
            </ul>

            {/* Dichotomy Card: Corporate Exposure vs QRRE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase text-[#BC4128] dark:text-[#E2694A] mb-1">
                  Corporate &amp; Mortgage Exposures
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  High Systematic Correlation &amp; Maturity Penalty
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    Corporate loans are assigned <span className="font-mono tabular-nums font-semibold">R ∈ [0.12, 0.24]</span> (<span className="font-mono tabular-nums">R = 0.1767</span> at <span className="font-mono tabular-nums">PD = 1.5%</span>) plus a punitive maturity adjustment (<span className="font-mono tabular-nums">1.223x</span> at <span className="font-mono tabular-nums">M = 2.5 yrs</span>); mortgages receive <span className="font-mono tabular-nums">R = 0.15</span>.
                  </li>
                  <li>
                    Correlation multiplier <span className="font-mono tabular-nums">√0.1767 = 0.4204</span> causes a <span className="font-mono tabular-nums">1.5%</span> normal PD cohort to spike <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">11.2x</span> to <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">16.85%</span> in a 99.9th percentile downturn.
                  </li>
                  <li>
                    Requires <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">93.86%</span> Risk-Weighted Asset density (<span className="font-mono tabular-nums">RWA / EAD</span>) despite a secured <span className="font-mono tabular-nums">40%</span> LGD.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                  Qualifying Revolving Retail (Credit Cards)
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Ultra-Low Statutory Correlation (R = 0.04) &amp; Zero Maturity Penalty
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    Fixed statutory asset correlation of <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">R = 0.04 (4.0%)</span> and <span className="font-semibold">no maturity adjustment</span>.
                  </li>
                  <li>
                    Small multiplier <span className="font-mono tabular-nums">√0.04 = 0.20</span> limits a <span className="font-mono tabular-nums">1.5%</span> normal PD cohort’s 99.9th percentile conditional default spike to just <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">5.69%</span> (<span className="font-mono tabular-nums">3.8x</span> normal PD).
                  </li>
                  <li>
                    Even with <span className="font-mono tabular-nums">90%</span> unsecured LGD, prime cards require only <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">47.14%</span> RWA density—allowing banks to lever a <span className="font-mono tabular-nums">6.0%</span> ROA into <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">30%–40%+ ROE</span>.
                  </li>
                </ul>
              </div>
            </div>

            <FormulaPanel
              title="Vasicek Gaussian Copula ASRF Model & Basel IRB QRRE Capital Formula"
              math={[
                'Y_i = \\sqrt{R} \\cdot S + \\sqrt{1 - R} \\cdot \\varepsilon_i, \\quad S \\sim \\mathcal{N}(0, 1), \\; \\varepsilon_i \\sim \\mathcal{N}(0, 1)',
                'K_{\\text{QRRE}} = \\text{LGD} \\cdot \\Phi\\left( \\frac{\\Phi^{-1}(\\text{PD}) + \\sqrt{0.04} \\cdot \\Phi^{-1}(0.999)}{\\sqrt{1 - 0.04}} \\right) - \\text{PD} \\cdot \\text{LGD}',
                '\\text{RWA} = 12.5 \\times K_{\\text{QRRE}} \\times \\text{EAD}, \\quad \\text{where } \\Phi^{-1}(0.999) = 3.0902',
              ]}
              variables={[
                { symbol: 'R = 0.04', desc: 'Statutory asset correlation for Qualifying Revolving Retail Exposures (QRRE)' },
                { symbol: '\\Phi(\\cdot), \\Phi^{-1}(\\cdot)', desc: 'Standard normal CDF and inverse CDF (99.9th percentile shock = 3.0902)' },
                { symbol: 'K_{\\text{QRRE}}', desc: 'Unexpected Loss (UL) regulatory capital requirement per dollar of EAD' },
                { symbol: '\\text{CET1}', desc: '4.5% of RWA + 2.5% capital conservation buffer, enabling 30%–40%+ ROE' },
              ]}
            />

            {/* Basel IRB Benchmark Table */}
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200">
                    <th className="py-3 px-3.5 font-semibold">Exposure Class (Basel IRB)</th>
                    <th className="py-3 px-3.5 font-semibold">Correlation (R)</th>
                    <th className="py-3 px-3.5 font-semibold">Normal PD &amp; LGD</th>
                    <th className="py-3 px-3.5 font-semibold">99.9th Pct Cond. PD</th>
                    <th className="py-3 px-3.5 font-semibold">Expected Loss (EL)</th>
                    <th className="py-3 px-3.5 font-semibold">UL Capital (K)</th>
                    <th className="py-3 px-3.5 font-semibold">RWA Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono tabular-nums text-xs text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="py-2.5 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">Corporate Exposure (M = 2.5 yrs)</td>
                    <td className="py-2.5 px-3.5">0.1767</td>
                    <td className="py-2.5 px-3.5">PD = 1.5%, LGD = 40%</td>
                    <td className="py-2.5 px-3.5 text-[#BC4128] dark:text-[#E2694A]">16.85% (11.2x)</td>
                    <td className="py-2.5 px-3.5">0.600%</td>
                    <td className="py-2.5 px-3.5">7.509% (1.223x M-adj)</td>
                    <td className="py-2.5 px-3.5 text-[#BC4128] dark:text-[#E2694A] font-semibold">93.86%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">QRRE (Prime Credit Card)</td>
                    <td className="py-2.5 px-3.5 text-[#1D8A70] dark:text-[#3CBF9C]">0.0400 (Fixed)</td>
                    <td className="py-2.5 px-3.5">PD = 1.5%, LGD = 90%</td>
                    <td className="py-2.5 px-3.5 text-[#1D8A70] dark:text-[#3CBF9C]">5.69% (3.8x)</td>
                    <td className="py-2.5 px-3.5">1.350% (In APR)</td>
                    <td className="py-2.5 px-3.5 text-[#1D8A70] dark:text-[#3CBF9C]">3.771% (No M-adj)</td>
                    <td className="py-2.5 px-3.5 text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">47.14%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">QRRE (Portfolio Average)</td>
                    <td className="py-2.5 px-3.5 text-[#1D8A70] dark:text-[#3CBF9C]">0.0400 (Fixed)</td>
                    <td className="py-2.5 px-3.5">PD = 5.0%, LGD = 90%</td>
                    <td className="py-2.5 px-3.5">14.44% (2.9x)</td>
                    <td className="py-2.5 px-3.5">4.500% (In APR)</td>
                    <td className="py-2.5 px-3.5">8.498% (No M-adj)</td>
                    <td className="py-2.5 px-3.5 font-semibold">106.23%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Stochastic Dynamic Programming for Credit Limit and CLV Optimization */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              Stochastic Dynamic Programming for Credit Limit and CLV Optimization
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                Banks dynamically adjust credit limits <InlineMath math="L" /> using a Markov Decision Process (MDP) over state triple <InlineMath math="u = (b, n, i)" />, where <InlineMath math="b" /> is balance (<InlineMath math="0 \le b \le L" />), <InlineMath math="n" /> is consecutive delinquent periods (<InlineMath math="0, \dots, N" />), and <InlineMath math="i" /> is behavioral/macro state.
              </li>
              <li>
                Solving the <Term id="BellmanEquation">Bellman Optimality Equation</Term> explains why issuers proactively initiate unsolicited credit line increases for light and moderate revolvers (documented by the CFPB in 2021–2024): raising <InlineMath math="L" /> shifts the purchase distribution <InlineMath math="q^L(u, o)" /> upward whenever discounted marginal interest revenue exceeds probability-weighted terminal write-off <InlineMath math="b \cdot \prod \text{Roll Rates}" />.
              </li>
            </ul>

            <FormulaPanel
              title="Markov Decision Process Transitions & Bellman CLV Optimality Equation"
              math={[
                'p^L\\big((b, n, i); (b + o - a, 0, i\')\\big) = t^L(u, a) \\cdot q^L(u, o) \\cdot w^L(u, i\') \\quad \\text{for } a > 0, \\; b + o - a \\le L',
                'p^L\\big((b, n, i); (b + o, n + 1, i\')\\big) = t^L(u, 0) \\cdot q^L(u, o) \\cdot w^L(u, i\') \\quad \\text{for } a = 0, \\; b + o \\le L',
                'r^L(b, n, i) = f \\sum_o o \\cdot q^L(u, o) - b \\cdot t^L(u, 0) \\cdot \\delta(n - (N - 1))',
                'V_m(u) = \\max_{L \\in \\mathcal{L}} \\left\\{ r^L(u) + \\frac{1}{1 + d} \\sum_{u\'} p^L(u, u\') V_{m-1}(u\') \\right\\}',
              ]}
              variables={[
                { symbol: 'q^L(u,o), t^L(u,a)', desc: 'Probability distributions of new purchases o and repayments a under limit L' },
                { symbol: 'f', desc: 'Net profit margin earned on purchases and revolving balances' },
                { symbol: '\\delta(n - (N - 1))', desc: 'Kronecker delta triggering full balance write-off b at terminal delinquency N' },
                { symbol: 'V_m(u)', desc: 'Maximum expected discounted Customer Lifetime Value (CLV) over m periods' },
              ]}
            />
          </div>

          {/* 7. ASC 606 Loyalty Liability and Breakage Mathematics */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
              ASC 606 Loyalty Liability and Breakage Mathematics
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                Under ASC 606 accounting standards, issuers defer a portion of transaction revenue as a balance-sheet loyalty liability and apply an actuarial <Term id="Breakage">breakage rate</Term> (<InlineMath math="\beta_{\text{break}}" />) representing points forfeited due to expiration, inactivity, closure, or death.
              </li>
              <li>
                Every basis point of breakage flows directly back into the bank&apos;s Net Transaction Margin as pure profit, with subprime cardholders forfeiting rewards at more than twice the overall market rate due to delinquency lockouts and account closures.
              </li>
            </ul>

            <FormulaPanel
              title="ASC 606 Actuarial Breakage & Effective Reward Cost Rate"
              math={[
                '\\gamma_{\\text{rew}}^{\\text{eff}} = m \\cdot c_{\\text{red}} \\cdot (1 - \\beta_{\\text{break}})',
              ]}
              variables={[
                { symbol: 'm', desc: 'Points earned per dollar of purchase volume V' },
                { symbol: 'c_{\\text{red}}', desc: 'Wholesale fulfillment cost per redeemed point' },
                { symbol: '\\beta_{\\text{break}} \\in (0, 1)', desc: 'Actuarial fraction of points expected to never be redeemed' },
              ]}
              workedExampleTitle="2024 U.S. Loyalty Issuance vs. Redemption & Breakage Telemetry"
              workedExampleItems={[
                { label: '2024 Rewards Earned', value: '$47.5 Billion', tone: 'neutral' },
                { label: '2024 Rewards Redeemed', value: '$43.0 Billion', tone: 'pos' },
                { label: 'Unredeemed / Carried Forward', value: '$4.5B (~9.5% of Issuance; >2x Subprime Forfeiture)', tone: 'neg' },
              ]}
            />
          </div>
        </section>

        {/* Section 3: Consumer Strategy */}
        <section className="space-y-10">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              Consumer Strategy: How to Exploit the Architecture and Avoid Structural Traps
            </h2>
          </div>

          {/* Part A: How to Systematically Take Advantage */}
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-normal text-[#1D8A70] dark:text-[#3CBF9C]">
              How to Systematically Take Advantage of the Credit Card System
            </h3>

            {/* Exploit 1: Transactor Status & Grace-Period Float */}
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100">
                Enforce Strict Transactor Status and Harvest the Grace-Period Float
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
                <li>
                  Never allow an account to transition out of Markov state <span className="font-mono tabular-nums">x_0</span> (Current Transactor): automated full-statement-balance payments lock in a <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">0.0%</span> effective APR while forcing the bank into a negative Net Transaction Margin (<span className="font-mono tabular-nums">NTM &lt; -0.6%</span>).
                </li>
                <li>
                  Beyond <span className="font-mono tabular-nums">2% to 5%</span> direct cash back or travel points, transactors receive an interest-free working capital loan from the purchase date until the payment due date (<span className="font-mono tabular-nums">21 to 55 days</span>, averaging <span className="font-mono tabular-nums">Δt ≈ 35 days</span>).
                </li>
              </ul>

              <FormulaPanel
                title="Grace-Period Liquidity Float Yield"
                math={[
                  '\\Delta y = r_{\\text{mm}} \\cdot \\left(\\frac{35}{365}\\right) \\implies \\text{Total Transactor Yield} = \\gamma_{\\text{rew}} + r_{\\text{mm}} \\cdot \\left(\\frac{35}{365}\\right)',
                ]}
                variables={[
                  { symbol: 'r_{\\text{mm}}', desc: 'High-yield money market or Treasury account annualized yield' },
                  { symbol: '\\Delta t \\approx 35 \\text{ days}', desc: 'Average interest-free grace-period float duration (21 to 55 days)' },
                ]}
                workedExampleTitle="Federal Reserve Convenience User Subsidy Benchmark"
                workedExampleItems={[
                  { label: 'Effective Borrowing APR', value: '0.00% (Markov State x_0)', tone: 'pos' },
                  { label: 'Issuer Isolated NTM on Account', value: '< -0.60% of Purchase Vol.', tone: 'pos' },
                  { label: 'Average Annual Convenience Subsidy', value: '+$833 / year per Household', tone: 'pos' },
                ]}
              />
            </div>

            {/* Exploit 2: 0% Promotional APR & Balance Transfer Arbitrage */}
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100">
                  Execute 0% Promotional APR and Balance Transfer Arbitrage
                </h4>
                <span className="text-xs font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">
                  2024 Scale: $899B Purchase Vol · $352B Year-End Balances (~1/3 of U.S. Market)
                </span>
              </div>

              {/* Dichotomy Card: Debt Refinancing Arbitrage vs Positive-Carry Treasury Arbitrage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="text-xs font-mono uppercase text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                    Mechanism 1 · Liability Compression
                  </div>
                  <div className="font-serif text-sm text-zinc-900 dark:text-zinc-100 mb-1.5">
                    Debt Refinancing Arbitrage
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                    <li>
                      Transfer existing high-cost balance <InlineMath math="B" /> from APR <InlineMath math="r_{\\text{old}}" /> to a <span className="font-mono tabular-nums">0%</span> promotional card for <InlineMath math="T" /> years at upfront balance transfer fee <InlineMath math="\\phi_{\\text{bt}}" />.
                    </li>
                    <li>
                      Eliminates compounding interest while converting cost to a small one-time fee (<span className="font-mono tabular-nums">~2.8%</span>).
                    </li>
                  </ul>
                </div>

                <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="text-xs font-mono uppercase text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                    Mechanism 2 · Asset Yield Carry
                  </div>
                  <div className="font-serif text-sm text-zinc-900 dark:text-zinc-100 mb-1.5">
                    <Term id="Stoozing">Positive-Carry Treasury Arbitrage (&ldquo;Stoozing&rdquo;)</Term>
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                    <li>
                      Open a no-annual-fee cash-back card with a <span className="font-mono tabular-nums">12-to-18-month 0%</span> purchase APR (<span className="font-mono tabular-nums">$0</span> upfront transaction fee) and pay only minimum monthly installments.
                    </li>
                    <li>
                      Park equivalent payoff cash in risk-free short-term Treasury bills yielding <InlineMath math="r_{\\text{rf}}" /> and liquidate shortly before promo expiration to pay in full.
                    </li>
                  </ul>
                </div>
              </div>

              <FormulaPanel
                title="Balance Transfer Refinancing Net Savings Equation"
                math={[
                  '\\text{Net Savings} \\approx B \\cdot ( r_{\\text{old}} \\cdot T - \\phi_{\\text{bt}} )',
                ]}
                variables={[
                  { symbol: 'B', desc: 'Revolving balance transferred ($5,000 in CFPB benchmark)' },
                  { symbol: 'r_{\\text{old}} \\cdot T', desc: 'Original card APR (25.0%) over promotional duration T (1 year)' },
                  { symbol: '\\phi_{\\text{bt}}', desc: 'Upfront balance transfer fee rate (2.8% = $140)' },
                ]}
                workedExampleTitle="CFPB Benchmark Balance Transfer Arbitrage Calculation ($5,000 Balance)"
                workedExampleItems={[
                  { label: 'Interest Eliminated (25.0% APR × 1 Yr)', value: '$1,250.00', tone: 'pos' },
                  { label: 'Upfront Transfer Fee (2.8% of $5,000)', value: '-$140.00', tone: 'neg' },
                  { label: 'Net Dollar Savings Captured', value: '+$1,110.00', tone: 'pos' },
                ]}
              />
            </div>

            {/* Exploit 3 & 4: Two-Column Card for Transferable Points & Statutory Chargebacks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                  Loyalty Currency Arbitrage
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Exploit Wholesale-to-Retail Point Spreads
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    Avoid redeeming flexible bank points (Visa Infinite / World Elite Mastercard) for statement credits at the baseline floor of <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">1.0 cent per point (cpp)</span>.
                  </li>
                  <li>
                    Execute <span className="font-mono tabular-nums">1:1</span> transfers to airline and hotel partners for international business/first-class cabins or peak hotel stays to capture retail values of <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">2.5 to 5.0+ cpp</span>.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="text-xs font-mono uppercase text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                  Legal &amp; Fulfillment Shield
                </div>
                <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                  Leverage Statutory Dispute &amp; Chargeback Rights
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                  <li>
                    In 2024, U.S. cardholders disputed <span className="font-mono tabular-nums">$9.8 billion</span> in credit card charges, successfully forcing <span className="font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">$5.9 billion</span> in chargebacks.
                  </li>
                  <li>
                    Fully <span className="font-mono tabular-nums font-semibold">40%</span> of all general-purpose disputes in 2024 involved cancelled recurring transactions (subscriptions, memberships, utilities) that merchants continued to bill.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Part B: What to Avoid */}
          <div className="space-y-5 pt-4">
            <h3 className="font-serif text-lg font-normal text-[#BC4128] dark:text-[#E2694A]">
              What to Avoid: Structural, Mathematical, and Behavioral Traps
            </h3>

            {/* Trap 1: Revolving Interest Asymmetry & Negative Amortization */}
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100">
                The Revolving Interest Asymmetry and Negative Amortization Trap
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
                <li>
                  Failing to pay the full statement balance forfeits the grace period and subjects balances to <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">25.2%</span> average general-purpose APRs (<span className="font-mono tabular-nums">27.5%</span> on new accounts, <span className="font-mono tabular-nums">31.3%</span> on private-label cards, and <span className="font-mono tabular-nums">30%–40%</span> effective rates for subprime borrowers).
                </li>
                <li>
                  <span className="font-semibold text-[#BC4128] dark:text-[#E2694A]">Record Minimum-Payment Distress (2024):</span> The share of cardholders making only the minimum monthly payment hit a post-2015 record high in 2024, and <span className="font-semibold">one in ten (10%) general-purpose accounts is charged more in annual interest and fees than the borrower pays toward principal</span> (persistent negative amortization).
                </li>
              </ul>

              <FormulaPanel
                title="Consumer Net Portfolio Yield Asymmetry"
                math={[
                  '\\text{Net Portfolio Yield to Consumer} = \\gamma_{\\text{rew}} \\cdot V - r_{\\text{APR}} \\cdot B_{\\text{rev}} - \\text{Fees}',
                ]}
                variables={[
                  { symbol: '\\gamma_{\\text{rew}} \\cdot V', desc: 'Rewards earned on annual purchase volume ($5,000 × 2.0% = $100)' },
                  { symbol: 'r_{\\text{APR}} \\cdot B_{\\text{rev}}', desc: 'Annual interest on revolved balance ($5,000 × 25.2% = $1,260)' },
                ]}
                workedExampleTitle="Worked Asymmetry Example ($5,000 Spend & Revolved Balance for 1 Year)"
                workedExampleItems={[
                  { label: '2.0% Cash-Back Rewards Earned', value: '+$100.00', tone: 'pos' },
                  { label: '25.2% Average APR Interest Assessed', value: '-$1,260.00', tone: 'neg' },
                  { label: 'Net Household Wealth Loss', value: '-$1,160.00 (-23.2% Net Yield)', tone: 'neg' },
                ]}
              />
            </div>

            {/* Trap 2: Dichotomy Card - True 0% APR vs Private-Label Deferred Interest */}
            <div className="space-y-2">
              <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100">
                Contractual Dichotomy: True 0% Promotional APR vs. Private-Label &ldquo;Deferred Interest&rdquo;
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <div className="text-xs font-mono uppercase text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                    Prime General-Purpose Contract
                  </div>
                  <div className="font-serif text-base text-zinc-900 dark:text-zinc-100 mb-2">
                    True 0% Promotional APR
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                    <li>
                      Interest rate is contractually <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">0.0%</span> during the promotional window.
                    </li>
                    <li>
                      If a borrower leaves <span className="font-mono tabular-nums">$50</span> unpaid when the promotion expires, interest begins accruing <span className="font-semibold">only on that remaining $50 going forward</span>.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <div className="text-xs font-mono uppercase text-[#BC4128] dark:text-[#E2694A] mb-1">
                    Private-Label Retail, Medical &amp; Furniture Cards
                  </div>
                  <div className="font-serif text-base text-zinc-900 dark:text-zinc-100 mb-2">
                    <Term id="DeferredInterest">Deferred Interest Promotion (~31.3% APR)</Term>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                    <li>
                      Interest is secretly accrued in the background at <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">~31.3%</span> average APR from the date of purchase.
                    </li>
                    <li>
                      Failing to pay the balance down to <span className="font-mono tabular-nums">$0.00</span> by the exact expiration date—or missing a single minimum payment—triggers <span className="font-semibold text-[#BC4128] dark:text-[#E2694A]">retroactive interest assessment on the entire original purchase amount</span> back to day one.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trap 3: Behavioral Willingness-to-Pay Inflation */}
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100">
                Behavioral Willingness-to-Pay Inflation (&ldquo;The Credit Card Premium&rdquo;)
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
                <li>
                  <span className="font-semibold">MIT Sports Ticket Auctions (Prelec &amp; Simester):</span> Consumers randomly assigned to bid via credit card offered <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">up to 100% more (twice as much)</span> for Boston Celtics and Red Sox tickets than cash bidders due to reduced mental accounting resistance.
                </li>
                <li>
                  <span className="font-semibold">Cue Conditioning &amp; Recall Error (Feinberg; Soman):</span> Merely displaying credit card logos in an experimental room boosted willingness-to-pay by <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">50% to 200%</span>; consumers asked to estimate their monthly credit card bill underestimated actual spending by <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">29% on average</span> versus a <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">7% error</span> for cash and checks.
                </li>
                <li>
                  <span className="font-semibold">Digital Wallets &amp; BNPL <Term id="NumerosityEffect">Numerosity Effect</Term>:</span> Integrating frictionless BNPL split payments increases average order value by <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">+40%</span>, checkout conversion by <span className="font-mono tabular-nums">+20%</span>, and purchase frequency by <span className="font-mono tabular-nums">+46%</span> because ten <span className="font-mono tabular-nums">$10</span> installments induce far less cognitive resistance than two <span className="font-mono tabular-nums">$50</span> payments or one <span className="font-mono tabular-nums">$100</span> outflow.
                </li>
              </ul>

              <FormulaPanel
                title="Real Consumption-Adjusted Wealth Preservation Condition"
                math={[
                  '\\pi_{\\text{wtp}} = \\frac{\\text{Spend}_{\\text{card}} - \\text{Spend}_{\\text{cash}}}{\\text{Spend}_{\\text{cash}}}',
                  '\\Delta W > 0 \\iff (1 - \\gamma_{\\text{rew}}) \\cdot (1 + \\pi_{\\text{wtp}}) < 1 \\iff \\pi_{\\text{wtp}} < \\frac{\\gamma_{\\text{rew}}}{1 - \\gamma_{\\text{rew}}}',
                ]}
                variables={[
                  { symbol: '\\pi_{\\text{wtp}}', desc: 'Fractional behavioral overspending induced by card frictionlessness vs. cash' },
                  { symbol: '\\gamma_{\\text{rew}}', desc: 'Credit card reward rate earned on purchase volume' },
                ]}
                workedExampleTitle="Behavioral Break-Even Threshold Calibration (Top-Tier 3.0% Reward Card)"
                workedExampleItems={[
                  { label: 'Card Reward Rate (γ_rew)', value: '3.00%', tone: 'pos' },
                  { label: 'Max Permissible Overspending (π_wtp)', value: '3.09% Break-Even Cap', tone: 'neutral' },
                  { label: 'Net Wealth Impact at 10.0% Overspend', value: '-6.70% Net Poorer ((0.97 × 1.10) - 1)', tone: 'neg' },
                ]}
              />
            </div>

            {/* Trap 4: Loyalty Breakage, Unilateral Devaluation, and Estate Forfeiture */}
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <h4 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100">
                Loyalty Breakage, Unilateral Devaluation, and Estate Forfeiture (<Term id="InvisibleEstate">&ldquo;The Invisible Estate&rdquo;</Term>)
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
                <li>
                  <span className="font-semibold">Conditional Contractual Benefits, Not Property:</span> Loyalty points are governed by corporate contract law and excluded from state unclaimed property statutes—a last will and testament cannot override program terms.
                </li>
                <li>
                  <span className="font-semibold">Central Bank Devaluation Risk:</span> Airlines and hotels act as central bankers who routinely raise award prices or shift to dynamic pricing to inflate away <span className="font-mono tabular-nums">$83.7 billion</span> in airline loyalty liabilities and <span className="font-mono tabular-nums">$8 billion</span> in Marriott Bonvoy deferred revenue.
                </li>
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="text-xs font-mono text-[#BC4128] dark:text-[#E2694A] font-semibold">
                    Southwest Airlines
                  </div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                    Strict Post-Mortem Erasure
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Stipulates Rapid Rewards points cannot pass through an estate, settlement, or will and are permanently erased upon account closure after death.
                  </p>
                </div>

                <div className="p-3 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] font-semibold">
                    United &amp; American Airlines
                  </div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                    Discretionary Executor Hurdles
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Treat post-mortem transfers as purely discretionary exceptions requiring executors to submit administrative filings, death certificates, and transfer fees.
                  </p>
                </div>

                <div className="p-3 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] font-semibold">
                    JPMorgan Chase
                  </div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                    Forced Baseline Cash Liquidation
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Automatically closes the account upon death notification and liquidates Ultimate Rewards into a statement credit at the <span className="font-mono tabular-nums">1.0 cpp</span> floor, destroying <span className="font-mono tabular-nums">2.5–5.0+ cpp</span> partner transfer value.
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Dimension Master Table */}
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200">
                    <th className="py-3 px-4 font-semibold">Strategic Dimension</th>
                    <th className="py-3 px-4 font-semibold">Bank Profit Mechanism</th>
                    <th className="py-3 px-4 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Optimal Consumer Arbitrage (&ldquo;Earn &amp; Burn&rdquo;)</th>
                    <th className="py-3 px-4 font-semibold text-[#BC4128] dark:text-[#E2694A]">Sub-Optimal Consumer Pitfall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Payment &amp; Balance Management</td>
                    <td className="py-2.5 px-4">Extracts <span className="font-mono tabular-nums">11.8%</span> asset interest spread (<span className="font-mono tabular-nums">25.2%</span> GP / <span className="font-mono tabular-nums">31.3%</span> PL APR) from <span className="font-mono tabular-nums">~50%</span> revolving accounts</td>
                    <td className="py-2.5 px-4">Automated <span className="font-mono tabular-nums">100%</span> statement balance payoff; captures <span className="font-mono tabular-nums">NTM &lt; -0.6%</span> subsidy (<span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+$833/yr</span>) + grace float</td>
                    <td className="py-2.5 px-4">Revolving any balance or making minimum payments (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">10%</span> of accounts in negative amortization)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Promotional APR Offers</td>
                    <td className="py-2.5 px-4">Uses <span className="font-mono tabular-nums">0%</span> promos (<span className="font-mono tabular-nums">$352B</span> balances) to acquire prime revolvers who roll into <span className="font-mono tabular-nums">27.5%</span> post-promo APRs</td>
                    <td className="py-2.5 px-4">Refinance <span className="font-mono tabular-nums">25%</span> debt at <span className="font-mono tabular-nums">2.8%</span> fee or park <span className="font-mono tabular-nums">0%</span> purchase liquidity in risk-free Treasury bills until promo end</td>
                    <td className="py-2.5 px-4">Using private-label &ldquo;Deferred Interest&rdquo; cards (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">31.3%</span> retroactive interest if <span className="font-mono tabular-nums">$1</span> remains unpaid)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Purchasing Psychology</td>
                    <td className="py-2.5 px-4">Exploits <span className="font-mono tabular-nums">29%</span> bill underestimation error and up to <span className="font-mono tabular-nums">100%</span> WTP inflation via frictionless payment</td>
                    <td className="py-2.5 px-4">Enforce strict pre-committed category budgets; keep <span className="font-mono tabular-nums">π_wtp &lt; γ_rew / (1 - γ_rew)</span> (<span className="font-mono tabular-nums">~2%–3%</span>)</td>
                    <td className="py-2.5 px-4">Chasing category multipliers or BNPL splits (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">+40%</span> order value), overspending past reward yield</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">Loyalty Point Inventory</td>
                    <td className="py-2.5 px-4">Monetizes <span className="font-mono tabular-nums">9.5%</span> annual unredeemed carryover (<span className="font-mono tabular-nums">$4.5B/yr</span>) and <span className="font-mono tabular-nums">2x</span> subprime forfeiture via ASC 606 breakage</td>
                    <td className="py-2.5 px-4">Maintain living digital inventory with executor login access; redeem continuously via high-value transfer partners</td>
                    <td className="py-2.5 px-4">Hoarding points long-term (exposed to unilateral devaluation, shutdown forfeiture, or estate erasure at death)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Synthesis & Conclusions */}
        <section className="space-y-4">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              Synthesis and Strategic Conclusions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] mb-1">
                Institutional Architecture
              </div>
              <h3 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                Why Issuing Banks Consistently Capture 6.0% Pre-Tax ROA
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                <li>
                  Merchant interchange fees (<span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">7.1%</span> of assets) more than offset loyalty rewards expenses (<span className="font-mono tabular-nums">4.8%</span> of assets), leaving the <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">11.8%</span> net interest spread and <span className="font-mono tabular-nums">$31.3 billion</span> in annual fees from the <span className="font-mono tabular-nums">50%</span> of accounts that revolve balances to drive profitability.
                </li>
                <li>
                  Protected by the Basel IRB statutory correlation of <span className="font-mono tabular-nums">R = 0.04</span> for QRRE and managed via Elastic-Net scorecards, Absorbing Markov Chain roll-rate matrices, survival hazard functions, and Bellman dynamic limit optimization, banks capture <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">1.38%–1.59%</span> structural alpha while pricing systematic default beta at <span className="font-mono tabular-nums">4.3%</span> per annum.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-xs font-mono uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                Participant Bifurcation
              </div>
              <h3 className="font-serif text-base font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                Zero Middle Ground for Individual Cardholders
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4">
                <li>
                  <span className="font-semibold text-[#BC4128] dark:text-[#E2694A]">Ecosystem Subsidizers:</span> Cardholders who revolve balances at <span className="font-mono tabular-nums">25.2%–31.3%</span> APRs, fall into private-label deferred interest traps, or let frictionless payment inflate willingness-to-pay beyond <span className="font-mono tabular-nums">π_wtp &lt; γ_rew / (1 - γ_rew)</span> finance the entire system.
                </li>
                <li>
                  <span className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Alpha Extractors:</span> Cardholders who enforce automated full-balance transactor discipline, arbitrage <span className="font-mono tabular-nums">0%</span> promotional lines against risk-free Treasury yields, neutralize spending illusions, and maintain a continuous &ldquo;earn and burn&rdquo; redemption velocity (backed by a documented digital estate inventory) systematically extract positive risk-free alpha.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
