'use client';

import React, { useState, useMemo, useRef } from 'react';
import { BookOpen, TrendingUp, AlertTriangle, Activity, BarChart2, Layers, CheckCircle, XCircle, ArrowRight, Brain, Shield, Target, Maximize2, Minimize2, Code, Scissors, Filter, Database, Zap, Clock, PieChart, Dices, Scale, RefreshCw, GitMerge, ScatterChart, Grid, Sun, CloudRain, TrendingDown, DollarSign, Anchor, Briefcase, Lock, Search, EyeOff, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- TypeScript Interfaces ---
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number }>;
  colorClass: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface FormulaBoxProps {
  title: string;
  formula: string;
  description: string;
  variables?: string[];
}

interface CodeSnippetProps {
  title: string;
  code: string;
}

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
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon, colorClass }) => (
  <div className="mb-12">
    <div className={`flex items-center gap-4 mb-4`}>
      <div className={`p-4 rounded-2xl ${colorClass} text-white shadow-lg transform rotate-3`}>
        <Icon size={28} />
      </div>
      <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
    </div>
    <p className="text-xl text-slate-600 ml-0 md:ml-20 max-w-3xl leading-relaxed border-l-4 border-slate-200 pl-6">{subtitle}</p>
  </div>
);

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const FormulaBox: React.FC<FormulaBoxProps> = ({ title, formula, description, variables }) => (
  <div className="my-8 bg-slate-50 border-l-4 border-indigo-500 rounded-r-xl p-8 shadow-sm group hover:bg-indigo-50/30 transition-colors">
    <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
      <Code size={16} /> {title}
    </h4>
    <div className="font-mono text-2xl md:text-3xl text-slate-800 mb-6 bg-white p-6 rounded-xl border border-slate-200 inline-block shadow-inner">
      {formula}
    </div>
    <p className="text-slate-600 mb-4 italic text-lg">{description}</p>
    {variables && (
      <div className="bg-white rounded-lg p-4 border border-slate-100">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-500">
          {variables.map((v, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              {v}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const CodeSnippet: React.FC<CodeSnippetProps> = ({ title, code }) => (
  <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-[#1e1e1e] shadow-lg">
    <div className="bg-[#2d2d2d] px-4 py-2 text-xs font-mono text-slate-400 flex justify-between items-center border-b border-slate-700">
      <span>{title}</span>
      <span className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
      </span>
    </div>
    <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-blue-100">
      <code>{code}</code>
    </pre>
  </div>
);

const ExpandableDeepDive: React.FC<ExpandableDeepDiveProps> = ({ title, children, color = "blue", codeSnippet }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const colors = {
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
    rose: "bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200",
    violet: "bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-200",
    indigo: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200",
  };

  return (
    <div className="mt-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all border ${colors[color]} w-full md:w-auto justify-center md:justify-start shadow-sm`}
      >
        {isOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        {isOpen ? "Close Deep Dive" : `Deep Dive: ${title}`}
      </button>
      {isOpen && (
        <div className="mt-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-inner animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="prose prose-slate max-w-none">
            {children}
            {codeSnippet && (
              <div className="mt-6">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Python Implementation</h5>
                <CodeSnippet title={codeSnippet.title} code={codeSnippet.code} />
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
    <div className="bg-slate-50 rounded-xl p-6 border border-rose-200 mt-6 shadow-inner relative overflow-hidden">
      <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2 text-lg relative z-10">
        <Search size={20}/> P-Hacking Simulator
      </h4>
      <p className="text-sm text-slate-600 mb-6 relative z-10 max-w-2xl">
        We will generate <strong>100 completely random strategies</strong> (noise). Statistically, one of them will look amazing just by luck. This is "Selection Bias".
      </p>
      
      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        <div className="flex-1 h-64 bg-white rounded-lg border border-slate-200 relative overflow-hidden shadow-sm">
          {/* Chart Area */}
          <div className="absolute inset-0 flex items-end px-2 pb-2">
            {simulations.length > 0 ? (
              <svg className="w-full h-full" viewBox="0 0 50 100" preserveAspectRatio="none">
                {simulations.map((sim, i) => (
                  <polyline 
                    key={i}
                    points={sim.path.map((p: number, idx: number) => `${idx},${100 - ((p-80)/40)*100}`).join(' ')}
                    fill="none"
                    stroke={sim.id === bestSim?.id ? "#e11d48" : "#cbd5e1"}
                    strokeWidth={sim.id === bestSim?.id ? "2" : "0.5"}
                    opacity={sim.id === bestSim?.id ? "1" : "0.4"}
                  />
                ))}
              </svg>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-sm">
                Click 'Run Simulation' to generate noise
              </div>
            )}
          </div>
          {/* Labels */}
          <div className="absolute top-2 left-2 text-[10px] text-slate-400">Equity Curve</div>
        </div>

        <div className="w-full md:w-64 flex flex-col justify-center gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Best Random Sharpe</div>
            <div className={`text-3xl font-mono font-black ${bestSim && bestSim.sharpe > 1.5 ? 'text-emerald-500' : 'text-slate-700'}`}>
              {bestSim ? bestSim.sharpe.toFixed(2) : "0.00"}
            </div>
            {bestSim && bestSim.sharpe > 2.0 && (
              <div className="text-[10px] text-rose-500 font-bold mt-1">⚠️ Amazing! (But Fake)</div>
            )}
          </div>

          <button 
            onClick={runSim}
            disabled={isRunning}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold shadow-lg shadow-rose-200 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isRunning ? <RefreshCw className="animate-spin" size={18}/> : <Dices size={18}/>}
            {isRunning ? "Mining Data..." : "Mine for Alpha"}
          </button>

          <div className="text-center text-[10px] text-slate-400">
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
      <InfographicSlot alt="The Mechanics of Alpha Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12 space-y-24">
        {/* SECTION 1: Theoretical Foundations */}
        <section id="theory">
          <SectionHeader 
            title="The Fundamental Law" 
            subtitle="Before analyzing data, we must understand the mathematical bedrock of active management. This equation defines the upper limit of your potential performance."
            icon={Target}
            colorClass="bg-gradient-to-br from-indigo-500 to-blue-600"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-indigo-700">
                <Activity size={24} /> The Equation of Skill
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The Fundamental Law of Active Management, formulated by Grinold and Kahn, breaks down performance into two independent components: Skill and Opportunity.
              </p>
              <FormulaBox 
                title="Information Ratio (IR)"
                formula="IR ≈ IC × √BR"
                description="Your risk-adjusted return depends on how accurate you are (IC) and how many independent bets you place (Breadth)."
                variables={[
                  "IR: Information Ratio (Active Return / Active Risk)",
                  "IC: Information Coefficient (Correlation of signal to return)",
                  "BR: Breadth (Number of independent bets per year)"
                ]}
              />
            </Card>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                <h4 className="text-lg font-bold text-slate-800 mb-3">The Extended Law (Reality Check)</h4>
                <p className="text-slate-600 mb-4">
                  In practice, constraints (liquidity, risk limits, long-only) prevent you from fully expressing your signal. We introduce a "Transfer Coefficient" to measure this leakage.
                </p>
                <div className="bg-white p-4 rounded-xl border border-indigo-100 font-mono text-sm text-indigo-900 mb-3 shadow-sm">
                  E(R_A) = TC × IC × √BR × σ_A
                </div>
                <div className="text-sm text-slate-500 space-y-2">
                  <p><strong>TC (Transfer Coefficient):</strong> Correlation between your ideal weights and actual weights.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>TC = 1.0:</strong> Pure Long/Short, no friction.</li>
                    <li><strong>TC = 0.3:</strong> Long-only, sector neutral, low turnover. (Most mutual funds).</li>
                  </ul>
                </div>
              </Card>

              <Card className="border-l-4 border-l-rose-400">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-rose-500" />
                  Why Theory Fails
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="font-bold text-rose-500">•</span>
                    <span><strong>The Independence Illusion:</strong> 500 stocks ≠ 500 bets if they all crash together. BR is usually lower than you think.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-rose-500">•</span>
                    <span><strong>Non-Linearity:</strong> Pearson IC assumes linear relationships. It fails to capture "smile" curves (e.g., extreme growth and extreme value both outperforming).</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 2: Implementation */}
        <section id="implementation">
          <SectionHeader 
            title="Implementation Reality" 
            subtitle="High IC does not guarantee profit. Frictions, costs, and constraints eat Alpha for breakfast."
            icon={TrendingUp}
            colorClass="bg-gradient-to-br from-amber-500 to-orange-600"
          />

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            
            <div className="relative pl-24 pb-12">
              <div className="absolute left-0 top-0 w-16 h-16 bg-white border-4 border-amber-500 rounded-full flex items-center justify-center font-bold text-amber-600 shadow-md z-10 text-xl">1</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Implementation Shortfall</h3>
              <p className="text-slate-600 max-w-2xl mb-4">
                The difference between your "Paper Return" and "Realized Return". It has three main components:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Delay Cost", desc: "Price moves away while you calculate or wait." },
                  { title: "Market Impact", desc: "Your buying pushes price up against you." },
                  { title: "Opportunity Cost", desc: "Profits missed because limit orders didn't fill." }
                ].map((item, i) => (
                  <div key={i} className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <strong className="block text-amber-800 mb-1">{item.title}</strong>
                    <span className="text-xs text-amber-700 leading-tight block">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative pl-24 pb-12">
              <div className="absolute left-0 top-0 w-16 h-16 bg-white border-4 border-amber-500 rounded-full flex items-center justify-center font-bold text-amber-600 shadow-md z-10 text-xl">2</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Square Root Law of Impact</h3>
              <p className="text-slate-600 mb-4 max-w-2xl">
                Market impact is not linear. It scales with the square root of trade size relative to volume.
              </p>
              <FormulaBox 
                title="Impact Cost Model"
                formula="Cost ≈ σ × √(Q / V)"
                description="Doubling your trade size doesn't double cost—it increases it by ~1.41x (√2). This non-linearity is why high-turnover strategies have a hard AUM cap."
                variables={[
                  "σ: Daily Volatility",
                  "Q: Trade Size", 
                  "V: Daily Volume"
                ]}
              />
            </div>

            <div className="relative pl-24 pb-0">
              <div className="absolute left-0 top-0 w-16 h-16 bg-white border-4 border-amber-500 rounded-full flex items-center justify-center font-bold text-amber-600 shadow-md z-10 text-xl">3</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Portfolio Construction</h3>
              <p className="text-slate-600 mb-4 max-w-2xl">
                How do we turn a Z-score into a dollar weight? The simplest robust method is <strong>Inverse Volatility Scaling</strong>.
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
                <p className="text-slate-600">
                  This effectively equalizes risk contributions. A signal of +2 on a Utility stock (low vol) might result in a 5% position, while a signal of +2 on a BioTech stock (high vol) might only get a 1% position.
                </p>
              </ExpandableDeepDive>
            </div>
          </div>
        </section>

        {/* SECTION 3: The Backtest Lie */}
        <section id="backtesting">
          <SectionHeader 
            title="The Backtest Lie" 
            subtitle="Why do Sharpe 2.0 strategies fail in production? Overfitting, P-Hacking, and Point-in-Time errors create a 'Paper Wealth' illusion."
            icon={Shield}
            colorClass="bg-gradient-to-br from-rose-500 to-red-600"
          />

          <PHackingSimulator />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <Card className="border-t-4 border-t-rose-500">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-rose-700">
                <Clock size={20} /> Look-Ahead Bias
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Using data in your backtest that wasn't available at the time. This is the #1 reason for backtest failure.
              </p>
              <div className="bg-rose-50 p-4 rounded-xl mb-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-rose-800">
                  <XCircle size={14} /> <strong>Mistake:</strong> Using Q1 Earnings on March 31st.
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-700">
                  <CheckCircle size={14} /> <strong>Reality:</strong> Earnings aren't released until April 15th.
                </div>
                <p className="text-xs text-slate-500 pt-2 italic">Always use "Point-in-Time" databases.</p>
              </div>
            </Card>

            <Card className="border-t-4 border-t-rose-500">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-rose-700">
                <PieChart size={20} /> Overfitting / P-Hacking
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                If you test 100 random signal variations, 5 will look profitable by pure chance (p=0.05). If you keep only those 5, you are lying to yourself.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-bold text-slate-700 text-xs mb-1">Solution: Deflated Sharpe Ratio (DSR)</h4>
                <p className="text-xs text-slate-500 mb-2">DSR penalizes the Sharpe Ratio based on the number of trials (N).</p>
                <div className="bg-white border border-slate-200 p-2 rounded font-mono text-[10px] text-slate-600">
                  Adjusted_SR = SR * sqrt(1 - ((1 - gamma) * N_trials^-1))
                </div>
              </div>
            </Card>
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
            <div className="flex gap-4">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-xl h-fit">
                <EyeOff size={24}/>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">The "Leakage" Problem</h4>
                <p className="text-slate-600 mb-2 text-sm">
                  In standard AI (images), datapoints are independent. In finance, Monday's price is 99% correlated with Tuesday's price.
                </p>
                <p className="text-slate-600 text-sm">
                  <strong>Purged K-Fold</strong> enforces a "Gap" (Embargo) between training and testing data. This prevents the model from "peeking" across the boundary via serial correlation. Without this, your backtest Sharpe will be double the reality.
                </p>
              </div>
            </div>
          </ExpandableDeepDive>
        </section>

      </main>
    </ArticleFrame>
  );
}