'use client';

import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Briefcase, Play, Bot, Zap, Cpu, Search, Scale, TestTube, ChevronsRight, Target, Telescope, Atom, Infinity, BarChart, FileText, ShieldCheck, TrendingUp, Code2, ListChecks, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function QuantWorkflowPage() {
  const currentArticle = articles.find(article => article.slug === 'anatomy-quant-fund-alpha-discovery-automated-execution');
  
  const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="font-semibold text-blue-600">{children}</span>
  );

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
      
      <div className="bg-gray-50 text-gray-800 font-sans">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <HeroSection />
          <div className="space-y-24">
            <AlphaGenerationSection Highlight={Highlight} />
            <PortfolioConstructionSection Highlight={Highlight} />
            <BacktestingSection Highlight={Highlight} />
            <ExecutionSection Highlight={Highlight} />
            <TechnologyStackSection Highlight={Highlight} />
            <PerpetualChallengeSection Highlight={Highlight} />
          </div>
          
          {/* Call to Action Section */}
          <div className="mt-16 text-center bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Explore More Quantitative Finance Content
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Dive deeper into systematic trading strategies, risk management techniques, and the latest developments in quantitative finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
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
        </main>
        <Footer />
      </div>
    </>
  );
}

// Header Component
const Header = () => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Zap className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">QuantFlow</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#alpha" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">Alpha</a>
          <a href="#portfolio" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">Portfolio</a>
          <a href="#backtesting" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">Backtesting</a>
          <a href="#execution" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">Execution</a>
        </nav>
      </div>
    </div>
  </header>
);

// Hero Section Component
const HeroSection = () => (
  <section className="text-center py-16 sm:py-24 relative">
    {/* Badges */}
    <div className="absolute top-0 left-0">
      <span className="inline-block bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
        Deep Research
      </span>
    </div>
    <div className="absolute top-0 right-0">
      <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
        Podcast
      </span>
    </div>
    
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter mb-4">
      The Anatomy of a Quant Fund
    </h1>
    <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
      Explore the end-to-end systematic workflow that transforms complex data into market-neutral returns, 
      from initial idea generation to automated, low-latency execution.
    </p>
  </section>
);

// Section Component Wrapper
const WorkflowSection = ({ 
  id, 
  icon, 
  title, 
  subtitle, 
  children 
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="py-12">
    <div className="text-center mb-12">
      <div className="inline-block p-4 bg-blue-100 border border-blue-200 rounded-full mb-4">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
      <p className="text-md text-blue-600 font-semibold">{subtitle}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  </section>
);

// Info Card Component with bullet points
const InfoCard = ({ 
  icon, 
  title, 
  children 
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
    <div className="flex items-center space-x-3 mb-4">
      <div className="text-blue-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="text-sm text-gray-600 leading-relaxed space-y-2 flex-grow">
      {children}
    </div>
  </div>
);

// Part 1: Alpha Generation
const AlphaGenerationSection = ({ Highlight }: { Highlight: React.ComponentType<{ children: React.ReactNode }> }) => (
  <WorkflowSection
    id="alpha"
    icon={<BrainCircuit className="h-8 w-8 text-blue-600" />}
    title="Pillar I: Alpha Discovery & Research"
    subtitle="The Search for Predictive Signals"
  >
    <InfoCard icon={<Search className="h-5 w-5" />} title="Data Collection & Sourcing">
      <ul className="list-disc list-inside space-y-2">
        <li>The foundation is built on vast, diverse datasets beyond simple price/volume.</li>
        <li>Sources include <Highlight>fundamental data</Highlight> (earnings reports, balance sheets), market data, and a growing universe of <Highlight>alternative data</Highlight>.</li>
        <li>Alternative data provides an edge: satellite imagery, credit card transactions, geolocation data, and news sentiment analysis.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<Atom className="h-5 w-5" />} title="Feature Engineering">
      <ul className="list-disc list-inside space-y-2">
        <li>Raw data is cleaned, normalized, and transformed into meaningful predictive variables known as <Highlight>"alpha factors"</Highlight>.</li>
        <li>Examples include creating momentum indicators, volatility forecasts, or ratios from fundamental data.</li>
        <li>This is often the most time-consuming step, requiring significant <Highlight>domain expertise</Highlight> and creativity.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<Cpu className="h-5 w-5" />} title="Model Selection & Training">
      <ul className="list-disc list-inside space-y-2">
        <li>A suite of ML models is tested for predictive power, including <Highlight>XGBoost</Highlight>, LightGBM, and Deep Learning models like <Highlight>LSTMs</Highlight> for time-series.</li>
        <li>Models are rigorously trained on a historical dataset and validated on a separate <Highlight>out-of-sample</Highlight> dataset to prevent <Highlight>overfitting</Highlight>.</li>
        <li>Techniques like <Highlight>cross-validation</Highlight> are employed to ensure the model's robustness and generalizability to new market data.</li>
      </ul>
    </InfoCard>
  </WorkflowSection>
);

