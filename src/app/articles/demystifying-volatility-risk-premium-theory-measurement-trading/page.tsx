'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, ShieldAlert, Activity, BarChart3, PieChart, ChevronRight, Brain, LineChart, DollarSign, AlertTriangle, ScrollText, Sigma, Scale, History, ChevronDown, ChevronUp, Music } from 'lucide-react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ReferenceLine } from 'recharts';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- MOCK DATA ---
const enhancedVrpData = [
  { date: '2022-Q1', iv: 22.5, rv: 18.2, vrp: 4.3 },
  { date: '2022-Q2', iv: 26.0, rv: 24.5, vrp: 1.5 },
  { date: '2022-Q3', iv: 24.0, rv: 21.0, vrp: 3.0 },
  { date: '2022-Q4', iv: 23.0, rv: 20.0, vrp: 3.0 },
  { date: '2023-Q1', iv: 19.0, rv: 15.0, vrp: 4.0 },
  { date: '2023-Q2', iv: 16.5, rv: 12.5, vrp: 4.0 },
  { date: '2023-Q3', iv: 15.0, rv: 11.0, vrp: 4.0 },
  { date: '2023-Q4', iv: 14.0, rv: 10.0, vrp: 4.0 },
  { date: '2024-Q1', iv: 13.5, rv: 9.5, vrp: 4.0 },
];

const historicalEpisodes = [
  { event: '1987 Crash', ivSpike: '>150%', vrpState: 'Deeply Negative', recovery: 'Months' },
  { event: '2008 GFC', ivSpike: '~80%', vrpState: 'Sustained Negative', recovery: 'Years' },
  { event: '2018 Volmageddon', ivSpike: '~50 (from 10)', vrpState: 'Massive 1-Day Loss', recovery: 'Weeks' },
  { event: '2020 Covid', ivSpike: '~85%', vrpState: 'Deeply Negative', recovery: 'Quarters' },
];

const strategyComparison = [
  { name: 'Short Put (ATM)', yield: 'High', risk: 'High (Equity Beta ~0.6)', sharpe: '0.6 - 0.8', complexity: 'Low' },
  { name: 'Short Straddle', yield: 'Very High', risk: 'Extreme (Gamma Risk)', sharpe: '0.4 - 0.7', complexity: 'Medium' },
  { name: 'Iron Condor', yield: 'Medium', risk: 'Defined (Capped)', sharpe: '0.5 - 0.9', complexity: 'Medium' },
  { name: 'Variance Swaps', yield: 'Purest', risk: 'Convex (Vega^2)', sharpe: 'Institutional', complexity: 'High' },
];

