'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, Activity, Users, CreditCard, LineChart, ShieldAlert, Zap, History, Target, BarChart3, AlertTriangle, ArrowRight, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Reusable UI Components
const SectionHeading = ({ icon: Icon, title, subtitle, colorClass }: { icon: React.ElementType; title: string; subtitle?: string; colorClass: string }) => (
  <div className="mb-8">
    <div className={`inline-flex items-center justify-center p-3 rounded-2xl ${colorClass} text-white mb-4 shadow-lg`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{title}</h2>
    {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

export default function NavigatingBullToBearRegimeShift() {
  const currentArticle = articles.find(article => article.slug === 'navigating-bull-to-bear-regime-shift-quantitative-signals');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title || ''} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
        {/* Return to Home Button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white border-b border-gray-200">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-70 z-0"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6 uppercase tracking-wider">
              Quantitative Analysis Tutorial
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 mb-6 leading-tight">
              Navigating the Bull-to-Bear <br className="hidden md:block" /> Regime Shift
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              A deep-dive tutorial into quantitative signals, systematic factor rotation, and convexity monetization during transitional market phases.
            </p>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
              Deep Research
            </span>
          </div>
          <div className="absolute bottom-4 right-4 z-20">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
              Options
            </span>
          </div>
        </div>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/zwJ2vHQ.jpeg" 
              alt="Bull-to-Bear Regime Shift Infographic" 
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
          src="https://i.imgur.com/zwJ2vHQ.jpeg"
          alt="Bull-to-Bear Regime Shift Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mt-16">
          {/* 1. Theoretical Framework */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              <h2 className="text-3xl font-bold mb-4">The Theoretical Framework</h2>
              <p className="text-lg text-blue-100 leading-relaxed mb-6">
                Financial markets do not operate in a permanent state of equilibrium. The transition from a mature, low-volatility bull market to a structural bear market is a "phase transition." During this time, long-established statistical relationships and correlations systematically break down.
              </p>
              <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Target className="mr-2" /> The Regime-Change Window
                </h3>
                <p className="text-blue-50">
                  This is the early deterioration phase. It is not the capitulatory trough, but a treacherous zone characterized by stealthy rising volatility, weakening cross-sectional equity breadth, and the gradual breakdown of long-term trend lines. Traditional long-only allocations suffer severe geometric decay here.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Quantitative Signals */}
          <section>
            <SectionHeading 
              icon={Activity} 
              title="Quantitative Signals" 
              subtitle="Indicators confirming the regime shift from expansion to contraction."
              colorClass="bg-rose-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-t-4 border-t-rose-500">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-rose-100 rounded-lg text-rose-600 mr-4">
                      <LineChart size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Term Structure (VIX/VXV)</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    In a healthy bull market, the VIX futures curve is in contango (upward sloping). When near-term risk spikes, the curve flattens and inverts (backwardation).
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="font-bold text-rose-600">Signal Threshold:</span> VIX/VXV Ratio &gt; 1.0 to 1.25. Extreme readings pinpoint the violent acceleration of an early bear market phase.
                  </div>
                </div>
              </Card>

              <Card className="border-t-4 border-t-blue-500">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-4">
                      <TrendingDown size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Breadth Deterioration</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Mega-cap equities may prop up indices while the median stock declines. Correlation often collapses early, creating a fragile environment prone to sudden unified downward trajectories.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="font-bold text-blue-600">Signal Threshold:</span> TRIN (Arms Index) &gt; 1.25 paired with a structurally falling Advance-Decline (A/D) Line.
                  </div>
                </div>
              </Card>

              <Card className="border-t-4 border-t-purple-500">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-4">
                      <Users size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Factor Crowding Unwinds</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Institutional capital heavily concentrates into prevailing momentum trades. A sudden decline in pairwise correlation within the momentum factor suggests a systematic reduction in crowded positions.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="font-bold text-purple-600">Signal Threshold:</span> MSCI Crowding Score &gt; 1.0. Crowded factors experience 7x higher frequency of significant drawdowns.
                  </div>
                </div>
              </Card>

              <Card className="border-t-4 border-t-emerald-500">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 mr-4">
                      <CreditCard size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Credit Spread Widening</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Bondholders sit higher in the capital structure and spot liquidity constraints first. As systemic liquidity recedes, default probabilities are repriced.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="font-bold text-emerald-600">Signal Threshold:</span> Sustained High-Yield Option-Adjusted Spread (OAS) Expansion vs U.S. Treasuries.
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 3. Equity & Options Strategies */}
          <section>
            <SectionHeading 
              icon={Zap} 
              title="Systematic & Options Strategies" 
              subtitle="Defending the portfolio and monetizing convexity during the transition."
              colorClass="bg-amber-500"
            />
            <div className="space-y-8">
              {/* Equity Strategy */}
              <Card className="p-8 bg-amber-50 border-amber-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Dynamic Factor Rotation & Momentum Shorts</h3>
                <p className="text-gray-700 mb-4">
                  Quantitative managers utilize <strong>Sparse Jump Models (SJM)</strong> to identify latent regimes. They rotate out of growth/momentum and overweight <strong>value, low-volatility, and quality</strong>. 
                </p>
                <div className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm flex items-start">
                  <AlertTriangle className="text-amber-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">The Danger of Momentum Shorts</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      In bear regimes, the short leg of a momentum portfolio (worst-performing stocks) behaves like a written call option. A violent bear-market rally causes exponential surges in these heavily shorted stocks due to short-covering panics.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Options Table */}
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-800 text-sm uppercase tracking-wide">
                        <th className="p-4 font-semibold">Options Strategy</th>
                        <th className="p-4 font-semibold">Structural Composition</th>
                        <th className="p-4 font-semibold">Primary Advantage</th>
                        <th className="p-4 font-semibold">Key Risk / Drawback</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-bold text-gray-900 whitespace-nowrap">Put Ratio Spread (1x2)</td>
                        <td className="p-4">Long 1 ATM Put, Short 2 OTM Puts</td>
                        <td className="p-4">Entered for net credit; mathematically exploits steep IV skew.</td>
                        <td className="p-4 text-rose-600">Unlimited downside risk in a violent, gap-down crash.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                        <td className="p-4 font-bold text-gray-900 whitespace-nowrap">Put-Heavy Collar</td>
                        <td className="p-4">Long Stock, Short 1 Call, Long 2+ Puts</td>
                        <td className="p-4">Neutralizes delta; finances expensive downside protection.</td>
                        <td className="p-4">Caps all upside potential; requires active management.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-bold text-gray-900 whitespace-nowrap">VIX Call Spread</td>
                        <td className="p-4">Long VIX Call, Short Higher VIX Call</td>
                        <td className="p-4">Mitigates contango drag and theta decay.</td>
                        <td className="p-4">Capped profitability if volatility surges parabolically.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>

          {/* 4. Volatility Regime Trading */}
          <section>
            <SectionHeading 
              icon={BarChart3} 
              title="Volatility Regime Trading" 
              subtitle="Mastering the Greeks: Vega, Skew, and Gamma Dynamics"
              colorClass="bg-purple-600"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border-t-4 border-t-purple-400">
                <h3 className="font-bold text-xl mb-3 text-gray-900">Long Vega vs. Long Gamma</h3>
                <p className="text-gray-600 text-sm">
                  <strong>Long Vega:</strong> Profits from rising <em>expected</em> volatility (implied), best deployed via longer-dated options during early deterioration. 
                  <br/><br/>
                  <strong>Long Gamma:</strong> Profits from <em>actual</em> large price movements. Suffers heavily from theta decay if the market doesn&apos;t swing wildly every day.
                </p>
              </Card>

              <Card className="p-6 border-t-4 border-t-purple-600">
                <h3 className="font-bold text-xl mb-3 text-gray-900">Skew Monetization</h3>
                <p className="text-gray-600 text-sm">
                  When OTM puts are heavily bid and overpriced relative to calls, traders execute <em>skew reversal trades</em>. They sell the overpriced puts to buy cheaper calls while remaining delta-neutral, profiting as panic subsides and the skew flattens.
                </p>
              </Card>

              <Card className="p-6 border-t-4 border-t-purple-800">
                <h3 className="font-bold text-xl mb-3 text-gray-900">Gamma Scalping</h3>
                <p className="text-gray-600 text-sm">
                  A variance-reduction technique holding positive gamma (e.g., a long straddle) while continuously delta-hedging (buying low, selling high). It only profits if <em>realized volatility exceeds implied volatility</em>, offsetting theta decay.
                </p>
              </Card>
            </div>
          </section>

          {/* 5. Risk Management */}
          <section>
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <ShieldAlert size={200} />
              </div>
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-3xl font-bold mb-6 flex items-center text-emerald-400">
                  <ShieldAlert className="mr-3" /> Position Sizing & Risk Management
                </h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">The Kelly Criterion & Fractional Kelly</h3>
                  <p className="text-slate-300 mb-4">
                    Trading at "Full Kelly" in financial markets is inherently dangerous due to non-stationary distributions and fat tails. Quantitative managers universally employ <strong>Fractional Kelly</strong> (Half or Quarter) to reduce portfolio variance and probability of ruin.
                  </p>
                  <div className="inline-block bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono text-emerald-300 text-lg shadow-inner">
                    f* = (bp - q) / b
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Volatility-Based Scaling</h3>
                  <p className="text-slate-300 mb-4">
                    Position sizes must be inversely proportional to current market volatility (ATR). As the ATR expands during a regime shift, leverage must be mechanically reduced to keep absolute dollar-risk constant.
                  </p>
                  <div className="inline-block bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono text-blue-300 text-lg shadow-inner">
                    Size = Account Risk / (ATR × Multiple)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Historical Precedents */}
          <section>
            <SectionHeading 
              icon={History} 
              title="Historical Precedents" 
              subtitle="Understanding the anatomy of past market transitions."
              colorClass="bg-blue-600"
            />
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 border-l-4 border-blue-500 pl-6 py-2 ml-4 relative">
                <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[10px] top-4 border-4 border-slate-50"></div>
                <div className="md:w-1/4 font-bold text-2xl text-blue-700">2000–2002</div>
                <div className="md:w-3/4">
                  <h4 className="text-xl font-bold text-gray-900">The Structural Unwind</h4>
                  <p className="text-gray-600 mt-2">
                    A prolonged, grinding deterioration un-winding tech euphoria. VIX hovered at elevated norms without violent spikes. Value and quality factors generated substantial relative outperformance.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 border-l-4 border-rose-500 pl-6 py-2 ml-4 relative">
                <div className="absolute w-4 h-4 rounded-full bg-rose-500 -left-[10px] top-4 border-4 border-slate-50"></div>
                <div className="md:w-1/4 font-bold text-2xl text-rose-700">2007–2008</div>
                <div className="md:w-3/4">
                  <h4 className="text-xl font-bold text-gray-900">The Structural Credit Crisis</h4>
                  <p className="text-gray-600 mt-2">
                    Telegraphed by credit markets long before equity collapse. VIX term structure violently inverted. 2-state Markov switching models succeeded where single-state models failed.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 border-l-4 border-purple-500 pl-6 py-2 ml-4 relative">
                <div className="absolute w-4 h-4 rounded-full bg-purple-500 -left-[10px] top-4 border-4 border-slate-50"></div>
                <div className="md:w-1/4 font-bold text-2xl text-purple-700">2020</div>
                <div className="md:w-3/4">
                  <h4 className="text-xl font-bold text-gray-900">The Event-Driven Shock</h4>
                  <p className="text-gray-600 mt-2">
                    Unprecedented velocity. Correlation collapsed to 1.0. Constant volatility models (Black-Scholes) failed; stochastic models (Heston) pricing extreme negative correlation survived.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 border-l-4 border-emerald-500 pl-6 py-2 ml-4 relative">
                <div className="absolute w-4 h-4 rounded-full bg-emerald-500 -left-[10px] top-4 border-4 border-slate-50"></div>
                <div className="md:w-1/4 font-bold text-2xl text-emerald-700">2022</div>
                <div className="md:w-3/4">
                  <h4 className="text-xl font-bold text-gray-900">The Cyclical Inflationary Bear</h4>
                  <p className="text-gray-600 mt-2">
                    A slow, agonizing downward grind. Skew remained flat as institutions were already hedged. Gamma scalping was difficult due to slow daily drift penalizing long-gamma traders with theta decay.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Current Playbook (March 2026) */}
          <section>
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-orange-200 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
                <Target size={300} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-orange-500 text-white p-2 rounded-lg">
                    <AlertTriangle size={24} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-orange-900">Actionable Playbook: March 2026</h2>
                </div>
                <p className="text-lg text-orange-800 font-medium mb-8">
                  Context: S&P 500 decisive structural breakdown below 200-day MA. Severe geopolitical escalation (U.S.-Iran), oil spikes, stagflation fears. VIX surging above 26.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col h-full">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <ArrowRight className="text-orange-500 mr-2 w-5 h-5" /> Deploy Put Ratio Spreads
                    </h4>
                    <p className="text-gray-600 text-sm flex-grow">
                      Outright put purchasing is mathematically unsound right now. Use 1x2 or 1x3 put ratio backspreads to monetize the steepening skew for a net credit, mitigating inflated IV.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col h-full">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <ArrowRight className="text-orange-500 mr-2 w-5 h-5" /> Systematic Factor Rotation
                    </h4>
                    <p className="text-gray-600 text-sm flex-grow">
                      Aggressively reduce exposure to crowded AI semiconductor momentum trades. Rotate into low-volatility, quality, and energy/commodity factors hedging the supply-chain shock.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col h-full">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <ArrowRight className="text-orange-500 mr-2 w-5 h-5" /> Execute the Bull Steepener
                    </h4>
                    <p className="text-gray-600 text-sm flex-grow">
                      With stagflation threatening growth, the Fed&apos;s high-rate stance is compromised. Implement a yield curve bull steepener via Treasury futures to capture front-end rate collapses.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col h-full">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                      <ArrowRight className="text-orange-500 mr-2 w-5 h-5" /> Enforce Volatility Scaling
                    </h4>
                    <p className="text-gray-600 text-sm flex-grow">
                      With VIX breaking 26, algorithmic systems must immediately apply volatility scaling. Contract gross leverage and strictly enforce Fractional Kelly sizing to prevent VaR breaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl my-8 text-center max-w-6xl mx-auto">
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

        {/* Footer */}
        <footer className="mt-24 border-t border-gray-200 bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
            <p>© 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
            <p className="text-sm mt-2">Based on &quot;Market Transition Trading Strategies Analysis&quot;</p>
          </div>
        </footer>
      </div>
    </>
  );
}
