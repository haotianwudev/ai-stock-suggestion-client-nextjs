'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, Activity, AlertTriangle, Zap, ShieldCheck, BarChart3, Clock, Globe, BookOpen, ArrowRight, TrendingUp, Cpu, Maximize2, ExternalLink } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const institutions = [
  {
    name: 'Morgan Stanley',
    target: '8,300 (Mid-2027)',
    icon: <Activity className="w-6 h-6 text-blue-600" />,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    titleColor: 'text-blue-800',
    warnings: ['Stagflation risks', 'Consumer credit fragility', 'Narrow market concentration', 'Delayed rate cuts']
  },
  {
    name: 'JPMorgan Chase',
    target: '7,200 (Year-End 2026)',
    icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    bg: 'bg-red-50',
    border: 'border-red-200',
    titleColor: 'text-red-800',
    warnings: ['95th percentile gross leverage', 'Geopolitical fragmentation', 'Oil supply shocks (12M bpd)', 'Structural inflation']
  },
  {
    name: 'Goldman Sachs',
    target: 'Cautiously Constructive',
    icon: <BarChart3 className="w-6 h-6 text-amber-600" />,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    titleColor: 'text-amber-800',
    warnings: ['Market heat at 86th percentile', 'EV/Sales > 10x near dot-com levels', 'Highest short interest since 2008']
  },
  {
    name: 'Citigroup',
    target: '8,100 (Year-End 2026)',
    icon: <Globe className="w-6 h-6 text-teal-600" />,
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    titleColor: 'text-teal-800',
    warnings: ['Heavy reliance on AI capex', 'Vulnerability to P/E multiple compression', 'Restrictive monetary policy risks']
  }
];

const greeks = [
  {
    name: 'Gamma (GEX)',
    math: '∂²P / ∂S²',
    color: 'from-purple-500 to-indigo-600',
    lightBg: 'bg-purple-50',
    description: 'Transitioning below the "Gamma Flip" forces dealers to sell into a falling market, mechanically amplifying price drops and expanding realized volatility.',
    icon: <TrendingDown className="w-5 h-5 text-purple-600" />
  },
  {
    name: 'Vanna (VEX)',
    math: '∂²P / ∂S∂σ',
    color: 'from-pink-500 to-rose-600',
    lightBg: 'bg-pink-50',
    description: 'Surging implied volatility increases the delta magnitude of short puts, forcing massive, immediate dealer short-selling that feeds a self-exciting volatility loop.',
    icon: <Activity className="w-5 h-5 text-pink-600" />
  },
  {
    name: 'Charm (CHEX)',
    math: '∂²P / ∂S∂τ',
    color: 'from-orange-500 to-amber-600',
    lightBg: 'bg-orange-50',
    description: 'Time decay alters dealer deltas overnight, creating severe opening imbalances. 0DTE charm forces rapid, forced liquidations in the final hours of trading.',
    icon: <Clock className="w-5 h-5 text-orange-600" />
  }
];

