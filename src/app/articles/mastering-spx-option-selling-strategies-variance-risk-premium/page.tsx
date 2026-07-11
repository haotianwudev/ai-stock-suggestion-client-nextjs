'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  BarChart2, 
  ShieldAlert, 
  Zap, 
  Clock, 
  Percent,
  BookOpen,
  Target,
  ArrowLeft,
  FileText,
  Maximize2
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Reusable Card Component for structuring content
const Card = ({ title, icon: Icon, children, className = "" }: { title: string; icon?: React.ElementType; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow duration-300 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      {Icon && <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Icon size={24} /></div>}
      <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

// Component for highlighting key metrics or data points
const StatBox = ({ label, value, description, trend = "neutral" }: { label: string; value: string; description?: string; trend?: string }) => {
  const colors: Record<string, string> = {
    up: "bg-emerald-50 text-emerald-700 border-emerald-200",
    down: "bg-rose-50 text-rose-700 border-rose-200",
    neutral: "bg-slate-50 text-slate-700 border-slate-200",
    primary: "bg-blue-50 text-blue-700 border-blue-200"
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[trend]} flex flex-col justify-center`}>
      <span className="text-sm font-semibold uppercase tracking-wider opacity-80 mb-1">{label}</span>
      <span className="text-3xl font-black mb-1">{value}</span>
      {description && <span className="text-xs opacity-90 leading-tight">{description}</span>}
    </div>
  );
};

// Component for calling out important warnings or rules
const Callout = ({ title, children, type = "info" }: { title: string; children: React.ReactNode; type?: string }) => {
  const styles: Record<string, string> = {
    info: "bg-indigo-50 border-l-4 border-indigo-500 text-indigo-900",
    warning: "bg-amber-50 border-l-4 border-amber-500 text-amber-900",
    danger: "bg-rose-50 border-l-4 border-rose-500 text-rose-900",
  };
  
  const icons: Record<string, JSX.Element> = {
    info: <BookOpen size={20} className="text-indigo-500" />,
    warning: <ShieldAlert size={20} className="text-amber-500" />,
    danger: <Zap size={20} className="text-rose-500" />,
  };

  return (
    <div className={`p-5 rounded-r-lg my-6 ${styles[type]} flex gap-4 items-start`}>
      <div className="mt-1 shrink-0">{icons[type]}</div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <div className="opacity-90 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default function SpxOptionTutorial() {
  const currentArticle = articles.find(article => article.slug === 'mastering-spx-option-selling-strategies-variance-risk-premium');
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

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200 selection:text-blue-900">
        
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Decorative Background gradient */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-100 via-indigo-50 to-slate-50 -z-10 pointer-events-none" />

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold text-sm shadow-lg">
              Deep Research
            </div>
            <div className="px-4 py-2 rounded-full bg-orange-500 text-white font-semibold text-sm shadow-lg">
              Options Trading
            </div>
          </div>

          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm text-blue-700 font-semibold text-sm mb-6 tracking-wide uppercase">
              <Activity size={16} /> Quantitative Finance Tutorial
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Mastering SPX Option <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Selling Strategies
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
              A comprehensive guide to the empirical efficacy of technical, volatility, and macroeconomic indicators in harvesting the Variance Risk Premium.
            </p>
          </header>
        </div>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="SPX Option Selling Strategies Infographic" 
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
        )}

        {/* Full-screen image viewer */}
        {currentArticle?.imageUrl && (
          <FullScreenImageViewer
            src={currentArticle.imageUrl}
            alt="SPX Option Selling Strategies Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          
          {/* Section 1: Introduction & VRP */}
          <section className="mb-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">The Foundation: Harvesting Volatility</h2>
              <div className="h-1 w-20 bg-blue-500 rounded-full mx-auto"></div>
            </div>

            <Card title="The Variance Risk Premium (VRP)" icon={BarChart2}>
              <p>
                Selling options on the S&amp;P 500 (SPX) is essentially <strong>underwriting systemic tail risk</strong>. Just as an insurance company collects premiums to cover rare disasters, option sellers collect yields for absorbing market volatility shocks.
              </p>
              <p>
                The mathematical engine behind this strategy is the <strong>Variance Risk Premium (VRP)</strong>. It is the well-documented phenomenon where the market's expectation of future volatility (Implied Volatility) consistently overestimates the actual volatility that occurs (Realized Volatility).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <StatBox 
                  label="Historical VIX Average" 
                  value="~19.6%" 
                  description="Implied Volatility (Expected Risk)"
                  trend="primary"
                />
                <StatBox 
                  label="Historical Realized Vol" 
                  value="~15.5%" 
                  description="Actual S&P 500 Movement"
                  trend="neutral"
                />
                <StatBox 
                  label="The VRP Edge" 
                  value="~4.1%" 
                  description="Persistent Gross Premium"
                  trend="up"
                />
              </div>

              <Callout title="Why does this premium exist?" type="info">
                Institutional investors, pension funds, and long-only managers have a highly inelastic demand for downside protection. Because they fear sudden market crashes, they are willing to <strong>overpay for out-of-the-money (OTM) put options</strong>. The option seller acts as a liquidity provider, earning the VRP as compensation for taking on this structural fear.
              </Callout>
            </Card>
          </section>

          {/* Section 2: Volatility Regime Indicators */}
          <section className="mb-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">When to Sell: Volatility Regime Indicators</h2>
              <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto"></div>
              <p className="mt-4 text-slate-600 text-lg">Absolute VIX levels aren't enough. We must look at the term structure and the volatility of volatility to optimize entry.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="The VIX/VXV Ratio" icon={TrendingUp}>
                <p>
                  A robust indicator for timing SPX option sales is the term structure of volatility, specifically the ratio between the 1-month VIX and the 3-month VXV.
                </p>
                <ul className="space-y-4 mt-4">
                  <li className="flex gap-3">
                    <div className="mt-1 text-emerald-500"><Target size={20} /></div>
                    <div>
                      <strong>Normal Market (Contango): Ratio &lt; 1.0.</strong> Near-term fear is low. 
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 text-rose-500"><Target size={20} /></div>
                    <div>
                      <strong>Panic (Backwardation): Ratio &gt; 1.0.</strong> Short-term fear eclipses medium-term expectations. 
                    </div>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm font-semibold text-slate-800">The Ultimate Entry Signal:</p>
                  <p className="text-sm mt-1">A VIX/VXV ratio spike <strong>above 1.25</strong> is historically one of the most reliable indicators of peak market fear. Selling options here captures massive premium right before a "vol crush."</p>
                </div>
              </Card>

              <Card title="Morning VVIX Anomaly" icon={Clock}>
                <p>
                  The VVIX measures the implied volatility of the VIX itself. Groundbreaking research shows a profound anomaly regarding <em>when</em> we look at this metric.
                </p>
                <p className="mt-3">
                  At exactly <strong>10:00 AM EST</strong>, during the US/European market overlap, institutional investors assess global volatility. Because the broader market underreacts, this "Morning VVIX" predicts next-day variance returns with incredible accuracy.
                </p>
                
                <div className="mt-6 bg-white rounded-xl border border-indigo-100 overflow-hidden shadow-sm">
                  <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100 font-semibold text-indigo-900 text-sm">
                    10:00 EST VVIX Threshold Rules
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-medium text-rose-700">VVIX &gt; 75th Percentile</span>
                      <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs font-bold">HALT SELLING</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-emerald-700">VVIX &lt; 75th Percentile</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">AGGRESSIVE SELL</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 3: Mean Reverting Indicators */}
          <section className="mb-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Tactical Entries: Mean Reverting Indicators</h2>
              <div className="h-1 w-20 bg-teal-500 rounded-full mx-auto"></div>
              <p className="mt-4 text-slate-600 text-lg">Option selling has negative gamma. Entering trades at the localized exhaustion point of a price move minimizes directional risk.</p>
            </div>

            <Card title="Short-Term RSI & Bollinger Bands" icon={Activity} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity size={120} />
              </div>
              <div className="relative z-10">
                <p className="text-lg mb-6">
                  The standard 14-day RSI is too slow for SPX options. Quantitative backtesting reveals that <strong>shortened lookback periods (2 to 6 days)</strong> are vastly superior for isolating short-term mean-reversion bounces within a broader uptrend.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                    <h4 className="font-bold text-teal-900 mb-2 flex items-center gap-2">
                      <Percent size={18}/> Filtered 5-Day RSI Strategy
                    </h4>
                    <ul className="text-sm space-y-2 text-teal-800">
                      <li><strong>Entry Rule:</strong> 5-day RSI &lt; 35</li>
                      <li><strong>Macro Filter:</strong> Price &gt; 200 DMA</li>
                      <li><strong>Exit Rule:</strong> RSI crosses &gt; 50</li>
                      <li className="pt-2 border-t border-teal-200 mt-2 font-bold text-lg">Win Rate: 81%</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                      <Zap size={18}/> Synergistic Filter Setup
                    </h4>
                    <p className="text-sm text-purple-800 leading-relaxed mb-3">
                      Combine RSI with Bollinger Bands (20-period, 2 StdDev) for ultimate precision.
                    </p>
                    <p className="text-sm text-purple-900 font-semibold bg-white px-3 py-2 rounded shadow-sm">
                      Signal = Price pierces Lower Bollinger Band AND RSI drops below 30.
                    </p>
                  </div>
                </div>

                <Callout title="The Bollinger Squeeze Warning" type="warning">
                  Avoid selling premium when Bollinger Bands contract to historical minimums (a "squeeze"). This signals an imminent, violent breakout. The subsequent expansion in implied volatility will drastically increase option values, resulting in severe mark-to-market losses.
                </Callout>
              </div>
            </Card>
          </section>

          {/* Section 4: Macroeconomic Trend Filters */}
          <section className="mb-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Survival: Macroeconomic Trend Filters</h2>
              <div className="h-1 w-20 bg-rose-500 rounded-full mx-auto"></div>
              <p className="mt-4 text-slate-600 text-lg">The Achilles heel of put-writing is a structural bear market. You must have binary rules to turn the strategy off.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title="The 200-Day SMA" icon={TrendingDown}>
                <p className="mb-4">
                  The 200-day Simple Moving Average establishes the macroeconomic regime. Mean-reversion indicators will fail continuously during an extended bear market, driving through short strikes.
                </p>
                <div className="bg-slate-800 text-white p-5 rounded-xl text-center shadow-inner">
                  <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">The Binary Rule</p>
                  <p className="text-xl font-bold">
                    If SPX Closes &lt; 200-Day SMA:<br/>
                    <span className="text-rose-400 text-2xl">SUSPEND ALL PUT WRITING</span>
                  </p>
                </div>
                <p className="mt-4 text-sm">
                  SPX volatility averages ~1.05% above the 200-DMA, but doubles to ~2.1% below it. Turning the engine off avoids fat-tailed outcomes that destroy portfolios.
                </p>
              </Card>

              <Card title="High Yield Credit Spreads" icon={ShieldAlert}>
                <p className="mb-4">
                  The ICE BofA U.S. High Yield Index Option-Adjusted Spread (OAS) measures the extra yield demanded to lend to junk-rated corporations. It is the market's real-time price for liquidity and default risk.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 text-rose-500"><TrendingUp size={20} /></div>
                    <div>
                      <strong>Widening Spreads (e.g., 250bp to 400bp):</strong> Indicates deteriorating liquidity and rising systemic stress. Equity crashes become highly probable. <strong>Halt trading.</strong>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 text-emerald-500"><TrendingDown size={20} /></div>
                    <div>
                      <strong>Tight/Compressing Spreads:</strong> Confirms a supportive macroeconomic backdrop. Safe to harvest the VRP.
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Section 5: Capital Allocation */}
          <section className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Capital Allocation: Advanced Sizing & 0DTE</h2>
              <div className="h-1 w-20 bg-blue-800 rounded-full mx-auto"></div>
            </div>

            <Card title="The Hybrid VIX-Kelly Model" icon={Target}>
              <p className="mb-6">
                Even with perfect timing, incorrect position sizing is the primary cause of absolute ruin due to the convex risk of short options. While the theoretical Kelly Criterion maximizes growth, it is too dangerous for options because it assumes a stationary market.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 mb-6">
                <h4 className="font-bold text-blue-900 mb-3 text-lg">The Solution: Dynamic VIX-Rank Sizing</h4>
                <p className="text-blue-800 text-sm leading-relaxed mb-4">
                  Developed in recent quantitative research, this model scales the optimal Kelly fraction based on the real-time VIX percentile rank.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 bg-white p-3 rounded shadow-sm border border-blue-50">
                    <span className="block text-xs font-bold text-slate-400 uppercase">Extreme VIX Highs</span>
                    <span className="text-rose-600 font-semibold text-sm">Multiplier approaches 0. Forces strategy to deleverage.</span>
                  </div>
                  <div className="flex-1 bg-white p-3 rounded shadow-sm border border-blue-50">
                    <span className="block text-xs font-bold text-slate-400 uppercase">Complacent Low VIX</span>
                    <span className="text-emerald-600 font-semibold text-sm">Multiplier approaches 1. Optimal Kelly efficiency.</span>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-slate-800 mt-8 mb-4 text-xl">Optimal Option Structure (Wysocki Research)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider">
                      <th className="p-3 rounded-tl-lg">Strategy Structure</th>
                      <th className="p-3">VIX Memory</th>
                      <th className="p-3">Estimator</th>
                      <th className="p-3 rounded-tr-lg">Max Drawdown</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-semibold text-indigo-700">0 DTE, 0% OTM</td>
                      <td className="p-3">21 Days</td>
                      <td className="p-3">Garman-Klass</td>
                      <td className="p-3 font-bold text-emerald-600">9.47%</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="p-3 font-semibold text-indigo-700">3 DTE, 0% OTM</td>
                      <td className="p-3">21 Days</td>
                      <td className="p-3">Yang-Zhang</td>
                      <td className="p-3 font-bold text-emerald-600">8.77%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-rose-700">3 DTE, 2% OTM</td>
                      <td className="p-3">21 Days</td>
                      <td className="p-3">Garman-Klass</td>
                      <td className="p-3 font-bold text-rose-600">36.58%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <Callout title="The 0DTE Reality" type="info">
                Over 51% of total SPX options volume is now Zero Days to Expiration (0DTE). The absolute best risk-adjusted returns are generated by ultra-short-dated options (0 to 5 DTE) written 5% to 10% Out-Of-The-Money. This drastically improves the Information Ratio by curtailing downside tail risk while capturing immense theta decay.
              </Callout>

            </Card>
          </section>

          {/* Conclusion */}
          <section className="text-center mt-20 pt-10 border-t border-slate-200 mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Conclusion</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Option selling is a highly lucrative endeavor strictly dependent on systematic harvesting. By applying this tiered hierarchy of macro filters, volatility regimes, tactical oscillators, and dynamic sizing, a speculator transforms into a disciplined underwriter.
            </p>
          </section>

          {/* Call to Action - Google Doc Link */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="text-center py-10 border-t border-slate-200 bg-white">
          <div className="flex justify-center items-center gap-2 text-sm text-slate-500">
            <ShieldAlert size={14} /> 
            <span>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</span>
          </div>
        </footer>

      </div>
    </>
  );
}
