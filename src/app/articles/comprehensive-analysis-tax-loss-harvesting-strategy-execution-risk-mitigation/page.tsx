'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, TrendingDown, Music, Search } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Tailwind utility class for content boxes
const ContentBox = ({ title, children, icon: Icon, colorClass, borderClass = 'border-gray-200' }: { 
  title: string; 
  children: React.ReactNode; 
  icon?: any; 
  colorClass: string; 
  borderClass?: string;
}) => (
  <div className={`p-6 bg-white rounded-xl shadow-lg border ${borderClass} mb-8`}>
    <h3 className={`flex items-center text-xl font-bold mb-4 ${colorClass}`}>
      {Icon && <Icon className="mr-3" />}
      {title}
    </h3>
    <div className="text-lg text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

// Custom Bullet List component
const BulletList = ({ children, color = 'rgb(4, 120, 87)' }: { children: React.ReactNode; color?: string }) => (
  <ul className="list-none space-y-3 pl-0">
    {React.Children.map(children, child => (
      <li className="flex items-start text-gray-700">
        <span 
          className="h-2 w-2 rounded-full flex-shrink-0 mt-3 mr-3" 
          style={{ backgroundColor: color }}
        ></span>
        <div className="flex-1">{child}</div>
      </li>
    ))}
  </ul>
);

export default function TaxLossHarvestingArticle() {
  const currentArticle = articles.find(article => article.slug === 'comprehensive-analysis-tax-loss-harvesting-strategy-execution-risk-mitigation');

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

      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        {/* Deep Research Badge */}
        <div className="fixed top-4 left-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
          Deep Research
        </div>

        {/* Podcast Badge */}
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
          Podcast
        </div>

        {/* --- Header --- */}
        <header className="py-6 bg-white border-b border-gray-200 shadow-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <TrendingDown className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-extrabold text-gray-900">Tax-Loss Harvesting Strategies</h1>
            </div>
          </div>
        </header>

        {/* --- Main Content Area --- */}
        <main className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
          {/* Hero Infographic Image */}
          <section className="mb-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img 
                src="https://i.imgur.com/DeE8DHf.jpeg" 
                alt="Tax-Loss Harvesting Strategy Infographic" 
                className="w-full h-auto"
              />
            </div>
          </section>

          {/* Introductory Box */}
          <div className="p-8 bg-blue-50 border-l-4 border-blue-500 rounded-xl shadow-inner mb-10">
            <p className="text-xl font-semibold text-blue-800">
              Tax-loss harvesting is a <strong>strategic discipline</strong> designed to enhance after-tax returns by systematically managing the realization of capital gains and losses, often referred to as generating <strong>"tax alpha."</strong>
            </p>
          </div>

          {/* --- Section I: Strategic Imperative --- */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200">
            I. The Strategic Imperative
          </h2>
          
          <ContentBox 
            title="Core Mechanism" 
            icon={CheckCircle} 
            colorClass="text-green-700" 
            borderClass="border-green-300"
          >
            <BulletList color="rgb(4, 120, 87)">
              <p>The primary benefit is <strong>Tax Deferral</strong>, which acts as an interest-free loan from the government.</p>
              <p>The deeper value is <strong>Tax Rate Arbitrage</strong>: offsetting high-tax income (like short-term gains) today in exchange for lower-taxed gains in the future.</p>
              <p>You can use up to <strong>$3,000 annually</strong> of net losses to offset ordinary income (wages).</p>
              <p>The strategy only applies to <strong>taxable investment accounts</strong> (brokerage accounts), NOT retirement accounts (IRAs, 401(k)s).</p>
            </BulletList>
          </ContentBox>

          {/* --- Section II: Step-by-Step Execution --- */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200">
            II. Step-by-Step Execution Guide
          </h2>
          
          <ContentBox 
            title="Step-by-Step Process" 
            icon={CheckCircle} 
            colorClass="text-blue-700"
            borderClass="border-blue-300"
          >
            <ol className="list-decimal pl-5 space-y-3">
              <li className="font-semibold text-gray-800">
                Identify Losses:
                <p className="font-normal text-gray-600 ml-4 mt-1">
                  Review taxable accounts for securities trading below their <strong>cost basis</strong>. A decline of 10% to 15% is a good threshold.
                </p>
              </li>
              <li className="font-semibold text-gray-800">
                Execute the Sale (Optimize Basis):
                <p className="font-normal text-gray-600 ml-4 mt-1">
                  Use <strong>"specific identification"</strong> to ensure you sell the share lots with the highest cost basis. Avoid the default "FIFO" method.
                </p>
              </li>
              <li className="font-semibold text-gray-800">
                Reinvest Immediately (Replacement Mandate):
                <p className="font-normal text-gray-600 ml-4 mt-1">
                  Immediately reinvest the proceeds into a <strong>non-substantially identical</strong> security to maintain your target asset allocation and prevent being out of the market.
                </p>
              </li>
              <li className="font-semibold text-gray-800">
                Document and Report:
                <p className="font-normal text-gray-600 ml-4 mt-1">
                  Report realized gains and losses on <strong>IRS Form 8949</strong> and summarize the net result on <strong>Schedule D</strong>. Losses exceeding $3,000 are <strong>carried forward</strong> indefinitely.
                </p>
              </li>
            </ol>
          </ContentBox>

          {/* --- Section III: Wash-Sale Rule --- */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200">
            III. Compliance and the Wash-Sale Rule
          </h2>
          
          <ContentBox 
            title="The Wash-Sale Rule Defined" 
            icon={AlertTriangle} 
            colorClass="text-red-700"
            borderClass="border-red-400"
          >
            <p className="font-semibold text-red-800 bg-red-50 p-3 rounded-md">
              You cannot claim a tax loss if you acquire the same or a <strong>"substantially identical"</strong> security within the <strong>61-day window</strong>.
            </p>
            <BulletList color="rgb(185, 28, 28)">
              <p>The <strong>61-day window</strong> includes the 30 days <em>before</em> the sale, the day of the sale, and the 30 days <em>after</em> the sale.</p>
              <p>The rule applies across <strong>ALL</strong> your accounts, including taxable accounts, <strong>IRAs, and 401(k)s</strong> (as well as spousal accounts).</p>
              <p>If you violate the rule by repurchasing in an <strong>IRA</strong>, the loss is <strong>permanently forfeited</strong>.</p>
            </BulletList>
            <p className="mt-4 font-semibold">Consequence of Violation:</p>
            <p className="text-gray-600">
              The realized loss is <strong>disallowed</strong> in the current year, but the amount is <strong>added to the cost basis</strong> of the replacement security (deferring the tax, but not eliminating the loss's value).
            </p>
          </ContentBox>

          {/* --- Section IV: The Art of Replacement --- */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200">
            IV. Replacement Strategies (Avoiding "Substantially Identical")
          </h2>
          
          <ContentBox 
            title="Safe Replacement Framework" 
            icon={CheckCircle} 
            colorClass="text-purple-700" 
            borderClass="border-purple-300"
          >
            <p className="font-semibold text-gray-800">For ETFs/Mutual Funds, rely on <strong>Index Divergence</strong>:</p>
            <BulletList color="rgb(147, 51, 234)">
              <p>Sell a fund tracking the S&P 500 and replace it with a fund tracking the <strong>Russell 1000</strong> or <strong>CRSP Total Stock Market</strong> index.</p>
              <p>These track different benchmarks, making them non-identical, even if performance is highly correlated.</p>
              <p className="text-red-600 font-semibold">
                HIGH RISK: Do NOT swap ETFs from different managers that track the <strong>EXACT SAME INDEX</strong> (e.g., VOO to IVV). This is likely a wash sale.
              </p>
            </BulletList>
            <p className="font-semibold text-gray-800 mt-6">For Individual Stocks:</p>
            <p className="text-gray-600">
              Replace the stock with shares of a <strong>direct competitor</strong> (e.g., selling Ford to buy General Motors). This is generally safe as they are different corporations.
            </p>
          </ContentBox>

          {/* --- Section V: Common Pitfalls --- */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200">
            V. Common Pitfalls and Strategic Missteps
          </h2>
          
          <ContentBox 
            title="Key Operational Pitfalls" 
            icon={AlertTriangle} 
            colorClass="text-orange-700"
            borderClass="border-orange-300"
          >
            <BulletList color="rgb(234, 88, 12)">
              <p><strong>Forgetting DRIPs:</strong> Automatic <strong>Dividend Reinvestment Plans</strong> (DRIPs) can repurchase shares within the 61-day window. <strong>Temporarily disable DRIPs</strong> for securities being harvested or their replacements.</p>
              <p><strong>Ignoring State Taxes:</strong> Some states have different rules for loss limitations or carryforwards, which impacts the overall benefit.</p>
              <p><strong>The Disposition Effect:</strong> Allowing emotion to override strategy—holding on to losers hoping for a recovery, instead of selling to capture the tax benefit.</p>
              <p><strong>Ignoring Transaction Costs:</strong> Ensure the potential tax savings outweigh the combined trading costs of the sell/buy "round trip."</p>
            </BulletList>
          </ContentBox>

          {/* --- Section VI: Advanced Strategies --- */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200">
            VI. Advanced Strategies and Automation
          </h2>
          
          <ContentBox 
            title="Automation & Next-Gen TLH" 
            icon={CheckCircle} 
            colorClass="text-teal-700"
            borderClass="border-teal-300"
          >
            <BulletList color="rgb(13, 148, 136)">
              <p><strong>"Always-On" Approach:</strong> Move away from year-end harvesting. Use a systematic, daily, or quarterly review to capture losses created by transient market volatility year-round.</p>
              <p><strong>Direct Indexing:</strong> Instead of owning an ETF, own the individual stocks of the index. This allows for <strong>stock-level harvesting</strong>, capturing losses on specific underperforming stocks while the overall index remains flat or up.</p>
              <p><strong>Robo-Advisors:</strong> Platforms like <strong>Wealthfront</strong> and <strong>Betterment</strong> automate the process entirely, continuously monitoring for opportunities and managing the wash-sale compliance.</p>
            </BulletList>
          </ContentBox>

          {/* Call to Action - Google Doc & Podcast Links */}
          <section>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <p className="text-slate-600 mb-6">
                Dive deeper into the comprehensive research paper and listen to the podcast episode for detailed analysis and insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <Search className="inline mr-2" />
                    Read Full Research Paper
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

        {/* --- Footer --- */}
        <footer className="border-t border-gray-200 bg-white mt-12">
          <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              <strong>Disclaimer:</strong> This report is for informational purposes only. Consult with a qualified financial or tax professional before making any investment decisions.
            </p>
            <p className="text-slate-600 text-sm font-medium">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
