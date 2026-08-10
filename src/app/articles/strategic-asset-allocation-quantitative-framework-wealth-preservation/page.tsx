'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ArrowLeft, TrendingUp, ShieldCheck, BarChart3, Globe, Coins, Scale, Briefcase, Building2, ArrowRightLeft, Info, ChevronRight, Calculator, Zap, Target, Compass, Layers, Percent, AlertTriangle, BookOpen, PieChart, Activity, ZapOff, UserCheck, Lock, Flame, Dna, History, FileText, Maximize2, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function StrategicAssetAllocationArticle() {
  return (
    <ArticleFrame slug="strategic-asset-allocation-quantitative-framework-wealth-preservation">
      <div className="max-w-6xl mx-auto font-sans bg-transparent">
        <div className="mt-8 mb-12">
          <InfographicSlot alt="Strategic Asset Allocation Framework Infographic" />
        </div>
        <main className="space-y-40">
          {/* Module 1: Human Capital & The Wealth Lifecycle */}
          <section id="objectives">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12">
              <div className="p-4 bg-[#A8672E] dark:bg-[#D08F52] rounded-2xl shadow-2xl shadow-indigo-100 flex-shrink-0">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <div>
                <span className="text-[#A8672E] dark:text-[#D08F52] font-bold uppercase tracking-widest text-xs">Module 01</span>
                <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 font-serif">Human Capital Analysis</h2>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-[#0A0D14] p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                  <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 underline decoration-indigo-200 decoration-4 font-serif">The "Total Wealth" Integration Framework</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    Your most significant asset is often your future earning potential. Strategic allocation requires balancing your <strong>Financial Assets</strong> against the risk profile of your <strong>Human Capital</strong>. The present value of your lifetime earnings typically represents 60-80% of total wealth for working professionals.
                  </p>
                  
                  {/* Human Capital Valuation Formula */}
                  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-3xl border border-indigo-100 mb-8">
                    <h4 className="text-sm font-bold text-[#A8672E] dark:text-[#D08F52] mb-3">Human Capital Present Value</h4>
                    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl font-mono text-sm text-[#A8672E] dark:text-[#D08F52] mb-4 text-center">
                      HC = Σ<sub>t=1</sub><sup>T</sup> [W<sub>t</sub> × (1 + g)<sup>t</sup>] / (1 + r)<sup>t</sup>
                    </div>
                    <p className="text-xs text-[#A8672E] dark:text-[#D08F52] leading-relaxed">
                      Where HC = Human Capital, W<sub>t</sub> = Current wage, g = wage growth rate, r = discount rate, T = working years remaining
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-slate-50 dark:bg-[#14171B] rounded-3xl border border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Industry Correlation Analysis</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        If you work in Tech, your human capital is highly correlated with the NASDAQ (ρ ≈ 0.7-0.8). SAA suggests <strong>underweighting</strong> Tech in your financial portfolio to avoid "Double-Jeopardy" risk.
                      </p>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex justify-between mb-1">
                          <span>Tech Workers → Underweight QQQ</span>
                          <span className="font-bold">-15%</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Finance → Underweight Financials</span>
                          <span className="font-bold">-10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Healthcare → Neutral XLV</span>
                          <span className="font-bold">0%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-[#14171B] rounded-3xl border border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Mortality & Disability Risk</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        Human capital is fragile and non-tradeable. Term life insurance acts as a "put option" on your human capital, allowing you to maintain an aggressive SAA for your financial capital.
                      </p>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex justify-between mb-1">
                          <span>Life Insurance Coverage</span>
                          <span className="font-bold">8-12x Income</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Disability Insurance</span>
                          <span className="font-bold">60-70% Income</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Emergency Fund</span>
                          <span className="font-bold">3-6 Months</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-6 rounded-3xl border border-rose-100">
                    <h4 className="text-sm font-bold text-[#BC4128] dark:text-[#E2694A] mb-3 flex items-center gap-2">
                      <History className="w-4 h-4" /> Sequence of Returns Risk: The Retirement Killer
                    </h4>
                    <p className="text-xs text-[#BC4128] dark:text-[#E2694A] leading-relaxed mb-4">
                      For retirees, the order of returns matters more than the average return. A 20% drop in Year 1 of retirement is mathematically devastating compared to a 20% drop in Year 20. This is due to the "reverse dollar-cost averaging" effect of withdrawals.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl">
                      <div className="text-xs text-[#BC4128] dark:text-[#E2694A] mb-2 font-bold">Portfolio Survival Rates (4% Withdrawal):</div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[#BC4128] dark:text-[#E2694A]">Bear Market Years 1-5:</span>
                          <span className="font-bold ml-2">67% Success</span>
                        </div>
                        <div>
                          <span className="text-[#1D8A70] dark:text-[#3CBF9C]">Bull Market Years 1-5:</span>
                          <span className="font-bold ml-2">96% Success</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#A8672E] dark:bg-[#D08F52] text-white p-10 rounded-[3rem] shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#A8672E] dark:text-[#D08F52] font-serif">
                    <Lock className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" /> Investment Policy Statement (IPS) Framework
                  </h3>
                  <p className="text-sm text-[#A8672E] dark:text-[#D08F52] mb-8 leading-relaxed">
                    Professional wealth management requires systematic constraints to prevent emotional decision-making during market stress. The IPS serves as your "constitutional document" for investment discipline.
                  </p>
                  <div className="grid md:grid-cols-3 gap-8 text-sm">
                    <div>
                      <span className="block text-[#A8672E] dark:text-[#D08F52] font-bold mb-2 uppercase text-[10px]">Liquidity Coverage Ratio</span>
                      <p className="text-[#A8672E] dark:text-[#D08F52] opacity-80 text-xs mb-3">
                        Maintain an LCR of &gt;1.2x annual cash outflow. This provides the behavioral fortitude to stay invested during crashes without forced selling.
                      </p>
                      <div className="bg-[#A8672E] dark:bg-[#D08F52]/50 p-3 rounded-xl">
                        <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mb-1">Formula:</div>
                        <div className="font-mono text-xs text-white">LCR = Cash / Annual Expenses</div>
                        <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mt-1">Target: 1.2 - 2.0</div>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[#A8672E] dark:text-[#D08F52] font-bold mb-2 uppercase text-[10px]">Tax-Loss Harvesting Budget</span>
                      <p className="text-[#A8672E] dark:text-[#D08F52] opacity-80 text-xs mb-3">
                        Determine your annual capacity for TLH. Active SAA generates gains; harvesting losses provides the "Tax Alpha" to offset realized gains.
                      </p>
                      <div className="bg-[#A8672E] dark:bg-[#D08F52]/50 p-3 rounded-xl">
                        <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mb-1">Annual Capacity:</div>
                        <div className="font-mono text-xs text-white">$3,000 + Carryforward</div>
                        <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mt-1">Tax Alpha: 0.5-1.2%</div>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[#A8672E] dark:text-[#D08F52] font-bold mb-2 uppercase text-[10px]">Concentration Risk Limits</span>
                      <p className="text-[#A8672E] dark:text-[#D08F52] opacity-80 text-xs mb-3">
                        Institutional-grade SAA caps single-security exposure at 5% to prevent idiosyncratic shocks from derailing the long-term plan.
                      </p>
                      <div className="bg-[#A8672E] dark:bg-[#D08F52]/50 p-3 rounded-xl">
                        <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mb-1">Maximum Limits:</div>
                        <div className="font-mono text-xs text-white">Single Stock: 5%</div>
                        <div className="font-mono text-xs text-white">Sector: 25%</div>
                        <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mt-1">Rebalance Trigger</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#0A0D14] border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] flex flex-col">
                <h3 className="text-xl font-bold mb-6 font-serif">Risk Tolerance Quantification</h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Professional SAA requires quantifying subjective risk preferences into objective portfolio constraints. These metrics drive asset allocation boundaries and rebalancing triggers.
                </p>
                <div className="space-y-8 flex-grow">
                  {[
                    { 
                      label: "Downside Sensitivity", 
                      val: 92, 
                      color: "bg-[#BC4128] dark:bg-[#E2694A]",
                      desc: "Maximum tolerable portfolio decline before panic selling"
                    },
                    { 
                      label: "Longevity Risk Concern", 
                      val: 55, 
                      color: "bg-[#A8672E] dark:bg-[#D08F52]",
                      desc: "Fear of outliving assets drives growth allocation need"
                    },
                    { 
                      label: "Inflation Protection Need", 
                      val: 78, 
                      color: "bg-amber-500",
                      desc: "Real purchasing power preservation requirement"
                    },
                    { 
                      label: "Liquidity Preference", 
                      val: 30, 
                      color: "bg-[#1D8A70] dark:bg-[#3CBF9C]",
                      desc: "Preference for liquid vs. illiquid alternative investments"
                    },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-slate-600 dark:text-slate-400">{stat.label}</span>
                        <span className="text-slate-900 dark:text-slate-100">{stat.val}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.val}%` }}></div>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">{stat.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 p-5 bg-slate-900 rounded-2xl">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">The Gamma Factor: Behavioral Alpha</h4>
                  <p className="text-[11px] text-slate-200 italic leading-relaxed mb-3">
                    "Gamma" is the value added by professional financial planning discipline. SAA plus systematic behavioral coaching typically adds 1.5% - 2.0% in annual net return through:
                  </p>
                  <div className="text-[10px] text-slate-300 space-y-1">
                    <div>• Rebalancing discipline: +0.35%</div>
                    <div>• Tax-loss harvesting: +0.75%</div>
                    <div>• Asset location optimization: +0.40%</div>
                    <div>• Behavioral coaching: +0.50%</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 2: Macro Regime Details */}
          <section id="macro">
            <div className="flex flex-col md:items-center text-center mb-16">
              <div className="p-4 bg-amber-500 rounded-2xl shadow-xl mb-6">
                <Compass className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tight font-serif">Macro-Regime Identification Framework</h2>
              <p className="text-slate-500 max-w-3xl font-medium leading-relaxed">
                Strategic allocation transcends static diversification by dynamically positioning across the growth-inflation matrix. Understanding regime transitions enables tactical tilts while maintaining strategic discipline.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-[#0A0D14] rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Activity className="w-24 h-24" />
                </div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 font-serif">
                  <TrendingUp className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C]" /> The Growth Regime Matrix
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Growth regimes are identified through leading indicators that signal economic expansion or contraction. Each regime favors different asset classes based on earnings sensitivity and duration characteristics.
                </p>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Environment</th>
                      <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Key Indicators</th>
                      <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Optimal Asset</th>
                      <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Expected Return</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-4 font-bold text-slate-800 dark:text-slate-200">Early Expansion</td>
                      <td className="py-4 text-slate-500 text-xs">PMI &gt;50, Steep Yield Curve, Credit Spreads Tightening</td>
                      <td className="py-4 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Small Cap Value (IWN)</td>
                      <td className="py-4 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">12-15%</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-slate-800 dark:text-slate-200">Late Cycle</td>
                      <td className="py-4 text-slate-500 text-xs">Tight Labor, Flat Curve, Rising Wages</td>
                      <td className="py-4 text-[#A8672E] dark:text-[#D08F52] font-bold">Quality Dividends (QUAL)</td>
                      <td className="py-4 text-[#A8672E] dark:text-[#D08F52] font-bold">8-10%</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-slate-800 dark:text-slate-200">Recession</td>
                      <td className="py-4 text-slate-500 text-xs">Rising Jobless, Inverted Curve, Credit Stress</td>
                      <td className="py-4 text-[#BC4128] dark:text-[#E2694A] font-bold">Long Treasuries (TLT)</td>
                      <td className="py-4 text-[#BC4128] dark:text-[#E2694A] font-bold">15-25%</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mt-6 p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-2xl border border-emerald-100">
                  <h4 className="text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Growth Regime Indicators Formula</h4>
                  <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-xl font-mono text-xs text-[#1D8A70] dark:text-[#3CBF9C] text-center mb-2">
                    Growth Score = 0.4×PMI + 0.3×(10Y-2Y) + 0.3×Credit_Spread_Δ
                  </div>
                  <p className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C]">Score &gt;60: Expansion | 40-60: Transition | &lt;40: Contraction</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#0A0D14] rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Flame className="w-24 h-24" />
                </div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 font-serif">
                  <Percent className="w-6 h-6 text-amber-500" /> The Inflation Regime Matrix
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Inflation regimes determine the real return environment and drive relative asset class performance. Understanding inflation dynamics is crucial for preserving purchasing power.
                </p>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Environment</th>
                      <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Key Indicators</th>
                      <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Optimal Asset</th>
                      <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Real Return</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-4 font-bold text-slate-800 dark:text-slate-200">Reflation</td>
                      <td className="py-4 text-slate-500 text-xs">Rising PPI, Output Gap Closes, Commodity Surge</td>
                      <td className="py-4 text-amber-600 font-bold">Commodities (DJP)</td>
                      <td className="py-4 text-amber-600 font-bold">8-12%</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-slate-800 dark:text-slate-200">Stagflation</td>
                      <td className="py-4 text-slate-500 text-xs">High CPI, Low Growth, Energy Shock</td>
                      <td className="py-4 text-yellow-600 font-bold">Gold (PHYS)</td>
                      <td className="py-4 text-yellow-600 font-bold">5-8%</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-slate-800 dark:text-slate-200">Disinflation</td>
                      <td className="py-4 text-slate-500 text-xs">Tech Productivity, Global Supply, Falling PPI</td>
                      <td className="py-4 text-[#A8672E] dark:text-[#D08F52] font-bold">Growth Stocks (QQQ)</td>
                      <td className="py-4 text-[#A8672E] dark:text-[#D08F52] font-bold">10-15%</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <h4 className="text-xs font-bold text-amber-900 mb-2">Inflation Regime Model</h4>
                  <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-xl font-mono text-xs text-amber-600 text-center mb-2">
                    Inflation Score = 0.5×CPI_YoY + 0.3×PPI_YoY + 0.2×Wage_Growth
                  </div>
                  <p className="text-[10px] text-amber-800">Score &gt;4%: High Inflation | 2-4%: Moderate | &lt;2%: Low Inflation</p>
                </div>
              </div>
            </div>
            
            {/* Regime Transition Framework */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Globe className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-slate-200 font-serif">The Four-Quadrant Regime Framework</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Ray Dalio's "All Weather" framework maps economic environments across growth and inflation dimensions. Each quadrant requires different asset allocation strategies to maintain real wealth preservation.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-6 bg-[#1D8A70] dark:bg-[#3CBF9C]/30 border border-[#1D8A70] dark:border-[#3CBF9C]/30 rounded-3xl">
                      <h4 className="text-lg font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Rising Growth + Low Inflation</h4>
                      <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mb-3">The "Goldilocks" environment favoring risk assets</p>
                      <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                        <div>• Stocks: 70% allocation</div>
                        <div>• Bonds: 20% allocation</div>
                        <div>• Commodities: 5% allocation</div>
                        <div>• Cash: 5% allocation</div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-[#BC4128] dark:bg-[#E2694A]/30 border border-[#BC4128] dark:border-[#E2694A]/30 rounded-3xl">
                      <h4 className="text-lg font-bold text-[#BC4128] dark:text-[#E2694A] mb-2">Falling Growth + Low Inflation</h4>
                      <p className="text-xs text-[#BC4128] dark:text-[#E2694A] mb-3">Deflationary environment favoring duration</p>
                      <div className="text-xs text-[#BC4128] dark:text-[#E2694A] space-y-1">
                        <div>• Long Bonds: 50% allocation</div>
                        <div>• Stocks: 30% allocation</div>
                        <div>• Cash: 15% allocation</div>
                        <div>• Commodities: 5% allocation</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-amber-900/30 border border-amber-700/30 rounded-3xl">
                      <h4 className="text-lg font-bold text-amber-400 mb-2">Rising Growth + High Inflation</h4>
                      <p className="text-xs text-amber-200 mb-3">Reflationary boom favoring real assets</p>
                      <div className="text-xs text-amber-100 space-y-1">
                        <div>• Commodities: 40% allocation</div>
                        <div>• Stocks: 35% allocation</div>
                        <div>• TIPS: 20% allocation</div>
                        <div>• Cash: 5% allocation</div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-yellow-900/30 border border-yellow-700/30 rounded-3xl">
                      <h4 className="text-lg font-bold text-yellow-400 mb-2">Falling Growth + High Inflation</h4>
                      <p className="text-xs text-yellow-200 mb-3">Stagflation requiring defensive positioning</p>
                      <div className="text-xs text-yellow-100 space-y-1">
                        <div>• Gold: 30% allocation</div>
                        <div>• Cash: 25% allocation</div>
                        <div>• TIPS: 25% allocation</div>
                        <div>• Defensive Stocks: 20% allocation</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl">
                  <h4 className="text-sm font-bold text-slate-300 mb-3">Regime Transition Signals</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-[#A8672E] dark:text-[#D08F52] font-bold">Leading Indicators (3-6 months):</span>
                      <div className="text-slate-300 mt-1">Yield curve, credit spreads, PMI, consumer confidence</div>
                    </div>
                    <div>
                      <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Coincident Indicators (0-3 months):</span>
                      <div className="text-slate-300 mt-1">Employment, industrial production, personal income</div>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold">Lagging Indicators (confirmation):</span>
                      <div className="text-slate-300 mt-1">CPI, unemployment rate, corporate profits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 3: Quantitative Methods (Enhanced Formulas) */}
          <section id="quant">
            <div className="flex items-center gap-6 mb-16">
              <div className="p-4 bg-[#A8672E] dark:bg-[#D08F52] rounded-2xl shadow-xl shadow-blue-100">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-serif">Portfolio Optimization Mathematics</h2>
                <p className="text-slate-500 font-medium">From Markowitz foundations to institutional-grade implementations.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Mean-Variance Optimization */}
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Layers className="w-20 h-20" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Mean-Variance Optimization (MVO)</h4>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  The foundational Markowitz framework. Solves for the portfolio with maximum expected return for a given risk level, or minimum risk for a target return.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-50 dark:bg-[#14171B] p-4 rounded-xl">
                    <div className="text-[10px] text-slate-400 mb-2 font-bold">OBJECTIVE FUNCTION:</div>
                    <div className="font-mono text-sm text-[#A8672E] dark:text-[#D08F52] text-center">
                      min ½w<sup>T</sup>Σw
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-[#14171B] p-4 rounded-xl">
                    <div className="text-[10px] text-slate-400 mb-2 font-bold">CONSTRAINTS:</div>
                    <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] space-y-1">
                      <div>μ<sup>T</sup>w = R<sub>target</sub> (return constraint)</div>
                      <div>1<sup>T</sup>w = 1 (budget constraint)</div>
                      <div>w ≥ 0 (long-only constraint)</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-xl border border-rose-100">
                  <p className="text-[10px] text-[#BC4128] dark:text-[#E2694A] font-bold uppercase tracking-wider mb-1">Critical Limitation</p>
                  <p className="text-[10px] text-[#BC4128] dark:text-[#E2694A] leading-relaxed">
                    MVO is an "error maximizer" - small estimation errors in μ or Σ lead to extreme, concentrated portfolios. Requires robust estimation techniques.
                  </p>
                </div>
              </div>
              
              {/* Black-Litterman Model */}
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-lg border-t-4 border-t-indigo-500">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Black-Litterman Model</h4>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  The institutional standard. Combines market equilibrium assumptions with investor views using Bayesian updating to produce stable, intuitive portfolios.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-xl">
                    <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mb-2 font-bold">EQUILIBRIUM RETURNS:</div>
                    <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] text-center">
                      Π = λΣw<sub>mkt</sub>
                    </div>
                  </div>
                  
                  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-xl">
                    <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mb-2 font-bold">POSTERIOR RETURNS:</div>
                    <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] text-center">
                      μ<sub>BL</sub> = [(τΣ)<sup>-1</sup> + P<sup>T</sup>Ω<sup>-1</sup>P]<sup>-1</sup>[(τΣ)<sup>-1</sup>Π + P<sup>T</sup>Ω<sup>-1</sup>Q]
                    </div>
                  </div>
                  
                  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-xl">
                    <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] mb-2 font-bold">POSTERIOR COVARIANCE:</div>
                    <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] text-center">
                      Σ<sub>BL</sub> = [(τΣ)<sup>-1</sup> + P<sup>T</sup>Ω<sup>-1</sup>P]<sup>-1</sup>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#A8672E] dark:bg-[#D08F52] p-4 rounded-xl">
                  <p className="text-[10px] text-[#A8672E] dark:text-[#D08F52] font-bold mb-1">Key Parameters:</p>
                  <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] space-y-1">
                    <div>τ = uncertainty scalar (0.01-0.05)</div>
                    <div>P = picking matrix (views)</div>
                    <div>Q = view portfolio returns</div>
                    <div>Ω = uncertainty of views</div>
                  </div>
                </div>
              </div>
              
              {/* Risk Parity */}
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Risk Parity Framework</h4>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Equalizes risk contribution rather than capital allocation. Each asset contributes equally to portfolio volatility, creating more balanced risk exposure.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-xl">
                    <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] mb-2 font-bold">RISK CONTRIBUTION:</div>
                    <div className="font-mono text-xs text-[#1D8A70] dark:text-[#3CBF9C] text-center">
                      RC<sub>i</sub> = w<sub>i</sub> × (Σw)<sub>i</sub> / σ<sub>p</sub>
                    </div>
                  </div>
                  
                  <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-xl">
                    <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] mb-2 font-bold">EQUAL RISK CONDITION:</div>
                    <div className="font-mono text-xs text-[#1D8A70] dark:text-[#3CBF9C] text-center">
                      RC<sub>i</sub> = 1/N × σ<sub>p</sub> ∀i
                    </div>
                  </div>
                  
                  <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-xl">
                    <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] mb-2 font-bold">OPTIMIZATION PROBLEM:</div>
                    <div className="font-mono text-xs text-[#1D8A70] dark:text-[#3CBF9C] text-center">
                      min Σ<sub>i</sub>[w<sub>i</sub>(Σw)<sub>i</sub> - (1/N)w<sup>T</sup>Σw]<sup>2</sup>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1D8A70] dark:bg-[#3CBF9C] p-4 rounded-xl">
                  <p className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] font-bold mb-1">Advantages:</p>
                  <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                    <div>• Diversification across risk sources</div>
                    <div>• Reduced concentration risk</div>
                    <div>• Inflation hedge properties</div>
                    <div>• Lower turnover than MVO</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advanced Implementation Challenges */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <BarChart3 className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 font-serif">Solving the "GIGO" Problem: Robust Estimation Techniques</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Garbage-In, Garbage-Out (GIGO) is the Achilles' heel of quantitative portfolio optimization. Small errors in expected returns (μ) or covariance estimates (Σ) can lead to wildly unstable portfolio weights. Institutional implementations employ sophisticated techniques to combat this.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl">
                      <h4 className="text-lg font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Shrinkage Estimators</h4>
                      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                        Shrink sample estimates toward a structured target to reduce estimation error. The Ledoit-Wolf shrinkage estimator is the industry standard.
                      </p>
                      <div className="bg-[#1D8A70] dark:bg-[#3CBF9C]/30 p-3 rounded-xl">
                        <div className="font-mono text-xs text-[#1D8A70] dark:text-[#3CBF9C] text-center mb-2">
                          Σ<sub>shrunk</sub> = αΣ<sub>sample</sub> + (1-α)Σ<sub>target</sub>
                        </div>
                        <p className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C]">α = optimal shrinkage intensity (0.2-0.8)</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl">
                      <h4 className="text-lg font-bold text-[#A8672E] dark:text-[#D08F52] mb-3">Resampled Efficiency</h4>
                      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                        Generate thousands of bootstrap samples from historical data, optimize each, then average the weights to create more stable portfolios.
                      </p>
                      <div className="bg-[#A8672E] dark:bg-[#D08F52]/30 p-3 rounded-xl">
                        <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] text-center mb-2">
                          w<sub>final</sub> = (1/M) Σ<sub>m=1</sub><sup>M</sup> w<sub>m</sub>*
                        </div>
                        <p className="text-[10px] text-[#A8672E] dark:text-[#D08F52]">M = number of bootstrap samples (1000+)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl">
                      <h4 className="text-lg font-bold text-amber-400 mb-3">Robust Optimization</h4>
                      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                        Explicitly model parameter uncertainty and optimize for worst-case scenarios within confidence intervals.
                      </p>
                      <div className="bg-amber-900/30 p-3 rounded-xl">
                        <div className="font-mono text-xs text-amber-300 text-center mb-2">
                          max<sub>w</sub> min<sub>μ∈U</sub> w<sup>T</sup>μ - λw<sup>T</sup>Σw
                        </div>
                        <p className="text-[10px] text-amber-200">U = uncertainty set for returns</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl">
                      <h4 className="text-lg font-bold text-purple-400 mb-3">Monte Carlo Stress Testing</h4>
                      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                        Test portfolio performance across 10,000+ simulated market scenarios to ensure survival in tail events.
                      </p>
                      <div className="bg-purple-900/30 p-3 rounded-xl">
                        <div className="text-[10px] text-purple-200 space-y-1">
                          <div>• 95% VaR: -12.5% (1-month)</div>
                          <div>• 99% CVaR: -18.3% (1-month)</div>
                          <div>• Max Drawdown: -35.2% (historical)</div>
                          <div>• Recovery Time: 18 months (median)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-[#A8672E] dark:border-[#D08F52]/30 rounded-3xl">
                  <h4 className="text-lg font-bold text-[#A8672E] dark:text-[#D08F52] mb-4">Implementation Reality Check</h4>
                  <div className="grid md:grid-cols-3 gap-6 text-xs">
                    <div>
                      <span className="text-[#A8672E] dark:text-[#D08F52] font-bold block mb-2">Transaction Costs</span>
                      <div className="text-slate-300 space-y-1">
                        <div>• Bid-ask spreads: 0.01-0.10%</div>
                        <div>• Market impact: 0.05-0.25%</div>
                        <div>• Timing costs: 0.02-0.15%</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-purple-400 font-bold block mb-2">Rebalancing Frequency</span>
                      <div className="text-slate-300 space-y-1">
                        <div>• Monthly: Higher costs, better tracking</div>
                        <div>• Quarterly: Balanced approach</div>
                        <div>• Threshold-based: Optimal efficiency</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold block mb-2">Tax Considerations</span>
                      <div className="text-slate-300 space-y-1">
                        <div>• Short-term gains: 37% tax rate</div>
                        <div>• Long-term gains: 20% tax rate</div>
                        <div>• Tax-loss harvesting: +0.75% alpha</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 4: The Asset Class Inventory - Enhanced */}
          <section id="assets">
            <div className="flex items-center gap-6 mb-16">
              <div className="p-4 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-2xl shadow-xl">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-serif">The Strategic Building Blocks</h2>
                <p className="text-slate-500 font-medium">From public market beta to institutional alternative alpha sources.</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-4 font-serif">Public Equity Factor Exposures</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Modern portfolio construction moves beyond market-cap weighting to systematic factor exposures. Each factor represents a distinct risk premium with different economic drivers.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-[#14171B] rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="block text-xs font-bold text-slate-400 uppercase">Value Factor (HML)</span>
                      <span className="text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C]">+3.2% Premium</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                      Book-to-market, earnings yield, cash flow yield. Historically higher returns than growth, but with significant tracking error and long drought periods.
                    </p>
                    <div className="text-[10px] text-slate-500 space-y-1">
                      <div>• Best implementation: VTV, VMOT, MTUM</div>
                      <div>• Time horizon required: 10+ years</div>
                      <div>• Volatility vs market: +2.5%</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-[#14171B] rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="block text-xs font-bold text-slate-400 uppercase">Momentum Factor (UMD)</span>
                      <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52]">+8.1% Premium</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                      6-12 month price momentum. Most robust factor premium globally, but requires high turnover and sophisticated implementation.
                    </p>
                    <div className="text-[10px] text-slate-500 space-y-1">
                      <div>• Best implementation: MTUM, VMOT, PDP</div>
                      <div>• Turnover: 50-100% annually</div>
                      <div>• Crash risk: -60% in 2009</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-[#14171B] rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="block text-xs font-bold text-slate-400 uppercase">Quality Factor</span>
                      <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52]">+2.8% Premium</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                      High ROE, low debt, stable earnings. The ultimate "defensive" equity exposure with lower volatility than the market.
                    </p>
                    <div className="text-[10px] text-slate-500 space-y-1">
                      <div>• Best implementation: QUAL, JQUA, SPHQ</div>
                      <div>• Beta to market: 0.85</div>
                      <div>• Recession protection: -25% vs -40%</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-[#14171B] rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="block text-xs font-bold text-slate-400 uppercase">Size Factor (SMB)</span>
                      <span className="text-xs font-bold text-amber-600">+1.9% Premium</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                      Small-cap premium has weakened since the 1980s but remains significant in international and emerging markets.
                    </p>
                    <div className="text-[10px] text-slate-500 space-y-1">
                      <div>• Best implementation: VB, IJR, VBR</div>
                      <div>• Liquidity risk: Higher bid-ask spreads</div>
                      <div>• Capacity constraints: $50B+ funds struggle</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-emerald-950 text-emerald-50 rounded-[3rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Building2 className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-[#1D8A70] dark:text-[#3CBF9C] font-serif">Institutional Alternative Investments</h3>
                  <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] mb-8 leading-relaxed">
                    Alternatives provide access to risk premiums unavailable in public markets: illiquidity premium, complexity premium, and crisis alpha. Institutional allocations typically range from 20-60% of total portfolio.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" /> Private Equity & Venture Capital
                      </h4>
                      <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]/70 leading-relaxed mb-4">
                        Leveraging governance improvements, operational expertise, and access to private markets. The illiquidity premium compensates for 7-10 year lock-ups.
                      </p>
                      <div className="bg-[#1D8A70] dark:bg-[#3CBF9C]/50 p-4 rounded-2xl">
                        <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                          <div>• Target allocation: 15-25% of portfolio</div>
                          <div>• Expected premium: +300-500 bps vs public</div>
                          <div>• J-curve effect: Negative returns years 1-3</div>
                          <div>• Vintage year diversification critical</div>
                          <div>• Access: $1M+ minimums typical</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" /> Managed Futures & Trend Following
                      </h4>
                      <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]/70 leading-relaxed mb-4">
                        "Crisis Alpha" strategies that profit from sustained trends in any direction. Provide portfolio insurance during equity bear markets and bond bear markets.
                      </p>
                      <div className="bg-[#1D8A70] dark:bg-[#3CBF9C]/50 p-4 rounded-2xl">
                        <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                          <div>• Target allocation: 5-15% of portfolio</div>
                          <div>• Crisis performance: +20-40% in 2008</div>
                          <div>• Correlation to stocks: -0.1 to +0.1</div>
                          <div>• Volatility: 15-25% annually</div>
                          <div>• Access: KMLM, DBMF, CTA funds</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" /> Real Estate & Infrastructure
                      </h4>
                      <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]/70 leading-relaxed mb-4">
                        Inflation-hedging assets with steady cash flows. REITs provide liquidity while direct ownership offers control and tax benefits.
                      </p>
                      <div className="bg-[#1D8A70] dark:bg-[#3CBF9C]/50 p-4 rounded-2xl">
                        <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                          <div>• Target allocation: 10-20% of portfolio</div>
                          <div>• Inflation beta: 0.6-0.8</div>
                          <div>• Yield: 3-6% current income</div>
                          <div>• Tax advantages: Depreciation, 1031 exchanges</div>
                          <div>• Access: VNQ, SCHH, direct ownership</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Scale className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" /> Hedge Funds & Liquid Alternatives
                      </h4>
                      <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]/70 leading-relaxed mb-4">
                        Skill-based strategies targeting absolute returns with lower correlation to traditional assets. Focus on market-neutral and arbitrage strategies.
                      </p>
                      <div className="bg-[#1D8A70] dark:bg-[#3CBF9C]/50 p-4 rounded-2xl">
                        <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                          <div>• Target allocation: 5-15% of portfolio</div>
                          <div>• Expected return: 6-10% absolute</div>
                          <div>• Volatility: 8-15% annually</div>
                          <div>• Fees: 2% mgmt + 20% performance</div>
                          <div>• Access: HFRI indices, liquid alts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-[#1D8A70] dark:bg-[#3CBF9C]/50 rounded-2xl border border-emerald-800">
                    <h4 className="text-sm font-bold text-[#1D8A70] dark:text-[#3CBF9C] uppercase mb-3">The Correlation Imperative</h4>
                    <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] italic leading-relaxed mb-4">
                      "The goal of alternatives isn't just high returns—it's <strong>Low Correlation</strong>. An asset with zero return but negative correlation to stocks during crashes is infinitely valuable for portfolio survival."
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-[10px] text-[#1D8A70] dark:text-[#3CBF9C]">
                      <div>
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">2008 Crisis Correlations:</span>
                        <div className="mt-1 space-y-1">
                          <div>Stocks vs Bonds: -0.4</div>
                          <div>Stocks vs Gold: -0.1</div>
                          <div>Stocks vs Managed Futures: -0.3</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">2022 Inflation Shock:</span>
                        <div className="mt-1 space-y-1">
                          <div>Stocks vs Bonds: +0.8</div>
                          <div>Stocks vs Commodities: +0.2</div>
                          <div>Bonds vs TIPS: -0.2</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Portfolio Implications:</span>
                        <div className="mt-1 space-y-1">
                          <div>Diversification ratio: 1.4x</div>
                          <div>Max drawdown reduction: 40%</div>
                          <div>Sharpe ratio improvement: +0.3</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fixed Income Deep Dive */}
            <div className="bg-white dark:bg-[#0A0D14] rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 font-serif">Fixed Income: The Ballast Asset Class</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Bonds serve multiple roles in strategic allocation: deflation hedge, liquidity source, and volatility dampener. Modern fixed income allocation requires understanding duration, credit, and inflation risks.
              </p>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="p-6 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-3xl border border-blue-100">
                  <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-3">Treasury Bonds</h4>
                  <p className="text-xs text-[#A8672E] dark:text-[#D08F52] mb-4 leading-relaxed">
                    The ultimate safe haven. Negative correlation to stocks during crises, but vulnerable to inflation and rising rates.
                  </p>
                  <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] space-y-1">
                    <div>• Duration: 2-30 years</div>
                    <div>• Credit risk: Zero</div>
                    <div>• Inflation risk: High</div>
                    <div>• Crisis performance: +20-30%</div>
                    <div>• Implementation: TLT, IEF, SHY</div>
                  </div>
                </div>
                
                <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
                  <h4 className="font-bold text-amber-900 mb-3">TIPS (Inflation-Protected)</h4>
                  <p className="text-xs text-amber-800 mb-4 leading-relaxed">
                    Principal adjusts with CPI, providing real return protection. Essential for long-term wealth preservation.
                  </p>
                  <div className="text-[10px] text-amber-700 space-y-1">
                    <div>• Real yield: 0.5-2.5%</div>
                    <div>• Inflation protection: 100%</div>
                    <div>• Deflation floor: Par value</div>
                    <div>• Tax inefficient: Phantom income</div>
                    <div>• Implementation: SCHP, VTIP, TIPS</div>
                  </div>
                </div>
                
                <div className="p-6 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-3xl border border-emerald-100">
                  <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Corporate Bonds</h4>
                  <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mb-4 leading-relaxed">
                    Credit spread premium over Treasuries. Higher yield but correlation to stocks increases during stress.
                  </p>
                  <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                    <div>• Credit spread: 50-500 bps</div>
                    <div>• Default risk: 0.1-5% annually</div>
                    <div>• Correlation to stocks: 0.2-0.6</div>
                    <div>• Yield advantage: +1-3%</div>
                    <div>• Implementation: LQD, VCIT, HYG</div>
                  </div>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-3xl border border-purple-100">
                  <h4 className="font-bold text-purple-900 mb-3">International Bonds</h4>
                  <p className="text-xs text-purple-800 mb-4 leading-relaxed">
                    Currency diversification and different monetary policy cycles. Hedged vs unhedged decision critical.
                  </p>
                  <div className="text-[10px] text-purple-700 space-y-1">
                    <div>• Currency risk: ±15% annually</div>
                    <div>• Yield differential: -2% to +3%</div>
                    <div>• Correlation benefit: 0.6 vs 0.9</div>
                    <div>• Hedging cost: 0.2-1.0%</div>
                    <div>• Implementation: BNDX, VTEB, BWX</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 5: The Strategic Case for Gold - Enhanced */}
          <section id="gold">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-yellow-500 rounded-2xl shadow-xl shadow-yellow-100">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-serif">Gold: The Monetary Metal in Portfolio Context</h2>
                <p className="text-slate-500 font-medium tracking-tight">Neutral reserve assets in a multipolar monetary system.</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-5 gap-8 items-start mb-12">
              <div className="lg:col-span-3 bg-white dark:bg-[#0A0D14] p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 font-serif">The Evolving Gold Thesis: From Inflation Hedge to Monetary Insurance</h3>
                <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    Historically, gold's primary driver was <strong>Real Interest Rates</strong> with a correlation of -0.6 to -0.8. When real yields rose, gold fell. However, this relationship has fundamentally shifted since 2022, driven by structural changes in the global monetary system.
                  </p>
                  
                  {/* Gold Valuation Model */}
                  <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100">
                    <h4 className="font-bold text-yellow-900 text-sm mb-3 uppercase tracking-wide">Traditional Gold Valuation Model</h4>
                    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl font-mono text-sm text-yellow-600 text-center mb-3">
                      Gold Price = f(Real Rates, USD Strength, Inflation Expectations, Risk Sentiment)
                    </div>
                    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl font-mono text-xs text-yellow-600 text-center mb-3">
                      ΔGold ≈ -2.5×ΔReal_Rates - 1.8×ΔDXY + 1.2×ΔInflation_Exp + 0.8×ΔVIX
                    </div>
                    <p className="text-xs text-yellow-800">
                      <strong>Model Breakdown (2022-2026):</strong> Traditional drivers explain only 40% of gold's variance vs 75% historically. New factors dominate.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                    <h4 className="font-bold text-amber-900 text-sm mb-2 uppercase tracking-wide">The De-Dollarization Structural Bid</h4>
                    <p className="text-xs text-amber-800 mb-4">
                      Central banks in the Global South are systematically reducing Treasury holdings in favor of "Outside Money" (gold) that cannot be weaponized, sanctioned, or seized. This creates a structural floor for gold prices independent of US monetary policy.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 uppercase block mb-1">Central Bank Purchases</span>
                        <div className="text-xs text-amber-800 space-y-1">
                          <div>2022: 1,136 tonnes (+152%)</div>
                          <div>2023: 1,037 tonnes (+14%)</div>
                          <div>2024: 800+ tonnes (est.)</div>
                          <div>China: 225 tonnes (18 months)</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 uppercase block mb-1">Reserve Diversification</span>
                        <div className="text-xs text-amber-800 space-y-1">
                          <div>USD reserves: 59% → 47%</div>
                          <div>Gold reserves: 11% → 17%</div>
                          <div>Target allocation: 20-25%</div>
                          <div>Annual flow: $100-150B</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div>
                        <span className="text-xs font-bold block">No Counterparty Risk</span>
                        <span className="text-[10px] text-slate-500">Bearer asset, no default risk</span>
                      </div>
                    </div>
                    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div>
                        <span className="text-xs font-bold block">Zero Duration Risk</span>
                        <span className="text-[10px] text-slate-500">No interest rate sensitivity</span>
                      </div>
                    </div>
                    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div>
                        <span className="text-xs font-bold block">Monetary Debasement Hedge</span>
                        <span className="text-[10px] text-slate-500">5,000 year track record</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-yellow-400 rounded-[3rem] p-10 text-yellow-950 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black mb-6 font-serif">Tax Optimization: The Hidden Alpha</h3>
                  <p className="text-sm mb-6 leading-relaxed font-medium">
                    Standard gold ETFs (GLD, IAU) are classified as "collectibles" under IRC Section 408(m), subjecting gains to the punitive 28% collectibles tax rate. This creates a massive drag on long-term wealth accumulation.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-yellow-950/10 rounded-2xl border border-yellow-950/20">
                      <span className="block text-[10px] font-bold uppercase mb-1">Standard Gold ETFs (GLD, IAU)</span>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-black">28% Tax Rate</span>
                        <span className="text-xs text-yellow-800">Collectibles Treatment</span>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-950/10 rounded-2xl border border-yellow-950/20">
                      <span className="block text-[10px] font-bold uppercase mb-1">Canadian Trust (PHYS) + QEF Election</span>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-black">15-20% Tax Rate</span>
                        <span className="text-xs text-yellow-800">Capital Gains Treatment</span>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-950/10 rounded-2xl border border-yellow-950/20">
                      <span className="block text-[10px] font-bold uppercase mb-1">Physical Gold (Coins/Bars)</span>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-black">28% Tax Rate</span>
                        <span className="text-xs text-yellow-800">+ Storage/Insurance Costs</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-950/20 p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-yellow-900 mb-2">Tax Alpha Calculation</h4>
                    <div className="text-[10px] text-yellow-800 space-y-1">
                      <div>Annual return assumption: 7%</div>
                      <div>Holding period: 20 years</div>
                      <div>Tax drag (GLD): -1.8% annually</div>
                      <div>Tax drag (PHYS+QEF): -0.6% annually</div>
                      <div><strong>Net tax alpha: +1.2% annually</strong></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-4 bg-white dark:bg-[#0A0D14]/20 rounded-2xl backdrop-blur-md">
                  <h4 className="text-[10px] font-black uppercase mb-2">Implementation Strategy</h4>
                  <p className="text-[11px] italic leading-relaxed font-medium mb-3">
                    Allocate 5-10% to Sprott Physical Gold Trust (PHYS) and file Form 8621 with QEF election. This transforms collectibles treatment into standard capital gains, capturing significant tax alpha over time.
                  </p>
                  <div className="text-[10px] text-yellow-900 space-y-1">
                    <div>• File Form 8621 by tax deadline</div>
                    <div>• Make QEF election in first year</div>
                    <div>• Report annual phantom income</div>
                    <div>• Harvest losses against gains</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gold in Portfolio Context */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Coins className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-slate-200 font-serif">Gold's Role in Modern Portfolio Theory</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Gold's portfolio benefits extend beyond inflation protection. It provides crisis alpha, currency debasement insurance, and tail risk hedging that becomes invaluable during "everything correlates to one" scenarios.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 bg-yellow-900/30 border border-yellow-700/30 rounded-3xl">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">Crisis Performance Analysis</h4>
                    <p className="text-xs text-yellow-200 mb-4">Gold's performance during major market dislocations</p>
                    <div className="text-xs text-yellow-100 space-y-2">
                      <div className="flex justify-between">
                        <span>2008 Financial Crisis:</span>
                        <span className="font-bold text-yellow-400">+5.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2020 COVID Crash:</span>
                        <span className="font-bold text-yellow-400">+24.6%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2022 Inflation Shock:</span>
                        <span className="font-bold text-yellow-400">+0.4%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Crisis Return:</span>
                        <span className="font-bold text-yellow-400">+10.3%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-amber-900/30 border border-amber-700/30 rounded-3xl">
                    <h4 className="text-lg font-bold text-amber-400 mb-3">Correlation Dynamics</h4>
                    <p className="text-xs text-amber-200 mb-4">Gold's correlation to major asset classes over time</p>
                    <div className="text-xs text-amber-100 space-y-2">
                      <div className="flex justify-between">
                        <span>vs S&P 500 (Normal):</span>
                        <span className="font-bold text-amber-400">+0.1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>vs S&P 500 (Crisis):</span>
                        <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C]">-0.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>vs 10Y Treasury:</span>
                        <span className="font-bold text-amber-400">-0.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>vs US Dollar:</span>
                        <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">-0.6</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-orange-900/30 border border-[#BC4128] dark:border-[#E2694A]/30 rounded-3xl">
                    <h4 className="text-lg font-bold text-[#BC4128] dark:text-[#E2694A] mb-3">Optimal Allocation Framework</h4>
                    <p className="text-xs text-orange-200 mb-4">Strategic allocation guidelines by investor profile</p>
                    <div className="text-xs text-orange-100 space-y-2">
                      <div className="flex justify-between">
                        <span>Conservative (Age 60+):</span>
                        <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">10-15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Moderate (Age 40-60):</span>
                        <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">5-10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Aggressive (Age 20-40):</span>
                        <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">2-5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Institutional Target:</span>
                        <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">7-12%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl">
                  <h4 className="text-sm font-bold text-slate-300 mb-4">The Monetary Debasement Thesis</h4>
                  <div className="grid md:grid-cols-2 gap-6 text-xs">
                    <div>
                      <span className="text-yellow-400 font-bold block mb-2">Historical Precedent:</span>
                      <div className="text-slate-300 space-y-1">
                        <div>• 1971 Nixon Shock: Gold +2,300% (1971-1980)</div>
                        <div>• 1970s Stagflation: Gold +24% CAGR</div>
                        <div>• 2000s QE Era: Gold +15% CAGR (2001-2011)</div>
                        <div>• 2020s Fiscal Dominance: Gold +8% CAGR</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-bold block mb-2">Current Environment:</span>
                      <div className="text-slate-300 space-y-1">
                        <div>• US Debt/GDP: 120% (vs 35% in 1980)</div>
                        <div>• Interest expense: $1T+ annually</div>
                        <div>• Fiscal dominance: Fed constrained by debt</div>
                        <div>• BRICS+ alternatives: Reducing USD dependence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 6: Implementation & Maintenance Alpha - Enhanced */}
          <section id="maintenance" className="pb-20">
            <div className="flex items-center gap-6 mb-16">
              <div className="p-4 bg-[#BC4128] dark:bg-[#E2694A] rounded-2xl shadow-xl shadow-rose-100">
                <ArrowRightLeft className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-serif">Implementation & Maintenance Alpha</h2>
                <p className="text-slate-500 font-medium tracking-tight">Systematic execution discipline for maximum after-tax, after-cost returns.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-[#0A0D14] p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 font-serif">
                  <PieChart className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]" /> Advanced Asset Location Strategy
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Asset location is the practice of placing investments in the most tax-efficient account type. This can add 0.75-1.5% in annual alpha through tax optimization without changing the underlying asset allocation.
                </p>
                
                <div className="space-y-6">
                  <div className="p-5 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-indigo-100 rounded-3xl">
                    <h4 className="text-sm font-bold text-[#A8672E] dark:text-[#D08F52] uppercase mb-3">Roth IRA: The Tax-Free Growth Engine</h4>
                    <p className="text-xs text-[#A8672E] dark:text-[#D08F52] leading-relaxed mb-4">
                      Place your highest-expected-return, highest-volatility assets here. Every dollar of growth is tax-free forever, making this the most valuable account for long-term wealth building.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-2xl">
                      <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] font-bold mb-2">OPTIMAL ASSETS:</div>
                      <div className="text-xs text-[#A8672E] dark:text-[#D08F52] space-y-1">
                        <div>• Small Cap Value (VBR): High expected return</div>
                        <div>• Emerging Markets (VWO): High volatility</div>
                        <div>• Growth Stocks (QQQ): Tax-inefficient distributions</div>
                        <div>• REITs (VNQ): High dividend yield</div>
                        <div>• Individual stocks: Concentration bets</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-amber-50 border border-amber-100 rounded-3xl">
                    <h4 className="text-sm font-bold text-amber-900 uppercase mb-3">Traditional 401(k)/IRA: The Yield Shield</h4>
                    <p className="text-xs text-amber-800 leading-relaxed mb-4">
                      Place high-yield, tax-inefficient assets here to shield ordinary income from current taxation. Avoid tax-advantaged assets like municipal bonds.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-2xl">
                      <div className="text-[10px] text-amber-600 font-bold mb-2">OPTIMAL ASSETS:</div>
                      <div className="text-xs text-amber-700 space-y-1">
                        <div>• TIPS (SCHP): Phantom income protection</div>
                        <div>• Corporate Bonds (LQD): Interest income</div>
                        <div>• High-Yield Bonds (HYG): Ordinary income</div>
                        <div>• Commodities (DJP): Tax-inefficient structure</div>
                        <div>• Active funds: High turnover</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-slate-50 dark:bg-[#14171B] border border-slate-100 dark:border-slate-800 rounded-3xl">
                    <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase mb-3">Taxable Accounts: The Alpha Generation Engine</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      The only account where you can harvest tax losses, hold tax-advantaged assets, and maintain liquidity. Focus on tax-efficient, broad-market exposure.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-2xl">
                      <div className="text-[10px] text-slate-500 font-bold mb-2">OPTIMAL ASSETS:</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <div>• Total Stock Market (VTI): Tax-efficient</div>
                        <div>• Municipal Bonds (VTEB): Tax-free income</div>
                        <div>• International Developed (VTIAX): Foreign tax credit</div>
                        <div>• I Bonds: Tax-deferred, inflation-protected</div>
                        <div>• Individual stocks: Tax-loss harvesting</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-5 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border border-rose-100 rounded-3xl">
                  <h4 className="text-sm font-bold text-[#BC4128] dark:text-[#E2694A] mb-3">Asset Location Alpha Calculation</h4>
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-2xl font-mono text-xs text-[#BC4128] dark:text-[#E2694A]">
                    <div className="text-center mb-2">Alpha = Σ[w<sub>i</sub> × (τ<sub>optimal</sub> - τ<sub>suboptimal</sub>) × r<sub>i</sub>]</div>
                    <div className="text-[10px] text-[#BC4128] dark:text-[#E2694A] text-center">
                      Where w = weight, τ = tax rate, r = expected return
                    </div>
                  </div>
                  <p className="text-xs text-[#BC4128] dark:text-[#E2694A] mt-3">
                    Typical alpha: 0.75-1.5% annually for high-income investors
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Activity className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 font-serif">The 5/25 Threshold Rebalancing System</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-8">
                    Don't rebalance based on arbitrary calendar dates. Rebalance based on <strong>statistical significance</strong> of allocation drifts. This reduces unnecessary turnover while maintaining risk control.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl text-center">
                      <span className="block text-4xl font-black text-[#BC4128] dark:text-[#E2694A] mb-2">±5%</span>
                      <span className="text-xs uppercase font-bold text-slate-400 block mb-2">Absolute Drift Trigger</span>
                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        When any asset class deviates by more than 5 percentage points from target allocation.
                      </p>
                      <div className="mt-3 p-3 bg-[#BC4128] dark:bg-[#E2694A]/20 rounded-xl">
                        <div className="text-[10px] text-[#BC4128] dark:text-[#E2694A] font-bold mb-1">Example:</div>
                        <div className="text-[10px] text-slate-400">Target: 60% Equity → Trigger: 65% or 55%</div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl text-center">
                      <span className="block text-4xl font-black text-[#1D8A70] dark:text-[#3CBF9C] mb-2">±25%</span>
                      <span className="text-xs uppercase font-bold text-slate-400 block mb-2">Relative Drift Trigger</span>
                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        When any asset class deviates by more than 25% of its target allocation.
                      </p>
                      <div className="mt-3 p-3 bg-[#1D8A70] dark:bg-[#3CBF9C]/20 rounded-xl">
                        <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] font-bold mb-1">Example:</div>
                        <div className="text-[10px] text-slate-400">Target: 10% Gold → Trigger: 12.5% or 7.5%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl">
                      <h4 className="text-sm font-bold text-[#A8672E] dark:text-[#D08F52] mb-3">Rebalancing Methodology</h4>
                      <div className="text-xs text-slate-300 space-y-2">
                        <div className="flex justify-between">
                          <span>1. Check allocations monthly</span>
                          <span className="text-[#A8672E] dark:text-[#D08F52]">Monitoring frequency</span>
                        </div>
                        <div className="flex justify-between">
                          <span>2. Calculate drift percentages</span>
                          <span className="text-[#A8672E] dark:text-[#D08F52]">|Current - Target|/Target</span>
                        </div>
                        <div className="flex justify-between">
                          <span>3. Identify trigger breaches</span>
                          <span className="text-[#A8672E] dark:text-[#D08F52]">5% absolute or 25% relative</span>
                        </div>
                        <div className="flex justify-between">
                          <span>4. Execute rebalancing trades</span>
                          <span className="text-[#A8672E] dark:text-[#D08F52]">Tax-aware implementation</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-3xl">
                      <h4 className="text-sm font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Tax-Aware Rebalancing Hierarchy</h4>
                      <div className="text-xs text-slate-300 space-y-2">
                        <div><span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">1st Priority:</span> New contributions/withdrawals</div>
                        <div><span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">2nd Priority:</span> Tax-advantaged accounts (401k, IRA)</div>
                        <div><span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">3rd Priority:</span> Harvest losses in taxable accounts</div>
                        <div><span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">4th Priority:</span> Realize gains only if necessary</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-rose-900/30 to-emerald-900/30 border border-[#BC4128] dark:border-[#E2694A]/30 rounded-3xl">
                    <h4 className="text-sm font-bold text-[#BC4128] dark:text-[#E2694A] uppercase mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Implementation Alpha Research
                    </h4>
                    <p className="text-xs text-slate-400 italic leading-relaxed mb-4">
                      "Vanguard research shows that threshold-based rebalancing outperforms calendar rebalancing by 0.35-0.40% annually through reduced transaction costs and improved tax efficiency."
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-[10px]">
                      <div>
                        <span className="text-[#BC4128] dark:text-[#E2694A] font-bold block mb-1">Calendar Rebalancing (Quarterly):</span>
                        <div className="text-slate-400 space-y-1">
                          <div>• Average trades per year: 4-6</div>
                          <div>• Unnecessary turnover: 35%</div>
                          <div>• Tax drag: -0.45% annually</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold block mb-1">Threshold Rebalancing (5/25):</span>
                        <div className="text-slate-400 space-y-1">
                          <div>• Average trades per year: 1-3</div>
                          <div>• Unnecessary turnover: 12%</div>
                          <div>• Tax drag: -0.15% annually</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tax-Loss Harvesting Deep Dive */}
            <div className="bg-white dark:bg-[#0A0D14] rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 font-serif">Tax-Loss Harvesting: The Systematic Alpha Generator</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Tax-loss harvesting (TLH) is the practice of selling securities at a loss to offset capital gains and reduce tax liability. When implemented systematically, it can generate 0.75-1.2% in annual alpha for high-income investors.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-3xl border border-blue-100">
                  <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-3">The Mathematics of TLH</h4>
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-2xl font-mono text-xs text-[#A8672E] dark:text-[#D08F52] text-center mb-4">
                    TLH Alpha = τ × Loss Rate × Deferral Period × r
                  </div>
                  <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52] space-y-1 mb-4">
                    <div>τ = marginal tax rate (37% + 3.8% NIIT)</div>
                    <div>Loss Rate = 15-25% of portfolio annually</div>
                    <div>Deferral = 5-15 years average</div>
                    <div>r = reinvestment return (7-10%)</div>
                  </div>
                  <div className="bg-[#A8672E] dark:bg-[#D08F52] p-3 rounded-xl">
                    <div className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52]">Typical Alpha: 0.75-1.2%</div>
                    <div className="text-[10px] text-[#A8672E] dark:text-[#D08F52]">Higher in volatile markets</div>
                  </div>
                </div>
                
                <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
                  <h4 className="font-bold text-amber-900 mb-3">Wash Sale Rule Compliance</h4>
                  <p className="text-xs text-amber-800 mb-4 leading-relaxed">
                    The wash sale rule disallows loss deductions if you buy a "substantially identical" security within 30 days before or after the sale.
                  </p>
                  <div className="text-[10px] text-amber-700 space-y-2">
                    <div><strong>Safe Substitutes:</strong></div>
                    <div>• VTI → SPTM (Total Market)</div>
                    <div>• VOO → SPLG (S&P 500)</div>
                    <div>• VEA → IEFA (Developed Markets)</div>
                    <div>• VWO → IEMG (Emerging Markets)</div>
                  </div>
                  <div className="mt-4 p-3 bg-amber-100 rounded-xl">
                    <div className="text-[10px] text-amber-800">
                      <strong>30-Day Rule:</strong> Wait 31 days before repurchasing or use permanent substitute
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-3xl border border-emerald-100">
                  <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Implementation Framework</h4>
                  <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] space-y-3">
                    <div>
                      <span className="font-bold block mb-1">Daily Monitoring:</span>
                      <span className="text-[10px]">Automated systems check for loss opportunities</span>
                    </div>
                    <div>
                      <span className="font-bold block mb-1">Threshold Triggers:</span>
                      <span className="text-[10px]">Harvest losses &gt;$1,000 or &gt;5% of position</span>
                    </div>
                    <div>
                      <span className="font-bold block mb-1">Reinvestment Speed:</span>
                      <span className="text-[10px]">Same-day reinvestment in substitute ETF</span>
                    </div>
                    <div>
                      <span className="font-bold block mb-1">Annual Capacity:</span>
                      <span className="text-[10px]">$3,000 ordinary income + unlimited capital gains offset</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-xl">
                    <div className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C]">
                      <strong>Robo-Advisors:</strong> Betterment, Wealthfront automate TLH for 0.25% fee
                    </div>
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