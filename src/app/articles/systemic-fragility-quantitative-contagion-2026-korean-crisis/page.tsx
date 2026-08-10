'use client';

import React from 'react';
import {
  TrendingDown, AlertTriangle, BarChart3, Globe, Shield,
  BookOpen, Zap, Activity, Cpu, Briefcase, Calculator,
  Layers, ArrowRight, Info,
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function SystemicFragilityArticle() {
  return (
    <ArticleFrame slug="systemic-fragility-quantitative-contagion-2026-korean-crisis">
      <div className="max-w-5xl mx-auto space-y-12 text-slate-800 dark:text-slate-200 pb-8">

        {/* 1. Introduction & Executive Summary */}
        <section id="introduction">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <BookOpen className="text-[#A8672E]" size={28} />
            1. Introduction &amp; Executive Summary
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              In the summer of 2026, the global financial ecosystem experienced one of the most severe localized market dislocations in modern history, emanating from the South Korean equity market. Following a parabolic, artificial intelligence-driven supercycle that propelled the Korea Composite Stock Price Index (KOSPI) 150 percent upward to briefly breach the historic 9,000-point threshold in June 2026, the market suffered a violent capitulation.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 my-8">
              <div className="bg-[#BC4128]/10 p-6 rounded-2xl border border-[#BC4128]/30 text-center">
                <TrendingDown className="w-10 h-10 text-[#BC4128] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#BC4128] mb-1">-25%</div>
                <div className="text-sm text-[#BC4128]/80 font-medium">KOSPI Collapse (1 Month)</div>
              </div>
              <div className="bg-[#A8672E]/10 p-6 rounded-2xl border border-[#A8672E]/30 text-center">
                <Activity className="w-10 h-10 text-[#A8672E] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#A8672E] mb-1">1.2M</div>
                <div className="text-sm text-[#A8672E]/80 font-medium">Margin Liquidations</div>
              </div>
              <div className="bg-[#A8672E]/10 p-6 rounded-2xl border border-[#A8672E]/30 text-center">
                <Cpu className="w-10 h-10 text-[#A8672E] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#A8672E] mb-1">&gt;50%</div>
                <div className="text-sm text-[#A8672E]/80 font-medium">KOSPI Weight: Samsung + SK Hynix</div>
              </div>
            </div>
            <p>
              This extreme boom-and-bust cycle was fundamentally a crisis of <strong>market microstructure</strong>. It was driven by a toxic convergence of an unprecedented accumulation of retail leverage, extreme index concentration, and the mechanical feedback loops triggered by newly introduced single-stock leveraged ETFs.
            </p>
          </div>
        </section>

        <InfographicSlot
          alt="Systemic Fragility &amp; Quantitative Contagion — 2026 Korean Equity Crisis Infographic"
        />

        {/* 2. Historical Context */}
        <section id="history">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Layers className="text-[#A8672E]" size={28} />
            2. Historical Context: A Legacy of Retail Leverage
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            To fully comprehend the fragility of the South Korean equity market in 2026, one must examine the preceding years of regulatory whiplash and retail speculation.
          </p>

          <div className="space-y-6 mt-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#A8672E]/30 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 bg-[#A8672E]/20 text-[#A8672E] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-bold text-sm">2023</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2 font-serif">The CFD Crisis</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base">A massive pump-and-dump scheme utilizing Contracts for Difference (CFDs) unraveled, wiping out 8.2 trillion won. Regulators responded with strict rules, inadvertently channeling retail speculation elsewhere.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 bg-[#A8672E]/20 text-[#A8672E] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-bold text-sm">2024</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2 font-serif">The ELS Saga</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base">Retail investors lost an estimated 4.6 trillion won on Equity-Linked Securities tied to plunging Chinese indices, proving a deep-seated structural appetite for complex derivatives.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 bg-[#A8672E]/20 text-[#A8672E] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-bold text-sm">2025</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2 font-serif">The Short-Selling Ban</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base">A 17-month blanket ban on short-selling removed a critical friction layer. Without short-sellers to stabilize the market, the AI rally steepened parabolically without structural resistance.</p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. AI Concentration */}
        <section id="ai-concentration">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Cpu className="text-[#A8672E]" size={28} />
            3. The 2026 AI Supercycle &amp; Index Concentration
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Historically, South Korean equities traded at a persistent discount relative to global peers (the &ldquo;Korean Discount&rdquo;). However, the AI revolution shifted global capital toward the physical infrastructure required to sustain computational workloads. High-Bandwidth Memory (HBM) emerged as the most critical bottleneck.
            </p>
            <p>
              <strong>SK Hynix</strong> and <strong>Samsung Electronics</strong> operated as the absolute vanguard of this supply chain. This semiconductor duopoly resulted in an extreme, historically unprecedented level of market concentration, rendering the entire market structurally brittle.
            </p>

            <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <table className="w-full text-left border-collapse bg-white dark:bg-gray-900">
                <caption className="bg-gray-50 dark:bg-gray-800 p-4 text-sm font-semibold text-slate-600 dark:text-slate-400 border-b border-gray-200 dark:border-gray-800">
                  Table 1: Extreme Concentration of Global Indices (Mid-2026)
                </caption>
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-slate-200">
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Market / Index</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Largest Constituent(s)</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Combined Index Weighting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 bg-[#A8672E]/5 dark:bg-[#A8672E]/10">
                    <td className="p-4 font-medium text-slate-900 dark:text-slate-100">South Korea (KOSPI)</td>
                    <td className="p-4">Samsung Electronics, SK Hynix</td>
                    <td className="p-4 font-bold text-[#A8672E]">&gt; 50.0%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium">Switzerland (SMI)</td>
                    <td className="p-4">Nestl&eacute;, Novartis, Roche</td>
                    <td className="p-4">~ 40.0%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium">United States (S&amp;P 500)</td>
                    <td className="p-4">Nvidia, Microsoft, Apple</td>
                    <td className="p-4">~ 20.0% (Top 3)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. Options Frenzy */}
        <section id="retail-leverage">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Zap className="text-[#A8672E]" size={28} />
            4. Options Frenzy &amp; Retail Leverage Accumulation
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              While the AI narrative provided the spark, the explosive velocity of the KOSPI&apos;s ascent was engineered by retail investors, colloquially known as &ldquo;ants.&rdquo; By May 2026, active trading accounts surpassed 105 million.
            </p>
            
            <div className="p-6 border rounded-2xl bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-900/50 text-orange-900 dark:text-orange-200 shadow-sm my-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]" />
                <h4 className="font-bold text-xl">The Margin Debt Bubble</h4>
              </div>
              <p>
                Outstanding broker margin financing balances reached a record high of approximately <strong>38.6 trillion won ($26 billion)</strong> by June 2026. This ecosystem of highly levered derivatives pushed implied volatility off the charts. The South Korean volatility index (VKOSPI) repeatedly spiked into extreme territory, climbing from the 50s to peak at approximately 89.
              </p>
            </div>

            <p>
              The extreme accumulation of retail leverage transformed the market into a fragile glass floor; it provided immense upward momentum, but virtually guaranteed an uncontrollable cascade of forced liquidations upon any downward price shock.
            </p>
          </div>
        </section>

        {/* 5. Catalyst */}
        <section id="etf-catalyst">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Calculator className="text-[#A8672E]" size={28} />
            5. Catalyst of Instability: Single-Stock Leveraged ETFs
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              The definitive tipping point occurred in late May 2026 with the regulatory approval of 16 domestic single-stock leveraged ETFs tied to Samsung Electronics and SK Hynix. Intended to repatriate capital from offshore markets, these 2x leveraged products were launched exactly as the market reached peak valuations and maximum volatility.
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100 font-serif">The Mathematics of Volatility Decay</h3>
            <p>
              2x leveraged ETFs are mathematically flawed as long-term investments in highly volatile environments due to negative compounding, known as &ldquo;volatility decay.&rdquo; The leverage ratio must reset daily, systematically eroding the Net Asset Value (NAV).
            </p>

            <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <table className="w-full text-left border-collapse bg-white dark:bg-gray-900">
                <caption className="bg-gray-50 dark:bg-gray-800 p-4 text-sm font-semibold text-slate-600 dark:text-slate-400 border-b border-gray-200 dark:border-gray-800">
                  Table 2: Theoretical Volatility Decay on a 2x Leveraged ETF
                </caption>
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-slate-200">
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Trading Day</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Stock Price</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Daily % Change</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">2x ETF % Change</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">2x ETF Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">Day 0 (Base)</td>
                    <td className="p-4">$100.00</td>
                    <td className="p-4">0.00%</td>
                    <td className="p-4">0.00%</td>
                    <td className="p-4">$100.00</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">Day 1</td>
                    <td className="p-4 text-[#1D8A70] font-medium">$130.00</td>
                    <td className="p-4 text-[#1D8A70] font-medium">+30.0%</td>
                    <td className="p-4 text-[#1D8A70] font-bold">+60.0%</td>
                    <td className="p-4 font-medium">$160.00</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">Day 2</td>
                    <td className="p-4 text-[#BC4128] font-medium">$100.00</td>
                    <td className="p-4 text-[#BC4128] font-medium">-23.1%</td>
                    <td className="p-4 text-[#BC4128] font-bold">-46.2%</td>
                    <td className="p-4 font-medium text-[#BC4128]">$86.08</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800 font-bold border-t-2 border-gray-300 dark:border-gray-700">
                    <td className="p-4">Net Result</td>
                    <td className="p-4">$100.00 (Flat)</td>
                    <td className="p-4">0.00%</td>
                    <td className="p-4 text-[#BC4128]">-13.92%</td>
                    <td className="p-4 text-[#BC4128]">$86.08</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 italic mt-2">
              *Note how the underlying stock returns to $100 (breakeven), but the 2x ETF investor permanently loses nearly 14% of their principal.
            </p>
          </div>
        </section>

        {/* 6. Quant Mechanics */}
        <section id="quant-mechanics">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Activity className="text-[#A8672E]" size={28} />
            6. Quantitative Mechanics &amp; Feedback Loops
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                <ArrowRight className="w-5 h-5 text-[#A8672E]" /> Daily Rebalancing
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                To maintain 2x leverage, ETFs must execute a mechanical strategy of <strong>buying high and selling low</strong> at the close of every session. A mere 5% swing in the underlying market triggered roughly $4.7 billion in mechanical rebalancing flows, forcefully dictating price action.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                <ArrowRight className="w-5 h-5 text-[#A8672E]" /> Short Gamma Hedging
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Dealers providing the total return swaps are placed in a &ldquo;short gamma&rdquo; position. As stock prices fall, dealers must mechanically short the underlying stock to maintain delta neutrality, causing further drops and more selling.
              </p>
            </div>

            <div className="md:col-span-2 bg-[#BC4128]/5 dark:bg-[#BC4128]/10 p-6 rounded-2xl border border-[#BC4128]/20">
              <h4 className="flex items-center gap-2 text-xl font-bold text-[#BC4128] mb-3">
                <AlertTriangle className="w-5 h-5" /> Algorithmic Trading &amp; The &ldquo;Sidecar&rdquo;
              </h4>
              <p className="text-slate-700 dark:text-slate-300">
                The sheer velocity of mechanical flows triggered automated market safeguards. The Korea Exchange &ldquo;sidecar&rdquo; (which suspends algorithmic trading) was triggered a staggering <strong>37 times</strong> by mid-July, vastly surpassing the record of 26 set during the entire 2008 global financial crisis.
              </p>
            </div>
          </div>
        </section>

        {/* 7. The Collapse */}
        <section id="collapse">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <TrendingDown className="text-[#BC4128]" size={28} />
            7. The Margin Call Storm &amp; July Collapse
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              In July 2026, the ecosystem transitioned rapidly from a euphoric rally into a vicious, self-sustaining deleveraging event.
            </p>
            
            <div className="my-6">
              <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">The Catalysts:</h4>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
                <li><strong>Bank of Korea Policy Action:</strong> Raised benchmark policy rate by 25 bps, increasing the cost of carrying margin debt.</li>
                <li><strong>Global Sell-Off:</strong> Deep doubts regarding the durability of AI capital expenditures began to surface globally.</li>
                <li><strong>Geopolitical Tensions:</strong> Middle East instability drove crude oil prices higher, threatening the energy-reliant South Korean economy.</li>
              </ul>
            </div>

            <div className="p-6 border rounded-2xl bg-[#BC4128]/10 border-[#BC4128]/30 text-[#BC4128] shadow-sm my-6">
              <div className="flex items-center gap-3 mb-3">
                <Info className="w-6 h-6 text-[#BC4128]" />
                <h4 className="font-bold text-xl text-[#BC4128]">The Liquidation Cascade</h4>
              </div>
              <p className="text-slate-900 dark:text-slate-100">
                Between July 1 and July 15, brokerages executed a staggering 512 billion KRW in forced reverse trades. More than <strong>1.2 million leveraged retail accounts</strong> triggered margin calls, and up to 360,000 accounts were completely liquidated. Roughly one in every 30 working-age adults in South Korea received a margin call. Both SK Hynix and Samsung suffered brutal drawdowns exceeding 30%.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Global Spillover */}
        <section id="spillover">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Globe className="text-[#A8672E]" size={28} />
            8. Global Spillover &amp; ADR Dislocation
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Amidst this domestic volatility, SK Hynix executed a highly anticipated $26.5 billion ADR listing on the U.S. Nasdaq&mdash;the second-largest U.S. equity offering in history. However, a catastrophic pricing dislocation occurred.
            </p>
            <p>
              While domestic margin calls forced Seoul-listed SK Hynix shares down 15%, the U.S. ADRs were heavily bought by institutions. Due to regulatory conversion limits, arbitrageurs could not close the gap, causing the ADR premium to surge over <strong>50% above the Seoul common stock</strong>.
            </p>
            <p>
              The contagion infected global markets. Algorithms identified the downward momentum, causing massive drops in peers like Kioxia (Japan) and TSMC (Taiwan), dragging the global Philadelphia Semiconductor Index (SOX) down 19%.
            </p>
          </div>
        </section>

        {/* 9. Factor Rotation */}
        <section id="factor-rotation">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Briefcase className="text-[#A8672E]" size={28} />
            9. Global Quantitative Factor Rotation
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              The crisis catalyzed a massive quantitative style rotation across Wall Street. Capital aggressively fled the crowded <strong>Momentum</strong> factor (high-beta AI winners) and systematically rotated into the <strong>Quality</strong> factor (the &ldquo;Quant Safety Trade&rdquo;).
            </p>

            <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <table className="w-full text-left border-collapse bg-white dark:bg-gray-900">
                <caption className="bg-gray-50 dark:bg-gray-800 p-4 text-sm font-semibold text-slate-600 dark:text-slate-400 border-b border-gray-200 dark:border-gray-800">
                  Table 3: Microstructural Contrast in Quantitative Styles (July 2026)
                </caption>
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-slate-200">
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Characteristic</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Momentum Factor (Pre-Crash)</th>
                    <th className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Quality Factor (The Rotation)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm sm:text-base">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Primary Alpha Driver</td>
                    <td className="p-4 text-[#BC4128]">Price strength over trailing 6&ndash;12 months</td>
                    <td className="p-4 text-[#1D8A70] font-medium">Corporate financial resilience, fundamental health</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Underlying Leverage</td>
                    <td className="p-4 text-[#BC4128]">High structural and systemic leverage</td>
                    <td className="p-4 text-[#1D8A70] font-medium">Low corporate debt, stable cash flows</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Crowding Risk</td>
                    <td className="p-4 text-[#BC4128]">Extremely high (High-beta AI consensus)</td>
                    <td className="p-4 text-[#1D8A70] font-medium">Low (Historically under-allocated)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Performance Profile</td>
                    <td className="p-4 text-[#BC4128]">Prone to violent, synchronized stop-outs</td>
                    <td className="p-4 text-[#1D8A70] font-medium">Defensive; isolates returns from directional panics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 10. Regulations */}
        <section id="regulations">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Shield className="text-[#A8672E]" size={28} />
            10. Regulatory Interventions
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Facing severe political pressure, the Financial Services Commission (FSC) implemented decisive measures to curb speculation without triggering an immediate liquidity vacuum:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4 mt-6">
              <li className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-start gap-3 shadow-sm">
                <div className="bg-[#A8672E]/10 p-1.5 rounded-lg mt-0.5"><Shield className="w-4 h-4 text-[#A8672E]" /></div>
                <span className="text-sm"><strong>Suspension of New Listings:</strong> Halted all approvals for new single-stock leveraged ETFs.</span>
              </li>
              <li className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-start gap-3 shadow-sm">
                <div className="bg-[#A8672E]/10 p-1.5 rounded-lg mt-0.5"><Calculator className="w-4 h-4 text-[#A8672E]" /></div>
                <span className="text-sm"><strong>Tripling Minimum Margin:</strong> Raised required cash balance to 30M won to price out undercapitalized speculators.</span>
              </li>
              <li className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-start gap-3 shadow-sm">
                <div className="bg-[#A8672E]/10 p-1.5 rounded-lg mt-0.5"><Activity className="w-4 h-4 text-[#A8672E]" /></div>
                <span className="text-sm"><strong>LP Accountability:</strong> Mandated strict management of ETF NAV tracking errors during stress.</span>
              </li>
              <li className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-start gap-3 shadow-sm">
                <div className="bg-[#A8672E]/10 p-1.5 rounded-lg mt-0.5"><BookOpen className="w-4 h-4 text-[#A8672E]" /></div>
                <span className="text-sm"><strong>Marketing Bans:</strong> Banned promotions and enforced mandatory risk education on volatility decay.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 11. Core Lessons */}
        <section id="lessons">
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <BarChart3 className="text-[#A8672E]" size={28} />
            11. Core Lessons for Quantitative Finance
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Leverage Distorts Fundamentals</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                The AI narrative was sound, and corporate earnings remained strong. But when market returns reflect the cost of sustaining margin debt rather than earnings, microstructural collapse is mathematically inevitable.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Concentration is Systemic Risk</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Permitting double-leveraged speculation on two stocks that control 50% of an index creates a synthetic weapon of mass financial destruction, rendering the entire national benchmark brittle.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Mechanical Overwhelm</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Daily rebalancing requirements and short gamma hedging created synthetic supply and demand that completely decoupled from actual asset value, crushing traditional fundamental analysis.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Dynamic Factor Modeling</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Crowded trades carry extreme asymmetric risk. Quantitative models must incorporate strict balance sheet parameters to pivot quickly to &ldquo;Quality&rdquo; factors and insulate portfolios against deleveraging spirals.
              </p>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
