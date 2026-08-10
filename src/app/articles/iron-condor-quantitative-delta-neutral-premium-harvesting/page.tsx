'use client';

import React from 'react';
import { TrendingUp, Clock, Activity, Target, AlertTriangle, BarChart2, Layers, Info, Briefcase, Zap, RefreshCw, PieChart, Calculator } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Simple SVG Payoff Diagram Component
const PayoffDiagram = () => (
  <div className="w-full h-64 bg-slate-50 dark:bg-[#14171B] rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden flex items-center justify-center mb-6">
    <svg viewBox="0 0 400 200" className="w-full h-full text-slate-400">
      {/* Grid lines */}
      <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
      <line x1="200" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
      {/* Payoff Line */}
      <path d="M 20 150 L 100 150 L 140 70 L 260 70 L 300 150 L 380 150" fill="none" stroke="#4f46e5" strokeWidth="3" />
      {/* Profit Zone Fill */}
      <path d="M 140 100 L 140 70 L 260 70 L 260 100 Z" fill="rgba(16, 185, 129, 0.2)" />
      {/* Loss Zones Fill */}
      <path d="M 100 150 L 100 100 L 125 100 L 125 100 Z" fill="rgba(244, 63, 94, 0.1)" />
      {/* Labels */}
      <text x="200" y="60" textAnchor="middle" className="text-xs font-bold fill-emerald-600">Max Profit Zone</text>
      <text x="60" y="140" textAnchor="middle" className="text-xs fill-rose-500">Max Loss</text>
      <text x="340" y="140" textAnchor="middle" className="text-xs fill-rose-500">Max Loss</text>
      <text x="140" y="170" textAnchor="middle" className="text-[10px] fill-slate-500">Long Put</text>
      <text x="260" y="170" textAnchor="middle" className="text-[10px] fill-slate-500">Long Call</text>
    </svg>
    <div className="absolute bottom-2 right-2 text-[10px] text-slate-400">Stylized Visualization</div>
  </div>
);

interface SectionHeadingProps {
  children: React.ReactNode;
  icon: React.ComponentType<{ size?: number }>;
  color?: string;
}

const SectionHeading = ({ children, icon: Icon, color = "text-[#A8672E] dark:text-[#D08F52]" }: SectionHeadingProps) => (
  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-3 font-serif">
    <div className={`p-2 rounded-lg bg-white dark:bg-[#0A0D14] shadow-sm border border-slate-100 dark:border-slate-800 ${color}`}>
      <Icon size={24} />
    </div>
    {children}
  </h2>
);

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className = "" }: CardProps) => (
  <div className={`bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow duration-300 ${className}`}>
    {title && <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 font-serif">{title}</h3>}
    <div className="text-slate-600 dark:text-slate-400 leading-relaxed">{children}</div>
  </div>
);

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  color?: string;
}

const StatCard = ({ label, value, subtext, color = "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]" }: StatCardProps) => (
  <div className={`rounded-xl p-4 ${color} border border-opacity-10 border-current`}>
    <div className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-1">{label}</div>
    <div className="text-2xl md:text-3xl font-bold mb-1">{value}</div>
    {subtext && <div className="text-xs opacity-75">{subtext}</div>}
  </div>
);

interface GreekCardProps {
  symbol: string;
  name: string;
  description: string;
  sentiment: string;
}

