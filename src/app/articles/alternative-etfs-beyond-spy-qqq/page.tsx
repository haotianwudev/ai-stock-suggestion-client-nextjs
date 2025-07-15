'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, BarChart, Zap, Shield, Gem, TrendingUp, DollarSign, ArrowRight, Sun, Moon, Info, ChevronsRight, Target, ExternalLink, Eye, FileText, TrendingDown, AlertTriangle } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Deep Research badge component
const DeepResearchBadge = () => (
  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
    Deep Research
  </div>
);

// Navigation component
const TableOfContents = ({ activeSection }: { activeSection: string }) => {
  const sections = [
    { id: 'overview', title: 'Executive Summary', icon: Eye },
    { id: 'interactive', title: 'Interactive Guide', icon: BarChart },
    { id: 'methodology', title: 'Research Methodology', icon: FileText },
    { id: 'conclusions', title: 'Key Insights', icon: TrendingUp },
    { id: 'full-report', title: 'Full Research Report', icon: ExternalLink }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Navigation</h3>
      <ul className="space-y-2">
        {sections.map(({ id, title, icon: Icon }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center ${
                activeSection === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Benchmark data for SPY and QQQ
const benchmarkData = {
  spy: {
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    strategy: 'Market-Cap Weighted (S&P 500)',
    description: 'The oldest and largest ETF, tracking the 500 largest U.S. companies, weighted by market capitalization.',
    icon: ChevronsRight,
    metrics: {
      yield: '1.27%',
      expenseRatio: '0.09%',
      beta: '1.00',
      aum: '$540B',
      stdDev: '17.89%',
      return1Y: '28.19%',
      return3Y: '11.47%',
      return5Y: '15.80%',
      sharpeRatio: '0.77',
    },
    pros: ['Highly liquid', 'Low cost', 'Broad market exposure'],
    cons: ['Heavily concentrated in mega-cap tech', 'Low dividend yield'],
    discussion: "SPY is the default U.S. market proxy. Its performance is heavily driven by its top holdings, like Microsoft, Apple, and NVIDIA. Its concentration risk is the primary reason investors seek alternatives."
  },
  qqq: {
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust',
    strategy: 'Market-Cap Weighted (Nasdaq-100)',
    description: 'Tracks the 100 largest non-financial companies on the Nasdaq, known for its heavy tech and growth tilt.',
    icon: ChevronsRight,
    metrics: {
      yield: '0.58%',
      expenseRatio: '0.20%',
      beta: '1.00',
      aum: '$282B',
      stdDev: '20.62%',
      return1Y: '32.88%',
      return3Y: '12.31%',
      return5Y: '20.69%',
      sharpeRatio: '0.91',
    },
    pros: ['High growth potential', 'Exposure to innovation leaders'],
    cons: ['Higher volatility', 'Very low dividend yield', 'Extreme sector concentration'],
    discussion: "QQQ is a concentrated bet on large-cap growth and technology. While its returns have been stellar, its higher volatility and low income make it unsuitable for many investors' core portfolios."
  }
};

// Expanded data with benchmark comparisons and 5-Year Sharpe Ratios calculated with a 2% risk-free rate.
const etfData = {
  income: [
    {
      id: 'schd',
      ticker: 'SCHD',
      name: 'Schwab U.S. Dividend Equity ETF',
      strategy: 'Dividend Quality & Growth',
      description: 'Focuses on financially strong companies with sustainable, growing dividends. Aims for quality over raw yield.',
      icon: Gem,
      benchmark: 'spy',
      metrics: {
        yield: '3.97%',
        expenseRatio: '0.06%',
        beta: '0.78',
        aum: '$68.2B',
        stdDev: '15.69%',
        return1Y: '3.78%',
        return3Y: '3.72%',
        return5Y: '12.24%',
        sharpeRatio: '0.65',
      },
      pros: ['Low cost', 'Focus on company quality', 'Consistent dividend growth'],
      cons: ['May lag in strong growth markets', 'Excludes REITs'],
      discussion: "SCHD's strength lies in its rigorous multi-factor screening for quality (ROE, cash flow, etc.). This makes it a deliberate bet on the 'quality' factor itself, not just a basket of high-yield stocks."
    },
    {
      id: 'vym',
      ticker: 'VYM',
      name: 'Vanguard High Dividend Yield ETF',
      strategy: 'High Dividend Yield',
      description: 'Offers broad exposure to high-yielding U.S. stocks, weighted by market cap for risk management.',
      icon: BarChart,
      benchmark: 'spy',
      metrics: {
        yield: '2.86%',
        expenseRatio: '0.06%',
        beta: '0.89',
        aum: '$72.9B',
        stdDev: '18.06%',
        return1Y: '10.79%',
        return3Y: '8.32%',
        return5Y: '13.43%',
        sharpeRatio: '0.63',
      },
      pros: ['Highly diversified (580+ stocks)', 'Low expense ratio', 'Natural risk management'],
      cons: ['Risk of "value traps"', 'Lower yield than some peers'],
      discussion: "VYM manages the 'value trap' risk inherent in high-yield investing through massive diversification and market-cap weighting, which prevents over-concentration in potentially failing companies."
    },
    {
      id: 'jepi',
      ticker: 'JEPI',
      name: 'JPMorgan Equity Premium Income ETF',
      strategy: 'Active Covered Call (S&P 500)',
      description: 'Generates high monthly income by selling S&P 500 call options while holding low-volatility stocks.',
      icon: DollarSign,
      benchmark: 'spy',
      metrics: {
        yield: '~7-9%',
        expenseRatio: '0.35%',
        beta: '0.57',
        aum: '$39.8B',
        stdDev: '13.08%',
        return1Y: '6.7%',
        return3Y: '8.0%',
        return5Y: '10.9%',
        sharpeRatio: '0.68',
      },
      pros: ['Very high monthly income', 'Low volatility', 'Performs well in flat/down markets'],
      cons: ['Upside potential is capped', 'Distributions taxed as ordinary income'],
      discussion: "Crucially, JEPI's income is from options premiums (via ELNs) and is taxed as ordinary income. This makes it most suitable for tax-advantaged accounts like IRAs."
    },
    {
      id: 'jepq',
      ticker: 'JEPQ',
      name: 'JPMorgan Nasdaq Equity Premium Income ETF',
      strategy: 'Active Covered Call (Nasdaq-100)',
      description: 'Applies the covered call strategy to the more volatile Nasdaq-100 for even higher potential income.',
      icon: Zap,
      benchmark: 'qqq',
      metrics: {
        yield: '~9-12%',
        expenseRatio: '0.35%',
        beta: '0.83',
        aum: '$27.4B',
        stdDev: '14.83%',
        return1Y: '8.5%',
        return3Y: '14.4%',
        return5Y: 'N/A',
        sharpeRatio: 'N/A',
      },
      pros: ['Extremely high monthly income', 'Captures premium from tech volatility'],
      cons: ['Higher risk than JEPI', 'Upside capped, tax-inefficient distributions'],
      discussion: "JEPQ generates higher income than JEPI by applying the same options strategy to the more volatile Nasdaq-100, resulting in richer premiums. It shares the same tax inefficiency."
    },
  ],
  core: [
    {
      id: 'usmv',
      ticker: 'USMV',
      name: 'iShares MSCI USA Min Vol Factor ETF',
      strategy: 'Minimum Volatility',
      description: 'Aims to provide smoother returns than the broad market by holding a portfolio optimized for low volatility.',
      icon: Shield,
      benchmark: 'spy',
      metrics: {
        yield: '1.55%',
        expenseRatio: '0.15%',
        beta: '0.65',
        aum: '$23.6B',
        stdDev: '13.08%',
        return1Y: '13.84%',
        return3Y: '8.37%',
        return5Y: '13.53%',
        sharpeRatio: '0.88'
      },
      pros: ['Significantly less volatile', 'Strong downside protection', 'Good for risk-averse investors'],
      cons: ['Lags in strong bull markets', 'Not focused on income'],
      discussion: 'USMV uses a sophisticated optimizer that considers stock correlations, not just individual stability. This can lead to surprising holdings, like a large allocation to less-volatile tech stocks.'
    },
    {
      id: 'qual',
      ticker: 'QUAL',
      name: 'iShares MSCI USA Quality Factor ETF',
      strategy: 'Quality Factor',
      description: 'Targets companies with strong financial health: high ROE, stable earnings, and low debt.',
      icon: TrendingUp,
      benchmark: 'spy',
      metrics: {
        yield: '1.03%',
        expenseRatio: '0.15%',
        beta: '1.04',
        aum: '$48.4B',
        stdDev: '18.09%',
        return1Y: '5.17%',
        return3Y: '9.78%',
        return5Y: '17.67%',
        sharpeRatio: '0.87'
      },
      pros: ['Focus on fundamentally sound companies', 'Potential for long-term outperformance'],
      cons: ['Not a low-volatility strategy', 'Can be concentrated in Tech'],
      discussion: "It's important to understand QUAL is *not* a low-volatility fund. It's a pure bet on the academic theory that high-quality companies outperform over the long term, not that they offer a smoother ride."
    },
    {
      id: 'rsp',
      ticker: 'RSP',
      name: 'Invesco S&P 500 Equal Weight ETF',
      strategy: 'Equal Weight',
      description: 'Owns the S&P 500 but gives every company an equal slice, reducing mega-cap concentration.',
      icon: Briefcase,
      benchmark: 'spy',
      metrics: {
        yield: '1.58%',
        expenseRatio: '0.20%',
        beta: '1.02',
        aum: '$70.9B',
        stdDev: '19.45%',
        return1Y: '8.25%',
        return3Y: '7.66%',
        return5Y: '13.74%',
        sharpeRatio: '0.60'
      },
      pros: ['True diversification across S&P 500', 'Reduces concentration risk'],
      cons: ['Higher expense ratio than SPY', 'Underperforms when mega-caps lead'],
      discussion: "RSP isn't just diversification; it's a tactical bet. Its methodology creates 'hidden' but permanent tilts toward the Size (mid-cap) and Value factors, causing performance to diverge from the S&P 500."
    },
    {
      id: 'vtv',
      ticker: 'VTV',
      name: 'Vanguard Value ETF',
      strategy: 'Value Factor',
      description: 'Provides broad, diversified exposure to the large-cap value segment of the U.S. market.',
      icon: BarChart,
      benchmark: 'spy',
       metrics: {
        yield: '2.21%',
        expenseRatio: '0.04%',
        beta: '0.85',
        aum: '$133.4B',
        stdDev: '15.10%',
        return1Y: '8.79%',
        return3Y: '8.68%',
        return5Y: '13.86%',
        sharpeRatio: '0.79'
      },
      pros: ['Rock-bottom expense ratio', 'Broad exposure to the value factor'],
      cons: ['Can underperform in growth-led markets', 'Sector concentration in Financials/Health'],
      discussion: "VTV is a classic, pure-play value fund. It tracks the CRSP US Large Cap Value Index, providing a cheap and effective way to bet on the academic principle of value investing."
    },
  ],
};

const MetricCard = ({ label, value, benchmarkValue, benchmarkTicker }: { label: string; value: string; benchmarkValue?: string; benchmarkTicker?: string }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
    {benchmarkValue && <p className="text-xs text-gray-400 dark:text-gray-500">{benchmarkTicker}: {benchmarkValue}</p>}
  </div>
);

const PerformanceTable = ({ metrics, benchmarkMetrics, benchmarkTicker }: { metrics: any; benchmarkMetrics?: any; benchmarkTicker?: string }) => (
    <div className="text-sm">
        <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Performance & Risk</h4>
        <div className="grid grid-cols-5 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {['1Y Ann.', '3Y Ann.', '5Y Ann.', '5Y Std. Dev', '5Y Sharpe Ratio'].map(header => (
                 <div key={header} className="bg-gray-50 dark:bg-gray-800 p-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">{header}</div>
            ))}
            {[metrics.return1Y, metrics.return3Y, metrics.return5Y, metrics.stdDev, metrics.sharpeRatio].map((value, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-2 text-center font-semibold text-gray-900 dark:text-white">{value}</div>
            ))}
             {benchmarkMetrics && [benchmarkMetrics.return1Y, benchmarkMetrics.return3Y, benchmarkMetrics.return5Y, benchmarkMetrics.stdDev, benchmarkMetrics.sharpeRatio].map((value, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800/50 p-2 text-center text-xs text-gray-500 dark:text-gray-400">{benchmarkTicker}: {value}</div>
            ))}
        </div>
    </div>
);

const EtfCard = ({ etf, isBenchmark = false }: { etf: any; isBenchmark?: boolean }) => {
  const Icon = etf.icon;
  const bench = etf.benchmark ? benchmarkData[etf.benchmark as keyof typeof benchmarkData] : null;

  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl ${isBenchmark ? 'shadow-lg' : 'shadow-md hover:shadow-xl'} transition-shadow duration-300 p-6 flex flex-col space-y-4`}>
      <div className="flex items-center">
        <div className={`${isBenchmark ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'} p-3 rounded-lg mr-4`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{etf.ticker}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{etf.name}</p>
        </div>
      </div>
      <div>
        <p className={`text-sm font-semibold ${isBenchmark ? 'text-gray-600 dark:text-gray-400' : 'text-blue-600 dark:text-blue-400'} mb-1`}>{etf.strategy}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{etf.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MetricCard label="Yield" value={etf.metrics.yield} benchmarkValue={bench?.metrics?.yield} benchmarkTicker={bench?.ticker} />
        <MetricCard label="Expense Ratio" value={etf.metrics.expenseRatio} benchmarkValue={bench?.metrics?.expenseRatio} benchmarkTicker={bench?.ticker}/>
        <MetricCard label="Beta" value={etf.metrics.beta} benchmarkValue={bench?.metrics?.beta} benchmarkTicker={bench?.ticker}/>
        <MetricCard label="AUM" value={etf.metrics.aum} />
      </div>

      <PerformanceTable metrics={etf.metrics} benchmarkMetrics={bench?.metrics} benchmarkTicker={bench?.ticker} />
      
      <div className={`${isBenchmark ? 'bg-gray-100 dark:bg-gray-800/80 border-gray-400' : 'bg-blue-50 dark:bg-gray-800/50 border-blue-500'} border-l-4 p-4 rounded-r-lg`}>
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white flex items-center"><Info size={16} className={`mr-2 ${isBenchmark ? 'text-gray-500' : 'text-blue-500'}`}/>Strategic Insight</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">{etf.discussion}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-2">
        <div>
          <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Pros</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {etf.pros.map((pro: string, index: number) => <li key={index}>{pro}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Cons</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {etf.cons.map((con: string, index: number) => <li key={index}>{con}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ToggleSwitch = ({ isToggled, onToggle, IconOn, IconOff }: { isToggled: boolean; onToggle: () => void; IconOn: any; IconOff: any }) => (
    <button onClick={onToggle} className={`relative inline-flex items-center h-8 rounded-full w-14 transition-colors duration-300 focus:outline-none ${isToggled ? 'bg-gray-600' : 'bg-yellow-400'}`}>
        <span className="sr-only">Toggle</span>
        <span className={`absolute left-1 transition-transform duration-300 ${isToggled ? 'translate-x-6' : 'translate-x-0'}`}>
            {isToggled ? <IconOn className="text-white" /> : <IconOff className="text-gray-800" />}
        </span>
    </button>
);

const InteractiveETFGuide = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 min-h-screen font-sans">
        <div className="container mx-auto px-4 py-8 md:py-16">

          <header className="text-center mb-12 md:mb-20 relative">
            <div className="absolute top-0 right-0">
                <ToggleSwitch 
                    isToggled={darkMode} 
                    onToggle={() => setDarkMode(!darkMode)}
                    IconOn={Moon}
                    IconOff={Sun}
                />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              A Visual Guide to Advanced ETFs
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Beyond SPY and QQQ lies a world of strategic funds. Explore powerful alternatives designed for specific goals like generating income, reducing risk, and enhancing diversification.
            </p>
             <div className="mt-6 bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg inline-flex items-center text-sm">
                <Target size={16} className="mr-2"/>
                All Sharpe Ratios calculated using a 2% risk-free rate assumption.
            </div>
          </header>

          <section className="mb-16 md:mb-24">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Meet the Benchmarks</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">These are the market-cap weighted giants that form the baseline for comparison.</p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              <EtfCard etf={benchmarkData.spy} isBenchmark={true} />
              <EtfCard etf={benchmarkData.qqq} isBenchmark={true} />
            </div>
          </section>

          {/* Income-Focused ETFs Section */}
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Strategies for Income</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">From high-quality dividend payers to income-manufacturing machines.</p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {etfData.income.map(etf => <EtfCard key={etf.id} etf={etf} />)}
            </div>
          </section>

          {/* Core Portfolio ETFs Section */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Strategies for Your Core Portfolio</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Reshape your portfolio's foundation with factor-based and alternative-weighting ETFs.</p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {etfData.core.map(etf => <EtfCard key={etf.id} etf={etf} />)}
            </div>
          </section>
        
        </div>
        <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-800 mt-16">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                This information is for illustrative purposes only and does not constitute investment advice. Data is based on the provided analysis document and is subject to change. Always conduct your own research.
            </p>
        </footer>
      </main>
    </div>
  );
};

export default function AlternativeETFsPage() {
  const [activeSection, setActiveSection] = useState('overview');

  // Get current article for SEO
  const currentArticle = articles.find(article => article.slug === 'alternative-etfs-beyond-spy-qqq');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'interactive', 'methodology', 'conclusions', 'full-report'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <DeepResearchBadge />
      
      {/* Header with Return to Home */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            🚀 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Beyond SPY & QQQ</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            The Strategic ETF Revolution
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Discover high-performance alternatives to traditional market-cap giants • Income-focused strategies • Factor-based investing • Risk-optimized portfolios
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <TableOfContents activeSection={activeSection} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Overview Section */}
            <section id="overview" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Eye className="mr-3 text-blue-600" />
                Executive Summary
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  For decades, SPY and QQQ have dominated portfolio construction as the default choices for broad U.S. market exposure. 
                  However, their market-capitalization weighting methodology creates concentrated exposure to mega-cap technology stocks, 
                  presenting both opportunities and risks that may not align with every investor's objectives.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Key Research Findings</h3>
                  <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                    <li>&rarr; <strong>Concentration Risk:</strong> SPY and QQQ are increasingly concentrated bets on mega-cap technology</li>
                    <li>&rarr; <strong>Income Deficit:</strong> Low dividend yields (1.27% and 0.58% respectively) fail to meet income needs</li>
                    <li>&rarr; <strong>Strategic Alternatives:</strong> Purpose-built ETFs can address specific portfolio objectives</li>
                    <li>&rarr; <strong>Factor Exposure:</strong> Alternative weighting schemes provide access to academic risk factors</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Income Solutions</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• SCHD: Quality dividend growth (3.97% yield)</li>
                      <li>• VYM: Broad high-yield exposure (2.86% yield)</li>
                      <li>• JEPI/JEPQ: Options-based income (7-12% yield)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Core Alternatives</h4>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                      <li>• USMV: Minimum volatility (0.88 Sharpe ratio)</li>
                      <li>• QUAL: Quality factor exposure</li>
                      <li>• RSP: Equal-weight diversification</li>
                      <li>• VTV: Value factor tilt</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Guide Section */}
            <section id="interactive" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BarChart className="mr-3 text-blue-600" />
                Interactive ETF Comparison Tool
              </h2>
              
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Explore the comprehensive comparison of strategic ETF alternatives below. Each fund is analyzed against 
                  its appropriate benchmark (SPY or QQQ) across key metrics including performance, risk, cost, and strategic positioning.
                </p>
              </div>

              <InteractiveETFGuide />
            </section>

            {/* Research Methodology */}
            <section id="methodology" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FileText className="mr-3 text-blue-600" />
                Research Methodology
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Data Sources</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Fund prospectuses and fact sheets</li>
                      <li>• Historical performance data</li>
                      <li>• Holdings and sector analysis</li>
                      <li>• Academic factor research</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Analysis Framework</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Risk-adjusted returns (Sharpe ratios)</li>
                      <li>• Volatility and beta analysis</li>
                      <li>• Income generation capacity</li>
                      <li>• Factor exposure assessment</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Evaluation Criteria</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Strategic objective alignment</li>
                      <li>• Cost efficiency (expense ratios)</li>
                      <li>• Liquidity and AUM considerations</li>
                      <li>• Tax efficiency implications</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-6">
                  <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">Important Note on Sharpe Ratios</h4>
                  <p className="text-amber-800 dark:text-amber-200">
                    All Sharpe ratios in this analysis are calculated using a 2% risk-free rate assumption for consistency 
                    and comparability across funds. This standardized approach allows for meaningful cross-fund analysis 
                    while acknowledging that actual risk-free rates vary over time.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Insights */}
            <section id="conclusions" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="mr-3 text-blue-600" />
                Strategic Investment Insights
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">The Income Revolution</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Traditional market-cap weighted funds offer minimal income, but strategic alternatives can dramatically enhance yield:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Traditional Approach</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">SPY: 1.27% yield, QQQ: 0.58% yield</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">Income-Focused Alternatives</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">SCHD: 3.97%, JEPI: 7-9%, JEPQ: 9-12%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Risk Management Through Diversification</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Factor-based and alternative weighting strategies can reduce concentration risk while potentially enhancing returns:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>&rarr; <strong>USMV:</strong> 65% lower volatility than market with superior risk-adjusted returns</li>
                    <li>&rarr; <strong>RSP:</strong> Equal weighting eliminates mega-cap concentration bias</li>
                    <li>&rarr; <strong>QUAL:</strong> Systematic exposure to quality factor with academic support</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Tax Efficiency Considerations</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Not all income is created equal from a tax perspective. Options-based income funds (JEPI, JEPQ) 
                    generate distributions taxed as ordinary income, making them most suitable for tax-advantaged accounts. 
                    Traditional dividend funds maintain qualified dividend treatment for better after-tax returns in taxable accounts.
                  </p>
                </div>
              </div>
            </section>

            {/* Full Report Section */}
            <section id="full-report" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ExternalLink className="mr-3 text-blue-600" />
                Complete Research Report
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  This interactive summary provides key insights from our comprehensive 43,000+ word research document. 
                  The full report includes detailed analysis of dividend investing philosophies, options-based income strategies, 
                  factor methodology explanations, and complete portfolio construction frameworks.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Full Document Sections</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
                    <div>
                      <h4 className="font-medium mb-2">Part I: The Modern Quest for Income</h4>
                      <ul className="space-y-1 text-xs">
                        <li>• Dividend Quality vs. Quantity Analysis</li>
                        <li>• SCHD Deep Dive and Methodology</li>
                        <li>• VYM Diversification Strategy</li>
                        <li>• Options-Based Income Mechanics</li>
                        <li>• JEPI vs. JEPQ Comparative Analysis</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Part II: Core Portfolio Alternatives</h4>
                      <ul className="space-y-1 text-xs">
                        <li>• Factor Investing Theory and Practice</li>
                        <li>• Minimum Volatility Optimization</li>
                        <li>• Quality Factor Academic Evidence</li>
                        <li>• Equal Weight vs. Cap Weight Analysis</li>
                        <li>• Value Factor Historical Performance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="https://docs.google.com/document/d/e/2PACX-1vQUV9vciakDe7bjZP028JFEFflRog2KatsOC8DBD0acVNLoTg8XKKo865pdwh9ufFI5yPY13M3f2AwC/pub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Access Full Research Document
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Enhanced Disclaimer Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">
                ⚠️ Not Financial Advice - Educational Content Only
              </h3>
              <div className="text-red-800 dark:text-red-200 space-y-2">
                <p className="font-medium">
                  This analysis is designed for educational purposes to help you understand different ETF strategies and their characteristics.
                </p>
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">Why This Matters:</p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Personal Situation Varies:</strong> Your risk tolerance, time horizon, and financial goals are unique</li>
                    <li>• <strong>Market Conditions Change:</strong> Past performance doesn't guarantee future results</li>
                    <li>• <strong>Tax Implications:</strong> Different funds have varying tax consequences for your situation</li>
                    <li>• <strong>Professional Guidance:</strong> Complex financial decisions benefit from qualified advisor consultation</li>
                  </ul>
                </div>
                <p className="text-sm font-medium">
                  Always conduct your own research and consider consulting with qualified financial professionals before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-4">
              <strong>Educational Disclaimer:</strong> This analysis is for educational and informational purposes only 
              and does not constitute investment advice. All data is based on historical performance and publicly available 
              information. Past performance does not guarantee future results. Always conduct your own research and consider 
              consulting with qualified financial professionals before making investment decisions. ETF performance, yields, 
              and metrics are subject to change and market conditions.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 