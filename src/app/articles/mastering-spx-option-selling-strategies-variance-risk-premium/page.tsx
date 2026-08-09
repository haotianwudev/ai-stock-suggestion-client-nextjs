'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function ArticlePage() {
  return (
    <ArticleFrame slug="mastering-spx-option-selling-strategies-variance-risk-premium">
      <div className="space-y-12">
        <InfographicSlot alt="SPX Option Selling Strategies Infographic" />

        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The Variance Risk Premium (VRP) exists because institutional investors systematically overpay for out-of-the-money puts to hedge downside risk.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Regime indicators like the VIX/VXV term structure (targeting a &gt;1.25 ratio) and the 10:00 AM EST Morning VVIX anomaly dramatically improve entry timing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Filtered mean-reverting indicators (e.g., 5-day RSI &lt; 35 in an uptrend) optimize tactical entries and minimize directional risk.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Strict binary rules—such as halting all selling when the SPX closes below its 200-DMA or when High Yield credit spreads widen—are mandatory to avoid tail-risk ruin.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>A dynamic VIX-Kelly model with an emphasis on ultra-short-dated options (0-5 DTE) significantly improves the risk-adjusted Information Ratio by isolating theta decay.</span>
            </li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Foundation: Harvesting Volatility
          </h2>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
            <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">The Variance Risk Premium (VRP)</h3>
            <div className="space-y-4 mb-6 text-slate-700 dark:text-slate-300">
              <p>
                Selling options on the S&P 500 (SPX) is essentially <strong>underwriting systemic tail risk</strong>. Just as an insurance company collects premiums to cover rare disasters, option sellers collect yields for absorbing market volatility shocks.
              </p>
              <p>
                The mathematical engine behind this strategy is the <strong>Variance Risk Premium (VRP)</strong>. It is the well-documented phenomenon where the market's expectation of future volatility (Implied Volatility) consistently overestimates the actual volatility that occurs (Realized Volatility).
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
                <span className="text-sm font-serif tracking-wider text-slate-500 dark:text-slate-400 mb-1">Historical VIX Average</span>
                <span className="text-3xl font-mono font-bold mb-1">~19.6%</span>
                <span className="text-xs">Implied Volatility (Expected Risk)</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
                <span className="text-sm font-serif tracking-wider text-slate-500 dark:text-slate-400 mb-1">Historical Realized Vol</span>
                <span className="text-3xl font-mono font-bold mb-1">~15.5%</span>
                <span className="text-xs">Actual S&P 500 Movement</span>
              </div>
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 flex flex-col justify-center">
                <span className="text-sm font-serif tracking-wider text-[#1D8A70] dark:text-[#3CBF9C] mb-1">The VRP Edge</span>
                <span className="text-3xl font-mono font-bold mb-1 text-[#1D8A70] dark:text-[#3CBF9C]">~4.1%</span>
                <span className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]">Persistent Gross Premium</span>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-r-lg border-l-4 border-slate-400 dark:border-slate-500 text-slate-800 dark:text-slate-200">
              <h4 className="font-serif font-bold text-lg mb-2">Why does this premium exist?</h4>
              <p className="text-sm">
                Institutional investors, pension funds, and long-only managers have a highly inelastic demand for downside protection. Because they fear sudden market crashes, they are willing to <strong>overpay for out-of-the-money (OTM) put options</strong>. The option seller acts as a liquidity provider, earning the VRP as compensation for taking on this structural fear.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            When to Sell: Volatility Regime Indicators
          </h2>
          <p className="mb-8">
            Absolute VIX levels aren't enough. We must look at the term structure and the volatility of volatility to optimize entry.
          </p>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">The VIX/VXV Ratio</h3>
              <p className="mb-6 text-slate-700 dark:text-slate-300">
                A robust indicator for timing SPX option sales is the term structure of volatility, specifically the ratio between the 1-month VIX and the 3-month VXV.
              </p>
              
              <ComparisonGrid>
                <ComparisonCard title="Normal Market (Contango)" tone="pos">
                  <p className="font-mono text-lg mb-2 text-[#1D8A70] dark:text-[#3CBF9C]">Ratio &lt; 1.0</p>
                  <p>Near-term fear is low. Represents a standard environment for VRP harvesting.</p>
                </ComparisonCard>
                <ComparisonCard title="Panic (Backwardation)" tone="neg">
                  <p className="font-mono text-lg mb-2 text-[#BC4128] dark:text-[#E2694A]">Ratio &gt; 1.0</p>
                  <p>Short-term fear eclipses medium-term expectations. Signals heightened systemic stress.</p>
                </ComparisonCard>
              </ComparisonGrid>
              
              <div className="mt-6 p-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-xl border border-[#A8672E]/30 dark:border-[#D08F52]/30">
                <p className="font-serif text-[#A8672E] dark:text-[#D08F52] font-semibold mb-1">The Ultimate Entry Signal:</p>
                <p className="text-sm">A VIX/VXV ratio spike <strong>above 1.25</strong> is historically one of the most reliable indicators of peak market fear. Selling options here captures massive premium right before a "vol crush."</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">Morning VVIX Anomaly</h3>
              <p className="mb-4 text-slate-700 dark:text-slate-300">
                The VVIX measures the implied volatility of the VIX itself. Groundbreaking research shows a profound anomaly regarding <em>when</em> we look at this metric.
              </p>
              <p className="mb-6 text-slate-700 dark:text-slate-300">
                At exactly <strong>10:00 AM EST</strong>, during the US/European market overlap, institutional investors assess global volatility. Because the broader market underreacts, this "Morning VVIX" predicts next-day variance returns with incredible accuracy.
              </p>
              
              <ComparisonGrid>
                <ComparisonCard title="VVIX &lt; 75th Percentile" tone="pos">
                  <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold tracking-wide">AGGRESSIVE SELL</p>
                  <p className="text-sm mt-2">Optimal conditions to systematically sell premium.</p>
                </ComparisonCard>
                <ComparisonCard title="VVIX &gt; 75th Percentile" tone="neg">
                  <p className="text-[#BC4128] dark:text-[#E2694A] font-bold tracking-wide">HALT SELLING</p>
                  <p className="text-sm mt-2">Extreme volatility of volatility signals structural instability.</p>
                </ComparisonCard>
              </ComparisonGrid>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Tactical Entries: Mean Reverting Indicators
          </h2>
          <p className="mb-8">
            Option selling has negative gamma. Entering trades at the localized exhaustion point of a price move minimizes directional risk.
          </p>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">Short-Term RSI & Bollinger Bands</h3>
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              The standard 14-day RSI is too slow for SPX options. Quantitative backtesting reveals that <strong>shortened lookback periods (2 to 6 days)</strong> are vastly superior for isolating short-term mean-reversion bounces within a broader uptrend.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <h4 className="font-serif font-bold text-slate-900 dark:text-slate-100 mb-3">
                  Filtered 5-Day RSI Strategy
                </h4>
                <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li><strong>Entry Rule:</strong> 5-day RSI &lt; 35</li>
                  <li><strong>Macro Filter:</strong> Price &gt; 200 DMA</li>
                  <li><strong>Exit Rule:</strong> RSI crosses &gt; 50</li>
                  <li className="pt-2 border-t border-slate-200 dark:border-slate-600 mt-2 font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C]">Win Rate: 81%</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <h4 className="font-serif font-bold text-slate-900 dark:text-slate-100 mb-3">
                  Synergistic Filter Setup
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Combine RSI with Bollinger Bands (20-period, 2 StdDev) for ultimate precision.
                </p>
                <p className="text-sm font-mono text-[#A8672E] dark:text-[#D08F52] bg-white dark:bg-gray-900 px-3 py-2 rounded shadow-sm border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                  Signal = Price pierces Lower BB AND RSI &lt; 30.
                </p>
              </div>
            </div>

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-4 rounded-r-lg">
              <h4 className="font-serif font-bold text-[#BC4128] dark:text-[#E2694A] text-lg mb-2">The Bollinger Squeeze Warning</h4>
              <p className="text-sm text-slate-800 dark:text-slate-200">
                Avoid selling premium when Bollinger Bands contract to historical minimums (a "squeeze"). This signals an imminent, violent breakout. The subsequent expansion in implied volatility will drastically increase option values, resulting in severe mark-to-market losses.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Survival: Macroeconomic Trend Filters
          </h2>
          <p className="mb-8">
            The Achilles heel of put-writing is a structural bear market. You must have binary rules to turn the strategy off.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">The 200-Day SMA</h3>
              <p className="mb-6 text-slate-700 dark:text-slate-300">
                The 200-day Simple Moving Average establishes the macroeconomic regime. Mean-reversion indicators will fail continuously during an extended bear market, driving through short strikes.
              </p>
              <div className="bg-slate-900 dark:bg-black text-white p-5 rounded-xl text-center shadow-inner mt-auto">
                <p className="text-sm font-serif tracking-widest text-slate-400 mb-2">The Binary Rule</p>
                <p className="font-bold">
                  If SPX Closes &lt; 200-Day SMA:<br/>
                  <span className="text-[#BC4128] dark:text-[#E2694A] text-lg mt-2 inline-block">SUSPEND ALL PUT WRITING</span>
                </p>
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                SPX volatility averages ~1.05% above the 200-DMA, but doubles to ~2.1% below it. Turning the engine off avoids fat-tailed outcomes that destroy portfolios.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">High Yield Credit Spreads</h3>
              <p className="mb-6 text-slate-700 dark:text-slate-300">
                The ICE BofA U.S. High Yield Index Option-Adjusted Spread (OAS) measures the extra yield demanded to lend to junk-rated corporations. It is the market's real-time price for liquidity and default risk.
              </p>
              
              <div className="space-y-4 mt-auto">
                <div className="p-4 rounded-xl border border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-[#BC4128]/5 dark:bg-[#E2694A]/5">
                  <p className="font-serif font-bold text-[#BC4128] dark:text-[#E2694A] mb-1">Widening Spreads</p>
                  <p className="text-sm">(e.g., 250bp to 400bp): Indicates deteriorating liquidity and rising systemic stress. Equity crashes become highly probable. <strong>Halt trading.</strong></p>
                </div>
                <div className="p-4 rounded-xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/5">
                  <p className="font-serif font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">Tight/Compressing Spreads</p>
                  <p className="text-sm">Confirms a supportive macroeconomic backdrop. Safe to harvest the VRP.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Capital Allocation: Advanced Sizing & 0DTE
          </h2>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">The Hybrid VIX-Kelly Model</h3>
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              Even with perfect timing, incorrect position sizing is the primary cause of absolute ruin due to the convex risk of short options. While the theoretical Kelly Criterion maximizes growth, it is too dangerous for options because it assumes a stationary market.
            </p>

            <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-6 rounded-xl border border-[#A8672E]/20 dark:border-[#D08F52]/20 mb-8">
              <h4 className="font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 text-lg">The Solution: Dynamic VIX-Rank Sizing</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
                Developed in recent quantitative research, this model scales the optimal Kelly fraction based on the real-time VIX percentile rank.
              </p>
              
              <ComparisonGrid>
                <ComparisonCard title="Complacent Low VIX" tone="pos">
                  <p className="font-mono text-sm mb-2 text-[#1D8A70] dark:text-[#3CBF9C]">Multiplier approaches 1.</p>
                  <p className="text-xs">Optimal Kelly efficiency utilized.</p>
                </ComparisonCard>
                <ComparisonCard title="Extreme VIX Highs" tone="neg">
                  <p className="font-mono text-sm mb-2 text-[#BC4128] dark:text-[#E2694A]">Multiplier approaches 0.</p>
                  <p className="text-xs">Forces strategy to deleverage to protect against tail events.</p>
                </ComparisonCard>
              </ComparisonGrid>
            </div>

            <h4 className="font-serif font-bold text-slate-900 dark:text-slate-100 mb-4 text-xl">Optimal Option Structure (Wysocki Research)</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-serif border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3">Strategy Structure</th>
                    <th className="p-3">VIX Memory</th>
                    <th className="p-3">Estimator</th>
                    <th className="p-3">Max Drawdown</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-mono">
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="p-3 font-semibold">0 DTE, 0% OTM</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">21 Days</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">Garman-Klass</td>
                    <td className="p-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">9.47%</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <td className="p-3 font-semibold">3 DTE, 0% OTM</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">21 Days</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">Yang-Zhang</td>
                    <td className="p-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">8.77%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">3 DTE, 2% OTM</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">21 Days</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">Garman-Klass</td>
                    <td className="p-3 font-bold text-[#BC4128] dark:text-[#E2694A]">36.58%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-r-lg border-l-4 border-slate-400 dark:border-slate-500 text-slate-800 dark:text-slate-200">
              <h4 className="font-serif font-bold text-lg mb-2">The 0DTE Reality</h4>
              <p className="text-sm">
                Over 51% of total SPX options volume is now Zero Days to Expiration (0DTE). The absolute best risk-adjusted returns are generated by ultra-short-dated options (0 to 5 DTE) written 5% to 10% Out-Of-The-Money. This drastically improves the Information Ratio by curtailing downside tail risk while capturing immense theta decay.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
