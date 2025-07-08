'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- SVG Icons for Visual Appeal ---
const BrainCircuit = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.993.129M12 5a3 3 0 1 0 5.993.129M12 5a3 3 0 1 1-5.993-.129M12 5a3 3 0 1 1 5.993-.129" /><path d="M12 12a3 3 0 1 0-5.993.129M12 12a3 3 0 1 0 5.993.129M12 12a3 3 0 1 1-5.993-.129M12 12a3 3 0 1 1 5.993-.129" /><path d="M12 19a3 3 0 1 0-5.993.129M12 19a3 3 0 1 0 5.993.129M12 19a3 3 0 1 1-5.993-.129M12 19a3 3 0 1 1 5.993-.129" /><path d="M12 5a3 3 0 0 0-3 3v1" /><path d="M12 5a3 3 0 0 1 3 3v1" /><path d="m9 12 1.5-1.5" /><path d="m15 12-1.5-1.5" /><path d="m9 12 1.5 1.5" /><path d="m15 12-1.5 1.5" /><path d="M12 12a3 3 0 0 0-3 3v1" /><path d="M12 12a3 3 0 0 1 3 3v1" />
  </svg>
);

const LineChart = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const Scale = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2" /><path d="M19 7h2" />
  </svg>
);

const Layers = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.84l8.57 3.9a2 2 0 0 0 1.66 0l8.57-3.9a1 1 0 0 0 0-1.84Z" /><path d="M2 12.11 10.57 16a2 2 0 0 0 1.66 0L21 12.11" /><path d="m2 17.11 10.57 4.7a2 2 0 0 0 1.66 0L21 17.11" />
  </svg>
);

const CheckCircle = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircle = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
  </svg>
);

const Info = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);

const LinkIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
  </svg>
);

const FileText = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" />
  </svg>
);

