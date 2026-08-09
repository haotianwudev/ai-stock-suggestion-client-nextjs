'use client';

import React from 'react';
import { TrendingUp, Layers, Activity, Zap, BarChart3, BookOpen, Cpu, Scale, LineChart, Network, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { FormulaPanel } from '@/components/articles/article-visuals';

export default function UnifiedTheoryMarketDynamics() {
  return (
    <ArticleFrame slug="unified-theory-market-dynamics-order-flow-impact-volatility">
      <div className="pb-24">
        <InfographicSlot alt="Unified Theory of Market Dynamics Infographic" />
        
        <main className="max-w-4xl mx-auto py-16 px-6 lg:px-8 space-y-24">
          
          {/* Section 1 */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-500">
                <Network size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">The Fragmentation of Theory</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The evolution of quantitative finance has long been marked by a fundamental dichotomy. On one side, macroscopic asset pricing models (rooted in Bachelier and Black-Scholes) rely on the assumption that price processes are semi-martingales. This reflects the absence of arbitrage and limits return predictability.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              On the other side, market microstructure—the study of how latent demands translate into executed trades—uncovered robust empirical regularities that seemed to clash with simple diffusive models:
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              <li className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 mb-2 font-serif">Long Memory</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Persistent signed order flow where the direction of trades correlates over time.</div>
              </li>
              <li className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 mb-2 font-serif">Square-Root Scaling</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">The non-linear, concave market impact of large orders.</div>
              </li>
              <li className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 mb-2 font-serif">Rough Volatility</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Extreme roughness of volatility paths, far jaggeder than Brownian motion.</div>
              </li>
            </ul>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Historically, these were studied in isolation. The <strong className="text-slate-900 dark:text-white">Muhle-Karbe framework</strong> unifies them. By identifying a single structural statistic, <span className="font-semibold text-indigo-600 dark:text-indigo-400">H₀</span>, which quantifies the persistence of institutional trading, the authors prove these phenomena are mathematically bound together through no-arbitrage requirements.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-500">
                <Layers size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">The Two-Layer Hawkes Architecture</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The primary innovation is describing order flow through a dual-layer architecture, distinguishing between <strong className="text-slate-900 dark:text-white">Core Orders</strong> and <strong className="text-slate-900 dark:text-white">Reaction Flow</strong>. Both are modeled using <em>Hawkes processes</em>—self-exciting point processes perfect for capturing the clustering and feedback mechanisms in financial data.
            </p>
            
            <div className="overflow-x-auto my-10">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-indigo-900 dark:bg-indigo-950 text-white border-b border-indigo-800">
                    <th className="p-4 font-semibold font-serif">Feature</th>
                    <th className="p-4 font-semibold border-l border-indigo-800 font-serif">Core Order Flow</th>
                    <th className="p-4 font-semibold border-l border-indigo-800 font-serif">Reaction Order Flow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm md:text-base">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-slate-200">Origin</td>
                    <td className="p-4 border-l border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">Institutional metaorders, fundamental views</td>
                    <td className="p-4 border-l border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">HFT, market making, liquidity provision</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-slate-200">Primary Driver</td>
                    <td className="p-4 border-l border-slate-100 dark:border-slate-800 text-indigo-700 dark:text-indigo-400 font-medium">Autonomous investment decisions</td>
                    <td className="p-4 border-l border-slate-100 dark:border-slate-800 text-rose-600 dark:text-rose-400 font-medium">Response to observed market activity</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-slate-200">Temporal Horizon</td>
                    <td className="p-4 border-l border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">Low to medium frequency (hours/days)</td>
                    <td className="p-4 border-l border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">High frequency (milliseconds to seconds)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-slate-200">Mathematical Role</td>
                    <td className="p-4 border-l border-slate-100 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-900/10 text-slate-600 dark:text-slate-400">Generates long-term persistence (H₀)</td>
                    <td className="p-4 border-l border-slate-100 dark:border-slate-800 bg-rose-50/50 dark:bg-rose-900/10 text-slate-600 dark:text-slate-400">Generates martingale / high-freq noise</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-6 rounded-2xl border-2 my-8 shadow-sm bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800/30 text-indigo-900 dark:text-indigo-200">
              <h4 className="font-bold text-xl mb-3 flex items-center gap-2 font-serif">
                <Zap size={20} className="fill-current text-indigo-500" />
                The Anchor Statistic: H₀
              </h4>
              <div className="text-base opacity-90 leading-relaxed">
                The core flow is the repository of market memory. The strategic splitting of large institutional positions into "child orders" creates persistence. This persistence is quantified by the Hurst index <strong className="font-bold">H₀ ≈ 0.75</strong>, acting as the structural anchor for the entire market ecosystem.
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 3 */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-500">
                <Scale size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">The Scaling Limit & Fractional Dynamics</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              By analyzing the large-time asymptotics of this two-layer model, the theory establishes that rescaled signed order flow converges to a <strong className="text-slate-900 dark:text-white">"mixed fractional Brownian motion"</strong>.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              This provides a brilliant theoretical resolution to a long-standing paradox: <em>Why do Hurst exponent estimates depend on the sampling scale?</em>
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 my-10">
              <div className="flex-1 bg-cyan-50 dark:bg-cyan-900/10 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800/30">
                <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-3 flex items-center gap-2 font-serif">
                  <Activity size={20} /> High Frequencies (Ticks)
                </h4>
                <p className="text-cyan-800 dark:text-cyan-400/80 text-sm leading-relaxed">
                  The memoryless martingale component of the Reaction Flow dominates the signal. The flow appears completely diffusive (Hurst ≈ 0.5), drowning out the core flow.
                </p>
              </div>
              <div className="flex-1 bg-purple-50 dark:bg-purple-900/10 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-3 flex items-center gap-2 font-serif">
                  <TrendingUp size={20} /> Low Frequencies (Hours)
                </h4>
                <p className="text-purple-800 dark:text-purple-400/80 text-sm leading-relaxed">
                  The high-frequency "noise" of reaction trades cancels out. The persistent signal of the Core Flow becomes visible, driving the estimated Hurst exponent up towards 0.75.
                </p>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 4 */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-violet-600 dark:text-violet-500">
                <LineChart size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Endogenous Rough Volatility</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              One of the most profound contributions is proving that "rough" volatility is not an exogenous assumption, but an endogenous necessity. If the core order flow is highly persistent (H₀ &gt; 1/2), a naive price response would create predictable, exploitable trends.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              To maintain market efficiency and prevent statistical arbitrage, the price impact must scale to exactly compensate for the flow's persistence. This compensatory scaling generates the hyper-jagged, rough paths of volatility.
            </p>
            
            <div className="my-10">
              <FormulaPanel 
                title="Volatility Hurst Parameter"
                formula="H_{vol} = 2H₀ - \frac{3}{2}"
              />
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-2 mb-8">The mathematical relationship linking the Hurst parameter of volatility to the persistence of the core order flow.</p>
            </div>
            
            <div className="p-6 rounded-2xl border-2 my-8 shadow-sm bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30 text-emerald-900 dark:text-emerald-200">
              <h4 className="font-bold text-xl mb-3 flex items-center gap-2 font-serif">
                <Zap size={20} className="fill-current text-emerald-500" />
                Calculating the Roughness
              </h4>
              <div className="text-base opacity-90 leading-relaxed">
                Given the empirical estimate of core flow persistence <strong className="font-bold">H₀ ≈ 0.75</strong>, the model predicts a volatility Hurst parameter of:<br/><br/>
                <code className="bg-white/50 dark:bg-black/20 px-3 py-1.5 rounded-lg text-emerald-900 dark:text-emerald-300 font-mono text-lg shadow-sm">2(0.75) - 1.5 = 0.0</code><br/><br/>
                This perfectly matches empirical observations where H_vol ranges from 0.0 to 0.15, explaining why volatility appears so much rougher than the price process itself!
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 5 */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-rose-600 dark:text-rose-500">
                <Cpu size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Reconciling the Square-Root Law</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The "square-root law" of market impact—which states that the price impact of a large order grows as the square root of its size—is one of the most universal empirical laws in finance.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The Muhle-Karbe framework proves that this concave impact is not a random artifact, but the necessary consequence of processing persistent order splitting efficiently.
            </p>
            
            <div className="my-10">
              <FormulaPanel 
                title="Market Impact Power-Law Exponent"
                formula="\delta = 2 - 2H₀"
              />
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-2 mb-8">The power-law exponent (δ) of market impact derived from core flow persistence.</p>
            </div>
            
            <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/30 p-6 md:p-8 rounded-2xl my-6">
              <p className="text-rose-900 dark:text-rose-300 mb-0 font-medium">
                Plugging in our universal constant <strong className="font-bold">H₀ ≈ 0.75</strong>:
              </p>
              <div className="mt-4 mb-4 bg-white/60 dark:bg-black/20 p-4 rounded-xl text-rose-700 dark:text-rose-400 font-mono text-xl text-center shadow-sm">
                δ = 2 - 2(0.75) = 0.5
              </div>
              <p className="text-rose-800 dark:text-rose-400/80 text-sm leading-relaxed">
                An exponent of 0.5 is exactly the Square-Root Law! The model seamlessly transitions from high-frequency linear impact of individual child orders to macro-scale concavity for aggregate metaorders.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 6 */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-500">
                <BarChart3 size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">The Fractal Nature of Traded Volume</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              While much of the literature focuses strictly on price, the unified theory demonstrates that the traded volume itself (the unsigned magnitude of activity) is also a rough process. This establishes a deep symmetry between the roughness of trading intensity and the roughness of price fluctuations.
            </p>
            
            <div className="my-10">
              <FormulaPanel 
                title="Unsigned Traded Volume Hurst Index"
                formula="H_{\text{vol,traded}} = H₀ - \frac{1}{2}"
              />
            </div>
            
            <p className="mt-8 mb-6 font-semibold text-slate-800 dark:text-slate-200 font-serif text-lg">Overview of Scaling Parameters (Assuming H₀ ≈ 0.75):</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { metric: "Signed Order Flow", formula: "H₀", result: "0.75", tag: "Persistence" },
                { metric: "Traded Volume", formula: "H₀ - 0.5", result: "0.25", tag: "Rough Volume" },
                { metric: "Price Volatility", formula: "2H₀ - 1.5", result: "0.00", tag: "Rough Volatility" },
                { metric: "Market Impact", formula: "2 - 2H₀", result: "0.50", tag: "Square-Root Law" },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 dark:bg-indigo-400"></div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">{item.tag}</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mb-3">{item.metric}</div>
                  <div className="flex items-end justify-between">
                    <div className="font-serif italic text-slate-500 dark:text-slate-400">{item.formula}</div>
                    <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{item.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer / Conclusion */}
          <footer className="mt-16 bg-slate-900 dark:bg-black text-slate-300 rounded-3xl p-8 md:p-12 border-t-4 border-indigo-500 dark:border-indigo-400">
            <h2 className="text-2xl font-bold text-white mb-6 font-serif text-center">The Future of Statistical Finance</h2>
            <p className="mb-8 leading-relaxed text-center max-w-2xl mx-auto text-slate-400">
              The unified theory reveals a market that is fundamentally interconnected. The persistence of institutional metaorders is the hidden architect behind modern finance's most prominent features. By bridging the gap between microstructure and asset pricing, this framework provides a rigorous tool for institutional execution, risk management, and regulatory monitoring.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm font-medium mb-12">
              <span className="px-4 py-2 bg-slate-800 dark:bg-slate-900 rounded-full border border-slate-700 dark:border-slate-800 text-slate-300">Order-Driven Paradigm</span>
              <span className="px-4 py-2 bg-slate-800 dark:bg-slate-900 rounded-full border border-slate-700 dark:border-slate-800 text-slate-300">Hawkes Processes</span>
              <span className="px-4 py-2 bg-slate-800 dark:bg-slate-900 rounded-full border border-slate-700 dark:border-slate-800 text-slate-300">No-Arbitrage Constraints</span>
            </div>
            
            {/* Paper Attribution */}
            <div className="bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700 dark:border-slate-800 rounded-2xl p-6 md:p-8 text-sm text-center">
              <p className="text-slate-400 mb-3 italic">
                This article is based on the groundbreaking research:
              </p>
              <p className="text-white font-semibold mb-2 text-base md:text-lg">
                "A unified theory of order flow, market impact, and volatility"
              </p>
              <p className="text-slate-400 mb-4">
                by Johannes Muhle-Karbe, Youssef Ouazzani Chahdi, Mathieu Rosenbaum, and Grégoire Szymanski
              </p>
              <p className="text-slate-500 text-xs font-mono">
                arXiv:2601.23172 [q-fin.ST] • Submitted: 30 Jan 2026 • Last revised: 2 Feb 2026
              </p>
            </div>
          </footer>
        </main>
      </div>
    </ArticleFrame>
  );
}
