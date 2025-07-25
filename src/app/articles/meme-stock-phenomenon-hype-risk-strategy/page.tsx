'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Rocket, Gem, Newspaper, AlertTriangle, CheckCircle, Circle, BookOpen, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Helper for styled text ---
const Keyword = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => {
  const colorClasses: { [key: string]: string } = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    yellow: 'text-amber-600',
  };
  return <span className={`font-bold text-lg ${colorClasses[color]}`}>{children}</span>;
};

// --- Data from the Research ---
const newMemeStocks = [
  { ticker: <Keyword color="purple">OPEN</Keyword>, name: 'Opendoor Technologies Inc.', performance: <span className="font-bold text-green-600">+440%</span>, narrative: 'Influencer mention ("100-bagger"), high short interest (>25%)' },
  { ticker: <Keyword color="purple">KSS</Keyword>, name: 'Kohl\'s Corp.', performance: <span className="font-bold text-green-600">Surged ~40%</span>, narrative: 'High retail trader inflow, high short interest' },
  { ticker: <Keyword color="purple">DNUT</Keyword>, name: 'Krispy Kreme Inc.', performance: <span className="font-bold text-green-600">Surged ~27%</span>, narrative: 'High short interest (~14%), r/wallstreetbets attention' },
  { ticker: <Keyword color="purple">GPRO</Keyword>, name: 'GoPro, Inc.', performance: <span className="font-bold text-green-600">Surged ~41%</span>, narrative: 'High short interest (~8%), r/wallstreetbets attention' },
  { ticker: <Keyword color="purple">BYND</Keyword>, name: 'Beyond Meat, Inc.', performance: <span className="font-bold text-green-600">Up {'>'}20%</span>, narrative: 'Struggling company, high short interest, previous meme status' },
];

const oldGuardStocks = [
  { ticker: <Keyword color="purple">GME</Keyword>, name: 'GameStop Corp.', peak: '$120.75', current: '~ $24', decline: <span className="font-bold text-red-600">~80%</span> },
  { ticker: <Keyword color="purple">AMC</Keyword>, name: 'AMC Entertainment', peak: '$726.00', current: '< $4', decline: <span className="font-bold text-red-600">{'>'}99%</span> },
  { ticker: <Keyword color="purple">BB</Keyword>, name: 'BlackBerry Limited', peak: '~ $28', current: '~ $4', decline: <span className="font-bold text-red-600">~85%</span> },
];

const glossaryTerms = [
  { term: <Keyword color="blue">Apes</Keyword>, definition: 'A term members of the meme stock community use to refer to themselves.' },
  { term: <Keyword color="green">Diamond Hands (💎🤲)</Keyword>, definition: 'Holding a stock through extreme volatility, believing it will ultimately soar.' },
  { term: <Keyword color="red">Paper Hands (🧻🤲)</Keyword>, definition: 'Selling shares at the first sign of a price drop or for a small profit.' },
  { term: <Keyword color="yellow">To the Moon (🚀🌙)</Keyword>, definition: 'A rallying cry that a stock\'s price will rise to extraordinary heights.' },
  { term: <Keyword color="green">Tendies (🔥🍗)</Keyword>, definition: 'Slang for profits or capital gains earned from a trade.' },
  { term: <Keyword color="red">Bagholder</Keyword>, definition: 'An investor who holds onto a stock as its price plummets.' },
  { term: <Keyword color="yellow">YOLO</Keyword>, definition: 'Justification for making a large, high-risk, all-or-nothing bet on a single stock.' },
  { term: <Keyword color="blue">DD</Keyword>, definition: 'Abbreviation for "Due Diligence," the research shared within the community.' },
];

const riskChecklistItems = [
  "Is the money I plan to use truly disposable? Can I afford for it to go to zero?",
  "Have I established a clear, non-negotiable price to sell for a profit?",
  "Have I established a clear, non-negotiable price to sell and cut my losses (stop-loss)?",
  "Is my decision to buy based on a strategy, or is it an emotional reaction (FOMO)?",
  "Am I psychologically prepared for the value to drop by 50% or more in a day?",
  "Do I understand my goal is to sell to another buyer, and I could be left without one?",
];

