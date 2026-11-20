'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { InlineMath } from '@/components/articles/math';
import { LevelLadder } from '@/components/articles/article-visuals';
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Activity,
  Layers,
  Scale,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface TermTooltipProps {
  term: string;
  definition: string;
}

interface FormulaLine {
  label: string;
  expression: React.ReactNode;
  result?: string;
  tone?: 'neutral' | 'positive' | 'negative' | 'accent';
  highlight?: boolean;
}

interface FormulaPanelProps {
  title: string;
  formulas: FormulaLine[];
  workedExample: string[];
}

interface ComparisonColumn {
  title: string;
  subtitle?: string;
  tone: 'positive' | 'negative' | 'accent' | 'neutral';
  points: React.ReactNode[];
}

interface ComparisonCardProps {
  left: ComparisonColumn;
  right: ComparisonColumn;
}

type AssetCategory = 'all' | 'equities' | 'rates_fx' | 'commodities_crypto';
type CatalystCategory = 'all' | 'macro_fed' | 'earnings' | 'flows_policy';

interface BenchmarkRow {
  name: string;
  ticker?: string;
  category: Exclude<AssetCategory, 'all'>;
  close: string;
  change: string;
  direction: 'up' | 'down' | 'mixed';
  context: string;
}

interface CatalystRow {
  date: string;
  category: Exclude<CatalystCategory, 'all'>;
  categoryLabel: string;
  event: string;
  watchpoints: string;
  highlight?: boolean;
}

// -----------------------------------------------------------------------------
// Reusable Editorial & Interactive Primitives
// -----------------------------------------------------------------------------

/**
 * Accessible hover, focus, and tap tooltip for technical/jargon terms
 * explicitly defined or contextualized within the research report.
 */
function TermTooltip({ term, definition }: TermTooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || focused || pinned;
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setHovered(false);
        setFocused(false);
        setPinned(false);
      }
    }
    function handleOutsideClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setHovered(false);
        setFocused(false);
        setPinned(false);
      }
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);

  return (
    <span
      ref={wrapperRef}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        setPinned(false);
      }}
      onClick={() => setPinned((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setPinned((prev) => !prev);
        }
      }}
      className="relative inline-block cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-stone-900 dark:text-stone-100 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8672E] dark:focus-visible:ring-[#D08F52] rounded-sm"
    >
      {term}
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 bottom-full z-30 mb-2 w-64 sm:w-72 -translate-x-1/2 rounded-md border border-stone-700 dark:border-stone-600 bg-[#14171B] dark:bg-[#05070A] p-3 text-left text-xs font-normal leading-relaxed text-stone-100 dark:text-stone-200 shadow-lg pointer-events-none"
        >
          <span className="block font-mono text-[11px] uppercase tracking-wider text-[#D08F52] mb-1">
            {term}
          </span>
          {definition}
        </span>
      )}
    </span>
  );
}

/**
 * Restrained serif section heading without numbered prefixes.
 */