// Part 2: Portfolio Construction
const PortfolioConstructionSection = ({ Highlight }: { Highlight: React.ComponentType<{ children: React.ReactNode }> }) => (
  <WorkflowSection
    id="portfolio"
    icon={<Briefcase className="h-8 w-8 text-blue-600" />}
    title="Pillar II: Portfolio Construction & Risk Management"
    subtitle="Translating Signals into a Cohesive Strategy"
  >
    <InfoCard icon={<Scale className="h-5 w-5" />} title="Long-Short Strategy">
      <ul className="list-disc list-inside space-y-2">
        <li>Signals from the model are used to form a <Highlight>market-neutral</Highlight> portfolio.</li>
        <li>Top-ranked assets are bought (<Highlight>long positions</Highlight>), while bottom-ranked assets are sold short (<Highlight>short positions</Highlight>).</li>
        <li>The goal is to generate returns from stock-picking skill (<Highlight>alpha</Highlight>) regardless of the overall market's direction.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<ShieldCheck className="h-5 w-5" />} title="Systematic Risk Hedging">
      <ul className="list-disc list-inside space-y-2">
        <li>A sophisticated <Highlight>risk model</Highlight> (e.g., BARRA, Axioma) is used to identify and neutralize unintended factor exposures.</li>
        <li>The portfolio is optimized to have minimal exposure to common risk factors like <Highlight>Value, Growth, Momentum</Highlight>, and industry sectors.</li>
        <li>This ensures the return stream is pure, idiosyncratic alpha, not just hidden market beta.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<Target className="h-5 w-5" />} title="Optimal Position Sizing">
      <ul className="list-disc list-inside space-y-2">
        <li>Position sizes are determined algorithmically based on a set of constraints and objectives.</li>
        <li>Inputs include the alpha signal's strength, the asset's expected volatility, and its correlation with other assets.</li>
        <li>Techniques like <Highlight>mean-variance optimization</Highlight> are used to construct the most efficient portfolio possible.</li>
      </ul>
    </InfoCard>
  </WorkflowSection>
);

// Part 3: Backtesting
const BacktestingSection = ({ Highlight }: { Highlight: React.ComponentType<{ children: React.ReactNode }> }) => (
  <WorkflowSection
    id="backtesting"
    icon={<TestTube className="h-8 w-8 text-blue-600" />}
    title="Pillar III: Rigorous Historical Simulation"
    subtitle="Validating Strategy Performance Before Deployment"
  >
    <InfoCard icon={<ListChecks className="h-5 w-5" />} title="Realistic Simulation">
      <ul className="list-disc list-inside space-y-2">
        <li>The strategy is simulated on high-fidelity, <Highlight>point-in-time</Highlight> historical data.</li>
        <li>Crucially, the backtest must account for real-world <Highlight>market frictions</Highlight>.</li>
        <li>This includes <Highlight>transaction costs</Highlight> (commissions, fees), <Highlight>slippage</Highlight> (price impact), and financing costs for short positions.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<ChevronsRight className="h-5 w-5" />} title="Avoiding Common Biases">
      <ul className="list-disc list-inside space-y-2">
        <li>Vigilance is required to avoid biases that produce deceptively good results.</li>
        <li>Key pitfalls include <Highlight>lookahead bias</Highlight> (using future information), <Highlight>survivorship bias</Highlight> (ignoring delisted stocks), and <Highlight>data snooping</Highlight> (overfitting the strategy to historical data).</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<TrendingUp className="h-5 w-5" />} title="Performance Evaluation">
      <ul className="list-disc list-inside space-y-2">
        <li>Results are scrutinized with a battery of metrics to assess both performance and risk.</li>
        <li>Key metrics include the <Highlight>Sharpe Ratio</Highlight> (risk-adjusted return), <Highlight>Max Drawdown</Highlight>, Calmar Ratio, and Information Ratio.</li>
        <li>Statistical tests are used to determine if the alpha generated is statistically significant.</li>
      </ul>
    </InfoCard>
  </WorkflowSection>
);

// Part 4: Execution
const ExecutionSection = ({ Highlight }: { Highlight: React.ComponentType<{ children: React.ReactNode }> }) => (
  <WorkflowSection
    id="execution"
    icon={<Play className="h-8 w-8 text-blue-600" />}
    title="Pillar IV: Automated Execution"
    subtitle="Minimizing Costs and Market Impact"
  >
    <InfoCard icon={<Cpu className="h-5 w-5" />} title="Automated Trading Systems">
      <ul className="list-disc list-inside space-y-2">
        <li>The live strategy is run by a high-performance, <Highlight>low-latency</Highlight> automated trading system.</li>
        <li>These systems are designed for reliability and speed, executing trades with minimal human intervention.</li>
        <li>Often co-located in data centers near exchanges to reduce network delay.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<Zap className="h-5 w-5" />} title="Algorithmic Execution">
      <ul className="list-disc list-inside space-y-2">
        <li>Large "parent" orders are broken into smaller "child" orders to minimize <Highlight>market impact</Highlight>.</li>
        <li>Execution algorithms like <Highlight>VWAP</Highlight> (Volume-Weighted Average Price) and <Highlight>TWAP</Highlight> (Time-Weighted Average Price) are used to trade stealthily.</li>
        <li>More advanced algorithms adapt to market conditions in real-time.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<BarChart className="h-5 w-5" />} title="Transaction Cost Analysis (TCA)">
      <ul className="list-disc list-inside space-y-2">
        <li>Post-trade, every execution is analyzed to measure its quality and cost.</li>
        <li>TCA reports compare the achieved trade price against various benchmarks (e.g., arrival price).</li>
        <li>This feedback loop is crucial for refining execution algorithms and reducing costs over time.</li>
      </ul>
    </InfoCard>
  </WorkflowSection>
);

