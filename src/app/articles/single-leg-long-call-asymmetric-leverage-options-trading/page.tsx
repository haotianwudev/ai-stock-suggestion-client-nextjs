'use client';

import React, { useState } from 'react';
import { TrendingUp, Shield, Users, Target, Zap, Activity, AlertTriangle, BarChart2, BarChart, DollarSign, Clock, ArrowRight, Percent, TrendingDown, CheckCircle, XCircle, AlertCircle, Layers, Search, PieChart } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable Components ---
interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  colorClass: string;
}

const SectionHeader = ({ icon: Icon, title, subtitle, colorClass }: SectionHeaderProps) => (
  <div className="mb-10 border-l-4 border-current pl-6 py-2" style={{ color: colorClass }}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2.5 rounded-xl bg-opacity-10 shadow-sm`} style={{ backgroundColor: colorClass }}>
        <Icon className="w-7 h-7 text-current" />
      </div>
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight font-serif">{title}</h2>
    </div>
    <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">{subtitle}</p>
  </div>
);

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  accentColor?: "blue" | "indigo" | "emerald" | "rose" | "amber" | "violet" | "cyan" | "slate";
  subtitle?: string;
}

const InfoCard = ({ title, children, accentColor = "blue", subtitle }: InfoCardProps) => {
  const colorMap = {
    blue: "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 hover:bg-[#A8672E]/10 dark:bg-[#D08F52]/10",
    indigo: "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 hover:bg-[#A8672E]/10 dark:bg-[#D08F52]/10",
    emerald: "border-[#1D8A70] dark:border-[#3CBF9C] bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/50 hover:bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10",
    rose: "border-[#BC4128] dark:border-[#E2694A] bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 hover:bg-[#BC4128]/10 dark:bg-[#E2694A]/10",
    amber: "border-amber-500 bg-amber-50/50 hover:bg-amber-50",
    violet: "border-violet-500 bg-violet-50/50 hover:bg-violet-50",
    cyan: "border-cyan-500 bg-cyan-50/50 hover:bg-cyan-50",
    slate: "border-slate-500 bg-slate-50 dark:bg-[#14171B]/50 hover:bg-slate-50 dark:bg-[#14171B]",
  };

  return (
    <div className={`p-8 rounded-2xl border-t-4 shadow-sm transition-all duration-300 ${colorMap[accentColor]} h-full flex flex-col`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-1 font-serif">{title}</h3>
      {subtitle && <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{subtitle}</p>}
      <div className="text-gray-700 leading-relaxed space-y-4 flex-grow">{children}</div>
    </div>
  );
};

interface ComparisonRowProps {
  metric: string;
  retail: string;
  institutional: string;
}

const ComparisonRow = ({ metric, retail, institutional }: ComparisonRowProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-6">
    <div className="font-bold text-gray-800 flex items-center">{metric}</div>
    <div className="text-[#BC4128] dark:text-[#E2694A] md:border-l md:border-gray-200 md:pl-6 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 p-2 rounded-lg md:bg-transparent md:p-0">{retail}</div>
    <div className="text-[#1D8A70] dark:text-[#3CBF9C] md:border-l md:border-gray-200 md:pl-6 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/50 p-2 rounded-lg md:bg-transparent md:p-0">{institutional}</div>
  </div>
);

export default function SingleLegLongCallArticle() {
  return (
    <ArticleFrame slug="single-leg-long-call-asymmetric-leverage-options-trading">
      <div className="max-w-4xl mx-auto mb-16">
        <InfographicSlot alt="Single-Leg Long Call Strategy Infographic" />
      </div>

      <div className="max-w-6xl mx-auto space-y-32">
        {/* Section 1: Theory */}
          <section>
            <SectionHeader 
              icon={TrendingUp} 
              title="The Theoretical Framework" 
              subtitle="Before buying a call, you must understand the financial physics behind it. It is not just a bet on direction; it is a lease on upside potential."
              colorClass="#4f46e5" 
            />
            <div className="grid md:grid-cols-2 gap-8">
              <InfoCard title="Philosophy of Asymmetry" accentColor="indigo" subtitle="">
                <p>In traditional equity, risk is linear. A 10% drop means a 10% loss. The long call introduces <strong>convexity</strong>. Your maximum risk is strictly defined (the premium paid), while your profit potential is theoretically unlimited as the stock price rises.</p>
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-xl mt-4 border border-indigo-100">
                  <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-2 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4"/> The "Lease" Analogy
                  </h4>
                  <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">Think of a Call Option as <strong>leasing</strong> a house with the option to buy it. You pay a non-refundable deposit (Premium). If the housing market crashes, you walk away losing only the deposit. If the market doubles, you buy at the old price and keep the profit.</p>
                </div>
              </InfoCard>
              <InfoCard title="The Mechanics of Leverage" accentColor="violet" subtitle="">
                <p><strong>Lambda (λ):</strong> The leverage factor. It creates the ability to control 100 shares per contract with a fraction of the capital required to buy the shares outright.</p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0" />
                    <span className="text-sm"><strong>Embedded Leverage:</strong> Structural to the option. No margin calls. Risk is capped at premium.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] flex-shrink-0" />
                    <span className="text-sm"><strong>Margin Leverage:</strong> Borrowing funds. Incurs interest and catastrophic risk (losses &gt; equity).</span>
                  </li>
                </ul>
              </InfoCard>
            </div>
          </section>

          {/* Section: The Greeks */}
          <section>
            <SectionHeader 
              icon={Activity} 
              title="The Greeks Engine" 
              subtitle="Options are multi-dimensional. The price changes based on Price, Time, and Volatility. You must understand the sensitivity drivers."
              colorClass="#2563eb"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                  <h3 className="font-bold text-lg text-[#A8672E] dark:text-[#D08F52] font-serif">Delta (Δ)</h3>
                </div>
                <p className="text-sm text-[#A8672E] dark:text-[#D08F52] mb-3"><strong>Speed.</strong> How much the option price moves for every $1 move in the stock.</p>
                <div className="text-xs text-[#A8672E] dark:text-[#D08F52] bg-white dark:bg-[#0A0D14] p-2 rounded">
                  Range: 0 to 1.0<br/>
                  ATM ≈ 0.50<br/>
                  Deep ITM ≈ 0.90
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-lg text-purple-900 font-serif">Gamma (Γ)</h3>
                </div>
                <p className="text-sm text-purple-800 mb-3"><strong>Acceleration.</strong> How much Delta changes when stock moves $1.</p>
                <div className="text-xs text-purple-600 bg-white dark:bg-[#0A0D14] p-2 rounded">
                  Highest at ATM.<br/>
                  This is why ATM options explode in value quickly (and crash quickly).
                </div>
              </div>
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-lg text-amber-900 font-serif">Theta (Θ)</h3>
                </div>
                <p className="text-sm text-amber-800 mb-3"><strong>Time Decay.</strong> The daily "rent" you pay to hold the position.</p>
                <div className="text-xs text-amber-600 bg-white dark:bg-[#0A0D14] p-2 rounded">
                  Always negative for long calls.<br/>
                  Accelerates rapidly in the last 21 days (The Theta Cliff).
                </div>
              </div>
              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-6 rounded-2xl border border-rose-100">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" />
                  <h3 className="font-bold text-lg text-[#BC4128] dark:text-[#E2694A] font-serif">Vega (ν)</h3>
                </div>
                <p className="text-sm text-[#BC4128] dark:text-[#E2694A] mb-3"><strong>Volatility.</strong> Sensitivity to changes in Implied Volatility (IV).</p>
                <div className="text-xs text-[#BC4128] dark:text-[#E2694A] bg-white dark:bg-[#0A0D14] p-2 rounded">
                  High IV = Expensive Options.<br/>
                  IV Crush = Stock goes up, but option loses value because IV dropped.
                </div>
              </div>
            </div>
          </section>
          {/* Section 2: Demographics */}
          <section>
            <SectionHeader 
              icon={Users} 
              title="The Great Bifurcation" 
              subtitle="Retail investors and Institutions play completely different games using the same instrument. Understanding this distinction is key to profitability."
              colorClass="#ec4899" 
            />
            <div className="bg-white dark:bg-[#0A0D14] rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
              <div className="bg-gray-50 px-8 py-5 border-b border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 font-bold text-gray-500 uppercase text-xs tracking-widest">
                <div>Metric</div>
                <div className="text-[#BC4128] dark:text-[#E2694A]">Retail Investors (Gamblers)</div>
                <div className="text-[#1D8A70] dark:text-[#3CBF9C]">Institutions (Hedgers)</div>
              </div>
              <div>
                <ComparisonRow 
                  metric="Primary Motivation" 
                  retail="High-leverage speculation (Lottery)" 
                  institutional="Hedging, Capital Efficiency" 
                />
                <ComparisonRow 
                  metric="Time Horizon" 
                  retail="Ultra-short (0-5 Days / Weekly)" 
                  institutional="Medium to Long-term (LEAPS)" 
                />
                <ComparisonRow 
                  metric="Strike Selection" 
                  retail="Far Out-of-the-Money (OTM)" 
                  institutional="At-the-Money or Deep ITM" 
                />
                <ComparisonRow 
                  metric="Win Rate Expectation" 
                  retail="Low (5-10%) but seeking 1000% gains" 
                  institutional="High (60-80%) seeking consistent Alpha" 
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-8 rounded-2xl border border-rose-100">
                <h4 className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> The Retail Trap
                </h4>
                <p className="text-[#BC4128] dark:text-[#E2694A]/80 text-sm leading-relaxed">
                  Retail volume is concentrated (56%+) in 0-5 DTE contracts. This reflects a desire for immediate gratification, typically leading to a "trio of wealth-depleting mistakes": 
                  1. Buying when IV is highest (Earnings).
                  2. Buying strikes with low Delta (Probability of Profit &lt; 10%).
                  3. Fighting Theta decay on a daily basis.
                </p>
              </div>
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-8 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> The Institutional Edge
                </h4>
                <p className="text-[#1D8A70] dark:text-[#3CBF9C]/80 text-sm leading-relaxed">
                  Institutions use Deep ITM calls for "Stock Replacement." By buying an 80 Delta call, they control the stock for 50% of the cost. They use the saved capital to generate yield elsewhere (Treasuries/Bonds), creating a synthetic dividend. They are not gambling; they are optimizing balance sheets.
                </p>
              </div>
            </div>
          </section>
          {/* Section 3: Strategies (Expanded) */}
          <section>
            <SectionHeader 
              icon={Target} 
              title="Strategic Implementation" 
              subtitle="One instrument, three distinct behaviors. Your choice of Strike and Expiration dictates whether you are an Investor, a Swing Trader, or a Speculator."
              colorClass="#059669" 
            />
            
            {/* Decision Framework */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2 font-serif">
                <Layers className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C]" />
                Select Your Archetype
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Archetype 1 */}
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-colors group">
                  <div className="w-12 h-12 bg-[#A8672E] dark:bg-[#D08F52] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#A8672E] dark:bg-[#D08F52] transition-colors">
                    <Shield className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52] group-hover:text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">The Surrogate</h4>
                  <p className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wide mb-3">Stock Replacement</p>
                  <p className="text-sm text-gray-600 mb-4">You want long-term exposure (months/years) with less capital risk than owning shares. You hate time decay.</p>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">Delta: 0.80+</span>
                    <span className="text-gray-500">DTE: 300+</span>
                  </div>
                </div>
                
                {/* Archetype 2 */}
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-300 transition-colors group">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors">
                    <TrendingUp className="w-6 h-6 text-amber-600 group-hover:text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">The Sprinter</h4>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-3">Swing Trader</p>
                  <p className="text-sm text-gray-600 mb-4">You want to catch a 3-10 day move. You want leverage and speed (Gamma), accepting higher time decay.</p>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">Delta: 0.50</span>
                    <span className="text-gray-500">DTE: 45-60</span>
                  </div>
                </div>
                
                {/* Archetype 3 */}
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-rose-300 transition-colors group">
                  <div className="w-12 h-12 bg-[#BC4128] dark:bg-[#E2694A] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#BC4128] dark:bg-[#E2694A] transition-colors">
                    <Zap className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A] group-hover:text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">The Sniper</h4>
                  <p className="text-xs font-bold text-[#BC4128] dark:text-[#E2694A] uppercase tracking-wide mb-3">Convexity Play</p>
                  <p className="text-sm text-gray-600 mb-4">High risk. You expect a violent move (breakout/crash) immediately. You want 10x potential or zero.</p>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">Delta: 0.30</span>
                    <span className="text-gray-500">DTE: Weekly/Monthly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Dive: Strategy 1 */}
            <div className="mb-12 bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 rounded-3xl p-8 border border-indigo-100">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#A8672E] dark:bg-[#D08F52] text-white rounded-lg text-sm font-bold shadow-sm">Strategy A</span>
                    <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] font-serif">The Stock Replacement (LEAPS)</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">This is the institutional standard. Instead of buying 100 shares of AAPL at $200 ($20,000), you buy one Deep ITM LEAPS Call for $4,000. You control the same upside for 80% less capital.</p>
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-lg border border-indigo-100 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                      <span className="text-sm text-gray-700"><strong>The Synthetic Dividend:</strong> Invest the saved $16,000 into risk-free Treasuries (5%). This yield often offsets the cost of the option premium.</span>
                    </div>
                    <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-lg border border-indigo-100 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                      <span className="text-sm text-gray-700"><strong>Defined Ruin:</strong> If AAPL goes to zero, the shareholder loses $20,000. You lose $4,000.</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-indigo-100 w-full md:w-80 flex-shrink-0">
                  <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">The Setup</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delta</span>
                      <span className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52]">0.80 - 0.90</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expiration</span>
                      <span className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52]">12+ Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Liquidity</span>
                      <span className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52]">High Open Interest</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Deep Dive: Strategy 2 */}
            <div className="mb-12 bg-amber-50/50 rounded-3xl p-8 border border-amber-100">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-amber-600 text-white rounded-lg text-sm font-bold shadow-sm">Strategy B</span>
                    <h3 className="text-2xl font-bold text-amber-900 font-serif">The Swing Trade (ATM)</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">The goal here is <strong>Velocity</strong>. You are looking for a technical breakout (e.g., Bull Flag). You buy At-The-Money (ATM) because it has the highest "Gamma"—meaning your position size accelerates the fastest as the trade moves in your favor.</p>
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-lg border border-amber-100 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <span className="text-sm text-gray-700"><strong>The Theta Clock:</strong> Unlike LEAPS, time is your enemy. You are paying significant "rent" daily. You generally exit at 21 DTE to avoid the decay cliff.</span>
                    </div>
                    <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-lg border border-amber-100 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-500" />
                      <span className="text-sm text-gray-700"><strong>Gamma Scalp Effect:</strong> If stock moves +5%, an ATM option might move +50%. This is the power of Lambda.</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-amber-100 w-full md:w-80 flex-shrink-0">
                  <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">The Setup</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delta</span>
                      <span className="font-mono font-bold text-amber-600">0.50 - 0.55</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Entry DTE</span>
                      <span className="font-mono font-bold text-amber-600">45 - 60 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Exit DTE</span>
                      <span className="font-mono font-bold text-amber-600">~21 Days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strike Selection Matrix */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 font-serif">
                <Target className="w-6 h-6 text-cyan-400"/> The Strike Selection Matrix
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <div className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold mb-2">Deep ITM (In The Money)</div>
                  <div className="text-xs text-slate-400 mb-4">Delta 0.80+</div>
                  <p className="text-sm text-slate-300">Safe, conservative. Functions like stock. Low leverage compared to others, but highest probability of profit.</p>
                </div>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <div className="text-yellow-400 font-bold mb-2">ATM (At The Money)</div>
                  <div className="text-xs text-slate-400 mb-4">Delta ~0.50</div>
                  <p className="text-sm text-slate-300">The battleground. Highest Gamma (speed) but also highest Extrinsic Value (risk). Best for quick swing trades.</p>
                </div>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <div className="text-[#BC4128] dark:text-[#E2694A] font-bold mb-2">OTM (Out of The Money)</div>
                  <div className="text-xs text-slate-400 mb-4">Delta &lt; 0.30</div>
                  <p className="text-sm text-slate-300">The Lottery Ticket. Pure extrinsic value. Probability of profit is low, but ROI % can be massive if a huge move occurs.</p>
                </div>
              </div>
            </div>
          </section>
          {/* Section: Trade Management & Discipline */}
          <section>
            <SectionHeader 
              icon={CheckCircle} 
              title="Trade Management & Discipline" 
              subtitle="Amateurs focus on how much they can make. Professionals focus on how much they can lose. This section is your survival manual."
              colorClass="#0891b2" // Cyan
            />
            
            {/* Subsection: Position Sizing */}
            <div className="mb-12 bg-white dark:bg-[#0A0D14] rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-cyan-900 text-white p-6 flex items-center gap-3">
                <PieChart className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold font-serif">Rule #1: Position Sizing</h3>
              </div>
              <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-600 leading-relaxed mb-4">Options are volatile instruments. A 50% drawdown is common. If you size an option trade like a stock trade, you will go bankrupt.</p>
                  <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-cyan-900 mb-1">The 2% Rule</h4>
                    <p className="text-sm text-cyan-800">Never risk more than 1-2% of your total account equity on a single option trade. If you have a $10,000 account, your max loss should be $200.</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">The Math of Ruin</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Account Size</span>
                      <span className="font-mono font-bold">$10,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Max Risk (2%)</span>
                      <span className="font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C]">$200</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-600">Option Contract Cost</span>
                      <span className="font-mono font-bold">$4.00 ($400)</span>
                    </div>
                    <div className="pt-2">
                      <div className="text-[#BC4128] dark:text-[#E2694A] font-bold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Verdict: Position Too Large</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">A 50% stop-loss on this contract = $200 loss. This fits the risk profile.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsection: The Exit Protocols */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border-t-4 border-[#BC4128] dark:border-[#E2694A] shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" />
                  <h4 className="font-bold text-lg text-gray-900">Defense (Stop Loss)</h4>
                </div>
                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Premium Stop</p>
                    <p className="text-xs text-gray-600">Hard stop at -50% of premium paid. If you bought at $2.00, set a stop limit at $1.00.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Technical Stop</p>
                    <p className="text-xs text-gray-600">Exit if the underlying stock closes below the 21-Day EMA or a key support level. Do not wait for the premium to hit zero.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border-t-4 border-[#1D8A70] dark:border-[#3CBF9C] shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C]" />
                  <h4 className="font-bold text-lg text-gray-900">Offense (Profit Taking)</h4>
                </div>
                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Target 1: +50% Gain</p>
                    <p className="text-xs text-gray-600">Sell 1/2 of position. This makes the trade "Risk Free." Move stop on remainder to Breakeven.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Target 2: +100% Gain</p>
                    <p className="text-xs text-gray-600">Sell another 1/4. Let the last 1/4 "Runner" ride the trend until technical breakdown.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border-t-4 border-amber-500 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-lg text-gray-900">Temporal (Time Exit)</h4>
                </div>
                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">The 21 DTE Rule</p>
                    <p className="text-xs text-gray-600">If a Swing Trade reaches 21 Days To Expiration, CLOSE IT. Regardless of profit or loss.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Why?</p>
                    <p className="text-xs text-gray-600">Gamma risk explodes (one bad day wipes you out) and Theta decay goes parabolic. The odds shift to the house.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsection: Management Nuances */}
            <div className="bg-slate-50 dark:bg-[#14171B] rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 font-serif">Advanced Management Nuances</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4"/> When to Roll Up?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">If your Deep ITM Call (LEAPS) has huge gains, you can "Roll Up." Sell the current strike, buy a higher strike. This locks in realized cash profit while maintaining bullish exposure.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#BC4128] dark:text-[#E2694A] flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4"/> When NOT to Roll Out?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4"><strong>"Rolling a Loser"</strong>: If a trade is down -50%, do NOT sell it to buy a later date. You are just realizing a loss and throwing good money after bad. Accept the loss, clear the mental cache, and find a new setup.</p>
                </div>
              </div>
            </div>
          </section>
          {/* Section 4: Pricing & Risks */}
          <section>
            <SectionHeader 
              icon={AlertCircle} 
              title="Risks & Pitfalls" 
              subtitle="The graveyard of option traders is filled with those who ignored Volatility and Time."
              colorClass="#dc2626" 
            />
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <InfoCard title="IV Crush" accentColor="rose" subtitle="The Earnings Trap">
                <p className="text-sm">Implied Volatility (IV) spikes before earnings events. Option prices become expensive. Immediately after earnings, IV collapses (Crush).</p>
                <div className="mt-4 p-3 bg-white dark:bg-[#0A0D14]/60 rounded border border-rose-200 text-xs font-medium text-[#BC4128] dark:text-[#E2694A]">
                  <strong>Result:</strong> Stock goes UP 5%, but your Call goes DOWN 20% because the "Vega" loss outweighed the "Delta" gain.
                </div>
              </InfoCard>
              <InfoCard title="Skew Disadvantage" accentColor="emerald" subtitle="Market Structure">
                <p className="text-sm">Markets have "Crashophobia". OTM Puts are usually priced higher than OTM Calls.</p>
                <div className="mt-4 p-3 bg-white dark:bg-[#0A0D14]/60 rounded border border-emerald-200 text-xs font-medium text-[#1D8A70] dark:text-[#3CBF9C]">
                  <strong>Opportunity:</strong> This makes Calls naturally "cheaper" contrarian bets compared to puts. You are often fighting less headwind buying calls than buying puts.
                </div>
              </InfoCard>
              <InfoCard title="The Theta Cliff" accentColor="amber" subtitle="Silent Killer">
                <p className="text-sm">Time decay is not linear. It follows an exponential curve.</p>
                <div className="mt-4 p-3 bg-white dark:bg-[#0A0D14]/60 rounded border border-amber-200 text-xs font-medium text-amber-800">
                  <strong>Rule:</strong> Never hold a short-term option over a weekend if you are close to expiration. 2 days of decay for 0 days of trading.
                </div>
              </InfoCard>
            </div>
          </section>

          {/* Section 5: Comparison (Expanded) */}
          <section>
            <SectionHeader 
              icon={BarChart2} 
              title="Call vs. Put: The Asymmetry" 
              subtitle="While they are mirror images mathematically, they behave completely differently in the real world due to human psychology and market structure."
              colorClass="#8b5cf6" 
            />
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl shadow-lg border-t-8 border-[#A8672E] dark:border-[#D08F52]">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-serif">Long Call Profile</h3>
                    <p className="text-sm font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wide">The Optimist's Bet</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-2 rounded text-[#A8672E] dark:text-[#D08F52] mt-1">
                      <Activity className="w-4 h-4"/>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Vega Headwind</span>
                      <span className="text-sm text-gray-600">As markets rise, fear subsides. Implied Volatility (IV) usually drops. You profit from Delta (Direction), but lose on Vega (Vol Crush).<br/><em className="text-xs text-[#A8672E] dark:text-[#D08F52]">"Taking the stairs up."</em></span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-2 rounded text-[#A8672E] dark:text-[#D08F52] mt-1">
                      <Percent className="w-4 h-4"/>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Pricing Advantage</span>
                      <span className="text-sm text-gray-600">Due to "Skew," OTM calls are generally cheaper than equidistant OTM puts. You are fighting less premium bloat.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl shadow-lg border-t-8 border-[#BC4128] dark:border-[#E2694A]">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingDown className="w-8 h-8 text-[#BC4128] dark:text-[#E2694A]" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-serif">Long Put Profile</h3>
                    <p className="text-sm font-bold text-[#BC4128] dark:text-[#E2694A] uppercase tracking-wide">The Pessimist's Bet</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-2 rounded text-[#BC4128] dark:text-[#E2694A] mt-1">
                      <Activity className="w-4 h-4"/>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Vega Tailwind</span>
                      <span className="text-sm text-gray-600">As markets crash, fear explodes. IV spikes. You profit from Delta (Direction) AND Vega (Vol Expansion). This leads to explosive "Gamma Squeezes."<br/><em className="text-xs text-[#BC4128] dark:text-[#E2694A]">"Taking the elevator down."</em></span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-2 rounded text-[#BC4128] dark:text-[#E2694A] mt-1">
                      <DollarSign className="w-4 h-4"/>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Pricing Disadvantage</span>
                      <span className="text-sm text-gray-600">Everyone wants insurance. Puts are structurally overpriced due to "Crashophobia." You need a larger move to break even.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="p-5 text-sm font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50">Long Call (Bull)</th>
                    <th className="p-5 text-sm font-bold text-[#BC4128] dark:text-[#E2694A] uppercase tracking-wider bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50">Long Put (Bear)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-bold text-gray-700">Market Personality</td>
                    <td className="p-5 text-gray-600 bg-[#A8672E]/10 dark:bg-[#D08F52]/10/10">Slow grind up, lower volatility over time.</td>
                    <td className="p-5 text-gray-600 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/10">Fast, violent moves down. Panic driven.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-bold text-gray-700">Volatility (Vega) Impact</td>
                    <td className="p-5 text-gray-600 bg-[#A8672E]/10 dark:bg-[#D08F52]/10/10">
                      <span className="inline-flex items-center gap-1 text-[#BC4128] dark:text-[#E2694A] font-bold">
                        <TrendingDown className="w-3 h-3"/> Negative
                      </span><br/>
                      Vol usually drops as price rises.
                    </td>
                    <td className="p-5 text-gray-600 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/10">
                      <span className="inline-flex items-center gap-1 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">
                        <TrendingUp className="w-3 h-3"/> Positive
                      </span><br/>
                      Vol spikes as price crashes.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-bold text-gray-700">The "Skew" (Cost)</td>
                    <td className="p-5 text-gray-600 bg-[#A8672E]/10 dark:bg-[#D08F52]/10/10">
                      <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Cheaper.</span><br/>
                      Market assumes slow growth.
                    </td>
                    <td className="p-5 text-gray-600 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/10">
                      <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">Expensive.</span><br/>
                      Market fears the black swan.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-bold text-gray-700">Theoretical Limit</td>
                    <td className="p-5 text-gray-600 bg-[#A8672E]/10 dark:bg-[#D08F52]/10/10">
                      <span className="text-[#A8672E] dark:text-[#D08F52] font-bold">Unlimited.</span><br/>
                      Stock can go to infinity.
                    </td>
                    <td className="p-5 text-gray-600 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/10">
                      <span className="text-gray-900 font-bold">Capped.</span><br/>
                      Stock can only go to $0.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          {/* Section 6: Indicators (Expanded) */}
          <section>
            <SectionHeader 
              icon={Zap} 
              title="Technical & Fundamental Indicators" 
              subtitle="Confluence is King. A Call Option is a derivative; its success is 100% dependent on the underlying asset's behavior. Use these tools to confirm the setup."
              colorClass="#eab308"
            />
            <div className="space-y-12">
              {/* Subsection 1: Technicals */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2 font-serif">
                  <Activity className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />
                  Technical Setup (The "When")
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                      <div className="flex items-center gap-3">
                        <BarChart className="w-5 h-5" />
                        <h4 className="font-bold text-lg">VCP (Volatility Contraction)</h4>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 border border-current px-2 py-0.5 rounded">Structure</span>
                    </div>
                    <div className="p-6 text-gray-600 space-y-3 leading-relaxed text-sm">
                      <p><strong>The Concept:</strong> Before a stock makes a massive move, volatility often dries up. The price action gets tighter and tighter (from left to right on the chart), like a coiled spring.</p>
                      <p className="mt-2 text-[#A8672E] dark:text-[#D08F52] font-medium">Why Buy Calls Here?</p>
                      <p>Option premiums are cheapest when volatility is low. Buying right at the "pivot point" of the breakout allows you to profit from both the directional move (Delta) AND the expansion of volatility (Vega).</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5" />
                        <h4 className="font-bold text-lg">Volume Price Analysis</h4>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 border border-current px-2 py-0.5 rounded">Momentum</span>
                    </div>
                    <div className="p-6 text-gray-600 space-y-3 leading-relaxed text-sm">
                      <p><strong>The Concept:</strong> Volume is the fuel. A breakout without volume is a trap. Look for "Pocket Pivots"—days where volume is higher than any down-volume day in the past 10 days.</p>
                      <p className="mt-2 text-[#A8672E] dark:text-[#D08F52] font-medium">The Signal:</p>
                      <p>Price moves UP on High Volume (Institutional Buying) and pulls back on Low Volume (No selling pressure). This confirms the trend is supported by big money.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-purple-50 text-purple-700">
                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5" />
                        <h4 className="font-bold text-lg">Moving Averages</h4>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 border border-current px-2 py-0.5 rounded">Trend Filter</span>
                    </div>
                    <div className="p-6 text-gray-600 space-y-3 leading-relaxed text-sm">
                      <p><strong>The Concept:</strong> Use moving averages to define the "Tide."</p>
                      <ul className="list-disc pl-4 mt-1 space-y-1">
                        <li><strong>200 Day MA:</strong> The line in the sand. Never buy calls below this.</li>
                        <li><strong>50 Day MA:</strong> Institutional Support. Ideally, the stock rides this line.</li>
                        <li><strong>21 Day EMA:</strong> The Momentum trigger. Price should be above this for swing trades.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A]">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="w-5 h-5" />
                        <h4 className="font-bold text-lg">Relative Strength (RS)</h4>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 border border-current px-2 py-0.5 rounded">Divergence</span>
                    </div>
                    <div className="p-6 text-gray-600 space-y-3 leading-relaxed text-sm">
                      <p><strong>The Concept:</strong> <em>Not RSI.</em> This measures the stock's performance vs. the S&P 500.</p>
                      <p className="mt-2 text-[#BC4128] dark:text-[#E2694A] font-medium">The Setup:</p>
                      <p>If the S&P 500 makes a <em>lower low</em>, but your stock makes a <em>higher low</em>, it is showing massive relative strength. When the market turns, this stock will lead the rally. This is the #1 indicator for super-performance.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Subsection 2: Fundamentals */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2 font-serif">
                  <Search className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C]" />
                  Fundamental Drivers (The "Why")
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C]">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5" />
                        <h4 className="font-bold text-lg">PEAD (Earnings Drift)</h4>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 border border-current px-2 py-0.5 rounded">Catalyst</span>
                    </div>
                    <div className="p-6 text-gray-600 space-y-3 leading-relaxed text-sm">
                      <p><strong>Post-Earnings Announcement Drift.</strong></p>
                      <p>When a company crushes earnings estimates, large institutions cannot buy their full position in one day. They must buy over weeks. This creates a persistent upward drift.</p>
                      <p className="mt-2 text-xs bg-[#1D8A70] dark:bg-[#3CBF9C] text-[#1D8A70] dark:text-[#3CBF9C] p-2 rounded">
                        <strong>Strategy:</strong> Buy calls 2-3 days <em>after</em> the earnings spike to ride this institutional wave.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-amber-50 text-amber-700">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" />
                        <h4 className="font-bold text-lg">Insider Buying</h4>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 border border-current px-2 py-0.5 rounded">Confidence</span>
                    </div>
                    <div className="p-6 text-gray-600 space-y-3 leading-relaxed text-sm">
                      <p><strong>"Cluster Buying"</strong></p>
                      <p>Executives sell stock for many reasons (taxes, divorce, buying a house), but they only buy for one reason: They think the price is going up.</p>
                      <p className="mt-2 text-xs bg-amber-100 text-amber-800 p-2 rounded">
                        <strong>Signal:</strong> Look for open-market purchases by CEO/CFO, not just option grants.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50 dark:bg-[#14171B] text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-3">
                        <PieChart className="w-5 h-5" />
                        <h4 className="font-bold text-lg">Sector Rotation</h4>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 border border-current px-2 py-0.5 rounded">Macro</span>
                    </div>
                    <div className="p-6 text-gray-600 space-y-3 leading-relaxed text-sm">
                      <p><strong>"A rising tide lifts all boats."</strong></p>
                      <p>75% of a stock's move is correlated to its sector. Do not buy a call on a Tech stock if Tech is crashing.</p>
                      <p className="mt-2 text-xs bg-slate-100 text-slate-800 dark:text-slate-200 p-2 rounded">
                        <strong>Action:</strong> Identify the top 3 sectors (e.g., Semi, Energy) and only buy calls on the best stocks within those sectors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Conclusion */}
          <section className="bg-slate-900 text-white p-12 rounded-3xl text-center mb-16 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 font-serif">Conclusion</h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The single-leg long call is a potent tool when wielded with precision. Align with the physics of the market: buy Deep ITM to mimic stock, enter on Volatility Contraction, and respect the "Sweet Spot" of 45 DTE. Avoid the retail lottery ticket mentality. Treat options as a business, not a casino.
            </p>
          </section>
        </div>
    </ArticleFrame>
  );
}