// --- Data based on the provided research document with more stats and source links ---
const researchData = [
  {
    study: "Hybrid LSTM & Self-Attention (ResearchGate)",
    models: "Hybrid LSTM, Transformer, Traditional Models",
    dataset: "Stock Market Price Prediction",
    winner: "Hybrid LSTM",
    keyFinding: "A hybrid LSTM and sequential self-attention approach demonstrated superior performance in stock market price prediction tasks.",
    stats: "Hybrid approach outperformed individual models",
    icon: <BrainCircuit className="w-8 h-8 text-blue-600" />,
    implication: "Combining the sequential processing strength of LSTM with attention mechanisms can provide optimal performance for specific time series tasks.",
    link: "https://www.researchgate.net/publication/372990039_Stock_Market_Price_Prediction_A_Hybrid_LSTM_and_Sequential_Self-Attention_based_Approach"
  },
  {
    study: "Comparative Study LSTM vs Transformer (Atlantis Press)",
    models: "LSTM, Transformer, ARIMA, GRU",
    dataset: "A-Share Stock Price Prediction",
    winner: "Context Dependent",
    keyFinding: "Systematic comparison revealed LSTM excels for shorter sequences while Transformers perform better on longer-term dependencies in A-Share markets.",
    stats: "Performance varies by sequence length and market conditions",
    icon: <Layers className="w-8 h-8 text-red-600" />,
    implication: "Model performance in stock prediction depends heavily on the forecasting horizon and market characteristics rather than universal superiority.",
    link: "https://www.atlantis-press.com/article/125990061.pdf"
  },
  {
    study: "Comparative Analysis LSTM, GRU, ARIMA (ResearchGate)",
    models: "LSTM, GRU, ARIMA",
    dataset: "Stock Market Price Prediction",
    winner: "LSTM",
    keyFinding: "Comparative analysis showed LSTM models demonstrated superior performance over GRU and ARIMA for stock market price prediction tasks.",
    stats: "LSTM > GRU > ARIMA in predictive accuracy",
    icon: <Scale className="w-8 h-8 text-green-600" />,
    implication: "Among traditional time series models, LSTM's memory mechanism provides advantages for capturing complex temporal patterns in financial data.",
    link: "https://www.researchgate.net/publication/379175870_Comparative_Analysis_of_LSTM_GRU_and_ARIMA_Models_for_Stock_Market_Price_Prediction"
  },
  {
    study: "Financial Market Forecasting (IEOM Society)",
    models: "RNN, LSTM, BiLSTM, GRU, Transformer",
    dataset: "Financial Market Data",
    winner: "Transformer",
    keyFinding: "Comprehensive comparison showed Transformer-based models demonstrated superior performance across multiple financial forecasting tasks.",
    stats: "Transformer consistently outperformed all RNN variants",
    icon: <LineChart className="w-8 h-8 text-purple-600" />,
    implication: "On diverse financial datasets, Transformers provide a systematic advantage over traditional recurrent architectures.",
    link: "https://ieomsociety.org/proceedings/2023detroit/37.pdf"
  },
  {
    study: "LSTM-Transformer Hybrid Model (MDPI)",
    models: "LSTM-Transformer, Traditional Models",
    dataset: "Financial Time Series",
    winner: "LSTM-Transformer Hybrid",
    keyFinding: "A robust hybrid model combining LSTM and Transformer architectures demonstrated superior performance for financial time series forecasting.",
    stats: "Hybrid model outperformed individual architectures",
    icon: <LineChart className="w-8 h-8 text-indigo-600" />,
    implication: "Combining the sequential processing of LSTM with Transformer attention mechanisms can provide optimal performance for financial forecasting.",
    link: "https://www.mdpi.com/2413-4155/7/1/7"
  },
  {
    study: "Transformers vs LSTMs Electronic Trading (OpenReview)",
    models: "Transformer, LSTM",
    dataset: "Electronic Trading Data", 
    winner: "Context Dependent",
    keyFinding: "Comprehensive comparison between Transformers and LSTMs for electronic trading revealed performance depends on data characteristics and trading context.",
    stats: "Neither model universally superior across all trading scenarios",
    icon: <BrainCircuit className="w-8 h-8 text-yellow-500" />,
    implication: "For electronic trading applications, model selection should be based on specific data patterns rather than assuming universal architecture superiority.",
    link: "https://openreview.net/pdf/06f4232517e3c80aef7d6c683719114e1f037413.pdf"
  },
  {
    study: "LSTM vs Transformer Efficiency (MyScale)",
    models: "LSTM, Transformer",
    dataset: "Trading Data",
    winner: "Context Dependent",
    keyFinding: "Transformers excel with large datasets and long sequences, while LSTMs perform better with smaller datasets and shorter sequences.",
    stats: "Performance varies based on data size and sequence length",
    icon: <Scale className="w-8 h-8 text-teal-600" />,
    implication: "Model selection should be based on dataset characteristics rather than assuming one approach is universally superior.",
    link: "https://myscale.com/blog/lstm-transformer-trading-efficiency-showdown/"
  },
  {
    study: "Attention Mechanisms (ResearchGate)",
    models: "Attention-based vs Traditional Models",
    dataset: "Stock Market Prediction",
    winner: "Attention-based Models",
    keyFinding: "Attention mechanisms significantly improved stock market prediction accuracy by focusing on relevant temporal patterns.",
    stats: "Marked improvement over baseline approaches",
    icon: <BrainCircuit className="w-8 h-8 text-orange-600" />,
    implication: "The attention mechanism is crucial for identifying important time-dependent relationships in financial data.",
    link: "https://www.researchgate.net/publication/392103620_Attention_Mechanisms_in_Deep_Learning_for_Stock_Market_Prediction"
  },
  {
    study: "ARIMA vs Prophet vs LSTM (Neptune.ai)",
    models: "ARIMA, Prophet, LSTM",
    dataset: "Time Series Prediction",
    winner: "LSTM",
    keyFinding: "LSTM models consistently outperformed both ARIMA and Prophet for complex time series forecasting tasks.",
    stats: "LSTM > Prophet > ARIMA in most scenarios",
    icon: <Layers className="w-8 h-8 text-green-500" />,
    implication: "For complex financial time series, deep learning approaches like LSTM provide superior predictive capability over traditional statistical methods.",
    link: "https://neptune.ai/blog/arima-vs-prophet-vs-lstm"
  },
  {
    study: "Deep Learning Models Comparison (ResearchGate)",
    models: "Transformer, LSTM, GRU, CNN, Traditional Models",
    dataset: "Stock Market Forecasting",
    winner: "Deep Learning Models",
    keyFinding: "Comprehensive comparative analysis revealed deep learning models, including Transformers and LSTMs, consistently outperformed traditional approaches.",
    stats: "Deep Learning > Traditional Models with model-specific advantages",
    icon: <Info className="w-8 h-8 text-blue-600" />,
    implication: "While deep learning models generally outperform traditional methods, specific model choice should depend on dataset size and forecasting horizon.",
    link: "https://www.researchgate.net/publication/379526396_Deep_Learning_Models_for_Stock_Market_Forecasting_A_Comprehensive_Comparative_Analysis"
  },
  {
    study: "Stock Price Forecasting Deep Learning (MDPI)",
    models: "Transformer, LSTM, CNN, Traditional Methods",
    dataset: "Stock Price Time Series",
    winner: "Deep Learning Models",
    keyFinding: "Comparative study revealed deep learning models significantly outperformed traditional methods, with specific advantages for Transformers on long sequences.",
    stats: "Deep learning models showed superior forecasting accuracy",
    icon: <LineChart className="w-8 h-8 text-purple-500" />,
    implication: "For stock price forecasting, deep learning architectures provide substantial improvements over traditional approaches, with model choice depending on data characteristics.",
    link: "https://www.mdpi.com/2227-7390/8/9/1441"
  },
];

