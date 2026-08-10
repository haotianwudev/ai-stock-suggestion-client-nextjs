'use client';

import React from 'react';
import { Network, Shield, Layers, GitMerge, Activity, Server, CheckCircle2, AlertTriangle, FileJson, Clock, Database, Lock, Globe, ChevronRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function AgentProtocolsArticle() {
  return (
    <ArticleFrame slug="architecture-interoperability-agent-protocols-financial-systems">
      <div className="pb-24">
        <InfographicSlot alt="Agent-to-Agent Protocol Architecture Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1: The Problem & Solution */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6">The Fragmentation Crisis</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                As financial firms transition to autonomous AI agents, extreme fragmentation occurs across federated engineering teams.
              </p>
            </div>
            
            <ComparisonGrid>
              <ComparisonCard
                title="The Silo Problem"
                type="neg"
                items={[
                  "Risk departments might build workflows on LangGraph, while Trading desks use CrewAI. Running on proprietary runtimes and separate servers, these agents exist in total isolation.",
                  "Unscalable bespoke 'glue code' for every API connection.",
                  "Massive token overhead (150,000+ tokens) to ingest tool schemas.",
                  "Silent handoff failures and untraceable logic execution deadlocks."
                ]}
              />
              <ComparisonCard
                title="The A2A Solution"
                type="pos"
                items={[
                  "The Agent-to-Agent (A2A) protocol acts as a universal translator, managed by the Linux Foundation. It allows distinct architectures to communicate, negotiate, and delegate tasks.",
                  "Highly specialized messaging and coordination tier.",
                  "Bridges frameworks (LangGraph ↔ CrewAI ↔ AutoGen).",
                  "Eliminates the need for hard-coded endpoint addresses."
                ]}
              />
            </ComparisonGrid>
          </section>

          {/* Section 2: Mechanics of A2A */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">How A2A Works: The Mechanics</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The protocol relies on several foundational architectural paradigms to enable enterprise-grade collaboration.
            </p>

            <div className="grid md:grid-cols-3 gap-6 min-w-0">
              <div className="bg-white dark:bg-[#05070A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-5">
                  <FileJson size={24} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg font-serif">Capability Advertising (Agent Cards)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Agents broadcast their existence via machine-readable JSON "Agent Cards" hosted at URIs. These act as digital resumes containing identities, versions, supported modalities, and trust scores, solving the discoverability problem.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#05070A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5">
                  <Clock size={24} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg font-serif">Stateful Asynchronous Collaboration</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Financial workflows (like AML investigations) take hours. A2A uses JSON-RPC 2.0 over HTTPS with Server-Sent Events (SSE) and webhooks to prevent timeouts and stream real-time status updates across departmental boundaries.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#05070A] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-0">
                <div className="w-12 h-12 bg-[#1D8A70]/20 dark:bg-[#3CBF9C]/20 rounded-2xl flex items-center justify-center text-[#1D8A70] dark:text-[#3CBF9C] mb-5">
                  <Lock size={24} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg font-serif">Opacity &amp; Hexagonal Architecture</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Protocol logic is strictly decoupled from business logic. A2A establishes a secure boundary ("opacity"), allowing an investment bank to delegate to a third party without revealing internal memory states, prompts, or proprietary algorithms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Protocol Choices */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6">The Broader Stack: What are the choices?</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                A2A is not a monolithic solution. It operates alongside complementary protocols tailored to specific use cases, network latency profiles, and security models.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 min-w-0">
              {/* MCP Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30 min-w-0 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 font-serif">MCP</h3>
                  <span className="bg-blue-200 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-300 dark:border-[#A8672E] dark:border-[#D08F52]">Model Context Protocol</span>
                </div>
                <p className="text-blue-800 dark:text-blue-200/80 mb-6 font-medium leading-relaxed">
                  The standardized connectivity layer bridging AI applications with static data and tools.
                </p>
                <ul className="space-y-4 text-sm text-blue-900/80 dark:text-blue-100/70">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                    <div>Rigid client-server hierarchy.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                    <div>Reduces token overhead by 98.7% (replaces prompt schemas with JSON-RPC services).</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                    <div><strong className="text-blue-900 dark:text-blue-200 font-semibold">Best for:</strong> Tool utilization, RAG pipelines, internal SQL database queries.</div>
                  </li>
                </ul>
              </div>

              {/* ACP Card */}
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-fuchsia-950/20 p-8 rounded-3xl border border-purple-100 dark:border-purple-900/30 min-w-0 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-300 font-serif">ACP</h3>
                  <span className="bg-purple-200 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-xs font-bold px-3 py-1 rounded-full border border-purple-300 dark:border-purple-700">Agent Comm. Protocol</span>
                </div>
                <p className="text-purple-800 dark:text-purple-200/80 mb-6 font-medium leading-relaxed">
                  Introduces a sophisticated "Semantic Layer" and high-assurance verifiable intents.
                </p>
                <ul className="space-y-4 text-sm text-purple-900/80 dark:text-purple-100/70">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                    <div>Federated Broker Model with multipart RESTful HTTP.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                    <div>Uses JSON-LD to map semantic intents (e.g., DELEGATE) to financial ontologies like FIBO.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                    <div><strong className="text-purple-900 dark:text-purple-200 font-semibold">Best for:</strong> Multi-modal enterprise workflows requiring unambiguous communication.</div>
                  </li>
                </ul>
              </div>

              {/* A2A Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 min-w-0 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 font-serif">A2A</h3>
                  <span className="bg-emerald-200 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-[#1D8A70] dark:border-[#3CBF9C]">Agent-to-Agent Protocol</span>
                </div>
                <p className="text-emerald-800 dark:text-emerald-200/80 mb-6 font-medium leading-relaxed">
                  The interworking protocol for dynamic, peer-to-peer task exchange.
                </p>
                <ul className="space-y-4 text-sm text-emerald-900/80 dark:text-emerald-100/70">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                    <div>Decentralized network emphasizing autonomous delegation.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                    <div>Secures identity via Decentralized Identifiers (DIDs) and Agent Cards.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" />
                    <div><strong className="text-emerald-900 dark:text-emerald-200 font-semibold">Best for:</strong> Multi-agent workflows, expert marketplaces, dynamic task routing.</div>
                  </li>
                </ul>
              </div>

              {/* AGP Card */}
              <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/30 min-w-0 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-300 font-serif">AGP</h3>
                  <span className="bg-rose-200 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 text-xs font-bold px-3 py-1 rounded-full border border-rose-300 dark:border-[#BC4128] dark:border-[#E2694A]">Agent Gateway Protocol</span>
                </div>
                <p className="text-rose-800 dark:text-rose-200/80 mb-6 font-medium leading-relaxed">
                  A high-performance network transport layer abstracting data exchange.
                </p>
                <ul className="space-y-4 text-sm text-rose-900/80 dark:text-rose-100/70">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Leverages gRPC over HTTP/2.0 using highly compressed Protocol Buffers.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div>Replaces REST payloads where microsecond latency is critical.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                    <div><strong className="text-rose-900 dark:text-rose-200 font-semibold">Best for:</strong> High-frequency trading algorithms, intensive low-latency interactions.</div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Pros, Cons & Standards */}
          <section className="py-16">
            <div className="bg-[#14171B] dark:bg-[#05070A] text-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-800 min-w-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8672E] dark:bg-[#D08F52]/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D08F52]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="mb-12 flex flex-col md:flex-row justify-between items-start gap-8 border-b border-slate-800 pb-8 min-w-0">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">Industry Standards &amp; Systemic Risks</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">Balancing the immense benefits with the severe architectural vulnerabilities.</p>
                  </div>
                  <div className="bg-black/40 border border-slate-800 p-6 rounded-2xl flex items-start gap-4 max-w-sm shrink-0 min-w-0">
                    <Globe className="text-[#A8672E] dark:text-[#D08F52] shrink-0 w-8 h-8" />
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <strong className="text-white">The FIX Analogy:</strong> Like the FIX protocol standardized electronic trading in the 90s, the Linux Foundation (AAIF) is creating the "TCP/IP moment" for AI.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 min-w-0">
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold text-[#3CBF9C] mb-8 flex items-center gap-3 font-serif">
                      <CheckCircle2 className="w-6 h-6" /> The Advantages (Pros)
                    </h3>
                    <ul className="space-y-6">
                      <li className="bg-black/30 p-6 rounded-2xl border border-emerald-900/30">
                        <h4 className="font-bold text-white mb-2 text-lg">Ecosystem Composability</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Maps agentic capabilities to standard BIAN service domains, eliminating big-bang rewrites and vendor lock-in.
                        </p>
                      </li>
                      <li className="bg-black/30 p-6 rounded-2xl border border-emerald-900/30">
                        <h4 className="font-bold text-white mb-2 text-lg">Computational Efficiency</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Drastically reduces token waste. MCP and specialized routing ensures models only compute necessary, domain-specific tasks.
                        </p>
                      </li>
                      <li className="bg-black/30 p-6 rounded-2xl border border-emerald-900/30">
                        <h4 className="font-bold text-white mb-2 text-lg">Straight-Through Processing</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Allows end-to-end automation of complex, long-running back-office tasks without requiring human API intervention.
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold text-[#BC4128] dark:text-[#E2694A] mb-8 flex items-center gap-3 font-serif">
                      <AlertTriangle className="w-6 h-6" /> The Vulnerabilities (Cons)
                    </h3>
                    <ul className="space-y-6">
                      <li className="bg-black/30 p-6 rounded-2xl border border-rose-900/30">
                        <h4 className="font-bold text-white mb-2 text-lg">The "Split Brain" State Dilemma</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Stateless agents lead to contradictory execution based on stale data. Mitigation requires a centralized, bitemporal state layer (e.g., XTDB) for synchronization.
                        </p>
                      </li>
                      <li className="bg-black/30 p-6 rounded-2xl border border-rose-900/30">
                        <h4 className="font-bold text-white mb-2 text-lg">Zero-Trust Security Failures</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Unbounded autonomy is dangerous. Systems require Zero-Trust Agentic Security (ZTAS), Verifiable Credentials, and Proof-of-Intent to prevent spoofing.
                        </p>
                      </li>
                      <li className="bg-black/30 p-6 rounded-2xl border border-rose-900/30">
                        <h4 className="font-bold text-white mb-2 text-lg">Complex Orchestration Overhead</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Networks cannot run on peer-to-peer alone. They require sophisticated central orchestrators to manage disputes, bidding, and adversarial reasoning.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Architecture Examples */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6">Real-World Orchestration Architectures</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                How different teams coordinate together utilizing orchestrator backbones to execute complex financial workloads.
              </p>
            </div>
            
            <div className="space-y-12 min-w-0">
              {/* Example 1 */}
              <div className="bg-white dark:bg-[#05070A] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm min-w-0 flex flex-col">
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900/30 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 font-serif mb-2">System 1: Autonomous Wealth Management</h3>
                    <p className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]/80 text-sm">Hierarchical Orchestration bridging LangChain and CrewAI.</p>
                  </div>
                  <div className="bg-white dark:bg-black p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-sm font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-3 shrink-0">
                    <Lock className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" /> The Nexus Handshake
                  </div>
                </div>
                
                <div className="p-8 lg:p-10 flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex flex-col lg:flex-row gap-12 items-center min-w-0">
                    {/* Flow Visualization */}
                    <div className="w-full lg:w-1/2 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col gap-6 relative min-w-0 shrink-0">
                      <div className="p-6 bg-white dark:bg-[#05070A] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5 relative z-10 min-w-0">
                        <div className="bg-blue-100 dark:bg-blue-900/40 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] p-4 rounded-xl shrink-0">
                          <Server className="w-6 h-6"/>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-200 truncate">Wealth Advisory Orchestrator</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">Framework: LangChain | Team: Wealth Mgmt</div>
                        </div>
                      </div>
                      
                      {/* Connecting line */}
                      <div className="h-12 border-l-2 border-dashed border-indigo-300 dark:border-[#A8672E] dark:border-[#D08F52] ml-12 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs px-3 py-1.5 rounded-lg font-bold border border-indigo-200 dark:border-indigo-800/50 whitespace-nowrap">
                          A2A + ACP (Nexus Handshake)
                        </div>
                      </div>
                      
                      <div className="p-6 bg-white dark:bg-[#05070A] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5 relative z-10 min-w-0">
                        <div className="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 p-4 rounded-xl shrink-0">
                          <Activity className="w-6 h-6"/>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-200 truncate">Quantitative Risk Orchestrator</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">Framework: CrewAI | Team: Quant Risk</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Text Description */}
                    <div className="w-full lg:w-1/2 space-y-6 min-w-0">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">The Goal:</strong> Generate a portfolio rebalancing strategy without exposing CRM data to the Risk department.
                      </p>
                      <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">1. Ingestion:</strong> The Advisory agent uses <strong className="text-slate-900 dark:text-slate-200">MCP</strong> to ingest client constraints from an internal CRM securely.</div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">2. Discovery:</strong> Using <strong className="text-slate-900 dark:text-slate-200">A2A</strong>, it searches for an agent broadcasting the FIBO semantic intent <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">EXECUTE_PORTFOLIO_STRESS_TEST</code>.</div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">3. Negotiation:</strong> Via <strong className="text-slate-900 dark:text-slate-200">ACP</strong>, the agents negotiate SLAs (e.g., latency, cost) using PROBE and BID messages.</div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">4. The Nexus Handshake:</strong> A central Authority leases a time-bound identity token to the Risk agent. This allows secure cross-silo execution without sharing master credentials.</div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">5. Streaming Execution:</strong> Risk Agent runs Monte Carlo simulations, returning status via Server-Sent Events to avoid timeouts, completely opaque to the Advisory agent.</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-white dark:bg-[#05070A] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm min-w-0 flex flex-col">
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 border-b border-rose-100 dark:border-rose-900/30 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-300 font-serif mb-2">System 2: Enterprise Fraud Detection</h3>
                    <p className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]/80 text-sm">Adaptive Routing &amp; Group Chat Orchestration.</p>
                  </div>
                  <div className="bg-white dark:bg-black p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-sm font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-3 shrink-0">
                    <Database className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" /> Bitemporal Evidence
                  </div>
                </div>
                
                <div className="p-8 lg:p-10 flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex flex-col lg:flex-row-reverse gap-12 items-center min-w-0">
                    {/* Flow Visualization */}
                    <div className="w-full lg:w-1/2 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center relative min-w-0 shrink-0">
                      <div className="p-6 w-full bg-white dark:bg-[#05070A] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex justify-center mb-8 relative z-10 min-w-0">
                        <div className="text-center min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-200 flex justify-center items-center gap-3 mb-1 truncate">
                            <Network className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]"/> Transaction Orchestrator
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">Global Core Backbone</div>
                        </div>
                      </div>
                      
                      <div className="flex w-full justify-between relative px-2 gap-4">
                        {/* Lines drawn via border block */}
                        <div className="absolute top-0 left-[25%] w-[25%] h-8 border-t-2 border-l-2 border-dashed border-slate-300 dark:border-slate-700 rounded-tl-xl -z-0"></div>
                        <div className="absolute top-0 right-[25%] w-[25%] h-8 border-t-2 border-r-2 border-dashed border-slate-300 dark:border-slate-700 rounded-tr-xl -z-0"></div>
                        
                        <div className="p-4 bg-white dark:bg-[#05070A] rounded-2xl shadow-sm border border-red-200 dark:border-red-900/50 mt-8 w-1/2 text-center relative z-10 min-w-0">
                          <div className="text-sm font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-1 truncate">Behavioral Agent</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Flags Graph Anomaly</div>
                        </div>
                        <div className="p-4 bg-white dark:bg-[#05070A] rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-900/50 mt-8 w-1/2 text-center relative z-10 min-w-0">
                          <div className="text-sm font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-1 truncate">Compliance Agent</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Clears OFAC Check</div>
                        </div>
                      </div>
                      
                      <div className="mt-8 p-5 w-full max-w-sm bg-amber-50 dark:bg-amber-950/20 rounded-2xl shadow-sm border border-amber-200 dark:border-amber-900/50 text-center relative z-10 min-w-0">
                        <div className="text-sm font-bold text-amber-800 dark:text-amber-300 flex justify-center items-center gap-2 mb-1 truncate">
                          <GitMerge className="w-4 h-4"/> Group Chat Resolution
                        </div>
                        <div className="text-xs text-amber-700 dark:text-amber-500/80 truncate">Audit Agent executes Weighted Aggregation</div>
                      </div>
                    </div>
                    
                    {/* Text Description */}
                    <div className="w-full lg:w-1/2 space-y-6 min-w-0">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">The Goal:</strong> Rapidly evaluate a SWIFT wire transfer across disparate departmental silos (Operations, Compliance, Fraud).
                      </p>
                      <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">1. Low Latency Routing:</strong> The Orchestrator uses the <strong className="text-slate-900 dark:text-slate-200">AGP (gRPC)</strong> protocol to broadcast transaction metadata simultaneously for ultra-low latency.</div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">2. Tool Usage:</strong> Agents use <strong className="text-slate-900 dark:text-slate-200">MCP</strong> to hit live APIs (OFAC database, internal Graph Topologies).</div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">3. Conflict Emergence:</strong> The Compliance agent clears the wire, but the Behavioral agent detects an 85% anomaly rate. Mathematical conflict occurs.</div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">4. Adversarial Resolution:</strong> The Orchestrator spins up a <strong className="text-slate-900 dark:text-slate-200">Group Chat Pattern</strong>. An Audit Agent weighs historical accuracy and invokes weighted aggregation to freeze the funds.</div>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#BC4128] dark:text-[#E2694A] shrink-0" />
                          <div className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200">5. Documentation Debt:</strong> Every handshake, intent, and rule is written immutably to a bitemporal XTDB database, proving exactly <em>why</em> the agents acted at that exact millisecond to auditors (Evidence-Based Governance).</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
