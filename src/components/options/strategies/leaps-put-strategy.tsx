import { StrategyDetailProps } from '../strategy-config';

export const LeapsPutStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          LEAPS Put Selling Strategy Details
        </h3>
        <p className="text-gray-700">
          A sophisticated institutional approach to volatility arbitrage and strategic stock acquisition through long-dated put options.
        </p>
      </div>

      {/* Strategy Intuition Section */}
      <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Strategy Intuition
        </h3>
        <div className="text-sm text-slate-700 space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">📋 What are LEAPS?</h4>
            <p className="text-blue-800 mb-2">
              <strong>LEAPS</strong> stands for <strong>Long-term Equity Anticipation Securities</strong>. These are options contracts with expiration dates 
              extending beyond one year, typically ranging from 12 to 39 months from the current date.
            </p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li><strong>Time Frame:</strong> 12+ months to expiration (vs. standard options: days to 12 months)</li>
              <li><strong>Availability:</strong> Only available on highly liquid, large-cap stocks and major ETFs</li>
              <li><strong>Expiration Cycle:</strong> Typically expire in January of each year</li>
              <li><strong>Greek Characteristics:</strong> High Vega, low Theta, moderate Delta and Gamma</li>
            </ul>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2">🎯 LEAPS Put Selling Definition</h4>
            <p className="text-purple-800">
              <strong>LEAPS Put Selling</strong> involves selling (writing) long-dated put options to collect premium income while potentially 
              acquiring quality stocks at predetermined prices. Unlike short-term put selling focused on income generation, 
              LEAPS put selling is primarily a <strong>volatility arbitrage</strong> and <strong>strategic acquisition</strong> strategy.
            </p>
          </div>
          
          <p>
            The fundamental difference from regular put selling: <strong>Vega dominates Theta</strong> in long-dated options. 
            You're not primarily collecting time decay (which is minimal for the first 12-18 months) - you're betting on 
            <strong>volatility compression</strong> and positioning for potential stock acquisition at attractive prices.
          </p>
          
          <p>
            This strategy transforms you from a premium collector into a <strong>volatility trader</strong> and <strong>patient capital allocator</strong>. 
            The goal isn't quick income but rather exploiting volatility inefficiencies while maintaining optionality for strategic stock purchases.
          </p>
          
          <div className="bg-green-100 p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-2">💡 Institutional Perspective</h4>
            <p className="text-green-800">
              <strong>Warren Buffett's Approach:</strong> Berkshire Hathaway has famously used this strategy to acquire positions in quality companies, 
              effectively getting paid to wait for attractive entry prices. When Buffett sells puts on Coca-Cola or Apple, he's not seeking income - 
              he's positioning for strategic acquisition while collecting volatility premium.
            </p>
          </div>
          
          <div className="bg-amber-100 p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">⚠️ Key Distinction</h4>
            <p className="text-amber-800">
              <strong>Retail vs. Institutional Mindset:</strong> Retail traders often view LEAPS put selling as "enhanced income generation," 
              leading to poor position sizing and risk management. Institutions understand it's primarily a <strong>volatility trade</strong> 
              with significant mark-to-market risk that requires substantial capital and patience.
            </p>
          </div>
        </div>
      </div>

      {/* Greek Profile Analysis */}
      <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Greek Profile Analysis
        </h3>
        <div className="text-sm text-indigo-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-800 mb-2">Vega (Volatility Risk)</h4>
              <p>
                <strong>Dominant Greek</strong> - Long-dated options have massive Vega exposure. 
                A 1% change in implied volatility can impact position value by 10-20%.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-800 mb-2">Theta (Time Decay)</h4>
              <p>
                <strong>Minimal Impact</strong> - Time decay is slow for LEAPS. 
                Don't expect meaningful theta collection until final 3-6 months.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-800 mb-2">Delta (Directional Risk)</h4>
              <p>
                <strong>Moderate Exposure</strong> - Typically 20-40 delta, providing 
                significant but manageable directional exposure.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-100">
              <h4 className="font-semibold text-indigo-800 mb-2">Gamma (Delta Sensitivity)</h4>
              <p>
                <strong>Low but Persistent</strong> - Gamma remains relatively stable 
                throughout the option's life, unlike short-term options.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          Implementation Framework
        </h3>
        <div className="text-sm text-green-700 space-y-4">
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2">1. Stock Selection Criteria</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>High-quality companies with strong fundamentals</li>
                <li>Stocks you'd be comfortable owning long-term</li>
                <li>Sufficient liquidity in LEAPS options (open interest &gt; 100)</li>
                <li>Historical volatility patterns that support mean reversion</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2">2. Strike Selection Strategy</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Target 15-25 delta puts (20-30% out-of-the-money)</li>
                <li>Strike price should represent attractive acquisition level</li>
                <li>Consider technical support levels and valuation metrics</li>
                <li>Avoid strikes too close to current price (high assignment risk)</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2">3. Expiration Selection</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>12-24 months to expiration for optimal Vega/Theta balance</li>
                <li>Avoid options with less than 9 months (Vega decay accelerates)</li>
                <li>Consider earnings cycles and known catalysts</li>
                <li>January expirations often have better liquidity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Applications */}
      <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          Institutional Applications
        </h3>
        <div className="text-sm text-blue-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">Strategic Acquisition</h4>
              <p>
                Use LEAPS puts to establish positions in quality companies at predetermined prices, 
                getting paid to wait for attractive entry points.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">Volatility Arbitrage</h4>
              <p>
                Exploit periods of elevated implied volatility by selling when IV is high 
                and benefiting from volatility mean reversion.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">Dividend Arbitrage</h4>
              <p>
                Position as counterparty to dividend arbitrage strategies, 
                collecting premium from sophisticated dividend capture trades.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">Portfolio Hedging</h4>
              <p>
                Use as a hedge against concentrated positions or as part of 
                a broader volatility management strategy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Management */}
      <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Risk Management & Retail Traps
        </h3>
        <div className="text-sm text-red-700 space-y-4">
          <div className="bg-red-100 p-3 rounded-lg border-l-4 border-red-500 mb-4">
            <p className="font-semibold text-red-800">
              Warning: LEAPS put selling is NOT a "set and forget" income strategy. 
              The Vega exposure creates significant mark-to-market volatility.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2">The Vega Time Bomb</h4>
              <p>
                As volatility spikes, unrealized losses can be massive (50-100% of premium received). 
                Many retail traders panic and close at the worst possible time.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2">Capital Inefficiency</h4>
              <p>
                Requires substantial buying power (20-30% of strike value). 
                Capital is tied up for extended periods with uncertain returns.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2">Liquidity Challenges</h4>
              <p>
                LEAPS often have wide bid-ask spreads and limited liquidity. 
                Early exit can be costly and difficult to execute.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2">Assignment Risk</h4>
              <p>
                Early assignment risk increases near ex-dividend dates and during market stress. 
                Must be prepared for immediate stock ownership.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">✅</span>
          Best Practices
        </h3>
        <div className="text-sm text-purple-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-2">Position Sizing</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Never risk more than 5-10% of portfolio on single position</li>
                <li>Account for potential assignment and stock ownership</li>
                <li>Maintain adequate cash reserves for margin requirements</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-2">Volatility Timing</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Sell when IV rank is above 50th percentile</li>
                <li>Avoid selling during low volatility periods</li>
                <li>Monitor VIX and sector-specific volatility indicators</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-2">Exit Strategies</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Close at 25-50% of maximum profit</li>
                <li>Roll down and out when possible</li>
                <li>Accept assignment if fundamentals remain strong</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-2">Monitoring Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Daily P&L monitoring due to Vega sensitivity</li>
                <li>Track implied volatility changes</li>
                <li>Monitor earnings announcements and catalysts</li>
              </ul>
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
        <div className="text-sm text-yellow-700 space-y-4">
          <div className="bg-white p-3 rounded-lg border border-yellow-100">
            <h4 className="font-semibold text-yellow-800 mb-2">Realistic Returns</h4>
            <p>
              Annualized returns of 8-15% are realistic for skilled practitioners, but with significant volatility. 
              Many positions will show large unrealized losses before eventual profitability.
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-yellow-100">
            <h4 className="font-semibold text-yellow-800 mb-2">Win Rate Expectations</h4>
            <p>
              High win rate (70-80%) but with occasional large losses. The strategy requires patience 
              and strong conviction in underlying stock selection.
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-yellow-100">
            <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements</h4>
            <p>
              Minimum $50,000-$100,000 to properly diversify across multiple positions. 
              Smaller accounts should focus on shorter-term strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Resources */}
      <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
        <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📖</span>
          Educational Resources
        </h3>
        <div className="text-sm text-teal-700 space-y-3">
          <div className="bg-white p-3 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">Recommended Reading</h4>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>
                <a href="https://www.berkshirehathaway.com/letters/letters.html" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-teal-600 hover:text-teal-800 underline">
                  Berkshire Hathaway Annual Letters
                </a> - Warren Buffett's approach to put selling
              </li>
              <li>
                <a href="https://www.cboe.com/education/tools-and-calculators/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-teal-600 hover:text-teal-800 underline">
                  CBOE Options Calculator
                </a> - For analyzing Greeks and payoffs
              </li>
              <li>
                <a href="https://www.ivolatility.com/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-teal-600 hover:text-teal-800 underline">
                  IVolatility.com
                </a> - Volatility analysis and historical data
              </li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">Key Concepts to Master</h4>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Implied volatility rank and percentile analysis</li>
              <li>Greek risk management and hedging techniques</li>
              <li>Dividend arbitrage and ex-dividend date effects</li>
              <li>Early assignment probabilities and management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
        >
          ← Back to Strategy Overview
        </button>
      </div>
    </div>
  );
};
