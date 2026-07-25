'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertTriangle, TrendingUp, DollarSign, Activity, CheckCircle, Info, LayoutDashboard, Maximize2, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const Formula = ({ equation }: { equation: string }) => (
  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-inner my-4 text-center overflow-x-auto border border-indigo-100">
    <code className="text-lg font-mono text-indigo-900">{equation}</code>
  </div>
);

const Section = ({ title, icon: Icon, colorClass, bgClass, children, id }: { 
  title: string; 
  icon: React.ElementType; 
  colorClass: string; 
  bgClass: string; 
  children: React.ReactNode; 
  id: string;
}) => (
  <section id={id} className={`py-16 px-6 md:px-12 lg:px-24 ${bgClass} transition-colors duration-300`}>
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-3 rounded-2xl ${colorClass} text-white shadow-lg`}>
          <Icon size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
      </div>
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  </section>
);

const InfoCard = ({ title, children, icon: Icon, colorClass }: { 
  title: string; 
  children: React.ReactNode; 
  icon?: React.ElementType; 
  colorClass: string;
}) => (
  <Card className="border-none shadow-md bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <div className={`h-2 ${colorClass}`} />
    <CardHeader className="pb-2">
      <CardTitle className="text-xl flex items-center gap-2 text-gray-800">
        {Icon && <Icon className="text-gray-500" size={20} />}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="text-gray-600">
      {children}
    </CardContent>
  </Card>
);

export default function RepoMarketArticle() {
  const currentArticle = articles.find(article => article.slug === 'repo-market-dollar-funding-mechanics-strategies-systemic-risks');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-200">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30"></div>
          
          {/* Deep Research Badge */}
          <div className="absolute top-8 left-8 z-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/90 backdrop-blur-md border border-purple-400/30 shadow-xl font-bold text-sm">
              Deep Research
            </span>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-xl">
              <Activity className="text-teal-300" size={20} />
              <span className="text-sm font-medium tracking-wide uppercase text-teal-50">Global Financial Plumbing</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-teal-100">
              The Repo Market &<br />Dollar Funding
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl font-light leading-relaxed mb-10">
              Mechanics, Strategies, and Systemic Risks of the $1 Trillion Daily Engine of Global Finance.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Repo Market Infographic" 
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
            alt="Repo Market Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        {/* Executive Summary */}
        <Section id="executive" title="Executive Summary" icon={LayoutDashboard} colorClass="bg-gradient-to-br from-blue-500 to-indigo-600" bgClass="bg-white">
          <p className="text-xl leading-relaxed text-gray-700 font-medium mb-6">
            The repurchase agreement market constitutes the foundational infrastructure of global finance, providing the essential plumbing through which trillions of dollars in short-term secured funding circulate daily. 
          </p>
          <p className="mb-4">
            Operating largely outside the traditional commercial banking framework, the repo market enables institutional investors, primary dealers, and hedge funds to secure overnight or term financing by pledging collateral, primarily U.S. Treasury securities. The efficiency, liquidity, and pricing of this market dictate the cost of capital across the broader global economy, serving as the critical layer upon which modern monetary policy implementation, leveraged relative-value trading, and global dollar liquidity depend.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <InfoCard title="The Shift to SOFR" colorClass="bg-blue-500" icon={TrendingUp}>
              The transition from the credit-sensitive LIBOR to the Secured Overnight Financing Rate (SOFR) fundamentally anchored benchmark lending to actual Treasury-collateralized transactions, creating a nearly risk-free benchmark supported by over $1T in daily volume.
            </InfoCard>
            <InfoCard title="Systemic Vulnerabilities" colorClass="bg-red-500" icon={AlertTriangle}>
              Extreme reliance on repo funding exposes the system to liquidity shocks. When systemic reserves fall below a critical threshold, localized stresses rapidly metastasize, as seen in Sept 2019 and March 2020.
            </InfoCard>
          </div>
          <p>
            As regulatory frameworks aggressively evolve toward mandatory central clearing through the Fixed Income Clearing Corporation (FICC) by 2025 and 2026, understanding the underlying mechanics, mathematical pricing models, and embedded systemic risks of the repo market is strictly necessary for anticipating the next potential fracture in global dollar liquidity.
          </p>
        </Section>

        {/* Foundation */}
        <Section id="foundation" title="Foundation: The Repo Market & SOFR" icon={BookOpen} colorClass="bg-gradient-to-br from-teal-400 to-emerald-600" bgClass="bg-slate-50 border-y border-slate-200">
          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">The Mechanics of a Repurchase Agreement</h3>
          <p>
            A repurchase agreement is, fundamentally, a collateralized loan structured as a simultaneous sale and forward agreement to repurchase a specific security. The borrower (cash receiver) sells a security to the lender (cash provider) with a binding commitment to repurchase it at a higher price on a specified future date. The difference between the initial sale price and the forward repurchase price represents the implied interest, known globally as the <strong>repo rate</strong>.
          </p>
          
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 my-6">
            <h4 className="font-bold text-teal-900 mb-2 flex items-center gap-2"><Info size={18}/> Haircuts and Margin</h4>
            <p className="text-teal-800 text-sm md:text-base">
              To protect the cash lender against counterparty default and intraday collateral price depreciation, repo transactions incorporate an initial margin, universally referred to as a <strong>haircut</strong>. If a Treasury is valued at $100 and the lender applies a 2% haircut, they advance only $98 in cash.
              <br/><br/>
              In non-centrally cleared bilateral markets, haircuts are frequently negotiated to zero or negative levels for highly rated hedge funds, providing massive leverage.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">SOFR: The Anchor of Trillions in Dollar Funding</h3>
          <p>
            Following the LIBOR manipulation scandals, the Alternative Reference Rates Committee selected the <strong>Secured Overnight Financing Rate (SOFR)</strong> as the preferred alternative benchmark. SOFR is a broad, purely transaction-based measure of the cost of borrowing cash overnight collateralized by U.S. Treasury securities.
          </p>
          <p>
            The NY Fed computes SOFR as a volume-weighted median from three distinct, massive repo market segments:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
            <li><strong>Tri-party Repo:</strong> Transactions cleared through BNY Mellon (broad general collateral).</li>
            <li><strong>GCF Repo:</strong> Dealer-to-dealer activity cleared through FICC.</li>
            <li><strong>Bilateral Treasury Repo:</strong> Specific-issue Delivery-versus-Payment (DVP) transactions cleared through FICC.</li>
          </ul>

          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 my-8">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-emerald-50 text-emerald-900">
                  <th className="p-4 font-bold border-b border-emerald-100">Feature</th>
                  <th className="p-4 font-bold border-b border-emerald-100">Legacy Rate (LIBOR)</th>
                  <th className="p-4 font-bold border-b border-emerald-100">SOFR</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="p-4 border-b border-gray-100 font-medium">Underlying Asset</td>
                  <td className="p-4 border-b border-gray-100">Unsecured interbank credit</td>
                  <td className="p-4 border-b border-gray-100">Collateralized by U.S. Treasuries</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="p-4 border-b border-gray-100 font-medium">Volume</td>
                  <td className="p-4 border-b border-gray-100">Limited, reliant on estimates</td>
                  <td className="p-4 border-b border-gray-100">&gt;$1 Trillion daily actual transactions</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Market Stress Behavior</td>
                  <td className="p-4">Rises sharply (credit risk)</td>
                  <td className="p-4">May fall (flight-to-quality dynamics)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Mechanics & Math */}
        <Section id="mechanics" title="Mechanics & Math: The Treasury Basis Trade" icon={Activity} colorClass="bg-gradient-to-br from-indigo-500 to-purple-600" bgClass="bg-white">
          <p>
            One of the most consequential applications of repo market funding is the execution of the <strong>Treasury basis trade</strong>. This complex relative-value arbitrage strategy seeks to exploit minute, fleeting pricing discrepancies between cash Treasury bonds and their corresponding futures contracts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cash-Futures Arbitrage</h3>
              <p className="text-gray-700">
                When futures trade at a premium relative to the cash market (futures are &quot;rich&quot;), traders execute a cash-and-carry arbitrage (&quot;going long the basis&quot;). They buy the cash bond in the spot market, finance it overnight via repo, and simultaneously short the futures contract. At expiry, they deliver the bond to lock in the spread.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Conversion Factors (CF)</h3>
              <p className="text-gray-700">
                Futures contracts are standardized to a 6% notional coupon. Since actual bonds vary, a Conversion Factor (CF) is applied to the delivery invoice price to equalize them. Traders must identify the <strong>Cheapest-to-Deliver (CTD)</strong> bond to optimize profitability.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">The Mathematical Formulas</h3>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">1. Gross Basis</h4>
              <p className="text-sm text-slate-600 mb-2">The raw, unfinanced clean price difference.</p>
              <Formula equation="Gross Basis = P_bond - (P_fut × CF)" />
            </div>

            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2">2. Net Basis</h4>
              <p className="text-sm text-indigo-800 mb-2">Accounts for actual repo financing costs. The lowest Net Basis identifies the CTD bond.</p>
              <Formula equation="Net Basis = [ P_dirty × (1 + r × (n/M)) ] - [ (P_fut × CF) + AI_del ]" />
              <p className="text-xs text-indigo-700 mt-2">
                Where <code>P_dirty</code> is dirty price, <code>r</code> is repo rate, <code>n</code> is days to delivery, <code>M</code> is day-count (360), <code>AI_del</code> is accrued interest at delivery.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h4 className="font-bold text-purple-900 mb-2">3. Implied Repo Rate (IRR)</h4>
              <p className="text-sm text-purple-800 mb-2">The theoretical break-even financing rate. Highest IRR identifies the definitive CTD.</p>
              <Formula equation="IRR = { [(P_fut × CF) + AI_del] - (P_bond + AI) } / (P_bond + AI) × (M/n)" />
              <p className="text-xs text-purple-700 mt-2">
                If actual repo rate &lt; IRR, the trade generates positive carry.
              </p>
            </div>
          </div>
        </Section>

        {/* Strategy */}
        <Section id="strategy" title="Strategy: Leverage & Liquidity" icon={DollarSign} colorClass="bg-gradient-to-br from-amber-400 to-orange-500" bgClass="bg-amber-50/30 border-y border-amber-100">
          <h3 className="text-2xl font-bold text-gray-800 mt-4 mb-4">Hedge Funds & Zero-Haircut Leverage</h3>
          <p>
            Because the pure profit margin on a Treasury basis trade is typically measured in mere basis points, it is entirely unviable unleveraged. Hedge funds rely on the repo market to exponentially amplify these microscopic returns.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 my-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
            <div className="flex-1">
              <h4 className="font-bold text-amber-900 mb-2">Aggregate Leverage: 56-to-1</h4>
              <p className="text-amber-800 text-sm mb-4">
                In the bilateral market, prime brokers often grant zero haircuts based on proportionate margining. If a fund holds perfectly correlated long cash and short futures, dealers net the exposure.
              </p>
              <Formula equation="h = -p × s_θ - q × s_{1-θ}" />
              <p className="text-xs text-amber-700 mt-2">
                (Formula for proportionate net margin reducing required capital to near zero).
              </p>
            </div>
            <div className="w-full md:w-1/3 text-center p-4 bg-amber-50 rounded-xl">
              <span className="block text-4xl font-black text-amber-600 mb-1">$815B</span>
              <span className="text-sm font-medium text-amber-900">Repo borrowing at zero/negative haircuts (Dec 2022)</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Primary Dealers & The Fed Facilities</h3>
          <p>
            Dealers supply balance sheet capacity but are constrained by the <strong>Supplementary Leverage Ratio (SLR)</strong>. To circumvent this, they increasingly use FICC Sponsored Repo to clear trades centrally, achieving vital balance sheet netting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-900 text-lg">Overnight Reverse Repo (ON RRP)</CardTitle>
              </CardHeader>
              <CardContent className="text-orange-800">
                Sets a <strong>hard floor</strong> on rates. Non-banks lend cash to the Fed for Treasury collateral, absorbing excess liquidity and draining reserves.
              </CardContent>
            </Card>
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-900 text-lg">Standing Repo Facility (SRF)</CardTitle>
              </CardHeader>
              <CardContent className="text-orange-800">
                Sets a <strong>strict ceiling</strong> on rates. Eligible counterparties borrow cash directly from the Fed by pledging Treasuries, injecting liquidity when reserves are scarce.
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Risks & Pitfalls */}
        <Section id="risks" title="Risks & Pitfalls: Historical Dislocations" icon={AlertTriangle} colorClass="bg-gradient-to-br from-red-500 to-rose-600" bgClass="bg-white">
          <p className="text-lg text-gray-700 mb-8">
            The extreme systemic reliance on short-term repo funding, violently amplified by 56-to-1 aggregate leverage, renders the Treasury basis trade exquisitely susceptible to unexpected funding shocks (duration mismatch).
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-rose-500 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900">1. September 2019 Repo Spike</h3>
              <p className="text-gray-700 mt-2">
                A sharp drain in aggregate bank reserves (corporate tax payments + heavy Treasury settlements) compounded by prolonged Quantitative Tightening. Reserves plunged, cash providers pulled back, and rates spiked violently, forcing the Fed to intervene to stop margin calls on leveraged funds.
              </p>
            </div>
            
            <div className="border-l-4 border-rose-500 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900">2. March 2020 &quot;Dash for Cash&quot;</h3>
              <p className="text-gray-700 mt-2">
                Pandemic volatility spiked margins. Investors hoarded physical cash. Dealers, bound by rigid SLR limits, lacked balance sheet capacity to absorb Treasuries. Hedge funds were forced into distressed unwinds, causing U.S. Treasuries to crash simultaneously with risk assets until massive Fed QE intervened.
              </p>
            </div>

            <div className="border-l-4 border-rose-500 pl-6 py-2">
              <h3 className="text-xl font-bold text-gray-900">3. The Central Clearing Mandate (2025/2026)</h3>
              <p className="text-gray-700 mt-2">
                New SEC rules mandate FICC central clearing. Standardized 2-4% initial margins eliminate zero-haircuts. This forces massive deleveraging (e.g., from 56:1 down to 25:1), potentially withdrawing $300B+ in Treasury liquidity if funds refuse to raise more capital.
              </p>
            </div>
          </div>
        </Section>

        {/* Synthesis */}
        <Section id="synthesis" title="Synthesis: Systemic Warning Checklist" icon={CheckCircle} colorClass="bg-gradient-to-br from-blue-600 to-cyan-500" bgClass="bg-slate-900 text-slate-300">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">Actionable Indicators</h2>
          <p className="text-lg text-slate-400 mb-10">
            When the repo market plumbing breaks, equities, corporate bonds, and commodities suffer severe, highly correlated drawdowns. Monitor these five definitive early-warning indicators of impending funding crises.
          </p>

          <div className="grid gap-4">
            {[
              {
                title: "1. SOFR to IOER Spread",
                desc: "If SOFR persistently prints above the Fed's Interest on Reserve Balances (IOER), banks are demanding a premium. This is the earliest statistical warning that aggregate reserves are approaching dangerous scarcity."
              },
              {
                title: "2. Surges in Standing Repo Facility (SRF) Operations",
                desc: "The SRF is a safety valve. A sudden, massive spike in usage (like late Oct 2025) is a glaring red flag that private structural liquidity constraints have become binding."
              },
              {
                title: "3. Treasury Repo Fails-to-Deliver",
                desc: "Surging fails (e.g., nearing $60B) indicate severe localized shortages of specific safe collateral and unquenchable demand for leverage—a precursor to basis-trade unwinds."
              },
              {
                title: "4. Unchecked Growth in Sponsored Repo Volumes",
                desc: "Exponential volume growth (>$13T peaks) highlights massive unseen leverage. If volumes suddenly plateau or contract, dealers are withdrawing balance sheet, forcing leveraged liquidations."
              },
              {
                title: "5. Divergence in the Cash-Futures Basis Spread",
                desc: "If the basis spread suddenly widens and remains disconnected, arbitrageurs cannot secure repo financing or are actively unwinding due to margin calls. This is the ultimate real-time trigger of a systemic crash."
              }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:bg-slate-800 transition-colors">
                <h4 className="text-xl font-bold text-cyan-400 mb-2">{item.title}</h4>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Call-to-Action: Read Full Research Paper */}
        {currentArticle?.googleDoc && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl my-8 text-center max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
              >
                <FileText className="inline mr-2" />
                Read Full Research Paper
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-500 py-8 text-center text-sm">
          <p>© 2026 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}
