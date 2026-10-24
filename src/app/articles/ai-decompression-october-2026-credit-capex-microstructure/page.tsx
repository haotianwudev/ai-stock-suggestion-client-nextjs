'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

interface JargonProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

const Jargon: React.FC<JargonProps> = ({ term, definition, children }) => {
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
        aria-label={`${term}: ${definition}`}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        className="cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm px-0.5 transition-colors"
      >
        {children || term}
      </span>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-md border border-zinc-700 dark:border-zinc-800 bg-[#14171B] dark:bg-[#05070A] p-3 text-xs leading-relaxed text-zinc-100 dark:text-zinc-200 shadow-xl pointer-events-none"
        >
          <span className="block font-mono font-semibold text-[#D08F52] mb-1">{term}</span>
          <span className="block font-sans text-zinc-200 dark:text-zinc-300">{definition}</span>
        </span>
      )}
    </span>
  );
};

type Tone = 'neg' | 'pos' | 'acc';

const TONE: Record<Tone, string> = {
  neg: 'text-[#BC4128] dark:text-[#E2694A]',
  pos: 'text-[#1D8A70] dark:text-[#3CBF9C]',
  acc: 'text-[#A8672E] dark:text-[#D08F52]',
};

/** Monospace tabular number span, optionally tinted. */
const N = ({ t, children }: { t?: Tone; children: React.ReactNode }) => (
  <span className={`font-mono tabular-nums ${t ? TONE[t] : ''}`}>{children}</span>
);

const Strong = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{children}</span>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-2">
    {children}
  </h2>
);

const UL = 'space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-4';
const UL_BODY = 'space-y-2 text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5';

/** Titled comparison card with a colored status tag (color + label, not color alone). */
function Card({
  title,
  tag,
  tone,
  children,
}: {
  title: React.ReactNode;
  tag: string;
  tone: Tone;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111419] p-5 space-y-2">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
        <span className="font-serif text-base font-medium text-zinc-900 dark:text-zinc-100">{title}</span>
        <span className={`font-mono text-xs text-right ${TONE[tone]}`}>{tag}</span>
      </div>
      {children}
    </div>
  );
}

/** Dark formula panel: KaTeX equations on top, annotated calibration notes beneath. */
function Panel({
  title,
  sub,
  formulas,
  noteTitle,
  children,
}: {
  title: React.ReactNode;
  sub: string;
  formulas: string[];
  noteTitle: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-zinc-800 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <span className="font-serif text-base text-[#D08F52]">{title}</span>
        <span className="font-mono text-xs text-zinc-400">{sub}</span>
      </div>
      <div className="text-zinc-100 text-sm">
        {formulas.map((f, i) => (
          <MathBlock key={i} math={f} />
        ))}
      </div>
      <div className="border-t border-zinc-800 pt-3 font-mono text-xs tabular-nums text-zinc-300 space-y-1.5">
        <div className="text-[#D08F52] font-semibold">{noteTitle}</div>
        {children}
      </div>
    </div>
  );
}

type Cell = React.ReactNode | { c: React.ReactNode; t?: Tone; m?: boolean };

const isCellObj = (v: Cell): v is { c: React.ReactNode; t?: Tone; m?: boolean } =>
  typeof v === 'object' && v !== null && 'c' in (v as object) && !React.isValidElement(v);

/** Mono (numeric) cell with optional tone. */
const m = (c: React.ReactNode, t?: Tone): Cell => ({ c, t, m: true });
/** Plain-font cell with a tone. */
const x = (c: React.ReactNode, t: Tone): Cell => ({ c, t });

