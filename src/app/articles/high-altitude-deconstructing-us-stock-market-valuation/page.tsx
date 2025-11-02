'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart, TrendingUp, DollarSign, Activity, Anchor, Zap, Shield, BookOpen, Scaling, Layers, FileText, Briefcase, Cpu, Recycle, Banknote, Percent, TrendingDown, CheckCircle, AlertTriangle, FileBarChart, Landmark, Database, LineChart, Target, Users } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

/*--- Reusable UI Components ---
These components are designed to be colorful, card-based, and modular.
*/

/**
 * A styled paragraph component.
 */
const P = ({ children, className = "" }) => (
  <p className={`mb-6 text-gray-700 leading-relaxed ${className}`}>
    {children}
  </p>
);

/**
 * A component for bold/emphasized text.
 */
const Em = ({ children }) => (
  <strong className="font-semibold text-gray-900">{children}</strong>
);

/**
 * A component for italic text.
 */
const Italic = ({ children }) => (
  <em className="italic">{children}</em>
);

/**
 * A helper to create a colorful, circular icon background.
 */
const IconWrapper = ({ icon, color = 'indigo' }) => {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };
  
  const colorClasses = colors[color] || colors.indigo;
  
  return (
    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${colorClasses}`}>
      {React.createElement(icon, { className: "h-6 w-6" })}
    </div>
  );
};

/**
 * A styled main section (H2) with a colorful icon.
 */
const Section = ({ title, icon, iconColor, children }) => (
  <section className="mb-12">
    <div className="flex items-center mb-6 pb-3 border-b border-gray-200">
      <IconWrapper icon={icon} color={iconColor} />
      <h2 className="text-3xl font-bold text-gray-900 leading-snug ml-4">{title}</h2>
    </div>
    {children}
  </section>
);

/**
 * A styled sub-section (H3).
 */
const SubSection = ({ title, children, className="" }) => (
  <div className={`mb-8 ${className}`}>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

/**
 * A general-purpose card for holding content.
 */
const InfoCard = ({ children, className = "", accentColor = 'indigo' }) => {
  const colors = {
    indigo: 'border-indigo-500',
    green: 'border-green-500',
    red: 'border-red-500',
  };
  
  const borderColor = colors[accentColor] || colors.indigo;
  
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden border-t-4 ${borderColor} ${className}`}>
      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

/**
 * A colorful card for displaying a single, important statistic.
 */
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-4">
      <IconWrapper icon={icon} color={color} />
      <div>
        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
      </div>
    </div>
  );
};

/**
 * A styled block for displaying equations.
 */
const EquationBlock = ({ children }) => (
  <div className="bg-gray-100 border-l-4 border-indigo-500 p-6 rounded-r-lg my-6 font-mono text-gray-800 text-lg overflow-x-auto">
    {children}
  </div>
);

/**
 * A styled list item with an icon, for use in bulleted lists.
 */
const IconListItem = ({ icon, color, children }) => (
  <li className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">
      {React.createElement(icon, { className: `h-5 w-5 ${color}` })}
    </div>
    <span className="text-gray-700">{children}</span>
  </li>
);

/**
 * A component to render a fully styled table from headers and row data.
 */
