import { StrategyDetailProps } from '../strategy-config';

export const CoveredCallStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📈</span>
          Covered Call Writing Strategy Details
        </h3>
      </div>

      {/* Strategy Intuition Section */}
      <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Strategy Intuition
        </h3>
        <div className="text-sm text-slate-700 space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">📋 Definition</h4>
            <p className="text-blue-800">
              A <strong>covered call</strong> is a conservative income strategy that involves:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-blue-800">
              <li><strong>Own 100 Shares:</strong> Hold the underlying stock as collateral</li>
              <li><strong>Sell Call Option:</strong> Sell a call option against your stock position</li>
              <li><strong>Collect Premium:</strong> Receive income upfront from the option sale</li>
              <li><strong>Limited Upside:</strong> Cap your profit potential at the strike price</li>
            </ul>
            <p className="mt-2 text-blue-800">
              This creates an <strong>income-enhanced stock position</strong> with <strong>defined upside limitation</strong> but maintains most of the stock's downside risk.
            </p>
          </div>
          
          <p>
            Covered call writing is often called the <strong>"rent collection" strategy</strong> of options trading. 
            Just as a landlord collects rent while maintaining ownership of property, covered call writers collect 
            premium income while maintaining stock ownership (unless assigned).
          </p>
          
          <p>
            Think of it as <strong>selling the upside potential of your stock</strong> in exchange for immediate income. 
            You're essentially saying: "I'm willing to sell my shares at this price (strike) in exchange for this 
            premium payment right now." This makes it ideal for stocks you believe will trade sideways or rise modestly.
          </p>
          
          <p>
            This strategy is particularly popular among <strong>income-focused investors and retirees</strong> 
            because it can generate 1-3% monthly returns on stock positions while maintaining dividend income. 
            It's also the second leg of the famous "Wheel Strategy" after being assigned from cash-secured puts.
          </p>
          
          <div className="bg-green-100 p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">💡 Key Insight</h4>
            <p className="text-green-800">
              Covered calls transform stock ownership from a <strong>pure capital appreciation play</strong> into a 
              <strong>hybrid income and appreciation strategy</strong>. This is particularly valuable in sideways 
              markets where stock appreciation is limited but option premiums remain attractive.
            </p>
          </div>
        </div>
      </div>

      {/* Covered Call vs Cash-Secured Put Comparison */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          Covered Call vs Cash-Secured Put: Theoretical Twins
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
              This fundamental equation proves that <strong>covered calls and cash-secured puts are synthetically equivalent</strong>. 
              A covered call (S - C) has the same risk/reward profile as a cash-secured put (PV(K) - P) when using identical strikes and expirations.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-purple-100 border-b border-purple-200">
                  <th className="p-3 text-sm font-bold text-purple-600">Aspect</th>
                  <th className="p-3 text-sm font-bold text-blue-600">Covered Call</th>
                  <th className="p-3 text-sm font-bold text-emerald-600">Cash-Secured Put</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                <tr>
                  <td className="p-3 font-medium">Starting Position</td>
                  <td className="p-3 font-semibold text-blue-600">Own stock + Sell call</td>
                  <td className="p-3">Hold cash + Sell put</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Capital Required</td>
                  <td className="p-3 text-amber-600">High (stock purchase)</td>
                  <td className="p-3 font-semibold text-emerald-600">Lower (cash collateral)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Assignment Result</td>
                  <td className="p-3">Stock → Cash</td>
                  <td className="p-3">Cash → Stock</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Dividend Treatment</td>
                  <td className="p-3 font-semibold text-blue-600">Direct receipt</td>
                  <td className="p-3 text-rose-600">Priced into premium</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Tax Implications</td>
                  <td className="p-3 text-amber-600">Taxable sale on assignment</td>
                  <td className="p-3 font-semibold text-emerald-600">Establishes cost basis</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Psychological Frame</td>
                  <td className="p-3">"Enhancing stock income"</td>
                  <td className="p-3">"Selling insurance"</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🎯 Strategic Choice Factors</h4>
            <p className="text-purple-800">
              While mathematically equivalent, choose <strong>covered calls</strong> when you already own stock and want income enhancement. 
              Choose <strong>cash-secured puts</strong> when you want to acquire stock at a discount or prefer capital efficiency. 
              Many traders use both as part of "The Wheel" strategy.
            </p>
          </div>
        </div>
      </div>

      {/* The Wheel Strategy Connection */}
      <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎡</span>
          The Wheel Strategy: Covered Calls in Action
        </h3>
        <div className="text-sm text-green-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-green-900 mb-2">Sell Cash-Secured Puts</h4>
              <p className="text-xs text-green-700">Generate income while waiting for stock assignment</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-semibold text-green-900 mb-2">Get Assigned Stock</h4>
              <p className="text-xs text-green-700">Acquire shares at your chosen strike price</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-emerald-600">3</span>
              </div>
              <h4 className="font-semibold text-green-900 mb-2">Sell Covered Calls</h4>
              <p className="text-xs text-green-700">Generate income on your stock position</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">🔄 The Continuous Cycle</h4>
            <p className="text-green-800">
              Covered calls are the <strong>second phase of the Wheel Strategy</strong>. After being assigned stock from 
              cash-secured puts, you sell covered calls to generate additional income. If called away, you return to 
              selling puts, creating a continuous income-generating cycle with <strong>triple income sources</strong>: 
              put premiums, call premiums, and dividends.
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
              <h4 className="font-semibold mb-2 text-blue-700">Delta (Δ) + Bullish (Reduced)</h4>
              <p>Positive delta from stock ownership, reduced by short call. Net delta decreases as stock approaches strike price.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold mb-2 text-amber-700">Gamma (Γ) - Assignment Risk</h4>
              <p>Negative gamma from short call. Risk increases as stock approaches strike, potentially leading to assignment.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-700">Theta (θ) + Income Generation</h4>
              <p>Positive theta from short call. Time decay works in your favor, generating consistent income over time.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-violet-200">
              <h4 className="font-semibold mb-2 text-violet-700">Vega (ν) - Short Volatility</h4>
              <p>Negative vega from short call. Benefits when implied volatility decreases after selling the call.</p>
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
              <h4 className="font-semibold mb-2 text-amber-800">At-The-Money (ATM)</h4>
              <p>Highest premium collection but immediate upside limitation. Best for neutral outlook with income focus.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 text-blue-800">Out-of-The-Money (OTM)</h4>
              <p>Lower premium but allows for stock appreciation. Target 5-10% above current price for balanced approach.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 text-green-800">Delta-Based Selection</h4>
              <p>Sell 20-30 delta calls for optimal balance of premium income and assignment probability (70-80% success rate).</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">📊 Optimal Expiration Timing</h4>
            <p className="text-amber-800 mb-2">
              <strong>30-45 Days to Expiration:</strong> Sweet spot for theta decay acceleration<br/>
              <strong>Weekly Options:</strong> Higher annualized returns but more active management<br/>
              <strong>Monthly Options:</strong> More passive approach with lower transaction costs
            </p>
            <p className="text-xs text-amber-600">
              Target 1-3% monthly premium collection relative to stock value for sustainable income generation
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
                <li><strong>Own 100+ Shares:</strong> Must own underlying stock in round lots</li>
                <li><strong>IV Rank &gt; 25%:</strong> Ensure adequate premium collection</li>
                <li><strong>Neutral to Bullish:</strong> Comfortable with potential assignment</li>
                <li><strong>Liquid Options:</strong> Focus on high-volume stocks with tight spreads</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-800">Position Management</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Portfolio Allocation:</strong> Cover 25-50% of stock holdings</li>
                <li><strong>Diversification:</strong> Spread across multiple positions</li>
                <li><strong>Rolling Strategy:</strong> Roll up and out when profitable</li>
                <li><strong>Assignment Planning:</strong> Have exit strategy ready</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">📋 Step-by-Step Execution</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
              <li>Identify stock positions suitable for covered calls</li>
              <li>Check implied volatility rank (&gt;25% preferred)</li>
              <li>Select strike price 5-10% above current stock price</li>
              <li>Choose expiration 30-45 days out</li>
              <li>Sell call option and collect premium</li>
              <li>Monitor position and manage at 50% profit or 21 DTE</li>
              <li>If assigned, consider selling puts to re-enter (Wheel)</li>
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
              <h4 className="font-semibold mb-2 text-red-800">Upside Risk Management</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Profit Target:</strong> Close at 50% of maximum profit</li>
                <li><strong>Rolling Up:</strong> Roll to higher strikes when profitable</li>
                <li><strong>Time Stop:</strong> Close at 21 DTE to avoid gamma risk</li>
                <li><strong>Assignment Acceptance:</strong> Be comfortable selling at strike</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-800">Downside Protection</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Stock Risk:</strong> Covered calls don't protect against stock decline</li>
                <li><strong>Stop Losses:</strong> Consider protective puts for large positions</li>
                <li><strong>Diversification:</strong> Don't concentrate in single stock/sector</li>
                <li><strong>Quality Focus:</strong> Only write calls on stocks you want to own</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">🎯 Assignment Scenarios</h4>
            <p className="text-red-800 mb-2">
              <strong>Early Assignment:</strong> Possible before ex-dividend dates, especially for ITM calls<br/>
              <strong>Expiration Assignment:</strong> Automatic if call expires ITM by $0.01 or more<br/>
              <strong>Tax Implications:</strong> Assignment creates taxable sale event - plan accordingly
            </p>
            <p className="text-xs text-red-600">
              Example: Own stock at $95, sell $100 call for $2. If assigned, total return = $7 ($5 appreciation + $2 premium)
            </p>
          </div>
        </div>
      </div>

      {/* Income Enhancement Strategies */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">💰</span>
          Income Enhancement Strategies
        </h3>
        <div className="text-sm text-purple-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold mb-2 text-indigo-800">Laddered Expirations</h4>
              <p>Stagger call expirations across different months to smooth income and reduce timing risk.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-2 text-emerald-800">Dividend Capture</h4>
              <p>Time call sales around ex-dividend dates to capture both premium and dividend income.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200">
              <h4 className="font-semibold mb-2 text-rose-800">Volatility Timing</h4>
              <p>Sell calls when IV is elevated (earnings, events) to maximize premium collection.</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🎪 Advanced: "Repair Strategy"</h4>
            <p className="text-purple-800">
              If your stock declines significantly, consider the "repair strategy": buy a call at current price and 
              sell two calls at higher strikes. This can help recover losses faster than holding stock alone, 
              though it adds complexity and additional risk.
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
              <div className="text-2xl mb-2">💵</div>
              <h4 className="font-semibold text-sm mb-2">Monthly Income</h4>
              <p className="text-xs">Typically 1-3% of stock value per month in premium</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">📈</div>
              <h4 className="font-semibold text-sm mb-2">Enhanced Returns</h4>
              <p className="text-xs">Can add 5-15% annually to stock returns in sideways markets</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-sm mb-2">Success Rate</h4>
              <p className="text-xs">70-85% of calls expire worthless when properly managed</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-teal-200">
            <h4 className="font-bold text-teal-900 mb-2">📈 Income Comparison</h4>
            <p className="text-teal-800 mb-2">
              <strong>Dividend Yield:</strong> Typical S&P 500 stock yields 1-3% annually<br/>
              <strong>Covered Call Premium:</strong> Can generate 12-36% annually in premium income<br/>
              <strong>Combined Yield:</strong> Total return potential of 15-40% in optimal conditions<br/>
              <strong>Opportunity Cost:</strong> Miss gains above strike price (typically 10-20% annually)
            </p>
            <p className="text-xs text-teal-600">
              Performance varies significantly based on market conditions, volatility levels, and stock selection.
            </p>
          </div>
        </div>
      </div>

      {/* Tax Considerations */}
      <div className="bg-yellow-50 p-4 md:p-6 rounded-xl shadow-lg border border-yellow-200">
        <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          Tax Considerations
        </h3>
        <div className="text-sm text-yellow-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold mb-2 text-yellow-800">Premium Income</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Taxed as short-term capital gains</li>
                <li>Recognized when option expires or is closed</li>
                <li>Cannot be offset against stock losses until realized</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold mb-2 text-yellow-800">Assignment Events</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Creates taxable sale of underlying stock</li>
                <li>Strike price + premium = total proceeds</li>
                <li>May trigger wash sale rules if repurchasing</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <h4 className="font-bold text-yellow-900 mb-2">🏦 Tax-Advantaged Accounts</h4>
            <p className="text-yellow-800">
              Covered calls work exceptionally well in IRAs and 401(k)s where tax implications are deferred. 
              This allows for more aggressive premium collection and frequent rolling without immediate tax consequences. 
              However, check with your broker about options approval levels in retirement accounts.
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
              <li><a href="/articles/covered-calls-vs-cash-secured-puts" className="text-blue-600 hover:underline">Covered Calls vs Cash-Secured Puts: Complete Comparison</a></li>
              <li><a href="/articles/wheel-strategy" className="text-blue-600 hover:underline">The Wheel Strategy: Triple Income Generation</a></li>
              <li><a href="https://www.cboe.com/education/resource-library/concepts/covered-call" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CBOE: Covered Call Strategy Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tools & Analysis</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="/option/viewer" className="text-blue-600 hover:underline">Options Viewer - Analyze Covered Calls</a></li>
              <li><a href="https://www.optionsprofitcalculator.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Options Profit Calculator</a></li>
              <li><a href="https://www.barchart.com/stocks/quotes/$SPX/options" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Barchart: Options Chain Analysis</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <p className="text-xs text-gray-600">
          <strong>Risk Disclosure:</strong> Covered call writing involves substantial risk and is suitable only for 
          investors who own the underlying stock. While premium income is generated, upside potential is limited and 
          downside risk remains substantial. Assignment can occur at any time, potentially at unfavorable tax timing. 
          This strategy requires active management and understanding of options mechanics. Past performance does not 
          guarantee future results. This information is for educational purposes only and does not constitute investment 
          advice. Please consult with a qualified financial advisor before implementing any options strategy.
        </p>
      </div>
    </div>
  );
};