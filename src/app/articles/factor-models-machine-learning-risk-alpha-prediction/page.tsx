'use client';

import React from 'react';
import { TrendingUp, Shield, Activity, Database, Layers, GitMerge, Clock, CheckCircle, AlertTriangle, Cpu, Globe, BarChart2, Lock, Zap, Filter, ChevronRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

// --- Main Application ---
export default function FactorModelsMLArticle() {
  return (
    <ArticleFrame slug="factor-models-machine-learning-risk-alpha-prediction">
      <div className="pb-24">
        <InfographicSlot alt="Factor Models in Machine Learning Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1: The Conceptual Divide */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <GitMerge className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Core Dichotomy: Risk vs. Alpha</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  Understanding why predictability is merely the residual of risk.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  In quantitative finance, the <strong className="text-slate-900 dark:text-white">Fundamental Law of Active Management</strong> suggests that performance is a function of breadth (number of bets) and skill (Information Coefficient). However, before we can claim "skill" (Alpha), we must strip away returns attributable to "luck" or passive exposure to risk factors (Beta).
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  The distinction between systematic risk and idiosyncratic returns forms the philosophical foundation of modern portfolio theory. Factor models serve as the mathematical apparatus for this decomposition, enabling us to separate market-driven returns from genuine alpha generation.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h4 className="font-serif text-xl flex items-center gap-2 mb-6 text-[#D08F52]">
                    <Activity className="w-5 h-5" />
                    Deep Dive: Universe Split
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    How do you prove your "Alpha" isn't just hidden "Risk"?
                  </p>
                  <ul className="space-y-4 text-sm text-slate-400">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#D08F52] shrink-0" />
                      <div><strong className="text-white">Split:</strong> Divide stocks into two random, non-overlapping groups (A &amp; B).</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#D08F52] shrink-0" />
                      <div><strong className="text-white">Build:</strong> Construct Long/Short portfolios on both based on signal.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#D08F52] shrink-0" />
                      <div><strong className="text-white">Correlate:</strong> If highly correlated, it's a Risk Factor. If uncorrelated and positive, it's Alpha.</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-12 min-w-0">
              <FormulaPanel 
                title="Linear Factor Model (APT Framework)"
                formula="R_{i,t} = \alpha_i + \sum \beta_{i,k} F_{k,t} + \varepsilon_{i,t}"
                legend={[
                  { label: "R", value: "Asset Return" },
                  { label: "F", value: "Common Risk Factors (Market, Value, Size)" },
                  { label: "\beta", value: "Factor Loadings (Sensitivity)" },
                  { label: "\varepsilon", value: "Idiosyncratic noise" }
                ]}
              />
              <div className="mt-4 bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 min-w-0 text-sm text-indigo-900 dark:text-indigo-300">
                <strong className="font-bold">Goal:</strong> Traditional finance minimizes <span className="font-mono">ε</span> (Risk Model). Algorithmic trading attempts to <em>predict</em> <span className="font-mono">ε</span> (Alpha Model).
              </div>
            </div>

            <ComparisonGrid>
              <ComparisonCard
                title="Systematic Risk (Beta)"
                type="neg"
                items={[
                  "Variance shared across the market. You are paid a premium for bearing this risk because it cannot be diversified.",
                  "Macro: Inflation, GDP, VIX.",
                  "Style: Value (HML), Size (SMB), Momentum (WML).",
                  "Sector: Tech, Energy, Financials exposure."
                ]}
              />
              <ComparisonCard
                title="Idiosyncratic Alpha"
                type="pos"
                items={[
                  "Residual returns specific to the asset. This is the 'Gold' of algo trading.",
                  "Mispricing: Temporary arbitrage opportunities.",
                  "Alternative Data: Satellite imagery, credit card flows.",
                  "Micro-structure: Order book imbalances."
                ]}
              />
            </ComparisonGrid>
          </section>

          {/* Section 2: Machine Learning Renaissance */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The ML Renaissance: Conditional Factors</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Classic models (Fama-French) assume factor loadings (β) are constant over time. <strong className="text-slate-900 dark:text-white">Machine Learning</strong> introduces <em>Conditional Factor Models</em>, where β varies based on the state of the world (e.g., Value performs differently during high inflation).
            </p>

            <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 p-6 rounded-r-2xl mb-12 min-w-0">
              <h3 className="text-lg font-bold text-purple-900 dark:text-purple-300 mb-2">The Paradigm Shift</h3>
              <p className="text-purple-800 dark:text-purple-200/80 leading-relaxed">
                Traditional factor models are <strong className="text-purple-950 dark:text-purple-100">static</strong>: they assume the relationship between factors and returns remains constant. ML models are <strong className="text-purple-950 dark:text-purple-100">dynamic</strong>: they learn regime-dependent relationships, adapting factor sensitivities based on market conditions, volatility regimes, and macroeconomic states.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12 min-w-0">
              <div className="bg-white dark:bg-[#05070A] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5">
                  <Layers size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg font-serif">Autoencoders (PCA 2.0)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Classic PCA is linear. <strong className="text-slate-900 dark:text-white">Autoencoders</strong> use neural networks to find non-linear latent risk factors. The "bottleneck" layer forces the model to compress market noise into clean, structural drivers.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    <strong className="text-slate-700 dark:text-slate-300">Application:</strong> Dimensionality reduction for high-frequency data, discovering hidden market regimes.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#05070A] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                  <Zap size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg font-serif">Transformers</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Models like "Stockformer" treat price history as a language sequence. <strong className="text-slate-900 dark:text-white">Self-Attention</strong> mechanisms identify which past market regimes are relevant to the current prediction, solving the long-memory problem.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    <strong className="text-slate-700 dark:text-slate-300">Application:</strong> Time-series forecasting with adaptive lookback windows, capturing regime changes.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#05070A] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
                  <Filter size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg font-serif">Regularization (Lasso)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  With the "Factor Zoo" (hundreds of potential factors), ML uses L1 Regularization (Lasso) to zero out useless factors, preventing overfitting and selecting only the most robust predictors.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    <strong className="text-slate-700 dark:text-slate-300">Application:</strong> Feature selection in high-dimensional factor spaces, combating data mining bias.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/30 min-w-0">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Conditional vs. Unconditional Models</h3>
              <div className="grid md:grid-cols-2 gap-8 min-w-0">
                <div>
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3 font-serif">Unconditional (Traditional)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Factor loadings are estimated using historical averages. Assumes market structure is stable over time.
                  </p>
                  <div className="bg-white dark:bg-[#05070A] p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 text-sm font-mono text-slate-700 dark:text-slate-300">
                    β<sub>Value</sub> = 0.8 <span className="text-slate-400">(constant)</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3 font-serif">Conditional (ML-Enhanced)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Factor loadings adapt based on state variables (VIX, yield curve slope, credit spreads).
                  </p>
                  <div className="bg-white dark:bg-[#05070A] p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-sm font-mono text-slate-700 dark:text-slate-300">
                    β<sub>Value</sub>(t) = f(VIX<sub>t</sub>, Inflation<sub>t</sub>, ...)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Data Typology */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Data Typology &amp; Engineering</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Distinguishing data is critical. Risk models require broad, "Point-in-Time" economic data. Alpha models require granular, often unstructured data. The quality and temporal alignment of your data determines the ceiling of your model's performance.
            </p>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 min-w-0 shadow-sm">
              <table className="min-w-full text-left bg-white dark:bg-[#05070A]">
                <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-4 px-6 text-slate-900 dark:text-white font-bold text-sm">Feature</th>
                    <th className="py-4 px-6 text-rose-600 dark:text-rose-400 font-bold text-sm">Risk Modeling (Factors)</th>
                    <th className="py-4 px-6 text-[#1D8A70] dark:text-[#3CBF9C] font-bold text-sm">Alpha Prediction (ML)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm md:text-base">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">Objective</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Explain variance (R² ≈ 90%)</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 font-medium bg-emerald-50/50 dark:bg-emerald-950/20">Forecast returns (IC ≈ 0.05)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">Horizon</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Long-term (Quarterly/Yearly structural risks)</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 font-medium bg-emerald-50/50 dark:bg-emerald-950/20">Short-term (Minutes to Days)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">Metric</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Volatility Reduction, Beta</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 font-medium bg-emerald-50/50 dark:bg-emerald-950/20">Sharpe Ratio, Information Coefficient</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">Data Features</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Stationary, High Signal-to-Noise</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 font-medium bg-emerald-50/50 dark:bg-emerald-950/20">Non-stationary, Very Low Signal-to-Noise</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">Loss Function</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Minimize Tracking Error</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 font-medium bg-emerald-50/50 dark:bg-emerald-950/20">Maximize Risk-Adjusted Return</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ComparisonGrid>
              <ComparisonCard
                title="Point-in-Time (PIT) Cruciality"
                type="neutral"
                items={[
                  "For prediction, you must use data as it was known at that exact moment. This prevents look-ahead bias, the silent killer of backtests.",
                  "Look-ahead Bias Example: Using updated GDP figures for Q1 that were actually released in Q2 to train a model predicting Q1 prices. This creates phantom alpha that evaporates in live trading.",
                  "Solution: Bitemporal databases that track both 'as-of' date (when data was valid) and 'known-as-of' date (when data became available)."
                ]}
              />
              <ComparisonCard
                title="The Factor Zoo"
                type="neutral"
                items={[
                  "Academics have identified 400+ factors. Most are noise. The challenge is separating signal from data-mined artifacts.",
                  "Fundamental: P/E, P/B, Debt/Equity (Low freq).",
                  "Technical: RSI, MACD, Bollinger (High freq).",
                  "Alternative: Web traffic, NLP sentiment.",
                  "Harvey et al. (2016): With 400+ factors tested, the t-statistic threshold for significance should be 3.0, not 2.0."
                ]}
              />
            </ComparisonGrid>

            <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-3xl p-8 border border-cyan-100 dark:border-cyan-900/30 mt-12 min-w-0">
              <h3 className="text-2xl font-bold text-cyan-900 dark:text-cyan-300 mb-6 font-serif">Data Engineering Best Practices</h3>
              <div className="grid md:grid-cols-3 gap-6 min-w-0">
                <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl shadow-sm border border-cyan-100/50 dark:border-cyan-900/50">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Normalization</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Cross-sectional z-scores to ensure factors are comparable across stocks and time periods. Prevents large-cap bias.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl shadow-sm border border-cyan-100/50 dark:border-cyan-900/50">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Winsorization</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Cap extreme outliers at 1st/99th percentile to prevent single observations from dominating the model.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl shadow-sm border border-cyan-100/50 dark:border-cyan-900/50">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Lag Alignment</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ensure predictors are lagged appropriately relative to target returns. Minimum 1-day lag for daily models.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Orthogonalization */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Orthogonalization: Cleaning the Signal</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  If your ML model predicts returns based on "High P/E", it's just rediscovering the Value Factor. You must mathematically remove the influence of known factors to isolate pure alpha. Without orthogonalization, you're selling beta as alpha—a recipe for disappointment when market regimes shift.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h4 className="font-serif text-xl flex items-center gap-2 mb-6 text-[#BC4128] dark:text-[#E2694A]">
                    <AlertTriangle className="w-5 h-5" />
                    Multicollinearity Trap
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Ensuring your alpha is not just Beta in disguise requires rigorous statistical scrubbing.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12 min-w-0">
              <FormulaPanel 
                title="Residualization (Gram-Schmidt)"
                formula="\varepsilon_i = R_i - ( \beta_{Mkt}F_{Mkt} + \beta_{Val}F_{Val} + \beta_{Mom}F_{Mom} )"
                legend={[
                  { label: "Concept", value: "We regress our raw signal against all known risk factors. The residual is the 'Orthogonalized Signal'." },
                  { label: "\varepsilon_i", value: "The portion of the return unexplained by standard market forces. Your true alpha candidate." }
                ]}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 min-w-0">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-0 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xl font-serif">Feature Importance (SHAP)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  In Deep Learning, we don't have simple Beta coefficients. We use <strong className="text-slate-900 dark:text-white">SHAP</strong> values. If SHAP shows the "Market Return" feature drives 90% of your prediction, your model is a risk model, not an alpha model.
                </p>
                <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 text-sm font-serif">SHAP Interpretation Example</h4>
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Market Beta</span>
                        <span className="font-mono font-bold text-rose-600 dark:text-rose-400">85%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Value Factor</span>
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-500">10%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{width: '10%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Alt Data Signal</span>
                        <span className="font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C]">5%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1D8A70] dark:text-[#3CBF9C]" style={{width: '5%'}}></div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-rose-700 dark:text-rose-400 font-medium p-3 bg-rose-50 dark:bg-rose-950/20 rounded-lg">
                    ⚠️ This model is 85% beta exposure. Orthogonalize before deployment.
                  </p>
                </div>
              </div>

              <div className="bg-rose-50 dark:bg-rose-950/10 p-8 rounded-3xl border border-rose-200 dark:border-rose-900/30 min-w-0 shadow-sm">
                <h3 className="font-bold text-rose-900 dark:text-rose-300 mb-6 text-xl font-serif">The Orthogonalization Workflow</h3>
                <ul className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm mt-0.5">1</span>
                    <div>
                      <strong className="block text-rose-950 dark:text-rose-200 mb-1">Identify Known Factors</strong>
                      Start with Fama-French 5-factor model (Market, Size, Value, Profitability, Investment) as baseline.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm mt-0.5">2</span>
                    <div>
                      <strong className="block text-rose-950 dark:text-rose-200 mb-1">Regress Signal on Factors</strong>
                      Run OLS regression of your raw signal against factor returns. Extract residuals.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm mt-0.5">3</span>
                    <div>
                      <strong className="block text-rose-950 dark:text-rose-200 mb-1">Validate Independence</strong>
                      Compute correlation matrix between residualized signal and original factors. Target: |ρ| &lt; 0.1.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm mt-0.5">4</span>
                    <div>
                      <strong className="block text-rose-950 dark:text-rose-200 mb-1">Backtest Orthogonalized Signal</strong>
                      If performance degrades significantly, your "alpha" was actually disguised beta.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Portfolio Construction */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Portfolio Construction</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  A high-accuracy prediction is useless if it requires impossible trading costs. The final step is the <strong className="text-slate-900 dark:text-white">Mean-Variance Optimization</strong>, where alpha predictions meet risk constraints and transaction cost realities.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h4 className="font-serif text-xl flex items-center gap-2 mb-6 text-[#A8672E]">
                    <Activity className="w-5 h-5" />
                    The Sharpe Ratio Ceiling
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Sharpe Ratio ≈ IC × √Breadth
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Even with perfect signals (IC=0.1), 100 stocks rebalanced monthly gets Sharpe ≈ 1.0. To reach 2.0, you need 4x breadth, 2x skill, or higher frequency. Alpha is scarce; math is unforgiving.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12 min-w-0">
              <FormulaPanel 
                title="Objective Function"
                formula="w^* = \arg\max_w ( w^T \mu - \lambda w^T \Sigma w - Costs(w) )"
                legend={[
                  { label: "w", value: "Portfolio weights" },
                  { label: "\mu", value: "Predicted Alpha (from ML)" },
                  { label: "\Sigma", value: "Covariance Matrix (from Risk Model)" },
                  { label: "Costs", value: "Transaction fees + Slippage" }
                ]}
              />
              <div className="mt-4 bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 min-w-0 text-sm text-emerald-900 dark:text-emerald-300">
                <strong className="font-bold">Insight:</strong> The Risk Model (Σ) acts as the "brakes", preventing the Alpha Model (μ) from taking excessive concentrated bets. Lambda (λ) controls risk aversion.
              </div>
            </div>

            <ComparisonGrid>
              <ComparisonCard
                title="Constraints"
                type="neutral"
                items={[
                  "Gross Exposure: Leverage limits (e.g., 200% = 100% long + 100% short).",
                  "Net Exposure: Dollar neutrality for market-neutral strategies.",
                  "Factor Neutrality: Zero exposure to Sector/Style factors to isolate alpha.",
                  "Position Limits: Maximum weight per stock (e.g., 5%).",
                  "Turnover Caps: Limit daily turnover to control transaction costs."
                ]}
              />
              <ComparisonCard
                title="Transaction Costs"
                type="neg"
                items={[
                  "High turnover strategies erode quickly. Implementation Shortfall is the gap between paper returns and realized P&L.",
                  "Linear Cost: Spread + Commission. Typical: 5-10 bps.",
                  "Non-Linear Cost: Market Impact. Scales with √(Order Size / ADV).",
                  "Opportunity Cost: Slippage from delayed execution."
                ]}
              />
            </ComparisonGrid>

            <div className="mt-12 bg-emerald-50 dark:bg-emerald-950/10 rounded-3xl p-8 border border-emerald-200 dark:border-emerald-900/30 min-w-0 shadow-sm">
              <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-8 font-serif">The Optimization Hierarchy</h3>
              <div className="space-y-4 min-w-0">
                <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/50 shadow-sm">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-3 font-serif">
                    <span className="w-8 h-8 bg-[#1D8A70] dark:text-[#3CBF9C] text-white rounded-full flex items-center justify-center text-sm shadow-sm">1</span>
                    Alpha Generation Layer
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 pl-11 leading-relaxed">
                    ML models produce stock-level return forecasts (μ). This is the "raw signal" before risk adjustment.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/50 shadow-sm">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-3 font-serif">
                    <span className="w-8 h-8 bg-[#1D8A70] dark:text-[#3CBF9C] text-white rounded-full flex items-center justify-center text-sm shadow-sm">2</span>
                    Risk Model Layer
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 pl-11 leading-relaxed">
                    Factor models estimate covariance matrix (Σ). This quantifies how stocks move together, enabling diversification.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/50 shadow-sm">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-3 font-serif">
                    <span className="w-8 h-8 bg-[#1D8A70] dark:text-[#3CBF9C] text-white rounded-full flex items-center justify-center text-sm shadow-sm">3</span>
                    Transaction Cost Model
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 pl-11 leading-relaxed">
                    Estimates cost of executing trades based on liquidity, volatility, and order size. Penalizes high-turnover solutions.
                  </p>
                </div>
                <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/50 shadow-sm">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-3 font-serif">
                    <span className="w-8 h-8 bg-[#1D8A70] dark:text-[#3CBF9C] text-white rounded-full flex items-center justify-center text-sm shadow-sm">4</span>
                    Constraint Layer
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 pl-11 leading-relaxed">
                    Regulatory limits, client mandates, and operational constraints. The optimizer must respect these hard boundaries.
                  </p>
                </div>
              </div>
              <div className="mt-6 bg-[#1D8A70] dark:bg-[#3CBF9C] p-6 rounded-2xl text-white shadow-md">
                <p className="text-sm font-medium leading-relaxed">
                  <strong>Output:</strong> Optimal portfolio weights (w*) that maximize risk-adjusted returns subject to all constraints. This is the "trade list" sent to execution algorithms.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
