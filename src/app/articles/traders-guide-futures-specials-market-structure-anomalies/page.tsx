'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Clock, Database, Zap, Coffee, Activity, Layers, BookOpen, Anchor, Box, Droplet, Flame, Scale, Calendar, Search, ArrowRight, RefreshCw, Sun, Snowflake, BarChart2, Lock, Unlock, Truck, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Reusable Components ---
const SectionHeader = ({ icon: Icon, title, subtitle, colorClass }: {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  colorClass: string;
}) => (
  <div className="mb-8 border-l-4 pl-4 py-2 border-current" style={{ color: colorClass }}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg text-white shadow-md`} style={{ backgroundColor: colorClass }}>
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
    </div>
    <p className="text-lg text-slate-600 max-w-2xl">{subtitle}</p>
  </div>
);

const Card = ({ title, children, colorClass, active = false, onClick, badge }: {
  title: string;
  children: React.ReactNode;
  colorClass: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string;
}) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-1 rounded-xl border p-6 shadow-sm hover:shadow-lg relative overflow-hidden ${
      active ? 'bg-white ring-2 ring-offset-2' : 'bg-slate-50 border-slate-200'
    }`}
    style={{ borderColor: active ? colorClass : '', '--tw-ring-color': colorClass } as React.CSSProperties}
  >
    {badge && (
      <div 
        className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-lg" 
        style={{ backgroundColor: colorClass }}
      >
        {badge}
      </div>
    )}
    <h3 className="text-xl font-bold mb-3 text-slate-800 flex items-center gap-2">
      {title}
    </h3>
    <div className={`text-slate-600 ${active ? 'opacity-100' : 'opacity-80'}`}>
      {children}
    </div>
    {!active && (
      <div className="mt-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: colorClass }}>
        Read More <ArrowRight size={12}/>
      </div>
    )}
  </div>
);

const FormulaBox = ({ title, formula, legend }: {
  title: string;
  formula: string;
  legend: Array<{ k: string; v: string }>;
}) => (
  <div className="my-6 p-6 bg-slate-900 rounded-xl text-center text-white shadow-xl overflow-hidden relative group hover:shadow-2xl transition-shadow">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <div className="text-6xl font-serif">∫</div>
    </div>
    <p className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-semibold">{title}</p>
    <div className="text-xl md:text-2xl font-mono font-bold tracking-wider mb-4 border-b border-slate-700 pb-4 inline-block">
      {formula}
    </div>
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-slate-400">
      {legend.map((item, idx) => (
        <span key={idx}>
          <strong className="text-blue-400">{item.k}:</strong> {item.v}
        </span>
      ))}
    </div>
  </div>
);

