'use client';

import { TrendingUp, TrendingDown, Zap, Target, Eye, CheckCircle, XCircle, Bot, BrainCircuit, Dna, Package, Coins, CircleDollarSign, Newspaper } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const summaryData = {
  philosophy: {
    title: "Philosophy: Super-Exponential Growth",
    coreThesis: "ARK's strategy is built on five core innovation platforms expected to converge and drive 'super-exponential growth':",
    platforms: [
      { name: "Artificial Intelligence", icon: BrainCircuit },
      { name: "Robotics", icon: Bot },
      { name: "Energy Storage", icon: Package },
      { name: "DNA Sequencing", icon: Dna },
      { name: "Blockchain Technology", icon: Coins },
    ],
    metrics: [
      { name: "Disruptive Potential & Revenue Growth", icon: Zap },
      { name: "Long-Term Valuation Models (5-Year Horizon)", icon: Target },
      { name: "Open Research Ecosystem", icon: Eye },
    ]
  },
  performance: {
    title: "Performance: A Tale of Boom and Bust",
    description: "ARKK's performance is a study in extremes, showcasing incredible highs and devastating lows. This volatility has led to a significant 'investor experience gap,' where timing was everything.",
    chartData: [
      { year: 2017, arkk: 87.4, sp500: 23.52 },
      { year: 2018, arkk: 3.6, sp500: -5.90 },
      { year: 2019, arkk: 35.7, sp500: 34.55 },
      { year: 2020, arkk: 152.5, sp500: 18.84 },
      { year: 2021, arkk: -23.4, sp500: 29.88 },
      { year: 2022, arkk: -67.0, sp500: -18.14 },
      { year: 2023, arkk: 67.8, sp500: 25.11 },
      { year: 2024, arkk: 8.4, sp500: 18.04 },
    ],
    keyStats: [
      { label: "Expense Ratio", value: "0.75% (ARKK)", isNegative: true },
      { label: "Beta vs. S&P 500", value: "~1.9 - 2.0", isNegative: true },
      { label: "Portfolio Turnover", value: "33% - 50% Annually", isNegative: false },
      { label: "Wealth Destruction (10-yr)", value: "$14.3B (Fund Family)", isNegative: true }
    ]
  },
  prosCons: {
    title: "The Bull vs. Bear Case",
    pros: [
      { title: "Visionary Focus", description: "Unwavering dedication to future tech ignored by traditional investors." },
      { title: "Asymmetric Returns", description: "Strategy is designed to capture exponential growth of 'winner-take-most' companies." },
      { title: "Deep Thematic Expertise", description: "Specialized, interdisciplinary research on innovation platforms." },
      { title: "Radical Transparency", description: "Publishes research and daily trades, building a loyal community." },
    ],
    cons: [
      { title: "Extreme Volatility", description: "Violent performance swings unsuitable for most investors (Beta ~2.0)." },
      { title: "Concentration Risk", description: "A highly correlated bet on a single market factor: disruptive tech." },
      { title: "Questionable Risk Management", description: "Instinct-driven decisions and speculative models have led to massive losses (e.g., Teladoc)." },
      { title: "High Fees for Underperformance", description: "0.75% expense ratio is a major drag during prolonged downturns." },
    ]
  },
  caseStudies: {
    title: "Landmark Successes & High-Profile Failures",
    successes: [
      { name: "Tesla (TSLA)", outcome: "Quintessential success. Early, bullish call returned nearly 2,100% on initial investment.", icon: TrendingUp },
      { name: "Nvidia (NVDA)", outcome: "Identified foundational AI leader early. First shares climbed ~5,200%.", icon: TrendingUp },
      { name: "Bitcoin", outcome: "Contrarian institutional bet paid off spectacularly, validating blockchain thesis.", icon: TrendingUp },
    ],
    failures: [
      { name: "Zoom (ZM)", outcome: "Growth thesis unraveled post-pandemic. Bold $1,500 price target failed.", icon: TrendingDown },
      { name: "Teladoc (TDOC)", outcome: "Catastrophic loss (>90% drop). A case study in flawed sell discipline.", icon: TrendingDown },
    ]
  },
  recentOutlook: {
    title: "Recent News & Market Outlook (2024-2025)",
    commentary: "Cathie Wood remains staunchly bullish, predicting a productivity-led boom driven by her core innovation themes. She sees deflation, not inflation, as the primary long-term risk and has been a vocal critic of the Fed's rate hikes.",
    trades: [
      { action: "Buy", company: "AMD", rationale: "Aggressively buying the dip in a key AI hardware competitor." },
      { action: "Sell", company: "Circle (CRCL)", rationale: "Took massive profits after a >7x post-IPO surge." },
      { action: "Buy", company: "Robinhood (HOOD)", rationale: "Continued conviction in the fintech disruption theme." },
      { action: "Hold", company: "Palantir (PLTR)", rationale: "Maintains it's a future dominant AI software platform." },
    ]
  },
  conclusion: {
    title: "Final Analysis",
    text: "ARK Invest offers a high-risk, high-reward, venture capital-style strategy for the public markets. It's a pure-play bet on Cathie Wood's singular vision of a tech-driven future. Success hinges on her thesis proving correct within a specific timeframe. The strategy is unsuitable as a core holding for most investors and demands a long time horizon, extreme risk tolerance, and a deep alignment with ARK's specific technological convictions."
  }
};

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800/50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 ${className}`}>
    {children}
  </div>
);

const Philosophy: React.FC<{ philosophy: typeof summaryData.philosophy }> = ({ philosophy }) => {
  const { coreThesis, platforms, metrics } = philosophy;
  return (
    <section>
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-300">{coreThesis}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 text-center">
        {platforms.map(platform => (
          <div key={platform.name} className="flex flex-col items-center p-4">
            <platform.icon className="h-12 w-12 text-indigo-500 mb-3" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">{platform.name}</h3>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {metrics.map(metric => (
          <Card key={metric.name}>
            <div className="flex items-center">
              <metric.icon className="h-8 w-8 text-indigo-500 mr-4"/>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{metric.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

const PerformanceChart: React.FC<{ data: typeof summaryData.performance.chartData }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.arkk), ...data.map(d => d.sp500));
  const minValue = Math.min(...data.map(d => d.arkk), ...data.map(d => d.sp500));
  const range = maxValue - minValue;

  const getBarHeight = (value: number) => {
    if (range === 0) return '50%';
    const position = ((value - minValue) / range) * 100;
    return `${position}%`;
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-6 mt-8 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">ARKK vs. S&amp;P 500 Annual Returns (%)</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-500 rounded-sm mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">ARKK</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-sm mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">S&amp;P 500</span>
          </div>
        </div>
      </div>
      <div className="w-full h-80 flex items-end space-x-2 md:space-x-4 border-l border-b border-gray-200 dark:border-gray-700 p-4 relative">
        {data.map(({ year, arkk, sp500 }) => (
          <div key={year} className="flex-1 h-full flex flex-col justify-end items-center relative group">
            <div className="w-full flex justify-center items-end h-full gap-1">
              <div
                className="w-1/2 bg-indigo-500 rounded-t-md transition-all duration-300 hover:bg-indigo-400"
                style={{ height: getBarHeight(arkk) }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 z-10">
                  ARKK: {arkk}%
                </div>
              </div>
              <div
                className="w-1/2 bg-gray-300 dark:bg-gray-600 rounded-t-md transition-all duration-300 hover:bg-gray-400"
                style={{ height: getBarHeight(sp500) }}
              >
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 z-10">
                  S&amp;P500: {sp500}%
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Performance: React.FC<{ performance: typeof summaryData.performance }> = ({ performance }) => {
  const { description, chartData, keyStats } = performance;
  return (
    <section>
      <p className="max-w-3xl mx-auto text-center text-lg text-gray-600 dark:text-gray-300 mb-8">{description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {keyStats.map(stat => (
          <Card key={stat.label} className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.isNegative ? 'text-red-500' : 'text-green-500'}`}>{stat.value}</p>
          </Card>
        ))}
      </div>
      <PerformanceChart data={chartData} />
    </section>
  );
};

