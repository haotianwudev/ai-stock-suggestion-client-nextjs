'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, Target, Cpu, Zap, AlertTriangle, Calculator, LineChart, Layers, Info, Maximize2, Shield, Globe, History, Activity, Terminal, CheckCircle, Wind, Thermometer, Repeat, ChevronRight, Binary, Dices, Clock, Flame, TrendingDown, Scaling, Box, Search, ShieldCheck, Microscope, Map, Anchor, Gem, Wallet, Percent, MoveRight, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

/**
 * Enhanced MathRenderer Component
 * Ensures KaTeX stability and scales the math to a readable, elegant size.
 */
const MathRenderer = ({ formula, displayMode = false, className = "" }: { formula: string; displayMode?: boolean; className?: string }) => {
  const katexTargetRef = useRef<HTMLSpanElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const tryRender = () => {
      if ((window as any).katex && katexTargetRef.current) {
        try {
          katexTargetRef.current.innerHTML = "";
          (window as any).katex.render(formula, katexTargetRef.current, {
            displayMode,
            throwOnError: false,
            trust: true,
          });
          setIsReady(true);
        } catch (e) {
          console.error("KaTeX error:", e);
        }
      } else {
        timeoutId = setTimeout(tryRender, 200);
      }
    };
    tryRender();
    return () => { if (timeoutId) clearTimeout(timeoutId); };
  }, [formula, displayMode]);

  return (
    <span className={`inline-block ${className}`}>
      {!isReady && (
        <span className="text-[10px] text-slate-400 font-mono opacity-50 px-2 py-1 bg-slate-50 rounded">
          {formula}
        </span>
      )}
      <span ref={katexTargetRef} aria-hidden="true" className={isReady ? "opacity-100 transition-opacity duration-300" : "hidden"} />
    </span>
  );
};

const SectionHeader = ({ icon: Icon, title, color, subtitle }: { icon: React.ElementType; title: string; color: string; subtitle?: string }) => (
  <div className={`mb-8 pb-4 border-b-2 ${color}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-xl bg-white shadow-md border border-slate-100">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-3xl lg:text-4xl font-black tracking-tighter">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-500 font-light ml-[3rem] text-base lg:text-lg">{subtitle}</p>}
  </div>
);

const DetailCard = ({ title, icon: Icon, children, colorClass, footer }: { title: string; icon: React.ElementType; children: React.ReactNode; colorClass: string; footer?: string }) => (
  <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col h-full border-b-4 border-b-indigo-500/10">
    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${colorClass} shadow-inner`}>
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="text-xl font-black mb-3 text-slate-800 tracking-tight">{title}</h4>
    <div className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">{children}</div>
    {footer && <div className="pt-4 border-t border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{footer}</div>}
  </div>
);

const MathBlockContainer = ({ formula, label, subtext }: { formula: string; label?: string; subtext?: string }) => (
  <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
    {label && (
      <div className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em]">
        {label}
      </div>
    )}
    <div className="p-8 lg:p-10 flex flex-col items-center justify-center text-center overflow-x-auto">
      <MathRenderer formula={formula} displayMode={true} className="text-lg lg:text-xl text-slate-800" />
      {subtext && <p className="text-xs text-slate-400 font-sans mt-4 max-w-2xl italic leading-relaxed">{subtext}</p>}
    </div>
  </div>
);

const GreekCard = ({ name, symbol, description, impact }: { name: string; symbol: string; description: string; impact: string }) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-indigo-50 rounded-lg">
        <MathRenderer formula={symbol} className="text-2xl font-bold text-indigo-600" />
      </div>
      <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{name}</span>
    </div>
    <p className="text-sm text-slate-700 mb-4 leading-relaxed font-medium">{description}</p>
    <div className="text-[10px] bg-slate-50 p-2 rounded-lg text-slate-400 leading-none flex items-center gap-2">
      <Anchor className="w-3 h-3 text-indigo-400" />
      <span className="font-black text-slate-600 uppercase tracking-tighter">Sensitivity:</span> {impact}
    </div>
  </div>
);

