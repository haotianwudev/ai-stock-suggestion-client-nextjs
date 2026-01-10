'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PieChart, TrendingUp, Activity, Target, Search, BarChart2, BookOpen, ArrowRight, Shield, Layers, CheckCircle, HelpCircle, AlertTriangle, Briefcase, Zap, RefreshCw, Scale, TrendingDown, DollarSign, Clock, Umbrella, Anchor, Globe, Cpu, BarChart, Thermometer, Calculator, Info, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Components ---
const SectionHeading = ({ children, icon: Icon, color = "text-indigo-600", bg = "bg-indigo-50" }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-4 rounded-2xl shadow-sm border border-slate-100 ${color} ${bg}`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{children}</h2>
  </div>
);

const Card = ({ title, children, className = "", icon: Icon }) => (
  <div className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="text-indigo-500" size={24} />}
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed space-y-4">{children}</div>
  </div>
);

const AssetClassCard = ({ title, role, risk, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full hover:border-indigo-300 transition-colors">
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
      <Icon size={20} className="text-white" />
    </div>
    <h4 className="font-bold text-lg text-slate-800 mb-2">{title}</h4>
    <div className="space-y-2 text-sm text-slate-600 flex-grow">
      <p><strong className="text-slate-800">Role:</strong> {role}</p>
      <p><strong className="text-slate-800">Risk Profile:</strong> {risk}</p>
    </div>
  </div>
);

const FactorCard = ({ title, desc, icon: Icon }) => (
  <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-100">
    <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600 shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <h5 className="font-bold text-slate-800 text-sm mb-1">{title}</h5>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const SignalCard = ({ title, status, desc, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-orange-300 transition-all">
    <div className={`absolute top-0 right-0 p-2 text-xs font-bold uppercase tracking-wider rounded-bl-lg ${status === 'Bullish' ? 'bg-green-100 text-green-700' : status === 'Bearish' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
      {status}
    </div>
    <div className={`mb-3 ${color}`}>
      <Icon size={24} />
    </div>
    <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const MetricBox = ({ label, formula, description, color }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 border ${color} bg-opacity-50 transition-transform hover:-translate-y-1`}>
    <div className="relative z-10">
      <h4 className="font-bold text-slate-800 mb-3 text-lg">{label}</h4>
      <code className="block bg-white/90 p-3 rounded-lg text-sm font-mono text-slate-700 mb-4 border border-slate-200 shadow-sm">
        {formula}
      </code>
      <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
    </div>
  </div>
);

const ComparisonRow = ({ label, saa, taa, highlight = false }) => (
  <div className={`grid grid-cols-1 md:grid-cols-3 border-b border-slate-100 last:border-0 py-5 px-6 hover:bg-slate-50 transition-colors ${highlight ? 'bg-indigo-50/50' : ''}`}>
    <div className="font-bold text-slate-700 flex items-center">{label}</div>
    <div className="text-slate-600 md:px-4 py-2 md:py-0 leading-relaxed">{saa}</div>
    <div className="text-indigo-600 font-medium md:px-4 py-2 md:py-0 leading-relaxed">{taa}</div>
  </div>
);

const ExpandedCard = ({ title, children }) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 shadow-sm bg-white">
      <div className="w-full flex items-center justify-between p-5 bg-white border-b border-slate-100 text-left">
        <span className="font-bold text-lg text-slate-800">{title}</span>
      </div>
      <div className="p-6 bg-slate-50 text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
};

// --- Updated Risk Profile Component ---
const RiskProfile = ({ type, stocks, bonds, cash, desc, horizon, colorTheme }) => {
  // Theme configuration
  const themes = {
    conservative: {
      border: "border-emerald-200",
      hover: "hover:border-emerald-400",
      bgHeader: "bg-emerald-50",
      textHeader: "text-emerald-900",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      stockColor: "text-emerald-500",
      barColor: "bg-emerald-500",
      icon: Shield
    },
    balanced: {
      border: "border-indigo-200",
      hover: "hover:border-indigo-400",
      bgHeader: "bg-indigo-50",
      textHeader: "text-indigo-900",
      badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
      stockColor: "text-indigo-600",
      barColor: "bg-indigo-600",
      icon: Scale
    },
    aggressive: {
      border: "border-rose-200",
      hover: "hover:border-rose-400",
      bgHeader: "bg-rose-50",
      textHeader: "text-rose-900",
      badge: "bg-rose-100 text-rose-800 border-rose-200",
      stockColor: "text-rose-500",
      barColor: "bg-rose-500",
      icon: TrendingUp
    }
  };

  const theme = themes[colorTheme] || themes.balanced;
  const ProfileIcon = theme.icon;

  return (
    <div className={`flex flex-col bg-white rounded-2xl border-2 ${theme.border} shadow-sm transition-all duration-300 ${theme.hover} hover:shadow-xl overflow-hidden group`}>
      {/* Header */}
      <div className={`p-5 ${theme.bgHeader} border-b ${theme.border} flex flex-col items-center text-center relative`}>
        <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
          <ProfileIcon size={24} className={theme.stockColor} />
        </div>
        <h4 className={`font-extrabold text-xl ${theme.textHeader} mb-1`}>{type}</h4>
        <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${theme.badge}`}>
          <Clock size={12} /> {horizon}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col items-center flex-grow">
        {/* Donut Chart */}
        <div className="relative w-40 h-40 mb-6 group-hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-sm">
            <path
              className="text-slate-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            {/* Stock Slice */}
            <path
              className={theme.stockColor}
              strokeDasharray={`${stocks}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-extrabold ${theme.stockColor}`}>
              {stocks}<span className="text-lg">%</span>
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stocks</span>
          </div>
        </div>

        {/* Asset List */}
        <div className="w-full space-y-2 mb-6">
          <div className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${theme.barColor}`}></div>
              <span className="font-bold text-slate-700">Equities</span>
            </div>
            <span className="font-mono font-bold text-slate-600">{stocks}%</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400"></div>
              <span className="font-bold text-slate-700">Bonds</span>
            </div>
            <span className="font-mono font-bold text-slate-600">{bonds}%</span>
          </div>
          {cash > 0 && (
            <div className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <span className="font-bold text-slate-700">Cash</span>
              </div>
              <span className="font-mono font-bold text-slate-600">{cash}%</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-auto pt-4 border-t border-slate-100 w-full text-center">
          <p className="text-sm text-slate-500 italic leading-relaxed">"{desc}"</p>
        </div>
      </div>
    </div>
  );
};

// --- Attribution Calculator Component ---
const AttributionCalculator = () => {
  const [wb, setWb] = useState(20); // Benchmark Weight
  const [wp, setWp] = useState(30); // Portfolio Weight
  const [rb, setRb] = useState(10); // Benchmark Return
  const [rp, setRp] = useState(12); // Portfolio Return
  const [RB, setRB] = useState(5);  // Total Benchmark Return (Overall Market)

  // Calculations
  // Allocation = (wp - wb) * (rb - RB)
  const allocation = ((wp/100 - wb/100) * (rb/100 - RB/100));
  // Selection = wb * (rp - rb)
  const selection = ((wb/100) * (rp/100 - rb/100));
  // Interaction = (wp - wb) * (rp - rb)
  const interaction = ((wp/100 - wb/100) * (rp/100 - rb/100));
  const total = allocation + selection + interaction;

  const toPercent = (num) => (num * 100).toFixed(2) + "%";
  const toClass = (num) => num > 0 ? "text-green-600" : num < 0 ? "text-red-600" : "text-slate-600";

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Calculator size={20} />
          Interactive Attribution Lab
        </h3>
        <span className="text-xs bg-indigo-500 px-3 py-1 rounded-full uppercase tracking-wider font-bold">Single Sector Model</span>
      </div>
      <div className="p-8 grid md:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-6">
          <h4 className="font-bold text-slate-700 border-b pb-2 mb-4">1. Scenario Inputs</h4>
          
          {/* Weights */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium text-slate-600">
              <label>Benchmark Weight in Sector</label>
              <span>{wb}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={wb} 
              onChange={(e) => setWb(Number(e.target.value))} 
              className="w-full accent-indigo-600" 
            />
            
            <div className="flex justify-between text-sm font-medium text-slate-600">
              <label className="text-orange-600">Portfolio Weight (Your Bet)</label>
              <span className="text-orange-600">{wp}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={wp} 
              onChange={(e) => setWp(Number(e.target.value))} 
              className="w-full accent-orange-600" 
            />
          </div>
          
          <div className="h-px bg-slate-100 my-4"></div>
          
          {/* Returns */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium text-slate-600">
              <label>Sector Benchmark Return</label>
              <span>{rb}%</span>
            </div>
            <input 
              type="range" 
              min="-10" 
              max="30" 
              value={rb} 
              onChange={(e) => setRb(Number(e.target.value))} 
              className="w-full accent-indigo-600" 
            />
            
            <div className="flex justify-between text-sm font-medium text-slate-600">
              <label className="text-orange-600">Your Stock Picks Return</label>
              <span className="text-orange-600">{rp}%</span>
            </div>
            <input 
              type="range" 
              min="-10" 
              max="30" 
              value={rp} 
              onChange={(e) => setRp(Number(e.target.value))} 
              className="w-full accent-orange-600" 
            />
            
            <div className="flex justify-between text-sm font-medium text-slate-400 mt-4">
              <label>Total Market Return (Reference)</label>
              <span>{RB}%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center">
          <h4 className="font-bold text-slate-700 border-b pb-2 mb-6">2. Attribution Breakdown</h4>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Allocation Effect</div>
                <div className="text-xs text-slate-400">Did you weight the sector correctly?</div>
              </div>
              <div className={`text-2xl font-bold font-mono ${toClass(allocation)}`}>{toPercent(allocation)}</div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Selection Effect</div>
                <div className="text-xs text-slate-400">Did you pick the right stocks?</div>
              </div>
              <div className={`text-2xl font-bold font-mono ${toClass(selection)}`}>{toPercent(selection)}</div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-center opacity-70">
              <div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Interaction</div>
                <div className="text-xs text-slate-400">Combined effect</div>
              </div>
              <div className={`text-xl font-bold font-mono ${toClass(interaction)}`}>{toPercent(interaction)}</div>
            </div>
            
            <div className="mt-4 pt-4 border-t-2 border-slate-100 flex justify-between items-center">
              <div className="font-bold text-slate-800">Total Excess Return</div>
              <div className={`text-3xl font-extrabold font-mono ${toClass(total)}`}>{toPercent(total)}</div>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-slate-400 italic">
            *Based on Brinson-Fachler Model. Note how Allocation Effect changes if the Sector Return ({rb}%) is higher/lower than the Total Market Return ({RB}%).
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StrategicTacticalAssetAllocation() {
  const currentArticle = articles.find(article => article.slug === 'strategic-tactical-asset-allocation-comprehensive-guide');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative bg-white overflow-hidden border-b border-slate-200">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50 to-transparent"></div>
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold mb-8 uppercase tracking-wider">
              <BookOpen size={16} />
              <span>Investment Management 101</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              Strategic vs. Tactical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Asset Allocation</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-12">
              A deep-dive tutorial for investors. Learn how to build a portfolio baseline, when to deviate for profit, and how to use math to hold managers accountable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-indigo-500">
                <div className="text-indigo-600 font-bold mb-1 flex items-center gap-2">
                  <Target size={18}/> Strategic (SAA)
                </div>
                <div className="text-sm text-slate-500">The long-term policy mix designed for your risk tolerance.</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-orange-500">
                <div className="text-orange-600 font-bold mb-1 flex items-center gap-2">
                  <Activity size={18}/> Tactical (TAA)
                </div>
                <div className="text-sm text-slate-500">Active shifts to exploit short-term market inefficiencies.</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
                <div className="text-blue-600 font-bold mb-1 flex items-center gap-2">
                  <Search size={18}/> Attribution
                </div>
                <div className="text-sm text-slate-500">Mathematical analysis of where returns actually came from.</div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/MhIheV4.jpeg" 
              alt="Strategic vs Tactical Asset Allocation Infographic" 
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
          src="https://i.imgur.com/MhIheV4.jpeg"
          alt="Strategic vs Tactical Asset Allocation Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-5xl mx-auto px-6 py-16 space-y-32">
          {/* Section 1: Strategic Asset Allocation */}
          <section>
            <SectionHeading icon={Target} color="text-indigo-600" bg="bg-indigo-50">
              Strategic Asset Allocation (SAA)
            </SectionHeading>
            <div className="prose prose-lg text-slate-600 mb-10 max-w-none">
              <p className="text-xl leading-relaxed">
                Strategic Asset Allocation is the "Anchor" of your investment strategy. It is the process of combining asset classes (stocks, bonds, cash, alternatives) in specific proportions to achieve the highest possible return for a given level of risk. This concept roots itself in <strong>Modern Portfolio Theory (MPT)</strong>.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Layers size={24} className="text-indigo-500"/>
                The Building Blocks
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <AssetClassCard 
                  title="Equities (Stocks)" 
                  role="Capital Appreciation (Growth)" 
                  risk="High Volatility" 
                  icon={TrendingUp}
                  color="bg-indigo-500"
                />
                <AssetClassCard 
                  title="Fixed Income (Bonds)" 
                  role="Income Generation & Capital Preservation" 
                  risk="Low to Moderate" 
                  icon={Shield}
                  color="bg-emerald-500"
                />
                <AssetClassCard 
                  title="Alternatives" 
                  role="Diversification & Inflation Hedge (Real Estate, Gold)" 
                  risk="Varied / Illiquid" 
                  icon={Umbrella}
                  color="bg-purple-500"
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-12">
              <h3 className="text-xl font-bold text-slate-800 mb-6">What determines your strategy?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FactorCard 
                  title="Time Horizon" 
                  desc="The longer you have (10, 20, 30 years), the more risk you can afford to take, as you have time to recover from market dips."
                  icon={Clock}
                />
                <FactorCard 
                  title="Risk Tolerance" 
                  desc="A combination of your financial ability to lose money (Capacity) and your psychological willingness to endure volatility (Attitude)."
                  icon={AlertTriangle}
                />
                <FactorCard 
                  title="Liquidity Needs" 
                  desc="Do you need cash to buy a house in 2 years? If so, that money should not be in stocks, regardless of your long-term goal."
                  icon={DollarSign}
                />
                <FactorCard 
                  title="Tax Situation" 
                  desc="High-income earners may prefer tax-free municipal bonds in their SAA, whereas retirees might prefer dividend stocks."
                  icon={Briefcase}
                />
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Scale size={24} className="text-indigo-500"/>
                Standard SAA Risk Profiles
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <RiskProfile 
                  type="Conservative" 
                  colorTheme="conservative"
                  horizon="Short (< 3 Years)"
                  stocks={20} 
                  bonds={60} 
                  cash={20} 
                  desc="Focus: Preservation. Ideal for retirees or investors with short time horizons who cannot afford to lose principal." 
                />
                <RiskProfile 
                  type="Balanced" 
                  colorTheme="balanced"
                  horizon="Medium (3-10 Years)"
                  stocks={60} 
                  bonds={40} 
                  cash={0} 
                  desc="Focus: Growth & Income. The classic '60/40' portfolio. Captures equity growth while using bonds to dampen volatility." 
                />
                <RiskProfile 
                  type="Aggressive" 
                  colorTheme="aggressive"
                  horizon="Long (15+ Years)"
                  stocks={90} 
                  bonds={10} 
                  cash={0} 
                  desc="Focus: Max Growth. Ideal for young investors who can weather significant market swings for higher long-term rewards." 
                />
              </div>
            </div>

            <ExpandedCard title="Tutorial: The Magic of Rebalancing">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 text-indigo-600">Why it feels wrong</h4>
                  <p className="text-sm mb-4">Rebalancing requires you to sell assets that are doing well (winners) and buy assets that are struggling (losers). Psychologically, this is painful.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 text-indigo-600">Why it works</h4>
                  <p className="text-sm mb-4">It forces a "Buy Low, Sell High" discipline. If Stocks grow to 70% of your portfolio (target 60%), you lock in those profits by selling, and buy cheap bonds to return to baseline.</p>
                </div>
              </div>
            </ExpandedCard>
          </section>

          {/* Section 2: Tactical Asset Allocation */}
          <section>
            <SectionHeading icon={Activity} color="text-orange-600" bg="bg-orange-50">
              Tactical Asset Allocation (TAA)
            </SectionHeading>
            <div className="prose prose-lg text-slate-600 mb-10 max-w-none">
              <p className="text-xl leading-relaxed">
                While SAA is the anchor, TAA is the <strong>engine of active management</strong>. It involves deliberately deviating from the long-term policy weights to exploit perceived imbalances in the market. The goal is simple: Generate "Alpha" (excess returns).
              </p>
            </div>

            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Zap size={24} className="text-orange-500"/>
                  The TAA Decision Engine
                </h3>
                <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase tracking-wide">Live Signal Examples</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SignalCard 
                  title="Valuation" 
                  status="Bullish" 
                  desc="P/E ratios are below 10-year average. Stocks look cheap."
                  icon={DollarSign}
                  color="text-green-600"
                />
                <SignalCard 
                  title="Momentum" 
                  status="Neutral" 
                  desc="Prices are flat relative to the 200-day moving average."
                  icon={TrendingUp}
                  color="text-slate-400"
                />
                <SignalCard 
                  title="Macro Econ" 
                  status="Bearish" 
                  desc="Yield curve inversion suggests upcoming recession."
                  icon={Globe}
                  color="text-red-500"
                />
                <SignalCard 
                  title="Sentiment" 
                  status="Contrarian" 
                  desc="VIX is extremely high. Fear is rampant. Time to buy?"
                  icon={Thermometer}
                  color="text-purple-500"
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20"></div>
              <h3 className="text-2xl font-bold mb-8 relative z-10">Approaches to Tactical Execution</h3>
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4 text-orange-400">
                    <Cpu size={24} />
                    <h4 className="font-bold text-lg">Systematic TAA (Quant)</h4>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">Relies on mathematical models and algorithms. Removes human emotion.</p>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>• "If Trend {'>'} 0, Buy. Else, Sell."</li>
                    <li>• Rules-based rebalancing</li>
                    <li>• Consistent but rigid</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4 text-orange-400">
                    <Briefcase size={24} />
                    <h4 className="font-bold text-lg">Discretionary TAA</h4>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">Relies on the portfolio manager's judgment, experience, and qualitative views.</p>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>• "I think the Fed is bluffing."</li>
                    <li>• Flexible adaptation to news</li>
                    <li>• Subject to behavioral bias</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="text-orange-500" size={24} />
                <h3 className="text-xl font-bold text-slate-800">Strategy Focus: Sector Rotation</h3>
              </div>
              <p className="text-slate-600 mb-8">One common TAA strategy involves shifting between business sectors based on the economic cycle.</p>
              <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full hidden md:block"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center relative hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold uppercase text-green-600 mb-1">Early Cycle</div>
                    <div className="font-bold text-slate-800 mb-2">Recovery</div>
                    <div className="text-xs text-slate-500">Overweight: <br/>Financials, Consumer Discretionary</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-2 h-2 bg-green-500 rounded-full md:block hidden"></div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center relative hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold uppercase text-blue-600 mb-1">Mid Cycle</div>
                    <div className="font-bold text-slate-800 mb-2">Peak Growth</div>
                    <div className="text-xs text-slate-500">Overweight: <br/>Technology, Industrials</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-2 h-2 bg-blue-500 rounded-full md:block hidden"></div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center relative hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold uppercase text-orange-600 mb-1">Late Cycle</div>
                    <div className="font-bold text-slate-800 mb-2">Slowdown</div>
                    <div className="text-xs text-slate-500">Overweight: <br/>Energy, Materials</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-2 h-2 bg-orange-500 rounded-full md:block hidden"></div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center relative hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold uppercase text-red-600 mb-1">Recession</div>
                    <div className="font-bold text-slate-800 mb-2">Contraction</div>
                    <div className="text-xs text-slate-500">Overweight: <br/>Utilities, Consumer Staples</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-2 h-2 bg-red-500 rounded-full md:block hidden"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <ExpandedCard title="Concept: Core-Satellite Approach">
                <p className="mb-4">This is a hybrid strategy used by many modern portfolios. </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Core (70-80%):</strong> Passive SAA (Index Funds/ETFs). Low cost, follows the market.</li>
                  <li><strong>Satellite (20-30%):</strong> Active TAA. High conviction bets, individual stocks, or sector-specific funds to boost returns.</li>
                </ul>
              </ExpandedCard>
              <ExpandedCard title="Concept: Tactical vs. Market Timing">
                <p className="mb-4">They sound similar but differ in magnitude.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>TAA:</strong> Disciplined. "I am shifting equities from 60% to 65% because valuations are good."</li>
                  <li><strong>Market Timing:</strong> Binary/Extreme. "I am selling EVERYTHING because I think a crash is coming." TAA is rarely "all in" or "all out".</li>
                </ul>
              </ExpandedCard>
            </div>
          </section>

          {/* Section 3: Performance Attribution (EXPANDED) */}
          <section>
            <SectionHeading icon={BarChart2} color="text-blue-600" bg="bg-blue-50">
              Performance Attribution Analysis
            </SectionHeading>
            <p className="text-lg text-slate-700 mb-8 max-w-4xl leading-relaxed">
              This is the "Report Card" of investment management. Attribution analysis mathematically separates the "Alpha" (Excess Return) into distinct components, allowing us to judge <strong>skill vs. luck</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <MetricBox 
                label="1. Allocation Effect" 
                formula="(Wp - Wb) × (Rb_sector - Rb_total)"
                description="Did we overweight the right sectors? If you held more of a sector that beat the market, this is positive."
                color="border-blue-200 bg-blue-50"
              />
              <MetricBox 
                label="2. Selection Effect" 
                formula="Wb × (Rp_sector - Rb_sector)"
                description="Did we pick the best stocks within the sector? Measures pure stock-picking skill."
                color="border-purple-200 bg-purple-50"
              />
              <MetricBox 
                label="3. Interaction" 
                formula="(Wp - Wb) × (Rp_sector - Rb_sector)"
                description="The compound effect. Did we overweight a sector AND pick stocks that outperformed in it?"
                color="border-indigo-200 bg-indigo-50"
              />
            </div>

            {/* Interactive Calculator */}
            <div className="mb-16">
              <AttributionCalculator />
            </div>

            {/* New Subsection: Interpretation Guide */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Search size={24} className="text-blue-500"/>
                Interpreting the Results: Manager Types
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="flex justify-between mb-4">
                    <h4 className="font-bold text-slate-800">The "Macro Strategist"</h4>
                    <div className="flex gap-2 text-xs font-bold">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Alloc +</span>
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Select -</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">This manager is great at reading the economy (e.g., "Overweight Tech"), but poor at picking individual stocks.</p>
                  <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                    <strong>Advice:</strong> Use this manager for TAA overlay or buy their ETF, but maybe don't trust them with single stock picks.
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="flex justify-between mb-4">
                    <h4 className="font-bold text-slate-800">The "Stock Picker"</h4>
                    <div className="flex gap-2 text-xs font-bold">
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Alloc -</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Select +</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">This manager is terrible at market timing but consistently finds undervalued companies that beat their peers.</p>
                  <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                    <strong>Advice:</strong> Restrict their mandate to "Sector Neutral" (keep weights equal to benchmark) to let their selection skill shine.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-12">
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800 text-xl">Top-Down vs. Bottom-Up Attribution</h3>
              </div>
              <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-1 bg-slate-200"></div>
                  <div className="space-y-6 pl-10">
                    <div className="relative">
                      <div className="absolute -left-[2.7rem] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                      <h4 className="font-bold text-slate-800">Top-Down</h4>
                      <p className="text-sm text-slate-600">Start with Allocation Effect. Did the manager get the asset class decision right?</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[2.7rem] top-1 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                      <h4 className="font-bold text-slate-800">Bottom-Up</h4>
                      <p className="text-sm text-slate-600">Start with Selection Effect. Used for managers who claim to be "stock pickers" first.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl text-sm text-slate-600 leading-relaxed italic border border-slate-100">
                  "Attribution tells you where the return came from, but not if it will persist. A manager with +5% Selection Effect in one quarter might just be lucky. Look for consistency over 3-5 years."
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Implementation & Pitfalls */}
          <section>
            <SectionHeading icon={Scale} color="text-teal-600" bg="bg-teal-50">
              Implementation & Pitfalls
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-8">
              <Card title="How to Implement" icon={Layers}>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">1</div>
                    <div>
                      <h5 className="font-bold text-slate-800">Determine Policy (SAA)</h5>
                      <p className="text-sm text-slate-600">Use ETFs for cheap beta. Example: 60% VTI (Stocks), 40% BND (Bonds).</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">2</div>
                    <div>
                      <h5 className="font-bold text-slate-800">Define Bands</h5>
                      <p className="text-sm text-slate-600">Set strict rules. "I will not hold less than 50% stocks." Write this down in an Investment Policy Statement (IPS).</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">3</div>
                    <div>
                      <h5 className="font-bold text-slate-800">Monitor Attribution</h5>
                      <p className="text-sm text-slate-600">Review annually. If your active TAA bets consistently have negative attribution, stop doing them and stick to SAA.</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card title="Behavioral Pitfalls" icon={AlertTriangle}>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <h5 className="font-bold text-red-800 text-sm">Recency Bias</h5>
                    <p className="text-sm text-red-700 mt-1">Assuming that because Tech stocks went up last year, they will go up this year. This leads to chasing returns.</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <h5 className="font-bold text-orange-800 text-sm">Overconfidence</h5>
                    <p className="text-sm text-orange-700 mt-1">Believing you can time the market better than you actually can. Most TAA fails due to emotion.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <h5 className="font-bold text-yellow-800 text-sm">Style Drift</h5>
                    <p className="text-sm text-yellow-700 mt-1">When a "Safe Bond" manager starts buying risky junk bonds to chase yield, violating the SAA role.</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
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
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full mb-8 text-indigo-400 shadow-sm border border-slate-100">
              <TrendingUp size={32} />
            </div>
            <h3 className="font-bold text-slate-800 text-xl mb-4">Investment Education Series</h3>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed">
              This tutorial is for educational purposes only. Asset allocation does not guarantee profit or protect against loss in declining markets.
            </p>
            <div className="text-sm text-slate-400 font-medium">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}