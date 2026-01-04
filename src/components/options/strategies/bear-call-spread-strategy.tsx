import { StrategyDetailProps } from '../strategy-config';

export const BearCallSpreadStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl border border-red-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📉</span>
          Bear Call Spread Strategy Details
        </h3>
      </div>

      {/* Strategy Intuition Section */}
      <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Strategy Intuition
        </h3>
        <div className="text-sm text-slate-700 space-y-4">
          <div className="bg-red-100 p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">📋 Definition</h4>
            <p className="text-red-800">
              A <strong>bear call spread</strong> is a bearish, income-generating options strategy that involves:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-red-800">
              <li><strong>Sell Lower Strike Call:</strong> Sell a call option at a lower strike price</li>
              <li><strong>Buy Higher Strike Call:</strong> Buy a call option at a higher strike price</li>
              <li><strong>Same Expiration:</strong> Both options have identical expiration dates</li>
              <li><strong>Net Credit:</strong> Receive premium upfront (credit spread)</li>
            </ul>
            <p className="mt-2 text-red-800">
              This creates a <strong>defined-risk, defined-reward</strong> strategy with <strong>high probability of success</strong> when deployed in bearish to neutral markets.
            </p>
          </div>
          
          <p>
            The bear call spread is a <strong>sophisticated income strategy</strong> that allows you to profit from three scenarios: 
            the stock declining, staying flat, or even rising slightly (as long as it stays below the short call strike). 
            This gives you multiple ways to win compared to simply shorting stock.
          </p>
          
          <p>
            Think of it as <strong>selling insurance on upward movement</strong>. You collect premium upfront by selling a call option, 
            but you limit your risk by buying a more expensive call option above it. The difference between the strikes defines your maximum 
            risk, while the credit received is your maximum profit.
          </p>
          
          <p>
            This strategy is particularly popular among <strong>income-focused traders and systematic premium sellers</strong> 
            during bearish market conditions or when individual stocks show signs of topping out. It offers excellent risk-adjusted 
            returns with high win rates (typically 65-80% when managed properly).
          </p>
          
          <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">💡 Key Insight</h4>
            <p className="text-blue-800">
              The bear call spread optimizes for <strong>probability of profit in bearish conditions</strong>. It requires 
              significantly less capital than shorting stock while providing similar bearish exposure with built-in risk management. 
              This makes it ideal for systematic income generation during market downturns.
            </p>
          </div>
        </div>
      </div>

      {/* Bear Call vs Bull Put Comparison */}
      <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          Bear Call Spread vs Bull Put Spread
        </h3>
        <div className="text-sm text-red-700 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-red-100 border-b border-red-200">
                  <th className="p-3 text-sm font-bold text-red-600">Feature</th>
                  <th className="p-3 text-sm font-bold text-rose-600">Bear Call Spread</th>
                  <th className="p-3 text-sm font-bold text-green-600">Bull Put Spread</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                <tr>
                  <td className="p-3 font-medium">Market Outlook</td>
                  <td className="p-3 font-semibold text-rose-600">Bearish to Neutral</td>
                  <td className="p-3">Bullish to Neutral</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Strike Selection</td>
                  <td className="p-3 font-semibold text-rose-600">Above current price (OTM calls)</td>
                  <td className="p-3">Below current price (OTM puts)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Assignment Risk</td>
                  <td className="p-3 font-semibold text-rose-600">Higher early assignment risk</td>
                  <td className="p-3 text-amber-600">Early assignment possible</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Dividend Impact</td>
                  <td className="p-3 text-rose-600">Hurt by dividends (increases assignment risk)</td>
                  <td className="p-3 font-semibold text-green-600">Benefits from dividends</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Margin Requirements</td>
                  <td className="p-3 text-rose-600">Higher (naked call margin)</td>
                  <td className="p-3 font-semibold text-green-600">Lower (cash-secured)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Liquidity Preference</td>
                  <td className="p-3">Good</td>
                  <td className="p-3 font-semibold text-green-600">Better (puts more liquid)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">🎯 When to Choose Bear Call Spreads</h4>
            <p className="text-red-800">
              Bear call spreads are preferred when you have a strong bearish conviction, expect resistance at current levels, 
              or want to capitalize on overbought conditions. They work best in declining volatility environments where 
              calls are expensive due to fear of upside breakouts.
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
              <h4 className="font-semibold mb-2 text-red-700">Delta (Δ) - Bearish</h4>
              <p>Negative delta exposure. Benefits from downward price movement. Delta becomes more negative as price approaches short strike.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-700">Gamma (Γ) - Manageable Risk</h4>
              <p>Negative gamma when profitable. Risk increases as price approaches short call strike, requiring active management.</p>
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
              <p>Sell the 16-delta call for approximately 84% probability of success. This targets one standard deviation moves.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 text-blue-800">20-30 Delta Method</h4>
              <p>Sell 20-30 delta calls for higher premium collection while maintaining good probability (70-80% success rate).</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-800">Technical Levels</h4>
              <p>Use resistance levels, moving averages, or Fibonacci extensions to set strikes at key technical boundaries.</p>
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
                <li><strong>Bearish Setup:</strong> Technical resistance or overbought conditions</li>
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
              <li>Identify bearish technical setup or resistance</li>
              <li>Select expiration 30-45 days out</li>
              <li>Sell call at 16-20 delta strike (above current price)</li>
              <li>Buy call 5-15 strikes higher</li>
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
                <li><strong>Technical Stop:</strong> Close if price breaks key resistance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-800">Assignment Management</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Monitor ITM calls:</strong> Especially near ex-dividend dates</li>
                <li><strong>Roll before assignment:</strong> If still bearish on underlying</li>
                <li><strong>Accept assignment:</strong> If comfortable shorting stock</li>
                <li><strong>Close position:</strong> If outlook has changed to bullish</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">🎯 Breakeven Analysis</h4>
            <p className="text-red-800 mb-2">
              <strong>Breakeven Point:</strong> Short Call Strike + Net Credit Received<br/>
              <strong>Maximum Profit:</strong> Net Credit Received (if stock stays below short strike)<br/>
              <strong>Maximum Loss:</strong> Strike Width - Net Credit Received
            </p>
            <p className="text-xs text-red-600">
              Example: Sell $105 call, buy $110 call for $1.30 credit. Breakeven = $106.30, Max profit = $130, Max loss = $370
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
              <h4 className="font-semibold mb-2 text-indigo-800">Roll Up and Out</h4>
              <p>If stock moves against you, roll the spread to higher strikes and later expiration for additional credit.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-800">Close Winning Side</h4>
              <p>If spread is profitable early, close the position and redeploy capital rather than holding to expiration.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200">
              <h4 className="font-semibold mb-2 text-rose-800">Convert to Iron Condor</h4>
              <p>Add a bull put spread below current price to create an iron condor, collecting additional premium.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🎪 Advanced: "Ladder" Strategy</h4>
            <p className="text-purple-800">
              Deploy multiple bear call spreads at different strike levels and expirations to create a "ladder" of income. 
              This technique provides consistent cash flow while managing risk through diversification across time and strikes, 
              particularly effective in sustained bear markets.
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
              <p className="text-xs">Requires less capital than shorting stock</p>
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
                  <li>Bearish technical setup confirmed</li>
                  <li>Maximum 10 positions per underlying</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold mb-2 text-indigo-800">Exit Rules</h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>50% profit target (primary exit)</li>
                  <li>21 DTE time stop (secondary exit)</li>
                  <li>200% loss limit (risk management)</li>
                  <li>Technical breakdown above key resistance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-2">📊 Portfolio Allocation</h4>
            <p className="text-indigo-800">
              Allocate 10-20% of portfolio to bear call spread strategies during bearish market regimes. 
              Combine with bull put spreads for market-neutral income generation. Diversify across sectors 
              and expiration cycles to reduce correlation risk and smooth returns.
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
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tools & Analysis</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="https://www.optionsprofitcalculator.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Options Profit Calculator</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <p className="text-xs text-gray-600">
          <strong>Risk Disclosure:</strong> Bear call spreads involve substantial risk and are suitable only for experienced 
          traders with adequate risk tolerance. While risk is defined, losses can equal the maximum loss amount and may 
          result in assignment of short stock positions. This strategy requires active management and is not appropriate 
          for all investors. Assignment risk is higher with call spreads, especially near ex-dividend dates. Past performance 
          does not guarantee future results. This information is for educational purposes only and does not constitute 
          investment advice. Please consult with a qualified financial advisor before implementing any options strategy.
        </p>
      </div>
    </div>
  );
};