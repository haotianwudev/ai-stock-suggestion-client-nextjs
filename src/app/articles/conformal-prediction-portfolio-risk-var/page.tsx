'use client';

import Link from 'next/link';
import { ArrowLeft, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function ConformalPredictionArticle() {
  const currentArticle = articles.find(article => article.slug === 'conformal-prediction-portfolio-risk-var');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Conformal Prediction for Portfolio Risk: Beyond VaR
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
            A distribution-free, mathematically rigorous alternative to standard VaR models. Master conformal prediction mechanics, Conformal Risk Control (CRC), Regime-Weighted Conformal (RWC), and how to build adaptive capital allocation systems that survive non-stationary markets and regime changes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Paper Attribution Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-8 rounded-r-xl">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Research Foundation</h2>
            <p className="text-lg text-blue-800 mb-4">
              This article builds upon the groundbreaking research by <strong>Marc Schmitt</strong> in his paper:
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                "Taming Tail Risk in Financial Markets: Conformal Risk Control for Nonstationary Portfolio VaR"
              </h3>
              <p className="text-gray-700 mb-4">
                This seminal work introduces a distribution-free framework for portfolio risk management that adapts to regime changes and non-stationary market conditions.
              </p>
              <a 
                href="https://arxiv.org/abs/2602.03903"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Read the Full Paper on arXiv &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Failure of Traditional VaR</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Value at Risk (VaR) has been the industry standard for portfolio risk measurement for decades. Yet it suffers from fundamental flaws that become catastrophic during market stress:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Distributional Assumptions:</strong> Traditional VaR assumes returns follow a normal distribution, systematically underestimating tail risk</li>
              <li><strong>Stationarity Assumption:</strong> Historical VaR assumes the future resembles the past, failing during regime changes</li>
              <li><strong>Model Risk:</strong> Parametric VaR models (GARCH, EVT) require correct specification and parameter estimation</li>
              <li><strong>Backtesting Failures:</strong> VaR violations cluster during crises, exactly when risk management matters most</li>
            </ul>
          </div>
        </section>

        {/* Conformal Prediction Fundamentals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conformal Prediction: A Distribution-Free Framework</h2>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Core Principle</h3>
            <p className="text-lg text-purple-800 leading-relaxed">
              Conformal prediction provides <strong>finite-sample validity guarantees</strong> without making distributional assumptions. Instead of assuming normality, it constructs prediction intervals that are guaranteed to contain the true value with a specified probability under the exchangeability assumption.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mathematical Foundation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Given a calibration set of historical returns and a desired coverage level (1 - α), conformal prediction constructs a prediction interval by:
            </p>
            <ol className="space-y-3 text-gray-700">
              <li><strong>Computing Nonconformity Scores:</strong> Measure how "unusual" each historical observation is relative to a base model</li>
              <li><strong>Quantile Calculation:</strong> Find the (1 - α) quantile of these scores</li>
              <li><strong>Prediction Interval:</strong> Use this quantile to construct an interval for future returns</li>
            </ol>
            
            <div className="bg-gray-50 p-6 rounded-lg my-6 border-l-4 border-purple-600">
              <p className="text-gray-800 font-mono text-sm">
                <strong>Validity Guarantee:</strong> Under exchangeability, the prediction interval covers the true value with probability ≥ (1 - α)
              </p>
            </div>
          </div>
        </section>

        {/* Conformal Risk Control (CRC) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conformal Risk Control (CRC)</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Conformal Risk Control extends conformal prediction to control the <strong>expected value of a loss function</strong> rather than just coverage probability. This is crucial for portfolio management where we care about the magnitude of losses, not just their frequency.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Components</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h4 className="text-xl font-bold text-blue-900 mb-3">Loss Function</h4>
                <p className="text-gray-700">
                  Define a loss function L(y, ŷ) that quantifies the cost of prediction errors. For VaR, this could be the magnitude of losses exceeding the VaR threshold.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h4 className="text-xl font-bold text-blue-900 mb-3">Risk Control</h4>
                <p className="text-gray-700">
                  CRC adaptively adjusts the prediction interval to ensure E[L(y, ŷ)] ≤ α, providing a guarantee on expected loss rather than just coverage.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h4 className="text-xl font-bold text-blue-900 mb-3">Online Learning</h4>
                <p className="text-gray-700">
                  CRC updates the risk threshold in real-time as new data arrives, adapting to changing market conditions without retraining models.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h4 className="text-xl font-bold text-blue-900 mb-3">Finite-Sample Validity</h4>
                <p className="text-gray-700">
                  Unlike asymptotic guarantees, CRC provides valid risk control for any sample size, critical for short-horizon trading strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Regime-Weighted Conformal (RWC) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Regime-Weighted Conformal (RWC)</h2>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">The Non-Stationarity Problem</h3>
            <p className="text-lg text-orange-800 leading-relaxed">
              Financial markets exhibit <strong>regime changes</strong> — periods of low volatility followed by sudden spikes, shifts in correlation structure, and changing tail behavior. Standard conformal prediction assumes exchangeability, which breaks down during regime transitions.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Weighting Mechanism</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              RWC addresses non-stationarity by assigning <strong>time-varying weights</strong> to historical observations based on their relevance to the current market regime:
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-600 mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Weighting Schemes</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Exponential Decay:</strong> w(t) = exp(-λ · (T - t)) — Recent data weighted more heavily</li>
                <li><strong>Volatility-Based:</strong> Weight by similarity in realized volatility regimes</li>
                <li><strong>Regime Detection:</strong> Use HMM or change-point detection to identify regime shifts</li>
                <li><strong>Adaptive λ:</strong> Learn the decay rate from data to optimize coverage</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementation Framework</h3>
            <ol className="space-y-3 text-gray-700">
              <li><strong>Regime Identification:</strong> Detect current market regime using volatility, correlation, or macro indicators</li>
              <li><strong>Weight Assignment:</strong> Assign higher weights to historical periods similar to current regime</li>
              <li><strong>Weighted Quantile:</strong> Compute weighted quantile of nonconformity scores</li>
              <li><strong>Dynamic Adjustment:</strong> Update weights as new data arrives and regimes evolve</li>
            </ol>
          </div>
        </section>

        {/* Practical Implementation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Building an Adaptive Capital Allocation System</h2>
          
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Implementation</h3>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-bold text-blue-900 mb-3">1. Data Preparation</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Collect historical portfolio returns (daily, hourly, or tick-level)</li>
                  <li>Compute regime indicators (VIX, realized volatility, correlation)</li>
                  <li>Split data into calibration and test sets</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-bold text-green-900 mb-3">2. Base Model Selection</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Choose a base forecasting model (GARCH, ML model, or simple historical mean)</li>
                  <li>The beauty of conformal prediction: model misspecification is corrected by the conformal layer</li>
                  <li>Even a naive model can achieve valid coverage with conformal adjustment</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-bold text-purple-900 mb-3">3. Nonconformity Score Design</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Absolute residual: |y - ŷ|</li>
                  <li>Normalized residual: |y - ŷ| / σ̂</li>
                  <li>Quantile-based: Distance to predicted quantile</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                <h4 className="text-xl font-bold text-orange-900 mb-3">4. Regime Weighting</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Implement exponential decay or volatility-based weighting</li>
                  <li>Tune decay parameter λ via cross-validation</li>
                  <li>Monitor regime transitions and adjust weights dynamically</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-lg border border-red-200">
                <h4 className="text-xl font-bold text-red-900 mb-3">5. Risk Control Integration</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Define loss function (e.g., magnitude of VaR breaches)</li>
                  <li>Set target risk level α (e.g., 5% for 95% VaR)</li>
                  <li>Implement online learning algorithm to adjust thresholds</li>
                  <li>Monitor cumulative loss and adapt in real-time</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
                <h4 className="text-xl font-bold text-indigo-900 mb-3">6. Capital Allocation</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Use conformal VaR to set position limits</li>
                  <li>Scale leverage inversely with predicted risk</li>
                  <li>Implement dynamic stop-losses based on conformal intervals</li>
                  <li>Rebalance as conformal predictions update</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Over Traditional VaR */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Conformal Prediction Dominates Traditional VaR</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-green-900 mb-3">✓ Distribution-Free</h3>
              <p className="text-gray-700">
                No assumptions about return distributions. Works for fat tails, skewness, and any distribution shape.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-green-900 mb-3">✓ Finite-Sample Validity</h3>
              <p className="text-gray-700">
                Guarantees hold for any sample size, not just asymptotically. Critical for short-horizon strategies.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-green-900 mb-3">✓ Regime Adaptation</h3>
              <p className="text-gray-700">
                RWC automatically adapts to regime changes without manual model respecification or retraining.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-green-900 mb-3">✓ Model-Agnostic</h3>
              <p className="text-gray-700">
                Works with any base forecasting model. Corrects for model misspecification automatically.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-green-900 mb-3">✓ Online Learning</h3>
              <p className="text-gray-700">
                Updates in real-time as new data arrives. No need for periodic recalibration or backtesting.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-green-900 mb-3">✓ Risk Control</h3>
              <p className="text-gray-700">
                CRC controls expected loss, not just coverage probability. Directly optimizes the risk metric you care about.
              </p>
            </div>
          </div>
        </section>

        {/* Limitations and Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitations and Practical Considerations</h2>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600 mb-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Exchangeability Assumption</h3>
              <p className="text-gray-700">
                Standard conformal prediction requires exchangeability (i.i.d. or similar). RWC relaxes this but still assumes some form of stationarity within regimes.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600 mb-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Calibration Set Size</h3>
              <p className="text-gray-700">
                Requires sufficient calibration data. For extreme quantiles (99% VaR), need large historical samples to estimate tail behavior accurately.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600 mb-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Regime Detection</h3>
              <p className="text-gray-700">
                RWC performance depends on accurate regime identification. Misspecified regimes can lead to suboptimal weighting and coverage failures.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Computational Cost</h3>
              <p className="text-gray-700">
                Online updates and weighted quantile calculations can be computationally expensive for high-frequency strategies. Requires efficient implementation.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Future of Portfolio Risk Management</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Conformal prediction represents a paradigm shift in portfolio risk management. By abandoning restrictive distributional assumptions and embracing distribution-free, finite-sample guarantees, it provides a mathematically rigorous framework that adapts to the non-stationary, regime-switching nature of financial markets.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The combination of Conformal Risk Control (CRC) and Regime-Weighted Conformal (RWC) creates an adaptive capital allocation system that:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>Provides valid risk estimates without distributional assumptions</li>
              <li>Adapts to regime changes in real-time</li>
              <li>Controls expected loss, not just coverage probability</li>
              <li>Works with any base forecasting model</li>
              <li>Offers finite-sample guarantees for any strategy horizon</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              As quantitative finance continues to evolve, conformal prediction will become an essential tool for institutional risk managers, systematic traders, and portfolio managers seeking robust, adaptive risk control in an increasingly complex and non-stationary market environment.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
          <p className="text-sm text-gray-600 text-center">
            <strong>Educational Disclaimer:</strong> This content is for educational and informational purposes only. It does not constitute investment advice, financial advice, trading advice, or any other sort of advice. Conformal prediction and risk management techniques discussed here require sophisticated implementation and should be thoroughly tested before deployment in live trading environments.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </div>
      </footer>
    </>
  );
}
