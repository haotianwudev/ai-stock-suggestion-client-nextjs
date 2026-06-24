'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  BookOpen, 
  AlertTriangle, 
  Globe, 
  Scale, 
  Landmark, 
  BarChart3, 
  Calculator,
  ArrowRight,
  Info,
  Zap,
  ArrowLeft,
  FileText,
  Maximize2
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const SectionHeading = ({ children, icon: Icon, color = "indigo" }: { 
  children: React.ReactNode; 
  icon: React.ComponentType<{ className?: string }>; 
  color?: string 
}) => {
  const colorMap: Record<string, string> = {
    indigo: "from-indigo-600 to-blue-500",
    purple: "from-purple-600 to-pink-500",
    emerald: "from-emerald-600 to-teal-500",
    rose: "from-rose-600 to-orange-500",
    amber: "from-amber-500 to-orange-500"
  };

  const iconColorMap: Record<string, string> = {
    indigo: "text-indigo-600 bg-indigo-100",
    purple: "text-purple-600 bg-purple-100",
    emerald: "text-emerald-600 bg-emerald-100",
    rose: "text-rose-600 bg-rose-100",
    amber: "text-amber-600 bg-amber-100"
  };

  return (
    <div className="flex items-center gap-3 mb-8">
      {Icon && (
        <div className={`p-3 rounded-2xl ${iconColorMap[color]} shadow-sm`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${colorMap[color]}`}>
        {children}
      </h2>
    </div>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 ${className}`}>
    {children}
  </div>
);

const FormulaBlock = ({ title, formula, description }: { title: string; formula: React.ReactNode; description: string }) => (
  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 my-6 relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-2xl transition-all duration-300 group-hover:w-2" />
    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">{title}</h4>
    <div className="font-mono text-lg md:text-xl text-indigo-900 bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center overflow-x-auto whitespace-nowrap mb-4">
      {formula}
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function CrossBorderDualListedEquities() {
  const currentArticle = articles.find(article => article.slug === 'pricing-cross-border-dual-listed-equities');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-[#fafcff] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white border-b border-slate-200/60 pt-24 pb-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-200/40 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            {currentArticle?.deepResearch && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-sm font-semibold mb-4">
                <Zap className="w-4 h-4" />
                <span>Deep Research</span>
              </div>
            )}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-8">
              <Zap className="w-4 h-4" />
              <span>Quantitative Finance Masterclass</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
              The Pricing of Cross-Border <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500">
                Dual-Listed Equities
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Exploring liquidity premia, arbitrage constraints, and the persistent Chinese AH Premium Puzzle. A deep dive into why the Law of One Price is systematically violated in global markets.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        {currentArticle?.imageUrl && (
          <>
            <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
                onClick={() => setIsImageViewerOpen(true)}
              >
                <img 
                  src={currentArticle.imageUrl} 
                  alt="Cross-Border Dual-Listed Equities Infographic" 
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

            <FullScreenImageViewer
              src={currentArticle.imageUrl}
              alt="Cross-Border Dual-Listed Equities Infographic"
              isOpen={isImageViewerOpen}
              onClose={() => setIsImageViewerOpen(false)}
            />
          </>
        )}

        <main className="max-w-5xl mx-auto px-6 py-16 space-y-32">

          {/* Introduction Context */}
          <section>
            <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-none shadow-xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <BookOpen className="text-indigo-300" />
                The Law of One Price: In Theory vs. Reality
              </h3>
              <p className="text-indigo-100 leading-relaxed text-lg mb-6">
                The law of one price is a foundational axiom asserting that two assets representing identical cash flow claims and identical risk profiles should trade at the exact same price. When this law is systematically violated, it exposes the mechanical, regulatory, and structural frictions governing actual market operations.
              </p>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <p className="text-white leading-relaxed">
                  <strong>The Ultimate Laboratory:</strong> This dynamic is most prominently observed in the Chinese equity market, where companies simultaneously list <strong>&ldquo;A-shares&rdquo;</strong> on mainland exchanges (Shanghai/Shenzhen) and <strong>&ldquo;H-shares&rdquo;</strong> in Hong Kong. Despite identical dividend entitlements, A-shares historically trade at a massive, volatile premium to H-shares.
                </p>
              </div>
            </Card>
          </section>

          <section>
            <SectionHeading icon={TrendingUp} color="indigo">
              1. Foundations of the Liquidity Premium
            </SectionHeading>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  In frictionless models like the classic CAPM, return is determined entirely by market risk. However, real-world markets have search costs, inventory costs, and asymmetric information. Investors demand compensation for fundamental market volatility <strong>and</strong> the cost and risk of illiquidity.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-indigo-100 p-2 rounded-full text-indigo-600"><TrendingUp className="w-4 h-4"/></div>
                    <div>
                      <h4 className="font-bold text-slate-900">Amihud Measure (Price Impact)</h4>
                      <p className="text-slate-600 text-sm">Measures daily absolute return divided by daily dollar volume. Assets with high price impacts impose higher execution costs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-purple-100 p-2 rounded-full text-purple-600"><TrendingUp className="w-4 h-4"/></div>
                    <div>
                      <h4 className="font-bold text-slate-900">Pastor-Stambaugh (Reversals)</h4>
                      <p className="text-slate-600 text-sm">Quantifies liquidity based on volume-related return reversals. The pure effect of liquidity risk demands an estimated ~7.5% annualized premium.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-slate-50 border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">The Liquidity-Adjusted CAPM (LCAPM)</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Acharya and Pedersen (2005) explicitly incorporated both the level of illiquidity and the variability of illiquidity into asset pricing.
                </p>
                <FormulaBlock 
                  title="LCAPM Expected Return"
                  formula={<>E(R<sub>i</sub>) = R<sub>f</sub> + E(c<sub>i</sub>) + λβ<sub>net</sub><sup>i</sup></>}
                  description="Where R_f is the risk-free rate, E(c_i) is the expected illiquidity cost, and λ is the market price of risk. The systematic risk is measured on returns net of transaction costs."
                />
              </Card>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6">The Four Sub-Betas of Net Systematic Risk</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: "β₁", name: "Market Beta", desc: "Standard systematic risk. Covariance of gross return with market gross return.", effect: "Positive" },
                { id: "β₂", name: "Commonality in Liquidity", desc: "How an asset's illiquidity co-moves with aggregate market illiquidity.", effect: "Positive" },
                { id: "β₃", name: "Return Sensitivity", desc: "How an asset's return responds to shocks in aggregate market illiquidity.", effect: "Negative" },
                { id: "β₄", name: "Liquidity Sensitivity", desc: "How an asset's illiquidity correlates with overall market returns.", effect: "Negative" },
              ].map((beta) => (
                <div key={beta.id} className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-black text-indigo-600">{beta.id}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${beta.effect === 'Positive' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {beta.effect} Premium
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{beta.name}</h4>
                  <p className="text-slate-500 text-sm">{beta.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading icon={AlertTriangle} color="rose">
              2. Limits to Arbitrage
            </SectionHeading>
            
            <div className="mb-8">
              <p className="text-lg text-slate-600 leading-relaxed">
                If identical assets trade at divergent prices, fundamental theory posits arbitrageurs will short the overvalued and buy the undervalued, risk-free. In practice, cross-border arbitrage is highly risky, capital-intensive, and subject to severe structural limitations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-rose-500">
                <div className="bg-rose-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Scale className="text-rose-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Agency Frictions</h3>
                <p className="text-slate-600 text-sm">
                  <strong>Performance-based arbitrage (Shleifer-Vishny):</strong> Arbitrage is managed by professionals using outside capital. If a spread irrationally widens, the fund suffers immediate mark-to-market losses. Investors withdraw capital exactly when the trade is most attractive, forcing premature liquidation.
                </p>
              </Card>

              <Card className="hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-amber-500">
                <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="text-amber-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Idiosyncratic Risk</h3>
                <p className="text-slate-600 text-sm">
                  Dual-listed companies (DLCs) across separate exchanges possess immense idiosyncratic risk because shares are rarely fungible. Arbitrageurs face massive horizon uncertainty—sometimes waiting up to 9 years for convergence, enduring holding costs and volatile spread swings.
                </p>
              </Card>

              <Card className="hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-purple-500">
                <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="text-purple-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Short-Sale Constraints</h3>
                <p className="text-slate-600 text-sm">
                  Arbitrage is asymmetric. Going long is easy; shorting requires locating a borrow, posting margin, paying fees, and surviving recall risk. When pessimistic sophisticated investors cannot short, optimistic sentiment artificially inflates the restricted asset&rsquo;s price.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <SectionHeading icon={Landmark} color="emerald">
              3. The Chinese AH Premium Puzzle
            </SectionHeading>

            <Card className="mb-12 bg-emerald-50/50 border-emerald-100">
              <p className="text-lg text-slate-700 leading-relaxed">
                Mainland Chinese companies frequently dual-list on the A-share market (RMB) and H-share market (HKD). The Hang Seng Stock Connect China AH Premium Index tracks this. Historically, it fluctuates between 115 and 150—meaning A-shares trade at a 15% to 50% premium over identical H-shares.
              </p>
            </Card>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Capital Outflow Controls</h3>
                <p className="text-slate-600 mb-6">
                  In most emerging markets, the <em>foreign</em> share trades at a premium due to inflow controls. China is the inverse. The AH premium is a direct consequence of strict <strong>capital outflow controls</strong>.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 text-emerald-500"><ArrowRight className="w-5 h-5"/></div>
                    <p className="text-slate-600 text-sm">Domestic retail investors (80%+ of volume) are restricted from transferring capital offshore to buy cheaper H-shares.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 text-emerald-500"><ArrowRight className="w-5 h-5"/></div>
                    <p className="text-slate-600 text-sm">Limited alternative domestic investments trap massive liquidity onshore, artificially inflating A-share demand.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 text-emerald-500"><ArrowRight className="w-5 h-5"/></div>
                    <p className="text-slate-600 text-sm">The AH premium is effectively the mathematical shadow price of these government capital controls.</p>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg">
                <h4 className="text-center font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Market Microstructure Demographics</h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-1/2 bg-red-50 p-4 rounded-2xl border border-red-100">
                      <h5 className="font-black text-red-700 mb-2">A-Share Market</h5>
                      <ul className="text-xs text-red-900/80 space-y-2">
                        <li>&bull; Heavily speculative</li>
                        <li>&bull; Highly liquid, Retail-driven</li>
                        <li>&bull; High turnover rates</li>
                        <li>&bull; Detached from fundamental cash-flow analyses</li>
                      </ul>
                    </div>
                    <div className="w-1/2 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <h5 className="font-black text-blue-700 mb-2">H-Share Market</h5>
                      <ul className="text-xs text-blue-900/80 space-y-2">
                        <li>&bull; Global Institutional investors</li>
                        <li>&bull; Strict fundamental valuation</li>
                        <li>&bull; Emerging market &ldquo;home bias&rdquo; discount applied</li>
                        <li>&bull; Higher global market beta premium</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading icon={BarChart3} color="amber">
              4. Execution Costs & Tax Frictions
            </SectionHeading>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Beyond macroeconomic controls, the daily execution environment imposes severe frictions. While dividends declared are identical, realized net cash flows are distorted by asymmetric tax regimes and stamp duties.
            </p>

            <Card className="mb-10 overflow-hidden p-0 sm:p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
                      <th className="p-5 font-bold">Market Segment</th>
                      <th className="p-5 font-bold">Investor Profile</th>
                      <th className="p-5 font-bold">Dividend Tax Rate</th>
                      <th className="p-5 font-bold">Regulatory Mechanism</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-bold text-slate-900">A-Share Market</td>
                      <td className="p-5 text-slate-600">Mainland Retail / Inst.</td>
                      <td className="p-5 text-emerald-600 font-bold">0% to 20%</td>
                      <td className="p-5 text-slate-500">Tiered for long-term holding. &lt;1 mo: 20%; 1-12 mo: 10%; &gt;1 yr: Tax-exempt.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-bold text-slate-900">H-Share Market</td>
                      <td className="p-5 text-slate-600">Foreign / HK Direct</td>
                      <td className="p-5 text-amber-600 font-bold">10% Flat</td>
                      <td className="p-5 text-slate-500">Non-resident enterprises/individuals holding directly face a flat 10% withholding tax.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors bg-rose-50/30">
                      <td className="p-5 font-bold text-slate-900">Southbound Connect</td>
                      <td className="p-5 text-slate-600">Mainland buying H-Shares</td>
                      <td className="p-5 text-rose-600 font-bold">20% Flat</td>
                      <td className="p-5 text-slate-500">Punitive flat rate regardless of duration, creating a severe tax asymmetry.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Hong Kong Stamp Duties</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Hong Kong levies a substantial 0.1% ad valorem stamp duty on both buyers and sellers (0.2% round-trip), alongside SFC/AFRC levies. For convergence trades targeting narrow mean-reversions, these transaction costs entirely consume the statistical edge. Direct equity pairs trading bears the full brunt.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">The Stock Connect Paradox</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The 2014 Stock Connect allowed cross-border trading, theoretically removing segmentation. Paradoxically, the premium <em>widened</em>. Why? Asymmetric accessibility (wealth requirements), isolated mainland liquidity spikes, and crucially, <strong>no fungibility</strong>. You cannot convert bought H-shares to settle an A-share short.
                </p>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading icon={Calculator} color="purple">
              5. Quantitative Execution & Modeling
            </SectionHeading>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Given structural persistence, quantitative funds deploy statistical arbitrage via advanced econometric modeling to harvest alpha from mean-reverting properties.
            </p>

            <div className="space-y-8">
              <Card className="border-l-4 border-l-purple-500">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Cointegration</h3>
                <p className="text-slate-600 mb-4">
                  While individual price series are non-stationary (random walks), a linear combination of the two may be stationary. If an underlying long-term equilibrium exists, the spread is expressed as:
                </p>
                <div className="bg-purple-50 p-4 rounded-xl font-mono text-purple-900 text-center text-xl mb-4 border border-purple-100">
                  e<sub>t</sub> = P<sub>t</sub><sup>A</sup> - βP<sub>t</sub><sup>H</sup>
                </div>
                <p className="text-sm text-slate-500">
                  When the spread deviates significantly, quants short the outperforming asset and long the underperforming one. Modern funds increasingly use Machine Learning (e.g., Random Forests) incorporating short-term momentum to predict convergence.
                </p>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Vector Error Correction Models (VECM)</h3>
                <p className="text-slate-600 mb-4">
                  To model long-term equilibrium and short-term dynamics simultaneously, VECM operates on the first differences of variables while incorporating an error-correction term.
                </p>
                <div className="bg-indigo-50 p-6 rounded-xl overflow-x-auto border border-indigo-100 mb-4">
                  <div className="font-mono text-indigo-900 text-sm md:text-base space-y-4">
                    <div className="whitespace-nowrap">ΔP<sub>t</sub><sup>A</sup> = α<sub>A</sub>(P<sub>t-1</sub><sup>A</sup> - βP<sub>t-1</sub><sup>H</sup>) + Σ γ<sub>A,i</sub>ΔP<sub>t-i</sub><sup>A</sup> + Σ δ<sub>A,i</sub>ΔP<sub>t-i</sub><sup>H</sup> + ε<sub>t</sub><sup>A</sup></div>
                    <div className="whitespace-nowrap">ΔP<sub>t</sub><sup>H</sup> = α<sub>H</sub>(P<sub>t-1</sub><sup>A</sup> - βP<sub>t-1</sub><sup>H</sup>) + Σ γ<sub>H,i</sub>ΔP<sub>t-i</sub><sup>A</sup> + Σ δ<sub>H,i</sub>ΔP<sub>t-i</sub><sup>H</sup> + ε<sub>t</sub><sup>H</sup></div>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  The coefficient <strong>α</strong> is the speed of adjustment. It must be negative for the system to revert. Empirical analyses show the H-share market frequently serves as the fundamental anchor.
                </p>
              </Card>

              <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-3xl p-8 border border-orange-100">
                <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6" /> Threshold Cointegration & Asymmetry
                </h3>
                <p className="text-orange-800/80 mb-4">
                  Standard VECM assumes symmetric adjustment. Empirically, this is false for the AH Premium. Due to costs and short-sale constraints, small deviations cannot be profitably arbitraged. 
                </p>
                <p className="text-orange-800/80 font-medium">
                  Prices follow a random walk until they breach a specific transaction cost &ldquo;threshold.&rdquo; Furthermore, adjustments are highly asymmetric: markets correct undervalued H-shares much faster than they correct restricted, overvalued A-shares.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Call to Action - Research Paper */}
        {currentArticle?.googleDoc && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12 my-16">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer / Conclusion */}
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">Conclusion</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              The pricing of cross-border, dual-listed equities reveals that calculating a theoretical &ldquo;fair value&rdquo; based on identical cash flows is insufficient if institutional frictions prevent capital from forcing convergence. The Chinese AH premium is the mechanical output of a highly segmented market architecture. Until deep structural integration permits legal, two-way convertibility, the premium will remain a volatile, threshold-cointegrated phenomenon.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              A visual tutorial based on quantitative finance research. Designed for analytical clarity.
            </p>
            <p className="text-sm text-slate-500">
              &copy; 2025 SOPHIE&rsquo;s Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