const modelComparison = {
  transformer: {
    name: "Transformer",
    pros: [
      "Excellent at capturing long-range dependencies.",
      "Highly parallelizable, leading to faster training on GPUs.",
      "Effective on large, diverse datasets (e.g., indices).",
    ],
    cons: [
      "Very data-hungry; performs poorly on small datasets.",
      "Lacks inherent understanding of sequence order (temporal bias).",
      "High computational complexity (O(L²)) for long sequences.",
    ],
  },
  lstm: {
    name: "LSTM / GRU",
    pros: [
      "Strong performance on small to medium datasets.",
      "Robust for predicting price movements (differential sequences).",
      "Inherent temporal bias is well-suited for time series.",
    ],
    cons: [
      "Sequential processing is slow and not easily parallelized.",
      "Can struggle with very long-range dependencies compared to Transformers.",
      "Bidirectional variants (BiLSTM) are often needed for best performance.",
    ],
  },
  arima: {
    name: "ARIMA",
    pros: [
      "Simple, interpretable, and a strong statistical baseline.",
      "Effective for short-term, static forecasting.",
      "Works well on data with clear, linear patterns.",
    ],
    cons: [
      "Fundamentally unable to capture non-linear dynamics.",
      "Requires data to be stationary, often needing preprocessing.",
      "Generally outperformed by deep learning models on complex financial data.",
    ],
  },
};

