'use client';

import { ArrowUpRight, TrendingUp, TrendingDown, Shield, BarChart, CheckCircle, XCircle, Banknote, Landmark, Scale, Briefcase, Users, Gauge, ShoppingCart, University, Eye, FileText, Activity, CreditCard, ArrowLeft, Music } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper component for section titles
const SectionTitle = ({ children }) => (
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight mb-6 sm:mb-10 text-center">
    {children}
  </h2>
);

// Helper component for section subtitles
const SectionSubtitle = ({ children }) => (
  <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10 sm:mb-12">
    {children}
  </p>
);

// Helper component for highlighting text
const Highlight = ({ children, color = 'indigo' }) => {
  const colorClasses = {
    indigo: 'text-indigo-600',
    red: 'text-red-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
  }
  return <span className={`font-semibold ${colorClasses[color]}`}>{children}</span>
}

// Card component for displaying key points and case studies
const InfoCard = ({ icon, title, children, color = 'indigo' }) => {
  const colorClasses = {
    indigo: 'border-indigo-200 bg-indigo-50/50 text-indigo-800',
    red: 'border-red-200 bg-red-50/50 text-red-800',
    green: 'border-green-200 bg-green-50/50 text-green-800',
    yellow: 'border-yellow-200 bg-yellow-50/50 text-yellow-800',
  };

  const iconColorClasses = {
    indigo: 'text-indigo-500',
    red: 'text-red-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
  }

  return (
    <div className={`border ${colorClasses[color]} rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-2 bg-white rounded-lg border border-gray-200`}>
          {React.cloneElement(icon, { className: iconColorClasses[color] })}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-700 space-y-3">
        {children}
      </div>
    </div>
  );
};

// Component for the Hero section
const HeroSection = () => (
  <section className="relative text-center py-20 sm:py-32 overflow-hidden bg-gray-50">
    <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
    <div className="relative container mx-auto px-4">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tighter mb-4">
        The Powell Pivot
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        Navigating Market Crosscurrents After the Fed's Easing Signal of August 22, 2025
      </p>
    </div>
  </section>
);

