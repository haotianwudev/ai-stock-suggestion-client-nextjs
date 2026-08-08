'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Scale, CheckCircle, XCircle, BookOpen, LineChart, Target, Repeat, GraduationCap, AlertTriangle, Briefcase, DollarSign, Globe, Layers } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// --- Data from the research document ---
const valuationMetrics = {
  peRatio: "19.72",
  pbRatio: "2.13",
  psRatio: "1.25",
  dividendYield: "1.31%",
  epsGrowth: "11.45%",
  historicalAvgPE: "21.5",
};

const sectorWeights = [
  { name: 'Industrials', weight: 17.74 },
  { name: 'Financials', weight: 17.69 },
  { name: 'Health Care', weight: 15.86 },
  { name: 'Info Tech', weight: 15.51 },
  { name: 'Cons. Disc.', weight: 9.95 },
  { name: 'Real Estate', weight: 5.77 },
  { name: 'Energy', weight: 4.89 },
  { name: 'Materials', weight: 4.23 },
  { name: 'Utilities', weight: 3.25 },
  { name: 'Communication', weight: 2.70 },
  { name: 'Cons. Staples', weight: 1.97 },
];

const topHoldings = [
  { name: 'Super Micro Computer Inc', ticker: 'SMCI', weight: 0.85 },
  { name: 'Credo Technology Group', ticker: 'CRDO', weight: 0.76 },
  { name: 'Bloom Energy Corp', ticker: 'BE', weight: 0.64 },
  { name: 'IonQ Inc', ticker: 'IONQ', weight: 0.60 },
  { name: 'Kratos Defense & Security', ticker: 'KTOS', weight: 0.54 },
  { name: 'Fabrinet', ticker: 'FN', weight: 0.46 },
  { name: 'Oklo Inc', ticker: 'OKLO', weight: 0.43 },
];

const inclusionCriteria = [
  {
    title: 'Nationality',
    description: 'Companies must be classified as U.S. based on their headquarters, incorporation, and primary stock exchange. This ensures a pure exposure to the domestic market.',
    icon: <Globe className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Eligible Exchanges',
    description: 'Stocks must trade on major, regulated exchanges like the NYSE or Nasdaq. This excludes over-the-counter (OTC) and pink-sheet stocks, which often lack liquidity and reporting standards.',
    icon: <Briefcase className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Minimum Size & Price',
    description: 'On "rank day" in May, a company must have a total market cap of at least $30M and a closing price of at least $1.00. This filters out the most speculative micro-caps.',
    icon: <DollarSign className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Share & Voting Rights',
    description: 'A minimum of 5% of the company\'s total shares must be available for public trading (known as "free float"). This excludes tightly controlled firms where the majority of shares are not on the market.',
    icon: <Scale className="w-6 h-6 text-blue-500" />
  },
];

const investmentPros = [
  {
    title: 'Higher Growth Potential',
    description: 'Smaller companies have more room to grow. They are often acquisition targets for larger firms, which can lead to significant stock price premiums for investors.',
    icon: <ArrowUpRight className="w-5 h-5 mr-2 text-green-500" />
  },
  {
    title: 'Broad Diversification',
    description: 'Unlike the S&P 500 where the top 10 companies dictate a large portion of returns, the Russell 2000 is far less concentrated. This mitigates single-stock risk significantly.',
    icon: <BookOpen className="w-5 h-5 mr-2 text-green-500" />
  },
  {
    title: 'U.S. Domestic Focus',
    description: 'With revenues primarily generated within the United States, these companies offer a direct investment in the U.S. economy, insulating portfolios from direct currency fluctuations and geopolitical issues abroad.',
    icon: <Globe className="w-5 h-5 mr-2 text-green-500" />
  },
  {
    title: 'Economic Bellwether',
    description: 'The performance of the Russell 2000 is often seen as a leading indicator of U.S. economic health, reflecting the sentiment of businesses on Main Street, not just Wall Street.',
    icon: <LineChart className="w-5 h-5 mr-2 text-green-500" />
  },
];

const investmentCons = [
  {
    title: 'Increased Volatility',
    description: 'Small-cap stocks historically have a higher beta, meaning their prices swing more dramatically than the broader market. This can lead to larger losses during downturns.',
    icon: <ArrowDownRight className="w-5 h-5 mr-2 text-red-500" />
  },
  {
    title: 'Economic Sensitivity',
    description: 'These companies are highly levered to the domestic economy. They are particularly vulnerable to rising interest rates (as they rely more on debt) and inflation (as they have less pricing power than large corporations).',
    icon: <LineChart className="w-5 h-5 mr-2 text-red-500" />
  },
  {
    title: 'Misses Mega-Trends',
    description: 'The strict size-based rules mean the index misses out on secular growth themes dominated by mega-caps. For example, the AI revolution has been primarily driven by giants like NVIDIA, which long ago graduated from the small-cap universe.',
    icon: <Target className="w-5 h-5 mr-2 text-red-500" />
  },
  {
    title: 'The "Profitability Problem"',
    description: 'A significant portion of the index (often 30-40%) consists of unprofitable companies. This can drag on overall returns and makes traditional valuation metrics like the P/E ratio misleading.',
    icon: <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
  },
];

