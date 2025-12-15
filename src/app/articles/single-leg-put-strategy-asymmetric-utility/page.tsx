'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Zap, TrendingDown, TrendingUp, Clock, Activity, AlertTriangle, User, Building, Landmark, BookOpen, Target, BarChart2, PieChart, HelpCircle, ChevronDown, ChevronUp, Microscope, Crosshair, LogOut, AlertOctagon, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Sub-Components ---
const SectionHeader = ({ title, subtitle, icon: Icon, colorClass }: any) => (
  <div className="mb-12 text-center max-w-3xl mx-auto">
    <div className={`inline-flex items-center justify-center p-4 rounded-full mb-6 ${colorClass} bg-opacity-10 shadow-sm`}>
      <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
    </div>
    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">{title}</h2>
    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{subtitle}</p>
    <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mt-8 rounded-full"></div>
  </div>
);

const GreekCard = ({ greek, symbol, description, impact, color }: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className={`h-2 w-full ${color}`}></div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-slate-800">{greek}</h3>
        <span className={`text-4xl font-serif opacity-20 group-hover:opacity-100 transition-opacity duration-300 ${color.replace('bg-', 'text-')}`}>{symbol}</span>
      </div>
      <p className="text-slate-600 mb-4 text-sm leading-relaxed h-20">{description}</p>
      <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${color.replace('bg-', 'text-')}`}>Strategic Impact</div>
      <p className="text-slate-800 font-medium text-sm">{impact}</p>
    </div>
  </div>
);

const StrategyCard = ({ title, icon: Icon, description, mechanism, cost, tags }: any) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col h-full relative overflow-hidden transition-all hover:shadow-md">
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-slate-50 rounded-full z-0"></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shadow-sm">
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      </div>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed flex-grow">{description}</p>
      <div className="grid grid-cols-2 gap-6 mb-8 bg-slate-50 p-4 rounded-xl">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">Mechanism</span>
          <p className="text-slate-800 text-sm font-semibold">{mechanism}</p>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">The Cost</span>
          <p className="text-slate-800 text-sm font-semibold">{cost}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag: any, i: number) => (
          <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-full shadow-sm">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

const ScenarioRow = ({ price, pnl, percent, note, isHeader = false }: any) => {
  const isLoss = pnl < 0;
  const isProfit = pnl > 0;
  
  if (isHeader) {
    return (
      <div className="grid grid-cols-4 gap-4 py-3 px-4 bg-slate-100 font-bold text-slate-600 text-sm rounded-t-lg">
        <div>Stock Price</div>
        <div>Profit/Loss ($)</div>
        <div>Return on Capital</div>
        <div>Outcome</div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-4 gap-4 py-4 px-4 border-b border-slate-100 hover:bg-slate-50 transition-colors items-center text-sm">
      <div className="font-mono text-slate-700 font-semibold">${price}</div>
      <div className={`font-mono font-bold ${isLoss ? 'text-rose-500' : isProfit ? 'text-emerald-500' : 'text-slate-400'}`}>
        {pnl === 0 ? '-' : (pnl > 0 ? `+$${pnl}` : `-$${Math.abs(pnl)}`)}
      </div>
      <div className={`font-bold ${isLoss ? 'text-rose-500' : isProfit ? 'text-emerald-500' : 'text-slate-400'}`}>
        {percent}
      </div>
      <div className="text-slate-500 text-xs">{note}</div>
    </div>
  );
};

const IndicatorCard = ({ title, type, items, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-slate-100" style={{ borderLeftColor: color }}>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold uppercase rounded">{type}</span>
    </div>
    <ul className="space-y-3">
      {items.map((item: any, i: number) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
          <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-slate-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const AccordionItem = ({ title, children, isOpen, onClick }: any) => {
  return (
    <div className="border-b border-slate-200 last:border-0 bg-white first:rounded-t-2xl last:rounded-b-2xl">
      <button 
        className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-slate-50 transition-colors focus:outline-none"
        onClick={onClick}
      >
        <span className="font-bold text-slate-800 text-lg">{title}</span>
        {isOpen ? <ChevronUp className="text-indigo-500" /> : <ChevronDown className="text-slate-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---
export default function SingleLegPutStrategyExtended() {
  const [activeTab, setActiveTab] = useState('retail');
  const [openPitfall, setOpenPitfall] = useState(0);
  const currentArticle = articles.find(article => article.slug === 'single-leg-put-strategy-asymmetric-utility');

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
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

      {/* Hero Section */}
      <header className="relative bg-white overflow-hidden pb-24 pt-24 lg:pt-32 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white opacity-70"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white shadow-lg shadow-slate-200 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest">Strategy Guide 2.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              The Single Leg <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Long Put</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12">
              The definitive instrument for asymmetric utility. Master the art of profiting from decline and hedging catastrophic tail risk.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl shadow-xl shadow-slate-200 font-bold transition-transform hover:scale-105">
                <Shield size={20} />
                <span>Defined Risk</span>
              </div>
              <div className="flex items-center gap-2 px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl shadow-sm font-bold transition-transform hover:scale-105">
                <Zap size={20} className="text-amber-500" />
                <span>Convex Reward</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Infographic */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
          <img 
            src="https://i.imgur.com/a1a8zU5.jpeg" 
            alt="Single Leg Long Put Strategy Infographic" 
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Mechanics Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader 
          title="The Mechanics" 
          subtitle="Understanding the physics of option pricing and contractual obligations."
          icon={Activity}
          colorClass="text-blue-600 bg-blue-600"
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 transition-colors">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <span className="p-2 bg-green-100 rounded-lg text-green-700">
                  <User size={20}/>
                </span>
                The Buyer (You)
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Possesses the <strong>right, not the obligation,</strong> to sell the underlying asset at the strike price. This right is valuable only when the market price falls below the strike. Your liability is strictly limited to the premium paid.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 opacity-80">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <span className="p-2 bg-slate-100 rounded-lg text-slate-700">
                  <Building size={20}/>
                </span>
                The Seller
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Assumes the <strong>obligation</strong> to buy the stock at the strike price if assigned. They receive your premium in exchange for providing liquidity and assuming the downside risk.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-10 rounded-3xl relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Microscope size={24} className="text-indigo-400"/>
                Anatomy of a Trade
              </h3>
              <div className="space-y-6 font-mono text-indigo-100 bg-slate-800 bg-opacity-50 p-6 rounded-xl border border-indigo-500/30">
                <div className="flex justify-between border-b border-indigo-500/30 pb-3">
                  <span className="text-sm uppercase tracking-widest text-indigo-400">Stock Price</span>
                  <span className="font-bold">$105.00</span>
                </div>
                <div className="flex justify-between border-b border-indigo-500/30 pb-3">
                  <span className="text-sm uppercase tracking-widest text-indigo-400">Strike Price</span>
                  <span className="font-bold">$100.00</span>
                </div>
                <div className="flex justify-between border-b border-indigo-500/30 pb-3">
                  <span className="text-sm uppercase tracking-widest text-rose-400">Premium Paid</span>
                  <span className="text-rose-400 font-bold">-$2.50 ($250)</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-2">
                  <span>Breakeven</span>
                  <span className="text-emerald-400">$97.50</span>
                </div>
              </div>
              <p className="mt-6 text-indigo-200 text-sm leading-relaxed">
                The stock must fall <strong>7.1%</strong> (from $105 to $97.50) just to recover your initial cost. This highlights the low probability nature of the trade.
              </p>
            </div>
          </div>
        </div>

        {/* The Greeks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GreekCard 
            greek="Delta (Δ)" 
            symbol="Δ"
            color="bg-blue-500"
            description="Measures price change relative to the stock. For puts, it's negative (-0.50 means +$0.50 gain if stock drops $1)."
            impact="Probability Gauge"
          />
          <GreekCard 
            greek="Gamma (Γ)" 
            symbol="Γ"
            color="bg-purple-500"
            description="The acceleration of value. Gamma increases your gains faster as the stock drops further into the money."
            impact="Explosive Upside"
          />
          <GreekCard 
            greek="Theta (Θ)" 
            symbol="Θ"
            color="bg-rose-500"
            description="Time decay. The rate at which your option loses value every day, strictly due to the passage of time."
            impact="The Ticking Clock"
          />
          <GreekCard 
            greek="Vega (ν)" 
            symbol="ν"
            color="bg-emerald-500"
            description="Sensitivity to volatility. Value rises when market fear (IV) increases, even if price doesn't move."
            impact="Fear Hedge"
          />
        </div>
      </section>

      {/* Scenario Analysis Section */}
      <section className="bg-slate-50 py-24 px-6 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <SectionHeader 
            title="Scenario Analysis" 
            subtitle="Visualizing the asymmetry. Capped risk with unlimited downside profit potential."
            icon={BarChart2}
            colorClass="text-emerald-600 bg-emerald-600"
          />
          
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Microscope size={20} className="text-emerald-400"/>
                Trade Simulation: Buying 1 Put Contract
              </h3>
              <p className="text-slate-400 text-sm mt-2">Strike: $100 | Cost: $2.00 ($200 Total) | Expiry: Today</p>
            </div>
            
            <ScenarioRow isHeader price="" pnl={0} percent="" note="" />
            
            <div className="divide-y divide-slate-100">
              <ScenarioRow price="110.00" pnl={-200} percent="-100%" note="Max Loss (Premium Only)" />
              <ScenarioRow price="100.00" pnl={-200} percent="-100%" note="Expired ATM (Worthless)" />
              <ScenarioRow price="98.00" pnl={0} percent="0%" note="Breakeven Point" />
              <ScenarioRow price="95.00" pnl={300} percent="+150%" note="3x Leverage Effect" />
              <ScenarioRow price="90.00" pnl={800} percent="+400%" note="Major Crash Scenario" />
              <ScenarioRow price="80.00" pnl={1800} percent="+900%" note="Black Swan Event" />
            </div>
            
            <div className="p-4 bg-slate-50 text-xs text-slate-500 text-center border-t border-slate-200">
              *Calculations assume value at expiration. Intra-day values will vary based on Volatility and Time.
            </div>
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="Strategic Motivations" 
            subtitle="Why do participants enter this trade? The duality of Fear vs. Greed."
            icon={Target}
            colorClass="text-indigo-600 bg-indigo-600"
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            <StrategyCard 
              title="Hedging (Fear)"
              icon={Shield}
              description="Buying insurance for a portfolio. The goal is not profit, but survival during a crash to prevent forced liquidation of long-term holdings."
              mechanism="Counter-cyclical Correlation. Gains in the put offset losses in the underlying portfolio."
              cost="Negative Carry. Like fire insurance, you expect to lose the premium annually (drag on performance)."
              tags={['Portfolio Protection', 'Married Put', 'Tail Risk']}
            />
            
            <StrategyCard 
              title="Speculation (Greed)"
              icon={TrendingDown}
              description="Leveraged betting on a price decline. Seeking 'lottery-ticket' returns during earnings or macro shocks."
              mechanism="Asymmetric Convexity. Limited downside (premium) with massive upside potential (10x-100x)."
              cost="Time Decay (Theta). The clock is ticking against the bet immediately upon entry."
              tags={['Directional Bet', 'Leverage', 'Volatility Play']}
            />
          </div>
        </div>
      </section>

      {/* Trade Signals Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-50 border-y border-slate-200">
        <SectionHeader 
          title="Trade Signals" 
          subtitle="When to pull the trigger. Indicators that align probability with potential."
          icon={Crosshair}
          colorClass="text-rose-500 bg-rose-500"
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          <IndicatorCard 
            title="Technical Setup"
            type="Timing"
            color="#f43f5e"
            items={[
              "Breaking Major Support: Price closes below a 200-day Moving Average or key horizontal level.",
              "Bearish Divergence: Price makes a higher high, but RSI makes a lower high.",
              "Bear Flag Pattern: Consolidation after a sharp drop, signaling continuation downward.",
              "Death Cross: 50 MA crossing below 200 MA."
            ]}
          />
          
          <IndicatorCard 
            title="Macro Environment"
            type="Context"
            color="#6366f1"
            items={[
              "Yield Curve Inversion: 10Y-2Y Treasury spread goes negative (recession precursor).",
              "High Valuations: Market P/E Ratio > 25x historical averages.",
              "Tightening Liquidity: Central Banks raising rates or reducing balance sheet (QT).",
              "Deteriorating Earnings: Consecutive quarters of declining corporate guidance."
            ]}
          />
          
          <IndicatorCard 
            title="Volatility (VIX)"
            type="Cost Basis"
            color="#10b981"
            items={[
              "Low VIX (<13): Options are 'cheap'. Ideal time to buy long-dated hedges (LEAPS).",
              "High VIX (>30): Options are expensive. Buying puts here requires a massive crash to profit.",
              "VIX Spike: Sudden jump in VIX often marks the beginning of panic selling."
            ]}
          />
        </div>
      </section>

      {/* Market Demographics */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader 
          title="Market Demographics" 
          subtitle="Who is on the bid? Understanding the structural flows."
          icon={User}
          colorClass="text-teal-600 bg-teal-600"
        />
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Tabs */}
          <div className="flex md:flex-col gap-3 md:w-1/4">
            {['retail', 'institutional', 'makers'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-5 text-left rounded-xl transition-all font-semibold ${
                  activeTab === tab 
                    ? 'bg-teal-50 text-teal-700 shadow-md ring-1 ring-teal-200 translate-x-2' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {tab === 'retail' ? 'Retail Traders' : tab === 'institutional' ? 'Institutions' : 'Market Makers'}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="md:w-3/4 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[300px]">
            {activeTab === 'retail' && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-full">
                    <User size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">The "Lottery" Seekers</h3>
                </div>
                <p className="text-slate-600 mb-6 text-lg">
                  Retail participation often focuses on short-term (0DTE) and deep OTM puts. These are "cheap" in dollar terms but statistically have a negative expected return due to low probability of success.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs uppercase mb-2 tracking-wider">Favorite Instrument</h4>
                    <p className="text-slate-700 font-medium">0DTE & Weekly Options</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs uppercase mb-2 tracking-wider">Motivation</h4>
                    <p className="text-slate-700 font-medium">Speculation & Leverage</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'institutional' && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                    <Landmark size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">The Structural Hedgers</h3>
                </div>
                <p className="text-slate-600 mb-6 text-lg">
                  Pension funds and insurers use puts as a budgeted "overlay" cost. They are often price-insensitive buyers of long-term protection (LEAPS) to satisfy regulatory requirements or internal risk mandates.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs uppercase mb-2 tracking-wider">Key Players</h4>
                    <p className="text-slate-700 font-medium">Pension Funds, Insurers, Hedge Funds</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs uppercase mb-2 tracking-wider">Strategy</h4>
                    <p className="text-slate-700 font-medium">Systematic Overlay & Tail Risk Hedging</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'makers' && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                    <BarChart2 size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">The Liquidity Providers</h3>
                </div>
                <p className="text-slate-600 mb-6 text-lg">
                  Market makers sell the puts that others buy. They do not take directional risk; they hedge immediately by shorting stock. This mechanical selling can create feedback loops ("Gamma Squeeze" to the downside).
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs uppercase mb-2 tracking-wider">Role</h4>
                    <p className="text-slate-700 font-medium">Seller / Counterparty</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs uppercase mb-2 tracking-wider">Risk Mgmt</h4>
                    <p className="text-slate-700 font-medium">Delta Hedging (Shorting Stock)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Expensive Section */}
      <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-rose-500 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-rose-500 bg-opacity-20 text-rose-300 rounded-full text-xs font-bold uppercase mb-6 tracking-widest">
              Market Microstructure
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The "Crash Premium": Why Puts Cost More
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Puts are not priced fairly. They trade at a structural premium to Calls due to the "Variance Risk Premium." Here is the breakdown of why you pay extra for downside protection.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Card 1: The Skew */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 relative hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
                <TrendingDown size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">1. The Volatility Skew</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Before 1987, options pricing was symmetrical (a "smile"). After the Black Monday crash, the market permanently adjusted. Now, deep OTM Puts have significantly higher Implied Volatility (IV) than OTM Calls.
              </p>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-700/50">
                <div className="flex justify-between text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">
                  <span>Strike</span>
                  <span>Implied Vol.</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-indigo-400">10% OTM Call</span>
                  <span className="font-mono text-indigo-400">12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-rose-400">10% OTM Put</span>
                  <span className="font-mono text-rose-400 font-bold">22%</span>
                </div>
              </div>
            </div>
            
            {/* Card 2: Correlation Risk */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 relative hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center mb-6 text-rose-400">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Correlation Risk</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                In a bull market, stocks move independently. In a crash, <em className="text-white font-semibold">correlations go to 1</em>. Everything falls together. Puts are the only asset class that reliably acts as a hedge when diversification fails.
              </p>
              <div className="h-24 flex items-end gap-1">
                {[40, 60, 30, 70, 45, 20].map((h, i) => (
                  <div key={i} style={{height: `${h}%`}} className="w-full bg-slate-700 rounded-t-sm"></div>
                ))}
                <div className="w-full bg-rose-500 h-full rounded-t-sm flex items-end justify-center pb-2 text-xs font-bold">Put</div>
              </div>
              <p className="text-center text-xs text-slate-500 mt-2">Asset Performance During Crash</p>
            </div>
            
            {/* Card 3: Market Maker Reality */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 relative hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
                <Building size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">3. The Seller's Burden</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Who sells you the put? Usually a Market Maker. If the market crashes, they lose money on the put AND the liquidity dries up, making it hard for them to hedge. They charge a "difficulty surcharge" for this risk.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span>Hard to hedge fast drops (Gap Risk)</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span>Capital intensive requirements</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span>Regulatory pressure on banks</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 text-center md:text-left">
                <h4 className="text-2xl font-bold text-white mb-2">The Insurance Analogy</h4>
                <p className="text-slate-400 text-sm">Understanding Negative Expected Value (-EV)</p>
              </div>
              <div className="md:w-2/3 border-l border-slate-700 pl-0 md:pl-8">
                <p className="text-slate-300 leading-relaxed">
                  Buying a put is exactly like buying house insurance. You pay a premium every year, and most years you "lose" that money because your house doesn't burn down. <br/><br/>
                  <span className="text-rose-400 font-bold">Key Insight:</span> You don't buy it to make money; you buy it so that if the worst happens, you survive. The market prices puts like insurance policies, not like lottery tickets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Matrix */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader 
          title="Selection Matrix" 
          subtitle="There is no 'perfect' strike. There are only trade-offs based on your timeline and objective."
          icon={Target}
          colorClass="text-amber-600 bg-amber-600"
        />
        
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left bg-white">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-6 font-bold text-slate-700">Objective</th>
                <th className="p-6 font-bold text-slate-700">Recommended Expiry</th>
                <th className="p-6 font-bold text-slate-700">Strike (Delta)</th>
                <th className="p-6 font-bold text-slate-700">Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 font-medium text-slate-900">Day Trading</td>
                <td className="p-6 text-slate-600">0-3 DTE</td>
                <td className="p-6">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">ATM (-0.50)</span>
                </td>
                <td className="p-6 text-slate-600 text-sm">Maximize Gamma for immediate price response. Avoid Time Decay by exiting same-day.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 font-medium text-slate-900">Swing Trading</td>
                <td className="p-6 text-slate-600">45-60 DTE</td>
                <td className="p-6">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">OTM (-0.40)</span>
                </td>
                <td className="p-6 text-slate-600 text-sm">Optimal balance of cost vs. probability. Exiting at 21 DTE avoids the steepest part of the Theta curve.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 font-medium text-slate-900">Tail Risk Hedge</td>
                <td className="p-6 text-slate-600">120+ DTE</td>
                <td className="p-6">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">Deep OTM (-0.10)</span>
                </td>
                <td className="p-6 text-slate-600 text-sm">"Catastrophe insurance." Only pays on market collapse (20%+ drop). Low cost of carry.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 font-medium text-slate-900">IV Speculation</td>
                <td className="p-6 text-slate-600">60+ DTE</td>
                <td className="p-6">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">ATM (-0.50)</span>
                </td>
                <td className="p-6 text-slate-600 text-sm">Maximize Vega exposure to profit from rising fear/volatility, rather than just price movement.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Exit Management */}
      <section className="bg-slate-50 py-24 px-6 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            title="Exit Protocols" 
            subtitle="Amateurs focus on entry. Professionals focus on the exit."
            icon={LogOut}
            colorClass="text-purple-600 bg-purple-600"
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-emerald-500">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-500"/>
                Taking Profit
              </h3>
              <ul className="space-y-4">
                <li className="text-slate-600 text-sm">
                  <strong className="text-slate-800">The 50% Rule:</strong> For swing trades, close at 50% profit. The probability of doubling your money is significantly lower than making 50%.
                </li>
                <li className="text-slate-600 text-sm">
                  <strong className="text-slate-800">Gamma Scalping:</strong> In strong downtrends, sell puts against your core position to lock in gains while maintaining exposure.
                </li>
                <li className="text-slate-600 text-sm">
                  <strong className="text-slate-800">Target Hit:</strong> Exit immediately if the stock hits your technical support target. Do not be greedy.
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-rose-500">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertOctagon size={20} className="text-rose-500"/>
                Stopping Loss
              </h3>
              <ul className="space-y-4">
                <li className="text-slate-600 text-sm">
                  <strong className="text-slate-800">50% Premium Loss:</strong> If the option loses half its value, the thesis is likely wrong. Cut it.
                </li>
                <li className="text-slate-600 text-sm">
                  <strong className="text-slate-800">Time Limit:</strong> If the stock hasn't moved in your direction within 50% of your hold time, exit. Time decay (Theta) will accelerate.
                </li>
                <li className="text-slate-600 text-sm">
                  <strong className="text-slate-800">Reversal:</strong> If price reclaims the broken support level, the breakdown has failed. Exit immediately.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pitfalls & FAQ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader 
            title="Common Pitfalls" 
            subtitle="The path is fraught with traps. Avoid these common mistakes."
            icon={AlertTriangle}
            colorClass="text-rose-600 bg-rose-600"
          />
          
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <AccordionItem 
              title="1. The IV Crush (Earnings Trap)" 
              isOpen={openPitfall === 0} 
              onClick={() => setOpenPitfall(openPitfall === 0 ? -1 : 0)}
            >
              <p className="mb-3">
                <strong className="text-rose-600">The Trap:</strong> Buying puts right before a known event like earnings. Implied Volatility is pumped up to price in the move.
              </p>
              <p>
                When the event passes, uncertainty vanishes. IV collapses. Even if the stock drops, the massive drop in option premium (Vega loss) can outweigh the stock price gain (Delta gain), resulting in a loss on a correct directional call.
              </p>
            </AccordionItem>
            
            <AccordionItem 
              title="2. The Slow Grind (Theta Burn)" 
              isOpen={openPitfall === 1} 
              onClick={() => setOpenPitfall(openPitfall === 1 ? -1 : 1)}
            >
              <p className="mb-3">
                <strong className="text-rose-600">The Trap:</strong> Being right, but early. Puts need velocity.
              </p>
              <p>
                If the market drifts down slowly, it might not outpace the daily rent you pay (Theta). A stock dropping 1% a week might still result in a 100% loss on your options if the expiry is too close.
              </p>
            </AccordionItem>
            
            <AccordionItem 
              title="3. Over-Leveraging" 
              isOpen={openPitfall === 2} 
              onClick={() => setOpenPitfall(openPitfall === 2 ? -1 : 2)}
            >
              <p className="mb-3">
                <strong className="text-rose-600">The Trap:</strong> Treating puts like stocks.
              </p>
              <p>
                Because contracts are cheap ($500 vs $10,000 for stock), traders buy too many. A 100% loss is common in options. Allocate no more than 1-2% of total portfolio capital to speculative put buying.
              </p>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* Academic Corner */}
      <section className="bg-slate-50 py-16 px-6 border-t border-slate-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-indigo-100 text-indigo-700 rounded-full">
            <BookOpen size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Academic Research Insights</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Research by <span className="font-semibold text-slate-800">Bondarenko (2014)</span> and others highlights that put options have statistically significant <strong>negative expected returns</strong> (-40% annualized on average). This is the "insurance premium" paid by hedgers to speculators.
            </p>
            <p className="text-slate-500 text-sm">
              <em>Theory: Put-Call Parity failure during high stress events leads to structural overpricing of OTM puts.</em>
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action - Podcast & Google Doc */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-6 mb-8">
            <Shield size={24} className="hover:text-white transition-colors"/>
            <Activity size={24} className="hover:text-white transition-colors"/>
            <Target size={24} className="hover:text-white transition-colors"/>
          </div>
          <p className="text-sm mb-6">
            Synthesized from market microstructure analysis, Black-Scholes pricing models, and behavioral finance studies on loss aversion.
          </p>
          <div className="h-px w-20 bg-slate-700 mx-auto mb-6"></div>
          <p className="text-xs text-slate-500">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
