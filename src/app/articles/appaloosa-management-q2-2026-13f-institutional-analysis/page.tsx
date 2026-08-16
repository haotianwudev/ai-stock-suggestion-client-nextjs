'use client';

import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { Jargon, ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function AppaloosaQ22026Article() {
  return (
    <ArticleFrame slug="appaloosa-management-q2-2026-13f-institutional-analysis">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100 font-sans bg-transparent">

        {/* Stats row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Q2 Assets</div>
            <div className="font-mono text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] tabular-nums">$7.47B</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">H1 2026 Gross Return</div>
            <div className="font-mono text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] tabular-nums">+32.0%</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Top 10 Concentration</div>
            <div className="font-mono text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] tabular-nums">78.93%</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Macro Hedge Size</div>
            <div className="font-mono text-2xl font-bold text-[#BC4128] dark:text-[#E2694A] tabular-nums">835k</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">AAPL Put Contracts</div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border border-slate-300 dark:border-slate-600">
            <h2 className="font-serif text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Key Takeaways</h2>
            <ul className="space-y-3 font-sans text-slate-700 dark:text-slate-300 list-none pl-0">
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1 font-bold">▪</span>
                <span><strong>Defensive Rotation:</strong> Assets surged from $5.93B to $7.47B. Capital shifted from high-beta semiconductor momentum into mega-cap technology monopolies.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1 font-bold">▪</span>
                <span><strong>AI Maturation:</strong> Aggressive profit-taking on memory pure-plays (Micron, SanDisk) in favor of scalable platform compute (Amazon, Alphabet).</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1 font-bold">▪</span>
                <span><strong>Macro Hedging:</strong> Implementation of a massive 3.13% weighting in Apple put options to insulate against index-wide technology multiple compression.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1 font-bold">▪</span>
                <span><strong>Distressed Tactical Entries:</strong> Whipsaw entries into battered aerospace and airline equities (Boeing, American Airlines) demonstrating contrarian agility.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Macro context */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Macroeconomic Context and the Liquidity Framework</h2>
          <p className="mb-4">
            The overarching philosophy of Appaloosa is historically tied to central bank liquidity vectors and interest rate trajectories. By the summer of 2026, the global macroeconomic landscape presented a highly complex dichotomy.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Disinflation vs. Growth:</strong> July 2026 CPI indicated headline inflation rose <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">0.1%</span> MoM (core at <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">2.5%</span>).</li>
            <li><strong>Labor Market Softening:</strong> Concurrent data revealed structural softening, introducing recessionary risks and threatening consumer resilience.</li>
            <li><strong>Policy Risk (&ldquo;Danger Territory&rdquo;):</strong> Premature Fed rate cuts risk reigniting asset bubbles; delayed cuts risk mathematically unsustainable forward tech multiples.</li>
            <li><strong>Profit Realization:</strong> The <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">32%</span> gross return in H1 created a systemic incentive to mathematically de-risk the portfolio.</li>
          </ul>
        </section>

        <InfographicSlot alt="Appaloosa Management Q2 2026 13F Rotation" />

        {/* Comparative Portfolio Structure */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Comparative Portfolio Structure: Q1 vs. Q2 2026</h2>

          <h3 className="font-serif text-xl font-medium mb-4">Top 10 Portfolio Holdings (As of June 30, 2026)</h3>
          <div className="overflow-x-auto mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
            <table className="w-full text-left font-sans text-sm min-w-[800px]">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold uppercase text-xs tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Ticker</th>
                  <th className="p-3">Company Name</th>
                  <th className="p-3">% Weight</th>
                  <th className="p-3">Market Value</th>
                  <th className="p-3">Q2 Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono tabular-nums text-slate-800 dark:text-slate-200">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3">1</td>
                  <td className="p-3 font-semibold">AMZN</td>
                  <td className="p-3 font-sans">Amazon.com Inc.</td>
                  <td className="p-3 text-[#A8672E] dark:text-[#D08F52]">15.95%</td>
                  <td className="p-3">$1,191.70M</td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">+15.74%</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3">2</td>
                  <td className="p-3 font-semibold">MU</td>
                  <td className="p-3 font-sans">Micron Technology Inc.</td>
                  <td className="p-3 text-[#A8672E] dark:text-[#D08F52]">15.06%</td>
                  <td className="p-3">$1,125.43M</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">-41.44%</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3">3</td>
                  <td className="p-3 font-semibold">TSM</td>
                  <td className="p-3 font-sans">Taiwan Semiconductor</td>
                  <td className="p-3">10.55%</td>
                  <td className="p-3">$787.99M</td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">+24.29%</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3">4</td>
                  <td className="p-3 font-semibold">GOOG</td>
                  <td className="p-3 font-sans">Alphabet Inc. (Class C)</td>
                  <td className="p-3">8.75%</td>
                  <td className="p-3">$653.66M</td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">+6.77%</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3">5</td>
                  <td className="p-3 font-semibold">UBER</td>
                  <td className="p-3 font-sans">Uber Technologies Inc.</td>
                  <td className="p-3">7.43%</td>
                  <td className="p-3">$555.20M</td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">+21.50%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-serif text-xl font-medium mb-4">Strategic Exits and Liquidations in Q2 2026</h3>
          <div className="overflow-x-auto mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
            <table className="w-full text-left font-sans text-sm min-w-[800px]">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold uppercase text-xs tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Ticker</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Prev. Wgt</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Strategic Inference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-800 dark:text-slate-200">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">SNDK</td>
                  <td className="p-3">SanDisk Corp.</td>
                  <td className="p-3 font-mono tabular-nums">3.01%</td>
                  <td className="p-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-100%</td>
                  <td className="p-3 text-sm italic">Cyclical peak profit-taking on memory flash gains.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">GLW</td>
                  <td className="p-3">Corning Inc.</td>
                  <td className="p-3 font-mono tabular-nums">2.59%</td>
                  <td className="p-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-100%</td>
                  <td className="p-3 text-sm italic">Rotation out of physical materials and legacy hardware.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">PDD</td>
                  <td className="p-3">PDD Holdings</td>
                  <td className="p-3 font-mono tabular-nums">1.55%</td>
                  <td className="p-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-100%</td>
                  <td className="p-3 text-sm italic">De-risking Chinese consumer e-commerce vulnerability.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">LYFT</td>
                  <td className="p-3">Lyft Inc.</td>
                  <td className="p-3 font-mono tabular-nums">0.61%</td>
                  <td className="p-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-100%</td>
                  <td className="p-3 text-sm italic">Consolidation of mobility exposure entirely into Uber.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Trade Evolution */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">The Evolution and Maturation of the Artificial Intelligence Trade</h2>
          <p className="mb-6">
            The Q2 2026 adjustments trace a calculated movement up the technology value chain. The portfolio is migrating away from the highly cyclical physical commodities of memory chips toward platform monopolies and <Jargon term="Application-Specific Integrated Circuits (ASICs)" definition="Customized microchips designed for a specific application or purpose, such as AI training, rather than general-purpose use." />.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Phase 1: Memory & Hardware Cyclicality" tone="neg">
              <ul className="space-y-2 text-sm">
                <li><strong>Target:</strong> Pure-play memory providers (MU, SNDK).</li>
                <li><strong>Thesis:</strong> Explosive demand for <Jargon term="High-Bandwidth Memory (HBM)" definition="A specialized, high-performance RAM interface widely used in data centers for AI processing." />.</li>
                <li><strong>Action:</strong> Liquidated SanDisk (-100%), aggressively harvested Micron (-41.44%).</li>
                <li><strong>Vulnerability:</strong> Capacity expansion inevitably triggers supply gluts and inventory buildup.</li>
              </ul>
            </ComparisonCard>
            <ComparisonCard title="Phase 2: Platform Scale & Custom Silicon" tone="neutral">
              <ul className="space-y-2 text-sm">
                <li><strong>Target:</strong> Hyperscalers and custom chip designers (AMZN, GOOG, AVGO).</li>
                <li><strong>Thesis:</strong> Vertical integration and durable enterprise-grade AI cloud demand.</li>
                <li><strong>Action:</strong> AMZN increased by <span className="font-mono">+15.74%</span>; initiated AVGO at <span className="font-mono">0.76%</span> weight.</li>
                <li><strong>Durability:</strong> Insulated from commoditization risks with rigorous free cash flow protection.</li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>

          <div className="mt-8">
            <p className="mb-4">
              The decision to harvest Micron was driven by quantitative models signaling a cyclical peak stretched severely past intrinsic value.
            </p>
            <FormulaPanel
              title="Quantitative De-risking Trigger Model"
              formula="\text{Valuation Premium} = \frac{\text{Market Price}}{\text{Intrinsic Value}} - 1"
              example={{
                label: 'GF Value Model Application — Q2 2026 Peak (Illustrative Example)',
                rows: [
                  { label: 'Market Price (MU)', value: '$1,154.00' },
                  { label: 'Intrinsic Value', value: '≈ $686.90' },
                ],
                result: { label: 'Valuation Premium', value: '68.0%' },
                note: 'Action: execute "sell-into-strength" when Premium exceeds 50%.',
              }}
            />
          </div>
        </section>

        {/* Infrastructure and Power */}
        <section className="mb-12">
          <h3 className="font-serif text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Expanding the Horizon: Private-to-Public Infrastructure and Power</h3>
          <ul className="list-none space-y-4">
            <li className="pl-4 border-l-4 border-[#A8672E] dark:border-[#D08F52]">
              <strong>CoreWeave Inc. (CRWV):</strong> Initiated <span className="font-mono">1.44%</span> position. A pure-play GPU-as-a-Service infrastructure layer bridging Nvidia hardware and end-user software.
            </li>
            <li className="pl-4 border-l-4 border-[#A8672E] dark:border-[#D08F52]">
              <strong>SpaceX (SPCX):</strong> Initiated <span className="font-mono">0.51%</span> position, reflecting appetite for monopolistic aerospace/satellite infrastructure.
            </li>
            <li className="pl-4 border-l-4 border-[#1D8A70] dark:border-[#3CBF9C]">
              <strong>Vistra (VST) &amp; NRG Energy (NRG):</strong> Retained <span className="font-mono">4.70%</span> and <span className="font-mono">3.44%</span> weights, respectively. The ultimate AI bottleneck is grid power capacity. These producers can sign highly lucrative <Jargon term="Power Purchase Agreements (PPAs)" definition="Long-term contracts to supply electricity, crucial for data centers securing baseload power." /> directly with hyperscalers.
            </li>
          </ul>
        </section>

        {/* Tactical Whipsaws */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Tactical Whipsaws: The Contrarian Re-Entry</h2>
          <p className="mb-4">
            Appaloosa executed classic distressed value plays within airlines and aerospace, displaying a remarkable ability to pivot sentiment rapidly between quarters.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Q1 2026: Total Liquidation" tone="neg">
              <p className="text-sm">Aggressively departed capital-intensive travel networks. Fully exited large positions in American Airlines (AAL), Delta Air Lines (DAL), and United Airlines (UAL).</p>
            </ComparisonCard>
            <ComparisonCard title="Q2 2026: The Distressed Entry" tone="neutral">
              <p className="text-sm">Initiated massive new position: <span className="font-mono">7.5M</span> shares of AAL (1.81% weight) under $15/share, capitalizing on compressed forward P/E and a $2B free cash flow pipeline. Initiated <span className="font-mono">800k</span> shares of Boeing (BA) at peak operational despair.</p>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        {/* Geopolitics */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Geopolitics and Risk Management</h2>

          <h3 className="font-serif text-2xl font-semibold mb-3">The Structural De-Risking of Chinese Equities</h3>
          <p className="mb-3">
            Appaloosa entirely exited major consumer-facing Chinese technology and e-commerce allocations to eliminate unquantifiable regulatory tail-risk associated with <Jargon term="American Depositary Receipts (ADRs)" definition="Certificates issued by a U.S. bank representing a specified number of shares in a foreign stock, traded on U.S. exchanges." />.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-1">
            <li>Liquidated remaining <span className="font-mono text-[#BC4128] dark:text-[#E2694A]">900,000</span> shares of PDD.</li>
            <li>Liquidated remaining <span className="font-mono text-[#BC4128] dark:text-[#E2694A]">1,305,000</span> shares of JD.com.</li>
            <li>Liquidated KraneShares China Internet (KWEB) entirely.</li>
            <li>Trimmed Alibaba (BABA) by <span className="font-mono text-[#BC4128] dark:text-[#E2694A]">42.28%</span> down to a 2.57% weight.</li>
          </ul>

          <h3 className="font-serif text-2xl font-semibold mb-3">Hedging the Heights: The Apple Put Strategy</h3>
          <p className="mb-4">
            Given the heavy concentration in mega-cap technology (AMZN, GOOG, META, TSM, NVDA), the fund requires an efficient insurance policy against systemic multiple compression.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-[#BC4128] dark:border-[#E2694A]">
            <ul className="space-y-3 font-sans text-slate-700 dark:text-slate-300 list-none pl-0">
              <li className="flex items-start">
                <span className="text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 font-bold">▪</span>
                <span><strong>The Position:</strong> Purchased <span className="font-mono">835,000</span> contracts of Apple Inc. (AAPL) Put options.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 font-bold">▪</span>
                <span><strong>Weight:</strong> <span className="font-mono">3.13%</span> portfolio weighting (~$241.6 million equivalent value).</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 font-bold">▪</span>
                <span><strong>Function:</strong> Synthetic macro hedge. Because AAPL anchors the S&amp;P 500 and Nasdaq 100, these puts provide explosive non-linear payoff buffering against broad index drawdowns or hawkish interest rate shocks.</span>
              </li>
            </ul>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
