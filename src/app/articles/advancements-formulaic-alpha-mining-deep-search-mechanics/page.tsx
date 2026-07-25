'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  BrainCircuit, 
  TrendingUp, 
  FunctionSquare, 
  Network, 
  LineChart, 
  AlertOctagon, 
  CheckCircle2, 
  Calculator,
  ShieldAlert,
  Target,
  Zap,
  Activity,
  BarChart4,
  BookOpen,
  Maximize2
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const GradientText = ({ children, from = 'from-blue-600', to = 'to-purple-600' }: { children: React.ReactNode; from?: string; to?: string }) => (
  <span className={`bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent font-extrabold`}>
    {children}
  </span>
);

const SectionHeading = ({ title, icon: Icon, color = 'text-blue-600', bg = 'bg-blue-100' }: { title: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; color?: string; bg?: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-3 rounded-2xl ${bg} ${color} shadow-sm`}>
      <Icon size={32} strokeWidth={2.5} />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
      {title}
    </h2>
  </div>
);

const MathBlock = ({ equation, description }: { equation: string; description?: string }) => (
  <div className="my-6 bg-slate-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 shadow-sm overflow-x-auto">
    <code className="text-lg md:text-xl font-mono text-indigo-700 whitespace-nowrap">
      {equation}
    </code>
    {description && <p className="mt-3 text-sm text-slate-500 font-medium">{description}</p>}
  </div>
);

const FoundationSection = () => {
  return (
    <section className="py-16">
      <SectionHeading title="The Foundation of Formulaic Alphas" icon={FunctionSquare} color="text-fuchsia-600" bg="bg-fuchsia-100" />
      
      <div className="prose prose-lg text-slate-600 max-w-none mb-10">
        <p>
          In quantitative investment theory, an <strong>"alpha"</strong> is a predictive mathematical model that transforms raw financial data into a directional signal indicating expected future excess returns. The popularization of formulaic alphas is attributed to quant funds like WorldQuant, who championed generating immense libraries of simple, interpretable signals (e.g., Zura Kakushadze's <em>101 Formulaic Alphas</em>).
        </p>
        <p>
          Formulaic alphas are explicit, algebraic expressions (e.g., <code>Rank(Correlation(Close, Volume, 10))</code>) acting as highly condensed feature engineering pipelines. But why do top funds prefer these over modern Deep Learning?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border border-indigo-100 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FunctionSquare size={100} />
          </div>
          <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-indigo-500" /> Formulaic Alphas
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-indigo-800"><b className="w-32 shrink-0">Interpretability:</b> High. Expressions are explicitly human-readable.</li>
            <li className="flex gap-3 text-indigo-800"><b className="w-32 shrink-0">Overfitting Risk:</b> Low to Moderate. Constrained by mathematical syntax.</li>
            <li className="flex gap-3 text-indigo-800"><b className="w-32 shrink-0">Dimensional Logic:</b> Enforceable. Rejects logically flawed formulas.</li>
            <li className="flex gap-3 text-indigo-800"><b className="w-32 shrink-0">Computational Cost:</b> Extremely Low. Rapid cross-sectional scoring.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8 border border-rose-100 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <Network size={100} />
          </div>
          <h3 className="text-2xl font-bold text-rose-900 mb-6 flex items-center gap-2">
            <AlertOctagon className="text-rose-500" /> Black-Box ML Models
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-rose-800"><b className="w-32 shrink-0">Interpretability:</b> Low. Opaque matrices of weights.</li>
            <li className="flex gap-3 text-rose-800"><b className="w-32 shrink-0">Overfitting Risk:</b> Extremely High. Vast parameter spaces fit noise easily.</li>
            <li className="flex gap-3 text-rose-800"><b className="w-32 shrink-0">Dimensional Logic:</b> Unconstrained. Combines incompatible data types.</li>
            <li className="flex gap-3 text-rose-800"><b className="w-32 shrink-0">Computational Cost:</b> High. Requires heavy GPU acceleration for training.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

const MechanicsSection = () => {
  const operators = [
    { name: 'Rank', desc: 'Transforms raw values into cross-sectional percentiles (e.g., market-neutrality).', icon: BarChart4, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Delay', desc: 'Retrieves previous values. Foundational for momentum and mean-reversion.', icon: Activity, color: 'bg-blue-100 text-blue-600' },
    { name: 'Correlation', desc: 'Computes rolling relationships to detect regime shifts or breakdowns.', icon: Network, color: 'bg-purple-100 text-purple-600' },
    { name: 'Decay', desc: 'Applies moving averages acting as low-pass filters to extract structural trends.', icon: TrendingUp, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <section className="py-16 border-t border-slate-200">
      <SectionHeading title="Mechanics & Mathematics of Discovery" icon={BrainCircuit} color="text-violet-600" bg="bg-violet-100" />
      
      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
        Automated discovery relies on Deep Reinforcement Learning (DRL) and <strong>Monte Carlo Tree Search (MCTS)</strong> to navigate an infinite combinatorial space. The search formulates the discovery as a Markov Decision Process (MDP) utilizing a limited set of operators.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {operators.map((op, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${op.color}`}>
              <op.icon size={24} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">{op.name}</h4>
            <p className="text-sm text-slate-500">{op.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <Target className="text-violet-400" /> Risk-Seeking Policy Gradients
        </h3>
        <p className="text-slate-300 mb-6 text-lg">
          Unlike standard RL that optimizes for average outcomes, quantitative finance is governed by extreme outliers. An MCTS agent must employ a risk-seeking policy optimizing for the extreme right tail (best-case performance).
        </p>
        
        <MathBlock 
          equation="∇J_risk(θ; α) = (1 / αB) * Σ [R(τ) - R_α] * 1_{R(τ) ≥ R_α} * ∇_θ log(p(τ|θ))" 
          description="The network learns to exclusively emit structural patterns of highly profitable alphas (top 1-α quantile), entirely ignoring syntactic structures that lead to mediocre returns."
        />
      </div>
    </section>
  );
};

