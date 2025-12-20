import { StrategyDetailProps } from './types';

export const WheelStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="content-card p-4 md:p-6 mt-6 md:mt-8 animate-fade-in">
      <button 
        onClick={onBack} 
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
        aria-label="Back to all strategies"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to all strategies</span>
      </button>

      <h2 className="text-2xl md:text-3xl font-bold leading-tight">{strategy.name}</h2>
      <p className="mt-2 text-sm md:text-base text-gray-700 leading-relaxed">{strategy.description}</p>
      
      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-center">
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm font-medium text-gray-500">Risk / Reward</p>
          <p className="text-sm md:text-lg font-semibold leading-tight">{strategy.profile}</p>
        </div>
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm font-medium text-gray-500">Volatility View</p>
          <p className="text-sm md:text-lg font-semibold leading-tight">{strategy.volatility}</p>
        </div>
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm font-medium text-gray-500">Time Decay View</p>
          <p className="text-sm md:text-lg font-semibold leading-tight">{strategy.time}</p>
        </div>
      </div>

      {/* Strategy Intuition */}
      <div className="mt-6 md:mt-8 space-y-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-3">🧠 Strategy Intuition</h3>
          <div className="text-sm text-slate-700 space-y-4">
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Core Concept:</h4>
              <p className="mb-2">The wheel strategy leverages <strong>time decay (theta)</strong> and <strong>implied volatility contraction</strong> to generate consistent income. You're essentially acting as an "insurance company" - collecting premiums from other traders who want to hedge their positions.</p>
              <p>The strategy works because <strong>most options expire worthless</strong> (approximately 80-90%), allowing you to keep the premium collected while managing the minority of positions that move against you.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why It Works:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Time decay advantage:</strong> Options lose value daily, benefiting sellers</li>
                <li>• <strong>Volatility premium harvesting:</strong> IV often overstates actual movement</li>
                <li>• <strong>Probability mathematics:</strong> Selling 16-30 delta options gives ~70-84% win rate</li>
                <li>• <strong>Mean reversion tendency:</strong> Stocks often return to fair value over time</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Triple Income Mechanism:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-green-100 p-2 rounded">
                  <p className="font-medium text-green-800">1. Put Premiums</p>
                  <p className="text-xs text-green-700">Collect income while waiting for good entry prices</p>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800">2. Call Premiums</p>
                  <p className="text-xs text-blue-700">Generate income from owned shares while waiting to sell</p>
                </div>
                <div className="bg-purple-100 p-2 rounded">
                  <p className="font-medium text-purple-800">3. Dividends</p>
                  <p className="text-xs text-purple-700">Bonus income from quality dividend-paying stocks</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Put-Call Parity & Mathematical Equivalence:</h4>
              <div className="mb-3">
                <p className="mb-2">The wheel strategy leverages <strong>put-call parity</strong>: <code className="bg-slate-200 px-1 rounded">C + X = P + S</code></p>
                <p className="mb-2">This means <strong>selling a covered call is mathematically equivalent to selling a cash-secured put</strong> at the same strike and expiration. The wheel combines both approaches:</p>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>• <strong>Phase 1 (Put):</strong> Collect premium, potentially acquire shares at desired price</li>
                  <li>• <strong>Phase 2 (Call):</strong> Collect premium, potentially sell shares at desired price</li>
                  <li>• <strong>Continuous cycle:</strong> Seamlessly transitions between equivalent positions</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="bg-green-100 p-3 rounded">
                  <h5 className="font-medium text-green-800 mb-1">✅ Pros of Combined Approach:</h5>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• <strong>Flexible positioning:</strong> Always optimal premium collection</li>
                    <li>• <strong>Natural hedging:</strong> Losses in one phase offset by gains in another</li>
                    <li>• <strong>Consistent income:</strong> Premium collection in both market directions</li>
                    <li>• <strong>Assignment management:</strong> Structured approach to entries/exits</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <h5 className="font-medium text-red-800 mb-1">❌ Cons of Combined Approach:</h5>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• <strong>Capital intensive:</strong> Requires large cash reserves</li>
                    <li>• <strong>Opportunity cost:</strong> Capital tied up in assignments</li>
                    <li>• <strong>Sequence risk:</strong> Poor timing can amplify losses</li>
                    <li>• <strong>Complexity:</strong> Requires active management and discipline</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Called the "Wheel" Strategy:</h4>
              <p className="mb-2">The name "wheel" comes from the <strong>circular, repetitive nature</strong> of the strategy:</p>
              <div className="bg-slate-100 p-3 rounded-lg mt-2">
                <p className="text-center font-medium text-slate-800">💰 Sell Put → 📈 Get Assigned → 📞 Sell Call → 🎯 Get Called Away → 🔄 Repeat</p>
              </div>
              <p className="mt-2 text-xs">Like a wheel spinning, the strategy cycles continuously between these phases, generating income at each stage while managing risk through systematic position transitions.</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">When to Transition from Put to Call Writing:</h4>
              <div className="space-y-2">
                <div className="bg-orange-100 p-2 rounded">
                  <p className="font-medium text-orange-800 text-sm">🔄 Automatic Transition Triggers:</p>
                  <ul className="text-xs text-orange-700 space-y-1 ml-4 mt-1">
                    <li>• <strong>Put assignment:</strong> When your put expires ITM, you automatically own shares</li>
                    <li>• <strong>Early assignment:</strong> Rare but possible, especially near ex-dividend dates</li>
                    <li>• <strong>Voluntary assignment:</strong> You can choose to buy shares if put is profitable</li>
                  </ul>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800 text-sm">⚡ Optimal Timing Considerations:</p>
                  <ul className="text-xs text-blue-700 space-y-1 ml-4 mt-1">
                    <li>• <strong>Immediately after assignment:</strong> Start selling calls the next trading day</li>
                    <li>• <strong>Strike selection:</strong> Choose call strike AT or ABOVE your cost basis</li>
                    <li>• <strong>Market conditions:</strong> Higher volatility = better call premiums</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Trading Procedure */}
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <h3 className="text-lg font-bold text-indigo-800 mb-3">📋 Step-by-Step Trading Procedure</h3>
          <div className="text-sm text-indigo-700 space-y-4">
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 1: Cash-Secured Put Phase</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Screen underliers:</strong> Select high-quality stocks/ETFs with good liquidity</li>
                <li><strong>Calculate position size:</strong> Determine appropriate capital allocation</li>
                <li><strong>Select strike:</strong> Choose appropriate delta put, typically OTM</li>
                <li><strong>Choose expiration:</strong> Select optimal time to expiration</li>
                <li><strong>Execute trade:</strong> Sell cash-secured put, collect premium</li>
              </ol>
            </div>
            
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 2: Managing the Put</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Monitor daily:</strong> Track P&L and delta changes</li>
                <li><strong>Profit taking:</strong> Close at predetermined profit targets</li>
                <li><strong>Rolling decision:</strong> If ATM, consider rolling out for net credit</li>
                <li><strong>Assignment preparation:</strong> Ensure sufficient cash if strike breached</li>
                <li><strong>Accept assignment:</strong> If put expires ITM, take delivery of shares</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 3: Covered Call Phase</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Calculate cost basis:</strong> Stock price - put premiums collected</li>
                <li><strong>Select call strike:</strong> AT or ABOVE cost basis (never below)</li>
                <li><strong>Choose expiration:</strong> Select optimal time to expiration</li>
                <li><strong>Execute trade:</strong> Sell covered call against owned shares</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 4: Managing the Call</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Monitor position:</strong> Track call's intrinsic value vs. time value</li>
                <li><strong>Profit taking:</strong> Close at predetermined profit targets</li>
                <li><strong>Rolling up/out:</strong> If profitable, roll to higher strike for credit</li>
                <li><strong>Assignment outcome:</strong> If called away, calculate total cycle profit</li>
                <li><strong>Cycle restart:</strong> Return to Phase 1 with new capital</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-bold text-green-800 mb-3">🎯 Best Practices</h3>
          <div className="text-sm text-green-700 space-y-3">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Option Selection:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Use <strong>16-30 delta options</strong> for optimal risk/reward balance</li>
                <li>• Target <strong>7-45 DTE</strong> (Days to Expiration) for best premium collection</li>
                <li>• Aim for <strong>0.5-2.0% monthly premium</strong> returns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Position Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Never sell calls below cost basis</strong> - guaranteed loss</li>
                <li>• <strong>Always collect net credit</strong> when rolling positions</li>
                <li>• Take profits at <strong>50% premium decay</strong> rather than holding to expiration</li>
                <li>• <strong>Roll at 21 DTE</strong> - avoid gamma risk near expiration</li>
                <li>• Roll ATM positions to avoid unwanted assignment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Risk Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Position size appropriately</strong> - never risk more than 5-10% per trade</li>
                <li>• Only wheel stocks you're <strong>comfortable owning long-term</strong></li>
                <li>• Maintain sufficient cash reserves for potential assignments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Market Conditions */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-3">📊 Suitable Market Conditions</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• <strong>Sideways to mildly bullish markets</strong> - wheel strategy thrives here</li>
            <li>• <strong>High implied volatility periods</strong> - generates better premium income</li>
            <li>• <strong>Stable trending markets</strong> - avoid during extreme volatility or crashes</li>
            <li>• Works best in <strong>bull markets or consolidation phases</strong></li>
          </ul>
        </div>

        {/* Recommended Underliers */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-lg font-bold text-purple-800 mb-3">🏆 Recommended Underliers</h3>
          <div className="text-sm text-purple-700 space-y-2">
            <p><strong>High-quality dividend stocks:</strong> AAPL, MSFT, GOOGL, AMZN, JNJ</p>
            <p><strong>Broad market ETFs:</strong> SPY, QQQ, IWM - provide diversification</p>
            <p><strong>Blue-chip stocks</strong> with strong fundamentals you'd want to own long-term</p>
            <p><strong>Avoid:</strong> Meme stocks, penny stocks, low-volume options, earnings-volatile stocks</p>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="text-lg font-bold text-red-800 mb-3">⚠️ Common Pitfalls</h3>
          <div className="text-sm text-red-700 space-y-3">
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Position Sizing Errors:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Overleveraging</strong> - risking too much capital per position</li>
                <li>• <strong>Insufficient cash reserves</strong> - not preparing for assignment</li>
                <li>• <strong>Portfolio concentration</strong> - wheeling too many similar stocks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Strike Selection Mistakes:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Chasing high premiums</strong> on risky, volatile stocks</li>
                <li>• <strong>Selling calls below cost basis</strong> - locking in guaranteed losses</li>
                <li>• <strong>Wrong delta selection</strong> - too high (&gt;30) or too low (&lt;16)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Management Failures:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Not rolling ATM positions</strong> - letting yourself get assigned unnecessarily</li>
                <li>• <strong>Holding to expiration</strong> - ignoring profit-taking rules</li>
                <li>• <strong>Rolling for net debit</strong> - paying to extend losing positions</li>
                <li>• <strong>Ignoring market conditions</strong> - running wheel during bear markets</li>
                <li>• <strong>Emotional trading</strong> - abandoning systematic approach during stress</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-bold text-yellow-800 mb-3">📈 Performance Metrics</h3>
          <div className="text-sm text-yellow-700 space-y-3">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Expected Returns:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>7-15% annually</strong> when executed properly (based on backtesting)</li>
                <li>• <strong>Higher returns in volatile markets</strong> due to elevated premium</li>
                <li>• <strong>Win rate:</strong> Approximately 70-84% based on delta selection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>High initial capital</strong> - requires cash to secure puts</li>
                <li>• <strong>Additional reserves</strong> - for potential stock assignments</li>
                <li>• <strong>Minimum $10,000+</strong> recommended for effective diversification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learn More Resources */}
        <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
          <h3 className="text-lg font-bold text-teal-800 mb-3">📚 Learn More Resources</h3>
          <div className="text-sm text-teal-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Educational Content:</h4>
              <div className="space-y-1 ml-4">
                <a href="https://www.tastylive.com/news-insights/how-to-convert-a-short-put-into-a-covered-call" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • tastylive: Converting Short Put to Covered Call
                </a>
                <a href="https://optionalpha.com/blog/wheel-strategy" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Option Alpha: Wheel Strategy Guide
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Community & Tools:</h4>
              <div className="space-y-1 ml-4">
                <a href="https://www.reddit.com/r/Optionswheel/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Reddit: r/Optionswheel Community
                </a>
                <a href="https://yieldcollector.com/calculators" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Yield Collector: Options Calculators & Tools
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
