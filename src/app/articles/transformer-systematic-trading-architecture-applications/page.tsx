'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, DollarSign, BarChart, TestTube, Newspaper, Forward, GitCompareArrows, Cpu, Scale, GanttChartSquare, AlertTriangle, CheckCircle, XCircle, Layers, TrendingUp, ShieldCheck, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Helper Components ---

const Section = ({ children, id, className = '' }: { children: React.ReactNode; id: string; className?: string }) => (
  <section id={id} className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-5xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight text-center">
    {children}
  </h2>
);

const Card = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 border border-gray-200 h-full">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-cyan-100/60 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-cyan-700">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const Formula = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-100 p-4 my-4 rounded-md border border-gray-200 text-center overflow-x-auto">
        <p className="text-sm md:text-base text-cyan-800 font-mono select-all">{children}</p>
    </div>
);

// --- Page Sections ---

const Hero = () => (
  <div className="relative text-center py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#e5e7eb_1px,_transparent_0)] [background-size:1.5rem_1.5rem] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
     <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-4 tracking-tighter">
            Transformers in Systematic Trading
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A deep dive into the revolutionary architecture, its adaptation for financial markets, and its practical applications in creating alpha.
        </p>
        <div className="mt-8 flex justify-center gap-4">
            <a href="#architecture" className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg border-2 border-blue-600">
                Explore Architecture
            </a>
            <a href="#applications" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 border-2 border-blue-600">
                View Applications
            </a>
        </div>
    </div>
  </div>
);

const Architecture = () => (
    <Section id="architecture">
        <SectionTitle>Part I: The Transformer Architecture</SectionTitle>
        <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 text-center">
                Introduced in "Attention Is All You Need," the Transformer revolutionized sequence modeling by dispensing with recurrence and relying solely on a powerful <strong className="font-semibold text-gray-800">self-attention</strong> mechanism. This enabled massive parallelization and a superior understanding of global context, paving the way for modern LLMs.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <Card icon={<GitCompareArrows className="h-6 w-6 text-cyan-600" />} title="Self-Attention">
                    The core innovation. It allows the model to weigh the importance of all other tokens in a sequence when processing a single token, capturing complex relationships regardless of their distance.
                </Card>
                <Card icon={<Cpu className="h-6 w-6 text-cyan-600" />} title="Parallelization">
                    By removing the sequential nature of RNNs/LSTMs, Transformers can process all tokens in a sequence simultaneously, drastically reducing training time on modern GPUs.
                </Card>
            </div>
            <div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Scaled Dot-Product Attention</h4>
                <p className="text-gray-600 text-center mb-4">The mechanism is mathematically described as mapping a query and a set of key-value pairs to an output:</p>
                <Formula>Attention(Q, K, V) = softmax( (QK<sup>T</sup>) / √d<sub>k</sub> )V</Formula>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Card icon={<GanttChartSquare className="h-6 w-6 text-cyan-600" />} title="Multi-Head Attention">
                    Runs the attention process multiple times in parallel, allowing the model to jointly attend to information from different representation subspaces and capture a richer set of patterns.
                </Card>
                <Card icon={<Scale className="h-6 w-6 text-cyan-600" />} title="Positional Encoding">
                    Since self-attention is permutation-invariant, sinusoidal functions are added to the input embeddings to inject information about the relative or absolute position of tokens in the sequence.
                </Card>
            </div>
        </div>
    </Section>
);

const Adaptation = () => (
    <Section id="adaptation" className="bg-gray-100">
        <SectionTitle>Part II: Adapting Transformers for Finance</SectionTitle>
        <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 text-center">
                Financial time series are noisy, non-stationary, and continuous. Applying a language model requires significant re-engineering to handle these unique characteristics.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card icon={<BarChart className="h-6 w-6 text-cyan-600" />} title="Patching">
                    Continuous time series are segmented into smaller windows or "patches." Each patch is treated as a single token, converting the continuous data into a sequence the Transformer can process.
                </Card>
                <Card icon={<TestTube className="h-6 w-6 text-cyan-600" />} title="Feature Engineering">
                    Inputs are rarely raw prices. They are high-dimensional vectors including OHLCV, technical indicators (RSI, MACD), and other derived metrics to provide rich context about the market state.
                </Card>
                <Card icon={<AlertTriangle className="h-6 w-6 text-cyan-600" />} title="The 'X-former' Menagerie">
                    To combat the vanilla Transformer's quadratic complexity (O(L²)), specialized models like Informer (ProbSparse Attention) and Autoformer (Auto-Correlation) were developed for efficiency in long-sequence forecasting.
                </Card>
            </div>
        </div>
    </Section>
);

