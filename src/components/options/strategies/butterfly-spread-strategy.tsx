import { StrategyDetailProps } from '../strategy-config';

export const ButterflySpreadStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
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
              <p className="mb-2">The Butterfly Spread is a <strong>precision neutral strategy</strong> that profits from minimal price movement and volatility contraction. It combines a bull spread and bear spread at three strike prices, creating a distinctive "tent-shaped" payoff diagram with maximum profit at the middle strike.</p>
              <p>Unlike iron condors with their wide profit zones, butterflies are <strong>surgical instruments</strong> for traders who have a specific price target and want to profit from pinpoint accuracy.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why It Works:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Volatility surface arbitrage:</strong> Exploits mispricing in the volatility smile</li>
                <li>• <strong>Risk-neutral density extraction:</strong> Reveals market's probability distribution</li>
                <li>• <strong>Low capital requirement:</strong> Maximum loss is limited to small net debit</li>
                <li>• <strong>High reward-to-risk ratio:</strong> Can achieve 3:1 or better risk/reward</li>
                <li>• <strong>Precision targeting:</strong> Ideal when you have a specific price forecast</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The Three Strikes Explained:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-medium text-blue-800">Lower Strike (Wing)</p>
                  <p className="text-xs text-blue-700 mb-1">• Buy 1 Call/Put</p>
                  <p className="text-xs text-blue-700">• Provides downside protection</p>
                </div>
                <div className="bg-purple-100 p-3 rounded">
                  <p className="font-medium text-purple-800">Middle Strike (Body)</p>
                  <p className="text-xs text-purple-700 mb-1">• Sell 2 Calls/Puts</p>
                  <p className="text-xs text-purple-700">• Maximum profit zone</p>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-medium text-blue-800">Upper Strike (Wing)</p>
                  <p className="text-xs text-blue-700 mb-1">• Buy 1 Call/Put</p>
                  <p className="text-xs text-blue-700">• Provides upside protection</p>
                </div>
              </div>
              <p className="text-xs mt-2">The 1-2-1 ratio creates a balanced position with defined risk on both sides.</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Volatility Surface & Risk-Neutral Densities:</h4>
              <div className="mb-3">
                <p className="mb-2">Butterflies are the <strong>fundamental building blocks</strong> for extracting risk-neutral probability distributions from option prices. By analyzing butterfly spreads across strikes, quants can reconstruct the market's implied probability density function.</p>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <p className="font-medium text-purple-800 text-center">"Butterfly spreads reveal what the market thinks will happen"</p>
                  <p className="text-xs text-purple-700 text-center mt-1">Used by market makers and quants for volatility surface modeling</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Call vs Put Butterflies:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-green-100 p-3 rounded">
                  <p className="font-medium text-green-800">Call Butterfly</p>
                  <p className="text-xs text-green-700">Buy 1 low strike call, Sell 2 middle strike calls, Buy 1 high strike call</p>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-medium text-blue-800">Put Butterfly</p>
                  <p className="text-xs text-blue-700">Buy 1 low strike put, Sell 2 middle strike puts, Buy 1 high strike put</p>
                </div>
              </div>
              <p className="text-xs mt-2">Both have identical payoff profiles due to put-call parity. Choose based on liquidity and pricing.</p>
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
                <li><strong>Identify target price:</strong> Where you expect the stock to be at expiration</li>
                <li><strong>Check IV environment:</strong> Butterflies work best in moderate to high IV</li>
                <li><strong>Select expiration:</strong> 30-45 DTE for optimal theta/gamma balance</li>
                <li><strong>Choose strike spacing:</strong> Equal intervals (e.g., $5 or $10 apart)</li>
                <li><strong>Verify liquidity:</strong> Tight bid-ask spreads on all strikes</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 2: Strike Selection & Execution</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Middle strike:</strong> At or near your target price (ATM or slightly OTM)</li>
                <li><strong>Wing strikes:</strong> Equidistant above and below middle strike</li>
                <li><strong>Calculate max profit:</strong> Wing width minus net debit paid</li>
                <li><strong>Calculate breakevens:</strong> Middle strike ± (net debit / 2)</li>
                <li><strong>Execute as single order:</strong> All three legs simultaneously for best fill</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 3: Position Monitoring</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Track price movement:</strong> Monitor distance from middle strike</li>
                <li><strong>Watch IV changes:</strong> Falling IV benefits the position</li>
                <li><strong>Profit target:</strong> Close at 50-75% of maximum profit</li>
                <li><strong>Time management:</strong> Exit or adjust at 7-14 DTE</li>
                <li><strong>Greeks monitoring:</strong> Watch gamma risk as expiration approaches</li>
              </ol>
            </div>

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Phase 4: Exit & Adjustment Strategies</h4>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li><strong>Early profit taking:</strong> Close when target profit reached</li>
                <li><strong>Rolling the body:</strong> Move middle strike to follow price</li>
                <li><strong>Converting to condor:</strong> Widen profit zone if needed</li>
                <li><strong>Legging out:</strong> Close losing side, keep winning side</li>
                <li><strong>Stop loss:</strong> Exit if loss exceeds 50% of max loss</li>
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
                <h4 className="font-semibold text-green-800">Theta (Θ) - Mixed Impact</h4>
                <p className="text-xs text-green-700 mt-1">Positive theta near middle strike, negative at wings. Time decay helps when price is near target.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800">Delta (Δ) - Near Zero</h4>
                <p className="text-xs text-blue-700 mt-1">Starts near zero at middle strike. Becomes directional as price moves away from center.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800">Vega (ν) - Short Volatility</h4>
                <p className="text-xs text-red-700 mt-1">Negative vega position. Benefits from volatility contraction. Hurt by vol expansion.</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800">Gamma (Γ) - Concentrated Risk</h4>
                <p className="text-xs text-orange-700 mt-1">Large positive gamma at middle strike, negative at wings. Accelerates P&L changes near expiration.</p>
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
                <li>• <strong>30-45 DTE optimal:</strong> Balance between time value and gamma risk</li>
                <li>• <strong>Equal strike spacing:</strong> Maintain symmetry for proper risk/reward</li>
                <li>• <strong>Middle strike at target:</strong> Place body where you expect price to land</li>
                <li>• <strong>Liquid options only:</strong> Tight spreads essential for profitability</li>
                <li>• <strong>Moderate IV environment:</strong> Not too low (insufficient premium) or too high (vol risk)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Position Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50-75% profit target:</strong> Take profits when available</li>
                <li>• <strong>Exit at 7-14 DTE:</strong> Avoid gamma explosion near expiration</li>
                <li>• <strong>Adjust if breached:</strong> Roll body to follow price or convert to condor</li>
                <li>• <strong>Monitor IV changes:</strong> Exit if volatility expands significantly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Risk Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Position sizing:</strong> Risk only 1-2% per trade (lower than condors)</li>
                <li>• <strong>Stop loss at 50%:</strong> Cut losses if max loss approaches 50%</li>
                <li>• <strong>Diversify strikes:</strong> Multiple butterflies at different price levels</li>
                <li>• <strong>Wing width selection:</strong> Wider wings = lower cost, lower max profit</li>
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
                <li>• <strong>Range-bound markets:</strong> Price consolidating in tight range</li>
                <li>• <strong>Post-volatility spike:</strong> After earnings or events when IV elevated</li>
                <li>• <strong>Mean reversion setups:</strong> Price likely to return to average</li>
                <li>• <strong>Technical support/resistance:</strong> Strong price levels nearby</li>
                <li>• <strong>Low realized volatility:</strong> Actual moves smaller than implied</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Avoid During:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Strong trends:</strong> Directional momentum breaks butterflies quickly</li>
                <li>• <strong>Very low IV:</strong> Insufficient premium for risk taken</li>
                <li>• <strong>Major catalysts pending:</strong> Earnings, FOMC, geopolitical events</li>
                <li>• <strong>High realized volatility:</strong> When actual moves exceed expectations</li>
                <li>• <strong>Illiquid options:</strong> Wide spreads destroy profitability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Volatility Surface Applications */}
        <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🔬</span>
            Advanced Applications: Volatility Surface Analysis
          </h3>
          <div className="text-sm text-purple-700 space-y-3">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Risk-Neutral Density Extraction:</h4>
              <p className="mb-2">Butterflies are the <strong>mathematical foundation</strong> for extracting probability distributions from option prices:</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Second derivative of call prices:</strong> Butterfly value approximates probability density</li>
                <li>• <strong>Market-implied probabilities:</strong> What the market thinks will happen</li>
                <li>• <strong>Volatility smile reconstruction:</strong> Build complete volatility surface</li>
                <li>• <strong>Arbitrage detection:</strong> Identify mispriced options across strikes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Quant Applications:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Model calibration:</strong> Fit stochastic volatility models to market data</li>
                <li>• <strong>Skew trading:</strong> Exploit volatility smile anomalies</li>
                <li>• <strong>Tail risk assessment:</strong> Measure market's fear of extreme moves</li>
                <li>• <strong>Relative value:</strong> Compare butterflies across different expirations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Portfolio Integration:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Volatility hedging:</strong> Combine with directional positions</li>
                <li>• <strong>Earnings plays:</strong> Target post-earnings price levels</li>
                <li>• <strong>Event-driven trading:</strong> Profit from anticipated outcomes</li>
                <li>• <strong>Ladder multiple butterflies:</strong> Create custom probability distributions</li>
              </ul>
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
                <li>• <strong>Wrong target price:</strong> Placing middle strike where price won't go</li>
                <li>• <strong>Unequal spacing:</strong> Breaks the 1-2-1 ratio and risk profile</li>
                <li>• <strong>Poor timing:</strong> Entering too close to expiration (gamma risk)</li>
                <li>• <strong>Illiquid strikes:</strong> Wide spreads eat into profits</li>
                <li>• <strong>Ignoring IV rank:</strong> Trading in wrong volatility environment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Management Failures:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Holding through expiration:</strong> Gamma risk explodes in final week</li>
                <li>• <strong>Not taking profits:</strong> Waiting for max profit often results in losses</li>
                <li>• <strong>Ignoring price movement:</strong> Not adjusting when price moves away</li>
                <li>• <strong>Emotional attachment:</strong> Hoping price returns to middle strike</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Execution Errors:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Legging in:</strong> Entering legs separately increases risk and cost</li>
                <li>• <strong>Market orders:</strong> Always use limit orders for multi-leg spreads</li>
                <li>• <strong>Poor fills:</strong> Not patient with order placement</li>
                <li>• <strong>Commission drag:</strong> Four legs mean higher transaction costs</li>
              </ul>
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
                <li>• <strong>Win rate:</strong> 40-60% (lower than condors due to precision required)</li>
                <li>• <strong>Risk/reward ratio:</strong> Often 3:1 or better when properly structured</li>
                <li>• <strong>Maximum profit:</strong> Wing width minus net debit paid</li>
                <li>• <strong>Typical ROI:</strong> 50-200% on capital at risk when successful</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Minimum account:</strong> $10,000+ for effective trading</li>
                <li>• <strong>Margin requirements:</strong> Net debit paid (defined risk)</li>
                <li>• <strong>Position sizing:</strong> Risk 1-2% per trade maximum</li>
                <li>• <strong>Commission impact:</strong> Four legs mean higher costs - factor into profitability</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Risk Characteristics:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Maximum loss:</strong> Net debit paid (limited and defined)</li>
                <li>• <strong>Maximum profit:</strong> Wing width minus net debit</li>
                <li>• <strong>Breakeven points:</strong> Middle strike ± (net debit / 2)</li>
                <li>• <strong>Probability of profit:</strong> Depends on strike selection and IV environment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Butterfly vs Iron Condor */}
        <div className="bg-amber-50 p-4 md:p-6 rounded-xl shadow-lg border border-amber-200">
          <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            Butterfly vs Iron Condor: When to Use Each
          </h3>
          <div className="text-sm text-amber-700 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border-2 border-purple-300">
                <h4 className="font-semibold text-purple-800 mb-2">Use Butterfly When:</h4>
                <ul className="space-y-1 ml-2 text-xs">
                  <li>✓ You have a specific price target</li>
                  <li>✓ Want higher risk/reward ratio</li>
                  <li>✓ Lower capital requirement needed</li>
                  <li>✓ Precision over probability</li>
                  <li>✓ Analyzing volatility surface</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border-2 border-indigo-300">
                <h4 className="font-semibold text-indigo-800 mb-2">Use Iron Condor When:</h4>
                <ul className="space-y-1 ml-2 text-xs">
                  <li>✓ Want higher probability of profit</li>
                  <li>✓ Prefer wider profit zone</li>
                  <li>✓ Seeking consistent income</li>
                  <li>✓ Probability over precision</li>
                  <li>✓ Building systematic portfolio</li>
                </ul>
              </div>
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
                <a href="/articles/unlocking-volatility-surface-risk-neutral-densities-butterfly-spread" 
                   className="text-blue-600 hover:underline block">
                   • Deep Research: Unlocking the Volatility Surface with Butterfly Spreads
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Video Tutorials:</h4>
              <div className="space-y-1 ml-4">
                <a href="https://youtu.be/KG66_1FnRSg" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • YouTube: Butterfly Spread Strategy Explained
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
                <a href="https://www.cboe.com/tradable_products/vix/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • CBOE: VIX and Volatility Data
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
