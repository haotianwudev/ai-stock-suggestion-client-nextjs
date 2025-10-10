'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, TrendingUp, Shield, BarChart, BookOpen, Anchor, Zap, Scale, ChevronsRight, Target, BrainCircuit, Sprout, AlertTriangle, DollarSign, Globe, Clock, TrendingDown as TrendingDownIcon } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Data for the analysis
const historicalTimelineData = [
  {
    year: '2018',
    title: 'The Opening Salvo',
    description: 'The Trump administration imposes tariffs on $50 billion of Chinese goods, citing unfair trade practices and intellectual property theft. China retaliates with its own tariffs, officially starting the trade war.',
  },
  {
    year: '2019',
    title: 'Escalation and Tech Focus',
    description: 'Tariffs are expanded to cover hundreds of billions of dollars in goods. The U.S. places Huawei on an "entity list," effectively restricting its access to American technology and escalating the conflict into the tech domain.',
  },
  {
    year: '2020',
    title: 'A Fragile Truce: The Phase One Deal',
    description: 'The U.S. and China sign the "Phase One" trade deal. China commits to buying more American goods and services, while the U.S. agrees to roll back some tariffs. Key structural issues remain unresolved.',
  },
  {
    year: '2021',
    title: 'Strategic Competition Intensifies',
    description: 'The Biden administration maintains the tariffs, framing the relationship as "strategic competition." The focus remains on tech supremacy, supply chain security, and human rights issues.',
  },
  {
    year: '2022-23',
    title: 'The CHIPS War',
    description: 'The U.S. passes the CHIPS and Science Act to boost domestic semiconductor production. It follows with sweeping export controls to cut China off from advanced semiconductor technology, further deepening the tech divide.',
  },
  {
    year: '2024',
    title: 'De-risking and Diversification',
    description: 'Global companies accelerate efforts to "de-risk" their supply chains, moving manufacturing out of China to countries like Vietnam, Mexico, and India. This reflects a permanent shift in global trade calculus.',
  },
];

const shockEventTimelineData = [
  {
    time: 'Oct 8, 2025',
    title: 'Market Hits Peak Optimism',
    description: 'The S&P 500 posts its latest record close, capping a 7-day winning streak amidst "AI-driven euphoria" and seemingly benign economic data.',
    icon: 'peak',
  },
  {
    time: 'Oct 9, 2025',
    title: 'Beijing Makes a Strategic Move',
    description: 'China expands export controls to cover rare earth processing and magnet production technologies, a surgical strike at U.S. tech and defense supply chains.',
    icon: 'china',
  },
  {
    time: 'Oct 10, Morning',
    title: 'A Deceptively Calm Open',
    description: 'Markets open higher, fueled by news of a Gaza ceasefire and falling Treasury yields. The Nasdaq touches a new all-time intraday high.',
    icon: 'calm',
  },
  {
    time: 'Oct 10, Midday',
    title: 'The Digital Salvo',
    description: 'Former President Trump threatens a "massive increase" in tariffs on all Chinese goods via social media, shattering market calm and reviving fears of an all-out economic war.',
    icon: 'trump',
  },
  {
    time: 'Oct 10, Afternoon',
    title: 'Rapid Reversal to Panic',
    description: 'Sentiment reverses instantly. Algorithmic trading amplifies the sell-off as machines parse the headline risk. The VIX (volatility index) surges over 40%.',
    icon: 'panic',
  },
  {
    time: 'Oct 10, Close',
    title: 'Broad-Based Carnage',
    description: 'The S&P 500 closes down 2.7%, its worst day since April. The tech-heavy Nasdaq, highly exposed to global supply chains, also falls 2.7%.',
    icon: 'close',
  },
];

const marketStats = [
  { name: 'S&P 500', value: '-2.7%', Icon: TrendingDown, color: 'text-red-500' },
  { name: 'NASDAQ', value: '-2.7%', Icon: TrendingDown, color: 'text-red-500' },
  { name: 'PHLX Semiconductor', value: '-4.1%', Icon: TrendingDown, color: 'text-red-500' },
  { name: 'Qualcomm', value: '-5.5%', Icon: TrendingDown, color: 'text-red-500' },
  { name: 'MP Materials', value: '+11%', Icon: TrendingUp, color: 'text-green-500' },
  { name: 'Gold Price', value: '>$4,000/oz', Icon: Shield, color: 'text-yellow-600' },
];

