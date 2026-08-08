'use client';

import { useState } from 'react';
import { ChevronsDown, Briefcase, TrendingUp, TrendingDown, BrainCircuit, BookOpen, Scale, AlertTriangle, Target, Castle, ShieldOff, Feather } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// --- Mock Data (Expanded with details from the research paper) ---
const portfolioData = {
  q1_2025: {
    totalValue: "~$13.2 Million",
    longPositions: 1,
    putPositions: 6,
    callPositions: 0,
    topHolding: { name: "Estée Lauder ($EL)", weight: "100%" },
    largestBearishBet: { name: "Nvidia ($NVDA) Puts", notional: "~$98M" },
    sectorConcentration: "Consumer Staples",
    narrative: "A maximum-bearish stance, liquidating nearly all equities to bet against the market's most speculative sectors: the AI bubble (Nvidia) and the China reopening narrative (BABA, JD). This proved prescient, sidestepping the April 'Liberation Day' tariff sell-off."
  },
  q2_2025: {
    totalValue: "~$56.3 Million",
    longPositions: 6,
    putPositions: 0,
    callPositions: 9,
    topHolding: { name: "Estée Lauder ($EL)", weight: "21.55%" },
    largestBullishBet: { name: "UnitedHealth ($UNH) Calls", notional: "~$109.2M" },
    sectorConcentration: "Healthcare, Consumer Discretionary"
  },
  commonStocks: [
    { ticker: "EL", company: "Estée Lauder Companies Inc.", shares: "150,000", value: "$12,120,000", weight: "21.55%" },
    { ticker: "LULU", company: "Lululemon Athletica Inc.", shares: "50,000", value: "$11,879,000", weight: "21.12%" },
    { ticker: "BRKR", company: "Bruker Corporation", shares: "250,000", value: "$10,300,000", weight: "18.31%" },
    { ticker: "REGN", company: "Regeneron Pharmaceuticals, Inc.", shares: "15,000", value: "$7,875,000", weight: "14.00%" },
    { ticker: "MELI", company: "MercadoLibre, Inc.", shares: "3,000", value: "$7,840,890", weight: "13.94%" },
    { ticker: "UNH", company: "UnitedHealth Group Inc.", shares: "20,000", value: "$6,239,400", weight: "11.09%" }
  ],
  callOptions: [
    { ticker: "UNH", company: "UnitedHealth Group Inc.", notional: "~$109,200,000" },
    { ticker: "REGN", company: "Regeneron Pharmaceuticals, Inc.", notional: "~$105,000,000" },
    { ticker: "LULU", company: "Lululemon Athletica Inc.", notional: "~$95,000,000" },
    { ticker: "META", company: "Meta Platforms, Inc.", notional: "~$73,800,000" },
    { ticker: "EL", company: "Estée Lauder Companies Inc.", notional: "~$40,400,000" },
    { ticker: "JD", company: "JD.com, Inc.", notional: "~$32,600,000" },
    { ticker: "BABA", company: "Alibaba Group Holding Ltd.", notional: "~$28,000,000" },
    { ticker: "ASML", company: "ASML Holding N.V.", notional: "Value not specified" },
    { ticker: "VFC", company: "VF Corporation", notional: "Value not specified" }
  ],
  theses: [
    {
      title: "Healthcare on the Operating Table",
      icon: BrainCircuit,
      color: "blue",
      investments: [
        {
          name: "UnitedHealth Group ($UNH)",
          bearCase: "Stock decimated (~41-60% fall) after management admitted to underestimating medical costs by $6.5B, leading to a catastrophic EPS guidance cut from ~$30 to $16. Compounded by an abrupt CEO departure and a DOJ investigation into billing practices.",
          bullCase: "Classic deep-value play in a market leader. UNH has pricing power to raise 2026 premiums to recover margins. Valuation is at a 10-year low (P/E ~13), attracting other value icons like Buffett and Tepper. Burry's massive call position signals a bet on a significant rerating."
        },
        {
          name: "Regeneron ($REGN)",
          bearCase: "Stock pressured by biosimilar and competitive threats (Roche's Vabysmo) to its blockbuster drug Eylea. Mixed clinical trial results and FDA delays for Eylea HD created further uncertainty about near-term growth.",
          bullCase: "Market is myopically focused on Eylea. The other blockbuster, Dupixent, shows explosive growth (22% YoY sales increase) and is gaining approvals for new, large-market indications like COPD. The company has a formidable pipeline of ~45 candidates, making it a premier R&D engine at a discount."
        }
      ]
    },
    {
      title: "Battered Premium Brands",
      icon: Briefcase,
      color: "purple",
      investments: [
        {
          name: "Lululemon ($LULU)",
          bearCase: "One of the S&P 500's worst performers in 2025 (down ~50% YTD) due to slowing Americas growth (down 2%), rising inventory (up 23%), and margin pressure from tariffs. Increased competition raised concerns about pricing power.",
          bullCase: "Classic market overreaction. International growth remains strong (up 20%), balance sheet is pristine (no debt), and management is aggressively buying back shares ($1.77B over 12 months). The stock trades at a decade-low P/E of ~13.5x, a deep discount on a powerful global brand."
        },
        {
          name: "Estée Lauder ($EL)",
          bearCase: "Catastrophic stock decline of over 80% from its peak, driven by a collapse in net income and a sharp, prolonged weakening of demand in crucial Asian markets, especially China, where it has lost market share.",
          bullCase: "Burry's longest-held conviction play. A bet on the rebound of a legacy luxury brand and a classic 'lipstick effect' defensive play. His Q2 addition of a massive call option position signals a leveraged bet on a significant near-term recovery."
        }
      ]
    },
    {
      title: "Tactical & Growth Plays",
      icon: TrendingUp,
      color: "green",
      investments: [
        {
          name: "MercadoLibre ($MELI)",
          bearCase: "General emerging market risks and exposure to regional economic volatility in Latin America.",
          bullCase: "A long-term bet on the dominant e-commerce and fintech platform in a region with over 650 million people. The company continues to post impressive growth, including a 34% YoY revenue increase and 91% growth in its Mercado Pago credit portfolio."
        },
        {
          name: "Chinese Tech ($BABA, $JD)",
          bearCase: "Geopolitical tensions, regulatory uncertainty in China, and the direct impact of US tariffs on consumer sentiment and business operations.",
          bullCase: "A highly tactical reversal. After being bearish with puts in Q1, Burry established bullish call options in Q2. This suggests he believes the April tariff-induced sell-off created an attractive risk/reward entry point for a short-term trade."
        }
      ]
    }
  ]
};

