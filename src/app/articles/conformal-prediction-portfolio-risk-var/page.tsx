'use client';

import React from 'react';
import { Target, AlertTriangle, Layers, Settings, ShieldCheck, ChevronRight, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function ConformalPredictionArticle() {
  return (
    <ArticleFrame slug="conformal-prediction-portfolio-risk-var">
      <div className="pb-24">
        <InfographicSlot alt="Conformal Prediction for Portfolio Risk Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Paper Attribution Section */}
          <section className="py-12 mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-l-4 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52] p-8 rounded-r-3xl min-w-0 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 font-serif">Research Foundation</h2>
              <p className="text-lg text-blue-800 dark:text-blue-200/80 mb-6 leading-relaxed">
                This article builds upon the groundbreaking research by <strong className="text-blue-950 dark:text-blue-100">Marc Schmitt</strong> in his paper:
              </p>
              <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/50 min-w-0">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-serif leading-snug">
                  "Taming Tail Risk in Financial Markets: Conformal Risk Control for Nonstationary Portfolio VaR"
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  This seminal work introduces a distribution-free framework for portfolio risk management that adapts to regime changes and non-stationary market conditions.
                </p>
                <a 
                  href="https://arxiv.org/abs/2602.03903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] hover:text-blue-800 dark:hover:text-blue-300 font-bold transition-colors group"
                >
                  Read the Full Paper on arXiv
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6">The Failure of Traditional VaR</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Value at Risk (VaR) has been the industry standard for portfolio risk measurement for decades. Yet it suffers from fundamental flaws that become catastrophic during market stress.
              </p>
            </div>
            
            <ComparisonGrid>
              <ComparisonCard
                title="Traditional VaR Limitations"
                type="neg"
                items={[
                  "Distributional Assumptions: Traditional VaR assumes returns follow a normal distribution, systematically underestimating tail risk.",
                  "Stationarity Assumption: Historical VaR assumes the future resembles the past, failing during regime changes.",
                  "Model Risk: Parametric VaR models (GARCH, EVT) require correct specification and parameter estimation.",
                  "Backtesting Failures: VaR violations cluster during crises, exactly when risk management matters most."
                ]}
              />
            </ComparisonGrid>
          </section>

          {/* Conformal Prediction Fundamentals */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Conformal Prediction: A Distribution-Free Framework</h2>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-950/20 p-8 rounded-3xl mb-12 min-w-0 border border-purple-100 dark:border-purple-900/30">
              <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-4 font-serif">Core Principle</h3>
              <p className="text-lg text-purple-800 dark:text-purple-200/90 leading-relaxed">
                Conformal prediction provides <strong className="text-purple-950 dark:text-purple-100">finite-sample validity guarantees</strong> without making distributional assumptions. Instead of assuming normality, it constructs prediction intervals that are guaranteed to contain the true value with a specified probability under the exchangeability assumption.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Mathematical Foundation</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Given a calibration set of historical returns and a desired coverage level (1 - α), conformal prediction constructs a prediction interval by:
            </p>
            
            <div className="space-y-6 mb-10 min-w-0">
              <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold shrink-0 mt-0.5">1</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-1 font-serif text-lg">Computing Nonconformity Scores</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Measure how "unusual" each historical observation is relative to a base model.</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold shrink-0 mt-0.5">2</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-1 font-serif text-lg">Quantile Calculation</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Find the (1 - α) quantile of these scores.</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold shrink-0 mt-0.5">3</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-1 font-serif text-lg">Prediction Interval</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Use this quantile to construct an interval for future returns.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-950/20 p-6 rounded-2xl border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] min-w-0">
              <p className="text-emerald-900 dark:text-emerald-300 font-mono text-sm">
                <strong className="font-bold">Validity Guarantee:</strong> Under exchangeability, the prediction interval covers the true value with probability ≥ (1 - α)
              </p>
            </div>
          </section>

          {/* Conformal Risk Control (CRC) */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Conformal Risk Control (CRC)</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Conformal Risk Control extends conformal prediction to control the <strong className="text-slate-900 dark:text-white">expected value of a loss function</strong> rather than just coverage probability. This is crucial for portfolio management where we care about the magnitude of losses, not just their frequency.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Key Components</h3>
            
            <div className="grid md:grid-cols-2 gap-6 min-w-0">
              <div className="bg-white dark:bg-[#05070A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0 transition-transform hover:-translate-y-1">
                <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 font-serif">Loss Function</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Define a loss function L(y, ŷ) that quantifies the cost of prediction errors. For VaR, this could be the magnitude of losses exceeding the VaR threshold.
                </p>
              </div>

              <div className="bg-white dark:bg-[#05070A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0 transition-transform hover:-translate-y-1">
                <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 font-serif">Risk Control</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  CRC adaptively adjusts the prediction interval to ensure E[L(y, ŷ)] ≤ α, providing a guarantee on expected loss rather than just coverage.
                </p>
              </div>

              <div className="bg-white dark:bg-[#05070A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0 transition-transform hover:-translate-y-1">
                <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 font-serif">Online Learning</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  CRC updates the risk threshold in real-time as new data arrives, adapting to changing market conditions without retraining models.
                </p>
              </div>

              <div className="bg-white dark:bg-[#05070A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0 transition-transform hover:-translate-y-1">
                <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 font-serif">Finite-Sample Validity</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Unlike asymptotic guarantees, CRC provides valid risk control for any sample size, critical for short-horizon trading strategies.
                </p>
              </div>
            </div>
          </section>

          {/* Regime-Weighted Conformal (RWC) */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Regime-Weighted Conformal (RWC)</h2>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-8 rounded-3xl mb-12 min-w-0 border border-orange-100 dark:border-orange-900/30">
              <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-300 mb-4 font-serif">The Non-Stationarity Problem</h3>
              <p className="text-lg text-orange-800 dark:text-orange-200/90 leading-relaxed">
                Financial markets exhibit <strong className="text-orange-950 dark:text-orange-100">regime changes</strong> — periods of low volatility followed by sudden spikes, shifts in correlation structure, and changing tail behavior. Standard conformal prediction assumes exchangeability, which breaks down during regime transitions.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Adaptive Weighting Mechanism</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              RWC addresses non-stationarity by assigning <strong className="text-slate-900 dark:text-white">time-varying weights</strong> to historical observations based on their relevance to the current market regime:
            </p>

            <div className="bg-white dark:bg-[#05070A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 mb-12 min-w-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#BC4128] dark:bg-[#E2694A]"></div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Weighting Schemes</h4>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                  <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">Exponential Decay:</strong> w(t) = exp(-λ · (T - t)) — Recent data weighted more heavily</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                  <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">Volatility-Based:</strong> Weight by similarity in realized volatility regimes</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                  <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">Regime Detection:</strong> Use HMM or change-point detection to identify regime shifts</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                  <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">Adaptive λ:</strong> Learn the decay rate from data to optimize coverage</div>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Implementation Framework</h3>
            <div className="space-y-6 min-w-0">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold shrink-0 mt-0.5">1</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-1 font-serif text-lg">Regime Identification</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Detect current market regime using volatility, correlation, or macro indicators.</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold shrink-0 mt-0.5">2</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-1 font-serif text-lg">Weight Assignment</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Assign higher weights to historical periods similar to current regime.</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold shrink-0 mt-0.5">3</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-1 font-serif text-lg">Weighted Quantile</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Compute weighted quantile of nonconformity scores.</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold shrink-0 mt-0.5">4</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-1 font-serif text-lg">Dynamic Adjustment</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Update weights as new data arrives and regimes evolve.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Implementation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Building an Adaptive Capital Allocation System</h2>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-serif">Step-by-Step Implementation</h3>

            <div className="space-y-6 min-w-0">
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 dark:bg-blue-950/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30 min-w-0">
                <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-3 font-serif">
                  <span className="w-8 h-8 bg-blue-200 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full flex items-center justify-center text-sm shadow-sm">1</span>
                  Data Preparation
                </h4>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-11">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                    <div>Collect historical portfolio returns (daily, hourly, or tick-level)</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                    <div>Compute regime indicators (VIX, realized volatility, correlation)</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                    <div>Split data into calibration and test sets</div>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/50 dark:bg-emerald-950/10 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 min-w-0">
                <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-4 flex items-center gap-3 font-serif">
                  <span className="w-8 h-8 bg-emerald-200 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded-full flex items-center justify-center text-sm shadow-sm">2</span>
                  Base Model Selection
                </h4>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-11">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                    <div>Choose a base forecasting model (GARCH, ML model, or simple historical mean)</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                    <div>The beauty of conformal prediction: model misspecification is corrected by the conformal layer</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                    <div>Even a naive model can achieve valid coverage with conformal adjustment</div>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50/50 dark:bg-purple-950/10 p-8 rounded-3xl border border-purple-100 dark:border-purple-900/30 min-w-0">
                <h4 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-4 flex items-center gap-3 font-serif">
                  <span className="w-8 h-8 bg-purple-200 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full flex items-center justify-center text-sm shadow-sm">3</span>
                  Nonconformity Score Design
                </h4>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-11">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                    <div>Absolute residual: |y - ŷ|</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                    <div>Normalized residual: |y - ŷ| / σ̂</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                    <div>Quantile-based: Distance to predicted quantile</div>
                  </li>
                </ul>
              </div>

              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 dark:bg-orange-950/10 p-8 rounded-3xl border border-orange-100 dark:border-orange-900/30 min-w-0">
                <h4 className="text-xl font-bold text-orange-900 dark:text-orange-300 mb-4 flex items-center gap-3 font-serif">
                  <span className="w-8 h-8 bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 rounded-full flex items-center justify-center text-sm shadow-sm">4</span>
                  Regime Weighting
                </h4>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-11">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Implement exponential decay or volatility-based weighting</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Tune decay parameter λ via cross-validation</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Monitor regime transitions and adjust weights dynamically</div>
                  </li>
                </ul>
              </div>

              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 dark:bg-rose-950/10 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/30 min-w-0">
                <h4 className="text-xl font-bold text-rose-900 dark:text-rose-300 mb-4 flex items-center gap-3 font-serif">
                  <span className="w-8 h-8 bg-rose-200 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 rounded-full flex items-center justify-center text-sm shadow-sm">5</span>
                  Risk Control Integration
                </h4>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-11">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Define loss function (e.g., magnitude of VaR breaches)</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Set target risk level α (e.g., 5% for 95% VaR)</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Implement online learning algorithm to adjust thresholds</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Monitor cumulative loss and adapt in real-time</div>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-50/50 dark:bg-cyan-950/10 p-8 rounded-3xl border border-cyan-100 dark:border-cyan-900/30 min-w-0">
                <h4 className="text-xl font-bold text-cyan-900 dark:text-cyan-300 mb-4 flex items-center gap-3 font-serif">
                  <span className="w-8 h-8 bg-cyan-200 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 rounded-full flex items-center justify-center text-sm shadow-sm">6</span>
                  Capital Allocation
                </h4>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-11">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-500 shrink-0" />
                    <div>Use conformal VaR to set position limits</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-500 shrink-0" />
                    <div>Scale leverage inversely with predicted risk</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-500 shrink-0" />
                    <div>Implement dynamic stop-losses based on conformal intervals</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-500 shrink-0" />
                    <div>Rebalance as conformal predictions update</div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Advantages Over Traditional VaR */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6">Why Conformal Prediction Dominates Traditional VaR</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 min-w-0">
              <div className="bg-[#14171B] dark:bg-[#05070A] p-8 rounded-3xl border border-emerald-900/30 text-white min-w-0 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#3CBF9C]"></div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
                  <CheckCircle2 className="w-5 h-5 text-[#3CBF9C]" /> Distribution-Free
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  No assumptions about return distributions. Works for fat tails, skewness, and any distribution shape.
                </p>
              </div>

              <div className="bg-[#14171B] dark:bg-[#05070A] p-8 rounded-3xl border border-emerald-900/30 text-white min-w-0 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#3CBF9C]"></div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
                  <CheckCircle2 className="w-5 h-5 text-[#3CBF9C]" /> Finite-Sample Validity
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Guarantees hold for any sample size, not just asymptotically. Critical for short-horizon strategies.
                </p>
              </div>

              <div className="bg-[#14171B] dark:bg-[#05070A] p-8 rounded-3xl border border-emerald-900/30 text-white min-w-0 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#3CBF9C]"></div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
                  <CheckCircle2 className="w-5 h-5 text-[#3CBF9C]" /> Regime Adaptation
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  RWC automatically adapts to regime changes without manual model respecification or retraining.
                </p>
              </div>

              <div className="bg-[#14171B] dark:bg-[#05070A] p-8 rounded-3xl border border-emerald-900/30 text-white min-w-0 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#3CBF9C]"></div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
                  <CheckCircle2 className="w-5 h-5 text-[#3CBF9C]" /> Model-Agnostic
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Works with any base forecasting model. Corrects for model misspecification automatically.
                </p>
              </div>

              <div className="bg-[#14171B] dark:bg-[#05070A] p-8 rounded-3xl border border-emerald-900/30 text-white min-w-0 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#3CBF9C]"></div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
                  <CheckCircle2 className="w-5 h-5 text-[#3CBF9C]" /> Online Learning
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Updates in real-time as new data arrives. No need for periodic recalibration or backtesting.
                </p>
              </div>

              <div className="bg-[#14171B] dark:bg-[#05070A] p-8 rounded-3xl border border-emerald-900/30 text-white min-w-0 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#3CBF9C]"></div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
                  <CheckCircle2 className="w-5 h-5 text-[#3CBF9C]" /> Risk Control
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  CRC controls expected loss, not just coverage probability. Directly optimizes the risk metric you care about.
                </p>
              </div>
            </div>
          </section>

          {/* Limitations and Considerations */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Limitations and Practical Considerations</h2>
            </div>
            
            <div className="space-y-6 min-w-0">
              <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-2xl border-l-4 border-amber-500 shadow-sm min-w-0 flex flex-col sm:flex-row gap-4 items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2 font-serif">Exchangeability Assumption</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Standard conformal prediction requires exchangeability (i.i.d. or similar). RWC relaxes this but still assumes some form of stationarity within regimes.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-2xl border-l-4 border-amber-500 shadow-sm min-w-0 flex flex-col sm:flex-row gap-4 items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2 font-serif">Calibration Set Size</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Requires sufficient calibration data. For extreme quantiles (99% VaR), need large historical samples to estimate tail behavior accurately.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-2xl border-l-4 border-amber-500 shadow-sm min-w-0 flex flex-col sm:flex-row gap-4 items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2 font-serif">Regime Detection</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    RWC performance depends on accurate regime identification. Misspecified regimes can lead to suboptimal weighting and coverage failures.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-2xl border-l-4 border-amber-500 shadow-sm min-w-0 flex flex-col sm:flex-row gap-4 items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-2 font-serif">Computational Cost</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Online updates and weighted quantile calculations can be computationally expensive for high-frequency strategies. Requires efficient implementation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6">The Future of Portfolio Risk Management</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Conformal prediction represents a paradigm shift in portfolio risk management. By abandoning restrictive distributional assumptions and embracing distribution-free, finite-sample guarantees, it provides a mathematically rigorous framework that adapts to the non-stationary, regime-switching nature of financial markets.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#05070A] dark:to-[#14171B] text-white p-10 md:p-14 rounded-[3rem] shadow-2xl min-w-0 relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D8A70] dark:bg-[#3CBF9C]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <p className="text-lg text-slate-300 mb-8 leading-relaxed font-serif">
                  The combination of Conformal Risk Control (CRC) and Regime-Weighted Conformal (RWC) creates an adaptive capital allocation system that:
                </p>
                
                <ul className="space-y-5 mb-10 text-lg">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                    <div>Provides valid risk estimates without distributional assumptions</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                    <div>Adapts to regime changes in real-time</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                    <div>Controls expected loss, not just coverage probability</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                    <div>Works with any base forecasting model</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                    <div>Offers finite-sample guarantees for any strategy horizon</div>
                  </li>
                </ul>
                
                <p className="text-slate-400 leading-relaxed pt-8 border-t border-slate-800">
                  As quantitative finance continues to evolve, conformal prediction will become an essential tool for institutional risk managers, systematic traders, and portfolio managers seeking robust, adaptive risk control in an increasingly complex and non-stationary market environment.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
