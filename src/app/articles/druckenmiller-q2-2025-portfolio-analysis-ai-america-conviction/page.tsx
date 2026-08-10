'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Plus, Minus, X, Briefcase, BarChart2, Zap, HeartPulse, Cpu, DollarSign, Building, Globe, Target, Scale, ShieldCheck, UserCheck } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// --- MOCK DATA FROM THE REPORT ---
const portfolioMetrics = {
  q1Value: '$3.06B',
  q2Value: '$4.07B',
  valueChange: '+$1.01B',
  valueChangePercent: '+33.05%',
  holdingsCountQ1: 52,
  holdingsCountQ2: 69,
  top10Concentration: '50.54%',
  turnover: '60.92%',
};

const topHoldings = [
  { rank: 1, ticker: 'NTRA', name: 'Natera, Inc.', value: '$521.21M', portfolioPercentage: '12.80%' },
  { rank: 2, ticker: 'TEVA', name: 'Teva Pharmaceutical', value: '$267.64M', portfolioPercentage: '6.57%' },
  { rank: 3, ticker: 'INSM', name: 'Insmed Inc.', value: '$226.79M', portfolioPercentage: '5.57%' },
  { rank: 4, ticker: 'WWD', name: 'Woodward, Inc.', value: '$208.06M', portfolioPercentage: '5.11%' },
  { rank: 5, ticker: 'TSM', name: 'Taiwan Semiconductor', value: '$173.28M', portfolioPercentage: '4.26%' },
  { rank: 6, ticker: 'PM', name: 'Philip Morris Intl.', value: '$148.61M', portfolioPercentage: '3.65%' },
  { rank: 7, ticker: 'MELI', name: 'MercadoLibre, Inc.', value: '$140.42M', portfolioPercentage: '3.45%' },
  { rank: 8, ticker: 'ENTG', name: 'Entegris, Inc.', value: '$132.74M', portfolioPercentage: '3.26%' },
  { rank: 9, ticker: 'CPNG', name: 'Coupang, Inc.', value: '$123.00M', portfolioPercentage: '3.02%' },
  { rank: 10, ticker: 'MSFT', name: 'Microsoft Corp.', value: '$99.94M', portfolioPercentage: '2.45%' },
];

