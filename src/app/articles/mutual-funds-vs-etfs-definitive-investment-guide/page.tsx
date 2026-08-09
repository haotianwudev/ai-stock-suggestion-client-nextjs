'use client';

import { DollarSign, Zap, Users, BookOpen } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

// --- Reusable Components ---
const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm h-full">
    <div className="flex items-center gap-4 mb-4">
      {icon}
      <h3 className="font-serif text-lg text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>
  </div>
);

const Section = ({ title, subtitle, children, className = '', id = '' }: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-16 ${className}`}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

const Highlight = ({ children }: { children: React.ReactNode }) => <span className="font-semibold text-[#A8672E] dark:text-[#D08F52]">{children}</span>;

// --- Main Page Sections ---
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
          Highly tax-efficient due to the <Highlight>&ldquo;in-kind&rdquo; creation/redemption</Highlight> process. This unique mechanism allows the fund to avoid realizing capital gains, protecting remaining investors from tax liabilities triggered by others selling.
        </>
      ),
      mutualFund: (
        <>
          Less tax-efficient in taxable accounts. Redemptions are paid in cash, forcing managers to sell assets, which can trigger <Highlight>capital gains distributions</Highlight> for all shareholders, even those who haven&apos;t sold.
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
          Expense ratios can be higher, especially for active funds. Can have sales loads (though many are &lsquo;no-load&rsquo;) and 12b-1 fees. Also subject to potential performance drag from holding cash (<Highlight>&ldquo;cash drag&rdquo;</Highlight>).
        </>
      ),
    },
    {
      attribute: "Management Style",
      etf: (
        <>
          Predominantly <Highlight>passively managed</Highlight> to track an index (e.g., S&amp;P 500). The universe of actively managed ETFs is growing but is still relatively new.
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
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm min-w-[900px]">
          <div className="grid grid-cols-3 font-semibold text-gray-900 dark:text-white text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <div className="p-4 sm:p-5">Attribute</div>
            <div className="p-4 sm:p-5">Exchange-Traded Fund (ETF)</div>
            <div className="p-4 sm:p-5">Mutual Fund</div>
          </div>
          {comparisonData.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 text-left text-gray-700 dark:text-gray-300 ${
                index < comparisonData.length - 1 ? 'border-b border-gray-200 dark:border-gray-800' : ''
              }`}
            >
              <div className="p-4 sm:p-5 font-medium text-gray-900 dark:text-white">{item.attribute}</div>
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
    className="bg-gray-50 dark:bg-gray-900/50"
  >
    <ComparisonGrid>
      <ComparisonCard title="Passive Investing (Indexing)" tone="pos">
        <p>
          The goal is not to beat the market, but to <Highlight>be the market</Highlight>. Passive funds (the majority of ETFs and many popular mutual funds) aim to replicate the performance of a specific benchmark index, like the S&amp;P 500.
        </p>
        <p>
          This strategy is rooted in evidence that most active managers fail to consistently outperform their benchmarks over the long term, especially after fees. It offers market-rate returns at a very low cost.
        </p>
      </ComparisonCard>
      <ComparisonCard title="Active Investing" tone="neg">
        <p>
          The goal is to <Highlight>beat the market</Highlight>. An active manager and their team conduct research to select securities they believe will outperform a benchmark.
        </p>
        <p>
          This hands-on approach involves higher costs (research, salaries, frequent trading), which are passed on to investors as higher expense ratios. This has historically been the domain of mutual funds.
        </p>
      </ComparisonCard>
    </ComparisonGrid>
  </Section>
);

const TerminologySection = () => (
  <Section
    title="Key Terminology"
    subtitle="Understanding these core concepts is essential to making an informed decision."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard
        icon={<BookOpen className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
        title="Net Asset Value (NAV)"
      >
        The official, calculated price of a mutual fund share at the end of a trading day. It represents the fund&apos;s total assets minus liabilities, divided by the number of shares. <Highlight>All mutual fund trades execute at the NAV.</Highlight>
      </FeatureCard>
      <FeatureCard
        icon={<BookOpen className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
        title="Bid-Ask Spread"
      >
        The small difference between the highest price a buyer will pay (bid) and the lowest price a seller will accept (ask) for an ETF share on the market. <Highlight>This is an implicit transaction cost for ETFs.</Highlight>
      </FeatureCard>
      <FeatureCard
        icon={<BookOpen className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
        title="In-Kind Redemption"
      >
        The &ldquo;secret sauce&rdquo; of ETF tax efficiency. Large institutions swap a basket of underlying stocks directly for ETF shares (and vice-versa), a process that <Highlight>doesn&apos;t require the fund to sell stocks and realize capital gains.</Highlight>
      </FeatureCard>
    </div>
  </Section>
);

const VerdictSection = () => (
  <Section
    id="framework"
    title="Decision Framework: The Hybrid Approach"
    subtitle="The smartest strategy isn't choosing one over the other—it's using a hybrid portfolio that leverages the strengths of both vehicles based on your specific goals."
    className="bg-gray-50 dark:bg-gray-900/50"
  >
    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
      <FeatureCard
        icon={<Users className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
        title="For Retirement Accounts (401k, IRA)"
      >
        <Highlight>Use Mutual Funds.</Highlight> Their superior automation and fractional shares are perfect for systematic, recurring contributions. Tax efficiency is not a factor in these tax-sheltered accounts, making their core strengths shine.
      </FeatureCard>
      <FeatureCard
        icon={<DollarSign className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
        title="For Taxable Brokerage Accounts"
      >
        <Highlight>Use ETFs.</Highlight> Their structure minimizes capital gains, leading to better after-tax returns over the long term. This is their most significant and durable advantage for any money invested outside of a retirement plan.
      </FeatureCard>
      <FeatureCard
        icon={<Zap className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
        title="For Tactical & Thematic Investing"
      >
        <Highlight>Use ETFs.</Highlight> For targeted bets on specific industries (like tech or healthcare) or themes, ETFs offer precise, liquid, and low-cost exposure that can be traded instantly based on market events.
      </FeatureCard>
    </div>
  </Section>
);

export default function MutualFundsVsETFs() {
  return (
    <ArticleFrame slug="mutual-funds-vs-etfs-definitive-investment-guide">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 font-sans text-gray-900 dark:text-gray-100">
        <div className="mb-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Key Takeaways</h2>
          <ul className="space-y-3">
            <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>ETFs trade all day at market price; mutual funds price once daily at NAV&mdash;a structural difference that drives most of their other tradeoffs.</span></li>
            <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>ETFs are generally more tax-efficient thanks to in-kind creation/redemption; mutual fund redemptions can trigger capital gains distributions for all shareholders.</span></li>
            <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>Mutual funds are built for automated, recurring contributions (401k/IRA); ETFs excel for tax-efficient taxable-account and tactical exposure.</span></li>
            <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>The smartest approach is usually hybrid: mutual funds in tax-sheltered retirement accounts, ETFs in taxable brokerage accounts.</span></li>
          </ul>
        </div>
      </div>

      <ComparisonSection />
      <ActivePassiveSection />
      <TerminologySection />
      <VerdictSection />
    </ArticleFrame>
  );
}
