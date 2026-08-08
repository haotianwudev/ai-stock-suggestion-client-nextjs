'use client';

import { AlertTriangle, TrendingUp, BarChart3, PieChart, Binary, BrainCircuit } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function FoundationalAssumptionsMLQuantTrading() {
  return (
    <ArticleFrame
      slug="foundational-assumptions-machine-learning-quantitative-trading"
      additionalDisclaimer="This content is for educational and informational purposes only and does not constitute investment advice. Trading and investing involve substantial risk of loss."
    >
      <div className="max-w-4xl mx-auto px-4 text-slate-900">
        <InfographicSlot alt="Machine Learning Assumptions in Quantitative Trading Infographic" />

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-8 mb-8 rounded-r-xl shadow-sm">
            <div className="flex items-start">
              <AlertTriangle className="h-7 w-7 text-amber-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-3">The Hostile Environment of Financial Markets</h3>
                <p className="text-amber-700 leading-relaxed text-lg">
                  Applying machine learning to quantitative trading is an endeavor fundamentally different from its application in other fields.
                  While domains like image recognition benefit from stable patterns and high signal-to-noise ratios, financial markets are
                  characterized by a low signal-to-noise ratio, non-stationarity, and adversarial dynamics.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xl leading-relaxed text-slate-700 mb-6 font-light">
            The core assumptions that grant power to many algorithms&mdash;stationarity, independence, and normality&mdash;are systematically violated.
            Acknowledging these violations, known as &ldquo;stylized facts,&rdquo; is the first and most critical step in moving from academically
            elegant but practically useless models to ones that have a chance of being robust in live markets.
          </p>
        </section>

        {/* Violation 1: Non-Stationarity */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Violation 1: The Illusion of Stationarity</h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 mb-8 shadow-sm">
            <p className="text-slate-700 leading-relaxed mb-6 text-lg">
              <strong className="text-blue-800">Stationarity</strong> implies that a time series&apos; statistical properties (mean, variance, autocorrelation) are
              constant over time. Asset prices are almost never stationary. They exhibit trends, cycles, and structural breaks driven
              by evolving macroeconomic conditions, technological changes, and shifts in market sentiment.
            </p>

            <p className="text-slate-700 leading-relaxed mb-6 text-lg">
              The primary model for this behavior is the <strong className="text-blue-800">random walk</strong>, where the next price is the current price
              plus an unpredictable shock:
            </p>

            <div className="bg-white border-2 border-blue-200 rounded-xl p-6 font-mono text-center text-xl shadow-inner">
              P<sub>t</sub> = P<sub>t-1</sub> + ε<sub>t</sub>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3 text-lg">Unit Root Process</h4>
              <p className="text-slate-600 leading-relaxed">
                This is a process with a <strong>unit root</strong>, meaning that shocks have a permanent effect on the price level.
                Models that assume stationarity will fail because they learn relationships that are specific to a particular regime
                and do not generalize.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3 text-lg">Practical Solution</h4>
              <p className="text-slate-600 leading-relaxed">
                The practical solution is to work with asset returns, which are typically closer to stationary:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-center text-lg mt-4">
                r<sub>t</sub> = (P<sub>t</sub> - P<sub>t-1</sub>) / P<sub>t-1</sub> ≈ ln(P<sub>t</sub>) - ln(P<sub>t-1</sub>)
              </div>
            </div>
          </div>
        </section>

        {/* Violation 2: Volatility Clustering */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-green-100 p-3 rounded-xl mr-4">
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Violation 2: Volatility Clustering &amp; Heteroskedasticity</h2>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 mb-8 shadow-sm">
            <p className="text-slate-700 leading-relaxed mb-6 text-lg">
              While asset returns themselves show little serial correlation, their volatility is highly persistent.
              This phenomenon, known as <strong className="text-green-800">volatility clustering</strong>, means that large price changes are often
              followed by more large changes, and small changes are followed by more small changes.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 text-xl">ARCH Model Framework</h4>
            <p className="text-slate-700 leading-relaxed mb-6 text-lg">
              This behavior is formally captured by Autoregressive Conditional Heteroskedasticity (ARCH) models,
              which model the variance at time t (σ²<sub>t</sub>) as a function of past squared error terms:
            </p>

            <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-green-200 rounded-xl p-6 font-mono text-center text-xl shadow-inner">
              σ²<sub>t</sub> = α<sub>0</sub> + Σ α<sub>i</sub>ε²<sub>t-i</sub>
            </div>
          </div>
        </section>

        {/* Violation 3: Fat Tails */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Violation 3: Non-Normality (Fat Tails)</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8 mb-8 shadow-sm">
            <p className="text-slate-700 leading-relaxed mb-6 text-lg">
              Many statistical models assume that data, or at least the error terms, are normally distributed.
              Financial returns, however, exhibit <strong className="text-purple-800">leptokurtosis</strong>, meaning they have &ldquo;fat tails.&rdquo;
              Extreme events (market crashes, massive rallies) occur far more frequently than predicted by a normal distribution.
            </p>

            <p className="text-slate-700 leading-relaxed text-lg">
              The <strong className="text-purple-800">kurtosis</strong> of a distribution measures this &ldquo;tailedness.&rdquo; For a normal distribution,
              kurtosis is 3. Financial returns often have a kurtosis significantly greater than 3.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 text-lg">Kurtosis Formula</h4>
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-purple-200 rounded-xl p-6 font-mono text-center text-xl shadow-inner">
                Kurtosis = E[(X - μ)⁴] / (σ²)²
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-6 rounded-r-xl shadow-sm">
              <h4 className="font-bold text-red-800 mb-3 text-lg">Risk Warning</h4>
              <p className="text-red-700 leading-relaxed">
                Models assuming normality will drastically underestimate the probability
                of extreme losses. This is a primary reason why risk management systems based on Gaussian assumptions
                often fail during market crises.
              </p>
            </div>
          </div>
        </section>

        {/* Tree-Based Models */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-orange-100 p-3 rounded-xl mr-4">
              <Binary className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Assumptions of Tree-Based Models</h2>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Random Forest &amp; Gradient Boosting</h3>
            <p className="text-slate-700 leading-relaxed text-lg">
              Tree-based models are popular in quantitative finance due to their ability to capture non-linear
              interactions in tabular data. They are non-parametric, meaning they don&apos;t assume a specific
              functional form for relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-4 text-xl">Implicit Assumption: Stationarity of Relationships</h4>
              <p className="text-slate-600 leading-relaxed">
                While a tree model doesn&apos;t assume input features are stationary, it implicitly assumes that the
                <strong className="text-orange-600"> relationships</strong> it learns between features and the target are stable over time.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-4 text-xl">Limitation: Inability to Extrapolate</h4>
              <p className="text-slate-600 leading-relaxed">
                A decision tree&apos;s prediction is always the average of target values within the terminal leaf.
                It can never predict a value outside the range seen in training data.
              </p>
            </div>
          </div>
        </section>

        {/* Deep Learning Models */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-indigo-100 p-3 rounded-xl mr-4">
              <BrainCircuit className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Assumptions of Deep Learning Models</h2>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">RNN &amp; LSTM Networks</h3>
            <p className="text-slate-700 leading-relaxed text-lg">
              Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) networks are explicitly designed
              for sequence data. Their core assumption is that the order of data matters and that past information
              is relevant for predicting the future.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-8 rounded-r-xl shadow-sm">
            <h4 className="font-bold text-yellow-800 mb-4 text-xl">Challenge: Overfitting in Financial Data</h4>
            <p className="text-yellow-700 leading-relaxed text-lg">
              Their complexity and flexibility make them highly prone to overfitting the noise in financial data.
              Without very large datasets, careful regularization, and robust validation techniques, an LSTM can
              easily memorize spurious patterns.
            </p>
          </div>
        </section>

        {/* Comparative Framework */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Comparative Framework: Model Trade-offs</h2>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-slate-200">
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-slate-100 to-gray-100">
                <tr>
                  <th className="border-b border-slate-300 p-6 text-left font-bold text-slate-800">Model Type</th>
                  <th className="border-b border-slate-300 p-6 text-left font-bold text-slate-800">Primary Assumption</th>
                  <th className="border-b border-slate-300 p-6 text-left font-bold text-slate-800">Handles Non-Stationarity?</th>
                  <th className="border-b border-slate-300 p-6 text-left font-bold text-slate-800">Key Strength</th>
                  <th className="border-b border-slate-300 p-6 text-left font-bold text-slate-800">Primary Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="border-b border-slate-200 p-6 font-semibold text-slate-800">MLP (Feedforward)</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Static, non-linear relationships. Assumes IID data.</td>
                  <td className="border-b border-slate-200 p-6 text-red-600 font-semibold">No. Requires stationary features.</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Universal function approximator for complex patterns.</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Ignores time series dynamics; prone to overfitting.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="border-b border-slate-200 p-6 font-semibold text-slate-800">Tree-Based (RF, GBM)</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Hierarchical, non-linear relationships. No functional form assumed.</td>
                  <td className="border-b border-slate-200 p-6 text-yellow-600 font-semibold">Implicitly. Assumes learned rules are stable.</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Excellent with tabular data, robust to outliers.</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Alpha decay; cannot extrapolate beyond training range.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="border-b border-slate-200 p-6 font-semibold text-slate-800">RNN / LSTM</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Data is a sequence where order matters and past informs future.</td>
                  <td className="border-b border-slate-200 p-6 text-green-600 font-semibold">Partially. Can model trends but assumes stable dynamics.</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Explicitly designed for time series and temporal dependencies.</td>
                  <td className="border-b border-slate-200 p-6 text-slate-600">Extremely prone to overfitting noise; computationally expensive.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Strategic Recommendations */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Strategic Recommendations</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">For Practitioners</h3>
              <ul className="space-y-4 text-blue-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Always test for stationarity using ADF tests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Work with returns, not prices, when possible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Include volatility regime features in models</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Use robust loss functions that handle outliers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Implement walk-forward validation techniques</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Model Selection Guidelines</h3>
              <ul className="space-y-4 text-green-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Tree models: Best for cross-sectional factor analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span className="text-lg">LSTM: Use only with very large datasets and careful validation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Ensemble methods: Combine multiple model types for robustness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Regular retraining: Account for regime changes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span className="text-lg">Out-of-sample testing: Essential for realistic performance estimates</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
