'use client';

import { BarChart, Users, TestTube, Building, Rocket } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Helper component for colored keyword spans
const Keyword = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => {
  const colorClasses: { [key: string]: string } = {
    blue: 'text-[#A8672E] dark:text-[#D08F52]',
    teal: 'text-[#A8672E] dark:text-[#D08F52]',
    indigo: 'text-[#A8672E] dark:text-[#D08F52]',
    rose: 'text-[#BC4128] dark:text-[#E2694A]',
  };
  return <span className={`font-semibold ${colorClasses[color]}`}>{children}</span>;
};

// Simple Section Component
const Section = ({
  title,
  icon,
  children
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl mb-6 overflow-hidden shadow-sm">
      <div className="p-6 bg-white dark:bg-[#0A0D14]">
        <div className="flex items-center mb-6">
          <div className="hidden sm:block mr-4 text-[#A8672E] dark:text-[#D08F52]">
            {icon}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 font-serif">
            {title}
          </h2>
        </div>
        <div className="bg-white dark:bg-[#0A0D14] p-6 md:p-8 rounded-lg border border-slate-200 dark:border-slate-800">
          {children}
        </div>
      </div>
    </div>
  );
};

// Main Content Components
const ContentBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-[#A8672E] dark:text-[#D08F52] mb-3 font-serif">{title}</h3>
    <div className="prose prose-slate max-w-none text-slate-600 dark:text-slate-400 space-y-4">
      {children}
    </div>
  </div>
);

