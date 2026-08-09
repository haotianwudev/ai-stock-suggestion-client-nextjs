'use client';

import React, { useState } from 'react';
import { ArticleFrame } from '@/components/articles/article-frame';
import { Jargon } from '@/components/articles/article-visuals';

// --- SVG ICON COMPONENTS ---
const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TrendingDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const LandmarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// --- DATA CONSTANTS ---
const valuationMetrics = [
  {
    name: "Shiller P/E (CAPE) Ratio",
    description: "Measures price relative to average inflation-adjusted earnings over the previous 10 years, smoothing out business cycle fluctuations.",
    currentValue: "~39.9",
    historicalMean: "~17.3",
    delta: "+131%",
    implication: "Strongly Overvalued",
    icon: TrendingUpIcon,
    tone: "neg" as const,
  },
  {
    name: "Buffett Indicator",
    description: "Compares the total market capitalization of all U.S. stocks to the nation's Gross Domestic Product (GDP).",
    currentValue: "~219%",
    historicalMean: "~85%",
    delta: "+158%",
    implication: "Strongly Overvalued",
    icon: LandmarkIcon,
    tone: "neg" as const,
  },
  {
    name: "S&P 500 Trailing P/E",
    description: "The standard measure of stock price relative to the aggregated earnings per share of companies over the last 12 months.",
    currentValue: "~25.9 - 30.8",
    historicalMean: "~19.4",
    delta: "+33% to +59%",
    implication: "Overvalued",
    icon: TrendingUpIcon,
    tone: "caution" as const,
  },
  {
    name: "Earnings Yield Gap",
    description: "Compares the S&P 500's earnings yield (inverse of P/E ratio) to the yield on 10-year Treasury bonds.",
    currentValue: "-0.69%",
    historicalMean: "+0.26%",
    delta: "Negative Spread",
    implication: "Bonds More Attractive",
    icon: TrendingDownIcon,
    tone: "neg" as const,
  },
];

const historicalData = [
  { peak: "Aug 1929", shillerPE: "32.6", return1: "-35.2%", return5: "-13.9%", return10: "-0.5%" },
  { peak: "Dec 1999", shillerPE: "44.2", return1: "-6.5%", return5: "-5.8%", return10: "-1.2%" },
  { peak: "Jun 2007", shillerPE: "27.6", return1: "-40.6%", return5: "-3.1%", return10: "+2.9%" },
  { peak: "Sep 2025", shillerPE: "~39.9", return1: "?", return5: "?", return10: "?" },
];

const defensiveSectors = [
  {
    name: "Consumer Staples",
    rationale: "Consistent demand for food, beverages, and household products regardless of the economic climate.",
    companies: "Procter & Gamble (PG), Coca-Cola (KO), Walmart (WMT)"
  },
  {
    name: "Utilities",
    rationale: "Essential services like electricity, water, and gas are non-negotiable for households and businesses.",
    companies: "NextEra Energy (NEE), General Electric (GE), Duke Energy (DUK)"
  },
  {
    name: "Healthcare",
    rationale: "Demand is largely inelastic, driven by demographics and health needs rather than economic cycles.",
    companies: "Johnson & Johnson (JNJ), Pfizer (PFE), Sanofi (SAN)"
  }
];

const investmentPrinciples = [
  {
    title: "Strategic Asset Allocation & Rebalancing",
    content: "The cornerstone of a resilient portfolio is a disciplined allocation strategy. For instance, a traditional 60/40 portfolio (60% equities, 40% bonds) serves as a baseline. With 10-Year Treasury yields above 4%, high-quality bonds are once again a viable source of income and diversification. Rebalancing—periodically trimming appreciated assets (like U.S. equities) and reallocating to underperforming ones (like bonds or international stocks)—enforces a 'sell high, buy low' discipline and manages risk."
  },
  {
    title: "Emphasize Value and Quality",
    content: "In an expensive market, seek a margin of safety by investing in companies trading below their intrinsic worth. Look for low P/E ratios, strong free cash flow (the cash a company generates after accounting for capital expenditures), and sustainable dividends. Prioritize quality—companies with strong balance sheets, low debt, and durable competitive advantages (moats), which allow them to maintain profitability over the long term."
  },
  {
    title: "Bolster Defensive Positioning",
    content: "Increase allocation to sectors that provide essential goods and services. These businesses tend to have more stable earnings, predictable cash flows, and lower volatility, offering a cushion during market downturns. Their inelastic demand makes them less susceptible to economic contraction, providing a defensive tilt to a portfolio."
  },
  {
    title: "Geographic Diversification",
    content: "The extreme overvaluation is primarily a U.S. phenomenon. Many international developed markets (e.g., in Europe and Japan) and emerging markets are trading at far more attractive valuations. Shifting a portion of an equity allocation abroad can reduce concentration risk from a single, expensive market and may enhance long-term returns if the U.S. market underperforms."
  },
  {
    title: "Employ Systematic Investing",
    content: "Use dollar-cost averaging (DCA) by investing a fixed amount at regular intervals, regardless of market highs or lows. This strategy removes the dangerous emotion of trying to time the market. It automatically buys more shares when prices are low and fewer when they are high, lowering your average cost basis over time and mitigating the risk of deploying a large lump sum at a market peak."
  }
];

