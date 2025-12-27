import { StrategyDetailProps } from './types';

export const IronCondorStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-6">
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
              <p className="mb-2">The Iron Condor is a <strong>delta-neutral, non-directional strategy</strong> that profits from market stagnation and volatility contraction. You're essentially selling "insurance" to traders who expect large price movements, collecting premium when the market stays within your defined profit zone.</p>
              <p>The strategy combines two credit spreads: a <strong>bull put spread</strong> (below current price) and a <strong>bear call spread</strong> (above current price), creating a "profit tent" where you win if the stock stays between your short strikes.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why It Works:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Variance Risk Premium:</strong> Implied Volatility typically overstates actual movement (~83% of the time)</li>
                <li>• <strong>Time decay advantage:</strong> All four options decay in your favor</li>
                <li>• <strong>High probability of profit:</strong> 68-75% win rate when selling 16-20 delta options</li>
                <li>• <strong>Mean reversion tendency:</strong> Markets spend most time in consolidation, not trending</li>
                <li>• <strong>Structural edge:</strong> You're selling overpriced "fear premium" to hedgers</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The Four Legs Explained:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-green-100 p-3 rounded">
                  <p className="font-medium text-green-800">Bull Put Spread (Lower)</p>
                  <p className="text-xs text-green-700 mb-1">• Buy Long Put (Protection)</p>
                  <p className="text-xs text-green-700">• Sell Short Put (Income)</p>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-medium text-blue-800">Bear Call Spread (Upper)</p>
                  <p className="text-xs text-blue-700 mb-1">• Sell Short Call (Income)</p>
                  <p className="text-xs text-blue-700">• Buy Long Call (Protection)</p>
                </div>
              </div>
              <p className="text-xs mt-2">The short options generate income, while the long options provide defined risk protection.</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Mathematical Edge - IV vs HV:</h4>
              <div className="mb-3">
                <p className="mb-2">The core alpha comes from the <strong>Variance Risk Premium</strong>: the difference between what the market expects (IV) and what actually happens (HV).</p>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 text-center">"Implied Volatility generally overstates Actual Volatility"</p>
                  <p className="text-xs text-amber-700 text-center mt-1">SPX options overprice expected moves ~83% of the time</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Called "Iron Condor":</h4>
              <p className="mb-2">The name comes from the <strong>payoff diagram shape</strong>:</p>
              <div className="bg-slate-100 p-3 rounded-lg mt-2">
                <p className="text-center font-medium text-slate-800">📉 Loss Zone → 💰 Profit Zone → 📈 Loss Zone</p>
              </div>
              <p className="mt-2 text-xs">Like a condor's wings spread wide, the strategy has "wings" (long options) that provide protection, with the "body" (short options) generating income in the middle.</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Probability Mathematics:</h4>
              <div className="space-y-2">
                <div className="bg-emerald-100 p-2 rounded">
                  <p className="font-medium text-emerald-800 text-sm">🎯 High Probability Setup:</p>
                  <ul className="text-xs text-emerald-700 space-y-1 ml-4 mt-1">
                    <li>• <strong>16-20 Delta shorts:</strong> ~68-75% probability of profit</li>
                    <li>• <strong>Statistical edge:</strong> Selling 1 standard deviation moves</li>
                    <li>• <strong>Expected value positive:</strong> Small wins outweigh occasional large losses</li>
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
                <li><strong>Check IV Rank:</strong> Only trade when IV Rank &gt; 30 (ideally &gt; 50)</li>
                <li><strong>Select underlier:</strong> Choose liquid ETFs/stocks (SPY, QQQ, IWM)</li>
                <li><strong>Determine position size:</strong> Never risk more than 3-5% of account per trade</li>
                <li><strong>Choose expiration:</strong> Target 45 Days to Expiration (DTE)</li>
                <li><strong>Calculate wing width:</strong> Typically 1/10th of stock price (e.g., $10 for $100 stock)</li>
              </ol>
            </div>
            
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 2: Strike Selection & Execution</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Sell short put:</strong> 16-20 delta, out-of-the-money</li>
                <li><strong>Buy long put:</strong> Same expiration, lower strike (protection)</li>
                <li><strong>Sell short call:</strong> 16-20 delta, out-of-the-money</li>
                <li><strong>Buy long call:</strong> Same expiration, higher strike (protection)</li>
                <li><strong>Execute as single order:</strong> All four legs simultaneously for best fill</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 3: Position Monitoring</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Daily P&L check:</strong> Monitor mark-to-market and Greeks</li>
                <li><strong>Delta management:</strong> Position should stay near delta-neutral</li>
                <li><strong>Profit target:</strong> Close at 50% of maximum profit</li>
                <li><strong>Time management:</strong> Always close or roll at 21 DTE</li>
                <li><strong>Breach monitoring:</strong> Watch for price approaching short strikes</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 4: Defensive Management</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Untested side roll:</strong> If market moves one direction, roll opposite side UP</li>
                <li><strong>Collect additional credit:</strong> Rolling should always bring in net credit</li>
                <li><strong>Time roll:</strong> If breached at 21 DTE, roll entire position to next cycle</li>
                <li><strong>Inverted roll (advanced):</strong> In extreme moves, roll untested side beyond tested side</li>
                <li><strong>Take assignment if necessary:</strong> Rare, but manage according to plan</li>
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
                <p className="text-xs text-green-700 mt-1">Time decay accelerates non-linearly. Sweet spot is 45-21 DTE where you capture most decay while avoiding gamma risk.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800">Delta (Δ) - Stay Neutral</h4>
                <p className="text-xs text-blue-700 mt-1">Should start near zero. As market moves, delta shifts against you - this is why defensive rolling is crucial.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800">Vega (ν) - Volatility Enemy</h4>
                <p className="text-xs text-red-700 mt-1">Short volatility position. Benefits from "vol crush." Rising IV causes mark-to-market losses even if price doesn't move.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800">Gamma (Γ) - The Threat</h4>
                <p className="text-xs text-orange-700 mt-1">Explodes near expiration (0-7 DTE). Small moves cause massive delta shifts. This is why we exit at 21 DTE.</p>
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
                <li>• <strong>45 DTE standard:</strong> Optimal theta/gamma balance</li>
                <li>• <strong>IV Rank &gt; 30:</strong> Only sell expensive insurance</li>
                <li>• <strong>16-20 delta shorts:</strong> High probability, reasonable premium</li>
                <li>• <strong>Liquid underliers only:</strong> SPY, QQQ, IWM, major ETFs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Position Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50% profit target:</strong> Don't be greedy, take profits early</li>
                <li>• <strong>21 DTE exit rule:</strong> Avoid the gamma cliff at all costs</li>
                <li>• <strong>Roll for net credit only:</strong> Never pay to extend losing positions</li>
                <li>• <strong>Defensive rolling:</strong> Roll untested side when challenged</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Risk Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Position sizing:</strong> Never risk more than 3-5% per trade</li>
                <li>• <strong>Diversification:</strong> Multiple expirations, different underliers</li>
                <li>• <strong>Cash reserves:</strong> Keep 50% buying power available</li>
                <li>• <strong>Wing width optimization:</strong> Wider wings = higher POP, more capital</li>
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
                <li>• <strong>Sideways/consolidating markets:</strong> Iron Condor's sweet spot</li>
                <li>• <strong>High IV environments:</strong> Post-earnings, after volatility spikes</li>
                <li>• <strong>Low realized volatility:</strong> When actual moves are smaller than expected</li>
                <li>• <strong>Range-bound trading:</strong> Markets respecting support/resistance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Avoid During:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Strong trending markets:</strong> Directional momentum breaks condors</li>
                <li>• <strong>Low IV environments:</strong> Not enough premium to justify risk</li>
                <li>• <strong>Major events pending:</strong> FOMC, earnings, geopolitical uncertainty</li>
                <li>• <strong>Market crashes:</strong> Correlations go to 1, everything moves together</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Underliers */}
        <div className="bg-teal-50 p-4 md:p-6 rounded-xl shadow-lg border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            Recommended Underliers
          </h3>
          <div className="text-sm text-teal-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Tier 1 - Best Liquidity:</h4>
              <p><strong>SPY, QQQ, IWM:</strong> Tight spreads, high volume, European-style settlement</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Tier 2 - Good Options:</h4>
              <p><strong>GLD, TLT, EEM:</strong> Decent liquidity, different asset classes for diversification</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Individual Stocks (Advanced):</h4>
              <p><strong>AAPL, MSFT, GOOGL, AMZN:</strong> High volume, but watch dividend risk</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Avoid:</h4>
              <p><strong>Low volume options, meme stocks, penny stocks, biotech before FDA approvals</strong></p>
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
                <li>• <strong>Trading in low IV:</strong> Not enough premium to justify risk</li>
                <li>• <strong>Wrong delta selection:</strong> Too aggressive (&gt;30) or too conservative (&lt;16)</li>
                <li>• <strong>Poor timing:</strong> Entering right before major events</li>
                <li>• <strong>Illiquid underliers:</strong> Wide spreads destroy edge</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Management Failures:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Holding to expiration:</strong> Ignoring 21 DTE exit rule</li>
                <li>• <strong>Not taking profits:</strong> Greed destroys consistent returns</li>
                <li>• <strong>Rolling for debit:</strong> Paying to extend losing positions</li>
                <li>• <strong>Ignoring delta shifts:</strong> Not managing directional risk</li>
                <li>• <strong>Panic closing:</strong> Emotional decisions during drawdowns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Position Sizing Errors:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Overleveraging:</strong> Risking too much per trade</li>
                <li>• <strong>Concentration risk:</strong> Too many similar positions</li>
                <li>• <strong>Insufficient diversification:</strong> All same expiration cycle</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">The Silent Killer - Dividend Risk:</h4>
              <div className="bg-red-100 p-3 rounded mt-2">
                <p className="font-medium text-red-800 mb-1">Early Assignment Formula:</p>
                <p className="font-mono text-xs text-red-700">Call Extrinsic Value &lt; Dividend Amount</p>
                <p className="text-xs text-red-700 mt-1"><strong>Mitigation:</strong> Trade European-style indices (SPX, NDX) or close ITM calls before ex-div</p>
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
                <li>• <strong>Win rate:</strong> 68-75% when selling 16-20 delta</li>
                <li>• <strong>Annual returns:</strong> 15-25% in optimal conditions</li>
                <li>• <strong>Monthly targets:</strong> 2-4% return on capital at risk</li>
                <li>• <strong>Sharpe ratio:</strong> Often superior to buy-and-hold due to consistent income</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Minimum account:</strong> $25,000+ for effective diversification</li>
                <li>• <strong>Margin requirements:</strong> Typically 20-30% of wing width</li>
                <li>• <strong>Buying power usage:</strong> Keep 50% in reserve for opportunities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Risk Characteristics:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Maximum loss:</strong> Wing width minus credit received</li>
                <li>• <strong>Breakeven points:</strong> Short strikes ± net credit</li>
                <li>• <strong>Negative skew:</strong> Win often, lose big occasionally</li>
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
              <h4 className="font-semibold text-indigo-800 mb-2">Skew Awareness:</h4>
              <p className="mb-2">Markets crash faster than they rally. Puts trade at higher IV than calls.</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Asymmetric strikes:</strong> Put delta 16, Call delta 20</li>
                <li>• <strong>Skew trading:</strong> Favor put spreads in high skew environments</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Portfolio Laddering:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Stagger expirations:</strong> Weekly, monthly cycles</li>
                <li>• <strong>Different underliers:</strong> Reduce correlation risk</li>
                <li>• <strong>Size scaling:</strong> Larger positions in better setups</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 mb-2">Mechanical Rules:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>IV Rank filter:</strong> Only trade when &gt; 30th percentile</li>
                <li>• <strong>Profit targets:</strong> 50% max profit, no exceptions</li>
                <li>• <strong>Time stops:</strong> 21 DTE exit, regardless of P&L</li>
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
                <a href="/articles/iron-condor-quantitative-delta-neutral-premium-harvesting" 
                   className="text-blue-600 hover:underline block">
                   • Deep Research: Iron Condor Quantitative Analysis
                </a>
                <a href="https://www.tastylive.com/news-insights/iron-condor-options-strategy" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • tastylive: Iron Condor Strategy Guide
                </a>
                <a href="https://optionalpha.com/blog/iron-condor" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Option Alpha: Iron Condor Mechanics
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Research & Backtesting:</h4>
              <div className="space-y-1 ml-4">
                <a href="https://www.cboe.com/education/resources/concepts-and-strategies/iron-condor" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • CBOE: Iron Condor Education
                </a>
                <a href="https://www.reddit.com/r/thetagang/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Reddit: r/thetagang Community
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
                <a href="https://marketchameleon.com/Overview/SPY/IV/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Market Chameleon: IV Rank Data
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};