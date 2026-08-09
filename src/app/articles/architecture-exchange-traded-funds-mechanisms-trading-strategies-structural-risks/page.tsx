'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { Jargon, ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
    <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-gray-100 mb-2">
      {title}
    </h2>
    {subtitle && <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>}
  </div>
);

const KeyTakeaways = () => (
  <section className="mb-12">
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-current flex-none" />
        Key Takeaways
      </h3>
      <ul className="space-y-3 text-sm md:text-base">
        <li className="flex items-start">
          <span className="flex-shrink-0 text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">•</span>
          <span className="text-gray-700 dark:text-gray-300">
            ETFs use a dual-market architecture (Primary and Secondary markets) to govern supply, liquidity, and pricing.
          </span>
        </li>
        <li className="flex items-start">
          <span className="flex-shrink-0 text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">•</span>
          <span className="text-gray-700 dark:text-gray-300">
            The in-kind creation and redemption mechanism allows ETFs to flush out capital gains tax-free, leading to superior compounding.
          </span>
        </li>
        <li className="flex items-start">
          <span className="flex-shrink-0 text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">•</span>
          <span className="text-gray-700 dark:text-gray-300">
            Leveraged and Inverse ETFs suffer from mathematical volatility decay, making them unsuitable for long-term holding in choppy markets.
          </span>
        </li>
        <li className="flex items-start">
          <span className="flex-shrink-0 text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">•</span>
          <span className="text-gray-700 dark:text-gray-300">
            Commodity ETFs rolling futures contracts can face severe contango, which creates a persistent negative roll yield.
          </span>
        </li>
      </ul>
    </div>
  </section>
);

