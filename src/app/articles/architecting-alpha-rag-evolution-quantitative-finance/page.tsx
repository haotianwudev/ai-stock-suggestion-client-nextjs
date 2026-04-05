'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertTriangle, Network, Workflow, Database, TrendingUp, BarChart3, Binary, ShieldCheck, Zap, BrainCircuit, Layers, Cpu, CheckCircle2, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const ARTICLE_SLUG = 'architecting-alpha-rag-evolution-quantitative-finance';
const INFOGRAPHIC_URL = 'https://i.imgur.com/lE7Zs7q.jpeg';
const GOOGLE_DOC_URL = 'https://docs.google.com/document/d/e/2PACX-1vTMoewDaZMbmE0mQCsj3kvX4aWKQUUdC6RiqidkcNwC9Purx3FIhKzuPC8yWTQE__njyUPqOy8cxJ4x/pub';

const GradientText = ({ children, gradient }: { children: React.ReactNode; gradient: string }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>{children}</span>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, gradient, title }: { icon: React.ElementType; gradient: string; title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
      <Icon size={28} />
    </div>
    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

export default function ArchitectingAlphaRAG() {
  const currentArticle = articles.find(a => a.slug === ARTICLE_SLUG);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug!} />
        </>
      )}

      <div className="min-h-screen bg-[#FAFAFC] font-sans text-slate-700">
        {/* Deep Research Badge */}
        <div className="fixed top-4 left-4 z-50">
          <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            Deep Research
          </div>
        </div>

        {/* Return to Home */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero */}
        <header className="relative pt-16 pb-16 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 opacity-40">
            <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] rounded-full bg-gradient-to-br from-purple-200 to-fuchsia-100 blur-3xl mix-blend-multiply" />
            <div className="absolute top-[10%] -right-[10%] w-[50%] h-[80%] rounded-full bg-gradient-to-br from-blue-200 to-cyan-100 blur-3xl mix-blend-multiply" />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Architecting Alpha:<br />
              <GradientText gradient="from-purple-600 via-fuchsia-500 to-pink-500">The Evolution of RAG</GradientText>
              <br />in Quant Finance
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
              A deep dive into why Retrieval-Augmented Generation changed capital markets, where it catastrophically fails, and the autonomous Agentic future of the enterprise knowledge bank.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img
              src={INFOGRAPHIC_URL}
              alt="RAG Evolution in Quantitative Finance Infographic"
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
          src={INFOGRAPHIC_URL}
          alt="RAG Evolution in Quantitative Finance Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 pb-16 space-y-16">

          {/* Section 1: Why RAG is Imperative */}
          <section>
            <SectionHeader icon={BookOpen} gradient="from-emerald-400 to-teal-500" title="1. Why RAG is Imperative in Finance" />
            <Card className="mb-6">
              <p className="text-lg leading-relaxed mb-6">
                When Generative AI emerged, it was revolutionary but flawed for professional use. Large Language Models (LLMs) suffer from <strong>knowledge cutoffs</strong> (frozen parametric memory) and <strong>hallucinations</strong> (fabricating data). In quantitative finance — where market edges are micro-seconds and legal risk is massive — these flaws are unacceptable. RAG solves this by decoupling reasoning from the knowledge repository.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                  <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Grounding &amp; Transparency</h3>
                  <p className="text-slate-600">Instead of guessing, the LLM is forced to answer strictly based on retrieved external evidence (e.g., SEC 10-Q filings). This drastically reduces hallucination and provides clear, auditable citations for compliance teams.</p>
                </div>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <Zap className="w-8 h-8 text-teal-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Accelerating the Research Lifecycle</h3>
                  <p className="text-slate-600">Quants can query unstructured corpora (earnings calls, alternative data) in natural language. By vectorizing daily market reports, RAG democratizes data processing without the need to retrain massive models daily.</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Section 2: Structural Failures */}
          <section>
            <SectionHeader icon={AlertTriangle} gradient="from-red-400 to-rose-500" title="2. Where RAG Fails: Structural Boundaries" />
            <Card>
              <p className="text-lg leading-relaxed mb-8">
                Despite its success, up to <strong>73% of early naive RAG systems fail in production</strong>. Standard dense vector search (k-nearest neighbors) is fundamentally mismatched with the structural complexities of financial data.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: BarChart3,
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-500',
                    title: 'The Breakdown of Multimodal & Tabular Reasoning',
                    body: 'Naive text chunking destroys tables. A chunk might grab "15,000 | 12,500" but lose the column headers ("Q1 2024") and row stubs ("Amortization"). In FinDoc-RAG benchmarks, accuracy plummets from 0.91 (text) to 0.44 (tabular reasoning).',
                    fix: 'Solution: Table-aware structural chunking & FinBERT.',
                    fixColor: 'text-rose-600 bg-rose-50',
                  },
                  {
                    icon: TrendingUp,
                    iconBg: 'bg-orange-100',
                    iconColor: 'text-orange-500',
                    title: 'The Time-Series Disconnect',
                    body: 'Standard RAG uses semantic textual similarity. It cannot assess the predictive relevance of continuous numerical sequences (stock prices, volatility). Using text retrievers on time-series data actually degrades forecasting performance.',
                    fix: 'Solution: TS-RAG & specialized numerical retrievers (FinSeer).',
                    fixColor: 'text-orange-600 bg-orange-50',
                  },
                  {
                    icon: Binary,
                    iconBg: 'bg-amber-100',
                    iconColor: 'text-amber-600',
                    title: 'Code-Interpreter & Symbolic Reasoning',
                    body: 'LLMs are terrible calculators. Asking an LLM to calculate a percentage change from a retrieved table leads to errors. Arithmetic tasks are computational, not semantic.',
                    fix: 'Solution: Structured Execution / Code-Interpreter RAG (e.g., PromptQL).',
                    fixColor: 'text-amber-700 bg-amber-50',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="shrink-0">
                      <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-slate-600 mb-3">{item.body}</p>
                      <div className={`inline-flex items-center gap-2 text-sm font-semibold ${item.fixColor} px-3 py-1 rounded-full`}>
                        <CheckCircle2 className="w-4 h-4" /> {item.fix}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Section 3: Global Context Deficit */}
          <section>
            <SectionHeader icon={Network} gradient="from-blue-500 to-indigo-500" title="3. Resolving the Global Context Deficit" />
            <Card className="mb-6">
              <p className="text-lg leading-relaxed mb-6">
                Standard RAG fails at the "Full Picture." Because it relies on localized nearest-neighbor search, it misses overarching themes. If asked about "macroeconomic risks across all semiconductor earnings," standard RAG retrieves a scattered subset of chunks, missing the global context.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: 'GraphRAG',
                    desc: 'Replaces flat vectors with Knowledge Graphs. Uses an LLM to build entity relationships and hierarchical community summaries. Executes Map-Reduce for a 3.4x accuracy gain on holistic queries.',
                    color: 'bg-blue-50 text-blue-800 border-blue-200',
                  },
                  {
                    title: 'LazyGraphRAG',
                    desc: 'Fixes the extreme cost of GraphRAG. Skips LLMs during indexing (uses cheap NLP). Defers LLM usage until query time using iterative deepening search, cutting costs by 700x.',
                    color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                  },
                  {
                    title: 'RAPTOR',
                    desc: 'Relies on semantic clustering (UMAP/GMM) instead of explicit graphs. Recursively summarizes chunks into trees, then flattens them to retrieve both high-level themes and granular facts simultaneously.',
                    color: 'bg-violet-50 text-violet-800 border-violet-200',
                  },
                  {
                    title: 'Hybrid Long-Context',
                    desc: 'Routes basic queries to cheap Vector RAG, but routes complex global queries to massive Long-Context LLMs (bypassing retrieval) to read uncompressed document corpora.',
                    color: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
                  },
                ].map((item, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${item.color}`}>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm opacity-90">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Section 4: Agentic Evolution */}
          <section>
            <SectionHeader icon={Workflow} gradient="from-amber-400 to-orange-500" title="4. The Agentic Leap" />
            <div className="grid md:grid-cols-5 gap-8">
              <Card className="md:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border-orange-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">The 4 Paradigms</h3>
                <ul className="space-y-4">
                  {[
                    { n: '1', title: 'Naive RAG', desc: 'Basic chunking and top-k retrieval. High hallucination.', active: false },
                    { n: '2', title: 'Advanced RAG', desc: 'Query expansion and cross-encoder reranking added.', active: false },
                    { n: '3', title: 'Modular RAG', desc: 'Dynamic routing to specific tools (vectors vs code).', active: false },
                    { n: '4', title: 'Agentic RAG', desc: 'LLM becomes an autonomous orchestrator with a state machine, memory, and reflection.', active: true },
                  ].map((item) => (
                    <li key={item.n} className="flex items-start gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm shrink-0 ${item.active ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-orange-500'}`}>{item.n}</span>
                      <div>
                        <strong className="block text-slate-800">{item.title}</strong>
                        <span className="text-sm text-slate-600">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="md:col-span-3">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Multi-Agent Topologies</h3>
                <p className="text-slate-600 mb-6">A single agent acting as a data engineer, equities analyst, and risk officer leads to cognitive overload. Modern quantitative architecture mimics hedge funds using frameworks like LangGraph or AutoGen.</p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-purple-500" />
                    Example: TradingAgents Framework
                  </h4>
                  <div className="space-y-3">
                    {[
                      { icon: BookOpen, color: 'text-blue-500', label: 'Fundamentals Analyst:', desc: 'Assesses SEC filings via standard RAG.' },
                      { icon: TrendingUp, color: 'text-green-500', label: 'Sentiment Expert:', desc: 'Monitors news APIs for real-time volatility vectors.' },
                      { icon: BarChart3, color: 'text-orange-500', label: 'Technical Analyst:', desc: 'Uses TS-RAG and code-interpreters for momentum shifts.' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <p className="text-sm text-slate-700"><strong>{item.label}</strong> {item.desc}</p>
                      </div>
                    ))}
                    <div className="p-3 bg-slate-800 text-white rounded-xl border border-slate-700 shadow-sm flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <p className="text-sm"><strong>Risk Orchestrator:</strong> Central node managing "Shared Scratchpad" state and resolving conflicts.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 5: The Future */}
          <section>
            <SectionHeader icon={Database} gradient="from-fuchsia-500 to-pink-500" title="5. The Knowledge Bank of 2026+" />
            <Card>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">The Convergence (The Galaxy Approach)</h3>
                  <p className="text-slate-600 mb-6">Standalone vector databases are ending. By 2026, enterprise architecture requires abandoning siloed data for a unified triad integrated via Data Mesh paradigms:</p>
                  <div className="space-y-4">
                    {[
                      {
                        iconBg: 'bg-pink-100',
                        iconColor: 'text-pink-600',
                        Icon: Layers,
                        title: '1. Semantic Layer',
                        desc: 'Abstracts schema across multi-cloud sources. Ensures a consistent definition of metrics (e.g., "EBITDA") to eliminate metric drift.',
                      },
                      {
                        iconBg: 'bg-purple-100',
                        iconColor: 'text-purple-600',
                        Icon: Network,
                        title: '2. Knowledge Graph (Ontology)',
                        desc: 'The semantic brain. Explicitly maps business entities and relationships required for complex agentic reasoning without hallucination.',
                      },
                      {
                        iconBg: 'bg-blue-100',
                        iconColor: 'text-blue-600',
                        Icon: Database,
                        title: '3. Vector Database',
                        desc: 'Handles unstructured semantic similarity, evolving natively to support multimodal indexing (audio, images, text).',
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className={`mt-1 p-2 ${item.iconBg} rounded-lg ${item.iconColor}`}>
                          <item.Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{item.title}</h4>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                    <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
                    <h4 className="text-xl font-bold mb-2">Edge AI &amp; Infrastructure</h4>
                    <p className="text-sm text-slate-300">Latency requirements are driving computation from the cloud to trading floors. Sovereign AI stacks and microfluidic liquid cooling for silicon are becoming mandatory.</p>
                  </div>
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-6">
                    <ShieldCheck className="w-8 h-8 text-rose-500 mb-3" />
                    <h4 className="text-xl font-bold text-slate-800 mb-2">The XAI Imperative</h4>
                    <p className="text-sm text-slate-600">Regulators (EU AI Act) are banning black-box systems. Explainability (SHAP, LIME, Bayesian uncertainty tracking) is no longer a luxury — it must be engineered into the core code.</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Call to Action / Google Doc */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl text-center border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Read the Full Research Paper</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Access the complete deep-dive research document covering all architectural patterns, benchmark data, and implementation frameworks for RAG in quantitative finance.
            </p>
            <a
              href={GOOGLE_DOC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
            >
              Read Full Research Paper
            </a>
          </div>

          {/* Educational Disclaimer */}
          <div className="p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
            <p className="text-sm text-amber-700">
              <strong>Educational Content:</strong> This analysis is for educational and informational purposes only. The techniques and architectures discussed require careful implementation and testing in production environments. Always validate approaches with your specific use case and data.
            </p>
          </div>

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
            <p>© 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
          </footer>
        </main>
      </div>
    </>
  );
}
