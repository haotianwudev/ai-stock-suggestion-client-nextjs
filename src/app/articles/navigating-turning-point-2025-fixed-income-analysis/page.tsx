'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, TrendingUp, Shield, Lock, Briefcase, Landmark, PieChart, Banknote, Building, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Reusable Components ---
const StatCard = ({ icon, label, value, subtext }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm transform hover:scale-105 transition-transform duration-300 ease-in-out">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="text-teal-600">{icon}</div>
    </div>
    <p className="text-3xl lg:text-4xl font-bold text-slate-900">{value}</p>
    {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4 tracking-tight">{children}</h2>
);

const SectionSubtitle = ({ children }) => (
  <p className="text-lg text-gray-500 text-center max-w-3xl mx-auto mb-12">{children}</p>
);

const OpportunityCard = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-lg flex flex-col items-center text-center h-full">
    <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6 border border-teal-200">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
  </div>
);

const SectorCard = ({ icon, title, recommendation, rationale }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full shadow-md">
    <div className="flex items-start gap-4">
      <div className="bg-slate-100 text-slate-600 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className={`text-sm font-semibold ${recommendation.color}`}>{recommendation.text}</p>
      </div>
    </div>
    <p className="text-sm text-gray-600 mt-4">{rationale}</p>
  </div>
);

