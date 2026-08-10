'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, ShieldAlert, Cpu, BarChart3, BrainCircuit, History, Target, Calculator, Zap, BookOpen, ArrowRight, Info, Layers, Activity, Search, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Math Rendering Component (using KaTeX CDN)
const Math = ({ formula, display = false, className = "" }: { formula: string; display?: boolean; className?: string }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if ((window as any).katex && containerRef.current) {
      try {
        (window as any).katex.render(formula, containerRef.current, {
          throwOnError: false,
          displayMode: display
        });
      } catch (err) {
        console.error("KaTeX rendering error:", err);
        if (containerRef.current) {
          containerRef.current.textContent = formula;
        }
      }
    }
  }, [formula, display]);

  return (
    <span 
      ref={containerRef} 
      className={`inline-block font-serif ${className} ${display ? 'my-4 block w-full text-center overflow-x-auto' : ''}`}
    >
      {formula}
    </span>
  );
};

// Updated SectionHeader to handle dark/light themes
const SectionHeader = ({ icon: Icon, title, subtitle, colorClass, isDark = false }: {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  subtitle: string;
  colorClass: string;
  isDark?: boolean;
}) => (
  <div className="mb-10">
    <div className={`inline-flex items-center justify-center p-3 rounded-2xl ${colorClass} text-white mb-6 shadow-xl ring-4 ring-opacity-20 ${colorClass.replace('bg-', 'ring-')}`}>
      <Icon size={32} />
    </div>
    <h2 className={`text-4xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900 dark:text-white'} dark:text-white`}>
      {title}
    </h2>
    <div className={`h-1.5 w-24 bg-gradient-to-r from-current to-transparent opacity-20 mb-4 ${isDark ? 'text-white' : 'text-[#A8672E] dark:text-[#D08F52]'} dark:text-[#A8672E] dark:text-[#D08F52]`}></div>
    <p className={`text-xl max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'} dark:text-slate-300`}>
      {subtitle}
    </p>
  </div>
);

const DeepDiveCard = ({ title, children, icon: Icon }: {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size: number }>;
}) => (
  <div className="bg-slate-50 dark:bg-slate-900/20 dark:bg-[#14171B] border border-slate-200 dark:border-slate-800 dark:border-white/10 rounded-3xl p-8 relative overflow-hidden group mb-6">
    <div className="absolute top-0 right-0 p-6 text-slate-200 dark:text-slate-800 dark:text-white group-hover:text-slate-300 dark:group-hover:text-slate-700 dark:text-slate-300 transition-colors">
      {Icon && <Icon size={64} />}
    </div>
    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
      {title}
    </h4>
    <div className="text-slate-600 dark:text-slate-400 dark:text-slate-300 space-y-4 text-sm md:text-base leading-relaxed relative z-10">
      {children}
    </div>
  </div>
);

const FormulaBox = ({ formula, label, color = "indigo" }: {
  formula: string;
  label: string;
  color?: string;
}) => (
  <div className={`my-6 bg-white dark:bg-[#14171B] border border-${color}-100 dark:border-${color}-900/30 shadow-sm rounded-2xl p-8 text-center transition-all hover:shadow-md`}>
    <Math formula={formula} display={true} className="text-2xl text-slate-900 dark:text-white" />
    <div className={`h-px w-12 mx-auto bg-slate-200 dark:bg-slate-800 my-4`}></div>
    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">{label}</p>
  </div>
);