const portfolioChanges = {
  newPositions: [
    { ticker: 'ENTG', name: 'Entegris, Inc.', value: '$132.7M', theme: 'AI Infrastructure: "Picks & Shovels"' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', value: '$99.9M', theme: 'AI Software & Cloud Leader' },
    { ticker: 'IWM', name: 'iShares Russell 2000 ETF (Calls)', value: '$72.3M', theme: 'Broad Market Bullishness (Small Caps)' },
    { ticker: 'C', name: 'Citigroup Inc.', value: '$56.7M', theme: 'Rotation into Global Banks' },
  ],
  increasedStakes: [
    { ticker: 'INSM', name: 'Insmed Inc.', change: '+64.6%', value: '$226.8M', theme: 'High-Conviction Pre-Approval Bet' },
    { ticker: 'TSM', name: 'Taiwan Semiconductor', change: '+27.8%', value: '$173.3M', theme: 'Reinforcing the AI Foundry King' },
    { ticker: 'ROKU', name: 'Roku Inc.', change: '+123%', value: '$96.7M', theme: 'Aggressive Streaming Bet' },
  ],
  exitedPositions: [
    { ticker: 'AMZN', name: 'Amazon.com, Inc.', theme: 'Capital Redeployment from Mega-Cap' },
    { ticker: 'COF', name: 'Capital One Financial', theme: 'Shift from Consumer to Global Banks' },
    { ticker: 'SWTX', name: 'SpringWorks Therapeutics', theme: 'Strategic Exit from Biotech Position' },
  ],
  majorReductions: [
    { ticker: 'CPNG', name: 'Coupang, Inc.', change: '-55.9%', value: '$123.0M', theme: 'Reduced Emerging Markets Exposure' },
    { ticker: 'COHR', name: 'Coherent Corp', change: '-47.9%', value: '$103.3M', theme: 'Profit Taking in Optical Materials' },
    { ticker: 'PM', name: 'Philip Morris', change: '-26.2%', value: '$148.6M', theme: 'Trimming Defensive Stalwart' },
  ]
};

const druckenmillerDoctrine = [
  {
    icon: Globe,
    title: 'Top-Down Macro Framework',
    description: "Starts with a global economic view—analyzing interest rates, currencies, and growth cycles—to identify the most attractive markets and sectors before picking individual stocks."
  },
  {
    icon: Target,
    title: 'Forward-Looking Conviction',
    description: 'Famously invests based on a visualized scenario 18 months in the future, aiming to capitalize on major shifts before they are reflected in current prices.'
  },
  {
    icon: Scale,
    title: 'Concentration & Aggression',
    description: 'When conviction is high, he "goes for the jugular," making large, concentrated bets on a few key ideas rather than practicing broad diversification.'
  },
  {
    icon: ShieldCheck,
    title: 'Capital Preservation',
    description: 'Despite his aggressive bets, his primary focus is on risk management. He is known for cutting losses quickly and unemotionally if a thesis proves wrong.'
  },
];

const macroThemes = [
  {
    icon: Cpu,
    title: 'The AI Value Chain Bet',
    subtitle: 'Picks, Shovels, and Railroads',
    description: "Instead of chasing AI application hype, Druckenmiller invested in the foundational pillars. This includes Microsoft (cloud/software), Entegris (critical semiconductor materials), and Taiwan Semiconductor (chip foundry). It's a bet on the massive, long-term capital expenditure required for the entire AI buildout, a more durable thesis than picking an application winner.",
  },
  {
    icon: TrendingUp,
    title: 'Bullish on America',
    subtitle: 'A Broad-Based Economic Wager',
    description: "The new call options on both the S&P 500 (SPY) and Russell 2000 (IWM) signal a belief not only in mega-cap leadership but also in a broadening rally that will lift smaller, domestically-focused companies. This suggests confidence in a durable, accelerating, and increasingly inclusive U.S. economic cycle.",
  },
  {
    icon: HeartPulse,
    title: 'High-Stakes in Healthcare',
    subtitle: 'The Catalyst-Driven Core',
    description: "The portfolio's core remains anchored in high-conviction, idiosyncratic bets on healthcare innovation that are uncorrelated to the macro cycle. The massive, successful bet on Insmed (INSM) ahead of its drug approval exemplifies this strategy of making large wagers on asymmetric, event-driven outcomes.",
  }
];

const holdingsDeepDive = [
  {
    ticker: 'NTRA',
    name: 'Natera, Inc.',
    thesis: 'A long-term conviction play on the market leader in cell-free DNA testing, with massive growth runways in prenatal and oncology diagnostics via its Signatera test.',
    action: 'Remains #1 holding at $521.2M (12.8%). A minor 9.3% trim is likely prudent rebalancing after significant stock appreciation, not a change in thesis.',
    catalyst: 'Strong Q2 earnings beat and raised full-year guidance. Positive Phase III data for its Signatera test de-risks its use as a companion diagnostic in bladder cancer.',
    icon: Zap,
  },
  {
    ticker: 'INSM',
    name: 'Insmed Inc.',
    thesis: 'A high-stakes, successful bet on the FDA approval of BRINSUPRI, a first-in-class therapy for a rare lung disease with blockbuster potential and no prior approved treatments.',
    action: 'Aggressively increased stake by 64.6% just before the FDA decision, making it the #3 holding. A classic "go for the jugular" trade.',
    catalyst: 'On Aug 12, 2025, the FDA approved BRINSUPRI, validating the high-conviction bet and transforming the company\'s outlook and revenue potential.',
    icon: HeartPulse,
  },
  {
    ticker: 'ENTG',
    name: 'Entegris, Inc.',
    thesis: 'A crucial "picks and shovels" investment in the AI-driven semiconductor boom. As chip complexity increases, the need for Entegris\'s ultra-pure materials grows exponentially.',
    action: 'Largest new common stock position at $132.7M, immediately becoming a top-10 holding. A core bet on the AI infrastructure buildout.',
    catalyst: 'Direct beneficiary of global fab construction (CHIPS Act). Positioned to profit from increasing chip complexity itself, regardless of which chip designer wins.',
    icon: Building,
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    thesis: 'A new mega-cap anchor, betting on a dominant leader in the AI revolution through its Azure cloud, Copilot software, and its deep partnership with OpenAI.',
    action: 'Significant new $99.9M position established, signaling belief in continued growth even at a multi-trillion dollar scale. ',
    catalyst: 'Massive AI-driven capital expenditure cycle ($80B for FY25) entrenches its competitive moat and ensures it captures a huge share of enterprise AI spending.',
    icon: Globe,
  },
  {
    ticker: 'TSM',
    name: 'Taiwan Semiconductor',
    thesis: 'A bet on the quasi-monopolistic foundry that manufactures the world\'s most advanced chips for Nvidia, Apple, and others, making it a critical bottleneck in the AI supply chain.',
    action: 'Reinforced conviction with a 27.8% increase, making it a top-5 holding at $173.3M. Doubling down on the key AI enabler.',
    catalyst: 'Blowout Q2 earnings and raised full-year revenue growth guidance to 30%, citing overwhelming and accelerating demand for AI chips.',
    icon: Cpu,
  }
];

// --- COMPONENTS ---
const Introduction = () => (
  <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#14171B] border-y border-slate-200 dark:border-slate-800 rounded-2xl">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 font-serif">The Architect: Stanley Druckenmiller</h3>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">One of history&apos;s most successful investors, whose strategy is a unique blend of top-down macro analysis and aggressive, high-conviction betting.</p>
      </div>
      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <div className="flex items-center space-x-3">
            <UserCheck className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52]" />
            <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Duquesne Family Office</h4>
          </div>
          <p>After a legendary career, including his famous partnership with George Soros and a 30-year track record at Duquesne Capital averaging <strong>30% annual returns with no down years</strong>, Druckenmiller converted his firm into a family office in 2010.</p>
          <p>Today, Duquesne manages his personal wealth, deploying capital with the same principles that defined his career: mental flexibility, rigorous risk management, and the courage to &ldquo;go for the jugular&rdquo; when an opportunity arises. The firm&apos;s 13F filings are among the most closely watched in finance, offering a glimpse into the mind of a macro master.</p>
        </div>
        <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 text-center">Core Investment Principles</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] p-2 rounded-full mt-1">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-semibold text-slate-800 dark:text-slate-200">Global Macro View</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">Starts with a big-picture analysis of global economic trends to identify major themes.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] p-2 rounded-full mt-1">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-semibold text-slate-800 dark:text-slate-200">Concentrated Bets</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">Eschews diversification in favor of making large, aggressive bets on his highest-conviction ideas.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] p-2 rounded-full mt-1">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-semibold text-slate-800 dark:text-slate-200">Capital Preservation</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">Focuses on protecting capital and is known for cutting losses quickly if a thesis is wrong.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MetricCard = ({ title, value, change, changePercent, icon: Icon }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transform transition-transform hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <Icon className="h-6 w-6 text-slate-400" />
    </div>
    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    {change && (
      <div className="flex items-baseline mt-1 space-x-2">
        <p className="text-lg font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">{change}</p>
        <p className="text-sm font-medium text-[#1D8A70] dark:text-[#3CBF9C]">({changePercent})</p>
      </div>
    )}
  </div>
);

