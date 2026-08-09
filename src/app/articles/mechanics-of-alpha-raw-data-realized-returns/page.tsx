'use client';

import React, { useState, useMemo, useRef } from 'react';
import { BookOpen, TrendingUp, AlertTriangle, Activity, BarChart2, Layers, CheckCircle, XCircle, ArrowRight, Brain, Shield, Target, Maximize2, Minimize2, Code, Scissors, Filter, Database, Zap, Clock, PieChart, Dices, Scale, RefreshCw, GitMerge, ScatterChart, Grid, Sun, CloudRain, TrendingDown, DollarSign, Anchor, Briefcase, Lock, Search, EyeOff, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { FormulaPanel } from '@/components/articles/article-visuals';

// --- TypeScript Interfaces ---
interface ExpandableDeepDiveProps {
  title: string;
  children: React.ReactNode;
  color?: 'blue' | 'emerald' | 'amber' | 'rose' | 'violet' | 'indigo';
  codeSnippet?: {
    title: string;
    code: string;
  };
}

// --- Components ---
const ExpandableDeepDive: React.FC<ExpandableDeepDiveProps> = ({ title, children, color = "blue", codeSnippet }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-blue-200 dark:border-blue-800",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800",
    amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 border-amber-200 dark:border-amber-800",
    rose: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40 border-rose-200 dark:border-rose-800",
    violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 border-violet-200 dark:border-violet-800",
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border-indigo-200 dark:border-indigo-800",
  };

  return (
    <div className="mt-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all border ${colors[color]} w-full md:w-auto justify-center md:justify-start shadow-sm font-serif`}
      >
        {isOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        {isOpen ? "Close Deep Dive" : `Deep Dive: ${title}`}
      </button>
      {isOpen && (
        <div className="mt-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
            {codeSnippet && (
              <div className="mt-6">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-sans">Python Implementation</h5>
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 shadow-lg">
                  <div className="bg-slate-900 px-4 py-2 text-xs font-mono text-slate-400 flex justify-between items-center border-b border-slate-800">
                    <span>{codeSnippet.title}</span>
                    <span className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    </span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-blue-100">
                    <code>{codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Interactive Simulators ---
interface SimulationResult {
  id: number;
  path: number[];
  sharpe: number;
}

const PHackingSimulator: React.FC = () => {
  const [simulations, setSimulations] = useState<SimulationResult[]>([]);
  const [bestSim, setBestSim] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [trialCount, setTrialCount] = useState<number>(0);

  const runSim = () => {
    setIsRunning(true);
    setSimulations([]);
    setBestSim(null);
    
    setTimeout(() => {
      const numSims = 100; // Simulate 100 random analysts
      const steps = 50;
      const newSims: SimulationResult[] = [];
      let maxSharpe = -999;
      let bestRun: SimulationResult | null = null;

      for(let i=0; i<numSims; i++) {
        let price = 100;
        const path = [100];
        let returns = [];

        // Random Walk with zero drift (Pure Noise)
        for(let t=0; t<steps; t++) {
          const ret = (Math.random() - 0.5) * 0.04; 
          price = price * (1 + ret);
          path.push(price);
          returns.push(ret);
        }

        // Calc Sharpe
        const mean = returns.reduce((a,b)=>a+b,0)/steps;
        const std = Math.sqrt(returns.map(x=>Math.pow(x-mean, 2)).reduce((a,b)=>a+b,0)/steps);
        const sharpe = (mean/std) * Math.sqrt(252);

        const simObj = { id: i, path, sharpe };
        newSims.push(simObj);

        if(sharpe > maxSharpe) {
          maxSharpe = sharpe;
          bestRun = simObj;
        }
      }

      setSimulations(newSims);
      setBestSim(bestRun);
      setTrialCount(prev => prev + numSims);
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-rose-200 dark:border-rose-900/50 mt-6 shadow-sm relative overflow-hidden">
      <h4 className="font-bold text-rose-800 dark:text-rose-400 mb-2 flex items-center gap-2 text-xl relative z-10 font-serif">
        <Search size={24} className="text-rose-500" /> P-Hacking Simulator
      </h4>
      <p className="text-slate-600 dark:text-slate-400 mb-8 relative z-10 max-w-2xl leading-relaxed">
        We will generate <strong className="text-slate-900 dark:text-slate-200">100 completely random strategies</strong> (noise). Statistically, one of them will look amazing just by luck. This is "Selection Bias".
      </p>
      
      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        <div className="flex-1 h-64 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-inner">
          {/* Chart Area */}
          <div className="absolute inset-0 flex items-end px-2 pb-2">
            {simulations.length > 0 ? (
              <svg className="w-full h-full" viewBox="0 0 50 100" preserveAspectRatio="none">
                {simulations.map((sim, i) => (
                  <polyline 
                    key={i}
                    points={sim.path.map((p: number, idx: number) => `${idx},${100 - ((p-80)/40)*100}`).join(' ')}
                    fill="none"
                    stroke={sim.id === bestSim?.id ? "#e11d48" : "currentColor"}
                    className={sim.id === bestSim?.id ? "" : "text-slate-300 dark:text-slate-700"}
                    strokeWidth={sim.id === bestSim?.id ? "2" : "0.5"}
                    opacity={sim.id === bestSim?.id ? "1" : "0.4"}
                  />
                ))}
              </svg>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500 italic text-sm">
                Click 'Mine for Alpha' to generate noise
              </div>
            )}
          </div>
          {/* Labels */}
          <div className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">Equity Curve</div>
        </div>

        <div className="w-full md:w-64 flex flex-col justify-center gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center md:text-left">
            <div className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-wider">Best Random Sharpe</div>
            <div className={`text-4xl font-mono font-black ${bestSim && bestSim.sharpe > 1.5 ? 'text-emerald-500' : 'text-slate-800 dark:text-slate-200'}`}>
              {bestSim ? bestSim.sharpe.toFixed(2) : "0.00"}
            </div>
            {bestSim && bestSim.sharpe > 2.0 && (
              <div className="text-xs text-rose-500 font-bold mt-2">⚠️ Amazing! (But Fake)</div>
            )}
          </div>

          <button 
            onClick={runSim}
            disabled={isRunning}
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-lg shadow-rose-600/20 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <RefreshCw className="animate-spin" size={20}/> : <Dices size={20}/>}
            {isRunning ? "Mining Data..." : "Mine for Alpha"}
          </button>

          <div className="text-center text-xs font-mono text-slate-500">
            Total Strategies Tested: {trialCount}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---
export default function MechanicsOfAlphaPage(): React.ReactElement {
  return (
    <ArticleFrame slug="mechanics-of-alpha-raw-data-realized-returns">
      <div className="pb-24">
        <InfographicSlot alt="The Mechanics of Alpha Infographic" />
        <main className="max-w-4xl mx-auto py-16 px-6 lg:px-8 space-y-24">
          
          {/* SECTION 1: Theoretical Foundations */}
          <section id="theory">
            <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-500">
                <Target size={36} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-slate-900 dark:text-white">The Fundamental Law</h2>
              </div>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Before analyzing data, we must understand the mathematical bedrock of active management. This equation defines the upper limit of your potential performance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-indigo-700 dark:text-indigo-400 font-serif">
                  <Activity size={24} /> The Equation of Skill
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  The Fundamental Law of Active Management, formulated by Grinold and Kahn, breaks down performance into two independent components: Skill and Opportunity.
                </p>
                <FormulaPanel 
                  title="Information Ratio (IR)"
                  formula="\text{IR} \approx \text{IC} \times \sqrt{\text{BR}}"
                />
                <div className="mt-6 bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong className="text-slate-900 dark:text-white">IR:</strong> Information Ratio (Active Return / Active Risk)</li>
                    <li><strong className="text-slate-900 dark:text-white">IC:</strong> Information Coefficient (Correlation of signal to return)</li>
                    <li><strong className="text-slate-900 dark:text-white">BR:</strong> Breadth (Number of independent bets per year)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-800/30 p-8">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-serif">The Extended Law (Reality Check)</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    In practice, constraints (liquidity, risk limits, long-only) prevent you from fully expressing your signal. We introduce a "Transfer Coefficient" to measure this leakage.
                  </p>
                  <div className="bg-white/80 dark:bg-black/20 p-5 rounded-xl border border-indigo-200/50 dark:border-indigo-800/30 font-mono text-lg text-indigo-900 dark:text-indigo-300 mb-4 shadow-sm text-center">
                    E(R_A) = TC × IC × √BR × σ_A
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <p><strong className="text-slate-900 dark:text-white">TC (Transfer Coefficient):</strong> Correlation between your ideal weights and actual weights.</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong className="text-slate-900 dark:text-white">TC = 1.0:</strong> Pure Long/Short, no friction.</li>
                      <li><strong className="text-slate-900 dark:text-white">TC = 0.3:</strong> Long-only, sector neutral, low turnover.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-l-4 border-l-rose-500 p-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-serif text-lg">
                    <AlertTriangle size={20} className="text-rose-500" />
                    Why Theory Fails
                  </h4>
                  <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex gap-3">
                      <span className="font-bold text-rose-500 mt-0.5">•</span>
                      <span className="leading-relaxed"><strong className="text-slate-900 dark:text-white">The Independence Illusion:</strong> 500 stocks ≠ 500 bets if they all crash together. BR is usually lower than you think.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-rose-500 mt-0.5">•</span>
                      <span className="leading-relaxed"><strong className="text-slate-900 dark:text-white">Non-Linearity:</strong> Pearson IC assumes linear relationships. It fails to capture "smile" curves (e.g., extreme growth and extreme value both outperforming).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 2: Implementation */}
          <section id="implementation">
            <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-3 mb-4 text-amber-600 dark:text-amber-500">
                <TrendingUp size={36} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-slate-900 dark:text-white">Implementation Reality</h2>
              </div>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                High IC does not guarantee profit. Frictions, costs, and constraints eat Alpha for breakfast.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800"></div>
              
              <div className="relative pl-20 md:pl-28 pb-16">
                <div className="absolute left-0 md:left-2 top-0 w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-slate-900 border-4 border-amber-500 dark:border-amber-600 rounded-full flex items-center justify-center font-bold text-amber-600 dark:text-amber-500 shadow-sm z-10 text-lg md:text-xl font-serif">1</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Implementation Shortfall</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-8 leading-relaxed">
                  The difference between your "Paper Return" and "Realized Return". It has three main components:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Delay Cost", desc: "Price moves away while you calculate or wait." },
                    { title: "Market Impact", desc: "Your buying pushes price up against you." },
                    { title: "Opportunity Cost", desc: "Profits missed because limit orders didn't fill." }
                  ].map((item, i) => (
                    <div key={i} className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-2xl border border-amber-100 dark:border-amber-800/30">
                      <strong className="block text-amber-900 dark:text-amber-300 mb-2 font-serif text-lg">{item.title}</strong>
                      <span className="text-sm text-amber-800 dark:text-amber-200/80 leading-relaxed block">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative pl-20 md:pl-28 pb-16">
                <div className="absolute left-0 md:left-2 top-0 w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-slate-900 border-4 border-amber-500 dark:border-amber-600 rounded-full flex items-center justify-center font-bold text-amber-600 dark:text-amber-500 shadow-sm z-10 text-lg md:text-xl font-serif">2</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Square Root Law of Impact</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
                  Market impact is not linear. It scales with the square root of trade size relative to volume.
                </p>
                
                <div className="max-w-2xl">
                  <FormulaPanel 
                    title="Impact Cost Model"
                    formula="\text{Cost} \approx \sigma \times \sqrt{\frac{Q}{V}}"
                  />
                  <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm leading-relaxed">
                    Doubling your trade size doesn't double cost—it increases it by ~1.41x (√2). This non-linearity is why high-turnover strategies have a hard AUM cap.
                  </p>
                </div>
              </div>

              <div className="relative pl-20 md:pl-28 pb-0">
                <div className="absolute left-0 md:left-2 top-0 w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-slate-900 border-4 border-amber-500 dark:border-amber-600 rounded-full flex items-center justify-center font-bold text-amber-600 dark:text-amber-500 shadow-sm z-10 text-lg md:text-xl font-serif">3</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Portfolio Construction</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl leading-relaxed">
                  How do we turn a Z-score into a dollar weight? The simplest robust method is <strong className="text-slate-900 dark:text-white">Inverse Volatility Scaling</strong>.
                </p>
                <ExpandableDeepDive 
                  title="Python: Signal to Weights" 
                  color="amber"
                  codeSnippet={{
                    title: "optimizer.py",
                    code: `def signal_to_weights(df):
    # 1. Scale signal by inverse volatility
    # Highly volatile stocks get less weight for same signal strength
    df['unnormalized_weight'] = df['signal'] / df['volatility_60d']
    
    # 2. Leverage targeting (e.g., Gross Leverage = 1.0)
    total_absolute_weight = df['unnormalized_weight'].abs().sum()
    df['weight'] = df['unnormalized_weight'] / total_absolute_weight
    
    return df['weight']`
                  }}
                >
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    This effectively equalizes risk contributions. A signal of +2 on a Utility stock (low vol) might result in a 5% position, while a signal of +2 on a BioTech stock (high vol) might only get a 1% position.
                  </p>
                </ExpandableDeepDive>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* SECTION 3: The Backtest Lie */}
          <section id="backtesting">
            <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-3 mb-4 text-rose-600 dark:text-rose-500">
                <Shield size={36} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-slate-900 dark:text-white">The Backtest Lie</h2>
              </div>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Why do Sharpe 2.0 strategies fail in production? Overfitting, P-Hacking, and Point-in-Time errors create a 'Paper Wealth' illusion.
              </p>
            </div>

            <PHackingSimulator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-rose-500 p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white font-serif">
                  <Clock size={24} className="text-rose-500" /> Look-Ahead Bias
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                  Using data in your backtest that wasn't available at the time. This is the #1 reason for backtest failure.
                </p>
                <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-xl border border-rose-100 dark:border-rose-900/30 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-rose-900 dark:text-rose-300">
                    <XCircle size={18} className="shrink-0 mt-0.5 text-rose-500" /> 
                    <span><strong className="font-bold">Mistake:</strong> Using Q1 Earnings on March 31st.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-emerald-800 dark:text-emerald-300">
                    <CheckCircle size={18} className="shrink-0 mt-0.5 text-emerald-500" /> 
                    <span><strong className="font-bold">Reality:</strong> Earnings aren't released until April 15th.</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-rose-200 dark:border-rose-800/50 italic mt-3">Always use "Point-in-Time" databases.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-purple-500 p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white font-serif">
                  <PieChart size={24} className="text-purple-500" /> Overfitting / P-Hacking
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                  If you test 100 random signal variations, 5 will look profitable by pure chance (p=0.05). If you keep only those 5, you are lying to yourself.
                </p>
                <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Solution: Deflated Sharpe Ratio (DSR)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">DSR penalizes the Sharpe Ratio based on the number of trials (N).</p>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg font-mono text-xs md:text-[10px] lg:text-xs text-slate-700 dark:text-slate-300 overflow-x-auto shadow-sm">
                    SR_adj = SR * sqrt(1 - ((1 - γ) * N_trials⁻¹))
                  </div>
                </div>
              </div>
            </div>

            <ExpandableDeepDive 
              title="Advanced: Purged K-Fold CV" 
              color="rose"
              codeSnippet={{
                title: "validation.py",
                code: `from sklearn.model_selection import KFold

def purged_kfold_split(dates, n_splits=5, embargo_pct=0.01):
    """Standard K-Fold fails in finance due to serial correlation.
    If Train and Test are next to each other, they 'leak' info."""
    
    indices = np.arange(len(dates))
    folds = KFold(n_splits=n_splits, shuffle=False)
    
    for train_idx, test_idx in folds.split(indices):
        # 1. Purge: Remove train samples that overlap with test labels
        # (e.g., if label is 1-month return, remove 1 month before test)
        
        # 2. Embargo: Drop a buffer period AFTER the test set
        # to kill lingering correlation effects.
        embargo = int(len(dates) * embargo_pct)
        test_end = test_idx.max()
        train_idx = train_idx[train_idx > test_end + embargo]
        
        yield train_idx, test_idx`
              }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl shrink-0">
                  <EyeOff size={32}/>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg font-serif">The "Leakage" Problem</h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                    In standard AI (images), datapoints are independent. In finance, Monday's price is 99% correlated with Tuesday's price.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
                    <strong className="text-rose-900 dark:text-rose-300 font-bold">Purged K-Fold</strong> enforces a "Gap" (Embargo) between training and testing data. This prevents the model from "peeking" across the boundary via serial correlation. Without this, your backtest Sharpe will be double the reality.
                  </p>
                </div>
              </div>
            </ExpandableDeepDive>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}