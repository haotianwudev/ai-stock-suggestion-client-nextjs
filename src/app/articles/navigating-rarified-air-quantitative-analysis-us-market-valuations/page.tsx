'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- SVG ICON COMPONENTS ---
const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TrendingDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const LandmarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// --- DATA CONSTANTS ---
const valuationMetrics = [
  {
    name: "Shiller P/E (CAPE) Ratio",
    description: "Measures price relative to average inflation-adjusted earnings over the previous 10 years, smoothing out business cycle fluctuations.",
    currentValue: "~39.9",
    historicalMean: "~17.3",
    delta: "+131%",
    implication: "Strongly Overvalued",
    icon: TrendingUpIcon,
    color: "red"
  },
  {
    name: "Buffett Indicator",
    description: "Compares the total market capitalization of all U.S. stocks to the nation's Gross Domestic Product (GDP).",
    currentValue: "~219%",
    historicalMean: "~85%",
    delta: "+158%",
    implication: "Strongly Overvalued",
    icon: LandmarkIcon,
    color: "red"
  },
  {
    name: "S&P 500 Trailing P/E",
    description: "The standard measure of stock price relative to the aggregated earnings per share of companies over the last 12 months.",
    currentValue: "~25.9 - 30.8",
    historicalMean: "~19.4",
    delta: "+33% to +59%",
    implication: "Overvalued",
    icon: TrendingUpIcon,
    color: "orange"
  },
  {
    name: "Earnings Yield Gap",
    description: "Compares the S&P 500's earnings yield (inverse of P/E ratio) to the yield on 10-year Treasury bonds.",
    currentValue: "-0.69%",
    historicalMean: "+0.26%",
    delta: "Negative Spread",
    implication: "Bonds More Attractive",
    icon: TrendingDownIcon,
    color: "red"
  },
];

const historicalData = [
  { peak: "Aug 1929", shillerPE: "32.6", return1: "-35.2%", return5: "-13.9%", return10: "-0.5%" },
  { peak: "Dec 1999", shillerPE: "44.2", return1: "-6.5%", return5: "-5.8%", return10: "-1.2%" },
  { peak: "Jun 2007", shillerPE: "27.6", return1: "-40.6%", return5: "-3.1%", return10: "+2.9%" },
  { peak: "Sep 2025", shillerPE: "~39.9", return1: "?", return5: "?", return10: "?" },
];

const defensiveSectors = [
  { 
    name: "Consumer Staples", 
    rationale: "Consistent demand for food, beverages, and household products regardless of the economic climate.", 
    companies: "Procter & Gamble (PG), Coca-Cola (KO), Walmart (WMT)" 
  },
  { 
    name: "Utilities", 
    rationale: "Essential services like electricity, water, and gas are non-negotiable for households and businesses.", 
    companies: "NextEra Energy (NEE), General Electric (GE), Duke Energy (DUK)" 
  },
  { 
    name: "Healthcare", 
    rationale: "Demand is largely inelastic, driven by demographics and health needs rather than economic cycles.", 
    companies: "Johnson & Johnson (JNJ), Pfizer (PFE), Sanofi (SAN)" 
  }
];

const investmentPrinciples = [
  { 
    title: "Strategic Asset Allocation & Rebalancing", 
    content: "The cornerstone of a resilient portfolio is a disciplined allocation strategy. For instance, a traditional 60/40 portfolio (60% equities, 40% bonds) serves as a baseline. With 10-Year Treasury yields above 4%, high-quality bonds are once again a viable source of income and diversification. Rebalancing—periodically trimming appreciated assets (like U.S. equities) and reallocating to underperforming ones (like bonds or international stocks)—enforces a 'sell high, buy low' discipline and manages risk." 
  },
  { 
    title: "Emphasize Value and Quality", 
    content: "In an expensive market, seek a 'margin of safety' by investing in companies trading below their intrinsic worth. Look for low P/E ratios, strong free cash flow (the cash a company generates after accounting for capital expenditures), and sustainable dividends. Prioritize 'quality'—companies with strong balance sheets, low debt, and durable competitive advantages ('moats'), which allow them to maintain profitability over the long term." 
  },
  { 
    title: "Bolster Defensive Positioning", 
    content: "Increase allocation to sectors that provide essential goods and services. These businesses tend to have more stable earnings, predictable cash flows, and lower volatility, offering a cushion during market downturns. Their inelastic demand makes them less susceptible to economic contraction, providing a defensive tilt to a portfolio." 
  },
  { 
    title: "Geographic Diversification", 
    content: "The extreme overvaluation is primarily a U.S. phenomenon. Many international developed markets (e.g., in Europe and Japan) and emerging markets are trading at far more attractive valuations. Shifting a portion of an equity allocation abroad can reduce concentration risk from a single, expensive market and may enhance long-term returns if the U.S. market underperforms." 
  },
  { 
    title: "Employ Systematic Investing", 
    content: "Use dollar-cost averaging (DCA) by investing a fixed amount at regular intervals, regardless of market highs or lows. This strategy removes the dangerous emotion of trying to 'time the market.' It automatically buys more shares when prices are low and fewer when they are high, lowering your average cost basis over time and mitigating the risk of deploying a large lump sum at a market peak." 
  }
];

