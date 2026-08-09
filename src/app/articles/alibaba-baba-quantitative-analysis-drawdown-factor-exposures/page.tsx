'use client';

import React from 'react';
import { TrendingDown, Activity, AlertTriangle, ShieldAlert, BarChart3, BookOpen, Globe, DollarSign, Percent, Info, ChevronRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine } from 'recharts';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

// --- Data Models based on the Quantitative Report ---
const shortVolumeData = [
  { date: 'Jun 3', total: 3.08, short: 0.99, ratio: 32.35 },
  { date: 'Jun 4', total: 3.04, short: 1.39, ratio: 45.64 },
  { date: 'Jun 5', total: 4.74, short: 1.73, ratio: 36.52 },
  { date: 'Jun 8', total: 3.82, short: 1.81, ratio: 47.46 },
  { date: 'Jun 9', total: 5.48, short: 3.57, ratio: 65.20 }, // Shock event
  { date: 'Jun 10', total: 4.73, short: 2.80, ratio: 59.36 },
];

const fundamentalData = [
  { metric: 'Quick Commerce Rev', FY25: 53.4, FY26: 78.5 },
  { metric: 'Adjusted EBITA', FY25: 31.8, FY26: 5.1 },
  { metric: 'Free Cash Flow', FY25: 73.9, FY26: -46.6 },
];

