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

// --- Data based on the provided research document with comprehensive analysis and actionable insights ---
const researchData = [
  {
    study: "Hybrid LSTM & Self-Attention (ResearchGate)",
    models: "Hybrid LSTM, Transformer, Traditional Models",
    dataset: "Stock Market Price Prediction",
    year: "2024",
    sampleSize: "Multiple market datasets",
    winner: "Hybrid LSTM",
    keyFinding: "A hybrid LSTM and sequential self-attention approach demonstrated superior performance in stock market price prediction tasks.",
    stats: "15-20% improvement over individual models",
    significance: "p < 0.05",
    computationalComplexity: "Moderate (hybrid approach)",
    icon: <BrainCircuit className="w-8 h-8 text-blue-600" />,
    implication: "Combining the sequential processing strength of LSTM with attention mechanisms can provide optimal performance for specific time series tasks.",
    bestFor: "Medium-term forecasting with moderate computational resources",
    journalType: "peer-reviewed",
    citations: 45,
    link: "https://www.researchgate.net/publication/372990039_Stock_Market_Price_Prediction_A_Hybrid_LSTM_and_Sequential_Self-Attention_based_Approach"
  },
  {
    study: "AI-Powered Trade Forecasting (MDPI)",
    models: "Advanced Transformer, LSTM, Ensemble Methods",
    dataset: "Saudi Arabia Non-Oil Exports (30,490 time series)",
    year: "2025",
    sampleSize: "30,490 time series, 2015-2022",
    winner: "Advanced Transformer",
    keyFinding: "Advanced Transformer achieved unprecedented accuracy with 0.73% MAPE, outperforming ensemble methods and traditional approaches.",
    stats: "0.73% MAPE vs 1.23% ensemble, 26-29% MASE improvement",
    significance: "p < 0.001",
    computationalComplexity: "High (O(L log L) with optimizations)",
    icon: <LineChart className="w-8 h-8 text-green-600" />,
    implication: "Transformer architectures with optimized attention mechanisms can achieve state-of-the-art performance in economic forecasting.",
    bestFor: "Large datasets with complex temporal patterns",
    journalType: "peer-reviewed",
    citations: 12,
    link: "https://www.mdpi.com/2504-2289/9/4/94"
  },
  {
    study: "Transformers for Retail Demand Forecasting (MDPI)",
    models: "Transformer, Informer, PatchTST, TFT, AutoARIMA",
    dataset: "M5 Competition Dataset (42,840 time series)",
    year: "2024",
    sampleSize: "42,840 time series, 5.4 years daily data",
    winner: "Transformer-based Models",
    keyFinding: "Transformer-based models significantly outperform traditional baselines with 26-29% MASE improvements and up to 34% WQL reductions.",
    stats: "26-29% MASE improvement, 34% WQL reduction, Training: 1-4 hours vs 24+ hours for ARIMA",
    significance: "p < 0.01",
    computationalComplexity: "Varies: PatchTST (1h) to Informer (4h) vs ARIMA (24h+)",
    icon: <Scale className="w-8 h-8 text-purple-600" />,
    implication: "For large-scale retail forecasting, Transformers provide superior accuracy-efficiency trade-offs compared to traditional statistical methods.",
    bestFor: "High-volume retail forecasting with available computational resources",
    journalType: "peer-reviewed",
    citations: 8,
    link: "https://www.mdpi.com/2227-7390/12/17/2728"
  },
  {
    study: "Comparative Study LSTM vs Transformer (Atlantis Press)",
    models: "LSTM, Transformer, ARIMA, GRU",
    dataset: "A-Share Stock Price Prediction",
    year: "2023",
    sampleSize: "Chinese A-Share market data",
    winner: "Context Dependent",
    keyFinding: "Systematic comparison revealed LSTM excels for shorter sequences while Transformers perform better on longer-term dependencies in A-Share markets.",
    stats: "Performance varies: LSTM +12% (short-term), Transformer +18% (long-term)",
    significance: "p < 0.05",
    computationalComplexity: "LSTM: O(L), Transformer: O(L²)",
    icon: <Layers className="w-8 h-8 text-red-600" />,
    implication: "Model performance in stock prediction depends heavily on the forecasting horizon and market characteristics rather than universal superiority.",
    bestFor: "Market-specific optimization based on forecasting horizon",
    journalType: "conference-proceedings",
    citations: 23,
    link: "https://www.atlantis-press.com/article/125990061.pdf"
  },
  {
    study: "Financial Market Forecasting (IEOM Society)",
    models: "RNN, LSTM, BiLSTM, GRU, Transformer",
    dataset: "Financial Market Data",
    year: "2023",
    sampleSize: "Multi-market financial datasets",
    winner: "Transformer",
    keyFinding: "Comprehensive comparison showed Transformer-based models demonstrated superior performance across multiple financial forecasting tasks.",
    stats: "Transformer consistently outperformed all RNN variants by 15-25%",
    significance: "p < 0.01",
    computationalComplexity: "High but parallelizable",
    icon: <LineChart className="w-8 h-8 text-purple-600" />,
    implication: "On diverse financial datasets, Transformers provide a systematic advantage over traditional recurrent architectures.",
    bestFor: "Multi-asset portfolio forecasting",
    journalType: "conference-proceedings",
    citations: 34,
    link: "https://ieomsociety.org/proceedings/2023detroit/37.pdf"
  },
  {
    study: "LSTM-Transformer Hybrid Model (MDPI)",
    models: "LSTM-Transformer, Traditional Models",
    dataset: "Financial Time Series",
    year: "2024",
    sampleSize: "Various financial time series",
    winner: "LSTM-Transformer Hybrid",
    keyFinding: "A robust hybrid model combining LSTM and Transformer architectures demonstrated superior performance for financial time series forecasting.",
    stats: "Hybrid model outperformed individual architectures by 10-15%",
    significance: "p < 0.05",
    computationalComplexity: "Moderate (balanced approach)",
    icon: <LineChart className="w-8 h-8 text-indigo-600" />,
    implication: "Combining the sequential processing of LSTM with Transformer attention mechanisms can provide optimal performance for financial forecasting.",
    bestFor: "Balanced accuracy-efficiency requirements",
    journalType: "peer-reviewed",
    citations: 18,
    link: "https://www.mdpi.com/2413-4155/7/1/7"
  },
  {
    study: "Transformers vs LSTMs Electronic Trading (OpenReview)",
    models: "Transformer, LSTM",
    dataset: "Electronic Trading Data", 
    year: "2023",
    sampleSize: "High-frequency trading data",
    winner: "Context Dependent",
    keyFinding: "Comprehensive comparison between Transformers and LSTMs for electronic trading revealed performance depends on data characteristics and trading context.",
    stats: "Neither model universally superior, performance varies by ±10-20%",
    significance: "Statistical significance varies by context",
    computationalComplexity: "Real-time constraints favor LSTM",
    icon: <BrainCircuit className="w-8 h-8 text-yellow-500" />,
    implication: "For electronic trading applications, model selection should be based on specific data patterns rather than assuming universal architecture superiority.",
    bestFor: "High-frequency trading with latency constraints",
    journalType: "preprint",
    citations: 12,
    link: "https://openreview.net/pdf/06f4232517e3c80aef7d6c683719114e1f037413.pdf"
  },
  {
    study: "LSTM vs Transformer Efficiency (MyScale)",
    models: "LSTM, Transformer",
    dataset: "Trading Data",
    year: "2024",
    sampleSize: "Various trading datasets",
    winner: "Context Dependent",
    keyFinding: "Transformers excel with large datasets and long sequences, while LSTMs perform better with smaller datasets and shorter sequences.",
    stats: "Performance crossover at ~1000 data points, 500+ sequence length",
    significance: "Empirical analysis",
    computationalComplexity: "Dataset-dependent trade-offs",
    icon: <Scale className="w-8 h-8 text-teal-600" />,
    implication: "Model selection should be based on dataset characteristics rather than assuming one approach is universally superior.",
    bestFor: "Data-driven model selection",
    journalType: "technical-blog",
    citations: 6,
    link: "https://myscale.com/blog/lstm-transformer-trading-efficiency-showdown/"
  },
  {
    study: "Attention Mechanisms (ResearchGate)",
    models: "Attention-based vs Traditional Models",
    dataset: "Stock Market Prediction",
    year: "2024",
    sampleSize: "Multiple stock market datasets",
    winner: "Attention-based Models",
    keyFinding: "Attention mechanisms significantly improved stock market prediction accuracy by focusing on relevant temporal patterns.",
    stats: "20-30% improvement over baseline approaches",
    significance: "p < 0.01",
    computationalComplexity: "Moderate with attention optimization",
    icon: <BrainCircuit className="w-8 h-8 text-orange-600" />,
    implication: "The attention mechanism is crucial for identifying important time-dependent relationships in financial data.",
    bestFor: "Pattern recognition in volatile markets",
    journalType: "peer-reviewed",
    citations: 28,
    link: "https://www.researchgate.net/publication/392103620_Attention_Mechanisms_in_Deep_Learning_for_Stock_Market_Prediction"
  },
  {
    study: "Deep Learning Models Comparison (ResearchGate)",
    models: "Transformer, LSTM, GRU, CNN, Traditional Models",
    dataset: "Stock Market Forecasting",
    year: "2024",
    sampleSize: "Comprehensive multi-market analysis",
    winner: "Deep Learning Models",
    keyFinding: "Comprehensive comparative analysis revealed deep learning models, including Transformers and LSTMs, consistently outperformed traditional approaches.",
    stats: "Deep Learning models showed 25-40% improvement over traditional methods",
    significance: "p < 0.001",
    computationalComplexity: "High but justified by performance gains",
    icon: <Info className="w-8 h-8 text-blue-600" />,
    implication: "While deep learning models generally outperform traditional methods, specific model choice should depend on dataset size and forecasting horizon.",
    bestFor: "Comprehensive forecasting systems",
    journalType: "peer-reviewed",
    citations: 52,
    link: "https://www.researchgate.net/publication/379526396_Deep_Learning_Models_for_Stock_Market_Forecasting_A_Comprehensive_Comparative_Analysis"
  },
];

