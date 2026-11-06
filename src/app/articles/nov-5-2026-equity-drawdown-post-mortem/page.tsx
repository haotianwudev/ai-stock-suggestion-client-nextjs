'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  Layers,
  ShieldAlert,
  Calendar,
  PlaySquare,
  ArrowRight,
  Info,
  Scale
} from 'lucide-react';

// ============================================================================
// JARGON DEFINITIONS (Strictly sourced from the research report)
// ============================================================================
const JARGON_DEFINITIONS: Record<string, string> = {
  VRP: 'Volatility Risk Premium: VIX − RV20 (in vol points). Theoretical ex-ante VRP is the wedge between the risk-neutral expectation (Q) and physical expectation (P) of future quadratic variation over [t, t+21].',
  VRP_Variance: 'Variance-Swap VRP: (VIX² − RV20²)/100, which corrects for the Jensen inequality bias.',
  vrp_z: '126-day exponentially weighted z-score (min periods 63) of VRP (VIX − RV20). Premium is classified as rich when vrp_z > 0 and thin when vrp_z ≤ 0.',
  vix_rank: '252-day rolling percentile rank of VIX. Values > 0.80 trigger the stressed implied volatility condition.',
  term_slope: 'VIX3M − VIX. Negative values (< 0) indicate backwardation and immediate front-end market stress.',
  downside_variance_share: 'Downside semivariance divided by total realized variance over a 20-day window (Barndorff-Nielsen, Kinnebrock, and Shephard split), isolating left-tail dominance.',
  GEX: 'Dealer Net Gamma Exposure ($). Positive GEX means dealers are long gamma and dampen moves locally; negative GEX means dealers are short gamma and trade pro-cyclically, amplifying moves.',
  Gamma_Flip: 'The strike zone where net dealer gamma crosses zero (SPX 7,699–7,801; SPY $748.66–$777.27; NDX 29,153 on Nov 5). Crossing below flips dealers into pro-cyclical sellers.',
  DIX: 'SqueezeMetrics Dark Index: tracks short volume across S&P 500 constituents in dark pools as a proxy for institutional accumulation (>0.45 bullish; 0.40–0.42 weak/neutral border).',
  DSPX: 'Cboe S&P 500 Dispersion Index: measures expected single-stock dispersion across index constituents (~37–39 in early Nov 2026).',
  SKEW: 'Cboe SKEW Index: 100 − 10 × S, where S is the third standardized central moment of 30-day log returns under measure Q, dividing wing asymmetry by the cube of ATM volatility (σ_ATM³).',
  Normalized_Skew: '(IV_25Δ_put − IV_25Δ_call) / IV_ATM. Measures relative wing asymmetry normalized by at-the-money implied volatility.',
  Sticky_Strike: 'dσ(K)/dS = 0. Implied volatility stays anchored to fixed strikes as spot moves, signifying market disbelief and mean reversion.',
  Sticky_Delta: 'dσ(K/S)/dS = 0. Implied volatility stays anchored to moneyness/delta (SSR > 2.0 in stress), signifying trend acceptance and upward repricing of the entire smile.',
  BAMLH0A0HYM2: 'FRED series for the ICE BofA US High Yield Index Option-Adjusted Spread (OAS). Restricted by FRED since April 2026 to a rolling 3-year window.',
  TRIN: 'NYSE Arms Index: breadth volume ratio (> 1.25 signals stress). Automated feeds on Nov 4–5 were confounded by ticker collision with Trinity Capital Inc. (NYSE/NASDAQ: TRIN).',
  Thin_Regime: 'VRP Regime where vix_rank ≤ 0.80, term structure is in contango, and vrp_z ≤ 0. Advises option sellers to "stand aside" because option premium is thin relative to trailing movement.',
  Stressed_Premium: 'VRP Regime where vrp_z > 0 alongside vix_rank > 0.80 or backwardation. Indicates rich option premium in a stressed tape ("size down").'
};

// ============================================================================
// ACCESSIBLE TOOLTIP COMPONENT (Hover + Keyboard Focus)
// ============================================================================
interface TermProps {
  id: keyof typeof JARGON_DEFINITIONS;
  label?: string;
}