const PortfolioSnapshot = () => (
  <section id="snapshot" className="py-20 sm:py-24 bg-white dark:bg-[#0A0D14]">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 font-serif">Q2 Portfolio Snapshot</h3>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">A decisive shift to offense, marked by a surge in capital and concentrated bets.</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Market Value"
          value={portfolioMetrics.q2Value}
          change={portfolioMetrics.valueChange}
          changePercent={portfolioMetrics.valueChangePercent}
          icon={DollarSign}
        />
        <MetricCard
          title="Number of Holdings"
          value={portfolioMetrics.holdingsCountQ2}
          icon={Briefcase}
        />
        <MetricCard
          title="Top 10 Concentration"
          value={portfolioMetrics.top10Concentration}
          icon={BarChart2}
        />
        <MetricCard
          title="Quarterly Turnover"
          value={portfolioMetrics.turnover}
          icon={Zap}
        />
      </div>
      <div className="mt-16 max-w-4xl mx-auto">
        <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center mb-8">Q1 vs Q2 Comparison</h4>
        <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Metric</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Q1 2025</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Q2 2025</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#0A0D14] divide-y divide-slate-200">
              <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Total Market Value</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 text-center">{portfolioMetrics.q1Value}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 text-center">{portfolioMetrics.q2Value}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#1D8A70] dark:text-[#3CBF9C] text-center">{portfolioMetrics.valueChangePercent}</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Number of Holdings</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 text-center">{portfolioMetrics.holdingsCountQ1}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 text-center">{portfolioMetrics.holdingsCountQ2}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#1D8A70] dark:text-[#3CBF9C] text-center">+{portfolioMetrics.holdingsCountQ2 - portfolioMetrics.holdingsCountQ1}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-16">
        <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center mb-8">Top 10 Holdings</h4>
        <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 dark:bg-[#14171B]">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6">Rank</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Ticker</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Company</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Market Value</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">% of Portfolio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:bg-[#0A0D14]">
                {topHoldings.map((holding) => (
                  <tr key={holding.rank} className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 dark:text-slate-100 sm:pl-6">{holding.rank}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#A8672E] dark:text-[#D08F52] font-mono">{holding.ticker}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 dark:text-slate-400">{holding.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 dark:text-slate-400">{holding.value}</td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium text-slate-900 dark:text-slate-100 sm:pr-6">{holding.portfolioPercentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ChangeCard = ({ item, type }) => {
  const isNewOrIncrease = type === 'new' || type === 'increase';
  const isExitOrDecrease = type === 'exit' || type === 'decrease';

  return (
    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-mono text-sm text-[#A8672E] dark:text-[#D08F52]">{item.ticker}</p>
          <p className="font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
        </div>
        {(isNewOrIncrease) && <div className="flex-shrink-0 bg-green-100 text-[#1D8A70] dark:text-[#3CBF9C] p-1.5 rounded-full"><Plus className="h-4 w-4" /></div>}
        {(isExitOrDecrease) && <div className="flex-shrink-0 bg-red-100 text-[#BC4128] dark:text-[#E2694A] p-1.5 rounded-full"><Minus className="h-4 w-4" /></div>}
      </div>
      <p className="text-xs text-slate-500 italic">{item.theme}</p>
      <div className="flex justify-between items-baseline pt-1">
        {item.change && <p className={`text-sm font-semibold ${isNewOrIncrease ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A]'}`}>{item.change}</p>}
        {item.value && <p className="text-sm text-slate-600 dark:text-slate-400">{item.value}</p>}
      </div>
    </div>
  );
};

const PortfolioChanges = () => (
  <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#14171B]">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 font-serif">Anatomy of a Reshuffle</h3>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">High-conviction buys and strategic exits funded a fundamental portfolio overhaul.</p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h4 className="flex items-center text-xl font-semibold text-slate-900 dark:text-slate-100">
            <Plus className="h-5 w-5 mr-2 text-[#1D8A70] dark:text-[#3CBF9C]" />
            New Cornerstones
          </h4>
          {portfolioChanges.newPositions.map(item => <ChangeCard key={item.ticker} item={item} type="new" />)}
        </div>
        <div className="space-y-4">
          <h4 className="flex items-center text-xl font-semibold text-slate-900 dark:text-slate-100">
            <ArrowUpRight className="h-5 w-5 mr-2 text-[#1D8A70] dark:text-[#3CBF9C]" />
            Increased Stakes
          </h4>
          {portfolioChanges.increasedStakes.map(item => <ChangeCard key={item.ticker} item={item} type="increase" />)}
        </div>
        <div className="space-y-4">
          <h4 className="flex items-center text-xl font-semibold text-slate-900 dark:text-slate-100">
            <X className="h-5 w-5 mr-2 text-[#BC4128] dark:text-[#E2694A]" />
            Complete Exits
          </h4>
          {portfolioChanges.exitedPositions.map(item => <ChangeCard key={item.ticker} item={item} type="exit" />)}
        </div>
        <div className="space-y-4">
          <h4 className="flex items-center text-xl font-semibold text-slate-900 dark:text-slate-100">
            <ArrowDownRight className="h-5 w-5 mr-2 text-[#BC4128] dark:text-[#E2694A]" />
            Major Reductions
          </h4>
          {portfolioChanges.majorReductions.map(item => <ChangeCard key={item.ticker} item={item} type="decrease" />)}
        </div>
      </div>
    </div>
  </section>
);

const DruckenmillerDoctrine = () => (
  <section className="py-20 sm:py-24 bg-white dark:bg-[#0A0D14]">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 font-serif">The Druckenmiller Doctrine</h3>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">Understanding the core principles behind the legendary investor&apos;s strategy.</p>
      </div>
      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {druckenmillerDoctrine.map((principle) => (
          <div key={principle.title} className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center shadow-sm">
            <div className="bg-blue-100 text-[#A8672E] dark:text-[#D08F52] p-3 rounded-full">
              <principle.icon className="h-7 w-7" />
            </div>
            <h4 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">{principle.title}</h4>
            <p className="mt-2 flex-grow text-slate-600 dark:text-slate-400 text-sm">{principle.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MacroThemes = () => (
  <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#14171B]">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 font-serif">The Big Picture: Dominant Macro Themes</h3>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">Decoding the powerful, interconnected themes driving the new portfolio.</p>
      </div>
      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {macroThemes.map((theme) => (
          <div key={theme.title} className="bg-white dark:bg-[#0A0D14] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center transform transition-transform hover:-translate-y-2 hover:shadow-lg">
            <div className="bg-blue-100 text-[#A8672E] dark:text-[#D08F52] p-4 rounded-full">
              <theme.icon className="h-8 w-8" />
            </div>
            <h4 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">{theme.title}</h4>
            <p className="text-sm font-semibold text-[#A8672E] dark:text-[#D08F52]">{theme.subtitle}</p>
            <p className="mt-4 flex-grow text-slate-600 dark:text-slate-400 text-sm">{theme.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HoldingsDeepDive = () => {
  const [selectedHolding, setSelectedHolding] = useState(null);

  const Modal = ({ holding, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#0A0D14] rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:text-slate-200 transition-colors">
          <X className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-[#A8672E] dark:text-[#D08F52] p-3 rounded-full">
            <holding.icon className="h-8 w-8" />
          </div>
          <div>
            <p className="font-mono text-lg text-[#A8672E] dark:text-[#D08F52]">{holding.ticker}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-serif">{holding.name}</h3>
          </div>
        </div>
        <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Investment Thesis:</h4>
            <p>{holding.thesis}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Portfolio Action:</h4>
            <p>{holding.action}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Recent Catalyst:</h4>
            <p>{holding.catalyst}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#0A0D14]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 font-serif">Deep Dive: Key Holdings</h3>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">Examining the investment thesis behind the portfolio&apos;s most significant positions.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {holdingsDeepDive.map((holding) => (
            <button
              key={holding.ticker}
              onClick={() => setSelectedHolding(holding)}
              className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:bg-slate-50 dark:bg-[#14171B] hover:border-[#A8672E] dark:border-[#D08F52] transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-slate-100 p-2 rounded-full">
                  <holding.icon className="h-6 w-6 text-[#A8672E] dark:text-[#D08F52]" />
                </div>
                <div>
                  <p className="font-mono text-[#A8672E] dark:text-[#D08F52]">{holding.ticker}</p>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{holding.name}</h4>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{holding.thesis}</p>
            </button>
          ))}
        </div>
      </div>
      {selectedHolding && <Modal holding={selectedHolding} onClose={() => setSelectedHolding(null)} />}
    </section>
  );
};

export default function DruckenmillerQ2Analysis() {
  return (
    <ArticleFrame slug="druckenmiller-q2-2025-portfolio-analysis-ai-america-conviction">
      <div className="bg-white dark:bg-[#0A0D14] antialiased text-slate-800 dark:text-slate-200 -mx-4 sm:-mx-6 lg:-mx-8">
        <Introduction />
        <PortfolioSnapshot />
        <PortfolioChanges />
        <DruckenmillerDoctrine />
        <MacroThemes />
        <HoldingsDeepDive />
      </div>
    </ArticleFrame>
  );
}