const ApplicationSection = () => {
  return (
    <section className="py-16 border-t border-slate-200">
      <SectionHeading title="Strategy for the Retail-Scale Quant" icon={LineChart} color="text-emerald-600" bg="bg-emerald-100" />
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 space-y-6">
          <p className="text-lg text-slate-600">
            For retail practitioners utilizing open-source frameworks, optimizing for computational efficiency and signal diversity is paramount against smaller universes like the S&P 500.
          </p>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-3">
              <Zap className="text-yellow-500" /> Formula Caching
            </h4>
            <p className="text-slate-600 text-sm">
              Implementing an O(1) lookup cache eliminates 70% to 80% of redundant vector computations during the MCTS backpropagation phase, making consumer-grade GPU runs feasible.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-3">
              <Calculator className="text-blue-500" /> The Information Coefficient
            </h4>
            <p className="text-slate-600 text-sm mb-4">
              Modern implementations eschew Pearson correlation for <strong>Spearman Rank Correlation</strong> to mitigate outlier distortion and capture monotonic relationships.
            </p>
            <MathBlock equation="IC = SpearmanRankCorr(Alpha_t, Returns_{t+1})" />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-gradient-to-b from-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-100 shadow-lg h-full">
            <h3 className="text-2xl font-bold text-teal-900 mb-4">Dynamic Alpha Pools & Diversity</h3>
            <p className="text-teal-800 mb-6">
              To force the agent to discover orthogonal information rather than trivial variations of the same factor, researchers utilize a Mutual Information Coefficient (MutIC) penalty.
            </p>
            <MathBlock 
              equation="Adjusted IC = IC_raw - λ(Σ MutIC_{candidate, i} / k)" 
              description="If a candidate relies on existing mechanistic logic, its Adjusted IC drops precipitously, signaling the agent to abandon that search branch."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const RisksSection = () => {
  return (
    <section className="py-16 border-t border-slate-200">
      <SectionHeading title="Risks, Pitfalls & Statistical Deflation" icon={ShieldAlert} color="text-red-600" bg="bg-red-100" />
      
      <p className="text-xl text-slate-700 mb-10 max-w-3xl">
        The most catastrophic risk in quantitative finance is <strong>backtest overfitting</strong>. Automated MCTS agents can evaluate tens of thousands of formulas, essentially weaponizing this risk through massive data-snooping.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">The Multiple Testing Problem</h3>
          <p className="text-slate-600 mb-6">
            When a machine learning algorithm iteratively parses 50,000 configurations, a Sharpe Ratio of 2.0 might simply represent the expected maximum of random statistical noise.
          </p>
          <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm font-medium">
            <AlertOctagon className="inline mr-2 mb-1" size={18} />
            If N = 10,000 trials, the expected max Sharpe Ratio derived entirely from random noise easily exceeds 3.20+. Standard benchmarks are obsolete.
          </div>
        </div>

        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl text-white">
          <h3 className="text-2xl font-bold text-white mb-4">Deflated Sharpe Ratio (DSR)</h3>
          <p className="text-slate-300 mb-6 text-sm">
            DSR mathematically adjusts the performance metrics by accounting for non-normal return distributions (skewness/kurtosis) and the exact number of independent trials (N).
          </p>
          <MathBlock 
            equation="DSR = Z[ (SR - SR_0)√{T-1} / √{1 - γ_3SR + ...} ]" 
            description="A DSR metric > 0.95 indicates 95% confidence that the alpha is a genuine structural inefficiency, not a statistical fluke."
          />
        </div>
      </div>
    </section>
  );
};

const SynthesisSection = () => {
  const checklist = [
    { title: "Enforce Strict OOS k-Fold Cross-Validation", desc: "Discard in-sample metrics. Validate across multiple disjoint temporal regimes using TimeSeriesSplit." },
    { title: "Apply the DSR Threshold", desc: "Log exact formula trials (N). Discard any signal failing to achieve a Deflated Sharpe Ratio confidence interval > 0.95." },
    { title: "Audit for Signal Diversity", desc: "Enforce MutIC limits to prevent homogenization. Pairwise correlations should ideally remain below 0.30." },
    { title: "Conduct Economic Verification", desc: "Evaluate the raw mathematical structure. Reject formulas combining fundamentally incompatible metrics." },
    { title: "Assess Strict Capacity Constraints", desc: "Apply institutional-grade transaction costs and turnover models. Gross profitability must survive slippage." }
  ];

  return (
    <section className="py-16 border-t border-slate-200">
      <SectionHeading title="Synthesis & Actionable Checklist" icon={CheckCircle2} color="text-indigo-600" bg="bg-indigo-100" />
      
      <p className="text-lg text-slate-600 mb-12">
        The discovery of alpha is no longer constrained by algorithmic search capabilities, but rather by the <strong>statistical rigor of signal verification</strong>. Retail investors must adhere to these vital protocols:
      </p>

      <div className="space-y-4">
        {checklist.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
              {index + 1}
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Simple fallback icon for the Hero
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

export default function FormulicAlphaMiningArticle() {
  const currentArticle = articles.find(article => article.slug === 'advancements-formulaic-alpha-mining-deep-search-mechanics');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200 selection:text-indigo-900">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-purple-400/10 blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-emerald-400/10 blur-[120px]" />
        </div>

        <div className="relative z-10">
          {/* Return to Home Button */}
          <div className="max-w-6xl mx-auto px-6 pt-8">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Hero Header */}
          <header className="mb-20 text-center space-y-6 px-6 py-12 md:py-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-4">
              <SparklesIcon className="text-amber-500 w-4 h-4" /> Comprehensive Interactive Tutorial
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-5xl mx-auto">
              Advancements in <br />
              <GradientText>Formulaic Alpha Mining</GradientText>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-500 leading-relaxed">
              Deep Search Mechanics, Application Strategies, and Statistical Robustness for the Modern Quantitative Researcher.
            </p>
          </header>

          {/* Hero Infographic */}
          {currentArticle?.imageUrl && (
            <section className="max-w-6xl mx-auto px-6 pb-8">
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
                onClick={() => setIsImageViewerOpen(true)}
              >
                <img 
                  src={currentArticle.imageUrl} 
                  alt="Formulaic Alpha Mining Infographic" 
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
          )}

          {/* Full-screen image viewer */}
          {currentArticle?.imageUrl && (
            <FullScreenImageViewer
              src={currentArticle.imageUrl}
              alt="Formulaic Alpha Mining Infographic"
              isOpen={isImageViewerOpen}
              onClose={() => setIsImageViewerOpen(false)}
            />
          )}

          {/* Sections */}
          <main className="space-y-8 bg-white/40 backdrop-blur-3xl rounded-[3rem] p-6 md:p-12 max-w-6xl mx-auto shadow-2xl border border-white/60">
            <FoundationSection />
            <MechanicsSection />
            <ApplicationSection />
            <RisksSection />
            <SynthesisSection />
          </main>

          {/* Footer with Google Doc Link */}
          <footer className="mt-20 text-center text-slate-400 pb-12 px-6">
            <div className="max-w-3xl mx-auto">
              <p className="mb-4 font-medium text-slate-700">The automated discovery of formulaic alphas represents a fusion of mathematical rigor and computational power.</p>
              <p className="text-sm mb-6">By decomposing the search space and enforcing statistical deflation, quantitative researchers can systematically harvest genuine structural inefficiencies while avoiding the pitfalls of data-snooping bias.</p>
              
              {/* Google Doc Link */}
              {currentArticle?.googleDoc && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <BookOpen className="inline mr-2" />
                    Read Full Research Paper
                  </a>
                </div>
              )}

              <p className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-8">
                © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