const StyledTable = ({ headers, rows }) => (
  <div className="my-6 overflow-x-auto">
    <div className="inline-block min-w-full rounded-lg overflow-hidden border border-gray-200">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-5 py-4 border-b border-gray-200 text-sm">
                  <div className="text-gray-900 whitespace-nowrap">{cell}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/**
 * The main App component (default export for Next.js page)
 */
export default function HighAltitudeMarketAnalysis() {
  // Find the current article
  const currentArticle = articles.find(article => article.slug === 'high-altitude-deconstructing-us-stock-market-valuation');

  // Data for the tables, extracted from the document
  const table1Headers = ['Metric', 'Current Value (Oct 2025)', '5-Year Average', '10-Year Average', 'Historical Assessment'];
  const table1Rows = [
    ['Forward P/E Ratio', '22.7x', '19.9x', '18.6x', 'Overvalued'],
    ['Cyclically Adjusted P/E (CAPE)', '> 40x', '~30x', '~27x', 'Strongly Overvalued'],
    ['Price-to-Sales (P/S) Ratio', '~3.2x', '~2.5x', '~2.2x', 'Strongly Overvalued'],
    ['Buffett Indicator (TMC/GDP)', '> 200%', '~170%', '~150%', 'Strongly Overvalued'],
  ];

  // Data for the new Stat Cards (replaces Table 2)
  const statCardData = [
    { title: 'Fed Funds Rate Target', value: '3.75%-4.00%', icon: Landmark, color: 'blue' },
    { title: '10-Year Treasury Yield', value: '~4.10%', icon: FileBarChart, color: 'purple' },
    { title: '10-Year Real Yield (TIPS)', value: '~1.78%', icon: TrendingUp, color: 'indigo' },
    { title: 'Headline CPI (YoY)', value: '3.0%', icon: Percent, color: 'yellow' },
    { title: 'Core CPI (YoY)', value: '3.0%', icon: Target, color: 'yellow' },
    { title: 'Real GDP Growth (Q2)', value: '3.8%', icon: LineChart, color: 'green' },
    { title: 'Unemployment Rate', value: '4.3%', icon: Users, color: 'red' },
  ];

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

      <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
        {/* Return to Home Button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-20 left-4 z-20">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Deep Research
          </div>
        </div>

        {/* --- Header --- */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Macroeconomic Analysis</h1>
              <span className="text-xl font-light text-gray-400 hidden sm:block">|</span>
              <span className="text-lg font-medium text-gray-600">Late 2025 Report</span>
            </div>
          </nav>
        </header>

        {/* --- Main Content --- */}
        <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Document Title */}
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight text-center">
            High Altitude: Deconstructing the U.S. Stock Market Valuation
          </h1>
          <p className="text-xl text-gray-600 mb-10 border-b pb-10 border-gray-200 text-center max-w-4xl mx-auto">
            An in-depth analysis of U.S. equity valuations and the macroeconomic forces at play in late 2025.
          </p>

          {/* --- Executive Summary --- */}
          <Section title="Executive Summary" icon={BookOpen} iconColor="indigo">
            <P>
              The U.S. stock market, as of late 2025, is trading at valuations that are significantly elevated by most historical standards. This condition is not the result of a single factor but a complex confluence of a newly accommodative monetary policy, a surprisingly resilient domestic economy, persistently high corporate profitability, and massive capital returns to shareholders via buybacks. Major indices like the S&P 500 and Nasdaq have reached record highs, driven by a powerful rally that has left many valuation metrics stretched to levels seen only at prior market peaks.
            </P>
            <P>
              While simple metrics suggest overvaluation, more nuanced models that incorporate the prevailing interest rate environment, such as the Equity Risk Premium (ERP) and the Fed Model, present a more balanced, albeit still precarious, picture. The analysis reveals a market whose valuation is deeply dependent on the current low-for-longer interest rate narrative. The primary drivers supporting current valuations include the Federal Reserve's two interest rate cuts in 2025, strong Q3 corporate earnings, and structurally higher profit margins.
            </P>
            <P>
              This report concludes that the market's valuation, while precarious, is a rational reflection of the current, unique macroeconomic and corporate environment. However, this valuation leaves very little margin for error and is highly sensitive to any change in the underlying conditions—particularly interest rates and inflation.
            </P>
          </Section>

          {/* --- Section 1: Elevated Plateau --- */}
          <Section title="An Elevated Plateau: The State of U.S. Equity Valuations" icon={TrendingUp} iconColor="green">
            <SubSection title="Market Performance at Record Highs">
              <P>
                The performance of U.S. equities throughout 2025 has been exceptionally strong. The benchmark S&P 500 index has climbed to levels around 6,900 points, setting fresh all-time highs. Year-to-date, the index has posted a gain of nearly 20%. Performance in the technology sector has been even more robust, with the Nasdaq Composite surging over 30% during the same period. This powerful and sustained rally has pushed the market well beyond its pre-pandemic peaks and has formed the basis for the current valuation debate.
              </P>
            </SubSection>

            <SubSection title="Valuation Metrics vs. History">
              <P>
                This strong performance has, in turn, stretched valuation multiples far beyond their long-term averages. The forward 12-month P/E ratio for the S&P 500 currently stands at 22.7, substantially above its 5-year average of 19.9 and its 10-year average of 18.6.
              </P>

              <InfoCard className="mt-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  S&P 500 Valuation Metrics vs. Historical Averages (As of Q3 2025)
                </h4>
                <P className="text-sm">
                  Broader and longer-term valuation models paint a stark picture of an expensive market. The CAPE ratio has entered territory only seen before major busts, and the "Buffett Indicator" signals "Strongly Overvalued" conditions.
                </P>
                <StyledTable headers={table1Headers} rows={table1Rows} />
                <P className="text-sm text-gray-500 italic">
                  Sources: Multiple financial data providers and historical analysis
                </P>
              </InfoCard>
            </SubSection>

            <SubSection title="Unprecedented Market Concentration" className="mt-12">
              <P>
                A defining characteristic of the current market is the degree to which its value and performance are concentrated in a small number of mega-cap companies. This phenomenon is critical to understanding the index-level valuation. The movements of a few key stocks now have an outsized influence on the direction of the entire market. For instance, tech giants Amazon and Apple now have a combined market value of approximately $6.4 trillion, accounting for more than 10% of the S&P 500's total weight.
              </P>
              <P>
                This concentration extends to a group often referred to as the "Great 8" (Apple, Amazon, Alphabet, Meta, Microsoft, Netflix, Nvidia, and Tesla). These firms exhibit significantly higher P/E ratios (35.4x) than the remaining 492 companies (21.5x). This extreme concentration creates a divergence between the health and valuation of the <Italic>index</Italic> versus the <Italic>average stock</Italic>.
              </P>
            </SubSection>
          </Section>

          {/* --- Section 2: Macroeconomic Backdrop --- */}
          <Section title="The Macroeconomic Backdrop" icon={Layers} iconColor="blue">
            <P>
              The elevated valuations observed in the U.S. stock market do not exist in a vacuum. They are anchored by a unique and powerful macroeconomic environment characterized by a decisive shift in monetary policy, resilient economic growth, and a complex inflation dynamic.
            </P>

            <SubSection title="Key Macroeconomic Indicators (October 2025)">
              <P>
                This dashboard of key indicators illustrates the complex environment investors are navigating: a dovish Fed, moderate inflation, and surprisingly strong growth.
              </P>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {statCardData.map((stat) => (
                  <StatCard 
                    key={stat.title} 
                    title={stat.title} 
                    value={stat.value} 
                    icon={stat.icon} 
                    color={stat.color} 
                  />
                ))}
              </div>
              <P className="text-sm text-gray-500 italic mt-6">
                Sources: Federal Reserve, Bureau of Labor Statistics, Treasury Department
              </P>
            </SubSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              <InfoCard>
                <SubSection title="Monetary Policy's Accommodative Pivot">
                  <P>
                    The single most significant development of 2025 has been the Federal Reserve's pivot. The FOMC cut its benchmark federal funds rate twice, lowering the target range to 3.75%-4.00%. This easing cycle commenced despite headline inflation remaining above the Fed's 2% target, a clear signal that the central bank's priorities have shifted toward supporting the labor market.
                  </P>
                  <P>
                    This policy pivot is highly unusual and reinforces the concept of a "Fed Put"—the belief that the central bank stands ready to intervene with supportive measures at the first sign of significant economic or market distress.
                  </P>
                </SubSection>
              </InfoCard>

              <InfoCard>
                <SubSection title="Inflation's Double-Edged Sword">
                  <P>
                    The headline CPI registered a 3.0% year-over-year increase in September 2025. This moderate but persistent level of inflation has a dual impact on the market.
                  </P>
                  <P>
                    On one hand, it acts as a tailwind for nominal corporate results, allowing companies to boost nominal revenue and earnings. On the other hand, persistent inflation is the primary risk to the entire valuation structure, as it limits the Federal Reserve's capacity to ease monetary policy further.
                  </P>
                </SubSection>
              </InfoCard>
            </div>
          </Section>

          {/* --- Section 3: Beyond P/E --- */}
          <Section title="Beyond Price-to-Earnings: Valuation Frameworks" icon={Scaling} iconColor="purple">
            <P>
              While traditional metrics like the P/E ratio indicate an expensive market, a more sophisticated analysis requires frameworks that incorporate the prevailing macroeconomic context, particularly the level of interest rates. These models assess value not in absolute terms, but on a relative basis.
            </P>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* --- ERP Card --- */}
              <InfoCard className="lg:col-span-2">
                <SubSection title="The Equity Risk Premium (ERP)">
                  <P>
                    The ERP represents the excess return investors demand for owning equities over risk-free bonds. A low ERP indicates stocks are expensive relative to bonds.
                  </P>
                  <P>
                    As of October 2025, the implied ERP is calculated by subtracting the 10-Year Treasury yield from the S&P 500's forward earnings yield:
                  </P>
                  <EquationBlock>
                    <div>
                      Implied ERP = 4.41% (E/P) - 4.10% (10-Yr) = <Em>0.31%</Em>
                    </div>
                  </EquationBlock>
                  <P>
                    This ERP of just 31 basis points is <Em>extraordinarily low</Em> compared to the historical average of ~5.5%. This suggests that investors are receiving minimal additional compensation for the significant risks associated with stock ownership.
                  </P>
                </SubSection>
              </InfoCard>

              {/* --- Fed Model & Buffett Indicator Cards --- */}
              <div className="space-y-8">
                <InfoCard>
                  <SubSection title="The Fed Model">
                    <P>
                      This model compares the earnings yield (~4.4%) directly to the bond yield (~4.1%). By this logic, stocks are <Em>fairly valued or even slightly attractive</Em>. While academically flawed, this "There Is No Alternative" (TINA) narrative has a powerful psychological grip on the market.
                    </P>
                  </SubSection>
                </InfoCard>

                <InfoCard>
                  <SubSection title="Buffett Indicator">
                    <P>
                      This macro-level metric (Market Cap-to-GDP) ignores interest rates and is flashing a clear <Em>"Strongly Overvalued"</Em> warning, suggesting financial assets have far outpaced the real economy.
                    </P>
                  </SubSection>
                </InfoCard>
              </div>
            </div>
          </Section>

          {/* --- Section 4: Corporate Vigor --- */}
          <Section title="Corporate Vigor: The Micro-Foundations" icon={Zap} iconColor="yellow">
            <P>
              While macroeconomic forces create the environment, the ultimate justification for stock prices lies in the financial health and strategic actions of the underlying companies. This bull market is built on robust profitability and massive capital returns.
            </P>

            <SubSection title="Sustained Profitability: A New Normal?">
              <P>
                S&P 500 companies are operating at a remarkably high net profit margin of 12.8%, above the 12.1% five-year average. This is not just a cyclical peak; research suggests it is driven by durable, structural factors:
              </P>

              {/* --- Profitability Factor Cards --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <InfoCard>
                  <div className="flex justify-center mb-4">
                    <IconWrapper icon={Cpu} color="indigo" />
                  </div>
                  <h4 className="text-lg font-semibold text-center mb-2">Compositional Shift</h4>
                  <P className="text-sm text-center">
                    The S&P 500 has shifted from capital-intensive industrials to asset-light, high-margin tech and healthcare firms.
                  </P>
                </InfoCard>

                <InfoCard>
                  <div className="flex justify-center mb-4">
                    <IconWrapper icon={TrendingDown} color="green" />
                  </div>
                  <h4 className="text-lg font-semibold text-center mb-2">Secular Decline in Taxes</h4>
                  <P className="text-sm text-center">
                    A decades-long trend of falling effective corporate tax rates has allowed companies to retain more pre-tax profits.
                  </P>
                </InfoCard>

                <InfoCard>
                  <div className="flex justify-center mb-4">
                    <IconWrapper icon={Banknote} color="blue" />
                  </div>
                  <h4 className="text-lg font-semibold text-center mb-2">Lower Interest Expenses</h4>
                  <P className="text-sm text-center">
                    A long-term decline in interest rates has reduced the cost of debt, further bolstering net income margins.
                  </P>
                </InfoCard>
              </div>
            </SubSection>

            <SubSection title="The Buyback Bonanza" className="mt-12">
              <InfoCard>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="flex-shrink-0 flex justify-center md:block">
                    <IconWrapper icon={Recycle} color="purple" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3 mt-4 md:mt-0">A Powerful Tailwind for EPS</h4>
                    <P>
                      Announced buybacks are on pace to reach a record <Em>$1.1 trillion in 2025</Em>. These repurchases provide a powerful, direct boost to stock prices by:
                    </P>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Mechanically increasing Earnings Per Share (EPS) by reducing the share count.</li>
                      <li>Providing a steady and significant source of demand for shares in the open market.</li>
                    </ul>
                  </div>
                </div>
              </InfoCard>
            </SubSection>
          </Section>

          {/* --- Section 5: Synthesis & Outlook --- */}
          <Section title="Synthesis and Forward Outlook" icon={Anchor} iconColor="red">
            <P>
              The high valuation of the U.S. stock market in late 2025 is the product of a delicate and complex equilibrium. It is a market suspended between powerful supportive forces and significant, ever-present risks.
            </P>

            <SubSection title="Balancing the Scales: Key Drivers vs. Primary Risks">
              {/* --- Bull vs. Bear Cards --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* --- Bull Card --- */}
                <InfoCard accentColor="green">
                  <div className="flex items-center mb-4">
                    <IconWrapper icon={TrendingUp} color="green" />
                    <h4 className="text-xl font-semibold text-gray-800 ml-3">Supportive Forces (The Bull Case)</h4>
                  </div>
                  <ul className="space-y-4">
                    <IconListItem icon={CheckCircle} color="text-green-600">
                      <Em>Accommodative Monetary Policy:</Em> The Fed's 2025 rate cuts and end of QT have provided a powerful liquidity tailwind.
                    </IconListItem>
                    <IconListItem icon={CheckCircle} color="text-green-600">
                      <Em>Resilient Fundamentals:</Em> A strong economy has averted recession, and structurally high profit margins support earnings.
                    </IconListItem>
                    <IconListItem icon={CheckCircle} color="text-green-600">
                      <Em>Massive Capital Returns:</Em> Trillion-dollar buyback programs provide direct support for EPS and stock prices.
                    </IconListItem>
                    <IconListItem icon={CheckCircle} color="text-green-600">
                      <Em>The TINA Factor:</Em> With bond yields at ~4.1%, the earnings yield on stocks remains competitive, making equities the "only game in town" for many.
                    </IconListItem>
                  </ul>
                </InfoCard>

                {/* --- Bear Card --- */}
                <InfoCard accentColor="red">
                  <div className="flex items-center mb-4">
                    <IconWrapper icon={TrendingDown} color="red" />
                    <h4 className="text-xl font-semibold text-gray-800 ml-3">Primary Risks (The Bear Case)</h4>
                  </div>
                  <ul className="space-y-4">
                    <IconListItem icon={AlertTriangle} color="text-red-600">
                      <Em>Extreme Absolute Valuation:</Em> On measures like CAPE and Market Cap-to-GDP, the market is at historical peaks that preceded poor returns.
                    </IconListItem>
                    <IconListItem icon={AlertTriangle} color="text-red-600">
                      <Em>Compressed Risk Premium:</Em> The 0.31% ERP is at a multi-decade low, offering minimal compensation for taking on equity risk.
                    </IconListItem>
                    <IconListItem icon={AlertTriangle} color="text-red-600">
                      <Em>Persistent Inflation:</Em> Inflation at 3% limits the Fed's ability to ease further and creates the risk of a hawkish reversal.
                    </IconListItem>
                    <IconListItem icon={AlertTriangle} color="text-red-600">
                      <Em>Concentration Risk:</Em> The market's fortunes are disproportionately tied to the performance of a handful of mega-cap stocks.
                    </IconListItem>
                  </ul>
                </InfoCard>
              </div>
            </SubSection>

            <SubSection title="Concluding Analysis: Justified Exuberance or Precarious Peak?" className="mt-12">
              <P>
                The current state of the U.S. stock market is best described not as an irrational bubble, but as a state of <Italic>conditional equilibrium</Italic>. The high valuations are a logical, if not entirely comfortable, response to the existing set of macroeconomic and corporate conditions.
              </P>
              <P>
                This equilibrium, however, is precarious. The market is priced for a near-perfect "soft landing" scenario. It is not priced for a significant economic downturn, which would devastate earnings estimates, nor is it priced for a resurgence of inflation, which would force the Federal Reserve into a hawkish stance. The high altitude of the U.S. stock market is sustained by a very specific set of atmospheric conditions. Any shift in the prevailing winds of monetary policy, inflation, or economic growth could rapidly alter the calculus, demonstrating that while the market's current valuation may be justified, it leaves no room for error.
              </P>
            </SubSection>
          </Section>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue Your Market Analysis Journey</h3>
            <p className="text-lg text-gray-600 mb-6">
              Explore more deep research articles on market dynamics, valuation frameworks, and investment strategies.
            </p>
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              <BarChart className="inline mr-2" />
              Explore More Research
            </Link>
          </div>

          {/* Educational Disclaimer */}
          <div className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Educational Disclaimer:</strong> This analysis is for informational and educational purposes only. 
                  It does not constitute investment advice, and past performance does not guarantee future results. 
                  Always consult with qualified financial professionals before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Deep Research Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6" id="section-deep-research">Deep Research: Academic Foundations & Market Microstructure</h2>
          
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg shadow-sm">
            <h4 className="font-bold text-purple-800 text-xl mb-4 flex items-center">
              <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Deep Research Paper: U.S. Stock Market Valuation Analysis
            </h4>
            <p className="text-lg text-purple-900 mb-4">
              Academic research findings and theoretical models that underpin U.S. equity market valuation, providing institutional-grade insights into macroeconomic drivers, valuation frameworks, and the complex equilibrium between monetary policy, corporate fundamentals, and market pricing.
            </p>
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
              >
                <FileText className="mr-2 h-5 w-5" />
                Access Deep Research Document
              </a>
            )}
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
            <h4 className="font-bold text-yellow-800 text-lg mb-3">Research Disclaimer</h4>
            <p className="text-yellow-900">
              The academic research presented here is for educational purposes and represents ongoing areas of study. Market conditions, regulations, and trading technologies continue to evolve, potentially affecting the applicability of historical research findings.
            </p>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}