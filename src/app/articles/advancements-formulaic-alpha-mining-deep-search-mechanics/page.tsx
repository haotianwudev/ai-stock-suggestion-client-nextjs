'use client';

import React from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  FunctionSquare, 
  Network, 
  LineChart, 
  AlertOctagon, 
  CheckCircle2, 
  Calculator,
  ShieldAlert,
  Target,
  Zap,
  Activity,
  BarChart4
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';

const SectionHeading = ({ title, icon: Icon, color = 'text-blue-600', bg = 'bg-blue-100' }: { title: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; color?: string; bg?: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-3 rounded-2xl ${bg} ${color} shadow-sm`}>
      <Icon size={32} strokeWidth={2.5} />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
      {title}
    </h2>
  </div>
);

const FoundationSection = () => {
  return (
    <section className="py-16">
      <SectionHeading title="The Foundation of Formulaic Alphas" icon={FunctionSquare} color="text-fuchsia-600" bg="bg-fuchsia-100" />
      
      <div className="prose prose-lg text-slate-600 max-w-none mb-10">
        <p>
          In quantitative investment theory, an <strong>&ldquo;alpha&rdquo;</strong> is a predictive mathematical model that transforms raw financial data into a directional signal indicating expected future excess returns. The popularization of formulaic alphas is attributed to quant funds like WorldQuant, who championed generating immense libraries of simple, interpretable signals (e.g., Zura Kakushadze&apos;s <em>101 Formulaic Alphas</em>).
        </p>
        <p>
          Formulaic alphas are explicit, algebraic expressions (e.g., <code>Rank(Correlation(Close, Volume, 10))</code>) acting as highly condensed feature engineering pipelines. But why do top funds prefer these over modern Deep Learning?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border border-indigo-100 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FunctionSquare size={100} />
          </div>
          <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-indigo-500" /> Formulaic Alphas
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-indigo-800"><b className="w-32 shrink-0">Interpretability:</b> High. Expressions are explicitly human-readable.</li>
            <li className="flex gap-3 text-indigo-800"><b className="w-32 shrink-0">Overfitting Risk:</b> Low to Moderate. Constrained by mathematical syntax.</li>
            <li className="flex gap-3 text-indigo-800"><b className="w-32 shrink-0">Dimensional Logic:</b> Enforceable. Rejects logically flawed formulas.</li>
            <li className="flex gap-3 text-indigo-800"><b className="w-32 shrink-0">Computational Cost:</b> Extremely Low. Rapid cross-sectional scoring.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8 border border-rose-100 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <Network size={100} />
          </div>
          <h3 className="text-2xl font-bold text-rose-900 mb-6 flex items-center gap-2">
            <AlertOctagon className="text-rose-500" /> Black-Box ML Models
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-rose-800"><b className="w-32 shrink-0">Interpretability:</b> Low. Opaque matrices of weights.</li>
            <li className="flex gap-3 text-rose-800"><b className="w-32 shrink-0">Overfitting Risk:</b> Extremely High. Vast parameter spaces fit noise easily.</li>
            <li className="flex gap-3 text-rose-800"><b className="w-32 shrink-0">Dimensional Logic:</b> Unconstrained. Combines incompatible data types.</li>
            <li className="flex gap-3 text-rose-800"><b className="w-32 shrink-0">Computational Cost:</b> High. Requires heavy GPU acceleration for training.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

const MechanicsSection = () => {
  const operators = [
    { name: 'Rank', desc: 'Transforms raw values into cross-sectional percentiles (e.g., market-neutrality).', icon: BarChart4, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Delay', desc: 'Retrieves previous values. Foundational for momentum and mean-reversion.', icon: Activity, color: 'bg-blue-100 text-blue-600' },
    { name: 'Correlation', desc: 'Computes rolling relationships to detect regime shifts or breakdowns.', icon: Network, color: 'bg-purple-100 text-purple-600' },
    { name: 'Decay', desc: 'Applies moving averages acting as low-pass filters to extract structural trends.', icon: TrendingUp, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <section className="py-16 border-t border-slate-200">
      <SectionHeading title="Mechanics & Mathematics of Discovery" icon={BrainCircuit} color="text-violet-600" bg="bg-violet-100" />
      
      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
        Automated discovery relies on Deep Reinforcement Learning (DRL) and <strong>Monte Carlo Tree Search (MCTS)</strong> to navigate an infinite combinatorial space. The search formulates the discovery as a Markov Decision Process (MDP) utilizing a limited set of operators.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {operators.map((op, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${op.color}`}>
              <op.icon size={24} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">{op.name}</h4>
            <p className="text-sm text-slate-500">{op.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <Target className="text-violet-400" /> Risk-Seeking Policy Gradients
        </h3>
        <p className="text-slate-300 mb-6 text-lg">
          Unlike standard RL that optimizes for average outcomes, quantitative finance is governed by extreme outliers. An MCTS agent must employ a risk-seeking policy optimizing for the extreme right tail (best-case performance).
        </p>
        
        <MathBlock math="\nabla J_{\text{risk}}(\theta; \alpha) = \frac{1}{\alpha B} \sum [R(\tau) - R_\alpha] \cdot 1_{\{R(\tau) \ge R_\alpha\}} \cdot \nabla_\theta \log(p(\tau|\theta))" />
        <p className="mt-3 text-sm text-slate-400 font-medium">
          The network learns to exclusively emit structural patterns of highly profitable alphas (top 1-α quantile), entirely ignoring syntactic structures that lead to mediocre returns.
        </p>
      </div>
    </section>
  );
};

