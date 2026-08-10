'use client';

import { ArrowUpRight, TrendingUp, TrendingDown, BarChart, CheckCircle, XCircle, Scale, Briefcase, Users, FileText, CreditCard } from 'lucide-react';
import React from 'react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Helper component for section titles
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight mb-6 sm:mb-10 text-center font-serif">
    {children}
  </h2>
);

// Helper component for section subtitles
const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10 sm:mb-12">
    {children}
  </p>
);

// Helper component for highlighting text
const Highlight = ({ children, color = 'indigo' }: { children: React.ReactNode; color?: 'indigo' | 'red' | 'green' | 'yellow' }) => {
  const colorClasses: Record<string, string> = {
    indigo: 'text-[#A8672E] dark:text-[#D08F52]',
    red: 'text-[#BC4128] dark:text-[#E2694A]',
    green: 'text-[#1D8A70] dark:text-[#3CBF9C]',
    yellow: 'text-yellow-600',
  }
  return <span className={`font-semibold ${colorClasses[color]}`}>{children}</span>
}

// Card component for displaying key points and case studies
const InfoCard = ({ icon, title, children, color = 'indigo' }: { icon: React.ReactElement; title: string; children: React.ReactNode; color?: 'indigo' | 'red' | 'green' | 'yellow' }) => {
  const colorClasses: Record<string, string> = {
    indigo: 'border-indigo-200 bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 text-indigo-800',
    red: 'border-red-200 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 text-red-800',
    green: 'border-green-200 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/50 text-green-800',
    yellow: 'border-yellow-200 bg-yellow-50/50 text-yellow-800',
  };

  const iconColorClasses: Record<string, string> = {
    indigo: 'text-[#A8672E] dark:text-[#D08F52]',
    red: 'text-[#BC4128] dark:text-[#E2694A]',
    green: 'text-[#1D8A70] dark:text-[#3CBF9C]',
    yellow: 'text-yellow-500',
  }

  return (
    <div className={`border ${colorClasses[color]} rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-2 bg-white dark:bg-[#0A0D14] rounded-lg border border-gray-200`}>
          {React.cloneElement(icon, { className: iconColorClasses[color] } as { className: string })}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 font-serif">{title}</h3>
      </div>
      <div className="text-gray-700 space-y-3">
        {children}
      </div>
    </div>
  );
};

