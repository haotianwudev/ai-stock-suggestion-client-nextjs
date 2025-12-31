import { StrategyDetailProps } from '../strategy-config';

export const ShortStrangleStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Short Strangle Strategy Details
        </h3>
      </div>

      {/* Strategy Intuition Section */}
      <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Strategy Intuition
        </h3>
        <div className="text-sm text-slate-700 space-y-4">
          <div className="bg-emerald-100 p-4 rounded-lg border border-emerald-200">
            <h4 className="font-bold text-emerald-900 mb-2">📋 Definition</h4>
            <p className="text-emerald-800">
              A <strong>short strangle</strong> is a neutral options strategy that involves:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-emerald-800">
              <li><strong>Sell OTM Call:</strong> Sell an out-of-the-money call option</li>
              <li><strong>Sell OTM Put:</strong> Sell an out-of-the-money put option at a different strike</li>
              <li><strong>Same Expiration:</strong> Both options have identical expiration dates</li>
            </ul>
            <p className="mt-2 text-emerald-800">
              This creates a <strong>wider profit zone</strong> with <strong>unlimited risk</strong> and <strong>higher probability of success</strong> compared to straddles.
            </p>
          </div>
          
          <p>
            The short strangle is a <strong>high-probability volatility selling strategy</strong> that trades maximum premium 
            collection for a wider profit zone. Unlike the short straddle, which requires price to stay at a single point, 
            the strangle profits as long as the underlying stays between the two strike prices.
          </p>
          
          <p>
            Think of it as <strong>selling insurance with a deductible</strong>. You collect premium upfront by selling 
            both calls and puts out-of-the-money, creating a "no man's land" between the strikes where you keep the full 
            premium. The strategy profits when the market's actual movement stays within this range.
          </p>
          
          <p>
            This strategy is particularly popular among <strong>income-focused traders and systematic volatility sellers</strong> 
            because it offers a better risk-adjusted return profile than straddles. The trade-off is lower premium collection 
            in exchange for higher win rates and more forgiving position management.
          </p>
          
          <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">💡 Key Insight</h4>
            <p className="text-blue-800">
              The short strangle optimizes for <strong>probability of profit over maximum profit</strong>. It's the preferred 
              strategy for traders who prioritize consistent income generation over maximum capital efficiency, making it 
              ideal for systematic premium collection programs.
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
              <h4 className="font-semibold mb-2 text-blue-700">Delta (Δ) ≈ 0</h4>
              <p>Initially neutral with lower delta sensitivity than straddles. Becomes directional as price approaches either strike.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-700">Gamma (Γ) - Lower Risk</h4>
              <p>Lower gamma exposure than straddles at initiation. Risk increases as price approaches either strike price.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-700">Theta (θ) + Good Benefit</h4>
              <p>Collects solid time decay premium. Less theta than straddles but still benefits significantly from time passage.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-violet-200">
              <h4 className="font-semibold mb-2 text-violet-700">Vega (ν) - Short Volatility</h4>
              <p>Benefits when implied volatility drops. Less vega exposure than straddles, making it less sensitive to IV changes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strangle vs Straddle Comparison */}
      <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          Short Strangle vs Short Straddle
        </h3>
        <div className="text-sm text-green-700 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-green-100 border-b border-green-200">
                  <th className="p-3 text-sm font-bold text-green-600">Feature</th>
                  <th className="p-3 text-sm font-bold text-emerald-600">Short Strangle</th>
                  <th className="p-3 text-sm font-bold text-purple-600">Short Straddle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                <tr>
                  <td className="p-3 font-medium">Strike Prices</td>
                  <td className="p-3 font-semibold text-emerald-600">Different strikes (OTM)</td>
                  <td className="p-3">Same strike (ATM)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Premium Collected</td>
                  <td className="p-3">Lower</td>
                  <td className="p-3 font-semibold text-purple-600">Higher</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Profit Zone</td>
                  <td className="p-3 font-semibold text-emerald-600">Wider range (Between strikes)</td>
                  <td className="p-3">Single point</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Win Rate</td>
                  <td className="p-3 font-semibold text-emerald-600">~50-70%</td>
                  <td className="p-3">~30-40%</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Gamma Risk</td>
                  <td className="p-3 font-semibold text-emerald-600">Lower</td>
                  <td className="p-3 text-rose-600">Highest</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Management Difficulty</td>
                  <td className="p-3 font-semibold text-emerald-600">Easier</td>
                  <td className="p-3">More Complex</td>
                </tr>
              </tbody>
            </table>
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
              <p>Sell the 16-delta call and 16-delta put. Creates approximately 68% probability of success (1 standard deviation move).</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 text-blue-800">20 Delta Method</h4>
              <p>Sell the 20-delta options for slightly higher premium collection while maintaining good probability of profit.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-800">Technical Levels</h4>
              <p>Use support/resistance levels or expected move calculations to set strikes at key technical boundaries.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">📊 Optimal Strike Width</h4>
            <p className="text-amber-800 mb-2">
              <strong>Narrow Strangles (5-10% width):</strong> Higher premium, lower win rate, more active management required<br/>
              <strong>Wide Strangles (15-20% width):</strong> Lower premium, higher win rate, more passive management
            </p>
            <p className="text-xs text-amber-600">
              Strike width = (Call Strike - Put Strike) / Current Stock Price × 100%
            </p>
          </div>
        </div>
      </div>

      {/* Optimal Deployment Conditions */}
      <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          Optimal Deployment Conditions
        </h3>
        <div className="text-sm text-blue-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">Ideal Market Conditions</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Elevated IV Rank:</strong> IV rank &gt; 50% for decent premium collection</li>
                <li><strong>Range-Bound Markets:</strong> Sideways or consolidating price action</li>
                <li><strong>Post-Event Periods:</strong> After earnings when volatility typically contracts</li>
                <li><strong>Low Correlation Environment:</strong> When individual stock moves are less correlated</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">Timing Considerations</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>30-45 DTE:</strong> Optimal time frame for theta acceleration</li>
                <li><strong>Avoid Binary Events:</strong> Unless specifically trading the IV crush</li>
                <li><strong>Market Hours:</strong> Consider deploying during high IV periods</li>
                <li><strong>Economic Calendar:</strong> Be aware of upcoming announcements</li>
              </ul>
            </div>
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
              <h4 className="font-semibold mb-2 text-red-800">Position Sizing Guidelines</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Risk 1-3% of account per trade (more conservative than straddles)</li>
                <li>Use notional buying power allocation method</li>
                <li>Consider portfolio correlation and concentration</li>
                <li>Scale position size with volatility environment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-800">Profit/Loss Targets</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Profit Target:</strong> Close at 50% of maximum profit</li>
                <li><strong>Loss Limit:</strong> Close at 2x premium collected</li>
                <li><strong>Time Stop:</strong> Close at 7-10 DTE regardless of P&L</li>
                <li><strong>Volatility Stop:</strong> Close if IV expands significantly</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">🎯 Breakeven Analysis</h4>
            <p className="text-red-800 mb-2">
              <strong>Upper Breakeven:</strong> Call Strike + Total Premium Collected<br/>
              <strong>Lower Breakeven:</strong> Put Strike - Total Premium Collected
            </p>
            <p className="text-xs text-red-600">
              Monitor these levels daily and consider adjustments as price approaches either breakeven.
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
              <h4 className="font-semibold mb-2 text-indigo-800">Roll Tested Side</h4>
              <p>If price approaches one strike, roll that option further out-of-the-money. Collect additional credit and widen the profit zone.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-800">Roll Entire Position</h4>
              <p>Roll both strikes to the next expiration cycle, typically for a net credit. Gives more time for mean reversion.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200">
              <h4 className="font-semibold mb-2 text-rose-800">Convert to Iron Condor</h4>
              <p>Add protective wings to create defined risk. Reduces profit potential but caps maximum loss at a known level.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🎪 Advanced: "Inverted" Strangle</h4>
            <p className="text-purple-800">
              In high volatility environments, consider selling closer-to-the-money options for higher premium collection, 
              then rolling them out as volatility contracts. This technique requires active management but can enhance returns.
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
              <p className="text-xs">Typically 50-70% when managed with 50% profit target</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-sm mb-2">Risk-Adjusted Returns</h4>
              <p className="text-xs">Better Sharpe ratio than straddles due to higher win rate</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-sm mb-2">Drawdown Profile</h4>
              <p className="text-xs">Smoother equity curve with smaller maximum drawdowns</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-teal-200">
            <h4 className="font-bold text-teal-900 mb-2">📈 Expected Returns</h4>
            <p className="text-teal-800 mb-2">
              <strong>Annualized Return:</strong> 8-15% when systematically deployed<br/>
              <strong>Maximum Drawdown:</strong> Typically 15-25% in adverse conditions<br/>
              <strong>Volatility of Returns:</strong> Lower than straddles, higher than covered calls
            </p>
            <p className="text-xs text-teal-600">
              Returns depend heavily on market regime, volatility environment, and position management discipline.
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
                  <li>16-delta strikes for consistent probability</li>
                  <li>Maximum 5 positions per underlying</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold mb-2 text-indigo-800">Exit Rules</h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>50% profit target (primary exit)</li>
                  <li>21 DTE time stop (secondary exit)</li>
                  <li>200% loss limit (risk management)</li>
                  <li>IV expansion &gt; 150% of entry level</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-2">📊 Portfolio Allocation</h4>
            <p className="text-indigo-800">
              Allocate 10-20% of portfolio to short strangle strategies across multiple underlyings. 
              Diversify across sectors and market capitalizations to reduce correlation risk. 
              Consider seasonal patterns and earnings calendars for optimal timing.
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
              <li><a href="/articles/mastering-short-volatility-straddles-strangles-systematic-premium-collection" className="text-blue-600 hover:underline">Mastering Short Volatility: Straddles & Strangles</a></li>
              <li><a href="https://www.cboe.com/education/resource-library/concepts/short-strangle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CBOE: Short Strangle Strategy</a></li>
              <li><a href="https://www.tastytrade.com/definitions/short-strangle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tastytrade: Short Strangle Mechanics</a></li>
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
          <strong>Risk Disclosure:</strong> Short strangles involve unlimited risk and are suitable only for experienced 
          traders with substantial risk tolerance. While generally considered less risky than short straddles, losses can 
          still exceed the initial investment and may result in margin calls. This strategy requires active management and 
          is not appropriate for all investors. Past performance does not guarantee future results. This information is for 
          educational purposes only and does not constitute investment advice. Please consult with a qualified financial 
          advisor before implementing any options strategy.
        </p>
      </div>
    </div>
  );
};