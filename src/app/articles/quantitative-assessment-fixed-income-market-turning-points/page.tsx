'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { Jargon, ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

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
  { condition: 'Price > 200-DMA', interpretation: 'Long-term Uptrend', return: '~ +14.0%', tone: 'pos' },
  { condition: 'Price < 200-DMA', interpretation: 'Long-term Downtrend', return: '~ -6.0%', tone: 'neg' },
  { condition: '50-DMA crosses above 200-DMA', interpretation: 'Golden Cross (Bullish Reversal)', return: 'Highly Positive', tone: 'pos' },
  { condition: '50-DMA crosses below 200-DMA', interpretation: 'Death Cross (Bearish Reversal)', return: 'Highly Negative', tone: 'neg' },
];

export default function QuantitativeAssessmentFixedIncomeArticle() {
  return (
    <ArticleFrame slug="quantitative-assessment-fixed-income-market-turning-points">
      <div className="max-w-5xl mx-auto space-y-12 text-slate-800 dark:text-slate-200">
        
        {/* Key Takeaways */}
        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm mb-12">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li>The fixed-income market has reached a turning point in its function, shifting from duration-induced capital destruction to a reliable engine of high-carry income.</li>
            <li>Macroeconomic variables strongly suggest the cyclical peak in interest rates is behind us, but the market remains in a complex transitional phase rather than an outright bull market.</li>
            <li>The structural elevation of the neutral rate (r*) and the term premium prevents a return to the zero-interest-rate environment of the previous decade.</li>
          </ul>
        </div>

        {/* Section: Introduction and Macroeconomic Context */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Introduction and Macroeconomic Context</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              The global fixed-income market has traversed one of the most protracted and punishing bear markets in modern financial history. Driven by a post-pandemic inflationary shock, aggressive central bank tightening, and structural shifts in global supply chains, bond investors have endured unprecedented drawdowns.
            </p>
            <p>
              As of the third quarter of 2026, the macroeconomic environment is exhibiting classic late-cycle characteristics. Economic growth is decelerating to a stall speed, inflation has retreated from its peak (albeit remaining somewhat sticky), and the monetary policy reaction function has transitioned from aggressive tightening to a contentious, <Jargon term="hawkish pause" definition="The central bank has stopped raising rates for now, but explicitly threatens to raise them again if inflation persists, keeping financial conditions tight." />.
            </p>
            <p>
              The domestic macroeconomic backdrop in July 2026 presents a highly nuanced picture of an economy that is stalling, yet not entirely contracting. Real GDP increased at an annualized rate of 1.5 percent in Q2 2026, a marked deceleration from 2.1 percent in Q1. Concurrently, the labor market is displaying subtle signs of fatigue.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Economic Indicator</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">2026:Q2 (Prev)</th>
                    <th className="py-3 px-4 font-serif font-normal text-[#A8672E] dark:text-[#D08F52]">2026:Q2 (New)</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">2026:Q3 (New)</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">2026:Q4 (New)</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">2027:Q1 (New)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {economicData.map((row, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4">{row.indicator}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.q2prev}</td>
                      <td className="py-3 px-4 font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">{row.q2new}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.q3new}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.q4new}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.q1new}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-4">
                Source: Federal Reserve Bank of Philadelphia, Survey of Professional Forecasters, July 2026.
              </div>
            </div>

            <p>
              While growth is stalling, inflation remains a persistent friction point. The Personal Consumption Expenditures (PCE) price index rose 3.7 percent year-over-year in June 2026. This dichotomy—a stalling real economy coupled with sticky inflation—has forced the Federal Reserve into a complex holding pattern (target range 3.50 to 3.75 percent).
            </p>
          </div>
        </section>

        <InfographicSlot alt="Fixed-Income Market Analysis Infographic" />

        {/* Section: Yield Curve Dynamics */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Yield Curve Dynamics: The Anatomy of a Steepening</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              The term structure of interest rates is arguably the most powerful quantitative mechanism for diagnosing turning points in the fixed-income market. Historically, the transition from a bear market to a bull market in bonds is signaled not merely by the absolute level of yields, but by the changing shape of the yield curve. As of late July 2026, the yield curve has begun to dis-invert and steepen.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Treasury Maturity</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Current Yield (%)</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">1-Month Change (%)</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">1-Year Change (%)</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Historical Average (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {yieldData.map((row, i) => (
                    <tr key={i} className={row.isBold ? "bg-gray-50 dark:bg-gray-800/50" : ""}>
                      <td className={`py-3 px-4 ${row.isBold ? "font-bold text-[#A8672E] dark:text-[#D08F52]" : ""}`}>{row.maturity}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.yield}</td>
                      <td className={`py-3 px-4 font-mono tabular-nums ${parseFloat(row.m1change) > 0 ? 'text-[#BC4128] dark:text-[#E2694A]' : 'text-[#1D8A70] dark:text-[#3CBF9C]'}`}>{row.m1change}</td>
                      <td className={`py-3 px-4 font-mono tabular-nums ${parseFloat(row.y1change) > 0 ? 'text-[#BC4128] dark:text-[#E2694A]' : 'text-[#1D8A70] dark:text-[#3CBF9C]'}`}>{row.y1change}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.histAvg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ComparisonGrid>
              <ComparisonCard title="Bull Steepening" tone="pos">
                Short-term rates fall faster than long-term rates (usually because the Fed cuts rates to save a dying economy). This is great for bond prices (Bull market).
              </ComparisonCard>
              <ComparisonCard title="Bear Steepening" tone="neg">
                Long-term rates rise faster than short-term rates (usually due to inflation fears or too much debt supply). This is hostile for long-term bond holders (Bear market).
              </ComparisonCard>
            </ComparisonGrid>

            <p className="mt-6">
              The quantitative data from mid-2026 presents a highly atypical scenario. As the economy has decelerated, the market has experienced a <strong>bear steepening</strong> rather than the textbook bull steepening that typically precedes a recessionary pivot. Out of the past 11 business cycles, 10 followed the typical pre-recession curve pattern of a bear flattening leading directly to a bull steepening.
            </p>
            <p>
              The current persistence of a bear steepening implies that while the peak in short-term rates may have been achieved, the long end of the curve is still undergoing aggressive price discovery.
            </p>
          </div>
        </section>

        {/* Section: The Term Premium */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">The Term Premium</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              The analytical framework for understanding curve movement relies heavily on the decomposition of the long-term yield into its constituent parts. The yield on an n-period bond can be mathematically expressed as:
            </p>

            <div className="my-8">
              <FormulaPanel 
                formula="y_t^{(n)} = \frac{1}{n} \sum_{i=0}^{n-1} \mathbb{E}_t[r_{t+i}] + TP_t^{(n)}" 
                legend="y = current yield, E[r] = expected future short rates, TP = Term Premium"
              />
            </div>

            <p>
              Because the term premium is a theoretical construct, macroeconomists rely on term structure models to extract it. Throughout the era of zero-interest-rate policy (ZIRP), the term premium was frequently negative. However, metrics for 2026 confirm a profound regime shift. The ACM 10-year Treasury term premium transitioned firmly into positive territory, expanding to approximately 0.83 percent by late July 2026.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Model / Survey Name</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Sample Start</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Survey Data?</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Exp. Rate (5–10 Yrs)</th>
                    <th className="py-3 px-4 font-serif font-normal text-[#A8672E] dark:text-[#D08F52]">Implied 10-Year TP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {termPremiumData.map((row, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4">{row.model}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.startYear}</td>
                      <td className="py-3 px-4">{row.survey}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.expRate5to10}</td>
                      <td className="py-3 px-4 font-mono tabular-nums font-bold text-[#A8672E] dark:text-[#D08F52]">{row.implied10y}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              The U.S. fiscal deficit and the corresponding surge in Treasury supply have overwhelmed the market's natural absorption capacity. Furthermore, quantitative tightening (QT) has forced the private sector to absorb a higher concentration of long-duration bonds. From a strategic standpoint, a positive term premium restores the natural yield advantage of holding duration.
            </p>
          </div>
        </section>

        {/* Section: The Neutral Rate of Interest (r*) */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">The Neutral Rate of Interest (r*)</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Another quantitative pillar necessary to determine if the market has reached a turning point is the estimation of the natural rate of interest, commonly referred to as <Jargon term="r* (r-star)" definition="The theoretical interest rate where the economy operates at full potential without overheating or freezing up. It serves as the long-run anchor for central bank rates." />.
            </p>
            <p>
              During the previous decade, r* was widely estimated to be near zero in real terms, implying a nominal neutral rate of approximately 2.0 to 2.5 percent. However, structural economic changes suggest r* has drifted significantly higher. The massive capital expenditure required for AI infrastructure, supply chain reconfiguration, and structural fiscal deficits have fundamentally altered capital demand.
            </p>
            <p>
              If the real neutral rate has risen to 1.0 or 1.5 percent, the nominal neutral rate would sit between 3.0 and 4.0 percent. This explains why the U.S. economy managed to expand at 1.5% in Q2 2026 despite "high" rates—the rates were not actually that restrictive compared to the new r*.
            </p>
            
            <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm my-6">
              <h4 className="font-serif text-lg text-[#A8672E] dark:text-[#D08F52] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                Quantitative Implication
              </h4>
              <p className="text-sm md:text-base">
                Investors waiting for the 10-year Treasury yield to plummet back to the 1.5 to 2.0 percent levels seen in the prior decade are ignoring the upward shift in the macroeconomic equilibrium.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Credit Risk: The OAS Anomaly */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Credit Risk: The OAS Anomaly</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              To confirm a true macroeconomic turning point that favors safe-haven fixed income, quantitative strategists look for confirmation in the credit markets. Specifically, a stalling economy should trigger a widening of credit spreads as the probability of corporate defaults rises.
            </p>
            <p>
              The ICE BofA US High Yield Index <Jargon term="Option-Adjusted Spread (OAS)" definition="The extra yield an investor receives for buying a risky corporate bond instead of a safe U.S. Treasury, adjusted for embedded options." /> is the premier metric for real-time pricing of corporate default and liquidity risk.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Corporate Credit Tier</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Effective Yield (%)</th>
                    <th className="py-3 px-4 font-serif font-normal text-[#BC4128] dark:text-[#E2694A]">Option-Adjusted Spread (bps)</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">1-Year Change in Yield (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {creditData.map((row, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4">{row.tier}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.yield}</td>
                      <td className="py-3 px-4 font-mono tabular-nums font-bold text-[#BC4128] dark:text-[#E2694A]">{row.oas}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">{row.y1change}</td>
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

        {/* Section: Quantitative Technicals */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Quantitative Technicals</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Beyond macroeconomic fundamentals, technical quantitative metrics play a vital role. In modern financial markets, algorithmic funds exert massive influence over price action. The most universally observed technical metric is the 200-day moving average (DMA).
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Condition</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Interpretation</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Returns</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {technicalData.map((row, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 font-mono">{row.condition}</td>
                      <td className="py-3 px-4">{row.interpretation}</td>
                      <td className={`py-3 px-4 font-mono tabular-nums ${row.tone === 'pos' ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A]'}`}>{row.return}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              For a quantitative strategist to declare that the bear market is definitively over, the 10-year Treasury yield must decisively break and close below its 200-DMA, accompanied by a contraction in the <Jargon term="ICE BofA MOVE Index" definition="Often called the 'VIX of bonds,' it measures the implied volatility of U.S. Treasury options." />. Until this happens, the market remains in a contested transitional phase.
            </p>
          </div>
        </section>

        {/* Section: Strategic Implications & Portfolio Construction */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Strategic Implications &amp; Portfolio Construction</h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <ul className="space-y-6 list-none p-0">
              <li className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <strong className="font-serif text-xl block mb-2 text-[#A8672E] dark:text-[#D08F52]">Illusion of the Duration Hedge</strong>
                Because the term premium is expanding due to fiscal dominance, long-term bonds carry embedded supply risk. This severely compromises the negative correlation between stocks and bonds that forms the bedrock of traditional 60/40 portfolios.
              </li>
              <li className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <strong className="font-serif text-xl block mb-2 text-[#A8672E] dark:text-[#D08F52]">Curve Twists &amp; Barbell Strategies</strong>
                The middle of the yield curve presents the most attractive quantitative profile. A barbell strategy—concentrating duration in the 2-year to 5-year sector while maintaining a small allocation to ultra-long maturities—optimizes risk-adjusted return.
              </li>
              <li className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <strong className="font-serif text-xl block mb-2 text-[#A8672E] dark:text-[#D08F52]">The Coupon-Clipping Regime</strong>
                The era of massive capital appreciation is likely ended. With r* higher and term premium normalized, the arithmetic of fixed-income returns is dominated by coupon carry. Reinvested coupons provide a massive buffer against price movements.
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Conclusion: The Turning Point</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Addressing the inquiry of whether the fixed-income market has reached a definitive turning point requires separating empirical data from historical biases. The macroeconomic variables strongly suggest the cyclical peak in interest rates is behind us.
            </p>
            <p>
              However, the market is in a complex transitional phase rather than an outright bull market. The structural elevation of the neutral rate (r*) and the term premium prevents a return to the zero-interest-rate environment of the previous decade.
            </p>
            <div className="mt-6 border-l-4 border-[#A8672E] dark:border-[#D08F52] pl-6 py-2">
              <p className="text-gray-600 dark:text-gray-400 font-serif italic text-xl leading-relaxed">
                "The ultimate conclusion is that the fixed-income market has reached a turning point in its function, shifting from a source of duration-induced capital destruction to a reliable engine of high-carry income. Investors today are locking in structurally higher real yields in an economy that is steadily exhausting its post-pandemic momentum."
              </p>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
