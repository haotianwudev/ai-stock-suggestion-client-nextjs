'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChartBar, Zap, ShieldCheck, Target, TrendingUp, AlertTriangle, Calendar, DollarSign, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Candidate data
const candidates = [
  { 
    name: 'MicroStrategy Inc.', 
    ticker: 'MSTR', 
    sector: 'Info Tech', 
    marketCap: '~90', 
    beta: '3.83', 
    rationale: 'Largest eligible non-member by market cap; high profile Bitcoin proxy.', 
    risk: 'Extreme volatility; Bitcoin correlation; previously snubbed in Sept. 2025.', 
    probability: 'Medium' 
  },
  { 
    name: 'Astera Labs Inc.', 
    ticker: 'ALAB', 
    sector: 'Info Tech', 
    marketCap: '~30', 
    beta: 'N/A', 
    rationale: 'Newly eligible, high-growth semiconductor firm in key AI sector.', 
    risk: 'Crowded tech sector; limited trading history.', 
    probability: 'Medium' 
  },
  { 
    name: 'Pure Storage Inc.', 
    ticker: 'PSTG', 
    sector: 'Info Tech', 
    marketCap: '~25', 
    beta: '1.85', 
    rationale: 'Strong candidate for promotion from S&P MidCap 400.', 
    risk: 'Crowded sector; muted net-demand effect.', 
    probability: 'High' 
  },
  { 
    name: 'Cheniere Energy', 
    ticker: 'LNG', 
    sector: 'Energy', 
    marketCap: '~38', 
    beta: '1.21', 
    rationale: 'Large, profitable energy firm in under-represented sector.', 
    risk: 'Sensitive to commodity prices and regulatory changes.', 
    probability: 'High' 
  },
  { 
    name: 'Markel Group', 
    ticker: 'MKL', 
    sector: 'Financials', 
    marketCap: '~23', 
    beta: '0.81', 
    rationale: 'High-quality, stable "mini-Berkshire" in under-represented sector.', 
    risk: 'Lower retail interest may lead to smaller momentum pop.', 
    probability: 'Medium' 
  },
];

const timelineSteps = [
  { 
    name: 'Trade Entry Window', 
    description: '2-3 weeks before announcement. IV is elevated but not yet at peak levels.', 
    status: 'current',
    date: 'Mid-November 2025'
  },
  { 
    name: 'The Announcement', 
    description: 'Friday, Dec 5, 2025, after market close. Primary catalyst event.', 
    status: 'upcoming',
    date: 'December 5, 2025'
  },
  { 
    name: 'Peak Momentum', 
    description: 'Monday-Tuesday following announcement. Optimal profit-taking window.', 
    status: 'upcoming',
    date: 'December 8-9, 2025'
  },
  { 
    name: 'Inclusion Date', 
    description: 'Monday, Dec 22, 2025. Price effect dissipates. All trades closed.', 
    status: 'upcoming',
    date: 'December 22, 2025'
  },
];

