'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, Shield, Activity, Layers, BarChart3, ArrowRight, CheckCircle, AlertTriangle, PieChart, DollarSign, Repeat, AlertOctagon, Target, Zap, Brain, HelpCircle, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function OptionAlphaSelectArticle() {
  const currentArticle = articles.find(article => article.slug === 'optionalpha-select-systematic-underlyer-selection-premium-selling');
  const [activePillar, setActivePillar] = useState('quality');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        {/* Return to Home Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-24 left-8 z-20">
          <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            Deep Research
          </span>
        </div>
        <div className="absolute top-24 right-8 z-20">
          <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            Podcast
          </span>
        </div>
        <div className="absolute bottom-8 right-8 z-20">
          <span className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            Options
          </span>
        </div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Layers className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">OptionAlpha Select</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <button onClick={() => scrollToSection('pillars')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">The 3 Pillars</button>
                <button onClick={() => scrollToSection('strategies')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Strategies</button>
                <button onClick={() => scrollToSection('research')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Research</button>
                <button onClick={() => scrollToSection('behavior')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Behavioral Edge</button>
                <button onClick={() => scrollToSection('screening')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Screening</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 opacity-80"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-6">
                Systematic Framework v2.0
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                The Dual Mandate of <span className="text-indigo-600">Premium Selling</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Sustainable success in option selling isn't about chasing the highest premiums. It requires a disciplined adherence to finding <strong>high-quality assets</strong> that also possess <strong>favorable option market characteristics</strong>.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button onClick={() => scrollToSection('pillars')} className="px-8 py-4 bg-indigo-600 text-white rounded-full font-medium shadow-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1 flex items-center">
                  Explore the Framework <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button onClick={() => scrollToSection('research')} className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-100 rounded-full font-medium hover:border-indigo-300 transition-all">
                  View Quantitative Data
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Infographic - Below Title */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img 
              src="https://i.imgur.com/zo6Tcpc.jpeg" 
              alt="OptionAlpha Select Framework Infographic" 
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* The Three Pillars Section */}
        <section id="pillars" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">The Three Foundational Pillars</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Successful underlyer selection rests on three non-negotiable characteristics. Missing even one introduces unacceptable portfolio risk.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Pillar Navigation Buttons */}
              <button
                onClick={() => setActivePillar('quality')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  activePillar === 'quality' 
                    ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]' 
                    : 'border-slate-100 hover:border-blue-200 bg-white'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl ${
                  activePillar === 'quality' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
                } mb-4 shadow-sm`}>
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Asset Quality</h3>
                <p className="text-slate-600 text-sm">The "Willing to Own" Doctrine. The primary risk management tool against catastrophic loss.</p>
              </button>

              <button
                onClick={() => setActivePillar('liquidity')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  activePillar === 'liquidity' 
                    ? 'border-emerald-500 bg-emerald-50 shadow-md transform scale-[1.02]' 
                    : 'border-slate-100 hover:border-emerald-200 bg-white'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl ${
                  activePillar === 'liquidity' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-500'
                } mb-4 shadow-sm`}>
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Market Liquidity</h3>
                <p className="text-slate-600 text-sm">Ensuring efficient trade execution and preserving the ability to exit under stress.</p>
              </button>

              <button
                onClick={() => setActivePillar('volatility')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  activePillar === 'volatility' 
                    ? 'border-amber-500 bg-amber-50 shadow-md transform scale-[1.02]' 
                    : 'border-slate-100 hover:border-amber-200 bg-white'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl ${
                  activePillar === 'volatility' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-500'
                } mb-4 shadow-sm`}>
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Volatility Engine</h3>
                <p className="text-slate-600 text-sm">The source of premium: harnessing Time Decay (Theta) and Volatility Crush (Vega).</p>
              </button>
            </div>

            {/* Pillar Details Content Area */}
            <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-inner">
              {activePillar === 'quality' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center mb-8">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">Pillar 1: Fundamental Asset Quality</h3>
                      <p className="text-blue-700">Defense first: Surviving the worst-case scenario.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-500"/>
                        The "Willing to Own" Doctrine
                      </h4>
                      <p className="text-slate-700 mb-6 leading-relaxed">
                        Option selling strategies (CSPs, Wheel) are <strong>contingent stock-acquisition strategies</strong>. Upon assignment, the derivative vanishes, leaving you with a direct equity position. The primary risk is NOT assignment; the risk is owning a low-quality asset that continues to plummet toward zero.
                      </p>
                      <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm mb-6">
                        <h5 className="font-bold text-blue-900 mb-2 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-amber-500" /> Pro Tip: The "Sleep Test"
                        </h5>
                        <p className="text-slate-600 text-sm">
                          If you sold a Put and the market closed for 5 years tomorrow, would you be panicked if assigned the shares today? If yes, it fails the quality test.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-blue-500"/>
                        Key Metrics & Red Flags
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm">
                          <h5 className="font-semibold text-slate-900 mb-2">Green Lights (Ideal State)</h5>
                          <ul className="text-sm space-y-2 text-slate-600">
                            <li>• <strong>Market Cap:</strong> {'>'}$10B (Blue Chip Stability)</li>
                            <li>• <strong>Earnings:</strong> Consistent, positive P/E history</li>
                            <li>• <strong>Beta:</strong> 0.8 - 1.2 (Tracks market without insane swings)</li>
                            <li>• <strong>Sector Leader:</strong> Top 3 player in its industry</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-xl border-l-4 border-rose-500 shadow-sm">
                          <h5 className="font-semibold text-slate-900 mb-2">Red Flags (Automatic Disqualification)</h5>
                          <ul className="text-sm space-y-2 text-slate-600">
                            <li>• <strong>Biotech awaiting FDA:</strong> Binary event risk is too high.</li>
                            <li>• <strong>Meme Stocks:</strong> Disconnected from fundamentals.</li>
                            <li>• <strong>Recent IPOs ({'<'}6mo):</strong> Insufficient price discovery data.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePillar === 'liquidity' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center mb-8">
                    <div className="bg-emerald-100 p-3 rounded-full mr-4">
                      <Activity className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-900">Pillar 2: Options Market Liquidity</h3>
                      <p className="text-emerald-700">Minimizing "Slippage Tax" and ensuring maneuverability.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-emerald-500"/>
                        The "Hidden Tax" of Illiquidity
                      </h4>
                      <p className="text-slate-700 mb-6 leading-relaxed">
                        Liquidity is often ignored until it's desperately needed. In a market panic, liquidity dries up instantly. If you are in an illiquid underlying, bid-ask spreads can widen by 500%+, making it mathematically impossible to roll or close a position for a reasonable loss.
                      </p>
                      <div className="bg-emerald-50 p-4 rounded-xl border-l-4 border-emerald-500">
                        <p className="text-emerald-900 font-medium">
                          <strong>The 10% Rule:</strong> Never trade options where the bid-ask spread is {'>'}10% of the total premium. You are giving up too much edge to the market maker immediately upon entry.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-emerald-500"/>
                        Strict Thresholds
                      </h4>
                      <div className="overflow-hidden rounded-xl border border-emerald-200 shadow-sm">
                        <table className="min-w-full divide-y divide-emerald-200">
                          <thead className="bg-emerald-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">Metric</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">Minimum Requirement</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">Why it matters</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-emerald-100 bg-white">
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">Open Interest (OI)</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{'>'} 5,000 (Total chain)</td>
                              <td className="px-4 py-3 text-xs text-slate-500">Shows institutional participation.</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">Strike Volume</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{'>'} 500 contracts/day</td>
                              <td className="px-4 py-3 text-xs text-slate-500">Ensures you aren't the only one trading it.</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">Bid/Ask Spread</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{'<'} $0.10 (on {'>'}$3 premiums)</td>
                              <td className="px-4 py-3 text-xs text-slate-500">Minimizes immediate entry/exit loss.</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">Strike Density</td>
                              <td className="px-4 py-3 text-sm text-slate-600">$1 or $2.50 increments</td>
                              <td className="px-4 py-3 text-xs text-slate-500">Allows precise risk management rolling.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePillar === 'volatility' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center mb-8">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <TrendingUp className="h-8 w-8 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-amber-900">Pillar 3: The Volatility Engine</h3>
                      <p className="text-amber-700">Buying fear, selling hope: The mechanics of premium.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-amber-500"/>
                        Understanding IV Rank vs. IV Percentile
                      </h4>
                      <p className="text-slate-700 mb-4 leading-relaxed">
                        Implied Volatility (IV) is the market's forecast of future movement. It is mean-reverting. We want to sell when IV is historically high for that specific asset.
                      </p>
                      <ul className="space-y-3 mb-6 bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                        <li className="text-sm text-slate-700">
                          <strong className="text-amber-600 block">IV Rank (IVR):</strong>
                          Where current IV sits between its 52-week High and Low. Great for quick context.
                        </li>
                        <li className="text-sm text-slate-700 border-t border-slate-100 pt-2">
                          <strong className="text-amber-600 block">IV Percentile (IVP):</strong>
                          Percentage of days in the past year that IV was lower than today. More statistically robust than IVR.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-amber-500"/>
                        The "Richness" Test
                      </h4>
                      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-center mb-4">
                        <span className="block text-sm text-amber-800 uppercase font-semibold tracking-wider mb-2">Optimal Entry Zone</span>
                        <span className="block text-4xl font-extrabold text-amber-500 mb-2">IVR {'>'} 50%</span>
                        <p className="text-sm text-amber-700">
                          Selling when premium is "expensive" relative to its own history maximizes Vega credit.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border-l-4 border-rose-500 shadow-sm">
                        <h5 className="font-semibold text-rose-700 mb-1 flex items-center">
                          <AlertOctagon className="h-4 w-4 mr-1"/> The Earnings Trap
                        </h5>
                        <p className="text-xs text-slate-600">
                          IV is almost ALWAYS high before earnings. This is <strong>binary event risk</strong>, not standard volatility. Standard systematic selling avoids earnings weeks to avoid coin-flip outcomes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Strategy Profiles Section */}
        <section id="strategies" className="py-24 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Strategy-Specific Nuances</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                While the Three Pillars apply universally, each strategy requires specific fine-tuning of the selection criteria.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Put Writing Card */}
              <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 border-t-8 border-blue-500 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Cash-Secured Put</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-600 mb-6 text-sm">
                    Selling the obligation to buy shares at a strike price below current market value. You are paid to set a "limit order" to buy stock you want anyway.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex flex-col bg-slate-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Ideal Outlook</span>
                      <span className="font-medium text-slate-900">Neutral to Mildly Bullish</span>
                    </li>
                    <li className="flex flex-col bg-slate-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Standard Target</span>
                      <span className="font-medium text-slate-900">30-45 DTE | 0.30 Delta Strike</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-rose-50 p-4 rounded-xl text-sm text-rose-800 border border-rose-100 flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span><strong>Critical Failure Point:</strong> Chasing high IV on a stock you hate, then getting assigned when it crashes 50%.</span>
                </div>
              </div>

              {/* Call Writing Card */}
              <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 border-t-8 border-purple-500 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <PieChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Covered Call</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-600 mb-6 text-sm">
                    Selling the obligation to sell shares you already own at a higher price. Reduces cost basis while capping maximum potential upside.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex flex-col bg-slate-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Ideal Outlook</span>
                      <span className="font-medium text-slate-900">Neutral / Slow Grind Up</span>
                    </li>
                    <li className="flex flex-col bg-slate-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Standard Target</span>
                      <span className="font-medium text-slate-900">30-45 DTE | 0.30 Delta (OTM)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-sm text-purple-900 border border-purple-100 flex items-start">
                  <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span><strong>Management Tip:</strong> If the stock rallies hard, don't panic buy-to-close. Let it get called away and secure the max profit.</span>
                </div>
              </div>

              {/* Wheel Strategy Card */}
              <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 border-t-8 border-indigo-600 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">ADVANCED</div>
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <Repeat className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">The Wheel</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-600 mb-6 text-sm">
                    A continuous cycle: Sell Puts until assigned &rarr; Sell Covered Calls until called away &rarr; Repeat. Generates income from both sides of the trade.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex flex-col bg-slate-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Ideal Asset</span>
                      <span className="font-medium text-slate-900">Blue Chip, Dividend Payer, Low Beta</span>
                    </li>
                    <li className="flex flex-col bg-slate-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Why Quality Matters Most</span>
                      <span className="font-medium text-slate-900">You might hold the stock for months during the "Call" phase.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl text-sm text-slate-300 border border-slate-700 flex items-start">
                  <Shield className="h-5 w-5 mr-2 flex-shrink-0 text-indigo-400" />
                  <span>Requires the strictest adherence to Pillar 1. A "Wheel" on a meme stock often becomes just "bag holding".</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 font-medium text-sm mb-6">
                  <BarChart3 className="w-4 h-4 mr-2" /> Quantitative Validation
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">The Volatility Risk Premium (VRP)</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Academic and industry research confirms a persistent "edge" in markets: Implied Volatility (what you are paid for) consistently overstates subsequent Realized Volatility (what actually happens).
                </p>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Analysis of the <strong>Cboe S&P 500 PutWrite Index (PUT)</strong>—which mechanically sells at-the-money puts every month—reveals powerful long-term advantages over pure equity holding.
                </p>
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
                  <h4 className="font-bold text-violet-900 mb-4">Why does VRP exist?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-slate-700 text-sm">
                      <CheckCircle className="h-5 w-5 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Institutional Hedging:</strong> Large funds *must* buy puts to protect billions in assets. They are insensitive to price, creating persistent demand for "insurance" that sellers can provide.</span>
                    </li>
                    <li className="flex items-start text-slate-700 text-sm">
                      <CheckCircle className="h-5 w-5 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Behavioral Aversion:</strong> Humans overpay to avoid catastrophic outcomes (lottery ticket effect in reverse).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Research Data Viz */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Cboe PUT Index vs S&P 500 (SPY)</h3>
                <p className="text-center text-slate-500 text-sm mb-8">Historical Analysis (2007 - 2025)</p>
                <div className="space-y-10">
                  <div>
                    <div className="flex justify-between mb-3 text-sm font-medium items-end">
                      <span className="text-slate-700 flex items-center">
                        <Activity className="w-4 h-4 mr-1 text-slate-400"/> Annualized Volatility
                      </span>
                      <span className="text-emerald-600 text-xs bg-emerald-50 px-2 py-1 rounded-md">Lower is smoother ride</span>
                    </div>
                    <div className="h-12 flex w-full rounded-xl overflow-hidden bg-slate-100">
                      <div className="bg-violet-600 flex items-center justify-end pr-4 text-white font-bold transition-all" style={{width: '70%'}}>
                        10.9% (PUT)
                      </div>
                      <div className="bg-slate-400 flex items-center justify-end pr-4 text-white font-bold transition-all" style={{width: '30%'}}>
                        15.5% (SPY)
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3 text-sm font-medium items-end">
                      <span className="text-slate-700 flex items-center">
                        <AlertOctagon className="w-4 h-4 mr-1 text-slate-400"/> Maximum Drawdown (Global Financial Crisis)
                      </span>
                      <span className="text-emerald-600 text-xs bg-emerald-50 px-2 py-1 rounded-md">Less negative is better</span>
                    </div>
                    <div className="h-12 flex w-full rounded-xl overflow-hidden relative bg-slate-100">
                      <div className="absolute right-0 top-0 h-full bg-slate-400 flex items-center justify-start pl-4 text-white font-bold" style={{width: '100%'}}>
                        -50.9% (SPY)
                      </div>
                      <div className="absolute right-0 top-0 h-full bg-violet-600 z-10 flex items-center justify-start pl-4 text-white font-bold shadow-[-4px_0_15px_rgba(0,0,0,0.2)]" style={{width: '64%'}}>
                        -32.7% (PUT)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                  <span className="inline-block bg-slate-100 rounded-full px-4 py-1 text-xs font-bold text-slate-600">KEY TAKEAWAY</span>
                  <p className="text-sm text-slate-700 mt-3 font-medium">
                    Premium selling sacrificed some upside during massive bull runs, but provided superior risk-adjusted returns (Sharpe Ratio) by significantly dampening portfolio volatility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Behavioral Edge Section */}
        <section id="behavior" className="py-20 bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <Brain className="h-8 w-8 mr-4 text-indigo-300" />
                  The Behavioral Edge
                </h2>
                <p className="text-indigo-100 text-lg leading-relaxed mb-6">
                  Systematic underlyer selection doesn't just find good stocks; it protects you from your own worst instincts. The greatest threat to a premium seller is <strong>"Yield Reaching"</strong>—ignoring quality red flags because the premium on a volatile, terrible stock looks juicy.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start bg-indigo-800/50 p-4 rounded-xl border border-indigo-700">
                    <AlertTriangle className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" />
                    <span><strong>The "Gambler's Ruin":</strong> Trading meme stocks with 200% IV works until it doesn't. One gap-down can wipe out 12 months of small wins.</span>
                  </li>
                  <li className="flex items-start bg-indigo-800/50 p-4 rounded-xl border border-indigo-700">
                    <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0" />
                    <span><strong>The Systematic Advantage:</strong> By forcing every trade through the Quality Filter *first*, you mathematically eliminate the possibility of holding a zero-value asset.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-indigo-700/50 text-center">
                <h3 className="text-xl font-semibold mb-6">The Vicious Cycle of Yield Reaching</h3>
                <div className="space-y-4">
                  <div className="bg-rose-500/20 p-3 rounded-lg text-rose-200">
                    1. Screen for highest IV (ignoring quality)
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="transform rotate-90 text-indigo-400" />
                  </div>
                  <div className="bg-rose-500/30 p-3 rounded-lg text-rose-200">
                    2. Sell Puts on risky Biotech/Meme stock
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="transform rotate-90 text-indigo-400" />
                  </div>
                  <div className="bg-rose-500/40 p-3 rounded-lg text-rose-100 font-bold">
                    3. Bad news hits. Stock drops 60% overnight.
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="transform rotate-90 text-indigo-400" />
                  </div>
                  <div className="bg-rose-500/50 p-3 rounded-lg text-white font-bold border-2 border-rose-500">
                    4. Permanent Loss of Capital. Game Over.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screening Framework Section */}
        <section id="screening" className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Systematic Screening Framework</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                The professional "Quality-First" funnel approach. Notice that we only look at volatility *after* quality is assured.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Funnel Steps */}
              <div className="max-w-xl">
                {/* Step 1 */}
                <div className="relative pl-16 pb-12 group">
                  <div className="absolute left-6 top-0 h-full w-1 bg-indigo-100 group-last:hidden"></div>
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xl shadow-lg shadow-indigo-200">
                    1
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-50">
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">The "Safe Universe" Filter</h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      We start with 5,000+ stocks and immediately discard 90% of them. We only want grown-up companies with real option markets.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">Mkt Cap {'>'} $10B</span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">Daily Opt Vol {'>'} 5k</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">Pos Net Income</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-16 pb-12 group">
                  <div className="absolute left-6 top-0 h-full w-1 bg-amber-100 group-last:hidden"></div>
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-xl shadow-lg shadow-amber-200">
                    2
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-50">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">The "Opportunity" Scan</h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      Now that we have a list of ~200 safe stocks, which ones are currently "on sale" (high premiums)?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">IV Rank {'>'} 50%</span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">RSI {'<'} 30 (Oversold)</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative pl-16 group">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white font-bold text-xl shadow-lg shadow-slate-200">
                    3
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">The Human Review</h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      Computers find the candidates; humans make the final "sanity check".
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg text-sm font-medium text-slate-700 border-l-4 border-slate-400">
                      "Is there a pending news event (lawsuit, FDA ruling, merger) that explains the high IV?" If yes, SKIP IT.
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-Flight Checklist */}
              <div className="bg-slate-900 text-slate-200 p-8 rounded-[2rem] shadow-2xl flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-emerald-400" />
                  Pre-Trade Checklist
                </h3>
                <p className="text-slate-400 mb-6">Never execute a trade without ticking these boxes.</p>
                <div className="space-y-4">
                  <label className="flex items-center p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 bg-slate-700 border-slate-600" />
                    <span className="ml-3 font-medium">Asset Quality: Am I truly okay owning this for 2 years?</span>
                  </label>
                  <label className="flex items-center p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 bg-slate-700 border-slate-600" />
                    <span className="ml-3 font-medium">Earnings: Confirmed NO earnings in next 45 days?</span>
                  </label>
                  <label className="flex items-center p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 bg-slate-700 border-slate-600" />
                    <span className="ml-3 font-medium">Liquidity: Is the Bid/Ask spread {'<'} $0.10?</span>
                  </label>
                  <label className="flex items-center p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 bg-slate-700 border-slate-600" />
                    <span className="ml-3 font-medium">Sizing: Is max risk {'<'} 5% of my total account?</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-950 py-16 text-center border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Layers className="h-12 w-12 text-indigo-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">OptionAlpha Select</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              A disciplined, systematic framework for premium selling based on quantitative and fundamental research. Designed for longevity, not get-rich-quick schemes.
            </p>
            <div className="pt-8 border-t border-slate-900 text-slate-600 text-sm flex flex-col gap-2">
              <p>Based on "Systematic Underlyer Selection for Premium-Selling Strategies" Report</p>
              <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
