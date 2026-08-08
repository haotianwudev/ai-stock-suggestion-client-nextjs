'use client';

import { ChevronsDown, Cpu, Blend, Target, GitCompareArrows, TrendingUp } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Paper content structure
const paperContent = {
  executiveSummary: "While complex models like LSTMs and Transformers gain prominence, XGBoost maintains a vital position in systematic trading. Its relevance stems from exceptional performance on structured, feature-rich prediction tasks. The most sophisticated firms in 2025 will leverage a unified toolkit, deploying XGBoost for its strengths in feature-driven prediction and integrating deep learning for raw sequential data analysis. The most potent alpha will emerge from hybrid architectures combining the strengths of both paradigms.",
  sections: [
    {
      id: "paradigm",
      title: "The XGBoost Paradigm",
      icon: Cpu,
      summary: "XGBoost is more than an algorithm; it's a complete paradigm for a crucial class of financial prediction problems, engineered for performance, efficiency, and robustness against noisy financial data.",
      points: [
        {
          title: "Gradient Boosting Engine",
          content: "Sequentially builds models (decision trees) where each new model corrects the errors of the previous ones. This transforms a collection of weak learners into a single, highly accurate strong learner."
        },
        {
          title: "Advanced Regularization",
          content: "Incorporates both L1 (Lasso) and L2 (Ridge) regularization, penalizing model complexity to prevent overfitting on market noise—a primary cause of strategy failure."
        },
        {
          title: "Optimized for Speed",
          content: "Leverages parallel processing and cache-aware access for rapid training. This enables more frequent model retraining and extensive backtesting, crucial for adapting to non-stationary markets."
        },
        {
          title: "Inherent Robustness",
          content: "As an ensemble, it aggregates predictions from thousands of trees, making it less sensitive to outliers. Its sparsity-aware algorithm natively handles missing values, simplifying data preprocessing."
        }
      ]
    },
    {
      id: "competencies",
      title: "Core Competencies: Where XGBoost Excels",
      icon: Target,
      summary: "XGBoost's architecture is optimally suited for problems framed as a prediction task on a structured, tabular dataset, where engineered features are the primary source of predictive power.",
      examples: [
        {
          title: "Cross-Sectional Alpha Generation",
          description: "The quintessential quant problem: ranking stocks based on future performance. The data is a 2D table where rows are stocks and columns are features (Value, Momentum, Quality). XGBoost excels at learning the complex, non-linear interactions between these factors to predict forward returns.",
          scenario: "A monthly S&P 500 ranking strategy using an XGBoost regressor to predict returns, forming a sector-neutral long-short portfolio."
        },
        {
          title: "Market Regime Classification",
          description: "Identifying the current market state (e.g., 'Risk-On' vs. 'Risk-Off') to adapt strategy. This is a classification problem based on a snapshot of indicators like the VIX, credit spreads, and cross-asset correlations. XGBoost effectively classifies regimes to guide asset allocation.",
          scenario: "A volatility regime-based asset allocation strategy that shifts between equities and bonds based on an XGBoost classifier's weekly prediction."
        },
        {
          title: "High-Frequency Signal Generation",
          description: "Making short-term predictions based on rich features from market microstructure data. Predictive power comes from contemporaneous features (order book depth, bid-ask spread, flow imbalance), not long-term dependencies. XGBoost's speed and accuracy are critical for these latency-sensitive tasks.",
          scenario: "An intraday Forex prediction model for EUR/USD, using an XGBClassifier to predict the direction over the next 60 minutes."
        }
      ]
    },
    {
      id: "comparison",
      title: "Comparative Framework: XGBoost vs. Deep Learning",
      icon: GitCompareArrows,
      summary: "The choice between models is not about superiority, but strategic alignment. It's a trade-off between data structure, interpretability, robustness, and computational cost.",
      comparisonTable: {
        headers: ["Characteristic", "XGBoost", "LSTM", "Transformer"],
        rows: [
          ["Ideal Data", "Structured/Tabular", "Time Series", "Long Sequences"],
          ["Key Strength", "Speed, Interpretability", "Temporal Dependencies", "Global Dependencies"],
          ["Key Weakness", "Requires Feature Engineering", "Sequential (Slow)", "Data Hungry, Expensive"],
          ["Interpretability", "High (SHAP)", "Low (Post-hoc)", "Very Low"],
          ["Compute Cost", "Low (CPU)", "High (GPU)", "Very High (GPU/TPU)"]
        ]
      },
      points: [
        {
          title: "The Data Dichotomy",
          content: "XGBoost operates on 2D tabular data, assuming alpha is in engineered features. LSTMs/Transformers process raw sequences, assuming alpha is in path-dependent patterns."
        },
        {
          title: "The Interpretability Imperative",
          content: "XGBoost is a 'white box', offering built-in feature importance. Deep learning models are 'black boxes', making it hard to trace predictions, which is a major risk in finance."
        },
        {
          title: "Performance Under Pressure",
          content: "XGBoost's ensemble nature and regularization provide strong defense against overfitting. Transformers, while powerful, can struggle with the high noise levels in market data."
        }
      ]
    },
    {
      id: "hybrid",
      title: "The Synthesis: Hybrid Architectures",
      icon: Blend,
      summary: "The most powerful trend is combining models to leverage their complementary strengths. Use deep learning for feature extraction and XGBoost for robust, final decision-making. This leverages the LSTM's ability to distill complex temporal patterns and XGBoost's strength in modeling interactions between these learned features and other exogenous variables.",
      example: {
        title: "Hybrid Crypto Price Prediction",
        description: "A two-stage model to predict Bitcoin's 24-hour return.",
        steps: [
          {
            name: "1. Feature Extraction (LSTM)",
            detail: "An LSTM processes the last 72 hours of price, volume, and order flow data to generate a feature vector summarizing temporal dynamics."
          },
          {
            name: "2. Final Prediction (XGBoost)",
            detail: "The LSTM's output is combined with static features (on-chain data, macro indicators, sentiment scores) and fed into an XGBoost Regressor for the final, robust prediction."
          }
        ]
      }
    },
    {
      id: "outlook",
      title: "Strategic Outlook for 2025",
      icon: TrendingUp,
      summary: "The debate is maturing beyond 'which algorithm is best' to 'which tool is right for the job'. Leading firms will deploy a unified toolkit, selecting models based on the specific problem.",
      recommendations: [
        {
          title: "Where XGBoost Remains SOTA",
          content: "For any problem framed with structured, tabular data (cross-sectional ranking, regime classification), XGBoost's balance of performance, speed, and interpretability will remain the superior choice."
        },
        {
          title: "A Decision-Making Heuristic",
          content: "Start with XGBoost if signals are in engineered features. Explore LSTMs/Transformers if signals are in raw sequences. Prioritize XGBoost if interpretability is critical. Use hybrids for heterogeneous data."
        },
        {
          title: "Future-Proofing the Quant Stack",
          content: "The future is a modular platform: Transformers for unstructured data (news), LSTMs for high-frequency series, and XGBoost as the final, robust decision-making layer that integrates all signals."
        }
      ]
    }
  ]
};