const counterArguments = [
  { 
    title: "The 'Magnificent Seven' Effect", 
    content: "A significant portion of the S&P 500's high valuation is driven by a handful of mega-cap technology stocks with extraordinary earnings growth and dominant market positions. Proponents argue their premium P/E ratios are justified by their fortress-like balance sheets, high profitability, and leadership in secular growth trends like AI. The market, therefore, isn't uniformly expensive; it's top-heavy." 
  },
  { 
    title: "The Interest Rate Environment", 
    content: "While rates have risen, they remain low by historical standards from before the 2008 financial crisis. In a lower-rate world, future earnings are discounted at a lower rate, making them more valuable today. This structural shift, some argue, supports a permanently higher plateau for equity valuations compared to previous decades." 
  },
  { 
    title: "It's 'Different This Time'", 
    content: "Unlike the dot-com bubble, where many high-flying stocks had no earnings, today's market leaders are immensely profitable. The composition of the S&P 500 has shifted from capital-intensive industrial firms to asset-light, high-margin technology and service companies. This change in market structure could warrant higher aggregate valuations than in the past." 
  }
];

// Helper Components
interface MetricCardProps {
  metric: {
    name: string;
    description: string;
    currentValue: string;
    historicalMean: string;
    delta: string;
    implication: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const colorClasses = {
    red: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-700',
      iconBg: 'bg-red-100',
      deltaText: 'text-red-600',
    },
    orange: {
      bg: 'bg-orange-50 border-orange-200',
      text: 'text-orange-700',
      iconBg: 'bg-orange-100',
      deltaText: 'text-orange-600',
    },
  };

  const classes = colorClasses[metric.color as keyof typeof colorClasses] || colorClasses.red;

