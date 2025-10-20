'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronsUp, Menu, X } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionsRef = useRef({});

  // Find current article
  const currentArticle = articles.find(article => article.slug === 'lstm-systematic-trading-deep-dive-architecture-application-performance');

  // Defines the sections for the table of contents and page structure
  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'deconstructing-lstm', title: 'Deconstructing the LSTM' },
    { id: 'symbiosis', title: 'LSTMs & Systematic Trading' },
    { id: 'optimal-data', title: 'Optimal Data & Problems' },
    { id: 'comparative-analysis', title: 'Comparative Analysis' },
    { id: 'implementation-challenges', title: 'Implementation Challenges' },
    { id: 'future-role', title: 'The Future of LSTMs' },
  ];

  // Effect for observing which section is in view to highlight in the ToC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    tableOfContents.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        sectionsRef.current[id] = el;
        observer.observe(el);
      }
    });

    // Effect for showing/hiding the "scroll to top" button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      Object.values(sectionsRef.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tableOfContents]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reusable Section component for consistent styling
  const Section = ({ id, title, children }) => (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 border-l-4 border-purple-500 pl-4">
        {title}
      </h2>
      <div className="space-y-6 text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  );

  // Reusable SubSection component for h3 headings
  const SubSection = ({ title, children }) => (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );

  // Reusable styled table component
  const StyledTable = ({ headers, rows }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full text-sm text-left bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, i) => (
              <th key={i} scope="col" className="px-6 py-3 font-bold text-slate-800 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4" dangerouslySetInnerHTML={{ __html: cell }}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Bar chart component for model comparison
  const ChartComponent = () => (
    <div className="my-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Model Performance vs. Complexity</h3>
      <div className="w-full h-80 flex items-end justify-around gap-x-2 md:gap-x-4" aria-label="A bar chart comparing model performance.">
        {chartData.map((d, i) => (
          <div key={d.name} className="flex-1 flex flex-col items-center justify-end group h-full">
            {/* Tooltip */}
            <div className="mb-1 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {d.performance}%
            </div>
            {/* Bar */}
            <div
              className="w-full max-w-12 bg-gradient-to-t from-purple-500 to-blue-400 rounded-t-md transition-all duration-1000 ease-out animate-grow-bar"
              style={{ 
                height: `${d.performance}%`,
                animationDelay: `${i * 100}ms`
              }}
              aria-label={`${d.name} performance: ${d.performance}%`}
            />
            {/* Label */}
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
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
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
      `}</style>

      <div className="bg-gray-50 min-h-screen font-sans text-slate-700">
        {/* Return to Home Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-20 left-8 z-30">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Deep Research
          </span>
        </div>

        {/* Sticky Header */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/80 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-slate-900">LSTM<span className="text-purple-500">.</span>Trading</span>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-gray-200 bg-white transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-slate-600 hover:bg-gray-100 hover:text-slate-900'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-10 lg:gap-8">
            {/* Desktop Table of Contents */}
            <aside className="hidden lg:block lg:col-span-2">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-slate-900 mb-4 tracking-wider uppercase">Contents</h3>
                <nav>
                  <ul>
                    {tableOfContents.map((item) => (
                      <li key={item.id} className="mb-2">
                        <a
                          href={`#${item.id}`}
                          className={`text-sm transition-colors duration-200 flex items-center group ${
                            activeSection === item.id
                              ? 'text-purple-600 font-semibold'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          <span
                            className={`mr-3 h-px bg-purple-500 transition-all duration-300 ${
                              activeSection === item.id ? 'w-6' : 'w-0'
                            }`}
                          />
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-8">
              <div className="mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 leading-tight animate-fade-in">
                  LSTM in Systematic Trading
                </h1>
                <p className="text-lg md:text-xl text-slate-500 animate-fade-in-delay mb-8">
                  A Deep Dive into Architecture, Application, and Performance
                </p>
                
                {/* Hero Image */}
                {currentArticle?.imageUrl && (
                  <div className="relative w-full rounded-xl overflow-hidden shadow-2xl mb-8">
                    <img
                      src={currentArticle.imageUrl}
                      alt="LSTM Neural Network Architecture Visualization"
                      className="w-full h-auto object-contain bg-white"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm font-medium">
                        LSTM Architecture: Gating mechanisms enable long-term memory in financial time series
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Section id="introduction" title="Introduction">
                <p>
                  The advent of deep learning has provided a powerful new class of tools for analyzing complex systems, and nowhere is this more relevant than in the domain of quantitative finance. Among these tools, the Long Short-Term Memory (LSTM) network, a specialized type of Recurrent Neural Network (RNN), has emerged as a particularly compelling architecture for modeling the intricate, time-dependent nature of financial markets. To appreciate the significance of the LSTM, it is essential first to understand the model it was designed to improve upon and the fundamental challenge it was engineered to solve.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <strong>Key Insight:</strong> LSTMs represent a breakthrough in sequential modeling, specifically designed to overcome the vanishing gradient problem that plagued traditional RNNs when processing long sequences of financial data.
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section id="deconstructing-lstm" title="Deconstructing the LSTM">
                <SubSection title="The Limitations of Simple Recurrent Networks: The Vanishing Gradient Problem">
                  <p>
                    Simple Recurrent Neural Networks (RNNs) represent a foundational architecture for processing sequential data. Unlike traditional feed-forward networks, which treat each input as independent, RNNs introduce the concept of a "hidden state," a form of memory that captures information from previous time steps in a sequence. This recurrent connection, where the output from one step is fed back as an input to the next, theoretically allows RNNs to learn temporal dependencies and patterns within data where order is critical, such as time series or natural language.
                  </p>
                  <p>
                    However, while elegant in principle, the practical application of simple RNNs is severely hampered by a critical flaw in their training process: the vanishing and exploding gradient problems. The vanishing gradient problem is the more common and insidious of the two, as it silently limits the effective memory of a simple RNN to only a few recent time steps, defeating its primary purpose for long sequences. This computational limitation renders simple RNNs inadequate for many real-world tasks, particularly in finance, where the influence of an event can persist for extended periods.
                  </p>
                </SubSection>

                <SubSection title="Architectural Innovation: The LSTM Cell, State, and Gating Mechanisms">
                  <p>
                    The Long Short-Term Memory (LSTM) network was introduced by Sepp Hochreiter and Jürgen Schmidhuber in 1997 as a direct and sophisticated solution to the vanishing gradient problem. Its power lies in its unique architecture, the LSTM cell, which is composed of several interacting components designed to regulate the flow of information.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>The Cell State (c_t):</strong> At the heart of the LSTM is the cell state, often described as a "memory conveyor belt." This is a separate information channel that runs directly down the entire sequence of the network, with only minor, controlled linear interactions. This design is the key to preserving information over long periods.</li>
                    <li><strong>The Gating Mechanisms:</strong> The true ingenuity of the LSTM lies in its ability to actively manage the cell state through a series of "gates." These gates are essentially small, individual neural networks that learn when to open and close, giving the LSTM the ability to selectively add, remove, and read information from the cell state. The three primary gates are the Forget Gate, Input Gate, and Output Gate.</li>
                  </ul>

                  <div className="bg-gray-100 p-6 rounded-lg my-6">
                    <h4 className="text-lg font-semibold mb-4">LSTM Gate Functions</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="font-semibold text-purple-600">Forget Gate</h5>
                        <p className="text-sm mt-2">Decides what information to discard from the cell state</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="font-semibold text-purple-600">Input Gate</h5>
                        <p className="text-sm mt-2">Determines what new information to store in the cell state</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="font-semibold text-purple-600">Output Gate</h5>
                        <p className="text-sm mt-2">Controls what parts of the cell state to output</p>
                      </div>
                    </div>
                  </div>
                </SubSection>
              </Section>

              <Section id="symbiosis" title="LSTMs & Systematic Trading">
                <SubSection title="Why Financial Markets Demand Sophisticated Models">
                  <p>
                    Financial time series data are notoriously difficult to model. They are inherently noisy, with a low signal-to-noise ratio, and exhibit high volatility, non-linearity, and non-stationarity. Classical time series models, such as ARIMA, are built on a foundation of linearity and stationarity, and often struggle to capture the complex, dynamic dependencies that govern financial markets. This is where LSTMs offer a significant advantage, as they are universal approximators capable of learning highly complex, non-linear functions directly from the data without requiring strong a priori assumptions.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Market Reality:</strong> Financial markets exhibit regime changes, volatility clustering, and long-term dependencies that traditional linear models cannot capture effectively.
                        </p>
                      </div>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="Capturing Long-Term Dependencies in Financial Data">
                  <p>
                    The core value of LSTMs in systematic trading is their ability to capture long-term dependencies. Financial markets are not memoryless; they are complex adaptive systems where the past creates a context that shapes the future. LSTMs can learn from a wide range of long-term financial patterns that are often invisible to other models, including macroeconomic regimes, volatility clustering, and evolving market sentiment.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h4 className="text-lg font-semibold mb-3 text-green-600">LSTM Advantages</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Captures long-term dependencies</li>
                        <li>• Handles non-linear relationships</li>
                        <li>• Adapts to regime changes</li>
                        <li>• Processes multivariate inputs</li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h4 className="text-lg font-semibold mb-3 text-red-600">Traditional Model Limitations</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Assumes stationarity</li>
                        <li>• Limited memory capacity</li>
                        <li>• Linear relationships only</li>
                        <li>• Struggles with regime shifts</li>
                      </ul>
                    </div>
                  </div>
                </SubSection>
              </Section>

              <Section id="optimal-data" title="Optimal Data & Problems">
                <SubSection title="Data Suitability: Fueling the LSTM Engine">
                  <p>
                    LSTMs are data-hungry, and their performance depends on the input data. This can range from traditional OHLCV and technical indicators to high-frequency limit order book (LOB) data and alternative data like news sentiment. A hybrid approach, combining human-engineered features (like technical indicators) with the model's ability to learn from raw data, is often the most powerful.
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

                <SubSection title="Problem Suitability: Choosing the Right Target">
                  <p>
                    The effectiveness of an LSTM is also highly dependent on how the trading problem is formulated. Instead of predicting the exact future price (a difficult regression task), reframing the problem can lead to more robust models:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Directional Movement Forecasting (Classification):</strong> Predicting the direction of the next price move (Up, Down, or Neutral) is often more tractable and practical for trading.</li>
                    <li><strong>Volatility Forecasting:</strong> LSTMs are particularly well-suited for forecasting volatility, which is critical for risk management and options pricing.</li>
                    <li><strong>Generating Direct Trading Signals:</strong> An advanced approach involves training the LSTM to directly output a trading action (Buy, Hold, Sell), aligning the model's objective with the financial goal.</li>
                  </ul>
                </SubSection>
              </Section>

              <Section id="comparative-analysis" title="Comparative Analysis">
                <p>
                  No single model is universally superior. The "No Free Lunch" theorem holds true in financial forecasting, and a skilled practitioner must benchmark a range of models to identify the most effective tool for a given task. LSTMs must be compared against traditional econometric models, tree-based methods, and other modern deep learning architectures.
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

              <Section id="implementation-challenges" title="Implementation Challenges">
                <p>
                  Translating an LSTM model into a profitable trading strategy is fraught with practical and methodological pitfalls. The greatest challenges are often not algorithmic but related to process, discipline, and rigor.
                </p>

                <SubSection title="Overfitting and Data Snooping">
                  <p>
                    Deep learning models are highly susceptible to overfitting noisy financial data. Regularization techniques like Dropout and Early Stopping are essential. Furthermore, data snooping (curve-fitting backtests) is an insidious pitfall that demands disciplined out-of-sample and walk-forward validation to avoid finding spurious patterns.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-400 p-6 my-8">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          <strong>Warning:</strong> The complexity of LSTMs makes them particularly prone to overfitting. Always use proper cross-validation and out-of-sample testing.
                        </p>
                      </div>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="Navigating Market Regime Shifts">
                  <p>
                    Financial markets exhibit distinct regimes (e.g., bull vs. bear markets). A model trained in one regime may fail in another. Strategies to combat this include dynamic model retraining and hybrid models (e.g., HMM-LSTM) that can detect and adapt to the current market state.
                  </p>
                </SubSection>

                <SubSection title="The 'Black Box' Problem and Interpretability">
                  <p>
                    A major barrier to adoption is the "black box" nature of LSTMs. The emerging field of eXplainable AI (XAI) provides techniques like SHAP and LIME to understand model decisions, which is critical for risk management, regulatory compliance, and building trust in the system.
                  </p>
                </SubSection>
              </Section>

              <Section id="future-role" title="The Future of LSTMs">
                <p>
                  The role of LSTMs is evolving. While Transformers are taking over for large-scale tasks, LSTMs remain a powerful tool, especially for smaller datasets or as components in larger hybrid systems (e.g., CNN-LSTM, GARCH-LSTM). The future of quantitative trading likely lies in these ensemble approaches, combining the strengths of different architectures.
                </p>
                <p>
                  LSTMs will continue to be a vital component in the quant's toolkit, acting as a specialized temporal processing service within sophisticated, multi-modal trading systems that may also incorporate Reinforcement Learning and Large Language Models.
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl my-8">
                  <h4 className="text-xl font-semibold mb-4">The Evolution Continues</h4>
                  <p className="text-gray-700">
                    As we move forward, LSTMs are becoming part of larger, more sophisticated systems. The future belongs to hybrid architectures that combine the temporal modeling strength of LSTMs with the parallel processing power of Transformers and the decision-making capabilities of Reinforcement Learning agents.
                  </p>
                </div>
              </Section>

              {/* Call to Action */}
              <div className="mt-16 p-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Dive Deeper?</h3>
                <p className="text-lg mb-6">
                  Explore the full research document for implementation details, code examples, and advanced techniques.
                </p>
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                  >
                    Read Full Research &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-500 text-sm">
              © 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-purple-500/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 animate-fade-in hover:scale-105"
            aria-label="Scroll to top"
          >
            <ChevronsUp size={24} />
          </button>
        )}
      </div>
    </>
  );
}
