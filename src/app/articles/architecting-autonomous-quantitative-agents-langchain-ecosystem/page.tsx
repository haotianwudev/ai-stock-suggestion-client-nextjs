'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function QuantAgentTutorial() {
  return (
    <ArticleFrame slug="architecting-autonomous-quantitative-agents-langchain-ecosystem">
      <div className="space-y-12">
        <InfographicSlot alt="LangChain Ecosystem Architecture Infographic" />

        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The modern quant agent ecosystem decouples the framework (LangChain), runtime (LangGraph), and harness (Deep Agents).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>No-code platforms like LangFlow and Flowise democratize complex multi-agent workflows for domain experts while maintaining on-premise security.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Interrogating tabular data via Python REPL is a severe security risk; secure execution mandates SQL-based DuckDB integration or sandboxed Docker containers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Advanced RAG for financial filings requires "Unified Embedding," converting tables to Markdown and utilizing Hybrid Retrieval with Reciprocal Rank Fusion (RRF).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The Supervisor Pattern divides cognitive labor, orchestrating highly specialized worker agents while persisting state via PostgresSaver.</span>
            </li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The LangChain Ecosystem
          </h2>
          <p className="mb-6">
            The intersection of large language models and quantitative finance has catalyzed a paradigm shift, transitioning the industry from static algorithmic execution to dynamic, autonomous, multi-agent systems. The modern ecosystem completely decouples the framework, runtime, and harness.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="LangChain (Framework)" tone="neutral">
              <p className="text-sm">The overarching framework providing high-level abstractions, standardizing tool APIs, and avoiding vendor lock-in. Uses the <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-900 dark:text-slate-100 font-mono text-xs">create_agent</code> factory.</p>
            </ComparisonCard>
            <ComparisonCard title="LangGraph (Runtime)" tone="neutral">
              <p className="text-sm">A low-level orchestration runtime for stateful, cyclic workflows. Models operations as nodes and edges for complex routing and failure recovery.</p>
            </ComparisonCard>
            <ComparisonCard title="Deep Agents (Harness)" tone="neutral">
              <p className="text-sm">An opinionated harness built atop LangGraph. Provides a virtual filesystem, autonomous planning, and subagent delegation for long-horizon tasks.</p>
            </ComparisonCard>
            <ComparisonCard title="LangSmith (Observability)" tone="neutral">
              <p className="text-sm">Captures traces, logs, and metrics. Critical for auditing non-deterministic agent decisions and evaluating regulatory compliance.</p>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Democratizing Quant Workflows
          </h2>
          <p className="mb-8">
            Domain-expert analysts, portfolio managers, and risk officers require the analytical power of large language models without writing complex Python scripts. Visual platforms abstract away infrastructure while retaining complex orchestration.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-6 rounded-2xl border border-[#A8672E]/20 dark:border-[#D08F52]/20">
              <h4 className="font-serif font-bold text-lg text-[#A8672E] dark:text-[#D08F52] mb-3">LangFlow</h4>
              <p className="text-sm">A direct visual interface for building LangChain applications. Completely open-source, allowing self-hosting to protect proprietary trading logic and sensitive client data from traversing external networks.</p>
            </div>
            <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-6 rounded-2xl border border-[#A8672E]/20 dark:border-[#D08F52]/20">
              <h4 className="font-serif font-bold text-lg text-[#A8672E] dark:text-[#D08F52] mb-3">Flowise</h4>
              <p className="text-sm">A fully managed, no-code environment with pre-built templates for standard patterns like RAG and basic multi-agent workflows. Ideal for rapid prototyping and internal tool deployment.</p>
            </div>
            <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-6 rounded-2xl border border-[#A8672E]/20 dark:border-[#D08F52]/20">
              <h4 className="font-serif font-bold text-lg text-[#A8672E] dark:text-[#D08F52] mb-3">n8n & Make</h4>
              <p className="text-sm">Enterprise automation platforms integrating AI directly into standard operational workflows. "LangChain Agent" nodes bridge the gap between LLM reasoning and non-technical operators.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Interrogating Tabular Data
          </h2>
          <p className="mb-6">
            Quantitative finance relies heavily on pandas DataFrames for historical price action, order books, and corporate metrics. Bridging semantic intent with data manipulation requires strict security guardrails.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="The Python REPL Paradigm (High Risk)" tone="neg">
              <p className="text-sm mb-3">
                Using <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">create_pandas_dataframe_agent</code> traditionally forces the LLM to generate and execute arbitrary Python code. This introduces profound security vulnerabilities, requiring the highly dangerous <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">allow_dangerous_code={`{true}`}</code> parameter.
              </p>
              <p className="text-xs font-bold text-[#BC4128] dark:text-[#E2694A]">
                Mitigation: If required, code evaluation must be sandboxed inside ephemeral Docker containers using a subclassed PythonAstREPLTool.
              </p>
            </ComparisonCard>
            
            <ComparisonCard title="SQL-Based Interrogation via DuckDB (Secure)" tone="pos">
              <p className="text-sm mb-3">
                For zero arbitrary code execution, integrating analytical engines like DuckDB allows agents to query pandas DataFrames locally using pure SQL syntax.
              </p>
              <p className="text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C]">
                The agent uses SQLDatabaseToolkit to inspect schemas and an LLM-assisted sql_db_query_checker to validate syntax before execution.
              </p>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Unstructured Alpha: Advanced RAG
          </h2>
          <p className="mb-6">
            A vast repository of untapped alpha resides in SEC filings (10-Ks, 10-Qs). Standard Retrieval-Augmented Generation (RAG) fails due to the complex nature of financial tables embedded within narrative text.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mt-8">
            <div className="p-4 bg-slate-200 dark:bg-slate-700 border-b border-slate-300 dark:border-slate-600">
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">The "Unified Embedding" Strategy</h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">1. Isolation & Conversion</h4>
                  <p className="text-sm">Instead of naive recursive character splitting, libraries like <code className="bg-white dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-xs border border-slate-200 dark:border-slate-700">Unstructured.io</code> detect and isolate financial tables, converting them entirely into Markdown format to preserve spatial relationships.</p>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">2. LLM Summarization</h4>
                  <p className="text-sm">A secondary LLM pre-processes the table, generating a natural-language summary based on surrounding context (e.g., "Meta Platforms' revenue for Q2 2024").</p>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">3. Hybrid Retrieval</h4>
                  <p className="text-sm">The vector DB stores the Markdown table + the semantic summary. Retrieval utilizes Hybrid Search (Dense Vectors + BM25 Keywords) fused via <strong className="text-slate-900 dark:text-slate-100">Reciprocal Rank Fusion (RRF)</strong> for extreme precision.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Multi-Agent Orchestration
          </h2>
          <p className="mb-6">
            Monolithic agents struggle with expansive toolkits. The <strong className="text-slate-900 dark:text-slate-100">Supervisor Pattern</strong> (via <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs text-slate-900 dark:text-slate-100">langgraph-supervisor</code>) divides cognitive labor among highly specialized, strictly scoped worker agents overseen by a central routing intelligence.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Indicator Agent" tone="neutral">
              <p className="text-sm">Processes raw OHLC data to compute RSI, MACD, Stochastic Oscillators.</p>
            </ComparisonCard>
            <ComparisonCard title="Pattern Agent" tone="neutral">
              <p className="text-sm">Generates K-line charts and identifies morphological highs, lows, and chart patterns.</p>
            </ComparisonCard>
            <ComparisonCard title="Trend Agent" tone="neutral">
              <p className="text-sm">Renders annotated charts with trend channels and consolidation zones.</p>
            </ComparisonCard>
            <ComparisonCard title="Decision Agent" tone="neutral">
              <p className="text-sm">Synthesizes specialists outputs to formulate a LONG/SHORT directive with stop-loss.</p>
            </ComparisonCard>
          </ComparisonGrid>

          <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-6 rounded-2xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 shadow-sm mt-8">
            <h3 className="font-serif text-lg font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">
              Handoff Mechanics & Enterprise Guardrails
            </h3>
            <p className="text-sm">
              The supervisor uses <code className="bg-white dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-xs border border-slate-200 dark:border-slate-700">create_handoff_tool</code> to transfer control securely. Setting <code className="bg-white dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-xs border border-slate-200 dark:border-slate-700">output_mode="last_message"</code> prevents context bloat. Crucially, before executing high-risk trades, LangGraph routes payloads through deterministic policy validation nodes, transferring state to a human escalation node if risk limits are exceeded.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Autonomous Workflows & Memory
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                The Deep Agents Harness
              </h3>
              <p className="mb-4 text-sm">
                For open-ended macroeconomic research, Deep Agents pushes beyond strict graph routing via intrinsic planning and dynamic context compression.
              </p>
              <ul className="space-y-4 text-sm border-t border-slate-200 dark:border-slate-800 pt-4">
                <li>
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1">Autonomous Planning</strong>
                  Uses <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">write_todos</code> to decompose complex objectives into sequential subtasks, preventing hallucination over multi-hour runs.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1">Virtual Filesystem</strong>
                  Intercepts massive payloads (100-page PDFs, SQL dumps) and offloads them to a virtual disk, providing the LLM a 10-line preview. Agents use <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">read_file</code> or <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">grep</code> for retrieval on demand.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-slate-100 block mb-1">Ephemeral Subagents</strong>
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">SubAgentMiddleware</code> dynamically spawns child agents with isolated context windows to run parallel tasks, keeping the primary agent's memory pristine.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Stateful Memory Management
              </h3>
              <p className="mb-4 text-sm">
                Financial modeling requires perfect recall. Memory is tied to a <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">thread_id</code> and managed via rigorous graph state persistence.
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-slate-200 dark:bg-slate-700">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Mechanism</th>
                        <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Implementation</th>
                        <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Function</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      <tr>
                        <td className="px-4 py-3 font-medium">Session Persistence</td>
                        <td className="px-4 py-3 font-mono text-xs">PostgresSaver</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Serializes entire graph state to DB after every node, allowing session resumption.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">Context Compression</td>
                        <td className="px-4 py-3 font-mono text-xs">Summarization<br/>Middleware</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Condenses older history when token thresholds are breached to protect the window.</td>
                      </tr>
                    </tbody>
                 </table>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Secure Connectivity (MCP)
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-8">
              The <strong className="text-slate-900 dark:text-slate-100">Model Context Protocol (MCP)</strong> standardizes how applications provide executable tools and contextual data to LLMs, decoupling logic from infrastructure.
            </p>
            
            <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-8 rounded-3xl border border-[#A8672E]/20 dark:border-[#D08F52]/20 shadow-inner">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                 <div className="text-center">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">LangChain Agent</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Discovers tools at runtime via<br/><code className="bg-white dark:bg-gray-900 px-1 py-0.5 rounded font-mono border border-slate-200 dark:border-slate-700">MultiServerMCPClient</code></p>
                 </div>
                 
                 <div className="flex flex-col items-center text-[#A8672E] dark:text-[#D08F52]">
                   <span className="text-xs font-bold uppercase tracking-widest mb-2">Standardized Stdio / SSE</span>
                   <div className="h-1 w-24 md:w-32 bg-[#A8672E]/30 dark:bg-[#D08F52]/30 rounded"></div>
                 </div>

                 <div className="text-center">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">MCP Server Gateway</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Handles auth, pooling, and logs.<br/>Connects to SQL, CRM, API.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
