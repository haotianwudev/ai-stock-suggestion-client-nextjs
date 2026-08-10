'use client';

import { BarChart2, BrainCircuit, Building, TrendingUp, TrendingDown, Info, AlertTriangle, CheckCircle, XCircle, Moon, Gift, Anchor } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-6">
      <div className="flex items-center mb-8">
        <Icon className="w-8 h-8 text-sky-500 mr-4" />
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 font-serif">{title}</h2>
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  </section>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg overflow-hidden p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const Verdict = ({ makesSense }: { makesSense: boolean }) => (
  <div
    className="mt-6 p-4 rounded-lg border flex items-start space-x-4 bg-opacity-50"
    style={{
      backgroundColor: makesSense ? 'rgba(236, 253, 245, 0.8)' : 'rgba(254, 242, 242, 0.8)',
      borderColor: makesSense ? '#34d399' : '#f87171'
    }}
  >
    {makesSense ?
      <CheckCircle className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0 mt-1" /> :
      <XCircle className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A] flex-shrink-0 mt-1" />
    }
    <div>
      <h4 className={`text-lg font-semibold ${makesSense ? 'text-emerald-800' : 'text-red-800'}`}>
        {makesSense ? 'Makes Sense (with caveats)' : 'Doesn\'t Make Sense'}
      </h4>
      <p className={`mt-1 text-sm ${makesSense ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A]'}`}>
        {makesSense ?
          'This pattern has a statistical basis, but may not be a wise trading strategy.' :
          'This adage is more myth than reality or is a flawed strategy.'
        }
      </p>
    </div>
  </div>
);

