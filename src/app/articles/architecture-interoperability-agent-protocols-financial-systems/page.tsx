'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Network, Shield, Layers, GitMerge, Activity, Server, CheckCircle2, AlertTriangle, FileJson, Clock, Database, Lock, Globe, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Reusable Components
const SectionHeading = ({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) => (
  <div className="flex items-center space-x-3 mb-6">
    <div className={`p-3 rounded-2xl bg-${color}-100 text-${color}-600`}>
      <Icon size={28} strokeWidth={2.5} />
    </div>
    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

const Callout = ({ title, children, type = "info" }: { title: string; children: React.ReactNode; type?: 'info' | 'warning' | 'danger' | 'success' }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    danger: "bg-rose-50 border-rose-200 text-rose-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };
  return (
    <div className={`my-6 p-5 border rounded-2xl ${styles[type]}`}>
      <h4 className="font-bold mb-2 flex items-center">
        {type === 'warning' && <AlertTriangle className="mr-2 w-5 h-5" />}
        {type === 'danger' && <AlertTriangle className="mr-2 w-5 h-5" />}
        {type === 'success' && <CheckCircle2 className="mr-2 w-5 h-5" />}
        {title}
      </h4>
      <div className="text-sm md:text-base leading-relaxed space-y-2 opacity-90">{children}</div>
    </div>
  );
};

export default function AgentProtocolsArticle() {
  const currentArticle = articles.find(article => article.slug === 'architecture-interoperability-agent-protocols-financial-systems');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && currentArticle.title && currentArticle.slug && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans text-slate-700 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white border-b border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-300 to-cyan-400 blur-3xl opacity-20"></div>
          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide mb-8 shadow-sm">
              <Network size={16} />
              <span>Financial Multi-Agent Systems</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
              The Architecture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Interoperability</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-light">
              A comprehensive guide to Agent-to-Agent (A2A) protocols, solving fragmentation, and orchestrating autonomous AI in modern finance.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Agent-to-Agent Protocol Architecture Infographic" 
                className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
              />
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
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
                <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                  Click to view full screen
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Full-screen image viewer */}
        {currentArticle?.imageUrl && (
          <FullScreenImageViewer
            src={currentArticle.imageUrl}
            alt="Agent-to-Agent Protocol Architecture Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">

          {/* Section 1: The Problem & Solution */}
          <section>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">1. The Fragmentation Crisis</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                As financial firms transition to autonomous AI agents, extreme fragmentation occurs across federated engineering teams.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-400"></div>
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-red-50 text-red-600">
                  <AlertTriangle size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">The Silo Problem</h3>
                <p className="text-slate-600 mb-4">
                  Risk departments might build workflows on <strong>LangGraph</strong>, while Trading desks use <strong>CrewAI</strong>. Running on proprietary runtimes and separate servers, these agents exist in total isolation.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    Unscalable bespoke "glue code" for every API connection.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    Massive token overhead (150,000+ tokens) to ingest tool schemas.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    Silent handoff failures and untraceable logic execution deadlocks.
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">The A2A Solution</h3>
                <p className="text-slate-600 mb-4">
                  The <strong>Agent-to-Agent (A2A)</strong> protocol acts as a universal translator, managed by the Linux Foundation. It allows distinct architectures to communicate, negotiate, and delegate tasks.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    Highly specialized messaging and coordination tier.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    Bridges frameworks (LangGraph ↔ CrewAI ↔ AutoGen).
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    Eliminates the need for hard-coded endpoint addresses.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Mechanics of A2A */}
          <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Layers className="text-indigo-500" />
                2. How A2A Works: The Mechanics
              </h2>
              <p className="text-lg text-slate-600">
                The protocol relies on several foundational architectural paradigms to enable enterprise-grade collaboration.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <FileJson className="text-blue-500 mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">Capability Advertising (Agent Cards)</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Agents broadcast their existence via machine-readable JSON "Agent Cards" hosted at URIs. These act as digital resumes containing identities, versions, supported modalities, and trust scores, solving the discoverability problem.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <Clock className="text-purple-500 mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">Stateful Asynchronous Collaboration</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Financial workflows (like AML investigations) take hours. A2A uses JSON-RPC 2.0 over HTTPS with Server-Sent Events (SSE) and webhooks to prevent timeouts and stream real-time status updates across departmental boundaries.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <Lock className="text-teal-500 mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">Opacity & Hexagonal Architecture</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Protocol logic is strictly decoupled from business logic. A2A establishes a secure boundary ("opacity"), allowing an investment bank to delegate to a third party without revealing internal memory states, prompts, or proprietary algorithms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Protocol Choices */}
          <section>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">3. The Broader Stack: What are the choices?</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                A2A is not a monolithic solution. It operates alongside complementary protocols tailored to specific use cases, network latency profiles, and security models.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* MCP Card */}
              <div className="group bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-3xl border border-blue-100 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-blue-900">MCP</h3>
                  <span className="bg-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Model Context Protocol</span>
                </div>
                <p className="text-blue-800 mb-6 font-medium">
                  The standardized connectivity layer bridging AI applications with static data and tools.
                </p>
                <ul className="space-y-3 text-sm text-blue-700/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Rigid client-server hierarchy.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Reduces token overhead by 98.7% (replaces prompt schemas with JSON-RPC services).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Best for: Tool utilization, RAG pipelines, internal SQL database queries.
                  </li>
                </ul>
              </div>

              {/* ACP Card */}
              <div className="group bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-100 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-indigo-900">ACP</h3>
                  <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">Agent Comm. Protocol</span>
                </div>
                <p className="text-indigo-800 mb-6 font-medium">
                  Introduces a sophisticated "Semantic Layer" and high-assurance verifiable intents.
                </p>
                <ul className="space-y-3 text-sm text-indigo-700/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Federated Broker Model with multipart RESTful HTTP.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Uses JSON-LD to map semantic intents (e.g., DELEGATE) to financial ontologies like FIBO.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Best for: Multi-modal enterprise workflows requiring unambiguous communication.
                  </li>
                </ul>
              </div>

              {/* A2A Card */}
              <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-100 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-emerald-900">A2A</h3>
                  <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Agent-to-Agent Protocol</span>
                </div>
                <p className="text-emerald-800 mb-6 font-medium">
                  The interworking protocol for dynamic, peer-to-peer task exchange.
                </p>
                <ul className="space-y-3 text-sm text-emerald-700/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Decentralized network emphasizing autonomous delegation.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Secures identity via Decentralized Identifiers (DIDs) and Agent Cards.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Best for: Multi-agent workflows, expert marketplaces, dynamic task routing.
                  </li>
                </ul>
              </div>

              {/* AGP Card */}
              <div className="group bg-gradient-to-br from-rose-50 to-orange-50 p-8 rounded-3xl border border-rose-100 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-rose-900">AGP</h3>
                  <span className="bg-rose-200 text-rose-800 text-xs font-bold px-3 py-1 rounded-full">Agent Gateway Protocol</span>
                </div>
                <p className="text-rose-800 mb-6 font-medium">
                  A high-performance network transport layer abstracting data exchange.
                </p>
                <ul className="space-y-3 text-sm text-rose-700/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Leverages gRPC over HTTP/2.0 using highly compressed Protocol Buffers.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Replaces REST payloads where microsecond latency is critical.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 shrink-0">&rarr;</span>
                    Best for: High-frequency trading algorithms, intensive low-latency interactions.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Pros, Cons & Standards */}
          <section className="bg-slate-900 text-slate-100 rounded-[3rem] p-8 md:p-14 shadow-xl">
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-700 pb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">4. Industry Standards & Systemic Risks</h2>
                <p className="text-slate-400">Balancing the immense benefits with the severe architectural vulnerabilities.</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl flex items-center gap-4 max-w-sm">
                <Globe className="text-blue-400 shrink-0" size={32} />
                <p className="text-sm text-slate-300">
                  <strong>The FIX Analogy:</strong> Like the FIX protocol standardized electronic trading in the 90s, the Linux Foundation (AAIF) is creating the "TCP/IP moment" for AI.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                  <CheckCircle2 /> The Advantages (Pros)
                </h3>
                <ul className="space-y-6">
                  <li className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-1">Ecosystem Composability</h4>
                    <p className="text-sm text-slate-400">
                      Maps agentic capabilities to standard BIAN service domains, eliminating big-bang rewrites and vendor lock-in.
                    </p>
                  </li>
                  <li className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-1">Computational Efficiency</h4>
                    <p className="text-sm text-slate-400">
                      Drastically reduces token waste. MCP and specialized routing ensures models only compute necessary, domain-specific tasks.
                    </p>
                  </li>
                  <li className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-1">Straight-Through Processing</h4>
                    <p className="text-sm text-slate-400">
                      Allows end-to-end automation of complex, long-running back-office tasks without requiring human API intervention.
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-400 mb-6 flex items-center gap-2">
                  <AlertTriangle /> The Vulnerabilities (Cons)
                </h3>
                <ul className="space-y-6">
                  <li className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-1">The "Split Brain" State Dilemma</h4>
                    <p className="text-sm text-slate-400">
                      Stateless agents lead to contradictory execution based on stale data. Mitigation requires a centralized, bitemporal state layer (e.g., XTDB) for synchronization.
                    </p>
                  </li>
                  <li className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-1">Zero-Trust Security Failures</h4>
                    <p className="text-sm text-slate-400">
                      Unbounded autonomy is dangerous. Systems require Zero-Trust Agentic Security (ZTAS), Verifiable Credentials, and Proof-of-Intent to prevent spoofing.
                    </p>
                  </li>
                  <li className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-1">Complex Orchestration Overhead</h4>
                    <p className="text-sm text-slate-400">
                      Networks cannot run on peer-to-peer alone. They require sophisticated central orchestrators to manage disputes, bidding, and adversarial reasoning.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Architecture Examples */}
          <section>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Real-World Orchestration Architectures</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                How different teams coordinate together utilizing orchestrator backbones to execute complex financial workloads.
              </p>
            </div>
            <div className="space-y-12">
              {/* Example 1 */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-blue-50 border-b border-blue-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">System 1: Autonomous Wealth Management</h3>
                    <p className="text-blue-700 text-sm">Hierarchical Orchestration bridging LangChain and CrewAI.</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-semibold text-blue-800 flex items-center gap-2">
                    <Lock size={16} /> The Nexus Handshake
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Flow Visualization */}
                    <div className="w-full lg:w-1/2 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-4 relative">
                      <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 relative z-10">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                          <Server size={24}/>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">Wealth Advisory Orchestrator</div>
                          <div className="text-xs text-slate-500">Framework: LangChain | Team: Wealth Mgmt</div>
                        </div>
                      </div>
                      {/* Connecting line */}
                      <div className="h-10 border-l-2 border-dashed border-indigo-300 ml-10 relative">
                        <div className="absolute top-1/2 -mt-3 ml-2 bg-indigo-100 text-indigo-800 text-[10px] px-2 py-1 rounded font-bold">
                          A2A + ACP (Nexus Handshake)
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 relative z-10">
                        <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                          <Activity size={24}/>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">Quantitative Risk Orchestrator</div>
                          <div className="text-xs text-slate-500">Framework: CrewAI | Team: Quant Risk</div>
                        </div>
                      </div>
                    </div>
                    {/* Text Description */}
                    <div className="w-full lg:w-1/2 space-y-4">
                      <p className="text-slate-600">
                        <strong>The Goal:</strong> Generate a portfolio rebalancing strategy without exposing CRM data to the Risk department.
                      </p>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li><strong>1. Ingestion:</strong> The Advisory agent uses <strong>MCP</strong> to ingest client constraints from an internal CRM securely.</li>
                        <li><strong>2. Discovery:</strong> Using <strong>A2A</strong>, it searches for an agent broadcasting the FIBO semantic intent <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">EXECUTE_PORTFOLIO_STRESS_TEST</code>.</li>
                        <li><strong>3. Negotiation:</strong> Via <strong>ACP</strong>, the agents negotiate SLAs (e.g., latency, cost) using PROBE and BID messages.</li>
                        <li><strong>4. The Nexus Handshake:</strong> A central Authority leases a time-bound identity token to the Risk agent. This allows secure cross-silo execution without sharing master credentials.</li>
                        <li><strong>5. Streaming Execution:</strong> Risk Agent runs Monte Carlo simulations, returning status via Server-Sent Events to avoid timeouts, completely opaque to the Advisory agent.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-rose-50 border-b border-rose-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-rose-900">System 2: Enterprise Fraud Detection</h3>
                    <p className="text-rose-700 text-sm">Adaptive Routing & Group Chat Orchestration.</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-semibold text-rose-800 flex items-center gap-2">
                    <Database size={16} /> Bitemporal Evidence
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
                    {/* Flow Visualization */}
                    <div className="w-full lg:w-1/2 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center relative">
                      <div className="p-4 w-full bg-white rounded-xl shadow-sm border border-slate-200 flex justify-center mb-6">
                        <div className="text-center">
                          <div className="font-bold text-slate-800 flex justify-center items-center gap-2">
                            <Network className="text-rose-500"/> Transaction Orchestrator
                          </div>
                          <div className="text-xs text-slate-500">Global Core Backbone</div>
                        </div>
                      </div>
                      <div className="flex w-full justify-between relative px-4">
                        {/* Lines drawn via border block */}
                        <div className="absolute top-0 left-1/2 w-1/2 h-8 border-t-2 border-l-2 border-dashed border-slate-300 -translate-x-1/2 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-1/2 w-1/2 h-8 border-t-2 border-r-2 border-dashed border-slate-300 translate-x-1/2 rounded-tr-lg"></div>
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-red-200 mt-8 w-5/12 text-center">
                          <div className="text-sm font-bold text-red-700">Behavioral Agent</div>
                          <div className="text-[10px] text-slate-500">Flags Graph Anomaly</div>
                        </div>
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-emerald-200 mt-8 w-5/12 text-center">
                          <div className="text-sm font-bold text-emerald-700">Compliance Agent</div>
                          <div className="text-[10px] text-slate-500">Clears OFAC Check</div>
                        </div>
                      </div>
                      <div className="mt-8 p-3 w-3/4 bg-amber-50 rounded-xl shadow-sm border border-amber-200 text-center relative z-10">
                        <div className="text-sm font-bold text-amber-800 flex justify-center gap-2">
                          <GitMerge size={16}/> Group Chat Resolution
                        </div>
                        <div className="text-[10px] text-amber-700">Audit Agent executes Weighted Aggregation</div>
                      </div>
                    </div>
                    {/* Text Description */}
                    <div className="w-full lg:w-1/2 space-y-4">
                      <p className="text-slate-600">
                        <strong>The Goal:</strong> Rapidly evaluate a SWIFT wire transfer across disparate departmental silos (Operations, Compliance, Fraud).
                      </p>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li><strong>1. Low Latency Routing:</strong> The Orchestrator uses the <strong>AGP (gRPC)</strong> protocol to broadcast transaction metadata simultaneously for ultra-low latency.</li>
                        <li><strong>2. Tool Usage:</strong> Agents use <strong>MCP</strong> to hit live APIs (OFAC database, internal Graph Topologies).</li>
                        <li><strong>3. Conflict Emergence:</strong> The Compliance agent clears the wire, but the Behavioral agent detects an 85% anomaly rate. Mathematical conflict occurs.</li>
                        <li><strong>4. Adversarial Resolution:</strong> The Orchestrator spins up a <strong>Group Chat Pattern</strong>. An Audit Agent weighs historical accuracy and invokes weighted aggregation to freeze the funds.</li>
                        <li><strong>5. Documentation Debt:</strong> Every handshake, intent, and rule is written immutably to a bitemporal XTDB database, proving exactly <em>why</em> the agents acted at that exact millisecond to auditors (Evidence-Based Governance).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Call-to-Action: Read Full Research Paper */}
        {currentArticle?.googleDoc && (
          <div className="max-w-6xl mx-auto px-6 pb-16">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          </div>
        )}

        <footer className="bg-white border-t border-slate-200 py-10 text-center mt-12">
          <p className="text-slate-500 text-sm">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}
