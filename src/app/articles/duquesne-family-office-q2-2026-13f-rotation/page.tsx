'use client';

import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { Jargon, ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function DuquesneQ22026Article() {
  return (
    <ArticleFrame slug="duquesne-family-office-q2-2026-13f-rotation">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100 font-sans bg-transparent">

        {/* Stats row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-y border-[#A8672E]/30 dark:border-[#D08F52]/30 py-8 mb-12">
          <div className="flex flex-col">
            <span className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Total AUM</span>
            <span className="text-3xl md:text-4xl font-mono tabular-nums font-medium">$5.21B</span>
            <span className="text-xs font-mono text-[#1D8A70] dark:text-[#3CBF9C] mt-2">+54% from Q1 ($3.38B)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Turnover Rate</span>
            <span className="text-3xl md:text-4xl font-mono tabular-nums font-medium">60.17%</span>
            <span className="text-xs font-mono mt-2 opacity-80">48 new purchases</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Top-10 Concent.</span>
            <span className="text-3xl md:text-4xl font-mono tabular-nums font-medium">45.83%</span>
            <span className="text-xs font-mono mt-2 opacity-80">Highly concentrated risk</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Q2 Value Change</span>
            <span className="text-3xl md:text-4xl font-mono tabular-nums font-medium text-[#1D8A70] dark:text-[#3CBF9C]">+19.66%</span>
            <span className="text-xs font-mono mt-2 opacity-80">Aggressive repositioning</span>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 rounded-lg mb-12">
          <h2 className="text-xl font-serif mb-6 text-[#A8672E] dark:text-[#D08F52]">Executive Overview</h2>
          <ul className="space-y-4 list-disc list-outside ml-5">
            <li><strong>Severe departure from Wall Street consensus:</strong> The portfolio structurally reorganized, abandoning passive exposure to broad semiconductor manufacturers.</li>
            <li><strong>AI vector shift:</strong> Capital aggressively rotated into physical AI constraints: hyperscale cloud providers, energy infrastructure, and digital memory storage.</li>
            <li><strong>Barbell macro strategy deployed:</strong> Massive deployments into precision diagnostics, legacy aviation, and emerging market commodities to capture idiosyncratic growth while hedging prolonged macroeconomic volatility.</li>
            <li><strong>Options utilized for extreme flexibility:</strong> The fund utilized asymmetric options (e.g., AMZN calls, liquidation of RSP equal-weight calls) to magnify returns and strictly define downside risk.</li>
          </ul>
        </section>

        {/* Macroeconomic Framework */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 mb-6">The Macroeconomic Framework</h2>
          <ul className="space-y-3 list-none pl-0">
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <span><strong>Federal Reserve Stance:</strong> Benchmark interest rates held steady at <span className="font-mono tabular-nums">3.5% - 3.75%</span> amidst stubborn localized inflation and a cooling labor market.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <span><strong>Systemic Risks:</strong> A <span className="font-mono tabular-nums">$36 trillion</span> U.S. debt burden, rising consumer credit stress, and commercial real estate pressures point to a potential &ldquo;trust moment&rdquo; regarding the U.S. deficit.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <span><strong>Portfolio Posture:</strong> Preparing for a bifurcated economic reality combining severe capacity bottlenecks in next-gen tech with systemic inflation risks requiring hard-asset exposure.</span>
            </li>
          </ul>
        </section>

        {/* Evolution of the AI Trade */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 mb-6">Evolution of the AI Trade</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Surgical dismantling of legacy semiconductor exposure in favor of targeted platform monopolists and advanced memory providers.</p>

          <ComparisonGrid>
            <ComparisonCard title="Exited / Reduced Positions" tone="neg">
              <ul className="space-y-4">
                <li>
                  <strong>Broad Logic Semiconductors:</strong><br />
                  <span className="font-mono text-sm">Broadcom (AVGO) [-195,955 shares]</span><br />
                  <span className="font-mono text-sm">Intel (INTC) [-411,400 shares]</span>
                </li>
                <li>
                  <strong>Edge Hardware:</strong><br />
                  <span className="font-mono text-sm">Apple (AAPL) [Historically absent/reduced]</span>
                </li>
                <li>
                  <strong>Commodity Memory:</strong><br />
                  <span className="font-mono text-sm">Micron Tech (MU) [-23,400 shares]</span>
                </li>
                <li>
                  <strong>Peripheral Infrastructure:</strong><br />
                  <span className="font-mono text-sm">Cloudflare (NET), Celestica (CLS)</span>
                </li>
              </ul>
            </ComparisonCard>

            <ComparisonCard title="Initiated / Increased Positions" tone="pos">
              <ul className="space-y-4">
                <li>
                  <strong>Specific Compute &amp; Foundry:</strong><br />
                  <span className="font-mono text-sm">AMD [+72,900 shares]</span><br />
                  <span className="font-mono text-sm">TSM [+19.1%, 590,000 total shares]</span>
                </li>
                <li>
                  <strong>Cloud Platform Monopolies:</strong><br />
                  <span className="font-mono text-sm">Alphabet (GOOGL) [New: 336,300 shares]</span><br />
                  <span className="font-mono text-sm">Amazon (AMZN) [+1,082.5%, 541,600 shares]</span>
                </li>
                <li>
                  <strong>High-Density Storage:</strong><br />
                  <span className="font-mono text-sm">Seagate (STX) [+140.6%, 122,000 shares]</span><br />
                  <span className="font-mono text-sm">SanDisk (SNDK) [New: 38,155 shares]</span>
                </li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>

          {/* Alphabet Q2 financial mechanics */}
          <div className="w-full overflow-x-auto rounded-xl shadow-lg mt-8">
            <div className="bg-[#14171B] dark:bg-[#05070A] text-slate-200 p-6 md:p-8 min-w-[600px]">
              <h3 className="text-[#A8672E] dark:text-[#D08F52] font-serif mb-2">The Infrastructure Oligopoly Toll: Alphabet (GOOGL) Q2 Dynamics</h3>
              <p className="text-sm text-slate-400 mb-6 font-sans">
                The decision to purchase Alphabet alongside historic <Jargon term="CapEx" definition="Capital Expenditures: massive investments in physical infrastructure like AI data centers." /> indicates a bet that financial moats will establish an enterprise AI monopoly.
              </p>

              <h4 className="font-sans text-xs uppercase tracking-wider text-gray-400 mb-2">Operating Revenue</h4>
              <div className="border-l-2 border-[#A8672E] dark:border-[#D08F52] pl-4 space-y-1.5">
                <div className="grid grid-cols-[1fr_auto] gap-2 items-baseline font-mono text-sm text-gray-300">
                  <span>Operating Revenue</span>
                  <span className="tabular-nums">$119.80 Billion</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2 items-baseline font-mono text-sm text-gray-400 pl-4">
                  <span>Google Cloud Revenue</span>
                  <span className="tabular-nums">$24.77 Billion</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2 items-baseline font-mono text-sm text-gray-400 pl-4">
                  <span>YoY Revenue Growth</span>
                  <span className="tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+24.0%</span>
                </div>
              </div>

              <h4 className="font-sans text-xs uppercase tracking-wider text-gray-400 mt-6 mb-2">Deductions</h4>
              <div className="border-l-2 border-[#BC4128] dark:border-[#E2694A] pl-4 space-y-1.5">
                <div className="grid grid-cols-[1fr_auto] gap-2 items-baseline font-mono text-sm text-gray-300">
                  <span>Quarterly CapEx (AI Infrastructure)</span>
                  <span className="tabular-nums text-[#BC4128] dark:text-[#E2694A]">-$44.92 Billion</span>
                </div>
              </div>

              <h4 className="font-sans text-xs uppercase tracking-wider text-gray-400 mt-6 mb-2">Resulting Metrics</h4>
              <div className="border-t border-gray-700 pt-3 space-y-2">
                <div className="grid grid-cols-[1fr_auto] gap-2 items-baseline font-mono text-base font-bold text-white">
                  <span>Free Cash Flow (FCF)</span>
                  <span className="tabular-nums text-[#BC4128] dark:text-[#E2694A]">-$5.86 Billion</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2 items-baseline font-mono text-sm text-gray-300">
                  <span>Intrinsic &ldquo;GF Value&rdquo; Premium</span>
                  <span className="tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+37.3%</span>
                </div>
              </div>

              <p className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-300">
                <strong>Strategic rationale:</strong> The short-term free cash flow deficit (-$5.86B) is viewed not as an operational failure, but as an insurmountable barrier to entry for competitors &mdash; the AI arms race requires tens of billions in continuous quarterly CapEx.
              </p>
            </div>
          </div>
        </section>

        <InfographicSlot alt="Duquesne Family Office Q2 2026 13F Rotation" />

        {/* Energy-Compute Nexus */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 mb-6">The Energy-Compute Nexus</h2>
          <ul className="space-y-3 list-none pl-0 mb-6">
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <span><strong>Grid Bottlenecks:</strong> Multi-gigawatt data center demands face years-long interconnection delays in PJM and ERCOT. New York pending data center requests reached <span className="font-mono tabular-nums">12 GW</span> by May 2026.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <span><strong>Stranded Power Arbitrage:</strong> The fund bypassed utility queues by acquiring digital asset miners with massive, interconnected power capacity: Bitdeer (4.07M shares), Riot Platforms (754.8K shares), Hut 8 (314.1K shares), and IREN (87.1K shares).</span>
            </li>
          </ul>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 font-serif text-sm font-medium text-slate-700 dark:text-slate-300">Bitdeer (BTDR) Metrics</th>
                  <th className="p-4 font-serif text-sm font-medium text-slate-700 dark:text-slate-300">May 2026</th>
                  <th className="p-4 font-serif text-sm font-medium text-slate-700 dark:text-slate-300">June 2026</th>
                  <th className="p-4 font-serif text-sm font-medium text-slate-700 dark:text-slate-300">YoY Growth</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm tabular-nums divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
                <tr>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-sans">Self-Mining Hash Rate</td>
                  <td className="p-4">70.2 <Jargon term="EH/s" definition="Exahashes per second: a measure of total computational power in cryptographic mining operations." /></td>
                  <td className="p-4">73.0 EH/s</td>
                  <td className="p-4 text-[#1D8A70] dark:text-[#3CBF9C]">+342%</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-sans">Total Electrical Capacity</td>
                  <td className="p-4">3,003.5 MW</td>
                  <td className="p-4">3,013.5 MW</td>
                  <td className="p-4 text-slate-400">N/A</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-sans">AI Cloud ARR</td>
                  <td className="p-4">~$69 Million</td>
                  <td className="p-4">~$76 Million</td>
                  <td className="p-4 text-slate-400">N/A</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-sans">GPU Utilization Rate</td>
                  <td className="p-4">90%</td>
                  <td className="p-4">95%</td>
                  <td className="p-4 text-[#1D8A70] dark:text-[#3CBF9C]">+5% (Seq)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Global Macro Barbell & Precision Medicine */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 mb-6">The Global Macro Barbell</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-lg text-slate-700 dark:text-slate-300 mb-3">Latin American Energy &amp; Scarcity</h3>
              <ul className="space-y-2 list-disc list-outside ml-4 text-sm">
                <li><strong>Brazil ETF (EWZ):</strong> $131.9M stake. High real interest rates, 4.49% dividend yield, commodity proxy.</li>
                <li><strong>YPF S.A. (YPF):</strong> $149.5M stake. High-beta reform trade to unlock Vaca Muerta shale reserves.</li>
                <li><strong>Argentina ETF (ARGT):</strong> $36.1M stake. Privatization upside.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg text-slate-700 dark:text-slate-300 mb-3">Consumer &amp; Interest Rate Sensitivity</h3>
              <ul className="space-y-2 list-disc list-outside ml-4 text-sm">
                <li><strong>BBB Foods (TBBB):</strong> 3.1M shares. Mexican hard-discount retail; 16% same-store sales growth hedging a weak consumer.</li>
                <li><strong>D.R. Horton (DHI) &amp; UWM Holdings (UWMC):</strong> Front-running rate cuts. Acquired at peak cyclical pessimism regarding mortgage origins.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-serif border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 mb-6">Precision Medicine: The Idiosyncratic Growth Engine</h2>
          <p className="mb-4">Natera Inc. (NTRA) represents the single largest portfolio holding, comprising between 16.6% and 23.9% of total equities ($612M+ market value).</p>

          <div className="bg-[#14171B] dark:bg-[#05070A] text-slate-200 p-6 md:p-8 rounded-lg shadow-inner">
            <h3 className="text-[#A8672E] font-serif mb-4">Natera (NTRA) Q2 2026 Financial Acceleration</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px] font-mono text-sm tabular-nums">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2 font-sans font-medium">Metric</th>
                    <th className="py-2">Q2 2025</th>
                    <th className="py-2">Q2 2026</th>
                    <th className="py-2">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="py-3 font-sans text-slate-300">Total Revenue</td>
                    <td className="py-3">$546.6M</td>
                    <td className="py-3">$752.8M</td>
                    <td className="py-3 text-[#1D8A70]">+37.7%</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-sans text-slate-300">Gross Margin</td>
                    <td className="py-3">63.4%</td>
                    <td className="py-3">64.5%</td>
                    <td className="py-3 text-[#1D8A70]">+1.1%</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-sans text-slate-300">Net Loss</td>
                    <td className="py-3 text-[#BC4128]">-$100.9M</td>
                    <td className="py-3 text-[#BC4128]">-$67.0M</td>
                    <td className="py-3 text-[#1D8A70]">Narrowed 33.6%</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-sans text-slate-300">Oncology Tests Processed</td>
                    <td className="py-3">188,800</td>
                    <td className="py-3">296,700</td>
                    <td className="py-3 text-[#1D8A70]">+57.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-400 font-sans border-t border-slate-800 pt-4">
              <strong>Thesis:</strong> Massive conviction based on &ldquo;SaaS-ification&rdquo; of healthcare. Serial <Jargon term="MRD" definition="Molecular Residual Disease: tumor-informed testing that monitors a patient's blood over months/years for cancer recurrence." /> testing yields highly predictable, recurring revenue unaffected by macroeconomic cycles.
            </p>
          </div>
        </section>

        {/* Aerospace Resurgence */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 mb-6">Aerospace Resurgence &amp; Premium Bifurcation</h2>
          <ul className="space-y-3 list-none pl-0">
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <span><strong>Aggressive Accumulation:</strong> Established 603,000 shares in Delta (DAL); increased United Airlines (UAL) by <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">202.8%</span> to 795,000 shares.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <span><strong>United (UAL) Fundamentals:</strong> Posted Q2 operating revenue of <span className="font-mono tabular-nums">$17.7B</span> (<span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+16.0%</span> YoY). Premium cabin revenue rose <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">16.4%</span>.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <span><strong>Capital Allocation:</strong> Legacy carriers are generating significant free cash flow to actively de-leverage balance sheets despite a $2.3B YoY fuel expense increase.</span>
            </li>
          </ul>
        </section>

        {/* Strategic Estimations */}
        <section>
          <h2 className="text-2xl font-serif border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 mb-6">Strategic Estimations (2026-2027)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-100 dark:border-slate-800">
              <h3 className="font-serif text-[#A8672E] dark:text-[#D08F52] mb-2">1. AI Infrastructure Maturation</h3>
              <p className="text-sm">Power and real estate plays (Bitdeer, Riot) will yield asymmetric returns over 12-18 months. Exits anticipated once hyperscaler CapEx peaks.</p>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-100 dark:border-slate-800">
              <h3 className="font-serif text-[#A8672E] dark:text-[#D08F52] mb-2">2. Biotech Margin Inflection</h3>
              <p className="text-sm">Natera&apos;s 64.5% gross margins will drop to the bottom line as MRD testing scales, shifting the entity from high-burn to cash-flow positive.</p>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-100 dark:border-slate-800">
              <h3 className="font-serif text-[#A8672E] dark:text-[#D08F52] mb-2">3. Aviation Re-rating</h3>
              <p className="text-sm">UAL and DAL held for duration. Debt prepayment and structural consumer shifts toward premium travel will force equity multiples higher.</p>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-100 dark:border-slate-800">
              <h3 className="font-serif text-[#A8672E] dark:text-[#D08F52] mb-2">4. Soft Landing vs. Reflation</h3>
              <p className="text-sm">Masterful hedge: Domestic housing (DHI) captures the soft-landing rate cut scenario, while LatAm commodities (EWZ) protect against sticky global inflation.</p>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
