'use client';

import Link from 'next/link';
import { ArrowLeft, Maximize2, FileText, TrendingUp, BarChart3, Target, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { Badge } from '@/components/ui/badge';

export default function StockFactorModelsGuide() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'stock-factor-models-comprehensive-guide');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && currentArticle.title && currentArticle.slug && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">Deep Research</Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Stock Factor Models
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
            Decomposing returns, managing risk, and finding alpha through systematic factor investing frameworks.
          </p>
        </div>
      </div>

      {/* Hero Infographic */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img 
            src="https://i.imgur.com/ZkYTvd0.jpeg" 
            alt="Stock Factor Models Framework" 
            className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
          />
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
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
              Click to view full screen
            </div>
          </div>
        </div>
      </section>

      {/* Full-screen image viewer */}
      <FullScreenImageViewer
        src="https://i.imgur.com/ZkYTvd0.jpeg"
        alt="Stock Factor Models Framework"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Conceptual Framework */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Conceptual Framework</h2>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-200 mb-8">
            <p className="text-lg text-indigo-800 mb-6 leading-relaxed">
              Factor models serve as quantitative tools providing a structured framework for decomposing security returns into constituent drivers. 
              They operate on the premise that asset returns comprise two components: systematic (driven by common factors) and idiosyncratic (asset-specific).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-2">Style Factors</h4>
                <p className="text-indigo-700 text-sm">Characteristics like value, growth, momentum, quality</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-2">Macroeconomic Factors</h4>
                <p className="text-indigo-700 text-sm">Interest rates, inflation, GDP growth, currency</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-2">Statistical Factors</h4>
                <p className="text-indigo-700 text-sm">Principal components, factor analysis, ML-derived</p>
              </div>
            </div>
          </div>
        </section>

        {/* Evolution from CAPM to Multi-Factor */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-amber-100 rounded-xl">
              <BarChart3 className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Evolution from Single to Multi-Factor</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">CAPM Limitations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-amber-800 mb-3">The Capital Asset Pricing Model explained only ~70% of diversified portfolio returns, leaving significant performance unaccounted for.</p>
                  <div className="bg-white p-3 rounded-lg border border-amber-200">
                    <code className="text-sm text-amber-800">E(R) = Rf + β(Rm - Rf)</code>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Market Anomalies</h4>
                  <ul className="space-y-1 text-amber-800 text-sm">
                    <li>• Small-cap stocks outperformed predictions</li>
                    <li>• Value stocks showed persistent premiums</li>
                    <li>• Momentum effects unexplained</li>
                    <li>• Quality differences ignored</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Multi-Factor Revolution</h3>
              <p className="text-green-800 mb-4">
                Multi-factor models increased explanatory power to over 90%, reframing "noise" as distinct, compensable risk factors. 
                This paradigm shift moved from managing assets to managing exposures.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-200 text-green-800">Factor Diversification</Badge>
                <Badge className="bg-green-200 text-green-800">Risk Decomposition</Badge>
                <Badge className="bg-green-200 text-green-800">Alpha Generation</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Theoretical Foundation - APT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Arbitrage Pricing Theory (APT)</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Core Principle</h3>
              <p className="text-blue-700 mb-4">
                Developed by Stephen Ross (1976), APT provides theoretical foundation for multi-factor models based on no-arbitrage conditions.
              </p>
              <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                <code className="text-sm text-blue-800">E(Ri) = Rf + βi1·RP1 + βi2·RP2 + ... + βin·RPn</code>
              </div>
              <p className="text-blue-700 text-sm">
                Where E(Ri) is expected return, Rf is risk-free rate, β represents factor sensitivities, and RP are risk premiums.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">Key Assumptions</h3>
              <ul className="space-y-3 text-purple-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Asset returns follow factor structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Idiosyncratic risk diversifiable</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>No arbitrage opportunities exist</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>No market portfolio assumption required</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">APT vs CAPM Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="text-left py-2 text-slate-700">Characteristic</th>
                    <th className="text-left py-2 text-slate-700">CAPM</th>
                    <th className="text-left py-2 text-slate-700">APT</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-medium">Core Principle</td>
                    <td className="py-2">Equilibrium model</td>
                    <td className="py-2">No-arbitrage condition</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-medium">Factors</td>
                    <td className="py-2">Single (market risk)</td>
                    <td className="py-2">Multiple systematic factors</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 font-medium">Factor Specification</td>
                    <td className="py-2">Market portfolio specified</td>
                    <td className="py-2">Factors not specified</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Assumptions</td>
                    <td className="py-2">Homogeneous expectations</td>
                    <td className="py-2">Factor model structure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Fama-French Dynasty */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-100 rounded-xl">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The Fama-French Dynasty</h2>
          </div>
          
          <div className="space-y-8">
            {/* Three-Factor Model */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Three-Factor Model (1992)</h3>
              <p className="text-green-800 mb-4">
                Fama and French addressed CAPM's empirical failings by adding size and value factors, increasing explanatory power to over 90%.
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                <code className="text-sm text-green-800">
                  Rit - Rft = αit + β1(RMt - Rft) + β2SMBt + β3HMLt + εit
                </code>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 text-sm mb-1">Market (Rm - Rf)</h4>
                  <p className="text-green-700 text-xs">Excess return of market portfolio over risk-free rate</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 text-sm mb-1">Size (SMB)</h4>
                  <p className="text-green-700 text-xs">Small Minus Big - captures size premium</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 text-sm mb-1">Value (HML)</h4>
                  <p className="text-green-700 text-xs">High Minus Low - captures value premium</p>
                </div>
              </div>
            </div>

            {/* Four-Factor Model */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Carhart Four-Factor Model (1997)</h3>
              <p className="text-purple-800 mb-4">
                Mark Carhart added momentum factor to capture price persistence effects, increasing explanatory power to ~95%.
              </p>
              <div className="bg-white p-3 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 text-sm mb-1">Momentum (MOM/UMD)</h4>
                <p className="text-purple-700 text-xs">Up Minus Down - long past winners, short past losers</p>
              </div>
            </div>

            {/* Five-Factor Model */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-900 mb-4">Five-Factor Model (2015)</h3>
              <p className="text-orange-800 mb-4">
                Fama and French added profitability and investment factors, finding that value (HML) often becomes redundant.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-orange-100">
                  <h4 className="font-semibold text-orange-900 text-sm mb-1">Profitability (RMW)</h4>
                  <p className="text-orange-700 text-xs">Robust Minus Weak - high vs low operating profitability</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-orange-100">
                  <h4 className="font-semibold text-orange-900 text-sm mb-1">Investment (CMA)</h4>
                  <p className="text-orange-700 text-xs">Conservative Minus Aggressive - low vs high investment</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-200">
                <p className="text-orange-800 text-sm">
                  <strong>Key Finding:</strong> The five-factor model "unbundles" the value signal into profitability and investment drivers, 
                  providing more economically intuitive explanations for stock returns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Factor Categories */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 rounded-xl">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Common Equity Factors</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Value Factor */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Value Factor</h3>
              <p className="text-blue-700 text-sm mb-4">Stocks trading at low valuations relative to fundamentals</p>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded text-xs text-blue-800">P/E Ratio</div>
                <div className="bg-white p-2 rounded text-xs text-blue-800">P/B Ratio</div>
                <div className="bg-white p-2 rounded text-xs text-blue-800">EV/EBITDA</div>
                <div className="bg-white p-2 rounded text-xs text-blue-800">Dividend Yield</div>
              </div>
            </div>

            {/* Size Factor */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Size Factor</h3>
              <p className="text-green-700 text-sm mb-4">Small-cap stocks historically outperform large-cap</p>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded text-xs text-green-800">Market Cap</div>
                <div className="bg-white p-2 rounded text-xs text-green-800">Enterprise Value</div>
                <div className="bg-white p-2 rounded text-xs text-green-800">Float-Adjusted</div>
              </div>
            </div>

            {/* Momentum Factor */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Momentum Factor</h3>
              <p className="text-purple-700 text-sm mb-4">Stocks with strong recent performance continue outperforming</p>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded text-xs text-purple-800">12-2 Month Returns</div>
                <div className="bg-white p-2 rounded text-xs text-purple-800">Price Trends</div>
                <div className="bg-white p-2 rounded text-xs text-purple-800">Earnings Revisions</div>
              </div>
            </div>

            {/* Quality Factor */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Quality Factor</h3>
              <p className="text-orange-700 text-sm mb-4">Companies with strong fundamentals and stable earnings</p>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded text-xs text-orange-800">ROE/ROA</div>
                <div className="bg-white p-2 rounded text-xs text-orange-800">Debt-to-Equity</div>
                <div className="bg-white p-2 rounded text-xs text-orange-800">Earnings Stability</div>
                <div className="bg-white p-2 rounded text-xs text-orange-800">Payout Ratios</div>
              </div>
            </div>

            {/* Low Volatility Factor */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
              <h3 className="text-lg font-semibold text-teal-900 mb-3">Low Volatility</h3>
              <p className="text-teal-700 text-sm mb-4">Lower-risk stocks often deliver superior risk-adjusted returns</p>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded text-xs text-teal-800">Historical Volatility</div>
                <div className="bg-white p-2 rounded text-xs text-teal-800">Beta</div>
                <div className="bg-white p-2 rounded text-xs text-teal-800">Downside Deviation</div>
              </div>
            </div>

            {/* Profitability Factor */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Profitability</h3>
              <p className="text-red-700 text-sm mb-4">Companies with higher profitability metrics outperform</p>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded text-xs text-red-800">Gross Margins</div>
                <div className="bg-white p-2 rounded text-xs text-red-800">Operating Margins</div>
                <div className="bg-white p-2 rounded text-xs text-red-800">Asset Turnover</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Factor Cyclicality</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Cyclical Factors</h4>
                <p className="text-slate-600 text-sm mb-2">Perform well during economic expansions</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-300 text-blue-700">Value</Badge>
                  <Badge variant="outline" className="border-green-300 text-green-700">Size</Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700">Momentum</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Defensive Factors</h4>
                <p className="text-slate-600 text-sm mb-2">Provide protection during downturns</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-orange-300 text-orange-700">Quality</Badge>
                  <Badge variant="outline" className="border-teal-300 text-teal-700">Low Volatility</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Factor Construction Mechanics */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Factor Construction Mechanics</h2>
          </div>
          
          <div className="space-y-8">
            {/* Long-Short Methodology */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">Long-Short Portfolio Methodology</h3>
              <p className="text-indigo-800 mb-4">
                Academic factors are zero-investment, market-neutral portfolios created through long-short methodology to isolate pure factor premiums.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-900 mb-2">Long Portfolio</h4>
                  <p className="text-indigo-700 text-sm">Stocks ranking highly on factor characteristic (e.g., cheap valuation)</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-900 mb-2">Short Portfolio</h4>
                  <p className="text-indigo-700 text-sm">Equal-value short position in stocks ranking poorly (e.g., expensive valuation)</p>
                </div>
              </div>
            </div>

            {/* Fama-French Construction */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Fama-French 2x3 Sort Procedure</h3>
              <p className="text-green-800 mb-4">
                The iconic SMB and HML factors use independent sorting along size and value dimensions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">Size Sort</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Small: Bottom 50% by market cap</li>
                    <li>• Big: Top 50% by market cap</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">Value Sort (B/M Ratio)</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Growth: Bottom 30% (Low B/M)</li>
                    <li>• Neutral: Middle 40%</li>
                    <li>• Value: Top 30% (High B/M)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-900 mb-3">Six Intersection Portfolios</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-green-100 p-2 rounded text-center text-green-800">Small Growth</div>
                  <div className="bg-green-100 p-2 rounded text-center text-green-800">Small Neutral</div>
                  <div className="bg-green-100 p-2 rounded text-center text-green-800">Small Value</div>
                  <div className="bg-green-200 p-2 rounded text-center text-green-800">Big Growth</div>
                  <div className="bg-green-200 p-2 rounded text-center text-green-800">Big Neutral</div>
                  <div className="bg-green-200 p-2 rounded text-center text-green-800">Big Value</div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <code className="text-sm text-green-800">SMB = (Small Growth + Small Neutral + Small Value)/3 - (Big Growth + Big Neutral + Big Value)/3</code>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <code className="text-sm text-green-800">HML = (Small Value + Big Value)/2 - (Small Growth + Big Growth)/2</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Factor Construction Summary Table */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Factor Construction Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="text-left py-2 text-slate-700">Factor</th>
                      <th className="text-left py-2 text-slate-700">Long Portfolio</th>
                      <th className="text-left py-2 text-slate-700">Short Portfolio</th>
                      <th className="text-left py-2 text-slate-700">Key Metrics</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr className="border-b border-slate-200">
                      <td className="py-2 font-medium">Value (HML)</td>
                      <td className="py-2">High B/M stocks</td>
                      <td className="py-2">Low B/M stocks</td>
                      <td className="py-2">P/B, P/E, EV/CFO</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 font-medium">Size (SMB)</td>
                      <td className="py-2">Small-cap stocks</td>
                      <td className="py-2">Large-cap stocks</td>
                      <td className="py-2">Market cap</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 font-medium">Momentum (UMD)</td>
                      <td className="py-2">Past winners (t-12 to t-2)</td>
                      <td className="py-2">Past losers (t-12 to t-2)</td>
                      <td className="py-2">Prior returns</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 font-medium">Quality (QMJ)</td>
                      <td className="py-2">High-quality stocks</td>
                      <td className="py-2">Low-quality ("junk")</td>
                      <td className="py-2">ROE, ROA, leverage, payout</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Low Vol</td>
                      <td className="py-2">Low volatility stocks</td>
                      <td className="py-2">High volatility stocks</td>
                      <td className="py-2">Historical volatility, beta</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Applications in Portfolio Management */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Target className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Applications in Modern Portfolio Management</h2>
          </div>
          
          <div className="space-y-8">
            {/* Portfolio Construction */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">Portfolio Construction & Optimization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-3">Smart Beta Implementation</h4>
                  <ul className="space-y-2 text-emerald-700 text-sm">
                    <li>• Systematic factor exposure through ETFs</li>
                    <li>• Tilting towards expected return premiums</li>
                    <li>• Index construction with factor constraints</li>
                    <li>• Multi-factor portfolio optimization</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-3">Covariance Matrix Estimation</h4>
                  <ul className="space-y-2 text-emerald-700 text-sm">
                    <li>• Reduces parameters from N×N to K factors</li>
                    <li>• More robust optimization outcomes</li>
                    <li>• Stable portfolio allocations</li>
                    <li>• Handles large universes efficiently</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-xl font-semibold text-red-900 mb-4">Risk Management & Decomposition</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-800 mb-3">Risk Decomposition</h4>
                  <div className="bg-white p-4 rounded-lg border border-red-100 mb-3">
                    <code className="text-sm text-red-800">Total Risk = Systematic Risk + Idiosyncratic Risk</code>
                  </div>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>• Factor exposure identification</li>
                    <li>• Unintended risk detection</li>
                    <li>• Concentration measurement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-3">Stress Testing & Scenarios</h4>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>• Factor-specific shock analysis</li>
                    <li>• Cascading impact modeling</li>
                    <li>• Vulnerability assessment</li>
                    <li>• Dynamic correlation effects</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Performance Attribution */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Performance Attribution</h3>
              <p className="text-blue-800 mb-4">
                Factor models decompose active returns to distinguish systematic factor exposures (beta) from manager skill (alpha).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">Time-Series Regression</h4>
                  <p className="text-blue-700 text-sm mb-2">Fama-French methodology estimating static factor exposures</p>
                  <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                    R(p) - R(f) = α + β₁F₁ + β₂F₂ + ... + ε
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">Cross-Sectional Regression</h4>
                  <p className="text-blue-700 text-sm mb-2">MSCI Barra approach with time-varying factor returns</p>
                  <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                    Daily factor returns from security characteristics
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-100 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Attribution Components</h4>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• <strong>Factor Returns:</strong> Performance from systematic exposures</li>
                  <li>• <strong>Selection Returns:</strong> Manager's security selection skill</li>
                  <li>• <strong>Interaction Effects:</strong> Timing of factor exposures</li>
                  <li>• <strong>Residual Alpha:</strong> Unexplained outperformance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Factor Zoo Challenge */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Shield className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The "Factor Zoo" Challenge</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Factor Proliferation Problem</h3>
              <p className="text-amber-800 mb-4">
                Over 315 factors documented in academic literature (Harvey, Liu, Zhu 2016), raising concerns about data snooping and statistical significance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-amber-100">
                  <h4 className="font-semibold text-amber-900 mb-2">Data Snooping Issues</h4>
                  <ul className="space-y-1 text-amber-700 text-sm">
                    <li>• Multiple testing on same dataset</li>
                    <li>• Publication bias toward positive results</li>
                    <li>• Spurious correlations from chance</li>
                    <li>• Traditional t-stat &gt; 2.0 insufficient</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-100">
                  <h4 className="font-semibold text-amber-900 mb-2">Proposed Solutions</h4>
                  <ul className="space-y-1 text-amber-700 text-sm">
                    <li>• Higher significance threshold (t &gt; 3.0)</li>
                    <li>• Out-of-sample validation required</li>
                    <li>• Economic theory foundation</li>
                    <li>• Cross-market persistence testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Criteria for Robust Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border border-green-100 text-center">
                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-800 font-semibold text-sm">1</span>
                  </div>
                  <h4 className="font-semibold text-green-900 text-sm mb-1">Persistent</h4>
                  <p className="text-green-700 text-xs">Works across time periods</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-100 text-center">
                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-800 font-semibold text-sm">2</span>
                  </div>
                  <h4 className="font-semibold text-green-900 text-sm mb-1">Pervasive</h4>
                  <p className="text-green-700 text-xs">Works across markets</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-100 text-center">
                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-800 font-semibold text-sm">3</span>
                  </div>
                  <h4 className="font-semibold text-green-900 text-sm mb-1">Robust</h4>
                  <p className="text-green-700 text-xs">Various definitions work</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-100 text-center">
                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-800 font-semibold text-sm">4</span>
                  </div>
                  <h4 className="font-semibold text-green-900 text-sm mb-1">Investable</h4>
                  <p className="text-green-700 text-xs">Survives transaction costs</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Factor vs Premium Distinction</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-800 mb-2">Factor (Statistical Pattern)</h4>
                  <p className="text-slate-600 text-sm">Any observable correlation with returns, may be spurious or temporary</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-800 mb-2">Premium (Economic Reality)</h4>
                  <p className="text-slate-600 text-sm">Robust, persistent return source with economic foundation (risk compensation or behavioral bias)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources for Factor Analysis */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-cyan-100 rounded-xl">
              <FileText className="h-6 w-6 text-cyan-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Data Sources for Factor Analysis</h2>
          </div>
          
          <div className="space-y-6">
            {/* Academic Libraries */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-200">
              <h3 className="text-xl font-semibold text-cyan-900 mb-4">Free Academic Libraries (Gold Standard)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-cyan-100">
                  <h4 className="font-semibold text-cyan-900 mb-2">Kenneth French Data Library</h4>
                  <ul className="space-y-1 text-cyan-700 text-sm">
                    <li>• Fama-French 3 & 5-factor returns</li>
                    <li>• Carhart momentum factor</li>
                    <li>• Industry portfolios</li>
                    <li>• International market data</li>
                    <li>• Historical data back to 1920s</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-cyan-100">
                  <h4 className="font-semibold text-cyan-900 mb-2">AQR Data Library</h4>
                  <ul className="space-y-1 text-cyan-700 text-sm">
                    <li>• Quality Minus Junk (QMJ)</li>
                    <li>• Betting Against Beta</li>
                    <li>• Global factor data</li>
                    <li>• Multi-asset class factors</li>
                    <li>• Alternative risk premia</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Low-Cost APIs */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Low-Cost APIs for Raw Data</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-green-300">
                      <th className="text-left py-2 text-green-800">Provider</th>
                      <th className="text-left py-2 text-green-800">Data Type</th>
                      <th className="text-left py-2 text-green-800">Coverage</th>
                      <th className="text-left py-2 text-green-800">Pricing</th>
                    </tr>
                  </thead>
                  <tbody className="text-green-700">
                    <tr className="border-b border-green-200">
                      <td className="py-2 font-medium">Alpha Vantage</td>
                      <td className="py-2">Market & Fundamental</td>
                      <td className="py-2">Global stocks, forex</td>
                      <td className="py-2">Free tier, $50/mo premium</td>
                    </tr>
                    <tr className="border-b border-green-200">
                      <td className="py-2 font-medium">Tiingo</td>
                      <td className="py-2">Market & Fundamental</td>
                      <td className="py-2">US & Chinese stocks</td>
                      <td className="py-2">Free tier, $30/mo+</td>
                    </tr>
                    <tr className="border-b border-green-200">
                      <td className="py-2 font-medium">Yahoo Finance</td>
                      <td className="py-2">Market data</td>
                      <td className="py-2">Global stocks</td>
                      <td className="py-2">Free (yfinance library)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">FRED</td>
                      <td className="py-2">Macroeconomic</td>
                      <td className="py-2">US & International</td>
                      <td className="py-2">Free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Software Tools */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Open-Source Analysis Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-purple-900 mb-2">Python Libraries</h4>
                  <ul className="space-y-1 text-purple-700 text-sm">
                    <li>• <strong>pandas:</strong> Data manipulation & analysis</li>
                    <li>• <strong>statsmodels:</strong> Statistical modeling & regression</li>
                    <li>• <strong>PyAnomaly:</strong> 200+ firm characteristics</li>
                    <li>• <strong>Alphalens:</strong> Factor analysis & IC</li>
                    <li>• <strong>Zipline:</strong> Backtesting framework</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-purple-900 mb-2">R Libraries</h4>
                  <ul className="space-y-1 text-purple-700 text-sm">
                    <li>• <strong>Tidyverse:</strong> Data wrangling & visualization</li>
                    <li>• <strong>FactorAnalytics:</strong> Factor model analysis</li>
                    <li>• <strong>frenchdata:</strong> Kenneth French data access</li>
                    <li>• <strong>PerformanceAnalytics:</strong> Portfolio metrics</li>
                    <li>• <strong>quantmod:</strong> Financial modeling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Considerations */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Advanced Considerations & Future Directions</h2>
          </div>
          
          <div className="space-y-6">
            {/* Factor Decay */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">Factor Decay & Rebalancing</h3>
              <p className="text-indigo-800 mb-4">
                Factor exposures decay over time as company characteristics and stock prices change, requiring strategic rebalancing decisions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-900 mb-2">Fast Decay</h4>
                  <p className="text-indigo-700 text-sm mb-2">Half-life: Few months</p>
                  <div className="bg-indigo-50 p-2 rounded text-xs text-indigo-800">
                    Momentum → Monthly/Quarterly rebalancing
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-900 mb-2">Medium Decay</h4>
                  <p className="text-indigo-700 text-sm mb-2">Half-life: 6-12 months</p>
                  <div className="bg-indigo-50 p-2 rounded text-xs text-indigo-800">
                    Growth → Semi-annual rebalancing
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-900 mb-2">Slow Decay</h4>
                  <p className="text-indigo-700 text-sm mb-2">Half-life: Multiple years</p>
                  <div className="bg-indigo-50 p-2 rounded text-xs text-indigo-800">
                    Value, Quality → Annual rebalancing
                  </div>
                </div>
              </div>
            </div>

            {/* Machine Learning Integration */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">Machine Learning & Factor Investing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-3">Current Applications</h4>
                  <ul className="space-y-2 text-emerald-700 text-sm">
                    <li>• High-dimensional factor selection (LASSO)</li>
                    <li>• Non-linear relationship discovery</li>
                    <li>• Dynamic factor timing models</li>
                    <li>• Alternative data integration</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-3">Future Potential</h4>
                  <ul className="space-y-2 text-emerald-700 text-sm">
                    <li>• Regime-aware factor models</li>
                    <li>• Real-time factor adaptation</li>
                    <li>• Cross-asset factor discovery</li>
                    <li>• Behavioral pattern recognition</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Institutional Providers */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Institutional-Grade Providers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">MSCI</h4>
                  <p className="text-slate-600 text-xs">Barra risk models, Factor indexes, FaCS standard</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">FactSet</h4>
                  <p className="text-slate-600 text-xs">Quant Factor Library, Portfolio analytics</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Bloomberg</h4>
                  <p className="text-slate-600 text-xs">PORT analytics, Multi-factor risk models</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Refinitiv</h4>
                  <p className="text-slate-600 text-xs">Eikon platform, ESG integration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Implementation Challenges */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-red-100 rounded-xl">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Practical Implementation Challenges</h2>
          </div>
          
          <div className="space-y-6">
            {/* Transaction Costs */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-xl font-semibold text-red-900 mb-4">Transaction Cost Impact</h3>
              <p className="text-red-800 mb-4">
                Academic factor returns assume zero transaction costs, but real-world implementation faces significant friction that can erode theoretical premiums.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-red-100">
                  <h4 className="font-semibold text-red-900 mb-2">Direct Costs</h4>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>• Bid-ask spreads (5-50 bps)</li>
                    <li>• Brokerage commissions</li>
                    <li>• Market impact costs</li>
                    <li>• Securities lending fees</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-100">
                  <h4 className="font-semibold text-red-900 mb-2">Indirect Costs</h4>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>• Timing costs (delay in execution)</li>
                    <li>• Opportunity costs</li>
                    <li>• Rebalancing frequency trade-offs</li>
                    <li>• Capacity constraints</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Cost Mitigation Strategies</h4>
                <ul className="space-y-1 text-red-800 text-sm">
                  <li>• Optimize rebalancing frequency vs. factor decay</li>
                  <li>• Use patient limit orders vs. market orders</li>
                  <li>• Implement buffer zones around factor cutoffs</li>
                  <li>• Consider factor ETFs for smaller portfolios</li>
                </ul>
              </div>
            </div>

            {/* Capacity and Crowding */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-900 mb-4">Capacity Constraints & Factor Crowding</h3>
              <p className="text-orange-800 mb-4">
                As factor investing becomes mainstream, capacity constraints and crowding effects can diminish factor premiums through arbitrage.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-orange-100">
                  <h4 className="font-semibold text-orange-900 mb-2">Market Cap Constraints</h4>
                  <p className="text-orange-700 text-sm">Small-cap factors face liquidity limits as AUM grows</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-100">
                  <h4 className="font-semibold text-orange-900 mb-2">Crowding Indicators</h4>
                  <p className="text-orange-700 text-sm">Factor valuations, flows, and performance dispersion</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-100">
                  <h4 className="font-semibold text-orange-900 mb-2">Adaptation Strategies</h4>
                  <p className="text-orange-700 text-sm">Multi-factor diversification, alternative definitions</p>
                </div>
              </div>
            </div>

            {/* Regime Dependency */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Regime Dependency & Time-Varying Returns</h3>
              <p className="text-purple-800 mb-4">
                Factor premiums exhibit significant time variation, with extended periods of underperformance testing investor patience.
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-purple-100 mb-4">
                <h4 className="font-semibold text-purple-900 mb-3">Historical Drawdown Periods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-purple-700 mb-1"><strong>Value Factor:</strong></p>
                    <ul className="text-purple-600 text-xs space-y-1">
                      <li>• 1998-2000: Tech bubble (-40% drawdown)</li>
                      <li>• 2007-2020: "Lost decade" for value</li>
                      <li>• Growth dominance in low-rate environment</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-purple-700 mb-1"><strong>Momentum Factor:</strong></p>
                    <ul className="text-purple-600 text-xs space-y-1">
                      <li>• 2009: Post-crisis reversal (-80% in months)</li>
                      <li>• Market stress periods show sharp reversals</li>
                      <li>• Volatility clustering effects</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-100 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Regime-Aware Implementation</h4>
                <ul className="space-y-1 text-purple-800 text-sm">
                  <li>• Monitor factor valuations and spreads</li>
                  <li>• Implement dynamic factor allocation</li>
                  <li>• Consider macro-economic indicators</li>
                  <li>• Maintain long-term perspective despite short-term pain</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Factor Timing and Valuation */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-teal-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Factor Timing & Valuation</h2>
          </div>
          
          <div className="space-y-6">
            {/* Factor Valuation Metrics */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
              <h3 className="text-xl font-semibold text-teal-900 mb-4">Factor Valuation Metrics</h3>
              <p className="text-teal-800 mb-4">
                Just as individual stocks can be cheap or expensive, factors themselves exhibit valuation cycles that may predict future returns.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-teal-100">
                  <h4 className="font-semibold text-teal-900 mb-3">Valuation Spread Analysis</h4>
                  <ul className="space-y-2 text-teal-700 text-sm">
                    <li>• Compare P/E ratios: Value vs Growth portfolios</li>
                    <li>• Historical percentile rankings</li>
                    <li>• Cross-sectional dispersion measures</li>
                    <li>• Factor "cheapness" indicators</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-teal-100">
                  <h4 className="font-semibold text-teal-900 mb-3">Momentum Indicators</h4>
                  <ul className="space-y-2 text-teal-700 text-sm">
                    <li>• Recent factor performance trends</li>
                    <li>• Factor flow data (ETF flows)</li>
                    <li>• Sentiment and positioning metrics</li>
                    <li>• Volatility regime indicators</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-teal-100 rounded-lg border border-teal-200">
                <p className="text-teal-800 text-sm">
                  <strong>Research Finding:</strong> Factors trading at extreme valuations (top/bottom decile) 
                  show mean reversion over 3-5 year horizons, suggesting tactical timing opportunities.
                </p>
              </div>
            </div>

            {/* Dynamic Factor Allocation */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Dynamic Factor Allocation Strategies</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">Valuation-Based Timing</h4>
                  <p className="text-blue-700 text-sm mb-2">Overweight factors when "cheap" relative to history</p>
                  <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                    Example: Increase value allocation when value-growth P/E spread &gt; 80th percentile
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">Momentum-Based Timing</h4>
                  <p className="text-blue-700 text-sm mb-2">Follow factor trends while managing reversal risk</p>
                  <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                    Example: Reduce momentum exposure during high volatility regimes
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Implementation Framework</h4>
                <ol className="space-y-1 text-blue-800 text-sm">
                  <li>1. <strong>Base Allocation:</strong> Strategic factor weights (e.g., equal-weight)</li>
                  <li>2. <strong>Valuation Overlay:</strong> ±20% tactical tilts based on factor valuations</li>
                  <li>3. <strong>Risk Management:</strong> Maximum tracking error constraints</li>
                  <li>4. <strong>Rebalancing:</strong> Quarterly review with monthly monitoring</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Asset Factor Investing */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-violet-100 rounded-xl">
              <BarChart3 className="h-6 w-6 text-violet-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Cross-Asset Factor Investing</h2>
          </div>
          
          <div className="space-y-6">
            {/* Multi-Asset Factors */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-200">
              <h3 className="text-xl font-semibold text-violet-900 mb-4">Universal Factor Premiums</h3>
              <p className="text-violet-800 mb-4">
                Many equity factors exhibit similar patterns across asset classes, suggesting common risk or behavioral drivers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-violet-100">
                  <h4 className="font-semibold text-violet-900 mb-2 text-sm">Fixed Income</h4>
                  <ul className="space-y-1 text-violet-700 text-xs">
                    <li>• Duration (term structure)</li>
                    <li>• Credit (default risk)</li>
                    <li>• Carry (yield pickup)</li>
                    <li>• Momentum (bond trends)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-violet-100">
                  <h4 className="font-semibold text-violet-900 mb-2 text-sm">Currencies</h4>
                  <ul className="space-y-1 text-violet-700 text-xs">
                    <li>• Carry (interest rate differential)</li>
                    <li>• Value (PPP deviations)</li>
                    <li>• Momentum (FX trends)</li>
                    <li>• Volatility (risk-on/off)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-violet-100">
                  <h4 className="font-semibold text-violet-900 mb-2 text-sm">Commodities</h4>
                  <ul className="space-y-1 text-violet-700 text-xs">
                    <li>• Momentum (trend following)</li>
                    <li>• Carry (contango/backwardation)</li>
                    <li>• Value (mean reversion)</li>
                    <li>• Skewness (tail risk)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-violet-100">
                  <h4 className="font-semibold text-violet-900 mb-2 text-sm">Alternatives</h4>
                  <ul className="space-y-1 text-violet-700 text-xs">
                    <li>• REITs: Size, value, momentum</li>
                    <li>• Private equity: Vintage year effects</li>
                    <li>• Hedge funds: Style factors</li>
                    <li>• Volatility: Term structure</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Factor Correlation Across Assets */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">Cross-Asset Factor Correlations</h3>
              
              <div className="bg-white p-4 rounded-lg border border-emerald-100 mb-4">
                <h4 className="font-semibold text-emerald-900 mb-3">Correlation Patterns</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-emerald-300">
                        <th className="text-left py-1 text-emerald-800">Factor</th>
                        <th className="text-left py-1 text-emerald-800">Equity-Bond</th>
                        <th className="text-left py-1 text-emerald-800">Equity-FX</th>
                        <th className="text-left py-1 text-emerald-800">Equity-Commodity</th>
                        <th className="text-left py-1 text-emerald-800">Interpretation</th>
                      </tr>
                    </thead>
                    <tbody className="text-emerald-700">
                      <tr className="border-b border-emerald-200">
                        <td className="py-1 font-medium">Momentum</td>
                        <td className="py-1">0.15-0.30</td>
                        <td className="py-1">0.20-0.40</td>
                        <td className="py-1">0.25-0.45</td>
                        <td className="py-1">Universal trend-following behavior</td>
                      </tr>
                      <tr className="border-b border-emerald-200">
                        <td className="py-1 font-medium">Carry</td>
                        <td className="py-1">0.10-0.25</td>
                        <td className="py-1">0.30-0.50</td>
                        <td className="py-1">0.15-0.35</td>
                        <td className="py-1">Risk premium harvesting</td>
                      </tr>
                      <tr className="border-b border-emerald-200">
                        <td className="py-1 font-medium">Value</td>
                        <td className="py-1">0.05-0.20</td>
                        <td className="py-1">0.15-0.30</td>
                        <td className="py-1">0.10-0.25</td>
                        <td className="py-1">Mean reversion tendencies</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-medium">Low Vol</td>
                        <td className="py-1">0.20-0.40</td>
                        <td className="py-1">0.25-0.45</td>
                        <td className="py-1">0.15-0.30</td>
                        <td className="py-1">Risk-on/risk-off dynamics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-emerald-100 p-4 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-2">Diversification Benefits</h4>
                <p className="text-emerald-800 text-sm">
                  Moderate correlations (0.15-0.45) suggest meaningful diversification benefits from cross-asset factor investing, 
                  while still capturing common risk premiums across markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ESG Integration with Factor Models */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-100 rounded-xl">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">ESG Integration with Factor Models</h2>
          </div>
          
          <div className="space-y-6">
            {/* ESG as Quality Factor */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-4">ESG as Enhanced Quality Factor</h3>
              <p className="text-green-800 mb-4">
                ESG metrics often correlate with traditional quality measures, potentially enhancing factor model explanatory power.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">Environmental</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Carbon efficiency</li>
                    <li>• Resource management</li>
                    <li>• Climate risk exposure</li>
                    <li>• Transition readiness</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">Social</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Employee satisfaction</li>
                    <li>• Customer loyalty</li>
                    <li>• Community relations</li>
                    <li>• Supply chain ethics</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">Governance</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Board independence</li>
                    <li>• Executive compensation</li>
                    <li>• Audit quality</li>
                    <li>• Shareholder rights</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ESG Factor Construction */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">ESG Factor Construction Approaches</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3">Integration Methods</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• <strong>ESG Tilt:</strong> Overweight high ESG scores within factors</li>
                    <li>• <strong>ESG Screen:</strong> Exclude bottom ESG quartile</li>
                    <li>• <strong>ESG Factor:</strong> Standalone ESG long-short portfolio</li>
                    <li>• <strong>ESG Overlay:</strong> Risk model enhancement</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3">Performance Impact</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Minimal tracking error (20-50 bps)</li>
                    <li>• Potential downside protection</li>
                    <li>• Sector bias considerations</li>
                    <li>• Long-term alpha potential</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-100 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Research Findings</h4>
                <p className="text-blue-800 text-sm">
                  Academic studies suggest ESG integration can enhance risk-adjusted returns, particularly during market stress periods, 
                  while maintaining factor exposures and diversification benefits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Continue Learning */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                <FileText className="inline mr-2" />
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-slate-600">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </div>
      </footer>
    </>
  );
}