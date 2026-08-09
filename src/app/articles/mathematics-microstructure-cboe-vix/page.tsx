'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { InlineMath } from '@/components/articles/math';
import { Jargon, ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function VIXMathematicsArticle() {
  return (
    <ArticleFrame slug="mathematics-microstructure-cboe-vix">
      <div className="space-y-12">
        <InfographicSlot alt="VIX Mathematics Infographic" />

        <div className="bg-white dark:bg-slate-900 border border-[#A8672E]/20 dark:border-[#D08F52]/20 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The VIX is not a "fear gauge" but a rigorous mathematical construct representing forward-looking 30-day statistical variance derived from SPX options.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Variance replication relies on synthesizing a <Jargon term="log contract" definition="A theoretical contract used to replicate realized variance, maintaining a constant aggregate dollar gamma across the portfolio." /> by weighting out-of-the-money options inversely proportional to the square of their strike prices.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The VIX futures market suffers from structural contango, causing long-volatility ETPs to face severe capital depreciation over time due to roll decay.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Quantitative market making requires hedging the "Greek Trinity" of volatility derivatives: Vega, Vanna, and Volga, which govern sensitivity to implied volatility shifts.</span>
            </li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Introduction to the VIX
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span><strong>Core Definition:</strong> The Chicago Board Options Exchange (Cboe) Volatility Index, globally recognized as the <strong>VIX</strong>, measures the 30-day expected volatility of the U.S. stock market.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span><strong>Underlying Engine:</strong> It derives its value strictly from the real-time prices of S&P 500 Index (SPX) options across a wide range of strike prices.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span><strong>Historical Evolution:</strong> Introduced in 1993 using Black-Scholes implied volatility (on the S&P 100), it was fundamentally updated in 2003 in partnership with Goldman Sachs to utilize a robust, model-free formula.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span><strong>Beyond the "Fear Gauge":</strong> While popular media calls it a sentiment indicator, it is purely a mathematical construct representing forward-looking statistical variance, serving as the foundation for a massive ecosystem of futures and ETPs.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Rigorous Mathematics of Variance Replication
          </h2>
          <p className="mb-6">
            To deconstruct the VIX, one must examine variance swaps. The VIX is fundamentally a discrete approximation of a 30-day variance swap's fair strike. Variance replication is rooted in continuous-time stochastic calculus:
          </p>
          
          <div className="space-y-8">
            <div>
              <p className="mb-4">Assuming an asset price <InlineMath math="S_t" /> follows a continuous diffusion process:</p>
              <FormulaPanel title="Continuous Diffusion Process" formula="\frac{dS_t}{S_t} = \mu_t dt + \sigma_t dW_t" />
            </div>

            <div>
              <p className="mb-4">Applying Ito's Lemma to the natural logarithm of the asset price, and subtracting it from the standard percentage return, neatly isolates the variance:</p>
              <FormulaPanel title="Instantaneous Variance" formula="\frac{dS_t}{S_t} - d(\ln S_t) = \frac{1}{2} \sigma_t^2 dt" />
            </div>

            <div>
              <p className="mb-4">Integrating this formula over a defined time horizon (from 0 to T) gives the total realized variance:</p>
              <FormulaPanel title="Total Realized Variance" formula="V = \int_{0}^{T} \sigma_t^2 dt = 2 \int_{0}^{T} \frac{dS_t}{S_t} - 2 \ln\left(\frac{S_T}{S_0}\right)" />
            </div>
            
            <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                The Log Contract & 1/K² Weighting
              </h3>
              <p>
                The integral proves that realized variance can be replicated using a dynamic trading strategy (1/Sₜ shares) and a static short position in a theoretical 'log contract'. To synthesize this log contract, a continuous strip of out-of-the-money options is used. Every option must be weighted inversely proportional to the square of its strike price (1/K²). This precise weighting maintains a constant aggregate dollar gamma across the entire portfolio, isolating the exposure strictly to realized volatility.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The VIX Index Calculation Methodology
          </h2>
          <p className="mb-6">
            Modern financial markets do not offer an infinite, continuous continuum of option strikes. Thus, the continuous variance integral is approximated using a discrete summation of available SPX options:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The methodology utilizes a generalized variance formula for a single expiration strip.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>It exclusively selects out-of-the-money (OTM) calls and puts to formulate the replication.</span>
            </li>
          </ul>

          <FormulaPanel title="Discrete Variance Approximation (VIX)" formula="\sigma^2 = \frac{2}{T} \sum_{i} \frac{\Delta K_i}{K_i^2} e^{RT} Q(K_i) - \frac{1}{T} \left[\frac{F}{K_0} - 1\right]^2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-2">Forward Price (F) & ATM Strike (<InlineMath math="K_0" />)</h4>
              <p className="text-sm">
                The algorithm determines the forward index level by finding the strike where the absolute difference between call and put mid-quotes is minimized. The strike immediately at or below F becomes the anchor, <InlineMath math="K_0" />.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-2">The Zero-Bid Rule</h4>
              <p className="text-sm">
                Traversing outward from <InlineMath math="K_0" />, OTM puts and calls are selected. If two consecutive strike prices exhibit a zero bid, the algorithm terminates selection in that direction permanently.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-2">Option Weighting (<InlineMath math="\Delta K_i / K_i^2" />)</h4>
              <p className="text-sm">
                Each option's mid-quote <InlineMath math="Q(K_i)" /> is scaled by half the distance to adjacent strikes (<InlineMath math="\Delta K_i" />) and divided by the square of its strike to establish the required constant-gamma replication matrix.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-2">Variance Subtraction Term</h4>
              <p className="text-sm">
                Because the discrete <InlineMath math="K_0" /> rarely perfectly aligns with the continuous forward price F, a penalty term mathematically compensates for the centering error of a rigid strike grid.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-serif text-slate-900 dark:text-slate-100 mt-10 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            30-Day Interpolation
          </h3>
          <p className="mb-6">
            The VIX calculates "near-term" (23+ days) and "next-term" (less than 37 days) variance points. It minute-by-minute interpolates between these to maintain a strictly constant 30-day target:
          </p>
          <FormulaPanel title="30-Day Interpolation" formula="VIX = 100 \times \sqrt{ \left[ T_1 \sigma_1^2 + T_2 \sigma_2^2 \right] \times \frac{N_{365}}{N_{30}} }" />
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Derivatives Market Structure & Scale
          </h2>
          <p className="mb-6">
            The VIX derivatives market operates at a monumental scale. In 2025, the broader U.S. options ecosystem traded 61 million contracts daily. Within this, the VIX ecosystem provides highly efficient mechanisms to isolate, trade, and hedge pure equity volatility.
          </p>
          
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 mt-6">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                  <th className="p-4 font-semibold">Derivative / Asset Class</th>
                  <th className="p-4 font-semibold">Average Daily Volume</th>
                  <th className="p-4 font-semibold">Typical Open Interest</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">SPX Options</td>
                  <td className="p-4 font-mono tabular-nums">~ 3,900,000</td>
                  <td className="p-4 font-mono tabular-nums">&gt; 15,000,000</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-[#A8672E]/10 dark:bg-[#D08F52]/10">
                  <td className="p-4 font-medium text-[#A8672E] dark:text-[#D08F52]">VIX Options</td>
                  <td className="p-4 font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">~ 858,000</td>
                  <td className="p-4 font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">~ 13,400,000</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-[#A8672E]/10 dark:bg-[#D08F52]/10">
                  <td className="p-4 font-medium text-[#A8672E] dark:text-[#D08F52]">VIX Futures (VX)</td>
                  <td className="p-4 font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">~ 263,000</td>
                  <td className="p-4 font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">~ 410,000 - 522,000</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">VIX Mini Futures (VXM)</td>
                  <td className="p-4 font-mono tabular-nums">~ 4,300</td>
                  <td className="p-4 font-mono tabular-nums">~ 6,600</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="font-serif text-xl text-slate-900 dark:text-slate-100 mb-3">Exchange-Traded Products (ETPs)</h3>
            <p className="mb-4">
              Since the spot VIX is mathematically untradable, ETPs synthesize exposure by mechanically rolling short-term VIX futures:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-slate-100 block mb-2 text-lg font-serif">VXX (Standard)</strong>
                <span className="text-sm leading-relaxed block">
                  Provides standard 1x long exposure, maintaining a constant 30-day maturity. Holds $500M+ AUM.
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-slate-100 block mb-2 text-lg font-serif">UVXY (Leveraged)</strong>
                <span className="text-sm leading-relaxed block">
                  Amplifies daily movements (e.g., 1.5x) for aggressive, extremely short-term tactical trading.
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-slate-100 block mb-2 text-lg font-serif">SVXY (Inverse)</strong>
                <span className="text-sm leading-relaxed block">
                  Provides short exposure, profiting when volatility drops or remains stable by harvesting <Jargon term="contango" definition="A situation where the futures price of a commodity is higher than the spot price, leading to roll decay for long positions." />.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Trading Heuristics & Term Structure
          </h2>
          <ComparisonGrid>
            <ComparisonCard title="The Rule of 16" tone="pos">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1.5 flex-none">•</span>
                  <span><strong>The Math:</strong> Traders divide the VIX index value by 16 (the approximate square root of 252 trading days in a year).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1.5 flex-none">•</span>
                  <span><strong>The Meaning:</strong> This instantly converts the annualized volatility reading into a daily expected percentage move for the S&P 500.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1.5 flex-none">•</span>
                  <span><strong>Example:</strong> A VIX reading of 16 implies the options market anticipates average daily fluctuations of exactly 1.0% (16 / 16). A VIX of 32 anticipates 2.0% daily moves.</span>
                </li>
              </ul>
            </ComparisonCard>
            
            <ComparisonCard title="Contango & Roll Decay" tone="neg">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>Market Structure:</strong> The VIX futures curve spends roughly 75-80% of its lifespan in "contango"—meaning longer-dated futures are priced higher than near-term ones.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>The Catalyst:</strong> This pricing structure exists to reflect the Volatility Risk Premium (VRP), compensating the sellers of tail-risk insurance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>The Consequence:</strong> Long-volatility ETPs (like VXX) must continuously sell cheaper front-month futures to buy expensive second-month ones. This causes severe, structural capital depreciation over time.</span>
                </li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Quantitative Market Making & Higher-Order Greeks
          </h2>
          <p className="mb-8">
            Market makers hedge VIX Delta using VIX futures, not shares. However, standard Black-Scholes Delta hedging is insufficient. They must manage the "Greek Trinity" of volatility derivatives:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="text-[#A8672E] dark:text-[#D08F52] font-mono text-2xl mb-2">ν</div>
              <h4 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-2">Vega</h4>
              <p className="text-sm">
                Measures absolute sensitivity to parallel 1% shifts in implied volatility. Neutralized via variance swaps or correlated futures.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="text-[#A8672E] dark:text-[#D08F52] font-mono text-2xl mb-2">Va</div>
              <h4 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-2">Vanna</h4>
              <p className="text-sm">
                Change in Delta per 1-point change in implied volatility. Dictates how aggressively a market maker's Delta drifts during a concurrent spot drop and vol surge.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="text-[#A8672E] dark:text-[#D08F52] font-mono text-2xl mb-2">Vo</div>
              <h4 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-2">Volga (Vomma)</h4>
              <p className="text-sm">
                Second-order sensitivity: the rate of change of Vega with respect to IV changes. Reflects convexity. High-volga options compound sensitivity as vol rises.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
            <h4 className="font-serif text-lg text-[#A8672E] dark:text-[#D08F52] mb-2">
              Vanna-Volga Pricing Matrix
            </h4>
            <p className="text-sm">
              Traders construct the Vega-Gamma-Vanna-Volga (VGVV) implied volatility surface using three benchmarks: an <strong>ATM Straddle</strong> (baseline Vega), a <strong>25-Delta Risk Reversal</strong> (Vanna/skew), and a <strong>25-Delta Butterfly</strong> (Volga/kurtosis tails).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Calibration Puzzles & Microstructure Shocks
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl text-slate-900 dark:text-slate-100 mb-4">The Joint Calibration Problem</h3>
              <p className="mb-4">
                Constructing a single model that prices SPX and VIX options simultaneously without arbitrage is notoriously difficult. Quants have evolved their approaches significantly:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
                  <span><strong>Traditional Models (Heston):</strong> Standard Markovian models generally fail at capturing the aggressive, steep VIX skew observed in live markets.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
                  <span><strong>Rough Bergomi (rBergomi):</strong> Modern models utilize fractional Brownian motion (with a Hurst parameter &lt; 0.5) to accurately capture violent, rapid mean-reversion in volatility.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
                  <span><strong>Martingale Optimal Transport (MOT):</strong> An advanced entropic, model-free approach that formulates discrete Gibbs distributions to achieve flawless surface calibration.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-900 border border-[#BC4128]/30 dark:border-[#E2694A]/30 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[#BC4128] dark:text-[#E2694A] mb-4 border-b border-[#BC4128]/20 dark:border-[#E2694A]/20 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                Case Study: The August 2024 Surge
              </h3>
              <p className="mb-4">
                On August 5, 2024, at 3:15 AM EST, the VIX stood at 23.9. Within 15 seconds, it rocketed to 42, ultimately surging past 65 by 8:30 AM (a 180% intraday jump). Curiously, front-month futures stayed below 35. What happened mechanically?
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>Zero-Bid Evasion:</strong> Panic bidding for exceptionally deep OTM puts (down to 1,400 strike) circumvented the calculation's zero-bid termination rule.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>Liquidity Collapse:</strong> Market makers withdrew, causing put mid-quotes <InlineMath math="Q(K_i)" /> to swell massively. A 3,500 strike put jumped from $0.70 to $50.25.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>Weighting Magnification:</strong> The <InlineMath math="1/K^2" /> weighting heavily multiplied these inflated mid-quotes, catapulting the index mechanically.</span>
                </li>
              </ul>
              <p className="font-semibold text-[#BC4128] dark:text-[#E2694A] italic">
                Conclusion: The VIX acts as a measure of option market liquidity and dealer risk aversion just as much as it arbitrates true statistical variance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
