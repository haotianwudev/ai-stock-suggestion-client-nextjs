import { StrategyDetailProps } from '../strategy-config';

export const LongPutStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200 mb-6">
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
              <p className="mb-2">The long put is the <strong>definitive instrument for asymmetric utility</strong> in options trading. You pay a small premium for the right to profit from significant downward moves, creating a powerful risk/reward asymmetry where your maximum loss is limited to the premium paid, but profit potential is substantial.</p>
              <p>This strategy leverages the <strong>structural "crash premium"</strong> built into put options - the market's tendency to overpay for downside protection due to behavioral biases and institutional hedging needs.</p>
            </div>
            
            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Why Long Puts Work:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Asymmetric payoff structure:</strong> Limited risk, substantial profit potential</li>
                <li>• <strong>Volatility expansion:</strong> Market crashes often coincide with volatility spikes</li>
                <li>• <strong>Leverage efficiency:</strong> Control large positions with small capital outlay</li>
                <li>• <strong>Portfolio insurance:</strong> Hedge against catastrophic tail risk events</li>
                <li>• <strong>Behavioral edge:</strong> Exploit market's tendency to underprice tail risks</li>
              </ul>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">The "Crash Premium" Phenomenon:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-red-100 p-3 rounded">
                  <p className="font-medium text-red-800">📉 Market Structure</p>
                  <p className="text-xs text-red-700">Put options are systematically expensive due to institutional hedging demand and behavioral biases that overweight downside risks</p>
                </div>
                <div className="bg-orange-100 p-3 rounded">
                  <p className="font-medium text-orange-800">⚡ Volatility Skew</p>
                  <p className="text-xs text-orange-700">OTM puts trade at higher implied volatility than ATM options, creating opportunities for strategic buyers</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Strategic Motivations for Long Puts:</h4>
              <div className="space-y-2">
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-medium text-blue-800 text-sm">🎯 Directional Speculation:</p>
                  <p className="text-xs text-blue-700">Profit from anticipated price declines with defined risk and leveraged exposure</p>
                </div>
                <div className="bg-green-100 p-2 rounded">
                  <p className="font-medium text-green-800 text-sm">🛡️ Portfolio Hedging:</p>
                  <p className="text-xs text-green-700">Insurance against portfolio drawdowns and black swan events</p>
                </div>
                <div className="bg-purple-100 p-2 rounded">
                  <p className="font-medium text-purple-800 text-sm">📊 Volatility Play:</p>
                  <p className="text-xs text-purple-700">Benefit from volatility expansion during market stress periods</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <p className="font-medium text-yellow-800 text-sm">⚖️ Risk Management:</p>
                  <p className="text-xs text-yellow-700">Asymmetric risk profile allows for position sizing with known maximum loss</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Market Demographics & Put Buyers:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-indigo-100 p-2 rounded">
                  <p className="font-medium text-indigo-800 text-sm">🏦 Institutional Hedgers</p>
                  <ul className="text-xs text-indigo-700 space-y-1 mt-1">
                    <li>• Pension funds</li>
                    <li>• Insurance companies</li>
                    <li>• Mutual funds</li>
                    <li>• Hedge funds</li>
                  </ul>
                </div>
                <div className="bg-teal-100 p-2 rounded">
                  <p className="font-medium text-teal-800 text-sm">📈 Retail Speculators</p>
                  <ul className="text-xs text-teal-700 space-y-1 mt-1">
                    <li>• Directional traders</li>
                    <li>• Swing traders</li>
                    <li>• Event-driven players</li>
                    <li>• Technical analysts</li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="font-medium text-gray-800 text-sm">🔄 Arbitrageurs</p>
                  <ul className="text-xs text-gray-700 space-y-1 mt-1">
                    <li>• Market makers</li>
                    <li>• Volatility traders</li>
                    <li>• Delta hedgers</li>
                    <li>• Spread traders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h4 className="font-semibold text-slate-800 mb-2">Greeks Analysis for Long Puts:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-red-100 p-3 rounded">
                  <h5 className="font-medium text-red-800 mb-1">📉 Delta (Negative)</h5>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• <strong>ATM puts:</strong> ~-0.50 delta</li>
                    <li>• <strong>OTM puts:</strong> -0.10 to -0.30 delta</li>
                    <li>• <strong>ITM puts:</strong> -0.70 to -0.90 delta</li>
                    <li>• <strong>Profit acceleration:</strong> Delta becomes more negative as stock falls</li>
                  </ul>
                </div>
                <div className="bg-orange-100 p-3 rounded">
                  <h5 className="font-medium text-orange-800 mb-1">⚡ Gamma (Positive)</h5>
                  <ul className="text-xs text-orange-700 space-y-1">
                    <li>• <strong>Acceleration benefit:</strong> Gains speed up as stock moves down</li>
                    <li>• <strong>Peak at ATM:</strong> Maximum gamma near strike price</li>
                    <li>• <strong>Time sensitivity:</strong> Gamma increases as expiration approaches</li>
                    <li>• <strong>Volatility amplifier:</strong> Enhances profits during large moves</li>
                  </ul>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800 mb-1">🕐 Theta (Negative)</h5>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• <strong>Time decay enemy:</strong> Option loses value daily</li>
                    <li>• <strong>Acceleration near expiry:</strong> Theta increases as expiration nears</li>
                    <li>• <strong>OTM vulnerability:</strong> Time decay hits OTM puts hardest</li>
                    <li>• <strong>Management key:</strong> Must overcome theta to be profitable</li>
                  </ul>
                </div>
                <div className="bg-purple-100 p-3 rounded">
                  <h5 className="font-medium text-purple-800 mb-1">📊 Vega (Positive)</h5>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• <strong>Volatility friend:</strong> Benefits from IV expansion</li>
                    <li>• <strong>Crash correlation:</strong> Market drops often increase volatility</li>
                    <li>• <strong>Double benefit:</strong> Profit from both direction and volatility</li>
                    <li>• <strong>IV crush risk:</strong> Vulnerable to volatility contraction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strike Selection & Timing */}
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Strike Selection & Timing Strategy
          </h3>
          <div className="text-sm text-indigo-700 space-y-4">
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Strike Selection Framework</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-green-100 p-3 rounded">
                  <h5 className="font-medium text-green-800">🎯 ATM Puts (50 Delta)</h5>
                  <ul className="text-xs text-green-700 space-y-1 mt-1">
                    <li>• <strong>Balanced approach:</strong> Good delta, manageable premium</li>
                    <li>• <strong>High probability:</strong> ~50% chance of finishing ITM</li>
                    <li>• <strong>Moderate cost:</strong> Higher premium but better odds</li>
                    <li>• <strong>Best for:</strong> Moderate bearish outlook</li>
                  </ul>
                </div>
                <div className="bg-yellow-100 p-3 rounded">
                  <h5 className="font-medium text-yellow-800">📉 OTM Puts (10-30 Delta)</h5>
                  <ul className="text-xs text-yellow-700 space-y-1 mt-1">
                    <li>• <strong>Lottery ticket:</strong> Low cost, high reward potential</li>
                    <li>• <strong>Lower probability:</strong> 10-30% chance of finishing ITM</li>
                    <li>• <strong>Cheap premium:</strong> Affordable for speculation</li>
                    <li>• <strong>Best for:</strong> Tail risk hedging, crash plays</li>
                  </ul>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <h5 className="font-medium text-blue-800">💰 ITM Puts (70+ Delta)</h5>
                  <ul className="text-xs text-blue-700 space-y-1 mt-1">
                    <li>• <strong>Stock substitute:</strong> High delta, expensive premium</li>
                    <li>• <strong>High probability:</strong> 70%+ chance of finishing ITM</li>
                    <li>• <strong>Expensive entry:</strong> High premium cost</li>
                    <li>• <strong>Best for:</strong> Strong bearish conviction</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Time to Expiration Strategy</h4>
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

            <div className="border-l-4 border-indigo-300 pl-4">
              <h4 className="font-semibold text-indigo-800">Entry Timing Considerations</h4>
              <ul className="space-y-1 mt-2">
                <li>• <strong>High IV periods:</strong> Avoid buying when volatility is elevated</li>
                <li>• <strong>Technical resistance:</strong> Enter near key resistance levels</li>
                <li>• <strong>Market sentiment:</strong> Contrarian plays during extreme optimism</li>
                <li>• <strong>Fundamental catalysts:</strong> Earnings misses, guidance cuts, macro events</li>
                <li>• <strong>Seasonal patterns:</strong> September-October historically volatile</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Position Management */}
        <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Position Management Framework
          </h3>
          <div className="text-sm text-green-700 space-y-3">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Profit Taking Rules:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50% rule:</strong> Take profits when option reaches 50% of maximum theoretical value</li>
                <li>• <strong>2x rule:</strong> Close position when premium doubles (100% gain)</li>
                <li>• <strong>Technical levels:</strong> Take profits at key support levels</li>
                <li>• <strong>Volatility contraction:</strong> Exit if IV starts collapsing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Loss Management:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>50% stop loss:</strong> Cut losses if premium falls 50% from entry</li>
                <li>• <strong>Time-based exits:</strong> Close at 7-10 DTE to avoid gamma risk</li>
                <li>• <strong>Thesis invalidation:</strong> Exit if fundamental reason changes</li>
                <li>• <strong>Never add to losers:</strong> Avoid averaging down on losing puts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Rolling Strategies:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Roll out:</strong> Extend time if thesis intact but need more time</li>
                <li>• <strong>Roll down:</strong> Lower strike if stock has moved favorably</li>
                <li>• <strong>Roll out and down:</strong> Combination for maximum flexibility</li>
                <li>• <strong>Net credit only:</strong> Never roll for a net debit</li>
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
          <div className="text-sm text-blue-700 space-y-3">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Ideal Entry Conditions:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Low volatility environment:</strong> Cheap option premiums</li>
                <li>• <strong>Overbought markets:</strong> Technical indicators showing exhaustion</li>
                <li>• <strong>Fundamental deterioration:</strong> Economic or company-specific headwinds</li>
                <li>• <strong>Seasonal weakness:</strong> September-October historically bearish</li>
                <li>• <strong>Sentiment extremes:</strong> Excessive bullishness or complacency</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Avoid During:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>High volatility periods:</strong> Expensive premiums reduce edge</li>
                <li>• <strong>Strong uptrends:</strong> Fighting the trend is difficult</li>
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
                <li>• <strong>Correlation awareness:</strong> Don't overconcentrate in similar puts</li>
                <li>• <strong>Liquidity requirements:</strong> Ensure sufficient volume for exit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Common Mistakes to Avoid:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Buying expensive puts:</strong> Entering during high IV periods</li>
                <li>• <strong>Holding to expiration:</strong> Ignoring time decay acceleration</li>
                <li>• <strong>Overleveraging:</strong> Risking too much on single trades</li>
                <li>• <strong>Emotional trading:</strong> Revenge trading after losses</li>
                <li>• <strong>Ignoring liquidity:</strong> Trading illiquid options with wide spreads</li>
                <li>• <strong>No exit plan:</strong> Entering without defined profit/loss targets</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Psychological Challenges:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>High failure rate:</strong> Most puts expire worthless</li>
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
            Advanced Long Put Strategies
          </h3>
          <div className="text-sm text-purple-700 space-y-3">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Portfolio Hedging Applications:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Tail risk hedging:</strong> 1-5% allocation to OTM puts for crash protection</li>
                <li>• <strong>Beta hedging:</strong> Use index puts to hedge high-beta stock portfolios</li>
                <li>• <strong>Sector hedging:</strong> Protect against sector-specific risks</li>
                <li>• <strong>Event hedging:</strong> Protect around known risk events</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Volatility Trading Techniques:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Volatility expansion plays:</strong> Buy puts before expected vol increases</li>
                <li>• <strong>Skew trading:</strong> Exploit put-call volatility differences</li>
                <li>• <strong>Term structure plays:</strong> Trade volatility across different expirations</li>
                <li>• <strong>Event volatility:</strong> Play earnings or announcement volatility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Combination Strategies:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Put spreads:</strong> Reduce cost by selling lower strike puts</li>
                <li>• <strong>Put butterflies:</strong> Profit from specific price targets</li>
                <li>• <strong>Protective puts:</strong> Insure existing long stock positions</li>
                <li>• <strong>Synthetic shorts:</strong> Combine with calls for synthetic short exposure</li>
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
                <li>• <strong>Success rate:</strong> 20-40% of long puts finish ITM</li>
                <li>• <strong>Average winner:</strong> 100-300% gains on successful trades</li>
                <li>• <strong>Average loser:</strong> 50-100% loss on unsuccessful trades</li>
                <li>• <strong>Breakeven rate:</strong> Need ~25-30% win rate to break even</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Expected Returns:</h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Speculative trading:</strong> Highly variable, -100% to +500%</li>
                <li>• <strong>Portfolio hedging:</strong> Insurance cost of 1-3% annually</li>
                <li>• <strong>Volatility trading:</strong> 10-20% annual returns for skilled traders</li>
                <li>• <strong>Event trading:</strong> 20-50% per successful event</li>
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
                <a href="https://www.optionsplaybook.com/option-strategies/long-put/" 
                   target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                   • Options Playbook: Long Put Mechanics
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