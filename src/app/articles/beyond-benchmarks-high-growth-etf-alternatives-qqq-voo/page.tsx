'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, AlertTriangle, BarChart3, DollarSign, Target, Shield } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function BeyondBenchmarksETFAnalysis() {
  const currentArticle = articles.find(article => article.slug === 'beyond-benchmarks-high-growth-etf-alternatives-qqq-voo');
  const [selectedETF, setSelectedETF] = useState('VOO');

  // ETF Data Interface
  interface ETFData {
    ticker: string;
    name: string;
    description: string;
    return10yr: string;
    return5yr: string;
    expenseRatio: string;
    aum: string;
    risk: string;
    isBenchmark?: boolean;
    isVolatile?: boolean;
  }

  const benchmarkETFs: ETFData[] = [
    {
      ticker: "VOO",
      name: "Vanguard S&P 500 ETF",
      description: "The market's bedrock. Provides broad, diversified exposure to ~500 of the largest U.S. companies. Designed to replicate the market at an exceptionally low cost.",
      return10yr: "~15.26%",
      return5yr: "~15.70%",
      expenseRatio: "0.03%",
      aum: "1.1T",
      isBenchmark: true,
      risk: "Market Risk"
    },
    {
      ticker: "QQQ",
      name: "Invesco QQQ Trust",
      description: "The market's growth engine. Tracks the 100 largest non-financial companies on the Nasdaq, resulting in a heavy tilt towards the technology sector.",
      return10yr: "~19.60%",
      return5yr: "~20.55%",
      expenseRatio: "0.20%",
      aum: "275B",
      isBenchmark: true,
      risk: "Sector Concentration"
    }
  ];

  const alternativeETFs: ETFData[] = [
    {
      ticker: "VGT",
      name: "Vanguard Info. Tech. ETF",
      description: "A hyper-concentrated bet on the tech sector. Holds over 300 U.S. tech stocks, offering a more potent dose of tech exposure than QQQ.",
      return10yr: "~23.45%",
      return5yr: "~25.10%",
      expenseRatio: "0.10%",
      aum: "75B",
      risk: "Heavy Concentration"
    },
    {
      ticker: "XLK",
      name: "Tech Select Sector SPDR",
      description: "Tracks only the technology companies within the S&P 500. More concentrated than VGT, with around 70 names dominated by mega-cap leaders.",
      return10yr: "~22.76%",
      return5yr: "~24.80%",
      expenseRatio: "0.09%",
      aum: "70B",
      risk: "Heavy Concentration"
    },
    {
      ticker: "ARKK",
      name: "ARK Innovation ETF",
      description: "Actively managed, high-conviction thematic fund focused on 'disruptive innovation.' Exemplifies extreme volatility, with massive gains and catastrophic losses.",
      return10yr: "N/A",
      return5yr: "-1.28%",
      expenseRatio: "0.75%",
      aum: "6.5B",
      isVolatile: true,
      risk: "Narrative & Valuation"
    },
    {
      ticker: "ICLN",
      name: "Global Clean Energy ETF",
      description: "A thematic ETF illustrating narrative risk. Despite a compelling story, it has suffered from boom-and-bust cycles and disappointing long-term performance.",
      return10yr: "~4.15%",
      return5yr: "~6.80%",
      expenseRatio: "0.40%",
      aum: "2.5B",
      isVolatile: true,
      risk: "Thematic & Political"
    }
  ];

  const allETFs = [...benchmarkETFs, ...alternativeETFs];

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
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Beyond the Benchmarks: A Deep Analysis of High-Growth ETF Alternatives
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  An institutional analysis of high-growth ETF alternatives to QQQ and VOO/SPY, exploring the trade-offs between performance and risk.
                </p>
              </div>
              
              {/* Deep Research Badge */}
              <div className="ml-6 flex-shrink-0">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Deep Research
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Executive Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="mr-3 h-6 w-6 text-blue-600" />
              Executive Summary
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                The immense popularity of VOO and QQQ isn't an accident—it's a rational choice based on their intended portfolio function, lower costs, and behavioral advantages. However, for investors seeking higher growth potential, several alternatives offer compelling risk-adjusted returns at the cost of increased concentration and volatility.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This analysis examines the structural advantages of benchmark ETFs, evaluates high-growth alternatives, and provides a framework for understanding when concentration risk may be justified by superior long-term performance potential.
              </p>
            </div>
          </div>

          {/* Interactive ETF Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="mr-3 h-6 w-6 text-green-600" />
              Interactive ETF Analysis
            </h2>
            
            {/* ETF Selector */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {allETFs.map((etf) => (
                  <button
                    key={etf.ticker}
                    onClick={() => setSelectedETF(etf.ticker)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedETF === etf.ticker
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {etf.ticker}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected ETF Details */}
            {(() => {
              const etf = allETFs.find(e => e.ticker === selectedETF);
              if (!etf) return null;
              
              return (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{etf.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                        etf.isBenchmark ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                      }`}>
                        {etf.ticker}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${
                        etf.return10yr?.startsWith('-') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {etf.return10yr}
                      </div>
                      <div className="text-sm text-gray-500">10-Year Return</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{etf.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`text-lg font-semibold ${
                        etf.return5yr?.startsWith('-') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {etf.return5yr}
                      </div>
                      <div className="text-xs text-gray-500">5-Year Return</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{etf.expenseRatio}</div>
                      <div className="text-xs text-gray-500">Expense Ratio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">${etf.aum}</div>
                      <div className="text-xs text-gray-500">AUM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{etf.risk}</div>
                      <div className="text-xs text-gray-500">Primary Risk</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Benchmark Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="mr-3 h-6 w-6 text-blue-600" />
              The Core Benchmarks: VOO vs QQQ
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benchmarkETFs.map((etf) => (
                <div key={etf.ticker} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {etf.ticker}
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {etf.return10yr}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{etf.name}</h3>
                  <p className="text-gray-700 mb-4">{etf.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-lg p-4">
                    <div>
                      <div className="text-lg font-semibold text-green-600">{etf.return5yr}</div>
                      <div className="text-xs text-gray-500">5-Yr Return</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{etf.expenseRatio}</div>
                      <div className="text-xs text-gray-500">Expense Ratio</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">${etf.aum}</div>
                      <div className="text-xs text-gray-500">AUM</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Growth Alternatives */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="mr-3 h-6 w-6 text-green-600" />
              High-Growth Alternatives
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {alternativeETFs.map((etf) => (
                <div key={etf.ticker} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {etf.ticker}
                    </span>
                    <span className={`text-2xl font-bold ${
                      etf.isVolatile ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {etf.return10yr}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{etf.name}</h3>
                  <p className="text-gray-700 mb-4">{etf.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-lg p-4">
                    <div>
                      <div className={`text-lg font-semibold ${
                        etf.return5yr?.startsWith('-') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {etf.return5yr}
                      </div>
                      <div className="text-xs text-gray-500">5-Yr Return</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{etf.expenseRatio}</div>
                      <div className="text-xs text-gray-500">Expense Ratio</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">${etf.aum}</div>
                      <div className="text-xs text-gray-500">AUM</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6 text-red-600" />
              Understanding the Risks
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Concentration Risk */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Concentration Risk (VGT/XLK)</h3>
                <p className="text-gray-700 mb-4">
                  These ETFs amplify the performance of the tech sector. While this has led to massive outperformance, it also means any downturn in tech will hit them far harder than the broader market.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">&bull;</span>
                    <span><strong>Top-Heavy:</strong> Both are dominated by a few mega-cap stocks, making you heavily dependent on their success.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">&bull;</span>
                    <span><strong>Factor Bet:</strong> You are implicitly betting that the "growth" factor will continue to outperform.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">&bull;</span>
                    <span><strong>No Diversification:</strong> Zero exposure to other critical sectors like Healthcare or Financials.</span>
                  </li>
                </ul>
              </div>

              {/* Narrative Risk */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-4">2. Narrative & Valuation Risk (ARKK/ICLN)</h3>
                <p className="text-gray-700 mb-4">
                  These thematic funds are sold on a compelling story, not just on fundamentals. This creates unique and severe risks.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">&bull;</span>
                    <span><strong>Valuation Insensitivity:</strong> Often buy "story stocks" at any price, leading to extreme P/E ratios.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">&bull;</span>
                    <span><strong>Hype Cycle:</strong> Attract massive inflows after strong performance, forcing managers to buy at the top.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">&bull;</span>
                    <span><strong>Higher Fees:</strong> Actively managed funds charge significantly higher expense ratios.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* The Popularity Paradox */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Popularity Paradox & Key Takeaways</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why VOO & QQQ Remain Dominant</h3>
              <p className="text-gray-700 mb-6">
                The immense popularity of VOO and QQQ isn't an accident. It's a rational choice based on their intended portfolio function, lower costs, and behavioral advantages.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Core-Satellite Strategy</h4>
                    <p className="text-gray-700 mb-2">Most sophisticated investors use a "Core-Satellite" model:</p>
                    <ul className="ml-4 space-y-1 text-gray-700">
                      <li><strong>Core (70-90%):</strong> Foundation built with broad, diversified, low-cost funds like VOO</li>
                      <li><strong>Satellites (10-30%):</strong> Smaller, tactical bets for outperformance like QQQ or VGT</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Lower Frictional Costs & Liquidity</h4>
                    <p className="text-gray-700">
                      VOO and QQQ trade billions daily with virtually zero bid-ask spreads. Smaller funds have wider spreads, costing money on every trade.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Behavioral Pitfalls (Narrative Risk)</h4>
                    <p className="text-gray-700">
                      Thematic funds are often launched at the peak of hype cycles, causing investors to buy high and sell low.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">1</span>
                  <span className="text-gray-700"><strong>Reinforce the Core:</strong> Foundation should remain in low-cost, broad-market ETFs like VOO or QQQ.</span>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">2</span>
                  <span className="text-gray-700"><strong>Use Satellites Tactically:</strong> Use higher-growth funds like VGT as smaller "satellite" holdings, not core replacements.</span>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">3</span>
                  <span className="text-gray-700"><strong>Approach Thematics with Caution:</strong> Understand extreme risks and volatility before investing in funds like ARKK or ICLN.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-center text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Dive Deeper?</h2>
            <p className="text-lg mb-6 opacity-90">
              Access the complete research document with detailed analysis, interactive charts, and institutional-grade insights.
            </p>
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                <DollarSign className="inline mr-2" />
                Read Full Research Report
              </a>
            )}
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Educational Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This analysis is for educational purposes only and does not constitute investment advice. ETF investing involves risk, including potential loss of principal. Past performance does not guarantee future results. Consider your risk tolerance, investment objectives, and consult with a financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <p className="text-gray-600">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}