// Component for Executive Summary
const ExecutiveSummary = () => (
  <section className="py-16 sm:py-24 bg-white">
    <div className="container mx-auto px-4">
      <SectionTitle>Executive Summary</SectionTitle>
      <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg">
        <ul className="text-gray-700 leading-relaxed space-y-4 text-base sm:text-lg list-disc pl-5">
          <li>
            Fed Chair Jerome Powell signaled a <Highlight>dovish pivot</Highlight>, citing a "challenging situation" of a weakening labor market versus inflation that remains above the 2% target.
          </li>
          <li>
            Historical analysis shows a clear split: <Highlight color="green">"Insurance" cuts</Highlight> during healthy expansions (1995, 2019) boosted stocks, while cuts responding to economic decay (2001, 2007) led to <Highlight color="red">severe bear markets</Highlight>.
          </li>
          <li>
            Today's environment is a unique hybrid, combining a preemptive rationale with concerning factors like <Highlight color="yellow">high inflation</Highlight> and <Highlight color="yellow">lofty valuations</Highlight>. While a soft landing is probable, hard landing risks are significant.
          </li>
          <li>
            A <Highlight>cautious, quality-focused</Highlight> investment strategy is essential to navigate the expected increase in market volatility.
          </li>
        </ul>
      </div>
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
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <SectionTitle>The Dovish Turn: Deconstructing the Signal</SectionTitle>
        <SectionSubtitle>
          Chair Powell's speech carefully balanced risks to employment and inflation, concluding that the "shifting balance of risks may warrant adjusting our policy stance" and igniting a broad market rally.
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <InfoCard icon={<Scale />} title="Dual Mandate Dilemma">
            <p>
              Powell framed the pivot as a response to the <Highlight>"shifting balance of risks"</Highlight> toward employment concerns, even with inflation still above target.
            </p>
          </InfoCard>

          <InfoCard icon={<Briefcase />} title="Labor Market's 'Curious Balance'">
            <p>
              The core justification is a fragile equilibrium, with both worker supply and demand slowing. The Fed is acting <Highlight>preemptively</Highlight> to prevent a rapid downturn.
            </p>
          </InfoCard>

          <InfoCard icon={<TrendingDown />} title="Neutralizing Inflation">
            <p>
              To justify a cut with inflation at <Highlight color="yellow">2.7%</Highlight>, Powell attributed price pressures to tariffs, framing them as a <Highlight>"one-time shift"</Highlight> the Fed can ignore.
            </p>
          </InfoCard>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Immediate Market Reaction</h3>
        <div className="overflow-x-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
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
                    <td className={`p-4 font-mono text-right ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </td>
                    <td className="p-4 font-mono text-right text-gray-500" dangerouslySetInnerHTML={{ __html: item.net }}></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      color: 'green',
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
      color: 'red',
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
      color: 'red',
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
      color: 'green',
      points: [
        "A 'mid-cycle adjustment' to insure against trade war risks.",
        "Market responded well, and a soft landing was underway.",
        "Expansion was ended by the exogenous COVID-19 shock.",
      ],
      sp500Return: "+10.0%",
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>A Tale of Two Landings: Historical Precedents</SectionTitle>
        <SectionSubtitle>
          History shows a Fed rate cut is not always bullish. The outcome depends entirely on whether the Fed is preemptively insuring a healthy economy (a "soft landing") or reacting to an unfolding crisis (a "hard landing").
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map(study => (
            <InfoCard key={study.year} icon={study.icon} title={`${study.year}: ${study.title}`} color={study.color}>
              <ul className="list-disc pl-5 space-y-2">
                {study.points.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
              <p className="text-sm font-medium pt-3 mt-3 border-t border-gray-200/50">
                S&P 500 Return (12mo Post-Cut): <span className={`font-bold text-lg ${study.sp500Return.startsWith('+') ? 'text-green-700' : 'text-red-700'}`}>
                  {study.sp500Return}
                </span>
              </p>
            </InfoCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// Component for Comparative Analysis
const ComparativeAnalysis = () => (
  <section className="py-16 sm:py-24 bg-slate-50">
    <div className="container mx-auto px-4">
      <SectionTitle>2025 vs. History: A Precarious Hybrid</SectionTitle>
      <SectionSubtitle>
        The current situation defies a single historical parallel, combining favorable elements of soft landings with concerning attributes of hard landings.
      </SectionSubtitle>

      <div className="grid lg:grid-cols-3 gap-8">
        <InfoCard icon={<TrendingUp />} title="Anomalous Inflation" color="yellow">
          <ul className="list-disc pl-5 space-y-2">
            <li>Unlike past soft landings, core CPI is high at <Highlight color="yellow">3.1%</Highlight>.</li>
            <li>This constrains the Fed's ability to cut aggressively.</li>
            <li>Risks a policy error if price pressures persist.</li>
          </ul>
        </InfoCard>

        <InfoCard icon={<Users />} title="Fragile Labor Market" color="yellow">
          <ul className="list-disc pl-5 space-y-2">
            <li>The "curious balance" of slowing labor supply and demand is unique.</li>
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

  const TrendIcon = ({ trend }) => {
    if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <span className="text-gray-400">-</span>;
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Current Market Landscape: Risks & Opportunities</SectionTitle>
        <SectionSubtitle>
          The market is priced for a near-perfect outcome at a time when the economic dashboard flashes a mix of green, yellow, and red signals.
        </SectionSubtitle>

        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">U.S. Economic Dashboard (Q3 2025)</h3>
        <div className="overflow-x-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
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
      </div>
    </section>
  );
};

// Component for Strategic Outlook
const StrategicOutlook = () => (
  <section className="py-16 sm:py-24 bg-slate-50">
    <div className="container mx-auto px-4">
      <SectionTitle>Strategic Outlook & Recommendations</SectionTitle>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <InfoCard icon={<TrendingUp />} title="Soft Landing Path (60% Probability)" color="green">
          <ul className="list-disc pl-5 space-y-2">
            <li>Fed's "insurance cuts" succeed.</li>
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

      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Key Indicators to Monitor</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center shadow-sm">
          <Briefcase className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
          <h4 className="font-semibold text-gray-800">Labor Market Data</h4>
          <p className="text-sm text-gray-600">Watch for revisions and unemployment upticks (Sahm Rule).</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center shadow-sm">
          <TrendingUp className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
          <h4 className="font-semibold text-gray-800">Inflation Reports</h4>
          <p className="text-sm text-gray-600">Core PCE trajectory will determine the Fed's flexibility.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center shadow-sm">
          <FileText className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
          <h4 className="font-semibold text-gray-800">Earnings Guidance</h4>
          <p className="text-sm text-gray-600">Downward revisions would be a key recessionary signal.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center shadow-sm">
          <CreditCard className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
          <h4 className="font-semibold text-gray-800">Credit Spreads</h4>
          <p className="text-sm text-gray-600">Widening spreads indicate rising financial stress.</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Portfolio Positioning for Uncertainty</h3>
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
          <CheckCircle className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
          <div>
            <strong className="text-gray-800">Emphasize Quality Within Equities:</strong>
            <p className="text-gray-600">
              Focus on companies with <Highlight>strong balance sheets</Highlight>, stable profits, and defensible competitive advantages.
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
          <CheckCircle className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
          <div>
            <strong className="text-gray-800">Increase Fixed Income Exposure:</strong>
            <p className="text-gray-600">
              High-quality bonds offer attractive yields and serve as a <Highlight>crucial portfolio hedge</Highlight> in a hard-landing scenario.
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
          <CheckCircle className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
          <div>
            <strong className="text-gray-800">Prepare for a "Bumpy Ride":</strong>
            <p className="text-gray-600">
              Volatility historically increases around policy pivots. View pullbacks as <Highlight>rebalancing opportunities</Highlight>, not reasons to panic.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Main Page Component
export default function PowellPivotArticle() {
  const currentArticle = articles.find(article => article.slug === 'powell-pivot-navigating-market-crosscurrents-fed-easing-signal');

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

      <main className="bg-white font-sans">
        {/* Return to Home Button */}
        <div className="container mx-auto px-4 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Deep Research
          </span>
        </div>

        <HeroSection />
        <ExecutiveSummary />
        <DovishTurn />
        <HistoricalPrecedents />
        <ComparativeAnalysis />
        <CurrentLandscape />
        <StrategicOutlook />

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Informed on Market Developments</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Navigate the complexities of Fed policy and market dynamics with our deep research analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
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
        </section>

        {/* Educational Disclaimer */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Educational Disclaimer</h3>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    This analysis is for educational and informational purposes only and should not be considered as investment advice. 
                    Market conditions can change rapidly, and past performance does not guarantee future results. Always consult with 
                    qualified financial professionals before making investment decisions and consider your individual risk tolerance and 
                    investment objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            <p className="text-sm mt-2">
              This content is for informational purposes only and does not constitute financial advice.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}