  return (
    <div className={`rounded-2xl p-6 border ${classes.bg} flex flex-col justify-between h-full shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      <div>
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{metric.name}</h3>
          <div className={`p-2 rounded-full ${classes.iconBg}`}>
            <metric.icon className={`h-6 w-6 ${classes.text}`} />
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-2">{metric.description}</p>
      </div>
      <div className="mt-6">
        <p className={`text-sm font-medium ${classes.text}`}>{metric.implication}</p>
        <p className="text-4xl font-bold text-slate-900 mt-1">{metric.currentValue}</p>
        <div className="flex justify-between items-baseline mt-2 text-slate-500">
          <p>vs. <span className="font-semibold text-slate-600">{metric.historicalMean}</span> mean</p>
          <p className={`font-semibold text-sm ${classes.deltaText}`}>{metric.delta}</p>
        </div>
      </div>
    </div>
  );
};

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
  showDefensiveSectors?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick, showDefensiveSectors }) => (
  <div className="border-b border-slate-200">
    <button
      className="w-full flex justify-between items-center text-left py-5 px-6"
      onClick={onClick}
    >
      <span className="text-lg font-semibold text-slate-800">{title}</span>
      <ChevronDownIcon
        className={`h-6 w-6 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
        <div className="pb-5 px-6 text-slate-600">
          <p>{content}</p>
          {showDefensiveSectors && (
            <div className="mt-4 space-y-4">
              {defensiveSectors.map((sector, index) => (
                <div key={index} className="p-4 bg-slate-100 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-blue-700">{sector.name}</h4>
                  <p className="text-sm text-slate-600 mt-1">{sector.rationale}</p>
                  <p className="text-xs text-slate-500 mt-2">e.g., {sector.companies}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function NavigatingRarifiedAir() {
  const currentArticle = articles.find(article => article.slug === 'navigating-rarified-air-quantitative-analysis-us-market-valuations');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header with Return Button */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Badges */}
          <div className="relative mb-8">
            <div className="absolute top-0 left-0 z-10">
              <span className="inline-block bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Deep Research
              </span>
            </div>
            {currentArticle?.podcastUrl && (
              <div className="absolute top-0 right-0 z-10">
                <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Podcast
                </span>
              </div>
            )}
          </div>

          {/* Hero Section */}
          <div className="text-center py-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-slate-900">
                Navigating Rarified Air
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                An analysis of U.S. equity valuations following Fed Chair Powell's warning that the market is "fairly highly valued."
              </p>
              <p className="text-sm text-slate-500 mb-10">
                Analysis based on statements from September 2025
              </p>
            </div>
          </div>

          {/* Powell Quote Section */}
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">The Powell Pronouncement</h2>
            <blockquote className="relative border-l-4 border-blue-500 pl-6">
              <p className="text-xl italic text-slate-800">
                "By many measures, U.S. equity prices are fairly highly valued."
              </p>
              <footer className="mt-4 text-slate-500">
                — Jerome Powell, Federal Reserve Chair, September 2025
              </footer>
            </blockquote>
            <div className="mt-6 text-slate-600 space-y-4">
              <p>
                Powell's remarks function as "jawboning"—a form of verbal intervention to influence market expectations without direct policy action. This echoes Alan Greenspan's famous 1996 "irrational exuberance" warning during the dot-com bubble, signaling official concern over speculative froth.
              </p>
              <p>
                The Fed faces a difficult "two-sided risk": easing monetary policy too soon could reignite inflation, but keeping it restrictive for too long risks derailing the economy and labor market. Powell's statement subtly communicates that the "Fed Put"—the market's implicit belief that the Fed will always step in to prevent a crash—is not unconditional, especially while inflation remains a concern.
              </p>
            </div>
          </div>
        </div>

        {/* Quantitative Analysis Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                A Quantitative Assessment
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Key metrics unanimously signal a market in a state of historical overvaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {valuationMetrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>
          </div>
        </div>

        {/* Historical Precedent Section */}
        <div className="bg-slate-50 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                The "Lost Decade" Phenomenon
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                History shows a powerful tendency for valuations to "mean revert." When markets reach extreme peaks, subsequent long-term returns are often flat or negative as valuations compress back toward their historical averages.
              </p>
            </div>

            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full text-left bg-white rounded-lg shadow-md border border-slate-200">
                <thead className="border-b border-slate-200 bg-slate-100">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-slate-600">Market Peak</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Shiller P/E at Peak</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 text-right">1-Year Real Return</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 text-right">5-Year Ann. Real Return</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 text-right">10-Year Ann. Real Return</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalData.map((row, index) => (
                    <tr key={index} className={`border-b border-slate-200 last:border-b-0 ${row.peak === 'Sep 2025' ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                      <td className="p-4 font-semibold text-slate-800">{row.peak}</td>
                      <td className="p-4 text-slate-600">{row.shillerPE}</td>
                      <td className={`p-4 font-mono text-right ${row.return1.startsWith('-') ? 'text-red-600' : row.return1 === '?' ? 'text-slate-400' : 'text-green-600'}`}>
                        {row.return1}
                      </td>
                      <td className={`p-4 font-mono text-right ${row.return5.startsWith('-') ? 'text-red-600' : row.return5 === '?' ? 'text-slate-400' : 'text-green-600'}`}>
                        {row.return5}
                      </td>
                      <td className={`p-4 font-mono text-right ${row.return10.startsWith('-') ? 'text-red-600' : row.return10 === '?' ? 'text-slate-400' : 'text-green-600'}`}>
                        {row.return10}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Strategic Recommendations
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                An actionable playbook for the prudent investor in a challenging landscape.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-lg">
              {investmentPrinciples.map((principle, index) => (
                <AccordionItem
                  key={index}
                  title={principle.title}
                  content={principle.content}
                  isOpen={openIndex === index}
                  onClick={() => handleClick(index)}
                  showDefensiveSectors={principle.title === "Bolster Defensive Positioning"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Counter-Arguments */}
        <div className="bg-slate-50 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                The Counter-Argument
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                To maintain a balanced view, it's crucial to consider arguments for why today's high valuations might be justified.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-8">
              {counterArguments.map((arg, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                    {arg.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{arg.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Conclusion: A Call for Discipline
            </h2>
            <p className="mt-6 text-lg text-slate-600">
              While compelling arguments exist to justify current valuations, the weight of historical evidence suggests profound risks. The present environment does not call for panic, but for a rational, disciplined shift in strategy. Success in the coming years will likely belong not to those who chase momentum, but to those who build a resilient framework on the enduring principles of diversification, value, quality, and systematic discipline.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Explore More Research & Analysis
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Stay informed with our comprehensive market analysis and strategic insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105"
                >
                  Read Full Research Document
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
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-slate-300">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
            <p className="text-slate-400 text-sm mt-2">
              This analysis is for informational purposes only and does not constitute financial advice. Past performance is not indicative of future results.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}