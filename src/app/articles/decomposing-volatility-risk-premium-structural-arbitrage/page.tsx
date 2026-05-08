'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, Layers, Clock, Target, Zap, ShieldAlert, BarChart3, BookOpen, PieChart, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Reusable UI Components
const Section = ({ title, icon, children, gradient = "from-indigo-50 to-blue-50" }: { title: string; icon: React.ReactNode; children: React.ReactNode; gradient?: string }) => (
  <section className={'py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b ' + gradient}>
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-white rounded-xl shadow-sm border border-white/50 text-indigo-600">
          {icon}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
        {children}
      </div>
    </div>
  </section>
);

const Card = ({ title, icon, children, borderColor = "border-indigo-100", bgColor = "bg-white" }: { title: string; icon?: React.ReactNode; children: React.ReactNode; borderColor?: string; bgColor?: string }) => (
  <div className={'p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-300 ' + bgColor + ' ' + borderColor}>
    <div className="flex items-center gap-3 mb-4">
      {icon && <div className="text-slate-700">{icon}</div>}
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 space-y-4">
      {children}
    </div>
  </div>
);

const MathBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-6 bg-slate-800 text-emerald-300 font-mono text-center rounded-xl overflow-x-auto shadow-inner text-lg md:text-xl">
    {children}
  </div>
);

const InfoPill = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className={'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ' + color}>
    <span className="opacity-75 mr-2">{label}:</span> {value}
  </div>
);

