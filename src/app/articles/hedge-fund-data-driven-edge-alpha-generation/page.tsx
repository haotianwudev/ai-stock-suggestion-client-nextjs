'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart, Database, Users, TestTube, BrainCircuit, Scale, Building, Rocket, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper component for icons
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-md mr-4">
    {children}
  </div>
);

// Helper component for colored keyword spans
const Keyword = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => {
  const colorClasses: { [key: string]: string } = {
    blue: 'text-blue-600 dark:text-blue-400',
    teal: 'text-teal-600 dark:text-teal-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    rose: 'text-rose-600 dark:text-rose-400',
  };
  return <span className={`font-semibold ${colorClasses[color]}`}>{children}</span>;
};

// Reusable Accordion/Collapsible Section Component
const AccordionSection = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl mb-6 overflow-hidden transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800"
      >
        <div className="flex items-center">
          <div className="hidden sm:block mr-4 text-blue-500">
            {icon}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 text-left">
            {title}
          </h2>
        </div>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-slate-500" />
        ) : (
          <ChevronDown className="w-6 h-6 text-slate-500" />
        )}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[15000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 md:p-8 bg-white dark:bg-slate-900/70 border-t border-slate-200 dark:border-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
};

// Main Content Components
const ContentBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">{title}</h3>
    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-4">
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
  <div className="my-8 overflow-x-auto">
    <h4 className="text-md font-semibold text-center mb-2 text-slate-700 dark:text-slate-300">
      {caption}
    </h4>
    <div className="min-w-full inline-block align-middle">
      <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-lg">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300"
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
  <AccordionSection 
    title="The Modern Alpha Mandate in Long-Short Equity" 
    icon={<BarChart className="w-8 h-8"/>} 
    defaultOpen={true}
  >
    <ContentBlock title="1.1 Anatomy of Long-Short Strategies">
      <p>
        The <Keyword>long-short equity</Keyword> strategy is an investment approach that involves taking long positions in stocks expected to appreciate while simultaneously taking short positions in stocks expected to decline. This dual approach is designed to profit from both rising and falling markets and, crucially, to mitigate overall market risk. Key variations include:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Market-Neutral Strategies:</strong> Aim for a portfolio <Keyword>beta</Keyword> close to zero by matching long and short positions, isolating manager skill from market movements. The goal is to profit purely from relative value, making money whether the market goes up, down, or sideways. A common example is a "pair trade" (e.g., long Ford, short GM).
        </li>
        <li>
          <strong>Factor-Neutral Strategies:</strong> A more sophisticated approach that hedges out other systematic risk factors like <Keyword color="teal">size, value, and momentum</Keyword> to generate truly <Keyword>idiosyncratic returns</Keyword> (pure alpha). This prevents a fund from simply being long on cheap stocks and short on expensive ones, which is a known risk premium, not a unique skill.
        </li>
        <li>
          <strong>Biased Strategies (e.g., 130/30):</strong> Maintain a net long bias (e.g., 130% long, 30% short) to benefit from general market appreciation while using the short book to generate additional alpha and fund leverage for the long book.
        </li>
      </ul>
    </ContentBlock>

    <ContentBlock title="1.2 Defining the 'Edge': The Contemporary Quest for Alpha">
      <p>
        <Keyword>Alpha (α)</Keyword> is the excess return generated by an investment strategy after accounting for the risk taken. It is the ultimate measure of a manager's skill. The Capital Asset Pricing Model (CAPM) provides the formal definition:
      </p>
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-center my-4 font-mono text-sm md:text-base">
        <p>Alpha = Portfolio Return – Risk-Free Rate – β × (Benchmark Return – Risk-Free Rate)</p>
      </div>
      <p>
        As traditional information sources are rapidly priced into the market, their ability to generate alpha has diminished. The new frontier lies in the discovery and analysis of novel, non-traditional datasets, known as <Keyword color="teal">alternative data</Keyword>, to gain an informational advantage before it becomes common knowledge.
      </p>
    </ContentBlock>
  </AccordionSection>
);

