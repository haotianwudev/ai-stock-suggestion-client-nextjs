'use client';

import React from 'react';
import {
  LineChart,
  TrendingUp,
  AlertCircle,
  Target,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Activity,
  Lightbulb,
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

const economicData = [
  { indicator: 'Real GDP Growth (%)', q2prev: '2.1', q2new: '2.1', q3new: '2.2', q4new: '1.6', q1new: '1.9' },
  { indicator: 'Unemployment Rate (%)', q2prev: '4.5', q2new: '4.4', q3new: '4.5', q4new: '4.5', q1new: '4.5' },
  { indicator: 'Payrolls (000s/month)', q2prev: '67.1', q2new: '68.9', q3new: '61.2', q4new: '58.4', q1new: '64.0' },
];

const yieldData = [
  { maturity: '1-Month Treasury', yield: '3.73', m1change: '0.02', y1change: '-0.67', histAvg: '1.71' },
  { maturity: '3-Month Treasury', yield: '3.83', m1change: '-0.04', y1change: '-0.57', histAvg: '2.81' },
  { maturity: '2-Year Treasury', yield: '4.29', m1change: '0.19', y1change: '0.47', histAvg: '3.43' },
  { maturity: '5-Year Treasury', yield: '4.37', m1change: '0.23', y1change: '0.47', histAvg: '3.76' },
  { maturity: '10-Year Treasury', yield: '4.67', m1change: '0.29', y1change: '0.33', histAvg: '4.25' },
  { maturity: '30-Year Treasury', yield: '5.20', m1change: '0.34', y1change: '0.34', histAvg: '4.74' },
  { maturity: '10-Year minus 2-Year Spread', yield: '0.38', m1change: '0.10', y1change: '-0.14', histAvg: '0.82', isBold: true },
];

const termPremiumData = [
  { model: 'ACM (NY Fed)', startYear: '1961', survey: 'No', expRate5to10: '4.34%', implied10y: '0.46%' },
  { model: 'CR (SF Fed)', startYear: '1987', survey: 'No', expRate5to10: '3.18%', implied10y: '1.37%' },
  { model: 'KW (Fed Board)', startYear: '1987', survey: 'Yes', expRate5to10: '4.48%', implied10y: '0.39%' },
  { model: 'Blue Chip Survey', startYear: 'N/A', survey: 'Yes', expRate5to10: '2.65%', implied10y: '2.00%' },
];

const creditData = [
  { tier: 'US Corporate AAA', yield: '5.28', oas: 'N/A', y1change: '0.41' },
  { tier: 'US Corporate BBB', yield: '5.56', oas: '95', y1change: '0.29' },
  { tier: 'US High Yield BB', yield: '6.07', oas: '~200', y1change: '0.43' },
  { tier: 'US High Yield (Aggregate)', yield: '7.26', oas: '284', y1change: '0.41' },
  { tier: 'US High Yield CCC', yield: '14.31', oas: 'N/A', y1change: '2.08' },
];

const technicalData = [
  { condition: 'Price > 200-DMA', interpretation: 'Long-term Uptrend', return: '~ +14.0%' },
  { condition: 'Price < 200-DMA', interpretation: 'Long-term Downtrend', return: '~ -6.0%' },
  { condition: '50-DMA crosses above 200-DMA', interpretation: 'Golden Cross (Bullish Reversal)', return: 'Highly Positive' },
  { condition: '50-DMA crosses below 200-DMA', interpretation: 'Death Cross (Bearish Reversal)', return: 'Highly Negative' },
];

const TutorialCallout = ({ title, children, color = 'blue' }: { title: string; children: React.ReactNode; color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    rose: 'bg-rose-50 border-rose-200 text-rose-900',
  };
  const iconColorMap: Record<string, string> = {
    blue: 'text-blue-500',
    green: 'text-emerald-500',
    purple: 'text-purple-500',
    amber: 'text-amber-500',
    rose: 'text-rose-500',
  };

  return (
    <div className={`my-6 p-6 rounded-2xl border ${colorMap[color]} shadow-sm flex flex-col md:flex-row gap-4 items-start`}>
      <div className={`p-3 rounded-full bg-white shadow-sm shrink-0 ${iconColorMap[color]}`}>
        <Lightbulb size={24} />
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">{title}</h4>
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, gradient, subtitle }: {
  icon: React.ElementType;
  title: string;
  gradient: string;
  subtitle?: string;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-4 mb-3">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
        <Icon size={32} />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-500 text-lg font-medium pl-[72px]">{subtitle}</p>}
  </div>
);

export default function QuantitativeAssessmentFixedIncomeArticle() {
  return (
    <ArticleFrame slug="quantitative-assessment-fixed-income-market-turning-points">
      <div className="space-y-16">

        {/* Section 1: Introduction and Macroeconomic Context */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <SectionHeader
            icon={BookOpen}
            title="Introduction and Macroeconomic Context"
            subtitle="Evaluating the stall speed of the economy and sticky inflation."
            gradient="from-blue-500 to-cyan-500"
          />

          <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed space-y-6">
            <p>
              The global fixed-income market has traversed one of the most protracted and punishing bear markets in modern financial history. Driven by a post-pandemic inflationary shock, aggressive central bank tightening, and structural shifts in global supply chains, bond investors have endured unprecedented drawdowns.
            </p>
            <p>
              As of the third quarter of 2026, the macroeconomic environment is exhibiting classic late-cycle characteristics. Economic growth is decelerating to a stall speed, inflation has retreated from its peak (albeit remaining somewhat sticky), and the monetary policy reaction function has transitioned from aggressive tightening to a contentious, hawkish pause.
            </p>

            <TutorialCallout title="Tutorial Note: What is a Hawkish Pause?" color="blue">
              In monetary policy, a <strong>hawk</strong> favors higher interest rates to fight inflation, while a <strong>dove</strong> favors lower rates to stimulate growth. A <em>hawkish pause</em> means the central bank has stopped raising rates for now, but explicitly threatens to raise them again if inflation persists, effectively keeping financial conditions tight.
            </TutorialCallout>

            <p>
              The domestic macroeconomic backdrop in July 2026 presents a highly nuanced picture of an economy that is stalling, yet not entirely contracting. Real GDP increased at an annualized rate of 1.5 percent in Q2 2026, a marked deceleration from 2.1 percent in Q1. Concurrently, the labor market is displaying subtle signs of fatigue.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 mt-8">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Economic Indicator</th>
                    <th className="p-4">2026:Q2 (Prev)</th>
                    <th className="p-4">2026:Q2 (New)</th>
                    <th className="p-4">2026:Q3 (New)</th>
                    <th className="p-4">2026:Q4 (New)</th>
                    <th className="p-4">2027:Q1 (New)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {economicData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">{row.indicator}</td>
                      <td className="p-4">{row.q2prev}</td>
                      <td className="p-4 font-semibold text-blue-600">{row.q2new}</td>
                      <td className="p-4">{row.q3new}</td>
                      <td className="p-4">{row.q4new}</td>
                      <td className="p-4">{row.q1new}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-slate-50 p-3 text-xs text-slate-500 text-center">
                Source: Federal Reserve Bank of Philadelphia, Survey of Professional Forecasters, July 2026.
              </div>
            </div>

            <p className="mt-6">
              While growth is stalling, inflation remains a persistent friction point. The Personal Consumption Expenditures (PCE) price index rose 3.7 percent year-over-year in June 2026. This dichotomy&mdash;a stalling real economy coupled with sticky inflation&mdash;has forced the Federal Reserve into a complex holding pattern (target range 3.50 to 3.75 percent).
            </p>
          </div>
        </section>

        {/* Infographic placed after macro intro, before Yield Curve section */}
        <InfographicSlot src="https://i.imgur.com/UcGCi44.png" alt="Fixed-Income Market Analysis Infographic" />

        {/* Section 2: Yield Curve Dynamics */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50 -z-10" />
          <SectionHeader
            icon={TrendingUp}
            title="Yield Curve Dynamics: The Anatomy of a Steepening"
            subtitle="Diagnosing turning points through the term structure of interest rates."
            gradient="from-purple-500 to-pink-500"
          />

          <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed space-y-6">
            <p>
              The term structure of interest rates is arguably the most powerful quantitative mechanism for diagnosing turning points in the fixed-income market. Historically, the transition from a bear market to a bull market in bonds is signaled not merely by the absolute level of yields, but by the changing shape of the yield curve. As of late July 2026, the yield curve has begun to dis-invert and steepen.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 my-8 shadow-sm">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-purple-50 text-purple-900 font-semibold border-b border-purple-100">
                  <tr>
                    <th className="p-4">Treasury Maturity</th>
                    <th className="p-4">Current Yield (%)</th>
                    <th className="p-4">1-Month Change (%)</th>
                    <th className="p-4">1-Year Change (%)</th>
                    <th className="p-4">Historical Average (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yieldData.map((row, i) => (
                    <tr key={i} className={`hover:bg-slate-50 transition-colors ${row.isBold ? 'bg-purple-50/30 font-bold text-purple-900' : ''}`}>
                      <td className="p-4">{row.maturity}</td>
                      <td className="p-4">{row.yield}</td>
                      <td className={`p-4 ${parseFloat(row.m1change) > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{row.m1change}</td>
                      <td className={`p-4 ${parseFloat(row.y1change) > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{row.y1change}</td>
                      <td className="p-4">{row.histAvg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <TutorialCallout title="Tutorial Note: Bull Steepening vs. Bear Steepening" color="purple">
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Bull Steepening:</strong> Short-term rates fall faster than long-term rates (usually because the Fed cuts rates to save a dying economy). This is <em>great</em> for bond prices (Bull market).</li>
                <li><strong>Bear Steepening:</strong> Long-term rates rise faster than short-term rates (usually due to inflation fears or too much debt supply). This is <em>hostile</em> for long-term bond holders (Bear market).</li>
              </ul>
            </TutorialCallout>

            <p>
              The quantitative data from mid-2026 presents a highly atypical scenario. As the economy has decelerated, the market has experienced a <strong>bear steepening</strong> rather than the textbook bull steepening that typically precedes a recessionary pivot. Out of the past 11 business cycles, 10 followed the typical pre-recession curve pattern of a bear flattening leading directly to a bull steepening.
            </p>
            <p>
              The current persistence of a bear steepening implies that while the peak in short-term rates may have been achieved, the long end of the curve is still undergoing aggressive price discovery.
            </p>
          </div>
        </section>

        {/* Section 3: Term Premium */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <SectionHeader
            icon={BarChart3}
            title="The Term Premium"
            subtitle="Decomposing Long-Term Interest Rate Risk."
            gradient="from-emerald-500 to-teal-500"
          />

          <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed space-y-6">
            <p>
              The analytical framework for understanding curve movement relies heavily on the decomposition of the long-term yield into its constituent parts. The yield on an n-period bond can be mathematically expressed as:
            </p>

            <MathBlock math="y_t^{(n)} = \frac{1}{n} \sum_{i=0}^{n-1} \mathbb{E}_t[r_{t+i}] + TP_t^{(n)}" />

            <TutorialCallout title="Tutorial Note: Breaking Down the Formula" color="green">
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong><InlineMath math="y_t^{(n)}" />:</strong> The current yield of a long-term bond (e.g., 10-year Treasury).</li>
                <li><strong><InlineMath math="\mathbb{E}_t[r_{t+i}]" />:</strong> The market&apos;s expectation of future short-term interest rates.</li>
                <li><strong><InlineMath math="TP_t^{(n)}" /> (Term Premium):</strong> The extra compensation investors demand for locking up their money long-term instead of rolling over short-term bills.</li>
              </ul>
              <p className="mt-2 text-sm italic">If expectations for short rates are flat, any rise in long-term yields is driven by the Term Premium expanding.</p>
            </TutorialCallout>

            <p>
              Because the term premium is a theoretical construct, macroeconomists rely on term structure models to extract it. Throughout the era of zero-interest-rate policy (ZIRP), the term premium was frequently negative. However, metrics for 2026 confirm a profound regime shift. The ACM 10-year Treasury term premium transitioned firmly into positive territory, expanding to approximately 0.83 percent by late July 2026.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 my-8">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-emerald-50 text-emerald-900 font-semibold border-b border-emerald-100">
                  <tr>
                    <th className="p-4">Model / Survey Name</th>
                    <th className="p-4">Sample Start</th>
                    <th className="p-4">Survey Data?</th>
                    <th className="p-4">Exp. Rate (5&ndash;10 Yrs)</th>
                    <th className="p-4">Implied 10-Year TP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {termPremiumData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{row.model}</td>
                      <td className="p-4">{row.startYear}</td>
                      <td className="p-4">{row.survey}</td>
                      <td className="p-4">{row.expRate5to10}</td>
                      <td className="p-4 font-bold text-emerald-600">{row.implied10y}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              The U.S. fiscal deficit and the corresponding surge in Treasury supply have overwhelmed the market&apos;s natural absorption capacity. Furthermore, quantitative tightening (QT) has forced the private sector to absorb a higher concentration of long-duration bonds. From a strategic standpoint, a positive term premium restores the natural yield advantage of holding duration.
            </p>
          </div>
        </section>

        {/* Section 4: Neutral Rate r* */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
          <SectionHeader
            icon={Target}
            title="The Neutral Rate of Interest (r*)"
            subtitle="Understanding the new equilibrium for monetary policy."
            gradient="from-amber-400 to-orange-500"
          />

          <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed space-y-6">
            <p>
              Another quantitative pillar necessary to determine if the market has reached a turning point is the estimation of the natural rate of interest, commonly referred to as <strong>r* (r-star)</strong>.
            </p>

            <TutorialCallout title="Tutorial Note: What is r*?" color="amber">
              <strong>r*</strong> is the &ldquo;Goldilocks&rdquo; interest rate&mdash;the theoretical rate where the economy operates at full potential without overheating (inflation) or freezing up (recession). It is the anchor for where central bank rates should eventually settle in the long run.
            </TutorialCallout>

            <p>
              During the previous decade, r* was widely estimated to be near zero in real terms, implying a nominal neutral rate of approximately 2.0 to 2.5 percent. However, structural economic changes suggest r* has drifted significantly higher. The massive capital expenditure required for AI infrastructure, supply chain reconfiguration, and structural fiscal deficits have fundamentally altered capital demand.
            </p>
            <p>
              If the real neutral rate has risen to 1.0 or 1.5 percent, the nominal neutral rate would sit between 3.0 and 4.0 percent. This explains why the U.S. economy managed to expand at 1.5% in Q2 2026 despite &ldquo;high&rdquo; rates&mdash;the rates were not actually that restrictive compared to the new r*.
            </p>
            <p className="font-semibold text-slate-900 border-l-4 border-amber-500 pl-4 py-2 bg-amber-50/50 rounded-r-lg">
              Quantitative Implication: Investors waiting for the 10-year Treasury yield to plummet back to the 1.5 to 2.0 percent levels seen in the prior decade are ignoring the upward shift in the macroeconomic equilibrium.
            </p>
          </div>
        </section>

        {/* Section 5: Credit Risk: The OAS Anomaly */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <SectionHeader
            icon={AlertCircle}
            title="Credit Risk: The OAS Anomaly"
            subtitle="Divergence between stalling macro data and corporate valuations."
            gradient="from-rose-500 to-red-600"
          />

          <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed space-y-6">
            <p>
              To confirm a true macroeconomic turning point that favors safe-haven fixed income, quantitative strategists look for confirmation in the credit markets. Specifically, a stalling economy should trigger a widening of credit spreads as the probability of corporate defaults rises.
            </p>
            <p>
              The ICE BofA US High Yield Index <strong>Option-Adjusted Spread (OAS)</strong> is the premier metric for real-time pricing of corporate default and liquidity risk.
            </p>

            <TutorialCallout title="Tutorial Note: Option-Adjusted Spread (OAS)" color="rose">
              Think of OAS as the &ldquo;danger premium.&rdquo; It&apos;s the extra yield you get for buying a risky corporate bond instead of a super-safe U.S. Treasury, adjusted for embedded options.
              <br /><br />
              <strong>Low OAS (&lt; 300 bps):</strong> Market thinks everything is fine. High complacency.<br />
              <strong>High OAS (&gt; 600 bps):</strong> Panic. Market expects mass bankruptcies.
            </TutorialCallout>

            <div className="overflow-x-auto rounded-xl border border-slate-200 my-8">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-rose-50 text-rose-900 font-semibold border-b border-rose-100">
                  <tr>
                    <th className="p-4">Corporate Credit Tier</th>
                    <th className="p-4">Effective Yield (%)</th>
                    <th className="p-4">Option-Adjusted Spread (bps)</th>
                    <th className="p-4">1-Year Change in Yield (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {creditData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">{row.tier}</td>
                      <td className="p-4">{row.yield}</td>
                      <td className="p-4 font-bold text-rose-600">{row.oas}</td>
                      <td className="p-4">{row.y1change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              As of late July 2026, the ICE BofA US High Yield OAS registered an incredibly tight 2.84 percent (284 basis points). This represents one of the lowest spread levels in recent history. The credit market is explicitly rejecting the thesis that the economy is entering a deep recession, presenting a highly asymmetric payoff profile for high-quality fixed income.
            </p>
          </div>
        </section>

        {/* Section 6: Quantitative Technicals */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <SectionHeader
            icon={LineChart}
            title="Quantitative Technicals"
            subtitle="Moving Averages and Volatility (MOVE Index)."
            gradient="from-cyan-500 to-blue-600"
          />

          <div className="prose prose-slate max-w-none text-slate-700 text-lg leading-relaxed space-y-6">
            <p>
              Beyond macroeconomic fundamentals, technical quantitative metrics play a vital role. In modern financial markets, algorithmic funds exert massive influence over price action. The most universally observed technical metric is the 200-day moving average (DMA).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {technicalData.map((card, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm text-slate-500 mb-1">Condition</div>
                  <div className="font-bold text-slate-800 text-lg mb-2">{card.condition}</div>
                  <div className="text-cyan-700 font-medium mb-1">{card.interpretation}</div>
                  <div className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 mt-2">Returns: {card.return}</div>
                </div>
              ))}
            </div>

            <p>
              For a quantitative strategist to declare that the bear market is definitively over, the 10-year Treasury yield must decisively break and close below its 200-DMA, accompanied by a contraction in the <strong>ICE BofA MOVE Index</strong> (the &ldquo;VIX of bonds&rdquo;, measuring implied volatility). Until this happens, the market remains in a contested transitional phase.
            </p>
          </div>
        </section>

        {/* Section 7: Strategic Implications & Portfolio Construction */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <SectionHeader
            icon={ShieldCheck}
            title="Strategic Implications &amp; Portfolio Construction"
            subtitle="Synthesizing quantitative metrics for actionable strategy."
            gradient="from-indigo-500 to-purple-600"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-gradient-to-b from-indigo-50 to-white border border-indigo-100 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">1</span>
                Illusion of the Duration Hedge
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Because the term premium is expanding due to fiscal dominance, long-term bonds carry embedded supply risk. This severely compromises the negative correlation between stocks and bonds that forms the bedrock of traditional 60/40 portfolios.
              </p>
            </div>

            <div className="bg-gradient-to-b from-purple-50 to-white border border-purple-100 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">2</span>
                Curve Twists &amp; Barbell Strategies
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The middle of the yield curve presents the most attractive quantitative profile. A barbell strategy&mdash;concentrating duration in the 2-year to 5-year sector while maintaining a small allocation to ultra-long maturities&mdash;optimizes risk-adjusted return.
              </p>
            </div>

            <div className="bg-gradient-to-b from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">3</span>
                The Coupon-Clipping Regime
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The era of massive capital appreciation is likely ended. With r* higher and term premium normalized, the arithmetic of fixed-income returns is dominated by coupon carry. Reinvested coupons provide a massive buffer against price movements.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500" />
          <h2 className="text-3xl font-extrabold mb-6">Conclusion: The Turning Point</h2>
          <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed space-y-4">
            <p>
              Addressing the inquiry of whether the fixed-income market has reached a definitive turning point requires separating empirical data from historical biases. The macroeconomic variables strongly suggest the cyclical peak in interest rates is behind us.
            </p>
            <p>
              However, the market is in a complex transitional phase rather than an outright bull market. The structural elevation of the neutral rate (r*) and the term premium prevents a return to the zero-interest-rate environment of the previous decade.
            </p>
            <div className="bg-white/10 p-6 rounded-xl border border-white/20 mt-6 backdrop-blur-sm">
              <p className="text-white font-medium italic m-0">
                &ldquo;The ultimate conclusion is that the fixed-income market has reached a turning point in its function, shifting from a source of duration-induced capital destruction to a reliable engine of high-carry income. Investors today are locking in structurally higher real yields in an economy that is steadily exhausting its post-pandemic momentum.&rdquo;
              </p>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