const StyledTable = ({ headers, data }: { headers: string[]; data: string[][] }) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
    <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
      <thead className="bg-slate-50 dark:bg-[#14171B] text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        <tr>
          {headers.map((header, i) => (
            <th key={i} scope="col" className="px-6 py-3">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="bg-white dark:bg-[#0A0D14] border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:bg-[#14171B]">
            {row.map((cell, j) => (
              <td key={j} className={`px-6 py-4 ${j > 0 ? 'font-mono' : 'font-medium text-slate-900 dark:text-slate-100'}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SellInMay = () => (
  <Card>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2 font-serif">&ldquo;Sell in May and Go Away&rdquo;</h3>
        <p className="text-slate-600 dark:text-slate-400">
          This famous adage suggests selling stocks around May 1st and reinvesting around Halloween (Nov 1st).
          The Nov-Apr period is often called the &ldquo;best six months.&rdquo;
        </p>
        <Verdict makesSense={false} />
      </div>
      <div>
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Why it seems plausible:</h4>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-start">
            <TrendingUp className="w-4 h-4 mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
            <p><strong>Summer Doldrums:</strong> Historically, lower trading volumes and listlessness during summer vacation months.</p>
          </li>
          <li className="flex items-start">
            <BrainCircuit className="w-4 h-4 mr-2 mt-0.5 text-sky-500 flex-shrink-0" />
            <p><strong>SAD Effect:</strong> A theory linking seasonal depression in fall/winter to increased risk aversion, depressing prices and setting up higher future returns.</p>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-8">
      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">The Data: Relative vs. Absolute Performance</h4>
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
        While the Nov-Apr period has shown higher average returns, the May-Oct period is still positive on average.
        Exiting the market means forfeiting these gains, which is devastating long-term due to compounding.
      </p>
      <StyledTable
        headers={['Metric', 'Nov - Apr ("Best")', 'May - Oct ("Worst")']}
        data={[
          ['Avg. 6-Month Return', 'Approx. +7.0%', 'Approx. +2.0%'],
          ['Frequency of Positive Returns', 'Approx. 77%', 'Approx. 67%'],
          ['Dominant Sectors', 'Cyclicals (Tech, Industrials)', 'Defensives (Staples, Utilities)']
        ]}
      />
    </div>

    <div className="mt-8">
      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">Critical Verdict: Buy-and-Hold Wins</h4>
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
        &ldquo;Time in the market beats timing the market.&rdquo; The cost of being out of the market during the &ldquo;weaker&rdquo;
        but still positive months is immense over time.
      </p>
      <StyledTable
        headers={['Strategy (1950-2025)', 'CAGR']}
        data={[
          ['Buy-and-Hold', '8.05%'],
          ['"Sell in May"', '6.86%']
        ]}
      />
    </div>
  </Card>
);

const JanuaryEffect = () => (
  <Card>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2 font-serif">The January Effect</h3>
        <p className="text-slate-600 dark:text-slate-400">
          A historical tendency for stocks, especially small-caps, to rise in January. The &ldquo;January Barometer&rdquo;
          suggests January&apos;s performance predicts the full year.
        </p>
        <Verdict makesSense={false} />
      </div>
      <div>
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Historical Explanations:</h4>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-start">
            <TrendingUp className="w-4 h-4 mr-2 mt-0.5 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0" />
            <p><strong>Tax-Loss Harvesting:</strong> Investors sell losers in December for tax purposes and reinvest in January.</p>
          </li>
          <li className="flex items-start">
            <Building className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <p><strong>Window Dressing:</strong> Funds sell losing stocks before year-end reports.</p>
          </li>
          <li className="flex items-start">
            <BrainCircuit className="w-4 h-4 mr-2 mt-0.5 text-sky-500 flex-shrink-0" />
            <p><strong>New Year Optimism:</strong> Fresh capital from bonuses and resolutions to invest.</p>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-8">
      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">The Data: A Fading Anomaly</h4>
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
        The January Effect is a classic example of an anomaly decaying as it becomes well-known.
        Investors now act in December, smoothing out the effect. It has largely disappeared in recent decades.
      </p>
      <StyledTable
        headers={['Average Jan Return (Small Cap)', 'Pre-1994', 'Post-1994']}
        data={[
          ['Russell 2000', '+4.37%', '-0.05%']
        ]}
      />
    </div>
  </Card>
);

const SantaRally = () => (
  <Card>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2 font-serif">The Santa Claus Rally</h3>
        <p className="text-slate-600 dark:text-slate-400">
          A tendency for the market to rise during the last 5 trading days of December and the first 2 of January.
        </p>
        <Verdict makesSense={true} />
      </div>
      <div>
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Why it persists:</h4>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-start">
            <Gift className="w-4 h-4 mr-2 mt-0.5 text-[#BC4128] dark:text-[#E2694A] flex-shrink-0" />
            <p><strong>Holiday Spirit:</strong> General optimism among retail investors.</p>
          </li>
          <li className="flex items-start">
            <Building className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <p><strong>Low Institutional Volume:</strong> &ldquo;The big guys are on vacation,&rdquo; leaving the market to more bullish retail investors.</p>
          </li>
          <li className="flex items-start">
            <TrendingUp className="w-4 h-4 mr-2 mt-0.5 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0" />
            <p><strong>End of Tax Selling:</strong> Selling pressure from tax-loss harvesting subsides.</p>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-8">
      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">The Data: A Robust Anomaly</h4>
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
        Unlike the January Effect, the Santa Claus Rally has remained surprisingly consistent.
        The saying goes, &ldquo;If Santa should fail to call, bears may come to Broad and Wall,&rdquo;
        as failed rallies have sometimes preceded down years.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-100 p-4 rounded-lg">
          <p className="text-2xl font-bold text-sky-600">+1.3%</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Return</p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg">
          <p className="text-2xl font-bold text-sky-600">~79%</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Win Rate</p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg col-span-2 md:col-span-1">
          <p className="text-2xl font-bold text-sky-600">7 Days</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Typical Duration</p>
        </div>
      </div>
    </div>
  </Card>
);

const SeptemberEffect = () => (
  <Card>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2 font-serif">The September Effect</h3>
        <p className="text-slate-600 dark:text-slate-400">
          September has the distinction of being the market&apos;s worst-performing month on average.
          The reputation for &ldquo;August being bearish&rdquo; is a myth; August is typically flat.
        </p>
        <Verdict makesSense={true} />
      </div>
      <div>
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Potential Reasons:</h4>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-start">
            <Building className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <p><strong>Mutual Fund Year-End:</strong> Many funds end their fiscal year on Sep 30, leading to selling of losing positions.</p>
          </li>
          <li className="flex items-start">
            <BrainCircuit className="w-4 h-4 mr-2 mt-0.5 text-sky-500 flex-shrink-0" />
            <p><strong>End of Summer Reassessment:</strong> Investors return from vacation and re-evaluate portfolios, leading to selling.</p>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-8">
      <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">The Data: The Worst Month</h4>
      <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
        September is the only month with a consistently negative average return. However, it&apos;s still positive
        about 45% of the time, making it a poor bet for market timing.
      </p>
      <StyledTable
        headers={['Month', 'Avg. Return (S&P 500)', 'Win Rate']}
        data={[
          ['August', '-0.01%', '~55%'],
          ['September', '-0.72%', '~45%']
        ]}
      />
    </div>
  </Card>
);

const MonthlyPerformance = () => {
  const monthlyData = [
    ['November', '+1.82%', '~68%'],
    ['December', '+1.49%', '~74%'],
    ['April', '+1.46%', '~71%'],
    ['July', '+1.28%', '~56%'],
    ['March', '+1.13%', '~61%'],
    ['January', '+1.07%', '~58%'],
    ['October', '+0.91%', '~61%'],
    ['May', '+0.30%', '~63%'],
    ['June', '+0.11%', '~55%'],
    ['February', '-0.01%', '~55%'],
    ['August', '-0.01%', '~55%'],
    ['September', '-0.72%', '~45%'],
  ];

  return (
    <Card>
      <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2 font-serif">Month-by-Month Performance</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        While certain adages focus on specific periods, looking at the average performance of every month reveals
        the full seasonal picture. This data (based on the S&amp;P 500 since 1950 and sorted by average return)
        highlights the market&apos;s general upward trend and pinpoints which months have historically been strongest and weakest.
      </p>
      <StyledTable
        headers={['Month', 'Avg. Return (S&P 500)', 'Win Rate (% Positive)']}
        data={monthlyData}
      />
      <div className="mt-6 p-4 rounded-lg border flex items-start space-x-4 bg-sky-50 border-sky-200">
        <Info className="w-6 h-6 text-sky-600 flex-shrink-0 mt-1" />
        <div>
          <h4 className="text-lg font-semibold text-sky-800">Key Observation</h4>
          <p className="mt-1 text-sm text-sky-700">
            Note the strength in the fourth quarter (Nov, Dec) and April, versus the clear weakness in September.
            While interesting, these are just averages; any single year can deviate significantly from the historical pattern.
          </p>
        </div>
      </div>
    </Card>
  );
};

const Conclusion = () => (
  <div className="bg-slate-800 text-white">
    <Section title="Conclusion: The Investor's Takeaway" icon={Anchor}>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-slate-900 border border-slate-700">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-400 mr-3" />
            <h3 className="text-xl font-semibold text-white font-serif">The Flaw of Market Timing</h3>
          </div>
          <p className="text-slate-300">
            The single most important conclusion is that attempting to time the market based on calendar patterns
            is a losing proposition. The data overwhelmingly supports that success comes from{' '}
            <strong className="text-sky-400">&ldquo;time in the market, not timing the market.&rdquo;</strong>{' '}
            Missing the market&apos;s best days, which are unpredictable, has a catastrophic impact on long-term wealth.
          </p>
        </Card>

        <Card className="bg-slate-900 border border-slate-700">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C] mr-3" />
            <h3 className="text-xl font-semibold text-white font-serif">A Better Approach</h3>
          </div>
          <p className="text-slate-300">
            Use seasonal awareness to{' '}
            <strong className="text-sky-400">manage emotions and expectations,</strong>{' '}
            not to make buy/sell decisions. Understand that September can be weak to avoid panic selling.
            For tactical investors, consider sector rotation (e.g., cyclicals in winter, defensives in summer)
            rather than exiting the market.
          </p>
        </Card>
      </div>

      <div className="text-center mt-12">
        <p className="text-slate-400">
          Focus on long-term drivers, maintain a long-term horizon, and stay disciplined.
        </p>
      </div>
    </Section>
  </div>
);

export default function SeasonsOfTheMarket() {
  return (
    <ArticleFrame slug="seasons-market-calendar-anomalies-trading-adages">
      <div className="bg-slate-50 dark:bg-[#14171B] font-sans antialiased -mx-4 sm:-mx-6 lg:-mx-8">
        <Section title="The 'Best Six Months' Anomaly" icon={Moon}>
          <SellInMay />
        </Section>

        <div className="bg-slate-100">
          <Section title="Turn-of-the-Year Effects" icon={Gift}>
            <div className="space-y-8">
              <JanuaryEffect />
              <SantaRally />
            </div>
          </Section>
        </div>

        <Section title="The Summer Doldrums" icon={TrendingDown}>
          <SeptemberEffect />
        </Section>

        <div className="bg-slate-100">
          <Section title="A Look at the Full Calendar" icon={BarChart2}>
            <MonthlyPerformance />
          </Section>
        </div>

        <Conclusion />
      </div>
    </ArticleFrame>
  );
}