const InfoBlock = ({ title, content, type = "info" }: {
  title: string;
  content: string;
  type?: "info" | "warning" | "danger" | "success";
}) => {
  const styles = {
    info: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: "text-blue-500" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", icon: "text-amber-500" },
    danger: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-500" },
    success: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800", icon: "text-emerald-500" },
  };
  const s = styles[type];
  
  return (
    <div className={`${s.bg} border ${s.border} rounded-lg p-4 my-4 flex gap-4 shadow-sm`}>
      <div className={`mt-1 ${s.icon} flex-shrink-0`}>
        {type === 'danger' ? <AlertTriangle size={20} /> : <BookOpen size={20} />}
      </div>
      <div>
        <h4 className={`font-bold mb-1 text-sm uppercase tracking-wide ${s.text}`}>{title}</h4>
        <p className="text-sm text-slate-700 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default function FuturesSpecialsArticle() {
  const [activeTab, setActiveTab] = useState('contango');
  const [activeTreasury, setActiveTreasury] = useState('otr');
  const [activeDeliveryStep, setActiveDeliveryStep] = useState('pos_day');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  // Color Palette
  const colors = {
    structure: '#0EA5E9', // Sky Blue
    treasury: '#10B981',  // Emerald
    spreads: '#F97316',   // Orange
    energy: '#F43F5E',    // Rose
    softs: '#F59E0B',     // Amber
    micro: '#8B5CF6',     // Violet
  };

  const currentArticle = articles.find(article => article.slug === 'traders-guide-futures-specials-market-structure-anomalies');

  if (!currentArticle) {
    return <div>Article not found</div>;
  }

  return (
    <>
      {/* SEO Components */}
      <StructuredData article={currentArticle} />
      <BreadcrumbStructuredData 
        articleTitle={currentArticle.title} 
        articleSlug={currentArticle.slug || 'traders-guide-futures-specials-market-structure-anomalies'} 
      />

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* --- HERO SECTION --- */}
        <header className="bg-white pt-24 pb-20 px-6 lg:px-24 border-b border-slate-200 shadow-sm relative overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-fuchsia-50 rounded-full blur-3xl -ml-20 -mb-20 opacity-60"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">Advanced Market Structure</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wide">Ref: Trader's Manual</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              The Trader's Guide to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Futures Specials</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
              Markets are not perfectly efficient. They are constrained by <strong>logistics</strong>, <strong>storage</strong>, and <strong>math</strong>. This document details the structural anomalies—from the "Widowmaker" spread to negative oil—that define alpha and ruin.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/ayrGomS.jpeg" 
              alt="Futures Specials Market Structure Infographic" 
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
          src="https://i.imgur.com/ayrGomS.jpeg"
          alt="Futures Specials Market Structure Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-6xl mx-auto px-6 lg:px-24 py-16 space-y-32">
          {/* --- SECTION 1: TERM STRUCTURE --- */}
          <section>
            <SectionHeader 
              icon={Clock} 
              title="The Physics of Time: Term Structure" 
              subtitle="Understanding the Cost of Carry, Forward Curves, and why 'Rolling' kills returns."
              colorClass={colors.structure}
            />
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column: Theory & Formula */}
              <div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Futures prices are not merely predictions of the future; they are mathematical projections of the spot price based on the <strong>Cost of Carry</strong>. Arbitrageurs enforce this link. If the future deviates from this cost, risk-free profit exists.
                </p>
                
                <FormulaBox 
                  title="Cost of Carry Model"
                  formula="F(t) = S(t) · e^{(r + u - y)(T - t)}"
                  legend={[
                    {k: 'r', v: 'Interest Rate (Cost to borrow cash)'},
                    {k: 'u', v: 'Storage Cost (Insurance, Tank fees)'},
                    {k: 'y', v: 'Convenience Yield (Benefit of holding physical)'}
                  ]}
                />
                
                <div className="mt-8 space-y-4">
                  <h4 className="font-bold text-slate-800 border-b pb-2">Deconstructing the Formula</h4>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-xs font-bold uppercase text-slate-400 mb-1">Financials (Gold/Forex)</div>
                      <div className="font-semibold text-slate-800">High 'r', Low 'u'</div>
                      <p className="text-xs text-slate-600 mt-2">Price driven by interest rates. Storage is cheap (vaults/electronic).</p>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-xs font-bold uppercase text-slate-400 mb-1">Physicals (Oil/Grain)</div>
                      <div className="font-semibold text-slate-800">High 'u', Variable 'y'</div>
                      <p className="text-xs text-slate-600 mt-2">Price driven by tank space and scarcity. Storage is expensive.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-sky-50 rounded-xl border border-sky-100 p-6 shadow-sm mt-6">
                  <h4 className="font-bold text-sky-900 mb-2 flex items-center gap-2">
                    <RefreshCw size={18} /> The Mechanics of "The Roll"
                  </h4>
                  <p className="text-sm text-sky-800 mb-4 leading-relaxed">
                    Speculators rarely take delivery. Before expiry, they must "Roll" (Close the expiring contract, Open the next month).
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-white/50 p-2 rounded">
                      <div className="font-bold mb-1">Contango Roll</div>
                      <div className="text-red-600">Sell Low (Spot)</div>
                      <div className="text-red-600">Buy High (Future)</div>
                      <div className="mt-1 font-bold text-slate-700">= LOSS</div>
                    </div>
                    <div className="bg-white/50 p-2 rounded">
                      <div className="font-bold mb-1">Backwardation Roll</div>
                      <div className="text-emerald-600">Sell High (Spot)</div>
                      <div className="text-emerald-600">Buy Low (Future)</div>
                      <div className="mt-1 font-bold text-slate-700">= PROFIT</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Visualizer */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 min-h-[600px] flex flex-col overflow-hidden">
                <div className="flex border-b border-slate-100">
                  <button 
                    onClick={() => setActiveTab('contango')}
                    className={`flex-1 py-4 font-bold text-sm uppercase tracking-wide transition-colors ${
                      activeTab === 'contango' 
                        ? 'text-sky-600 bg-sky-50 border-b-2 border-sky-500' 
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Contango (Normal)
                  </button>
                  <button 
                    onClick={() => setActiveTab('backwardation')}
                    className={`flex-1 py-4 font-bold text-sm uppercase tracking-wide transition-colors ${
                      activeTab === 'backwardation' 
                        ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-500' 
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Backwardation (Inverted)
                  </button>
                </div>
                
                <div className="p-8 flex-1 relative">
                  {activeTab === 'contango' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                      {/* SVG Chart Contango */}
                      <div className="h-48 w-full mb-6 relative border-b border-l border-slate-300">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                          {/* Grid lines */}
                          <line x1="0" y1="25" x2="300" y2="25" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="75" x2="300" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                          {/* Curve */}
                          <path d="M0,80 Q150,50 300,10" fill="none" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
                          {/* Points */}
                          <circle cx="0" cy="80" r="4" fill="#64748b" />
                          <circle cx="300" cy="10" r="4" fill="#0EA5E9" />
                          {/* Labels */}
                          <text x="5" y="75" className="text-[10px] fill-slate-500 font-mono">Spot Price</text>
                          <text x="220" y="25" className="text-[10px] fill-sky-600 font-mono font-bold">Future Premium</text>
                          <text x="150" y="95" className="text-[10px] fill-slate-400 uppercase tracking-widest">Time to Maturity →</text>
                        </svg>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4 text-sky-600">
                        <TrendingUp size={28} />
                        <h3 className="text-xl font-bold">Contango Market Structure</h3>
                      </div>
                      
                      <p className="text-slate-600 mb-6 text-sm">
                        Futures prices are <strong>higher</strong> than spot. This reflects the cost of storage, insurance, and financing. This is the "normal" state for non-perishable commodities with ample supply.
                      </p>
                      
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                        <h4 className="font-bold text-slate-800 text-sm mb-2">The "Cash & Carry" Arbitrage</h4>
                        <ol className="list-decimal pl-4 space-y-2 text-xs text-slate-600">
                          <li>Borrow Cash at rate $r$.</li>
                          <li>Buy Physical Asset at Spot ($S$).</li>
                          <li>Sell Futures Contract at ($F$).</li>
                          <li>Store asset until expiry (Cost $u$).</li>
                          <li>Deliver asset to settle Future. Pay back loan.</li>
                          <li><strong>Result:</strong> If $F {'>'} S + Costs$, you make risk-free money.</li>
                        </ol>
                      </div>
                      
                      <div className="mt-auto flex items-center gap-2 text-xs text-slate-400">
                        <Scale size={14} /> Example: VIX Futures (Insurance always costs money), Gold.
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                      {/* SVG Chart Backwardation */}
                      <div className="h-48 w-full mb-6 relative border-b border-l border-slate-300">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                          {/* Grid lines */}
                          <line x1="0" y1="25" x2="300" y2="25" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="75" x2="300" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                          {/* Curve */}
                          <path d="M0,20 Q150,50 300,90" fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
                          {/* Points */}
                          <circle cx="0" cy="20" r="4" fill="#64748b" />
                          <circle cx="300" cy="90" r="4" fill="#4F46E5" />
                          {/* Labels */}
                          <text x="5" y="15" className="text-[10px] fill-slate-500 font-mono">Spot Premium</text>
                          <text x="220" y="85" className="text-[10px] fill-indigo-600 font-mono font-bold">Future Discount</text>
                          <text x="150" y="110" className="text-[10px] fill-slate-400 uppercase tracking-widest">Time to Maturity →</text>
                        </svg>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4 text-indigo-600">
                        <TrendingDown size={28} />
                        <h3 className="text-xl font-bold">Backwardation (Scarcity)</h3>
                      </div>
                      
                      <p className="text-slate-600 mb-6 text-sm">
                        Futures prices are <strong>lower</strong> than spot. This signals an immediate physical shortage. The market is effectively saying: "We will pay you a premium to have the commodity NOW, not later."
                      </p>
                      
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-4">
                        <h4 className="font-bold text-indigo-900 text-sm mb-2">The "Convenience Yield" ($y$)</h4>
                        <p className="text-xs text-indigo-800 leading-relaxed mb-2">
                          Unlike Contango, you cannot easily arbitrage Backwardation because you cannot "borrow" a commodity from the future to sell today. 
                        </p>
                        <p className="text-xs text-indigo-800 font-bold">Yield {'>'} Interest + Storage</p>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Snowflake size={14} className="text-sky-400"/>
                            <span>Nat Gas (Winter)</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Sun size={14} className="text-orange-400"/>
                            <span>Corn (Pre-Harvest)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 2: TREASURIES --- */}
          <section>
            <SectionHeader 
              icon={Database} 
              title="The Treasury Complex" 
              subtitle="Embedded Options, The 'Wildcard', and the anatomy of the Basis Trade."
              colorClass={colors.treasury}
            />
            
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-3">
                <button 
                  onClick={() => setActiveTreasury('otr')}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeTreasury === 'otr' 
                      ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-md' 
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">1. Liquidity Premium</span>
                    <span className="text-xs font-mono text-emerald-600 bg-emerald-100 px-2 py-1 rounded">OTR / OFTR</span>
                  </div>
                  <div className="text-xs text-slate-500">The "Smile" in the yield curve.</div>
                </button>
                
                <button 
                  onClick={() => setActiveTreasury('repo')}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeTreasury === 'repo' 
                      ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-md' 
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">2. Repo "Specials"</span>
                    <span className="text-xs font-mono text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Squeeze</span>
                  </div>
                  <div className="text-xs text-slate-500">When borrowing a bond costs money.</div>
                </button>
                
                <button 
                  onClick={() => setActiveTreasury('basis')}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeTreasury === 'basis' 
                      ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-md' 
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">3. The Basis Trade</span>
                    <span className="text-xs font-mono text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Arbitrage</span>
                  </div>
                  <div className="text-xs text-slate-500">Spot vs Future convergence.</div>
                </button>
                
                <button 
                  onClick={() => setActiveTreasury('ctd')}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeTreasury === 'ctd' 
                      ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-md' 
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">4. CTD Mechanics</span>
                    <span className="text-xs font-mono text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Delivery</span>
                  </div>
                  <div className="text-xs text-slate-500">Duration bias & Conversion Factors.</div>
                </button>
                
                <button 
                  onClick={() => setActiveTreasury('wildcard')}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeTreasury === 'wildcard' 
                      ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-md' 
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">5. The Wildcard</span>
                    <span className="text-xs font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded">Option</span>
                  </div>
                  <div className="text-xs text-slate-500">The 2:00 PM vs 4:00 PM Arb.</div>
                </button>
              </div>
              
              <div className="lg:col-span-8 bg-white rounded-2xl shadow-lg border border-slate-100 p-8 relative overflow-hidden flex flex-col justify-center min-h-[500px]">
                <div className="absolute top-0 right-0 p-32 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
                
                {activeTreasury === 'otr' && (
                  <div className="animate-in fade-in zoom-in-95 duration-300 h-full">
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">The Liquidity Smile</h3>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                      The US Treasury Yield Curve is not a smooth line. The most recently issued bonds (On-the-Run) trade at a premium (lower yield) because they are highly liquid. Old bonds (Off-the-Run) trade at a discount.
                    </p>
                    
                    {/* Visual Chart for OTR */}
                    <div className="h-48 w-full bg-slate-50 rounded-lg border border-slate-200 mb-6 relative overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 400 150">
                        {/* Grid */}
                        <line x1="0" y1="120" x2="400" y2="120" stroke="#cbd5e1" strokeWidth="1"/>
                        {/* Theoretical Curve */}
                        <path d="M20,100 Q200,80 380,20" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4"/>
                        <text x="300" y="35" className="text-[10px] fill-slate-400">Theoretical Yield</text>
                        {/* OTR Dip */}
                        <path d="M20,100 Q150,85 200,110 T380,20" fill="none" stroke="#10b981" strokeWidth="3"/>
                        {/* Points */}
                        <circle cx="200" cy="110" r="5" fill="#047857"/>
                        <text x="200" y="135" textAnchor="middle" className="text-xs font-bold fill-emerald-800">OTR 10Y (Yield Dip)</text>
                        <circle cx="160" cy="85" r="4" fill="#64748b"/>
                        <text x="160" y="75" textAnchor="middle" className="text-[10px] fill-slate-500">Old 10Y</text>
                      </svg>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                        <div className="font-bold text-emerald-900 text-sm">The Trade</div>
                        <p className="text-xs text-emerald-800 mt-1">Short OTR (Expensive) / Long OFTR (Cheap). Bet on spread convergence.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="font-bold text-slate-800 text-sm">The Risk</div>
                        <p className="text-xs text-slate-600 mt-1">In a crisis, "Flight to Quality" widens the spread. Everyone wants OTR; nobody wants OFTR.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTreasury === 'repo' && (
                  <div className="animate-in fade-in zoom-in-95 duration-300 h-full">
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Repo Specials & The Squeeze</h3>
                    <p className="text-slate-600 mb-6 text-sm">
                      A bond goes "special" when the demand to borrow it (to cover short positions) exceeds supply.
                    </p>
                    
                    <div className="bg-slate-900 text-slate-50 p-6 rounded-xl font-mono text-sm mb-6 shadow-lg">
                      <div className="mb-4 border-b border-slate-700 pb-2 text-slate-400">Daily Cost of Carry Calculation</div>
                      <div className="flex justify-between mb-2">
                        <span>General Collateral (GC):</span>
                        <span className="text-emerald-400">5.30%</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Specific Issue Repo:</span>
                        <span className="text-red-400">0.05%</span>
                      </div>
                      <div className="border-t border-slate-700 pt-2 flex justify-between font-bold">
                        <span>"Specialness":</span>
                        <span className="text-yellow-400">5.25% (Cost to Short)</span>
                      </div>
                    </div>
                    
                    <InfoBlock 
                      title="The Mechanics of the Squeeze" 
                      content="If you are Short the bond, you must borrow it. If the Repo rate drops to 0% (or negative), you are paying massive fees daily just to keep the short open. Eventually, you capitulate and Buy Back the bond to close the trade."
                      type="danger" 
                    />
                  </div>
                )}
                
                {activeTreasury === 'basis' && (
                  <div className="animate-in fade-in zoom-in-95 duration-300 h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-emerald-800">The Basis Trade Anatomy</h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Hedge Fund Strategy</span>
                    </div>
                    
                    {/* Flow Diagram */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 flex flex-col items-center">
                      <div className="flex items-center gap-4 w-full justify-center">
                        <div className="p-3 bg-white border border-slate-300 rounded shadow-sm text-center w-32">
                          <div className="text-xs text-slate-400 uppercase">Step 1</div>
                          <div className="font-bold text-sm">Buy Bond</div>
                          <div className="text-[10px] text-emerald-600">Spot Market</div>
                        </div>
                        <ArrowRight className="text-slate-400"/>
                        <div className="p-3 bg-white border border-slate-300 rounded shadow-sm text-center w-32">
                          <div className="text-xs text-slate-400 uppercase">Step 2</div>
                          <div className="font-bold text-sm">Repo Bond</div>
                          <div className="text-[10px] text-slate-500">Get Cash</div>
                        </div>
                        <ArrowRight className="text-slate-400"/>
                        <div className="p-3 bg-white border border-slate-300 rounded shadow-sm text-center w-32">
                          <div className="text-xs text-slate-400 uppercase">Step 3</div>
                          <div className="font-bold text-sm">Sell Future</div>
                          <div className="text-[10px] text-red-500">Capture Basis</div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-slate-500 italic text-center w-full border-t border-slate-200 pt-2">
                        Repeat 50x for Leverage
                      </div>
                    </div>
                    
                    <FormulaBox 
                      title="Net Basis Formula"
                      formula="BNOC = (P_spot - (P_future × CF)) - Carry"
                      legend={[
                        {k: 'BNOC', v: 'Basis Net of Carry'},
                        {k: 'Carry', v: 'Coupon Income - Repo Cost'}
                      ]}
                    />
                    <p className="text-xs text-slate-500 mt-2">If BNOC is positive, the cash bond is cheap relative to futures. You buy the bond, sell the future.</p>
                  </div>
                )}
                
                {activeTreasury === 'ctd' && (
                  <div className="animate-in fade-in zoom-in-95 duration-300 h-full">
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Delivery Mechanics (CTD)</h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      The short seller has the right to choose <strong>which</strong> bond to deliver. They calculate the "Implied Repo Rate" for every deliverable bond and pick the highest one (Max Profit).
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg border-2 border-slate-100 hover:border-emerald-200 transition-colors">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                          <TrendingDown size={16} className="text-red-500"/> High Yield Environment
                        </h4>
                        <p className="text-xs text-slate-600">Yields {'>'} 6%. Long duration bonds (low coupon) tend to be Cheapest to Deliver.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-slate-100 hover:border-emerald-200 transition-colors">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                          <TrendingUp size={16} className="text-emerald-500"/> Low Yield Environment
                        </h4>
                        <p className="text-xs text-slate-600">Yields {'<'} 6%. Short duration bonds tend to be Cheapest to Deliver.</p>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <h4 className="font-bold text-emerald-900 text-sm mb-1">The "Switch" Option</h4>
                      <p className="text-xs text-emerald-800">If yields shift significantly, the CTD bond can change. This creates uncertainty for the Long holder (who doesn't know what they will receive), suppressing the futures price.</p>
                    </div>
                  </div>
                )}
                
                {activeTreasury === 'wildcard' && (
                  <div className="animate-in fade-in zoom-in-95 duration-300 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                        <Clock size={24}/>
                      </div>
                      <h3 className="text-2xl font-bold text-purple-900">The Wildcard Option</h3>
                    </div>
                    
                    <div className="relative border-l-2 border-purple-200 ml-3 pl-6 space-y-6 my-6">
                      <div className="relative">
                        <span className="absolute -left-[31px] bg-purple-100 text-purple-700 text-[10px] font-bold px-1 rounded border border-purple-200">2:00 PM</span>
                        <h4 className="font-bold text-slate-800 text-sm">Futures Market Settles</h4>
                        <p className="text-xs text-slate-600">The Invoice Price for delivery is fixed based on this price.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[31px] bg-slate-100 text-slate-700 text-[10px] font-bold px-1 rounded border border-slate-200">4:00 PM</span>
                        <h4 className="font-bold text-slate-800 text-sm">Cash Market Closes</h4>
                        <p className="text-xs text-slate-600">Bonds continue to trade for 2 more hours.</p>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-5 rounded-xl border border-purple-200 shadow-sm">
                      <h4 className="font-bold text-purple-900 text-sm mb-2">The Arbitrage Opportunity</h4>
                      <p className="text-xs text-purple-800 leading-relaxed mb-2">
                        If bond prices <strong>crash</strong> between 2:00 PM and 4:00 PM, the Short Seller can:
                      </p>
                      <ol className="list-decimal pl-4 text-xs text-purple-900 space-y-1 font-medium">
                        <li>Buy the physical bond cheaply in the spot market (at 3:30 PM).</li>
                        <li>Submit "Notice of Intent to Deliver" to the exchange.</li>
                        <li>Deliver the bond at the higher, fixed 2:00 PM Futures Price.</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          {/* --- SECTION 3: SPREADS --- */}
          <section>
            <SectionHeader 
              icon={Scale} 
              title="Essential Commodity Spreads" 
              subtitle="Processing margins and Inter-market relationships."
              colorClass={colors.spreads}
            />
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Crack Spread" badge="Energy" colorClass={colors.spreads}>
                <div className="mb-3 text-sm font-mono bg-orange-50 p-2 rounded text-orange-800">3:2:1 Ratio</div>
                <p className="text-sm text-slate-600 mb-3">Buy 3 Crude Oil → Sell 2 Gasoline + 1 Heating Oil.</p>
                <p className="text-sm text-slate-600">
                  This measures the <strong>refining margin</strong>. If the spread tightens, refiners slow production, eventually causing product shortages (Gasoline prices rise).
                </p>
              </Card>
              
              <Card title="Crush Spread" badge="Agriculture" colorClass={colors.softs}>
                <div className="mb-3 text-sm font-mono bg-amber-50 p-2 rounded text-amber-800">Board Crush</div>
                <p className="text-sm text-slate-600 mb-3">Buy Soybeans → Sell Soybean Meal + Soybean Oil.</p>
                <p className="text-sm text-slate-600">
                  Measures the profit of processing beans. Meal is for animal feed, Oil is for cooking/biodiesel. Often trades in opposite directions based on Chinese demand vs Energy demand.
                </p>
              </Card>
              
              <Card title="The Widowmaker" badge="Dangerous" colorClass="#DC2626">
                <div className="mb-3 text-sm font-mono bg-red-50 p-2 rounded text-red-800">March/April Nat Gas</div>
                <p className="text-sm text-slate-600 mb-3">Long March (Winter) / Short April (Spring).</p>
                <p className="text-sm text-slate-600">
                  Known for extreme volatility. It bets on how much gas is left in storage at the exact end of winter. It has bankrupted hedge funds (e.g., Amaranth Advisors) due to weather unpredictability.
                </p>
              </Card>
            </div>
          </section>

          {/* --- SECTION 4: DELIVERY MECHANICS (EXPANDED) --- */}
          <section>
            <SectionHeader 
              icon={Calendar} 
              title="The Delivery Timeline" 
              subtitle="The critical dates where 'Paper' becomes 'Physical'. The danger zone for speculators."
              colorClass="#6366f1"
            />
            
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left: Interactive Timeline Selectors */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6">
                  <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <AlertTriangle size={18}/> Retail Warning
                  </h4>
                  <p className="text-xs text-indigo-800 leading-relaxed">
                    Most retail brokerages will <strong>force liquidate</strong> your position 24-48 hours before First Notice Day to prevent accidental delivery.
                  </p>
                </div>
                
                {/* Timeline Steps */}
                {[
                  { id: 'pos_day', label: '1. First Position Day', date: 'T-2 Days', desc: 'Longs declare intent.' },
                  { id: 'fnd', label: '2. First Notice Day', date: 'T-0', desc: 'Assignments begin.' },
                  { id: 'ltd', label: '3. Last Trading Day', date: 'End of Month', desc: 'Trading stops.' },
                  { id: 'delivery', label: '4. Delivery Day', date: 'T+2 to T+7', desc: 'Warrants transfer.' }
                ].map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveDeliveryStep(step.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                      activeDeliveryStep === step.id 
                        ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500' 
                        : 'bg-white border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex justify-between items-center z-10 relative">
                      <span className={`font-bold ${activeDeliveryStep === step.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                        {step.label}
                      </span>
                      <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {step.date}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 z-10 relative">{step.desc}</div>
                    {activeDeliveryStep === step.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Right: Detailed Content View */}
              <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-8 min-h-[500px] relative">
                {activeDeliveryStep === 'pos_day' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                        <Lock size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">First Position Day</h3>
                        <p className="text-sm text-slate-500">The "Line in the Sand"</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                        <h4 className="font-bold text-slate-800 text-sm mb-2">The Margin Hike</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Until now, you only needed SPAN margin (e.g., $5,000 to control $100,000 of oil). On Position Day, the exchange (and your broker) realizes you might actually buy the oil. <strong>Margin requirement jumps to 100% of the contract value.</strong>
                        </p>
                      </div>
                      
                      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-800 text-sm mb-2">Long Holder's Choice</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Clearing firms holding Long positions must report their "Long Interest" to the exchange. They basically tell the exchange: "We are staying in."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeDeliveryStep === 'fnd' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">First Notice Day (FND)</h3>
                        <p className="text-sm text-slate-500">The Lottery You Don't Want to Win</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      This is the first day the Exchange matches a Short (who wants to deliver) with a Long (who must accept).
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <div className="font-bold text-indigo-900 text-sm mb-2">The Matching Algo</div>
                        <p className="text-xs text-indigo-800">
                          Most exchanges use the <strong>"Oldest Long"</strong> rule. The trader who has held the Long position the longest gets assigned first.
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <div className="font-bold text-red-900 text-sm mb-2">Accidental Assignment</div>
                        <p className="text-xs text-red-800">
                          If you forget to close your position and get matched, you are legally obligated to pay the full contract value (e.g., $100k) immediately.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-slate-800 text-sm mb-2">The "Retender" Escape Hatch</h4>
                      <p className="text-xs text-slate-600">
                        If you get assigned by mistake, you can sometimes "Retender" (resell) the notice if the contract allows it. However, you will pay massive fees and likely take a loss on the spread.
                      </p>
                    </div>
                  </div>
                )}
                
                {activeDeliveryStep === 'ltd' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">Last Trading Day (LTD)</h3>
                        <p className="text-sm text-slate-500">Game Over</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="font-bold text-sm min-w-[100px] text-slate-800">Cash Settled</div>
                        <div className="text-sm text-slate-600">
                          (ES, NQ, Feeder Cattle). The exchange takes the final settlement price, compares it to your entry, and credits/debits your cash balance. No trucks involved.
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="font-bold text-sm min-w-[100px] text-slate-800">Physical</div>
                        <div className="text-sm text-slate-600">
                          (CL, ZC, GC). Trading stops. Anyone still open MUST deliver or take delivery. The price is fixed.
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                        <h4 className="font-bold text-yellow-900 text-sm mb-1">The "Squeeze" Danger</h4>
                        <p className="text-xs text-yellow-800">
                          LTD is often volatile. If a big player corners the market, Shorts who waited until the last minute to buy back their positions find no liquidity and must pay any price to exit.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeDeliveryStep === 'delivery' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                        <Box size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">Delivery Day</h3>
                        <p className="text-sm text-slate-500">Exchange of Warrants</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6">
                      Actual physical handling of commodities is rare for traders. It is usually an exchange of electronic <strong>Warehouse Receipts</strong> or <strong>Shipping Certificates</strong>.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="font-bold text-slate-800 mb-1">Exchange</div>
                        <div className="text-xs text-slate-500">Clearing House</div>
                        <div className="my-2 text-indigo-300">↓</div>
                        <div className="text-[10px] bg-slate-100 p-1 rounded">Matches Buyer/Seller</div>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="font-bold text-slate-800 mb-1">Seller</div>
                        <div className="text-xs text-slate-500">Short</div>
                        <div className="my-2 text-indigo-300">→</div>
                        <div className="text-[10px] bg-slate-100 p-1 rounded">Sends Warrant</div>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="font-bold text-slate-800 mb-1">Buyer</div>
                        <div className="text-xs text-slate-500">Long</div>
                        <div className="my-2 text-indigo-300">←</div>
                        <div className="text-[10px] bg-slate-100 p-1 rounded">Sends Cash</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t border-slate-100 pt-4">
                      <h4 className="font-bold text-slate-800 text-sm mb-2">ADP (Exchange for Physical)</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Often, a producer and consumer will find each other and agree to settle <strong>outside</strong> the exchange mechanism to choose specific locations/grades. They tell the exchange to clear their futures positions against this physical deal.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* --- SECTION 5: PHYSICAL ANOMALIES --- */}
          <section>
            <SectionHeader 
              icon={Zap} 
              title="Physical Delivery Anomalies" 
              subtitle="When logistics fail: Negative prices in Energy and Power."
              colorClass={colors.energy}
            />
            
            <div className="space-y-6">
              <div className="bg-white border-l-8 border-rose-500 rounded-r-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <Flame className="text-rose-500" size={32} /> WTI Crude Oil (April 2020)
                  </h3>
                  <div className="text-5xl font-extrabold text-rose-600 my-4">-$37.63</div>
                  <p className="text-slate-600 leading-relaxed">
                    Oil futures require physical delivery at Cushing, Oklahoma. In April 2020, global lockdowns killed demand, and Cushing storage hit 100% capacity.
                    Long holders (ETFs, speculators) had <strong>no place to put the oil</strong>. They had to PAY buyers to take the contracts off their hands to avoid breaching delivery contracts.
                  </p>
                </div>
                <div className="md:w-1/3 bg-rose-50 p-6 rounded-xl border border-rose-100 shadow-sm">
                  <h4 className="font-bold text-rose-800 text-sm uppercase mb-3 border-b border-rose-200 pb-2">The Lesson</h4>
                  <p className="text-sm text-rose-900 leading-relaxed">
                    Commodity prices have a "soft floor" (storage costs) and a "hard floor" (zero). But when storage is full, the floor disappears. Prices can theoretically go to negative infinity.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 group hover:border-rose-300 transition-colors">
                  <h4 className="font-bold text-lg text-slate-800 mb-2 flex items-center gap-2">
                    <Droplet size={18} className="text-slate-400"/> Waha Gas Hub
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Natural gas in West Texas is a byproduct of oil drilling. If pipelines break, gas is stranded. Producers will pay -$5.00/MMBtu just to get rid of it (flaring is regulated) so they can keep pumping the profitable oil.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 group hover:border-rose-300 transition-colors">
                  <h4 className="font-bold text-lg text-slate-800 mb-2 flex items-center gap-2">
                    <Zap size={18} className="text-slate-400"/> Negative Electricity
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Wind farms get tax credits (PTC) for generating. If the credit is $25/MWh, they will happily sell power at -$10/MWh because they still net $15 profit. This forces baseload nuclear/coal plants to pay to stay online.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 6: SOFTS & AG --- */}
          <section>
            <SectionHeader 
              icon={Coffee} 
              title="Agricultural Specials" 
              subtitle="Quality discounts and the 'Lemon' problem."
              colorClass={colors.softs}
            />
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-amber-300 opacity-20">
                  <Anchor size={80} />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">The Vomitoxin Discount</h3>
                <p className="text-amber-900/80 mb-4 text-sm">
                  In grain markets, futures specs allow for delivery of lower quality grain at a discount. In a bad crop year, only "dirty" wheat (high vomitoxin levels) is available for delivery.
                </p>
                <ul className="space-y-2 text-xs text-amber-900/90 font-medium">
                  <li className="flex gap-2"><span>•</span> Futures track the "dirty" wheat price (low).</li>
                  <li className="flex gap-2"><span>•</span> Cash market needs "clean" wheat (high price).</li>
                  <li className="flex gap-2"><span>•</span> <strong>Result:</strong> Basis blows out. Hedges fail because the future doesn't protect the value of the clean crop.</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-amber-300 opacity-20">
                  <Coffee size={80} />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Coffee "C" Differentials</h3>
                <p className="text-amber-900/80 mb-4 text-sm">
                  The ICE contract allows delivery from 20 countries. Traders will always deliver the cheapest origin allowed (e.g., Honduras vs Colombia).
                </p>
                <div className="bg-white/60 p-3 rounded-lg text-xs text-amber-900">
                  <strong>The "Switch":</strong> If exchange differentials don't match real-world prices, certified stocks flood with the "cheapest" beans, dragging the futures price down relative to premium beans used by Starbucks.
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 7: MICROSTRUCTURE --- */}
          <section>
            <SectionHeader 
              icon={Activity} 
              title="Market Microstructure" 
              subtitle="Gamma squeezes, LME Queues, and Hidden Risks."
              colorClass={colors.micro}
            />
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white shadow-md rounded-xl border-t-4 border-violet-500 hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-slate-800 mb-3 text-lg">Gamma Squeeze</h4>
                <div className="text-xs font-mono text-violet-600 bg-violet-50 inline-block px-2 py-1 rounded mb-3">Feedback Loop</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  When dealers sell Out-of-the-Money (OTM) calls, they are short gamma. As price rises, they must buy futures to hedge. This buying drives price higher, forcing them to buy MORE. This creates an explosive vertical move.
                </p>
              </div>
              
              <div className="p-6 bg-white shadow-md rounded-xl border-t-4 border-violet-500 hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-slate-800 mb-3 text-lg">LME Warehouses</h4>
                <div className="text-xs font-mono text-violet-600 bg-violet-50 inline-block px-2 py-1 rounded mb-3">Rent Seeking</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Warehouses (often owned by banks/traders) intentionally create queues to slow down metal load-out. This generates rent revenue. It disconnects the LME price from the actual physical premium paid for immediate metal.
                </p>
              </div>
              
              <div className="p-6 bg-white shadow-md rounded-xl border-t-4 border-violet-500 hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-slate-800 mb-3 text-lg">Stop Hunts</h4>
                <div className="text-xs font-mono text-violet-600 bg-violet-50 inline-block px-2 py-1 rounded mb-3">Liquidity Holes</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  In thin markets (Asian session for US Treasuries), algos may push prices into known areas of liquidity (stop losses) to trigger volume. Once the stops are cleared, price often reverses immediately.
                </p>
              </div>
            </div>
          </section>

          {/* --- FOOTER / GLOSSARY --- */}
          <footer className="mt-20 border-t border-slate-200 pt-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Specials Glossary & Risk Matrix</h2>
            
            <div className="overflow-x-auto shadow-xl rounded-lg border border-slate-200">
              <table className="w-full text-left bg-white">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-4 border-b">Category</th>
                    <th className="p-4 border-b">Special Name</th>
                    <th className="p-4 border-b">Key Metric</th>
                    <th className="p-4 border-b">Danger Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                  <tr className="hover:bg-indigo-50 transition-colors">
                    <td className="p-4 font-bold text-emerald-600">Treasury</td>
                    <td className="p-4">Repo Special</td>
                    <td className="p-4 font-mono text-xs">Repo Rate &lt; GC</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold shadow-sm">High</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-indigo-50 transition-colors">
                    <td className="p-4 font-bold text-rose-500">Energy</td>
                    <td className="p-4">Negative Pricing</td>
                    <td className="p-4 font-mono text-xs">Storage Capacity %</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold shadow-sm">Critical</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-indigo-50 transition-colors">
                    <td className="p-4 font-bold text-amber-500">Agriculture</td>
                    <td className="p-4">Vomitoxin / Quality</td>
                    <td className="p-4 font-mono text-xs">Quality Spread</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold shadow-sm">Medium</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-indigo-50 transition-colors">
                    <td className="p-4 font-bold text-violet-500">Micro</td>
                    <td className="p-4">Gamma Squeeze</td>
                    <td className="p-4 font-mono text-xs">OTM Open Interest</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold shadow-sm">Volatile</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-indigo-50 transition-colors">
                    <td className="p-4 font-bold text-red-600">Nat Gas</td>
                    <td className="p-4">Widowmaker</td>
                    <td className="p-4 font-mono text-xs">March/April Spread</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold shadow-sm">Extreme</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="text-center mt-12 mb-8">
              <p className="text-slate-400 text-sm italic">Disclaimer: This interface is for educational purposes only. Futures trading involves substantial risk of loss.</p>
            </div>
          </footer>

          {/* Call-to-Action Section with Google Doc Link */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle.googleDoc && (
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
        <footer className="bg-slate-900 text-slate-300 py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}