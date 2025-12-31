'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, ArrowDownCircle, ArrowUpCircle, AlertTriangle, ListChecks, Target, BrainCircuit, BookOpen, Scaling, BarChart3, UserCheck, CheckCircle, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { useState } from 'react';

export default function StrategicPortfolioManagementOptionWriting() {
  const currentArticle = articles.find(article => article.slug === 'strategic-portfolio-management-option-writing');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <div>
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
        {/* Header with Navigation */}
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                  <span className="text-xl font-bold text-gray-800 tracking-tight">Option Strategies</span>
                </div>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#greeks" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Greeks</a>
                <a href="#entry" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Put Writing</a>
                <a href="#exit" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Call Writing</a>
                <a href="#pitfalls" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Risks</a>
                <a href="#psychology" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Psychology</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Badges */}
        <div className="fixed top-20 left-4 z-40">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Deep Research
          </div>
        </div>
        
        <div className="fixed top-20 right-4 z-40">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Options
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-white text-gray-800 py-20 sm:py-28 lg:py-32">
          <div className="absolute inset-0 bg-grid-gray-200/[0.6] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">Introduction</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
              Options as Instruments of Strategy, Not Speculation
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
              Options are frequently mischaracterized as purely speculative instruments. A more sophisticated application is to employ them as tools for disciplined portfolio management. This reframes their use away from simple market timing and toward a quantitative approach for managing equity positions. Success requires managing the direction, magnitude, and timeframe of the underlying stock's movement. This guide dissects two foundational strategies: the Cash-Secured Put for strategic market entry and the Covered Call for strategic market exit.
            </p>
          </div>
        </div>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Strategic Portfolio Management Option Writing Infographic" 
                className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
              />
              {/* Full-screen button overlay */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageViewerOpen(true);
                }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                title="View full screen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              {/* Click hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
                <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                  Click to view full screen
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Full-screen image viewer */}
        {currentArticle?.imageUrl && (
          <FullScreenImageViewer
            src={currentArticle.imageUrl}
            alt="Strategic Portfolio Management Option Writing Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Strategy Matrix */}
          <div className="bg-gray-50/70 py-16 sm:py-20 border-y border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 mb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 p-4 bg-gray-50 border-b border-gray-200">
                  Comparative Strategy Matrix
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Factor</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Cash-Secured Put</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Covered Call</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Objective</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Acquire a stock below its current market value or generate income while waiting.</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Generate income from an existing stock position or sell at a predetermined target price.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Investor Outlook</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Long-term bullish on the stock; short-term neutral to slightly bullish.</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Neutral to moderately bullish on the stock for the contract's duration.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Ideal Market Condition</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Neutral, slightly bullish, or moderately volatile markets.</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Flat, range-bound, or slowly appreciating markets.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Primary Risk</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Obligation to buy the stock at the strike price even if the market price falls significantly below it.</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Opportunity cost; missing out on gains if the stock price rises substantially above the strike price.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Maximum Profit</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Limited to the premium received.</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Limited to (Strike Price - Stock Purchase Price) + Premium Received.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Maximum Loss</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Substantial: (Strike Price x 100) - Premium Received, if the stock goes to $0.</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">Substantial: (Stock Purchase Price x 100) - Premium Received, if the stock goes to $0.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Option Greeks Section */}
          <section id="greeks" className="py-16 sm:py-20 bg-gray-50 border-y border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 mb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">Core Concepts</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Understanding the Option Greeks
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                  The Greeks are variables that measure the sensitivity of an option's price to changes in underlying factors.
                </p>
                <p className="mt-6 max-w-3xl mx-auto text-gray-700 leading-7">
                  Mastering option writing requires moving beyond price and premium. The 'Greeks' provide a framework for quantifying the risks and dynamics of an option position. They are essential for sophisticated risk management and strategy selection.
                </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">Delta (Δ)</h3>
                  <p className="mt-2 text-gray-600">
                    Measures the rate of change in an option's price for every $1 move in the underlying stock. For short puts, a delta of 0.30 means the option premium will increase by $0.30 if the stock falls by $1.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">Theta (Θ)</h3>
                  <p className="mt-2 text-gray-600">
                    Measures the rate of an option's price decay over time, often called 'time decay.' As an option writer, Theta is your primary source of profit, as the premium you collected erodes each day, all else being equal.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">Vega (V)</h3>
                  <p className="mt-2 text-gray-600">
                    Measures sensitivity to changes in implied volatility. As a seller of options, you profit when volatility decreases (a 'Vega crush'), as this lowers the option's premium, making it cheaper to buy back.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">Gamma (Γ)</h3>
                  <p className="mt-2 text-gray-600">
                    Measures the rate of change of Delta. It indicates how much an option's delta will change for a $1 move in the stock. High gamma means the position's risk profile can change very quickly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Market Entry Section */}
          <section id="entry" className="py-16 sm:py-20">
            <div className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6 mb-4 md:mb-0">
                <ArrowDownCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">Section 1</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Strategic Market Entry via Put Writing
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                  The cash-secured put transforms waiting for a target stock price into an active, income-generating process.
                </p>
                <p className="mt-6 text-gray-700 leading-7">
                  The mechanics involve writing a put option and setting aside cash to purchase the stock if assigned. The dual objective is to either acquire the stock at an effective price below its current value or to simply keep the premium as income if the option expires worthless. A key strategic element is strike selection. Many writers choose strike prices at or near significant technical support levels. This increases the probability that the stock price will 'bounce' off that level, causing the option to expire worthless and maximizing the writer's profit.
                </p>
              </div>
            </div>
            
            {/* Cash-Secured Put Scenario Table */}
            <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h4 className="text-xl font-bold text-gray-800">Scenario Analysis: Cash-Secured Put</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Assume selling one put on stock XYZ, currently at $100. Action: Sell 1 XYZ $95 Put @ $2.00. Cash Secured: $9,500. Premium Received: $200. Breakeven: $93.00.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Stock Price at Expiration</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Outcome</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Profit / Loss</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$105.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Put expires worthless</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-green-600 font-medium">+$200</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Maximum gain is achieved. Investor keeps the premium.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$95.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Put expires worthless</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-green-600 font-medium">+$200</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Stock is at the strike price. Option expires worthless.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$94.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Put is assigned</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-red-600 font-medium">-$100</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Buy 100 shares at $95. Effective cost $93. Paper loss exists.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$93.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Put is assigned</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-red-600 font-medium">$0</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Breakeven point is reached.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$90.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Put is assigned</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-red-600 font-medium">-$300</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Buy 100 shares at $95. Paper loss is ($90 - $93) x 100.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$0.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Put is assigned</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-red-600 font-medium">-$9,300</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Maximum loss. Buy worthless shares for $9,500, offset by premium.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Strategic Market Exit Section */}
          <section id="exit" className="py-16 sm:py-20 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6 mb-4 md:mb-0">
                <ArrowUpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">Section 2</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Strategic Market Exit via Call Writing
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                  The covered call is used to generate income or execute a disciplined, price-targeted exit.
                </p>
                <p className="mt-6 text-gray-700 leading-7">
                  This strategy requires owning at least 100 shares of a stock for each call option sold. This 'covers' the obligation. A common objective is to generate consistent income from a long-term holding. By repeatedly selling short-term, out-of-the-money calls, an investor can significantly lower their cost basis over time, creating a 'synthetic dividend' that often exceeds the stock's actual dividend. The ideal user is neutral to moderately bullish and does not anticipate a sharp rally.
                </p>
              </div>
            </div>

            {/* Covered Call Scenario Table */}
            <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h4 className="text-xl font-bold text-gray-800">Scenario Analysis: Covered Call</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Assume owning 100 shares of XYZ, purchased at $48. Action: Sell 1 XYZ $50 Call @ $1.50. Premium Received: $150. Breakeven: $46.50. Max Gain: $350.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Stock Price at Expiration</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Outcome</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Profit / Loss</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$55.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Shares are called away at $50</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-green-600 font-medium">+$350</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Maximum gain. Misses gains above $50.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$50.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Shares are called away at $50</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-green-600 font-medium">+$350</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Maximum gain is achieved at the strike price.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$48.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Call expires worthless</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-green-600 font-medium">+$150</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Investor keeps the stock and the premium.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$46.50</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Call expires worthless</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-red-600 font-medium">$0</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Breakeven point. Stock loss equals premium gain.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$45.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Call expires worthless</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-red-600 font-medium">-$150</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Keeps stock and premium. Net loss on paper.</td>
                    </tr>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">$0.00</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Call expires worthless</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-red-600 font-medium">-$4,650</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">Maximum loss. Stock becomes worthless, offset by premium.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Advanced Strategic Considerations */}
          <section id="advanced" className="py-16 sm:py-20 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6 mb-4 md:mb-0">
                <BrainCircuit className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">Section 3</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Advanced Strategic Considerations
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                  Mastery requires understanding dynamic forces like implied volatility and corporate events.
                </p>
                <p className="mt-6 text-gray-700 leading-7">
                  Implied volatility (IV) is a primary determinant of an option's premium. The best time to write an option is when IV is high. A more advanced technique is to analyze a stock's IV Rank or IV Percentile. This contextualizes the current IV by comparing it to its historical range (e.g., its 52-week high and low). Selling options when IV Rank is high (e.g., &gt;50) provides a statistical edge, as volatility is mean-reverting and more likely to contract, benefiting the option seller. Also, be mindful of dividend dates, which can trigger early assignment on in-the-money calls.
                </p>
              </div>
            </div>
          </section>

          {/* Risk Management Section */}
          <section id="pitfalls" className="py-16 sm:py-20 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6 mb-4 md:mb-0">
                <AlertTriangle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">Section 4</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Risk Management & Common Pitfalls
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                  Success depends on avoiding common errors and having a robust management plan.
                </p>
                <p className="mt-6 text-gray-700 leading-7">
                  The biggest risk for put writers is 'catching a falling knife'—being forced to buy a stock as it plummets. To mitigate these risks, traders use 'rolling' adjustments. If a stock drops, a put writer might 'roll down and out'—buying back their short put for a loss and selling a new put with a lower strike price and a later expiration date, often for a net credit. This gives the trade more time and a better breakeven point to become profitable. Avoid systemic errors like improper position sizing, trading illiquid options, and lacking a disciplined trading plan.
                </p>
              </div>
            </div>

            {/* Pre-Trade Checklist */}
            <div className="mt-10 rounded-xl border border-yellow-300 bg-yellow-50 p-6">
              <h4 className="text-xl font-bold text-yellow-800 flex items-center">
                <ListChecks className="w-6 h-6 mr-3"/>
                Option Writer&apos;s Pre-Trade Checklist
              </h4>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-yellow-900">Does my market outlook align with the chosen strategy?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-yellow-900">Have I calculated my max loss and breakeven? Am I comfortable with this risk?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-yellow-900">Is the position size within my portfolio&apos;s risk limit (e.g., &lt; 3%)?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-yellow-900">Is the option liquid (high open interest and volume)?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-yellow-900">Have I checked for upcoming earnings or ex-dividend dates?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-yellow-900">Do I have a pre-defined exit plan if the trade moves against me?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-yellow-900">Is this trade based on my strategy, or is it impulsive?</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Psychology Section */}
          <section id="psychology" className="py-16 sm:py-20 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-start">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6 mb-4 md:mb-0">
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">Section 5</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  The Psychology of Option Writing
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                  Discipline is the bridge between goals and accomplishment.
                </p>
                <p className="mt-6 text-gray-700 leading-7">
                  Option writing is a game of probabilities and patience, not prediction. The psychological challenge lies in maintaining discipline when trades go against you. The fear of a stock plummeting can cause a put writer to abandon their plan, while the greed of a soaring stock can tempt a call writer to close a position too early. Successful writers operate like an insurance company: they stick to their underwriting criteria (trade plan), collect premiums, and manage risk systematically, knowing that over a large number of occurrences, their probabilistic edge will prevail.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <div className="bg-white py-16 sm:py-20 border-t border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4"/>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                A Synthesis of Discipline and Patience
              </h2>
              <p className="mt-6 text-gray-600 leading-7">
                Writing cash-secured puts and covered calls are sophisticated methods for disciplined market entry and exit. They transform portfolio management from a reactive to a proactive process. Success is not about speculation but about quantitative analysis, strategic patience, and unwavering discipline. These strategies carry substantial risks and demand thorough understanding and a rigorously defined plan before committing capital.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 rounded-2xl text-center -mx-4 sm:-mx-6 lg:-mx-8 mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Master Option Writing?</h3>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Transform your portfolio management with disciplined option strategies.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  📄 Read Full Research
                </a>
              )}
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-12 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Educational Disclaimer:</strong> This content is for educational purposes only. Options trading involves substantial risk. Consult a qualified financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
