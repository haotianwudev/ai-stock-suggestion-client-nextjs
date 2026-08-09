'use client';

import React from 'react';
import { AlertTriangle, Lightbulb, Sigma, Layout, Binary, Scale, Coins, Target, ArrowRight, Layers, Workflow, BookOpen, Database, Code2, Cpu, Server, Cloud, Zap, BrainCircuit } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function IntegerOptimizationArticle() {
  return (
    <ArticleFrame slug="integer-optimization-finance-continuous-theory-discrete-execution">
      <div className="pb-24">
        <InfographicSlot alt="Integer Optimization in Finance Infographic" />
        
        <div className="max-w-4xl mx-auto">
          {/* 1. The Core Problem */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The "Dust" Problem</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Traditional Mean-Variance Optimization assumes assets are infinitely divisible. This creates "dust"—negligible positions (e.g., 0.0001%) that are costly to trade, operational nightmares, impossible to hedge, and illiquid odd-lots.
            </p>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-6 my-8 rounded-r-lg">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3 font-serif flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> The MIP Solution
              </h3>
              <p className="text-indigo-800 dark:text-indigo-200 mb-6 leading-relaxed">
                We introduce a binary vector <strong>z</strong> where z_i ∈ {'{0, 1}'}. If z_i is 0, weight w_i MUST be 0.
              </p>
              
              <FormulaPanel 
                title="Mixed-Integer Programming (MIP)"
                formula="l_i z_i \\leq w_i \\leq u_i z_i"
                legend={[
                  { label: "z_i", value: "Binary variable (0 or 1)" },
                  { label: "w_i", value: "Continuous weight" },
                  { label: "l_i, u_i", value: "Lower and upper bounds" }
                ]}
              />
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 2. Mathematical Architectures */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Sigma className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Mathematical Architectures</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Defining the feasible region is an art form. We move beyond simple linear bounds to capture the discrete nature of trading mechanics and solver performance.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Structural Constraints</h3>
            <ComparisonGrid>
              <ComparisonCard title="Logical Constraints" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Encodes "If-Then" rules. Example: "If we hold Shell, we must not hold BP."</p>
                <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400">z_shell + z_bp ≤ 1</div>
              </ComparisonCard>
              <ComparisonCard title="Cardinality (K)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Limits the total number of assets in the portfolio to exactly K.</p>
                <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400">Σ z_i = K</div>
              </ComparisonCard>
              <ComparisonCard title="Minimum Buy-In" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Disallows small trades. Position must be 0 or &gt; $100k.</p>
                <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400">w_i = 0 ∨ w_i ≥ 0.05</div>
              </ComparisonCard>
              <ComparisonCard title="Round Lots" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Forces trades to be multiples of a lot size (e.g., 100 shares).</p>
                <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400">x_i = L · n_i, n_i ∈ ℤ</div>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Advanced Techniques</h3>
            <ComparisonGrid>
              <ComparisonCard title="Perspective Cut" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Advanced conic reformulation. Replaces quadratic terms to tighten the "relaxation gap."</p>
                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">w_i² → w_i² / z_i</div>
              </ComparisonCard>
              <ComparisonCard title="Indicator Constraints" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Modern solver feature. Avoids "Big-M" numerical issues by handling logic natively.</p>
                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">z=1 ⇒ Σ w_i ≤ α</div>
              </ComparisonCard>
              <ComparisonCard title="SOS Type 2" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Special Ordered Sets. Essential for modeling piecewise linear costs.</p>
                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">λ_i, λ_i+1 ≠ 0</div>
              </ComparisonCard>
              <ComparisonCard title="Turnover Control" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Linearizing absolute value differences for rebalancing limits.</p>
                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">|w_new - w_old| ≤ T</div>
              </ComparisonCard>
            </ComparisonGrid>
            
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 flex items-start">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg mr-4 text-blue-600 dark:text-blue-300 shrink-0">
                <BookOpen className="w-5 h-5"/>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm font-serif">Research Note: The "Big-M" Pitfall</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-2 leading-relaxed">
                  When linking binary (z) and continuous (w) variables via w ≤ M · z, choosing a generic "large M" (e.g., 10,000) causes numerical instability in solvers. A "Tight M" (equal to the asset's upper bound) is critical for convergence.
                </p>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 3. The Quant Workflow */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Workflow className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Quant Workflow</h2>
            </div>
            
            <div className="space-y-8 mt-10">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-6">
                <Database className="w-8 h-8 text-indigo-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">1. Data Ingestion & Signal Generation</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Constructing the inputs for the optimizer using Python/Pandas.</p>
                  <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
                    <li>Expected Returns (μ): Alpha model output. Vector of size N.</li>
                    <li>Covariance Matrix (Σ): Risk model (e.g., Barra). Matrix of size N×N.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-6">
                <Code2 className="w-8 h-8 text-indigo-500 shrink-0 mt-1" />
                <div className="w-full">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">2. Problem Formulation (CVXPY)</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Translating business logic into standard form via MIP Modeling.</p>
                  
                  <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-sm overflow-x-auto w-full">
                    <div className="text-[#569cd6]">import <span className="text-[#9cdcfe]">cvxpy</span> <span className="text-[#569cd6]">as</span> <span className="text-[#9cdcfe]">cp</span></div>
                    <div className="text-[#6a9955] mt-2"># Define Variables</div>
                    <div><span className="text-[#9cdcfe]">w</span> = <span className="text-[#9cdcfe]">cp</span>.<span className="text-[#dcdcaa]">Variable</span>(<span className="text-[#9cdcfe]">n</span>) <span className="text-[#6a9955]"># Weights</span></div>
                    <div><span className="text-[#9cdcfe]">z</span> = <span className="text-[#9cdcfe]">cp</span>.<span className="text-[#dcdcaa]">Variable</span>(<span className="text-[#9cdcfe]">n</span>, <span className="text-[#9cdcfe]">boolean</span>=<span className="text-[#569cd6]">True</span>) <span className="text-[#6a9955]"># Selection</span></div>
                    <div className="text-[#6a9955] mt-2"># Objective: Max Return - Risk penalty</div>
                    <div><span className="text-[#9cdcfe]">objective</span> = <span className="text-[#9cdcfe]">cp</span>.<span className="text-[#dcdcaa]">Maximize</span>(<span className="text-[#9cdcfe]">mu</span> @ <span className="text-[#9cdcfe]">w</span> - <span className="text-[#9cdcfe]">gamma</span> * <span className="text-[#9cdcfe]">cp</span>.<span className="text-[#dcdcaa]">quad_form</span>(<span className="text-[#9cdcfe]">w</span>, <span className="text-[#9cdcfe]">Sigma</span>))</div>
                    <div className="text-[#6a9955] mt-2"># Constraints</div>
                    <div><span className="text-[#9cdcfe]">constraints</span> = [</div>
                    <div className="pl-4"><span className="text-[#9cdcfe]">cp</span>.<span className="text-[#dcdcaa]">sum</span>(<span className="text-[#9cdcfe]">w</span>) == <span className="text-[#b5cea8]">1</span>, <span className="text-[#6a9955]"># Fully invested</span></div>
                    <div className="pl-4"><span className="text-[#9cdcfe]">cp</span>.<span className="text-[#dcdcaa]">sum</span>(<span className="text-[#9cdcfe]">z</span>) &lt;= <span className="text-[#b5cea8]">50</span>, <span className="text-[#6a9955]"># Cardinality limit</span></div>
                    <div className="pl-4"><span className="text-[#9cdcfe]">w</span> &lt;= <span className="text-[#9cdcfe]">z</span>   <span className="text-[#6a9955]"># Big-M linking</span></div>
                    <div>]</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-6">
                <Cpu className="w-8 h-8 text-indigo-500 shrink-0 mt-1" />
                <div className="w-full">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">3. The Solver Engine</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Branch-and-Bound search space exploration (e.g., Gurobi, Mosek).</p>
                  <div className="flex items-center justify-between bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm overflow-x-auto">
                    <div className="text-center shrink-0 mx-2">
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Root Node</div>
                      <div className="font-bold text-slate-900 dark:text-white">Relaxed LP</div>
                    </div>
                    <ArrowRight className="text-slate-400 w-5 h-5 shrink-0" />
                    <div className="text-center shrink-0 mx-2">
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Branching</div>
                      <div className="font-bold text-slate-900 dark:text-white">Split z_i</div>
                    </div>
                    <ArrowRight className="text-slate-400 w-5 h-5 shrink-0" />
                    <div className="text-center shrink-0 mx-2">
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Pruning</div>
                      <div className="font-bold text-slate-900 dark:text-white">Bounds Check</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-6">
                <Coins className="w-8 h-8 text-indigo-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">4. Order Slicing & Execution</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Transforming optimal weights into market orders via FIX Protocol.</p>
                  <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
                    <li>Round to nearest Lot (100)</li>
                    <li>Split large parents (VWAP)</li>
                    <li>Route to Dark Pools</li>
                    <li>TCA Analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 4. Strategic Applications */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 font-serif">Strategic Applications</h2>
            
            <div className="space-y-12">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Sparse Index Tracking</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  The goal is to replicate a benchmark (e.g., S&P 500) using only a subset of assets (e.g., K=50). This minimizes transaction costs and simplifies management.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase">Lasso (L1)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Shrinks weights towards zero. Bias creates systematic underperformance.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase">MIP (L0)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Selects the best subset without shrinking weights. Provides an unbiased estimator.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Tax-Loss Harvesting</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Systematically realizing losses to offset capital gains, while maintaining risk exposure. The complexity lies in the Wash Sale Rule: you cannot buy a "substantially identical" security 30 days before or after a sale.
                </p>
                <FormulaPanel 
                  title="Wash Sale Constraint (MIP)"
                  formula="x_{buy, i} \\leq M \\cdot (1 - y_{wash, i})"
                  legend={[
                    { label: "x_{buy}", value: "Amount bought" },
                    { label: "y_{wash}", value: "1 if sold within 30 days" }
                  ]}
                />
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 5. The Modern Quant Stack */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Server className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Modern Quant Stack</h2>
            </div>
            
            <ComparisonGrid>
              <ComparisonCard title="Modeling" tone="neutral">
                <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <li><strong>CVXPY:</strong> Python DSL for convex optimization. The industry standard.</li>
                  <li><strong>JuMP:</strong> Julia-based modeling. Extremely fast for large-scale problems.</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Engines" tone="neutral">
                <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <li><strong>Gurobi:</strong> Best-in-class performance for MIPs. Expensive licensing.</li>
                  <li><strong>HiGHS:</strong> High-performance open-source linear solver (C++).</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Data & Infra" tone="neutral">
                <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <li><strong>kdb+ / q:</strong> Time-series database for high-frequency tick data.</li>
                  <li><strong>Kubernetes/Airflow:</strong> Orchestrating distributed solver jobs and daily rebalancing DAGs.</li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 6. Future Frontiers */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Future Frontiers</h2>
            </div>
            
            <div className="space-y-12 mt-10">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-serif">Quantum Annealing</h3>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Classical solvers struggle with non-convex landscapes, often getting stuck in local minima. Quantum Annealers exploit <strong>quantum tunneling</strong> to traverse energy barriers, finding global optima for combinatorial problems.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-wide">QUBO Formulation</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Financial MIPs must be reformulated into Quadratic Unconstrained Binary Optimization problems.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span>Logical Variables</span> <span className="font-mono">Qubits</span></li>
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span>Correlations</span> <span className="font-mono">Couplers (J)</span></li>
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2"><span>Returns/Risk</span> <span className="font-mono">Bias (h)</span></li>
                      <li className="flex justify-between"><span>Constraints</span> <span className="font-mono">Penalty Terms</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-serif">Neural Branching</h3>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  The bottleneck of any MIP solver is the Branch-and-Bound tree. Choosing <em>which</em> variable to branch on determines if the solver finishes in seconds or centuries.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  We train Graph Neural Networks (GNNs) via Imitation Learning to mimic expert (but slow) branching rules like Strong Branching, but execute them in milliseconds on a GPU.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">100x</div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Inference Speedup</div>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">30%</div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Tree Size Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}