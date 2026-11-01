'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

// Tooltip term dictionary populated exclusively from the paper's defined terminology
const DEFINITIONS: Record<string, string> = {
  'Zero-Gamma Flip':
    'The critical price threshold where aggregate dealer gamma crosses zero. Above it, dealer delta hedging dampens volatility; below it, dealer hedging amplifies market moves.',
  'Gamma Exposure (GEX)':
    'The estimated dollar value that options market makers must hedge in the underlying market for every 1% change in spot price to remain delta-neutral.',
  'Put Wall':
    'The strike price containing the largest concentration of net put gamma. In negative gamma, it acts as a gravitational magnet or key downside acceleration level.',
  'Call Wall':
    'The strike price containing the highest positive call gamma, representing structural overhead resistance where dealer selling caps upward momentum.',
  'Vanna':
    'The rate of change of an option delta with respect to changes in implied volatility. As IV falls, short put deltas shrink, forcing dealers to buy underlying hedges.',
  'Charm':
    'The rate of change of an option delta over time (delta decay). Out-of-the-money put deltas decay toward zero as expiration nears, inducing mechanical dealer short-covering.',
  'Volatility Skew':
    'The implied volatility differential between out-of-the-money puts and calls (e.g., 25-delta put IV minus 25-delta call IV), measuring downside tail protection demand.',
  'Tail Premium':
    'The implied volatility spread of deep out-of-the-money downside puts (10-delta put IV) over at-the-money volatility, pricing acute market crash probability.',
  '0DTE':
    'Zero Days to Expiration contracts; options expiring on the current trading day exhibiting hyper-accelerated gamma sensitivity and charm decay into the close.',
};

function Term({ name, children }: { name: keyof typeof DEFINITIONS; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const definition = DEFINITIONS[name] || '';

  return (
    <span
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="relative inline-block cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-inherit outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm"
    >
      <span className="font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">{children || name}</span>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded bg-[#14171B] dark:bg-[#05070A] p-2.5 text-xs font-sans font-normal text-white shadow-xl ring-1 ring-[#2A2E35] transition-opacity"
        >
          <strong className="block mb-1 font-semibold text-[#D08F52]">{name}</strong>
          {definition}
        </span>
      )}
    </span>
  );
}

