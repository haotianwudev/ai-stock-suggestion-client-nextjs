'use client';

import React, { useState } from 'react';
import { Shield, TrendingUp, DollarSign, Activity, Layers, Lock, BarChart3, PieChart, AlertTriangle, CheckCircle, Info, BookOpen, Calculator, Clock, MousePointerClick, XCircle, ArrowRight, Settings, Scale, FileText, Banknote, Calendar, RefreshCw, Music, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable UI Components ---
interface SectionProps {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  color?: "indigo" | "emerald" | "rose" | "amber" | "blue" | "violet";
}

const Section = ({ title, icon: Icon, children, color = "indigo" }: SectionProps) => {
  const colorClasses = {
    indigo: "border-l-4 border-indigo-500 bg-white",
    emerald: "border-l-4 border-emerald-500 bg-white",
    rose: "border-l-4 border-rose-500 bg-white",
    amber: "border-l-4 border-amber-500 bg-white",
    blue: "border-l-4 border-blue-500 bg-white",
    violet: "border-l-4 border-violet-500 bg-white",
  };

  const textColors = {
    indigo: "text-indigo-700",
    emerald: "text-emerald-700",
    rose: "text-rose-700",
    amber: "text-amber-700",
    blue: "text-blue-700",
    violet: "text-violet-700",
  };

  return (
    <div className={`mb-12 rounded-xl shadow-sm p-8 ${colorClasses[color]} transition-all hover:shadow-md`}>
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className={`p-2 rounded-lg ${textColors[color]} bg-opacity-10 bg-current`}>
          <Icon size={28} />
        </div>
        <h2 className={`text-2xl font-bold ${textColors[color]}`}>{title}</h2>
      </div>
      <div className="text-slate-600 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  color?: "green" | "red" | "blue" | "amber" | "slate" | "violet";
}

const Badge = ({ children, color = "slate" }: BadgeProps) => {
  const styles = {
    green: "bg-emerald-100 text-emerald-800",
    red: "bg-rose-100 text-rose-800",
    blue: "bg-blue-100 text-blue-800",
    amber: "bg-amber-100 text-amber-800",
    slate: "bg-slate-100 text-slate-800",
    violet: "bg-violet-100 text-violet-800",
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${styles[color] || styles.slate}`}>
      {children}
    </span>
  );
};

// --- Interactive Components ---
const PayoffVisualizer = () => {
  const [marketReturn, setMarketReturn] = useState(0);
  const [bufferSize, setBufferSize] = useState(15);

  // Calculate Cap based on buffer (Deep buffer = Lower Cap)
  const capSize = bufferSize === 9 ? 18 : bufferSize === 15 ? 14 : 9;

  // Calculate Strategy Return
  let strategyReturn = 0;
  if (marketReturn < -bufferSize) {
    // Loss exceeds buffer (e.g., Market -20, Buffer 15, Loss -5)
    strategyReturn = marketReturn + bufferSize;
  } else if (marketReturn < 0) {
    // Inside buffer zone
    strategyReturn = 0;
  } else if (marketReturn > capSize) {
    // Capped upside
    strategyReturn = capSize;
  } else {
    // 1:1 upside
    strategyReturn = marketReturn;
  }

  // Determine Zone
  let zoneColor = "text-slate-500";
  let zoneName = "Tracking";
  let zoneDesc = "Direct 1:1 participation";

  if (marketReturn < -bufferSize) {
    zoneColor = "text-rose-500";
    zoneName = "Downside Risk";
    zoneDesc = "Buffer exceeded. You take losses 1:1 from here.";
  } else if (marketReturn < 0) {
    zoneColor = "text-amber-500";
    zoneName = "Protected Zone";
    zoneDesc = "Losses are fully absorbed by the options.";
  } else if (marketReturn > capSize) {
    zoneColor = "text-emerald-500";
    zoneName = "Capped Zone";
    zoneDesc = "Maximum profit reached. Upside is forfeited.";
  }

  // SVG Coordinate mapping
  const width = 500;
  const height = 250;
  const zeroY = 125;
  const zeroX = 250;
  const scaleX = 4; // pixels per percent
  const scaleY = 2; // pixels per percent

  // Calculate user point coordinates
  const userX = zeroX + (marketReturn * scaleX);
  const userY = zeroY - (strategyReturn * scaleY);

  return (
    <div className="bg-slate-900 rounded-xl p-6 text-white shadow-2xl ring-1 ring-slate-800">
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 border-b border-slate-800 pb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="text-indigo-400" size={20}/>
            Payoff Simulator
          </h3>
          <p className="text-slate-400 text-xs mt-1">Adjust market conditions to see reaction.</p>
        </div>

        {/* Buffer Selector */}
        <div className="flex bg-slate-800 p-1 rounded-lg">
          {[9, 15, 30].map(b => (
            <button
              key={b}
              onClick={() => setBufferSize(b)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                bufferSize === b ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              {b}% Buffer
            </button>
          ))}
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Graph */}
        <div className="lg:col-span-2 relative h-64 border border-slate-700 bg-slate-950/50 rounded-lg overflow-hidden">
          <svg viewBox="0 0 500 250" className="w-full h-full">
            {/* Grid */}
            <line x1="250" y1="0" x2="250" y2="250" stroke="#334155" strokeWidth="1"/>
            <line x1="0" y1="125" x2="500" y2="125" stroke="#334155" strokeWidth="1"/>

            {/* Market Reference (Dashed) */}
            <line x1="50" y1="225" x2="450" y2="25" stroke="#475569" strokeDasharray="5,5" strokeWidth="2"/>

            {/* Strategy Line (Dynamic) */}
            <polyline
              points={`0,${zeroY - ((-50 + bufferSize) * scaleY)} ${zeroX - (bufferSize * scaleX)},${zeroY} ${zeroX},${zeroY} ${zeroX + (capSize * scaleX)},${zeroY - (capSize * scaleY)} 500,${zeroY - (capSize * scaleY)}`}
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* User Position Dot */}
            <circle cx={userX} cy={userY} r="6" fill="#fbbf24" stroke="white" strokeWidth="2" />
          </svg>
          <div className="absolute top-2 right-2 text-xs text-slate-500 font-mono">
            Cap: {capSize}% | Buffer: {bufferSize}%
          </div>
        </div>

        {/* Data Panel */}
        <div className="space-y-6">
          <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-indigo-500">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Market Return</div>
            <div className="text-3xl font-mono font-bold text-white">
              {marketReturn > 0 ? '+' : ''}{marketReturn}%
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-500">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Your Return</div>
            <div className={`text-3xl font-mono font-bold ${strategyReturn >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {strategyReturn > 0 ? '+' : ''}{strategyReturn.toFixed(1)}%
            </div>
          </div>

          <div className="text-center">
            <div className={`text-sm font-bold ${zoneColor} uppercase mb-1`}>{zoneName}</div>
            <p className="text-xs text-slate-400 leading-tight">{zoneDesc}</p>
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <div className="flex justify-between text-xs text-slate-500 mb-2 font-mono">
          <span>CRASH (-50%)</span>
          <span>FLAT (0%)</span>
          <span>MOON (+50%)</span>
        </div>
        <input 
          type="range" 
          min="-50" 
          max="50" 
          value={marketReturn} 
          onChange={(e) => setMarketReturn(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
        />
      </div>
    </div>
  );
};

const TradeDecomposer = () => {
  const [price, setPrice] = useState(500);
  const buffer = 15; // 15%
  const cap = 14.5; // Estimated Cap

  // Formatters
  const currency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  // Strike Calculations
  const putLongStrike = price;
  const putShortStrike = price * (1 - (buffer / 100));
  const callShortStrike = price * (1 + (cap / 100));

  return (
    <div className="space-y-8">
      {/* Interactive Builder Header */}
      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-violet-900 flex items-center gap-2">
              <Calculator size={20}/>
              Strategy Builder
            </h3>
            <p className="text-sm text-violet-700">Enter your asset price to calculate the option legs.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-violet-100">
            <label className="text-xs font-bold text-slate-500 uppercase">Underlying Price ($)</label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-24 font-mono text-lg font-bold text-slate-800 border-none focus:ring-0 text-right"
            />
          </div>
        </div>
      </div>

      {/* The 4 Legs Visualization */}
      <div className="relative">
        {/* Connector Line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 hidden md:block"></div>

        <div className="space-y-4">
          {/* LEG 1: The Asset */}
          <div className="relative pl-0 md:pl-16">
            <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-full items-center justify-center text-xs font-bold text-slate-600 z-10">1</div>
            <div className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
                  <Layers size={20}/>
                </div>
                <div>
                  <div className="font-bold text-slate-800">Long Asset Exposure</div>
                  <div className="text-xs text-slate-500">Buy 100 Shares of SPY</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-slate-800">{currency(price)}</div>
                <Badge color="slate">Delta 1.0</Badge>
              </div>
            </div>
          </div>

          {/* LEG 2: The Floor */}
          <div className="relative pl-0 md:pl-16">
            <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-indigo-200 rounded-full items-center justify-center text-xs font-bold text-indigo-700 z-10">2</div>
            <div className="bg-white border-2 border-indigo-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                  <Shield size={20}/>
                </div>
                <div>
                  <div className="font-bold text-indigo-900">Buy Put (The Floor)</div>
                  <div className="text-xs text-indigo-700">Protects from this price downwards</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-indigo-700">Strike: {currency(putLongStrike)}</div>
                <div className="text-xs text-rose-500 font-bold">Expensive (Debit)</div>
              </div>
            </div>
          </div>

          {/* LEG 3: The Limit */}
          <div className="relative pl-0 md:pl-16">
            <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-amber-200 rounded-full items-center justify-center text-xs font-bold text-amber-700 z-10">3</div>
            <div className="bg-white border-2 border-amber-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                  <ArrowRight size={20}/>
                </div>
                <div>
                  <div className="font-bold text-amber-900">Sell Put (The Buffer Limit)</div>
                  <div className="text-xs text-amber-700">Re-introduces risk below this price</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-amber-700">Strike: {currency(putShortStrike)}</div>
                <div className="text-xs text-emerald-500 font-bold">Funds Trade (Credit)</div>
              </div>
            </div>
          </div>

          {/* LEG 4: The Cap */}
          <div className="relative pl-0 md:pl-16">
            <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-200 rounded-full items-center justify-center text-xs font-bold text-emerald-700 z-10">4</div>
            <div className="bg-white border-2 border-emerald-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                  <Lock size={20}/>
                </div>
                <div>
                  <div className="font-bold text-emerald-900">Sell Call (The Cap)</div>
                  <div className="text-xs text-emerald-700">Limits profits above this price</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-emerald-700">Strike: {currency(callShortStrike)}</div>
                <div className="text-xs text-emerald-500 font-bold">Funds Trade (Credit)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Risks Panel */}
      <div className="mt-8 bg-rose-50 border border-rose-100 rounded-xl p-6">
        <h4 className="font-bold text-rose-900 flex items-center gap-2 mb-4">
          <AlertTriangle size={18} />
          Critical DIY Warning: American vs. European Options
        </h4>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <strong className="block text-rose-800 mb-1">Standard Options (SPY/Stocks)</strong>
            <p className="text-rose-700">These are <strong>American Style</strong>. They can be exercised <em>any time</em> before expiration. If your Short Call goes deep ITM, you might get assigned early, forcing you to sell your shares and breaking the hedge before maturity.</p>
          </div>
          <div>
            <strong className="block text-rose-800 mb-1">Index Options (SPX/XSP)</strong>
            <p className="text-rose-700">These are <strong>European Style</strong>. They can only be exercised at expiration. This is crucial for this strategy to work safely. Buffered ETFs use FLEX options (European) to guarantee the outcome.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailedComparison = () => {
  const [activeTab, setActiveTab] = useState('etf');

  return (
    <div className="space-y-8">
      {/* Toggle Header */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1 rounded-xl inline-flex shadow-inner">
          <button 
            onClick={() => setActiveTab('etf')}
            className={`px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'etf' ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChart3 size={16} />
            Buffered ETFs
          </button>
          <button 
            onClick={() => setActiveTab('note')}
            className={`px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'note' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Banknote size={16} />
            Structured Notes
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'etf' ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 animate-fadeIn">
          <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <CheckCircle className="text-emerald-500" />
            The Modern Standard: Buffered ETFs
          </h3>
          <p className="text-emerald-800 mb-8 leading-relaxed">
            Exchange Traded Funds have democratized this strategy. They wrap the complex option logic inside a regulated, transparent, and liquid shell. This is the preferred vehicle for 99% of retail investors and advisors.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100/50">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                <Shield size={16} className="text-emerald-500"/> Bankruptcy Remote
              </div>
              <p className="text-sm text-slate-600">Your assets are held in a trust (State Street/US Bank). If the issuer (e.g., Innovator/First Trust) fails, your money is safe. You own the underlying assets.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100/50">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-500"/> Daily Liquidity
              </div>
              <p className="text-sm text-slate-600">Trade it like Apple stock. Get in and out instantly at fair market value (NAV). No lock-up periods.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100/50">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                <FileText size={16} className="text-emerald-500"/> Tax Efficiency
              </div>
              <p className="text-sm text-slate-600">Many utilize "FLEX Options" ensuring Section 1256 treatment (60% Long Term / 40% Short Term capital gains rates), regardless of holding period.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-emerald-100/50">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                <MousePointerClick size={16} className="text-emerald-500"/> Democratized Access
              </div>
              <p className="text-sm text-slate-600">No minimum investment beyond the price of 1 share (~$30-40). Accessible to everyone, not just accredited investors.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 animate-fadeIn">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" />
            The Legacy Product: Structured Notes
          </h3>
          <p className="text-indigo-800 mb-8 leading-relaxed">
            Debt instruments issued by banks. While they offer powerful customization for High Net Worth individuals, they are fraught with credit and liquidity risks often overlooked by retail investors.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-rose-400">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-500"/> Credit Risk
              </div>
              <p className="text-sm text-slate-600">You are an <strong>unsecured creditor</strong>. If the bank (Issuer) fails, you lose 100%. See: Lehman Brothers 2008. You do not own the underlying options.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-rose-400">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                <Lock size={16} className="text-rose-500"/> Liquidity Lock-up
              </div>
              <p className="text-sm text-slate-600">Designed to be held to maturity. Selling early often incurs significant penalties or "markdowns" by the trading desk. Your capital is stuck.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-amber-400">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                <DollarSign size={16} className="text-amber-500"/> Opaque Pricing
              </div>
              <p className="text-sm text-slate-600">Fees are "embedded" in the structure. You don't see an expense ratio, but you get worse terms (Caps) to pay the bank's commission.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-emerald-400">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                <Settings size={16} className="text-emerald-500"/> Customization (The Pro)
              </div>
              <p className="text-sm text-slate-600">If you have $5M, you can ask a bank for a bespoke note: "I want Apple stock with a 20% buffer." ETFs cannot offer single-stock customization.</p>
            </div>
          </div>
        </div>
      )}

      {/* Feature Comparison Table */}
      <div className="overflow-hidden border rounded-xl border-slate-200 shadow-sm mt-8">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Feature</th>
              <th className="px-6 py-4 text-emerald-700 bg-emerald-50/30 font-bold border-l border-slate-200">Buffered ETF</th>
              <th className="px-6 py-4 text-indigo-700 bg-indigo-50/30 font-bold border-l border-slate-200">Structured Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-white hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">Credit Risk</td>
              <td className="px-6 py-4 text-emerald-600 font-bold border-l border-slate-100">None (Asset Backed)</td>
              <td className="px-6 py-4 text-rose-500 font-bold border-l border-slate-100">High (Issuer Default)</td>
            </tr>
            <tr className="bg-white hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">Liquidity</td>
              <td className="px-6 py-4 text-emerald-600 font-bold border-l border-slate-100">Intraday (Exchange)</td>
              <td className="px-6 py-4 text-rose-500 font-bold border-l border-slate-100">None / Penalties</td>
            </tr>
            <tr className="bg-white hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">Tax Treatment</td>
              <td className="px-6 py-4 border-l border-slate-100">Usually 1256 (60/40 Split)</td>
              <td className="px-6 py-4 border-l border-slate-100">Ordinary Income / Debt</td>
            </tr>
            <tr className="bg-white hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">Transparency</td>
              <td className="px-6 py-4 border-l border-slate-100">Daily Holdings</td>
              <td className="px-6 py-4 text-amber-500 font-medium border-l border-slate-100">Black Box</td>
            </tr>
            <tr className="bg-white hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-900">Cost Structure</td>
              <td className="px-6 py-4 border-l border-slate-100">Explicit Expense Ratio (~0.80%)</td>
              <td className="px-6 py-4 border-l border-slate-100">Hidden Spread (~2-4%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CycleVisualizer = () => {
  const [currentPrice, setCurrentPrice] = useState(100);
  const startPrice = 100;
  const capPrice = 115;
  const bufferPrice = 85;

  // Calculations
  const pctChange = ((currentPrice - startPrice) / startPrice) * 100;
  const remainingCap = Math.max(0, ((capPrice - currentPrice) / currentPrice) * 100);
  const distanceToBuffer = ((bufferPrice - currentPrice) / currentPrice) * 100;

  // Determine Status
  let status = "neutral";
  if (pctChange > 10) status = "bad_entry";
  if (pctChange < -5) status = "good_entry";

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock size={18} className="text-amber-600"/>
            Mid-Cycle Entry Simulator
          </h4>
          <p className="text-xs text-slate-500 mt-1">Move slider to change current price relative to Start Date.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 font-mono text-sm font-bold">
          Current Price: ${currentPrice} ({pctChange > 0 ? '+' : ''}{pctChange.toFixed(1)}%)
        </div>
      </div>

      {/* Visual Timeline Bar */}
      <div className="relative h-12 bg-slate-200 rounded-full mb-8 flex items-center px-2">
        {/* Buffer Zone */}
        <div className="absolute left-0 h-full bg-rose-200 rounded-l-full flex items-center pl-4 text-xs font-bold text-rose-700 opacity-50" style={{width: '20%'}}>
          Buffer
        </div>

        {/* Cap Zone */}
        <div className="absolute right-0 h-full bg-emerald-100 rounded-r-full flex items-center justify-end pr-4 text-xs font-bold text-emerald-700 opacity-50" style={{width: '20%'}}>
          Cap
        </div>

        {/* Markers */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-slate-400 left-[20%]"></div> {/* 85 */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-slate-800 left-[50%] z-10 h-14 -mt-1"></div> {/* 100 Start */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-slate-400 left-[80%]"></div> {/* 115 */}

        {/* Current Position Indicator */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-full shadow-lg border-2 border-white z-20 cursor-grab transition-all duration-75 flex items-center justify-center text-[10px] font-bold text-white"
          style={{ left: `${((currentPrice - 75) / (125 - 75)) * 100}%` }}
        >
          YOU
        </div>

        {/* Labels */}
        <div className="absolute -bottom-6 left-[20%] -translate-x-1/2 text-xs font-bold text-slate-400">$85</div>
        <div className="absolute -bottom-6 left-[50%] -translate-x-1/2 text-xs font-bold text-slate-800">Start ($100)</div>
        <div className="absolute -bottom-6 left-[80%] -translate-x-1/2 text-xs font-bold text-slate-400">$115</div>
      </div>

      {/* Data Readout */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg border-2 ${remainingCap < 3 ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100'}`}>
          <div className="text-xs text-slate-500 uppercase font-bold">Upside Remaining</div>
          <div className={`text-2xl font-bold ${remainingCap < 3 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {remainingCap.toFixed(2)}%
          </div>
          {remainingCap < 3 && <div className="text-[10px] text-rose-500 font-bold mt-1">Warning: Very low upside</div>}
        </div>

        <div className={`p-4 rounded-lg border-2 ${distanceToBuffer > -5 ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100'}`}>
          <div className="text-xs text-slate-500 uppercase font-bold">Drop Before Protection</div>
          <div className={`text-2xl font-bold ${distanceToBuffer > -5 ? 'text-rose-600' : 'text-slate-700'}`}>
            {distanceToBuffer.toFixed(2)}%
          </div>
          {pctChange > 5 && <div className="text-[10px] text-rose-500 font-bold mt-1">You absorb the first {pctChange.toFixed(1)}% of losses!</div>}
        </div>
      </div>

      {/* Slider Input */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <input 
          type="range" 
          min="80" 
          max="120" 
          value={currentPrice} 
          onChange={(e) => setCurrentPrice(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>Price: $80</span>
          <span>Price: $120</span>
        </div>
      </div>
    </div>
  );
};

const ScenarioTable = () => {
  const scenarios = [
    { market: "-30% (Crash)", buffer15: "-15%", buffer30: "-0%", plain: "-30%" },
    { market: "-20% (Bear)", buffer15: "-5%", buffer30: "0%", plain: "-20%" },
    { market: "-10% (Correction)", buffer15: "0%", buffer30: "0%", plain: "-10%" },
    { market: "+5% (Flat)", buffer15: "+5%", buffer30: "+5%", plain: "+5%" },
    { market: "+15% (Rally)", buffer15: "+15% (Cap)", buffer30: "+12% (Cap)", plain: "+15%" },
    { market: "+30% (Bull Run)", buffer15: "+15% (Capped)", buffer30: "+12% (Capped)", plain: "+30%" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm mt-6">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-bold text-slate-700">S&P 500 Return</th>
            <th className="px-6 py-4 text-indigo-600 bg-indigo-50/50">Buffer 15% (Typical)</th>
            <th className="px-6 py-4 text-emerald-600 bg-emerald-50/50">Buffer 30% (Deep)</th>
            <th className="px-6 py-4 text-slate-500">Unhedged (SPY)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {scenarios.map((row, idx) => (
            <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{row.market}</td>
              <td className="px-6 py-4 font-bold text-indigo-700 bg-indigo-50/30">{row.buffer15}</td>
              <td className="px-6 py-4 font-bold text-emerald-700 bg-emerald-50/30">{row.buffer30}</td>
              <td className="px-6 py-4 text-slate-500">{row.plain}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-slate-50 p-3 text-xs text-slate-500 text-center">
        *Assumes strategy is held for the full outcome period (usually 1 year). Interim pricing will vary.
      </div>
    </div>
  );
};

export default function BufferedYieldStrategiesArticle() {
  return (
    <ArticleFrame slug="mastering-buffered-yield-strategies-defined-outcome-investing">
          <div className="max-w-4xl mx-auto mb-16">
            <InfographicSlot alt="Buffered Yield Strategies Infographic" />
          </div>
          {/* Executive Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Buffered Strategy?</h2>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              A Buffered Strategy (or "Defined Outcome" strategy) is an investment approach that explicitly defines the range of possible returns over a specific period. Unlike traditional investing, where your range of outcomes is infinite (and terrifying), here you trade <span className="font-semibold text-rose-600">Upside Potential</span> (the Cap) to fund <span className="font-semibold text-emerald-600">Downside Protection</span> (the Buffer).
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge color="blue">Hedging</Badge>
              <Badge color="green">Risk Management</Badge>
              <Badge color="amber">Volatility Selling</Badge>
              <Badge color="slate">Alternative Income</Badge>
            </div>
          </div>

          {/* Section 1: Visual Mechanics */}
          <Section title="1. Visualizing the Payoff" icon={PieChart} color="indigo">
            <p>Before diving into the math, it is crucial to understand the geometry of the trade. Use the simulator below to understand how the <strong>Buffer</strong> shields you and the <strong>Cap</strong> limits you.</p>
            <PayoffVisualizer />
            <p className="mt-4 text-sm bg-indigo-50 p-4 rounded text-indigo-800">
              <strong>Key Takeaway:</strong> You are effectively insuring your house (portfolio) against a fire (market crash), but paying for that insurance by giving up the possibility of winning the lottery (massive bull run).
            </p>
          </Section>

          {/* Section 2: Decomposing the Trade (DIY) */}
          <Section title="2. Decomposing the Trade (DIY)" icon={Layers} color="violet">
            <div className="mb-6 space-y-4">
              <p>Whether you buy a bank note or an ETF, they are all doing the exact same thing under the hood. Here is the step-by-step recipe for a <strong>Put Spread Collar</strong>.</p>
              <div className="p-4 bg-violet-50 rounded-lg border border-violet-100 text-violet-800 text-sm">
                <strong>The Zero Cost Goal:</strong> Buying a Protective Put is expensive. To make it free, we "finance" it by selling an OTM Put and an OTM Call. The credits received should equal the debit paid.
              </div>
            </div>
            <TradeDecomposer />
          </Section>

          {/* Section 3: Scenario Analysis */}
          <Section title="3. Scenario Analysis: Winners & Losers" icon={Calculator} color="emerald">
            <p className="mb-4">How does this actually perform in the real world? Let's compare a standard "15% Buffer" strategy against holding the S&P 500 (SPY) directly.</p>
            <ScenarioTable />
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-2">When does it WIN?</h4>
                <ul className="text-sm text-emerald-800 space-y-2 list-disc list-inside">
                  <li><strong>Sideways Markets:</strong> Market is flat (+2%). You make +2%. You lost nothing on insurance cost.</li>
                  <li><strong>Moderate Bears:</strong> Market drops -10%. You lose 0%. You outperformed by 1000 basis points.</li>
                  <li><strong>The "Slow Bleed":</strong> Market drifts down -5% a year. You stay flat.</li>
                </ul>
              </div>
              <div className="bg-rose-50 p-5 rounded-xl border border-rose-100">
                <h4 className="font-bold text-rose-900 mb-2">When does it LOSE?</h4>
                <ul className="text-sm text-rose-800 space-y-2 list-disc list-inside">
                  <li><strong>Raging Bull Markets:</strong> Market rips +25%. You are capped at +15%. You underperform significantly (FOMO).</li>
                  <li><strong>Catastrophic Crash:</strong> Market drops -50%. With a 15% buffer, you still lose -35%. It softens the blow, but doesn't eliminate risk.</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Section 4: Vehicles (ETF vs Note vs Option) */}
          <Section title="4. Implementation: Note vs. ETF" icon={BarChart3} color="rose">
            <p className="mb-6">This is the most critical decision. The "engine" is the same, but the "chassis" determines your taxes, liquidity, and safety.</p>
            <DetailedComparison />
          </Section>

          {/* Section 5: Advanced Nuances */}
          <Section title="5. Advanced Nuances: Timing & Dividends" icon={Clock} color="amber">
            <div className="space-y-8">
              {/* Subsection: The Timing Trap */}
              <div>
                <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
                  <Calendar className="text-amber-500" />
                  The "Outcome Period" Trap
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Buffered strategies are <strong>path-dependent</strong>. The 15% protection is calculated based on the ETF's price on day 1 of the cycle. If you buy "Mid-Cycle" (e.g., 6 months in), your risk profile is completely different.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-sm text-amber-800 mb-6">
                  <strong>Simulation:</strong> See what happens if you buy the ETF when it has already rallied. Notice how your "Upside Remaining" shrinks while your "Buffer" moves further away.
                </div>
                <CycleVisualizer />
              </div>

              <div className="border-t border-slate-200 my-8"></div>

              {/* Subsection: Dividend Drag */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
                    <XCircle className="text-rose-500" />
                    The Hidden Cost: Dividends
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Standard S&P 500 ETFs (VOO/SPY) pay ~1.5% in dividends annually. Buffered strategies typically <strong>do not pay dividends</strong>. Why? Because the dividends are used internally to pay for the options (buying the puts).
                  </p>
                  <p className="text-sm text-slate-500 italic">
                    "You aren't just giving up the Cap. You are giving up the dividend yield too."
                  </p>
                </div>
                <div className="bg-slate-100 p-6 rounded-xl flex flex-col justify-center items-center text-center">
                  <div className="text-4xl font-extrabold text-slate-400 mb-2">-15%</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Compound Drag (10 Years)</div>
                  <p className="text-[10px] text-slate-400 mt-2">Missed dividends over a decade significantly impact total return vs. SPY.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded text-blue-600">
                    <RefreshCw size={20}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">The Annual Reset</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every year, the options expire. The ETF manager "rolls" into new contracts. This creates a new Cap and Buffer based on current volatility (VIX). If VIX is low, your new Cap might be disappointingly low (e.g., 8%).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Section 6: Pros and Cons Summary */}
          <Section title="6. Final Verdict: Pros & Cons" icon={Activity} color="blue">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <CheckCircle/> The Good
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-slate-700 text-sm">
                    <div className="w-6 flex-shrink-0 text-emerald-500 font-bold">1.</div>
                    <div><strong>Psychological Safety:</strong> Knowing you can't lose the first 15% allows investors to stay invested during scary headlines.</div>
                  </li>
                  <li className="flex gap-3 text-slate-700 text-sm">
                    <div className="w-6 flex-shrink-0 text-emerald-500 font-bold">2.</div>
                    <div><strong>Sequence of Return Risk:</strong> Critical for retirees. It mitigates the risk of a crash right after retirement.</div>
                  </li>
                  <li className="flex gap-3 text-slate-700 text-sm">
                    <div className="w-6 flex-shrink-0 text-emerald-500 font-bold">3.</div>
                    <div><strong>Bond Alternative:</strong> In a world where bonds and stocks correlate (fall together), this offers a non-correlated risk profile.</div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-700 mb-4 flex items-center gap-2">
                  <XCircle/> The Bad
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-slate-700 text-sm">
                    <div className="w-6 flex-shrink-0 text-rose-500 font-bold">1.</div>
                    <div><strong>Capped Upside:</strong> If the market rallies 30% after a crash (V-shaped recovery), you will severely underperform.</div>
                  </li>
                  <li className="flex gap-3 text-slate-700 text-sm">
                    <div className="w-6 flex-shrink-0 text-rose-500 font-bold">2.</div>
                    <div><strong>Complexity:</strong> Understanding outcome periods, caps, and resets requires active monitoring. It is not "set and forget."</div>
                  </li>
                  <li className="flex gap-3 text-slate-700 text-sm">
                    <div className="w-6 flex-shrink-0 text-rose-500 font-bold">3.</div>
                    <div><strong>No Free Lunch:</strong> You are paying for safety with opportunity cost. Over 20 years, unhedged equity usually wins.</div>
                  </li>
                </ul>
              </div>
            </div>
          </Section>

    </ArticleFrame>
  );
}