// Section 2: The Retail Investor's Toolkit
const Section2 = () => (
  <AccordionSection title="The Retail Investor's Toolkit" icon={<Users className="w-8 h-8"/>}>
    <ContentBlock title="2.1 Foundational Datasets for Fundamental Analysis">
      <p>Retail investors have access to a wealth of free, public information:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Corporate Filings (SEC EDGAR):</strong> Access to 10-K (annual), 10-Q (quarterly), and 8-K (major event) reports.
        </li>
        <li>
          <strong>Standard Market and Economic Data:</strong> Real-time or delayed stock prices, trading volumes, and key macroeconomic indicators (GDP, CPI).
        </li>
        <li>
          <strong>Corporate Communications:</strong> Press releases, investor presentations, and earnings call transcripts available on company websites.
        </li>
      </ul>
    </ContentBlock>

    <ContentBlock title="2.2 The Pro-Am Arsenal: Advanced Platforms">
      <p>A growing ecosystem of "pro-am" tools offers more advanced capabilities:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Freemium Data APIs:</strong> Platforms like Alpha Vantage and Finnhub provide programmatic access to historical data, technical indicators, and some alternative data.
        </li>
        <li>
          <strong>Advanced Retail Platforms:</strong> Services like TradingView (charting), Seeking Alpha (crowdsourced research), Finviz (stock screening), and Quiver Quantitative (alternative data) empower sophisticated individuals.
        </li>
      </ul>
    </ContentBlock>

    <ContentBlock title="2.3 The Information Disadvantage">
      <p>
        Despite unprecedented access, a significant <Keyword color="rose">information disadvantage</Keyword> persists. The gap is not just about the data, but about the industrial-scale infrastructure to process it. A hedge fund uses <Keyword color="teal">Natural Language Processing (NLP)</Keyword> to analyze every 10-K quantitatively, while a retail investor reads one manually. The "edge" is created in the processing, not the source. This leads to a situation where retail investors may suffer from an <Keyword color="rose">illusion of control</Keyword>, mistaking data access for analytical prowess.
      </p>
      
      <Table
        caption="Table 1: Comparison of Data Access: Retail vs. Institutional"
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
  </AccordionSection>
);

// Section 3: The Institutional Arsenal
const Section3 = () => (
  <AccordionSection title="The Institutional Arsenal: Proprietary & Alternative Datasets" icon={<Building className="w-8 h-8"/>}>
    <ContentBlock title="3.1 The Professional Gateway: Institutional Data Terminals">
      <p>The indispensable gateways to global financial markets, offering unparalleled data depth and connectivity:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Bloomberg Terminal:</strong> The industry standard, costing ~$32,000/user/year. Its value lies in aggregating vast, often obscure data and its ubiquitous messaging system.
        </li>
        <li>
          <strong>LSEG Eikon (formerly Refinitiv):</strong> A powerful competitor, strong in equities and FX.
        </li>
        <li>
          <strong>FactSet:</strong> Favored by analysts for its deep company data and analytical tools.
        </li>
      </ul>
    </ContentBlock>

    <ContentBlock title="3.2 The Alternative Data Revolution">
      <p>
        <Keyword color="teal">Alternative data</Keyword> refers to non-traditional sources used to generate investment insights before they are reflected in conventional data. The <Keyword color="indigo">"mosaic theory"</Keyword> is now practiced on an industrial scale, combining numerous datasets to build a high-conviction view.
      </p>
      
      <Table
        caption="Table 2: Major Alternative Data Categories and Key Vendors"
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

    <ContentBlock title="3.3 The High Cost of an Edge">
      <p>The primary barrier is cost. A mid-sized hedge fund's data budget can easily run into the millions, creating a clear dividing line.</p>
      
      <Table
        caption="Table 3: Estimated Annual Costs of Institutional Data Platforms & Services"
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
  </AccordionSection>
);