// Helper Components
const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-16 px-4 md:px-8 w-full max-w-5xl mx-auto ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) => (
  <div className="flex items-center gap-4 mb-8 md:mb-12">
    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
      <Icon className="w-8 h-8" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">{title}</h2>
  </div>
);

const Card = ({ title, content, className = '' }: { title: string; content: string; className?: string }) => (
  <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className}`}>
    <h3 className="font-semibold text-lg text-blue-600 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{content}</p>
  </div>
);

export default function XGBoostSystematicTradingArticle() {
  return (
    <ArticleFrame slug="strategic-role-xgboost-systematic-trading-2025">
      <div className="text-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            {paperContent.executiveSummary}
          </p>

          <InfographicSlot alt="XGBoost Systematic Trading Strategy Infographic" />
        </div>

        {/* XGBoost Paradigm Section */}
        <Section id="paradigm" className="mt-12">
          {paperContent.sections[0] && (
            <>
              <SectionTitle icon={paperContent.sections[0].icon} title={paperContent.sections[0].title} />
              <p className="text-lg text-gray-600 max-w-3xl mb-12">{paperContent.sections[0].summary}</p>
              <div className="grid md:grid-cols-2 gap-6">
                {paperContent.sections[0].points?.map((point, index) => (
                  <Card key={index} title={point.title} content={point.content} />
                ))}
              </div>
            </>
          )}
        </Section>

        {/* Core Competencies Section */}
        <Section id="competencies" className="bg-gray-100">
          {paperContent.sections[1] && (
            <>
              <SectionTitle icon={paperContent.sections[1].icon} title={paperContent.sections[1].title} />
              <p className="text-lg text-gray-600 max-w-3xl mb-12">{paperContent.sections[1].summary}</p>
              <div className="grid lg:grid-cols-3 gap-8">
                {paperContent.sections[1].examples?.map((example, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <h3 className="font-bold text-xl text-blue-600 mb-3">{example.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{example.description}</p>
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 font-mono">Example Scenario:</p>
                      <p className="text-sm text-gray-700">{example.scenario}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Section>

        {/* Comparative Analysis Section */}
        <Section id="comparison">
          {paperContent.sections[2] && (
            <>
              <SectionTitle icon={paperContent.sections[2].icon} title={paperContent.sections[2].title} />
              <p className="text-lg text-gray-600 max-w-3xl mb-12">{paperContent.sections[2].summary}</p>

              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {paperContent.sections[2].points?.map((point, index) => (
                  <Card key={index} title={point.title} content={point.content} />
                ))}
              </div>

              {paperContent.sections[2].comparisonTable && (
                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        {paperContent.sections[2].comparisonTable.headers.map(header => (
                          <th key={header} className="p-4 border-b-2 border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paperContent.sections[2].comparisonTable.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-200 last:border-b-0">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className={`p-4 ${cellIndex === 0 ? 'font-semibold text-blue-700' : 'text-gray-600'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </Section>

        {/* Hybrid Architecture Section */}
        <Section id="hybrid" className="bg-gray-100">
          {paperContent.sections[3] && (
            <>
              <SectionTitle icon={paperContent.sections[3].icon} title={paperContent.sections[3].title} />
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-gray-600 mb-8">{paperContent.sections[3].summary}</p>
                  <div className="space-y-6">
                    {paperContent.sections[3].example?.steps?.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-800">{step.name}</h4>
                          <p className="text-gray-600">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {paperContent.sections[3].example && (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                    <h3 className="font-bold text-xl text-blue-600 mb-4 text-center">{paperContent.sections[3].example.title}</h3>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="text-center p-4 bg-gray-100 rounded-lg w-full">
                        <p className="text-sm text-gray-500">Input</p>
                        <p className="font-semibold text-gray-800">Raw Time Series Data</p>
                      </div>
                      <ChevronsDown className="w-6 h-6 text-gray-400" />
                      <div className="text-center p-4 bg-purple-100 rounded-lg w-full border border-purple-200">
                        <p className="text-sm text-purple-600">Stage 1: LSTM</p>
                        <p className="font-semibold text-gray-800">Temporal Feature Extraction</p>
                      </div>
                      <div className="flex justify-center w-full relative my-2">
                        <span className="text-4xl text-gray-400 absolute -top-4">+</span>
                      </div>
                      <div className="text-center p-4 bg-gray-100 rounded-lg w-full mt-4">
                        <p className="text-sm text-gray-500">Input</p>
                        <p className="font-semibold text-gray-800">Static Features (On-chain, Macro)</p>
                      </div>
                      <ChevronsDown className="w-6 h-6 text-gray-400" />
                      <div className="text-center p-4 bg-blue-100 rounded-lg w-full border border-blue-200">
                        <p className="text-sm text-blue-600">Stage 2: XGBoost</p>
                        <p className="font-semibold text-gray-800">Final Prediction</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </Section>

        {/* Strategic Outlook Section */}
        <Section id="outlook">
          {paperContent.sections[4] && (
            <>
              <SectionTitle icon={paperContent.sections[4].icon} title={paperContent.sections[4].title} />
              <p className="text-lg text-gray-600 max-w-3xl mb-12">{paperContent.sections[4].summary}</p>
              <div className="grid md:grid-cols-3 gap-8">
                {paperContent.sections[4].recommendations?.map((rec, index) => (
                  <Card key={index} title={rec.title} content={rec.content} />
                ))}
              </div>
            </>
          )}
        </Section>
      </div>
    </ArticleFrame>
  );
}
