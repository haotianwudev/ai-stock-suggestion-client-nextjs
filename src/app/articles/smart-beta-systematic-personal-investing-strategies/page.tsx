'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

// --- Shared local helpers ---
const SectionShell = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-6 border-b border-[#A8672E]/30 dark:border-[#D08F52]/30 pb-3">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </div>
  </section>
);

const insightTone = {
  bronze: "bg-[#A8672E]/5 dark:bg-[#D08F52]/10 border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52]",
  neg: "bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border-[#BC4128] dark:border-[#E2694A] text-[#BC4128] dark:text-[#E2694A]",
} as const;

const InsightBox = ({ tone, title, children }: { tone: keyof typeof insightTone; title: string; children: React.ReactNode }) => (
  <div className={`mt-4 p-4 border-l-4 rounded ${insightTone[tone]}`}>
    <p className="text-sm">
      <strong>{title}:</strong> {children}
    </p>
  </div>
);

const smallCardTone = {
  neutral: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
  bronze: "bg-[#A8672E]/5 dark:bg-[#D08F52]/10 border-[#A8672E]/30 dark:border-[#D08F52]/30",
  pos: "bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10 border-[#1D8A70]/30 dark:border-[#3CBF9C]/30",
} as const;

const smallCardText = {
  neutral: "text-gray-800 dark:text-gray-200",
  bronze: "text-[#A8672E] dark:text-[#D08F52]",
  pos: "text-[#1D8A70] dark:text-[#3CBF9C]",
} as const;

const SmallCard = ({ tone = "neutral", title, children }: { tone?: keyof typeof smallCardTone; title: string; children: React.ReactNode }) => (
  <div className={`p-4 rounded-lg border ${smallCardTone[tone]}`}>
    <h4 className={`font-serif mb-2 ${smallCardText[tone]}`}>{title}</h4>
    <div className="text-sm text-gray-600 dark:text-gray-400">{children}</div>
  </div>
);

const ChecklistItem = ({ tone, children }: { tone: "pos" | "neg" | "bronze"; children: React.ReactNode }) => {
  const iconClass = tone === "pos" ? "text-[#1D8A70] dark:text-[#3CBF9C]" : tone === "neg" ? "text-[#BC4128] dark:text-[#E2694A]" : "text-[#A8672E] dark:text-[#D08F52]";
  const bg = tone === "pos" ? "bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10" : tone === "neg" ? "bg-[#BC4128]/5 dark:bg-[#E2694A]/10" : "bg-[#A8672E]/5 dark:bg-[#D08F52]/10";
  const Icon = tone === "neg" ? XCircle : CheckCircle;
  return (
    <div className={`flex items-start p-3 rounded-lg ${bg}`}>
      <Icon className={`${iconClass} h-5 w-5 mt-0.5 mr-3 flex-shrink-0`} />
      <span className="text-sm text-gray-700 dark:text-gray-300">{children}</span>
    </div>
  );
};