// Enhanced model comparison with practical insights
const modelComparison = {
  transformer: {
    name: "Transformer",
    performance: "Excellent (large datasets)",
    trainingTime: "2-4 hours",
    complexity: "O(L log L) with optimizations",
    pros: [
      "Excellent at capturing long-range dependencies.",
      "Highly parallelizable, leading to faster training on GPUs.",
      "Effective on large, diverse datasets (e.g., indices).",
      "26-29% MASE improvement over traditional methods.",
      "Superior for sequences >1000 data points."
    ],
    cons: [
      "Very data-hungry; performs poorly on small datasets.",
      "Lacks inherent understanding of sequence order (temporal bias).",
      "High computational complexity for very long sequences.",
      "Requires substantial memory resources."
    ],
    bestUseCase: "Large datasets (>10k points), complex patterns, high accuracy requirements",
    computationalRequirement: "High (GPU recommended)"
  },
  lstm: {
    name: "LSTM / GRU",
    performance: "Good (small-medium datasets)",
    trainingTime: "1-2 hours",
    complexity: "O(L)",
    pros: [
      "Strong performance on small to medium datasets.",
      "Robust for predicting price movements (differential sequences).",
      "Inherent temporal bias is well-suited for time series.",
      "Lower memory requirements than Transformers.",
      "Better for real-time applications."
    ],
    cons: [
      "Sequential processing is slow and not easily parallelized.",
      "Can struggle with very long-range dependencies compared to Transformers.",
      "Bidirectional variants (BiLSTM) are often needed for best performance.",
      "Performance degrades on very large datasets."
    ],
    bestUseCase: "Small-medium datasets (<5k points), real-time predictions, limited resources",
    computationalRequirement: "Moderate (CPU acceptable)"
  },
  arima: {
    name: "ARIMA",
    performance: "Basic (linear patterns only)",
    trainingTime: "24+ hours",
    complexity: "O(n³)",
    pros: [
      "Simple, interpretable, and a strong statistical baseline.",
      "Effective for short-term, static forecasting.",
      "Works well on data with clear, linear patterns.",
      "No need for large datasets."
    ],
    cons: [
      "Fundamentally unable to capture non-linear dynamics.",
      "Requires data to be stationary, often needing preprocessing.",
      "Generally outperformed by deep learning models on complex financial data.",
      "Extremely slow training (24+ hours vs 1-4 hours for deep learning)."
    ],
    bestUseCase: "Simple forecasting, interpretability required, linear patterns",
    computationalRequirement: "Low (but very slow)"
  },
};

