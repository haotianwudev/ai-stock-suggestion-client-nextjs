'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, Shield, Activity, Database, Layers, GitMerge, Clock, CheckCircle, AlertTriangle, Cpu, Globe, BarChart2, Lock, Zap, Filter, Maximize2, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Components ---
const SectionHeader = ({ icon: Icon, title, subtitle, colorClass }: { icon: React.ElementType; title: string; subtitle: string; colorClass: string }) => (
  <div className="mb-8 flex items-start gap-5">
    <div className={`p-4 rounded-2xl ${colorClass} text-white shadow-lg shrink-0 transition-transform hover:scale-110`}>
      <Icon size={32} />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
      <p className="text-slate-500 mt-2 text-lg leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

const MathBlock = ({ label, formula, description }: { label: string; formula: React.ReactNode; description: React.ReactNode }) => (
  <div className="my-8 group">
    <div className="relative bg-white border border-slate-200 rounded-xl p-8 shadow-sm transition-all hover:shadow-md hover:border-indigo-200">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 rounded-l-xl"></div>
      <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-3 block opacity-80">{label}</span>
      <div className="font-mono text-xl md:text-2xl text-slate-800 mb-5 overflow-x-auto py-2">{formula}</div>
      <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{description}</p>
    </div>
  </div>
);

const InfoCard = ({ title, children, color = "blue", icon: Icon }: { title: string; children: React.ReactNode; color?: string; icon?: React.ElementType }) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50/50 border-blue-100 text-blue-900 hover:border-blue-300",
    purple: "bg-purple-50/50 border-purple-100 text-purple-900 hover:border-purple-300",
    emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-900 hover:border-emerald-300",
    rose: "bg-rose-50/50 border-rose-100 text-rose-900 hover:border-rose-300",
    amber: "bg-amber-50/50 border-amber-100 text-amber-900 hover:border-amber-300",
    indigo: "bg-indigo-50/50 border-indigo-100 text-indigo-900 hover:border-indigo-300",
  };
  return (
    <div className={`p-6 rounded-xl border ${colorMap[color]} h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
        {Icon && <Icon size={18} className="opacity-70"/>}
        {title}
      </h3>
      <div className="text-sm opacity-90 leading-relaxed space-y-2">{children}</div>
    </div>
  );
};

const DeepDive = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5">
      <BookOpen size={100} />
    </div>
    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 relative z-10">
      <Activity size={18} className="text-indigo-600"/>
      Deep Dive: {title}
    </h4>
    <div className="text-sm text-slate-600 relative z-10 leading-relaxed space-y-3">{children}</div>
  </div>
);

const ComparisonTable = () => (
  <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm my-8">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-slate-100 text-slate-700">
            <th className="p-4 font-bold border-b border-slate-200 w-1/4">Feature</th>
            <th className="p-4 font-bold border-b border-slate-200 text-rose-600 w-1/3">Risk Modeling (Factors)</th>
            <th className="p-4 font-bold border-b border-slate-200 text-emerald-600 w-1/3">Alpha Prediction (ML)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          <tr>
            <td className="p-4 font-medium text-slate-600">Objective</td>
            <td className="p-4 text-slate-500">Explain variance (R² ≈ 90%)</td>
            <td className="p-4 text-slate-800 font-medium bg-emerald-50/30">Forecast returns (IC ≈ 0.05)</td>
          </tr>
          <tr>
            <td className="p-4 font-medium text-slate-600">Horizon</td>
            <td className="p-4 text-slate-500">Long-term (Quarterly/Yearly structural risks)</td>
            <td className="p-4 text-slate-800 font-medium bg-emerald-50/30">Short-term (Minutes to Days)</td>
          </tr>
          <tr>
            <td className="p-4 font-medium text-slate-600">Metric</td>
            <td className="p-4 text-slate-500">Volatility Reduction, Beta</td>
            <td className="p-4 text-slate-800 font-medium bg-emerald-50/30">Sharpe Ratio, Information Coefficient</td>
          </tr>
          <tr>
            <td className="p-4 font-medium text-slate-600">Data Features</td>
            <td className="p-4 text-slate-500">Stationary, High Signal-to-Noise</td>
            <td className="p-4 text-slate-800 font-medium bg-emerald-50/30">Non-stationary, Very Low Signal-to-Noise</td>
          </tr>
          <tr>
            <td className="p-4 font-medium text-slate-600">Loss Function</td>
            <td className="p-4 text-slate-500">Minimize Tracking Error</td>
            <td className="p-4 text-slate-800 font-medium bg-emerald-50/30">Maximize Risk-Adjusted Return</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Application ---
export default function FactorModelsMLArticle() {
  const currentArticle = articles.find(article => article.slug === 'factor-models-machine-learning-risk-alpha-prediction');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title || ''} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-8 left-8 z-20">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-purple-600 text-white shadow-lg">
            Deep Research
          </span>
        </div>

        {/* Hero Section */}
        <header className="bg-white border-b border-slate-200 pt-24 pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4"></div>
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-8 border border-slate-200">
              <BookOpen size={14} />
              Advanced Quant Series
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 mb-8 leading-tight tracking-tight">
              Factor Models in <br/> Machine Learning
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light">
              Deconstructing the mathematical bridge between <span className="text-rose-600 font-medium">Risk Management</span> and <span className="text-emerald-600 font-medium">Alpha Prediction</span> in algorithmic trading systems.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/2IxVlfz.jpeg" 
              alt="Factor Models in Machine Learning Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsImageViewerOpen(true);
              }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              title="View full screen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        <FullScreenImageViewer
          src="https://i.imgur.com/2IxVlfz.jpeg"
          alt="Factor Models in Machine Learning Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content Container */}
        <main className="max-w-5xl mx-auto px-6 py-16 space-y-32">
          {/* Section 1: The Conceptual Divide */}
          <section id="section-1" className="relative">
            <SectionHeader 
              icon={GitMerge} 
              title="The Core Dichotomy: Risk vs. Alpha" 
              subtitle="Understanding why predictability is merely the residual of risk."
              colorClass="bg-indigo-600"
            />
            
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 mb-10">
              <p>
                In quantitative finance, the <strong>Fundamental Law of Active Management</strong> suggests that performance is a function of breadth (number of bets) and skill (Information Coefficient). However, before we can claim "skill" (Alpha), we must strip away returns attributable to "luck" or passive exposure to risk factors (Beta).
              </p>
              <p className="mt-4">
                The distinction between systematic risk and idiosyncratic returns forms the philosophical foundation of modern portfolio theory. Factor models serve as the mathematical apparatus for this decomposition, enabling us to separate market-driven returns from genuine alpha generation.
              </p>
            </div>

            <MathBlock 
              label="Linear Factor Model (APT Framework)"
              formula={
                <span>
                  R<sub>i,t</sub> = α<sub>i</sub> + Σ β<sub>i,k</sub> F<sub>k,t</sub> + ε<sub>i,t</sub>
                </span>
              }
              description={
                <span>
                  <strong>R:</strong> Asset Return. <strong>F:</strong> Common Risk Factors (Market, Value, Size). <strong>β:</strong> Factor Loadings (Sensitivity). <strong>ε:</strong> Idiosyncratic noise. <br/><br/>
                  <span className="text-indigo-600 font-semibold">Goal:</span> Traditional finance minimizes ε (Risk Model). Algorithmic trading attempts to <em>predict</em> ε (Alpha Model).
                </span>
              }
            />

            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <InfoCard title="Systematic Risk (Beta)" color="rose" icon={Shield}>
                <p className="mb-2">Variance shared across the market. You are paid a premium for bearing this risk because it cannot be diversified.</p>
                <ul className="list-disc pl-4 space-y-1 text-sm text-rose-800">
                  <li><strong>Macro:</strong> Inflation, GDP, VIX.</li>
                  <li><strong>Style:</strong> Value (HML), Size (SMB), Momentum (WML).</li>
                  <li><strong>Sector:</strong> Tech, Energy, Financials exposure.</li>
                </ul>
              </InfoCard>

              <InfoCard title="Idiosyncratic Alpha" color="emerald" icon={TrendingUp}>
                <p className="mb-2">Residual returns specific to the asset. This is the "Gold" of algo trading.</p>
                <ul className="list-disc pl-4 space-y-1 text-sm text-emerald-800">
                  <li><strong>Mispricing:</strong> Temporary arbitrage opportunities.</li>
                  <li><strong>Alternative Data:</strong> Satellite imagery, credit card flows.</li>
                  <li><strong>Micro-structure:</strong> Order book imbalances.</li>
                </ul>
              </InfoCard>
            </div>

            <DeepDive title="The Universe Split Test">
              <p>
                How do you prove your "Alpha" isn't just hidden "Risk"?<br/>
                1. <strong>Split Universe:</strong> Divide stocks into two random, non-overlapping groups (Universe A and B).<br/>
                2. <strong>Build Portfolios:</strong> Construct Long/Short portfolios on both based on your signal.<br/>
                3. <strong>Correlate:</strong> If Portfolio A returns are highly correlated with Portfolio B, you have found a <strong>Risk Factor</strong> (systematic). If they are uncorrelated but positive, you have found <strong>Alpha</strong> (idiosyncratic).
              </p>
              <p className="mt-3 text-indigo-700 font-medium">
                This test is the gold standard for distinguishing genuine predictive signals from disguised factor exposures. Many "alpha" strategies fail this test, revealing themselves as repackaged beta.
              </p>
            </DeepDive>
          </section>

          {/* Section 2: Machine Learning Renaissance */}
          <section id="section-2">
            <SectionHeader 
              icon={Cpu} 
              title="The ML Renaissance: Conditional Factors" 
              subtitle="Moving from static betas to dynamic, non-linear prediction engines."
              colorClass="bg-purple-600"
            />
            
            <p className="text-lg text-slate-600 mb-8">
              Classic models (Fama-French) assume factor loadings (β) are constant over time. <strong>Machine Learning</strong> introduces <em>Conditional Factor Models</em>, where β varies based on the state of the world (e.g., Value performs differently during high inflation).
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
              <h3 className="text-lg font-bold text-purple-900 mb-2">The Paradigm Shift</h3>
              <p className="text-purple-800 text-sm leading-relaxed">
                Traditional factor models are <strong>static</strong>: they assume the relationship between factors and returns remains constant. ML models are <strong>dynamic</strong>: they learn regime-dependent relationships, adapting factor sensitivities based on market conditions, volatility regimes, and macroeconomic states.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-5">
                  <Layers size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-3 text-lg">Autoencoders (PCA 2.0)</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Classic PCA is linear. <strong>Autoencoders</strong> use neural networks to find non-linear latent risk factors. The "bottleneck" layer forces the model to compress market noise into clean, structural drivers.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600">
                    <strong>Application:</strong> Dimensionality reduction for high-frequency data, discovering hidden market regimes.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                  <Zap size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-3 text-lg">Transformers</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Models like "Stockformer" treat price history as a language sequence. <strong>Self-Attention</strong> mechanisms identify which past market regimes are relevant to the current prediction, solving the long-memory problem.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600">
                    <strong>Application:</strong> Time-series forecasting with adaptive lookback windows, capturing regime changes.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-5">
                  <Filter size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-3 text-lg">Regularization (Lasso)</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  With the "Factor Zoo" (hundreds of potential factors), ML uses L1 Regularization (Lasso) to zero out useless factors, preventing overfitting and selecting only the most robust predictors.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600">
                    <strong>Application:</strong> Feature selection in high-dimensional factor spaces, combating data mining bias.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Conditional vs. Unconditional Models</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-purple-900 mb-2">Unconditional (Traditional)</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Factor loadings are estimated using historical averages. Assumes market structure is stable over time.
                  </p>
                  <div className="bg-white p-4 rounded-lg text-xs font-mono text-slate-700">
                    β<sub>Value</sub> = 0.8 (constant)
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 mb-2">Conditional (ML-Enhanced)</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Factor loadings adapt based on state variables (VIX, yield curve slope, credit spreads).
                  </p>
                  <div className="bg-white p-4 rounded-lg text-xs font-mono text-slate-700">
                    β<sub>Value</sub>(t) = f(VIX<sub>t</sub>, Inflation<sub>t</sub>, ...)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Data Typology */}
          <section id="section-3">
            <SectionHeader 
              icon={Database} 
              title="Data Typology & Engineering" 
              subtitle="The fuel is different: Inputs for Prediction vs. Risk."
              colorClass="bg-cyan-600"
            />
            
            <p className="text-lg text-slate-600 mb-8">
              Distinguishing data is critical. Risk models require broad, "Point-in-Time" economic data. Alpha models require granular, often unstructured data. The quality and temporal alignment of your data determines the ceiling of your model's performance.
            </p>

            <ComparisonTable />

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-cyan-800 mb-4 flex items-center gap-2">
                  <Clock size={18}/> Point-in-Time (PIT) Cruciality
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  For prediction, you <strong>must</strong> use data as it was known at that exact moment. This prevents look-ahead bias, the silent killer of backtests.
                </p>
                <div className="bg-rose-50 border-l-4 border-rose-400 p-4 text-xs text-rose-800">
                  <strong>Look-ahead Bias Example:</strong> Using updated GDP figures for Q1 that were actually released in Q2 to train a model predicting Q1 prices. This creates phantom alpha that evaporates in live trading.
                </div>
                <div className="mt-4 bg-emerald-50 border-l-4 border-emerald-400 p-4 text-xs text-emerald-800">
                  <strong>Solution:</strong> Bitemporal databases that track both "as-of" date (when data was valid) and "known-as-of" date (when data became available).
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-cyan-800 mb-4 flex items-center gap-2">
                  <Lock size={18}/> The "Factor Zoo"
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Academics have identified 400+ factors. Most are noise. The challenge is separating signal from data-mined artifacts.
                </p>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <strong>Fundamental:</strong> P/E, P/B, Debt/Equity (Low frequency, quarterly updates).
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <strong>Technical:</strong> RSI, MACD, Bollinger Bands (High frequency, intraday signals).
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <strong>Alternative:</strong> Web traffic, App downloads, Glassdoor reviews (Unstructured, requires NLP).
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <strong>Sentiment:</strong> News tone, social media mentions, analyst upgrades/downgrades.
                  </li>
                </ul>
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900">
                  <strong>Harvey et al. (2016):</strong> With 400+ factors tested, the t-statistic threshold for significance should be 3.0, not 2.0. Most published factors fail this bar.
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
              <h3 className="text-xl font-bold text-cyan-900 mb-4">Data Engineering Best Practices</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2 text-sm">Normalization</h4>
                  <p className="text-xs text-slate-600">
                    Cross-sectional z-scores to ensure factors are comparable across stocks and time periods. Prevents large-cap bias.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2 text-sm">Winsorization</h4>
                  <p className="text-xs text-slate-600">
                    Cap extreme outliers at 1st/99th percentile to prevent single observations from dominating the model.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2 text-sm">Lag Alignment</h4>
                  <p className="text-xs text-slate-600">
                    Ensure predictors are lagged appropriately relative to target returns. Minimum 1-day lag for daily models.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Orthogonalization */}
          <section id="section-4">
            <SectionHeader 
              icon={Shield} 
              title="Orthogonalization: Cleaning the Signal" 
              subtitle="Ensuring your alpha is not just Beta in disguise."
              colorClass="bg-rose-600"
            />
            
            <div className="flex gap-4 mb-8 items-start bg-amber-50 p-6 rounded-xl border border-amber-100 text-amber-900 shadow-sm">
              <AlertTriangle className="shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-md uppercase tracking-wide mb-2">The Multicollinearity Trap</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  If your ML model predicts returns based on "High P/E", it's just rediscovering the Value Factor. You must mathematically remove the influence of known factors to isolate pure alpha. Without orthogonalization, you're selling beta as alpha—a recipe for disappointment when market regimes shift.
                </p>
              </div>
            </div>

            <MathBlock 
              label="Residualization (Gram-Schmidt)"
              formula={
                <span>
                  ε<sub>i</sub> = R<sub>i</sub> - ( β<sub>Mkt</sub>F<sub>Mkt</sub> + β<sub>Val</sub>F<sub>Val</sub> + β<sub>Mom</sub>F<sub>Mom</sub> )
                </span>
              }
              description={
                <span>
                  We regress our raw signal <strong>R<sub>i</sub></strong> against all known risk factors. The residual <strong>ε<sub>i</sub></strong> is the "Orthogonalized Signal". It represents the portion of the return <em>unexplained</em> by standard market forces. This is your true alpha candidate.
                </span>
              }
            />

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Feature Importance (SHAP Values)</h3>
                <p className="text-slate-600 text-sm mb-4">
                  In Deep Learning, we don't have simple Beta coefficients. We use <strong>SHAP (SHapley Additive exPlanations)</strong> values to interpret models. If SHAP shows the "Market Return" feature drives 90% of your prediction, your model is a risk model, not an alpha model.
                </p>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-2 text-sm">SHAP Interpretation Example</h4>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between items-center">
                      <span>Market Beta (SPY Return)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500" style={{width: '85%'}}></div>
                        </div>
                        <span className="font-mono">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Value Factor (P/B Ratio)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{width: '10%'}}></div>
                        </div>
                        <span className="font-mono">10%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Alternative Data Signal</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{width: '5%'}}></div>
                        </div>
                        <span className="font-mono">5%</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-rose-700 font-medium">
                    ⚠️ This model is 85% beta exposure. Orthogonalize before deployment.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-200">
                <h3 className="font-bold text-rose-900 mb-3">The Orthogonalization Workflow</h3>
                <ol className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <div>
                      <strong>Identify Known Factors:</strong> Start with Fama-French 5-factor model (Market, Size, Value, Profitability, Investment) as baseline.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <div>
                      <strong>Regress Signal on Factors:</strong> Run OLS regression of your raw signal against factor returns. Extract residuals.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <div>
                      <strong>Validate Independence:</strong> Compute correlation matrix between residualized signal and original factors. Target: |ρ| &lt; 0.1.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <div>
                      <strong>Backtest Orthogonalized Signal:</strong> If performance degrades significantly, your "alpha" was actually disguised beta.
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 5: Portfolio Construction */}
          <section id="section-5">
            <SectionHeader 
              icon={BarChart2} 
              title="Portfolio Construction" 
              subtitle="Turning predictions into trades while managing constraints."
              colorClass="bg-emerald-600"
            />
            
            <p className="text-lg text-slate-600 mb-8">
              A high-accuracy prediction is useless if it requires impossible trading costs. The final step is the <strong>Mean-Variance Optimization</strong>, where alpha predictions meet risk constraints and transaction cost realities.
            </p>

            <MathBlock 
              label="Objective Function"
              formula={
                <span>
                  w<sup>*</sup> = argmax<sub>w</sub> ( w<sup>T</sup> μ - λ w<sup>T</sup> Σ w - Costs(w) )
                </span>
              }
              description={
                <span>
                  <strong>w:</strong> Portfolio weights. <strong>μ:</strong> Predicted Alpha (from ML). <strong>Σ:</strong> Covariance Matrix (from Risk Model). <strong>Costs:</strong> Transaction fees + Slippage.<br/>
                  <span className="text-emerald-600 font-semibold">Insight:</span> The Risk Model (Σ) acts as the "brakes", preventing the Alpha Model (μ) from taking excessive concentrated bets. Lambda (λ) controls risk aversion.
                </span>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <InfoCard title="Constraints" color="indigo" icon={Lock}>
                <ul className="list-disc pl-4 space-y-2 text-sm text-indigo-900">
                  <li><strong>Gross Exposure:</strong> Leverage limits (e.g., 200% = 100% long + 100% short).</li>
                  <li><strong>Net Exposure:</strong> Dollar neutrality (Longs = Shorts) for market-neutral strategies.</li>
                  <li><strong>Factor Neutrality:</strong> Zero exposure to Sector/Style factors to isolate alpha.</li>
                  <li><strong>Position Limits:</strong> Maximum weight per stock (e.g., 5%) to prevent concentration risk.</li>
                  <li><strong>Turnover Caps:</strong> Limit daily turnover to control transaction costs.</li>
                </ul>
              </InfoCard>

              <InfoCard title="Transaction Costs" color="amber" icon={AlertTriangle}>
                <p className="text-sm text-amber-900 mb-3">
                  High turnover strategies (alpha) erode quickly due to costs. The "Implementation Shortfall" is the gap between paper returns and realized P&L.
                </p>
                <div className="text-xs bg-white/50 p-3 rounded space-y-2">
                  <div>
                    <strong>Linear Cost:</strong> Spread + Commission.<br/>
                    <span className="text-slate-600">Typical: 5-10 bps for liquid large-caps.</span>
                  </div>
                  <div>
                    <strong>Non-Linear Cost:</strong> Market Impact (moving the price against yourself).<br/>
                    <span className="text-slate-600">Scales with √(Order Size / ADV).</span>
                  </div>
                  <div>
                    <strong>Opportunity Cost:</strong> Slippage from delayed execution.<br/>
                    <span className="text-slate-600">Increases with volatility and urgency.</span>
                  </div>
                </div>
              </InfoCard>
            </div>

            <div className="mt-8 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-900 mb-4">The Optimization Hierarchy</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    Alpha Generation Layer
                  </h4>
                  <p className="text-sm text-slate-600 pl-8">
                    ML models produce stock-level return forecasts (μ). This is the "raw signal" before risk adjustment.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    Risk Model Layer
                  </h4>
                  <p className="text-sm text-slate-600 pl-8">
                    Factor models estimate covariance matrix (Σ). This quantifies how stocks move together, enabling diversification.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                    Transaction Cost Model
                  </h4>
                  <p className="text-sm text-slate-600 pl-8">
                    Estimates cost of executing trades based on liquidity, volatility, and order size. Penalizes high-turnover solutions.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                    Constraint Layer
                  </h4>
                  <p className="text-sm text-slate-600 pl-8">
                    Regulatory limits, client mandates, and operational constraints. The optimizer must respect these hard boundaries.
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-emerald-100 p-4 rounded-lg">
                <p className="text-sm text-emerald-900 font-medium">
                  <strong>Output:</strong> Optimal portfolio weights (w*) that maximize risk-adjusted returns subject to all constraints. This is the "trade list" sent to execution algorithms.
                </p>
              </div>
            </div>

            <DeepDive title="The Sharpe Ratio Ceiling">
              <p>
                The <strong>Fundamental Law of Active Management</strong> states: Sharpe Ratio ≈ IC × √Breadth, where IC is Information Coefficient (skill) and Breadth is number of independent bets.
              </p>
              <p className="mt-3">
                Even with perfect alpha signals (IC = 0.1, exceptional), a strategy with 100 stocks rebalanced monthly achieves Sharpe ≈ 1.0. To reach Sharpe = 2.0, you need either:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>4x more breadth (400 stocks), or</li>
                <li>2x better skill (IC = 0.2, nearly impossible), or</li>
                <li>Higher frequency (daily rebalancing = 12x more bets/year)</li>
              </ul>
              <p className="mt-3 text-indigo-700 font-medium">
                This mathematical ceiling explains why quant funds obsess over execution speed, universe expansion, and signal orthogonality. Alpha is scarce, and the laws of statistics are unforgiving.
              </p>
            </DeepDive>
          </section>
        </main>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-16 text-center max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Your Deep Research</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Explore the complete research paper with detailed mathematical derivations, implementation code examples, and institutional case studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-20 px-6 mt-20 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8 text-white">
              <Globe size={28} />
              <h2 className="text-3xl font-bold">Research Conclusion</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-16 text-sm leading-7 opacity-80">
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Summary</h4>
                <p>
                  Factor models serve as the foundational grammar of algorithmic trading. While they originated as tools for risk attribution (Fama-French), Machine Learning has repurposed them as targets for prediction. The modern quant stack uses <strong>Deep Learning for Alpha (μ)</strong> and <strong>Factor Models for Risk (Σ)</strong>.
                </p>
                <p className="mt-4">
                  The distinction between explaining variance (risk management) and forecasting returns (alpha generation) is not merely academic—it defines the entire architecture of quantitative finance. Risk models achieve R² ≈ 90% by design, capturing systematic exposures. Alpha models target IC ≈ 0.05, a seemingly modest goal that represents the frontier of predictive capability in financial markets.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Key Takeaway</h4>
                <p>
                  The "Holy Grail" is not just high accuracy. It is high <strong>Sharpe Ratio</strong>, achieved by finding orthogonal signals that are uncorrelated with the broad market, and executing them with minimal transaction costs. Predictability exists, but it is fleeting, conditional, and fiercely competitive.
                </p>
                <p className="mt-4">
                  As markets become more efficient through algorithmic competition, the half-life of alpha signals continues to shrink. Success requires not just sophisticated models, but also superior data infrastructure, execution technology, and risk management discipline. The mathematical frameworks presented here are necessary but not sufficient—implementation excellence separates winners from losers.
                </p>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