// Component for Executive Summary
const ExecutiveSummary = () => (
  <section className="mb-16">
    <SectionTitle>Executive Summary</SectionTitle>
    <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-[#14171B] rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
      <ul className="text-gray-700 leading-relaxed space-y-4 text-base sm:text-lg list-disc pl-5">
        <li>
          Fed Chair Jerome Powell signaled a <Highlight>dovish pivot</Highlight>, citing a &ldquo;challenging situation&rdquo; of a weakening labor market versus inflation that remains above the 2% target.
        </li>
        <li>
          Historical analysis shows a clear split: <Highlight color="green">&ldquo;Insurance&rdquo; cuts</Highlight> during healthy expansions (1995, 2019) boosted stocks, while cuts responding to economic decay (2001, 2007) led to <Highlight color="red">severe bear markets</Highlight>.
        </li>
        <li>
          Today&apos;s environment is a unique hybrid, combining a preemptive rationale with concerning factors like <Highlight color="yellow">high inflation</Highlight> and <Highlight color="yellow">lofty valuations</Highlight>. While a soft landing is probable, hard landing risks are significant.
        </li>
        <li>
          A <Highlight>cautious, quality-focused</Highlight> investment strategy is essential to navigate the expected increase in market volatility.
        </li>
      </ul>
    </div>
  </section>
);

// Component for The Dovish Turn section
const DovishTurn = () => {
  const marketReactionData = [
    { asset: 'S&P 500', change: '+1.57%', net: '+99.91' },
    { asset: 'Dow Jones', change: '+1.89%', net: '+846.74' },
    { asset: 'Nasdaq Composite', change: '+1.88%', net: '+396.54' },
    { asset: '2-Year Treasury Yield', change: '-2.64%', net: '-0.10%' },
    { asset: '10-Year Treasury Yield', change: '-1.62%', net: '-0.07%' },
    { asset: 'Sept. Cut Probability', change: '+16%', net: '75% &rarr; 91%' },
  ];

  return (
    <section className="mb-16">
      <SectionTitle>The Dovish Turn: Deconstructing the Signal</SectionTitle>
      <SectionSubtitle>
        Chair Powell&apos;s speech carefully balanced risks to employment and inflation, concluding that the &ldquo;shifting balance of risks may warrant adjusting our policy stance&rdquo; and igniting a broad market rally.
      </SectionSubtitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <InfoCard icon={<Scale />} title="Dual Mandate Dilemma">
          <p>
            Powell framed the pivot as a response to the <Highlight>&ldquo;shifting balance of risks&rdquo;</Highlight> toward employment concerns, even with inflation still above target.
          </p>
        </InfoCard>

        <InfoCard icon={<Briefcase />} title="Labor Market's 'Curious Balance'">
          <p>
            The core justification is a fragile equilibrium, with both worker supply and demand slowing. The Fed is acting <Highlight>preemptively</Highlight> to prevent a rapid downturn.
          </p>
        </InfoCard>

        <InfoCard icon={<TrendingDown />} title="Neutralizing Inflation">
          <p>
            To justify a cut with inflation at <Highlight color="yellow">2.7%</Highlight>, Powell attributed price pressures to tariffs, framing them as a <Highlight>&ldquo;one-time shift&rdquo;</Highlight> the Fed can ignore.
          </p>
        </InfoCard>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 font-serif">Immediate Market Reaction</h3>
      <div className="overflow-x-auto">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0A0D14] rounded-lg border border-gray-200 shadow-md">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Asset Class</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Percent Change</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Net Change</th>
              </tr>
            </thead>
            <tbody>
              {marketReactionData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-none hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{item.asset}</td>
                  <td className={`p-4 font-mono text-right ${item.change.startsWith('+') ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A]'}`}>
                    {item.change}
                  </td>
                  <td className="p-4 font-mono text-right text-gray-500" dangerouslySetInnerHTML={{ __html: item.net }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// Component for Historical Precedents
const HistoricalPrecedents = () => {
  const caseStudies = [
    {
      year: 1995,
      title: "The 'Soft Landing'",
      icon: <CheckCircle />,
      color: 'green' as const,
      points: [
        "Fed's 'insurance cuts' into a healthy economy.",
        "Prolonged the expansion and fueled the dot-com boom.",
        "S&P 500 gained a spectacular 34.1% in 1995.",
      ],
      sp500Return: "+19.0%",
    },
    {
      year: 2001,
      title: "Post-Bubble Plunge",
      icon: <XCircle />,
      color: 'red' as const,
      points: [
        "Rate cuts were a reaction to the bursting dot-com bubble.",
        "The initial rally was a bull trap.",
        "Monetary policy couldn't fix the underlying economic decay.",
      ],
      sp500Return: "-14.0%",
    },
    {
      year: 2007,
      title: "Pre-Crisis Harbinger",
      icon: <XCircle />,
      color: 'red' as const,
      points: [
        "Cuts began as the subprime crisis emerged.",
        "Market rallied to an all-time high in a deceptive bull trap.",
        "Preceded the Great Financial Crisis and a 57% collapse.",
      ],
      sp500Return: "-21.0%",
    },
    {
      year: 2019,
      title: "Pre-Pandemic Pivot",
      icon: <CheckCircle />,
      color: 'green' as const,
      points: [
        "A 'mid-cycle adjustment' to insure against trade war risks.",
        "Market responded well, and a soft landing was underway.",
        "Expansion was ended by the exogenous COVID-19 shock.",
      ],
      sp500Return: "+10.0%",
    }
  ];

  return (
    <section className="mb-16">
      <SectionTitle>A Tale of Two Landings: Historical Precedents</SectionTitle>
      <SectionSubtitle>
        History shows a Fed rate cut is not always bullish. The outcome depends entirely on whether the Fed is preemptively insuring a healthy economy (a &ldquo;soft landing&rdquo;) or reacting to an unfolding crisis (a &ldquo;hard landing&rdquo;).
      </SectionSubtitle>

      <div className="grid md:grid-cols-2 gap-8">
        {caseStudies.map(study => (
          <InfoCard key={study.year} icon={study.icon} title={`${study.year}: ${study.title}`} color={study.color}>
            <ul className="list-disc pl-5 space-y-2">
              {study.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
            <p className="text-sm font-medium pt-3 mt-3 border-t border-gray-200/50">
              S&P 500 Return (12mo Post-Cut): <span className={`font-bold text-lg ${study.sp500Return.startsWith('+') ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A]'}`}>
                {study.sp500Return}
              </span>
            </p>
          </InfoCard>
        ))}
      </div>
    </section>
  );
};

// Component for Comparative Analysis
const ComparativeAnalysis = () => (
  <section className="mb-16">
    <SectionTitle>2025 vs. History: A Precarious Hybrid</SectionTitle>
    <SectionSubtitle>
      The current situation defies a single historical parallel, combining favorable elements of soft landings with concerning attributes of hard landings.
    </SectionSubtitle>

    <div className="grid lg:grid-cols-3 gap-8">
      <InfoCard icon={<TrendingUp />} title="Anomalous Inflation" color="yellow">
        <ul className="list-disc pl-5 space-y-2">
          <li>Unlike past soft landings, core CPI is high at <Highlight color="yellow">3.1%</Highlight>.</li>
          <li>This constrains the Fed&apos;s ability to cut aggressively.</li>
          <li>Risks a policy error if price pressures persist.</li>
        </ul>
      </InfoCard>

      <InfoCard icon={<Users />} title="Fragile Labor Market" color="yellow">
        <ul className="list-disc pl-5 space-y-2">
          <li>The &ldquo;curious balance&rdquo; of slowing labor supply and demand is unique.</li>
          <li>The low <Highlight color="yellow">4.2%</Highlight> unemployment rate provides a buffer.</li>
          <li>Sharp slowdown in payrolls points to fragility.</li>
        </ul>
      </InfoCard>

      <InfoCard icon={<BarChart />} title="Lofty Valuations" color="yellow">
        <ul className="list-disc pl-5 space-y-2">
          <li>Markets are near all-time highs.</li>
          <li>The 10-year P/E ratio is <Highlight color="yellow">37.1</Highlight>, 80.9% above its average.</li>
          <li>Suggests a perfect soft landing is already priced in.</li>
        </ul>
      </InfoCard>
    </div>
  </section>
);

// Component for Current Market Landscape
const CurrentLandscape = () => {
  const dashboardData = [
    { indicator: 'Real GDP Growth', value: '3.0% (Q2)', trend: 'up', note: 'Rebound suggests resilience, but H1 average shows slowdown.' },
    { indicator: 'Unemployment Rate', value: '4.2% (July)', trend: 'up', note: 'Still low, but recent uptick is a key Fed concern.' },
    { indicator: 'Headline CPI (YoY)', value: '2.7% (July)', trend: 'stable', note: 'Well off peaks but sticky, complicating easing.' },
    { indicator: 'Core CPI (YoY)', value: '3.1% (July)', trend: 'up', note: 'Uptick in core is a primary concern for the Fed.' },
    { indicator: 'Consumer Sentiment', value: '58.6 (Aug)', trend: 'down', note: 'Deteriorating sentiment could weigh on future spending.' },
  ];

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A]" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" />;
    return <span className="text-gray-400">-</span>;
  };

  return (
    <section className="mb-16">
      <SectionTitle>Current Market Landscape: Risks & Opportunities</SectionTitle>
      <SectionSubtitle>
        The market is priced for a near-perfect outcome at a time when the economic dashboard flashes a mix of green, yellow, and red signals.
      </SectionSubtitle>

      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 font-serif">U.S. Economic Dashboard (Q3 2025)</h3>
      <div className="overflow-x-auto">
        <div className="max-w-5xl mx-auto bg-white dark:bg-[#0A0D14] rounded-lg border border-gray-200 shadow-md">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Indicator</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Latest Reading</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Implication</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-none hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{item.indicator}</td>
                  <td className="p-4 font-mono text-gray-700 flex items-center gap-2">
                    {item.value} <TrendIcon trend={item.trend} />
                  </td>
                  <td className="p-4 text-sm text-gray-600 max-w-sm">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// Component for Strategic Outlook
const StrategicOutlook = () => (
  <section>
    <SectionTitle>Strategic Outlook & Recommendations</SectionTitle>

    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      <InfoCard icon={<TrendingUp />} title="Soft Landing Path (60% Probability)" color="green">
        <ul className="list-disc pl-5 space-y-2">
          <li>Fed&apos;s &ldquo;insurance cuts&rdquo; succeed.</li>
          <li>Labor market stabilizes, inflation cools.</li>
          <li>Earnings growth remains positive.</li>
          <li>Market avoids a bear market and <Highlight color="green">grinds higher</Highlight>.</li>
        </ul>
      </InfoCard>

      <InfoCard icon={<TrendingDown />} title="Hard Landing Path (40% Probability)" color="red">
        <ul className="list-disc pl-5 space-y-2">
          <li>Fed is too late; layoffs accelerate into a recession.</li>
          <li>Cascade of negative earnings revisions.</li>
          <li>Elevated valuations become unsustainable.</li>
          <li>Leads to a significant <Highlight color="red">market correction (20%+)</Highlight>.</li>
        </ul>
      </InfoCard>
    </div>

    <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 font-serif">Key Indicators to Monitor</h3>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
      <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-gray-200 text-center shadow-sm">
        <Briefcase className="mx-auto h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-2" />
        <h4 className="font-semibold text-gray-800">Labor Market Data</h4>
        <p className="text-sm text-gray-600">Watch for revisions and unemployment upticks (Sahm Rule).</p>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-gray-200 text-center shadow-sm">
        <TrendingUp className="mx-auto h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-2" />
        <h4 className="font-semibold text-gray-800">Inflation Reports</h4>
        <p className="text-sm text-gray-600">Core PCE trajectory will determine the Fed&apos;s flexibility.</p>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-gray-200 text-center shadow-sm">
        <FileText className="mx-auto h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-2" />
        <h4 className="font-semibold text-gray-800">Earnings Guidance</h4>
        <p className="text-sm text-gray-600">Downward revisions would be a key recessionary signal.</p>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-gray-200 text-center shadow-sm">
        <CreditCard className="mx-auto h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-2" />
        <h4 className="font-semibold text-gray-800">Credit Spreads</h4>
        <p className="text-sm text-gray-600">Widening spreads indicate rising financial stress.</p>
      </div>
    </div>

    <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 font-serif">Portfolio Positioning for Uncertainty</h3>
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="bg-white dark:bg-[#0A0D14] border border-gray-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
        <CheckCircle className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0 mt-1" />
        <div>
          <strong className="text-gray-800">Emphasize Quality Within Equities:</strong>
          <p className="text-gray-600">
            Focus on companies with <Highlight>strong balance sheets</Highlight>, stable profits, and defensible competitive advantages.
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] border border-gray-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
        <CheckCircle className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0 mt-1" />
        <div>
          <strong className="text-gray-800">Increase Fixed Income Exposure:</strong>
          <p className="text-gray-600">
            High-quality bonds offer attractive yields and serve as a <Highlight>crucial portfolio hedge</Highlight> in a hard-landing scenario.
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] border border-gray-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
        <CheckCircle className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0 mt-1" />
        <div>
          <strong className="text-gray-800">Prepare for a &ldquo;Bumpy Ride&rdquo;:</strong>
          <p className="text-gray-600">
            Volatility historically increases around policy pivots. View pullbacks as <Highlight>rebalancing opportunities</Highlight>, not reasons to panic.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Main Page Component
export default function PowellPivotArticle() {
  return (
    <ArticleFrame
      slug="powell-pivot-navigating-market-crosscurrents-fed-easing-signal"
      additionalDisclaimer="Market conditions can change rapidly, and past performance does not guarantee future results."
    >
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mb-12">
          Navigating Market Crosscurrents After the Fed&apos;s Easing Signal of August 22, 2025.
        </p>

        <ExecutiveSummary />
        <DovishTurn />
        <HistoricalPrecedents />
        <ComparativeAnalysis />
        <CurrentLandscape />
        <StrategicOutlook />
      </div>
    </ArticleFrame>
  );
}