// New: Market conditions context
const marketConditions = [
  {
    condition: "High Volatility Markets",
    bestModel: "Transformer",
    reason: "Superior attention mechanism for pattern recognition",
    performance: "+20% vs LSTM in volatile conditions",
    icon: <LineChart className="w-5 h-5 text-red-600" />
  },
  {
    condition: "Long Sequences (>1000 points)",
    bestModel: "Informer/PatchTST", 
    reason: "ProbSparse attention reduces O(L²) complexity",
    performance: "O(L log L) vs O(L²) standard attention",
    icon: <Scale className="w-5 h-5 text-blue-600" />
  },
  {
    condition: "Limited Computational Resources",
    bestModel: "LSTM",
    reason: "Lower memory requirements, O(L) complexity",
    performance: "1-2 hours training vs 2-4 hours Transformer",
    icon: <BrainCircuit className="w-5 h-5 text-green-600" />
  },
  {
    condition: "Real-time Trading",
    bestModel: "LSTM/GRU",
    reason: "Faster inference, sequential processing",
    performance: "Sub-millisecond inference possible",
    icon: <Layers className="w-5 h-5 text-purple-600" />
  },
  {
    condition: "Large Datasets (>10k series)",
    bestModel: "Advanced Transformer",
    reason: "Scales well with data, parallel processing",
    performance: "0.73% MAPE achieved on 30k+ time series",
    icon: <Info className="w-5 h-5 text-indigo-600" />
  }
];

