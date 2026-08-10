'use client';

import React, { useState } from 'react';
import { BookOpen, TrendingUp, Shield, Activity, Layers, BarChart3, ArrowRight, CheckCircle, AlertTriangle, PieChart, DollarSign, Repeat, AlertOctagon, Target, Zap, Brain, HelpCircle } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function OptionAlphaSelectArticle() {
  const [activePillar, setActivePillar] = useState('quality');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ArticleFrame slug="optionalpha-select-systematic-underlyer-selection-premium-selling">
      <div className="max-w-4xl mx-auto mb-16 px-6">
        <InfographicSlot alt="OptionAlpha Select Framework Infographic" />
      </div>

      <div className="w-full">
        {/* The Three Pillars Section */}
        <section id="pillars" className="py-24 bg-white dark:bg-[#0A0D14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl font-serif">The Three Foundational Pillars</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Successful underlyer selection rests on three non-negotiable characteristics. Missing even one introduces unacceptable portfolio risk.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Pillar Navigation Buttons */}
              <button
                onClick={() => setActivePillar('quality')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  activePillar === 'quality' 
                    ? 'border-blue-500 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 shadow-md transform scale-[1.02]' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-blue-200 bg-white dark:bg-[#0A0D14]'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl ${
                  activePillar === 'quality' ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white' : 'bg-[#A8672E] dark:bg-[#D08F52] text-[#A8672E] dark:text-[#D08F52]'
                } mb-4 shadow-sm`}>
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">Asset Quality</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">The "Willing to Own" Doctrine. The primary risk management tool against catastrophic loss.</p>
              </button>

              <button
                onClick={() => setActivePillar('liquidity')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  activePillar === 'liquidity' 
                    ? 'border-emerald-500 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 shadow-md transform scale-[1.02]' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-emerald-200 bg-white dark:bg-[#0A0D14]'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl ${
                  activePillar === 'liquidity' ? 'bg-[#1D8A70] dark:bg-[#3CBF9C] text-white' : 'bg-[#1D8A70] dark:bg-[#3CBF9C] text-[#1D8A70] dark:text-[#3CBF9C]'
                } mb-4 shadow-sm`}>
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">Market Liquidity</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Ensuring efficient trade execution and preserving the ability to exit under stress.</p>
              </button>

              <button
                onClick={() => setActivePillar('volatility')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  activePillar === 'volatility' 
                    ? 'border-amber-500 bg-amber-50 shadow-md transform scale-[1.02]' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-amber-200 bg-white dark:bg-[#0A0D14]'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl ${
                  activePillar === 'volatility' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-500'
                } mb-4 shadow-sm`}>
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">Volatility Engine</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">The source of premium: harnessing Time Decay (Theta) and Volatility Crush (Vega).</p>
              </button>
            </div>

            {/* Pillar Details Content Area */}
            <div className="bg-slate-50 dark:bg-[#14171B] rounded-[2rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-inner">
              {activePillar === 'quality' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center mb-8">
                    <div className="bg-[#A8672E] dark:bg-[#D08F52] p-3 rounded-full mr-4">
                      <Shield className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] font-serif">Pillar 1: Fundamental Asset Quality</h3>
                      <p className="text-[#A8672E] dark:text-[#D08F52]">Defense first: Surviving the worst-case scenario.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-[#A8672E] dark:text-[#D08F52]"/>
                        The "Willing to Own" Doctrine
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                        Option selling strategies (CSPs, Wheel) are <strong>contingent stock-acquisition strategies</strong>. Upon assignment, the derivative vanishes, leaving you with a direct equity position. The primary risk is NOT assignment; the risk is owning a low-quality asset that continues to plummet toward zero.
                      </p>
                      <div className="bg-white dark:bg-[#0A0D14] p-5 rounded-xl border border-blue-100 shadow-sm mb-6">
                        <h5 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-2 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-amber-500" /> Pro Tip: The "Sleep Test"
                        </h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          If you sold a Put and the market closed for 5 years tomorrow, would you be panicked if assigned the shares today? If yes, it fails the quality test.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-[#A8672E] dark:text-[#D08F52]"/>
                        Key Metrics & Red Flags
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm">
                          <h5 className="font-semibold text-slate-900 mb-2">Green Lights (Ideal State)</h5>
                          <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                            <li>• <strong>Market Cap:</strong> {'>'}$10B (Blue Chip Stability)</li>
                            <li>• <strong>Earnings:</strong> Consistent, positive P/E history</li>
                            <li>• <strong>Beta:</strong> 0.8 - 1.2 (Tracks market without insane swings)</li>
                            <li>• <strong>Sector Leader:</strong> Top 3 player in its industry</li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl border-l-4 border-rose-500 shadow-sm">
                          <h5 className="font-semibold text-slate-900 mb-2">Red Flags (Automatic Disqualification)</h5>
                          <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
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
                    <div className="bg-[#1D8A70] dark:bg-[#3CBF9C] p-3 rounded-full mr-4">
                      <Activity className="h-8 w-8 text-[#1D8A70] dark:text-[#3CBF9C]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] font-serif">Pillar 2: Options Market Liquidity</h3>
                      <p className="text-[#1D8A70] dark:text-[#3CBF9C]">Minimizing "Slippage Tax" and ensuring maneuverability.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-[#1D8A70] dark:text-[#3CBF9C]"/>
                        The "Hidden Tax" of Illiquidity
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                        Liquidity is often ignored until it's desperately needed. In a market panic, liquidity dries up instantly. If you are in an illiquid underlying, bid-ask spreads can widen by 500%+, making it mathematically impossible to roll or close a position for a reasonable loss.
                      </p>
                      <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-xl border-l-4 border-emerald-500">
                        <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-medium">
                          <strong>The 10% Rule:</strong> Never trade options where the bid-ask spread is {'>'}10% of the total premium. You are giving up too much edge to the market maker immediately upon entry.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-[#1D8A70] dark:text-[#3CBF9C]"/>
                        Strict Thresholds
                      </h4>
                      <div className="overflow-hidden rounded-xl border border-emerald-200 shadow-sm">
                        <table className="min-w-full divide-y divide-emerald-200">
                          <thead className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] uppercase tracking-wider">Metric</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] uppercase tracking-wider">Minimum Requirement</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] uppercase tracking-wider">Why it matters</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-emerald-100 bg-white dark:bg-[#0A0D14]">
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">Open Interest (OI)</td>
                              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{'>'} 5,000 (Total chain)</td>
                              <td className="px-4 py-3 text-xs text-slate-500">Shows institutional participation.</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">Strike Volume</td>
                              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{'>'} 500 contracts/day</td>
                              <td className="px-4 py-3 text-xs text-slate-500">Ensures you aren't the only one trading it.</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">Bid/Ask Spread</td>
                              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{'<'} $0.10 (on {'>'}$3 premiums)</td>
                              <td className="px-4 py-3 text-xs text-slate-500">Minimizes immediate entry/exit loss.</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">Strike Density</td>
                              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">$1 or $2.50 increments</td>
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
                      <h3 className="text-2xl font-bold text-amber-900 font-serif">Pillar 3: The Volatility Engine</h3>
                      <p className="text-amber-700">Buying fear, selling hope: The mechanics of premium.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-amber-500"/>
                        Understanding IV Rank vs. IV Percentile
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                        Implied Volatility (IV) is the market's forecast of future movement. It is mean-reverting. We want to sell when IV is historically high for that specific asset.
                      </p>
                      <ul className="space-y-3 mb-6 bg-white dark:bg-[#0A0D14] p-4 rounded-xl border border-amber-100 shadow-sm">
                        <li className="text-sm text-slate-700 dark:text-slate-300">
                          <strong className="text-amber-600 block">IV Rank (IVR):</strong>
                          Where current IV sits between its 52-week High and Low. Great for quick context.
                        </li>
                        <li className="text-sm text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2">
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
                      <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl border-l-4 border-rose-500 shadow-sm">
                        <h5 className="font-semibold text-[#BC4128] dark:text-[#E2694A] mb-1 flex items-center">
                          <AlertOctagon className="h-4 w-4 mr-1"/> The Earnings Trap
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
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
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl font-serif">Strategy-Specific Nuances</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                While the Three Pillars apply universally, each strategy requires specific fine-tuning of the selection criteria.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Put Writing Card */}
              <div className="bg-white dark:bg-[#0A0D14] rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 border-t-8 border-blue-500 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-[#A8672E] dark:bg-[#D08F52] p-3 rounded-full mr-4">
                    <DollarSign className="h-6 w-6 text-[#A8672E] dark:text-[#D08F52]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-serif">Cash-Secured Put</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                    Selling the obligation to buy shares at a strike price below current market value. You are paid to set a "limit order" to buy stock you want anyway.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex flex-col bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg">
                      <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider mb-1">Ideal Outlook</span>
                      <span className="font-medium text-slate-900">Neutral to Mildly Bullish</span>
                    </li>
                    <li className="flex flex-col bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg">
                      <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider mb-1">Standard Target</span>
                      <span className="font-medium text-slate-900">30-45 DTE | 0.30 Delta Strike</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-xl text-sm text-[#BC4128] dark:text-[#E2694A] border border-rose-100 flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span><strong>Critical Failure Point:</strong> Chasing high IV on a stock you hate, then getting assigned when it crashes 50%.</span>
                </div>
              </div>

              {/* Call Writing Card */}
              <div className="bg-white dark:bg-[#0A0D14] rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 border-t-8 border-purple-500 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <PieChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-serif">Covered Call</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                    Selling the obligation to sell shares you already own at a higher price. Reduces cost basis while capping maximum potential upside.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex flex-col bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg">
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Ideal Outlook</span>
                      <span className="font-medium text-slate-900">Neutral / Slow Grind Up</span>
                    </li>
                    <li className="flex flex-col bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg">
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
              <div className="bg-white dark:bg-[#0A0D14] rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 border-t-8 border-indigo-600 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 bg-[#A8672E] dark:bg-[#D08F52] text-white text-xs font-bold px-4 py-1 rounded-bl-xl">ADVANCED</div>
                <div className="flex items-center mb-6">
                  <div className="bg-[#A8672E] dark:bg-[#D08F52] p-3 rounded-full mr-4">
                    <Repeat className="h-6 w-6 text-[#A8672E] dark:text-[#D08F52]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-serif">The Wheel</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                    A continuous cycle: Sell Puts until assigned &rarr; Sell Covered Calls until called away &rarr; Repeat. Generates income from both sides of the trade.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex flex-col bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg">
                      <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider mb-1">Ideal Asset</span>
                      <span className="font-medium text-slate-900">Blue Chip, Dividend Payer, Low Beta</span>
                    </li>
                    <li className="flex flex-col bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg">
                      <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider mb-1">Why Quality Matters Most</span>
                      <span className="font-medium text-slate-900">You might hold the stock for months during the "Call" phase.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl text-sm text-slate-300 border border-slate-700 flex items-start">
                  <Shield className="h-5 w-5 mr-2 flex-shrink-0 text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Requires the strictest adherence to Pillar 1. A "Wheel" on a meme stock often becomes just "bag holding".</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-24 bg-white dark:bg-[#0A0D14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 font-medium text-sm mb-6">
                  <BarChart3 className="w-4 h-4 mr-2" /> Quantitative Validation
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif">The Volatility Risk Premium (VRP)</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Academic and industry research confirms a persistent "edge" in markets: Implied Volatility (what you are paid for) consistently overstates subsequent Realized Volatility (what actually happens).
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Analysis of the <strong>Cboe S&P 500 PutWrite Index (PUT)</strong>—which mechanically sells at-the-money puts every month—reveals powerful long-term advantages over pure equity holding.
                </p>
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
                  <h4 className="font-bold text-violet-900 mb-4">Why does VRP exist?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                      <CheckCircle className="h-5 w-5 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Institutional Hedging:</strong> Large funds *must* buy puts to protect billions in assets. They are insensitive to price, creating persistent demand for "insurance" that sellers can provide.</span>
                    </li>
                    <li className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                      <CheckCircle className="h-5 w-5 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Behavioral Aversion:</strong> Humans overpay to avoid catastrophic outcomes (lottery ticket effect in reverse).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Research Data Viz */}
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-2 text-center font-serif">Cboe PUT Index vs S&P 500 (SPY)</h3>
                <p className="text-center text-slate-500 text-sm mb-8">Historical Analysis (2007 - 2025)</p>
                <div className="space-y-10">
                  <div>
                    <div className="flex justify-between mb-3 text-sm font-medium items-end">
                      <span className="text-slate-700 dark:text-slate-300 flex items-center">
                        <Activity className="w-4 h-4 mr-1 text-slate-400"/> Annualized Volatility
                      </span>
                      <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-xs bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 px-2 py-1 rounded-md">Lower is smoother ride</span>
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
                      <span className="text-slate-700 dark:text-slate-300 flex items-center">
                        <AlertOctagon className="w-4 h-4 mr-1 text-slate-400"/> Maximum Drawdown (Global Financial Crisis)
                      </span>
                      <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-xs bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 px-2 py-1 rounded-md">Less negative is better</span>
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
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                  <span className="inline-block bg-slate-100 rounded-full px-4 py-1 text-xs font-bold text-slate-600 dark:text-slate-400">KEY TAKEAWAY</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 font-medium">
                    Premium selling sacrificed some upside during massive bull runs, but provided superior risk-adjusted returns (Sharpe Ratio) by significantly dampening portfolio volatility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Behavioral Edge Section */}
        <section id="behavior" className="py-20 bg-[#A8672E] dark:bg-[#D08F52] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center font-serif">
                  <Brain className="h-8 w-8 mr-4 text-[#A8672E] dark:text-[#D08F52]" />
                  The Behavioral Edge
                </h2>
                <p className="text-[#A8672E] dark:text-[#D08F52] text-lg leading-relaxed mb-6">
                  Systematic underlyer selection doesn't just find good stocks; it protects you from your own worst instincts. The greatest threat to a premium seller is <strong>"Yield Reaching"</strong>—ignoring quality red flags because the premium on a volatile, terrible stock looks juicy.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start bg-[#A8672E] dark:bg-[#D08F52]/50 p-4 rounded-xl border border-indigo-700">
                    <AlertTriangle className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" />
                    <span><strong>The "Gambler's Ruin":</strong> Trading meme stocks with 200% IV works until it doesn't. One gap-down can wipe out 12 months of small wins.</span>
                  </li>
                  <li className="flex items-start bg-[#A8672E] dark:bg-[#D08F52]/50 p-4 rounded-xl border border-indigo-700">
                    <CheckCircle className="h-6 w-6 text-[#1D8A70] dark:text-[#3CBF9C] mr-3 flex-shrink-0" />
                    <span><strong>The Systematic Advantage:</strong> By forcing every trade through the Quality Filter *first*, you mathematically eliminate the possibility of holding a zero-value asset.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14]/10 p-8 rounded-3xl backdrop-blur-sm border border-indigo-700/50 text-center">
                <h3 className="text-xl font-semibold mb-6 font-serif">The Vicious Cycle of Yield Reaching</h3>
                <div className="space-y-4">
                  <div className="bg-[#BC4128] dark:bg-[#E2694A]/20 p-3 rounded-lg text-[#BC4128] dark:text-[#E2694A]">
                    1. Screen for highest IV (ignoring quality)
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="transform rotate-90 text-[#A8672E] dark:text-[#D08F52]" />
                  </div>
                  <div className="bg-[#BC4128] dark:bg-[#E2694A]/30 p-3 rounded-lg text-[#BC4128] dark:text-[#E2694A]">
                    2. Sell Puts on risky Biotech/Meme stock
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="transform rotate-90 text-[#A8672E] dark:text-[#D08F52]" />
                  </div>
                  <div className="bg-[#BC4128] dark:bg-[#E2694A]/40 p-3 rounded-lg text-[#BC4128] dark:text-[#E2694A] font-bold">
                    3. Bad news hits. Stock drops 60% overnight.
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="transform rotate-90 text-[#A8672E] dark:text-[#D08F52]" />
                  </div>
                  <div className="bg-[#BC4128] dark:bg-[#E2694A]/50 p-3 rounded-lg text-white font-bold border-2 border-rose-500">
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
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl font-serif">Systematic Screening Framework</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                The professional "Quality-First" funnel approach. Notice that we only look at volatility *after* quality is assured.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Funnel Steps */}
              <div className="max-w-xl">
                {/* Step 1 */}
                <div className="relative pl-16 pb-12 group">
                  <div className="absolute left-6 top-0 h-full w-1 bg-[#A8672E] dark:bg-[#D08F52] group-last:hidden"></div>
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white font-bold text-xl shadow-lg shadow-indigo-200">
                    1
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-indigo-50">
                    <h3 className="text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">The "Safe Universe" Filter</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                      We start with 5,000+ stocks and immediately discard 90% of them. We only want grown-up companies with real option markets.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#A8672E] dark:bg-[#D08F52] text-[#A8672E] dark:text-[#D08F52] rounded-full text-xs font-bold uppercase tracking-wider">Mkt Cap {'>'} $10B</span>
                      <span className="px-3 py-1 bg-[#1D8A70] dark:bg-[#3CBF9C] text-[#1D8A70] dark:text-[#3CBF9C] rounded-full text-xs font-bold uppercase tracking-wider">Daily Opt Vol {'>'} 5k</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold uppercase tracking-wider">Pos Net Income</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-16 pb-12 group">
                  <div className="absolute left-6 top-0 h-full w-1 bg-amber-100 group-last:hidden"></div>
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-xl shadow-lg shadow-amber-200">
                    2
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-amber-50">
                    <h3 className="text-xl font-bold text-amber-900 mb-2 font-serif">The "Opportunity" Scan</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
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
                  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">The Human Review</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                      Computers find the candidates; humans make the final "sanity check".
                    </p>
                    <div className="bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 border-l-4 border-slate-400">
                      "Is there a pending news event (lawsuit, FDA ruling, merger) that explains the high IV?" If yes, SKIP IT.
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-Flight Checklist */}
              <div className="bg-slate-900 text-slate-200 p-8 rounded-[2rem] shadow-2xl flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center font-serif">
                  <CheckCircle className="h-6 w-6 mr-3 text-[#1D8A70] dark:text-[#3CBF9C]" />
                  Pre-Trade Checklist
                </h3>
                <p className="text-slate-400 mb-6">Never execute a trade without ticking these boxes.</p>
                <div className="space-y-4">
                  <label className="flex items-center p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-[#A8672E] dark:text-[#D08F52] rounded focus:ring-indigo-500 bg-slate-700 border-slate-600" />
                    <span className="ml-3 font-medium">Asset Quality: Am I truly okay owning this for 2 years?</span>
                  </label>
                  <label className="flex items-center p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-[#A8672E] dark:text-[#D08F52] rounded focus:ring-indigo-500 bg-slate-700 border-slate-600" />
                    <span className="ml-3 font-medium">Earnings: Confirmed NO earnings in next 45 days?</span>
                  </label>
                  <label className="flex items-center p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-[#A8672E] dark:text-[#D08F52] rounded focus:ring-indigo-500 bg-slate-700 border-slate-600" />
                    <span className="ml-3 font-medium">Liquidity: Is the Bid/Ask spread {'<'} $0.10?</span>
                  </label>
                  <label className="flex items-center p-3 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-[#A8672E] dark:text-[#D08F52] rounded focus:ring-indigo-500 bg-slate-700 border-slate-600" />
                    <span className="ml-3 font-medium">Sizing: Is max risk {'<'} 5% of my total account?</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