const GreekCard = ({ symbol, name, description, sentiment }: GreekCardProps) => (
  <div className="bg-white dark:bg-[#0A0D14] rounded-xl p-5 border-l-4 border-[#A8672E] dark:border-[#D08F52] shadow-sm hover:translate-y-[-2px] transition-transform">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">{name} <span className="text-[#A8672E] dark:text-[#D08F52] font-serif italic ml-1">{symbol}</span></h4>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${sentiment === 'Positive' ? 'bg-[#1D8A70] dark:bg-[#3CBF9C] text-[#1D8A70] dark:text-[#3CBF9C]' : sentiment === 'Negative' ? 'bg-[#BC4128] dark:bg-[#E2694A] text-[#BC4128] dark:text-[#E2694A]' : 'bg-slate-100 text-slate-700 dark:text-slate-300'}`}>
        {sentiment}
      </span>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

interface StrategyBlockProps {
  title: string;
  content: string;
  type?: "neutral" | "risk" | "success";
}

const StrategyBlock = ({ title, content, type = "neutral" }: StrategyBlockProps) => (
  <div className={`p-4 rounded-xl border ${type === 'risk' ? 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-rose-100' : type === 'success' ? 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 border-emerald-100' : 'bg-slate-50 dark:bg-[#14171B] border-slate-200 dark:border-slate-800'}`}>
    <h4 className={`font-bold mb-2 ${type === 'risk' ? 'text-[#BC4128] dark:text-[#E2694A]' : type === 'success' ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-slate-700 dark:text-slate-300'}`}>{title}</h4>
    <p className="text-sm text-slate-600 dark:text-slate-400">{content}</p>
  </div>
);

export default function IronCondorArticle() {
  return (
    <ArticleFrame slug="iron-condor-quantitative-delta-neutral-premium-harvesting">
      <div className="max-w-5xl mx-auto mb-16 px-6">
        <InfographicSlot alt="Iron Condor Strategy Infographic" />
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-24">
        {/* Executive Summary */}
        <section>
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 font-serif">
                <Layers className="text-[#A8672E] dark:text-[#D08F52]" /> Executive Summary
              </h2>
              <p className="text-[#A8672E] dark:text-[#D08F52] text-lg leading-relaxed max-w-3xl">
                The Iron Condor is a sophisticated non-directional strategy designed to generate alpha from market stagnation, time decay (Theta), and volatility contraction. It avoids the precarious task of predicting directional momentum, relying instead on structural pricing inefficiencies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white dark:bg-[#0A0D14]/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-[#A8672E] dark:text-[#D08F52] text-sm mb-1">Target</div>
                  <div className="font-bold text-xl">Market Neutrality</div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14]/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-[#A8672E] dark:text-[#D08F52] text-sm mb-1">Mechanism</div>
                  <div className="font-bold text-xl">Theta Decay</div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14]/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-[#A8672E] dark:text-[#D08F52] text-sm mb-1">Primary Edge</div>
                  <div className="font-bold text-xl">IV &gt; HV</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Mathematical Edge */}
        <section>
          <SectionHeading icon={Zap} color="text-amber-500">The Quantitative Edge</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">IV vs. HV Discrepancy</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                The core alpha of the Iron Condor is not direction; it is the <strong>Variance Risk Premium</strong>. Implied Volatility (IV) is the market's expectation of future movement, while Historical Volatility (HV) is actual movement.
              </p>
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-6">
                <p className="font-serif italic text-amber-900 text-lg mb-2">"Implied Volatility generally overstates Actual Volatility."</p>
                <p className="text-sm text-amber-800/80">
                  Historically, SPX options overprice the expected move ~83% of the time. When we sell an Iron Condor, we are selling this "fear premium." We profit when the market moves less than the crowd expects.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Probability of Profit (POP)</h3>
              <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <span className="text-slate-500">Short Delta</span>
                  <span className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52]">~0.16 to 0.20</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <span className="text-slate-500">Approx. POP</span>
                  <span className="font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C]">68% - 75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Expected Value (EV)</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">Positive</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4">
                *POP is derived from the width of strikes. Wider wings = higher capital requirement but higher POP. Narrow wings = lower capital but lower POP due to breakeven proximity.
              </p>
            </div>
          </div>
        </section>

        {/* Mechanics */}
        <section>
          <SectionHeading icon={Layers} color="text-pink-600">Structural Mechanics</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                Synthetically, an Iron Condor amalgamates two vertical credit spreads into a single risk profile. It is the simultaneous execution of four legs to create a "profit zone" bounded by insurance.
              </p>
              <PayoffDiagram />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[#BC4128] dark:text-[#E2694A] font-bold mb-1">Short Put Spread</div>
                  <div className="text-xs text-slate-500">Bull Put Spread</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold mb-1">Short Call Spread</div>
                  <div className="text-xs text-slate-500">Bear Call Spread</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">The Four Legs</h3>
              <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-l-emerald-500 !py-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 dark:text-slate-300">1. Buy Long Put (Floor)</span>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Protection</span>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-l-rose-500 !py-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 dark:text-slate-300">2. Sell Short Put</span>
                  <span className="text-xs bg-[#BC4128] dark:bg-[#E2694A] px-2 py-1 rounded text-[#BC4128] dark:text-[#E2694A]">Lower Bound</span>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-l-rose-500 !py-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 dark:text-slate-300">3. Sell Short Call</span>
                  <span className="text-xs bg-[#BC4128] dark:bg-[#E2694A] px-2 py-1 rounded text-[#BC4128] dark:text-[#E2694A]">Upper Bound</span>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-l-emerald-500 !py-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 dark:text-slate-300">4. Buy Long Call (Ceiling)</span>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Protection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Greeks */}
        <section>
          <SectionHeading icon={BarChart2} color="text-violet-600">The Greeks Analysis</SectionHeading>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">
            Success requires managing dynamic sensitivities. While the payoff is static at expiration, the Greeks describe the living, breathing risk profile of the trade.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <GreekCard 
              symbol="Δ"
              name="Delta" 
              sentiment="Neutral → Unstable"
              description="Ideally neutral at initiation. Acts as a negative feedback loop; as the market moves, the position accumulates directional risk against you."
            />
            <GreekCard 
              symbol="Θ"
              name="Theta" 
              sentiment="Positive"
              description="The engine of profit. Time decay accelerates non-linearly, with the 'sweet spot' for risk-adjusted decay occurring between 45 and 21 DTE."
            />
            <GreekCard 
              symbol="ν"
              name="Vega" 
              sentiment="Negative"
              description="Short volatility. Benefits from 'volatility crush'. A 1% increase in IV inflates option prices, causing mark-to-market losses."
            />
            <GreekCard 
              symbol="Γ"
              name="Gamma" 
              sentiment="The Threat"
              description="Explodes near expiration (0-7 DTE). Small price moves cause massive Delta shifts. The primary reason for managing trades early at 21 DTE."
            />
          </div>
        </section>

        {/* Execution Strategy */}
        <section>
          <SectionHeading icon={Target} color="text-[#1D8A70] dark:text-[#3CBF9C]">Optimal Execution</SectionHeading>
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-1 space-y-6">
              <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200 font-serif">The 45 DTE Standard</h3>
              <div className="prose text-slate-600 dark:text-slate-400">
                <p>Entering at 45 Days to Expiration balances premium density with Gamma stability. It allows you to sell further OTM strikes while collecting viable credit.</p>
              </div>
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-6 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-2 flex items-center gap-2">
                  <Clock size={18}/> The 21 DTE Exit Rule
                </h4>
                <p className="text-[#1D8A70] dark:text-[#3CBF9C] text-sm">
                  Always close or roll at 21 days. This avoids the "Gamma Cliff" where tail risk dominates, shifting the trade from a probability play to a directional gamble.
                </p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <StatCard label="Entry" value="45 DTE" subtext="Start of decay curve" color="bg-white dark:bg-[#0A0D14] text-slate-800 dark:text-slate-200 shadow-sm" />
              <StatCard label="Exit" value="21 DTE" subtext="Avoid Gamma risk" color="bg-white dark:bg-[#0A0D14] text-slate-800 dark:text-slate-200 shadow-sm" />
              <StatCard label="Target" value="50%" subtext="Of Max Profit" color="bg-white dark:bg-[#0A0D14] text-slate-800 dark:text-slate-200 shadow-sm" />
              <StatCard label="Delta" value="20-30" subtext="Short Strikes" color="bg-white dark:bg-[#0A0D14] text-slate-800 dark:text-slate-200 shadow-sm" />
            </div>
          </div>
          <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-6 font-serif">Strike & Wing Optimization</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Wing Width" className="bg-slate-50 dark:bg-[#14171B] border-none">
              <p className="text-sm">
                Wider is generally better. Narrow wings ($1-$2) suffer from high protection costs. Optimal width is roughly <strong>1/10th</strong> of the underlying stock price (e.g., $10 width for a $100 stock).
              </p>
            </Card>
            <Card title="Strike Selection" className="bg-slate-50 dark:bg-[#14171B] border-none">
              <p className="text-sm">
                Sell the <strong>20-30 Delta</strong> options. This provides a high probability of profit (approx 70-80% POP) while collecting enough premium to justify the risk.
              </p>
            </Card>
            <Card title="IV Rank Filter" className="bg-slate-50 dark:bg-[#14171B] border-none">
              <p className="text-sm">
                Only engage when IV Rank is <strong>&gt;30</strong> (ideally &gt;50). You must sell "expensive" insurance. Selling in low IV environments is a mathematical trap.
              </p>
            </Card>
          </div>
        </section>

        {/* Defensive Management */}
        <section>
          <SectionHeading icon={RefreshCw} color="text-[#A8672E] dark:text-[#D08F52]">Defensive Tactics</SectionHeading>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">
            When the market challenges your strikes, doing nothing is rarely the best option. Defensive rolling reduces delta exposure and collects additional credit to widen breakevens.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <StrategyBlock 
              type="neutral"
              title="1. Roll the Untested Side"
              content="If the market rallies (threatening calls), roll your Puts UP. You collect more credit, reducing max loss, and cut negative delta. Do not touch the challenged side yet."
            />
            <StrategyBlock 
              type="risk"
              title="2. Roll Out in Time"
              content="If the tested side is breached at 21 DTE, roll the entire position to the next monthly cycle. This buys time for mean reversion and collects volatility premium."
            />
            <StrategyBlock 
              type="risk"
              title="3. Go Inverted (Advanced)"
              content="In extreme moves, you may roll the untested side BEYOND the tested side, locking in a straddle. This guarantees a loss on the intrinsic value but minimizes the total P&L hit."
            />
          </div>
        </section>

        {/* Portfolio Sizing */}
        <section>
          <SectionHeading icon={PieChart} color="text-[#A8672E] dark:text-[#D08F52]">Portfolio & Risk Sizing</SectionHeading>
          <div className="bg-slate-900 text-slate-300 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 font-serif">The Rule of 3-5%</h3>
                <p className="mb-6">
                  Iron Condors are high-probability but negative skew strategies (win often, lose big occasionally). Therefore, position sizing is the only thing protecting you from ruin.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                    <span>Never allocate &gt;5% of Net Liq to one symbol.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                    <span>Keep 50% of capital in cash (Buying Power).</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                    <span>Diversify expiration cycles (laddering).</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-4 text-[#A8672E] dark:text-[#D08F52] font-bold">
                  <Calculator size={20} /> Simple Sizing Math
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span>Account Size</span>
                    <span>$100,000</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span>Max Risk per Trade (3%)</span>
                    <span>$3,000</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span>Condor Width ($5 wide)</span>
                    <span>$500 risk</span>
                  </div>
                  <div className="flex justify-between text-[#A8672E] dark:text-[#D08F52] font-bold pt-2">
                    <span>Max Contracts</span>
                    <span>6 Contracts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Asset Selection & Pitfalls */}
        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading icon={Briefcase} color="text-[#A8672E] dark:text-[#D08F52]">Asset Selection</SectionHeading>
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#A8672E] dark:bg-[#D08F52] text-[#A8672E] dark:text-[#D08F52] rounded-lg">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Liquidity is King</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Slippage on 4 legs can destroy edge. Stick to high volume products.</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">SPY</span>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">QQQ</span>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">IWM</span>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">GLD</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#A8672E] dark:bg-[#D08F52] text-[#A8672E] dark:text-[#D08F52] rounded-lg">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Skew Awareness</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Markets usually crash faster than they rally. Puts trade at higher IV than calls. You must often set your Put Delta lower (e.g., 16 Delta) than your Call Delta (e.g., 20 Delta) to balance risk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading icon={AlertTriangle} color="text-amber-500">Critical Pitfalls</SectionHeading>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 h-full">
              <h3 className="font-bold text-amber-800 mb-4 text-lg font-serif">Dividend Risk</h3>
              <p className="text-amber-900/80 text-sm mb-4">
                The "Silent Killer" for American options. If you are short a call and it is ITM, you risk early assignment before the ex-dividend date.
              </p>
              <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl border border-amber-200 mb-4">
                <div className="text-xs font-mono text-slate-500 mb-1">THE ASSIGNMENT FORMULA</div>
                <div className="font-mono font-bold text-slate-700 dark:text-slate-300">Put Extrinsic Value &lt; Dividend Amount</div>
              </div>
              <p className="text-amber-900/80 text-sm">
                <strong>Mitigation:</strong> Trade European style indices (SPX, NDX) or close at risk calls immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Summary Table */}
        <section className="bg-slate-900 text-slate-300 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <Info className="text-[#A8672E] dark:text-[#D08F52]" />
            <h2 className="text-2xl font-bold text-white font-serif">Summary of Optimized Parameters</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-sm uppercase tracking-wider text-slate-500">
                  <th className="py-4 pr-4 font-medium">Parameter</th>
                  <th className="py-4 px-4 font-medium">Recommended Value</th>
                  <th className="py-4 pl-4 font-medium">Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm md:text-base">
                <tr>
                  <td className="py-4 pr-4 font-semibold text-[#A8672E] dark:text-[#D08F52]">Days to Expiration</td>
                  <td className="py-4 px-4 text-white">~45 Days</td>
                  <td className="py-4 pl-4">Optimal Theta/Gamma balance</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-semibold text-[#A8672E] dark:text-[#D08F52]">Exit Trigger</td>
                  <td className="py-4 px-4 text-white">21 DTE</td>
                  <td className="py-4 pl-4">Avoid Gamma risk acceleration</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-semibold text-[#A8672E] dark:text-[#D08F52]">Profit Target</td>
                  <td className="py-4 px-4 text-white">50% of Max</td>
                  <td className="py-4 pl-4">Increases capital velocity</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-semibold text-[#A8672E] dark:text-[#D08F52]">Short Strikes</td>
                  <td className="py-4 px-4 text-white">20-30 Delta</td>
                  <td className="py-4 pl-4">High probability (~1 SD)</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-semibold text-[#A8672E] dark:text-[#D08F52]">Wing Width</td>
                  <td className="py-4 px-4 text-white">1/10th Stock Price</td>
                  <td className="py-4 pl-4">Balances ROC with Win Rate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}