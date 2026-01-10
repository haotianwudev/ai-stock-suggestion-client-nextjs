'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, ShieldAlert, Code, Database, ArrowRight, PieChart, Activity, DollarSign, Layers, CheckCircle, XCircle, BookOpen, Scale, GitBranch, Table, Filter, Maximize2, Minimize2, Sliders, BarChart2, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Extend Window interface for KaTeX
declare global {
  interface Window {
    katex?: {
      render: (tex: string, element: HTMLElement, options?: any) => void;
    };
  }
}

// --- TypeScript Interfaces ---
interface LatexRendererProps {
  children: string;
  displayMode?: boolean;
}

interface SectionHeaderProps {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  colorClass: string;
  gradientClass: string;
}

interface SubHeaderProps {
  title: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface MathBlockProps {
  children: string;
  title?: string;
  latex?: boolean;
}

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
}

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  theme?: 'blue' | 'indigo' | 'purple' | 'amber' | 'emerald' | 'rose' | 'slate';
}

interface StepProps {
  number: number;
  title: string;
  description: string;
  details?: string;
}

interface ConceptBadgeProps {
  text: string;
  color?: string;
}

// --- Helper Component: LatexRenderer ---
// Dynamically loads KaTeX from CDN to render math equations
const LatexRenderer: React.FC<LatexRendererProps> = ({ children, displayMode = true }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if KaTeX is already available
    const checkKatex = () => {
      if (window.katex) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    if (!checkKatex()) {
      // 1. Load CSS if not present
      if (!document.getElementById('katex-css')) {
        const link = document.createElement('link');
        link.id = 'katex-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
        document.head.appendChild(link);
      }

      // 2. Load JS if not present
      if (!document.getElementById('katex-js')) {
        const script = document.createElement('script');
        script.id = 'katex-js';
        script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
        script.onload = () => setIsReady(true);
        document.head.appendChild(script);
      } else {
        // Script exists but might be loading, poll for it
        const interval = setInterval(() => {
          if (checkKatex()) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, []);

  useEffect(() => {
    if (isReady && containerRef.current && window.katex) {
      try {
        window.katex.render(children, containerRef.current, {
          throwOnError: false,
          displayMode: displayMode,
          trust: true
        });
      } catch (e) {
        console.error("Katex render error:", e);
        if (containerRef.current) {
          containerRef.current.innerText = children;
        }
      }
    }
  }, [children, isReady, displayMode]);

  return <span ref={containerRef} className="text-slate-800" />;
};

// --- Components ---
const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title, colorClass, gradientClass }) => (
  <div className={`flex items-center gap-4 mb-8 ${colorClass} pt-10 border-t border-slate-200`}>
    <div className={`p-3 rounded-2xl shadow-lg ${gradientClass} text-white`}>
      <Icon size={28} strokeWidth={2} />
    </div>
    <h2 className="text-3xl font-bold tracking-tight text-slate-800">{title}</h2>
  </div>
);

const SubHeader: React.FC<SubHeaderProps> = ({ title, icon: Icon }) => (
  <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
    {Icon ? <Icon size={20} className="text-slate-500" /> : <div className="w-2 h-2 rounded-full bg-slate-400" />}
    {title}
  </h3>
);

const MathBlock: React.FC<MathBlockProps> = ({ children, title, latex = true }) => (
  <div className="my-6 overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm group hover:border-indigo-200 transition-colors">
    {title && (
      <div className="px-4 py-2 text-xs font-semibold tracking-wider text-slate-500 uppercase bg-slate-50 border-b border-slate-100 group-hover:bg-indigo-50/50">
        {title}
      </div>
    )}
    <div className="p-6 overflow-x-auto text-lg font-medium text-center text-slate-700 font-mono bg-slate-50/50">
      {latex ? <LatexRenderer>{children}</LatexRenderer> : children}
    </div>
  </div>
);

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = "python", title }) => (
  <div className="my-6 overflow-hidden rounded-xl bg-slate-900 shadow-xl border border-slate-800">
    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
      <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">
        {title || language}
      </span>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
      </div>
    </div>
    <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-blue-100">
      <code>{code}</code>
    </pre>
  </div>
);

