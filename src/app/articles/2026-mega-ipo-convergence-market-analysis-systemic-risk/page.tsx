'use client';

import React from 'react';
import { Rocket, BrainCircuit, Globe2, AlertTriangle, TrendingDown, BarChart3, DollarSign, Layers, Activity, ChevronRight, Info } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function MegaIPOConvergence() {
  return (
    <ArticleFrame slug="2026-mega-ipo-convergence-market-analysis-systemic-risk">
      <div className="pb-24">
        <InfographicSlot alt="2026 Mega-IPO Convergence Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1: Introduction */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-bold text-sm tracking-wide shadow-sm font-serif">
                    MODULE 1
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Trillion-Dollar Public Debuts</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52] pl-4">
                  The 2026 market is defined by the unprecedented migration of the world's largest private technology conglomerates into the public equity sphere. These entities are utilizing public markets to finance existential, hyper-capital-intensive infrastructure build-outs while absorbing unprecedented operating losses.
                </p>
              </div>
            </div>

            <ComparisonGrid>
              <ComparisonCard
                title="SpaceX"
                type="pos"
                items={[
                  "Targeting a historic $1.75T valuation via a $75B IPO.",
                  "Core valuation is an 'option premium' predicated on xAI ($250B acquisition) and orbital data centers.",
                  "Valuation: ~$1.75T | P/S Ratio: 93.7x | 2025: -$4.94B Loss"
                ]}
              />
              <ComparisonCard
                title="Anthropic"
                type="pos"
                items={[
                  "Captured 34.4% of the enterprise AI market by monetizing high-tier clients (8 of Fortune 10).",
                  "Offers a credible modeled path to profitability by 2028.",
                  "Valuation: ~$965B | P/S Ratio: 21.9x | >$44B Ann. Rev"
                ]}
              />
              <ComparisonCard
                title="OpenAI"
                type="pos"
                items={[
                  "The consumer pioneer with over 900 million weekly active users.",
                  "Facing profound CapEx for compute infrastructure, delaying expected net profitability until roughly 2030.",
                  "Valuation: ~$852B | P/S Ratio: 34.0x | ~$25B Ann. Rev"
                ]}
              />
            </ComparisonGrid>
          </section>

          {/* Section 2: Valuation Mechanics */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-bold text-sm tracking-wide shadow-sm font-serif">
                    MODULE 2
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Valuation Mechanics &amp; Exuberance</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  The pricing of these mega-IPOs highlights a stark divergence between traditional intrinsic valuation methodologies (like DCF) and narrative-driven market pricing, strongly echoing the late-1990s dot-com bubble.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 min-w-0">
              <div className="bg-purple-50 dark:bg-purple-950/20 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30">
                <h4 className="flex items-center gap-2 text-purple-900 dark:text-purple-300 font-bold mb-4 text-xl">
                  <Activity className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                  The Option Premium Market
                </h4>
                <p className="text-purple-800 dark:text-purple-200/80 leading-relaxed">
                  Independent research assigns SpaceX a fundamental fair value of $63 per share. The $135 IPO asking price demands a massive $72 "option premium." To justify this, investors must assume a 77% probability of perfect execution on highly theoretical space-based AI computing networks (the "Moonshot Scenario").
                </p>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-950/20 rounded-3xl p-8 border border-pink-100 dark:border-pink-900/30">
                <h4 className="flex items-center gap-2 text-pink-900 dark:text-pink-300 font-bold mb-4 text-xl">
                  <Layers className="text-pink-600 dark:text-pink-400 w-6 h-6" />
                  Vendor Financing Loops
                </h4>
                <p className="text-pink-800 dark:text-pink-200/80 leading-relaxed">
                  A dangerous circular capital ecosystem is forming. For instance, Anthropic could pay up to $15B annually to SpaceX for data center capacity—funded entirely by perpetual equity dilution. This mirrors the perilous vendor financing models that artificially inflated telecoms in 1999.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Structural Market Distortions */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 font-bold text-sm tracking-wide shadow-sm font-serif">
                    MODULE 3
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Structural Market Distortions</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  The sheer scale of these offerings is introducing severe mechanical distortions into the fundamental structure of public equity markets, weaponizing index rules and draining systemic liquidity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-0 mb-8">
              <div className="bg-white dark:bg-slate-900 border-l-4 border-[#BC4128] dark:border-[#E2694A] dark:border-[#BC4128] dark:border-[#E2694A] shadow-md dark:shadow-slate-900/50 rounded-3xl p-8 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3 text-lg">
                  <BarChart3 className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" size={24} />
                  Weaponization of Index Rules
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  While the S&P 500 maintained strict profitability rules, the Nasdaq actively altered its rulebook, eliminating minimum float requirements to fast-track SpaceX into the Nasdaq-100 after just 15 days.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-900 border-l-4 border-[#BC4128] dark:border-[#E2694A] dark:border-[#BC4128] dark:border-[#E2694A] shadow-md dark:shadow-slate-900/50 rounded-3xl p-8 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3 text-lg">
                  <DollarSign className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" size={24} />
                  Forced Passive Buying
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Passive index funds will be mechanically forced to indiscriminately buy ~$25B in SpaceX shares. To fund this, they must mechanically liquidate shares of existing foundational tech stocks (Apple, MSFT, Nvidia), destabilizing broader indices.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-600 rounded-3xl p-8 min-w-0">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-3 text-lg">
                <AlertTriangle className="text-amber-600 dark:text-amber-500" size={24} />
                The Retail Allocation Anomaly (Risk Transfer)
              </h4>
              <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">
                Typically, mega-caps reserve 5-10% of shares for retail. SpaceX is allocating an unprecedented <strong>~30% ($22.5B)</strong> directly to retail platforms like Robinhood. Historically, this signals a transfer of massive institutional risk to less sophisticated retail participants at the peak of a cycle, leading to violent "day-one pops" followed by severe, prolonged selling pressure.
              </p>
            </div>
          </section>

          {/* Section 4: Empirical History */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-bold text-sm tracking-wide shadow-sm font-serif">
                    MODULE 4
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Empirical History: The IPO Paradox</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  According to 45 years of data (1980–2025) from Professor Jay R. Ritter, unprofitability and extreme sales multiples mathematically forecast long-term capital destruction, despite initial media hype.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
              <table className="min-w-full text-left bg-white dark:bg-gray-900">
                <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-6 font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-sm">Category (IPOs &gt;$100M Sales)</th>
                    <th className="p-6 font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-sm">Avg. 1st-Day Pop</th>
                    <th className="p-6 font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-sm">Avg. 3-Year Return</th>
                    <th className="p-6 font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-sm">Market Underperformance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-600 dark:text-slate-400">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-6 font-semibold text-slate-800 dark:text-slate-200">All IPOs (Mean)</td>
                    <td className="p-6 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+19.0%</td>
                    <td className="p-6 text-[#1D8A70] dark:text-[#3CBF9C]">+7.0%</td>
                    <td className="p-6 text-slate-400 dark:text-slate-500">N/A</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-6 font-semibold text-slate-800 dark:text-slate-200">Profitable at IPO</td>
                    <td className="p-6 text-[#1D8A70] dark:text-[#3CBF9C]/80">+13.3%</td>
                    <td className="p-6 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+33.6%</td>
                    <td className="p-6 text-[#BC4128] dark:text-[#E2694A]">-13.0 pts</td>
                  </tr>
                  <tr className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 dark:bg-rose-950/20 hover:bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:hover:bg-rose-950/30 transition-colors">
                    <td className="p-6 font-semibold text-slate-800 dark:text-slate-200">Unprofitable at IPO (2026 Cohort)</td>
                    <td className="p-6 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+26.5%</td>
                    <td className="p-6 text-[#BC4128] dark:text-[#E2694A] font-bold">-0.5%</td>
                    <td className="p-6 text-[#BC4128] dark:text-[#E2694A] font-bold">-30.7 pts</td>
                  </tr>
                  <tr className="bg-rose-100/50 dark:bg-rose-900/30 hover:bg-rose-100/80 dark:hover:bg-rose-900/40 transition-colors border-t-2 border-rose-200 dark:border-rose-800">
                    <td className="p-6 font-bold text-rose-900 dark:text-rose-100 flex items-center gap-2">
                      <TrendingDown className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" size={20} /> 
                      Extreme Valuation (P/S &gt; 40x)
                    </td>
                    <td className="p-6 text-[#1D8A70] dark:text-[#3CBF9C] font-extrabold text-lg">+93.6%</td>
                    <td className="p-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-extrabold text-lg">-44.8%</td>
                    <td className="p-6 text-rose-800 dark:text-rose-300 font-bold">-58.5 pts</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-3">
              <Info className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                *SpaceX's P/S sits at ~93.7x, placing it squarely in the highest-risk historical tier.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
