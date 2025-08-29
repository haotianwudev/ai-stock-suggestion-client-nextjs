'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart3, Target, BookOpen, AlertTriangle, Briefcase, FileText, Users, TrendingUp, ShieldCheck, Scale, ListChecks, Search } from 'lucide-react';
import React from 'react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper component for consistent section titles
const SectionTitle = ({ icon: Icon, children }: { icon: React.ElementType, children: React.ReactNode }) => (
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 flex items-center justify-center text-center sm:text-left sm:justify-start">
    <Icon className="w-8 h-8 mr-4 text-indigo-500" />
    {children}
  </h2>
);

// Helper component for stat cards
const StatCard = ({ title, value, description }: { title: string, value: string, description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transform hover:-translate-y-1 transition-transform duration-300">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-4xl font-bold text-gray-900 my-2">{value}</p>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// Helper component for case study cards
const CaseStudyCard = ({ title, content }: { title: string, content: string }) => (
  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
    <h4 className="font-bold text-xl text-indigo-600 mb-2">{title}</h4>
    <p className="text-gray-700">{content}</p>
  </div>
);

export default function PoliticalAlphaArticle() {
  const currentArticle = articles.find(article => article.slug === 'political-alpha-congressional-stock-trading-guide');

  const pelosiPerformanceData = [
    { year: 2023, return: '65.0%', sp500: '26.3%', nasdaq100: '54.8%', outperformance: '+3,870' },
    { year: 2024, return: '54.0%', sp500: '25.0%', nasdaq100: '44.6%', outperformance: '+2,900' },
  ];

  const topTradersData = [
    { name: 'Rep. Josh Gottheimer (D-NJ)', committee: 'Financial Services; Intelligence', volume: '$91,050,000', trades: 526, sectors: 'Technology, Defense, Financials' },
    { name: 'Rep. Nancy Pelosi (D-CA)', committee: 'Speaker Emerita', volume: '$37,750,000', trades: 17, sectors: 'Technology, AI, Energy' },
    { name: 'Rep. Scott Franklin (R-FL)', committee: 'Armed Services; Appropriations', volume: '$5,993,000', trades: 69, sectors: 'Defense, Industrials' },
    { name: 'Sen. Tommy Tuberville (R-AL)', committee: 'Armed Services; Agriculture', volume: '$5,531,500', trades: 202, sectors: 'Defense, Agriculture' },
    { name: 'Sen. Markwayne Mullin (R-OK)', committee: 'Environment & Public Works', volume: '$4,407,000', trades: 71, sectors: 'Energy, Healthcare' },
  ];

  const platformData = [
    { name: 'Official House/Senate Portals', speed: 'Delayed (30-45 days)', analytics: 'None', cost: 'Free' },
    { name: 'Quiver Quantitative', speed: 'Near Real-Time', analytics: 'Yes', cost: 'Freemium' },
    { name: 'Unusual Whales', speed: 'Near Real-Time', analytics: 'Yes', cost: 'Premium' },
    { name: 'Finnhub API', speed: 'Programmatic', analytics: 'Custom', cost: 'Varies' },
  ];

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="bg-gray-50 text-gray-800 font-sans leading-relaxed">
        {/* Return to Home Button */}
        <div className="flex items-center gap-4 mb-4 px-6 pt-6">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Deep Research
          </span>
        </div>

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-wider">
              <span className="text-indigo-600">Political</span> Alpha
            </h1>
            <nav className="hidden md:flex items-center space-x-2">
              <a href="#pelosi" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition">The Pelosi Playbook</a>
              <a href="#traders" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition">Top Traders</a>
              <a href="#strategy" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition">Strategy</a>
              <a href="#risks" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition">Risks & Toolkit</a>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 sm:py-20">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              An Investor's Guide to <br />
              <span className="text-indigo-600">Congressional Stock Trading</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A select group of U.S. politicians have demonstrated extraordinary investment returns, consistently outperforming the market. Discover the data, the players, and the strategies.
            </p>
          </section>

          {/* Pelosi Playbook Section */}
          <section id="pelosi" className="mb-24 scroll-mt-20">
            <SectionTitle icon={TrendingUp}>The Pelosi Playbook: A Market-Beating Portfolio</SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <StatCard 
                title="2023 Portfolio Return" 
                value="65%" 
                description="vs. 26.3% for the S&P 500" 
              />
              <StatCard 
                title="2024 Portfolio Return" 
                value="54%" 
                description="vs. 25.0% for the S&P 500" 
              />
              <StatCard 
                title="Primary Strategy" 
                value="Leveraged Tech" 
                description="Concentrated bets in AI & Tech using call options" 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-center">
              <div className="space-y-6">
                <CaseStudyCard 
                  title="NVIDIA (NVDA)" 
                  content="Exercised 50 call options to acquire 50,000 shares at a strike price of just $12, realizing a multi-million-dollar gain on the AI boom." 
                />
                <CaseStudyCard 
                  title="Palo Alto Networks (PANW)" 
                  content="Yielded an estimated gain of approximately $2.8 million from exercising 140 call options in the cybersecurity firm." 
                />
                <CaseStudyCard 
                  title="Tempus AI (TEM)" 
                  content="The disclosure of the Pelosi investment was followed by a 35% surge in the company's share price, demonstrating the 'Pelosi Effect'." 
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <ShieldCheck className="w-6 h-6 mr-3 text-indigo-500"/>
                  Controversy & Defense
                </h3>
                <p className="text-gray-600 mb-4">
                  The portfolio's extraordinary performance has led to persistent accusations of insider trading, suggesting access to non-public information.
                </p>
                <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                  <p className="font-semibold text-indigo-800">The Official Defense:</p>
                  <p className="text-indigo-700 mt-1">
                    "Speaker Pelosi does not own any stocks and has no knowledge or subsequent involvement in any transactions."
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Decisions are attributed solely to her husband, Paul Pelosi, a venture capitalist.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Annual Performance vs. Benchmarks</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 font-semibold text-gray-700">Year</th>
                    <th className="p-4 font-semibold text-gray-700">Pelosi Portfolio Return</th>
                    <th className="p-4 font-semibold text-gray-700">S&P 500 (SPY)</th>
                    <th className="p-4 font-semibold text-gray-700">Nasdaq 100 (QQQ)</th>
                    <th className="p-4 font-semibold text-gray-700">Outperformance (vs. SPY)</th>
                  </tr>
                </thead>
                <tbody>
                  {pelosiPerformanceData.map((data, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4">{data.year}</td>
                      <td className="p-4 text-green-600 font-mono font-semibold">{data.return}</td>
                      <td className="p-4 font-mono">{data.sp500}</td>
                      <td className="p-4 font-mono">{data.nasdaq100}</td>
                      <td className="p-4 text-green-600 font-mono">{data.outperformance} bps</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Traders Section */}
          <section id="traders" className="mb-24 scroll-mt-20">
            <SectionTitle icon={Users}>Capitol Hill's Top Traders</SectionTitle>
            
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto text-center">
              While the Pelosi portfolio attracts the most attention, the practice of active stock trading is widespread in Congress, often in sectors related to their committee assignments.
            </p>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 mb-12">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 font-semibold text-gray-700">Politician & Committees</th>
                    <th className="p-4 font-semibold text-gray-700">Est. 2024 Trade Volume</th>
                    <th className="p-4 font-semibold text-gray-700">Trades</th>
                    <th className="p-4 font-semibold text-gray-700">Primary Sectors</th>
                  </tr>
                </thead>
                <tbody>
                  {topTradersData.map((trader, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-bold">{trader.name}</div>
                        <div className="text-sm text-gray-500">{trader.committee}</div>
                      </td>
                      <td className="p-4 font-mono">{trader.volume}</td>
                      <td className="p-4 font-mono">{trader.trades}</td>
                      <td className="p-4">{trader.sectors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Partisan Portfolio ETFs</h3>
                <p className="text-gray-600 mb-4">
                  The market has responded to these trends by creating politically themed ETFs that mirror the trades of each party.
                </p>
                <div className="space-y-4">
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <p className="font-bold text-blue-800">NANC (Democratic)</p>
                    <p className="text-2xl font-bold text-green-600">58.9% Return</p>
                  </div>
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <p className="font-bold text-red-800">GOP (Republican)</p>
                    <p className="text-2xl font-bold text-green-600">30.2% Return</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Committee Correlation</h3>
                <p className="text-gray-600">
                  A strong correlation exists between a politician's committee assignments and their trading activity, suggesting a potential informational advantage.
                </p>
                <p className="text-gray-600 mt-2">
                  For example, members of Armed Services committees frequently trade defense stocks, while those on Financial Services committees are active in banking and tech.
                </p>
              </div>
            </div>
          </section>

          {/* Strategy Section */}
          <section id="strategy" className="mb-24 scroll-mt-20">
            <SectionTitle icon={ListChecks}>A Framework for Implementation</SectionTitle>
            
            <p className="text-gray-600 mb-12 max-w-4xl mx-auto text-center">
              A simple "copy-and-paste" approach is unlikely to succeed. Treat disclosures as a source of high-potential ideas that require a disciplined, analytical framework.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                  <Users className="w-6 h-6"/>
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-2">1. Curation</h4>
                <p className="text-gray-600">
                  Select politicians to follow based on historical performance, committee assignments, and trading style (high-frequency vs. high-conviction).
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                  <TrendingUp className="w-6 h-6"/>
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-2">2. Information Flow</h4>
                <p className="text-gray-600">
                  Use a third-party platform to set up real-time alerts. Speed is critical to get ahead of the "crowded trade" effect that follows disclosures.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                  <Search className="w-6 h-6"/>
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-2">3. Trade Triage</h4>
                <p className="text-gray-600">
                  An alert is a starting point, not a buy signal. Analyze the price movement since the trade date and assess the company's current fundamentals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                  <Target className="w-6 h-6"/>
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-2">4. Execution</h4>
                <p className="text-gray-600">
                  Decide on the appropriate instrument (stock vs. options) and position size. Treat these as speculative trades within a diversified portfolio.
                </p>
              </div>
            </div>
          </section>

          {/* Risks & Toolkit Section */}
          <section id="risks" className="scroll-mt-20">
            <SectionTitle icon={Briefcase}>Risks & Investor Toolkit</SectionTitle>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-indigo-500"/>
                  The STOCK Act: Foundation & Flaws
                </h3>
                <p className="text-gray-600 mb-4">
                  The Stop Trading on Congressional Knowledge (STOCK) Act of 2012 mandates disclosure but is hampered by significant flaws.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Reporting Lag:</strong> Members have up to 45 days to disclose a trade, a critical delay for investors.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Negligible Penalties:</strong> A standard fine of just $200 for late filing is not a meaningful deterrent.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Lack of Enforcement:</strong> Despite common violations, no member of Congress has ever been prosecuted under the act.
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-indigo-500"/>
                  Data Sources & Platforms
                </h3>
                <p className="text-gray-600 mb-4">
                  An ecosystem of platforms makes tracking this data more actionable than sifting through raw government filings.
                </p>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 font-semibold text-gray-700">Platform</th>
                        <th className="p-3 font-semibold text-gray-700">Speed</th>
                        <th className="p-3 font-semibold text-gray-700">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {platformData.map((p, i) => (
                        <tr key={i} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="p-3 font-bold">{p.name}</td>
                          <td className="p-3">{p.speed}</td>
                          <td className="p-3">{p.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Key Risk Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <Scale className="w-8 h-8 mb-4 text-red-500" />
                  <h4 className="font-bold text-xl text-red-800 mb-2">Legislative Risk</h4>
                  <p className="text-red-700">
                    A bipartisan movement (e.g., the ETHICS Act) aims to ban congressional stock trading, which would make this entire strategy obsolete overnight.
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <TrendingUp className="w-8 h-8 mb-4 text-yellow-500" />
                  <h4 className="font-bold text-xl text-yellow-800 mb-2">Volatility & Concentration</h4>
                  <p className="text-yellow-700">
                    These portfolios are often highly concentrated and volatile. This is not a diversified, conservative strategy and carries high risk of drawdowns.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <Target className="w-8 h-8 mb-4 text-blue-500" />
                  <h4 className="font-bold text-xl text-blue-800 mb-2">Reporting Lag & Crowded Trades</h4>
                  <p className="text-blue-700">
                    The 45-day delay means you're buying late. The disclosure itself can cause a price surge, creating risk that you're buying at an inflated peak.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-24 bg-white">
          <div className="container mx-auto px-6 py-8 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}