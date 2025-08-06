'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronsRight, GitCommit, BrainCircuit, TestTube2, ShieldCheck, Target, BarChart, Bot, Cpu, Layers, Database, ArrowRight, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper: Highlight important words
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-teal-600 dark:text-teal-400 font-semibold">{children}</span>
);

// Helper component for section titles
const SectionTitle = ({ icon, title, id }: { icon: any, title: string, id: string }) => {
  const Icon = icon;
  return (
    <h2 id={id} className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center scroll-mt-20">
      <Icon className="w-8 h-8 mr-4 text-indigo-500" />
      {title}
    </h2>
  );
};

// Helper component for subsections
const SubSectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4">{title}</h3>
);

// Helper component for list items
const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start mb-3">
    <ChevronsRight className="w-5 h-5 text-indigo-400 mr-3 mt-1 flex-shrink-0" />
    <span className="text-gray-600 dark:text-gray-300">{children}</span>
  </li>
);

// Table Component
const StyledTable = ({ headers, data }: { headers: string[], data: string[][] }) => (
  <div className="my-8">
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 md:px-6 py-4 text-sm text-gray-600 dark:text-gray-300 break-words">
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

// Visual Price Chart Component
const PriceChart = () => {
  const data = [
    { day: 1, price: 110 }, { day: 2, price: 108 }, { day: 3, price: 105 }, { day: 4, price: 102 },
    { day: 5, price: 100.5 }, { day: 6, price: 103 }, { day: 7, price: 106 }, { day: 8, price: 104 },
    { day: 9, price: 101 }, { day: 10, price: 102.5 }, { day: 11, price: 107 }, { day: 12, price: 109 },
    { day: 13, price: 106 }, { day: 14, price: 103 }, { day: 15, price: 99 }, { day: 16, price: 97 },
    { day: 17, price: 99.5 }, { day: 18, price: 104 },
  ];

  return (
    <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Visualizing a Support Zone</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="day" label={{ value: 'Trading Day', position: 'insideBottom', offset: -5 }} />
          <YAxis domain={['auto', 'auto']} label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(5px)',
              border: '1px solid #ccc',
              borderRadius: '0.5rem'
            }} 
          />
          <ReferenceArea 
            y1={99} 
            y2={101} 
            label={{ value: "Support Zone", position: "insideTopLeft", fill: "#4f46e5" }} 
            fill="#4f46e5" 
            fillOpacity={0.1} 
          />
          <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 px-2">
        <p>This chart illustrates a <Highlight>support zone</Highlight> (shaded area) between $99 and $101. The price tests this zone twice (around Day 5 and Day 9) and "bounces," demonstrating the level holding. On Day 15, the price <Highlight>decisively breaks</Highlight> through the support, which could then become a new resistance level.</p>
      </div>
    </div>
  );
};

