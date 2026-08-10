'use client';

import React, { useState } from 'react';
import { Shield, TrendingUp, Activity, Globe, Brain, Newspaper, Scale, Target, Zap, Search, Box, Layers, BarChart2, Lock, Unlock, Users, Cpu, BookOpen, Anchor, DollarSign, Percent, Briefcase, Sprout, Waves, ShieldCheck, Minimize2, Tag, AlertTriangle, GitMerge, Database, Grid, CheckCircle, XCircle, Filter, Sliders, ArrowRight, PieChart, Music, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';
import { articles } from '@/data/articles';

// --- Data: The Big 7 Factors ---
const factorData = [
  {
    title: "Momentum",
    icon: TrendingUp,
    color: "blue",
    metrics: "12M-1M Return, RSI",
    desc: "The tendency for assets that have performed well in the recent past to continue performing well.",
    rationale: "Behavioral Bias: Investors under-react to new information initially, then herd/over-react, creating trends.",
    risk: "Momentum Crashes: When trends violently reverse (e.g., 2009 recovery), momentum strategies suffer deep drawdowns.",
    type: "Aggressive"
  },
  {
    title: "Value",
    icon: Tag,
    color: "emerald",
    metrics: "Book-to-Price, Earnings Yield",
    desc: "Buying assets that are cheap relative to their fundamental value.",
    rationale: "Risk Premium: Cheap stocks often face distress risk. Returns are compensation for holding uncomfortable assets.",
    risk: "Value Traps: Stocks that are cheap because their business model is fundamentally broken (e.g., Kodak).",
    type: "Pro-Cyclical"
  },
  {
    title: "Size",
    icon: Minimize2,
    color: "amber",
    metrics: "Log(Market Cap)",
    desc: "The historical tendency for small-cap stocks to outperform large-cap stocks.",
    rationale: "Information Risk: Small caps are less covered by analysts, requiring a premium for the lack of information/liquidity.",
    risk: "Weakening Signal: The size premium has diminished in recent decades and is highly volatile.",
    type: "Aggressive"
  },
  {
    title: "Low Volatility",
    icon: Activity,
    color: "purple",
    metrics: "Std Dev (60D), Beta",
    desc: "Stocks with lower price fluctuations tend to deliver higher risk-adjusted returns.",
    rationale: "Leverage Constraints: Institutional investors can't use leverage, so they bid up high-beta stocks, making them overpriced.",
    risk: "Interest Rate Risk: Low vol stocks (Utilities, Staples) often act like bonds and fall when rates rise.",
    type: "Defensive"
  },
  {
    title: "Quality",
    icon: ShieldCheck,
    color: "rose",
    metrics: "ROE, Gross Profitability",
    desc: "Companies with stable earnings, low debt, and high profitability.",
    rationale: "Flight to Safety: Investors pay a premium for certainty during uncertain times.",
    risk: "Valuation Risk: 'Quality at any price' can lead to underperformance if you overpay for safety (e.g., Nifty Fifty).",
    type: "Defensive"
  },
  {
    title: "Liquidity",
    icon: Waves,
    color: "cyan",
    metrics: "Turnover, Bid-Ask Spread",
    desc: "Illiquid assets must offer higher returns to compensate for the difficulty of selling them.",
    rationale: "Friction Compensation: You get paid for the risk of being unable to exit a position quickly during a crisis.",
    risk: "Liquidity Crises: In a market panic, liquidity dries up completely, causing massive price gaps.",
    type: "Structural"
  },
  {
    title: "Growth",
    icon: Sprout,
    color: "orange",
    metrics: "Sales Growth, EPS Growth",
    desc: "Companies with high expected future growth rates, often with high valuations today.",
    rationale: "Duration: Growth stocks are 'long duration' assets. You are buying future cash flows.",
    risk: "Discount Rates: Highly sensitive to interest rates. If rates rise, the present value of future growth collapses.",
    type: "Aggressive"
  }
];

export default function RiskArchitectureArticle() {
  const [activeModelTab, setActiveModelTab] = useState('barra');
  const currentArticle = articles.find(article => article.slug === 'risk-prism-architecture-modern-factor-models');
  
  return (
    <ArticleFrame slug="risk-prism-architecture-modern-factor-models">
      <InfographicSlot alt="The Architecture of Risk - Factor Model Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12 space-y-24">
        
        {/* 1. Hero Section */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">The Architecture of Risk</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">Deconstructing Modern Factor Models.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <BookOpen className="text-[#A8672E] dark:text-[#D08F52] mb-2" size={20} />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">400+</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Published Factors</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <TrendingUp className="text-[#A8672E] dark:text-[#D08F52] mb-2" size={20} />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">58%</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Return Decay post-pub</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <Target className="text-[#A8672E] dark:text-[#D08F52] mb-2" size={20} />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">0.0</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Target Beta (L/S)</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <Activity className="text-[#A8672E] dark:text-[#D08F52] mb-2" size={20} />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">2.0+</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Sharpe Target</span>
            </div>
          </div>
        </section>

        {/* 2. The Factor Breakdown (The "Big 7") */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">The Big 7: Style Factors</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">Before seeking exotic alpha, models must explain these known sources of systemic risk.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {factorData.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div key={index} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white font-serif">{factor.title}</h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {factor.type}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                      {factor.metrics}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-4 leading-relaxed text-slate-700 dark:text-slate-300">{factor.desc}</p>
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Economic Rationale</h5>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{factor.rationale}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <AlertTriangle size={10} className="text-amber-500" /> Risk
                      </h5>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{factor.risk}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Summary Card */}
            <div className="bg-slate-900 dark:bg-black rounded-2xl shadow-lg border border-slate-800 p-6 flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white font-serif">
                <AlertTriangle className="text-amber-500" />
                Factor Crowding
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                When too much capital chases these standard factors, returns decay and crash risk increases.
              </p>
              <div className="p-3 bg-slate-800 dark:bg-slate-900/50 rounded-lg text-xs font-mono text-slate-400 border border-slate-700">
                Correlations spike during crises, causing "Diversification Failure."
              </div>
            </div>
          </div>
        </section>

        {/* 3. Deep Dive Comparison: Barra vs Axioma */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">The Titan Clash: Models Compared</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">Deep dive into the mathematical engines and strategic differences between the industry giants.</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl inline-flex">
              {['barra', 'axioma', 'northfield'].map((model) => (
                <button
                  key={model}
                  onClick={() => setActiveModelTab(model)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold transition-all capitalize ${
                    activeModelTab === model 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-300'
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 min-h-[400px] mb-12 shadow-sm">
            {activeModelTab === 'barra' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                  <div className="p-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] rounded-xl">
                    <Shield size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">MSCI Barra</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">The "Fundamental" Pure-Play</p>
                  </div>
                  <div className="md:ml-auto">
                    <span className="bg-indigo-100 dark:bg-indigo-900/50 text-[#A8672E] dark:text-[#D08F52] dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Industry Standard</span>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 font-serif">
                        <Grid size={18} className="text-[#A8672E] dark:text-[#D08F52]"/> Cross-Sectional Regression
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                        Barra's core engine relies on <strong className="font-bold text-slate-900 dark:text-white">Cross-Sectional Regression</strong>. Every day, they take the universe of ~50,000 stocks and regress returns against exposed factors (Style + Industry).
                      </p>
                      <FormulaPanel>
                        <div className="font-mono text-center py-2 text-white">R_i = β_i * f + ε_i</div>
                      </FormulaPanel>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 font-serif">
                        <GitMerge size={18} className="text-[#A8672E] dark:text-[#D08F52]"/>Eigenfactor Adjustment
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        Raw covariance matrices have "sampling error." Optimizers exploit this error, betting on factors that appear low-risk just by chance. Barra uses Monte Carlo simulations to artificially inflate the risk of these "noisy" small factors, forcing the optimizer to be honest.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Model Hierarchy</h4>
                      <ul className="space-y-2">
                        <li className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">GEM (Global Equity Model):</span>
                          <span>Multi-country correlations</span>
                        </li>
                        <li className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">USE4 (Long Horizon):</span>
                          <span>Stable, low turnover</span>
                        </li>
                        <li className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">USE4S (Short Horizon):</span>
                          <span>Responsive, high turnover</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50">
                      <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500 mb-1">Key Weakness</h4>
                      <p className="text-xs text-amber-800 dark:text-amber-200/70">
                        Strictly fundamental. If a risk exists that isn't captured by the pre-defined industry or style definitions (e.g., "Meme Stock" factor), Barra pushes it into specific risk (ε), potentially underestimating systemic exposure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModelTab === 'axioma' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                  <div className="p-4 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/30 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] rounded-xl">
                    <Activity size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Axioma (Qontigo)</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">The "Hybrid" Innovator</p>
                  </div>
                  <div className="md:ml-auto">
                    <span className="bg-rose-100 dark:bg-rose-900/50 text-[#BC4128] dark:text-[#E2694A] dark:text-rose-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Quant Favorite</span>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 font-serif">
                        <Database size={18} className="text-[#BC4128] dark:text-[#E2694A]"/> Fundamental + Statistical (Hybrid)
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                        Axioma acknowledges that fundamental factors don't capture everything. They run a <strong className="font-bold text-slate-900 dark:text-white">PCA (Principal Component Analysis)</strong> on the residuals of the fundamental model to find "Statistical Factors."
                      </p>
                      <FormulaPanel>
                        <div className="font-mono text-center py-2 text-white">R = β_fund * f_fund + β_stat * f_stat + ε</div>
                      </FormulaPanel>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mt-3">
                        This captures hidden risks like "AI Hype" or "Geopolitical Fear" before they have a name.
                      </p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 font-serif">
                        <Target size={18} className="text-[#BC4128] dark:text-[#E2694A]"/>Custom Risk Models
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        Axioma's "Risk Model Machine" allows funds to build custom models. Crucially, you can add your proprietary Alpha signal as a risk factor. This ensures the optimizer doesn't "hedge away" your alpha by mistaking it for unwanted idiosyncratic risk.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Math Innovations</h4>
                      <ul className="space-y-2">
                        <li className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">Huber Weighting:</span>
                          <span>Downweights outliers (Robust)</span>
                        </li>
                        <li className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">Asymptotic PCA:</span>
                          <span>Extracts statistical factors</span>
                        </li>
                        <li className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">Dynamic Volatility:</span>
                          <span>Fast reaction to regime changes</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50">
                      <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500 mb-1">Key Weakness</h4>
                      <p className="text-xs text-amber-800 dark:text-amber-200/70">
                        Statistical factors are uninterpretable. You might know you have exposure to "Statistical Factor 4," but you won't know <i>what</i> that factor actually represents economically until later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModelTab === 'northfield' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                  <div className="p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/30 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] rounded-xl">
                    <Globe size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Northfield</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">The "Everything Everywhere" Model</p>
                  </div>
                  <div className="md:ml-auto">
                    <span className="bg-emerald-100 dark:bg-emerald-900/50 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Multi-Asset</span>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 font-serif">
                        <Waves size={18} className="text-[#1D8A70] dark:text-[#3CBF9C]"/> NIS (Everything Everywhere)
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        While Barra/Axioma often separate Equity, Fixed Income, and Alternatives, Northfield's <strong className="font-bold text-slate-900 dark:text-white">NIS (Northfield Information Services)</strong> model attempts to model the entire investment universe in a unified framework.
                      </p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 font-serif">
                        <Brain size={18} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>Hybrid Estimation
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        Northfield uses a unique blend of short-term and long-term memory. They often employ <strong className="font-bold text-slate-900 dark:text-white">Bayesian Shrinkage</strong> to pull extreme volatility estimates back toward a global mean, providing very stable covariance matrices that don't "whipsaw" the portfolio turnover.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">Granular Risk:</span>
                          <span>Detailed Real Estate/PE modeling</span>
                        </li>
                        <li className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">Optimization:</span>
                          <span>Open optimization platform</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50">
                      <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500 mb-1">Key Weakness</h4>
                      <p className="text-xs text-amber-800 dark:text-amber-200/70">
                        Can be complex to implement for pure-play equity shops who don't need the multi-asset overhead. Less dominant in the high-frequency/stat-arb equity space compared to Axioma.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Head-to-Head Comparison</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Feature</th>
                  <th className="p-4 font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] text-sm">MSCI Barra</th>
                  <th className="p-4 font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] text-sm">Axioma</th>
                  <th className="p-4 font-semibold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] text-sm">Northfield</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Primary Technique</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Cross-Sectional Regression</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Hybrid (Fundamental + PCA)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Time-Series / Hybrid</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Outlier Handling</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Winsorization (Clipping)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Huber Weighting (Robust Reg)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Bayesian Shrinkage</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Blind Spots</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Risks not in factor definition</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Uninterpretable Stat Factors</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Complexity / Over-smoothing</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Ideal User</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Asset Managers / Long Only</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Quant Hedge Funds</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Multi-Asset Allocators</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Customization</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Low (Standardized)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">High (Risk Model Machine)</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Academic Corner */}
        <section>
          <div className="bg-slate-900 dark:bg-black p-8 md:p-12 rounded-3xl border border-slate-800">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <span className="bg-amber-900/30 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-amber-800">The Factor Zoo</span>
                <h2 className="mt-4 text-3xl font-serif font-bold text-white mb-6">Academic Research & Citations</h2>
                <p className="mb-6 text-slate-400 leading-relaxed text-sm">
                  The number of discovered factors has exploded, leading to a "replication crisis." Modern research focuses on filtering out false positives.
                </p>
                <div className="space-y-6">
                  <div className="group">
                    <h4 className="text-amber-400 font-bold group-hover:text-amber-300 transition-colors">...and the Cross-Section of Expected Returns</h4>
                    <p className="text-xs text-slate-500 italic mb-2">Harvey, Liu, Zhu (2016)</p>
                    <p className="text-sm text-slate-400">Argued that due to data mining, the threshold for significance should be raised from t-stat 2.0 to 3.0. Most 'discovered' factors are noise.</p>
                  </div>
                  <div className="group">
                    <h4 className="text-amber-400 font-bold group-hover:text-amber-300 transition-colors">Digesting Anomalies: An Investment Approach</h4>
                    <p className="text-xs text-slate-500 italic mb-2">Hou, Xue, Zhang (2015)</p>
                    <p className="text-sm text-slate-400">Proposed the q-factor model (Investment & Profitability) which explains returns better than Fama-French's original 3 factors.</p>
                  </div>
                  <div className="group">
                    <h4 className="text-amber-400 font-bold group-hover:text-amber-300 transition-colors">Betting Against Beta</h4>
                    <p className="text-xs text-slate-500 italic mb-2">Frazzini & Pedersen (2014)</p>
                    <p className="text-sm text-slate-400">Showed that constrained investors bid up high-beta stocks, causing them to have lower alphas. Low beta stocks are underpriced.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-serif">
                  <Brain className="text-amber-500" />
                  The New Frontier: Machine Learning
                </h3>
                <p className="mb-6 text-sm text-slate-400">
                  Linear regression is dying. The new wave of research uses Non-linear models to find interaction effects.
                </p>
                <div className="space-y-4">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-semibold text-amber-500 text-sm">Decision Trees / Gradient Boosting</h4>
                    <p className="text-xs mt-1 text-slate-400">
                      Factors are conditional. E.g., "Momentum only works when Volatility is low." Trees capture these if/then relationships.
                    </p>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-semibold text-amber-500 text-sm">NLP & Alternative Data</h4>
                    <p className="text-xs mt-1 text-slate-400">
                      <strong className="text-slate-300">Trend:</strong> Using satellite data to count cars in retail parking lots (Revenue forecasting).<br/>
                      <strong className="text-slate-300">Momentum:</strong> Using Glassdoor reviews to predict "Employee Sentiment" momentum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Hedge Fund Mechanics */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">Inside the Black Box</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">How Quant Funds transform raw data into Alpha using the Optimization Workflow.</p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center font-serif">The Strategy Spectrum</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-slate-900 dark:text-white">
                  <Target size={80}/>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">Equity Market Neutral</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">The "Pure Alpha" Approach.</p>
                <div className="space-y-2 text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between"><span>Beta:</span> <span>0.0</span></div>
                  <div className="flex justify-between"><span>Dollar:</span> <span>Net Zero</span></div>
                  <div className="flex justify-between"><span>Source:</span> <span>Stock Picking</span></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/50 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-indigo-900 dark:text-[#A8672E] dark:text-[#D08F52]">
                  <PieChart size={80}/>
                </div>
                <span className="bg-indigo-100 dark:bg-indigo-900/50 text-[#A8672E] dark:text-[#D08F52] dark:text-indigo-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Most Common</span>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mt-2 mb-2">130/30 (Relaxed)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Enhanced Indexing.</p>
                <div className="space-y-2 text-xs font-mono bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 p-3 rounded-lg text-indigo-900 dark:text-indigo-300">
                  <div className="flex justify-between"><span>Long:</span> <span>130%</span></div>
                  <div className="flex justify-between"><span>Short:</span> <span>30%</span></div>
                  <div className="flex justify-between"><span>Beta:</span> <span>1.0</span></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-slate-900 dark:text-white">
                  <Sliders size={80}/>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">Statistical Arbitrage</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">High Frequency Mean Reversion.</p>
                <div className="space-y-2 text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between"><span>Horizon:</span> <span>Intraday - 3 Days</span></div>
                  <div className="flex justify-between"><span>Trades:</span> <span>1000s / day</span></div>
                  <div className="flex justify-between"><span>Risk:</span> <span>Tight Limits</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex-1 w-full bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 relative">
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block bg-white dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 text-slate-400">
                  <ArrowRight size={16}/>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] rounded-lg">
                    <Filter size={20}/>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">1. Alpha Model</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Scores every stock in the universe based on factors.</p>
                <div className="text-[10px] font-mono bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  AAPL: +2.4 (Buy)<br/>
                  XOM:  -1.2 (Short)<br/>
                  TSLA: +0.1 (Flat)
                </div>
              </div>
              <div className="flex-1 w-full bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 relative">
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block bg-white dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 text-slate-400">
                  <ArrowRight size={16}/>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/30 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] rounded-lg">
                    <Shield size={20}/>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">2. Risk Model</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Calculates the Covariance Matrix (Σ).</p>
                <div className="text-[10px] font-mono bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  Identify: AAPL is highly correlated with MSFT (Tech Factor).
                </div>
              </div>
              <div className="flex-1 w-full bg-[#14171B] dark:bg-[#05070A] text-white p-6 rounded-2xl shadow-lg border border-[#A8672E]/20 relative scale-105 z-10">
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block bg-white dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 text-slate-400">
                  <ArrowRight size={16}/>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#1D8A70] dark:bg-[#3CBF9C]/20 text-[#1D8A70] dark:text-[#3CBF9C] rounded-lg">
                    <Cpu size={20}/>
                  </div>
                  <h4 className="font-bold text-white">3. Optimizer</h4>
                </div>
                <p className="text-xs text-slate-300 mb-3">Solves the Mean-Variance equation.</p>
                <div className="text-[10px] font-mono bg-black/50 p-2 rounded border border-white/10 text-white">
                  Max w<sup>T</sup>α - λw<sup>T</sup>Σw<br/>
                  Subject to β = 0
                </div>
              </div>
              <div className="flex-1 w-full bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/30 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] rounded-lg">
                    <DollarSign size={20}/>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">4. Portfolio</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">The final list of trades to execute.</p>
                <div className="text-[10px] font-mono bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  Buy $10M AAPL<br/>
                  Short $8M MSFT<br/>
                  Hedge Sector Risk
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sliders size={18} className="text-slate-500 dark:text-slate-400"/>The Constraints Matrix
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  The optimizer is a constraint engine. If you don't constrain a risk, you are betting on it.
                </p>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Market Beta Constraint</span>
                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs text-slate-700 dark:text-slate-300">β<sub>port</sub> = 0</code>
                  </li>
                  <li className="flex justify-between items-center text-sm p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Sector Constraint</span>
                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs text-slate-700 dark:text-slate-300">Σw<sub>tech</sub> = 0</code>
                  </li>
                  <li className="flex justify-between items-center text-sm p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Gross Leverage</span>
                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs text-slate-700 dark:text-slate-300">Σ|w<sub>i</sub>| ≤ 200%</code>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>Success Metric: Information Ratio (IR)
                </h4>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-center mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-serif italic font-bold text-slate-900 dark:text-white">IR = IC × √Breadth</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">The Fundamental Law of Active Management</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-1">IC (Skill):</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-xs">Correlation between your forecast and reality. A "Good" IC is only 0.05!</p>
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-1">Breadth (Bets):</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-xs">Number of independent bets. Quants win by making thousands of tiny bets.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </ArticleFrame>
  );
}