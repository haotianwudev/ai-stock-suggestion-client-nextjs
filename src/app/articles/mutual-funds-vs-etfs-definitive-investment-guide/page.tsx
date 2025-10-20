'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Zap, Users, BookOpen } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Reusable Components ---
const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
    <div className="flex items-center gap-4 mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const Section = ({ title, subtitle, children, className = '', id = '' }: { 
  title: string; 
  subtitle: string; 
  children: React.ReactNode; 
  className?: string; 
  id?: string; 
}) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

const Highlight = ({ children }: { children: React.ReactNode }) => <span className="font-semibold text-indigo-600">{children}</span>;

// --- Main Page Sections ---
const HeroSection = () => (
  <div className="relative overflow-hidden bg-gray-50 border-b border-gray-200">
    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
        Mutual Funds vs. ETFs
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        A definitive guide to understanding the key differences, costs, and strategic advantages of two of the most popular investment vehicles.
      </p>
    </div>
  </div>
);

const ComparisonSection = () => {
  const comparisonData = [
    {
      attribute: "Trading & Pricing",
      etf: (
        <>
          Trades like a stock on an exchange <Highlight>throughout the day</Highlight>. Price is determined by market supply and demand, subject to bid-ask spreads and potential premiums/discounts to its underlying value (NAV).
        </>
      ),
      mutualFund: (
        <>
          Priced <Highlight>once per day</Highlight> at its Net Asset Value (NAV) after the market closes. All investors transact at this single, intrinsic price, with no spread.
        </>
      ),
    },
    {
      attribute: "Tax Efficiency",
      etf: (
        <>
          Highly tax-efficient due to the <Highlight>"in-kind" creation/redemption</Highlight> process. This unique mechanism allows the fund to avoid realizing capital gains, protecting remaining investors from tax liabilities triggered by others selling.
        </>
      ),
      mutualFund: (
        <>
          Less tax-efficient in taxable accounts. Redemptions are paid in cash, forcing managers to sell assets, which can trigger <Highlight>capital gains distributions</Highlight> for all shareholders, even those who haven't sold.
        </>
      ),
    },
    {
      attribute: "Costs & Fees",
      etf: (
        <>
          Generally <Highlight>lower expense ratios</Highlight> on average. Transaction costs include brokerage commissions (often zero) and the bid-ask spread. Not subject to 12b-1 fees.
        </>
      ),
      mutualFund: (
        <>
          Expense ratios can be higher, especially for active funds. Can have sales loads (though many are 'no-load') and 12b-1 fees. Also subject to potential performance drag from holding cash (<Highlight>"cash drag"</Highlight>).
        </>
      ),
    },
    {
      attribute: "Management Style",
      etf: (
        <>
          Predominantly <Highlight>passively managed</Highlight> to track an index (e.g., S&P 500). The universe of actively managed ETFs is growing but is still relatively new.
        </>
      ),
      mutualFund: (
        <>
          Historically dominated by <Highlight>actively managed</Highlight> funds seeking to outperform the market. Also offers a vast and popular selection of low-cost index funds.
        </>
      ),
    },
    {
      attribute: "Automation",
      etf: (
        <>
          Automated investing (dollar-cost averaging) is becoming more common but is <Highlight>not universally available</Highlight> and can be complex to set up.
        </>
      ),
      mutualFund: (
        <>
          Built for automation. <Highlight>Easy to set up recurring investments</Highlight> and purchase fractional shares, making them ideal for systematic savings plans like 401(k)s.
        </>
      ),
    },
    {
      attribute: "Transparency",
      etf: (
        <>
          High transparency, with holdings typically disclosed on a <Highlight>daily basis</Highlight>.
        </>
      ),
      mutualFund: (
        <>
          Lower transparency, with holdings usually disclosed only <Highlight>monthly or quarterly</Highlight>, often with a lag.
        </>
      ),
    },
  ];

  return (
    <Section 
      id="comparison" 
      title="Head-to-Head Comparison" 
      subtitle="A detailed look at the core differences between ETFs and Mutual Funds across key attributes."
    >
      <div className="overflow-x-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg min-w-[900px]">
          <div className="grid grid-cols-3 font-semibold text-gray-800 text-left border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div className="p-4 sm:p-5">Attribute</div>
            <div className="p-4 sm:p-5">Exchange-Traded Fund (ETF)</div>
            <div className="p-4 sm:p-5">Mutual Fund</div>
          </div>
          {comparisonData.map((item, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-3 text-left text-gray-700 ${
                index < comparisonData.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="p-4 sm:p-5 font-medium text-gray-900">{item.attribute}</div>
              <div className="p-4 sm:p-5 leading-relaxed">{item.etf}</div>
              <div className="p-4 sm:p-5 leading-relaxed">{item.mutualFund}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const ActivePassiveSection = () => (
  <Section 
    title="The Core Philosophies: Active vs. Passive" 
    subtitle="Before choosing a vehicle, you must first choose an investment strategy. This is the most fundamental decision." 
    className="bg-gray-50"
  >
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Passive Investing (Indexing)</h3>
        <div className="text-gray-600 space-y-4">
          <p>
            The goal is not to beat the market, but to <Highlight>be the market</Highlight>. Passive funds (the majority of ETFs and many popular mutual funds) aim to replicate the performance of a specific benchmark index, like the S&P 500.
          </p>
          <p>
            This strategy is rooted in evidence that most active managers fail to consistently outperform their benchmarks over the long term, especially after fees. It offers market-rate returns at a very low cost.
          </p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Active Investing</h3>
        <div className="text-gray-600 space-y-4">
          <p>
            The goal is to <Highlight>beat the market</Highlight>. An active manager and their team conduct research to select securities they believe will outperform a benchmark.
          </p>
          <p>
            This hands-on approach involves higher costs (research, salaries, frequent trading), which are passed on to investors as higher expense ratios. This has historically been the domain of mutual funds.
          </p>
        </div>
      </div>
    </div>
  </Section>
);

const TerminologySection = () => (
  <Section 
    title="Key Terminology" 
    subtitle="Understanding these core concepts is essential to making an informed decision."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard 
        icon={<BookOpen className="w-8 h-8 text-indigo-600" />} 
        title="Net Asset Value (NAV)"
      >
        The official, calculated price of a mutual fund share at the end of a trading day. It represents the fund's total assets minus liabilities, divided by the number of shares. <Highlight>All mutual fund trades execute at the NAV.</Highlight>
      </FeatureCard>
      <FeatureCard 
        icon={<BookOpen className="w-8 h-8 text-indigo-600" />} 
        title="Bid-Ask Spread"
      >
        The small difference between the highest price a buyer will pay (bid) and the lowest price a seller will accept (ask) for an ETF share on the market. <Highlight>This is an implicit transaction cost for ETFs.</Highlight>
      </FeatureCard>
      <FeatureCard 
        icon={<BookOpen className="w-8 h-8 text-indigo-600" />} 
        title="In-Kind Redemption"
      >
        The "secret sauce" of ETF tax efficiency. Large institutions swap a basket of underlying stocks directly for ETF shares (and vice-versa), a process that <Highlight>doesn't require the fund to sell stocks and realize capital gains.</Highlight>
      </FeatureCard>
    </div>
  </Section>
);

const VerdictSection = () => (
  <Section 
    id="framework" 
    title="Decision Framework: The Hybrid Approach" 
    subtitle="The smartest strategy isn't choosing one over the other—it's using a hybrid portfolio that leverages the strengths of both vehicles based on your specific goals." 
    className="bg-gray-50"
  >
    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
      <FeatureCard 
        icon={<Users className="w-8 h-8 text-indigo-600" />} 
        title="For Retirement Accounts (401k, IRA)"
      >
        <Highlight>Use Mutual Funds.</Highlight> Their superior automation and fractional shares are perfect for systematic, recurring contributions. Tax efficiency is not a factor in these tax-sheltered accounts, making their core strengths shine.
      </FeatureCard>
      <FeatureCard 
        icon={<DollarSign className="w-8 h-8 text-indigo-600" />} 
        title="For Taxable Brokerage Accounts"
      >
        <Highlight>Use ETFs.</Highlight> Their structure minimizes capital gains, leading to better after-tax returns over the long term. This is their most significant and durable advantage for any money invested outside of a retirement plan.
      </FeatureCard>
      <FeatureCard 
        icon={<Zap className="w-8 h-8 text-indigo-600" />} 
        title="For Tactical & Thematic Investing"
      >
        <Highlight>Use ETFs.</Highlight> For targeted bets on specific industries (like tech or healthcare) or themes, ETFs offer precise, liquid, and low-cost exposure that can be traded instantly based on market events.
      </FeatureCard>
    </div>
  </Section>
);

export default function MutualFundsVsETFs() {
  const currentArticle = articles.find(article => article.slug === 'mutual-funds-vs-etfs-definitive-investment-guide');

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

      <div className="bg-white font-sans antialiased text-gray-700">
        {/* Deep Research Badge */}
        <div className="fixed top-4 left-4 z-50">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Deep Research
          </span>
        </div>

        {/* Return to Home Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        <main>
          <HeroSection />
          <ComparisonSection />
          <ActivePassiveSection />
          <TerminologySection />
          <VerdictSection />

          {/* Call to Action Section */}
          <section className="py-16 bg-indigo-50">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Build Your Investment Strategy?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Use this framework to make informed decisions about your portfolio allocation between mutual funds and ETFs.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research
                </a>
              )}
            </div>
          </section>

          {/* Educational Disclaimer */}
          <section className="py-8 bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Educational Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This analysis is for educational purposes only and should not be considered personalized investment advice. 
                  Investment decisions should be made based on your individual financial situation, risk tolerance, and investment objectives. 
                  Consider consulting with a qualified financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
