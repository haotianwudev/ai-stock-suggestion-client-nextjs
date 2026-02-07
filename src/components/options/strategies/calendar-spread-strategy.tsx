import { StrategyDetailProps } from '../strategy-config';

export const CalendarSpreadStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 mb-6">
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
              <p className="mb-2">The Calendar Spread (also called Time Spread or Horizontal Spread) is a <strong>volatility arbitrage and time decay strategy</strong> that exploits the differential rate of theta decay between near-term and long-term options. You're essentially betting that time decay will accelerate in the front month while the back month retains value.</p>
              <p>The strategy involves selling a <strong>short-dated option</strong> and buying a <strong>longer-dated option</strong> at the same strike price, creating a position that profits from the non-linear nature of time decay.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why It Works:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Non-linear theta decay:</strong> Options lose value faster as expiration approaches (exponential decay)</li>
                <li>• <strong>Volatility term structure:</strong> Back month options have higher vega, benefit more from IV expansion</li>
                <li>• <strong>Mean reversion tendency:</strong> Stock prices tend to gravitate toward the strike at front month expiration</li>
                <li>• <strong>Vega differential:</strong> Long-dated options are more sensitive to volatility changes</li>
                <li>• <strong>Structural edge:</strong> Selling expensive near-term premium while maintaining long-term exposure</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The Two Legs Explained:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-red-100 p-3 rounded">
                  <p className="font-medium text-red-800">Short Front Month</p>
                  <p className="text-xs text-red-700 mb-1">• Sell near-term option (30-45 DTE)</p>
                  <p className="text-xs text-red-700">• Generates income from accelerated theta</p>
                  <p className="text-xs text-red-700">• Lower vega exposure</p>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <p className="font-medium text-green-800">Long Back Month</p>
                  <p className="text-xs text-green-700 mb-1">• Buy longer-term option (60-90 DTE)</p>
                  <p className="text-xs text-green-700">• Maintains position exposure</p>
                  <p className="text-xs text-green-700">• Higher vega, benefits from IV rise</p>
                </div>
              </div>
              <p className="text-xs mt-2">Both options share the same strike price, creating a "time arbitrage" position.</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Mathematical Edge - Theta Decay Curve:</h4>
              <div className="mb-3">
                <p className="mb-2">The core alpha comes from the <strong>non-linear theta decay</strong>: options don't decay at a constant rate.</p>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 text-center">"Theta Decay Accelerates Exponentially Near Expiration"</p>
                  <p className="text-xs text-amber-700 text-center mt-1">Front month decays ~3x faster than back month in final 30 days</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Called "Calendar Spread":</h4>
              <p className="mb-2">The name comes from trading <strong>different calendar dates</strong> (expirations):</p>
              <div className="bg-slate-100 p-3 rounded-lg mt-2">
                <p className="text-center font-medium text-slate-800">📅 Near-Term Expiration → 📅 Far-Term Expiration</p>
              </div>
              <p className="mt-2 text-xs">Also called "Horizontal Spread" because on an options chain, different expirations are displayed horizontally across time.</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Profit Mechanics:</h4>
              <div className="space-y-2">
                <div className="bg-emerald-100 p-2 rounded">
                  <p className="font-medium text-emerald-800 text-sm">🎯 Optimal Outcome:</p>
                  <ul className="text-xs text-emerald-700 space-y-1 ml-4 mt-1">
                    <li>• <strong>Stock at strike at expiration:</strong> Front month expires worthless</li>
                    <li>• <strong>Back month retains value:</strong> Still has time premium and intrinsic value</li>
                    <li>• <strong>Volatility expansion:</strong> Back month benefits from IV increase</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Trading Procedure */}
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Step-by-Step Trading Procedure
          </h3>
          <div className="text-sm text-indigo-700 space-y-4">
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 1: Market Analysis & Setup</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Check IV environment:</strong> Prefer low to moderate IV (room for expansion)</li>
                <li><strong>Select underlier:</strong> Choose liquid stocks/ETFs with predictable behavior</li>
                <li><strong>Identify strike:</strong> At-the-money or slightly out-of-the-money</li>
                <li><strong>Choose expirations:</strong> Front month 30-45 DTE, back month 60-90 DTE</li>
                <li><strong>Calculate cost:</strong> Net debit = back month premium - front month premium</li>
              </ol>
            </div>
            
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 2: Strike Selection & Execution</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Determine call or put:</strong> Calls for neutral-bullish, puts for neutral-bearish</li>
                <li><strong>Buy back month option:</strong> 60-90 DTE at chosen strike</li>
                <li><strong>Sell front month option:</strong> 30-45 DTE at same strike</li>
                <li><strong>Execute as spread:</strong> Enter as single order for better fill</li>
                <li><strong>Confirm net debit:</strong> Typical cost is 30-50% of strike width</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 3: Position Monitoring</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Track stock price:</strong> Monitor distance from strike price</li>
                <li><strong>Watch IV changes:</strong> Rising IV benefits the position</li>
                <li><strong>Monitor theta decay:</strong> Front month should decay faster</li>
                <li><strong>Check vega exposure:</strong> Position is net long vega</li>
                <li><strong>Evaluate P&L:</strong> Maximum profit typically at front month expiration</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 4: Exit Strategies</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Optimal exit:</strong> Close at front month expiration if stock near strike</li>
                <li><strong>Early profit taking:</strong> Close if position reaches 50-75% of max profit</li>
                <li><strong>Roll forward:</strong> Sell next month, keep back month (create new calendar)</li>
                <li><strong>Convert to vertical:</strong> If stock moves away, sell back month at different strike</li>
                <li><strong>Stop loss:</strong> Exit if position loses 50% of initial debit</li>
              </ol>
            </div>
          </div>
        </div>

        {/* The Greeks Management */}
        <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            The Greeks Management
          </h3>
          <div className="text-sm text-purple-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800">Theta (Θ) - Your Friend</h4>
                <p className="text-xs text-green-700 mt-1">Net positive theta. Front month decays faster than back month, creating profit from time passage alone.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800">Vega (ν) - Volatility Ally</h4>
                <p className="text-xs text-blue-700 mt-1">Net positive vega. Back month has higher vega, so rising IV increases position value significantly.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800">Delta (Δ) - Near Neutral</h4>
                <p className="text-xs text-orange-700 mt-1">Initially near zero. Becomes directional as stock moves away from strike or time passes.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800">Gamma (Γ) - The Variable</h4>
                <p className="text-xs text-red-700 mt-1">Net negative gamma initially. Position becomes more directional as front month approaches expiration.</p>
              </div>
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
              <h4 className="font-semibold text-green-800 mb-2">Entry Criteria:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Strike selection:</strong> ATM or slightly OTM (within 2-3% of current price)</li>
                <li>• <strong>Time spread:</strong> 30-45 day gap between expirations (1:2 ratio)</li>
                <li>• <strong>IV environment:</strong> Low to moderate IV with room for expansion</li>
                <li>• <strong>Liquid underliers:</strong> High volume stocks/ETFs with tight spreads</li>
                <li>• <strong>Cost basis:</strong> Risk 2-3% of account per position</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Position Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Profit target:</strong> 50-75% of maximum theoretical profit</li>
                <li>• <strong>Time management:</strong> Evaluate at 7-10 DTE of front month</li>
                <li>• <strong>Rolling strategy:</strong> Can roll front month forward to create new calendar</li>
                <li>• <strong>Adjustment triggers:</strong> Stock moves &gt;5% from strike</li>
                <li>• <strong>IV monitoring:</strong> Rising IV is your friend, falling IV hurts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Risk Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Maximum loss:</strong> Limited to net debit paid</li>
                <li>• <strong>Stop loss:</strong> Exit if down 50% of initial cost</li>
                <li>• <strong>Position sizing:</strong> Smaller than directional trades (higher complexity)</li>
                <li>• <strong>Diversification:</strong> Multiple expirations and underliers</li>
                <li>• <strong>Avoid earnings:</strong> Don't hold through major events</li>
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
                <li>• <strong>Low volatility periods:</strong> Room for IV expansion benefits back month</li>
                <li>• <strong>Range-bound markets:</strong> Stock oscillates around strike price</li>
                <li>• <strong>Post-volatility crush:</strong> After earnings or events when IV compressed</li>
                <li>• <strong>Stable trending:</strong> Slow, predictable price movement</li>
                <li>• <strong>Mean-reverting stocks:</strong> Tendency to return to average prices</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Avoid During:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>High volatility spikes:</strong> IV crush will hurt back month more</li>
                <li>• <strong>Strong trending markets:</strong> Stock moving rapidly away from strike</li>
                <li>• <strong>Before major events:</strong> Earnings, FDA approvals, FOMC meetings</li>
                <li>• <strong>Illiquid options:</strong> Wide spreads destroy edge</li>
                <li>• <strong>Dividend ex-dates:</strong> Early assignment risk on short calls</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Calendar Spread Variations */}
        <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            Calendar Spread Variations
          </h3>
          <div className="text-sm text-teal-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Standard Calendar (Horizontal):</h4>
              <p><strong>Same strike, different expirations.</strong> Most common form, profits from time decay differential.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Diagonal Spread:</h4>
              <p><strong>Different strikes AND expirations.</strong> Adds directional bias while maintaining time decay advantage.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Double Calendar:</h4>
              <p><strong>Two calendars (call + put).</strong> Profits from stock staying in range, similar to iron condor but with time component.</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Reverse Calendar:</h4>
              <p><strong>Buy front month, sell back month.</strong> Rare strategy for expecting large immediate move with volatility crush.</p>
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
              <h4 className="font-semibold text-red-800 mb-2">Entry Mistakes:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Wrong IV environment:</strong> Entering when IV is elevated (risk of crush)</li>
                <li>• <strong>Poor strike selection:</strong> Too far OTM reduces profit potential</li>
                <li>• <strong>Insufficient time spread:</strong> Less than 30 days between expirations</li>
                <li>• <strong>Illiquid options:</strong> Wide bid-ask spreads eat into profits</li>
                <li>• <strong>Before events:</strong> Earnings or major announcements pending</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Management Failures:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Holding too long:</strong> Letting front month expire without plan</li>
                <li>• <strong>Not taking profits:</strong> Waiting for "maximum" profit that may not materialize</li>
                <li>• <strong>Ignoring IV changes:</strong> Not adjusting for volatility shifts</li>
                <li>• <strong>No adjustment plan:</strong> Stock moves significantly, no response</li>
                <li>• <strong>Over-rolling:</strong> Continuously rolling losing positions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Risk Misunderstanding:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Underestimating vega risk:</strong> IV crush can hurt despite time decay</li>
                <li>• <strong>Ignoring pin risk:</strong> Stock exactly at strike at expiration</li>
                <li>• <strong>Assignment confusion:</strong> Not understanding early assignment on short leg</li>
                <li>• <strong>Complexity overload:</strong> Too many positions to manage effectively</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">The Volatility Crush Trap:</h4>
              <div className="bg-red-100 p-3 rounded mt-2">
                <p className="font-medium text-red-800 mb-1">Danger Scenario:</p>
                <p className="text-xs text-red-700">Enter calendar when IV is high → IV crushes → Back month loses more value than front month decay → Net loss despite time passage</p>
                <p className="text-xs text-red-700 mt-1"><strong>Mitigation:</strong> Only enter when IV Rank &lt; 50, preferably &lt; 30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-yellow-50 p-4 md:p-6 rounded-xl shadow-lg border border-yellow-200">
          <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span>
            Performance Metrics & Expectations
          </h3>
          <div className="text-sm text-yellow-700 space-y-3">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Expected Returns:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Win rate:</strong> 55-65% when properly managed</li>
                <li>• <strong>Profit potential:</strong> 20-40% return on capital at risk</li>
                <li>• <strong>Maximum profit:</strong> Typically at front month expiration with stock at strike</li>
                <li>• <strong>Time to profit:</strong> 30-45 days (front month expiration)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Minimum account:</strong> $10,000+ for effective diversification</li>
                <li>• <strong>Cost per spread:</strong> $200-$500 typical for ATM calendars</li>
                <li>• <strong>Position sizing:</strong> 2-3% of account per position</li>
                <li>• <strong>Margin requirements:</strong> Net debit paid (no additional margin)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Risk Characteristics:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Maximum loss:</strong> Net debit paid (limited risk)</li>
                <li>• <strong>Maximum profit:</strong> Variable, depends on back month value at expiration</li>
                <li>• <strong>Breakeven:</strong> Stock near strike with sufficient back month value</li>
                <li>• <strong>Risk/reward:</strong> Typically 1:1 to 1:2 ratio</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Techniques */}
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Advanced Techniques
          </h3>
          <div className="text-sm text-indigo-700 space-y-3">
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Rolling for Income:</h4>
              <p className="mb-2">At front month expiration, if stock near strike:</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Let front month expire:</strong> Capture full theta decay</li>
                <li>• <strong>Sell next month:</strong> Create new calendar spread</li>
                <li>• <strong>Collect additional credit:</strong> Reduce cost basis of back month</li>
                <li>• <strong>Repeat monthly:</strong> Turn into income-generating strategy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Diagonal Conversion:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Stock moves away:</strong> Convert to diagonal spread</li>
                <li>• <strong>Adjust back month:</strong> Sell at different strike to capture value</li>
                <li>• <strong>Create vertical:</strong> Transform into bull/bear spread</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Double Calendar Strategy:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Call calendar above:</strong> Sell front month call, buy back month</li>
                <li>• <strong>Put calendar below:</strong> Sell front month put, buy back month</li>
                <li>• <strong>Profit zone:</strong> Stock stays between strikes</li>
                <li>• <strong>Higher complexity:</strong> Requires more capital and management</li>
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
                <a href="/articles/calendar-spread-architecture-time-decay-options-trading" 
                   className="text-blue-600 hover:underline block">
                   • Deep Research: Calendar Spread Architecture & Time Decay
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
