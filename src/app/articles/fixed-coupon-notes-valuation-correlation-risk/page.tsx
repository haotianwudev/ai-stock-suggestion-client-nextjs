'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import { LevelLadder } from '@/components/articles/article-visuals';

interface TermProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

function Term({ term, definition, children }: TermProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        tabIndex={0}
        role="button"
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] font-medium focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm px-0.5 transition-colors"
      >
        {children || term}
      </span>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 rounded-lg shadow-xl bg-[#14171B] dark:bg-[#05070A] text-zinc-100 dark:text-zinc-100 border border-zinc-700 dark:border-zinc-800 text-xs leading-relaxed z-50 pointer-events-none"
        >
          <span className="block font-mono text-[#D08F52] dark:text-[#D08F52] font-semibold mb-1">
            {term}
          </span>
          <span className="block font-sans text-zinc-200 dark:text-zinc-300">
            {definition}
          </span>
        </span>
      )}
    </span>
  );
}

/** Inline KaTeX shorthand. */
const M = ({ m }: { m: string }) => <InlineMath math={m} />;

/** Monospace tabular number span. */
const N = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono tabular-nums">{children}</span>
);

type Tone = 'pos' | 'neg' | 'acc' | 'muted';

const TONE: Record<Tone, string> = {
  pos: 'text-[#1D8A70] dark:text-[#3CBF9C]',
  neg: 'text-[#BC4128] dark:text-[#E2694A]',
  acc: 'text-[#A8672E] dark:text-[#D08F52]',
  muted: 'text-zinc-700 dark:text-zinc-300',
};

