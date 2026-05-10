'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Network, LineChart, Database, ShieldAlert,
  BrainCircuit, Settings, Target, ArrowRight, AlertTriangle,
  CheckCircle2, Zap, ExternalLink,
} from 'lucide-react';
import { Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// ─── Reusable Components ───────────────────────────────────────────────────────

const Section = ({
  icon: Icon,
  title,
  gradient,
  children,
}: {
  icon: React.ElementType;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) => (
  <section className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden mb-12 hover:shadow-md transition-shadow duration-300 relative">
    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradient}`} />
    <div className="p-8 md:p-12">
      <div className="flex items-center gap-5 mb-8">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-tight">{title}</h2>
      </div>
      <div className="text-lg text-slate-600 leading-relaxed space-y-6">{children}</div>
    </div>
  </section>
);

const MathBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-900 text-slate-100 my-8 py-6 px-6 rounded-2xl border border-slate-700 shadow-inner overflow-x-auto">
    <div className="font-mono text-base md:text-lg text-center">{children}</div>
  </div>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 tracking-tight flex items-center gap-2">
    <div className="w-1.5 h-6 bg-slate-300 rounded-full" />
    {children}
  </h3>
);

const CompareCard = ({
  title,
  items,
  accent,
}: {
  title: string;
  items: { label: string; text: string }[];
  accent: string;
}) => (
  <div className={`bg-white p-5 rounded-xl border ${accent} shadow-sm`}>
    <h3 className={`font-bold mb-3 border-b pb-2 ${accent.replace('border-', 'text-').replace('-100', '-900').replace('border-', 'border-')}`}>{title}</h3>
    <ul className="space-y-2 list-disc pl-5 text-slate-700 marker:text-slate-400">
      {items.map((item, i) => (
        <li key={i}><strong>{item.label}:</strong> {item.text}</li>
      ))}
    </ul>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PrimacyDomainKnowledgePage() {
  const currentArticle = articles.find(a => a.slug === 'primacy-domain-knowledge-quantitative-finance');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const infographicUrl = 'https://i.imgur.com/pHGOcTD.png';
  const googleDocUrl = 'https://docs.google.com/document/d/e/2PACX-1vT_og9NfAgJ9t77BRrhJIIVM82DnqIIw1MWwplsGj2q8eRy9XPa5f-8sKBhyRAOmW686-ccHhjQcOSS/pub';

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative selection:bg-indigo-100 selection:text-indigo-900">
      {/* SEO */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData
            articleTitle={currentArticle.title}
            articleSlug={currentArticle.slug!}
          />
        </>
      )}

      {/* Decorative background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-purple-100/40 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-emerald-100/30 blur-3xl" />
      </div>

      {/* Return to Home */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero */}
      <header className="pt-16 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-6 text-indigo-600">
          <BookOpen size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 leading-tight">
          The Primacy of Domain Knowledge in Quantitative Finance
        </h1>
        <p className="text-xl md:text-2xl font-light text-slate-600 mb-10">
          Overcoming Algorithmic Abstraction with Market Intuition
        </p>

        {/* Intro card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl shadow-indigo-100/50 text-left border border-white">
          <p className="text-xl leading-relaxed text-slate-700 mb-8">
            The rapid evolution of artificial intelligence and machine learning has permeated nearly every
            facet of modern industry, bringing with it a seductive myth:{' '}
            <strong className="text-indigo-600 font-semibold">the belief that data speaks for itself.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-rose-50/70 border border-rose-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-rose-700">
                <AlertTriangle size={22} className="shrink-0" />
                <h3 className="font-bold text-lg">The Seductive Myth</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                In quantitative finance, this manifests as the assumption that feeding vast quantities of
                historical market data into a sufficiently sophisticated, generalized algorithmic architecture
                will organically reveal profitable, predictive truths.
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-emerald-700">
                <CheckCircle2 size={22} className="shrink-0" />
                <h3 className="font-bold text-lg">The Adversarial Reality</h3>
              </div>
              <ul className="space-y-3 text-slate-700">
                {[
                  'Financial markets are not deterministic physical systems governed by immutable laws.',
                  'They are living ecosystems driven by human behavior, macroeconomic shifts, asymmetric information, and regulation.',
                  'Pure algorithmic engineering — unguided black-box ML — frequently fails to generalize out-of-sample or collapses under real-world transactional friction.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1 text-lg leading-none">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-5 shadow-lg">
            <div className="p-3 bg-white/20 rounded-xl shrink-0 backdrop-blur-md">
              <Zap size={28} className="text-indigo-50" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1 text-white tracking-wide">Core Thesis</h3>
              <p className="text-indigo-50 leading-relaxed text-lg">
                This report provides an exhaustive exploration of modern quantitative finance principles,
                asserting that{' '}
                <strong className="text-white font-semibold underline decoration-indigo-300 underline-offset-4">
                  deep financial domain expertise
                </strong>{' '}
                and{' '}
                <strong className="text-white font-semibold underline decoration-indigo-300 underline-offset-4">
                  market intuition
                </strong>{' '}
                are the indispensable cornerstones of successful quantitative research.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Infographic */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img
            src={infographicUrl}
            alt="Domain Knowledge in Quantitative Finance Infographic"
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
        src={infographicUrl}
        alt="Domain Knowledge in Quantitative Finance Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-24">

        {/* Section 1 */}
        <Section
          icon={Network}
          title="1. The Dichotomy of Algorithmic Engineering and Quantitative Research"
          gradient="from-blue-500 to-indigo-500"
        >
          <p>
            To fully appreciate the necessity of domain expertise, it is critical to delineate the
            boundaries between algorithmic trading and quantitative trading. While often conflated, they
            rely on distinctly different skill sets and objectives.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <CompareCard
              title="Algorithmic Trading"
              accent="border-blue-100"
              items={[
                { label: 'Core Focus', text: 'Mechanics of execution and extreme automation.' },
                { label: 'Objective', text: 'Translate predefined rules into ultra-low-latency code to minimize slippage and market impact.' },
                { label: 'Engineering Priority', text: 'Network routing optimization, memory allocation, and exchange matching engine interaction.' },
                { label: 'Tech Stack', text: 'Lower-level systems programming (C++, Java).' },
              ]}
            />
            <CompareCard
              title="Quantitative Trading"
              accent="border-indigo-100"
              items={[
                { label: 'Core Focus', text: 'Alpha generation and mathematical modeling.' },
                { label: 'Objective', text: 'Identify and exploit pricing inefficiencies and design the underlying rationale for a trade.' },
                { label: 'Engineering Priority', text: 'Signal discovery, asset pricing theory, and portfolio optimization.' },
                { label: 'Tech Stack', text: 'Data science, stochastic calculus, and machine learning (Python, R).' },
              ]}
            />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm my-6">
            <table className="min-w-full text-left bg-white text-sm">
              <thead className="bg-blue-50 text-blue-900 border-b border-blue-100">
                <tr>
                  {['Attribute', 'Algorithmic Trading', 'Quantitative Trading'].map((h) => (
                    <th key={h} className="p-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  ['Primary Objective', 'Efficient, automated trade execution, latency reduction, and minimization of market impact.', 'Alpha generation, statistical arbitrage, portfolio optimization, and predictive modeling.'],
                  ['Core Skill Set', 'Software engineering, network optimization, core data structures, distributed systems (C++, Java).', 'Financial mathematics, stochastic calculus, econometrics, deep learning, domain expertise (Python, R).'],
                  ['Market Interaction', 'Focuses on interacting with the exchange matching engine without alerting high-frequency adversaries.', 'Focuses on understanding macroeconomic drivers, pricing inefficiencies, and asset correlations across time horizons.'],
                  ['Role of Machine Learning', 'Deployed for execution algorithms, such as predicting short-term volume profiles to optimally schedule trade execution.', 'Deployed for signal discovery, regime detection, asset pricing theory, and cross-sectional momentum modeling.'],
                ].map(([attr, algo, quant], i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{attr}</td>
                    <td className="p-4">{algo}</td>
                    <td className="p-4">{quant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl border border-rose-100">
              <AlertTriangle size={18} className="text-rose-500 mt-1 shrink-0" />
              <p><strong>The Flaw of Isolation:</strong> A perfectly engineered, ultra-low-latency execution system is useless if the underlying quantitative strategy is mathematically flawed.</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <AlertTriangle size={18} className="text-amber-500 mt-1 shrink-0" />
              <p><strong>The Overfitting Trap:</strong> A pure machine learning approach — feeding raw price data into a neural network without human-guided feature engineering — almost always results in catastrophic backtest overfitting.</p>
            </div>
          </div>
        </Section>

        {/* Section 2 */}
        <Section
          icon={LineChart}
          title="2. Market Microstructure: Feature Extraction Through Expert Intuition"
          gradient="from-emerald-500 to-teal-500"
        >
          <p>
            Market microstructure is the study of how individual orders are submitted, matched, and
            cancelled within the Limit Order Book (LOB). While it provides the ultimate high-frequency
            dataset, raw processing is highly problematic.
          </p>

          <ul className="space-y-3 my-6 list-disc pl-6 text-slate-700 marker:text-emerald-500">
            <li><strong>Massive &amp; Noisy:</strong> Generates terabytes of stochastic, highly noisy tick data daily.</li>
            <li><strong>Ambiguous Context:</strong> The &ldquo;meaning&rdquo; of a cancelled order is highly subjective (e.g., immediate cancellations or &ldquo;iceberg&rdquo; orders hiding true liquidity).</li>
            <li><strong>The Need for Guided Preprocessing:</strong> Applying generalized ML directly to raw tick data yields poor results; deep domain expertise is required to engineer predictive signals.</li>
          </ul>

          <SubHeading>Expert-Engineered Microstructure Features</SubHeading>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              { title: 'Order Book Imbalance', desc: 'Measures the discrepancy between bids and asks to detect impending price pressure.' },
              { title: 'Smart Price', desc: 'A volume-weighted variation of the mid-price that better reflects true market equilibrium.' },
              { title: 'Trade Signs & Aggressors', desc: 'Tracks buyer-initiated vs. seller-initiated executions to detect stealth institutional accumulation.' },
              { title: 'Bid-Ask Spread Friction', desc: 'Acts as a physical friction parameter in RL execution models to weigh the cost of crossing the spread versus waiting.' },
            ].map((item, i) => (
              <div key={i} className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
                <p className="font-bold text-emerald-900 mb-1">{item.title}</p>
                <p className="text-sm text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>

          <p>
            These raw features must be rigorously normalized, time-averaged, and discretized into distinct
            state-spaces, often utilizing multivariate Hawkes processes to analyze behavior during extreme
            market events.
          </p>
        </Section>

        {/* Section 3 */}
        <Section
          icon={Database}
          title="3. Alternative Data, Background Guidance, and the Mixture of Distributions Hypothesis"
          gradient="from-purple-500 to-violet-500"
        >
          <p>
            Long-term asset pricing is heavily influenced by macroeconomic variables and public sentiment.
            Integrating Natural Language Processing (NLP) allows researchers to harvest &ldquo;alternative
            data&rdquo; like news, earnings calls, and SEC filings.
          </p>

          <SubHeading>The Evolution of Financial NLP</SubHeading>

          <ul className="space-y-3 my-6 list-disc pl-6 text-slate-700 marker:text-purple-500">
            <li><strong>From Rigid to Dynamic:</strong> The industry has abandoned static dictionaries (like Loughran-McDonald) in favor of advanced Large Language Models (OPT, FinBERT, Gemma).</li>
            <li><strong>Contextual Awareness:</strong> LLMs can interpret idiosyncratic financial jargon (e.g., distinguishing a software &ldquo;default&rdquo; from a catastrophic debt &ldquo;default&rdquo;).</li>
            <li><strong>High Efficacy:</strong> Modern LLMs have demonstrated the ability to predict stock market returns from financial news with accuracy exceeding 74%.</li>
            <li><strong>Deep Extraction:</strong> LLMs uncover hidden supply chain dependencies and subtle regulatory shifts buried in dense corporate filings.</li>
          </ul>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-xl my-6">
            <p className="font-bold text-purple-900 mb-2">Background Guidance &amp; The Mixture of Distributions Hypothesis (MDH)</p>
            <p className="text-sm text-purple-800 leading-relaxed">
              Alternative textual data is frequently utilized as crucial &ldquo;background guidance&rdquo;. The MDH
              (Clark, 1973) posits that market volatility is directly proportional to the rate of new
              information arrival. When a specialized LLM detects a sudden surge in negative macroeconomic
              news, the system does not merely generate a blind &ldquo;sell&rdquo; signal. Instead, it establishes a
              high-volatility background regime, intelligently shifting its operational posture (e.g.,
              pivoting from mean-reversion to volatility-arbitrage).
            </p>
          </div>
        </Section>

        {/* Section 4 */}
        <Section
          icon={ShieldAlert}
          title="4. Advanced Risk Management and Algorithmic Circuit Breakers"
          gradient="from-rose-500 to-red-500"
        >
          <p>
            The adversarial nature of financial markets requires rigorous, multi-layered risk management.
            An algorithmic model without robust fail-safes is a systemic hazard.
          </p>

          <ul className="space-y-3 my-6 list-disc pl-6 text-slate-700 marker:text-rose-500">
            <li><strong>Cascading Failures:</strong> When ML models encounter out-of-distribution events, they can generate erratic trades that devastate portfolios in seconds.</li>
            <li><strong>Inadequate Public Safety Nets:</strong> Exchange-level market-wide circuit breakers are mixed in effectiveness and insufficient for internal portfolio protection.</li>
            <li><strong>The OMS Requirement:</strong> Quantitative funds must embed internal, proactive &ldquo;risk gates&rdquo; directly within their Order Management Systems (OMS).</li>
          </ul>

          <SubHeading>Complex Algorithmic Circuit Breakers</SubHeading>

          <ol className="list-decimal pl-6 space-y-5 my-6 text-slate-700 marker:text-rose-600">
            <li>
              <strong>Drawdown Limits:</strong> Absolute or relative thresholds that immediately pause trading
              operations if a predefined percentage of the portfolio&apos;s capital is lost, preventing a
              localized statistical anomaly from escalating into catastrophic account devastation.
            </li>
            <li>
              <strong>Consecutive Failure Halts:</strong> A circuit breaker pattern wherein an algorithmic
              system halts execution for a designated cooldown period after a set number of consecutive
              unprofitable trades or failed API routing requests.
            </li>
            <li>
              <strong>Sentiment-Triggered LLM Halts:</strong> Utilizing LLMs for real-time narrative risk
              monitoring. By analyzing streaming global financial news, an LLM can detect sudden negative
              sentiment shifts — such as war or debt default — preemptively triggering halts before
              turbulence hits the order book&apos;s price action.
            </li>
          </ol>

          <div className="bg-rose-50 p-5 rounded-xl border border-rose-100">
            <h4 className="font-bold text-rose-900 mb-3">LLM Governance &amp; Hallucination Mitigation</h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 marker:text-rose-400 space-y-2">
              <li>Deploying Retrieval-Augmented Generation (RAG) to ground models in verified facts.</li>
              <li>Utilizing domain-constrained prompting to enforce strict compliance standards.</li>
              <li>Preventing LLMs from executing trades based on false or &ldquo;hallucinated&rdquo; news generation.</li>
            </ul>
          </div>
        </Section>

        {/* Section 5 */}
        <Section
          icon={BrainCircuit}
          title="5. Vertical Domain Models vs. Artificial General Intelligence"
          gradient="from-amber-500 to-orange-500"
        >
          <p>
            The unique demands of the financial sector expose the limitations of Artificial General
            Intelligence (AGI). Specialized &ldquo;Vertical AI&rdquo; prioritizes deep domain expertise and
            regulatory alignment over broad, horizontal flexibility.
          </p>

          <SubHeading>The BloombergGPT Paradigm</SubHeading>

          <ul className="space-y-3 my-6 list-disc pl-6 text-slate-700 marker:text-amber-500">
            <li><strong>The Baseline:</strong> A 50-billion parameter generative LLM engineered explicitly for finance.</li>
            <li><strong>The &ldquo;FinPile&rdquo; Dataset:</strong> Trained on an unprecedented 363-billion domain-specific tokens (news, SEC filings, Terminal data).</li>
            <li><strong>The Blend:</strong> Combined with 345-billion general tokens to maintain basic linguistic reasoning while dominating financial benchmarks.</li>
          </ul>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm my-6">
            <table className="min-w-full text-left bg-white text-sm">
              <thead className="bg-amber-50 text-amber-900 border-b border-amber-100">
                <tr>
                  {['Model Classification', 'Representative Models', 'Training Data Composition', 'Inherent Weaknesses in Finance'].map((h) => (
                    <th key={h} className="p-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Horizontal / Generalist</td>
                  <td className="p-4">GPT-4, LLaMA 3, Gemma 2</td>
                  <td className="p-4">Broad web scrape, generalized multi-domain text.</td>
                  <td className="p-4">High risk of hallucinations, lacks precision in complex numerical reasoning, misunderstands niche financial jargon.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Vertical / Domain-Specific</td>
                  <td className="p-4">BloombergGPT, FinGPT, InvestLM</td>
                  <td className="p-4">Heavily weighted toward domain-specific texts (10-Ks, financial news) curated by experts.</td>
                  <td className="p-4">Narrow application scope outside of finance, high initial cost of proprietary data curation and training.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SubHeading>The Democratization of Financial AI</SubHeading>

          <ul className="space-y-3 list-disc pl-6 text-slate-700 marker:text-amber-500">
            <li><strong>Open-Source Catchup:</strong> Initiatives like FinGPT are matching institutional models using open architectures.</li>
            <li><strong>Parameter-Efficient Fine-Tuning (PEFT):</strong> Techniques like LoRA allow researchers to adapt massive models (LLaMA, Gemma) on consumer hardware.</li>
            <li><strong>Edge Computing:</strong> Google&apos;s Gemma 3 (270M parameters) proves that small, highly-specialized models can run locally for sentiment and compliance without API latency.</li>
          </ul>
        </Section>

        {/* Section 6 */}
        <Section
          icon={Settings}
          title="6. Post-Training Alignment: Refining AI for Algorithmic Strategy"
          gradient="from-indigo-500 to-blue-500"
        >
          <p>
            Pre-training an LLM provides raw knowledge, but the model must undergo rigorous post-training
            alignment to follow instructions, align with human risk preferences, and generate
            mathematically suitable outputs for algorithmic trading. The explicit input of domain experts
            is most consequential here.
          </p>

          <div className="space-y-5 my-8">
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
              <div key={i}>
                <h4 className="font-bold text-indigo-900 flex items-center gap-2 mb-1">
                  <ArrowRight size={16} className="text-indigo-500" />
                  {item.title}
                </h4>
                <p className="text-sm text-slate-700 pl-6 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>The FinDPO Framework &amp; Mathematical Translation</SubHeading>

          <p>
            A fundamental mechanical challenge is translating discrete text tokens (&ldquo;Positive&rdquo;) into
            continuous numerical probability scores required for precise asset weightings. The FinDPO
            framework addresses this through a novel &ldquo;logit-to-score&rdquo; conversion mechanism, extracting
            the raw logits and applying a softmax transformation:
          </p>

          <MathBlock>
            <span className="text-indigo-400">P(class&#8203;_i)</span>
            {' = '}
            <span className="text-emerald-400">e<sup>logit&#8203;_i</sup></span>
            {' / '}
            <span className="text-amber-400">&Sigma; e<sup>logit&#8203;_j</sup></span>
          </MathBlock>

          <SubHeading>Walk-Forward Backtesting Outcomes</SubHeading>

          <ul className="space-y-4 list-disc pl-6 text-slate-700 marker:text-indigo-500">
            <li>
              <strong>The SFT Failure:</strong> Standard Supervised Fine-Tuned models collapsed under
              realistic conditions (including 5 bps transaction costs), generating negative returns due to
              poor probability scaling.
            </li>
            <li>
              <strong>The FinDPO Success:</strong> The strictly aligned FinDPO strategy maintained a
              market-beating{' '}
              <strong className="text-indigo-700">67% annual return</strong> with a robust{' '}
              <strong className="text-indigo-700">Sharpe ratio of 2.0</strong>.
            </li>
            <li>
              <strong>The Takeaway:</strong> AI must be mathematically bridged and deeply aligned with
              human risk preferences to generate sustainable alpha.
            </li>
          </ul>
        </Section>

        {/* Section 7 – Conclusion */}
        <Section
          icon={Target}
          title="7. The Convergence of Expertise and Engineering"
          gradient="from-teal-500 to-emerald-500"
        >
          <p className="text-lg text-slate-800 font-medium">
            The future of quantitative finance relies entirely on the synthesis of algorithmic scale and
            human intuition.
          </p>

          <ul className="space-y-5 my-8 list-disc pl-6 text-slate-700 marker:text-teal-500 text-lg">
            <li>
              <strong>The Limits of Discretion:</strong> Pure human discretionary trading cannot match the
              speed, scale, or high-frequency opportunities of modern algorithms.
            </li>
            <li>
              <strong>The Limits of Engineering:</strong> Isolated computer science and naive machine
              learning inevitably chase statistical noise, shattering upon contact with real-world
              macroeconomic shocks.
            </li>
            <li>
              <strong>The Symbiotic Future:</strong> Technology provides the vehicle (processing data in
              microseconds), but the domain expert — understanding behavioral risk and economic
              cause-and-effect — must dictate the roadmap.
            </li>
          </ul>

          <div className="border-t-2 border-teal-100 pt-8 mt-6">
            <h3 className="font-bold text-xl text-teal-900 mb-4">Conclusion</h3>
            <blockquote className="text-slate-700 leading-relaxed italic border-l-4 border-teal-400 pl-5 bg-teal-50/50 py-4 pr-4 rounded-r-xl">
              &ldquo;The relentless pursuit of predictive dominance in global financial markets has definitively
              proven that generalized artificial intelligence and pure algorithmic engineering are
              incomplete, often fragile solutions. Exhaustive empirical evidence demonstrates that deep
              financial domain expertise is the critical catalyst required to transform raw data and raw
              compute into actionable, risk-adjusted returns... Ultimately, while sophisticated algorithmic
              technology provides the speed and scale required to merely participate in modern markets, it
              is profound, deeply cultivated market understanding that provides the sustainable edge
              necessary to win.&rdquo;
            </blockquote>
          </div>
        </Section>

        {/* Google Doc CTA */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Read the Full Research Paper</h3>
          <p className="text-slate-600 mb-6">
            Access the complete deep-dive document with extended analysis, citations, and supplementary
            frameworks.
          </p>
          <a
            href={googleDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ExternalLink size={20} />
            Open Full Research Paper
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-200">
        <p>&copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
      </footer>
    </div>
  );
}
