'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart2, BookOpen, AlertTriangle, Scale, CheckCircle, Sliders, ArrowRight, GitCommit, Zap, Shield, BrainCircuit, Lightbulb, TrendingUp, DollarSign, Layers, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function InstitutionalAnalysisLongHorizonTrendRegression() {
  const currentArticle = articles.find(article => article.slug === 'institutional-analysis-long-horizon-trend-regression');

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

      <div className="bg-gray-50 text-gray-800 font-sans antialiased">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Return to Home Button */}
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Deep Research Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <BrainCircuit className="w-3 h-3 mr-1" />
              Deep Research
            </span>
          </div>

          {/* Hero Section */}
          <header className="text-center mb-16 sm:mb-24">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
              An Institutional Analysis of Long-Horizon Trend Regression
            </h1>
            <p className="text-lg sm:text-xl text-blue-600 max-w-3xl mx-auto">
              From Technical Indicator to a Quantitative Trading Paradigm
            </p>
          </header>

          {/* Section 1: Deconstructing the Concept */}
          <ContentSection
            icon={<BookOpen className="w-10 h-10 text-blue-600" />}
            title="Deconstructing 'Monthly Chart Regression'"
            subtitle="Translating Technical Analysis into a Quantitative Paradigm"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <InfoCard title="Core Concept: Price vs. Time">
                <p>Linear regression models the relationship between price (dependent variable, Y) and time (independent variable, X). It fits a straight line to historical price points to distill the underlying trend from market noise, providing a statistical basis for forecasting. Its key advantage is its universal applicability, as parameters are derived solely from an asset's price history.</p>
              </InfoCard>
              
              <InfoCard title="Academic Framework: Time-Series Momentum (TSMOM)">
                <p>"Monthly chart regression" aligns with TSMOM, which uses an asset's own past returns to inform trading decisions. This is also known as "absolute momentum" and is distinct from Cross-Sectional Momentum, which ranks assets against a peer group ("relative momentum").</p>
              </InfoCard>
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <GitCommit className="w-6 h-6 mr-3 text-blue-600" />
                The Fundamental Dichotomy
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-700">Trend-Following (Momentum)</h4>
                  <p className="text-sm mt-1">Assumes an established trend will persist. Aims to "buy high and sell higher" by trading in the direction of the trend. This is the more academically validated approach for long-term (e.g., 12-month) horizons.</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-700">Mean-Reversion</h4>
                  <p className="text-sm mt-1">Believes prices revert to their statistical mean after extreme deviations. Aims to "buy low, sell high" by trading against recent moves. More commonly applied over shorter timeframes.</p>
                </div>
              </div>
            </div>
          </ContentSection>

          {/* Section 2: Statistical Bedrock */}
          <ContentSection
            icon={<Scale className="w-10 h-10 text-blue-600" />}
            title="The Statistical Bedrock"
            subtitle="Assumptions and the Harsh Realities of Financial Markets"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <InfoCard title="The Ideal World: Gauss-Markov Assumptions">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong className="text-gray-900">Linearity:</strong> The relationship between price and time is linear.</li>
                  <li><strong className="text-gray-900">No Autocorrelation:</strong> Errors are independent of one another.</li>
                  <li><strong className="text-gray-900">Homoscedasticity:</strong> Errors have a constant variance.</li>
                  <li><strong className="text-gray-900">Weak Exogeneity:</strong> Time is treated as a fixed, error-free value.</li>
                </ul>
              </InfoCard>
              
              <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3"/>
                  Market Reality: Systematic Violations
                </h3>
                <p className="mb-2">Financial time-series data systematically violate these core assumptions:</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-red-900">
                  <li>Markets exhibit <strong className="text-gray-900">non-linearity</strong> (panics, euphoria).</li>
                  <li>Momentum and mean-reversion are forms of <strong className="text-gray-900">autocorrelation</strong>.</li>
                  <li><strong className="text-gray-900">Volatility clustering</strong> (heteroskedasticity) is a market hallmark.</li>
                </ul>
                <p className="mt-4 text-red-700 font-semibold">Consequence: A naive application of OLS is statistically unsound, leading to biased standard errors and unreliable significance tests. The model is a simplifying heuristic, not a precise forecasting tool.</p>
              </div>
            </div>
          </ContentSection>

          {/* Section 3: Modeling the Trend */}
          <ContentSection
            icon={<Sliders className="w-10 h-10 text-blue-600" />}
            title="Modeling the Trend"
            subtitle="Mathematical and Practical Implementation"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <InfoCard title="The Linear Regression Line (The Mean)">
                <p>The "line of best fit" that minimizes the squared distances from price points, calculated via Ordinary Least Squares (OLS). It represents the dynamic "fair value" during the lookback period.</p>
                <FormulaBlock formula="y = α + βx" />
                <p className="text-sm mt-2">Where 'y' is the predicted price, 'x' is time, 'α' is the intercept, and 'β' is the slope. The slope (β) is the most critical component, quantifying the trend's direction and velocity.</p>
              </InfoCard>
              
              <InfoCard title="The Linear Regression Channel (Volatility Framework)">
                <p>Adds parallel bands above and below the regression line, based on a multiple of the standard deviation. The channel width acts as a volatility normalization mechanism, adjusting signal thresholds to the current market environment.</p>
                <FormulaBlock formula="Band = Regression Line ± (N × StdDev)" />
                <p className="text-sm mt-2">Where 'N' is a multiplier (typically 1 or 2). This makes signals relative to the market's current "energy".</p>
              </InfoCard>
            </div>

            <div className="mt-8">
              <InfoCard title="Indicator Variants: Rolling Calculations">
                <p className="mb-4">The regression model is dynamic, recalculating with each new data point. This "rolling" nature gives rise to several common technical indicators found on charting platforms:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-700 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Linear Regression Indicator (Curve)
                    </h4>
                    <p className="text-sm mt-1">Plots only the final value of the regression line for each period. This creates a single, smooth line that is more responsive and has less lag than a traditional simple moving average.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 flex items-center">
                      <BarChart2 className="w-5 h-5 mr-2" />
                      Linear Regression Slope
                    </h4>
                    <p className="text-sm mt-1">An oscillator that plots the value of the slope coefficient (β) over time. It directly measures the momentum or rate-of-change of the trend, with values above zero indicating an uptrend and values below zero indicating a downtrend.</p>
                  </div>
                </div>
              </InfoCard>
            </div>
          </ContentSection>

          {/* Section 4: Empirical Evidence */}
          <ContentSection
            icon={<BarChart2 className="w-10 h-10 text-blue-600" />}
            title="Empirical Evidence"
            subtitle="The Performance of Long-Term Trend Strategies"
          >
            <p className="mb-8 text-center max-w-3xl mx-auto">
              Academic research, particularly on Time-Series Momentum (TSMOM), validates the historical effectiveness of long-term trend strategies. Studies show that an asset's 12-month past return is a significant predictor of its future return, an effect found across nearly all asset classes.
            </p>
            
            <PerformanceTable />
            
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-blue-600" />
                  The Speed Trade-Off
                </h3>
                <p className="text-sm"><strong className="text-blue-700">Faster Strategies (Short Lookbacks):</strong> Lower Sharpe ratios but higher positive skew. Better at tail-risk hedging and adapting to sudden shocks.</p>
                <p className="text-sm mt-2"><strong className="text-blue-700">Slower Strategies (Long Lookbacks):</strong> Higher Sharpe ratios but lower positive skew. Excel in sustained trends but are slower to react to reversals.</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  Crisis Alpha & Tail-Risk Hedging
                </h3>
                <p className="text-sm">A key benefit of TSMOM is its positive skewness. This means it tends to perform best during sustained market crises (e.g., 2008), providing a valuable "portfolio insurance" function when traditional assets are falling. This is often called "crisis alpha."</p>
              </div>
            </div>
          </ContentSection>

          {/* Section 5: Critical Appraisal */}
          <ContentSection
            icon={<AlertTriangle className="w-10 h-10 text-blue-600" />}
            title="A Critical Appraisal"
            subtitle="Risks, Limitations, and Academic Critiques"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <InfoCard title="Overfitting & Data Snooping">
                <p>The danger of tuning a model so perfectly to historical data that it captures noise, not signal. It performs well in backtests but fails in live trading.</p>
              </InfoCard>
              
              <InfoCard title="Model Fragility & Regime Shifts">
                <p>Trend-following performs poorly in choppy, range-bound markets. The primary risk is not model failure, but the absence of trends to capture (a "regime failure").</p>
              </InfoCard>
              
              <InfoCard title="The Psychological Burden">
                <p>Enduring low win rates (often &lt;40%) and deep drawdowns is psychologically grueling. It requires immense discipline to stick to a system that loses on the majority of its trades.</p>
              </InfoCard>
              
              <InfoCard title="Transaction Costs">
                <p>Academic studies often report gross returns. In reality, trading costs (commissions, slippage) can severely erode profitability, especially for smaller or more active portfolios.</p>
              </InfoCard>
            </div>
          </ContentSection>

          {/* Section 6: Strategic Synthesis */}
          <ContentSection
            icon={<BrainCircuit className="w-10 h-10 text-blue-600" />}
            title="Strategic Synthesis"
            subtitle="Recommendations for Model Application"
          >
            <ComparisonTable />
            
            <div className="mt-8">
              <InfoCard title="Enhancing the Basic Model">
                <p className="mb-4">A naive linear regression model is statistically fragile. Its performance can be improved by incorporating more sophisticated techniques:</p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-700 flex items-center">
                      <Scale className="w-5 h-5 mr-2" />
                      Statistical Robustness
                    </h4>
                    <p className="text-sm mt-1">Use methods like White's heteroskedasticity-consistent standard errors for more reliable tests, or model volatility directly with GARCH models instead of OLS.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 flex items-center">
                      <Layers className="w-5 h-5 mr-2" />
                      Advanced Portfolio Construction
                    </h4>
                    <p className="text-sm mt-1">Employ techniques like Hierarchical Clustering (e.g., HERC) to create more robustly diversified portfolios that account for the structural relationships between assets.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Signal Filtration
                    </h4>
                    <p className="text-sm mt-1">Do not use regression signals in isolation. Filter them with other indicators. For example, confirm a trend-following breakout with a high ADX reading to verify trend strength.</p>
                  </div>
                </div>
              </InfoCard>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Concluding Assessment: A Verdict</h3>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-green-800 flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    The Verdict: Potentially Effective
                  </h4>
                  <p className="text-sm text-green-900">Long-term, diversified TSMOM strategies have demonstrated historical effectiveness, delivering strong risk-adjusted returns and valuable portfolio diversification, especially during equity crises.</p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-red-800 flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Significant Caveats
                  </h4>
                  <p className="text-sm text-red-900">Success is highly conditional and requires a favorable market regime, broad diversification, robust risk management, and immense psychological fortitude to endure inevitable drawdowns.</p>
                </div>
              </div>
            </div>
          </ContentSection>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Dive Deeper?</h3>
            <p className="text-lg mb-6 opacity-90">
              Explore the complete research document for detailed mathematical proofs and additional empirical analysis.
            </p>
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 mr-4"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research
              </a>
            )}
          </div>

          {/* Educational Disclaimer */}
          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Educational Disclaimer</h4>
                <p className="text-sm text-yellow-700">
                  This analysis is for educational purposes only and should not be considered investment advice. 
                  Past performance does not guarantee future results. All trading strategies involve risk of loss. 
                  Consult with a qualified financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

