'use client';

import Link from 'next/link';
import { ArrowLeft, Music, AlertTriangle, TrendingUp, BarChart3, PieChart, Binary, BrainCircuit, Library } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function FoundationalAssumptionsMLQuantTrading() {
  const currentArticle = articles.find(article => article.slug === 'foundational-assumptions-machine-learning-quantitative-trading');

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Badges */}
          <div className="relative mb-8">
            {/* Deep Research Badge - Top Left */}
            <div className="absolute top-0 left-0 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                <Library className="w-3 h-3 mr-1" />
                Deep Research
              </span>
            </div>
            
            {/* Podcast Badge - Top Right */}
            <div className="absolute top-0 right-0 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                <Music className="w-3 h-3 mr-1" />
                Podcast
              </span>
            </div>
          </div>

          {/* Title and Meta */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Foundational Assumptions of Machine Learning in Quantitative Trading
            </h1>
            <p className="text-xl text-slate-600 mb-6 max-w-3xl mx-auto">
              A Quantitative Analyst's Guide to Navigating Hostile Data
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span>December 10, 2025</span>
              <span>•</span>
              <span>Deep Research Analysis</span>
              <span>•</span>
              <span>15 min read</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
              alt="Machine learning algorithms analyzing financial data"
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">The Hostile Environment of Financial Markets</h3>
                  <p className="text-amber-700 leading-relaxed">
                    Applying machine learning to quantitative trading is an endeavor fundamentally different from its application in other fields. 
                    While domains like image recognition benefit from stable patterns and high signal-to-noise ratios, financial markets are 
                    characterized by a low signal-to-noise ratio, non-stationarity, and adversarial dynamics.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              The core assumptions that grant power to many algorithms—stationarity, independence, and normality—are systematically violated. 
              Acknowledging these violations, known as "stylized facts," is the first and most critical step in moving from academically 
              elegant but practically useless models to ones that have a chance of being robust in live markets.
            </p>
          </section>

          {/* Violation 1: Non-Stationarity */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">Violation 1: The Illusion of Stationarity</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Stationarity</strong> implies that a time series' statistical properties (mean, variance, autocorrelation) are 
                constant over time. Asset prices are almost never stationary. They exhibit trends, cycles, and structural breaks driven 
                by evolving macroeconomic conditions, technological changes, and shifts in market sentiment.
              </p>
              
              <p className="text-slate-700 leading-relaxed mb-4">
                The primary model for this behavior is the <strong>random walk</strong>, where the next price is the current price 
                plus an unpredictable shock:
              </p>
              
              <div className="bg-white border border-slate-200 rounded-lg p-4 font-mono text-center text-lg">
                P<sub>t</sub> = P<sub>t-1</sub> + ε<sub>t</sub>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              This is a process with a <strong>unit root</strong>, meaning that shocks have a permanent effect on the price level. 
              Models that assume stationarity will fail because they learn relationships that are specific to a particular regime 
              and do not generalize.
            </p>

            <p className="text-slate-700 leading-relaxed">
              The practical solution is to work with asset returns, which are typically closer to stationary:
            </p>

            <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 font-mono text-center text-lg mt-4">
              r<sub>t</sub> = (P<sub>t</sub> - P<sub>t-1</sub>) / P<sub>t-1</sub> ≈ ln(P<sub>t</sub>) - ln(P<sub>t-1</sub>)
            </div>
          </section>

          {/* Violation 2: Volatility Clustering */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <BarChart3 className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">Violation 2: Volatility Clustering & Heteroskedasticity</h2>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <p className="text-slate-700 leading-relaxed mb-4">
                While asset returns themselves show little serial correlation, their volatility is highly persistent. 
                This phenomenon, known as <strong>volatility clustering</strong>, means that large price changes are often 
                followed by more large changes, and small changes are followed by more small changes.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Stock chart showing volatility clustering patterns"
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-sm text-slate-500 mt-2 text-center">Example of volatility clustering in financial time series</p>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              This behavior is formally captured by Autoregressive Conditional Heteroskedasticity (ARCH) models, 
              which model the variance at time t (σ²<sub>t</sub>) as a function of past squared error terms:
            </p>

            <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 font-mono text-center text-lg">
              σ²<sub>t</sub> = α<sub>0</sub> + Σ α<sub>i</sub>ε²<sub>t-i</sub>
            </div>
          </section>

          {/* Violation 3: Fat Tails */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <PieChart className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">Violation 3: Non-Normality (Fat Tails)</h2>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
              <p className="text-slate-700 leading-relaxed mb-4">
                Many statistical models assume that data, or at least the error terms, are normally distributed. 
                Financial returns, however, exhibit <strong>leptokurtosis</strong>, meaning they have "fat tails." 
                Extreme events (market crashes, massive rallies) occur far more frequently than predicted by a normal distribution.
              </p>
              
              <p className="text-slate-700 leading-relaxed">
                The <strong>kurtosis</strong> of a distribution measures this "tailedness." For a normal distribution, 
                kurtosis is 3. Financial returns often have a kurtosis significantly greater than 3.
              </p>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 font-mono text-center text-lg mb-6">
              Kurtosis = E[(X - μ)⁴] / (σ²)²
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <p className="text-red-700">
                <strong>Risk Warning:</strong> Models assuming normality will drastically underestimate the probability 
                of extreme losses. This is a primary reason why risk management systems based on Gaussian assumptions 
                often fail during market crises.
              </p>
            </div>
          </section>

          {/* Tree-Based Models */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Binary className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">Assumptions of Tree-Based Models</h2>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Random Forest & Gradient Boosting</h3>
              <p className="text-slate-700 leading-relaxed">
                Tree-based models are popular in quantitative finance due to their ability to capture non-linear 
                interactions in tabular data. They are non-parametric, meaning they don't assume a specific 
                functional form for relationships.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h4 className="font-semibold text-slate-800 mb-3">Implicit Assumption: Stationarity of Relationships</h4>
                <p className="text-slate-600 text-sm">
                  While a tree model doesn't assume input features are stationary, it implicitly assumes that the 
                  <strong> relationships</strong> it learns between features and the target are stable over time.
                </p>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h4 className="font-semibold text-slate-800 mb-3">Limitation: Inability to Extrapolate</h4>
                <p className="text-slate-600 text-sm">
                  A decision tree's prediction is always the average of target values within the terminal leaf. 
                  It can never predict a value outside the range seen in training data.
                </p>
              </div>
            </div>
          </section>

          {/* Deep Learning Models */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <BrainCircuit className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-900">Assumptions of Deep Learning Models</h2>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">RNN & LSTM Networks</h3>
              <p className="text-slate-700 leading-relaxed">
                Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) networks are explicitly designed 
                for sequence data. Their core assumption is that the order of data matters and that past information 
                is relevant for predicting the future.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">Challenge: Overfitting in Financial Data</h4>
              <p className="text-yellow-700 text-sm">
                Their complexity and flexibility make them highly prone to overfitting the noise in financial data. 
                Without very large datasets, careful regularization, and robust validation techniques, an LSTM can 
                easily memorize spurious patterns.
              </p>
            </div>
          </section>

          {/* Comparative Framework */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Comparative Framework: Model Trade-offs</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-slate-300 p-4 text-left font-semibold">Model Type</th>
                    <th className="border border-slate-300 p-4 text-left font-semibold">Primary Assumption</th>
                    <th className="border border-slate-300 p-4 text-left font-semibold">Handles Non-Stationarity?</th>
                    <th className="border border-slate-300 p-4 text-left font-semibold">Key Strength</th>
                    <th className="border border-slate-300 p-4 text-left font-semibold">Primary Risk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-4 font-medium">MLP (Feedforward)</td>
                    <td className="border border-slate-300 p-4 text-sm">Static, non-linear relationships. Assumes IID data.</td>
                    <td className="border border-slate-300 p-4 text-sm text-red-600"><strong>No.</strong> Requires stationary features.</td>
                    <td className="border border-slate-300 p-4 text-sm">Universal function approximator for complex patterns.</td>
                    <td className="border border-slate-300 p-4 text-sm">Ignores time series dynamics; prone to overfitting.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-4 font-medium">Tree-Based (RF, GBM)</td>
                    <td className="border border-slate-300 p-4 text-sm">Hierarchical, non-linear relationships. No functional form assumed.</td>
                    <td className="border border-slate-300 p-4 text-sm text-yellow-600"><strong>Implicitly.</strong> Assumes learned rules are stable.</td>
                    <td className="border border-slate-300 p-4 text-sm">Excellent with tabular data, robust to outliers.</td>
                    <td className="border border-slate-300 p-4 text-sm">Alpha decay; cannot extrapolate beyond training range.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-4 font-medium">RNN / LSTM</td>
                    <td className="border border-slate-300 p-4 text-sm">Data is a sequence where order matters and past informs future.</td>
                    <td className="border border-slate-300 p-4 text-sm text-green-600"><strong>Partially.</strong> Can model trends but assumes stable dynamics.</td>
                    <td className="border border-slate-300 p-4 text-sm">Explicitly designed for time series and temporal dependencies.</td>
                    <td className="border border-slate-300 p-4 text-sm">Extremely prone to overfitting noise; computationally expensive.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Strategic Recommendations</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">For Practitioners</h3>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• Always test for stationarity using ADF tests</li>
                  <li>• Work with returns, not prices, when possible</li>
                  <li>• Include volatility regime features in models</li>
                  <li>• Use robust loss functions that handle outliers</li>
                  <li>• Implement walk-forward validation techniques</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Model Selection Guidelines</h3>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Tree models: Best for cross-sectional factor analysis</li>
                  <li>• LSTM: Use only with very large datasets and careful validation</li>
                  <li>• Ensemble methods: Combine multiple model types for robustness</li>
                  <li>• Regular retraining: Account for regime changes</li>
                  <li>• Out-of-sample testing: Essential for realistic performance estimates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Continue Your Quantitative Journey</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Dive deeper into the mathematical foundations and practical implementations of these concepts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  📄 Read Full Research Document
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
          </section>

          {/* Educational Disclaimer */}
          <div className="mt-12 p-6 bg-slate-100 border border-slate-200 rounded-lg">
            <p className="text-sm text-slate-600 text-center">
              <strong>Educational Disclaimer:</strong> This content is for educational and informational purposes only. 
              It does not constitute investment advice, and you should not rely on it as such. Trading and investing 
              involve substantial risk of loss and are not suitable for all investors.
            </p>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-500 text-sm">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}