const ProsCons: React.FC<{ prosCons: typeof summaryData.prosCons }> = ({ prosCons }) => {
  const { pros, cons } = prosCons;
  return (
    <section className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <h3 className="text-2xl font-bold text-green-500 mb-6 flex items-center"><CheckCircle className="mr-3" /> The Bull Case (Pros)</h3>
        <div className="space-y-4">
          {pros.map(item => (
            <Card key={item.title}>
              <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center"><XCircle className="mr-3" /> The Bear Case (Cons)</h3>
        <div className="space-y-4">
          {cons.map(item => (
            <Card key={item.title}>
              <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies: React.FC<{ caseStudies: typeof summaryData.caseStudies }> = ({ caseStudies }) => {
  const { successes, failures } = caseStudies;
  return (
    <section className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Major Successes</h3>
        <div className="space-y-4">
          {successes.map(item => (
            <Card key={item.name} className="border-l-4 border-green-500">
              <div className="flex items-start">
                <item.icon className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.outcome}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Notable Failures</h3>
        <div className="space-y-4">
          {failures.map(item => (
            <Card key={item.name} className="border-l-4 border-red-500">
              <div className="flex items-start">
                <item.icon className="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.outcome}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecentOutlook: React.FC<{ recentOutlook: typeof summaryData.recentOutlook }> = ({ recentOutlook }) => {
  const { commentary, trades } = recentOutlook;
  return (
    <section className="grid lg:grid-cols-2 gap-8 items-center">
      <Card>
        <Newspaper className="h-10 w-10 text-indigo-500 mb-4" />
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Market Commentary</h3>
        <p className="text-gray-600 dark:text-gray-300">{commentary}</p>
      </Card>
      <Card>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Trades</h3>
        <ul className="space-y-3">
          {trades.map(trade => (
            <li key={trade.company} className="flex items-center">
              <span className={`font-semibold mr-2 px-2 py-0.5 rounded text-xs ${
                trade.action === 'Buy' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                trade.action === 'Sell' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>{trade.action}</span>
              <span className="font-bold mr-2 text-gray-800 dark:text-white">{trade.company}:</span>
              <span className="text-gray-600 dark:text-gray-400 text-sm">{trade.rationale}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
};

const Conclusion: React.FC<{ conclusion: typeof summaryData.conclusion }> = ({ conclusion }) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-700 dark:from-black dark:to-gray-800 text-white rounded-2xl p-8 md:p-12">
    <div className="max-w-3xl mx-auto text-center">
      <CircleDollarSign className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{conclusion.title}</h2>
      <p className="text-lg text-gray-300">{conclusion.text}</p>
    </div>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white text-center mb-8">
    {children}
  </h2>
);

export default function ARKInvestAnalysis() {
  return (
    <ArticleFrame
      slug="ark-invest-cathie-wood-strategy-analysis"
      additionalDisclaimer="ARK Invest strategies involve significant risk and may not be suitable for all investors."
    >
      <div className="space-y-16">
        <div>
          <SectionTitle>{summaryData.philosophy.title}</SectionTitle>
          <Philosophy philosophy={summaryData.philosophy} />
        </div>
        <div>
          <SectionTitle>{summaryData.performance.title}</SectionTitle>
          <Performance performance={summaryData.performance} />
        </div>
        <div>
          <SectionTitle>{summaryData.prosCons.title}</SectionTitle>
          <ProsCons prosCons={summaryData.prosCons} />
        </div>
        <div>
          <SectionTitle>{summaryData.caseStudies.title}</SectionTitle>
          <CaseStudies caseStudies={summaryData.caseStudies} />
        </div>
        <div>
          <SectionTitle>{summaryData.recentOutlook.title}</SectionTitle>
          <RecentOutlook recentOutlook={summaryData.recentOutlook} />
        </div>
        <Conclusion conclusion={summaryData.conclusion} />
      </div>
    </ArticleFrame>
  );
}