const Applications = () => (
    <Section id="applications">
        <SectionTitle>Part III: Applications in Systematic Trading</SectionTitle>
        <p className="text-lg text-gray-700 text-center mb-12">
            The true value of the Transformer architecture is realized when it moves from theoretical concept to practical application. Its unique capabilities enable a range of strategies, from direct market prediction to the creation of entirely new, data-driven investment factors.
        </p>

        {/* --- Forecasting Section --- */}
        <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center"><TrendingUp className="h-8 w-8 mr-3 text-cyan-600" />Forecasting: From Prediction to Probability</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card icon={<Layers className="h-6 w-6 text-cyan-600" />} title="Price & Return Prediction">
                    Transformers move beyond linear models by capturing complex, non-linear market dynamics. They learn relevant temporal dependencies directly from data, identifying multi-scale patterns from intraday momentum to long-term market regimes.
                </Card>
                <Card icon={<ShieldCheck className="h-6 w-6 text-cyan-600" />} title="Risk-Aware Forecasting">
                    By including risk metrics like VaR as input features, models can learn to predict prices conditional on the current risk environment, issuing more conservative forecasts in volatile markets and dynamically informing position sizing.
                </Card>
                <Card icon={<BarChart className="h-6 w-6 text-cyan-600" />} title="Distributional Forecasting">
                    The most advanced models produce a full probability distribution of potential outcomes, not just a single price target. This richer information is invaluable for options strategies and robust risk management.
                </Card>
            </div>
        </div>

        {/* --- NLP Section --- */}
        <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center"><FileText className="h-8 w-8 mr-3 text-cyan-600" />The Alpha in the Alphabet: Quantifying the Narrative</h3>
             <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
                Transformers' native strength in NLP provides a mechanism to systematically extract alpha from the vast sea of unstructured text data that drives market narratives, bridging the historical divide between quantitative and fundamental analysis.
            </p>
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="text-xl font-semibold text-cyan-700 mb-3">The "Quantamental" Bridge</h4>
                    <p className="text-gray-600">Models like FinBERT act as a translator, converting news headlines and reports into numerical sentiment scores. This structured data is then fed into forecasting models, allowing a system to learn relationships between news events and subsequent price movements, creating strategies that systematically trade on narratives.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="text-xl font-semibold text-cyan-700 mb-3">Beyond Simple Sentiment</h4>
                    <p className="text-gray-600">Advanced applications extend to topic modeling (identifying themes like "inflation concerns" in news) and semantic search, dramatically accelerating the research process that underpins both discretionary and systematic trading.</p>
                </div>
            </div>
        </div>
        
        {/* --- Factor Generation Section --- */}
        <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center"><BrainCircuit className="h-8 w-8 mr-3 text-cyan-600" />Factor Generation: The New Frontier</h3>
            <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
                The most sophisticated application involves moving beyond prediction to creation. This approach elegantly solves the "black box" problem, a major barrier to institutional adoption.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-cyan-700 mb-6 text-center">The Factor Generation Process</h4>
                <ol className="relative border-l border-gray-200 space-y-8">
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-cyan-100 rounded-full -left-3 ring-8 ring-white">1</span>
                        <h5 className="font-semibold text-gray-800">The Black Box</h5>
                        <p className="text-gray-600">A large Transformer is trained on a massive, multi-modal dataset (prices, fundamentals, sentiment).</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-cyan-100 rounded-full -left-3 ring-8 ring-white">2</span>
                        <h5 className="font-semibold text-gray-800">The Output</h5>
                        <p className="text-gray-600">Instead of a "buy/sell" signal, the model outputs a single numerical score for each stock—the AI-generated "factor."</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-cyan-100 rounded-full -left-3 ring-8 ring-white">3</span>
                        <h5 className="font-semibold text-gray-800">The Transparent Framework</h5>
                        <p className="text-gray-600">This new factor is analyzed just like any traditional factor (Value, Momentum) for performance, correlation, etc.</p>
                    </li>
                    <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-cyan-100 rounded-full -left-3 ring-8 ring-white">4</span>
                        <h5 className="font-semibold text-gray-800">Portfolio Construction</h5>
                        <p className="text-gray-600">The factor is used in a standard, transparent process, e.g., a long-short strategy buying top-ranked stocks and shorting the bottom.</p>
                    </li>
                </ol>
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h5 className="text-lg font-semibold text-gray-800 text-center">Why This Matters</h5>
                    <p className="text-gray-600 text-center mt-2">This modular approach contains the model's complexity within the factor generation step. Risk managers can then work with the familiar, statistically-analyzable factor, lowering the barrier to adoption and blending AI power with rigorous, industry-standard risk management.</p>
                </div>
            </div>
        </div>
    </Section>
);

