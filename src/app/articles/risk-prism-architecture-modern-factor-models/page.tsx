'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Atom, LineChart, BrainCircuit, Cpu, Globe, Target, AlertTriangle, Zap, TrendingUp, Database, ShieldCheck, Layers, BarChart3, Network, Activity, Calculator, Flame, Droplets, Coins, ArrowUpRight, Fingerprint, Filter, RefreshCcw, Search, HardDrive, Scaling, SquareFunction, GitBranch, Table as TableIcon, Sparkles, ZapOff, Share2, Binary, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Specialized UI Components ---
const Badge = ({ children, color = "indigo" }: { children: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    sky: "border-sky-200 bg-sky-50 text-sky-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[color]} mr-2 mb-2 inline-block`}>
      {children}
    </span>
  );
};

const SectionHeader = ({ icon: Icon, title, colorClass, subtitle, lessonNumber }: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  colorClass: string;
  subtitle?: string;
  lessonNumber: string;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-4 mb-4">
      <div className={`inline-flex items-center justify-center p-3 rounded-2xl ${colorClass} text-white shadow-xl`}>
        <Icon size={28} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase leading-none">Lesson Module</span>
        <span className="text-lg font-bold text-slate-800 leading-none mt-1">{lessonNumber}</span>
      </div>
    </div>
    <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">{title}</h2>
    {subtitle && <p className="mt-4 text-xl text-slate-500 font-medium max-w-3xl leading-relaxed">{subtitle}</p>}
  </div>
);

const ModuleWrapper = ({ children, accent = "indigo" }: { children: React.ReactNode; accent?: string }) => (
  <div className={`relative bg-white rounded-[2.5rem] p-6 md:p-10 mb-12 border border-slate-200 shadow-2xl shadow-slate-200/40 overflow-hidden`}>
    <div className={`absolute -top-24 -right-24 w-64 h-64 bg-${accent}-500/5 rounded-full blur-3xl pointer-events-none`}></div>
    {children}
  </div>
);

