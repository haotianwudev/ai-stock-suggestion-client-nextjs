'use client';

import React, { useState } from 'react';
import { TrendingUp, Shield, Activity, Layers, Settings, Cpu, Database, Code, Target, PieChart, ArrowRight, Maximize2, Minimize2, Zap, Globe, GitBranch, Terminal, Anchor, Share2, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Components ---
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon, colorClass }) => (
  <div className="mb-8 border-l-4 border-gray-200 pl-6 py-2">
    <div className={`inline-flex items-center justify-center p-3 rounded-xl ${colorClass} bg-opacity-10 mb-3`}>
      <Icon className={`w-6 h-6 lg:w-8 lg:h-8 ${colorClass.replace('bg-', 'text-')}`} />
    </div>
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight font-serif">{title}</h2>
    <p className="text-lg lg:text-xl text-gray-500 font-light max-w-2xl">{subtitle}</p>
  </div>
);

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ title, children, className = "", noPadding = false }) => (
  <div className={`bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${className}`}>
    {title && (
      <div className="px-6 pt-6 pb-4 border-b border-gray-50">
        <h3 className="text-xl font-bold text-gray-800 font-serif">{title}</h3>
      </div>
    )}
    <div className={`text-gray-600 leading-relaxed ${noPadding ? '' : 'p-6'}`}>
      {children}
    </div>
  </div>
);

interface FormulaCardProps {
  label: string;
  formula: string;
  description: React.ReactNode;
}

const FormulaCard: React.FC<FormulaCardProps> = ({ label, formula, description }) => (
  <div className="bg-slate-50 dark:bg-[#14171B] rounded-xl p-4 border border-slate-200 dark:border-slate-800 mb-3 group hover:border-indigo-300 transition-colors">
    <div className="flex justify-between items-center mb-2">
      <div className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-widest">{label}</div>
    </div>
    <div className="font-mono text-base md:text-lg text-slate-800 dark:text-slate-200 mb-3 overflow-x-auto whitespace-nowrap py-2 px-3 bg-white dark:bg-[#0A0D14] rounded-lg shadow-inner border border-slate-100 dark:border-slate-800">
      {formula}
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-400 italic border-l-2 border-indigo-200 pl-3">{description}</p>
  </div>
);