const counterArguments = [
  {
    title: "The 'Magnificent Seven' Effect",
    content: "A significant portion of the S&P 500's high valuation is driven by a handful of mega-cap technology stocks with extraordinary earnings growth and dominant market positions. Proponents argue their premium P/E ratios are justified by their fortress-like balance sheets, high profitability, and leadership in secular growth trends like AI. The market, therefore, isn't uniformly expensive; it's top-heavy."
  },
  {
    title: "The Interest Rate Environment",
    content: "While rates have risen, they remain low by historical standards from before the 2008 financial crisis. In a lower-rate world, future earnings are discounted at a lower rate, making them more valuable today. This structural shift, some argue, supports a permanently higher plateau for equity valuations compared to previous decades."
  },
  {
    title: "It's 'Different This Time'",
    content: "Unlike the dot-com bubble, where many high-flying stocks had no earnings, today's market leaders are immensely profitable. The composition of the S&P 500 has shifted from capital-intensive industrial firms to asset-light, high-margin technology and service companies. This change in market structure could warrant higher aggregate valuations than in the past."
  }
];

// Helper Components
interface MetricCardProps {
  metric: {
    name: string;
    description: string;
    currentValue: string;
    historicalMean: string;
    delta: string;
    implication: string;
    icon: React.ComponentType<{ className?: string }>;
    tone: "neg" | "caution";
  };
}

