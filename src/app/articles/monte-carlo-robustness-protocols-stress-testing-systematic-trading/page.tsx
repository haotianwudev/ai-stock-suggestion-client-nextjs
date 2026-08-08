'use client';

import React from 'react';
import { Shuffle, Layers, ShieldCheck, AlertTriangle, Cpu, Search, TrendingUp, GitMerge, Clock, CheckCircle, Database, Maximize2, Minimize2, Sigma, AlertOctagon, FileText } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    rose: "bg-rose-100 text-rose-700 border-rose-200",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, icon: Icon, color = "text-slate-800" }: {
  title: string;
  subtitle: string;
  icon?: React.ElementType;
  color?: string;
}) => (
  <div className="mb-12 text-center max-w-4xl mx-auto">
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-white rounded-full shadow-md">
        {Icon && <Icon className={`w-8 h-8 ${color}`} />}
      </div>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    <p className="text-lg text-slate-600 leading-relaxed">{subtitle}</p>
  </div>
);

interface SimulationMethodProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  pros: string[];
  cons: string[];
  colorClass: string;
  bestFor: string;
}

const SimulationMethod = ({ title, subtitle, description, icon: Icon, pros, cons, colorClass, bestFor }: SimulationMethodProps) => (
  <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className={`h-2 w-full ${colorClass}`}></div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 leading-tight">{title}</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{subtitle}</p>
          </div>
        </div>
      </div>
      <p className="text-slate-600 mb-6 text-sm leading-relaxed min-h-[60px]">{description}</p>
      <div className="mb-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Best Application</span>
        <div className="bg-slate-50 p-2 rounded border border-slate-100 text-xs font-medium text-slate-700">{bestFor}</div>
      </div>
      <div className="space-y-4 mt-auto">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Advantages
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 pl-2 border-l-2 border-emerald-100">
            {pros.map((pro, i) => <li key={i}>{pro}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Limitations
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 pl-2 border-l-2 border-rose-100">
            {cons.map((con, i) => <li key={i}>{con}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </Card>
);

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  methods: string[];
  checks?: string[];
  isLast?: boolean;
}

const WorkflowStep = ({ number, title, description, methods, checks, isLast }: WorkflowStepProps) => (
  <div className="relative flex group">
    <div className="mr-8 flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      {!isLast && <div className="w-0.5 h-full bg-slate-200 my-2 group-hover:bg-slate-300 transition-colors"></div>}
    </div>
    <div className="pb-12 pt-1 flex-1">
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 group-hover:border-indigo-100 transition-colors">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <div className="flex gap-2 flex-wrap">
            {methods.map((m, i) => (
              <Badge key={i} color="slate">{m}</Badge>
            ))}
          </div>
        </div>
        <p className="text-slate-600 mb-4 text-sm">{description}</p>
        {checks && (
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Critical Checks</span>
            <div className="grid sm:grid-cols-2 gap-2">
              {checks.map((check, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  {check}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

interface DeepDiveSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  color?: string;
}

const DeepDiveSection = ({ title, icon: Icon, children, color = "blue" }: DeepDiveSectionProps) => {
  const bgColors: Record<string, string> = {
    blue: "bg-blue-50",
    amber: "bg-amber-50",
    rose: "bg-rose-50",
    indigo: "bg-indigo-50"
  };
  const textColors: Record<string, string> = {
    blue: "text-blue-700",
    amber: "text-amber-700",
    rose: "text-rose-700",
    indigo: "text-indigo-700"
  };
  return (
    <div className={`rounded-2xl p-8 ${bgColors[color]} border border-white shadow-sm mb-8`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon className={`w-6 h-6 ${textColors[color]}`} />
        <h3 className={`text-xl font-bold ${textColors[color]}`}>{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default function MonteCarloRobustnessProtocols() {
  return (
    <ArticleFrame
      slug="monte-carlo-robustness-protocols-stress-testing-systematic-trading"
      additionalDisclaimer="Monte Carlo simulation is a sophisticated quantitative technique requiring deep understanding of statistical methods, market dynamics, and programming. Trading systematic strategies involves substantial risk of loss and is not suitable for all investors."
    >
      <div className="max-w-7xl mx-auto px-6 text-slate-800">
        <InfographicSlot alt="Monte Carlo Robustness Protocols Infographic" />

        <div className="space-y-24">
          {/* Core Concepts */}
          <section>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-8 border-t-4 border-t-indigo-500">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-indigo-500" />
                  The Epistemological Crisis
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A single historical backtest is just one realization of a stochastic process. It is a sample size of one. Reliance on the specific sequence of historical returns is the primary cause of live trading failure.
                </p>
              </Card>
              <Card className="p-8 border-t-4 border-t-indigo-500">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-500" />
                  The Robustness Goal
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We do not seek to predict the future. We seek to characterize the distribution of possible outcomes. A robust strategy is one that survives the 5th percentile of generated alternate histories.
                </p>
              </Card>
              <Card className="p-8 border-t-4 border-t-indigo-500">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sigma className="w-5 h-5 text-indigo-500" />
                  The Mathematical Edge
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  By generating N synthetic equity curves, we can calculate the Probability of Backtest Overfitting (PBO) and adjust performance metrics (Deflated Sharpe Ratio) to account for selection bias.
                </p>
              </Card>
            </div>
          </section>

          {/* Taxonomy Section */}
          <section id="taxonomy">
            <SectionTitle
              title="Taxonomy of Methods"
              subtitle="Selecting the correct simulation kernel based on strategy characteristics."
              icon={Layers}
              color="text-indigo-600"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SimulationMethod
                title="IID Bootstrap"
                subtitle="Resampling with Replacement"
                description="Treats returns as independent and identically distributed. Draws from history with replacement to create new sequences."
                icon={Shuffle}
                colorClass="bg-blue-500"
                bestFor="Strategies with NO serial correlation (e.g., pure arb, some mean reversion)."
                pros={[
                  "Tests sensitivity to outlier trades.",
                  "Estimates fat tails better than normal distribution assumptions."
                ]}
                cons={[
                  "Destroys all serial correlation and volatility clustering.",
                  "Invalid for Trend Following."
                ]}
              />
              <SimulationMethod
                title="Permutation"
                subtitle="Trade Shuffling"
                description="Rearranges the order of existing trades without replacement. The total P&L remains identical, but the path changes."
                icon={GitMerge}
                colorClass="bg-emerald-500"
                bestFor="Isolating 'Sequence Risk' and analyzing Start Date Sensitivity."
                pros={[
                  "Preserves the exact realized return distribution.",
                  "Excellent for testing Max Drawdown variability."
                ]}
                cons={[
                  "Cannot test for events that never happened.",
                  "Destroys autocorrelation structure."
                ]}
              />
              <SimulationMethod
                title="Block Bootstrap"
                subtitle="Stationary / Circular"
                description="Samples 'blocks' of L consecutive days/trades to preserve local correlation structure and volatility regimes."
                icon={Database}
                colorClass="bg-purple-500"
                bestFor="Trend Following and strategies reliant on volatility clustering."
                pros={[
                  "Preserves market memory within blocks.",
                  "Maintains regime dependency."
                ]}
                cons={[
                  "Sensitive to block length selection.",
                  "Introduction of noise at block seams."
                ]}
              />
              <SimulationMethod
                title="Surrogate Data"
                subtitle="AAFT / Phase Shuffling"
                description="Modifies the underlying OHLC data (e.g., randomizing Fourier phases) to test if the signal is distinct from noise."
                icon={Cpu}
                colorClass="bg-rose-500"
                bestFor="Pattern Recognition & Technical Analysis validation."
                pros={[
                  "Acts as a 'Truth Serum' for alpha existence.",
                  "Tests if patterns are statistically significant."
                ]}
                cons={[
                  "Computationally expensive.",
                  "Complex implementation (Fourier Transforms)."
                ]}
              />
            </div>
          </section>

          {/* Deep Dive: Interpreting Results */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <SectionTitle
              title="Interpreting the Output"
              subtitle="Moving from simulation to actionable decision metrics."
              icon={Search}
              color="text-amber-600"
            />
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <DeepDiveSection title="The Cone of Uncertainty" icon={Maximize2} color="indigo">
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    When plotting 10,000 Monte Carlo simulations starting from t=0, the resulting equity curves fan out into a cone shape. This visualizes the stochastic nature of future performance.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-slate-700">
                      <span className="font-bold text-indigo-600">Median Path (50%):</span>
                      Expected performance if the future resembles the past average.
                    </li>
                    <li className="flex gap-3 text-sm text-slate-700">
                      <span className="font-bold text-indigo-600">The 5th Percentile:</span>
                      The &ldquo;Bad Luck&rdquo; boundary. If your live strategy falls below this line, it is likely broken, not just unlucky.
                    </li>
                    <li className="flex gap-3 text-sm text-slate-700">
                      <span className="font-bold text-indigo-600">The 99th Percentile Drawdown:</span>
                      Your true capital requirement. Backtests show the historical max drawdown; MC shows the *potential* max drawdown.
                    </li>
                  </ul>
                </DeepDiveSection>
                <DeepDiveSection title="Sequence Risk Analysis" icon={Minimize2} color="rose">
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Sequence risk is the danger that the timing of withdrawals (or losses) will have a negative impact on the overall portfolio value, essentially maximizing the damage of a drawdown.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-rose-100 shadow-sm">
                    <h4 className="font-bold text-rose-800 text-sm mb-2">The &ldquo;Start Date&rdquo; Hazard</h4>
                    <p className="text-xs text-slate-600">
                      A strategy starting in 2010 might show a Sharpe of 2.0. The same strategy starting in 2008 might blow up. MC Shuffling exposes this by simulating thousands of start dates.
                    </p>
                  </div>
                </DeepDiveSection>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Quantitative Pitfalls</h3>
                  <p className="text-slate-600 mb-6">Common errors that invalidate Monte Carlo results.</p>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Look-Ahead Bias in Blocks</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          When using Block Bootstrap, ensuring blocks don&apos;t contain future information relative to the trade decision point is critical.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Breaking Serial Correlation</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          Applying simple IID Bootstrap to a Trend Following strategy destroys the very alpha you are trying to test (the trend). This leads to a massive underestimation of risk.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Distribution Mismatch</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          Assuming returns are Gaussian when generating synthetic data. Financial returns have fat tails (kurtosis). Using Normal distribution generators will hide &ldquo;Black Swan&rdquo; risks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-900 text-white rounded-xl shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    <h4 className="font-bold">The &ldquo;Truth Serum&rdquo; Test</h4>
                  </div>
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                    Before trusting a strategy, run it on <strong>Phase Shuffled</strong> data (noise with same autocorrelation).
                  </p>
                  <div className="flex items-center justify-between text-xs border-t border-slate-700 pt-4">
                    <span>Strategy Performance on Real Data</span>
                    <span className="font-mono text-emerald-400">Sharpe: 1.8</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span>Strategy Performance on Noise Data</span>
                    <span className="font-mono text-rose-400">Sharpe: 0.1</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 italic">*If Noise Performance is &gt; 1.0, your strategy is overfitting.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Workflow Section */}
          <section>
            <SectionTitle
              title="The Researcher's Routine"
              subtitle="A rigorous validation workflow from hypothesis to live deployment."
              icon={Clock}
              color="text-indigo-600"
            />
            <div className="max-w-4xl mx-auto pl-4">
              <WorkflowStep
                number={1}
                title="Hypothesis & In-Sample Dev"
                description="Start with economic hypothesis. Code logic. Establish baseline on Training Data. Ensure logic is robust to dirty data."
                methods={["Initial Backtest", "Data Cleaning"]}
                checks={["Logic Consistency", "Look-ahead Check"]}
              />
              <WorkflowStep
                number={2}
                title="The 'Sanity' Monte Carlo"
                description="Prove signal exists and is not random drift. Must outperform surrogate data distribution significantly."
                methods={["Surrogate Data", "Phase Shuffling"]}
                checks={["Performance vs Noise", "P-value < 0.05"]}
              />
              <WorkflowStep
                number={3}
                title="Robustness Stress Test"
                description="Test stability against execution realities. Jitter parameters to ensure you aren't on a 'local optimum' peak."
                methods={["Parameter Jitter", "Spread Widening"]}
                checks={["Parameter Plateau", "Slippage Sensitivity"]}
              />
              <WorkflowStep
                number={4}
                title="Capitalization Estimation"
                description="Determine 'UNCLE' point. Use 99th percentile Drawdown from Stationary Block Bootstrap for risk management."
                methods={["Stationary Block Bootstrap", "Max Entropy"]}
                checks={["VaR (99%)", "Max Drawdown Duration"]}
              />
              <WorkflowStep
                number={5}
                title="Out-of-Sample & PBO"
                description="Final validation using Combinatorial Purged Cross-Validation (CPCV) to calculate Probability of Backtest Overfitting."
                methods={["PBO", "CPCV", "DSR"]}
                checks={["PBO < 0.2", "Deflated Sharpe > 1.0"]}
              />
              <WorkflowStep
                number={6}
                title="Live Monitoring"
                description="Project Monte Carlo cones forward. Set kill-switches if live performance deviates into the bottom 5th percentile."
                methods={["Monte Carlo Cones", "Walk-Forward"]}
                checks={["Live vs Simulated", "Drift Detection"]}
                isLast={true}
              />
            </div>
          </section>

          {/* Scenarios Section */}
          <section>
            <SectionTitle
              title="Strategy-Specific Configurations"
              subtitle="One size does not fit all. Tailoring the simulation to the alpha source."
              icon={TrendingUp}
              color="text-emerald-600"
            />
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 border-l-4 border-l-indigo-600">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Trend Following</h3>
                  <Badge color="blue">Serial Correlation Critical</Badge>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  Trend strategies rely on &ldquo;streaks&rdquo;. Standard shuffling breaks these streaks, leading to unrealistically benign drawdown estimates.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Recommended Method:</span>
                    <span className="text-indigo-700">Stationary Block Bootstrap (SBBS)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Block Size:</span>
                    <span className="text-slate-600">Avg Trend Duration (e.g., 20-60 days)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Key Metric:</span>
                    <span className="text-rose-600">Drawdown Duration</span>
                  </div>
                </div>
              </Card>
              <Card className="p-8 border-l-4 border-l-emerald-600">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800">HFT / Mean Reversion</h3>
                  <Badge color="emerald">Execution Critical</Badge>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  Alpha is often small per trade. Risk comes from microstructure noise and fill probability, not necessarily large moves.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Recommended Method:</span>
                    <span className="text-indigo-700">Execution Randomization + Spread Jitter</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Noise Injection:</span>
                    <span className="text-slate-600">Add 10-20% of spread to every fill</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Key Metric:</span>
                    <span className="text-rose-600">Break-even Win Rate</span>
                  </div>
                </div>
              </Card>
              <Card className="p-8 border-l-4 border-l-purple-600 lg:col-span-2">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Multi-Asset Portfolio</h3>
                  <Badge color="purple">Correlation Critical</Badge>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  Testing a basket of strategies (e.g., Long/Short Equity + CTA). Risk is that correlations converge to 1.0 during crashes.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-700">Method:</span>
                      <span className="text-indigo-700">Joint Block Bootstrap</span>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      Samples blocks of time across ALL assets simultaneously to preserve cross-asset correlations during stress periods.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-700">Stress Test:</span>
                      <span className="text-rose-600">Correlation Breakdown</span>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      Manually force correlations to 0.8+ in simulation to test portfolio survival during a liquidity crisis.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