// --- SHARED COMPONENTS ---
const SectionHeading = ({ title, subtitle, icon: Icon, color = "indigo" }: any) => (
  <div className="mb-12">
    <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold bg-${color}-100 text-${color}-700 mb-4`}>
      <Icon className="w-4 h-4 mr-2" />
      {subtitle}
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
  </div>
);

const ExpandableCard = ({ title, icon: Icon, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center">
          <div className={`p-3 rounded-xl bg-indigo-50 text-indigo-600 mr-4`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-8 pt-2 border-t border-slate-50">
          <div className="text-slate-600 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN TAB CONTENT COMPONENTS ---
const Navigation = ({ activeTab, setActiveTab }: any) => {
  const tabs = [
    { id: 'home', label: 'Overview', icon: PieChart },
    { id: 'theory', label: 'Deep Theory', icon: Brain },
    { id: 'calculation', label: 'Math & Models', icon: Sigma },
    { id: 'strategies', label: 'Strategies & Risks', icon: TrendingUp },
    { id: 'research', label: 'Literature Review', icon: ScrollText },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="p-2 bg-indigo-600 rounded-lg mr-3 shadow-sm group-hover:bg-indigo-700 transition-colors">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              VRP<span className="text-indigo-600">Lab</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-100 py-2 bg-white px-4 space-x-2 no-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`flex-shrink-0 px-3 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium ${
              activeTab === tab.id ? 'text-indigo-700 bg-indigo-50 ring-1 ring-indigo-100' : 'text-slate-600 bg-slate-50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const HomeContent = ({ setActiveTab }: any) => (
  <div className="bg-slate-50/50 min-h-screen">
    {/* Enhanced Hero */}
    <div className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Demystifying the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient-x">
              Volatility Risk Premium
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-10">
            The persistent tendency for <strong>Implied Volatility</strong> (market fear) to exceed subsequent <strong>Realized Volatility</strong> (actual market movement).
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setActiveTab('theory')} 
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200/50 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center"
            >
              Start with Theory <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => setActiveTab('strategies')} 
              className="px-6 py-3 rounded-xl bg-white text-slate-700 font-bold border-2 border-slate-200 hover:border-indigo-200 hover:text-indigo-600 transition-all"
            >
              See How It&apos;s Traded
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Key Concepts Grid */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
            <DollarSign className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Economic Value</h3>
          <p className="text-slate-600 leading-relaxed">
            VRP is compensation for selling &quot;crash insurance&quot;. Like any insurer, you profit most of the time, but must be capitalized to survive the inevitable disasters.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Statistical Edge</h3>
          <p className="text-slate-600 leading-relaxed">
            Historically, VIX has traded ~4 points higher than subsequent realized volatility on average. This spread is the &quot;edge&quot; captured by option sellers.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-rose-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">The Catch (Skew)</h3>
          <p className="text-slate-600 leading-relaxed">
            Returns are negatively skewed. You make small gains frequently, but face rare, massive losses (e.g., 2008, 2020) that can wipe out years of premium.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-white py-24 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[450px] bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-inner">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Visualizing the Spread</h3>
              <p className="text-slate-500">Implied (Forecast) vs. Realized (Actual) Volatility</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div> IV (VIX)
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div> RV (Realized)
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={enhancedVrpData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIvEnhanced" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRvEnhanced" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{fill: '#64748b'}} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '16px'}}
                itemStyle={{padding: '4px 0'}}
                formatter={(value: any, name: any) => [value.toFixed(1) + '%', name === 'iv' ? 'Implied Vol (VIX)' : name === 'rv' ? 'Realized Vol' : 'Premium Spread']}
              />
              <Area type="monotone" dataKey="iv" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIvEnhanced)" activeDot={{r: 8}} />
              <Area type="monotone" dataKey="rv" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRvEnhanced)" activeDot={{r: 8}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  </div>
);