const Section1 = () => (
  <section>
    <SectionTitle icon={GitCommit} title="I. The Anatomy of a Support Level" id="section1" />
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
      The concept of a support level is a cornerstone of classical technical analysis. For systematic trading, this heuristic must be redefined in precise, quantitative terms. This section reframes support from a subjective pattern into a quantifiable, <Highlight>probabilistic market phenomenon</Highlight>.
    </p>
    
    <SubSectionTitle title="A. Deconstructing the Psychology: Quantifying Supply, Demand, and Market Memory" />
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      A support level is a price point where demand is sufficient to halt or reverse a downtrend. This is rooted in the collective psychology of market participants:
    </p>
    <ul className="list-none pl-0 mb-4">
      <ListItem><b>Reinforcing Buyers:</b> View the level as "good value" and add to their positions.</ListItem>
      <ListItem><b>Regretful Non-Participants:</b> See a second chance to act on their original analysis.</ListItem>
      <ListItem><b>Repentant Sellers:</b> Seek to re-enter at their previous exit price, switching from supply to demand.</ListItem>
    </ul>
    
    <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-gray-800 rounded-r-lg">
      <p className="font-semibold text-indigo-800 dark:text-indigo-200">Key Hypothesis: Role Reversal</p>
      <p className="text-indigo-700 dark:text-indigo-300">
        When a support level is decisively breached, it often transforms into a new resistance level. This signifies a fundamental shift in market psychology and supply-demand dynamics—a concept known as <Highlight>role reversal</Highlight>.
      </p>
    </div>
    
    <SubSectionTitle title="B. Support as a Probabilistic Zone, Not a Fixed Line" />
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      Support is more accurately represented as a <Highlight>price zone or band</Highlight>. A scientific approach must adopt a probabilistic framework, asking: <i>"What is the probability that the price, upon entering a zone, will reverse?"</i> The "strength" of a support zone can be estimated from factors like:
    </p>
    
    <PriceChart />
    
    <ul className="list-none pl-0">
      <ListItem><b>Number of Touches:</b> More reversals increase significance.</ListItem>
      <ListItem><b>Volume at the Level:</b> High volume indicates strong <Highlight>capital commitment</Highlight>.</ListItem>
      <ListItem><b>Time Horizon:</b> Longer-term levels are more significant.</ListItem>
      <ListItem><b>Recency and Spacing:</b> Recent and well-spaced tests are more relevant.</ListItem>
    </ul>
    
    <SubSectionTitle title="C. Taxonomy of Support: Static, Dynamic, and Psychological Levels" />
    <ul className="list-none pl-0">
      <ListItem><b>Static (Horizontal) Support:</b> Horizontally aligned price lows.</ListItem>
      <ListItem><b>Dynamic Support:</b> Evolving levels like trendlines or moving averages.</ListItem>
      <ListItem><b>Psychological Support:</b> Levels at round numbers (e.g., $100) due to <Highlight>behavioral biases</Highlight>.</ListItem>
    </ul>
  </section>
);

const Section2 = () => {
  const table1Headers = ["Method", "Underlying Principle", "Data Input", "Key Parameters", "Pros", "Cons"];
  const table1Data = [
    ["Peak-Trough/Fractals", "Price action reversal patterns", "Historical Low Prices", "Lookback window, prominence", "Simple, intuitive", "Lagging, sensitive to parameters"],
    ["Volume Profile", "Market consensus at price levels", "Price and Volume Data", "Lookback period, bins", "Incorporates conviction (volume)", "Less effective in low-liquidity markets"],
    ["K-Means Clustering", "Density-based grouping of reversals", "Prices of local minima", "Number of clusters (K)", "Objective, data-driven", "Requires pre-specification of K"],
    ["Gaussian Mixture Models (GMM)", "Probabilistic clustering of reversals", "Prices of local minima", "Number of components", "Probabilistic, flexible", "Computationally expensive"],
  ];

  return (
    <section>
      <SectionTitle icon={Layers} title="II. Algorithmic Baselines: Rule-Based Identification" id="section2" />
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Before deploying ML models, a system must have a robust, objective method for identifying candidate support zones. These algorithms provide a <Highlight>performance baseline</Highlight> and generate raw data for ML models.
      </p>
      
      <SubSectionTitle title="A. Peak-Trough Analysis and Fractal Geometry" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        This approach programmatically detects significant turning points (troughs or local minima). A simple trough could be a daily low that is lower than the lows of the two preceding and two succeeding days. A bullish fractal is a specific five-candlestick pattern indicating a potential support level.
      </p>
      
      <SubSectionTitle title="B. Volume Profile and Market Profile Analysis" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Volume provides a crucial second dimension. <Highlight>High-Volume Nodes (HVNs)</Highlight> and the <Highlight>Point of Control (POC)</Highlight> on a volume profile histogram often act as strong support because many participants have positions at these levels.
      </p>
      
      <SubSectionTitle title="C. Unsupervised Learning: Clustering for High-Density Zone Detection" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Clustering algorithms like K-Means and Gaussian Mixture Models (GMM) can identify high-density regions where historical price bottoms have congregated, treating support as a "zone" of price agreement.
      </p>
      
      <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-2">Table 1: Comparison of Rule-Based Identification Methods</h4>
      <StyledTable headers={table1Headers} data={table1Data} />
    </section>
  );
};

