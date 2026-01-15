'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, TrendingUp, Zap, Target, Scale, AlertTriangle, ArrowRightLeft, Info,
  Calculator, Activity, Layers, Percent, Clock, BarChart3, Dna, Flame, Gavel, ShieldAlert,
  GitMerge, Divide, Maximize2, ChevronRight, BookOpen, Briefcase, Globe, Database, 
  FileText, Search, Compass, ArrowLeft
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Global promise to ensure KaTeX is only loaded once
let katexPromise: Promise<any> | null = null;

const loadKatex = () => {
  if (katexPromise) return katexPromise;
  
  katexPromise = new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).katex) {
      resolve((window as any).katex);
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.async = true;
    script.onload = () => resolve((window as any).katex);
    script.onerror = () => reject(new Error('Failed to load KaTeX'));
    document.head.appendChild(script);
  });
  
  return katexPromise;
};

// Robust Latex component to handle math rendering
const Latex = ({ children, displayMode = false }: { children: React.ReactNode; displayMode?: boolean }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadKatex().then(() => setIsReady(true)).catch(console.error);
  }, []);

  useEffect(() => {
    if (isReady && containerRef.current) {
      try {
        const text = Array.isArray(children) ? children.join('') : String(children || "");
        (window as any).katex.render(text, containerRef.current, {
          throwOnError: false,
          displayMode: displayMode,
          trust: true
        });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
      }
    }
  }, [isReady, children, displayMode]);

  return (
    <span ref={containerRef}>
      {!isReady ? (typeof children === 'string' ? children : '') : ''}
    </span>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { 
  title: string; 
  subtitle: string; 
  icon: React.ComponentType<any> 
}) => (
  <div className="mb-12 mt-32 first:mt-0">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
        <Icon size={32} />
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
        {title}
      </h2>
    </div>
    <p className="text-slate-500 text-xl max-w-4xl leading-relaxed">{subtitle}</p>
    <div className="h-1.5 w-32 bg-blue-600 mt-6 rounded-full shadow-sm"></div>
  </div>
);

const Card = ({ title, icon: Icon, children, color = "blue" }: { 
  title: string; 
  icon: React.ComponentType<any>; 
  children: React.ReactNode; 
  color?: string 
}) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    rose: "bg-rose-50 border-rose-200 text-rose-800",
    slate: "bg-slate-50 border-slate-200 text-slate-800",
  };

  const accentColor = colors[color].split(' ')[1];
  const iconBg = colors[color].split(' ')[0];

  return (
    <div className={`p-10 md:p-14 rounded-[3rem] border-2 mb-20 shadow-sm transition-all hover:shadow-2xl bg-white overflow-hidden relative`}>
      <div className={`absolute top-0 left-0 w-full h-2.5 ${accentColor}`}></div>
      <div className="flex items-center gap-6 mb-12">
        <div className={`p-5 rounded-3xl ${iconBg} shadow-sm text-current`}>
          <Icon size={36} />
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
          {title}
        </h3>
      </div>
      <div className="text-lg leading-relaxed space-y-10 text-slate-600">
        {children}
      </div>
    </div>
  );
};