// --- Reusable Components ---
const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <section className="py-12 md:py-16">
    <div className="flex items-center mb-6">
      {icon}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 ml-4">{title}</h2>
    </div>
    <div className="text-slate-600 space-y-6 leading-relaxed text-base">
      {children}
    </div>
  </section>
);

const StockTable = ({ headers, data, caption }: { headers: string[]; data: any[]; caption: string }) => (
  <div className="w-full overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
      <caption className="caption-bottom text-slate-500 mt-2 text-sm text-left">{caption}</caption>
      <thead>
        <tr className="border-b border-gray-200">
          {headers.map((header, index) => (
            <th key={index} className="text-left font-semibold text-blue-600 p-4 uppercase tracking-wider text-sm bg-gray-50">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-gray-200/50 hover:bg-gray-50/80 transition-colors duration-200">
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="p-4 text-slate-700">
                {cellIndex === 0 ? <span className="font-bold text-gray-900">{cell}</span> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RiskChecklistItem = ({ item }: { item: string }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div 
      className="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm"
      onClick={() => setIsChecked(!isChecked)}
    >
      {isChecked ? 
        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" /> : 
        <Circle className="w-6 h-6 text-gray-400 mr-4 flex-shrink-0" />
      }
      <span className={`text-slate-700 ${isChecked ? 'line-through text-slate-400' : ''}`}>
        {item}
      </span>
    </div>
  );
};

export default function MemeStockPhenomenon() {
  const currentArticle = articles.find(article => article.slug === 'meme-stock-phenomenon-hype-risk-strategy');

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

      <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Return to Home Button */}
          <div className="flex items-center gap-4 mb-4 pt-8">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Deep Research Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              Deep Research
            </span>
          </div>

          {/* Hero Section */}
          <header className="text-center py-20 md:py-28 border-b border-blue-200/80">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Rocket className="w-12 h-12 text-blue-500" />
              <Gem className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              The <span className="text-blue-600">Meme Stock</span> Phenomenon
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
              An analytical guide to understanding the hype, the <Keyword color="red">risks</Keyword>, and the strategies for navigating one of the market's most <Keyword color="yellow">volatile</Keyword> arenas.
            </p>
          </header>

          {/* What is a Meme Stock? */}
          <Section title="Anatomy of a Meme Stock" icon={<BookOpen className="w-8 h-8 text-blue-500" />}>
            <p>A <Keyword color="blue">"meme stock"</Keyword> is a security whose price is driven by social media hype and coordinated retail investor action, rather than traditional financial metrics. These events are born from a unique mix of technology, culture, and market mechanics.</p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-xl text-blue-700 mb-2">Viral Popularity</h3>
                <p>Interest spreads like a meme on platforms like Reddit's r/wallstreetbets, X, and Facebook, creating a powerful narrative.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-xl text-blue-700 mb-2">Collective Action</h3>
                <p>Price movements are heavily influenced by the mass buying activity of individual retail investors, often framed as a "David vs. Goliath" battle.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-xl text-blue-700 mb-2">Disconnect from Fundamentals</h3>
                <p>Share prices often become completely detached from the company's actual financial health, revenue, or profit outlook.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-xl text-blue-700 mb-2">Extreme Volatility</h3>
                <p>The defining feature is wild and unpredictable price swings, where massive gains can be wiped out in hours.</p>
              </div>
            </div>
          </Section>

          {/* July 2025 Resurgence */}
          <Section title="July 2025: The Meme Stock Resurgence" icon={<Newspaper className="w-8 h-8 text-blue-500" />}>
            <p>The summer of 2025 saw a new wave of meme stock frenzies, targeting a fresh class of heavily shorted, often struggling companies. This resurgence demonstrated that the phenomenon is an enduring feature of the modern market.</p>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">The New Class of Meme Stocks</h3>
              <StockTable 
                headers={['Ticker', 'Company', '1-Month Performance', 'Narrative / Catalyst']}
                data={newMemeStocks}
                caption="Data as of late July 2025. Performance is not indicative of future results."
              />
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">The Old Guard: A Sobering Look Back</h3>
              <p className="mb-4">The original 2021 meme stocks provide a crucial lesson in long-term risk. While still volatile, their prices remain dramatically below their historic peaks.</p>
              <StockTable 
                headers={['Ticker', 'Company', '2021 Peak Price', 'July 2025 Price', 'Decline From Peak']}
                data={oldGuardStocks}
                caption="All prices are approximate and adjusted for splits where applicable."
              />
            </div>
          </Section>

          {/* The Profit Playbook */}
          <Section title="The Speculator's Playbook: How to Approach Meme Stocks" icon={<Gem className="w-8 h-8 text-blue-500" />}>
            <div className="bg-red-100/50 border border-red-300 p-6 rounded-lg flex items-start">
              <AlertTriangle className="w-10 h-10 text-red-500 mr-4 flex-shrink-0"/>
              <div>
                <h3 className="font-bold text-xl text-red-700">This is Not Investing. It's <Keyword color="red">High-Stakes Speculation</Keyword>.</h3>
                <p className="text-red-800/90 mt-2">Success is rare and depends on disciplined risk management, not <Keyword color="green">"diamond hands."</Keyword> The capital you use must be money you can afford to lose entirely. For most investors, a diversified, long-term strategy is far safer.</p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 1: The Personal <Keyword color="red">Risk</Keyword> Assessment</h3>
              <p className="mb-6">Before you even think about buying, you must honestly answer these questions. If you can't confidently say "Yes" to all, you should not proceed.</p>
              <div className="space-y-4">
                {riskChecklistItems.map((item, index) => (
                  <RiskChecklistItem key={index} item={item} />
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 2: Identifying Potential Targets</h3>
                <p className="mb-4">Speculators hunt for a specific profile:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li><span className="font-bold text-blue-600">High Short Interest:</span> The primary fuel for a squeeze.</li>
                  <li><span className="font-bold text-blue-600">Low Float / Small Cap:</span> Easier for buying waves to impact price.</li>
                  <li><span className="font-bold text-blue-600">Brand Recognition:</span> Familiar names make for better stories.</li>
                  <li><span className="font-bold text-blue-600">Struggling Fundamentals:</span> The "underdog" narrative is powerful.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 3: The Primacy of an Exit Strategy</h3>
                <p className="mb-4">To realize a <Keyword color="green">profit</Keyword>, you must sell. This is the opposite of the "diamond hands" ethos that fuels the rally. Emotional decision-making is your enemy.</p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li><span className="font-bold text-green-600">Take Profits:</span> Set a price target *before* you buy and stick to it. <Keyword color="red">Greed</Keyword> is a primary cause of failure.</li>
                  <li><span className="font-bold text-red-600">Cut Losses:</span> Use stop-loss orders to automatically sell if the price drops to a pre-defined level. This protects against catastrophic losses.</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Glossary */}
          <Section title="Meme Stock Glossary" icon={<BookOpen className="w-8 h-8 text-blue-500" />}>
            <p>Understanding the unique lexicon of the meme stock world is key to gauging the sentiment driving a rally.</p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {glossaryTerms.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-lg text-blue-700">{item.term}</h4>
                  <p className="text-slate-600 text-sm mt-1">{item.definition}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Call to Action */}
          <section className="py-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg my-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Dive Deeper?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Explore our comprehensive research on market dynamics, risk management, and systematic trading strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  📄 Read Full Research
                </a>
              )}
              {currentArticle?.podcastUrl && (
                <a 
                  href={currentArticle.podcastUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <Music className="inline mr-2" />
                  Listen to Podcast
                </a>
              )}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-10 mt-12 border-t border-blue-200/80">
            <p className="text-slate-500 text-sm mb-4">
              Disclaimer: This information is for educational purposes only and not financial advice. Trading meme stocks is extremely risky and can result in the complete loss of your capital. Consult with a qualified financial professional before making any investment decisions.
            </p>
            <p className="text-slate-500 text-sm">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}