'use client';

import React from 'react';
import { ArticleFrame } from '@/components/articles/article-frame';

// --- Helper Components for UI ---
// Icon component for section headers
const SectionIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 text-blue-800 rounded-lg p-2 mr-4 flex-shrink-0">
    {children}
  </div>
);

// Reusable Card component for sections
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 mb-8 transition-shadow duration-300 hover:shadow-xl ${className}`}>
    {children}
  </section>
);

// Reusable Section Title component
const SectionTitle = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
  <div className="flex items-center mb-6">
    {icon && <SectionIcon>{icon}</SectionIcon>}
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
      {title}
    </h2>
  </div>
);

// --- Data for Tables ---
const keyMetricsData = [
  { metric: "Market Capitalization", value: "~$271 - $294 Billion" },
  { metric: "Stock Price (Aug 15, 2025)", value: "$121.26" },
  { metric: "52-Week Range", value: "$79.21 - $148.43" },
  { metric: "TTM Revenue", value: "$137.3 Billion (RMB 996.3B)" },
  { metric: "TTM Net Income", value: "$17.4 Billion (RMB 126.0B)" },
  { metric: "P/E Ratio (TTM)", value: "~15.8 - 17.3" },
  { metric: "P/S Ratio (TTM)", value: "~2.1 - 2.3" },
  { metric: "Dividend Yield (Forward)", value: "~0.85% - 1.63%" },
  { metric: "Consensus Analyst Rating", value: "Strong Buy" },
  { metric: "Average 12-Month Price Target Upside", value: "+24.8%" },
];

const financialsData = [
  { metric: "Total Revenue", fy2024: "941,168", fy2025: "996,347", change: "+6%" },
  { metric: "Gross Profit", fy2024: "354,845", fy2025: "398,062", change: "+12%" },
  { metric: "Gross Margin %", fy2024: "37.7%", fy2025: "39.95%", change: "+225 bps" },
  { metric: "Income from Operations", fy2024: "123,871", fy2025: "140,905", change: "+14%" },
  { metric: "Operating Margin %", fy2024: "13.2%", fy2025: "14.1%", change: "+90 bps" },
  { metric: "Net Income", fy2024: "71,332", fy2025: "125,976", change: "+77%" },
  { metric: "Net Margin %", fy2024: "7.6%", fy2025: "12.6%", change: "+500 bps" },
  { metric: "Adjusted EBITA (Non-GAAP)", fy2024: "165,029", fy2025: "173,065", change: "+5%" },
  { metric: "Adjusted EBITA Margin %", fy2024: "17.5%", fy2025: "17.4%", change: "-10 bps" },
  { metric: "Net Cash from Operating Activities", fy2024: "182,593", fy2025: "163,509", change: "-10%" },
  { metric: "Free Cash Flow (Non-GAAP)", fy2024: "156,210", fy2025: "73,870", change: "-53%" },
];

const competitorData = [
  { company: "Alibaba (BABA)", marketCap: "$289.1B", pe: "13.4", ps: "2.1", evEbitda: "22.9", margin: "13.1%", roe: "13.0%" },
  { company: "Amazon (AMZN)", marketCap: "$2.46T", pe: "35.2", ps: "3.7", evEbitda: "18.9", margin: "13.6%", roe: "29.6%" },
  { company: "Tencent (00700.HK)", marketCap: "$686.1B", pe: "22.2", ps: "7.2", evEbitda: "20.5", margin: "29.5%", roe: "25.2%" },
  { company: "JD.com (JD)", marketCap: "$45.7B", pe: "7.8", ps: "0.3", evEbitda: "7.0", margin: "6.8%", roe: "20.1%" },
  { company: "PDD Holdings (PDD)", marketCap: "$169.0B", pe: "11.7", ps: "3.2", evEbitda: "N/A", margin: "15.4%", roe: "35.6%" },
];

// --- Main Components ---
const ExecutiveSummary = () => (
  <Card>
    <SectionTitle
      title="Executive Summary"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      }
    />
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
      <p>
        This report provides a comprehensive analysis of Alibaba Group Holding Ltd. (NYSE: BABA), examining its operational structure, financial health, competitive positioning, and strategic direction. The core investment thesis is that Alibaba presents a compelling, high-risk/high-reward opportunity. The company&apos;s stock appears significantly undervalued relative to its intrinsic growth potential and its global technology peers. This valuation discount is a direct consequence of persistent geopolitical risks stemming from US-China relations and the long-term impact of China&apos;s domestic regulatory crackdown on its technology sector.
      </p>
      <p>
        The primary catalysts for a material re-rating of the stock are threefold: the successful execution of its &ldquo;AI-driven&rdquo; strategy, the sustained operational turnaround in its core e-commerce business, and a stabilization of the regulatory and geopolitical environment. For investors with a suitable risk tolerance and a long-term investment horizon, the current valuation may offer an attractive entry point into a dominant technology franchise at a historically significant discount.
      </p>
    </div>
  </Card>
);

const KeyMetrics = () => (
  <Card>
    <SectionTitle
      title="Key Metrics at a Glance"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      }
    />
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {keyMetricsData.map((item, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.metric}</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

const CorporateDeepDive = () => (
  <Card>
    <SectionTitle
      title="Corporate and Operational Deep Dive"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      }
    />
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
      <p>
        Alibaba Group has evolved from a B2B portal into a sprawling technology conglomerate encompassing e-commerce, retail, logistics, cloud computing, digital media, and local services. A major 2023 restructuring organized the company into six largely independent business units to enhance agility and unlock value.
      </p>
      <h4 className="font-semibold text-gray-800 dark:text-white">Core Business Units:</h4>
      <ul>
        <li><strong>Taobao and Tmall Group (TTG):</strong> The primary profit engine, including China&apos;s largest C2C (Taobao) and B2C (Tmall) marketplaces.</li>
        <li><strong>Cloud Intelligence Group:</strong> The key growth engine, housing Alibaba Cloud (Aliyun), a market leader in Asia for cloud infrastructure and AI services.</li>
        <li><strong>Alibaba International Digital Commerce (AIDC):</strong> Spearheads global expansion with platforms like AliExpress, Lazada, and Trendyol.</li>
        <li><strong>Cainiao Smart Logistics Network:</strong> The data-driven logistics backbone of the ecosystem.</li>
        <li><strong>Local Services Group:</strong> Includes food delivery (Ele.me) and mapping/navigation (Amap).</li>
        <li><strong>Digital Media and Entertainment Group:</strong> Holds assets like the video platform Youku and Alibaba Pictures.</li>
      </ul>
    </div>
  </Card>
);

const FinancialAnalysis = () => (
  <Card>
    <SectionTitle
      title="Comprehensive Financial Analysis"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
    />
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4 mb-8">
      <p>
        Alibaba&apos;s financials show a resilient, profitable core, a strong balance sheet, and a strategy of heavy investment in future growth. For FY2025, total revenues grew 6% to $137.3B, with GAAP net income surging 77% to $17.4B, partly due to investment gains. The company maintains a formidable net cash position of $50.5 billion and a low Debt-to-Equity ratio.
      </p>
      <p>
        A key point is the 53% decline in FY2025 free cash flow (FCF), which is a direct result of a massive, deliberate surge in capital expenditures for cloud and AI infrastructure. This investment is crucial for long-term competitive positioning and is already validated by the 18% revenue growth in the Cloud Intelligence segment.
      </p>
    </div>
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Metric (in RMB millions)
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              FY 2024
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              FY 2025
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              YoY Change
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {financialsData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {row.metric}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">
                {row.fy2024}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">
                {row.fy2025}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${row.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                {row.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const MarketPositioning = () => (
  <Card>
    <SectionTitle
      title="Market Positioning and Competitive Gauntlet"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      }
    />
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
      <p>
        Alibaba operates in the hyper-competitive e-commerce and cloud computing sectors. In Chinese e-commerce, it faces intense pressure from JD.com (a first-party retailer) and PDD Holdings (a disruptive social commerce player). In cloud computing, Alibaba is the leader in Asia but a challenger globally to AWS, Azure, and Google Cloud, while competing domestically with Tencent Cloud.
      </p>
      <p>
        Geopolitics creates a unique dynamic for Alibaba Cloud. US-China tech tensions provide a protective moat in its home market but act as a significant barrier to expansion in Western markets, making regions like Southeast Asia and the Middle East key for international growth.
      </p>
    </div>
  </Card>
);

const SwotAnalysis = () => (
  <Card>
    <SectionTitle
      title="SWOT Analysis"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border-l-4 border-green-500">
        <h4 className="font-bold text-lg text-green-800 dark:text-green-300 mb-2">Strengths</h4>
        <ul className="list-disc list-inside text-green-700 dark:text-green-400 space-y-1">
          <li>Dominant market position in China</li>
          <li>Fortress-like balance sheet with massive net cash</li>
          <li>Diverse and synergistic ecosystem</li>
          <li>Advanced, proprietary AI technology</li>
        </ul>
      </div>
      <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border-l-4 border-red-500">
        <h4 className="font-bold text-lg text-red-800 dark:text-red-300 mb-2">Weaknesses</h4>
        <ul className="list-disc list-inside text-red-700 dark:text-red-400 space-y-1">
          <li>Slowing growth in mature domestic e-commerce</li>
          <li>Losses in investment-heavy segments</li>
          <li>Margin pressure from intense competition</li>
        </ul>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">Opportunities</h4>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 space-y-1">
          <li>Massive global demand for AI & cloud services</li>
          <li>Significant growth potential in international markets</li>
          <li>Leveraging AI to enhance monetization</li>
          <li>Potential for valuation re-rating</li>
        </ul>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg border-l-4 border-yellow-500">
        <h4 className="font-bold text-lg text-yellow-800 dark:text-yellow-300 mb-2">Threats</h4>
        <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>Adverse regulatory action from Beijing</li>
          <li>Escalating US-China geopolitical tensions</li>
          <li>Slowdown in the Chinese economy</li>
          <li>Rapid technological change from competitors</li>
        </ul>
      </div>
    </div>
  </Card>
);

const Valuation = () => (
  <Card>
    <SectionTitle
      title="Valuation Analysis"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      }
    />
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4 mb-8">
      <p>
        Alibaba&apos;s stock trades at a stark and persistent discount to its global technology peers like Amazon and Tencent, often termed a &ldquo;geopolitical discount.&rdquo; While it trades at a premium to domestic rival JD.com, this is justified by its superior high-margin marketplace model. Multiple intrinsic value models suggest the stock is significantly undervalued, with a potential upside of 25% or more to reach its fair value.
      </p>
    </div>
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Company</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Market Cap</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">P/E</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">P/S</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">EV/EBITDA</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Net Margin</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ROE</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {competitorData.map((c) => (
            <tr key={c.company} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{c.company}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-right">{c.marketCap}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-right">{c.pe}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-right">{c.ps}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-right">{c.evEbitda}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-right">{c.margin}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 text-right">{c.roe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const InvestmentThesis = () => (
  <Card>
    <SectionTitle
      title="Investment Thesis & Conclusion"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      }
    />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h4 className="font-bold text-xl text-green-600 dark:text-green-400 mb-3">The Bull Case</h4>
        <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 space-y-2">
          <p>
            Built on a compelling valuation discount, tangible results from the &ldquo;AI-driven&rdquo; pivot (accelerating cloud growth), and a stabilizing regulatory environment. A new, aggressive capital return policy provides further support.
          </p>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-xl text-red-600 dark:text-red-400 mb-3">The Bear Case</h4>
        <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 space-y-2">
          <p>
            Dominated by risks outside the company&apos;s control: a severe downturn in the Chinese economy, escalating US-China tech tensions (especially semiconductor restrictions), and relentless domestic competition that could permanently erode margins.
          </p>
        </div>
      </div>
    </div>
    <hr className="my-8 border-gray-200 dark:border-gray-700" />
    <div>
      <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-3">Conclusion</h4>
      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p>
          An investment in Alibaba is a bet that its fundamental growth drivers and attractive valuation will overcome significant geopolitical and regulatory risks. For long-term investors with a high risk tolerance, the current price offers a compelling entry point into a world-class tech franchise at a substantial discount. Continuous monitoring of AI strategy execution, the Beijing regulatory landscape, and US-China relations is essential.
        </p>
      </div>
    </div>
  </Card>
);

// --- Main App Component ---
export default function AlibabaAnalysis() {
  return (
    <ArticleFrame slug="alibaba-baba-stock-analysis-complex-era-growth-risk">
      <ExecutiveSummary />
      <KeyMetrics />
      <CorporateDeepDive />
      <FinancialAnalysis />
      <MarketPositioning />
      <Valuation />
      <SwotAnalysis />
      <InvestmentThesis />
    </ArticleFrame>
  );
}
