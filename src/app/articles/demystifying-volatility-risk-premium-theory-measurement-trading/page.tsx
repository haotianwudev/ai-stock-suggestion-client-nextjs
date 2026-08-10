'use client';

import { useState } from 'react';
import { BookOpen, TrendingUp, ShieldAlert, Activity, Brain, DollarSign, AlertTriangle, Sigma, Scale, History, ChevronDown, ChevronUp } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- MOCK DATA (only comparison data remains) ---
const strategyComparison = [
  { name: 'Short Put (ATM)', yield: 'High', risk: 'High (Equity Beta ~0.6)', sharpe: '0.6 - 0.8', complexity: 'Low' },
  { name: 'Short Straddle', yield: 'Very High', risk: 'Extreme (Gamma Risk)', sharpe: '0.4 - 0.7', complexity: 'Medium' },
  { name: 'Iron Condor', yield: 'Medium', risk: 'Defined (Capped)', sharpe: '0.5 - 0.9', complexity: 'Medium' },
  { name: 'Variance Swaps', yield: 'Purest', risk: 'Convex (Vega^2)', sharpe: 'Institutional', complexity: 'High' },
];

// --- SHARED COMPONENTS ---
const SectionHeading = ({ title, subtitle, icon: Icon, color = "indigo" }: any) => (
  <div className="mb-8">
    <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold bg-${color}-100 text-${color}-700 mb-4`}>
      <Icon className="w-4 h-4 mr-2" />
      {subtitle}
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-serif">{title}</h2>
  </div>
);

const ExpandableCard = ({ title, icon: Icon, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:bg-[#14171B] transition-colors"
      >
        <div className="flex items-center">
          <div className={`p-3 rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] mr-4`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-serif">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-8 pt-2 border-t border-slate-50">
          <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// --- CONTENT SECTIONS ---
const HomeContent = () => (
  <div className="bg-slate-50 dark:bg-[#14171B]/50">
    {/* Key Concepts Grid */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#0A0D14] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
            <DollarSign className="w-8 h-8 text-[#1D8A70] dark:text-[#3CBF9C]" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 font-serif">Historical Magnitude</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The average VRP spread over the S&amp;P 500 has consistently averaged <strong>4 to 5 annualized percentage points</strong> since 1990.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#0A0D14] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
            <Scale className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 font-serif">High Sharpe Ratio</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Strategies capturing the VRP (like put-writing) often exhibit a Sharpe Ratio of <strong>0.6 to 0.9</strong>, indicating superior risk-adjusted returns relative to the underlying market.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#0A0D14] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40">
          <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-[#BC4128] dark:text-[#E2694A]" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 font-serif">Skew & Correlation Risk</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The losses are asymmetric and occur when <strong>stock prices drop rapidly</strong> and <strong>correlations spike</strong>&mdash;the worst possible time for long-equity investors.
          </p>
        </div>
      </div>
    </section>
  </div>
);

const TheoryContent = () => (
  <section id="theory" className="bg-slate-50 dark:bg-[#14171B] py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Deep Theory & Drivers" subtitle="Why The Premium Persists" icon={Brain} color="indigo" />

      <div className="space-y-6">
        <ExpandableCard title="1. Risk-Based Explanations (Rational)" icon={ShieldAlert} defaultOpen={true}>
          <p>In classical finance, <strong>VRP</strong> is not a &quot;free lunch&quot; but fair compensation for bearing undiversifiable risk. This compensation is necessary because short-volatility strategies expose the seller to specific, unhedgeable risks.</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Jump Risk:</strong> Markets don&apos;t just move smoothly; they gap down due to unexpected news. Option sellers must be compensated for the risk of overnight gaps where delta-hedging is impossible.</li>
            <li><strong>Correlation Risk:</strong> In crises, correlations go to 1. Diversification fails exactly when you need it most. Selling index volatility is implicitly shorting this correlation spike, a costly risk.</li>
            <li><strong>Vega Convexity:</strong> As volatility rises, option prices rise non-linearly. Sellers are &quot;short convexity,&quot; meaning their losses accelerate as market turmoil increases.</li>
          </ul>
        </ExpandableCard>

        <ExpandableCard title="2. Risk-Neutral (ℚ) vs. Physical (ℙ) Measures" icon={Activity}>
          <p>The VRP fundamentally exists due to the difference between these two probability measures.</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Risk-Neutral (ℚ):</strong> This measure is used for pricing derivatives (like the VIX). It assumes a hypothetical world where all investors are <strong>risk-averse</strong> and are indifferent between a risky asset and a risk-free bond. It&apos;s the probability implied by current market prices.</li>
            <li><strong>Physical (ℙ):</strong> This is the <strong>real-world probability</strong> of an event occurring, based on historical observations or econometric forecasts.</li>
            <li><strong>The Difference:</strong> The ℚ measure assigns a <strong>higher probability to bad events</strong> (crashes) than the ℙ measure, specifically to compensate sellers for taking on that crash risk. This gap is the VRP.</li>
          </ul>
        </ExpandableCard>

        <ExpandableCard title="3. Structural & Institutional Limits to Arbitrage" icon={Scale}>
          <p>Even if VRP is &quot;too high,&quot; institutions might be unable to arbitrage it away due to real-world constraints.</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Net-Long Bias:</strong> The vast majority of global wealth (pensions, endowments) is naturally long equities. They are natural <em>buyers</em> of protection, creating permanent demand imbalance.</li>
            <li><strong>Leverage Constraints:</strong> Shorting volatility is capital-intensive and subject to <strong>dynamic margin calls</strong> during crises, forcing arbitrageurs to liquidate positions at the worst possible time.</li>
          </ul>
        </ExpandableCard>
      </div>
    </div>
  </section>
);

const CalculationContent = () => (
  <section id="calculation" className="bg-white dark:bg-[#0A0D14] py-12 border-y border-slate-100 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Math & Models" subtitle="Quantifying the Premium" icon={Sigma} color="violet" />

      <div className="grid gap-8">
        {/* Simple Definition (Enhanced RV detail) */}
        <div className="bg-slate-50 dark:bg-[#14171B] p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 font-serif">The Practitioner&apos;s Spread (Ex-Post)</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The simplest method compares the VIX on a given day (IV<sub>t</sub>) against the subsequent realized volatility over the option&apos;s life.
          </p>
          <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-lg text-center md:text-left flex flex-col md:flex-row items-center justify-around">
            <div className="mb-4 md:mb-0 text-xl">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-bold">VRP<sub>t</sub></span> = <span className="text-slate-700 dark:text-slate-300">IV<sub>t</sub></span> - <span className="text-[#1D8A70] dark:text-[#3CBF9C]">RV<sub>t, t+30</sub></span>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Detailed Realized Volatility (RV) Calculation</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">RV<sub>t, t+N</sub> is the annualized standard deviation of daily log returns (r<sub>i</sub>) of the underlying index over the next N trading days.</p>
            <div className="bg-slate-900 px-6 py-4 rounded-lg text-white text-center overflow-x-auto mt-2">
              <div className="inline-block text-base md:text-lg">
                RV = √[<span className="text-[#1D8A70] dark:text-[#3CBF9C]">(252/N)</span> × Σ<sub className="text-xs">i=1</sub><sup className="text-xs">N</sup> (ln(S<sub className="text-xs">i</sub>/S<sub className="text-xs">i-1</sub>))<sup className="text-xs">2</sup>] × 100
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Where 252 is the approximate number of trading days per year.</p>
          </div>
        </div>

        {/* Academic Definition */}
        <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 font-serif">The Academic Variance Risk Premium (VRPₚ)</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Academics use <strong>Variance</strong> over <strong>Volatility</strong> because Variance Swaps can be perfectly replicated statically (model-free), leading to the &quot;purest&quot; measure of the premium.
          </p>
          <div className="overflow-x-auto">
            <div className="bg-slate-900 p-8 rounded-2xl text-white font-mono text-lg md:text-xl text-center my-6">
              VRP<sub>t</sub> = E<sup>ℚ</sup><sub>t</sub>[∫<sub>t</sub><sup>T</sup> σ<sup>2</sup><sub>s</sub> ds] - E<sup>ℙ</sup><sub>t</sub>[∫<sub>t</sub><sup>T</sup> σ<sup>2</sup><sub>s</sub> ds]
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StrategiesContent = () => (
  <section id="strategies" className="bg-slate-50 dark:bg-[#14171B] py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Strategies & Risks" subtitle="Harvesting The Premium" icon={TrendingUp} color="emerald" />

      {/* Strategy Comparison Table */}
      <div className="bg-white dark:bg-[#0A0D14] rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden mb-12">
        <div className="p-8 pb-4">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-serif">Comparison of Harvesting Methods</h3>
          <p className="text-slate-500 mt-2">Different ways to structure the trade to capture the VRP.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#14171B] border-y border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Strategy</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Yield Potential</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Primary Risks</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {strategyComparison.map((strat, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:bg-[#14171B]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">{strat.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{strat.yield}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{strat.risk}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 hidden md:table-cell">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      strat.complexity === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                      strat.complexity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {strat.complexity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Dive: Put-Writing (Enhanced Detail) */}
      <div className="bg-white dark:bg-[#0A0D14] rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm mb-16">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center font-serif">
          <DollarSign className="w-7 h-7 mr-3 text-[#1D8A70] dark:text-[#3CBF9C]" /> Deep Dive: Systematic Put-Writing
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          This strategy is highly correlated with VRP capture. It involves selling out-of-the-money (OTM) index puts, typically 10-20% below the current market price, and holding collateral equivalent to the potential maximum loss.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Key Exposure (Greeks)</h4>
            <ul className="text-slate-600 dark:text-slate-400 space-y-1 text-sm">
              <li className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-[#A8672E] dark:text-[#D08F52]" /> <strong>Short Vega:</strong> Profits when volatility falls (the definition of VRP).
              </li>
              <li className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-[#A8672E] dark:text-[#D08F52]" /> <strong>Short Gamma:</strong> The position becomes <em>more</em> negative delta as the market falls, forcing you to sell low (the source of negative skew).
              </li>
              <li className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-[#A8672E] dark:text-[#D08F52]" /> <strong>Long Theta:</strong> Time decay (theta) works in your favor as you collect daily premium.
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Performance & Risk Profile</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Historically, the Cboe PutWrite Index (<strong>PUT</strong>) has produced equity-like returns with only 50-70% of the market&apos;s beta, but its drawdowns are concentrated during sharp, downward market moves.
            </p>
          </div>
        </div>
      </div>

      {/* Deep Dive: Volmageddon */}
      <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-3xl p-8 md:p-12 border border-rose-100 mb-16">
        <div className="flex items-start mb-8">
          <div className="bg-[#BC4128] dark:bg-[#E2694A] p-3 rounded-xl mr-4 shrink-0">
            <History className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 font-serif">Case Study: &quot;Volmageddon&quot; (Feb 2018)</h2>
            <p className="text-lg text-rose-900/70">The day the short VRP trade via VIX ETPs blew up. A powerful example of <strong>negative gamma</strong> risk.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose prose-rose">
            <p>On <strong>Feb 5, 2018</strong>, the S&amp;P 500 dropped ~4%. This triggered massive end-of-day rebalancing by leveraged VIX exchange-traded products (<strong>ETPs</strong>) that were structurally short volatility (e.g., XIV).</p>
            <p>These ETPs were forced to <strong>buy VIX futures</strong> in a liquidity panic. This drove the VIX index from ~16 to ~34 in minutes after market close.</p>
            <p className="font-bold">The outcome: The XIV fund lost ~96% of its value in one hour and was liquidated. This event demonstrated the crucial difference between the theoretical VRP edge and the immense structural risk of leveraged short-vol products.</p>
          </div>
          {/* Conceptual VIX Spike Visualization without Recharts */}
          <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-rose-100">
            <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 text-center">VIX Spike - Feb 2018 (Conceptual)</h4>
            <div className="h-48 flex items-end justify-center gap-2">
              <div className="w-1/5 h-1/4 bg-blue-300 rounded-t-lg" style={{height: '33%'}} title="Feb 1: 13.47"></div>
              <div className="w-1/5 h-1/4 bg-[#A8672E] dark:bg-[#D08F52] rounded-t-lg" style={{height: '43%'}} title="Feb 2: 17.31"></div>
              <div className="w-1/5 h-1/4 bg-[#BC4128] dark:bg-[#E2694A] rounded-t-lg" style={{height: '93%'}} title="Feb 5: 37.32 (Spike)"></div>
              <div className="w-1/5 h-1/4 bg-[#A8672E] dark:bg-[#D08F52] rounded-t-lg" style={{height: '75%'}} title="Feb 6: 29.98"></div>
              <div className="w-1/5 h-1/4 bg-[#A8672E] dark:bg-[#D08F52] rounded-t-lg" style={{height: '73%'}} title="Feb 9: 29.06"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Feb 1</span>
              <span>Feb 5</span>
              <span>Feb 9</span>
            </div>
            <p className="text-xs text-center text-slate-400 mt-4">Simulated representation of the VIX surge.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ResearchContent = () => (
  <section id="research" className="bg-white dark:bg-[#0A0D14] py-12 border-y border-slate-100 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Literature Review" subtitle="Seminal Academic Work" icon={BookOpen} color="blue" />

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {/* Paper 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-[#A8672E] dark:bg-[#D08F52] text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-[#0A0D14] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 font-serif">Carr &amp; Wu (2009)</h3>
              <time className="font-mono text-xs text-slate-500">RFS</time>
            </div>
            <div className="text-[#A8672E] dark:text-[#D08F52] font-medium text-sm mb-3">&quot;Variance Risk Premia&quot;</div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">The definitive paper establishing standard methods for measuring VRP using synthetic variance swaps. Found <strong>VRP is strongly negative</strong> (investors pay to hedge variance) and surprisingly <strong>predicts future equity returns</strong>.</p>
          </div>
        </div>

        {/* Paper 2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-[#A8672E] dark:bg-[#D08F52] text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-[#0A0D14] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 font-serif">Bollerslev, Tauchen, Zhou (2009)</h3>
              <time className="font-mono text-xs text-slate-500">RFS</time>
            </div>
            <div className="text-[#A8672E] dark:text-[#D08F52] font-medium text-sm mb-3">&quot;Expected Stock Returns and Variance Risk Premia&quot;</div>
            <p className="text-slate-600 dark:text-slate-400 text-sm"><strong>Key Finding:</strong> Linked VRP to macroeconomic uncertainty. Showed that a <strong>high VRP spread</strong> is one of the best short-term predictors of <strong>higher aggregate stock market returns</strong> (compensation for the heightened risk).</p>
          </div>
        </div>
      </div>

      <div className="mt-24 bg-slate-900 rounded-3xl p-10 text-slate-300">
        <h3 className="text-white text-2xl font-bold mb-6 font-serif">Are VRPs Always Positive?</h3>
        <p className="mb-4">The short answer is <strong>No, but overwhelmingly Yes</strong> over long periods.</p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <AlertTriangle className="w-5 h-5 mr-3 text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-1" />
            <span><strong>Positive VRP:</strong> This is the most common state (85-90% of the time) where <strong>Implied Volatility &gt; Realized Volatility</strong>. This is the premium option sellers collect.</span>
          </li>
          <li className="flex items-start">
            <Activity className="w-5 h-5 mr-3 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-1" />
            <span><strong>Negative VRP:</strong> Occurs during <strong>major market panics or crashes</strong> (e.g., 2008, March 2020). IV spikes, but RV during the subsequent period can exceed that spike. This is when option sellers suffer large losses.</span>
          </li>
          <li className="flex items-start">
            <Brain className="w-5 h-5 mr-3 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-1" />
            <span><strong>VRP Timing:</strong> High VRP (wide spread) often signals <strong>low market complacency</strong> and often precedes a period of low realized volatility, making it a potentially attractive time to sell.</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default function VolatilityRiskPremiumArticle() {
  return (
    <ArticleFrame
      slug="demystifying-volatility-risk-premium-theory-measurement-trading"
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors."
    >
      <div className="text-slate-800 dark:text-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <InfographicSlot alt="Volatility Risk Premium Infographic" />
        </div>
        <HomeContent />
        <TheoryContent />
        <CalculationContent />
        <StrategiesContent />
        <ResearchContent />
      </div>
    </ArticleFrame>
  );
}