interface BadgeProps {
  text: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gray';
}

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  const colors = {
    blue: "bg-[#A8672E] dark:bg-[#D08F52] text-[#A8672E] dark:text-[#D08F52] border-blue-200",
    green: "bg-[#1D8A70] dark:bg-[#3CBF9C] text-[#1D8A70] dark:text-[#3CBF9C] border-emerald-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    pink: "bg-pink-100 text-pink-800 border-pink-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200"
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colors[color]} mr-2 mb-2`}>
      {text}
    </span>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "python" }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden my-4 text-left shadow-2xl">
    <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
      <span className="text-xs text-gray-400 font-mono">{language}</span>
      <div className="flex space-x-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C]"></div>
      </div>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-sm font-mono text-gray-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

interface ProcessStepProps {
  number: string;
  title: string;
  desc: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, desc }) => (
  <div className="relative flex flex-col items-center text-center p-3 min-h-[160px]">
    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg lg:text-xl mb-3 shadow-lg z-10 relative flex-shrink-0">
      {number}
    </div>
    <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base leading-tight font-serif">{title}</h3>
    <p className="text-xs lg:text-sm text-gray-600 max-w-[160px] leading-relaxed">{desc}</p>
  </div>
);

export default function EfficientFrontierArticle() {
  const [activeTab, setActiveTab] = useState('mvo');
  const [activeConstraint, setActiveConstraint] = useState('cardinality');

  return (
    <ArticleFrame slug="efficient-frontier-portfolio-optimization-mathematics">
      <div className="max-w-4xl mx-auto mb-16">
        <InfographicSlot alt="Portfolio Optimization Infographic" />
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section 0: The Workflow */}
          <section className="py-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-serif">The Quantitative Production Line</h2>
              <p className="text-lg text-gray-600">From raw data to executed trades</p>
            </div>
            <div className="relative max-w-5xl mx-auto">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200 transform translate-y-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-2">
                <ProcessStep 
                  number="1" 
                  title="Alpha Model" 
                  desc="Forecasts expected returns (E[r]) using ML or econometric factors." 
                />
                <ProcessStep 
                  number="2" 
                  title="Risk Model" 
                  desc="Forecasts the covariance matrix (Σ) to estimate volatility." 
                />
                <ProcessStep 
                  number="3" 
                  title="Cost Model" 
                  desc="Estimates market impact and slippage for trade sizing." 
                />
                <ProcessStep 
                  number="4" 
                  title="Optimizer" 
                  desc="Solves the utility maximization problem subject to constraints." 
                />
                <ProcessStep 
                  number="5" 
                  title="Execution" 
                  desc="Slices the parent order into child orders (VWAP/TWAP)." 
                />
              </div>
            </div>
          </section>

          {/* Section 1: Foundations */}
          <section className="py-4">
            <SectionHeader 
              title="Core Objectives" 
              subtitle="The mathematical utility functions that define 'optimal'."
              icon={TrendingUp}
              colorClass="bg-[#A8672E] dark:bg-[#D08F52]"
            />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Column: Theory */}
              <div className="xl:col-span-7 space-y-3">
                <Card title="Mean-Variance Optimization (MVO)">
                  <p className="mb-3 text-gray-700 leading-relaxed">
                    Modern Portfolio Theory (Markowitz, 1952) treats portfolio construction as a trade-off between reward (expected return) and risk (variance). The "Efficient Frontier" is the set of portfolios that offer the highest expected return for a defined level of risk.
                  </p>
                  <FormulaCard 
                    label="Quadratic Utility Function"
                    formula="max U(w) = wᵀμ - λ(wᵀΣw) - TC(Δw)"
                    description={
                      <span>
                        <strong className="text-[#A8672E] dark:text-[#D08F52]">w:</strong> Weights vector, <strong className="text-[#A8672E] dark:text-[#D08F52] ml-2">μ:</strong> Expected returns, <strong className="text-[#A8672E] dark:text-[#D08F52] ml-2">Σ:</strong> Covariance matrix, <strong className="text-[#A8672E] dark:text-[#D08F52] ml-2">λ:</strong> Risk aversion parameter.<br/>
                        <span className="text-xs text-gray-500 mt-1 block">Note: TC represents Transaction Costs based on weight changes (Δw).</span>
                      </span>
                    }
                  />
                  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-xl p-3 border border-indigo-100">
                    <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">Why it fails in practice</h4>
                    <p className="text-sm text-[#A8672E] dark:text-[#D08F52] mb-2">MVO is infamously an "estimation error maximizer". It aggressively allocates to assets with:</p>
                    <ul className="list-disc list-inside text-sm text-[#A8672E] dark:text-[#D08F52] space-y-1 ml-2">
                      <li>Overestimated returns (High μ)</li>
                      <li>Underestimated volatility (Low σ)</li>
                      <li>Underestimated correlation (Low ρ)</li>
                    </ul>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <Card title="Benchmark Relative" className="bg-slate-50 dark:bg-[#14171B] border-slate-200 dark:border-slate-800">
                    <p className="text-sm mb-3 text-gray-700">Minimizing Tracking Error Variance (TEV) to strictly hug a benchmark like the S&P 500.</p>
                    <div className="font-mono text-xs bg-white dark:bg-[#0A0D14] p-2 rounded border border-slate-300 text-slate-600 dark:text-slate-400 overflow-x-auto">
                      min (w - w_b)ᵀ Σ (w - w_b)
                    </div>
                  </Card>
                  <Card title="Information Ratio" className="bg-slate-50 dark:bg-[#14171B] border-slate-200 dark:border-slate-800">
                    <p className="text-sm mb-3 text-gray-700">Maximizing active return per unit of active risk. The standard for 'Smart Beta' funds.</p>
                    <div className="font-mono text-xs bg-white dark:bg-[#0A0D14] p-2 rounded border border-slate-300 text-slate-600 dark:text-slate-400 overflow-x-auto">
                      max (wᵀα) / √((w-w_b)ᵀ Σ (w-w_b))
                    </div>
                  </Card>
                </div>
              </div>

              {/* Right Column: Risk Parity & Interactive */}
              <div className="xl:col-span-5">
                <div className="bg-slate-900 text-white rounded-2xl p-5 lg:p-6 shadow-2xl">
                  <div className="mb-4">
                    <h3 className="text-lg lg:text-xl font-bold mb-2 flex items-center text-white font-serif">
                      <Shield className="w-5 h-5 lg:w-6 lg:h-6 mr-3 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0" />
                      Risk-Based Construction
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Because predicting returns (μ) is hard, many funds ignore them and focus solely on managing risk (Σ).
                    </p>
                  </div>
                  <div className="space-y-2 mb-4">
                    {[
                      { id: 'gmv', label: 'Global Min Variance', desc: 'The absolute lowest point on the volatility curve. Often heavily concentrated in low-vol utility stocks.' },
                      { id: 'rp', label: 'Risk Parity (ERC)', desc: 'Equal Risk Contribution. Uses leverage to scale low-vol assets (bonds) to match equity risk.' },
                      { id: 'mdr', label: 'Max Diversification', desc: 'Maximizes the ratio of weighted average asset vols to portfolio vol. Explicitly rewards low correlation.' }
                    ].map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all border ${
                          activeTab === item.id 
                            ? 'bg-[#1D8A70] dark:bg-[#3CBF9C]/20 border-[#1D8A70] dark:border-[#3CBF9C]/50 text-white' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                        }`}
                      >
                        <div className="font-bold text-sm mb-1 flex justify-between items-center">
                          <span>{item.label}</span>
                          {activeTab === item.id && <div className="w-2 h-2 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] animate-pulse flex-shrink-0"></div>}
                        </div>
                        {activeTab === item.id && (
                          <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] opacity-90 mt-1 leading-relaxed">
                            {item.desc}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-slate-700">
                    <div className="text-xs font-mono text-slate-500 mb-2">PYTHON IMPLEMENTATION (RISKFOLIO-LIB)</div>
                    <div className="bg-black rounded p-2 font-mono text-xs text-[#1D8A70] dark:text-[#3CBF9C] overflow-x-auto">
                      {activeTab === 'gmv' && "port.optimization(model='Classic', rm='MV', obj='MinRisk')"}
                      {activeTab === 'rp' && "port.optimization(model='Classic', rm='MV', obj='RiskParity')"}
                      {activeTab === 'mdr' && "port.optimization(model='Classic', rm='MV', obj='MaxDiv')"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Factor Models Deep Dive */}
          <section className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 border-y border-gray-200">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center mb-8 gap-4">
                <div className="p-3 rounded-xl bg-purple-600 text-white shadow-lg flex-shrink-0">
                  <PieChart className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 font-serif">Risk Models: Dimensionality Reduction</h2>
                  <p className="text-lg lg:text-xl text-gray-600">How to estimate a 5000x5000 covariance matrix without overfitting.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 font-serif">Structural Decomposition</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Calculating the covariance of every stock pair requires N(N-1)/2 estimates. For the S&P 500, that's ~125,000 values. Factor models reduce this by assuming asset returns are driven by a small set of common drivers (Market, Sector, Style).
                  </p>
                  <div className="bg-white dark:bg-[#0A0D14] p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="font-mono text-xl lg:text-2xl text-center mb-3 text-purple-700">rᵢ = βᵢF + εᵢ</div>
                    <div className="text-center text-sm text-gray-500 mb-4">Return = Systemic Risk + Idiosyncratic Risk</div>
                    <div className="h-px bg-gray-100 my-3"></div>
                    <div className="font-mono text-lg lg:text-xl text-center mb-3 text-slate-800 dark:text-slate-200">Σ = B Ω Bᵀ + D</div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">B</div>
                        <div className="text-gray-500">Factor Loadings (Betas)</div>
                      </div>
                      <div className="p-2 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">Ω</div>
                        <div className="text-gray-500">Factor Covariance</div>
                      </div>
                      <div className="p-2 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">D</div>
                        <div className="text-gray-500">Specific Variance (Diagonal)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 font-serif">The Hierarchy of Models</h3>
                  <div className="relative pl-6 lg:pl-8 border-l-2 border-purple-200 space-y-5">
                    <div className="relative">
                      <div className="absolute -left-[33px] lg:-left-[41px] top-1 w-4 h-4 lg:w-5 lg:h-5 rounded-full border-4 border-white bg-purple-600"></div>
                      <h4 className="font-bold text-gray-900 mb-1">1. Fundamental Models (Barra)</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Factors are pre-defined attributes (P/E, Momentum, Industry). Easy to interpret. "Why did we lose money? Because Momentum crashed."
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[33px] lg:-left-[41px] top-1 w-4 h-4 lg:w-5 lg:h-5 rounded-full border-4 border-white bg-[#A8672E] dark:bg-[#D08F52]"></div>
                      <h4 className="font-bold text-gray-900 mb-1">2. Statistical Models (PCA/Axioma)</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Factors are latent eigenvectors derived from price history. Captures risks that humans miss, but factors are unnamed ("Factor 1", "Factor 2").
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[33px] lg:-left-[41px] top-1 w-4 h-4 lg:w-5 lg:h-5 rounded-full border-4 border-white bg-[#A8672E] dark:bg-[#D08F52]"></div>
                      <h4 className="font-bold text-gray-900 mb-1">3. Hybrid Models</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Uses fundamental factors as a base, then runs PCA on the residuals to catch "missing" systemic risks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Constraints & Code */}
          <section className="py-4">
            <SectionHeader 
              title="Constraints & Implementation" 
              subtitle="Translating business rules into convex geometry."
              icon={Code}
              colorClass="bg-pink-500"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Constraints define the "Feasible Set". Adding constraints always degrades the theoretical optimal Sharpe Ratio, but improves the portfolio's realizability and robustness.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['cardinality', 'turnover', 'leverage', 'neutrality'].map(c => (
                    <button
                      key={c}
                      onClick={() => setActiveConstraint(c)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        activeConstraint === c 
                          ? 'bg-pink-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <Card noPadding className="border-pink-100">
                  <div className="p-4 bg-pink-50 border-b border-pink-100">
                    <h3 className="font-bold text-pink-900 capitalize text-lg font-serif">{activeConstraint} Constraints</h3>
                  </div>
                  <div className="p-4">
                    {activeConstraint === 'cardinality' && (
                      <>
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          Limits the number of non-zero positions. This turns the problem from Convex (easy) to Mixed-Integer (NP-Hard).
                        </p>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Used to minimize operational overhead.</li>
                          <li>• Often solved via heuristics (greedy algorithms) or L1 Regularization (Lasso).</li>
                        </ul>
                      </>
                    )}
                    {activeConstraint === 'turnover' && (
                      <>
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          Limits the sum of absolute weight changes from the current portfolio.
                        </p>
                        <div className="font-mono text-xs bg-gray-100 p-2 rounded mb-3 overflow-x-auto">
                          Sum(|w_new - w_current|) ≤ Limit
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Crucial for controlling transaction costs. Often implemented as a penalty term in the objective function rather than a hard constraint.
                        </p>
                      </>
                    )}
                    {activeConstraint === 'leverage' && (
                      <>
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          Limits Gross Exposure (Long + Short) and Net Exposure (Long - Short).
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          130/30 funds typically constrain Net Exposure to 100% and Gross Exposure to 160%.
                        </p>
                      </>
                    )}
                    {activeConstraint === 'neutrality' && (
                      <>
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          Ensures zero exposure to specific factors (e.g., Market Neutral, Sector Neutral).
                        </p>
                        <div className="font-mono text-xs bg-gray-100 p-2 rounded mb-3 overflow-x-auto">
                          Bᵀw = 0
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Forces the optimizer to find alpha purely from stock selection, hedging out all systemic betas.
                        </p>
                      </>
                    )}
                  </div>
                </Card>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500">CVXPY Implementation</span>
                  <span className="text-xs text-pink-500 font-mono">portfolio_opt.py</span>
                </div>
                <CodeBlock code={`import cvxpy as cp
import numpy as np

# 1. Variables
w = cp.Variable(n_assets)
current_w = np.array([...])

# 2. Objective (Maximize Utility)
# Ret - Risk_Aversion * Variance - Transaction_Costs
ret_term = mu.T @ w
risk_term = cp.quad_form(w, Sigma)
tc_term = cp.sum(cp.abs(w - current_w)) * 0.0010  # 10bps cost
objective = cp.Maximize(ret_term - gamma * risk_term - tc_term)

# 3. Constraints
constraints = [
    cp.sum(w) == 1,         # Fully Invested
    w >= 0,                 # Long Only
    cp.sum(w) <= 0.05,      # 5% Max Position Size
    # Factor Neutrality (Market Neutral)
    beta_market.T @ w == 0  
]

# 4. Solve
prob = cp.Problem(objective, constraints)
prob.solve(solver=cp.ECOS)`} />
              </div>
            </div>
          </section>

          {/* Section 4: Advanced Modern Approaches */}
          <section className="py-4">
            <SectionHeader 
              title="Beyond Mean-Variance" 
              subtitle="The next generation of allocation logic."
              icon={Cpu}
              colorClass="bg-amber-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <Card title="Black-Litterman Model" className="border-t-4 border-t-amber-400">
                <div className="flex items-start mb-3">
                  <GitBranch className="w-5 h-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    A Bayesian approach that blends the market equilibrium (prior) with investor views (posterior).
                  </p>
                </div>
                <div className="bg-amber-50 rounded p-3 mb-3">
                  <p className="text-xs font-mono text-amber-900 mb-1">
                    <strong>Problem:</strong> "I think Tech will beat Energy by 2%."
                  </p>
                  <p className="text-xs font-mono text-amber-900">
                    <strong>Result:</strong> BL smoothly tilts the market-cap weights towards Tech without the extreme concentrations of standard MVO.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge text="Bayesian Stats" color="orange" />
                  <Badge text="Market Equilibrium" color="orange" />
                </div>
              </Card>

              <Card title="Hierarchical Risk Parity (HRP)" className="border-t-4 border-t-amber-400">
                <div className="flex items-start mb-3">
                  <Share2 className="w-5 h-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Uses Machine Learning (Clustering) to group assets, then allocates capital recursively down the tree.
                  </p>
                </div>
                <div className="bg-amber-50 rounded p-3 mb-3">
                  <p className="text-xs font-mono text-amber-900 mb-1">
                    <strong>Logic:</strong> Covariance matrices are noisy. Hierarchies are stable.
                  </p>
                  <p className="text-xs font-mono text-amber-900">
                    <strong>Process:</strong> 1. Cluster assets (Linkage) &rarr; 2. Quasi-Diagonalize &rarr; 3. Recursive Bisection allocation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge text="Machine Learning" color="orange" />
                  <Badge text="Clustering" color="orange" />
                </div>
              </Card>
            </div>
          </section>

          {/* Tools Ecosystem */}
          <section className="py-4">
            <SectionHeader 
              title="The Tech Stack" 
              subtitle="Buy vs. Build in 2024."
              icon={Database}
              colorClass="bg-[#A8672E] dark:bg-[#D08F52]"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              <div className="bg-white dark:bg-[#0A0D14] p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="h-10 w-10 bg-[#A8672E] dark:bg-[#D08F52] rounded-lg flex items-center justify-center mb-3">
                  <Anchor className="text-[#A8672E] dark:text-[#D08F52] w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-serif">Enterprise (Buy)</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">For firms where stability and audit trails are paramount.</p>
                <ul className="space-y-1">
                  <li className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-2 h-2 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mr-2 flex-shrink-0"></div>
                    Axioma
                  </li>
                  <li className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-2 h-2 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mr-2 flex-shrink-0"></div>
                    Barra (MSCI)
                  </li>
                  <li className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-2 h-2 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mr-2 flex-shrink-0"></div>
                    Northfield
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-[#0A0D14] p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                  <Code className="text-yellow-600 w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-serif">Open Source (Build)</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">For researchers and nimble prop shops.</p>
                <ul className="space-y-1">
                  <li className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 flex-shrink-0"></div>
                    PyPortfolioOpt
                  </li>
                  <li className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 flex-shrink-0"></div>
                    CVXPY
                  </li>
                  <li className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 flex-shrink-0"></div>
                    Riskfolio-Lib
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-[#0A0D14] p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="text-purple-600 w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-serif">Execution</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">Where the portfolio meets the order book.</p>
                <ul className="space-y-1">
                  <li className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></div>
                    Algotrader
                  </li>
                  <li className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></div>
                    Bloomberg EMSX
                  </li>
                </ul>
              </div>
            </div>
          </section>

      </div>
    </ArticleFrame>
  );
}