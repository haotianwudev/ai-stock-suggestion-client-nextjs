'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Shield, DollarSign, AlertTriangle, Activity, Clock, BarChart2, Target, CheckCircle, XCircle, BookOpen, ArrowRight, Info, Scale, Percent, Divide, Layers, CheckSquare, HelpCircle, MousePointer, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function VerticalDebitSpreads() {
  const currentArticle = articles.find(article => article.slug === 'vertical-debit-spreads-strategic-architecture-defined-risk-trading');
  const [activeScenario, setActiveScenario] = useState('A');
  const [mathTab, setMathTab] = useState('financials');
  const [checklistStep, setChecklistStep] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || 'vertical-debit-spreads-strategic-architecture-defined-risk-trading'} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="bg-white border-b border-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="max-w-6xl mx-auto px-6 py-24 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-8 border border-indigo-100 shadow-sm animate-fadeIn">
              <BookOpen size={16} />
              <span>Options Strategy Masterclass</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              Vertical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Debit Spreads</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              The strategic architecture of defined-risk trading. Stop gambling on naked options. Start financing your directional views with mathematical precision.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/yndWCwP.jpeg" 
              alt="Vertical Debit Spreads Strategy Infographic" 
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
              <MousePointer className="h-4 w-4" />
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
          src="https://i.imgur.com/yndWCwP.jpeg"
          alt="Vertical Debit Spreads Strategy Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-6xl mx-auto px-6 py-16 space-y-32">
          {/* Introduction Section */}
          <section className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Why Professionals Trade Spreads</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A vertical debit spread isn't just a hedge; it's a financing structure. You buy an expensive option to express a view, and you sell a cheaper option to someone else to pay for it. This reduces your cost basis and shifts the odds in your favor.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card icon={<Shield className="text-emerald-500" />} title="Defined Risk (Sleep Well)" color="emerald">
                Unlike naked puts (where you can lose if stock goes to zero) or short stock (unlimited loss), your max loss in a debit spread is strictly limited to the price you paid today.
              </Card>
              <Card icon={<Target className="text-blue-500" />} title="Probability Hack" color="blue">
                By selling the "lottery ticket" upside (the short leg), you lower your breakeven point. The stock doesn't need to move as far for you to profit compared to a naked call.
              </Card>
              <Card icon={<DollarSign className="text-amber-500" />} title="Capital Efficiency" color="amber">
                Buying a $500 Call option is expensive. Buying a spread might only cost $300. You sacrifice uncapped profit (which rarely happens) for a cheaper entry price.
              </Card>
            </div>
          </section>
          {/* Mechanics Section */}
          <section className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Layers size={200} />
            </div>
            <div className="p-8 md:p-12 relative z-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Layers className="text-indigo-600" />
                The Anatomy of the Trade
              </h2>
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Bull Call Spread */}
                <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100 relative group transition-all hover:shadow-lg hover:border-teal-200">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-teal-900 flex items-center gap-2">
                      <TrendingUp size={24} />
                      Bull Call Spread
                    </h3>
                    <div className="bg-teal-200 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Bullish Strategy
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-xl border border-teal-100 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-800">Step 1: Buy Call (Lower Strike)</span>
                        <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Delta ~0.70</span>
                      </div>
                      <p className="text-sm text-slate-500">Usually In-The-Money. This drives your profit as stock rises.</p>
                    </div>
                    <div className="flex justify-center text-teal-300">
                      <div className="h-6 w-0.5 bg-teal-200"></div>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl border border-teal-100 border-dashed relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-400"></div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-700">Step 2: Sell Call (Higher Strike)</span>
                        <span className="text-xs font-mono text-rose-500 bg-rose-50 px-2 py-1 rounded">Delta ~0.30</span>
                      </div>
                      <p className="text-sm text-slate-500">Usually Out-of-The-Money. You sell this to finance Step 1.</p>
                    </div>
                    <div className="pt-4 border-t border-teal-200 mt-4">
                      <div className="flex justify-between text-sm font-bold text-teal-900">
                        <span>Net Effect:</span>
                        <span>Pay a Debit</span>
                      </div>
                      <p className="text-xs text-teal-700 mt-1">You want the stock to go UP, but you don't care if it goes past your short strike.</p>
                    </div>
                  </div>
                </div>

                {/* Bear Put Spread */}
                <div className="bg-rose-50 rounded-2xl p-8 border border-rose-100 relative group transition-all hover:shadow-lg hover:border-rose-200">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-rose-900 flex items-center gap-2">
                      <TrendingDown size={24} />
                      Bear Put Spread
                    </h3>
                    <div className="bg-rose-200 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Bearish Strategy
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-800">Step 1: Buy Put (Higher Strike)</span>
                        <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Delta ~-0.70</span>
                      </div>
                      <p className="text-sm text-slate-500">Usually In-The-Money. Gains value as stock drops.</p>
                    </div>
                    <div className="flex justify-center text-rose-300">
                      <div className="h-6 w-0.5 bg-rose-200"></div>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl border border-rose-100 border-dashed relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-400"></div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-700">Step 2: Sell Put (Lower Strike)</span>
                        <span className="text-xs font-mono text-rose-500 bg-rose-50 px-2 py-1 rounded">Delta ~-0.30</span>
                      </div>
                      <p className="text-sm text-slate-500">Usually Out-of-The-Money. Limits your profit but subsidizes cost.</p>
                    </div>
                    <div className="pt-4 border-t border-rose-200 mt-4">
                      <div className="flex justify-between text-sm font-bold text-rose-900">
                        <span>Net Effect:</span>
                        <span>Pay a Debit</span>
                      </div>
                      <p className="text-xs text-rose-700 mt-1">You want the stock to go DOWN, but your profit stops at the short strike.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Mathematics of Advantage Section */}
          <section className="scroll-mt-24" id="mathematics">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-3 flex items-center gap-3 justify-center md:justify-start">
                <Scale className="text-indigo-600" size={36} />
                The Mathematics of Advantage
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl">
                Why professional traders prefer spreads over naked options. A detailed breakdown of cost, probability, and Greek sensitivity.
              </p>
            </div>

            {/* Navigation Tabs for Math Section */}
            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-slate-100 rounded-xl w-fit mx-auto md:mx-0">
              <MathTab active={mathTab === 'financials'} onClick={() => setMathTab('financials')} icon={<DollarSign size={18} />} label="Financial Comparison" />
              <MathTab active={mathTab === 'outcomes'} onClick={() => setMathTab('outcomes')} icon={<Target size={18} />} label="Outcome Matrix" />
              <MathTab active={mathTab === 'greeks'} onClick={() => setMathTab('greeks')} icon={<Activity size={18} />} label="The Greeks Edge" />
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
              {/* TAB 1: FINANCIAL COMPARISON */}
              {mathTab === 'financials' && (
                <div className="animate-fadeIn p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-slate-100 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">Cost Basis Analysis</h3>
                      <p className="text-slate-500 mt-1">Hypothetical: Stock XYZ @ $100</p>
                    </div>
                    <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold border border-indigo-100 self-start">
                      Comparing: Long Call vs. Bull Call Spread
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                          <th className="p-4 font-semibold border-b border-slate-200 rounded-tl-xl w-1/4">Metric</th>
                          <th className="p-4 font-semibold border-b border-slate-200 text-rose-600 w-1/4">Naked Long Call ($100)</th>
                          <th className="p-4 font-semibold border-b border-slate-200 text-emerald-600 bg-emerald-50/50 w-1/4">Bull Call Spread ($100/$105)</th>
                          <th className="p-4 font-semibold border-b border-slate-200 text-slate-700 rounded-tr-xl w-1/4">Strategic Insight</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-bold text-slate-900">Net Debit (Cost)</div>
                            <div className="text-xs text-slate-400 mt-1">Capital at risk</div>
                          </td>
                          <td className="p-4 align-top text-lg font-mono text-rose-700">$5.00</td>
                          <td className="p-4 align-top bg-emerald-50/30">
                            <div className="text-lg font-mono text-emerald-700 font-bold">$3.00</div>
                            <div className="text-xs text-emerald-600 mt-1">($5.00 Buy - $2.00 Sell)</div>
                          </td>
                          <td className="p-4 align-top text-sm text-slate-600">
                            <span className="font-semibold text-emerald-600">40% Capital Reduction.</span> You finance the trade by selling the "unlikely" upside.
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-bold text-slate-900">Breakeven Price</div>
                            <div className="text-xs text-slate-400 mt-1">Price at expiration to lose $0</div>
                          </td>
                          <td className="p-4 align-top font-mono">$105.00</td>
                          <td className="p-4 align-top bg-emerald-50/30 font-bold text-emerald-700 font-mono">$103.00</td>
                          <td className="p-4 align-top text-sm text-slate-600">
                            <span className="font-semibold text-emerald-600">2% Edge.</span> The spread makes money starting at $103. The naked call is still losing money until $105.
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-bold text-slate-900">Max Profit Potential</div>
                            <div className="text-xs text-slate-400 mt-1">Best case scenario</div>
                          </td>
                          <td className="p-4 align-top text-emerald-600 font-bold">Unlimited</td>
                          <td className="p-4 align-top bg-emerald-50/30 text-slate-600 font-mono">
                            $200
                            <div className="text-xs text-slate-500 mt-1">(Width $5 - Debit $3)</div>
                          </td>
                          <td className="p-4 align-top text-sm text-slate-600">
                            <span className="font-semibold text-amber-600">The Trade-off.</span> You cap your upside to buy a higher probability of success.
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 align-top">
                            <div className="font-bold text-slate-900">Theta (Time Decay)</div>
                            <div className="text-xs text-slate-400 mt-1">Daily value erosion</div>
                          </td>
                          <td className="p-4 align-top text-rose-600 font-medium">High Impact (-$$)</td>
                          <td className="p-4 align-top bg-emerald-50/30 text-emerald-700 font-medium">Reduced Impact (-$)</td>
                          <td className="p-4 align-top text-sm text-slate-600">
                            The short option <strong>decays</strong> in your favor, partially offsetting the decay of your long option.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {/* TAB 2: OUTCOME MATRIX */}
              {mathTab === 'outcomes' && (
                <div className="animate-fadeIn p-8 bg-slate-50/50 h-full">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-slate-900">Scenario Outcome Matrix</h3>
                    <p className="text-slate-600">See how the Spread turns a "Loser" into a "Winner" in moderate moves.</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Scenario 1: Moderate Move */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-100 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                      <div className="mb-4">
                        <div className="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-1">Scenario A</div>
                        <h4 className="text-xl font-bold text-slate-800">Stock Hits $104</h4>
                        <p className="text-sm text-slate-500">Moderate Bullish Move (+4%)</p>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                          <div className="text-xs text-rose-800 font-semibold mb-1">Naked Call ($100 Strike)</div>
                          <div className="flex justify-between items-end">
                            <span className="text-sm text-slate-600">Value: $4.00</span>
                            <span className="font-mono font-bold text-rose-600">-$100 Loss</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">Cost $500 vs Exit $400</div>
                        </div>
                        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                          <div className="text-xs text-emerald-800 font-semibold mb-1">Debit Spread ($100/$105)</div>
                          <div className="flex justify-between items-end">
                            <span className="text-sm text-slate-600">Value: $4.00</span>
                            <span className="font-mono font-bold text-emerald-600">+$100 Profit</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">Cost $300 vs Exit $400</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 text-sm font-semibold text-indigo-700 text-center">
                        Winner: Debit Spread 🏆
                      </div>
                    </div>

                    {/* Scenario 2: Flat Market */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 opacity-90 hover:opacity-100 transition-opacity">
                      <div className="mb-4">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Scenario B</div>
                        <h4 className="text-xl font-bold text-slate-800">Stock Stays $100</h4>
                        <p className="text-sm text-slate-500">No Directional Move (0%)</p>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-700 font-semibold mb-1">Naked Call</div>
                          <div className="flex justify-between items-end">
                            <span className="text-sm text-slate-600">Value: $0</span>
                            <span className="font-mono font-bold text-rose-600">-$500 Loss</span>
                          </div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-700 font-semibold mb-1">Debit Spread</div>
                          <div className="flex justify-between items-end">
                            <span className="text-sm text-slate-600">Value: $0</span>
                            <span className="font-mono font-bold text-rose-600">-$300 Loss</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 text-center">
                        Result: Spread loses less money.
                      </div>
                    </div>

                    {/* Scenario 3: Moonshot */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-300 transition-colors">
                      <div className="mb-4">
                        <div className="text-xs font-bold text-amber-500 uppercase tracking-wide mb-1">Scenario C</div>
                        <h4 className="text-xl font-bold text-slate-800">Stock Hits $115</h4>
                        <p className="text-sm text-slate-500">Massive Breakout (+15%)</p>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                          <div className="text-xs text-emerald-800 font-semibold mb-1">Naked Call</div>
                          <div className="flex justify-between items-end">
                            <span className="text-sm text-slate-600">Value: $15.00</span>
                            <span className="font-mono font-bold text-emerald-600">+$1,000 Profit</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">200% Return on Investment</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-700 font-semibold mb-1">Debit Spread</div>
                          <div className="flex justify-between items-end">
                            <span className="text-sm text-slate-600">Value: $5.00</span>
                            <span className="font-mono font-bold text-emerald-600">+$200 Profit</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">66% Return. Capped.</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 text-sm font-semibold text-amber-600 text-center">
                        Winner: Naked Call 🚀
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* TAB 3: GREEKS EDGE */}
              {mathTab === 'greeks' && (
                <div className="animate-fadeIn p-8">
                  <div className="grid md:grid-cols-2 gap-8 h-full">
                    <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600">
                          <Clock size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-indigo-900">Theta (Time Decay)</h3>
                      </div>
                      <p className="text-indigo-800 mb-6 text-sm leading-relaxed">
                        Every day you hold an option, it loses value. This is negative Theta. In a Debit Spread, you <strong>sell</strong> an option with positive Theta against your position.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-right text-xs font-bold text-slate-500">Long Leg</div>
                          <div className="flex-1 bg-white h-8 rounded border border-rose-200 overflow-hidden relative">
                            <div className="absolute top-0 left-0 h-full bg-rose-500 w-[80%] opacity-80"></div>
                            <div className="absolute top-0 right-2 h-full flex items-center text-xs text-rose-700 font-bold">High Decay</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-right text-xs font-bold text-slate-500">Short Leg</div>
                          <div className="flex-1 bg-white h-8 rounded border border-emerald-200 overflow-hidden relative">
                            <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[50%] opacity-80"></div>
                            <div className="absolute top-0 right-2 h-full flex items-center text-xs text-emerald-700 font-bold">Offsets Decay</div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-indigo-200 mt-2">
                          <div className="text-center text-sm font-bold text-indigo-800">Net Result: Slower Bleed</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm text-purple-600">
                          <Activity size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-purple-900">Vega (Volatility)</h3>
                      </div>
                      <p className="text-purple-800 mb-6 text-sm leading-relaxed">
                        Debit spreads are "Long Vega," meaning they like rising volatility. However, if volatility crushes (e.g., after earnings), the short option protects you.
                      </p>
                      <ul className="space-y-3 text-sm text-purple-900">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-purple-600 shrink-0 mt-0.5" size={16} />
                          <span><strong>Low IV Environment:</strong> Ideal for Debit Spreads. Buying cheap premium.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-purple-600 shrink-0 mt-0.5" size={16} />
                          <span><strong>Delta Compression:</strong> As the stock moves towards your short strike, the position becomes less sensitive to volatility swings.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-purple-600 shrink-0 mt-0.5" size={16} />
                          <span><strong>The "Smirk" Advantage (Puts):</strong> Selling OTM puts (Bear Put Spread) often involves selling inflated volatility due to market skew.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          {/* Debit vs Credit Spreads */}
          <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-slate-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Debit vs. Credit Spreads: The Great Debate</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp size={100} />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-4">Vertical Debit Spread</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-900 text-emerald-300 text-xs font-bold px-2 py-1 rounded">BUYER</span>
                      <span>You <strong>PAY</strong> to open</span>
                    </div>
                    <p className="text-slate-400 text-sm">
                      You are betting on a directional move. You need the stock to move past your breakeven.
                    </p>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Environment</span>
                        <span className="font-semibold text-white">Low Volatility (Low IV)</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Time Decay</span>
                        <span className="font-semibold text-rose-400">Hurts You (Generally)</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Direction Required?</span>
                        <span className="font-semibold text-emerald-400">Yes (Must Move)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <DollarSign size={100} />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">Vertical Credit Spread</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-amber-900 text-amber-300 text-xs font-bold px-2 py-1 rounded">SELLER</span>
                      <span>You <strong>COLLECT</strong> to open</span>
                    </div>
                    <p className="text-slate-400 text-sm">
                      You are betting against a move. You profit if the stock stays still or moves away from your strike.
                    </p>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Environment</span>
                        <span className="font-semibold text-white">High Volatility (High IV)</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Time Decay</span>
                        <span className="font-semibold text-emerald-400">Helps You (Pays Rent)</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Direction Required?</span>
                        <span className="font-semibold text-white">No (Can Stagnate)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center text-slate-400 text-sm italic">
                "Debit spreads are for hunters (seeking moves). Credit spreads are for farmers (harvesting decay)."
              </div>
            </div>
          </section>
          {/* Strategy Intuition Section */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BarChart2 className="text-violet-500" />
                Volatility Regimes
              </h3>
              <div className="space-y-6">
                <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-violet-900">Low IV (Rank &lt; 30)</span>
                    <span className="text-xs bg-violet-200 text-violet-800 px-2 py-1 rounded-full">BUY SPREADS</span>
                  </div>
                  <p className="text-sm text-violet-800">
                    Options are cheap. Buy premium. The debit spread is cost-effective and benefits if volatility expands (Vega expansion).
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 opacity-60">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-700">High IV (Rank &gt; 50)</span>
                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">SELL SPREADS</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Options are expensive. Do not buy debit spreads here. You would be buying a house at the peak of a bubble.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Target className="text-blue-500" />
                Strike Selection: 70/30 Rule
              </h3>
              <div className="relative h-64 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-right text-sm font-bold text-slate-500">70 Delta</div>
                    <div className="flex-1 bg-white h-12 rounded-lg border border-emerald-200 shadow-sm flex items-center px-4 relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full w-2 bg-emerald-500"></div>
                      <span className="font-semibold text-slate-700">Buy ITM Option</span>
                      <span className="ml-auto text-xs text-emerald-600 font-medium">Intrinsic Value</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="text-slate-300 rotate-90" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-right text-sm font-bold text-slate-500">30 Delta</div>
                    <div className="flex-1 bg-white h-12 rounded-lg border border-rose-200 shadow-sm flex items-center px-4 relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full w-2 bg-rose-500"></div>
                      <span className="font-semibold text-slate-700">Sell OTM Option</span>
                      <span className="ml-auto text-xs text-rose-600 font-medium">Extrinsic Only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Pre-Flight Checklist */}
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">The Pre-Flight Checklist</h2>
              <p className="text-slate-600">Never execute a trade without passing these 4 gates.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-100">
                {[
                  { title: 'Liquidity Check', icon: <DollarSign size={18} /> },
                  { title: 'IV Rank', icon: <Activity size={18} /> },
                  { title: 'Trend Confirmation', icon: <TrendingUp size={18} /> },
                  { title: 'Earnings Date', icon: <Clock size={18} /> }
                ].map((step, index) => (
                  <button 
                    key={index}
                    onClick={() => setChecklistStep(index)}
                    className={`flex-1 p-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                      checklistStep === index 
                        ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' 
                        : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {step.icon}
                    <span className="hidden md:inline">{step.title}</span>
                  </button>
                ))}
              </div>
              <div className="p-8 min-h-[250px] flex items-center">
                {checklistStep === 0 && (
                  <div className="animate-fadeIn w-full">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1. Is the Option Liquid?</h3>
                    <p className="text-slate-600 mb-4">
                      Slippage kills debit spreads. If the spread between Bid and Ask is too wide, you start the trade with a loss.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold">Good Spread</div>
                        <div className="font-mono font-bold text-emerald-600">$1.00 / $1.05</div>
                      </div>
                      <div className="text-slate-400 text-2xl">vs</div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold">Bad Spread</div>
                        <div className="font-mono font-bold text-rose-600">$1.00 / $1.50</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-indigo-600 font-semibold flex items-center gap-2">
                      <CheckSquare size={16} /> Rule: Bid/Ask spread should be less than $0.10 for stocks under $100.
                    </div>
                  </div>
                )}
                {checklistStep === 1 && (
                  <div className="animate-fadeIn w-full">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">2. Is IV Rank Low?</h3>
                    <p className="text-slate-600 mb-4">
                      Debit Spreads are long Vega strategies. You want to buy when options are cheap.
                    </p>
                    <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden mb-2">
                      <div className="bg-emerald-500 h-full w-[30%]"></div>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-4">
                      <span>0%</span>
                      <span className="text-emerald-600">Target Zone (0-30%)</span>
                      <span>100%</span>
                    </div>
                    <div className="mt-4 text-sm text-indigo-600 font-semibold flex items-center gap-2">
                      <CheckSquare size={16} /> Rule: IV Rank should be below 30. If it's 80, sell a credit spread instead.
                    </div>
                  </div>
                )}
                {checklistStep === 2 && (
                  <div className="animate-fadeIn w-full">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">3. Does the Trend Agree?</h3>
                    <p className="text-slate-600 mb-4">
                      Debit spreads are directional. Don't fight the trend.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                        <span className="block text-xs font-bold text-emerald-800 mb-1">Bull Call</span>
                        <span className="text-sm text-slate-700">Stock &gt; 50 SMA. Higher Highs.</span>
                      </div>
                      <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
                        <span className="block text-xs font-bold text-rose-800 mb-1">Bear Put</span>
                        <span className="text-sm text-slate-700">Stock &lt; 50 SMA. Lower Lows.</span>
                      </div>
                    </div>
                  </div>
                )}
                {checklistStep === 3 && (
                  <div className="animate-fadeIn w-full">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">4. Are Earnings Approaching?</h3>
                    <p className="text-slate-600 mb-4">
                      Binary events are dangerous for debit spreads due to "IV Crush."
                    </p>
                    <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <AlertTriangle className="text-orange-500" size={24} />
                      <div className="text-sm text-orange-800">
                        <strong>IV Crush Risk:</strong> After earnings, Volatility drops instantly. Your long option will lose value even if the stock moves in your direction.
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-indigo-600 font-semibold flex items-center gap-2">
                      <CheckSquare size={16} /> Rule: Avoid expirations that include an earnings announcement.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          {/* Risk Management / Pitfalls */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-orange-500" size={32} />
              <h2 className="text-3xl font-bold text-slate-900">Critical Dangers</h2>
            </div>
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Pin Risk: The Expiration Nightmare</h3>
              <p className="text-orange-800 mb-6">
                What happens if the stock closes exactly at your short strike? You face "Pin Risk." You might assume your short option expires worthless, but if the stock moves in after-hours, you could be assigned stock on Monday morning—exposing you to unlimited risk.
              </p>
              <div className="bg-white p-4 rounded-lg border border-orange-200 text-orange-700 font-semibold text-center">
                RULE: NEVER hold a spread through expiration if the stock is near the short strike. Close it.
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold">
                  <Clock className="text-blue-500" />
                  The 50% Protocol
                </div>
                <p className="text-slate-600 text-sm">
                  Don't be greedy. Close the debit spread when it achieves <strong>50% of max profit</strong>. The last 50% is a slow grind against Theta. Recycle your capital.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold">
                  <XCircle className="text-rose-500" />
                  No Rolling Losers
                </div>
                <p className="text-slate-600 text-sm">
                  Rolling a losing debit spread usually costs more money. Don't throw good money after bad. Accept the loss and find a new entry.
                </p>
              </div>
            </div>
          </section>
          {/* Case Studies */}
          <section className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8">Scenario Simulator</h2>
              <div className="flex flex-wrap gap-4 mb-8">
                <ScenarioButton 
                  active={activeScenario === 'A'} 
                  onClick={() => setActiveScenario('A')}
                  label="Scenario A: The Perfect Trade"
                />
                <ScenarioButton 
                  active={activeScenario === 'B'} 
                  onClick={() => setActiveScenario('B')}
                  label="Scenario B: Pin Risk Disaster"
                />
                <ScenarioButton 
                  active={activeScenario === 'C'} 
                  onClick={() => setActiveScenario('C')}
                  label="Scenario C: Volatility Trap"
                />
              </div>
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 transition-all duration-300">
                {activeScenario === 'A' && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-3 mb-4 text-emerald-400">
                      <CheckCircle />
                      <h3 className="text-xl font-bold">The Ideal Bull Call</h3>
                    </div>
                    <div className="space-y-4 text-slate-300">
                      <p><strong className="text-white">Context:</strong> XYZ at $150. Low IV (Rank 15). Bullish.</p>
                      <p><strong className="text-white">Execution:</strong> Buy $145 Call / Sell $155 Call. Pay $4.50. Max value $10.00.</p>
                      <p><strong className="text-white">Outcome:</strong> Stock rises to $154 in 20 days. Spread is worth $7.50.</p>
                      <div className="mt-6 bg-emerald-900/30 p-4 rounded-lg border border-emerald-500/30">
                        <strong className="text-emerald-400">Management Decision:</strong> Close for $3.00 profit (54% of max). Exit early, avoid theta decay.
                      </div>
                    </div>
                  </div>
                )}
                {activeScenario === 'B' && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-3 mb-4 text-rose-400">
                      <AlertTriangle />
                      <h3 className="text-xl font-bold">The Pin Risk Disaster</h3>
                    </div>
                    <div className="space-y-4 text-slate-300">
                      <p><strong className="text-white">Context:</strong> Holding $45/$50 Bull Call. Stock at $50.02 on Friday.</p>
                      <p><strong className="text-white">Mistake:</strong> Trader does nothing. Assumes short $50 Call is safe.</p>
                      <p><strong className="text-white">Outcome:</strong> Assigned Short 100 shares over weekend. Monday opens at $60.</p>
                      <div className="mt-6 bg-rose-900/30 p-4 rounded-lg border border-rose-500/30">
                        <strong className="text-rose-400">Result:</strong> $1,000 Loss. Defined risk broken. Unlimited risk realized.
                      </div>
                    </div>
                  </div>
                )}
                {activeScenario === 'C' && (
                  <div className="animate-fadeIn">
                    <div className="flex items-center gap-3 mb-4 text-amber-400">
                      <Activity />
                      <h3 className="text-xl font-bold">The Volatility Trap</h3>
                    </div>
                    <div className="space-y-4 text-slate-300">
                      <p><strong className="text-white">Context:</strong> Earnings approaching. High IV (Rank 90).</p>
                      <p><strong className="text-white">Execution:</strong> Trader buys Bull Call Spread. Pays $2.00 (Expensive!).</p>
                      <p><strong className="text-white">Outcome:</strong> Stock rises 5%. But IV crashes (Vega Crush).</p>
                      <div className="mt-6 bg-amber-900/30 p-4 rounded-lg border border-amber-500/30">
                        <strong className="text-amber-400">Lesson:</strong> Long option loses value due to IV drop. Spread barely profits. Wrong strategy for High IV.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          {/* Call-to-Action Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          <footer className="text-center text-slate-400 pb-12 pt-8 border-t border-slate-200">
            <p className="mb-2">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            <p className="text-sm">Not financial advice. Options trading involves substantial risk.</p>
          </footer>
        </main>
      </div>
    </>
  );
}

// Helper Components
const Card = ({ icon, title, children, color }: { icon: React.ReactNode; title: string; children: React.ReactNode; color: string }) => {
  const colorClasses = {
    emerald: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-100',
    blue: 'bg-blue-50 border-blue-100 hover:border-blue-300 hover:shadow-blue-100',
    amber: 'bg-amber-50 border-amber-100 hover:border-amber-300 hover:shadow-amber-100',
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="mb-4 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{children}</p>
    </div>
  );
};

const ScenarioButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border ${
      active
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30'
        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {label}
  </button>
);

const MathTab = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
      active
        ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
    }`}
  >
    {icon}
    {label}
  </button>
);