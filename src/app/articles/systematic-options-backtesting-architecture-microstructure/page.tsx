'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

interface TermProps { term: string; definition: string; }

function TermTooltip({ term, definition }: TermProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <span tabIndex={0} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(p => !p)} className="relative inline-block cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] font-medium text-stone-900 dark:text-stone-100 focus:outline-none" aria-label={term + ': ' + definition}>
      {term}
      {isOpen && (<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 shadow-xl rounded-md border border-gray-200 dark:border-gray-700 z-10 pointer-events-none font-sans text-left"><span className="block font-semibold mb-1">{term}</span>{definition}</span>)}
    </span>
  );
}

export default function OptionsBacktestingPage() {
  return (
    <ArticleFrame
      slug="systematic-options-backtesting-architecture-microstructure"
      additionalDisclaimer="Options backtesting results are hypothetical and do not guarantee future performance. All execution models involve simplifying assumptions that may not reflect live market conditions."
    >
      <div className="space-y-10 max-w-4xl">

        {/* Key Metrics */}
        <section aria-label="Key Metrics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 shadow-sm">
              <span className="block text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Phantom Alpha</span>
              <span className="block text-2xl md:text-3xl font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A] mt-1">+16.0%</span>
              <span className="block text-xs text-stone-500 dark:text-stone-400 mt-1">Annualized return distortion from mid-price fills on a $50k account</span>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 shadow-sm">
              <span className="block text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Supported Structures</span>
              <span className="block text-2xl md:text-3xl font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mt-1">38</span>
              <span className="block text-xs text-stone-500 dark:text-stone-400 mt-1">Native options strategies vectorized in the Optopsy library</span>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 shadow-sm">
              <span className="block text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Daily US NBBO Bars</span>
              <span className="block text-2xl md:text-3xl font-mono tabular-nums font-semibold text-[#A8672E] dark:text-[#D08F52] mt-1">~400M</span>
              <span className="block text-xs text-stone-500 dark:text-stone-400 mt-1">Intraday 1-minute records across all listed exchange strikes</span>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 shadow-sm">
              <span className="block text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">Exercise Cutoff</span>
              <span className="block text-2xl md:text-3xl font-mono tabular-nums font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mt-1">$0.01</span>
              <span className="block text-xs text-stone-500 dark:text-stone-400 mt-1">OCC automatic exercise threshold for expiring in-the-money contracts</span>
            </div>
          </div>
        </section>

        {/* Core Engineering Takeaways */}
        <section aria-label="Core Engineering Takeaways">
          <div className="p-5 rounded-lg bg-stone-50 dark:bg-[#12161D] border border-stone-200 dark:border-stone-800">
            <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-3">Core Engineering Takeaways</h2>
            <ul className="space-y-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono shrink-0">&#9642;</span>
                <span><strong>Midpoint execution manufactures fiction:</strong> Filling limit orders at mid-spread ignores natural price penalties, producing thousands of dollars in unearned paper returns.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono shrink-0">&#9642;</span>
                <span><strong>Surface calibration is required:</strong> Raw ticks must be inverted through Black-Scholes-Merton or <TermTooltip term="Bjerksund-Stensland" definition="An analytical approximation method used to price and extract implied volatility from American-style options subject to early exercise." /> to resolve Greeks when vendors omit volatility fields.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono shrink-0">&#9642;</span>
                <span><strong>Physical settlement risk dwarfs cash index risk:</strong> In-the-money equity options trigger unexpected overnight share delivery, whereas European indices settle purely in cash without assignment risk.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono shrink-0">&#9642;</span>
                <span><strong>Downside tails mandate non-normal metrics:</strong> Asymmetric return profiles render Sharpe ratios unreliable; engines must compute <TermTooltip term="CVaR" definition="Conditional Value at Risk (Expected Shortfall): the expected loss incurred during the worst percentiles (e.g., 95th or 99th) of a return distribution." /> and Sortino ratios.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Equity vs Options paradigm */}
        <section className="space-y-4">
          <h2 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100">Structural Paradigm: Equity vs Derivatives Modeling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C]" />
                <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Scalar Equity Simulation</h3>
              </div>
              <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                <li>&bull; Evaluates a single continuous price vector: spot price trajectory over time (S<sub>t</sub>).</li>
                <li>&bull; Static ticker symbol universe with linear chronological transitions.</li>
                <li>&bull; Negligible bid-ask drag; typical large-cap spreads remain within 1 to 2 basis points.</li>
                <li>&bull; Exits cleanly realize cash proceeds without residual underlying obligations.</li>
              </ul>
            </div>
            <div className="p-5 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A]" />
                <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Options Surface Simulation</h3>
              </div>
              <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                <li>&bull; Evaluates high-dimensional matrices parameterized across strikes K, expiries &tau;, and rights &omega;.</li>
                <li>&bull; Contracts expire, change moneyness dynamically, and experience non-linear Greek decay.</li>
                <li>&bull; Wide execution spreads; option bid-ask widths routinely reach 5% to 30% of premium.</li>
                <li>&bull; Introduces path-dependent corporate actions, early exercises, and overnight assignment shocks.</li>
              </ul>
            </div>
          </div>
        </section>

        <InfographicSlot alt="Options backtesting architecture: six-stage pipeline and microstructure realities" />

        {/* Six-Stage Pipeline */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100">The Six-Stage Options Backtesting Pipeline</h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Derivatives simulation operates as a state machine tracking portfolio capital while synchronizing underlying spot assets with expiring contract chains.</p>
          </div>
          <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-[#161B22] border-b border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300">
                  <th className="p-3 font-semibold">Pipeline Stage</th>
                  <th className="p-3 font-semibold">Operational Preconditions</th>
                  <th className="p-3 font-semibold">Execution Mechanism</th>
                  <th className="p-3 font-semibold">System Output State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                <tr className="bg-white dark:bg-[#12161D]">
                  <td className="p-3 font-medium text-stone-900 dark:text-stone-100">Chain Ingestion &amp; Normalization</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Raw EOD or intraday <TermTooltip term="NBBO" definition="National Best Bid and Offer: the consolidated top-of-book market quote across all trading venues." /> quote ticks/bars.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Standardize schema, purge crossed markets (P<sub>b</sub> &gt; P<sub>a</sub>), invert implied volatility surface.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400 font-mono text-xs">Parquet Chain Snapshot</td>
                </tr>
                <tr className="bg-stone-50/50 dark:bg-stone-900/30">
                  <td className="p-3 font-medium text-stone-900 dark:text-stone-100">Leg Discovery &amp; Delta Targeting</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Market snapshot, underlying spot S<sub>t</sub>, strategy entry signal.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Moneyness bounds, root-finding for delta targets (&Delta; &asymp; &part;V / &part;S), open interest verification.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400 font-mono text-xs">Multi-Leg Contract Tuple</td>
                </tr>
                <tr className="bg-white dark:bg-[#12161D]">
                  <td className="p-3 font-medium text-stone-900 dark:text-stone-100">Execution Modeling &amp; Margin Allocation</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Target order intent, current bid-ask spread quotes.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Natural fills (sell bid, buy ask), spread-penalty friction, deduct Reg-T or Portfolio Margin.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400 font-mono text-xs">Active Position &amp; Buying Power Lock</td>
                </tr>
                <tr className="bg-stone-50/50 dark:bg-stone-900/30">
                  <td className="p-3 font-medium text-stone-900 dark:text-stone-100">Mark-to-Market &amp; Position Lifecycle</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Chronological quote snapshots, active positions.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Aggregate portfolio Greeks, mark net liquidation value, evaluate stop-loss and DTE limits.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400 font-mono text-xs">Unrealized P&amp;L &amp; Exit Queue</td>
                </tr>
                <tr className="bg-white dark:bg-[#12161D]">
                  <td className="p-3 font-medium text-stone-900 dark:text-stone-100">Assignment, Exercise &amp; Settlement</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Active ITM contracts, ex-dividend calendars, expiration cutoff.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Ex-dividend assignment checks, OCC auto-exercise (&ge; $0.01), cash settlement or stock delivery.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400 font-mono text-xs">Realized Log &amp; Assigned Inventory</td>
                </tr>
                <tr className="bg-stone-50/50 dark:bg-stone-900/30">
                  <td className="p-3 font-medium text-stone-900 dark:text-stone-100">Risk Diagnostics &amp; Out-of-Sample Tests</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Completed trade logs, margin utilization history, daily equity curve.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400">Asymmetric downside evaluation: Sortino, CVaR, <TermTooltip term="Tail Ratio" definition="The ratio of the 95th percentile right-tail gain against the absolute value of the 5th percentile left-tail loss, quantifying return asymmetry." />, Max Drawdown duration.</td>
                  <td className="p-3 text-stone-600 dark:text-stone-400 font-mono text-xs">Risk Tearsheet &amp; Sensitivity Map</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Surface Calibration Root-Finding</h3>
              <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg border border-stone-800 font-mono text-sm text-stone-200">
                <div className="text-[#D08F52] text-xs uppercase mb-2 tracking-wider">Calibration Equation</div>
                <code>C_market &minus; C_model(S_t, K, &tau;, r, q, &sigma;) = 0</code>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <li>&bull; Inverts Black-Scholes-Merton (European) or Bjerksund-Stensland (American).</li>
                <li>&bull; Employs Brent&apos;s numerical root-finder to extract implied volatility &sigma;.</li>
                <li>&bull; Prunes crossed markets where P<sub>bid</sub> &gt; P<sub>ask</sub>.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Natural Execution with Spread Slippage</h3>
              <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg border border-stone-800 font-mono text-sm text-stone-200">
                <div className="text-[#D08F52] text-xs uppercase mb-2 tracking-wider">Execution Penalty Formula</div>
                <code>P_fill,buy = P_mid + &alpha; &middot; ((P_ask &minus; P_bid) / 2)</code>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <li>&bull; &alpha; &isin; [0, 1] represents execution friction (&alpha; = 1.0 is full natural fill at the ask).</li>
                <li>&bull; Natural execution sells at bid and buys at ask to eliminate unearned midpoint gains.</li>
                <li>&bull; Deducts dynamic Regulation-T or Portfolio Margin allocations upon position entry.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Optopsy */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100">Systematic Implementation via Optopsy</h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Developed by Michael Chu and distributed on GitLab, GitHub, and PyPI, Optopsy bifurcates derivative analysis into two operational modalities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800">
              <h3 className="font-serif text-base text-[#A8672E] dark:text-[#D08F52] mb-2">Vectorized Strategy Scanning</h3>
              <ul className="space-y-2 text-xs md:text-sm text-stone-600 dark:text-stone-400">
                <li>&bull; Evaluates historical chains globally using <code className="font-mono text-stone-800 dark:text-stone-200">op.iron_condor()</code>.</li>
                <li>&bull; Identifies all trade setups matching target delta and DTE buckets across history simultaneously.</li>
                <li>&bull; Generates aggregate win rates and payout distributions without simulating portfolio cash limits.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800">
              <h3 className="font-serif text-base text-[#A8672E] dark:text-[#D08F52] mb-2">Chronological Portfolio Simulation</h3>
              <ul className="space-y-2 text-xs md:text-sm text-stone-600 dark:text-stone-400">
                <li>&bull; Runs step-by-step event simulation via <code className="font-mono text-stone-800 dark:text-stone-200">op.simulate()</code> day by day.</li>
                <li>&bull; Enforces strict position concurrency caps (<code className="font-mono text-stone-800 dark:text-stone-200">max_positions</code>) and capital bounds.</li>
                <li>&bull; Tracks multi-leg slippage, per-contract commissions, and dynamic DTE exit triggers.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400">Python Implementation: 45-DTE SPX Iron Condor Simulation</div>
            <div className="bg-[#14171B] dark:bg-[#05070A] rounded-lg p-4 border border-stone-800 overflow-x-auto">
              <pre className="font-mono text-xs text-stone-300 leading-relaxed whitespace-pre">{`import optopsy as op
chain_data = op.csv_data(
    "spx_eod_chain_history.csv",
    underlying_symbol=0, option_type=1, expiration=2,
    quote_date=3, strike=4, bid=5, ask=6, underlying_price=7
)
simulation_result = op.simulate(
    data=chain_data, strategy=op.iron_condor,
    capital=100000.0, quantity=2, max_positions=3,
    selector="nearest", max_entry_dte=45, exit_dte=14,
    profit_target=0.50, stop_loss=2.00,
    slippage_model="spread_pct", slippage_value=0.10,
    commission_per_contract=0.65
)
performance_summary = simulation_result.summary`}</pre>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100">Compiled Engine Scaling: Optopsy-MCP</h3>
              <span className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10 px-2 py-0.5 rounded">Rust + Apache Arrow + Rhai</span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">When scaling to high-frequency or minute-level resolutions, Python workflows face tabular join bottlenecks. The compiled <code className="font-mono text-xs">optopsy-mcp</code> engine loads Parquet partitions directly into memory-mapped Arrow tables, evaluating strategy logic inside an embedded Rhai scripting virtual machine.</p>
            <div className="bg-[#14171B] dark:bg-[#05070A] rounded-lg p-4 border border-stone-800 overflow-x-auto">
              <div className="text-xs font-mono text-stone-400 mb-2">// Rhai Strategy Script evaluated per timestamp bar</div>
              <pre className="font-mono text-xs text-stone-300 leading-relaxed whitespace-pre">{`fn on_bar(ctx) {
    if ctx.position_count >= 3 { return []; }
    if ctx.indicators.rsi < 35.0 {
        let p = ctx.short_put(0.30, 45);
        if p != () { return [p]; }
    }
    []
}
fn on_exit_check(ctx, pos) {
    if pos.pnl_pct >= 0.50 { return close_position("profit_target_reached"); }
    if pos.dte <= 7        { return close_position("gamma_risk_mitigation"); }
    hold_position()
}`}</pre>
            </div>
          </div>
        </section>

        {/* Data Scale */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100">Scale and Structural Data Bottlenecks</h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm">In equity simulations, the data surface is a 1D vector. In options, the state space expands into a high-dimensional continuous and discrete manifold:</p>
          </div>
          <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg border border-stone-800 font-mono text-xs md:text-sm text-stone-200 overflow-x-auto">
            <div className="text-[#D08F52] text-xs uppercase mb-2 tracking-wider">Surface Coordinate Mapping Function</div>
            <code>V: (t, K, T, &omega;, venue) &rarr; (bid, ask, bid_size, ask_size, &sigma;, &Delta;, &Gamma;, &Theta;, &nu;)</code>
          </div>
          <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
            <table className="w-full text-left text-xs md:text-sm border-collapse font-mono">
              <thead>
                <tr className="bg-stone-100 dark:bg-[#161B22] border-b border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300">
                  <th className="p-3 font-sans font-semibold">Universe &amp; Granularity</th>
                  <th className="p-3 font-sans font-semibold">Daily Records / Asset</th>
                  <th className="p-3 font-sans font-semibold">Annual Size (1 Symbol)</th>
                  <th className="p-3 font-sans font-semibold">US Market Annual Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800 tabular-nums">
                <tr className="bg-white dark:bg-[#12161D]"><td className="p-3 font-sans font-medium text-stone-900 dark:text-stone-100">Equities: Daily EOD</td><td className="p-3 text-stone-600 dark:text-stone-400">1</td><td className="p-3 text-stone-600 dark:text-stone-400">~10 KB</td><td className="p-3 text-stone-600 dark:text-stone-400">~50 MB</td></tr>
                <tr className="bg-stone-50/50 dark:bg-stone-900/30"><td className="p-3 font-sans font-medium text-stone-900 dark:text-stone-100">Equities: 1-Minute Bars</td><td className="p-3 text-stone-600 dark:text-stone-400">390</td><td className="p-3 text-stone-600 dark:text-stone-400">~4 MB</td><td className="p-3 text-stone-600 dark:text-stone-400">~25 GB</td></tr>
                <tr className="bg-white dark:bg-[#12161D]"><td className="p-3 font-sans font-medium text-stone-900 dark:text-stone-100">SPX Options: Daily EOD Chain</td><td className="p-3 text-stone-600 dark:text-stone-400">4,000&ndash;8,000</td><td className="p-3 text-stone-600 dark:text-stone-400">~50 MB</td><td className="p-3 text-stone-600 dark:text-stone-400">~50 MB</td></tr>
                <tr className="bg-stone-50/50 dark:bg-stone-900/30"><td className="p-3 font-sans font-medium text-stone-900 dark:text-stone-100">SPX Options: 1-Minute Bars</td><td className="p-3 text-stone-600 dark:text-stone-400">1.5M&ndash;3.0M</td><td className="p-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">15&ndash;30 GB</td><td className="p-3 text-stone-600 dark:text-stone-400">15&ndash;30 GB</td></tr>
                <tr className="bg-white dark:bg-[#12161D]"><td className="p-3 font-sans font-medium text-stone-900 dark:text-stone-100">US Listed Options: 1-Min NBBO</td><td className="p-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">~400,000,000</td><td className="p-3 text-stone-600 dark:text-stone-400">N/A</td><td className="p-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">2.5&ndash;4.0 TB (compressed)</td></tr>
                <tr className="bg-stone-50/50 dark:bg-stone-900/30"><td className="p-3 font-sans font-medium text-stone-900 dark:text-stone-100">US Listed Options: OPRA Tick</td><td className="p-3 text-stone-600 dark:text-stone-400">Tens of Billions</td><td className="p-3 text-stone-600 dark:text-stone-400">N/A</td><td className="p-3 text-[#BC4128] dark:text-[#E2694A] font-semibold">Multiple TBs / Day</td></tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800">
              <h3 className="font-serif text-stone-900 dark:text-stone-100 text-sm mb-1.5 font-semibold">Partitioned Columnar Formats</h3>
              <p className="text-stone-600 dark:text-stone-400">Storage in Apache Parquet or Arrow, partitioned by symbol, year, and month. Allows projection pushdown to load only referenced strike/bid/ask columns.</p>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800">
              <h3 className="font-serif text-stone-900 dark:text-stone-100 text-sm mb-1.5 font-semibold">Sparse Surface Grids</h3>
              <p className="text-stone-600 dark:text-stone-400">Interpolating across a pre-indexed grid of delta and maturity coordinates rather than performing full table scans over raw quotes.</p>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800">
              <h3 className="font-serif text-stone-900 dark:text-stone-100 text-sm mb-1.5 font-semibold">Local Caches with Gap Detection</h3>
              <p className="text-stone-600 dark:text-stone-400">Maintaining local caches (<code className="font-mono text-xs">~/.optopsy/cache/</code>) that inspect Parquet bounds and download only missing historical trade dates.</p>
            </div>
          </div>
        </section>

        {/* Microstructure */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100">Market Microstructure and Liquidity Traps</h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Options backtests routinely produce false alpha due to simplified execution pricing and reliance on stale trade logs.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">The Midpoint Execution Trap</h3>
            <div className="bg-[#14171B] dark:bg-[#05070A] p-4 rounded-lg border border-stone-800 font-mono text-xs md:text-sm text-stone-200">
              <div className="text-[#D08F52] text-xs uppercase mb-2 tracking-wider">Phantom Alpha Quantification</div>
              <code>Phantom Alpha = 200 trades &times; 4 legs &times; $10.00 = $8,000.00</code>
            </div>
            <div className="p-4 rounded-lg bg-stone-50 dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 text-xs md:text-sm space-y-1.5">
              <div className="font-semibold text-stone-900 dark:text-stone-100">Worked Numeric Breakdown:</div>
              <ul className="space-y-1 text-stone-600 dark:text-stone-400">
                <li>&bull; An OTM put is quoted at $0.80 Bid / $1.00 Ask (Midpoint = $0.90).</li>
                <li>&bull; Filling at midpoint captures an unearned $0.10/share ($10.00/contract) advantage on entry and another $10.00 on exit.</li>
                <li>&bull; For an iron condor executing 200 trades annually across 4 legs, this manufactures <span className="font-mono font-semibold text-[#BC4128] dark:text-[#E2694A]">$8,000.00</span> in fictitious profit.</li>
                <li>&bull; On a $50,000 account, this distortion produces an artificial <span className="font-mono font-semibold text-[#BC4128] dark:text-[#E2694A]">16.0% annualized boost</span>.</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 space-y-2">
              <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">The Last Traded Price Fallacy</h3>
              <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">OTM strikes trade infrequently. If a stock plunges, quotes may widen to $4.20 / $4.60 while the recorded <code className="font-mono text-xs">last_price</code> remains at $0.35 from three days prior. Backtests relying on trade prints understate drawdowns and fail to trigger stop-losses.</p>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 space-y-2">
              <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Complex Orders vs Legging Risk</h3>
              <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">Multi-leg strategies trade in live markets via exchange <TermTooltip term="Complex Order Books (COB)" definition="Specialized exchange matching systems that execute multi-leg option orders as a unified single transaction at a net limit price." />. Simulating legs separately ignores wider composite spreads and obscures <TermTooltip term="Legging Risk" definition="The operational risk that one leg of a multi-leg trade fills while another remains unfilled, leaving the portfolio with unintended directional exposure." />.</p>
            </div>
          </div>
        </section>

        {/* Settlement */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100">Assignment, Pin Risk, and Settlement Complexities</h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Options settlement introduces sharp structural divides between index products and physically delivered single equities.</p>
          </div>
          <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-[#161B22] border-b border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300">
                  <th className="p-3 font-semibold">Settlement Dimension</th>
                  <th className="p-3 font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Cash-Settled Indices (e.g., SPX, NDX)</th>
                  <th className="p-3 font-semibold text-[#BC4128] dark:text-[#E2694A]">Physically Settled Equities/ETFs (e.g., SPY, AAPL)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                <tr className="bg-white dark:bg-[#12161D]"><td className="p-3 font-medium text-stone-900 dark:text-stone-100">Settlement Rules</td><td className="p-3 text-stone-600 dark:text-stone-400">ITM value settled entirely in cash against the official SET quote.</td><td className="p-3 text-stone-600 dark:text-stone-400">Contracts ITM by &ge; $0.01 convert into 100 physical equity shares per contract.</td></tr>
                <tr className="bg-stone-50/50 dark:bg-stone-900/30"><td className="p-3 font-medium text-stone-900 dark:text-stone-100">Early Exercise Risk</td><td className="p-3 text-stone-600 dark:text-stone-400">Non-existent; European-style rules restrict exercise until expiration.</td><td className="p-3 text-stone-600 dark:text-stone-400">Persistent; highly acute prior to ex-dividend dates or when interest carry exceeds put extrinsic value.</td></tr>
                <tr className="bg-white dark:bg-[#12161D]"><td className="p-3 font-medium text-stone-900 dark:text-stone-100">After-Hours Market Exposure</td><td className="p-3 text-stone-600 dark:text-stone-400">Negligible; settlement determined at the calculation print.</td><td className="p-3 text-stone-600 dark:text-stone-400">High; underlying shares trade until 8:00 PM EST while OCC contrary exercise notices clear until 5:30 PM EST.</td></tr>
                <tr className="bg-stone-50/50 dark:bg-stone-900/30"><td className="p-3 font-medium text-stone-900 dark:text-stone-100">Pin Risk Mechanics</td><td className="p-3 text-stone-600 dark:text-stone-400">Limited to cash payout variance; zero overnight equity exposure.</td><td className="p-3 text-[#BC4128] dark:text-[#E2694A]">Severe; unpredictable post-close assignment creates unhedged weekend stock positions.</td></tr>
                <tr className="bg-white dark:bg-[#12161D]"><td className="p-3 font-medium text-stone-900 dark:text-stone-100">Margin Shock Profile</td><td className="p-3 text-stone-600 dark:text-stone-400">Predictable; margin releases immediately upon cash settlement.</td><td className="p-3 text-[#BC4128] dark:text-[#E2694A]">Catastrophic; physical share conversion can expand exposure tenfold, causing margin calls.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Ex-Dividend Call Assignment Condition</h3>
              <div className="bg-[#14171B] dark:bg-[#05070A] p-3 rounded-lg border border-stone-800 font-mono text-xs text-stone-200"><code>D &gt; C_extrinsic = C(S, K, &tau;) &minus; (S &minus; K)</code></div>
              <p className="text-xs text-stone-600 dark:text-stone-400">Rational counterparties exercise calls early when dividend D exceeds remaining extrinsic value, leaving short call sellers short stock and liable for the dividend.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Cost-of-Carry Put Exercise Condition</h3>
              <div className="bg-[#14171B] dark:bg-[#05070A] p-3 rounded-lg border border-stone-800 font-mono text-xs text-stone-200"><code>r &middot; K &middot; &tau; &gt; P_extrinsic</code></div>
              <p className="text-xs text-stone-600 dark:text-stone-400">When interest rates r rise, the interest earned on cash strike proceeds K can exceed remaining put extrinsic value, triggering early assignment into long stock.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-stone-50 dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">
              <TermTooltip term="Pin Risk" definition="The structural tail risk occurring when an underlying stock trades right at a short strike at the 4:00 PM close, leaving the trader uncertain of overnight assignment until after-hours clearing clears." />{' '}and the After-Hours Gap
            </h3>
            <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">If SPY closes at $500.02 at 4:00 PM EST, short 500 calls appear in-the-money by $0.02. However, long holders have until 5:30 PM EST to submit <TermTooltip term="Contrary Exercise Advice" definition="A formal notice submitted by an option holder to the OCC to exercise or abandon an option contrary to the automatic exercise rules." />. If negative earnings break at 4:30 PM dropping SPY to $496.00, long holders abandon their calls, leaving the options seller with unexpected short or unassigned equity exposure across the weekend.</p>
          </div>
        </section>

        {/* Validation */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100">Validation Protocols and Bias Elimination</h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Options strategies have numerous interacting parameters (DTE, target delta, wing width, profit target, stop-loss multiplier), making them acutely susceptible to curve-fitting.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="text-xs uppercase font-mono tracking-wider text-[#BC4128] dark:text-[#E2694A]">Execution Hazard</div>
              <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Lookahead Contamination</h3>
              <ul className="space-y-1.5 text-xs md:text-sm text-stone-600 dark:text-stone-400">
                <li>&bull; Using EOD closing IV rank or ATR to enter morning trades at 10:00 AM.</li>
                <li>&bull; Assuming an intraday profit target hit at the session low without checking if the high breached a stop-loss earlier.</li>
                <li>&bull; <strong>Resolution:</strong> Enforce strict point-in-time state processing using lagged bars (t &minus; &Delta;t).</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="text-xs uppercase font-mono tracking-wider text-[#BC4128] dark:text-[#E2694A]">Universe Hazard</div>
              <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Survivorship Selection</h3>
              <ul className="space-y-1.5 text-xs md:text-sm text-stone-600 dark:text-stone-400">
                <li>&bull; Testing short-put strategies on modern S&amp;P 500 index members across a 15-year lookback.</li>
                <li>&bull; Excludes companies that suffered bankruptcy or distress-driven index removal.</li>
                <li>&bull; <strong>Resolution:</strong> Ingest dynamic point-in-time index constituent listings that preserve delisted firms.</li>
              </ul>
            </div>
          </div>
          <div className="p-5 rounded-lg bg-stone-50 dark:bg-[#12161D] border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="font-serif text-base text-stone-900 dark:text-stone-100">Out-of-Sample Verification Standards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
              <div className="space-y-1">
                <div className="font-semibold text-stone-900 dark:text-stone-100">Walk-Forward Optimization</div>
                <p className="text-stone-600 dark:text-stone-400">Optimizes parameters on rolling in-sample windows (e.g., 24 months) and evaluates strictly out-of-sample (e.g., 6 months).</p>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-stone-900 dark:text-stone-100"><TermTooltip term="CPCV" definition="Combinatorial Purged Cross-Validation: partitions historical data into cross-validation paths while purging overlapping contract spans and embargoing subsequent volatility shocks." /></div>
                <p className="text-stone-600 dark:text-stone-400">Purges training samples with overlapping contract lifecycles and embargos observations immediately following test shocks.</p>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-stone-900 dark:text-stone-100">Parameter Surface Flatness</div>
                <p className="text-stone-600 dark:text-stone-400">Ensures performance sits on a broad plateau; sharp returns at 18-delta that collapse at 17-delta or 19-delta indicate statistical noise.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}