export default function MarketDropAnatomyArticle() {
  const currentArticle = articles.find(article => article.slug === 'anatomy-market-drop-systemic-risk-options-microstructure-crisis-alpha');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

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

      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* HERO SECTION */}
        <header className="relative overflow-hidden bg-white border-b border-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-pink-50 opacity-70 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-100">
              <BookOpen className="w-4 h-4" />
              Quantitative Finance Tutorial
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              The Anatomy of a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">Market Drop</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
              A deep-dive into the systemic risks, options microstructure dynamics, and "Crisis Alpha" generation during a market dislocation driven by the AI capital expenditure supercycle.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Market Drop Anatomy Infographic" 
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
            alt="Market Drop Anatomy Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        <main className="max-w-6xl mx-auto px-6 py-16 space-y-32">
          {/* SECTION 1: INSTITUTIONAL DIAGNOSTICS */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-indigo-500" />
                Institutional Warnings &amp; Overheating
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl">
                Despite robust nominal returns, leading financial institutions are observing a dangerous convergence of stretched valuation multiples (CAPE &gt; 40), sticky inflation, and a structural narrowing of market leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {institutions.map((inst, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-3xl p-8 border ${inst.border} ${inst.bg} shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white rounded-2xl shadow-sm">
                        {inst.icon}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${inst.titleColor}`}>{inst.name}</h3>
                        <p className="text-slate-500 font-medium text-sm">Target: {inst.target}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {inst.warnings.map((warning, wIdx) => (
                      <li key={wIdx} className="flex items-start gap-2">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-current ${inst.titleColor} opacity-50 flex-shrink-0`} />
                        <span className="text-slate-700 leading-snug">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Breadth Warning Callout */}
            <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingDown className="w-32 h-32" />
              </div>
              <h4 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="text-amber-400" />
                The Breadth Divergence Red Flag
              </h4>
              <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
                While cap-weighted indices hit highs, the median S&amp;P 500 stock trades 13% below its 52-week peak. Roughly 44% of S&amp;P 500 stocks are below their 200-day moving average. This covert bear market means portfolio offset effects vanish, exposing the market to catastrophic, correlated drawdowns.
              </p>
            </div>
          </section>

          {/* SECTION 2: MICROSTRUCTURE & GREEKS */}
          <section>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Cpu className="w-8 h-8 text-pink-500" />
                The Quantitative Mechanics of a Crash
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl">
                Fundamental valuations set initial conditions, but microstructural mechanisms amplify the decline. Crashes are forced liquidation cycles driven by options dealers maintaining delta-neutral books.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {greeks.map((greek, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${greek.color} text-white shadow-md text-sm font-mono font-bold`}>
                    {greek.math}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{greek.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold mb-4 inline-block self-start ${greek.lightBg} text-slate-700`}>
                    {greek.math}
                  </div>
                  <p className="text-slate-600 leading-relaxed flex-grow">{greek.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8">
                <h4 className="text-xl font-bold text-rose-900 mb-3">The Volatility Feedback Effect</h4>
                <p className="text-rose-800/80 leading-relaxed">
                  When sudden systematic risk enters, aggregate market volatility expectations rise. Rational investors demand a higher risk premium. To allow for higher future returns without changing underlying cash flows, the current asset price must immediately fall. Expected volatility causes instant crashes.
                </p>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8">
                <h4 className="text-xl font-bold text-indigo-900 mb-3">Yen Carry Trade Contagion</h4>
                <p className="text-indigo-800/80 leading-relaxed">
                  A massive short volatility strategy. If BOJ tightens or US equity falls, the Yen appreciates rapidly. This causes massive margin calls, forcing leveraged funds to liquidate liquid US equities to buy back the Yen, draining global liquidity instantly.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: WHAT JUMPS FIRST */}
          <section>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                What Jumps <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">First &amp; Fastest?</span>
              </h2>
              <p className="text-xl text-slate-600">
                When standard asset correlations break down and spike toward 1.0, traditional mean-variance optimization fails. Here is what explodes upwards during the initial shock.
              </p>
            </div>

            <div className="space-y-6">
              {/* VIX Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-purple-500/10 transition-colors" />
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl flex-shrink-0">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Volatility (VIX Options &amp; Futures)</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      The VIX has extreme negative Beta (-14 during a crash). The term structure violently inverts into backwardation. Due to Implied Convexity (vol of vol), structurally allocated long VIX calls deliver explosive, nonlinear gains in the first 24-72 hours.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg inline-flex">
                      <ArrowRight className="w-4 h-4" /> Primary Driver: Volatility Feedback &amp; Negative Convexity
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-emerald-500/10 transition-colors" />
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl flex-shrink-0">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Crisis Alpha (Systematic CTAs)</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      Managed futures utilize trend-following algorithms. As a crisis approaches and correlations spike to 1.0, CTAs inherently capture extreme positive skew by being short global equities, long safe-haven bonds, and long funding currencies.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg inline-flex">
                      <ArrowRight className="w-4 h-4" /> Primary Driver: Beta-timing &amp; Dynamic Correlation Exploitation
                    </div>
                  </div>
                </div>
              </div>

              {/* Safe Havens Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-blue-500/10 transition-colors" />
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl flex-shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Safe Haven Sovereigns &amp; Defensive Premia</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      U.S. Treasuries jump rapidly as yields collapse, pricing in aggressive central bank easing. Defensive equity factors ("Minimum Variance", "High Quality") act as empirical shock absorbers.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg inline-flex">
                      <ArrowRight className="w-4 h-4" /> Primary Driver: Global Liquidity Flight
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: THE REBOUND (MOMENTUM CRASH) */}
          <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-rose-500/20 text-rose-300 font-bold rounded-full mb-6 border border-rose-500/30">
                Phase 2: The Rebound
              </div>
              <h2 className="text-4xl font-extrabold mb-6">The "Winner's Curse" &amp; Momentum Crashes</h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                When the panic peaks and liquidity returns, the fastest-jumping assets are deeply counterintuitive. It is <span className="text-rose-400 font-semibold">not</span> safe havens or high-quality stocks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                  <h3 className="text-2xl font-bold text-white mb-4">The "Loser" Squeeze</h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Following the Merton (1974) model, distressed firms driven to the brink of bankruptcy transition to behaving like deep OTM call options. Their Beta explodes (&gt;3.0). When the market rebounds, these "loser" stocks act as highly levered call options, exploding upward in violent short squeezes.
                  </p>
                  <div className="text-4xl font-black text-rose-400 opacity-50">+163%</div>
                  <div className="text-sm text-slate-400 mt-1">Past-loser decile gain (Spring 2009 example)</div>
                </div>
                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Mitigating the Risk</h3>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex gap-3">
                        <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                        <span>
                          <strong>52-Week High Neutrality:</strong> Decouple from distressed assets furthest from their highs.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <Activity className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                        <span>
                          <strong>Volatility Scaling:</strong> Weight positions inversely by realized formation-period volatility.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call-to-Action: Google Doc Link */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Deep Research</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <ExternalLink className="inline mr-2" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t border-slate-200 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-6 text-center text-slate-500">
            <p className="font-semibold text-slate-900 mb-2">© 2026 SOPHIE's Daddy Quant Blog</p>
            <p className="text-sm max-w-2xl mx-auto">
              Educational content for informational purposes only. Navigating an overheated market requires dynamically allocating toward VIX convexity and trend-following strategies during the initial shock, while neutralizing exposure to high-beta distressed assets at the inflection point.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