// Section 4: From Raw Data to Alpha
const Section4 = () => (
  <AccordionSection title="From Raw Data to Alpha: The Hedge Fund's Operational Framework" icon={<TestTube className="w-8 h-8"/>}>
    <ContentBlock title="4.1 The Modern Data-Driven Team: Quants and Data Scientists">
      <p>
        The modern quantitative hedge fund operates like a high-tech R&D lab, staffed by professionals with blended expertise in finance, statistics, and computer science. They possess skills in Python, R, C++, SQL, database management, <Keyword color="teal">machine learning</Keyword>, and deep financial domain knowledge.
      </p>
    </ContentBlock>

    <ContentBlock title="4.2 The Industrialized Data-to-Signal Pipeline">
      <p>The process of converting raw data into a trade is a systematic, multi-stage pipeline:</p>
      <ol className="list-decimal pl-5 space-y-3">
        <li>
          <strong>Data Acquisition & Ingestion:</strong> Automated systems pull data from disparate sources into a central <Keyword color="indigo">data lake</Keyword> (e.g., Amazon S3).
        </li>
        <li>
          <strong>Data Preparation (Cleansing & Structuring):</strong> The most critical step. It involves handling missing values, correcting errors, and performing <Keyword color="indigo">entity mapping</Keyword> (e.g., linking 'WM,' 'Wal-Mart,' and 'Walmart' from different data sources to the single stock ticker WMT). This is where most of the 'dirty work' happens.
        </li>
        <li>
          <strong>Analysis & Modeling (Alpha Mining):</strong> Quants use specialized platforms and <Keyword color="teal">machine learning (ML/AI)</Keyword> to find predictive signals in the clean data. This involves rigorous <Keyword color="indigo">backtesting</Keyword> to ensure a signal is robust and not a random fluke.
        </li>
        <li>
          <strong>Portfolio Construction & Execution:</strong> Signals are fed into an optimization model to determine position size, and trades are executed algorithmically to minimize market impact.
        </li>
      </ol>
      
      <Table
        caption="Table 4: Common Machine Learning Models in Quantitative Trading"
        headers={["Model Category", "Specific Model(s)", "Primary Use Case", "Example Application"]}
        data={[
          ["Supervised Learning", "XGBoost, Random Forest", "Classification and regression. Ideal for structured data with clear labels.", "Predicting next-day price direction."],
          ["Deep Learning (Time Series)", "LSTM, GRU", "Forecasting based on sequential data. Captures time-based dependencies.", "Predicting future price movements from history."],
          ["Deep Learning (NLP)", "BERT, Transformers", "Sentiment analysis, text classification. Understands context and nuance in language.", "Analyzing sentiment of millions of tweets."],
          ["Reinforcement Learning", "Deep Q-Networks (DQN)", "Optimizing dynamic decision-making. Learns through trial and error.", "Training an agent for optimal trade execution."]
        ]}
      />
    </ContentBlock>

    <ContentBlock title="4.3 Case Study in Practice: A Hypothetical Short Trade on 'StyleCo'">
      <p>A high-conviction short thesis is built by integrating multiple independent datasets, creating a robust <Keyword color="indigo">mosaic</Keyword>:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Web Data (SimilarWeb):</strong> Flags a persistent decline in website traffic.
        </li>
        <li>
          <strong>Transaction Data (YipitData):</strong> Confirms falling sales volume and transaction size, providing a direct read on revenue weeks before official reports.
        </li>
        <li>
          <strong>Geospatial Data (Orbital Insight):</strong> Shows lower truck traffic and parking lot occupancy, a physical-world confirmation of declining business activity.
        </li>
        <li>
          <strong>Sentiment Analysis (NLP):</strong> Detects a spike in negative customer reviews online, pointing to product quality issues that precede customer churn.
        </li>
        <li>
          <strong>Corporate Exhaust (Thinknum):</strong> Finds a freeze in marketing hires but new roles in "supply chain restructuring," signaling a shift from growth to crisis management.
        </li>
      </ul>
    </ContentBlock>
  </AccordionSection>
);