const BullSteepeningChart = () => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/80 w-full max-w-2xl mx-auto shadow-sm">
    <div className="text-slate-800 text-center mb-4">
      <h4 className="font-bold">Yield Curve: Bull Steepening</h4>
      <p className="text-sm text-gray-500">Short-term rates are expected to fall faster than long-term rates.</p>
    </div>
    <div className="relative h-48">
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="10" y1="10" x2="10" y2="90" stroke="#E5E7EB" strokeWidth="0.5" />
        <line x1="10" y1="90" x2="290" y2="90" stroke="#E5E7EB" strokeWidth="0.5" />
        <text x="0" y="15" fill="#6B7280" fontSize="6">High</text>
        <text x="0" y="90" fill="#6B7280" fontSize="6">Low</text>
        <text x="15" y="98" fill="#6B7280" fontSize="6">2Y</text>
        <text x="275" y="98" fill="#6B7280" fontSize="6">30Y</text>
        
        {/* Current Flat/Inverted Curve (Dashed) */}
        <path d="M 20 30 Q 150 40 280 50" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
        
        {/* Expected Bull Steepening Curve (Solid) */}
        <path d="M 20 80 Q 150 65 280 55" stroke="#10B981" strokeWidth="2" fill="none" />
      </svg>
    </div>
    <div className="flex justify-center text-xs text-gray-500 mt-2 space-x-4">
      <div className="flex items-center">
        <span className="w-3 h-0.5 bg-amber-500 mr-2 border border-amber-500/50" style={{borderStyle: 'dashed'}}></span>
        <span>Current Curve</span>
      </div>
      <div className="flex items-center">
        <span className="w-3 h-0.5 bg-emerald-500 mr-2"></span>
        <span>Expected Curve</span>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function FixedIncomeReportPage() {
  const currentArticle = articles.find(article => article.slug === 'navigating-turning-point-2025-fixed-income-analysis');

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

      <div className="bg-gray-50 min-h-screen text-gray-600 font-sans antialiased">
        <div className="absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(#dbeafe 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}>
        </div>

        <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Return to Home Button */}
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Deep Research Badge */}
          <div className="absolute top-8 left-8 z-20">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Deep Research
            </span>
          </div>

          {/* --- Hero Section --- */}
          <section className="text-center mb-32">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Navigating the Turning Point
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
              An in-depth analysis of the 2025 long-term fixed income market. Discover key opportunities shaped by high starting yields and the anticipated Federal Reserve policy pivot.
            </p>
            <p className="text-sm text-gray-400 mt-4">Analysis as of September 16, 2025</p>
            <div className="mt-10">
              <a href="#opportunity" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-700 transition-colors duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20">
                Explore Strategies
              </a>
            </div>
          </section>

          {/* --- Market Performance Section --- */}
          <section className="mb-32">
            <SectionTitle>A Market Defined by Income</SectionTitle>
            <SectionSubtitle>
              In 2025, fixed income total returns are dominated by the renewed power of coupon income, providing a substantial cushion against interest rate volatility and a compelling alternative to cash.
            </SectionSubtitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                label="H1 2025 Broad Index Returns"
                value="4-7.25%" 
                icon={<PieChart size={24} />}
                subtext="Driven primarily by coupon payments."
              />
              <StatCard 
                label="High-Yield Bond Yields"
                value="~7.5%" 
                icon={<TrendingUp size={24} />}
                subtext="Offering historically high income streams."
              />
              <StatCard 
                label="Projected 10-Yr Treasury"
                value="3.75 - 4.25%" 
                icon={<TrendingDown size={24} />}
                subtext="Ending 2025 lower as Fed cuts take hold."
              />
              <StatCard 
                label="Primary Return Driver"
                value="Income"
                icon={<Banknote size={24} />}
                subtext="A paradigm shift from price appreciation."
              />
            </div>
          </section>

          {/* --- Macroeconomic Section --- */}
          <section className="mb-32">
            <SectionTitle>The Macroeconomic Crucible</SectionTitle>
            <SectionSubtitle>
              A "stagflation-lite" environment—characterized by slowing growth that narrowly avoids recession and stickier-than-expected inflation—sets the stage for a Federal Reserve pivot.
            </SectionSubtitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-slate-800">Growth Deceleration</h4>
                <p className="text-3xl font-bold text-teal-600 my-2">1.6%</p>
                <p className="text-xs text-gray-500">Projected 2025 U.S. GDP Growth, down from ~2.5% in 2024.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-slate-800">Stubborn Inflation</h4>
                <p className="text-3xl font-bold text-teal-600 my-2">2.9%</p>
                <p className="text-xs text-gray-500">Headline CPI (Aug 2025), fueled by base effects and resilient services inflation.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-slate-800">Fed's Pivot</h4>
                <p className="text-3xl font-bold text-teal-600 my-2">Rate Cuts</p>
                <p className="text-xs text-gray-500">Expected in H2 2025 to support a softening labor market.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-slate-800">Labor Market</h4>
                <p className="text-3xl font-bold text-teal-600 my-2">Cooling</p>
                <p className="text-xs text-gray-500">Slowing payrolls shift Fed's focus toward employment.</p>
              </div>
            </div>
          </section>

          {/* --- Yield Curve & Stock/Bond Section --- */}
          <section className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">The Yield Curve's Message</h3>
                <p className="text-gray-600 mb-6">
                  A strong consensus anticipates a "bull-steepening" scenario. This is driven by the market pricing in near-term Fed cuts (depressing the short end) while still demanding a higher term premium for longer-dated bonds due to inflation and substantial Treasury issuance needed to fund fiscal deficits.
                </p>
                <BullSteepeningChart />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">A Return to Ballast</h3>
                <p className="text-gray-600 mb-6">
                  After years of being positively correlated due to inflation shocks, the stock-bond relationship has normalized. As growth concerns become the primary market driver over inflation, capital is expected to flow from equities to the safety of government bonds during downturns, restoring their classic diversifying role.
                </p>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 flex justify-around items-center shadow-sm">
                  <div className="text-center">
                    <TrendingDown className="text-red-500 mx-auto mb-2" size={40} />
                    <p className="text-slate-800 font-semibold">Equities</p>
                    <p className="text-sm text-gray-500">Face growth headwinds</p>
                  </div>
                  <div className="text-5xl font-thin text-gray-300">+</div>
                  <div className="text-center">
                    <TrendingUp className="text-green-500 mx-auto mb-2" size={40} />
                    <p className="text-slate-800 font-semibold">Bonds</p>
                    <p className="text-sm text-gray-500">Benefit from safety bid</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Sector Deep Dive --- */}
          <section className="mb-32">
            <SectionTitle>Sector Deep Dive: Where to Position</SectionTitle>
            <SectionSubtitle>
              A granular look at the risk-reward profile across key fixed-income sectors reveals a clear preference for quality and tax-advantaged assets.
            </SectionSubtitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SectorCard 
                icon={<Building size={24} />}
                title="Investment Grade Corporates"
                recommendation={{text: "Favorable", color: "text-green-600"}}
                rationale="Corporate balance sheets remain healthy, but spreads are tight, offering little compensation for risk. Focus on non-cyclical sectors and issuers with strong pricing power."
              />
              <SectorCard 
                icon={<TrendingUp size={24} />}
                title="High-Yield Corporates"
                recommendation={{text: "Cautious / Underweight", color: "text-amber-600"}}
                rationale="While all-in yields are attractive, they don't fully compensate for the rising risk of defaults in a decelerating economy. A highly selective approach is critical."
              />
              <SectorCard 
                icon={<Landmark size={24} />}
                title="Municipal Bonds"
                recommendation={{text: "Highly Favorable", color: "text-teal-600"}}
                rationale="A standout opportunity. Tax-equivalent yields are compelling, credit fundamentals are strong, and the sector is insulated from many federal policy headwinds."
              />
            </div>
          </section>

          {/* --- Strategic Opportunities Section --- */}
          <section id="opportunity" className="mb-24">
            <SectionTitle>Core Strategies for 2025</SectionTitle>
            <SectionSubtitle>
              The current landscape presents a clear, time-sensitive imperative: lock in historically high yields in quality assets before the anticipated easing cycle commences.
            </SectionSubtitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <OpportunityCard 
                title="Lock In High Yields" 
                icon={<Lock size={28} />}
              >
                The primary imperative. Extend duration out of cash to capture yields of 5%+ in high-quality assets. This window will narrow as the market prices in future rate cuts.
              </OpportunityCard>
              <OpportunityCard 
                title="Prioritize Quality" 
                icon={<Shield size={28} />}
              >
                Focus on investment-grade bonds. Spreads on lower-quality credit do not adequately compensate for rising default risk. Focus on firms with strong cash flows and low leverage.
              </OpportunityCard>
              <OpportunityCard 
                title="Embrace Intermediate Duration" 
                icon={<Briefcase size={28} />}
              >
                Position in the "belly" of the curve (2-10 year maturities) to benefit most from Fed cuts while mitigating risk from long-term fiscal uncertainty impacting the 20-30 year range.
              </OpportunityCard>
              <OpportunityCard 
                title="Leverage Municipal Bonds" 
                icon={<Landmark size={28} />}
              >
                For taxable investors, the tax-equivalent yields on high-quality munis are among the most attractive in years, offering a compelling defensive and income-generating position.
              </OpportunityCard>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center mb-16">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Dive Deeper into the Analysis</h3>
              <p className="text-gray-600 mb-6">
                Access the complete research document with detailed sector analysis, risk assessments, and strategic implementation guidelines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-teal-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    Read Full Research &rarr;
                  </a>
                )}
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
              </div>
            </div>
          </section>

          {/* Risk Warning */}
          <section className="mb-16">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg max-w-4xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-amber-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Investment Risk Disclosure</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>
                      Fixed income investments carry interest rate risk, credit risk, and inflation risk. Bond prices move inversely to interest rates. 
                      High-yield bonds carry additional credit and default risk. Municipal bonds may be subject to state and local taxes and the alternative minimum tax. 
                      Past performance does not guarantee future results. This analysis is for educational purposes only and should not be considered personalized investment advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* --- Footer --- */}
        <footer className="border-t border-gray-200 text-center py-8">
          <p className="text-gray-500 text-sm">© 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
          <p className="text-gray-500 text-xs mt-2 max-w-2xl mx-auto">
            This content is for informational purposes only and does not constitute financial, investment, or tax advice. 
            Projections are based on publicly available market research and are subject to change. 
            Consult with a qualified professional before making any investment decisions.
          </p>
        </footer>
      </div>
    </>
  );
}