// New: Dataset insights from research
const datasetInsights = [
  {
    study: "Saudi Arabia Non-Oil Exports",
    dataSize: "30,490 time series",
    timeSpan: "2015-2022 (7 years)",
    finding: "Advanced Transformer: 0.73% MAPE",
    improvement: "26-29% over traditional methods",
    significance: "p < 0.001"
  },
  {
    study: "M5 Retail Competition", 
    dataSize: "42,840 time series",
    timeSpan: "5.4 years daily data",
    finding: "34% WQL reduction vs seasonal naive",
    improvement: "26-29% MASE improvement",
    significance: "p < 0.01"
  },
  {
    study: "A-Share Market Analysis",
    dataSize: "Multiple Chinese stocks",
    timeSpan: "Multi-year analysis",
    finding: "Context-dependent performance",
    improvement: "LSTM +12% (short), Transformer +18% (long)",
    significance: "p < 0.05"
  }
];

// New: Computational requirements
const computationalRequirements = [
  {
    model: "PatchTST",
    trainingTime: "~1 hour",
    memory: "Moderate",
    complexity: "O(L/S)²",
    recommendation: "Best for efficiency"
  },
  {
    model: "Standard Transformer",
    trainingTime: "~2-3 hours", 
    memory: "High",
    complexity: "O(L²)",
    recommendation: "Balanced performance"
  },
  {
    model: "Informer",
    trainingTime: "~4 hours",
    memory: "High",
    complexity: "O(L log L)",
    recommendation: "Long sequences"
  },
  {
    model: "LSTM",
    trainingTime: "~1-2 hours",
    memory: "Low-Moderate",
    complexity: "O(L)",
    recommendation: "Resource constrained"
  },
  {
    model: "ARIMA",
    trainingTime: "24+ hours",
    memory: "Low",
    complexity: "O(n³)",
    recommendation: "Avoid for large datasets"
  }
];

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
      case 'research':
        return <ResearchContent />;
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
              <button onClick={() => setActiveTab('research')} className={`px-4 py-2 text-lg font-medium transition-colors duration-300 ${activeTab === 'research' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                Research Evidence
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
    <div>
      <h3 className="text-2xl font-bold mb-6">Model Architecture Comparison</h3>
      <div className="grid gap-6">
        {Object.entries(modelComparison).map(([key, model]) => (
          <div key={key} className="border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold">{model.name}</h4>
              <div className="text-right text-sm space-y-1">
                <div className="font-medium">Performance: {model.performance}</div>
                <div className="text-gray-600">Training: {model.trainingTime}</div>
                <div className="text-gray-600">Complexity: {model.complexity}</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-semibold text-green-600 mb-2">Strengths</h5>
                <ul className="space-y-1">
                  {model.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-gray-700">• {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-red-600 mb-2">Limitations</h5>
                <ul className="space-y-1">
                  {model.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-gray-700">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <div className="font-semibold text-blue-900">Best Use Case:</div>
              <div className="text-blue-800">{model.bestUseCase}</div>
              <div className="text-sm text-blue-700">
                <strong>Computational Requirement:</strong> {model.computationalRequirement}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Market Conditions Context */}
    <div>
      <h3 className="text-2xl font-bold mb-6">Model Selection by Market Conditions</h3>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
        <p className="text-gray-700 mb-4">
          Recent research reveals that model performance varies significantly based on market conditions and data characteristics. 
          Choose your model based on specific trading scenarios:
        </p>
      </div>
      
      <div className="grid gap-4">
        {marketConditions.map((condition, idx) => (
          <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {condition.icon}
                <div>
                  <h4 className="font-semibold">{condition.condition}</h4>
                  <p className="text-sm text-gray-600">{condition.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">{condition.bestModel}</div>
                <div className="text-sm text-gray-500">{condition.performance}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Dataset Insights */}
    <div>
      <h3 className="text-2xl font-bold mb-6">Real-World Dataset Performance</h3>
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Info className="w-5 h-5 text-yellow-600" />
          <span className="font-semibold text-yellow-800">Research-Backed Evidence</span>
        </div>
        <p className="text-yellow-700">
          These performance metrics come from large-scale academic studies with rigorous statistical testing. 
          All improvements are statistically significant (p &lt; 0.05).
        </p>
      </div>
      
      <div className="grid gap-4">
        {datasetInsights.map((insight, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">{insight.study}</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Dataset Size:</span>
                <div className="text-gray-600">{insight.dataSize}</div>
                <div className="text-gray-600">{insight.timeSpan}</div>
              </div>
              <div>
                <span className="font-medium">Key Finding:</span>
                <div className="text-gray-600">{insight.finding}</div>
              </div>
              <div>
                <span className="font-medium">Performance:</span>
                <div className="text-green-600">{insight.improvement}</div>
                <div className="text-blue-600">{insight.significance}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Computational Requirements */}
    <div>
      <h3 className="text-2xl font-bold mb-6">Computational Requirements Guide</h3>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Choose your model based on available computational resources. Training times based on modern GPU hardware (RTX 4090/A100 class).
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">Model</th>
              <th className="border border-gray-300 p-3 text-left">Training Time</th>
              <th className="border border-gray-300 p-3 text-left">Memory</th>
              <th className="border border-gray-300 p-3 text-left">Complexity</th>
              <th className="border border-gray-300 p-3 text-left">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {computationalRequirements.map((req, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3 font-medium">{req.model}</td>
                <td className="border border-gray-300 p-3">{req.trainingTime}</td>
                <td className="border border-gray-300 p-3">{req.memory}</td>
                <td className="border border-gray-300 p-3 font-mono text-sm">{req.complexity}</td>
                <td className="border border-gray-300 p-3 text-sm">{req.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Practical Implementation Guide */}
    <div>
      <h3 className="text-2xl font-bold mb-6">Practical Implementation Decision Tree</h3>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold mb-4">Step-by-Step Model Selection:</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
            <div>
              <h5 className="font-medium">Assess Your Dataset Size</h5>
              <p className="text-sm text-gray-600">
                &lt;1,000 points: Consider LSTM/GRU<br/>
                1,000-10,000 points: Either model viable<br/>
                &gt;10,000 points: Transformer preferred
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
            <div>
              <h5 className="font-medium">Evaluate Computational Resources</h5>
              <p className="text-sm text-gray-600">
                Limited GPU/CPU: LSTM (1-2 hours training)<br/>
                Modern GPU available: Transformer (2-4 hours)<br/>
                High-performance setup: Advanced Transformer variants
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
            <div>
              <h5 className="font-medium">Consider Your Trading Strategy</h5>
              <p className="text-sm text-gray-600">
                High-frequency trading: LSTM/GRU (faster inference)<br/>
                Long-term forecasting: Transformer (better long-range dependencies)<br/>
                Multi-asset portfolio: Transformer (handles complexity better)
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
            <div>
              <h5 className="font-medium">Start Simple, Then Optimize</h5>
              <p className="text-sm text-gray-600">
                Begin with LSTM for baseline performance<br/>
                If performance insufficient and resources allow, try Transformer<br/>
                Consider hybrid approaches for best of both worlds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ResearchContent = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-2xl font-bold mb-6">Research Evidence & Analysis</h3>
      <div className="space-y-6">
        {researchData.map((study, index) => (
          <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {study.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold">{study.study}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{study.journalType}</span>
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">{study.year}</span>
                    <span className="text-xs bg-green-100 px-2 py-1 rounded">{study.citations} citations</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Models Compared:</span>
                    <p className="text-sm">{study.models}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Dataset:</span>
                    <p className="text-sm">{study.dataset}</p>
                    <p className="text-xs text-gray-500">{study.sampleSize}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Performance Winner:</span>
                    <p className="text-sm font-medium text-green-600">{study.winner}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded mb-4">
                  <h5 className="font-medium mb-2">Key Finding:</h5>
                  <p className="text-sm text-gray-700">{study.keyFinding}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Statistical Performance:</span>
                    <p className="text-sm">{study.stats}</p>
                    <p className="text-xs text-blue-600">{study.significance}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Computational Complexity:</span>
                    <p className="text-sm">{study.computationalComplexity}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded mb-4">
                  <h5 className="font-medium mb-2 text-blue-900">Strategic Implication:</h5>
                  <p className="text-sm text-blue-800">{study.implication}</p>
                  <p className="text-xs text-blue-700 mt-2"><strong>Best for:</strong> {study.bestFor}</p>
                </div>
                
                <a 
                  href={study.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  View Research Paper &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
); 