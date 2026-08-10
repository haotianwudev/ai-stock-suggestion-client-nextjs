'use client';

import React from 'react';
import {
  TrendingUp, TrendingDown,
  Globe, Activity, AlertTriangle, Clock, Zap, Target, BarChart3, ShieldAlert, Scale
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

const SLUG = 'structural-dynamics-us-dollar-hegemony-dedollarization-macro-strategy';

// --- Data ---
const dxyData = [
  { currency: "Euro", symbol: "EUR", weight: "57.60%", region: "Eurozone" },
  { currency: "Japanese Yen", symbol: "JPY", weight: "13.60%", region: "Asia-Pacific" },
  { currency: "British Pound", symbol: "GBP", weight: "11.90%", region: "Europe (Non-EU)" },
  { currency: "Canadian Dollar", symbol: "CAD", weight: "9.10%", region: "North America" },
  { currency: "Swedish Krona", symbol: "SEK", weight: "4.20%", region: "Europe (Non-EU)" },
  { currency: "Swiss Franc", symbol: "CHF", weight: "3.60%", region: "Europe (Non-EU)" },
];

const clockData = [
  { phase: "Reflation", trajectory: "Slowing", cpi: "Falling", asset: "Bonds (9.8%)", usd: "Cash yields plummet. The USD generally weakens as the central bank aggressively slashes short-term interest rates to stimulate demand, steepening the yield curve.", tone: "neutral" as const },
  { phase: "Recovery", trajectory: "Accelerating", cpi: "Falling", asset: "Equities (19.9%)", usd: "Cash returns are historically poor. Low inflation and loose monetary policy create a 'Goldilocks' environment where risk assets thrive, suppressing defensive dollar demand.", tone: "neutral" as const },
  { phase: "Overheat", trajectory: "Accelerating", cpi: "Rising", asset: "Commodities (19.7%)", usd: "The framework explicitly dictates an 'underweight' allocation to the U.S. dollar. Funds rotate capital into Asian and emerging market currencies to capture superior growth differentials.", tone: "neutral" as const },
  { phase: "Stagflation", trajectory: "Slowing", cpi: "Rising", asset: "Cash / USD (-0.3%)", usd: "Cash and the USD become the 'best of a bad bunch' as collapsing corporate margins destroy equities and persistent inflation prevents central banks from cutting rates. The USD thrives as a defensive safe haven.", tone: "pos" as const },
];

export default function USDollarArticle() {
  return (
    <ArticleFrame slug={SLUG}>
      <div className="pb-24">
        <InfographicSlot alt="U.S. Dollar Structural Dynamics Infographic" />
        
        <main className="max-w-4xl mx-auto py-16">

          {/* Section 1: Foundation */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Foundation: Conflicting Paradigms</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The trajectory of the U.S. dollar is governed by a highly complex, continuously evolving interplay of structural capital flows, relative macroeconomic performance, and systemic geopolitics. Within contemporary macroeconomic theory, two diametrically opposed frameworks attempt to forecast its long-term structural path.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Dollar Milkshake Theory" tone="pos">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Inevitable, crisis-driven dollar appreciation.</p>
                </div>
                <ul className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong className="text-slate-900 dark:text-white">Global Liquidity (Milkshake):</strong> Decades of global easing created massive liquidity.</li>
                  <li><strong className="text-slate-900 dark:text-white">USD (Straw):</strong> U.S. capital markets siphon liquidity into dollar assets.</li>
                  <li><strong className="text-slate-900 dark:text-white">Eurodollar Squeeze:</strong> Credit contractions force a scramble for physical dollars, driving the USD upward.</li>
                </ul>
              </ComparisonCard>

              <ComparisonCard title="De-dollarization Thesis" tone="neg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A]" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Structural decay and systemic collapse.</p>
                </div>
                <ul className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong className="text-slate-900 dark:text-white">Triffin's Dilemma:</strong> Inescapable conflict between domestic objectives and international obligations.</li>
                  <li><strong className="text-slate-900 dark:text-white">Industrial Erosion:</strong> Structural overvaluation taxes U.S. exports and subsidizes imports.</li>
                  <li><strong className="text-slate-900 dark:text-white">Geopolitical Shifts:</strong> BRICS nations actively developing non-dollar payment infrastructures.</li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>

            <p className="mt-8 text-slate-600 dark:text-slate-400 leading-relaxed p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              These frameworks yield contradictory predictions because they weigh capital flow vectors fundamentally differently: immediate survival and liquidity (Milkshake) versus long-term structural transitions and friction absorption (De-dollarization).
            </p>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 2: Measurement */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Measurement Mechanics: Indices & Alternatives</h2>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Translating macroeconomic theories into strategy requires precise instrumentation. However, the ubiquitous retail benchmark—the U.S. Dollar Index (DXY)—suffers from profound structural limitations.
            </p>

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 mb-8">
              <h4 className="text-indigo-900 dark:text-indigo-300 font-bold mb-2">The Problem with the DXY</h4>
              <p className="text-indigo-800 dark:text-indigo-200 text-sm leading-relaxed">Designed in 1973 and last updated in 1999 (for the Euro), the DXY heavily over-represents European economies while entirely ignoring modern supply chain giants like China and Mexico.</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 mb-10">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                    <th className="p-4 border-b border-slate-200 dark:border-slate-800">Component Currency</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">ISO</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Weighting</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Region</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
                  {dxyData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                      <td className="p-4 font-medium text-slate-900 dark:text-white">{row.currency}</td>
                      <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">{row.symbol}</td>
                      <td className="p-4 border-l border-slate-200 dark:border-slate-800">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-1 px-2 rounded font-mono text-xs">{row.weight}</span>
                      </td>
                      <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">{row.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Institutional Alternatives</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Globe className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1 shrink-0" size={22} />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-2">Fed's Broad Trade-Weighted Dollar Index</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Bifurcated into Advanced Foreign Economies (AFE) and Emerging Market Economies (EME) to isolate European divergence from EM capital flight.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Activity className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1 shrink-0" size={22} />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-2">Bloomberg U.S. Dollar Spot Index (BBDXY)</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Dynamically rebalanced annually based on trade volume and FX liquidity. Accurately captures USMCA trade (CAD, MXN) and Asian influence (JPY, CNH, KRW, INR).</p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 3: Quantitative Frameworks */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Quantitative Forecasting Frameworks</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Institutional analysts synthesize multiple models to forecast USD trajectory. These are categorized into four distinct pillars.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="1. Interest Rate Differentials" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">The most immediate, high-beta determinant. Driven by the "carry factor," incentivizing capital to borrow in low-yielding currencies to invest in high-yielding USD assets.</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 text-center">
                  ln(S_T) = a + b(i_{"{f,T}"} - i_{"{d,T}"}) + [ln(k_f) - ln(k_d)]
                </div>
              </ComparisonCard>
              <ComparisonCard title="2. Balance of Payments (BOP)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Evaluates structural international transactions. Short-term: deficits financed by foreign accumulation. Long-term: massive outflow obligations force severe exchange rate depreciation.</p>
              </ComparisonCard>
              <ComparisonCard title="3. Purchasing Power Parity (PPP)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">The fundamental mean-reverting anchor. While poor for daily forecasting, it becomes highly predictive over 12-48 months. Incorporates "sticky-price" models for short-term deviations.</p>
              </ComparisonCard>
              <ComparisonCard title="4. High-Frequency Flow Data" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Utilizes Treasury International Capital (TIC) reports to track foreign demand. <br/><span className="italic mt-2 block">Note: Analysts now track massive $1.4T systemic anomalies tied to Cayman Islands repo exposure.</span></p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 4: Strategy */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Strategy: Global Macro Execution</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Global macro hedge funds deploy sophisticated instruments to express directional views, applying algorithmic discipline to entry triggers and position sizing.
            </p>

            <div className="space-y-8">
              {/* Bullish */}
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] border-y border-r border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 font-serif">
                    <TrendingUp className="text-[#1D8A70] dark:text-[#3CBF9C] w-6 h-6" /> Long USD Playbook
                  </h3>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded text-xs font-bold tracking-wider">BULLISH</span>
                </div>
                <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong className="text-slate-900 dark:text-white block mb-1">Triggers:</strong> Divergence in central bank policy (e.g., Fed holds restrictive, ECB cuts). DXY breaks multi-year resistance with MACD confirmation.</li>
                  <li><strong className="text-slate-900 dark:text-white block mb-1">Execution:</strong> Front-month ICE DXY futures. OTC FX forwards (Buy USD/Sell EUR) locking in covered interest parity. Retail uses UUP ETF.</li>
                  <li><strong className="text-slate-900 dark:text-white block mb-1">Risk Mgmt:</strong> Volatility-adjusted sizing based on DXY standard deviation. Stop-loss at 1.5-sigma move against position or close below 200-DMA.</li>
                </ul>
              </div>

              {/* Bearish */}
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border-l-4 border-[#BC4128] dark:border-[#E2694A] border-y border-r border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 font-serif">
                    <TrendingDown className="text-[#BC4128] dark:text-[#E2694A] w-6 h-6" /> Short USD Playbook
                  </h3>
                  <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 px-3 py-1 rounded text-xs font-bold tracking-wider">BEARISH</span>
                </div>
                <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong className="text-slate-900 dark:text-white block mb-1">Triggers:</strong> DXY fails decade-long resistance (e.g., 107.00) with RSI divergence. Transatlantic yield spread narrows.</li>
                  <li><strong className="text-slate-900 dark:text-white block mb-1">Execution:</strong> Daily breakdown of market structure (Head & Shoulders). Purchase EUR/USD Call options to limit downside to premium. Long EEM ETF (EM equities out-perform in bear USD).</li>
                  <li><strong className="text-slate-900 dark:text-white block mb-1">Correlation Sizing:</strong> Basket approach (Long EUR/USD, Long Gold, Short USD/CAD). Formula applied: <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200 text-xs">Adjusted Size = Base Size * (1 - Correlation)</code>.</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 5: Risk */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The 'Widow-Maker' Trade</h2>
            </div>
            
            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-6 rounded-r-xl mb-8">
              <p className="text-rose-900 dark:text-rose-200 font-medium leading-relaxed">The greatest peril is successfully identifying a structural truth but catastrophically misjudging the timing. Fighting a dominant dollar trend prematurely earns the contrarian short dollar position the moniker of a "widow-maker" trade.</p>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">Similar to the historical Japanese Government Bond (JGB) shorts—where funds accurately predicted mathematical unsustainability but were crushed by decades of infinite quantitative easing—shorting the USD carries amplified systemic risks.</p>
            
            <ul className="space-y-4 mb-8">
              <li className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm">
                <strong className="text-slate-900 dark:text-white block mb-1">Behavioral Refusal:</strong> 
                <span className="text-slate-600 dark:text-slate-400">Foreign investors refuse to hedge USD exposures during rallies due to loss aversion, creating structural momentum that defies rational models.</span>
              </li>
              <li className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm">
                <strong className="text-slate-900 dark:text-white block mb-1">1980s Volcker Shock:</strong> 
                <span className="text-slate-600 dark:text-slate-400">Aggressive hikes caused a 44% USD appreciation. The trend only reversed via direct political intervention (1985 Plaza Accord), long after early fundamental bears were wiped out.</span>
              </li>
              <li className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm">
                <strong className="text-slate-900 dark:text-white block mb-1">2002-2008 Decline:</strong> 
                <span className="text-slate-600 dark:text-slate-400">Investors clinging to the late-90s exceptionalism paradigm suffered as the USD entered a prolonged structural decline.</span>
              </li>
            </ul>

            <div className="bg-slate-900 dark:bg-slate-100 p-6 rounded-xl text-center">
              <p className="font-semibold text-white dark:text-slate-900 dark:text-slate-100">
                Lesson: Fundamental unsustainability does not preclude medium-term strength. Negative carry can bankrupt an institution before reality materializes.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 6: Investment Clock */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Historical Evidence: The Investment Clock</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              To mitigate timing risks, allocators use the Merrill Lynch Investment Clock. It segments the business cycle based on the OECD output gap and CPI inflation.
            </p>

            <ComparisonGrid>
              {clockData.map((data, idx) => (
                <ComparisonCard key={idx} title={data.phase} tone={data.tone}>
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex gap-2">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-mono">Growth: {data.trajectory}</span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-mono">CPI: {data.cpi}</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Asset</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{data.asset}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{data.usd}</p>
                </ComparisonCard>
              ))}
            </ComparisonGrid>

            <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800/50">
              <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
                The dollar thrives as a defensive asset in the <strong>Stagflation</strong> quadrant. Synchronized global growth (Recovery/Overheat) reliably diminishes dollar dominance as capital seeks risk assets abroad.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 7: Modern Extensions */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Modern Extensions (2026–2030)</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Three structural catalysts are actively shifting the long-term dollar model horizon.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-serif">
                  <Zap className="text-[#A8672E] dark:text-[#D08F52] w-5 h-5 shrink-0" />
                  AI-Driven Reshoring
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Challenging the industrial decay narrative, $2.9T in projected AI CapEx (by 2026) is driving "U.S. exceptionalism." High productivity gains keep domestic rates elevated, supporting a tech-driven USD bull cycle.</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-serif">
                  <Globe className="text-[#A8672E] dark:text-[#D08F52] w-5 h-5 shrink-0" />
                  BRICS & Project mBridge
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">A DLT platform bypassing SWIFT. Managed by central banks (China, UAE, etc.), its EVM compatibility enables smart contracts. Reduces transactional friction binding emerging markets to the USD.</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-serif">
                  <Activity className="text-[#BC4128] dark:text-[#E2694A] w-5 h-5 shrink-0" />
                  Fed Balance Sheet
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">CBO projects deficit at $3.1T and debt at 120% of GDP by 2036. The Fed cannot simultaneously maintain a small balance sheet, low rate volatility, and minimal market intervention. Fiscal dominance risks severe USD devaluation.</p>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 8: Synthesis */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Synthesis & Leading Indicators</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The USD outlook is a tug-of-war between profound short-term strength (Milkshake Theory: inelastic demand, Eurodollar system, AI exceptionalism) and long-term systemic fragility (De-dollarization: Triffin's Dilemma, massive debt, mBridge adoption). To navigate the treacherous timing, monitor these high-frequency mechanical indicators:
            </p>

            <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <div className="p-6 border-b border-slate-800 bg-slate-950/50">
                <h4 className="font-bold text-white flex items-center gap-2 text-lg">
                  <Target className="text-[#1D8A70] dark:text-[#3CBF9C]" /> Regime Shift Indicator Checklist
                </h4>
              </div>
              <div className="divide-y divide-slate-800/50">
                <div className="p-6 grid md:grid-cols-3 gap-6 hover:bg-slate-800/20 transition-colors">
                  <div className="md:col-span-1">
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold uppercase tracking-wider block mb-1">Cross-Border Funding</span>
                    <strong className="text-slate-200 text-sm">TIC Form SLT Data / Foreign Treasury Demand</strong>
                  </div>
                  <div className="md:col-span-2 text-slate-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-6">
                    A sudden, sustained collapse in foreign private Treasury purchases signals a structural evaporation of offshore dollar demand and waning confidence in U.S. fiscal sustainability.
                  </div>
                </div>
                
                <div className="p-6 grid md:grid-cols-3 gap-6 hover:bg-slate-800/20 transition-colors">
                  <div className="md:col-span-1">
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold uppercase tracking-wider block mb-1">Geopolitical Settlement</span>
                    <strong className="text-slate-200 text-sm">Transaction Volume on the mBridge Ledger</strong>
                  </div>
                  <div className="md:col-span-2 text-slate-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-6">
                    Accelerating daily transaction value via EVM-compatible CBDC ledgers indicates the successful, functional adoption of bilateral settlement outside of Western SWIFT architecture.
                  </div>
                </div>
                
                <div className="p-6 grid md:grid-cols-3 gap-6 hover:bg-slate-800/20 transition-colors">
                  <div className="md:col-span-1">
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold uppercase tracking-wider block mb-1">Monetary Divergence</span>
                    <strong className="text-slate-200 text-sm">US 2-Year vs. German 2-Year Sovereign Yield Spread</strong>
                  </div>
                  <div className="md:col-span-2 text-slate-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-6">
                    A sustained narrowing of the transatlantic yield differential removes the vital 'carry factor,' incentivizing systematic macro funds to rapidly unwind long-USD momentum positions.
                  </div>
                </div>
                
                <div className="p-6 grid md:grid-cols-3 gap-6 hover:bg-slate-800/20 transition-colors">
                  <div className="md:col-span-1">
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold uppercase tracking-wider block mb-1">Fiscal Dominance</span>
                    <strong className="text-slate-200 text-sm">Federal Reserve Reverse Repo (RRP) Facility Levels</strong>
                  </div>
                  <div className="md:col-span-2 text-slate-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-6">
                    A total depletion of the RRP facility combined with an abrupt cessation of Quantitative Tightening (QT) indicates the Fed is actively forced to inject liquidity to prevent Treasury market dysfunction.
                  </div>
                </div>

                <div className="p-6 grid md:grid-cols-3 gap-6 hover:bg-slate-800/20 transition-colors">
                  <div className="md:col-span-1">
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold uppercase tracking-wider block mb-1">Behavioral Positioning</span>
                    <strong className="text-slate-200 text-sm">Foreign Institutional Currency Hedge Ratios</strong>
                  </div>
                  <div className="md:col-span-2 text-slate-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-6">
                    A rapid spike in hedging by foreign investors marks the psychological capitulation necessary to transition from a bull to a bear cycle.
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}
