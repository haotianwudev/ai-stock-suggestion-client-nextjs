'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronsUp, Maximize2, Brain, TrendingUp, Database, AlertTriangle, Zap, Target } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Mock data for the comparative analysis chart
const chartData = [
  { name: 'ARIMA', performance: 65, complexity: 30 },
  { name: 'GARCH', performance: 70, complexity: 40 },
  { name: 'SVM', performance: 75, complexity: 60 },
  { name: 'XGBoost', performance: 85, complexity: 70 },
  { name: 'GRU', performance: 90, complexity: 80 },
  { name: 'LSTM', performance: 92, complexity: 85 },
  { name: 'Transformer', performance: 95, complexity: 90 },
];

export default function LSTMSystematicTradingArticle() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  // Find current article
  const currentArticle = articles.find(article => article.slug === 'lstm-systematic-trading-deep-dive-architecture-application-performance');

  // Effect for showing/hiding the "scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enhanced Section component with icons
  const Section = ({ id, title, icon, children, gradient = "from-purple-500 to-blue-500" }: {
    id: string;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    gradient?: string;
  }) => (
    <section id={id} className="mb-20 scroll-mt-24">
      <div className={`bg-gradient-to-r ${gradient} p-1 rounded-2xl mb-8`}>
        <div className="bg-white rounded-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
              {icon}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {title}
            </h2>
          </div>
          <div className="space-y-6 text-slate-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </section>
  );

  // Enhanced SubSection component
  const SubSection = ({ title, children, icon }: {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
  }) => (
    <div className="bg-slate-50 rounded-xl p-6 my-6">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-purple-600">{icon}</div>}
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  // Enhanced styled table component
  const StyledTable = ({ headers, rows }: {
    headers: string[];
    rows: string[][];
  }) => (
    <div className="overflow-x-auto my-8">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-purple-50 to-blue-50">
              {headers.map((header: string, i: number) => (
                <th key={i} className="px-6 py-4 text-left font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row: string[], i: number) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                {row.map((cell: string, j: number) => (
                  <td key={j} className="px-6 py-4" dangerouslySetInnerHTML={{ __html: cell }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Enhanced bar chart component
  const ChartComponent = () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 my-12">
      <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center flex items-center justify-center gap-3">
        <TrendingUp className="h-6 w-6 text-purple-600" />
        Model Performance vs. Complexity
      </h3>
      <div className="w-full h-80 flex items-end justify-around gap-x-2 md:gap-x-4" aria-label="A bar chart comparing model performance.">
        {chartData.map((d, i) => (
          <div key={d.name} className="flex-1 flex flex-col items-center justify-end group h-full">
            <div className="mb-1 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {d.performance}%
            </div>
            <div
              className="w-full max-w-12 bg-gradient-to-t from-purple-500 to-blue-400 rounded-t-md transition-all duration-1000 ease-out animate-grow-bar shadow-lg"
              style={{ 
                height: `${d.performance}%`,
                animationDelay: `${i * 100}ms`
              }}
              aria-label={`${d.name} performance: ${d.performance}%`}
            />
            <p className="text-xs text-slate-600 font-medium text-center mt-2 whitespace-nowrap">
              {d.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title || ''} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes growBar {
          from { height: 0%; }
          to { height: var(--target-height); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-grow-bar {
          animation: growBar 1s ease-out forwards;
          height: 0%;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
        {/* Return to Home Button */}
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-20 left-8 z-30">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 shadow-lg animate-float">
            Deep Research
          </span>
        </div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl">
                <Brain className="h-12 w-12 text-purple-600" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight animate-fade-in bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                LSTM
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-4 animate-fade-in-delay">
              in Systematic Trading
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in-delay">
              A Deep Dive into Architecture, Application, and Performance
            </p>
          </div>

          {/* Hero Infographic */}
          {currentArticle?.imageUrl && (
            <div className="mb-16">
              <div 
                className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white cursor-pointer group relative bg-white"
                onClick={() => setIsImageViewerOpen(true)}
              >
                <img 
                  src={currentArticle.imageUrl} 
                  alt="LSTM Neural Network Architecture and Trading Implementation" 
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageViewerOpen(true);
                  }}
                  className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg"
                  title="View full screen"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 pointer-events-none">
                  <div className="bg-white/95 text-gray-800 px-6 py-3 rounded-xl text-sm font-medium shadow-lg">
                    Click to view full screen
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full-screen image viewer */}
          {currentArticle?.imageUrl && (
            <FullScreenImageViewer
              src={currentArticle.imageUrl}
              alt="LSTM Neural Network Architecture and Trading Implementation"
              isOpen={isImageViewerOpen}
              onClose={() => setIsImageViewerOpen(false)}
            />
          )}
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 pb-16">
          
          <Section 
            id="introduction" 
            title="Introduction" 
            icon={<Brain className="h-6 w-6 text-purple-600" />}
            gradient="from-purple-500 to-blue-500"
          >
            <p className="text-lg leading-relaxed">
              The advent of deep learning has provided a powerful new class of tools for analyzing complex systems, and nowhere is this more relevant than in the domain of quantitative finance. Among these tools, the Long Short-Term Memory (LSTM) network, a specialized type of Recurrent Neural Network (RNN), has emerged as a particularly compelling architecture for modeling the intricate, time-dependent nature of financial markets.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-medium">Key Insight</p>
                  <p className="text-blue-700 mt-1">
                    LSTMs represent a breakthrough in sequential modeling, specifically designed to overcome the vanishing gradient problem that plagued traditional RNNs when processing long sequences of financial data.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section 
            id="deconstructing-lstm" 
            title="Deconstructing the LSTM" 
            icon={<Target className="h-6 w-6 text-purple-600" />}
            gradient="from-indigo-500 to-purple-500"
          >
            <SubSection 
              title="The Vanishing Gradient Problem" 
              icon={<AlertTriangle className="h-5 w-5" />}
            >
              <p>
                Simple Recurrent Neural Networks (RNNs) represent a foundational architecture for processing sequential data. Unlike traditional feed-forward networks, which treat each input as independent, RNNs introduce the concept of a "hidden state," a form of memory that captures information from previous time steps in a sequence.
              </p>
              <p>
                However, while elegant in principle, the practical application of simple RNNs is severely hampered by a critical flaw in their training process: the vanishing and exploding gradient problems. The vanishing gradient problem is the more common and insidious of the two, as it silently limits the effective memory of a simple RNN to only a few recent time steps.
              </p>
            </SubSection>

            <SubSection 
              title="LSTM Architecture Innovation" 
              icon={<Brain className="h-5 w-5" />}
            >
              <p>
                The Long Short-Term Memory (LSTM) network was introduced by Sepp Hochreiter and Jürgen Schmidhuber in 1997 as a direct and sophisticated solution to the vanishing gradient problem. Its power lies in its unique architecture, the LSTM cell, which is composed of several interacting components designed to regulate the flow of information.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                  <h5 className="font-semibold text-purple-600 mb-2">Forget Gate</h5>
                  <p className="text-sm text-slate-600">Decides what information to discard from the cell state</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                  <h5 className="font-semibold text-purple-600 mb-2">Input Gate</h5>
                  <p className="text-sm text-slate-600">Determines what new information to store in the cell state</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                  <h5 className="font-semibold text-purple-600 mb-2">Output Gate</h5>
                  <p className="text-sm text-slate-600">Controls what parts of the cell state to output</p>
                </div>
              </div>
            </SubSection>
          </Section>

          <Section 
            id="symbiosis" 
            title="LSTMs & Systematic Trading" 
            icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
            gradient="from-green-500 to-teal-500"
          >
            <SubSection 
              title="Why Financial Markets Demand Sophisticated Models" 
              icon={<Database className="h-5 w-5" />}
            >
              <p>
                Financial time series data are notoriously difficult to model. They are inherently noisy, with a low signal-to-noise ratio, and exhibit high volatility, non-linearity, and non-stationarity. Classical time series models, such as ARIMA, are built on a foundation of linearity and stationarity, and often struggle to capture the complex, dynamic dependencies that govern financial markets.
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">Market Reality</p>
                    <p className="text-yellow-700 mt-1">
                      Financial markets exhibit regime changes, volatility clustering, and long-term dependencies that traditional linear models cannot capture effectively.
                    </p>
                  </div>
                </div>
              </div>
            </SubSection>

            <SubSection 
              title="Capturing Long-Term Dependencies" 
              icon={<Zap className="h-5 w-5" />}
            >
              <p>
                The core value of LSTMs in systematic trading is their ability to capture long-term dependencies. Financial markets are not memoryless; they are complex adaptive systems where the past creates a context that shapes the future. LSTMs can learn from a wide range of long-term financial patterns that are often invisible to other models.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-green-200">
                  <h4 className="text-lg font-semibold mb-3 text-green-600 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    LSTM Advantages
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Captures long-term dependencies</li>
                    <li>• Handles non-linear relationships</li>
                    <li>• Adapts to regime changes</li>
                    <li>• Processes multivariate inputs</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-red-200">
                  <h4 className="text-lg font-semibold mb-3 text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Traditional Limitations
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• Assumes stationarity</li>
                    <li>• Limited memory capacity</li>
                    <li>• Linear relationships only</li>
                    <li>• Struggles with regime shifts</li>
                  </ul>
                </div>
              </div>
            </SubSection>
          </Section>

          <Section 
            id="optimal-data" 
            title="Optimal Data & Problems" 
            icon={<Database className="h-6 w-6 text-purple-600" />}
            gradient="from-blue-500 to-indigo-500"
          >
            <SubSection 
              title="Data Suitability: Fueling the LSTM Engine" 
              icon={<Database className="h-5 w-5" />}
            >
              <p>
                LSTMs are data-hungry, and their performance depends on the input data. This can range from traditional OHLCV and technical indicators to high-frequency limit order book (LOB) data and alternative data like news sentiment. A hybrid approach, combining human-engineered features with the model's ability to learn from raw data, is often the most powerful.
              </p>

              <StyledTable 
                headers={["Data Type", "Frequency", "Use Case", "Complexity"]}
                rows={[
                  ["OHLCV", "Daily/Intraday", "Price prediction, trend analysis", "Low"],
                  ["Technical Indicators", "Daily/Intraday", "Feature engineering, signal generation", "Medium"],
                  ["Order Book Data", "High-frequency", "Microstructure modeling, execution", "High"],
                  ["Alternative Data", "Various", "Sentiment analysis, macro factors", "Very High"]
                ]}
              />
            </SubSection>

            <SubSection 
              title="Problem Formulation Strategy" 
              icon={<Target className="h-5 w-5" />}
            >
              <p>
                The effectiveness of an LSTM is highly dependent on how the trading problem is formulated. Instead of predicting exact future prices (a difficult regression task), reframing the problem can lead to more robust models:
              </p>
              <div className="grid gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <h5 className="font-semibold text-slate-800">Directional Movement Forecasting</h5>
                  <p className="text-sm text-slate-600 mt-1">Predicting direction (Up, Down, Neutral) is more tractable than exact prices</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <h5 className="font-semibold text-slate-800">Volatility Forecasting</h5>
                  <p className="text-sm text-slate-600 mt-1">Critical for risk management and options pricing strategies</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <h5 className="font-semibold text-slate-800">Direct Trading Signals</h5>
                  <p className="text-sm text-slate-600 mt-1">Training to output trading actions (Buy, Hold, Sell) directly</p>
                </div>
              </div>
            </SubSection>
          </Section>

          <Section 
            id="comparative-analysis" 
            title="Comparative Analysis" 
            icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
            gradient="from-orange-500 to-red-500"
          >
            <p className="text-lg mb-8">
              No single model is universally superior. The "No Free Lunch" theorem holds true in financial forecasting, and a skilled practitioner must benchmark a range of models to identify the most effective tool for a given task.
            </p>

            <ChartComponent />

            <StyledTable 
              headers={["Model", "Core Mechanism", "Key Advantage", "Key Disadvantage"]}
              rows={[
                ["LSTM", "Recurrent processing with three gates and a cell state.", "Proven and robust for a wide range of sequence tasks.", "Can be overly complex and computationally slow."],
                ["GRU", "Simplified recurrent processing with two gates.", "More efficient than LSTM with comparable performance.", "May be slightly less expressive on certain very complex tasks."],
                ["Transformer", "Parallel processing using self-attention.", "Scalability and state-of-the-art performance on very long sequences.", "Lacks built-in sequence understanding; can be data-hungry."]
              ]}
            />
          </Section>

          <Section 
            id="implementation-challenges" 
            title="Implementation Challenges" 
            icon={<AlertTriangle className="h-6 w-6 text-purple-600" />}
            gradient="from-red-500 to-pink-500"
          >
            <p className="text-lg mb-6">
              Translating an LSTM model into a profitable trading strategy is fraught with practical and methodological pitfalls. The greatest challenges are often not algorithmic but related to process, discipline, and rigor.
            </p>

            <SubSection 
              title="Overfitting and Data Snooping" 
              icon={<AlertTriangle className="h-5 w-5" />}
            >
              <p>
                Deep learning models are highly susceptible to overfitting noisy financial data. Regularization techniques like Dropout and Early Stopping are essential. Furthermore, data snooping (curve-fitting backtests) is an insidious pitfall that demands disciplined out-of-sample and walk-forward validation.
              </p>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">Critical Warning</p>
                    <p className="text-red-700 mt-1">
                      The complexity of LSTMs makes them particularly prone to overfitting. Always use proper cross-validation and out-of-sample testing.
                    </p>
                  </div>
                </div>
              </div>
            </SubSection>

            <SubSection 
              title="Market Regime Shifts" 
              icon={<TrendingUp className="h-5 w-5" />}
            >
              <p>
                Financial markets exhibit distinct regimes (e.g., bull vs. bear markets). A model trained in one regime may fail in another. Strategies to combat this include dynamic model retraining and hybrid models (e.g., HMM-LSTM) that can detect and adapt to the current market state.
              </p>
            </SubSection>

            <SubSection 
              title="The 'Black Box' Problem" 
              icon={<Brain className="h-5 w-5" />}
            >
              <p>
                A major barrier to adoption is the "black box" nature of LSTMs. The emerging field of eXplainable AI (XAI) provides techniques like SHAP and LIME to understand model decisions, which is critical for risk management, regulatory compliance, and building trust in the system.
              </p>
            </SubSection>
          </Section>

          <Section 
            id="future-role" 
            title="The Future of LSTMs" 
            icon={<Zap className="h-6 w-6 text-purple-600" />}
            gradient="from-purple-500 to-indigo-500"
          >
            <p className="text-lg mb-6">
              The role of LSTMs is evolving. While Transformers are taking over for large-scale tasks, LSTMs remain a powerful tool, especially for smaller datasets or as components in larger hybrid systems (e.g., CNN-LSTM, GARCH-LSTM).
            </p>
            <p className="text-lg">
              LSTMs will continue to be a vital component in the quant's toolkit, acting as a specialized temporal processing service within sophisticated, multi-modal trading systems that may also incorporate Reinforcement Learning and Large Language Models.
            </p>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-2xl mt-8 border border-purple-200">
              <h4 className="text-xl font-semibold mb-4 text-purple-800 flex items-center gap-3">
                <Zap className="h-6 w-6" />
                The Evolution Continues
              </h4>
              <p className="text-purple-700 text-lg">
                As we move forward, LSTMs are becoming part of larger, more sophisticated systems. The future belongs to hybrid architectures that combine the temporal modeling strength of LSTMs with the parallel processing power of Transformers and the decision-making capabilities of Reinforcement Learning agents.
              </p>
            </div>
          </Section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1 rounded-3xl mt-20">
            <div className="bg-white rounded-2xl p-12 text-center">
              <h3 className="text-3xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-3">
                <Brain className="h-8 w-8 text-purple-600" />
                Continue Learning
              </h3>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Dive deeper into LSTM implementation details, code examples, and advanced techniques for systematic trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {currentArticle?.podcastUrl && (
                  <a 
                    href={currentArticle.podcastUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.776z" clipRule="evenodd" />
                      <path d="M11.293 5.293a1 1 0 011.414 0 4 4 0 010 5.656 1 1 0 11-1.414-1.414 2 2 0 000-2.828 1 1 0 010-1.414z" />
                      <path d="M13.707 3.707a1 1 0 011.414 0 8 8 0 010 11.314 1 1 0 11-1.414-1.414 6 6 0 000-8.486 1 1 0 010-1.414z" />
                    </svg>
                    Listen to Podcast
                  </a>
                )}
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Read Full Research
                  </a>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-slate-900 to-purple-900 text-white mt-20">
          <div className="max-w-6xl mx-auto py-12 px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold">SOPHIE's Daddy Quant Blog</span>
            </div>
            <p className="text-slate-300">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ChevronsUp size={24} />
          </button>
        )}
      </div>
    </>
  );
}
