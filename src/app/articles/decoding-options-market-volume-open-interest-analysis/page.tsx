'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const InfoIcon = () => (
  <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const UpTrendIcon = () => (
  <svg className="w-6 h-6 mr-3 inline-block text-[#1D8A70] dark:text-[#3CBF9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
  </svg>
);

const DownTrendIcon = () => (
  <svg className="w-6 h-6 mr-3 inline-block text-[#BC4128] dark:text-[#E2694A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
  </svg>
);

const WarningIcon = () => (
  <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
  </svg>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="mb-12">{children}</section>
);

const SubHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-3xl font-semibold text-gray-800 mt-8 mb-4 border-b-2 border-blue-200 pb-3 font-serif">{children}</h2>
);

const MinorHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-semibold text-gray-700 mt-6 mb-3 font-serif">{children}</h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-gray-700 mb-4 leading-relaxed">{children}</p>
);

interface BulletItem {
  title: string;
  content: string;
}

const BulletList = ({ items }: { items: BulletItem[] }) => (
  <ul className="list-disc list-inside space-y-3 mb-4 pl-4">
    {items.map((item, index) => (
      <li key={index} className="text-lg text-gray-700 leading-relaxed">
        <span className="font-semibold text-gray-800">{item.title}:</span> {item.content}
      </li>
    ))}
  </ul>
);

const InfoBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-5 my-6 rounded-r-lg shadow-sm">
    <h4 className="font-bold text-blue-800 text-xl mb-2 flex items-center">
      <InfoIcon />{title}
    </h4>
    <div className="text-lg text-blue-900">{children}</div>
  </div>
);

const BullishBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] p-5 my-6 rounded-r-lg shadow-sm">
    <h4 className="font-bold text-green-800 text-xl mb-2 flex items-center">
      <UpTrendIcon />{title}
    </h4>
    <div className="text-lg text-green-900">{children}</div>
  </div>
);

const BearishBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-5 my-6 rounded-r-lg shadow-sm">
    <h4 className="font-bold text-red-800 text-xl mb-2 flex items-center">
      <DownTrendIcon />{title}
    </h4>
    <div className="text-lg text-red-900">{children}</div>
  </div>
);

const WarningBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 my-6 rounded-r-lg shadow-sm">
    <h4 className="font-bold text-yellow-800 text-xl mb-2 flex items-center">
      <WarningIcon />{title}
    </h4>
    <div className="text-lg text-yellow-900">{children}</div>
  </div>
);

interface TableRow {
  data: string[];
  highlight?: string;
}

