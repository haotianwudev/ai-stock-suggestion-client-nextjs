'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, BookOpen, Calculator, TrendingUp, Layers, BarChart3, AlertTriangle, Lightbulb, Zap, Globe, Maximize2, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const Formula = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-50 border border-slate-200 text-slate-800 p-5 rounded-xl overflow-x-auto my-6 text-base sm:text-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] leading-relaxed">
    <div className="flex items-center justify-center">
      {children}
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, colorFrom, colorTo }: { icon: React.ComponentType<{ size?: number }>, title: string, colorFrom: string, colorTo: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorFrom} ${colorTo} text-white shadow-lg`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
  </div>
);

const HighlightCard = ({ title, content, icon: Icon, color }: { title: string, content: string, icon: React.ComponentType<{ size?: number }>, color: string }) => (
  <div className={`p-6 rounded-2xl border-l-4 bg-white shadow-sm my-4`} style={{ borderLeftColor: color }}>
    <div className="flex items-center gap-3 mb-3">
      <Icon size={24} style={{ color }} />
      <h3 className="font-bold text-lg text-slate-800">{title}</h3>
    </div>
    <p className="text-slate-600 leading-relaxed">{content}</p>
  </div>
);

const Bullet = ({ children, colorClass = "bg-indigo-500" }: { children: React.ReactNode, colorClass?: string }) => (
  <li className="flex items-start gap-3 text-slate-700">
    <div className={`mt-2 w-2 h-2 rounded-full ${colorClass} shrink-0`}></div>
    <div className="flex-1 leading-relaxed">{children}</div>
  </li>
);

export default function VIXMathematicsArticle() {
  const currentArticle = articles.find(article => article.slug === 'mathematics-microstructure-cboe-vix');
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

      <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 pb-24">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative bg-white overflow-hidden border-b border-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white opacity-70"></div>
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-sm mb-6 border border-indigo-100">
              Advanced Quantitative Finance Tutorial
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 mb-6 leading-tight">
              The Mathematics & Microstructure <br /> of the Cboe VIX
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
              A comprehensive guide to the world's premier benchmark for equity market volatility. Explore the stochastic calculus, discrete approximation, variance swap replication, and structural market dynamics that power the "fear gauge."
            </p>
          </div>
        </header>

        {/* Hero Infographic with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/7aefF0v.jpeg" 
              alt="VIX Mathematics Infographic" 
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

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/7aefF0v.jpeg"
          alt="VIX Mathematics Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-5xl mx-auto px-6 mt-12 space-y-16">
          {/* Section 1: Intro */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <SectionHeader icon={BookOpen} title="Introduction to the VIX" colorFrom="from-blue-500" colorTo="to-cyan-500" />
            <div className="text-lg">
              <ul className="space-y-4">
                <Bullet colorClass="bg-blue-500">
                  <strong>Core Definition:</strong> The Chicago Board Options Exchange (Cboe) Volatility Index, globally recognized as the <strong>VIX</strong>, measures the 30-day expected volatility of the U.S. stock market.
                </Bullet>
                <Bullet colorClass="bg-blue-500">
                  <strong>Underlying Engine:</strong> It derives its value strictly from the real-time prices of S&P 500 Index (SPX) options across a wide range of strike prices.
                </Bullet>
                <Bullet colorClass="bg-blue-500">
                  <strong>Historical Evolution:</strong> Introduced in 1993 using Black-Scholes implied volatility (on the S&P 100), it was fundamentally updated in 2003 in partnership with Goldman Sachs to utilize a robust, model-free formula.
                </Bullet>
                <Bullet colorClass="bg-blue-500">
                  <strong>Beyond the "Fear Gauge":</strong> While popular media calls it a sentiment indicator, it is purely a mathematical construct representing forward-looking statistical variance, serving as the foundation for a massive ecosystem of futures and ETPs.
                </Bullet>
              </ul>
            </div>
          </section>

          {/* Section 2: Mathematics of Variance */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <SectionHeader icon={Calculator} title="The Rigorous Mathematics of Variance Replication" colorFrom="from-purple-500" colorTo="to-pink-500" />
            <div className="text-lg text-slate-700 leading-relaxed space-y-6">
              <p>
                To deconstruct the VIX, one must examine variance swaps. The VIX is fundamentally a discrete approximation of a 30-day variance swap's fair strike. Variance replication is rooted in continuous-time stochastic calculus:
              </p>
              <ul className="space-y-6">
                <li className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">1</div>
                    <strong className="text-slate-900">The Continuous Diffusion Process</strong>
                  </div>
                  <p className="text-slate-600 mb-3">
                    Assuming an asset price <span className="font-mono text-pink-600">S<sub>t</sub></span> follows a continuous diffusion process:
                  </p>
                  <Formula>
                    <span className="font-serif text-lg">
                      dS<sub>t</sub> / S<sub>t</sub> = &mu;<sub>t</sub> dt + &sigma;<sub>t</sub> dW<sub>t</sub>
                    </span>
                  </Formula>
                </li>
                <li className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">2</div>
                    <strong className="text-slate-900">Isolating Instantaneous Variance</strong>
                  </div>
                  <p className="text-slate-600 mb-3">
                    Applying Ito's Lemma to the natural logarithm of the asset price, and subtracting it from the standard percentage return, neatly isolates the variance:
                  </p>
                  <Formula>
                    <span className="font-serif text-lg">
                      dS<sub>t</sub> / S<sub>t</sub> &minus; d(ln S<sub>t</sub>) = &frac12; &sigma;<sub>t</sub><sup>2</sup> dt
                    </span>
                  </Formula>
                </li>
                <li className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">3</div>
                    <strong className="text-slate-900">Total Realized Variance</strong>
                  </div>
                  <p className="text-slate-600 mb-3">
                    Integrating this formula over a defined time horizon (from 0 to T) gives the total realized variance:
                  </p>
                  <Formula>
                    <span className="font-serif text-lg">
                      V = &int;<sub>0</sub><sup>T</sup> &sigma;<sub>t</sub><sup>2</sup> dt = 2 &int;<sub>0</sub><sup>T</sup> (dS<sub>t</sub> / S<sub>t</sub>) &minus; 2 ln(S<sub>T</sub> / S<sub>0</sub>)
                    </span>
                  </Formula>
                </li>
              </ul>
              <HighlightCard 
                title="The Log Contract & 1/K² Weighting" 
                icon={Lightbulb} 
                color="#d946ef"
                content="The integral proves that realized variance can be replicated using a dynamic trading strategy (1/Sₜ shares) and a static short position in a theoretical 'log contract'. To synthesize this log contract, a continuous strip of out-of-the-money options is used. Every option must be weighted inversely proportional to the square of its strike price (1/K²). This precise weighting maintains a constant aggregate dollar gamma across the entire portfolio, isolating the exposure strictly to realized volatility."
              />
            </div>
          </section>

          {/* Section 3: VIX Calculation Methodology */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
              <Calculator size={300} />
            </div>
            <SectionHeader icon={Layers} title="The VIX Index Calculation Methodology" colorFrom="from-emerald-400" colorTo="to-teal-500" />
            <div className="text-lg text-slate-700 leading-relaxed space-y-6 relative z-10">
              <p>
                Modern financial markets do not offer an infinite, continuous continuum of option strikes. Thus, the continuous variance integral is approximated using a discrete summation of available SPX options:
              </p>
              <ul className="space-y-3 mb-6">
                <Bullet colorClass="bg-emerald-500">The methodology utilizes a generalized variance formula for a single expiration strip.</Bullet>
                <Bullet colorClass="bg-emerald-500">It exclusively selects out-of-the-money (OTM) calls and puts to formulate the replication.</Bullet>
              </ul>
              <Formula>
                <span className="font-serif text-lg">
                  &sigma;<sup>2</sup> = (2/T) &Sigma;<sub>i</sub> [ (&Delta;K<sub>i</sub> / K<sub>i</sub><sup>2</sup>) &times; e<sup>RT</sup> &times; Q(K<sub>i</sub>) ] &minus; (1/T) [ F / K<sub>0</sub> &minus; 1 ]<sup>2</sup>
                </span>
              </Formula>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">1. Forward Price (F) & ATM Strike (K₀)</h4>
                  <p className="text-sm text-slate-600">
                    The algorithm determines the forward index level by finding the strike where the absolute difference between call and put mid-quotes is minimized. The strike immediately at or below F becomes the anchor, K₀.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">2. The Zero-Bid Rule</h4>
                  <p className="text-sm text-slate-600">
                    Traversing outward from K₀, OTM puts and calls are selected. If two consecutive strike prices exhibit a zero bid, the algorithm terminates selection in that direction permanently.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">3. Option Weighting (&Delta;K<sub>i</sub> / K<sub>i</sub><sup>2</sup>)</h4>
                  <p className="text-sm text-slate-600">
                    Each option's mid-quote Q(K<sub>i</sub>) is scaled by half the distance to adjacent strikes (&Delta;K<sub>i</sub>) and divided by the square of its strike to establish the required constant-gamma replication matrix.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">4. Variance Subtraction Term</h4>
                  <p className="text-sm text-slate-600">
                    Because the discrete K₀ rarely perfectly aligns with the continuous forward price F, a penalty term mathematically compensates for the centering error of a rigid strike grid.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-200 pb-2">
                30-Day Interpolation
              </h3>
              <p>
                The VIX calculates "near-term" (23+ days) and "next-term" (less than 37 days) variance points. It minute-by-minute interpolates between these to maintain a strictly constant 30-day target:
              </p>
              <Formula>
                <span className="font-serif text-lg">
                  VIX = 100 &times; &radic;&#123; [ T<sub>1</sub> &sigma;<sub>1</sub><sup>2</sup> + T<sub>2</sub> &sigma;<sub>2</sub><sup>2</sup> ] &times; (N<sub>365</sub> / N<sub>30</sub>) &#125;
                </span>
              </Formula>
            </div>
          </section>

          {/* Section 4: Market Structure & Size */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <SectionHeader icon={Globe} title="Derivatives Market Structure & Scale" colorFrom="from-amber-400" colorTo="to-orange-500" />
            <div className="text-lg text-slate-700 leading-relaxed space-y-6">
              <p>
                The VIX derivatives market operates at a monumental scale. In 2025, the broader U.S. options ecosystem traded 61 million contracts daily. Within this, the VIX ecosystem provides highly efficient mechanisms to isolate, trade, and hedge pure equity volatility.
              </p>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200 mt-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                      <th className="p-4 font-semibold">Derivative / Asset Class</th>
                      <th className="p-4 font-semibold">Average Daily Volume</th>
                      <th className="p-4 font-semibold">Typical Open Interest</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 text-sm">
                    <tr className="border-b border-slate-100">
                      <td className="p-4 font-medium text-slate-800">SPX Options</td>
                      <td className="p-4">~ 3,900,000</td>
                      <td className="p-4">&gt; 15,000,000</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-orange-50/30">
                      <td className="p-4 font-medium text-orange-900">VIX Options</td>
                      <td className="p-4 text-orange-800">~ 858,000</td>
                      <td className="p-4 text-orange-800">~ 13,400,000</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-orange-50/30">
                      <td className="p-4 font-medium text-orange-900">VIX Futures (VX)</td>
                      <td className="p-4 text-orange-800">~ 263,000</td>
                      <td className="p-4 text-orange-800">~ 410,000 - 522,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-800">VIX Mini Futures (VXM)</td>
                      <td className="p-4">~ 4,300</td>
                      <td className="p-4">~ 6,600</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-slate-900 text-xl mb-3">Exchange-Traded Products (ETPs)</h3>
                <p className="mb-4 text-slate-600">
                  Since the spot VIX is mathematically untradable, ETPs synthesize exposure by mechanically rolling short-term VIX futures:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <li className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                    <strong className="text-orange-900 block mb-2 text-lg">VXX (Standard)</strong>
                    <span className="text-orange-800 text-sm leading-relaxed block">
                      Provides standard 1x long exposure, maintaining a constant 30-day maturity. Holds $500M+ AUM.
                    </span>
                  </li>
                  <li className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                    <strong className="text-orange-900 block mb-2 text-lg">UVXY (Leveraged)</strong>
                    <span className="text-orange-800 text-sm leading-relaxed block">
                      Amplifies daily movements (e.g., 1.5x) for aggressive, extremely short-term tactical trading.
                    </span>
                  </li>
                  <li className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                    <strong className="text-orange-900 block mb-2 text-lg">SVXY (Inverse)</strong>
                    <span className="text-orange-800 text-sm leading-relaxed block">
                      Provides short exposure, profiting when volatility drops or remains stable by harvesting contango.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Trading Heuristics */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <SectionHeader icon={TrendingUp} title="Trading Heuristics & Term Structure" colorFrom="from-rose-400" colorTo="to-red-500" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">The "Rule of 16"</h3>
                <ul className="space-y-4">
                  <Bullet colorClass="bg-rose-500">
                    <strong>The Math:</strong> Traders divide the VIX index value by 16 (the approximate square root of 252 trading days in a year).
                  </Bullet>
                  <Bullet colorClass="bg-rose-500">
                    <strong>The Meaning:</strong> This instantly converts the annualized volatility reading into a daily expected percentage move for the S&P 500.
                  </Bullet>
                  <Bullet colorClass="bg-rose-500">
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mt-2 text-rose-900">
                      <strong>Example:</strong> A VIX reading of 16 implies the options market anticipates average daily fluctuations of exactly 1.0% (16 / 16). A VIX of 32 anticipates 2.0% daily moves.
                    </div>
                  </Bullet>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Contango & Roll Decay</h3>
                <ul className="space-y-4">
                  <Bullet colorClass="bg-red-500">
                    <strong>Market Structure:</strong> The VIX futures curve spends roughly 75-80% of its lifespan in "contango"—meaning longer-dated futures are priced higher than near-term ones.
                  </Bullet>
                  <Bullet colorClass="bg-red-500">
                    <strong>The Catalyst:</strong> This pricing structure exists to reflect the Volatility Risk Premium (VRP), compensating the sellers of tail-risk insurance.
                  </Bullet>
                  <Bullet colorClass="bg-red-500">
                    <strong>The Consequence:</strong> Long-volatility ETPs (like VXX) must continuously sell cheaper front-month futures to buy expensive second-month ones. This causes severe, structural capital depreciation over time.
                  </Bullet>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Greeks & Market Making */}
          <section className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 text-slate-300">
            <SectionHeader icon={Activity} title="Quantitative Market Making & Higher-Order Greeks" colorFrom="from-indigo-400" colorTo="to-violet-500" />
            <p className="text-lg leading-relaxed mb-8 text-slate-400">
              Market makers hedge VIX Delta using VIX futures, not shares. However, standard Black-Scholes Delta hedging is insufficient. They must manage the "Greek Trinity" of volatility derivatives:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-slate-800/50 p-6 rounded-2xl">
                <div className="bg-violet-500/20 text-violet-400 p-2 rounded-lg font-bold">ν</div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">Vega</h4>
                  <p className="text-sm">
                    Measures absolute sensitivity to parallel 1% shifts in implied volatility. Neutralized via variance swaps or correlated futures.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start bg-slate-800/50 p-6 rounded-2xl">
                <div className="bg-indigo-500/20 text-indigo-400 p-2 rounded-lg font-bold text-sm">Va</div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">Vanna</h4>
                  <p className="text-sm">
                    Change in Delta per 1-point change in implied volatility. Dictates how aggressively a market maker's Delta drifts during a concurrent spot drop and vol surge.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start bg-slate-800/50 p-6 rounded-2xl">
                <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg font-bold text-sm">Vo</div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">Volga (Vomma)</h4>
                  <p className="text-sm">
                    Second-order sensitivity: the rate of change of Vega with respect to IV changes. Reflects convexity. High-volga options compound sensitivity as vol rises.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-slate-800 border border-slate-700 rounded-2xl">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Zap size={18} className="text-yellow-400"/> 
                Vanna-Volga Pricing Matrix
              </h4>
              <p className="text-sm">
                Traders construct the Vega-Gamma-Vanna-Volga (VGVV) implied volatility surface using three benchmarks: an <strong>ATM Straddle</strong> (baseline Vega), a <strong>25-Delta Risk Reversal</strong> (Vanna/skew), and a <strong>25-Delta Butterfly</strong> (Volga/kurtosis tails).
              </p>
            </div>
          </section>

          {/* Section 7: Calibration & August 2024 Shock */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <SectionHeader icon={AlertTriangle} title="Calibration Puzzles & Microstructure Shocks" colorFrom="from-red-500" colorTo="to-orange-500" />
            <div className="space-y-8 text-lg text-slate-700">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">The Joint Calibration Problem</h3>
                <p className="mb-4 text-slate-600">
                  Constructing a single model that prices SPX and VIX options simultaneously without arbitrage is notoriously difficult. Quants have evolved their approaches significantly:
                </p>
                <ul className="space-y-4">
                  <Bullet colorClass="bg-orange-500">
                    <strong>Traditional Models (Heston):</strong> Standard Markovian models generally fail at capturing the aggressive, steep VIX skew observed in live markets.
                  </Bullet>
                  <Bullet colorClass="bg-orange-500">
                    <strong>Rough Bergomi (rBergomi):</strong> Modern models utilize fractional Brownian motion (with a Hurst parameter &lt; 0.5) to accurately capture violent, rapid mean-reversion in volatility.
                  </Bullet>
                  <Bullet colorClass="bg-orange-500">
                    <strong>Martingale Optimal Transport (MOT):</strong> An advanced entropic, model-free approach that formulates discrete Gibbs distributions to achieve flawless surface calibration.
                  </Bullet>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8 mt-8">
                <h3 className="text-2xl font-black text-red-900 mb-4">Case Study: The August 2024 Surge</h3>
                <p className="mb-4">
                  On August 5, 2024, at 3:15 AM EST, the VIX stood at 23.9. Within 15 seconds, it rocketed to 42, ultimately surging past 65 by 8:30 AM (a 180% intraday jump). Curiously, front-month futures stayed below 35. What happened mechanically?
                </p>
                <ul className="list-disc pl-6 space-y-3 text-red-800">
                  <li>
                    <strong>Zero-Bid Evasion:</strong> Panic bidding for exceptionally deep OTM puts (down to 1,400 strike) circumvented the calculation's zero-bid termination rule.
                  </li>
                  <li>
                    <strong>Liquidity Collapse:</strong> Market makers withdrew, causing put mid-quotes <span className="font-serif">Q(K<sub>i</sub>)</span> to swell massively. A 3,500 strike put jumped from $0.70 to $50.25.
                  </li>
                  <li>
                    <strong>Weighting Magnification:</strong> The <span className="font-serif">1/K<sup>2</sup></span> weighting heavily multiplied these inflated mid-quotes, catapulting the index mechanically.
                  </li>
                </ul>
                <p className="mt-6 font-semibold text-red-900 italic">
                  Conclusion: The VIX acts as a measure of option market liquidity and dealer risk aversion just as much as it arbitrates true statistical variance.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Continue Learning Section */}
        <div className="max-w-5xl mx-auto px-6 mt-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl text-center">
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
              {currentArticle?.podcastUrl && (
                <a 
                  href={currentArticle.podcastUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <Music className="inline mr-2" />
                  Listen to Podcast
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto px-6 mt-16 text-center text-slate-500 text-sm">
          <p>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}
