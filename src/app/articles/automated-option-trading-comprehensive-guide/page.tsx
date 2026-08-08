'use client';

import { TrendingUp, Shield, Target, BarChart3, AlertTriangle } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

export default function AutomatedOptionTradingGuide() {
  return (
    <ArticleFrame
      slug="automated-option-trading-comprehensive-guide"
      additionalDisclaimer="Options trading involves significant risk and may not be suitable for all investors. Past performance does not guarantee future results. Always consult with qualified financial professionals before making investment decisions."
    >
      <div className="max-w-3xl mx-auto bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-16">
        <blockquote className="text-lg italic text-gray-700">
          &ldquo;The philosophy, logic, and quantitative procedures used in the creation of automated systems for options trading are completely different from those used in conventional trading algorithms.&rdquo;
        </blockquote>
      </div>

      {/* Five Pillars Overview */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Five Pillars of Automated System Development</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
            <Target className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">1. Trading Strategies</h3>
            <p className="text-gray-600">Market-neutral and partially directional strategies tailored to options&apos; non-linear nature.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
            <TrendingUp className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">2. Optimization</h3>
            <p className="text-gray-600">Finding optimal parameters using multicriteria analysis and ensuring robustness.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
            <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">3. Risk Management</h3>
            <p className="text-gray-600">Utilizing &ldquo;The Greeks&rdquo; and Index Delta for portfolio risk management.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
            <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">4. Capital Allocation</h3>
            <p className="text-gray-600">Portfolio construction based on risk, return, and unique option indicators.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
            <AlertTriangle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">5. Backtesting</h3>
            <p className="text-gray-600">Rigorous validation with historical data while avoiding overfitting.</p>
          </div>
        </div>
      </div>

      {/* Strategy Development Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-indigo-500 pb-2">1. Development of Trading Strategies</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Market-Neutral Strategies</h3>
            <p className="mb-4 text-gray-600">
              These strategies aim for insensitivity to small price changes. A position is market-neutral when the sum of deltas equals zero.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Key Concepts:</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• <strong>Delta-Neutrality Boundaries:</strong> Parameter combinations where portfolio delta is zero</li>
                <li>• <strong>High Volatility Impact:</strong> Portfolios often composed of short combinations</li>
                <li>• <strong>Quantitative Metrics:</strong> Threshold index, strikes range, boundary length, attainability</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Partially Directional Strategies</h3>
            <p className="mb-4 text-gray-600">
              Incorporate price movement forecasts while maintaining delta-neutrality to minimize sensitivity to unpredictable fluctuations.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Implementation Methods:</h4>
              <ul className="space-y-2 text-green-700 text-sm">
                <li>• <strong>Probability Adjustment:</strong> Shifting expected price using empirical distributions</li>
                <li>• <strong>Structure Modification:</strong> Asymmetrical call-to-put ratios</li>
                <li>• <strong>Trade-offs:</strong> Less diversification, higher loss probability and VaR</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-indigo-500 pb-2">2. Optimization</h2>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Robustness &amp; Solution Quality</h3>
          <p className="text-gray-600 mb-6">
            Optimization combines mathematical fields to find optimal parameter values. The key challenge is ensuring robustness&mdash;insensitivity to small parameter changes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Averaging Adjacent Cells</h4>
              <p className="text-purple-700 text-sm">Smoothing optimization space to highlight robust areas</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Mean-to-Error Ratio</h4>
              <p className="text-purple-700 text-sm">Weighting robustness by analyzing surrounding nodes</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Surface Geometry</h4>
              <p className="text-purple-700 text-sm">Quantifying robustness through geometric shape analysis</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Correlation Analysis</h4>
              <p className="text-yellow-700">
                Different objective functions create distinct optimization spaces. Profit and Sharpe ratio show high correlation (0.95), while others provide unique information for decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Management Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-indigo-500 pb-2">3. Risk Management</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">The Greeks &amp; Index Delta</h3>
            <p className="text-gray-600 mb-4">
              Traditional risk methods are inappropriate for options due to asymmetric, non-normal return distributions.
            </p>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">The Greeks</h4>
                <p className="text-red-700 text-sm">Delta, Gamma, Vega indicate price sensitivity. Not additive across different underlying assets.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Index Delta</h4>
                <p className="text-blue-700 text-sm">Measures portfolio sensitivity to broad market fluctuations using regression models.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Effectiveness Factors</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-700 text-sm">Most reliable for long-term options</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-700 text-sm">Higher accuracy during calm markets</span>
              </div>
              <div className="flex items-center p-3 bg-red-50 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-red-700 text-sm">Less reliable near expiration</span>
              </div>
              <div className="flex items-center p-3 bg-red-50 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-red-700 text-sm">Reduced effectiveness in volatile periods</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capital Allocation Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-indigo-500 pb-2">4. Capital Allocation &amp; Portfolio Construction</h2>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
          <p className="text-lg text-gray-600 mb-6">
            Classical portfolio theory (Markowitz) doesn&apos;t apply to options due to non-normal returns, the importance of &ldquo;the Greeks,&rdquo; and limited option lifespans.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Allocation Indicators</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Unrelated to Return/Risk</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Stock-Equivalency method</li>
                    <li>• Inverse premium allocation</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Related to Return/Risk</h4>
                  <ul className="text-indigo-700 text-sm space-y-1">
                    <li>• Expected Profit weighting</li>
                    <li>• Profit Probability factors</li>
                    <li>• Delta-based allocation</li>
                    <li>• VaR considerations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">Weight Function Types</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Conservative (Concave)</h4>
                  <p className="text-green-700 text-sm">More diversified portfolios with reduced concentration</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Aggressive (Convex)</h4>
                  <p className="text-orange-700 text-sm">Higher capital concentration in top performers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backtesting Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b-2 border-indigo-500 pb-2">5. Backtesting of Option Trading Strategies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Database &amp; Data Integrity</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></div>
                <span>Specialized data vendors with extensive history</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></div>
                <span>Include &ldquo;extinct&rdquo; assets to avoid survival bias</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></div>
                <span>Synchronized and reliable data validation</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Execution Modeling</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                <span>Account for low liquidity impacts</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                <span>Model slippage and market impact</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                <span>Commissions can impact 50% of profitability</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-1" />
            <div>
              <h4 className="font-semibold text-red-800 mb-3">Overfitting: The Greatest Challenge</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded">
                  <h5 className="font-semibold text-red-700 text-sm mb-1">In-Sample vs Out-of-Sample</h5>
                  <p className="text-red-600 text-xs">Separate optimization and testing periods</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <h5 className="font-semibold text-red-700 text-sm mb-1">Walk-Forward Analysis</h5>
                  <p className="text-red-600 text-xs">Periodic reoptimization on moving windows</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <h5 className="font-semibold text-red-700 text-sm mb-1">Robustness Testing</h5>
                  <p className="text-red-600 text-xs">Performance analysis around optimal parameters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Key Takeaways</h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-800">Why Options Are Different</h3>
              <ul className="space-y-2 text-indigo-700">
                <li>• Non-linear payoff structures</li>
                <li>• Time decay considerations</li>
                <li>• Volatility sensitivity</li>
                <li>• Complex risk characteristics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-800">Success Factors</h3>
              <ul className="space-y-2 text-purple-700">
                <li>• Portfolio-level analysis approach</li>
                <li>• Robust parameter selection</li>
                <li>• Comprehensive risk management</li>
                <li>• Rigorous backtesting methodology</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ArticleFrame>
  );
}