const InfoCard: React.FC<InfoCardProps> = ({ title, children, theme = "blue" }) => {
  const themes = {
    blue: "bg-blue-50 border-blue-100 text-blue-900",
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-900",
    purple: "bg-purple-50 border-purple-100 text-purple-900",
    amber: "bg-amber-50 border-amber-100 text-amber-900",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-900",
    rose: "bg-rose-50 border-rose-100 text-rose-900",
    slate: "bg-slate-100 border-slate-200 text-slate-800",
  };

  return (
    <div className={`p-6 rounded-xl border ${themes[theme]} mb-4 h-full`}>
      <h3 className="mb-3 text-lg font-bold opacity-90 flex items-center gap-2">
        {title}
      </h3>
      <div className="opacity-80 leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </div>
  );
};

const Step: React.FC<StepProps> = ({ number, title, description, details }) => (
  <div className="relative flex gap-6 pb-12 last:pb-0 group">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-full shadow-md bg-gradient-to-br from-slate-700 to-slate-900 shrink-0 ring-4 ring-white z-10">
        {number}
      </div>
      <div className="w-0.5 h-full bg-slate-200 absolute top-10 bottom-0 left-5 -ml-px group-last:hidden" />
    </div>
    <div className="flex-1">
      <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-slate-600 leading-relaxed mb-3">{description}</p>
      {details && (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600 font-mono">
          {details}
        </div>
      )}
    </div>
  </div>
);