const toneClasses = {
  neg: {
    bg: 'bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border-[#BC4128]/30 dark:border-[#E2694A]/30',
    text: 'text-[#BC4128] dark:text-[#E2694A]',
    iconBg: 'bg-[#BC4128]/10 dark:bg-[#E2694A]/15',
  },
  caution: {
    bg: 'bg-[#A8672E]/5 dark:bg-[#D08F52]/10 border-[#A8672E]/30 dark:border-[#D08F52]/30',
    text: 'text-[#A8672E] dark:text-[#D08F52]',
    iconBg: 'bg-[#A8672E]/10 dark:bg-[#D08F52]/15',
  },
} as const;

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const classes = toneClasses[metric.tone];

  return (
    <div className={`rounded-xl p-6 border ${classes.bg} flex flex-col justify-between h-full shadow-sm`}>
      <div>
        <div className="flex items-start justify-between">
          <h3 className="font-serif text-lg text-gray-900 dark:text-white">{metric.name}</h3>
          <div className={`p-2 rounded-full ${classes.iconBg}`}>
            <metric.icon className={`h-6 w-6 ${classes.text}`} />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{metric.description}</p>
      </div>
      <div className="mt-6">
        <p className={`text-sm font-medium ${classes.text}`}>{metric.implication}</p>
        <p className="text-3xl font-mono tabular-nums font-bold text-gray-900 dark:text-white mt-1">{metric.currentValue}</p>
        <div className="flex justify-between items-baseline mt-2 text-gray-500 dark:text-gray-400 text-sm">
          <p>vs. <span className="font-mono tabular-nums font-semibold text-gray-700 dark:text-gray-300">{metric.historicalMean}</span> mean</p>
          <p className={`font-mono tabular-nums font-semibold ${classes.text}`}>{metric.delta}</p>
        </div>
      </div>
    </div>
  );
};

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  showDefensiveSectors?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick, showDefensiveSectors }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <button
      className="w-full flex justify-between items-center text-left py-5 px-6"
      onClick={onClick}
    >
      <span className="font-serif text-lg text-gray-900 dark:text-white">{title}</span>
      <ChevronDownIcon
        className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 flex-none ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
        <div className="pb-5 px-6 text-gray-600 dark:text-gray-400">
          <p>{content}</p>
          {showDefensiveSectors && (
            <div className="mt-4 space-y-3">
              {defensiveSectors.map((sector, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-serif text-[#A8672E] dark:text-[#D08F52]">{sector.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{sector.rationale}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">e.g., {sector.companies}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function NavigatingRarifiedAir() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ArticleFrame slug="navigating-rarified-air-quantitative-analysis-us-market-valuations">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100 font-sans">
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Analysis based on statements from September 2025</p>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span>
                <span>Fed Chair Powell&apos;s September 2025 &ldquo;fairly highly valued&rdquo; remark echoes Greenspan&apos;s 1996 &ldquo;irrational exuberance&rdquo; warning&mdash;verbal intervention, not policy action.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span>
                <span>Four independent valuation metrics&mdash;Shiller CAPE, the Buffett Indicator, trailing P/E, and the earnings yield gap&mdash;all point to historical overvaluation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span>
                <span>Prior valuation peaks (1929, 1999, 2007) were followed by flat-to-negative long-term real returns as valuations mean-reverted.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span>
                <span>A counter-case exists: Magnificent Seven earnings quality, a structurally lower-rate world, and a leaner S&amp;P 500 composition could justify a higher plateau.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span>
                <span>Recommended posture: disciplined rebalancing, value/quality tilt, defensive sectors, geographic diversification, and systematic (DCA) investing&mdash;not panic.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Powell Quote Section */}
        <section className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-6">The Powell Pronouncement</h2>
          <blockquote className="relative border-l-4 border-[#A8672E] dark:border-[#D08F52] pl-6">
            <p className="text-xl italic text-gray-800 dark:text-gray-200">
              &ldquo;By many measures, U.S. equity prices are fairly highly valued.&rdquo;
            </p>
            <footer className="mt-4 text-gray-500 dark:text-gray-400">
              &mdash; Jerome Powell, Federal Reserve Chair, September 2025
            </footer>
          </blockquote>
          <div className="mt-6 text-gray-600 dark:text-gray-400 space-y-4">
            <p>
              Powell&apos;s remarks function as <Jargon term="jawboning" definition="Verbal intervention by policymakers intended to influence market expectations without taking direct policy action." />&mdash;this echoes Alan Greenspan&apos;s famous 1996 &ldquo;irrational exuberance&rdquo; warning during the dot-com bubble, signaling official concern over speculative froth.
            </p>
            <p>
              The Fed faces a difficult two-sided risk: easing monetary policy too soon could reignite inflation, but keeping it restrictive for too long risks derailing the economy and labor market. Powell&apos;s statement subtly communicates that the <Jargon term="Fed Put" definition="The market's implicit belief that the Federal Reserve will always step in with rate cuts or liquidity to prevent a serious crash." /> is not unconditional, especially while inflation remains a concern.
            </p>
          </div>
        </section>

        {/* Quantitative Analysis Section */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">A Quantitative Assessment</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            Key metrics unanimously signal a market in a state of historical overvaluation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {valuationMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </section>

        {/* Historical Precedent Section */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
            The &ldquo;Lost Decade&rdquo; Phenomenon
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            History shows a powerful tendency for valuations to <Jargon term="mean revert" definition="The tendency for a metric that has moved to an extreme to gradually return toward its long-run historical average." />. When markets reach extreme peaks, subsequent long-term returns are often flat or negative as valuations compress back toward their historical averages.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Market Peak</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Shiller P/E at Peak</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400 text-right">1-Year Real Return</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400 text-right">5-Year Ann. Real Return</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400 text-right">10-Year Ann. Real Return</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((row, index) => (
                  <tr key={index} className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${row.peak === 'Sep 2025' ? 'bg-[#A8672E]/5 dark:bg-[#D08F52]/10' : ''}`}>
                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{row.peak}</td>
                    <td className="p-4 font-mono tabular-nums text-gray-600 dark:text-gray-400">{row.shillerPE}</td>
                    <td className={`p-4 font-mono tabular-nums text-right ${row.return1.startsWith('-') ? 'text-[#BC4128] dark:text-[#E2694A]' : row.return1 === '?' ? 'text-gray-400 dark:text-gray-600' : 'text-[#1D8A70] dark:text-[#3CBF9C]'}`}>
                      {row.return1}
                    </td>
                    <td className={`p-4 font-mono tabular-nums text-right ${row.return5.startsWith('-') ? 'text-[#BC4128] dark:text-[#E2694A]' : row.return5 === '?' ? 'text-gray-400 dark:text-gray-600' : 'text-[#1D8A70] dark:text-[#3CBF9C]'}`}>
                      {row.return5}
                    </td>
                    <td className={`p-4 font-mono tabular-nums text-right ${row.return10.startsWith('-') ? 'text-[#BC4128] dark:text-[#E2694A]' : row.return10 === '?' ? 'text-gray-400 dark:text-gray-600' : 'text-[#1D8A70] dark:text-[#3CBF9C]'}`}>
                      {row.return10}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Strategic Recommendations */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
            Strategic Recommendations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            An actionable playbook for the prudent investor in a challenging landscape.
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            {investmentPrinciples.map((principle, index) => (
              <AccordionItem
                key={index}
                title={principle.title}
                content={principle.content}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
                showDefensiveSectors={principle.title === "Bolster Defensive Positioning"}
              />
            ))}
          </div>
        </section>

        {/* Counter-Arguments */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
            The Counter-Argument
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            To maintain a balanced view, it&apos;s crucial to consider arguments for why today&apos;s high valuations might be justified.
          </p>

          <div className="grid gap-4">
            {counterArguments.map((arg, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="font-serif text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5 text-[#A8672E] dark:text-[#D08F52] flex-none" />
                  {arg.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{arg.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-4">
            Conclusion: A Call for Discipline
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            While compelling arguments exist to justify current valuations, the weight of historical evidence suggests profound risks. The present environment does not call for panic, but for a rational, disciplined shift in strategy. Success in the coming years will likely belong not to those who chase momentum, but to those who build a resilient framework on the enduring principles of diversification, value, quality, and systematic discipline.
          </p>
        </section>
      </div>
    </ArticleFrame>
  );
}
