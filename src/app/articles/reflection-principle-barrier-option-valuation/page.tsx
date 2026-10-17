'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

interface TooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

interface BenchmarkRow {
  optionType: 'Call' | 'Put';
  barrierDir: string;
  strikeRegime: string;
  vinFormula: string;
  voutFormula: string;
  signs: string;
  vinPrice: string;
  voutPrice: string;
  vanillaSum: string;
  isBoundaryNote?: boolean;
}

const DEFINITIONS: Record<string, string> = {
  firstPassageTime:
    'The first hitting time τ_a = inf{t ≥ 0 : W_t = a} at which a stochastic process crosses a predetermined threshold level a.',
  reflectionPrinciple:
    'A measure-preserving bijection between Brownian paths that hit level a before time T and end below a, and paths that hit a and end above a via reflection across y = a after τ_a.',
  strongMarkovProperty:
    'Conditioned on a finite stopping time τ_a < ∞, the post-stopping increment process Y_s = W_{τ_a + s} - W_{τ_a} is a standard Brownian motion independent of the pre-hit σ-algebra F_{τ_a}.',
  levyStable:
    'The probability distribution of the first passage time τ_a for driftless Brownian motion, also known as the zero-drift Inverse Gaussian distribution with density |a| / √(2πt³) exp(-a² / 2t).',
  skorohodMap:
    'Pathwise equivalence established by Paul Lévy showing the drawdown process X_t = M_t - W_t is equal in law to reflected Brownian motion |W_t|, where M_t acts as local time at zero.',
  girsanovTheorem:
    'An equivalent change of probability measure via an exponential martingale Z_t that removes drift from a Brownian motion so symmetric reflection can be applied.',
  radonNikodym:
    'The likelihood ratio derivative dP / dP̃ = exp(α X_T^α - ½ α² T) that re-weights terminal expectations when transforming back from the driftless measure; generates the (H / S_0)^{2μ} scaling factor.',
  methodOfImages:
    'A PDE boundary technique that enforces a zero-temperature Dirichlet boundary u(0, τ) = 0 by placing an anti-symmetric virtual source -u(-x, 0) across the barrier.',
  imageSpot:
    'The geometrically inverted spot price S_image = H² / S obtained by reflecting log-price ln S across ln H via ln S ↦ 2 ln H - ln S.',
  inOutParity:
    'The algebraic identity V_in + V_out = V_vanilla (for zero rebate E = F = 0), holding because a barrier contract either knocks in or survives knock-out.',
  wienerHopf:
    'A factorization decoupling pre-hit and post-hit trajectories in Kou’s double-exponential jump-diffusion model, enabled by the memoryless property of exponential jump overshoots.',
  lampertiTransform:
    'A spatial coordinate transformation x = ∫ du / (u σ(u)) that converts a state-dependent local volatility diffusion into a unit-diffusion process with non-linear drift.',
  discreteMonitoringBias:
    'A systematic O(Δt^{1/2}) = O(m^{-1/2}) Monte Carlo error caused by checking barrier breaches only at discrete grid points, missing inter-step Brownian excursions.',
  bgkCorrection:
    'Broadie-Glasserman-Kou (1997) asymptotic continuity correction that shifts the barrier by H exp(±β σ √Δt) with β = -ζ(1/2)/√(2π) ≈ 0.582597 to reconcile discrete and continuous monitoring.',
  brownianBridge:
    'The conditional probability law of a Brownian trajectory on [t_i, t_{i+1}] given its endpoints S_{t_i} and S_{t_{i+1}}, which is independent of drift ν and yields exact inter-step crossing probabilities p_i.',
  raoBlackwellization:
    'Conditional survival weighting via the Tower Property of expectation, multiplying terminal payoffs by ∏(1 - p_i) rather than drawing noisy Bernoulli kill indicators.',
  oneStepSurvival:
    'A variance-reduction and smoothing algorithm that samples Gaussian increments conditionally on surviving each step via Z_i = Φ⁻¹(u_i · Φ(z̄_i)), preventing wasted paths near the barrier.',
  reverseBarrier:
    'A knock-out option whose barrier H lies in-the-money relative to the strike K (e.g., Up-and-Out Call with K < H), creating a discontinuous payoff cliff at (H, T).',
  barrierOverhedging:
    'A desk risk-management practice that shifts the valuation barrier outward from H to H + δH so the pricing surface absorbs the digital cliff across a finite collar width δH, capping negative Delta at -(H - K)/δH.',
  pathwiseIPA:
    'Infinitesimal Perturbation Analysis, which differentiates the simulated payoff directly along each path; fails for raw barrier indicators because it misses the Dirac delta knockout boundary contribution.',
  lrm:
    'Likelihood Ratio Method (Glynn 1987; Broadie & Glasserman 1996), which differentiates the smooth transition density log-likelihood rather than the discontinuous payoff, at the cost of O(Δt⁻¹) variance growth.',
  vibratoMC:
    'A hybrid sensitivity estimator (Giles 2008) that evolves pathwise tangents up to step m - 1 and applies analytical conditional Gaussian expectation or LRM across the final time step.',
  malliavinLocalization:
    'An integration-by-parts technique on Wiener space using a localized cutoff function ψ(t) that vanishes before hitting time τ_H to compute unbiased Greeks without explicit transition densities.'
};

const REINER_RUBINSTEIN_BENCHMARKS: BenchmarkRow[] = [
  {
    optionType: 'Call',
    barrierDir: 'Down (H = 85 < S₀)',
    strikeRegime: 'K ≥ H (K = 90)',
    vinFormula: 'C + E',
    voutFormula: 'A - C + F',
    signs: '(+1, +1)',
    vinPrice: '2.5201',
    voutPrice: '14.1157',
    vanillaSum: '16.6358'
  },
  {
    optionType: 'Call',
    barrierDir: 'Down (H = 85 < S₀)',
    strikeRegime: 'K ≥ H (K = 100)',
    vinFormula: 'C + E',
    voutFormula: 'A - C + F',
    signs: '(+1, +1)',
    vinPrice: '1.2003',
    voutPrice: '9.9234',
    vanillaSum: '11.1238'
  },
  {
    optionType: 'Call',
    barrierDir: 'Down (H = 85 < S₀)',
    strikeRegime: 'K < H (K = 80†)',
    vinFormula: 'A - B + D + E',
    voutFormula: 'B - D + F',
    signs: '(+1, +1)',
    vinPrice: '4.7645',
    voutPrice: '18.5492',
    vanillaSum: '23.3137',
    isBoundaryNote: true
  },
  {
    optionType: 'Call',
    barrierDir: 'Up (H = 115 > S₀)',
    strikeRegime: 'K ≥ H (K = 115)',
    vinFormula: 'A + E',
    voutFormula: 'F',
    signs: '(+1, -1)',
    vinPrice: '5.4486',
    voutPrice: '0.0000',
    vanillaSum: '5.4486'
  },
  {
    optionType: 'Call',
    barrierDir: 'Up (H = 115 > S₀)',
    strikeRegime: 'K < H (K = 90)',
    vinFormula: 'B - C + D + E',
    voutFormula: 'A - B + C - D + F',
    signs: '(+1, -1)',
    vinPrice: '15.4276',
    voutPrice: '1.2082',
    vanillaSum: '16.6358'
  },
  {
    optionType: 'Call',
    barrierDir: 'Up (H = 115 > S₀)',
    strikeRegime: 'K < H (K = 110)',
    vinFormula: 'B - C + D + E',
    voutFormula: 'A - B + C - D + F',
    signs: '(+1, -1)',
    vinPrice: '7.1027',
    voutPrice: '0.0094',
    vanillaSum: '7.1121'
  },
  {
    optionType: 'Put',
    barrierDir: 'Down (H = 85 < S₀)',
    strikeRegime: 'K > H (K = 90)',
    vinFormula: 'B - C + D + E',
    voutFormula: 'A - B + C - D + F',
    signs: '(-1, +1)',
    vinPrice: '4.2090',
    voutPrice: '0.0176',
    vanillaSum: '4.2266'
  },
  {
    optionType: 'Put',
    barrierDir: 'Down (H = 85 < S₀)',
    strikeRegime: 'K > H (K = 110)',
    vinFormula: 'B - C + D + E',
    voutFormula: 'A - B + C - D + F',
    signs: '(-1, +1)',
    vinPrice: '12.0787',
    voutPrice: '1.6488',
    vanillaSum: '13.7275'
  },
  {
    optionType: 'Put',
    barrierDir: 'Down (H = 85 < S₀)',
    strikeRegime: 'K ≤ H (K = 85)',
    vinFormula: 'A + E',
    voutFormula: 'F',
    signs: '(-1, +1)',
    vinPrice: '2.6253',
    voutPrice: '0.0000',
    vanillaSum: '2.6253'
  },
  {
    optionType: 'Put',
    barrierDir: 'Up (H = 115 > S₀)',
    strikeRegime: 'K > H (K = 120†)',
    vinFormula: 'A - B + D + E',
    voutFormula: 'B - D + F',
    signs: '(-1, -1)',
    vinPrice: '4.8962',
    voutPrice: '15.4678',
    vanillaSum: '20.3640',
    isBoundaryNote: true
  },
  {
    optionType: 'Put',
    barrierDir: 'Up (H = 115 > S₀)',
    strikeRegime: 'K ≤ H (K = 90)',
    vinFormula: 'C + E',
    voutFormula: 'A - C + F',
    signs: '(-1, -1)',
    vinPrice: '0.5252',
    voutPrice: '3.7014',
    vanillaSum: '4.2266'
  },
  {
    optionType: 'Put',
    barrierDir: 'Up (H = 115 > S₀)',
    strikeRegime: 'K ≤ H (K = 110)',
    vinFormula: 'C + E',
    voutFormula: 'A - C + F',
    signs: '(-1, -1)',
    vinPrice: '3.1303',
    voutPrice: '10.5972',
    vanillaSum: '13.7275'
  }
];