export default function DecomposingVRPArticle() {
  const currentArticle = articles.find(article => article.slug === 'decomposing-volatility-risk-premium-structural-arbitrage');
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

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent pointer-events-none"></div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-8 tracking-wide uppercase">
              <BookOpen size={16} /> Quantitative Finance Tutorial
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Decomposing the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Volatility Risk Premium</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              A sophisticated framework for structural arbitrage and alpha generation through the dissection of moneyness, term structure, and correlation.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Volatility Risk Premium Decomposition Infographic" 
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
        )}

        {/* Full-screen image viewer */}
        {currentArticle?.imageUrl && (
          <FullScreenImageViewer
            src={currentArticle.imageUrl}
            alt="Volatility Risk Premium Decomposition Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        {/* 1. Introduction */}
        <Section title="1. The Evolution of Volatility Investing" icon={<TrendingUp size={32} />} gradient="from-white to-slate-50">
          <p>The financial landscape has witnessed a paradigm shift in the treatment of volatility. Once viewed merely as a statistical measure of dispersion or a parameter for risk management, volatility has evolved into a distinct, tradable asset class.</p>
          <p>At the heart of this evolution lies the <strong>Volatility Risk Premium (VRP)</strong>—the pervasive and persistent tendency for option-implied volatility to exceed subsequent realized volatility. Historically, harvesting the VRP was a relatively blunt instrument, characterized by the indiscriminate selling of at-the-money (ATM) straddles or receiving variance swap rates. While profitable, these strategies bundled disparate risk factors into a single exposure, leaving them susceptible to catastrophic "left-tail" events (e.g., 2008, "Volmageddon" 2018).</p>
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-6">
            <p className="text-indigo-900 font-medium italic">"The modern edge lies not in the blind selling of insurance, but in the rigorous decomposition of the VRP into its constituent, orthogonal components."</p>
          </div>
          <p>Sophisticated institutional investors now dissect the volatility surface along three primary axes to target structural inefficiencies driven by non-economic flows:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card title="Moneyness" icon={<Target className="text-blue-500"/>} borderColor="border-blue-200">
              Isolating the price of tail risk from daily variance.
            </Card>
            <Card title="Term Structure" icon={<Clock className="text-purple-500"/>} borderColor="border-purple-200">
              Isolating term premia and calendar effects over time.
            </Card>
            <Card title="Correlation" icon={<Layers className="text-emerald-500"/>} borderColor="border-emerald-200">
              Isolating idiosyncratic variance from systematic risk.
            </Card>
          </div>
        </Section>

        {/* 2. Economic Foundation */}
        <Section title="2. Economic & Theoretical Foundation" icon={<Activity size={32} />} gradient="from-slate-50 to-blue-50">
          <p>To understand why decomposition is critical, one must first interrogate the source of the premium itself. The VRP is not a singular artifact but a composite compensation for bearing different types of risks.</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">The Disconnect Between P-Measure and Q-Measure</h3>
          <p>Fundamentally, the VRP represents the difference between the market's pricing of future variance under the risk-neutral measure (<span className="font-serif italic text-indigo-600">ℚ</span>) and the actual expectation of variance under the physical measure (<span className="font-serif italic text-indigo-600">ℙ</span>).</p>
          <MathBlock>
            VRP<sub className="text-sm">t</sub> = E<sub className="text-sm">t</sub><sup>ℚ</sup>[Var] - E<sub className="text-sm">t</sub><sup>ℙ</sup>[Var]
          </MathBlock>
          <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-6">The "Bad" vs. "Good" Variance Framework</h3>
          <p>Conventional models fail to explain the variance premium because they treat all volatility as equal. Empirical research demonstrates that the premium is highly asymmetric.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <Card title="Bad Variance (VRP_down)" icon={<TrendingDown className="text-red-500" size={28} />} borderColor="border-red-200" bgColor="bg-red-50/30">
              <p>Associated with negative returns and downside jumps. Represents the insurance premium paid by investors to protect against market crashes.</p>
              <p className="text-sm font-semibold text-red-700 mt-2">Dominant driver of total VRP and holds predictive power for excess returns.</p>
            </Card>
            <Card title="Good Variance (VRP_up)" icon={<TrendingUp className="text-emerald-500" size={28} />} borderColor="border-emerald-200" bgColor="bg-emerald-50/30">
              <p>Associated with positive returns or upside volatility. In many market regimes, the premium for upside variance can be negligible or even negative.</p>
              <p className="text-sm font-semibold text-emerald-700 mt-2">Driven down by the supply of calls from overwriting strategies (covered calls).</p>
            </Card>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-6">Component Pricing Matrix</h3>
          <div className="overflow-x-auto rounded-xl shadow-sm border border-slate-200">
            <table className="w-full text-left bg-white">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-4 font-bold border-b border-slate-200">Component</th>
                  <th className="p-4 font-bold border-b border-slate-200">Economic Driver</th>
                  <th className="p-4 font-bold border-b border-slate-200">Market Source</th>
                  <th className="p-4 font-bold border-b border-slate-200">Characteristic</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-indigo-700">ATM Variance</td>
                  <td className="p-4">Daily Rebalancing Noise</td>
                  <td className="p-4">Dealers / Market Makers</td>
                  <td className="p-4">Mean-reverting, heavily influenced by Gamma flows.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-red-600">Downside Skew</td>
                  <td className="p-4">Crash Aversion / Tail Risk</td>
                  <td className="p-4">Pension Funds / Insurers</td>
                  <td className="p-4">Persistent premium, insensitive to small price moves.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-emerald-600">Upside Skew</td>
                  <td className="p-4">Yield Enhancement / FOMO</td>
                  <td className="p-4">Retail / Structured Products</td>
                  <td className="p-4">Often underpriced or flat due to supply glut.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-purple-600">Term Structure</td>
                  <td className="p-4">Temporal Uncertainty</td>
                  <td className="p-4">Variable Annuity Hedgers</td>
                  <td className="p-4">Typically upward sloping (Contango); pays "roll yield".</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* 3. Decomposition by Moneyness */}
        <Section title="3. Decomposition by Moneyness" icon={<PieChart size={32} />} gradient="from-blue-50 to-purple-50">
          <p>The most granular decomposition occurs along the strike price axis (Moneyness). This isolates the premium associated with "diffusive" volatility from the premium associated with "jump" volatility and tail events.</p>
          <div className="space-y-8 mt-8">
            <Card title="Isolating Pure Variance (Diffusive Risk)" icon={<Activity className="text-indigo-500" />}>
              <p>The core VRP lies in the difference between implied and realized variance for small price changes, best approximated by At-The-Money (ATM) options.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-700">
                <li><strong>Delta-Hedged Straddles:</strong> Selling an ATM call and put, continuously hedging delta to zero. Profit derives from Gamma multiplied by the difference between implied and realized variance.</li>
                <li><strong>Variance Swaps:</strong> A purer mathematical exposure. Replicated by a portfolio of OTM puts and calls weighted by 1/K². However, the heavy weighting of deep OTM puts creates a massive "short downside tail" bias, necessitating further decomposition.</li>
              </ul>
            </Card>
            <Card title="Isolating Skewness (The Third Moment)" icon={<TrendingDown className="text-orange-500" />}>
              <p>Skewness is treated as a tradable asset. The "Skew Risk Premium" compensates for the risk that downside fear will increase relative to upside greed.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-700">
                <li><strong>Skew Swaps:</strong> Pays a return based on the difference between realized skewness and a fixed skew strike, isolating skew from the general level of volatility.</li>
                <li><strong>Risk Reversals / Ratio Spreads:</strong> Selling an expensive OTM put and buying a cheaper OTM call. If the market remains flat but fear subsides (skew flattens), the trade profits from the put's premium collapsing relative to the call.</li>
              </ul>
            </Card>
            <Card title="Isolating Kurtosis (Tail Risk / The Fourth Moment)" icon={<ShieldAlert className="text-red-500" />}>
              <p>Gap Risk is the risk of extreme outliers. Standard strategies fail here because they assume continuous price paths.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-700">
                <li><strong>Conditional/Capped Variance Swaps:</strong> Accrue realized variance only within a specific range, explicitly rejecting tail risk. Decomposes VRP into a "Core VRP" (harvested) and a "Tail Risk Premium" (rejected).</li>
                <li><strong>Iron Condors and Butterflies:</strong> In listed markets, the short inner strangle harvests ATM variance, while the long outer wings hedge the kurtosis risk.</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* 4. Decomposition by Term Structure */}
        <Section title="4. Decomposition by Term Structure" icon={<Clock size={32} />} gradient="from-purple-50 to-rose-50">
          <p>The second dimension is temporal. The relationship between implied volatility and time to maturity contains distinct information about short-term panic versus long-term macro uncertainty.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
              <h4 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2 border-slate-100">The Term Structure Shape</h4>
              <p className="text-slate-600 mb-4">Typically, the VIX term structure is in <strong>contango</strong> (upward sloping).</p>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-indigo-700 block mb-1">Short-Term (Gamma)</span>
                  <span className="text-sm text-slate-600">Dominated by tactical flows, event risk, and squeezes. Highly mean-reverting.</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-purple-700 block mb-1">Long-Term (Vega)</span>
                  <span className="text-sm text-slate-600">Dominated by structural hedging flows (e.g., Variable Annuity hedging by life insurers creating a bid for long-dated vega).</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
              <h4 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2 border-slate-100">Execution Strategies</h4>
              <ul className="space-y-4 text-slate-600">
                <li><strong className="text-slate-800">Harvesting Roll-Down Yield:</strong> In a contango market, a VIX future decays toward spot over time. Shorting VIX futures or using Calendar Spreads captures this Term Premium.</li>
                <li><strong className="text-slate-800">Time Skew & Calendar Spreads:</strong> Selling front-month (high Theta decay) and buying back-month (hedging Vega). Funds target this by analyzing implied "Forward Volatility".</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 5. Decomposition by Correlation (Dispersion) */}
        <Section title="5. Correlation & Dispersion Trading" icon={<Layers size={32} />} gradient="from-rose-50 to-amber-50">
          <p>Perhaps the most sophisticated form of VRP decomposition is <strong>Dispersion Trading</strong>. This separates the volatility of the index from its constituents to isolate the Correlation Risk Premium (CRP).</p>
          <MathBlock>
            σ²<sub className="text-sm">index</sub> = Σ(w<sub className="text-sm">i</sub>² σ<sub className="text-sm">i</sub>²) + Σ(w<sub className="text-sm">i</sub> w<sub className="text-sm">j</sub> ρ<sub className="text-sm">ij</sub> σ<sub className="text-sm">i</sub> σ<sub className="text-sm">j</sub>)
          </MathBlock>
          <p className="mt-6">Because indices are diversified, index variance is lower than the weighted average single-stock variance. Hedgers overpay for Index Puts, while overwriters suppress single-stock calls. This makes implied correlation (ρ_implied) much higher than realized correlation.</p>
          <h4 className="text-xl font-bold text-slate-800 mt-10 mb-4">Greeks Weighting Schemes in Dispersion</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Vega-Weighted" icon={<BarChart3 className="text-indigo-400"/>} borderColor="border-indigo-200">
              <p className="text-sm mb-3">Index Vega = Σ Single Stock Vegas</p>
              <p className="text-sm font-semibold text-indigo-700">Exposure: Short Correlation / Long Volatility</p>
              <p className="text-sm mt-2">Requires larger notionals on the long side. Profits from a correlation drop OR a global vol spike.</p>
            </Card>
            <Card title="Theta-Weighted" icon={<Clock className="text-amber-500"/>} borderColor="border-amber-200">
              <p className="text-sm mb-3">Matches daily Theta bill.</p>
              <p className="text-sm font-semibold text-amber-700">Exposure: Pure Short Correlation</p>
              <p className="text-sm mt-2">Neutralizes time decay. P&L is driven almost exclusively by the spread between implied and realized correlation.</p>
            </Card>
            <Card title="Gamma-Weighted" icon={<Activity className="text-emerald-500"/>} borderColor="border-emerald-200">
              <p className="text-sm mb-3">Matches Gamma exposure.</p>
              <p className="text-sm font-semibold text-emerald-700">Exposure: Gamma Neutral</p>
              <p className="text-sm mt-2">Designed to withstand sharp market moves without excessive rebalancing noise. Used when squeeze risk is high.</p>
            </Card>
          </div>
        </Section>

        {/* 6. Market Microstructure */}
        <Section title="6. Market Microstructure: Vanna & Charm" icon={<Zap size={32} />} gradient="from-amber-50 to-emerald-50">
          <p>The frontier of VRP decomposition analyzes mechanical hedging flows of option dealers. Funds decompose aggregate VRP into predictable flows driven by <strong>Vanna</strong> and <strong>Charm</strong>.</p>
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10 text-emerald-500"><Zap size={120} /></div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">Vanna (∂Δ / ∂σ)</h4>
              <p className="text-emerald-700 font-medium mb-4 relative z-10">Sensitivity of Delta to Volatility</p>
              <p className="text-slate-600 mb-4 relative z-10">When dealers are short OTM puts, they have positive Vanna. If IV drops, their delta approaches zero. They must buy back short hedges (buy futures), supporting the market and suppressing volatility further—a <em>Vanna-driven feedback loop</em>.</p>
              <InfoPill color="border-emerald-300 text-emerald-800 bg-emerald-50" label="Alpha Trade" value="Long delta/short vol into IV crush events." />
            </div>
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-teal-100 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10 text-teal-500"><Clock size={120} /></div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">Charm (∂Δ / ∂t)</h4>
              <p className="text-teal-700 font-medium mb-4 relative z-10">Sensitivity of Delta to Time (Decay)</p>
              <p className="text-slate-600 mb-4 relative z-10">For OTM options, delta decays to zero as expiration nears. If dealers are short OTM puts, their short delta vanishes over time. They must buy futures to stay neutral, creating a structural "bid" leading into Options Expiration (OpEx).</p>
              <InfoPill color="border-teal-300 text-teal-800 bg-teal-50" label="Alpha Trade" value="Front-running dealer un-hedging into OpEx." />
            </div>
          </div>
        </Section>

        {/* 7. Strategic Implementation */}
        <Section title="7. Capital Efficiency & The Barbell Approach" icon={<Target size={32} />} gradient="from-emerald-50 to-indigo-50">
          <p className="mb-8 text-center max-w-4xl mx-auto">The ultimate goal is to construct robust portfolios that isolate specific premia while mitigating uncompensated risks using Portfolio Margining and structured setups.</p>
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 mix-blend-overlay"></div>
            <h3 className="text-2xl font-bold mb-8 text-center text-indigo-100">The "Barbell" Risk Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
                <h4 className="text-emerald-400 font-bold text-lg mb-2">Leg 1: Income</h4>
                <p className="text-slate-300 text-sm"><strong>Strategy:</strong> Short ATM Variance (Straddles / Var Swaps).<br/><strong>Goal:</strong> Harvest the high-frequency "diffusive" core VRP.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl transform md:-translate-y-4">
                <h4 className="text-rose-400 font-bold text-lg mb-2">Leg 2: Protection</h4>
                <p className="text-slate-300 text-sm"><strong>Strategy:</strong> Long OTM Skew (Puts / VIX Calls).<br/><strong>Goal:</strong> Hedge the "jump" risk and left-tail exposure.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
                <h4 className="text-amber-400 font-bold text-lg mb-2">Leg 3: Alpha</h4>
                <p className="text-slate-300 text-sm"><strong>Strategy:</strong> Dispersion (Short Correlation).<br/><strong>Goal:</strong> Generate uncorrelated, highly capital-efficient returns to fund the protection leg.</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-slate-300 font-medium">
              <p>Result: A portfolio generating positive carry from the "Good VRP" while holding explicit insurance against the "Bad VRP".</p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="bg-white py-12 px-6 border-t border-slate-100 text-center text-slate-500">
          <div className="max-w-3xl mx-auto">
            <p className="mb-4 font-medium text-slate-700">The decomposition of the Volatility Risk Premium represents the maturity of volatility as an asset class.</p>
            <p className="text-sm mb-6">By isolating pricing of skewness from variance, term premia from spot volatility, and idiosyncratic risk from systematic correlation, sophisticated quantitative funds unlock sustainable sources of alpha invisible to the aggregate market.</p>
            
            {/* Google Doc Link */}
            {currentArticle?.googleDoc && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              </div>
            )}

            <p className="text-xs text-slate-400 mt-8">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
