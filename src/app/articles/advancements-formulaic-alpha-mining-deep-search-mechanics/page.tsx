'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

const FoundationSection = () => {
  return (
    <section className="py-16">
      <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
        The Foundation of Formulaic Alphas
      </h2>
      
      <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none mb-10 text-sm">
        <p>
          In quantitative investment theory, an <strong>"alpha"</strong> is a predictive mathematical model that transforms raw financial data into a directional signal indicating expected future excess returns. The popularization of formulaic alphas is attributed to quant funds like WorldQuant, who championed generating immense libraries of simple, interpretable signals (e.g., Zura Kakushadze's <em>101 Formulaic Alphas</em>).
        </p>
        <p>
          Formulaic alphas are explicit, algebraic expressions (e.g., <code>Rank(Correlation(Close, Volume, 10))</code>) acting as highly condensed feature engineering pipelines. But why do top funds prefer these over modern Deep Learning?
        </p>
      </div>

      <ComparisonGrid>
        <ComparisonCard title="Formulaic Alphas" tone="pos">
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><b className="w-32 shrink-0">Interpretability:</b> High. Expressions are explicitly human-readable.</li>
            <li className="flex gap-3"><b className="w-32 shrink-0">Overfitting Risk:</b> Low to Moderate. Constrained by mathematical syntax.</li>
            <li className="flex gap-3"><b className="w-32 shrink-0">Dimensional Logic:</b> Enforceable. Rejects logically flawed formulas.</li>
            <li className="flex gap-3"><b className="w-32 shrink-0">Computational Cost:</b> Extremely Low. Rapid cross-sectional scoring.</li>
          </ul>
        </ComparisonCard>

        <ComparisonCard title="Black-Box ML Models" tone="neg">
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><b className="w-32 shrink-0">Interpretability:</b> Low. Opaque matrices of weights.</li>
            <li className="flex gap-3"><b className="w-32 shrink-0">Overfitting Risk:</b> Extremely High. Vast parameter spaces fit noise easily.</li>
            <li className="flex gap-3"><b className="w-32 shrink-0">Dimensional Logic:</b> Unconstrained. Combines incompatible data types.</li>
            <li className="flex gap-3"><b className="w-32 shrink-0">Computational Cost:</b> High. Requires heavy GPU acceleration for training.</li>
          </ul>
        </ComparisonCard>
      </ComparisonGrid>
    </section>
  );
};

const MechanicsSection = () => {
  const operators = [
    { name: 'Rank', desc: 'Transforms raw values into cross-sectional percentiles (e.g., market-neutrality).' },
    { name: 'Delay', desc: 'Retrieves previous values. Foundational for momentum and mean-reversion.' },
    { name: 'Correlation', desc: 'Computes rolling relationships to detect regime shifts or breakdowns.' },
    { name: 'Decay', desc: 'Applies moving averages acting as low-pass filters to extract structural trends.' },
  ];

  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
        Mechanics & Mathematics of Discovery
      </h2>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        Automated discovery relies on Deep Reinforcement Learning (DRL) and <strong>Monte Carlo Tree Search (MCTS)</strong> to navigate an infinite combinatorial space. The search formulates the discovery as a Markov Decision Process (MDP) utilizing a limited set of operators.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {operators.map((op, idx) => (
          <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h4 className="text-lg font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">{op.name}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{op.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-8">
        <FormulaPanel
          title="Risk-Seeking Policy Gradients"
          formula="\nabla J_{\text{risk}}(\theta; \alpha) = \frac{1}{\alpha B} \sum [R(\tau) - R_\alpha] \cdot 1_{\{R(\tau) \ge R_\alpha\}} \cdot \nabla_\theta \log(p(\tau|\theta))"
          legend="Unlike standard RL that optimizes for average outcomes, quantitative finance is governed by extreme outliers. An MCTS agent must employ a risk-seeking policy optimizing for the extreme right tail (best-case performance). The network learns to exclusively emit structural patterns of highly profitable alphas, entirely ignoring syntactic structures that lead to mediocre returns."
        />
      </div>
    </section>
  );
};

const ApplicationSection = () => {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
        Strategy for the Retail-Scale Quant
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 space-y-6 min-w-0">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            For retail practitioners utilizing open-source frameworks, optimizing for computational efficiency and signal diversity is paramount against smaller universes like the S&P 500.
          </p>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h4 className="font-serif font-bold text-[#A8672E] dark:text-[#D08F52] text-lg flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
              Formula Caching
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Implementing an O(1) lookup cache eliminates 70% to 80% of redundant vector computations during the MCTS backpropagation phase, making consumer-grade GPU runs feasible.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <h4 className="font-serif font-bold text-[#1D8A70] dark:text-[#3CBF9C] text-lg flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
              The Information Coefficient
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Modern implementations eschew Pearson correlation for <strong>Spearman Rank Correlation</strong> to mitigate outlier distortion and capture monotonic relationships.
            </p>
            <MathBlock math="\text{IC} = \text{SpearmanRankCorr}(\text{Alpha}_t, \text{Returns}_{t+1})" />
          </div>
        </div>

        <div className="lg:w-1/2 min-w-0">
          <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-3xl p-8 border border-[#A8672E]/20 dark:border-[#D08F52]/20 h-full overflow-x-auto">
            <h3 className="text-xl font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-4">Dynamic Alpha Pools & Diversity</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
              To force the agent to discover orthogonal information rather than trivial variations of the same factor, researchers utilize a Mutual Information Coefficient (MutIC) penalty.
            </p>
            <MathBlock math="\text{Adjusted IC} = \text{IC}_{\text{raw}} - \lambda \left( \frac{\sum \text{MutIC}_{\text{candidate}, i}}{k} \right)" />
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
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
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl md:text-3xl font-serif text-[#BC4128] dark:text-[#E2694A] mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
        Risks, Pitfalls & Statistical Deflation
      </h2>
      
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-10 max-w-3xl">
        The most catastrophic risk in quantitative finance is <strong>backtest overfitting</strong>. Automated MCTS agents can evaluate tens of thousands of formulas, essentially weaponizing this risk through massive data-snooping.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 min-w-0">
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">The Multiple Testing Problem</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            When a machine learning algorithm iteratively parses 50,000 configurations, a Sharpe Ratio of 2.0 might simply represent the expected maximum of random statistical noise.
          </p>
          <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] p-4 rounded-xl text-sm font-medium border border-[#BC4128]/20 dark:border-[#E2694A]/20">
            If N = 10,000 trials, the expected max Sharpe Ratio derived entirely from random noise easily exceeds 3.20+. Standard benchmarks are obsolete.
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 overflow-x-auto min-w-0">
          <h3 className="text-xl font-serif font-bold text-white mb-4">Deflated Sharpe Ratio (DSR)</h3>
          <p className="text-slate-300 mb-6 text-sm">
            DSR mathematically adjusts the performance metrics by accounting for non-normal return distributions (skewness/kurtosis) and the exact number of independent trials (N).
          </p>
          <MathBlock math="\text{DSR} = Z\left[ \frac{(\text{SR} - \text{SR}_0)\sqrt{T-1}}{\sqrt{1 - \gamma_3 \text{SR} + \dots}} \right]" />
          <p className="mt-4 text-sm text-slate-400 font-medium">
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
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
        Synthesis & Actionable Checklist
      </h2>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-12">
        The discovery of alpha is no longer constrained by algorithmic search capabilities, but rather by the <strong>statistical rigor of signal verification</strong>. Retail investors must adhere to these vital protocols:
      </p>

      <div className="space-y-4">
        {checklist.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8672E] dark:bg-[#D08F52] flex items-center justify-center text-white font-serif font-bold text-sm">
              {index + 1}
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-slate-800 dark:text-slate-200 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
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
      <div className="pb-24">
        <InfographicSlot alt="Formulaic Alpha Mining Infographic" />
        <div className="max-w-4xl mx-auto">
          <FoundationSection />
          <MechanicsSection />
          <ApplicationSection />
          <RisksSection />
          <SynthesisSection />
        </div>
      </div>
    </ArticleFrame>
  );
}