const TheoryContent = () => (
  <div className="bg-slate-50 min-h-screen py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Deep Theory & Drivers" subtitle="Why The Premium Persists" icon={Brain} />
      
      <div className="space-y-6">
        <ExpandableCard title="1. Risk-Based Explanations (Rational)" icon={ShieldAlert} defaultOpen={true}>
          <p>In classical finance, VRP is not a &quot;free lunch&quot; but fair compensation for bearing undiversifiable risk.</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Jump Risk:</strong> Markets don&apos;t just move smoothly (Brownian motion); they gap down. Option sellers must be compensated for the risk of overnight gaps where they cannot delta-hedge.</li>
            <li><strong>Correlation Risk:</strong> In crises, correlations go to 1. Diversification fails exactly when you need it most. Selling index volatility is implicitly shorting this correlation spike.</li>
            <li><strong>Vega Convexity:</strong> As volatility rises, option prices rise non-linearly. Sellers are &quot;short convexity,&quot; meaning their losses accelerate as things get worse.</li>
          </ul>
        </ExpandableCard>

        <ExpandableCard title="2. Behavioral Explanations (Irrational)" icon={Brain}>
          <p>Investors may irrationally overpay for options due to cognitive biases, creating excess premium for rational sellers.</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Prospect Theory & Loss Aversion:</strong> Investors feel the pain of a loss roughly twice as acutely as the joy of an equivalent gain. They overpay for puts to avoid this pain, even if mathematically suboptimal.</li>
            <li><strong>Lottery Preference:</strong> Conversely, investors love assets with huge potential upside (like far OTM calls or VIX calls). They overpay for these &quot;lottery tickets,&quot; subsidizing the sellers.</li>
            <li><strong>Recency Bias:</strong> After a crash, IV stays elevated for a long time as investors assume another crash is imminent, even if the fundamental risk has passed.</li>
          </ul>
        </ExpandableCard>

        <ExpandableCard title="3. Structural & Institutional Limits to Arbitrage" icon={Scale}>
          <p>Even if VRP is &quot;too high,&quot; institutions might be unable to arbitrage it away due to real-world constraints.</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Net-Long Bias:</strong> The vast majority of global wealth (pensions, sovereign wealth, endowments) is naturally long equities. They are natural <em>buyers</em> of protection. The natural <em>sellers</em> (hedge funds, market makers) have much less capital capacity.</li>
            <li><strong>Leverage Constraints:</strong> Shorting volatility is capital-intensive. Prime brokers may increase margin requirements exactly during crises (margin calls), forcing rational arbitrageurs to liquidate positions at the worst possible time (De-leveraging cycles).</li>
            <li><strong>Agency Issues:</strong> A portfolio manager might know selling puts is profitable long-term, but they cannot afford the career risk of a 40% drawdown in one month if a crash happens on their watch.</li>
          </ul>
        </ExpandableCard>
      </div>
    </div>
  </div>
);

