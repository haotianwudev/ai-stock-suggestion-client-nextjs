'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Helper Components & Icons (for better organization in a single file) ---
const Icon = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-3 bg-slate-100 dark:bg-slate-800 rounded-full ${className}`}>
    {children}
  </div>
);

const GoldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);

const FixedIncomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const SmallCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const OptionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    <path d="m9 14 2 2 4-4"></path>
  </svg>
);

// --- Main Page Components ---
const Header = () => (
  <header className="bg-slate-900 text-white py-12 md:py-20">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
        Navigating the Inflection Point
      </h1>
      <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
        A Multi-Asset Strategy for an Era of Peak Valuations and Monetary Easing
      </p>
    </div>
  </header>
);

const ExecutiveSummary = () => (
  <Section title="Executive Summary" romanNumeral="">
    <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
      The global investment landscape is defined by a paradox: equity markets at all-time highs while the Federal Reserve is poised to initiate monetary easing. This confluence of peak valuations and impending rate cuts creates a precarious environment, demanding a strategic shift away from passive, broad-market exposure towards a nuanced, actively managed, and deeply diversified portfolio.
    </p>
    <p className="text-slate-600 dark:text-slate-400">
      This report advocates for a portfolio construction philosophy centered on resilience. The recommended approach involves a strategic rebalancing away from concentrated, overvalued market segments and a deliberate allocation towards non-correlated assets, duration-sensitive instruments, and tactical opportunities in undervalued sectors. This framework is designed to build a robust portfolio capable of weathering multiple potential scenarios while capitalizing on the structural shifts this new monetary regime will inevitably create.
    </p>
  </Section>
);

const Section = ({ title, romanNumeral, children }: { title: string; romanNumeral?: string; children: React.ReactNode }) => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
          <span className="text-sky-600 dark:text-sky-500">{romanNumeral ? `${romanNumeral}. ` : ''}</span>
          {title}
        </h2>
        <div className="mt-6 space-y-6 text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  </section>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">{title}</h3>
    <div className="space-y-4 text-slate-600 dark:text-slate-400 border-l-2 border-slate-200 dark:border-slate-700 pl-6">
      {children}
    </div>
  </div>
);

const InvestmentChoiceCard = ({ icon, title, description, children }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  children?: React.ReactNode 
}) => (
  <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]">
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
    {children && (
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-t border-slate-200 dark:border-slate-700">
        {children}
      </div>
    )}
  </div>
);

// --- The Main Page ---
export default function MarketAnalysisPage() {
  const currentArticle = articles.find(article => article.slug === 'navigating-inflection-point-multi-asset-strategy-peak-valuations');

  return (
    <div className="bg-slate-50 dark:bg-slate-900 antialiased">
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

      {/* Return to Home Button */}
      <div className="container mx-auto px-6 pt-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </div>

      {/* Deep Research Badge */}
      <div className="absolute top-20 left-6 z-10">
        <span className="inline-block bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Deep Research
        </span>
      </div>

      {/* Podcast Badge */}
      <div className="absolute top-20 right-6 z-10">
        <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Podcast
        </span>
      </div>

      <Header />
      
      <main>
        <ExecutiveSummary />

        {/* --- Macroeconomic Landscape --- */}
        <div className="bg-white dark:bg-slate-800/50">
          <Section title="The Macroeconomic Landscape: A Precarious Peak" romanNumeral="I">
            <SubSection title="1.1 Anatomy of an All-Time High Market">
              <p>
                Equity markets have shown remarkable strength, but the rally reveals vulnerabilities. Leadership is extremely concentrated in a few mega-cap tech companies, making the market dependent on their success. This has pushed valuations to historical extremes, such as the Shiller P/E ratio, suggesting optimism is fully priced in and leaving little margin for safety.
              </p>
            </SubSection>

            <SubSection title="1.2 The Asset Bubble Debate: Echoes of the Past?">
              <p>
                The combination of record prices, concentrated tech leadership (AI), and stretched valuations sparks debate about an asset bubble. This places the Fed in a difficult position: easing policy could fuel a bubble, while failing to ease could risk a recession, creating a complex policy path with few historical parallels.
              </p>
            </SubSection>

            <SubSection title="1.3 The Federal Reserve's Pivot: Catalyst for Volatility">
              <p>
                Markets anticipate a Fed pivot toward rate cuts, driven by a softening labor market and cooling inflation. Historically, the period around a Fed pivot is a catalyst for heightened market volatility, regardless of whether the outcome is a "soft landing" (S&P 500 avg. +20.6% return) or a "hard landing" (more lackluster returns). Investors should prepare for a bumpy ride.
              </p>
            </SubSection>
          </Section>
        </div>

        {/* --- Pillars of Stability --- */}
        <Section title="Pillars of Stability: Haven and Hedging Assets" romanNumeral="II">
          <div className="grid md:grid-cols-2 gap-8">
            <InvestmentChoiceCard
              icon={<Icon><GoldIcon /></Icon>}
              title="Gold"
              description="Gold's performance is powerfully driven by its inverse relationship with real interest rates. As the Fed cuts nominal rates while inflation remains sticky, real yields are expected to fall, reducing the opportunity cost of holding non-yielding gold."
            >
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">◆</span>
                  <span>Historically performs well during Fed easing cycles with double-digit gains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">◆</span>
                  <span>Provides a low-to-negative correlation with equities, acting as a buffer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">◆</span>
                  <span>Acts as a safe-haven asset during geopolitical turmoil and currency debasement.</span>
                </li>
              </ul>
            </InvestmentChoiceCard>

            <InvestmentChoiceCard
              icon={<Icon><FixedIncomeIcon /></Icon>}
              title="Fixed Income"
              description="With the Fed on the cusp of a rate-cutting cycle, fixed income strategy shifts from collecting coupons to pursuing capital appreciation. The key is extending duration, as bond prices rise when interest rates fall."
            >
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">◆</span>
                  <span>Historically, ~80% of returns in an easing cycle occur in the first six months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">◆</span>
                  <span>The 3 to 7-year maturity range offers a compelling balance of duration exposure and manageable volatility.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">◆</span>
                  <span>A shift from cash to intermediate-term bonds is crucial to capture potential gains.</span>
                </li>
              </ul>
            </InvestmentChoiceCard>
          </div>
        </Section>

        {/* --- Spectrum of Opportunity --- */}
        <div className="bg-white dark:bg-slate-800/50">
          <Section title="The Spectrum of Opportunity: Evaluating Risk Assets" romanNumeral="III">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  3.1 Navigating the Credit Markets: A Flight to Quality
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Credit spreads are near historic lows, suggesting complacency and inadequate compensation for risks in a slowing economy. With default rates projected to rise, a "flight to quality" is prudent.
                </p>
                <ul className="space-y-3 pl-4 list-disc text-slate-600 dark:text-slate-400">
                  <li>
                    <strong className="text-slate-800 dark:text-slate-200">Investment Grade (IG):</strong> Well-positioned to benefit from falling Treasury yields and rising risk aversion.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-200">High-Yield (HY):</strong> Unfavorable risk-reward profile. Narrow spreads offer little cushion against a potential sharp widening if a recession occurs.
                  </li>
                </ul>
              </div>

              <InvestmentChoiceCard
                icon={<Icon><SmallCapIcon /></Icon>}
                title="Small-Cap Equities"
                description="A compelling, higher-risk tactical opportunity. Small caps historically outperform during periods of declining rates and early economic expansions, and currently trade at a significant valuation discount to large caps."
              >
                <div className="text-sm">
                  <p className="font-semibold text-red-600 dark:text-red-400 mb-2">High-Risk / Contingent Play:</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    This is a tactical bet contingent on the Fed engineering a soft landing. In a hard landing scenario, small caps are likely to underperform significantly due to higher volatility and vulnerability to economic downturns.
                  </p>
                </div>
              </InvestmentChoiceCard>
            </div>
          </Section>
        </div>

        {/* --- Advanced Strategies --- */}
        <Section title="Advanced Strategies for an Uncertain Environment" romanNumeral="IV">
          <p className="mb-8 max-w-3xl text-slate-600 dark:text-slate-400">
            Elevated market volatility, a typical feature of a Fed policy pivot, increases option premiums. This creates an attractive environment for income-generating strategies that involve selling options to harvest this "volatility premium."
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Icon><OptionsIcon /></Icon>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Option Writing Strategies</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Systematically selling options can generate a consistent income stream, lower portfolio volatility, and enhance risk-adjusted returns.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:text-slate-400 dark:bg-slate-900">
                  <tr>
                    <th scope="col" className="px-6 py-3">Strategy</th>
                    <th scope="col" className="px-6 py-3">Market Outlook</th>
                    <th scope="col" className="px-6 py-3">Strategic Goal</th>
                    <th scope="col" className="px-6 py-3">Max Profit / Risk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">
                      Covered Call
                    </th>
                    <td className="px-6 py-4">Neutral to Mildly Bullish</td>
                    <td className="px-6 py-4">Generate income on existing holdings</td>
                    <td className="px-6 py-4">Profit is limited; Risk is stock falling to zero</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-800">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">
                      Cash-Secured Put
                    </th>
                    <td className="px-6 py-4">Neutral to Mildly Bullish</td>
                    <td className="px-6 py-4">Acquire stock at a discount or generate income</td>
                    <td className="px-6 py-4">Profit limited to premium; Risk is buying stock that falls further</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* --- Synthesis --- */}
        <div className="bg-sky-900/90 text-white">
          <Section title="Synthesis: A Blueprint for a Resilient Portfolio" romanNumeral="V">
            <p className="text-lg text-sky-200 mb-6">
              The current juncture is a critical time to rebalance away from over-concentrated U.S. large-cap equity exposure. A resilient, all-weather allocation should be constructed to navigate both soft and hard landing scenarios.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-sky-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Core Global Equities</h4>
                <p className="text-sm text-sky-200">
                  Diversify globally with a bias towards high-quality companies with strong balance sheets and pricing power.
                </p>
              </div>
              <div className="bg-sky-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Strategic Gold (5-10%)</h4>
                <p className="text-sm text-sky-200">
                  A permanent allocation as a non-correlated hedge against falling real yields and uncertainty.
                </p>
              </div>
              <div className="bg-sky-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Duration-Focused Fixed Income</h4>
                <p className="text-sm text-sky-200">
                  Shift to intermediate duration (3-7 years) to capture capital appreciation from falling rates.
                </p>
              </div>
              <div className="bg-sky-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Tactical Small-Cap Equity</h4>
                <p className="text-sm text-sky-200">
                  A higher-risk, satellite holding to gain leveraged exposure to a potential soft landing scenario.
                </p>
              </div>
              <div className="bg-sky-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Option Writing Overlay</h4>
                <p className="text-sm text-sky-200">
                  Integrate covered calls and cash-secured puts to generate income and lower volatility.
                </p>
              </div>
              <div className="bg-sky-800/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Risk Management</h4>
                <p className="text-sm text-sky-200">
                  Employ disciplined rebalancing and dollar-cost averaging while avoiding market timing.
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Navigate the Inflection Point?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Dive deeper into this comprehensive multi-asset strategy analysis and listen to our detailed podcast discussion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  📄 Read Full Research
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
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          <p className="mt-2">
            This content is for informational purposes only and does not constitute financial advice. Consult with a professional financial advisor before making any investment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}