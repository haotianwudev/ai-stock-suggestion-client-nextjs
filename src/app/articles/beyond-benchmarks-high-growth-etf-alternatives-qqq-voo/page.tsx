'use client';

import { useState } from 'react';
import { TrendingUp, AlertTriangle, BarChart3, Target, Shield } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

export default function BeyondBenchmarksETFAnalysis() {
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
    <ArticleFrame
      slug="beyond-benchmarks-high-growth-etf-alternatives-qqq-voo"
      additionalDisclaimer="ETF investing involves risk, including potential loss of principal. Consider your risk tolerance and investment objectives before making investment decisions."
    >
      <div className="max-w-4xl mx-auto px-4 text-gray-800">
        {/* Executive Summary */}
        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center font-serif">
            <Target className="mr-3 h-6 w-6 text-[#A8672E] dark:text-[#D08F52]" />
            Executive Summary
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              The immense popularity of VOO and QQQ isn&apos;t an accident&mdash;it&apos;s a rational choice based on their intended portfolio function, lower costs, and behavioral advantages. However, for investors seeking higher growth potential, several alternatives offer compelling risk-adjusted returns at the cost of increased concentration and volatility.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This analysis examines the structural advantages of benchmark ETFs, evaluates high-growth alternatives, and provides a framework for understanding when concentration risk may be justified by superior long-term performance potential.
            </p>
          </div>
        </div>

        {/* Interactive ETF Comparison */}
        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center font-serif">
            <BarChart3 className="mr-3 h-6 w-6 text-[#1D8A70] dark:text-[#3CBF9C]" />
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
                      ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white'
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
                    <h3 className="text-2xl font-bold text-gray-900 font-serif">{etf.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                      etf.isBenchmark ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {etf.ticker}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${
                      etf.return10yr?.startsWith('-') ? 'text-[#BC4128] dark:text-[#E2694A]' : 'text-[#1D8A70] dark:text-[#3CBF9C]'
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
                      etf.return5yr?.startsWith('-') ? 'text-[#BC4128] dark:text-[#E2694A]' : 'text-[#1D8A70] dark:text-[#3CBF9C]'
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
        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center font-serif">
            <Shield className="mr-3 h-6 w-6 text-[#A8672E] dark:text-[#D08F52]" />
            The Core Benchmarks: VOO vs QQQ
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {benchmarkETFs.map((etf) => (
              <div key={etf.ticker} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#A8672E] dark:bg-[#D08F52] text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {etf.ticker}
                  </span>
                  <span className="text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C]">
                    {etf.return10yr}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-serif">{etf.name}</h3>
                <p className="text-gray-700 mb-4">{etf.description}</p>

                <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-lg p-4">
                  <div>
                    <div className="text-lg font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">{etf.return5yr}</div>
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
        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center font-serif">
            <TrendingUp className="mr-3 h-6 w-6 text-[#1D8A70] dark:text-[#3CBF9C]" />
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
                    etf.isVolatile ? 'text-[#BC4128] dark:text-[#E2694A]' : 'text-[#1D8A70] dark:text-[#3CBF9C]'
                  }`}>
                    {etf.return10yr}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-serif">{etf.name}</h3>
                <p className="text-gray-700 mb-4">{etf.description}</p>

                <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-lg p-4">
                  <div>
                    <div className={`text-lg font-semibold ${
                      etf.return5yr?.startsWith('-') ? 'text-[#BC4128] dark:text-[#E2694A]' : 'text-[#1D8A70] dark:text-[#3CBF9C]'
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
        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center font-serif">
            <AlertTriangle className="mr-3 h-6 w-6 text-[#BC4128] dark:text-[#E2694A]" />
            Understanding the Risks
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Concentration Risk */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-serif">Concentration Risk (VGT/XLK)</h3>
              <p className="text-gray-700 mb-4">
                These ETFs amplify the performance of the tech sector. While this has led to massive outperformance, it also means any downturn in tech will hit them far harder than the broader market.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">&bull;</span>
                  <span><strong>Top-Heavy:</strong> Both are dominated by a few mega-cap stocks, making you heavily dependent on their success.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">&bull;</span>
                  <span><strong>Factor Bet:</strong> You are implicitly betting that the &ldquo;growth&rdquo; factor will continue to outperform.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">&bull;</span>
                  <span><strong>No Diversification:</strong> Zero exposure to other critical sectors like Healthcare or Financials.</span>
                </li>
              </ul>
            </div>

            {/* Narrative Risk */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#BC4128] dark:text-[#E2694A] mb-4 font-serif">Narrative & Valuation Risk (ARKK/ICLN)</h3>
              <p className="text-gray-700 mb-4">
                These thematic funds are sold on a compelling story, not just on fundamentals. This creates unique and severe risks.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">&bull;</span>
                  <span><strong>Valuation Insensitivity:</strong> Often buy &ldquo;story stocks&rdquo; at any price, leading to extreme P/E ratios.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">&bull;</span>
                  <span><strong>Hype Cycle:</strong> Attract massive inflows after strong performance, forcing managers to buy at the top.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">&bull;</span>
                  <span><strong>Higher Fees:</strong> Actively managed funds charge significantly higher expense ratios.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Popularity Paradox */}
        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">The Popularity Paradox &amp; Key Takeaways</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 font-serif">Why VOO &amp; QQQ Remain Dominant</h3>
            <p className="text-gray-700 mb-6">
              The immense popularity of VOO and QQQ isn&apos;t an accident. It&apos;s a rational choice based on their intended portfolio function, lower costs, and behavioral advantages.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#A8672E] dark:bg-[#D08F52] text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Core-Satellite Strategy</h4>
                  <p className="text-gray-700 mb-2">Most sophisticated investors use a &ldquo;Core-Satellite&rdquo; model:</p>
                  <ul className="ml-4 space-y-1 text-gray-700">
                    <li><strong>Core (70-90%):</strong> Foundation built with broad, diversified, low-cost funds like VOO</li>
                    <li><strong>Satellites (10-30%):</strong> Smaller, tactical bets for outperformance like QQQ or VGT</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#A8672E] dark:bg-[#D08F52] text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Lower Frictional Costs &amp; Liquidity</h4>
                  <p className="text-gray-700">
                    VOO and QQQ trade billions daily with virtually zero bid-ask spreads. Smaller funds have wider spreads, costing money on every trade.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#A8672E] dark:bg-[#D08F52] text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4 font-serif">Strategic Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-[#A8672E] dark:text-[#D08F52] rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">1</span>
                <span className="text-gray-700"><strong>Reinforce the Core:</strong> Foundation should remain in low-cost, broad-market ETFs like VOO or QQQ.</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-[#A8672E] dark:text-[#D08F52] rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">2</span>
                <span className="text-gray-700"><strong>Use Satellites Tactically:</strong> Use higher-growth funds like VGT as smaller &ldquo;satellite&rdquo; holdings, not core replacements.</span>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-200 text-[#A8672E] dark:text-[#D08F52] rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">3</span>
                <span className="text-gray-700"><strong>Approach Thematics with Caution:</strong> Understand extreme risks and volatility before investing in funds like ARKK or ICLN.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ArticleFrame>
  );
}
