import { StrategyDetailProps } from '../strategy-config';

export const CollarStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          Strategy Details
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
              A <strong>collar strategy</strong> is a three-legged options position that combines:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-blue-800">
              <li><strong>Long Stock Position:</strong> Own 100 shares of the underlying asset</li>
              <li><strong>Long Protective Put:</strong> Buy an out-of-the-money put option (downside protection)</li>
              <li><strong>Short Covered Call:</strong> Sell an out-of-the-money call option (income generation)</li>
            </ul>
            <p className="mt-2 text-blue-800">
              This creates a "collar" around your stock position with <strong>defined maximum loss</strong> (put strike) 
              and <strong>defined maximum profit</strong> (call strike).
            </p>
          </div>
          
          <p>
            The collar strategy is fundamentally a <strong>defensive position</strong> designed for investors who want to 
            protect existing gains in a stock position while maintaining some upside potential. It's particularly effective 
            when you're bullish long-term but concerned about short-term volatility or market corrections.
          </p>
          
          <p>
            Think of it as <strong>portfolio insurance with a financing mechanism</strong>. The put option acts as insurance 
            against downside moves below a certain level, while the call option generates premium income to help offset the 
            cost of that insurance. In many cases, you can create a "zero-cost collar" where the call premium received 
            approximately equals the put premium paid.
          </p>
          
          <p>
            The strategy is particularly popular among <strong>institutional investors, corporate executives, and high-net-worth 
            individuals</strong> who have concentrated stock positions and want to protect against downside risk without selling 
            their shares (which might trigger significant tax consequences or violate insider trading restrictions).
          </p>
          
          <div className="bg-green-100 p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">💡 Key Insight</h4>
            <p className="text-green-800">
              The collar transforms an unlimited risk/unlimited reward stock position into a <strong>defined risk/defined reward</strong> 
              position. You sacrifice unlimited upside potential in exchange for downside protection, creating a more predictable 
              risk-return profile.
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          Implementation Framework
        </h3>
        <div className="text-sm text-indigo-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Step 1: Position Assessment</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Own 100 shares of the underlying stock (or multiples of 100)</li>
              <li>Determine your maximum acceptable loss (sets put strike)</li>
              <li>Determine your target exit price (sets call strike)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Step 2: Option Selection</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Buy Put:</strong> Out-of-the-money put at your maximum loss level</li>
              <li><strong>Sell Call:</strong> Out-of-the-money call at your target profit level</li>
              <li>Choose expiration dates (typically 30-90 days for active management)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Step 3: Execution</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Execute as a single trade or leg into the position</li>
              <li>Monitor net premium (debit or credit)</li>
              <li>Consider volatility environment when timing entry</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">✅</span>
          Best Practices
        </h3>
        <div className="text-sm text-green-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Strike Selection</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Put strike: 5-15% below current stock price for meaningful protection</li>
              <li>Call strike: 5-15% above current stock price for reasonable upside</li>
              <li>Consider volatility skew when selecting strikes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Timing Considerations</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Initiate when implied volatility is elevated (cheaper puts, expensive calls)</li>
              <li>Avoid earnings announcements unless specifically hedging for them</li>
              <li>Consider dividend dates for early assignment risk on calls</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Position Management</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Roll positions before expiration to maintain protection</li>
              <li>Consider closing profitable positions at 25-50% of maximum profit</li>
              <li>Monitor for early assignment risk on short calls</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Market Conditions */}
      <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          Optimal Market Conditions
        </h3>
        <div className="text-sm text-blue-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Ideal Scenarios</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>High Market Valuations:</strong> When indexes are at or near all-time highs</li>
              <li><strong>Elevated Volatility:</strong> When put options are expensive but call premiums help offset costs</li>
              <li><strong>Uncertain Economic Environment:</strong> During periods of geopolitical tension or economic uncertainty</li>
              <li><strong>Concentrated Positions:</strong> When you have a large, low-cost-basis position you don't want to sell</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Avoid When</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Expecting strong bullish momentum (upside is capped)</li>
              <li>Volatility is extremely low (puts are cheap but calls are also cheap)</li>
              <li>In strongly trending markets where you want full participation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Management */}
      <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Risk Management
        </h3>
        <div className="text-sm text-red-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Key Risks</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Opportunity Cost:</strong> Upside is capped at the call strike price</li>
              <li><strong>Early Assignment:</strong> Short calls may be assigned before expiration</li>
              <li><strong>Tax Implications:</strong> May affect holding period and create straddle rules</li>
              <li><strong>Whipsaw Risk:</strong> Sideways markets can erode premium over time</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Risk Mitigation</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Consult tax advisor before implementing in taxable accounts</li>
              <li>Monitor dividend dates for early assignment risk</li>
              <li>Have a plan for rolling or closing positions</li>
              <li>Consider position sizing relative to overall portfolio</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Applications */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Advanced Applications
        </h3>
        <div className="text-sm text-purple-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Volatility Skew Exploitation</h4>
            <p>
              Due to volatility skew, out-of-the-money puts typically trade at higher implied volatility than 
              equidistant calls. This creates opportunities to structure collars that are naturally credit-generating 
              while still providing meaningful protection.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Rolling Strategies</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Rolling Up:</strong> If stock rallies, roll entire collar to higher strikes</li>
              <li><strong>Rolling Out:</strong> Extend expiration dates to maintain protection</li>
              <li><strong>Legging Strategies:</strong> Advanced technique of entering legs at different times</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Portfolio Integration</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Use on concentrated positions while maintaining diversified core</li>
              <li>Implement during portfolio rebalancing periods</li>
              <li>Coordinate with overall portfolio hedging strategy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Educational Resources */}
      <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
        <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📖</span>
          Educational Resources
        </h3>
        <div className="text-sm text-teal-700 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Further Reading</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="https://www.investopedia.com/terms/c/collar.asp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Investopedia: Collar Definition</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tools & Calculators</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="https://www.optionsprofitcalculator.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Options Profit Calculator</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <p className="text-xs text-gray-600">
          <strong>Risk Disclosure:</strong> Options trading involves significant risk and is not suitable for all investors. 
          The collar strategy, while defensive, still carries substantial risk including the risk of loss of the entire 
          investment. Past performance does not guarantee future results. This information is for educational purposes 
          only and does not constitute investment advice. Please consult with a qualified financial advisor before 
          implementing any options strategy.
        </p>
      </div>
    </div>
  );
};