'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, TrendingUp, Shield, BarChart3, Music, Divide, History, Briefcase, GitMerge, AlertTriangle } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Reusable Components ---
const Card = ({ title, children, className = "", icon: Icon }: { title: string; children: React.ReactNode; className?: string; icon?: any }) => (
  <div className={`bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      {Icon && <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={24} />
      </div>}
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed text-lg">{children}</div>
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-16 max-w-4xl mx-auto">
    <div className="inline-block mb-4 px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wider uppercase">Deep Dive</div>
    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{title}</h2>
    <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
    <p className="text-xl text-slate-500 font-light leading-relaxed">{subtitle}</p>
  </div>
);

const DataPoint = ({ label, value, desc }: { label: string; value: string; desc: string }) => (
  <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</div>
    <div className="text-3xl font-black text-slate-800 mb-2">{value}</div>
    <div className="text-xs text-slate-500 font-medium">{desc}</div>
  </div>
);

export default function DSPXArticle() {
  const currentArticle = articles.find(article => article.slug === 'dspx-measure-market-divergence-cboe-sp500-dispersion-index');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || 'dspx-measure-market-divergence-cboe-sp500-dispersion-index'} 
          />
        </>
      )}

      <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-indigo-100 overflow-x-hidden">
        {/* Background Ambience */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/40 to-purple-100/30 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-orange-100/40 to-rose-100/30 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/4"></div>
        </div>

        {/* Return to Home Button */}
        <div className="max-w-7xl mx-auto px-6 pt-8 relative z-10">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        {currentArticle?.deepResearch && (
          <div className="absolute top-8 left-8 z-20">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
              Deep Research
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
          <header className="text-center mb-24 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 font-bold shadow-sm mb-4 hover:shadow-md transition-shadow cursor-default">
              <Activity size={18} />
              <span className="tracking-wide text-sm uppercase">Cboe S&P 500 Dispersion Index</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
              The Measure of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500">Market Divergence</span>
            </h1>
            <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              While VIX measures how much the market fears a storm, <span className="font-semibold text-slate-800">DSPX</span> measures how differently the ships are steering.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              <DataPoint label="Ticker" value="DSPX" desc="Cboe Global Markets" />
              <DataPoint label="Focus" value="Idiosyncratic" desc="Stock-Specific Risk" />
              <DataPoint label="Relationship" value="Inverse" desc="To Correlation" />
              <DataPoint label="Utility" value="Alpha" desc="Stock Picking Signal" />
            </div>
          </header>

          {/* Hero Infographic */}
          <section className="mb-16">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img 
                src="https://i.imgur.com/OdLQOju.jpeg" 
                alt="DSPX Dispersion Index Infographic" 
                className="w-full h-auto"
              />
            </div>
          </section>

          {/* SECTION 1: THE FUNDAMENTAL DYNAMIC */}
          <section className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1 rounded-lg text-sm font-semibold mb-6 border border-white/20">The Core Mechanism</div>
                  <h2 className="text-4xl font-bold mb-6">Implied Correlation</h2>
                  <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                    DSPX is inextricably linked to <strong>Correlation</strong>. <br /><br />
                    Mathematically, the volatility of an index is reduced when its components move in opposite directions (diversification benefit).<br /><br />
                    If individual stock options are expensive (high vol) but index options are cheap (low vol), the market is <em>implying</em> that stocks will move independently. This drives DSPX up.
                  </p>
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-emerald-400">Low Correlation</span>
                      <span className="font-mono text-white">= High DSPX</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-rose-400">High Correlation</span>
                      <span className="font-mono text-white">= Low DSPX</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-indigo-500">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                    <GitMerge className="text-indigo-500" /> The "Dispersion Effect"
                  </h3>
                  <p className="text-slate-600 mb-4">Consider two stocks: Stock A goes +5%, Stock B goes -5%.</p>
                  <ul className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl">
                    <li className="flex justify-between font-medium"><span>Index Return:</span> <span>0% (Flat)</span></li>
                    <li className="flex justify-between font-medium"><span>Index Volatility:</span> <span>Low</span></li>
                    <li className="flex justify-between font-bold text-indigo-600"><span>Dispersion (DSPX):</span> <span>Very High</span></li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-rose-500">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                    <AlertTriangle className="text-rose-500" /> The "Correlation Crash"
                  </h3>
                  <p className="text-slate-600 mb-4">Consider a market panic: Stock A goes -5%, Stock B goes -5%.</p>
                  <ul className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl">
                    <li className="flex justify-between font-medium"><span>Index Return:</span> <span>-5% (Crash)</span></li>
                    <li className="flex justify-between font-medium"><span>Index Volatility (VIX):</span> <span>Very High</span></li>
                    <li className="flex justify-between font-bold text-rose-600"><span>Dispersion (DSPX):</span> <span>Collapses (Low)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: COMPARATIVE ANALYSIS */}
          <section className="mb-32">
            <SectionHeader 
              title="DSPX vs. VIX: The Showdown" 
              subtitle="Why watching VIX alone leaves you half-blind to market conditions." 
            />
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 border-b md:border-b-0 md:border-r border-slate-100 bg-rose-50/30">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 font-bold text-xl shadow-sm">VIX</div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900">Fear Gauge</h3>
                      <p className="text-rose-600 font-medium tracking-wide text-sm uppercase">Systematic Risk</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <p className="text-slate-700 italic">"How much will the S&P 500 swing?"</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 text-xs font-bold mt-0.5">1</div>
                        <span className="text-slate-700">Measures volatility of the <strong>entire basket</strong> as a single unit.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 text-xs font-bold mt-0.5">2</div>
                        <span className="text-slate-700">Dominated by <strong>Macro Events</strong>: Interest Rates, Geopolitics, Recessions.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 text-xs font-bold mt-0.5">3</div>
                        <span className="text-slate-700">When VIX spikes, stocks usually <strong>fall together</strong>.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-10 bg-emerald-50/30">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 font-bold text-xl shadow-sm">DSPX</div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900">Opportunity Gauge</h3>
                      <p className="text-emerald-600 font-medium tracking-wide text-sm uppercase">Idiosyncratic Risk</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <p className="text-slate-700 italic">"How much will stocks diverge from each other?"</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-bold mt-0.5">1</div>
                        <span className="text-slate-700">Measures the volatility of <strong>constituents</strong> relative to the index.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-bold mt-0.5">2</div>
                        <span className="text-slate-700">Dominated by <strong>Micro Events</strong>: Earnings, Product Launches, CEO Changes.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-bold mt-0.5">3</div>
                        <span className="text-slate-700">When DSPX spikes, stock pickers can <strong>outperform</strong> the index.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: ADVANCED MECHANICS & HISTORY */}
          <section className="mb-32">
            <SectionHeader 
              title="Deep Mechanics" 
              subtitle="Interpreting levels and historical context." 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card title="The Formula Logic" icon={Divide}>
                <div className="font-mono text-xs bg-slate-100 p-3 rounded-lg mb-4 text-slate-600 border border-slate-200">
                  DSPX ≈ √[ Sum(w<sub>i</sub> × σ<sub>i</sub>²) - σ<sub>index</sub>² ]
                </div>
                <p className="text-sm">
                  <strong>Sum(w<sub>i</sub> × σ<sub>i</sub>²):</strong> The weighted average implied volatility of the 500 single stocks.<br/><br/>
                  <strong>σ<sub>index</sub>²:</strong> The implied volatility of the S&P 500 index (SPX).<br/><br/>
                  DSPX is essentially the "leftover" volatility that the index structure eliminates via diversification.
                </p>
              </Card>
              <Card title="Historical Regimes" icon={History}>
                <ul className="space-y-4 text-sm">
                  <li className="pb-3 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Tech Bubble (2000):</span>
                    <span className="block text-slate-500">Record High DSPX. Tech stocks exploded while Old Economy stocks stagnated. Huge divergence.</span>
                  </li>
                  <li className="pb-3 border-b border-slate-100">
                    <span className="font-bold text-slate-800">GFC (2008):</span>
                    <span className="block text-slate-500">Correlation went to 1. Everything crashed. DSPX was relatively muted compared to VIX.</span>
                  </li>
                  <li>
                    <span className="font-bold text-slate-800">2023 "Mag 7":</span>
                    <span className="block text-slate-500">High DSPX. The "Magnificent 7" rallied hard while the remaining 493 stocks were flat.</span>
                  </li>
                </ul>
              </Card>
              <Card title="Reading the Levels" icon={BarChart3}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div>
                      <span className="font-bold text-slate-800 block">10 - 20 (Low)</span>
                      <span className="text-xs text-slate-500">High Correlation. Macro driven. Hard to find alpha.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <div>
                      <span className="font-bold text-slate-800 block">20 - 30 (Normal)</span>
                      <span className="text-xs text-slate-500">Healthy market. Fundamentals matter.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <div>
                      <span className="font-bold text-slate-800 block">30+ (High)</span>
                      <span className="text-xs text-slate-500">Dislocation. Extreme opportunity for active managers.</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* SECTION 4: TRADING STRATEGIES */}
          <section className="mb-32">
            <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px]"></div>
              <div className="relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">The Trader's Toolkit</h2>
                  <p className="text-indigo-200 text-lg">How institutional investors monetize the spread between Index Volatility and Single Stock Volatility.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Strategy 1 */}
                  <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                        <TrendingUp size={28} />
                      </div>
                      <h3 className="text-2xl font-bold">Long Dispersion</h3>
                    </div>
                    <div className="space-y-4 text-indigo-100">
                      <p className="font-medium text-white">The Bet:</p>
                      <p className="text-sm opacity-80">Stocks will move violently, but in different directions. The index will stay relatively flat.</p>
                      <div className="h-px bg-white/10 my-4"></div>
                      <p className="font-medium text-white">The Trade:</p>
                      <ul className="list-disc list-inside text-sm space-y-2 opacity-80">
                        <li><strong>Short</strong> Index Straddle (Sell SPX Volatility)</li>
                        <li><strong>Long</strong> Constituent Straddles (Buy Apple/MSFT/etc Volatility)</li>
                      </ul>
                      <div className="h-px bg-white/10 my-4"></div>
                      <p className="font-medium text-white">Best Environment:</p>
                      <p className="text-sm text-emerald-300">Earnings Season, M&A booms, Speculative bubbles.</p>
                    </div>
                  </div>
                  {/* Strategy 2 */}
                  <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
                        <Shield size={28} />
                      </div>
                      <h3 className="text-2xl font-bold">Short Dispersion (Correlation)</h3>
                    </div>
                    <div className="space-y-4 text-indigo-100">
                      <p className="font-medium text-white">The Bet:</p>
                      <p className="text-sm opacity-80">Panic will strike, forcing all correlations to 1.0. Everything will crash together.</p>
                      <div className="h-px bg-white/10 my-4"></div>
                      <p className="font-medium text-white">The Trade:</p>
                      <ul className="list-disc list-inside text-sm space-y-2 opacity-80">
                        <li><strong>Long</strong> Index Straddle (Buy SPX Volatility)</li>
                        <li><strong>Short</strong> Constituent Straddles (Sell Single Stock Volatility)</li>
                      </ul>
                      <div className="h-px bg-white/10 my-4"></div>
                      <p className="font-medium text-white">Best Environment:</p>
                      <p className="text-sm text-rose-300">Geopolitical Crises, Fed Rate Hikes, Systemic Banking Failures.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: PRACTICAL APPLICATION */}
          <section className="mb-32">
            <SectionHeader 
              title="Portfolio Positioning" 
              subtitle="Adjusting your holdings based on the Dispersion Regime." 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Low Regime */}
              <div className="group hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-slate-300 h-2 rounded-t-2xl group-hover:bg-slate-400 transition-colors"></div>
                <div className="bg-white border border-slate-200 p-8 rounded-b-2xl shadow-sm h-full flex flex-col">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase mb-2">DSPX Low</span>
                    <h3 className="text-2xl font-bold text-slate-800">Macro Dominance</h3>
                  </div>
                  <div className="flex-grow text-slate-600 text-sm leading-relaxed mb-6">
                    <p className="mb-4">The "Rising Tide" environment. Individual company fundamentals are drowned out by broad economic factors.</p>
                    <p>Stock picking is frustrating and often yields low reward for the risk taken.</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-slate-400"/>
                      <span className="text-xs font-bold text-slate-400 uppercase">Strategy</span>
                    </div>
                    <p className="font-bold text-slate-800">Passive Indexing (Beta)</p>
                    <p className="text-xs text-slate-500 mt-1">Buy SPY, VOO, or Sector ETFs.</p>
                  </div>
                </div>
              </div>
              {/* Medium Regime */}
              <div className="group hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-indigo-500 h-2 rounded-t-2xl transition-colors"></div>
                <div className="bg-white border border-indigo-100 p-8 rounded-b-2xl shadow-sm h-full flex flex-col relative overflow-hidden">
                  <div className="mb-6 relative z-10">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase mb-2">DSPX Average</span>
                    <h3 className="text-2xl font-bold text-slate-800">The Stock Picker</h3>
                  </div>
                  <div className="flex-grow text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                    <p className="mb-4">A balanced market. Good earnings are rewarded, bad earnings are punished. Correlations are moderate.</p>
                    <p>Diversification works well here—winners offset losers effectively.</p>
                  </div>
                  <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 mt-auto relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-indigo-400"/>
                      <span className="text-xs font-bold text-indigo-400 uppercase">Strategy</span>
                    </div>
                    <p className="font-bold text-indigo-800">Core & Satellite</p>
                    <p className="text-xs text-indigo-600 mt-1">Core Index holdings + Selected Active bets.</p>
                  </div>
                </div>
              </div>

              {/* High Regime */}
              <div className="group hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-emerald-500 h-2 rounded-t-2xl transition-colors"></div>
                <div className="bg-white border border-emerald-100 p-8 rounded-b-2xl shadow-sm h-full flex flex-col">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase mb-2">DSPX High</span>
                    <h3 className="text-2xl font-bold text-slate-800">Alpha Paradise</h3>
                  </div>
                  <div className="flex-grow text-slate-600 text-sm leading-relaxed mb-6">
                    <p className="mb-4">Extreme differentiation. This often occurs during tech disruptions or when specific sectors decouple from the economy.</p>
                    <p>Buying the index is inefficient because half the index might be dragging down the other half.</p>
                  </div>
                  <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-emerald-400"/>
                      <span className="text-xs font-bold text-emerald-400 uppercase">Strategy</span>
                    </div>
                    <p className="font-bold text-emerald-800">Concentrated Active</p>
                    <p className="text-xs text-emerald-600 mt-1">Long/Short Equity, Hedge Funds.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action - Google Doc */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-32 text-center text-slate-400 text-sm pb-10 border-t border-slate-100 pt-10">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Activity size={16} />
              <span className="font-bold text-slate-500">Market Intelligence Series</span>
            </div>
            <p className="opacity-60 max-w-lg mx-auto mb-4">
              This educational interface explains the concept of Cboe S&P 500 Dispersion Index (DSPX). Data presented is for illustrative purposes only and does not constitute financial advice.
            </p>
            <p className="text-slate-500">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
