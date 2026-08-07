'use client';

import React, { useState } from 'react';
import { Shield, TrendingUp, Activity, Globe, Brain, Newspaper, Scale, Target, Zap, Search, Box, Layers, BarChart2, Lock, Unlock, Users, Cpu, BookOpen, Anchor, DollarSign, Percent, Briefcase, Sprout, Waves, ShieldCheck, Minimize2, Tag, AlertTriangle, GitMerge, Database, Grid, CheckCircle, XCircle, Filter, Sliders, ArrowRight, PieChart, Music, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { articles } from '@/data/articles';
// --- UI Components ---
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    emerald: "bg-emerald-100 text-emerald-700",
    rose: "bg-rose-100 text-rose-700",
    amber: "bg-amber-100 text-amber-700",
    indigo: "bg-indigo-100 text-indigo-700",
    slate: "bg-slate-100 text-slate-700",
    cyan: "bg-cyan-100 text-cyan-700",
    orange: "bg-orange-100 text-orange-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, icon: Icon, color = "text-slate-800" }: { 
  title: string; 
  subtitle: string; 
  icon: React.ComponentType<any>; 
  color?: string 
}) => (
  <div className="mb-12 text-center">
    <div className="flex justify-center mb-4">
      <div className={`p-3 rounded-2xl bg-white shadow-md`}>
        <Icon size={32} className={color} />
      </div>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
    <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

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
        <header className="relative overflow-hidden bg-white pb-20 pt-24 border-b border-slate-200 rounded-3xl mb-20">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-rose-500"></div>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Badge color="indigo">Deep Dive Research</Badge>
              
              {/* Quick Stats Grid */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <StatBox number="400+" label="Published Factors" icon={BookOpen} />
                <StatBox number="58%" label="Return Decay post-pub" icon={TrendingUp} />
                <StatBox number="0.0" label="Target Beta (L/S)" icon={Target} />
                <StatBox number="2.0+" label="Sharpe Target" icon={Activity} />
              </div>
            </div>
          </header>

          {/* 2. The Factor Breakdown (The "Big 7") */}
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <SectionTitle 
              title="The Big 7: Style Factors" 
              subtitle="Before seeking exotic alpha, models must explain these known sources of systemic risk."
              icon={Layers}
              color="text-indigo-600"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {factorData.map((factor, index) => (
                <FactorCard key={index} {...factor} />
              ))}
              {/* Summary Card */}
              <div className="bg-slate-900 text-white rounded-2xl shadow-lg p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" />
                  Factor Crowding
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  When too much capital chases these standard factors, returns decay and crash risk increases.
                </p>
                <div className="p-3 bg-slate-800 rounded-lg text-xs font-mono text-slate-400">
                  Correlations spike during crises, causing "Diversification Failure."
                </div>
              </div>
            </div>
          </section>

          {/* 3. Deep Dive Comparison: Barra vs Axioma */}
          <section className="py-20 px-6 bg-white border-y border-slate-200 rounded-3xl mb-20">
            <div className="max-w-7xl mx-auto">
              <SectionTitle 
                title="The Titan Clash: Models Compared" 
                subtitle="Deep dive into the mathematical engines and strategic differences between the industry giants."
                icon={Shield}
                color="text-blue-600"
              />
              
              {/* Interactive Tabs */}
              <div className="flex justify-center mb-8">
                <div className="bg-slate-100 p-1 rounded-xl inline-flex">
                  {['barra', 'axioma', 'northfield'].map((model) => (
                    <button
                      key={model}
                      onClick={() => setActiveModelTab(model)}
                      className={`px-6 py-3 rounded-lg text-sm font-bold transition-all capitalize ${
                        activeModelTab === model 
                          ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 min-h-[400px] mb-12">
                {activeModelTab === 'barra' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 border-b border-slate-200 pb-6">
                      <div className="p-4 bg-blue-100 text-blue-700 rounded-xl">
                        <Shield size={48} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900">MSCI Barra</h3>
                        <p className="text-slate-600 font-medium">The "Fundamental" Pure-Play</p>
                      </div>
                      <div className="md:ml-auto">
                        <Badge color="blue">Industry Standard</Badge>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                            <Grid size={18} className="text-blue-500"/> Cross-Sectional Regression
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            Barra's core engine relies on <strong className="text-slate-800">Cross-Sectional Regression</strong>. Every day, they take the universe of ~50,000 stocks and regress returns against exposed factors (Style + Industry).<br/><br/>
                            <code className="bg-blue-50 px-2 py-1 rounded text-blue-800 text-xs">R_i = β_i * f + ε_i</code>
                          </p>
                        </div>
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                            <GitMerge size={18} className="text-blue-500"/>Eigenfactor Adjustment
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            Raw covariance matrices have "sampling error." Optimizers exploit this error, betting on factors that appear low-risk just by chance. Barra uses Monte Carlo simulations to artificially inflate the risk of these "noisy" small factors, forcing the optimizer to be honest.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                          <h4 className="text-sm font-bold text-slate-800 mb-3">Model Hierarchy</h4>
                          <ul className="space-y-2">
                            <li className="text-xs text-slate-600 flex justify-between">
                              <span><strong>GEM (Global Equity Model):</strong></span>
                              <span>Multi-country correlations</span>
                            </li>
                            <li className="text-xs text-slate-600 flex justify-between">
                              <span><strong>USE4 (Long Horizon):</strong></span>
                              <span>Stable, low turnover</span>
                            </li>
                            <li className="text-xs text-slate-600 flex justify-between">
                              <span><strong>USE4S (Short Horizon):</strong></span>
                              <span>Responsive, high turnover</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                          <h4 className="text-sm font-bold text-blue-900 mb-1">Key Weakness</h4>
                          <p className="text-xs text-blue-800">
                            Strictly fundamental. If a risk exists that isn't captured by the pre-defined industry or style definitions (e.g., "Meme Stock" factor), Barra pushes it into specific risk (ε), potentially underestimating systemic exposure.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeModelTab === 'axioma' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 border-b border-slate-200 pb-6">
                      <div className="p-4 bg-rose-100 text-rose-700 rounded-xl">
                        <Activity size={48} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900">Axioma (Qontigo)</h3>
                        <p className="text-slate-600 font-medium">The "Hybrid" Innovator</p>
                      </div>
                      <div className="md:ml-auto">
                        <Badge color="rose">Quant Favorite</Badge>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                            <Database size={18} className="text-rose-500"/> Fundamental + Statistical (Hybrid)
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            Axioma acknowledges that fundamental factors don't capture everything. They run a <strong className="text-slate-800">PCA (Principal Component Analysis)</strong> on the residuals of the fundamental model to find "Statistical Factors."<br/><br/>
                            <code className="bg-rose-50 px-2 py-1 rounded text-rose-800 text-xs">R = β_fund * f_fund + β_stat * f_stat + ε</code><br/>
                            This captures hidden risks like "AI Hype" or "Geopolitical Fear" before they have a name.
                          </p>
                        </div>
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                            <Target size={18} className="text-rose-500"/>Custom Risk Models
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            Axioma's "Risk Model Machine" allows funds to build custom models. Crucially, you can add your proprietary Alpha signal as a risk factor. This ensures the optimizer doesn't "hedge away" your alpha by mistaking it for unwanted idiosyncratic risk.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                          <h4 className="text-sm font-bold text-slate-800 mb-3">Math Innovations</h4>
                          <ul className="space-y-2">
                            <li className="text-xs text-slate-600 flex justify-between">
                              <span><strong>Huber Weighting:</strong></span>
                              <span>Downweights outliers (Robust)</span>
                            </li>
                            <li className="text-xs text-slate-600 flex justify-between">
                              <span><strong>Asymptotic PCA:</strong></span>
                              <span>Extracts statistical factors</span>
                            </li>
                            <li className="text-xs text-slate-600 flex justify-between">
                              <span><strong>Dynamic Volatility:</strong></span>
                              <span>Fast reaction to regime changes</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                          <h4 className="text-sm font-bold text-rose-900 mb-1">Key Weakness</h4>
                          <p className="text-xs text-rose-800">
                            Statistical factors are uninterpretable. You might know you have exposure to "Statistical Factor 4," but you won't know <i>what</i> that factor actually represents economically until later.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeModelTab === 'northfield' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 border-b border-slate-200 pb-6">
                      <div className="p-4 bg-emerald-100 text-emerald-700 rounded-xl">
                        <Globe size={48} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900">Northfield</h3>
                        <p className="text-slate-600 font-medium">The "Everything Everywhere" Model</p>
                      </div>
                      <div className="md:ml-auto">
                        <Badge color="emerald">Multi-Asset</Badge>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                            <Waves size={18} className="text-emerald-500"/> NIS (Everything Everywhere)
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            While Barra/Axioma often separate Equity, Fixed Income, and Alternatives, Northfield's <strong className="text-slate-800">NIS (Northfield Information Services)</strong> model attempts to model the entire investment universe in a unified framework.
                          </p>
                        </div>
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                            <Brain size={18} className="text-emerald-500"/>Hybrid Estimation
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            Northfield uses a unique blend of short-term and long-term memory. They often employ <strong className="text-slate-800">Bayesian Shrinkage</strong> to pull extreme volatility estimates back toward a global mean, providing very stable covariance matrices that don't "whipsaw" the portfolio turnover.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                          <h4 className="text-sm font-bold text-slate-800 mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            <li className="text-xs text-slate-600 flex justify-between">
                              <span><strong>Granular Risk:</strong></span>
                              <span>Detailed Real Estate/PE modeling</span>
                            </li>
                            <li className="text-xs text-slate-600 flex justify-between">
                              <span><strong>Optimization:</strong></span>
                              <span>Open optimization platform</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                          <h4 className="text-sm font-bold text-emerald-900 mb-1">Key Weakness</h4>
                          <p className="text-xs text-emerald-800">
                            Can be complex to implement for pure-play equity shops who don't need the multi-asset overhead. Less dominant in the high-frequency/stat-arb equity space compared to Axioma.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* New Comparison Table */}
              <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">Head-to-Head Comparison</h3>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="p-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Feature</th>
                      <th className="p-4 font-semibold text-blue-700 text-sm">MSCI Barra</th>
                      <th className="p-4 font-semibold text-rose-700 text-sm">Axioma</th>
                      <th className="p-4 font-semibold text-emerald-700 text-sm">Northfield</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Primary Technique</td>
                      <td className="p-4 text-slate-600">Cross-Sectional Regression</td>
                      <td className="p-4 text-slate-600">Hybrid (Fundamental + PCA)</td>
                      <td className="p-4 text-slate-600">Time-Series / Hybrid</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Outlier Handling</td>
                      <td className="p-4 text-slate-600">Winsorization (Clipping)</td>
                      <td className="p-4 text-slate-600">Huber Weighting (Robust Reg)</td>
                      <td className="p-4 text-slate-600">Bayesian Shrinkage</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Blind Spots</td>
                      <td className="p-4 text-slate-600">Risks not in factor definition</td>
                      <td className="p-4 text-slate-600">Uninterpretable Stat Factors</td>
                      <td className="p-4 text-slate-600">Complexity / Over-smoothing</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Ideal User</td>
                      <td className="p-4 text-slate-600">Asset Managers / Long Only</td>
                      <td className="p-4 text-slate-600">Quant Hedge Funds</td>
                      <td className="p-4 text-slate-600">Multi-Asset Allocators</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900">Customization</td>
                      <td className="p-4 text-slate-600">Low (Standardized)</td>
                      <td className="p-4 text-slate-600">High (Risk Model Machine)</td>
                      <td className="p-4 text-slate-600">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4. Academic Corner */}
          <section className="py-20 px-6 bg-slate-900 text-slate-300 rounded-3xl mb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <Badge color="amber">The Factor Zoo</Badge>
                  <h2 className="mt-4 text-3xl font-bold text-white mb-6">Academic Research & Citations</h2>
                  <p className="mb-6 leading-relaxed">
                    The number of discovered factors has exploded, leading to a "replication crisis." Modern research focuses on filtering out false positives.
                  </p>
                  <div className="space-y-6">
                    <Citation 
                      title="...and the Cross-Section of Expected Returns" 
                      authors="Harvey, Liu, Zhu (2016)"
                      desc="Argued that due to data mining, the threshold for significance should be raised from t-stat 2.0 to 3.0. Most 'discovered' factors are noise."
                    />
                    <Citation 
                      title="Digesting Anomalies: An Investment Approach" 
                      authors="Hou, Xue, Zhang (2015)"
                      desc="Proposed the q-factor model (Investment & Profitability) which explains returns better than Fama-French's original 3 factors."
                    />
                    <Citation 
                      title="Betting Against Beta" 
                      authors="Frazzini & Pedersen (2014)"
                      desc="Showed that constrained investors bid up high-beta stocks, causing them to have lower alphas. Low beta stocks are underpriced."
                    />
                  </div>
                </div>
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Brain className="text-amber-500" />
                    The New Frontier: Machine Learning
                  </h3>
                  <p className="mb-6 text-sm">
                    Linear regression is dying. The new wave of research uses Non-linear models to find interaction effects.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <h4 className="font-semibold text-amber-500 text-sm">Decision Trees / Gradient Boosting</h4>
                      <p className="text-xs mt-1">
                        Factors are conditional. E.g., "Momentum only works when Volatility is low." Trees capture these if/then relationships.
                      </p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <h4 className="font-semibold text-amber-500 text-sm">NLP & Alternative Data</h4>
                      <p className="text-xs mt-1">
                        <strong>Trend:</strong> Using satellite data to count cars in retail parking lots (Revenue forecasting).<br/>
                        <strong>Momentum:</strong> Using Glassdoor reviews to predict "Employee Sentiment" momentum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Hedge Fund Mechanics (EXPANDED) */}
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <SectionTitle 
              title="Inside the Black Box" 
              subtitle="How Quant Funds transform raw data into Alpha using the Optimization Workflow."
              icon={Cpu}
              color="text-purple-600"
            />
            
            {/* 1. The Strategy Spectrum */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">The Strategy Spectrum</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Target size={80}/>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2">Equity Market Neutral</h4>
                  <p className="text-sm text-slate-600 mb-4">The "Pure Alpha" Approach.</p>
                  <div className="space-y-2 text-xs font-mono bg-slate-50 p-3 rounded-lg text-slate-700">
                    <div className="flex justify-between"><span>Beta:</span> <span>0.0</span></div>
                    <div className="flex justify-between"><span>Dollar:</span> <span>Net Zero</span></div>
                    <div className="flex justify-between"><span>Source:</span> <span>Stock Picking</span></div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <PieChart size={80}/>
                  </div>
                  <Badge color="purple">Most Common</Badge>
                  <h4 className="font-bold text-slate-800 text-lg mt-2 mb-2">130/30 (Relaxed)</h4>
                  <p className="text-sm text-slate-600 mb-4">Enhanced Indexing.</p>
                  <div className="space-y-2 text-xs font-mono bg-purple-50 p-3 rounded-lg text-purple-900">
                    <div className="flex justify-between"><span>Long:</span> <span>130%</span></div>
                    <div className="flex justify-between"><span>Short:</span> <span>30%</span></div>
                    <div className="flex justify-between"><span>Beta:</span> <span>1.0</span></div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sliders size={80}/>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2">Statistical Arbitrage</h4>
                  <p className="text-sm text-slate-600 mb-4">High Frequency Mean Reversion.</p>
                  <div className="space-y-2 text-xs font-mono bg-slate-50 p-3 rounded-lg text-slate-700">
                    <div className="flex justify-between"><span>Horizon:</span> <span>Intraday - 3 Days</span></div>
                    <div className="flex justify-between"><span>Trades:</span> <span>1000s / day</span></div>
                    <div className="flex justify-between"><span>Risk:</span> <span>Tight Limits</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. The Quant Workflow Visualization */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
                <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block bg-white rounded-full p-1 border border-slate-200">
                    <ArrowRight size={16} className="text-slate-400"/>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Filter size={20}/>
                    </div>
                    <h4 className="font-bold text-slate-900">1. Alpha Model</h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Scores every stock in the universe based on factors.</p>
                  <div className="text-[10px] font-mono bg-slate-50 p-2 rounded border border-slate-100">
                    AAPL: +2.4 (Buy)<br/>
                    XOM:  -1.2 (Short)<br/>
                    TSLA: +0.1 (Flat)
                  </div>
                </div>
                <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block bg-white rounded-full p-1 border border-slate-200">
                    <ArrowRight size={16} className="text-slate-400"/>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                      <Shield size={20}/>
                    </div>
                    <h4 className="font-bold text-slate-900">2. Risk Model</h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Calculates the Covariance Matrix (Σ).</p>
                  <div className="text-[10px] font-mono bg-slate-50 p-2 rounded border border-slate-100">
                    Identify: AAPL is highly correlated with MSFT (Tech Factor).
                  </div>
                </div>
                <div className="flex-1 w-full bg-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700 relative scale-105 z-10">
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block bg-white rounded-full p-1 border border-slate-200">
                    <ArrowRight size={16} className="text-slate-400"/>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500 text-white rounded-lg">
                      <Cpu size={20}/>
                    </div>
                    <h4 className="font-bold">3. Optimizer</h4>
                  </div>
                  <p className="text-xs text-slate-300 mb-3">Solves the Mean-Variance equation.</p>
                  <div className="text-[10px] font-mono bg-slate-900 p-2 rounded border border-slate-600">
                    Max w<sup>T</sup>α - λw<sup>T</sup>Σw<br/>
                    Subject to β = 0
                  </div>
                </div>
                <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <DollarSign size={20}/>
                    </div>
                    <h4 className="font-bold text-slate-900">4. Portfolio</h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">The final list of trades to execute.</p>
                  <div className="text-[10px] font-mono bg-slate-50 p-2 rounded border border-slate-100">
                    Buy $10M AAPL<br/>
                    Short $8M MSFT<br/>
                    Hedge Sector Risk
                  </div>
                </div>
              </div>

              {/* 3. The Math Deep Dive */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Sliders size={18} className="text-slate-400"/>The Constraints Matrix
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    The optimizer is a constraint engine. If you don't constrain a risk, you are betting on it.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">Market Beta Constraint</span>
                      <code className="bg-slate-100 px-2 py-1 rounded text-xs">β<sub>port</sub> = 0</code>
                    </li>
                    <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">Sector Constraint</span>
                      <code className="bg-slate-100 px-2 py-1 rounded text-xs">Σw<sub>tech</sub> = 0</code>
                    </li>
                    <li className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">Gross Leverage</span>
                      <code className="bg-slate-100 px-2 py-1 rounded text-xs">Σ|w<sub>i</sub>| ≤ 200%</code>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-500"/>Success Metric: Information Ratio (IR)
                  </h4>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center mb-4">
                      <span className="text-2xl font-serif italic font-bold text-slate-800">IR = IC × √Breadth</span>
                      <p className="text-xs text-slate-500 mt-2">The Fundamental Law of Active Management</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <strong className="block text-slate-900 mb-1">IC (Skill):</strong>
                        <p className="text-slate-600">Correlation between your forecast and reality. A "Good" IC is only 0.05!</p>
                      </div>
                      <div>
                        <strong className="block text-slate-900 mb-1">Breadth (Bets):</strong>
                        <p className="text-slate-600">Number of independent bets. Quants win by making thousands of tiny bets.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Continue Learning Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>
      </main>
    </ArticleFrame>
  );
}

// --- Subcomponents ---
function StatBox({ number, label, icon: Icon }: { number: string; label: string; icon: React.ComponentType<any> }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center hover:bg-white hover:shadow-md transition-all">
      <Icon className="text-indigo-500 mb-2" size={20} />
      <span className="text-2xl font-bold text-slate-900">{number}</span>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
    </div>
  );
}

function FactorCard({ title, metrics, desc, rationale, risk, type, color, icon: Icon }: {
  title: string;
  metrics: string;
  desc: string;
  rationale: string;
  risk: string;
  type: string;
  color: string;
  icon: React.ComponentType<any>;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-100 hover:border-blue-300",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300",
    amber: "bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300",
    purple: "bg-purple-50 text-purple-700 border-purple-100 hover:border-purple-300",
    rose: "bg-rose-50 text-rose-700 border-rose-100 hover:border-rose-300",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100 hover:border-cyan-300",
    orange: "bg-orange-50 text-orange-700 border-orange-100 hover:border-orange-300",
  };

  const typeColors: Record<string, string> = {
    "Aggressive": "bg-orange-100 text-orange-700",
    "Defensive": "bg-green-100 text-green-700",
    "Pro-Cyclical": "bg-blue-100 text-blue-700",
    "Structural": "bg-slate-200 text-slate-700"
  };

  return (
    <div className={`p-6 rounded-2xl border ${colors[color]} hover:shadow-lg transition-all relative overflow-hidden group`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
            <Icon size={20} />
          </div>
          <h3 className="font-bold text-lg text-slate-900">{title}</h3>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[type] || 'bg-slate-100'}`}>
          {type}
        </span>
      </div>
      <div className="mb-4">
        <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded border border-black/5 text-slate-600">
          {metrics}
        </span>
      </div>
      <p className="text-sm font-medium mb-4 leading-relaxed opacity-90">{desc}</p>
      <div className="space-y-3 pt-4 border-t border-black/5">
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Economic Rationale</h5>
          <p className="text-xs leading-relaxed opacity-90">{rationale}</p>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wide opacity-70 mb-1 flex items-center gap-1">
            <AlertTriangle size={10} /> Risk
          </h5>
          <p className="text-xs leading-relaxed opacity-90">{risk}</p>
        </div>
      </div>
    </div>
  );
}

function Citation({ title, authors, desc }: { title: string; authors: string; desc: string }) {
  return (
    <div className="group">
      <h4 className="text-amber-400 font-bold group-hover:text-amber-300 transition-colors cursor-pointer">
        {title}
      </h4>
      <p className="text-xs text-slate-400 mb-1 font-mono">{authors}</p>
      <p className="text-sm text-slate-300 border-l-2 border-slate-700 pl-3 group-hover:border-amber-500 transition-colors">
        {desc}
      </p>
    </div>
  );
}