export default function UnpackingCDSArticle() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'unpacking-cds-granular-deep-dive-credit-default-swaps');

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

      <div className="min-h-screen bg-[#fcfdfe] text-slate-900 font-sans p-6 md:p-12 lg:p-24 pb-48">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto mb-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Header */}
        <header className="max-w-6xl mx-auto mb-20 text-center relative pt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[140px] opacity-10 -z-10"></div>
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-50 text-blue-700 font-bold text-sm uppercase tracking-widest mb-10 border border-blue-100 shadow-sm">
            <Activity size={18} /> Quantitative Finance Masterclass
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter text-slate-900 leading-[0.85]">
            Unpacking <span className="text-blue-600">CDS</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium">
            A granular deep-dive into the mechanics of Credit Default Swaps, from bilateral insurance to advanced quantitative Greeks.
          </p>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto mb-20">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/WIPaOHg.jpeg" 
              alt="Credit Default Swaps Infographic" 
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
          src="https://i.imgur.com/WIPaOHg.jpeg"
          alt="Credit Default Swaps Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-5xl mx-auto">
          {/* Module 1: Foundational Intuition (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="1. Foundational Intuition" 
              subtitle="The fundamental transfer of credit risk: Deconstructing the insurance-derivative hybrid." 
              icon={BookOpen}
            />
            <Card title="The Bilateral Payout Mechanism" icon={ShieldCheck} color="blue">
              <div className="space-y-6">
                <p>
                  A <strong>Credit Default Swap (CDS)</strong> is a derivative that separates credit risk from a loan or bond. 
                  It involves two parties: the <strong>Protection Buyer</strong> (who pays a spread) and the <strong>Protection Seller</strong> (who assumes the risk).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                  <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-4">
                      <Search size={18} /> Reference Entity
                    </h4>
                    <p className="text-sm leading-relaxed text-blue-800">
                      The corporation or sovereign whose credit is being tracked. Note the <strong>Entity</strong> is the name, 
                      while the <strong>Obligation</strong> is the specific bond used to determine seniority.
                    </p>
                  </div>
                  <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-4">
                      <Compass size={18} /> Insurable Interest
                    </h4>
                    <p className="text-sm leading-relaxed text-blue-800">
                      Unlike insurance, CDS do not require the buyer to suffer a "loss." This allows for <strong>Long/Short Credit</strong> strategies, 
                      where a trader can profit from a company's demise without owning their debt.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Gavel size={20} /> ISDA Credit Events
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: "Bankruptcy", desc: "Entity becomes insolvent or liquidates." },
                      { name: "Failure to Pay", desc: "Entity misses a payment after grace periods." },
                      { name: "Restructuring", desc: "Terms changed (interest, principal, maturity)." },
                      { name: "Obligation Default", desc: "Another debt triggers a default clause." },
                      { name: "Repudiation", desc: "Sovereign denies the validity of debt." },
                      { name: "Acceleration", desc: "Debt becomes due immediately." }
                    ].map((event, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 group hover:border-blue-400 transition-colors">
                        <span className="font-bold text-xs text-blue-600 uppercase block mb-1">{event.name}</span>
                        <p className="text-[11px] text-slate-500 leading-tight">{event.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Module 2: Pricing and Valuation (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="2. Pricing and Valuation" 
              subtitle="The mathematical architecture: Solving the 'Credit Triangle' through hazard rates." 
              icon={Target}
            />
            <Card title="The Hazard Rate and Survival" icon={Clock} color="indigo">
              <div className="space-y-6">
                <p>
                  CDS valuation relies on modeling <strong>Hazard Rates</strong> (<Latex>{"\\lambda"}</Latex>), 
                  the instantaneous probability of default given survival. This allows us to construct the <strong>Survival Probability</strong> curve (<Latex>{"P(t)"}</Latex>).
                </p>
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 my-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 text-white">
                    <Percent size={120} />
                  </div>
                  <div className="text-2xl font-mono text-indigo-400 py-6 overflow-x-auto text-center border-b border-slate-800 mb-6">
                    <Latex displayMode={true}>{"P(t) = e^{-\\int_0^t \\lambda(u) du}"}</Latex>
                  </div>
                  <p className="text-sm text-slate-400 text-center">
                    Market spreads are "bootstrapped" to find the sequence of hazard rates that satisfy the zero-NPV condition.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                  <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
                    <h5 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                      <Activity size={18} /> The Premium Leg
                    </h5>
                    <p className="text-sm text-indigo-800 mb-6">
                      The PV of periodic spread payments, conditional on survival.
                    </p>
                    <div className="text-lg font-mono text-indigo-700 p-4 bg-white rounded-2xl border border-indigo-200 text-center">
                      <Latex displayMode={true}>{"PV_{Prem} = s \\sum \\Delta t_i D(t_i) P(t_i)"}</Latex>
                    </div>
                  </div>
                  <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100">
                    <h5 className="font-bold text-rose-900 mb-4 flex items-center gap-2">
                      <ShieldAlert size={18} /> The Protection Leg
                    </h5>
                    <p className="text-sm text-rose-800 mb-6">
                      The PV of the contingent payout <Latex>{"(1-R)"}</Latex> upon default.
                    </p>
                    <div className="text-lg font-mono text-rose-700 p-4 bg-white rounded-2xl border border-rose-200 text-center">
                      <Latex displayMode={true}>{"PV_{Prot} = (1-R) \\int_0^T D(t) dP(t)"}</Latex>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="The Credit Triangle Simplification" icon={Divide} color="emerald">
              <div className="space-y-6">
                <p>
                  For "napkin math," traders use the <strong>Credit Triangle</strong> relationship. 
                  For a flat curve and low default probability, the fair spread (<Latex>{"s"}</Latex>) simplifies to:
                </p>
                <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-200 text-center relative">
                  <div className="text-4xl font-bold text-emerald-800">
                    <Latex>{"s \\approx \\lambda \\times (1 - R)"}</Latex>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-4 text-[10px] text-emerald-600 uppercase font-black tracking-widest">
                    <div>Spread</div>
                    <div>Hazard Rate</div>
                    <div>Loss Given Default</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-sm text-slate-500 italic">
                  <strong>Institutional Note:</strong> The Z-spread on a cash bond should theoretically equal the CDS spread. 
                  The difference between them is the <strong>Basis</strong>. <br /><br />
                  <Latex>{"Basis = CDS \\, Spread - Cash \\, Z\\text{-}Spread"}</Latex>
                </div>
              </div>
            </Card>
          </section>

          {/* Module 3: Standardization (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="3. The Big Bang Protocol" 
              subtitle="Evolution of the market: From bespoke contracts to standardized clearing and auction logic." 
              icon={Globe}
            />
            <Card title="Standardization & Upfronts" icon={Zap} color="amber">
              <div className="space-y-6">
                <p>
                  Before 2009, CDS traded with "Par Spreads" (coupons that made NPV=0). Post-Big Bang, coupons are fixed at 100bps or 500bps 
                  to facilitate <strong>Trade Compression</strong> and <strong>Central Clearing</strong>.
                </p>
                <div className="bg-amber-50 rounded-[2.5rem] p-10 border border-amber-200 mt-10">
                  <h4 className="font-bold text-amber-900 mb-8 uppercase text-xs tracking-widest text-center underline decoration-amber-300 underline-offset-8">
                    Settlement Logic (Post-2009)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
                      <span className="font-medium text-slate-700 block mb-4 italic">The Cash Gap:</span>
                      <div className="text-lg font-mono text-amber-800 py-2 border-b border-amber-100">
                        <Latex>{"PUF \\approx (s_{mkt} - Coupon) \\times RD"}</Latex>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                        The difference is paid as a cash lump sum at inception, called Points Upfront.
                      </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
                      <span className="font-medium text-slate-700 block mb-4 italic">Settlement Direction:</span>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold text-rose-600">
                          <span>If mkt spread &gt; coupon</span>
                          <span>Buyer Pays</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-emerald-600">
                          <span>If mkt spread &lt; coupon</span>
                          <span>Seller Pays</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
                  <h5 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <Database size={18} /> Credit Event Auctions
                  </h5>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    To handle massive volumes of CDS during a default (like Lehman Brothers), ISDA introduced the <strong>Auction mechanism</strong>. 
                    Market participants submit bond bids to find a "Final Price." The CDS payout is simply <Latex>{"100 - Final \\, Price"}</Latex>, 
                    avoiding the physical delivery of scarce bonds.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Module 4: Risk Sensitivities (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="4. Risk Sensitivities (CS01)" 
              subtitle="Mastering the Greeks: Quantifying spread risk, term structure, and the convexity of default." 
              icon={Scale}
            />
            <Card title="CS01 & Risky Duration" icon={Dna} color="indigo">
              <div className="space-y-6">
                <p>
                  <strong>CS01</strong> (Credit Spread 01) is the dollar change in NPV for a 1bp shift in the credit spread. 
                  It is fundamentally linked to <strong>Risky Duration</strong> (<Latex>{"RD"}</Latex>), which is the sensitivity of the Premium Leg to the spread.
                </p>
                <div className="bg-indigo-50/50 p-10 rounded-[2.5rem] border border-indigo-100 my-10 relative">
                  <div className="text-2xl font-mono text-indigo-700 py-6 overflow-x-auto text-center border-y border-indigo-200">
                    <Latex displayMode={true}>{"CS01 = \\frac{PV(s + 1bp) - PV(s - 1bp)}{2}"}</Latex>
                  </div>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-indigo-900 font-medium">
                    <div className="flex gap-2">
                      <span className="text-indigo-500 font-bold w-4">1.</span>
                      <p>For safe entities (Low Spreads), RD is high (e.g., 4.8 for 5Y maturity).</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-indigo-500 font-bold w-4">2.</span>
                      <p>For distressed entities (High Spreads), RD collapses because the contract is likely to end early.</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
                  <h5 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-sm">
                    <BarChart3 size={20} className="text-indigo-600" /> Bucketed Credit Exposure
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {['1Y', '3Y', '5Y', '7Y', '10Y'].map((t, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100 group hover:border-indigo-400 transition-all">
                        <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Bucket</span>
                        <span className="text-lg font-black text-indigo-600">{t}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-6 italic">
                    By bumping individual tenors, traders manage <strong>Curve Risk</strong> (steepening/flattening) rather than just parallel shifts.
                  </p>
                </div>
              </div>
            </Card>

            <Card title="Credit Convexity (Negative Gamma)" icon={TrendingUp} color="blue">
              <div className="space-y-6">
                <p>
                  CDS are <strong>non-linear</strong>. <strong>Credit Gamma</strong> measures the change in CS01 as spreads move.
                </p>
                <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100 my-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="flex-1 p-6 bg-white rounded-3xl border border-blue-200 text-center font-mono text-2xl text-blue-800">
                    <Latex>{"\\Gamma = \\frac{\\partial^2 NPV}{\\partial s^2}"}</Latex>
                  </div>
                  <div className="flex-1 text-sm leading-relaxed text-blue-900">
                    For a protection seller, the contract displays <strong>Negative Gamma</strong>. As spreads widen, your losses accelerate, 
                    but as they approach infinity, the loss per basis point (CS01) actually shrinks as the payout becomes certain.
                  </div>
                </div>
                <div className="p-8 border-l-4 border-indigo-400 bg-indigo-50 rounded-r-2xl text-xs text-indigo-800 font-bold leading-relaxed">
                  CRITICAL: This means that a linear CS01 model will <strong>under-estimate</strong> losses in the initial stage of widening 
                  and <strong>over-estimate</strong> them as the name approaches default.
                </div>
              </div>
            </Card>
          </section>

          {/* Module 5: Precise Estimation (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="5. Precise Estimation" 
              subtitle="The professional's toolkit: Estimating P&L and risk profiles on the fly." 
              icon={Calculator}
            />
            <Card title="Manual Risk Estimation" icon={Briefcase} color="emerald">
              <div className="space-y-10">
                <p>
                  Calculating CS01 without a pricing engine requires estimating the <strong>Risky Duration</strong> (<Latex>{"RD"}</Latex>), 
                  which is the sensitivity of the annuity to the spread.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm">
                      <span className="font-bold text-slate-800 block mb-3 uppercase text-[10px] tracking-widest">
                        Risky Duration Estimate
                      </span>
                      <div className="text-2xl font-black text-slate-700">
                        RD &asymp; 4.7 <span className="text-xs font-normal text-slate-400"> (for 5Y IG)</span>
                      </div>
                    </div>
                    <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
                      <span className="font-bold text-emerald-800 block mb-3 uppercase text-[10px] tracking-widest">
                        CS01 Valuation
                      </span>
                      <div className="text-3xl font-mono text-emerald-700 py-4">
                        <Latex>{"CS01 = N \\times RD \\times 10^{-4}"}</Latex>
                      </div>
                      <p className="text-[10px] text-emerald-600 italic mt-2">
                        Where $10^{"{-4}"}$ represents 1bp (0.01%).
                      </p>
                    </div>
                  </div>
                  <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-rose-900">
                      <Percent size={140} />
                    </div>
                    <h4 className="font-bold text-rose-900 mb-6 uppercase text-xs tracking-widest">
                      Recovery ($R$) Sensitivity
                    </h4>
                    <p className="text-xs leading-relaxed text-rose-800 mb-6 font-medium">
                      Recovery defaults to 40%. Changing it affects the <strong>Hazard Rate</strong> bootstrapped from the spread.
                    </p>
                    <ul className="text-[10px] text-rose-700 space-y-3 font-bold uppercase tracking-tighter">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                        Low Recovery &rArr; High Hazard Rate &rArr; Short RD &rArr; Low CS01
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                        High Recovery &rArr; Low Hazard Rate &rArr; Long RD &rArr; High CS01
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Module 6: Stress Testing Logic (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="6. Stress Testing Logic" 
              subtitle="Tail-risk quantification: Evaluating the portfolio's breaking points." 
              icon={ShieldAlert}
            />
            <Card title="Tiered Stress Testing" icon={AlertTriangle} color="rose">
              <div className="space-y-12">
                <p>
                  Professional desks use three tiers of stress testing to ensure they can survive a systemic or idiosyncratic credit crash.
                </p>
                <div className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-slate-800 opacity-40">
                    <Activity size={120} />
                  </div>
                  <h4 className="text-2xl font-bold mb-10 text-rose-400 border-b border-slate-800 pb-4 inline-block">
                    Tier 1: Linear Stress (Parallel)
                  </h4>
                  <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                    A "Systemic Widening" shock (e.g., +200bps). This is a 1st order estimate used for daily risk reporting.
                  </p>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="p-8 bg-slate-800 rounded-3xl border border-slate-700 flex-1 text-center">
                      <span className="text-[10px] text-slate-500 block mb-4 uppercase tracking-widest font-black">
                        Linear Logic
                      </span>
                      <div className="text-2xl font-bold text-rose-400 font-mono">
                        <Latex>{"Loss \\approx CS01 \\times \\Delta s"}</Latex>
                      </div>
                    </div>
                    <div className="p-8 bg-slate-800 rounded-3xl border border-slate-700 flex-1">
                      <span className="text-[10px] text-slate-500 block mb-4 uppercase tracking-widest font-black">
                        Convexity Effect
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed italic">
                        Note: This over-estimates losses for sellers in extreme shocks because it ignores the payout cap.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-amber-50 rounded-[3rem] border border-amber-200">
                    <h4 className="text-2xl font-bold mb-6 text-amber-800 flex items-center gap-3">
                      <Flame size={28} /> Tier 2: Jump-to-Default
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-8">
                      Assumes an <strong>instantaneous</strong> credit event. This removes all probability modeling and calculates the actual cash payout.
                    </p>
                    <div className="p-6 bg-white rounded-3xl border border-amber-200 text-center font-mono text-xl text-amber-700 shadow-sm">
                      <Latex>{"JTD = N(1 - R) - MTM"}</Latex>
                    </div>
                    <p className="text-[10px] text-amber-600 mt-6 text-center italic font-bold uppercase">
                      Ultimate Worst-Case Loss
                    </p>
                  </div>
                  <div className="p-10 bg-indigo-50 rounded-[3rem] border border-indigo-200 flex flex-col justify-center">
                    <h4 className="text-2xl font-bold mb-6 text-indigo-800 flex items-center gap-3">
                      <GitMerge size={28} /> Tier 3: Recovery Shock
                    </h4>
                    <p className="text-sm text-indigo-700 leading-relaxed italic mb-4">
                      In a crisis, <strong>Wrong-Way Risk</strong> occurs: spreads widen and Recovery rates drop simultaneously (e.g., 40% &rarr; 15%).
                    </p>
                    <div className="p-6 bg-white/60 rounded-3xl text-xs text-indigo-900 border border-indigo-100 font-bold leading-relaxed">
                      This "Double Whammy" stress captures the systemic nature of credit cycles where assets and recovery values correlate to the downside.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
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

        <footer className="mt-40 py-24 border-t border-slate-200 text-center">
          <div className="flex justify-center gap-10 mb-10 text-slate-300">
            <FileText size={40} />
            <Activity size={40} />
            <TrendingUp size={40} />
          </div>
          <p className="text-slate-400 text-xl font-black uppercase tracking-tighter">
            Advanced Quantitative Research Group
          </p>
          <p className="text-slate-300 text-[10px] mt-4 tracking-[0.5em] uppercase font-black">
            Confidential Institutional Framework — © 2026
          </p>
          <p className="text-slate-500 text-sm mt-8">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </footer>
      </div>
    </>
  );
}