function JargonTerm({ term, definition, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      tabIndex={0}
      role="button"
      aria-label={`${term}: ${definition}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      }}
      className="relative inline-block cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] font-medium focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm"
    >
      {children || term}
      {open && (
        <span
          role="tooltip"
          className="z-50 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 rounded-md shadow-xl bg-[#14171B] dark:bg-[#05070A] text-white border border-neutral-700 dark:border-neutral-800 text-xs font-sans leading-relaxed pointer-events-none block text-left"
        >
          <span className="block font-semibold text-[#D08F52] dark:text-[#D08F52] mb-1">
            {term}
          </span>
          <span className="block text-neutral-200 dark:text-neutral-300">{definition}</span>
        </span>
      )}
    </span>
  );
}

function FormulaPanel({
  label,
  formulas,
  workedExample
}: {
  label: string;
  formulas: string[];
  workedExample?: {
    title: string;
    details: string[];
  };
}) {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-neutral-800 dark:border-neutral-800 bg-[#14171B] dark:bg-[#05070A] text-white shadow-sm">
      <div className="px-4 py-2 border-b border-neutral-800 dark:border-neutral-800 flex items-center justify-between bg-[#1A1E24] dark:bg-[#0A0D12]">
        <span className="text-xs font-mono uppercase tracking-wider text-[#D08F52] dark:text-[#D08F52]">
          {label}
        </span>
        <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
          Analytical Identity
        </span>
      </div>
      <div className="p-4 overflow-x-auto space-y-3">
        {formulas.map((eq, idx) => (
          <MathBlock key={idx} math={eq} className="text-neutral-100" />
        ))}
      </div>
      {workedExample && (
        <div className="px-4 py-3 border-t border-neutral-800 dark:border-neutral-800 bg-[#101317] dark:bg-[#030406] font-mono tabular-nums text-xs">
          <div className="text-[#3CBF9C] dark:text-[#3CBF9C] font-semibold mb-1.5">
            {workedExample.title}
          </div>
          <ul className="space-y-1 text-neutral-300 dark:text-neutral-300">
            {workedExample.details.map((line, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#D08F52] dark:text-[#D08F52] select-none">›</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DichotomyCard({
  title,
  leftTitle,
  leftBadge,
  leftTone = 'neutral',
  leftItems,
  rightTitle,
  rightBadge,
  rightTone = 'neutral',
  rightItems
}: {
  title: string;
  leftTitle: string;
  leftBadge?: string;
  leftTone?: 'positive' | 'negative' | 'neutral' | 'accent';
  leftItems: React.ReactNode[];
  rightTitle: string;
  rightBadge?: string;
  rightTone?: 'positive' | 'negative' | 'neutral' | 'accent';
  rightItems: React.ReactNode[];
}) {
  const getToneClasses = (tone: string) => {
    if (tone === 'positive') return 'text-[#1D8A70] dark:text-[#3CBF9C]';
    if (tone === 'negative') return 'text-[#BC4128] dark:text-[#E2694A]';
    if (tone === 'accent') return 'text-[#A8672E] dark:text-[#D08F52]';
    return 'text-neutral-900 dark:text-neutral-100';
  };

  return (
    <div className="my-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-800">
        <h4 className="font-serif text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className={`font-serif font-semibold text-sm sm:text-base ${getToneClasses(leftTone)}`}>
              {leftTitle}
            </span>
            {leftBadge && (
              <span className="font-mono tabular-nums text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {leftBadge}
              </span>
            )}
          </div>
          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            {leftItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className={`font-serif font-semibold text-sm sm:text-base ${getToneClasses(rightTone)}`}>
              {rightTitle}
            </span>
            {rightBadge && (
              <span className="font-mono tabular-nums text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {rightBadge}
              </span>
            )}
          </div>
          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            {rightItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BarrierOptionArticlePage() {
  const [rrFilter, setRrFilter] = useState<'ALL' | 'Call' | 'Put'>('ALL');
  const [selectedMaturity, setSelectedMaturity] = useState<'1.00' | '0.20' | '0.02'>('0.02');

  const filteredBenchmarks = REINER_RUBINSTEIN_BENCHMARKS.filter(
    (row) => rrFilter === 'ALL' || row.optionType === rrFilter
  );

  return (
    <ArticleFrame
      slug="reflection-principle-barrier-option-valuation"
      additionalDisclaimer="Barrier options carry severe path-dependent knock-out and pin risks. Unbounded Greek sensitivities and discontinuous payoffs near barrier boundaries require specialized risk management protocols and are not suitable for all investors."
    >
      <div className="max-w-5xl mx-auto space-y-12 text-neutral-900 dark:text-neutral-100 font-sans">
        {/* COMPACT STANDOUT STAT ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              BGK Continuity Constant (β)
            </div>
            <div className="font-mono tabular-nums text-xl font-semibold text-[#A8672E] dark:text-[#D08F52] mt-1">
              0.582597
            </div>
            <div className="font-mono tabular-nums text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              -ζ(1/2) / √(2π) shift factor
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Crude Discrete MC Bias (m = 12)
            </div>
            <div className="font-mono tabular-nums text-xl font-semibold text-[#BC4128] dark:text-[#E2694A] mt-1">
              +$0.5604 (+5.65%)
            </div>
            <div className="font-mono tabular-nums text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              <InlineMath math="O(\Delta t^{1/2})" /> error vs. $9.9234 exact
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Reverse Knock-Out Pin Delta
            </div>
            <div className="font-mono tabular-nums text-xl font-semibold text-[#BC4128] dark:text-[#E2694A] mt-1">
              -3.9329 Δ
            </div>
            <div className="font-mono tabular-nums text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              At S = 114.8, H = 115, T = 0.02 yr
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Closed-Form Quoting Latency
            </div>
            <div className="font-mono tabular-nums text-xl font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mt-1">
              1–10 μs
            </div>
            <div className="font-mono tabular-nums text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              vs. 100–500 ms for 10⁵–5×10⁵ MC paths
            </div>
          </div>
        </div>

        {/* KEY TAKEAWAYS CARD */}
        <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <h2 className="font-serif text-base sm:text-lg font-medium text-[#A8672E] dark:text-[#D08F52] mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2.5">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
              <span>
                <strong className="text-neutral-900 dark:text-neutral-100">Probabilistic &amp; PDE Duality:</strong>{' '}
                Removing drift via{' '}
                <JargonTerm term="Girsanov's Theorem" definition={DEFINITIONS.girsanovTheorem} />{' '}
                in stochastic calculus and eliminating the convection term in the Black-Scholes PDE via the{' '}
                <JargonTerm term="Method of Images" definition={DEFINITIONS.methodOfImages} />{' '}
                both generate the identical scaling multiplier{' '}
                <span className="font-mono tabular-nums">(H / S₀)²μ</span> and reflected spot{' '}
                <span className="font-mono tabular-nums">S_image = H² / S</span>.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
              <span>
                <strong className="text-neutral-900 dark:text-neutral-100">Monte Carlo Discretization Remediation:</strong>{' '}
                Checking barrier breaches only at discrete time steps degrades weak convergence from{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">O(Δt)</span> to{' '}
                <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">O(Δt¹/²)</span>; applying{' '}
                <JargonTerm term="Rao-Blackwellization" definition={DEFINITIONS.raoBlackwellization}>
                  Rao-Blackwellized Brownian Bridge survival weights
                </JargonTerm>{' '}
                <span className="font-mono tabular-nums">∏(1 - p_i)</span> eliminates bias in GBM and restores{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">O(Δt)</span> convergence in general diffusions.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
              <span>
                <strong className="text-neutral-900 dark:text-neutral-100">Pin Risk &amp; Unbiased Sensitivity Estimation:</strong>{' '}
                In-the-money knock-out barriers exhibit unbounded negative Delta (reaching{' '}
                <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-3.9329</span> near expiry), while discontinuous indicators invalidate naive{' '}
                <JargonTerm term="Infinitesimal Perturbation Analysis (IPA)" definition={DEFINITIONS.pathwiseIPA}>
                  pathwise IPA differentiation
                </JargonTerm>{' '}
                unless smoothed via{' '}
                <JargonTerm term="One-Step Survival (OSS)" definition={DEFINITIONS.oneStepSurvival} />{' '}
                or{' '}
                <JargonTerm term="Vibrato Monte Carlo" definition={DEFINITIONS.vibratoMC} />.
              </span>
            </li>
          </ul>
        </div>

        {/* SECTION 1 */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-950 dark:text-neutral-50 border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Stochastic Foundations of the Reflection Principle
          </h2>

          <DichotomyCard
            title="Contract Payoff Architecture: European Vanilla vs. Barrier Contingent Claims"
            leftTitle="European Vanilla Contracts"
            leftBadge="Terminal Law W_T"
            leftTone="neutral"
            leftItems={[
              'Payoff depends strictly on the terminal distribution of the underlying asset at maturity T.',
              'Path history prior to T has zero impact on contract survival or exercise value.',
              'Standard Euler-Maruyama discretization achieves O(Δt) = O(m⁻¹) weak convergence.'
            ]}
            rightTitle="Barrier Contingent Claims"
            rightBadge="Joint Law (M_T, W_T)"
            rightTone="accent"
            rightItems={[
              <>
                Survival or activation is governed by the{' '}
                <JargonTerm term="First Passage Time (τ_a)" definition={DEFINITIONS.firstPassageTime}>
                  first passage time
                </JargonTerm>{' '}
                across a predetermined boundary.
              </>,
              'Requires resolving the joint probability law of the diffusion process and its running extrema over [0, T].',
              'Subject to inter-step excursion risk and boundary value discontinuities at (H, T).'
            ]}
          />

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Pathwise Symmetry and the Strong Markov Property
            </h3>

            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  On a complete filtered probability space <span className="font-mono tabular-nums">(Ω, F, (F_t)_{'{t≥0}'}, P)</span> supporting a standard 1D Brownian motion <span className="font-mono tabular-nums">W_0 = 0</span>, the running maximum <span className="font-mono tabular-nums">M_T = sup_{'{0≤t≤T}'} W_t</span> satisfies <span className="font-mono tabular-nums">M_T ≥ W_T</span> almost surely.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  By sample path continuity, the running maximum reaching <span className="font-mono tabular-nums">a &gt; 0</span> is identical to the{' '}
                  <JargonTerm term="First Passage Time (τ_a)" definition={DEFINITIONS.firstPassageTime}>
                    first hitting time
                  </JargonTerm>{' '}
                  occurring on or before <span className="font-mono tabular-nums">T</span>: <span className="font-mono tabular-nums">{'{M_T ≥ a} = {τ_a ≤ T}'}</span>, where <span className="font-mono tabular-nums">τ_a</span> is a valid <span className="font-mono tabular-nums">F_t</span>-stopping time.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  Proving that the reflected process <span className="font-mono tabular-nums">W̃_t</span> is a standard Brownian motion requires three rigorous properties because reflection occurs at a random stopping time <span className="font-mono tabular-nums">τ_a</span>:
                </span>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="font-serif font-medium text-sm text-[#A8672E] dark:text-[#D08F52] mb-1">
                  Post-Stopping Independence
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  By the{' '}
                  <JargonTerm term="Strong Markov Property" definition={DEFINITIONS.strongMarkovProperty}>
                    strong Markov property
                  </JargonTerm>
                  , conditioned on <span className="font-mono tabular-nums">{'{τ_a < ∞}'}</span>, the increment <span className="font-mono tabular-nums">Y_s = W_{'{τ_a + s}'} - W_{'{τ_a}'}</span> is a standard Brownian motion independent of <span className="font-mono tabular-nums">F_{'{τ_a}'}</span>.
                </p>
              </div>
              <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="font-serif font-medium text-sm text-[#A8672E] dark:text-[#D08F52] mb-1">
                  Centered Gaussian Symmetry
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  By spatial symmetry of centered Gaussian increments, the negated post-hit increment <span className="font-mono tabular-nums">-Y_s = -(W_{'{τ_a + s}'} - a)</span> has the exact same law as <span className="font-mono tabular-nums">Y_s</span> and remains independent of <span className="font-mono tabular-nums">F_{'{τ_a}'}</span>.
                </p>
              </div>
              <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="font-serif font-medium text-sm text-[#A8672E] dark:text-[#D08F52] mb-1">
                  Continuous Path Splicing
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Because <span className="font-mono tabular-nums">W_{'{τ_a}'} = a</span> almost surely by continuity, splicing <span className="font-mono tabular-nums">W_t</span> (<span className="font-mono tabular-nums">t ≤ τ_a</span>) with <span className="font-mono tabular-nums">2a - W_t</span> (<span className="font-mono tabular-nums">t &gt; τ_a</span>) produces a continuous trajectory without jump discontinuity.
                </p>
              </div>
            </div>

            <FormulaPanel
              label="Reflected Process, Fundamental Reflection Identity & First-Passage Density"
              formulas={[
                '\\tau_a = \\inf\\{ t \\ge 0 : W_t = a \\}',
                '\\tilde{W}_t = \\begin{cases} W_t & t \\le \\tau_a \\\\ 2a - W_t & t > \\tau_a \\end{cases}',
                'P(\\tau_a \\le T) = P(\\tau_a \\le T, W_T \\ge a) + P(\\tau_a \\le T, W_T < a) = 2P(W_T \\ge a)',
                'P(M_T \\ge a) = P(\\tau_a \\le T) = 2 P(W_T \\ge a) = \\frac{2}{\\sqrt{2\\pi T}} \\int_a^\\infty e^{-x^2 / 2T} \\, dx',
                'f_{M_T}(a) = \\sqrt{\\frac{2}{\\pi T}} \\exp\\left(-\\frac{a^2}{2T}\\right) \\mathbf{1}_{a \\ge 0}',
                'f_{\\tau_a}(t) = \\frac{|a|}{\\sqrt{2\\pi t^3}} \\exp\\left(-\\frac{a^2}{2t}\\right), \\quad t > 0'
              ]}
            />

            <DichotomyCard
              title="Marginal Equivalence vs. Pathwise Drawdown Equivalence"
              leftTitle="Marginal Equivalence: M_t =^d |W_t|"
              leftBadge="Fixed Horizon T"
              leftTone="neutral"
              leftItems={[
                'For any fixed T > 0, M_T and |W_T| share the exact same folded normal marginal distribution on [0, ∞).',
                'Pathwise dynamics differ fundamentally: t ↦ M_t is monotonically non-decreasing, whereas t ↦ |W_t| oscillates continuously.'
              ]}
              rightTitle="Pathwise Equivalence: X_t = M_t - W_t =^d |W_t|"
              rightBadge="Entire Process Law"
              rightTone="positive"
              rightItems={[
                <>
                  Established by Paul Lévy via the{' '}
                  <JargonTerm term="Skorohod Reflection Map" definition={DEFINITIONS.skorohodMap}>
                    Skorohod reflection map
                  </JargonTerm>
                  .
                </>,
                'The drawdown process X_t = M_t - W_t is equal in law as an entire stochastic process to reflected Brownian motion (|W_t|)_{t≥0}, with M_t acting as local time at zero.'
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Joint Law of the Running Extrema and Terminal Value
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  A trajectory achieves maximum <span className="font-mono tabular-nums">M_T ≥ a</span> (<span className="font-mono tabular-nums">a &gt; 0</span>) and finishes at <span className="font-mono tabular-nums">W_T ≤ b</span> (<span className="font-mono tabular-nums">b ≤ a</span>) if and only if its reflected path finishes at <span className="font-mono tabular-nums">W̃_T = 2a - W_T ≥ 2a - b ≥ a</span>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  Taking the negative mixed partial derivative <span className="font-mono tabular-nums">-∂² / (∂m ∂w)</span> of the joint distribution yields the canonical joint density <span className="font-mono tabular-nums">f_{'{M_T, W_T}'}(m, w)</span>.
                </span>
              </li>
            </ul>

            <FormulaPanel
              label="Joint Distribution & Density of (M_T, W_T) and Running Minimum Symmetry"
              formulas={[
                'P(M_T \\ge a, W_T \\le b) = P(\\tilde{W}_T \\ge 2a - b) = 1 - \\Phi\\left(\\frac{2a - b}{\\sqrt{T}}\\right), \\quad (a > 0, b \\le a)',
                'f_{M_T, W_T}(m, w) = \\frac{2(2m - w)}{T\\sqrt{2\\pi T}} \\exp\\left(-\\frac{(2m - w)^2}{2T}\\right), \\quad (m \\ge 0, w \\le m)',
                'P(m_T \\le a, W_T \\ge b) = \\Phi\\left(\\frac{2a - b}{\\sqrt{T}}\\right), \\quad (a < 0, b \\ge a, \\text{ where } m_T = \\inf_{0\\le t\\le T} W_t)'
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Drift Adjustments via Girsanov&apos;s Theorem
            </h3>

            <DichotomyCard
              title="Reflecting Driftless vs. Drifted Brownian Motion"
              leftTitle="Naive Post-Hit Reflection (Fails with Drift α ≠ 0)"
              leftBadge="Broken Symmetry"
              leftTone="negative"
              leftItems={[
                'For X_t^α = αt + W_t, reflecting across a after τ_a maps the post-hit increment from α(t - τ_a) + (W_t - W_{τ_a}) to -α(t - τ_a) - (W_t - W_{τ_a}).',
                'The reflected trajectory carries drift -α while the original trajectory carries drift +α, making their probability laws mutually asymmetric.'
              ]}
              rightTitle="Girsanov Measure Change + Terminal Re-Weighting"
              rightBadge="Restored Symmetry"
              rightTone="positive"
              rightItems={[
                <>
                  Applies{' '}
                  <JargonTerm term="Girsanov's Theorem" definition={DEFINITIONS.girsanovTheorem} />{' '}
                  via exponential martingale <span className="font-mono tabular-nums">Z_t = exp(-αW_t - ½α²t)</span> so <span className="font-mono tabular-nums">X_t^α</span> is driftless under <span className="font-mono tabular-nums">P̃</span>.
                </>,
                <>
                  Because the{' '}
                  <JargonTerm term="Radon-Nikodym Derivative" definition={DEFINITIONS.radonNikodym}>
                    Radon-Nikodym factor
                  </JargonTerm>{' '}
                  <span className="font-mono tabular-nums">Z_T⁻¹ = exp(αX_T^α - ½α²T)</span> depends strictly on terminal <span className="font-mono tabular-nums">X_T^α</span>, completing the square factors out the constant multiplier <span className="font-mono tabular-nums">e^{'{2αa}'} = (H / S₀)^{'{2μ}'}</span>.
                </>
              ]}
            />

            <FormulaPanel
              label="Girsanov Measure Change, Drifted Joint Law & Black-Scholes Scaling Factor"
              formulas={[
                'Z_t = \\exp\\left(-\\alpha W_t - \\frac{1}{2}\\alpha^2 t\\right), \\quad \\frac{dP}{d\\tilde{P}} = Z_T^{-1} = \\exp\\left(\\alpha X_T^\\alpha - \\frac{1}{2}\\alpha^2 T\\right)',
                'f_{M_T^\\alpha, X_T^\\alpha}(m, x) = \\exp\\left(\\alpha x - \\frac{1}{2}\\alpha^2 T\\right) \\cdot \\frac{2(2m - x)}{T\\sqrt{2\\pi T}} \\exp\\left(-\\frac{(2m - x)^2}{2T}\\right)',
                'P(M_T^\\alpha \\ge a, X_T^\\alpha \\le b) = \\exp(2\\alpha a) \\Phi\\left(\\frac{b - 2a - \\alpha T}{\\sqrt{T}}\\right), \\quad (a > 0, b \\le a)',
                'P(M_T^\\alpha \\ge a) = P(\\tau_a^\\alpha \\le T) = 1 - \\Phi\\left(\\frac{a - \\alpha T}{\\sqrt{T}}\\right) + \\exp(2\\alpha a) \\Phi\\left(\\frac{-a - \\alpha T}{\\sqrt{T}}\\right)',
                'f_{\\tau_a^\\alpha}(t) = \\frac{|a|}{\\sqrt{2\\pi t^3}} \\exp\\left(-\\frac{(a - \\alpha t)^2}{2t}\\right), \\quad t > 0',
                'e^{2\\alpha a} = \\exp\\left( 2 \\left[\\frac{b - \\frac{1}{2}\\sigma^2}{\\sigma}\\right] \\cdot \\left[\\frac{1}{\\sigma} \\ln\\left(\\frac{H}{S_0}\\right)\\right] \\right) = \\left(\\frac{H}{S_0}\\right)^{2\\mu}, \\quad \\mu = \\frac{b - \\frac{1}{2}\\sigma^2}{\\sigma^2}'
              ]}
              workedExample={{
                title: 'Structural Origin of (H / S₀)²μ in Black-Scholes-Merton:',
                details: [
                  'Normalized log-price X_t^α = (1/σ) ln(S_t / S₀) has drift α = (b - ½σ²)/σ and barrier threshold a = (1/σ) ln(H / S₀).',
                  'For baseline parameters S₀ = 100, H = 85, r = 0.05, q = 0.02 (b = 0.03), σ = 0.25: μ = (0.03 - 0.03125) / 0.0625 = -0.02, and (H / S₀)^{2μ} = (85 / 100)^{-0.04} ≈ 1.00652.'
                ]
              }}
            />
          </div>
        </section>

        {/* INLINE INFOGRAPHIC */}
        <div className="my-8">
          <InfographicSlot alt="The Reflection Principle and Barrier Option Valuation Architecture" />
        </div>

        {/* SECTION 2 */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-950 dark:text-neutral-50 border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Analytical Barrier Option Pricing: PDEs, Method of Images, and the Reiner-Rubinstein Architecture
          </h2>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Duality of the Probabilistic Method and the PDE Method of Images
            </h3>

            <DichotomyCard
              title="Mathematical Duality: PDE Method of Images vs. Probabilistic Girsanov Reflection"
              leftTitle="PDE Method of Images"
              leftBadge="Gauge Factor e^{αx}"
              leftTone="accent"
              leftItems={[
                'Solves Black-Scholes PDE on H < S < ∞ with absorbing Dirichlet condition C_{do}(H, t) = 0.',
                'Transforms variable-coefficient PDE to pure heat equation ∂u/∂τ = ∂²u/∂x² using gauge C_{do} = H e^{αx + βτ} u(x, τ) with α = -μ to eliminate first-order convection.',
                <>
                  Odd extension <span className="font-mono tabular-nums">u(x, τ) = U_v(x, τ) - U_v(-x, τ)</span> across <span className="font-mono tabular-nums">x = 0</span> creates mismatch between <span className="font-mono tabular-nums">e^{'{αx}'}</span> and <span className="font-mono tabular-nums">e^{'{-αx}'}</span>, yielding <span className="font-mono tabular-nums">(H / S)^{'{2μ}'}</span> and{' '}
                  <JargonTerm term="Reflected Image Spot (H² / S)" definition={DEFINITIONS.imageSpot}>
                    S_image = H² / S
                  </JargonTerm>
                  .
                </>
              ]}
              rightTitle="Probabilistic Girsanov Reflection"
              rightBadge="Likelihood Ratio e^{2αa}"
              rightTone="positive"
              rightItems={[
                'Integrates discounted terminal payoff against the drifted joint density f_{M_T^α, X_T^α}(m, x).',
                'Introduces the exact same exponential gauge factor via Girsanov’s Theorem to eliminate drift from Brownian motion.',
                'Reflecting log-price across ln H via ln S ↦ 2 ln H - ln S maps directly under exponentiation to evaluating the vanilla pricing function at H² / S weighted by (H / S)^{2μ}.'
              ]}
            />

            <FormulaPanel
              label="Black-Scholes PDE Transformation & Method of Images Identity (Down-and-Out Call, K ≥ H)"
              formulas={[
                '\\frac{\\partial C_{do}}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 C_{do}}{\\partial S^2} + (r - q)S \\frac{\\partial C_{do}}{\\partial S} - r C_{do} = 0, \\quad C_{do}(H, t) = 0',
                'S = H e^x, \\quad t = T - \\frac{2\\tau}{\\sigma^2}, \\quad C_{do}(S, t) = H e^{\\alpha x + \\beta \\tau} u(x, \\tau)',
                '\\alpha = -\\mu = \\frac{1}{2} - \\frac{r - q}{\\sigma^2}, \\quad \\beta = -\\mu^2 - \\frac{2r}{\\sigma^2}',
                'u(x, \\tau) = U_v(x, \\tau) - U_v(-x, \\tau) \\implies C_{do}(S, t) = C_v(S, t; K) - \\left(\\frac{H}{S}\\right)^{2\\mu} C_v\\left(\\frac{H^2}{S}, t; K\\right)'
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Complete Reiner-Rubinstein (1991) Decomposition
            </h3>

            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  Unifies all eight European single-barrier contracts across both strike-barrier regimes (<span className="font-mono tabular-nums">K ≥ H</span> and <span className="font-mono tabular-nums">K &lt; H</span>) and cash rebates <span className="font-mono tabular-nums">R</span> using binary indicators <span className="font-mono tabular-nums">ϕ ∈ {'{+1 Call, -1 Put}'}</span> and <span className="font-mono tabular-nums">η ∈ {'{+1 Down, -1 Up}'}</span>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  Assembles every contract price as a linear combination of six fundamental building blocks <span className="font-mono tabular-nums">A, B, C, D, E, F</span>:
                </span>
              </li>
            </ul>

            <FormulaPanel
              label="Reiner-Rubinstein Auxiliary Parameters & Six Fundamental Building Blocks (A–F)"
              formulas={[
                '\\mu = \\frac{b - \\frac{1}{2}\\sigma^2}{\\sigma^2}, \\quad \\lambda = \\sqrt{\\mu^2 + \\frac{2r}{\\sigma^2}}',
                'x_1 = \\frac{\\ln(S/K)}{\\sigma\\sqrt{T}} + (1 + \\mu)\\sigma\\sqrt{T}, \\quad x_2 = \\frac{\\ln(S/H)}{\\sigma\\sqrt{T}} + (1 + \\mu)\\sigma\\sqrt{T}',
                'y_1 = \\frac{\\ln(H^2 / (SK))}{\\sigma\\sqrt{T}} + (1 + \\mu)\\sigma\\sqrt{T}, \\quad y_2 = \\frac{\\ln(H/S)}{\\sigma\\sqrt{T}} + (1 + \\mu)\\sigma\\sqrt{T}, \\quad z = \\frac{\\ln(H/S)}{\\sigma\\sqrt{T}} + \\lambda\\sigma\\sqrt{T}',
                'A = \\phi S e^{(b-r)T} \\Phi(\\phi x_1) - \\phi K e^{-rT} \\Phi(\\phi x_1 - \\phi \\sigma\\sqrt{T}) \\quad [\\text{Direct Vanilla Integral from } K]',
                'B = \\phi S e^{(b-r)T} \\Phi(\\phi x_2) - \\phi K e^{-rT} \\Phi(\\phi x_2 - \\phi \\sigma\\sqrt{T}) \\quad [\\text{Direct Integral Truncated at } H]',
                'C = \\phi S e^{(b-r)T} \\left(\\frac{H}{S}\\right)^{2(\\mu+1)} \\Phi(\\eta y_1) - \\phi K e^{-rT} \\left(\\frac{H}{S}\\right)^{2\\mu} \\Phi(\\eta y_1 - \\eta \\sigma\\sqrt{T}) \\quad [\\text{Reflected Image Integral from } K]',
                'D = \\phi S e^{(b-r)T} \\left(\\frac{H}{S}\\right)^{2(\\mu+1)} \\Phi(\\eta y_2) - \\phi K e^{-rT} \\left(\\frac{H}{S}\\right)^{2\\mu} \\Phi(\\eta y_2 - \\eta \\sigma\\sqrt{T}) \\quad [\\text{Reflected Image Truncated at } H]',
                'E = R e^{-rT} \\left[ \\Phi(\\eta x_2 - \\eta \\sigma\\sqrt{T}) - \\left(\\frac{H}{S}\\right)^{2\\mu} \\Phi(\\eta y_2 - \\eta \\sigma\\sqrt{T}) \\right] \\quad [\\text{Knock-In Rebate at } T]',
                'F = R \\left[ \\left(\\frac{H}{S}\\right)^{\\mu+\\lambda} \\Phi(\\eta z) + \\left(\\frac{H}{S}\\right)^{\\mu-\\lambda} \\Phi(\\eta z - 2\\eta \\lambda \\sigma\\sqrt{T}) \\right] \\quad [\\text{Knock-Out Rebate at } \\tau_H]'
              ]}
            />

            <DichotomyCard
              title="Strike-Barrier Integration Regimes & Rebate Payment Timing"
              leftTitle="Out-of-the-Money Barrier (e.g., Call K ≥ H) & Rebate E"
              leftBadge="Blocks A, C, E"
              leftTone="neutral"
              leftItems={[
                'For a Down-and-Out Call with K ≥ H, any path finishing in-the-money (S_T > K) automatically finishes above the barrier (S_T > H).',
                'Subtracting image C from vanilla A (C_{do} = A - C + F) removes all paths that touched H and ended above K.',
                'Rebate E (for Knock-In failing to hit H) is paid at maturity T: E = R e^{-rT} P(τ_H > T).'
              ]}
              rightTitle="In-the-Money Barrier (e.g., Call K < H) & Rebate F"
              rightBadge="Blocks B, D, F"
              rightTone="accent"
              rightItems={[
                'When K < H, paths finishing in K < S_T ≤ H are guaranteed by continuity to have breached H on their way down from S₀ > H.',
                'Terminal integration must be truncated at H rather than K, replacing A with B and C with D to yield C_{do} = B - D + F.',
                'Rebate F (for Knock-Out) is paid immediately at stopping time τ_H: F = R E^Q[e^{-rτ_H} 1_{τ_H ≤ T}], shifting drift from μ to λ = √(μ² + 2r/σ²).'
              ]}
            />

            {/* TAXONOMY TABLE */}
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-neutral-100/70 dark:bg-neutral-800/50">
                <div>
                  <h4 className="font-serif text-base font-medium text-neutral-900 dark:text-neutral-100">
                    Reiner-Rubinstein Taxonomy &amp; Verified Numerical Benchmarks
                  </h4>
                  <p className="text-xs font-mono tabular-nums text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Baseline: S₀ = 100, T = 1.0, r = 0.05, q = 0.02, σ = 0.25, R = 0 • Satisfies{' '}
                    <JargonTerm term="In-Out Parity" definition={DEFINITIONS.inOutParity}>
                      In-Out Parity (V_in + V_out = A)
                    </JargonTerm>
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {(['ALL', 'Call', 'Put'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setRrFilter(tab)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                        rrFilter === tab
                          ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-neutral-950 font-semibold'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {tab === 'ALL' ? 'All Contracts (12)' : `${tab}s (6)`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Barrier Direction</th>
                      <th className="py-2.5 px-3">Strike Regime</th>
                      <th className="py-2.5 px-3">Knock-In (V_in)</th>
                      <th className="py-2.5 px-3">Knock-Out (V_out)</th>
                      <th className="py-2.5 px-3">(ϕ, η)</th>
                      <th className="py-2.5 px-3 text-right">V_in ($)</th>
                      <th className="py-2.5 px-3 text-right">V_out ($)</th>
                      <th className="py-2.5 px-3 text-right">Vanilla Sum ($)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono tabular-nums text-xs">
                    {filteredBenchmarks.map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                      >
                        <td className="py-2.5 px-3 font-sans font-medium text-neutral-900 dark:text-neutral-100">
                          {row.optionType}
                        </td>
                        <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                          {row.barrierDir}
                        </td>
                        <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                          {row.strikeRegime}
                        </td>
                        <td className="py-2.5 px-3 text-[#A8672E] dark:text-[#D08F52]">
                          {row.vinFormula}
                        </td>
                        <td className="py-2.5 px-3 text-[#1D8A70] dark:text-[#3CBF9C]">
                          {row.voutFormula}
                        </td>
                        <td className="py-2.5 px-3 text-neutral-500 dark:text-neutral-400">
                          {row.signs}
                        </td>
                        <td className="py-2.5 px-3 text-right text-neutral-800 dark:text-neutral-200">
                          {row.vinPrice}
                        </td>
                        <td
                          className={`py-2.5 px-3 text-right font-semibold ${
                            row.voutPrice === '0.0000'
                              ? 'text-[#BC4128] dark:text-[#E2694A]'
                              : 'text-[#1D8A70] dark:text-[#3CBF9C]'
                          }`}
                        >
                          {row.voutPrice}
                        </td>
                        <td className="py-2.5 px-3 text-right text-neutral-900 dark:text-neutral-100 font-semibold">
                          {row.vanillaSum}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex flex-wrap justify-between gap-2">
                <span>
                  † Supplementary boundary-regime illustration under identical baseline parameters.
                </span>
                <span>
                  Note: Out-options with barrier between spot and OTM strike (e.g., Up-and-Out Call K ≥ H) have V_out = F = $0.0000.
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Extensions and Breakdowns of Analytical Tractability
            </h3>

            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  <strong className="text-neutral-900 dark:text-neutral-100">Double-Barrier Knock-Out Options (L &lt; S₀ &lt; U):</strong>{' '}
                  Enforcing <span className="font-mono tabular-nums">V(L, t) = 0</span> and <span className="font-mono tabular-nums">V(U, t) = 0</span> simultaneously across parallel boundaries <span className="font-mono tabular-nums">l = ln(L/S₀) &lt; 0 &lt; u = ln(U/S₀)</span> generates an infinite sequence of alternating reflections:
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  <strong className="text-neutral-900 dark:text-neutral-100">Local &amp; Stochastic Volatility Breakdown:</strong>{' '}
                  Transforming <span className="font-mono tabular-nums">dS_t = (r - q)S_t dt + σ(S_t, t)S_t dW_t</span> to{' '}
                  <JargonTerm term="Lamperti Coordinates" definition={DEFINITIONS.lampertiTransform}>
                    Lamperti coordinates
                  </JargonTerm>{' '}
                  yields spatially non-linear drift <span className="font-mono tabular-nums">h(X_t)</span>; the Girsanov Radon-Nikodym integral <span className="font-mono tabular-nums">∫₀^T h(X_s) dW_s - ½ ∫₀^T h²(X_s) ds</span> remains path-dependent rather than collapsing to a function of <span className="font-mono tabular-nums">X_T</span> alone.
                </span>
              </li>
            </ul>

            <FormulaPanel
              label="Double-Barrier Infinite Series of Images & Kou (2002) Double-Exponential Jump Density"
              formulas={[
                'p_{\\text{surv}}(x; l, u, t) = \\frac{1}{\\sqrt{2\\pi t}} \\sum_{n=-\\infty}^\\infty \\left[ \\exp\\left(-\\frac{(x + 2n(u - l))^2}{2t}\\right) - \\exp\\left(-\\frac{(x - 2u + 2n(u - l))^2}{2t}\\right) \\right]',
                'f_J(y) = p \\eta_1 \\exp(-\\eta_1 y) \\mathbf{1}_{y \\ge 0} + (1 - p) \\eta_2 \\exp(\\eta_2 y) \\mathbf{1}_{y < 0}, \\quad (\\eta_1 > 1, \\eta_2 > 0)'
              ]}
            />

            <DichotomyCard
              title="Jump-Diffusion Overshoot Tractability: Merton (1976) vs. Kou (2002)"
              leftTitle="Merton (1976) Gaussian Jumps"
              leftBadge="J ~ N(μ_J, σ_J²)"
              leftTone="negative"
              leftItems={[
                'Trajectory can cross barrier a via discrete jump with positive random overshoot R_{τ_a} = X_{τ_a} - a > 0.',
                'Overshoot distribution depends intricately on pre-jump distance below the barrier.',
                'Renders joint law of (τ_a, X_{τ_a}) analytically intractable; forces reliance on PIDEs or Monte Carlo.'
              ]}
              rightTitle="Kou (2002) Double-Exponential Jumps"
              rightBadge="Memoryless Rate η₁"
              rightTone="positive"
              rightItems={[
                'Exponential distribution satisfies P(Y > y + x | Y > x) = exp(-η₁ y).',
                'Conditionally on a jump crossing upper barrier a, overshoot R_{τ_a} is exponentially distributed with rate η₁ independently of pre-jump distance.',
                <>
                  Decouples pre-hit and post-hit paths via{' '}
                  <JargonTerm term="Wiener-Hopf Factorization" definition={DEFINITIONS.wienerHopf}>
                    Wiener-Hopf factorization
                  </JargonTerm>{' '}
                  for analytical Laplace transforms inverted via the Euler algorithm.
                </>
              ]}
            />
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-950 dark:text-neutral-50 border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Monte Carlo Valuation of Barrier Options: Discretization Bias and Remediation
          </h2>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              The Discrete Monitoring Bias (O(Δt¹/²) Error)
            </h3>

            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  Because discrete monitoring dates <span className="font-mono tabular-nums">{'{t_i}_{i=1}^m'}</span> are a strict subset of <span className="font-mono tabular-nums">[0, T]</span>, every path <span className="font-mono tabular-nums">ω ∈ Ω</span> obeys the deterministic inequality <span className="font-mono tabular-nums">M̃_m(ω) ≤ M_T(ω)</span> and <span className="font-mono tabular-nums">m̃_m(ω) ≥ m_T(ω)</span>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  <JargonTerm term="Discrete Monitoring Bias" definition={DEFINITIONS.discreteMonitoringBias}>
                    Crude discrete Monte Carlo
                  </JargonTerm>{' '}
                  misses inter-step excursions in <span className="font-mono tabular-nums">(t_i, t_{'{i+1}'})</span>, systematically{' '}
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">
                    underestimating knockout probability, overpricing Knock-Out options, and underpricing Knock-In options
                  </span>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  Governed by Brownian bridge scaling <span className="font-mono tabular-nums">σ√Δt</span>, weak convergence degrades from <span className="font-mono tabular-nums">O(m⁻¹)</span> to <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">O(Δt¹/²) = O(m⁻¹/²)</span>: halving discretization bias requires quadrupling time steps <span className="font-mono tabular-nums">m</span>.
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              The Broadie-Glasserman-Kou (1997) Continuity Correction
            </h3>

            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  Derived by reflecting a discrete Gaussian random walk <span className="font-mono tabular-nums">W̃_n = ∑ Z_i</span> around its achieved position <span className="font-mono tabular-nums">b√m + R_m</span>, where <span className="font-mono tabular-nums">R_m &gt; 0</span> is the discrete overshoot across the boundary.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  By renewal theory of Gaussian random walks (Siegmund 1979, 1985), the asymptotic expected overshoot converges to{' '}
                  <JargonTerm term="BGK Continuity Constant (β)" definition={DEFINITIONS.bgkCorrection}>
                    lim E[R_m] = -ζ(1/2) / √(2π) = β ≈ 0.582597
                  </JargonTerm>
                  .
                </span>
              </li>
            </ul>

            <FormulaPanel
              label="Broadie-Glasserman-Kou (1997) Asymptotic Relation & Taylor Expansion"
              formulas={[
                'V_m(H) = V\\left( H \\exp\\left(\\pm \\beta \\sigma \\sqrt{T / m}\\right) \\right) + o\\left(\\frac{1}{\\sqrt{m}}\\right), \\quad \\beta = -\\frac{\\zeta(1/2)}{\\sqrt{2\\pi}} \\approx 0.582597',
                'P(\\tilde{W}_m < c\\sqrt{m}, \\tilde{\\tau} \\le m) \\approx 1 - \\Phi\\left(2\\left(b + \\frac{\\beta}{\\sqrt{m}}\\right) - c\\right) + o\\left(\\frac{1}{\\sqrt{m}}\\right)'
              ]}
            />

            <DichotomyCard
              title="Operational Directions of the BGK Continuity Shift"
              leftTitle="Direction A: Discrete Contract → Closed-Form Formula"
              leftBadge="Shift H Away from S₀"
              leftTone="positive"
              leftItems={[
                'Used when the legal contract specifies m discrete checks (e.g., m = 252 daily closings) and is priced via the continuous Reiner-Rubinstein formula.',
                'Up-barrier (H > S₀): H_eff = H exp(+β σ √Δt).',
                'Down-barrier (H < S₀): H_eff = H exp(-β σ √Δt).',
                'Reduces analytical hitting probability to match discrete frequency, cutting error from O(m⁻¹/²) to o(m⁻¹/²).'
              ]}
              rightTitle="Direction B: Continuous Contract → Discrete MC Grid"
              rightBadge="Shift H Toward S₀"
              rightTone="accent"
              rightItems={[
                'Used when the contract is continuously monitored but is valued on a discrete Monte Carlo grid with step Δt.',
                'Up-barrier (H > S₀): H_sim = H exp(-β σ √Δt).',
                'Down-barrier (H < S₀): H_sim = H exp(+β σ √Δt).',
                'Triggers discrete grid knockouts earlier to compensate for missed inter-step Brownian excursions.'
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Brownian Bridge Interpolation and One-Step Survival (Rao-Blackwellization)
            </h3>

            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  Conditioning a drifted Brownian motion on endpoints <span className="font-mono tabular-nums">x_i = ln S_{'{t_i}'}</span> and <span className="font-mono tabular-nums">x_{'{i+1}'} = ln S_{'{t_{i+1}}'}</span> over <span className="font-mono tabular-nums">[t_i, t_{'{i+1}'}]</span> yields a{' '}
                  <JargonTerm term="Brownian Bridge" definition={DEFINITIONS.brownianBridge} />{' '}
                  whose law is completely independent of the drift <span className="font-mono tabular-nums">ν</span>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  When initial spot <span className="font-mono tabular-nums">S₀</span> lies very close to <span className="font-mono tabular-nums">H</span>, the{' '}
                  <JargonTerm term="One-Step Survival (OSS)" definition={DEFINITIONS.oneStepSurvival} />{' '}
                  algorithm samples <span className="font-mono tabular-nums">Z_i = Φ⁻¹(u_i · Φ(z̄_i))</span> so every path stays inside the survival domain while multiplying path weights by <span className="font-mono tabular-nums">p_{'{surv,i}'} = Φ(z̄_i)</span>.
                </span>
              </li>
            </ul>

            <FormulaPanel
              label="Brownian Bridge Step Crossing Probability (p_i) & Rao-Blackwellized Survival Estimator"
              formulas={[
                'p_i = P(\\text{Hit } H \\text{ in } [t_i, t_{i+1}] \\mid S_{t_i}, S_{t_{i+1}}) = \\exp\\left( -\\frac{2 \\ln(S_{t_i} / H) \\ln(S_{t_{i+1}} / H)}{\\sigma^2 \\Delta t} \\right) \\quad \\text{if } (S_{t_i} - H)(S_{t_{i+1}} - H) > 0, \\text{ else } 1',
                '\\hat{p}_i = \\exp\\left( -\\frac{2 \\max(S_{t_i} - H, 0) \\max(S_{t_{i+1}} - H, 0)}{b(S_{t_i}, t_i)^2 \\Delta t} \\right) \\quad [\\text{General Euler-Maruyama Down-Barrier}]',
                '\\hat{V}_{\\text{BB}} = e^{-rT} \\frac{1}{N_{\\text{paths}}} \\sum_{k=1}^{N_{\\text{paths}}} \\max(S_T^{(k)} - K, 0) \\prod_{i=0}^{m-1} (1 - p_i^{(k)})',
                '\\bar{z}_i = \\frac{\\ln(H / S_{t_i}) - \\nu \\Delta t}{\\sigma\\sqrt{\\Delta t}}, \\quad Z_i = \\Phi^{-1}(u_i \\cdot \\Phi(\\bar{z}_i)) \\quad [\\text{One-Step Survival Transformation}]'
              ]}
            />

            <DichotomyCard
              title="Monte Carlo Bridge Implementation: Bernoulli Killing vs. Rao-Blackwellized Survival Weighting"
              leftTitle="Naive Bernoulli Bridge Killing"
              leftBadge="Discontinuous Indicator"
              leftTone="negative"
              leftItems={[
                'Draws an independent uniform random variable U_i ~ U(0, 1) at each step i and terminates the path if U_i < p_i.',
                'Injects auxiliary Bernoulli sampling noise and retains a non-differentiable step indicator payoff.'
              ]}
              rightTitle="Rao-Blackwellized Conditional Survival Weighting"
              rightBadge="Smooth Weight ∏(1 - p_i)"
              rightTone="positive"
              rightItems={[
                'Applies the Tower Property of conditional expectation to weight terminal payoffs by ∏_{i=0}^{m-1} (1 - p_i) ∈ [0, 1).',
                'Strictly lowers estimator variance, restores optimal O(Δt) weak convergence (Gobet 2000), and renders the integrand differentiable for AAD Greeks.'
              ]}
            />

            {/* Controlled Monte Carlo Benchmark Table */}
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-800/50">
                <h4 className="font-serif text-base font-medium text-neutral-900 dark:text-neutral-100">
                  Empirical Monte Carlo Convergence Benchmark (Continuously Monitored Down-and-Out Call)
                </h4>
                <p className="text-xs font-mono tabular-nums text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Parameters: S₀ = 100, K = 100, H = 85, T = 1.0, r = 0.05, q = 0.02, σ = 0.25 • N_paths = 50,000 • Exact Reiner-Rubinstein Price = $9.9234
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                      <th className="py-2.5 px-3">Time Steps (m)</th>
                      <th className="py-2.5 px-3">Monitoring Frequency</th>
                      <th className="py-2.5 px-3">Crude Discrete MC (± SE)</th>
                      <th className="py-2.5 px-3">Crude MC Bias ($)</th>
                      <th className="py-2.5 px-3">BGK-Corrected MC (± SE)</th>
                      <th className="py-2.5 px-3">Brownian Bridge MC (± SE)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono tabular-nums text-xs">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">m = 12</td>
                      <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">Monthly (Δt = 1/12)</td>
                      <td className="py-2.5 px-3 text-neutral-800 dark:text-neutral-200">$10.4838 ± 0.0779</td>
                      <td className="py-2.5 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">+$0.5604 (+5.65%)</td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">$9.8764 ± 0.0776</td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">$9.8776 ± 0.0768</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">m = 52</td>
                      <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">Weekly (Δt = 1/52)</td>
                      <td className="py-2.5 px-3 text-neutral-800 dark:text-neutral-200">$10.1193 ± 0.0773</td>
                      <td className="py-2.5 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">+$0.1959 (+1.97%)</td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">$9.7656 ± 0.0769</td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">$9.7626 ± 0.0766</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">m = 252</td>
                      <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">Daily (Δt = 1/252)</td>
                      <td className="py-2.5 px-3 text-neutral-800 dark:text-neutral-200">$10.0485 ± 0.0775</td>
                      <td className="py-2.5 px-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">+$0.1251 (+1.26%)</td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">$9.8706 ± 0.0774</td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">$9.8700 ± 0.0772</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-800/60">
                      <td className="py-2.5 px-3 font-semibold text-[#A8672E] dark:text-[#D08F52]">Exact Limit (m → ∞)</td>
                      <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">Continuous (Δt → 0)</td>
                      <td className="py-2.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">$9.9234 (Exact)</td>
                      <td className="py-2.5 px-3 text-[#1D8A70] dark:text-[#3CBF9C]">$0.0000 (0.00%)</td>
                      <td className="py-2.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">$9.9234 (Exact)</td>
                      <td className="py-2.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">$9.9234 (Exact)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-950 dark:text-neutral-50 border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Sensitivity Analysis (Greeks) and Hedging Pathologies Near the Barrier
          </h2>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Pin Risk and the Explosion of Analytical Greeks Near the Barrier
            </h3>

            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  In a{' '}
                  <JargonTerm term="Reverse Barrier Option" definition={DEFINITIONS.reverseBarrier}>
                    reverse barrier option
                  </JargonTerm>{' '}
                  (such as an Up-and-Out Call with <span className="font-mono tabular-nums">K = 90</span> and upper barrier <span className="font-mono tabular-nums">H = 115</span>), intrinsic value grows toward <span className="font-mono tabular-nums">H - K = $25</span> as <span className="font-mono tabular-nums">S ↑ 115</span>, but drops discontinuously from <span className="font-mono tabular-nums">$25</span> to <span className="font-mono tabular-nums">$0</span> upon touching <span className="font-mono tabular-nums">H</span>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  This corner discontinuity <span className="font-mono tabular-nums">lim_{'{S↑H}'} V(S, T) = H - K &gt; 0</span> vs. <span className="font-mono tabular-nums">lim_{'{t↑T}'} V(H, t) = 0</span> drives Delta deeply negative (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-3.9329</span> at <span className="font-mono tabular-nums">S = 114.8, T = 0.02</span>) and Vega strongly negative because higher volatility increases knockout probability.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono select-none">•</span>
                <span>
                  To mitigate unbounded Gamma and gap risk, trading desks deploy static replication (under zero carry <span className="font-mono tabular-nums">r = q ⟹ 2μ = -1</span> using vanilla options struck at <span className="font-mono tabular-nums">K</span> and <span className="font-mono tabular-nums">H² / K</span>) and{' '}
                  <JargonTerm term="Barrier Overhedging" definition={DEFINITIONS.barrierOverhedging}>
                    barrier overhedging
                  </JargonTerm>{' '}
                  across a collar <span className="font-mono tabular-nums">[H, H + δH]</span> to cap maximum negative Delta at <span className="font-mono tabular-nums">-(H - K) / δH</span>.
                </span>
              </li>
            </ul>

            {/* Up-and-Out Call Delta and Gamma Table with Horizon Highlighter */}
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-neutral-100/70 dark:bg-neutral-800/50">
                <div>
                  <h4 className="font-serif text-base font-medium text-neutral-900 dark:text-neutral-100">
                    Up-and-Out Call Analytical Delta (Δ) and Gamma (Γ) Near Barrier Corner (H, T)
                  </h4>
                  <p className="text-xs font-mono tabular-nums text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Parameters: K = 90, H = 115, r = 0.05, q = 0.02, σ = 0.25, R = 0
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mr-1">
                    Highlight Horizon:
                  </span>
                  {(['1.00', '0.20', '0.02'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedMaturity(t)}
                      className={`px-2.5 py-1 rounded text-xs font-mono tabular-nums transition-colors ${
                        selectedMaturity === t
                          ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-neutral-950 font-semibold'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      T = {t} yr
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                      <th className="py-2.5 px-3">Spot (S)</th>
                      <th className="py-2.5 px-3">Distance (H - S)</th>
                      <th className={`py-2.5 px-3 text-right ${selectedMaturity === '1.00' ? 'bg-amber-500/10 dark:bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]' : ''}`}>
                        T = 1.00 yr Δ
                      </th>
                      <th className={`py-2.5 px-3 text-right ${selectedMaturity === '1.00' ? 'bg-amber-500/10 dark:bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]' : ''}`}>
                        T = 1.00 yr Γ
                      </th>
                      <th className={`py-2.5 px-3 text-right ${selectedMaturity === '0.20' ? 'bg-amber-500/10 dark:bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]' : ''}`}>
                        T = 0.20 yr Δ
                      </th>
                      <th className={`py-2.5 px-3 text-right ${selectedMaturity === '0.20' ? 'bg-amber-500/10 dark:bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]' : ''}`}>
                        T = 0.20 yr Γ
                      </th>
                      <th className={`py-2.5 px-3 text-right ${selectedMaturity === '0.02' ? 'bg-amber-500/10 dark:bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]' : ''}`}>
                        T = 0.02 yr Δ
                      </th>
                      <th className={`py-2.5 px-3 text-right ${selectedMaturity === '0.02' ? 'bg-amber-500/10 dark:bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]' : ''}`}>
                        T = 0.02 yr Γ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono tabular-nums text-xs">
                    {[
                      { s: '100.0', dist: '$15.0 (13.0%)', d1: '-0.0615', g1: '-0.0042', d2: '+0.0301', g2: '-0.0642', d3: '+0.9960', g3: '-0.0013' },
                      { s: '105.0', dist: '$10.0 (8.7%)', d1: '-0.0785', g1: '-0.0025', d2: '-0.3084', g2: '-0.0655', d3: '+0.8037', g3: '-0.1339' },
                      { s: '110.0', dist: '$5.0 (4.3%)', d1: '-0.0869', g1: '-0.0008', d2: '-0.5732', g2: '-0.0364', d3: '-1.3275', g3: '-0.7323' },
                      { s: '113.0', dist: '$2.0 (1.7%)', d1: '-0.0878', g1: '+0.0001', d2: '-0.6451', g2: '-0.0113', d3: '-3.4249', g3: '-0.5152' },
                      { s: '114.0', dist: '$1.0 (0.9%)', d1: '-0.0875', g1: '+0.0004', d2: '-0.6521', g2: '-0.0028', d3: '-3.8177', g3: '-0.2601' },
                      { s: '114.8', dist: '$0.2 (0.2%)', d1: '-0.0871', g1: '+0.0007', d2: '-0.6517', g2: '+0.0038', d3: '-3.9329', g3: '-0.0263' }
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                        <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">{r.s}</td>
                        <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400">{r.dist}</td>
                        <td className={`py-2.5 px-3 text-right ${selectedMaturity === '1.00' ? 'bg-amber-500/5 dark:bg-amber-500/5 font-semibold' : ''} text-[#BC4128] dark:text-[#E2694A]`}>{r.d1}</td>
                        <td className={`py-2.5 px-3 text-right ${selectedMaturity === '1.00' ? 'bg-amber-500/5 dark:bg-amber-500/5' : ''} text-neutral-700 dark:text-neutral-300`}>{r.g1}</td>
                        <td className={`py-2.5 px-3 text-right ${selectedMaturity === '0.20' ? 'bg-amber-500/5 dark:bg-amber-500/5 font-semibold' : ''} ${r.d2.startsWith('+') ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A]'}`}>{r.d2}</td>
                        <td className={`py-2.5 px-3 text-right ${selectedMaturity === '0.20' ? 'bg-amber-500/5 dark:bg-amber-500/5' : ''} text-neutral-700 dark:text-neutral-300`}>{r.g2}</td>
                        <td className={`py-2.5 px-3 text-right ${selectedMaturity === '0.02' ? 'bg-amber-500/5 dark:bg-amber-500/5 font-semibold' : ''} ${r.d3.startsWith('+') ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A]'}`}>{r.d3}</td>
                        <td className={`py-2.5 px-3 text-right ${selectedMaturity === '0.02' ? 'bg-amber-500/5 dark:bg-amber-500/5 font-semibold' : ''} text-[#BC4128] dark:text-[#E2694A]`}>{r.g3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100">
              Breakdown of Classical Pathwise Sensitivities and Advanced Monte Carlo Greek Estimators
            </h3>

            <DichotomyCard
              title="Payoff Differentiation vs. Density Differentiation in Monte Carlo"
              leftTitle="Classical Pathwise Method (IPA)"
              leftBadge="Biased on Barriers"
              leftTone="negative"
              leftItems={[
                <>
                  Valid for Lipschitz-continuous vanilla payoffs <span className="font-mono tabular-nums">(S_T - K)_+</span>, but fails on discontinuous barrier indicators <span className="font-mono tabular-nums">1_{'{max S_{t_i}(θ) < H}'}</span>.
                </>,
                'Differentiating inside the expectation treats ∂/∂θ 1_{max S < H} as zero almost everywhere, completely missing the Dirac delta boundary contribution.',
                'Produces a strictly positive Delta for an Up-and-Out Call even when the true Delta is deeply negative (-3.9329).'
              ]}
              rightTitle="Likelihood Ratio Method (LRM) & Survival Smoothing"
              rightBadge="Unbiased Estimators"
              rightTone="positive"
              rightItems={[
                <>
                  <JargonTerm term="Likelihood Ratio Method (LRM)" definition={DEFINITIONS.lrm} />{' '}
                  differentiates the smooth transition log-density <span className="font-mono tabular-nums">∂ ln φ(x; θ)/∂θ</span> rather than the payoff, yielding unbiased Greeks but <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">O(Δt⁻¹)</span> variance blowup on fine grids.
                </>,
                <>
                  Smoothing the indicator first via{' '}
                  <JargonTerm term="One-Step Survival (OSS)" definition={DEFINITIONS.oneStepSurvival} />{' '}
                  or Brownian Bridge weights <span className="font-mono tabular-nums">∏(1 - p̂_i(Θ))</span> restores Lipschitz continuity on <span className="font-mono tabular-nums">[0, 1]^m</span> for unbiased <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">O(1)</span>-variance AAD Greeks.
                </>
              ]}
            />

            <FormulaPanel
              label="Pathwise (IPA) Obstruction, Likelihood Ratio Method (LRM) & Malliavin Integration-by-Parts"
              formulas={[
                '\\Delta_{\\text{IPA}}^{\\text{vanilla}} = \\frac{\\partial}{\\partial S_0} \\mathbb{E}[e^{-rT} (S_T - K)_+] = \\mathbb{E}\\left[e^{-rT} \\mathbf{1}_{S_T > K} \\frac{\\partial S_T}{\\partial S_0}\\right]',
                '\\Psi(\\theta) = e^{-rT} (S_T(\\theta) - K)_+ \\mathbf{1}_{\\max_{1\\le i\\le m} S_{t_i}(\\theta) < H} \\quad [\\text{Non-Lipschitz: IPA misses Dirac boundary term}]',
                '\\frac{\\partial}{\\partial \\theta} \\int \\Psi(x) \\phi(x; \\theta) \\, dx = \\mathbb{E}\\left[ \\Psi(X) \\cdot \\frac{\\partial \\ln \\phi(X; \\theta)}{\\partial \\theta} \\right] = \\mathbb{E}[ \\Psi(X) \\cdot W_{\\text{LRM}}(\\theta) ]',
                'W_{\\text{LRM}}(S_0) = \\frac{Z_1}{S_0 \\sigma \\sqrt{\\Delta t}}, \\quad W_{\\text{LRM}}(\\sigma) = \\sum_{i=1}^m \\frac{Z_i^2 - 1}{\\sigma} \\quad [\\text{Variance scales as } O(m) = O(\\Delta t^{-1})]',
                '\\Delta_{\\text{Malliavin}} = \\mathbb{E}\\left[ \\Phi(X_T) \\int_0^T a(t) \\frac{Y_t}{\\sigma(X_t)} \\, dW_t \\right] \\quad [\\text{Localized via cutoff } \\psi(t) \\text{ vanishing prior to } \\tau_H]'
              ]}
            />

            {/* Comparison Table of 6 Sensitivity Methods */}
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-800/50">
                <h4 className="font-serif text-base font-medium text-neutral-900 dark:text-neutral-100">
                  Monte Carlo Barrier Sensitivity Methodologies Comparison
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                      <th className="py-2.5 px-3">Sensitivity Method</th>
                      <th className="py-2.5 px-3">Payoff Smoothness Req?</th>
                      <th className="py-2.5 px-3">Transition Density Req?</th>
                      <th className="py-2.5 px-3">Estimator Bias</th>
                      <th className="py-2.5 px-3">Variance Scaling (Δt → 0)</th>
                      <th className="py-2.5 px-3">Cost (for K Greeks)</th>
                      <th className="py-2.5 px-3">Primary Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                        Classical Pathwise (IPA)
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">Yes (Lipschitz)</td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">No</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-[#BC4128] dark:text-[#E2694A]">
                        Biased (misses knockout)
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">
                        O(1) to wrong value
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                        O(1) via AAD
                      </td>
                      <td className="py-2.5 px-3 text-[#BC4128] dark:text-[#E2694A] font-medium">
                        Invalid unless smoothed
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                        Finite Differences (CRN)
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">No</td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">No</td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                        O(h²) bias
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">
                        O(h⁻¹) Δ; O(h⁻³) Γ
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                        (2K + 1)× pricing pass
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                        Baseline validation
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                        Likelihood Ratio (LRM)
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">No</td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">Yes (explicit log-density)</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        Unbiased
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">
                        O(Δt⁻¹) blowup
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                        O(1) alongside path
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                        Coarse-step discrete barriers
                      </td>
                    </tr>
                    <tr className="bg-emerald-500/5 dark:bg-emerald-500/5">
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        One-Step Survival + Bridge IPA
                      </td>
                      <td className="py-2.5 px-3 font-mono text-neutral-700 dark:text-neutral-300">
                        Smoothed via ∏(1 - p_i)
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">Step CDF Φ(·)</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        Unbiased (exact GBM)
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        O(1) (lowest variance)
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">
                        ≤ 4× pass via AAD
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        Production standard
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                        <JargonTerm term="Vibrato Monte Carlo" definition={DEFINITIONS.vibratoMC} />
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">Smoothed at final step</td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">Conditional step Gaussian</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        Unbiased (at step level)
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                        O(Δt⁻¹/²)
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                        ≤ 4× pass via AAD
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                        Multivariate SDEs
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                        <JargonTerm term="Malliavin Calculus (Gobet)" definition={DEFINITIONS.malliavinLocalization} />
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">No (localized &lt; τ_H)</td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">No (uses tangent Y_t)</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        Unbiased
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                        O(1) if localized
                      </td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                        1.5× to 3× pass
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                        Local/stochastic vol SDEs
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-950 dark:text-neutral-50 border-b border-neutral-200 dark:border-neutral-800 pb-2">
            Synthesis and Architectural Decision Framework: Closed-Form vs. Monte Carlo
          </h2>

          {/* Architectural Comparison Matrix */}
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-800/50">
              <h3 className="font-serif text-base font-medium text-neutral-900 dark:text-neutral-100">
                Valuation Architecture Comparison Matrix
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 text-neutral-600 dark:text-neutral-400 font-mono text-xs">
                    <th className="py-2.5 px-3">Architectural Dimension</th>
                    <th className="py-2.5 px-3">Analytical Closed-Form (Reiner-Rubinstein + BGK)</th>
                    <th className="py-2.5 px-3">PDE / PIDE Finite Difference Solvers</th>
                    <th className="py-2.5 px-3">Monte Carlo (Brownian Bridge + OSS AAD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                      Mathematical Mechanism
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      Reflection Principle, Girsanov measure change, Method of Images (A–F blocks)
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      Direct discretization of Black-Scholes PDE with Dirichlet boundary V(H, t) = 0
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      Trajectory simulation with conditional bridge survival weights ∏(1 - p_i)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                      Supported Model Dynamics
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      Constant-parameter GBM (or Kou double-exponential jumps via Laplace inversion)
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      1D/2D Local Volatility, Heston Stochastic Volatility, Merton/Kou Jump-Diffusions
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                      Arbitrary multi-asset baskets, path-dependent vol, stochastic rates/vol (d ≥ 3)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                      Monitoring Regimes
                    </td>
                    <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                      Exact continuous; o(m⁻¹/²) asymptotic via BGK shift H exp(±0.5826σ√Δt)
                    </td>
                    <td className="py-2.5 px-3 text-[#1D8A70] dark:text-[#3CBF9C] font-medium">
                      Exact for both continuous and discrete (via grid projection at monitoring dates)
                    </td>
                    <td className="py-2.5 px-3 font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                      Exact discrete; O(Δt) weak convergence for continuous via Brownian Bridge
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                      Double &amp; Window Barriers
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      Infinite series of images (Double); bivariate/multivariate normal integrals (Window)
                    </td>
                    <td className="py-2.5 px-3 text-[#1D8A70] dark:text-[#3CBF9C]">
                      Trivial boundary adjustment V(L,t) = V(U,t) = 0 on time window [t₁, t₂]
                    </td>
                    <td className="py-2.5 px-3 text-[#1D8A70] dark:text-[#3CBF9C]">
                      Trivial indicator/bridge adjustment across active monitoring intervals
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                      Execution Latency
                    </td>
                    <td className="py-2.5 px-3 font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                      Microseconds (~1–10 μs per evaluation; ideal for high-frequency quoting)
                    </td>
                    <td className="py-2.5 px-3 font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">
                      Milliseconds (~5–50 ms per grid solve)
                    </td>
                    <td className="py-2.5 px-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">
                      Hundreds of Milliseconds (~100–500 ms for 10⁵–5×10⁵ paths)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                      Greek Stability Near Barrier
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      Exact analytical derivatives; reflects true Δ → -∞ pin risk without statistical noise
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      Smooth grid derivatives (Δ, Γ) directly from spatial finite-difference stencil
                    </td>
                    <td className="py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
                      Requires One-Step Survival, Vibrato MC, or Malliavin weights to prevent variance explosion
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quantitative Engineering Recommendations Card */}
          <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
            <h3 className="font-serif text-lg font-normal text-neutral-900 dark:text-neutral-100">
              Quantitative Engineering Recommendations
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2.5">
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono font-bold select-none">•</span>
                <span>
                  <strong className="text-neutral-900 dark:text-neutral-100">Single-Asset Constant-Parameter Regimes:</strong>{' '}
                  Deploy closed-form Reiner-Rubinstein valuation; for discrete monitoring where <span className="font-mono tabular-nums">S₀</span> lies more than <span className="font-mono tabular-nums">2σ√Δt</span> from <span className="font-mono tabular-nums">H</span>, apply the BGK shift <span className="font-mono tabular-nums">H_eff = H exp(±0.5826σ√Δt)</span> for sub-basis-point accuracy at microsecond latency. Within one daily standard deviation <span className="font-mono tabular-nums">σ√Δt</span> of <span className="font-mono tabular-nums">H</span>, fall back to a 1D finite-difference PDE solver or recursive Gaussian quadrature.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#BC4128] dark:text-[#E2694A] font-mono font-bold select-none">•</span>
                <span>
                  <strong className="text-neutral-900 dark:text-neutral-100">Multi-Asset &amp; Stochastic Volatility Monte Carlo:</strong>{' '}
                  Never deploy naive grid-point barrier checking on continuous contracts due to its <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">O(Δt¹/²)</span> upward knock-out pricing bias; weight every trajectory by the Rao-Blackwellized Brownian Bridge survival product <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">∏_{'{i=0}'}^{'{m-1}'} (1 - p_i)</span> to restore <span className="font-mono tabular-nums">O(Δt)</span> weak convergence.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono font-bold select-none">•</span>
                <span>
                  <strong className="text-neutral-900 dark:text-neutral-100">Production AAD Risk Engines &amp; Desk Hedging:</strong>{' '}
                  Block raw pathwise differentiation (IPA) on barrier indicators; couple One-Step Survival with Brownian Bridge weighting for <span className="font-mono tabular-nums">O(1)</span>-variance adjoint Greeks, and pair with call-spread collar overhedging <span className="font-mono tabular-nums">[H, H + δH]</span> on reverse barriers near expiration.
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