const CalculationContent = () => (
  <div className="bg-slate-50 min-h-screen py-16">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Math & Models" subtitle="Quantifying the Premium" icon={Sigma} color="violet" />
      
      <div className="grid gap-8">
        {/* Simple Definition */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">1. The Practitioner&apos;s Spread (Ex-Post)</h3>
          <p className="text-slate-600 mb-6">
            The simplest way to view historic VRP is the difference between what the market <em>expected</em> (VIX) and what <em>happened</em> (Realized Vol).
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 font-mono text-lg text-center md:text-left flex flex-col md:flex-row items-center justify-around">
            <div className="mb-4 md:mb-0">
              <span className="text-indigo-600 font-bold">VRP<sub>t</sub></span> = <span className="text-slate-700">IV<sub>t</sub></span> - <span className="text-emerald-600">RV<sub>t, t+30</sub></span>
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-indigo-50 rounded-xl text-indigo-800">
              <strong>IV (Implied Volatility):</strong> Usually VIX. It is a <em>forward-looking</em> 30-day estimate derived from SPX option prices.
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl text-emerald-800">
              <strong>RV (Realized Volatility):</strong> The standard deviation of daily log-returns of the SPX over the <em>subsequent</em> 30 days, annualized.
            </div>
          </div>
        </div>

        {/* Academic Definition */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">2. The Academic Variance Risk Premium (Ex-Ante)</h3>
          <p className="text-slate-600 mb-6">
            Academics prefer &quot;Variance&quot; over &quot;Volatility&quot; because Variance Swaps can be perfectly replicated statically. It&apos;s defined as the difference between Risk-Neutral (ℚ) and Real-World (ℙ) expectations of future variance.
          </p>
          <div className="overflow-x-auto">
            <div className="bg-slate-900 p-8 rounded-2xl text-white font-mono text-lg md:text-xl text-center my-6">
              VRP<sub>t</sub> = E<sup>ℚ</sup><sub>t</sub>[∫<sub>t</sub><sup>T</sup> σ<sup>2</sup><sub>s</sub> ds] - E<sup>ℙ</sup><sub>t</sub>[∫<sub>t</sub><sup>T</sup> σ<sup>2</sup><sub>s</sub> ds]
            </div>
          </div>
          <div className="space-y-6 mt-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center font-bold text-violet-700">ℚ</div>
              <div>
                <h4 className="font-bold text-slate-900">Risk-Neutral Expectation (E<sup>ℚ</sup>)</h4>
                <p className="text-slate-600">Observed directly from market prices. The VIX squared (VIX²) is essentially the 30-day risk-neutral expectation of variance.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-700">ℙ</div>
              <div>
                <h4 className="font-bold text-slate-900">Physical Expectation (E<sup>ℙ</sup>)</h4>
                <p className="text-slate-600">Must be forecasted. Quant models use high-frequency data, GARCH models, or simple moving averages (like 20-day historical variance) to estimate this.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StrategiesContent = () => (
  <div className="bg-slate-50 min-h-screen py-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Strategies & Risks" subtitle="Harvesting The Premium" icon={TrendingUp} color="emerald" />
      
      {/* Strategy Comparison Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-16">
        <div className="p-8 pb-4">
          <h3 className="text-2xl font-bold text-slate-900">Comparison of Harvesting Methods</h3>
          <p className="text-slate-500 mt-2">Different ways to structure the trade, from retail to institutional.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Strategy</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Yield Potential</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Primary Risks</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {strategyComparison.map((strat, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{strat.name}</td>
                  <td className="px-6 py-4 text-slate-600">{strat.yield}</td>
                  <td className="px-6 py-4 text-slate-600">{strat.risk}</td>
                  <td className="px-6 py-4 text-slate-600 hidden md:table-cell">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      strat.complexity === 'Low' ? 'bg-emerald-100 text-emerald-800' : 
                      strat.complexity === 'Medium' ? 'bg-amber-100 text-amber-800' : 
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {strat.complexity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Dive: Volmageddon */}
      <div className="bg-rose-50 rounded-3xl p-8 md:p-12 border border-rose-100 mb-16">
        <div className="flex items-start mb-8">
          <div className="bg-rose-600 p-3 rounded-xl mr-4 shrink-0">
            <History className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Case Study: &quot;Volmageddon&quot; (Feb 2018)</h2>
            <p className="text-lg text-rose-900/70">The day the VRP trade blew up. An object lesson in &quot;Gamma&quot; and &quot;Rebalancing&quot; risk.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose prose-rose">
            <p>For years, shorting VIX ETPs (like XIV) was a &quot;money printer&quot; due to persistent VRP and VIX futures contango. On <strong>Feb 5, 2018</strong>, the S&P 500 dropped ~4%. Normally, VIX might rise 15-20%.</p>
            <p>However, leveraged VIX products had to rebalance end-of-day by buying VIX futures. The market sniffed this out. Liquidity evaporated, and VIX futures spiked from ~16 to ~34 in minutes after market close.</p>
            <p className="font-bold">Result: The XIV fund lost ~96% of its value in one hour and was liquidated. Standard VRP strategies suffered massive, though recoverable, drawdowns.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100">
            <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 text-center">VIX Spike - Feb 2018</h4>
            <ResponsiveContainer width="100%" height={200}>
              <ReLineChart data={[
                {d: 'Feb 1', v: 13.47}, 
                {d: 'Feb 2', v: 17.31}, 
                {d: 'Feb 5', v: 37.32}, 
                {d: 'Feb 6', v: 29.98}, 
                {d: 'Feb 9', v: 29.06}
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" tick={{fontSize: 12}} />
                <YAxis domain={[0, 40]} />
                <Line type="monotone" dataKey="v" stroke="#e11d48" strokeWidth={3} dot={{r: 4}} />
                <ReferenceLine y={13.47} stroke="#94a3b8" strokeDasharray="3 3" label="Normal Levels" />
              </ReLineChart>
            </ResponsiveContainer>
            <p className="text-xs text-center text-slate-400 mt-4">The largest single-day % move in VIX history at the time.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ResearchContent = () => (
  <div className="bg-slate-50 min-h-screen py-16">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Literature Review" subtitle="Seminal Academic Work" icon={BookOpen} color="blue" />
      
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {/* Paper 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <h3 className="font-bold text-slate-900">Carr & Wu (2009)</h3>
              <time className="font-mono text-xs text-slate-500">RFS</time>
            </div>
            <div className="text-indigo-600 font-medium text-sm mb-3">&quot;Variance Risk Premia&quot;</div>
            <p className="text-slate-600 text-sm">
              <strong>Contribution:</strong> The definitive paper establishing standard methods for measuring VRP using synthetic variance swaps. Found VRP is strongly negative (investors pay to hedge variance) and predicts future equity returns.
            </p>
          </div>
        </div>

        {/* Paper 2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <h3 className="font-bold text-slate-900">Bakshi & Kapadia (2003)</h3>
              <time className="font-mono text-xs text-slate-500">RFS</time>
            </div>
            <div className="text-indigo-600 font-medium text-sm mb-3">&quot;Delta-Hedged Gains and the Negative Market Volatility Risk Premium&quot;</div>
            <p className="text-slate-600 text-sm">
              <strong>Contribution:</strong> Showed that even after delta-hedging to remove directional risk, short option positions earn positive average returns, confirming vol itself is priced.
            </p>
          </div>
        </div>

        {/* Paper 3 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <h3 className="font-bold text-slate-900">Bollerslev, Tauchen, Zhou (2009)</h3>
              <time className="font-mono text-xs text-slate-500">RFS</time>
            </div>
            <div className="text-indigo-600 font-medium text-sm mb-3">&quot;Expected Stock Returns and Variance Risk Premia&quot;</div>
            <p className="text-slate-600 text-sm">
              <strong>Contribution:</strong> Linked VRP to macroeconomic uncertainty. Found that VRP (the difference between IV and realized vol forecast) is one of the best short-term predictors of aggregate stock market returns (better than P/E ratios).
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 bg-slate-900 rounded-3xl p-10 text-slate-300">
        <h3 className="text-white text-2xl font-bold mb-6">Ongoing Debates & Frontiers</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <Brain className="w-5 h-5 mr-3 text-indigo-400 shrink-0 mt-1" />
            <span><strong>VRP Timing:</strong> Can we time the VRP strategy? Some research suggests increasing exposure when the VRP spread is exceptionally wide and reducing it when narrow.</span>
          </li>
          <li className="flex items-start">
            <Activity className="w-5 h-5 mr-3 text-indigo-400 shrink-0 mt-1" />
            <span><strong>Alternative Assets:</strong> Does VRP exist in bond markets (MOVE index), currencies, or crypto? (Spoiler: Yes, often even stronger in crypto due to intense retail demand for leverage).</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function VolatilityRiskPremiumArticle() {
  const [activeTab, setActiveTab] = useState('home');
  const currentArticle = articles.find(article => article.slug === 'demystifying-volatility-risk-premium-theory-measurement-trading');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeContent setActiveTab={setActiveTab} />;
      case 'theory': return <TheoryContent />;
      case 'strategies': return <StrategiesContent />;
      case 'research': return <ResearchContent />;
      case 'calculation': return <CalculationContent />;
      default: return <HomeContent setActiveTab={setActiveTab} />;
    }
  };

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

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-800">
        <style>{`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% auto;
            animation: gradient-x 5s ease infinite;
          }
          /* Hide scrollbar for mobile nav */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>

        {/* Return to Home Button */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-20 left-4 z-50">
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
            Deep Research
          </div>
        </div>

        {/* Options Badge */}
        <div className="absolute bottom-4 right-4 z-50">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
            Options
          </div>
        </div>

        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="animate-in fade-in duration-300">
          {renderContent()}
        </main>

        {/* Call-to-Action Section with Google Doc Link */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Continue Your Deep Research</h3>
            <p className="text-lg text-slate-600 mb-8">
              Explore the complete academic analysis with detailed mathematical derivations, empirical evidence, and institutional trading frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>
        </div>

        <footer className="bg-white py-8 border-t border-slate-200 text-center text-slate-500 text-sm">
          © 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
        </footer>
      </div>
    </>
  );
}
