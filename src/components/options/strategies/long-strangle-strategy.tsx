import { StrategyDetailProps } from '../strategy-config';

export const LongStrangleStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Long Strangle Strategy Details
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
              <p className="mb-2">The long strangle is the <strong>leverage-optimized volatility play</strong> that trades probability for explosive profit potential. You buy an out-of-the-money (OTM) call and an OTM put with different strikes but the same expiration. This creates a position that requires larger moves to profit but offers superior risk-adjusted returns when those moves occur.</p>
              <p>This strategy embodies the <strong>convexity principle</strong> - you sacrifice probability of profit for exponential payoff potential, making it ideal for tail-event speculation and black swan positioning.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Long Strangles Work:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Capital efficiency:</strong> Lower cost than straddles for similar upside exposure</li>
                <li>• <strong>Explosive convexity:</strong> Exponential profit acceleration beyond strikes</li>
                <li>• <strong>Tail event capture:</strong> Designed for 2+ standard deviation moves</li>
                <li>• <strong>Reduced theta burn:</strong> OTM options decay slower than ATM</li>
                <li>• <strong>Lower vega risk:</strong> Less sensitive to volatility crush than straddles</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The "Leverage Advantage" Phenomenon:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-indigo-100 p-3 rounded">
                  <p className="font-medium text-indigo-800">🚀 Explosive ROI</p>
                  <p className="text-xs text-indigo-700">OTM options can deliver 300-1000%+ returns on large moves, far exceeding straddle returns</p>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-medium text-blue-800">💰 Cost Efficiency</p>
                  <p className="text-xs text-blue-700">50-70% cheaper than straddles while maintaining meaningful upside participation</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Strategic Motivations for Long Strangles:</h4>
              <div className="space-y-2">
                <div className="bg-indigo-100 p-2 rounded">
                  <p className="font-medium text-indigo-800 text-sm">🎯 Black Swan Events:</p>
                  <p className="text-xs text-indigo-700">Perfect for positioning ahead of potential market shocks, geopolitical events, or binary outcomes</p>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800 text-sm">💡 Capital Preservation:</p>
                  <p className="text-xs text-blue-700">Risk smaller amounts while maintaining meaningful exposure to large moves</p>
                </div>
                <div className="bg-teal-100 p-2 rounded">
                  <p className="font-medium text-teal-800 text-sm">⚖️ Portfolio Hedging:</p>
                  <p className="text-xs text-teal-700">Cheap insurance against tail risks in concentrated portfolios</p>
                </div>
                <div className="bg-cyan-100 p-2 rounded">
                  <p className="font-medium text-cyan-800 text-sm">🔄 Biotech Speculation:</p>
                  <p className="text-xs text-cyan-700">Ideal for FDA approvals, clinical trial results, and other binary biotech catalysts</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Market Demographics & Strangle Traders:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-indigo-100 p-2 rounded">
                  <p className="font-medium text-indigo-800 text-sm">📊 Tail Risk Specialists</p>
                  <ul className="text-xs text-indigo-700 space-y-1 mt-1">
                    <li>• Tail risk hedge funds</li>
                    <li>• Volatility arbitrageurs</li>
                    <li>• Crisis alpha funds</li>
                    <li>• Systematic vol traders</li>
                  </ul>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800 text-sm">🎯 Event Speculators</p>
                  <ul className="text-xs text-blue-700 space-y-1 mt-1">
                    <li>• Biotech specialists</li>
                    <li>• Merger arbitrageurs</li>
                    <li>• Catalyst hunters</li>
                    <li>• Binary outcome traders</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-2 rounded">
                  <p className="font-medium text-teal-800 text-sm">🏦 Risk Managers</p>
                  <ul className="text-xs text-teal-700 space-y-1 mt-1">
                    <li>• Portfolio hedgers</li>
                    <li>• Tail risk buyers</li>
                    <li>• Insurance seekers</li>
                    <li>• Convexity traders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Greeks Analysis for Long Strangles:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-indigo-100 p-3 rounded">
                  <h5 className="font-medium text-indigo-800 mb-1">📈 Delta (Low Initial Exposure)</h5>
                  <ul className="text-xs text-indigo-700 space-y-1">
                    <li>• <strong>Call delta:</strong> ~+0.15 to +0.30 (OTM)</li>
                    <li>• <strong>Put delta:</strong> ~-0.15 to -0.30 (OTM)</li>
                    <li>• <strong>Net delta:</strong> ~0 (Nearly neutral)</li>
                    <li>• <strong>Acceleration zone:</strong> Delta explodes near strikes</li>
                  </ul>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800 mb-1">⚡ Gamma (Moderate but Explosive)</h5>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• <strong>Call gamma:</strong> Lower than ATM but accelerating</li>
                    <li>• <strong>Put gamma:</strong> Lower than ATM but accelerating</li>
                    <li>• <strong>Net gamma:</strong> Positive but requires movement to activate</li>
                    <li>• <strong>Explosion point:</strong> Massive acceleration at strikes</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-3 rounded">
                  <h5 className="font-medium text-teal-800 mb-1">🕐 Theta (Moderate Decay)</h5>
                  <ul className="text-xs text-teal-700 space-y-1">
                    <li>• <strong>Call theta:</strong> Moderate negative (OTM decay)</li>
                    <li>• <strong>Put theta:</strong> Moderate negative (OTM decay)</li>
                    <li>• <strong>Net theta:</strong> Less severe than straddles</li>
                    <li>• <strong>Time advantage:</strong> More time to be right</li>
                  </ul>
                </div>
                <div className="bg-cyan-100 p-3 rounded">
                  <h5 className="font-medium text-cyan-800 mb-1">📊 Vega (Moderate Sensitivity)</h5>
                  <ul className="text-xs text-cyan-700 space-y-1">
                    <li>• <strong>Call vega:</strong> Positive but lower than ATM</li>
                    <li>• <strong>Put vega:</strong> Positive but lower than ATM</li>
                    <li>• <strong>Net vega:</strong> Positive but less IV crush risk</li>
                    <li>• <strong>IV advantage:</strong> Less vulnerable to volatility collapse</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strike Selection & Setup */}
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Strike Selection & Setup Strategy
          </h3>
          <div className="text-sm text-indigo-700 space-y-4">
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Strike Selection Framework</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800">📞 Call Strike Selection</h5>
                  <ul className="text-xs text-blue-700 space-y-1 mt-1">
                    <li>• <strong>Delta range:</strong> 0.15-0.30 delta preferred</li>
                    <li>• <strong>Distance:</strong> 5-15% OTM from current price</li>
                    <li>• <strong>Resistance levels:</strong> Above key technical resistance</li>
                    <li>• <strong>Liquidity check:</strong> Adequate volume and open interest</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-3 rounded">
                  <h5 className="font-medium text-teal-800">📉 Put Strike Selection</h5>
                  <ul className="text-xs text-teal-700 space-y-1 mt-1">
                    <li>• <strong>Delta range:</strong> -0.15 to -0.30 delta preferred</li>
                    <li>• <strong>Distance:</strong> 5-15% OTM from current price</li>
                    <li>• <strong>Support levels:</strong> Below key technical support</li>
                    <li>• <strong>Symmetry:</strong> Roughly equidistant from current price</li>
                  </ul>
                </div>
                <div className="bg-indigo-100 p-3 rounded">
                  <h5 className="font-medium text-indigo-800">⚖️ Width Optimization</h5>
                  <ul className="text-xs text-indigo-700 space-y-1 mt-1">
                    <li>• <strong>Narrow strangles:</strong> 10-20% total width, higher probability</li>
                    <li>• <strong>Wide strangles:</strong> 20-40% total width, explosive potential</li>
                    <li>• <strong>Cost consideration:</strong> Target 2-5% of underlying price</li>
                    <li>• <strong>Move requirement:</strong> Calculate breakeven distances</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Time to Expiration Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800">⏰ Short-Term (30-45 DTE)</h5>
                  <ul className="text-xs text-blue-700 space-y-1 mt-1">
                    <li>• <strong>Event plays:</strong> Earnings, FDA approvals, binary catalysts</li>
                    <li>• <strong>Lower cost:</strong> Cheaper premium for defined timeframe</li>
                    <li>• <strong>Higher theta:</strong> More time pressure but faster resolution</li>
                    <li>• <strong>Precision timing:</strong> Requires accurate event timing</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-3 rounded">
                  <h5 className="font-medium text-teal-800">📅 Medium-Term (45-90 DTE)</h5>
                  <ul className="text-xs text-teal-700 space-y-1 mt-1">
                    <li>• <strong>Trend plays:</strong> Longer for thesis to develop</li>
                    <li>• <strong>Lower theta:</strong> More time for large moves to occur</li>
                    <li>• <strong>Multiple events:</strong> Capture several potential catalysts</li>
                    <li>• <strong>Adjustment time:</strong> Room to manage and roll positions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Entry Timing Considerations</h4>
              <ul className="space-y-1 mt-2">
                <li>• <strong>Volatility compression:</strong> Enter when IV rank is low (&lt;30)</li>
                <li>• <strong>Technical setups:</strong> Coiling patterns, triangles, or range-bound markets</li>
                <li>• <strong>Event positioning:</strong> 2-4 weeks before known catalysts</li>
                <li>• <strong>Market structure:</strong> Periods of low realized volatility</li>
                <li>• <strong>Sentiment extremes:</strong> Complacency or building tension</li>
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
                <li>• <strong>50-100% rule:</strong> Take profits when strangle gains 50-100% of premium paid</li>
                <li>• <strong>Single leg profits:</strong> Close profitable leg, keep other for potential reversal</li>
                <li>• <strong>Volatility expansion:</strong> Exit if IV increases significantly without price movement</li>
                <li>• <strong>Strike breach:</strong> Consider partial profits when price reaches either strike</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Loss Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50% stop loss:</strong> Cut losses if strangle value falls 50% from entry</li>
                <li>• <strong>Time-based stops:</strong> Close at 21 DTE if not showing profit potential</li>
                <li>• <strong>Event passage:</strong> Exit immediately after catalyst if no significant move</li>
                <li>• <strong>Volatility collapse:</strong> Exit if IV drops dramatically post-event</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Advanced Management Techniques:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Leg management:</strong> Close winning legs early, hold losing legs for reversals</li>
                <li>• <strong>Rolling strategies:</strong> Roll strikes closer or extend time if thesis intact</li>
                <li>• <strong>Conversion plays:</strong> Convert to straddles by adjusting strikes</li>
                <li>• <strong>Partial scaling:</strong> Take partial profits and let runners continue</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Long Strangle vs Long Straddle Comparison */}
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            Long Strangle vs Long Straddle: The Trade-off Analysis
          </h3>
          <div className="text-sm text-indigo-700 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-lg">
                <thead>
                  <tr className="bg-indigo-100 border-b border-indigo-200">
                    <th className="p-3 text-sm font-bold text-indigo-600">Feature</th>
                    <th className="p-3 text-sm font-bold text-indigo-600">Long Strangle</th>
                    <th className="p-3 text-sm font-bold text-purple-600">Long Straddle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100">
                  <tr>
                    <td className="p-3 font-medium">Strike Configuration</td>
                    <td className="p-3 font-semibold text-indigo-600">OTM Call + OTM Put (Different Strikes)</td>
                    <td className="p-3">ATM Call + ATM Put (Same Strike)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Initial Investment</td>
                    <td className="p-3 font-semibold text-green-600">Lower (50-70% of straddle cost)</td>
                    <td className="p-3 text-red-600">Higher (Maximum extrinsic value)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Move Required</td>
                    <td className="p-3 text-amber-600">Large (15-25%+ typically)</td>
                    <td className="p-3 font-semibold text-purple-600">Moderate (8-12% typically)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Probability of Profit</td>
                    <td className="p-3 text-red-600">Lower (25-35%)</td>
                    <td className="p-3 font-semibold text-purple-600">Higher (35-45%)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Maximum ROI Potential</td>
                    <td className="p-3 font-semibold text-indigo-600">Explosive (300-1000%+)</td>
                    <td className="p-3">High (100-400%)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Theta Decay Impact</td>
                    <td className="p-3 font-semibold text-indigo-600">Moderate (OTM decay slower)</td>
                    <td className="p-3 text-red-600">High (ATM decay faster)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Vega Sensitivity</td>
                    <td className="p-3 font-semibold text-indigo-600">Lower (Less IV crush risk)</td>
                    <td className="p-3 text-red-600">Higher (More IV crush risk)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Gamma Acceleration</td>
                    <td className="p-3">Delayed but explosive at strikes</td>
                    <td className="p-3 font-semibold text-purple-600">Immediate but capped</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Capital Efficiency</td>
                    <td className="p-3 font-semibold text-indigo-600">Superior (More leverage)</td>
                    <td className="p-3">Good (Higher probability)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-2">🎯 When to Choose Long Strangles</h4>
                <p className="text-indigo-800 text-sm">
                  Choose strangles when you expect explosive moves (black swan events, biotech catalysts, major 
                  market disruptions) and want maximum leverage. Perfect for tail risk positioning, binary outcomes, 
                  or when you have strong conviction about large moves but limited capital to deploy.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-2">⚡ When to Choose Long Straddles</h4>
                <p className="text-purple-800 text-sm">
                  Choose straddles when you expect moderate volatility expansion and want higher probability of profit. 
                  Better for earnings plays, regular market events, or when you prefer consistent smaller wins over 
                  occasional large wins. Higher cost but better odds of success.
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
                <li>• <strong>1-3% rule:</strong> Risk no more than 1-3% of portfolio per strangle</li>
                <li>• <strong>Lottery ticket approach:</strong> Size like speculative positions</li>
                <li>• <strong>Diversification:</strong> Multiple small strangles better than one large</li>
                <li>• <strong>Event correlation:</strong> Avoid clustering around similar catalysts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">The "Dead Zone" Trap:</h4>
              <div className="bg-white p-3 rounded border border-red-200">
                <p className="text-red-800 mb-2">
                  <strong>Biggest Risk:</strong> Stock price staying between the strikes (the "dead zone") where both options expire worthless.
                </p>
                <p className="text-xs text-red-600">
                  Example: Stock at $100, buy $110 call and $90 put for $3 total. Stock ends at $105. Both options expire worthless, 
                  losing 100% of premium despite a 5% move. This is why strangles require larger moves than straddles.
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Common Mistakes to Avoid:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Strikes too wide:</strong> Requiring unrealistic moves to profit</li>
                <li>• <strong>Strikes too narrow:</strong> Paying too much premium, negating cost advantage</li>
                <li>• <strong>Poor timing:</strong> Entering too close to events or after IV expansion</li>
                <li>• <strong>Illiquid options:</strong> Using options with wide bid-ask spreads</li>
                <li>• <strong>No exit plan:</strong> Holding through events without profit-taking rules</li>
                <li>• <strong>Overconcentration:</strong> Too many strangles on similar underlying themes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Breakeven Analysis:</h4>
              <div className="bg-white p-3 rounded border border-red-200">
                <p className="text-red-800 mb-2">
                  <strong>Upper Breakeven:</strong> Call Strike + Total Premium Paid<br/>
                  <strong>Lower Breakeven:</strong> Put Strike - Total Premium Paid<br/>
                  <strong>Maximum Loss:</strong> Total Premium Paid (occurs between strikes)<br/>
                  <strong>Profit Zone:</strong> Beyond either breakeven point
                </p>
                <p className="text-xs text-red-600">
                  Example: $110 call + $90 put for $4 total. Breakevens at $114 and $86. Need 14%+ move to profit.
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
                <li>• <strong>Success rate:</strong> 25-35% of strangles finish profitable</li>
                <li>• <strong>Average winner:</strong> 200-800% return on premium paid</li>
                <li>• <strong>Average loser:</strong> 70-100% loss of premium paid</li>
                <li>• <strong>Breakeven rate:</strong> Need ~15-20% win rate to break even long-term</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Expected Returns:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Conservative approach:</strong> 5-15% annual returns with strict risk management</li>
                <li>• <strong>Aggressive approach:</strong> 20-60% annual returns (very high risk)</li>
                <li>• <strong>Event-driven focus:</strong> Highly volatile returns, boom or bust</li>
                <li>• <strong>Tail risk approach:</strong> Long periods of small losses, occasional large gains</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Minimum account:</strong> $25,000+ for proper diversification</li>
                <li>• <strong>Recommended size:</strong> $50,000+ for multiple positions across time</li>
                <li>• <strong>Speculation capital:</strong> Only use money you can afford to lose completely</li>
                <li>• <strong>Margin requirements:</strong> Typically the total premium paid</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Strategies */}
        <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Advanced Long Strangle Strategies
          </h3>
          <div className="text-sm text-teal-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Portfolio Integration Techniques:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Tail risk hedging:</strong> Use strangles as portfolio insurance against black swans</li>
                <li>• <strong>Barbell strategy:</strong> Combine with safe assets for asymmetric risk/reward</li>
                <li>• <strong>Event calendar:</strong> Systematic deployment around known catalysts</li>
                <li>• <strong>Volatility timing:</strong> Enter during low IV periods, exit during high IV</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Systematic Deployment:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>IV rank filters:</strong> Only enter when IV rank is below 30-40</li>
                <li>• <strong>Technical triggers:</strong> Enter during consolidation patterns</li>
                <li>• <strong>Sector rotation:</strong> Deploy across uncorrelated sectors and events</li>
                <li>• <strong>Time diversification:</strong> Stagger entries across different expirations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Advanced Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Dynamic hedging:</strong> Hedge delta exposure as price approaches strikes</li>
                <li>• <strong>Volatility surface trading:</strong> Exploit skew and term structure inefficiencies</li>
                <li>• <strong>Cross-asset strangles:</strong> Use ETFs, indices, or commodities</li>
                <li>• <strong>Synthetic construction:</strong> Build strangles using futures and options</li>
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
                <li>• <strong>Convexity vs Probability:</strong> The fundamental trade-off in strangle selection</li>
                <li>• <strong>Strike Selection Optimization:</strong> Balancing cost, probability, and payoff</li>
                <li>• <strong>Event Risk Assessment:</strong> Evaluating binary outcome probabilities</li>
                <li>• <strong>Volatility Surface Dynamics:</strong> Understanding skew and term structure</li>
                <li>• <strong>Tail Risk Quantification:</strong> Measuring and pricing extreme events</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
          <p className="text-xs text-gray-600">
            <strong>Risk Disclosure:</strong> Long strangles involve substantial risk and are suitable only for experienced 
            traders with high risk tolerance. While risk is limited to the premium paid, losses can equal the full premium 
            amount (100% loss). This strategy requires very large price movements to be profitable and has a low probability 
            of success. The majority of long strangles expire worthless. Strangles are speculative instruments and should 
            only represent a small portion of an investment portfolio. Past performance does not guarantee future results. 
            This information is for educational purposes only and does not constitute investment advice. Please consult with 
            a qualified financial advisor before implementing any options strategy.
          </p>
        </div>
    </div>
  );
};