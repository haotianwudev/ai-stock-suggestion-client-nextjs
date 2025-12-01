'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Activity, Shield, Anchor, Zap, BarChart3, ArrowRight, Info, Layers, MousePointerClick } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Components ---
const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-rose-100 text-rose-700",
    purple: "bg-purple-100 text-purple-700",
    amber: "bg-amber-100 text-amber-700"
  };
  const colorClass = colors[color || "blue"] || colors.blue;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${colorClass}`}>
      {children}
    </span>
  );
};

const SectionHeading = ({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: React.ElementType }) => (
  <div className="mb-12 text-center max-w-2xl mx-auto">
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-white shadow-sm rounded-2xl border border-slate-100">
        <Icon className="w-8 h-8 text-indigo-600" />
      </div>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    <p className="text-lg text-slate-600 leading-relaxed">{subtitle}</p>
  </div>
);

const Card = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow duration-300 ${className}`}>
    <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
    <div className="text-slate-600 leading-relaxed space-y-4">{children}</div>
  </div>
);

const StrategyCard = ({ title, regime, action, risk, color }: { title: string; regime: string; action: string; risk: string; color: string }) => {
  const colorClasses: Record<string, string> = {
    green: "border-l-4 border-l-emerald-500 bg-emerald-50/50",
    red: "border-l-4 border-l-rose-500 bg-rose-50/50",
    blue: "border-l-4 border-l-blue-500 bg-blue-50/50"
  };
  return (
    <div className={`p-6 rounded-r-xl ${colorClasses[color]} mb-6`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-bold text-slate-900">{title}</h4>
        <Badge color={color === 'green' ? 'green' : color === 'red' ? 'red' : 'blue'}>{regime}</Badge>
      </div>
      <p className="text-slate-700 font-medium mb-4">{action}</p>
      <div className="flex items-center text-sm text-slate-500 bg-white/60 p-3 rounded-lg">
        <Info className="w-4 h-4 mr-2" />
        <span>{risk}</span>
      </div>
    </div>
  );
};

const ConceptVisualizer = () => {
  const [activeTab, setActiveTab] = useState('positive');
  return (
    <div className="my-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-10 lg:p-14 flex flex-col justify-center bg-slate-50">
          <h3 className="text-2xl font-bold mb-6 text-slate-900">Market Maker Physics</h3>
          <p className="text-slate-600 mb-8">
            Select a Gamma Regime to see how Market Makers (MM) react to price changes. This reaction is what drives market volatility.
          </p>
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('positive')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === 'positive' 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Positive Gamma
            </button>
            <button
              onClick={() => setActiveTab('negative')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === 'negative' 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Negative Gamma
            </button>
          </div>
        </div>
        <div className={`p-10 lg:p-14 flex flex-col justify-center text-white transition-colors duration-500 ${
          activeTab === 'positive' 
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
            : 'bg-gradient-to-br from-rose-500 to-orange-600'
        }`}>
          {activeTab === 'positive' ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center space-x-3 opacity-90">
                <Shield className="w-6 h-6" />
                <span className="text-lg font-medium tracking-wide">STABILIZING REGIME</span>
              </div>
              <h4 className="text-3xl font-bold">&quot;Buy Low, Sell High&quot;</h4>
              <p className="text-emerald-50 leading-relaxed">
                When the market drops, MMs must <strong>BUY</strong> futures to hedge. <br/>
                When the market rallies, MMs must <strong>SELL</strong> futures to hedge.
              </p>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <p className="font-semibold">Result: Volatility is dampened. Trading ranges are tight.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center space-x-3 opacity-90">
                <Zap className="w-6 h-6" />
                <span className="text-lg font-medium tracking-wide">ACCELERATING REGIME</span>
              </div>
              <h4 className="text-3xl font-bold">&quot;Sell Low, Buy High&quot;</h4>
              <p className="text-rose-50 leading-relaxed">
                When the market drops, MMs must <strong>SELL</strong> futures to hedge (driving it lower). <br/>
                When the market rallies, MMs must <strong>BUY</strong> futures (driving it higher).
              </p>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <p className="font-semibold">Result: Volatility explodes. Sharp moves in both directions.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---
export default function GammaExposureArticle() {
  const currentArticle = articles.find(article => article.slug === 'gamma-exposure-gex-gps-market-volatility');

  return (
    <>
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || 'gamma-exposure-gex-gps-market-volatility'} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-20 left-4 z-40">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Deep Research
          </span>
        </div>

        <div className="absolute top-20 right-4 z-40">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            Options
          </span>
        </div>

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white border-b border-slate-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <Badge color="purple">Advanced Market Structure</Badge>
                <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
                  Gamma <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Exposure</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  The &quot;GPS&quot; of market volatility. GEX measures how Market Makers are positioned and reveals hidden support, resistance, and potential for explosive moves.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center px-6 py-3 text-slate-600 font-medium">
                    <Activity className="w-5 h-5 mr-2 text-indigo-500" />
                    Real-time Calculations
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                  {/* Decorative Chart UI */}
                  <div className="flex justify-between items-end mb-4 border-b border-slate-100 pb-4">
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Gamma</div>
                      <div className="text-3xl font-bold text-indigo-600">$4.2B</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-emerald-500 font-bold bg-emerald-50 px-2 py-1 rounded">+1.2% Day</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-emerald-400 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Call Gamma (Resistance)</span>
                      <span>75%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-1/4 bg-rose-400 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Put Gamma (Support)</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img 
              src="https://i.imgur.com/4FiUTqH.jpeg" 
              alt="Gamma Exposure Infographic" 
              className="w-full h-auto"
            />
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-20">
          {/* Core Logic */}
          <SectionHeading 
            icon={Layers}
            title="The Core Logic" 
            subtitle="To understand GEX, you must understand the role of the Market Maker. They are the liquidity providers who must stay 'Delta Neutral' to survive."
          />

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card title="1. The Market Maker">
              <p>
                When you buy an option, a Market Maker (MM) usually sells it to you. This creates risk for them. If the price moves against them, they lose money.
              </p>
              <p className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong>Goal:</strong> Eliminate directional risk (Delta) instantly.
              </p>
            </Card>

            <Card title="2. The Hedge">
              <p>
                To neutralize risk, MMs trade the underlying stock. If they sold you a call (they are short call), they generally need to buy stock to hedge.
              </p>
              <p className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong>Reality:</strong> As price moves, their hedge ratio (Delta) changes (Gamma).
              </p>
            </Card>

            <Card title="3. The Feedback Loop">
              <p>
                This constant re-hedging creates flows. <strong>Gamma Exposure</strong> calculates the aggregate of these potential flows at every price level.
              </p>
              <p className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong>Impact:</strong> GEX tells us if MMs will dampen or amplify the next move.
              </p>
            </Card>
          </div>

          {/* Interactive Visualizer */}
          <ConceptVisualizer />

          {/* Key Levels */}
          <SectionHeading 
            icon={BarChart3}
            title="Important Price Levels" 
            subtitle="GEX highlights invisible walls on the chart where market positioning is most concentrated."
          />

          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            <div className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-indigo-200 transition">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-rose-100"></div>
              <TrendingUp className="w-10 h-10 text-rose-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">The Call Wall</h3>
              <p className="text-slate-600 mb-4">
                The strike price with the largest net positive gamma. This acts as a major <strong>Resistance</strong> level.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-rose-400" /> 
                  MMs sell stock here to hedge calls.
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-rose-400" /> 
                  Price often stalls or pins here.
                </li>
              </ul>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-indigo-200 transition">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-emerald-100"></div>
              <Anchor className="w-10 h-10 text-emerald-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">The Put Wall</h3>
              <p className="text-slate-600 mb-4">
                The strike with the largest net negative gamma (or put concentration). This acts as major <strong>Support</strong>.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-emerald-400" /> 
                  MMs often buy back hedges here.
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-emerald-400" /> 
                  Hard to break without news.
                </li>
              </ul>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-indigo-200 transition">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-amber-100"></div>
              <MousePointerClick className="w-10 h-10 text-amber-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">Zero Gamma / Flip</h3>
              <p className="text-slate-600 mb-4">
                The level where GEX flips from positive to negative. The &quot;Volatility Switch&quot;.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-amber-400" /> 
                  Above = Stability (Mean Reversion).
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-amber-400" /> 
                  Below = Volatility (Momentum).
                </li>
              </ul>
            </div>
          </div>

          {/* Strategies */}
          <div className="bg-slate-900 rounded-3xl p-10 lg:p-16 text-white relative overflow-hidden">
            {/* Abstract Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Strategies for the Common Investor</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  You don&apos;t need to be a quant to use GEX. It primarily answers one question: <strong>&quot;Should I bet on the range holding, or the range breaking?&quot;</strong>
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-sm font-medium tracking-widest uppercase text-slate-400">Tactical Playbook</span>
                </div>
              </div>

              <div>
                <StrategyCard 
                  title="Mean Reversion Trading" 
                  regime="Positive Gamma"
                  color="green"
                  action="Sell volatility. Look for dips to buy and rips to sell. Markets are likely to respect support and resistance levels."
                  risk="Risk: A massive news event that breaks the 'stickiness'."
                />

                <StrategyCard 
                  title="Momentum & Breakouts" 
                  regime="Negative Gamma"
                  color="red"
                  action="Buy options or directional futures. Use tight trailing stops. Don't fight the trend; the market is slippery."
                  risk="Risk: Whipsaws are common, but moves are fast."
                />

                <StrategyCard 
                  title="The OpEx Pin" 
                  regime="High Open Interest"
                  color="blue"
                  action="Approaching Friday expiration, price often gravitates toward strikes with massive Gamma (Call Walls)."
                  risk="Note: This effect fades immediately after expiration."
                />
              </div>
            </div>
          </div>

          {/* Mathematical Foundation Section */}
          <div className="mt-24 mb-16">
            <SectionHeading 
              icon={Layers}
              title="The Mathematical Foundation" 
              subtitle="Understanding the quantitative mechanics behind Gamma Exposure calculations."
            />

            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Core GEX Formula</h3>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <p className="text-center text-lg font-mono text-slate-800 mb-4">
                  GEX = Σ (Gamma × Open Interest × Contract Multiplier × Spot Price)
                </p>
                <p className="text-sm text-slate-600 text-center">
                  Where the sum is taken across all strikes and expirations
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3">Key Components:</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start">
                      <span className="font-bold text-indigo-600 mr-2">Γ (Gamma):</span>
                      <span>The rate of change of Delta with respect to the underlying price. Measures how fast the hedge ratio changes.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-indigo-600 mr-2">OI (Open Interest):</span>
                      <span>The total number of outstanding option contracts. Represents the &quot;population&quot; of positions.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-indigo-600 mr-2">Multiplier:</span>
                      <span>Typically 100 for equity options (each contract controls 100 shares).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-indigo-600 mr-2">Spot Price:</span>
                      <span>Current market price of the underlying asset. Converts notional exposure to dollar terms.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-indigo-900 mb-3">Sign Convention</h4>
                  <p className="text-indigo-800 mb-3">
                    Market Makers are typically <strong>short gamma</strong> when they sell options to retail traders:
                  </p>
                  <ul className="space-y-2 text-indigo-800">
                    <li>• <strong>Positive GEX:</strong> MMs are short calls &rarr; stabilizing hedging flows</li>
                    <li>• <strong>Negative GEX:</strong> MMs are short puts &rarr; destabilizing hedging flows</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3">Practical Example:</h4>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <p className="text-slate-700 mb-4">
                      SPX trading at 4,500 with 10,000 contracts of OI at the 4,500 strike call with Gamma = 0.05:
                    </p>
                    <p className="font-mono text-sm text-slate-800 mb-2">
                      GEX = 0.05 × 10,000 × 100 × 4,500 = $225,000,000
                    </p>
                    <p className="text-sm text-slate-600">
                      This means for every 1-point move in SPX, MMs must hedge $225M worth of exposure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl my-16 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-12">
            <h4 className="font-bold text-amber-900 mb-2">Educational Disclaimer</h4>
            <p className="text-amber-800 text-sm">
              This content is for educational purposes only. GEX is a derived metric and should be used in conjunction with other analysis. Options trading involves substantial risk and is not suitable for all investors. Past performance does not guarantee future results.
            </p>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-slate-500 mb-4">© 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
            <p className="text-sm text-slate-400">
              GEX is a derived metric and should be used in conjunction with other analysis.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