// Table component for displaying data tables
const TableComponent = ({ title, headers, rows, isProsConsTable = false }: {
  title: string;
  headers: string[];
  rows: string[][];
  isProsConsTable?: boolean;
}) => (
  <div className="my-8">
    <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">{title}</h3>
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`px-6 py-4 text-sm align-top ${cellIndex === 0 ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                  {isProsConsTable && cellIndex > 0 ? (
                    <div className="space-y-2">
                      {cell.split('.').filter(item => item.trim()).map((item, i) => (
                        <div key={i} className="flex items-start">
                          <span className="mr-2 mt-1">
                            {rowIndex === 0 ?
                              <CheckCircle className="text-[#1D8A70] dark:text-[#3CBF9C] h-4 w-4 flex-shrink-0" /> :
                              <XCircle className="text-[#BC4128] dark:text-[#E2694A] h-4 w-4 flex-shrink-0" />
                            }
                          </span>
                          <span>{item.trim()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function SmartBetaGuide() {
  return (
    <ArticleFrame
      slug="smart-beta-systematic-personal-investing-strategies"
      additionalDisclaimer="Smart beta strategies involve significant risks including factor cyclicality, implementation costs, and potential long periods of underperformance."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100 font-sans">
        <InfographicSlot alt="Smart Beta Investment Strategy Infographic" />

        {/* Key Takeaways */}
        <section className="mb-8 mt-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>Smart beta is a hybrid: passive-style rules and transparency, applied to actively chosen factor bets&mdash;it shifts the active decision from manager to investor.</span></li>
              <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>A small set of well-documented factors&mdash;Value, Momentum, Quality, Low Volatility, Size, Dividend Yield&mdash;drive most smart beta products.</span></li>
              <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>Live fund performance has, on average, underperformed backtests by ~1%/year&mdash;factor crowding and implementation costs erode the theoretical premium.</span></li>
              <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>The greatest risk is behavioral, not factor risk: abandoning a sound strategy during an inevitable period of underperformance.</span></li>
            </ul>
          </div>
        </section>

        {/* Section 1: Deconstructing Smart Beta */}
        <SectionShell title="Deconstructing Smart Beta: A Paradigm Shift in Investing">
          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">The Genesis of Smart Beta: Beyond Market Capitalization</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Smart beta defines a category of investment strategies that employ rules-based index construction methods, deliberately diverging from the conventional market-capitalization (market-cap) weighting approach. The term, first coined by consulting firm Willis Towers Watson in 2006, emerged from a growing recognition of the inherent limitations within traditional passive indexing.
            </p>
            <InsightBox tone="bronze" title="Key Insight">
              The central premise of smart beta is to &ldquo;break the link with price.&rdquo; Instead of allowing a security&apos;s market price to dictate its weight in a portfolio, smart beta strategies utilize alternative metrics such as company fundamentals, risk characteristics, or equal weighting.
            </InsightBox>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">The Investment Spectrum: Positioning Smart Beta</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Smart beta is consistently characterized as a hybrid strategy, blending attributes of both passive indexing and active management. From passive investing, it inherits a disciplined, rules-based, and transparent framework. From active investing, it adopts the fundamental goal of outperforming a market-cap-weighted benchmark.
            </p>
            <InsightBox tone="neg" title="Marketing Caveat">
              The term &ldquo;smart beta&rdquo; can be misleading, as it shifts the burden of the active decision from a fund manager to the end investor, who must now select which factor bet to make.
            </InsightBox>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Core Principles: Rules-Based, Transparent, and Factor-Driven</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <SmallCard title="Systematic & Rules-Based">Governed by predefined, quantitative models without subjective human judgment.</SmallCard>
              <SmallCard title="Transparency">Rules for index construction and rebalancing are publicly disclosed.</SmallCard>
              <SmallCard title="Factor-Driven">Systematically targets quantifiable characteristics associated with enhanced returns.</SmallCard>
            </div>
          </div>

          <TableComponent
            title="Comparative Analysis: Traditional Passive vs. Smart Beta vs. Active Management"
            headers={["Attribute", "Traditional Passive (Market-Cap)", "Smart Beta (Factor-Based)", "Traditional Active"]}
            rows={[
              ["Core Principle", "Replicate the market by weighting securities by size.", "Systematically capture specific risk/return drivers (factors).", "Outperform a benchmark through manager skill."],
              ["Index Construction", "Tracks a public, market-cap-weighted index.", "Tracks a custom, rules-based index.", "Uses a benchmark for performance comparison only."],
              ["Cost", "Lowest fees.", "Higher than passive, lower than active.", "Highest fees."],
              ["Transparency", "High; holdings are public.", "High; rules are disclosed.", "Low; strategies are often proprietary."],
              ["Turnover", "Low.", "Moderate.", "High."],
              ["Tax Efficiency", "Generally high due to low turnover.", "Can be less tax-efficient than passive due to higher rebalancing turnover.", "Generally low tax efficiency due to frequent buying and selling."],
              ["Source of Return", "Market risk (beta).", "Market risk (beta) + factor premia.", "Market risk (beta) + manager alpha."],
              ["Manager Discretion", "None; portfolio is determined by the index.", "None in day-to-day management; discretion is in the initial design of the rules.", "High; manager actively makes buy/sell decisions."]
            ]}
          />
        </SectionShell>

        {/* Section 2: Pros and Cons */}
        <SectionShell title="Pros and Cons of Smart Beta">
          <ComparisonGrid>
            <ComparisonCard title="The Advantages of Smart Beta" tone="pos">
              <div className="space-y-3">
                {[
                  "Potential for Enhanced Returns: Systematic targeting of factors with historical outperformance",
                  "Improved Diversification: Reduces concentration risk inherent in market-cap indices",
                  "Lower Costs than Active Management: Sophisticated strategies at fraction of active fund costs",
                  "Transparency and Discipline: Rules-based approach removes emotional decision-making",
                  "Risk Management: Explicit design for risk control (e.g., low-volatility strategies)"
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-[#1D8A70] dark:text-[#3CBF9C] h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm">{advantage}</p>
                  </div>
                ))}
              </div>
            </ComparisonCard>
            <ComparisonCard title="The Disadvantages and Risks" tone="neg">
              <div className="space-y-3">
                {[
                  "Factor Cyclicality: Factors can underperform for extended periods with no guarantee of future returns",
                  "Factor Crowding: Popular strategies may become 'crowded,' eroding returns and increasing crash risk",
                  "Complexity and Hidden Costs: Higher total cost including trading costs and tax inefficiencies",
                  "Backtest vs. Reality: Live performance often disappoints compared to historical backtests",
                  "Behavioral Risks: Complexity can lead to performance chasing and poor timing decisions"
                ].map((disadvantage, index) => (
                  <div key={index} className="flex items-start">
                    <XCircle className="text-[#BC4128] dark:text-[#E2694A] h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm">{disadvantage}</p>
                  </div>
                ))}
              </div>
            </ComparisonCard>
          </ComparisonGrid>

          <TableComponent
            title="At-a-Glance Comparison: Smart Beta vs. Alternatives"
            headers={["Feature", "Smart Beta", "Traditional Passive (Market-Cap)", "Traditional Active"]}
            rows={[
              ["PROS", "Targets specific return drivers (factors). Better diversification than market-cap. Lower cost than active. Transparent & rules-based.", "Lowest cost. Simple to understand. High tax efficiency. Captures the entire market return.", "Potential for significant outperformance (alpha). Can adapt to changing market conditions. Can provide downside protection."],
              ["CONS", "Can underperform for long periods. Higher cost than passive. Risk of factor crowding. More complex and can be less tax-efficient.", "Concentration in largest stocks. No potential for outperformance. Subject to market bubbles.", "Highest cost. Often underperforms after fees. Opaque strategies (manager risk). Low tax efficiency."]
            ]}
            isProsConsTable={true}
          />
        </SectionShell>

        {/* Section 3: Factor Universe */}
        <SectionShell title="The Factor Universe: The Engines of Smart Beta Returns">
          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Foundational Equity Factors: An In-Depth Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              While academic research has identified a veritable &ldquo;factor zoo&rdquo; of hundreds of market anomalies, the vast majority of smart beta products are built upon a small handful of well-documented, economically intuitive, and persistent factors.
            </p>
            <InsightBox tone="bronze" title="Critical Debate">
              Factors may represent compensation for systematic risk (e.g., value stocks are riskier) or arise from persistent behavioral biases (e.g., investor overreaction). This distinction is critical for understanding factor persistence.
            </InsightBox>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">A Taxonomy of Factors: Offensive, Defensive, and Trending</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <SmallCard tone="bronze" title="Offensive Factors">
                <p className="mb-1">Value, Size</p>
                <p className="text-xs">Tend to perform well in growth periods</p>
              </SmallCard>
              <SmallCard tone="pos" title="Defensive Factors">
                <p className="mb-1">Quality, Low Volatility, Dividend Yield</p>
                <p className="text-xs">Aim to mitigate downside risk</p>
              </SmallCard>
              <SmallCard tone="bronze" title="Trending Factors">
                <p className="mb-1">Momentum</p>
                <p className="text-xs">Seek to benefit from persistent market trends</p>
              </SmallCard>
            </div>
          </div>

          <TableComponent
            title="Summary of Key Equity Factors"
            headers={["Factor", "Definition", "Academic Rationale", "Common Metrics", "Typical Cyclical Behavior"]}
            rows={[
              ["Value", "Stocks trading at a discount to their intrinsic value.", "Risk: Financially distressed firms are riskier. Behavioral: Investors overreact to bad news.", "P/E, P/B, Dividend Yield", "Offensive/Pro-Cyclical"],
              ["Momentum", "Stocks with strong recent price performance.", "Behavioral: Investors underreact to good news, herd behavior.", "12-month minus 1-month price return", "Trending"],
              ["Quality", "Companies with strong financial health.", "Risk: Higher quality firms are less risky. Behavioral: Investors neglect 'boring' but stable firms.", "High ROE, Low Debt-to-Equity", "Defensive"],
              ["Low Volatility", "Stocks with lower price fluctuations.", "Behavioral: Investors are attracted to high-beta 'lottery ticket' stocks, neglecting safer ones.", "Standard Deviation, Beta", "Defensive"],
              ["Size", "Smaller-capitalization companies.", "Risk: Small firms are more vulnerable to economic shocks. Behavioral: Less analyst coverage leads to mispricing.", "Market Capitalization", "Offensive/Pro-Cyclical"],
              ["Dividend Yield", "Companies paying high/growing dividends.", "Risk: Signals financial discipline. Behavioral: Investors seek income.", "Dividend Yield, Dividend Growth History", "Defensive"]
            ]}
          />
        </SectionShell>

        {/* Section 4: Architecture */}
        <SectionShell title="The Architecture of Smart Beta: From Theory to Tradable Products">
          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Index Construction and Weighting Methodologies</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The core mechanism that differentiates smart beta indices is the use of alternative weighting schemes:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <SmallCard title="Equal Weighting">Reduces concentration risk by giving equal weight to all constituents</SmallCard>
              <SmallCard title="Fundamental Weighting">Weights based on economic footprint like sales or cash flow (pioneered by RAFI)</SmallCard>
              <SmallCard title="Factor/Risk Weighting">Maximizes exposure to a desired factor or risk outcome</SmallCard>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">The Role of Rebalancing: A Source of Return and Risk</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Rebalancing is a double-edged sword. It enforces a systematic &lsquo;buy low, sell high&rsquo; discipline that can be a source of excess returns. However, it also generates transaction costs and creates risks like front-running, where sophisticated traders anticipate rebalancing trades.
            </p>
            <InsightBox tone="neg" title="Implementation Risk">
              Front-running by sophisticated traders can erode the theoretical factor premium, highlighting the gap between theory and practice.
            </InsightBox>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">The Rise of the Smart Beta ETF: Democratizing Factor Investing</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The explosive growth in smart beta (AUM ~$1.56 trillion) has been fueled by the ETF vehicle. ETFs make these sophisticated strategies accessible to the public in a low-cost, transparent, and liquid format.
            </p>
          </div>
        </SectionShell>

        {/* Section 5: Systematic Trading */}
        <SectionShell title="Systematic Trading: Institutional Applications">
          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Portfolio Construction for Quantitative Funds</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Institutions use smart beta in sophisticated &lsquo;alpha-beta separation&rsquo; frameworks, replacing core passive allocations with more efficient factor strategies to free up risk budgets for true alpha-seeking managers.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Multi-Factor Strategies</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Combining lowly correlated factors like value, momentum, and quality can smooth performance. However, this is complex, as naively combining factors can lead to &lsquo;factor clash&rsquo; where factors work against each other.
            </p>
            <InsightBox tone="neg" title="Factor Clash Warning">
              A &lsquo;cheap&rsquo; value stock with poor quality metrics exemplifies how factors can conflict, requiring sophisticated optimization techniques.
            </InsightBox>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">The Factor Timing Debate</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Dynamically shifting between factors represents a high-stakes endeavor, essentially returning to active management. However, growing research suggests that timing models using signals like factor valuation and momentum can be effective.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-serif text-gray-900 dark:text-white mb-2">Smart Beta Evolution</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p><strong>Smart Beta 1.0:</strong> Static single-factor strategies</p>
                <p><strong>Smart Beta 2.0:</strong> Multi-factor approaches</p>
                <p><strong>Smart Beta 3.0:</strong> Dynamic factor timing models</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Case Studies in Institutional Adoption</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Nordic and Dutch pension funds were early adopters. Case studies show tangible results, such as pension funds reducing portfolio volatility by 20% with minimum volatility strategies, though implementation costs remain a challenge.
            </p>
          </div>
        </SectionShell>

        {/* Section 6: Personal Trading */}
        <SectionShell title="Personal Trading: Building a Smart Beta Portfolio">
          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">A Practical Toolkit: Selecting and Evaluating Smart Beta ETFs</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Individual investors must first define their goals and risk tolerance. Evaluation requires due diligence on several key factors:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Index methodology and factor purity",
                "Total cost of ownership (including hidden trading costs)",
                "Liquidity (AUM and bid-ask spreads)",
                "Track record and manager reputation"
              ].map((factor, index) => (
                <ChecklistItem key={index} tone="bronze">{factor}</ChecklistItem>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Portfolio Construction Strategies for Individuals</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Common approaches include the Core-Satellite method or a diversified multi-factor approach:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <SmallCard tone="pos" title="Core-Satellite Approach">Market-cap core with factor &lsquo;tilts&rsquo; for targeted exposure</SmallCard>
              <SmallCard tone="bronze" title="Multi-Factor Approach">Blend several lowly correlated factor ETFs for diversification</SmallCard>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Implementation and Monitoring Guide</h3>
            <InsightBox tone="neg" title="Greatest Risk">
              Behavioral error&mdash;chasing performance and selling after underperformance. Research shows a significant &lsquo;investor returns gap&rsquo; caused by poor timing. Discipline and a long-term perspective (5-10+ years) are critical for success.
            </InsightBox>
          </div>

          <TableComponent
            title="Guide to Building a Personal Smart Beta Portfolio"
            headers={["Investor Profile / Goal", "Suggested Core Strategy", "Satellite 'Tilts'", "Example ETF Tickers*", "Key Considerations"]}
            rows={[
              ["Risk-Averse / Capital Preservation", "Low Volatility ETF", "Quality, Dividend Yield", "SPHQ, VIG", "Focus on downside protection. May lag in bull markets."],
              ["Growth-Focused", "Momentum ETF", "Size (Small-Cap), Quality", "IWF, SPMO", "Higher potential returns with higher risk. Requires a long time horizon."],
              ["Income-Focused", "Dividend Growth ETF", "High Dividend Yield, Value", "VIG, VTV", "Focus on consistent income. Be aware of interest rate sensitivity."],
              ["Balanced / Diversified", "Multi-Factor ETF", "Value, Momentum, Quality", "VTV, SPMO, SPHQ, ISCF", "Seeks smoother returns by diversifying factor exposures."]
            ]}
          />
        </SectionShell>

        {/* Section 7: Performance & Risks */}
        <SectionShell title="Performance, Risks, and Critical Perspectives">
          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">A Sober Look at Historical Performance</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The evidence on performance is contradictory. While long-term backtests are often positive, a comprehensive analysis of live funds found they have, on average, underperformed by 1% per year since launch.
            </p>
            <InsightBox tone="neg" title="Reality Check">
              The gap between backtest and live performance highlights the risk that launching products can contribute to factor premium decay through &lsquo;factor crowding&rsquo; and increased implementation costs.
            </InsightBox>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">The Hidden Costs and Complexities</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The stated expense ratio is not the total cost. Investors must also account for:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Trading costs from rebalancing",
                "Price impact from front-running",
                "Tax inefficiencies from higher turnover",
                "Bid-ask spreads and liquidity costs"
              ].map((cost, index) => (
                <ChecklistItem key={index} tone="neg">{cost}</ChecklistItem>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Key Criticisms and Investor Caveats</h3>
            <div className="space-y-3">
              {[
                { title: "Smart Marketing, Not Smart Investing", description: "Critics argue smart beta rebrands old factors for higher fees" },
                { title: "Data Mining Risk", description: "Strategies may be the product of backtest-fitting rather than genuine insights" },
                { title: "Factor Crowding", description: "Popular factors may become crowded, reducing future returns and creating crash risk" },
                { title: "Risk Premium, Not Free Lunch", description: "Outperformance may simply reward greater systematic risk rather than superior strategy" }
              ].map((criticism, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 border-l-4 border-gray-300 dark:border-gray-600 rounded">
                  <h4 className="font-serif text-gray-900 dark:text-white mb-1">{criticism.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{criticism.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        {/* Section 8: Economic Regimes */}
        <SectionShell title="Navigating Economic Regimes with Smart Beta">
          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Factor Performance During Recessions and Recoveries</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Historical analysis reveals distinct patterns. During recessions, defensive factors like Quality and Low Volatility tend to outperform. During recoveries, cyclical factors like Value and Size tend to lead the market higher.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">The Impact of Inflationary Environments</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Factor performance also shows patterns relative to inflation. In high inflation, pro-cyclical factors like Value and Momentum have historically performed well. In low inflation, broad equities with trend-following strategies show strong risk-adjusted returns.
            </p>
          </div>

          <TableComponent
            title="Historical Factor Performance Across Economic Regimes"
            headers={["Factor", "Recession", "Recovery", "High Inflation", "Low Inflation"]}
            rows={[
              ["Value", "Mixed (depends on cause)", "Outperforms", "Outperforms", "Neutral/Underperforms"],
              ["Momentum", "Underperforms", "Neutral/Underperforms", "Outperforms", "Neutral"],
              ["Quality", "Outperforms", "Outperforms", "Underperforms", "Outperforms"],
              ["Low Volatility", "Outperforms", "Underperforms", "Underperforms", "Outperforms"],
              ["Size (Small-Cap)", "Underperforms", "Outperforms", "Outperforms", "Neutral/Underperforms"]
            ]}
          />
        </SectionShell>

        {/* Section 9: Conclusion */}
        <SectionShell title="Conclusion and Strategic Recommendations">
          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Synthesizing the Evidence: Key Insights for Investors</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Smart beta is a powerful but complex tool. It offers a systematic way to target drivers of return beyond simple market exposure but comes with significant risks of factor cyclicality, crowding, and implementation costs. Importantly, it shifts the primary active decision&mdash;which investment style to bet on&mdash;to the end investor.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Recommendations for Systematic Traders</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Focus on sophisticated multi-factor construction",
                "Invest in factor timing models",
                "Analyze total implementation costs",
                "Expand factor principles beyond equities"
              ].map((rec, index) => (
                <ChecklistItem key={index} tone="bronze">{rec}</ChecklistItem>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">Recommendations for Personal Investors</h3>
            <div className="p-6 bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10 rounded-lg border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30">
              <h4 className="font-serif text-gray-900 dark:text-white mb-3">Key Success Factors</h4>
              <div className="space-y-2">
                {[
                  "Have clarity of purpose and defined goals",
                  "Start with diversification (multi-factor approach is prudent)",
                  "Use a core-satellite framework for implementation",
                  "Be disciplined and patient (5-10+ year time horizon)",
                  "Avoid behavioral errors—stick with your chosen strategy"
                ].map((factor, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-[#1D8A70] dark:text-[#3CBF9C] h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <InsightBox tone="bronze" title="The Bottom Line">
            Smart beta represents an evolution in investment strategy that can enhance portfolio outcomes when properly understood and implemented. Success requires careful factor selection, disciplined implementation, and most importantly, the patience to maintain your strategy through inevitable periods of underperformance. The greatest risk is not factor risk, but behavioral risk&mdash;the temptation to abandon a sound long-term strategy during temporary setbacks.
          </InsightBox>
        </SectionShell>
      </div>
    </ArticleFrame>
  );
}
