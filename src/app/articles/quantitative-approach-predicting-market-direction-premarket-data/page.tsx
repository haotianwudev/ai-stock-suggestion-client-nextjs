'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Table Components ---
const Table1 = () => (
  <div className="my-6 overflow-x-auto">
    <h4 className="font-semibold text-lg text-slate-700 mb-2">Table 1: Pre-Market vs. Regular Trading Hours</h4>
    <div className="border border-slate-200 rounded-lg">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Feature</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pre-Market Session</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Regular Trading Session</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Liquidity & Volume</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Very low</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">High</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Bid-Ask Spreads</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Wide</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Narrow</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Volatility</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">High and often erratic</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Moderate</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Key Participants</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Dominated by institutional traders</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Broad participation</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Price Discovery</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Fragmented, less efficient</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Centralized and efficient</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Order Types</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Often restricted to limit orders</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Full range available</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Table2 = () => (
  <div className="my-6 overflow-x-auto">
    <h4 className="font-semibold text-lg text-slate-700 mb-2">Table 2: Typology of Market Gaps</h4>
    <div className="border border-slate-200 rounded-lg">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Gap Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Implication</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">Common Gap</td>
            <td className="px-6 py-4 text-sm text-slate-500">Small gap within a trading range.</td>
            <td className="px-6 py-4 text-sm text-slate-500">Little predictive value; often filled.</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">Breakaway Gap</td>
            <td className="px-6 py-4 text-sm text-slate-500">Occurs on a breakout from a consolidation pattern (e.g., a multi-month base).</td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="bg-green-100 text-green-800 font-medium px-2 py-1 rounded">Signals the start of a new, powerful trend.</span> High volume confirmation is critical.</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">Continuation Gap</td>
            <td className="px-6 py-4 text-sm text-slate-500">Occurs in the middle of a strong, established trend. Also known as a "measuring gap."</td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="bg-green-100 text-green-800 font-medium px-2 py-1 rounded">Signals trend continuation</span> and conviction from buyers/sellers. Often marks the halfway point of the move.</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">Exhaustion Gap</td>
            <td className="px-6 py-4 text-sm text-slate-500">Occurs near the end of a prolonged trend after a rapid price advance or decline.</td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="bg-red-100 text-red-800 font-medium px-2 py-1 rounded">Signals a potential trend reversal</span> as the last buyers/sellers are flushed out. Often followed by a sharp reversal.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Table3 = () => (
  <div className="my-8 overflow-x-auto">
    <h4 className="font-semibold text-lg text-slate-700 mb-2">Table 3: Decision Matrix for Trading Opening Gaps</h4>
    <div className="border border-slate-200 rounded-lg">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Indicator</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Go Long (Momentum)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Go Short (Fade)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Go Long (Reversal)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">Catalyst Strength</td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-green-600 font-semibold">Strong, fundamental</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-red-600 font-semibold">Weak, speculative</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-red-600 font-semibold">Overreaction or panic</span></td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">Pre-Market Volume</td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-green-600 font-semibold">High, above average</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-red-600 font-semibold">Low, below average</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-red-600 font-semibold">Low volume sell-off</span></td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">vs. S/R Levels</td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-green-600 font-semibold">Breaks above resistance</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-red-600 font-semibold">Gaps into resistance</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-green-600 font-semibold">Gaps into support</span></td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">Index Futures</td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-green-600 font-semibold">Strong positive correlation</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-red-600 font-semibold">Negative divergence</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-green-600 font-semibold">Positive divergence</span></td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-slate-900">Options Sentiment</td>
            <td className="px-6 py-4 text-sm text-slate-500">Neutral</td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-red-600 font-semibold">Extreme bullishness</span></td>
            <td className="px-6 py-4 text-sm text-slate-500"><span className="text-green-600 font-semibold">Extreme bearishness</span></td>
          </tr>
          <tr className="bg-sky-50">
            <td className="px-6 py-4 text-sm font-bold text-sky-800">High-Probability Strategy</td>
            <td className="px-6 py-4 text-sm font-bold text-sky-800">Gap and Go</td>
            <td className="px-6 py-4 text-sm font-bold text-sky-800">Fading the Gap</td>
            <td className="px-6 py-4 text-sm font-bold text-sky-800">Buying the Dip</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default function QuantitativePreMarketAnalysis() {
  const currentArticle = articles.find(article => article.slug === 'quantitative-approach-predicting-market-direction-premarket-data');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header with Return Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section with Title */}
        <div className="bg-white relative overflow-hidden border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
            {/* Badges */}
            <div className="relative mb-8">
              {/* Deep Research Badge - Top Left */}
              <div className="absolute top-0 left-0 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  Deep Research
                </span>
              </div>
              
              {/* Podcast Badge - Top Right */}
              <div className="absolute top-0 right-0 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  <Music className="w-3 h-3 mr-1" />
                  Podcast
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight pt-8">
              A Quantitative Approach to Predicting Market Direction Using Pre-Market Data
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light mb-6">
              An in-depth analysis of the indicators, strategies, and academic research behind trading the opening bell.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>October 29, 2025</span>
              <span>•</span>
              <span>Deep Research Analysis</span>
              <span>•</span>
              <span>15 min read</span>
            </div>
          </div>
        </div>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/jwesLgi.jpeg" 
              alt="Quantitative Pre-Market Analysis Infographic" 
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

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/jwesLgi.jpeg"
          alt="Quantitative Pre-Market Analysis Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Article Content */}
        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* Research Foundation */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-100 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Research Foundation</h3>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    This analysis synthesizes academic research on market microstructure, behavioral finance, and quantitative trading strategies. 
                    The frameworks presented are based on empirical studies and institutional trading practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The Pre-Market Environment */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                The Pre-Market Environment
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                A landscape of low liquidity and high volatility where price signals can be both powerful and profoundly misleading
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Defining Pre-Market</h3>
                <p className="text-slate-600 leading-relaxed">
                  The pre-market session (4:00 a.m. - 9:30 a.m. ET) operates through decentralized Electronic Communication Networks (ECNs), 
                  creating a fundamentally different trading environment than regular hours.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Information Asymmetry</h3>
                <p className="text-slate-600 leading-relaxed">
                  Dominated by institutional investors and hedge funds, creating significant information asymmetry. 
                  Retail traders often react to moves already initiated by more informed players.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 mb-12 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Core Market Characteristics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📉</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Low Liquidity</h4>
                  <p className="text-sm text-slate-600">Small orders can cause significant price movements</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Wide Spreads</h4>
                  <p className="text-sm text-slate-600">Higher implicit costs and execution risks</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">High Volatility</h4>
                  <p className="text-sm text-slate-600">Erratic price swings amplify both signals and noise</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r-2xl p-6 mb-8">
              <div className="flex items-start">
                <div className="bg-yellow-400 p-2 rounded-lg mr-4">
                  <span className="text-white font-bold text-sm">!</span>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-800 mb-2">Signal-to-Noise Ratio Challenge</h4>
                  <p className="text-yellow-700">
                    The primary task is differentiating genuine "signals" (true valuation shifts) from "noise" (erratic price fluctuations). 
                    This requires systematic analysis across multiple indicators.
                  </p>
                </div>
              </div>
            </div>

            <Table1 />
          </section>

          {/* Information Flow Analysis */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-green-800 to-blue-800 bg-clip-text text-transparent mb-4">
                Decoding Pre-Market Information Flow
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                A multi-factor analysis approach to synthesizing information from multiple sources
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-xl mr-4">
                      <span className="text-2xl">📰</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">News & Catalysts</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Assess catalyst quality: <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">high-quality catalysts</span> 
                    (blowout earnings) drive follow-through, while <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-medium">low-quality catalysts</span> 
                    (vague upgrades) tend to fade.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Global Markets</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    European markets (FTSE, DAX) set prevailing risk sentiment: 
                    <span className="text-green-600 font-semibold">risk-on</span> or 
                    <span className="text-red-600 font-semibold"> risk-off</span> for U.S. sessions.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-xl mr-4">
                      <span className="text-2xl">📈</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Index Futures</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    E-mini S&P 500 (/ES) and Nasdaq 100 (/NQ) serve as the primary directional compass. 
                    Superior liquidity and 24/7 trading represent market consensus on fair value.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 p-3 rounded-xl mr-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">VIX & Options</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-medium">High VIX (&gt;25-30)</span> indicates fear, 
                    suggesting gap-downs may be overextended. <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">Low VIX (&lt;15)</span> 
                    signals complacency.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Academic Perspectives */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-4">
                Academic Perspectives & Market Inefficiencies
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Quantitative foundations for understanding market gaps and persistent inefficiencies
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Asymmetric News Response</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Markets absorb negative information rapidly but positive information slowly, creating a "drift" effect.
                </p>
                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-blue-800 font-medium text-sm">
                    Post-Earnings Announcement Drift (PEAD) suggests systematic underreaction to good news, 
                    providing statistical tailwind for "Gap and Go" strategies.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200">
                <div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">The Gap Fill Myth</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  The retail adage "all gaps get filled" is largely debunked by academic studies.
                </p>
                <div className="bg-red-100 rounded-lg p-4">
                  <p className="text-red-800 font-medium text-sm">
                    <strong>Warning:</strong> While common gaps often fill, powerful Breakaway and Continuation gaps frequently don't. 
                    Fighting strong trends is dangerous.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Frameworks */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-4">
                Strategic Trading Frameworks
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Concrete, actionable frameworks for trading the opening gap with high-probability setups
              </p>
            </div>
            
            <Table2 />

            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-12 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Key Technical Indicators</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-blue-600 font-bold">V</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">VWAP</h4>
                  <p className="text-slate-600">
                    Volume-Weighted Average Price acts as the institutional benchmark. 
                    Trading above VWAP is generally bullish signal.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-green-600 font-bold">O</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Opening Range Breakout</h4>
                  <p className="text-slate-600">
                    Breakout above opening range high on high volume provides strong confirmation signal.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center mb-6">
                  <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📉</span>
                  </div>
                  <h4 className="text-2xl font-bold text-red-800 mb-3">Fading the Gap</h4>
                  <p className="text-red-600 font-medium">Short Strategy</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    <span className="text-red-700">Weak catalyst</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    <span className="text-red-700">Low pre-market volume</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    <span className="text-red-700">Gaps into resistance</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    <span className="text-red-700">Negative market divergence</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center mb-6">
                  <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🚀</span>
                  </div>
                  <h4 className="text-2xl font-bold text-green-800 mb-3">Gap and Go</h4>
                  <p className="text-green-600 font-medium">Long Strategy</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-green-700">Strong fundamental catalyst</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-green-700">High pre-market volume</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-green-700">Technical breakout</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-green-700">Positive market alignment</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center mb-6">
                  <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💎</span>
                  </div>
                  <h4 className="text-2xl font-bold text-blue-800 mb-3">Buying the Dip</h4>
                  <p className="text-blue-600 font-medium">Long Strategy</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-blue-700">Gaps into major support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-blue-700">Positive market divergence</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-blue-700">Extreme fear (high VIX)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-blue-700">Overreaction to news</span>
                  </div>
                </div>
              </div>
            </div>

            <Table3 />
          </section>

          {/* Risk Management Protocol */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-red-800 to-orange-800 bg-clip-text text-transparent mb-4">
                Risk Management Protocol
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Disciplined framework and unwavering commitment to risk management for consistent edge
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Pre-Market Checklist (7:30 - 9:30 AM ET)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Global Macro Context</h4>
                      <p className="text-slate-600 text-sm">European markets sentiment analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Index Futures</h4>
                      <p className="text-slate-600 text-sm">/ES and /NQ trend analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Sector ETFs</h4>
                      <p className="text-slate-600 text-sm">Confirmation from relevant sectors</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">News Catalysts</h4>
                      <p className="text-slate-600 text-sm">High vs low impact differentiation</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">5</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Pre-Market Gappers</h4>
                      <p className="text-slate-600 text-sm">High volume gap identification</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">6</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Stock Analysis</h4>
                      <p className="text-slate-600 text-sm">Catalyst quality & technical levels</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">7</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Options Sentiment</h4>
                      <p className="text-slate-600 text-sm">VIX level assessment</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">8</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Trade Hypothesis</h4>
                      <p className="text-slate-600 text-sm">Entry, stop, target definition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">⏰</span>
                  </div>
                  <h4 className="text-xl font-bold text-yellow-800">First 5-Minute Rule</h4>
                </div>
                <p className="text-yellow-700 text-center">
                  Unless experienced, avoid trading within the first 5 minutes. Let volatility subside before entering positions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📊</span>
                  </div>
                  <h4 className="text-xl font-bold text-blue-800">Position Sizing</h4>
                </div>
                <p className="text-blue-700 text-center">
                  Cut normal position size in half for opening trades to compensate for higher volatility and execution risks.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🛑</span>
                  </div>
                  <h4 className="text-xl font-bold text-red-800">Hard Stops Mandatory</h4>
                </div>
                <p className="text-red-700 text-center">
                  Use hard stop-loss orders, not mental stops, to prevent catastrophic losses in volatile conditions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">⚡</span>
                  </div>
                  <h4 className="text-xl font-bold text-purple-800">Three Strikes Rule</h4>
                </div>
                <p className="text-purple-700 text-center">
                  After three consecutive losing trades at the open, stop trading for the day to prevent revenge trading.
                </p>
              </div>
            </div>
          </section>

          {/* Risk Warning */}
          <div className="bg-gradient-to-r from-red-50 via-pink-50 to-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-100 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-start">
                <div className="bg-red-500 p-4 rounded-xl mr-6 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-900 mb-4">Risk Warning</h3>
                  <p className="text-lg text-red-800 leading-relaxed">
                    Pre-market trading involves substantial risk due to low liquidity and high volatility. Never risk more than you can afford to lose. 
                    This analysis is for educational purposes only and does not constitute investment advice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-12 text-center text-white mb-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 -translate-x-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Continue Your Learning Journey</h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Dive deeper into the research and hear detailed analysis on our podcast episode.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-blue-600 font-bold py-4 px-8 rounded-xl text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span className="mr-2">📄</span>
                    Read Full Research
                  </a>
                )}
                {currentArticle?.podcastUrl && (
                  <a 
                    href={currentArticle.podcastUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Music className="mr-2 h-5 w-5" />
                    Listen to Podcast
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-gradient-to-r from-slate-100 to-blue-50 rounded-2xl p-8 text-center border border-slate-200">
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">ℹ️</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-3">Educational Disclaimer</h4>
              <p className="text-slate-600 leading-relaxed">
                This content is for informational and educational purposes only. It does not constitute investment advice, 
                and you should not rely on it as such. Trading involves substantial risk of loss. Past performance does not 
                guarantee future results. Always consult with a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-8 mt-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-slate-300">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
