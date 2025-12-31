'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, Clock, Activity, ShieldAlert, Scale, AlertTriangle, CheckCircle, BookOpen, Zap, Layers, BarChart2, ArrowRightLeft, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function ShortVolatilityGuide() {
  const currentArticle = articles.find(article => article.slug === 'mastering-short-volatility-straddles-strangles-systematic-premium-collection');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const Section = ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <section id={id} className="mb-12">
      {children}
    </section>
  );

  const SubHeading = ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h2 id={id} className="text-3xl font-bold text-gray-900 mb-6 mt-12">
      {children}
    </h2>
  );

  const SubSubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
      {children}
    </h3>
  );

  return (
    <>
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug!} 
          />
        </>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 py-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-20 left-4 z-40">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Deep Research
          </span>
        </div>

        <div className="absolute top-20 right-4 z-40">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            Options
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Mastering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Short Volatility</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                A quantitative approach to Straddles and Strangles. Profit from market fear, time decay, and the volatility risk premium.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>November 21, 2025</span>
                <span>•</span>
                <span>Systematic Premium Collection</span>
                <span>•</span>
                <span>Advanced Options Strategy</span>
              </div>
            </div>
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
                alt="Short Volatility Strategy Infographic" 
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
            alt="Short Volatility Strategy Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">

            {/* Section 1: Theory */}
            <Section id="theory">
              <SubHeading id="section-theory">The Theoretical Framework</SubHeading>
              
              <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-violet-800 text-lg mb-3">Foundations</h4>
                <p className="text-violet-900">
                  Short volatility is not just betting on price stability; it's harvesting the <strong>Volatility Risk Premium (VRP)</strong>.
                </p>
              </div>

              <SubSubHeading>Volatility as an Asset Class</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                The core edge comes from the <strong>Volatility Risk Premium (VRP)</strong>: the statistical tendency for Implied Volatility (IV) to overstate subsequent Realized Volatility (RV). Option sellers act as insurers, collecting premium from risk-averse buyers willing to overpay for protection against adverse moves.
              </p>

              <SubSubHeading>The Profit Engines</SubSubHeading>
              <div className="bg-indigo-600 text-white p-8 rounded-xl mb-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 text-indigo-200" />
                    <span><strong>Negative Vega (-ν):</strong> Profits when market fear (IV) subsides. Crucial for "IV Crush" post-events.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 text-indigo-200" />
                    <span><strong>Positive Theta (+θ):</strong> Profits from the inexorable passage of time. Decay accelerates in the final 30-45 days.</span>
                  </li>
                </ul>
              </div>

              <SubSubHeading>The Greeks Profile</SubSubHeading>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-blue-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Scale className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Delta <span className="text-slate-400 font-serif italic">(Δ)</span></h3>
                  </div>
                  <p className="text-slate-600 mb-4">Measures directional bias. Initially neutral (≈0) for centered straddles/strangles.</p>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <span className="font-semibold text-blue-700">Key Risk:</span> <span className="text-blue-900">Becomes directional as price moves away from center.</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-rose-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Gamma <span className="text-slate-400 font-serif italic">(Γ)</span></h3>
                  </div>
                  <p className="text-slate-600 mb-4">Measures rate of delta change. Accelerating, non-linear risk.</p>
                  <div className="bg-rose-50 p-3 rounded-lg text-sm">
                    <span className="font-semibold text-rose-700">Key Risk:</span> <span className="text-rose-900">Large moves cause losses to mount exponentially.</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-emerald-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Theta <span className="text-slate-400 font-serif italic">(θ)</span></h3>
                  </div>
                  <p className="text-slate-600 mb-4">Time decay. The primary passive profit driver for option sellers.</p>
                  <div className="bg-emerald-50 p-3 rounded-lg text-sm">
                    <span className="font-semibold text-emerald-700">Key Risk:</span> <span className="text-emerald-900">Decay may not be fast enough to offset adverse price moves.</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-violet-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
                      <TrendingDown className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Vega <span className="text-slate-400 font-serif italic">(ν)</span></h3>
                  </div>
                  <p className="text-slate-600 mb-4">Sensitivity to IV changes. Short vol benefits when IV drops.</p>
                  <div className="bg-violet-50 p-3 rounded-lg text-sm">
                    <span className="font-semibold text-violet-700">Key Risk:</span> <span className="text-violet-900">Sharp IV expansion (panic) causes rapid, mark-to-market losses.</span>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 2: Anatomy */}
            <Section id="anatomy">
              <SubHeading id="section-anatomy">Straddle vs. Strangle: Anatomy of the Strategies</SubHeading>
              
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-emerald-800 text-lg mb-3">Mechanics</h4>
                <p className="text-emerald-900">
                  Choosing between maximum reward (Straddle) and higher probability (Strangle).
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-indigo-500">
                  <h3 className="text-xl font-bold text-indigo-900 mb-2">Short Straddle</h3>
                  <p className="text-slate-600 mb-4">Sell Call + Sell Put at the <strong>same strike (ATM)</strong>.</p>
                  <ul className="text-sm space-y-2 text-slate-500">
                    <li>• Max extrinsic value collected.</li>
                    <li>• Highest Gamma risk.</li>
                    <li>• Breakevens: Strike ± Total Premium.</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500">
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">Short Strangle</h3>
                  <p className="text-slate-600 mb-4">Sell OTM Call + Sell OTM Put at <strong>different strikes</strong>.</p>
                  <ul className="text-sm space-y-2 text-slate-500">
                    <li>• Wider profit zone (between strikes).</li>
                    <li>• Lower capital efficiency, higher win rate.</li>
                    <li>• Breakevens: Call Strike + Premium / Put Strike - Premium.</li>
                  </ul>
                </div>
              </div>

              <SubSubHeading>Comparison Table</SubSubHeading>
              <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Feature</th>
                      <th className="p-4 text-sm font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50/50">Short Straddle</th>
                      <th className="p-4 text-sm font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50/50">Short Strangle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Strike Prices</td>
                      <td className="p-4 text-slate-600 bg-indigo-50/10">Same strike (ATM)</td>
                      <td className="p-4 text-slate-600 bg-emerald-50/10">Different strikes (OTM)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Premium Collected</td>
                      <td className="p-4 text-slate-600 bg-indigo-50/10 font-semibold">Higher</td>
                      <td className="p-4 text-slate-600 bg-emerald-50/10">Lower</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Max Profit Zone</td>
                      <td className="p-4 text-slate-600 bg-indigo-50/10">Single point (Strike Price)</td>
                      <td className="p-4 text-slate-600 bg-emerald-50/10 font-semibold">Wider Range (Between strikes)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Probability of Profit</td>
                      <td className="p-4 text-slate-600 bg-indigo-50/10">Lower</td>
                      <td className="p-4 text-slate-600 bg-emerald-50/10 font-semibold">Higher</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Gamma Risk</td>
                      <td className="p-4 text-rose-600 bg-indigo-50/10 font-medium">Highest (at initiation)</td>
                      <td className="p-4 text-slate-600 bg-emerald-50/10">Lower</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Section 3: Optimal Conditions */}
            <Section id="conditions">
              <SubHeading id="section-conditions">Optimal Conditions for Deployment</SubHeading>
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-amber-800 text-lg mb-3">Strategy</h4>
                <p className="text-amber-900">
                  Deploying when the statistical edge is at its peak.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-3">High IV Rank</h3>
                  <p className="text-amber-800">Sell when options are historically expensive. High IV means richer premiums and wider breakeven points, increasing margin for error.</p>
                </div>

                <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                    <Activity className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-3">Binary Events (IV Crush)</h3>
                  <p className="text-amber-800">Earnings or FDA announcements cause peak uncertainty. Selling <em>before</em> the event to capture the rapid post-event IV collapse.</p>
                </div>

                <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-3">Range-Bound Markets</h3>
                  <p className="text-amber-800">Ideal for post-event consolidation or established technical ranges. Allows Theta to decay while price oscillates between strikes.</p>
                </div>
              </div>
            </Section>

            {/* Section 4: Execution & Risk */}
            <Section id="execution">
              <SubHeading id="section-execution">Execution & Position Sizing</SubHeading>
              
              <div className="bg-slate-900 text-slate-300 p-8 rounded-xl mb-8">
                <div className="text-center mb-8">
                  <span className="inline-block py-1 px-3 rounded-full text-sm font-semibold bg-indigo-900 text-indigo-300 mb-4">Risk Management</span>
                  <p className="text-lg text-slate-400">Undefined risk requires defined discipline. Position sizing is non-negotiable.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Layers className="mr-3 text-indigo-400" /> Trade Setup
                    </h3>
                    <ul className="space-y-6">
                      <li className="bg-slate-800 p-4 rounded-xl border-l-4 border-indigo-500">
                        <strong className="text-white block mb-1">Expiration Cycle:</strong>
                        30-45 Days (DTE). The "sweet spot" where theta acceleration begins, but enough time remains to manage tested positions.
                      </li>
                      <li className="bg-slate-800 p-4 rounded-xl border-l-4 border-emerald-500">
                        <strong className="text-white block mb-1">Strangle Strike Selection:</strong>
                        Use Delta. Selling the <strong>16 Delta</strong> call and put creates a ~68% probability of success (1 Standard Deviation move).
                      </li>
                      <li className="bg-slate-800 p-4 rounded-xl border-l-4 border-rose-500">
                        <strong className="text-white block mb-1">Profit Taking:</strong>
                        Don't hold to expiration. Close at <strong>25% profit</strong> for straddles, <strong>50% profit</strong> for strangles to improve win rate and velocity of capital.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <ShieldAlert className="mr-3 text-rose-400" /> Position Sizing Rules
                    </h3>
                    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-sm">
                      <table className="min-w-full divide-y divide-slate-700">
                        <thead className="bg-slate-800 text-white">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Account Size</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Risk Profile</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Allocation</th>
                          </tr>
                        </thead>
                        <tbody className="bg-slate-900 divide-y divide-slate-800">
                          <tr className="bg-slate-800/50">
                            <td rowSpan={3} className="px-4 py-3 font-medium text-white align-top">&lt; $20,000</td>
                            <td className="px-4 py-2 text-slate-300">Conservative</td>
                            <td className="px-4 py-2 font-medium text-indigo-400">3% - 5%</td>
                          </tr>
                          <tr className="bg-slate-800/50">
                            <td className="px-4 py-2 text-slate-300">Moderate</td>
                            <td className="px-4 py-2 font-medium text-indigo-400">5% - 8%</td>
                          </tr>
                          <tr className="bg-slate-800/50">
                            <td className="px-4 py-2 text-slate-300">Aggressive</td>
                            <td className="px-4 py-2 font-medium text-indigo-400">8% - 10%+</td>
                          </tr>
                          <tr>
                            <td rowSpan={3} className="px-4 py-3 font-medium text-white align-top">$20k - $100k</td>
                            <td className="px-4 py-2 text-slate-300">Conservative</td>
                            <td className="px-4 py-2 font-medium text-emerald-400">1% - 3%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-slate-300">Moderate</td>
                            <td className="px-4 py-2 font-medium text-emerald-400">3% - 5%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-slate-300">Aggressive</td>
                            <td className="px-4 py-2 font-medium text-emerald-400">5% - 7%</td>
                          </tr>
                          <tr className="bg-slate-800/50">
                            <td rowSpan={3} className="px-4 py-3 font-medium text-white align-top">&gt; $100,000</td>
                            <td className="px-4 py-2 text-slate-300">Conservative</td>
                            <td className="px-4 py-2 font-medium text-slate-300">&lt; 1%</td>
                          </tr>
                          <tr className="bg-slate-800/50">
                            <td className="px-4 py-2 text-slate-300">Moderate</td>
                            <td className="px-4 py-2 font-medium text-slate-300">1% - 3%</td>
                          </tr>
                          <tr className="bg-slate-800/50">
                            <td className="px-4 py-2 text-slate-300">Aggressive</td>
                            <td className="px-4 py-2 font-medium text-slate-300">3% - 5%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4 text-sm text-slate-500 italic text-center">*Allocation refers to buying power/margin required.</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 5: Adjustments */}
            <Section id="adjustments">
              <SubHeading id="section-adjustments">Managing Challenged Positions</SubHeading>
              
              <div className="bg-rose-50 border-l-4 border-rose-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-rose-800 text-lg mb-3">Defense</h4>
                <p className="text-rose-900">
                  Don't just 'fix' losing trades. Manage delta and risk.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-indigo-500">
                  <h4 className="font-bold text-lg mb-3 flex items-center">
                    <ArrowRightLeft className="h-5 w-5 mr-2 text-indigo-500"/> Roll Untested Leg
                  </h4>
                  <p className="text-slate-600 text-sm mb-4">Underlying moves up? Roll the PUT up closer to the current price.</p>
                  <ul className="text-sm text-slate-500 list-disc list-inside">
                    <li>Collects more credit (widens breakevens).</li>
                    <li>Cuts positive delta to re-center position neutrality.</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-emerald-500">
                  <h4 className="font-bold text-lg mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-emerald-500"/> Roll Forward (Time)
                  </h4>
                  <p className="text-slate-600 text-sm mb-4">Running out of time? Roll the entire position to the next monthly cycle.</p>
                  <ul className="text-sm text-slate-500 list-disc list-inside">
                    <li>Gives the trade more time to be right.</li>
                    <li>Usually done for a net credit.</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-rose-500">
                  <h4 className="font-bold text-lg mb-3 flex items-center">
                    <ShieldAlert className="h-5 w-5 mr-2 text-rose-500"/> Go Defined Risk
                  </h4>
                  <p className="text-slate-600 text-sm mb-4">Too much heat? Buy further OTM wings to cap maximum loss.</p>
                  <ul className="text-sm text-slate-500 list-disc list-inside">
                    <li>Converts Strangle to Iron Condor.</li>
                    <li>Converts Straddle to Iron Butterfly.</li>
                    <li>Stops the bleeding at a known level.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-100 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-rose-100 text-rose-600 rounded-full">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-900 mb-2">Advanced: "Legging In" Risks</h3>
                  <p className="text-rose-800 leading-relaxed">
                    Executing legs separately to time short-term moves for a better cost basis often increases risk without adequate compensation. It turns a non-directional volatility trade temporarily into a naked directional bet. Generally considered <strong>impractical</strong> for systematic trading.
                  </p>
                </div>
              </div>
            </Section>

            {/* Deep Research Section */}
            <Section id="deep-research">
              <SubHeading id="section-deep-research">Deep Research: Academic Foundations & Market Microstructure</SubHeading>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg shadow-sm">
                <h4 className="font-bold text-purple-800 text-xl mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Deep Research Paper: The Volatility Risk Premium
                </h4>
                <p className="text-lg text-purple-900 mb-4">
                  Academic research findings and theoretical models that underpin short volatility strategies, providing institutional-grade insights into the structural edge of premium selling.
                </p>
              </div>

              <SubSubHeading>The Volatility Risk Premium: Empirical Evidence</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Volatility Risk Premium (VRP) represents one of the most robust and persistent anomalies in financial markets. Academic research consistently demonstrates that implied volatility (IV) systematically exceeds realized volatility (RV) across asset classes, time periods, and market regimes. This premium exists because market participants are willing to pay for insurance against adverse price movements, creating a structural advantage for option sellers.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Studies by Carr and Wu (2009) quantified the VRP in equity index options, finding that selling one-month at-the-money straddles on the S&P 500 generated positive returns in approximately 70% of months over a 20-year period. The average annualized return from this strategy exceeded 10%, though with significant tail risk during market crashes.
              </p>

              <SubSubHeading>Market Microstructure: Why the Premium Exists</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                The persistence of the VRP is explained by several behavioral and structural factors:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 ml-4">
                <li><strong>Loss Aversion:</strong> Kahneman and Tversky's prospect theory demonstrates that investors feel losses more acutely than equivalent gains, leading to overpayment for downside protection.</li>
                <li><strong>Crash-o-phobia:</strong> The left-tail skew in equity returns creates persistent demand for put options, driving up their prices relative to statistical expectations.</li>
                <li><strong>Hedging Demand:</strong> Institutional portfolio managers face career risk and regulatory requirements that mandate hedging, creating inelastic demand for options regardless of price.</li>
                <li><strong>Leverage Constraints:</strong> Many investors cannot access leverage directly, so they use options as a levered bet, accepting negative expected value for the embedded leverage.</li>
              </ul>

              <SubSubHeading>Gamma Risk and Tail Events</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                While the VRP provides a positive expected return, short volatility strategies are exposed to significant gamma risk—the non-linear acceleration of losses during large price moves. The distribution of returns exhibits negative skewness and excess kurtosis, meaning that losses, when they occur, can be catastrophic.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                The February 2018 "Volmageddon" event serves as a cautionary tale. The VIX spiked from 13 to 37 in a single day, causing the XIV ETN (which was short VIX futures) to lose 96% of its value and ultimately be liquidated. This event demonstrated that short volatility strategies can experience "picking up pennies in front of a steamroller" dynamics if not properly sized and managed.
              </p>

              <SubSubHeading>Optimal Implementation: Academic Insights</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                Research by Israelov and Nielsen (2015) examined optimal implementation of short volatility strategies and found several key insights:
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <ul className="space-y-3 text-gray-800">
                  <li><strong>Delta-Hedging:</strong> Continuously delta-hedging short options positions can reduce drawdowns by 40-50% while maintaining 70-80% of the gross returns.</li>
                  <li><strong>Strike Selection:</strong> Selling 16-delta options (approximately 1 standard deviation OTM) provides the optimal risk-reward tradeoff, balancing premium collection with probability of profit.</li>
                  <li><strong>Tenor Selection:</strong> The 30-45 day expiration window maximizes theta decay per unit of gamma risk, as time decay accelerates while maintaining sufficient time to manage positions.</li>
                  <li><strong>Position Sizing:</strong> Kelly Criterion analysis suggests allocating no more than 5-10% of portfolio risk to short volatility strategies to avoid ruin risk.</li>
                </ul>
              </div>

              <SubSubHeading>Behavioral Finance Perspective</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                From a behavioral finance perspective, short volatility strategies exploit several cognitive biases:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 ml-4">
                <li><strong>Recency Bias:</strong> After periods of low volatility, investors underestimate the probability of volatility spikes, creating opportunities to sell overpriced options.</li>
                <li><strong>Availability Heuristic:</strong> Recent market crashes remain salient in investors' minds, causing them to overpay for protection even when statistical probabilities don't justify the premium.</li>
                <li><strong>Myopic Loss Aversion:</strong> Investors evaluate their portfolios too frequently, leading to excessive hedging and creating opportunities for patient option sellers.</li>
              </ul>

              <SubSubHeading>Future Research Directions</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                Current research is exploring several frontiers in short volatility strategies:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 ml-4">
                <li><strong>Machine Learning Applications:</strong> Using ML to predict optimal entry and exit points based on volatility regime classification.</li>
                <li><strong>Cross-Asset Diversification:</strong> Implementing short volatility strategies across equities, commodities, and currencies to reduce correlation risk.</li>
                <li><strong>Dynamic Position Sizing:</strong> Adjusting exposure based on realized volatility, VIX term structure, and other market indicators.</li>
                <li><strong>Tail Risk Hedging:</strong> Combining short volatility with long-dated OTM puts to cap maximum losses while preserving most of the premium collection.</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-yellow-800 text-lg mb-3">Research Disclaimer</h4>
                <p className="text-yellow-900">
                  The academic research presented here is for educational purposes and represents ongoing areas of study. Market conditions, regulations, and trading technologies continue to evolve, potentially affecting the applicability of historical research findings. Past performance of short volatility strategies does not guarantee future results, and tail risk events can cause catastrophic losses despite positive long-term expected returns.
                </p>
              </div>
            </Section>

            {/* Google Doc Link */}
            {currentArticle?.googleDoc && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-12 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">📄 Full Research Document</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Access the complete quantitative analysis and detailed research behind this article.
                </p>
                <div className="text-center">
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <BookOpen className="inline mr-2" />
                    Read Full Research Paper
                  </a>
                </div>
              </div>
            )}

            {/* Educational Disclaimer */}
            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 my-8 rounded-r-lg">
              <h4 className="font-bold text-gray-800 text-lg mb-3">Educational Disclaimer</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                This article is for educational and informational purposes only. Short volatility strategies involve substantial risk of loss and are not suitable for all investors. Options trading carries significant risks, including the potential for unlimited losses in certain strategies. The content presented here does not constitute financial advice, and readers should consult with qualified financial professionals before implementing any trading strategies. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 py-12 text-center text-slate-500">
          <div className="max-w-7xl mx-auto px-4">
            <Activity className="h-8 w-8 text-indigo-500 mx-auto mb-4" />
            <p className="mb-4 font-medium text-slate-400">"Markets can remain irrational longer than you can remain solvent." — Keynes</p>
            <p className="text-sm">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