// --- Components ---
const StatCard = ({ icon, label, value, q1, q2, trend }) => {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-center text-gray-500 mb-2">
        {icon}
        <span className="ml-2 text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="flex justify-between items-end mt-2 text-xs">
        <span className="text-gray-400">Q1: {q1}</span>
        <div className={`flex items-center font-semibold ${trendColor}`}>
          <span className="mr-1">Q2: {q2}</span>
          <TrendIcon size={14} />
        </div>
      </div>
    </div>
  );
};

const ThesisCard = ({ title, icon: Icon, color, investments }) => {
  const [expanded, setExpanded] = useState(false);

  const colorVariants = {
    blue: { border: "border-blue-500/50 hover:border-blue-500", text: "text-blue-600" },
    purple: { border: "border-purple-500/50 hover:border-purple-500", text: "text-purple-600" },
    green: { border: "border-green-500/50 hover:border-green-500", text: "text-green-600" }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-md border ${colorVariants[color].border} rounded-xl p-6 transition-all duration-300 shadow-md`}>
      <div className="flex items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <Icon className={`${colorVariants[color].text} mr-4`} size={28} />
        <h3 className="text-xl font-semibold text-slate-900 flex-grow">{title}</h3>
        <ChevronsDown className={`text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
      </div>
      {expanded && (
        <div className="mt-6 space-y-6">
          {investments.map((inv, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-bold text-lg text-slate-800 mb-2">{inv.name}</h4>
              <div className="space-y-3 text-gray-600 text-sm">
                <div className="flex items-start">
                  <TrendingDown className="text-red-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <p><strong className="text-red-600 font-semibold">The Bear Case:</strong> {inv.bearCase}</p>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                  <p><strong className="text-green-600 font-semibold">Burry&apos;s Likely Bull Case:</strong> {inv.bullCase}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Section = ({ id, title, subtitle, children, bgClass = "bg-transparent" }) => (
  <section id={id} className={`py-16 sm:py-24 ${bgClass}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

const Table = ({ headers, data, type }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map(header => (
            <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {cellIndex === 0 && type === 'common' && <span className="font-bold text-slate-900">{cell}</span>}
                {cellIndex !== 0 || type !== 'common' ? cell : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function BurryAnalysis() {
  return (
    <ArticleFrame slug="michael-burry-q2-2025-portfolio-analysis-cassandra-pivot">
      <div className="bg-gray-50 text-slate-800 font-sans leading-relaxed -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        {/* About Burry Section */}
        <Section id="about" title="Profile of a Contrarian" subtitle="Understanding the mind behind the trades." bgClass="bg-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <p className="text-lg text-gray-700">
                Michael Burry, an M.D. from Vanderbilt turned legendary investor, is renowned for his deep, data-driven analysis and unwavering contrarian convictions. Entirely self-taught, his investment style is, in his own words, &ldquo;100% based on the concept of a margin of safety.&rdquo;
              </p>
              <p className="text-gray-600">
                His fame was cemented by his prescient bet against the 2008 subprime mortgage crisis, chronicled in &ldquo;The Big Short.&rdquo; This defined his public persona as &ldquo;Cassandra&rdquo;&mdash;a prophet of financial doom. He&apos;s known for issuing stark warnings like &ldquo;Sell&rdquo; on Twitter, only to delete his posts moments later, reinforcing his enigmatic and data-driven approach.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <Scale className="text-blue-600 h-8 w-8 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-800">Margin of Safety</h3>
                  <p className="text-gray-600 text-sm">The foundational principle: purchase securities for significantly less than their calculated intrinsic value.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <Feather className="text-blue-600 h-8 w-8 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-800">&ldquo;Road Kill&rdquo; Investing</h3>
                  <p className="text-gray-600 text-sm">Actively seeks unpopular, overlooked companies, aiming to buy when they look like &ldquo;road kill&rdquo; and sell when polished up.</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <BookOpen className="text-blue-600 h-8 w-8 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-800">Forensic Research</h3>
                  <p className="text-gray-600 text-sm">A deep, clinical examination of financials, prioritizing free cash flow over easily manipulated metrics like P/E ratios.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* The Pivot Section */}
        <Section id="pivot" title="The Great Repositioning" subtitle="A 180-degree pivot from maximum bearishness in Q1 to targeted bullishness in Q2 2025.">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="flex items-center text-red-600 mb-3">
                <Castle size={28} className="mr-3"/>
                <h3 className="text-2xl font-bold text-slate-900">Q1: The Fortress</h3>
              </div>
              <p className="text-gray-600">{portfolioData.q1_2025.narrative}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="flex items-center text-green-600 mb-3">
                <ShieldOff size={28} className="mr-3"/>
                <h3 className="text-2xl font-bold text-slate-900">Q2: The Offensive</h3>
              </div>
              <p className="text-gray-600">
                The fortress was completely dismantled. All bearish puts were closed and capital was redeployed into a concentrated portfolio of 6 stocks and 9 bullish call options, targeting beaten-down market leaders.
              </p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<Briefcase size={20} />}
              label="Long Positions"
              value={portfolioData.q2_2025.longPositions}
              q1={portfolioData.q1_2025.longPositions}
              q2={portfolioData.q2_2025.longPositions}
              trend="up"
            />
            <StatCard
              icon={<TrendingDown size={20} />}
              label="Put Positions"
              value={portfolioData.q2_2025.putPositions}
              q1={portfolioData.q1_2025.putPositions}
              q2={portfolioData.q2_2025.putPositions}
              trend="down"
            />
            <StatCard
              icon={<TrendingUp size={20} />}
              label="Call Positions"
              value={portfolioData.q2_2025.callPositions}
              q1={portfolioData.q1_2025.callPositions}
              q2={portfolioData.q2_2025.callPositions}
              trend="up"
            />
            <StatCard
              icon={<Scale size={20} />}
              label="Reported Value"
              value={portfolioData.q2_2025.totalValue}
              q1={portfolioData.q1_2025.totalValue}
              q2={portfolioData.q2_2025.totalValue}
              trend="up"
            />
          </div>
        </Section>

        {/* Holdings Section */}
        <Section id="holdings" title="Scion's Q2 2025 Portfolio" subtitle="A detailed breakdown of the new high-conviction bets." bgClass="bg-gray-100">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-left">Common Stock Holdings</h3>
              <Table
                headers={["Ticker", "Company", "Shares", "Market Value", "Portfolio Weight"]}
                data={portfolioData.commonStocks}
                type="common"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-left">Leveraged Bets: Call Options</h3>
              <Table
                headers={["Ticker", "Company", "Notional Value"]}
                data={portfolioData.callOptions}
                type="options"
              />
            </div>
          </div>
        </Section>

        {/* Theses Section */}
        <Section id="theses" title="Anatomy of Conviction" subtitle="Deconstructing the rationale behind Burry&apos;s key investments.">
          <div className="space-y-8">
            {portfolioData.theses.map((thesis, index) => (
              <ThesisCard key={index} {...thesis} />
            ))}
          </div>
        </Section>

        {/* Conclusion Section */}
        <Section id="conclusion" title="The Verdict" subtitle="What does this dramatic shift signal about Burry&apos;s market outlook?" bgClass="bg-gray-100">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center text-blue-600 mb-4">
              <Target size={28} className="mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">From Macro-Bear to Micro-Bull</h3>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Michael Burry is no longer positioned for a systemic market crash. He has shifted from a top-down, macro-focused bearishness to a bottom-up, micro-focused bullishness, picking through the wreckage of what he appears to view as a targeted correction.
              </p>
              <div className="flex items-start p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="text-red-500 h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-red-700">Concentration &amp; Leverage Risk</h4>
                  <p className="text-sm text-red-900">
                    This new portfolio carries significant idiosyncratic risk. It is highly concentrated in challenged sectors and uses extensive leverage via call options, which require correct timing to be profitable. This is a high-stakes bet on a recovery in specific, beaten-down names.
                  </p>
                </div>
              </div>
              <p className="font-semibold text-slate-800">
                Final Assessment: The Cassandra has ceased his warnings of a broad storm and has begun to sift through the rubble, having identified the specific targets he believes will rise again.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </ArticleFrame>
  );
}
