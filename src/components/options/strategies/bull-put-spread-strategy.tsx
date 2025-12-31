import { StrategyDetailProps } from '../strategy-config';

export const BullPutSpreadStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📈</span>
          Bull Put Spread Strategy Details
        </h3>
      </div>

      {/* Strategy Intuition Section */}
      <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Strategy Intuition
        </h3>
        <div className="text-sm text-slate-700 space-y-4">
          <div className="bg-green-100 p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">📋 Definition</h4>
            <p className="text-green-800">
              A <strong>bull put spread</strong> is a bullish, income-generating options strategy that involves:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-green-800">
              <li><strong>Sell Higher Strike Put:</strong> Sell a put option at a higher strike price</li>
              <li><strong>Buy Lower Strike Put:</strong> Buy a put option at a lower strike price</li>
              <li><strong>Same Expiration:</strong> Both options have identical expiration dates</li>
              <li><strong>Net Credit:</strong> Receive premium upfront (credit spread)</li>
            </ul>
            <p className="mt-2 text-green-800">
              This creates a <strong>defined-risk, defined-reward</strong> strategy with <strong>high probability of success</strong> when deployed correctly.
            </p>
          </div>
          
          <p>
            The bull put spread is a <strong>sophisticated income strategy</strong> that allows you to profit from three scenarios: 
            the stock rising, staying flat, or even declining slightly. Unlike buying stock where you only profit from upward movement, 
            this strategy gives you multiple ways to win.
          </p>
          
          <p>
            Think of it as <strong>selling insurance with a deductible</strong>. You collect premium upfront by selling a put option, 
            but you limit your risk by buying a cheaper put option below it. The difference between the strikes defines your maximum 
            risk, while the credit received is your maximum profit.
          </p>
          
          <p>
            This strategy is particularly popular among <strong>income-focused traders and systematic premium sellers</strong> 
            because it offers excellent risk-adjusted returns with high win rates (typically 65-80% when managed properly). 
            It's the preferred method for generating consistent income while maintaining defined risk parameters.
          </p>
          
          <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">💡 Key Insight</h4>
            <p className="text-blue-800">
              The bull put spread optimizes for <strong>probability of profit and capital efficiency</strong>. It requires 
              significantly less capital than owning stock while providing similar bullish exposure with built-in risk management. 
              This makes it ideal for systematic income generation and portfolio diversification.
            </p>
          </div>
        </div>
      </div>

      {/* Bull Put vs Bear Call Comparison */}
      <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          Bull Put Spread vs Bear Call Spread
        </h3>
        <div className="text-sm text-green-700 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-green-100 border-b border-green-200">
                  <th className="p-3 text-sm font-bold text-green-600">Feature</th>
                  <th className="p-3 text-sm font-bold text-emerald-600">Bull Put Spread</th>
                  <th className="p-3 text-sm font-bold text-red-600">Bear Call Spread</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                <tr>
                  <td className="p-3 font-medium">Market Outlook</td>
                  <td className="p-3 font-semibold text-emerald-600">Bullish to Neutral</td>
                  <td className="p-3">Bearish to Neutral</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Strike Selection</td>
                  <td className="p-3 font-semibold text-emerald-600">Below current price (OTM puts)</td>
                  <td className="p-3">Above current price (OTM calls)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Assignment Risk</td>
                  <td className="p-3 text-amber-600">Early assignment possible</td>
                  <td className="p-3 font-semibold text-red-600">Higher early assignment risk</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Dividend Impact</td>
                  <td className="p-3 font-semibold text-emerald-600">Benefits from dividends</td>
                  <td className="p-3 text-rose-600">Hurt by dividends</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Margin Requirements</td>
                  <td className="p-3">Lower (cash-secured)</td>
                  <td className="p-3 font-semibold text-red-600">Higher (naked call margin)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Liquidity Preference</td>
                  <td className="p-3 font-semibold text-emerald-600">Better (puts more liquid)</td>
                  <td className="p-3">Good</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">🎯 Why Choose Bull Put Spreads?</h4>
            <p className="text-green-800">
              Bull put spreads are generally preferred over bear call spreads for bullish strategies because puts typically 
              have better liquidity, lower assignment risk, and benefit from dividend payments. They also require less margin 
              and are easier to manage mechanically.
            </p>
          </div>
        </div>
      </div>

      {/* Greeks Profile */}
      <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📈</span>
          Greeks Profile
        </h3>
        <div className="text-sm text-indigo-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold mb-2 text-blue-700">Delta (Δ) + Bullish</h4>
              <p>Positive delta exposure. Benefits from upward price movement. Delta increases as price approaches short strike.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-700">Gamma (Γ) - Manageable Risk</h4>
              <p>Negative gamma when profitable. Risk increases as price approaches short put strike, requiring active management.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-700">Theta (θ) + Excellent Benefit</h4>
              <p>Strong positive theta. Time decay works in your favor, accelerating profit as expiration approaches.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-violet-200">
              <h4 className="font-semibold mb-2 text-violet-700">Vega (ν) - Short Volatility</h4>
              <p>Negative vega exposure. Benefits when implied volatility decreases after trade initiation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strike Selection Framework */}
      <div className="bg-amber-50 p-4 md:p-6 rounded-xl shadow-lg border border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Strike Selection Framework
        </h3>
        <div className="text-sm text-amber-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold mb-2 text-amber-800">16 Delta Method</h4>
              <p>Sell the 16-delta put for approximately 84% probability of success. This targets one standard deviation moves.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 text-blue-800">20-30 Delta Method</h4>
              <p>Sell 20-30 delta puts for higher premium collection while maintaining good probability (70-80% success rate).</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-800">Technical Levels</h4>
              <p>Use support levels, moving averages, or Fibonacci retracements to set strikes at key technical boundaries.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">📊 Optimal Strike Width</h4>
            <p className="text-amber-800 mb-2">
              <strong>Narrow Spreads ($5-10 width):</strong> Higher premium collection, lower capital requirements, more active management<br/>
              <strong>Wide Spreads ($15-25 width):</strong> Lower premium, higher capital requirements, more passive management
            </p>
            <p className="text-xs text-amber-600">
              Target credit received = 20-40% of strike width for optimal risk/reward ratio
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          Implementation Framework
        </h3>
        <div className="text-sm text-blue-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">Entry Criteria</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>IV Rank &gt; 30%:</strong> Ensure adequate premium collection</li>
                <li><strong>30-45 DTE:</strong> Optimal time frame for theta acceleration</li>
                <li><strong>Liquid Underlyings:</strong> Focus on high-volume stocks and ETFs</li>
                <li><strong>No Earnings:</strong> Avoid binary events during trade duration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">Position Sizing</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Risk 1-2%:</strong> Of account per trade maximum</li>
                <li><strong>Diversification:</strong> Maximum 5-10 positions per underlying</li>
                <li><strong>Sector Limits:</strong> Avoid concentration in single sectors</li>
                <li><strong>Correlation:</strong> Monitor portfolio-wide delta exposure</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">📋 Step-by-Step Execution</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Screen for high IV rank underlyings (&gt;30%)</li>
              <li>Select expiration 30-45 days out</li>
              <li>Sell put at 16-20 delta strike</li>
              <li>Buy put 5-15 strikes lower</li>
              <li>Target 20-40% credit of strike width</li>
              <li>Set profit target at 50% of credit received</li>
              <li>Set loss limit at 2x credit received</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Risk Management Framework */}
      <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Risk Management Framework
        </h3>
        <div className="text-sm text-red-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-red-800">Profit/Loss Targets</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Profit Target:</strong> Close at 50% of maximum profit</li>
                <li><strong>Loss Limit:</strong> Close at 200% of credit received</li>
                <li><strong>Time Stop:</strong> Close at 7-10 DTE regardless of P&L</li>
                <li><strong>Technical Stop:</strong> Close if price breaks key support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-800">Assignment Management</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Monitor ITM puts:</strong> Especially near ex-dividend dates</li>
                <li><strong>Roll before assignment:</strong> If still bullish on underlying</li>
                <li><strong>Accept assignment:</strong> If comfortable owning stock</li>
                <li><strong>Close position:</strong> If outlook has changed</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">🎯 Breakeven Analysis</h4>
            <p className="text-red-800 mb-2">
              <strong>Breakeven Point:</strong> Short Put Strike - Net Credit Received<br/>
              <strong>Maximum Profit:</strong> Net Credit Received (if stock stays above short strike)<br/>
              <strong>Maximum Loss:</strong> Strike Width - Net Credit Received
            </p>
            <p className="text-xs text-red-600">
              Example: Sell $100 put, buy $95 put for $1.50 credit. Breakeven = $98.50, Max profit = $150, Max loss = $350
            </p>
          </div>
        </div>
      </div>

      {/* Position Adjustments */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          Position Adjustment Strategies
        </h3>
        <div className="text-sm text-purple-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold mb-2 text-indigo-800">Roll Down and Out</h4>
              <p>If stock moves against you, roll the spread to lower strikes and later expiration for additional credit.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-800">Close Winning Side</h4>
              <p>If spread is profitable early, close the position and redeploy capital rather than holding to expiration.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200">
              <h4 className="font-semibold mb-2 text-rose-800">Convert to Iron Condor</h4>
              <p>Add a bear call spread above current price to create an iron condor, collecting additional premium.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🎪 Advanced: "Ladder" Strategy</h4>
            <p className="text-purple-800">
              Deploy multiple bull put spreads at different strike levels and expirations to create a "ladder" of income. 
              This technique provides consistent cash flow while managing risk through diversification across time and strikes.
            </p>
          </div>
        </div>
      </div>

      {/* Performance Characteristics */}
      <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
        <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Expected Performance Characteristics
        </h3>
        <div className="text-sm text-teal-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-sm mb-2">Win Rate</h4>
              <p className="text-xs">Typically 65-80% when managed with 50% profit target</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-sm mb-2">Return on Capital</h4>
              <p className="text-xs">15-25% annualized when systematically deployed</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-sm mb-2">Capital Efficiency</h4>
              <p className="text-xs">Requires 20-40% less capital than owning stock</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-teal-200">
            <h4 className="font-bold text-teal-900 mb-2">📈 Expected Returns</h4>
            <p className="text-teal-800 mb-2">
              <strong>Monthly Return:</strong> 2-4% of capital deployed<br/>
              <strong>Annualized Return:</strong> 15-25% when systematically managed<br/>
              <strong>Maximum Drawdown:</strong> Typically 10-20% in adverse conditions<br/>
              <strong>Sharpe Ratio:</strong> Often exceeds 1.0 due to high win rate
            </p>
            <p className="text-xs text-teal-600">
              Returns depend on market regime, volatility environment, and disciplined position management.
            </p>
          </div>
        </div>
      </div>

      {/* Systematic Implementation */}
      <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          Systematic Implementation
        </h3>
        <div className="text-sm text-indigo-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Mechanical Rules Framework</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold mb-2 text-indigo-800">Entry Rules</h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>IV Rank &gt; 30% (minimum threshold)</li>
                  <li>45 DTE standard expiration</li>
                  <li>16-20 delta short strike</li>
                  <li>Target 25-35% credit of strike width</li>
                  <li>Maximum 10 positions per underlying</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold mb-2 text-indigo-800">Exit Rules</h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>50% profit target (primary exit)</li>
                  <li>21 DTE time stop (secondary exit)</li>
                  <li>200% loss limit (risk management)</li>
                  <li>Technical breakdown below key support</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-2">📊 Portfolio Allocation</h4>
            <p className="text-indigo-800">
              Allocate 15-30% of portfolio to bull put spread strategies across multiple underlyings. 
              Diversify across sectors, market capitalizations, and expiration cycles to reduce correlation risk. 
              Consider market regime and volatility environment for optimal allocation sizing.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Resources */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          Educational Resources
        </h3>
        <div className="text-sm text-gray-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Recommended Reading</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="/articles/vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling" className="text-blue-600 hover:underline">Vertical Credit Spreads: Comprehensive Guide</a></li>
              <li><a href="https://www.cboe.com/education/resource-library/concepts/bull-put-spread" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CBOE: Bull Put Spread Strategy</a></li>
              <li><a href="https://www.tastytrade.com/definitions/bull-put-spread" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tastytrade: Bull Put Spread Mechanics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tools & Analysis</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="/option/viewer" className="text-blue-600 hover:underline">Options Viewer - Analyze Probability</a></li>
              <li><a href="https://www.optionsprofitcalculator.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Options Profit Calculator</a></li>
              <li><a href="https://www.barchart.com/stocks/quotes/$SPX/options" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Barchart: Options Chain Analysis</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <p className="text-xs text-gray-600">
          <strong>Risk Disclosure:</strong> Bull put spreads involve substantial risk and are suitable only for experienced 
          traders with adequate risk tolerance. While risk is defined, losses can equal the maximum loss amount and may 
          result in assignment of the underlying stock. This strategy requires active management and is not appropriate 
          for all investors. Past performance does not guarantee future results. This information is for educational 
          purposes only and does not constitute investment advice. Please consult with a qualified financial advisor 
          before implementing any options strategy.
        </p>
      </div>
    </div>
  );
};