const investorPlaybook = [
  { 
    icon: BrainCircuit, 
    title: "Fight the Urge to Panic Sell", 
    description: "Emotional decisions are rarely profitable. Selling into a panic locks in temporary losses. History shows markets are resilient over the long term, and missing the best recovery days can devastate returns." 
  },
  { 
    icon: Scale, 
    title: "Reaffirm Your Financial Plan", 
    description: "A crisis is the ultimate test of your strategy. Review your long-term goals and risk tolerance. Is your asset allocation still appropriate? For most, sticking to the plan is the best course of action." 
  },
  { 
    icon: ChevronsRight, 
    title: "Employ Dollar-Cost Averaging", 
    description: "This is precisely the environment where dollar-cost averaging proves its worth. Investing a fixed amount regularly (e.g., from each paycheck) allows you to buy more shares when prices are low, lowering your average cost." 
  },
  { 
    icon: Target, 
    title: "Look for Quality Amidst Wreckage", 
    description: "Indiscriminate sell-offs create discounts. Differentiate between temporary sentiment hits and permanent damage. Look for companies with strong balance sheets, durable competitive advantages, and low exposure to the conflict's epicenter." 
  },
  { 
    icon: Sprout, 
    title: "Consider Tax-Loss Harvesting", 
    description: "In taxable brokerage accounts, this is an opportunity. Selling losing investments can generate a loss that offsets taxable gains elsewhere in your portfolio, effectively turning lemons into lemonade." 
  },
];