const PipelineDiagram = () => (
  <div className="my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">ML Pipeline Flow</h4>
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 text-center">
      <div className="flex flex-col items-center p-3">
        <Database className="w-12 h-12 text-indigo-500" />
        <span className="font-semibold mt-2">1. Data</span>
        <span className="text-sm text-gray-500">Price, Volume</span>
      </div>
      <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-500 hidden md:block" />
      <div className="flex flex-col items-center p-3">
        <Cpu className="w-12 h-12 text-indigo-500" />
        <span className="font-semibold mt-2">2. Feature Engineering</span>
        <span className="text-sm text-gray-500">ATR, RSI, Volume Profile</span>
      </div>
      <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-500 hidden md:block" />
      <div className="flex flex-col items-center p-3">
        <Bot className="w-12 h-12 text-indigo-500" />
        <span className="font-semibold mt-2">3. ML Model</span>
        <span className="text-sm text-gray-500">Random Forest, LSTM</span>
      </div>
      <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-500 hidden md:block" />
      <div className="flex flex-col items-center p-3">
        <Target className="w-12 h-12 text-indigo-500" />
        <span className="font-semibold mt-2">4. Prediction</span>
        <span className="text-sm text-gray-500">P(Hold) = 0.85</span>
      </div>
    </div>
  </div>
);

const Section3 = () => {
  const table2Headers = ["Feature Name", "Category", "Definition", "Hypothesized Predictive Value"];
  const table2Data = [
    ["`distance_to_support`", "Price-Action", "`(Current Price - Support) / Current Price`", "Measures proximity to the level."],
    ["`touch_count`", "Level Strength", "Number of historical troughs in the zone.", "Quantifies historical significance."],
    ["`time_since_last_touch`", "Level Strength", "Bars since last entry into the zone.", "Measures recency."],
    ["`volume_at_touch`", "Level Strength", "Average volume during previous touches.", "High volume confirms conviction."],
    ["`ATR`", "Volatility", "Average True Range", "High volatility can make support less reliable."],
    ["`RSI`", "Momentum", "Relative Strength Index", "Oversold reading suggests buying pressure may emerge."],
    ["`order_book_imbalance`", "Microstructure", "Ratio of bid to ask volume.", "Direct, real-time measure of supply/demand."],
  ];

  return (
    <section>
      <SectionTitle icon={BrainCircuit} title="III. A Machine Learning Pipeline for Predictive Modeling" id="section3" />
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        To move from historical identification to prediction, we turn to <Highlight>supervised machine learning</Highlight>. This pipeline assesses the probability of a support level holding or breaking.
      </p>
      
      <PipelineDiagram />
      
      <SubSectionTitle title="A. Framing the Problem for Machine Learning" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">The problem can be framed in several ways:</p>
      <ul className="list-none pl-0">
        <ListItem><b>Classification:</b> Predict a binary outcome (Hold vs. Break). Ideal for SVMs or tree-based models. The output is a probability, e.g., P(Hold) &gt; 0.7.</ListItem>
        <ListItem><b>Regression:</b> Predict the magnitude of the price reaction from the support level. Useful for setting dynamic profit targets.</ListItem>
        <ListItem><b>Time-Series Forecasting:</b> Predict the future price path itself using models like LSTMs or Transformers.</ListItem>
      </ul>
      
      <SubSectionTitle title="B. Advanced Feature Engineering" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        The success of any model depends on its input features. Raw price/volume is too noisy; features must be engineered to capture underlying market dynamics. This is often the most critical step, known as <Highlight>feature engineering</Highlight>.
      </p>
      
      <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-2">Table 2: Example Features for Support Prediction</h4>
      <StyledTable headers={table2Headers} data={table2Data} />
      
      <SubSectionTitle title="C. Supervised Learning Models" />
      <ul className="list-none pl-0">
        <ListItem><b>Support Vector Machines (SVMs):</b> Effective in high-dimensional spaces and robust to noisy data.</ListItem>
        <ListItem><b>Tree-Based Ensembles (Random Forest, Gradient Boosting):</b> Often the go-to for tabular data, capturing <Highlight>non-linear interactions</Highlight> and providing feature importance scores.</ListItem>
        <ListItem><b>Deep Learning (LSTMs, Transformers):</b> State-of-the-art for sequential data and complex temporal patterns, like the proposed DeepSupp model.</ListItem>
      </ul>
      
      <SubSectionTitle title="D. Reinforcement Learning (RL) Applications" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        A different approach is to use RL to learn an optimal trading policy. Support/resistance levels can be used as a <Highlight>regularization term</Highlight> to guide the RL agent's actions, improving stability and risk-adjusted returns.
      </p>
    </section>
  );
};