const Table = ({ headers, rows }: { headers: string[]; rows: TableRow[] }) => (
  <div className="overflow-x-auto my-8 rounded-lg shadow-lg border border-gray-200">
    <table className="w-full text-left bg-white dark:bg-[#0A0D14]">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={`hover:bg-gray-50 ${row.highlight || ''}`}>
            {row.data.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-4 text-lg text-gray-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function OptionsAnalysisPage() {
  return (
    <ArticleFrame
      slug="decoding-options-market-volume-open-interest-analysis"
      additionalDisclaimer="This analysis provides a framework for understanding options market data. Options trading involves substantial risk and is not suitable for all investors."
    >
      <div className="max-w-4xl mx-auto px-4 text-gray-900">
        <InfographicSlot alt="Options Market Volume & Open Interest Analysis Infographic" />

        <Section>
          <SubHeading id="section-1">1. Foundational Mechanics</SubHeading>
          <Paragraph>
            Volume and Open Interest (OI) are foundational metrics in options trading. Volume measures the intensity of trading activity, resetting daily, while Open Interest provides a cumulative count of all active contracts, offering a longer-term view of market participation and conviction. Understanding their distinct mechanics is crucial for accurate market analysis.
          </Paragraph>

          <BulletList items={[
            {
              title: "Volume",
              content: "Represents the total number of contracts traded in a given period (e.g., a day). High volume indicates high interest and liquidity for a specific strike or expiration."
            },
            {
              title: "Open Interest",
              content: "The total number of outstanding option contracts that have not been settled. It reflects the total capital committed to a particular option."
            }
          ]} />

          <WarningBox title="Common Misconception">
            <p>Volume and Open Interest are not the same. High volume can occur with low open interest if traders are frequently entering and exiting positions within the same day (day trading). True market conviction is often seen when high volume leads to a significant increase in open interest.</p>
          </WarningBox>
        </Section>

        <Section>
          <SubHeading id="section-2">2. The Price, Volume, &amp; OI Trinity</SubHeading>
          <Paragraph>
            Analyzing these three metrics together provides a powerful framework for confirming trends and identifying potential reversals. The interaction between them reveals the level of conviction behind a price move.
          </Paragraph>

          <Table
            headers={["Price Trend", "Volume", "Open Interest", "Market Interpretation & Conviction Level"]}
            rows={[
              {
                data: ["Rising", "Rising", "Rising", "Strongly Bullish. New money is confidently entering long positions, confirming the uptrend. (High Conviction)"],
                highlight: "bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10"
              },
              {
                data: ["Rising", "Falling", "Falling", "Weakening Bull Trend. The rally is likely fueled by short-covering, not new buying interest. Prone to reversal. (Low Conviction)"],
                highlight: ""
              },
              {
                data: ["Falling", "Rising", "Rising", "Strongly Bearish. New money is aggressively opening short positions, confirming the downtrend. (High Conviction)"],
                highlight: "bg-[#BC4128]/10 dark:bg-[#E2694A]/10"
              },
              {
                data: ["Falling", "Falling", "Falling", "Weakening Bear Trend. Selling pressure is likely from longs liquidating positions. The decline may be losing steam. (Low Conviction)"],
                highlight: ""
              }
            ]}
          />
        </Section>

        <Section>
          <SubHeading id="section-3">3. OI as a Structural Map</SubHeading>
          <Paragraph>
            Large concentrations of Open Interest at specific strike prices create significant support and resistance levels. These &ldquo;OI walls&rdquo; can influence the underlying asset&apos;s price, especially as expiration approaches.
          </Paragraph>

          <BullishBox title="Support from High Put OI">
            A strike with a large amount of put open interest acts as a price floor. The sellers of these puts (often institutions) are obligated to buy the underlying if the price drops to that strike. To hedge their risk, they often buy the underlying as the price approaches, creating natural buying pressure and support.
          </BullishBox>

          <BearishBox title="Resistance from High Call OI">
            Conversely, a strike with high call open interest acts as a price ceiling. Call sellers are incentivized to keep the price below this level to ensure the options expire worthless. They may sell the underlying asset as it approaches the strike, creating selling pressure and resistance.
          </BearishBox>
        </Section>

        <Section>
          <SubHeading id="section-4">4. Advanced Sentiment Analysis: Put/Call Ratio</SubHeading>
          <Paragraph>
            The Put/Call Ratio (PCR) is a powerful sentiment indicator derived from volume and OI data. It quantifies the battle between bearish (puts) and bullish (calls) sentiment.
          </Paragraph>

          <InfoBox title="Two Flavors of PCR">
            <p><strong>Volume PCR:</strong> Measures intraday sentiment (Total Put Volume / Total Call Volume). It&apos;s a snapshot of the current day&apos;s trading mood.</p>
            <p className="mt-2"><strong>OI PCR:</strong> Measures cumulative market positioning (Total Put OI / Total Call OI). It reflects longer-term sentiment and conviction.</p>
          </InfoBox>

          <MinorHeading>Interpreting PCR as a Contrarian Indicator</MinorHeading>
          <Paragraph>
            Extreme readings in the PCR often signal that sentiment has become too one-sided, suggesting a potential market reversal.
          </Paragraph>

          <BulletList items={[
            {
              title: "Extremely High PCR (> 1.0)",
              content: "Indicates excessive fear and bearishness. When everyone is bearish, there may be few sellers left. This is often a contrarian bullish signal."
            },
            {
              title: "Extremely Low PCR (< 0.7)",
              content: "Suggests excessive greed and bullishness. When everyone is bullish, there may be few buyers left. This is often a contrarian bearish signal."
            }
          ]} />
        </Section>

        <Section>
          <SubHeading id="section-5">5. Identifying Unusual Options Activity (UOA)</SubHeading>
          <Paragraph>
            UOA often signals that traders with potential insider knowledge (&ldquo;smart money&rdquo;) are placing large, directional bets. Identifying these trades can provide a significant edge.
          </Paragraph>

          <WarningBox title="What to Look For">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Volume {'>'} Open Interest:</strong> This is a critical signal, indicating that the day&apos;s trading volume for a specific contract is greater than the total number of previously existing contracts. It means all the activity is new positioning.</li>
              <li><strong>Large Premiums:</strong> Significant capital being spent on out-of-the-money (OTM) options with short expirations.</li>
              <li><strong>Sweeps:</strong> Large orders split into smaller chunks across multiple exchanges to get filled quickly, indicating urgency.</li>
            </ul>
          </WarningBox>
        </Section>

        <Section>
          <SubHeading id="section-6">6. The After-Hours Edge</SubHeading>
          <Paragraph>
            After the market closes, the official open interest data is released. This EOD data provides the ultimate confirmation of the day&apos;s activity and is crucial for preparing for the next session.
          </Paragraph>

          <InfoBox title="Post-Market Analysis">
            An intraday price surge on high volume might appear bullish. However, if the EOD open interest report shows that OI actually decreased, it reveals the rally was driven by position closing (short covering) rather than new, committed buying. This completely changes the narrative from bullish to potentially bearish, as the buying fuel has been exhausted.
          </InfoBox>
        </Section>

        <Section>
          <SubHeading id="section-7">7. Deep Research: Academic Foundations &amp; Market Microstructure</SubHeading>

          <MinorHeading>7.1 Market Microstructure Theory</MinorHeading>
          <Paragraph>
            The relationship between volume, open interest, and price discovery in options markets has been extensively studied in academic literature. Kyle&apos;s (1985) model of informed trading provides the theoretical foundation for understanding how information asymmetry manifests in options markets through volume patterns.
          </Paragraph>

          <InfoBox title="Kyle's Lambda: The Price Impact Coefficient">
            <p className="mb-3">Kyle&apos;s model introduces the concept of λ (lambda), which measures the price impact of order flow. In options markets, this translates to:</p>
            <div className="bg-white dark:bg-[#0A0D14] p-4 rounded border-l-4 border-blue-300 font-mono text-sm">
              λ = (σ²ᵤ / σ²ᵥ) × √(T)
            </div>
            <p className="mt-3">Where σ²ᵤ represents the variance of the underlying asset&apos;s fundamental value, σ²ᵥ represents the variance of noise trading, and T is the time to expiration.</p>
          </InfoBox>

          <MinorHeading>7.2 Information Content of Options Flow</MinorHeading>
          <Paragraph>
            Easley, O&apos;Hara, and Srinivas (1998) demonstrated that options markets often lead equity markets in price discovery. Their research shows that informed traders prefer options due to leverage and limited downside risk, making options volume a leading indicator of future stock price movements.
          </Paragraph>

          <Table
            headers={["Research Finding", "Methodology", "Market Implication", "Practical Application"]}
            rows={[
              {
                data: ["Options lead stocks by 15-30 minutes", "Tick-by-tick analysis of S&P 100", "Information flows from options to stocks", "Monitor unusual options activity for early signals"],
                highlight: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10"
              },
              {
                data: ["Put volume predicts negative returns", "Cross-sectional regression analysis", "Informed traders use puts for bearish bets", "High put volume ratio signals potential decline"],
                highlight: ""
              },
              {
                data: ["OTM options contain more information", "Event study methodology", "Informed traders prefer high leverage", "Focus on OTM unusual activity"],
                highlight: "bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10"
              },
              {
                data: ["Volume-OI divergence predicts reversals", "Time series analysis", "Position closing vs. new positioning", "Use EOD OI data to confirm intraday signals"],
                highlight: ""
              }
            ]}
          />

          <MinorHeading>7.3 The Volatility Surface and Implied Information</MinorHeading>
          <Paragraph>
            Bakshi, Cao, and Chen (1997) developed a framework for extracting risk-neutral moments from options prices. Their work shows that the shape of the volatility surface contains forward-looking information about market expectations beyond simple directional bets.
          </Paragraph>

          <BullishBox title="Volatility Skew Analysis">
            <p className="mb-3">The volatility skew (difference between put and call implied volatilities) provides insights into market sentiment:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Steep Negative Skew:</strong> High demand for downside protection, indicating institutional hedging</li>
              <li><strong>Positive Skew:</strong> Unusual pattern suggesting potential upside catalysts</li>
              <li><strong>Flattening Skew:</strong> Complacency or balanced sentiment</li>
            </ul>
          </BullishBox>

          <MinorHeading>7.4 Gamma Exposure and Market Dynamics</MinorHeading>
          <Paragraph>
            Recent research by Perignon and Villa (2002) and extended by practitioners like SpotGamma has revealed how dealer gamma exposure creates systematic market effects. When dealers are short gamma, they must hedge by selling into declines and buying into rallies, amplifying volatility.
          </Paragraph>

          <WarningBox title="Gamma Exposure Framework">
            <div className="space-y-3">
              <p><strong>Negative Gamma Environment (Dealers Short Gamma):</strong></p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Increased intraday volatility</li>
                <li>Momentum-driven price action</li>
                <li>Breakouts more likely to continue</li>
              </ul>
              <p><strong>Positive Gamma Environment (Dealers Long Gamma):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Suppressed volatility</li>
                <li>Mean-reverting price action</li>
                <li>Strong support/resistance at key levels</li>
              </ul>
            </div>
          </WarningBox>

          <MinorHeading>7.5 Empirical Evidence: The VIX-Options Relationship</MinorHeading>
          <Paragraph>
            Whaley (2000) and subsequent research by CBOE has established the relationship between options activity and volatility expectations. The VIX, derived from S&amp;P 500 options, serves as the market&apos;s &ldquo;fear gauge,&rdquo; but the underlying options flow provides more granular insights.
          </Paragraph>

          <InfoBox title="VIX Term Structure Analysis">
            <p className="mb-3">The shape of the VIX term structure reveals market expectations:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#0A0D14] p-4 rounded border">
                <h5 className="font-semibold text-blue-800 mb-2">Contango (Normal)</h5>
                <p className="text-sm">VIX9D {'<'} VIX {'<'} VIX3M</p>
                <p className="text-sm mt-1">Market expects volatility to increase over time</p>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-4 rounded border">
                <h5 className="font-semibold text-red-800 mb-2">Backwardation (Stressed)</h5>
                <p className="text-sm">VIX9D {'>'} VIX {'>'} VIX3M</p>
                <p className="text-sm mt-1">Market expects current stress to subside</p>
              </div>
            </div>
          </InfoBox>

          <MinorHeading>7.6 Behavioral Finance Perspectives</MinorHeading>
          <Paragraph>
            Behavioral finance research by Barberis and Thaler (2003) provides insights into how cognitive biases affect options trading patterns. Understanding these biases helps interpret volume and open interest data more accurately.
          </Paragraph>

          <BearishBox title="Common Behavioral Biases in Options Markets">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Overconfidence Bias:</strong> Leads to excessive trading in short-dated options</li>
              <li><strong>Representativeness Heuristic:</strong> Causes traders to extrapolate recent trends</li>
              <li><strong>Loss Aversion:</strong> Results in asymmetric put/call demand patterns</li>
              <li><strong>Anchoring:</strong> Creates clustering around round-number strikes</li>
            </ul>
          </BearishBox>

          <MinorHeading>7.7 Quantitative Models for Options Flow Analysis</MinorHeading>
          <Paragraph>
            Modern quantitative approaches combine multiple data sources to create comprehensive models. The following framework integrates academic research with practical implementation:
          </Paragraph>

          <div className="bg-gray-50 p-6 rounded-lg border my-6">
            <h4 className="font-bold text-gray-800 text-lg mb-4">Integrated Options Flow Model</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white dark:bg-[#0A0D14] p-4 rounded border">
                <h5 className="font-semibold text-[#A8672E] dark:text-[#D08F52] mb-2">Input Variables</h5>
                <ul className="space-y-1">
                  <li>&bull; Volume/OI ratios</li>
                  <li>&bull; Put/Call ratios</li>
                  <li>&bull; Implied volatility skew</li>
                  <li>&bull; Time to expiration</li>
                  <li>&bull; Moneyness distribution</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-4 rounded border">
                <h5 className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Processing</h5>
                <ul className="space-y-1">
                  <li>&bull; Z-score normalization</li>
                  <li>&bull; Regime detection</li>
                  <li>&bull; Sentiment scoring</li>
                  <li>&bull; Anomaly detection</li>
                  <li>&bull; Signal aggregation</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-4 rounded border">
                <h5 className="font-semibold text-purple-600 mb-2">Output Signals</h5>
                <ul className="space-y-1">
                  <li>&bull; Directional bias</li>
                  <li>&bull; Volatility expectation</li>
                  <li>&bull; Time horizon</li>
                  <li>&bull; Confidence level</li>
                  <li>&bull; Risk assessment</li>
                </ul>
              </div>
            </div>
          </div>

          <MinorHeading>7.8 Future Research Directions</MinorHeading>
          <Paragraph>
            Emerging areas of research in options market microstructure include machine learning applications, high-frequency trading impacts, and the role of algorithmic market makers. These developments continue to evolve how we interpret volume and open interest data.
          </Paragraph>

          <InfoBox title="Cutting-Edge Research Areas">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Deep Learning Models:</strong> Neural networks for pattern recognition in options flow</li>
              <li><strong>Network Analysis:</strong> Studying interconnections between different option chains</li>
              <li><strong>Alternative Data:</strong> Incorporating social sentiment and news flow</li>
              <li><strong>Regime Switching Models:</strong> Adapting to changing market conditions</li>
              <li><strong>Cross-Asset Analysis:</strong> Options flow impact on bonds, currencies, and commodities</li>
            </ul>
          </InfoBox>
        </Section>
      </div>
    </ArticleFrame>
  );
}