// Helper Components
const ShockTimelineItem = ({ data, isLast }: { data: any; isLast: boolean }) => {
  const getIcon = () => {
    const iconClass = "w-6 h-6 text-white";
    switch(data.icon) {
      case 'peak': return <TrendingUp className={iconClass} />;
      case 'china': return <Anchor className={iconClass} />;
      case 'calm': return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
      case 'trump': return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.875 9.168-3.918" /></svg>;
      case 'panic': return <Zap className={iconClass} />;
      case 'close': return <BarChart className={iconClass} />;
      default: return <BookOpen className={iconClass} />;
    }
  };

  return (
    <div className="relative flex items-start pl-12 md:pl-0">
      {!isLast && <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"></div>}
      <div className="absolute top-0 left-0">
        <span className="absolute top-2 left-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ring-8 ring-gray-50 z-10">
          {getIcon()}
        </span>
      </div>
      <div className="ml-10 pt-1 flex-1">
        <p className="font-semibold text-gray-500 text-sm">{data.time}</p>
        <h3 className="font-bold text-xl text-gray-800 mt-1">{data.title}</h3>
        <p className="mt-2 text-gray-600 max-w-md">{data.description}</p>
      </div>
    </div>
  );
};

export default function TradeWarReduxAnalysis() {
  const currentArticle = articles.find(article => article.slug === 'trade-war-redux-october-10-market-shock-analysis');

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

      <div className="min-h-screen bg-gray-50">
        {/* Header with Return to Home Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
            
            {/* Deep Research Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <BookOpen className="w-3 h-3 mr-1" />
                Deep Research
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trade War Redux: Anatomy of the October 10th Market Shock
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              An in-depth analysis of the October 10, 2025 market shock that saw the S&P 500 fall 2.7% following renewed U.S.-China trade tensions.
            </p>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                October 12, 2025
              </span>
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                Geopolitical Analysis
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          
          {/* Executive Summary */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-12 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Executive Summary</h3>
                <p className="text-blue-800">
                  The October 10, 2025 market shock represents a classic case of geopolitical sentiment overwhelming fundamentals. 
                  While the immediate trigger was renewed trade war rhetoric, the underlying dynamics reflect deeper structural tensions 
                  in U.S.-China relations that have been building for nearly a decade. This analysis provides historical context, 
                  examines the market psychology behind the sell-off, and offers a disciplined framework for navigating such volatility.
                </p>
              </div>
            </div>
          </div>

          {/* Analyst's Take Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Analyst's Take: Volatility as Opportunity?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Geopolitical shocks are unsettling, but historical context provides a valuable lens for navigating the turmoil.
            </p>
            
            <div className="space-y-8">
              <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                  Historical Precedent for Geopolitical Shocks
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Markets detest uncertainty, and events like this inject a massive dose. Historically, the initial reaction to 
                  geopolitical shocks (e.g., Brexit, the 2018 tariff initiations, the invasion of Ukraine) is a sharp, 
                  sentiment-driven sell-off. The key takeaway from past events is that markets often overreact. While the S&P 500 
                  fell nearly 20% during the 2018 trade war escalation, it recovered to new highs within months. The initial shock 
                  gives way to a more nuanced assessment of the actual economic impact.
                </p>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  How Long Do Drawdowns Last?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The duration of a drawdown depends on the severity of the crisis and the policy response. For sentiment-driven 
                  shocks without an immediate, deep recession, drawdowns of 10-15% typically find a bottom within{' '}
                  <span className="font-bold text-blue-600">1 to 3 months</span>. The full recovery to prior highs can take longer, 
                  often in the range of <span className="font-bold text-blue-600">4 to 6 months</span>. However, if these tariff 
                  threats materialize into policy that severely damages corporate earnings, the drawdown could be deeper and more 
                  prolonged, resembling a cyclical bear market.
                </p>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Is This a Good Chance for Retail Investors?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  For investors with a long-term horizon (5+ years) and adequate liquidity, such events represent a{' '}
                  <span className="font-bold text-green-600">potential opportunity</span>. It allows for the purchase of 
                  high-quality assets at discounted prices. The crucial task is to differentiate between fundamentally sound 
                  companies caught in the panic versus those whose business models are permanently impaired by new trade realities. 
                  Rushing in is unwise, but a disciplined strategy of <span className="font-bold">dollar-cost averaging</span> into 
                  a diversified portfolio over the coming weeks and months could be highly rewarding.
                </p>
              </div>
            </div>
          </section>

          {/* Historical Timeline Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Road to October 10th</h2>
            <p className="text-lg text-gray-600 mb-12">
              This recent shock wasn't a bolt from the blue. It was the latest chapter in a multi-year economic conflict 
              that has reshaped global trade.
            </p>
            
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-gray-200 hidden md:block"></div>
              {historicalTimelineData.map((item, index) => (
                <div key={index} className={`relative md:flex mb-12 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 p-4">
                    <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                      <p className="text-blue-600 font-bold text-2xl mb-2">{item.year}</p>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-1/2 left-1/2 -mt-4 -ml-4 w-8 h-8 rounded-full bg-blue-500 border-4 border-white"></div>
                  <div className="md:w-1/2 p-4"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Shock Event Timeline Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Anatomy of the Shock</h2>
            <p className="text-lg text-gray-600 mb-12">
              A minute-by-minute account of how a calm trading day devolved into the worst session since April, 
              driven by geopolitical tremors.
            </p>
            
            <div className="max-w-xl mx-auto space-y-12">
              {shockEventTimelineData.map((item, index) => (
                <ShockTimelineItem key={index} data={item} isLast={index === shockEventTimelineData.length - 1} />
              ))}
            </div>
          </section>

          {/* Market Impact Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Ripple Effect</h2>
            <p className="text-lg text-gray-600 mb-12">
              The sell-off was broad and deep, with technology and semiconductor stocks at the epicenter of the damage. 
              Here's a snapshot of the market carnage.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center mb-12">
              {marketStats.map(({ name, value, Icon, color }) => (
                <div key={name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all transform hover:-translate-y-1">
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${color}`} />
                  <h3 className="font-semibold text-gray-500 text-sm">{name}</h3>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="text-center p-8 bg-gray-100/70 rounded-xl border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-3">A Tale of Two Strategies</h3>
              <p className="text-gray-600 leading-relaxed">
                The market reaction highlights the strategic nature of the conflict. The U.S. threat was a blunt instrument 
                targeting the entire Chinese economy. In contrast, China's recent moves—from restricting rare earth tech to 
                launching antitrust probes against firms like Qualcomm—are surgical strikes designed to create targeted pain 
                points in the U.S. tech sector and build leverage for future negotiations.
              </p>
            </div>
          </section>

          {/* Investor Playbook Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">A Disciplined Investor's Playbook</h2>
            <p className="text-lg text-gray-600 mb-12">
              Geopolitical shocks test investor discipline. History suggests that a strategic, long-term perspective is 
              the key to navigating volatility.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {investorPlaybook.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-xl hover:border-blue-400">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="ml-4 text-lg font-bold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Risk Warning */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-12 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Investment Disclaimer</h3>
                <p className="text-yellow-800">
                  This analysis is for educational and informational purposes only and should not be considered as investment advice. 
                  Geopolitical events can have unpredictable impacts on financial markets. Past performance does not guarantee future results. 
                  Always consult with a qualified financial advisor before making investment decisions and consider your risk tolerance 
                  and investment objectives.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Continue Your Market Analysis Journey</h3>
            <p className="text-lg mb-6 opacity-90">
              Explore more deep research articles on market dynamics, geopolitical analysis, and investment strategies.
            </p>
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 mr-4"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research Document
              </a>
            )}
            <Link 
              href="/"
              className="inline-block bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              Explore More Articles
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            <p className="mt-2">
              This analysis examines the October 10, 2025 market shock within the broader context of U.S.-China trade relations.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}