// Reusable Components
const ContentSection = ({ icon, title, subtitle, children }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <section className="py-16 sm:py-20 border-t border-gray-200">
    <div className="text-center mb-12">
      <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
        {icon}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{title}</h2>
      <p className="mt-2 text-lg text-blue-600">{subtitle}</p>
    </div>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full">
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <div className="text-gray-600 space-y-3">
      {children}
    </div>
  </div>
);

const FormulaBlock = ({ formula }: { formula: string }) => (
  <div className="my-4 p-4 bg-gray-100 rounded-lg border border-blue-200">
    <p className="text-center text-lg font-mono text-blue-800 tracking-wider">{formula}</p>
  </div>
);

const PerformanceTable = () => (
  <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
    <table className="w-full text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-4 font-semibold text-gray-700">Strategy Type/Name</th>
          <th className="p-4 font-semibold text-gray-700">Asset Class</th>
          <th className="p-4 font-semibold text-gray-700">CAGR (%)</th>
          <th className="p-4 font-semibold text-gray-700">Max Drawdown (%)</th>
          <th className="p-4 font-semibold text-gray-700">Sharpe Ratio</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4">Dual MA Crossover</td>
          <td className="p-4">Diversified Futures</td>
          <td className="p-4 text-green-600">57.8</td>
          <td className="p-4 text-red-600">31.8</td>
          <td className="p-4">N/A</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4">Triple MA Crossover</td>
          <td className="p-4">Diversified Futures</td>
          <td className="p-4 text-green-600">48.1</td>
          <td className="p-4 text-red-600">31.3</td>
          <td className="p-4">N/A</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4">Stock Trend System</td>
          <td className="p-4">U.S. Stocks</td>
          <td className="p-4 text-green-600">19.3</td>
          <td className="p-4 text-red-600">-33.74</td>
          <td className="p-4">1.24</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4">Diversified 12-Month TSMOM</td>
          <td className="p-4">All Assets & Factors</td>
          <td className="p-4">N/A</td>
          <td className="p-4">N/A</td>
          <td className="p-4 font-bold text-blue-600">1.60</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ComparisonTable = () => (
  <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
    <h3 className="text-xl font-bold text-gray-900 p-6 text-center">
      Comparative Analysis: Trend-Following vs. Mean-Reversion
    </h3>
    <table className="w-full text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-4 font-semibold text-gray-700">Characteristic</th>
          <th className="p-4 font-semibold text-gray-700">Trend-Following</th>
          <th className="p-4 font-semibold text-gray-700">Mean-Reversion</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4 font-semibold">Underlying Logic</td>
          <td className="p-4">Trends continue. "Buy high, sell higher."</td>
          <td className="p-4">Extremes revert. "Buy low, sell high."</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4 font-semibold">Optimal Market</td>
          <td className="p-4">Sustained, trending markets.</td>
          <td className="p-4">Volatile, range-bound markets.</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4 font-semibold">Win Rate</td>
          <td className="p-4 text-red-600">Low (20%-40%)</td>
          <td className="p-4 text-green-600">High (80%-85%)</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4 font-semibold">Profit/Loss Profile</td>
          <td className="p-4">Many small losses, few large wins.</td>
          <td className="p-4">Many small wins, few large losses.</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="p-4 font-semibold">Psychological Challenge</td>
          <td className="p-4">Enduring long losing streaks.</td>
          <td className="p-4">Managing rare but catastrophic losses.</td>
        </tr>
      </tbody>
    </table>
  </div>
);