const Section4 = () => {
  const table3Headers = ["Model", "Annualized Return", "Volatility", "Sharpe Ratio", "Max Drawdown", "Win Rate", "p-value"];
  const table3Data = [
    ["Baseline (Fractal+MA)", "3.5%", "18.0%", "0.19", "-35.2%", "48.5%", "0.35"],
    ["SVM (Classification)", "8.2%", "16.5%", "0.50", "-28.1%", "55.1%", "0.04"],
    ["Random Forest", "9.5%", "16.2%", "0.59", "-25.5%", "56.8%", "0.02"],
    ["LSTM (Forecast)", "11.3%", "17.5%", "0.65", "-29.8%", "54.2%", "0.01"],
    ["DeepSupp (Attention)", "14.1%", "15.8%", "0.89", "-22.4%", "58.3%", "< 0.01"],
  ];

  return (
    <section>
      <SectionTitle icon={TestTube2} title="IV. Empirical Validation: Do Support Levels Work?" id="section4" />
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        A model is just a hypothesis until validated. The goal is to subject the strategy to tests designed to make it fail. A model that survives has demonstrated <Highlight>robustness</Highlight>.
      </p>
      
      <SubSectionTitle title="A. Statistical Significance Testing" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        We must determine if backtest performance is due to genuine edge or random chance. The <Highlight>null hypothesis (H₀)</Highlight> is that the strategy has no predictive power. Using a Student's t-test on trade returns, we calculate a <Highlight>p-value</Highlight>. A p-value &lt; 0.05 allows us to reject H₀ with 95% confidence.
      </p>
      
      <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-gray-800 rounded-r-lg my-4">
        <p className="font-semibold text-yellow-800 dark:text-yellow-200">The Formula for the t-statistic:</p>
        <p className="text-yellow-700 dark:text-yellow-300 text-center text-lg font-mono my-2">
          t = (x̄ - μ₀) / (s / √n)
        </p>
      </div>
      
      <SubSectionTitle title="B. Robust Backtesting for Machine Learning Strategies" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">Backtesting ML strategies is complex. It requires mitigating biases like:</p>
      <ul className="list-none pl-0">
        <ListItem><b>Look-Ahead Bias:</b> Using future information in training or decision-making.</ListItem>
        <ListItem><b>Overfitting:</b> The model learning noise instead of the underlying signal.</ListItem>
        <ListItem><b>Survivorship Bias:</b> Using only currently listed assets, ignoring those that failed.</ListItem>
      </ul>
      <p className="text-gray-600 dark:text-gray-300 mt-4">
        <b><Highlight>Walk-Forward Analysis</Highlight></b> is a more realistic backtesting method that iteratively trains on one period and tests on the next, unseen period.
      </p>
      
      <SubSectionTitle title="C. Comparative Analysis: Individual Stocks vs. Market Indices" />
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        The efficacy of support levels varies. Individual stocks have high <Highlight>idiosyncratic risk</Highlight> (company-specific news), which can overwhelm technical signals. Indices aggregate hundreds of stocks, canceling out this noise and leaving a purer reflection of <Highlight>systematic risk</Highlight> and broad market psychology. Therefore, support/resistance patterns are hypothesized to be more reliable in indices.
      </p>
      
      <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-2">Table 3: Hypothetical Performance Metrics of ML Models in Backtest</h4>
      <StyledTable headers={table3Headers} data={table3Data} />
    </section>
  );
};

