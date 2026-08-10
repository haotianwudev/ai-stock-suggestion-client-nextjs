'use client';

import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Tailwind utility class for content boxes
const ContentBox = ({ title, children, icon: Icon, colorClass, borderClass = 'border-gray-200' }: {
  title: string;
  children: React.ReactNode;
  icon?: any;
  colorClass: string;
  borderClass?: string;
}) => (
  <div className={`p-6 bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg border ${borderClass} mb-8`}>
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
  return (
    <ArticleFrame
      slug="comprehensive-analysis-tax-loss-harvesting-strategy-execution-risk-mitigation"
      additionalDisclaimer="This article discusses tax strategies for informational purposes only. Consult a qualified financial or tax professional before implementing tax-loss harvesting in your specific situation."
    >
      <div className="max-w-4xl mx-auto px-4 text-gray-800">
        <InfographicSlot alt="Tax-Loss Harvesting Strategy Infographic" />

        {/* Introductory Box */}
        <div className="p-8 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52] rounded-xl shadow-inner mb-10">
          <p className="text-xl font-semibold text-blue-800">
            Tax-loss harvesting is a <strong>strategic discipline</strong> designed to enhance after-tax returns by systematically managing the realization of capital gains and losses, often referred to as generating <strong>&ldquo;tax alpha.&rdquo;</strong>
          </p>
        </div>

        {/* --- Section I: Strategic Imperative --- */}
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200 font-serif">
          I. The Strategic Imperative
        </h2>

        <ContentBox
          title="Core Mechanism"
          icon={CheckCircle}
          colorClass="text-[#1D8A70] dark:text-[#3CBF9C]"
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
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200 font-serif">
          II. Step-by-Step Execution Guide
        </h2>

        <ContentBox
          title="Step-by-Step Process"
          icon={CheckCircle}
          colorClass="text-[#A8672E] dark:text-[#D08F52]"
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
                Use <strong>&ldquo;specific identification&rdquo;</strong> to ensure you sell the share lots with the highest cost basis. Avoid the default &ldquo;FIFO&rdquo; method.
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
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200 font-serif">
          III. Compliance and the Wash-Sale Rule
        </h2>

        <ContentBox
          title="The Wash-Sale Rule Defined"
          icon={AlertTriangle}
          colorClass="text-[#BC4128] dark:text-[#E2694A]"
          borderClass="border-[#BC4128] dark:border-[#E2694A]"
        >
          <p className="font-semibold text-red-800 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-md">
            You cannot claim a tax loss if you acquire the same or a <strong>&ldquo;substantially identical&rdquo;</strong> security within the <strong>61-day window</strong>.
          </p>
          <BulletList color="rgb(185, 28, 28)">
            <p>The <strong>61-day window</strong> includes the 30 days <em>before</em> the sale, the day of the sale, and the 30 days <em>after</em> the sale.</p>
            <p>The rule applies across <strong>ALL</strong> your accounts, including taxable accounts, <strong>IRAs, and 401(k)s</strong> (as well as spousal accounts).</p>
            <p>If you violate the rule by repurchasing in an <strong>IRA</strong>, the loss is <strong>permanently forfeited</strong>.</p>
          </BulletList>
          <p className="mt-4 font-semibold">Consequence of Violation:</p>
          <p className="text-gray-600">
            The realized loss is <strong>disallowed</strong> in the current year, but the amount is <strong>added to the cost basis</strong> of the replacement security (deferring the tax, but not eliminating the loss&apos;s value).
          </p>
        </ContentBox>

        {/* --- Section IV: The Art of Replacement --- */}
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200 font-serif">
          IV. Replacement Strategies (Avoiding &ldquo;Substantially Identical&rdquo;)
        </h2>

        <ContentBox
          title="Safe Replacement Framework"
          icon={CheckCircle}
          colorClass="text-purple-700"
          borderClass="border-purple-300"
        >
          <p className="font-semibold text-gray-800">For ETFs/Mutual Funds, rely on <strong>Index Divergence</strong>:</p>
          <BulletList color="rgb(147, 51, 234)">
            <p>Sell a fund tracking the S&amp;P 500 and replace it with a fund tracking the <strong>Russell 1000</strong> or <strong>CRSP Total Stock Market</strong> index.</p>
            <p>These track different benchmarks, making them non-identical, even if performance is highly correlated.</p>
            <p className="text-[#BC4128] dark:text-[#E2694A] font-semibold">
              HIGH RISK: Do NOT swap ETFs from different managers that track the <strong>EXACT SAME INDEX</strong> (e.g., VOO to IVV). This is likely a wash sale.
            </p>
          </BulletList>
          <p className="font-semibold text-gray-800 mt-6">For Individual Stocks:</p>
          <p className="text-gray-600">
            Replace the stock with shares of a <strong>direct competitor</strong> (e.g., selling Ford to buy General Motors). This is generally safe as they are different corporations.
          </p>
        </ContentBox>

        {/* --- Section V: Common Pitfalls --- */}
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200 font-serif">
          V. Common Pitfalls and Strategic Missteps
        </h2>

        <ContentBox
          title="Key Operational Pitfalls"
          icon={AlertTriangle}
          colorClass="text-[#BC4128] dark:text-[#E2694A]"
          borderClass="border-orange-300"
        >
          <BulletList color="rgb(234, 88, 12)">
            <p><strong>Forgetting DRIPs:</strong> Automatic <strong>Dividend Reinvestment Plans</strong> (DRIPs) can repurchase shares within the 61-day window. <strong>Temporarily disable DRIPs</strong> for securities being harvested or their replacements.</p>
            <p><strong>Ignoring State Taxes:</strong> Some states have different rules for loss limitations or carryforwards, which impacts the overall benefit.</p>
            <p><strong>The Disposition Effect:</strong> Allowing emotion to override strategy&mdash;holding on to losers hoping for a recovery, instead of selling to capture the tax benefit.</p>
            <p><strong>Ignoring Transaction Costs:</strong> Ensure the potential tax savings outweigh the combined trading costs of the sell/buy &ldquo;round trip.&rdquo;</p>
          </BulletList>
        </ContentBox>

        {/* --- Section VI: Advanced Strategies --- */}
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 pb-2 border-b-2 border-gray-200 font-serif">
          VI. Advanced Strategies and Automation
        </h2>

        <ContentBox
          title="Automation & Next-Gen TLH"
          icon={CheckCircle}
          colorClass="text-[#A8672E] dark:text-[#D08F52]"
          borderClass="border-teal-300"
        >
          <BulletList color="rgb(13, 148, 136)">
            <p><strong>&ldquo;Always-On&rdquo; Approach:</strong> Move away from year-end harvesting. Use a systematic, daily, or quarterly review to capture losses created by transient market volatility year-round.</p>
            <p><strong>Direct Indexing:</strong> Instead of owning an ETF, own the individual stocks of the index. This allows for <strong>stock-level harvesting</strong>, capturing losses on specific underperforming stocks while the overall index remains flat or up.</p>
            <p><strong>Robo-Advisors:</strong> Platforms like <strong>Wealthfront</strong> and <strong>Betterment</strong> automate the process entirely, continuously monitoring for opportunities and managing the wash-sale compliance.</p>
          </BulletList>
        </ContentBox>
      </div>
    </ArticleFrame>
  );
}