// Technology Stack Section
const TechnologyStackSection = ({ Highlight }: { Highlight: React.ComponentType<{ children: React.ReactNode }> }) => (
  <section id="tech-stack" className="py-12">
    <div className="text-center mb-12">
      <div className="inline-block p-4 bg-blue-100 border border-blue-200 rounded-full mb-4">
        <Code2 className="h-8 w-8 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">The Technology Stack</h2>
      <p className="text-md text-blue-600 font-semibold">The Infrastructure Powering a Modern Quant Fund</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <TechCard title="Languages">
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-2 text-left">
          <li><Highlight>Python</Highlight>: Dominant for research, data analysis, and model prototyping (Pandas, NumPy, Scikit-learn).</li>
          <li><Highlight>C++ / Rust</Highlight>: Used for high-performance, low-latency components like execution systems and backtesters.</li>
        </ul>
      </TechCard>

      <TechCard title="Data & Databases">
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-2 text-left">
          <li>Time-series databases like <Highlight>KDB+/q</Highlight> or <Highlight>DolphinDB</Highlight> are popular for market data.</li>
          <li>Cloud data lakes (<Highlight>AWS S3</Highlight>) and warehouses (<Highlight>Snowflake</Highlight>) store vast alternative datasets.</li>
        </ul>
      </TechCard>

      <TechCard title="Backtesting Frameworks">
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-2 text-left">
          <li>Open-source libraries (<Highlight>Zipline</Highlight>, <Highlight>VectorBT</Highlight>) for rapid prototyping.</li>
          <li>Most firms build <Highlight>proprietary, high-fidelity simulators</Highlight> in C++ or Rust for ultimate realism and performance.</li>
        </ul>
      </TechCard>

      <TechCard title="Cloud & Compute">
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-2 text-left">
          <li><Highlight>AWS, GCP, and Azure</Highlight> provide the scalable compute for model training and large-scale simulations.</li>
          <li>Distributed computing frameworks like <Highlight>Dask</Highlight> or <Highlight>Ray</Highlight> parallelize research tasks across clusters.</li>
        </ul>
      </TechCard>
    </div>
  </section>
);

const TechCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col">
    <h3 className="font-bold text-gray-900 mb-2 text-center">{title}</h3>
    <div>{children}</div>
  </div>
);

// Part 5: The Perpetual Challenge
const PerpetualChallengeSection = ({ Highlight }: { Highlight: React.ComponentType<{ children: React.ReactNode }> }) => (
  <WorkflowSection
    id="challenge"
    icon={<Infinity className="h-8 w-8 text-blue-600" />}
    title="The Perpetual Challenge: Staying Ahead"
    subtitle="Sustaining an Edge in a Competitive Environment"
  >
    <InfoCard icon={<Zap className="h-5 w-5" />} title="Alpha Decay">
      <ul className="list-disc list-inside space-y-2">
        <li>The core challenge is <Highlight>"alpha decay"</Highlight>—the natural erosion of a strategy's effectiveness as markets adapt.</li>
        <li>As signals become well-known or crowded, their predictive power diminishes over time.</li>
        <li>This necessitates a continuous, proactive research effort to find new sources of alpha.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<Telescope className="h-5 w-5" />} title="The Research Pipeline">
      <ul className="list-disc list-inside space-y-2">
        <li>Top funds operate as <Highlight>"alpha factories,"</Highlight> with an industrial-grade research and development process.</li>
        <li>They build a scalable infrastructure for continuously generating, testing, and deploying new, uncorrelated strategies.</li>
        <li>The focus is on the <Highlight>repeatability of the process</Highlight>, not on a single magic algorithm.</li>
      </ul>
    </InfoCard>

    <InfoCard icon={<BrainCircuit className="h-5 w-5" />} title="The Next Frontier">
      <ul className="list-disc list-inside space-y-2">
        <li>The future involves leveraging more advanced AI, such as <Highlight>Reinforcement Learning</Highlight> for execution and <Highlight>LLMs</Highlight> for sentiment analysis.</li>
        <li>Continued exploration of novel <Highlight>alternative datasets</Highlight> to find unique, untapped sources of information.</li>
        <li>Developing more sophisticated risk management techniques to navigate complex market dynamics.</li>
      </ul>
    </InfoCard>
  </WorkflowSection>
);

// Footer Component
const Footer = () => (
  <footer className="border-t border-gray-200 mt-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
      <p className="text-sm">&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
      <p className="text-xs mt-2">A conceptual interface for understanding the systematic hedge fund workflow. Not financial advice.</p>
    </div>
  </footer>
);