import { StrategyDetailProps } from '../strategy-config';

export const LongStraddleStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Long Straddle Strategy Details
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
              <p className="mb-2">The long straddle is the <strong>purest volatility play</strong> in options trading. You simultaneously buy an at-the-money (ATM) call and put with the same strike price and expiration date. This creates a position that profits from large price movements in either direction while maintaining delta neutrality at initiation.</p>
              <p>This strategy leverages the <strong>physics of volatility</strong> - you're betting that the market's expectation of future movement (implied volatility) is underpricing the actual movement that will occur (realized volatility).</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Long Straddles Work:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Volatility arbitrage:</strong> Profit when realized volatility exceeds implied volatility</li>
                <li>• <strong>Direction agnostic:</strong> Don't need to predict direction, only magnitude</li>
                <li>• <strong>Maximum gamma exposure:</strong> ATM options provide highest convexity</li>
                <li>• <strong>Event-driven profits:</strong> Capitalize on earnings, FDA approvals, or market shocks</li>
                <li>• <strong>Asymmetric risk/reward:</strong> Limited downside, unlimited upside potential</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The "Volatility Edge" Phenomenon:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-purple-100 p-3 rounded">
                  <p className="font-medium text-purple-800">⚡ Gamma Explosion</p>
                  <p className="text-xs text-purple-700">ATM options have maximum gamma, creating explosive profit potential as delta accelerates with price movement</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded">
                  <p className="font-medium text-indigo-800">🎯 Delta Neutrality</p>
                  <p className="text-xs text-indigo-700">Starting delta-neutral eliminates directional bias, allowing pure volatility exposure without market timing</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Strategic Motivations for Long Straddles:</h4>
              <div className="space-y-2">
                <div className="bg-purple-100 p-2 rounded">
                  <p className="font-medium text-purple-800 text-sm">🎯 Event Catalysts:</p>
                  <p className="text-xs text-purple-700">Perfect for earnings, FDA approvals, or major announcements where direction is uncertain but movement is expected</p>
                </div>
                <div className="bg-indigo-100 p-2 rounded">
                  <p className="font-medium text-indigo-800 text-sm">💡 Volatility Compression:</p>
                  <p className="text-xs text-indigo-700">Enter when IV rank is low and volatility is compressed, positioning for expansion</p>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800 text-sm">⚖️ Market Uncertainty:</p>
                  <p className="text-xs text-blue-700">Capitalize on periods of high uncertainty where large moves are likely but direction is unclear</p>
                </div>
                <div className="bg-teal-100 p-2 rounded">
                  <p className="font-medium text-teal-800 text-sm">🔄 Gamma Scalping:</p>
                  <p className="text-xs text-teal-700">Advanced traders can scalp gamma by trading the underlying against the position</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Market Demographics & Straddle Traders:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-purple-100 p-2 rounded">
                  <p className="font-medium text-purple-800 text-sm">📊 Volatility Specialists</p>
                  <ul className="text-xs text-purple-700 space-y-1 mt-1">
                    <li>• Hedge fund volatility desks</li>
                    <li>• Professional options traders</li>
                    <li>• Market makers</li>
                    <li>• Quantitative funds</li>
                  </ul>
                </div>
                <div className="bg-indigo-100 p-2 rounded">
                  <p className="font-medium text-indigo-800 text-sm">🎯 Event Traders</p>
                  <ul className="text-xs text-indigo-700 space-y-1 mt-1">
                    <li>• Earnings specialists</li>
                    <li>• Biotech traders</li>
                    <li>• Event-driven funds</li>
                    <li>• Catalyst-focused traders</li>
                  </ul>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800 text-sm">🏦 Sophisticated Retail</p>
                  <ul className="text-xs text-blue-700 space-y-1 mt-1">
                    <li>• Advanced options traders</li>
                    <li>• Volatility-focused investors</li>
                    <li>• Technical analysts</li>
                    <li>• Risk-managed speculators</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Greeks Analysis for Long Straddles:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-purple-100 p-3 rounded">
                  <h5 className="font-medium text-purple-800 mb-1">📈 Delta (Initially Neutral)</h5>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• <strong>Call delta:</strong> ~+0.50 (ATM)</li>
                    <li>• <strong>Put delta:</strong> ~-0.50 (ATM)</li>
                    <li>• <strong>Net delta:</strong> ~0 (Direction neutral)</li>
                    <li>• <strong>Dynamic exposure:</strong> Delta changes with price movement</li>
                  </ul>
                </div>
                <div className="bg-indigo-100 p-3 rounded">
                  <h5 className="font-medium text-indigo-800 mb-1">⚡ Gamma (Maximum Exposure)</h5>
                  <ul className="text-xs text-indigo-700 space-y-1">
                    <li>• <strong>Call gamma:</strong> Maximum at ATM</li>
                    <li>• <strong>Put gamma:</strong> Maximum at ATM</li>
                    <li>• <strong>Net gamma:</strong> Highest possible (both positive)</li>
                    <li>• <strong>Acceleration:</strong> Explosive profit potential on moves</li>
                  </ul>
                </div>
                <div className="bg-rose-100 p-3 rounded">
                  <h5 className="font-medium text-rose-800 mb-1">🕐 Theta (Maximum Decay)</h5>
                  <ul className="text-xs text-rose-700 space-y-1">
                    <li>• <strong>Call theta:</strong> Negative (loses value daily)</li>
                    <li>• <strong>Put theta:</strong> Negative (loses value daily)</li>
                    <li>• <strong>Net theta:</strong> Maximum negative (double decay)</li>
                    <li>• <strong>Time pressure:</strong> Accelerates as expiration approaches</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-3 rounded">
                  <h5 className="font-medium text-teal-800 mb-1">📊 Vega (Maximum Sensitivity)</h5>
                  <ul className="text-xs text-teal-700 space-y-1">
                    <li>• <strong>Call vega:</strong> Positive (benefits from IV rise)</li>
                    <li>• <strong>Put vega:</strong> Positive (benefits from IV rise)</li>
                    <li>• <strong>Net vega:</strong> Maximum positive (double exposure)</li>
                    <li>• <strong>IV sensitivity:</strong> Extreme vulnerability to IV crush</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Criteria & Timing */}
        <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Entry Criteria & Timing Strategy
          </h3>
          <div className="text-sm text-purple-700 space-y-4">
            <div className="border-l-4 border-purple-300 pl-4">
              <h4 className="font-semibold text-purple-800">Volatility Environment Assessment</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-green-100 p-3 rounded">
                  <h5 className="font-medium text-green-800">✅ Ideal Conditions</h5>
                  <ul className="text-xs text-green-700 space-y-1 mt-1">
                    <li>• <strong>IV Rank &lt; 20:</strong> Volatility is cheap</li>
                    <li>• <strong>Bollinger Squeeze:</strong> Price compression</li>
                    <li>• <strong>Low VIX:</strong> Market complacency</li>
                    <li>• <strong>Upcoming catalyst:</strong> Known event approaching</li>
                  </ul>
                </div>
                <div className="bg-yellow-100 p-3 rounded">
                  <h5 className="font-medium text-yellow-800">⚠️ Caution Zones</h5>
                  <ul className="text-xs text-yellow-700 space-y-1 mt-1">
                    <li>• <strong>IV Rank 20-50:</strong> Moderate volatility</li>
                    <li>• <strong>Post-earnings:</strong> Event already passed</li>
                    <li>• <strong>High correlation:</strong> Market moving together</li>
                    <li>• <strong>Trending markets:</strong> Strong directional bias</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <h5 className="font-medium text-red-800">❌ Avoid Conditions</h5>
                  <ul className="text-xs text-red-700 space-y-1 mt-1">
                    <li>• <strong>IV Rank &gt; 70:</strong> Volatility is expensive</li>
                    <li>• <strong>High VIX:</strong> Fear already priced in</li>
                    <li>• <strong>Post-event:</strong> Catalyst has passed</li>
                    <li>• <strong>&lt; 21 DTE:</strong> Excessive theta decay</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-purple-300 pl-4">
              <h4 className="font-semibold text-purple-800">Strike Selection & Expiration Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-indigo-100 p-3 rounded">
                  <h5 className="font-medium text-indigo-800">🎯 Strike Selection</h5>
                  <ul className="text-xs text-indigo-700 space-y-1 mt-1">
                    <li>• <strong>ATM strikes:</strong> Maximum gamma exposure</li>
                    <li>• <strong>Liquid options:</strong> Tight bid-ask spreads</li>
                    <li>• <strong>Delta balance:</strong> Call and put deltas ~±0.50</li>
                    <li>• <strong>Volume check:</strong> Adequate open interest</li>
                  </ul>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800">📅 Time to Expiration</h5>
                  <ul className="text-xs text-blue-700 space-y-1 mt-1">
                    <li>• <strong>45-60 DTE:</strong> Optimal theta/gamma balance</li>
                    <li>• <strong>Event timing:</strong> 1-3 weeks before catalyst</li>
                    <li>• <strong>Avoid weeklies:</strong> Unless specific event play</li>
                    <li>• <strong>Theta acceleration:</strong> Monitor 21 DTE threshold</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-300 pl-4">
              <h4 className="font-semibold text-purple-800">Entry Timing Considerations</h4>
              <ul className="space-y-1 mt-2">
                <li>• <strong>Market structure:</strong> Enter during consolidation phases</li>
                <li>• <strong>Volatility cycles:</strong> Buy during low IV periods</li>
                <li>• <strong>Event calendar:</strong> Position before known catalysts</li>
                <li>• <strong>Technical setups:</strong> Coiling patterns, triangles, or ranges</li>
                <li>• <strong>Sentiment indicators:</strong> Complacency or uncertainty</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Position Management */}
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Position Management Framework
          </h3>
          <div className="text-sm text-indigo-700 space-y-3">
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Profit Taking Rules:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>25-50% rule:</strong> Take profits when straddle gains 25-50% of premium paid</li>
                <li>• <strong>Volatility expansion:</strong> Close if IV increases significantly without price movement</li>
                <li>• <strong>Event completion:</strong> Exit immediately after catalyst event</li>
                <li>• <strong>Technical targets:</strong> Close at major support/resistance levels</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Loss Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50% stop loss:</strong> Cut losses if straddle value falls 50% from entry</li>
                <li>• <strong>Time-based stops:</strong> Close at 21 DTE if not profitable</li>
                <li>• <strong>IV crush protection:</strong> Exit if IV drops significantly post-event</li>
                <li>• <strong>Theta burn threshold:</strong> Monitor daily decay acceleration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Advanced Management Techniques:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Gamma scalping:</strong> Trade underlying stock against delta changes</li>
                <li>• <strong>Leg management:</strong> Close winning leg, keep losing leg for reversal</li>
                <li>• <strong>Rolling strategies:</strong> Roll to different strikes or expirations</li>
                <li>• <strong>Volatility hedging:</strong> Hedge with VIX products for large positions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Long Straddle vs Long Strangle Comparison */}
        <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            Long Straddle vs Long Strangle: The Volatility Spectrum
          </h3>
          <div className="text-sm text-purple-700 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-lg">
                <thead>
                  <tr className="bg-purple-100 border-b border-purple-200">
                    <th className="p-3 text-sm font-bold text-purple-600">Feature</th>
                    <th className="p-3 text-sm font-bold text-purple-600">Long Straddle</th>
                    <th className="p-3 text-sm font-bold text-indigo-600">Long Strangle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  <tr>
                    <td className="p-3 font-medium">Strike Selection</td>
                    <td className="p-3 font-semibold text-purple-600">ATM Call + ATM Put (Same Strike)</td>
                    <td className="p-3">OTM Call + OTM Put (Different Strikes)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Initial Cost</td>
                    <td className="p-3 text-red-600">Higher (Maximum Extrinsic Value)</td>
                    <td className="p-3 font-semibold text-green-600">Lower (Cheaper Entry)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Breakeven Points</td>
                    <td className="p-3">Strike ± Total Premium</td>
                    <td className="p-3 font-semibold text-indigo-600">Call Strike + Premium, Put Strike - Premium</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Probability of Profit</td>
                    <td className="p-3 font-semibold text-purple-600">Higher (Closer Breakevens)</td>
                    <td className="p-3">Lower (Wider Breakevens)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Gamma Exposure</td>
                    <td className="p-3 font-semibold text-purple-600">Maximum (ATM Options)</td>
                    <td className="p-3">Lower (OTM Options)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Theta Decay</td>
                    <td className="p-3 text-red-600">Maximum (ATM Decay)</td>
                    <td className="p-3 font-semibold text-indigo-600">Lower (OTM Decay)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Vega Sensitivity</td>
                    <td className="p-3 text-red-600">Maximum (ATM Vega)</td>
                    <td className="p-3 font-semibold text-indigo-600">Lower (OTM Vega)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Move Required</td>
                    <td className="p-3 font-semibold text-purple-600">Moderate (8-12%)</td>
                    <td className="p-3">Large (15-25%)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">ROI Potential</td>
                    <td className="p-3">100-300%</td>
                    <td className="p-3 font-semibold text-indigo-600">200-500% (Higher Leverage)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-2">🎯 When to Choose Long Straddles</h4>
                <p className="text-purple-800 text-sm">
                  Choose straddles when you expect moderate volatility expansion and want higher probability of profit. 
                  Ideal for earnings plays, FDA approvals, or when IV rank is very low (&lt;20). The higher cost is 
                  justified by better odds and immediate gamma exposure.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-2">⚡ When to Choose Long Strangles</h4>
                <p className="text-indigo-800 text-sm">
                  Choose strangles when you expect explosive moves and want maximum leverage. Better for black swan 
                  events, biotech binary outcomes, or when you have limited capital but strong conviction about 
                  a major move. Lower cost but requires larger moves to profit.
                </p>
              </div>
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
                <li>• <strong>1-2% rule:</strong> Risk no more than 1-2% of portfolio per straddle</li>
                <li>• <strong>Premium-based sizing:</strong> Size based on total premium paid</li>
                <li>• <strong>Volatility correlation:</strong> Avoid multiple straddles on correlated assets</li>
                <li>• <strong>Event diversification:</strong> Spread risk across different types of catalysts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">The "IV Crush" Trap:</h4>
              <div className="bg-white p-3 rounded border border-red-200">
                <p className="text-red-800 mb-2">
                  <strong>Most Common Mistake:</strong> Buying straddles right before earnings when IV is already elevated.
                </p>
                <p className="text-xs text-red-600">
                  Example: Stock at $100, IV at 80% before earnings. You buy straddle for $8. Stock moves to $106 
                  (+6%) but IV crashes to 30%. Your straddle is now worth $4 despite the favorable move. This is IV crush.
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Common Mistakes to Avoid:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Buying expensive volatility:</strong> Entering when IV rank is high</li>
                <li>• <strong>Holding through events:</strong> Not exiting before IV crush</li>
                <li>• <strong>Ignoring theta decay:</strong> Holding too close to expiration</li>
                <li>• <strong>Poor strike selection:</strong> Using illiquid or wide-spread options</li>
                <li>• <strong>No exit plan:</strong> Entering without defined profit/loss targets</li>
                <li>• <strong>Overleveraging:</strong> Using too many straddles relative to account size</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Breakeven Analysis:</h4>
              <div className="bg-white p-3 rounded border border-red-200">
                <p className="text-red-800 mb-2">
                  <strong>Upper Breakeven:</strong> Strike Price + Total Premium Paid<br/>
                  <strong>Lower Breakeven:</strong> Strike Price - Total Premium Paid<br/>
                  <strong>Maximum Loss:</strong> Total Premium Paid (occurs at strike price)<br/>
                  <strong>Maximum Profit:</strong> Unlimited (theoretically)
                </p>
                <p className="text-xs text-red-600">
                  Example: $100 strike straddle for $6 total. Breakevens at $94 and $106. Need 6%+ move to profit.
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
                <li>• <strong>Success rate:</strong> 35-45% of straddles finish profitable</li>
                <li>• <strong>Average winner:</strong> 100-400% return on premium paid</li>
                <li>• <strong>Average loser:</strong> 50-100% loss of premium paid</li>
                <li>• <strong>Breakeven rate:</strong> Need ~25-30% win rate to break even long-term</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Expected Returns:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Conservative approach:</strong> 10-20% annual returns with proper risk management</li>
                <li>• <strong>Aggressive approach:</strong> 25-50% annual returns (higher risk)</li>
                <li>• <strong>Event-driven focus:</strong> Higher returns but more volatile</li>
                <li>• <strong>Systematic approach:</strong> More consistent but lower returns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Minimum account:</strong> $25,000+ for proper diversification</li>
                <li>• <strong>Recommended size:</strong> $50,000+ for multiple positions</li>
                <li>• <strong>Risk capital:</strong> Only use money you can afford to lose completely</li>
                <li>• <strong>Margin requirements:</strong> Typically the total premium paid</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Strategies */}
        <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Advanced Long Straddle Strategies
          </h3>
          <div className="text-sm text-teal-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Gamma Scalping Techniques:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Delta hedging:</strong> Trade stock against delta changes to capture gamma</li>
                <li>• <strong>Rebalancing frequency:</strong> Adjust hedges based on gamma and volatility</li>
                <li>• <strong>Transaction costs:</strong> Factor in commissions and slippage</li>
                <li>• <strong>Volatility targeting:</strong> Adjust hedge ratio based on realized volatility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Portfolio Integration:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Volatility allocation:</strong> Dedicate specific percentage to volatility strategies</li>
                <li>• <strong>Correlation management:</strong> Avoid clustering in similar sectors or events</li>
                <li>• <strong>Hedge ratios:</strong> Use straddles to hedge directional positions</li>
                <li>• <strong>Timing diversification:</strong> Stagger entries across different time periods</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Systematic Approaches:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>IV rank filters:</strong> Only enter when IV rank is below threshold</li>
                <li>• <strong>Event calendars:</strong> Systematic approach to earnings and events</li>
                <li>• <strong>Volatility cycles:</strong> Trade based on volatility mean reversion</li>
                <li>• <strong>Risk budgeting:</strong> Allocate risk capital systematically</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Resources */}
        <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Educational Resources & Further Learning
          </h3>
          <div className="text-sm text-blue-700 space-y-3">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Recommended Reading:</h4>
              <div className="space-y-1 ml-4">
                <a href="/articles/mastering-volatility-definitive-guide-long-straddles-strangles" 
                   className="text-blue-600 hover:underline block">
                   • Mastering Volatility: The Definitive Guide to Long Straddles and Strangles
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Tools & Calculators:</h4>
              <div className="space-y-1 ml-4">
                <a href="https://www.optionsprofitcalculator.com/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Options Profit Calculator
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Key Concepts to Master:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Implied vs Realized Volatility:</strong> The fundamental edge in volatility trading</li>
                <li>• <strong>IV Rank and Percentile:</strong> Relative volatility measurement</li>
                <li>• <strong>Gamma and Delta Relationships:</strong> Understanding option sensitivity</li>
                <li>• <strong>Volatility Smile:</strong> How IV varies across strikes</li>
                <li>• <strong>Event Risk:</strong> Managing binary outcome scenarios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
          <p className="text-xs text-gray-600">
            <strong>Risk Disclosure:</strong> Long straddles involve substantial risk and are suitable only for experienced 
            traders with adequate risk tolerance. While risk is limited to the premium paid, losses can equal the full premium 
            amount (100% loss). This strategy requires significant price movement to be profitable and is highly sensitive to 
            time decay and volatility changes. The majority of long straddles expire worthless. Past performance does not 
            guarantee future results. This information is for educational purposes only and does not constitute investment 
            advice. Please consult with a qualified financial advisor before implementing any options strategy.
          </p>
        </div>
    </div>
  );
};