const ConceptBadge: React.FC<ConceptBadgeProps> = ({ text, color = "bg-slate-100 text-slate-600" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} mr-2 mb-2`}>
    {text}
  </span>
);

export default function DirectIndexingTaxLossHarvestingTutorial() {
  const currentArticle = articles.find(article => article.slug === 'direct-indexing-tax-loss-harvesting-algorithmic-mechanics');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title || ''} 
            articleSlug={currentArticle.slug || ''} 
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

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white border-b border-slate-200">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
          <div className="max-w-5xl px-6 py-24 mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-bold tracking-wider uppercase rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              <BookOpen size={14} />
              Quant Finance Series
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl leading-tight">
              Direct Indexing &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Tax-Loss Harvesting</span>
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-slate-600">
              A deep dive into the algorithmic mechanics of tax-aware portfolio construction, SPX tracking optimization, and factor risk models.
            </p>
            <div className="flex gap-4 mt-8">
              <ConceptBadge text="Convex Optimization" color="bg-blue-100 text-blue-700" />
              <ConceptBadge text="Factor Models" color="bg-purple-100 text-purple-700" />
              <ConceptBadge text="Tax Alpha" color="bg-emerald-100 text-emerald-700" />
            </div>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Direct Indexing & Tax-Loss Harvesting Infographic" 
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
            alt="Direct Indexing & Tax-Loss Harvesting Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        <main className="max-w-5xl px-6 pb-24 mx-auto">
          {/* Section 1: Foundations */}
          <section id="foundations">
            <SectionHeader 
              icon={TrendingUp} 
              title="1. Core Foundations" 
              colorClass="text-blue-600"
              gradientClass="bg-gradient-to-br from-blue-500 to-blue-700"
            />
            <div className="prose prose-slate max-w-none">
              {/* Intro */}
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Tax-Loss Harvesting (TLH) is the systematic practice of selling securities at a loss to offset capital gains tax liabilities. While simple in concept, the <strong>quantitative edge</strong> comes from <em>Direct Indexing</em>—owning the 500+ underlying stocks of an index rather than a single ETF wrapper. This granularity transforms a "flat" market return into a rich source of harvestable volatility.
              </p>

              {/* The Three Pillars */}
              <SubHeader title="The Three Pillars of Tax Alpha" icon={Layers} />
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <InfoCard title="1. Tax Deferral" theme="blue">
                  <p className="text-sm">
                    <strong>The "Interest-Free Loan"</strong><br/>
                    By realizing a loss today, you reduce your current tax bill. You invest those tax savings. Even if you pay the tax later, the <em>growth</em> on that saved money is yours to keep.
                  </p>
                </InfoCard>
                <InfoCard title="2. Rate Arbitrage" theme="indigo">
                  <p className="text-sm">
                    <strong>STCG vs. LTCG</strong><br/>
                    Short-term gains are taxed as ordinary income (up to 37%). Long-term gains are taxed lower (20%). Harvesting losses to offset short-term gains effectively converts high-tax income into low-tax growth.
                  </p>
                </InfoCard>
                <InfoCard title="3. Forgiveness" theme="purple">
                  <p className="text-sm">
                    <strong>Permanent Elimination</strong><br/>
                    If assets are held until death (Step-up in Basis) or donated to charity, the deferred tax liability is wiped out completely. The "loan" from Pillar 1 never has to be repaid.
                  </p>
                </InfoCard>
              </div>

              {/* Tax Lot Accounting */}
              <SubHeader title="The Mechanics: HIFO Accounting" icon={Database} />
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                <p className="text-slate-600 mb-6">
                  To maximize efficiency, we must strictly use <strong>Highest In, First Out (HIFO)</strong> accounting. We cherry-pick specific shares to sell.
                </p>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Scenario: You own 2 lots of AAPL</h4>
                    <div className="flex justify-between text-sm p-2 bg-slate-50 rounded">
                      <span>Lot A (Bought Jan)</span>
                      <span className="font-mono">$150 Cost Basis</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 bg-slate-50 rounded">
                      <span>Lot B (Bought Feb)</span>
                      <span className="font-mono">$100 Cost Basis</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 bg-slate-100 rounded font-bold">
                      <span>Current Price</span>
                      <span className="font-mono text-blue-600">$110</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                      <div className="flex justify-between text-sm font-semibold text-red-800">
                        <span>FIFO / Average Cost</span>
                        <span>-$15 Loss</span>
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        Sells a mix or oldest. ($110 - $125 Avg) = Small benefit.
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg shadow-md transform scale-105">
                      <div className="flex justify-between text-sm font-bold text-emerald-800">
                        <span>HIFO Strategy</span>
                        <span>-$40 Loss</span>
                      </div>
                      <div className="text-xs text-emerald-600 mt-1">
                        Explicitly sells Lot A. ($110 - $150). <strong>2.6x more tax alpha.</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Math */}
              <SubHeader title="The Economic Value Equation" icon={Calculator} />
              <p className="text-slate-600 mb-4">
                A $1,000 loss harvested today at a 40% tax rate isn't just $400 in savings. It is the compound growth of that $400 over time (Tax Deferral) plus the difference in tax rates (Rate Arbitrage).
              </p>
              <MathBlock title="Total Value of Harvesting">
                {`V_{total} = \\underbrace{T_s \\cdot L}_{\\text{Immediate Credit}} + \\underbrace{(T_s \\cdot L)((1+r)^n - 1)}_{\\text{Deferral Value}} - \\underbrace{T_f \\cdot (L)}_{\\text{Future Liability}}`}
              </MathBlock>
              <div className="text-sm text-center text-slate-500 -mt-4 mb-6">
                Where <LatexRenderer displayMode={false}>{`T_s`}</LatexRenderer> = Current Tax Rate, <LatexRenderer displayMode={false}>{`T_f`}</LatexRenderer> = Future Tax Rate, <LatexRenderer displayMode={false}>{`L`}</LatexRenderer> = Loss Amount
              </div>
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-900 flex gap-3">
                <Activity size={20} className="shrink-0 mt-0.5" />
                <div>
                  <strong>The "Basis Gap" Trap:</strong> Every harvested loss lowers your portfolio's cost basis. Over time, your basis becomes very low compared to market value, reducing future harvesting opportunities. This is known as <em>Tax Alpha Decay</em>.
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Factor Models */}
          <section id="factors">
            <SectionHeader 
              icon={PieChart} 
              title="2. Factor Risk Models & Substitutions" 
              colorClass="text-purple-600"
              gradientClass="bg-gradient-to-br from-purple-500 to-purple-700"
            />
            <div className="space-y-6">
              <p className="text-lg text-slate-600">
                In a Wash Sale scenario, we must sell a loser (e.g., AAPL) and cannot buy it back for 31 days. To prevent the portfolio from drifting away from the benchmark (S&P 500), we must buy a <strong>substitute</strong>.
              </p>

              <SubHeader title="The Substitution Problem: Naive vs. Optimized" icon={BarChart2} />
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-600 mb-6 text-sm">
                  A single stock rarely matches another perfectly. AAPL is not just "Technology"; it is Size, Momentum, Quality, and Growth. Replacing it with just "MSFT" leaves exposure gaps. We need a <strong>Basket Substitute</strong>.
                </p>

                {/* Factor Engine Visual */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="p-3 rounded-tl-lg">Factor Exposure</th>
                        <th className="p-3 text-red-600">Sold: AAPL</th>
                        <th className="p-3 text-slate-400">Naive: MSFT</th>
                        <th className="p-3 text-emerald-600 rounded-tr-lg">Optimized Basket</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-medium text-slate-700">Sector (Tech)</td>
                        <td className="p-3">1.0</td>
                        <td className="p-3">1.0</td>
                        <td className="p-3 font-bold text-emerald-700">1.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-700">Growth</td>
                        <td className="p-3">0.85</td>
                        <td className="p-3 text-slate-400">0.60</td>
                        <td className="p-3 font-bold text-emerald-700">0.84</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-700">Momentum</td>
                        <td className="p-3">0.40</td>
                        <td className="p-3 text-slate-400">0.10</td>
                        <td className="p-3 font-bold text-emerald-700">0.38</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-700">Volatility</td>
                        <td className="p-3">0.90</td>
                        <td className="p-3 text-slate-400">0.70</td>
                        <td className="p-3 font-bold text-emerald-700">0.91</td>
                      </tr>
                      <tr className="bg-slate-50 font-bold">
                        <td className="p-3">Tracking Error Impact</td>
                        <td className="p-3 text-red-600">--</td>
                        <td className="p-3 text-amber-600">High Drift</td>
                        <td className="p-3 text-emerald-600">Near Zero</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-4 text-center">
                  *The Optimized Basket might be: 40% MSFT + 30% GOOG + 20% NVDA + 10% V (Hypothetical)
                </p>
              </div>

              <SubHeader title="Structural Risk Models" icon={Activity} />
              <p className="text-slate-600">
                We quantify this relationship using a <strong>Factor Risk Model</strong> (e.g., Barra, Axioma). This allows us to decompose the Covariance Matrix <LatexRenderer displayMode={false}>{`\\Sigma`}</LatexRenderer> (N x N) into smaller, manageable components.
              </p>
              <MathBlock title="The Structural Risk Equation">
                {`\\Sigma = \\underbrace{\\mathbf{B} \\Omega \\mathbf{B}^T}_{\\text{Systematic Risk}} + \\underbrace{\\Delta}_{\\text{Specific Risk}}`}
              </MathBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard title="Systematic Risk (Factor)" theme="emerald">
                  <p className="text-sm">
                    <strong>Common drivers of return.</strong><br/>
                    <LatexRenderer displayMode={false}>{`\\mathbf{B}`}</LatexRenderer> (Loadings) x <LatexRenderer displayMode={false}>{`\\Omega`}</LatexRenderer> (Factor Covariance).<br/>
                    Includes Market, Sector, and Style factors. In Direct Indexing, we aim to keep this deviation near zero relative to the benchmark.
                  </p>
                </InfoCard>
                <InfoCard title="Idiosyncratic Risk (Specific)" theme="amber">
                  <p className="text-sm">
                    <strong>Stock-specific noise.</strong><br/>
                    <LatexRenderer displayMode={false}>{`\\Delta`}</LatexRenderer> (Diagonal Matrix).<br/>
                    Risk unique to the company (e.g., earnings call, CEO scandal). We <em>accept</em> small deviations here to harvest losses, relying on the Law of Large Numbers to diversify it away.
                  </p>
                </InfoCard>
              </div>

              <SubHeader title="Active Risk Constraints" icon={Scale} />
              <p className="text-slate-600 mb-4">
                To prevent the optimizer from making unintended bets (e.g., accidentally becoming "Anti-Value" while harvesting), we set strict bounds on the <strong>Active Exposure</strong>.
              </p>
              <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-emerald-400">
                  <ShieldAlert size={16} />
                  <span>Constraint Configuration</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span>Factor_Exposure(Portfolio)</span>
                    <span>≈ Factor_Exposure(Benchmark)</span>
                  </div>
                  <div className="pl-4 text-slate-500 text-xs">// We allow a very small wiggle room (epsilon)</div>
                  <div className="flex justify-between">
                    <LatexRenderer displayMode={false}>{`| \\beta_{port} - \\beta_{bench} |`}</LatexRenderer>
                    <span className="text-emerald-400">{'< 0.05'}</span>
                  </div>
                  <div className="flex justify-between">
                    <LatexRenderer displayMode={false}>{`| \\text{Sector}_{tech} \\% - \\text{Bench}_{tech} \\% |`}</LatexRenderer>
                    <span className="text-emerald-400">{'< 1.0\\%'}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Optimization Math */}
          <section id="math">
            <SectionHeader 
              icon={Calculator} 
              title="3. Mathematical Optimization" 
              colorClass="text-emerald-600"
              gradientClass="bg-gradient-to-br from-emerald-500 to-emerald-700"
            />
            <p className="text-lg text-slate-600 mb-6">
              We model the portfolio construction problem as a <strong>Quadratic Program (QP)</strong>. The solver must find the optimal trade vectors that balance three competing forces: Tracking Error, Tax Benefits, and Transaction Costs.
            </p>

            <SubHeader title="The Objective Function" icon={Maximize2} />
            <MathBlock title="QP Formulation in Matrix Notation">
              {`\\min_{\\mathbf{w}} \\left( \\underbrace{(\\mathbf{w} - \\mathbf{w}_b)^T \\Sigma (\\mathbf{w} - \\mathbf{w}_b)}_{\\text{Risk Penalty}} - \\lambda_{tax} \\underbrace{\\mathbf{\\alpha}^T (\\mathbf{w}_0 - \\mathbf{w})}_{\\text{Tax Utility}} + \\lambda_{cost} \\underbrace{\\mathbf{c}^T |\\mathbf{w} - \\mathbf{w}_0|}_{\\text{Transaction Costs}} \\right)`}
            </MathBlock>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <InfoCard title="1. Risk Penalty" theme="slate">
                <p className="text-sm">
                  <strong>Goal:</strong> Minimize Active Risk (Tracking Error).<br/><br/>
                  Uses the covariance matrix Σ. We penalize deviations from the benchmark weights (w_b).
                </p>
              </InfoCard>
              <InfoCard title="2. Tax Utility" theme="emerald">
                <p className="text-sm">
                  <strong>Goal:</strong> Maximize Realized Losses.<br/><br/>
                  α is a vector where positive values indicate a "harvestable loss" available on a specific asset. This term pushes the solver to sell those assets.
                </p>
              </InfoCard>
              <InfoCard title="3. Transaction Costs" theme="rose">
                <p className="text-sm">
                  <strong>Goal:</strong> Minimize Turnover.<br/><br/>
                  Penalizes the absolute difference between initial weights (w_0) and new weights (w). Prevents trading for negligible gains.
                </p>
              </InfoCard>
            </div>

            <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl shadow-2xl relative overflow-hidden font-mono text-sm md:text-base mb-10">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500 opacity-10 rounded-full blur-3xl"></div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Sliders size={18} /> Parameter Tuning: The λ (Lambda) Factors
              </h4>
              <p className="mb-4 text-slate-400">The behavior of the algorithm is controlled by the ratio of the lambda parameters.</p>
              <div className="space-y-4 pl-4 border-l-2 border-emerald-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400">High λ_tax</span>
                  <span className="text-slate-500 text-right">Aggressive Harvesting. High TE. "Capture every loss."</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">High Risk Penalty</span>
                  <span className="text-slate-500 text-right">Tight Tracking. "Hug the index." Ignore small losses.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-rose-400">High λ_cost</span>
                  <span className="text-slate-500 text-right">Low Turnover. "Trade only when valuable."</span>
                </div>
              </div>
            </div>

            <SubHeader title="Constraint Matrix" icon={Minimize2} />
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600 font-mono text-xs">Essential</div>
                  <div>
                    <h4 className="font-bold text-slate-800">Budget & Long-Only Constraints</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      The portfolio must be fully invested (no leverage, no cash drag) and cannot short stocks (long-only strategy).
                    </p>
                    <div className="mt-3 font-mono text-xs bg-slate-50 p-2 rounded border border-slate-100 inline-block">
                      <LatexRenderer>{`\\sum w_i = 1.0, \\quad w_i \\ge 0 \\quad \\forall i`}</LatexRenderer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600 font-mono text-xs">Risk Control</div>
                  <div>
                    <h4 className="font-bold text-slate-800">Factor & Sector Exposure Bounds</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      We limit the active exposure to any single risk factor (e.g., "Momentum") or Sector (e.g., "Technology") to be within a tight tolerance (e.g., +/- 2%).
                    </p>
                    <div className="mt-3 font-mono text-xs bg-slate-50 p-2 rounded border border-slate-100 inline-block">
                      <LatexRenderer>{`L_{min} \\le \\mathbf{B}^T (\\mathbf{w} - \\mathbf{w}_b) \\le L_{max}`}</LatexRenderer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border-l-4 border-l-amber-500 border border-slate-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-700 font-mono text-xs">Regulatory</div>
                  <div>
                    <h4 className="font-bold text-slate-800">The Wash Sale Constraint (Path Dependent)</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      This is the most complex constraint. If a stock i was sold for a loss in the last 30 days, we cannot increase its weight.
                    </p>
                    <div className="mt-3 font-mono text-xs bg-amber-50 text-amber-900 p-2 rounded border border-amber-100 inline-block w-full">
                      <LatexRenderer>{`\\text{IF } (SoldLoss_{i, t-30...t}) \\text{ THEN } w_i \\le w_{i, initial} \\text{ (No Buys)}`}</LatexRenderer>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      *In practice, this is handled by pre-processing the "Buy List" to exclude restricted tickers before the optimization step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Implementation */}
          <section id="implementation">
            <SectionHeader 
              icon={Code} 
              title="4. Algorithmic Implementation" 
              colorClass="text-rose-600"
              gradientClass="bg-gradient-to-br from-rose-500 to-rose-700"
            />
            <SubHeader title="Data Structures: The Tax Lot" />
            <p className="text-slate-600 mb-4">
              The core data unit is not the stock, but the <strong>Tax Lot</strong>. A single position in AAPL might consist of 50 distinct lots bought at different times/prices.
            </p>
            <CodeSnippet 
              title="TypeScript Interface: TaxLot"
              language="typescript"
              code={`interface TaxLot {
  id: string;              // Unique Lot ID
  ticker: string;          // e.g., "AAPL"
  shares: number;          // Quantity
  cost_basis_per_share: number; 
  purchase_date: string;   // ISO Date
  market_value: number;    // Real-time value
  unrealized_pl: number;   // (Price - Basis) * Shares
  is_wash_sale_restricted: boolean; // Computed daily
  is_long_term: boolean;   // > 365 days held
}`} 
            />

            <SubHeader title="The Scan-and-Optimize Workflow" />
            <div className="pl-4 border-l-2 border-slate-200 space-y-8">
              <Step 
                number={1} 
                title="Daily Ingestion" 
                description="Load all current tax lots, cash balance, and benchmark weights (e.g., SPY holdings)."
                details="Fetch latest prices. Calculate unrealized P&L for every lot. Mark 'Wash Sale Restricted' flags if a loss was sold in the last 30 days."
              />
              <Step 
                number={2} 
                title="Opportunity Filtering" 
                description="Identify lots with losses exceeding the threshold."
                details="Threshold = max(Minimum_Harvest_Amount, Volatility * Basis). E.g., Only harvest if loss > $2,000 OR loss > 5%."
              />
              <Step 
                number={3} 
                title="Construct Constraints" 
                description="Build the constraint matrices for the QP solver."
                details="If AAPL is in the 'Wash Sale Period', set Constraint: AAPL_weight <= Current_AAPL_weight (No new buys)."
              />
              <Step 
                number={4} 
                title="Solve & Trade Generation" 
                description="Run the solver (e.g., OSQP, ECOS) to generate target weights."
                details="Diff(Target - Current) = Trades. Send Sell orders as 'Specific Lot ID' (Vs Buy orders as generic)."
              />
            </div>
          </section>

          {/* Section 5: Strategy & Realities - EXPANDED */}
          <section id="strategy">
            <SectionHeader 
              icon={Scale} 
              title="5. Strategic Comparison & Execution" 
              colorClass="text-cyan-600"
              gradientClass="bg-gradient-to-br from-cyan-500 to-cyan-700"
            />
            {/* Intro */}
            <p className="text-lg text-slate-600 mb-8">
              While the math suggests significant value, the real-world implementation of Direct Indexing involves trade-offs between complexity, cost, and tracking error. It is not a free lunch; it is a technology-enabled arbitrage.
            </p>

            {/* Comparison */}
            <SubHeader title="The Unbundling Thesis: Direct Indexing vs. ETFs" icon={Layers} />
            <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm mb-8">
              <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600 p-4">
                <div>Dimension</div>
                <div>ETF (Wrapper)</div>
                <div>Direct Indexing (Underlying)</div>
              </div>
              <div className="divide-y divide-slate-100 text-sm">
                <div className="grid grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-semibold text-slate-800">Tax Efficiency</div>
                  <div className="text-slate-600">Fund Level Only</div>
                  <div className="text-emerald-600 font-bold">Lot Level (Personalized)</div>
                </div>
                <div className="grid grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-semibold text-slate-800">Customization</div>
                  <div className="text-slate-600">None (Take it or leave it)</div>
                  <div className="text-slate-600">High (ESG, Factor Tilts)</div>
                </div>
                <div className="grid grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-semibold text-slate-800">Cost (Fees)</div>
                  <div className="text-emerald-600 font-bold">Ultra Low (~0.03%)</div>
                  <div className="text-slate-600">Moderate (~0.15% - 0.35%)</div>
                </div>
                <div className="grid grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-semibold text-slate-800">Tracking Error</div>
                  <div className="text-emerald-600 font-bold">~0.00%</div>
                  <div className="text-amber-600">0.50% - 2.00% (Active Risk)</div>
                </div>
                <div className="grid grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-semibold text-slate-800">Wash Sale Risk</div>
                  <div className="text-slate-600">Low</div>
                  <div className="text-rose-600 font-bold">High (Requires Complex Logic)</div>
                </div>
              </div>
            </div>

            {/* Alpha Decay */}
            <SubHeader title="The Lifecycle of Tax Alpha" icon={Activity} />
            <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-4">The Decay Curve</h4>
                  <p className="text-sm leading-relaxed mb-4">
                    Tax Alpha is a depleting asset. In a rising market, your cost basis stays fixed while prices rise. Eventually, you run out of losses to harvest.
                  </p>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-emerald-400">Yrs 1-3</div>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[90%]"></div>
                      </div>
                      <div className="w-12 text-right">High</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-blue-400">Yrs 4-7</div>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[50%]"></div>
                      </div>
                      <div className="w-12 text-right">Med</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-slate-500">Yrs 7+</div>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-slate-600 h-full w-[20%]"></div>
                      </div>
                      <div className="w-12 text-right">Low</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 border-l border-slate-700 pl-0 md:pl-8 pt-4 md:pt-0">
                  <h4 className="text-white font-bold mb-4">The Antidote: Continuous Cash</h4>
                  <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                    <p className="text-emerald-200 text-sm">
                      <strong className="text-white">"Reloading the Chamber"</strong><br/>
                      The only way to sustain Tax Alpha is to add fresh cash regularly. New cash buys stocks at current high prices, resetting the basis for those lots and creating new potential for future harvesting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pitfalls */}
            <SubHeader title="Operational Pitfalls" icon={ShieldAlert} />
            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard title="The 'Cash Drag' Silent Killer" theme="rose">
                <p className="text-sm">
                  Holding uninvested cash during a bull market is expensive.<br/><br/>
                  If the market returns 10% and you hold 5% cash to facilitate trades, you lose <strong>0.50%</strong> in performance. This creates a hurdle that can wipe out the tax benefit.<br/>
                  <strong>Fix:</strong> Use a sophisticated optimizer that targets &lt;0.5% cash.
                </p>
              </InfoCard>
              <InfoCard title="Corporate Action Nightmares" theme="amber">
                <p className="text-sm">
                  <strong>Spin-offs, Mergers, & Splits.</strong><br/><br/>
                  If a company spins off a division, your single tax lot splits into two with new basis calculations. <br/>
                  <strong>Risk:</strong> Bad data feeds often miss these details, causing the algo to calculate "phantom" gains or losses, leading to incorrect tax filings.
                </p>
              </InfoCard>
            </div>
          </section>

          {/* Continue Learning Section */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

          {/* Footer */}
          <footer className="pt-12 pb-20 border-t border-slate-200 text-center">
            <div className="inline-block p-4 rounded-full bg-slate-100 mb-4 text-slate-400">
              <Database size={24} />
            </div>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              <strong>Disclaimer:</strong> This is a theoretical tutorial for educational purposes. Tax laws are subject to change. Wash sale rules (IRC §1091) are complex. Consult a tax professional before implementation.
            </p>
            <p className="text-slate-400 text-xs mt-4">
              © 2026 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}