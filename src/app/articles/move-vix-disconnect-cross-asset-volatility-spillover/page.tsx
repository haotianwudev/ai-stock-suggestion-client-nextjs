'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';

// Reusable Tooltip Component for Jargon
const Jargon = ({ term, definition }: { term: string; definition: string }) => {
  return (
    <span
      className="relative group inline-block border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] cursor-help transition-colors font-medium"
      tabIndex={0}
      aria-label="Glossary term"
    >
      {term}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus:block w-64 p-3 bg-slate-900 dark:bg-slate-800 text-slate-100 dark:text-slate-200 text-xs rounded-lg shadow-xl z-20 font-sans pointer-events-none text-left border border-slate-700">
        {definition}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></span>
      </span>
    </span>
  );
};

export default function VolatilitySpilloverPage() {
  return (
    <ArticleFrame
      slug="move-vix-disconnect-cross-asset-volatility-spillover"
      additionalDisclaimer="The MOVE and VIX indices measure distinct asset classes under fundamentally different mathematical conventions. Cross-asset volatility models and relative-value arbitrage strategies involve substantial market, convexity, and liquidity risks. This content is for quantitative educational purposes only."
    >
      <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8 font-sans text-slate-900 dark:text-slate-100 bg-transparent">
        {/* Compact Stat Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Rate Hike Probability</p>
            <p className="font-mono tabular-nums text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A]">60%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">25-basis-point (Sept)</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">US Unemployment</p>
            <p className="font-mono tabular-nums text-2xl font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">4.1%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Resilient labor market</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">0DTE Options Volume</p>
            <p className="font-mono tabular-nums text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A]">&gt;60%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Of total US equity volume</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Normalized Ratio</p>
            <p className="font-mono tabular-nums text-2xl font-semibold text-slate-700 dark:text-slate-300">3.0 - 5.0</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Historical MOVE/VIX band</p>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4 text-slate-900 dark:text-white">Executive Summary</h2>
          <div className="bg-slate-50 dark:bg-slate-900 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-5 rounded-r-lg shadow-sm">
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                A historic dislocation has emerged between fixed-income (
                <Jargon
                  term="MOVE index"
                  definition="Tracks implied yield volatility across the U.S. Treasury curve using ATM options"
                />
                ) and equity implied volatility (
                <Jargon
                  term="VIX"
                  definition="Measures 30-day implied volatility on the S&P 500 using a strip of OTM options"
                />
                ).
              </li>
              <li>
                The Treasury market is pricing acute macroeconomic uncertainty, while the VIX remains artificially suppressed by structural market plumbing changes.
              </li>
              <li>
                The proliferation of{' '}
                <Jargon
                  term="0DTE options"
                  definition="Zero-day-to-expiration options, currently making up over 60% of total volume"
                />{' '}
                has fundamentally blinded the 30-day VIX, masking deep systemic fragility.
              </li>
              <li>
                Once rate volatility breaches a critical threshold, mechanical deleveraging threatens systematic volatility-targeting and risk-parity portfolios.
              </li>
              <li>
                Macro trading desks have lucrative relative-value arbitrage opportunities, assuming central bank forward guidance remains credible and tail convexity is hedged.
              </li>
            </ul>
          </div>
        </section>

        {/* Macro Catalyst */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4 text-slate-900 dark:text-white">The Macroeconomic Catalyst</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-4">
            <li>Earlier consensus heavily favored an extended pause or an aggressive easing cycle.</li>
            <li>Persistent inflationary pressures and hawkish forward guidance from Jackson Hole completely upended forecasts.</li>
            <li>Fixed-income markets are rapidly pricing in systemic risks of a hawkish policy error (spike in MOVE).</li>
            <li>Equities project an illusion of calm due to structural changes in plumbing and mechanical hedging.</li>
          </ul>
        </section>

        {/* Mathematical Foundations */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4 text-slate-900 dark:text-white">Mathematical Foundations</h2>
          
          {/* Dichotomy Card: VIX vs MOVE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900/50 shadow-sm">
              <h3 className="font-serif text-xl mb-3 text-[#1D8A70] dark:text-[#3CBF9C] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] flex-none" />
                Cboe VIX Index (Equities)
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Asset:</strong> S&amp;P 500 Index</li>
                <li><strong>Moneyness:</strong> Full strip of Out-Of-The-Money (OTM) options</li>
                <li><strong>Model:</strong> Model-Free Variance Swap Replication</li>
                <li><strong>Expression:</strong> Percentage (lognormal standard deviation)</li>
                <li><strong>Time Horizon:</strong> Interpolated to exactly 30 days</li>
              </ul>
            </div>
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900/50 shadow-sm">
              <h3 className="font-serif text-xl mb-3 text-[#BC4128] dark:text-[#E2694A] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#BC4128] dark:bg-[#E2694A] flex-none" />
                ICE BofA MOVE Index (Rates)
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Asset:</strong> U.S. Treasury Yields (2Y, 5Y, 10Y @ 40%, 30Y)</li>
                <li><strong>Moneyness:</strong> At-The-Money (ATM) only</li>
                <li><strong>Model:</strong> Bachelier (Normal) Implied Volatility</li>
                <li><strong>Expression:</strong> Absolute change in Basis Points</li>
                <li><strong>Time Horizon:</strong> 1-month to expiration</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            {/* VIX Formula */}
            <div>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                The VIX calculates 30-day variance using a discrete approximation formula weighting deep OTM puts (proxy for negative skewness):
              </p>
              <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg shadow-inner text-white">
                <MathBlock math="\sigma^2 = \frac{2}{T} \sum_{i} \frac{\Delta K_i}{K_i^2} e^{RT} Q(K_i) - \frac{1}{T}\left[\frac{F}{K_0} - 1\right]^2" />
                <div className="mt-2 pt-2 border-t border-slate-800 flex justify-center">
                  <MathBlock math="\text{VIX} = 100 \times \sqrt{\sigma^2}" />
                </div>
              </div>
            </div>

            {/* MOVE Formula */}
            <div>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                The MOVE index relies on the{' '}
                <Jargon
                  term="Bachelier model"
                  definition="Mathematical framework utilizing normal/absolute yield volatility instead of lognormal, allowing for negative rates"
                />
                , where forward yield (<span className="font-mono">F_t</span>) follows arithmetic Brownian motion:
              </p>
              <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg shadow-inner text-white">
                <MathBlock math="dF_t = \sigma_n \, dW_t" />
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <MathBlock math="C_n(K) = (F_0 - K)\Phi(d) + \sigma_n \sqrt{T} \, \phi(d), \quad d = \frac{F_0 - K}{\sigma_n \sqrt{T}}" />
                </div>
              </div>

              {/* Formatted Worked Example Card */}
              <div className="mt-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] mb-3">
                  Worked Example: Daily Yield Volatility Implication
                </div>
                <div className="space-y-1 font-mono text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">MOVE Index Reading (Annualized Volatility)</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">100.0 bp</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Annual Trading Days Divisor (<span className="font-sans">&radic;</span>252)</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">&divide; 15.8745</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-base">
                    <span className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Expected Daily Treasury Yield Swing</span>
                    <span className="font-bold text-lg text-[#1D8A70] dark:text-[#3CBF9C]">~6.30 bp / day</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  &rarr; A MOVE index reading of 100 mathematically implies that the Treasury market expects yields to move, on average, by approximately 6.3 basis points per trading session.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 0DTE & Structural Fragility */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4 text-slate-900 dark:text-white">The 0DTE Phenomenon &amp; Structural Fragility</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
            <li>
              Because 0DTE flow is balanced between speculative buying and systematic writing, market makers are left with a net long{' '}
              <Jargon
                term="Gamma"
                definition="The rate of change of an option's delta; when long gamma, dealers buy dips and sell rallies."
              />{' '}
              profile throughout the trading day.
            </li>
            <li>Delta-hedging creates an artificial pinning effect, smoothing intraday price action and forcing mechanical mean-reversion.</li>
            <li>Persistent intraday hedging depresses actual realized volatility, dragging the 30-day VIX lower.</li>
            <li>
              High{' '}
              <Jargon
                term="Vega notional"
                definition="The sensitivity of an option's price to a 1% change in underlying implied volatility."
              />{' '}
              in VIX options creates a feedback loop: a sudden hawkish shock shatters the gamma trap, causing a violent VIX spike as market makers scramble to cover short volatility exposures.
            </li>
          </ul>

          {/* Inline Infographic Placement */}
          <InfographicSlot alt="The MOVE-VIX Disconnect: Cross-Asset Volatility Spillover and Hawkish Repricing Infographic" />
        </section>

        {/* Cross-Asset Spillover Models */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4 text-slate-900 dark:text-white">Modeling Cross-Asset Spillover</h2>
          
          {/* Diebold-Yilmaz Panel */}
          <div className="mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              The{' '}
              <Jargon
                term="Diebold-Yilmaz"
                definition="A framework resolving variance decompositions sensitive to variable ordering via a generalized VAR framework."
              />{' '}
              Vector Autoregression Framework determines directional volatility transmission across markets:
            </p>
            <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg shadow-inner text-white">
              <MathBlock math="S = \left[ \frac{\sum_{i \neq j} \tilde{\theta}_{ij}(H)}{\sum_{i,j} \tilde{\theta}_{ij}(H)} \right] \times 100" />
              <div className="mt-3 text-slate-300 text-xs border-t border-slate-800 pt-2">
                <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold">Current Regime:</span> The U.S. Treasury market is a massive{' '}
                <span className="text-white font-semibold">net transmitter</span> of volatility shocks, while equities operate as{' '}
                <span className="text-white font-semibold">net receivers</span>.
              </div>
            </div>
          </div>

          {/* DCC-GARCH Panel */}
          <div className="mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              The Dynamic Conditional Correlation (
              <Jargon
                term="DCC-GARCH"
                definition="Estimates the time-varying covariance between rate volatility and equity volatility to observe daily spillover."
              />
              ) model captures volatility clustering and time-varying covariance:
            </p>
            <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg shadow-inner text-white">
              <MathBlock math="\sigma_{i,t}^2 = \omega_i + \alpha_i \varepsilon_{i,t-1}^2 + \beta_i \sigma_{i,t-1}^2" />
            </div>
          </div>

          {/* Copula Dichotomy */}
          <h3 className="font-serif text-xl mb-3 mt-8 text-slate-900 dark:text-white">Tail Dependence (Copula Models)</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
            Linear correlation fails during asymmetric market crashes. Sklar&apos;s theorem separates marginal distributions from joint dependence using{' '}
            <Jargon
              term="Copulas"
              definition="Functions linking univariate marginals to their full multivariate distribution to isolate black swan tail events."
            />
            .
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900/50 shadow-sm">
              <h4 className="font-serif text-lg mb-2 text-[#BC4128] dark:text-[#E2694A] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A] flex-none" />
                Gaussian &amp; Symmetric Copulas
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Gaussian:</strong> Zero tail dependence. Fatally underestimated systemic risk during the 2008 financial crisis.</li>
                <li><strong>Frank:</strong> Symmetric dependence. Suited only for benign, stable macroeconomic conditions.</li>
                <li><strong>Student-t:</strong> Fat-tail symmetric. Captures extreme events but fails to capture crash vs. rally asymmetry.</li>
              </ul>
            </div>
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900/50 shadow-sm">
              <h4 className="font-serif text-lg mb-2 text-[#A8672E] dark:text-[#D08F52] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#A8672E] dark:text-[#D08F52] flex-none" />
                Archimedean Copulas
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Clayton:</strong> Lower-tail dependence. Sensitive to simultaneous crashes in equity prices.</li>
                <li><strong>Gumbel:</strong> Upper-tail dependence. Sensitive to simultaneous upward spikes (MOVE &amp; VIX exploding together).</li>
                <li><strong>SJC (Symmetrized Joe-Clayton):</strong> Allows varying degrees of upper and lower tail dependence simultaneously.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Factor Spreads & Option Skew */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4 text-slate-900 dark:text-white">Transmission into Equity Factor Spreads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-l-4 border-[#BC4128] dark:border-[#E2694A] pl-4 py-2 bg-slate-50 dark:bg-slate-900/30 rounded-r-lg">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A]" />
                Growth (Long Duration)
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Valuations rely heavily on distant cash flows. Extreme sensitivity to the discount rate; spikes in Treasury yields compress equity multiples instantly.
              </p>
            </div>
            <div className="border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] pl-4 py-2 bg-slate-50 dark:bg-slate-900/30 rounded-r-lg">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-[#1D8A70] dark:border-[#3CBF9C]" />
                Value (Short Duration)
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Generate immediate cash flows and return capital via dividends. Catch temporary bids from sector rotation, masking index-level volatility.
              </p>
            </div>
          </div>
          
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            Institutional hedging pressure is reflected in the{' '}
            <Jargon
              term="25-Delta Risk Reversal"
              definition="The mathematical difference in implied volatility between a 25-delta OTM put and a 25-delta OTM call."
            />
            :
          </p>
          <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg shadow-inner text-white w-full md:w-3/4">
            <MathBlock math="\text{Risk Reversal} = \text{IV}_{\text{Put}, 25\Delta} - \text{IV}_{\text{Call}, 25\Delta}" />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
            A steepening negative risk reversal indicates aggressive institutional pricing of downside tail risk, forcing dealers to harden &ldquo;put walls.&rdquo;
          </p>
        </section>

        {/* Strategies and Systemic Risks */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4 text-slate-900 dark:text-white">Strategies and Systemic Risks</h2>
          <ul className="list-disc pl-5 space-y-3 text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>Relative Value (RV) Arbitrage:</strong> Sell equity variance (SPX straddles, short variance swaps) while buying interest rate variance (payer swaptions, ATM Treasury straddles).
            </li>
            <li>
              <strong>Systematic De-leveraging:</strong> Volatility-targeting funds maintain ~10% portfolio volatility. A VIX breach of 20&ndash;25 triggers blind, algorithmic, price-agnostic selling across equities.
            </li>
            <li>
              <strong>Hazards of Convergence:</strong> If the Fed loses inflation credibility, the rate market enters an unanchored regime. Contango decay on long VIX futures and negative convexity on short rate options can trigger catastrophic margin calls.
            </li>
          </ul>
        </section>

        {/* Risk Monitoring Checklist */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4 text-slate-900 dark:text-white">Risk Monitoring Checklist for Option Traders</h2>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3 font-semibold text-slate-900 dark:text-slate-100">Risk Metric</th>
                  <th className="p-3 font-semibold text-slate-900 dark:text-slate-100">Analytical Focus</th>
                  <th className="p-3 font-semibold text-slate-900 dark:text-slate-100">Actionable Signal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                <tr>
                  <td className="p-3 font-medium text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">MOVE-VIX Ratio</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">Tracks absolute divergence between fixed-income and equity implied volatility.</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold">Ratio &gt; 5.0</span> signals equity complacence is highly vulnerable. Prepare for forced selling.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">25-Delta Risk Reversal</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">Measures institutional demand for downside tail-risk protection versus upside.</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    Rapidly steepening negative skew signals imminent institutional de-risking (often precedes equity drops by 3&ndash;10 sessions).
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">VIX1D vs. 30-Day VIX</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">Compares 0DTE expected move against traditional 30-day implied volatility.</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    Persistent backwardation (<span className="font-mono">VIX1D &gt; VIX</span>) indicates acute stress breaking the dealer gamma trap.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">Diebold-Yilmaz Surrogates</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">Monitors rolling 30-day correlations between Treasury ETFs (TLT) &amp; Equity (SPY).</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    Sharp shift from negative to positive correlation indicates macro-driven contagion across assets.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#A8672E] dark:text-[#D08F52] whitespace-nowrap">Vega Notional &amp; GEX</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">Evaluates aggregate dealer Gamma Exposure (GEX) and VIX options vega notional.</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    High negative GEX + high VIX vega notional means dealers will mechanically amplify downside selloffs.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
