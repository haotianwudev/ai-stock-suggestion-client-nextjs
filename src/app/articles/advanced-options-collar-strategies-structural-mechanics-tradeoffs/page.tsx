'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';
import { TrendingUp, ShieldAlert, BarChart3, Clock, Layers, TrendingDown, Activity, ArrowRight, AlertTriangle } from 'lucide-react';

export default function AdvancedOptionsCollarStrategiesPage() {
  return (
    <ArticleFrame slug="advanced-options-collar-strategies-structural-mechanics-tradeoffs">
      <div className="pb-24">
        <InfographicSlot alt="Advanced Options Collar Strategies Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1: Introduction */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Introduction to Protective Derivatives</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              In the complex discipline of financial risk management, institutional portfolio managers, corporate treasurers, and high-net-worth investors holding concentrated equity positions face a persistent and structural tension between <strong className="text-slate-900 dark:text-white">capital preservation and asset appreciation</strong>.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              While modern portfolio theory dictates that diversification is optimal, immediate diversification is frequently impossible or highly undesirable due to punitive taxable events, insider holding mandates, or strategic voting control. To achieve downside protection without outright asset liquidation, sophisticated market practitioners rely heavily on protective derivative structures.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Among these, the <strong className="text-slate-900 dark:text-white">options collar</strong> has historically emerged as the foundational architecture. It allows investors to effectively bound the distribution of future returns, reducing portfolio volatility and shielding balance sheets from catastrophic price dislocations.
            </p>

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/20 p-8 rounded-3xl border-l-4 border-[#A8672E] dark:border-[#D08F52] min-w-0">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3 text-lg font-serif">Market Context</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                During the "risk-off" macroeconomic sentiment of 2022/2023, flows into derivative-based risk management strategies accelerated significantly. Options collar ETF assets reached approximately $23 billion by early 2023. However, an options collar is not a monolithic instrument — practitioners have engineered specific variants to address volatility skew, margin efficiency, and behavioral finance biases.
              </p>
            </div>
          </section>

          {/* Section 2: Standard Zero-Cost Collar */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Standard Zero-Cost Collar</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The standard options collar is a multi-leg derivative strategy constructed by combining a long position in an underlying asset with the simultaneous <strong className="text-slate-900 dark:text-white">purchase of an out-of-the-money protective put</strong> and the <strong className="text-slate-900 dark:text-white">sale of an out-of-the-money covered call</strong>.
            </p>

            <ComparisonGrid>
              <ComparisonCard
                title="The Floor (Long Put)"
                tone="pos"
              >
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Provides a guaranteed price floor, strictly limiting downside losses if the underlying asset experiences a severe devaluation.
                  </p>
                </div>
              </ComparisonCard>
              <ComparisonCard
                title="The Cap (Short Call)"
                tone="neutral"
              >
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Generates a cash premium credit that partially or fully subsidizes the upfront debit cost of the protective put.
                  </p>
                </div>
              </ComparisonCard>
            </ComparisonGrid>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-10 mb-8 text-center italic font-serif">
              When the premium received perfectly offsets the premium paid, the derivative achieves parity and is classified as a <strong className="text-slate-900 dark:text-white not-italic">"zero-cost" collar</strong>.
            </p>

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/30 min-w-0 shadow-sm flex flex-col md:flex-row gap-6 items-start">
              <AlertTriangle className="w-8 h-8 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] shrink-0" />
              <div className="min-w-0">
                <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-2 font-serif text-xl">Frictions & Limitations</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  While elegant, the standard zero-cost collar inherently requires the investor to accept a <strong className="text-rose-950 dark:text-rose-200">rigid, absolute performance cap</strong>. Due to persistent <em>implied volatility skew</em> (investors overpay for put protection), forcing a zero-cost structure often requires selling a call extremely close to the current spot price, severely truncating upside profit and resulting in a systemic negative alpha drag.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Ratio Collar */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Ratio Collar</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              When implied volatility skew renders a standard zero-cost collar unviable, a sophisticated investor may deploy a <strong className="text-slate-900 dark:text-white">ratio collar</strong>. This intentionally abandons the standard 1:1 symmetry. The most prevalent variant is the "covered ratio write collar," which involves purchasing one protective put while simultaneously selling <em>multiple</em> call options (e.g., 1×2).
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Structural Mechanics (1×2 Profile)</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              In a 1×2 ratio collar, selling two call options against every 100 shares fundamentally fractures the protection. One short call is covered by the equity, but the second is completely <strong className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">"naked" or uncovered</strong>. This introduces a high degree of negative convexity and theoretically unlimited liability on the upside.
            </p>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 min-w-0 shadow-sm">
              <table className="min-w-full text-left bg-white dark:bg-[#05070A]">
                <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {['Expiration Scenario', 'Equity P&L', 'Put P&L', 'Short Calls P&L (×2)', 'Net P&L'].map((h) => (
                      <th key={h} className="py-4 px-6 text-slate-900 dark:text-white font-bold text-sm whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm md:text-base">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Crash to $80.00</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">-$20.00</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">+$15.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold whitespace-nowrap">-$5.00 (Max Loss)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Drift to $95.00</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">-$5.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold whitespace-nowrap">-$5.00 (Max Loss)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Rise to $100.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-slate-500 font-bold whitespace-nowrap">$0.00 (Breakeven)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Rally to $105.00</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">+$5.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-bold whitespace-nowrap">+$5.00 (Max Profit)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Surge to $110.00</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">+$10.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">-$10.00</td>
                    <td className="py-4 px-6 text-slate-500 font-bold whitespace-nowrap">$0.00 (Upper Breakeven)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 dark:bg-rose-950/10">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Melt-Up to $120.00</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">+$20.00</td>
                    <td className="py-4 px-6 text-slate-500">$0.00</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">-$30.00</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold whitespace-nowrap">-$10.00 (Infinite Risk)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-8 rounded-r-3xl min-w-0">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-3 text-lg font-serif">Ideal Investor Profile</h4>
              <p className="text-sm text-rose-800 dark:text-rose-200/80 leading-relaxed">
                Strictly unsuitable for passive, long-term buy-and-hold investors. It is the domain of sophisticated, active volatility traders and institutional yield-seekers with a <strong className="font-bold">neutral-to-bearish outlook</strong> who possess the capital reserves to satisfy massive margin demands if the naked call is breached.
              </p>
            </div>
          </section>

          {/* Section 4: Participating Collar */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Participating Collar</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              To resolve the psychological friction of a hard upside cap (and subsequent "seller's remorse"), financial engineers developed the <strong className="text-slate-900 dark:text-white">participating collar</strong>. This structure allows the holder to retain a predefined percentage of the upside potential above the cap strike while maintaining absolute downside protection.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              This is achieved by selling <em>fewer</em> calls than puts. For example, a 50% participating collar on 2,000 shares involves buying 20 protective puts (covering 100% of the downside) but only selling 10 covered calls (capping only 50% of the upside).
            </p>

            <ComparisonGrid>
              <ComparisonCard
                title="The Premium Tradeoff"
                tone="neg"
              >
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Because fewer calls are sold, the strategy rarely achieves zero-cost status. It almost always requires a <strong className="text-slate-900 dark:text-white">net debit</strong> — an upfront out-of-pocket cash payment functioning identically to an insurance premium.
                </p>
              </ComparisonCard>
              <ComparisonCard
                title="OTC / FX Applications"
                tone="neutral"
              >
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  In OTC foreign exchange, these are formalized as single structured derivative contracts. A corporate importer can secure a "worst-case" rate while maintaining a "participation rate" (e.g., 75%) in favorable movements.
                </p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          {/* Section 5: Three-Way Collar */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Three-Way Collar (Seagull)</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              When institutional market participants (e.g., energy producers) face prohibitively high put option premiums but lack the liquid capital for debit-based collars, they deploy a <strong className="text-slate-900 dark:text-white">three-way or "seagull" collar</strong>. It recreates the zero-cost nature of a standard collar without aggressively capping the upside by secretly taking on latent tail risk.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Structural Composition</h3>
            
            <div className="bg-white dark:bg-[#05070A] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm mb-12 min-w-0">
              <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/50">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-slate-600 dark:text-slate-300">1</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-lg font-serif block mb-1">Long Underlying Asset</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">The physical commodity, currency, or equity.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/50">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">2</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-lg font-serif block mb-1">Long Put (K&#x2081;)</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Establishes the primary protection floor just below spot price.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/50">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-amber-600 dark:text-amber-400">3</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-lg font-serif block mb-1">Short Call (K&#x2082;)</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Establishes the upside revenue cap (significantly higher than K&#x2081;).</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">4</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white text-lg font-serif block mb-1">Short Put (K&#x2083;)</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Establishes the <em>subfloor</em> (significantly lower than K&#x2081;).</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/30 min-w-0 shadow-sm">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-3 text-lg font-serif flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Latent Vulnerabilities & The Subfloor
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                The cash from selling the deep out-of-the-money put (K&#x2083;) subsidizes the long put (K&#x2081;). However, protection is strictly valid <strong className="font-bold">only within the spread between K&#x2081; and K&#x2083;</strong>. If the asset's price plummets below the subfloor (K&#x2083;), catastrophic 1:1 downside risk is entirely reintroduced. (e.g., Energy producers during the 2020 oil crash).
              </p>
            </div>
          </section>

          {/* Section 6: Temporal Dynamics */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Temporal Dynamics & Rolling Strategies</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Hedgers must critically decide whether to lock in a static, <strong className="text-slate-900 dark:text-white">long-dated forward collar</strong> upfront or engage in a dynamic, continuous <strong className="text-slate-900 dark:text-white">rolling collar</strong> strategy utilizing short-term options.
            </p>

            <ComparisonGrid>
              <ComparisonCard
                title="Forward Collar (Static)"
                tone="neutral"
              >
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                  Used to strictly bound risk over a lengthy period (e.g., IPO lock-ups). Often utilized in <em>Prepaid Variable Forwards (PVFs)</em> to secure tax-free cash advances on concentrated stock.
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li className="flex gap-2 items-start">
                    <span className="mt-1 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0">+</span>
                    Set-and-forget; immune to overnight crashes.
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-1 text-[#BC4128] dark:text-[#E2694A] shrink-0">-</span>
                    High premium costs due to long-term Theta.
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-1 text-[#BC4128] dark:text-[#E2694A] shrink-0">-</span>
                    Severe opportunity cost (tight upside cap).
                  </li>
                </ul>
              </ComparisonCard>
              <ComparisonCard
                title="Rolling Collar (Dynamic)"
                tone="neutral"
              >
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                  Continuously rolling 30–90 day options. As the stock climbs, the investor functionally "steps up" the floor and the cap, locking in newly generated profits.
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li className="flex gap-2 items-start">
                    <span className="mt-1 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0">+</span>
                    Cheaper absolute premium outlay.
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-1 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0">+</span>
                    Wider bands allow for better upside participation.
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-1 text-[#BC4128] dark:text-[#E2694A] shrink-0">-</span>
                    Path dependency, whipsaw risk, and high transaction costs.
                  </li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          {/* Section 7: Comparative Synthesis */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Comparative Synthesis</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Selecting the exact collar variant depends entirely on an investor's macroeconomic forecast, risk tolerance, and capital liquidity.
            </p>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
              <table className="min-w-full text-left bg-white dark:bg-[#05070A]">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {['Strategic Variant', 'Upfront Cost', 'Upside Participation', 'Downside Protection', 'Ideal Investor'].map((h) => (
                      <th key={h} className="py-4 px-6 font-bold text-sm whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm md:text-base">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white whitespace-nowrap">Standard Zero-Cost</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Zero (premiums offset)</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Strictly capped at short call strike</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-medium">100% below long put</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Traditional hedgers securing short-term gains</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white whitespace-nowrap">Ratio Collar (1×2)</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Net credit or zero</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-medium">Unlimited upside liability (naked call)</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-medium">100% below long put</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Aggressive yield seekers, neutral-to-bearish</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white whitespace-nowrap">Participating Collar</td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-medium">Net debit (cash required)</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-medium">Partial capture (e.g., 50%) above cap</td>
                    <td className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-medium">100% below long put</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Long-term bullish executives avoiding cap regret</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white whitespace-nowrap">Three-Way (Seagull)</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Zero (subsidized by subfloor)</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Capped, but wider than standard</td>
                    <td className="py-4 px-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-medium">Protected in band; 1:1 risk below subfloor</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Institutional commodity/FX hedgers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