export default function ArticlePage() {
  return (
    <ArticleFrame slug="anatomy-nasdaq-drawdown-derivatives-microstructure">
      <div className="space-y-12 text-[#1A1A1A] dark:text-[#E8E8E8] transition-colors">
        
        {/* Standout Key Stats Row (4 figures worth pinning) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">NDX Intraday Trough</div>
            <div className="text-2xl font-mono tabular-nums font-bold text-[#BC4128] dark:text-[#E2694A] mt-1">
              28,093.24
            </div>
            <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
              Exactly -10.0% correction touch (closed 28,384.85, -3.46%)
            </div>
          </div>

          <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">VIX Intraday Range</div>
            <div className="text-2xl font-mono tabular-nums font-bold text-[#A8672E] dark:text-[#D08F52] mt-1">
              17.20 &rarr; 23.93
            </div>
            <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
              Spiked +39.1% intraday; retreated to close at 19.41
            </div>
          </div>

          <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">SPX Put Wall Shift</div>
            <div className="text-2xl font-mono tabular-nums font-bold text-[#BC4128] dark:text-[#E2694A] mt-1">
              7,700 &rarr; 7,600
            </div>
            <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
              Relocated at 10:00 AM ET (-$6.13B strike GEX)
            </div>
          </div>

          <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">SPX EOD Charm Decay</div>
            <div className="text-2xl font-mono tabular-nums font-bold text-[#1D8A70] dark:text-[#3CBF9C] mt-1">
              -$13.81B / day
            </div>
            <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
              Peaked at 4:00 PM ET; fueled +291 pt NDX late recovery
            </div>
          </div>
        </section>

        {/* Key Takeaways Card */}
        <section className="p-6 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-[#FBFBFA] dark:bg-[#121418]">
          <h2 className="font-serif text-xl text-[#111315] dark:text-white mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>
                <strong>Fundamental catalyst:</strong> Markets shifted rapidly from rewarding top-line AI expansion to penalizing capital intensity, triggered by Alphabet&apos;s -$9.1B free cash flow, Intel&apos;s gross margin drop to 38%, and Amazon&apos;s $220B capex forecast.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>
                <strong>Microstructure breakdown:</strong> An overnight gap below the S&amp;P 500 <Term name="Zero-Gamma Flip" /> (7,699.20) and QQQ $700 <Term name="Put Wall" /> forced options market makers into negative gamma, turning dealer delta hedging into a mechanical selling accelerator.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>
                <strong>Midday inflection point:</strong> At NDX 28,093.24 (exactly -10.0% from peak) and QQQ $690, implied volatility reached peak panic (VIX 23.93), pricing downside puts so richly that institutional hedgers ceased buying and began taking profits.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>
                <strong>Afternoon structural bounce:</strong> Accelerated put monetization, positive <Term name="Vanna" />, and massive 4:00 PM <Term name="Charm" /> decay (-$13.81B on SPX) forced dealers to buy back short underlying hedges, lifting NDX 291 points off its low to avoid a closing correction.
              </span>
            </li>
          </ul>
        </section>

        {/* Full Cross-Asset Snapshot Table */}
        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-[#111315] dark:text-white">
            Asset Class Session Performance
          </h2>
          <div className="overflow-x-auto border border-[#E5E5E0] dark:border-[#262A30] rounded">
            <table className="w-full text-left text-xs font-mono tabular-nums divide-y divide-[#E5E5E0] dark:divide-[#262A30]">
              <thead className="bg-gray-50 dark:bg-[#1A1D23] text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="p-3">Index / Instrument</th>
                  <th className="p-3">Oct 29 Close</th>
                  <th className="p-3">Oct 30 Open</th>
                  <th className="p-3">Intraday Extrema</th>
                  <th className="p-3">Oct 30 Close</th>
                  <th className="p-3">Net Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E0] dark:divide-[#262A30] bg-white dark:bg-[#16191E]">
                <tr>
                  <td className="p-3 font-sans font-medium">Nasdaq-100 (NDX)</td>
                  <td className="p-3">29,402.85</td>
                  <td className="p-3">~28,725.00</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">28,093.24 (-10.0%)</td>
                  <td className="p-3">28,384.85</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">-3.46% (-1,018.00)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">Nasdaq Composite (IXIC)</td>
                  <td className="p-3">26,184.73</td>
                  <td className="p-3">25,606.33</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">&lt;25,400.00</td>
                  <td className="p-3">25,437.00</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">-2.86% (-747.73)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">Invesco QQQ Trust (QQQ)</td>
                  <td className="p-3">$715.31</td>
                  <td className="p-3">&lt;$700.00</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">~$688.50</td>
                  <td className="p-3 font-semibold">$690.49</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">-3.47% (-$24.82)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">S&amp;P 500 (SPX)</td>
                  <td className="p-3">7,720.39</td>
                  <td className="p-3">7,626.38</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">7,580.07 (Session Low)</td>
                  <td className="p-3">7,580.07</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">-1.82% (-140.32)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">Cboe Volatility Index (VIX)</td>
                  <td className="p-3">17.20</td>
                  <td className="p-3">18.43</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">23.93 (Midday Peak)</td>
                  <td className="p-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">19.41</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">+12.91% (+2.22)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">Nasdaq-100 VIX (VXN)</td>
                  <td className="p-3">25.18</td>
                  <td className="p-3">~26.80</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">&gt;30.00</td>
                  <td className="p-3">28.50</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">+13.19% (+3.32)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">10-Year US Treasury Yield</td>
                  <td className="p-3">4.98%</td>
                  <td className="p-3">4.95%</td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">4.92% (Yield Low)</td>
                  <td className="p-3">4.93%</td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">-5 bps (Flight to safety)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">Brent Crude Oil ($/bbl)</td>
                  <td className="p-3">~$110.77</td>
                  <td className="p-3">&gt;$113.00</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">$113.79</td>
                  <td className="p-3">$113.43</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">+2.40% (Hormuz strike)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sell-Off Triggers & Trader Psychology */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-[#111315] dark:text-white">
            Sell-Off Triggers and Trader Psychology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] space-y-2">
              <h3 className="font-serif font-bold text-base text-[#BC4128] dark:text-[#E2694A]">
                Phase 1 &amp; 2: Cash Burn &amp; Guidance Traps
              </h3>
              <ul className="text-xs space-y-1.5 list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Alphabet ($GOOGL):</strong> Plummeted 12.6% on Oct 29 (-$500B cap) after reporting negative free cash flow of -$9.1B and search revenue misses due to chatbot competition.
                </li>
                <li>
                  <strong>Amazon ($AMZN):</strong> Reaffirmed $220B in 2026 capex with higher 2027 outlays, while total profit missed and cash flow turned negative, sinking shares 8% in pre-market.
                </li>
                <li>
                  <strong>Intel ($INTC):</strong> Plunged 28.58% to $65.76 (worst drop since 1974) on Q4 revenue guidance of $15B-$16B vs $17.1B expected, gross margins crashing to 38%, and PC memory cost inflation.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] space-y-2">
              <h3 className="font-serif font-bold text-base text-[#A8672E] dark:text-[#D08F52]">
                Phase 3 &amp; 4: Geopolitical Shocks &amp; Rotation
              </h3>
              <ul className="text-xs space-y-1.5 list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Geopolitical escalation:</strong> Explosive devices struck a tanker in the Strait of Hormuz; Brent crude jumped 2.4% to $113.43 on military briefings regarding Iran.
                </li>
                <li>
                  <strong>Crypto destabilization:</strong> A $6B North Korean hack of Binance knocked Bitcoin down 2.42% to $76,835, accelerating margin calls across multi-asset funds.
                </li>
                <li>
                  <strong>Defensive divergence:</strong> Traders rotated into cash-rich names; Apple ($AAPL) slipped only 1.23% to reclaim the #1 market-cap spot ($5.03T) over Nvidia ($4.94T).
                </li>
              </ul>
            </div>
          </div>

          {/* Two-Column Comparison Card: The Dichotomy of the Repricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#E5E5E0] dark:border-[#262A30] rounded overflow-hidden">
            <div className="p-5 bg-white dark:bg-[#16191E] border-b md:border-b-0 md:border-r border-[#E5E5E0] dark:border-[#262A30] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A]" />
                <h4 className="font-serif text-base font-bold text-[#BC4128] dark:text-[#E2694A]">
                  Capital-Intensive AI Hyperscalers
                </h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Companies funding data-center buildouts via debt and dilution with unmeasured payback horizons:
              </p>
              <ul className="text-xs space-y-1.5 font-mono text-gray-700 dark:text-gray-300">
                <li>&bull; GOOGL: -$9.1B free cash flow; search revenue missed consensus ($63.4B vs $64.9B)</li>
                <li>&bull; INTC: Gross margin guided down to 38.0% from 44.1%; foundry cash drain</li>
                <li>&bull; Neoclouds (CoreWeave / Nebius): Oct share drops of -36% and -33%</li>
                <li>&bull; Apollo survey finding: 69% deployment, but only 2% track an active ROI metric</li>
              </ul>
            </div>

            <div className="p-5 bg-white dark:bg-[#16191E] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C]" />
                <h4 className="font-serif text-base font-bold text-[#1D8A70] dark:text-[#3CBF9C]">
                  Defensive Anchors &amp; Flow Compounders
                </h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Assets insulated from infrastructure cash burn, attracting safety flows throughout the session:
              </p>
              <ul className="text-xs space-y-1.5 font-mono text-gray-700 dark:text-gray-300">
                <li>&bull; AAPL: Fell only -1.23%; insulated from direct data-center capex destruction</li>
                <li>&bull; AMZN Dip Buyers: AWS revenue +39% ($45.98B) drove late rebound to -1.41%</li>
                <li>&bull; Energy Majors: Exxon Mobil &amp; Chevron gained on quarterly profit beats</li>
                <li>&bull; US Treasuries: 10-year yield fell to 4.93% (5th percentile bullishness reversal)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Infographic Slot placed inline to visually anchor the microstructure analysis */}
        <InfographicSlot alt="Anatomy of the Nasdaq Drawdown: Derivatives Microstructure, Dealer Gamma Dynamics, and AI Capex Repricing" />

        {/* Intraday Evolution of VIX, GEX, and Volatility Skew */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-[#111315] dark:text-white">
            Intraday Evolution: Derivatives Microstructure
          </h2>
          <div className="overflow-x-auto border border-[#E5E5E0] dark:border-[#262A30] rounded">
            <table className="w-full text-left text-xs font-mono tabular-nums divide-y divide-[#E5E5E0] dark:divide-[#262A30]">
              <thead className="bg-gray-50 dark:bg-[#1A1D23] text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="p-3">Session Window</th>
                  <th className="p-3">Spot &amp; Index Levels</th>
                  <th className="p-3">VIX / VXN Action</th>
                  <th className="p-3">Dealer GEX &amp; Strike Regime</th>
                  <th className="p-3">Skew &amp; Option Order Flows</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E0] dark:divide-[#262A30] bg-white dark:bg-[#16191E]">
                <tr>
                  <td className="p-3 font-sans font-medium">
                    <strong>Prev Day Close</strong>
                    <div className="text-[10px] text-gray-500">Oct 29, 4:00 PM ET</div>
                  </td>
                  <td className="p-3">
                    <div>SPX: 7,720.39</div>
                    <div>QQQ: $705.38</div>
                  </td>
                  <td className="p-3">
                    <div>VIX: 17.20</div>
                    <div>VXN: 25.18</div>
                  </td>
                  <td className="p-3">
                    <div>SPX Flip: 7,703.20</div>
                    <div>QQQ Put Wall: $700.00</div>
                    <div className="text-gray-500">Fragile dealer net gamma</div>
                  </td>
                  <td className="p-3">
                    <div>VIX outpaced skew +3.5 pts</div>
                    <div>INTC upside call skew 160-170%</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">
                    <strong>Morning Open</strong>
                    <div className="text-[10px] text-gray-500">08:15 - 10:30 AM ET</div>
                  </td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">
                    <div>SPX: 7,624.99</div>
                    <div>QQQ breaks &lt;$700</div>
                  </td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">
                    <div>VIX: 18.43 &rarr; &gt;20.00</div>
                    <div>VXN: ~27.00</div>
                  </td>
                  <td className="p-3">
                    <div className="text-[#BC4128] dark:text-[#E2694A] font-semibold">Negative Gamma Regime</div>
                    <div>SPX Put Wall drops to 7,600</div>
                    <div>Flip shifts down to 7,699.20</div>
                  </td>
                  <td className="p-3">
                    <div>INTC call skew collapses</div>
                    <div>QQQ &le;7D P/C OI hits 1.778</div>
                    <div>0DTE P/C OI spikes to 1.701</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">
                    <strong>Midday Trough</strong>
                    <div className="text-[10px] text-gray-500">11:30 AM - 1:30 PM ET</div>
                  </td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">
                    <div>NDX: 28,093.24 (-10%)</div>
                    <div>SPX: 7,598.52</div>
                    <div>QQQ: ~$688.50</div>
                  </td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">
                    <div className="font-bold">VIX Peak: 23.93</div>
                    <div>VXN: &gt;30.00</div>
                    <div className="text-[10px]">Peak convexity panic</div>
                  </td>
                  <td className="p-3">
                    <div>7,600 Put Wall tested</div>
                    <div>Strike GEX: -$6.13B</div>
                    <div>SPX Charm (1 PM): -$12.16B</div>
                  </td>
                  <td className="p-3">
                    <div>Term structure inverts</div>
                    <div>QQQ 30D vs 90D IV: +0.9 pts</div>
                    <div>Peak panic put buying halts</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium">
                    <strong>Market Close</strong>
                    <div className="text-[10px] text-gray-500">3:30 - 4:15 PM ET</div>
                  </td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">
                    <div>NDX: 28,384.85 (+291)</div>
                    <div>QQQ: $690.49 (Pinned)</div>
                    <div className="text-gray-500">SPX: 7,580.07</div>
                  </td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">
                    <div>VIX: 19.41 (-4.52 pts)</div>
                    <div className="text-[#BC4128] dark:text-[#E2694A]">VXN: 28.50 (Elevated)</div>
                  </td>
                  <td className="p-3">
                    <div>QQQ pinned to $690 Put Wall</div>
                    <div>Call Wall shifts down to $692</div>
                    <div>SPX Charm (4 PM): -$13.81B</div>
                  </td>
                  <td className="p-3">
                    <div>0DTE puts monetized (P/C 0.958)</div>
                    <div>30D Put Skew: +6.4 pts</div>
                    <div>10&Delta; Tail Premium: +9.9 pts</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quantitative Formula & Worked Example Panel */}
        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-[#111315] dark:text-white">
            Quantitative Mechanics: Dealer Hedging &amp; Delta Decay
          </h2>
          <div className="rounded border border-[#2A2E35] bg-[#14171B] dark:bg-[#05070A] p-5 font-mono text-white text-xs space-y-4">
            <div className="border-b border-[#2A2E35] pb-3">
              <span className="text-[#D08F52] text-sm font-semibold">// 1. Dealer Dynamic Hedging Delta Flow</span>
              <div className="my-2">
                <MathBlock math="\text{Hedging Flow} \approx -\text{Net GEX} \times \Delta S" />
              </div>
              <div className="text-gray-400 text-[11px] mt-1 font-sans">
                When spot is below the Zero-Gamma Flip, Net GEX is negative. As price falls (<InlineMath math="\Delta S < 0" />), the resulting dealer hedging flow is negative (dealers sell underlying equity to remain delta-neutral).
              </div>
            </div>

            <div className="border-b border-[#2A2E35] pb-3">
              <span className="text-[#D08F52] text-sm font-semibold">// 2. End-of-Day Charm &amp; Vanna Short-Covering</span>
              <div className="my-2">
                <MathBlock math="\text{Charm} = \frac{\partial \Delta}{\partial t}, \quad \text{Vanna} = \frac{\partial \Delta}{\partial \sigma_{IV}}" />
              </div>
              <div className="text-gray-400 text-[11px] mt-1 font-sans">
                As time expires (<InlineMath math="t \to \text{close}" />) and front-end IV is crushed via put profit-taking, the short put delta bleeds off, compelling dealers to buy back their underlying short hedges.
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-[#D08F52] uppercase font-bold text-[11px] tracking-wider">
                Empirical Readings Recorded on October 30, 2026:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-gray-300">
                <div className="bg-[#1C2026] p-2.5 rounded">
                  <span className="text-gray-400">SPX 7,600 Strike GEX:</span> -$6.13B / 1% move
                  <br />
                  <span className="text-gray-400">SPX Charm (1:00 PM ET):</span> -$12.16B / day
                  <br />
                  <span className="text-gray-400">SPX Charm (4:00 PM ET):</span> -$13.81B / day
                </div>
                <div className="bg-[#1C2026] p-2.5 rounded">
                  <span className="text-gray-400">QQQ 30-Day Put Skew:</span> +6.4 pts (69th percentile)
                  <br />
                  <span className="text-gray-400">QQQ 10&Delta; Tail Premium:</span> +9.9 pts (87th percentile)
                  <br />
                  <span className="text-gray-400">QQQ 25&Delta; Call Skew:</span> -2.8 pts (Defensive overwriting)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Canonical Four-Stage Pattern */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-[#111315] dark:text-white">
            The Canonical Intraday Microstructure Pattern
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] space-y-1">
              <h3 className="font-serif font-bold text-sm text-[#A8672E] dark:text-[#D08F52]">
                Stage 1: Pre-Shock Dispersion &amp; Strike Fragility (Prior Session Close)
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Broad index indices remain artificially calm due to single-stock dispersion, but spot hovers within 1% of the <Term name="Zero-Gamma Flip" /> while tail skew outpaces implied volatility. Front-week single-stock calls exhibit extreme positive skew.
              </p>
            </div>

            <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] space-y-1">
              <h3 className="font-serif font-bold text-sm text-[#BC4128] dark:text-[#E2694A]">
                Stage 2: Overnight Gap &amp; Dealer Gamma Amplification (Open &ndash; 10:30 AM)
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                An earnings or macro shock causes futures to gap beneath the <Term name="Put Wall" />. Dealers shift instantaneously into short gamma. As speculative upside call delta decays and short-dated <Term name="0DTE" /> puts are bid, dealers are forced to sell underlying shares into the falling tape.
              </p>
            </div>

            <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] space-y-1">
              <h3 className="font-serif font-bold text-sm text-[#BC4128] dark:text-[#E2694A]">
                Stage 3: Midday Convexity Climax &amp; Volatility Spike (11:30 AM &ndash; 1:30 PM)
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Spot hits major technical round numbers (-10% correction) and engages the relocated Put Wall. VIX spikes parabolically to session highs (23.93) and term structures invert. Deep OTM puts become too expensive to purchase, choking off new selling pressure.
              </p>
            </div>

            <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-white dark:bg-[#16191E] space-y-1">
              <h3 className="font-serif font-bold text-sm text-[#1D8A70] dark:text-[#3CBF9C]">
                Stage 4: Put Monetization, Charm Decay &amp; Wall Pinning (2:00 PM &ndash; Close)
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Intraday traders monetize winning puts, triggering positive <Term name="Vanna" /> flows. Expiration <Term name="Charm" /> strips OTM put delta, compelling dealers to buy back short hedges. The index pins directly to the Put Wall (QQQ $690) while longer-dated <Term name="Tail Premium" /> remains structurally bid.
              </p>
            </div>
          </div>
        </section>

        {/* Strategic Forward Outlook & Binary Calendar */}
        <section className="space-y-4 border-t border-[#E5E5E0] dark:border-[#262A30] pt-6">
          <h2 className="font-serif text-2xl text-[#111315] dark:text-white">
            Structural Takeaways &amp; Forward Binary Catalyst Calendar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-[#FBFBFA] dark:bg-[#121418] space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#A8672E] dark:text-[#D08F52]">
                Microstructure Fragility Into November
              </h3>
              <ul className="text-xs space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  &bull; <strong>Negative gamma persistence:</strong> Both SPX (7,580.07 vs 7,699.20 flip) and QQQ ($690.49 vs $708.12 flip) closed in negative gamma, preserving high two-way realized volatility.
                </li>
                <li>
                  &bull; <strong>Overhead supply walls:</strong> QQQ short-dated <Term name="Call Wall" /> fell to $692 and macro Call Wall sits at $720, capping early reflex rallies until cash flow certainty returns.
                </li>
                <li>
                  &bull; <strong>Critical line in the sand:</strong> A daily NDX close below Friday&apos;s intraday low of 28,093.24 would confirm an official closing correction, triggering systematic CTA liquidation.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded border border-[#E5E5E0] dark:border-[#262A30] bg-[#FBFBFA] dark:bg-[#121418] space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#111315] dark:text-white">
                November 2026 Binary Event Schedule
              </h3>
              <ul className="text-xs space-y-1.5 font-mono text-gray-700 dark:text-gray-300">
                <li>&bull; <strong>Nov 2:</strong> Apple Inc. (AAPL) Q4 Earnings After Close</li>
                <li>&bull; <strong>Nov 3:</strong> US Midterm Congressional Elections</li>
                <li>&bull; <strong>Nov 13:</strong> October US Consumer Price Index (CPI)</li>
                <li>&bull; <strong>Nov 17:</strong> Nvidia Corporation (NVDA) Q3 Earnings</li>
                <li>&bull; <strong>Late Nov:</strong> Anthropic IPO ($1.475 Trillion Valuation Target)</li>
              </ul>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-sans pt-1">
                High-impact catalysts explain why 30-day QQQ tail protection held at the 87th percentile despite the VIX closing pullback.
              </p>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
