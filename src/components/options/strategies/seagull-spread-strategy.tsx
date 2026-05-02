import { StrategyDetailProps } from '../strategy-config';

export const SeagullSpreadStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          Strategy Details
        </h3>
      </div>

      {/* 1. Strategy Intuition */}
      <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Strategy Intuition
        </h3>
        <div className="text-sm text-slate-700 space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">📋 Definition</h4>
            <p className="text-blue-800">
              The <strong>seagull spread</strong> is a three-legged options structure that finances a directional position through volatility skew arbitrage:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-blue-800">
              <li><strong>Long Call at K2</strong> — directional exposure (ATM or slightly OTM)</li>
              <li><strong>Short Call at K3</strong> — caps upside, generates premium (further OTM)</li>
              <li><strong>Short Put at K1</strong> — finances the call spread premium (OTM, below spot)</li>
            </ul>
            <p className="mt-2 text-blue-800">
              The short put premium offsets the call spread debit, often creating a <strong>near-zero-cost directional position</strong>.
            </p>
          </div>

          <p>
            Think of the seagull as a <strong>bull call spread with a built-in financing mechanism</strong>. Instead of paying full debit for the call spread, you sell an out-of-the-money put to fund it. The strategy exploits the fact that volatility skew makes OTM puts expensive relative to OTM calls — you sell what is overpriced and buy what is comparatively cheap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            <div className="bg-green-100 p-3 rounded text-center">
              <p className="font-bold text-green-800">Long K2 Call</p>
              <p className="text-xs text-green-700 mt-1">Directional exposure. Pays off if stock rises above K2.</p>
            </div>
            <div className="bg-red-100 p-3 rounded text-center">
              <p className="font-bold text-red-800">Short K3 Call</p>
              <p className="text-xs text-red-700 mt-1">Caps the upside at K3. Generates premium to reduce cost.</p>
            </div>
            <div className="bg-amber-100 p-3 rounded text-center">
              <p className="font-bold text-amber-800">Short K1 Put</p>
              <p className="text-xs text-amber-700 mt-1">Finances the trade. Introduces downside risk below K1.</p>
            </div>
          </div>

          <div className="bg-amber-100 p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2">⚠️ No Free Lunch</h4>
            <p className="text-amber-800">
              The zero-cost structure is not free — it introduces <strong>naked downside risk below the short put strike K1</strong>. If the stock falls sharply, losses below K1 are equivalent to being short a put outright. The strategy trades unlimited downside for zero upfront cost.
            </p>
          </div>

          <div className="border-l-4 border-slate-300 pl-4">
            <h4 className="font-semibold mb-2">Volatility Skew Exploitation</h4>
            <p>
              The seagull profits structurally from the <strong>implied volatility skew</strong>: OTM puts trade at elevated implied volatility due to demand for downside protection (put skew), while OTM calls are cheaper. By selling the expensive put and buying the cheaper call spread, the trader captures the skew premium — the same edge that makes collars and risk reversals attractive.
            </p>
          </div>

          <div className="border-l-4 border-slate-300 pl-4">
            <h4 className="font-semibold mb-2">Payoff Summary</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Below K1:</strong> Losses increase linearly (short put P&L)</li>
              <li><strong>Between K1 and K2:</strong> Small gain or near breakeven (net premium)</li>
              <li><strong>Between K2 and K3:</strong> Profit increases linearly (long call gains)</li>
              <li><strong>Above K3:</strong> Maximum profit locked in (call spread capped)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Implementation Framework */}
      <div className="bg-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          Implementation Framework
        </h3>
        <div className="text-sm text-indigo-700 space-y-4">
          <div className="border-l-4 border-indigo-300 pl-4">
            <h4 className="font-semibold mb-2">Step 1: Confirm Directional View</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>You need a <strong>moderately bullish</strong> outlook — enough to reach K3 but not requiring a large move</li>
              <li>Identify a comfortable downside level: K1 should be below a support level you're willing to own the stock at</li>
              <li>Check IV Rank — ideally &gt; 30 so the short put generates meaningful premium</li>
            </ul>
          </div>
          <div className="border-l-4 border-indigo-300 pl-4">
            <h4 className="font-semibold mb-2">Step 2: Strike Selection</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>K2 (long call):</strong> ATM or 5-delta OTM — primary directional leg</li>
              <li><strong>K3 (short call):</strong> 10-20 delta OTM — caps upside, sets max profit target</li>
              <li><strong>K1 (short put):</strong> 15-25 delta OTM — chosen so its premium approximately equals the call spread debit</li>
              <li>Target net premium ≈ 0 (zero-cost) or small credit</li>
            </ul>
          </div>
          <div className="border-l-4 border-indigo-300 pl-4">
            <h4 className="font-semibold mb-2">Step 3: Choose Expiration</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>30–90 DTE is typical — enough time for the directional move, but short enough to benefit from theta</li>
              <li>Avoid very short-dated expirations where gamma risk on the short put becomes unmanageable</li>
            </ul>
          </div>
          <div className="border-l-4 border-indigo-300 pl-4">
            <h4 className="font-semibold mb-2">Step 4: Execute as a Single Order</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Enter all three legs simultaneously as a combo order to avoid leg risk</li>
              <li>Use a limit order — the spread has favorable fill potential when IV is elevated</li>
              <li>Verify the net debit/credit before sending</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Best Practices */}
      <div className="bg-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">✅</span>
          Best Practices
        </h3>
        <div className="text-sm text-green-700 space-y-4">
          <div className="border-l-4 border-green-300 pl-4">
            <h4 className="font-semibold mb-2">Strike Spacing</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Keep K2–K3 spread width proportional to the expected move (typically 5–10% of spot)</li>
              <li>K1 should be 5–10% below spot — far enough to provide a buffer but close enough to generate useful premium</li>
              <li>Avoid placing K1 near obvious technical support levels (assignment risk increases)</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-300 pl-4">
            <h4 className="font-semibold mb-2">When to Use</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>You have a directional view but want to minimise capital outlay</li>
              <li>Implied volatility skew is steep — OTM puts are relatively expensive</li>
              <li>You're comfortable accepting downside risk below K1 (e.g. hedging an existing long position)</li>
              <li>Corporate or institutional hedging where zero-cost structures are required</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-300 pl-4">
            <h4 className="font-semibold mb-2">Profit Management</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Close at 50–75% of maximum profit — don't hold to expiration with a short put outstanding</li>
              <li>If the stock rallies toward K3 early, consider closing the long call and letting the short put decay</li>
              <li>Roll or close before the last 21 DTE to avoid accelerated gamma risk on the short put</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Optimal Market Conditions */}
      <div className="bg-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          Optimal Market Conditions
        </h3>
        <div className="text-sm text-blue-700 space-y-4">
          <div className="border-l-4 border-blue-300 pl-4">
            <h4 className="font-semibold mb-2">Ideal Scenarios</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Elevated Put Skew:</strong> Steep skew makes the short put premium large enough to fund the call spread at near-zero cost</li>
              <li><strong>Post-Selloff Recovery:</strong> After a sharp decline, IV is elevated and you have a bullish recovery thesis</li>
              <li><strong>Range-Bound with Upside Bias:</strong> Stock likely to drift higher but not explode — the capped upside is acceptable</li>
              <li><strong>Earnings Hedging:</strong> When you expect a positive reaction but want to reduce premium outlay</li>
            </ul>
          </div>
          <div className="border-l-4 border-blue-300 pl-4">
            <h4 className="font-semibold mb-2">Avoid When</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Volatility skew is flat — the short put won't generate enough premium to fund the spread meaningfully</li>
              <li>You expect a large move in either direction (long straddle/strangle is better)</li>
              <li>You cannot tolerate the downside risk of the short put (use a collar or defined-risk spread instead)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Risk Management */}
      <div className="bg-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Risk Management
        </h3>
        <div className="text-sm text-red-700 space-y-4">
          <div className="border-l-4 border-red-300 pl-4">
            <h4 className="font-semibold mb-2">Key Risks</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Short Put Downside:</strong> The primary risk — losses below K1 are substantial and increase linearly. This is equivalent to owning the stock below K1 at a cost basis of K1</li>
              <li><strong>Capped Upside:</strong> If the stock rallies strongly past K3, you do not participate. A large move that would profit on a long call is truncated</li>
              <li><strong>Early Assignment:</strong> Short puts can be assigned early on dividend ex-dates or deep-in-the-money moves</li>
              <li><strong>Volatility Expansion:</strong> A sharp vol spike hurts the position — both the short put and short call increase in value against you</li>
            </ul>
          </div>
          <div className="border-l-4 border-red-300 pl-4">
            <h4 className="font-semibold mb-2">Risk Mitigation</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Size the position so assignment on the short put is manageable — only sell puts on stocks you'd be willing to own</li>
              <li>Set a stop-loss rule: close the entire spread if the stock approaches K1</li>
              <li>Monitor the short put delta — if it reaches 50+, consider closing or rolling down the put strike</li>
              <li>Never use this structure on high-beta or binary-event underlyings without a firm downside plan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. Advanced Applications */}
      <div className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Advanced Applications
        </h3>
        <div className="text-sm text-purple-700 space-y-4">
          <div className="border-l-4 border-purple-300 pl-4">
            <h4 className="font-semibold mb-2">Corporate Treasury &amp; Institutional Use</h4>
            <p>
              The seagull is widely used by corporate treasurers to hedge FX and commodity exposure at zero cost. A company expecting USD receipts can buy a USD call spread (protection against dollar appreciation) and sell a USD put to fund it — locking in a participation range with no premium outlay, which satisfies accounting and budget constraints.
            </p>
          </div>
          <div className="border-l-4 border-purple-300 pl-4">
            <h4 className="font-semibold mb-2">Bearish Seagull</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Mirror structure: buy put spread (long K2 put, short K1 put) + sell OTM call at K3</li>
              <li>Finances a bearish directional view through the short OTM call premium</li>
              <li>Risk: short call loses if stock rallies sharply above K3</li>
            </ul>
          </div>
          <div className="border-l-4 border-purple-300 pl-4">
            <h4 className="font-semibold mb-2">Comparison to Collar</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>A collar (long stock + short call + long put) is directionally similar but uses a <em>long</em> put for protection — defined downside risk at a cost</li>
              <li>The seagull replaces the long put with a <em>short</em> put — eliminating protection below K1 in exchange for removing the put premium cost</li>
              <li>Collar: full downside protection, small debit. Seagull: no downside protection below K1, zero cost</li>
            </ul>
          </div>
          <div className="border-l-4 border-purple-300 pl-4">
            <h4 className="font-semibold mb-2">Three-Way / Modified Structures</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Shift K1 lower for more downside buffer at the cost of less premium received</li>
              <li>Add a long put further OTM to convert back to defined risk (creates an iron condor variant)</li>
              <li>Use LEAPS for the long call to extend the time horizon and reduce theta drag</li>
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
          <div className="border-l-4 border-teal-300 pl-4">
            <h4 className="font-semibold mb-2">Further Reading</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="https://www.investopedia.com/terms/s/seagull-option.asp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Investopedia: Seagull Option</a></li>
              <li><a href="https://www.optionsprofitcalculator.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Options Profit Calculator</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <p className="text-xs text-gray-600">
          <strong>Risk Disclosure:</strong> Options trading involves significant risk and is not suitable for all investors.
          The seagull spread carries substantial downside risk below the short put strike, including the potential loss equivalent
          to owning the underlying stock from that level. Past performance does not guarantee future results. This information
          is for educational purposes only and does not constitute investment advice. Please consult with a qualified financial
          advisor before implementing any options strategy.
        </p>
      </div>

    </div>
  );
};