export default function BabaQuantAnalysisApp() {
  return (
    <ArticleFrame 
      slug="alibaba-baba-quantitative-analysis-drawdown-factor-exposures"
      additionalDisclaimer="This analysis is provided for educational and informational purposes only. It is not investment advice, and should not be construed as a recommendation to buy or sell any security. Past performance does not guarantee future results. All investments carry risk, including the potential loss of principal. Please consult with a qualified financial advisor before making any investment decisions."
    >
      <div className="pb-24">
        <InfographicSlot alt="Alibaba Quantitative Analysis Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Executive Synthesis */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Executive Synthesis &amp; Theoretical Framework</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  As of the mid-point of June 2026, Alibaba Group Holding Limited (NYSE: BABA) has endured a severe, multi-sigma equity drawdown, plunging to multi-year pricing floors. By the close of the trading session on June 16, 2026, the equity registered a year-to-date decline of ~23.82%, punctuated by an anomalous eight-day consecutive losing streak.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Within quantitative finance, price action of this magnitude cannot be wholly attributed to systematic market beta. It represents a catastrophic confluence of three distinct drivers.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h2 className="font-serif text-xl flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                    Key Catalysts
                  </h2>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <div>
                        <strong className="block text-white mb-1">Geopolitical Shocks</strong>
                        Severe idiosyncratic risk premiums applied suddenly.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <div>
                        <strong className="block text-white mb-1">Factor Deterioration</strong>
                        Contraction in capital efficiency and free cash flow factors.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <div>
                        <strong className="block text-white mb-1">Toxic Microstructure</strong>
                        Predatory algorithmic shorting and delta-hedging loops.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Return Modeling */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Statistical Return Modeling &amp; Alpha Decay</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              To isolate systematic market risk from idiosyncratic risk, we model the equity's daily returns against a representative sector benchmark, the KraneShares CSI China Internet ETF (KWEB).
            </p>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6 font-serif">The Mechanics of Corporate Action Adjustments</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              A foundational requirement is adjusting the empirical price time-series for the June 11, 2026 ex-dividend date ($1.05 per ADS). Failing to adjust for this structural price drop introduces spurious volatility.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 min-w-0">
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6 font-serif">Drawdown (June 2 - 16)</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-400">Raw Nominal Drawdown</span>
                    <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">-15.72%</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-400">Dividend-Adjusted Drawdown</span>
                    <span className="font-bold text-amber-500">-14.92%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-600 dark:text-slate-400">KWEB Benchmark Drawdown</span>
                    <span className="font-bold text-blue-500">-7.70%</span>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-3xl p-8 flex flex-col justify-center min-w-0">
                <Info className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <p className="text-indigo-900 dark:text-indigo-200/80 leading-relaxed">
                  "Even after meticulously accounting for the dividend, BABA deeply underperformed its sector benchmark by approximately 7.22% over an extraordinarily brief ten-session window."
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6 font-serif">OLS Regression &amp; Volatility Divergence</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              An Ordinary Least Squares (OLS) linear regression was applied to the daily dividend-adjusted returns.
            </p>

            <div className="bg-slate-50 dark:bg-slate-900 py-6 px-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex justify-center mb-10 overflow-x-auto min-w-0">
              <InlineMath math="R_{\text{BABA\_adj}, t} = \alpha + \beta \times R_{\text{KWEB}, t} + \epsilon_t" />
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-10 min-w-0">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-gray-900">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Parameter</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-600 dark:text-slate-400">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">Beta <span className="font-serif italic">(β)</span></td>
                    <td className="px-6 py-4">0.8281</td>
                    <td className="px-6 py-4">p = 0.0098</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">Alpha <span className="font-serif italic">(α)</span></td>
                    <td className="px-6 py-4 text-[#BC4128] dark:text-[#E2694A] font-bold">-0.0073 (-73 bps)</td>
                    <td className="px-6 py-4">p = 0.1710</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">R-squared <span className="font-serif italic">(R²)</span></td>
                    <td className="px-6 py-4">0.5420</td>
                    <td className="px-6 py-4">F-stat = 10.65</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">Idiosyncratic Volatility</td>
                    <td className="px-6 py-4">22.92%</td>
                    <td className="px-6 py-4">Annualized</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8 min-w-0">
              <h4 className="text-lg font-bold text-rose-900 dark:text-rose-300 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" />
                Statistical Significance
              </h4>
              <p className="text-rose-800 dark:text-rose-200/80 leading-relaxed">
                The Z-score for the BABA adjusted drawdown registered at -2.1088 standard deviations. A directional move exceeding two negative standard deviations over a 10-day window indicates a fat-tail liquidity event driven by exogenous shocks.
              </p>
            </div>
          </section>

          {/* Geopolitical Risk */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Geopolitical Risk Premium</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The primary exogenous catalyst was a severe geopolitical shock. On June 8, 2026, the Pentagon released an updated Section 1260H "Chinese Military Companies" (CMC) list, adding Alibaba Group.
            </p>

            <div className="bg-[#14171B] dark:bg-[#05070A] p-8 md:p-10 rounded-3xl border border-slate-800 relative overflow-hidden min-w-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl" />
              <h4 className="text-xl font-bold text-white mb-4 font-serif relative z-10">Repricing the Cost of Capital</h4>
              <p className="text-slate-300 text-lg leading-relaxed relative z-10 mb-6">
                While fundamental cash-flow impact is immaterial (BABA lacks DoD contracts), in quant portfolio management, this designation is an early-warning signaling mechanism. It forces mechanical divestment from institutional asset managers bound by ESG and sovereign compliance frameworks to avoid future OFAC/CFIUS entanglement.
              </p>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl inline-block relative z-10">
                <strong className="text-[#A8672E] dark:text-[#D08F52]">Result:</strong> <span className="text-slate-200">The market priced in an immediate spike in the illiquidity premium, ignoring positive catalysts like the Qwen-Robot Suite launch.</span>
              </div>
            </div>
          </section>

          {/* Market Microstructure */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Market Microstructure &amp; Order Flow</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
              How institutional hedging and algorithmic statistical arbitrage manifested in dark pools during the acute crash phase.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 font-serif">Off-Exchange Short Volume</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              On June 9, the first full session post-DoD announcement, off-exchange short volume exploded to 65.20%. Algorithms detect institutional block-selling in dark pools and aggressively short across venues to front-run the liquidation.
            </p>

            <div className="h-[400px] w-full bg-slate-50 dark:bg-slate-900 p-4 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mb-10 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={shortVolumeData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.2} vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: '#64748b', fontSize: 12}} 
                    label={{ value: 'Volume (M)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12, dx: -10 }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: '#d97706', fontSize: 12}} 
                    label={{ value: 'Short Ratio %', angle: 90, position: 'insideRight', fill: '#d97706', fontSize: 12, dx: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                  <Bar yAxisId="left" dataKey="total" name="Total Vol (M)" fill="#94a3b8" fillOpacity={0.4} radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="short" name="Short Vol (M)" fill="#475569" radius={[4, 4, 0, 0]} />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="ratio" 
                    name="Short Ratio %" 
                    stroke="#d97706" 
                    strokeWidth={3} 
                    dot={{r: 4, fill: '#d97706', strokeWidth: 2, stroke: '#fff'}} 
                    activeDot={{r: 6}}
                  />
                  <ReferenceLine 
                    yAxisId="right" 
                    y={50} 
                    stroke="#ef4444" 
                    strokeDasharray="3 3" 
                    strokeOpacity={0.7}
                    label={{ position: 'top', value: 'Toxic Threshold (50%)', fill: '#ef4444', fontSize: 12, fontWeight: 600 }} 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-3xl p-8 min-w-0">
              <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                Options Gamma Feedback Loop
              </h4>
              <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">
                Market makers sold downside puts to institutions seeking insurance. To remain delta-neutral, market makers shorted BABA. As the price fell, short gamma accelerated, forcing larger mechanical shorting. Expected statistical moves (±4.5%) were violently breached.
              </p>
            </div>
          </section>

          {/* Factor Rotation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Fundamental Factor Rotation: The Value Trap</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Underlying factor scores—Quality, Profitability, and ROIC—deteriorated, stripping away the valuation floor.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 items-center min-w-0">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-serif">The Pivot to Asset-Heavy Logistics</h4>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  FY26 showed a severe cash burn directly attributable to the pivot from high-margin software to capital-intensive physical infrastructure. Aggregate free cash flow swung violently. The $1.5B bidding war for Pupu (grocery delivery) cements this value destruction.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Lower ROIC:</strong> Plummeted to a meager 0.35%.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Margin Attrition:</strong> EBITA for quick commerce fell 84%.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Regulatory Caps:</strong> SAMR warnings limit upside of price wars.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 h-[350px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={fundamentalData} 
                    layout="vertical" 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#cbd5e1" strokeOpacity={0.2}/>
                    <XAxis type="number" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis 
                      dataKey="metric" 
                      type="category" 
                      width={130} 
                      tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <Tooltip 
                      cursor={{fill: '#e2e8f0', opacity: 0.4}} 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }}/>
                    <Bar dataKey="FY25" name="FY 2025 (RMB Bn)" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={20}/>
                    <Bar dataKey="FY26" name="FY 2026 (RMB Bn)" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Macro & Fixed Income Grid */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-8 min-w-0">
              
              {/* Macro Regime */}
              <div className="bg-white dark:bg-[#05070A] rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col min-w-0">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center gap-4">
                  <Globe className="text-[#1D8A70] dark:text-[#3CBF9C] w-6 h-6" />
                  <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Macro Regimes</h2>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Pricing of ADRs is intrinsically linked to sovereign interest rate policies and capital flight dynamics.
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mb-6 mt-auto">
                    <div className="flex justify-between items-end mb-3">
                      <span className="font-bold text-slate-800 dark:text-slate-200">US-China Yield Spread</span>
                      <span className="text-3xl font-black text-[#BC4128] dark:text-[#E2694A] tracking-tighter">-2.74%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden flex mb-3">
                      <div className="bg-slate-400 dark:bg-slate-500 h-full" style={{width: '72%'}}></div>
                      <div className="bg-[#BC4128] dark:text-[#E2694A] h-full" style={{width: '28%'}}></div>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
                      <span>US 10Y: 4.49%</span>
                      <span>CN 10Y: 1.74%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    Interest rate parity dictates this induces capital flight. The offshore Chinese Yuan (CNH) faces depreciation pressure, providing a mechanical headwind for ADRs.
                  </p>
                </div>
              </div>

              {/* Fixed Income */}
              <div className="bg-white dark:bg-[#05070A] rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col min-w-0">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center gap-4">
                  <DollarSign className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                  <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Fixed Income Markets</h2>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-semibold">
                    Is this a solvency crisis or an equity valuation contraction?
                  </p>
                  
                  <ul className="space-y-6 mb-8 mt-auto">
                    <li className="flex gap-4 items-start">
                      <div className="mt-1 bg-green-50 dark:bg-green-950/30 p-2 rounded-xl border border-green-200 dark:border-green-900/50">
                        <Percent className="w-4 h-4 text-green-600 dark:text-green-500" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 dark:text-white mb-1">Bonds Pricing Above Par</strong>
                        <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Alibaba's 2030 corporate paper yields less than the U.S. 10-Year risk-free rate, indicating immense confidence in balance sheet integrity.</span>
                      </div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="mt-1 bg-indigo-50 dark:bg-indigo-950/30 p-2 rounded-xl border border-indigo-200 dark:border-indigo-900/50">
                        <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-500" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 dark:text-white mb-1">No Default Signals</strong>
                        <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Credit Default Swaps (CDS) have not exhibited blowouts.</span>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-900/50 text-sm font-semibold">
                    Conclusion: The firm remains highly solvent. The drawdown is strictly a repricing of the equity risk premium.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quantitative Outlook */}
          <section className="py-16">
            <div className="bg-gradient-to-br from-slate-900 to-[#14171B] text-slate-100 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden min-w-0">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-5 pointer-events-none">
                <Activity size={300} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white relative z-10 font-serif">Quantitative Outlook</h2>
              <div className="space-y-6 text-slate-300 relative z-10 text-lg md:text-xl font-light leading-relaxed">
                <p>
                  Alibaba's current suffering is the mathematically expected outcome of a highly toxic intersection of variables. The equity is being violently repriced from an asset-light technology monopoly to an asset-heavy, heavily regulated utility in a hostile geopolitical environment.
                </p>
                <p>
                  Until there is a structural mean-reversion in the US-China sovereign yield spread, regulatory easing in retail margins, or a complete absorption of forced 1260H institutional selling, algorithmic models dictate the path of least resistance remains constrained with elevated downside volatility.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
