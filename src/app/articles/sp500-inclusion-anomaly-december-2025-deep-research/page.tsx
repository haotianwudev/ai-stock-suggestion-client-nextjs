'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChartBar, Zap, ShieldCheck, Target, TrendingUp, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

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
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Badges */}
          <div className="relative mb-8">
            <div className="absolute top-0 left-0 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                Deep Research
              </span>
            </div>
            <div className="absolute top-0 right-0 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                Options Strategy
              </span>
            </div>
          </div>

          {/* Title and Meta */}
          <div className="text-center mb-12 pt-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Mastering the S&P 500 Inclusion Anomaly
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              A comprehensive analysis of the event-driven strategy for the December 5, 2025 S&P 500 rebalance
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span>September 15, 2025</span>
              <span>&bull;</span>
              <span>Deep Research</span>
              <span>&bull;</span>
              <span>15 min read</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <Target className="mr-3 h-6 w-6" />
              Executive Summary
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-blue-800 leading-relaxed">
                The S&P 500 inclusion anomaly represents one of the most reliable event-driven trading opportunities in modern markets. 
                Our analysis for the December 5, 2025 rebalance identifies five high-probability candidates and provides a comprehensive 
                framework for capitalizing on the temporary momentum created by index fund rebalancing and retail speculation.
              </p>
              <p className="text-blue-800 leading-relaxed mt-3">
                <strong>Key Insight:</strong> The modern index effect is no longer about permanent re-rating but about riding intense, 
                temporary buying pressure that peaks at announcement and fades by inclusion date.
              </p>
            </div>
          </div>

          {/* The Modern Index Effect */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <ChartBar className="mr-3 h-7 w-7 text-blue-600" />
              Understanding the Modern Index Effect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Historical Context</h3>
                <p className="text-gray-700 leading-relaxed">
                  Historically, S&P 500 inclusion generated a permanent 7-9% excess return as passive funds were forced buyers. 
                  This created a structural arbitrage opportunity that academic literature extensively documented.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern Reality</h3>
                <p className="text-gray-700 leading-relaxed">
                  Today's effect is primarily a short-term momentum event driven by retail sentiment and ETF inflows. 
                  The announcement acts as validation and catalyst, creating temporary buying pressure that fades post-inclusion.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">The Volatility Crush Opportunity</h3>
                  <p className="text-yellow-800 leading-relaxed">
                    Speculation inflates option prices (Implied Volatility) before the announcement. After the event, 
                    this IV collapses dramatically. Sophisticated traders structure positions to profit from this "IV crush" 
                    while maintaining directional exposure to the underlying momentum.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Candidate Analysis */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="mr-3 h-7 w-7 text-green-600" />
              December 2025 Candidate Watchlist
            </h2>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Investment Rationale
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Risk Profile
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Probability
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {candidates.map((candidate, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {candidate.name} ({candidate.ticker})
                          </div>
                          <div className="text-xs text-gray-500">{candidate.sector}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            MCap: {candidate.marketCap}B | Beta: {candidate.beta}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                          {candidate.rationale}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                          {candidate.risk}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getProbabilityClass(candidate.probability)}`}>
                            {candidate.probability}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Screening Methodology</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <strong>Quantitative Screens:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Market cap &gt; $18B</li>
                    <li>Positive trailing 12-month earnings</li>
                    <li>Public float &gt; 50%</li>
                    <li>Adequate trading liquidity</li>
                  </ul>
                </div>
                <div>
                  <strong>Qualitative Analysis:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
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
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="mr-3 h-7 w-7 text-purple-600" />
              Options Strategy Framework
            </h2>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedStrategy('bull-call')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedStrategy === 'bull-call' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Bull Call Spread
                </button>
                <button
                  onClick={() => setSelectedStrategy('bull-put')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedStrategy === 'bull-put' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Bull Put Spread
                </button>
                <button
                  onClick={() => setSelectedStrategy('basket')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedStrategy === 'basket' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Basket Approach
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                {selectedStrategy === 'bull-call' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Bull Call Spread (Debit Strategy)</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Structure</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>&bull; Buy ATM or slightly OTM call</li>
                            <li>&bull; Sell higher strike call (same expiration)</li>
                            <li>&bull; Net debit to enter position</li>
                            <li>&bull; Defined maximum risk and reward</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Risk/Reward Profile</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>&bull; Max Loss: Net premium paid</li>
                            <li>&bull; Max Gain: Strike difference - premium</li>
                            <li>&bull; Breakeven: Long strike + net premium</li>
                            <li>&bull; Negative impact from IV crush</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Bull Put Spread (Credit Strategy)</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Structure</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>&bull; Sell ATM or slightly OTM put</li>
                            <li>&bull; Buy lower strike put (same expiration)</li>
                            <li>&bull; Net credit received</li>
                            <li>&bull; Profit from stock staying above short strike</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Advantages</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>&bull; Benefits from IV crush</li>
                            <li>&bull; Positive theta decay</li>
                            <li>&bull; Immediate credit received</li>
                            <li>&bull; Profits even if stock moves sideways</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800">
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Diversified Basket Approach</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Portfolio Construction</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>&bull; 2-4 high-probability candidates</li>
                            <li>&bull; Equal or probability-weighted positions</li>
                            <li>&bull; Diversified across sectors when possible</li>
                            <li>&bull; Consistent strategy across names</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Risk Mitigation</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>&bull; Reduces single-stock "snub risk"</li>
                            <li>&bull; Smooths return profile</li>
                            <li>&bull; Professional institutional approach</li>
                            <li>&bull; Better risk-adjusted returns</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
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
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="mr-3 h-7 w-7 text-indigo-600" />
              Critical Event Timeline
            </h2>
            
            <div className="relative">
              {timelineSteps.map((step, stepIdx) => (
                <div key={step.name} className={`relative ${stepIdx !== timelineSteps.length - 1 ? 'pb-10' : ''}`}>
                  {stepIdx !== timelineSteps.length - 1 && (
                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" />
                  )}
                  <div className="relative flex items-start group">
                    <span className="h-9 flex items-center">
                      <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        step.status === 'current' 
                          ? 'bg-indigo-600 border-indigo-600' 
                          : 'bg-white border-gray-300'
                      }`}>
                        {step.status === 'current' ? (
                          <span className="h-2.5 w-2.5 bg-white rounded-full" />
                        ) : (
                          <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                        )}
                      </span>
                    </span>
                    <div className="ml-4 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${
                          step.status === 'current' ? 'text-indigo-700' : 'text-gray-600'
                        }`}>
                          {step.name}
                        </span>
                        <span className="text-sm text-gray-500">{step.date}</span>
                      </div>
                      <span className="text-sm text-gray-500 mt-1 block">{step.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Risk Management */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <ShieldCheck className="mr-3 h-7 w-7 text-red-600" />
              Risk Management Framework
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  Primary Risks
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Snub Risk</h4>
                    <p className="text-sm text-gray-700">
                      The primary risk is a candidate not being selected. Historical snub rate is approximately 
                      20-30% for seemingly qualified candidates. Diversification is the key mitigation strategy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Timing Risk</h4>
                    <p className="text-sm text-gray-700">
                      Entering too early subjects positions to general market volatility. Entering too late 
                      means paying elevated premiums with limited upside potential.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Liquidity Risk</h4>
                    <p className="text-sm text-gray-700">
                      Some candidates may have limited options liquidity, leading to wide bid-ask spreads 
                      and difficult execution, especially during volatile periods.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />
                  Mitigation Strategies
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Portfolio Diversification</h4>
                    <p className="text-sm text-gray-700">
                      Build positions across 2-4 high-probability candidates to reduce single-stock risk. 
                      This professional approach smooths returns and improves risk-adjusted performance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Position Sizing</h4>
                    <p className="text-sm text-gray-700">
                      Limit individual positions to 2-3% of portfolio value. The strategy should be viewed 
                      as a tactical allocation, not a core holding.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Exit Discipline</h4>
                    <p className="text-sm text-gray-700">
                      Establish clear profit-taking levels (typically 50-75% of maximum gain) and stick to 
                      the timeline. Avoid the temptation to hold through inclusion date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Key Strategic Takeaways</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>Modern Effect:</strong> The S&P 500 inclusion anomaly is now primarily a short-term momentum event, 
                      not a permanent re-rating opportunity.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>IV Crush Advantage:</strong> Bull put spreads often outperform bull call spreads due to 
                      their ability to profit from both directional movement and volatility collapse.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>Timing is Critical:</strong> Peak momentum occurs in the 1-2 days following the announcement. 
                      Holding through inclusion date typically destroys value.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>Diversification Essential:</strong> Professional approach requires building baskets 
                      of 2-4 candidates to mitigate single-stock snub risk.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>Risk Management:</strong> Position sizing should be conservative (2-3% of portfolio) 
                      with clear exit discipline and profit-taking targets.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm font-bold">6</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>Candidate Quality:</strong> Focus on large-cap, profitable companies in under-represented 
                      sectors with strong fundamentals and adequate liquidity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Educational Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Educational Disclaimer</h3>
                <p className="text-yellow-800 text-sm leading-relaxed">
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
          <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Master Event-Driven Strategies?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              This deep research analysis provides the framework for understanding and potentially capitalizing 
              on one of the market's most reliable anomalies. Remember: knowledge without action is merely entertainment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                >
                  Read Full Research Document
                </a>
              )}
              <Link 
                href="/"
                className="inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-400 transition-colors duration-300"
              >
                Explore More Research
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-300">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}