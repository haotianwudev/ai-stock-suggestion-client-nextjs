'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Maximize2, Music } from 'lucide-react';
import { 
  BrainCircuit, Layers, Database, ShieldAlert, ShieldCheck, 
  Workflow, LineChart, FileText, Network, Server, HardDrive, 
  Bot, Clock, Key, GitMerge, FileSearch, Eye, TrendingUp
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const Section = ({ id, title, icon: Icon, colorClass, children, bgClass = 'bg-white' }: {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  colorClass: string;
  children: React.ReactNode;
  bgClass?: string;
}) => (
  <section id={id} className={`py-16 md:py-24 ${bgClass}`}>
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10`}>
          <Icon size={32} strokeWidth={2} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-[1.1] tracking-tight">
          {title}
        </h2>
      </div>
      <div className="text-lg text-slate-600 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  </section>
);

const Card = ({ title, children, className = '' }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${className}`}>
    <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
    <div className="text-slate-600 space-y-3">
      {children}
    </div>
  </div>
);

const Callout = ({ type = 'info', title, children }: {
  type?: 'warning' | 'danger' | 'success' | 'info';
  title: string;
  children: React.ReactNode;
}) => {
  const styles = {
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    danger: 'bg-rose-50 border-rose-200 text-rose-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const currentStyle = styles[type] || styles.info;

  return (
    <div className={`rounded-xl border p-5 ${currentStyle} my-6`}>
      <h4 className="font-bold mb-2 flex items-center gap-2">
        {type === 'danger' && <ShieldAlert size={20} />}
        {type === 'success' && <ShieldCheck size={20} />}
        {title}
      </h4>
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
};

export default function QuantAgentTutorial() {
  const currentArticle = articles.find(article => article.slug === 'architecting-autonomous-quantitative-agents-langchain-ecosystem');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
        
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Header */}
        <header className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-indigo-100">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Deep Research Badge */}
          <div className="absolute top-8 left-8 z-20">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
              Deep Research
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-8 shadow-sm border border-indigo-200">
              <Bot size={16} /> Autonomous Agents
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Quantitative Agents</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A comprehensive guide to the modern LangChain ecosystem. Build stateful, reliable, and secure multi-agent systems for financial modeling—without writing endless code.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/2jjdEFS.jpeg" 
              alt="LangChain Ecosystem Architecture Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            {/* Full-screen button overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsImageViewerOpen(true);
              }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              title="View full screen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            {/* Click hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/2jjdEFS.jpeg"
          alt="LangChain Ecosystem Architecture Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-16">
          
          {/* The LangChain Ecosystem */}
          <Section 
            id="ecosystem" 
            title="The LangChain Ecosystem" 
            icon={Layers} 
            colorClass="bg-blue-600"
            bgClass="bg-white"
          >
            <p>
              The intersection of large language models and quantitative finance has catalyzed a paradigm shift, transitioning the industry from static algorithmic execution to dynamic, autonomous, multi-agent systems. The modern ecosystem completely decouples the framework, runtime, and harness.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <Card title="LangChain" className="border-t-4 border-t-blue-500">
                <p className="text-sm"><strong>Classification:</strong> Framework</p>
                <p className="text-sm">The overarching framework providing high-level abstractions, standardizing tool APIs, and avoiding vendor lock-in. Uses the <code className="bg-slate-100 px-1 py-0.5 rounded">create_agent</code> factory.</p>
              </Card>
              <Card title="LangGraph" className="border-t-4 border-t-emerald-500">
                <p className="text-sm"><strong>Classification:</strong> Runtime</p>
                <p className="text-sm">A low-level orchestration runtime for stateful, cyclic workflows. Models operations as nodes and edges for complex routing and failure recovery.</p>
              </Card>
              <Card title="Deep Agents" className="border-t-4 border-t-purple-500">
                <p className="text-sm"><strong>Classification:</strong> Harness</p>
                <p className="text-sm">An opinionated harness built atop LangGraph. Provides a virtual filesystem, autonomous planning, and subagent delegation for long-horizon tasks.</p>
              </Card>
              <Card title="LangSmith" className="border-t-4 border-t-amber-500">
                <p className="text-sm"><strong>Classification:</strong> Observability</p>
                <p className="text-sm">Captures traces, logs, and metrics. Critical for auditing non-deterministic agent decisions and evaluating regulatory compliance.</p>
              </Card>
            </div>
          </Section>

          {/* Democratizing Quant Workflows */}
          <Section 
            id="nocode" 
            title="Democratizing Quant Workflows" 
            icon={Workflow} 
            colorClass="bg-purple-600"
            bgClass="bg-slate-50"
          >
            <p>
              Domain-expert analysts, portfolio managers, and risk officers require the analytical power of large language models without writing complex Python scripts. Visual platforms abstract away infrastructure while retaining complex orchestration.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
                <Network className="text-purple-500 mb-4" size={28} />
                <h4 className="font-bold text-lg mb-2">LangFlow</h4>
                <p className="text-sm text-slate-600">A direct visual interface for building LangChain applications. Completely open-source, allowing self-hosting to protect proprietary trading logic and sensitive client data from traversing external networks.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
                <Layers className="text-indigo-500 mb-4" size={28} />
                <h4 className="font-bold text-lg mb-2">Flowise</h4>
                <p className="text-sm text-slate-600">A fully managed, no-code environment with pre-built templates for standard patterns like RAG and basic multi-agent workflows. Ideal for rapid prototyping and internal tool deployment.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
                <GitMerge className="text-pink-500 mb-4" size={28} />
                <h4 className="font-bold text-lg mb-2">n8n & Make</h4>
                <p className="text-sm text-slate-600">Enterprise automation platforms integrating AI directly into standard operational workflows. "LangChain Agent" nodes bridge the gap between LLM reasoning and non-technical operators.</p>
              </div>
            </div>
          </Section>

          {/* Interrogating Tabular Data */}
          <Section 
            id="tabular" 
            title="Interrogating Tabular Data" 
            icon={Database} 
            colorClass="bg-emerald-600"
            bgClass="bg-white"
          >
            <p>
              Quantitative finance relies heavily on pandas DataFrames for historical price action, order books, and corporate metrics. Bridging semantic intent with data manipulation requires strict security guardrails.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="flex flex-col">
                <Callout type="danger" title="The Python REPL Paradigm (High Risk)">
                  Using <code className="bg-rose-100 px-1 py-0.5 rounded">create_pandas_dataframe_agent</code> traditionally forces the LLM to generate and execute arbitrary Python code. This introduces profound security vulnerabilities, requiring the highly dangerous <code className="bg-rose-100 px-1 py-0.5 rounded">allow_dangerous_code=True</code> parameter.
                  <br /><br />
                  <strong>Mitigation:</strong> If required, code evaluation must be sandboxed inside ephemeral Docker containers using a subclassed <code className="bg-rose-100 px-1 py-0.5 rounded">PythonAstREPLTool</code> to prevent host infrastructure compromise.
                </Callout>
              </div>
              
              <div className="flex flex-col">
                <Callout type="success" title="SQL-Based Interrogation via DuckDB (Secure)">
                  For zero arbitrary code execution, integrating analytical engines like DuckDB allows agents to query pandas DataFrames locally using pure SQL syntax.
                  <br /><br />
                  The agent uses <code className="bg-emerald-100 px-1 py-0.5 rounded">SQLDatabaseToolkit</code> to inspect schemas and run <code className="bg-emerald-100 px-1 py-0.5 rounded">SELECT</code> statements. An LLM-assisted <code className="bg-emerald-100 px-1 py-0.5 rounded">sql_db_query_checker</code> validates syntax before execution, eliminating system-level vulnerabilities.
                </Callout>
              </div>
            </div>
          </Section>

          {/* Unstructured Alpha: Advanced RAG */}
          <Section 
            id="rag" 
            title="Unstructured Alpha: Advanced RAG" 
            icon={FileSearch} 
            colorClass="bg-amber-500"
            bgClass="bg-amber-50/30"
          >
            <p>
              A vast repository of untapped alpha resides in SEC filings (10-Ks, 10-Qs). Standard Retrieval-Augmented Generation (RAG) fails due to the complex nature of financial tables embedded within narrative text.
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden mt-8">
              <div className="p-6 bg-amber-500 text-white flex items-center gap-3">
                <FileText size={24} />
                <h3 className="font-bold text-xl">The "Unified Embedding" Strategy</h3>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-amber-600 mb-2">1. Isolation & Conversion</h4>
                    <p className="text-sm">Instead of naive recursive character splitting, libraries like <code className="bg-slate-200 px-1 py-0.5 rounded">Unstructured.io</code> detect and isolate financial tables, converting them entirely into Markdown format to preserve spatial relationships.</p>
                  </div>
                  <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-amber-600 mb-2">2. LLM Summarization</h4>
                    <p className="text-sm">A secondary LLM pre-processes the table, generating a natural-language summary based on surrounding context (e.g., "Meta Platforms' revenue for Q2 2024").</p>
                  </div>
                  <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-amber-600 mb-2">3. Hybrid Retrieval</h4>
                    <p className="text-sm">The vector DB stores the Markdown table + the semantic summary. Retrieval utilizes Hybrid Search (Dense Vectors + BM25 Keywords) fused via <strong>Reciprocal Rank Fusion (RRF)</strong> for extreme precision.</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Multi-Agent Orchestration */}
          <Section 
            id="orchestration" 
            title="Multi-Agent Orchestration" 
            icon={Network} 
            colorClass="bg-indigo-600"
            bgClass="bg-white"
          >
            <p>
              Monolithic agents struggle with expansive toolkits. The <strong>Supervisor Pattern</strong> (via <code className="bg-slate-100 px-1 py-0.5 rounded">langgraph-supervisor</code>) divides cognitive labor among highly specialized, strictly scoped worker agents overseen by a central routing intelligence.
            </p>

            <div className="mt-10 grid md:grid-cols-4 gap-4">
              {[
                { name: 'Indicator Agent', desc: 'Processes raw OHLC data to compute RSI, MACD, Stochastic Oscillators.', icon: LineChart },
                { name: 'Pattern Agent', desc: 'Generates K-line charts and identifies morphological highs, lows, and chart patterns.', icon: Eye },
                { name: 'Trend Agent', desc: 'Renders annotated charts with trend channels and consolidation zones.', icon: TrendingUp },
                { name: 'Decision Agent', desc: 'Synthesizes specialists outputs to formulate a LONG/SHORT directive with stop-loss.', icon: BrainCircuit }
              ].map((agent, i) => (
                 <div key={i} className="bg-slate-50 border border-indigo-100 rounded-xl p-5 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                   <agent.icon className="text-indigo-600 mb-3 relative z-10" size={24} />
                   <h4 className="font-bold text-slate-800 mb-2 relative z-10">{agent.name}</h4>
                   <p className="text-sm text-slate-600 relative z-10">{agent.desc}</p>
                 </div>
              ))}
            </div>

            <Callout type="info" title="Handoff Mechanics & Enterprise Guardrails">
              The supervisor uses <code className="bg-blue-100 px-1 py-0.5 rounded">create_handoff_tool</code> to transfer control securely. Setting <code className="bg-blue-100 px-1 py-0.5 rounded">output_mode="last_message"</code> prevents context bloat. Crucially, before executing high-risk trades, LangGraph routes payloads through deterministic policy validation nodes, transferring state to a human escalation node if risk limits are exceeded.
            </Callout>
          </Section>

          {/* Autonomous Workflows & Memory */}
          <Section 
            id="deepagents" 
            title="Autonomous Workflows & Memory" 
            icon={Bot} 
            colorClass="bg-pink-600"
            bgClass="bg-pink-50/30"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <HardDrive className="text-pink-500" /> The Deep Agents Harness
                </h3>
                <p className="mb-6">
                  For open-ended macroeconomic research, Deep Agents pushes beyond strict graph routing via intrinsic planning and dynamic context compression.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1"><FileSearch size={18} className="text-pink-600"/></div>
                    <div>
                      <strong>Autonomous Planning:</strong> Uses <code className="bg-pink-100 px-1 py-0.5 rounded">write_todos</code> to decompose complex objectives into sequential subtasks, preventing hallucination over multi-hour runs.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1"><Server size={18} className="text-pink-600"/></div>
                    <div>
                      <strong>Virtual Filesystem:</strong> Intercepts massive payloads (100-page PDFs, SQL dumps) and offloads them to a virtual disk, providing the LLM a 10-line preview. Agents use <code className="bg-pink-100 px-1 py-0.5 rounded">read_file</code> or <code className="bg-pink-100 px-1 py-0.5 rounded">grep</code> for retrieval on demand.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1"><GitMerge size={18} className="text-pink-600"/></div>
                    <div>
                      <strong>Ephemeral Subagents:</strong> <code className="bg-pink-100 px-1 py-0.5 rounded">SubAgentMiddleware</code> dynamically spawns child agents with isolated context windows to run parallel tasks, keeping the primary agent's memory pristine.
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                 <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="text-blue-500" /> Stateful Memory Management
                </h3>
                <p className="mb-6">
                  Financial modeling requires perfect recall. Memory is tied to a <code className="bg-slate-100 px-1 py-0.5 rounded">thread_id</code> and managed via rigorous graph state persistence.
                </p>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                   <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Mechanism</th>
                          <th className="px-4 py-3 font-semibold">Implementation</th>
                          <th className="px-4 py-3 font-semibold">Function</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-3 font-medium">Session Persistence</td>
                          <td className="px-4 py-3 text-slate-500"><code className="bg-slate-100 px-1 py-0.5 rounded">PostgresSaver</code> / SQLite</td>
                          <td className="px-4 py-3 text-slate-500">Serializes entire graph state to DB after every node, allowing session resumption.</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Context Compression</td>
                          <td className="px-4 py-3 text-slate-500"><code className="bg-slate-100 px-1 py-0.5 rounded">SummarizationMiddleware</code></td>
                          <td className="px-4 py-3 text-slate-500">Condenses older history when token thresholds are breached to protect the window.</td>
                        </tr>
                      </tbody>
                   </table>
                </div>
              </div>
            </div>
          </Section>

          {/* Secure Connectivity (MCP) */}
          <Section 
            id="mcp" 
            title="Secure Connectivity (MCP)" 
            icon={Key} 
            colorClass="bg-teal-600"
            bgClass="bg-white"
          >
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl mb-8">
                The <strong>Model Context Protocol (MCP)</strong> standardizes how applications provide executable tools and contextual data to LLMs, decoupling logic from infrastructure.
              </p>
              
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-8 rounded-3xl border border-teal-100 shadow-inner">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                   <div className="text-center">
                      <div className="bg-white p-4 rounded-full shadow border border-slate-200 inline-block mb-3">
                        <Bot size={32} className="text-teal-600" />
                      </div>
                      <h4 className="font-bold">LangChain Agent</h4>
                      <p className="text-xs text-slate-500 mt-1">Discovers tools at runtime via<br/><code className="bg-slate-100 px-1 py-0.5 rounded">MultiServerMCPClient</code></p>
                   </div>
                   
                   <div className="flex flex-col items-center text-teal-400">
                     <span className="text-xs font-bold uppercase tracking-widest mb-1">Standardized Stdio / SSE</span>
                     <div className="h-1 w-24 md:w-32 bg-teal-200 rounded animate-pulse"></div>
                   </div>

                   <div className="text-center">
                      <div className="bg-white p-4 rounded-full shadow border border-slate-200 inline-block mb-3">
                        <ShieldCheck size={32} className="text-blue-600" />
                      </div>
                      <h4 className="font-bold">MCP Server Gateway</h4>
                      <p className="text-xs text-slate-500 mt-1">Handles auth, pooling, and logs.<br/>Connects to SQL, CRM, API.</p>
                   </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Continue Learning Section with Google Doc */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl my-16 text-center border border-indigo-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
              {currentArticle?.podcastUrl && (
                <a 
                  href={currentArticle.podcastUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <Music className="inline mr-2" />
                  Listen to Podcast
                </a>
              )}
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <BrainCircuit size={40} className="mx-auto mb-6 text-indigo-500 opacity-50" />
            <p className="text-lg text-slate-300 mb-4">
              These systems represent the vanguard of financial technology. They are no longer mere experimental scripts; they are durable, autonomous quantitative analysts.
            </p>
            <p className="text-sm opacity-75">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
