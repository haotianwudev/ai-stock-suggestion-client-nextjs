'use client';

import {
  AlertCircle, ExternalLink,
  Activity, BarChart3, TrendingUp, Cpu, Globe,
  Zap, Network, Shield, AlertTriangle, BookOpen,
  Lightbulb, Calculator, Clock, CheckCircle2
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable Components ---

const SectionHeader = ({ title, icon: Icon, colorClass }: {
  title: string;
  icon: React.ElementType;
  colorClass: string;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`p-3 rounded-xl text-white ${colorClass} shadow-lg`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

const TutorialCard = ({ title, children, borderColor, bgColor }: {
  title?: string;
  children: React.ReactNode;
  borderColor: string;
  bgColor: string;
}) => (
  <div className={`bg-white rounded-2xl p-6 md:p-8 shadow-sm border-t-4 ${borderColor} ${bgColor} transition-all hover:shadow-md mb-6`}>
    {title && <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>}
    <div className="text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const ConceptBox = ({ title, children, icon: Icon, colorTheme }: {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  colorTheme: string;
}) => {
  const themes: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    purple: "bg-purple-50 border-purple-200 text-purple-900",
  };
  return (
    <div className={`rounded-xl border p-5 my-6 ${themes[colorTheme]}`}>
      <div className="flex items-center gap-2 mb-2 font-bold">
        {Icon && <Icon size={20} />}
        <h4>{title}</h4>
      </div>
      <div className="text-sm space-y-2 opacity-90">{children}</div>
    </div>
  );
};

const MathFormula = () => (
  <div className="bg-slate-900 text-slate-100 p-6 rounded-xl overflow-x-auto font-mono text-center shadow-inner my-6">
    <div className="text-xl md:text-2xl font-light tracking-wider">
      R<sub className="text-sm">i,t</sub> = &alpha;<sub className="text-sm">i,t</sub> + &beta;<sub className="text-sm">m</sub> R<sub className="text-sm">m,t</sub> + &Sigma; &beta;<sub className="text-sm">k</sub> F<sub className="text-sm">k,t</sub> + &epsilon;<sub className="text-sm">i,t</sub>
    </div>
    <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-slate-400">
      <span><strong className="text-blue-400">R</strong> = Total Return</span>
      <span><strong className="text-purple-400">&alpha;</strong> = Alpha</span>
      <span><strong className="text-green-400">&beta;m</strong> = Market Risk</span>
      <span><strong className="text-yellow-400">Fk</strong> = Risk Factors</span>
      <span><strong className="text-emerald-400">&epsilon;</strong> = Isolated Signal</span>
    </div>
  </div>
);

export default function ArticlePage() {
  return (
    <ArticleFrame slug="supply-chain">
      <div className="w-full flex justify-center py-8 bg-slate-900/5 px-6">
        <a href="https://www.theta.md/supply-chain" target="_blank" rel="noopener noreferrer" className="block max-w-5xl w-full group">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-indigo-200 relative hover:shadow-xl transition-shadow w-full">
            <img
              src="https://i.imgur.com/vqAxsnD.png"
              alt="Theta.md Supply Chain Analysis Platform"
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.01]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <ExternalLink size={16} />
                <span>Explore the live platform at theta.md/supply-chain</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <main className="max-w-5xl mx-auto px-6 md:px-12 pb-24 space-y-20 relative z-10">

          {/* Module 1: Quantitative Methodologies */}
          <section>
            <SectionHeader title="1. Quantitative Methodologies for Signal Isolation" icon={Calculator} colorClass="bg-gradient-to-br from-blue-500 to-cyan-600" />

            <TutorialCard borderColor="border-blue-500" bgColor="bg-white">
              <p>
                <a href="https://www.theta.md/supply-chain" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">Theta.md</a> is an independent quantitative research platform built by a solo quant, focused on a deceptively simple question: when a supplier&apos;s stock moves after a customer&apos;s earnings, is that a genuine supply chain signal &mdash; or just industry beta in disguise? Their answer involves a rigorous, falsification-first methodology that most sell-side research never attempts.
              </p>
              <p>
                The primary challenge in supply chain signal processing is disentangling idiosyncratic, network-driven information from systematic market noise. A supplier&apos;s stock might rise because of an explicit operational link, or simply because the broader market rallied. Theta.md attacks this problem head-on.
              </p>

              <ConceptBox title="The Mathematics of Decomposing Return Dynamics" icon={Lightbulb} colorTheme="blue">
                <p>To isolate a pure supply chain signal, quantitative researchers express a firm&apos;s return through an extended multi-factor decomposition equation. The goal is to isolate the idiosyncratic residual return <strong>(&epsilon;)</strong> and the time-varying alpha <strong>(&alpha;)</strong>.</p>
                <MathFormula />
              </ConceptBox>

              <ConceptBox title="Three-Layer Validation Framework (Theta.md)" icon={CheckCircle2} colorTheme="blue">
                <p>Independent quant research platform <strong>Theta.md</strong> applies a rigorous three-layer verification process to supply chain signals:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Layer 1 &mdash; Na&iuml;ve Check:</strong> Measure raw directional concordance between upstream and downstream earnings events (e.g., ~69% hit rate across 24 Micron&ndash;SK Hynix event pairs).</li>
                  <li><strong>Layer 2 &mdash; Multi-Factor Baseline:</strong> Add KOSPI, SOX index, and KRW/USD as control factors. The &ldquo;signal&rdquo; drops to ~55% and becomes statistically insignificant (p=0.416) &mdash; proving most of the concordance was industry beta, not firm-level transmission.</li>
                  <li><strong>Layer 3 &mdash; Placebo Validation:</strong> Run the identical test on unrelated stock pairs. Placebo group shows no significance, confirming the methodology itself is unbiased.</li>
                </ul>
                <p className="mt-2 font-semibold">Takeaway: without multi-factor correction, &ldquo;predicting B from A&rdquo; easily produces spurious signals.</p>
              </ConceptBox>

              <h4 className="font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
                <Cpu className="text-blue-500" size={20} /> Residualizing Against the SOX Index
              </h4>
              <p>
                In highly integrated sectors like global semiconductor manufacturing, quantitative models must actively filter out the overarching industry beta. The <strong>PHLX Semiconductor Sector Index (SOX)</strong> serves as the primary benchmark. Analysts use rolling regressions to extract the idiosyncratic component of the firm&apos;s return relative to the SOX index to verify if a signal (e.g., automotive demand) is genuine and independent of broader AI speculation.
              </p>

              <h4 className="font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
                <Globe className="text-blue-500" size={20} /> Neutralizing Currency (FX) Risk
              </h4>
              <p>
                Unhedged FX exposure is a massive source of statistical contamination. A supplier might report soaring revenues simply because their local currency depreciated against the US Dollar, artificially inflating the &ldquo;demand&rdquo; signal.
              </p>

              <div className="overflow-x-auto mt-4 rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                    <tr>
                      <th className="px-6 py-3">Risk Category</th>
                      <th className="px-6 py-3">Operational Definition</th>
                      <th className="px-6 py-3">Supply Chain Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-semibold">Transaction Risk</td>
                      <td className="px-6 py-4">Time lag between agreeing to a contract and payment settlement.</td>
                      <td className="px-6 py-4">Can unexpectedly inflate inventory costs and compress margins.</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-6 py-4 font-semibold">Translation Risk</td>
                      <td className="px-6 py-4">Translating foreign-denominated assets into reporting currency.</td>
                      <td className="px-6 py-4">Distorts reported profits and valuations, generating misleading signals.</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-semibold">Liquidity Risk</td>
                      <td className="px-6 py-4">Friction caused by cash flow mismatches across jurisdictions.</td>
                      <td className="px-6 py-4">Strains working capital, causing cascading downstream delivery failures.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TutorialCard>
          </section>

          {/* Module 2: Non-Linearity */}
          <section>
            <SectionHeader title="2. The Non-Linearity of Event Transmission" icon={Network} colorClass="bg-gradient-to-br from-amber-500 to-orange-600" />

            <TutorialCard borderColor="border-amber-500" bgColor="bg-white">
              <p>
                Physical supply chains are dynamic, sensitive systems subject to immense feedback loops. A localized demand shock rarely yields a proportional output. This brings us to a phenomenon known as the <strong>Direction Reversal</strong>.
              </p>

              <ConceptBox title="The Bullwhip Effect" icon={AlertTriangle} colorTheme="amber">
                <p>First identified in the 1990s with consumer goods, the Bullwhip Effect explains how small, temporary changes in end-consumer demand are systematically distorted by batch ordering and panic purchasing, leading to massive, entirely artificial fluctuations in demand for upstream manufacturers.</p>
              </ConceptBox>

              <ConceptBox title="Why Direction Can Reverse (Theta.md Insight)" icon={Lightbulb} colorTheme="amber">
                <p>Theta.md&apos;s event propagation model highlights a counterintuitive reality: a nuclear plant construction delay that appears to hurt an equipment supplier may actually <em>free capacity</em> for other clients &mdash; turning an ostensible negative into a positive for the supplier. The framework systematically checks whether second-order effects reverse first-order direction.</p>
              </ConceptBox>

              <h4 className="font-bold text-slate-800 mt-8 mb-4">Case Study: The 2021&ndash;2023 Semiconductor Double-Ordering Phenomenon</h4>
              <p className="mb-4">
                During the COVID-19 pandemic, a massive shift in electronics demand coupled with shipping constraints caused global component shortages. Here is how the direction reversal unfolded:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 hover:bg-white transition-colors shadow-sm">
                  <div className="text-amber-600 font-bold mb-2">1. The First-Order Shock</div>
                  <p className="text-sm">Localized shortages halt assembly lines. <strong>Signal:</strong> Strong Bullish (component spot prices surge).</p>
                </div>
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 hover:bg-white transition-colors shadow-sm">
                  <div className="text-amber-600 font-bold mb-2">2. The Bullwhip Amplification</div>
                  <p className="text-sm">Downstream firms panic and &ldquo;double order&rdquo;. <strong>Signal:</strong> Hyper-Bullish (Upstream order books fill years in advance).</p>
                </div>
                <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 hover:bg-white transition-colors shadow-sm">
                  <div className="text-amber-600 font-bold mb-2">3. The Second-Order Effect</div>
                  <p className="text-sm">Foundries commit to historic CapEx (&gt;50% of revenue) for new fabs based on phantom demand. <strong>Signal:</strong> Plateau (Massive outlays drain cash).</p>
                </div>
                <div className="border border-red-200 p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors shadow-sm">
                  <div className="text-red-600 font-bold mb-2">4. The Direction Reversal</div>
                  <p className="text-sm">Demand normalizes. Downstream cancels phantom orders. <strong>Signal:</strong> Violent Bearish Reversal (Upstream faces stranded assets/idle capacity).</p>
                </div>
              </div>
            </TutorialCard>
          </section>

          {/* Infographic */}
          <section className="max-w-5xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img
                src="https://i.imgur.com/pnQZvzF.jpeg"
                alt="Cross-Industry Supply Chain Signal Transmission Infographic"
                className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <button
                onClick={(e) => { e.stopPropagation(); setIsImageViewerOpen(true); }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                title="View full screen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
                <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                  Click to view full screen
                </div>
              </div>
            </div>
          </section>

          <FullScreenImageViewer
            src="https://i.imgur.com/pnQZvzF.jpeg"
            alt="Cross-Industry Supply Chain Signal Transmission Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />

          {/* Module 3: Asymmetric Time Windows */}
          <section>
            <SectionHeader title="3. Asymmetric Time Windows in Information Pricing" icon={Clock} colorClass="bg-gradient-to-br from-emerald-500 to-teal-600" />

            <TutorialCard borderColor="border-emerald-500" bgColor="bg-white">
              <p>
                Contrary to the Efficient Market Hypothesis, markets do not digest all information equally. Financial markets display a pronounced tendency to price in positive supply chain news at a fundamentally different speed and efficiency than negative news.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mt-6">
                <div className="flex-1 bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold mb-3">
                    <TrendingUp size={20} /> Positive Shocks (Fast Pricing)
                  </div>
                  <p className="text-sm">
                    Positive developments (e.g., unexpected downstream orders) are incorporated rapidly, often days before official earnings. Analysts quickly trace increased downstream budgets to tier-1 suppliers, resulting in short lead-lag windows and high pricing efficiency.
                  </p>
                </div>

                <div className="flex-1 bg-rose-50 rounded-xl p-6 border border-rose-100">
                  <div className="flex items-center gap-2 text-rose-700 font-bold mb-3">
                    <TrendingUp size={20} className="transform rotate-180" /> Negative Shocks (Slow Pricing)
                  </div>
                  <p className="text-sm">
                    Negative developments are severely delayed. This lag is caused by Asymmetric Trading Costs (ATC) for liquidity providers, capital-intensive short-sale constraints, and managerial incentives to hoard bad news, creating protracted, inefficient time windows.
                  </p>
                </div>
              </div>

              <ConceptBox title="Modeling Asymmetry: NARDL &amp; DeltaLag" icon={Activity} colorTheme="emerald">
                <p>Modern quants use Nonlinear Autoregressive Distributed Lag (NARDL) frameworks to estimate separate elasticities for positive vs. negative shocks. Deep learning architectures like <em>DeltaLag</em> further revolutionize this by dynamically discovering asynchronous dependencies across asset pairs in real-time.</p>
              </ConceptBox>

              <ConceptBox title="Theta.md&apos;s Empirical Finding" icon={BarChart3} colorTheme="emerald">
                <p>Theta.md&apos;s backtests across semiconductor earnings cascades confirm this asymmetry: good news (e.g., &ldquo;AI memory demand exceeds expectations&rdquo;) transmits almost instantaneously along the chain, while bad news (inventory glut, order cancellations) takes multiple confirmation cycles before the market fully prices it in. The real alpha opportunity lies in the <strong>slow-pricing negative window</strong>.</p>
              </ConceptBox>
            </TutorialCard>
          </section>

          {/* Module 4: Buy-Side Integration */}
          <section>
            <SectionHeader title="4. Buy-Side Institutional Integration" icon={Shield} colorClass="bg-gradient-to-br from-purple-500 to-indigo-600" />

            <TutorialCard borderColor="border-purple-500" bgColor="bg-white">
              <p>
                The era of using supply chain data strictly for high-frequency, sub-second arbitrage is fading due to signal decay and commoditized algorithms. Elite buy-side institutions now leverage these signals to update long-term fundamental valuation architectures.
              </p>

              <h4 className="font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-purple-500" size={20} /> Fundamental DCF Recalibration
              </h4>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 shrink-0"></div>
                  <p><strong className="text-slate-800">Revenue Projections:</strong> Identifying upstream choke points forecasts downstream volume constraints before they hit earnings reports.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 shrink-0"></div>
                  <p><strong className="text-slate-800">COGS &amp; Margins:</strong> Tracking raw material inflation and freight expedites accurately models impending gross margin compression.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 shrink-0"></div>
                  <p><strong className="text-slate-800">Working Capital (NWC):</strong> Inventory buildups signal Bullwhip Effects, dictating immediate downward revisions to projected Free Cash Flow (FCFF).</p>
                </li>
              </ul>

              <ConceptBox title="The &lsquo;Upstreamness&rsquo; Metric" icon={BarChart3} colorTheme="purple">
                <p>Institutions use input-output economics to calculate a firm&apos;s absolute vertical position within the global production network.</p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-white p-3 rounded shadow-sm text-xs border border-purple-100">
                    <strong className="block text-purple-800 mb-1">High Upstreamness</strong>
                    Raw material extractors. Highly vulnerable to the Bullwhip Effect. High beta.
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm text-xs border border-purple-100">
                    <strong className="block text-purple-800 mb-1">Moderate Upstreamness</strong>
                    Tier-1 components. Vulnerable to dual pressures and single-source bottlenecks.
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm text-xs border border-purple-100">
                    <strong className="block text-purple-800 mb-1">Low Upstreamness</strong>
                    Consumer retail. Stable demand but highly vulnerable to localized price elasticity.
                  </div>
                </div>
              </ConceptBox>

              <ConceptBox title="Why Theta.md Matters for Buy-Side Analysts" icon={Lightbulb} colorTheme="purple">
                <p>Traditional sell-side research is siloed by industry &mdash; semiconductor analysts cover semiconductors, power analysts cover utilities. But supply chain signals don&apos;t respect these boundaries:</p>
                <p className="mt-2 font-mono text-xs bg-white p-3 rounded border border-purple-100">
                  NVIDIA GPU demand &rarr; TSMC (semiconductor manufacturing) &rarr; ASML (lithography equipment) &rarr; Zeiss (German optics)
                </p>
                <p className="mt-2">A single demand signal crosses four traditional industry classifications. Theta.md&apos;s cross-industry, cross-geography framework gives buy-side teams the systematic, multi-hop view that sell-side coverage structurally cannot provide.</p>
              </ConceptBox>

              <h4 className="font-bold text-slate-800 mt-8 mb-4">Valuing the Resilience Premium</h4>
              <p>
                Historically, supply chains optimized purely for cost (Just-in-Time) were rewarded. Post-2020, institutions actively price &ldquo;supply chain resilience&rdquo; into models. Geographic diversification, rigid dual-sourcing, and strategic inventory buffers are no longer viewed as margin-dilutive inefficiencies, but as mandatory insurance premiums protecting long-term free cash flow.
              </p>
            </TutorialCard>
          </section>

        </main>

        {/* Synthesis Footer */}
        <div className="bg-slate-900 text-slate-300 py-12 px-6 md:px-12 mt-12 border-t-4 border-indigo-500">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Zap className="mx-auto text-indigo-400 mb-4" size={32} />
            <h2 className="text-2xl font-bold text-white">Synthesis &amp; Conclusion</h2>
            <p className="leading-relaxed max-w-2xl mx-auto text-slate-400">
              Extracting meaningful intelligence from complex global networks requires rigorous isolation against market noise (e.g., SOX index, FX rates). Understanding the non-linear realities&mdash;like the devastating direction reversals seen in the semiconductor industry&mdash;and the asymmetric pricing windows dictates a new paradigm. Supply chain intelligence is no longer just for arbitrage; it is the definitive benchmark for structural risk management and sustained equity alpha in the 21st century.
            </p>
            <div className="pt-8 text-sm text-slate-600">
              Tutorial modeled after institutional quantitative supply chain research strategies.
            </div>
          </div>
        </div>

      </main>
    </ArticleFrame>
  );
}
