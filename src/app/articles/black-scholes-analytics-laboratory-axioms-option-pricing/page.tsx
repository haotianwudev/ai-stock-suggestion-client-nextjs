'use client';

import React, { useEffect, useState, useRef } from 'react';
import { BookOpen, TrendingUp, Target, Cpu, Zap, AlertTriangle, Calculator, LineChart, Layers, Info, Maximize2, Shield, Globe, History, Activity, Terminal, CheckCircle, Wind, Thermometer, Repeat, ChevronRight, Binary, Dices, Clock, Flame, TrendingDown, Scaling, Box, Search, ShieldCheck, Microscope, Map, Anchor, Gem, Wallet, Percent, MoveRight, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

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
        <span className="text-[10px] text-slate-400 font-mono opacity-50 px-2 py-1 bg-slate-50 dark:bg-[#14171B] rounded">
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
      <div className="p-2 rounded-xl bg-white dark:bg-[#0A0D14] shadow-md border border-slate-100 dark:border-slate-800">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-3xl lg:text-4xl font-black tracking-tighter font-serif">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-500 font-light ml-[3rem] text-base lg:text-lg">{subtitle}</p>}
  </div>
);

const DetailCard = ({ title, icon: Icon, children, colorClass, footer }: { title: string; icon: React.ElementType; children: React.ReactNode; colorClass: string; footer?: string }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col h-full border-b-4 border-b-indigo-500/10">
    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${colorClass} shadow-inner`}>
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="text-xl font-black mb-3 text-slate-800 dark:text-slate-200 tracking-tight">{title}</h4>
    <div className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">{children}</div>
    {footer && <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{footer}</div>}
  </div>
);

const MathBlockContainer = ({ formula, label, subtext }: { formula: string; label?: string; subtext?: string }) => (
  <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0D14] shadow-lg">
    {label && (
      <div className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em]">
        {label}
      </div>
    )}
    <div className="p-8 lg:p-10 flex flex-col items-center justify-center text-center overflow-x-auto">
      <MathRenderer formula={formula} displayMode={true} className="text-lg lg:text-xl text-slate-800 dark:text-slate-200" />
      {subtext && <p className="text-xs text-slate-400 font-sans mt-4 max-w-2xl italic leading-relaxed">{subtext}</p>}
    </div>
  </div>
);

const GreekCard = ({ name, symbol, description, impact }: { name: string; symbol: string; description: string; impact: string }) => (
  <div className="p-6 bg-white dark:bg-[#0A0D14] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg">
        <MathRenderer formula={symbol} className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52]" />
      </div>
      <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{name}</span>
    </div>
    <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed font-medium">{description}</p>
    <div className="text-[10px] bg-slate-50 dark:bg-[#14171B] p-2 rounded-lg text-slate-400 leading-none flex items-center gap-2">
      <Anchor className="w-3 h-3 text-[#A8672E] dark:text-[#D08F52]" />
      <span className="font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Sensitivity:</span> {impact}
    </div>
  </div>
);

export default function BlackScholesAnalytics() {
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
    <ArticleFrame slug="black-scholes-analytics-laboratory-axioms-option-pricing">
      <div className="max-w-4xl mx-auto mb-16">
        <InfographicSlot alt="Black-Scholes Analytics Infographic" />
      </div>

      {/* Section 1: Detailed Axioms */}
        <section>
          <SectionHeader 
            icon={History} 
            title="The Laboratory Axioms" 
            subtitle="The frictionless environment required to derive the closed-form solution."
            color="border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DetailCard 
              title="Geometric Brownian Motion" 
              icon={TrendingUp} 
              colorClass="bg-[#A8672E] dark:bg-[#D08F52] text-[#A8672E] dark:text-[#D08F52]"
              footer="Stochastic Constraint"
            >
              Assumes returns are <strong>Normally Distributed</strong>, meaning price levels follow a <strong>Lognormal Distribution</strong>. This prevents prices from dropping below zero (limited liability) and accounts for the compounding nature of financial growth. The mathematical form is dS = μS dt + σS dW, where μ is the drift rate and σ is the volatility parameter. This ensures that percentage changes, not absolute changes, are normally distributed—a crucial distinction that captures the multiplicative nature of financial returns.
            </DetailCard>
            <DetailCard 
              title="Continuous Liquidity" 
              icon={Scaling} 
              colorClass="bg-[#1D8A70] dark:bg-[#3CBF9C] text-[#1D8A70] dark:text-[#3CBF9C]"
              footer="Execution Theory"
            >
              The model assumes you can buy or sell any quantity of an asset instantly without moving the market price (zero slippage). It further assumes zero transaction costs and zero taxes, enabling infinitesimal re-hedging. This &quot;perfect liquidity&quot; assumption allows for continuous delta-hedging, where traders can adjust their positions instantaneously as the underlying moves. In reality, bid-ask spreads, market impact, and transaction costs create friction that professional traders must account for through more sophisticated models.
            </DetailCard>
            <DetailCard 
              title="Static Volatility" 
              icon={Box} 
              colorClass="bg-amber-100 text-amber-600"
              footer="Parameter Axiom"
            >
              Volatility (σ) and interest rates (r) are assumed to be constant and known throughout the life of the option. This is the model&apos;s most famous simplification, leading to the creation of the &quot;Volatility Surface&quot; in practice. Real-world volatility clusters (high vol periods followed by high vol) and exhibits mean reversion. Interest rates also fluctuate, creating additional risk factors. Modern practitioners use stochastic volatility models (Heston, SABR) and term structure models to address these limitations.
            </DetailCard>
          </div>
          
          {/* Additional Axioms */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard 
              title="No Dividends (Original)" 
              icon={Wallet} 
              colorClass="bg-purple-100 text-purple-600"
              footer="Cash Flow Assumption"
            >
              The original Black-Scholes model assumed no dividend payments during the option&apos;s life. This was later extended by Merton to include continuous dividend yields, adjusting the forward price to S₀e^(-qT) where q is the dividend yield. For discrete dividends, practitioners often use binomial trees or adjust the stock price by the present value of expected dividends.
            </DetailCard>
            <DetailCard 
              title="European Exercise" 
              icon={Clock} 
              colorClass="bg-[#BC4128] dark:bg-[#E2694A] text-[#BC4128] dark:text-[#E2694A]"
              footer="Exercise Constraint"
            >
              The model applies only to European-style options that can only be exercised at expiration. American options, which can be exercised early, require more complex numerical methods like binomial/trinomial trees or finite difference methods. Early exercise is optimal for American puts when they are deep in-the-money, and for American calls on dividend-paying stocks just before ex-dividend dates.
            </DetailCard>
          </div>
        </section>

        {/* Section 2: Risk Neutrality */}
        <section>
          <SectionHeader 
            icon={Shield} 
            title="Risk Neutrality & Martingales" 
            subtitle="The mathematical lens that ignores investor sentiment."
            color="border-indigo-600 text-[#A8672E] dark:text-[#D08F52]" 
          />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                Risk-neutrality is a property of a &quot;complete market.&quot; Because you can create a perfect hedge, the option&apos;s value depends only on the risk-free rate, not on how &quot;bullish&quot; or &quot;bearish&quot; the world is.
              </p>
              <div className="p-6 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" /> The Discounted Martingale
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  In this world, the discounted stock price is a &quot;fair game.&quot; The best estimate of its future discounted value is today&apos;s price. This martingale property is the foundation of risk-neutral pricing.
                </p>
                <div className="mt-4 p-3 bg-slate-50 dark:bg-[#14171B] rounded-xl text-center">
                  <MathRenderer formula={"S_0 = e^{-rT} \\mathbb{E}^Q [ S_T ]"} />
                </div>
                <p className="text-xs text-slate-400 mt-3 italic">
                  This equation states that today&apos;s stock price equals the discounted expected future price under the risk-neutral measure Q.
                </p>
              </div>
              
              {/* Additional Risk-Neutral Concepts */}
              <div className="p-6 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-indigo-200 rounded-2xl">
                <h4 className="text-lg font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" /> Market Completeness
                </h4>
                <p className="text-sm text-[#A8672E] dark:text-[#D08F52] leading-relaxed">
                  A complete market allows any payoff to be replicated through dynamic trading of the underlying and risk-free bond. This replication argument eliminates arbitrage opportunities and uniquely determines option prices. The key insight: if two portfolios have identical payoffs, they must have identical prices to prevent risk-free profit.
                </p>
              </div>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl text-white">
              <h4 className="text-[10px] font-black text-[#A8672E] dark:text-[#D08F52] uppercase tracking-[0.4em] mb-8 text-center">
                Measure Transformation
              </h4>
              <div className="space-y-8">
                <div className="p-4 bg-white dark:bg-[#0A0D14]/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-500 font-bold block mb-3 uppercase">Physical World (P)</span>
                  <MathRenderer formula={"dS_t = \\mu S_t dt + \\sigma S_t dW_t"} className="text-2xl text-[#BC4128] dark:text-[#E2694A]" />
                  <p className="text-[10px] text-slate-500 mt-3 italic">
                    Drift (μ) includes the risk premium investors demand for holding the stock. This reflects actual investor preferences and risk aversion.
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-[#0A0D14]/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C] font-bold block mb-3 uppercase">Risk-Neutral World (Q)</span>
                  <MathRenderer formula={"dS_t = r S_t dt + \\sigma S_t dW_t^Q"} className="text-2xl text-[#1D8A70] dark:text-[#3CBF9C]" />
                  <p className="text-[10px] text-[#1D8A70] dark:text-[#3CBF9C]/60 mt-3 italic">
                    The drift is fixed to the risk-free rate (r). Preferences are deleted. All assets grow at the risk-free rate on average.
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-[#0A0D14]/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-[#A8672E] dark:text-[#D08F52] font-bold block mb-3 uppercase">The Bridge: Girsanov</span>
                  <MathRenderer formula={"\\frac{dQ}{dP} = \\exp\\left(-\\frac{\\mu - r}{\\sigma}W_T - \\frac{1}{2}\\left(\\frac{\\mu - r}{\\sigma}\\right)^2 T\\right)"} className="text-lg text-[#A8672E] dark:text-[#D08F52]" />
                  <p className="text-[10px] text-[#A8672E] dark:text-[#D08F52]/60 mt-3 italic">
                    The Radon-Nikodym derivative transforms probabilities, making the discounted stock price a martingale.
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
            color="border-rose-600 text-[#BC4128] dark:text-[#E2694A]" 
          />
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] rounded-lg">
                      <Wind className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight">Girsanov Theorem</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Girsanov allows us to change the probability measure. It provides the &quot;Radon-Nikodym derivative,&quot; which acts as a filter that re-weights path probabilities so the weighted drift exactly equals r. This theorem is the mathematical foundation that transforms the physical measure (with risk premium μ) into the risk-neutral measure (with drift r).
                  </p>
                </div>
                <div className="space-y-4">
                  <MathRenderer formula={"L_T = \\frac{dQ}{dP} = \\exp\\left( -\\int \\theta dW_t - \\frac{1}{2} \\int \\theta^2 dt \\right)"} displayMode={true} />
                  <p className="text-xs text-slate-400 italic">Where θ = (μ-r)/σ is the market price of risk</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] rounded-lg">
                      <Thermometer className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight">Feynman-Kac Identity</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    The link between finance and physics. It proves that the solution to a Heat Equation (PDE) is the same as the expectation of a random process. This is why Monte Carlo simulation works—we can either solve the PDE numerically or simulate thousands of random paths and average the payoffs.
                  </p>
                </div>
                <div className="space-y-4">
                  <MathRenderer formula={"f(x,t) = \\mathbb{E}^Q \\left[ e^{-r(T-t)} \\Phi(S_T) \\mid S_t = x \\right]"} displayMode={true} />
                  <p className="text-xs text-slate-400 italic">Where Φ(S_T) is the option payoff at expiration</p>
                </div>
              </div>
            </div>
            
            {/* Itô's Lemma - Enhanced */}
            <div className="p-8 bg-white dark:bg-[#0A0D14] rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-10 items-center">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] rounded-lg">
                    <Repeat className="w-5 h-5" />
                  </div>
                  <h4 className="text-2xl font-black tracking-tight">Itô&apos;s Lemma</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-4 font-light">
                  In the stochastic world, change happens in the second order. Because (dW)² = dt, we get an extra term representing the &quot;convexity&quot; of the payoff—this is the source of Gamma. This quadratic variation term is what distinguishes stochastic calculus from ordinary calculus.
                </p>
                <div className="p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-xl border border-emerald-200">
                  <h5 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-2 text-sm">Key Insight</h5>
                  <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] leading-relaxed">
                    The ½σ²S²∂²f/∂S² term captures the &quot;convexity premium&quot; - the value created by the option&apos;s non-linear payoff structure. This is why options have time value even when at-the-money.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 overflow-x-auto bg-slate-50 dark:bg-[#14171B] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <MathRenderer formula={"df = \\left( \\frac{\\partial f}{\\partial t} + rS\\frac{\\partial f}{\\partial S} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 f}{\\partial S^2} \\right)dt + \\sigma S \\frac{\\partial f}{\\partial S} dW_t"} displayMode={true} className="text-base" />
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-[#A8672E] dark:bg-[#D08F52] rounded text-[#A8672E] dark:text-[#D08F52]">
                    <strong>Theta</strong><br/>Time decay
                  </div>
                  <div className="p-2 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded text-[#1D8A70] dark:text-[#3CBF9C]">
                    <strong>Delta</strong><br/>Price sensitivity
                  </div>
                  <div className="p-2 bg-purple-100 rounded text-purple-800">
                    <strong>Gamma</strong><br/>Convexity
                  </div>
                </div>
              </div>
            </div>

            {/* Black-Scholes PDE */}
            <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-2xl">
              <h4 className="text-2xl font-black mb-6 text-center text-white">The Black-Scholes Partial Differential Equation</h4>
              <p className="text-slate-300 text-center mb-8 leading-relaxed">
                Applying Itô&apos;s Lemma to the option value f(S,t) and using the no-arbitrage condition yields the famous PDE:
              </p>
              <div className="bg-white dark:bg-[#0A0D14]/10 p-6 rounded-2xl border border-white/20 text-center">
                <MathRenderer formula={"\\frac{\\partial f}{\\partial t} + rS\\frac{\\partial f}{\\partial S} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 f}{\\partial S^2} = rf"} displayMode={true} className="text-xl text-white" />
              </div>
              <p className="text-xs text-slate-400 text-center mt-4 italic">
                Subject to boundary conditions: f(S,T) = max(S-K,0) for a call option
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Analytical Derivation */}
        <section>
          <SectionHeader 
            icon={Binary} 
            title="The Expectation Derivation" 
            subtitle="Calculating the fair price through weighted path averaging."
            color="border-emerald-600 text-[#1D8A70] dark:text-[#3CBF9C]" 
          />
          <div className="space-y-8">
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-2xl font-black mb-6 text-slate-800 dark:text-slate-200 tracking-tight">The Lognormal Integral</h4>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 font-light">
                We define the Call price as the discounted average of payoffs above strike K. Integrating against the density f(S<sub>T</sub>) reveals the internal weights N(d₁) and N(d₂). The key insight is that we&apos;re computing a conditional expectation over the region where S<sub>T</sub> &gt; K.
              </p>
              <MathBlockContainer 
                formula={"C = e^{-rT} \\int_{K}^{\\infty} (S_T - K) f(S_T) dS_T"} 
                label="The Core Expectation"
                subtext="We perform a change of variable to transform this into a Standard Normal Integral using the fact that ln(S_T) ~ N(ln(S_0) + (r-σ²/2)T, σ²T)."
              />
              
              {/* Step-by-step derivation */}
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2 uppercase text-sm tracking-widest">
                    <Binary className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" /> Step 1: Substitution
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Let X = ln(S<sub>T</sub>/S<sub>0</sub>). Then X ~ N((r-σ²/2)T, σ²T), and we can rewrite the integral in terms of the standard normal distribution.
                  </p>
                  <div className="p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-xl">
                    <MathRenderer formula={"X = \\ln\\left(\\frac{S_T}{S_0}\\right) \\sim N\\left(\\left(r-\\frac{\\sigma^2}{2}\\right)T, \\sigma^2 T\\right)"} displayMode={true} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2 uppercase text-sm tracking-widest">
                    <Binary className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" /> Step 2: Integration by Parts
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    The integral splits into two parts: the stock-weighted probability N(d₁) and the strike-weighted probability N(d₂). This decomposition reveals the economic meaning of each term.
                  </p>
                  <div className="p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-xl">
                    <MathRenderer formula={"\\int S_T \\phi(z) dz - K \\int \\phi(z) dz"} displayMode={true} />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="p-6 bg-slate-50 dark:bg-[#14171B] rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Search className="w-4 h-4" /> The N(d₁) Weight
                  </h5>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    Representing the stock-weighted probability of exercise. Physically, this is the <strong>Delta</strong> (Δ), the amount of stock required to replicate the option. It&apos;s the probability of finishing ITM, weighted by the stock price.
                  </p>
                  <div className="p-3 bg-white dark:bg-[#0A0D14] rounded-lg">
                    <MathRenderer formula={"d_1 = \\frac{\\ln(S_0/K) + (r + \\sigma^2/2)T}{\\sigma\\sqrt{T}}"} displayMode={true} />
                  </div>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-[#14171B] rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Search className="w-4 h-4" /> The N(d₂) Weight
                  </h5>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    The simple, risk-neutral probability that the option finishes in-the-money. This is the likelihood you will actually pay the strike price K. Note that d₂ = d₁ - σ√T.
                  </p>
                  <div className="p-3 bg-white dark:bg-[#0A0D14] rounded-lg">
                    <MathRenderer formula={"d_2 = \\frac{\\ln(S_0/K) + (r - \\sigma^2/2)T}{\\sigma\\sqrt{T}}"} displayMode={true} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* The Final Formula */}
            <MathBlockContainer 
              formula={"C = S_0 N(d_1) - K e^{-rT} N(d_2)"} 
              label="The Black-Scholes-Merton Result"
              subtext="This elegant formula encapsulates the entire theory of option pricing in a single equation."
            />
            
            {/* Put-Call Parity */}
            <div className="p-8 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-indigo-200 rounded-3xl">
              <h4 className="text-2xl font-black mb-4 text-[#A8672E] dark:text-[#D08F52] tracking-tight">Put-Call Parity</h4>
              <p className="text-[#A8672E] dark:text-[#D08F52] text-base leading-relaxed mb-6">
                The relationship between call and put prices is not derived from Black-Scholes but from pure arbitrage arguments. It must hold regardless of the pricing model used.
              </p>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl text-center">
                <MathRenderer formula={"C - P = S_0 - Ke^{-rT}"} displayMode={true} className="text-2xl text-[#A8672E] dark:text-[#D08F52]" />
                <p className="text-sm text-[#A8672E] dark:text-[#D08F52] mt-4">
                  This means: Long Call + Short Put = Long Forward Contract
                </p>
              </div>
            </div>
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
              description="The speed. Sensitivity to stock price changes. For calls: 0 < Δ < 1, for puts: -1 < Δ < 0." 
              impact="Hedge Ratio" 
            />
            <GreekCard 
              name="Gamma" 
              symbol={"\\Gamma"} 
              description="The acceleration. Sensitivity of Delta to stock price. Always positive for long options, highest ATM." 
              impact="Path Risk" 
            />
            <GreekCard 
              name="Theta" 
              symbol={"\\Theta"} 
              description="The time bleed. Daily loss of value due to expiry. Accelerates as expiration approaches." 
              impact="Time Decay" 
            />
            <GreekCard 
              name="Vega" 
              symbol={"\\nu"} 
              description="The uncertainty risk. Sensitivity to market fear (IV). Highest for ATM options with time remaining." 
              impact="Uncertainty" 
            />
          </div>
          
          {/* Additional Greeks */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <GreekCard 
              name="Rho" 
              symbol={"\\rho"} 
              description="Interest rate sensitivity. More important for longer-dated options and deep ITM calls." 
              impact="Rate Risk" 
            />
            <GreekCard 
              name="Vanna" 
              symbol={"\\frac{\\partial^2 V}{\\partial S \\partial \\sigma}"} 
              description="Cross-derivative: sensitivity of Delta to volatility changes. Second-order Greek." 
              impact="Vol-Spot Risk" 
            />
            <GreekCard 
              name="Charm" 
              symbol={"\\frac{\\partial^2 V}{\\partial S \\partial t}"} 
              description="Delta decay: how Delta changes with time passage. Critical for dynamic hedging." 
              impact="Delta Decay" 
            />
          </div>

          {/* Greeks Relationships */}
          <div className="mt-8 p-8 bg-white dark:bg-[#0A0D14] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="text-2xl font-black mb-6 text-slate-800 dark:text-slate-200 tracking-tight">Greek Relationships & Hedging</h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h5 className="font-bold text-amber-600 mb-3 flex items-center gap-2 uppercase text-sm tracking-widest">
                  <Activity className="w-4 h-4" /> Delta-Gamma Hedging
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Delta hedging requires continuous rebalancing. Gamma measures how much your Delta hedge will be &quot;wrong&quot; for a given move. High Gamma positions need frequent rehedging.
                </p>
                <div className="p-4 bg-amber-50 rounded-xl">
                  <MathRenderer formula={"\\text{P&L} \\approx \\Delta \\cdot \\Delta S + \\frac{1}{2} \\Gamma \\cdot (\\Delta S)^2"} displayMode={true} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-3 flex items-center gap-2 uppercase text-sm tracking-widest">
                  <Clock className="w-4 h-4" /> Theta-Gamma Relationship
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  For a delta-neutral position, Theta and Gamma are related through the Black-Scholes PDE. You &quot;pay&quot; Theta to &quot;own&quot; Gamma.
                </p>
                <div className="p-4 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-xl">
                  <MathRenderer formula={"\\Theta + \\frac{1}{2}\\sigma^2 S^2 \\Gamma + rS\\Delta = r \\cdot \\text{Portfolio Value}"} displayMode={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Trader Heuristics */}
        <section>
          <SectionHeader 
            icon={Terminal} 
            title="Trader Heuristics & Pit Wisdom" 
            subtitle="The mental models and 'oral traditions' of the options pits."
            color="border-indigo-600 text-[#A8672E] dark:text-[#D08F52]" 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Rule of 16 */}
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-indigo-500 transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-[#A8672E] dark:bg-[#D08F52] group-hover:text-white transition-colors shadow-inner">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">The Rule of 16</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Normalizing Volatility</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Market makers think in <strong>daily moves</strong>, not annual percentages. Since there are roughly 256 trading days in a year and √256 = 16, the conversion is simple:
                </p>
                <div className="bg-slate-900 p-6 rounded-2xl text-center shadow-2xl">
                  <MathRenderer formula={"\\text{Daily \\% Expected Move} \\approx \\frac{\\sigma_{\\text{annual}}}{16}"} displayMode={true} className="text-[#1D8A70] dark:text-[#3CBF9C]" />
                  <div className="flex justify-between items-center mt-4 px-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">32% IV</span>
                    <MoveRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                    <span className="text-sm font-black text-[#1D8A70] dark:text-[#3CBF9C]">2% Daily Move</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linear Straddle Approximation */}
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-emerald-500 transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] rounded-xl group-hover:bg-[#1D8A70] dark:bg-[#3CBF9C] group-hover:text-white transition-colors shadow-inner">
                    <Dices className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">ATM Straddle Rule</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">The Linear Approximation</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  For an At-The-Money (ATM) straddle, the Black-Scholes complex math collapses into a linear function of Price (S) and Volatility (σ). This provides instant position sizing and risk assessment.
                </p>
                <div className="bg-slate-900 p-6 rounded-2xl text-center shadow-2xl">
                  <MathRenderer formula={"\\text{Straddle Price} \\approx 0.8 \\cdot S \\cdot \\sigma \\cdot \\sqrt{T}"} displayMode={true} className="text-[#1D8A70] dark:text-[#3CBF9C]" />
                  <p className="text-[10px] text-slate-500 mt-4 italic">&quot;This provides the cost of the &apos;Uncertainty Envelope&apos; instantly.&quot;</p>
                  <div className="mt-4 p-3 bg-[#1D8A70] dark:bg-[#3CBF9C]/20 rounded-lg">
                    <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]">Example: $100 stock, 25% IV, 30 days → Straddle ≈ $100 × 0.25 × √(30/365) × 0.8 ≈ $5.70</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Greek Rent Equilibrium */}
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-rose-500 transition-all">
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] rounded-xl shadow-inner">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">The Greek Rent</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Theta vs. Gamma</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  A delta-hedger who is &quot;Long Gamma&quot; (expecting moves) is &quot;paying rent&quot; via <strong>Theta</strong> (decay). In an efficient market, they balance out perfectly:
                </p>
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-6 rounded-2xl border border-rose-100 text-center">
                  <MathRenderer formula={"\\text{Theta Loss} \\approx \\text{Gamma Gain} \\times \\frac{\\sigma^2 S^2}{2}"} displayMode={true} className="text-[#BC4128] dark:text-[#E2694A]" />
                  <p className="text-[10px] text-[#BC4128] dark:text-[#E2694A] mt-4 font-bold uppercase italic tracking-widest">&quot;You pay for the privilege of being random.&quot;</p>
                </div>
              </div>
            </div>

            {/* Delta Probability Nuance */}
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-blue-500 transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] rounded-xl shadow-inner">
                    <Percent className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">The 20-80 Rule</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Delta as Probability</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Traders use Delta (Δ) as a <strong>raw probability proxy</strong>. A 25-delta call is treated as having a 25% chance of finishing in-the-money. This heuristic works because N(d₂) ≈ Delta for ATM options.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#14171B] rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">16 Delta Call</span>
                    <span className="text-sm font-black text-[#A8672E] dark:text-[#D08F52] uppercase tracking-tight">1-Std Dev move</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#14171B] rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">50 Delta Call</span>
                    <span className="text-sm font-black text-[#1D8A70] dark:text-[#3CBF9C] uppercase tracking-tight">At-The-Money</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#14171B] rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">84 Delta Call</span>
                    <span className="text-sm font-black text-purple-600 uppercase tracking-tight">1-Std Dev ITM</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-xl">
                  <p className="text-xs text-[#A8672E] dark:text-[#D08F52] font-medium">
                    <strong>Pro Tip:</strong> The 25-delta put and 25-delta call define the &quot;1-standard deviation&quot; wings used in risk reversal strategies.
                  </p>
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
                <h5 className="text-[#A8672E] dark:text-[#D08F52] font-bold uppercase text-xs mb-3 tracking-[0.3em]">The Universal Standard</h5>
                <h3 className="text-4xl font-black mb-6 leading-tight text-white font-serif">Implied Volatility (IV) <br/> as a &quot;Ruler&quot;</h3>
                <p className="text-slate-400 leading-relaxed text-base font-light italic">&quot;We don&apos;t use Black-Scholes because it&apos;s correct; we use it to see where the market thinks it is currently wrong.&quot;</p>
              </div>
              <div className="p-8 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-2xl hover:bg-white dark:bg-[#0A0D14]/10 transition-colors">
                <h6 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                  <Search className="w-4 h-4" /> Market Skew Analysis
                </h6>
                <p className="text-sm text-slate-300 leading-relaxed">
                  If OTM Puts have higher IV than OTM Calls, the market is pricing in &quot;Crashophobia.&quot; This deviation from the flat-vol axiom tells you more about investor fear than any raw price chart ever could.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Heuristics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-50 text-purple-500 rounded-xl shadow-inner">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">Weekend Effect</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Calendar Time vs. Trading Time</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Options decay over calendar time, not trading time. A Friday-to-Monday passage costs 3 days of Theta, but the market is only open 1 day. This creates predictable patterns in option pricing around weekends and holidays.
              </p>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-xs text-purple-700 font-medium">
                  <strong>Trading Insight:</strong> Short-dated options often see accelerated decay on Fridays as weekend risk is priced in.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-teal-50 text-teal-500 rounded-xl shadow-inner">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">Pin Risk</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Expiration Magnetism</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Stock prices tend to &quot;pin&quot; to strike prices at expiration due to delta hedging flows. Market makers who are short options will buy stock as it approaches the strike (to hedge their short delta), creating support/resistance.
              </p>
              <div className="p-4 bg-teal-50 rounded-xl">
                <p className="text-xs text-teal-700 font-medium">
                  <strong>Gamma Squeeze:</strong> When large amounts of call options are in-the-money, dealers must buy stock to hedge, amplifying upward moves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Modern Extensions */}
        <section>
          <SectionHeader 
            icon={Cpu} 
            title="Modern Extensions & Practical Applications" 
            subtitle="How Black-Scholes evolved to meet real-world trading demands."
            color="border-purple-600 text-purple-900" 
          />
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <DetailCard 
                title="Stochastic Volatility Models" 
                icon={Wind} 
                colorClass="bg-purple-100 text-purple-600"
                footer="Heston, SABR, Local Vol"
              >
                Modern models treat volatility as a random variable with its own dynamics. The Heston model adds a second stochastic process for volatility, while SABR models the forward price and volatility jointly. These capture the volatility smile and term structure more accurately.
              </DetailCard>
              <DetailCard 
                title="Jump Diffusion Models" 
                icon={Zap} 
                colorClass="bg-orange-100 text-orange-600"
                footer="Merton Jump-Diffusion"
              >
                Merton&apos;s extension adds sudden price jumps to the geometric Brownian motion. This better captures crash risk and explains why out-of-the-money puts trade at higher implied volatilities. The model includes jump frequency, jump size distribution, and jump timing.
              </DetailCard>
            </div>

            <div className="p-8 bg-white dark:bg-[#0A0D14] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-2xl font-black mb-6 text-slate-800 dark:text-slate-200 tracking-tight">Numerical Methods & Implementation</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-2xl border border-blue-200">
                  <h5 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2 uppercase text-sm tracking-widest">
                    <Binary className="w-4 h-4" /> Binomial Trees
                  </h5>
                  <p className="text-sm text-[#A8672E] dark:text-[#D08F52] leading-relaxed mb-3">
                    Cox-Ross-Rubinstein trees discretize the continuous process into up/down moves. Perfect for American options and path-dependent payoffs.
                  </p>
                  <div className="text-xs text-[#A8672E] dark:text-[#D08F52] font-mono bg-[#A8672E] dark:bg-[#D08F52] p-2 rounded">
                    u = e^(σ√Δt), d = 1/u
                  </div>
                </div>

                <div className="p-6 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-2xl border border-green-200">
                  <h5 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3 flex items-center gap-2 uppercase text-sm tracking-widest">
                    <Activity className="w-4 h-4" /> Monte Carlo
                  </h5>
                  <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] leading-relaxed mb-3">
                    Simulate thousands of price paths and average the payoffs. Excellent for exotic options and high-dimensional problems.
                  </p>
                  <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] font-mono bg-[#1D8A70] dark:bg-[#3CBF9C] p-2 rounded">
                    S(T) = S₀ × e^((r-σ²/2)T + σ√T×Z)
                  </div>
                </div>

                <div className="p-6 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-2xl border border-rose-200">
                  <h5 className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-3 flex items-center gap-2 uppercase text-sm tracking-widest">
                    <Layers className="w-4 h-4" /> Finite Difference
                  </h5>
                  <p className="text-sm text-[#BC4128] dark:text-[#E2694A] leading-relaxed mb-3">
                    Solve the Black-Scholes PDE directly using numerical grids. Handles complex boundary conditions and early exercise features.
                  </p>
                  <div className="text-xs text-[#BC4128] dark:text-[#E2694A] font-mono bg-[#BC4128] dark:bg-[#E2694A] p-2 rounded">
                    Explicit, Implicit, Crank-Nicolson
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-3xl shadow-2xl">
              <h4 className="text-2xl font-black mb-6 text-center">The Practitioner&apos;s Toolkit</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-4 uppercase text-sm tracking-widest">Market Making</h5>
                  <ul className="space-y-2 text-sm text-[#A8672E] dark:text-[#D08F52]">
                    <li>• Delta-neutral inventory management</li>
                    <li>• Gamma scalping for profit extraction</li>
                    <li>• Volatility surface interpolation</li>
                    <li>• Risk limits and position sizing</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-purple-300 mb-4 uppercase text-sm tracking-widest">Portfolio Management</h5>
                  <ul className="space-y-2 text-sm text-purple-100">
                    <li>• Volatility forecasting models</li>
                    <li>• Correlation trading strategies</li>
                    <li>• Tail risk hedging programs</li>
                    <li>• Dynamic hedging algorithms</li>
                  </ul>
                </div>
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
            color="border-rose-600 text-[#BC4128] dark:text-[#E2694A]" 
          />
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <DetailCard 
                title="Fat Tails (Kurtosis)" 
                icon={TrendingDown} 
                colorClass="bg-[#BC4128] dark:bg-[#E2694A] text-[#BC4128] dark:text-[#E2694A]"
                footer="Statistical Bias"
              >
                Real market returns have &quot;Heavy Tails.&quot; The model assumes a 10-sigma crash happens once every 10 billion years; in the real &quot;Territory,&quot; these events happen almost every decade. The normal distribution underestimates extreme events by orders of magnitude. This is why VIX spikes to 80+ during crises, not the 20-30 that normal distributions would predict.
              </DetailCard>
              <DetailCard 
                title="Gap & Liquidity Risk" 
                icon={AlertTriangle} 
                colorClass="bg-amber-100 text-amber-600"
                footer="Execution Failure"
              >
                The model assumes prices move continuously. In reality, markets <strong>Gap</strong> overnight from $100 to $80. A delta-hedger cannot adjust their position mid-gap, leading to &quot;Jump Risk&quot; bankruptcy. This is particularly dangerous for short option positions during earnings announcements or geopolitical events.
              </DetailCard>
            </div>
            
            {/* Additional Limitations */}
            <div className="grid md:grid-cols-3 gap-6">
              <DetailCard 
                title="Stochastic Volatility" 
                icon={Wind} 
                colorClass="bg-purple-100 text-purple-600"
                footer="Parameter Instability"
              >
                Volatility is not constant—it clusters, mean-reverts, and correlates with price movements. The &quot;volatility smile&quot; exists because traders know the model is wrong and adjust prices accordingly. Modern models like Heston and SABR attempt to capture this stochastic nature.
              </DetailCard>
              <DetailCard 
                title="Transaction Costs" 
                icon={Wallet} 
                colorClass="bg-[#A8672E] dark:bg-[#D08F52] text-[#A8672E] dark:text-[#D08F52]"
                footer="Friction Reality"
              >
                Real trading involves bid-ask spreads, commissions, and market impact. High-frequency delta hedging becomes prohibitively expensive. This creates &quot;hedging bands&quot; where traders only rehedge when Delta moves beyond certain thresholds, introducing basis risk.
              </DetailCard>
              <DetailCard 
                title="Interest Rate Risk" 
                icon={TrendingUp} 
                colorClass="bg-[#1D8A70] dark:bg-[#3CBF9C] text-[#1D8A70] dark:text-[#3CBF9C]"
                footer="Rate Sensitivity"
              >
                Interest rates are not constant, especially for longer-dated options. Changes in the yield curve affect option values through Rho, and the correlation between rates and stock prices creates additional complexity that the basic model ignores.
              </DetailCard>
            </div>
            
            <div className="p-10 bg-white dark:bg-[#0A0D14] rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-500 transition-colors">
              <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
                <div className="lg:w-1/2">
                  <h4 className="text-2xl font-black mb-3">The Volatility Smile</h4>
                  <p className="text-slate-500 text-base leading-relaxed mb-6">
                    Professional traders don&apos;t quote options in dollars; they quote them in &quot;Volatility points.&quot; The <strong>Smile</strong> is the map of how much the model is currently underestimating the probability of extreme events.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#14171B] rounded-xl">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">OTM Puts</span>
                      <span className="text-sm text-[#BC4128] dark:text-[#E2694A]">Higher IV (Crash Protection)</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#14171B] rounded-xl">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">ATM Options</span>
                      <span className="text-sm text-[#A8672E] dark:text-[#D08F52]">Baseline IV</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#14171B] rounded-xl">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">OTM Calls</span>
                      <span className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">Lower IV (Momentum Bias)</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 bg-[#A8672E] dark:bg-[#D08F52] rounded-2xl text-white shadow-xl">
                  <h5 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 uppercase text-xs tracking-widest">Masterclass Takeaway</h5>
                  <p className="text-sm text-[#A8672E] dark:text-[#D08F52] leading-relaxed italic mb-4">
                    &quot;Black-Scholes is the first map of a random world. It is flawed, elegant, and essential. It doesn&apos;t tell you the price; it tells you the language of value.&quot;
                  </p>
                  <div className="p-4 bg-white dark:bg-[#0A0D14]/10 rounded-xl border border-white/20">
                    <h6 className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">Modern Usage</h6>
                    <p className="text-xs text-[#A8672E] dark:text-[#D08F52] leading-relaxed">
                      Today, Black-Scholes serves as the &quot;numeraire&quot; for option pricing—a common language that allows traders to compare the relative cheapness of different options by converting prices to implied volatilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    </ArticleFrame>
  );
}