const Section5 = () => (
  <section>
    <SectionTitle icon={ShieldCheck} title="V. From Model to Market: Strategy Integration and Risk Management" id="section5" />
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
      A validated model is a signal generator, not a full strategy. It must be integrated into a framework with trade execution logic and robust <Highlight>risk management</Highlight>.
    </p>
    
    <SubSectionTitle title="A. Actionable Trading Logic" />
    <ul className="list-none pl-0">
      <ListItem><b>Mean-Reversion ("Bounce") Strategy:</b> Go long at support if the ML model predicts a "hold" with high confidence (e.g., P(Hold) &gt; 0.7) and a favorable reward-to-risk ratio.</ListItem>
      <ListItem><b>Breakdown ("Momentum") Strategy:</b> Go short if price closes decisively below support, especially if confirmed by high volume and a "break" prediction from the model.</ListItem>
    </ul>
    
    <SubSectionTitle title="B. Dynamic Risk Management Framework" />
    <p className="text-gray-600 dark:text-gray-300 mb-4">Professional trading is defined by its systematic approach to risk.</p>
    <ul className="list-none pl-0">
      <ListItem><b>Dynamic Position Sizing:</b> Allocate capital based on model confidence, level strength, and inverse volatility.</ListItem>
      <ListItem><b>Intelligent Stop-Loss Placement:</b> Use volatility-adaptive stops (e.g., based on <Highlight>ATR</Highlight>) placed logically below the entire support zone.</ListItem>
    </ul>
    
    <SubSectionTitle title="C. Portfolio-Level Controls" />
    <ul className="list-none pl-0">
      <ListItem><b>Correlation Analysis:</b> Ensure risks are genuinely spread out by avoiding deploying the same strategy on highly correlated assets.</ListItem>
      <ListItem><b>Maximum Drawdown Controls:</b> Implement a portfolio-level <Highlight>"kill switch"</Highlight> to halt trading if total equity drops by a predefined percentage, protecting capital from a failing model or black swan event.</ListItem>
    </ul>
  </section>
);

const Section6 = () => (
  <section>
    <SectionTitle icon={Target} title="VI. Conclusion" id="section6" />
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      The traditional concept of a support level can be translated into a rigorous, quantitative framework. This requires reframing support as a <Highlight>probabilistic zone</Highlight>, not a deterministic line.
    </p>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      While rule-based algorithms are a good starting point, supervised machine learning—powered by advanced <Highlight>feature engineering</Highlight>—is necessary to build predictive models. The success of this approach hinges on rigorous empirical validation to avoid common biases and prove statistical significance.
    </p>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      Ultimately, a predictive model is only one piece of the puzzle. Its viability depends on its integration into a comprehensive strategy with dynamic risk management at both the trade and portfolio levels. The future of this field lies in developing more adaptive models that can evolve with the ever-changing nature of financial markets.
    </p>
  </section>
);

export default function QuantitativeSupportLevelModeling() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentArticle = articles.find(article => article.slug === 'quantitative-support-level-modeling-machine-learning');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
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

      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300`}>
        {/* Return to Home Button */}
        <div className="flex items-center gap-4 mb-4 p-4">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="fixed top-4 left-4 z-50">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            Deep Research
          </div>
        </div>

        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <BarChart className="w-8 h-8 text-indigo-600" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Quantitative Support Level Modeling</h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <main>
            <div className="prose prose-indigo dark:prose-invert max-w-none space-y-12 md:space-y-16">
              <Section1 />
              <Section2 />
              <Section3 />
              <Section4 />
              <Section5 />
              <Section6 />
            </div>
          </main>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="p-4 md:p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">Important Disclaimer</h3>
                  <p className="text-yellow-800 text-sm leading-relaxed">
                    This analysis is for educational purposes only and does not constitute investment advice. 
                    Machine learning models in finance carry significant risks including overfitting, model degradation, 
                    and market regime changes. Past performance does not guarantee future results. Always consult with a qualified 
                    financial advisor before making investment decisions. The strategies discussed require sophisticated 
                    risk management and may not be suitable for all investors.
                  </p>
                </div>
            </div>
          </div>
        </div>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}