const Comparison = () => (
    <Section id="comparison" className="bg-gray-100">
        <SectionTitle>A Contested Throne: Model Comparisons</SectionTitle>
        <p className="text-lg text-gray-700 text-center mb-10">
            Transformers are not a universal solution. Their performance is highly context-dependent, and they face stiff competition from other powerful ML techniques like LSTMs and Gradient Boosted Trees (e.g., XGBoost).
        </p>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-4 text-cyan-800 font-semibold border-b border-gray-200">Feature</th>
                        <th className="p-4 text-cyan-800 font-semibold border-b border-gray-200">Transformer</th>
                        <th className="p-4 text-cyan-800 font-semibold border-b border-gray-200">LSTM</th>
                        <th className="p-4 text-cyan-800 font-semibold border-b border-gray-200">GBDT (XGBoost)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b border-gray-200 text-gray-800 font-semibold">Primary Data Type</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Sequences (Text, Time Series)</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Sequences (Time Series)</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Tabular Data</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b border-gray-200 text-gray-800 font-semibold">Data Processing</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Parallel (all at once)</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Sequential (step-by-step)</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Parallel (on features)</td>
                    </tr>
                     <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b border-gray-200 text-gray-800 font-semibold">Long-Range Dependency</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Excellent (direct paths)</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Good (via memory cell)</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Indirect (via tree depth)</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b border-gray-200 text-gray-800 font-semibold">Training Time</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Potentially fast with GPUs</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Slow (sequential bottleneck)</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Fast</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b border-gray-200 text-gray-800 font-semibold">Data Requirement</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Very Large</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Moderate to Large</td>
                        <td className="p-4 border-b border-gray-200 text-gray-600">Small to Large</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b-0 border-gray-200 text-gray-800 font-semibold">Interpretability</td>
                        <td className="p-4 border-b-0 border-gray-200 text-gray-600">Low ("black box," attention maps help)</td>
                        <td className="p-4 border-b-0 border-gray-200 text-gray-600">Low ("black box")</td>
                        <td className="p-4 border-b-0 border-gray-200 text-gray-600">Moderate (feature importance)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Section>
);

const Challenges = () => (
    <Section id="challenges">
        <SectionTitle>Pros, Cons & Critical Challenges</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Pros</h3>
                <ul className="space-y-3">
                    <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong className="font-semibold">Global Context:</strong> Unparalleled ability to model complex, long-range dependencies in data.</span></li>
                    <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong className="font-semibold">Parallelization:</strong> Significantly faster to train on large datasets compared to sequential models like LSTMs.</span></li>
                    <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong className="font-semibold">Flexibility:</strong> Provides a unified framework for fusing diverse data types, from prices to news text.</span></li>
                </ul>
            </div>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-red-800 mb-4">Cons & Difficulties</h3>
                <ul className="space-y-3">
                    <li className="flex items-start"><XCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" /><span><strong className="font-semibold">Overfitting Risk:</strong> High model capacity makes it easy to memorize historical noise instead of a true signal.</span></li>
                    <li className="flex items-start"><XCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" /><span><strong className="font-semibold">Interpretability:</strong> The "black box" nature poses significant risk management and compliance challenges.</span></li>
                    <li className="flex items-start"><XCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" /><span><strong className="font-semibold">Cost & Data:</strong> Data-hungry and computationally expensive, requiring massive datasets and powerful GPUs.</span></li>
                </ul>
            </div>
        </div>
    </Section>
);

const CaseStudies = () => (
    <Section id="casestudies" className="bg-gray-100">
        <SectionTitle>Part V: Case Studies & Future Outlook</SectionTitle>
        <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 text-center">
                Research provides concrete examples of Transformer-based strategies, while the future points towards foundational models and hybrid systems.
            </p>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
                <h4 className="text-xl font-semibold text-cyan-700 mb-2">Case Study: Stockformer</h4>
                <p className="text-gray-600 mb-4">A price-volume factor model that uses a Dual-Frequency Spatiotemporal Encoder. A swing trading strategy based on its factor reported an impressive <strong className="text-gray-800">annualized return of 30.80%</strong> in backtests, showing stability even in downturns.</p>
                <h4 className="text-xl font-semibold text-cyan-700 mb-2">Case Study: Quantformer</h4>
                <p className="text-gray-600">A factor generation model tested on the Chinese A-share market. Its AI-generated factor showed superior predictive performance compared to 100 traditional factors and resulted in a strategy with lower turnover.</p>
            </div>
            <div className="text-center mt-10">
                <h4 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center justify-center"><Forward className="h-6 w-6 mr-2"/>The Future Trajectory</h4>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    The field is moving towards large, pre-trained foundational models for finance (like PLUTUS), hybrid systems that blend AI with human expertise, and a focus on decision-making tools that provide distributional forecasts and risk-aware predictions.
                </p>
            </div>
        </div>
    </Section>
);

const Navigation = () => {
  const sections = [
    { id: 'architecture', label: 'Architecture' },
    { id: 'adaptation', label: 'Financial Adaptation' },
    { id: 'applications', label: 'Trading Applications' },
    { id: 'comparison', label: 'Model Comparisons' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'casestudies', label: 'Case Studies' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-gray-700 hover:text-cyan-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function TransformerTradingArticle() {
  const currentArticle = articles.find(article => article.slug === 'transformer-systematic-trading-architecture-applications');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <div className="bg-gray-50 text-gray-800 font-sans">
        <main>
          <Hero />
          <Architecture />
          <Adaptation />
          <Applications />
          <Comparison />
          <Challenges />
          <CaseStudies />
          
          {/* Call to Action */}
          <Section id="cta" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Dive Deeper into the Research</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Explore the complete technical analysis with detailed mathematical foundations, citations, and comprehensive case studies.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-cyan-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research Document
                </a>
              )}
            </div>
          </Section>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              This article provides a high-level interactive overview. For detailed analysis, formulas, and citations, please refer to the source research document.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
} 