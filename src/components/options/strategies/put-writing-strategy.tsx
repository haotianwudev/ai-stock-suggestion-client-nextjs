import { StrategyDetailProps } from '../strategy-config';

export const PutWritingStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">💰</span>
          Put Writing Strategy Details
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
              <strong>Put writing</strong> is a bullish income strategy that involves:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-emerald-800">
              <li><strong>Sell Put Option:</strong> Sell a put option and collect premium upfront</li>
              <li><strong>Obligation to Buy:</strong> Agree to purchase stock at strike price if assigned</li>
              <li><strong>Premium Income:</strong> Keep the premium if option expires worthless</li>
              <li><strong>Two Variants:</strong> Cash-secured (safe) or naked (leveraged)</li>
            </ul>
            <p className="mt-2 text-emerald-800">
              This creates a <strong>high-probability income strategy</strong> with the potential for <strong>strategic stock acquisition</strong> at predetermined prices.
            </p>
          </div>
          
          <p>
            Put writing is often called <strong>"selling insurance on stocks"</strong>. Just as an insurance company 
            collects premiums and hopes claims never occur, put writers collect option premiums and hope the stock 
            never falls below their strike price. When it works, you keep the premium. When assigned, you acquire 
            stock at a discount to where it was trading when you sold the put.
          </p>
          
          <p>
            Think of it as <strong>getting paid to place a limit order</strong>. Instead of placing a buy order at 
            $95 for a $100 stock and earning nothing while you wait, you sell a $95 put and collect premium. 
            If the stock falls to $95, you buy it as planned but at an effective cost of $95 minus the premium received.
          </p>
          
          <p>
            This strategy is particularly popular among <strong>value investors and systematic income traders</strong> 
            because it combines income generation with strategic position building. It's also the first leg of the 
            famous "Wheel Strategy" and a cornerstone of many professional option selling programs.
          </p>
          
          <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">💡 Key Insight</h4>
            <p className="text-blue-800">
              Put writing transforms the traditional "buy and hold" approach into a <strong>"get paid to wait" strategy</strong>. 
              Instead of hoping for stock appreciation, you generate income while positioning for potential acquisition 
              at attractive prices. This is particularly powerful in sideways or volatile markets.
            </p>
          </div>
        </div>
      </div>

      {/* Cash-Secured vs Naked Put Writing */}
      <div className="bg-amber-50 p-4 md:p-6 rounded-xl shadow-lg border border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          Cash-Secured vs Naked Put Writing
        </h3>
        <div className="text-sm text-amber-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <span className="text-lg">🛡️</span>
                Cash-Secured Put Writing
              </h4>
              <div className="space-y-2 text-green-800">
                <p><strong>Collateral:</strong> Hold full cash amount (100 shares × strike price)</p>
                <p><strong>Risk Level:</strong> Conservative - Limited to cash held</p>
                <p><strong>Margin Required:</strong> None (cash collateral)</p>
                <p><strong>Assignment Impact:</strong> Simply purchase stock with held cash</p>
                <p><strong>Suitable For:</strong> Conservative investors, retirement accounts</p>
                <p><strong>Capital Efficiency:</strong> Lower (cash sits idle)</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <span className="text-lg">⚡</span>
                Naked Put Writing
              </h4>
              <div className="space-y-2 text-red-800">
                <p><strong>Collateral:</strong> Margin requirement (typically 20% of notional)</p>
                <p><strong>Risk Level:</strong> Aggressive - Leveraged exposure</p>
                <p><strong>Margin Required:</strong> Yes (portfolio margin preferred)</p>
                <p><strong>Assignment Impact:</strong> Must find cash to purchase stock</p>
                <p><strong>Suitable For:</strong> Experienced traders with margin accounts</p>
                <p><strong>Capital Efficiency:</strong> Higher (leverage amplifies returns)</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-amber-100 border-b border-amber-200">
                  <th className="p-3 text-sm font-bold text-amber-600">Comparison Factor</th>
                  <th className="p-3 text-sm font-bold text-green-600">Cash-Secured</th>
                  <th className="p-3 text-sm font-bold text-red-600">Naked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                <tr>
                  <td className="p-3 font-medium">Capital Required</td>
                  <td className="p-3 font-semibold text-green-600">100% (full notional value)</td>
                  <td className="p-3">20-30% (margin requirement)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Return on Capital</td>
                  <td className="p-3">Lower (premium ÷ full cash)</td>
                  <td className="p-3 font-semibold text-red-600">Higher (premium ÷ margin)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Risk Level</td>
                  <td className="p-3 font-semibold text-green-600">Conservative</td>
                  <td className="p-3 text-red-600">High (leveraged)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Account Type</td>
                  <td className="p-3 font-semibold text-green-600">Any account type</td>
                  <td className="p-3 text-amber-600">Margin account required</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Assignment Handling</td>
                  <td className="p-3 font-semibold text-green-600">Seamless (cash ready)</td>
                  <td className="p-3 text-red-600">Complex (need liquidity)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Psychological Stress</td>
                  <td className="p-3 font-semibold text-green-600">Low</td>
                  <td className="p-3 text-red-600">High (leverage anxiety)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">🎯 Which Approach to Choose?</h4>
            <p className="text-amber-800">
              <strong>Cash-Secured:</strong> Choose for conservative income generation, retirement accounts, or when learning the strategy. 
              Provides peace of mind and eliminates margin calls.<br/><br/>
              <strong>Naked:</strong> Choose for capital efficiency when you have experience, adequate liquidity, and risk tolerance. 
              Can generate 3-5x higher returns on capital but requires active risk management.
            </p>
          </div>
        </div>
      </div>

      {/* Put Writing vs Covered Call Comparison */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          Put Writing vs Covered Call: Synthetic Equivalence
        </h3>
        <div className="text-sm text-purple-700 space-y-4">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🔬 Put-Call Parity Relationship</h4>
            <div className="text-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg inline-block border border-purple-300">
                <p className="text-lg font-mono text-purple-800">C + PV(K) = P + S</p>
              </div>
            </div>
            <p className="text-purple-800">
              This equation proves that <strong>cash-secured put writing and covered call writing are synthetically identical</strong>. 
              A cash-secured put (PV(K) - P) has the same risk/reward profile as a covered call (S - C) when using the same strikes and expirations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">Cash-Secured Put</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-emerald-700">
                <li>Start with cash position</li>
                <li>Sell put option below current price</li>
                <li>Goal: Acquire stock at discount or keep premium</li>
                <li>Assignment: Cash → Stock</li>
                <li>Psychological frame: "Getting paid to place limit order"</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Covered Call</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-blue-700">
                <li>Start with stock position</li>
                <li>Sell call option above current price</li>
                <li>Goal: Generate income or sell at target price</li>
                <li>Assignment: Stock → Cash</li>
                <li>Psychological frame: "Enhancing stock income"</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🎡 The Wheel Strategy Connection</h4>
            <p className="text-purple-800">
              Put writing and covered calls are the two phases of the Wheel Strategy. Start by selling cash-secured puts 
              to acquire stock, then sell covered calls on the acquired stock. If called away, return to selling puts. 
              This creates a continuous income-generating cycle with three income sources: put premiums, call premiums, and dividends.
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
              <p>Positive delta exposure from short put. Benefits from upward price movement. Delta increases as stock approaches strike.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold mb-2 text-amber-700">Gamma (Γ) - Assignment Risk</h4>
              <p>Negative gamma when profitable. Risk increases as stock approaches strike price, requiring position management.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-700">Theta (θ) + Excellent Income</h4>
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
      <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
        <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Strike Selection Framework
        </h3>
        <div className="text-sm text-teal-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-teal-200">
              <h4 className="font-semibold mb-2 text-teal-800">16 Delta Method</h4>
              <p>Sell the 16-delta put for approximately 84% probability of success. Conservative approach targeting one standard deviation moves.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 text-blue-800">20-30 Delta Method</h4>
              <p>Sell 20-30 delta puts for higher premium while maintaining good probability (70-80% success rate). Balanced risk/reward.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-800">Technical Support</h4>
              <p>Use support levels, moving averages, or value metrics to set strikes at logical entry points for stock ownership.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-teal-200">
            <h4 className="font-bold text-teal-900 mb-2">📊 Premium Collection Targets</h4>
            <p className="text-teal-800 mb-2">
              <strong>Conservative:</strong> 0.5-1.0% of strike price per month (16 delta puts)<br/>
              <strong>Moderate:</strong> 1.0-2.0% of strike price per month (20-25 delta puts)<br/>
              <strong>Aggressive:</strong> 2.0-4.0% of strike price per month (30+ delta puts)
            </p>
            <p className="text-xs text-teal-600">
              Higher premiums come with higher assignment probability. Balance income goals with assignment comfort level.
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
                <li><strong>Quality Stocks:</strong> Only sell puts on stocks you want to own</li>
                <li><strong>Liquid Options:</strong> Focus on high-volume underlyings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">Position Sizing</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Cash-Secured:</strong> Risk 5-10% of portfolio per position</li>
                <li><strong>Naked Puts:</strong> Risk 1-2% of portfolio per position</li>
                <li><strong>Diversification:</strong> Spread across sectors and market caps</li>
                <li><strong>Correlation:</strong> Monitor portfolio-wide delta exposure</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">📋 Step-by-Step Execution</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Screen for high IV rank underlyings (&gt;30%)</li>
              <li>Identify stocks you'd be comfortable owning</li>
              <li>Select expiration 30-45 days out</li>
              <li>Choose strike price using delta or technical analysis</li>
              <li>Ensure adequate premium (target 1-3% monthly)</li>
              <li>Sell put option and collect premium</li>
              <li>Manage at 50% profit or 21 DTE</li>
              <li>If assigned, consider selling covered calls (Wheel)</li>
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
              <h4 className="font-semibold mb-2 text-red-800">Profit/Loss Management</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Profit Target:</strong> Close at 50% of maximum profit</li>
                <li><strong>Loss Limit:</strong> Close at 200% of premium received</li>
                <li><strong>Time Stop:</strong> Close at 21 DTE regardless of P&L</li>
                <li><strong>Technical Stop:</strong> Close if stock breaks key support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-800">Assignment Preparation</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Cash-Secured:</strong> Ensure cash is available for assignment</li>
                <li><strong>Naked Puts:</strong> Have liquidity plan for assignment</li>
                <li><strong>Quality Focus:</strong> Only sell puts on stocks you want to own</li>
                <li><strong>Wheel Preparation:</strong> Plan covered call strategy post-assignment</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">🎯 Naked Put Specific Risks</h4>
            <p className="text-red-800 mb-2">
              <strong>Margin Calls:</strong> Stock decline can trigger margin calls requiring additional capital<br/>
              <strong>Assignment Risk:</strong> Must have liquidity to purchase assigned stock<br/>
              <strong>Leverage Risk:</strong> Losses are amplified due to leverage<br/>
              <strong>Concentration Risk:</strong> Avoid over-concentration in single positions
            </p>
            <p className="text-xs text-red-600">
              Example: Sell $100 put for $2 premium. If stock falls to $80, loss = $18 per share ($20 decline - $2 premium)
            </p>
          </div>
        </div>
      </div>

      {/* Position Adjustment Strategies */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          Position Adjustment Strategies
        </h3>
        <div className="text-sm text-purple-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold mb-2 text-indigo-800">Roll Down and Out</h4>
              <p>If stock moves against you, roll the put to a lower strike and later expiration for additional credit.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-800">Accept Assignment</h4>
              <p>If comfortable owning the stock, accept assignment and begin selling covered calls (Wheel Strategy).</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200">
              <h4 className="font-semibold mb-2 text-rose-800">Close Early</h4>
              <p>Take profits at 50% of maximum gain rather than holding to expiration for risk management.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🎪 Advanced: "Ladder" Strategy</h4>
            <p className="text-purple-800">
              Deploy multiple put options at different strike levels and expirations to create a "ladder" of potential 
              stock acquisitions. This technique provides consistent income while building positions gradually across 
              different price levels and time frames.
            </p>
          </div>
        </div>
      </div>

      {/* Performance Characteristics */}
      <div className="bg-yellow-50 p-4 md:p-6 rounded-xl shadow-lg border border-yellow-200">
        <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Expected Performance Characteristics
        </h3>
        <div className="text-sm text-yellow-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-yellow-200">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-sm mb-2">Win Rate</h4>
              <p className="text-xs">Typically 70-85% when managed with 50% profit target</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-yellow-200">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-sm mb-2">Monthly Income</h4>
              <p className="text-xs">1-3% of capital deployed in cash-secured puts</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-yellow-200">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-sm mb-2">Naked Put ROC</h4>
              <p className="text-xs">3-15% monthly on margin deployed (leveraged)</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <h4 className="font-bold text-yellow-900 mb-2">📈 Return Comparison</h4>
            <p className="text-yellow-800 mb-2">
              <strong>Cash-Secured Puts:</strong> 12-36% annualized return on cash deployed<br/>
              <strong>Naked Puts:</strong> 50-200% annualized return on margin (higher risk)<br/>
              <strong>Assignment Rate:</strong> 15-30% depending on delta selection<br/>
              <strong>Wheel Strategy:</strong> 15-25% total return combining puts, calls, and dividends
            </p>
            <p className="text-xs text-yellow-600">
              Returns depend heavily on market conditions, volatility environment, and strike selection discipline.
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
                  <li>Target 1-3% monthly premium</li>
                  <li>Quality stocks only (fundamental screen)</li>
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
            <h4 className="font-bold text-indigo-900 mb-2">📊 Portfolio Allocation Guidelines</h4>
            <p className="text-indigo-800">
              <strong>Cash-Secured Puts:</strong> Allocate 20-40% of portfolio to put writing across 10-20 positions<br/>
              <strong>Naked Puts:</strong> Limit to 5-15% of portfolio with strict risk management<br/>
              <strong>Diversification:</strong> Spread across sectors, market caps, and correlation groups
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
              <li><a href="/articles/covered-calls-vs-cash-secured-puts" className="text-blue-600 hover:underline">Covered Calls vs Cash-Secured Puts: Complete Analysis</a></li>
              <li><a href="/articles/wheel-strategy" className="text-blue-600 hover:underline">The Wheel Strategy: Systematic Income Generation</a></li>
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
          <strong>Risk Disclosure:</strong> Put writing involves substantial risk and is suitable only for experienced 
          investors with adequate risk tolerance. Cash-secured puts require significant capital, while naked puts 
          involve leverage and unlimited risk. Assignment can occur at any time, potentially requiring immediate 
          stock purchase. Naked put writing is particularly risky and can result in margin calls and forced 
          liquidation. This strategy requires active management and thorough understanding of options mechanics. 
          Past performance does not guarantee future results. This information is for educational purposes only 
          and does not constitute investment advice. Please consult with a qualified financial advisor before 
          implementing any options strategy.
        </p>
      </div>
    </div>
  );
};