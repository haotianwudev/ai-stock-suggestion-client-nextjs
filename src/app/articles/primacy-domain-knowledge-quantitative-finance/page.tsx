'use client';

import React from 'react';
import {
  Network, LineChart, Database, ShieldAlert,
  BrainCircuit, Settings, Target, ArrowRight, AlertTriangle,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function PrimacyDomainKnowledgePage() {
  return (
    <ArticleFrame slug="primacy-domain-knowledge-quantitative-finance">
      <div className="pb-24">
        {/* Intro card */}
        <div className="bg-white dark:bg-[#0A0D14]/80 dark:bg-[#05070A]/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-indigo-900/20 text-left border border-slate-100 dark:border-slate-800 mb-12 mt-8 min-w-0 transition-colors">
          <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 mb-8 font-serif">
            The rapid evolution of artificial intelligence and machine learning has permeated nearly every
            facet of modern industry, bringing with it a seductive myth:{' '}
            <strong className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-semibold">the belief that data speaks for itself.</strong>
          </p>

          <ComparisonGrid>
            <ComparisonCard
              title="The Seductive Myth"
              type="neg"
              items={[
                "In quantitative finance, this manifests as the assumption that feeding vast quantities of historical market data into a sufficiently sophisticated, generalized algorithmic architecture will organically reveal profitable, predictive truths."
              ]}
            />
            <ComparisonCard
              title="The Adversarial Reality"
              type="pos"
              items={[
                "Financial markets are not deterministic physical systems governed by immutable laws.",
                "They are living ecosystems driven by human behavior, macroeconomic shifts, asymmetric information, and regulation.",
                "Pure algorithmic engineering — unguided black-box ML — frequently fails to generalize out-of-sample or collapses under real-world transactional friction."
              ]}
            />
          </ComparisonGrid>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6 shadow-lg min-w-0 mt-8">
            <div className="min-w-0">
              <h3 className="font-bold text-2xl mb-3 text-white tracking-wide font-serif">Core Thesis</h3>
              <p className="text-indigo-50 dark:text-indigo-100/90 leading-relaxed text-lg">
                This report provides an exhaustive exploration of modern quantitative finance principles,
                asserting that{' '}
                <strong className="text-white font-semibold underline decoration-indigo-300 dark:decoration-indigo-400 underline-offset-4">
                  deep financial domain expertise
                </strong>{' '}
                and{' '}
                <strong className="text-white font-semibold underline decoration-indigo-300 dark:decoration-indigo-400 underline-offset-4">
                  market intuition
                </strong>{' '}
                are the indispensable cornerstones of successful quantitative research.
              </p>
            </div>
          </div>
        </div>

        <InfographicSlot alt="Domain Knowledge in Quantitative Finance Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Network className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Dichotomy of Algorithmic Engineering and Quantitative Research</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              To fully appreciate the necessity of domain expertise, it is critical to delineate the
              boundaries between algorithmic trading and quantitative trading. While often conflated, they
              rely on distinctly different skill sets and objectives.
            </p>

            <ComparisonGrid>
              <ComparisonCard
                title="Algorithmic Trading"
                type="neutral"
                items={[
                  "Core Focus: Mechanics of execution and extreme automation.",
                  "Objective: Translate predefined rules into ultra-low-latency code to minimize slippage and market impact.",
                  "Engineering Priority: Network routing optimization, memory allocation, and exchange matching engine interaction.",
                  "Tech Stack: Lower-level systems programming (C++, Java)."
                ]}
              />
              <ComparisonCard
                title="Quantitative Trading"
                type="neutral"
                items={[
                  "Core Focus: Alpha generation and mathematical modeling.",
                  "Objective: Identify and exploit pricing inefficiencies and design the underlying rationale for a trade.",
                  "Engineering Priority: Signal discovery, asset pricing theory, and portfolio optimization.",
                  "Tech Stack: Data science, stochastic calculus, and machine learning (Python, R)."
                ]}
              />
            </ComparisonGrid>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 min-w-0 shadow-sm mt-12">
              <table className="min-w-full text-left bg-white dark:bg-[#05070A]">
                <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {['Attribute', 'Algorithmic Trading', 'Quantitative Trading'].map((h) => (
                      <th key={h} className="py-4 px-6 text-slate-900 dark:text-white font-bold text-sm">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm md:text-base">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Primary Objective</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Efficient, automated trade execution, latency reduction, and minimization of market impact.</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#14171B]/50 dark:bg-slate-900/20">Alpha generation, statistical arbitrage, portfolio optimization, and predictive modeling.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Core Skill Set</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Software engineering, network optimization, core data structures, distributed systems (C++, Java).</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#14171B]/50 dark:bg-slate-900/20">Financial mathematics, stochastic calculus, econometrics, deep learning, domain expertise (Python, R).</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Market Interaction</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Focuses on interacting with the exchange matching engine without alerting high-frequency adversaries.</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#14171B]/50 dark:bg-slate-900/20">Focuses on understanding macroeconomic drivers, pricing inefficiencies, and asset correlations across time horizons.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium whitespace-nowrap">Role of Machine Learning</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">Deployed for execution algorithms, such as predicting short-term volume profiles to optimally schedule trade execution.</td>
                    <td className="py-4 px-6 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#14171B]/50 dark:bg-slate-900/20">Deployed for signal discovery, regime detection, asset pricing theory, and cross-sectional momentum modeling.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4 min-w-0">
              <div className="flex items-start gap-4 p-6 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/30 min-w-0">
                <AlertTriangle className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mt-0.5 shrink-0 w-5 h-5" />
                <p className="text-rose-900 dark:text-rose-200 leading-relaxed text-sm"><strong className="font-bold">The Flaw of Isolation:</strong> A perfectly engineered, ultra-low-latency execution system is useless if the underlying quantitative strategy is mathematically flawed.</p>
              </div>
              <div className="flex items-start gap-4 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/30 min-w-0">
                <AlertTriangle className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0 w-5 h-5" />
                <p className="text-amber-900 dark:text-amber-200 leading-relaxed text-sm"><strong className="font-bold">The Overfitting Trap:</strong> A pure machine learning approach — feeding raw price data into a neural network without human-guided feature engineering — almost always results in catastrophic backtest overfitting.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <LineChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Market Microstructure: Feature Extraction Through Expert Intuition</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Market microstructure is the study of how individual orders are submitted, matched, and
              cancelled within the Limit Order Book (LOB). While it provides the ultimate high-frequency
              dataset, raw processing is highly problematic.
            </p>

            <ul className="space-y-4 mb-12 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Massive &amp; Noisy:</strong> Generates terabytes of stochastic, highly noisy tick data daily.</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Ambiguous Context:</strong> The "meaning" of a cancelled order is highly subjective (e.g., immediate cancellations or "iceberg" orders hiding true liquidity).</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The Need for Guided Preprocessing:</strong> Applying generalized ML directly to raw tick data yields poor results; deep domain expertise is required to engineer predictive signals.</div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Expert-Engineered Microstructure Features</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-10 min-w-0">
              {[
                { title: 'Order Book Imbalance', desc: 'Measures the discrepancy between bids and asks to detect impending price pressure.' },
                { title: 'Smart Price', desc: 'A volume-weighted variation of the mid-price that better reflects true market equilibrium.' },
                { title: 'Trade Signs & Aggressors', desc: 'Tracks buyer-initiated vs. seller-initiated executions to detect stealth institutional accumulation.' },
                { title: 'Bid-Ask Spread Friction', desc: 'Acts as a physical friction parameter in RL execution models to weigh the cost of crossing the spread versus waiting.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-6 min-w-0 shadow-sm transition-transform hover:-translate-y-1">
                  <p className="font-bold text-emerald-900 dark:text-emerald-300 mb-2 font-serif text-lg">{item.title}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-slate-300 dark:border-slate-700 pl-4 py-2">
              These raw features must be rigorously normalized, time-averaged, and discretized into distinct
              state-spaces, often utilizing multivariate Hawkes processes to analyze behavior during extreme
              market events.
            </p>
          </section>

          {/* Section 3 */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Alternative Data &amp; MDH</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Long-term asset pricing is heavily influenced by macroeconomic variables and public sentiment.
              Integrating Natural Language Processing (NLP) allows researchers to harvest "alternative
              data" like news, earnings calls, and SEC filings.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The Evolution of Financial NLP</h3>

            <ul className="space-y-4 mb-10 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">From Rigid to Dynamic:</strong> The industry has abandoned static dictionaries (like Loughran-McDonald) in favor of advanced Large Language Models (OPT, FinBERT, Gemma).</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Contextual Awareness:</strong> LLMs can interpret idiosyncratic financial jargon (e.g., distinguishing a software "default" from a catastrophic debt "default").</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">High Efficacy:</strong> Modern LLMs have demonstrated the ability to predict stock market returns from financial news with accuracy exceeding 74%.</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Deep Extraction:</strong> LLMs uncover hidden supply chain dependencies and subtle regulatory shifts buried in dense corporate filings.</div>
              </li>
            </ul>

            <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 p-8 rounded-r-2xl mb-8 min-w-0">
              <p className="font-bold text-purple-900 dark:text-purple-300 mb-3 text-lg font-serif">Background Guidance &amp; The Mixture of Distributions Hypothesis (MDH)</p>
              <p className="text-sm text-purple-800 dark:text-purple-200/80 leading-relaxed">
                Alternative textual data is frequently utilized as crucial "background guidance". The MDH
                (Clark, 1973) posits that market volatility is directly proportional to the rate of new
                information arrival. When a specialized LLM detects a sudden surge in negative macroeconomic
                news, the system does not merely generate a blind "sell" signal. Instead, it establishes a
                high-volatility background regime, intelligently shifting its operational posture (e.g.,
                pivoting from mean-reversion to volatility-arbitrage).
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Advanced Risk Management &amp; Circuit Breakers</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The adversarial nature of financial markets requires rigorous, multi-layered risk management.
              An algorithmic model without robust fail-safes is a systemic hazard.
            </p>

            <ul className="space-y-4 mb-12 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Cascading Failures:</strong> When ML models encounter out-of-distribution events, they can generate erratic trades that devastate portfolios in seconds.</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Inadequate Public Safety Nets:</strong> Exchange-level market-wide circuit breakers are mixed in effectiveness and insufficient for internal portfolio protection.</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The OMS Requirement:</strong> Quantitative funds must embed internal, proactive "risk gates" directly within their Order Management Systems (OMS).</div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Complex Algorithmic Circuit Breakers</h3>

            <div className="space-y-6 mb-12 min-w-0">
              <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/40 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] flex items-center justify-center font-bold shrink-0 mt-0.5">1</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-2 font-serif text-lg">Drawdown Limits</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Absolute or relative thresholds that immediately pause trading
                    operations if a predefined percentage of the portfolio's capital is lost, preventing a
                    localized statistical anomaly from escalating into catastrophic account devastation.
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/40 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] flex items-center justify-center font-bold shrink-0 mt-0.5">2</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-2 font-serif text-lg">Consecutive Failure Halts</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    A circuit breaker pattern wherein an algorithmic
                    system halts execution for a designated cooldown period after a set number of consecutive
                    unprofitable trades or failed API routing requests.
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/40 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] flex items-center justify-center font-bold shrink-0 mt-0.5">3</div>
                <div className="min-w-0">
                  <strong className="block text-slate-900 dark:text-white mb-2 font-serif text-lg">Sentiment-Triggered LLM Halts</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Utilizing LLMs for real-time narrative risk
                    monitoring. By analyzing streaming global financial news, an LLM can detect sudden negative
                    sentiment shifts — such as war or debt default — preemptively triggering halts before
                    turbulence hits the order book's price action.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/30 min-w-0 shadow-sm">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-4 font-serif text-xl">LLM Governance &amp; Hallucination Mitigation</h4>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                  <div>Deploying Retrieval-Augmented Generation (RAG) to ground models in verified facts.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                  <div>Utilizing domain-constrained prompting to enforce strict compliance standards.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                  <div>Preventing LLMs from executing trades based on false or "hallucinated" news generation.</div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Vertical Domain Models vs. Artificial General Intelligence</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The unique demands of the financial sector expose the limitations of Artificial General
              Intelligence (AGI). Specialized "Vertical AI" prioritizes deep domain expertise and
              regulatory alignment over broad, horizontal flexibility.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The BloombergGPT Paradigm</h3>

            <ul className="space-y-4 mb-12 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The Baseline:</strong> A 50-billion parameter generative LLM engineered explicitly for finance.</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The "FinPile" Dataset:</strong> Trained on an unprecedented 363-billion domain-specific tokens (news, SEC filings, Terminal data).</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The Blend:</strong> Combined with 345-billion general tokens to maintain basic linguistic reasoning while dominating financial benchmarks.</div>
              </li>
            </ul>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-12 min-w-0">
              <table className="min-w-full text-left bg-white dark:bg-[#05070A]">
                <thead className="bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300 border-b border-amber-100 dark:border-amber-900/50">
                  <tr>
                    {['Model Classification', 'Representative Models', 'Training Data Composition', 'Inherent Weaknesses in Finance'].map((h) => (
                      <th key={h} className="py-4 px-6 font-bold text-sm">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300 text-sm md:text-base">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900 dark:text-white whitespace-nowrap">Horizontal / Generalist</td>
                    <td className="py-4 px-6">GPT-4, LLaMA 3, Gemma 2</td>
                    <td className="py-4 px-6">Broad web scrape, generalized multi-domain text.</td>
                    <td className="py-4 px-6">High risk of hallucinations, lacks precision in complex numerical reasoning, misunderstands niche financial jargon.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900 dark:text-white whitespace-nowrap">Vertical / Domain-Specific</td>
                    <td className="py-4 px-6">BloombergGPT, FinGPT, InvestLM</td>
                    <td className="py-4 px-6">Heavily weighted toward domain-specific texts (10-Ks, financial news) curated by experts.</td>
                    <td className="py-4 px-6">Narrow application scope outside of finance, high initial cost of proprietary data curation and training.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The Democratization of Financial AI</h3>

            <ul className="space-y-4 mb-8 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Open-Source Catchup:</strong> Initiatives like FinGPT are matching institutional models using open architectures.</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Parameter-Efficient Fine-Tuning (PEFT):</strong> Techniques like LoRA allow researchers to adapt massive models (LLaMA, Gemma) on consumer hardware.</div>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">Edge Computing:</strong> Google's Gemma 3 (270M parameters) proves that small, highly-specialized models can run locally for sentiment and compliance without API latency.</div>
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Post-Training Alignment</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Pre-training an LLM provides raw knowledge, but the model must undergo rigorous post-training
              alignment to follow instructions, align with human risk preferences, and generate
              mathematically suitable outputs for algorithmic trading. The explicit input of domain experts
              is most consequential here.
            </p>

            <div className="space-y-6 mb-12 min-w-0">
              {[
                {
                  title: 'Supervised Fine-Tuning (SFT)',
                  desc: 'The foundational method adapting a base model to structured tasks using meticulously curated human-labeled data. While efficient, it suffers from "catastrophic forgetting" and tends to memorize specific training data, failing out-of-distribution.',
                },
                {
                  title: 'Proximal Policy Optimization (PPO)',
                  desc: 'A Reinforcement Learning paradigm where experts rank responses to train a "reward model." While it excels at multi-step reasoning, it is exceptionally complex, computationally expensive, and unstable.',
                },
                {
                  title: 'Direct Preference Optimization (DPO)',
                  desc: 'A mathematical breakthrough eliminating the separate reward model. DPO uses a specialized binary cross-entropy loss function to directly optimize the model\'s parameters based on pairwise preference comparisons (chosen vs. rejected), enabling fine-grained, robust alignment.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-[#05070A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-0 transition-all hover:shadow-md">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3 text-lg font-serif">
                    <ArrowRight size={20} className="text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 pl-8 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The FinDPO Framework &amp; Mathematical Translation</h3>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              A fundamental mechanical challenge is translating discrete text tokens ("Positive") into
              continuous numerical probability scores required for precise asset weightings. The FinDPO
              framework addresses this through a novel "logit-to-score" conversion mechanism, extracting
              the raw logits and applying a softmax transformation:
            </p>

            <div className="mb-12 min-w-0">
              <FormulaPanel 
                title="Logit-to-Score Softmax Conversion"
                formula="P(class_i) = \frac{e^{logit_i}}{\sum e^{logit_j}}"
                legend={[
                  { label: "P(class_i)", value: "Probability score for class i" },
                  { label: "logit_i", value: "Raw output logit for class i" }
                ]}
              />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Walk-Forward Backtesting Outcomes</h3>

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 min-w-0 shadow-sm">
              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                  <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The SFT Failure:</strong> Standard Supervised Fine-Tuned models collapsed under realistic conditions (including 5 bps transaction costs), generating negative returns due to poor probability scaling.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                  <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The FinDPO Success:</strong> The strictly aligned FinDPO strategy maintained a market-beating <strong className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold">67% annual return</strong> with a robust <strong className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold">Sharpe ratio of 2.0</strong>.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                  <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The Takeaway:</strong> AI must be mathematically bridged and deeply aligned with human risk preferences to generate sustainable alpha.</div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 – Conclusion */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Convergence of Expertise and Engineering</h2>
            </div>
            
            <p className="text-xl text-slate-800 dark:text-slate-200 font-medium mb-10 leading-relaxed font-serif">
              The future of quantitative finance relies entirely on the synthesis of algorithmic scale and
              human intuition.
            </p>

            <ul className="space-y-6 mb-12 text-slate-700 dark:text-slate-300 text-lg">
              <li className="flex items-start gap-4">
                <ChevronRight className="w-6 h-6 mt-1 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The Limits of Discretion:</strong> Pure human discretionary trading cannot match the speed, scale, or high-frequency opportunities of modern algorithms.</div>
              </li>
              <li className="flex items-start gap-4">
                <ChevronRight className="w-6 h-6 mt-1 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The Limits of Engineering:</strong> Isolated computer science and naive machine learning inevitably chase statistical noise, shattering upon contact with real-world macroeconomic shocks.</div>
              </li>
              <li className="flex items-start gap-4">
                <ChevronRight className="w-6 h-6 mt-1 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                <div className="leading-relaxed"><strong className="text-slate-900 dark:text-white font-semibold">The Symbiotic Future:</strong> Technology provides the vehicle (processing data in microseconds), but the domain expert — understanding behavioral risk and economic cause-and-effect — must dictate the roadmap.</div>
              </li>
            </ul>

            <div className="bg-[#14171B] dark:bg-[#05070A] rounded-[3rem] p-8 md:p-14 shadow-xl border border-slate-800 mt-12 min-w-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D08F52]/10 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="font-bold text-2xl text-white mb-8 font-serif relative z-10">Conclusion</h3>
              <blockquote className="text-slate-300 text-lg md:text-xl leading-relaxed italic border-l-4 border-[#D08F52] pl-8 relative z-10 font-serif">
                "The relentless pursuit of predictive dominance in global financial markets has definitively
                proven that generalized artificial intelligence and pure algorithmic engineering are
                incomplete, often fragile solutions. Exhaustive empirical evidence demonstrates that deep
                financial domain expertise is the critical catalyst required to transform raw data and raw
                compute into actionable, risk-adjusted returns... Ultimately, while sophisticated algorithmic
                technology provides the speed and scale required to merely participate in modern markets, it
                is profound, deeply cultivated market understanding that provides the sustainable edge
                necessary to win."
              </blockquote>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
