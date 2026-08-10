import { ArticleFrame } from '@/components/articles/article-frame';

export default function LosingMoneyWithOptionsCommonPitfalls() {
  return (
    <ArticleFrame slug="losing-money-with-options-common-pitfalls">
      <div className="space-y-16">
        {/* Section 1: Directional Trading Pitfalls */}
        <section>
          <div className="flex items-center mb-6">
            <div className="bg-[#A8672E] dark:bg-[#D08F52]/10 p-2 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Directional Trading Pitfalls</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">Ignoring Implied Volatility</h3>
              <p className="text-gray-700 dark:text-gray-300">Predicting a price move isn&apos;t enough. An adverse shift in implied volatility can crush an option&apos;s value, even if your directional bet was correct.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">Ignoring Time Decay (Theta)</h3>
              <p className="text-gray-700 dark:text-gray-300">Options are wasting assets. Failing to account for the daily erosion of value is a fundamental and costly mistake, especially for out-of-the-money options.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">Failing to &quot;Speak Greek&quot;</h3>
              <p className="text-gray-700 dark:text-gray-300">A superficial understanding of option Greeks (like Delta) is insufficient. You must grasp how these sensitivities change with time and volatility for effective risk management.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">Ignoring Option-Specific Risks</h3>
              <p className="text-gray-700 dark:text-gray-300">Theoretical models assume smooth, continuous time. Real-world market mechanics, like opening and closing, can create unexpected outcomes for directional traders.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Exercise and Expiration Mistakes */}
        <section>
          <div className="flex items-center mb-6">
            <div className="bg-sky-500/10 p-2 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Exercise & Expiration Mistakes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-sky-600 dark:text-sky-400 mb-2 font-serif">Exercising ITM Options Early</h3>
              <p className="text-gray-700 dark:text-gray-300">A classic error. This sacrifices the option&apos;s remaining extrinsic (time) value. Selling the option is almost always more profitable than exercising it before expiration.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-sky-600 dark:text-sky-400 mb-2 font-serif">Exercising OTM Options</h3>
              <p className="text-gray-700 dark:text-gray-300">A &quot;wildly expensive&quot; human error that results in an automatic loss. Requires stringent safety checks to avoid this spectacular disaster.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-sky-600 dark:text-sky-400 mb-2 font-serif">Not Exercising ITM Options</h3>
              <p className="text-gray-700 dark:text-gray-300">Throwing away guaranteed profit. This is even worse if the position was delta-hedged, as hedge losses are locked in without the offsetting option gain.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-sky-600 dark:text-sky-400 mb-2 font-serif">Ignoring Pin Risk</h3>
              <p className="text-gray-700 dark:text-gray-300">When the underlying closes at the strike price, uncertainty about assignment can leave you with a large, unwanted, and unhedged position over the weekend.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Gamma Trading Errors */}
        <section>
          <div className="flex items-center mb-6">
            <div className="bg-[#A8672E] dark:bg-[#D08F52]/10 p-2 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Gamma Trading Errors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">Not Working a Long Gamma Hedge</h3>
              <p className="text-gray-700 dark:text-gray-300">Failing to place re-hedging orders misses the opportunity to profit from market moves, especially during sharp reversals.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">Putting All Hedge Eggs in One Basket</h3>
              <p className="text-gray-700 dark:text-gray-300">Using a single, large stop-loss for a hedge is risky. If triggered, it locks in a large loss. Break hedges into smaller orders at multiple levels.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">Switch Gamma</h3>
              <p className="text-gray-700 dark:text-gray-300">Hedging with a correlated but different underlying (e.g., another futures month) can create unwanted synthetic spread positions that move against you.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-lg text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 font-serif">Selling Gamma, Forgetting the Hedge</h3>
              <p className="text-gray-700 dark:text-gray-300">If you adjust your gamma exposure but fail to make the corresponding delta-hedge trade in the underlying, you&apos;re left with a naked, exposed position.</p>
            </div>
          </div>
        </section>

        {/* Section 4 & 5: Volatility & Miscellaneous */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#BC4128] dark:bg-[#E2694A]/10 p-2 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Volatility Trading</h2>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
                <h3 className="font-semibold text-lg text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-2 font-serif">Overpaying for Long-Dated Volatility</h3>
                <p className="text-gray-700 dark:text-gray-300">Overreacting to a short-term volatility spike (like a flash crash) by buying long-dated options locks in an inflated price, leading to losses as volatility inevitably mean-reverts.</p>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-amber-500/10 p-2 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Option Landmines</h2>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
                <h3 className="font-semibold text-lg text-amber-600 dark:text-amber-400 mb-2 font-serif">Ignoring Corporate Actions</h3>
                <p className="text-gray-700 dark:text-gray-300">Trading low-risk arbitrage positions (conversions/reversals) without checking for dividends or splits can lead to huge losses as the put-call parity relationship breaks down.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Order Entry Errors */}
        <section>
          <div className="flex items-center mb-6">
            <div className="bg-[#BC4128] dark:bg-[#E2694A]/10 p-2 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Order Entry Errors</h2>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-red-300 dark:border-[#BC4128] dark:border-[#E2694A]/50">
            <h3 className="font-semibold text-lg text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-2 font-serif">&quot;Fat Finger&quot; Mistakes</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Simple but costly errors like buying instead of selling, choosing the wrong expiration, or trading the wrong underlying are common and avoidable.</p>
            <div className="border-t border-[#BC4128] dark:border-[#E2694A]/20 pt-4">
              <h4 className="font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-red-300">The Devastating Error</h4>
              <p className="text-gray-500 dark:text-gray-400">Selling a deep in-the-money option for a minimal price (e.g., 1 tick) on an exchange without mistrade protection. This is like giving away a winning lottery ticket. Always know the exchange rules.</p>
            </div>
          </div>
        </section>

        {/* Prevention Section */}
        <section className="bg-gray-100 dark:bg-gray-800/50 border border-[#A8672E] dark:border-[#D08F52]/30 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">How to Prevent These Losses</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6">The path to avoiding these pitfalls is clear and requires a combination of three key pillars:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
              <span className="font-bold text-xl">Technical Knowledge</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 text-xl">&rarr;</div>
            <div className="text-sky-600 dark:text-sky-400">
              <span className="font-bold text-xl">Alertness & Discipline</span>
            </div>
            <div className="text-gray-400 dark:text-gray-500 text-xl">&rarr;</div>
            <div className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
              <span className="font-bold text-xl">Risk Management Systems</span>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
