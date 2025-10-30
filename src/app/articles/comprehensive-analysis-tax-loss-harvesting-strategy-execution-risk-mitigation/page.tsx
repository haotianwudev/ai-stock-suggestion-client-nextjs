'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, X, BookOpen, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Navigation Link Component
const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="block py-2.5 px-4 text-sm text-gray-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors duration-150"
  >
    {children}
  </a>
);

export default function TaxLossHarvestingArticle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const currentArticle = articles.find(article => article.slug === 'comprehensive-analysis-tax-loss-harvesting-strategy-execution-risk-mitigation');

  // Navigation items based on the document's main sections
  const navItems = [
    { id: "section-i", title: "I. The Strategic Imperative" },
    { id: "section-ii", title: "II. Step-by-Step Execution" },
    { id: "section-iii", title: "III. Navigating the Wash-Sale Rule" },
    { id: "section-iv", title: "IV. The Art of Replacement" },
    { id: "section-v", title: "V. Common Pitfalls" },
    { id: "section-vi", title: "VI. Advanced Strategies" },
    { id: "section-vii", title: "VII. Reporting and Compliance" },
    { id: "section-viii", title: "VIII. Concluding Analysis" },
  ];

  // Close sidebar on mobile when a link is clicked
  const handleNavLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

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

      {/* Main background for the entire page */}
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-20 bg-slate-800 border-b border-slate-700 shadow-lg">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Title */}
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-cyan-400" />
                <span className="text-xl font-semibold text-white">Tax-Loss Harvesting</span>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                  aria-label="Toggle navigation"
                >
                  {isSidebarOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-10 w-64 h-full pt-16 bg-slate-800 border-r border-slate-700 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <nav className="space-y-1">
              <h3 className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Sections
              </h3>
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavLinkClick}
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="pt-16 md:ml-64 bg-slate-50 min-h-screen">
          {/* The article is now a "card" with a shadow, rounded corners, and padding */}
          <article className="max-w-5xl mx-auto my-12 p-8 sm:p-12 bg-white rounded-xl shadow-2xl">
            
            {/* Return to Home Button */}
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>

            {/* Badges */}
            <div className="relative mb-8">
              {/* Deep Research Badge - Top Left */}
              <div className="absolute top-0 left-0 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  Deep Research
                </span>
              </div>
              
              {/* Podcast Badge - Top Right */}
              <div className="absolute top-0 right-0 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  Podcast
                </span>
              </div>
            </div>

            {/* Document Content Starts Here */}
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 pb-4 border-b-2 border-indigo-500 mt-8">
              A Comprehensive Analysis of Tax-Loss Harvesting: Strategy, Execution, and Risk Mitigation
            </h1>

            {/* Section I */}
            <section id="section-i" className="scroll-mt-20">
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900 mt-12 mb-6 border-l-4 border-indigo-500 pl-4">
                I. The Strategic Imperative of Tax-Loss Harvesting
              </h2>
              
              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                Tax-loss harvesting represents a sophisticated portfolio management discipline that extends beyond simple, year-end tax reduction. It is a strategic practice designed to enhance an investor's after-tax returns by systematically managing the realization of capital gains and losses.<sup>[1, 2]</sup> When executed with precision, this strategy can generate significant value, often referred to as "tax alpha," by optimizing an investor's tax liabilities over the long term. This section will establish the foundational principles of tax-loss harvesting, detailing its core mechanisms, its quantifiable impact on portfolio returns, and the investor profiles best suited to benefit from its implementation.
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 mt-8 mb-4">
                A. Defining the Strategy: Beyond Simple Tax Reduction
              </h3>
              
              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                At its most fundamental level, tax-loss harvesting (TLH) is the practice of selling securities at a loss to offset capital gains taxes and, in certain circumstances, a limited amount of ordinary income.<sup>[3, 4, 5]</sup> The core actions are:
              </p>

              <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-800 lg:text-lg marker:text-indigo-500">
                <li>
                  Intentionally realizing a capital loss from an asset that has depreciated in value within a taxable investment account.<sup>[3, 6]</sup>
                </li>
                <li>
                  Reinvesting the proceeds into a{' '}
                  <strong className="font-semibold text-indigo-600">different but similar</strong>{' '}
                  asset to maintain the portfolio's strategic market exposure.<sup>[2, 7]</sup>
                </li>
              </ul>

              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                This strategy is exclusively applicable to taxable investment accounts (e.g., individual or joint brokerage accounts). It is not relevant for tax-deferred or tax-advantaged retirement accounts such as traditional IRAs, Roth IRAs, or 401(k)s.<sup>[1, 4, 8]</sup> Within these retirement vehicles, investment growth is already tax-deferred or tax-free, and capital gains or losses are not realized for tax purposes upon the sale of a security. Therefore, there is no tax liability to offset, rendering the strategy inapplicable.<sup>[4, 6, 9]</sup>
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 mt-8 mb-4">
                B. The Core Mechanism: Tax Deferral and Rate Arbitrage
              </h3>
              
              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                The primary function of tax-loss harvesting is{' '}
                <strong className="font-semibold text-cyan-700">tax deferral</strong>. By realizing a loss to offset a gain, an investor postpones a tax liability that would have otherwise been due in the current year. This mechanism is often analogized to receiving an interest-free loan from the government, as the capital that would have been paid in taxes remains invested and can continue to compound.<sup>[3]</sup> When the replacement security is eventually sold, the deferred tax will become due. The reinvestment of proceeds from the harvested loss into a new asset lowers the cost basis of that new holding, which can result in a larger capital gain upon its eventual sale.<sup>[10, 11]</sup>
              </p>

              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                However, the more profound benefit often arises from{' '}
                <strong className="font-semibold text-indigo-600">tax rate arbitrage</strong>.<sup>[3, 12]</sup> This occurs when a harvested loss is used to offset income that is taxed at a high rate in the present, in exchange for creating a future gain that will likely be taxed at a lower rate. Key examples include:
              </p>

              <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-800 lg:text-lg marker:text-indigo-500">
                <li>
                  Offsetting high-tax{' '}
                  <strong className="font-semibold text-slate-900">short-term capital gains</strong>{' '}
                  (taxed as ordinary income).
                </li>
                <li>
                  Offsetting up to{' '}
                  <strong className="font-semibold text-slate-900">$3,000 of ordinary income</strong>, which is typically taxed at the highest rates.<sup>[4, 12]</sup>
                </li>
              </ul>

              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                The value of this strategy extends even further when integrated with long-term estate and charitable planning. If the low-basis shares acquired through tax-loss harvesting are held until the owner's death, they pass to heirs with a "step-up" in basis to the fair market value at the date of death. This completely eliminates the deferred capital gains tax liability for the heirs.<sup>[12, 14]</sup> Alternatively, if these appreciated, low-basis shares are donated to a qualified charity, the investor may receive a tax deduction for the full market value of the shares, and neither the investor nor the charity pays capital gains tax on the appreciation. In these scenarios, a deferred tax liability is converted into a permanent tax elimination, representing the ultimate realization of value from a tax-loss harvesting strategy.<sup>[12]</sup>
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 mt-8 mb-4">
                C. Quantifying the "Tax Alpha": How TLH Enhances After-Tax Returns
              </h3>
              
              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                <strong className="font-semibold text-cyan-700">"Tax alpha"</strong>{' '}
                is the value added to a portfolio's return through the application of tax-efficient strategies.<sup>[3]</sup> Tax-loss harvesting is a primary generator of tax alpha. By reducing current tax liabilities, it frees up capital that can be immediately reinvested, allowing the full, pre-tax value of the portfolio to continue compounding.<sup>[5, 7, 15]</sup>
              </p>

              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                The direct financial benefit of a harvested loss is a function of the investor's marginal tax rate. For instance, consider an investor in a 35% combined federal and state marginal tax bracket who realizes a $25,000 short-term capital loss to offset a $20,000 short-term capital gain. This action saves $7,000 in taxes ($20,000 x 35%). The remaining $5,000 loss can be used to offset $3,000 of ordinary income, saving an additional $1,050 ($3,000 x 35%). The final $2,000 of the loss is carried forward to future years. The total immediate tax savings in this scenario is $8,050.<sup>[8]</sup> When this saved capital is reinvested over a long time horizon, the power of compounding can transform it into a substantial sum, effectively boosting the portfolio's overall after-tax return.<sup>[8]</sup>
              </p>

              <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 mt-8 mb-4">
                D. Identifying the Ideal Candidate: Profiling Investors Who Benefit Most
              </h3>
              
              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                While many investors can benefit from tax-loss harvesting, the strategy delivers the most significant impact to certain profiles:
              </p>

              <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-800 lg:text-lg marker:text-indigo-500">
                <li>
                  Investors in{' '}
                  <strong className="font-semibold text-indigo-600">high marginal tax brackets</strong>.<sup>[5]</sup>
                </li>
                <li>
                  Individuals with{' '}
                  <strong className="font-semibold text-slate-900">substantial taxable investment accounts</strong>.<sup>[13, 15, 16]</sup>
                </li>
                <li>
                  Those who regularly realize{' '}
                  <strong className="font-semibold text-slate-900">capital gains</strong>.
                </li>
                <li>
                  Investors subject to the 3.8%{' '}
                  <strong className="font-semibold text-slate-900">Net Investment Income Tax (NIIT)</strong>.<sup>[13]</sup>
                </li>
              </ul>

              <p className="text-base lg:text-lg text-gray-800 leading-loose mb-6">
                Conversely, tax-loss harvesting may offer limited or no benefit to certain investors. Those in the 0% long-term capital gains tax bracket, for example, should be cautious. Using a valuable capital loss to offset a long-term capital gain that was already tax-free would be an inefficient use of that tax asset.<sup>[1]</sup> The strategy's effectiveness is always contingent on the presence of a tax liability to reduce.
              </p>
            </section>

            {/* Call-to-Action Section */}
            <div className="my-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Continue Reading the Full Analysis
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  This comprehensive guide covers step-by-step execution, wash-sale rule compliance, advanced strategies, and modern implementations. Access the complete research document for detailed insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {currentArticle?.googleDoc && (
                    <a 
                      href={currentArticle.googleDoc}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      <BookOpen className="inline mr-2" />
                      Read Full Research
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
            </div>

            {/* Educational Disclaimer */}
            <div className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong className="font-semibold">Educational Disclaimer:</strong> This content is for informational and educational purposes only. Tax-loss harvesting involves complex regulations and individual circumstances. Always consult with qualified tax and financial professionals before implementing any tax strategies. Past performance does not guarantee future results.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="md:ml-64 border-t border-slate-700 bg-slate-800">
          <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </div>
        </footer>
      </div>
    </>
  );
}