export default function ModelingExpectedReturnsArticle() {
  const [isKaTeXLoaded, setIsKaTeXLoaded] = useState(false);
  const secondInfographicUrl = "https://i.imgur.com/21wKTRQ.jpeg";

  useEffect(() => {
    // Load KaTeX Styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);

    // Load KaTeX Script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.async = true;
    script.onload = () => setIsKaTeXLoaded(true);
    document.head.appendChild(script);
  }, []);

  if (!isKaTeXLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900/20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mb-4"></div>
          <p className="text-slate-400 font-medium">Initializing Quantitative Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <ArticleFrame
      slug="modeling-expected-returns-quantitative-foundation-modern-portfolio-theory"
      additionalDisclaimer="The mathematical models discussed are simplified representations for educational understanding. Always consult with qualified financial professionals before making investment decisions."
    >
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-40 font-sans text-slate-900 dark:text-white dark:text-slate-300 bg-transparent">
        <div className="-mb-24">
          <InfographicSlot alt="Modeling Expected Returns Infographic" />
        </div>
          {/* Section 1: The Precision Paradox */}
          <section id="modeling">
            <SectionHeader 
              icon={Calculator}
              title="1. The Precision Paradox"
              subtitle="Why Expected Return is both the most influential and the most volatile variable in asset allocation."
              colorClass="bg-[#A8672E] dark:bg-[#D08F52]"
            />
            
            {/* Introduction */}
            <div className="mb-16 p-8 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-[#14171B] dark:to-blue-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/30">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Expected return is the <strong>most critical</strong> yet <strong>most uncertain</strong> input in quantitative finance. 
                A 1% change in expected return can shift optimal portfolio weights by 20-30%, yet our ability to forecast returns 
                is notoriously poor. This creates the fundamental tension at the heart of modern portfolio theory.
              </p>
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/30">
                <h4 className="font-bold text-indigo-900 dark:text-[#A8672E] dark:text-[#D08F52] mb-3">The Sensitivity Problem</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Consider a stock with expected return of 10%. If we revise this to 11%, the Discounted Cash Flow model 
                  suggests the stock is now 20-25% undervalued. This extreme sensitivity makes portfolio optimization 
                  an "error maximization" exercise without proper constraints.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif italic">Fundamental Valuation Framework</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  Every asset price reflects the market's consensus about future cash flows and the appropriate discount rate. 
                  The expected return serves as this discount rate, making it the fulcrum upon which all valuations balance.
                </p>

                {/* DCF Model */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900/20 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white flex items-center justify-center shrink-0 font-bold">1</div>
                    <div className="flex-1 overflow-hidden">
                      <span className="font-bold block text-slate-900 dark:text-white mb-3">Discounted Cash Flow Model</span>
                      <Math formula={"P_0 = \\sum_{t=1}^{\\infty} \\frac{CF_t}{(1 + E[r])^t}"} display={true} className="text-indigo-900 dark:text-[#A8672E] dark:text-[#D08F52]" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                        Where P₀ is current price, CF_t is cash flow in period t, and E[r] is the expected return (discount rate).
                      </p>
                    </div>
                  </div>

                  {/* Gordon Growth Model */}
                  <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900/20 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white flex items-center justify-center shrink-0 font-bold">2</div>
                    <div className="flex-1 overflow-hidden">
                      <span className="font-bold block text-slate-900 dark:text-white mb-3">Gordon Growth Model (Perpetual Growth)</span>
                      <Math formula={"P_0 = \\frac{D_1}{r - g}"} display={true} className="text-indigo-900 dark:text-[#A8672E] dark:text-[#D08F52]" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                        For dividend-paying stocks: D₁ is next year's dividend, r is required return, g is growth rate.
                        Notice how small changes in (r-g) create massive price swings.
                      </p>
                    </div>
                  </div>

                  {/* Earnings Yield Model */}
                  <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900/20 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white flex items-center justify-center shrink-0 font-bold">3</div>
                    <div className="flex-1 overflow-hidden">
                      <span className="font-bold block text-slate-900 dark:text-white mb-3">Earnings Yield Relationship</span>
                      <Math formula={"\\frac{E}{P} = r - g"} display={true} className="text-indigo-900 dark:text-[#A8672E] dark:text-[#D08F52]" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                        The earnings yield (E/P) equals the risk premium above growth. This explains why high P/E ratios 
                        imply either low expected returns or high growth expectations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Practical Example */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-6">
                  <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-4 flex items-center gap-2">
                    <Calculator size={20} />
                    Sensitivity Analysis Example
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-3 gap-4 font-mono bg-white dark:bg-[#0A0D14] p-3 rounded-lg">
                      <div className="font-bold dark:text-white">Expected Return</div>
                      <div className="font-bold dark:text-white">Fair Value</div>
                      <div className="font-bold dark:text-white">Implied Action</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#0A0D14] p-3 rounded-lg">
                      <div>9%</div>
                      <div>$111.11</div>
                      <div className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Strong Buy</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#0A0D14] p-3 rounded-lg">
                      <div>10%</div>
                      <div>$100.00</div>
                      <div className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Fair Value</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#0A0D14] p-3 rounded-lg">
                      <div>11%</div>
                      <div>$90.91</div>
                      <div className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Strong Sell</div>
                    </div>
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-3 italic">
                    Assumes $10 annual cash flow in perpetuity. A 2% change in expected return creates 22% price volatility.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <DeepDiveCard title="The Geometry of Returns" icon={Activity}>
                  <p className="mb-4">
                    The mathematical relationship between arithmetic and geometric returns reveals why volatility is a wealth destroyer. 
                    This "variance drag" effect is often overlooked in return projections.
                  </p>
                  <FormulaBox 
                    formula={"R_{geom} = R_{arith} - \\frac{\\sigma^2}{2}"} 
                    label="Geometric Return Approximation"
                  />
                  <div className="bg-white dark:bg-[#14171B] p-4 rounded-xl border border-slate-100 dark:border-slate-800 mt-4">
                    <h5 className="font-bold text-slate-800 dark:text-white mb-2">Exact Formula:</h5>
                    <Math formula={"R_{geom} = \\sqrt[n]{\\prod_{i=1}^{n}(1 + R_i)} - 1"} display={true} className="text-slate-700 dark:text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                    <strong>Key Insight:</strong> A stock with 15% arithmetic return and 20% volatility has geometric return of 
                    approximately 13% (15% - 20²/2 = 13%). The 2% difference compounds dramatically over time.
                  </p>
                </DeepDiveCard>

                <DeepDiveCard title="The Volatility Tax" icon={TrendingUp}>
                  <p className="mb-4">
                    High volatility assets face a "tax" on their long-term returns due to the mathematics of compounding. 
                    This creates a natural bias toward lower-volatility investments in long-term portfolios.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl">
                    <h5 className="font-bold mb-2">10-Year Wealth Comparison:</h5>
                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span>Low Vol (10% return, 5% vol):</span>
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">$2.59</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High Vol (10% return, 25% vol):</span>
                        <span className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">$2.28</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                    Despite identical arithmetic returns, the low-volatility asset generates 14% more wealth over 10 years.
                  </p>
                </DeepDiveCard>

                <DeepDiveCard title="Regime Dependency" icon={BarChart3}>
                  <p className="mb-4">
                    Expected returns are not constant—they vary with economic regimes, market cycles, and valuation levels. 
                    Static models fail to capture this dynamic nature.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-900/30">
                      <div className="font-bold text-green-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]">Bull Market</div>
                      <div className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">High momentum, low risk premiums</div>
                    </div>
                    <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-900/30">
                      <div className="font-bold text-red-800 dark:text-[#BC4128] dark:text-[#E2694A]">Bear Market</div>
                      <div className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Mean reversion, high risk premiums</div>
                    </div>
                    <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/30">
                      <div className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">Low Volatility</div>
                      <div className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Compressed risk premiums</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-900/30">
                      <div className="font-bold text-purple-800 dark:text-purple-400">High Volatility</div>
                      <div className="text-purple-600 dark:text-purple-400">Elevated risk premiums</div>
                    </div>
                  </div>
                </DeepDiveCard>
              </div>
            </div>
          </section>

          {/* Section 2: Risk Symbiosis */}
          <section id="risk">
            <SectionHeader 
              icon={ShieldAlert}
              title="2. Risk-Return Equilibrium"
              subtitle="The market pays you to bear systemic risk. Modeling returns requires modeling the compensation for uncertainty."
              colorClass="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/200"
            />

            {/* Introduction */}
            <div className="mb-16 p-8 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-[#14171B] dark:to-rose-900/10 rounded-3xl border border-rose-100 dark:border-rose-900/30">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Risk and return are inextricably linked through the fundamental principle of <strong>no arbitrage</strong>. 
                Higher expected returns must be justified by higher systematic risk—risk that cannot be diversified away. 
                This relationship forms the theoretical foundation for all asset pricing models.
              </p>
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-rose-200 dark:border-rose-900/30">
                <h4 className="font-bold text-rose-900 dark:text-[#BC4128] dark:text-[#E2694A] mb-3">The Risk Premium Puzzle</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Why do stocks earn 6-8% more than bonds over the long term? The answer lies in systematic risk exposure. 
                  Stocks are leveraged claims on the real economy, making them sensitive to business cycles, inflation, 
                  and systemic shocks that bonds can partially avoid.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-8 mb-16">
              <div className="md:col-span-3 space-y-6">
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 rounded-3xl p-10 border border-rose-100 dark:border-rose-900/30 relative overflow-hidden h-full flex flex-col justify-center">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-rose-900 dark:text-[#BC4128] dark:text-[#E2694A] mb-6 underline decoration-rose-200 decoration-4 underline-offset-8 font-serif">
                      Capital Asset Pricing Model (CAPM)
                    </h3>
                    <p className="text-rose-800 dark:text-[#BC4128] dark:text-[#E2694A]/80 dark:text-rose-300 text-lg leading-relaxed mb-8">
                      Under CAPM, expected returns are purely a function of systematic risk (beta). 
                      Assets with higher correlation to market movements demand higher expected returns as compensation.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14]/60 dark:bg-black/40 p-6 rounded-2xl border border-white mb-6">
                      <Math formula={"E[R_i] = R_f + \\beta_i (E[R_m] - R_f)"} display={true} className="text-3xl text-rose-900 dark:text-[#BC4128] dark:text-[#E2694A]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white dark:bg-[#0A0D14]/40 dark:bg-black/40 p-4 rounded-xl">
                        <div className="font-bold text-rose-800 dark:text-[#BC4128] dark:text-[#E2694A]">Risk-Free Rate (Rf)</div>
                        <div className="text-[#BC4128] dark:text-[#E2694A] dark:text-rose-300">Treasury bills, government bonds</div>
                      </div>
                      <div className="bg-white dark:bg-[#0A0D14]/40 dark:bg-black/40 p-4 rounded-xl">
                        <div className="font-bold text-rose-800 dark:text-[#BC4128] dark:text-[#E2694A]">Market Premium</div>
                        <div className="text-[#BC4128] dark:text-[#E2694A] dark:text-rose-300">E[Rm] - Rf ≈ 6-8% historically</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 bg-slate-900 dark:bg-[#14171B] rounded-3xl p-10 text-white flex flex-col justify-center border border-transparent dark:border-slate-800 border-b-8 border-[#BC4128] dark:border-[#E2694A]">
                <h4 className="text-[#BC4128] dark:text-[#E2694A] font-bold mb-4 uppercase text-xs tracking-widest">The Quant's Edge</h4>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Returns are hard to estimate, but <strong>risk</strong> is relatively stable. Quants often start with a risk target and solve for the returns necessary to justify that risk.
                </p>
                <div className="bg-slate-800 p-4 rounded-xl mb-4">
                  <Math formula={"\\text{Sharpe Ratio} = \\frac{E[R] - R_f}{\\sigma}"} display={true} className="text-rose-300" />
                </div>
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <p className="text-sm font-mono text-rose-300">Target Sharpe = 0.5 to 1.0</p>
                  <p className="text-xs text-slate-400 mt-2">Institutional benchmark for risk-adjusted performance</p>
                </div>
              </div>
            </div>

            {/* Beta Calculation and Interpretation */}
            <div className="grid lg:grid-cols-2 gap-16 mb-16">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Understanding Beta</h3>
                <div className="bg-slate-50 dark:bg-slate-900/20 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-4">Beta Calculation</h4>
                  <Math formula={"\\beta_i = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)} = \\rho_{i,m} \\cdot \\frac{\\sigma_i}{\\sigma_m}"} display={true} className="text-slate-700 dark:text-slate-300 mb-4" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Beta measures how much an asset moves relative to the market. It combines correlation (ρ) with relative volatility (σᵢ/σₘ).
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-900/30">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center font-bold text-green-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]">β&lt;1</div>
                    <div>
                      <div className="font-bold text-green-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]">Defensive Assets</div>
                      <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Utilities, consumer staples, bonds</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-900/30">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">β=1</div>
                    <div>
                      <div className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">Market Assets</div>
                      <div className="text-sm text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Index funds, diversified portfolios</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-900/30">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center font-bold text-red-800 dark:text-[#BC4128] dark:text-[#E2694A]">β&gt;1</div>
                    <div>
                      <div className="font-bold text-red-800 dark:text-[#BC4128] dark:text-[#E2694A]">Aggressive Assets</div>
                      <div className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Technology, small-cap, leverage</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <DeepDiveCard title="Multi-Factor Models" icon={Layers}>
                  <p className="mb-4">
                    CAPM's single-factor approach has been extended to capture additional risk premiums. 
                    The Fama-French model adds size and value factors to better explain return variations.
                  </p>
                  <div className="bg-white dark:bg-[#14171B] p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h5 className="font-bold text-slate-800 dark:text-white mb-2">Fama-French Three-Factor Model:</h5>
                    <Math formula={"E[R_i] = R_f + \\beta_i(R_m - R_f) + s_i \\cdot SMB + h_i \\cdot HML"} display={true} className="text-slate-700 dark:text-slate-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-2 rounded">
                      <div className="font-bold">SMB</div>
                      <div>Small Minus Big</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-2 rounded">
                      <div className="font-bold">HML</div>
                      <div>High Minus Low (Value)</div>
                    </div>
                  </div>
                </DeepDiveCard>

                <DeepDiveCard title="Risk Parity Insight" icon={Target}>
                  <p className="mb-4">
                    Risk Parity portfolios weight assets by the inverse of their risk contribution, not their market capitalization. 
                    This approach recognizes that expected returns should scale with risk.
                  </p>
                  <div className="bg-white dark:bg-[#14171B] p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Math formula={"w_i = \\frac{1/\\sigma_i}{\\sum_{j=1}^{n} 1/\\sigma_j}"} display={true} className="text-slate-700 dark:text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                    Each asset contributes equally to portfolio risk, leading to more balanced risk exposure across asset classes.
                  </p>
                </DeepDiveCard>
              </div>
            </div>

            {/* Risk Premium Decomposition */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-[#14171B] dark:to-slate-900/10 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Risk Premium Decomposition</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/200 rounded-full"></div>
                    Credit Risk Premium
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Compensation for default risk in corporate bonds and leveraged assets.
                  </p>
                  <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900/20 p-2 rounded">
                    AAA: +0.5-1.0%<br/>
                    BBB: +1.5-2.5%<br/>
                    High Yield: +4-8%
                  </div>
                </div>
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/200 rounded-full"></div>
                    Liquidity Premium
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Extra return demanded for assets that are difficult to trade quickly.
                  </p>
                  <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900/20 p-2 rounded">
                    Large Cap: +0.1%<br/>
                    Small Cap: +1-2%<br/>
                    Private: +3-5%
                  </div>
                </div>
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-50 dark:bg-purple-900/200 rounded-full"></div>
                    Volatility Premium
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Additional return for bearing higher price volatility and uncertainty.
                  </p>
                  <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900/20 p-2 rounded">
                    Low Vol: +2-4%<br/>
                    Market: +6-8%<br/>
                    High Vol: +10-15%
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: The Black-Litterman Evolution */}
          <section id="evolution">
            <SectionHeader 
              icon={History}
              title="3. The Bayesian Revolution"
              subtitle="How Black-Litterman solved the 'Error Maximization' problem of traditional optimization."
              colorClass="bg-amber-50 dark:bg-amber-900/200"
            />

            {/* Introduction */}
            <div className="mb-16 p-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-[#14171B] dark:to-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/30">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Traditional mean-variance optimization suffers from a fatal flaw: it amplifies estimation errors. 
                Small errors in expected return estimates lead to extreme, concentrated portfolios. Black-Litterman 
                revolutionized portfolio construction by starting with market equilibrium and incorporating investor views through Bayesian updating.
              </p>
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-amber-200 dark:border-amber-900/30">
                <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-3">The Error Maximization Problem</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Markowitz optimization is mathematically equivalent to "error maximization"—it finds the portfolio 
                  that most aggressively exploits the differences in expected returns, even when those differences 
                  are largely due to estimation noise rather than genuine alpha opportunities.
                </p>
              </div>
            </div>

            <div className="relative border-l-4 border-amber-200 ml-8 pl-16 space-y-32">
              {/* Evolution I: Historical Sampling */}
              <div className="relative">
                <div className="absolute -left-[73px] top-0 w-8 h-8 rounded-full bg-white dark:bg-[#0A0D14] border-4 border-slate-300 shadow-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">1</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/20 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                  <h4 className="text-3xl font-bold mb-6 text-slate-600 dark:text-slate-400">Evolution I: Historical Sampling</h4>
                  <p className="text-slate-500 dark:text-slate-300 text-lg leading-relaxed mb-6">
                    The most dangerous method. It assumes the last 10 years of returns (often a bull market) will repeat indefinitely, 
                    leading to buying high and selling low.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <h5 className="font-bold text-slate-800 dark:text-white mb-3">Sample Mean Estimator</h5>
                      <Math formula={"\\hat{\\mu} = \\frac{1}{T} \\sum_{t=1}^{T} R_t"} display={true} className="text-slate-700 dark:text-slate-300" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                        Simple average of historical returns. Highly unstable and regime-dependent.
                      </p>
                    </div>
                    <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-900/30">
                      <h5 className="font-bold text-red-800 dark:text-[#BC4128] dark:text-[#E2694A] mb-3">Problems</h5>
                      <ul className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-red-300 space-y-2">
                        <li>• Survivorship bias</li>
                        <li>• Regime instability</li>
                        <li>• Look-ahead bias</li>
                        <li>• Extreme portfolios</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-xl">
                    <p className="text-sm text-yellow-800 dark:text-yellow-400">
                      <strong>Example:</strong> Using 2010-2020 data to optimize a portfolio in 2021 would have resulted in 
                      massive overweights to growth stocks and technology, precisely at their peak valuations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Evolution II: Black-Litterman Framework */}
              <div className="relative">
                <div className="absolute -left-[73px] top-0 w-8 h-8 rounded-full bg-white dark:bg-[#0A0D14] border-4 border-amber-500 shadow-lg shadow-amber-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">2</span>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-[#14171B] dark:to-amber-900/10 p-8 rounded-3xl border border-amber-200 dark:border-amber-900/30">
                  <h4 className="text-3xl font-bold mb-6 text-amber-900 dark:text-amber-400">Evolution II: Black-Litterman Framework</h4>
                  
                  <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm border border-amber-100 dark:border-amber-900/30 mb-8">
                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium text-lg">
                      We blend Market Consensus (equilibrium returns) with Investor Views using Bayesian statistics. 
                      The result is a more diversified, less sensitive portfolio that doesn't bet the farm on estimation errors.
                    </p>
                    
                    <div className="bg-slate-50 dark:bg-slate-900/20 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto mb-6">
                      <h5 className="font-bold text-slate-800 dark:text-white mb-4 text-center">The Black-Litterman Formula</h5>
                      <Math 
                        formula={"E[R]_{BL} = [(\\tau \\Sigma)^{-1} + P^T \\Omega^{-1} P]^{-1} [(\\tau \\Sigma)^{-1} \\Pi + P^T \\Omega^{-1} Q]"} 
                        display={true} 
                        className="text-2xl text-slate-800 dark:text-white" 
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 text-center">
                        <span className="block text-xs font-bold text-amber-700 dark:text-amber-400 uppercase mb-2">Market Equilibrium</span>
                        <Math formula={"\\Pi"} className="text-xl text-amber-800 dark:text-amber-400" />
                        <p className="text-xs text-amber-600 mt-2">Implied returns from market caps</p>
                      </div>
                      <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30 text-center">
                        <span className="block text-xs font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300 uppercase mb-2">Investor Views</span>
                        <Math formula={"Q"} className="text-xl text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]" />
                        <p className="text-xs text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-2">Subjective return forecasts</p>
                      </div>
                      <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-900/30 text-center">
                        <span className="block text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-green-300 uppercase mb-2">View Confidence</span>
                        <Math formula={"\\Omega"} className="text-xl text-green-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]" />
                        <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mt-2">Uncertainty in views</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-900/30 text-center">
                        <span className="block text-xs font-bold text-purple-700 dark:text-purple-300 uppercase mb-2">Covariance</span>
                        <Math formula={"\\Sigma"} className="text-xl text-purple-800 dark:text-purple-400" />
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Historical risk model</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Component Breakdown */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h5 className="font-bold text-slate-800 dark:text-white mb-4">Market Equilibrium Returns (Π)</h5>
                        <Math formula={"\\Pi = \\lambda \\Sigma w_{market}"} display={true} className="text-slate-700 dark:text-slate-300 mb-3" />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Reverse-engineer expected returns from market capitalizations, assuming markets are in equilibrium.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/20 p-3 rounded-lg text-xs">
                          <div className="font-mono">λ = risk aversion parameter (2-4)</div>
                          <div className="font-mono">w_market = market cap weights</div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h5 className="font-bold text-slate-800 dark:text-white mb-4">View Specification Matrix (P)</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Links portfolio assets to investor views. Each row represents one view.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/20 p-3 rounded-lg text-xs font-mono">
                          P = [1, 0, -1, 0]  # Stock A outperforms Stock C<br/>
                          P = [0.5, 0.5, 0, 0]  # Equal-weight A+B portfolio view
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h5 className="font-bold text-slate-800 dark:text-white mb-4">Confidence Parameter (τ)</h5>
                        <Math formula={"\\tau = \\frac{1}{T}"} display={true} className="text-slate-700 dark:text-slate-300 mb-3" />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Scales the uncertainty of equilibrium returns. Typically 0.01-0.05.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/20 p-3 rounded-lg text-xs">
                          Higher τ = less confidence in equilibrium, more weight to views
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h5 className="font-bold text-slate-800 dark:text-white mb-4">View Uncertainty (Ω)</h5>
                        <Math formula={"\\Omega = \\text{diag}(P \\Sigma P^T)"} display={true} className="text-slate-700 dark:text-slate-300 mb-3" />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Diagonal matrix representing uncertainty in each view. Higher values = less confident views.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/20 p-3 rounded-lg text-xs">
                          Often set to α × (P Σ P^T) where α = 0.1 to 1.0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evolution III: Modern Extensions */}
              <div className="relative">
                <div className="absolute -left-[73px] top-0 w-8 h-8 rounded-full bg-white dark:bg-[#0A0D14] border-4 border-[#1D8A70] dark:border-[#3CBF9C] shadow-lg shadow-emerald-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300">3</span>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-[#14171B] dark:to-emerald-900/10 p-8 rounded-3xl border border-emerald-200 dark:border-emerald-900/30">
                  <h4 className="text-3xl font-bold mb-6 text-emerald-900 dark:text-[#1D8A70] dark:text-[#3CBF9C]">Evolution III: Modern Extensions</h4>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30">
                        <h5 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3 flex items-center gap-2">
                          <BrainCircuit size={20} />
                          Machine Learning Integration
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Modern implementations use ML models to generate views (Q) and estimate confidence levels (Ω) dynamically.
                        </p>
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 p-3 rounded-lg text-xs">
                          • Factor models for view generation<br/>
                          • Ensemble methods for confidence<br/>
                          • Real-time view updating
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30">
                        <h5 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3 flex items-center gap-2">
                          <Target size={20} />
                          Multi-Asset Extensions
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Extended to handle multiple asset classes, currencies, and alternative investments.
                        </p>
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 p-3 rounded-lg text-xs">
                          • Cross-asset momentum views<br/>
                          • Currency hedging decisions<br/>
                          • Alternative risk premiums
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30">
                        <h5 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3 flex items-center gap-2">
                          <Activity size={20} />
                          Dynamic Rebalancing
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Views and confidence levels update continuously based on new information and market conditions.
                        </p>
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 p-3 rounded-lg text-xs">
                          • Regime-dependent parameters<br/>
                          • Volatility-adjusted confidence<br/>
                          • Transaction cost optimization
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30">
                        <h5 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3 flex items-center gap-2">
                          <Layers size={20} />
                          Robust Optimization
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Incorporates parameter uncertainty directly into the optimization process.
                        </p>
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 p-3 rounded-lg text-xs">
                          • Worst-case scenario planning<br/>
                          • Ambiguity aversion modeling<br/>
                          • Stress-test integration
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Implementation Example */}
            <div className="mt-16 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-[#14171B] dark:to-slate-900/10 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Practical Implementation Example</h3>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-4">Step 1: Market Equilibrium</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between font-mono">
                      <span>US Stocks (60%):</span>
                      <span>7.2%</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Intl Stocks (25%):</span>
                      <span>6.8%</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Bonds (15%):</span>
                      <span>3.5%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-4">Step 2: Investor Views</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-3 rounded-lg">
                      <div className="font-bold">View 1:</div>
                      <div>US stocks outperform by 2%</div>
                      <div className="text-xs text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Confidence: 65%</div>
                    </div>
                    <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 p-3 rounded-lg">
                      <div className="font-bold">View 2:</div>
                      <div>Bonds underperform by 1%</div>
                      <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Confidence: 80%</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-4">Step 3: BL Output</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between font-mono">
                      <span>US Stocks:</span>
                      <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">68% (+8%)</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Intl Stocks:</span>
                      <span className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">22% (-3%)</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Bonds:</span>
                      <span className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">10% (-5%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Infographic - Advanced Methodologies */}
          <section className="max-w-6xl mx-auto px-6 py-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Advanced Expected Return Methodologies</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                A comprehensive visual guide to the sophisticated techniques used by institutional investors 
                for modeling expected returns across different market regimes and asset classes.
              </p>
            </div>
            <InfographicSlot 
              src={secondInfographicUrl} 
              alt="Advanced Expected Return Methodologies Infographic" 
              label="Advanced Methodologies"
            />
          </section>

          {/* Section 4: Machine Learning */}
          <section id="ai" className="bg-slate-900 dark:bg-[#14171B] rounded-[4rem] p-12 md:p-20 text-white overflow-hidden relative border-t-8 border-violet-500">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-violet-500/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <SectionHeader 
                icon={BrainCircuit}
                title="4. Non-Linear Horizons"
                subtitle="Capturing regime shifts and multi-factor interactions that linear models miss."
                colorClass="bg-violet-500"
                isDark={true}
              />

              {/* Introduction */}
              <div className="mb-16 p-8 bg-white dark:bg-[#0A0D14]/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="text-xl text-slate-300 leading-relaxed mb-6">
                  Financial markets are fundamentally <strong className="text-white">non-linear systems</strong>. 
                  Traditional models assume relationships remain constant, but reality shows that factor loadings, 
                  correlations, and risk premiums shift dramatically across market regimes. Machine learning captures 
                  these complex, time-varying relationships that linear models cannot detect.
                </p>
                <div className="bg-violet-500/20 p-6 rounded-2xl border border-violet-400/30">
                  <h4 className="font-bold text-violet-200 mb-3">The Interaction Effect</h4>
                  <p className="text-slate-300 text-sm">
                    A "Value" signal might only work when "Volatility" is low and "Momentum" is negative. 
                    These three-way interactions are invisible to linear models but crucial for alpha generation.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 mb-16">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-white mb-6 font-serif">Machine Learning Approaches</h3>
                  
                  {/* Regularization */}
                  <div className="p-8 bg-white dark:bg-[#0A0D14]/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <h5 className="font-bold text-violet-300 mb-4 flex items-center gap-2">
                      <Layers size={20} /> Regularization & Feature Selection
                    </h5>
                    <p className="text-sm text-slate-400 mb-6">
                      Financial data is notoriously noisy. We use regularization techniques to prevent overfitting 
                      and identify the most predictive features from hundreds of potential signals.
                    </p>
                    <div className="bg-slate-800 p-6 rounded-xl text-center mb-4">
                      <h6 className="text-violet-200 font-bold mb-2">Elastic Net Penalty</h6>
                      <Math 
                        formula={"\\min \\left( \\|y - X\\beta\\|^2 + \\lambda_1 \\sum |\\beta_j| + \\lambda_2 \\sum \\beta_j^2 \\right)"} 
                        display={true} 
                        className="text-violet-200" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-violet-300">L1 Penalty (λ₁)</div>
                        <div className="text-slate-400">Feature selection, sparse solutions</div>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-violet-300">L2 Penalty (λ₂)</div>
                        <div className="text-slate-400">Coefficient shrinkage, stability</div>
                      </div>
                    </div>
                  </div>

                  {/* Cross-Validation */}
                  <div className="p-6 bg-white dark:bg-[#0A0D14]/5 rounded-2xl border border-white/10">
                    <h5 className="font-bold text-violet-300 mb-3 flex items-center gap-2">
                      <Target size={18} /> Time Series Cross-Validation
                    </h5>
                    <p className="text-sm text-slate-400 mb-4">
                      Standard k-fold CV violates temporal structure. We use walk-forward analysis to respect the time dimension.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg text-xs font-mono">
                      Train: [2010-2015] → Test: [2016]<br/>
                      Train: [2010-2016] → Test: [2017]<br/>
                      Train: [2010-2017] → Test: [2018]
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-white mb-6 font-serif">Advanced Architectures</h3>

                  {/* Regime Detection */}
                  <div className="p-6 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-2xl border border-violet-500/20">
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                      <Activity size={20} />
                      Regime Switching Models
                    </h4>
                    <p className="text-sm text-slate-300 mb-4">
                      Markets alternate between distinct regimes (Growth, Recession, Crisis) with different return-generating processes. 
                      Hidden Markov Models detect these transitions automatically.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <Math formula={"P(S_t = j | S_{t-1} = i) = \\pi_{ij}"} display={true} className="text-violet-200 mb-2" />
                      <p className="text-xs text-slate-400">Transition probability from regime i to regime j</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                      <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/200/20 p-2 rounded text-center">
                        <div className="font-bold text-green-300">Growth</div>
                        <div className="text-[#1D8A70] dark:text-[#3CBF9C]">Low vol, momentum</div>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/200/20 p-2 rounded text-center">
                        <div className="font-bold text-yellow-300">Neutral</div>
                        <div className="text-yellow-400">Mean reversion</div>
                      </div>
                      <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/200/20 p-2 rounded text-center">
                        <div className="font-bold text-red-300">Crisis</div>
                        <div className="text-[#BC4128] dark:text-[#E2694A]">High vol, correlation</div>
                      </div>
                    </div>
                  </div>

                  {/* Ensemble Methods */}
                  <div className="p-6 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-2xl border border-[#1D8A70] dark:border-[#3CBF9C]/20">
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                      <Layers size={20} />
                      Ensemble Learning
                    </h4>
                    <p className="text-sm text-slate-300 mb-4">
                      Combine multiple weak learners to create robust predictions. Each model captures different aspects of the return-generating process.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-emerald-300 text-sm">Random Forest</div>
                        <div className="text-xs text-slate-400">Bootstrap aggregating of decision trees</div>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-emerald-300 text-sm">Gradient Boosting</div>
                        <div className="text-xs text-slate-400">Sequential error correction (XGBoost, LightGBM)</div>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-emerald-300 text-sm">Neural Networks</div>
                        <div className="text-xs text-slate-400">Deep feature interactions (LSTM, Transformers)</div>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Data */}
                  <div className="p-6 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-2xl border border-[#BC4128] dark:border-[#E2694A]/20">
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                      <Search size={20} />
                      Alternative Signal Alpha
                    </h4>
                    <p className="text-sm text-slate-300 mb-4">
                      Traditional price and volume data is fully arbitraged. Alpha comes from processing unconventional data sources 
                      that haven't been fully exploited by the market.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-orange-300">Sentiment Analysis</div>
                        <div className="text-slate-400">News, social media, earnings calls</div>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-orange-300">Satellite Data</div>
                        <div className="text-slate-400">Economic activity, supply chains</div>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-orange-300">Patent Filings</div>
                        <div className="text-slate-400">Innovation, competitive moats</div>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg">
                        <div className="font-bold text-orange-300">Credit Spreads</div>
                        <div className="text-slate-400">Default risk, liquidity stress</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Engineering Pipeline */}
              <div className="bg-white dark:bg-[#0A0D14]/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm mb-16">
                <h3 className="text-2xl font-bold text-white mb-6 font-serif">Feature Engineering Pipeline</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-bold text-white mb-3">Raw Signals</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Price momentum</li>
                      <li>• Earnings revisions</li>
                      <li>• Valuation ratios</li>
                      <li>• Quality metrics</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-bold text-white mb-3">Transformations</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Z-score normalization</li>
                      <li>• Rank transformations</li>
                      <li>• Log returns</li>
                      <li>• Volatility adjustment</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-bold text-white mb-3">Interactions</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Factor combinations</li>
                      <li>• Regime interactions</li>
                      <li>• Cross-sectional ranks</li>
                      <li>• Time-series lags</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h4 className="font-bold text-white mb-3">Selection</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Information ratio</li>
                      <li>• Correlation filtering</li>
                      <li>• Stability testing</li>
                      <li>• Economic intuition</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Model Validation Framework */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-8 rounded-3xl border border-slate-600">
                <h3 className="text-2xl font-bold text-white mb-6 font-serif">Robust Validation Framework</h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-slate-800/50 p-6 rounded-2xl">
                      <h4 className="font-bold text-violet-300 mb-3">Out-of-Sample Testing</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Never use the same data for training and evaluation. Maintain strict temporal separation 
                        to avoid look-ahead bias.
                      </p>
                      <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-300">
                        Training: 2010-2018<br/>
                        Validation: 2019-2020<br/>
                        Test: 2021-2023
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-2xl">
                      <h4 className="font-bold text-violet-300 mb-3">Regime Robustness</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Test model performance across different market regimes to ensure stability.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/200/20 p-2 rounded text-center text-green-300">Bull</div>
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/200/20 p-2 rounded text-center text-red-300">Bear</div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/200/20 p-2 rounded text-center text-yellow-300">Sideways</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-slate-800/50 p-6 rounded-2xl">
                      <h4 className="font-bold text-violet-300 mb-3">Statistical Significance</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Use bootstrap methods and multiple hypothesis testing corrections to avoid false discoveries.
                      </p>
                      <div className="bg-slate-900 p-3 rounded-lg">
                        <Math formula={"t = \\frac{\\bar{r}}{\\sigma_r / \\sqrt{n}}"} display={true} className="text-violet-200" />
                        <p className="text-xs text-slate-400 mt-2 text-center">t-statistic for return significance</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-2xl">
                      <h4 className="font-bold text-violet-300 mb-3">Economic Significance</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Statistical significance doesn't guarantee profitability after transaction costs and capacity constraints.
                      </p>
                      <div className="text-xs text-slate-400">
                        • Information Ratio &gt; 0.5<br/>
                        • Max Drawdown &lt; 15%<br/>
                        • Capacity &gt; $100M
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Practical Implementation */}
          <section id="investor">
            <SectionHeader 
              icon={Target}
              title="5. The Investor's Protocol"
              subtitle="Moving from theory to a robust personal portfolio allocation strategy."
              colorClass="bg-[#1D8A70] dark:bg-[#3CBF9C]"
            />

            {/* Introduction */}
            <div className="mb-16 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-[#14171B] dark:to-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                The gap between academic theory and practical implementation is vast. Individual investors need a systematic, 
                disciplined approach that acknowledges the limitations of return forecasting while still making optimal decisions. 
                This protocol provides a step-by-step framework for building robust expected return estimates.
              </p>
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30">
                <h4 className="font-bold text-emerald-900 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3">The Implementation Challenge</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Most investors either ignore expected returns entirely (naive diversification) or rely on overly simplistic 
                  historical averages. Both approaches are suboptimal. The key is to combine multiple information sources 
                  while maintaining appropriate humility about our forecasting ability.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="p-8 bg-slate-50 dark:bg-slate-900/20 rounded-3xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:bg-[#0A0D14] transition-colors group">
                <div className="w-12 h-12 bg-white dark:bg-[#0A0D14] rounded-xl flex items-center justify-center shadow-md mb-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] group-hover:scale-110 transition-transform">
                  <Search size={24} />
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Step 1: The Base Case</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  Start with institutional Capital Market Assumptions (CMAs) as your prior. These represent the collective 
                  wisdom of professional investors and provide a disciplined anchor for your expectations.
                </p>
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                  <h5 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Recommended Sources:</h5>
                  <ul className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300 space-y-1">
                    <li>• BlackRock Investment Institute</li>
                    <li>• Vanguard Capital Markets Model</li>
                    <li>• J.P. Morgan Long-Term CMA</li>
                    <li>• Research Affiliates Asset Allocation</li>
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-900/20 rounded-3xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:bg-[#0A0D14] transition-colors group">
                <div className="w-12 h-12 bg-white dark:bg-[#0A0D14] rounded-xl flex items-center justify-center shadow-md mb-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] group-hover:scale-110 transition-transform">
                  <Activity size={24} />
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Step 2: Convex Thinking</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  Understand the risk-return trade-off. High expected returns must be justified by high risk. 
                  Never model high returns with low risk—it's a sign of model error or wishful thinking.
                </p>
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30">
                  <h5 className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52] mb-2">Sharpe Ratio Benchmarks:</h5>
                  <div className="text-xs text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300 space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span>Conservative:</span>
                      <span>0.3 - 0.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reasonable:</span>
                      <span>0.5 - 0.8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aggressive:</span>
                      <span>0.8 - 1.2</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-900/20 rounded-3xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:bg-[#0A0D14] transition-colors group">
                <div className="w-12 h-12 bg-white dark:bg-[#0A0D14] rounded-xl flex items-center justify-center shadow-md mb-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Step 3: Dynamic Drift</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  Expected returns are not constant. As prices rise, forward returns fall. Implement a systematic 
                  rebalancing process that captures this "valuation drift" effect.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-900/30">
                  <h5 className="font-bold text-purple-800 dark:text-purple-400 mb-2">Rebalancing Triggers:</h5>
                  <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• 5% absolute deviation</li>
                    <li>• 25% relative deviation</li>
                    <li>• Quarterly calendar review</li>
                    <li>• Regime change signals</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Implementation Framework */}
            <div className="space-y-16">
              {/* Capital Market Assumptions */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-[#14171B] dark:to-slate-900/10 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-serif">Building Your Capital Market Assumptions</h3>
                
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">Asset Class Framework</h4>
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-slate-800 dark:text-white">US Large Cap Stocks</h5>
                          <span className="text-sm font-mono bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52] px-2 py-1 rounded">7.5%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Risk-Free:</div>
                            <div className="font-mono">4.0%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Risk Premium:</div>
                            <div className="font-mono">3.5%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Volatility:</div>
                            <div className="font-mono">16%</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-slate-800 dark:text-white">International Developed</h5>
                          <span className="text-sm font-mono bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] px-2 py-1 rounded">7.0%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Risk-Free:</div>
                            <div className="font-mono">3.5%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Risk Premium:</div>
                            <div className="font-mono">3.5%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Volatility:</div>
                            <div className="font-mono">18%</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-slate-800 dark:text-white">Emerging Markets</h5>
                          <span className="text-sm font-mono bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-[#BC4128] dark:text-[#E2694A] px-2 py-1 rounded">8.5%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Risk-Free:</div>
                            <div className="font-mono">4.0%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Risk Premium:</div>
                            <div className="font-mono">4.5%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Volatility:</div>
                            <div className="font-mono">24%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">Fixed Income & Alternatives</h4>
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-slate-800 dark:text-white">US Aggregate Bonds</h5>
                          <span className="text-sm font-mono bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-white px-2 py-1 rounded">4.2%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Yield:</div>
                            <div className="font-mono">4.0%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Roll Return:</div>
                            <div className="font-mono">0.2%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Volatility:</div>
                            <div className="font-mono">4%</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-slate-800 dark:text-white">Real Estate (REITs)</h5>
                          <span className="text-sm font-mono bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400 px-2 py-1 rounded">6.5%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Income:</div>
                            <div className="font-mono">3.5%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Appreciation:</div>
                            <div className="font-mono">3.0%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Volatility:</div>
                            <div className="font-mono">20%</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-slate-800 dark:text-white">Commodities</h5>
                          <span className="text-sm font-mono bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-[#BC4128] dark:text-[#E2694A] px-2 py-1 rounded">5.0%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Spot Return:</div>
                            <div className="font-mono">2.0%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Roll Yield:</div>
                            <div className="font-mono">3.0%</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-600 dark:text-slate-400">Volatility:</div>
                            <div className="font-mono">22%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Valuation-Based Adjustments */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#14171B] dark:to-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-serif">Valuation-Based Return Adjustments</h3>
                
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">Equity Valuation Metrics</h4>
                    <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-blue-200 dark:border-blue-900/30">
                      <h5 className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52] mb-4">Shiller P/E (CAPE) Model</h5>
                      <Math formula={"E[R]_{10yr} = \\frac{1}{CAPE} + g - \\frac{\\Delta CAPE}{CAPE \\cdot 10}"} display={true} className="text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300 mb-4" />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-3 rounded-lg">
                          <div className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">Current CAPE: 28</div>
                          <div className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Historical Avg: 17</div>
                        </div>
                        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-3 rounded-lg">
                          <div className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">Implied Return: 5.2%</div>
                          <div className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">vs Long-term: 7.5%</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-blue-200 dark:border-blue-900/30">
                      <h5 className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52] mb-4">Earnings Yield Model</h5>
                      <Math formula={"E[R] = \\frac{E}{P} + g"} display={true} className="text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300 mb-4" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Forward earnings yield plus expected earnings growth. More responsive to near-term conditions than CAPE.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">Bond Yield Models</h4>
                    <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-blue-200 dark:border-blue-900/30">
                      <h5 className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52] mb-4">Yield-to-Maturity Approach</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        For bonds, current yield is the best predictor of future returns over the bond's duration.
                      </p>
                      <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">10-Year Treasury:</div>
                            <div className="font-mono text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">4.2%</div>
                          </div>
                          <div>
                            <div className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">Investment Grade:</div>
                            <div className="font-mono text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">5.1%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-blue-200 dark:border-blue-900/30">
                      <h5 className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52] mb-4">Term Structure Model</h5>
                      <Math formula={"E[R]_{bond} = YTM + \\text{Roll Return} - \\text{Credit Losses}"} display={true} className="text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300 mb-4" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Decompose bond returns into yield income, price appreciation from rolling down the curve, and expected credit losses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Construction Process */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-[#14171B] dark:to-emerald-900/10 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-serif">Systematic Portfolio Construction</h3>
                
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30 text-center">
                    <div className="w-12 h-12 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/200 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                    <h4 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Gather Inputs</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Expected returns, volatilities, correlations</p>
                  </div>
                  <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30 text-center">
                    <div className="w-12 h-12 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/200 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                    <h4 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Apply Constraints</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Min/max weights, turnover limits</p>
                  </div>
                  <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30 text-center">
                    <div className="w-12 h-12 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/200 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                    <h4 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Optimize</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Mean-variance or Black-Litterman</p>
                  </div>
                  <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/30 text-center">
                    <div className="w-12 h-12 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/200 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                    <h4 className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Monitor</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Track performance, rebalance</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl border border-emerald-200 dark:border-emerald-900/30">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Sample Portfolio Allocation</h4>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Strategic Allocation (Long-term)</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                          <span className="text-sm font-medium">US Large Cap</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="w-3/5 h-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/200"></div>
                            </div>
                            <span className="text-sm font-mono">35%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                          <span className="text-sm font-medium">International</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="w-1/4 h-full bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/200"></div>
                            </div>
                            <span className="text-sm font-mono">15%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                          <span className="text-sm font-medium">Emerging Markets</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="w-1/5 h-full bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-orange-900/200"></div>
                            </div>
                            <span className="text-sm font-mono">10%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                          <span className="text-sm font-medium">Bonds</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="w-2/5 h-full bg-slate-50 dark:bg-slate-900/200"></div>
                            </div>
                            <span className="text-sm font-mono">25%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                          <span className="text-sm font-medium">REITs</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="w-1/5 h-full bg-yellow-50 dark:bg-yellow-900/200"></div>
                            </div>
                            <span className="text-sm font-mono">10%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                          <span className="text-sm font-medium">Commodities</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="w-1/10 h-full bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/200"></div>
                            </div>
                            <span className="text-sm font-mono">5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Expected Portfolio Metrics</h5>
                      <div className="space-y-4">
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-900/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]">Expected Return</span>
                            <span className="text-lg font-mono text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300">6.8%</span>
                          </div>
                          <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Weighted average of asset class returns</div>
                        </div>
                        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">Expected Volatility</span>
                            <span className="text-lg font-mono text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300">11.2%</span>
                          </div>
                          <div className="text-xs text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Portfolio standard deviation</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-900/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-purple-800 dark:text-purple-400">Sharpe Ratio</span>
                            <span className="text-lg font-mono text-purple-700 dark:text-purple-300">0.61</span>
                          </div>
                          <div className="text-xs text-purple-600 dark:text-purple-400">Risk-adjusted return measure</div>
                        </div>
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-900/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-orange-800 dark:text-[#BC4128] dark:text-[#E2694A]">Max Drawdown</span>
                            <span className="text-lg font-mono text-[#BC4128] dark:text-[#E2694A] dark:text-orange-300">-18%</span>
                          </div>
                          <div className="text-xs text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Estimated worst-case scenario</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </div>
    </ArticleFrame>
  );
}