const comparisonData = [
  { feature: 'Constituents', r2000: '~2,000', sp600: '~600' },
  { feature: 'Selection Method', r2000: 'Purely rules-based rank', sp600: 'Committee w/ profitability screen' },
  { feature: 'Profitability Screen', r2000: 'No', sp600: 'Yes (last 4 quarters profitable)' },
  { feature: 'Reconstitution', r2000: 'Annual (moving to semi-annual)', sp600: 'As-needed, continuous' },
  { feature: '10-Yr Ann. Return (Approx.)', r2000: '~7.8%', sp600: '~9.5%' },
  { feature: 'Historical Volatility', r2000: 'Higher', sp600: 'Lower' },
];

// --- Reusable Components ---
interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, title, subtitle, children, className = "" }: SectionProps) => (
  <section id={id} className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-gray-500">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4 transform hover:-translate-y-1 transition-transform duration-300">
    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default function Russell2000Page() {
  return (
    <ArticleFrame slug="russell-2000-small-cap-engine-deep-dive">
      <div className="bg-gray-50 font-sans">
        <p className="max-w-3xl mx-auto text-center text-lg text-gray-600 px-4 pb-8">
          A deep dive into the benchmark for America&apos;s small-cap stocks. Explore its construction, valuation, and its critical role as a high-fidelity barometer of the U.S. domestic economy.
        </p>

        {/* Anatomy Section */}
        <Section id="anatomy" title="Anatomy of the Index" subtitle="What defines the Russell 2000 and who gets in?" className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">A Purely Rules-Based Approach</h3>
              <p className="text-gray-600">
                The Russell 2000 is a segment of the broader Russell 3000 index, which represents about 98% of the investable U.S. equity market. The Russell 2000 comprises the smallest 2,000 companies by market capitalization from that list, making it the leading benchmark for U.S. small-cap stocks. Unlike committee-led indices like the S&amp;P 500, inclusion is a mechanical, transparent process based on verifiable criteria.
              </p>
              <div className="space-y-4">
                {inclusionCriteria.map(item => (
                  <div key={item.title} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-900">{item.title}</p>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Top Holdings (Illustrative)</h3>
              <p className="text-center text-sm text-gray-500 mb-4">
                Note: The top holdings change frequently, especially during reconstitution. This is a snapshot in time.
              </p>
              <div className="bg-gray-50 rounded-lg shadow-inner p-4">
                <ul className="space-y-3">
                  {topHoldings.map(stock => (
                    <li key={stock.ticker} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">{stock.name}</p>
                        <p className="text-sm text-gray-500">{stock.ticker}</p>
                      </div>
                      <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {stock.weight}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Sector Composition</h3>
            <p className="text-center text-gray-500 max-w-3xl mx-auto mb-6">
              The index is well-diversified across sectors, with a notable tilt towards cyclical areas like Industrials and Financials. This composition makes the index particularly sensitive to the business cycle, performing well during economic expansions but often struggling during contractions.
            </p>
            <div className="w-full">
              <div className="bg-white p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sectorWeights.map((sector, index) => (
                    <div key={sector.name} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                      <div
                        className="w-12 h-12 rounded-full mb-2 flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: `hsl(210, 80%, ${30 + index * 4}%)` }}
                      >
                        {sector.weight}%
                      </div>
                      <span className="text-xs text-center text-gray-600">{sector.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Reconstitution Section */}
        <Section id="reconstitution" title="The Great Rebalance" subtitle="How the index adapts to market changes.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Repeat className="mx-auto w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Annual Recalibration</h3>
              <p className="text-gray-600">
                Each June, the index is fully rebuilt based on market caps from &ldquo;rank day&rdquo; in May. This rigid, predictable schedule is a key feature and a source of criticism.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <GraduationCap className="mx-auto w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Graduation &amp; Demotion</h3>
              <p className="text-gray-600">
                Successful companies grow out of the Russell 2000 and &ldquo;graduate&rdquo; to the large-cap Russell 1000. Super Micro Computer (SMCI) is a famous recent example of a top performer leaving the index.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <AlertTriangle className="mx-auto w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">The &ldquo;Reconstitution Effect&rdquo;</h3>
              <p className="text-gray-600">
                Arbitrageurs and hedge funds front-run the predictable changes, buying expected additions and shorting deletions. This creates price distortions and a hidden cost for passive funds that are forced to trade at inflated/depressed prices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Layers className="mx-auto w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">&ldquo;Banding&rdquo; Mechanism</h3>
              <p className="text-gray-600">
                To reduce excessive turnover, a stock is only moved between indices if its market cap moves significantly (typically +/- 2.5%) beyond the breakpoint, creating a &ldquo;band&rdquo; to keep borderline companies stable.
              </p>
            </div>
          </div>
        </Section>

        {/* Valuation Section */}
        <Section id="valuation" title="What's the Price?" subtitle="A nuanced look at whether small-caps are cheap or expensive." className="bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <StatCard
              title="P/E Ratio (Excl. Neg.)"
              value={valuationMetrics.peRatio}
              icon={<LineChart className="w-6 h-6 text-blue-600"/>}
            />
            <StatCard
              title="Price/Book Ratio"
              value={valuationMetrics.pbRatio}
              icon={<BookOpen className="w-6 h-6 text-blue-600"/>}
            />
            <StatCard
              title="Price/Sales Ratio"
              value={valuationMetrics.psRatio}
              icon={<Scale className="w-6 h-6 text-blue-600"/>}
            />
            <StatCard
              title="Dividend Yield"
              value={valuationMetrics.dividendYield}
              icon={<DollarSign className="w-6 h-6 text-blue-600"/>}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-red-800">The Profitability Dilemma</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      The headline P/E ratio is highly misleading. With typically 30-40% of constituent companies being unprofitable, they are excluded from this calculation. This systematically understates the &ldquo;true&rdquo; valuation of the index. The high number of cash-burning firms means investors are paying for future growth that, for many, may never materialize.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-green-800">Historical Context</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Relative to history, a P/E of {valuationMetrics.peRatio} is slightly below the long-term average (around {valuationMetrics.historicalAvgPE}). Bulls argue this suggests small-caps are reasonably priced, especially if the economy avoids recession and these companies can grow into their valuations. However, this relies on earnings growth materializing as forecast.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Investment Thesis Section */}
        <Section id="thesis" title="The Investment Thesis" subtitle="Why consider small-caps, and what are the risks involved?">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <CheckCircle className="w-8 h-8 mr-3"/> The Pros
              </h3>
              <ul className="space-y-4">
                {investmentPros.map(item => (
                  <li key={item.title} className="flex flex-col">
                    <p className="font-semibold text-lg text-gray-900 flex items-center">
                      {item.icon} {item.title}
                    </p>
                    <p className="text-gray-600 ml-7">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                <XCircle className="w-8 h-8 mr-3"/> The Cons
              </h3>
              <ul className="space-y-4">
                {investmentCons.map(item => (
                  <li key={item.title} className="flex flex-col">
                    <p className="font-semibold text-lg text-gray-900 flex items-center">
                      {item.icon} {item.title}
                    </p>
                    <p className="text-gray-600 ml-7">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Critique Section */}
        <Section id="critique" title="A Methodological Critique" subtitle="Is market cap the best way to select small-cap stocks?" className="bg-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Russell 2000 vs. S&amp;P SmallCap 600</h3>
            <p className="text-center text-gray-500 mb-8">
              A simple profitability screen makes a world of difference in long-term performance.
            </p>
            <div className="overflow-x-auto">
              <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Feature</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Russell 2000</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">S&amp;P SmallCap 600</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {comparisonData.map((row) => (
                      <tr key={row.feature}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {row.feature}
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm ${
                          row.r2000 === 'No' || row.r2000.startsWith('~7.8') || row.r2000 === 'Higher'
                            ? 'text-red-500'
                            : 'text-gray-500'
                        }`}>
                          {row.r2000}
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm ${
                          row.sp600 === 'Yes' || row.sp600.startsWith('~9.5') || row.sp600 === 'Lower'
                            ? 'text-green-500'
                            : 'text-gray-500'
                        }`}>
                          {row.sp600}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-8 text-center text-gray-600">
              The conclusion from decades of data is clear: the S&amp;P 600&apos;s quality screen has led to persistent long-term outperformance with lower risk. Screening for profitability&mdash;even a modest amount&mdash;filters out speculative, cash-burning companies that are more likely to fail. This suggests the best returns come from buying <span className="font-semibold text-gray-900">good</span> small companies, a distinction the Russell 2000&apos;s purely mechanical, size-based methodology fails to make.
            </p>
          </div>
        </Section>

        {/* Conclusion Section */}
        <Section id="conclusion" title="Conclusion" subtitle="Synthesizing the analysis for the modern portfolio.">
          <div className="max-w-4xl mx-auto text-center bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">An Excellent Benchmark, A Flawed Investment Vehicle</h3>
            <p className="text-gray-600 text-lg">
              The Russell 2000 is an indispensable tool for measuring the small-cap market and the health of the domestic economy. Its broadness captures the entire opportunity set. However, its structural flaws&mdash;the costly reconstitution effect and the inclusion of hundreds of unprofitable firms&mdash;make ETFs that track it (like IWM) a suboptimal choice for most long-term, passive investors.
            </p>
            <p className="mt-4 text-gray-600 text-lg">
              For strategic, &ldquo;buy-and-hold&rdquo; exposure, investors may be better served by alternative indices with quality or profitability filters (like the S&amp;P SmallCap 600). The Russell 2000 is an excellent benchmark to measure a manager&apos;s performance against, but it may not be the best benchmark to <span className="font-bold">own</span> directly.
            </p>
          </div>
        </Section>
      </div>
    </ArticleFrame>
  );
}
