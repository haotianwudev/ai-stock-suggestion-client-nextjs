'use client';

import React from 'react';
import { TrendingDown, AlertTriangle, Activity, BarChart2, BookOpen, Calculator, ShieldAlert, Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';

const Callout = ({ title, children, type = 'info' }: { title: string; children: React.ReactNode; type?: 'info' | 'warning' | 'success' | 'danger' }) => {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-orange-50 border-orange-200 text-orange-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    danger: 'bg-rose-50 border-rose-200 text-rose-900',
  };

  const iconColors = {
    info: 'text-blue-500',
    warning: 'text-orange-500',
    success: 'text-emerald-500',
    danger: 'text-rose-500',
  };

  return (
    <div className={`p-6 rounded-2xl border-2 my-6 ${colors[type]} flex flex-col md:flex-row gap-4`}>
      <div className={`mt-1 ${iconColors[type]}`}>
        {type === 'info' && <Lightbulb size={24} />}
        {type === 'warning' && <AlertTriangle size={24} />}
        {type === 'success' && <Activity size={24} />}
        {type === 'danger' && <AlertCircle size={24} />}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
};

const Section = ({ title, icon: Icon, children, theme = 'blue' }: { title: string; icon: React.ElementType; children: React.ReactNode; theme?: 'blue' | 'purple' | 'emerald' | 'rose' | 'indigo' }) => {
  const themes = {
    blue: 'border-blue-100 bg-white/60 from-blue-50/50 to-white text-blue-600',
    purple: 'border-purple-100 bg-white/60 from-purple-50/50 to-white text-purple-600',
    emerald: 'border-emerald-100 bg-white/60 from-emerald-50/50 to-white text-emerald-600',
    rose: 'border-rose-100 bg-white/60 from-rose-50/50 to-white text-rose-600',
    indigo: 'border-indigo-100 bg-white/60 from-indigo-50/50 to-white text-indigo-600',
  };

  return (
    <section className={`my-16 p-8 md:p-12 rounded-[2.5rem] shadow-sm border-2 bg-gradient-to-b backdrop-blur-sm ${themes[theme].split(' ').slice(0, -1).join(' ')}`}>
      <div className="flex items-center gap-5 mb-8">
        <div className={`p-4 rounded-2xl bg-white shadow-sm border border-gray-100 ${themes[theme].split(' ').pop()}`}>
          <Icon size={32} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
      </div>
      <div className="text-gray-700 leading-relaxed text-lg space-y-6">{children}</div>
    </section>
  );
};

export default function ArticlePage() {
  return (
    <ArticleFrame slug="strategy-decay-factor-fragility-regime-aware-portfolio-construction">
      <InfographicSlot alt="Strategy Decay & Factor Fragility Infographic" />

      {/* Section 1: Foundation */}
      <Section title="The Foundation & Traditional Metrics" icon={TrendingDown} theme="blue">
        <p>
          Systematic investing relies heavily on historical backtests, but structural breakdowns in investment logic&mdash;known as <strong>strategy decay</strong>&mdash;can decimate portfolios upon live deployment.
        </p>

        <Callout title="Alpha Decay vs. Strategy Decay" type="info">
          <p className="mb-2">
            <strong>Alpha Decay</strong> is the natural half-life of a predictive signal due to crowding. As a market anomaly becomes known, arbitrageurs trade it away, compressing its edge.
          </p>
          <p>
            <strong>Strategy Decay</strong> is a structural breakdown. It happens when the fundamental macroeconomic or behavioral relationships that supported a strategy reverse entirely, regardless of crowding (e.g., an inflation shock inverting equity-bond correlations).
          </p>
        </Callout>

        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Illusion of Perfection</h3>
        <p>
          Traditional metrics like the <strong>Sharpe Ratio</strong> mask this vulnerability. Because they are aggregated, full-sample metrics, they assume markets are ergodic. A strategy might look robust purely because it amassed massive returns during a 10-year favorable regime (like Zero Interest Rate Policy), hiding systematic failures in hostile environments.
        </p>
        <p>
          Similarly, <strong>Maximum Drawdown (MaxDD)</strong> merely records the deepest historical decline. It cannot differentiate between a rapid exogenous shock (like a flash crash) and the slow, secular death of a strategy&apos;s core logic.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h4 className="font-bold text-gray-800">Empirical Fragility: Factor Performance (2020-2026)</h4>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-3 font-semibold w-1/4">Factor</th>
                  <th className="pb-3 font-semibold w-1/4">2026 Performance</th>
                  <th className="pb-3 font-semibold">Primary Drivers & Vulnerabilities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 font-bold text-indigo-600">Momentum</td>
                  <td className="py-4">
                    <span className="text-emerald-600 font-semibold">Extreme Outperformance</span><br/>
                    (+9.5% top-bottom spread)
                  </td>
                  <td className="py-4 text-gray-600">
                    Trend-following in mega-cap tech. Highly vulnerable to violent reversals (the &quot;Winner&apos;s Curse&quot;).
                  </td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-blue-600">Quality</td>
                  <td className="py-4">
                    <span className="text-emerald-600 font-semibold">Strong Outperformance</span><br/>
                    (+5.7% spread)
                  </td>
                  <td className="py-4 text-gray-600">
                    Investors favored strong balance sheets amidst macro uncertainty.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-rose-600">Value</td>
                  <td className="py-4">
                    <span className="text-rose-600 font-semibold">Severe Underperformance</span>
                  </td>
                  <td className="py-4 text-gray-600">
                    Struggled against high-growth, high-multiple secular tech trends.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Section 2: Mechanics */}
      <Section title="Deriving Minimum Regime Performance" icon={Calculator} theme="purple">
        <p>
          To address the blindness of traditional metrics, quantitative literature introduced <strong>Minimum Regime Performance (MRP)</strong>. It is the lowest realized risk-adjusted return across distinct historical regimes&mdash;a conservative lower bound on a strategy&apos;s durability.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Defining Regimes</h3>
        <p>
          Regimes are contiguous periods with stable macroeconomic dynamics. They are mathematically defined using:
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <li className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <strong className="block text-purple-700 mb-2">Hidden Markov Models (HMM)</strong>
            <span className="text-sm">Probabilistic models inferring hidden market states from observable volatility and returns.</span>
          </li>
          <li className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <strong className="block text-purple-700 mb-2">Macro Clustering</strong>
            <span className="text-sm">Unsupervised learning (K-means) clustering multidimensional macro datasets like yield curves.</span>
          </li>
          <li className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <strong className="block text-purple-700 mb-2">VIX / Volatility</strong>
            <span className="text-sm">Using sustained divergences between 20-day and 252-day realized volatility.</span>
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. The Mathematics of MRP</h3>
        <p>
          The algorithm searches across all valid temporal splits of a return series to find the segment yielding the lowest performance. A minimum regime length, <code>d</code>, is enforced to ignore microscopic noise.
        </p>

        <Callout title="Single Split (MRP₁)" type="info">
          For a series divided into two contiguous regimes at time <i>t₁</i>, evaluated by Sharpe ratio (S):
          <MathBlock math="\text{MRP}_1(x) = \min_{t_1 \in [d,\, n-d]} \{ \min(S(r_1), S(r_2)) \}" />
        </Callout>

        <Callout title="Multiple Splits (MRPₛ)" type="info">
          For <i>s</i> splits partitioning into <i>s+1</i> distinct regimes, representing the absolute minimum across all valid combinations:
          <MathBlock math="\text{MRP}_s(x) = \min_{T} \{ \min(S(r_1), S(r_2), \ldots, S(r_{s+1})) \}" />
          Number of valid splits (Combinatorics):
          <MathBlock math="n_s = \binom{n - sd - d + s}{s}" />
        </Callout>

        <p className="mt-8">
          MRP acts conceptually like a <strong>dynamic Calmar ratio</strong> applied in risk-adjusted space. Rather than isolating downside price volatility (Sortino) or a single historical crash (Calmar), MRP actively searches for the specific historical era where the <em>risk-adjusted compounding was fundamentally weakest</em>.
        </p>
      </Section>

      {/* Section 3: Application */}
      <Section title="Portfolio Construction & Application" icon={BarChart2} theme="emerald">
        <p>
          Because MRP is a highly non-linear combinatorial search function, it cannot easily be injected into standard Mean-Variance Optimization (MVO). Instead, quants deploy it as a <strong>pre-optimization threshold filter</strong>. If a strategy&apos;s <code>MRP/Sharpe</code> ratio is below tolerance, it&apos;s rejected.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Case Study: Momentum & Quality Across Regimes</h3>
        <p className="mb-6">
          Evaluating factors through the Merrill Lynch Investment Clock provides an empirical look at strategy fragility:
        </p>

        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="bg-emerald-50 text-emerald-900 border-b border-emerald-100">
                  <th className="py-4 px-4 font-bold text-left">Macro Phase</th>
                  <th className="py-4 px-4 font-bold">Environment</th>
                  <th className="py-4 px-4 font-bold border-l border-emerald-100 bg-white">Momentum Return</th>
                  <th className="py-4 px-4 font-bold bg-white">Quality Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="py-4 px-4 text-left font-semibold">Recovery</td>
                  <td className="py-4 px-4">Growth ↑, Inflation ↓</td>
                  <td className="py-4 px-4 font-bold text-emerald-600 border-l border-gray-100">8.79%</td>
                  <td className="py-4 px-4">1.22%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-left font-semibold">Expansion</td>
                  <td className="py-4 px-4">Growth ↑, Inflation ↑</td>
                  <td className="py-4 px-4 font-bold text-emerald-600 border-l border-gray-100">14.90%</td>
                  <td className="py-4 px-4">2.74%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-left font-semibold bg-gray-50">Slowdown</td>
                  <td className="py-4 px-4 bg-gray-50">Growth ↓, Inflation ↑</td>
                  <td className="py-4 px-4 border-l border-gray-100 bg-gray-50">6.18%</td>
                  <td className="py-4 px-4 font-bold text-indigo-600 bg-gray-50">6.86%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-left font-semibold bg-gray-50">Contraction</td>
                  <td className="py-4 px-4 bg-gray-50">Growth ↓, Inflation ↓</td>
                  <td className="py-4 px-4 text-rose-600 font-bold border-l border-gray-100 bg-gray-50">-12.08%</td>
                  <td className="py-4 px-4 font-bold text-indigo-600 bg-gray-50">5.48%</td>
                </tr>
                <tr className="border-t-2 border-gray-200 font-bold bg-gray-100">
                  <td className="py-4 px-4 text-left" colSpan={2}>Full Sample Average</td>
                  <td className="py-4 px-4 border-l border-gray-300">8.41%</td>
                  <td className="py-4 px-4">4.18%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
            <h4 className="font-bold text-rose-800 text-lg mb-3 flex items-center gap-2">
              <TrendingDown size={20}/> Momentum Vulnerability
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Despite a higher full-sample average (8.41%), its <strong>MRP is deeply negative</strong>. The strategy suffers from the &quot;Winner&apos;s Curse&quot;, experiencing catastrophic drawdowns during market inflection points (Contraction).
            </p>
          </div>

          <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-800 text-lg mb-3 flex items-center gap-2">
              <TrendingUp size={20}/> Quality Resilience
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Though its average return is lower (4.18%), its <strong>MRP remains strictly positive</strong> across all regimes. It acts as a structural anchor during hostile environments when leveraged cyclical assets fail.
            </p>
          </div>
        </div>

        <p className="mt-6 text-gray-700 font-medium">
          <strong>Optimal Strategy:</strong> By blending these with minimax correlation algorithms, we maximize <em>composite MRP</em>, coupling Momentum&apos;s high-velocity upside with Quality&apos;s low-velocity structural resilience.
        </p>
      </Section>

      {/* Section 4: Risks */}
      <Section title="The Meta-Risks of MRP Optimization" icon={ShieldAlert} theme="rose">
        <p className="mb-8">
          Optimizing specifically for regime robustness introduces complex secondary hazards. Practitioners must navigate these statistical meta-risks to protect alpha.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden group hover:border-rose-400 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle size={64} className="text-rose-500" />
            </div>
            <h4 className="font-bold text-gray-900 text-xl mb-3 z-10 relative">1. Look-Ahead Bias</h4>
            <p className="text-gray-600 text-sm relative z-10 leading-relaxed">
              Historical MRP inherently pinpoints exact regime boundaries <em>ex-post</em>. Live algorithms (like rolling HMMs) suffer statistical lag. Backtests that flawlessly rotate at market peaks create a profound illusion of real-time adaptability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm relative overflow-hidden group hover:border-orange-400 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle size={64} className="text-orange-500" />
            </div>
            <h4 className="font-bold text-gray-900 text-xl mb-3 z-10 relative">2. Historical Overfitting</h4>
            <p className="text-gray-600 text-sm relative z-10 leading-relaxed">
              Allowing too many regime splits (high parameter <em>s</em>) causes the algorithm to slice transient noise into fake &quot;regimes.&quot; This hyper-granularity data-mines the backtest, forcing failures when novel out-of-sample dynamics occur.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-sm relative overflow-hidden group hover:border-purple-400 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle size={64} className="text-purple-500" />
            </div>
            <h4 className="font-bold text-gray-900 text-xl mb-3 z-10 relative">3. The Small-Sample Problem</h4>
            <p className="text-gray-600 text-sm relative z-10 leading-relaxed">
              Often called the &quot;Peso Problem.&quot; Highly severe but brief regimes (e.g., March 2020 liquidity shock) yield volatile, imprecise variance estimates. Heavy optimization against rare N=20 events forces rejection of long-term robust strategies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm relative overflow-hidden group hover:border-red-400 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle size={64} className="text-red-500" />
            </div>
            <h4 className="font-bold text-gray-900 text-xl mb-3 z-10 relative">4. Alpha Destruction via Hedging</h4>
            <p className="text-gray-600 text-sm relative z-10 leading-relaxed">
              Factor premiums exist precisely because they compensate for assuming un-hedged structural risk! Relentless attempts to build a perfectly &quot;regime-neutral&quot; portfolio strips away exposures until it merely replicates the risk-free rate.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 5: Synthesis */}
      <div className="mt-20 p-10 bg-gradient-to-br from-indigo-900 to-gray-900 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-6 inline-block">
            <BookOpen size={32} className="text-indigo-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Synthesis &amp; Strategic Outlook</h2>
          <p className="text-lg md:text-xl text-indigo-100 font-light leading-relaxed max-w-3xl">
            Strategy decay is the profound vulnerability of modern systematic finance. While traditional metrics mask fragility beneath high full-sample averages, the <strong>MRP framework quantifies true expected shortfall</strong> across distinct macroeconomic regimes.
          </p>
          <p className="mt-6 text-indigo-200 max-w-2xl font-light">
            By mapping the decay-risk frontier, practitioners can intelligently budget strategy durability. However, allocators must avoid the siren song of absolute regime neutrality&mdash;true portfolio construction relies not on eradicating all risk, but deploying capital where that pain is sufficiently compensated.
          </p>
        </div>
      </div>
    </ArticleFrame>
  );
}
