'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

interface JargonTermProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

interface DichotomyColumn {
  label: string;
  badge?: string;
  tone: 'positive' | 'negative' | 'neutral' | 'bronze';
  points: React.ReactNode[];
}

interface DichotomyCardProps {
  title: string;
  subtitle?: string;
  left: DichotomyColumn;
  right: DichotomyColumn;
}

const JARGON_DEFINITIONS: Record<string, string> = {
  CDS: 'Credit Default Swap: A credit derivative contract in which the protection buyer makes periodic payments (spread in basis points) to the protection seller in exchange for a contingent payoff if the reference entity experiences a credit event.',
  ASC842:
    'U.S. GAAP lease accounting standard (ASC 842) under which a lessee recognizes a right-of-use asset and lease liability on the balance sheet only upon lease commencement (when the lessor makes the data center shell available). Uncommenced binding leases reside solely in footnotes under ASC 842-20-50-3(b).',
  SPV: 'Special Purpose Vehicle: A bankruptcy-remote legal subsidiary (e.g., CoreWeave Compute Acquisition Co. IV and VIII) created to ring-fence specific GPU clusters and assigned customer contracts from parent-company creditors.',
  DDTL: 'Delayed Draw Term Loan: A secured credit facility inside an SPV allowing the borrower to draw debt in stages as serial-numbered GPU servers are delivered and deployed against take-or-pay contracts.',
  RPO: 'Remaining Performance Obligations: Booked multi-year contracted revenue backlog recognized by the compute seller under ASC 606-10-50-13.',
  ASC606_440:
    'Accounting asymmetry where sellers book multi-year take-or-pay agreements as headline RPO backlog under ASC 606, while buyers treat the exact same unperformed contract as an unrecorded executory purchase commitment disclosed only in footnotes under ASC 440 (FAS 47).',
  HazardRate:
    'Risk-neutral default intensity (λ) in reduced-form credit modeling (Jarrow-Turnbull / Duffie-Singleton), governing default as an unpredictable Poisson arrival process: λ ≈ s / (1 - R).',
  LGD: 'Loss Given Default (LGD = 1 - R): The fraction of par value lost by creditors upon default after accounting for the Recovery Rate (R).',
  MertonModel:
    'Robert Merton’s (1974) structural contingent claims framework modeling a firm’s equity as a long European call option on total assets (V_A) struck at debt face value (D), and risky debt as risk-free debt minus a short European put option.',
  DistanceToDefault:
    'Merton Distance-to-Default (DD = d_2): The number of asset-volatility standard deviations between the firm’s expected asset value at maturity and its default barrier D.',
  AssetSubstitution:
    'Jensen-Meckling Risk-Shifting Problem: Because equity option Vega is strictly positive (∂E/∂σ_A > 0) and debt Vega is negative (∂B/∂σ_A < 0), raising leverage and asset volatility transfers wealth from bondholders to shareholders.',
  PositiveBasis:
    'Positive CDS-Bond Basis (s_CDS - z_bond > 0): A microstructure anomaly where synthetic 5Y CDS protection trades at a wider spread than cash bond Z-spreads due to bank loan proxy hedging, cheapest-to-deliver optionality, and fallen-angel downgrade hedging.',
  CTD: 'Cheapest-to-Deliver Optionality: In an ISDA credit event auction, protection buyers can deliver the lowest-priced pari passu bond (such as Oracle’s 82-cent 2056 notes), embedding an option premium into the CDS spread.',
  WrongWayRisk:
    'Wrong-Way Risk (WWR): Positive covariance between counterparty probability of default and collateral loss given default, Cov(PD_Offtaker, LGD_GPU) > 0, where an industry-wide AI monetization shortfall triggers tenant defaults and simultaneously floods secondary markets with idle GPUs.',
};

function Term({ term, definition, children }: JargonTermProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        tabIndex={0}
        role="button"
        aria-label={`Definition of ${term}`}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
        className="cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] font-medium focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm px-0.5 transition-colors"
      >
        {children || term}
      </span>
      {open && (
        <span
          role="tooltip"
          className="z-50 w-72 sm:w-80 p-3 text-xs leading-relaxed font-sans font-normal bg-[#14171B] dark:bg-[#05070A] text-zinc-100 dark:text-zinc-100 border border-zinc-700 dark:border-zinc-800 rounded-md shadow-xl absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none"
        >
          <span className="block font-mono text-[11px] uppercase tracking-wider text-[#D08F52] dark:text-[#D08F52] mb-1">
            {term}
          </span>
          <span className="block text-zinc-200 dark:text-zinc-300">{definition}</span>
        </span>
      )}
    </span>
  );
}