const ApplicationSection = () => {
  return (
    <section className="py-16 border-t border-slate-200">
      <SectionHeading title="Strategy for the Retail-Scale Quant" icon={LineChart} color="text-emerald-600" bg="bg-emerald-100" />
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 space-y-6">
          <p className="text-lg text-slate-600">
            For retail practitioners utilizing open-source frameworks, optimizing for computational efficiency and signal diversity is paramount against smaller universes like the S&P 500.
          </p>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-3">
              <Zap className="text-yellow-500" /> Formula Caching
            </h4>
            <p className="text-slate-600 text-sm">
              Implementing an O(1) lookup cache eliminates 70% to 80% of redundant vector computations during the MCTS backpropagation phase, making consumer-grade GPU runs feasible.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-3">
              <Calculator className="text-blue-500" /> The Information Coefficient
            </h4>
            <p className="text-slate-600 text-sm mb-4">
              Modern implementations eschew Pearson correlation for <strong>Spearman Rank Correlation</strong> to mitigate outlier distortion and capture monotonic relationships.
            </p>
            <MathBlock math="\text{IC} = \text{SpearmanRankCorr}(\text{Alpha}_t, \text{Returns}_{t+1})" />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-gradient-to-b from-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-100 shadow-lg h-full">
            <h3 className="text-2xl font-bold text-teal-900 mb-4">Dynamic Alpha Pools & Diversity</h3>
            <p className="text-teal-800 mb-6">
              To force the agent to discover orthogonal information rather than trivial variations of the same factor, researchers utilize a Mutual Information Coefficient (MutIC) penalty.
            </p>
            <MathBlock math="\text{Adjusted IC} = \text{IC}_{\text{raw}} - \lambda \left( \frac{\sum \text{MutIC}_{\text{candidate}, i}}{k} \right)" />
            <p className="mt-3 text-sm text-teal-700 font-medium">
              If a candidate relies on existing mechanistic logic, its Adjusted IC drops precipitously, signaling the agent to abandon that search branch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const RisksSection = () => {
  return (
    <section className="py-16 border-t border-slate-200">
      <SectionHeading title="Risks, Pitfalls & Statistical Deflation" icon={ShieldAlert} color="text-red-600" bg="bg-red-100" />
      
      <p className="text-xl text-slate-700 mb-10 max-w-3xl">
        The most catastrophic risk in quantitative finance is <strong>backtest overfitting</strong>. Automated MCTS agents can evaluate tens of thousands of formulas, essentially weaponizing this risk through massive data-snooping.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">The Multiple Testing Problem</h3>
          <p className="text-slate-600 mb-6">
            When a machine learning algorithm iteratively parses 50,000 configurations, a Sharpe Ratio of 2.0 might simply represent the expected maximum of random statistical noise.
          </p>
          <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm font-medium">
            <AlertOctagon className="inline mr-2 mb-1" size={18} />
            If N = 10,000 trials, the expected max Sharpe Ratio derived entirely from random noise easily exceeds 3.20+. Standard benchmarks are obsolete.
          </div>
        </div>

        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl text-white">
          <h3 className="text-2xl font-bold text-white mb-4">Deflated Sharpe Ratio (DSR)</h3>
          <p className="text-slate-300 mb-6 text-sm">
            DSR mathematically adjusts the performance metrics by accounting for non-normal return distributions (skewness/kurtosis) and the exact number of independent trials (N).
          </p>
          <MathBlock math="\text{DSR} = Z\left[ \frac{(\text{SR} - \text{SR}_0)\sqrt{T-1}}{\sqrt{1 - \gamma_3 \text{SR} + \dots}} \right]" />
          <p className="mt-3 text-sm text-slate-400 font-medium">
            A DSR metric &gt; 0.95 indicates 95% confidence that the alpha is a genuine structural inefficiency, not a statistical fluke.
          </p>
        </div>
      </div>
    </section>
  );
};

const SynthesisSection = () => {
  const checklist = [
    { title: "Enforce Strict OOS k-Fold Cross-Validation", desc: "Discard in-sample metrics. Validate across multiple disjoint temporal regimes using TimeSeriesSplit." },
    { title: "Apply the DSR Threshold", desc: "Log exact formula trials (N). Discard any signal failing to achieve a Deflated Sharpe Ratio confidence interval > 0.95." },
    { title: "Audit for Signal Diversity", desc: "Enforce MutIC limits to prevent homogenization. Pairwise correlations should ideally remain below 0.30." },
    { title: "Conduct Economic Verification", desc: "Evaluate the raw mathematical structure. Reject formulas combining fundamentally incompatible metrics." },
    { title: "Assess Strict Capacity Constraints", desc: "Apply institutional-grade transaction costs and turnover models. Gross profitability must survive slippage." }
  ];

  return (
    <section className="py-16 border-t border-slate-200">
      <SectionHeading title="Synthesis & Actionable Checklist" icon={CheckCircle2} color="text-indigo-600" bg="bg-indigo-100" />
      
      <p className="text-lg text-slate-600 mb-12">
        The discovery of alpha is no longer constrained by algorithmic search capabilities, but rather by the <strong>statistical rigor of signal verification</strong>. Retail investors must adhere to these vital protocols:
      </p>

      <div className="space-y-4">
        {checklist.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
              {index + 1}
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function FormulicAlphaMiningArticle() {
  return (
    <ArticleFrame slug="advancements-formulaic-alpha-mining-deep-search-mechanics">
      <InfographicSlot alt="Formulaic Alpha Mining Infographic" />
      
      <div className="max-w-4xl mx-auto">
        <FoundationSection />
        <MechanicsSection />
        <ApplicationSection />
        <RisksSection />
        <SynthesisSection />
      </div>
    </ArticleFrame>
  );
}
