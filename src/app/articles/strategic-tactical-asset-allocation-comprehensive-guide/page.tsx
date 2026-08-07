'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ArrowLeft, PieChart, TrendingUp, Activity, Target, Search, BarChart2, BookOpen, ArrowRight, Shield, Layers, CheckCircle, HelpCircle, AlertTriangle, Briefcase, Zap, RefreshCw, Scale, TrendingDown, DollarSign, Clock, Umbrella, Anchor, Globe, Cpu, BarChart, Thermometer, Calculator, Info, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- TypeScript Interfaces ---
interface SectionHeadingProps {
  children: React.ReactNode;
  icon: React.ComponentType<{ size?: number }>;
  color?: string;
  bg?: string;
}

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
}

interface AssetClassCardProps {
  title: string;
  role: string;
  risk: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

interface FactorCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface SignalCardProps {
  title: string;
  status: string;
  desc: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
}

interface MetricBoxProps {
  label: string;
  formula: string;
  description: string;
  color: string;
}

interface ComparisonRowProps {
  label: string;
  saa: string;
  taa: string;
  highlight?: boolean;
}

interface ExpandedCardProps {
  title: string;
  children: React.ReactNode;
}

interface RiskProfileProps {
  type: string;
  stocks: number;
  bonds: number;
  cash: number;
  desc: string;
  horizon: string;
  colorTheme: 'conservative' | 'balanced' | 'aggressive';
}

// --- Components ---
const SectionHeading: React.FC<SectionHeadingProps> = ({ children, icon: Icon, color = "text-indigo-600", bg = "bg-indigo-50" }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-4 rounded-2xl shadow-sm border border-slate-100 ${color} ${bg}`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{children}</h2>
  </div>
);

const Card: React.FC<CardProps> = ({ title, children, className = "", icon: Icon }) => (
  <div className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="text-indigo-500" size={24} />}
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed space-y-4">{children}</div>
  </div>
);

const AssetClassCard: React.FC<AssetClassCardProps> = ({ title, role, risk, icon: Icon, color }) => (
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

const FactorCard: React.FC<FactorCardProps> = ({ title, desc, icon: Icon }) => (
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

const SignalCard: React.FC<SignalCardProps> = ({ title, status, desc, icon: Icon, color }) => (
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

const MetricBox: React.FC<MetricBoxProps> = ({ label, formula, description, color }) => (
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

const ComparisonRow: React.FC<ComparisonRowProps> = ({ label, saa, taa, highlight = false }) => (
  <div className={`grid grid-cols-1 md:grid-cols-3 border-b border-slate-100 last:border-0 py-5 px-6 hover:bg-slate-50 transition-colors ${highlight ? 'bg-indigo-50/50' : ''}`}>
    <div className="font-bold text-slate-700 flex items-center">{label}</div>
    <div className="text-slate-600 md:px-4 py-2 md:py-0 leading-relaxed">{saa}</div>
    <div className="text-indigo-600 font-medium md:px-4 py-2 md:py-0 leading-relaxed">{taa}</div>
  </div>
);

const ExpandedCard: React.FC<ExpandedCardProps> = ({ title, children }) => {
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
const RiskProfile: React.FC<RiskProfileProps> = ({ type, stocks, bonds, cash, desc, horizon, colorTheme }) => {
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

  const toPercent = (num: number): string => (num * 100).toFixed(2) + "%";
  const toClass = (num: number): string => num > 0 ? "text-green-600" : num < 0 ? "text-red-600" : "text-slate-600";

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
  return (
    <ArticleFrame slug="strategic-tactical-asset-allocation-comprehensive-guide">
      <div className="max-w-5xl mx-auto font-sans bg-transparent">
        <div className="mt-8 mb-12">
          <InfographicSlot alt="Strategic vs Tactical Asset Allocation Infographic" />
        </div>
        <main className="space-y-32">
          {/* Section 1: Strategic Asset Allocation */}
          <section>
            <SectionHeading icon={Target} color="text-indigo-600" bg="bg-indigo-50">
              Strategic Asset Allocation (SAA)
            </SectionHeading>
            <div className="prose prose-lg text-slate-600 mb-10 max-w-none">
              <p className="text-xl leading-relaxed mb-6">
                Strategic Asset Allocation is the "Anchor" of your investment strategy. It is the process of combining asset classes (stocks, bonds, cash, alternatives) in specific proportions to achieve the highest possible return for a given level of risk. This concept roots itself in <strong>Modern Portfolio Theory (MPT)</strong>.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Think of SAA as your portfolio's <strong>constitutional framework</strong> - it establishes the fundamental rules that govern your investment approach regardless of market conditions. Unlike tactical decisions that change with market cycles, your strategic allocation should remain relatively stable for years, only shifting due to major life changes like retirement, inheritance, or significant changes in risk tolerance.
              </p>
              <p className="text-lg leading-relaxed">
                The power of SAA lies in its ability to harness <strong>diversification benefits</strong>. When stocks zig, bonds often zag. When domestic markets struggle, international markets may thrive. By combining uncorrelated or negatively correlated assets, you can potentially achieve better risk-adjusted returns than any single asset class alone - the mathematical foundation of Markowitz's Nobel Prize-winning work.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Layers size={24} className="text-indigo-500"/>
                The Building Blocks
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
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
              
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Info size={20} className="text-indigo-500"/>
                  Asset Class Deep Dive
                </h4>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h5 className="font-bold text-indigo-600 mb-2">Equities Breakdown</h5>
                    <ul className="space-y-1 text-slate-600">
                      <li>• <strong>Large Cap:</strong> Stable, dividend-paying (Apple, Microsoft)</li>
                      <li>• <strong>Small Cap:</strong> Higher growth potential, more volatile</li>
                      <li>• <strong>International:</strong> Geographic diversification, currency exposure</li>
                      <li>• <strong>Emerging Markets:</strong> High growth, high risk developing economies</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-emerald-600 mb-2">Fixed Income Spectrum</h5>
                    <ul className="space-y-1 text-slate-600">
                      <li>• <strong>Treasury Bonds:</strong> Government-backed, lowest risk</li>
                      <li>• <strong>Corporate Bonds:</strong> Higher yield, credit risk</li>
                      <li>• <strong>Municipal Bonds:</strong> Tax advantages for high earners</li>
                      <li>• <strong>TIPS:</strong> Inflation-protected Treasury securities</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-purple-600 mb-2">Alternative Assets</h5>
                    <ul className="space-y-1 text-slate-600">
                      <li>• <strong>REITs:</strong> Real estate exposure, high dividends</li>
                      <li>• <strong>Commodities:</strong> Gold, oil, agricultural products</li>
                      <li>• <strong>Private Equity:</strong> Illiquid, institutional access</li>
                      <li>• <strong>Hedge Funds:</strong> Alternative strategies, high fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-12">
              <h3 className="text-xl font-bold text-slate-800 mb-6">What determines your strategy?</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <FactorCard 
                  title="Time Horizon" 
                  desc="The longer you have (10, 20, 30 years), the more risk you can afford to take, as you have time to recover from market dips. Young investors can weather 2008-style crashes and benefit from dollar-cost averaging during recovery."
                  icon={Clock}
                />
                <FactorCard 
                  title="Risk Tolerance" 
                  desc="A combination of your financial ability to lose money (Capacity) and your psychological willingness to endure volatility (Attitude). Can you sleep at night if your portfolio drops 30%?"
                  icon={AlertTriangle}
                />
                <FactorCard 
                  title="Liquidity Needs" 
                  desc="Do you need cash to buy a house in 2 years? Emergency fund for 6 months expenses? If so, that money should not be in stocks, regardless of your long-term goal. Keep 3-6 months in high-yield savings."
                  icon={DollarSign}
                />
                <FactorCard 
                  title="Tax Situation" 
                  desc="High-income earners may prefer tax-free municipal bonds in their SAA, whereas retirees might prefer dividend stocks. Consider tax-advantaged accounts (401k, IRA, Roth IRA) for optimal asset location."
                  icon={Briefcase}
                />
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4">The SAA Decision Framework</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h5 className="font-bold text-indigo-600 mb-3">Step 1: Risk Assessment</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Age-based rule:</span>
                        <span className="font-mono">Stock % = 100 - Age</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modern rule:</span>
                        <span className="font-mono">Stock % = 120 - Age</span>
                      </div>
                      <p className="text-slate-500 text-xs mt-2">These are starting points, not rigid rules. A 30-year-old might hold 70-90% stocks depending on risk tolerance.</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-emerald-600 mb-3">Step 2: Goal Alignment</h5>
                    <ul className="space-y-1 text-slate-600">
                      <li>• <strong>Retirement (20+ years):</strong> Growth-focused, high equity</li>
                      <li>• <strong>House Down Payment (2-5 years):</strong> Conservative, bonds/CDs</li>
                      <li>• <strong>Education (10-15 years):</strong> Balanced approach</li>
                      <li>• <strong>Wealth Preservation:</strong> Income-focused, lower volatility</li>
                    </ul>
                  </div>
                </div>
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
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 text-indigo-600">Why it feels wrong</h4>
                  <p className="text-sm mb-4">Rebalancing requires you to sell assets that are doing well (winners) and buy assets that are struggling (losers). Psychologically, this is painful - it goes against our natural tendency to chase performance.</p>
                  <p className="text-sm text-slate-500">Example: Your stocks grew from 60% to 75% of your portfolio. Rebalancing means selling some of those gains to buy more bonds.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 text-indigo-600">Why it works</h4>
                  <p className="text-sm mb-4">It forces a "Buy Low, Sell High" discipline. If Stocks grow to 70% of your portfolio (target 60%), you lock in those profits by selling, and buy cheap bonds to return to baseline.</p>
                  <p className="text-sm text-slate-500">Historical data shows rebalanced portfolios often outperform "buy and hold" strategies over long periods due to this systematic profit-taking.</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-3">Rebalancing Strategies</h5>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="font-bold text-indigo-600 mb-1">Calendar-Based</h6>
                    <p className="text-slate-600">Rebalance quarterly or annually regardless of market conditions. Simple but may miss opportunities.</p>
                  </div>
                  <div>
                    <h6 className="font-bold text-emerald-600 mb-1">Threshold-Based</h6>
                    <p className="text-slate-600">Rebalance when any asset class deviates by 5-10% from target. More responsive to market movements.</p>
                  </div>
                  <div>
                    <h6 className="font-bold text-purple-600 mb-1">Hybrid Approach</h6>
                    <p className="text-slate-600">Check quarterly, rebalance only if thresholds are breached. Balances simplicity with responsiveness.</p>
                  </div>
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
              <p className="text-xl leading-relaxed mb-6">
                While SAA is the anchor, TAA is the <strong>engine of active management</strong>. It involves deliberately deviating from the long-term policy weights to exploit perceived imbalances in the market. The goal is simple: Generate "Alpha" (excess returns).
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Think of TAA as your portfolio's <strong>tactical overlay</strong> - short to medium-term adjustments (typically 6-18 months) based on changing market conditions, economic cycles, or valuation opportunities. Unlike SAA which might remain unchanged for years, TAA positions are dynamic and require active monitoring.
              </p>
              <p className="text-lg leading-relaxed">
                The key distinction: SAA asks "What should I own for the next 20 years?" while TAA asks "What should I overweight for the next 6-12 months?" Successful TAA requires both analytical skill and emotional discipline - the ability to act contrarian when markets are euphoric or panicked.
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <SignalCard 
                  title="Valuation" 
                  status="Bullish" 
                  desc="P/E ratios are below 10-year average. Stocks look cheap relative to historical norms."
                  icon={DollarSign}
                  color="text-green-600"
                />
                <SignalCard 
                  title="Technical" 
                  status="Neutral" 
                  desc="Prices are flat relative to the 200-day moving average. No clear trend direction."
                  icon={TrendingUp}
                  color="text-slate-400"
                />
                <SignalCard 
                  title="Macro Econ" 
                  status="Bearish" 
                  desc="Yield curve inversion suggests upcoming recession. Historical recession indicator."
                  icon={Globe}
                  color="text-red-500"
                />
                <SignalCard 
                  title="Sentiment" 
                  status="Contrarian" 
                  desc="VIX is extremely high. Fear is rampant. Time to buy when others are selling?"
                  icon={Thermometer}
                  color="text-purple-500"
                />
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BarChart size={20} className="text-orange-500"/>
                  TAA Signal Categories Explained
                </h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h5 className="font-bold text-green-600 mb-3">Fundamental Signals</h5>
                    <ul className="space-y-2 text-slate-600">
                      <li>• <strong>Valuation Metrics:</strong> P/E, P/B, CAPE ratios vs. historical averages</li>
                      <li>• <strong>Economic Indicators:</strong> GDP growth, inflation, employment data</li>
                      <li>• <strong>Earnings Trends:</strong> Forward earnings estimates, revision trends</li>
                      <li>• <strong>Credit Spreads:</strong> Corporate bond spreads indicating risk appetite</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-600 mb-3">Technical & Sentiment</h5>
                    <ul className="space-y-2 text-slate-600">
                      <li>• <strong>Momentum:</strong> Price trends, moving averages, relative strength</li>
                      <li>• <strong>Volatility:</strong> VIX levels, realized vs. implied volatility</li>
                      <li>• <strong>Flow Data:</strong> Fund flows, insider buying/selling patterns</li>
                      <li>• <strong>Positioning:</strong> Institutional positioning, margin debt levels</li>
                    </ul>
                  </div>
                </div>
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
              <p className="text-slate-600 mb-8">One common TAA strategy involves shifting between business sectors based on the economic cycle. Different sectors perform better at different stages of economic expansion and contraction.</p>
              <div className="relative mb-8">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full hidden md:block"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center relative hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold uppercase text-green-600 mb-1">Early Cycle</div>
                    <div className="font-bold text-slate-800 mb-2">Recovery</div>
                    <div className="text-xs text-slate-500 mb-3">Overweight: <br/>Financials, Consumer Discretionary</div>
                    <div className="text-xs text-slate-400">Interest rates rising, credit expanding</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-2 h-2 bg-green-500 rounded-full md:block hidden"></div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center relative hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold uppercase text-blue-600 mb-1">Mid Cycle</div>
                    <div className="font-bold text-slate-800 mb-2">Peak Growth</div>
                    <div className="text-xs text-slate-500 mb-3">Overweight: <br/>Technology, Industrials</div>
                    <div className="text-xs text-slate-400">Strong earnings growth, capex spending</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-2 h-2 bg-blue-500 rounded-full md:block hidden"></div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center relative hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold uppercase text-orange-600 mb-1">Late Cycle</div>
                    <div className="font-bold text-slate-800 mb-2">Slowdown</div>
                    <div className="text-xs text-slate-500 mb-3">Overweight: <br/>Energy, Materials</div>
                    <div className="text-xs text-slate-400">Inflation pressures, resource scarcity</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-2 h-2 bg-orange-500 rounded-full md:block hidden"></div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center relative hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold uppercase text-red-600 mb-1">Recession</div>
                    <div className="font-bold text-slate-800 mb-2">Contraction</div>
                    <div className="text-xs text-slate-500 mb-3">Overweight: <br/>Utilities, Consumer Staples</div>
                    <div className="text-xs text-slate-400">Defensive sectors, stable dividends</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-2 h-2 bg-red-500 rounded-full md:block hidden"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-3">Sector Rotation Implementation Tips</h5>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <h6 className="font-bold text-orange-600 mb-2">Leading Indicators</h6>
                    <ul className="space-y-1">
                      <li>• Yield curve shape (normal vs. inverted)</li>
                      <li>• Credit spreads (tight vs. wide)</li>
                      <li>• Leading economic indicators (LEI)</li>
                      <li>• Fed policy stance and guidance</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-bold text-orange-600 mb-2">Execution Considerations</h6>
                    <ul className="space-y-1">
                      <li>• Use sector ETFs for broad exposure</li>
                      <li>• Gradual position sizing (not all-or-nothing)</li>
                      <li>• Monitor relative performance vs. market</li>
                      <li>• Set stop-losses for risk management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <ExpandedCard title="Concept: Core-Satellite Approach">
                <p className="mb-4">This is a hybrid strategy used by many modern portfolios that combines the best of both SAA and TAA approaches.</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>Core (70-80%):</strong> Passive SAA (Index Funds/ETFs). Low cost, follows the market, provides beta exposure.</li>
                  <li><strong>Satellite (20-30%):</strong> Active TAA. High conviction bets, individual stocks, or sector-specific funds to boost returns.</li>
                </ul>
                <div className="bg-slate-50 p-3 rounded-lg text-sm">
                  <strong>Example:</strong> Core = 70% in VTI/VXUS/BND. Satellites = 15% in sector ETFs, 10% in individual stock picks, 5% in alternatives.
                </div>
              </ExpandedCard>
              <ExpandedCard title="Concept: Tactical vs. Market Timing">
                <p className="mb-4">They sound similar but differ significantly in magnitude and approach.</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li><strong>TAA:</strong> Disciplined. "I am shifting equities from 60% to 65% because valuations are attractive." Modest deviations from policy weights.</li>
                  <li><strong>Market Timing:</strong> Binary/Extreme. "I am selling EVERYTHING because I think a crash is coming." TAA is rarely "all in" or "all out".</li>
                </ul>
                <div className="bg-red-50 p-3 rounded-lg text-sm text-red-700">
                  <strong>Warning:</strong> Market timing has a poor track record. Even professional managers struggle to consistently time major market moves.
                </div>
              </ExpandedCard>
            </div>
          </section>

          {/* Section 3: Performance Attribution (EXPANDED) */}
          <section>
            <SectionHeading icon={BarChart2} color="text-blue-600" bg="bg-blue-50">
              Performance Attribution Analysis
            </SectionHeading>
            <p className="text-lg text-slate-700 mb-8 max-w-4xl leading-relaxed">
              This is the "Report Card" of investment management. Attribution analysis mathematically separates the "Alpha" (Excess Return) into distinct components, allowing us to judge <strong>skill vs. luck</strong>. It answers the critical question: "Where did my returns actually come from?"
            </p>
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-8">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Search size={20} className="text-blue-500"/>
                Why Attribution Matters
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target size={20} className="text-blue-600"/>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Accountability</h4>
                  <p className="text-slate-600">Hold managers accountable for their decisions. Did they add value through skill or just get lucky?</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp size={20} className="text-green-600"/>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Process Improvement</h4>
                  <p className="text-slate-600">Identify what's working and what isn't. Focus resources on your strengths.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign size={20} className="text-purple-600"/>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Fee Justification</h4>
                  <p className="text-slate-600">Understand if active management fees are justified by consistent alpha generation.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <MetricBox 
                label="1. Allocation Effect" 
                formula="(Wp - Wb) × (Rb_sector - Rb_total)"
                description="Did we overweight the right sectors? If you held more of a sector that beat the market, this is positive. Measures macro/sector timing skill."
                color="border-blue-200 bg-blue-50"
              />
              <MetricBox 
                label="2. Selection Effect" 
                formula="Wb × (Rp_sector - Rb_sector)"
                description="Did we pick the best stocks within the sector? Measures pure stock-picking skill independent of sector allocation decisions."
                color="border-purple-200 bg-purple-50"
              />
              <MetricBox 
                label="3. Interaction" 
                formula="(Wp - Wb) × (Rp_sector - Rb_sector)"
                description="The compound effect. Did we overweight a sector AND pick stocks that outperformed in it? Can be positive or negative."
                color="border-indigo-200 bg-indigo-50"
              />
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8">
              <h4 className="font-bold text-slate-800 mb-4">Attribution Formula Breakdown</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-bold text-blue-600 mb-3">Variable Definitions</h5>
                  <ul className="space-y-2 text-slate-600">
                    <li>• <strong>Wp:</strong> Portfolio weight in sector (your actual allocation)</li>
                    <li>• <strong>Wb:</strong> Benchmark weight in sector (market cap weight)</li>
                    <li>• <strong>Rp_sector:</strong> Your portfolio return in that sector</li>
                    <li>• <strong>Rb_sector:</strong> Benchmark return for that sector</li>
                    <li>• <strong>Rb_total:</strong> Total benchmark return (overall market)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-purple-600 mb-3">Interpretation Guide</h5>
                  <ul className="space-y-2 text-slate-600">
                    <li>• <strong>Positive Allocation:</strong> Overweighted outperforming sectors</li>
                    <li>• <strong>Negative Allocation:</strong> Overweighted underperforming sectors</li>
                    <li>• <strong>Positive Selection:</strong> Picked winners within sectors</li>
                    <li>• <strong>Negative Selection:</strong> Picked losers within sectors</li>
                    <li>• <strong>Interaction:</strong> Amplifies or dampens the other effects</li>
                  </ul>
                </div>
              </div>
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
                      <h4 className="font-bold text-slate-800">Top-Down Attribution</h4>
                      <p className="text-sm text-slate-600 mb-2">Start with Allocation Effect. Did the manager get the asset class/sector decision right?</p>
                      <p className="text-xs text-slate-500">Best for: Macro-focused managers, asset allocation strategies, sector rotation funds</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[2.7rem] top-1 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                      <h4 className="font-bold text-slate-800">Bottom-Up Attribution</h4>
                      <p className="text-sm text-slate-600 mb-2">Start with Selection Effect. Used for managers who claim to be "stock pickers" first.</p>
                      <p className="text-xs text-slate-500">Best for: Fundamental analysts, value managers, growth stock pickers</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl text-sm text-slate-600 leading-relaxed italic border border-slate-100">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-orange-500 mt-1 shrink-0"/>
                    <div>
                      <p className="mb-3">"Attribution tells you where the return came from, but not if it will persist. A manager with +5% Selection Effect in one quarter might just be lucky."</p>
                      <p className="font-bold text-slate-700">Look for consistency over 3-5 years to identify genuine skill.</p>
                    </div>
                  </div>
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
                      <p className="text-sm text-slate-600 mb-2">Use ETFs for cheap beta. Example: 60% VTI (Stocks), 40% BND (Bonds).</p>
                      <p className="text-xs text-slate-500">Write an Investment Policy Statement (IPS) documenting your target allocations, rebalancing rules, and risk tolerance.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">2</div>
                    <div>
                      <h5 className="font-bold text-slate-800">Define Bands</h5>
                      <p className="text-sm text-slate-600 mb-2">Set strict rules. "I will not hold less than 50% stocks or more than 80%." Write this down in your IPS.</p>
                      <p className="text-xs text-slate-500">Example bands: Target 60% stocks, rebalance if it drifts below 55% or above 65%.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">3</div>
                    <div>
                      <h5 className="font-bold text-slate-800">Monitor Attribution</h5>
                      <p className="text-sm text-slate-600 mb-2">Review annually. If your active TAA bets consistently have negative attribution, stop doing them and stick to SAA.</p>
                      <p className="text-xs text-slate-500">Track your decisions in a journal. What was your thesis? Did it work? Learn from both successes and failures.</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card title="Behavioral Pitfalls" icon={AlertTriangle}>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <h5 className="font-bold text-red-800 text-sm">Recency Bias</h5>
                    <p className="text-sm text-red-700 mt-1 mb-2">Assuming that because Tech stocks went up last year, they will go up this year. This leads to chasing returns.</p>
                    <p className="text-xs text-red-600">Solution: Base decisions on long-term fundamentals, not recent performance.</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <h5 className="font-bold text-orange-800 text-sm">Overconfidence</h5>
                    <p className="text-sm text-orange-700 mt-1 mb-2">Believing you can time the market better than you actually can. Most TAA fails due to emotion.</p>
                    <p className="text-xs text-orange-600">Solution: Start small with TAA positions. Track your hit rate honestly.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <h5 className="font-bold text-yellow-800 text-sm">Style Drift</h5>
                    <p className="text-sm text-yellow-700 mt-1 mb-2">When a "Safe Bond" manager starts buying risky junk bonds to chase yield, violating the SAA role.</p>
                    <p className="text-xs text-yellow-600">Solution: Regular attribution analysis to ensure managers stay within their mandate.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <h5 className="font-bold text-purple-800 text-sm">Anchoring Bias</h5>
                    <p className="text-sm text-purple-700 mt-1 mb-2">Sticking to initial price targets or allocation decisions even when fundamentals change.</p>
                    <p className="text-xs text-purple-600">Solution: Regular portfolio reviews with fresh eyes. Question your assumptions.</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mt-8 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-teal-500"/>
                Implementation Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-bold text-teal-600 mb-3">Before You Start</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded mt-0.5 shrink-0"></div>
                      <span>Complete risk tolerance questionnaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded mt-0.5 shrink-0"></div>
                      <span>Define investment goals and time horizon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded mt-0.5 shrink-0"></div>
                      <span>Research low-cost index funds/ETFs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded mt-0.5 shrink-0"></div>
                      <span>Write Investment Policy Statement</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-teal-600 mb-3">Ongoing Management</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded mt-0.5 shrink-0"></div>
                      <span>Set calendar reminders for rebalancing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded mt-0.5 shrink-0"></div>
                      <span>Track performance vs. benchmark</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded mt-0.5 shrink-0"></div>
                      <span>Document TAA decisions and rationale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded mt-0.5 shrink-0"></div>
                      <span>Annual attribution analysis review</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          
        </main>
      </div>
    </ArticleFrame>
  );
}