'use client';

import React, { useState } from 'react';
import { TrendingUp, Activity, AlertTriangle, DollarSign, Clock, BarChart2, Shield, Users, Zap, BookOpen, Target, ArrowLeft, ArrowRight, CheckCircle, XCircle, TrendingDown, ChevronDown, ChevronUp, Brain, Thermometer, Scale, Maximize2, Minimize2, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Components ---
const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6 font-serif">
      {children}
    </h2>
    {subtitle && (
      <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-xl leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const Card = ({ 
  title, 
  children, 
  icon: Icon, 
  color = "indigo", 
  className = "" 
}: { 
  title: string; 
  children: React.ReactNode; 
  icon?: React.ComponentType<any>; 
  color?: string; 
  className?: string; 
}) => {
  const colorClasses: Record<string, string> = {
    indigo: "border-indigo-100 bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 text-[#A8672E] dark:text-[#D08F52] dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-300",
    purple: "border-purple-100 bg-purple-50/50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-900/20 dark:text-purple-300",
    emerald: "border-emerald-100 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/50 text-[#1D8A70] dark:text-[#3CBF9C] dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300",
    rose: "border-rose-100 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 text-[#BC4128] dark:text-[#E2694A] dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-300",
    amber: "border-amber-100 bg-amber-50/50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300",
    cyan: "border-cyan-100 bg-cyan-50/50 text-cyan-700 dark:border-cyan-900/50 dark:bg-cyan-900/20 dark:text-cyan-300",
    slate: "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0D14] text-slate-700 dark:text-slate-300 dark:border-white/10 dark:bg-[#14171B] dark:text-slate-300",
  };

  const iconColors: Record<string, string> = {
    indigo: "text-[#A8672E] dark:text-[#D08F52] bg-indigo-100 dark:text-[#A8672E] dark:text-[#D08F52] dark:bg-indigo-900/50",
    purple: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/50",
    emerald: "text-[#1D8A70] dark:text-[#3CBF9C] bg-emerald-100 dark:text-[#1D8A70] dark:text-[#3CBF9C] dark:bg-emerald-900/50",
    rose: "text-[#BC4128] dark:text-[#E2694A] bg-rose-100 dark:text-[#BC4128] dark:text-[#E2694A] dark:bg-rose-900/50",
    amber: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/50",
    cyan: "text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/50",
    slate: "text-slate-600 dark:text-slate-400 bg-slate-100 dark:text-slate-400 dark:bg-slate-800",
  };

  return (
    <div className={`p-8 rounded-2xl border ${colorClasses[color].split(' ')[0]} ${color === 'slate' ? 'bg-white dark:bg-[#14171B]' : colorClasses[color]} shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col ${className}`}>
      <div className="flex items-center gap-4 mb-6">
        {Icon && (
          <div className={`p-3 rounded-xl ${iconColors[color]}`}>
            <Icon size={28} />
          </div>
        )}
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-serif">{title}</h3>
      </div>
      <div className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow space-y-4 text-lg">
        {children}
      </div>
    </div>
  );
};

const MathBox = ({ title, formulas }: { title: string; formulas: string[] }) => (
  <div className="bg-slate-900 dark:bg-black text-slate-100 p-8 rounded-xl shadow-2xl font-mono my-6 border-l-4 border-purple-500 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Brain size={64} />
    </div>
    <div className="text-purple-300 text-sm font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
      {title}
    </div>
    {formulas.map((f, i) => (
      <div key={i} className="mb-3 last:mb-0 text-lg md:text-xl flex items-center gap-3">
        <span className="text-purple-500 opacity-50">#</span> {f}
      </div>
    ))}
  </div>
);

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
      active
        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105 border border-transparent'
        : 'bg-white dark:bg-[#14171B] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/50 border border-slate-200 dark:border-white/10'
    }`}
  >
    {children}
  </button>
);

const ScenarioSimulator = () => {
  const [step, setStep] = useState(0);
  
  const scenarioSteps = [
    {
      title: "The Setup",
      desc: "TechGiant Corp earnings are tomorrow. Stock is at $100. Implied Volatility (IV) is sky-high at 150% because everyone expects a huge move.",
      action: "You buy a Straddle for $10.00 ($5 Call + $5 Put).",
      analysis: "Your breakevens are $90 and $110. You need a massive move >10% to profit."
    },
    {
      title: "The Event",
      desc: "Earnings come out. They are 'okay'. The stock moves up to $104 (a 4% move).",
      action: "The event is over. Uncertainty is gone.",
      analysis: "Since the news is out, IV instantly crashes from 150% down to 30%."
    },
    {
      title: "The Result (IV Crush)",
      desc: "Even though the stock went UP $4, your Call option LOST value.",
      action: "Result: Your $10.00 Straddle is now worth $2.00.",
      analysis: "Why? The Vega loss (volatility drop) completely overwhelmed the Delta gain (price move). This is the 'IV Crush' trap."
    }
  ];

  return (
    <div className="bg-slate-900 dark:bg-black text-white rounded-2xl p-8 shadow-2xl border border-slate-700 dark:border-white/10">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700 dark:border-white/10">
        <AlertTriangle className="text-amber-500" />
        <h3 className="text-xl font-bold font-serif">Scenario: The Earnings Trap</h3>
      </div>
      
      <div className="mb-8 min-h-[160px]">
        <h4 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">{scenarioSteps[step].title}</h4>
        <p className="text-lg text-slate-300 mb-4">{scenarioSteps[step].desc}</p>
        <div className="bg-slate-800 dark:bg-[#14171B] p-4 rounded-lg border-l-4 border-[#A8672E] dark:border-[#D08F52] dark:border-l-indigo-500 dark:border-y-white/5 dark:border-r-white/5">
          <p className="font-mono text-sm text-indigo-300 mb-1">ANALYSIS</p>
          <p className="dark:text-slate-300">{scenarioSteps[step].analysis}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {scenarioSteps.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-[#A8672E] dark:bg-[#D08F52]' : 'bg-slate-700 dark:bg-slate-800'
            }`} 
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button 
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 rounded text-slate-400 disabled:opacity-30 hover:bg-slate-800 dark:hover:bg-[#14171B]"
        >
          Previous
        </button>
        <button 
          onClick={() => setStep(Math.min(scenarioSteps.length - 1, step + 1))}
          disabled={step === scenarioSteps.length - 1}
          className="px-6 py-2 rounded bg-[#A8672E] dark:bg-[#D08F52] font-bold hover:bg-[#A8672E] dark:bg-[#D08F52] disabled:opacity-30 disabled:hover:bg-[#A8672E] dark:bg-[#D08F52]"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

interface Strategy {
  name: string;
  desc: string;
  construction: string;
  profile: string;
  breakeven: string[];
  pros: string[];
  cons: string[];
  whenToUse: string[];
}

interface StrategyData {
  name: string;
  subtitle: string;
  type: string;
  cost: string;
  costIcon: React.ReactNode;
  convexity: string;
  theta: string;
  useCase: string;
  trap: string;
}

const StrategyDetail = ({ strategy }: { strategy?: StrategyData }) => {
  if (!strategy) return (
    <div className="p-12 text-center text-slate-400 italic">
      Select a strategy above to see details
    </div>
  );

  return (
    <div className="bg-slate-800 dark:bg-black text-white rounded-2xl p-8 border border-slate-700 dark:border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-1 font-serif">{strategy.name}</h3>
          <p className="text-slate-400">{strategy.subtitle}</p>
        </div>
        <div className="bg-slate-700 dark:bg-[#14171B] px-3 py-1 rounded text-xs font-mono uppercase tracking-widest text-slate-300">
          {strategy.type}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-700/50 dark:bg-[#14171B] p-4 rounded-xl dark:border dark:border-white/5">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Cost</div>
          <div className="text-lg font-bold text-white flex items-center gap-2">
            {strategy.costIcon} {strategy.cost}
          </div>
        </div>
        <div className="bg-slate-700/50 dark:bg-[#14171B] p-4 rounded-xl dark:border dark:border-white/5">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Convexity</div>
          <div className="text-lg font-bold text-[#1D8A70] dark:text-[#3CBF9C]">{strategy.convexity}</div>
        </div>
        <div className="bg-slate-700/50 dark:bg-[#14171B] p-4 rounded-xl dark:border dark:border-white/5">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Theta Burn</div>
          <div className="text-lg font-bold text-[#BC4128] dark:text-[#E2694A]">{strategy.theta}</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <strong className="text-indigo-300 block mb-1">When to use:</strong>
          <p className="text-slate-300 text-sm leading-relaxed">{strategy.useCase}</p>
        </div>
        <div>
          <strong className="text-rose-300 block mb-1">The Trap:</strong>
          <p className="text-slate-300 text-sm leading-relaxed">{strategy.trap}</p>
        </div>
      </div>
    </div>
  );
};

export default function ArticlePage() {
  const [activeStrategy, setActiveStrategy] = useState('straddle');
  const [comparisonSelection, setComparisonSelection] = useState('straddle');

  const strategies: Record<string, Strategy> = {
    straddle: {
      name: "Long Straddle",
      desc: "The delta-neutral anchor of volatility trading.",
      construction: "Buy 1 ATM Call + Buy 1 ATM Put (Same Strike, Same Expiration)",
      profile: "V-shaped payoff. Profits from movement in EITHER direction.",
      breakeven: [
        "Upper BE = Strike + Total Premium Paid",
        "Lower BE = Strike - Total Premium Paid"
      ],
      pros: [
        "Higher probability of profit", 
        "High Gamma sensitivity immediately", 
        "No directional bias needed"
      ],
      cons: [
        "Most expensive (Max Extrinsic Value)", 
        "High Theta (time) decay", 
        "Maximum vulnerability to IV Crush"
      ],
      whenToUse: [
        "IV Rank is LOW (<20)", 
        "Price is consolidating (Bollinger Squeeze)", 
        "Catalyst approaching but NOT PRICED IN"
      ]
    },
    strangle: {
      name: "Long Strangle",
      desc: "Trading probability for leverage and cost efficiency.",
      construction: "Buy 1 OTM Call + Buy 1 OTM Put (Different Strikes, Same Expiration)",
      profile: "U-shaped payoff with a flat bottom. Requires larger move to profit.",
      breakeven: [
        "Upper BE = Call Strike + Total Premium Paid",
        "Lower BE = Put Strike - Total Premium Paid"
      ],
      pros: [
        "Lower upfront cost (Cheaper)", 
        "Explosive ROI potential (Higher Convexity)", 
        "Less sensitive to small chops"
      ],
      cons: [
        "Lower probability of profit", 
        "Requires outsized move", 
        "Delta remains near zero for longer"
      ],
      whenToUse: [
        "You expect a Black Swan event", 
        "IV is extremely low", 
        "Stock has history of massive gaps"
      ]
    }
  };

  const comparisonData: Record<string, StrategyData> = {
    straddle: {
      name: "Long Straddle",
      subtitle: "The Pure Play",
      type: "Unlimited Risk/Reward",
      cost: "High",
      costIcon: <DollarSign size={16} className="text-[#BC4128] dark:text-[#E2694A]"/>,
      convexity: "High",
      theta: "High",
      useCase: "You are sure a move is coming, but have no idea which direction. You need immediate gamma exposure.",
      trap: "Stock stays flat for 3 days. The daily Theta bill eats 10% of your principal even if IV stays the same."
    },
    strangle: {
      name: "Long Strangle",
      subtitle: "The Leverage Play",
      type: "Unlimited Risk/Reward",
      cost: "Medium",
      costIcon: <DollarSign size={16} className="text-amber-400"/>,
      convexity: "Extreme",
      theta: "Medium",
      useCase: "You want to bet on a 'Tail Event' (3+ Sigma move) with less capital at risk than a straddle.",
      trap: "Stock moves 5%, which feels like a lot, but it never reaches your strikes. You lose 100% of the premium."
    },
    condor: {
      name: "Rev. Iron Condor",
      subtitle: "The Conservative Play",
      type: "Defined Risk",
      cost: "Low",
      costIcon: <Shield size={16} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>,
      convexity: "Capped",
      theta: "Low",
      useCase: "You expect a move, but you want to 'finance' your long options by selling further OTM wings. Reduces cost.",
      trap: "Stock explodes 20%. You nailed the move, but your short wings cap your profit early. You leave money on the table."
    },
    backspread: {
      name: "Ratio Backspread",
      subtitle: "The Directional Sniper",
      type: "Unlimited Reward",
      cost: "Zero / Credit",
      costIcon: <Zap size={16} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>,
      convexity: "Directional",
      theta: "Mixed",
      useCase: "You are Bearish (Put Backspread) or Bullish (Call Backspread). If you are wrong, you lose nothing (or make small credit). If right, unlimited gain.",
      trap: "The 'Valley of Death'. Stock moves slightly in your direction, but not enough to overcome the short option you sold."
    },
    calendar: {
      name: "Long Calendar",
      subtitle: "The Volatility Grinder",
      type: "Vega Play",
      cost: "Low",
      costIcon: <Clock size={16} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>,
      convexity: "Negative",
      theta: "Positive",
      useCase: "You expect the stock to stay quiet, but IV to rise (e.g., pre-earnings run up).",
      trap: "Stock moves TOO much. You are short Gamma. A big move in either direction hurts you."
    }
  };

  return (
    <ArticleFrame slug="mastering-volatility-definitive-guide-long-straddles-strangles">
          {/* 1. The Physics of Volatility */}
          <section className="py-24">
            <div className="max-w-4xl mx-auto mb-16">
              <InfographicSlot alt="Mastering Volatility: Straddles and Strangles Overview" />
            </div>
            <SectionTitle subtitle="To trade volatility, you must understand the tension between Expectation (IV) and Reality (RV).">
              The Physics of Volatility
            </SectionTitle>
            
            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <Card title="Implied Volatility (IV)" icon={Brain} color="indigo">
                <p>
                  <strong className="dark:text-white">The Price of Fear.</strong> IV isn't a statistical calculation; it's a price derived from the options market. 
                  It represents the market's <em>consensus forecast</em> of future range.
                </p>
                <div className="mt-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Key Metric: IV Rank (IVR)</h4>
                  <p className="text-sm text-indigo-800 dark:text-indigo-200/80">
                    Never look at IV in a vacuum. A 50% IV might be low for Tesla but high for Coke. <br/>
                    <strong className="dark:text-indigo-200">Always use IV Rank:</strong> Where is current IV compared to the last 52 weeks?
                  </p>
                </div>
              </Card>

              <Card title="Realized Volatility (RV)" icon={BarChart2} color="cyan">
                <p>
                  <strong className="dark:text-white">The Reality.</strong> RV is the cold, hard math of what the stock actually did. 
                  It is the historical standard deviation of log returns.
                </p>
                <div className="mt-4 bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-xl border border-cyan-100 dark:border-cyan-900/50">
                  <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-2">The Profit Formula</h4>
                  <p className="text-sm text-cyan-800 dark:text-cyan-200/80 font-mono">Profit = (Realized Volatility &gt; Implied Volatility)</p>
                  <p className="text-xs text-cyan-700 dark:text-cyan-400 mt-2">You are betting that the market is "underpricing" the move.</p>
                </div>
              </Card>
            </div>

            {/* IV Crush Section */}
            <div className="bg-white dark:bg-[#14171B] rounded-3xl p-2 shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden">
              <div className="bg-slate-50 dark:bg-black/30 p-8 md:p-12 rounded-[2rem] dark:border dark:border-white/5">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white font-serif">The Silent Killer: IV Crush</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 leading-relaxed">
                      The most common pitfall for beginners is buying straddles right before a known event (Earnings, CPI). 
                      This is usually a trap.<br/><br/>
                      When the event passes, the "uncertainty premium" evaporates instantly. This drop in Vega can wipe out 
                      profits even if the stock moves in your direction.
                    </p>
                    <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-6 rounded-r-xl">
                      <h4 className="font-bold text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-2">
                        <AlertTriangle size={20}/> The Golden Rule
                      </h4>
                      <p className="text-[#BC4128] dark:text-[#E2694A] dark:text-rose-200/80">
                        Buy Volatility when it is quiet and cheap (Low IV).<br/>
                        Sell Volatility when it is loud and expensive (High IV).
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <ScenarioSimulator />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Strategy Mechanics */}
          <section className="py-24 bg-white dark:bg-[#14171B] border-y border-slate-100 dark:border-white/10 -mx-6 px-6">
            <SectionTitle subtitle="Deep dive into the mechanics, math, and execution of the two primary instruments.">
              Mechanics & Structure
            </SectionTitle>

            <div className="flex justify-center mb-12 gap-6">
              <TabButton 
                active={activeStrategy === 'straddle'} 
                onClick={() => setActiveStrategy('straddle')}
              >
                Long Straddle
              </TabButton>
              <TabButton 
                active={activeStrategy === 'strangle'} 
                onClick={() => setActiveStrategy('strangle')}
              >
                Long Strangle
              </TabButton>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-slate-50 dark:bg-black/30 rounded-[2.5rem] p-1 shadow-inner border border-slate-200 dark:border-white/5">
                <div className="bg-white dark:bg-[#1A1E23] rounded-[2rem] p-8 md:p-14 shadow-sm dark:border dark:border-white/10">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-b border-slate-100 dark:border-white/10 pb-10">
                    <div>
                      <h3 className="text-4xl font-bold text-slate-800 dark:text-white mb-3 font-serif">{strategies[activeStrategy].name}</h3>
                      <p className="text-xl text-slate-500 dark:text-slate-400">{strategies[activeStrategy].desc}</p>
                    </div>
                    <div className="mt-4 md:mt-0 px-6 py-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 text-[#A8672E] dark:text-[#D08F52] dark:text-indigo-300 rounded-xl font-mono text-sm font-bold border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                      {activeStrategy === 'straddle' ? 'ATM Call + ATM Put' : 'OTM Call + OTM Put'}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-16">
                    <div>
                      <h4 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-6 flex items-center gap-3">
                        <Target size={24} className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]"/> Blueprint
                      </h4>
                      
                      <div className="space-y-6">
                        <div className="bg-slate-50 dark:bg-[#14171B] p-5 rounded-xl border border-slate-100 dark:border-white/5">
                          <strong className="text-slate-900 dark:text-white block mb-2 text-sm uppercase tracking-wide">Construction</strong>
                          <p className="text-slate-600 dark:text-slate-400">{strategies[activeStrategy].construction}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-[#14171B] p-5 rounded-xl border border-slate-100 dark:border-white/5">
                          <strong className="text-slate-900 dark:text-white block mb-2 text-sm uppercase tracking-wide">Payoff Profile</strong>
                          <p className="text-slate-600 dark:text-slate-400">{strategies[activeStrategy].profile}</p>
                        </div>
                      </div>

                      <MathBox 
                        title="Breakeven Calculations"
                        formulas={strategies[activeStrategy].breakeven}
                      />
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-4 flex items-center gap-2">
                          <CheckCircle size={24}/> When To Use
                        </h4>
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-900/50">
                          <ul className="space-y-3">
                            {strategies[activeStrategy].whenToUse.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-emerald-900 dark:text-emerald-200">
                                <ArrowRight size={18} className="mt-1 shrink-0 opacity-50 text-[#1D8A70] dark:text-[#3CBF9C]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-3 text-lg">Pros</h4>
                          <ul className="space-y-2">
                            {strategies[activeStrategy].pros.map((pro, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-[#A8672E] dark:bg-[#D08F52] mt-2.5 shrink-0"></span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-3 text-lg">Cons</h4>
                          <ul className="space-y-2">
                            {strategies[activeStrategy].cons.map((con, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A] mt-2.5 shrink-0"></span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. The Greeks Deep Dive */}
          <section className="py-24">
            <SectionTitle subtitle="In volatility trading, you are not trading stock price. You are trading these four variables.">
              The Four Horsemen of Risk
            </SectionTitle>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card title="Delta (Δ)" icon={Activity} color="purple">
                <div className="text-sm space-y-4">
                  <p><strong className="dark:text-white">Directional Risk.</strong> Measures change in option price per $1 move in stock.</p>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded text-purple-900 dark:text-purple-300 font-medium">
                    Straddle Delta ≈ 0<br/>(Neutral Start)
                  </div>
                  <p>As stock moves, Delta <em>changes</em>. This change creates your profit.</p>
                </div>
              </Card>

              <Card title="Gamma (Γ)" icon={Zap} color="emerald">
                <div className="text-sm space-y-4">
                  <p><strong className="dark:text-white">Acceleration.</strong> Measures how fast Delta changes. This is the "Convexity" or "Explosiveness".</p>
                  <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/30 p-3 rounded text-emerald-900 dark:text-emerald-300 font-medium">
                    Max Gamma = ATM<br/>Max Gamma = Near Expiration
                  </div>
                  <p>You want high Gamma to explode your profits when the move happens.</p>
                </div>
              </Card>

              <Card title="Theta (Θ)" icon={Clock} color="rose">
                <div className="text-sm space-y-4">
                  <p><strong className="dark:text-white">Time Decay.</strong> The daily cost of holding the position.</p>
                  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/30 p-3 rounded text-rose-900 dark:text-rose-300 font-medium">
                    Straddles bleed cash daily.<br/>Theta accelerates &lt; 21 DTE.
                  </div>
                  <p>Theta is the enemy. It is the hurdle rate your stock move must exceed.</p>
                </div>
              </Card>

              <Card title="Vega (ν)" icon={TrendingUp} color="amber">
                <div className="text-sm space-y-4">
                  <p><strong className="dark:text-white">Volatility Sensitivity.</strong> Change in option price per 1% change in IV.</p>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded text-amber-900 dark:text-amber-300 font-medium">
                    Long Straddle = Long Vega
                  </div>
                  <p>If IV expands (panic), you make money even if price doesn't move.</p>
                </div>
              </Card>
            </div>
          </section>

          {/* 4. Lifecycle of a Trade */}
          <section className="py-24 bg-slate-900 dark:bg-black text-slate-100 -mx-6 px-6 border-y border-slate-800 dark:border-white/10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-serif">
                The Lifecycle of a Trade
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Professional volatility trading is 10% entry and 90% management. Follow this flowchart.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector Lines for Desktop */}
              <div className="hidden md:block absolute top-12 left-[30%] w-[40%] h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 z-0 opacity-30"></div>

              {/* Phase 1 */}
              <div className="relative z-10 bg-slate-800 dark:bg-[#14171B] p-8 rounded-2xl border border-slate-700 dark:border-white/10 hover:border-[#1D8A70] dark:border-[#3CBF9C] transition-colors">
                <div className="w-12 h-12 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-emerald-500/20 text-white">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1D8A70] dark:text-[#3CBF9C] font-serif">Entry Phase</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-[#1D8A70] dark:text-[#3CBF9C] shrink-0"/> 
                    <span><strong className="text-white">IV Rank:</strong> Must be Low (below 20-30). You want to buy cheap options.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-[#1D8A70] dark:text-[#3CBF9C] shrink-0"/> 
                    <span><strong className="text-white">Chart:</strong> Look for "Squeezes" (Bollinger Bands tightening).</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-[#1D8A70] dark:text-[#3CBF9C] shrink-0"/> 
                    <span><strong className="text-white">Duration:</strong> Buy 45-60 Days to Expiration (DTE) to minimize Theta decay initially.</span>
                  </li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="relative z-10 bg-slate-800 dark:bg-[#14171B] p-8 rounded-2xl border border-slate-700 dark:border-white/10 hover:border-[#A8672E] dark:border-[#D08F52] transition-colors">
                <div className="w-12 h-12 bg-[#A8672E] dark:bg-[#D08F52] rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-indigo-500/20 text-white">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#A8672E] dark:text-[#D08F52] font-serif">Management</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex gap-3">
                    <Activity size={20} className="text-[#A8672E] dark:text-[#D08F52] shrink-0"/> 
                    <span><strong className="text-white">Target:</strong> Take profit at 25% to 50% gain. Do not be greedy.</span>
                  </li>
                  <li className="flex gap-3">
                    <Activity size={20} className="text-[#A8672E] dark:text-[#D08F52] shrink-0"/> 
                    <span><strong className="text-white">Gamma Scalp:</strong> If the stock moves but doesn't hit target, trade stock against it to reduce basis.</span>
                  </li>
                  <li className="flex gap-3">
                    <Activity size={20} className="text-[#A8672E] dark:text-[#D08F52] shrink-0"/> 
                    <span><strong className="text-white">Rolling:</strong> Never hold losing trades hoping for a miracle.</span>
                  </li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="relative z-10 bg-slate-800 dark:bg-[#14171B] p-8 rounded-2xl border border-slate-700 dark:border-white/10 hover:border-[#BC4128] dark:border-[#E2694A] transition-colors">
                <div className="w-12 h-12 bg-[#BC4128] dark:bg-[#E2694A] rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-rose-500/20 text-white">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#BC4128] dark:text-[#E2694A] font-serif">Exit / Defense</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex gap-3">
                    <XCircle size={20} className="text-[#BC4128] dark:text-[#E2694A] shrink-0"/> 
                    <span><strong className="text-white">21 DTE Rule:</strong> Close trade at 21 days to expiration regardless of P&L to avoid Gamma risk.</span>
                  </li>
                  <li className="flex gap-3">
                    <XCircle size={20} className="text-[#BC4128] dark:text-[#E2694A] shrink-0"/> 
                    <span><strong className="text-white">IV Drop:</strong> If IV drops significantly and price hasn't moved, close immediately.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. Gamma Scalping Details */}
          <section className="py-24">
            <SectionTitle subtitle="Advanced Tactics: Turning a passive bet into an active income stream.">
              Gamma Scalping Logic
            </SectionTitle>

            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white font-serif">Why Scalp?</h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  When you own a Straddle, you are Long Gamma. This means your position gets larger in the direction of the trend. 
                  <br/><br/>
                  Gamma Scalping is the process of flattening your Deltas (returning to neutral) to lock in realized gains 
                  while keeping the option position open for further potential.
                </p>

                <div className="bg-white dark:bg-[#14171B] border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-100 dark:border-white/10 pb-2">The Algorithm</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 text-[#A8672E] dark:text-[#D08F52] dark:text-indigo-300 font-bold px-3 py-1 rounded text-sm shrink-0">Step 1</div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Stock Rises &rarr; Delta becomes Positive (Long). <br/>
                        <span className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold">Action: Sell Stock to Neutralize.</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 text-[#A8672E] dark:text-[#D08F52] dark:text-indigo-300 font-bold px-3 py-1 rounded text-sm shrink-0">Step 2</div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Stock Falls &rarr; Delta becomes Negative (Short). <br/>
                        <span className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold">Action: Buy Stock to Neutralize.</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-100 dark:bg-emerald-900/50 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300 font-bold px-3 py-1 rounded text-sm shrink-0">Result</div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        You effectively "Buy Low and Sell High" repeatedly during chop, offsetting your Theta bill.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="bg-slate-900 dark:bg-black rounded-2xl shadow-2xl overflow-hidden border border-slate-700 dark:border-white/10">
                  <div className="bg-slate-800 dark:bg-[#14171B] p-4 border-b border-slate-700 dark:border-white/10 flex justify-between items-center">
                    <span className="font-bold text-white">Live Portfolio Simulation</span>
                    <span className="text-xs font-mono text-[#1D8A70] dark:text-[#3CBF9C]">● LIVE</span>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center text-sm border-b border-slate-700 dark:border-white/10 pb-2">
                      <span className="text-slate-400">Underlying Price</span>
                      <span className="font-mono text-white text-lg">$100.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-700 dark:border-white/10 pb-2">
                      <span className="text-slate-400">Net Delta</span>
                      <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">0 (Neutral)</span>
                    </div>
                    <div className="py-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-700 dark:bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-widest mb-2">
                        Market Rally (+2%)
                      </span>
                      <ArrowRight className="mx-auto text-slate-500 rotate-90" size={20}/>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-700 dark:border-white/10 pb-2">
                      <span className="text-slate-400">New Price</span>
                      <span className="font-mono text-white text-lg">$102.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-700 dark:border-white/10 pb-2">
                      <span className="text-slate-400">New Delta</span>
                      <span className="font-mono text-[#A8672E] dark:text-[#D08F52]">+20 (You are now Long)</span>
                    </div>
                    <div className="bg-[#A8672E] dark:bg-[#D08F52] p-4 rounded-lg text-center text-white font-bold shadow-lg shadow-indigo-900/50 mt-4">
                      <div className="text-xs text-indigo-200 uppercase tracking-wide mb-1">Adjustment Required</div>
                      SELL 20 SHARES @ $102.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Comparison Table (Expanded) */}
          <section className="py-24 bg-white dark:bg-[#14171B] border-t border-slate-200 dark:border-white/10 -mx-6 px-6">
            <SectionTitle subtitle="One size does not fit all. Select the right structure for your market view.">
              The Volatility Arsenal
            </SectionTitle>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Side: Table */}
              <div className="lg:w-2/3">
                <div className="overflow-x-auto shadow-xl rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1E23]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-black/50 text-slate-700 dark:text-slate-400 text-sm uppercase tracking-wider">
                        <th className="p-4 font-bold border-b border-slate-200 dark:border-white/10">Strategy</th>
                        <th className="p-4 font-bold border-b border-slate-200 dark:border-white/10">Cost</th>
                        <th className="p-4 font-bold border-b border-slate-200 dark:border-white/10 hidden md:table-cell">Convexity</th>
                        <th className="p-4 font-bold border-b border-slate-200 dark:border-white/10">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm text-slate-600 dark:text-slate-300">
                      {Object.entries(comparisonData).map(([key, data]) => (
                        <tr 
                          key={key} 
                          className={`transition-colors cursor-pointer ${
                            comparisonSelection === key 
                              ? 'bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 border-l-4 border-l-indigo-500' 
                              : 'hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-[#14171B] border-l-4 border-l-transparent'
                          }`}
                          onClick={() => setComparisonSelection(key)}
                        >
                          <td className="p-4">
                            <div className="font-bold text-slate-800 dark:text-white text-base">{data.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{data.type}</div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                              data.cost === 'High' ? 'bg-rose-100 text-[#BC4128] dark:text-[#E2694A] dark:bg-rose-900/30 dark:text-[#BC4128] dark:text-[#E2694A] border border-transparent dark:border-rose-800' : 
                              data.cost === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-transparent dark:border-amber-800' : 
                              'bg-emerald-100 text-[#1D8A70] dark:text-[#3CBF9C] dark:bg-emerald-900/30 dark:text-[#1D8A70] dark:text-[#3CBF9C] border border-transparent dark:border-emerald-800'
                            }`}>
                              {data.cost}
                            </span>
                          </td>
                          <td className="p-4 hidden md:table-cell">{data.convexity}</td>
                          <td className="p-4">
                            <button className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold text-xs uppercase hover:underline">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Interactive Strategy Finder */}
                <div className="mt-8 bg-indigo-900 dark:bg-black rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border dark:border-white/10">
                  <div>
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <Scale size={20}/> Find Your Trade
                    </h4>
                    <p className="text-indigo-200 text-sm">Not sure what to trade? Click your view.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setComparisonSelection('condor')} 
                      className="px-4 py-2 bg-[#A8672E] dark:bg-[#D08F52] hover:bg-[#A8672E] dark:bg-[#D08F52] rounded text-sm font-bold transition"
                    >
                      I'm Broke
                    </button>
                    <button 
                      onClick={() => setComparisonSelection('backspread')} 
                      className="px-4 py-2 bg-[#A8672E] dark:bg-[#D08F52] hover:bg-[#A8672E] dark:bg-[#D08F52] rounded text-sm font-bold transition"
                    >
                      I'm Biased
                    </button>
                    <button 
                      onClick={() => setComparisonSelection('straddle')} 
                      className="px-4 py-2 bg-[#A8672E] dark:bg-[#D08F52] hover:bg-[#A8672E] dark:bg-[#D08F52] rounded text-sm font-bold transition"
                    >
                      I'm Uncertain
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Detail View */}
              <div className="lg:w-1/3">
                <StrategyDetail strategy={comparisonData[comparisonSelection]} />
              </div>
            </div>
          </section>

    </ArticleFrame>
  );
}