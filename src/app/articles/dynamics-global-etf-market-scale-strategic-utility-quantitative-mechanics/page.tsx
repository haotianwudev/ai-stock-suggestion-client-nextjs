'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, BarChart2, Zap, Shield, Calculator, Globe, Activity, Layers, Award, RefreshCw, CheckCircle2, ArrowRightCircle, TrendingDown, ArrowUpRight, Maximize2, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({ icon: Icon, title, colorClass }: { icon: React.ElementType; title: string; colorClass: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-3.5 rounded-xl shadow-sm ${colorClass}`}>
      <Icon size={28} className="text-white" />
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

const BulletList = ({ items, iconColor = "text-indigo-500" }: { items: React.ReactNode[]; iconColor?: string }) => (
  <ul className="space-y-4">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-3">
        <CheckCircle2 className={`mt-1 flex-shrink-0 ${iconColor}`} size={20} />
        <span className="text-slate-600 text-lg leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const MathBlock = ({ equation, description }: { equation: string; description?: string }) => (
  <div className="bg-slate-900 rounded-xl p-6 my-6 shadow-md border-l-4 border-indigo-500 overflow-x-auto">
    <div className="text-emerald-400 font-mono text-lg md:text-xl text-center tracking-wider mb-2">
      {equation}
    </div>
    {description && (
      <div className="text-slate-400 text-sm text-center font-medium mt-3 border-t border-slate-800 pt-3">
        {description}
      </div>
    )}
  </div>
);

