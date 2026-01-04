import { StrategyDetailProps } from '../strategy-config';

export const BearPutSpreadStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-xl border border-red-200 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">📉</span>
                Bear Put Spread Strategy Details
            </h3>
        </div>
      {/* Strategy Intuition */}
        <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            Strategy Intuition
          </h3>
          <div className="text-sm text-slate-700 space-y-4">
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Core Concept:</h4>
              <p className="mb-2">The bear put spread is a <strong>capital-efficient bearish strategy</strong> that combines buying and selling puts to create defined risk and defined reward. You buy a put at a higher strike and sell a put at a lower strike, reducing your net cost while capping your maximum profit.</p>
              <p>This strategy leverages the <strong>structural efficiency of vertical spreads</strong> - you get bearish exposure at a fraction of the cost of buying puts outright, while maintaining excellent risk management through defined maximum loss.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Bear Put Spreads Work:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Capital efficiency:</strong> Lower cost than buying puts outright</li>
                <li>• <strong>Defined risk/reward:</strong> Both maximum loss and profit are known upfront</li>
                <li>• <strong>Reduced time decay:</strong> Short put partially offsets long put theta</li>
                <li>• <strong>Volatility neutral:</strong> Less sensitive to IV changes than single legs</li>
                <li>• <strong>Higher probability:</strong> Lower breakeven than long puts alone</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The "Spread Advantage" Phenomenon:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-red-100 p-3 rounded">
                  <p className="font-medium text-red-800">💰 Cost Reduction</p>
                  <p className="text-xs text-red-700">Selling the lower strike put reduces net debit by 40-70%, making bearish bets more affordable</p>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-medium text-blue-800">🎯 Risk Management</p>
                  <p className="text-xs text-blue-700">Maximum loss is limited to net debit paid, providing clear risk parameters for position sizing</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Strategic Motivations for Bear Put Spreads:</h4>
              <div className="space-y-2">
                <div className="bg-red-100 p-2 rounded">
                  <p className="font-medium text-red-800 text-sm">🎯 Moderate Bearishness:</p>
                  <p className="text-xs text-red-700">Perfect for scenarios where you expect steady, moderate price decline</p>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800 text-sm">💡 Capital Preservation:</p>
                  <p className="text-xs text-blue-700">Reduce capital at risk while maintaining meaningful downside participation</p>
                </div>
                <div className="bg-purple-100 p-2 rounded">
                  <p className="font-medium text-purple-800 text-sm">⚖️ Risk-Adjusted Returns:</p>
                  <p className="text-xs text-purple-700">Better risk-adjusted returns than long puts in many market conditions</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <p className="font-medium text-yellow-800 text-sm">🔄 Portfolio Diversification:</p>
                  <p className="text-xs text-yellow-700">Deploy multiple spreads across different strikes and expirations</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Market Demographics & Spread Traders:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-indigo-100 p-2 rounded">
                  <p className="font-medium text-indigo-800 text-sm">📊 Systematic Traders</p>
                  <ul className="text-xs text-indigo-700 space-y-1 mt-1">
                    <li>• Quantitative funds</li>
                    <li>• Risk-managed strategies</li>
                    <li>• Institutional players</li>
                    <li>• Professional traders</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-2 rounded">
                  <p className="font-medium text-teal-800 text-sm">🎯 Conservative Bears</p>
                  <ul className="text-xs text-teal-700 space-y-1 mt-1">
                    <li>• Hedge fund managers</li>
                    <li>• Risk-averse traders</li>
                    <li>• Swing traders</li>
                    <li>• Technical analysts</li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="font-medium text-gray-800 text-sm">🏦 Sophisticated Retail</p>
                  <ul className="text-xs text-gray-700 space-y-1 mt-1">
                    <li>• Experienced options traders</li>
                    <li>• Portfolio managers</li>
                    <li>• Financial advisors</li>
                    <li>• Education-focused traders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Greeks Analysis for Bear Put Spreads:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-red-100 p-3 rounded">
                  <h5 className="font-medium text-red-800 mb-1">📉 Delta (Net Negative)</h5>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• <strong>Long put delta:</strong> -0.30 to -0.70</li>
                    <li>• <strong>Short put delta:</strong> +0.10 to +0.30</li>
                    <li>• <strong>Net delta:</strong> -0.20 to -0.40</li>
                    <li>• <strong>Directional exposure:</strong> Benefits from downward moves</li>
                  </ul>
                </div>
                <div className="bg-orange-100 p-3 rounded">
                  <h5 className="font-medium text-orange-800 mb-1">⚡ Gamma (Mixed)</h5>
                  <ul className="text-xs text-orange-700 space-y-1">
                    <li>• <strong>Long put gamma:</strong> Positive acceleration</li>
                    <li>• <strong>Short put gamma:</strong> Negative acceleration</li>
                    <li>• <strong>Net effect:</strong> Depends on strikes relative to price</li>
                    <li>• <strong>Risk zone:</strong> Between strikes can be negative gamma</li>
                  </ul>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800 mb-1">🕐 Theta (Mixed Impact)</h5>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• <strong>Long put theta:</strong> Negative (loses value)</li>
                    <li>• <strong>Short put theta:</strong> Positive (gains value)</li>
                    <li>• <strong>Net theta:</strong> Usually slightly negative</li>
                    <li>• <strong>Time decay:</strong> Less impact than single long puts</li>
                  </ul>
                </div>
                <div className="bg-purple-100 p-3 rounded">
                  <h5 className="font-medium text-purple-800 mb-1">📊 Vega (Mixed Impact)</h5>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• <strong>Long put vega:</strong> Positive (benefits from IV rise)</li>
                    <li>• <strong>Short put vega:</strong> Negative (hurt by IV rise)</li>
                    <li>• <strong>Net vega:</strong> Usually slightly positive</li>
                    <li>• <strong>IV sensitivity:</strong> Much less than single long puts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strike Selection & Timing */}
        <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Strike Selection & Timing Strategy
          </h3>
          <div className="text-sm text-red-700 space-y-4">
            <div className="border-l-4 border-red-300 pl-4">
              <h4 className="font-semibold text-red-800">Strike Selection Framework</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800">🎯 Long Put Strike</h5>
                  <ul className="text-xs text-blue-700 space-y-1 mt-1">
                    <li>• <strong>ATM or ITM:</strong> Higher delta, better probability</li>
                    <li>• <strong>Strike selection:</strong> At or 1-2 strikes ITM</li>
                    <li>• <strong>Delta target:</strong> -0.50 to -0.70 delta preferred</li>
                    <li>• <strong>Cost consideration:</strong> Higher delta = higher cost</li>
                  </ul>
                </div>
                <div className="bg-yellow-100 p-3 rounded">
                  <h5 className="font-medium text-yellow-800">📉 Short Put Strike</h5>
                  <ul className="text-xs text-yellow-700 space-y-1 mt-1">
                    <li>• <strong>Target level:</strong> Your price objective or support</li>
                    <li>• <strong>Strike spacing:</strong> 5-15 strikes below long put</li>
                    <li>• <strong>Delta target:</strong> -0.15 to -0.30 delta typical</li>
                    <li>• <strong>Credit collection:</strong> Reduces net debit significantly</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <h5 className="font-medium text-red-800">💰 Spread Width Strategy</h5>
                  <ul className="text-xs text-red-700 space-y-1 mt-1">
                    <li>• <strong>Narrow spreads:</strong> $5-10 width, lower cost</li>
                    <li>• <strong>Wide spreads:</strong> $15-25 width, higher profit potential</li>
                    <li>• <strong>Optimal ratio:</strong> Target 25-40% debit of width</li>
                    <li>• <strong>Risk/reward:</strong> Balance cost vs. profit potential</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-red-300 pl-4">
              <h4 className="font-semibold text-red-800">Time to Expiration Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-orange-100 p-3 rounded">
                  <h5 className="font-medium text-orange-800">⏰ Short-Term (30-45 DTE)</h5>
                  <ul className="text-xs text-orange-700 space-y-1 mt-1">
                    <li>• <strong>Faster profits:</strong> Quicker resolution</li>
                    <li>• <strong>Higher theta:</strong> More time decay pressure</li>
                    <li>• <strong>Event plays:</strong> Earnings or catalyst driven</li>
                    <li>• <strong>Active management:</strong> Requires closer monitoring</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-3 rounded">
                  <h5 className="font-medium text-teal-800">📅 Medium-Term (45-90 DTE)</h5>
                  <ul className="text-xs text-teal-700 space-y-1 mt-1">
                    <li>• <strong>Balanced approach:</strong> Time for thesis to develop</li>
                    <li>• <strong>Lower theta:</strong> Less time decay pressure</li>
                    <li>• <strong>Trend plays:</strong> Technical or fundamental setups</li>
                    <li>• <strong>Adjustment time:</strong> Room to roll or adjust</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-300 pl-4">
              <h4 className="font-semibold text-red-800">Entry Timing Considerations</h4>
              <ul className="space-y-1 mt-2">
                <li>• <strong>Technical setups:</strong> Enter near resistance levels or breakdown points</li>
                <li>• <strong>Volatility environment:</strong> Moderate IV levels preferred</li>
                <li>• <strong>Market sentiment:</strong> Bearish but not panic conditions</li>
                <li>• <strong>Fundamental catalysts:</strong> Negative earnings, guidance cuts, or news flow</li>
                <li>• <strong>Seasonal patterns:</strong> Align with historically weak periods</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Position Management */}
        <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Position Management Framework
          </h3>
          <div className="text-sm text-blue-700 space-y-3">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Profit Taking Rules:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50-75% rule:</strong> Take profits when spread reaches 50-75% of maximum value</li>
                <li>• <strong>Double rule:</strong> Close when spread value doubles (100% gain)</li>
                <li>• <strong>Technical targets:</strong> Exit at support levels or price objectives</li>
                <li>• <strong>Time-based exits:</strong> Close at 50% of maximum profit with 21+ DTE</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Loss Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50% stop loss:</strong> Cut losses if spread value falls 50% from entry</li>
                <li>• <strong>Time-based stops:</strong> Close at 14-21 DTE if not profitable</li>
                <li>• <strong>Technical stops:</strong> Exit if bearish thesis is invalidated</li>
                <li>• <strong>Breakeven management:</strong> Consider closing near breakeven with little time left</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Rolling Strategies:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Roll out:</strong> Extend time if thesis intact but need more time</li>
                <li>• <strong>Roll down:</strong> Move both strikes lower if stock has moved favorably</li>
                <li>• <strong>Roll out and down:</strong> Combination for maximum flexibility</li>
                <li>• <strong>Net credit preferred:</strong> Try to roll for net credit when possible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bear Put vs Bull Call vs Credit Spreads Comparison */}
        <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            Bear Put Spread vs Bull Call Spread vs Vertical Credit Spreads
          </h3>
          <div className="text-sm text-red-700 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-lg">
                <thead>
                  <tr className="bg-red-100 border-b border-red-200">
                    <th className="p-3 text-sm font-bold text-red-600">Feature</th>
                    <th className="p-3 text-sm font-bold text-rose-600">Bear Put Spread</th>
                    <th className="p-3 text-sm font-bold text-green-600">Bull Call Spread</th>
                    <th className="p-3 text-sm font-bold text-purple-600">Vertical Credit Spreads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-100">
                  <tr>
                    <td className="p-3 font-medium">Market Outlook</td>
                    <td className="p-3 font-semibold text-rose-600">Moderately Bearish</td>
                    <td className="p-3">Moderately Bullish</td>
                    <td className="p-3">Neutral to Directional</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Cash Flow</td>
                    <td className="p-3 font-semibold text-rose-600">Pay Debit (Net Cost)</td>
                    <td className="p-3">Pay Debit (Net Cost)</td>
                    <td className="p-3 text-purple-600">Receive Credit (Net Income)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Profit Mechanism</td>
                    <td className="p-3 font-semibold text-rose-600">Price depreciation</td>
                    <td className="p-3">Price appreciation</td>
                    <td className="p-3 text-purple-600">Time decay + volatility crush</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Time Decay Impact</td>
                    <td className="p-3 text-amber-600">Slightly negative (mixed)</td>
                    <td className="p-3 text-amber-600">Slightly negative (mixed)</td>
                    <td className="p-3 font-semibold text-purple-600">Positive (benefits from theta)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Volatility Impact</td>
                    <td className="p-3 text-amber-600">Mixed (long/short vega)</td>
                    <td className="p-3 text-amber-600">Mixed (long/short vega)</td>
                    <td className="p-3 font-semibold text-purple-600">Negative (benefits from IV crush)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Win Rate</td>
                    <td className="p-3">45-65% (directional)</td>
                    <td className="p-3">45-65% (directional)</td>
                    <td className="p-3 font-semibold text-purple-600">65-80% (high probability)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Capital Requirements</td>
                    <td className="p-3 font-semibold text-rose-600">Lower (debit paid)</td>
                    <td className="p-3 font-semibold text-rose-600">Lower (debit paid)</td>
                    <td className="p-3">Higher (margin required)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-900 mb-2">🎯 When to Choose Bear Put Spreads</h4>
              <p className="text-red-800">
                Bear put spreads are preferred when you have moderate bearish conviction, want to reduce the cost of 
                directional exposure, or need better risk management than outright put buying. They work best when 
                you expect steady, moderate price decline rather than crash scenarios, and when you want to 
                participate in downside while limiting risk.
              </p>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            Risk Management & Common Pitfalls
          </h3>
          <div className="text-sm text-red-700 space-y-3">
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Position Sizing Rules:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>2-3% rule:</strong> Risk no more than 2-3% of portfolio per spread</li>
                <li>• <strong>Debit-based sizing:</strong> Size based on net debit paid</li>
                <li>• <strong>Diversification:</strong> Multiple spreads across different underlyings</li>
                <li>• <strong>Correlation awareness:</strong> Avoid overconcentration in similar sectors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Common Mistakes to Avoid:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Paying too much:</strong> Avoid spreads costing more than 40% of width</li>
                <li>• <strong>Wrong strike selection:</strong> Unrealistic price targets for short strike</li>
                <li>• <strong>Holding too long:</strong> Not taking profits at 50-75% of max</li>
                <li>• <strong>Ignoring liquidity:</strong> Trading illiquid options with wide spreads</li>
                <li>• <strong>No exit plan:</strong> Entering without defined profit/loss targets</li>
                <li>• <strong>Overleveraging:</strong> Using too many spreads relative to account size</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Breakeven Analysis:</h4>
              <div className="bg-white p-3 rounded border border-red-200">
                <p className="text-red-800 mb-2">
                  <strong>Breakeven Point:</strong> Long Put Strike - Net Debit Paid<br/>
                  <strong>Maximum Profit:</strong> Strike Width - Net Debit Paid<br/>
                  <strong>Maximum Loss:</strong> Net Debit Paid (limited to premium paid)
                </p>
                <p className="text-xs text-red-600">
                  Example: Buy $100 put, sell $90 put for $3.50 debit. Breakeven = $96.50, Max profit = $6.50, Max loss = $3.50
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Expectations */}
        <div className="bg-yellow-50 p-4 md:p-6 rounded-xl shadow-lg border border-yellow-200">
          <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Performance Expectations & Statistics
          </h3>
          <div className="text-sm text-yellow-700 space-y-3">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Historical Statistics:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Success rate:</strong> 45-65% of spreads finish profitable</li>
                <li>• <strong>Average winner:</strong> 50-200% return on debit paid</li>
                <li>• <strong>Average loser:</strong> 50-100% loss of debit paid</li>
                <li>• <strong>Breakeven rate:</strong> Need ~35-40% win rate to break even</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Expected Returns:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Conservative approach:</strong> 15-25% annual returns</li>
                <li>• <strong>Aggressive approach:</strong> 25-40% annual returns (higher risk)</li>
                <li>• <strong>Risk-adjusted returns:</strong> Often superior to long puts</li>
                <li>• <strong>Consistency:</strong> More consistent than single-leg strategies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Minimum account:</strong> $10,000+ for proper diversification</li>
                <li>• <strong>Recommended size:</strong> $25,000+ for multiple positions</li>
                <li>• <strong>Risk capital:</strong> Only use money you can afford to lose</li>
                <li>• <strong>Margin requirements:</strong> Typically the net debit paid</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Strategies */}
        <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Advanced Bear Put Spread Strategies
          </h3>
          <div className="text-sm text-purple-700 space-y-3">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Systematic Deployment:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Ladder approach:</strong> Multiple spreads at different strikes</li>
                <li>• <strong>Calendar integration:</strong> Different expirations for same strikes</li>
                <li>• <strong>Sector rotation:</strong> Deploy across different market sectors</li>
                <li>• <strong>Volatility timing:</strong> Enter during low IV periods</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Adjustment Techniques:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Legging strategies:</strong> Close winning or losing legs separately</li>
                <li>• <strong>Conversion to butterflies:</strong> Add short puts below for range-bound markets</li>
                <li>• <strong>Delta hedging:</strong> Hedge with stock or futures for large positions</li>
                <li>• <strong>Volatility adjustments:</strong> Modify based on IV changes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Portfolio Integration:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Complement credit spreads:</strong> Balance debit and credit strategies</li>
                <li>• <strong>Hedge long positions:</strong> Use as portfolio insurance</li>
                <li>• <strong>Income enhancement:</strong> Systematic spread deployment</li>
                <li>• <strong>Risk diversification:</strong> Spread risk across time and strikes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Resources */}
        <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Educational Resources & Further Learning
          </h3>
          <div className="text-sm text-teal-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Recommended Reading:</h4>
              <div className="space-y-1 ml-4">
                <a href="/articles/vertical-debit-spreads-strategic-architecture-defined-risk-trading" 
                   className="text-blue-600 hover:underline block">
                   • Vertical Debit Spreads: Strategic Architecture
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Tools & Calculators:</h4>
              <div className="space-y-1 ml-4">
                <a href="https://www.optionsprofitcalculator.com/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Options Profit Calculator
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
          <p className="text-xs text-gray-600">
            <strong>Risk Disclosure:</strong> Bear put spreads involve substantial risk and are suitable only for experienced 
            traders with adequate risk tolerance. While risk is limited to the debit paid, losses can equal the full debit 
            amount. This strategy requires directional accuracy and active management. Time decay and volatility changes 
            can significantly impact profitability. Past performance does not guarantee future results. This information 
            is for educational purposes only and does not constitute investment advice. Please consult with a qualified 
            financial advisor before implementing any options strategy.
          </p>
        </div>
    </div>
  );
};