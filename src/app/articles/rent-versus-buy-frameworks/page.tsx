'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

const JARGON_DEFINITIONS: Record<string, string> = {
  'Unrecoverable Costs':
    'Capital expended for shelter that carries zero residual value—such as rent and renter’s insurance for tenants, or mortgage interest, property taxes, insurance, HOA dues, maintenance, transaction friction, and equity opportunity cost for owners.',
  'Equity Transfers':
    'Principal amortization payments that represent forced savings into an illiquid, leveraged residential asset rather than an economic expense.',
  'Unrecoverable Cost Framework':
    'Economic flow parity model (developed by Benjamin Felix at PWL Capital) that strips out principal paydown and isolates the annual non-recoverable cost of owning to establish a monthly breakeven rent benchmark.',
  'Terminal Net Worth Parity Model':
    'Balance-sheet stock parity model that equalizes periodic cash outflows between buying and renting over a fixed holding horizon T, compounding avoided upfront capital and monthly cash-flow surpluses in a market portfolio.',
  '5% Rule':
    'Original 2019 formulation of the Unrecoverable Cost Framework aggregating 1.0% property taxes, 1.0% maintenance, and 3.0% cost of capital (debt and equity opportunity cost).',
  'Opportunity Cost of Home Equity':
    'The annual return spread (r_e − g_h) forfeited by locking capital into residential real estate growing at rate g_h rather than a diversified stock portfolio returning r_e.',
  'Price-to-Rent (P/R) Ratio':
    'Cross-sectional valuation multiple dividing purchase price P_0 by annual market rent (12 × R_0), analogous to the Price-to-Earnings (P/E) multiple in equity markets.',
  'Gross Annual Rental Yield':
    'The reciprocal of the Price-to-Rent ratio (12 × R_0 / P_0), representing annual market rent as a percentage of the property’s market value.',
  'CapEx Lifecycle':
    'Ongoing capital expenditures required to offset physical depreciation of major structural and mechanical systems (roofing, HVAC, water heater, resurfaced driveways, kitchen/bath modernization).',
  'Round-Trip Transaction Haircut':
    'Combined acquisition closing costs (2%–5% of purchase price) and disposition selling commissions and fees (6%–8% of sale price), totaling 8%–10% of asset value.',
  'OBBBA':
    'The One Big Beautiful Bill Act enacted on July 4, 2025, which raised the SALT deduction cap to $40,400 in 2026 (with a $505,000 MAGI phaseout), made the $750,000 mortgage debt limit permanent, and restored PMI deductibility.',
  'SALT Deduction Cap':
    'Statutory limit on deducting State and Local Taxes (property taxes plus state income or sales taxes), raised from $10,000 under TCJA to $40,400 in 2026 under OBBBA before reverting in 2030.',
  'Section 121 Exclusion':
    'Internal Revenue Code provision allowing homeowners who own and occupy a primary residence for 2 of the preceding 5 years to exclude up to $250,000 (Single) or $500,000 (MFJ) of capital gains upon sale.',
  'Tax Drag':
    'Annual return reduction of 0.5% to 1.0%+ in a taxable brokerage account caused by ongoing taxation of dividends and realized distributions, prior to 15%–20% LTCG and 3.8% NIIT upon liquidation.',
  'Negative Leverage Drag':
    'Balance-sheet condition occurring whenever the mortgage interest rate r_d exceeds the property’s total unlevered return (appreciation g_h plus net imputed rental yield), causing borrowed funds to reduce net return on equity.',
  'Myopic Loss Aversion':
    'Behavioral bias wherein investors overreact to short-term mark-to-market price fluctuations and capitulate at market bottoms; homeowners are insulated by the absence of a live price ticker.',
  'PERMA Framework':
    'Psychological flourishing model—Positive Emotion, Engagement, Relationships, Meaning, and Accomplishment—capturing non-quantifiable utility of homeownership such as renovation autonomy and stability.',
};

interface JargonProps {
  term: keyof typeof JARGON_DEFINITIONS;
  label?: string;
}

