'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { FormulaPanel, LevelLadder } from '@/components/articles/article-visuals';

const Jargon = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <span
        className="border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] transition-colors"
        tabIndex={0}
      >
        {term}
      </span>
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 shadow-xl rounded-md border border-gray-200 dark:border-gray-700 z-10 pointer-events-none font-sans text-left">
          {definition}
          <svg className="absolute text-white dark:text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </span>
      )}
    </span>
  );
};

export default function GammaExposureArticle() {
  return (
    <ArticleFrame
      slug="gamma-exposure-gex-gps-market-volatility"
      additionalDisclaimer="GEX is a derived metric and should be used in conjunction with other analysis, not as a standalone signal. Options trading involves substantial risk and is not suitable for all investors."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100 font-sans bg-transparent">

        <section className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
                <span>GEX highlights critical price levels based on <Jargon term="Open Interest" definition="The total number of outstanding derivative contracts that have not been settled for an asset." /> and option gamma.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
                <span>It acts as a map of where <Jargon term="Market Makers" definition="Institutional dealers providing liquidity who must hedge their option exposure by buying or selling the underlying stock." /> must buy or sell the underlying asset to remain market-neutral.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
                <span>High absolute GEX levels form hidden zones of support or resistance.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
                <span>The shift between positive and negative GEX fundamentally alters the market&apos;s volatility regime.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-6">Market Regimes</h2>
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white dark:bg-gray-900 border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[#1D8A70] dark:text-[#3CBF9C] mb-4 border-b border-[#1D8A70]/20 dark:border-[#3CBF9C]/20 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                Positive GEX (Long Gamma)
              </h3>
              <ul className="space-y-4 text-sm md:text-base">
                <li>
                  <strong>Market Maker Stance:</strong> Dealers are long <Jargon term="Gamma" definition="The rate of change of an option's Delta for a 1-point move in the underlying asset's price." />.
                </li>
                <li>
                  <strong>Hedging Action:</strong> Dealers buy the underlying when prices fall and sell when prices rise.
                </li>
                <li>
                  <strong>Market Impact:</strong> Creates a <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">stabilizing</span> effect. Price movements are dampened.
                </li>
                <li>
                  <strong>Volatility:</strong> Suppressed and generally low.
                </li>
                <li>
                  <strong>Behavior:</strong> Mean-reversion. Prices tend to trade in tighter ranges around major strike levels.
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-[#BC4128]/30 dark:border-[#E2694A]/30 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[#BC4128] dark:text-[#E2694A] mb-4 border-b border-[#BC4128]/20 dark:border-[#E2694A]/20 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                Negative GEX (Short Gamma)
              </h3>
              <ul className="space-y-4 text-sm md:text-base">
                <li>
                  <strong>Market Maker Stance:</strong> Dealers are short Gamma.
                </li>
                <li>
                  <strong>Hedging Action:</strong> Dealers sell the underlying when prices fall and buy when prices rise.
                </li>
                <li>
                  <strong>Market Impact:</strong> Creates a <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold">volatile</span> effect. Price movements are exacerbated.
                </li>
                <li>
                  <strong>Volatility:</strong> Elevated and prone to rapid expansion.
                </li>
                <li>
                  <strong>Behavior:</strong> Trend-continuation and larger intraday swings. Support/resistance levels break more easily.
                </li>
              </ul>
            </div>

          </div>
        </section>

        <InfographicSlot
          src="https://i.imgur.com/4FiUTqH.jpeg"
          alt="Gamma Exposure (GEX)"
          label="Featured Infographic"
        />

        <section className="mb-12">
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-6">Calculating Gamma Exposure</h2>
          <p className="mb-4">
            GEX estimates the dollar value required for dealers to hedge a 1% move in the underlying security. It isolates the <Jargon term="Delta" definition="The expected change in an option's price given a 1-point move in the underlying asset." /> change caused specifically by Gamma.
          </p>

          <div className="mb-4">
            <FormulaPanel
              formula="\text{GEX} = \sum_{i} \left( \Gamma_i \times \text{OI}_i \times C \times S \times 1\% \right)"
              legend="Γᵢ = gamma at strike i · OIᵢ = open interest at strike i · C = contract multiplier · S = spot price"
              example={{
                label: 'Illustrative Example — single call strike',
                rows: [
                  { label: 'Given', value: 'Γ = 0.05 · OI = 10,000 · C = 100 shares · S = $4,000 (1% move = $40)' },
                  { label: 'GEX', value: '0.05 × 10,000 × 100 × 4,000 × 1%' },
                ],
                result: { value: '$2,000,000 per 1% move' },
                note: 'For a 1% move in the underlying, market makers must hedge roughly $2,000,000 of notional exposure from this single strike alone.',
              }}
            />
          </div>
        </section>

        <section className="mb-4">
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-6">Practical Strategies for Investors</h2>

          <div className="space-y-8">

            <div>
              <h3 className="font-serif text-2xl text-[#A8672E] dark:text-[#D08F52] mb-3">Identifying the &ldquo;Zero Gamma&rdquo; Level</h3>
              <p className="mb-3">
                The <Jargon term="Zero Gamma" definition="The underlying price level where aggregate market Gamma exposure flips from positive to negative." /> level acts as the definitive line in the sand for shifting market environments.
              </p>
              <LevelLadder
                caption="Illustrative example scenario — not live data."
                points={[
                  { label: 'Put Wall', value: '$4,450', position: 0, tone: 'neg' },
                  { label: 'Zero Gamma', value: '$4,510', position: 60, tone: 'neutral' },
                  { label: 'Call Wall', value: '$4,550', position: 100, tone: 'pos' },
                ]}
              />
              <ul className="list-disc pl-6 space-y-2 marker:text-[#A8672E] dark:marker:text-[#D08F52]">
                <li><strong>Action:</strong> Monitor daily GEX profiles to find where the absolute GEX flips from positive to negative.</li>
                <li><strong>Strategy:</strong> Treat the Zero Gamma level as a critical pivot point. Transitions across this line often signal a shift in trading style from range-bound to momentum.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Trading in a Positive GEX Environment</h3>
              <p className="mb-3">
                When total GEX is highly positive, dealers are actively suppressing volatility.
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-[#1D8A70] dark:marker:text-[#3CBF9C]">
                <li><strong>Strategy:</strong> Favor mean-reversion and range-trading strategies.</li>
                <li><strong>Action:</strong> Sell options to collect premium (e.g., Iron Condors), as realized volatility is likely to underperform implied volatility.</li>
                <li><strong>Support/Resistance:</strong> Heavily rely on strikes with massive Open Interest; they will act as sticky magnets pinning the price.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[#BC4128] dark:text-[#E2694A] mb-3">Trading in a Negative GEX Environment</h3>
              <p className="mb-3">
                When total GEX falls below zero, dealer hedging creates a feedback loop of directional momentum.
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-[#BC4128] dark:marker:text-[#E2694A]">
                <li><strong>Strategy:</strong> Favor trend-following, momentum, and breakout strategies.</li>
                <li><strong>Action:</strong> Purchase options for directional trades or to hedge long portfolios, as violent price swings become more probable.</li>
                <li><strong>Support/Resistance:</strong> Do not trust traditional support levels. Negative GEX environments are prone to &ldquo;trapdoor&rdquo; drops and rapid short-covering rallies.</li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
