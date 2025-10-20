'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Reusable SVG Icon Components ---
const InfoIcon = () => (
  <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const UpTrendIcon = () => (
  <svg className="w-6 h-6 mr-3 inline-block text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
  </svg>
);

const DownTrendIcon = () => (
  <svg className="w-6 h-6 mr-3 inline-block text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
  </svg>
);

const WarningIcon = () => (
  <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
  </svg>
);

// --- Reusable Styled Components ---
const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="mb-12">{children}</section>
);

const MainHeading = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{children}</h1>
);

const SubHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-3xl font-semibold text-gray-800 mt-8 mb-4 border-b-2 border-blue-200 pb-3">{children}</h2>
);

const MinorHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">{children}</h3>
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

// --- Colored Info Boxes ---
const InfoBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 my-6 rounded-r-lg shadow-sm">
    <h4 className="font-bold text-blue-800 text-xl mb-2 flex items-center">
      <InfoIcon />{title}
    </h4>
    <div className="text-lg text-blue-900">{children}</div>
  </div>
);

const BullishBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-green-50 border-l-4 border-green-500 p-5 my-6 rounded-r-lg shadow-sm">
    <h4 className="font-bold text-green-800 text-xl mb-2 flex items-center">
      <UpTrendIcon />{title}
    </h4>
    <div className="text-lg text-green-900">{children}</div>
  </div>
);

const BearishBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-5 my-6 rounded-r-lg shadow-sm">
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
    <table className="w-full text-left bg-white">
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

// --- Main Page Component ---
export default function OptionsAnalysisPage() {
  const currentArticle = articles.find(article => article.slug === 'decoding-options-market-volume-open-interest-analysis');

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

      <div className="bg-gray-100 min-h-screen font-sans" style={{fontFamily: "'Inter', sans-serif"}}>
        <main className="container mx-auto px-4 py-8 md:py-16">
          <article className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-200">
            
            {/* Return to Home Button */}
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>

            {/* Deep Research Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                Deep Research
              </span>
            </div>

            {/* Options Badge */}
            <div className="absolute bottom-4 right-4">
              <span className="inline-block bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                Options
              </span>
            </div>

            <header className="text-center mb-12">
              <p className="text-lg text-blue-600 font-semibold mb-2">A Deep Dive into Market Dynamics</p>
              <MainHeading>Decoding the Options Market: Volume & Open Interest</MainHeading>
            </header>

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
              <SubHeading id="section-2">2. The Price, Volume, & OI Trinity</SubHeading>
              <Paragraph>
                Analyzing these three metrics together provides a powerful framework for confirming trends and identifying potential reversals. The interaction between them reveals the level of conviction behind a price move.
              </Paragraph>

              <Table 
                headers={["Price Trend", "Volume", "Open Interest", "Market Interpretation & Conviction Level"]}
                rows={[
                  { 
                    data: ["Rising", "Rising", "Rising", "Strongly Bullish. New money is confidently entering long positions, confirming the uptrend. (High Conviction)"], 
                    highlight: "bg-green-50" 
                  },
                  { 
                    data: ["Rising", "Falling", "Falling", "Weakening Bull Trend. The rally is likely fueled by short-covering, not new buying interest. Prone to reversal. (Low Conviction)"], 
                    highlight: "" 
                  },
                  { 
                    data: ["Falling", "Rising", "Rising", "Strongly Bearish. New money is aggressively opening short positions, confirming the downtrend. (High Conviction)"], 
                    highlight: "bg-red-50" 
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
                Large concentrations of Open Interest at specific strike prices create significant support and resistance levels. These "OI walls" can influence the underlying asset's price, especially as expiration approaches.
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
                <p><strong>Volume PCR:</strong> Measures intraday sentiment (Total Put Volume / Total Call Volume). It's a snapshot of the current day's trading mood.</p>
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
                UOA often signals that traders with potential insider knowledge ("smart money") are placing large, directional bets. Identifying these trades can provide a significant edge.
              </Paragraph>

              <WarningBox title="What to Look For">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Volume {'>'} Open Interest:</strong> This is a critical signal, indicating that the day's trading volume for a specific contract is greater than the total number of previously existing contracts. It means all the activity is new positioning.</li>
                  <li><strong>Large Premiums:</strong> Significant capital being spent on out-of-the-money (OTM) options with short expirations.</li>
                  <li><strong>Sweeps:</strong> Large orders split into smaller chunks across multiple exchanges to get filled quickly, indicating urgency.</li>
                </ul>
              </WarningBox>
            </Section>

            <Section>
              <SubHeading id="section-6">6. The After-Hours Edge</SubHeading>
              <Paragraph>
                After the market closes, the official open interest data is released. This EOD data provides the ultimate confirmation of the day's activity and is crucial for preparing for the next session.
              </Paragraph>

              <InfoBox title="Post-Market Analysis">
                An intraday price surge on high volume might appear bullish. However, if the EOD open interest report shows that OI actually decreased, it reveals the rally was driven by position closing (short covering) rather than new, committed buying. This completely changes the narrative from bullish to potentially bearish, as the buying fuel has been exhausted.
              </InfoBox>
            </Section>

            <footer className="mt-16 pt-8 border-t-2 border-gray-200 text-center">
              <p className="text-base text-gray-600">
                This analysis provides a framework for understanding options market data. Always perform your own due diligence and consider multiple factors before making any trading decisions.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                © 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.
              </p>
            </footer>
          </article>
        </main>
      </div>
    </>
  );
}
