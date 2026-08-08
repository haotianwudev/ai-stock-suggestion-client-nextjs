'use client';

import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, BarChart3, Scale, History, Target, Briefcase, Globe, Settings, FileText } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Helper component for section titles
const SectionTitle = ({ icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) => {
  const Icon = icon;
  return (
    <h2 className="text-3xl font-bold text-slate-800 flex items-center mb-6">
      <Icon className="w-8 h-8 mr-4 text-sky-500" />
      {children}
    </h2>
  );
};

// Helper component for individual stat cards
const StatCard = ({ title, value, change, icon, changeType }: {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  changeType: 'gain' | 'loss';
}) => {
  const Icon = icon;
  const changeColor = changeType === 'gain' ? 'text-emerald-500' : 'text-red-500';
  const ChangeIcon = changeType === 'gain' ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex-1 min-w-[280px]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <Icon className="w-6 h-6 text-slate-400" />
      </div>
      <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
      <div className="flex items-center mt-1">
        <ChangeIcon className={`w-4 h-4 ${changeColor}`} />
        <p className={`text-sm font-semibold ml-1 ${changeColor}`}>{change}</p>
      </div>
    </div>
  );
};

// Component for the main table in the report
const AnalysisTable = ({ headers, data }: { headers: string[]; data: string[][] }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-slate-200">
    <table className="w-full text-left">
      <thead className="bg-slate-50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-4 text-slate-700 whitespace-nowrap">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Page() {
  const dollarDeclineTableData = [
    ["January", "128.67", "-", "+256", "4.0 (Dec '24)", "3.0", "Donald Trump Inaugurated [10, 11]"],
    ["February", "-", "-", "+143", "4.1 (Jan '25)", "2.8", "Three-year anniversary of Ukraine invasion [10]"],
    ["March", "-", "-", "+228", "4.2", "2.4", "-"],
    ["April", "-", "-", "+177", "4.2", "2.3", "New administration announces broad-based tariff plans [1]"],
    ["May", "-", "-", "+139", "4.2", "2.4", "-"],
    ["June", "119.83", "-", "+147", "4.1", "2.7", "NATO Summit in The Hague [10]"],
    ["July", "122.11", "+1.9%", "+73", "4.2", "2.7", "Stronger-than-expected economic data prompts temporary rally [1]"],
    ["August", "120.70 (as of 8/22)", "-1.2%", "-", "4.2", "2.7 (July)", "Fed releases revised monetary policy framework [14, 15]"],
  ];

  const equityPerformanceTableData = [
    ["January", "6,040.53", "+2.70%", "-", "-"],
    ["February", "5,954.50", "-1.42%", "-", "-"],
    ["March", "5,611.85", "-5.75%", "-", "-"],
    ["April", "5,569.06", "-0.76%", "-", "-"],
    ["May", "5,911.69", "+6.15%", "-", "-"],
    ["June", "6,204.95", "+4.96%", "-", "-"],
    ["July", "6,339.39", "+2.17%", "+1.9%", "GE Vernova: +100.7%, Newmont: +66.8%, General Electric: +62.5%"],
    ["August", "6,460.26 (as of 8/28)", "+1.91% (MTD)", "-1.2% (MTD)", "-"],
  ];

  const historicalComparisonTableData = [
    ["S&P 500", "Positive (avg. not specified)", "+7.7%", "+14.1%", "+9.84%"],
    ["U.S. Dollar Index (DXY)", "+3.0%", "+2.0%", "Positive (avg. not specified)", "-9.83%"],
  ];

  return (
    <ArticleFrame
      slug="navigating-turning-tide-2025-macro-analysis"
      additionalDisclaimer="Macroeconomic analysis involves significant uncertainty, and past performance does not guarantee future results. Currency and equity markets can be highly volatile."
    >
      <div className="max-w-5xl mx-auto px-4 text-slate-700">
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
          An in-depth look at the 2025 Dollar decline, U.S. equity resilience, and the emergence of a new macroeconomic paradigm driven by domestic policy.
        </p>

        {/* Key Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            title="U.S. Dollar Index (DXY) YTD"
            value="-9.83%"
            change="Significant Downturn"
            icon={TrendingDown}
            changeType="loss"
          />
          <StatCard
            title="S&P 500 YTD"
            value="+9.84%"
            change="New All-Time Highs"
            icon={TrendingUp}
            changeType="gain"
          />
        </section>

        {/* Executive Summary Section */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center mb-4">
              <FileText className="w-8 h-8 mr-4 text-sky-500" />
              Executive Summary
            </h2>
            <div className="space-y-4 text-slate-600">
              <p>
                The first eight months of 2025 marked a historic inflection point for the U.S. Dollar, concluding a 15-year bull cycle with one of its most precipitous declines in over half a century. The depreciation was a culmination of a Federal Reserve policy pivot, a cooling domestic economy, and a surge in policy uncertainty following a new administration&apos;s aggressive tariff agenda.
              </p>
              <p>
                The U.S. Dollar Index (DXY) fell approximately 11% in H1 2025, a decline precipitated by broad-based tariffs. This self-generated policy risk inverted the dollar&apos;s traditional safe-haven role. Concurrently, the S&amp;P 500 showed remarkable resilience, reaching new all-time highs with a nearly 10% gain, propelled by a broadening market rally and the weaker dollar&apos;s tailwind to multinational earnings.
              </p>
              <p>
                This divergence signals a new market paradigm where domestic policy uncertainty has emerged as a primary driver of currency weakness, a critical shift for investors and policymakers.
              </p>
            </div>
          </div>
        </section>

        {/* 2025 Dollar Downturn Section */}
        <section className="mb-16">
          <SectionTitle icon={BarChart3}>The 2025 Dollar Downturn: A Multi-Factor Analysis</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">The Catalyst: Tariff Policy and Geopolitical Risk</h3>
              <p>
                The pivotal shift against the U.S. Dollar can be traced directly to April 2025, coinciding with the new Trump administration&apos;s announcements of an aggressive tariff agenda. The proposed tariffs&mdash;up to 60% on goods from China and 20% on all other imports&mdash;were perceived as a significant threat to global supply chains and U.S. growth, injecting high uncertainty into markets.
              </p>

              <h3 className="text-xl font-semibold text-slate-700">The Enabler: A Pivoting Federal Reserve</h3>
              <p>
                A concurrent shift in the Federal Reserve&apos;s monetary policy framework created permissive conditions for a sustained dollar decline. The Fed&apos;s revised &ldquo;Statement on Longer-Run Goals&rdquo; provided more flexibility to cut rates preemptively, validating market expectations for a significant easing cycle and reducing the appeal of holding dollar-denominated assets.
              </p>

              <h3 className="text-xl font-semibold text-slate-700">The Confirmation: Cooling Economic Data</h3>
              <p>
                A steady stream of cooling macroeconomic data&mdash;including decelerating job creation, moderating inflation, and a mixed GDP picture&mdash;provided the confirmation required to sustain the dollar&apos;s bearish momentum. For equities, this &ldquo;bad news&rdquo; was &ldquo;good news,&rdquo; reinforcing the certainty of forthcoming rate cuts.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <AnalysisTable
                headers={["Month (2025)", "DXY", "MoM %", "NFP (k)", "U-Rate", "YoY CPI", "Key Event"]}
                data={dollarDeclineTableData}
              />
            </div>
          </div>
        </section>

        {/* US Equity Resilience Section */}
        <section className="mb-16">
          <SectionTitle icon={TrendingUp}>U.S. Equity Resilience Amidst Macroeconomic Shifts</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <AnalysisTable
                headers={["Month (2025)", "S&P 500", "MoM %", "DXY MoM %", "Select Performers (YTD)"]}
                data={equityPerformanceTableData}
              />
            </div>
            <div className="order-1 lg:order-2 space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">An Index at All-Time Highs</h3>
              <p>
                Despite the turmoil, the S&amp;P 500 posted a strong year-to-date gain of 9.84%, charting a course to new all-time highs. A powerful summer rally carried the index past 6,500 by late August, demonstrating remarkable strength.
              </p>

              <h3 className="text-xl font-semibold text-slate-700">A Broadening Rally: Beyond the Magnificent Seven</h3>
              <p>
                A critical, healthy development was the shift in leadership away from the &ldquo;Magnificent Seven.&rdquo; The rally broadened to include diverse sectors like Industrials and Materials, with strong performers like GE Vernova (+100.7%) and Palantir (+109.4%), indicating a more sustainable foundation for the bull market.
              </p>

              <h3 className="text-xl font-semibold text-slate-700">A Clear Inverse Correlation</h3>
              <p>
                The period exhibited a textbook inverse correlation: the DXY&apos;s 9.83% decline almost perfectly mirrored the S&amp;P 500&apos;s 9.84% gain. Anticipated Fed cuts boosted equity valuations while simultaneously weakening the dollar, which in turn provided an earnings tailwind for multinationals.
              </p>
            </div>
          </div>
        </section>

        {/* Currency Conundrum Section */}
        <section className="mb-16">
          <SectionTitle icon={Scale}>The Currency Conundrum: Integrating FX into Equity Analysis</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <Briefcase className="w-8 h-8 text-sky-500 mb-3" />
              <h4 className="font-bold text-lg text-slate-800 mb-2">Earnings Tailwind</h4>
              <p>
                A weak dollar directly boosts the reported earnings of U.S. multinationals as foreign profits translate into more dollars, supporting higher equity valuations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <Globe className="w-8 h-8 text-sky-500 mb-3" />
              <h4 className="font-bold text-lg text-slate-800 mb-2">Competitiveness Edge</h4>
              <p>
                U.S. exports become cheaper for foreign buyers, boosting sales and market share. However, import-reliant firms face higher costs and margin pressure.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <Settings className="w-8 h-8 text-sky-500 mb-3" />
              <h4 className="font-bold text-lg text-slate-800 mb-2">FX-Aware Framework</h4>
              <p>
                Investors must analyze geographic revenue, supply chains, and hedging strategies to assess a company&apos;s true currency exposure and select stocks accordingly.
              </p>
            </div>
          </div>
        </section>

        {/* Historical Perspective Section */}
        <section className="mb-16">
          <SectionTitle icon={History}>A Historical Perspective: Market Behavior During Fed Easing</SectionTitle>
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-700">The Dollar&apos;s Counterintuitive History</h3>
                <p>
                  Historically, the dollar shows a &ldquo;modest bullish trend&rdquo; around rate cuts, gaining an average of 3% before and 2% after the first cut. This is because easing cycles often occur during global stress, when the dollar acts as a safe-haven asset, attracting capital inflows.
                </p>

                <h3 className="text-xl font-semibold text-slate-700">Equities: A More Consistent Tale</h3>
                <p>
                  The S&amp;P 500 aligns with history, which shows an average return of +14.1% in the 12 months after a first rate cut. However, outcomes depend heavily on whether the cuts lead to a &ldquo;soft landing&rdquo; or fail to avert a recession.
                </p>

                <h3 className="text-xl font-semibold text-slate-700">The 2025 Divergence</h3>
                <p>
                  The key difference in 2025 is the *source* of economic risk. The risk was domestically generated by trade policy uncertainty, not an external shock. This undermined confidence in the U.S. trajectory, repelling capital and causing the dollar to weaken, in stark contrast to its historical safe-haven role.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <AnalysisTable
                  headers={["Asset Class", "Avg % Change (6 Mo. Prior)", "Avg % Change (6 Mo. After)", "Avg % Change (12 Mo. After)", "Actual 2025 YTD Perf."]}
                  data={historicalComparisonTableData}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Synthesis and Strategic Outlook Section */}
        <section className="bg-sky-600/10 p-8 rounded-2xl border border-sky-500/20 mb-16">
          <SectionTitle icon={Target}>Synthesis and Strategic Outlook</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Reconciling 2025 with History</h3>
              <p>
                The core thesis is that the dollar&apos;s anomalous behavior was driven by self-generated U.S. policy risk. The market priced in rate cuts as a reaction to potential damage from protectionist trade policies, inverting the dollar&apos;s typical safe-haven response.
              </p>

              <h3 className="text-xl font-semibold text-slate-700">Key Signposts to Watch</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Inflation Persistence:</strong> Stubborn core inflation could limit the Fed&apos;s ability to cut rates.</li>
                <li><strong>Labor Market Resilience:</strong> A continued softening supports a &ldquo;soft landing&rdquo; narrative.</li>
                <li><strong>Trade Policy Execution:</strong> Moderation or escalation of tariffs remains a key variable.</li>
                <li><strong>Global Growth Differentials:</strong> Relative growth vs. Europe/Asia will drive currency flows.</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Portfolio &amp; Risk Management</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Geographic Allocation:</strong> Consider unhedged international investments for currency tailwinds.</li>
                <li><strong>FX-Aware U.S. Equity Selection:</strong> Overweight multinational exporters, underweight import-reliant firms.</li>
                <li><strong>Volatility Management:</strong> Expect continued volatility. Maintain discipline, diversify, and focus on quality balance sheets.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
