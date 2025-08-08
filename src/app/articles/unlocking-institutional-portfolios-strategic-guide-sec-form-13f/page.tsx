'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, TrendingUp, AlertTriangle, Users, BarChart3, Eye, Shield } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function UnlockingInstitutionalPortfolios() {
  const currentArticle = articles.find(article => article.slug === 'unlocking-institutional-portfolios-strategic-guide-sec-form-13f');

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
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header with Return Button */}
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Badges */}
          <div className="relative mb-8">
            <div className="absolute top-0 left-0 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                <FileText className="w-3 h-3 mr-1" />
                Deep Research
              </span>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Unlocking Institutional Portfolios
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-600 mb-6 font-medium">
              A Strategic Guide to SEC Form 13F for the Long-Term Investor
            </h2>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span>August 7, 2025</span>
              <span>•</span>
              <span>Deep Research Analysis</span>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                For decades, the investment decisions of the world's most influential financial institutions were largely opaque. In an effort to bring a measure of clarity to the markets, the U.S. government mandated a specific disclosure that provides a quarterly, albeit delayed, glimpse into the portfolios of these major players.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                This disclosure, known as <span className="text-indigo-600 font-semibold">Form 13F</span>, has become an indispensable tool for analysts, journalists, and individual investors seeking to understand the positioning of so-called <span className="text-indigo-600 font-semibold">"smart money."</span>
              </p>
            </div>
          </div>

          {/* Key Insights Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">What 13F Reveals</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• Quarterly equity holdings of major institutions</li>
                <li>• Position sizes and portfolio concentrations</li>
                <li>• Changes in conviction over time</li>
                <li>• Consensus among smart money managers</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-xl font-bold text-slate-900">Critical Limitations</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• 45-day reporting delay</li>
                <li>• No short positions disclosed</li>
                <li>• Missing options details</li>
                <li>• Confidential treatment requests</li>
              </ul>
            </div>
          </div>

          {/* The Genesis Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
              <FileText className="mr-3 h-8 w-8 text-indigo-600" />
              The Genesis of Transparency
            </h2>
            <div className="prose max-w-none text-slate-700">
              <p className="mb-4">
                The requirement for institutional managers to file Form 13F was established in <span className="font-semibold text-indigo-600">1975</span> through amendments to the Securities Exchange Act of 1934. This legislation was a direct response to growing concerns about the increasing influence of institutional investors on financial markets.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-blue-800 font-medium">
                  The stated purpose was twofold: create a centralized repository for regulators to monitor institutional impact, and increase transparency to bolster public confidence in market integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Filing Requirements */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
              <Users className="mr-3 h-8 w-8 text-green-600" />
              Who Must File and What They Report
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">The $100 Million Threshold</h3>
                <p className="text-green-700">
                  Institutional investment managers must file if they exercise investment discretion over accounts holding at least <span className="font-bold">$100 million</span> in Section 13(f) securities on the last trading day of any month.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Covered Securities</h3>
                <p className="text-blue-700">
                  Limited to "Section 13(f) securities" including U.S.-listed equities, ETFs, certain options and warrants, and convertible debt securities. Mutual fund shares are excluded.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-800 mb-3">Filing Timeline</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-yellow-800">Q1</div>
                  <div className="text-yellow-700">May 15</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-yellow-800">Q2</div>
                  <div className="text-yellow-700">Aug 14</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-yellow-800">Q3</div>
                  <div className="text-yellow-700">Nov 14</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-yellow-800">Q4</div>
                  <div className="text-yellow-700">Feb 14</div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Access Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
              <BarChart3 className="mr-3 h-8 w-8 text-purple-600" />
              How to Find and Use 13F Filings
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Step-by-Step: Finding a 13F Filing on EDGAR</h3>
              <ol className="list-decimal list-inside space-y-3 text-slate-700">
                <li>Navigate to the SEC's <span className="font-semibold text-indigo-600">EDGAR Company Search</span> page</li>
                <li>Enter the legal name of the investment manager (e.g., "Berkshire Hathaway Inc")</li>
                <li>Filter by Filing Type and enter <span className="font-semibold text-indigo-600">13F-HR</span></li>
                <li>Click the "Filing" button for the desired quarter</li>
                <li>Look for the <span className="font-semibold text-indigo-600">"Information Table"</span> link for detailed holdings</li>
              </ol>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">Best Practices for Using 13F Data</h3>
              <ul className="space-y-2 text-indigo-700">
                <li>• <span className="font-semibold">Focus on the Right Managers:</span> Track long-term, low-turnover strategies</li>
                <li>• <span className="font-semibold">Analyze Changes Over Time:</span> Compare filings over several quarters</li>
                <li>• <span className="font-semibold">Prioritize Conviction:</span> Pay attention to top 5-10 holdings</li>
                <li>• <span className="font-semibold">Look for Consensus:</span> When multiple respected managers buy the same stock</li>
                <li>• <span className="font-semibold">Use for Idea Generation:</span> Always conduct independent research</li>
              </ul>
            </div>
          </div>

          {/* Limitations Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
              <AlertTriangle className="mr-3 h-8 w-8 text-red-600" />
              Critical Limitations You Must Know
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-800 mb-3">The 45-Day Lag</h3>
                <p className="text-red-700 text-sm">
                  Positions might not be disclosed until over four months after establishment, potentially rendering information obsolete.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-orange-800 mb-3">Missing Short Positions</h3>
                <p className="text-orange-700 text-sm">
                  Complete absence of short positions is the most critical omission. A long position could be part of a pairs trade.
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">Confidential Treatment</h3>
                <p className="text-yellow-700 text-sm">
                  Managers can request to temporarily omit positions, hiding their most sensitive trades for up to a year.
                </p>
              </div>
            </div>
          </div>

          {/* Investment Framework */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
              <TrendingUp className="mr-3 h-8 w-8 text-green-600" />
              A Framework for Long-Term Investment Idea Generation
            </h2>
            
            <div className="prose max-w-none text-slate-700 mb-6">
              <p>
                Given the significant limitations of 13F data, its effective use requires a disciplined approach. A prudent long-term investor should use filings as a sophisticated tool for <span className="font-semibold text-indigo-600">idea generation</span>, not portfolio replication.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">What to Look For</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• <span className="font-semibold">New Positions:</span> A manager's latest idea</li>
                  <li>• <span className="font-semibold">Additions:</span> Growing conviction signals</li>
                  <li>• <span className="font-semibold">Concentration:</span> Top 5-10 positions show highest conviction</li>
                  <li>• <span className="font-semibold">Consensus:</span> Multiple respected managers buying</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">The Right Mindset</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Use as high-level screening tool</li>
                  <li>• Focus on long-term, value-oriented investors</li>
                  <li>• Treat findings as starting points</li>
                  <li>• Always conduct independent due diligence</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Manager Profiles */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Profiling the Masters: Whose Filings Are Most Meaningful?</h2>
            <p className="text-lg text-slate-600 mb-8">
              The utility of 13F analysis depends heavily on the manager being tracked. The most insightful filings come from investors whose strategies are long-term, value-oriented, and concentrated.
            </p>

            {/* Warren Buffett - Berkshire Hathaway */}
            <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-l-4 border-blue-500">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  WB
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Warren Buffett</h3>
                  <p className="text-lg text-slate-600">Berkshire Hathaway</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Core Principle:</h4>
                  <p className="text-slate-700 mb-4">Buy wonderful businesses at fair prices.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">Strategy:</h4>
                  <p className="text-slate-700">Long-term buy-and-hold.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Portfolio Style:</h4>
                  <p className="text-slate-700 mb-4">Concentrated, low turnover, large-cap focused.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">13F Utility:</h4>
                  <p className="text-slate-700">Excellent for identifying high-quality, long-term compounders.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-slate-800">Top Holdings Analysis (Q1 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left py-2 px-4 font-semibold text-sm">Rank</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Company</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Ticker</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Portfolio %</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Apple Inc.</td>
                        <td className="py-2 px-4 font-mono">AAPL</td>
                        <td className="py-2 px-4 font-semibold text-green-600">25.76%</td>
                        <td className="py-2 px-4">210,000,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">2</td>
                        <td className="py-2 px-4">American Express Co.</td>
                        <td className="py-2 px-4 font-mono">AXP</td>
                        <td className="py-2 px-4 font-semibold text-green-600">15.77%</td>
                        <td className="py-2 px-4">151,610,700</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">3</td>
                        <td className="py-2 px-4">The Coca-Cola Co.</td>
                        <td className="py-2 px-4 font-mono">KO</td>
                        <td className="py-2 px-4 font-semibold text-green-600">11.07%</td>
                        <td className="py-2 px-4">267,999,999</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">4</td>
                        <td className="py-2 px-4">Bank of America Corp.</td>
                        <td className="py-2 px-4 font-mono">BAC</td>
                        <td className="py-2 px-4 font-semibold text-green-600">10.19%</td>
                        <td className="py-2 px-4">631,573,531</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">5</td>
                        <td className="py-2 px-4">Chevron Corp.</td>
                        <td className="py-2 px-4 font-mono">CVX</td>
                        <td className="py-2 px-4 font-semibold text-green-600">7.67%</td>
                        <td className="py-2 px-4">118,610,534</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Stanley Druckenmiller */}
            <div className="mb-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border-l-4 border-purple-500">
              <div className="flex items-center mb-6">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  SD
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Stanley Druckenmiller</h3>
                  <p className="text-lg text-slate-600">Duquesne Family Office</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Core Principle:</h4>
                  <p className="text-slate-700 mb-4">Make large, concentrated bets on high-conviction macro themes.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">Strategy:</h4>
                  <p className="text-slate-700">Top-down global macro, long/short, flexible asset allocation.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Portfolio Style:</h4>
                  <p className="text-slate-700 mb-4">Concentrated, high turnover, macro-driven bets across asset classes.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">13F Utility:</h4>
                  <p className="text-slate-700">Excellent for identifying major macro themes and high-conviction bets.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-slate-800">Top Holdings Analysis (Q1 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left py-2 px-4 font-semibold text-sm">Rank</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Company</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Ticker</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Portfolio %</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Natera, Inc.</td>
                        <td className="py-2 px-4 font-mono">NTRA</td>
                        <td className="py-2 px-4 font-semibold text-purple-600">16.13%</td>
                        <td className="py-2 px-4">3,402,330</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">2</td>
                        <td className="py-2 px-4">Teva Pharmaceutical Industries</td>
                        <td className="py-2 px-4 font-mono">TEVA</td>
                        <td className="py-2 px-4 font-semibold text-purple-600">7.67%</td>
                        <td className="py-2 px-4">14,879,750</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">3</td>
                        <td className="py-2 px-4">Coupang, Inc.</td>
                        <td className="py-2 px-4 font-mono">CPNG</td>
                        <td className="py-2 px-4 font-semibold text-purple-600">6.84%</td>
                        <td className="py-2 px-4">9,302,634</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">4</td>
                        <td className="py-2 px-4">Woodward, Inc.</td>
                        <td className="py-2 px-4 font-mono">WWD</td>
                        <td className="py-2 px-4 font-semibold text-purple-600">6.72%</td>
                        <td className="py-2 px-4">1,097,750</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">5</td>
                        <td className="py-2 px-4">Philip Morris International</td>
                        <td className="py-2 px-4 font-mono">PM</td>
                        <td className="py-2 px-4 font-semibold text-purple-600">5.88%</td>
                        <td className="py-2 px-4">1,105,268</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* David Tepper */}
            <div className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 border-l-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  DT
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">David Tepper</h3>
                  <p className="text-lg text-slate-600">Appaloosa Management</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Core Principle:</h4>
                  <p className="text-slate-700 mb-4">Find value in distressed assets when others are fearful.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">Strategy:</h4>
                  <p className="text-slate-700">Contrarian, event-driven, distressed debt and equity.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Portfolio Style:</h4>
                  <p className="text-slate-700 mb-4">Concentrated, opportunistic, often in distressed sectors.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">13F Utility:</h4>
                  <p className="text-slate-700">Excellent for spotting contrarian bets in distressed or out-of-favor sectors.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-slate-800">Top Holdings Analysis (Q1 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left py-2 px-4 font-semibold text-sm">Rank</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Company</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Ticker</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Portfolio %</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Alibaba Group Holding</td>
                        <td className="py-2 px-4 font-mono">BABA</td>
                        <td className="py-2 px-4 font-semibold text-orange-600">21.92%</td>
                        <td className="py-2 px-4">9,230,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">2</td>
                        <td className="py-2 px-4">PDD Holdings Inc.</td>
                        <td className="py-2 px-4 font-mono">PDD</td>
                        <td className="py-2 px-4 font-semibold text-orange-600">9.29%</td>
                        <td className="py-2 px-4">N/A</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">3</td>
                        <td className="py-2 px-4">Amazon.com, Inc.</td>
                        <td className="py-2 px-4 font-mono">AMZN</td>
                        <td className="py-2 px-4 font-semibold text-orange-600">8.58%</td>
                        <td className="py-2 px-4">2,120,950</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">4</td>
                        <td className="py-2 px-4">JD.com, Inc.</td>
                        <td className="py-2 px-4 font-mono">JD</td>
                        <td className="py-2 px-4 font-semibold text-orange-600">5.95%</td>
                        <td className="py-2 px-4">6,319,250</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">5</td>
                        <td className="py-2 px-4">Meta Platforms, Inc.</td>
                        <td className="py-2 px-4 font-mono">META</td>
                        <td className="py-2 px-4 font-semibold text-orange-600">5.69%</td>
                        <td className="py-2 px-4">N/A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Seth Klarman */}
            <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  SK
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Seth Klarman</h3>
                  <p className="text-lg text-slate-600">The Baupost Group</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Core Principle:</h4>
                  <p className="text-slate-700 mb-4"><span className="text-indigo-600 font-semibold">Margin of Safety</span>; absolute risk aversion.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">Strategy:</h4>
                  <p className="text-slate-700">Multi-strategy value (equities, distressed debt, real estate).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Portfolio Style:</h4>
                  <p className="text-slate-700 mb-4">Diversified across asset types, high cash levels.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">13F Utility:</h4>
                  <p className="text-slate-700">Excellent for finding undervalued, complex situations.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-slate-800">Top Holdings Analysis (Q1 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left py-2 px-4 font-semibold text-sm">Rank</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Company</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Ticker</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Portfolio %</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Willis Towers Watson PLC</td>
                        <td className="py-2 px-4 font-mono">WTW</td>
                        <td className="py-2 px-4 font-semibold text-green-600">14.81%</td>
                        <td className="py-2 px-4">1,530,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">2</td>
                        <td className="py-2 px-4">Alphabet Inc. (Class C)</td>
                        <td className="py-2 px-4 font-mono">GOOG</td>
                        <td className="py-2 px-4 font-semibold text-green-600">9.33%</td>
                        <td className="py-2 px-4">2,080,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">3</td>
                        <td className="py-2 px-4">WESCO International, Inc.</td>
                        <td className="py-2 px-4 font-mono">WCC</td>
                        <td className="py-2 px-4 font-semibold text-green-600">8.95%</td>
                        <td className="py-2 px-4">2,010,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">4</td>
                        <td className="py-2 px-4">Liberty Global Ltd. (Class C)</td>
                        <td className="py-2 px-4 font-mono">LBTYK</td>
                        <td className="py-2 px-4 font-semibold text-green-600">8.48%</td>
                        <td className="py-2 px-4">24,660,000</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">5</td>
                        <td className="py-2 px-4">Fidelity National Info Services</td>
                        <td className="py-2 px-4 font-mono">FIS</td>
                        <td className="py-2 px-4 font-semibold text-green-600">7.49%</td>
                        <td className="py-2 px-4">N/A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bill Ackman */}
            <div className="mb-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 border-l-4 border-yellow-500">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  BA
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Bill Ackman</h3>
                  <p className="text-lg text-slate-600">Pershing Square</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Core Principle:</h4>
                  <p className="text-slate-700 mb-4">Buy great businesses and fix them.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">Strategy:</h4>
                  <p className="text-slate-700">Concentrated, <span className="text-indigo-600 font-semibold">activist investing</span>.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Portfolio Style:</h4>
                  <p className="text-slate-700 mb-4">Extremely concentrated (8-12 stocks), high conviction.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">13F Utility:</h4>
                  <p className="text-slate-700">Excellent for identifying potential activist targets.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-slate-800">Top Holdings Analysis (Q1 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left py-2 px-4 font-semibold text-sm">Rank</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Company</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Ticker</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Portfolio %</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Chipotle Mexican Grill, Inc.</td>
                        <td className="py-2 px-4 font-mono">CMG</td>
                        <td className="py-2 px-4 font-semibold text-yellow-600">N/A</td>
                        <td className="py-2 px-4">N/A</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">2</td>
                        <td className="py-2 px-4">Restaurant Brands International</td>
                        <td className="py-2 px-4 font-mono">QSR</td>
                        <td className="py-2 px-4 font-semibold text-yellow-600">N/A</td>
                        <td className="py-2 px-4">N/A</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">3</td>
                        <td className="py-2 px-4">Hilton Worldwide Holdings</td>
                        <td className="py-2 px-4 font-mono">HLT</td>
                        <td className="py-2 px-4 font-semibold text-yellow-600">N/A</td>
                        <td className="py-2 px-4">N/A</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">4</td>
                        <td className="py-2 px-4">Howard Hughes Holdings Inc.</td>
                        <td className="py-2 px-4 font-mono">HHH</td>
                        <td className="py-2 px-4 font-semibold text-yellow-600">N/A</td>
                        <td className="py-2 px-4">N/A</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">5</td>
                        <td className="py-2 px-4">Alphabet Inc. (Class A & C)</td>
                        <td className="py-2 px-4 font-mono">GOOGL/GOOG</td>
                        <td className="py-2 px-4 font-semibold text-yellow-600">N/A</td>
                        <td className="py-2 px-4">N/A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Michael Burry */}
            <div className="mb-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 border-l-4 border-red-500">
              <div className="flex items-center mb-6">
                <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  MB
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Michael Burry</h3>
                  <p className="text-lg text-slate-600">Scion Asset Management</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Core Principle:</h4>
                  <p className="text-slate-700 mb-4">Identify and bet against market bubbles and inefficiencies.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">Strategy:</h4>
                  <p className="text-slate-700">Deep value, <span className="text-indigo-600 font-semibold">contrarian</span>, macro-focused.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Portfolio Style:</h4>
                  <p className="text-slate-700 mb-4">Highly concentrated, high turnover, often contrarian.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">13F Utility:</h4>
                  <p className="text-slate-700">Excellent for spotting contrarian ideas and macro themes.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-slate-800">Top Holdings Analysis (Q1 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left py-2 px-4 font-semibold text-sm">Rank</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Company</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Ticker</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Position Type</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Portfolio %</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">NVIDIA Corporation</td>
                        <td className="py-2 px-4 font-mono">NVDA</td>
                        <td className="py-2 px-4 text-red-600 font-semibold">Put Option</td>
                        <td className="py-2 px-4 font-semibold text-red-600">48.96%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">2</td>
                        <td className="py-2 px-4">Alibaba Group Holding</td>
                        <td className="py-2 px-4 font-mono">BABA</td>
                        <td className="py-2 px-4 text-red-600 font-semibold">Put Option</td>
                        <td className="py-2 px-4 font-semibold text-red-600">13.27%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">3</td>
                        <td className="py-2 px-4">PDD Holdings Inc.</td>
                        <td className="py-2 px-4 font-mono">PDD</td>
                        <td className="py-2 px-4 text-red-600 font-semibold">Put Option</td>
                        <td className="py-2 px-4 font-semibold text-red-600">11.88%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">4</td>
                        <td className="py-2 px-4">JD.com, Inc.</td>
                        <td className="py-2 px-4 font-mono">JD</td>
                        <td className="py-2 px-4 text-red-600 font-semibold">Put Option</td>
                        <td className="py-2 px-4 font-semibold text-red-600">8.26%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">5</td>
                        <td className="py-2 px-4">The Estée Lauder Companies</td>
                        <td className="py-2 px-4 font-mono">EL</td>
                        <td className="py-2 px-4 text-green-600 font-semibold">Common Stock</td>
                        <td className="py-2 px-4 font-semibold text-red-600">6.63%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Li Lu - Himalaya Capital */}
            <div className="mb-12 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-8 border-l-4 border-teal-500">
              <div className="flex items-center mb-6">
                <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  LL
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Li Lu</h3>
                  <p className="text-lg text-slate-600">Himalaya Capital</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Core Principle:</h4>
                  <p className="text-slate-700 mb-4">Buy high-quality businesses with strong <span className="text-indigo-600 font-semibold">moats</span> to hold long-term.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">Strategy:</h4>
                  <p className="text-slate-700">Long-term, concentrated, Buffett-Munger style.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Portfolio Style:</h4>
                  <p className="text-slate-700 mb-4">Extremely concentrated, low turnover, US & Asia focus.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">13F Utility:</h4>
                  <p className="text-slate-700">Excellent for identifying high-quality, long-term compounders.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-slate-800">Top Holdings Analysis (Q1 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left py-2 px-4 font-semibold text-sm">Rank</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Company</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Ticker</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Portfolio %</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Bank of America Corp.</td>
                        <td className="py-2 px-4 font-mono">BAC</td>
                        <td className="py-2 px-4 font-semibold text-teal-600">26.12%</td>
                        <td className="py-2 px-4">13,846,633</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">2</td>
                        <td className="py-2 px-4">Berkshire Hathaway Inc.</td>
                        <td className="py-2 px-4 font-mono">BRK.B</td>
                        <td className="py-2 px-4 font-semibold text-teal-600">21.61%</td>
                        <td className="py-2 px-4">897,749</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">3</td>
                        <td className="py-2 px-4">Alphabet Inc. (Class A)</td>
                        <td className="py-2 px-4 font-mono">GOOGL</td>
                        <td className="py-2 px-4 font-semibold text-teal-600">17.78%</td>
                        <td className="py-2 px-4">2,543,300</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">4</td>
                        <td className="py-2 px-4">Alphabet Inc. (Class C)</td>
                        <td className="py-2 px-4 font-mono">GOOG</td>
                        <td className="py-2 px-4 font-semibold text-teal-600">17.31%</td>
                        <td className="py-2 px-4">2,451,300</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">5</td>
                        <td className="py-2 px-4">East West Bancorp, Inc.</td>
                        <td className="py-2 px-4 font-mono">EWBC</td>
                        <td className="py-2 px-4 font-semibold text-teal-600">11.26%</td>
                        <td className="py-2 px-4">2,776,351</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mohnish Pabrai - Dalal Street */}
            <div className="mb-12 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-8 border-l-4 border-amber-500">
              <div className="flex items-center mb-6">
                <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  MP
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Mohnish Pabrai</h3>
                  <p className="text-lg text-slate-600">Dalal Street LLC</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Core Principle:</h4>
                  <p className="text-slate-700 mb-4">"Heads I win, tails I don't lose much."</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">Strategy:</h4>
                  <p className="text-slate-700">Concentrated deep value; <span className="text-indigo-600 font-semibold">"cloning"</span> successful investors.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Portfolio Style:</h4>
                  <p className="text-slate-700 mb-4">Extremely concentrated, deep value, often in specific sectors.</p>
                  
                  <h4 className="font-semibold text-slate-800 mb-2">13F Utility:</h4>
                  <p className="text-slate-700">Excellent for finding deep value, contrarian ideas.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4 text-slate-800">Top Holdings Analysis (Q1 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left py-2 px-4 font-semibold text-sm">Rank</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Company</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Ticker</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Portfolio %</th>
                        <th className="text-left py-2 px-4 font-semibold text-sm">Shares</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-2 px-4">1</td>
                        <td className="py-2 px-4">Warrior Met Coal Inc.</td>
                        <td className="py-2 px-4 font-mono">HCC</td>
                        <td className="py-2 px-4 font-semibold text-amber-600">36.57%</td>
                        <td className="py-2 px-4">1,799,580</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">2</td>
                        <td className="py-2 px-4">Valaris Ltd</td>
                        <td className="py-2 px-4 font-mono">VAL</td>
                        <td className="py-2 px-4 font-semibold text-amber-600">23.87%</td>
                        <td className="py-2 px-4">1,427,564</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">3</td>
                        <td className="py-2 px-4">Alpha Metallurgical Resources</td>
                        <td className="py-2 px-4 font-mono">AMR</td>
                        <td className="py-2 px-4 font-semibold text-amber-600">22.11%</td>
                        <td className="py-2 px-4">414,616</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">4</td>
                        <td className="py-2 px-4">Noble Corp PLC</td>
                        <td className="py-2 px-4 font-mono">NE</td>
                        <td className="py-2 px-4 font-semibold text-amber-600">17.45%</td>
                        <td className="py-2 px-4">1,140,971</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Master 13F Analysis?</h2>
            <p className="text-xl mb-6 opacity-90">
              Transform how you identify investment opportunities by learning from the world's best investors
            </p>
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                <FileText className="inline mr-2" />
                Read Full Research Document
              </a>
            )}
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Educational Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This analysis is for educational purposes only and should not be considered investment advice. 13F filings have significant limitations and delays. Always conduct your own research and consider consulting with qualified financial professionals before making investment decisions. Past performance of institutional investors does not guarantee future results.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-slate-500 text-sm border-t border-slate-200 pt-8">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </footer>
        </div>
      </div>
    </>
  );
}