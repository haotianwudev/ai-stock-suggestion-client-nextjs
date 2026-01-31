import { StrategyDetailProps } from '../strategy-config';

export const BufferedStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
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
              <p className="mb-2">The Buffered Strategy is a <strong>defined outcome investment</strong> that explicitly defines the range of possible returns over a specific period. You trade <strong>upside potential</strong> (the Cap) to fund <strong>downside protection</strong> (the Buffer), creating a predictable risk-reward profile.</p>
              <p>This strategy combines stock ownership with a protective put spread collar, creating a "safety net" that absorbs the first X% of losses while capping gains at a predetermined level.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why It Works:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Psychological Safety:</strong> Knowing you can't lose the first 15% allows investors to stay invested during market volatility</li>
                <li>• <strong>Sequence of Return Risk:</strong> Critical for retirees - mitigates the risk of a crash right after retirement</li>
                <li>• <strong>Bond Alternative:</strong> Offers non-correlated risk profile when bonds and stocks fall together</li>
                <li>• <strong>Volatility Monetization:</strong> Converts market fear (high IV) into protection premium</li>
                <li>• <strong>Defined Outcomes:</strong> Unlike traditional investing with infinite outcomes, this creates predictable ranges</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The Four Components Explained:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-medium text-blue-800">1. Long Asset (Stock/ETF)</p>
                  <p className="text-xs text-blue-700">Provides the underlying exposure and dividend income</p>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <p className="font-medium text-green-800">2. Long Put (The Floor)</p>
                  <p className="text-xs text-green-700">Protects from losses below the buffer level</p>
                </div>
                <div className="bg-amber-100 p-3 rounded">
                  <p className="font-medium text-amber-800">3. Short Put (Buffer Limit)</p>
                  <p className="text-xs text-amber-700">Re-introduces risk below buffer, funds the trade</p>
                </div>
                <div className="bg-rose-100 p-3 rounded">
                  <p className="font-medium text-rose-800">4. Short Call (The Cap)</p>
                  <p className="text-xs text-rose-700">Limits upside profits, provides additional funding</p>
                </div>
              </div>
              <p className="text-xs mt-2">The goal is to make this a "zero-cost" collar where the credits from selling options fund the protective put purchase.</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Mathematical Edge - Risk Transfer:</h4>
              <div className="mb-3">
                <p className="mb-2">The core alpha comes from <strong>risk transfer</strong>: you're essentially buying insurance against market crashes while selling your lottery ticket for massive gains.</p>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 text-center">"Trade Unlimited Upside for Defined Downside Protection"</p>
                  <p className="text-xs text-amber-700 text-center mt-1">Perfect for risk-averse investors or those near retirement</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Called "Buffered":</h4>
              <p className="mb-2">The name comes from the <strong>buffer zone</strong> of protection:</p>
              <div className="bg-slate-100 p-3 rounded-lg mt-2">
                <p className="text-center font-medium text-slate-800">📉 Loss Zone → 🛡️ Buffer Zone → 📈 Capped Gains</p>
              </div>
              <p className="mt-2 text-xs">Like a car's crumple zone, the buffer absorbs the first impact (market decline) before damage reaches the passenger (your capital).</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Outcome Scenarios:</h4>
              <div className="space-y-2">
                <div className="bg-emerald-100 p-2 rounded">
                  <p className="font-medium text-emerald-800 text-sm">🎯 Ideal Scenario (Sideways/Small Gains):</p>
                  <ul className="text-xs text-emerald-700 space-y-1 ml-4 mt-1">
                    <li>• <strong>Market +5%:</strong> You get +5% with no insurance cost</li>
                    <li>• <strong>Market -10%:</strong> You lose 0% while market investors lose 10%</li>
                    <li>• <strong>Market flat:</strong> You break even with peace of mind</li>
                  </ul>
                </div>
                <div className="bg-rose-100 p-2 rounded">
                  <p className="font-medium text-rose-800 text-sm">⚠️ Challenging Scenarios:</p>
                  <ul className="text-xs text-rose-700 space-y-1 ml-4 mt-1">
                    <li>• <strong>Bull Market +30%:</strong> You're capped at +15%, missing significant gains</li>
                    <li>• <strong>Crash -40%:</strong> With 15% buffer, you still lose -25%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Framework */}
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Implementation Framework
          </h3>
          <div className="text-sm text-indigo-700 space-y-4">
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 1: Strategy Selection</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Choose Vehicle:</strong> Buffered ETFs (recommended) vs. DIY options vs. Structured Notes</li>
                <li><strong>Select Buffer Level:</strong> 9% (aggressive), 15% (typical), or 30% (conservative)</li>
                <li><strong>Understand the Cap:</strong> Higher buffers = lower caps (typically 8-18% annually)</li>
                <li><strong>Check Outcome Period:</strong> Most strategies reset annually</li>
                <li><strong>Timing Consideration:</strong> Best to enter at cycle start, not mid-cycle</li>
              </ol>
            </div>
            
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 2: DIY Construction (Advanced)</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Buy the underlying:</strong> 100 shares of SPY/QQQ at current price</li>
                <li><strong>Buy protective put:</strong> At-the-money put for floor protection</li>
                <li><strong>Sell lower put:</strong> Out-of-the-money put to create buffer limit</li>
                <li><strong>Sell call:</strong> Out-of-the-money call to cap gains and fund trade</li>
                <li><strong>Target zero cost:</strong> Credits from short options should offset long put cost</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 3: Position Monitoring</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Track to outcome period:</strong> Strategy designed to be held to expiration</li>
                <li><strong>Monitor cap proximity:</strong> If near cap, consider profit-taking</li>
                <li><strong>Watch buffer breach:</strong> If market approaches buffer limit, prepare for losses</li>
                <li><strong>Plan for reset:</strong> Understand new terms when options expire</li>
                <li><strong>Dividend considerations:</strong> DIY versions may miss dividend income</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 4: Exit Strategy</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Hold to maturity:</strong> Optimal for defined outcome realization</li>
                <li><strong>Early exit considerations:</strong> ETFs offer liquidity, but outcomes may differ</li>
                <li><strong>Roll to new cycle:</strong> Evaluate new cap/buffer terms before rolling</li>
                <li><strong>Rebalance allocation:</strong> Adjust position size based on market conditions</li>
                <li><strong>Tax implications:</strong> Consider 1256 treatment for index options</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Best Practices
          </h3>
          <div className="text-sm text-green-700 space-y-3">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Vehicle Selection:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Buffered ETFs (Recommended):</strong> Innovator, First Trust - liquid, transparent, bankruptcy remote</li>
                <li>• <strong>Avoid Structured Notes:</strong> Credit risk, liquidity issues, opaque pricing</li>
                <li>• <strong>DIY Only for Advanced:</strong> Requires options expertise and active management</li>
                <li>• <strong>Index vs. Single Stock:</strong> Diversified indices preferred over individual stocks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Timing and Allocation:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Cycle timing:</strong> Enter at outcome period start for full protection</li>
                <li>• <strong>Position sizing:</strong> 10-30% of portfolio for diversification</li>
                <li>• <strong>Complement, don't replace:</strong> Use alongside traditional equity allocation</li>
                <li>• <strong>Rebalancing discipline:</strong> Don't chase performance, stick to allocation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Risk Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Understand the cap:</strong> Accept that you'll miss big bull runs</li>
                <li>• <strong>Buffer isn't guarantee:</strong> Severe crashes can still cause losses</li>
                <li>• <strong>Dividend drag:</strong> Factor in missed dividend income vs. SPY</li>
                <li>• <strong>Reset risk:</strong> New terms may be less favorable in low volatility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Market Conditions */}
        <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Optimal Market Conditions
          </h3>
          <div className="text-sm text-blue-700 space-y-3">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Ideal Environments:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>High volatility periods:</strong> Better caps available when VIX is elevated</li>
                <li>• <strong>Sideways/choppy markets:</strong> Perfect for range-bound conditions</li>
                <li>• <strong>Late cycle markets:</strong> When crash risk is elevated but timing uncertain</li>
                <li>• <strong>Retirement transition:</strong> Sequence of return risk mitigation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Avoid During:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Strong bull markets:</strong> You'll be frustrated by the cap limitation</li>
                <li>• <strong>Low volatility environments:</strong> Caps will be disappointingly low</li>
                <li>• <strong>Post-crash recoveries:</strong> V-shaped recoveries will hit your cap quickly</li>
                <li>• <strong>When you need growth:</strong> Not suitable for aggressive growth objectives</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vehicle Comparison */}
        <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            Implementation Vehicles Comparison
          </h3>
          <div className="text-sm text-purple-700 space-y-4">
            <div className="overflow-hidden border rounded-lg border-purple-200">
              <table className="w-full text-xs">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-bold">Feature</th>
                    <th className="px-3 py-2 text-center font-bold text-green-700">Buffered ETF</th>
                    <th className="px-3 py-2 text-center font-bold text-blue-700">DIY Options</th>
                    <th className="px-3 py-2 text-center font-bold text-red-700">Structured Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  <tr>
                    <td className="px-3 py-2 font-medium">Credit Risk</td>
                    <td className="px-3 py-2 text-center text-green-600 font-bold">None</td>
                    <td className="px-3 py-2 text-center text-green-600 font-bold">None</td>
                    <td className="px-3 py-2 text-center text-red-600 font-bold">High</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Liquidity</td>
                    <td className="px-3 py-2 text-center text-green-600 font-bold">Daily</td>
                    <td className="px-3 py-2 text-center text-yellow-600 font-bold">Good</td>
                    <td className="px-3 py-2 text-center text-red-600 font-bold">Poor</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Complexity</td>
                    <td className="px-3 py-2 text-center text-green-600 font-bold">Low</td>
                    <td className="px-3 py-2 text-center text-red-600 font-bold">High</td>
                    <td className="px-3 py-2 text-center text-yellow-600 font-bold">Medium</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Customization</td>
                    <td className="px-3 py-2 text-center text-red-600 font-bold">Limited</td>
                    <td className="px-3 py-2 text-center text-green-600 font-bold">Full</td>
                    <td className="px-3 py-2 text-center text-green-600 font-bold">High</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Min Investment</td>
                    <td className="px-3 py-2 text-center text-green-600 font-bold">~$30</td>
                    <td className="px-3 py-2 text-center text-yellow-600 font-bold">~$5,000</td>
                    <td className="px-3 py-2 text-center text-red-600 font-bold">$25,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            Common Pitfalls
          </h3>
          <div className="text-sm text-red-700 space-y-3">
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Timing Mistakes:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Mid-cycle entry:</strong> Buying after significant moves reduces protection effectiveness</li>
                <li>• <strong>Chasing performance:</strong> Entering after good performance when cap is nearly reached</li>
                <li>• <strong>Ignoring reset dates:</strong> Not understanding when new terms take effect</li>
                <li>• <strong>FOMO during bull runs:</strong> Abandoning strategy when market is rallying</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Expectation Errors:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Expecting no losses:</strong> Buffer can be breached in severe crashes</li>
                <li>• <strong>Ignoring opportunity cost:</strong> Missing out on dividend income and unlimited upside</li>
                <li>• <strong>Over-allocation:</strong> Making this 100% of portfolio instead of complement</li>
                <li>• <strong>Short-term thinking:</strong> Evaluating success over months instead of full cycles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Implementation Failures:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>DIY complexity:</strong> Underestimating the skill required for options management</li>
                <li>• <strong>Structured note risks:</strong> Ignoring credit risk and liquidity constraints</li>
                <li>• <strong>Tax inefficiency:</strong> Not considering tax implications of different vehicles</li>
                <li>• <strong>Cost blindness:</strong> Not factoring in all embedded costs and fees</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">The Dividend Trap:</h4>
              <div className="bg-red-100 p-3 rounded mt-2">
                <p className="font-medium text-red-800 mb-1">Hidden Cost of Protection:</p>
                <p className="font-mono text-xs text-red-700">SPY Dividend Yield: ~1.5% annually</p>
                <p className="text-xs text-red-700 mt-1"><strong>Impact:</strong> Over 10 years, missed dividends compound to ~15% total return drag vs. unhedged SPY</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Expectations */}
        <div className="bg-yellow-50 p-4 md:p-6 rounded-xl shadow-lg border border-yellow-200">
          <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span>
            Performance Expectations
          </h3>
          <div className="text-sm text-yellow-700 space-y-3">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Typical Outcomes:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Annual caps:</strong> 8-18% depending on volatility at reset</li>
                <li>• <strong>Buffer levels:</strong> 9%, 15%, or 30% downside protection</li>
                <li>• <strong>Win scenarios:</strong> Sideways markets, moderate corrections, slow bleeds</li>
                <li>• <strong>Lose scenarios:</strong> Strong bull runs, severe crashes beyond buffer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Historical Context:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>2008 Crisis:</strong> 15% buffer would have reduced -37% SPY loss to -22%</li>
                <li>• <strong>2020 Pandemic:</strong> Quick V-recovery would have hit caps early</li>
                <li>• <strong>2022 Bear Market:</strong> Sideways grind perfect for buffered strategies</li>
                <li>• <strong>Bull Markets 2009-2021:</strong> Significant underperformance due to caps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Suitability Profile:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Risk tolerance:</strong> Conservative to moderate investors</li>
                <li>• <strong>Time horizon:</strong> 3-10 years, not suitable for very long-term growth</li>
                <li>• <strong>Life stage:</strong> Pre-retirees and early retirees (sequence risk)</li>
                <li>• <strong>Portfolio role:</strong> 10-30% allocation as equity alternative</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learn More Resources */}
        <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Learn More Resources
          </h3>
          <div className="text-sm text-teal-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Educational Content:</h4>
              <div className="space-y-1 ml-4">
                <a href="/articles/mastering-buffered-yield-strategies-defined-outcome-investing" 
                   className="text-blue-600 hover:underline block">
                   • Deep Research: Mastering Buffered Yield Strategies
                </a>
                <a href="/articles/option-collar-strategy-protect-gains-define-risk" 
                   className="text-blue-600 hover:underline block">
                   • Related: Option Collar Strategy Guide
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Popular Buffered ETFs:</h4>
              <div className="space-y-1 ml-4">
                <p className="text-xs text-teal-600">
                  <strong>Innovator ETFs:</strong> BJAN, BJUL, BOCT (S&P 500 with 15% buffer)
                </p>
                <p className="text-xs text-teal-600">
                  <strong>First Trust:</strong> Various buffer levels and underlying indices
                </p>
                <p className="text-xs text-teal-600">
                  <strong>Research:</strong> Always read the prospectus before investing
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};