function Jargon({ term, label }: JargonProps) {
  const [open, setOpen] = useState(false);
  const definition = JARGON_DEFINITIONS[term];

  return (
    <span
      tabIndex={0}
      role="button"
      aria-label={`${label || term}: ${definition}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="relative inline-block cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm transition-colors"
    >
      <span>{label || term}</span>
      {open && (
        <span
          role="tooltip"
          className="bookings-tooltip absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-md border border-slate-700 dark:border-slate-800 bg-[#14171B] dark:bg-[#05070A] p-3 text-left font-sans text-xs leading-relaxed text-slate-100 dark:text-slate-200 shadow-xl pointer-events-none"
        >
          <span className="block font-semibold text-[#D08F52] dark:text-[#D08F52] mb-1">
            {term}
          </span>
          {definition}
        </span>
      )}
    </span>
  );
}

interface FormulaPanelProps {
  title: string;
  math: string[];
  variables?: { symbol: string; desc: string }[];
  workedExampleTitle?: string;
  workedExample?: React.ReactNode;
}

function FormulaPanel({
  title,
  math,
  variables,
  workedExampleTitle,
  workedExample,
}: FormulaPanelProps) {
  return (
    <div className="my-5 rounded-lg border border-slate-800 dark:border-slate-800/90 bg-[#14171B] dark:bg-[#05070A] text-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-800 dark:border-slate-800/80 px-4 py-2.5 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-[#D08F52] dark:text-[#D08F52]">
          {title}
        </span>
        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
          Equation Specification
        </span>
      </div>
      <div className="p-4 sm:p-5 overflow-x-auto space-y-2">
        {math.map((eq, idx) => (
          <MathBlock key={idx} math={eq} className="text-white text-sm sm:text-base" />
        ))}
        {variables && variables.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 dark:border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-mono tabular-nums text-slate-300 dark:text-slate-400">
            {variables.map((v, idx) => (
              <div key={idx} className="flex items-baseline gap-2">
                <span className="text-[#D08F52] dark:text-[#D08F52] font-semibold shrink-0">
                  <InlineMath math={v.symbol} />
                </span>
                <span className="text-slate-400 dark:text-slate-500">=</span>
                <span>{v.desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {workedExample && (
        <div className="border-t border-slate-800 dark:border-slate-800/90 bg-slate-900/60 dark:bg-slate-950/80 px-4 py-3.5 sm:px-5">
          <div className="font-mono text-xs uppercase tracking-wider text-[#3CBF9C] dark:text-[#3CBF9C] mb-2">
            {workedExampleTitle || 'Worked Numeric Example (Paper Baseline)'}
          </div>
          <div className="font-mono tabular-nums text-xs sm:text-sm text-slate-200 dark:text-slate-300 space-y-1.5">
            {workedExample}
          </div>
        </div>
      )}
    </div>
  );
}

const UNRECOVERABLE_REGIME_ROWS = [
  {
    component: 'Down Payment / Equity Weight',
    symbol: 'd',
    y2019: '20.0%',
    y2026: '20.0%',
    paidOff: '100.0%',
    highlight: false,
  },
  {
    component: 'Debt Weight (Loan-to-Value)',
    symbol: '1 - d',
    y2019: '80.0%',
    y2026: '80.0%',
    paidOff: '0.0%',
    highlight: false,
  },
  {
    component: 'Nominal Mortgage Interest Rate',
    symbol: 'r_d',
    y2019: '3.00%',
    y2026: '6.50%',
    paidOff: '0.00%',
    highlight: false,
  },
  {
    component: 'Expected Nominal Equity Return',
    symbol: 'r_e',
    y2019: '6.57%',
    y2026: '8.00%',
    paidOff: '8.00%',
    highlight: false,
  },
  {
    component: 'Expected Home Appreciation Rate',
    symbol: 'g_h',
    y2019: '3.00%',
    y2026: '3.50%',
    paidOff: '3.50%',
    highlight: false,
  },
  {
    component: 'Weighted Cost of Debt',
    symbol: '(1 - d)r_d',
    y2019: '2.40%',
    y2026: '5.20%',
    paidOff: '0.00%',
    highlight: false,
  },
  {
    component: 'Weighted Net Cost of Equity',
    symbol: 'd(r_e - g_h)',
    y2019: '0.71%',
    y2026: '0.90%',
    paidOff: '4.50%',
    highlight: false,
  },
  {
    component: 'Total Cost of Capital',
    symbol: 'c_{\\text{cap}}',
    y2019: '3.11%',
    y2026: '6.10%',
    paidOff: '4.50%',
    highlight: true,
  },
  {
    component: 'Property Tax Rate',
    symbol: '\\tau_p',
    y2019: '1.00%',
    y2026: '1.25%',
    paidOff: '1.25%',
    highlight: false,
  },
  {
    component: 'Maintenance / CapEx Reserve',
    symbol: 'm',
    y2019: '1.00%',
    y2026: '1.25%',
    paidOff: '1.25%',
    highlight: false,
  },
  {
    component: 'Homeowners Insurance Rate',
    symbol: 'i_h',
    y2019: '0.40%',
    y2026: '0.50%',
    paidOff: '0.50%',
    highlight: false,
  },
  {
    component: 'Total Annual Unrecoverable Rate',
    symbol: 'u',
    y2019: '5.51%',
    y2026: '9.10%',
    paidOff: '7.50%',
    highlight: true,
  },
  {
    component: 'Monthly Breakeven per $100k Value',
    symbol: 'R_{\\text{breakeven}}',
    y2019: '$459.50 / mo',
    y2026: '$758.33 / mo',
    paidOff: '$625.00 / mo',
    highlight: true,
  },
  {
    component: 'Breakeven Rent on $500,000 Home',
    symbol: 'R_{\\text{breakeven}}',
    y2019: '$2,297.50 / mo',
    y2026: '$3,791.67 / mo',
    paidOff: '$3,125.00 / mo',
    highlight: true,
  },
];

const PR_BANDS = [
  {
    band: 'Below 12',
    yield: '> 8.3%',
    signal: 'Buy Strongly Favored',
    tone: 'positive',
    mechanism:
      'Total ownership carrying costs closely match or fall below comparable market rent, allowing immediate equity outperformance.',
  },
  {
    band: '12 to 15',
    yield: '6.7% – 8.3%',
    signal: 'Buy Generally Favored',
    tone: 'positive',
    mechanism:
      'Buying outperforms provided the household remains in the property for at least 4 to 5 years to amortize round-trip transaction costs.',
  },
  {
    band: '15 to 20',
    yield: '5.0% – 6.7%',
    signal: 'Transitional Zone',
    tone: 'neutral',
    mechanism:
      'Outcomes are highly sensitive to mortgage interest rates, local appreciation trajectories, tax deductibility, and holding periods.',
  },
  {
    band: '20 to 25',
    yield: '4.0% – 5.0%',
    signal: 'Rent Generally Favored',
    tone: 'negative',
    mechanism:
      'The monthly ownership premium is substantial, requiring above-average price appreciation (>5% annually) for a buyer to catch up.',
  },
  {
    band: 'Above 25',
    yield: '< 4.0%',
    signal: 'Rent Strongly Favored',
    tone: 'negative',
    mechanism:
      'Characteristic of supply-constrained coastal metros; renting dominates because the tenant saves and compounds a massive monthly cash-flow surplus.',
  },
];

const BASELINE_30YR_ROWS = [
  {
    year: 'Year 1',
    homeVal: '$517,500',
    loanBal: '$395,529',
    buyerEq: '$90,921',
    renterPort: '$139,299',
    advantage: '-$48,378',
    ownerMo: '$3,778',
    renterMo: '$2,520',
    cumUnrecBuy: '$40,868',
    cumUnrecRent: '$30,240',
  },
  {
    year: 'Year 3',
    homeVal: '$554,359',
    loanBal: '$385,669',
    buyerEq: '$135,428',
    renterPort: '$192,722',
    advantage: '-$57,293',
    ownerMo: '$3,867',
    renterMo: '$2,672',
    cumUnrecBuy: '$123,280',
    cumUnrecRent: '$93,447',
  },
  {
    year: 'Year 5',
    homeVal: '$593,843',
    loanBal: '$374,444',
    buyerEq: '$183,769',
    renterPort: '$253,401',
    advantage: '-$69,633',
    ownerMo: '$3,963',
    renterMo: '$2,834',
    cumUnrecBuy: '$206,577',
    cumUnrecRent: '$160,474',
  },
  {
    year: 'Year 7',
    homeVal: '$636,140',
    loanBal: '$361,665',
    buyerEq: '$236,306',
    renterPort: '$322,471',
    advantage: '-$86,165',
    ownerMo: '$4,065',
    renterMo: '$3,005',
    cumUnrecBuy: '$290,731',
    cumUnrecRent: '$231,554',
  },
  {
    year: 'Year 10',
    homeVal: '$705,299',
    loanBal: '$339,105',
    buyerEq: '$323,877',
    renterPort: '$444,748',
    advantage: '-$120,871',
    ownerMo: '$4,232',
    renterMo: '$3,282',
    cumUnrecBuy: '$418,468',
    cumUnrecRent: '$346,316',
  },
  {
    year: 'Year 15',
    homeVal: '$837,674',
    loanBal: '$290,237',
    buyerEq: '$497,177',
    renterPort: '$712,477',
    advantage: '-$215,300',
    ownerMo: '$4,552',
    renterMo: '$3,801',
    cumUnrecBuy: '$634,761',
    cumUnrecRent: '$561,567',
  },
  {
    year: 'Year 20',
    homeVal: '$994,894',
    loanBal: '$222,661',
    buyerEq: '$712,540',
    renterPort: '$1,090,893',
    advantage: '-$378,354',
    ownerMo: '$4,931',
    renterMo: '$4,404',
    cumUnrecBuy: '$853,642',
    cumUnrecRent: '$810,911',
  },
  {
    year: 'Year 30',
    homeVal: '$1,403,397',
    loanBal: '$0',
    buyerEq: '$1,319,193',
    renterPort: '$2,404,331',
    advantage: '-$1,085,138',
    ownerMo: '$5,918',
    renterMo: '$5,911',
    cumUnrecBuy: '$1,284,518',
    cumUnrecRent: '$1,434,462',
  },
];

const CAPEX_ROWS = [
  {
    system: 'Roofing System (Asphalt to Architectural)',
    cost: '$8,000 – $15,000',
    lifecycle: '20 – 25 Years',
    sinking: '$320 – $750 / yr',
    classification: 'Mandatory Structural CapEx',
  },
  {
    system: 'HVAC System (Central Furnace & AC)',
    cost: '$5,000 – $7,500',
    lifecycle: '12 – 15 Years',
    sinking: '$333 – $625 / yr',
    classification: 'Mandatory Mechanical CapEx',
  },
  {
    system: 'Water Heater Assembly',
    cost: '$1,200 – $2,000',
    lifecycle: '10 – 12 Years',
    sinking: '$100 – $200 / yr',
    classification: 'Mandatory Mechanical CapEx',
  },
  {
    system: 'Driveway / Parking Surface Overlay',
    cost: '$3 – $7 per sq. ft.',
    lifecycle: '15 – 20 Years',
    sinking: '$150 – $400 / yr',
    classification: 'Exterior Maintenance CapEx',
  },
  {
    system: 'Kitchen & Bath Modernization',
    cost: '$10,000 – $35,000+',
    lifecycle: '15 – 20 Years (As needed)',
    sinking: '$500 – $2,000+ / yr',
    classification: 'Value-Preserving / Growth CapEx',
  },
];

const TAX_PROVISION_ROWS = [
  {
    provision: 'Standard Deduction (MFJ / Single / HoH)',
    tcja: 'Indexed annually ($31,500 MFJ in 2025)',
    obbba: '$32,200 MFJ / $16,100 Single / $24,150 HoH',
    sunset: 'Permanent structure, indexed for inflation (≈ 2.2% increase in 2026).',
  },
  {
    provision: 'SALT Deduction Cap',
    tcja: '$10,000 ($5,000 MFS)',
    obbba: '$40,400 ($20,200 MFS)',
    sunset: 'Increases 1%/yr through 2029 ($41,624); reverts to $10,000 in 2030.',
  },
  {
    provision: 'SALT MAGI Phaseout Threshold',
    tcja: 'Not applicable',
    obbba: '$505,000 MAGI ($252,500 MFS)',
    sunset: 'Cap reduced by 30% of excess MAGI down to a $10,000 statutory floor.',
  },
  {
    provision: 'Mortgage Interest Deduction (MID) Debt Limit',
    tcja: '$750,000 acquisition debt ($375,000 MFS)',
    obbba: '$750,000 permanent limit; HELOC interest excluded',
    sunset: 'Made permanent by OBBBA.',
  },
  {
    provision: 'Private Mortgage Insurance (PMI) Deductibility',
    tcja: 'Expired after 2021',
    obbba: 'Restored as deductible mortgage interest in 2026',
    sunset: 'Applies to acquisition debt; subject to income phaseouts.',
  },
  {
    provision: 'Residential Clean Energy Credits (Solar/Heat Pumps)',
    tcja: '30% tax credit',
    obbba: 'Expired (0% credit)',
    sunset: 'Terminated for all purchases after December 31, 2025.',
  },
  {
    provision: 'Section 121 Primary Residence Gain Exclusion',
    tcja: '$250,000 Single / $500,000 MFJ',
    obbba: '$250,000 Single / $500,000 MFJ',
    sunset: 'Requires owning and occupying 2 of preceding 5 years.',
  },
];

const SENSITIVITY_ROWS = [
  {
    scenario: 'Buyer-Friendly Market',
    priceRent: '$375k / $2,500',
    pr: '12.5',
    rate: '6.0%',
    apprec: '4.0%',
    eqReturn: '7.5%',
    y5: '+$15,820',
    y10: '+$82,549',
    y20: '+$286,864',
    y30: '+$629,168',
    breakeven: 'Year 4',
    y5Pos: true,
    y10Pos: true,
    y20Pos: true,
    y30Pos: true,
  },
  {
    scenario: 'Booming Appreciation',
    priceRent: '$500k / $2,500',
    pr: '16.7',
    rate: '6.5%',
    apprec: '6.0%',
    eqReturn: '8.0%',
    y5: '-$3,151',
    y10: '+$32,231',
    y20: '+$238',
    y30: '-$503,888',
    breakeven: 'Year 6',
    y5Pos: false,
    y10Pos: true,
    y20Pos: true,
    y30Pos: false,
  },
  {
    scenario: 'Refinance / 5% Rate',
    priceRent: '$500k / $2,500',
    pr: '16.7',
    rate: '5.0%',
    apprec: '3.5%',
    eqReturn: '8.0%',
    y5: '-$35,624',
    y10: '-$40,760',
    y20: '-$148,468',
    y30: '-$566,094',
    breakeven: 'Never',
    y5Pos: false,
    y10Pos: false,
    y20Pos: false,
    y30Pos: false,
  },
  {
    scenario: 'Balanced Baseline',
    priceRent: '$500k / $2,500',
    pr: '16.7',
    rate: '6.5%',
    apprec: '3.5%',
    eqReturn: '8.0%',
    y5: '-$69,574',
    y10: '-$120,726',
    y20: '-$377,896',
    y30: '-$1,084,005',
    breakeven: 'Never',
    y5Pos: false,
    y10Pos: false,
    y20Pos: false,
    y30Pos: false,
  },
  {
    scenario: 'Flat Real Estate',
    priceRent: '$500k / $2,500',
    pr: '16.7',
    rate: '6.5%',
    apprec: '2.0%',
    eqReturn: '8.0%',
    y5: '-$106,300',
    y10: '-$196,321',
    y20: '-$518,065',
    y30: '-$1,196,061',
    breakeven: 'Never',
    y5Pos: false,
    y10Pos: false,
    y20Pos: false,
    y30Pos: false,
  },
  {
    scenario: 'High-Cost Coastal',
    priceRent: '$1.0M / $3,333',
    pr: '25.0',
    rate: '6.5%',
    apprec: '4.0%',
    eqReturn: '8.5%',
    y5: '-$204,789',
    y10: '-$444,946',
    y20: '-$1,675,889',
    y30: '-$5,159,167',
    breakeven: 'Never',
    y5Pos: false,
    y10Pos: false,
    y20Pos: false,
    y30Pos: false,
  },
];

const DECISION_DIMENSIONS = [
  {
    dimension: 'Cross-Sectional Valuation',
    formula: '\\text{P/R} = \\frac{P_0}{12 \\times R_0}',
    buyThreshold: 'P/R < 15',
    rentThreshold: 'P/R > 20 (Strongly > 25)',
    driver: 'Gross rental yield vs. debt and carrying cost',
  },
  {
    dimension: 'Unrecoverable Flow Parity',
    formula: 'R_{\\text{breakeven}} = \\frac{P_0 \\cdot u}{12}',
    buyThreshold: 'Market Rent > R_breakeven',
    rentThreshold: 'Market Rent < R_breakeven',
    driver: 'Cost of debt (r_d), equity spread (r_e − g_h), and CapEx',
  },
  {
    dimension: 'Holding Horizon (T)',
    formula: 'T \\text{ (Planned years prior to moving)}',
    buyThreshold: 'T ≥ 7 to 10 years',
    rentThreshold: 'T < 5 years (Always < 3)',
    driver: 'Amortization of 8%–10% round-trip transaction costs',
  },
  {
    dimension: 'Tax Subsidy Capture',
    formula: '\\text{Itemized } (I_1 + \\text{SALT}) \\text{ vs } \\$32,200',
    buyThreshold: 'High SALT (>$25k) & MAGI <$505k',
    rentThreshold: 'Standard deduction filer; low-tax state',
    driver: 'OBBBA $40,400 SALT cap unlocking MID deductibility',
  },
  {
    dimension: 'Behavioral Savings Rate',
    formula: '\\text{Fraction of } \\Delta\\text{CF}_t \\text{ invested}',
    buyThreshold: 'Low discipline (Invested < 50%)',
    rentThreshold: 'High automated investment (100% of ΔCF_t)',
    driver: 'Contractual forced savings vs. market compounding',
  },
];

export default function RentVersusBuyPage() {
  const [selectedRegime, setSelectedRegime] = useState<'all' | '2019' | '2026' | 'paidoff'>('all');
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number | null>(null);

  return (
    <ArticleFrame
      slug="rent-versus-buy-frameworks"
      additionalDisclaimer="Real estate valuations, mortgage interest calculations, tax rules under OBBBA, and equity market returns are provided for educational and analytical purposes only. Individual financial outcomes depend on localized housing market dynamics, tax filing specifics, and personalized investment horizon and risk tolerance."
    >
      <div className="max-w-5xl mx-auto space-y-12 text-slate-800 dark:text-slate-200 font-sans">
        {/* Standout Figures Compact Stat Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
              2026 Unrecoverable Rate (u)
            </div>
            <div className="mt-1 font-mono tabular-nums text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A]">
              9.10% / yr
            </div>
            <div className="mt-1 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
              Up from 5.51% in 2019 ($3,792/mo on $500k)
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
              30-Yr Baseline Net Worth Diff
            </div>
            <div className="mt-1 font-mono tabular-nums text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A]">
              -$1,085,138
            </div>
            <div className="mt-1 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
              Buy ($1.32M) vs. Rent &amp; Invest ($2.40M)
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Round-Trip Transaction Friction
            </div>
            <div className="mt-1 font-mono tabular-nums text-2xl font-semibold text-[#A8672E] dark:text-[#D08F52]">
              8.0% – 10.0%
            </div>
            <div className="mt-1 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
              2%–5% entry + 6%–8% disposition haircut
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
              2026 OBBBA SALT Cap
            </div>
            <div className="mt-1 font-mono tabular-nums text-2xl font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
              $40,400
            </div>
            <div className="mt-1 font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
              Quadrupled from $10k ($505k MAGI phaseout)
            </div>
          </div>
        </div>

        {/* Key Takeaways Bulleted Card */}
        <div className="rounded-lg border border-[#A8672E]/30 dark:border-[#D08F52]/30 bg-amber-50/40 dark:bg-slate-900/90 p-5 space-y-3">
          <div className="font-serif text-lg text-slate-900 dark:text-slate-100 flex items-center justify-between">
            <span>Executive Takeaways</span>
            <span className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52]">
              Hover or focus underlined terms for definitions
            </span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
            <li>
              Comparing a monthly lease payment directly to a mortgage principal-and-interest (<span className="font-mono tabular-nums">P&amp;I</span>) quote conflates cash flow with economic expense and ignores balance-sheet opportunity costs.
            </li>
            <li>
              An apples-to-apples analysis requires isolating <Jargon term="Unrecoverable Costs" /> (flow parity via the <Jargon term="Unrecoverable Cost Framework" />) and tracking compounded wealth across identical budget constraints (stock parity via the <Jargon term="Terminal Net Worth Parity Model" />).
            </li>
            <li>
              Under a <span className="font-mono tabular-nums">6.50%</span> mortgage rate, <span className="font-mono tabular-nums">8.00%</span> expected equity return, and <span className="font-mono tabular-nums">3.50%</span> home appreciation, the generalized annual unrecoverable cost rate climbs to <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">9.10%</span> of home value—requiring <span className="font-mono tabular-nums">$3,791.67/month</span> in breakeven rent on a <span className="font-mono tabular-nums">$500,000</span> purchase.
            </li>
            <li>
              While disciplined renters who automatically invest upfront and monthly surpluses outperform buyers in moderate-to-high <Jargon term="Price-to-Rent (P/R) Ratio" label="Price-to-Rent (P/R)" /> markets, empirical Federal Reserve data shows retired homeowners hold roughly <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">40×</span> the median net worth of retired renters because mortgages enforce contractual forced savings.
            </li>
          </ul>
        </div>

        {/* Section 1 */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            Deconstructing the Monthly Payment Fallacy
          </h2>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            The most persistent analytical error in household finance is comparing a monthly rent check directly to a monthly mortgage payment, resting on a category error that conflates total cash outflow with economic expense.
          </p>

          {/* Two-Column Dichotomy: Popular Fallacy vs Rigorous Accounting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-white dark:bg-slate-900 p-5 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                Popular Discourse Fallacy
              </div>
              <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">
                Naive Cash-Flow Comparison
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                <li>
                  Judges homeownership superior whenever a <span className="font-mono tabular-nums">$2,500</span> monthly rent equals or exceeds quoted monthly mortgage <span className="font-mono tabular-nums">P&amp;I</span>.
                </li>
                <li>
                  Dismisses renting as &ldquo;throwing money away&rdquo; because rental outflows accumulate zero residual asset value.
                </li>
                <li>
                  Treats the monthly mortgage payment as the ceiling of housing cost rather than the floor.
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-white dark:bg-slate-900 p-5 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C]">
                Economic Reality
              </div>
              <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">
                Unrecoverable Cost vs. Equity Transfer
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                <li>
                  Separates <Jargon term="Unrecoverable Costs" /> (zero residual value) from <Jargon term="Equity Transfers" /> (forced savings into an illiquid, leveraged asset).
                </li>
                <li>
                  <strong>Renter unrecoverable cost:</strong> Strictly monthly lease payment plus renter&apos;s insurance.
                </li>
                <li>
                  <strong>Homeowner unrecoverable cost:</strong> Mortgage interest, property taxes, homeowners insurance, HOA dues, <Jargon term="CapEx Lifecycle" label="ongoing CapEx maintenance" />, entry/exit transaction friction, and <Jargon term="Opportunity Cost of Home Equity" label="home equity opportunity cost" />.
                </li>
              </ul>
            </div>
          </div>

          {/* Two-Column Dichotomy: Two Complementary Analytical Frameworks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                Economic Flow Parity
              </div>
              <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">
                <Jargon term="Unrecoverable Cost Framework" />
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                <li>
                  Developed and popularized in portfolio management literature by Benjamin Felix at PWL Capital.
                </li>
                <li>
                  Strips out principal paydown to isolate annual non-recoverable ownership expenses as a fraction of property value.
                </li>
                <li>
                  Establishes a direct monthly breakeven rent benchmark (<InlineMath math="R_{\text{breakeven}}" />).
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                Balance-Sheet Stock Parity
              </div>
              <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">
                <Jargon term="Terminal Net Worth Parity Model" />
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                <li>
                  Used in institutional discounted cash flow (DCF) and dynamic wealth simulations over holding horizon <InlineMath math="T" />.
                </li>
                <li>
                  Systematically invests avoided down payment, buyer closing costs, and monthly cash-flow surpluses into a diversified equity portfolio.
                </li>
                <li>
                  Compares buyer&apos;s net liquidated home equity at year <InlineMath math="T" /> (after selling commissions and remaining mortgage debt) against the renter&apos;s terminal portfolio value.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-8">
          <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            Mathematical Formulation of the Two Frameworks
          </h2>

          {/* Subsection: Mortgage Amortization */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Mortgage Amortization and Cash Flow Mechanics
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              For a residential property purchased at initial price <InlineMath math="P_0" /> with down payment fraction <InlineMath math="d \in (0, 1]" />, initial mortgage principal is <InlineMath math="L = P_0(1 - d)" />. Because amortization is nonlinear, early payments are heavily front-loaded with unrecoverable interest.
            </p>

            <FormulaPanel
              title="Standard Fixed-Rate Mortgage Annuity, Monthly Bifurcation & Remaining Balance"
              math={[
                "M_{\\text{P\\&I}} = L \\cdot \\frac{c(1 + c)^N}{(1 + c)^N - 1}",
                "I_m = B_{m-1} \\cdot c, \\quad \\Delta B_m = M_{\\text{P\\&I}} - I_m, \\quad B_m = B_{m-1} - \\Delta B_m",
                "B_k = L \\cdot \\frac{(1 + c)^N - (1 + c)^k}{(1 + c)^N - 1}"
              ]}
              variables={[
                { symbol: "L = P_0(1 - d)", desc: 'Initial mortgage loan principal (B_0 = L)' },
                { symbol: "c = r_d / 12", desc: 'Monthly periodic rate from nominal annual rate r_d' },
                { symbol: "N = 12 \\times T_{\\text{loan}}", desc: 'Total loan term in months (360 for 30-year loan)' },
                { symbol: "I_m, \\Delta B_m", desc: 'Month m unrecoverable interest & principal reduction' },
                { symbol: "B_k", desc: 'Closed-form remaining balance after k = 12t months' },
              ]}
              workedExample={
                <div className="space-y-1">
                  <div>
                    • Inputs: <span className="text-white">P_0 = $500,000</span>, <span className="text-white">d = 20%</span> (<span className="text-white">L = $400,000</span>), <span className="text-white">r_d = 6.5%</span>, <span className="text-white">N = 360 months</span> (30 years)
                  </div>
                  <div>
                    • Constant Payment: <span className="text-[#D08F52]">M_P&amp;I = $2,528.27/mo</span> ($30,339.24 annually)
                  </div>
                  <div>
                    • Year 1 Unrecoverable Interest: <span className="text-[#E2694A]">$25,868.00</span> (85.26% of payment, or $2,155.67/mo)
                  </div>
                  <div>
                    • Year 1 Principal Reduction: <span className="text-[#3CBF9C]">$4,471.24</span> (14.74% of payment, or $372.60/mo) → Ending Balance <span className="text-white">B_12 = $395,529</span>
                  </div>
                </div>
              }
            />
          </div>

          {/* Subsection: Generalized Unrecoverable Cost Model */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              The Generalized Unrecoverable Cost Model
            </h3>

            {/* Dichotomy: 2019 5% Rule vs Paid-Off Home Fallacy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  2019 Historical Derivation
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  The <Jargon term="5% Rule" /> Baseline
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Aggregated property taxes (<InlineMath math="\tau_p = 1.0\%" />), maintenance (<InlineMath math="m = 1.0\%" />), and cost of capital (<InlineMath math="c_{\text{cap}} = 3.0\%" />).
                  </li>
                  <li>
                    From 1900 to 2017, global residential real estate returned <span className="font-mono tabular-nums">1.3%</span> real above <span className="font-mono tabular-nums">1.7%</span> inflation (<InlineMath math="g_h = 3.0\%" /> nominal), while PWL Capital projected nominal global equity returns at <InlineMath math="r_e = 6.57\%" />.
                  </li>
                  <li>
                    Locking capital in home equity incurred an opportunity cost spread of <InlineMath math="r_e - g_h = 6.57\% - 3.00\% = 3.57\%" /> (conservatively rounded to <span className="font-mono tabular-nums">3.0%</span>), matching 2019 mortgage rates (<InlineMath math="r_d \approx 3.0\%" />).
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                  Capital Equivalence Insight
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Why Paying Off a Mortgage Does Not Make Shelter Free
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    In 2019, whether a homeowner held <span className="font-mono tabular-nums">20%</span> equity or a <span className="font-mono tabular-nums">100%</span> paid-off home, total cost of capital remained roughly <span className="font-mono tabular-nums">3.0%</span>: extinguishing debt merely replaced a <span className="font-mono tabular-nums">3.0%</span> interest bill with a <span className="font-mono tabular-nums">3.0%</span> <Jargon term="Opportunity Cost of Home Equity" label="equity opportunity cost" />.
                  </li>
                  <li>
                    In 2026 (<InlineMath math="r_e = 8.0\%" />, <InlineMath math="g_h = 3.5\%" />), a <span className="font-mono tabular-nums">100%</span> paid-off home carries a <span className="font-mono tabular-nums">4.50%</span> equity opportunity cost plus <span className="font-mono tabular-nums">3.00%</span> in taxes, maintenance, and insurance—an unrecoverable rate of <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">7.50%</span> (<span className="font-mono tabular-nums">$3,125/mo</span> on a <span className="font-mono tabular-nums">$500k</span> home).
                  </li>
                </ul>
              </div>
            </div>

            <FormulaPanel
              title="Generalized Annual Unrecoverable Cost Rate (u) & Monthly Breakeven Rent"
              math={[
                "u = (1 - d)r_d + d(r_e - g_h) + \\tau_p + m + i_h + h_{\\text{hoa}} - \\psi_{\\text{tax}}",
                "R_{\\text{breakeven}} = \\frac{P_0 \\cdot u}{12}"
              ]}
              variables={[
                { symbol: "(1 - d)r_d", desc: 'Weighted cost of mortgage debt' },
                { symbol: "d(r_e - g_h)", desc: 'Weighted net opportunity cost of home equity' },
                { symbol: "\\tau_p + m + i_h + h_{\\text{hoa}}", desc: 'Property tax, maintenance, insurance, and HOA rates' },
                { symbol: "\\psi_{\\text{tax}}", desc: 'Effective federal income tax subsidy rate (% of home value)' },
              ]}
              workedExample={
                <div className="space-y-1">
                  <div>
                    • 2019 Low-Rate Baseline (<span className="text-white">P_0 = $500,000</span>, <span className="text-white">r_d = 3.0%</span>): <span className="text-[#3CBF9C]">u = 5.51%</span> → <span className="text-white">R_breakeven = $2,297.50/mo</span> ($459.50 per $100k value)
                  </div>
                  <div>
                    • 2026 Moderate/High-Rate Regime (<span className="text-white">P_0 = $500,000</span>, <span className="text-white">r_d = 6.5%</span>): <span className="text-[#E2694A]">u = 9.10%</span> → <span className="text-white">R_breakeven = $3,791.67/mo</span> ($758.33 per $100k value)
                  </div>
                  <div>
                    • Decision Rule: If comparable property rents for less than <span className="text-[#D08F52]">R_breakeven</span>, renting and investing unspent capital generates superior risk-adjusted wealth.
                  </div>
                </div>
              }
            />

            {/* Regime Filter Controls + Unrecoverable Cost Comparison Table */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Unrecoverable Cost Regime Comparison (2019 vs. 2026)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Compare All Regimes' },
                    { id: '2019', label: '2019 Low-Rate (5.51%)' },
                    { id: '2026', label: '2026 Financed (9.10%)' },
                    { id: 'paidoff', label: '2026 100% Paid-Off (7.50%)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedRegime(tab.id as 'all' | '2019' | '2026' | 'paidoff')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        selectedRegime === tab.id
                          ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-slate-950 font-semibold'
                          : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
                      <th className="py-3 px-4">Cost Component / Parameter</th>
                      <th className="py-3 px-3">Symbol</th>
                      {(selectedRegime === 'all' || selectedRegime === '2019') && (
                        <th className="py-3 px-4 text-right">2019 Low-Rate Baseline</th>
                      )}
                      {(selectedRegime === 'all' || selectedRegime === '2026') && (
                        <th className="py-3 px-4 text-right">2026 Moderate/High-Rate Regime</th>
                      )}
                      {(selectedRegime === 'all' || selectedRegime === 'paidoff') && (
                        <th className="py-3 px-4 text-right">100% Paid-Off Home (2026)</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono tabular-nums">
                    {UNRECOVERABLE_REGIME_ROWS.map((row, idx) => (
                      <tr
                        key={idx}
                        className={
                          row.highlight
                            ? 'bg-amber-50/60 dark:bg-slate-800/50 font-semibold text-slate-900 dark:text-slate-100'
                            : 'text-slate-700 dark:text-slate-300'
                        }
                      >
                        <td className="py-2.5 px-4 font-sans">{row.component}</td>
                        <td className="py-2.5 px-3 text-[#A8672E] dark:text-[#D08F52]">
                          <InlineMath math={row.symbol} />
                        </td>
                        {(selectedRegime === 'all' || selectedRegime === '2019') && (
                          <td className="py-2.5 px-4 text-right">{row.y2019}</td>
                        )}
                        {(selectedRegime === 'all' || selectedRegime === '2026') && (
                          <td
                            className={`py-2.5 px-4 text-right ${
                              row.highlight ? 'text-[#BC4128] dark:text-[#E2694A]' : ''
                            }`}
                          >
                            {row.y2026}
                          </td>
                        )}
                        {(selectedRegime === 'all' || selectedRegime === 'paidoff') && (
                          <td className="py-2.5 px-4 text-right">{row.paidOff}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Subsection: Price-to-Rent Ratio */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              The Price-to-Rent Ratio as a Cross-Sectional Market Filter
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              In real estate economics, the <Jargon term="Price-to-Rent (P/R) Ratio" /> serves as a cross-sectional valuation multiple, while its reciprocal yields the property&apos;s <Jargon term="Gross Annual Rental Yield" />.
            </p>

            <FormulaPanel
              title="Price-to-Rent (P/R) Multiple & Year-1 Flow Equivalence Rule"
              math={[
                "\\text{P/R Ratio} = \\frac{P_0}{12 \\times R_0} \\quad \\Longleftrightarrow \\quad \\text{Gross Annual Rental Yield} = \\frac{12 \\times R_0}{P_0} = \\frac{1}{\\text{P/R}}",
                "\\text{Year-1 Rent Favored Condition: } \\frac{1}{\\text{P/R}} < u \\quad \\left( \\text{or equivalently } \\text{P/R} > \\frac{1}{u} \\right)"
              ]}
              variables={[
                { symbol: "P_0", desc: 'Initial purchase price of target property' },
                { symbol: "R_0", desc: 'Current monthly rent for identical size, quality, and neighborhood' },
                { symbol: "u", desc: 'Generalized annual unrecoverable cost rate' },
              ]}
            />

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
                    <th className="py-3 px-4">P/R Valuation Band</th>
                    <th className="py-3 px-4">Gross Annual Rental Yield</th>
                    <th className="py-3 px-4">Strategic Allocation Signal</th>
                    <th className="py-3 px-4">Underlying Cash-Flow and Balance-Sheet Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {PR_BANDS.map((b, i) => (
                    <tr key={i} className="text-slate-700 dark:text-slate-300">
                      <td className="py-3 px-4 font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                        {b.band}
                      </td>
                      <td className="py-3 px-4 font-mono tabular-nums">{b.yield}</td>
                      <td
                        className={`py-3 px-4 font-mono text-xs font-semibold ${
                          b.tone === 'positive'
                            ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                            : b.tone === 'negative'
                            ? 'text-[#BC4128] dark:text-[#E2694A]'
                            : 'text-[#A8672E] dark:text-[#D08F52]'
                        }`}
                      >
                        {b.signal}
                      </td>
                      <td className="py-3 px-4 text-xs sm:text-sm leading-relaxed">{b.mechanism}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subsection: Terminal Net Worth Parity */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Terminal Net Worth Parity (Multi-Period Dynamic Model)
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              To capture the multi-decade interplay of fixed nominal mortgage payments against inflation-indexed rents, property values, taxes, and maintenance over holding horizon <InlineMath math="T" />, the <Jargon term="Terminal Net Worth Parity Model" /> tracks the complete balance sheet of both cohorts under strict capital parity.
            </p>

            <FormulaPanel
              title="Multi-Period Cash Outflows & Terminal Net Wealth Equations"
              math={[
                "W_0 = P_0(d + c_{\\text{buy}})",
                "\\text{CF}_{\\text{buy}, t} = 12 \\cdot M_{\\text{P\\&I}} + P_{t-1}(\\tau_p + m + i_h) + \\text{HOA}_0(1 + \\pi)^{t-1} + \\text{PMI}_t - \\text{TaxSavings}_t",
                "\\text{CF}_{\\text{rent}, t} = 12 \\cdot R_0(1 + g_r)^{t-1} + \\text{Ins}_{\\text{rent}, 0}(1 + \\pi)^{t-1}",
                "\\text{NW}_{\\text{buy}}(T) = P_0(1 + g_h)^T(1 - c_{\\text{sell}}) - B_{12T}",
                "\\text{NW}_{\\text{rent}}(T) = P_0(d + c_{\\text{buy}})(1 + r_e)^T + \\sum_{t=1}^T \\left[ (\\text{CF}_{\\text{buy}, t} - \\text{CF}_{\\text{rent}, t}) \\cdot (1 + r_e)^{T - t} \\right]",
                "\\Delta \\text{NW}(T) = \\text{NW}_{\\text{buy}}(T) - \\text{NW}_{\\text{rent}}(T) \\quad (\\text{Breakeven } T^* \\text{ is first } T \\text{ where } \\Delta \\text{NW}(T) \\ge 0)"
              ]}
              variables={[
                { symbol: "W_0", desc: 'Initial liquid capital deployed at t = 0 (down payment d + closing c_buy)' },
                { symbol: "P_{t-1} = P_0(1 + g_h)^{t-1}", desc: 'Appreciated property value entering year t' },
                { symbol: "g_r, \\pi", desc: 'Annual rent escalation rate and general inflation rate' },
                { symbol: "c_{\\text{sell}}", desc: 'Total selling transaction cost as a fraction of terminal sale price' },
              ]}
            />
          </div>

          {/* Subsection: 30-Year Baseline Simulation */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Quantitative Walkthrough of the Thirty-Year Baseline Simulation
            </h3>

            {/* Baseline Assumptions Summary Pill Row */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/70 p-3.5 font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-[#A8672E] dark:text-[#D08F52]">Simulation Parameters: </span>
              P_0 = $500,000 | d = 20% | r_d = 6.5% | c_buy = 3.0% | c_sell = 6.0% | τ_p = 1.25% | m = 1.25% | i_h = 0.50% | g_h = 3.5% | R_0 = $2,500/mo (P/R = 16.7) | g_r = 3.0% | Renter Ins. = $240/yr | r_e = 8.0% | MFJ $32,200 Std. Deduction (24% marginal bracket)
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-right border-collapse text-xs font-mono tabular-nums">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                    <th className="py-3 px-3 text-left">Horizon</th>
                    <th className="py-3 px-3">Appreciated Home Value</th>
                    <th className="py-3 px-3">Remaining Loan Balance</th>
                    <th className="py-3 px-3">Buyer Net Liquidated Equity</th>
                    <th className="py-3 px-3">Renter Portfolio Balance</th>
                    <th className="py-3 px-3">Net Worth Advantage (Buy − Rent)</th>
                    <th className="py-3 px-3">Owner Monthly Cash Outlay</th>
                    <th className="py-3 px-3">Renter Monthly Cash Outlay</th>
                    <th className="py-3 px-3">Cumulative Unrec. Cash (Buy)</th>
                    <th className="py-3 px-3">Cumulative Unrec. Cash (Rent)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {BASELINE_30YR_ROWS.map((r, i) => (
                    <tr
                      key={i}
                      className={
                        r.year === 'Year 30'
                          ? 'bg-amber-50/50 dark:bg-slate-800/50 font-semibold text-slate-900 dark:text-slate-100'
                          : 'text-slate-700 dark:text-slate-300'
                      }
                    >
                      <td className="py-2.5 px-3 text-left font-semibold text-slate-900 dark:text-slate-100">
                        {r.year}
                      </td>
                      <td className="py-2.5 px-3">{r.homeVal}</td>
                      <td className="py-2.5 px-3">{r.loanBal}</td>
                      <td className="py-2.5 px-3 text-[#1D8A70] dark:text-[#3CBF9C]">{r.buyerEq}</td>
                      <td className="py-2.5 px-3 text-[#A8672E] dark:text-[#D08F52]">{r.renterPort}</td>
                      <td className="py-2.5 px-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">
                        {r.advantage}
                      </td>
                      <td className="py-2.5 px-3">{r.ownerMo}</td>
                      <td className="py-2.5 px-3">{r.renterMo}</td>
                      <td className="py-2.5 px-3">{r.cumUnrecBuy}</td>
                      <td className="py-2.5 px-3">{r.cumUnrecRent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Two-Column Dichotomy: Two Profound Second-Order Dynamics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  Second-Order Dynamic
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Paradox of Cumulative Unrecoverable Cash vs. Compounded Wealth
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Over 30 years, the homeowner expends <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">$1,284,518</span> in cumulative unrecoverable cash costs—<span className="font-mono tabular-nums">$149,944</span> less than the <span className="font-mono tabular-nums">$1,434,462</span> cumulative rent paid by the tenant.
                  </li>
                  <li>
                    Yet at Year 30, the renter&apos;s net worth (<span className="font-mono tabular-nums">$2,404,331</span>) exceeds the homeowner&apos;s net liquidated equity (<span className="font-mono tabular-nums">$1,319,193</span>) by <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">$1,085,138</span>.
                  </li>
                  <li>
                    This occurs because the renter&apos;s cash advantage is front-loaded: <span className="font-mono tabular-nums">$115,000</span> in avoided upfront capital (<span className="font-mono tabular-nums">$100k</span> down + <span className="font-mono tabular-nums">$15k</span> closing) and Year 1–15 monthly surpluses (<span className="font-mono tabular-nums">$1,258/mo</span> in Year 1; <span className="font-mono tabular-nums">$950/mo</span> in Year 10) compound at <span className="font-mono tabular-nums">8.0%</span> for decades.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                  Second-Order Dynamic
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Refuting the &ldquo;Fixed Housing Cost&rdquo; Mortgage Myth
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    While the <span className="font-mono tabular-nums">$2,528/mo</span> <span className="font-mono tabular-nums">P&amp;I</span> payment remains static in nominal terms, property taxes, homeowners insurance, and maintenance scale continuously with property appreciation (<span className="font-mono tabular-nums">3.5%/yr</span>).
                  </li>
                  <li>
                    The homeowner&apos;s total monthly cash outlay rises from <span className="font-mono tabular-nums">$3,778</span> in Year 1 to <span className="font-mono tabular-nums">$4,232</span> in Year 10 and <span className="font-mono tabular-nums">$5,918</span> in Year 30.
                  </li>
                  <li>
                    Total ownership outlay fails to drop below the renter&apos;s monthly outlay (<span className="font-mono tabular-nums">$5,911</span>) until the final year of the 30-year loan.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Infographic Placement */}
        <InfographicSlot
          alt="Quantitative Frameworks for the Rent-versus-Buy Decision Infographic"
          label="Featured Infographic"
        />

        {/* Section 3 */}
        <section className="space-y-8">
          <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            Granular Analysis of the Hidden Variables
          </h2>

          {/* Subsection: Physical Depreciation and the CapEx Lifecycle */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Physical Depreciation and the <Jargon term="CapEx Lifecycle" />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1.5">
                <div className="font-mono text-xs uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C]">
                  Appreciating Component vs. Depreciating Structure
                </div>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Land appreciates while the physical structure is a depreciating asset requiring continuous capital infusion to preserve real value.
                  </li>
                  <li>
                    Even if a seller exits in Year 7 or 10 prior to replacing a major system, buyer inspection credits and price reductions price aged roofs, HVACs, and interiors directly into disposition proceeds.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1.5">
                <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                  Age-Adjusted Sinking Fund Reserve
                </div>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    <strong>Newly Constructed Homes:</strong> Average <span className="font-mono tabular-nums">1.0%</span> of property value annually in maintenance.
                  </li>
                  <li>
                    <strong>Properties Exceeding 20 Years of Age:</strong> Require <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">1.5% to 2.0%+</span> annually once major structural and mechanical systems amortize toward replacement.
                  </li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
                    <th className="py-3 px-4">Residential System / CapEx Component</th>
                    <th className="py-3 px-4">Typical 2026 Replacement Cost</th>
                    <th className="py-3 px-4">Expected Useful Lifecycle</th>
                    <th className="py-3 px-4">Annualized Sinking Fund Cost</th>
                    <th className="py-3 px-4">Expense Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {CAPEX_ROWS.map((c, i) => (
                    <tr key={i} className="text-slate-700 dark:text-slate-300">
                      <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-100">{c.system}</td>
                      <td className="py-2.5 px-4 font-mono tabular-nums">{c.cost}</td>
                      <td className="py-2.5 px-4 font-mono tabular-nums">{c.lifecycle}</td>
                      <td className="py-2.5 px-4 font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52] font-medium">
                        {c.sinking}
                      </td>
                      <td className="py-2.5 px-4 text-xs">{c.classification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subsection: Round-Trip Transaction Friction */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Round-Trip Transaction Friction and Post-NAR Settlement Realities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                  Entry &amp; Exit Illiquidity
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  <Jargon term="Round-Trip Transaction Haircut" /> (<span className="font-mono tabular-nums">8.0% – 10.0%</span>)
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    <strong>Acquisition (<span className="font-mono tabular-nums">2.0% – 5.0%</span>):</strong> Loan origination fees, appraisal charges, title insurance, escrow fees, and municipal transfer taxes.
                  </li>
                  <li>
                    <strong>Disposition (<span className="font-mono tabular-nums">6.0% – 8.0%</span>):</strong> Agent commissions, seller closing fees, and transfer taxes.
                  </li>
                  <li>
                    <strong>Year-1 Baseline Haircut:</strong> On the <span className="font-mono tabular-nums">$500,000</span> baseline model, <span className="font-mono tabular-nums">$15,000</span> entry cost and <span className="font-mono tabular-nums">$31,050</span> exit fee immediately erase <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">$46,050</span> of buyer net worth.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  Post-August 17, 2024 NAR Settlement
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Empirical Commission Compression Realities (2024–2026)
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Eliminated mandatory buyer-agent compensation offers on MLS and required written buyer representation agreements prior to touring.
                  </li>
                  <li>
                    Because cash-constrained buyers cannot easily pay their own representative atop down payments and closing costs, sellers continue offering concessions to preserve demand.
                  </li>
                  <li>
                    For homes under <span className="font-mono tabular-nums">$500,000</span>, average buyer-agent commissions edged higher from <span className="font-mono tabular-nums">2.42%</span> in Q3 2024 to <span className="font-mono tabular-nums">2.49%</span> in Q1 2025; modeling a <span className="font-mono tabular-nums">5.0%–6.0%</span> exit cost remains essential.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Subsection: Federal Tax Mechanics */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Federal Tax Mechanics, the <Jargon term="OBBBA" /> <Jargon term="SALT Deduction Cap" />, and <Jargon term="Tax Drag" />
            </h3>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
                    <th className="py-3 px-4">Tax Provision / Parameter</th>
                    <th className="py-3 px-4">Prior TCJA Regime (2018–2024)</th>
                    <th className="py-3 px-4">Current OBBBA Regime (2026 Tax Year)</th>
                    <th className="py-3 px-4">Scheduled Sunset / Phaseout Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {TAX_PROVISION_ROWS.map((row, idx) => (
                    <tr key={idx} className="text-slate-700 dark:text-slate-300">
                      <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                        {row.provision}
                      </td>
                      <td className="py-2.5 px-4 font-mono tabular-nums text-xs">{row.tcja}</td>
                      <td className="py-2.5 px-4 font-mono tabular-nums text-xs font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                        {row.obbba}
                      </td>
                      <td className="py-2.5 px-4 text-xs">{row.sunset}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <FormulaPanel
              title="Effective Marginal Federal Tax Subsidy Above the 2026 Standard Deduction"
              math={[
                "\\text{TaxSavings}_{2026} = \\tau_{\\text{marg}} \\cdot \\max\\left( 0, \\; I_t + \\text{PMI}_t + \\min(\\text{Tax}_{\\text{state}} + \\text{Tax}_{\\text{prop}}, \\text{SALT}_{\\text{cap}}(\\text{MAGI})) - \\text{SD}_{2026} \\right)"
              ]}
              variables={[
                { symbol: "\\tau_{\\text{marg}}", desc: 'Household marginal federal income tax rate' },
                { symbol: "I_t + \\text{PMI}_t", desc: 'Deductible mortgage interest (up to $750k debt) + restored PMI' },
                { symbol: "\\text{SALT}_{\\text{cap}}(\\text{MAGI})", desc: '$40,400 in 2026, phased down by 30% of MAGI > $505,000 (floor $10,000)' },
                { symbol: "\\text{SD}_{2026}", desc: '$32,200 Married Filing Jointly / $16,100 Single / $24,150 Head of Household' },
              ]}
              workedExampleTitle="Yale Budget Lab SALT–MID Cross-Subsidy Worked Comparison"
              workedExample={
                <div className="space-y-1.5">
                  <div>
                    • <span className="text-[#E2694A]">Prior $10,000 SALT Cap:</span> Married couple needed over <span className="text-white">$22,200</span> in annual mortgage interest just to clear the <span className="text-white">$32,200</span> standard deduction hurdle, rendering the MID ineffective for most middle-class buyers.
                  </div>
                  <div>
                    • <span className="text-[#3CBF9C]">2026 $40,400 SALT Cap:</span> High-tax state household (NJ, NY, CA, CT) paying <span className="text-white">$18,000</span> state income tax + <span className="text-white">$12,000</span> property tax (<span className="text-white">$30,000</span> SALT) absorbs nearly the entire <span className="text-white">$32,200</span> standard deduction via SALT alone—making almost every dollar of mortgage interest deductible at <span className="text-[#D08F52]">τ_marg</span> (under $505k MAGI).
                  </div>
                </div>
              }
            />

            {/* Two-Column Dichotomy: Owner Tax Shelter vs Renter Brokerage Tax Drag */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C]">
                  Owner-Occupied Tax Treatment
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  <Jargon term="Section 121 Exclusion" /> &amp; Tax-Free Imputed Rent
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Excludes up to <span className="font-mono tabular-nums">$250,000</span> (Single) or <span className="font-mono tabular-nums">$500,000</span> (MFJ) of capital gains upon sale of a primary residence occupied 2 of the preceding 5 years.
                  </li>
                  <li>
                    Imputed shelter dividend (avoided rent) accrues completely free of income tax throughout occupancy.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                  Taxable Renter Portfolio Treatment
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Retirement Caps &amp; Brokerage <Jargon term="Tax Drag" />
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Once a renter maxes out 2026 tax-advantaged space—401(k), IRA (<span className="font-mono tabular-nums">$7,500</span> limit, or <span className="font-mono tabular-nums">$8,600</span> if age 50+), and HSA (<span className="font-mono tabular-nums">$4,400</span> self / <span className="font-mono tabular-nums">$8,750</span> family)—surplus cash enters a taxable brokerage account.
                  </li>
                  <li>
                    Taxable equities suffer <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">0.5% to 1.0%+</span> annual dividend tax drag (reducing an <span className="font-mono tabular-nums">8.0%</span> pre-tax return by <span className="font-mono tabular-nums">0.6%–1.0%</span>) plus <span className="font-mono tabular-nums">15%–20%</span> federal LTCG and <span className="font-mono tabular-nums">3.8%</span> NIIT at liquidation.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-8">
          <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            Asset Class Mechanics: Leverage, Appreciation, and Sensitivity Analysis
          </h2>

          {/* Subsection: Leverage Multiplier */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              The Leverage Multiplier vs. Unlevered Asset Returns
            </h3>

            {/* Dichotomy: Unlevered Empirical History vs Retail Mortgage Leverage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Long-Run Unlevered Asset Returns (1890–2020s / 1928–2023)
                </div>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    <strong>U.S. Residential Real Estate (Case-Shiller):</strong> <span className="font-mono tabular-nums">4.0%–4.2%</span> nominal vs. <span className="font-mono tabular-nums">3.0%</span> inflation → <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">1.0%–1.2%/yr real return</span>.
                  </li>
                  <li>
                    <strong>S&amp;P 500 Equities (1928–2023):</strong> <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">9.8%–10.0% nominal</span> (<InlineMath math="\approx 6.8\%–7.0\% \text{ real}" />).
                  </li>
                  <li>
                    <strong>Treasury Bonds &amp; Gold:</strong> Compounded at <span className="font-mono tabular-nums">4.6%</span> and <span className="font-mono tabular-nums">4.9%</span> nominally, both outpacing unlevered home price growth.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  The Structural Leverage Asymmetric Instrument
                </div>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Residential mortgages are the sole financial instrument granting retail households <span className="font-mono tabular-nums">5:1</span> (<span className="font-mono tabular-nums">20%</span> down) or <span className="font-mono tabular-nums">10:1</span> (<span className="font-mono tabular-nums">10%</span> down) fixed-rate, non-callable, 30-year leverage with zero margin calls during drawdowns.
                  </li>
                  <li>
                    However, leverage is symmetric: whenever mortgage rate <InlineMath math="r_d" /> exceeds total unlevered return, <Jargon term="Negative Leverage Drag" /> erodes net return on equity.
                  </li>
                </ul>
              </div>
            </div>

            <FormulaPanel
              title="Gross vs. Net Leveraged Return on Equity (ROE) & Negative Leverage Drag"
              math={[
                "\\text{ROE}_{\\text{gross}} = \\frac{\\Delta P}{E_0} = \\frac{g_h \\cdot P_0}{d \\cdot P_0} = \\frac{g_h}{d}",
                "\\text{ROE}_{\\text{net}} = g_h + \\text{Yield}_{\\text{net}} + \\left( \\frac{1 - d}{d} \\right) \\left[ g_h + \\text{Yield}_{\\text{net}} - r_d \\right]"
              ]}
              variables={[
                { symbol: "g_h / d", desc: 'Gross leveraged price return on initial down payment fraction d' },
                { symbol: "\\text{Yield}_{\\text{net}}", desc: 'Net imputed rental yield: (12 · R_0)/P_0 − (τ_p + m + i_h)' },
                { symbol: "(1 - d) / d", desc: 'Debt-to-equity leverage multiplier (4.0× at d = 20%)' },
              ]}
              workedExample={
                <div className="space-y-1">
                  <div>
                    • Gross ROE Example (<span className="text-white">g_h = 3.5%</span>, <span className="text-white">d = 20%</span> / 5× leverage): <span className="text-[#3CBF9C]">ROE_gross = 3.5% / 0.20 = 17.5%</span> ($17,500 gain on $100,000 initial equity)
                  </div>
                  <div>
                    • <span className="text-[#E2694A]">Negative Leverage Drag Condition:</span> Whenever <span className="text-white">r_d &gt; g_h + Net Imputed Rental Yield</span>, the bracketed spread multiplying <span className="text-white">(1 − d)/d</span> turns negative—meaning the borrowed 80% costs more in annual interest than the asset generates in appreciation plus net rent savings.
                  </div>
                </div>
              }
            />
          </div>

          {/* Subsection: Multi-Scenario Sensitivity Matrix */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
                Multi-Scenario Sensitivity Matrix
              </h3>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Click any scenario row to highlight its trajectory
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-right border-collapse text-xs font-mono tabular-nums">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                    <th className="py-3 px-3 text-left">Scenario &amp; Market Regime</th>
                    <th className="py-3 px-3">Price / Rent</th>
                    <th className="py-3 px-2.5">P/R</th>
                    <th className="py-3 px-2.5">r_d</th>
                    <th className="py-3 px-2.5">g_h</th>
                    <th className="py-3 px-2.5">r_e</th>
                    <th className="py-3 px-3">Year 5 Adv.</th>
                    <th className="py-3 px-3">Year 10 Adv.</th>
                    <th className="py-3 px-3">Year 20 Adv.</th>
                    <th className="py-3 px-3">Year 30 Adv.</th>
                    <th className="py-3 px-3">Breakeven (T*)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {SENSITIVITY_ROWS.map((s, idx) => {
                    const isSelected = selectedScenarioIdx === idx;
                    return (
                      <tr
                        key={idx}
                        onClick={() => setSelectedScenarioIdx(isSelected ? null : idx)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-amber-100/60 dark:bg-slate-800'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        } text-slate-700 dark:text-slate-300`}
                      >
                        <td className="py-2.5 px-3 text-left font-sans font-semibold text-slate-900 dark:text-slate-100">
                          {s.scenario}
                        </td>
                        <td className="py-2.5 px-3">{s.priceRent}</td>
                        <td className="py-2.5 px-2.5 font-semibold text-[#A8672E] dark:text-[#D08F52]">
                          {s.pr}
                        </td>
                        <td className="py-2.5 px-2.5">{s.rate}</td>
                        <td className="py-2.5 px-2.5">{s.apprec}</td>
                        <td className="py-2.5 px-2.5">{s.eqReturn}</td>
                        <td
                          className={`py-2.5 px-3 font-semibold ${
                            s.y5Pos
                              ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                              : 'text-[#BC4128] dark:text-[#E2694A]'
                          }`}
                        >
                          {s.y5}
                        </td>
                        <td
                          className={`py-2.5 px-3 font-semibold ${
                            s.y10Pos
                              ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                              : 'text-[#BC4128] dark:text-[#E2694A]'
                          }`}
                        >
                          {s.y10}
                        </td>
                        <td
                          className={`py-2.5 px-3 font-semibold ${
                            s.y20Pos
                              ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                              : 'text-[#BC4128] dark:text-[#E2694A]'
                          }`}
                        >
                          {s.y20}
                        </td>
                        <td
                          className={`py-2.5 px-3 font-semibold ${
                            s.y30Pos
                              ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                              : 'text-[#BC4128] dark:text-[#E2694A]'
                          }`}
                        >
                          {s.y30}
                        </td>
                        <td
                          className={`py-2.5 px-3 font-semibold ${
                            s.breakeven !== 'Never'
                              ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                              : 'text-[#BC4128] dark:text-[#E2694A]'
                          }`}
                        >
                          {s.breakeven}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Regime Mechanics Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-white dark:bg-slate-900 p-4 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C]">
                  Buyer-Friendly Market (P/R = 12.5)
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
                  <li>
                    Typical of Midwestern/Southern metros (<span className="font-mono tabular-nums">$375k</span> home renting for <span className="font-mono tabular-nums">$2,500/mo</span>; <span className="font-mono tabular-nums">8.0%</span> gross rental yield).
                  </li>
                  <li>
                    Year-1 owner cash outlay (<span className="font-mono tabular-nums">$2,736</span>) is only <span className="font-mono tabular-nums">$215/mo</span> above renter outlay (<span className="font-mono tabular-nums">$2,521</span>).
                  </li>
                  <li>
                    By Year 4, <span className="font-mono tabular-nums">3%</span> rent growth pushes rent above owner carrying cost, driving a <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">+$82,549</span> buyer lead by Year 10 and <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">+$629,168</span> by Year 30.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-[#A8672E]/30 dark:border-[#D08F52]/30 bg-white dark:bg-slate-900 p-4 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  Booming Appreciation Non-Linear Reversal
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
                  <li>
                    With <span className="font-mono tabular-nums">6.0%</span> appreciation vs. <span className="font-mono tabular-nums">8.0%</span> stocks, <span className="font-mono tabular-nums">5×</span> leverage breaks even at Year 6 and peaks at <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">+$43,795</span> in Year 15.
                  </li>
                  <li>
                    Between Year 20 and Year 30, the buyer&apos;s lead reverses into a <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">-$503,888</span> deficit.
                  </li>
                  <li>
                    <strong>Why it reverses:</strong> Leverage decays toward <span className="font-mono tabular-nums">1:1</span> as the loan pays down (dropping return toward unlevered <span className="font-mono tabular-nums">6.0% &lt; 8.0%</span> equities), while <span className="font-mono tabular-nums">3.0%</span> carrying costs on a <span className="font-mono tabular-nums">$2.87M</span> home surge to <span className="font-mono tabular-nums">$9,247/mo</span> vs. <span className="font-mono tabular-nums">$5,912/mo</span> rent.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-white dark:bg-slate-900 p-4 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                  High-Cost Coastal (P/R = 25.0)
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
                  <li>
                    Purchasing a <span className="font-mono tabular-nums">$1,000,000</span> home renting for <span className="font-mono tabular-nums">$3,333/mo</span> creates a Year-1 outlay of <span className="font-mono tabular-nums">$6,916</span> vs. <span className="font-mono tabular-nums">$3,354</span> for renting.
                  </li>
                  <li>
                    The renter compounds <span className="font-mono tabular-nums">$230,000</span> upfront cash plus a <span className="font-mono tabular-nums">$3,562/mo</span> Year-1 surplus at <span className="font-mono tabular-nums">8.5%</span>.
                  </li>
                  <li>
                    Renter portfolio reaches <span className="font-mono tabular-nums">$1,158,167</span> by Year 10 (vs. <span className="font-mono tabular-nums">$713,221</span> buyer equity) and <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">$8,207,961</span> by Year 30 (vs. <span className="font-mono tabular-nums">$3,048,794</span> buyer equity).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-8">
          <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            Behavioral Economics, Forced Savings, and Liquidity Trade-Offs
          </h2>

          {/* Subsection: The Behavioral "Invest the Difference" Fallacy */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              The Behavioral &ldquo;Invest the Difference&rdquo; Fallacy
            </h3>

            {/* Dichotomy: Quantitative Model Axiom vs Empirical Fed SCF Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  Fragile Behavioral Axiom
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  What Mathematical Models Assume
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Assumes the renter calculates the exact monthly difference between hypothetical ownership outlays (including invisible CapEx reserves and property tax escalations) and current rent.
                  </li>
                  <li>
                    Requires automatically transferring <span className="font-mono tabular-nums">100%</span> of that surplus into equities every month for 30 years without ever raiding the account for vehicles, vacations, or market drawdowns.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C]">
                  Federal Reserve Survey of Consumer Finances
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  The <span className="font-mono tabular-nums">40×</span> Retirement Net Worth Gap
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Retired homeowners hold roughly <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">40×</span> the median net worth of retired renters, who possess a median net worth of only <span className="font-mono tabular-nums">$10,000 to $15,000</span>.
                  </li>
                  <li>
                    In empirical reality, the overwhelming majority of households rent and spend the difference, allowing lifestyle inflation to absorb monthly cash-flow savings.
                  </li>
                </ul>
              </div>
            </div>

            {/* Three Interlocking Behavioral Mechanisms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1.5">
                <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52]">
                  Mechanism I
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Contractual Forced Savings
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Bundles shelter consumption with obligatory principal amortization; because non-payment triggers foreclosure, households prioritize equity accumulation over discretionary spending.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1.5">
                <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52]">
                  Mechanism II
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Illiquidity Protection
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Home equity is trapped inside property walls and cannot be tapped for consumption without expensive, time-consuming refinancing, HELOC underwriting, or sale.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1.5">
                <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52]">
                  Mechanism III
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Pricing Opacity (Dr. Eli Beracha)
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Absence of a live mark-to-market price ticker insulates owners from <Jargon term="Myopic Loss Aversion" /> during <span className="font-mono tabular-nums">20%–30%</span> drawdowns, forcing long-term buy-and-hold behavior.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection: FIRE and Sequence-of-Returns */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Liquidity, Sequence-of-Returns Risk, and Financial Independence (FIRE)
            </h3>

            {/* Dichotomy: FIRE Liquid Portfolio vs Homeowner Illiquidity Drag */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C]">
                  Disciplined FIRE Renter Trajectory
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  15 Years to <span className="font-mono tabular-nums">$1.3M</span> Liquid FI Threshold &amp; Mobility Option
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Under the <span className="font-mono tabular-nums">4%</span> safe withdrawal rule (<span className="font-mono tabular-nums">25×</span> annual expenses), a household with <span className="font-mono tabular-nums">$4,450/mo</span> living expenses requires <span className="font-mono tabular-nums">$1.3 million</span> in liquid invested assets.
                  </li>
                  <li>
                    A disciplined renter investing <span className="font-mono tabular-nums">$3,000/mo</span> plus avoided ownership surpluses reaches the <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">$1.3M liquid threshold in 15 years</span>.
                  </li>
                  <li>
                    Terminating a lease costs <span className="font-mono tabular-nums">0 to 2 months&apos; rent</span>, preserving career mobility and downsizing flexibility during income shocks.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#BC4128] dark:text-[#E2694A]">
                  Homeowner Illiquidity Drag vs. Retirement Hedge
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  22 Years to Equivalent Net Worth (7-Year Retirement Delay)
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    A buyer in the same market requires <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-medium">22 years</span> to reach the same total net worth—delaying retirement by <span className="font-mono tabular-nums">7 years</span>—with much of that wealth locked in non-income-producing walls.
                  </li>
                  <li>
                    <strong>Counterbalancing Retirement Benefit:</strong> Extinguishing a 30-year mortgage permanently eliminates <span className="font-mono tabular-nums">P&amp;I</span> outflows, reducing sequence-of-returns vulnerability during retirement drawdowns and providing <Jargon term="PERMA Framework" /> psychological utility.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-8">
          <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            Synthesis and Decision Matrix for Capital Allocation
          </h2>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
                  <th className="py-3 px-4">Decision Dimension</th>
                  <th className="py-3 px-4">Metric / Formula to Compute</th>
                  <th className="py-3 px-4">Threshold Favoring Buying</th>
                  <th className="py-3 px-4">Threshold Favoring Renting</th>
                  <th className="py-3 px-4">Primary Economic Driver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {DECISION_DIMENSIONS.map((d, i) => (
                  <tr key={i} className="text-slate-700 dark:text-slate-300">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      {d.dimension}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-xs text-[#A8672E] dark:text-[#D08F52]">
                      <InlineMath math={d.formula} />
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-xs font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                      {d.buyThreshold}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-xs font-semibold text-[#BC4128] dark:text-[#E2694A]">
                      {d.rentThreshold}
                    </td>
                    <td className="py-3 px-4 text-xs">{d.driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subsection: Actionable Execution Protocol */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Actionable Execution Protocol
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  First Stage
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Benchmark via Generalized Unrecoverable Cost Rate
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Compute <InlineMath math="u = (1-d)r_d + d(r_e - g_h) + \tau_p + m + i_h - \psi_{\text{tax}}" /> rather than comparing lease cost to a lender&apos;s <span className="font-mono tabular-nums">P&amp;I</span> quote.
                  </li>
                  <li>
                    Budget at least <span className="font-mono tabular-nums">1.25%–1.50%</span> for physical depreciation <InlineMath math="m" /> on structures over 15 years old to establish monthly breakeven rent <InlineMath math="(P_0 \cdot u) / 12" />.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  Second Stage
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Stress-Test Holding Horizon Against Transaction Friction
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Upfront closing costs (<span className="font-mono tabular-nums">2%–5%</span>) and exit selling fees (<span className="font-mono tabular-nums">5%–6%</span>) consume <span className="font-mono tabular-nums">8%–10%</span> of asset value.
                  </li>
                  <li>
                    Any household with a meaningful probability of relocating within <span className="font-mono tabular-nums">5 years</span> should remain in the rental market to preserve capital and career mobility.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  Third Stage
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Price the 2026 OBBBA Tax Shield &amp; Brokerage Tax Drag
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Count only marginal tax savings above the standard deduction (<span className="font-mono tabular-nums">$32,200</span> MFJ or <span className="font-mono tabular-nums">$16,100</span> Single), incorporating the <span className="font-mono tabular-nums">$40,400</span> SALT cap (<span className="font-mono tabular-nums">$505,000</span> MAGI phaseout) and deductible PMI.
                  </li>
                  <li>
                    Subtract <span className="font-mono tabular-nums">0.6%–1.0%</span> from the renter&apos;s expected equity return if surplus cash is invested in a taxable brokerage account subject to dividend tax drag.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">
                  Fourth Stage
                </div>
                <h4 className="font-serif text-base text-slate-900 dark:text-slate-100">
                  Audit and Automate the Behavioral Counterfactual
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                  <li>
                    Where math favors renting, deploy the avoided down payment immediately and execute an automated monthly transfer equal to the full cash-flow differential <InlineMath math="\Delta\text{CF}_t = \text{CF}_{\text{buy}, t} - \text{CF}_{\text{rent}, t}" />.
                  </li>
                  <li>
                    For households lacking multi-decade automated investing discipline, purchasing a moderately priced home (<span className="font-mono tabular-nums">P/R ≤ 18</span>) over a long horizon (<span className="font-mono tabular-nums">7+ years</span>) remains the single most effective forced-savings vehicle to build durable net worth.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
