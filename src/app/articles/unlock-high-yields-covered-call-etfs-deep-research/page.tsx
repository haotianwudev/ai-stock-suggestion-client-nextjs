'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, TrendingUp, DollarSign, Percent, BarChart, CheckCircle, XCircle, BookOpen, Banknote, FileText, Calendar, Target, Layers, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Reusable Components ---
const Section = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-blue-800 mb-12">
    {children}
  </h2>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ${className}`}>
    <div className="p-6 md:p-8">
      {children}
    </div>
  </div>
);

// --- Page-Specific Components ---
const Hero = () => (
  <div className="bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-blue-800">
        Unlock High Yields with
        <span className="block text-yellow-600 mt-2">Covered Call ETFs</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-800">
        A deep dive into the strategies, yields, and risks of popular funds like JEPI, JEPQ, GPIX, and the 'YLDs'. 
        Understand the trade-offs before you invest.
      </p>
    </div>
  </div>
);

const HowItWorks = () => {
  const steps = [
    { 
      icon: <Banknote className="w-10 h-10 text-blue-800" />, 
      title: "Buy Assets", 
      description: "The ETF first buys and holds a basket of underlying stocks, such as those in the S&P 500 or Nasdaq-100." 
    },
    { 
      icon: <FileText className="w-10 h-10 text-blue-800" />, 
      title: "Sell Call Options", 
      description: "The fund then sells 'call options' against these assets, giving a buyer the right to purchase them at a set 'strike price'." 
    },
    { 
      icon: <DollarSign className="w-10 h-10 text-blue-800" />, 
      title: "Collect Premiums", 
      description: "For selling these options, the fund immediately collects a cash 'premium', which is the primary source of the high yield." 
    },
    { 
      icon: <Percent className="w-10 h-10 text-blue-800" />, 
      title: "Distribute Income", 
      description: "This premium income, along with stock dividends, is then distributed to you, the ETF shareholder, typically on a monthly basis." 
    }
  ];

  return (
    <Section id="strategy">
      <SectionTitle>The Covered Call Engine</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Card key={index}>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-50 mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{step.title}</h3>
            <p className="text-gray-900">{step.description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center bg-blue-50 border-l-4 border-blue-800 p-6 rounded-r-lg">
        <p className="text-lg text-gray-900">
          <strong>The Core Trade-Off:</strong> This strategy transforms potential future stock growth into immediate, 
          consistent income. You trade uncertain upside for a more predictable cash flow.
        </p>
      </div>
    </Section>
  );
};

const StrategyComparison = () => {
  const etfs = [
    { 
      name: 'QYLD / XYLD', 
      philosophy: 'Systematic (Passive)',
      description: 'This strategy is a pure income play. It mechanically sells options every month without deviation, prioritizing the highest possible premium generation over capital growth.',
      type: 'Systematic',
      strategy: [
        { icon: <Calendar className="w-5 h-5 text-blue-800"/>, label: 'Expiry', value: 'Monthly' },
        { 
          icon: <Target className="w-5 h-5 text-blue-800"/>, 
          label: 'Strike Selection', 
          value: 'At-the-Money (ATM)', 
          detail: 'Maximizes premium but sacrifices all upside potential.' 
        },
        { 
          icon: <Layers className="w-5 h-5 text-blue-800"/>, 
          label: 'Portfolio Overwrite', 
          value: '100% (Fully Covered)', 
          detail: 'The entire portfolio is capped, offering no room for growth.' 
        },
      ]
    },
    { 
      name: 'JEPI / JEPQ', 
      philosophy: 'Active Hybrid',
      description: 'A balanced approach. The fund managers actively select stocks and use options to generate income while intentionally leaving room for some capital appreciation.',
      type: 'Active',
      strategy: [
        { icon: <Calendar className="w-5 h-5 text-blue-800"/>, label: 'Expiry', value: 'Monthly (via ELNs)' },
        { 
          icon: <Target className="w-5 h-5 text-blue-800"/>, 
          label: 'Strike Selection', 
          value: 'Out-of-the-Money (OTM)', 
          detail: 'Generates less premium but allows for some capital growth before the cap.' 
        },
        { 
          icon: <Layers className="w-5 h-5 text-blue-800"/>, 
          label: 'Portfolio Overwrite', 
          value: '~100% (via ELNs)', 
          detail: 'The active stock selection is the primary source of growth.' 
        },
      ]
    },
    { 
      name: 'GPIX', 
      philosophy: 'Dynamic Active',
      description: 'The most flexible strategy. Managers adapt to the market, reducing the options overlay in bull markets to capture more growth and increasing it in flat markets to boost income.',
      type: 'Active',
      strategy: [
        { icon: <Calendar className="w-5 h-5 text-blue-800"/>, label: 'Expiry', value: 'Dynamic / Active' },
        { 
          icon: <Target className="w-5 h-5 text-blue-800"/>, 
          label: 'Strike Selection', 
          value: 'Dynamic (Typically OTM)', 
          detail: 'Adjusts strike based on market outlook to balance income and growth.' 
        },
        { 
          icon: <Layers className="w-5 h-5 text-blue-800"/>, 
          label: 'Portfolio Overwrite', 
          value: '25% - 75% (Variable)', 
          detail: 'Leaves a significant portion uncapped to capture upside.' 
        },
      ]
    },
  ];

  return (
    <Section id="comparison" className="bg-gray-50">
      <SectionTitle>ETF Trading Strategies Compared</SectionTitle>
      <div className="grid lg:grid-cols-3 gap-8">
        {etfs.map(etf => (
          <Card key={etf.name} className="flex flex-col">
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-blue-800">{etf.name}</h3>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 mb-4 ${
                etf.type === 'Systematic' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {etf.philosophy}
              </span>
              <p className="text-gray-900 mb-6">{etf.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-3 border-t pt-4">Trading Strategy Breakdown:</h4>
              <ul className="space-y-4">
                {etf.strategy.map(item => (
                  <li key={item.label} className="flex items-start">
                    <div className="flex-shrink-0 w-8 text-center pt-1">
                      {item.icon}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="font-semibold text-gray-900">{item.value}</p>
                      {item.detail && (
                        <p className="text-sm text-gray-700 mt-1">{item.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const YieldAndTaxes = () => {
  const taxData = [
    { 
      fund: 'JEPI / JEPQ', 
      treatment: 'Ordinary Income', 
      description: 'Income from ELNs is taxed at your highest marginal rate. Best held in tax-advantaged accounts like an IRA.', 
      icon: <XCircle className="text-red-500" /> 
    },
    { 
      fund: 'QYLD / XYLD', 
      treatment: 'Section 1256 (60/40)', 
      description: 'Gains are taxed at a favorable blended rate (60% long-term, 40% short-term). More efficient in taxable accounts.', 
      icon: <CheckCircle className="text-green-500" /> 
    },
    { 
      fund: 'GPIX', 
      treatment: 'Capital Gains / ROC', 
      description: 'Distributions are a mix of capital gains and Return of Capital (ROC), which defers tax. A flexible option.', 
      icon: <CheckCircle className="text-green-500" /> 
    },
  ];

  return (
    <Section id="taxes">
      <SectionTitle>Yield, Distributions & The Tax Man's Cut</SectionTitle>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-900">
          The high yield is attractive, but where the money comes from and how it's taxed is critical. 
          A high "<strong className="text-blue-800">Return of Capital</strong>" (ROC) can mean the fund is just 
          giving you your own money back, which can erode its value over time.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-500 uppercase">Fund Type</th>
              <th className="p-4 text-sm font-semibold text-gray-500 uppercase">Primary Tax Treatment</th>
              <th className="p-4 text-sm font-semibold text-gray-500 uppercase">Key Takeaway</th>
            </tr>
          </thead>
          <tbody>
            {taxData.map(item => (
              <tr key={item.fund} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-blue-800">{item.fund}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    {item.icon}
                    <span className={`ml-2 font-medium text-gray-900 ${
                      item.treatment === 'Ordinary Income' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {item.treatment}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-900">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

const Performance = () => {
  const scenarios = [
    {
      title: 'Bull Market 🐂',
      performance: 'Underperforms',
      reason: 'The call options create a hard ceiling on gains. As the market soars past the "strike price," the ETF cannot participate in further upside.',
      icon: <TrendingUp className="w-10 h-10 text-red-500" />,
      color: 'red'
    },
    {
      title: 'Sideways Market ↔️',
      performance: 'Outperforms',
      reason: 'The ideal scenario. The fund consistently collects option premiums while the underlying stocks don\'t rally enough to have their upside capped.',
      icon: <BarChart className="w-10 h-10 text-green-500" />,
      color: 'green'
    },
    {
      title: 'Bear Market 🐻',
      performance: 'Slight Cushion',
      reason: 'The premium provides a small buffer, but the fund will still capture most of the market\'s losses. It is not a true hedge against a crash.',
      icon: <ShieldCheck className="w-10 h-10 text-yellow-500" />,
      color: 'yellow'
    }
  ];

  return (
    <Section id="performance" className="bg-gray-50">
      <SectionTitle>Performance Across Market Cycles</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8">
        {scenarios.map(scenario => (
          <Card key={scenario.title} className={`border-t-4 border-${scenario.color}-500`}>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              {scenario.icon}
            </div>
            <h3 className="text-2xl font-bold text-blue-800">{scenario.title}</h3>
            <p className={`text-xl font-semibold text-${scenario.color}-600 my-2`}>
              {scenario.performance}
            </p>
            <p className="text-gray-900">{scenario.reason}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const InvestorTakeaways = () => {
  const checklist = [
    "What is the fund's specific option strategy (ATM vs OTM, 100% vs partial)?",
    "What is the source of the distribution (income, gains, or return of capital)?",
    "How will the distributions be taxed, and is it in the right account?",
    "Am I comfortable sacrificing potential bull market growth for current income?",
    "What is the strategic role of this ETF in my overall portfolio (core vs. satellite)?",
  ];

  return (
    <Section id="takeaways">
      <SectionTitle>Actionable Insights for Investors</SectionTitle>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">Define Your Objective</h3>
            <p className="text-gray-900">
              <strong className="text-black">Max Income:</strong> Consider systematic funds like QYLD if cash flow is your only goal. <br/>
              <strong className="text-black">Balanced Approach:</strong> Look to active funds like JEPI or GPIX for a mix of income and growth potential.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">Portfolio Role</h3>
            <p className="text-gray-900">
              These are not core growth holdings. Use them as a satellite position or an income tool in retirement 
              to supplement cash flow and reduce the need to sell core assets.
            </p>
          </div>
        </div>
        <Card className="bg-blue-50 border-l-4 border-blue-800">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Your Final Checklist</h3>
          <ul className="space-y-3">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-800 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-900">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
};

export default function CoveredCallETFsDeepResearch() {
  const currentArticle = articles.find(article => article.slug === 'unlock-high-yields-covered-call-etfs-deep-research');

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

      <main className="min-h-screen bg-white">
        {/* Return to Home Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="relative">
          {/* Deep Research Badge - Top Left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <BookOpen className="w-3 h-3 mr-1" />
              Deep Research
            </span>
          </div>

          {/* Options Badge - Bottom Right */}
          <div className="absolute bottom-4 right-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              Options
            </span>
          </div>

          <Hero />
        </div>

        <HowItWorks />
        <StrategyComparison />
        <YieldAndTaxes />
        <Performance />
        <InvestorTakeaways />

        {/* Call to Action Section */}
        <Section className="bg-blue-800 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Dive Deeper?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Access the complete research document with detailed analysis, data tables, and strategic frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-800 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research
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
          </div>
        </Section>

        {/* Educational Disclaimer */}
        <Section className="bg-gray-100">
          <div className="text-center">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg max-w-4xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Educational Content Disclaimer</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      This analysis is for educational purposes only and should not be considered as investment advice. 
                      Covered call ETFs involve complex strategies with significant risks including limited upside potential, 
                      tax implications, and potential capital erosion. Always consult with a qualified financial advisor 
                      and conduct your own research before making investment decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}