/** Card heading with color + a shape marker, so the comparison doesn't rely on color alone. */
function SideLabel({ tone, children, className = 'mb-2' }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider ${TONE[tone]} ${className}`}>
      <span className="w-2 h-2 rounded-full bg-current flex-none" />
      <span>{children}</span>
    </div>
  );
}

type Eq = string | { caption: React.ReactNode; tex: string };

function Equations({ eqs }: { eqs: Eq[] }) {
  return (
    <div className="space-y-2">
      {eqs.map((eq, i) =>
        typeof eq === 'string' ? (
          <MathBlock key={i} math={eq} />
        ) : (
          <div key={i}>
            <div className="font-mono text-[11px] text-zinc-400">{eq.caption}</div>
            <MathBlock math={eq.tex} />
          </div>
        )
      )}
    </div>
  );
}

interface ExampleRow {
  label: React.ReactNode;
  value: React.ReactNode;
}

interface WorkedExample {
  title: string;
  rows: ExampleRow[];
  result: ExampleRow;
  note?: React.ReactNode;
}

interface FormulaPanelProps {
  label: string;
  formulas: Eq[];
  subTitle?: React.ReactNode;
  subFormulas?: Eq[];
  notes?: React.ReactNode[];
  example?: WorkedExample;
}

function FormulaPanel({ label, formulas, subTitle, subFormulas, notes, example }: FormulaPanelProps) {
  return (
    <div className="my-4 rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white border border-zinc-800 dark:border-zinc-800/90 overflow-hidden shadow-sm">
      <div className="px-4 py-2.5 border-b border-zinc-800 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-[#D08F52] dark:text-[#D08F52]">
          {label}
        </span>
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          Risk-Neutral Measure Q
        </span>
      </div>
      <div className="p-4 text-sm text-zinc-100">
        <Equations eqs={formulas} />
        {subFormulas && (
          <div className="mt-3 pt-3 border-t border-zinc-800/80 dark:border-zinc-800/60 text-zinc-300">
            {subTitle && (
              <div className="font-mono text-xs text-[#D08F52] mb-1">{subTitle}</div>
            )}
            <Equations eqs={subFormulas} />
          </div>
        )}
      </div>
      {notes && notes.length > 0 && (
        <div className="px-4 py-2.5 bg-zinc-900/70 dark:bg-zinc-950/70 border-t border-zinc-800/80 dark:border-zinc-800/60">
          <ul className="space-y-1.5 text-xs text-zinc-300 dark:text-zinc-400">
            {notes.map((n, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#D08F52] dark:text-[#D08F52]">&bull;</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {example && (
        <div className="px-4 py-4 bg-zinc-900 dark:bg-[#0A0D12] border-t border-zinc-800 dark:border-zinc-800">
          <div className="font-mono text-xs font-semibold text-[#D08F52] dark:text-[#D08F52] mb-3">
            {example.title}
          </div>
          <div className="border-l-2 border-[#D08F52] pl-4 space-y-1.5">
            {example.rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] gap-x-2 items-baseline font-mono tabular-nums text-xs sm:text-sm text-zinc-300"
              >
                <span>{row.label}</span>
                <span className="hidden sm:inline text-[#D08F52]">=</span>
                <span className="text-zinc-100">{row.value}</span>
              </div>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] gap-x-2 items-baseline font-mono tabular-nums text-sm sm:text-base font-bold text-white pt-2 mt-1 border-t border-zinc-800">
              <span>{example.result.label}</span>
              <span className="hidden sm:inline text-[#D08F52]">=</span>
              <span className="text-[#D08F52]">{example.result.value}</span>
            </div>
          </div>
          {example.note && (
            <p className="mt-4 pt-3 border-t border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {example.note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const CARD = 'p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800';
const UL = 'space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300';
const TH = 'p-3 font-semibold';
const TD = 'p-3';
const TD_HEAD = 'p-3 font-medium text-zinc-900 dark:text-zinc-100';

export default function ArticlePage() {
  return (
    <ArticleFrame
      slug="fixed-coupon-notes-valuation-correlation-risk"
      additionalDisclaimer="Fixed Coupon Notes and other autocallable structured products can lose up to 100% of principal through physical delivery of the worst-performing stock or issuer default, are generally illiquid before maturity, and are typically restricted to professional or accredited investors. Figures cited are illustrative examples from the research, not quotes for any live product."
    >
      <div className="space-y-12 text-zinc-900 dark:text-zinc-100">
        {/* Standout figures + key takeaways */}
        <header className="space-y-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className={CARD}>
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-[#A8672E] dark:text-[#D08F52]">
                8%&ndash;14% p.a.
              </div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Typical unconditional fixed coupon rate distributed monthly or quarterly while alive
              </div>
            </div>
            <div className={CARD}>
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                +350 bps
              </div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Coupon lift from market volatility skew (10.0% Local Vol vs. 6.5% flat vol on a 3Y 50%-KI note)
              </div>
            </div>
            <div className={CARD}>
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                60%&ndash;80% / 95%&ndash;100%
              </div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Standard Down-and-In barrier (<M m="B_{KI}" />) vs. Autocall Knock-Out barrier (<M m="B_{KO}" />) of initial spot
              </div>
            </div>
            <div className={CARD}>
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A]">
                -49%
              </div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                2015&ndash;2016 HSCEI peak-to-trough collapse that triggered systemic 50%&ndash;60% KI barrier cascades
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border-l-4 border-l-[#A8672E] dark:border-l-[#D08F52] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h2 className="font-serif text-lg font-normal text-zinc-900 dark:text-zinc-100">Key Takeaways</h2>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#A8672E] dark:text-[#D08F52] font-bold">&bull;</span>
                <span>
                  <strong>Embedded Exotic Short Put:</strong> An FCN synthesizes double-digit yield by embedding a short worst-of down-and-in barrier put option directly into a senior unsecured bank debt host, economically matching the European Autocallable Barrier Reverse Convertible (BRC).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C] font-bold">&bull;</span>
                <span>
                  <strong>Coupled Smile &amp; Correlation Calibration:</strong> Fair coupon pricing requires coupling{' '}
                  <Term
                    term="Stochastic Local Volatility (SLV)"
                    definition="A hybrid model blending Heston stochastic variance with a deterministic Dupire leverage surface Lᵢ(t, Sᵢ), calibrated via the Guyon–Henry-Labordère McKean particle method to match all vanilla option smiles while preserving realistic forward skew dynamics."
                  >
                    Stochastic Local Volatility (SLV)
                  </Term>{' '}
                  marginal processes with Local Correlation (LVLC) or Wishart matrix diffusions, alongside Fuzzy Logic payoff smoothing to stabilize discontinuous Monte Carlo Greeks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-[#BC4128] dark:text-[#E2694A] font-bold">&bull;</span>
                <span>
                  <strong>Unhedgeable Cross-Gamma &amp; Pin Risk:</strong> Because the investor is Long Correlation and the issuing bank desk is Short Correlation (<M m={String.raw`\Phi_{ij} < 0`} />), market crashes trigger simultaneous correlation spikes, dividend cuts, duration extension, and discontinuous delta cliffs at the Knock-In barrier.
                </span>
              </li>
            </ul>
          </div>
        </header>

        {/* SECTION 1: Product Anatomy and Market Rationale */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              Product Anatomy and Market Rationale
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Predominantly marketed across Asian and Australian private banking as an FCN and in Europe as an{' '}
              <Term
                term="Autocallable Barrier Reverse Convertible (BRC)"
                definition="The European structured retail equivalent of the Fixed Coupon Note: a yield-enhancement note paying unconditional fixed coupons while embedding a short multi-asset knock-in put and periodic autocall barrier."
              >
                Autocallable Barrier Reverse Convertible (BRC)
              </Term>
              , the instrument transforms equity volatility skew and basket dispersion into fixed coupons.
            </p>
          </div>

          {/* Structural Decomposition and Payoff Taxonomy */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Structural Decomposition and Payoff Taxonomy
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={CARD}>
                <SideLabel tone="pos">Traditional Convertible Bond</SideLabel>
                <ul className={UL}>
                  <li>&bull; Bondholder holds a <strong>long call option</strong> to convert debt into equity.</li>
                  <li>&bull; Conversion occurs voluntarily when underlying share prices appreciate.</li>
                </ul>
              </div>
              <div className={CARD}>
                <SideLabel tone="neg">Fixed Coupon Note (Reverse Convertible)</SideLabel>
                <ul className={UL}>
                  <li>&bull; Investor embeds a <strong>short exotic multi-asset barrier put option</strong> inside senior unsecured debt.</li>
                  <li>&bull; Issuer holds the right to force physical delivery of depreciated equity when prices collapse below a threshold.</li>
                </ul>
              </div>
            </div>

            {/* Four structural pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`${CARD} space-y-2`}>
                <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                  Pillar 1 &bull; Reference Basket &amp; Worst-Of Mechanic
                </div>
                <ul className={UL}>
                  <li>
                    &bull; Canonical structure references <M m="n = 2" /> to <M m="4" /> correlated equities, ETFs, or indices (single-asset and cross-asset variations like Quanto-Gold FCNs also exist).
                  </li>
                  <li>
                    &bull; All barrier triggers and terminal payoffs evaluate strictly on the{' '}
                    <Term
                      term="Least Performing Equity (LPE)"
                      definition="The 'worst-of' asset in the reference basket at any observation time t, defined by the minimum normalized price ratio W(t) = minᵢ [Sᵢ(t) / Sᵢ(0)]."
                    >
                      Least Performing Equity (LPE)
                    </Term>
                    .
                  </li>
                </ul>
              </div>

              <div className={`${CARD} space-y-2`}>
                <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                  Pillar 2 &bull; Unconditional Periodic Coupons
                </div>
                <ul className={UL}>
                  <li>
                    &bull; Pays fixed rate <M m="c" /> (<N>8%&ndash;14% p.a.</N>) monthly or quarterly, typically <N>5 business days</N> after each observation date.
                  </li>
                  <li>&bull; Unconditional prior to early termination, distinguishing FCNs from conditional Phoenix notes.</li>
                </ul>
              </div>

              <div className={`${CARD} space-y-2`}>
                <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                  Pillar 3 &bull; Autocall (Knock-Out) Barrier
                </div>
                <ul className={UL}>
                  <li>
                    &bull; Monitored on discrete dates <M m={String.raw`t_1, \dots, t_{M-1}`} /> (monthly, quarterly, or semi-annually) after an initial lock-out period (<N>3 or 6 months</N>).
                  </li>
                  <li>
                    &bull; If every asset closes at or above <M m="B_{KO}" /> (<N>95%&ndash;100%</N> of <M m="S_i(0)" />), the note redeems early at <N>100%</N> par plus current coupon.
                  </li>
                </ul>
              </div>

              <div className={`${CARD} space-y-2`}>
                <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                  Pillar 4 &bull; Knock-In Put Barrier &amp; Conversion Strike
                </div>
                <ul className={UL}>
                  <li>
                    &bull; Governed by Conversion Strike <M m="K" /> (<N>100%</N> in par-strike notes, or <N>70%&ndash;85%</N> in low-strike buffered structures) and Down-and-In Barrier <M m="B_{KI}" /> (<N>60%&ndash;80%</N> of <M m="S_i(0)" />).
                  </li>
                  <li>
                    &bull; Monitored daily/continuously (<M m={String.raw`\mathcal{T}_{KI} = [0, T]`} />, American-style) or solely at maturity (<M m={String.raw`\mathcal{T}_{KI} = \{T\}`} />, European-style).
                  </li>
                </ul>
              </div>
            </div>

            <InfographicSlot alt="Infographic: Fixed Coupon Notes — the four structural pillars, structural comparison across yield-enhancement notes, pricing factors, correlation modeling hierarchy, and risk pathologies" />

            <FormulaPanel
              label="Worst-Of Performance, Stopping Time & Terminal Redemption Payoff"
              formulas={[
                String.raw`W(t) = \min_{i \in \{1,\dots,n\}} R_i(t) = \min_{i \in \{1,\dots,n\}} \frac{S_i(t)}{S_i(0)}`,
                String.raw`\tau = \inf\{\, t_m \in \mathcal{T}_{KO} : W(t_m) \ge B_{KO} \,\} \qquad (\tau = \infty \text{ if never satisfied before } t_M = T)`,
                String.raw`I_{KI} = \mathbb{1}\Big( \min_{t \in \mathcal{T}_{KI}} W(t) \le B_{KI} \Big)`,
                String.raw`\begin{aligned} \Pi_{red}(T) &= \mathbb{1}(\tau = \infty)\left[ 1 - I_{KI}\,\mathbb{1}(W(T) < K)\left(1 - \frac{W(T)}{K}\right) \right] \\ &= \mathbb{1}(\tau = \infty)\left[ 1 - \frac{I_{KI}}{K}\max\big(K - W(T), 0\big) \right] \end{aligned}`,
              ]}
              subTitle={<>Physical settlement (when <M m="I_{KI} = 1" /> and <M m="W(T) < K" />, for worst performer <M m={String.raw`i^* = \arg\min_i R_i(T)`} />)</>}
              subFormulas={[
                String.raw`N_{shares} = \frac{\text{Notional}}{K \cdot S_{i^*}(0)}`,
                String.raw`\text{Terminal Market Value} = \text{Notional}\cdot\frac{S_{i^*}(T)}{K\, S_{i^*}(0)} = \text{Notional}\cdot\frac{W(T)}{K}`,
              ]}
              notes={[
                <>Unit notional <M m="N = 1" />, unconditional periodic coupon <M m="c_m" /> paid at dates <M m="t_m" /> (<M m={String.raw`m = 1,\dots,M`} />), conversion strike <M m={String.raw`K \in (0, 1]`} />.</>,
                <>In standard low-strike Asian FCNs without a separate KI barrier, <M m="K = B_{KI}" />; in barrier FCNs, <M m={String.raw`B_{KI} < K \le 1`} />.</>,
                <>Fractional shares upon physical delivery of stock <M m="i^*" /> are settled in cash.</>,
              ]}
            />

            <div className="space-y-2">
              <h4 className="font-serif text-base font-normal text-zinc-800 dark:text-zinc-200">
                Taxonomy of Equity-Linked Yield Enhancement Notes
              </h4>
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <table className="w-full min-w-[720px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                      <th className={TH}>Structural Dimension</th>
                      <th className={`${TH} text-[#A8672E] dark:text-[#D08F52]`}>Fixed Coupon Note (FCN)</th>
                      <th className={TH}>Classic Reverse Convertible</th>
                      <th className={TH}>Phoenix Autocallable Note</th>
                      <th className={TH}>Snowball / Athena Autocallable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <td className={TD_HEAD}>Primary Regional Market</td>
                      <td className={TD}>Asia-Pacific &amp; Australia</td>
                      <td className={TD}>Continental Europe (esp. Switzerland)</td>
                      <td className={TD}>Europe &amp; Global Private Wealth</td>
                      <td className={TD}>South Korea (ELS), Europe &amp; Asia</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Coupon Payment Condition</td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C] font-medium`}>Fixed &amp; unconditional every period while alive</td>
                      <td className={TD}>Fixed &amp; unconditional every period to maturity</td>
                      <td className={TD}>Conditional on <M m={String.raw`W(t_m) \ge B_{coupon}`} /> (e.g., 70% of <M m="S_0" />)</td>
                      <td className={TD}>Zero periodic coupon; accrues &amp; pays lump sum upon autocall</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Memory Feature</td>
                      <td className={TD}>Not applicable (coupons guaranteed until KO)</td>
                      <td className={TD}>Not applicable (all coupons guaranteed)</td>
                      <td className={TD}>Standard (&ldquo;Phoenix with Memory&rdquo; catches up missed coupons)</td>
                      <td className={TD}>Intrinsic (snowballing coupon escalates with time, e.g., <N>20%, 40%, 60%</N>)</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Autocall (Knock-Out) Mechanism</td>
                      <td className={TD}>Active across periodic dates (<M m={String.raw`W(t_m) \ge B_{KO}`} />)</td>
                      <td className={TD}>None (fixed tenor to maturity)</td>
                      <td className={TD}>Active from specified period onward (<M m={String.raw`W(t_m) \ge B_{KO}`} />)</td>
                      <td className={TD}>Active across periodic dates (<M m={String.raw`W(t_m) \ge B_{KO}`} />)</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Downside Knock-In (KI) Structure</td>
                      <td className={TD}>European (at maturity) or American (daily/continuous)</td>
                      <td className={TD}>European or American Down-and-In Put</td>
                      <td className={TD}>European or American Down-and-In Put (typically <N>60%&ndash;70%</N>)</td>
                      <td className={TD}>Deep OTM Down-and-In Put (typically <N>50%&ndash;60%</N> barrier)</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Pathwise Vega &amp; Digital Risk</td>
                      <td className={TD}>High autocall digital risk; moderate coupon digital risk</td>
                      <td className={TD}>Low pathwise digitality; concentrated terminal pin risk</td>
                      <td className={TD}>High dual digitality (coupon barrier + autocall barrier)</td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A] font-medium`}>Extreme autocall digitality (principal + accumulated snowball jump)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Economic Drivers and Market Participant Incentives */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Economic Drivers and Market Participant Incentives
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <SideLabel tone="pos" className="">Buy-Side Wealth Investor Motivations</SideLabel>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">Yield &amp; Entry</span>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <li>
                    &bull; <strong>Volatility &amp; Correlation Monetization:</strong> Manufactures double-digit cash flows when sovereign yields are below <N>2%</N> and investment-grade credit spreads offer barely <N>1%</N> pickup.
                  </li>
                  <li>
                    &bull; <strong>Range-Bound Corridor Expression:</strong> Profits maximally in neutral-to-moderately-bullish regimes (e.g., trading between an <N>80%</N> KI barrier and <N>98%</N> autocall threshold over a <N>6-to-12-month</N> horizon).
                  </li>
                  <li>
                    &bull; <strong>Yield-Generating Limit Order:</strong> If a blue-chip stock breaches the barrier, the investor acquires shares at the discounted strike <M m="K" /> while retaining guaranteed coupons.
                  </li>
                  <li>
                    &bull; <strong>Operational Division of Labor:</strong> Delegates rolling short OTM puts, daily barrier monitoring, and variation margin posting to an investment bank trading desk.
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <SideLabel tone="acc" className="">Sell-Side Issuing Bank Incentives</SideLabel>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">Funding &amp; Exotics</span>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <li>
                    &bull; <strong>Senior Unsecured Treasury Funding:</strong> Cash principal paid on the Settlement Date supplies the bank&apos;s treasury with senior unsecured funding over the note&apos;s expected life.
                  </li>
                  <li>
                    &bull; <strong>Sourcing Exotic Risk Premiums:</strong> Supplies exotic desks with long downside implied volatility, long volatility skew, and long worst-of correlation protection with an embedded structuring margin.
                  </li>
                  <li>
                    &bull; <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">One-Directional Flow Concentration:</span> Forces the exotic book to warehouse massive exposures to forward dividends, barrier digitals,{' '}
                    <Term
                      term="Vanna"
                      definition="Second-order cross-derivative ∂²V / ∂S∂σ measuring the sensitivity of portfolio Delta to changes in implied volatility (or equivalently, the sensitivity of Vega to spot price moves)."
                    >
                      vanna
                    </Term>
                    ,{' '}
                    <Term
                      term="Vomma (Volga)"
                      definition="Second-order derivative ∂²V / ∂σ² measuring the convexity of option value with respect to implied volatility."
                    >
                      vomma
                    </Term>
                    , and cross-gamma that must be recycled into wholesale markets.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Quantitative Valuation and Calibration Architecture */}
        <section className="space-y-8 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              Quantitative Valuation and Calibration Architecture
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Pricing engine decomposition, implied volatility skew monetization, McKean particle calibration of Stochastic Local Volatility, and Fuzzy Logic discontinuity smoothing.
            </p>
          </div>

          {/* Derivative Replication and Implied Volatility Skew Sensitivity */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Derivative Replication and Implied Volatility Skew Sensitivity
            </h3>

            <ul className={UL}>
              <li>
                &bull; Issued at par (<M m={String.raw`V_0 = 100\%`} /> minus upfront bank structuring and distribution fees), the pricing engine solves inversely for fair periodic coupon <M m="c_m" />, strike <M m="K" />, or Knock-In barrier <M m="B_{KI}" />.
              </li>
              <li>
                &bull; Incorporating issuer funding spread <M m="s^f" /> over risk-free rate <M m="r_t" /> and settlement lag <M m={String.raw`\delta_p`} /> (<N>5 business days</N> or <N>1 week</N>), fair value decomposes into four risk-neutral expectation components:
              </li>
            </ul>

            <FormulaPanel
              label="Risk-Neutral Cash Flow Replication & Coupon Factor Decomposition"
              formulas={[
                String.raw`\begin{aligned} V_0 = {} & e^{-\int_0^T (r_u + s_u^f)\,du}\; \mathbb{Q}(\tau = \infty) && \text{[terminal par survival value]} \\ & + \sum_{m=1}^{M-1} e^{-\int_0^{t_m + \delta_p} (r_u + s_u^f)\,du}\; \mathbb{Q}(\tau = t_m) && \text{[early autocall principal redemptions]} \\ & + \sum_{m=1}^{M} c_m\, e^{-\int_0^{t_m + \delta_p} (r_u + s_u^f)\,du}\; \mathbb{Q}(\tau \ge t_m) && \text{[expected fixed coupon stream]} \\ & - e^{-\int_0^T r_u\,du}\; \mathbb{E}^{\mathbb{Q}}\!\left[ \frac{\mathbb{1}(\tau = \infty)\, I_{KI}}{K} \max\big(K - W(T), 0\big) \right] && \text{[short knock-out, down-and-in worst-of put]} \end{aligned}`,
              ]}
              subTitle="Linearized empirical coupon rate decomposition"
              subFormulas={[String.raw`C_i = \alpha + \beta\, r_t + \gamma_T\, \bar{\sigma}_i + \delta\, \bar{\rho}_i + \theta\, \bar{q}_i`]}
              notes={[
                <><M m="r_t" />: prevailing swap rate plus issuer credit spread.</>,
                <><M m={String.raw`\bar{\sigma}_i`} />: underlying implied volatilities and downside volatility skew.</>,
                <><M m={String.raw`\bar{\rho}_i`} />: pairwise implied correlations among basket constituents.</>,
                <><M m={String.raw`\bar{q}_i`} />: expected continuous dividend yields and stock borrow/repo rates.</>,
              ]}
            />

            <FormulaPanel
              label="Breeden-Litzenberger (1978) Risk-Neutral Tail Probability & Skew Chain Rule"
              formulas={[
                String.raw`\mathbb{Q}\big(S_i(T) < K\big) = 1 + \frac{1}{DF(0, T)}\,\frac{\partial C_i(T, K)}{\partial K}`,
                String.raw`\frac{\partial C_i}{\partial K} = \frac{\partial C_i^{BS}}{\partial K} + \mathcal{V}_i^{BS}\,\frac{\partial \sigma_{imp}}{\partial K}`,
              ]}
              subTitle="Equity forward curve & dividend drift"
              subFormulas={[String.raw`F_i(0, T) = S_i(0)\, e^{(r - q_i)T}`]}
              notes={[
                <>Because equity implied volatility exhibits negative strike skew (<M m={String.raw`\partial \sigma_{imp} / \partial K < 0`} />) and Black-Scholes vega <M m={String.raw`\mathcal{V}_i^{BS} > 0`} />, <M m={String.raw`\partial C_i / \partial K`} /> is more negative than under flat volatility.</>,
                <>Negative skew directly inflates <M m={String.raw`\mathbb{Q}(S_i(T) < B_{KI})`} /> and the value of the embedded short Down-and-In Put (DIP).</>,
                <>Higher dividend yield <M m="q_i" /> depresses <M m="F_i(0, T)" />, lowering early autocall probability <M m={String.raw`\mathbb{Q}(\tau < \infty)`} /> and raising KI breach probability.</>,
              ]}
              example={{
                title: 'Worked Example: 3-Year Autocallable (50% KI Barrier, 0.5% 3Y USD Swap Rate)',
                rows: [
                  { label: 'Coupon under flat volatility', value: '6.5% p.a.' },
                  { label: 'Coupon under Local Volatility (market skew)', value: '10.0% p.a.' },
                  { label: 'Inception bank delta hedge', value: '60% of notional in shares' },
                ],
                result: { label: 'Coupon lift from selling skew', value: '+350 bps p.a.' },
                note: 'Incorporating market volatility skew via Local Volatility adds 350 bps of annual yield financed by selling skew. Simultaneously, when the bank buys 60% of notional in underlying shares to neutralize its short spot exposure, it collects cash dividends on those hedge shares and passes that value into the fixed coupon.',
              }}
            />
          </div>

          {/* From Dupire Local Volatility to Stochastic Local Volatility */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              From Dupire Local Volatility to Stochastic Local Volatility
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="neg">Dupire (1994) Local Volatility (LV)</SideLabel>
                <ul className={UL}>
                  <li>
                    &bull; Exact calibration to marginal terminal distributions <M m={String.raw`\mathbb{Q}(S_T^i \in dx)`} /> across all vanilla strikes and maturities <M m="(T, K)" />.
                  </li>
                  <li>
                    &bull; <strong>Structural Defect:</strong> 1-factor deterministic volatility model whose implied forward volatility skews flatten unrealistically over time.
                  </li>
                  <li>
                    &bull; Misstates conditional joint barrier probabilities <M m={String.raw`\mathbb{Q}(W(T) \le B_{KI} \mid W(t_m) < B_{KO})`} /> and misprices vanna (<M m={String.raw`\partial^2 V / \partial S \partial \sigma`} />) and volga/vomma (<M m={String.raw`\partial^2 V / \partial \sigma^2`} />).
                  </li>
                </ul>
              </div>

              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="pos">Heston Stochastic Local Volatility (SLV / LSV)</SideLabel>
                <ul className={UL}>
                  <li>
                    &bull; Blends realistic forward smile dynamics and spot-volatility correlation (<M m={String.raw`\rho_{SV}^i`} />) of Heston (1993) with exact Dupire vanilla calibration.
                  </li>
                  <li>
                    &bull; Controlled by mixing fraction <M m={String.raw`\lambda_{mix} \in [0, 1]`} /> bridging pure Local Volatility (<M m={String.raw`\lambda_{mix} = 0`} />) and pure Stochastic Volatility (<M m={String.raw`\lambda_{mix} = 1`} />).
                  </li>
                  <li>
                    &bull; Matches vanilla surface without error via{' '}
                    <Term
                      term="Gyöngy's (1986) Markovian Projection Theorem"
                      definition="Mathematical theorem proving that an Ito process with stochastic drift/diffusion shares identical marginal distributions with a deterministic local volatility process if the local variance equals the conditional expectation of instantaneous variance given spot."
                    >
                      Gy&ouml;ngy&apos;s (1986) Markovian projection
                    </Term>{' '}
                    onto deterministic leverage surface <M m="L_i(t, S_t^i)" />.
                  </li>
                </ul>
              </div>
            </div>

            <FormulaPanel
              label="Dupire Local Volatility & Coupled Heston-SLV McKean-Vlasov System"
              formulas={[
                {
                  caption: 'Dupire local volatility SDE',
                  tex: String.raw`\frac{dS_t^i}{S_t^i} = (r_t - q_t^i)\,dt + \sigma_{Dup}^i(t, S_t^i)\,dW_t^i, \qquad d\langle W^i, W^j \rangle_t = \rho_{ij}\,dt`,
                },
                {
                  caption: 'Dupire surface inversion',
                  tex: String.raw`\sigma_{Dup}^i(T, K)^2 = \frac{\dfrac{\partial C_i}{\partial T} + q_T^i\, C_i + (r_T - q_T^i)\, K\, \dfrac{\partial C_i}{\partial K}}{\tfrac{1}{2} K^2\, \dfrac{\partial^2 C_i}{\partial K^2}}`,
                },
              ]}
              subTitle="Heston-SLV coupled SDEs & Gyöngy leverage identity"
              subFormulas={[
                String.raw`\frac{dS_t^i}{S_t^i} = (r_t - q_t^i)\,dt + \sqrt{V_t^i}\, L_i(t, S_t^i)\, dW_t^{S,i}, \qquad S_0^i > 0`,
                String.raw`dV_t^i = \kappa_i(\theta_i - V_t^i)\,dt + \lambda_{mix}\,\xi_i\sqrt{V_t^i}\, dW_t^{V,i}, \qquad V_0^i > 0, \quad d\langle W^{S,i}, W^{V,i} \rangle_t = \rho_{SV}^i\,dt`,
                String.raw`L_i(t, x) = \frac{\sigma_{Dup}^i(t, x)}{\sqrt{\mathbb{E}^{\mathbb{Q}}\big[ V_t^i \mid S_t^i = x \big]}}`,
                {
                  caption: 'McKean particle step — Nadaraya-Watson kernel estimate of the conditional variance',
                  tex: String.raw`\hat{\mathbb{E}}\big[ V_{t_{k+1}}^i \mid S_{t_{k+1}}^i = x_l \big] = \frac{\sum_{n=1}^N V_{t_{k+1}}^{i,(n)}\, \Phi_{\varepsilon_x}\big(S_{t_{k+1}}^{i,(n)} - x_l\big)}{\sum_{n=1}^N \Phi_{\varepsilon_x}\big(S_{t_{k+1}}^{i,(n)} - x_l\big)}, \qquad \Phi_{\varepsilon_x}(u) = \frac{1}{\varepsilon_x}\,\mathcal{K}\!\left(\frac{u}{\varepsilon_x}\right)`,
                },
              ]}
              notes={[
                <><M m={String.raw`\kappa_i`} />: variance mean-reversion speed; <M m={String.raw`\theta_i`} />: long-run variance; <M m={String.raw`\xi_i`} />: vol-of-vol; <M m={String.raw`\lambda_{mix} \in [0, 1]`} />: mixing fraction.</>,
                <>Guyon &amp; Henry-Labord&egrave;re (2012) McKean Particle Method calibrates <M m="L_i(t_k, x_l)" /> forward in time on grid <M m={String.raw`0 = t_0 < t_1 < \dots < t_K = T`} /> across <M m="N" /> simulated particles, using the kernel estimator above with bandwidth <M m={String.raw`\varepsilon_x`} />.</>,
              ]}
            />
          </div>

          {/* Monte Carlo Discontinuities and Fuzzy Logic Payoff Smoothing */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Monte Carlo Discontinuities and Fuzzy Logic Payoff Smoothing
            </h3>

            <ul className={UL}>
              <li>
                &bull; Multi-asset FCNs with <M m={String.raw`n \ge 3`} /> underlyings require Monte Carlo simulation (<N>10,000 to 250,000</N> paths), where step-function jumps across <M m={String.raw`\Gamma_{KO} = \{W(t_m) - B_{KO} = 0\}`} /> and <M m={String.raw`\Gamma_{KI} = \{W(t) - B_{KI} = 0\}`} /> produce Dirac delta masses <M m={String.raw`\delta(\psi)`} /> upon differentiation.
              </li>
              <li>
                &bull; Without regularization, bump-and-revalue or{' '}
                <Term
                  term="Algorithmic Differentiation (AAD)"
                  definition="Adjoint algorithmic differentiation used in Monte Carlo engines to compute exact pathwise sensitivities (Greeks) in constant time relative to the number of model parameters, requiring continuous pathwise payoffs."
                >
                  Algorithmic Differentiation (AAD)
                </Term>{' '}
                Greeks exhibit severe variance and seed-to-seed instability.
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="muted">Family 1 &bull; Density Differentiation (LRM &amp; Malliavin)</SideLabel>
                <ul className={UL}>
                  <li>
                    &bull; Avoids differentiating discontinuous payoff <M m="f(X)" /> by differentiating the log transition probability density <M m={String.raw`\log \varphi(\alpha, X)`} /> pathwise.
                  </li>
                  <li>
                    &bull; <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">Limitation:</span> Weights depend intimately on the analytical transition density, becoming cumbersome or high-variance for multi-asset hybrid SLV-local-correlation processes.
                  </li>
                </ul>
              </div>

              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="pos">Family 2 &bull; Payoff Smoothing &amp; Fuzzy Logic AST Scripting</SideLabel>
                <ul className={UL}>
                  <li>
                    &bull; Model-agnostic replacement of Heaviside indicators with continuous linear call-spread ramps of width <M m={String.raw`\varepsilon`} /> across <M m={String.raw`[K - \varepsilon/2,\ K + \varepsilon/2]`} />.
                  </li>
                  <li>
                    &bull; Front-office cash-flow scripting engines (Savine / Danske Bank architecture) parse scripts into an Abstract Syntax Tree (Expression Tree) and evaluate conditional branches using continuous{' '}
                    <Term
                      term="Degree of Truth (DT)"
                      definition="In Fuzzy Logic payoff smoothing, a continuous value DT ∈ [0, 1] replacing binary boolean (0 or 1) evaluation at conditional barrier nodes, blending true state S₁ and false state S₂ via S_final = DT·S₁ + (1 − DT)·S₂."
                    >
                      Degree of Truth
                    </Term>{' '}
                    (<M m={String.raw`DT \in [0, 1]`} />).
                  </li>
                </ul>
              </div>
            </div>

            <FormulaPanel
              label="Discontinuous Payoff Decomposition, LRM Identity & Fuzzy Logic State Smoothing"
              formulas={[
                {
                  caption: 'Contractual discontinuity structure',
                  tex: String.raw`g(X_\theta) = a_\theta(X_\theta) + b_\theta(X_\theta)\, \mathbb{1}\big(\psi(X_\theta, \theta) \ge 0\big)`,
                },
                {
                  caption: 'Likelihood Ratio Method (LRM) density differentiation',
                  tex: String.raw`\frac{\partial}{\partial \alpha_i}\, \mathbb{E}_\alpha\big[f(X)\big] = \mathbb{E}_\alpha\!\left[ f(X)\, \frac{\partial \log \varphi(\alpha, X)}{\partial \alpha_i} \right]`,
                },
              ]}
              subTitle="Call-spread ramp & fuzzy logic expression-tree convex combination"
              subFormulas={[
                String.raw`S_\varepsilon\big(W(t_m) - K\big) = \min\!\left( 1,\ \max\!\left( 0,\ \frac{W(t_m) - (K - \varepsilon/2)}{\varepsilon} \right) \right)`,
                String.raw`S_{final} = DT \cdot S_1 + (1 - DT) \cdot S_2`,
              ]}
              notes={[
                <>Fuzzy compound operators: <M m={String.raw`DT(C_1 \wedge C_2) = DT_1 \cdot DT_2`} /> or <M m={String.raw`\min(DT_1, DT_2)`} />; <M m={String.raw`DT(C_1 \vee C_2) = DT_1 + DT_2 - DT_1 \cdot DT_2`} /> or <M m={String.raw`\max(DT_1, DT_2)`} />.</>,
                <>A pre-simulation pass estimates the first two moments of every conditional expression and sets smoothing corridor width <M m={String.raw`\varepsilon`} /> automatically as a calibrated fraction of its standard deviation <M m={String.raw`\sigma_{expr}`} />.</>,
              ]}
            />
          </div>
        </section>

        {/* SECTION 3: Correlation Risk Dynamics and Cross-Gamma Modeling */}
        <section className="space-y-8 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              Correlation Risk Dynamics and Cross-Gamma Modeling
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Extremal geometry of the minimum operator, counterparty correlation polarity, cross-gamma P&amp;L bleed, Langnau Local Correlation, and Wishart matrix diffusions.
            </p>
          </div>

          {/* Dispersion Sensitivity and Cross-Gamma P&L Mechanics */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Dispersion Sensitivity and Cross-Gamma P&amp;L Mechanics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="pos">Comonotonic Limit (<M m={String.raw`\rho_{ij} \to 1`} />)</SideLabel>
                <ul className={UL}>
                  <li>&bull; Normalized paths <M m={String.raw`R_1(t), \dots, R_n(t)`} /> move in lockstep; basket degenerates into a single asset.</li>
                  <li>&bull; Probability of breaching <M m="B_{KI}" /> reduces to the single-asset barrier breach probability.</li>
                </ul>
              </div>
              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="neg">High Dispersion Regime (<M m={String.raw`\rho_{ij} \to 0`} /> or Negative)</SideLabel>
                <ul className={UL}>
                  <li>&bull; Individual stock trajectories diverge widely even if average basket performance is flat.</li>
                  <li>&bull; Sharply increases probability that at least one stock plunges below <M m="B_{KI}" /> while decreasing probability that all stocks rally above <M m="B_{KO}" />.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="acc">FCN Investor: Long Correlation / Short Dispersion</SideLabel>
                <ul className={UL}>
                  <li>
                    &bull; Because a Worst-Of Put satisfies <M m={String.raw`\partial P_{WoP} / \partial \rho_{ij} < 0`} /> (and Worst-Of Call <M m={String.raw`\partial C_{WoC} / \partial \rho_{ij} > 0`} />), selling the put makes the investor <strong>Long Correlation</strong> (<M m={String.raw`\partial V_{Investor} / \partial \rho_{ij} > 0`} />).
                  </li>
                  <li>&bull; Lower correlation inflates the embedded short put, eroding secondary mark-to-market value while financing higher headline coupons at inception.</li>
                </ul>
              </div>
              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="neg">Exotic Desk: Short Correlation / Long Dispersion</SideLabel>
                <ul className={UL}>
                  <li>
                    &bull; Issuing bank is long the embedded Worst-Of Put and therefore structurally <strong>Short Correlation</strong> (<M m={String.raw`\partial V_{Desk} / \partial \rho_{ij} < 0`} />).
                  </li>
                  <li>
                    &bull; Abstract correlation sensitivity (&ldquo;
                    <Term
                      term="Cega"
                      definition="First-order derivative ∂V / ∂ρᵢⱼ measuring the sensitivity of a multi-asset derivative's value to changes in pairwise implied correlation ρᵢⱼ."
                    >
                      Cega
                    </Term>
                    &rdquo;) manifests daily as{' '}
                    <Term
                      term="Cross-Gamma (Γᵢⱼ)"
                      definition="Second-order mixed partial derivative ∂²P / ∂Sᵢ∂Sⱼ (i ≠ j), measuring the rate of change of asset i's Delta with respect to a spot move in a different asset j."
                    >
                      Cross-Gamma
                    </Term>{' '}
                    (<M m={String.raw`\Phi_{ij}^{Desk} < 0`} />), inflicting hedging losses whenever realized covariance exceeds implied covariance.
                  </li>
                </ul>
              </div>
            </div>

            <FormulaPanel
              label="Delta-Hedged Taylor-Itô P&L, Cross-Gamma P&L & Cega Identity"
              formulas={[
                {
                  caption: 'Delta-hedged Taylor-Itô P&L over δt',
                  tex: String.raw`\begin{aligned} \text{P\&L}_{\delta t} = {} & -\tfrac{1}{2}\sum_{i=1}^n \Phi_{ii}\left[ \left(\frac{\delta S_i}{S_i}\right)^{2} - \sigma_i^2\,\delta t \right] \\ & -\tfrac{1}{2}\sum_{i=1}^n \sum_{j \ne i} \Phi_{ij}\left[ \frac{\delta S_i}{S_i}\frac{\delta S_j}{S_j} - \rho_{ij}^{imp}\sigma_i\sigma_j\,\delta t \right] \end{aligned}`,
                },
                {
                  caption: 'Cross-gamma P&L of the desk (V_Desk = −P)',
                  tex: String.raw`\text{P\&L}^{\times\Gamma}_{\delta t} = \tfrac{1}{2}\sum_{i=1}^n \sum_{j \ne i} \Phi_{ij}^{Desk}\left( \frac{\delta S_i}{S_i}\frac{\delta S_j}{S_j} - \rho_{ij}^{imp}\sigma_i\sigma_j\,\delta t \right)`,
                },
              ]}
              subFormulas={[
                {
                  caption: 'Cega to dollar cross-gamma identity (remaining maturity τ = T − t)',
                  tex: String.raw`\frac{\partial V}{\partial \rho_{ij}} = \sigma_i\sigma_j\,\tau\, S_i S_j\, \frac{\partial^2 V}{\partial S_i\, \partial S_j} = \sigma_i\sigma_j\,\tau\, \Phi_{ij}`,
                },
                {
                  caption: 'Negative cross-gamma of a long worst-of put',
                  tex: String.raw`\Gamma_{12}^{WoP} = \frac{\partial \Delta_1}{\partial S_2} = \frac{\partial^2 P_{WoP}}{\partial S_1\, \partial S_2} < 0`,
                },
              ]}
              notes={[
                <><M m={String.raw`\Phi_{ii} = S_i^2\, \partial^2 P / \partial S_i^2`} /> is single-asset Dollar Gamma; <M m={String.raw`\Phi_{ij} = S_i S_j\, \partial^2 P / \partial S_i \partial S_j`} /> is Dollar Cross-Gamma.</>,
                <>As basket size <M m="n" /> increases from 2 to 4+, off-diagonal Cross-Gamma terms <M m={String.raw`\sum_{i \ne j} \Phi_{ij}`} /> overtake diagonal Gamma <M m={String.raw`\sum_i \Phi_{ii}`} /> in explaining portfolio variance.</>,
                <>Unhedgeable Cross-Gamma inflicts a 3-fold penalty: (1) expected P&amp;L drift when realized &ne; implied covariance, (2) bid-offer spread bleed from cross-asset delta rebalancing, and (3) irreducible residual P&amp;L variance.</>,
              ]}
              example={{
                title: 'Worked Example: 2-Asset ATM Worst-Of Put max(K − min(S₁, S₂), 0) Near Expiry',
                rows: [
                  {
                    label: <>Initial ATM state (<M m={String.raw`S_1 = S_2 = K,\ \rho = 99\%`} />)</>,
                    value: <M m={String.raw`\Delta_1 \approx -0.25,\ \Delta_2 \approx -0.25`} />,
                  },
                  {
                    label: <>Divergence (<M m={String.raw`\delta S_2 > 0`} />, <M m="S_1" /> lags)</>,
                    value: <M m={String.raw`\Delta_1 \to -1.00,\ \Delta_2 \to 0.00`} />,
                  },
                ],
                result: {
                  label: <>Cross partial <M m={String.raw`\partial \Delta_1 / \partial S_2`} /></>,
                  value: <M m={String.raw`\Gamma_{12}^{WoP} < 0`} />,
                },
                note: (
                  <>
                    At <M m={String.raw`S_1 = S_2 = K`} /> with 99% correlation, there is a 50% chance both rally OTM (<M m={String.raw`\Delta_1 = \Delta_2 = 0`} />) and a 50% chance both drop ITM with equal share (<M m={String.raw`\Delta_1 = \Delta_2 = -0.50`} />), averaging <M m={String.raw`\Delta_1 \approx -0.25`} />. When <M m="S_2" /> rallies OTM while <M m="S_1" /> lags ITM, <M m="S_1" /> becomes the undisputed worst performer (<M m={String.raw`\delta\Delta_1 < 0`} /> toward <M m="-1.00" />), proving <M m={String.raw`\Gamma_{12} = \partial \Delta_1 / \partial S_2 < 0`} />.
                  </>
                ),
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={CARD}>
                <SideLabel tone="neg" className="mb-1">Near Lower Knock-In Barrier (<M m="B_{KI}" />)</SideLabel>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Bank&apos;s long Down-and-In Worst-Of Put carries strictly negative cross-gamma (<M m={String.raw`\Phi_{ij}^{Desk} < 0`} />), losing money when correlations spike toward <N>1.0</N> in selloffs.
                </p>
              </div>
              <div className={CARD}>
                <SideLabel tone="acc" className="mb-1">Near Upper Autocall Barrier (<M m="B_{KO}" />)</SideLabel>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Investor is long a Worst-Of Binary Call and bank is short that binary call; sign of bank&apos;s cross-gamma and correlation sensitivity can invert depending on whether the basket sits slightly below or above the digital trigger.
                </p>
              </div>
            </div>
          </div>

          {/* Local Correlation Models and Dimension Reduction */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Local Correlation Models and Dimension Reduction
            </h3>

            <ul className={UL}>
              <li>
                &bull; Langnau (2009) demonstrated that a constant-correlation Gaussian copula accounts for only <strong>roughly half</strong> of observed market index volatility skew; the remaining half stems from{' '}
                <Term
                  term="Correlation Breaks"
                  definition="Empirical market crisis regime in which pairwise equity correlations surge monotonically as basket spot levels fall, exploding toward 100% during systemic selloffs."
                >
                  correlation breaks
                </Term>{' '}
                as spot levels fall.
              </li>
              <li>
                &bull; Convex matrix interpolation between baseline PSD matrix <M m={String.raw`\rho_0`} /> and rank-one all-ones matrix <M m={String.raw`\Theta`} /> via state aggregator <M m="L_t" /> guarantees positive semi-definiteness and reduces Monte Carlo step complexity from <M m="O(n^3)" /> to <M m="O(n)" />.
              </li>
            </ul>

            <FormulaPanel
              label="Langnau (2009) Local Correlation, O(n) Convex Mixing & Shadow Correlation Delta"
              formulas={[
                {
                  caption: 'Basket local variance consistency (basket S⁰ = Σ αᵢ Sⁱ)',
                  tex: String.raw`\Big( \sum_{i=1}^n \alpha_i S_t^i \Big)^{2} \sigma_0^2(t, S_t^0) = \sum_{i=1}^n \sum_{j=1}^n \alpha_i \alpha_j S_t^i S_t^j\, \sigma_i(t, S_t^i)\, \sigma_j(t, S_t^j)\, \rho_{ij}(t, S_t^1, \dots, S_t^n)`,
                },
                {
                  caption: 'Convex matrix interpolation',
                  tex: String.raw`\rho(\lambda)_t = \big(1 - \lambda(t, L_t)\big)\rho_0 + \lambda(t, L_t)\,\Theta, \qquad \Theta_{ij} = 1 \ \ \forall\, i, j`,
                },
                {
                  caption: 'O(n) locally correlated Brownian increments',
                  tex: String.raw`dW_t^{\rho(\lambda)} = \sqrt{\frac{1 - \lambda(t, L_t)}{1 - \lambda_{min}}}\; dW_t^{(1 - \lambda_{min})\rho_0 + \lambda_{min}\Theta} + \sqrt{\frac{\lambda(t, L_t) - \lambda_{min}}{1 - \lambda_{min}}}\; dW_t^{\Theta}`,
                },
              ]}
              subTitle="Iterative calibration & Local Volatility–Local Correlation delta"
              subFormulas={[
                String.raw`\lambda_{k+1}(\cdot,\cdot) = \lambda_k(\cdot,\cdot) + \ln\frac{\Sigma_{Market}(\cdot,\cdot)}{\Phi(\lambda)_k(\cdot,\cdot)}`,
                String.raw`\Delta_{i,LVLC} = \frac{d\pi}{dS_i} = \underbrace{\frac{\partial \pi}{\partial S_i}}_{\Delta_{i,LV}} + \underbrace{\frac{\partial \pi}{\partial \lambda}\,\frac{\partial \lambda(t, L_t)}{\partial S_i}}_{\text{shadow correlation delta}}`,
              ]}
              notes={[
                <>State aggregator <M m="L_t" /> compresses <M m="n" /> spots via weighted basket <M m={String.raw`B_t = \sum_i w_i\, S_t^i / S_0^i`} /> or order-statistic log-performance <M m={String.raw`L_t = \sum_i w_{(i)} \ln\big(S_t^{(i)} / S_0^{(i)}\big)`} />.</>,
                <>Because correlation rises as spot falls (<M m={String.raw`\partial \lambda / \partial S_i < 0`} />) and the desk loses when correlation rises (<M m={String.raw`\partial \pi_{Desk} / \partial \lambda < 0`} />), the shadow delta adjustment <M m={String.raw`(\partial \pi_{Desk} / \partial \lambda)(\partial \lambda / \partial S_i) > 0`} /> is strictly positive.</>,
              ]}
            />

            <div>
              <h4 className="font-serif text-base font-normal text-zinc-800 dark:text-zinc-200">
                Empirical Calibration: Implied Basket Correlation Skew Across Strikes
              </h4>
              <LevelLadder
                points={[
                  { label: 'Strikes 70–80', value: '≥ 60%', position: 6, tone: 'neg' },
                  { label: 'ATM strike 100', value: '50%', position: 23, tone: 'neutral' },
                  { label: 'Strikes 160–200', value: '40%', position: 85, tone: 'pos' },
                ]}
                caption="Implied correlation by strike; markers placed proportionally on a 70–200 strike axis."
              />
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                A flat constant-correlation model calibrated at <N>50%</N> ATM severely underprices downside correlation spikes (<N>&ge;60%</N> at strikes 70&ndash;80) while overpricing upside correlation (<N>40%</N> at strikes 160&ndash;200).
              </p>
            </div>
          </div>

          {/* Stochastic Correlation Processes and Wishart Matrix Diffusions */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Stochastic Correlation Processes and Wishart Matrix Diffusions
            </h3>

            <ul className={UL}>
              <li>
                &bull; Beyond deterministic spot dependence, correlation is genuinely stochastic within a given spot regime, creating a Stochastic Correlation Risk Premium in worst-of options.
              </li>
              <li>
                &bull; For <M m="n = 2" /> assets, bounded 1D diffusions (Jacobi or <M m={String.raw`\tanh`} />-Ornstein-Uhlenbeck) keep <M m={String.raw`\rho_t \in (-1, 1)`} />; for <M m={String.raw`n \ge 3`} /> assets, evolving independent pairwise SDEs violates <M m={String.raw`\det(\rho_t) \ge 0`} />, requiring a{' '}
                <Term
                  term="Wishart Matrix Square-Root Process"
                  definition="An affine stochastic differential equation on the cone of symmetric positive semi-definite n×n covariance matrices Sₙ⁺ (Bru, 1991; Marabel, 2012), guaranteeing valid correlation matrices and closed-form characteristic functions."
                >
                  Wishart Matrix Square-Root Process
                </Term>{' '}
                on the positive semi-definite cone <M m={String.raw`\mathcal{S}_n^+`} />.
              </li>
            </ul>

            <FormulaPanel
              label="Jacobi SDE, Hyperbolic-Tangent OU Process & Wishart Matrix Diffusion"
              formulas={[
                {
                  caption: '1. van Emmerich (2006) bounded Jacobi process & Feller boundary condition',
                  tex: String.raw`d\rho_t = \kappa^*(\mu^* - \rho_t)\,dt + \sigma^*\sqrt{1 - \rho_t^2}\; dZ_t^{\rho}, \qquad \frac{(\sigma^*)^2}{\kappa^*(1 \pm \mu^*) + (\sigma^*)^2} \le 1`,
                },
                {
                  caption: '2. Teng et al. hyperbolic-tangent OU transformation (ρ = tanh X)',
                  tex: String.raw`\begin{aligned} d\rho_t &= (1 - \rho_t^2)\Big[ \big(\kappa(\mu - \rho_t) - \sigma^2 \rho_t\big)\,dt + \sigma\, dW_t \Big] = (1 - \rho_t^2)\Big[ \kappa^*(\mu^* - \rho_t)\,dt + \sigma^*\, dW_t \Big] \\ &\text{where } \kappa^* = \kappa + \sigma^2, \quad \mu^* = \frac{\kappa\mu}{\kappa + \sigma^2}, \quad \sigma^* = \sigma \end{aligned}`,
                },
              ]}
              subFormulas={[
                {
                  caption: '3. Marabel (2012) / Da Fonseca & Grasselli Wishart affine matrix diffusion',
                  tex: String.raw`\begin{aligned} dY_t &= \Big( (r - q)\mathbf{1} - \tfrac{1}{2}\operatorname{diag}(X_t) \Big)\,dt + \sqrt{X_t}\; dZ_t \\ dX_t &= \Big[ -M(\bar{X} - X_t) - (\bar{X} - X_t)M^{\top} \Big]\,dt + \sqrt{X_t}\; dB_t\, Q + Q^{\top} dB_t^{\top} \sqrt{X_t}, \qquad X_t \in \mathcal{S}_n^+ \end{aligned}`,
                },
                {
                  caption: 'Exponential-affine joint characteristic function of log-prices',
                  tex: String.raw`\Psi(\lambda; Y_0, X_0, T) = \exp\!\Big( R(\lambda, T) + \operatorname{tr}\big[ U(\lambda, T)\, X_0 \big] + \lambda^{\top} Y_0 \Big)`,
                },
              ]}
              notes={[
                <>In Unified Stochastic Volatility&ndash;Stochastic Correlation (USVSC), vol driver <M m={String.raw`dW_t^{\sigma}`} /> and correlation driver <M m={String.raw`dZ_t^{\rho}`} /> couple via <M m={String.raw`d\langle W^{\sigma}, Z^{\rho} \rangle_t = \rho_w\, dt > 0`} /> (with <M m={String.raw`\rho_B < 0`} /> and <M m={String.raw`\rho_Z < 0`} />).</>,
                <>Wishart Gindikin condition <M m={String.raw`\Omega\Omega^{\top} = \beta\, Q^{\top} Q`} /> with <M m={String.raw`\beta \ge n - 1`} /> ensures <M m="X_t" /> remains strictly positive definite, with instantaneous correlations <M m={String.raw`\rho_{ij}(t) = X_t^{ij} / \sqrt{X_t^{ii} X_t^{jj}}`} />.</>,
              ]}
            />

            <div className="space-y-2">
              <h4 className="font-serif text-base font-normal text-zinc-800 dark:text-zinc-200">
                Comparison of Multi-Asset Correlation Modeling Frameworks
              </h4>
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <table className="w-full min-w-[760px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                      <th className={TH}>Correlation Framework</th>
                      <th className={TH}>Mathematical Formulation</th>
                      <th className={TH}>PSD Guarantee</th>
                      <th className={TH}>MC Step Complexity</th>
                      <th className={TH}>Downside Correlation Breaks &amp; Skew</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <td className={TD_HEAD}>Constant Gaussian Correlation</td>
                      <td className={TD}><M m={String.raw`d\langle W^i, W^j \rangle_t = \rho_{ij}^0\, dt`} /></td>
                      <td className={TD}>Static check at <M m="t = 0" /> (<M m={String.raw`\nu^{\top}\rho_0\,\nu \ge 0`} />)</td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}><M m="O(n^2)" /> per step (1 Cholesky at <M m="t = 0" />)</td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}>Fails; captures ~50% of index skew &amp; ignores breaks</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Naive Multi-Pair Local Correlation</td>
                      <td className={TD}><M m={String.raw`\rho_{ij}(t, S_t^1, \dots, S_t^n)`} /> pair-by-pair</td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}>Not guaranteed; needs eigenvalue flooring</td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}><M m="O(n^3)" /> per step (full Cholesky each step)</td>
                      <td className={TD}>High flexibility, but under-determined &amp; <M m="O(n^3)" /> bottleneck</td>
                    </tr>
                    <tr>
                      <td className={`${TD} font-medium text-[#A8672E] dark:text-[#D08F52]`}>Langnau / Convex Aggregator (LVLC)</td>
                      <td className={TD}><M m={String.raw`\rho(\lambda)_t = (1 - \lambda)\rho_0 + \lambda\,\Theta`} /></td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}>Strictly guaranteed for <M m={String.raw`\lambda \in [0, 1]`} /> by convexity</td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}><M m="O(n)" /> per step via rank-1 <M m={String.raw`dW_t^{\Theta}`} /> mixing</td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}>Exact basket skew calibration + shadow delta <M m={String.raw`(\partial \pi / \partial \lambda)(\partial \lambda / \partial S_i)`} /></td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>1D Bounded Stochastic (Jacobi / tanh-OU)</td>
                      <td className={TD}><M m={String.raw`d\rho_t = (1 - \rho_t^2)[\kappa^*(\mu^* - \rho_t)dt + \sigma^* dW_t]`} /></td>
                      <td className={TD}>Guaranteed for <M m="n = 2" />; can fail PSD for <M m={String.raw`n \ge 3`} /></td>
                      <td className={TD}><M m="O(n^3)" /> for <M m={String.raw`n \ge 3`} /> if simulated independently</td>
                      <td className={TD}>Captures stochastic correlation premium &amp; vol-correl coupling (<M m="n = 2" />)</td>
                    </tr>
                    <tr>
                      <td className={`${TD} font-medium text-[#A8672E] dark:text-[#D08F52]`}>Wishart Affine Matrix Diffusion</td>
                      <td className={TD}><M m={String.raw`dX_t = [-M(\bar{X} - X_t) - \dots]dt + \sqrt{X_t}\,dB_t\,Q + \dots`} /></td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}>Intrinsically PSD on <M m={String.raw`\mathcal{S}_n^+`} /> (<M m={String.raw`\Omega\Omega^{\top} = \beta Q^{\top} Q`} />)</td>
                      <td className={TD}>High (<M m={String.raw`n \times n`} /> SDE), mitigated by Fourier calibration</td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}>Full stochastic covariance dynamics, cross-gamma &amp; skew</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Structural Pathologies and Hedging Crises in FCN Markets */}
        <section className="space-y-8 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              Structural Pathologies and Hedging Crises in FCN Markets
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Asymmetric return profiles and settlement lags on the buy side, paired with barrier pin risk, vanna/vomma duration flips, dividend crashes, and systemic index feedback loops on the sell side.
            </p>
          </div>

          {/* Buy-Side Structural Asymmetries and Microstructure Friction */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Buy-Side Structural Asymmetries and Microstructure Friction
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="acc">Bull Market Regime (Truncated Upside)</SideLabel>
                <ul className={UL}>
                  <li>&bull; Autocall barrier <M m="B_{KO}" /> terminates the note early&mdash;often after just <N>1 to 3 months</N>.</li>
                  <li>&bull; Caps investor return at a fraction of the annual coupon and forces reinvestment in a lower-volatility environment.</li>
                </ul>
              </div>
              <div className={`${CARD} space-y-2`}>
                <SideLabel tone="neg">Bear Market / Sector Shock (Worst-Of Tail Magnification)</SideLabel>
                <ul className={UL}>
                  <li>&bull; Autocall feature turns off, extending duration to full maturity <M m="T" /> while assigning physical delivery of the single biggest loser in the basket.</li>
                  <li>&bull; High-coupon baskets concentrated in correlated sector peers (e.g., 3 semiconductor or 3 bank stocks) expose the investor to up to <N>100%</N> principal loss in a corporate bankruptcy.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${CARD} space-y-1.5`}>
                <div className="font-mono text-xs uppercase text-[#BC4128] dark:text-[#E2694A]">
                  Uncompensated Trade-to-Settlement Timing Window
                </div>
                <ul className={UL}>
                  <li>&bull; Initial fixings <M m="S_i(0)" /> and barriers lock in on the Trade Date, but cash transfer and formal issuance occur on the Settlement Date up to <N>2 weeks</N> later.</li>
                  <li>&bull; Upon autocall, cash principal returns ~<N>1 week</N> (<N>5 business days</N>) after observation, extending equity risk beyond the interest accrual period.</li>
                </ul>
              </div>
              <div className={`${CARD} space-y-1.5`}>
                <div className="font-mono text-xs uppercase text-[#BC4128] dark:text-[#E2694A]">
                  Secondary Market Illiquidity &amp; Wrong-Way Credit Risk
                </div>
                <ul className={UL}>
                  <li>&bull; Captive single-dealer OTC market: unwinding early requires selling back to the original issuer at wide bid-offer haircuts (or facing no bid during turbulence).</li>
                  <li>&bull; Senior unsecured bank debt obligation: as seen with Lehman Brothers FCNs in September 2008, issuer default causes catastrophic principal loss even if equities stay above <M m="B_{KI}" />.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sell-Side Exotic Desk Traps and Systemic Feedback Loops */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
              Sell-Side Exotic Desk Traps and Systemic Feedback Loops
            </h3>

            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <span className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
                  Discontinuous Barrier Pin Risk &amp; Down-and-In Put (DIP) Delta Cliff
                </span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[#BC4128] dark:text-[#E2694A]">
                  Principal jump: <M m={String.raw`1 - B_{KI}/K`} /> (30%&ndash;50% drop)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <SideLabel tone="pos" className="mb-1">Immediately Above Knock-In Barrier (<M m={String.raw`W(t) > B_{KI}`} />)</SideLabel>
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    <li>&bull; Comfortably above <M m="B_{KI}" />, the bank is long gamma and short theta (<M m={String.raw`\Phi_{ii}^{Desk} > 0`} />).</li>
                    <li>&bull; Just above <M m="B_{KI}" />, theoretical positive spot Delta of the long DIP surges <strong>beyond 100% of notional</strong>, instructing a naive model to buy a massive pile of underlying shares.</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <SideLabel tone="neg" className="mb-1">One Tick Below Knock-In Barrier (Gap-Down Breach)</SideLabel>
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    <li>&bull; Barrier digital vanishes; option converts into a plain vanilla put at strike <M m="K" /> with a much smaller delta (<N>50% to 70%</N>).</li>
                    <li>
                      &bull; Trader is forced to dump excess stock inventory at depressed crisis prices, locking in gap losses unless mitigated via a{' '}
                      <Term
                        term="Barrier Shift (DIP Write-Off)"
                        definition="Exotic desk risk protocol that shifts the model's Knock-In barrier downward (e.g., pricing and hedging a 60% contractual barrier as if located at 55%) to systematically under-hedge above the cliff."
                      >
                        Barrier Shift (DIP Write-Off)
                      </Term>{' '}
                      (e.g., hedging a <N>60%</N> barrier at <N>55%</N>).
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <span className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
                  Vega Duration Flip &amp; The Vanna / Vomma Trap
                </span>
                <span className="font-mono tabular-nums text-xs px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[#A8672E] dark:text-[#D08F52]">
                  Day-1 3Y note vega: -0.60% / vol pt (desk +0.60% long vega, hedged at ~2Y expected tenor)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <SideLabel tone="acc" className="mb-1">Market Rally Toward <M m="B_{KO}" /> (Duration Collapse)</SideLabel>
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    <li>&bull; Next-observation autocall probability approaches <N>100%</N>, causing the note&apos;s long-dated vega to collapse to zero.</li>
                    <li>&bull; Desk is left naked short the <N>2-year</N> <N>50%</N>-strike vanilla puts sold on Day 1 and must buy back long-term vega while selling short-term vega.</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <SideLabel tone="neg" className="mb-1">Market Crash Toward <M m="B_{KI}" /> (Duration Extension &amp; Vega Flip)</SideLabel>
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    <li>&bull; Autocall probability drops to zero, extending effective duration out to the full <N>3-year</N> maturity.</li>
                    <li>&bull; Via Vanna (<M m={String.raw`\partial^2 V / \partial S \partial \sigma`} />) and Vomma (<M m={String.raw`\partial^2 V / \partial \sigma^2`} />), short vanilla puts move ATM with surging vega while the exotic note&apos;s vega collapses or flips negative below <M m="B_{KI}" />, forcing volatility buybacks at peak panic.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${CARD} space-y-2`}>
                <div className="font-mono text-xs uppercase text-[#BC4128] dark:text-[#E2694A]">
                  Pro-Cyclical Dividend Explosion &amp; Correlation Breaks
                </div>
                <ul className={UL}>
                  <li>&bull; Falling equity markets extend note duration and forward sensitivity, magnifying the bank&apos;s long dividend position just as corporations slash payouts (e.g., March 2020 COVID-19 crisis).</li>
                  <li>
                    &bull; OTC correlation swaps proved illiquid and failed to track simultaneous volatility-correlation spikes (<M m={String.raw`\rho_{ij}\sigma_i\sigma_j`} />), driving desks toward{' '}
                    <Term
                      term="Covariance Swaps"
                      definition="OTC derivative swaps paying the realized off-diagonal covariance ρᵢⱼ·σᵢ·σⱼ against a fixed strike, overcoming the failure of pure correlation swaps to hedge joint volatility-correlation spikes."
                    >
                      covariance swaps
                    </Term>{' '}
                    and correlation reserve buffers.
                  </li>
                </ul>
              </div>
              <div className={`${CARD} space-y-2`}>
                <div className="font-mono text-xs uppercase text-[#BC4128] dark:text-[#E2694A]">
                  Systemic Index Feedback Loops (Korean ELS &amp; HSCEI)
                </div>
                <ul className={UL}>
                  <li>&bull; During the <strong>2015&ndash;2016</strong> Hang Seng China Enterprises Index (HSCEI) crash (<N>-49%</N> from May 2015 peak), and again in <strong>2020</strong> and <strong>2023&ndash;2024</strong>, tens of billions of dollars of notes clustered around <N>50%&ndash;60%</N> KI barriers.</li>
                  <li>&bull; Simultaneous barrier breaches triggered forced futures liquidation (dumping pre-breach DIP delta hedges) and frantic vega/vanna covering, accelerating the cash index crash and prompting billions in investor losses and regulatory compensation mandates.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-base font-normal text-zinc-800 dark:text-zinc-200">
                Buy-Side and Sell-Side Quantitative Risk &amp; Mitigation Architecture
              </h4>
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <table className="w-full min-w-[760px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                      <th className={TH}>Risk Category</th>
                      <th className={TH}>Affected Party</th>
                      <th className={TH}>Quantitative Mechanism</th>
                      <th className={TH}>Crisis Manifestation</th>
                      <th className={TH}>Primary Mitigation / Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <td className={TD_HEAD}>Worst-Of Tail &amp; Return Asymmetry</td>
                      <td className={TD}>Buy-Side Investor</td>
                      <td className={TD}>Short <M m={String.raw`\min_i S_i(T)/S_i(0)`} /> DIP + Up-and-Out cap</td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}>Upside capped early; single crashing stock forces physical delivery at <M m="K" /></td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}>Low-strike buffer (<M m={String.raw`K = 70\%\text{–}85\%`} />), European KI &amp; credit selection</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Trade-to-Settlement Timing Lag</td>
                      <td className={TD}>Buy-Side Investor</td>
                      <td className={TD}><M m="S_i(0)" /> locked on Trade Date; cash paid +2 weeks</td>
                      <td className={TD}>Uncompensated downside equity risk for 2 extra weeks before accrual</td>
                      <td className={TD}>Limit Price orders or averaging initial valuation across Open/Close</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Secondary Illiquidity &amp; Credit Risk</td>
                      <td className={TD}>Buy-Side Investor</td>
                      <td className={TD}>Unsecured senior debt with single-dealer OTC exit</td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}>Punitive bid-offer haircuts; total loss on issuer default (Lehman 2008)</td>
                      <td className={TD}>Diversifying issuer panels &amp; matching tenor to liquidity horizon</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Down-and-In Barrier Pin Risk</td>
                      <td className={TD}>Sell-Side Exotic Desk</td>
                      <td className={TD}>Dirac delta across <M m={String.raw`\Gamma_{KI} = \{W(t) = B_{KI}\}`} /> flips <M m={String.raw`\Delta`} /> &amp; <M m={String.raw`\Gamma`} /></td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}>Long stock hedge &gt;100% above <M m="B_{KI}" /> dumped at fire-sale prices on breach</td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}>Barrier shifting / smoothing (DIP write-off) &amp; under-hedging near <M m="B_{KI}" /></td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Vanna, Vomma &amp; Duration Extension</td>
                      <td className={TD}>Sell-Side Exotic Desk</td>
                      <td className={TD}><M m={String.raw`\mathbb{E}[\tau]`} /> expands from 3M&ndash;1Y to full <M m="T" />; Vega flips sign</td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}>Dealers forced to buy back long-dated vol/variance at peak crisis levels</td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}>SLV McKean particle calibration &amp; bucketed OTM put vega hedging</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Dividend Exposure Explosion</td>
                      <td className={TD}>Sell-Side Exotic Desk</td>
                      <td className={TD}>Short autocallable is long equity forward &rarr; long dividends</td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}>Falling markets magnify long dividend exposure during corporate cuts</td>
                      <td className={TD}>Dynamic dividend swap hedging &amp; spot-dividend stress testing</td>
                    </tr>
                    <tr>
                      <td className={TD_HEAD}>Cross-Gamma &amp; Correlation Breaks</td>
                      <td className={TD}>Sell-Side Exotic Desk</td>
                      <td className={TD}><M m={String.raw`\Phi_{ij}^{Desk} < 0`} />; realized covariance &gt; <M m={String.raw`\rho_{ij}^{imp}\sigma_i\sigma_j`} /></td>
                      <td className={`${TD} text-[#BC4128] dark:text-[#E2694A]`}>Unhedgeable daily delta-rebalancing bleed as correlation &rarr; 100%</td>
                      <td className={`${TD} text-[#1D8A70] dark:text-[#3CBF9C]`}>LVLC shadow delta adjustments, Wishart/SCP pricing &amp; covariance swaps</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Synthesis of Quantitative Risk Management Imperatives */}
        <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-normal text-zinc-900 dark:text-zinc-50">
              Synthesis of Quantitative Risk Management Imperatives
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Converting multi-asset tail dispersion, downside volatility skew, and pathwise barrier convexity into an optically smooth coupon stream demands three mandatory institutional risk pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                Imperative I &bull; Coupled Smile &amp; Dependency
              </div>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>&bull; Marginal volatility and multi-asset correlation cannot be decoupled without introducing severe specification error.</li>
                <li>&bull; Pair SLV marginal processes (Guyon&ndash;Henry-Labord&egrave;re McKean particle method) with Local Correlation (LVLC) or Wishart/Bounded Stochastic Correlation, embedding shadow correlation delta <M m={String.raw`(\partial \pi / \partial \lambda)(\partial \lambda / \partial S_i)`} /> into daily delta hedges.</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C]">
                Imperative II &bull; Discontinuity Regularization
              </div>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>&bull; Sharp indicator boundaries at autocall dates and knock-in barriers destroy raw pathwise and finite-difference Monte Carlo Greeks.</li>
                <li>&bull; Deploy automated Fuzzy Logic payoff smoothing across cash-flow expression trees (calibrating <M m={String.raw`\varepsilon`} /> via pre-simulated conditional variance) alongside deliberate barrier shifting near the Down-and-In cliff.</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                Imperative III &bull; Cross-Gamma &amp; Liquidity Bounds
              </div>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>&bull; Off-diagonal Dollar Cross-Gamma <M m={String.raw`\Phi_{ij}`} /> cannot be locally hedged with single-stock vanilla options, leaving irreducible realized-vs-implied covariance P&amp;L variance.</li>
                <li>&bull; Govern warehousing limits by stress-tested covariance swap equivalents, corporate dividend crash scenarios, and aggregate barrier concentration relative to underlying cash and futures liquidity.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
