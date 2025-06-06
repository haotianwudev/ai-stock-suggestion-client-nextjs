import React from 'react';

export default function NavigatingOptionTradingStrategies() {
  return (
    <div className="bg-slate-50 text-slate-800 leading-relaxed min-h-screen">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Navigating Option Trading Strategies</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar (Sticky) */}
        <aside className="lg:w-1/4 xl:w-1/5 mb-8 lg:mb-0">
          <nav className="sticky top-4 bg-white p-4 rounded-lg shadow max-h-[calc(100vh-4rem)] overflow-y-auto">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">Contents</h3>
            <ul className="space-y-2">
              <li><a href="#introduction" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Introduction</a></li>
              <li><a href="#strategy-groupings" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Strategy Groupings</a></li>
              <li><a href="#directional-strategies" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Basic Strategies</a></li>
              <li><a href="#spreads" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Spreads</a></li>
              <li><a href="#volatility-trading" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Advanced Strategies</a></li>
            </ul>
          </nav>
        </aside>

        {/* Content Sections */}
        <main className="lg:w-3/4 xl:w-4/5">
          <section id="introduction" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Introduction: Choosing Your Path</h2>
            <p className="mb-3">Based on comprehensive analysis, there is <strong>no single "best" strategy</strong>. The most feasible strategies for an individual depend on their <strong>knowledge</strong> and <strong>suitability</strong>, incorporating their own <strong>risk/reward attitude</strong> and <strong>financial condition</strong>. An investor must understand the strategy and their own attitude toward risk and reward. It is not proper to use a strategy if its risks violate the investor's financial objectives or accepted methodology.</p>
          </section>

          <section id="strategy-groupings" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Strategy Groupings</h2>
            <p className="mb-4">Strategies can generally be grouped based on the strategist's market attitude or approach:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Directional Strategies</h3>
                <p>Geared towards capitalizing on an outlook for a specific stock or the general market (bullish or bearish). These tend to be more aggressive.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-green-700 mb-2">Neutral Strategies</h3>
                <p>Not focused on picking market direction, but rather based on option value, often related to volatility trading. These perform well if the market net change is small over time.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-amber-700 mb-2">Limited Risk / Large Profit</h3>
                <p>Have limited risk with the potential for large profits, even if the probability of large profit is low. A few large profits can potentially make up for numerous small losses.</p>
              </div>
              <div className="bg-sky-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-sky-700 mb-2">Conservative Strategies</h3>
                <p>Emphasize making a reasonable but limited return coupled with decreased risk exposure.</p>
              </div>
            </div>
          </section>

          <section id="directional-strategies" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Basic Directional Strategies</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Call Buying</h3>
                <p className="mb-3">Involves purchasing a call option when you are <strong>bullish</strong> on the underlying asset.</p>
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">When to Consider:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>When expecting upward price movement</li>
                    <li>For leverage and limited dollar risk</li>
                    <li>To take advantage of diversification with index options</li>
                    <li>For shorter-term strategies, use higher delta options</li>
                    <li>For long-term strategies, consider LEAPS or slightly out-of-the-money options</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Put Buying</h3>
                <p className="mb-3">Involves purchasing a put option when you are <strong>bearish</strong> on the underlying asset.</p>
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">When to Consider:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>When expecting downward price movement</li>
                    <li>More attractive than short selling for bearish positions</li>
                    <li>Equivalent to a "protected short sale"</li>
                    <li>When options are cheap and high volatility is expected</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Covered Call Writing</h3>
                <p className="mb-3">Involves selling call options against owned stock positions.</p>
                <div className="bg-green-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">When to Consider:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>One of the most widely used strategies by investors</li>
                    <li>Suitable for conservative investors willing to own stock</li>
                    <li>When slightly bullish or neutral on the underlying stock</li>
                    <li>To generate income while providing some downside protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="spreads" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Spread Strategies</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Bull Spreads</h3>
                <p className="mb-3">Combine buying and selling options to profit from upward movement with limited risk.</p>
                <div className="bg-emerald-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Limited downside risk and limited upside profit potential</li>
                    <li>Can be constructed with little or no risk</li>
                    <li>Suitable for bullish market outlook</li>
                    <li>Can serve as substitute for covered writing</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Bear Spreads</h3>
                <p className="mb-3">Designed to profit from downward price movement with controlled risk.</p>
                <div className="bg-orange-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Suitable for bearish market outlook</li>
                    <li>Limited risk with defined maximum profit</li>
                    <li>Can be structured as credit or debit spreads</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Calendar Spreads</h3>
                <p className="mb-3">Involve different expiration dates to capture time decay differential.</p>
                <div className="bg-purple-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Neutral strategy that benefits from time decay</li>
                    <li>Normally closed when near-term option expires</li>
                    <li>Work best when stock stays near strike price</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Butterfly Spreads</h3>
                <p className="mb-3">Neutral positions with three strike prices offering limited risk and profit.</p>
                <div className="bg-teal-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Limited risk and limited profit potential</li>
                    <li>Maximum profit at middle strike at expiration</li>
                    <li>Neutral strategy for range-bound markets</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="volatility-trading" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Advanced Strategies</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Volatility Trading</h3>
                <p className="mb-3">Approach based on option value rather than market direction.</p>
                <div className="bg-indigo-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">When to Consider:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>When implied volatility is perceived as "out of line"</li>
                    <li>For neutral strategies when market change is expected to be small</li>
                    <li>When options are cheap and high volatility is expected</li>
                    <li>Compare implied volatility to historical levels</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Straddles and Strangles</h3>
                <p className="mb-3">Combine puts and calls to profit from significant price movement or lack thereof.</p>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Applications:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Long Straddles:</strong> Profit from large moves in either direction</li>
                    <li><strong>Short Straddles:</strong> Profit from minimal price movement (high risk)</li>
                    <li><strong>Strangles:</strong> Similar to straddles but with different strike prices</li>
                    <li>Require substantial capital for writing strategies</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">Treasury Bill/Option Strategy</h3>
                <p className="mb-3">Combines risk-free investments with option purchases for limited risk/large profit potential.</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Structure:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>90% in Treasury bills or risk-free investments</li>
                    <li>10% in option purchases</li>
                    <li>Small levels of risk with large profit potential</li>
                    <li>Superior to convertible bonds for risk management</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Key Considerations</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">Risk Management</h4>
                <p>Every strategy has risk. Understanding potential effects of early assignments, dividend payments, and other factors is crucial. Use risk measures (Greeks) to predict future performance.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">Follow-Up Actions</h4>
                <p>Having a plan for follow-up action when the underlying moves is imperative. This includes adjusting positions, closing spreads before break-even, and managing risk in complex strategies.</p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">Mathematical Analysis</h4>
                <p>Use pricing models, probability calculations, hedge ratios (delta), and expected return analysis to aid in position selection and management.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">Cost Considerations</h4>
                <p>Commission costs work against the strategist. Establishing strategies in quantity can help reduce the percentage effect of commissions. Consider tax implications but never prioritize them over sound strategy management.</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 p-6 text-center">
        <p>&copy; 2025 Options Strategy Navigator. All information is for educational purposes only.</p>
      </footer>
    </div>
  );
} 