function DataTable({ head, rows }: { head: string[]; rows: Cell[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111419]">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300">
            {head.map((h) => (
              <th key={h} className="py-3 px-4 font-serif font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => {
                const o = isCellObj(cell) ? cell : { c: cell };
                const cls = [
                  'py-3 px-4',
                  ci === 0 ? 'font-medium text-zinc-900 dark:text-zinc-100' : '',
                  (o as { m?: boolean }).m ? 'font-mono tabular-nums' : '',
                  (o as { t?: Tone }).t ? TONE[(o as { t: Tone }).t] : '',
                ].join(' ');
                return (
                  <td key={ci} className={cls}>
                    {o.c}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const StatTile = ({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: Tone;
}) => (
  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111419] p-4">
    <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
    <div className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${TONE[tone]}`}>{value}</div>
    <div className="mt-1 font-mono text-xs tabular-nums text-zinc-600 dark:text-zinc-400">{sub}</div>
  </div>
);

const NEG = 'text-[#E2694A]';
const POS = 'text-[#3CBF9C]';

export default function ArticlePage() {
  return (
    <ArticleFrame
      slug="ai-decompression-october-2026-credit-capex-microstructure"
      additionalDisclaimer="Market data, credit analysis, and portfolio positioning discussed here are for educational purposes only and are not investment, credit-rating, or trading advice. Figures reflect third-party sources as of late October 2026."
    >
      <div className="space-y-14">
        {/* Stat row + key takeaways */}
        <header className="space-y-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile label="Nasdaq 100 Weekly Slide (Oct 16)" value="-5.5%" sub="29,187.55 • Worst since Apr 2025" tone="neg" />
            <StatTile label="2026 Hyperscaler Capex" value="$800B" sub="+94% YoY • $1.5T financing gap to 2028" tone="acc" />
            <StatTile label="CoreWeave 5Y CDS / 2031 Yield" value=">1,000 bps / ~16%" sub="Global IG spreads hit 129 bps (17-mo high)" tone="neg" />
            <StatTile label="10-Year US Treasury Yield" value="5.28%–5.36%" sub="+135 bps since Feb • 3.7% CPI & >$100 WTI" tone="neg" />
          </div>

          <div className="rounded-lg border border-[#A8672E]/30 dark:border-[#D08F52]/30 bg-[#F4EFEA] dark:bg-[#14171D] p-5 space-y-3">
            <h2 className="font-serif text-lg text-[#A8672E] dark:text-[#D08F52]">Key Takeaways</h2>
            <ul className="space-y-2 text-sm text-zinc-800 dark:text-zinc-200 list-disc pl-5">
              <li>
                <span className="font-semibold">Acute Cross-Asset Repricing:</span> Following all-time highs on October 6–9, 2026 (<N>27,366</N> Nasdaq Composite; <N>7,812</N> S&amp;P 500), technology-led liquidations drove the Nasdaq 100 down <N t="neg">-5.5%</N> on the week ended October 16 and the Nasdaq Composite down <N t="neg">-2.58%</N> (<N>-690.28</N> pts) on October 22.
              </li>
              <li>
                <span className="font-semibold">Credit Fragility Over Equity Multiples:</span> As hyperscaler capex surged toward <N>$800B</N> in 2026 against <N>~$60B</N> in 2025 industry AI revenues, marginal funding shifted to <N>$2.9T</N> in projected 2027 debt and <N>$1.5T–$2.0T</N> in off-balance-sheet leases, sparking acute distress in{' '}
                <Jargon term="Neocloud" definition="Specialized AI cloud infrastructure providers (such as CoreWeave, Fluidstack, Lambda, and Crusoe) that finance large GPU clusters using high-yield asset-backed private credit and customer compute contracts.">neocloud</Jargon>{' '}
                borrower CoreWeave.
              </li>
              <li>
                <span className="font-semibold">ROIC &amp; Second-Derivative Headwinds:</span> Hyperscalers require <N>$300B</N> in annual AI revenue simply to break even (<N>0%</N> ROIC) and <N>$1.0T</N> in end-user application spend to sustain ecosystem margins, while decelerating capex growth (<N>94%</N> in 2026 <span className="font-mono">&rarr;</span> <N>54%</N> in 2027 <span className="font-mono">&rarr;</span> <N>12%</N> in 2028) threatens hardware earnings revisions.
              </li>
              <li>
                <span className="font-semibold">Microstructure Correlation Shock:</span> On October 16, spot VIX surged <N t="neg">+21.45%</N> to <N>19.99</N> even though median single-stock volatility rose just <N>+32 bps</N>, driven mathematically by 3-month implied correlation jumping from near-zero lows to <N>13.98</N> and dealer negative gamma hedging.
              </li>
              <li>
                <span className="font-semibold">Capital-Cycle Reset, Not 2008 Solvency Crisis:</span> Unlike the <N>60.1x–200x</N> P/E multiples of March 2000, top AI leaders trade at <N>23x–30x</N> forward P/E; a modeled <N>30%</N> S&amp;P 500 capex bust (<N>$20T</N> equity loss, <N>$125B–$190B</N> credit loss) would mirror a 2001-style capital-cycle reset rather than a commercial banking crisis.
              </li>
            </ul>
          </div>
        </header>

        {/* Section 1 */}
        <section className="space-y-6">
          <H2>Executive Summary and the October 2026 Market Repricing</H2>

          <ul className={UL_BODY}>
            <li>
              <Strong>Record Highs to Consecutive Liquidations:</Strong> After peaking on October 6 and October 9, 2026 (Nasdaq Composite at <N>27,366</N>; S&amp;P 500 at <N>7,812</N>), the Nasdaq 100 fell <N t="neg">-5.5%</N> to <N>29,187.55</N> and the S&amp;P 500 lost <N t="neg">~-2.0%</N> to <N>7,659.44</N> during the week ended October 16.
            </li>
            <li>
              <Strong>October 22 Acceleration:</Strong> Selling resumed on Thursday, October 22, pushing the Nasdaq Composite down <N t="neg">-2.58%</N> (<N>-690.28</N> pts to <N>26,008.86</N>)&mdash;falling <N>2.17x</N> harder than the S&amp;P 500, which declined <N t="neg">-1.19%</N> (<N>-92.40</N> pts to <N>7,664.77</N>).
            </li>
            <li>
              <Strong>Cross-Sectional Isolation:</Strong> On October 16, the cap-weighted S&amp;P 500 fell <N t="neg">-1.09%</N> while the equal-weighted S&amp;P 500 slipped only <N t="pos">-0.40%</N> (<N>-69 bps</N> spread) and Europe&apos;s Stoxx 600 rose <N t="pos">+0.72%</N> to <N>644.75</N>, proving the shock was anchored in mega-cap AI rather than broad corporate deterioration.
            </li>
          </ul>

          <div className="space-y-2">
            <h3 className="font-serif text-base text-[#A8672E] dark:text-[#D08F52]">
              The{' '}
              <Jargon term="Double Squeeze" definition="Simultaneous valuation compression triggered by deteriorating internal cash-flow fundamentals inside the AI capex ecosystem colliding with an external macroeconomic discount-rate and energy shock.">Double Squeeze</Jargon>{' '}
              Compression Mechanism
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Microeconomic Cash-Flow & Credit Shock" tag="Internal Compression" tone="neg">
                <ul className={UL}>
                  <li>Widening chasm between <N>$800B</N> in 2026 hyperscaler capex and realized end-user AI monetization (<N>~$60B</N> in 2025 industry AI revenue).</li>
                  <li>Marginal funding shifted from internal operating cash flow to off-balance-sheet SPVs and high-yield private credit.</li>
                  <li>
                    Market penalized both heavy capex burn (<span className="font-semibold">Meta</span> <N t="neg">-7% to -8%</N> on first cash outflow in &gt;10 years from Muse AI agent spend) and capex cuts (<span className="font-semibold">Tesla</span> <N t="neg">-3.1%</N> after cutting 2026 capex plans, knocking chipmakers <N t="neg">&gt;-8.0%</N>).
                  </li>
                </ul>
              </Card>
              <Card title="Macroeconomic Rate & Energy Shock" tag="Discount-Rate Pressure" tone="neg">
                <ul className={UL}>
                  <li>Hot September US CPI print of <N t="neg">3.7%</N> YoY (Oct 14) paired with a <N t="neg">6.3%</N> surge in PPI repriced the Fed from rate cuts toward potential rate hikes.</li>
                  <li>Escalating conflict in Iran drove WTI crude to <N>$99.21–$100.06/bbl</N> and Brent crude to <N>$110.59–$113.00/bbl</N>.</li>
                  <li>
                    10-year US Treasury yield broke <N>5.00%</N> on Sept 15, closed Q3 at a 24-year high of <N>5.29%</N>, and tested <N t="neg">5.28%–5.36%</N> in October (<N>+135 bps</N> since Feb 2026), crushing equity duration.
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <DataTable
            head={[
              'Asset / Market Benchmark',
              'Mid-October Shock (Oct 14–16, 2026)',
              'Oct 22, 2026 Session Move',
              'Key Level / Metric',
              'Primary Quantitative & Fundamental Catalyst',
            ]}
            rows={[
              ['Nasdaq Composite', 'Extended multi-day tech slide', m('-2.58% (-690.28 pts)', 'neg'), m('26,008.86'), 'Fell 2.2x harder than S&P 500; steepest 1-day drop since June on AI capex & cash flow doubts.'],
              ['Nasdaq 100 (NDX)', m('-2.50% (Oct 16); -5.5% weekly', 'neg'), 'Tracked broad tech slide', m('29,187.55 (Oct 16)'), 'Worst week since April 2025; heavy concentration in AI hardware and hyperscalers.'],
              ['S&P 500 (Cap-Weighted)', m('-1.09% (Oct 16); ~-2.0% weekly', 'neg'), m('-1.19% (-92.40 pts)', 'neg'), m('7,664.77 (Oct 22)'), 'Top 3 AI weights (NVDA, AAPL, MSFT) represent 20% of index; Top 5 represent 30%.'],
              ['S&P 500 (Equal-Weighted)', m('-0.40% (Oct 16)', 'pos'), x('Outperformed cap-weighted', 'pos'), m('-69 bps spread vs. SPX', 'pos'), 'Demonstrates pain concentrated in mega-cap tech rather than broad corporate deterioration.'],
              ['Semiconductors (INTC, AMD, SNDK, MRVL)', m('-3.41% sector drop (Oct 16)', 'neg'), m('> -8.0% each', 'neg'), m('Technical bear market in Q3'), 'Direct revenue exposure to hyperscaler capex deceleration and Chinese memory competition.'],
              ['Meta Platforms (META)', m('-3.72% (Oct 16)', 'neg'), m('-7.0% to -8.0%', 'neg'), m('~$685.23 prior'), 'First cash outflow in >10 years; Muse AI agent spending compressed operating margins.'],
              ['Tesla (TSLA)', 'Volatile pre-earnings', m('-3.1%', 'neg'), m('~$371.14 prior'), 'Cut 2026 capex plans after AI chip capex tripled and earlier profits sank 43%.'],
              ['CoreWeave (CRWV)', m('Equity -25% weekly', 'neg'), x('Ongoing credit distress', 'neg'), m('2031 Yield ~16%; CDS >1,000 bps', 'neg'), 'Net interest expense more than doubled to $640M in Q2; acute neocloud refinancing stress.'],
              ['Global IG Credit Spreads', x('Surged to 17-month high', 'neg'), 'Elevated across US & Asia', m('129 bps (Bloomberg Index)', 'neg'), 'Widest corporate bond yield premiums since May 2025 due to debt-fueled AI spending fears.'],
              ['Asian Benchmarks (Nikkei 225 / Kospi)', m('Nikkei -3,318 pts (Oct 15)', 'neg'), m('Kospi -3.5%', 'neg'), m('3rd largest pt drop in Nikkei history'), 'Heavy index weighting in Korean memory exporters (Samsung) and tech investors (SoftBank).'],
              ['10-Year US Treasury Yield', m('5.28%–5.36% (safe-haven dip to 5.098%)'), m('Rebounded >5.25% range', 'neg'), m('+135 bps since Feb 2026', 'neg'), 'Driven by 3.7% CPI, >$100 oil, Fed hike repricing, and massive AI corporate bond supply.'],
            ]}
          />

          <InfographicSlot alt="Infographic: the October 2026 AI decompression across equities, credit, rates and volatility" />
        </section>

        {/* Section 2 */}
        <section className="space-y-6">
          <H2>The AI Credit and Debt Issue: Structural Mechanics and Merton Model Dynamics</H2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="2023–2024 Fortress Cash-Flow Regime" tag="Self-Funded Phase" tone="pos">
              <ul className={UL}>
                <li>Initial AI infrastructure buildout funded predominantly through internal operating cash flows and mega-cap balance sheets.</li>
                <li>Minimal reliance on structured project finance or asset-backed high-yield credit vehicles.</li>
              </ul>
            </Card>
            <Card title="2025–2027 Leveraged Credit & SPV Regime" tag="$1.5T Financing Gap" tone="neg">
              <ul className={UL}>
                <li>Four major cloud hyperscalers (Alphabet, Amazon, Meta, Microsoft) raised capex from <N>$381B</N> (2025) to <N>$700B–$800B</N> (2026) vs. <N>~$60B</N> in 2025 industry AI revenues.</li>
                <li>Amazon projected at <N t="neg">-$28B</N> negative FCF in 2026; Alphabet and Meta face FCF contractions approaching <N t="neg">90%</N>.</li>
                <li>Aggregate AI-related debt projected by TS Lombard to reach <N t="neg">$2.9T</N> by end-2027 (<N>$700B</N> new issuance in 2027 alone; <N>&gt;$400B</N> IG hyperscaler bonds + <N>$300B</N> data center project finance per Goldman Sachs).</li>
              </ul>
            </Card>
          </div>

          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111419] p-5 space-y-3">
            <h3 className="font-serif text-base text-zinc-900 dark:text-zinc-100">Non-Hyperscaler Credit Stack &amp; Four Structural Fault Lines</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-2">
              {[
                ['Outstanding Bonds', '$545B', ''],
                ['Bank Loans', '$920B', ''],
                ['Private Credit Facilities', '$650B', TONE.acc],
                ['Off-B/S Data Center Leases', '$1.5T–$2.0T', TONE.neg],
              ].map(([label, value, cls]) => (
                <div key={label} className="rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
                  <div className={`font-mono text-lg font-semibold tabular-nums ${cls || 'text-zinc-900 dark:text-zinc-100'}`}>{value}</div>
                </div>
              ))}
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                <Strong>GPU-Backed Private Credit &amp; Duration Mismatch:</Strong> High-yield facilities collateralized by GPUs include CoreWeave&apos;s <N>$7.5B</N> facility (May 2024, led by Blackstone at <N>~11%</N> variable rate), Fluidstack (<N>$10B</N>), Lambda (<N>$500M</N>), and Crusoe. Loans carry <N>5–6 year</N> maturities matching hyperscaler accounting schedules, whereas Nvidia&apos;s biennial architecture refresh (2025 GB200 racks replaced in 2027 and 2029) compresses economic life to <N>2–6 years</N>, while <N>8–24 month</N> equipment lead times and <N>up to 5-year</N> grid interconnection delays leave pre-purchased GPUs sitting idle in warehouses.
              </li>
              <li>
                <Strong>
                  Off-Balance-Sheet{' '}
                  <Jargon term="Special Purpose Vehicles (SPVs)" definition="Off-balance-sheet legal entities used to finance over $120B of data center construction in under two years, isolating corporate credit ratings while limiting lender recourse to physical data center shells.">Special Purpose Vehicles (SPVs)</Jargon>{' '}
                  &amp; Stranded Assets:
                </Strong>{' '}
                Tech firms shifted <N>&gt;$120B</N> into SPVs in under two years, including Meta&apos;s <N>$30B</N> private credit SPV for its <N>5-GW</N> Hyperion facility in Louisiana (Oct 2025), Google&apos;s <N>&gt;$5B</N> conditional backstops via Fluidstack, and Google&apos;s <N>$5B</N> Blackstone JV for <N>500 MW</N> of TPU capacity by 2027. Purpose-built <N>100kW+</N> rack densities and dielectric liquid-immersion cooling cannot be economically retrofitted for general CPU workloads, and grid delays can void contingent construction-milestone backstops.
              </li>
              <li>
                <Strong>
                  Circular Vendor Financing (
                  <Jargon term="Capex Recycling" definition="A circular financing loop flagged by the IMF in which hardware vendors or cloud providers invest equity or debt into AI labs and neoclouds, which immediately spend that capital buying chips or compute from the investor.">Capex Recycling</Jargon>
                  ):
                </Strong>{' '}
                The IMF&apos;s October 13, 2026 <em>Global Financial Stability Report</em> flagged <N>14</N> circular deals totaling <N>$300B</N> equity, <N>$650B</N> debt, and <N>$1.4T</N> in circular revenue commitments (e.g., Nvidia&apos;s <N>7%</N> equity stake and <N>$6.3B</N> cloud commitment in CoreWeave plus <N>$30B</N> pledged to OpenAI). Under the <N>$500B</N>, <N>10-GW</N> Stargate JV, OpenAI committed <N>$300B</N> over 5 years (<N>$60B/yr</N> or <N>~$5B/mo</N>) to Oracle against <N>~$25B</N> ARR (<N>~$2B/mo</N>) and a projected <N>$14B</N> 2026 net loss&mdash;leaving a <N t="neg">~$35B</N> annual cash-flow shortfall reliant on mega-rounds (such as its <N>$122B</N> raise in March 2026 at an <N>$852B</N> valuation). Nvidia paused several customer deals on August 27, 2026, and Nvidia-backed Firmus scrapped its <N>$5B</N> Australian IPO on October 9.
              </li>
              <li>
                <Strong>CoreWeave Contagion &amp; Global Credit Spillover:</Strong> After Q2 net interest expense more than doubled to <N t="neg">$640M</N>, CoreWeave&apos;s 2031 bond yield spiked to <N t="neg">~16%</N>, 5Y CDS crossed <N t="neg">&gt;1,000 bps</N>, and equity fell <N t="neg">-25%</N> (Oct 14–16). Global IG spreads widened to <N>129 bps</N>, Asian regional CDS rose <N>+1.5 bps</N> to <N>78 bps</N>, Chinese tech IG widened <N>+3–5 bps</N>, and Indian/Korean IG widened <N>+3 bps</N>.
              </li>
            </ul>
          </div>

          <Panel
            title="Black-Scholes-Merton (1974) Structural Credit Risk & Distance-to-Default"
            sub="Convex Spread Blowout Under Negative Collateral Drift"
            formulas={[
              String.raw`\frac{dV_t}{V_t} = \mu_V\,dt + \sigma_V\,dW_t`,
              String.raw`E_t = V_t\,\Phi(d_1) - D\,e^{-r(T-t)}\,\Phi(d_2)`,
              String.raw`d_1 = \frac{\ln(V_t/D) + \left(r + \tfrac{1}{2}\sigma_V^2\right)(T-t)}{\sigma_V\sqrt{T-t}},\qquad d_2 = d_1 - \sigma_V\sqrt{T-t}`,
              String.raw`PD = \Phi(-d_2),\quad L_t = \frac{D\,e^{-r(T-t)}}{V_t},\quad s_t = -\frac{1}{T-t}\ln\!\left(\Phi(d_2) + \frac{1}{L_t}\Phi(-d_1)\right)`,
              String.raw`\sigma_E = \sigma_V\,\frac{V_t}{E_t}\,\Phi(d_1)`,
            ]}
            noteTitle="Empirical Application — CoreWeave (Oct 14–16, 2026):"
          >
            <div>&bull; Facility: $7.5B debt originated May 2024 (~11% variable rate); principal repayments began Jan 2026; Q2 net interest expense &gt;2x to $640M.</div>
            <div>
              &bull; Parameter Shock: 18–24 mo GPU refresh cycle + up to 5-yr grid delays turn asset drift <InlineMath math={String.raw`\mu_V < 0`} /> while asset volatility <InlineMath math={String.raw`\sigma_V`} /> and leverage <InlineMath math={String.raw`V_t/E_t`} /> spike.
            </div>
            <div>
              &bull; Nonlinear Output:{' '}
              <Jargon term="Distance-to-Default (DD)" definition="In the Merton structural credit model, d_2 measures the number of standard deviations a firm's asset value V_t is above the default barrier D at maturity T.">
                Distance-to-Default (<InlineMath math="d_2" />)
              </Jargon>{' '}
              collapsed, driving CRWV equity <span className={NEG}>-25%</span> weekly, 2031 bond yield to <span className={NEG}>~16%</span>, and 5Y CDS <span className={NEG}>&gt;1,000 bps</span>.
            </div>
          </Panel>

          <Panel
            title={
              <>
                The AI Credit Residual (<InlineMath math={String.raw`\varepsilon_{i,t}`} />) &amp; Wrong-Way Collateral Recovery
              </>
            }
            sub="Issuer-Specific Obsolescence & Bimodal LGD Shift"
            formulas={[
              String.raw`\varepsilon_{i,t} = \Delta y_{i,t} - \left(\Delta r_t + \beta_i\,\Delta S_{M,t} + \Delta S_{R,t}\right)`,
              String.raw`RR \in [0,1] \sim \text{Beta-Mixture}(\text{modes: } 0,\ 0.55,\ 1.0) \;\rightarrow\; \text{Correlated UCC Art. 9 GPU liquidation: } RR \to 0\ (LGD \to 100\%)`,
            ]}
            noteTitle={
              <>
                Empirical Decomposition &amp;{' '}
                <Jargon term="Wrong-Way Risk (WWR)" definition="Credit risk where Exposure at Default is positively correlated with Probability of Default—occurring when simultaneous neocloud defaults flood the secondary market with foreclosed GPUs, crashing collateral recovery precisely at default.">Wrong-Way Risk (WWR)</Jargon>:
              </>
            }
          >
            <div>
              &bull; Benchmark Inputs: 10Y Treasury safe-haven move <InlineMath math={String.raw`\Delta r_t = -9.6\text{ bps}`} /> (to 5.098%); Global IG spread <InlineMath math={String.raw`\Delta S_{M,t}`} /> widened to 129 bps; Asian/Tech IG cohorts <InlineMath math={String.raw`\Delta S_{R,t}`} /> +1.5 to +5 bps.
            </div>
            <div>
              &bull; Residual Surge: Because rating agencies rated construction tranches IG based on conditional hyperscaler leases rather than standalone GPU collateral, <InlineMath math={String.raw`\varepsilon_{i,t}`} /> spiked as market yields priced unrated renewal and milestone-voidance risk.
            </div>
          </Panel>
        </section>

        {/* Section 3 */}
        <section className="space-y-6">
          <H2>The Capital Expenditure and ROIC Dilemma: Second-Derivative Risk</H2>

          <ul className={UL_BODY}>
            <li>
              <Strong>Tripling of Hyperscaler Capex (2024–2026):</Strong> Spending across Microsoft, Amazon, Alphabet, Meta, and Oracle rose from <N>$241B</N> (2024) to <N>$381B–$405B</N> (2025) and accelerated <N t="acc">+94% YoY</N> to <N t="acc">~$800B</N> in 2026.
            </li>
            <li>
              <Strong>2027–2030 Trajectory:</Strong> Consensus projects <N>$1.1T</N> in 2027 (up from <N>$920B</N> earlier in 2026), while Goldman Sachs models <N>$1.2T</N> in 2027 and <N>$1.4T</N> in 2028 (with upper-bound revisions hitting <N>$1.4T</N> in 2027) and <N>$5.2T</N> globally through 2030 (anchored by <N>$500B</N> / <N>10-GW</N> Stargate at <N>$50B/GW</N>&mdash;including <N>$30B/GW</N> in chips&mdash;and Meta&apos;s <N>$27B–$30B</N>, <N>5-GW</N> Hyperion campus).
            </li>
          </ul>

          <Panel
            title={
              <>
                Steady-State ROIC Revenue Hurdle (<InlineMath math="R^*" />) &amp; Accounting Depreciation Ratchet
              </>
            }
            sub="Goldman Sachs GIR Framework (Sept 24, 2026)"
            formulas={[
              String.raw`ROIC_t = \frac{NOPAT_t}{K_t} = \frac{(R_t\,m_{op} - \delta K_t)(1-\tau)}{K_t} \ge ROIC^*`,
              String.raw`R^* \ge \frac{K_t}{m_{op}}\left[\frac{ROIC^*}{1-\tau} + \delta\right],\qquad \delta = \frac{1}{L},\ L \in [3,6]\text{ years}`,
              String.raw`Dep_t = \sum_{k=0}^{L-1} \frac{1}{L}\,Capex_{t-k}`,
            ]}
            noteTitle="Worked Revenue Thresholds on $800B–$1.2T Annual Hyperscaler Capex Base:"
          >
            <div>
              &bull; Break-Even Hurdle (<InlineMath math={String.raw`ROIC^* = 0\%`} />): Requires <span className="text-white font-semibold">~$300B</span> in annual AI infrastructure revenue just to cover escalating <InlineMath math="Dep_t" /> and operating costs.
            </div>
            <div>
              &bull; Cost-of-Capital Hurdle (<InlineMath math={String.raw`ROIC^* = 10\%`} />): Requires <span className="text-white font-semibold">~$417B</span> in annual AI infrastructure revenue (steeper at 15% target).
            </div>
            <div>
              &bull; End-User Application Hurdle: Requires <span className={`${NEG} font-semibold`}>~$1.0T/yr</span> in application spend (= 67% of the $1.5T global software market; &gt;50% of $1.8T total US labor productivity gains; Sequoia estimates <span className={NEG}>~$3.0T</span> cumulative revenue needed).
            </div>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Realized Monetization vs. Backlog" tag="$70B Run-Rate vs. $1T Hurdle" tone="acc">
              <ul className={UL}>
                <li>Cumulative industry spending reached <N>$1.4T</N> through May 2026 against <N>$718B</N> cumulative revenue; Q2 2026 above-trend cloud revenue run-rate stood at <N>~$70B</N> annualized.</li>
                <li>Bulls cite <N t="pos">$1.5T–$1.7T</N> in multi-year cloud backlogs, TSMC&apos;s <N t="pos">+75%</N> Q3 operating income jump (Oct 15), and Amazon&apos;s <N t="pos">+43%</N> Q2 operating income rise, but a large share reflects venture/neocloud capex recycling.</li>
              </ul>
            </Card>
            <Card
              title={
                <>
                  <Jargon term="Depreciation Ratchet" definition="The mechanical compounding of GAAP depreciation expenses on hyperscaler income statements as successive $800B–$1.2T annual capex cohorts are amortized over 5–6 year schedules, compressing operating margins even after capex growth slows.">Depreciation Ratchet</Jargon>{' '}
                  &amp;{' '}
                  <Jargon term="Second-Derivative Risk" definition="The quantitative sensitivity of semiconductor and hardware revenue growth (ΔC_t / C_t-1) to a deceleration in the growth rate of hyperscaler capex, even when absolute dollar capex continues to rise.">Second-Derivative Risk</Jargon>
                </>
              }
              tag="94% → 54% → 12%"
              tone="neg"
            >
              <ul className={UL}>
                <li>
                  AI capex drove <N>~50%</N> of total S&amp;P 500 EPS growth in 2026, but YoY hyperscaler capex growth (<InlineMath math={String.raw`\Delta C_t / C_{t-1}`} />) is projected to slow from <N>94%</N> (2026) to <N>54%</N> (2027) and <N t="neg">12%</N> (2028).
                </li>
                <li>
                  Because chipmaker revenue depends on the <em>level</em> of capex (<InlineMath math="C_t" />), hardware revenue <em>growth</em> rolls over as <InlineMath math={String.raw`\Delta C_t / C_{t-1}`} /> decelerates&mdash;explaining why Tesla&apos;s capex cut sent Intel, AMD, Sandisk, and Marvell down <N t="neg">&gt;-8%</N> and Korea&apos;s Kospi down <N t="neg">-3.5%</N>.
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-6">
          <H2>Market Microstructure and Quantitative Mechanics of the Selloff</H2>

          <Panel
            title="Index Implied Variance & The Implied Correlation Paradox"
            sub="Why VIX Spiked +21.45% While Single-Stock IV Moved +32 bps"
            formulas={[
              String.raw`\sigma_{Index}^2 = \sum_{i=1}^{N} w_i^2\sigma_i^2 + \sum_{i=1}^{N}\sum_{j\ne i} w_i w_j\,\sigma_i\sigma_j\,\rho_{ij}`,
              String.raw`\sigma_{Index} \approx \sqrt{\bar{\rho}_{imp}}\;\sum_{i=1}^{N} w_i\sigma_i`,
            ]}
            noteTitle="Worked Microstructure Calibration (Oct 15–16, 2026):"
          >
            <div>&bull; Pre-Shock Baseline: 6M realized S&amp;P 500 correlation pinned at <span className="text-white">0.01</span> (lowest since 2001); single-stock vs. index vol spread at <span className="text-white">24.7 pts</span>, suppressing VIX &lt; 16.</div>
            <div>&bull; Oct 16 Single-Stock IV: Median 1Y single-stock IV across 187 US equities edged up just <span className={POS}>+32 bps</span> (+0.96% relative, from 33.38% to 33.70%); index dispersion flat at <span className="text-white">36.60</span>.</div>
            <div>
              &bull; Oct 16 Correlation Repricing: Top 3 weights (20% of SPX) and Top 5 weights (30% of SPX) fell together with software (-4.80%) and semis (-3.41%). 3M{' '}
              <Jargon term="Implied Correlation" definition="The market-implied average pairwise correlation (ρ_imp) between index constituents derived from index option prices relative to single-stock option prices.">
                implied correlation (<InlineMath math={String.raw`\bar{\rho}_{imp}`} />)
              </Jargon>{' '}
              jumped <span className={NEG}>+9.31%</span> to 12.80 (Oct 15) and <span className={NEG}>+16.11%</span> to 13.98 (Oct 16, 60-session high), forcing VIX up <span className={NEG}>+21.45%</span> (+3.53 pts, from 16.46 to 19.99; intraday peak 22.31).
            </div>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Ultra-Front-End Inversion & Tail-Risk SKEW" tag="Oct 15–16 Event Panic" tone="neg">
              <ul className={UL}>
                <li>
                  On Oct 15, VIX1D jumped <N t="neg">+31.62%</N> to <N>14.11</N> (vs. 1Y IV <N>+1.29%</N> to <N>21.94</N>). By Oct 16, VIX1D surged <N t="neg">+9.37 pts</N> to <N>23.27</N> and VIX9D rose <N>+6.15 pts</N> to <N>20.12</N>&mdash;both inverting above 30-day VIX (<N>19.99</N>), pushing VIX1D/VIX to <N>1.16</N> and compressing VIX3M/VIX from <N>1.18</N> to <N>1.03</N>.
                </li>
                <li>
                  <Jargon term="CBOE SKEW Index" definition="A measure of the perceived tail risk of the S&P 500 derived from the pricing of far out-of-the-money (OTM) index puts relative to at-the-money options.">CBOE SKEW</Jargon>{' '}
                  hit <N>157.30</N> (Oct 15) and <N t="neg">168.59</N> (Oct 16, <N>+5.07%</N>, 60-session high), tail-risk gauge jumped <N>+48.98%</N>, VVIX reached <N>109.91</N>, and an institutional block placed <N>$2.8M</N> in calls betting VIX stays <N>&gt;23</N>.
                </li>
              </ul>
            </Card>
            <Card title="Medium-Term Contango & Retail Dip-Buying" tag="Day 138 Contango Regime" tone="pos">
              <ul className={UL}>
                <li>
                  1-year implied volatility added only <N t="pos">+0.84 pts</N> to <N>22.61</N> on Oct 16. By Oct 22, spot VIX was <N>19.03</N> vs. VIX3M at <N>20.12</N> (IVTS ratio <N t="pos">0.9458</N>, Day 138 of contango).
                </li>
                <li>
                  VIX futures remained upward-sloping (<N>19.11</N> Nov 2026 <span className="font-mono">&rarr;</span> <N>20.23</N> Jan 2027 <span className="font-mono">&rarr;</span> <N>22.45</N> Aug 2027), while retail call chasing in speculative names like Webull pushed single-stock put/call ratios down to <N>0.21</N> on Oct 22.
                </li>
              </ul>
            </Card>
          </div>

          <Panel
            title={
              <>
                Dealer Negative Gamma Hedging Flow (<InlineMath math={String.raw`\Delta H_t`} />) &amp; Systematic Volatility Scaling (<InlineMath math="w_t" />)
              </>
            }
            sub="Pro-Cyclical Futures Selling During Buyback Blackout"
            formulas={[
              String.raw`\Delta H_t = -\Gamma_{dealer}\,\Delta S_t \qquad (\Gamma_{dealer} < 0 \text{ forces futures selling when } \Delta S_t < 0)`,
              String.raw`w_t = \frac{\bar{\sigma}_{target}}{\hat{\sigma}_t} \qquad (\bar{\sigma}_{target} \in [12\%,\,15\%])`,
            ]}
            noteTitle="Systematic De-Grossing & Factor Rotation Mechanics:"
          >
            <div>
              &bull; Liquidity Vacuum: Post-Labor Day customer put roll-offs flipped dealer{' '}
              <Jargon term="Negative Gamma" definition="An options market-maker positioning regime (Γ_dealer < 0) where dealers must sell underlying futures as prices fall and buy as prices rise to remain delta-neutral, amplifying intraday volatility.">gamma</Jargon>{' '}
              to the <span className={NEG}>26th percentile</span> just as the October corporate buyback blackout paused the &gt;$1T annual S&amp;P 500 repurchase bid.
            </div>
            <div>&bull; CTA &amp; Vol-Control Cascade: Following a ~17% rally off prior lows, the +21.5% VIX spike forced Vol-Control and Risk Parity funds to cut <InlineMath math="w_t" /> while CTAs unwound S&amp;P trend signals (mirroring drops from +100% long to +60%).</div>
            <div>&bull; Factor Unwind: Amid a 4,200 bps YTD sector spread (Energy +40% YTD, Tech +30% YTD, Financials -2% YTD), 100%–200% Q2 semi/memory gains, and a 94 bps 2s30s bear steepener, long/short Momentum tumbled <span className={NEG}>~-10%</span> while capital rotated into US Value and Global Quality (&gt;1 SD cheap vs. history).</div>
          </Panel>
        </section>

        {/* Section 5 */}
        <section className="space-y-6">
          <H2>Measuring the AI Bubble: Quantitative Benchmarking Against Historical Manias</H2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Cisco Systems (March 2000 Peak)" tag="~200x Trailing P/E" tone="neg">
              <ul className={UL}>
                <li>Peak market cap of <N>$370B–$555B</N> after a <N>+1,000%</N> 10-year surge.</li>
                <li>FY00 revenue of <N>$18.93B</N> (<N>+55%</N> YoY) and full-year net income of <N>$2.67B</N>.</li>
                <li>Traded at <N t="neg">~200x</N> trailing P/E (<N>&gt;150x</N> forward P/E) and <N>~20x</N> price-to-sales; <N>83%</N> of top-7 tech price gains (1997–2000) came from multiple expansion (only <N>17%</N> from EPS).</li>
              </ul>
            </Card>
            <Card title="Nvidia (October 2026 Peak)" tag="47x–56x Trailing P/E" tone="pos">
              <ul className={UL}>
                <li>Market cap rose from <N>$4.3T</N> (Feb 2026) to <N>~$5.7T</N> peak (early Oct 2026) following a <N>+1,150%–2,000%</N> surge since Oct 2022.</li>
                <li>FY26 sales of <N>$215.9B</N> (<N>+65%</N> YoY); Q2 FY27 sales of <N>$96.2B</N> (<N>+106%</N> YoY; Q3 guided to <N>$108B</N>) at <N t="pos">75%</N> gross margin and <N t="pos">53%</N> net margin.</li>
                <li>Generates <N t="pos">~$25B–$50B+</N> in quarterly net profit (<N>&gt;9x–18x</N> Cisco&apos;s annual profit in a single quarter) at a quarter of Cisco&apos;s P/E multiple.</li>
              </ul>
            </Card>
          </div>

          <DataTable
            head={[
              'Quantitative Dimension',
              '1999–2001 Dot-Com & Telecom Bubble (and Historical Peers)',
              '2025–2026 AI Infrastructure Boom',
              'Structural Interpretation & Divergence',
            ]}
            rows={[
              ['Macro Capex Scale (% of GDP & Total $)', 'Surpassed by 2026 tech investment share of GDP; trailed late-1800s US/UK railroad peaks (>3% of GDP).', m('$800B (2026); $1.2T–$1.4T by 2027–2028 (~3.0% of US GDP); $5.2T global to 2030.', 'acc'), 'Largest absolute dollar investment tide in US history, surpassing the 2000 telecom boom as a share of GDP.'],
              ['Broad Index P/E Multiples', m('Nasdaq Fwd P/E: 60.1x (Mar 2000); NDX Trailing: ~200x; 1989 Nikkei: 70x.', 'neg'), m('NDX Trailing P/E: ~33x; SPX Fwd P/E: ~23x (Feb) easing to 19.0x (late Sept vs. 19.1x 10Y avg).', 'pos'), 'Index earnings multiples are a fraction of 2000 and 1989 Japan extremes; hyperscalers trade near decade-low premiums vs. S&P 493.'],
              ['Top Tech Leaders Forward P/E', m('65x–70x across MSFT, CSCO, INTC, ORCL (Feb/Mar 2000).', 'neg'), m('~23x–30x across top 5 S&P 500 tech leaders in Oct 2026.', 'pos'), 'Only 17% of top-7 gains in 1997–2000 came from EPS (83% multiple expansion), whereas 2023–2026 gains are EPS-driven.'],
              ['Shiller CAPE Ratio', m('44x–45x at 1999 peak (all-time record).', 'neg'), m('~41x in 2026 (2nd highest in 125 yrs vs. 17x median).', 'neg'), 'Cyclically adjusted aggregate valuations rhyme closely with 1999 because corporate profit margins sit at cyclical peaks.'],
              ['Equity Market Concentration', m('Top 5 = 17% of SPX; Top 10 = 27% of SPX in 2000.'), m('Top 3 = 20% of SPX; Top 5 = 30% of SPX (50-yr high); Top 10 US = 20% of global index.', 'neg'), 'More extreme than 2000: index performance and EPS growth (50% from AI capex) are unprecedentedly tethered to a single theme.'],
              ['Venture Capital Allocation', m('US VC in 2000: ~$112B (35%–40% in internet startups).'), m('Global VC in 2025: $427B, with $258.7B (~60%+) in AI alone.', 'acc'), 'Private-market concentration (>2x total 2000 US VC), led by OpenAI ($852B valuation) and Anthropic ($900B+ talks).'],
              ['Vendor Financing & Debt Structure', 'Lucent ($1.5B loans, $5B–$8B commitments), Nortel ($1.4B), and Cisco lent >10% of sales to CLECs (Global Crossing, WorldCom).', m('14 circular deals ($300B equity, $650B debt, $1.4T revenue); $2.9T AI debt by end-2027 + $1.5T–$2.0T leases.', 'neg'), 'Core hyperscalers hold fortress balance sheets, but neoclouds, SPVs, and model labs replicate 2000-style circular leverage.'],
              ['Physical Capacity Utilization', m('95% “Dark Fiber” sat unlit for nearly a decade.', 'neg'), 'High active GPU cluster utilization, but idle warehouse inventory from 8–24 mo lead times & 5-yr grid delays.', 'Unlike underground fiber-optic cables (20+ yr life), GPUs depreciate technologically within 2–6 years.'],
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="TS Lombard AI Capex Bust Stress-Test" tag="-$20T Equity / $125B–$190B Credit Loss" tone="neg">
              <ul className={UL}>
                <li>
                  <span className="font-semibold">Equity Impact:</span> Tech stocks fall <N t="neg">-40%</N> (returning tech&apos;s market cap share to pre-ChatGPT 2022 levels), non-tech falls <N>-20%</N>, and the broad S&amp;P 500 drops <N t="neg">-30%</N>, erasing <N t="neg">~$20T</N> in US market cap (vs. <N>$5T</N> erased in 2000–2002 when the Nasdaq fell <N>-34%</N> in month one and <N>-78%</N> peak-to-trough).
                </li>
                <li>
                  <span className="font-semibold">Credit &amp; Macro Impact:</span> Applying a <N>35%</N> cumulative default rate and <N>25%–50%</N> recovery (<N>50%–75%</N> LGD) across the at-risk quarter of non-hyperscaler debt yields <N t="neg">$125B–$190B</N> in realized credit losses, eliminating <N>~800,000</N> data-center-related jobs and subtracting <N>-2.0 percentage points</N> from US GDP growth.
                </li>
              </ul>
            </Card>
            <Card title="Why It Triggers a 2001 Reset, Not a 2008 GFC" tag="Non-Bank Risk Absorption" tone="pos">
              <ul className={UL}>
                <li><span className="font-semibold">Isolated from Commercial Banks:</span> Unlike 2008 subprime CDOs held on highly levered commercial bank balance sheets, AI credit losses sit in equity portfolios, private credit funds, neoclouds (CoreWeave), model labs (OpenAI, Anthropic), and equipment suppliers.</li>
                <li><span className="font-semibold">Macro Buffers:</span> Household balance sheets remain healthy and the Federal Reserve holds <N t="pos">&gt;500 bps</N> of conventional rate-cutting capacity to cushion a 1990- or 2001-style capital-cycle recession.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-6">
          <H2>Investment Cycle Analysis and Strategic Portfolio Positioning</H2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Installation Period & Frenzy Phase (2022–2026)" tag="Financial Capital Dominance" tone="acc">
              <ul className={UL}>
                <li>Ignited by the November 2022 ChatGPT <em>Irruption</em>, footloose financial capital decoupled from production capital in a self-referential loop.</li>
                <li>Characterized by extreme hardware concentration, circular vendor financing, off-balance-sheet SPVs, and physical overbuilding (<N>$800B–$1.4T</N> capex) far ahead of productive absorption (<N>$70B</N> above-trend cloud revenue).</li>
              </ul>
            </Card>
            <Card
              title={
                <>
                  <Jargon term="Carlota Perez Turning Point" definition="In Carlota Perez's 50-year techno-economic cycle, the turbulent intermission between the speculative Installation/Frenzy phase and the productive Deployment phase, marked by credit repricing and valuation decompression.">Turning Point</Jargon>{' '}
                  &amp; Deployment Golden Age
                </>
              }
              tag="Production Capital Takeover"
              tone="pos"
            >
              <ul className={UL}>
                <li>October 2026 tremors (CoreWeave <N>16%</N> yield / <N>&gt;1,000 bps</N> CDS, IMF vendor-finance warnings, Meta&apos;s <N>-8%</N> cash-outflow penalty) mark the opening of the Turning Point.</li>
                <li>Bubbles form in asset classes, not technologies: financial decompression wipes out speculative leverage, resets compute pricing lower, and hands control to production capital across energy bottlenecks and enterprise software deployment.</li>
              </ul>
            </Card>
          </div>

          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111419] p-5 space-y-3">
            <h3 className="font-serif text-base text-zinc-900 dark:text-zinc-100">
              <Jargon term="Capital Cycle Theory" definition="Marathon Asset Management's analytical framework demonstrating that extraordinary returns on capital (such as 75%–80% hardware gross margins) inevitably attract competitive supply, custom disintermediation, and algorithmic substitutes that erode monopoly rents.">Capital Cycle Dynamics</Jargon>
              : Three Supply-Side Responses Eroding Hardware Monopoly Rents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              <li>
                <Strong>Custom ASIC Disintermediation:</Strong> To escape Nvidia&apos;s <N>75%</N> GAAP gross margin and <N>53%</N> net margin tax, OpenAI partnered with Broadcom to mass-produce its custom 3nm AI chip (&ldquo;Titan&rdquo;) on TSMC&apos;s node in late 2026, while Google is scaling custom TPUs (including a <N>500-MW</N> buildout by 2027 via its <N>$5B</N> Blackstone JV).
              </li>
              <li>
                <Strong>Algorithmic Efficiency Shocks:</Strong> The linear &ldquo;more GPUs = better AI&rdquo; scaling assumption remains vulnerable to algorithmic breakthroughs, as proven on January 27, 2025 (&ldquo;DeepSeek shock&rdquo;) when Nvidia lost <N t="neg">$588.8B</N> in single-day market value.
              </li>
              <li>
                <Strong>Cyclical Memory Supply Normalization:</Strong> Despite <N>~80%</N> gross margins in high-bandwidth memory, memory chipmakers trade at a 2-year forward P/E of just <N t="acc">4x</N> (half their 15-year median of <N>8x</N>), already discounting a <N t="neg">~50%</N> cyclical earnings drop as Chinese memory competition ramps.
              </li>
            </ul>
          </div>

          <DataTable
            head={['Portfolio Dimension / Asset Class', 'Quantitative & Fundamental Signal (Oct 2026)', 'Strategic Positioning & Implementation']}
            rows={[
              ['Neocloud Credit & GPU-Backed Debt', m('CoreWeave 2031 yield ~16%, 5Y CDS >1,000 bps; $2.9T AI debt by 2027; 35% modeled bust default rate.', 'neg'), <><span className={`font-semibold ${TONE.neg}`}>Maximum Underweight / Avoid:</span> Exit private credit vehicles and high-yield bonds backed by depreciating GPU hardware or unrated SPV leases.</>],
              ['Hyperscaler Equities (Mag-5)', m('~23x forward P/E (decade-low premium vs. S&P 493); capex growth slowing 94% (2026) → 54% (2027) → 12% (2028).', 'pos'), <><span className={`font-semibold ${TONE.pos}`}>Selective Overweight on FCF Discipline:</span> Favor profitable leaders with strong operating cash flow visibility that will re-rate as capex growth decelerates.</>],
              ['Semiconductors & Memory Hardware', m('Memory at 4x forward P/E (vs. 8x median) pricing 50% EPS drop; chipmakers exposed to ΔCapex rollover.', 'acc'), <><span className={`font-semibold ${TONE.acc}`}>Neutral / Trim Momentum Beta:</span> Reduce exposure to pure-play capex recipients facing custom ASIC disintermediation and second-derivative deceleration.</>],
              ['Application Software & Power Infrastructure', m('$1T required app spend; $1.5T–$1.7T cloud backlog; 10-GW Stargate & 5-GW/7-GW Hyperion deficits; Energy +40% YTD.', 'pos'), <><span className={`font-semibold ${TONE.pos}`}>Overweight Deployment Winners:</span> Rotate into IT data infrastructure, cybersecurity (CrowdStrike +13% during NVDA slowdown calls), utilities, gas/nuclear SMRs, geothermal, and BESS grid gear.</>],
              ['Quantitative Equity Factors & Geography', m('US Value & Global Quality >1 SD cheap vs. history; Top 5 = 30% of SPX; Stoxx 600 +0.72% during US tech rout.', 'pos'), <><span className={`font-semibold ${TONE.pos}`}>Rotate Momentum to Quality, Value &amp; International:</span> Trim crowded Momentum overweights; harvest &gt;1 SD discount in Quality/Value; diversify into non-US equities.</>],
              ['Volatility Surface & Sovereign Duration', m('Spot VIX 19.03–19.99; SKEW at 60d high (168.59); 6M realized corr 0.01; 10Y Treasury at 24-yr highs (5.28%–5.36%).'), <><span className={`font-semibold ${TONE.pos}`}>VIX Call Spreads &amp; Long Treasury Duration:</span> Avoid overpriced OTM naked puts; structure VIX call spreads capturing contango roll &lt;20 and add 10Y US Treasuries &gt;5.25% as a credit hedge.</>],
            ]}
          />
        </section>
      </div>
    </ArticleFrame>
  );
}
