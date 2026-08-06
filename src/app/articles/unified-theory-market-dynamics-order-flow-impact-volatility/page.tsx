'use client';

import React from 'react';
import { TrendingUp, Layers, Activity, Zap, BarChart3, BookOpen, Cpu, Scale, LineChart, Network, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable UI Components ---
const Section = ({ title, icon: Icon, children, bgClass = "bg-white" }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  bgClass?: string;
}) => (
  <section className={`py-20 px-6 md:px-12 lg:px-24 ${bgClass}`}>
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          <Icon size={28} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  </section>
);

const TakeawayCard = ({ title, children, color = "indigo" }: {
  title: string;
  children: React.ReactNode;
  color?: "indigo" | "emerald" | "rose" | "amber" | "purple";
}) => {
  const colorMap = {
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    rose: "bg-rose-50 border-rose-200 text-rose-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    purple: "bg-purple-50 border-purple-200 text-purple-900",
  };
  return (
    <div className={`p-6 rounded-2xl border-2 my-8 shadow-sm ${colorMap[color]}`}>
      <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
        <Zap size={20} className="fill-current" />
        {title}
      </h4>
      <div className="text-base opacity-90">{children}</div>
    </div>
  );
};

const Formula = ({ equation, description }: { equation: string; description: string }) => (
  <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl my-6 flex flex-col md:flex-row items-center justify-between gap-6 transform hover:scale-[1.02] transition-transform">
    <div className="text-2xl md:text-3xl font-serif italic tracking-wider text-indigo-300">
      {equation}
    </div>
    <div className="text-slate-400 text-sm md:text-base border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6 max-w-sm">
      {description}
    </div>
  </div>
);

