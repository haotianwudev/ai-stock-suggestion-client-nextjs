'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Activity, BarChart3, Target, Shield, AlertCircle, Clock, DollarSign, Scale, CheckCircle2, Zap, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

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
  const [activeTab, setActiveTab] = useState('metrics');
  const currentArticle = articles.find(article => article.slug === 'measuring-immeasurable-hedge-fund-performance-metrics');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

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
        <header className="relative overflow-hidden bg-white pb-20 pt-24 lg:pb-28">
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

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img 
              src="https://i.imgur.com/wLwP2HW.jpeg" 
              alt="Hedge Fund Performance Metrics Infographic" 
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Main Content Container */}
        <main className="container mx-auto px-6 -mt-10 relative z-10 pb-24">
          {/* Navigation Tabs (Sticky) */}
          <div className="sticky top-6 z-50 flex justify-center mb-16">
            <div className="bg-white/80 backdrop-blur-lg p-1.5 rounded-2xl shadow-lg border border-white/20 inline-flex gap-1">
              {['metrics', 'flows', 'benchmarks'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Performance Metrics */}
          <section id="metrics" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Core Performance Metrics" 
              subtitle="The mathematical lens through which we evaluate risk-adjusted returns."
              color="indigo"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard 
                title="Sharpe Ratio"
                icon={TrendingUp}
                formula="(Rp - Rf) / σp"
                description="The industry standard for risk-adjusted return. It measures excess return per unit of total risk (volatility). A higher ratio indicates better historical risk-adjusted performance."
                color="indigo"
              />
              
              <MetricCard 
                title="Sortino Ratio"
                icon={Shield}
                formula="(Rp - Rf) / σd"
                description="Similar to Sharpe, but only penalizes downside volatility. This is crucial for hedge funds, as upside volatility (unexpected high gains) is generally desirable."
                color="emerald"
              />
              
              <MetricCard 
                title="Alpha (α)"
                icon={Target}
                formula="Rp - [Rf + β(Rm - Rf)]"
                description="The measure of active return on an investment. It gauges the performance of an investment against a market index or benchmark which is considered to represent the market's movement as a whole."
                color="rose"
              />
              
              <MetricCard 
                title="Beta (β)"
                icon={Activity}
                formula="Cov(Rp, Rm) / Var(Rm)"
                description="A measure of the volatility—or systematic risk—of a security or portfolio compared to the market as a whole. A beta of 1.5 implies the asset is 50% more volatile than the market."
                color="amber"
              />
              
              <MetricCard 
                title="Maximum Drawdown"
                icon={AlertCircle}
                formula="Min(Peak to Trough)"
                description="The maximum observed loss from a peak of a portfolio, before a new peak is attained. It is a key indicator of downside risk over a specified time period."
                color="orange"
              />
              
              <MetricCard 
                title="Information Ratio"
                icon={BarChart3}
                formula="(Rp - Rb) / Tracking Error"
                description="Measures portfolio returns beyond the returns of a benchmark, compared to the volatility of those returns. Ideally, you want a high excess return with low tracking error."
                color="cyan"
              />
            </div>
          </section>

          {/* Section 2: Flow Calculation */}
          <section id="flows" className="scroll-mt-32 mb-32">
            <SectionHeader 
              title="Accounting for Cash Flows" 
              subtitle="Timing matters. How we handle deposits and withdrawals drastically changes the performance picture."
              color="purple"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FlowConcept 
                title="Time-Weighted Return (TWR)"
                type="Manager Focused"
                color="blue"
                icon={Clock}
                description="Calculates the compound rate of growth over a period. It eliminates the distorting effects of cash inflows and outflows."
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
                description="Essentially the Internal Rate of Return (IRR). It accounts for the size and timing of cash flows, reflecting the actual experience of the investor."
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
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <span className="block text-xs text-slate-400 uppercase tracking-wider">Solution 1</span>
                      <span className="font-semibold text-white">Equalization Credits</span>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <span className="block text-xs text-slate-400 uppercase tracking-wider">Solution 2</span>
                      <span className="font-semibold text-white">Series Accounting</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Fund Return</span>
                      <span className="text-emerald-400 font-mono font-bold">+12.5%</span>
                    </div>
                    <div className="h-px bg-white/10"></div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Investor A (Early)</span>
                      <span className="text-white font-mono">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Investor B (Late Entry)</span>
                      <span className="text-white font-mono">+4.2%</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-500 italic">*Without TWR, timing dictates the outcome.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Benchmarks */}
          <section id="benchmarks" className="scroll-mt-32">
            <SectionHeader 
              title="Benchmark Selection" 
              subtitle="You can't hit a target you haven't defined. Picking the right yardstick is an art form."
              color="emerald"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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

              {/* Right Col: Criteria */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8 p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-2">The "SAMURAI" Check</h3>
                <p className="text-sm text-emerald-700 mb-6">
                  A good benchmark must adhere to strict properties to be valid.
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
                    title="Investable"
                    text="It represents an alternative the investor could actually purchase (e.g., an ETF)."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
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
