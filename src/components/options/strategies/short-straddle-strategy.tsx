import { StrategyDetailProps } from '../strategy-config';

export const ShortStraddleStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Short Straddle Strategy Details
        </h3>
      </div>

      {/* Strategy Intuition Section */}
      <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Strategy Intuition
        </h3>
        <div className="text-sm text-slate-700 space-y-4">
          <div className="bg-purple-100 p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">📋 Definition</h4>
            <p className="text-purple-800">
              A <strong>short straddle</strong> is a neutral options strategy that involves:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-purple-800">
              <li><strong>Sell ATM Call:</strong> Sell a call option at-the-money</li>
              <li><strong>Sell ATM Put:</strong> Sell a put option at the same strike price</li>
              <li><strong>Same Expiration:</strong> Both options have identical expiration dates</li>
            </ul>
            <p className="mt-2 text-purple-800">
              This creates maximum premium collection with <strong>unlimited risk</strong> and <strong>defined maximum profit</strong>.
            </p>
          </div>
          
          <p>
            The short straddle is fundamentally a <strong>volatility selling strategy</strong> that profits from three key factors: 
            time decay (theta), volatility contraction (negative vega), and price stability around the strike price. 
            It's the most aggressive form of premium collection in options trading.
          </p>
          
          <p>
            Think of it as <strong>selling insurance on market movement</strong>. You collect the maximum premium upfront 
            by selling both calls and puts at the money, but you're exposed to unlimited risk if the market makes a 
            significant move in either direction. The strategy profits when the market's actual movement is less than 
            what the options market was pricing in.
          </p>
          
          <p>
            This strategy exploits the <strong>Volatility Risk Premium (VRP)</strong> - the statistical tendency for 
            implied volatility to overstate realized volatility. Professional traders and market makers frequently 
            use short straddles during periods of elevated implied volatility, particularly around earnings announcements 
            or other binary events.
          </p>
          
          <div className="bg-amber-100 p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">💡 Key Insight</h4>
            <p className="text-amber-800">
              The short straddle has the highest <strong>capital efficiency</strong> of any premium selling strategy 
              because it collects the maximum extrinsic value. However, this comes with the highest gamma risk, 
              making position sizing and risk management absolutely critical.
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
              <p>Initially neutral but becomes directional as price moves away from strike. Requires active delta management.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200">
              <h4 className="font-semibold mb-2 text-rose-700">Gamma (Γ) - Highest Risk</h4>
              <p>Maximum gamma exposure at initiation. Large moves cause losses to accelerate exponentially.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-700">Theta (θ) + Maximum Benefit</h4>
              <p>Collects the highest time decay premium. Accelerates in final 30-45 days to expiration.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-violet-200">
              <h4 className="font-semibold mb-2 text-violet-700">Vega (ν) - Short Volatility</h4>
              <p>Benefits when implied volatility drops. Vulnerable to volatility spikes and IV expansion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Straddle vs Strangle Comparison */}
      <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          Short Straddle vs Short Strangle
        </h3>
        <div className="text-sm text-green-700 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-green-100 border-b border-green-200">
                  <th className="p-3 text-sm font-bold text-green-600">Feature</th>
                  <th className="p-3 text-sm font-bold text-purple-600">Short Straddle</th>
                  <th className="p-3 text-sm font-bold text-blue-600">Short Strangle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                <tr>
                  <td className="p-3 font-medium">Strike Prices</td>
                  <td className="p-3">Same strike (ATM)</td>
                  <td className="p-3">Different strikes (OTM)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Premium Collected</td>
                  <td className="p-3 font-semibold text-green-600">Higher</td>
                  <td className="p-3">Lower</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Profit Zone</td>
                  <td className="p-3">Single point</td>
                  <td className="p-3 font-semibold text-blue-600">Wider range</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Win Rate</td>
                  <td className="p-3">~30-40%</td>
                  <td className="p-3 font-semibold text-blue-600">~50-70%</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Gamma Risk</td>
                  <td className="p-3 font-semibold text-rose-600">Highest</td>
                  <td className="p-3">Lower</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Capital Efficiency</td>
                  <td className="p-3 font-semibold text-green-600">Maximum</td>
                  <td className="p-3">Lower</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Optimal Deployment Conditions */}
      <div className="bg-amber-50 p-4 md:p-6 rounded-xl shadow-lg border border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Optimal Deployment Conditions
        </h3>
        <div className="text-sm text-amber-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold mb-2 text-amber-800">High IV Rank</h4>
              <p>Deploy when implied volatility is historically elevated (IV rank &gt; 70%). Provides richer premiums and wider breakeven points.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 text-blue-800">Binary Events</h4>
              <p>Ideal before earnings or events where volatility is expected to collapse post-announcement (IV crush).</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-800">Range-Bound Markets</h4>
              <p>Best in consolidating markets where price is expected to remain near the strike price with low realized volatility.</p>
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
              <h4 className="font-semibold mb-2 text-red-800">Position Sizing Rules</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Never risk more than 3-5% of account per trade</li>
                <li>Use buying power allocation, not notional value</li>
                <li>Consider correlation with other positions</li>
                <li>Account for unlimited risk profile</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-800">Profit/Loss Management</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Close at 25% of maximum profit</li>
                <li>Set stop loss at 2-3x premium collected</li>
                <li>Don't hold to expiration</li>
                <li>Monitor breakeven points daily</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">⚡ Critical Risk Factors</h4>
            <ul className="list-disc list-inside space-y-1 text-red-800">
              <li><strong>Unlimited Loss Potential:</strong> Losses can exceed account value in extreme moves</li>
              <li><strong>Gamma Risk:</strong> Accelerating losses as price moves away from strike</li>
              <li><strong>Volatility Expansion:</strong> IV spikes can cause immediate mark-to-market losses</li>
              <li><strong>Gap Risk:</strong> Overnight gaps can bypass stop losses</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Position Adjustments */}
      <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          Position Adjustment Strategies
        </h3>
        <div className="text-sm text-blue-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold mb-2 text-indigo-800">Roll Untested Side</h4>
              <p>If price moves up, roll the put strike higher. If price moves down, roll the call strike lower. Collect additional credit and re-center position.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-800">Roll Forward in Time</h4>
              <p>Roll entire position to next expiration cycle for additional time. Usually done for net credit, giving trade more time to be profitable.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200">
              <h4 className="font-semibold mb-2 text-rose-800">Convert to Iron Butterfly</h4>
              <p>Add protective wings by buying further OTM options. Caps maximum loss but reduces profit potential and requires additional capital.</p>
            </div>
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
              <p className="text-xs">Typically 30-40% when managed with 25% profit target</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-sm mb-2">Profit Factor</h4>
              <p className="text-xs">High reward-to-risk when deployed in optimal conditions</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-sm mb-2">Capital Efficiency</h4>
              <p className="text-xs">Maximum premium collection per unit of buying power</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-teal-200">
            <h4 className="font-bold text-teal-900 mb-2">📈 Breakeven Analysis</h4>
            <p className="text-teal-800 mb-2">
              <strong>Upper Breakeven:</strong> Strike Price + Total Premium Collected<br/>
              <strong>Lower Breakeven:</strong> Strike Price - Total Premium Collected
            </p>
            <p className="text-xs text-teal-600">
              The position is profitable as long as the stock price remains between these two breakeven points at expiration.
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Considerations */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          Advanced Considerations
        </h3>
        <div className="text-sm text-purple-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Volatility Surface Analysis</h4>
            <p>
              Monitor the volatility term structure and skew. Short straddles benefit from volatility contraction 
              across all strikes and expirations. Pay attention to volatility clustering and mean reversion patterns.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Market Regime Awareness</h4>
            <p>
              Short straddles perform best in low volatility, range-bound regimes. Avoid during trending markets, 
              high correlation periods, or when central bank policy changes are expected.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Portfolio Integration</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Use as part of a diversified volatility selling program</li>
              <li>Consider correlation with other short volatility positions</li>
              <li>Balance with long volatility hedges during high-risk periods</li>
              <li>Monitor overall portfolio gamma exposure</li>
            </ul>
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
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tools & Analysis</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="https://www.optionsprofitcalculator.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Options Profit Calculator</a></li>
              <li><a href="https://www.barchart.com/stocks/quotes/$SPX/volatility-greeks" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Barchart: Volatility & Greeks</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <p className="text-xs text-gray-600">
          <strong>Risk Disclosure:</strong> Short straddles involve unlimited risk and are suitable only for experienced 
          traders with substantial risk tolerance. Losses can exceed the initial investment and may result in margin calls. 
          This strategy requires active management and is not appropriate for all investors. Past performance does not 
          guarantee future results. This information is for educational purposes only and does not constitute investment 
          advice. Please consult with a qualified financial advisor before implementing any options strategy.
        </p>
      </div>
    </div>
  );
};