export default function TransformerStockPredictionAnalysis() {
  const currentArticle = articles.find(article => article.slug === 'transformer-stock-prediction-comparative-analysis');
  const [activeTab, setActiveTab] = useState('infographic');

  const renderContent = () => {
    switch (activeTab) {
      case 'infographic':
        return <InfographicContent />;
      case 'overview':
        return <OverviewContent />;
      case 'models':
        return <ModelComparisonContent />;
      default:
        return <InfographicContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header with Return Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-300">
            <BrainCircuit className="w-4 h-4 mr-1" />
            Deep Research
          </span>
        </div>

        <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
          <div className="container mx-auto p-4 md:p-8">
            <header className="text-center mb-8 md:mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Transformer in Stock Prediction: A Comparative Analysis
              </h1>
              <p className="text-lg text-gray-600">
                Transformer vs. LSTM & Traditional Models: An Infographic Overview
              </p>
            </header>

            <div className="flex justify-center mb-8 border-b border-gray-200">
              <button onClick={() => setActiveTab('infographic')} className={`px-4 py-2 text-lg font-medium transition-colors duration-300 ${activeTab === 'infographic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                Research Infographic
              </button>
              <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 text-lg font-medium transition-colors duration-300 ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                Key Takeaways
              </button>
               <button onClick={() => setActiveTab('models')} className={`px-4 py-2 text-lg font-medium transition-colors duration-300 ${activeTab === 'models' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                Model Profiles
              </button>
            </div>

            <main>
              {renderContent()}
            </main>

            {/* Source Document Link */}
            {currentArticle?.googleDoc && (
              <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-900">Complete Research Document</h3>
                </div>
                <p className="text-blue-700 mb-4">
                  This interactive summary is based on comprehensive research. Access the full academic analysis with detailed methodology, citations, and technical appendices.
                </p>
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Read Full Research Document
                </a>
              </div>
            )}

            <footer className="text-center mt-12 text-gray-500 text-sm">
                <p>This is a visual summary of the provided research document. All findings are based on the cited studies.</p>
                <p className="mt-2">© 2025 SOPHIE's Daddy Blog. Educational content for informational purposes only.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Content Components for Tabs ---

const InfographicContent = () => (
    <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Head-to-Head: Research Findings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.study}</h3>
                      <p className="text-sm text-gray-500">{item.models}</p>
                    </div>
                </div>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600" title="View Source">
                    <LinkIcon className="w-5 h-5"/>
                </a>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Dataset: {item.dataset}</p>
                <div className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${item.winner.includes("LSTM") ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                  Winner: {item.winner}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{item.keyFinding}</p>
              <div className="bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
                <p className="text-sm text-gray-600 font-mono">{item.stats}</p>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-start mt-auto">
                  <Info className="w-5 h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600"><span className="font-semibold">Implication:</span> {item.implication}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
);

const OverviewContent = () => (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Synthesized Conclusion: "No Free Lunch"</h2>
        <p className="text-lg text-gray-600 mb-6">
            The research clearly shows there is no single "best" model for all stock prediction scenarios. The optimal choice is a strategic decision based on the specific context of the problem.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-purple-700 mb-3 flex items-center"><BrainCircuit className="w-6 h-6 mr-2" /> When to Choose a Transformer:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>You have a <span className="font-bold">very large, diverse dataset</span> (e.g., major market indices, multiple years of data for many stocks).</li>
                    <li>The goal is to predict <span className="font-bold">absolute price levels</span> and capture long-term, non-obvious dependencies.</li>
                    <li>You have access to <span className="font-bold">powerful computational resources</span> (GPUs) to handle the model's complexity and training time.</li>
                </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center"><Layers className="w-6 h-6 mr-2" /> When to Choose an LSTM/GRU:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>You are working with a <span className="font-bold">smaller, specific dataset</span> (e.g., a single stock, a niche asset).</li>
                    <li>The primary goal is to predict <span className="font-bold">price movements or changes</span> (differential sequences).</li>
                    <li><span className="font-bold">Robustness and reliability</span> on less data are more critical than capturing the longest-range dependencies.</li>
                </ul>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Recommendations</h3>
            <ul className="space-y-3 text-gray-700">
                <li className="flex items-start"><CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" /><span><span className="font-semibold">Hybrid is the Future:</span> The most promising path is combining architectures (e.g., CNN-BiLSTM-Attention) to leverage the strengths of each.</span></li>
                <li className="flex items-start"><CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" /><span><span className="font-semibold">Context is King:</span> The choice of model is secondary to a deep understanding of the data, the prediction target, and the available resources.</span></li>
                <li className="flex items-start"><CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" /><span><span className="font-semibold">Benchmark Everything:</span> Always start with strong baselines like ARIMA and a well-tuned LSTM before moving to more complex models like Transformers.</span></li>
            </ul>
        </div>
    </div>
);

const ModelComparisonContent = () => (
    <div className="space-y-8">
        {Object.values(modelComparison).map(model => (
            <div key={model.name} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{model.name}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-xl font-semibold text-green-700 mb-3 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Strengths</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {model.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-red-700 mb-3 flex items-center"><XCircle className="w-5 h-5 mr-2" />Weaknesses</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {model.cons.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        ))}
    </div>
); 