function SectionHeading({
  title,
  kicker,
}: {
  title: string;
  kicker?: string;
}) {
  return (
    <div className="border-t border-stone-200 dark:border-stone-800 pt-8 mb-6">
      {kicker && (
        <p className="font-mono text-xs uppercase tracking-widest text-[#A8672E] dark:text-[#D08F52] mb-2">
          {kicker}
        </p>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-stone-950 dark:text-stone-50">
        {title}
      </h2>
    </div>
  );
}

/**
 * Dark monospace panel for equations and worked calculations (always dark in light & dark modes).
 */
function FormulaPanel({ title, formulas, workedExample }: FormulaPanelProps) {
  const toneClass = (tone?: FormulaLine['tone']) => {
    switch (tone) {
      case 'positive':
        return 'text-[#3CBF9C]';
      case 'negative':
        return 'text-[#E2694A]';
      case 'accent':
        return 'text-[#D08F52]';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="my-6 rounded-lg border border-stone-800 bg-[#14171B] dark:bg-[#05070A] text-white overflow-hidden">
      <div className="border-b border-stone-800 px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-[#D08F52]">
          {title}
        </span>
        <span className="font-mono text-[11px] text-stone-400">
          Model &amp; Worked Figures
        </span>
      </div>

      <div className="p-4 sm:p-5 overflow-x-auto">
        {/* Desktop aligned table so every '=' sits on the exact same vertical axis */}
        <table className="hidden md:table w-full border-collapse">
          <tbody className="divide-y divide-stone-800/70">
            {formulas.map((item, idx) => (
              <tr key={idx} className={item.highlight ? 'bg-stone-900/50' : ''}>
                <td className="py-2.5 pr-4 font-mono text-xs text-stone-400 align-baseline whitespace-nowrap w-[195px]">
                  {item.label}
                </td>
                <td className="py-2.5 pr-3 font-mono tabular-nums text-xs sm:text-sm text-stone-200 align-baseline">
                  {item.expression}
                </td>
                <td className="py-2.5 px-2 font-mono text-sm text-[#D08F52] align-baseline text-center w-6">
                  {item.result ? '=' : ''}
                </td>
                <td
                  className={`py-2.5 pl-2 font-mono tabular-nums align-baseline font-semibold whitespace-nowrap ${
                    item.highlight ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                  } ${toneClass(item.tone)}`}
                >
                  {item.result ?? ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile stacked rows */}
        <div className="md:hidden space-y-3">
          {formulas.map((item, idx) => (
            <div
              key={idx}
              className={`space-y-1 border-b border-stone-800/70 pb-3 last:border-b-0 last:pb-0 ${
                item.highlight ? 'pt-1' : ''
              }`}
            >
              <span className="block font-mono text-xs text-stone-400">
                {item.label}
              </span>
              <div className="font-mono tabular-nums text-xs text-stone-200 flex flex-wrap items-baseline gap-2">
                <span>{item.expression}</span>
                {item.result && (
                  <span
                    className={`font-semibold ${
                      item.highlight ? 'text-sm' : ''
                    } ${toneClass(item.tone)}`}
                  >
                    = {item.result}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {workedExample.length > 0 && (
        <div className="border-t border-stone-800 bg-stone-950/60 px-4 sm:px-5 py-3.5">
          <p className="font-mono text-[11px] uppercase tracking-wider text-stone-400 mb-2">
            Worked Example from Report
          </p>
          <ul className="space-y-1.5 font-mono tabular-nums text-xs text-stone-300">
            {workedExample.map((line, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#D08F52] select-none">&rarr;</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Two-column dichotomy card for contrasting regimes, bull/bear cases, or supply/demand forces.
 */
function ComparisonCard({ left, right }: ComparisonCardProps) {
  const headerColor = (tone: ComparisonColumn['tone']) => {
    switch (tone) {
      case 'positive':
        return 'text-[#1D8A70] dark:text-[#3CBF9C]';
      case 'negative':
        return 'text-[#BC4128] dark:text-[#E2694A]';
      case 'accent':
        return 'text-[#A8672E] dark:text-[#D08F52]';
      default:
        return 'text-stone-900 dark:text-stone-100';
    }
  };

  const borderAccent = (tone: ComparisonColumn['tone']) => {
    switch (tone) {
      case 'positive':
        return 'border-t-[#1D8A70] dark:border-t-[#3CBF9C]';
      case 'negative':
        return 'border-t-[#BC4128] dark:border-t-[#E2694A]';
      case 'accent':
        return 'border-t-[#A8672E] dark:border-t-[#D08F52]';
      default:
        return 'border-t-stone-400 dark:border-t-stone-600';
    }
  };

  const renderCol = (col: ComparisonColumn) => (
    <div
      className={`rounded-lg border border-stone-200 dark:border-stone-800 border-t-2 ${borderAccent(
        col.tone
      )} bg-stone-50/70 dark:bg-stone-900/50 p-4 sm:p-5`}
    >
      <div className="mb-3">
        <h3 className={`font-serif text-lg font-normal flex items-center gap-2 ${headerColor(col.tone)}`}>
          <span className="w-2 h-2 rounded-full bg-current shrink-0" />
          {col.title}
        </h3>
        {col.subtitle && (
          <p className="font-mono text-xs text-stone-500 dark:text-stone-400 mt-0.5 pl-4">
            {col.subtitle}
          </p>
        )}
      </div>
      <ul className="space-y-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        {col.points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span
              className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${
                col.tone === 'positive'
                  ? 'bg-[#1D8A70] dark:bg-[#3CBF9C]'
                  : col.tone === 'negative'
                  ? 'bg-[#BC4128] dark:bg-[#E2694A]'
                  : 'bg-[#A8672E] dark:bg-[#D08F52]'
              }`}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderCol(left)}
      {renderCol(right)}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Static Data Directly Grounded in Report
// -----------------------------------------------------------------------------

const BENCHMARKS: BenchmarkRow[] = [
  {
    name: 'S&P 500',
    ticker: '^GSPC',
    category: 'equities',
    close: '7,175.83',
    change: '-147.80 (-2.02%)',
    direction: 'down',
    context: '6th straight loss; -8.5% vs. Oct high (7,844.67); -2.3% below 200-DMA (~7,347)',
  },
  {
    name: 'Nasdaq Composite',
    ticker: '^IXIC',
    category: 'equities',
    close: '23,879.20',
    change: '-550.69 (-2.25%)',
    direction: 'down',
    context: 'Deeper correction (-13.48% vs. Oct 6 ATH of 27,599.79); reversed early +1.5%–2% gain',
  },
  {
    name: 'Nasdaq 100',
    ticker: '^NDX',
    category: 'equities',
    close: '26,517.05',
    change: '-599.21 (-2.21%)',
    direction: 'down',
    context: 'QQQ fell -2.19% at close after gaining +2.06% at 10:04 a.m. ET',
  },
  {
    name: 'Dow Jones Industrial Avg',
    ticker: '^DJI',
    category: 'equities',
    close: '49,097.06',
    change: '-1,101.11 (-2.19%)',
    direction: 'down',
    context: 'Closed below 50,000; worst single-day drop of the six-day slide',
  },
  {
    name: 'Russell 2000',
    ticker: '^RUT',
    category: 'equities',
    close: '2,655.11',
    change: '-59.20 (-2.18%)',
    direction: 'down',
    context: 'Matches IWM (~-2.2%); confirms broad cyclical risk reduction',
  },
  {
    name: 'VanEck Semiconductor ETF',
    ticker: 'SMH',
    category: 'equities',
    close: '~$447.50 (implied)',
    change: '-2.62%',
    direction: 'down',
    context: 'Implied from $459.54 prior close; ~-6.8% off $479.96 high; -33.4% vs. June peak ($671.83)',
  },
  {
    name: 'Cboe Volatility Index',
    ticker: 'VIX',
    category: 'equities',
    close: '28.44',
    change: '+3.88 (+15.80%)',
    direction: 'down',
    context: 'Approaching March 27, 2026 peak (31.05); well above 1-year avg (18.13)',
  },
  {
    name: 'U.S. 10-Year Treasury Yield',
    category: 'rates_fx',
    close: '5.051%',
    change: '-1.4 bps',
    direction: 'mixed',
    context: '3 p.m. ET Tradeweb close (4th straight drop); late quotes 5.04%–5.09%; pinned above 5.0%',
  },
  {
    name: 'U.S. 2-Year / 30-Year Yields',
    category: 'rates_fx',
    close: '4.81% / 5.41%',
    change: '+1 bp / flat',
    direction: 'mixed',
    context: 'Late quotes near 4.83% / 5.43%; 10s2s curve flattened to ~24–27 bps (vs. 84 bps avg)',
  },
  {
    name: 'U.S. Dollar Index',
    ticker: 'DXY',
    category: 'rates_fx',
    close: '103.93',
    change: '+0.07%',
    direction: 'down',
    context: 'Near 19-month highs (USD/JPY 159.68); adds global liquidity pressure',
  },
  {
    name: 'Gold (Dec Futures) / Silver',
    category: 'commodities_crypto',
    close: '$3,627.90 / $42.84',
    change: '-3.05% / -4.94%',
    direction: 'down',
    context: 'Gold at 14-month low (-33% vs. Jan 2026 peak) on rate bets and fund selling',
  },
  {
    name: 'WTI (CLF27) / Brent Crude',
    category: 'commodities_crypto',
    close: '$83.16 / ~$92.88',
    change: '+1.03% / +1.0%',
    direction: 'mixed',
    context: 'Dec WTI (CLZ26) -0.06%; Brent elevated vs. pre-Iran war ~$72/bbl',
  },
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    category: 'commodities_crypto',
    close: '~$62,174',
    change: '-0.50%',
    direction: 'down',
    context: '~51% below Oct 2025 ATH ($126,080); $1.91B 7-day ETF outflows Nov 5–13',
  },
];

const NVDA_METRICS = [
  {
    metric: 'Total Revenue',
    actual: '$115.844B',
    benchmark: '$109.1B cons. / $108.0B guide',
    delta: '+103.2% YoY / +20.4% QoQ',
    tone: 'positive' as const,
    note: 'Largest quarterly scale expansion on record',
  },
  {
    metric: 'Data Center Revenue',
    actual: '$107.6B (92.9% share)',
    benchmark: '$101.9B cons.',
    delta: '+110% YoY / +21% QoQ',
    tone: 'positive' as const,
    note: 'Hyperscale $60.1B (+71% YoY); ACIE $47.5B (+195% YoY)',
  },
  {
    metric: 'Edge Computing Revenue',
    actual: '$8.2B (7.1% share)',
    benchmark: '—',
    delta: '+42% YoY / +14% QoQ',
    tone: 'positive' as const,
    note: 'Driven by RTX Spark laptops & DGX Spark 64GB',
  },
  {
    metric: 'Gross Margin (GAAP / Non-GAAP)',
    actual: '74.8% / 74.9%',
    benchmark: '74.0% ± 50 bps guide',
    delta: '+140 bps YoY / -10 bps QoQ',
    tone: 'positive' as const,
    note: 'Beat on product mix; Q4 guided sharply lower',
  },
  {
    metric: 'Operating Income / FCF',
    actual: '$77.5B (GAAP) / $43.8B FCF',
    benchmark: '—',
    delta: '+115% YoY / +98% YoY FCF',
    tone: 'positive' as const,
    note: '$48.25B OCF; $28.1B returned; $227.3B buyback remaining',
  },
  {
    metric: 'Non-GAAP Diluted EPS',
    actual: '$2.68 ($2.70 GAAP)',
    benchmark: '$2.47–$2.48 cons.',
    delta: '+111% YoY / +21% QoQ',
    tone: 'positive' as const,
    note: 'Strong operating leverage despite $8.8B non-GAAP OpEx',
  },
  {
    metric: 'Q4 FY2027 Revenue Guidance',
    actual: '$130.0B ± 3% (14 wks)',
    benchmark: '$125.1B–$125.3B cons.',
    delta: '+12.2% QoQ (+4.2% 13-wk eq.)',
    tone: 'negative' as const,
    note: 'Assumes $0 China data center compute ($2.4B in Q3)',
  },
  {
    metric: 'Q4 FY2027 Gross Margin Guide',
    actual: '71.0%–72.0%',
    benchmark: '~71%–72% prior trough guide',
    delta: '-340 bps QoQ (midpoint)',
    tone: 'negative' as const,
    note: '~$4.42B quarterly gross profit drag at $130B sales',
  },
  {
    metric: 'Working Capital (Inv. / A/R)',
    actual: '$39.7B Inv. / $81.0B A/R',
    benchmark: '$31.6B prior-Q Inv.',
    delta: '64 Days Sales Outstanding',
    tone: 'negative' as const,
    note: 'Cash conversion & receivable collection key watchpoint',
  },
  {
    metric: 'Supply & Total Commitments',
    actual: '$390B supply / $518B total',
    benchmark: '$279B prior-Q supply',
    delta: '+$111B supply jump in 1 Qtr',
    tone: 'negative' as const,
    note: 'Includes $74B leases, $28B cloud, $20B equity, $6B capex',
  },
];

const CATALYSTS: CatalystRow[] = [
  {
    date: 'Fri, Nov 20',
    category: 'flows_policy',
    categoryLabel: 'Flows & Macro',
    event: 'Monthly OpEx; ANT IPO Settlement & $26B Private Placement; UMich Sentiment (10 a.m. ET); Waller & Cook speak; Amodei & Dimon live event',
    watchpoints: 'Clears negative dealer gamma in semis; gauges inflation expectations and whether Waller repeats his 50-bp hike warning',
  },
  {
    date: 'Mon, Nov 23',
    category: 'flows_policy',
    categoryLabel: 'Flows & Macro',
    event: 'Post-OpEx Regime Open; MSCI ANT Fast-Entry Notice; ANT Options Launch (est.); Flash PMIs (Nov 23–24)',
    watchpoints: 'Tests whether SMH stabilizes near $447–$460 and whether ANT draws front-running ahead of Nov 30/Dec 1 MSCI add',
  },
  {
    date: 'Tue, Nov 24',
    category: 'earnings',
    categoryLabel: 'Earnings',
    event: 'Dell (DELL) Q3 FY27 Earnings (HPE, Analog Devices, Workday, Zscaler during week)',
    watchpoints: 'Schwab cons. $49.2B rev (+82.2% YoY), $6.55 EPS (+153.1%); read-through on enterprise AI server margins & backlog',
  },
  {
    date: 'Wed, Nov 25',
    category: 'macro_fed',
    categoryLabel: 'Macro / Fed',
    event: 'U.S. Q3 GDP (2nd Est.) & Oct PCE / Core PCE Inflation (8:30 a.m. ET); Weekly Jobless Claims',
    watchpoints: 'Fed preferred inflation gauge before Dec FOMC (Sept PCE est. 3.6%, Core 3.1%); upside surprise raises 50-bp odds sharply',
    highlight: true,
  },
  {
    date: 'Nov 30–Dec 1',
    category: 'flows_policy',
    categoryLabel: 'Flows & Policy',
    event: 'MSCI ANT Inclusion (Nov 30/Dec 1); Jensen Huang Congressional Testimony (Dec 1); Oct JOLTS; Marvell (MRVL) & CrowdStrike (CRWD)',
    watchpoints: 'First major passive inflow wave into ANT; Huang hearing carries direct headline risk on export curbs and SEC/DOJ scrutiny',
    highlight: true,
  },
  {
    date: 'Wed, Dec 2',
    category: 'earnings',
    categoryLabel: 'Earnings & Policy',
    event: 'Nvidia GC Tim Teter Congressional Testimony; Salesforce (CRM) confirmed AMC (Snowflake in week)',
    watchpoints: 'CRM Schwab cons. $11.5B rev (+11.7% YoY), $3.44 EPS; tests whether enterprise SaaS agents monetize or lose budget to frontier labs',
  },
  {
    date: 'Fri, Dec 4',
    category: 'macro_fed',
    categoryLabel: 'Macro / Fed',
    event: 'November Nonfarm Payrolls (8:30 a.m. ET)',
    watchpoints: 'Final labor print before FOMC (Oct surprised hot at +165K jobs vs. +65K est., 4.1% unemployment)',
  },
  {
    date: 'Wed, Dec 9',
    category: 'macro_fed',
    categoryLabel: 'Peak Volatility',
    event: 'FOMC Rate Decision & Projections (2:00 p.m. ET); Broadcom (AVGO) confirmed AMC; Oracle (ORCL) & Adobe (est. AMC)',
    watchpoints: '25 bps to 4.00%–4.25% base case vs. 50-bp shock + 2027 dot plot; AVGO ($34.8B guide / $21.7B AI rev) & ORCL (CDS proxy) test AI capex',
    highlight: true,
  },
  {
    date: 'Thu, Dec 10',
    category: 'macro_fed',
    categoryLabel: 'Macro & Flows',
    event: 'November CPI (8:30 a.m. ET); TSMC Nov Sales; ANT Trading Day 15 (Nasdaq-100 Window); ERCOT Data-Center Audit',
    watchpoints: 'Unusual post-FOMC CPI tests Fed credibility immediately; TSMC sales validate wafer demand; ERCOT spotlights grid limits',
  },
  {
    date: 'Dec 11 / 14',
    category: 'flows_policy',
    categoryLabel: 'ANT Flows',
    event: 'FTSE Russell U.S. Indexes ANT Inclusion (close Dec 11 / open Dec 14)',
    watchpoints: 'Second major forced-buying stair-step for ANT shares',
  },
  {
    date: 'Dec 15–16',
    category: 'earnings',
    categoryLabel: 'Earnings & Unlocks',
    event: 'Nov PPI & ANT Day-27 Early Investor Unlock #1 (Dec 15); Nov Retail Sales & Micron (MU) Earnings (est. Dec 16)',
    watchpoints: 'First post-debut investor unlock tests ANT float absorption; MU Schwab cons. $61.9B rev (+354% YoY), $38.22 EPS tests HBM pricing power',
  },
  {
    date: 'Fri, Dec 18',
    category: 'flows_policy',
    categoryLabel: 'Flows & OpEx',
    event: 'Quarterly Triple Witching OpEx; ANT 30-Day Greenshoe Deadline; FTSE GEIS ANT Inclusion (eff. Dec 21)',
    watchpoints: 'Greenshoe exercise (147M shares) signals whether institutional demand held firmly above $83',
  },
  {
    date: 'Q1 2027 Watch',
    category: 'flows_policy',
    categoryLabel: '2027 Horizon',
    event: 'Jan 10: U.S.-China trade truce expires; Jan 26–27: FOMC; Feb 24 (est.): NVDA Q4; Late Feb/Mar: ANT FY26 + 35% employee unlock',
    watchpoints: 'Second-wave tests: China trade renewal, Nvidia Vera Rubin margin trough verification, and ANT first public earnings release',
  },
];

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export default function Nov19DrawdownArticle() {
  const [assetFilter, setAssetFilter] = useState<AssetCategory>('all');
  const [catalystFilter, setCatalystFilter] = useState<CatalystCategory>('all');

  const filteredBenchmarks =
    assetFilter === 'all'
      ? BENCHMARKS
      : BENCHMARKS.filter((row) => row.category === assetFilter);

  const filteredCatalysts =
    catalystFilter === 'all'
      ? CATALYSTS
      : CATALYSTS.filter((row) => row.category === catalystFilter);

  return (
    <ArticleFrame
      slug="wall-street-nov-19-drawdown-anthropic-ipo-nvidia"
      additionalDisclaimer="Market closes, IPO lock-up schedules, consensus estimates, and systematic CTA positioning thresholds reflect observations as of Thursday, November 19, 2026 and are subject to revision."
    >
      <div className="max-w-5xl mx-auto text-stone-900 dark:text-stone-100 antialiased">
        {/* Session Kicker Bar */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest text-[#A8672E] dark:text-[#D08F52] mb-6">
          <span>Market Research Brief</span>
          <span className="text-stone-400 dark:text-stone-600">&bull;</span>
          <span className="tabular-nums">Thursday, November 19, 2026</span>
        </div>

        {/* Compact Stat Row (4 Standout Figures) */}
        <section
          aria-label="Headline figures"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-8"
        >
          <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-4 min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
              S&amp;P 500 Close
            </p>
            <p className="font-mono tabular-nums text-xl xl:text-2xl font-semibold text-stone-950 dark:text-stone-50 mt-1">
              7,175.83
            </p>
            <p className="font-mono tabular-nums text-xs text-[#BC4128] dark:text-[#E2694A] mt-1 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              -2.02% &middot; 6th straight loss
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              0.60% above 7,133 CTA floor
            </p>
          </div>

          <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-4 min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Anthropic IPO (ANT)
            </p>
            <p className="font-mono tabular-nums text-xl xl:text-2xl font-semibold text-stone-950 dark:text-stone-50 mt-1">
              $97.17
            </p>
            <p className="font-mono tabular-nums text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              +17.07% vs. $83 IPO
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              -15.50% off $114.99 intraday peak
            </p>
          </div>

          <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-4 min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Nvidia Q3 Rev / Close
            </p>
            <p className="font-mono tabular-nums text-xl xl:text-2xl font-semibold text-stone-950 dark:text-stone-50 mt-1">
              $115.84B
            </p>
            <p className="font-mono tabular-nums text-xs text-[#BC4128] dark:text-[#E2694A] mt-1 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              NVDA -3.30% ($145.98)
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              +103.2% YoY rev; stock -38.98% off ATH
            </p>
          </div>

          <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-4 min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
              VIX / 10Y Treasury
            </p>
            <p className="font-mono tabular-nums text-xl xl:text-2xl font-semibold text-stone-950 dark:text-stone-50 mt-1">
              28.44
            </p>
            <p className="font-mono tabular-nums text-xs text-[#BC4128] dark:text-[#E2694A] mt-1 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 shrink-0" />
              +15.80% &middot; 10Y at 5.051%
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              &gt;90% of S&amp;P 500 declined
            </p>
          </div>
        </section>

        {/* Key Takeaways Card */}
        <section className="rounded-lg border border-stone-200 dark:border-stone-800 border-l-4 border-l-[#A8672E] dark:border-l-[#D08F52] bg-stone-50/80 dark:bg-stone-900/50 p-5 sm:p-6 mb-10">
          <h2 className="font-serif text-xl font-normal text-stone-950 dark:text-stone-50 mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2.5 text-sm sm:text-[15px] leading-relaxed text-stone-700 dark:text-stone-300">
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] shrink-0" />
              <span>
                <strong className="font-semibold text-stone-950 dark:text-stone-50">Synchronized cross-asset de-risking:</strong>{' '}
                The S&amp;P 500 extended its slide to six straight sessions (longest since April 2024), the Dow broke below <span className="font-mono tabular-nums">50,000</span> (<span className="font-mono tabular-nums">-1,101.11</span>), the Nasdaq sank <span className="font-mono tabular-nums">13.48%</span> below its October 6 peak, gold hit a 14-month low, Bitcoin slid toward <span className="font-mono tabular-nums">$62,000</span>, and 10-year yields stayed above <span className="font-mono tabular-nums">5.0%</span>.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] shrink-0" />
              <span>
                <strong className="font-semibold text-stone-950 dark:text-stone-50">Stagflation meets a record capital call:</strong>{' '}
                A plunging Philadelphia Fed index (<span className="font-mono tabular-nums">6.3</span>) paired with a <span className="font-mono tabular-nums">15</span>-point spike in prices paid reinforced hawkish FOMC minutes and Governor Waller&rsquo;s <span className="font-mono tabular-nums">50-bp</span> December hike warning&mdash;just as Anthropic&rsquo;s <span className="font-mono tabular-nums">$107.34B</span> combined IPO and private placement drew <span className="font-mono tabular-nums">$450B&ndash;$500B</span> in indicated demand out of existing AI equities and crypto.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] shrink-0" />
              <span>
                <strong className="font-semibold text-stone-950 dark:text-stone-50">Anthropic&rsquo;s debut marked the session&rsquo;s turning point:</strong>{' '}
                After opening at <span className="font-mono tabular-nums">11:48 a.m. ET</span> at <span className="font-mono tabular-nums">$111.50</span> (<span className="font-mono tabular-nums">+34.34%</span>, briefly piercing a <span className="font-mono tabular-nums">$2T</span> fully diluted valuation), <span className="font-mono">ANT</span> reversed <span className="font-mono tabular-nums">15.50%</span> off its intraday high to close at <span className="font-mono tabular-nums">$97.17</span> (<span className="font-mono tabular-nums">+17.07%</span>), coinciding almost to the minute with broader index breakdowns.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] shrink-0" />
              <span>
                <strong className="font-semibold text-stone-950 dark:text-stone-50">Nvidia&rsquo;s earnings paradox:</strong>{' '}
                Triple-digit growth (<span className="font-mono tabular-nums">$115.84B</span> Q3 revenue, raised <span className="font-mono tabular-nums">75%</span> FY28 growth target) failed to arrest a six-day drop to <span className="font-mono tabular-nums">$145.98</span> due to a 14-week Q4 calendar boost, a <span className="font-mono tabular-nums">340-bp</span> margin squeeze, founder Jensen Huang&rsquo;s resignation plus a reported SEC civil probe, zeroed-out China guidance, and emerging CUDA moat cracks.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] shrink-0" />
              <span>
                <strong className="font-semibold text-stone-950 dark:text-stone-50">Razor-thin technical margin entering a four-week gauntlet:</strong>{' '}
                The S&amp;P 500 sits just <span className="font-mono tabular-nums">42.83</span> points (<span className="font-mono tabular-nums">0.60%</span>) above Goldman Sachs&rsquo;s <span className="font-mono tabular-nums">7,133</span>{' '}
                <TermTooltip
                  term="CTA long-term floor"
                  definition="Systematic Commodity Trading Advisor trend-following threshold (estimated by Goldman Sachs at 7,133 on the S&P 500) below which mechanical selling accelerates."
                />{' '}
                ahead of Nov 20 OpEx, Oct PCE (Nov 25), Huang&rsquo;s Congressional testimony (Dec 1), Dec 8&ndash;9 FOMC, Broadcom earnings (Dec 9), and competing <span className="font-mono">ANT</span> index inflows and lock-up unlocks.
              </span>
            </li>
          </ul>
        </section>

        {/* ===================================================================
            SECTION: ANATOMY OF THE NOVEMBER 19 DRAWDOWN
           =================================================================== */}
        <section className="mb-12">
          <SectionHeading
            kicker="Session Breakdown"
            title="Anatomy of the November 19 Drawdown"
          />

          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-4">
            Pre-market Nasdaq 100 futures jumped more than <span className="font-mono tabular-nums">2%</span> (S&amp;P 500 futures <span className="font-mono tabular-nums">+1.15%</span>) on Anthropic&rsquo;s above-range <span className="font-mono tabular-nums">$83</span> pricing and Walmart&rsquo;s earnings beat, pushing <span className="font-mono">QQQ</span> up <span className="font-mono tabular-nums">2.06%</span> at <span className="font-mono tabular-nums">10:04 a.m. ET</span> and <span className="font-mono">SMH</span> up <span className="font-mono tabular-nums">4.44%</span> to <span className="font-mono tabular-nums">$479.96</span>. That bid vanished around Anthropic&rsquo;s <span className="font-mono tabular-nums">11:48 a.m. ET</span> opening trade, and selling accelerated into the close after the S&amp;P 500 failed to reclaim its 200-day moving average (<span className="font-mono tabular-nums">~7,347</span>) and broke support near <span className="font-mono tabular-nums">7,300</span>.
          </p>

          {/* Dichotomy: October Rotation vs. November 19 Liquidation */}
          <ComparisonCard
            left={{
              title: 'October Regime: Internal Rotation',
              subtitle: 'Equity cushion intact',
              tone: 'positive',
              points: [
                <>
                  Investors rotated <em>within</em> equities rather than exiting risk altogether.
                </>,
                <>
                  The S&amp;P 500 Equal Weight Index outperformed the cap-weighted benchmark by{' '}
                  <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+5.85 percentage points</span>&mdash;its strongest relative month since April 2009.
                </>,
                <>
                  The S&amp;P 500 defended its <span className="font-mono tabular-nums">7,250&ndash;7,350</span> support zone five separate times since June.
                </>,
              ],
            }}
            right={{
              title: 'November 19 Regime: Indiscriminate De-Grossing',
              subtitle: 'Internal cushion broken',
              tone: 'negative',
              points: [
                <>
                  Equal-weight <span className="font-mono">RSP</span> (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-1.74%</span>), cap-weighted <span className="font-mono">SPY</span> (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-1.98%</span>), and small-cap Russell 2000 (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-2.18%</span>) fell in lockstep on <span className="font-mono tabular-nums">1.8x</span> 20-day average IEX volume.
                </>,
                <>
                  Even earnings beats met selling: Walmart slipped <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-1.04%</span> despite topping Q3 revenue (<span className="font-mono tabular-nums">$188.84B</span>, <span className="font-mono tabular-nums">+5.2%</span> YoY), beating adjusted EPS (<span className="font-mono tabular-nums">$0.65</span> vs. <span className="font-mono tabular-nums">$0.64</span>), and raising FY sales growth guidance to <span className="font-mono tabular-nums">4.9%&ndash;5.2%</span>.
                </>,
                <>
                  Single-name pressure spread broadly: Williams-Sonoma <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-15.16%</span> (soft revenue guide) and UnitedHealth <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">~-4.5% to -5%</span> (<span className="font-mono tabular-nums">~-18%</span> over five sessions after the Nov 16 CMS/HHS CRUSH Medicare Advantage audit proposal); isolated winners were event-driven (<span className="font-mono">PANW</span> <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+6.42%</span> on earnings/$4.5B deal; <span className="font-mono">INSM</span> <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+20.58%</span> on Sanofi takeover reports).
                </>,
              ],
            }}
          />

          {/* Cross-Asset Benchmarks Table with Interactive Filter */}
          <div className="my-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <h3 className="font-serif text-xl font-normal text-stone-950 dark:text-stone-50">
                Cross-Asset Closing Tape
              </h3>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter asset classes">
                {(
                  [
                    { id: 'all', label: 'All Assets' },
                    { id: 'equities', label: 'Equities & Vol' },
                    { id: 'rates_fx', label: 'Rates & FX' },
                    { id: 'commodities_crypto', label: 'Commodities & Crypto' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAssetFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors ${
                      assetFilter === tab.id
                        ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-stone-950 font-medium'
                        : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    <th className="py-3 px-4 whitespace-nowrap">Benchmark / Asset</th>
                    <th className="py-3 px-4 whitespace-nowrap">Nov 19 Close</th>
                    <th className="py-3 px-4 whitespace-nowrap">1-Day Change</th>
                    <th className="py-3 px-4">Context / Drawdown Benchmark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-950">
                  {filteredBenchmarks.map((row) => (
                    <tr
                      key={row.name}
                      className="hover:bg-stone-50/70 dark:hover:bg-stone-900/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-stone-950 dark:text-stone-100 whitespace-nowrap">
                        {row.name}
                        {row.ticker && (
                          <span className="ml-1.5 font-mono text-xs text-stone-400 dark:text-stone-500">
                            {row.ticker}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono tabular-nums text-stone-900 dark:text-stone-100 whitespace-nowrap">
                        {row.close}
                      </td>
                      <td
                        className={`py-3 px-4 font-mono tabular-nums whitespace-nowrap font-medium ${
                          row.direction === 'down'
                            ? 'text-[#BC4128] dark:text-[#E2694A]'
                            : row.direction === 'up'
                            ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                            : 'text-[#A8672E] dark:text-[#D08F52]'
                        }`}
                      >
                        {row.change}
                      </td>
                      <td className="py-3 px-4 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                        {row.context}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Closing sector tallies reflect full-session SPDR ETF prints. The PHLX Semiconductor Index (<span className="font-mono">SOX</span>) also closed lower on Thursday, having already fallen <span className="font-mono tabular-nums">34.2%</span> over roughly five months per Ameriprise, though no official Nov 19 closing print was available in closing wire tallies.
            </p>
          </div>

          {/* Five Converging Catalysts */}
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-950 dark:text-stone-50 mt-8 mb-4">
            Five Converging Catalysts Behind the Reversal
          </h3>

          <div className="space-y-4">
            <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-4 sm:p-5">
              <h4 className="font-serif text-lg font-normal text-stone-950 dark:text-stone-50 mb-2">
                Stagflationary Data Colliding with a Hawkish Federal Reserve
              </h4>
              <ul className="space-y-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                <li>
                  &bull; <strong className="text-stone-900 dark:text-stone-100">Philly Fed shock:</strong> Slumped <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">14.6</span> pts from <span className="font-mono tabular-nums">20.9</span> to <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">6.3</span> (6-month low, missing <span className="font-mono tabular-nums">20.0&ndash;23.2</span> consensus); new orders fell to <span className="font-mono tabular-nums">-0.4</span> and 6-month capex dropped <span className="font-mono tabular-nums">16</span> pts to <span className="font-mono tabular-nums">18.9</span>, while <strong className="text-[#BC4128] dark:text-[#E2694A]">prices paid surged 15.0 pts to 58.2</strong> (highest since April) and prices received hit <span className="font-mono tabular-nums">47.0</span> (highest since June 2022).
                </li>
                <li>
                  &bull; <strong className="text-stone-900 dark:text-stone-100">Labor &amp; housing drag:</strong> Initial jobless claims rose to <span className="font-mono tabular-nums">203,000</span> (vs. <span className="font-mono tabular-nums">197K&ndash;198K</span> est.), continuing claims jumped <span className="font-mono tabular-nums">70,000</span> to <span className="font-mono tabular-nums">1.763M</span>, and October pending home sales fell nearly <span className="font-mono tabular-nums">5%</span> to a record low (<span className="font-mono tabular-nums">-17%</span> YoY) under <span className="font-mono tabular-nums">7%+</span> mortgage rates.
                </li>
                <li>
                  &bull; <strong className="text-stone-900 dark:text-stone-100">Hawkish Fed repricing:</strong> Oct 27&ndash;28 FOMC minutes showed &ldquo;almost all&rdquo; saw further hikes appropriate after September&rsquo;s <span className="font-mono tabular-nums">25-bp</span> hike to <span className="font-mono tabular-nums">3.75%&ndash;4.00%</span> (first since July 2023), with Cook and Hammack dissenting for an immediate October hike and two open to <span className="font-mono tabular-nums">&gt;25 bps</span>. Governor Waller warned the Fed &ldquo;might need to, like, shock people&rdquo; with a <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">50-bp</span> December hike if Chair Kevin Warsh opposes January forward guidance.
                </li>
                <li>
                  &bull; <strong className="text-stone-900 dark:text-stone-100">AI inflation link &amp; rate path:</strong> Vice Chair Philip Jefferson noted in Bras&iacute;lia that &ldquo;currently, the AI buildout is exerting upward pressure on demand and inflation.&rdquo; JPMorgan (Michael Feroli) now forecasts three straight <span className="font-mono tabular-nums">25-bp</span> hikes (Dec 2026, Jan 2027, Mar 2027) to <span className="font-mono tabular-nums">4.50%&ndash;4.75%</span>; IMF&rsquo;s Kristalina Georgieva warned AI hardware (<span className="font-mono tabular-nums">&gt;10%</span> of world goods trade) and oil shocks could push global inflation to <span className="font-mono tabular-nums">4.7%</span>. CME FedWatch prices <span className="font-mono tabular-nums">95%&ndash;100%</span> odds of a December hike (<span className="font-mono tabular-nums">5%&ndash;10%</span> tail risk of <span className="font-mono tabular-nums">50 bps</span>).
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-4 sm:p-5">
                <h4 className="font-serif text-lg font-normal text-stone-950 dark:text-stone-50 mb-2">
                  Anthropic IPO Liquidity Drain &amp; Unwind
                </h4>
                <ul className="space-y-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  <li>
                    &bull; Acted mechanically as a <span className="font-mono tabular-nums">$107.3B</span> capital call pulling institutional and retail cash out of tech and crypto ahead of pricing.
                  </li>
                  <li>
                    &bull; Triggered swift profit-taking once trading began at <span className="font-mono tabular-nums">11:48 a.m. ET</span>; Interactive Brokers noted &ldquo;the dam seemed to break once the big event was behind us.&rdquo;
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-4 sm:p-5">
                <h4 className="font-serif text-lg font-normal text-stone-950 dark:text-stone-50 mb-2">
                  Semiconductor Export Contagion &amp; Geopolitics
                </h4>
                <ul className="space-y-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  <li>
                    &bull; Hunterbrook Capital disclosed an <span className="font-mono">AMD</span> short alleging blacklisted Chinese server maker IEIT Systems used at least six newer AMD firmware updates post-March 2025 Entity List designation (citing <span className="font-mono tabular-nums">&gt;20%</span> China/HK billed revenue). Despite AMD&rsquo;s denial, shares sank <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-7.72%</span> on <span className="font-mono tabular-nums">2.2x</span> volume (<span className="font-mono tabular-nums">~$73B</span> erased).
                  </li>
                  <li>
                    &bull; Followed Commerce&rsquo;s Nov 16 interim rule licensing AI chips bound for data centers in Brazil, Indonesia, Malaysia, Singapore, and Thailand; the Shenzhen APEC trilateral (Trump, Xi, Putin) yielded <strong className="text-stone-900 dark:text-stone-100">no chip or trade resolution</strong> ahead of the Jan 10, 2027 tariff-truce deadline.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-4 sm:p-5">
                <h4 className="font-serif text-lg font-normal text-stone-950 dark:text-stone-50 mb-2">
                  Political Scrutiny &amp; AI Credit Stress
                </h4>
                <ul className="space-y-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  <li>
                    &bull; Following Democrats&rsquo; November midterm sweep, Sen. Adam Schiff warned in the <em>WSJ</em> that AI infrastructure (<span className="font-mono tabular-nums">3.6%</span> of U.S. GDP) is &ldquo;the biggest economic gamble in American history&rdquo; and urged ruling out taxpayer bailouts.
                  </li>
                  <li>
                    &bull; Broad ICE BofA High Yield OAS remains contained at <span className="font-mono tabular-nums">3.43%</span> (Nov 17, up from <span className="font-mono tabular-nums">3.20%</span> Nov 12), but the Fed&rsquo;s Nov 13 Financial Stability Report flagged AI debt surging <span className="font-mono tabular-nums">5x</span> since 2023 to <span className="font-mono tabular-nums">$680B</span> (<span className="font-mono tabular-nums">31%</span> of nonfinancial IG issuance), with <span className="font-mono tabular-nums">87%</span> of 23 NY Fed-surveyed firms citing AI as a top stability risk.
                  </li>
                  <li>
                    &bull; ECB projects <span className="font-mono tabular-nums">$5.5T</span> cumulative U.S. Big Tech capex by 2030 and <span className="font-mono tabular-nums">&gt;$4T</span> off-balance-sheet commitments (Q2 2026). Single-name CDS show acute strain: Oracle 5Y CDS hit a record <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">288 bps</span> (<span className="font-mono tabular-nums">$47.6B</span> volume, Barclays) and CoreWeave CDS implies <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">&gt;60%</span> 5-year default probability (CoreWeave <span className="font-mono tabular-nums">-6.10%</span>, Nebius <span className="font-mono tabular-nums">-7.8%</span>).
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-4 sm:p-5">
                <h4 className="font-serif text-lg font-normal text-stone-950 dark:text-stone-50 mb-2">
                  Technical Failure &amp; Negative Dealer Gamma
                </h4>
                <ul className="space-y-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  <li>
                    &bull; Tuesday&rsquo;s first close below the 200-DMA (<span className="font-mono tabular-nums">~7,347</span>) since April 7&mdash;followed by Thursday&rsquo;s failed morning reclaim and break beneath <span className="font-mono tabular-nums">7,300</span>&mdash;triggered systematic supply.
                  </li>
                  <li>
                    &bull; SpotGamma documented deeply{' '}
                    <TermTooltip
                      term="negative dealer gamma"
                      definition="An options positioning regime where dealer hedging amplifies directional market moves instead of dampening volatility."
                    />{' '}
                    across <span className="font-mono">SMH</span> and <span className="font-mono">DRAM</span> ETFs entering Friday&rsquo;s monthly OpEx.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InfographicSlot alt="Wall Street November 19, 2026 Drawdown: Anthropic IPO, Nvidia Earnings Paradox, and Cross-Asset Catalysts Infographic" />

        {/* ===================================================================
            SECTION: ANTHROPIC'S RECORD IPO
           =================================================================== */}
        <section className="mb-12">
          <SectionHeading
            kicker="Primary Capital & Debut"
            title="Anthropic's Record IPO: Liquidity Drain, Valuation Reality, and Pipeline Shockwaves"
          />

          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-4">
            Anthropic priced at <span className="font-mono tabular-nums">$83.00</span> (<span className="font-mono tabular-nums">+6.4%</span> above its <span className="font-mono tabular-nums">$70&ndash;$78</span> range) and upsized from <span className="font-mono tabular-nums">825M</span> to <span className="font-mono tabular-nums">980M</span> Class A shares (<span className="font-mono tabular-nums">956.35M</span> primary for <span className="font-mono tabular-nums">$79.38B</span>; <span className="font-mono tabular-nums">23.65M</span> secondary by seven co-founders for <span className="font-mono tabular-nums">$1.96B</span>), surpassing SpaceX&rsquo;s <span className="font-mono tabular-nums">$75B</span> June raise. Seven infrastructure partners&mdash;Google (<span className="font-mono tabular-nums">$10B</span>), Nvidia (<span className="font-mono tabular-nums">$10B</span>), AMD (<span className="font-mono tabular-nums">$2.5B</span>), Broadcom (<span className="font-mono tabular-nums">$1B</span>), Micron (<span className="font-mono tabular-nums">$1B</span>), Microsoft (<span className="font-mono tabular-nums">$1B</span>), and TSMC Partners (<span className="font-mono tabular-nums">$500M</span>)&mdash;added a <span className="font-mono tabular-nums">$26B</span> non-voting Class N private placement.
          </p>

          {/* Formula Panel: Anthropic Capital & Valuation Multiples */}
          <FormulaPanel
            title="Anthropic Deal Sizing & Public Valuation Multiples"
            formulas={[
              {
                label: 'Gross Capital Absorbed',
                expression: '$81.34B (Base IPO) + $26.00B (Private Class N)',
                result: '$107.34B ($119.54B w/ $12.20B shoe)',
                tone: 'accent',
              },
              {
                label: 'FDV @ Close ($97.17)',
                expression: <InlineMath math="\$1.50\text{T} \times \frac{\$97.17}{\$83.00}" />,
                result: '~$1.76T FDV (~$1.27T basic on 13.09B sh)',
                tone: 'neutral',
              },
              {
                label: 'Q3 Annualized Multiple',
                expression: <InlineMath math="\frac{\sim\$1.76\text{T FDV}}{\$16.96\text{B Q3 Rev} \times 4}" />,
                result: '25.9x ($67.84B annualized)',
                tone: 'accent',
              },
              {
                label: 'Oct 31 Run-Rate Multiple',
                expression: <InlineMath math="\frac{\sim\$1.76\text{T FDV}}{\$81.0\text{B (28-day} \times 13\text{)}}" />,
                result: '21.7x',
                tone: 'positive',
                highlight: true,
              },
            ]}
            workedExample={[
              'Pre-IPO reset: Bankers floated $2.0T in early Oct -> Nov 5 Nasdaq crash & midterms compressed bids to $1.1T-$1.5T -> $83 pricing set $1.50T FDV (~$1.09T basic).',
              'Day-1 arc: Opened $111.50 (+34.34%, ~$2.02T FDV) -> Peaked $114.99 (~$2.08T FDV) -> Reversed -15.50% off peak (-12.85% off open) to close $97.17 (+17.07%) on $76.46B turnover (>846M shares vs. SpaceX 522M).',
              'Pro forma liquidity: $232.4B cash & short-term investments ($244.6B with 147M-share greenshoe)—second in Big Tech only to Alphabet ($265.1B).',
            ]}
          />

          {/* Dichotomy 1: Liquidity Drain vs. Breaking Circular Financing */}
          <ComparisonCard
            left={{
              title: 'Near-Term Mechanical Liquidity Drain',
              subtitle: 'Portfolio arithmetic & sell-the-event',
              tone: 'negative',
              points: [
                <>
                  Indicated demand hit <span className="font-mono tabular-nums">6x&ndash;7x</span> the original <span className="font-mono tabular-nums">825M</span>-share deal (<span className="font-mono tabular-nums">~$445B&ndash;$500B</span>: <span className="font-mono tabular-nums">~$400B</span> institutional, <span className="font-mono tabular-nums">~$100B</span> retail; <span className="font-mono tabular-nums">~20%</span> retail earmarked).
                </>,
                <>
                  With active funds holding <span className="font-mono tabular-nums">&lt;5%</span> cash and strict tech caps, managers sold existing leaders Oct 2&ndash;Nov 19: <span className="font-mono">QQQ</span> <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-12.8%</span>, Alphabet <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-18.3%</span>, and Nvidia <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-36.2%</span> (<span className="font-mono tabular-nums">10</span> straight sessions of institutional outflows Nov 6&ndash;19: <span className="font-mono tabular-nums">$6.35B</span> main-force, <span className="font-mono tabular-nums">$9.7B</span> total).
                </>,
                <>
                  Kraken and Ripple executives tied Bitcoin&rsquo;s retreat toward <span className="font-mono tabular-nums">$62K</span> (<span className="font-mono tabular-nums">$1.91B</span> 7-day ETF outflows Nov 5&ndash;13) to IPO cash rotation; late-day <span className="font-mono">ANT</span> order flow showed <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-$8.13B</span> net super-large outflows as early allocators harvested the opening pop.
                </>,
              ],
            }}
            right={{
              title: 'Strategic Shift Away from Circular Financing',
              subtitle: 'Independent balance sheet & macro context',
              tone: 'positive',
              points: [
                <>
                  While the <span className="font-mono tabular-nums">$26B</span> Class N placement spotlighted{' '}
                  <TermTooltip
                    term="circular financing"
                    definition="Deals where hyperscalers and chipmakers invest billions of equity into frontier AI labs that channel that capital back in multi-year cloud and silicon contracts."
                  />
                  , SemiAnalysis and D.A. Davidson argue the IPO initiates independence via <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">$232.4B</span> in pro forma cash.
                </>,
                <>
                  External customer cash flows and public equity now fund compute obligations rather than pure supplier credit loops.
                </>,
                <>
                  Skeptics also note an <span className="font-mono tabular-nums">$81B&ndash;$107B</span> raise cannot alone explain multi-trillion-dollar selloffs like November 5&rsquo;s <span className="font-mono tabular-nums">$2.3T</span> Nasdaq 100 rout; it magnified an existing <span className="font-mono tabular-nums">5%+</span> yield and Fed macro strain.
                </>,
              ],
            }}
          />

          {/* Dichotomy 2: Hyper-Growth Fundamentals vs. Structural Vulnerabilities */}
          <ComparisonCard
            left={{
              title: 'Unprecedented Revenue Scale (Amended S-1)',
              subtitle: 'Enterprise & agentic adoption',
              tone: 'positive',
              points: [
                <>
                  9M 2026 revenue surged <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+1,206%</span> YoY to <span className="font-mono tabular-nums">$33.24B</span> (up from <span className="font-mono tabular-nums">$2.55B</span> in 9M 2025); API usage drove <span className="font-mono tabular-nums">79%</span> of sales alongside breakout <em>Claude Code</em> and <em>Cowork</em> adoption.
                </>,
                <>
                  Over <span className="font-mono tabular-nums">14,000</span> enterprise customers (<span className="font-mono tabular-nums">~250</span> at <span className="font-mono tabular-nums">$10M+</span> ARR; <span className="font-mono tabular-nums">&gt;11,900</span> at <span className="font-mono tabular-nums">$100K+</span>) and <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">~900%</span> net revenue retention as of Sept 30.
                </>,
                <>
                  H1 operating cash flow reached <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+$3.93B</span>; <span className="font-mono tabular-nums">$94.3B</span> of the <span className="font-mono tabular-nums">$104.04B</span> 9M GAAP net loss came from non-cash convertible/SAFE markups.
                </>,
              ],
            }}
            right={{
              title: 'Four Structural Vulnerabilities Priced In',
              subtitle: 'Deceleration, obligations & governance',
              tone: 'negative',
              points: [
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Decelerating QoQ pace &amp; operating swing:</strong> Growth slowed from <span className="font-mono tabular-nums">147%</span> in Q2 (<span className="font-mono tabular-nums">$4.7B &rarr; $11.6B</span>) to <span className="font-mono tabular-nums">47%</span> in Q3 (<span className="font-mono tabular-nums">$16.96B</span>); GAAP operating income swung from <span className="font-mono tabular-nums">+$974M</span> (Q2) to <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-$567M</span> (Q3; <span className="font-mono tabular-nums">~$1.26B</span> 9M op loss). Revenue per compute dollar cooled from <span className="font-mono tabular-nums">$2.08</span> (Q2) to <span className="font-mono tabular-nums">~$1.70</span> (Q3; up from <span className="font-mono tabular-nums">$0.40</span> Q1 &rsquo;25), and the{' '}
                  <TermTooltip
                    term="28-day run rate"
                    definition="Unaudited annualized revenue metric multiplying trailing 28-day usage by 13 ($81.0B on Oct 31), which Anthropic's filing warns can fluctuate sharply."
                  />{' '}
                  is unaudited.
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">~$900B compute overhang:</strong> <span className="font-mono tabular-nums">$895.4B&ndash;$900.9B</span> in multi-year commitments (<span className="font-mono tabular-nums">$70.7B</span> due next 12 months; <span className="font-mono tabular-nums">$451.6B</span> before end-2030; SemiAnalysis estimates <span className="font-mono tabular-nums">~$280B</span> 4-yr revenue needed). Blackstone warned of a speculative-grade <span className="font-mono">BB</span> rating (Blackstone put <span className="font-mono tabular-nums">$9B</span> of <span className="font-mono tabular-nums">&gt;10%</span>-yield junior debt into Project North Star behind Broadcom&rsquo;s <span className="font-mono tabular-nums">$42B</span> senior guarantees).
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Supplier conflicts &amp; control:</strong> <span className="font-mono tabular-nums">~48%</span> of H1 revenue flowed through AWS, Google Cloud, and Microsoft marketplaces (Amazon&rsquo;s <span className="font-mono tabular-nums">14.7%</span> stake = <span className="font-mono tabular-nums">~$159B</span> at <span className="font-mono tabular-nums">$83</span>; Alphabet&rsquo;s <span className="font-mono tabular-nums">13.7%</span> = <span className="font-mono tabular-nums">~$149B</span>, yet both stocks fell <span className="font-mono tabular-nums">2.9%&ndash;3.9%</span> Thursday). Co-founders hold <span className="font-mono tabular-nums">50.1%</span> voting power via Class F, with <span className="font-mono tabular-nums">1.77B</span> outstanding options and a <span className="font-mono tabular-nums">2.95B</span>-share incentive pool.
                </>,
              ],
            }}
          />

          {/* Dichotomy 3: 60-Day Supply-Demand Tug-of-War */}
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-950 dark:text-stone-50 mt-8 mb-2">
            The 60-Day Supply-Demand Tug-of-War &amp; 2027 Mega-IPO Read-Through
          </h3>

          <ComparisonCard
            left={{
              title: 'Forced Passive Index Demand (~$19B)',
              subtitle: '~333M shares projected by Intropic',
              tone: 'positive',
              points: [
                <>
                  <strong className="text-stone-900 dark:text-stone-100">MSCI Global Standard:</strong>{' '}
                  <TermTooltip
                    term="Fast-entry inclusion"
                    definition="Expedited index addition mechanism for mega-cap listings (MSCI, Nasdaq-100 Top-40 rule, FTSE Russell) requiring passive funds to purchase shares on set effective dates."
                  />{' '}
                  notice due by open Mon Nov 23 (Day 3); effective close <span className="font-mono tabular-nums">Nov 30</span> or <span className="font-mono tabular-nums">Dec 1</span>.
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Nasdaq-100 Fast Entry:</strong> Qualifies under Nasdaq&rsquo;s 2026 Top-40 rule; Trading Day 15 lands <span className="font-mono tabular-nums">Thu Dec 10</span> (aligned with mid-December rebalance per Morningstar).
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">FTSE Russell:</strong> Russell U.S. Indexes close <span className="font-mono tabular-nums">Dec 11</span> (eff. open Dec 14); FTSE GEIS close <span className="font-mono tabular-nums">Dec 18</span> (eff. open Dec 21).
                </>,
                <>
                  <strong className="text-[#BC4128] dark:text-[#E2694A]">S&amp;P 500 Exclusion:</strong> Excluded until at least <span className="font-mono tabular-nums">November 2027</span> due to 12-month seasoning and GAAP profitability requirements.
                </>,
              ],
            }}
            right={{
              title: 'Front-Loaded Staggered Insider Supply',
              subtitle: '23 lock-up release dates over Year 1',
              tone: 'negative',
              points: [
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Day 1 Employee Window (Nov 19):</strong> Rather than a 180-day cliff, the{' '}
                  <TermTooltip
                    term="staggered lock-up"
                    definition="An underwriting structure spacing insider liquidity across 23 separate dates over Year 1, beginning on listing day with up to 10% of vested employee holdings."
                  />{' '}
                  unlocked up to <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">315M shares</span> (<span className="font-mono tabular-nums">~$30.6B</span> at close; <span className="font-mono tabular-nums">$2.91</span> avg option strike) across a six-trading-day window through Thanksgiving week.
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Early Investor Tranches:</strong> Four unlocks starting Day 27 (<span className="font-mono tabular-nums">Dec 15</span>), Day 48 (<span className="font-mono tabular-nums">Jan 5</span>), Day 62 (<span className="font-mono tabular-nums">Jan 19</span>), and Day 76 (<span className="font-mono tabular-nums">Feb 2</span>).
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">2027 Major Cliffs:</strong> Employees unlock another <span className="font-mono tabular-nums">35%</span> two trading days after FY2026 earnings (late Feb/early Mar 2027); co-founders unlock up to <span className="font-mono tabular-nums">29%</span> at the earlier of Q1 2027 results or Day 180 (<span className="font-mono tabular-nums">May 17, 2027</span>).
                </>,
              ],
            }}
          />

          {/* Mega-IPO Comparison Table */}
          <div className="my-6 overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  <th className="py-3 px-4 whitespace-nowrap">Metric / Dimension</th>
                  <th className="py-3 px-4 whitespace-nowrap text-[#A8672E] dark:text-[#D08F52]">Anthropic (ANT)</th>
                  <th className="py-3 px-4 whitespace-nowrap">SpaceX (SPCX)</th>
                  <th className="py-3 px-4 whitespace-nowrap">OpenAI (Private / 2027)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-950 text-xs sm:text-sm">
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">Listing / Status</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">Nov 19, 2026 (Nasdaq)</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">June 12, 2026 (Nasdaq)</td>
                  <td className="py-3 px-4 text-stone-700 dark:text-stone-300">Confidential S-1 June 8, 2026; targeting 2027 IPO</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">Capital Raised</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">$81.34B ($93.54B w/ shoe; +$26B private)</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">$75.0B ($85.7B&ndash;$86.25B w/ shoe)</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">$122B private committed (Mar 2026)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">Valuation Benchmark</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">$1.50T FDV @ $83 ($1.76T @ $97.17)</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">$1.77T @ $135 IPO ($1.96T open)</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">$852B last round; $1.25T pre-money target</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">Revenue Scale</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">$33.24B 9M &rsquo;26 ($16.96B Q3; $81B Oct run rate)</td>
                  <td className="py-3 px-4 text-stone-700 dark:text-stone-300">Established Starlink/launch cash flow + xAI merger</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">$14.6B Q3 rev vs. $19.6B Q3 capex (press reports)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">Float &amp; Lock-Up</td>
                  <td className="py-3 px-4 text-stone-700 dark:text-stone-300">~7.5% basic (~5.4% diluted); +315M Day-1 shares; 23 dates</td>
                  <td className="py-3 px-4 text-stone-700 dark:text-stone-300">~5% sold; tight lock-ups (up to 366 days for Musk)</td>
                  <td className="py-3 px-4 text-stone-700 dark:text-stone-300">TBD; closely tracking ANT secondary stability</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">Post-Inclusion Pattern</td>
                  <td className="py-3 px-4 text-stone-700 dark:text-stone-300">~$19B passive buys (Nov 30&ndash;Dec 21); S&amp;P excluded &ge;1 yr</td>
                  <td className="py-3 px-4 text-[#BC4128] dark:text-[#E2694A]">Popped $135 &rarr; &gt;$200, then fell ~50% to $108 by Aug ($138.43 Nov 19)</td>
                  <td className="py-3 px-4 text-stone-700 dark:text-stone-300">Benchmarking 22x&ndash;26x sales; Nov 16 CA AG safety lawsuit</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            <li className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
              <span>
                <strong className="text-stone-950 dark:text-stone-50">SpaceX cautionary roadmap:</strong> After drawing <span className="font-mono tabular-nums">$4.3B</span> in Nasdaq-100 fast-entry buying on July 7, SpaceX closed lower on inclusion day, dropped <span className="font-mono tabular-nums">~15%</span> over six sessions, and fell nearly <span className="font-mono tabular-nums">50%</span> by August; Leverage Shares warns <span className="font-mono">ANT</span> risks a similar <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">40%&ndash;50%</span> multiple reset if upcoming earnings show single-digit operating margins or slowing retention.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
              <span>
                <strong className="text-stone-950 dark:text-stone-50">2027 pipeline signal:</strong> For OpenAI (facing a Nov 16 California AG lawsuit over a rogue agent breach of Hugging Face), Databricks (<span className="font-mono tabular-nums">$190B</span>), and Stripe (<span className="font-mono tabular-nums">$159B</span>), Anthropic confirms the IPO window is open at <span className="font-mono tabular-nums">~22x&ndash;26x</span> sales&mdash;provided post-inclusion trading holds up under <span className="font-mono tabular-nums">5%+</span> yields.
              </span>
            </li>
          </ul>
        </section>

        {/* ===================================================================
            SECTION: NVIDIA'S Q3 FY2027 EARNINGS PARADOX
           =================================================================== */}
        <section className="mb-12">
          <SectionHeading
            kicker="Semiconductor Bellwether"
            title="Nvidia's Q3 FY2027 Earnings Paradox: Hyper-Growth Meets Structural Overhang"
          />

          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-4">
            Reporting Tuesday, November 17 under interim CEO and CFO Colette Kress, Nvidia saw a <span className="font-mono tabular-nums">+4.8%</span> after-hours pop reverse into <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-2.89%</span> Wednesday (<span className="font-mono tabular-nums">$150.96</span>) and <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-3.30%</span> Thursday (<span className="font-mono tabular-nums">$145.98</span>)&mdash;its sixth straight loss, <span className="font-mono tabular-nums">38.98%</span> below its October 6 record close (<span className="font-mono tabular-nums">$239.24</span>) and below its prior 52-week low (<span className="font-mono tabular-nums">$148.80</span>). Even before this week&rsquo;s drop, Reuters reported shares had compressed to <span className="font-mono tabular-nums">~12x</span> forward earnings (cheapest since 2012; <span className="font-mono tabular-nums">~0.2x</span> PEG per JPMorgan), making Nvidia the only top-10 <span className="font-mono">SMH</span> holding negative year-to-date.
          </p>

          {/* Q3 FY2027 Financial Scorecard */}
          <div className="my-6 overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  <th className="py-3 px-4 whitespace-nowrap">Financial / Operational Metric</th>
                  <th className="py-3 px-4 whitespace-nowrap">Q3 FY2027 Actual / Guide</th>
                  <th className="py-3 px-4 whitespace-nowrap">Consensus / Prior</th>
                  <th className="py-3 px-4 whitespace-nowrap">YoY / QoQ Delta</th>
                  <th className="py-3 px-4">Analytical Takeaway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-950 text-xs sm:text-sm">
                {NVDA_METRICS.map((item) => (
                  <tr key={item.metric} className="hover:bg-stone-50/70 dark:hover:bg-stone-900/40">
                    <td className="py-3 px-4 font-medium text-stone-950 dark:text-stone-100 whitespace-nowrap">
                      {item.metric}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-stone-900 dark:text-stone-100 whitespace-nowrap">
                      {item.actual}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-stone-600 dark:text-stone-400 whitespace-nowrap">
                      {item.benchmark}
                    </td>
                    <td
                      className={`py-3 px-4 font-mono tabular-nums whitespace-nowrap font-medium ${
                        item.tone === 'positive'
                          ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                          : 'text-[#BC4128] dark:text-[#E2694A]'
                      }`}
                    >
                      {item.delta}
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formula Panel: Calendar Normalization & Margin Squeeze */}
          <FormulaPanel
            title="Q4 FY2027 13-Week Calendar Normalization & Margin Impact"
            formulas={[
              {
                label: '13-Week Equivalent Revenue',
                expression: <InlineMath math="\$130.0\text{B (14-wk)} \times \frac{13}{14}" />,
                result: '$120.71B',
                tone: 'accent',
              },
              {
                label: 'Comparable QoQ Growth',
                expression: <InlineMath math="\frac{\$120.71\text{B} - \$115.844\text{B}}{\$115.844\text{B}}" />,
                result: '+4.2% (down from +20.4% in Q3)',
                tone: 'negative',
                highlight: true,
              },
              {
                label: 'Weekly Revenue Pace',
                expression: '$115.844B / 13 wks -> $130.0B / 14 wks',
                result: '$8.91B/wk -> $9.29B/wk',
                tone: 'neutral',
              },
              {
                label: 'Gross Profit Headwind',
                expression: '-3.40% (74.9% -> 71.5% mid) x $130.0B',
                result: '-$4.42B/qtr ($1.30B per 100 bps)',
                tone: 'negative',
              },
            ]}
            workedExample={[
              'Pairing the 340-bp margin trough (guided to recover to 72%–73% in FY2028) with a +$111B one-quarter surge in supply commitments to $390B signals memory/packaging suppliers (SK Hynix, Samsung, TSMC) are capturing a rising share of each AI rack dollar.',
              'Working capital watch: Accounts receivable reached $81.0B (64 DSO) alongside $118B in broader infrastructure commitments; management clarified neocloud financial guarantees fell from $36B to $32B and trigger only after independent financing and construction.',
            ]}
          />

          {/* Dichotomy: Accelerating Operational Demand vs. Structural Overhangs */}
          <ComparisonCard
            left={{
              title: 'Operational Reality: Demand Still Accelerating',
              subtitle: 'Execution & product ramp highlights',
              tone: 'positive',
              points: [
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Vera Rubin NVL72 ramp:</strong> Generated nearly <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">$20B</span> in its inaugural production quarter (fastest ramp in company history) across CoreWeave, Google Cloud, Azure, OCI, Nebius, and deploying at SpaceXSI.
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Agentic CPUs &amp; GPU pricing power:</strong> Custom Vera CPUs began shipping (agentic AI = <span className="font-mono tabular-nums">~80%</span> of OpenRouter tokens); Hopper GPUs are recontracting at up to <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">2x</span> original prices; B300 rentals rose <span className="font-mono tabular-nums">&gt;60%</span>; hyperscaler backlogs jumped <span className="font-mono tabular-nums">$500B</span> in one quarter to <span className="font-mono tabular-nums">$2.5T</span>; sovereign AI more than tripled YoY.
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Raised FY28 outlook &amp; capital return:</strong> Raised FY2028 revenue growth target to <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">~75%</span> YoY (up from <span className="font-mono tabular-nums">70%</span>; vs. <span className="font-mono tabular-nums">~$693B</span> consensus), pledged to deploy its remaining <span className="font-mono tabular-nums">$227.3B</span> buyback by end-FY2028, and confirmed its <span className="font-mono tabular-nums">$12.93B</span> Hugging Face acquisition (H1 2027 close, DOJ review).
                </>,
              ],
            }}
            right={{
              title: 'Why the Stock Sold Off: Five Overhangs',
              subtitle: 'Risks sitting outside Q3 income statement',
              tone: 'negative',
              points: [
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Margin &amp; cadence compression:</strong>{' '}
                  <TermTooltip
                    term="13-week normalization"
                    definition="Adjusting Nvidia's 14-week Q4 FY2027 guidance by 13/14 to $120.71B, showing comparable sequential revenue growth decelerating from 20.4% in Q3 to 4.2% in Q4."
                  />{' '}
                  masks a slowdown to <span className="font-mono tabular-nums">+4.2%</span> QoQ alongside a <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-340 bps</span> margin squeeze and{' '}
                  <TermTooltip
                    term="neocloud guarantees"
                    definition="Nvidia's infrastructure backstops (down from $36B to $32B) that activate only after neocloud operators independently secure financing and build data centers."
                  />
                  .
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Governance shock &amp; federal probes:</strong> Founder Jensen Huang resigned Nov 12 after internal probes into extramarital relationships with two employees and ex-Megaspeed executive Alice Huang; Board Chair Harvey Jones confirmed a unanimous refusal to reinstate him (&ldquo;lack of candor&rdquo;), despite a <span className="font-mono tabular-nums">&gt;202,000</span>-signature petition. <em>WSJ</em> reported an SEC civil probe; Huang (<span className="font-mono tabular-nums">Dec 1</span>) and GC Tim Teter (<span className="font-mono tabular-nums">Dec 2</span>) testify before Congress.
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">China zeroed out:</strong> Licensed Hopper shipments (<span className="font-mono tabular-nums">$2.4B</span> in Q3) have ended; Q4 assumes <span className="font-mono tabular-nums">$0</span> China data-center compute while Nov 16 third-country rules already stalled a Malaysian chip financing deal.
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Cracks in CUDA moat:</strong> Anthropic&rsquo;s <em>Claude Mythos</em> autonomously ported <span className="font-mono tabular-nums">~100%</span> of kernels to AMD MI355 GPUs in <span className="font-mono tabular-nums">~3 days</span> (vs. 6&ndash;12 months). JPMorgan (Cembalest) puts Nvidia at just <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">28%</span> (<span className="font-mono tabular-nums">12.11 GW</span>) of <span className="font-mono tabular-nums">43.9 GW</span> post-2026 frontier compute deals (Broadcom ASICs <span className="font-mono tabular-nums">23%</span>, AMD <span className="font-mono tabular-nums">18%</span>, Trainium <span className="font-mono tabular-nums">16%</span>, TPUs <span className="font-mono tabular-nums">14%</span>); Epoch AI models AMD MI455X at <span className="font-mono tabular-nums">2.9x</span> GB300 vs. <span className="font-mono tabular-nums">2.2x</span> for Vera Rubin VR200.
                </>,
                <>
                  <strong className="text-stone-900 dark:text-stone-100">Street multiple resets:</strong> Targets cut across Bernstein (Market Perform, <span className="font-mono tabular-nums">$400&rarr;$200</span>), Baird (<span className="font-mono tabular-nums">$500&rarr;$200</span>), Evercore (<span className="font-mono tabular-nums">$186</span>), JPMorgan (<span className="font-mono tabular-nums">$215</span>), Goldman (<span className="font-mono tabular-nums">$220</span>), Citi (<span className="font-mono tabular-nums">$225</span>), and Morgan Stanley (<span className="font-mono tabular-nums">$300&rarr;$267</span>, removed Top Pick).
                </>,
              ],
            }}
          />

          {/* Compact CEO Succession Odds Card */}
          <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 p-4 sm:p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h4 className="font-serif text-lg font-normal text-stone-950 dark:text-stone-50">
                CEO Succession Search (Heidrick &amp; Struggles &mdash; No Fixed Deadline)
              </h4>
              <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                Prediction market implied odds (The Action Network)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-3">
                <p className="font-medium text-sm text-stone-950 dark:text-stone-100">Ian Buck</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">20-yr CUDA architect &amp; Hyperscale VP</p>
                <p className="font-mono tabular-nums text-lg font-semibold text-[#A8672E] dark:text-[#D08F52] mt-1">
                  35.5%
                </p>
              </div>
              <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-3">
                <p className="font-medium text-sm text-stone-950 dark:text-stone-100">Colette Kress</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">Interim CEO &amp; CFO</p>
                <p className="font-mono tabular-nums text-lg font-semibold text-stone-800 dark:text-stone-200 mt-1">
                  25.5%
                </p>
              </div>
              <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-3">
                <p className="font-medium text-sm text-stone-950 dark:text-stone-100">Rene Haas</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">Arm CEO</p>
                <p className="font-mono tabular-nums text-lg font-semibold text-stone-800 dark:text-stone-200 mt-1">
                  9.1%
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Additional names cited by industry analysts: internal GPU engineering SVP Jonah Alben, Broadcom&rsquo;s Charlie Kawwas, and Apple&rsquo;s Johny Srouji.
            </p>
          </div>
        </section>

        {/* ===================================================================
            SECTION: WHAT TO WATCH NEXT
           =================================================================== */}
        <section className="mb-8">
          <SectionHeading
            kicker="Forward Roadmap"
            title="What to Watch Next: Systematic Triggers, Catalysts, and Scenarios"
          />

          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-4">
            Friday&rsquo;s <span className="font-mono tabular-nums">November 20</span> monthly OpEx&mdash;clearing heavy negative dealer gamma across <span className="font-mono">SMH</span> and single-stock semis as Anthropic settles its IPO and <span className="font-mono tabular-nums">$26B</span> private placement&mdash;opens a fresh positioning regime on Monday, <span className="font-mono tabular-nums">November 23</span> (when <span className="font-mono">ANT</span> listed options may also launch).
          </p>

          {/* Formula Panel: CTA Buffer & Correction Threshold */}
          <FormulaPanel
            title="S&P 500 Systematic Thresholds & Positioning Triggers"
            formulas={[
              {
                label: 'CTA Long-Term Floor Buffer',
                expression: '7,175.83 (Nov 19 Close) - 7,133.00 (Goldman Floor)',
                result: '+42.83 pts (+0.60%)',
                tone: 'negative',
                highlight: true,
              },
              {
                label: '10% Correction Zone',
                expression: '7,844.67 (Oct High) x 0.90',
                result: '7,060.20 (~7,037 closing high basis)',
                tone: 'accent',
              },
              {
                label: '200-DMA Reclamation Target',
                expression: '7,347.00 (200-DMA) - 7,175.83',
                result: '+171.17 pts (+2.39% required)',
                tone: 'positive',
              },
            ]}
            workedExample={[
              'Goldman Sachs 1-month CTA matrix (Nov 17): -$122.97B global selling (-$20.31B U.S.) in a sustained down tape vs. +$13.87B to +$89.10B global buying (+$8.01B to +$54.04B U.S.) if equities stabilize or rally.',
              'Historical precedent (KuCoin/Bluekurtic): In 10 of 11 cases since 1993 when the S&P 500 broke its 200-DMA after an extended stretch above it, further declines followed within 10 sessions.',
            ]}
          />

          {/* Multi-point range tracker for S&P 500 systematic thresholds */}
          <LevelLadder
            points={[
              { label: '10% Corr.', value: '7,060.20', position: 8.6, tone: 'neg' },
              { label: 'CTA Floor', value: '7,133.00', position: 29.4, tone: 'neg' },
              { label: 'Nov 19 Close', value: '7,175.83', position: 43.0, tone: 'neutral' },
              { label: '200-DMA', value: '7,347.00', position: 90.6, tone: 'pos' },
            ]}
            caption="S&P 500 technical thresholds (Nov 19 close): only +42.83 pts (+0.60%) separates spot from Goldman's 7,133 CTA floor versus +171.17 pts (+2.39%) needed to reclaim the 200-day moving average."
          />

          {/* Dichotomy: Systematic Downside vs. Structural Cushions */}
          <ComparisonCard
            left={{
              title: 'Systematic Downside Pressure',
              subtitle: 'Fragile technical & trend triggers',
              tone: 'negative',
              points: [
                <>
                  Just <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">42.83 points</span> separate the S&amp;P 500 from Goldman&rsquo;s <span className="font-mono tabular-nums">7,133</span> CTA long-term floor; BTIG&rsquo;s Jonathan Krinsky targets <span className="font-mono tabular-nums">7,000&ndash;7,100</span> below that break.
                </>,
                <>
                  Two sessions of losses since Tuesday&rsquo;s Goldman model snapshot have pulled trend followers even tighter against sell triggers (<span className="font-mono tabular-nums">-$122.97B</span> 1-month global downside model).
                </>,
              ],
            }}
            right={{
              title: 'Structural Demand Cushions',
              subtitle: 'Washed-out positioning & corporate bid',
              tone: 'positive',
              points: [
                <>
                  Goldman Prime Brokerage U.S. Info Tech long/short ratio dropped to <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">1.50</span> (from <span className="font-mono tabular-nums">2.14</span> in June)&mdash;its lowest reading since <span className="font-mono tabular-nums">2016</span>.
                </>,
                <>
                  <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">94%&ndash;95%</span> of S&amp;P 500 firms sit inside open buyback windows through early-to-mid December (<span className="font-mono tabular-nums">$1.52T</span> YTD authorizations executing at <span className="font-mono tabular-nums">1.3x</span> normal volume; <span className="font-mono tabular-nums">45%</span> opportunistic discretionary flow), reinforced by Nvidia&rsquo;s <span className="font-mono tabular-nums">$227.3B</span> repurchase capacity.
                </>,
              ],
            }}
          />

          {/* High-Impact Calendar with Filter */}
          <div className="my-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-950 dark:text-stone-50">
                  High-Impact Catalyst Calendar
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter calendar events">
                {(
                  [
                    { id: 'all', label: 'All Events' },
                    { id: 'macro_fed', label: 'Macro & Fed' },
                    { id: 'earnings', label: 'AI Earnings' },
                    { id: 'flows_policy', label: 'Flows & Policy' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCatalystFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors ${
                      catalystFilter === tab.id
                        ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-stone-950 font-medium'
                        : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    <th className="py-3 px-4 whitespace-nowrap">Date</th>
                    <th className="py-3 px-4 whitespace-nowrap">Type</th>
                    <th className="py-3 px-4">Key Catalyst / Event</th>
                    <th className="py-3 px-4">Consensus &amp; Watchpoints</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-950 text-xs sm:text-sm">
                  {filteredCatalysts.map((item) => (
                    <tr
                      key={item.date}
                      className={
                        item.highlight
                          ? 'bg-[#A8672E]/[0.04] dark:bg-[#D08F52]/[0.06]'
                          : 'hover:bg-stone-50/70 dark:hover:bg-stone-900/40'
                      }
                    >
                      <td className="py-3 px-4 font-mono tabular-nums font-medium text-stone-950 dark:text-stone-100 whitespace-nowrap align-top">
                        {item.date}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap align-top">
                        <span
                          className={`inline-block rounded px-2 py-0.5 font-mono text-[11px] ${
                            item.highlight
                              ? 'bg-[#A8672E]/15 dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] font-semibold'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}
                        >
                          {item.categoryLabel}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100 align-top">
                        {item.event}
                      </td>
                      <td className="py-3 px-4 text-stone-600 dark:text-stone-400 align-top leading-relaxed">
                        {item.watchpoints}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Three Forward Scenarios: Base Case + Bull vs. Bear Dichotomy */}
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-950 dark:text-stone-50 mt-8 mb-4">
            Three Forward Scenarios
          </h3>

          {/* Base Case Card */}
          <div className="rounded-lg border border-stone-200 dark:border-stone-800 border-t-2 border-t-[#A8672E] dark:border-t-[#D08F52] bg-stone-50/70 dark:bg-stone-900/50 p-4 sm:p-5 mb-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />
              <h4 className="font-serif text-lg font-normal text-[#A8672E] dark:text-[#D08F52]">
                Base Case: Choppy Consolidation &amp; Post-FOMC Base Building
              </h4>
            </div>
            <ul className="space-y-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              <li>
                &bull; S&amp;P 500 tests but broadly holds <span className="font-mono tabular-nums">7,000&ndash;7,133</span> as open corporate buybacks and washed-out tech exposure (<span className="font-mono tabular-nums">1.50</span> L/S) absorb supply.
              </li>
              <li>
                &bull; Oct PCE (Nov 25) and Nov payrolls (Dec 4) seal a <span className="font-mono tabular-nums">25-bp</span> Dec 9 hike to <span className="font-mono tabular-nums">4.00%&ndash;4.25%</span> while neutralizing Waller&rsquo;s <span className="font-mono tabular-nums">50-bp</span> shock scenario.
              </li>
              <li>
                &bull; Broadcom (Dec 9) and Micron (Dec 16) verify sustained custom-ASIC and HBM demand, letting semis base while <span className="font-mono">ANT</span> ranges <span className="font-mono tabular-nums">$83&ndash;$110</span> around passive inflows before SpaceX-style digestion into mid-December unlocks.
              </li>
            </ul>
          </div>

          {/* Bull vs. Bear Dichotomy Card */}
          <ComparisonCard
            left={{
              title: 'Bull Case: Post-OpEx Relief & Year-End Squeeze',
              subtitle: 'Yields <5.00% & 200-DMA reclamation',
              tone: 'positive',
              points: [
                <>
                  Cooling Oct PCE and softer Nov payrolls pull the 10-year yield sustainably back below <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">5.00%</span>.
                </>,
                <>
                  Post-Nov 20 gamma relief stabilizes <span className="font-mono">SMH</span> near <span className="font-mono tabular-nums">$447&ndash;$460</span> and lifts the S&amp;P 500 back above its <span className="font-mono tabular-nums">7,347</span> 200-DMA, unlocking up to <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+$54B U.S. / +$89B global</span> CTA re-buying.
                </>,
                <>
                  Backed by post-midterm seasonality (avg <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+17%</span> Q4-to-Q2 pre-election rally since 1900) and consensus S&amp;P EPS growth (<span className="font-mono tabular-nums">33%</span> in 2026, <span className="font-mono tabular-nums">16%</span> in 2027), equities rebound toward Freedom Capital&rsquo;s <span className="font-mono tabular-nums">7,250+</span> year-end staging level and Goldman&rsquo;s <span className="font-mono tabular-nums">8,700</span> 12-month target (<span className="font-mono tabular-nums">19x</span> 2028 EPS of <span className="font-mono tabular-nums">$458</span>).
                </>,
              ],
            }}
            right={{
              title: 'Bear Case: Systematic Break & AI Credit Contagion',
              subtitle: 'Multi-day close <7,133 & credit spillover',
              tone: 'negative',
              points: [
                <>
                  A multi-day S&amp;P 500 close below <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">7,133</span> triggers <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-$123B</span> global CTA selling through <span className="font-mono tabular-nums">7,037&ndash;7,060</span> toward an illustrative <span className="font-mono tabular-nums">12%&ndash;15%</span> drawdown (<span className="font-mono tabular-nums">~6,670&ndash;6,900</span>).
                </>,
                <>
                  Hot Oct PCE pushes 10-year yields above <span className="font-mono tabular-nums">5.15%&ndash;5.30%</span>, forcing a <span className="font-mono tabular-nums">50-bp</span> December hike or <span className="font-mono tabular-nums">4.75%+</span> 2027 dot plot; damaging Dec 1 Huang testimony sparks tighter export curbs or Chinese reprisals.
                </>,
                <>
                  <span className="font-mono">ANT</span> breaks below its <span className="font-mono tabular-nums">$83</span> IPO floor (stalling greenshoe exercise) while localized AI credit stress (Oracle <span className="font-mono tabular-nums">288 bps</span> CDS, CoreWeave distressed spreads) spills into broad U.S. High Yield OAS above <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">4.0%&ndash;4.5%</span>.
                </>,
              ],
            }}
          />

          {/* Five Daily Signposts */}
          <div className="mt-8 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-5 sm:p-6">
            <h3 className="font-serif text-xl font-normal text-stone-950 dark:text-stone-50 mb-4">
              Five Daily Signposts to Track Regime Control
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              <li className="flex items-start gap-2.5 rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/60 p-3.5">
                <CheckCircle2 className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                <span>
                  <strong className="font-mono tabular-nums text-stone-950 dark:text-stone-50">SPX 7,133 vs. 7,347:</strong>{' '}
                  Holding the systematic CTA floor versus reclaiming the 200-day moving average.
                </span>
              </li>
              <li className="flex items-start gap-2.5 rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/60 p-3.5">
                <CheckCircle2 className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                <span>
                  <strong className="font-mono tabular-nums text-stone-950 dark:text-stone-50">10Y Yield (5.00%&ndash;5.10%) &amp; Credit:</strong>{' '}
                  Watch U.S. High Yield OAS (<span className="font-mono tabular-nums">3.43%</span>) plus Oracle/CoreWeave CDS for early credit contagion.
                </span>
              </li>
              <li className="flex items-start gap-2.5 rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/60 p-3.5">
                <CheckCircle2 className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                <span>
                  <strong className="font-mono tabular-nums text-stone-950 dark:text-stone-50">NVDA $148.80&ndash;$150:</strong>{' '}
                  Reclaiming the prior 52-week low alongside concrete Heidrick &amp; Struggles permanent CEO timing updates.
                </span>
              </li>
              <li className="flex items-start gap-2.5 rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/60 p-3.5">
                <CheckCircle2 className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                <span>
                  <strong className="font-mono tabular-nums text-stone-950 dark:text-stone-50">ANT $92.72 &amp; $83.00:</strong>{' '}
                  Defending the Day-1 low and IPO price through the Nov 19&ndash;27 employee unlock window and Dec 18 greenshoe deadline.
                </span>
              </li>
              <li className="flex items-start gap-2.5 rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/60 p-3.5 md:col-span-2">
                <TrendingUp className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                <span>
                  <strong className="font-mono tabular-nums text-stone-950 dark:text-stone-50">Broadcom Dec 9 AI Guidance ($21.7B Q4 benchmark):</strong>{' '}
                  Will clarify whether hyperscaler capex is rotating away from Nvidia toward custom ASICs or decelerating across the entire AI stack.
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