const FormulaBox = ({ math, title, variables }: {
  math: string;
  title: string;
  variables: Array<{ sym: string; label: string }>;
}) => (
  <div className="bg-slate-900 rounded-3xl p-10 my-12 shadow-2xl border border-slate-800">
    <div className="flex items-center gap-2 mb-6">
      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
      <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h5>
    </div>
    <div className="text-white font-mono text-2xl md:text-4xl text-center py-8 border-b border-slate-800 overflow-x-auto whitespace-nowrap">
      {math}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {variables.map((v, i) => (
        <div key={i} className="text-center group">
          <div className="text-indigo-400 font-bold text-xl mb-1">{v.sym}</div>
          <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{v.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const PipelinePhase = ({ num, title, icon: Icon, color, children }: {
  num: string;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  children: React.ReactNode;
}) => (
  <div className="relative pl-12 pb-16 last:pb-0 border-l border-slate-200">
    <div className={`absolute -left-6 top-0 w-12 h-12 rounded-2xl bg-${color}-600 text-white flex items-center justify-center shadow-lg`}>
      <Icon size={24} />
    </div>
    <div className="mb-2 flex items-center gap-4">
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-${color}-600`}>Phase {num}</span>
      <h4 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {children}
    </div>
  </div>
);

const PipelineSubCard = ({ title, desc, tech }: {
  title: string;
  desc: string;
  tech: string[];
}) => (
  <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <h5 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-2 flex items-center justify-between">
      {title}
      <ChevronRight size={14} className="text-slate-300" />
    </h5>
    <p className="text-xs text-slate-500 leading-relaxed mb-4">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tech.map((t, i) => (
        <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-400 uppercase">{t}</span>
      ))}
    </div>
  </div>
);

const FactorDetailCard = ({ title, icon: Icon, color, thesis, proxy, crash, tags }: {
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  thesis: string;
  proxy: string;
  crash: string;
  tags: string[];
}) => (
  <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-slate-300 transition-all">
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-xl bg-white shadow-sm text-${color}-600 border border-slate-100`}>
        <Icon size={20} />
      </div>
      <h5 className="font-black text-slate-900 uppercase text-sm tracking-tight">{title}</h5>
    </div>
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Investment Thesis</span>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">{thesis}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Standard Proxy</span>
          <p className="text-[11px] font-bold text-slate-800 uppercase">{proxy}</p>
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-rose-400 tracking-widest block mb-1">Crash Scenario</span>
          <p className="text-[11px] font-bold text-rose-600 uppercase">{crash}</p>
        </div>
      </div>
      <div className="pt-4 border-t border-slate-200 flex flex-wrap">
        {tags.map((tag, i) => <Badge key={i} color={color}>{tag}</Badge>)}
      </div>
    </div>
  </div>
);

const ChevronRight = ({ size, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default function RiskPrismArticle() {
  const currentArticle = articles.find(article => article.slug === 'risk-prism-architecture-modern-factor-models');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && currentArticle.title && currentArticle.slug && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-indigo-600 selection:text-white antialiased">
        {/* Return to Home Button */}
        <div className="max-w-7xl mx-auto px-8 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* HERO SECTION */}
        <header className="relative pt-16 pb-24 overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
              <Activity size={16} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Grade Research v4.5</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter text-slate-900 mb-6">
              THE RISK <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500">PRISM</span>
            </h1>
            <div className="max-w-2xl">
              <p className="text-2xl text-slate-500 font-medium leading-relaxed">Master the architecture of modern factor models. Transition from asset-class silos to a surgical, multidimensional understanding of risk drivers.</p>
            </div>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-7xl mx-auto px-8 pt-6 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/QwAjISy.jpeg" 
              alt="Risk Prism Architecture Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            {/* Full-screen button overlay */}
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
            {/* Click hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/If2Pacs.jpeg" 
              alt="Risk Prism Architecture Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            {/* Full-screen button overlay */}
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
            {/* Click hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/QwAjISy.jpeg"
          alt="Risk Prism Architecture Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* THE MASTERCLASS CONTENT */}
        <main className="max-w-7xl mx-auto px-8 py-12">
          {/* MODULE 1: THE FACTOR ZOO CATALOG */}
          <section className="mb-16">
            <SectionHeader 
              lessonNumber="01"
              icon={Layers}
              title="The Factor Zoo"
              colorClass="bg-indigo-600"
              subtitle="The systematic decomposition of the market. We move from broad style premia to the macroeconomic foundations."
            />
            <ModuleWrapper accent="indigo">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8 text-slate-200">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Territory I: Equity Style Factors</h3>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FactorDetailCard 
                    title="Value"
                    icon={Coins}
                    color="indigo"
                    thesis="Cheap stocks compensate for 'hidden distress' risk. Investors demand a premium for holding companies with poor sentiment or cyclical uncertainty."
                    proxy="P/B, P/E, FCF Yield"
                    crash="Growth Paradigms"
                    tags={["HML", "Contrarian", "Cheapness"]}
                  />
                  <FactorDetailCard 
                    title="Momentum"
                    icon={TrendingUp}
                    color="indigo"
                    thesis="Rooted in behavioral biases (underreaction/herding). Assets that perform well continue to attract capital until a valuation 'cliff' is reached."
                    proxy="12m - 1m Return"
                    crash="V-Shaped Reversals"
                    tags={["WML", "Behavioral", "Trend"]}
                  />
                  <FactorDetailCard 
                    title="Quality"
                    icon={ShieldCheck}
                    color="indigo"
                    thesis="The 'Flight to Safety' premium. Companies with high ROE and low leverage act as defensive hedges during late-cycle volatility."
                    proxy="ROE, Low Debt/Equity"
                    crash="Junk Rallies"
                    tags={["QMJ", "Defensive", "Stability"]}
                  />
                </div>
              </div>

              <div className="p-10 bg-violet-900 rounded-[3rem] text-white relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
                  <BrainCircuit size={200} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xs font-black text-violet-300 uppercase tracking-[0.4em] mb-6">Territory II: Macroeconomic Foundation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                        <Globe size={28} className="text-violet-400" /> Systemic Sensitivity
                      </h4>
                      <p className="text-violet-100 text-sm leading-relaxed mb-6">Style factors explain relative performance, but Macro drivers explain the absolute movement of the market. Modern models integrate Inflation, Growth, and Real Rates to capture regime shifts.</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge color="violet">Inflation (CPI)</Badge>
                        <Badge color="violet">Real Rates (TIPs)</Badge>
                        <Badge color="violet">Credit Spreads</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModuleWrapper>
          </section>

          {/* MODULE 2: THE QUANT PIPELINE */}
          <section className="mb-16">
            <SectionHeader 
              lessonNumber="02"
              icon={Database}
              title="The Quant Pipeline"
              colorClass="bg-emerald-600"
              subtitle="The industrial data refinery. How raw financial noise is filtered into a surgical risk forecast."
            />
            <ModuleWrapper accent="emerald">
              <div className="max-w-4xl mx-auto">
                <PipelinePhase num="1" title="Data Ingestion & Refining" icon={HardDrive} color="emerald">
                  <PipelineSubCard 
                    title="Raw Aggregation"
                    desc="Pulling quarterly fundamental reports, daily pricing, and alternative data like NLP-parsed sentiment."
                    tech={["SQL", "REST API", "EDGAR"]}
                  />
                  <PipelineSubCard 
                    title="Cleaning & Outlier Control"
                    desc="Handling missing values and applying Winsorization to limit the impact of extreme statistical noise."
                    tech={["Winsorize", "Imputation", "3-Sigma"]}
                  />
                </PipelinePhase>

                <PipelinePhase num="2" title="Factor Engineering" icon={Calculator} color="emerald">
                  <PipelineSubCard 
                    title="Standardization"
                    desc="Converting raw metrics into Z-scores. This ensures a 'Cheap' P/E ratio is comparable to a 'Small' Market Cap."
                    tech={["Z-Score", "Cross-Sectional"]}
                  />
                  <PipelineSubCard 
                    title="Orthogonalization"
                    desc="Removing correlation between factors (e.g., Value often carries a Size bias). Ensuring each factor is a unique bet."
                    tech={["Gram-Schmidt", "Residualize"]}
                  />
                </PipelinePhase>

                <PipelinePhase num="3" title="Model Estimation" icon={RefreshCcw} color="emerald">
                  <PipelineSubCard 
                    title="WLS Regression"
                    desc="Solving for daily Factor Returns by regressing asset returns against their standardized exposures."
                    tech={["Weighted OLS", "Multivariate"]}
                  />
                </PipelinePhase>

                <PipelinePhase num="4" title="Risk Matrix Forecasting" icon={BarChart3} color="emerald">
                  <PipelineSubCard 
                    title="Covariance Estimation"
                    desc="Predicting how factors will move together using EWMA to prioritize recent market volatility."
                    tech={["EWMA", "Half-Life"]}
                  />
                  <PipelineSubCard 
                    title="Bayesian Shrinkage"
                    desc="Cleaning the forecast matrix by 'shrinking' noisy elements toward a stable institutional average."
                    tech={["Ledoit-Wolf", "Shrinkage"]}
                  />
                </PipelinePhase>
              </div>
            </ModuleWrapper>
          </section>

          {/* MODULE 3: DECOMPOSING THE VARIANCE */}
          <section className="mb-16">
            <SectionHeader 
              lessonNumber="03"
              icon={Cpu}
              title="Decomposing the Variance"
              colorClass="bg-slate-900"
              subtitle="Restructuring the 'engine' of portfolio management. Moving from empirical noise to structural stability."
            />
            <ModuleWrapper accent="slate">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
                <div>
                  <h3 className="text-3xl font-black mb-6 tracking-tight">The Curse of Dimensionality</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">A portfolio of 3,000 stocks requires an empirical covariance matrix with 4.5 million entries. Factor models solve this by reducing the problem to a small set of liquid drivers.</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="block text-2xl font-black text-slate-900">N²</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Empirical Parameters</span>
                    </div>
                    <div className="p-6 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100">
                      <span className="block text-2xl font-black text-white">N × K</span>
                      <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Factor Parameters</span>
                    </div>
                  </div>
                </div>
                <div className="relative p-8 bg-slate-900 rounded-[2.5rem] overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-white group-hover:scale-110 transition-transform">
                    <Scaling size={120} />
                  </div>
                  <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-8">Structural Breakdown</h4>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0 font-bold text-white">1</div>
                      <div>
                        <h5 className="text-white font-bold text-sm">Dimensionality Reduction</h5>
                        <p className="text-slate-400 text-xs mt-1">From thousands of noisy asset correlations to ~50 stable factor correlations.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0 font-bold text-white">2</div>
                      <div>
                        <h5 className="text-white font-bold text-sm">Separating Signal from Noise</h5>
                        <p className="text-slate-400 text-xs mt-1">Factors represent systematic 'Signal.' Specific risk (D) represents idiosyncratic 'Noise.'</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <FormulaBox 
                title="The Fundamental Asset Covariance Identity"
                math="Σ_a = F Σ_f F^T + D"
                variables={[
                  { sym: "Σ_a", label: "Asset Covariance" },
                  { sym: "F", label: "Exposure Matrix" },
                  { sym: "Σ_f", label: "Factor Covariance" },
                  { sym: "D", label: "Specific Risk (Noise)" }
                ]}
              />

              <div className="mt-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Advanced Attribution Metrics</h3>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem]">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                      <Target size={20} />
                    </div>
                    <h4 className="font-black text-lg mb-2">Total Risk (σ_p)</h4>
                    <div className="bg-white p-3 rounded-lg font-mono text-[10px] text-slate-400 border border-slate-200">σ_p = √(w^T Σ_a w)</div>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem]">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                      <GitBranch size={20} />
                    </div>
                    <h4 className="font-black text-lg mb-2">Active Risk (TE)</h4>
                    <div className="bg-white p-3 rounded-lg font-mono text-[10px] text-slate-400 border border-slate-200">TE = √((w-b)^T Σ_a (w-b))</div>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem]">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-6">
                      <AlertTriangle size={20} />
                    </div>
                    <h4 className="font-black text-lg mb-2">MCTR</h4>
                    <div className="bg-white p-3 rounded-lg font-mono text-[10px] text-slate-400 border border-slate-200">MCTR_i = (Σ_a * w) / σ_p</div>
                  </div>
                </div>
              </div>
            </ModuleWrapper>
          </section>

          {/* MODULE 4: THE FUTURE FRONTIER */}
          <section className="mb-16">
            <SectionHeader 
              lessonNumber="04"
              icon={BrainCircuit}
              title="The Future Frontier"
              colorClass="bg-violet-600"
              subtitle="The Post-Linear Era: Generative Factors, Network Theory, and LLM-Driven Signal Discovery."
            />
            <ModuleWrapper accent="violet">
              {/* Territory 1: AI Architectures */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-lg">
                    <Sparkles size={28}/>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Generative AI Factors</h3>
                    <p className="text-slate-500 text-sm mt-1">Breaking the OLS paradigm with deep probabilistic modeling.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Binary size={80}/>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-6">FactorVAEs</h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-8">Variational Autoencoders are used to map high-dimensional pricing data into a <strong>Latent Space</strong>. Unlike traditional PCA, VAEs capture non-linear interactions and conditional probabilities.</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">
                        <span>Encoder</span>
                        <ChevronRight size={12}/>
                        <span>Latent Space</span>
                        <ChevronRight size={12}/>
                        <span>Decoder</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full flex">
                        <div className="h-full bg-violet-400 w-1/3 border-r border-white"></div>
                        <div className="h-full bg-violet-600 w-1/3 border-r border-white"></div>
                        <div className="h-full bg-violet-400 w-1/3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Share2 size={80}/>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-6">Network Crowding (Graph Theory)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-8">Traditional risk models treat assets as independent points. <strong>Graph Neural Networks (GNNs)</strong> treat the market as a web. We detect 'Systemic Fragility' by identifying clusters of co-holding managers.</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="violet">Co-occurrence Matrices</Badge>
                      <Badge color="violet">Node Centrality</Badge>
                      <Badge color="violet">Entropy Decay</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Territory 2: Narrative Factors */}
              <div className="mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="p-8 bg-slate-900 rounded-[3rem] text-white">
                      <h4 className="text-xs font-black text-violet-400 uppercase tracking-[0.3em] mb-6">The Narrative Alpha Engine</h4>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center shrink-0 font-bold">LLM</div>
                          <div>
                            <h5 className="font-bold text-sm">FinBERT / LLM Signal Ingestion</h5>
                            <p className="text-slate-400 text-xs mt-1">Parsing millions of earnings call transcripts to build a 'Sentiment Load' factor.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center shrink-0 font-bold">NLP</div>
                          <div>
                            <h5 className="font-bold text-sm">Semantic Orthogonalization</h5>
                            <p className="text-slate-400 text-xs mt-1">Removing pricing bias from text signals to isolate pure information alpha.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 pt-8 border-t border-slate-800 flex justify-around opacity-50">
                        <div className="text-center">
                          <span className="block text-xl font-bold italic">78%</span>
                          <span className="text-[9px] uppercase tracking-widest">Accuracy</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-xl font-bold italic">0.42</span>
                          <span className="text-[9px] uppercase tracking-widest">Sharpe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <h3 className="text-3xl font-black mb-6 tracking-tight">Narrative-Driven Factors</h3>
                    <p className="text-slate-500 leading-relaxed mb-6">In 2025, the 'Factor Zoo' is increasingly composed of words, not just numbers. By applying Large Language Models to unstructured data, quants are discovering <strong>Alternative Factors</strong> that lead price movement.</p>
                    <ul className="space-y-4">
                      <li className="flex gap-3 text-sm text-slate-600 font-medium">
                        <div className="w-5 h-5 bg-violet-100 text-violet-600 flex items-center justify-center rounded shrink-0">1</div>
                        <span><strong>ESG Distortion:</strong> Sentiment-derived scores often lead ESG rating changes by months.</span>
                      </li>
                      <li className="flex gap-3 text-sm text-slate-600 font-medium">
                        <div className="w-5 h-5 bg-violet-100 text-violet-600 flex items-center justify-center rounded shrink-0">2</div>
                        <span><strong>Supply Chain Sensitivity:</strong> LLMs map dependencies through shipping news, creating a 'Bottleneck' factor.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Territory 3: Adaptability & Stationarity */}
              <div className="p-12 bg-violet-50 rounded-[3rem] border border-violet-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
                  <ZapOff size={200}/>
                </div>
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                  <div className="md:w-1/3">
                    <div className="w-20 h-20 rounded-[2rem] bg-violet-600 text-white flex items-center justify-center shadow-xl mb-6">
                      <Activity size={40}/>
                    </div>
                    <h4 className="text-2xl font-black text-violet-900 leading-tight">Fighting Non-Stationarity</h4>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-sm text-violet-800 leading-relaxed mb-6">The greatest weakness of traditional risk models is the assumption that the future looks like the past. <strong>Non-stationarity</strong> means factor premiums disappear or flip signs during regime shifts.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-2xl border border-violet-100">
                        <h5 className="font-bold text-xs text-violet-600 uppercase tracking-widest mb-1">HMM Models</h5>
                        <p className="text-[10px] text-slate-500">Hidden Markov Models to detect market regimes (Bull/Bear/Sideways) in real-time.</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border border-violet-100">
                        <h5 className="font-bold text-xs text-violet-600 uppercase tracking-widest mb-1">Dynamic Half-Life</h5>
                        <p className="text-[10px] text-slate-500">Auto-adjusting the decay of historical data based on current market volatility.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModuleWrapper>
          </section>

          {/* FINAL SUMMARY */}
          <section className="relative p-20 bg-slate-900 rounded-[4rem] text-white overflow-hidden text-center group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">The Transition to Factor Allocation.</h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">We are moving into a Look-Through era. Don't allocate to Equities or Bonds. Allocate to Economic Growth, Inflation, and Liquidity. That is the ultimate defense against market uncertainty.</p>
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

        {/* FOOTER */}
        <footer className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="text-center md:text-left">
                <div className="text-3xl font-black tracking-tighter text-slate-900 mb-2">PRISM RISK</div>
                <p className="text-slate-400 text-sm font-medium">Institutional Grade Factor Analysis Framework.</p>
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 text-center">
                © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}