export default function SP500InclusionAnomaly() {
  const [selectedStrategy, setSelectedStrategy] = useState('bull-call');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'sp500-inclusion-anomaly-december-2025-deep-research');

  const getProbabilityClass = (probability: string) => {
    switch (probability.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      {/* SEO Components */}
      {currentArticle && currentArticle.slug && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section with Enhanced Styling */}
        <div className="bg-white relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60"></div>
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
            {/* Badges */}
            <div className="flex justify-between items-start mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 border border-purple-200 shadow-sm">
                <Target className="mr-2 h-4 w-4" />
                Deep Research
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-200 shadow-sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                Options Strategy
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Mastering the S&P 500 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Inclusion Anomaly</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
              A comprehensive analysis of the event-driven strategy for the December 5, 2025 S&P 500 rebalance
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500 mt-6">
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                September 15, 2025
              </span>
              <span>&bull;</span>
              <span>Deep Research</span>
              <span>&bull;</span>
              <span>15 min read</span>
            </div>
          </div>
        </div>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative bg-white"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="S&P 500 Inclusion Anomaly Analysis Infographic" 
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
            alt="S&P 500 Inclusion Anomaly Analysis Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        <div className="max-w-5xl mx-auto px-6 py-16">

          {/* Executive Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-12 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
              <Target className="mr-3 h-7 w-7" />
              Executive Summary
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-blue-800 leading-relaxed text-lg">
                The S&P 500 inclusion anomaly represents one of the most reliable event-driven trading opportunities in modern markets. 
                Our analysis for the December 5, 2025 rebalance identifies five high-probability candidates and provides a comprehensive 
                framework for capitalizing on the temporary momentum created by index fund rebalancing and retail speculation.
              </p>
              <p className="text-blue-800 leading-relaxed mt-4 text-lg">
                <strong>Key Insight:</strong> The modern index effect is no longer about permanent re-rating but about riding intense, 
                temporary buying pressure that peaks at announcement and fades by inclusion date.
              </p>
            </div>
          </div>

          {/* The Modern Index Effect */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
              <ChartBar className="mr-4 h-8 w-8 text-blue-600" />
              Understanding the Modern Index Effect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Historical Context</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Historically, S&P 500 inclusion generated a permanent 7-9% excess return as passive funds were forced buyers. 
                  This created a structural arbitrage opportunity that academic literature extensively documented.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Modern Reality</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Today's effect is primarily a short-term momentum event driven by retail sentiment and ETF inflows. 
                  The announcement acts as validation and catalyst, creating temporary buying pressure that fades post-inclusion.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border border-yellow-200 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start">
                <Zap className="h-8 w-8 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-900 mb-3">The Volatility Crush Opportunity</h3>
                  <p className="text-yellow-800 leading-relaxed text-lg">
                    Speculation inflates option prices (Implied Volatility) before the announcement. After the event, 
                    this IV collapses dramatically. Sophisticated traders structure positions to profit from this "IV crush" 
                    while maintaining directional exposure to the underlying momentum.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Candidate Analysis */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
              <Target className="mr-4 h-8 w-8 text-green-600" />
              December 2025 Candidate Watchlist
            </h2>
            
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Investment Rationale
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Risk Profile
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Probability
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {candidates.map((candidate, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-lg font-bold text-gray-900">
                            {candidate.name} ({candidate.ticker})
                          </div>
                          <div className="text-sm text-gray-500 font-medium">{candidate.sector}</div>
                          <div className="text-sm text-gray-500 mt-2">
                            MCap: {candidate.marketCap}B | Beta: {candidate.beta}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm text-gray-700 max-w-xs leading-relaxed">
                          {candidate.rationale}
                        </td>
                        <td className="px-8 py-6 text-sm text-gray-700 max-w-xs leading-relaxed">
                          {candidate.risk}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 ${getProbabilityClass(candidate.probability)}`}>
                            {candidate.probability}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Screening Methodology</h3>
              <div className="grid md:grid-cols-2 gap-6 text-blue-800">
                <div>
                  <strong className="text-lg">Quantitative Screens:</strong>
                  <ul className="list-disc list-inside mt-3 space-y-2 text-base">
                    <li>Market cap &gt; $18B</li>
                    <li>Positive trailing 12-month earnings</li>
                    <li>Public float &gt; 50%</li>
                    <li>Adequate trading liquidity</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-lg">Qualitative Analysis:</strong>
                  <ul className="list-disc list-inside mt-3 space-y-2 text-base">
                    <li>Sector representation balance</li>
                    <li>GICS classification alignment</li>
                    <li>Corporate governance standards</li>
                    <li>Strategic importance to index</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Strategy Framework */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
              <Zap className="mr-4 h-8 w-8 text-purple-600" />
              Options Strategy Framework
            </h2>

            <div className="mb-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => setSelectedStrategy('bull-call')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    selectedStrategy === 'bull-call' 
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                  }`}
                >
                  Bull Call Spread
                </button>
                <button
                  onClick={() => setSelectedStrategy('bull-put')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    selectedStrategy === 'bull-put' 
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                  }`}
                >
                  Bull Put Spread
                </button>
                <button
                  onClick={() => setSelectedStrategy('basket')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    selectedStrategy === 'basket' 
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                  }`}
                >
                  Basket Approach
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
                {selectedStrategy === 'bull-call' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Bull Call Spread (Debit Strategy)</h3>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-lg">Structure</h4>
                          <ul className="text-gray-700 space-y-2 text-base">
                            <li>&bull; Buy ATM or slightly OTM call</li>
                            <li>&bull; Sell higher strike call (same expiration)</li>
                            <li>&bull; Net debit to enter position</li>
                            <li>&bull; Defined maximum risk and reward</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-lg">Risk/Reward Profile</h4>
                          <ul className="text-gray-700 space-y-2 text-base">
                            <li>&bull; Max Loss: Net premium paid</li>
                            <li>&bull; Max Gain: Strike difference - premium</li>
                            <li>&bull; Breakeven: Long strike + net premium</li>
                            <li>&bull; Negative impact from IV crush</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <p className="text-yellow-800 text-base">
                          <strong>Key Consideration:</strong> While this strategy profits from upward price movement, 
                          it suffers from the post-announcement IV crush. Best suited for high-conviction, 
                          high-probability candidates where directional movement outweighs volatility concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStrategy === 'bull-put' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Bull Put Spread (Credit Strategy)</h3>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-lg">Structure</h4>
                          <ul className="text-gray-700 space-y-2 text-base">
                            <li>&bull; Sell ATM or slightly OTM put</li>
                            <li>&bull; Buy lower strike put (same expiration)</li>
                            <li>&bull; Net credit received</li>
                            <li>&bull; Profit from stock staying above short strike</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-lg">Advantages</h4>
                          <ul className="text-gray-700 space-y-2 text-base">
                            <li>&bull; Benefits from IV crush</li>
                            <li>&bull; Positive theta decay</li>
                            <li>&bull; Immediate credit received</li>
                            <li>&bull; Profits even if stock moves sideways</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <p className="text-green-800 text-base">
                          <strong>Preferred Strategy:</strong> Often superior for this high-volatility event as it 
                          profits from both directional movement and the inevitable IV crush post-announcement. 
                          The dual profit mechanism makes it particularly attractive for inclusion plays.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStrategy === 'basket' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Diversified Basket Approach</h3>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-lg">Portfolio Construction</h4>
                          <ul className="text-gray-700 space-y-2 text-base">
                            <li>&bull; 2-4 high-probability candidates</li>
                            <li>&bull; Equal or probability-weighted positions</li>
                            <li>&bull; Diversified across sectors when possible</li>
                            <li>&bull; Consistent strategy across names</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-lg">Risk Mitigation</h4>
                          <ul className="text-gray-700 space-y-2 text-base">
                            <li>&bull; Reduces single-stock "snub risk"</li>
                            <li>&bull; Smooths return profile</li>
                            <li>&bull; Professional institutional approach</li>
                            <li>&bull; Better risk-adjusted returns</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <p className="text-blue-800 text-base">
                          <strong>Professional Approach:</strong> Institutional traders typically build baskets 
                          rather than betting on single names. This approach acknowledges that predicting exact 
                          inclusions is difficult, but the overall effect is reliable across a diversified portfolio.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
              <Calendar className="mr-4 h-8 w-8 text-indigo-600" />
              Critical Event Timeline
            </h2>
            
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              {timelineSteps.map((step, stepIdx) => (
                <div key={step.name} className={`relative ${stepIdx !== timelineSteps.length - 1 ? 'pb-12' : ''}`}>
                  {stepIdx !== timelineSteps.length - 1 && (
                    <div className="absolute left-5 top-5 -ml-px mt-0.5 h-full w-1 bg-gradient-to-b from-indigo-300 to-gray-300" />
                  )}
                  <div className="relative flex items-start group">
                    <span className="h-11 flex items-center">
                      <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all duration-200 ${
                        step.status === 'current' 
                          ? 'bg-indigo-600 border-indigo-600 shadow-lg' 
                          : 'bg-white border-gray-300 group-hover:border-indigo-400'
                      }`}>
                        {step.status === 'current' ? (
                          <span className="h-3 w-3 bg-white rounded-full" />
                        ) : (
                          <span className="h-3 w-3 bg-transparent rounded-full group-hover:bg-indigo-200" />
                        )}
                      </span>
                    </span>
                    <div className="ml-6 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-lg font-bold ${
                          step.status === 'current' ? 'text-indigo-700' : 'text-gray-700'
                        }`}>
                          {step.name}
                        </span>
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{step.date}</span>
                      </div>
                      <span className="text-gray-600 mt-2 block text-base leading-relaxed">{step.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Risk Management */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
              <ShieldCheck className="mr-4 h-8 w-8 text-red-600" />
              Risk Management Framework
            </h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="mr-3 h-6 w-6 text-red-500" />
                  Primary Risks
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Snub Risk</h4>
                    <p className="text-gray-700 leading-relaxed">
                      The primary risk is a candidate not being selected. Historical snub rate is approximately 
                      20-30% for seemingly qualified candidates. Diversification is the key mitigation strategy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Timing Risk</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Entering too early subjects positions to general market volatility. Entering too late 
                      means paying elevated premiums with limited upside potential.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Liquidity Risk</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Some candidates may have limited options liquidity, leading to wide bid-ask spreads 
                      and difficult execution, especially during volatile periods.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShieldCheck className="mr-3 h-6 w-6 text-green-500" />
                  Mitigation Strategies
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Portfolio Diversification</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Build positions across 2-4 high-probability candidates to reduce single-stock risk. 
                      This professional approach smooths returns and improves risk-adjusted performance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Position Sizing</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Limit individual positions to 2-3% of portfolio value. The strategy should be viewed 
                      as a tactical allocation, not a core holding.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Exit Discipline</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Establish clear profit-taking levels (typically 50-75% of maximum gain) and stick to 
                      the timeline. Avoid the temptation to hold through inclusion date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-2xl p-10 shadow-xl">
              <h2 className="text-3xl font-bold text-blue-900 mb-8">Key Strategic Takeaways</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-blue-800 text-base leading-relaxed">
                      <strong>Modern Effect:</strong> The S&P 500 inclusion anomaly is now primarily a short-term momentum event, 
                      not a permanent re-rating opportunity.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-blue-800 text-base leading-relaxed">
                      <strong>IV Crush Advantage:</strong> Bull put spreads often outperform bull call spreads due to 
                      their ability to profit from both directional movement and volatility collapse.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-blue-800 text-base leading-relaxed">
                      <strong>Timing is Critical:</strong> Peak momentum occurs in the 1-2 days following the announcement. 
                      Holding through inclusion date typically destroys value.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <p className="text-blue-800 text-base leading-relaxed">
                      <strong>Diversification Essential:</strong> Professional approach requires building baskets 
                      of 2-4 candidates to mitigate single-stock snub risk.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <p className="text-blue-800 text-base leading-relaxed">
                      <strong>Risk Management:</strong> Position sizing should be conservative (2-3% of portfolio) 
                      with clear exit discipline and profit-taking targets.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm font-bold">6</span>
                    </div>
                    <p className="text-blue-800 text-base leading-relaxed">
                      <strong>Candidate Quality:</strong> Focus on large-cap, profitable companies in under-represented 
                      sectors with strong fundamentals and adequate liquidity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Educational Disclaimer */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 mb-12 shadow-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-yellow-900 mb-4">Educational Disclaimer</h3>
                <p className="text-yellow-800 text-base leading-relaxed">
                  This analysis is for educational purposes only and does not constitute investment advice. 
                  Options trading involves substantial risk and is not suitable for all investors. Past performance 
                  does not guarantee future results. The S&P 500 inclusion process is subject to committee discretion, 
                  and no candidate is guaranteed inclusion. Always consult with a qualified financial advisor and 
                  conduct your own research before making investment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-10 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Master Event-Driven Strategies?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              This deep research analysis provides the framework for understanding and potentially capitalizing 
              on one of the market's most reliable anomalies. Remember: knowledge without action is merely entertainment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Read Full Research Document
                </a>
              )}
              <Link 
                href="/"
                className="inline-block bg-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore More Research
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-gray-300 text-lg">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
