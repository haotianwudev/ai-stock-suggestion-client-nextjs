'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Waves, GitGraph, TrendingUp, Filter, Search, CheckCircle2, XCircle, Info, Sigma, Clock, RefreshCw, Target, Scale, AlertTriangle, Layers, Cpu, Zap, BookOpen, Brain, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function SignalNoiseFilteringGuide() {
  const currentArticle = articles.find(article => article.slug === 'signal-noise-comprehensive-analysis-filtering-techniques-quantitative-trading');
  const [activeTab, setActiveTab] = useState('ma');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const Section = ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <section id={id} className="mb-12">
      {children}
    </section>
  );

  const SubHeading = ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h2 id={id} className="text-3xl font-bold text-gray-900 mb-6 mt-12">
      {children}
    </h2>
  );

  const SubSubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
      {children}
    </h3>
  );

  const toolkitData: Record<string, any> = {
    ma: {
      title: "Moving Averages (MAs)",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Moving averages are the bedrock of technical analysis, acting as the simplest form of low-pass filter. They work by averaging price data over a specified lookback window to dampen short-term fluctuations and highlight longer-term trends.",
      applications: [
        "Trend Identification (e.g., price above 200-day SMA)",
        "Support/Resistance Levels",
        "Crossover Strategies (e.g., Golden Cross: 50-day crosses above 200-day)"
      ],
      tradeoff: "The eternal compromise: increasing the lookback period reduces noise (smoothness) but increases lag, potentially delaying entry/exit signals."
    },
    kf: {
      title: "Kalman Filter",
      icon: <Activity className="w-5 h-5" />,
      description: "The Kalman Filter is a recursive, optimal estimator for linear dynamic systems with Gaussian noise. Unlike MAs with fixed windows, it continuously updates its estimates based on new data and its own uncertainty, making it highly adaptive.",
      applications: [
        "Pairs Trading: Dynamically estimating the hedge ratio (beta) between two assets",
        "Volatility Estimation: Tracking time-varying volatility more accurately",
        "Market Microstructure: Estimating true 'efficient' price from noisy tick data"
      ],
      tradeoff: "Provides optimal estimates if its assumptions (linearity, Gaussian noise) hold. Violating these can lead to poor performance. Requires careful tuning of internal noise parameters."
    },
    bw: {
      title: "Butterworth Filter",
      icon: <Waves className="w-5 h-5" />,
      description: "Originating in electrical engineering, the Butterworth filter is designed to have a frequency response that is as flat as possible in the passband. In trading, this means it can smooth data while preserving the amplitude of important trend cycles better than simple MAs.",
      applications: [
        "Creating smoother technical indicators (e.g., filtering RSI)",
        "High-frequency trading for cleaning tick data with minimal phase shift"
      ],
      tradeoff: "Superior noise reduction with less lag than comparable MAs in its passband, but can introduce 'ringing' (overshoot) near sharp price changes."
    },
    hp: {
      title: "Hodrick-Prescott (HP) Filter",
      icon: <GitGraph className="w-5 h-5" />,
      description: "The HP filter is a standard tool in macroeconomics for separating a time series into a smooth 'trend' component and a cyclical component. It does this by minimizing a loss function that balances tracking the original series against keeping the trend smooth.",
      applications: [
        "Macroeconomic Analysis: Identifying business cycles",
        "Mean-Reversion Strategies: Trading the cyclical component"
      ],
      tradeoff: "Excellent for historical analysis and cycle identification, but its non-causal nature allows it to 'peek' into the future, creating unrealistic performance in backtests if not handled correctly."
    }
  };

  return (
    <>

      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 py-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-20 left-4 z-40">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Deep Research
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Finding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Signal</span> in the Market Noise
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                A deep dive into the mathematical and computational techniques used in quantitative finance to extract durable, predictive patterns from chaotic market data.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>November 22, 2025</span>
                <span>•</span>
                <span>Quantitative Analysis</span>
                <span>•</span>
                <span>Signal Processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Signal vs Noise Filtering Techniques Infographic" 
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
        )}

        {/* Full-screen image viewer */}
        {currentArticle?.imageUrl && (
          <FullScreenImageViewer
            src={currentArticle.imageUrl}
            alt="Signal vs Noise Filtering Techniques Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">

            {/* Section 1: Foundations */}
            <Section id="foundations">
              <SubHeading id="section-foundations">Part I: The Core Challenge</SubHeading>
              
              <p className="text-gray-700 leading-relaxed mb-8">
                Financial markets are noisy environments. Successfully trading them requires rigorously distinguishing between meaningful information and random chatter.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg mr-3">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    The Signal
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    A signal is a persistent, identifiable pattern that carries predictive information about future price movements. It represents the "true" underlying state of the market, often driven by fundamental economic forces, structural market inefficiencies, or sustained investor behavior.
                  </p>
                  <ul className="space-y-2 mb-6 text-slate-700">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 shrink-0"></div>
                      <strong>Persistent:</strong> Lasts long enough to be exploitable.
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 shrink-0"></div>
                      <strong>Predictive:</strong> Offers a probabilistic edge over random guessing.
                    </li>
                  </ul>
                  <div className="text-sm font-medium text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-full">
                    High Information Content
                  </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative overflow-hidden">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg mr-3">
                      <XCircle className="h-6 w-6" />
                    </div>
                    The Noise
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    Noise consists of random, short-term price fluctuations that obscure the true signal. It can arise from microstructure effects (bid-ask bounce), transient news, unsophisticated trading flow, or simple random variation.
                  </p>
                  <ul className="space-y-2 mb-6 text-slate-700">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 shrink-0"></div>
                      <strong>Erratic:</strong> Lacks a discernible, repeatable pattern.
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 shrink-0"></div>
                      <strong>Non-predictive:</strong> Provides no reliable information about future direction.
                    </li>
                  </ul>
                  <div className="text-sm font-medium text-rose-600 bg-rose-50 inline-block px-3 py-1 rounded-full">
                    High Entropy, Low Value
                  </div>
                </div>
              </div>

              <SubSubHeading>The Mathematical Framework: State-Space Models</SubSubHeading>
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-8">
                <p className="text-lg text-slate-300 mb-8">
                  To rigorously separate signal from noise, quants often use <strong>State-Space Models</strong>. These models formally define a hidden "true" state that evolves over time and is only indirectly observed through noisy measurements.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                    <div className="text-indigo-300 mb-3 font-semibold flex items-center">
                      <Activity className="w-4 h-4 mr-2"/> The State Equation
                    </div>
                    <div className="text-lg mb-4 font-mono">x<sub>t+1</sub> = F<sub>t</sub> x<sub>t</sub> + w<sub>t</sub></div>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      Describes how the true, hidden state (x<sub>t</sub>) evolves from one time step to the next. F<sub>t</sub> is the state transition model, and w<sub>t</sub> is process noise.
                    </p>
                  </div>

                  <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                    <div className="text-indigo-300 mb-3 font-semibold flex items-center">
                      <Search className="w-4 h-4 mr-2"/> The Observation Equation
                    </div>
                    <div className="text-lg mb-4 font-mono">y<sub>t</sub> = H<sub>t</sub> x<sub>t</sub> + v<sub>t</sub></div>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      Relates the noisy measurements we actually see (y<sub>t</sub>, e.g., market prices) to the hidden state. H<sub>t</sub> is the observation model, and v<sub>t</sub> is measurement noise.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 2: Toolkit */}
            <Section id="toolkit">
              <SubHeading id="section-toolkit">Part II: Practitioner's Toolkit</SubHeading>
              
              <p className="text-gray-700 leading-relaxed mb-8">
                A spectrum of tools from simple heuristics to optimal estimation algorithms.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {Object.entries(toolkitData).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      activeTab === key
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300'
                    }`}
                  >
                    <span className="mr-2">{data.icon}</span>
                    {data.title}
                  </button>
                ))}
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-3xl p-8 border border-slate-200 mb-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl mr-4">
                    {toolkitData[activeTab].icon}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">
                    {toolkitData[activeTab].title}
                  </h3>
                </div>
                
                <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                  {toolkitData[activeTab].description}
                </p>

                {activeTab === 'ma' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Types of Moving Averages</h4>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <div className="flex items-center mb-2">
                            <Sigma className="w-4 h-4 text-indigo-500 mr-2" />
                            <span className="font-semibold">Simple (SMA)</span>
                          </div>
                          <p className="text-sm text-slate-600">An unweighted arithmetic mean of the last N prices. Equal weight to all data points in the window.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <div className="flex items-center mb-2">
                            <Clock className="w-4 h-4 text-purple-500 mr-2" />
                            <span className="font-semibold">Exponential (EMA)</span>
                          </div>
                          <p className="text-sm text-slate-600">Applies exponentially decreasing weights to older data. More responsive to recent price changes than SMA.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                          <div className="flex items-center mb-2">
                            <Filter className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="font-semibold">Weighted (WMA)</span>
                          </div>
                          <p className="text-sm text-slate-600">Assigns weights that decrease linearly. Offers a middle ground between SMA and EMA in terms of responsiveness.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Key Characteristics</h4>
                      <ul className="list-disc pl-5 space-y-2 text-slate-700">
                        <li><strong>Lag:</strong> All MAs introduce lag. The longer the lookback period, the greater the lag, but the smoother the output.</li>
                        <li><strong>Simplicity:</strong> Easy to calculate, understand, and implement, making them ubiquitous.</li>
                        <li><strong>Trend Following:</strong> Excellent for identifying and remaining in established trends but prone to "whipsaws" in sideways markets.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'kf' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">The Two-Step Process</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                        <li><strong>Predict:</strong> The filter uses its current state estimate to predict the next state and its uncertainty.</li>
                        <li><strong>Update (Correct):</strong> When a new measurement arrives, the filter corrects its prediction based on the difference between the predicted and actual measurement, weighted by the <em>Kalman Gain</em>.</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Why it's Powerful</h4>
                      <ul className="list-disc pl-5 space-y-2 text-slate-700">
                        <li><strong>Adaptivity:</strong> The Kalman Gain automatically adjusts. If measurements are noisy, it trusts its model more; if the model is uncertain, it trusts new data more.</li>
                        <li><strong>No Fixed Window:</strong> It uses all historical data efficiently without needing to store it all, unlike a simple moving average.</li>
                        <li><strong>Handles Missing Data:</strong> Can still make predictions even if some observations are dropped.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'bw' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">Frequency Domain Focus</h4>
                      <p className="text-slate-700 mb-3">
                        Unlike MAs which operate purely in the time domain, Butterworth filters are best understood in the frequency domain. They are typically used as <strong>low-pass filters</strong>, allowing low-frequency components (trends) to pass while attenuating high-frequency components (noise).
                      </p>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
                      <h5 className="font-semibold text-slate-900 mb-1 flex items-center">
                        <Info className="w-4 h-4 mr-2 text-indigo-500"/> Critical Parameter: Cutoff Frequency
                      </h5>
                      <p className="text-sm text-slate-600">
                        The "cutoff frequency" determines the threshold between signal and noise. Setting this correctly is crucial: too high, and too much noise gets through; too low, and valuable trend information is lost (oversmoothing).
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'hp' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">The Smoothing Parameter (λ)</h4>
                      <p className="text-slate-700 mb-3">
                        The filter's behavior is governed entirely by the penalty parameter, lambda (λ). A higher λ forces a smoother trend (approaching a straight line as λ → ∞), while a lower λ allows the trend to track the raw data more closely.
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2 text-sm">
                        <div className="bg-slate-100 px-3 py-2 rounded">Standard λ for Quarterly Data: <strong>1600</strong></div>
                        <div className="bg-slate-100 px-3 py-2 rounded">Standard λ for Annual Data: <strong>100</strong> or <strong>6.25</strong></div>
                        <div className="bg-slate-100 px-3 py-2 rounded sm:col-span-2">Standard λ for Daily Data: often much higher, e.g., <strong>10<sup>5</sup> to 10<sup>8</sup></strong></div>
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                      <h5 className="font-semibold text-red-900 mb-1 flex items-center">
                        <Info className="w-4 h-4 mr-2 text-red-500"/> The "End-Point Problem"
                      </h5>
                      <p className="text-sm text-red-700">
                        Standard HP filters are <strong>two-sided</strong>, meaning the estimate at time t uses future data (t+1, t+2...). This makes them non-causal and unsuitable for real-time trading without modification (e.g., using a one-sided variant).
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Key Applications</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {toolkitData[activeTab].applications.map((app: string, i: number) => (
                      <li key={i} className="flex items-start bg-white p-3 rounded-lg text-sm border border-slate-100">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <h4 className="text-lg font-bold mb-3 flex items-center text-orange-800">
                    <Filter className="h-5 w-5 mr-2" />The Critical Trade-off
                  </h4>
                  <p className="text-orange-800/80 italic leading-relaxed">
                    "{toolkitData[activeTab].tradeoff}"
                  </p>
                </div>
              </div>
            </Section>

            {/* Section 3: Pipeline */}
            <Section id="pipeline">
              <SubHeading id="section-pipeline">Part III: The Filtering Pipeline</SubHeading>
              
              <p className="text-gray-700 leading-relaxed mb-12">
                In a mature quantitative system, filtering is a multi-stage process integrated into the entire research and execution workflow.
              </p>

              <div className="space-y-16">
                {/* Stage 1 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-900 mb-2">Stage 1: Preprocessing & Data Hygiene</h3>
                    <p className="text-lg font-medium text-indigo-600 mb-4">Garbage In, Garbage Out</p>
                    <p className="text-slate-600 leading-relaxed">
                      Before any sophisticated analysis, raw data must be cleaned. This involves detecting and handling outliers (bad ticks), dealing with missing values, and adjusting for corporate actions. Simple filters like rolling median or standard deviation bands are often used here to flag anomalies.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100">
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Outlier detection using rolling statistics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Missing data imputation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Corporate action adjustments</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Dynamic beta estimation (Kalman filter)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Cycle indicators (HP filter)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Momentum oscillators (MA combinations)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="inline-block p-3 bg-purple-100 text-purple-600 rounded-2xl mb-4">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-900 mb-2">Stage 2: Feature Engineering</h3>
                    <p className="text-lg font-medium text-purple-600 mb-4">Transforming Data into Alpha Factors</p>
                    <p className="text-slate-600 leading-relaxed">
                      Here, filters transform raw price series into stationary, predictive features. For instance, a Kalman filter might output a dynamic beta, an HP filter might output a cycle indicator, and MAs might be combined to create momentum oscillators. These become inputs for trading rules or ML models.
                    </p>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block p-3 bg-pink-100 text-pink-600 rounded-2xl mb-4">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-pink-900 mb-2">Stage 3: Signal Generation & Execution</h3>
                    <p className="text-lg font-medium text-pink-600 mb-4">From Factors to Trades</p>
                    <p className="text-slate-600 leading-relaxed">
                      Filters can also act as final gates for trading. A "Regime Filter" might use a long-term Moving Average to determine if the market is in a "risk-on" or "risk-off" state, enabling or disabling entire strategies based on the macro environment.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-100">
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Regime classification filters</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Strategy enablement/disablement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Risk-on/risk-off determination</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 4: ML Synergy */}
            <Section id="ml-synergy">
              <SubHeading id="section-ml-synergy">Part IV: Synergy with Machine Learning</SubHeading>
              
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950 rounded-full inline-block border border-cyan-800">
                      The New Frontier
                    </span>
                    <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl mt-4">
                      Synergy with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Machine Learning</span>
                    </h3>
                    <p className="mt-4 text-xl text-slate-400 max-w-2xl">
                      Classical filtering and modern ML are not competitors; they are powerful complements. Together, they form hybrid systems that are both robust and highly adaptive.
                    </p>
                  </div>
                  <Brain className="hidden lg:block w-32 h-32 text-cyan-400/10" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
                    <div className="p-3 bg-cyan-950 rounded-xl inline-block mb-4">
                      <Layers className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Classical Filters as Features</h4>
                    <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                      Rather than feeding raw, noisy price data directly into ML models, experienced quants use classical filters to create high-quality input features.
                    </p>
                    <ul className="text-sm text-slate-500 space-y-2">
                      <li>• Kalman volatility estimates → Input for Option Pricing NN</li>
                      <li>• HP cycle component → Input for Mean Reversion Classifier</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
                    <div className="p-3 bg-purple-950 rounded-xl inline-block mb-4">
                      <Filter className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Feature Selection ("Filter Methods")</h4>
                    <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                      In ML, "filtering" also refers to selecting the most relevant features before training to prevent overfitting—a critical step when dealing with thousands of potential market indicators.
                    </p>
                    <ul className="text-sm text-slate-500 space-y-2">
                      <li>• Correlation thresholds (removing redundant features)</li>
                      <li>• Information Gain / Mutual Information scores</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50">
                    <div className="p-3 bg-pink-950 rounded-xl inline-block mb-4">
                      <RefreshCw className="w-6 h-6 text-pink-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Deep Learning Denoising</h4>
                    <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                      Advanced neural network architectures can learn to separate signal from noise directly from vast datasets without explicit mathematical rules.
                    </p>
                    <ul className="text-sm text-slate-500 space-y-2">
                      <li>• <strong>Autoencoders:</strong> Trained to reconstruct clean data from noisy inputs</li>
                      <li>• <strong>LSTMs/Transformers:</strong> Learn temporal dependencies beyond fixed windows</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Section>

            {/* Key Takeaways */}
            <Section id="takeaways">
              <SubHeading id="section-takeaways">Key Takeaways</SubHeading>
              
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4 shrink-0">
                    <Target className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Goal-Oriented</h4>
                    <p className="text-slate-600 text-sm">
                      The choice of filter depends entirely on the goal: trend following needs different tools than mean reversion or high-frequency execution.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4 shrink-0">
                    <Scale className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">The Inescapable Trade-off</h4>
                    <p className="text-slate-600 text-sm">
                      There is no free lunch. Every filter balances responsiveness (lag) against smoothness (noise reduction). You cannot maximize both simultaneously.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4 shrink-0">
                    <Layers className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Hybrid Future</h4>
                    <p className="text-slate-600 text-sm">
                      The most effective modern systems combine the interpretability of classical filters with the non-linear predictive power of machine learning.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4 shrink-0">
                    <AlertTriangle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Beware of Overfitting</h4>
                    <p className="text-slate-600 text-sm">
                      Complex filters (like deep learning) can easily "memorize" noise in historical data. Rigorous out-of-sample testing is essential.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Deep Research Section */}
            <Section id="deep-research">
              <SubHeading id="section-deep-research">Deep Research: Academic Foundations & Advanced Applications</SubHeading>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg shadow-sm">
                <h4 className="font-bold text-purple-800 text-xl mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Deep Research Paper: Signal Processing in Financial Markets
                </h4>
                <p className="text-lg text-purple-900 mb-4">
                  Academic research findings and theoretical models that underpin filtering techniques in quantitative finance, providing institutional-grade insights into signal extraction and noise reduction.
                </p>
              </div>

              <SubSubHeading>The Information Theory Perspective</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                From an information theory standpoint, financial markets can be viewed as communication channels where the "true" economic signal is transmitted through a noisy medium. Claude Shannon's foundational work on information theory provides the mathematical framework for understanding the fundamental limits of signal recovery in the presence of noise.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                The Signal-to-Noise Ratio (SNR) in financial markets is notoriously low, often estimated at 0.51 to 0.53 for directional prediction—barely above random chance. This makes the application of sophisticated filtering techniques not just beneficial but essential for extracting any exploitable edge.
              </p>

              <SubSubHeading>Optimal Filtering: The Wiener-Kolmogorov Theory</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Kalman filter, while powerful, is actually a special case of a broader class of optimal filters developed by Norbert Wiener and Andrey Kolmogorov in the 1940s. The Wiener filter is designed to minimize the mean square error between the estimated and true signal, making it theoretically optimal for stationary processes.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Key Theoretical Results:</h4>
                <ul className="space-y-3 text-gray-800">
                  <li><strong>Wiener-Hopf Equation:</strong> Provides the mathematical foundation for optimal linear filtering in the frequency domain.</li>
                  <li><strong>Kalman-Bucy Filter:</strong> The continuous-time version of the Kalman filter, used in high-frequency trading applications.</li>
                  <li><strong>Extended Kalman Filter (EKF):</strong> Handles non-linear dynamics through local linearization, applicable to option pricing and volatility modeling.</li>
                  <li><strong>Particle Filters:</strong> Non-parametric alternatives that can handle highly non-linear and non-Gaussian systems, increasingly used in regime-switching models.</li>
                </ul>
              </div>

              <SubSubHeading>Spectral Analysis and Market Cycles</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                Spectral analysis, particularly through Fourier transforms, reveals the frequency composition of price series. Research by John Ehlers and others has demonstrated that financial markets exhibit cyclical behavior at multiple time scales, from intraday patterns to multi-year business cycles.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                The HP filter's effectiveness stems from its ability to decompose time series into trend and cyclical components in a way that respects the spectral properties of economic data. However, its two-sided nature (using future data) makes it unsuitable for real-time applications without modification.
              </p>

              <SubSubHeading>Adaptive Filtering and Non-Stationarity</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                Financial markets are fundamentally non-stationary—their statistical properties change over time. This violates the assumptions of many classical filters and necessitates adaptive approaches:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 ml-4">
                <li><strong>Adaptive Kalman Filters:</strong> Dynamically adjust process and measurement noise covariances based on recent estimation errors.</li>
                <li><strong>Regime-Switching Models:</strong> Use Hidden Markov Models (HMMs) to identify distinct market regimes and apply different filters in each regime.</li>
                <li><strong>Time-Varying Parameter Models:</strong> Allow filter coefficients to evolve over time, capturing structural changes in market dynamics.</li>
                <li><strong>Wavelet Transforms:</strong> Provide multi-resolution analysis, decomposing signals into components at different time scales simultaneously.</li>
              </ul>

              <SubSubHeading>Empirical Performance Studies</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                Academic research has extensively tested filtering techniques in trading applications:
              </p>

              <div className="bg-slate-50 p-6 rounded-lg mb-6 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4">Notable Research Findings:</h4>
                <ul className="space-y-4 text-gray-700">
                  <li>
                    <strong>Brock, Lakonishok, and LeBaron (1992):</strong> Demonstrated that simple moving average crossover strategies generated significant excess returns in historical data, though profitability has declined with increased market efficiency.
                  </li>
                  <li>
                    <strong>Avellaneda and Lee (2010):</strong> Applied Kalman filtering to statistical arbitrage in equity pairs trading, showing improved hedge ratio estimation and risk-adjusted returns.
                  </li>
                  <li>
                    <strong>Ravn and Uhlig (2002):</strong> Provided theoretical justification for HP filter parameter selection based on the relative volatility of trend and cycle components.
                  </li>
                  <li>
                    <strong>Ehlers (2001):</strong> Introduced the MESA Adaptive Moving Average (MAMA), which adjusts its period based on the dominant cycle in the data, outperforming fixed-period MAs in trending markets.
                  </li>
                </ul>
              </div>

              <SubSubHeading>Machine Learning Integration: The Hybrid Approach</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                Recent research demonstrates that combining classical filters with machine learning yields superior results to either approach alone:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 ml-4">
                <li><strong>Feature Engineering:</strong> Using filtered signals as inputs to ML models improves prediction accuracy by 15-30% compared to raw price data (Dixon et al., 2017).</li>
                <li><strong>Ensemble Methods:</strong> Combining predictions from multiple filters using ML meta-learners reduces overfitting and improves out-of-sample performance.</li>
                <li><strong>Deep Learning Denoising:</strong> Convolutional autoencoders can learn optimal filter kernels directly from data, adapting to market-specific noise characteristics.</li>
                <li><strong>Reinforcement Learning:</strong> RL agents can learn when to trust filtered signals versus raw data, optimizing the trade-off between responsiveness and stability.</li>
              </ul>

              <SubSubHeading>Practical Implementation Challenges</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                Despite theoretical elegance, implementing filters in production trading systems presents several challenges:
              </p>

              <div className="bg-yellow-50 p-6 rounded-lg mb-6 border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-3">Key Implementation Considerations:</h4>
                <ul className="space-y-2 text-yellow-900 text-sm">
                  <li>• <strong>Computational Efficiency:</strong> Real-time filtering at high frequencies requires optimized implementations (e.g., using Cython or C++).</li>
                  <li>• <strong>Parameter Stability:</strong> Filter parameters optimized on historical data may not remain optimal as market conditions change.</li>
                  <li>• <strong>Look-Ahead Bias:</strong> Two-sided filters must be carefully handled in backtests to avoid unrealistic performance.</li>
                  <li>• <strong>Transaction Costs:</strong> More responsive filters generate more signals, potentially eroding profits through increased trading costs.</li>
                  <li>• <strong>Regime Detection:</strong> Identifying when to switch between different filtering approaches remains an active research area.</li>
                </ul>
              </div>

              <SubSubHeading>Future Research Directions</SubSubHeading>
              <p className="text-gray-700 leading-relaxed mb-6">
                The field continues to evolve with several promising research directions:
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 ml-4">
                <li><strong>Quantum Filtering:</strong> Exploring quantum computing approaches to signal processing that could handle exponentially larger state spaces.</li>
                <li><strong>Graph Neural Networks:</strong> Filtering signals across networks of related assets, capturing cross-sectional dependencies.</li>
                <li><strong>Causal Inference:</strong> Moving beyond correlation to identify causal relationships, improving filter robustness to regime changes.</li>
                <li><strong>Adversarial Robustness:</strong> Developing filters resistant to market manipulation and adversarial noise injection.</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-yellow-800 text-lg mb-3">Research Disclaimer</h4>
                <p className="text-yellow-900">
                  The academic research presented here is for educational purposes and represents ongoing areas of study. Market conditions, regulations, and trading technologies continue to evolve, potentially affecting the applicability of historical research findings. Past performance of filtering strategies does not guarantee future results, and all trading involves substantial risk of loss.
                </p>
              </div>
            </Section>

            {/* Google Doc Link */}
            {currentArticle?.googleDoc && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-12 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">📄 Full Research Document</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Access the complete quantitative analysis and detailed research behind this article.
                </p>
                <div className="text-center">
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
              </div>
            )}

            {/* Educational Disclaimer */}
            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 my-8 rounded-r-lg">
              <h4 className="font-bold text-gray-800 text-lg mb-3">Educational Disclaimer</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                This article is for educational and informational purposes only. The filtering techniques and strategies discussed involve substantial risk and are not suitable for all investors. The content presented here does not constitute financial advice, and readers should consult with qualified financial professionals before implementing any trading strategies. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 py-12 text-center text-slate-500">
          <div className="max-w-7xl mx-auto px-4">
            <Activity className="h-8 w-8 text-indigo-500 mx-auto mb-4" />
            <p className="mb-4 font-medium text-slate-400">
              "In the midst of chaos, there is also opportunity." — Sun Tzu
            </p>
            <p className="text-sm">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
