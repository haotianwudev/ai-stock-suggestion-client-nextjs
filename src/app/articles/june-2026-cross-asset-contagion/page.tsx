'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';
import { 
  TrendingDown, 
  Globe, 
  Rocket, 
  Brain, 
  Coins, 
  ShieldAlert, 
  Activity, 
  BarChart3, 
  Info,
  Zap,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';

const fedDotPlotData = [
  { year: 'End of 2026', march: 0, june: 3.80 },
  { year: 'End of 2027', march: 3.30, june: 3.60 },
  { year: 'End of 2028', march: 3.00, june: 3.40 },
  { year: 'Longer-run', march: 2.50, june: 3.10 },
];

const bitcoinLiquidationData = [
  { time: 'June 3 (Pre-crash)', price: 67000 },
  { time: 'June 4 (Drop)', price: 63000 },
  { time: 'June 5 (Cascade)', price: 59100 },
];

export default function ArticlePage() {
  return (
    <ArticleFrame slug="june-2026-cross-asset-contagion">
      <div className="pb-24">
        <InfographicSlot alt="The June 2026 Cross-Asset Contagion Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Executive Overview */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <p className="text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  In June 2026, global financial markets underwent a violent and highly synchronized deleveraging event that indiscriminately targeted historically uncorrelated asset classes. 
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  To the untrained observer, the simultaneous collapse of a traditional safe-haven commodity, a highly speculative digital asset, and foundational fixed-income instruments appeared contradictory. However, a rigorous structural analysis reveals that this cross-asset liquidation was the result of a precise convergence of macroeconomic shocks and market microstructure vulnerabilities.
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
                      <div>
                        <strong className="block text-white mb-1">Gold</strong>
                        Plunged below the $4,000 threshold, entering a bear market down over 25% from its peak.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <div>
                        <strong className="block text-white mb-1">Bitcoin</strong>
                        Collapsed from $67,000 to $59,100 within 48 hours, erasing tens of billions in capital.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <div>
                        <strong className="block text-white mb-1">Treasury Bonds</strong>
                        Yield on the U.S. 10-year Treasury note spiked to 4.54% amid intense selling pressure.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* The Macroeconomic Crucible */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Globe className="size-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Macroeconomic Crucible</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6 min-w-0">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-serif">Fed's Hawkish Paradigm Shift</h3>
                <div className="prose prose-lg text-slate-600 dark:text-slate-400">
                  <p>
                    The June 2026 Federal Open Market Committee (FOMC) meeting marked a stark paradigm shift for U.S. monetary policy. Chair Kevin Warsh implemented a drastic departure from the communication strategies of his predecessors. 
                  </p>
                  <p>
                    While the FOMC unanimously voted to hold the federal funds rate steady at 3.50% to 3.75%, the true market shock was delivered via the central bank's forward guidance. The updated Summary of Economic Projections (SEP) revealed a distinctly hawkish shift.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 h-80 min-w-0">
                <h4 className="text-center font-bold text-slate-700 dark:text-slate-300 mb-6 text-sm uppercase tracking-wider">Federal Reserve SEP Dot Plot (Median Expectations)</h4>
                <div className="h-full w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fedDotPlotData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5}/>
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} unit="%" />
                      <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                      <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
                      <Bar dataKey="march" name="March Projection" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="june" name="June Projection" fill="#A8672E" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 min-w-0">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Info size={20} className="text-[#A8672E] dark:text-[#D08F52]" /> 
                The Geopolitical Resolution
              </h4>
              <div className="space-y-4 text-slate-600 dark:text-slate-400">
                <p>
                  Compounding the monetary policy shock was a sudden and dramatic shift in global geopolitics. On June 17, 2026, a diplomatic breakthrough was achieved. The U.S. and Iran electronically signed a 14-point interim Memorandum of Understanding (MoU).
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><strong>Immediate Ceasefire:</strong> Permanent halt to military operations.</li>
                  <li><strong>Strait of Hormuz Reopening:</strong> Immediate toll-free reopening for 60 days.</li>
                  <li><strong>Sanctions Waiver:</strong> 60-day U.S. Treasury waiver for Iranian crude oil.</li>
                </ul>
                <p className="mt-4 text-sm font-semibold italic text-slate-700 dark:text-slate-300">
                  Result: Brent crude oil plummeted, and the geopolitical risk premium that artificially inflated gold and energy evaporated entirely.
                </p>
              </div>
            </div>
          </section>

          {/* The Catalyst of Equities */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Rocket className="size-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Catalyst of Equities</h2>
            </div>
            
            <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none">
              <p>
                While macroeconomic forces altered risk pricing, the immediate trigger for the synchronized cross-asset liquidation originated in equity markets. A convergence of extreme capital concentration, a historic liquidity vacuum, and failing AI momentum engineered a structural shock.
              </p>

              <div className="my-12 p-10 bg-[#14171B] dark:bg-[#05070A] text-white rounded-3xl shadow-xl min-w-0 border border-slate-800">
                <h3 className="text-2xl font-bold flex items-center gap-3 mb-6 text-white font-serif">
                  <Zap className="text-[#A8672E] dark:text-[#D08F52]" /> The SpaceX IPO Megashock
                </h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  On June 12, 2026, SpaceX debuted on the Nasdaq (SPCX). The offering achieved an implied valuation of $1.77 trillion, with strong demand pushing the company's market capitalization to an unprecedented $2.1 trillion.
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                    <strong className="block text-[#D08F52] mb-2 font-bold text-lg">Retail Liquidity Drain</strong>
                    <span className="text-sm text-slate-300 leading-relaxed block">Absorbed ~$15 billion in retail capital in a single session, starving cryptocurrencies and high-beta assets of marginal liquidity.</span>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                    <strong className="block text-[#D08F52] mb-2 font-bold text-lg">Forced Passive Selling</strong>
                    <span className="text-sm text-slate-300 leading-relaxed block">Nasdaq's "Fast Entry" rule forced passive index funds to indiscriminately sell existing technology constituents to fund mandatory SPCX allocations.</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-4 font-serif">The AI Capex Bubble &amp; Semiconductor Capitulation</h3>
              <p>
                The liquidity drain orchestrated by the SpaceX IPO coincided disastrously with a fundamental reality check. Broadcom issued revenue guidance missing Wall Street estimates by a staggering $1.2 billion.
              </p>
              <p>
                Investors suddenly recognized a terrifying asymmetry: while hundreds of billions were deployed into physical silicon, downstream software revenue was severely lagging. A brutal rotation out of momentum technology stocks ensued, with the Philadelphia Semiconductor Index (SOX) plummeting 10.3% in a single session.
              </p>
            </div>
          </section>

          {/* The Microstructure Breakdown */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Brain className="size-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Microstructure Breakdown</h2>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 min-w-0">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-3 font-serif">
                <TrendingDown className="text-[#BC4128] dark:text-[#E2694A]"/> Quant Winter &amp; CTAs
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                To comprehend why gold, Bitcoin, and commodities collapsed simultaneously with tech equities, one must examine the opaque plumbing of modern financial markets: <strong>systematic, algorithmically driven quantitative funds.</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg">1. The Volatility Trigger</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">The 10.3% drop in semiconductors caused the VIX to surge abruptly. This volatility shock acted as a mechanical trigger across the quantitative landscape.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg">2. Illiquid Equity Markets</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Funds were unable to efficiently offload their equity positions without incurring massive slippage due to vanishing bids.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg">3. Indiscriminate Selling</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">To meet margin calls and balance risk, algorithms turned to their most liquid and profitable alternative assets: Gold, Copper, and Bitcoin.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8 min-w-0">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-rose-900 dark:text-rose-300">
                <ShieldAlert size={20} className="text-[#BC4128] dark:text-[#E2694A]" /> 
                Private Credit Contagion
              </h4>
              <p className="text-rose-800 dark:text-rose-200/80 leading-relaxed">
                The demand for liquidity exposed rot within private credit. As NAV confidence eroded, investors rushed for exits. The resulting wave of redemption requests forced credit funds to enact redemption gates or conduct fire sales, amplifying broader market panic.
              </p>
            </div>
          </section>

          {/* Asset-Specific Analysis */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Gold */}
              <div className="min-w-0">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-md">
                     <Coins className="size-5" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-serif">Gold &amp; Hard Assets</h3>
                 </div>
                 <div className="prose prose-slate text-slate-600 dark:text-slate-400">
                   <p>
                     The aggressive liquidation of gold, driving prices below $4,000 per ounce, exhibits classic signs of a technical overshoot driven by algorithmic selling rather than a fundamental breakdown.
                   </p>
                   <ul className="list-disc pl-5 space-y-2 mt-4">
                     <li><strong>Technical Extremes:</strong> The Gold Cycle Indicator plunged to 37, its most oversold reading since Oct 2023.</li>
                     <li><strong>Macro Reassessment:</strong> Goldman Sachs downgraded their target to $4,900 due to rate-cut removals, while J.P. Morgan maintained a $6,000 target citing structural inflation.</li>
                     <li><strong>Structural Floor:</strong> Sovereign debt levels and central bank buying provide a formidable floor. Cycle analysis suggests a bottom forming in the $3,900-$4,000 range.</li>
                   </ul>
                 </div>
              </div>

              {/* Bitcoin */}
              <div className="min-w-0">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-md">
                     <BarChart3 className="size-5" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-serif">Bitcoin &amp; Digital Assets</h3>
                 </div>
                 <div className="prose prose-slate text-slate-600 dark:text-slate-400 mb-6">
                   <p>
                     The quantitative deleveraging event was highly destructive in crypto markets, triggering a textbook "liquidation cascade."
                   </p>
                 </div>
                 
                 <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-64 mb-6 min-w-0">
                    <h4 className="text-center font-bold text-slate-600 dark:text-slate-400 mb-4 text-xs uppercase tracking-wider">BTC Price Capitulation (June 2026)</h4>
                    <div className="h-full w-full min-w-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={bitcoinLiquidationData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" strokeOpacity={0.5}/>
                          <XAxis dataKey="time" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
                          <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                          <Line type="monotone" dataKey="price" stroke="#BC4128" strokeWidth={3} dot={{r: 6, fill: '#BC4128'}} activeDot={{r: 8}} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-6 min-w-0">
                   <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-2 flex items-center gap-2 text-sm">
                     The Strategy Inc. Shock
                   </h4>
                   <p className="text-sm text-rose-800 dark:text-rose-200/80 leading-relaxed">
                     The capitulation was exacerbated by a psychological shock: Strategy Inc. (formerly MicroStrategy) sold 32 BTC. While statistically microscopic (0.0038% of holdings), it shattered the "never sell" psychological narrative that anchored retail sentiment.
                   </p>
                 </div>
              </div>
            </div>
          </section>

          {/* Strategic Outlook */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <ComparisonGrid>
              <ComparisonCard
                title="Equities & Broader Economy"
                type="neg"
                items={[
                  "Structurally Incomplete: The equity correction appears to be in nascent stages.",
                  "Market breadth is at historical extremes (only 56% of S&P 500 above 200-day MA).",
                  "Seasonality, midterm elections, and the 'Divergence Conundrum' of higher structural inflation pose massive, persistent risks to corporate earnings."
                ]}
              />
              <ComparisonCard
                title="Digital Assets & Commodities"
                type="pos"
                items={[
                  "Nearing the Terminal Phase: Speculative excess has been largely cleared.",
                  "Technical and on-chain models suggest a highly probable target support zone for Bitcoin between $50,000 and $55,000.",
                  "Gold has established a definitive floor in the $3,900-$4,000 range. Attractive long-term entry points are forming."
                ]}
              />
            </ComparisonGrid>

            <div className="mt-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl min-w-0">
              <p className="text-slate-800 dark:text-slate-200 italic font-medium text-xl text-center leading-relaxed">
                "In this new macroeconomic regime, static allocation models and blind reliance on momentum are demonstrably obsolete. In moments of systemic stress, cross-asset correlations inevitably converge to one."
              </p>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