export default function ETFMarketDynamicsArticle() {
  const currentArticle = articles.find(article => article.slug === 'dynamics-global-etf-market-scale-strategic-utility-quantitative-mechanics');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 pb-24">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 py-24 px-6 sm:px-12 lg:px-24 rounded-b-[3rem] shadow-xl relative overflow-hidden mb-16">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold text-sm mb-6 border border-white/30 shadow-sm">
              <Globe size={16} /> Global Market Analysis Tutorial
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 drop-shadow-md">
              Dynamics of the Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">ETF Market</span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto font-medium leading-relaxed">
              A comprehensive, step-by-step breakdown of the scale, strategic utility, and quantitative mechanics driving the modern $22 trillion financial ecosystem.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/86LNDeM.jpeg" 
              alt="ETF Market Dynamics Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
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
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/86LNDeM.jpeg"
          alt="ETF Market Dynamics Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-5xl mx-auto px-6 space-y-20">
          {/* Introduction */}
          <section>
            <SectionHeading icon={Layers} title="Structural Transformation" colorClass="bg-blue-500" />
            <Card className="bg-white">
              <p className="text-xl text-slate-700 font-medium mb-6">
                The global financial ecosystem has been fundamentally rearchitected by the proliferation of Exchange-Traded Funds (ETFs) over the past three decades.
              </p>
              <BulletList 
                iconColor="text-blue-500"
                items={[
                  <><strong className="text-slate-800">Historical Context:</strong> Originally designed in the 1990s as a simple mechanism for broad-market passive equity exposure (e.g., SPY, QQQ).</>,
                  <><strong className="text-slate-800">Modern Evolution:</strong> Has evolved into the primary conduit for institutional liquidity and complex active portfolio management.</>,
                  <><strong className="text-slate-800">Systemic Importance:</strong> Functions not merely as an allocation tool, but as the foundational trading layer for the broader global financial system.</>,
                  <><strong className="text-slate-800">Strategic Uses:</strong> Increasingly utilized to access alternative asset classes, deploy factor-based "smart beta" strategies, and serve as crucial fixed-income liquidity proxies.</>
                ]} 
              />
            </Card>
          </section>

          {/* The Macro-Scale */}
          <section>
            <SectionHeading icon={Globe} title="The Macro-Scale: AUM & Inflows" colorClass="bg-emerald-500" />
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-emerald-50 border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-900 mb-6 border-b border-emerald-200 pb-2">Global & U.S. Dominance</h3>
                <BulletList 
                  iconColor="text-emerald-600"
                  items={[
                    <><strong className="text-emerald-900">Record Global Assets:</strong> The global ETF marketplace surged to a record $21.91 trillion by April 2026, up 10.5% YTD.</>,
                    <><strong className="text-emerald-900">Massive Inflows:</strong> Witnessed 83 consecutive months of inflows, accumulating $856.38 billion YTD.</>,
                    <><strong className="text-emerald-900">U.S. Epicenter:</strong> The U.S. remains the core hub, managing $15.69 trillion across 5,283 distinct products.</>
                  ]} 
                />
              </Card>

              <Card className="bg-white border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Concentration & Growth</h3>
                <BulletList 
                  iconColor="text-emerald-500"
                  items={[
                    <><strong className="text-slate-800">High Concentration:</strong> The top three providers (iShares, Vanguard, State Street) command a massive 59% of global market share.</>,
                    <><strong className="text-slate-800">APAC Expansion:</strong> The Asia-Pacific region demonstrates an aggressive growth trajectory, surpassing $2 trillion in AUM by late 2025.</>,
                    <><strong className="text-slate-800">Fee Compression:</strong> Asset-weighted expense ratios for index ETFs hit 0.14%, accelerating mutual fund conversions.</>
                  ]} 
                />
              </Card>
            </div>
          </section>

          {/* Trading Velocity */}
          <section>
            <SectionHeading icon={Activity} title="Trading Velocity: Notional Value" colorClass="bg-rose-500" />
            <Card className="bg-gradient-to-br from-rose-50 to-white border-rose-100">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 text-center flex-shrink-0">
                  <div className="text-6xl font-black text-rose-500 tracking-tighter">40%</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-2">Peak Volume Share</div>
                </div>
                <p className="text-xl text-slate-700 font-medium">
                  While AUM defines static wealth, <strong className="text-rose-600">trading velocity</strong> dictates market influence. Traditional share volume metrics mathematically distort true capital risk.
                </p>
              </div>
              <BulletList 
                iconColor="text-rose-500"
                items={[
                  <><strong className="text-slate-800">The Quant Standard:</strong> Financial institutions utilize Notional Value (Execution Price × Total Shares) to accurately measure capital transfers.</>,
                  <><strong className="text-slate-800">Massive Baseline:</strong> ETFs account for roughly 32% of the $1.1 trillion U.S. equities daily notional baseline.</>,
                  <><strong className="text-slate-800">Macro Shock Absorbers:</strong> During periods of distress (e.g., March 2026 macro shocks), genuine single-stock liquidity dries up. Capital rotation shifts heavily to ETFs, pushing their trading to nearly 40% of total U.S. stock market volume.</>
                ]} 
              />
            </Card>
          </section>

          {/* Vanilla Beta Exodus */}
          <section>
            <SectionHeading icon={TrendingUp} title="The Exodus from Vanilla Beta" colorClass="bg-purple-500" />
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-purple-50 border-purple-100 hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-purple-600">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-4">Active Renaissance</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2">
                    <ArrowRightCircle size={18} className="text-purple-400 mt-0.5 flex-shrink-0"/> 
                    Record 1,167 new ETFs launched in 2025; 85% actively managed.
                  </li>
                  <li className="flex gap-2">
                    <ArrowRightCircle size={18} className="text-purple-400 mt-0.5 flex-shrink-0"/> 
                    Captured $133B early in 2026 due to the breakdown of traditional 60/40 correlations.
                  </li>
                </ul>
              </Card>

              <Card className="bg-blue-50 border-blue-100 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <BarChart2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Smart Beta & Factors</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2">
                    <ArrowRightCircle size={18} className="text-blue-400 mt-0.5 flex-shrink-0"/> 
                    Alleviates concentration risks inherent in market-cap weighted indices.
                  </li>
                  <li className="flex gap-2">
                    <ArrowRightCircle size={18} className="text-blue-400 mt-0.5 flex-shrink-0"/> 
                    Isolates specific quant factors like Value, Quality, Momentum, and Min Volatility.
                  </li>
                </ul>
              </Card>

              <Card className="bg-amber-50 border-amber-100 hover:shadow-md transition-shadow">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-amber-600">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-4">Thematic & Leverage</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-2">
                    <ArrowRightCircle size={18} className="text-amber-400 mt-0.5 flex-shrink-0"/> 
                    Spot Bitcoin ETFs rapidly accumulated $20B in institutional capital.
                  </li>
                  <li className="flex gap-2">
                    <ArrowRightCircle size={18} className="text-amber-400 mt-0.5 flex-shrink-0"/> 
                    Leveraged/inverse products dominate the daily tape for tactical, non-margin hedging.
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Strategic Utility */}
          <section>
            <SectionHeading icon={Shield} title="Strategic Utility: Hedging & Tax Alpha" colorClass="bg-cyan-500" />
            <Card className="bg-white border-l-8 border-l-cyan-500">
              <div className="space-y-8">
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Award className="text-cyan-500" /> Fixed-Income Liquidity Proxies
                  </h4>
                  <BulletList 
                    iconColor="text-cyan-500"
                    items={[
                      "Underlying corporate and high-yield bond markets operate OTC, suffering from severe price opacity and massive transaction frictions.",
                      "Trading the ETF wrapper on a lit exchange reduces execution costs from 50-90 basis points (in underlying bonds) to mere pennies.",
                      "Pension plans actively deploy liquid alternative ETFs to manage funded-level volatility and hedge against prolonged equity drawdowns instantly."
                    ]} 
                  />
                </div>

                <div className="border-t border-slate-100 pt-8">
                  <h4 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <RefreshCw className="text-cyan-500" /> The Tax Alpha Advantage (Rule 6c-11)
                  </h4>
                  <BulletList 
                    iconColor="text-cyan-500"
                    items={[
                      "The ETF 'in-kind' creation and redemption process prevents the triggering of taxable capital gains for the fund's shareholders.",
                      "Quants execute massive 'heartbeat trades' alongside Authorized Participants directly before index rebalancing.",
                      "These trades flush out highly appreciated securities entirely tax-free, generating a massive structural advantage over mutual funds."
                    ]} 
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Market Microstructure */}
          <section>
            <SectionHeading icon={RefreshCw} title="Microstructure: The Arbitrage Engine" colorClass="bg-fuchsia-500" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-t-emerald-400">
                <h4 className="font-bold text-emerald-600 text-2xl mb-2 flex items-center gap-2">
                  <ArrowUpRight /> Executing on a Premium
                </h4>
                <p className="text-sm font-semibold text-slate-400 uppercase mb-6 tracking-wider">When ETF Price &gt; NAV</p>
                <ul className="space-y-4 text-slate-600 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:to-emerald-100">
                  <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 font-bold shadow shrink-0 z-10">1</div>
                    <div className="ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0 w-[calc(100%-3rem)] md:w-1/2 p-4 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
                      AP buys the underlying "creation basket" in the open market.
                    </div>
                  </li>
                  <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 font-bold shadow shrink-0 z-10">2</div>
                    <div className="ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0 w-[calc(100%-3rem)] md:w-1/2 p-4 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
                      AP delivers physical basket to issuer for newly minted shares.
                    </div>
                  </li>
                  <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 font-bold shadow shrink-0 z-10">3</div>
                    <div className="ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0 w-[calc(100%-3rem)] md:w-1/2 p-4 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
                      AP sells ETF shares, increasing supply and dropping price to NAV.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-t-rose-400">
                <h4 className="font-bold text-rose-600 text-2xl mb-2 flex items-center gap-2">
                  <TrendingDown /> Executing on a Discount
                </h4>
                <p className="text-sm font-semibold text-slate-400 uppercase mb-6 tracking-wider">When ETF Price &lt; NAV</p>
                <ul className="space-y-4 text-slate-600 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rose-400 before:to-rose-100">
                  <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-rose-100 text-rose-600 font-bold shadow shrink-0 z-10">1</div>
                    <div className="ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0 w-[calc(100%-3rem)] md:w-1/2 p-4 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
                      AP buys undervalued ETF shares on the secondary market.
                    </div>
                  </li>
                  <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-rose-100 text-rose-600 font-bold shadow shrink-0 z-10">2</div>
                    <div className="ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0 w-[calc(100%-3rem)] md:w-1/2 p-4 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
                      AP redeems unit with issuer for underlying physical securities.
                    </div>
                  </li>
                  <li className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-rose-100 text-rose-600 font-bold shadow shrink-0 z-10">3</div>
                    <div className="ml-4 md:ml-0 md:mr-4 md:group-odd:ml-4 md:group-odd:mr-0 w-[calc(100%-3rem)] md:w-1/2 p-4 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
                      AP sells securities, destroying shares to align price up to NAV.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantitative Considerations */}
          <section>
            <SectionHeading icon={Calculator} title="Quantitative Considerations" colorClass="bg-indigo-500" />
            <div className="space-y-6">
              <Card className="bg-indigo-50 border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-900 mb-4">1. Index Tracking Error Optimization</h3>
                <BulletList 
                  iconColor="text-indigo-600"
                  items={[
                    "Avoiding Physical Replication: Quants avoid buying illiquid constituents to prevent massive transaction costs and 'cash drag'.",
                    "Stratified Sampling: Indices are mathematically divided into multi-dimensional risk cells. In fixed income, this utilizes Duration Times Spread (DTS) to model nonlinear price behaviors.",
                    "Algorithmic Solvers: Deployment of non-linear models (e.g., Nelder-Mead Simplex, Levenberg-Marquardt) alongside L1-norm sparse penalized regression to strictly enforce asset cardinality limits."
                  ]} 
                />
                <MathBlock 
                  equation="TE = √ [ (1 / (N-1)) * Σ (R_{P,i} - R_{B,i} - E)² ]"
                  description="Where R_P is portfolio return, R_B is benchmark return, and E is the mean of return differences."
                />
              </Card>

              <Card className="bg-violet-50 border-violet-100">
                <h3 className="text-2xl font-bold text-violet-900 mb-4">2. Covariance Matrix Shrinkage</h3>
                <BulletList 
                  iconColor="text-violet-600"
                  items={[
                    "The Problem: Mean-variance optimization fails because sample covariance matrices derived from historical data are statistically noisy. Optimizers blindly exploit this noise.",
                    "The Solution: The Ledoit-Wolf Shrinkage estimator solves this by mathematically 'shrinking' the noisy sample matrix.",
                    "The Mechanism: It pulls the data toward a highly structured, lower-variance target matrix, drastically improving out-of-sample risk-adjusted returns."
                  ]} 
                />
                <MathBlock 
                  equation="Σ_{LW} = δF + (1 - δ)S"
                  description="Where S is the sample covariance matrix, F is the structured target matrix, and δ is the optimal shrinkage intensity."
                />
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto px-6 py-12 mt-20 border-t border-slate-200 text-center text-slate-600">
          <p className="text-sm">
            © 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </footer>
      </div>
    </>
  );
}
