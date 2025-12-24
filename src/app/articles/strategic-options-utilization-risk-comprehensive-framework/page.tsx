'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, TrendingUp, DollarSign, Activity, AlertTriangle, Zap, Layers, MousePointerClick, BookOpen, PieChart, Target, AlertOctagon, Clock, ArrowRightCircle, XCircle, CheckCircle2, GitCommit, BarChart2, Lock, Unlock, RefreshCw, FileText, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Components ---
const SectionTitle = ({ children, color = "text-gray-900" }: { children: React.ReactNode; color?: string }) => (
  <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${color} tracking-tight`}>{children}</h2>
);

const Card = ({ title, children, icon: Icon, colorClass = "bg-white", accentColor = "blue" }: { 
  title: string; 
  children: React.ReactNode; 
  icon?: React.ComponentType<any>; 
  colorClass?: string; 
  accentColor?: string; 
}) => (
  <div className={`relative overflow-hidden rounded-2xl shadow-lg border border-gray-100 ${colorClass} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
    <div className={`absolute top-0 right-0 p-4 opacity-10`}>
      {Icon && <Icon size={64} className={`text-${accentColor}-600`} />}
    </div>
    <div className="relative z-10">
      <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 bg-${accentColor}-50 text-${accentColor}-600`}>
        {Icon && <Icon size={24} />}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </div>
  </div>
);

const GreekCard = ({ symbol, name, definition, rule, color }: {
  symbol: string;
  name: string;
  definition: string;
  rule: string;
  color: string;
}) => (
  <div className="bg-white rounded-xl shadow-md border-l-4 p-5 hover:shadow-lg transition-all" style={{ borderLeftColor: color }}>
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
      <span className="text-2xl font-serif text-gray-400 opacity-50">{symbol}</span>
    </div>
    <p className="text-sm text-gray-500 font-medium mb-3 uppercase tracking-wider">Definition</p>
    <p className="text-gray-700 mb-4">{definition}</p>
    <div className="bg-gray-50 rounded-lg p-3 text-sm">
      <span className="font-bold text-gray-900 block mb-1">Trader's Rule:</span>
      <span className="text-gray-600">{rule}</span>
    </div>
  </div>
);

const StrategyRow = ({ title, outlook, rationale, risk, type }: {
  title: string;
  outlook: string;
  rationale: string;
  risk: string;
  type: string;
}) => {
  const getBadgeColor = (t: string) => {
    switch(t) {
      case 'Bullish': return 'bg-green-100 text-green-700';
      case 'Bearish': return 'bg-red-100 text-red-700';
      case 'Neutral': return 'bg-blue-100 text-blue-700';
      default: return 'bg-purple-100 text-purple-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:border-indigo-300 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900">{title}</h4>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(type)}`}>{outlook}</span>
          </div>
          <p className="text-sm text-gray-600">{rationale}</p>
        </div>
        <div className="md:w-1/3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded border border-red-100">
          <strong>Risk:</strong> {risk}
        </div>
      </div>
    </div>
  );
};

const PayoffDiagram = ({ type }: { type: string }) => {
  // Simple SVG visualizations for payoff diagrams
  const renderPath = () => {
    switch(type) {
      case 'long_call': // Hockey stick up to right
        return <path d="M 10 80 L 50 80 L 90 10" stroke="#3b82f6" strokeWidth="3" fill="none" />;
      case 'long_put': // Hockey stick up to left
        return <path d="M 10 10 L 50 80 L 90 80" stroke="#ef4444" strokeWidth="3" fill="none" />;
      case 'covered_call': // Profit capped
        return <path d="M 10 80 L 50 40 L 90 40" stroke="#10b981" strokeWidth="3" fill="none" />;
      case 'iron_condor': // Profit in middle, loss on wings
        return <path d="M 10 80 L 30 80 L 40 40 L 60 40 L 70 80 L 90 80" stroke="#f59e0b" strokeWidth="3" fill="none" />;
      default: return null;
    }
  };

  return (
    <div className="h-32 w-full bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-100">
      <svg viewBox="0 0 100 100" className="w-full h-full p-4" preserveAspectRatio="none">
        {/* Axis */}
        <line x1="0" y1="80" x2="100" y2="80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 2" />
        {renderPath()}
      </svg>
      <div className="absolute bottom-1 left-2 text-[10px] text-gray-400">Stock Price &rarr;</div>
      <div className="absolute top-2 left-1 text-[10px] text-gray-400">Profit</div>
    </div>
  );
};