// Section 5: Conclusion
const Section5 = () => (
  <AccordionSection title="Conclusion and Future Outlook" icon={<Rocket className="w-8 h-8"/>}>
    <ContentBlock title="5.1 The Widening Data Divide">
      <p>The institutional advantage is not merely informational but is fundamentally structural, financial, and technological. It can be summarized across three dimensions:</p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <strong>Data Access:</strong> An insurmountable financial barrier to high-cost alternative data.
        </li>
        <li>
          <strong>Analytical Power:</strong> The ability to process petabytes of data with sophisticated ML models and computing clusters.
        </li>
        <li>
          <strong>Operational Scale:</strong> An industrialized end-to-end pipeline for discovering and deploying strategies at scale and speed.
        </li>
      </ol>
    </ContentBlock>

    <ContentBlock title="5.2 The Next Frontier of Alpha">
      <p>The data-driven arms race shows no signs of abating, with key future trends emerging:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>The "Treadmill" of <Keyword color="rose">Alpha Decay</Keyword>:</strong> As datasets become more widely used, their predictive power decays, forcing funds to constantly seek newer, more esoteric data sources to maintain an edge.
        </li>
        <li>
          <strong>The Rise of <Keyword color="teal">Generative AI</Keyword>:</strong> LLMs are being used to augment human analysts, dramatically accelerating research by summarizing reports, drafting memos, and even writing code for initial analysis. The future edge may lie in creating the most effective <Keyword color="indigo">human-AI collaboration</Keyword>, where AI handles the grunt work, freeing humans for creative insights.
        </li>
        <li>
          <strong>The Search for "True" Alternative Data:</strong> The frontier will push into more obscure domains like <Keyword color="teal">IoT sensor data</Keyword>, NLP analysis of internal corporate communications, and the use of <Keyword color="teal">synthetic data</Keyword> to stress-test models.
        </li>
      </ul>
    </ContentBlock>
  </AccordionSection>
);

// Main App Component
export default function HedgeFundDataPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'hedge-fund-data-driven-edge-alpha-generation');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans">
        <header className="bg-white dark:bg-slate-900/70 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="ml-3 text-xl font-bold text-slate-800 dark:text-slate-100">
                  Alpha Intelligence
                </h1>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            {/* Return to Home Button */}
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/" 
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>

            {/* Deep Research Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Deep Research
              </span>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                The Data-Driven Edge
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                A comprehensive analysis of datasets used by hedge funds for alpha generation in long-short equity trading.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-xl shadow-md mb-12 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                Executive Summary
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                This report analyzes the datasets used by hedge funds for long-short equity trading, highlighting the accessibility gap between institutional and retail investors. The generation of <Keyword>alpha</Keyword> is now an industrial-scale process of acquiring, cleansing, and analyzing vast, diverse, and often proprietary <Keyword color="teal">alternative datasets</Keyword>. The true "edge" for hedge funds lies not just in exclusive data, but in the confluence of capital to license it, technology to process it, and specialized talent to model it. This integrated framework creates a formidable barrier to entry, explaining the performance chasm between institutional and retail participants.
              </p>
            </div>

            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Level Up Your Investment Game?</h3>
              <p className="text-lg mb-6">
                Understanding the data divide is the first step to making smarter investment decisions.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Read Full Research Document
                </a>
              )}
            </div>
          </div>
        </main>

        <footer className="bg-white dark:bg-slate-900/70 border-t border-slate-200 dark:border-slate-800 mt-12 py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 dark:text-slate-400">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
            aria-label="Back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  );
}