const Term: React.FC<TermProps> = ({ id, label }) => {
  const [open, setOpen] = useState(false);
  const definition = JARGON_DEFINITIONS[id];
  const display = label || id;

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
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        className="cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm px-0.5 transition-colors"
      >
        {display}
      </span>
      {open && (
        <span
          role="tooltip"
          className="
            z-50 w-72 sm:w-80 p-3 text-xs leading-relaxed font-sans font-normal
            bg-[#14171B] dark:bg-[#05070A] text-slate-100
            border border-slate-700 dark:border-slate-800
            rounded-lg shadow-xl
            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
            pointer-events-none
          "
        >
          <span className="block font-mono font-semibold text-[#D08F52] mb-1">
            {display}
          </span>
          <span className="block text-slate-200">{definition}</span>
        </span>
      )}
    </span>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ArticlePage() {
  const [analogFilter, setAnalogFilter] = useState<'ALL' | 'WIN' | 'LOSS'>('ALL');

  const analogs = [
    {
      date: '2015-08-24',
      name: 'China Devaluation & ETF LULD Flash Dislocation',
      spxRet: '−3.94%',
      context: '1,893.21; Dow −1,089 pts intraday; >1,000 LULD halts',
      vixPath: '19.14 (8/20) → 28.03 (8/21) → 40.74 (51 intraday)',
      termRatio: '1.754',
      fwd5d: '+4.17%',
      fwd21d: '+2.41%',
      fwd63d: '+10.40%',
      maxDD: '~−1.2% (retested 1,867 on 8/25 & 9/28)',
      verdict: 'WIN',
      verdictText:
        'YES. VIX fell −30.22% to 28.43 in 5 sessions and −44.92% to 22.44 in 10 sessions. Selling 40.74 VIX after the Monday flash-open paid off, though short-VXX traders faced margin calls into the 8/24 open.'
    },
    {
      date: '2016-06-24',
      name: 'UK Brexit Referendum Shock',
      spxRet: '−3.60%',
      context: 'Political/FX shock from calm contango (Harvest → Stressed)',
      vixPath: '17.30 → 25.80',
      termRatio: '> 1.15',
      fwd5d: '+3.20%',
      fwd21d: '+6.50%',
      fwd63d: '+6.20%',
      maxDD: '−1.80% (bottomed on Day +1)',
      verdict: 'WIN',
      verdictText:
        'YES (+12.5 vol pts earned). Political over-reaction: SPX dipped −1.8% further on Monday 6/27 before rallying +6.5% over 21 days as VIX collapsed back toward ~13.'
    },
    {
      date: '2018-02-05',
      name: '"Volmageddon" XIV/SVXY Termination',
      spxRet: '−4.10%',
      context: 'Endogenous short-vol ETP rebalancing cascade (Stressed → Stressed)',
      vixPath: '17.30 → 37.30',
      termRatio: '> 1.25',
      fwd5d: '+0.30%',
      fwd21d: '+2.90%',
      fwd63d: '+0.90%',
      maxDD: '−2.60% (bottomed Friday 2/09)',
      verdict: 'WIN',
      verdictText:
        'YES (+16.1 vol pts earned). Forced VIX futures buying by XIV/SVXY at 4:00 PM drove the spike; selling 37.3 VIX earned +16.1 vol points over 21 days, though SPX made a lower low (−2.6%) four days later.'
    },
    {
      date: '2020-02-24 & 02-27',
      name: 'COVID-19 Pandemic Onset',
      spxRet: '−3.35% (2/24) & −4.42% (2/27)',
      context: 'Exogenous global economic stop; HY OAS widened 3.59% → 10.87%',
      vixPath: '17.08 (2/21) → 25.03 (2/24) → 39.16 (2/27)',
      termRatio: '1.455 → 1.829',
      fwd5d: '−4.21% (2/24) / +1.52% (2/27)',
      fwd21d: '−14.68% (from 2/27)',
      fwd63d: '+0.5% to +10% (post-QE Vanna rally)',
      maxDD: '−24.5% to −30%+ (bottomed 2,237 on 3/23)',
      verdict: 'LOSS',
      verdictText:
        'NO — SEVERE LOSS. Selling VIX at 25–39 in late Feb 2020 suffered massive losses as VIX surged to 82.69 on March 16/23 and SPX fell 34% peak-to-trough. Vol selling only worked after Fed Unlimited QE on March 23.'
    },
    {
      date: '2024-08-05',
      name: 'Yen Carry Trade Unwind & Tech De-leveraging',
      spxRet: '−3.00%',
      context: '5,186.33; IXIC −3.43%; Nikkei −12% in 1 day; NQ −6% pre-open',
      vixPath: '18.59 (8/01) → 23.39 (8/02) → 38.57 (65+ pre-open)',
      termRatio: '> 1.35',
      fwd5d: '+3.05%',
      fwd21d: '+6.61% (+8.14% 10d)',
      fwd63d: '+12.47%',
      maxDD: '~−0.5% (intraday low 5,119 held)',
      verdict: 'WIN',
      verdictText:
        'YES — LARGE WIN. VIX plunged −46.31% to 20.71 in 5 sessions and −59.68% to 15.55 in 10 sessions. Because credit (HY OAS peaked at 3.81%) and U.S. growth were intact, the carry/tech unwind V-bottomed rapidly.'
    },
    {
      date: '2025-01-27',
      name: 'DeepSeek AI Capex Efficiency Shock',
      spxRet: '−1.72%',
      context: '5,996; IXIC −3.0%; NVDA −17% (−$600B mkt cap); Dow −0.27%',
      vixPath: '14.85 → 17.90 (+20.5%)',
      termRatio: '< 1.00 (0.991 on 2/03)',
      fwd5d: '~+1.0% (+1.20% from 2/03)',
      fwd21d: '~−1.5% (−2.53% from 2/03)',
      fwd63d: '~−5.0% (hit by Apr 2025 tariffs)',
      maxDD: '~−2.5% (in Feb; deeper in Mar–Apr)',
      verdict: 'MIXED',
      verdictText:
        'MIXED. VIX only reached 17.90 (18.62 five days later, +4.02%; 18.98 ten days later, +6.03%) as DJI and RSP held firm. Selling single-stock semi/NDX vol paid off short-term, but index VIX offered limited premium.'
    },
    {
      date: '2025-04-03',
      name: '"Liberation Day" Global Tariff Shock',
      spxRet: '−4.80%',
      context: 'Macro trade policy shock (Crisis → Stressed); HY OAS 2.84% → 4.61%',
      vixPath: '21.51 → 30.02 (spiked to 45.31 on Day +1, 4/04)',
      termRatio: '> 1.20',
      fwd5d: '−2.40%',
      fwd21d: '+4.70% (after tariff rollback)',
      fwd63d: '+15.40%',
      maxDD: '−7.70% (spiked to −18.9% peak-to-trough DD)',
      verdict: 'LOSS',
      verdictText:
        'NO (−15.7 vol pts lost). Selling VIX at 30.02 on Day 1 (4/03) lost heavily on Day 2 (4/04) when VIX jumped to 45.31 and remained at 40.72 (+35.64%) five sessions later. Vol selling only paid off after Day 2–5 once tariff rollbacks were signaled.'
    },
    {
      date: '2026-11-05 (Current)',
      name: 'Post-Midterm AI Data-Center Capex & Chip Rout',
      spxRet: '−4.36%',
      context: '7,353.73; IXIC −5.52%; NDX −6.36%; SOX −12.25%; RSP −2.89%',
      vixPath: '16.61 → 28.18 (VIX9D 15.19 → 32.66; VXN 25.08 → 38.26)',
      termRatio: '1.103',
      fwd5d: 'TBD (ES −0.8%, NQ −1.3% AH; NFP 11/06)',
      fwd21d: 'TBD (CPI 11/10, NVDA 11/17, FOMC 11/18)',
      fwd63d: 'TBD',
      maxDD: 'TBD',
      verdict: 'CURRENT',
      verdictText:
        'Hybrid analog: combines 2025-01-27 (DeepSeek AI capex thesis) + 2024-08-05 / 2016-06-24 (vol mechanics & credit calm at 3.44% HY OAS), with 2025-04-03 Day-2 follow-through risk.'
    }
  ];

  const filteredAnalogs = analogs.filter((a) => {
    if (analogFilter === 'ALL') return true;
    if (analogFilter === 'WIN') return a.verdict === 'WIN' || a.verdict === 'CURRENT';
    if (analogFilter === 'LOSS') return a.verdict === 'LOSS' || a.verdict === 'MIXED' || a.verdict === 'CURRENT';
    return true;
  });

  return (
    <ArticleFrame
      slug="nov-5-2026-equity-drawdown-post-mortem"
      additionalDisclaimer="Regime diagnostics and volatility metrics (GEX, VRP, SKEW) are analytical models derived from options market microstructure and should not be used as standalone trading recommendations. Options trading involves substantial risk of loss."
    >
      <div className="space-y-12 font-sans antialiased text-slate-800 dark:text-slate-200">
        {/* ===================================================================
            PINNED STANDOUT FIGURES & EXECUTIVE SUMMARY
        =================================================================== */}
        <section className="space-y-6">
          {/* Compact Stat Row: 4 Standout Figures */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                S&amp;P 500 / NDX (Nov 5)
              </div>
              <div className="mt-1 font-mono tabular-nums text-xl sm:text-2xl font-bold text-[#BC4128] dark:text-[#E2694A]">
                −4.36% / −6.36%
              </div>
              <div className="mt-1 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
                SPX 7,353.73 · IXIC −5.52%
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                Philly Semi (SOX)
              </div>
              <div className="mt-1 font-mono tabular-nums text-xl sm:text-2xl font-bold text-[#BC4128] dark:text-[#E2694A]">
                −12.25%
              </div>
              <div className="mt-1 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
                9,011.14 (30/30 stocks red)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                VIX / VIX9D Surge
              </div>
              <div className="mt-1 font-mono tabular-nums text-xl sm:text-2xl font-bold text-[#BC4128] dark:text-[#E2694A]">
                28.18 / 32.66
              </div>
              <div className="mt-1 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
                VIX +69.7% · VIX9D +115.0%
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                Credit &amp; Equal-Weight
              </div>
              <div className="mt-1 font-mono tabular-nums text-xl sm:text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C]">
                3.44% OAS
              </div>
              <div className="mt-1 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
                HYG −0.31% · RSP beat SPY +154 bps
              </div>
            </div>
          </div>

          {/* Executive Key Takeaways Card */}
          <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#12161C] border-l-4 border-l-[#A8672E] dark:border-l-[#D08F52] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
                Executive Synthesis &amp; Key Takeaways
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#A8672E] dark:text-[#D08F52]" />
                Hover or focus underlined terms
              </span>
            </div>

            <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-[#BC4128] dark:text-[#E2694A] font-mono font-bold mt-0.5">•</span>
                <span>
                  <strong className="text-slate-900 dark:text-slate-100">Scale of Liquidation:</strong> On Thursday, November 5, 2026, U.S. equities suffered their sharpest single-day drop since the April 2025 &ldquo;Liberation Day&rdquo; tariff shock&mdash;<span className="font-mono tabular-nums">SPX −4.36% (−334.89 pts to 7,353.73)</span>, <span className="font-mono tabular-nums">IXIC −5.52% (−1,421.52 pts to 24,315.00, entering correction −11.9% off its Oct 6 record 27,599.89)</span>, and <span className="font-mono tabular-nums">NDX −6.36% (to 26,629.81)</span>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono font-bold mt-0.5">•</span>
                <span>
                  <strong className="text-slate-900 dark:text-slate-100">No Ex-Ante Headline Crash Signal on Nov 4:</strong> Post-midterm relief on Wednesday, Nov 4 drove a <span className="font-mono tabular-nums">+1.58% SPX</span> rebound and crushed <span className="font-mono tabular-nums">VIX −20.26% (20.83 → 16.61)</span> against rising <span className="font-mono tabular-nums">RV10 (15.78%)</span> and <span className="font-mono tabular-nums">RV20 (12.92%)</span>. The <Term id="VRP" /> model shifted from <Term id="Stressed_Premium" label="Stressed Premium" /> (Nov 2–3) to <Term id="Thin_Regime" label="Thin" /> (<span className="font-mono tabular-nums"><Term id="vrp_z" /> = −0.60</span>), advising option writers to &ldquo;stand aside&rdquo; because premium was underpriced relative to trailing movement&mdash;not because a crash was predicted&mdash;while positive <Term id="GEX" /> (<span className="font-mono tabular-nums">+$5.46B</span>) and contango (<span className="font-mono tabular-nums">VIX/VIX3M = 0.883</span>) masked latent fragility.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#BC4128] dark:text-[#E2694A] font-mono font-bold mt-0.5">•</span>
                <span>
                  <strong className="text-slate-900 dark:text-slate-100">Primary Catalyst &mdash; AI Data-Center Capex Repricing:</strong> Markets digested state-level election wins by governors and lawmakers in key data-center hubs (Texas governor-elect Gina Hinojosa and candidates in Georgia) campaigning on temporary construction moratoriums over grid power, water usage, and tax incentives. Goldman Sachs and UBS flagged that states likely to tighten oversight account for <span className="font-mono tabular-nums">~45%</span> of planned U.S. capacity (Texas <span className="font-mono tabular-nums">~25%</span>) and <span className="font-mono tabular-nums">~30%</span> of expected 2028 additions face pause risks&mdash;colliding with Qualcomm&apos;s weak chip forecast, a Micron $4.5B Taiwan plant labor suspension, a <span className="font-mono tabular-nums">25 bps</span> Bank of England rate hike to <span className="font-mono tabular-nums">4.00%</span>, and Strait of Hormuz tanker strikes (<span className="font-mono tabular-nums">Brent +3.88% to $98.29</span>).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono font-bold mt-0.5">•</span>
                <span>
                  <strong className="text-slate-900 dark:text-slate-100">Three Structural Limitations Exposed:</strong> (1) Trailing <span className="font-mono tabular-nums">RV20 (20.22%)</span> lagged the <span className="font-mono tabular-nums">70.69%</span> instantaneous 1-day vol shock, creating an artificial <span className="font-mono tabular-nums">+7.96 pt</span> VRP (<span className="font-mono tabular-nums">vrp_z = +0.77</span>) that labeled Nov 5 <Term id="Stressed_Premium" label="Stressed Premium" /> rather than <span className="font-mono">Crisis</span>; (2) Breadth was inverted as equal-weight <span className="font-mono tabular-nums">RSP (−2.89%)</span> beat <span className="font-mono tabular-nums">SPY (−4.43% to −4.5%)</span> by <span className="font-mono tabular-nums">&gt;150 bps</span> (<span className="font-mono tabular-nums">RSP/SPY 0.2912 → 0.2959</span>); and (3) Broad credit stayed calm (<span className="font-mono tabular-nums">HYG −0.31%</span>, <Term id="BAMLH0A0HYM2" /> at <span className="font-mono tabular-nums">3.40%–3.44%</span>, Apple <span className="font-mono tabular-nums">$7B</span> bond deal <span className="font-mono tabular-nums">4.4x</span> oversubscribed at <span className="font-mono tabular-nums">$31B</span>) even as CoreWeave 5-year CDS hit record highs.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ===================================================================
            SECTION 1: ROOT-CAUSE ANATOMY OF THE NOV 5, 2026 CRASH
        =================================================================== */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              Root-Cause Anatomy of the November 5, 2026 Crash
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Separating the macro-political trigger from the microstructural accelerants that turned a sector rotation into a <span className="font-mono tabular-nums">−4.36% SPX</span> and <span className="font-mono tabular-nums">−6.36% NDX</span> slide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  State-Level AI Data-Center Moratorium Risk
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A]">
                  Primary Trigger
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Nov 4 Relief vs. Nov 5 Reassessment:</strong> Wednesday celebrated federal legislative gridlock (<span className="font-mono tabular-nums">SPX +1.58%, DJI +3.03% / +1,569.40 pts to 53,356.12</span>) following the Democratic sweep of Congress. Overnight, focus shifted to state/local elections in Texas (gov-elect Gina Hinojosa) and Georgia running on data-center moratoriums over residential power bills and water usage.
                </li>
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Capex Exposure:</strong> Goldman Sachs estimated states tightening oversight represent <span className="font-mono tabular-nums">~45%</span> of planned U.S. capacity (<span className="font-mono tabular-nums">~25%</span> in Texas alone); UBS estimated <span className="font-mono tabular-nums">~30%</span> of projected 2028 U.S. buildouts face delay/moratorium risk.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Semiconductor &amp; Memory Supply/Demand Shocks
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A]">
                  SOX −12.25%
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Idiosyncratic Catalysts:</strong> Qualcomm (<span className="font-mono tabular-nums">QCOM −9.5% to −13.5%</span>) missed Q4 smartphone-chip estimates; Bloomberg reported Micron (<span className="font-mono">MU</span>) suspended plans for a <span className="font-mono tabular-nums">$4.5B</span> Taiwan plant over a labor dispute.
                </li>
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Memory &amp; Chip Collapse:</strong> <span className="font-mono tabular-nums">SNDK −22.26%, MU −17.46%, WDC −17.35%, AMD −14% to −17.3%, STX −16.25%, SKHY −13.40%, AVGO −10.43%, NVDA −9.26% ($181.60, erasing YTD gains &amp; −22.04% 1m), CRWV −8.9% to −9.83%, GEV −6.9%, TSLA &amp; SPCX −9% to −10%+</span>. Eight largest chipmakers fell an average of <span className="font-mono tabular-nums">12.97%</span>.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Global Monetary &amp; Energy Headwinds
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52]">
                  BoE +25 bps · Brent $98.29
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Bank of England Hike:</strong> BoE voted <span className="font-mono tabular-nums">8–1</span> to hike <span className="font-mono tabular-nums">25 bps to 4.00%</span> (first hike since 2023; Catherine Mann dissented for <span className="font-mono tabular-nums">50 bps</span>), warning energy prices could push U.K. inflation from <span className="font-mono tabular-nums">3.5% toward ~5%</span> by mid-2027.
                </li>
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Hormuz Tanker Strikes:</strong> Fresh commercial tanker attacks in the Strait of Hormuz reversed Wednesday&apos;s <span className="font-mono tabular-nums">8%+</span> oil drop, sending <span className="font-mono tabular-nums">Brent +3.88% to $98.29</span> and <span className="font-mono tabular-nums">WTI futures +2.72% to $90.52</span> (Yahoo close <span className="font-mono tabular-nums">$91.60</span>).
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Asian Chip Contagion &amp; Short-Gamma Cascade
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A]">
                  GEX −$51.72B
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Bifurcated Asian Tape:</strong> <span className="font-mono tabular-nums">KOSPI −5.28% (to 5,383.80; 3.39T won foreign selling; Samsung −7.57%, SK Hynix −9%+), Taiex −3.20% (41,574.72), Nikkei −1.79% cash (61,077.90) / −6.74% global monitors (57,999.75, −20% bear market)</span>. Yet non-chip benchmarks rallied: <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">Hang Seng +3.67%, ASX 200 +2.61%, Nifty 50 +2.40%, TOPIX +1.16% (3,940.39)</span>.
                </li>
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Dealer Gamma Flip:</strong> Breaking <span className="font-mono tabular-nums">SPX 7,699–7,801</span> and <span className="font-mono tabular-nums">NDX 29,153</span> flipped dealers from <span className="font-mono tabular-nums">+$5.46B</span> (Nov 4) to <span className="font-mono tabular-nums">−$42.88B (10:10a) → −$54.09B (12:39p) → −$51.72B (close)</span>, compounded by EOD leveraged ETF rebalancing (<span className="font-mono">SOXL, TQQQ, MUU</span>).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: QUESTION 1 — DIAGNOSIS (NOV 4 VS. NOV 5)
        =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              Diagnosis: What the Frameworks Said on November 4 vs. November 5
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Reconstructing the state vector of Frameworks A, B, and C before and during the shock, including the <span className="font-mono">VXVCLS</span> FRED lag correction.
            </p>
          </div>

          {/* Dark Monospace Formula Panel + Worked Numeric Example */}
          <div className="rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-slate-800 shadow-md space-y-4 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-[#D08F52]">
                Framework A · Composite Regime Score Equation &amp; Data Hygiene Correction
              </span>
              <span className="text-xs text-slate-400">2×2 VRP Matrix Classification</span>
            </div>

            <div className="text-sm sm:text-base text-slate-100 overflow-x-auto py-1">
              <MathBlock math="\text{regime\_score} = \text{vrp\_z} - 2 \cdot \mathbb{I}(\text{vix\_rank} > 0.80) - 1 \cdot \mathbb{I}(\text{term\_slope} < 0)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs leading-relaxed border-t border-slate-800/80">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="text-[#3CBF9C] font-semibold">
                  Worked Example &mdash; Wed, Nov 4 (Eve of Crash):
                </div>
                <div className="tabular-nums text-slate-300">
                  • VIX = 16.61 (vix_rank = 0.41 ≤ 0.80 → I = 0)
                </div>
                <div className="tabular-nums text-slate-300">
                  • Live VIX3M = 18.80 → term_slope = 18.80 − 16.61 = +2.19 (&gt; 0 → I = 0)
                </div>
                <div className="tabular-nums text-slate-300">
                  • VRP = 16.61 − 12.92 = +3.70 → vrp_z = −0.60
                </div>
                <div className="tabular-nums text-white font-semibold pt-1">
                  ⇒ regime_score = −0.60 − 2(0) − 1(0) = −0.60 → Label: THIN
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="text-[#E2694A] font-semibold">
                  Worked Example &mdash; Thu, Nov 5 (Crash Day &amp; FRED Lag Fix):
                </div>
                <div className="tabular-nums text-slate-300">
                  • Stored FRED VXVCLS forward-filled 18.80 (false slope −9.38).
                </div>
                <div className="tabular-nums text-slate-300">
                  • Live Cboe VIX3M = 25.55 vs VIX = 28.18 → True term_slope = −2.63 (&lt; 0 → I = 1)
                </div>
                <div className="tabular-nums text-slate-300">
                  • vix_rank = 0.99 (&gt; 0.80 → I = 1); VRP = 28.18 − 20.22 = +7.96 → vrp_z = +0.77
                </div>
                <div className="tabular-nums text-white font-semibold pt-1">
                  ⇒ regime_score = +0.77 − 2(1) − 1(1) = −2.23 → Label: STRESSED PREMIUM
                </div>
              </div>
            </div>
          </div>

          {/* Dichotomy Card: Nov 4 False Calm vs. Nov 4 Subsurface Warnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Nov 4 Headline Signals: Post-Election False Calm
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/15 text-[#1D8A70] dark:text-[#3CBF9C]">
                  Blinded by Vol Crush
                </span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Event-Put Monetization:</strong> Unwinding election hedges crushed <span className="font-mono tabular-nums">VIX −4.22 pts (−20.26% to 16.61)</span> and <span className="font-mono tabular-nums">VIX9D −6.77 pts (to 15.19)</span>, while the <span className="font-mono tabular-nums">+1.58% SPX</span> rally actually raised <span className="font-mono tabular-nums">RV20 (11.37% → 12.92%)</span> and <span className="font-mono tabular-nums">RV10 (13.48% → 15.78%)</span>.
                </li>
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Why &ldquo;Thin&rdquo; Triggered:</strong> <Term id="VRP" /> compressed from <span className="font-mono tabular-nums">9.46 to 3.70</span> (<span className="font-mono tabular-nums"><Term id="vrp_z" /> = −0.60</span>). This fortuitously told put-writers to stand aside because options were cheap relative to trailing RV, not because a crash was detected.
                </li>
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Broad Index Calm:</strong> <span className="font-mono tabular-nums">VIX/VIX3M = 0.883</span>, S&amp;P 500 advancers beat decliners <span className="font-mono tabular-nums">376 to 127 (A/D ratio 2.961; 63.95% advancing volume; 63.82% &gt; 200d MA)</span>, <span className="font-mono tabular-nums">VVIX = 90.4</span>, Total PCR = <span className="font-mono tabular-nums">0.80</span>, and <Term id="GEX" /> = <span className="font-mono tabular-nums">+$5.46B</span>.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Nov 4 Subsurface &amp; Cross-Sectional Warnings
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A]">
                  3 Latent Red Flags
                </span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Barndorff-Nielsen Downside Semivariance:</strong> <Term id="downside_variance_share" /> climbed from <span className="font-mono tabular-nums">0.56 (Oct 21) to 0.80 (Nov 3)</span> and stayed elevated at <span className="font-mono tabular-nums">0.64</span> even on Wednesday&apos;s rally, surging to <span className="font-mono tabular-nums">0.86</span> on Nov 5.
                </li>
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Low DIX + Positive GEX Distribution Setup:</strong> <Term id="DIX" /> eroded from <span className="font-mono tabular-nums">0.472 (Oct 21)</span> to <span className="font-mono tabular-nums">0.400–0.422 (0.408 on Nov 4)</span> alongside <span className="font-mono tabular-nums">+$5.46B GEX</span>&mdash;the classic &ldquo;Topping Process / Distribution Phase&rdquo; where dealer long-gamma pinning masks weak dark-pool buying.
                </li>
                <li>
                  • <strong className="text-slate-900 dark:text-slate-100">Semiconductor Divergence on Nov 4:</strong> Even as IXIC rose <span className="font-mono tabular-nums">+1.44%</span> and DJI surged <span className="font-mono tabular-nums">+3.03%</span> on Wednesday, <span className="font-mono tabular-nums">XLK (−0.01%), SOXX (−3.01% to $450.99), and NVDA (−3.17% to $200.13)</span> fell, with <strong className="text-[#BC4128] dark:text-[#E2694A] font-mono">25 of 30 SOX stocks closing in the red</strong>.
                </li>
              </ul>
            </div>
          </div>

          {/* Framework A 4-Day State Table */}
          <div className="rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="font-serif text-base text-slate-900 dark:text-slate-100">
                Framework A State Vector (Nov 2 – Nov 5, 2026)
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Tabular Diagnostic Readout
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 font-mono text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4">Metric / Signal</th>
                    <th className="py-3 px-4">Mon, Nov 2</th>
                    <th className="py-3 px-4">Tue, Nov 3</th>
                    <th className="py-3 px-4 text-[#A8672E] dark:text-[#D08F52]">Wed, Nov 4 (Eve)</th>
                    <th className="py-3 px-4 text-[#BC4128] dark:text-[#E2694A]">Thu, Nov 5 (Crash)</th>
                    <th className="py-3 px-4">Diagnostic Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono tabular-nums">
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">SPX Close (Daily %)</td>
                    <td className="py-2.5 px-4">7,541.40 (−0.51%)</td>
                    <td className="py-2.5 px-4">7,568.92 (+0.36%)</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">7,688.62 (+1.58%)</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">7,353.73 (−4.36%)</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">Nov 4 bounce erased by −334.89 pt plunge</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">Instantaneous 1d Vol</td>
                    <td className="py-2.5 px-4">8.12%</td>
                    <td className="py-2.5 px-4">5.78%</td>
                    <td className="py-2.5 px-4">24.91%</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">70.69%</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">|ln(S_t/S_t-1)| × √252 × 100</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">VIX Close (<Term id="vix_rank" />)</td>
                    <td className="py-2.5 px-4">21.15 (0.87)</td>
                    <td className="py-2.5 px-4">20.83 (0.85)</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">16.61 (0.41)</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">28.18 (0.99)</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">Crushed −20.26% Wed; surged +69.7% Thu</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">RV20 / RV10 (%)</td>
                    <td className="py-2.5 px-4">11.52 / 13.40</td>
                    <td className="py-2.5 px-4">11.37 / 13.48</td>
                    <td className="py-2.5 px-4">12.92 / 15.78</td>
                    <td className="py-2.5 px-4">20.22 / 26.79</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">Nov 4 rally raised RV20 (+1.55) &amp; RV10 (+2.30)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100"><Term id="VRP" /> / <Term id="VRP_Variance" label="VRP Variance" /></td>
                    <td className="py-2.5 px-4">+9.63 / +3.15</td>
                    <td className="py-2.5 px-4">+9.46 / +3.05</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">+3.70 / +1.09</td>
                    <td className="py-2.5 px-4">+7.96 / +3.85</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">Artificially re-widened Thu as VIX outpaced RV20</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">VRP Z-Score (<Term id="vrp_z" />)</td>
                    <td className="py-2.5 px-4">+1.32</td>
                    <td className="py-2.5 px-4">+1.24</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52] font-semibold">−0.60</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">+0.77</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">Negative on Nov 4 (≤0); flipped positive Nov 5</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">Live VIX3M (<Term id="term_slope" />)</td>
                    <td className="py-2.5 px-4">21.60 (+0.45)</td>
                    <td className="py-2.5 px-4">21.27 (+0.44)</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">18.80 (+2.19)</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">25.55 (−2.63)</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">Contango (+2.19) inverted to −2.63 backwardation</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100"><Term id="downside_variance_share" label="Downside Var Share" /></td>
                    <td className="py-2.5 px-4">0.78</td>
                    <td className="py-2.5 px-4">0.80</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">0.64</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">0.86</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">Persistent left-tail dominance (0.24 on 10/13 → 0.86)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100"><Term id="DIX" /> / <Term id="GEX" /> / <Term id="DSPX" /></td>
                    <td className="py-2.5 px-4">0.400 / +$2.78B / 39.14</td>
                    <td className="py-2.5 px-4">0.422 / +$3.06B / 37.44</td>
                    <td className="py-2.5 px-4">0.408 / +$5.46B / 37.63</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">n/a / −$51.72B / n/a</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-600 dark:text-slate-400">Low DIX + Pos GEX distribution → −$51.72B flip</td>
                  </tr>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/60">
                    <td className="py-2.5 px-4 font-sans font-bold text-slate-900 dark:text-slate-100">Regime Score &amp; Label</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">−0.68 (Stressed Prem)</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52]">−0.76 (Stressed Prem)</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">−0.60 (Thin)</td>
                    <td className="py-2.5 px-4 font-bold text-[#BC4128] dark:text-[#E2694A]">−2.23 (Stressed Prem)</td>
                    <td className="py-2.5 px-4 font-sans text-xs font-medium text-slate-800 dark:text-slate-200">Flipped reactively after VIX &amp; slope triggered</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: QUESTION 2 — APPLICABILITY & STRUCTURAL FAILURES
        =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              Model Applicability: Where the Methodologies Fit and Where They Fail
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Standard regime models are calibrated for broad macro-liquidity bear markets, whereas November 5 was a politically catalyzed capex repricing hitting the heaviest cap-weighted tier from post-event vol compression.
            </p>
          </div>

          {/* Dark Monospace Formula Panel: Theoretical Ex-Ante VRP vs Backward RV20 Lag */}
          <div className="rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-slate-800 shadow-md space-y-4 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-[#D08F52]">
                Bollerslev-Tauchen-Zhou (2009) &amp; Carr-Wu (2009) Theoretical VRP vs. Trailing RV20 Proxy
              </span>
              <span className="text-xs text-slate-400">The &ldquo;Stressed Premium&rdquo; Lag Paradox</span>
            </div>

            <div className="text-sm sm:text-base text-slate-100 overflow-x-auto py-1">
              <MathBlock math="\text{VRP}_t^{\text{theoretical}} \equiv \mathbb{E}_t^{\mathbb{Q}}[\text{RV}_{t, t+21}] - \mathbb{E}_t^{\mathbb{P}}[\text{RV}_{t, t+21}] \approx \text{VIX}_t - \text{RV}_{t-20, t}" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs leading-relaxed border-t border-slate-800/80">
              <div className="space-y-1.5 text-slate-300">
                <div className="text-[#D08F52] font-semibold">1-Day Shock vs. 20-Day Window Math (Nov 5):</div>
                <div className="tabular-nums">• SPX Daily Log Return: ln(7353.73 / 7688.62) = −0.044533 (−4.36%)</div>
                <div className="tabular-nums">• Squared 1-Day Return: (−0.044533)² = 0.001983</div>
                <div className="tabular-nums">• Instantaneous 1-Day Annualized Vol: 0.044533 × √252 × 100 = 70.69%</div>
                <div className="tabular-nums">• Trailing RV20 (averaging 1 crash day with 19 calm ~0.6% days): 12.92% → 20.22% (+7.30 pts)</div>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="text-[#3CBF9C] font-semibold">Why VRP Artificially Expanded on Crash Day:</div>
                <div className="tabular-nums">• VIX repriced forward 30d risk-neutral vol instantaneously: 16.61 → 28.18 (+11.57 pts)</div>
                <div className="tabular-nums">• Because ΔVIX (+11.57) &gt; ΔRV20 (+7.30), trailing VRP jumped +3.70 → +7.96 (vrp_z = +0.77)</div>
                <div className="tabular-nums">• Result: Classified as Stressed Premium (vrp_z &gt; 0) instead of Crisis (vrp_z ≤ 0)</div>
                <div className="text-slate-200 pt-1">
                  • Fix: Replace flat RV20 with HAR-RV (1d/5d/20d) or override RV20 with max(RV10=26.79%, RV20=20.22%) when term_slope &lt; 0.
                </div>
              </div>
            </div>
          </div>

          {/* 3 Dichotomy Comparison Cards for Breadth, Credit, and GEX/DIX */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-[#A8672E] dark:text-[#D08F52]">
                  Dichotomy 1 · Breadth Inversion
                </div>
                <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">
                  Framework B Assumption vs. Oct–Nov 2026 Tape
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Framework B Thesis (Narrow Top):
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    &ldquo;Mega-caps prop up the index while the median stock falls&rdquo; over a deteriorating A/D line.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10 border border-[#1D8A70]/20 dark:border-[#3CBF9C]/20">
                  <div className="font-mono font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                    Actual Nov 5 Reality (Mega-Cap Led Flush):
                  </div>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-mono tabular-nums text-xs">
                    <li>• Oct 2026: IXIC −5.3%, SPX −0.9%, yet 91% Defensives &amp; 72% Cyclicals rose (% &gt; 200d MA: 41% → 63.82% by Nov 4).</li>
                    <li>• YTD to Nov 2: RSP +14.8% price (+17.98% TR), beating SPY by ~450 bps (widest since 2009).</li>
                    <li>• Nov 5: RSP (−2.89% to $216.87) beat SPY (−4.43% to −4.5%) &amp; QQQ (−6.5%); RSP/SPY rose 0.2912 → 0.2959.</li>
                    <li>• XLP, XLU, XLC fell &lt;1% vs XLK −8.04%; Tokyo TOPIX rose +1.16% vs Nikkei −1.79%.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-[#A8672E] dark:text-[#D08F52]">
                  Dichotomy 2 · Credit Bifurcation
                </div>
                <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">
                  Broad High-Yield Calm vs. Neocloud CDS Spike
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10 border border-[#1D8A70]/20 dark:border-[#3CBF9C]/20">
                  <div className="font-mono font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">
                    Macro Credit Non-Confirmation:
                  </div>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-mono tabular-nums text-xs">
                    <li>• HYG slipped just −0.31% ($77.52 → $77.28).</li>
                    <li>• <Term id="BAMLH0A0HYM2" /> held at 3.40% (Nov 3) &amp; 3.44% (Oct 30 &amp; Nov 5)—below the 4.00%–5.00% crunch threshold (4.61% in Apr 2025).</li>
                    <li>• 10Y yield −5 bps to 4.84% (2Y −11 bps to 4.47%).</li>
                    <li>• Apple ($AAPL) $7B IG bond offering attracted $31B in orders (4.4x oversubscribed).</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border border-[#BC4128]/20 dark:border-[#E2694A]/20">
                  <div className="font-mono font-semibold text-[#BC4128] dark:text-[#E2694A] mb-1">
                    Localized AI Infrastructure Stress:
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs">
                    CoreWeave (<span className="font-mono">CRWV</span>, equity <span className="font-mono tabular-nums">−8.9% to −9.83%</span>) saw its <strong className="font-mono">5-year CDS widen to a record high</strong> on Nov 5. AI leverage resides in private credit, GPU-backed facilities, and neocloud debt rather than brick-and-mortar cash junk bonds.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-[#A8672E] dark:text-[#D08F52]">
                  Dichotomy 3 · Microstructural Limits
                </div>
                <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">
                  Why +$5.46B GEX Failed &amp; DIX Degraded
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border border-[#BC4128]/20 dark:border-[#E2694A]/20">
                  <div className="font-mono font-semibold text-[#BC4128] dark:text-[#E2694A] mb-1">
                    Local vs. Global Gamma Cushion:
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs">
                    Positive <Term id="GEX" /> (<span className="font-mono tabular-nums">+$5.46B</span> on Nov 4) only dampens moves above the <Term id="Gamma_Flip" label="Gamma Flip" /> (<span className="font-mono tabular-nums">SPX 7,699–7,801</span>). Once morning selling breached 7,699, dealer GEX flipped to <span className="font-mono tabular-nums">−$42.88B (10:10a)</span> and <span className="font-mono tabular-nums">−$54.09B (12:39p)</span>.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    3 Sources of DIX Signal Degradation (2022–2026):
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400 font-mono tabular-nums text-xs">
                    <li>1. 0DTE &gt;50% of SPX volume hedged via ES futures (misses 20%–30% flow).</li>
                    <li>2. Macro rotation executes via ETFs (SPY, QQQ, RSP, SOXX, SMH) outside single-stock DIX.</li>
                    <li>3. HFT maker-taker rebate arbitrage adds 15%–25% noise.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: QUESTION 3 — THE BULL-TO-BEAR TEST (2.5 / 5.0 SCORECARD)
        =================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                Bull-to-Bear Regime Test: Positioning Flush vs. Regime-Change Window
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Scoring all five quantitative signals from Framework B as of the November 5, 2026 close.
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#14171B] dark:bg-[#05070A] border border-slate-800 text-right font-mono">
              <div className="text-[11px] uppercase text-slate-400">Composite Regime Score</div>
              <div className="text-lg font-bold text-[#D08F52] tabular-nums">
                2.5 / 5.0 · Positioning &amp; Gamma Flush
              </div>
            </div>
          </div>

          {/* 5 Signal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Term Structure (VIX / VIX3M)
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A]">
                  1.0 / 1.0 · Triggered
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>• <strong className="text-slate-900 dark:text-slate-100">Threshold:</strong> <span className="font-mono tabular-nums">VIX/VIX3M &gt; 1.00</span> flags stress; <span className="font-mono tabular-nums">1.00–1.25+</span> flags early bear acceleration.</li>
                <li>• <strong className="text-slate-900 dark:text-slate-100">Trajectory:</strong> Stood at <span className="font-mono tabular-nums">0.979</span> (Nov 2–3), relaxed to <span className="font-mono tabular-nums">0.883</span> (Nov 4: <span className="font-mono tabular-nums">16.61 / 18.80</span>), and jumped to <strong className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">1.103</strong> on Nov 5 (<span className="font-mono tabular-nums">28.18 / 25.55; term_slope = −2.63</span>).</li>
                <li>• <strong className="text-slate-900 dark:text-slate-100">Front-End Inversion:</strong> <span className="font-mono tabular-nums">VIX9D (32.66) / VIX (28.18) = 1.159</span>; <span className="font-mono tabular-nums">VIX9D / VIX3M = 1.278</span>.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Market Breadth (<Term id="TRIN" />, A/D, % &gt; 200d MA)
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/15 text-[#1D8A70] dark:text-[#3CBF9C]">
                  0.0 / 1.0 · Inverted
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>• <strong className="text-slate-900 dark:text-slate-100">Data Hygiene Note:</strong> Automated queries for NYSE <Term id="TRIN" /> on Nov 4–5 were confounded by ticker collision with Trinity Capital Inc. (<span className="font-mono">NASDAQ: TRIN</span>, Q3 earnings Nov 4, trading at <span className="font-mono tabular-nums">$17.90–$17.94</span>).</li>
                <li>• <strong className="text-slate-900 dark:text-slate-100">Internal Resilience:</strong> On Nov 4, S&amp;P 500 A/D was <span className="font-mono tabular-nums">376 vs 127 (2.961; 52w highs 56 vs 0)</span> with <span className="font-mono tabular-nums">73.36% &gt; 20d MA, 70.97% &gt; 50d MA, and 63.82% &gt; 200d MA</span>. On Nov 5, despite all 11 sectors closing red, <strong className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">62.94% stayed &gt; 50d MA and 58.76% stayed &gt; 200d MA</strong>, while <span className="font-mono tabular-nums">RSP (−2.89%)</span> beat <span className="font-mono tabular-nums">SPY (−4.43% to −4.5%)</span>.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Factor Crowding (SOX, MTUM, AI Hardware)
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A]">
                  1.0 / 1.0 · Triggered Violently
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>• <strong className="text-slate-900 dark:text-slate-100">SOXX &amp; MTUM Split Caveat (Nov 5 Open):</strong> BlackRock executed forward splits on <span className="font-mono">SOXX (3-for-1), MTUM (4-for-1), QUAL (4-for-1), ITA (3-for-1), and EFV (2-for-1)</span>. Unadjusted feeds falsely reported a &ldquo;−69.92% SOXX crash&rdquo; (<span className="font-mono tabular-nums">$135.49 vs $450.99 pre-split</span>); split-adjusted <span className="font-mono">SOXX</span> fell <span className="font-mono tabular-nums">~8%–10%</span>.</li>
                <li>• <strong className="text-slate-900 dark:text-slate-100">Crowding Unwind:</strong> <span className="font-mono tabular-nums">SOX plunged −12.25% (10,268.65 → 9,011.14)</span>, its 2nd-worst drop on record and <span className="font-mono tabular-nums">−38.51%</span> below its <span className="font-mono tabular-nums">14,655.30</span> 52w high. <span className="font-mono">MTUM</span> (pre-split <span className="font-mono tabular-nums">$275.14–$278.33, 52w high $345.59, beta 1.27</span>, carrying <span className="font-mono tabular-nums">4.95%–5.63%</span> weight in <span className="font-mono">MU</span>) sat <span className="font-mono tabular-nums">−20.80%</span> off its 2026 peak and <span className="font-mono tabular-nums">−6.03%</span> below its 200d MA.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Corporate Credit (<Term id="BAMLH0A0HYM2" /> &amp; HYG)
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/15 text-[#1D8A70] dark:text-[#3CBF9C]">
                  0.0 / 1.0 · Not Confirmed
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>• <strong className="text-slate-900 dark:text-slate-100">HY Spreads Stable:</strong> <Term id="BAMLH0A0HYM2" /> printed <span className="font-mono tabular-nums">3.44% (Oct 30), 3.40% (Nov 3), and 3.44% (Nov 5)</span>&mdash;well below the <span className="font-mono tabular-nums">4.00%+</span> bear regime threshold&mdash;while <span className="font-mono tabular-nums">HYG</span> slipped only <span className="font-mono tabular-nums">−0.31% ($77.52 → $77.28)</span>.</li>
                <li>• <strong className="text-slate-900 dark:text-slate-100">Macro Backdrop Resilient:</strong> Nov 5 weekly initial jobless claims fell to a 3.5-month low of <span className="font-mono tabular-nums">189,000</span>, Q3 nonfarm productivity rose <span className="font-mono tabular-nums">+3.6%</span>, and unit labor costs fell <span className="font-mono tabular-nums">−0.7%</span>.</li>
              </ul>
            </div>
          </div>

          {/* Signal 5: Technical Moving Average Table */}
          <div className="rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="font-serif text-base text-slate-900 dark:text-slate-100">
                Signal 5 · Trend Structure (50-Day &amp; 200-Day Moving Averages)
              </span>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52]">
                0.5 / 1.0 · Bifurcated (Tech Broken vs. SPX Testing Structural Floor)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 font-mono text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4">Index / ETF</th>
                    <th className="py-3 px-4">Nov 4 Close</th>
                    <th className="py-3 px-4">Nov 5 Close</th>
                    <th className="py-3 px-4">50-Day MA</th>
                    <th className="py-3 px-4">200-Day MA</th>
                    <th className="py-3 px-4">Technical Trend Verdict on Nov 5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono tabular-nums">
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">Nasdaq Comp (IXIC)</td>
                    <td className="py-2.5 px-4">25,736.51</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">24,315.00</td>
                    <td className="py-2.5 px-4">26,516.95</td>
                    <td className="py-2.5 px-4">25,093.39 – 25,097.54</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-[#BC4128] dark:text-[#E2694A] font-medium">Decisive Break Below Both 50d &amp; 200d MA (−3.1% below 200d; in correction −11.9% off peak)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">Nasdaq-100 (NDX)</td>
                    <td className="py-2.5 px-4">28,437.17</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">26,629.81</td>
                    <td className="py-2.5 px-4">28,904.34</td>
                    <td className="py-2.5 px-4">29,893.45</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-[#BC4128] dark:text-[#E2694A] font-medium">Decisive Break Below Both 50d &amp; 200d MA (−14.7% off 3m high of 31,224)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">Philly Semi (SOX)</td>
                    <td className="py-2.5 px-4">10,268.65</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">9,011.14</td>
                    <td className="py-2.5 px-4">&lt; 10,268 (Broken)</td>
                    <td className="py-2.5 px-4">&lt; 10,268 (Broken)</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-[#BC4128] dark:text-[#E2694A] font-medium">Decisive Break Below 50d &amp; 200d MA (SMH $489.93 pre-open vs $521 200d MA)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">S&amp;P 500 (SPX)</td>
                    <td className="py-2.5 px-4">7,688.62</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52] font-semibold">7,353.73</td>
                    <td className="py-2.5 px-4">7,622.77 – 7,702.04</td>
                    <td className="py-2.5 px-4">7,550.92–7,702.38 / ~7,300</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-slate-700 dark:text-slate-300">Broke 50d MA &amp; 7,469–7,541 support; testing 7,266–7,313.92 structural swing floor</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">SPDR S&amp;P 500 (SPY)</td>
                    <td className="py-2.5 px-4">$766.94 / $756.15</td>
                    <td className="py-2.5 px-4 text-[#A8672E] dark:text-[#D08F52] font-semibold">$731.31 – $734.01</td>
                    <td className="py-2.5 px-4">$766.39 (20d: $768.09)</td>
                    <td className="py-2.5 px-4">~$725.95 – $726.62</td>
                    <td className="py-2.5 px-4 font-sans text-xs text-[#1D8A70] dark:text-[#3CBF9C] font-medium">Broke 50d SMA ($766.39); holding ~1% above $726.62 long-term reference support</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-slate-200">Regime-Change Trigger Line:</strong> A full macro-credit Regime-Change Window requires <span className="font-mono tabular-nums">SPX</span> to break and close decisively below <span className="font-mono tabular-nums">7,260–7,300 (SPY $726, SPX Put Wall 7,000)</span> alongside <Term id="BAMLH0A0HYM2" /> widening past <span className="font-mono tabular-nums">4.00%</span>.
            </div>
          </div>
        </section>

        {/* ===================================================================
            INLINE INFOGRAPHIC SLOT
        =================================================================== */}
        <InfographicSlot
          alt="November 5, 2026 Equity Drawdown Quantitative Post-Mortem"
          label="Featured Infographic"
        />

        {/* ===================================================================
            SECTION 5: QUESTION 4 — VOLATILITY-SURFACE & MICROSTRUCTURE READ
        =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              Volatility-Surface &amp; Microstructure Read (November 4 vs. November 5)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Why Cboe <Term id="SKEW" /> fell (<span className="font-mono tabular-nums">150.9 → 149.4</span>) while <span className="font-mono tabular-nums">VIX</span> jumped <span className="font-mono tabular-nums">69.7%</span>, how the surface shifted from <Term id="Sticky_Strike" label="Sticky Strike" /> to <Term id="Sticky_Delta" label="Sticky Delta" />, and the intraday <span className="font-mono tabular-nums">−$57B</span> dealer gamma swing.
            </p>
          </div>

          {/* Dark Monospace Formula Panel: BKM SKEW & Normalized Skew */}
          <div className="rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-slate-800 shadow-md space-y-4 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-[#D08F52]">
                Bakshi-Kapadia-Madan (1999) Risk-Neutral Skewness &amp; Normalized Skew
              </span>
              <span className="text-xs text-slate-400">Why SKEW Dipped 150.90 → 149.40 on a −4.36% Crash</span>
            </div>

            <div className="space-y-2 text-sm sm:text-base text-slate-100 overflow-x-auto py-1">
              <MathBlock math="\text{SKEW} = 100 - 10 \times S, \quad S = \frac{\mathbb{E}^{\mathbb{Q}}[(R - \mu)^3]}{(\text{Var}^{\mathbb{Q}}(R))^{3/2}} \approx \frac{\text{Cubic Wing Asymmetry}}{\sigma_{\text{ATM}}^3}" />
              <MathBlock math="\text{Normalized Skew} = \frac{\text{IV}_{25\Delta\text{ put}} - \text{IV}_{25\Delta\text{ call}}}{\text{IV}_{\text{ATM}}}" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs leading-relaxed border-t border-slate-800/80">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="text-[#D08F52] font-semibold">
                  Worked Surface Baseline (Mon, Nov 2 · 2:24 PM ET Velocity Report):
                </div>
                <div className="tabular-nums text-slate-300">
                  • SPX 30d ATM IV = 16.32%; 25Δ Risk Reversal (IV_put − IV_call) = 6.41 vol pts
                </div>
                <div className="tabular-nums text-white font-semibold">
                  ⇒ SPX Normalized Skew = 6.41 / 16.32 = 0.393 (39.3%)
                </div>
                <div className="tabular-nums text-slate-300 pt-1">
                  • NDX 30d ATM IV = 26.12%; 25Δ Risk Reversal = 7.58 vol pts
                </div>
                <div className="tabular-nums text-white font-semibold">
                  ⇒ NDX Normalized Skew = 7.58 / 26.12 = 0.290 (29.0%)
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="text-[#3CBF9C] font-semibold">
                  Nov 4 → Nov 5 Denominator Expansion (σ_ATM³):
                </div>
                <div className="tabular-nums text-slate-300">
                  • On Nov 4, VIX was crushed to 16.61 (SPY 30d IV 12.98%), shrinking σ_ATM³ and pushing SKEW up to 150.90 (&ldquo;Nervous Bull&rdquo;).
                </div>
                <div className="tabular-nums text-slate-300">
                  • On Nov 5, traders bought immediate ATM/25Δ puts and ~800,000 VIX calls (3.5x 30d avg) while monetizing deep OTM puts.
                </div>
                <div className="tabular-nums text-white font-semibold">
                  ⇒ VIX rose +69.7% (28.18) and VXN +52.6% (38.26); σ_ATM in the denominator grew faster than the wings, dipping SKEW to 149.40.
                </div>
              </div>
            </div>
          </div>

          {/* Dichotomy Card: Sticky-Strike (Nov 4) vs Sticky-Delta (Nov 5) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Nov 4: <Term id="Sticky_Strike" label="Sticky-Strike" /> / Vanna Relief
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/15 text-[#1D8A70] dark:text-[#3CBF9C]">
                  dσ(K)/dS = 0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                As <span className="font-mono tabular-nums">SPX</span> rallied <span className="font-mono tabular-nums">+1.58%</span> on Wednesday down a fixed downward-sloping skew curve, the new ATM strike slid into lower-IV territory, reinforced by post-election vol selling (<span className="font-mono tabular-nums">VIX −20.26% to 16.61</span>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Nov 5: <Term id="Sticky_Delta" label="Sticky-Delta" /> / Vol-of-Vol Expansion
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/15 text-[#BC4128] dark:text-[#E2694A]">
                  SSR &gt; 2.0 · VVIX 135.0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Had <span className="font-mono">SPX</span> merely slid down a fixed Sticky-Strike smirk across a <span className="font-mono tabular-nums">−4.36%</span> drop (~1.5–2.0 vol pts per 1% move), <span className="font-mono">VIX</span> would have risen +6.5–8.5 pts (to ~23–25). Instead, <span className="font-mono tabular-nums">VIX surged +11.57 pts to 28.18</span> and <span className="font-mono tabular-nums">VIX9D +17.47 pts to 32.66</span> as the entire smile repriced upward.
              </p>
            </div>
          </div>

          {/* Multi-Tenor Surface & Intraday GEX Progression Table */}
          <div className="rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="font-serif text-base text-slate-900 dark:text-slate-100">
                Multi-Tenor Volatility Curve, Put/Call Ratios &amp; Intraday Dealer GEX (Oct 30 – Nov 5)
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                −$57B Dealer Gamma Swing
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 font-mono text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4">Surface / Flow Metric</th>
                    <th className="py-3 px-4">Fri, Oct 30</th>
                    <th className="py-3 px-4">Mon, Nov 2</th>
                    <th className="py-3 px-4">Tue, Nov 3</th>
                    <th className="py-3 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">Wed, Nov 4</th>
                    <th className="py-3 px-4 text-[#BC4128] dark:text-[#E2694A]">Thu, Nov 5 (Intraday &amp; Close)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono tabular-nums">
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">VIX9D / VIX / VIX3M</td>
                    <td className="py-2.5 px-4">19.25 / 19.42 / 20.78</td>
                    <td className="py-2.5 px-4">22.46 / 21.15 / 21.60</td>
                    <td className="py-2.5 px-4">21.96 / 20.83 / 21.27</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">15.19 / 16.61 / 18.80</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">32.66 / 28.18 / 25.55 (Full Inversion)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">VXN &amp; (VXN − VIX Spread)</td>
                    <td className="py-2.5 px-4">28.50 (+9.08)</td>
                    <td className="py-2.5 px-4">30.89 (+9.74)</td>
                    <td className="py-2.5 px-4">30.53 (+9.70)</td>
                    <td className="py-2.5 px-4">25.08 (+8.47)</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">38.26 (+10.08 pts NDX stress)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">VVIX / Cboe <Term id="SKEW" /></td>
                    <td className="py-2.5 px-4">106.4 / 149.8</td>
                    <td className="py-2.5 px-4">110.5 / 152.8</td>
                    <td className="py-2.5 px-4">107.4 / 150.0</td>
                    <td className="py-2.5 px-4">90.4 / 150.90</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">135.0 (+49.3%) / 149.40 (−1.5 pts)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">Total PCR / SPX PCR / Equity PCR</td>
                    <td className="py-2.5 px-4">0.90 / 1.25 / 0.66</td>
                    <td className="py-2.5 px-4">0.87 / 1.13 / 0.67</td>
                    <td className="py-2.5 px-4">n/a</td>
                    <td className="py-2.5 px-4">0.80 / 1.20 / ~0.76</td>
                    <td className="py-2.5 px-4">&gt;1.00 / &gt;1.20 / &gt;1.00 (SPY Nov 6 Vol PCR 1.07 vs OI 0.73)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">SPX Net <Term id="GEX" /> &amp; Walls</td>
                    <td className="py-2.5 px-4">+$1.06B</td>
                    <td className="py-2.5 px-4">+$2.78B</td>
                    <td className="py-2.5 px-4">+$3.06B</td>
                    <td className="py-2.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">+$5.46B</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">−$42.88B (10:10a) → −$54.09B (12:39p) → −$51.72B Close (Flip 7,699–7,801; Put Wall 7,400→7,000; Max Pain 7,650)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">SPY &amp; NDX Net <Term id="GEX" /></td>
                    <td className="py-2.5 px-4">Pos / Near flip</td>
                    <td className="py-2.5 px-4">Pos / Near flip</td>
                    <td className="py-2.5 px-4">Pos / Near flip</td>
                    <td className="py-2.5 px-4">Pos / Near flip</td>
                    <td className="py-2.5 px-4 text-[#BC4128] dark:text-[#E2694A]">SPY: −$11.95B → −$12.27B → −$11.43B (Put Wall $725–$730) · NDX: −$2.21B → −$2.35B → −$1.96B (Flip 29,153 → Unresolved; Put Wall 26,000)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: QUESTION 5 — HISTORICAL ANALOGS MATRIX
        =================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                Historical Analogs: One-Day Shocks Starting from Calm Volatility
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Across <span className="font-mono tabular-nums">n = 79</span> Cboe VIX spikes (≥20% 1-day jump) since 1990, VIX closed lower 5 sessions later in <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">57 of 79 episodes (72.2% win rate, median −10.64%)</span>&mdash;failing only when macro credit (<Term id="BAMLH0A0HYM2" /> &gt; 4.5%) broke down.
              </p>
            </div>

            {/* Interactive Filter Buttons */}
            <div className="inline-flex rounded-lg p-1 bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 self-start">
              <button
                type="button"
                onClick={() => setAnalogFilter('ALL')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  analogFilter === 'ALL'
                    ? 'bg-[#14171B] text-white dark:bg-[#D08F52] dark:text-slate-950 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                All Analogs (8)
              </button>
              <button
                type="button"
                onClick={() => setAnalogFilter('WIN')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  analogFilter === 'WIN'
                    ? 'bg-[#1D8A70] text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Vol Sell Paid Off (4)
              </button>
              <button
                type="button"
                onClick={() => setAnalogFilter('LOSS')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  analogFilter === 'LOSS'
                    ? 'bg-[#BC4128] text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Losses / Mixed (3)
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 font-mono text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4">Episode &amp; Catalyst</th>
                    <th className="py-3 px-4">Shock SPX Ret</th>
                    <th className="py-3 px-4">Prior → Shock VIX</th>
                    <th className="py-3 px-4">VIX/VIX3M</th>
                    <th className="py-3 px-4">Fwd 5d / 21d / 63d</th>
                    <th className="py-3 px-4">Max 21d DD</th>
                    <th className="py-3 px-4">Did Selling Vol Pay Off?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono tabular-nums">
                  {filteredAnalogs.map((row) => (
                    <tr
                      key={row.date}
                      className={
                        row.verdict === 'CURRENT'
                          ? 'bg-amber-500/5 dark:bg-amber-500/10'
                          : ''
                      }
                    >
                      <td className="py-3 px-4 font-sans">
                        <div className="font-mono font-bold text-slate-900 dark:text-slate-100">
                          {row.date}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {row.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          {row.context}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#BC4128] dark:text-[#E2694A] font-semibold">
                        {row.spxRet}
                      </td>
                      <td className="py-3 px-4 text-xs">{row.vixPath}</td>
                      <td className="py-3 px-4">{row.termRatio}</td>
                      <td className="py-3 px-4 text-xs">
                        <div>5d: <span className="font-semibold">{row.fwd5d}</span></div>
                        <div>21d: <span className="font-semibold">{row.fwd21d}</span></div>
                        <div>63d: <span className="font-semibold">{row.fwd63d}</span></div>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#BC4128] dark:text-[#E2694A]">
                        {row.maxDD}
                      </td>
                      <td className="py-3 px-4 font-sans text-xs max-w-xs">
                        <span
                          className={`inline-block font-mono text-[11px] font-bold px-2 py-0.5 rounded mb-1 ${
                            row.verdict === 'WIN'
                              ? 'bg-[#1D8A70]/15 text-[#1D8A70] dark:text-[#3CBF9C]'
                              : row.verdict === 'LOSS'
                              ? 'bg-[#BC4128]/15 text-[#BC4128] dark:text-[#E2694A]'
                              : 'bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52]'
                          }`}
                        >
                          {row.verdict}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {row.verdictText}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: QUESTION 6 — PLAYBOOK & POSITION SIZING AUDIT
        =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              Options Playbook &amp; Position-Sizing Audit Against the Analogs
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Across 6,500+ sessions since 2000, <Term id="Stressed_Premium" label="Stressed Premium" /> (<span className="font-mono tabular-nums">n = 724</span>) earned <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">+3.58 vol pts</span> over 21 days (vs. <span className="font-mono tabular-nums">Harvest +3.83, Thin +3.59, Crisis +2.61</span>), but <span className="font-mono">2025-04-03</span> (<span className="font-mono tabular-nums">−15.7 pts</span>) proves why sizing down to <span className="font-mono tabular-nums">25%–33%</span> on Day 1 is mandatory ahead of Friday&apos;s NFP.
            </p>
          </div>

          {/* Dark Monospace Formula Panel: ATR Vol-Scaling & Fractional Kelly */}
          <div className="rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-slate-800 shadow-md space-y-4 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-[#D08F52]">
                Framework B Mathematical Sizing Governors: ATR Volatility Scaling &amp; Fractional Kelly
              </span>
              <span className="text-xs text-slate-400">Automatic Risk Throttling on Nov 5</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1 text-xs leading-relaxed">
              <div className="space-y-2">
                <div className="text-sm text-slate-100 font-semibold">
                  1. Volatility Scaling: <InlineMath math="\text{Size} = \frac{\text{Risk}}{\text{ATR} \times M}" />
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5 tabular-nums text-slate-300">
                  <div className="text-[#D08F52] font-semibold">Worked Example (Nov 4 → Nov 5):</div>
                  <div>• SOXX 14-day ATR (pre-split basis): $21.51 → $42.48 (+97.5%)</div>
                  <div>• SPX RV10: 15.78% → 26.79% (+69.8%); VIX: 16.61 → 28.18 (+69.7%)</div>
                  <div className="text-[#3CBF9C] font-semibold pt-1">
                    ⇒ Mechanical Output: 41% to 49% overnight cut in position size.
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-100 font-semibold">
                  2. Fractional Kelly Criterion: <InlineMath math="f^* = \frac{b \cdot p - q}{b}" />
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5 tabular-nums text-slate-300">
                  <div className="text-[#D08F52] font-semibold">Worked Example (79-Spike Cboe Base Rate):</div>
                  <div>• Win rate p = 0.722 (57/79 spikes lower in 5d); loss rate q = 1 − p = 0.278</div>
                  <div>• Asymmetric tail payoff ratio b = 0.50 (2x tail loss in 2020/2025-04 continuations)</div>
                  <div>• Full Kelly f* = [0.50(0.722) − 0.278] / 0.50 = 0.083 / 0.50 = +0.166 (16.6%)</div>
                  <div className="text-[#3CBF9C] font-semibold pt-1">
                    ⇒ Quarter-Kelly (0.25 × f*) Allocation Cap = ~4.15% of portfolio equity.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Options Strategy Audit Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  1x2 Put Ratio Spread (Credit)
                </span>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#1D8A70]/15 text-[#1D8A70] dark:text-[#3CBF9C]">
                  FAVORED (SPX/RSP)
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Buy 1 ATM/near-ATM put, sell 2 OTM puts (30–45 DTE). At <span className="font-mono tabular-nums">VIX 28.18 &amp; SKEW 149.4</span>, generates net credit with lower breakeven 8%–10% below spot (<span className="font-mono tabular-nums">SPX &lt; 6,800 / NDX &lt; 24,000</span>). Outperformed in <span className="font-mono">2016, 2018, 2024</span> by capturing the −1.8% to −2.6% secondary dip + Vanna crush. Avoid on <span className="font-mono">SOX/SMH</span>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Put-Heavy Collar
                </span>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52]">
                  DEFENSIVE ONLY
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Because <span className="font-mono">IV_ATM</span> rose faster than wings, 25Δ–30Δ calls on <span className="font-mono">NDX/QQQ (VXN 38.26)</span> are rich enough to fund 25Δ puts. Protected against the <span className="font-mono tabular-nums">−7.7%</span> secondary drop in <span className="font-mono">2025-04-03</span>, but capped the <span className="font-mono tabular-nums">+6.5% to +6.6%</span> V-bottoms in <span className="font-mono">2016 &amp; 2024</span>. Use only on legacy tech (<span className="font-mono">NVDA, AVGO</span>) into Nov 17 earnings.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  VIX Call Spreads
                </span>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#BC4128]/15 text-[#BC4128] dark:text-[#E2694A]">
                  MONETIZE / AVOID
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                ~800,000 VIX calls traded by midday Nov 5 (<span className="font-mono tabular-nums">3.5x avg</span>), pushing <span className="font-mono tabular-nums">VVIX to 135.0 (VVIX/VIX = 4.79)</span> and steep backwardation (<span className="font-mono tabular-nums">32.66 &gt; 28.18 &gt; 25.55</span>). Buying VIX call verticals at the close of Spike Day 1 lost money in <span className="font-mono tabular-nums">72.2%</span> of historical spikes within 5 sessions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Put Ratio Backspreads
                </span>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#BC4128]/15 text-[#BC4128] dark:text-[#E2694A]">
                  STAND ASIDE
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Short 1 ITM/ATM put, long 2 OTM puts (March 2026 playbook). Requires a secondary vol expansion and &gt;2 SD crash to overcome high vega/theta cost at <span className="font-mono tabular-nums">VIX 28.18</span>. Paid off in <span className="font-mono">2020-02-27</span> and Day 2 of <span className="font-mono">2025-04-03</span>, but lost heavily to Vanna crush in <span className="font-mono">2015, 2016, 2018, 2024</span>. Deploy only if <Term id="BAMLH0A0HYM2" /> &gt; 4.00%.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Intraday Gamma Scalping
                </span>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52]">
                  SHORT-DATED ONLY
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Works only if <span className="font-mono">RV &gt; IV</span>. Entering new straddles at <span className="font-mono tabular-nums">VIX 28.18 (VIX9D 32.66)</span> requires daily <span className="font-mono">SPX</span> swings of <span className="font-mono tabular-nums">±1.77% to ±2.05% (28.18/√252)</span> to cover theta. Scalp intraday gamma around Friday&apos;s NFP while dealers are short <span className="font-mono tabular-nums">−$51.72B GEX</span>; avoid holding unhedged weekend vega.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Factor Rotation &amp; Bull Steepener
                </span>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#1D8A70]/15 text-[#1D8A70] dark:text-[#3CBF9C]">
                  CORE ALLOCATION
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Working in real time: <span className="font-mono tabular-nums">RSP (−2.89%)</span> beat <span className="font-mono tabular-nums">QQQ (−6.5%)</span> by <span className="font-mono tabular-nums">+361 bps</span>; <span className="font-mono">XLP/XLU</span> fell &lt;1%; WTI rose <span className="font-mono tabular-nums">+2.72%</span>; and the Treasury curve bull-steepened (<span className="font-mono tabular-nums">2Y −11 bps to 4.47% vs 10Y −5 bps to 4.84%, 30Y 5.26%</span>). Stay overweight <span className="font-mono">RSP / SPYV / XLP / XLU</span> vs <span className="font-mono">SOX / MTUM</span>.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: CATALYST CALENDAR (NOV 6 – NOV 20) & YOUTUBE OUTLINE
        =================================================================== */}
        <section className="space-y-8">
          {/* Two-Week Catalyst Calendar */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                Two-Week Institutional Catalyst Calendar (November 6 – November 20, 2026)
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                With after-hours futures extending lower (<span className="font-mono tabular-nums">ES −0.6% to −0.8%, NQ −0.8% to −1.3%</span>) and dealer gamma at <span className="font-mono tabular-nums">−$51.72B</span>, four binary events will test the <span className="font-mono tabular-nums">SPX 7,266–7,300</span> structural floor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">Fri, Nov 6, 2026 · 8:30 AM ET</span>
                  <span className="text-slate-500">Immediate Day-2 Test</span>
                </div>
                <div className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  U.S. Employment Situation (Oct 2026 Nonfarm Payrolls)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Consensus:</strong> <span className="font-mono tabular-nums">+50,000 to +65,000</span> (RSM +95k; ADP +86k; Sept NFP +29,000; Unemployment <span className="font-mono tabular-nums">4.2%</span>; AHE <span className="font-mono tabular-nums">+0.3% MoM / +2.9%–3.0% YoY</span>). In-line print (+50k–80k) can stabilize 10Y yields (<span className="font-mono tabular-nums">4.84%</span>) and trigger Friday afternoon charm/vanna put-monetization above <span className="font-mono tabular-nums">SPY $730 (SPX Max Pain 7,650)</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#A8672E] dark:text-[#D08F52] font-bold">Tue, Nov 10, 2026 · 8:30 AM ET</span>
                  <span className="text-slate-500">Inflation &amp; NVDA IV Window</span>
                </div>
                <div className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  U.S. Consumer Price Index (Oct 2026 CPI)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Prior (Sept 2026):</strong> Headline <span className="font-mono tabular-nums">+0.6% MoM / 3.7% YoY</span>; Core <span className="font-mono tabular-nums">+0.3% MoM / 2.6% YoY</span> (accelerated from −0.4% MoM in June on oil). Also opens the 5-session pre-earnings IV ramp window for <span className="font-mono">NVDA</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">Tue, Nov 17, 2026 · 4:00 PM ET (AMC)</span>
                  <span className="text-slate-500">The AI Capex Referendum</span>
                </div>
                <div className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  Nvidia (NVDA) Q3 FY2027 Earnings Release
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Options Implied Move:</strong> <span className="font-mono tabular-nums">±7.3%</span> (vs ±8.4% 10-yr avg peak, ±6.6% median, ±5.7% 2-yr avg; Q2 priced ±5.9% and moved +8.7% close / +9.9% peak; Est. Rev <span className="font-mono tabular-nums">~$92.3B</span>). Management commentary on 2027–2028 hyperscaler delivery schedules will test the state moratorium thesis.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#A8672E] dark:text-[#D08F52] font-bold">Wed, Nov 18, 2026 · 2:00 PM ET</span>
                  <span className="text-slate-500">Monetary Policy Check</span>
                </div>
                <div className="font-serif text-base font-medium text-slate-900 dark:text-slate-100">
                  NVDA Reaction Session + FOMC Minutes (Oct 27–28 Meeting)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Context:</strong> Fed held at <span className="font-mono tabular-nums">3.75%–4.00%</span> in October with two hawkish dissenters favoring a hike (next FOMC decision is <span className="font-mono">Dec 8–9, 2026</span>). Market digests both <span className="font-mono">NVDA</span>&apos;s realized move against the ±7.3% straddle and Fed debate over energy inflation.
                </p>
              </div>
            </div>
          </div>

          {/* Question 7: 5-Point YouTube Explainer Narrative Outline */}
          <div className="p-6 rounded-xl bg-white dark:bg-[#12161C] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono uppercase text-[#A8672E] dark:text-[#D08F52]">
                  10-Minute YouTube Explainer Narrative Outline
                </div>
                <h2 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100 mt-0.5">
                  &ldquo;Why the Market Just Crashed 4.4% After the Election: What My Quant Volatility Models Saw (and Missed)&rdquo;
                </h2>
              </div>
              <PlaySquare className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
                <div className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">
                  0:00 – 1:45
                </div>
                <div className="space-y-1">
                  <div className="font-serif font-medium text-slate-900 dark:text-slate-100">
                    The Hook &mdash; The Post-Election Volatility Trap (Nov 4 Relief → Nov 5 Crash)
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Contrast Wednesday (<span className="font-mono tabular-nums">SPX +1.58%, Dow +1,569 pts, VIX −20.3% to 16.61</span>) with Thursday (<span className="font-mono tabular-nums">SPX −4.36%, NDX −6.36%, SOX −12.25%, VIX +70% to 28.18</span>). Explain how dumping election-night hedges left institutions unhedged with VIX below 17 right as state policy and earnings catalysts hit.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
                <div className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">
                  1:45 – 3:45
                </div>
                <div className="space-y-1">
                  <div className="font-serif font-medium text-slate-900 dark:text-slate-100">
                    The Real Catalyst &mdash; State-Level AI Data-Center Moratoriums &amp; The Memory Rout
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Show <span className="font-mono tabular-nums">SOX −12.25% (SNDK −22.3%, MU −17.5%, AMD −17.3%, NVDA −9.3%)</span> vs <span className="font-mono tabular-nums">RSP (−2.89%)</span> and <span className="font-mono tabular-nums">HYG (−0.31%)</span>, noting the <span className="font-mono">SOXX (3:1)</span> and <span className="font-mono">MTUM (4:1)</span> splits so viewers ignore false &ldquo;−70% SOXX&rdquo; feeds. Walk through Texas/Georgia data-center moratorium risks (<span className="font-mono tabular-nums">30%–45%</span> capacity exposure), Qualcomm guidance, Micron&apos;s Taiwan fab dispute, BoE&apos;s hike to <span className="font-mono tabular-nums">4.00%</span>, and <span className="font-mono tabular-nums">$98</span> Brent crude.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
                <div className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">
                  3:45 – 6:00
                </div>
                <div className="space-y-1">
                  <div className="font-serif font-medium text-slate-900 dark:text-slate-100">
                    Model Audit &mdash; What the VRP &amp; Bull-to-Bear Models Caught vs. Where They Lagged
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Show the <span className="font-mono">Stressed Premium → Thin → Stressed Premium</span> transition and the <span className="font-mono tabular-nums">2.5 / 5.0</span> Bull-to-Bear Scorecard. Highlight the 3 subsurface warnings present on Nov 4 (<span className="font-mono tabular-nums">downside_variance_share 0.80→0.64</span>, <span className="font-mono tabular-nums">DIX 0.408 + GEX +$5.46B</span> distribution, <span className="font-mono tabular-nums">25/30 SOX</span> red) and the 3 model blind spots on Nov 5 (<span className="font-mono tabular-nums">RV20 20.22%</span> lag vs <span className="font-mono tabular-nums">70.7%</span> 1d vol, <span className="font-mono">RSP &gt; SPY</span> breadth inversion, <span className="font-mono tabular-nums">3.44% HY OAS</span> calm vs CoreWeave CDS).
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
                <div className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">
                  6:00 – 8:00
                </div>
                <div className="space-y-1">
                  <div className="font-serif font-medium text-slate-900 dark:text-slate-100">
                    Decoding the Volatility Surface &mdash; The $57B Gamma Flip &amp; Why SKEW Fell While VIX Jumped 70%
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Explain how breaking <span className="font-mono tabular-nums">SPX 7,699–7,801</span> flipped dealers from <span className="font-mono tabular-nums">+$5.46B</span> to <span className="font-mono tabular-nums">−$54.09B intraday (−$51.72B close)</span> through the <span className="font-mono tabular-nums">7,400</span> Put Wall, and why <Term id="SKEW" /> dipped <span className="font-mono tabular-nums">150.9 → 149.4</span> because <span className="font-mono">σ_ATM³</span> in the denominator expanded faster than the wings as traders bought ATM puts and <span className="font-mono tabular-nums">800,000</span> VIX calls.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
                <div className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">
                  8:00 – 10:00
                </div>
                <div className="space-y-1">
                  <div className="font-serif font-medium text-slate-900 dark:text-slate-100">
                    Historical Analogs &amp; Next Week&apos;s Playbook (NFP, CPI, and Nvidia Earnings)
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Walk through the <span className="font-mono tabular-nums">72.2%</span> 5-day VIX mean-reversion rate across 79 spikes when credit holds vs <span className="font-mono">2020 / 2025-04-03</span> macro failures. Close with the 4-item checklist: (1) Friday NFP &amp; <span className="font-mono tabular-nums">SPY $725–$730 / SPX 7,266–7,300</span> defense, (2) Nov 10 CPI, (3) Nov 17 <span className="font-mono">NVDA</span> earnings (<span className="font-mono tabular-nums">±7.3%</span> straddle), and (4) Quarter-Kelly (<span className="font-mono tabular-nums">~4.15%</span>) / ATR-scaled <span className="font-mono">1x2</span> put ratio spreads on <span className="font-mono">SPX/RSP</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