export default function StrategicOptionsUtilizationRisk() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'strategic-options-utilization-risk-comprehensive-framework');

  if (!currentArticle) {
    return <div>Article not found</div>;
  }

  return (
    <>
      {/* SEO Components - MANDATORY */}
      <StructuredData article={currentArticle} />
      <BreadcrumbStructuredData 
        articleTitle={currentArticle.title} 
        articleSlug={currentArticle.slug || 'strategic-options-utilization-risk-comprehensive-framework'} 
      />

      <div className="min-h-screen bg-slate-50 font-sans text-gray-800 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white relative overflow-hidden border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Strategic Options <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">Utilization & Risk</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
              A comprehensive framework for understanding when to deploy options for hedging, income, and speculation—and crucially, when to avoid them to preserve capital.
            </p>
          </div>
        </div>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/ln9KdrO.jpeg" 
              alt="Strategic Options Utilization Framework Infographic" 
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

        <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-24">
          {/* 1. Anatomy of a Contract */}
          <section>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-1">
                <SectionTitle>Anatomy of a Contract</SectionTitle>
                <p className="text-gray-600 text-lg">Before trading, you must decode the ticker. An option contract represents the right to buy or sell <strong>100 shares</strong> of the underlying asset.</p>
              </div>
              <div className="bg-gray-900 text-white p-6 rounded-xl font-mono text-xl md:text-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
                <span className="text-blue-400 font-bold">SPY</span> <span className="text-purple-400 mx-2">240119</span> <span className="text-green-400">C</span> <span className="text-yellow-400 mx-2">480.00</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border-t-4 border-blue-400 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1">Underlying</h4>
                <p className="text-xs text-gray-500">The stock or ETF (e.g., SPY) that the option controls.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border-t-4 border-purple-400 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1">Expiration</h4>
                <p className="text-xs text-gray-500">The date the contract ceases to exist. (YY/MM/DD).</p>
              </div>
              <div className="bg-white p-5 rounded-xl border-t-4 border-green-400 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1">Type</h4>
                <p className="text-xs text-gray-500"><strong>Call</strong> (Right to Buy) or <strong>Put</strong> (Right to Sell).</p>
              </div>
              <div className="bg-white p-5 rounded-xl border-t-4 border-yellow-400 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1">Strike Price</h4>
                <p className="text-xs text-gray-500">The specific price at which the deal is executed.</p>
              </div>
            </div>
          </section>

          {/* 2. Order Lifecycle Mechanics */}
          <section className="bg-indigo-50 rounded-3xl p-8 md:p-12">
            <SectionTitle color="text-indigo-900">Order Mechanics & Lifecycle</SectionTitle>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <Unlock size={20} /> Opening a Position
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-2">Buy To Open (BTO)</span>
                    <p className="text-sm text-gray-600">You pay a <strong>Debit</strong> to buy a Call or Put. You own the contract and control the rights.</p>
                    <p className="text-xs text-gray-400 mt-1">Max Risk: Amount Paid.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded mb-2">Sell To Open (STO)</span>
                    <p className="text-sm text-gray-600">You receive a <strong>Credit</strong> to sell (write) a contract. You are obligated to fulfill terms if assigned.</p>
                    <p className="text-xs text-gray-400 mt-1">Max Risk: Often Undefined or High.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <Lock size={20} /> Closing a Position
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-2">Sell To Close (STC)</span>
                    <p className="text-sm text-gray-600">Selling a contract you previously bought. This realizes your profit or loss.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded mb-2">Buy To Close (BTC)</span>
                    <p className="text-sm text-gray-600">Buying back a contract you previously wrote. This exits your obligation.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. The Core Decision Matrix */}
          <section>
            <div className="grid md:grid-cols-2 gap-12">
              {/* When TO Use */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-teal-100 rounded-lg text-teal-700">
                    <CheckCircle2 size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">When to Use Options</h2>
                </div>
                <div className="grid gap-4">
                  <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm flex gap-4">
                    <Shield className="text-teal-500 shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-gray-900">Hedging Risk</h3>
                      <p className="text-sm text-gray-600 mt-1">Protect existing positions from adverse price movements using Protective Puts.</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm flex gap-4">
                    <DollarSign className="text-teal-500 shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-gray-900">Income Generation</h3>
                      <p className="text-sm text-gray-600 mt-1">Sell Covered Calls or Cash-Secured Puts to extract yield from stagnant assets.</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm flex gap-4">
                    <TrendingUp className="text-teal-500 shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-gray-900">Speculation with Leverage</h3>
                      <p className="text-sm text-gray-600 mt-1">Control larger positions with less capital (LEAPS) for defined risk exposure.</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm flex gap-4">
                    <Activity className="text-teal-500 shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-gray-900">Volatility Betting</h3>
                      <p className="text-sm text-gray-600 mt-1">Profit from the magnitude of movement (or lack thereof) rather than just direction.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* When NOT TO Use */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-rose-100 rounded-lg text-rose-700">
                    <XCircle size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">When NOT to Use Options</h2>
                </div>
                <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 h-full">
                  <ul className="space-y-4">
                    {[
                      { title: "Get Rich Quick Schemes", desc: "Options require skill. Gambling mentality leads to ruin." },
                      { title: "Undefined Risk", desc: "Never trade what you can't afford to lose completely." },
                      { title: "Illiquid Markets", desc: "Wide bid-ask spreads instantly destroy statistical edge." },
                      { title: "Without a Strategy", desc: "Random buying leads to losses via Theta decay." },
                      { title: "Ignoring the Greeks", desc: "Don't trade instruments you don't mathematically understand." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <AlertTriangle className="text-rose-500 mt-1 shrink-0" size={18} />
                        <div>
                          <strong className="block text-gray-900">{item.title}</strong>
                          <span className="text-sm text-gray-700">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Detailed Strategic Pillars & Visuals */}
          <section>
            <div className="text-center mb-12">
              <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm">Strategic Applications</span>
              <SectionTitle>Four Pillars of Deployment</SectionTitle>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card title="Hedging" icon={Shield} accentColor="blue">
                <p className="mb-2"><strong>Goal:</strong> Portfolio Defense</p>
                <p className="text-sm mb-4">Transfer risk to a counterparty. Like fire insurance, you pay a premium to avoid catastrophic loss.</p>
                <PayoffDiagram type="long_put" />
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="block text-xs font-bold text-gray-500 uppercase">Key Strategies</span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">Protective Puts</span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Collars</span>
                </div>
              </Card>

              <Card title="Income" icon={DollarSign} accentColor="emerald">
                <p className="mb-2"><strong>Goal:</strong> Yield Enhancement</p>
                <p className="text-sm mb-4">Extract cash flow from stagnant assets. "Rent out" your stocks or cash to the market.</p>
                <PayoffDiagram type="covered_call" />
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="block text-xs font-bold text-gray-500 uppercase">Key Strategies</span>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded mr-2">Covered Calls</span>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">Cash-Secured Puts</span>
                </div>
              </Card>

              <Card title="Speculation" icon={Zap} accentColor="purple">
                <p className="mb-2"><strong>Goal:</strong> Leverage & Growth</p>
                <p className="text-sm mb-4">Use LEAPS to control large notional value with less capital. Defined risk with convex upside.</p>
                <PayoffDiagram type="long_call" />
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="block text-xs font-bold text-gray-500 uppercase">Key Strategies</span>
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2">LEAPS</span>
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Vertical Spreads</span>
                </div>
              </Card>

              <Card title="Volatility" icon={Activity} accentColor="orange">
                <p className="mb-2"><strong>Goal:</strong> Market Neutrality</p>
                <p className="text-sm mb-4">Treat volatility as an asset class. Profit from stasis (Iron Condor) or explosion (Straddles).</p>
                <PayoffDiagram type="iron_condor" />
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="block text-xs font-bold text-gray-500 uppercase">Key Strategies</span>
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mr-2">Iron Condors</span>
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Straddles</span>
                </div>
              </Card>
            </div>
          </section>

          {/* 5. Brokerage Approval Levels */}
          <section className="bg-white rounded-3xl p-8 border border-gray-200">
            <SectionTitle>Trading Approval Levels</SectionTitle>
            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 opacity-70">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-400">Level 1</span>
                  <Lock size={16} className="text-gray-300" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Covered</h4>
                <p className="text-sm text-gray-600">Covered Calls & Cash-Secured Puts. Lowest risk.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-600">Level 2</span>
                  <Unlock size={16} className="text-blue-500" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Long Options</h4>
                <p className="text-sm text-gray-600">Buying Calls & Puts. Defined risk (premium paid).</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-indigo-600">Level 3</span>
                  <Unlock size={16} className="text-indigo-500" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Spreads</h4>
                <p className="text-sm text-gray-600">Verticals, Iron Condors. Requires margin.</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] px-2 py-1 rounded-bl">Expert</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-red-600">Level 4</span>
                  <Unlock size={16} className="text-red-500" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Naked</h4>
                <p className="text-sm text-gray-600">Selling naked calls/puts. Unlimited risk.</p>
              </div>
            </div>
          </section>

          {/* 6. The Greeks Section */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <PieChart className="text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-900">Understanding The Greeks</h2>
              </div>
              <p className="text-gray-600 max-w-2xl">The mathematical sensitivities that drive option pricing. Ignoring these is a primary cause of retail capital destruction.</p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              <GreekCard 
                symbol="Δ" 
                name="Delta" 
                definition="Rate of change of option price per $1 move in underlying stock." 
                rule="Roughly equals probability of expiring In-The-Money."
                color="#3b82f6"
              />
              <GreekCard 
                symbol="Γ" 
                name="Gamma" 
                definition="Rate of change of Delta. Acceleration of the position." 
                rule="Highest for ATM options near expiration. Watch out for 0DTE risks!"
                color="#8b5cf6"
              />
              <GreekCard 
                symbol="Θ" 
                name="Theta" 
                definition="Time decay. The rate at which an option loses value as time passes." 
                rule="Decay accelerates in the final 30 days. Don't hold short-term OTM 'hope' trades."
                color="#f59e0b"
              />
              <GreekCard 
                symbol="ν" 
                name="Vega" 
                definition="Sensitivity to Implied Volatility (IV) changes." 
                rule="Avoid buying high Vega options right before earnings (IV Crush)."
                color="#10b981"
              />
              <GreekCard 
                symbol="ρ" 
                name="Rho" 
                definition="Sensitivity to interest rate changes." 
                rule="Call prices rise with rates; Puts fall. Key for long-term LEAPS."
                color="#64748b"
              />
            </div>
          </section>

          {/* 7. Danger Zone / Risks */}
          <section className="relative">
            <div className="absolute inset-0 bg-red-50 transform -skew-y-2 rounded-3xl -z-10" />
            <div className="py-12 px-6">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-1/3">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <AlertOctagon className="text-red-600" size={32} />
                    Structural Risks
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">While options offer sophisticated utility, specific market environments and structural conditions can turn them into hazardous speculation.</p>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                    <h4 className="font-bold text-red-700 mb-2 text-lg">Case Study: "Steamroller"</h4>
                    <p className="text-sm text-gray-600">Selling naked options often has a high win rate (picking up pennies) but catastrophic tail risk (in front of a steamroller). See: OptionSellers.com collapse (2018).</p>
                  </div>
                </div>
                <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Layers size={18} className="text-red-500"/> Liquidity Traps
                    </h3>
                    <p className="text-sm text-gray-600">Wide bid-ask spreads in illiquid options act as an instant tax. If spread &gt; 1-2% of price, you start with a mathematical disadvantage that is hard to overcome.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Clock size={18} className="text-red-500"/> IV Crush
                    </h3>
                    <p className="text-sm text-gray-600">Buying options before binary events (earnings) is dangerous. Even if you predict the direction right, the drop in volatility can crush the option's value.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <MousePointerClick size={18} className="text-red-500"/> The 0DTE Addiction
                    </h3>
                    <p className="text-sm text-gray-600">Zero Days to Expiration trading triggers dopamine loops similar to gambling. Extreme Gamma risk can wipe out accounts in minutes.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Target size={18} className="text-red-500"/> Wash Sale Rules
                    </h3>
                    <p className="text-sm text-gray-600">Trading similar options within 30 days of a loss can disallow the tax deduction, leading to massive tax bills on phantom profits.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Strategy Table */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Strategy Decision Framework</h2>
              <div className="hidden md:flex gap-2 text-sm text-gray-500">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Bullish</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Neutral</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">Bearish</span>
              </div>
            </div>
            <div className="space-y-2">
              <StrategyRow 
                title="Long Call / Bull Spread" 
                type="Bullish" 
                outlook="Aggressive" 
                rationale="Leveraged upside participation." 
                risk="100% loss of premium if stock stagnates." 
              />
              <StrategyRow 
                title="Cash-Secured Put" 
                type="Bullish" 
                outlook="Conservative" 
                rationale="Paid to wait for a dip; lower entry price." 
                risk="Assignment at price above market value during crash." 
              />
              <StrategyRow 
                title="Iron Condor / Covered Call" 
                type="Neutral" 
                outlook="Stagnant" 
                rationale="Profit from time decay (Theta) and IV crush." 
                risk="Volatility expansion or breakout beyond range." 
              />
              <StrategyRow 
                title="Protective Put" 
                type="Bearish" 
                outlook="Hedge" 
                rationale="Floor on losses; unlimited upside remains." 
                risk="Cost of premium (drag on returns)." 
              />
              <StrategyRow 
                title="Long Straddle / Strangle" 
                type="Neutral" 
                outlook="High Volatility" 
                rationale="Profit from explosive move in either direction." 
                risk="'IV Crush' after event; price stays within breakeven." 
              />
            </div>
          </section>

          {/* Continue Learning Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle.podcastUrl && (
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
              {currentArticle.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-12 pb-8 text-center text-gray-500 text-sm">
            <p className="mb-4"><strong>Disclaimer:</strong> This guide is for educational purposes only and does not constitute financial advice. Options trading involves significant risk and is not suitable for all investors.</p>
            <div className="flex justify-center gap-6 mb-4">
              <span className="hover:text-indigo-600 cursor-pointer transition">Regulation T</span>
              <span className="hover:text-indigo-600 cursor-pointer transition">Portfolio Margin</span>
              <span className="hover:text-indigo-600 cursor-pointer transition">Taxation (Section 1256)</span>
            </div>
            <p>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </footer>
        </main>

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/ln9KdrO.jpeg"
          alt="Strategic Options Utilization Framework Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />
      </div>
    </>
  );
}