const Table = ({
  headers,
  data,
  caption
}: {
  headers: string[];
  data: string[][];
  caption: string;
}) => (
  <div className="my-8">
    <h4 className="text-md font-semibold text-center mb-4 text-slate-700 dark:text-slate-300">
      {caption}
    </h4>
    <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 dark:bg-[#14171B]">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:bg-[#0A0D14]">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50 dark:bg-[#14171B]">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-3 md:px-6 py-4 text-sm text-slate-600 dark:text-slate-400 break-words"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Section 1: The Modern Alpha Mandate
const Section1 = () => (
  <Section
    title="The Modern Alpha Mandate in Long-Short Equity"
    icon={<BarChart className="w-8 h-8"/>}
  >
    <ContentBlock title="Anatomy of Long-Short Strategies">
      <p>
        <Keyword>Long-short equity</Keyword> strategies involve taking long positions in stocks expected to appreciate while simultaneously shorting stocks expected to decline. This dual approach profits from both rising and falling markets while mitigating overall market risk through three primary variations:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Market-Neutral</h4>
          <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
            Portfolio <Keyword>beta</Keyword> near zero by matching long/short positions, isolating manager skill from market movements. Profits from relative value regardless of market direction.
          </p>
        </div>
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-teal-200">
          <h4 className="font-semibold text-teal-800 mb-2">Factor-Neutral</h4>
          <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
            Hedges out systematic risk factors like <Keyword color="teal">size, value, and momentum</Keyword> to generate pure <Keyword>idiosyncratic returns</Keyword> (true alpha).
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">Biased (130/30)</h4>
          <p className="text-sm text-purple-700">
            Maintains net long bias while using short book to generate additional alpha and fund leverage for long positions.
          </p>
        </div>
      </div>
    </ContentBlock>

    <ContentBlock title="The Contemporary Quest for Alpha">
      <p>
        <Keyword>Alpha (α)</Keyword> represents excess return after accounting for risk&mdash;the ultimate measure of manager skill. The CAPM formula defines it as:
      </p>
      <div className="bg-slate-100 p-4 rounded-lg text-center my-4 font-mono text-sm md:text-base">
        <p>Alpha = Portfolio Return – Risk-Free Rate – β × (Benchmark Return – Risk-Free Rate)</p>
      </div>
      <p>
        Traditional information sources are rapidly priced into markets, diminishing their alpha-generating potential. The new frontier lies in <Keyword color="teal">alternative data</Keyword>&mdash;novel, non-traditional datasets that provide informational advantages before they become common knowledge.
      </p>
    </ContentBlock>
  </Section>
);

// Section 2: The Retail Investor's Toolkit
const Section2 = () => (
  <Section title="The Retail Investor's Toolkit" icon={<Users className="w-8 h-8"/>}>
    <ContentBlock title="Foundational Datasets for Fundamental Analysis">
      <p>Retail investors access substantial free, public information through multiple channels:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">Corporate Filings</h4>
          <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">
            SEC EDGAR provides 10-K (annual), 10-Q (quarterly), and 8-K (major event) reports with comprehensive financial data.
          </p>
        </div>
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Market Data</h4>
          <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
            Real-time or delayed stock prices, trading volumes, and macroeconomic indicators (GDP, CPI) through various platforms.
          </p>
        </div>
      </div>
    </ContentBlock>

    <ContentBlock title="The Pro-Am Arsenal: Advanced Platforms">
      <p>A growing ecosystem of &ldquo;pro-am&rdquo; tools offers sophisticated capabilities bridging retail and institutional access:</p>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Alpha Vantage</span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">TradingView</span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Seeking Alpha</span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Finviz</span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Quiver Quantitative</span>
      </div>
    </ContentBlock>

    <ContentBlock title="The Information Disadvantage">
      <p>
        Despite unprecedented access, a significant <Keyword color="rose">information disadvantage</Keyword> persists. The gap isn&apos;t about data availability but industrial-scale processing infrastructure. Hedge funds use <Keyword color="teal">Natural Language Processing (NLP)</Keyword> to analyze every 10-K quantitatively while retail investors read manually. The &ldquo;edge&rdquo; emerges from processing capability, not source access, creating an <Keyword color="rose">illusion of control</Keyword> where data access is mistaken for analytical prowess.
      </p>

      <Table
        caption="Retail vs. Institutional Data Access Comparison"
        headers={["Feature", "Typical Retail Access", "Typical Institutional Access", "Key Differentiator"]}
        data={[
          ["Market Data", "Real-time Level 1, delayed data.", "Real-time, full-depth (Level 2/3) market book.", "Granularity and latency."],
          ["Corporate Filings", "Manual access via SEC website.", "API-driven, NLP-parsed data feeds.", "Scale and speed of analysis."],
          ["Analyst Research", "Public summaries, crowdsourced analysis.", "Direct access to sell-side analysts.", "Depth of access and direct interaction."],
          ["Alternative Data", "Limited free sources (e.g., Quiver).", "Subscriptions to dozens of proprietary datasets.", "Breadth, depth, and exclusivity."],
          ["Data Infrastructure", "Personal computer, Python scripts.", "Cloud-based data lakes, low-latency clusters.", "Industrial-scale infrastructure."],
          ["Annual Cost", "< $1,000", "> $1,000,000", "Immense financial barrier to entry."]
        ]}
      />
    </ContentBlock>
  </Section>
);

// Section 3: The Institutional Arsenal
const Section3 = () => (
  <Section title="The Institutional Arsenal: Proprietary & Alternative Datasets" icon={<Building className="w-8 h-8"/>}>
    <ContentBlock title="Professional Gateway: Institutional Data Terminals">
      <p>Indispensable gateways to global financial markets offering unparalleled data depth and connectivity:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">Bloomberg Terminal</h4>
          <p className="text-sm text-[#BC4128] dark:text-[#E2694A]">
            Industry standard at ~$32,000/user/year. Value lies in aggregating vast, obscure data and ubiquitous messaging system.
          </p>
        </div>
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-teal-200">
          <h4 className="font-semibold text-teal-800 mb-2">LSEG Eikon</h4>
          <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
            Powerful competitor, particularly strong in equities and FX markets with comprehensive analytics.
          </p>
        </div>
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2">FactSet</h4>
          <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
            Favored by analysts for deep company data and sophisticated analytical tools.
          </p>
        </div>
      </div>
    </ContentBlock>

    <ContentBlock title="The Alternative Data Revolution">
      <p>
        <Keyword color="teal">Alternative data</Keyword> encompasses non-traditional sources generating investment insights before reflection in conventional data. The <Keyword color="indigo">&ldquo;mosaic theory&rdquo;</Keyword> operates at industrial scale, combining numerous datasets for high-conviction views.
      </p>

      <Table
        caption="Major Alternative Data Categories and Key Vendors"
        headers={["Data Category", "Description & Use Case", "Key Vendors", "Insightfulness / Cost"]}
        data={[
          ["Consumer Transaction", "Anonymized credit/debit card data to forecast revenues. This is a powerful leading indicator for earnings.", "YipitData, M Science, Consumer Edge", "High / Very High"],
          ["Web Traffic & Usage", "Data on website visits, app downloads, and engagement. Excellent for gauging the health of digital-first businesses.", "SimilarWeb, Thinknum", "High / High"],
          ["Satellite & Geospatial", "Imagery and location data to monitor physical activity (e.g., cars in parking lots, factory output).", "Orbital Insight, SafeGraph", "High / High"],
          ["Sentiment Analysis", "NLP analysis of news, social media, and reviews to quantify mood, a key behavioral driver of price.", "RavenPack, AlphaSense", "Medium-High / Medium-High"],
          ["Corporate Exhaust", "Byproduct data like job postings or patent filings. Hiring trends are a strong signal of strategic direction.", "Thinknum, Quandl", "Medium / Medium"],
          ["ESG Data", "Data from non-company sources to assess ESG risks, moving beyond self-reported metrics.", "ISS ESG, RepRisk", "Medium / Medium"]
        ]}
      />
    </ContentBlock>

    <ContentBlock title="The High Cost of an Edge">
      <p>Cost creates the primary barrier, with mid-sized hedge fund data budgets easily reaching millions, establishing clear market dividing lines.</p>

      <Table
        caption="Estimated Annual Costs of Institutional Data Platforms & Services"
        headers={["Service/Platform", "Provider", "Estimated Annual Cost", "Target User"]}
        data={[
          ["Bloomberg Terminal", "Bloomberg L.P.", "~$32,000 per user", "Institutional Traders, Analysts"],
          ["LSEG Eikon", "LSEG", "~$15,000 - $23,000 per user", "Institutional Traders, Analysts"],
          ["FactSet", "FactSet", "~$12,000 - $45,000+ per user/firm", "Fundamental Analysts, Quants"],
          ["Thinknum", "Thinknum", "~$16,800 per user", "Quants, Fundamental Analysts"],
          ["SimilarWeb (Business)", "SimilarWeb", "~$35,000+ per firm", "Market Researchers, Quants"],
          ["High-End Credit Card Data", "YipitData, M Science, etc.", "$250,000 - $1,500,000+", "Quantitative Hedge Funds"]
        ]}
      />
    </ContentBlock>
  </Section>
);

// Section 4: From Raw Data to Alpha
const Section4 = () => (
  <Section title="From Raw Data to Alpha: The Hedge Fund's Operational Framework" icon={<TestTube className="w-8 h-8"/>}>
    <ContentBlock title="The Modern Data-Driven Team">
      <p>
        Modern quantitative hedge funds operate like high-tech R&amp;D labs, staffed by professionals with blended expertise in finance, statistics, and computer science. Teams possess skills in Python, R, C++, SQL, database management, <Keyword color="teal">machine learning</Keyword>, and deep financial domain knowledge.
      </p>
    </ContentBlock>

    <ContentBlock title="The Industrialized Data-to-Signal Pipeline">
      <p>Converting raw data into trades follows a systematic, multi-stage pipeline:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Data Acquisition &amp; Ingestion</h4>
          <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
            Automated systems pull data from disparate sources into central <Keyword color="indigo">data lakes</Keyword> (e.g., Amazon S3).
          </p>
        </div>
        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">Data Preparation</h4>
          <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">
            Critical cleansing and structuring, handling missing values, correcting errors, and performing <Keyword color="indigo">entity mapping</Keyword>.
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">Analysis &amp; Modeling</h4>
          <p className="text-sm text-purple-700">
            Quants use specialized platforms and <Keyword color="teal">machine learning</Keyword> to find predictive signals with rigorous <Keyword color="indigo">backtesting</Keyword>.
          </p>
        </div>
        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">Portfolio Construction</h4>
          <p className="text-sm text-[#BC4128] dark:text-[#E2694A]">
            Signals feed optimization models determining position size, with algorithmic execution minimizing market impact.
          </p>
        </div>
      </div>

      <Table
        caption="Common Machine Learning Models in Quantitative Trading"
        headers={["Model Category", "Specific Model(s)", "Primary Use Case", "Example Application"]}
        data={[
          ["Supervised Learning", "XGBoost, Random Forest", "Classification and regression. Ideal for structured data with clear labels.", "Predicting next-day price direction."],
          ["Deep Learning (Time Series)", "LSTM, GRU", "Forecasting based on sequential data. Captures time-based dependencies.", "Predicting future price movements from history."],
          ["Deep Learning (NLP)", "BERT, Transformers", "Sentiment analysis, text classification. Understands context and nuance in language.", "Analyzing sentiment of millions of tweets."],
          ["Reinforcement Learning", "Deep Q-Networks (DQN)", "Optimizing dynamic decision-making. Learns through trial and error.", "Training an agent for optimal trade execution."]
        ]}
      />
    </ContentBlock>

    <ContentBlock title="Case Study: A Hypothetical Short Trade on 'StyleCo'">
      <p>High-conviction short thesis built by integrating multiple independent datasets, creating a robust <Keyword color="indigo">mosaic</Keyword>:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-red-200">
          <h5 className="font-semibold text-red-800 text-sm mb-1">Web Data</h5>
          <p className="text-xs text-[#BC4128] dark:text-[#E2694A]">SimilarWeb flags persistent website traffic decline</p>
        </div>
        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-orange-200">
          <h5 className="font-semibold text-orange-800 text-sm mb-1">Transaction Data</h5>
          <p className="text-xs text-[#BC4128] dark:text-[#E2694A]">YipitData confirms falling sales volume and transaction size</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <h5 className="font-semibold text-purple-800 text-sm mb-1">Geospatial Data</h5>
          <p className="text-xs text-purple-700">Lower truck traffic and parking lot occupancy</p>
        </div>
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-3 rounded-lg border border-blue-200">
          <h5 className="font-semibold text-blue-800 text-sm mb-1">Sentiment Analysis</h5>
          <p className="text-xs text-[#A8672E] dark:text-[#D08F52]">Spike in negative customer reviews indicating quality issues</p>
        </div>
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-3 rounded-lg border border-teal-200">
          <h5 className="font-semibold text-teal-800 text-sm mb-1">Corporate Exhaust</h5>
          <p className="text-xs text-[#A8672E] dark:text-[#D08F52]">Hiring freeze in marketing, new &ldquo;supply chain restructuring&rdquo; roles</p>
        </div>
      </div>
    </ContentBlock>
  </Section>
);

// Section 5: Conclusion
const Section5 = () => (
  <Section title="Conclusion and Future Outlook" icon={<Rocket className="w-8 h-8"/>}>
    <ContentBlock title="The Widening Data Divide">
      <p>The institutional advantage transcends mere information access&mdash;it&apos;s fundamentally structural, financial, and technological, summarized across three critical dimensions:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-red-200">
          <h4 className="font-semibold text-red-800 mb-2">Data Access</h4>
          <p className="text-sm text-[#BC4128] dark:text-[#E2694A]">
            Insurmountable financial barriers to high-cost alternative data sources.
          </p>
        </div>
        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">Analytical Power</h4>
          <p className="text-sm text-[#BC4128] dark:text-[#E2694A]">
            Capability to process petabytes with sophisticated ML models and computing clusters.
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">Operational Scale</h4>
          <p className="text-sm text-purple-700">
            Industrialized end-to-end pipeline for discovering and deploying strategies at scale and speed.
          </p>
        </div>
      </div>
    </ContentBlock>

    <ContentBlock title="The Next Frontier of Alpha">
      <p>The data-driven arms race accelerates with key emerging trends:</p>
      <div className="space-y-4 mt-4">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg border border-rose-200">
          <h4 className="font-semibold text-rose-800 mb-2">The &ldquo;Treadmill&rdquo; of <Keyword color="rose">Alpha Decay</Keyword></h4>
          <p className="text-sm text-[#BC4128] dark:text-[#E2694A]">
            As datasets become widely used, predictive power decays, forcing constant pursuit of newer, more esoteric data sources.
          </p>
        </div>
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-200">
          <h4 className="font-semibold text-teal-800 mb-2">The Rise of <Keyword color="teal">Generative AI</Keyword></h4>
          <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
            LLMs augment human analysts, accelerating research through report summarization, memo drafting, and code generation. Future edge lies in effective <Keyword color="indigo">human-AI collaboration</Keyword>.
          </p>
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2">The Search for &ldquo;True&rdquo; Alternative Data</h4>
          <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
            Frontier pushes into <Keyword color="teal">IoT sensor data</Keyword>, NLP analysis of internal corporate communications, and <Keyword color="teal">synthetic data</Keyword> for model stress-testing.
          </p>
        </div>
      </div>
    </ContentBlock>
  </Section>
);

export default function HedgeFundDataPage() {
  return (
    <ArticleFrame slug="hedge-fund-data-driven-edge-alpha-generation">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mb-8">
          A comprehensive analysis of datasets used by hedge funds for alpha generation in long-short equity trading.
        </p>

        <InfographicSlot alt="Hedge Fund Data-Driven Edge Infographic" />

        {/* Executive Summary */}
        <div className="bg-white dark:bg-[#0A0D14] p-6 md:p-8 rounded-xl shadow-md mb-12 mt-12 border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">
            Executive Summary
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            This report analyzes the datasets used by hedge funds for long-short equity trading, highlighting the accessibility gap between institutional and retail investors. The generation of <Keyword>alpha</Keyword> is now an industrial-scale process of acquiring, cleansing, and analyzing vast, diverse, and often proprietary <Keyword color="teal">alternative datasets</Keyword>. The true &ldquo;edge&rdquo; for hedge funds lies not just in exclusive data, but in the confluence of capital to license it, technology to process it, and specialized talent to model it. This integrated framework creates a formidable barrier to entry, explaining the performance chasm between institutional and retail participants.
          </p>
        </div>

        {/* Article Sections */}
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
    </ArticleFrame>
  );
}
