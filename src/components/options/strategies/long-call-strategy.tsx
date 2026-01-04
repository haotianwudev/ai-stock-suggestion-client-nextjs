import { StrategyDetailProps } from '../strategy-config';

export const LongCallStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Strategy Details
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
              <p className="mb-2">The long call is the <strong>fundamental instrument for asymmetric leverage</strong> in options trading. You pay a small premium for the right to profit from significant upward moves, creating a powerful risk/reward asymmetry where your maximum loss is limited to the premium paid, but profit potential is unlimited.</p>
              <p>This strategy leverages the <strong>structural "growth premium"</strong> built into call options - the market's tendency to price in the unlimited upside potential of equity markets and individual stocks.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Long Calls Work:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Asymmetric payoff structure:</strong> Limited risk, unlimited profit potential</li>
                <li>• <strong>Leverage efficiency:</strong> Control large positions with small capital outlay</li>
                <li>• <strong>Volatility expansion:</strong> Bull markets often coincide with volatility spikes</li>
                <li>• <strong>Growth participation:</strong> Capture exponential moves in growth stocks</li>
                <li>• <strong>Capital efficiency:</strong> Deploy less capital than buying stock outright</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The "Growth Premium" Phenomenon:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-green-100 p-3 rounded">
                  <p className="font-medium text-green-800">📈 Market Structure</p>
                  <p className="text-xs text-green-700">Call options capture the unlimited upside potential of equity markets, making them attractive for growth-oriented strategies</p>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-medium text-blue-800">⚡ Volatility Dynamics</p>
                  <p className="text-xs text-blue-700">Bull markets often see volatility expansion during momentum phases, benefiting long call positions</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Strategic Motivations for Long Calls:</h4>
              <div className="space-y-2">
                <div className="bg-green-100 p-2 rounded">
                  <p className="font-medium text-green-800 text-sm">🎯 Directional Speculation:</p>
                  <p className="text-xs text-green-700">Profit from anticipated price increases with defined risk and leveraged exposure</p>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800 text-sm">🚀 Growth Participation:</p>
                  <p className="text-xs text-blue-700">Capture exponential moves in high-growth stocks and momentum plays</p>
                </div>
                <div className="bg-purple-100 p-2 rounded">
                  <p className="font-medium text-purple-800 text-sm">📊 Volatility Play:</p>
                  <p className="text-xs text-purple-700">Benefit from volatility expansion during bull market phases</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <p className="font-medium text-yellow-800 text-sm">💰 Capital Efficiency:</p>
                  <p className="text-xs text-yellow-700">Control large stock positions with fraction of the capital required</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Market Demographics & Call Buyers:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-indigo-100 p-2 rounded">
                  <p className="font-medium text-indigo-800 text-sm">📈 Growth Investors</p>
                  <ul className="text-xs text-indigo-700 space-y-1 mt-1">
                    <li>• Tech stock speculators</li>
                    <li>• Momentum traders</li>
                    <li>• Growth fund managers</li>
                    <li>• Venture capital firms</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-2 rounded">
                  <p className="font-medium text-teal-800 text-sm">🎯 Retail Speculators</p>
                  <ul className="text-xs text-teal-700 space-y-1 mt-1">
                    <li>• Day traders</li>
                    <li>• Swing traders</li>
                    <li>• Event-driven players</li>
                    <li>• Earnings players</li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="font-medium text-gray-800 text-sm">🏦 Institutional Players</p>
                  <ul className="text-xs text-gray-700 space-y-1 mt-1">
                    <li>• Hedge funds</li>
                    <li>• Prop trading firms</li>
                    <li>• Market makers</li>
                    <li>• Volatility traders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Greeks Analysis for Long Calls:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-green-100 p-3 rounded">
                  <h5 className="font-medium text-green-800 mb-1">📈 Delta (Positive)</h5>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• <strong>ATM calls:</strong> ~+0.50 delta</li>
                    <li>• <strong>OTM calls:</strong> +0.10 to +0.30 delta</li>
                    <li>• <strong>ITM calls:</strong> +0.70 to +0.90 delta</li>
                    <li>• <strong>Profit acceleration:</strong> Delta becomes more positive as stock rises</li>
                  </ul>
                </div>
                <div className="bg-orange-100 p-3 rounded">
                  <h5 className="font-medium text-orange-800 mb-1">⚡ Gamma (Positive)</h5>
                  <ul className="text-xs text-orange-700 space-y-1">
                    <li>• <strong>Acceleration benefit:</strong> Gains speed up as stock moves up</li>
                    <li>• <strong>Peak at ATM:</strong> Maximum gamma near strike price</li>
                    <li>• <strong>Time sensitivity:</strong> Gamma increases as expiration approaches</li>
                    <li>• <strong>Momentum amplifier:</strong> Enhances profits during large moves</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <h5 className="font-medium text-red-800 mb-1">🕐 Theta (Negative)</h5>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• <strong>Time decay enemy:</strong> Option loses value daily</li>
                    <li>• <strong>Acceleration near expiry:</strong> Theta increases as expiration nears</li>
                    <li>• <strong>OTM vulnerability:</strong> Time decay hits OTM calls hardest</li>
                    <li>• <strong>Management key:</strong> Must overcome theta to be profitable</li>
                  </ul>
                </div>
                <div className="bg-purple-100 p-3 rounded">
                  <h5 className="font-medium text-purple-800 mb-1">📊 Vega (Positive)</h5>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• <strong>Volatility friend:</strong> Benefits from IV expansion</li>
                    <li>• <strong>Bull market correlation:</strong> Rising markets often increase volatility</li>
                    <li>• <strong>Double benefit:</strong> Profit from both direction and volatility</li>
                    <li>• <strong>IV crush risk:</strong> Vulnerable to volatility contraction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strike Selection & Timing */}
        <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Strike Selection & Timing Strategy
          </h3>
          <div className="text-sm text-green-700 space-y-4">
            <div className="border-l-4 border-green-300 pl-4">
              <h4 className="font-semibold text-green-800">Strike Selection Framework</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800">🎯 ATM Calls (50 Delta)</h5>
                  <ul className="text-xs text-blue-700 space-y-1 mt-1">
                    <li>• <strong>Balanced approach:</strong> Good delta, manageable premium</li>
                    <li>• <strong>High probability:</strong> ~50% chance of finishing ITM</li>
                    <li>• <strong>Moderate cost:</strong> Higher premium but better odds</li>
                    <li>• <strong>Best for:</strong> Moderate bullish outlook</li>
                  </ul>
                </div>
                <div className="bg-yellow-100 p-3 rounded">
                  <h5 className="font-medium text-yellow-800">📈 OTM Calls (10-30 Delta)</h5>
                  <ul className="text-xs text-yellow-700 space-y-1 mt-1">
                    <li>• <strong>Lottery ticket:</strong> Low cost, high reward potential</li>
                    <li>• <strong>Lower probability:</strong> 10-30% chance of finishing ITM</li>
                    <li>• <strong>Cheap premium:</strong> Affordable for speculation</li>
                    <li>• <strong>Best for:</strong> Momentum plays, breakout trades</li>
                  </ul>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <h5 className="font-medium text-green-800">💰 ITM Calls (70+ Delta)</h5>
                  <ul className="text-xs text-green-700 space-y-1 mt-1">
                    <li>• <strong>Stock substitute:</strong> High delta, expensive premium</li>
                    <li>• <strong>High probability:</strong> 70%+ chance of finishing ITM</li>
                    <li>• <strong>Expensive entry:</strong> High premium cost</li>
                    <li>• <strong>Best for:</strong> Strong bullish conviction</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-green-300 pl-4">
              <h4 className="font-semibold text-green-800">Time to Expiration Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-orange-100 p-3 rounded">
                  <h5 className="font-medium text-orange-800">⏰ Short-Term (0-30 DTE)</h5>
                  <ul className="text-xs text-orange-700 space-y-1 mt-1">
                    <li>• <strong>High gamma:</strong> Explosive moves if correct</li>
                    <li>• <strong>High theta:</strong> Rapid time decay</li>
                    <li>• <strong>Event plays:</strong> Earnings, announcements</li>
                    <li>• <strong>Risk:</strong> Total loss if wrong on timing</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-3 rounded">
                  <h5 className="font-medium text-teal-800">📅 Medium-Term (30-90 DTE)</h5>
                  <ul className="text-xs text-teal-700 space-y-1 mt-1">
                    <li>• <strong>Balanced approach:</strong> Time for thesis to play out</li>
                    <li>• <strong>Moderate theta:</strong> Manageable time decay</li>
                    <li>• <strong>Swing trades:</strong> Technical or fundamental setups</li>
                    <li>• <strong>Flexibility:</strong> Time to adjust if needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-300 pl-4">
              <h4 className="font-semibold text-green-800">Entry Timing Considerations</h4>
              <ul className="space-y-1 mt-2">
                <li>• <strong>Low IV periods:</strong> Buy when volatility is compressed</li>
                <li>• <strong>Technical support:</strong> Enter near key support levels</li>
                <li>• <strong>Market sentiment:</strong> Contrarian plays during extreme pessimism</li>
                <li>• <strong>Fundamental catalysts:</strong> Earnings beats, guidance raises, product launches</li>
                <li>• <strong>Seasonal patterns:</strong> November-April historically strong for equities</li>
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
                <li>• <strong>50% rule:</strong> Take profits when option reaches 50% of maximum theoretical value</li>
                <li>• <strong>2x rule:</strong> Close position when premium doubles (100% gain)</li>
                <li>• <strong>Technical levels:</strong> Take profits at key resistance levels</li>
                <li>• <strong>Volatility contraction:</strong> Exit if IV starts collapsing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Loss Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50% stop loss:</strong> Cut losses if premium falls 50% from entry</li>
                <li>• <strong>Time-based exits:</strong> Close at 7-10 DTE to avoid gamma risk</li>
                <li>• <strong>Thesis invalidation:</strong> Exit if fundamental reason changes</li>
                <li>• <strong>Never add to losers:</strong> Avoid averaging down on losing calls</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Rolling Strategies:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Roll out:</strong> Extend time if thesis intact but need more time</li>
                <li>• <strong>Roll up:</strong> Higher strike if stock has moved favorably</li>
                <li>• <strong>Roll out and up:</strong> Combination for maximum flexibility</li>
                <li>• <strong>Net credit only:</strong> Never roll for a net debit</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Market Conditions */}
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🌤️</span>
            Optimal Market Conditions
          </h3>
          <div className="text-sm text-indigo-700 space-y-3">
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Ideal Entry Conditions:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Low volatility environment:</strong> Cheap option premiums</li>
                <li>• <strong>Oversold markets:</strong> Technical indicators showing oversold conditions</li>
                <li>• <strong>Fundamental improvement:</strong> Economic or company-specific tailwinds</li>
                <li>• <strong>Seasonal strength:</strong> November-April historically bullish</li>
                <li>• <strong>Sentiment extremes:</strong> Excessive pessimism or fear</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Avoid During:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>High volatility periods:</strong> Expensive premiums reduce edge</li>
                <li>• <strong>Strong downtrends:</strong> Fighting the trend is difficult</li>
                <li>• <strong>Low volume periods:</strong> Poor liquidity increases costs</li>
                <li>• <strong>Earnings season:</strong> Unless specifically playing earnings</li>
              </ul>
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
                <li>• <strong>1-2% rule:</strong> Never risk more than 1-2% of portfolio per trade</li>
                <li>• <strong>Premium-based sizing:</strong> Size based on premium cost, not notional</li>
                <li>• <strong>Correlation awareness:</strong> Don't overconcentrate in similar calls</li>
                <li>• <strong>Liquidity requirements:</strong> Ensure sufficient volume for exit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Common Mistakes to Avoid:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Buying expensive calls:</strong> Entering during high IV periods</li>
                <li>• <strong>Holding to expiration:</strong> Ignoring time decay acceleration</li>
                <li>• <strong>Overleveraging:</strong> Risking too much on single trades</li>
                <li>• <strong>Emotional trading:</strong> FOMO trading after big moves</li>
                <li>• <strong>Ignoring liquidity:</strong> Trading illiquid options with wide spreads</li>
                <li>• <strong>No exit plan:</strong> Entering without defined profit/loss targets</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Psychological Challenges:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>High failure rate:</strong> Most calls expire worthless</li>
                <li>• <strong>Timing pressure:</strong> Need to be right on direction AND timing</li>
                <li>• <strong>Theta anxiety:</strong> Watching daily time decay</li>
                <li>• <strong>FOMO trading:</strong> Chasing moves after they've started</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Strategies */}
        <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Advanced Long Call Strategies
          </h3>
          <div className="text-sm text-purple-700 space-y-3">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Growth Stock Applications:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Momentum plays:</strong> Capture explosive moves in growth stocks</li>
                <li>• <strong>Earnings plays:</strong> Bet on positive earnings surprises</li>
                <li>• <strong>Product launches:</strong> Capitalize on new product announcements</li>
                <li>• <strong>Sector rotation:</strong> Play sector-specific growth themes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Volatility Trading Techniques:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Volatility expansion plays:</strong> Buy calls before expected vol increases</li>
                <li>• <strong>Skew trading:</strong> Exploit call-put volatility differences</li>
                <li>• <strong>Term structure plays:</strong> Trade volatility across different expirations</li>
                <li>• <strong>Event volatility:</strong> Play earnings or announcement volatility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Combination Strategies:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Call spreads:</strong> Reduce cost by selling higher strike calls</li>
                <li>• <strong>Call butterflies:</strong> Profit from specific price targets</li>
                <li>• <strong>Covered calls:</strong> Combine with stock ownership for income</li>
                <li>• <strong>Synthetic longs:</strong> Combine with puts for synthetic long exposure</li>
              </ul>
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
                <li>• <strong>Success rate:</strong> 30-50% of long calls finish ITM</li>
                <li>• <strong>Average winner:</strong> 100-500% gains on successful trades</li>
                <li>• <strong>Average loser:</strong> 50-100% loss on unsuccessful trades</li>
                <li>• <strong>Breakeven rate:</strong> Need ~20-25% win rate to break even</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Expected Returns:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Speculative trading:</strong> Highly variable, -100% to +1000%</li>
                <li>• <strong>Growth investing:</strong> 15-30% annual returns for skilled traders</li>
                <li>• <strong>Volatility trading:</strong> 10-20% annual returns for skilled traders</li>
                <li>• <strong>Event trading:</strong> 50-200% per successful event</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Minimum account:</strong> $5,000+ for basic strategies</li>
                <li>• <strong>Recommended size:</strong> $25,000+ for proper diversification</li>
                <li>• <strong>Risk capital only:</strong> Money you can afford to lose completely</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call vs Put Comparison */}
        <div className="bg-violet-50 p-4 md:p-6 rounded-xl shadow-lg border border-violet-200">
          <h3 className="text-xl font-bold text-violet-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            Call vs. Put: The Asymmetry
          </h3>
          <div className="text-sm text-violet-700 space-y-4">
            <p className="mb-4">While calls and puts are mirror images mathematically, they behave completely differently in the real world due to human psychology and market structure.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-violet-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">📈</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Long Call Profile</h4>
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wide">The Optimist's Bet</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-2 rounded text-green-600 mt-1">
                      <span className="text-xs">📊</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Vega Headwind</span>
                      <span className="text-xs text-gray-600">As markets rise, fear subsides. Implied Volatility (IV) usually drops. You profit from Delta (Direction), but lose on Vega (Vol Crush). <em>"Taking the stairs up."</em></span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-2 rounded text-green-600 mt-1">
                      <span className="text-xs">💰</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Pricing Advantage</span>
                      <span className="text-xs text-gray-600">Due to "Skew," OTM calls are generally cheaper than equidistant OTM puts. You are fighting less premium bloat.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-violet-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">📉</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Long Put Profile</h4>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wide">The Pessimist's Bet</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-50 p-2 rounded text-red-600 mt-1">
                      <span className="text-xs">📊</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Vega Tailwind</span>
                      <span className="text-xs text-gray-600">As markets crash, fear explodes. IV spikes. You profit from Delta (Direction) AND Vega (Vol Expansion). This leads to explosive "Gamma Squeezes." <em>"Taking the elevator down."</em></span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-50 p-2 rounded text-red-600 mt-1">
                      <span className="text-xs">💸</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block">Pricing Disadvantage</span>
                      <span className="text-xs text-gray-600">Everyone wants insurance. Puts are structurally overpriced due to "Crashophobia." You need a larger move to break even.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm border border-violet-100 overflow-hidden">
                <thead className="bg-violet-50 border-b border-violet-200">
                  <tr>
                    <th className="p-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="p-3 text-xs font-bold text-green-600 uppercase tracking-wider">Long Call (Bull)</th>
                    <th className="p-3 text-xs font-bold text-red-600 uppercase tracking-wider">Long Put (Bear)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-100 text-xs">
                  <tr className="hover:bg-violet-50 transition-colors">
                    <td className="p-3 font-bold text-gray-700">Market Personality</td>
                    <td className="p-3 text-gray-600">Slow grind up, lower volatility over time</td>
                    <td className="p-3 text-gray-600">Fast, violent moves down. Panic driven</td>
                  </tr>
                  <tr className="hover:bg-violet-50 transition-colors">
                    <td className="p-3 font-bold text-gray-700">Volatility Impact</td>
                    <td className="p-3 text-gray-600">
                      <span className="text-red-600 font-bold">Negative</span><br/>
                      Vol usually drops as price rises
                    </td>
                    <td className="p-3 text-gray-600">
                      <span className="text-green-600 font-bold">Positive</span><br/>
                      Vol spikes as price crashes
                    </td>
                  </tr>
                  <tr className="hover:bg-violet-50 transition-colors">
                    <td className="p-3 font-bold text-gray-700">The "Skew" (Cost)</td>
                    <td className="p-3 text-gray-600">
                      <span className="text-green-600 font-bold">Cheaper</span><br/>
                      Market assumes slow growth
                    </td>
                    <td className="p-3 text-gray-600">
                      <span className="text-red-600 font-bold">Expensive</span><br/>
                      Market fears the black swan
                    </td>
                  </tr>
                  <tr className="hover:bg-violet-50 transition-colors">
                    <td className="p-3 font-bold text-gray-700">Theoretical Limit</td>
                    <td className="p-3 text-gray-600">
                      <span className="text-green-600 font-bold">Unlimited</span><br/>
                      Stock can go to infinity
                    </td>
                    <td className="p-3 text-gray-600">
                      <span className="text-gray-900 font-bold">Capped</span><br/>
                      Stock can only go to $0
                    </td>
                  </tr>
                </tbody>
              </table>
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
                <a href="https://www.optionsplaybook.com/option-strategies/long-call/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Options Playbook: Long Call Mechanics
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
    </div>
  );
};