export default function BlackScholesAnalytics() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'black-scholes-analytics-laboratory-axioms-option-pricing');

  useEffect(() => {
    if (!document.getElementById('katex-css')) {
      const link = document.createElement('link');
      link.id = 'katex-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
      document.head.appendChild(link);
    }
    if (!document.getElementById('katex-js')) {
      const script = document.createElement('script');
      script.id = 'katex-js';
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 font-sans selection:bg-indigo-100">
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

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
      <header className="relative bg-white pt-20 pb-16 px-8 border-b border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[900px] h-[900px] bg-indigo-50 rounded-full blur-[160px] opacity-40" />
        <div className="max-w-5xl mx-auto relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 text-xs font-black tracking-[0.3em] text-indigo-600 uppercase bg-indigo-50 rounded-full shadow-sm border border-indigo-100">
            <Microscope className="w-4 h-4" /> Quantitative Finance Portal
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter">
            Black <span className="text-indigo-600">Scholes</span><br/>
            <span className="text-slate-200">Analytics.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-400 leading-relaxed max-w-4xl font-light italic">
            "The standard ruler for pricing the uncertainty of time."
          </p>
        </div>
      </header>

      {/* Hero Infographic */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img 
            src="https://i.imgur.com/VVQWBaJ.jpeg" 
            alt="Black-Scholes Analytics Infographic" 
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
        src="https://i.imgur.com/VVQWBaJ.jpeg"
        alt="Black-Scholes Analytics Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Section 1: Detailed Axioms */}
        <section>
          <SectionHeader 
            icon={History} 
            title="The Laboratory Axioms" 
            subtitle="The frictionless environment required to derive the closed-form solution."
            color="border-slate-200 text-slate-800" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DetailCard 
              title="Geometric Brownian Motion" 
              icon={TrendingUp} 
              colorClass="bg-blue-100 text-blue-600"
              footer="Stochastic Constraint"
            >
              Assumes returns are <strong>Normally Distributed</strong>, meaning price levels follow a <strong>Lognormal Distribution</strong>. This prevents prices from dropping below zero (limited liability) and accounts for the compounding nature of financial growth.
            </DetailCard>
            <DetailCard 
              title="Continuous Liquidity" 
              icon={Scaling} 
              colorClass="bg-emerald-100 text-emerald-600"
              footer="Execution Theory"
            >
              The model assumes you can buy or sell any quantity of an asset instantly without moving the market price (zero slippage). It further assumes zero transaction costs and zero taxes, enabling infinitesimal re-hedging.
            </DetailCard>
            <DetailCard 
              title="Static Volatility" 
              icon={Box} 
              colorClass="bg-amber-100 text-amber-600"
              footer="Parameter Axiom"
            >
              Volatility (σ) and interest rates (r) are assumed to be constant and known throughout the life of the option. This is the model&apos;s most famous simplification, leading to the creation of the &quot;Volatility Surface&quot; in practice.
            </DetailCard>
          </div>
        </section>

        {/* Section 2: Risk Neutrality */}
        <section>
          <SectionHeader 
            icon={Shield} 
            title="Risk Neutrality & Martingales" 
            subtitle="The mathematical lens that ignores investor sentiment."
            color="border-indigo-600 text-indigo-900" 
          />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-slate-600 font-light">
                Risk-neutrality is a property of a &quot;complete market.&quot; Because you can create a perfect hedge, the option&apos;s value depends only on the risk-free rate, not on how &quot;bullish&quot; or &quot;bearish&quot; the world is.
              </p>
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-indigo-600" /> The Discounted Martingale
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  In this world, the discounted stock price is a &quot;fair game.&quot; The best estimate of its future discounted value is today&apos;s price.
                </p>
                <div className="mt-4 p-3 bg-slate-50 rounded-xl text-center">
                  <MathRenderer formula={"S_0 = e^{-rT} \\mathbb{E}^Q [ S_T ]"} />
                </div>
              </div>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl text-white">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-8 text-center">
                Measure Transformation
              </h4>
              <div className="space-y-8">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-500 font-bold block mb-3 uppercase">Physical World (P)</span>
                  <MathRenderer formula={"dS_t = \\mu S_t dt + \\sigma S_t dW_t"} className="text-2xl text-rose-400" />
                  <p className="text-[10px] text-slate-500 mt-3 italic">
                    Drift (μ) includes the risk premium investors demand for holding the stock.
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-3 uppercase">Risk-Neutral World (Q)</span>
                  <MathRenderer formula={"dS_t = r S_t dt + \\sigma S_t dW_t^Q"} className="text-2xl text-emerald-400" />
                  <p className="text-[10px] text-emerald-400/60 mt-3 italic">
                    The drift is fixed to the risk-free rate (r). Preferences are deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Stochastic Engine */}
        <section>
          <SectionHeader 
            icon={Cpu} 
            title="The Stochastic Engine" 
            subtitle="The machinery that allows us to operate on random variables."
            color="border-rose-600 text-rose-900" 
          />
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                      <Wind className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight">Girsanov Theorem</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Girsanov allows us to change the probability measure. It provides the &quot;Radon-Nikodym derivative,&quot; which acts as a filter that re-weights path probabilities so the weighted drift exactly equals r.
                  </p>
                </div>
                <MathRenderer formula={"L_T = \\frac{dQ}{dP} = \\exp\\left( -\\int \\theta dW_t - \\frac{1}{2} \\int \\theta^2 dt \\right)"} displayMode={true} />
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
                      <Thermometer className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight">Feynman-Kac Identity</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    The link between finance and physics. It proves that the solution to a Heat Equation (PDE) is the same as the expectation of a random process. This is why Monte Carlo simulation works.
                  </p>
                </div>
                <MathRenderer formula={"f(x,t) = \\mathbb{E}^Q \\left[ e^{-r(T-t)} \\Phi(S_T) \\mid S_t = x \\right]"} displayMode={true} />
              </div>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col lg:flex-row gap-10 items-center">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                    <Repeat className="w-5 h-5" />
                  </div>
                  <h4 className="text-2xl font-black tracking-tight">Itô&apos;s Lemma</h4>
                </div>
                <p className="text-slate-600 text-base leading-relaxed mb-4 font-light">
                  In the stochastic world, change happens in the second order. Because (dW)² = dt, we get an extra term representing the &quot;convexity&quot; of the payoff—this is the source of Gamma.
                </p>
              </div>
              <div className="lg:w-1/2 overflow-x-auto bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                <MathRenderer formula={"df = \\left( \\frac{\\partial f}{\\partial t} + rS\\frac{\\partial f}{\\partial S} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 f}{\\partial S^2} \\right)dt + \\sigma S \\frac{\\partial f}{\\partial S} dW_t"} displayMode={true} className="text-base" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Analytical Derivation */}
        <section>
          <SectionHeader 
            icon={Binary} 
            title="The Expectation Derivation" 
            subtitle="Calculating the fair price through weighted path averaging."
            color="border-emerald-600 text-emerald-900" 
          />
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h4 className="text-2xl font-black mb-6 text-slate-800 tracking-tight">The Lognormal Integral</h4>
              <p className="text-slate-600 text-base leading-relaxed mb-8 font-light">
                We define the Call price as the discounted average of payoffs above strike K. Integrating against the density f(S<sub>T</sub>) reveals the internal weights N(d₁) and N(d₂).
              </p>
              <MathBlockContainer 
                formula={"C = e^{-rT} \\int_{K}^{\\infty} (S_T - K) f(S_T) dS_T"} 
                label="The Core Expectation"
                subtext="We perform a change of variable to transform this into a Standard Normal Integral."
              />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h5 className="font-bold text-indigo-600 mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Search className="w-4 h-4" /> The N(d₁) Weight
                  </h5>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Representing the stock-weighted probability of exercise. Physically, this is the <strong>Delta</strong> (Δ), the amount of stock required to replicate the option.
                  </p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h5 className="font-bold text-rose-600 mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Search className="w-4 h-4" /> The N(d₂) Weight
                  </h5>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    The simple, risk-neutral probability that the option finishes in-the-money. This is the likelihood you will actually pay the strike price K.
                  </p>
                </div>
              </div>
            </div>
            <MathBlockContainer 
              formula={"C = S_0 N(d_1) - K e^{-rT} N(d_2)"} 
              label="The Black-Scholes-Merton Result"
            />
          </div>
        </section>

        {/* Section 5: Greeks */}
        <section>
          <SectionHeader 
            icon={Maximize2} 
            title="The Sensitivity Gallery" 
            subtitle="Measuring the vital signs of a derivative position."
            color="border-amber-600 text-amber-900" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GreekCard 
              name="Delta" 
              symbol={"\\Delta"} 
              description="The speed. Sensitivity to stock price changes." 
              impact="Hedge Ratio" 
            />
            <GreekCard 
              name="Gamma" 
              symbol={"\\Gamma"} 
              description="The acceleration. Sensitivity of Delta to stock price." 
              impact="Path Risk" 
            />
            <GreekCard 
              name="Theta" 
              symbol={"\\Theta"} 
              description="The time bleed. Daily loss of value due to expiry." 
              impact="Time Decay" 
            />
            <GreekCard 
              name="Vega" 
              symbol={"\\nu"} 
              description="The uncertainty risk. Sensitivity to market fear (IV)." 
              impact="Uncertainty" 
            />
          </div>
        </section>

        {/* Section 6: Trader Heuristics */}
        <section>
          <SectionHeader 
            icon={Terminal} 
            title="Trader Heuristics & Pit Wisdom" 
            subtitle="The mental models and 'oral traditions' of the options pits."
            color="border-indigo-600 text-indigo-900" 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Rule of 16 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-indigo-500 transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-inner">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">The Rule of 16</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Normalizing Volatility</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Market makers think in <strong>daily moves</strong>, not annual percentages. Since there are roughly 256 trading days in a year and √256 = 16, the conversion is simple:
                </p>
                <div className="bg-slate-900 p-6 rounded-2xl text-center shadow-2xl">
                  <MathRenderer formula={"\\text{Daily \\% Expected Move} \\approx \\frac{\\sigma_{\\text{annual}}}{16}"} displayMode={true} className="text-emerald-400" />
                  <div className="flex justify-between items-center mt-4 px-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">32% IV</span>
                    <MoveRight className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-black text-emerald-400">2% Daily Move</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linear Straddle Approximation */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-emerald-500 transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-inner">
                    <Dices className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">ATM Straddle Rule</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">The Linear Approximation</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  For an At-The-Money (ATM) straddle, the Black-Scholes complex math collapses into a linear function of Price (S) and Volatility (σ).
                </p>
                <div className="bg-slate-900 p-6 rounded-2xl text-center shadow-2xl">
                  <MathRenderer formula={"\\text{Straddle Price} \\approx 0.8 \\cdot S \\cdot \\sigma \\cdot \\sqrt{T}"} displayMode={true} className="text-emerald-400" />
                  <p className="text-[10px] text-slate-500 mt-4 italic">&quot;This provides the cost of the &apos;Uncertainty Envelope&apos; instantly.&quot;</p>
                </div>
              </div>
            </div>

            {/* Greek Rent Equilibrium */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-rose-500 transition-all">
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-rose-50 text-rose-500 rounded-xl shadow-inner">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">The Greek Rent</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Theta vs. Gamma</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  A delta-hedger who is &quot;Long Gamma&quot; (expecting moves) is &quot;paying rent&quot; via <strong>Theta</strong> (decay). In an efficient market, they balance out perfectly:
                </p>
                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 text-center">
                  <MathRenderer formula={"\\text{Theta Loss} \\approx \\text{Gamma Gain} \\times \\frac{\\sigma^2 S^2}{2}"} displayMode={true} className="text-rose-900" />
                  <p className="text-[10px] text-rose-400 mt-4 font-bold uppercase italic tracking-widest">&quot;You pay for the privilege of being random.&quot;</p>
                </div>
              </div>
            </div>

            {/* Delta Probability Nuance */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-blue-500 transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-xl shadow-inner">
                    <Percent className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">The 20-80 Rule</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Delta as Probability</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Traders use Delta (Δ) as a <strong>raw probability proxy</strong>. A 25-delta call is treated as having a 25% chance of finishing in-the-money.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">16 Delta Call</span>
                    <span className="text-sm font-black text-blue-600 uppercase tracking-tight">1-Std Dev move</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">50 Delta Call</span>
                    <span className="text-sm font-black text-blue-600 uppercase tracking-tight">50/50 Coin Flip</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-slate-900 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-5">
              <History className="w-80 h-80" />
            </div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h5 className="text-indigo-400 font-bold uppercase text-xs mb-3 tracking-[0.3em]">The Universal Standard</h5>
                <h3 className="text-4xl font-black mb-6 leading-tight text-white">Implied Volatility (IV) <br/> as a &quot;Ruler&quot;</h3>
                <p className="text-slate-400 leading-relaxed text-base font-light italic">&quot;We don&apos;t use Black-Scholes because it&apos;s correct; we use it to see where the market thinks it is currently wrong.&quot;</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                <h6 className="font-bold text-emerald-400 mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                  <Search className="w-4 h-4" /> Market Skew Analysis
                </h6>
                <p className="text-sm text-slate-300 leading-relaxed">
                  If OTM Puts have higher IV than OTM Calls, the market is pricing in &quot;Crashophobia.&quot; This deviation from the flat-vol axiom tells you more about investor fear than any raw price chart ever could.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Limitations */}
        <section>
          <SectionHeader 
            icon={Map} 
            title="The Map vs. The Territory" 
            subtitle="Recognizing the structural failure points of the mathematical model."
            color="border-rose-600 text-rose-900" 
          />
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <DetailCard 
                title="Fat Tails (Kurtosis)" 
                icon={TrendingDown} 
                colorClass="bg-rose-100 text-rose-600"
                footer="Statistical Bias"
              >
                Real market returns have &quot;Heavy Tails.&quot; The model assumes a 10-sigma crash happens once every 10 billion years; in the real &quot;Territory,&quot; these events happen almost every decade.
              </DetailCard>
              <DetailCard 
                title="Gap & Liquidity Risk" 
                icon={AlertTriangle} 
                colorClass="bg-amber-100 text-amber-600"
                footer="Execution Failure"
              >
                The model assumes prices move continuously. In reality, markets <strong>Gap</strong> overnight from $100 to $80. A delta-hedger cannot adjust their position mid-gap, leading to &quot;Jump Risk&quot; bankruptcy.
              </DetailCard>
            </div>
            <div className="p-10 bg-white rounded-3xl border-2 border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-500 transition-colors">
              <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
                <div className="lg:w-1/2">
                  <h4 className="text-2xl font-black mb-3">The Volatility Smile</h4>
                  <p className="text-slate-500 text-base leading-relaxed">
                    Professional traders don&apos;t quote options in dollars; they quote them in &quot;Volatility points.&quot; The <strong>Smile</strong> is the map of how much the model is currently underestimating the probability of extreme events.
                  </p>
                </div>
                <div className="lg:w-1/2 p-8 bg-indigo-900 rounded-2xl text-white shadow-xl">
                  <h5 className="font-bold text-indigo-400 mb-3 uppercase text-xs tracking-widest">Masterclass Takeaway</h5>
                  <p className="text-sm text-indigo-100 leading-relaxed italic">
                    &quot;Black-Scholes is the first map of a random world. It is flawed, elegant, and essential. It doesn&apos;t tell you the price; it tells you the language of value.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-16 px-10 border-t border-slate-100 mt-20">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-2xl">
              BS
            </div>
            <div>
              <span className="font-black tracking-tighter text-3xl block">SOPHIE&apos;s Daddy Quant Blog</span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Quantitative Finance Portal</span>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-slate-400 text-base font-light italic mb-3 max-w-md">
              &quot;Standardizing the Uncertainty of the Future.&quot;
            </p>
            <p className="text-[11px] text-slate-300 uppercase tracking-[0.4em] font-black">
              © 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
