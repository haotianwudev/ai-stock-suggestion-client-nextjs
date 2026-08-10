'use client';

import React from 'react';
import { TrendingUp, Shield, BarChart3, Divide, History, Briefcase, GitMerge, AlertTriangle } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable Components ---
const Card = ({ title, children, className = "", icon: Icon }: { title: string; children: React.ReactNode; className?: string; icon?: any }) => (
  <div className={`bg-white dark:bg-[#0A0D14]/90 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      {Icon && <div className="p-3 rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
        <Icon size={24} />
      </div>}
      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-serif">{title}</h3>
    </div>
    <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{children}</div>
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-16 max-w-4xl mx-auto">
    <div className="inline-block mb-4 px-4 py-1 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] rounded-full text-sm font-bold tracking-wider uppercase">Deep Dive</div>
    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 font-serif">{title}</h2>
    <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
    <p className="text-xl text-slate-500 font-light leading-relaxed">{subtitle}</p>
  </div>
);

const DataPoint = ({ label, value, desc }: { label: string; value: string; desc: string }) => (
  <div className="text-center p-6 bg-slate-50 dark:bg-[#14171B] rounded-2xl border border-slate-100 dark:border-slate-800">
    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</div>
    <div className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-2">{value}</div>
    <div className="text-xs text-slate-500 font-medium">{desc}</div>
  </div>
);

export default function DSPXArticle() {
  return (
    <ArticleFrame slug="dspx-measure-market-divergence-cboe-sp500-dispersion-index">
      <div className="max-w-7xl mx-auto px-6 text-slate-800 dark:text-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          <DataPoint label="Ticker" value="DSPX" desc="Cboe Global Markets" />
          <DataPoint label="Focus" value="Idiosyncratic" desc="Stock-Specific Risk" />
          <DataPoint label="Relationship" value="Inverse" desc="To Correlation" />
          <DataPoint label="Utility" value="Alpha" desc="Stock Picking Signal" />
        </div>

        <InfographicSlot alt="DSPX Dispersion Index Infographic" />

        {/* SECTION 1: THE FUNDAMENTAL DYNAMIC */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-block bg-white dark:bg-[#0A0D14]/10 backdrop-blur-md px-4 py-1 rounded-lg text-sm font-semibold mb-6 border border-white/20">The Core Mechanism</div>
                <h2 className="text-4xl font-bold mb-6 font-serif">Implied Correlation</h2>
                <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                  DSPX is inextricably linked to <strong>Correlation</strong>. <br /><br />
                  Mathematically, the volatility of an index is reduced when its components move in opposite directions (diversification benefit).<br /><br />
                  If individual stock options are expensive (high vol) but index options are cheap (low vol), the market is <em>implying</em> that stocks will move independently. This drives DSPX up.
                </p>
                <div className="p-6 bg-white dark:bg-[#0A0D14]/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">Low Correlation</span>
                    <span className="font-mono text-white">= High DSPX</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[#BC4128] dark:text-[#E2694A]">High Correlation</span>
                    <span className="font-mono text-white">= Low DSPX</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl shadow-lg border-l-8 border-[#A8672E] dark:border-[#D08F52]">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3 font-serif">
                  <GitMerge className="text-[#A8672E] dark:text-[#D08F52]" /> The &ldquo;Dispersion Effect&rdquo;
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Consider two stocks: Stock A goes +5%, Stock B goes -5%.</p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#14171B] p-4 rounded-xl">
                  <li className="flex justify-between font-medium"><span>Index Return:</span> <span>0% (Flat)</span></li>
                  <li className="flex justify-between font-medium"><span>Index Volatility:</span> <span>Low</span></li>
                  <li className="flex justify-between font-bold text-[#A8672E] dark:text-[#D08F52]"><span>Dispersion (DSPX):</span> <span>Very High</span></li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl shadow-lg border-l-8 border-[#BC4128] dark:border-[#E2694A]">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3 font-serif">
                  <AlertTriangle className="text-[#BC4128] dark:text-[#E2694A]" /> The &ldquo;Correlation Crash&rdquo;
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Consider a market panic: Stock A goes -5%, Stock B goes -5%.</p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#14171B] p-4 rounded-xl">
                  <li className="flex justify-between font-medium"><span>Index Return:</span> <span>-5% (Crash)</span></li>
                  <li className="flex justify-between font-medium"><span>Index Volatility (VIX):</span> <span>Very High</span></li>
                  <li className="flex justify-between font-bold text-[#BC4128] dark:text-[#E2694A]"><span>Dispersion (DSPX):</span> <span>Collapses (Low)</span></li>
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
          <div className="bg-white dark:bg-[#0A0D14] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-[#BC4128] dark:text-[#E2694A] font-bold text-xl shadow-sm">VIX</div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-serif">Fear Gauge</h3>
                    <p className="text-[#BC4128] dark:text-[#E2694A] font-medium tracking-wide text-sm uppercase">Systematic Risk</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-700 dark:text-slate-300 italic">&ldquo;How much will the S&amp;P 500 swing?&rdquo;</p>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-[#BC4128] dark:text-[#E2694A] text-xs font-bold mt-0.5">1</div>
                      <span className="text-slate-700 dark:text-slate-300">Measures volatility of the <strong>entire basket</strong> as a single unit.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-[#BC4128] dark:text-[#E2694A] text-xs font-bold mt-0.5">2</div>
                      <span className="text-slate-700 dark:text-slate-300">Dominated by <strong>Macro Events</strong>: Interest Rates, Geopolitics, Recessions.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-[#BC4128] dark:text-[#E2694A] text-xs font-bold mt-0.5">3</div>
                      <span className="text-slate-700 dark:text-slate-300">When VIX spikes, stocks usually <strong>fall together</strong>.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-10 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-[#1D8A70] dark:text-[#3CBF9C] font-bold text-xl shadow-sm">DSPX</div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-serif">Opportunity Gauge</h3>
                    <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-medium tracking-wide text-sm uppercase">Idiosyncratic Risk</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-700 dark:text-slate-300 italic">&ldquo;How much will stocks diverge from each other?&rdquo;</p>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold mt-0.5">1</div>
                      <span className="text-slate-700 dark:text-slate-300">Measures the volatility of <strong>constituents</strong> relative to the index.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold mt-0.5">2</div>
                      <span className="text-slate-700 dark:text-slate-300">Dominated by <strong>Micro Events</strong>: Earnings, Product Launches, CEO Changes.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold mt-0.5">3</div>
                      <span className="text-slate-700 dark:text-slate-300">When DSPX spikes, stock pickers can <strong>outperform</strong> the index.</span>
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
              <div className="font-mono text-xs bg-slate-100 p-3 rounded-lg mb-4 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                DSPX ≈ √[ Sum(w<sub>i</sub> × σ<sub>i</sub>²) - σ<sub>index</sub>² ]
              </div>
              <p className="text-sm">
                <strong>Sum(w<sub>i</sub> × σ<sub>i</sub>²):</strong> The weighted average implied volatility of the 500 single stocks.<br/><br/>
                <strong>σ<sub>index</sub>²:</strong> The implied volatility of the S&amp;P 500 index (SPX).<br/><br/>
                DSPX is essentially the &ldquo;leftover&rdquo; volatility that the index structure eliminates via diversification.
              </p>
            </Card>
            <Card title="Historical Regimes" icon={History}>
              <ul className="space-y-4 text-sm">
                <li className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Tech Bubble (2000):</span>
                  <span className="block text-slate-500">Record High DSPX. Tech stocks exploded while Old Economy stocks stagnated. Huge divergence.</span>
                </li>
                <li className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200">GFC (2008):</span>
                  <span className="block text-slate-500">Correlation went to 1. Everything crashed. DSPX was relatively muted compared to VIX.</span>
                </li>
                <li>
                  <span className="font-bold text-slate-800 dark:text-slate-200">2023 &ldquo;Mag 7&rdquo;:</span>
                  <span className="block text-slate-500">High DSPX. The &ldquo;Magnificent 7&rdquo; rallied hard while the remaining 493 stocks were flat.</span>
                </li>
              </ul>
            </Card>
            <Card title="Reading the Levels" icon={BarChart3}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">10 - 20 (Low)</span>
                    <span className="text-xs text-slate-500">High Correlation. Macro driven. Hard to find alpha.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">20 - 30 (Normal)</span>
                    <span className="text-xs text-slate-500">Healthy market. Fundamentals matter.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C]"></div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">30+ (High)</span>
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
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A8672E] dark:bg-[#D08F52]/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">The Trader&apos;s Toolkit</h2>
                <p className="text-indigo-200 text-lg">How institutional investors monetize the spread between Index Volatility and Single Stock Volatility.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Strategy 1 */}
                <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white dark:bg-[#0A0D14]/10 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-[#1D8A70] dark:bg-[#3CBF9C]/20 text-[#1D8A70] dark:text-[#3CBF9C]">
                      <TrendingUp size={28} />
                    </div>
                    <h3 className="text-2xl font-bold font-serif">Long Dispersion</h3>
                  </div>
                  <div className="space-y-4 text-indigo-100">
                    <p className="font-medium text-white">The Bet:</p>
                    <p className="text-sm opacity-80">Stocks will move violently, but in different directions. The index will stay relatively flat.</p>
                    <div className="h-px bg-white dark:bg-[#0A0D14]/10 my-4"></div>
                    <p className="font-medium text-white">The Trade:</p>
                    <ul className="list-disc list-inside text-sm space-y-2 opacity-80">
                      <li><strong>Short</strong> Index Straddle (Sell SPX Volatility)</li>
                      <li><strong>Long</strong> Constituent Straddles (Buy Apple/MSFT/etc Volatility)</li>
                    </ul>
                    <div className="h-px bg-white dark:bg-[#0A0D14]/10 my-4"></div>
                    <p className="font-medium text-white">Best Environment:</p>
                    <p className="text-sm text-emerald-300">Earnings Season, M&amp;A booms, Speculative bubbles.</p>
                  </div>
                </div>
                {/* Strategy 2 */}
                <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white dark:bg-[#0A0D14]/10 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-[#BC4128] dark:bg-[#E2694A]/20 text-[#BC4128] dark:text-[#E2694A]">
                      <Shield size={28} />
                    </div>
                    <h3 className="text-2xl font-bold font-serif">Short Dispersion (Correlation)</h3>
                  </div>
                  <div className="space-y-4 text-indigo-100">
                    <p className="font-medium text-white">The Bet:</p>
                    <p className="text-sm opacity-80">Panic will strike, forcing all correlations to 1.0. Everything will crash together.</p>
                    <div className="h-px bg-white dark:bg-[#0A0D14]/10 my-4"></div>
                    <p className="font-medium text-white">The Trade:</p>
                    <ul className="list-disc list-inside text-sm space-y-2 opacity-80">
                      <li><strong>Long</strong> Index Straddle (Buy SPX Volatility)</li>
                      <li><strong>Short</strong> Constituent Straddles (Sell Single Stock Volatility)</li>
                    </ul>
                    <div className="h-px bg-white dark:bg-[#0A0D14]/10 my-4"></div>
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
              <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 p-8 rounded-b-2xl shadow-sm h-full flex flex-col">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 dark:text-slate-400 rounded-full text-xs font-bold uppercase mb-2">DSPX Low</span>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-serif">Macro Dominance</h3>
                </div>
                <div className="flex-grow text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  <p className="mb-4">The &ldquo;Rising Tide&rdquo; environment. Individual company fundamentals are drowned out by broad economic factors.</p>
                  <p>Stock picking is frustrating and often yields low reward for the risk taken.</p>
                </div>
                <div className="bg-slate-50 dark:bg-[#14171B] p-5 rounded-xl border border-slate-100 dark:border-slate-800 mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={16} className="text-slate-400"/>
                    <span className="text-xs font-bold text-slate-400 uppercase">Strategy</span>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Passive Indexing (Beta)</p>
                  <p className="text-xs text-slate-500 mt-1">Buy SPY, VOO, or Sector ETFs.</p>
                </div>
              </div>
            </div>
            {/* Medium Regime */}
            <div className="group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#A8672E] dark:bg-[#D08F52] h-2 rounded-t-2xl transition-colors"></div>
              <div className="bg-white dark:bg-[#0A0D14] border border-indigo-100 p-8 rounded-b-2xl shadow-sm h-full flex flex-col relative overflow-hidden">
                <div className="mb-6 relative z-10">
                  <span className="inline-block px-3 py-1 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] rounded-full text-xs font-bold uppercase mb-2">DSPX Average</span>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-serif">The Stock Picker</h3>
                </div>
                <div className="flex-grow text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 relative z-10">
                  <p className="mb-4">A balanced market. Good earnings are rewarded, bad earnings are punished. Correlations are moderate.</p>
                  <p>Diversification works well here&mdash;winners offset losers effectively.</p>
                </div>
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-5 rounded-xl border border-indigo-100 mt-auto relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={16} className="text-[#A8672E] dark:text-[#D08F52]"/>
                    <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase">Strategy</span>
                  </div>
                  <p className="font-bold text-indigo-800">Core &amp; Satellite</p>
                  <p className="text-xs text-[#A8672E] dark:text-[#D08F52] mt-1">Core Index holdings + Selected Active bets.</p>
                </div>
              </div>
            </div>

            {/* High Regime */}
            <div className="group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#1D8A70] dark:bg-[#3CBF9C] h-2 rounded-t-2xl transition-colors"></div>
              <div className="bg-white dark:bg-[#0A0D14] border border-emerald-100 p-8 rounded-b-2xl shadow-sm h-full flex flex-col">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] rounded-full text-xs font-bold uppercase mb-2">DSPX High</span>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-serif">Alpha Paradise</h3>
                </div>
                <div className="flex-grow text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  <p className="mb-4">Extreme differentiation. This often occurs during tech disruptions or when specific sectors decouple from the economy.</p>
                  <p>Buying the index is inefficient because half the index might be dragging down the other half.</p>
                </div>
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-5 rounded-xl border border-emerald-100 mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={16} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>
                    <span className="text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] uppercase">Strategy</span>
                  </div>
                  <p className="font-bold text-emerald-800">Concentrated Active</p>
                  <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Long/Short Equity, Hedge Funds.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
