'use client';

import React from 'react';
import { TrendingDown, Activity, AlertTriangle, Zap, ShieldCheck, BarChart3, Clock, Globe, ArrowRight, TrendingUp, Cpu, ChevronRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { InlineMath } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

const institutions = [
  {
    name: 'Morgan Stanley',
    target: '8,300 (Mid-2027)',
    icon: <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-900/50',
    titleColor: 'text-blue-900 dark:text-blue-300',
    warnings: ['Stagflation risks', 'Consumer credit fragility', 'Narrow market concentration', 'Delayed rate cuts']
  },
  {
    name: 'JPMorgan Chase',
    target: '7,200 (Year-End 2026)',
    icon: <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-900/50',
    titleColor: 'text-rose-900 dark:text-rose-300',
    warnings: ['95th percentile gross leverage', 'Geopolitical fragmentation', 'Oil supply shocks (12M bpd)', 'Structural inflation']
  },
  {
    name: 'Goldman Sachs',
    target: 'Cautiously Constructive',
    icon: <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-900/50',
    titleColor: 'text-amber-900 dark:text-amber-300',
    warnings: ['Market heat at 86th percentile', 'EV/Sales > 10x near dot-com levels', 'Highest short interest since 2008']
  },
  {
    name: 'Citigroup',
    target: '8,100 (Year-End 2026)',
    icon: <Globe className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-900/50',
    titleColor: 'text-teal-900 dark:text-teal-300',
    warnings: ['Heavy reliance on AI capex', 'Vulnerability to P/E multiple compression', 'Restrictive monetary policy risks']
  }
];

const greeks = [
  {
    name: 'Gamma (GEX)',
    math: <InlineMath math="\\frac{\\partial^2 P}{\\partial S^2}" />,
    color: 'from-purple-500 to-indigo-600',
    lightBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    description: 'Transitioning below the "Gamma Flip" forces dealers to sell into a falling market, mechanically amplifying price drops and expanding realized volatility.',
    icon: <TrendingDown className="w-5 h-5 text-purple-600" />
  },
  {
    name: 'Vanna (VEX)',
    math: <InlineMath math="\\frac{\\partial^2 P}{\\partial S \\partial \\sigma}" />,
    color: 'from-pink-500 to-rose-600',
    lightBg: 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300',
    description: 'Surging implied volatility increases the delta magnitude of short puts, forcing massive, immediate dealer short-selling that feeds a self-exciting volatility loop.',
    icon: <Activity className="w-5 h-5 text-pink-600" />
  },
  {
    name: 'Charm (CHEX)',
    math: <InlineMath math="\\frac{\\partial^2 P}{\\partial S \\partial \\tau}" />,
    color: 'from-orange-500 to-amber-600',
    lightBg: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
    description: 'Time decay alters dealer deltas overnight, creating severe opening imbalances. 0DTE charm forces rapid, forced liquidations in the final hours of trading.',
    icon: <Clock className="w-5 h-5 text-orange-600" />
  }
];

export default function MarketDropAnatomyArticle() {
  return (
    <ArticleFrame 
      slug="anatomy-market-drop-systemic-risk-options-microstructure-crisis-alpha"
      additionalDisclaimer="Navigating an overheated market requires dynamically allocating toward VIX convexity and trend-following strategies during the initial shock, while neutralizing exposure to high-beta distressed assets at the inflection point."
    >
      <div className="pb-24">
        <InfographicSlot alt="Market Drop Anatomy Infographic" />
        
        <div className="max-w-4xl mx-auto">
          {/* SECTION 1: INSTITUTIONAL DIAGNOSTICS */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Institutional Warnings &amp; Overheating</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Despite robust nominal returns, leading financial institutions are observing a dangerous convergence of stretched valuation multiples (CAPE &gt; 40), sticky inflation, and a structural narrowing of market leadership.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h2 className="font-serif text-xl flex items-center gap-2 mb-6">
                    <Activity className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Market concentration and stretched valuations expose the S&amp;P 500 to catastrophic drawdowns.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Options microstructure (Gamma, Vanna, Charm) mechanically amplifies downward velocity.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Crisis Alpha and Volatility assets (VIX) are the only effective initial hedges as correlations converge to 1.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
              {institutions.map((inst, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-3xl p-6 border ${inst.border} ${inst.bg} shadow-sm min-w-0`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 shrink-0">
                      {inst.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${inst.titleColor}`}>{inst.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">Target: {inst.target}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {inst.warnings.map((warning, wIdx) => (
                      <li key={wIdx} className="flex items-start gap-2">
                        <div className={`mt-2 w-1.5 h-1.5 rounded-full bg-current ${inst.titleColor} flex-shrink-0`} />
                        <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Breadth Warning Callout */}
            <div className="mt-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8 flex gap-6 items-start min-w-0">
              <AlertTriangle className="text-rose-600 dark:text-rose-500 shrink-0 mt-1" size={28} />
              <div className="min-w-0">
                <h4 className="text-xl font-bold text-rose-900 dark:text-rose-300 mb-3">The Breadth Divergence Red Flag</h4>
                <p className="text-rose-800 dark:text-rose-200/80 leading-relaxed">
                  While cap-weighted indices hit highs, the median S&amp;P 500 stock trades 13% below its 52-week peak. Roughly 44% of S&amp;P 500 stocks are below their 200-day moving average. This covert bear market means portfolio offset effects vanish, exposing the market to catastrophic, correlated drawdowns.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: MICROSTRUCTURE & GREEKS */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                  <Cpu className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Quantitative Mechanics of a Crash</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Fundamental valuations set initial conditions, but microstructural mechanisms amplify the decline. Crashes are forced liquidation cycles driven by options dealers maintaining delta-neutral books.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-w-0 mb-12">
              {greeks.map((greek, idx) => (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col min-w-0"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{greek.name}</h3>
                  <div className={`px-3 py-1.5 rounded-xl font-mono text-sm font-bold mb-4 inline-flex self-start ${greek.lightBg} border border-transparent`}>
                    {greek.math}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">{greek.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-0">
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">The Volatility Feedback Effect</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  When sudden systematic risk enters, aggregate market volatility expectations rise. Rational investors demand a higher risk premium. To allow for higher future returns without changing underlying cash flows, the current asset price must immediately fall. Expected volatility causes instant crashes.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">Yen Carry Trade Contagion</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  A massive short volatility strategy. If BOJ tightens or US equity falls, the Yen appreciates rapidly. This causes massive margin calls, forcing leveraged funds to liquidate liquid US equities to buy back the Yen, draining global liquidity instantly.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: WHAT JUMPS FIRST */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight mb-4">
                What Jumps First &amp; Fastest?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                When standard asset correlations break down and spike toward 1.0, traditional mean-variance optimization fails. Here is what explodes upwards during the initial shock.
              </p>
            </div>

            <div className="space-y-6 min-w-0">
              {/* VIX Card */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0 flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-[#14171B] dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] p-4 rounded-2xl flex-shrink-0">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Volatility (VIX Options &amp; Futures)</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    The VIX has extreme negative Beta (-14 during a crash). The term structure violently inverts into backwardation. Due to Implied Convexity (vol of vol), structurally allocated long VIX calls deliver explosive, nonlinear gains in the first 24-72 hours.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1D8A70] dark:text-[#3CBF9C] bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 px-3 py-1.5 rounded-lg inline-flex">
                    <ArrowRight className="w-4 h-4" /> Primary Driver: Volatility Feedback &amp; Negative Convexity
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0 flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-[#14171B] dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] p-4 rounded-2xl flex-shrink-0">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Crisis Alpha (Systematic CTAs)</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Managed futures utilize trend-following algorithms. As a crisis approaches and correlations spike to 1.0, CTAs inherently capture extreme positive skew by being short global equities, long safe-haven bonds, and long funding currencies.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1D8A70] dark:text-[#3CBF9C] bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 px-3 py-1.5 rounded-lg inline-flex">
                    <ArrowRight className="w-4 h-4" /> Primary Driver: Beta-timing &amp; Dynamic Correlation Exploitation
                  </div>
                </div>
              </div>

              {/* Safe Havens Card */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0 flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-[#14171B] dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] p-4 rounded-2xl flex-shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Safe Haven Sovereigns &amp; Defensive Premia</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    U.S. Treasuries jump rapidly as yields collapse, pricing in aggressive central bank easing. Defensive equity factors ("Minimum Variance", "High Quality") act as empirical shock absorbers.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1D8A70] dark:text-[#3CBF9C] bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 px-3 py-1.5 rounded-lg inline-flex">
                    <ArrowRight className="w-4 h-4" /> Primary Driver: Global Liquidity Flight
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: THE REBOUND (MOMENTUM CRASH) */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-[#14171B] dark:bg-[#05070A] rounded-3xl p-10 md:p-12 text-white shadow-2xl min-w-0 border border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#BC4128]/20 dark:bg-[#E2694A]/20 text-[#BC4128] dark:text-[#E2694A] font-bold rounded-lg mb-6 border border-[#BC4128]/30 dark:border-[#E2694A]/30 text-sm">
                Phase 2: The Rebound
              </div>
              <h2 className="text-3xl font-bold mb-6 font-serif">The "Winner's Curse" &amp; Momentum Crashes</h2>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                When the panic peaks and liquidity returns, the fastest-jumping assets are deeply counterintuitive. It is <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">not</span> safe havens or high-quality stocks.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-0">
                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-4">The "Loser" Squeeze</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    Following the Merton (1974) model, distressed firms driven to the brink of bankruptcy transition to behaving like deep OTM call options. Their Beta explodes (&gt;3.0). When the market rebounds, these "loser" stocks act as highly levered call options, exploding upward in violent short squeezes.
                  </p>
                  <div className="text-4xl font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C]">+163%</div>
                  <div className="text-xs text-slate-400 mt-2 uppercase tracking-wider">Past-loser decile gain (Spring 2009 example)</div>
                </div>
                
                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Mitigating the Risk</h3>
                    <ul className="space-y-4 text-slate-300">
                      <li className="flex gap-3 items-start">
                        <ShieldCheck className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">
                          <strong className="block text-white mb-1">52-Week High Neutrality</strong> Decouple from distressed assets furthest from their highs.
                        </span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <Activity className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">
                          <strong className="block text-white mb-1">Volatility Scaling</strong> Weight positions inversely by realized formation-period volatility.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