// --- Main Application ---
export default function UnifiedTheoryMarketDynamics() {
  return (
    <ArticleFrame slug="unified-theory-market-dynamics-order-flow-impact-volatility">
      <InfographicSlot alt="Unified Theory of Market Dynamics Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12">
        {/* Section 1 */}
        <Section title="The Fragmentation of Theory" icon={Network} bgClass="bg-white/60 backdrop-blur-lg">
          <p>The evolution of quantitative finance has long been marked by a fundamental dichotomy. On one side, macroscopic asset pricing models (rooted in Bachelier and Black-Scholes) rely on the assumption that price processes are semi-martingales. This reflects the absence of arbitrage and limits return predictability.</p>
          <p>On the other side, market microstructure—the study of how latent demands translate into executed trades—uncovered robust empirical regularities that seemed to clash with simple diffusive models:</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {[
              { title: "Long Memory", desc: "Persistent signed order flow where the direction of trades correlates over time." },
              { title: "Square-Root Scaling", desc: "The non-linear, concave market impact of large orders." },
              { title: "Rough Volatility", desc: "Extreme roughness of volatility paths, far jaggeder than Brownian motion." }
            ].map((item, i) => (
              <li key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="font-bold text-indigo-900 mb-2">{item.title}</div>
                <div className="text-sm text-slate-600">{item.desc}</div>
              </li>
            ))}
          </ul>
          <p>Historically, these were studied in isolation. The <strong>Muhle-Karbe framework</strong> unifies them. By identifying a single structural statistic, <span className="font-semibold text-indigo-600">H₀</span>, which quantifies the persistence of institutional trading, the authors prove these phenomena are mathematically bound together through no-arbitrage requirements.</p>
        </Section>

        {/* Section 2 */}
        <Section title="The Two-Layer Hawkes Architecture" icon={Layers} bgClass="bg-gradient-to-b from-indigo-50/50 to-white/50">
          <p>The primary innovation is describing order flow through a dual-layer architecture, distinguishing between <strong>Core Orders</strong> and <strong>Reaction Flow</strong>. Both are modeled using <em>Hawkes processes</em>—self-exciting point processes perfect for capturing the clustering and feedback mechanisms in financial data.</p>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <thead>
                <tr className="bg-indigo-900 text-white">
                  <th className="p-4 font-semibold">Feature</th>
                  <th className="p-4 font-semibold border-l border-indigo-700/50">Core Order Flow</th>
                  <th className="p-4 font-semibold border-l border-indigo-700/50">Reaction Order Flow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm md:text-base">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Origin</td>
                  <td className="p-4 border-l border-slate-100">Institutional metaorders, fundamental views</td>
                  <td className="p-4 border-l border-slate-100">HFT, market making, liquidity provision</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Primary Driver</td>
                  <td className="p-4 border-l border-slate-100 text-indigo-700 font-medium">Autonomous investment decisions</td>
                  <td className="p-4 border-l border-slate-100 text-rose-600 font-medium">Response to observed market activity</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Temporal Horizon</td>
                  <td className="p-4 border-l border-slate-100">Low to medium frequency (hours/days)</td>
                  <td className="p-4 border-l border-slate-100">High frequency (milliseconds to seconds)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Mathematical Role</td>
                  <td className="p-4 border-l border-slate-100 bg-indigo-50/50">Generates long-term persistence (H₀)</td>
                  <td className="p-4 border-l border-slate-100 bg-rose-50/50">Generates martingale / high-freq noise</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TakeawayCard title="The Anchor Statistic: H₀" color="indigo">
            The core flow is the repository of market memory. The strategic splitting of large institutional positions into "child orders" creates persistence. This persistence is quantified by the Hurst index <strong>H₀ ≈ 0.75</strong>, acting as the structural anchor for the entire market ecosystem.
          </TakeawayCard>
        </Section>

        {/* Section 3 */}
        <Section title="The Scaling Limit & Fractional Dynamics" icon={Scale} bgClass="bg-white">
          <p>By analyzing the large-time asymptotics of this two-layer model, the theory establishes that rescaled signed order flow converges to a <strong>"mixed fractional Brownian motion"</strong>.</p>
          <p>This provides a brilliant theoretical resolution to a long-standing paradox: <em>Why do Hurst exponent estimates depend on the sampling scale?</em></p>
          <div className="flex flex-col md:flex-row gap-6 my-8">
            <div className="flex-1 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Activity size={20} /> High Frequencies (Ticks)
              </h4>
              <p className="text-blue-800 text-sm">
                The memoryless martingale component of the Reaction Flow dominates the signal. The flow appears completely diffusive (Hurst ≈ 0.5), drowning out the core flow.
              </p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-2xl border border-purple-100">
              <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                <TrendingUp size={20} /> Low Frequencies (Hours)
              </h4>
              <p className="text-purple-800 text-sm">
                The high-frequency "noise" of reaction trades cancels out. The persistent signal of the Core Flow becomes visible, driving the estimated Hurst exponent up towards 0.75.
              </p>
            </div>
          </div>
        </Section>

        {/* Section 4 */}
        <Section title="Endogenous Rough Volatility" icon={LineChart} bgClass="bg-slate-50">
          <p>One of the most profound contributions is proving that "rough" volatility is not an exogenous assumption, but an endogenous necessity. If the core order flow is highly persistent (H₀ &gt; 1/2), a naive price response would create predictable, exploitable trends.</p>
          <p>To maintain market efficiency and prevent statistical arbitrage, the price impact must scale to exactly compensate for the flow&apos;s persistence. This compensatory scaling generates the hyper-jagged, rough paths of volatility.</p>
          <Formula 
            equation="H_vol = 2H₀ - 3/2" 
            description="The mathematical relationship linking the Hurst parameter of volatility to the persistence of the core order flow."
          />
          <TakeawayCard title="Calculating the Roughness" color="emerald">
            Given the empirical estimate of core flow persistence <strong>H₀ ≈ 0.75</strong>, the model predicts a volatility Hurst parameter of:<br/><br/>
            <code className="bg-white/50 px-2 py-1 rounded text-emerald-900 font-mono text-lg shadow-sm">2(0.75) - 1.5 = 0.0</code><br/><br/>
            This perfectly matches empirical observations where H_vol ranges from 0.0 to 0.15, explaining why volatility appears so much rougher than the price process itself!
          </TakeawayCard>
        </Section>

        {/* Section 5 */}
        <Section title="Reconciling the Square-Root Law" icon={Cpu} bgClass="bg-white">
          <p>The "square-root law" of market impact—which states that the price impact of a large order grows as the square root of its size—is one of the most universal empirical laws in finance.</p>
          <p>The Muhle-Karbe framework proves that this concave impact is not a random artifact, but the necessary consequence of processing persistent order splitting efficiently.</p>
          <Formula 
            equation="δ = 2 - 2H₀" 
            description="The power-law exponent (δ) of market impact derived from core flow persistence."
          />
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-6">
            <p className="text-rose-900 mb-0">
              Plugging in our universal constant <strong>H₀ ≈ 0.75</strong>: <br/>
              <code className="block mt-3 bg-white/60 p-3 rounded-lg text-rose-700 font-mono text-lg text-center shadow-sm">
                δ = 2 - 2(0.75) = 0.5
              </code>
            </p>
            <p className="text-rose-800 text-sm mt-4">
              An exponent of 0.5 is exactly the Square-Root Law! The model seamlessly transitions from high-frequency linear impact of individual child orders to macro-scale concavity for aggregate metaorders.
            </p>
          </div>
        </Section>

        {/* Section 6 */}
        <Section title="The Fractal Nature of Traded Volume" icon={BarChart3} bgClass="bg-gradient-to-b from-white to-slate-100">
          <p>While much of the literature focuses strictly on price, the unified theory demonstrates that the traded volume itself (the unsigned magnitude of activity) is also a rough process. This establishes a deep symmetry between the roughness of trading intensity and the roughness of price fluctuations.</p>
          <Formula 
            equation="H_vol,traded = H₀ - 1/2" 
            description="The Hurst index governing the roughness of unsigned traded volume."
          />
          <p className="mt-8 mb-6 font-semibold text-slate-800">Overview of Scaling Parameters (Assuming H₀ ≈ 0.75):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { metric: "Signed Order Flow", formula: "H₀", result: "0.75", tag: "Persistence" },
              { metric: "Traded Volume", formula: "H₀ - 0.5", result: "0.25", tag: "Rough Volume" },
              { metric: "Price Volatility", formula: "2H₀ - 1.5", result: "0.00", tag: "Rough Volatility" },
              { metric: "Market Impact", formula: "2 - 2H₀", result: "0.50", tag: "Square-Root Law" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:bg-purple-500 transition-colors"></div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{item.tag}</div>
                <div className="font-bold text-slate-800 mb-3">{item.metric}</div>
                <div className="flex items-end justify-between">
                  <div className="font-serif italic text-slate-500">{item.formula}</div>
                  <div className="text-2xl font-black text-indigo-600">{item.result}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer / Conclusion */}
        <footer className="bg-slate-900 text-slate-300 py-16 px-6 md:px-12 text-center border-t-8 border-indigo-500">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">The Future of Statistical Finance</h2>
            <p className="mb-8 leading-relaxed">
              The unified theory reveals a market that is fundamentally interconnected. The persistence of institutional metaorders is the hidden architect behind modern finance&apos;s most prominent features. By bridging the gap between microstructure and asset pricing, this framework provides a rigorous tool for institutional execution, risk management, and regulatory monitoring.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium mb-12">
              <span className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700">Order-Driven Paradigm</span>
              <span className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700">Hawkes Processes</span>
              <span className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700">No-Arbitrage Constraints</span>
            </div>
            
            {/* Paper Attribution */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-sm">
              <p className="text-slate-300 mb-3">
                This article is based on the groundbreaking research:
              </p>
              <p className="text-white font-semibold mb-2">
                &quot;A unified theory of order flow, market impact, and volatility&quot;
              </p>
              <p className="text-slate-400 mb-4">
                by Johannes Muhle-Karbe, Youssef Ouazzani Chahdi, Mathieu Rosenbaum, and Grégoire Szymanski
              </p>
              <p className="text-slate-400 text-xs">
                arXiv:2601.23172 [q-fin.ST] • Submitted: 30 Jan 2026 • Last revised: 2 Feb 2026
              </p>
              <p className="text-slate-500 text-xs mt-4 italic">
                We extend our deepest gratitude to the authors for their exceptional contribution to quantitative finance and market microstructure theory.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </ArticleFrame>
  );
}