const GenesisSection = () => (
  <section className="mb-16">
    <SectionHeading 
      title="The Genesis of an ETF" 
      subtitle="Launch Mechanics and Regulatory Frameworks"
    />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div>
        <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-4">Regulatory Foundations</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
          Historically, launching an ETF required an individual "exemptive order" under the Investment Company Act of 1940, a notoriously slow process taking 12 to 18 months.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
          The landscape transformed in September 2019 with <strong className="text-gray-900 dark:text-gray-100">SEC Rule 6c-11 (The "ETF Rule")</strong>. It created a consistent framework permitting open-end ETFs to operate without individualized orders, provided they meet core conditions:
        </p>
        <ul className="space-y-3 mb-6 text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <li className="flex items-start">
            <span className="flex-shrink-0 text-[#A8672E] dark:text-[#D08F52] mr-3">•</span>
            Daily Portfolio Transparency (holdings published before market open).
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 text-[#A8672E] dark:text-[#D08F52] mr-3">•</span>
            Website Disclosures (premium/discount data, bid-ask spread, NAV).
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 text-[#A8672E] dark:text-[#D08F52] mr-3">•</span>
            Custom Basket Policies (governing creation/redemption baskets).
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 text-[#A8672E] dark:text-[#D08F52] mr-3">•</span>
            Data Retention (retained for a minimum of six years).
          </li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-4">Pathways to Market</h3>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
              <h4 className="font-bold text-gray-900 dark:text-gray-100">Proprietary Trust</h4>
              <div className="flex space-x-3 font-mono tabular-nums text-sm">
                <span className="text-[#BC4128] dark:text-[#E2694A] bg-[#BC4128]/10 dark:bg-[#E2694A]/10 px-2 py-0.5 rounded">6-12 mos</span>
                <span className="text-[#BC4128] dark:text-[#E2694A] bg-[#BC4128]/10 dark:bg-[#E2694A]/10 px-2 py-0.5 rounded">$600k+</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Requires building internal compliance and infrastructure from scratch. For massive institutions.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
              <h4 className="font-bold text-gray-900 dark:text-gray-100">Series Trust</h4>
              <div className="flex space-x-3 font-mono tabular-nums text-sm">
                <span className="text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10 px-2 py-0.5 rounded">4-6 mos</span>
                <span className="text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10 px-2 py-0.5 rounded">$100k-$150k</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Multiple independent ETFs share a common trust and service providers, mutualizing fixed costs.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
              <h4 className="font-bold text-gray-900 dark:text-gray-100">White-Label Platform</h4>
              <div className="flex space-x-3 font-mono tabular-nums text-sm">
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 px-2 py-0.5 rounded">3-5 mos</span>
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 px-2 py-0.5 rounded">$50k-$75k</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Turn-key solution. Platform handles legal/compliance; issuer focuses on strategy and marketing.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ActivePassiveSection = () => (
  <section className="mb-16">
    <SectionHeading 
      title="Architectural Paradigms" 
      subtitle="Active Versus Passive Management"
    />
    
    <ComparisonGrid>
      <ComparisonCard title="Passive Management" tone="pos">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Operates on the efficient market hypothesis, aiming to replicate broad market beta. The primary mandate is to minimize tracking error.
        </p>
        <ul className="space-y-3 mb-6 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="flex-shrink-0 text-[#1D8A70] dark:text-[#3CBF9C] mr-3 mt-1">•</span>
            Rules-based index methodologies
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 text-[#1D8A70] dark:text-[#3CBF9C] mr-3 mt-1">•</span>
            Extremely low portfolio turnover
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 text-[#1D8A70] dark:text-[#3CBF9C] mr-3 mt-1">•</span>
            Compressed expense ratios (often &lt; 0.10%)
          </li>
        </ul>
      </ComparisonCard>
      
      <ComparisonCard title="Active Management" tone="neg">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Seeks to outperform benchmarks through discretionary selection and tactical allocation. Carries elevated expense ratios (0.50% - 1.50%).
        </p>
        <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border border-[#BC4128]/20 dark:border-[#E2694A]/20 p-4 rounded-xl mt-4">
          <h4 className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-2">The ANT Solution</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Daily transparency risks "front-running". <Jargon term="Active Non-Transparent (ANT)" definition="ETFs that publish a proxy basket to protect intellectual property while allowing market makers to price efficiently."/> ETFs publish a "proxy basket" to protect intellectual property while allowing market makers to price efficiently.
          </p>
        </div>
      </ComparisonCard>
    </ComparisonGrid>
  </section>
);

const DualMarketSection = () => (
  <section className="mb-16">
    <SectionHeading 
      title="Dual-Market Architecture" 
      subtitle="The engine behind ETF liquidity and accurate pricing"
    />
    
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Secondary Market</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
          The public venue (NYSE, NASDAQ) where retail and institutional investors trade existing shares. Prices fluctuate based on supply and demand, creating a bid-ask spread.
        </p>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl mt-4 border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-sm">Market Makers (DLPs)</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ensure liquidity by continuously posting two-sided quotes. They profit from the spread and manage inventory risk.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="font-serif text-xl text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Primary Market</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
          Exclusive venue for <Jargon term="Authorized Participants (APs)" definition="Entities that govern total supply through the Creation and Redemption mechanism."/>. Governs total supply through the Creation and Redemption mechanism based on the PCF (Portfolio Composition File).
        </p>
        
        <div className="space-y-3">
          <div className="bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10 p-3 rounded-xl border border-[#1D8A70]/20 dark:border-[#3CBF9C]/20">
            <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] text-sm mb-1">Creation Mechanism (Premium)</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">ETF trades above NAV → AP buys underlying shares → Delivers to Sponsor → Receives new ETF shares to sell.</p>
          </div>
          <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/10 p-3 rounded-xl border border-[#BC4128]/20 dark:border-[#E2694A]/20">
            <h4 className="font-bold text-[#BC4128] dark:text-[#E2694A] text-sm mb-1">Redemption Mechanism (Discount)</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">ETF trades below NAV → AP buys ETF shares → Delivers to Sponsor → Receives underlying shares to sell.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TaxAndRebalanceSection = () => (
  <section className="mb-16">
    <SectionHeading 
      title="Tax Efficiency & The Heartbeat Trade" 
      subtitle="Exploiting the in-kind exemption for superior compounding"
    />

    <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
      Unlike mutual funds that must sell assets (triggering capital gains) to meet redemptions, ETFs utilize <strong className="text-gray-900 dark:text-gray-100">Section 852(b)(6)</strong>. In-kind distribution of appreciated property is not a taxable event. The pinnacle of this engineering is the <strong className="text-gray-900 dark:text-gray-100">Heartbeat Trade</strong>.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border-t-4 border-[#A8672E] dark:border-[#D08F52] border-x border-b border-gray-200 dark:border-gray-800">
        <div className="text-[#A8672E] dark:text-[#D08F52] font-mono font-bold mb-2">Day T</div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">The Injection</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">Portfolio manager coordinates with an AP. AP injects massive capital via a creation unit, expanding AUM for a single day.</p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border-t-4 border-[#A8672E] dark:border-[#D08F52] border-x border-b border-gray-200 dark:border-gray-800">
        <div className="text-[#A8672E] dark:text-[#D08F52] font-mono font-bold mb-2">Day T+1</div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Custom Basket</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">Manager constructs a restricted 'custom redemption PCF' containing ONLY the highly appreciated, low-cost-basis securities they want to offload.</p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border-t-4 border-[#A8672E] dark:border-[#D08F52] border-x border-b border-gray-200 dark:border-gray-800">
        <div className="text-[#A8672E] dark:text-[#D08F52] font-mono font-bold mb-2">Day T+2</div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">The Flush</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">Trades settle. AP redeems the shares created earlier, taking delivery of the custom basket. Embedded capital gains are completely flushed out tax-free.</p>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-4">Rebalancing & Sunshine Trading</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
        Index reconstitution creates predictable "sunshine trading." Because changes are announced in advance, hedge funds <strong className="text-gray-900 dark:text-gray-100">front-run</strong> passive ETFs. 
      </p>
      <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm md:text-base">
        <li className="flex items-start">
          <span className="flex-shrink-0 text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1">•</span>
          New index entrants rise ~67 bps before rebalance due to front-running.
        </li>
        <li className="flex items-start">
          <span className="flex-shrink-0 text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1">•</span>
          ETFs are forced to buy at the top via Market On Close (MOC) orders.
        </li>
        <li className="flex items-start">
          <span className="flex-shrink-0 text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1">•</span>
          Constituents typically fall ~20 bps in the following 20 days.
        </li>
        <li className="flex items-start">
          <span className="flex-shrink-0 text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1">•</span>
          This drag costs U.S. passive equity ETFs ~14.6 bps annually.
        </li>
      </ul>
    </div>
  </section>
);

const TradingStrategiesSection = () => (
  <section className="mb-16">
    <SectionHeading 
      title="Execution Strategies & Traps" 
      subtitle="Navigating low liquidity, volatility decay, and contango"
    />

    <div className="mb-12">
      <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-4">Tactics for Low-Liquidity ETFs</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
        An ETF's true liquidity is determined by its underlying securities, not its secondary volume. However, poor execution destroys returns.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { title: "Limit Orders are Mandatory", desc: "Never use market orders. Set limit near the midpoint to signal algorithmic market makers to step in." },
          { title: "Monitor the iNAV", desc: "Check Intraday Indicative Value (updated every 15s) to avoid buying at massive premiums during distress." },
          { title: "Avoid Open & Close", desc: "First and last 30 mins have extreme volatility. Trade mid-day when underlying markets are fully priced." },
          { title: "Institutional NAV Trades", desc: "Institutions use RFQ platforms to bypass secondary spreads entirely, executing directly at end-of-day NAV." }
        ].map((tactic, i) => (
          <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1 text-sm">{tactic.title}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{tactic.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-12">
      <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-4">The Volatility Decay Trap</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
        Leveraged/Inverse ETFs deliver multiples for a <em className="text-gray-900 dark:text-gray-100">single trading day</em>. Daily reset mechanics cause mathematical decay in choppy markets.
      </p>
      
      <FormulaPanel
        title="2x Leveraged ETF Mathematics"
        formula="R_{ETF} \neq 2 \times R_{Index}"
        legend="Daily compounding introduces volatility drag in non-trending markets."
        example={{
          label: "Scenario: Index Drops 10%, then Rebounds",
          rows: [
            { label: "Start", value: "Index: $100 | 2x ETF: $100" },
            { label: "Day 1 (Index -10%)", value: "Index: $90 | 2x ETF: $80 (-20%)" },
            { label: "Day 2 (Index +11.11%)", value: "Index: $100 | 2x ETF: $97.78 (+22.22% of $80)" }
          ],
          result: { label: "Result", value: "Index: 0% | ETF: -2.22%" },
          note: "Index is FLAT (0%). ETF lost 2.22%."
        }}
      />
    </div>
    
    <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border border-[#BC4128]/20 dark:border-[#E2694A]/20 p-6 rounded-xl">
      <h3 className="text-xl font-serif text-[#BC4128] dark:text-[#E2694A] mb-4">The USO Anomaly & Futures Contango</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
        Commodity ETFs like USO use futures contracts. Rolling expiring contracts into higher-priced next-month contracts (<Jargon term="Contango" definition="Rolling expiring contracts into higher-priced next-month contracts." />) creates a persistent negative roll yield.
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
        In April 2020, extreme oil oversupply pushed futures into "super-contango" (prices went negative to -$37.63). USO swelled with retail cash, hit regulatory position limits, and was forced to halt creations and buy contracts far down the futures curve. <strong className="text-gray-900 dark:text-gray-100">Result: It completely decoupled from the spot price of oil</strong>, trading at a massive premium to an impaired NAV, eventually requiring an 8-for-1 reverse split.
      </p>
    </div>
  </section>
);

export default function ETFArchitecturePage() {
  return (
    <ArticleFrame slug="architecture-exchange-traded-funds-mechanisms-trading-strategies-structural-risks">
      <InfographicSlot 
        alt="ETF Architecture Infographic" 
        label="Ecosystem Overview"
      />
      <KeyTakeaways />
      <GenesisSection />
      <ActivePassiveSection />
      <DualMarketSection />
      <TaxAndRebalanceSection />
      <TradingStrategiesSection />
    </ArticleFrame>
  );
}