function DichotomyCard({ title, subtitle, left, right }: DichotomyCardProps) {
  const getToneClasses = (tone: DichotomyColumn['tone']) => {
    switch (tone) {
      case 'positive':
        return {
          border: 'border-[#1D8A70]/30 dark:border-[#3CBF9C]/30',
          badgeBg: 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/15',
          text: 'text-[#1D8A70] dark:text-[#3CBF9C]',
          bullet: 'text-[#1D8A70] dark:text-[#3CBF9C]',
        };
      case 'negative':
        return {
          border: 'border-[#BC4128]/30 dark:border-[#E2694A]/30',
          badgeBg: 'bg-[#BC4128]/10 dark:bg-[#E2694A]/15',
          text: 'text-[#BC4128] dark:text-[#E2694A]',
          bullet: 'text-[#BC4128] dark:text-[#E2694A]',
        };
      case 'bronze':
        return {
          border: 'border-[#A8672E]/30 dark:border-[#D08F52]/30',
          badgeBg: 'bg-[#A8672E]/10 dark:bg-[#D08F52]/15',
          text: 'text-[#A8672E] dark:text-[#D08F52]',
          bullet: 'text-[#A8672E] dark:text-[#D08F52]',
        };
      default:
        return {
          border: 'border-zinc-200 dark:border-zinc-800',
          badgeBg: 'bg-zinc-100 dark:bg-zinc-800',
          text: 'text-zinc-800 dark:text-zinc-200',
          bullet: 'text-zinc-500 dark:text-zinc-400',
        };
    }
  };

  const leftTone = getToneClasses(left.tone);
  const rightTone = getToneClasses(right.tone);

  return (
    <div className="my-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900">
        <h4 className="font-serif text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </h4>
        {subtitle && (
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`font-serif font-medium text-sm sm:text-base ${leftTone.text}`}>
              {left.label}
            </span>
            {left.badge && (
              <span
                className={`font-mono tabular-nums text-xs px-2 py-0.5 rounded ${leftTone.badgeBg} ${leftTone.text}`}
              >
                {left.badge}
              </span>
            )}
          </div>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {left.points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`font-mono text-xs mt-1 select-none ${leftTone.bullet}`}>▪</span>
                <span className="leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`font-serif font-medium text-sm sm:text-base ${rightTone.text}`}>
              {right.label}
            </span>
            {right.badge && (
              <span
                className={`font-mono tabular-nums text-xs px-2 py-0.5 rounded ${rightTone.badgeBg} ${rightTone.text}`}
              >
                {right.badge}
              </span>
            )}
          </div>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {right.points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`font-mono text-xs mt-1 select-none ${rightTone.bullet}`}>▪</span>
                <span className="leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface FormulaPanelProps {
  label: string;
  math: string[];
  workedExampleTitle?: string;
  workedExamples?: {
    regime: string;
    calculation: string;
    result: string;
    tone?: 'negative' | 'positive' | 'bronze';
  }[];
  footnote?: string;
}

function FormulaPanel({
  label,
  math,
  workedExampleTitle,
  workedExamples,
  footnote,
}: FormulaPanelProps) {
  return (
    <div className="my-5 rounded-lg bg-[#14171B] dark:bg-[#05070A] text-white dark:text-zinc-100 border border-zinc-800 dark:border-zinc-800/90 overflow-hidden shadow-md">
      <div className="px-4 py-2.5 border-b border-zinc-800 dark:border-zinc-800/80 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-[#D08F52] dark:text-[#D08F52]">
          {label}
        </span>
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          Quantitative Model Specification
        </span>
      </div>
      <div className="p-4 sm:p-5 font-mono tabular-nums text-xs sm:text-sm space-y-2.5 overflow-x-auto">
        {math.map((eq, i) => (
          <div
            key={i}
            className="py-1.5 px-3 rounded bg-zinc-900/90 dark:bg-zinc-950 border border-zinc-800/80 dark:border-zinc-900 text-zinc-100 dark:text-zinc-100 overflow-x-auto"
          >
            <MathBlock math={eq} />
          </div>
        ))}
      </div>
      {workedExamples && workedExamples.length > 0 && (
        <div className="px-4 sm:px-5 py-3.5 bg-zinc-900/60 dark:bg-zinc-950/80 border-t border-zinc-800 dark:border-zinc-900 font-mono tabular-nums text-xs">
          {workedExampleTitle && (
            <div className="text-zinc-400 dark:text-zinc-400 uppercase tracking-wider text-[11px] mb-2.5">
              {workedExampleTitle}
            </div>
          )}
          <div className="space-y-2">
            {workedExamples.map((ex, idx) => {
              const resultColor =
                ex.tone === 'negative'
                  ? 'text-[#E2694A] dark:text-[#E2694A]'
                  : ex.tone === 'positive'
                  ? 'text-[#3CBF9C] dark:text-[#3CBF9C]'
                  : 'text-[#D08F52] dark:text-[#D08F52]';
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-1.5 border-b border-zinc-800/60 dark:border-zinc-900 last:border-0"
                >
                  <span className="text-zinc-300 dark:text-zinc-300 font-medium">{ex.regime}</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-zinc-400 dark:text-zinc-400">{ex.calculation}</span>
                    <span className={`font-semibold ${resultColor}`}>⇒ {ex.result}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {footnote && (
            <p className="mt-2.5 text-[11px] text-zinc-400 dark:text-zinc-500 font-sans">
              {footnote}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function ArticlePage() {
  const [selectedHazardPreset, setSelectedHazardPreset] = useState<number>(5);
  const [selectedMertonRegime, setSelectedMertonRegime] = useState<number>(1);

  const hazardPresets = [
    {
      name: 'Oracle (Oct 11, 2026 Print)',
      spreadBps: 261,
      recoveryPct: 40.0,
      lgdPct: 60.0,
      lambdaPct: '4.35%',
      survivalPct: '79.60%',
      pd5Pct: '20.40%',
      note: 'IG Standard ISDA recovery assumption (R = 40%, LGD = 60%)',
    },
    {
      name: 'Oracle (Oct 15, 2026 Record)',
      spreadBps: 288,
      recoveryPct: 40.0,
      lgdPct: 60.0,
      lambdaPct: '4.80%',
      survivalPct: '78.66%',
      pd5Pct: '21.34%',
      note: 'Surpassed 2008 GFC peak (+26 bps overnight)',
    },
    {
      name: 'CoreWeave (Dealer Screen / Intraday Peak)',
      spreadBps: 1140,
      recoveryPct: 40.0,
      lgdPct: 60.0,
      lambdaPct: '~19.0%–20.0%',
      survivalPct: '~36.8%–38.7%',
      pd5Pct: '~63.0%',
      note: 'Bootstrapped under standard dealer screen defaults (1,000–1,140 bps with upfront points)',
    },
    {
      name: 'CoreWeave (Continuous Base, R = 40%)',
      spreadBps: 1000,
      recoveryPct: 40.0,
      lgdPct: 60.0,
      lambdaPct: '16.67%',
      survivalPct: '43.46%',
      pd5Pct: '56.54%',
      note: 'Continuous approximation at s = 1,000 bps and unadjusted 40% recovery',
    },
    {
      name: 'CoreWeave (Quant Adjusted, R = 20%)',
      spreadBps: 1000,
      recoveryPct: 20.0,
      lgdPct: 80.0,
      lambdaPct: '12.50%',
      survivalPct: '53.53%',
      pd5Pct: '46.47%',
      note: 'Structurally subordinated recovery sensitivity adjustment',
    },
    {
      name: "CoreWeave (S&P Recovery '5', R = 10%)",
      spreadBps: 1000,
      recoveryPct: 10.0,
      lgdPct: 90.0,
      lambdaPct: '11.11%',
      survivalPct: '57.38%',
      pd5Pct: '42.62%',
      note: 'Reflects severe LGD compression (90% LGD) as SPVs encumber GPUs and IG cash flows',
    },
  ];

  const mertonRegimes = [
    {
      name: 'Historical Oracle (Pre-AI Capex Baseline)',
      vaToD: '3.50x',
      sigmaA: '18.0%',
      dd: '+3.47σ',
      pd: '0.03%',
      tone: 'positive' as const,
      summary:
        'High recurring database cash flow (~79% gross margin), low asset volatility, deep equity cushion; short put option is far out-of-the-money.',
    },
    {
      name: 'Current Oracle (Oct 2026 w/ $288B Lease Stack)',
      vaToD: '1.60x',
      sigmaA: '28.0%',
      dd: '+0.80σ',
      pd: '21.27%',
      tone: 'negative' as const,
      summary:
        'Strike price D expands toward $457B while AI capex inflates σ_A; Distance-to-Default compresses by 2.67σ, matching the 288 bps CDS implied PD (21.34%).',
    },
    {
      name: 'Current CoreWeave (Oct 2026 Leveraged Neocloud)',
      vaToD: '1.15x',
      sigmaA: '45.0%',
      dd: '-0.14σ',
      pd: '55.59%',
      tone: 'negative' as const,
      summary:
        'Extreme leverage and volatile GPU residual values push DD below zero; equity trades as a high-vega call option on future compute scarcity.',
    },
  ];

  return (
    <ArticleFrame
      slug="ai-infrastructure-credit-repricing-oracle-coreweave"
      additionalDisclaimer="Corporate credit, CDS, and debt analysis presented herein is strictly educational and does not constitute credit rating opinions, fixed-income trading advice, or solvency endorsements."
    >
      <div className="space-y-12">
        {/* SECTION: Executive Summary */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            Executive Summary: The October 2026 AI Credit Inflection
          </h2>

          {/* Standout Stat Row (4 key figures from Executive Summary) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Oracle (<span className="font-mono">ORCL</span>) 5Y CDS (Oct 15, 2026)
              </div>
              <div className="font-mono tabular-nums text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A] mt-1">
                288 bps
              </div>
              <div className="font-mono tabular-nums text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                +26 bps overnight; &gt;2008 GFC peak
              </div>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                CoreWeave (<span className="font-mono">CRWV</span>) 5Y CDS Peak
              </div>
              <div className="font-mono tabular-nums text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A] mt-1">
                1,140 bps
              </div>
              <div className="font-mono tabular-nums text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                &gt;1,000 bps distress threshold
              </div>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                CoreWeave 2031 &amp; 2032 Unsecured Notes
              </div>
              <div className="font-mono tabular-nums text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A] mt-1">
                77¢–78¢
              </div>
              <div className="font-mono tabular-nums text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                14.8%–16.0%+ secondary YTM
              </div>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                2026 YTD Big Tech IG Bond Issuance
              </div>
              <div className="font-mono tabular-nums text-2xl font-semibold text-[#A8672E] dark:text-[#D08F52] mt-1">
                $182B
              </div>
              <div className="font-mono tabular-nums text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Funding $690B–$750B hyperscaler capex
              </div>
            </div>
          </div>

          {/* Key Takeaways Card */}
          <div className="rounded-lg border border-[#A8672E]/40 dark:border-[#D08F52]/40 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-4 sm:p-5">
            <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] mb-2.5">
              Key Takeaways • October 14–15, 2026 Repricing
            </div>
            <ul className="space-y-2 text-sm text-zinc-800 dark:text-zinc-200">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#A8672E] dark:text-[#D08F52] mt-0.5">•</span>
                <span>
                  Institutional credit markets shifted their primary analytical focus from physical
                  supply constraints (power grid interconnects and wafer allocation) to{' '}
                  <strong className="font-semibold">
                    balance sheet solvency, free cash flow conversion, and refinancing risk
                  </strong>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">•</span>
                <span>
                  Five-year <Term term="CDS" definition={JARGON_DEFINITIONS.CDS} /> protection on
                  investment-grade Oracle Corporation (<span className="font-mono">ORCL</span>)
                  surged <span className="font-mono tabular-nums">26 bps</span> overnight to a
                  record{' '}
                  <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">
                    288 bps
                  </span>
                  —surpassing its 2008 global financial crisis peak.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">•</span>
                <span>
                  Default protection on pure-play GPU cloud operator CoreWeave, Inc. (
                  <span className="font-mono">CRWV</span>, occasionally referenced as
                  &ldquo;Coreware&rdquo; in market queries) blew out beyond the{' '}
                  <span className="font-mono tabular-nums">1,000 bps</span> distress threshold,
                  touching{' '}
                  <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">
                    1,140 bps
                  </span>{' '}
                  intraday as its 2031 and 2032 senior unsecured bonds fell to{' '}
                  <span className="font-mono tabular-nums">77¢–78¢</span> on the dollar (
                  <span className="font-mono tabular-nums">&gt;15%–16% YTM</span>).
                </span>
              </li>
            </ul>
          </div>

          {/* Two-Column Dichotomy: Trailing Operational Growth vs. Fixed-Income Solvency Pricing */}
          <DichotomyCard
            title="The October 2026 Market Divergence: Top-Line Growth vs. Credit Solvency"
            subtitle="Contrast between trailing semiconductor/cloud expansion and fixed-income downside protection"
            left={{
              label: 'Trailing Operational & Equity Metrics',
              badge: 'Booming Top-Line',
              tone: 'positive',
              points: [
                <>
                  <strong className="font-medium">TSMC:</strong> Posted its sixth consecutive
                  quarter of record profits.
                </>,
                <>
                  <strong className="font-medium">Anthropic:</strong> Reported a{' '}
                  <span className="font-mono tabular-nums">45%</span> sequential surge in Q3 revenue
                  to <span className="font-mono tabular-nums">$16.8B</span> in pre-IPO briefings.
                </>,
                <>
                  <strong className="font-medium">Oracle Cloud Infrastructure:</strong> Delivered a{' '}
                  <span className="font-mono tabular-nums">121%</span> year-over-year expansion in
                  cloud infrastructure revenue.
                </>,
              ],
            }}
            right={{
              label: 'Fixed-Income & Credit Trading Desks',
              badge: 'Solvency Rejection',
              tone: 'negative',
              points: [
                <>
                  Evaluates <strong className="font-medium">downside recovery</strong> and{' '}
                  <strong className="font-medium">cash flow coverage</strong> rather than top-line
                  growth optionality.
                </>,
                <>
                  Big Tech issued a record{' '}
                  <span className="font-mono tabular-nums">$182B</span> in investment-grade bonds in
                  2026 YTD to fund <span className="font-mono tabular-nums">$690B–$750B</span> in
                  projected hyperscaler capex.
                </>,
                <>
                  Credit trading desks have begun rejecting debt issuance that lacks near-term
                  operating cash flow support.
                </>,
              ],
            }}
          />

          {/* Table 1: Reference Entities CDS & Cash Bond Summary */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90">
              <h3 className="font-serif text-base font-medium text-zinc-900 dark:text-zinc-100">
                Cross-Issuer Credit Pricing &amp; Implied Default Probabilities (October 15, 2026)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] uppercase">
                    <th className="py-3 px-3.5">Issuer / Reference Entity</th>
                    <th className="py-3 px-3">Ticker</th>
                    <th className="py-3 px-3">S&amp;P / Moody&apos;s Rating</th>
                    <th className="py-3 px-3">5Y CDS Spread</th>
                    <th className="py-3 px-3">Recent Move / Baseline</th>
                    <th className="py-3 px-3">Implied 5Y PD</th>
                    <th className="py-3 px-3.5">Cash Bond Benchmark &amp; Pricing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono tabular-nums text-xs">
                  <tr className="bg-[#BC4128]/5 dark:bg-[#E2694A]/5">
                    <td className="py-3 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                      CoreWeave, Inc. (Parent / Unsecured)
                    </td>
                    <td className="py-3 px-3 text-[#A8672E] dark:text-[#D08F52]">CRWV</td>
                    <td className="py-3 px-3">B+ (Pos) / Unrated (B Notes)</td>
                    <td className="py-3 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                      &gt;1,000 bps (1,140 peak)
                    </td>
                    <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">
                      Up from ~500 bps (~30% PD) 1 yr ago
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                      ~63.0% (Screen) / 42.6%–56.5% (Quant)
                    </td>
                    <td className="py-3 px-3.5 font-sans text-zinc-700 dark:text-zinc-300">
                      9.625% Notes due 2032 at{' '}
                      <span className="font-mono font-semibold text-[#BC4128] dark:text-[#E2694A]">
                        77¢–78¢ (14.8%–16.0%+ YTM)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                      SoftBank Group Corp.
                    </td>
                    <td className="py-3 px-3 text-[#A8672E] dark:text-[#D08F52]">SFTBY</td>
                    <td className="py-3 px-3">Speculative-Grade Crossover</td>
                    <td className="py-3 px-3 text-[#BC4128] dark:text-[#E2694A]">424 bps</td>
                    <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">
                      +24 bps overnight
                    </td>
                    <td className="py-3 px-3 text-[#BC4128] dark:text-[#E2694A]">
                      ~29.8% (at R=40%)
                    </td>
                    <td className="py-3 px-3.5 font-sans text-zinc-700 dark:text-zinc-300">
                      Elevated spread widening across AI venture portfolio
                    </td>
                  </tr>
                  <tr className="bg-[#BC4128]/5 dark:bg-[#E2694A]/5">
                    <td className="py-3 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                      Oracle Corporation
                    </td>
                    <td className="py-3 px-3 text-[#A8672E] dark:text-[#D08F52]">ORCL</td>
                    <td className="py-3 px-3">BBB- (Stable) / Baa2 (Neg)</td>
                    <td className="py-3 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                      288 bps
                    </td>
                    <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">
                      +26 bps overnight; &lt;50 bps mid-2025
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                      20.4%–21.3% (at R=40%)
                    </td>
                    <td className="py-3 px-3.5 font-sans text-zinc-700 dark:text-zinc-300">
                      Feb 2031 at <span className="font-mono">6.23% YTM (+180 bps)</span>; 2056
                      Bonds at <span className="font-mono">82¢ (&gt;8.3% YTM)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                      Broadcom Inc.
                    </td>
                    <td className="py-3 px-3 text-[#A8672E] dark:text-[#D08F52]">AVGO</td>
                    <td className="py-3 px-3">Investment-Grade</td>
                    <td className="py-3 px-3 text-zinc-800 dark:text-zinc-200">136 bps</td>
                    <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">
                      Record high (Oct 11, 2026)
                    </td>
                    <td className="py-3 px-3 text-zinc-800 dark:text-zinc-200">
                      ~10.7% (at R=40%)
                    </td>
                    <td className="py-3 px-3.5 font-sans text-zinc-700 dark:text-zinc-300">
                      Widening alongside semiconductor equity multiple compression
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                      Big-4 Hyperscalers (MSFT, GOOGL, AMZN, META)
                    </td>
                    <td className="py-3 px-3 text-[#1D8A70] dark:text-[#3CBF9C]">Basket</td>
                    <td className="py-3 px-3">AAA/Aaa to AA-/Aa3</td>
                    <td className="py-3 px-3 text-[#1D8A70] dark:text-[#3CBF9C]">
                      Well below ORCL
                    </td>
                    <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">
                      Basket 5Y PD rose 8.6% to 11.8% (incl. ORCL)
                    </td>
                    <td className="py-3 px-3 text-[#1D8A70] dark:text-[#3CBF9C]">
                      &lt;3.0%–5.0% (Ex-ORCL)
                    </td>
                    <td className="py-3 px-3.5 font-sans text-zinc-700 dark:text-zinc-300">
                      Trading tighter than broader IG index; recent underperformance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION: Corporate Debt and Credit Architecture */}
        <section className="space-y-8">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            Corporate Debt and Credit Architecture: Oracle vs. CoreWeave
          </h2>

          {/* Infographic Placement directly illustrates Oracle Lease Iceberg & CoreWeave SPVs */}
          <div className="my-6">
            <InfographicSlot alt="The 2026 AI Credit Repricing: Corporate Debt and Solvency Risks" />
          </div>

          {/* Dichotomy: Two Paradigms of AI Leverage */}
          <DichotomyCard
            title="Two Distinct Paradigms of AI Infrastructure Leverage"
            subtitle="Structural comparison of how Oracle and CoreWeave finance massive compute clusters"
            left={{
              label: 'Oracle Corporation (Incumbent IG)',
              badge: 'BBB- / Baa2',
              tone: 'bronze',
              points: [
                <>
                  <strong className="font-medium">Balance-Sheet Transformation:</strong> Senior
                  unsecured corporate notes (<span className="font-mono tabular-nums">$125.3B</span>{' '}
                  gross borrowings) and short-term bank term loans.
                </>,
                <>
                  <strong className="font-medium">Off-Balance-Sheet Lease Accumulation:</strong>{' '}
                  <span className="font-mono tabular-nums">$288.0B</span> in signed 15-to-19-year
                  uncommenced data-center leases residing in footnotes under{' '}
                  <Term term="ASC 842" definition={JARGON_DEFINITIONS.ASC842} />.
                </>,
              ],
            }}
            right={{
              label: 'CoreWeave, Inc. (Speculative Neocloud)',
              badge: 'B+ / Recovery 5',
              tone: 'negative',
              points: [
                <>
                  <strong className="font-medium">GPU-Collateralized SPV Lending:</strong> Isolates
                  each cluster inside a bankruptcy-remote{' '}
                  <Term term="SPV" definition={JARGON_DEFINITIONS.SPV} /> borrowing via first-lien{' '}
                  <Term term="DDTL" definition={JARGON_DEFINITIONS.DDTL}>
                    DDTLs
                  </Term>
                  .
                </>,
                <>
                  <strong className="font-medium">Structural Subordination:</strong> Encumbers GPUs
                  and IG receivables inside SPVs, leaving{' '}
                  <span className="font-mono tabular-nums">$16.6B</span> of parent unsecured/convert
                  bonds with an estimated <span className="font-mono tabular-nums">10¢</span>{' '}
                  recovery.
                </>,
              ],
            }}
          />

          {/* Subsection: Oracle Corporation */}
          <div className="space-y-5">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Oracle Corporation: Fallen-Angel Risk and the &ldquo;$288 Billion Footnote&rdquo;
            </h3>

            {/* Dichotomy: Oracle Before vs. After AI Pivot */}
            <DichotomyCard
              title="Oracle Financial Profile Transformation (FY2022–FY2024 vs. Q1 FY2027)"
              left={{
                label: 'Legacy Enterprise Software Franchise',
                badge: '79.1% Gross Margin',
                tone: 'positive',
                points: [
                  <>
                    Generated <span className="font-mono tabular-nums">79.1%</span> gross margins in
                    FY2022, funding modest capital expenditures entirely out of free cash flow.
                  </>,
                  <>
                    Cloud infrastructure revenue run-rate stood at{' '}
                    <span className="font-mono tabular-nums">$10.2B</span> in FY2024 with net PP&amp;E
                    of <span className="font-mono tabular-nums">$43.5B</span>.
                  </>,
                  <>
                    Legacy software license and support segment generates roughly{' '}
                    <span className="font-mono tabular-nums">80%</span> gross margins and funds the
                    broader enterprise.
                  </>,
                ],
              }}
              right={{
                label: 'AI Compute Conduit Pivot (Q1 FY2027)',
                badge: '64.0% Gross Margin',
                tone: 'negative',
                points: [
                  <>
                    Cloud infrastructure run-rate nearly tripled to{' '}
                    <span className="font-mono tabular-nums">$29.6B</span> and net PP&amp;E nearly
                    tripled to <span className="font-mono tabular-nums">$127.8B</span>, but gross
                    margins compressed <span className="font-mono tabular-nums">15.1 percentage points</span>{' '}
                    to <span className="font-mono tabular-nums">64.0%</span> while legacy software (
                    <span className="font-mono tabular-nums">36.4%</span> of revenue) structurally
                    shrinks.
                  </>,
                  <>
                    Capex jumped <span className="font-mono tabular-nums">162%</span> from{' '}
                    <span className="font-mono tabular-nums">$21.2B</span> (FY25) to{' '}
                    <span className="font-mono tabular-nums">$55.66B</span> (FY26), hit{' '}
                    <span className="font-mono tabular-nums">$28.50B</span> in Q1 FY27 alone, and is
                    guided at <span className="font-mono tabular-nums">$90B–$95B</span> for FY27 (up
                    to <span className="font-mono tabular-nums">$70B</span> net cash capex after{' '}
                    <span className="font-mono tabular-nums">$20B–$25B</span> customer prepayments).
                  </>,
                  <>
                    Free cash flow fell to{' '}
                    <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">
                      -$23.7B
                    </span>{' '}
                    in FY26 (<span className="font-mono tabular-nums">-$28.7B</span> TTM through Aug
                    31, 2026) and is projected to widen to{' '}
                    <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">
                      -$41.6B to -$45.0B
                    </span>{' '}
                    in FY27.
                  </>,
                ],
              }}
            />

            {/* Oracle Obligation Stack Table */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90">
                <h4 className="font-serif text-base font-medium text-zinc-900 dark:text-zinc-100">
                  Headline Balance-Sheet Leverage vs. True Economic Obligation Stack (Aug 31, 2026)
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] uppercase">
                      <th className="py-3 px-4">Oracle Leverage &amp; Debt Metric</th>
                      <th className="py-3 px-4">Dollar Amount</th>
                      <th className="py-3 px-4">Implied Leverage (Debt / EBITDA)</th>
                      <th className="py-3 px-4">Accounting &amp; Analytical Treatment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono tabular-nums text-xs">
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        Company-Style Net Debt (Ex-Leases)
                      </td>
                      <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                        $88.3B
                      </td>
                      <td className="py-3 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">~2.5x–2.6x</td>
                      <td className="py-3 px-4 font-sans text-zinc-700 dark:text-zinc-300">
                        Gross borrowings ($125.3B) less ~$37B cash/marketable securities; excludes
                        all lease liabilities.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        Gross On-Balance-Sheet Borrowings
                      </td>
                      <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                        $125.3B
                      </td>
                      <td className="py-3 px-4 text-[#A8672E] dark:text-[#D08F52]">~3.3x–3.5x</td>
                      <td className="py-3 px-4 font-sans text-zinc-700 dark:text-zinc-300">
                        Senior unsecured notes (including recent $18B bond sale) and short-term bank
                        term loans; down from $134.6B peak.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        Net Debt + Recognized Lease Liabilities
                      </td>
                      <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                        ~$132.1B
                      </td>
                      <td className="py-3 px-4 text-[#A8672E] dark:text-[#D08F52]">~3.7x</td>
                      <td className="py-3 px-4 font-sans text-zinc-700 dark:text-zinc-300">
                        Includes $43.8B of operating and finance leases already commenced under ASC
                        842.
                      </td>
                    </tr>
                    <tr className="bg-[#BC4128]/5 dark:bg-[#E2694A]/5">
                      <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        Off-Balance-Sheet Leases Not Yet Commenced
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                        $288.0B
                      </td>
                      <td className="py-3 px-4 italic text-[#BC4128] dark:text-[#E2694A]">
                        Footnote Only
                      </td>
                      <td className="py-3 px-4 font-sans text-zinc-700 dark:text-zinc-300">
                        Signed 15-to-19-year data-center leases not yet on balance sheet under ASC
                        842-20-50-3(b) (up &gt;6x from $43.4B in Q4 FY25).
                      </td>
                    </tr>
                    <tr className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10">
                      <td className="py-3 px-4 font-sans font-semibold text-zinc-900 dark:text-zinc-100">
                        Total Borrowings + All Lease Claims (FY2028F S&amp;P Adjusted)
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                        ~$457.0B–$457.3B
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                        4.4x (Mid-4x)
                      </td>
                      <td className="py-3 px-4 font-sans text-zinc-700 dark:text-zinc-300">
                        Full obligation stack incorporating capitalized uncommenced leases and
                        purchase commitments ($389.2B in FY27f; $457.3B in FY28f).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bullet list on Rating Agency Actions & Duration Mismatch */}
            <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900/50 p-4 sm:p-5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Rating Downgrades &amp; Fallen-Angel Threshold:
                  </strong>{' '}
                  Recognizing 15-to-19-year leases as fixed debt-like claims, S&amp;P downgraded
                  Oracle from <span className="font-mono">BBB</span> to{' '}
                  <span className="font-mono font-semibold text-[#BC4128] dark:text-[#E2694A]">
                    BBB-
                  </span>{' '}
                  on July 9, 2026 (lowest investment-grade rung); Moody&apos;s maintains a negative
                  outlook on its <span className="font-mono">Baa2</span> rating, and Barclays
                  downgraded Oracle credit to underweight. A single one-notch downgrade to{' '}
                  <span className="font-mono">BB+</span> would reclassify{' '}
                  <span className="font-mono tabular-nums">$125.3B</span> of senior notes as
                  high-yield, triggering mandatory liquidation by IG-only institutional mandates.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Severe Asset-Liability Duration Mismatch (Morgan Stanley):
                  </strong>{' '}
                  Oracle paired short-term bank loans and near-term bond maturities (
                  <span className="font-mono tabular-nums">$7B</span> due in FY2027 and{' '}
                  <span className="font-mono tabular-nums">$10B</span> in FY2028, alongside{' '}
                  <span className="font-mono tabular-nums">$15B–$20B</span> annual maintenance capex
                  and <span className="font-mono tabular-nums">~$6.2B</span> in annual dividends)
                  with 15-to-19-year lease commitments, creating a massive refinancing wall between
                  2028 and 2032.
                </span>
              </li>
            </ul>
          </div>

          {/* Subsection: CoreWeave, Inc. */}
          <div className="space-y-5 pt-2">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-zinc-900 dark:text-zinc-100">
              CoreWeave, Inc.: GPU-Collateralized SPVs and Structural Subordination
            </h3>

            {/* Bullet points on CoreWeave Debt Expansion & Cash Burn */}
            <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900/50 p-4 sm:p-5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#A8672E] dark:text-[#D08F52] mt-0.5">▪</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    &ldquo;Rube Goldberg Financial Machine&rdquo; (Ben Horowitz):
                  </strong>{' '}
                  Following its March 2025 IPO (<span className="font-mono tabular-nums">~$1.5B</span>{' '}
                  net proceeds) and <span className="font-mono tabular-nums">$3.0B</span> in H1 2026
                  private equity placements from Nvidia and Jane Street, CoreWeave expanded total
                  funded debt &gt;4x from under <span className="font-mono tabular-nums">$8B</span>{' '}
                  (2024) to{' '}
                  <span className="font-mono tabular-nums font-semibold">
                    $35.1B–$35.6B
                  </span>{' '}
                  (Q2 2026), plus <span className="font-mono tabular-nums">$16.3B</span> in
                  operating leases (<span className="font-mono tabular-nums">~$52B</span> combined).
                  S&amp;P projects adjusted debt to reach{' '}
                  <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">
                    $61.7B
                  </span>{' '}
                  by year-end 2026 (<span className="font-mono tabular-nums">$42B</span> funded debt
                  + <span className="font-mono tabular-nums">$19.5B</span> leases) and{' '}
                  <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">
                    $88.0B
                  </span>{' '}
                  in 2027.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Parent-Level Interest Coverage Deficit &amp; $35B Funding Gap:
                  </strong>{' '}
                  In Q2 2026, CoreWeave generated{' '}
                  <span className="font-mono tabular-nums">$2.575B</span> revenue (
                  <span className="font-mono tabular-nums">+112% YoY</span>) against{' '}
                  <span className="font-mono tabular-nums">$9.4B</span> quarterly capex, posting a
                  GAAP operating loss of <span className="font-mono tabular-nums">-$49M</span> and
                  Adjusted Operating Income of just{' '}
                  <span className="font-mono tabular-nums">$128M</span>, while net interest expense
                  hit <span className="font-mono tabular-nums">$640M</span> (guided to{' '}
                  <span className="font-mono tabular-nums">$860M–$940M</span> in Q3 2026), yielding
                  a Q2 net loss of <span className="font-mono tabular-nums">-$626M</span> (H1 2026
                  net loss of <span className="font-mono tabular-nums">-$1.366B</span>). With{' '}
                  <span className="font-mono tabular-nums">$5.4B</span> in 2026 debt amortization
                  and <span className="font-mono tabular-nums">$31B–$39B</span> in 2026 capex,
                  CoreWeave needs <span className="font-mono tabular-nums">~$33B</span> in external
                  financing in 2026 and faces a{' '}
                  <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">
                    $35B
                  </span>{' '}
                  funding gap to build the remaining{' '}
                  <span className="font-mono tabular-nums">2.2 GW</span> of its{' '}
                  <span className="font-mono tabular-nums">3.7 GW</span> contracted footprint (only{' '}
                  <span className="font-mono tabular-nums">1.5 GW</span> currently active).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    S&amp;P Simulated 2030 Default Waterfall (10¢ Unsecured Recovery):
                  </strong>{' '}
                  S&amp;P models a simulated 2030 emergence Enterprise Value of{' '}
                  <span className="font-mono tabular-nums">$7.4B</span> (
                  <span className="font-mono tabular-nums">5.0x</span>{' '}
                  <span className="font-mono tabular-nums">$1.47B</span> emergence EBITDA), where
                  administrative expenses (<span className="font-mono tabular-nums">5%</span>),
                  senior secured revolving lenders (
                  <span className="font-mono tabular-nums">35%</span>), and OEM equipment lenders (
                  <span className="font-mono tabular-nums">50%</span>) absorb{' '}
                  <span className="font-mono tabular-nums">85%</span> of parent value—leaving{' '}
                  <span className="font-mono tabular-nums">$16.6B</span> of senior unsecured notes
                  with a <span className="font-mono">&apos;5&apos;</span> Recovery Rating (
                  <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">
                    10¢ on the dollar
                  </span>
                  ).
                </span>
              </li>
            </ul>

            {/* Dichotomy: CoreWeave SPV Credit Bifurcation */}
            <DichotomyCard
              title="CoreWeave SPV Credit Bifurcation: Investment-Grade vs. Non-IG Offtakers"
              subtitle="Identical Nvidia GPU hardware receives vastly different ratings and covenants based on tenant credit quality"
              left={{
                label: 'DDTL 4.0 (Acquisition Co. VIII SPV)',
                badge: 'A3 Rated • SOFR + 225 bps',
                tone: 'positive',
                points: [
                  <>
                    <strong className="font-medium">Facility &amp; Backing:</strong>{' '}
                    <span className="font-mono tabular-nums">$8.50B</span> facility (
                    <span className="font-mono tabular-nums">$7.5B</span> initial) backed by a{' '}
                    <span className="font-mono tabular-nums">$14.2B</span> contract with{' '}
                    <span className="font-mono">AA-/Aa3</span>-rated Meta Platforms.
                  </>,
                  <>
                    <strong className="font-medium">Pricing Pass-Through:</strong> Rated{' '}
                    <span className="font-mono">A3</span> (Moody&apos;s) /{' '}
                    <span className="font-mono">A (low)</span> (DBRS) at{' '}
                    <span className="font-mono tabular-nums">SOFR + 2.25%</span> (
                    <span className="font-mono tabular-nums">~5.9%</span> fixed)—a pass-through of
                    Meta&apos;s balance sheet plus a{' '}
                    <span className="font-mono tabular-nums">100–120 bps</span> structural novelty
                    and SLA premium.
                  </>,
                  <>
                    <strong className="font-medium">Non-Recourse Ring-Fence:</strong> Housed in a
                    bankruptcy-remote SPV with no parent guarantee required.
                  </>,
                ],
              }}
              right={{
                label: 'DDTL 5.0 & DDTL 5.5 (Non-IG Offtakers)',
                badge: 'Ba2 / BB+ • SOFR + 450–550 bps',
                tone: 'negative',
                points: [
                  <>
                    <strong className="font-medium">Spread Blowout:</strong> Pledging identical
                    Nvidia hardware against non-IG customers drops ratings to{' '}
                    <span className="font-mono">Ba2/BB+</span> and widens spreads by{' '}
                    <span className="font-mono tabular-nums">225–325 bps</span> (
                    <span className="font-mono tabular-nums">SOFR + 4.50%</span> at 99 OID on{' '}
                    <span className="font-mono">$3.10B</span> DDTL 5.0;{' '}
                    <span className="font-mono tabular-nums">SOFR + 5.50%</span> at 97 OID /{' '}
                    <span className="font-mono tabular-nums">~10.4% YTM</span> on{' '}
                    <span className="font-mono">$2.60B</span> DDTL 5.5).
                  </>,
                  <>
                    <strong className="font-medium">Parent Guarantee &amp; 2.4x Cash Trap:</strong>{' '}
                    Lenders demand an unconditional parent guarantee (per 8-K) and strict cash-trap
                    covenants that freeze distributions and sweep funds after 3 months if contract
                    value falls below <span className="font-mono tabular-nums">2.4x</span>{' '}
                    outstanding debt.
                  </>,
                ],
              }}
            />

            {/* Table 2: CoreWeave Debt Tranches */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90">
                <h4 className="font-serif text-base font-medium text-zinc-900 dark:text-zinc-100">
                  CoreWeave Capital Structure: SPV Delayed Draw Term Loans &amp; Parent Debt Tranches
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] uppercase">
                      <th className="py-3 px-3">Facility / Tranche</th>
                      <th className="py-3 px-3">Close &amp; Maturity</th>
                      <th className="py-3 px-3">Size</th>
                      <th className="py-3 px-3">Offtaker / Collateral Profile</th>
                      <th className="py-3 px-3">Rating</th>
                      <th className="py-3 px-3">Pricing / Yield</th>
                      <th className="py-3 px-3">Structural &amp; Covenant Features</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono tabular-nums">
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        DDTL 1.0 (SPV)
                      </td>
                      <td className="py-2.5 px-3">Aug 2023</td>
                      <td className="py-2.5 px-3">$2.30B</td>
                      <td className="py-2.5 px-3 font-sans">
                        Early H100 cluster mix (~70% advance rate)
                      </td>
                      <td className="py-2.5 px-3">Unrated Private</td>
                      <td className="py-2.5 px-3 text-[#A8672E] dark:text-[#D08F52]">
                        SOFR + 9.62% (~13.6%–14.0%)
                      </td>
                      <td className="py-2.5 px-3 font-sans text-zinc-600 dark:text-zinc-400">
                        First institutional GPU-backed loan; Magnetar &amp; Blackstone.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        DDTL 2.0 &amp; Exp. (SPV)
                      </td>
                      <td className="py-2.5 px-3">May 2024 (Due May 2029)</td>
                      <td className="py-2.5 px-3">$7.50B + $3.00B</td>
                      <td className="py-2.5 px-3 font-sans">
                        30,000+ H100-equivalent GPUs &amp; contracts
                      </td>
                      <td className="py-2.5 px-3">Unrated / Private</td>
                      <td className="py-2.5 px-3">SOFR + 5.00% / +4.25%</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-600 dark:text-zinc-400">
                        Led by Blackstone, Magnetar, Coatue; scale template.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        DDTL 3.0 (SPV)
                      </td>
                      <td className="py-2.5 px-3">Due Aug 2030</td>
                      <td className="py-2.5 px-3">$2.60B</td>
                      <td className="py-2.5 px-3 font-sans">
                        GPUs dedicated to long-term OpenAI contract
                      </td>
                      <td className="py-2.5 px-3">Private / Struct.</td>
                      <td className="py-2.5 px-3">SOFR + 4.00% (~8.0%)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-600 dark:text-zinc-400">
                        Directly ring-fences equipment for OpenAI compute deal.
                      </td>
                    </tr>
                    <tr className="bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/5">
                      <td className="py-2.5 px-3 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        DDTL 4.0 (Acq. Co. VIII)
                      </td>
                      <td className="py-2.5 px-3">Mar 2026 (Due Mar 2032)</td>
                      <td className="py-2.5 px-3">$8.50B ($7.5B init.)</td>
                      <td className="py-2.5 px-3 font-sans">
                        Backed by $14.2B Meta (META) IG contract
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        A3 / A (low)
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        SOFR + 2.25% (~5.9% Fixed)
                      </td>
                      <td className="py-2.5 px-3 font-sans text-zinc-600 dark:text-zinc-400">
                        First IG-rated HPC facility; non-recourse bankruptcy-remote SPV.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        DDTL 5.0 (SPV w/ Guar.)
                      </td>
                      <td className="py-2.5 px-3">May 2026</td>
                      <td className="py-2.5 px-3">$3.10B</td>
                      <td className="py-2.5 px-3 font-sans">
                        Two large below-IG customers
                      </td>
                      <td className="py-2.5 px-3 text-[#A8672E] dark:text-[#D08F52]">Ba2 / BB+</td>
                      <td className="py-2.5 px-3 text-[#A8672E] dark:text-[#D08F52]">
                        SOFR + 4.50% @ 99 OID (~8.5%–9.0%)
                      </td>
                      <td className="py-2.5 px-3 font-sans text-zinc-600 dark:text-zinc-400">
                        Cash trap if contract value &lt;2.4x loan; unconditional parent guarantee.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        DDTL 5.5 (SPV)
                      </td>
                      <td className="py-2.5 px-3">Aug 2026 (Due Sep 2031)</td>
                      <td className="py-2.5 px-3">$2.60B ($1.2B drawn)</td>
                      <td className="py-2.5 px-3 font-sans">
                        Mixed below-IG / shorter customer contracts
                      </td>
                      <td className="py-2.5 px-3 text-[#A8672E] dark:text-[#D08F52]">Ba2 / BB+</td>
                      <td className="py-2.5 px-3 text-[#BC4128] dark:text-[#E2694A]">
                        SOFR + 5.50% @ 97 OID (~10.4% YTM)
                      </td>
                      <td className="py-2.5 px-3 font-sans text-zinc-600 dark:text-zinc-400">
                        Lenders assume GPU renewal / re-leasing residual value risk.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                        OEM Financing &amp; Secured RCF
                      </td>
                      <td className="py-2.5 px-3">Due Jun 2027 – 2029</td>
                      <td className="py-2.5 px-3">$1.30B OEM / $2.50B RCF</td>
                      <td className="py-2.5 px-3 font-sans">
                        Senior secured parent / equipment claims
                      </td>
                      <td className="py-2.5 px-3">Senior Secured</td>
                      <td className="py-2.5 px-3">6.75%–7.00% (RCF) / 9%–11% (OEM)</td>
                      <td className="py-2.5 px-3 font-sans text-zinc-600 dark:text-zinc-400">
                        Absorbs 85% of parent emergence EV (35% RCF, 50% OEM) in S&amp;P default
                        model.
                      </td>
                    </tr>
                    <tr className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10">
                      <td className="py-2.5 px-3 font-sans font-semibold text-zinc-900 dark:text-zinc-100">
                        Senior Unsecured Notes (USD &amp; EUR)
                      </td>
                      <td className="py-2.5 px-3">Due 2031 &amp; 2032</td>
                      <td className="py-2.5 px-3">$16.6B (incl. Converts)</td>
                      <td className="py-2.5 px-3 font-sans">
                        Unsecured parent claim (unpledged assets only)
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                        B / Recovery &apos;5&apos; (10%)
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                        9.75% / 9.625% trading @ 78¢ (~15%–16% YTM)
                      </td>
                      <td className="py-2.5 px-3 font-sans text-zinc-600 dark:text-zinc-400">
                        Structurally subordinated to all SPV DDTLs; plus $4.0B–$4.2B 1.75% Converts
                        (&apos;32).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Structural Concerns in the AI Ecosystem */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            Structural Concerns in the AI Ecosystem Driving Credit Contagion
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Macro ROIC Deficit */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
                  The Macro ROIC Deficit (Gartner Study, Oct 14, 2026)
                </h3>
                <span className="font-mono tabular-nums text-xs px-2 py-0.5 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A]">
                  -$4.9T Gap
                </span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      $7 Trillion Capex Base:
                    </strong>{' '}
                    AI infrastructure providers are projected to spend nearly{' '}
                    <span className="font-mono tabular-nums">$1T</span> in 2026 and an additional{' '}
                    <span className="font-mono tabular-nums">$6T</span> between 2027 and 2030.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      $8.5T Required vs. $3.6T Forecasted:
                    </strong>{' '}
                    Amortizing that <span className="font-mono tabular-nums">$7T</span> base,
                    covering debt service, and earning a normalized{' '}
                    <span className="font-mono tabular-nums">12% ROIC</span> requires{' '}
                    <span className="font-mono tabular-nums">$8.5T</span> in cumulative revenue
                    through 2030, but Gartner forecasts only{' '}
                    <span className="font-mono tabular-nums">$3.6T</span>—leaving a{' '}
                    <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">
                      $4.9T cumulative revenue deficit
                    </span>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Impairment &amp; Consolidation:
                    </strong>{' '}
                    Exposes <span className="font-mono tabular-nums">&gt;$3.5T</span> of AI
                    infrastructure spending to balance-sheet impairment by 2030; Gartner expects{' '}
                    <span className="font-mono tabular-nums font-semibold">&gt;80%</span> of
                    independent neocloud providers to cease operating independently by 2030.
                  </span>
                </li>
              </ul>
            </div>

            {/* 2. Counterparty Concentration */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
                  Single-Customer Concentration in RPO Backlogs
                </h3>
                <span className="font-mono tabular-nums text-xs px-2 py-0.5 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52]">
                  OpenAI Exposure
                </span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#A8672E] dark:text-[#D08F52] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Headline <Term term="RPO" definition={JARGON_DEFINITIONS.RPO} /> Backlogs:
                    </strong>{' '}
                    Oracle cites <span className="font-mono tabular-nums">$664B</span> (Aug 2026)
                    and CoreWeave cites{' '}
                    <span className="font-mono tabular-nums">$103.7B–$104B</span> (June 2026, plus{' '}
                    <span className="font-mono tabular-nums">&gt;$25B</span> signed in early Q3).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Oracle&apos;s OpenAI Concentration:
                    </strong>{' '}
                    S&amp;P and analysts estimate{' '}
                    <span className="font-mono tabular-nums font-semibold">45%–50%</span> of
                    Oracle&apos;s backlog (<span className="font-mono tabular-nums">~$300B</span>{' '}
                    over 5 years, <span className="font-mono tabular-nums">4.5 GW</span> power, or{' '}
                    <span className="font-mono tabular-nums">&gt;$30B/year</span> starting FY2028)
                    is contracted to venture-backed OpenAI.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      CoreWeave&apos;s Top-3 Concentration:
                    </strong>{' '}
                    Just three customers—led by Microsoft and OpenAI (
                    <span className="font-mono tabular-nums">$11.9B</span> compute deal plus an
                    earlier <span className="font-mono tabular-nums">$6.5B</span> commitment)—generate{' '}
                    <span className="font-mono tabular-nums font-semibold">72%</span> of
                    CoreWeave&apos;s revenue, raising doubts over whether OpenAI can pay{' '}
                    <span className="font-mono tabular-nums">&gt;$60B/year</span> across both firms.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Dichotomy: Executory Contract Asymmetry (ASC 606 vs ASC 440) */}
          <DichotomyCard
            title="Executory Contract Accounting Wedge: Seller (ASC 606) vs. Buyer (ASC 440)"
            subtitle="How identical take-or-pay compute contracts are treated asymmetrically on counterparty balance sheets"
            left={{
              label: 'Compute Seller Accounting (ASC 606-10-50-13)',
              badge: 'Headline RPO Backlog',
              tone: 'bronze',
              points: [
                <>
                  Books multi-year take-or-pay agreements as headline{' '}
                  <Term term="ASC 606 vs. ASC 440" definition={JARGON_DEFINITIONS.ASC606_440}>
                    Remaining Performance Obligations (RPO)
                  </Term>{' '}
                  backlog (<span className="font-mono tabular-nums">$664B</span> at Oracle;{' '}
                  <span className="font-mono tabular-nums">$104B+</span> at CoreWeave).
                </>,
                <>
                  Lenders and debt originators use this headline RPO backlog directly to underwrite
                  SPV term loans and corporate bond issuance.
                </>,
              ],
            }}
            right={{
              label: 'Compute Buyer Accounting (ASC 440 / FAS 47)',
              badge: 'Unrecorded Footnote',
              tone: 'negative',
              points: [
                <>
                  Treats the exact same unperformed contract as an unrecorded executory purchase
                  commitment disclosed solely in 10-K footnotes, reinforced by the SEC&apos;s 2020
                  elimination of the Regulation S-K Item 303 contractual-obligations table.
                </>,
                <>
                  If AI monetization lags, cash-burning buyers face liquidity constraints while
                  hyperscalers like Microsoft can leverage market power to restructure terms rather
                  than pay for idle capacity.
                </>,
              ],
            }}
          />

          {/* Asset Obsolescence & Macro Rate Shocks Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 3. Asset Obsolescence & Circular Vendor Financing */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3">
              <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
                Asset Obsolescence, Depreciation Disagreements &amp; Vendor Loops
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#A8672E] dark:text-[#D08F52] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Shortest Asset Life in Industrial History:
                    </strong>{' '}
                    1880s railroads peaked at <span className="font-mono tabular-nums">6.0%</span>{' '}
                    of U.S. GDP (<span className="font-mono tabular-nums">50–100 yr</span> asset
                    life) and 2000 telecom peaked at{' '}
                    <span className="font-mono tabular-nums">1.0%</span> of GDP (
                    <span className="font-mono tabular-nums">15–20 yr</span> fiber life). In 2026,
                    Big-5 hyperscaler capex reached{' '}
                    <span className="font-mono tabular-nums">2.2%</span> of U.S. GDP (
                    <span className="font-mono tabular-nums">~$750B</span> total,{' '}
                    <span className="font-mono tabular-nums">$450B</span> AI-specific), with{' '}
                    <span className="font-mono tabular-nums">60%</span> in short-lived electronics (
                    <span className="font-mono tabular-nums">~38%</span> GPUs at{' '}
                    <span className="font-mono tabular-nums">3–5 yrs</span>;{' '}
                    <span className="font-mono tabular-nums">~22%</span> servers/networking at{' '}
                    <span className="font-mono tabular-nums">5–10 yrs</span>) and{' '}
                    <span className="font-mono tabular-nums">40%</span> in power/land (
                    <span className="font-mono tabular-nums">15–30+ yrs</span>)—a weighted life of
                    just <span className="font-mono tabular-nums font-semibold">8–10 years</span>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Depreciation Wedge &amp; H100 Spot Volatility:
                    </strong>{' '}
                    CoreWeave depreciates GPUs over{' '}
                    <span className="font-mono tabular-nums font-semibold">6 years</span>, whereas
                    competitor Nebius uses <span className="font-mono tabular-nums">4 years</span>{' '}
                    and Amazon cut server life from 6 to{' '}
                    <span className="font-mono tabular-nums">5 years</span> in Jan 2025. Meanwhile,
                    H100 spot rental rates plunged from{' '}
                    <span className="font-mono tabular-nums">~$8.00/hr</span> (early 2024) to{' '}
                    <span className="font-mono tabular-nums">$1.70/hr</span> (Oct 2025) before
                    rebounding modestly to <span className="font-mono tabular-nums">~$2.35/hr</span>{' '}
                    (Mar 2026).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      1999 Lucent-Style Circular Vendor Loop:
                    </strong>{' '}
                    Nvidia is simultaneously CoreWeave&apos;s sole hardware supplier, a{' '}
                    <span className="font-mono tabular-nums">&gt;5%</span> equity holder (investing{' '}
                    <span className="font-mono tabular-nums">$2B</span> at{' '}
                    <span className="font-mono tabular-nums">$87.20/sh</span> in Jan 2026), and
                    unused-capacity backstop; OpenAI took a{' '}
                    <span className="font-mono tabular-nums">$350M</span> equity stake alongside its{' '}
                    <span className="font-mono tabular-nums">$11.9B</span> contract. While Nvidia
                    and Google guarantee data center buildings and substations,{' '}
                    <strong className="font-semibold">
                      Nvidia refuses to guarantee GPU chip residual values
                    </strong>
                    .
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Macro Interest Rate Shocks & Supply Indigestion */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3">
              <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
                Macro Rate Shocks &amp; Primary Supply Indigestion
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Hawkish Fed Under Chair Kevin Warsh:
                    </strong>{' '}
                    Hot Q3 2026 U.S. inflation and three FOMC dissents in favor of a rate hike
                    (Hammack, Kashkari, Logan) pushed market tightening odds to{' '}
                    <span className="font-mono tabular-nums">60%</span>, driving the 10Y UST yield
                    to <span className="font-mono tabular-nums">~4.75%</span> and SOFR to{' '}
                    <span className="font-mono tabular-nums">~4.0%–4.25%</span>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Margin Cannibalization on Fixed-Price Contracts:
                    </strong>{' '}
                    CoreWeave locks in fixed-price multi-year contracts up front (with{' '}
                    <span className="font-mono tabular-nums">15%–25%</span> prepayments) while
                    needing <span className="font-mono tabular-nums">~$35B</span> in incremental
                    debt at <span className="font-mono tabular-nums">8.5%–15%</span> borrowing
                    costs, leaving it within an estimated{' '}
                    <span className="font-mono tabular-nums font-semibold">$5B</span> of cash-flow
                    breakeven across its obligation stack.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#A8672E] dark:text-[#D08F52] mt-0.5">▪</span>
                  <span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Queued Debt Supply Tsunami (Goldman Sachs):
                    </strong>{' '}
                    Recent IG spread calm was an artifact of a pause in AI bond issuance since
                    September; <span className="font-mono tabular-nums">~$150B</span> in chip
                    financing is queued to enter the market, with AI debt issuance projected to hit{' '}
                    <span className="font-mono tabular-nums font-semibold">$275B in 2027</span>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION: Quantitative Finance Framework and Market Interpretation */}
        <section className="space-y-8">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            Quantitative Finance Framework and Market Interpretation
          </h2>

          {/* 4.1 Reduced-Form Hazard Rate Mechanics */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Reduced-Form Hazard Rate Mechanics and the Recovery Rate Fallacy
            </h3>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              In reduced-form credit derivatives modeling (Jarrow-Turnbull and Duffie-Singleton),
              default is a Poisson arrival process governed by the risk-neutral{' '}
              <Term term="Hazard Rate (λ)" definition={JARGON_DEFINITIONS.HazardRate} /> and{' '}
              <Term term="Loss Given Default (LGD)" definition={JARGON_DEFINITIONS.LGD} />. While
              financial media reported that CoreWeave&apos;s{' '}
              <span className="font-mono tabular-nums">1,000+ bps</span> CDS implies a{' '}
              <span className="font-mono tabular-nums">63%</span> 5-year default probability under
              dealer screen defaults (<span className="font-mono tabular-nums">R = 40%</span>),
              substituting S&amp;P&apos;s empirical Recovery <span className="font-mono">&apos;5&apos;</span>{' '}
              estimate (<span className="font-mono tabular-nums">R = 10%, LGD = 90%</span>) reveals
              that the spread blowout reflects severe LGD compression from SPV asset encumbrance.
            </p>

            {/* Dark Monospace Formula Panel 1: Credit Triangle & Cumulative PD */}
            <FormulaPanel
              label="Reduced-Form Credit Triangle & Cumulative 5-Year Default Probability"
              math={[
                '\\lambda \\approx \\frac{s}{1 - R} \\quad \\text{where } \\text{LGD} = 1 - R',
                '\\mathbb{Q}(\\tau > T) = \\exp(-\\lambda T)',
                '\\text{PD}_5 = 1 - \\exp(-\\lambda T) = 1 - \\exp\\left(-\\frac{s}{1 - R} T\\right)',
              ]}
              workedExampleTitle="Worked Numeric Examples from October 2026 Market Prints (T = 5 Years)"
              workedExamples={[
                {
                  regime: 'Oracle (Oct 15 Record: s = 288 bps = 0.0288, IG Standard R = 40%)',
                  calculation: 'λ = 0.0288 / 0.60 = 4.80% p.a.  →  1 - exp(-0.048 × 5)',
                  result: 'PD_5 = 21.34% (20.40% at 261 bps)',
                  tone: 'negative',
                },
                {
                  regime: 'CoreWeave (Standard Dealer Screen: s = 1,000–1,140 bps, Screen R = 40%)',
                  calculation: 'λ ≈ 20.0% p.a. (w/ upfront points)  →  1 - exp(-1.0)',
                  result: 'PD_5 ≈ 63.21% (~63.0%)',
                  tone: 'negative',
                },
                {
                  regime: "CoreWeave (S&P Recovery '5' Adjusted: s = 1,000 bps = 0.10, R = 10%)",
                  calculation: 'λ_adj = 0.10 / (1 - 0.10) = 11.11% p.a.  →  1 - exp(-0.1111 × 5)',
                  result: 'PD_5,adj = 42.62% (LGD = 90%)',
                  tone: 'bronze',
                },
              ]}
              footnote="Note: PD_5 is a risk-neutral measure (Q-measure) embedding physical default risk (P-measure) plus an institutional liquidity and jump-to-default risk premium."
            />

            {/* Interactive Regime Inspector + Complete Table */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-serif text-base font-medium text-zinc-900 dark:text-zinc-100">
                  Interactive Recovery Rate Sensitivity &amp; Implied Hazard Rate Table
                </h4>
                <span className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52]">
                  Click any row to inspect regime mechanics
                </span>
              </div>

              {/* Selected Preset Highlight Bar */}
              <div className="px-4 py-3 bg-zinc-100/70 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-mono uppercase text-[#A8672E] dark:text-[#D08F52] font-semibold">
                    Selected: {hazardPresets[selectedHazardPreset].name}
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {hazardPresets[selectedHazardPreset].note}
                  </p>
                </div>
                <div className="font-mono tabular-nums flex items-center gap-3 shrink-0">
                  <span className="px-2 py-1 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    λ = {hazardPresets[selectedHazardPreset].lambdaPct}
                  </span>
                  <span className="px-2 py-1 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A] font-semibold">
                    5Y PD = {hazardPresets[selectedHazardPreset].pd5Pct}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] uppercase">
                      <th className="py-2.5 px-3.5">Reference Entity &amp; Pricing Regime</th>
                      <th className="py-2.5 px-3">CDS Par Spread (s)</th>
                      <th className="py-2.5 px-3">Assumed Recovery (R)</th>
                      <th className="py-2.5 px-3">LGD (1 - R)</th>
                      <th className="py-2.5 px-3">Annual Hazard (λ)</th>
                      <th className="py-2.5 px-3">5Y Survival</th>
                      <th className="py-2.5 px-3.5">5Y Implied PD_5</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono tabular-nums">
                    {hazardPresets.map((row, idx) => {
                      const isSelected = idx === selectedHazardPreset;
                      return (
                        <tr
                          key={idx}
                          onClick={() => setSelectedHazardPreset(idx)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#A8672E]/10 dark:bg-[#D08F52]/15'
                              : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                          }`}
                        >
                          <td className="py-2.5 px-3.5 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                            {row.name}
                          </td>
                          <td className="py-2.5 px-3">{row.spreadBps} bps</td>
                          <td className="py-2.5 px-3">{row.recoveryPct.toFixed(1)}%</td>
                          <td className="py-2.5 px-3">{row.lgdPct.toFixed(1)}%</td>
                          <td className="py-2.5 px-3 text-[#A8672E] dark:text-[#D08F52]">
                            {row.lambdaPct}
                          </td>
                          <td className="py-2.5 px-3">{row.survivalPct}</td>
                          <td className="py-2.5 px-3.5 font-semibold text-[#BC4128] dark:text-[#E2694A]">
                            {row.pd5Pct}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 4.2 Merton Structural Model */}
          <div className="space-y-4 pt-2">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-zinc-900 dark:text-zinc-100">
              The Merton (1974) Structural Model and the Asset Substitution Problem
            </h3>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              To explain why AI infrastructure equities frequently rally on massive capex
              announcements while their credit spreads widen sharply, PIMCO and quantitative credit
              strategists apply the{' '}
              <Term term="Merton (1974) Model" definition={JARGON_DEFINITIONS.MertonModel} /> and
              the{' '}
              <Term
                term="Asset Substitution (Vega)"
                definition={JARGON_DEFINITIONS.AssetSubstitution}
              />{' '}
              framework. Unobservable asset value (<span className="font-mono">V_A</span>) and asset
              volatility (<span className="font-mono">σ_A</span>) are solved via Newton-Raphson
              iteration from equity market cap (<span className="font-mono">E</span>) and equity
              volatility using <span className="font-mono">σ_E = (V_A / E) N(d_1) σ_A</span>.
            </p>

            {/* Dark Monospace Formula Panel 2: Merton Equations & Option Vega */}
            <FormulaPanel
              label="Merton (1974) Contingent Claims Pricing, Distance-to-Default & Option Vega"
              math={[
                'E = V_A \\mathcal{N}(d_1) - D e^{-rT} \\mathcal{N}(d_2)',
                'B = D e^{-rT} - \\left[ D e^{-rT} \\mathcal{N}(-d_2) - V_A \\mathcal{N}(-d_1) \\right]',
                'd_1 = \\frac{\\ln(V_A / D) + (r + \\frac{1}{2}\\sigma_A^2)T}{\\sigma_A \\sqrt{T}}, \\quad \\text{DD} = d_2 = d_1 - \\sigma_A \\sqrt{T}, \\quad \\text{PD}_{\\text{Merton}} = \\mathcal{N}(-d_2)',
                '\\mathcal{V}_E = \\frac{\\partial E}{\\partial \\sigma_A} = +V_A \\sqrt{T} \\phi(d_1) > 0, \\quad \\mathcal{V}_B = \\frac{\\partial B}{\\partial \\sigma_A} = -V_A \\sqrt{T} \\phi(d_1) < 0',
              ]}
              workedExampleTitle="Calibrated Merton Structural Regimes (T = 5 Years, r = 4.5%)"
              workedExamples={[
                {
                  regime: 'Historical Oracle Baseline (V_A / D = 3.50x, σ_A = 18.0%)',
                  calculation: 'DD = d_2 = +3.47σ  →  N(-3.47)',
                  result: 'PD_Merton = 0.03%',
                  tone: 'positive',
                },
                {
                  regime: 'Current Oracle w/ $288B Lease Stack (V_A / D = 1.60x, σ_A = 28.0%)',
                  calculation: 'DD compresses by 2.67σ to +0.80σ  →  N(-0.80)',
                  result: 'PD_Merton = 21.27% (Matches 288 bps CDS)',
                  tone: 'negative',
                },
                {
                  regime: 'Current CoreWeave Leveraged Neocloud (V_A / D = 1.15x, σ_A = 45.0%)',
                  calculation: 'DD pushed negative to -0.14σ  →  N(+0.14)',
                  result: 'PD_Merton = 55.59%',
                  tone: 'negative',
                },
              ]}
            />

            {/* Dichotomy: Equity Holders vs. Bondholders in the Merton Framework */}
            <DichotomyCard
              title="Jensen-Meckling Asset Substitution: Why Equities Rally While Bonds Sell Off"
              subtitle="Three simultaneous mechanisms transferring wealth from bondholders to shareholders during the AI capex surge"
              left={{
                label: 'Equity Holders (Long Call Option on Assets)',
                badge: '𝒱_E = +V_A √T ϕ(d_1) > 0',
                tone: 'positive',
                points: [
                  <>
                    <strong className="font-medium">Strictly Positive Vega:</strong> Shareholders
                    capture <span className="font-mono tabular-nums">100%</span> of the right-tail
                    upside if AI achieves super-exponential monetization, offsetting the higher debt
                    strike price <span className="font-mono">D</span>.
                  </>,
                  <>
                    <strong className="font-medium">Compute Scarcity Call Option:</strong> Equity
                    valuations view CoreWeave&apos;s{' '}
                    <span className="font-mono tabular-nums">1.5 GW</span> of active capacity (and
                    targeted <span className="font-mono tabular-nums">8+ GW</span>) as a high-vega
                    call option on future compute scarcity.
                  </>,
                ],
              }}
              right={{
                label: 'Bondholders (Short Put Option Struck at D)',
                badge: '𝒱_B = -V_A √T ϕ(d_1) < 0',
                tone: 'negative',
                points: [
                  <>
                    <strong className="font-medium">Higher Default Barrier Strike (D):</strong>{' '}
                    Incorporating Oracle&apos;s <span className="font-mono tabular-nums">$288B</span>{' '}
                    uncommenced leases pushes its effective obligation stack toward{' '}
                    <span className="font-mono tabular-nums">$457B</span>, compressing{' '}
                    <span className="font-mono">V_A / D</span> from{' '}
                    <span className="font-mono tabular-nums">3.5x</span> to{' '}
                    <span className="font-mono tabular-nums">1.6x</span>.
                  </>,
                  <>
                    <strong className="font-medium">Inflated Asset Volatility (σ_A):</strong>{' '}
                    Replacing predictable database cash flows (
                    <span className="font-mono tabular-nums">σ_A ≈ 18%</span>) with 3-to-5-year GPUs
                    exposed to OpenAI counterparty risk inflates{' '}
                    <span className="font-mono">σ_A</span> to{' '}
                    <span className="font-mono tabular-nums">~28%</span> (Oracle) and{' '}
                    <span className="font-mono tabular-nums">~45%</span> (CoreWeave), with zero
                    upside above par (<span className="font-mono">D</span>).
                  </>,
                ],
              }}
            />

            {/* Interactive Merton Regime Selector & Table */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-serif text-base font-medium text-zinc-900 dark:text-zinc-100">
                  Merton Distance-to-Default Calibration (<span className="font-mono">T = 5Y</span>,{' '}
                  <span className="font-mono">r = 4.5%</span>)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {mertonRegimes.map((reg, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedMertonRegime(i)}
                      className={`font-mono text-xs px-2.5 py-1 rounded border transition-colors ${
                        selectedMertonRegime === i
                          ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-zinc-950 border-[#A8672E] dark:border-[#D08F52] font-semibold'
                          : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      Regime {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-zinc-50/60 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm">
                <div className="font-mono font-semibold text-[#A8672E] dark:text-[#D08F52]">
                  {mertonRegimes[selectedMertonRegime].name}
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 mt-1">
                  {mertonRegimes[selectedMertonRegime].summary}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] uppercase">
                      <th className="py-2.5 px-4">Calibrated Merton Structural Regime</th>
                      <th className="py-2.5 px-3">Asset-to-Debt (V_A / D)</th>
                      <th className="py-2.5 px-3">Asset Volatility (σ_A)</th>
                      <th className="py-2.5 px-3">
                        <Term
                          term="Distance-to-Default (DD)"
                          definition={JARGON_DEFINITIONS.DistanceToDefault}
                        />
                      </th>
                      <th className="py-2.5 px-4">Structural 5Y PD N(-d_2)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono tabular-nums">
                    {mertonRegimes.map((row, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setSelectedMertonRegime(idx)}
                        className={`cursor-pointer ${
                          selectedMertonRegime === idx
                            ? 'bg-[#A8672E]/10 dark:bg-[#D08F52]/15'
                            : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                        }`}
                      >
                        <td className="py-3 px-4 font-sans font-medium text-zinc-900 dark:text-zinc-100">
                          {row.name}
                        </td>
                        <td className="py-3 px-3">{row.vaToD}</td>
                        <td className="py-3 px-3">{row.sigmaA}</td>
                        <td
                          className={`py-3 px-3 font-semibold ${
                            row.tone === 'positive'
                              ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                              : 'text-[#BC4128] dark:text-[#E2694A]'
                          }`}
                        >
                          {row.dd}
                        </td>
                        <td
                          className={`py-3 px-4 font-semibold ${
                            row.tone === 'positive'
                              ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                              : 'text-[#BC4128] dark:text-[#E2694A]'
                          }`}
                        >
                          {row.pd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 4.3 Positive CDS-Bond Basis, CTD, WWR */}
          <div className="space-y-4 pt-2">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Positive CDS-Bond Basis, Cheapest-to-Deliver Optionality, and Wrong-Way Risk
            </h3>

            {/* Dark Monospace Formula Panel 3: Positive CDS-Bond Basis & Wrong-Way Risk Covariance */}
            <FormulaPanel
              label="Cross-Market Microstructure Anomalies: CDS-Bond Basis & Wrong-Way Risk"
              math={[
                '\\text{Basis} = s_{\\text{CDS}} - z_{\\text{bond}} > 0',
                '\\operatorname{Cov}( \\text{PD}_{\\text{Offtaker}} , \\text{LGD}_{\\text{GPU Collateral}} ) > 0',
              ]}
              workedExampleTitle="Empirical Calibration in Oracle & CoreWeave (October 2026)"
              workedExamples={[
                {
                  regime: 'Oracle 5-Year Positive CDS-Bond Basis (Feb 2031 Senior Notes vs. 5Y CDS)',
                  calculation: 's_CDS (288 bps) - z_bond (+180 bps over 5Y UST at 6.23% YTM)',
                  result: '+108 bps Positive Basis',
                  tone: 'bronze',
                },
                {
                  regime: 'Oracle Cheapest-to-Deliver (CTD) Auction Deliverable Obligation',
                  calculation: '2031 Notes near par vs. long-dated 2056 Bonds (>8.3% YTM)',
                  result: '2056 Bonds trading @ ~82¢',
                  tone: 'negative',
                },
                {
                  regime: 'CoreWeave DDTL 5.0 / 5.5 GPU Collateral Wrong-Way Risk',
                  calculation: 'Industry AI revenue shortfall ($4.9T gap) → Tenant default + Idle GPU flood',
                  result: 'Spot rates & liquidation values collapse toward 0 in default states',
                  tone: 'negative',
                },
              ]}
            />

            {/* Bullet breakdown of Positive Basis & WWR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-2.5">
                <h4 className="font-serif text-base font-medium text-zinc-900 dark:text-zinc-100">
                  Three Drivers of Oracle&apos;s +108 bps{' '}
                  <Term
                    term="Positive CDS-Bond Basis"
                    definition={JARGON_DEFINITIONS.PositiveBasis}
                  />
                </h4>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#A8672E] dark:text-[#D08F52] mt-0.5">1.</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">
                        Non-Tradable Loan &amp; Lease Hedging:
                      </strong>{' '}
                      Commercial banks holding Oracle term loans—plus data-center landlords and
                      suppliers exposed to Oracle&apos;s{' '}
                      <span className="font-mono tabular-nums">$288B</span> uncommenced leases—buy
                      liquid 5Y CDS as a macro proxy hedge rather than shorting cash bonds.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#A8672E] dark:text-[#D08F52] mt-0.5">2.</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">
                        <Term term="CTD Optionality" definition={JARGON_DEFINITIONS.CTD} />:
                      </strong>{' '}
                      While 2031 bonds trade near par, Oracle&apos;s 2056 bonds trade at{' '}
                      <span className="font-mono tabular-nums">~82¢</span> (
                      <span className="font-mono tabular-nums">&gt;8.3% YTM</span>); protection
                      buyers deliver the 82-cent bonds in an ISDA credit event auction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#A8672E] dark:text-[#D08F52] mt-0.5">3.</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">
                        Fallen-Angel Convexity:
                      </strong>{' '}
                      Portfolio managers buy CDS ahead of a potential{' '}
                      <span className="font-mono">BBB-</span> to{' '}
                      <span className="font-mono">BB+</span> downgrade to front-run mandatory
                      selling of a <span className="font-mono tabular-nums">$125B+</span> debt
                      issuer by IG index trackers.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-2.5">
                <h4 className="font-serif text-base font-medium text-zinc-900 dark:text-zinc-100">
                  Acute <Term term="Wrong-Way Risk (WWR)" definition={JARGON_DEFINITIONS.WrongWayRisk} />{' '}
                  in CoreWeave&apos;s GPU SPVs
                </h4>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">
                        Flawed Independence Assumption:
                      </strong>{' '}
                      SPV debt pricing assumes first-lien GPU collateral and take-or-pay contracts
                      act as independent buffers—that if a non-IG tenant defaults on{' '}
                      <span className="font-mono">DDTL 5.0</span> or{' '}
                      <span className="font-mono">5.5</span>, lenders can seize H100/Blackwell GPUs
                      and re-lease them at prevailing spot rates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#BC4128] dark:text-[#E2694A] mt-0.5">▪</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">
                        Single Macro Factor Exposure:
                      </strong>{' '}
                      All AI model developers and neocloud tenants depend on commercial AI
                      monetization; an industry-wide revenue shortfall (Gartner&apos;s{' '}
                      <span className="font-mono tabular-nums">$4.9T</span> gap) that triggers
                      tenant defaults will simultaneously flood secondary markets with idle GPUs,
                      collapsing hardware liquidation values in the exact states of the world where
                      lenders foreclose.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Strategic Conclusions and Credit Market Outlook */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            Strategic Conclusions and Credit Market Outlook
          </h2>

          {/* Dichotomy: Fortress Hyperscalers vs. Leveraged Balance-Sheet Conduits */}
          <DichotomyCard
            title="Institutional Credit Bifurcation: Fortress Hyperscalers vs. Leveraged Conduits"
            subtitle="Structural separation between self-funded cloud incumbents and leveraged compute intermediaries"
            left={{
              label: 'Fortress Hyperscalers (MSFT, GOOGL, AMZN, META)',
              badge: 'AAA/Aaa to AA-/Aa3',
              tone: 'positive',
              points: [
                <>
                  Transitioned from purely self-funded capex to structural bond issuers as
                  capex-to-revenue ratios rose from{' '}
                  <span className="font-mono tabular-nums">10%–15%</span> historically to{' '}
                  <span className="font-mono tabular-nums">25%–50%+</span> in 2026.
                </>,
                <>
                  Protected by massive core operating cash flows and deep equity cushions (
                  <span className="font-mono tabular-nums font-semibold">18x to 51x</span>{' '}
                  equity-to-debt ratios) that insulate them from near-term credit distress.
                </>,
              ],
            }}
            right={{
              label: 'Leveraged Balance-Sheet Conduits (ORCL & CRWV)',
              badge: 'BBB- & B+ Rated',
              tone: 'negative',
              points: [
                <>
                  Act as leveraged conduits for OpenAI and compute buyers, absorbing multi-decade
                  lease liabilities (<span className="font-mono tabular-nums">$288B</span> at
                  Oracle) and massive front-loaded capex deficits (
                  <span className="font-mono tabular-nums">-$41.6B to -$45B</span> FY27 FCF at
                  Oracle; <span className="font-mono tabular-nums">&gt;$30B</span> annual capex at
                  CoreWeave).
                </>,
                <>
                  Reflexivity of the refinancing wall: CoreWeave&apos;s Q2 adjusted operating income
                  (<span className="font-mono tabular-nums">$128M</span>) covers only one-fifth of
                  quarterly interest (<span className="font-mono tabular-nums">$640M</span> in Q2,
                  rising to <span className="font-mono tabular-nums">~$900M</span> in Q3) while
                  needing <span className="font-mono tabular-nums">$33B–$35B</span> in capital;
                  Oracle faces a 2027–2029 collision as{' '}
                  <span className="font-mono tabular-nums">$288B</span> of leases commence alongside{' '}
                  <span className="font-mono tabular-nums">$17B</span> in debt maturities and{' '}
                  <span className="font-mono tabular-nums">$95B–$100B</span> peak capex.
                </>,
              ],
            }}
          />

          {/* Four Quantitative Contagion Signals Card */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">
                Four Quantitative Signals Monitoring Systemic Credit Contagion
              </h3>
              <span className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                Cross-Asset Desk Watchlist
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/50 space-y-1">
                <div className="font-mono tabular-nums text-xs font-semibold text-[#BC4128] dark:text-[#E2694A]">
                  Signal • Oracle 5Y CDS &gt; 300 bps Threshold
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  Whether Oracle&apos;s 5-year CDS sustains levels above{' '}
                  <span className="font-mono tabular-nums font-semibold">300 bps</span>, which
                  historically precedes rating agency action into speculative-grade (
                  <span className="font-mono">BB+</span>) territory and forced IG index selling.
                </p>
              </div>

              <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/50 space-y-1">
                <div className="font-mono tabular-nums text-xs font-semibold text-[#A8672E] dark:text-[#D08F52]">
                  Signal • CoreWeave IG vs. Non-IG SPV Spread Differential
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  The spread differential between CoreWeave&apos;s IG SPV paper (
                  <span className="font-mono">DDTL 4.0</span> at{' '}
                  <span className="font-mono tabular-nums">SOFR + 225 bps</span>) and non-IG SPV
                  tranches (<span className="font-mono">DDTL 5.0/5.5</span> at{' '}
                  <span className="font-mono tabular-nums">SOFR + 450–550 bps</span>) as the purest
                  real-time barometer of GPU residual value confidence.
                </p>
              </div>

              <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/50 space-y-1">
                <div className="font-mono tabular-nums text-xs font-semibold text-[#BC4128] dark:text-[#E2694A]">
                  Signal • 2.4x Contract-to-Loan Cash Trap Covenants
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  Potential breaches of the{' '}
                  <span className="font-mono tabular-nums font-semibold">2.4x</span>{' '}
                  contract-value-to-loan cash trap covenants inside CoreWeave&apos;s subsidiary
                  SPVs, which freeze cash distributions to the parent after three months.
                </p>
              </div>

              <div className="p-3.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/50 space-y-1">
                <div className="font-mono tabular-nums text-xs font-semibold text-[#A8672E] dark:text-[#D08F52]">
                  Signal • Primary Absorption of $150B–$275B AI Debt Queue
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  The ability of primary IG and high-yield markets to absorb the queued{' '}
                  <span className="font-mono tabular-nums font-semibold">$150B</span> in chip
                  financing and <span className="font-mono tabular-nums font-semibold">$275B</span>{' '}
                  in projected 2027 AI debt supply without wider corporate spread contagion.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
