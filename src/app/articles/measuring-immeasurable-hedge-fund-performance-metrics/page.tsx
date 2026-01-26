'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Activity, BarChart3, Target, Shield, AlertCircle, Clock, DollarSign, Scale, CheckCircle2, Zap, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const MetricCard = ({ title, symbol, formula, description, color, icon: Icon }: {
  title: string;
  symbol?: string;
  formula: string;
  description: string;
  color: string;
  icon: React.ElementType;
}) => (
  <div className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-${color}-100 hover:border-${color}-300`}>
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-600`}>
      <Icon size={64} />
    </div>
    <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-${color}-50 text-${color}-600`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <div className="font-mono text-xs text-slate-500 bg-slate-50 p-2 rounded mb-3 border border-slate-100">
      {formula}
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const FlowConcept = ({ title, type, description, pros, icon: Icon, color }: {
  title: string;
  type: string;
  description: string;
  pros: string[];
  icon: React.ElementType;
  color: string;
}) => (
  <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-slate-300 transition-colors">
    <div className={`shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-${color}-50 text-${color}-600`}>
      <Icon size={32} />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-${color}-100 text-${color}-700`}>
          {type}
        </span>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      <p className="text-slate-600 mb-4">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {pros.map((pro, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle2 size={16} className={`text-${color}-500`} />
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle, color = "indigo" }: {
  title: string;
  subtitle: string;
  color?: string;
}) => (
  <div className="text-center max-w-2xl mx-auto mb-16">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
      {title}
    </h2>
    <div className={`h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-${color}-400 to-${color}-200 mb-6`}></div>
    <p className="text-lg text-slate-600">{subtitle}</p>
  </div>
);

const BenchmarkCriterion = ({ title, text }: { title: string; text: string }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-1 p-1 bg-teal-50 rounded-full text-teal-600">
      <CheckCircle2 size={20} />
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  </div>
);

export default function HedgeFundPerformanceGuide() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'measuring-immeasurable-hedge-fund-performance-metrics');

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

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-8 left-8 z-20">
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
            Deep Research
          </div>
        </div>

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white pb-12 pt-24 lg:pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-60"></div>
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 left-0 -mt-20 -ml-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8 text-sm font-medium text-slate-600">
              <Activity size={16} className="text-indigo-500" />
              <span>Investment Performance Analysis</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
              Measuring the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Immeasurable</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
              A comprehensive guide to evaluating hedge fund strategies. From Alpha generation to handling complex cash flows, understand the metrics that matter.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-4 pb-16">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/wLwP2HW.jpeg" 
              alt="Hedge Fund Performance Metrics Infographic" 
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
          src="https://i.imgur.com/wLwP2HW.jpeg"
          alt="Hedge Fund Performance Metrics Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content Container */}
        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* Section 1: Core Calculation Methodologies */}
          <section id="calculations" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Core Calculation Methodologies" 
              subtitle="The foundation is choosing the correct return calculation method based on fund structure and liquidity."
              color="blue"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-blue-50 text-blue-600">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Time-Weighted Return (TWR)</h3>
                <div className="font-mono text-xs text-slate-500 bg-slate-50 p-3 rounded mb-4 border border-slate-100">
                  TWR = [(1 + R₁) × (1 + R₂) × ... × (1 + Rₙ)] - 1
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  The standard for measuring manager skill in liquid markets (e.g., public equities). Neutralizes the distorting effects of external client cash flows.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    <span>Isolates manager performance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    <span>Standard for liquid strategies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    <span>Requires daily valuations</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-green-50 text-green-600">
                  <DollarSign size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Money-Weighted Return (IRR)</h3>
                <div className="font-mono text-xs text-slate-500 bg-slate-50 p-3 rounded mb-4 border border-slate-100">
                  NPV = Σ[CFₜ / (1 + IRR)ᵗ] = 0
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Required metric for illiquid, closed-end funds (e.g., private equity). Manager controls capital timing, making timing part of performance assessment.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Reflects investor experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Standard for private equity</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span>Includes timing skill</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-purple-50 text-purple-600">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Modified Dietz</h3>
                <div className="font-mono text-xs text-slate-500 bg-slate-50 p-3 rounded mb-4 border border-slate-100">
                  R = (EMV - BMV - CF) / (BMV + WCF)
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  An approximation for TWR used when daily valuation isn't feasible. Weights cash flows by time remaining in period.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-purple-500" />
                    <span>Practical approximation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-purple-500" />
                    <span>Monthly valuations sufficient</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-purple-500" />
                    <span>Industry standard fallback</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Calculation Method Selection Framework</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <h4 className="font-bold text-white mb-2">Liquid Strategies</h4>
                  <p className="text-slate-300 text-sm mb-3">Long/Short Equity, Market Neutral, Arbitrage</p>
                  <div className="text-blue-400 font-mono text-sm">→ Use TWR</div>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <h4 className="font-bold text-white mb-2">Illiquid Strategies</h4>
                  <p className="text-slate-300 text-sm mb-3">Private Equity, Distressed Debt, Real Estate</p>
                  <div className="text-green-400 font-mono text-sm">→ Use IRR</div>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <h4 className="font-bold text-white mb-2">Mixed Liquidity</h4>
                  <p className="text-slate-300 text-sm mb-3">Multi-Strategy, Credit Opportunities</p>
                  <div className="text-purple-400 font-mono text-sm">→ Use Modified Dietz</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Risk-Adjusted Performance Metrics */}
          <section id="metrics" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Risk-Adjusted Performance Metrics" 
              subtitle="Returns must be evaluated relative to the risk taken. Raw returns without risk context are meaningless."
              color="indigo"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <MetricCard 
                title="Sharpe Ratio"
                icon={TrendingUp}
                formula="(Rp - Rf) / σp"
                description="The universal standard measuring excess return per unit of total volatility. Limited by assumptions of normal return distributions. Values above 1.0 are considered good, above 2.0 excellent."
                color="indigo"
              />
              
              <MetricCard 
                title="Sortino Ratio"
                icon={Shield}
                formula="(Rp - Rf) / σd"
                description="Improves on Sharpe by focusing only on downside volatility. More appropriate for hedge funds as upside volatility is desirable. Better reflects investor risk perception."
                color="emerald"
              />
              
              <MetricCard 
                title="Information Ratio"
                icon={BarChart3}
                formula="(Rp - Rb) / Tracking Error"
                description="The key metric for active managers. Measures excess return relative to benchmark per unit of active risk. Values above 0.5 indicate skill, above 1.0 exceptional skill."
                color="cyan"
              />
              
              <MetricCard 
                title="Calmar Ratio"
                icon={AlertCircle}
                formula="Annual Return / Max Drawdown"
                description="Critical for evaluating leveraged strategies. Measures return per unit of worst-case loss. Particularly important for CTA and macro strategies with high volatility."
                color="orange"
              />
              
              <MetricCard 
                title="Sterling Ratio"
                icon={Activity}
                formula="Annual Return / Avg Drawdown"
                description="Similar to Calmar but uses average of largest drawdowns over time. Provides more stable measure for strategies with multiple significant drawdowns."
                color="rose"
              />
              
              <MetricCard 
                title="Omega Ratio"
                icon={Target}
                formula="∫[1-F(x)]dx / ∫F(x)dx"
                description="Considers entire return distribution, not just first two moments. Captures skewness and kurtosis effects crucial for option-heavy strategies and tail risk assessment."
                color="purple"
              />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <AlertCircle className="text-red-500" /> Drawdown Analysis Framework
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-700 mb-4">Key Drawdown Metrics</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-red-800">Maximum Drawdown</span>
                        <span className="text-xs font-mono bg-red-100 px-2 py-1 rounded text-red-700">Peak-to-Trough</span>
                      </div>
                      <p className="text-sm text-red-700">Worst single loss period. Critical for risk budgeting and leverage decisions.</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-orange-800">Average Drawdown</span>
                        <span className="text-xs font-mono bg-orange-100 px-2 py-1 rounded text-orange-700">Mean of All DD</span>
                      </div>
                      <p className="text-sm text-orange-700">Typical loss magnitude. Better for strategies with frequent small drawdowns.</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-yellow-800">Recovery Time</span>
                        <span className="text-xs font-mono bg-yellow-100 px-2 py-1 rounded text-yellow-700">Time to New High</span>
                      </div>
                      <p className="text-sm text-yellow-700">How long to recover from drawdowns. Critical for investor psychology.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h4 className="font-bold text-slate-700 mb-4">Drawdown Severity Classification</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">0% - 5%</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Low Risk</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">5% - 10%</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Moderate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">10% - 20%</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">High Risk</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">20%+</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Extreme</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>Note:</strong> Acceptable drawdown levels vary by strategy. Market neutral funds should stay under 5%, while global macro funds may accept 15-20%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Cash Flow Analysis */}
          <section id="flows" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Cash Flow Impact Analysis" 
              subtitle="Timing matters. How we handle deposits and withdrawals drastically changes the performance picture."
              color="purple"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <FlowConcept 
                title="Time-Weighted Return (TWR)"
                type="Manager Focused"
                color="blue"
                icon={Clock}
                description="Calculates the compound rate of growth over a period. It eliminates the distorting effects of cash inflows and outflows by breaking the measurement period into sub-periods."
                pros={[
                  "Isolates manager's skill from client timing",
                  "Standard for comparing fund managers",
                  "Links sub-period returns geometrically",
                  "Indifferent to the size of AUM at any point"
                ]}
              />
              
              <FlowConcept 
                title="Money-Weighted Return (MWR)"
                type="Investor Focused"
                color="pink"
                icon={DollarSign}
                description="Essentially the Internal Rate of Return (IRR). It accounts for the size and timing of cash flows, reflecting the actual wealth generation experience of the investor."
                pros={[
                  "Reflects actual wealth generation",
                  "Heavily impacted by timing of deposits",
                  "Good for evaluating personal portfolio growth",
                  "Penalizes managers if they call capital before a dip"
                ]}
              />
            </div>

            <div className="mt-8 p-8 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">The "Cash Drag" Dilemma</h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    In hedge funds, managing cash flow is critical. A large inflow of cash (subscription) creates "cash drag"—diluting performance until deployed. Managers often use <strong>Subscription Lines</strong> or <strong>Equalization</strong> methods to ensure new investors don't dilute existing returns or inherit unrealized gains unfairly.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                      <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Solution 1</span>
                      <span className="font-semibold text-white block mb-2">Equalization Credits</span>
                      <p className="text-xs text-slate-400">New investors pay for unrealized gains</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                      <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Solution 2</span>
                      <span className="font-semibold text-white block mb-2">Series Accounting</span>
                      <p className="text-xs text-slate-400">Separate share classes by entry date</p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Fund Return (TWR)</span>
                      <span className="text-emerald-400 font-mono font-bold">+12.5%</span>
                    </div>
                    <div className="h-px bg-white/10"></div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Investor A (Early Entry)</span>
                      <span className="text-white font-mono">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Investor B (Late Entry, MWR)</span>
                      <span className="text-white font-mono">+4.2%</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-500 italic">*Without proper methodology, timing dictates outcome</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Public Market Equivalents (PME) for Private Funds</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-700 mb-4">Kaplan-Schoar PME</h4>
                  <div className="font-mono text-xs text-slate-500 bg-slate-50 p-3 rounded mb-4 border border-slate-100">
                    PME = Σ(Distributions × FV Factor) / Σ(Contributions × FV Factor)
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Creates apples-to-apples comparison with public markets by investing contributions in a public index and comparing terminal values.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-blue-500" />
                      <span>PME &gt; 1.0 = Outperformed public markets</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-blue-500" />
                      <span>Accounts for irregular cash flows</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-700 mb-4">Direct Alpha Method</h4>
                  <div className="font-mono text-xs text-slate-500 bg-slate-50 p-3 rounded mb-4 border border-slate-100">
                    α = IRR_fund - IRR_public_equivalent
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Directly calculates the alpha by comparing IRRs of the private fund versus a public market equivalent with identical cash flow timing.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span>More intuitive alpha interpretation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span>Easier to communicate to investors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Attribution Analysis */}
          <section id="attribution" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Attribution Analysis" 
              subtitle="Decomposing returns to identify the true source of value creation and distinguish skill from luck."
              color="teal"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-teal-50 text-teal-600">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Brinson Model</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Used for long-only equity portfolios. Breaks excess return into three components to identify where value is being added or destroyed.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">Allocation Effect</h4>
                    <div className="font-mono text-xs text-blue-600 bg-blue-100 p-2 rounded mb-2">
                      Σ(wp - wb) × (rb - rB)
                    </div>
                    <p className="text-sm text-blue-700">Value from over/underweighting sectors relative to benchmark</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2">Selection Effect</h4>
                    <div className="font-mono text-xs text-green-600 bg-green-100 p-2 rounded mb-2">
                      Σwb × (rp - rb)
                    </div>
                    <p className="text-sm text-green-700">Value from picking better stocks within each sector</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <h4 className="font-semibold text-purple-800 mb-2">Interaction Effect</h4>
                    <div className="font-mono text-xs text-purple-600 bg-purple-100 p-2 rounded mb-2">
                      Σ(wp - wb) × (rp - rb)
                    </div>
                    <p className="text-sm text-purple-700">Combined effect of allocation and selection decisions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-orange-50 text-orange-600">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Factor Attribution Models</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Essential for hedge funds. Uses regression to determine how much return comes from systematic risk factors versus true manager skill ("alpha").
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="font-semibold text-slate-800 mb-2">Fama-French Model</h4>
                    <div className="font-mono text-xs text-slate-600 bg-slate-100 p-2 rounded mb-2">
                      R = α + β₁(MKT) + β₂(SMB) + β₃(HML) + ε
                    </div>
                    <p className="text-sm text-slate-700">Market, Size, and Value factors for equity strategies</p>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="font-semibold text-slate-800 mb-2">Fung-Hsieh Model</h4>
                    <div className="font-mono text-xs text-slate-600 bg-slate-100 p-2 rounded mb-2">
                      R = α + Σβᵢ(Factorᵢ) + ε
                    </div>
                    <p className="text-sm text-slate-700">Includes trend-following and option-like factors for hedge funds</p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="font-semibold text-red-800 mb-2">Alpha Interpretation</h4>
                    <p className="text-sm text-red-700">
                      <strong>α &gt; 0:</strong> Manager adds value beyond systematic factors<br/>
                      <strong>α ≈ 0:</strong> Returns explained by factor exposures<br/>
                      <strong>α &lt; 0:</strong> Manager destroys value after fees
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-8 rounded-3xl border border-teal-100">
              <h3 className="text-2xl font-bold text-teal-900 mb-6">Factor Model Selection by Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3">Equity Long/Short</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Market Beta (S&P 500)</li>
                    <li>• Size Factor (SMB)</li>
                    <li>• Value Factor (HML)</li>
                    <li>• Momentum Factor</li>
                    <li>• Quality Factor</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3">Global Macro</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Currency Carry</li>
                    <li>• Bond Trend Following</li>
                    <li>• Commodity Momentum</li>
                    <li>• Volatility Risk Premium</li>
                    <li>• Term Structure</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3">Credit Strategies</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Credit Spread Changes</li>
                    <li>• Default Risk Premium</li>
                    <li>• Term Structure</li>
                    <li>• Equity Market Beta</li>
                    <li>• Liquidity Factor</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Advanced Risk Management */}
          <section id="risk" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Advanced Risk Management" 
              subtitle="Forward-looking risk assessment complements historical performance analysis for comprehensive evaluation."
              color="red"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-red-50 text-red-600">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Value at Risk (VaR)</h3>
                <div className="font-mono text-xs text-slate-500 bg-slate-50 p-3 rounded mb-4 border border-slate-100">
                  VaR₉₅% = μ - 1.645σ (Normal Distribution)
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Estimates potential loss over a set period at a given confidence level. Standard risk measure but limited by distributional assumptions.
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-semibold text-red-800">1-Day 95% VaR</span>
                    <span className="text-xs font-mono bg-red-100 px-2 py-1 rounded text-red-700">Daily Risk</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-semibold text-orange-800">1-Month 99% VaR</span>
                    <span className="text-xs font-mono bg-orange-100 px-2 py-1 rounded text-orange-700">Stress Test</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-semibold text-yellow-800">Annual 95% VaR</span>
                    <span className="text-xs font-mono bg-yellow-100 px-2 py-1 rounded text-yellow-700">Capital Planning</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-purple-50 text-purple-600">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Conditional VaR (CVaR)</h3>
                <div className="font-mono text-xs text-slate-500 bg-slate-50 p-3 rounded mb-4 border border-slate-100">
                  CVaR = E[Loss | Loss &gt; VaR]
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Superior measure that calculates average loss in worst-case tail beyond VaR threshold. Captures extreme "tail risk" better than VaR.
                </p>
                
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-3">Why CVaR is Superior</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <CheckCircle2 size={16} className="text-purple-500" />
                      <span>Coherent risk measure (subadditive)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <CheckCircle2 size={16} className="text-purple-500" />
                      <span>Captures tail risk beyond VaR</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <CheckCircle2 size={16} className="text-purple-500" />
                      <span>Better for portfolio optimization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <CheckCircle2 size={16} className="text-purple-500" />
                      <span>Regulatory preference (Basel III)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity className="text-blue-500" /> Risk Measurement Methodologies
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-3">Parametric Method</h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Assumes normal distribution. Fast computation but poor for fat-tailed returns common in hedge funds.
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs text-blue-600">
                      <strong>Pros:</strong> Fast, simple, analytical
                    </div>
                    <div className="text-xs text-blue-600">
                      <strong>Cons:</strong> Normality assumption
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-800 mb-3">Historical Simulation</h4>
                  <p className="text-sm text-green-700 mb-4">
                    Uses actual historical returns. No distributional assumptions but limited by historical data availability.
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs text-green-600">
                      <strong>Pros:</strong> No assumptions, actual data
                    </div>
                    <div className="text-xs text-green-600">
                      <strong>Cons:</strong> Limited by history
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="font-bold text-purple-800 mb-3">Monte Carlo</h4>
                  <p className="text-sm text-purple-700 mb-4">
                    Simulates thousands of scenarios. Most flexible but computationally intensive and model-dependent.
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs text-purple-600">
                      <strong>Pros:</strong> Flexible, comprehensive
                    </div>
                    <div className="text-xs text-purple-600">
                      <strong>Cons:</strong> Model risk, complex
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-900 to-red-800 p-8 rounded-3xl text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-red-300">Stress Testing Framework</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-4">Historical Stress Tests</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-white">2008 Financial Crisis</div>
                      <div className="text-xs text-red-300">Credit spreads, equity crash, liquidity crisis</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-white">COVID-19 March 2020</div>
                      <div className="text-xs text-red-300">Rapid deleveraging, correlation breakdown</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-white">LTCM 1998</div>
                      <div className="text-xs text-red-300">Convergence trade failure, leverage unwind</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-white mb-4">Hypothetical Scenarios</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-white">Interest Rate Shock</div>
                      <div className="text-xs text-red-300">+200bp parallel shift, curve steepening</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-white">Currency Crisis</div>
                      <div className="text-xs text-red-300">Major currency devaluation, carry unwind</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold text-white">Volatility Spike</div>
                      <div className="text-xs text-red-300">VIX to 50+, correlation increase</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Benchmark Selection */}
          <section id="benchmarks" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Benchmark Selection" 
              subtitle="Selecting an appropriate, investable benchmark is crucial for fair comparison. Benchmarks must meet strict criteria."
              color="emerald"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Left Col: Strategy Map */}
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Scale className="text-emerald-500" /> Strategy Alignment
                </h3>
                
                <div className="space-y-6">
                  <div className="group p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700">Long/Short Equity</span>
                      <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">Correlation: High</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Often benchmarked against broad equity indices like the S&P 500 or MSCI World, sometimes with a beta-adjustment (e.g., 50% S&P 500).
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-200 text-slate-700">S&P 500</span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-200 text-slate-700">Russell 2000</span>
                    </div>
                  </div>

                  <div className="group p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700">Global Macro</span>
                      <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">Correlation: Low</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Hard to benchmark due to flexibility. Often uses an "Absolute Return" hurdle (e.g., Cash + 5%) or a composite of global bonds/equities.
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-200 text-slate-700">Risk-Free Rate + Spread</span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-200 text-slate-700">60/40 Global</span>
                    </div>
                  </div>

                  <div className="group p-4 rounded-xl bg-slate-50 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700">Distressed Debt</span>
                      <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">Correlation: Med</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Benchmarked against High Yield indices or specific Distressed Debt peer group indices.
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-200 text-slate-700">ICE BofA High Yield</span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-200 text-slate-700">HFRX Distressed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Col: SAMURAI Criteria */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8 p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-2">The "SAMURAI" Check</h3>
                <p className="text-sm text-emerald-700 mb-6">
                  A good benchmark must adhere to strict properties to be valid for performance comparison.
                </p>
                
                <div className="space-y-6">
                  <BenchmarkCriterion 
                    title="Specified in Advance"
                    text="The benchmark cannot be cherry-picked after seeing the results."
                  />
                  <BenchmarkCriterion 
                    title="Appropriate"
                    text="It must reflect the manager's investment style and geographic focus."
                  />
                  <BenchmarkCriterion 
                    title="Measurable"
                    text="Its value can be determined on a frequent basis."
                  />
                  <BenchmarkCriterion 
                    title="Unambiguous"
                    text="The identities and weights of securities are clearly defined."
                  />
                  <BenchmarkCriterion 
                    title="Reflective"
                    text="It should reflect current investment opportunities available to the manager."
                  />
                  <BenchmarkCriterion 
                    title="Accountable"
                    text="The manager should accept the benchmark as a fair measure of their performance."
                  />
                  <BenchmarkCriterion 
                    title="Investable"
                    text="It represents an alternative the investor could actually purchase (e.g., an ETF)."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Reporting & Communication */}
          <section id="reporting" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Reporting & Communication" 
              subtitle="Effective synthesis and presentation are the final steps in performance evaluation. GIPS compliance ensures fair representation."
              color="indigo"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-indigo-50 text-indigo-600">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">GIPS Standards</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Global Investment Performance Standards ensure fair representation and comparability across managers and time periods.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <h4 className="font-semibold text-indigo-800 mb-2">Composite Construction</h4>
                    <p className="text-sm text-indigo-700">All fee-paying, discretionary portfolios managed according to the same strategy must be included.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">Performance Calculation</h4>
                    <p className="text-sm text-blue-700">Must use time-weighted returns for periods of one year or longer, with monthly valuations minimum.</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <h4 className="font-semibold text-purple-800 mb-2">Disclosure Requirements</h4>
                    <p className="text-sm text-purple-700">Must disclose fee structure, benchmark, number of portfolios, and any material changes to strategy.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-green-50 text-green-600">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Essential Reporting Tools</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Professional reports combine metrics, attribution, and risk analysis using intuitive visualizations.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-800 mb-2">Growth Charts</h4>
                    <p className="text-sm text-green-700">Show cumulative performance vs benchmark over time. Essential for visualizing long-term value creation.</p>
                  </div>
                  
                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                    <h4 className="font-semibold text-teal-800 mb-2">Underwater Charts</h4>
                    <p className="text-sm text-teal-700">Display drawdown periods and recovery times. Critical for understanding risk profile and investor experience.</p>
                  </div>
                  
                  <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                    <h4 className="font-semibold text-cyan-800 mb-2">Rolling Window Analysis</h4>
                    <p className="text-sm text-cyan-700">Shows performance consistency across different time periods. Reveals strategy robustness and regime dependence.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-100 mb-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6">Professional Reporting Framework</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-indigo-600 mb-3">
                    <TrendingUp size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Performance Summary</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Total Return (Net/Gross)</li>
                    <li>• Benchmark Comparison</li>
                    <li>• Risk-Adjusted Metrics</li>
                    <li>• Volatility Analysis</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-green-600 mb-3">
                    <Target size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Attribution Analysis</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Factor Exposures</li>
                    <li>• Alpha Decomposition</li>
                    <li>• Sector/Security Attribution</li>
                    <li>• Style Analysis</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-red-600 mb-3">
                    <Shield size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Risk Assessment</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• VaR/CVaR Analysis</li>
                    <li>• Stress Test Results</li>
                    <li>• Correlation Analysis</li>
                    <li>• Tail Risk Metrics</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-purple-600 mb-3">
                    <BarChart3 size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Market Context</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Market Environment</li>
                    <li>• Peer Comparison</li>
                    <li>• Strategy Commentary</li>
                    <li>• Outlook Discussion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-indigo-300">Key Performance Reporting Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-4">Transparency Requirements</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Fee Disclosure</div>
                        <div className="text-xs text-slate-400">Show both gross and net returns with clear fee breakdown</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Methodology Explanation</div>
                        <div className="text-xs text-slate-400">Document calculation methods and any changes over time</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Risk Warnings</div>
                        <div className="text-xs text-slate-400">Clearly state limitations and potential risks of the strategy</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-white mb-4">Communication Best Practices</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Context Matters</div>
                        <div className="text-xs text-slate-400">Always provide market environment and strategy context</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Visual Clarity</div>
                        <div className="text-xs text-slate-400">Use charts and graphs to make complex data accessible</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Forward-Looking</div>
                        <div className="text-xs text-slate-400">Include outlook and strategy evolution discussion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-50 text-slate-400 mb-6">
              <Zap size={24} />
            </div>
            <p className="text-slate-500 mb-4">Designed for Financial Analysts & Portfolio Managers</p>
            <div className="text-sm text-slate-400">
              &copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
