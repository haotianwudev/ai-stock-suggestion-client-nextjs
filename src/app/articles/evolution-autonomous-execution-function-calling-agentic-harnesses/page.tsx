'use client';

import { useState } from 'react';
import {
  Maximize2, ExternalLink, Music,
  Brain, FileJson, Network, Terminal, Cpu, TrendingUp, ShieldCheck, Database,
  Zap, Activity, ChevronRight, Code, Layers, Globe, Clock, Search, Lock,
  RefreshCw, LineChart, FileBarChart, Users, Calculator, BookOpen, Lightbulb,
  Rocket, Target, GitMerge, Box
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { articles } from '@/data/articles';

const SLUG = 'evolution-autonomous-execution-function-calling-agentic-harnesses';
const GOOGLE_DOC = 'https://docs.google.com/document/d/e/2PACX-1vREwLPbeeZpEgh7kfYl8auX_3t2UxdBa5Hj8-eaYe1xx9vciC342fXq4uRcD8wBx_OaMuyScnQZovbs/pub';
const INFOGRAPHIC = 'https://i.imgur.com/A4Qz5GY.jpeg';

const SectionHeader = ({ title, subtitle, icon: Icon, colorClass, borderClass }: {
  title: string; subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string; borderClass: string;
}) => (
  <div className="mb-10 relative">
    <div className={`absolute -left-6 top-0 w-1.5 h-full rounded-r-full ${borderClass} opacity-50 hidden md:block`} />
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorClass} mb-6 shadow-sm`}>
      <Icon className="w-8 h-8" />
    </div>
    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">{title}</h2>
    {subtitle && <p className="text-xl text-slate-600 font-medium max-w-2xl">{subtitle}</p>}
  </div>
);

const TutorialCard = ({ title, icon: Icon, children, colorAccent, bgColor = 'bg-white' }: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  colorAccent: string;
  bgColor?: string;
}) => (
  <div className={`${bgColor} rounded-2xl p-7 shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-md transition-shadow`}>
    <div className={`absolute top-0 left-0 w-1.5 h-full ${colorAccent}`} />
    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
      {Icon && <Icon className="w-5 h-5 text-slate-500" />}
      {title}
    </h3>
    <div className="text-slate-600 space-y-4 leading-relaxed text-sm md:text-base">{children}</div>
  </div>
);

const CodeSnippet = ({ language, code }: { language: string; code: string }) => (
  <div className="bg-slate-900 rounded-xl overflow-hidden mt-4 border border-slate-800 shadow-inner">
    <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-400 flex justify-between items-center">
      <span>{language}</span>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
      </div>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap"><code>{code}</code></pre>
    </div>
  </div>
);

const ComparisonTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-8 bg-white">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50 text-slate-700">
          {headers.map((h, i) => (
            <th key={i} className="py-4 px-6 font-bold border-b border-slate-200 text-sm uppercase tracking-wider">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`py-4 px-6 text-sm ${j === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function EvolutionAutonomousExecution() {
  const currentArticle = articles.find((a) => a.slug === SLUG);
  return (
    <ArticleFrame slug={SLUG}>
      <InfographicSlot alt="Evolution of Autonomous Execution Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12 space-y-24">
        {/* Hero */}
        <header className="bg-white border-b border-slate-200 pt-28 pb-20 px-6 relative overflow-hidden mt-6">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-emerald-400/20 to-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold text-xs tracking-widest uppercase mb-8 border border-slate-200 shadow-sm">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Interactive Technical Tutorial</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
              The Evolution of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">Autonomous Execution</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              From Legacy Function Calling to Agentic Skills-Based Harnesses in Quantitative Finance.
            </p>
          </div>
        </header>

        {/* Intro */}
        <section className="prose prose-lg prose-slate max-w-none text-slate-600 bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <p className="lead text-2xl text-slate-800 font-semibold mb-6">The trajectory of artificial intelligence has fundamentally shifted.</p>
          <p>
            We are moving from systems that merely generate probabilistic text to autonomous entities capable of executing complex, multi-step operations within highly deterministic external environments. This paradigm shift is entirely predicated on the evolution of <strong>tool calling architectures</strong>. The mechanism by which a large language model interacts with external systems — databases, APIs, computational engines, and file systems — defines its operational ceiling and utility.
          </p>
        </section>

        {/* Phase 1: Legacy */}
        <section className="relative scroll-mt-24">
          <SectionHeader
            title="1. The Genesis of Deterministic Action"
            subtitle="Legacy Function Calling (Introduced mid-2023 by OpenAI)"
            icon={FileJson}
            colorClass="bg-orange-100 text-orange-600"
            borderClass="bg-orange-500"
          />
          <div className="text-lg text-slate-600 mb-8 max-w-4xl">
            Prior to mid-2023, models were strictly confined to their pre-trained weights and required extensive, error-prone prompt engineering to parse free-form text into machine-readable formats. Legacy function calling provided a structural bridge by enabling developers to define tools using strict JSON Schema specifications.
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <TutorialCard title="Core Mechanics & Shift" icon={RefreshCw} colorAccent="bg-orange-500">
              <p>Function calling turned algorithmic intent into programmatic action. Instead of generating text, the model recognizes when a request needs external data, halts its generative process, and outputs a highly structured JSON object matching a schema.</p>
              <p className="font-medium text-slate-800 mt-4">Crucial distinction: The language model does <em>not</em> execute the function itself; it acts solely as a semantic routing engine.</p>
            </TutorialCard>
            <TutorialCard title="API Evolution: Functions to Tools" icon={Layers} colorAccent="bg-orange-500">
              <p>Early implementations explicitly passed a <code className="bg-slate-100 px-1 rounded text-xs font-mono">functions</code> array (requiring name, description, parameters).</p>
              <p>This was deprecated for a more flexible <code className="bg-slate-100 px-1 rounded text-xs font-mono">tools</code> array. This design shift allowed grouping multiple functions under namespaces and, critically, enabled <strong>parallel tool calls</strong> for multi-threaded data retrieval.</p>
            </TutorialCard>
          </div>
          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-8">
            <h4 className="flex items-center gap-3 text-xl font-bold text-orange-900 mb-4">
              <Zap className="w-6 h-6 text-orange-600" /> Architectural Limitations: The Schema Bloat Crisis
            </h4>
            <div className="grid md:grid-cols-2 gap-6 text-orange-800">
              <div>
                <strong className="block mb-2 text-orange-950">1. Token Inefficiency</strong>
                <p className="text-sm leading-relaxed">Every available tool must have its full JSON schema injected into the system prompt for every interaction. In finance, expanding to dozens of APIs saturates the context window, degrading reasoning quality and inflating inference costs.</p>
              </div>
              <div>
                <strong className="block mb-2 text-orange-950">2. Compounding Latency</strong>
                <p className="text-sm leading-relaxed">The architecture necessitates a complete network round-trip for every individual invocation. Querying a DB, parsing it, then calling a pricing API for each ticker requires multiple sequential cycles, making it unsuitable for high-frequency workflows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2: MCP */}
        <section className="relative scroll-mt-24">
          <SectionHeader
            title="2. The Interoperability Standard"
            subtitle="Model Context Protocol (MCP) — Late 2024"
            icon={Network}
            colorClass="bg-blue-100 text-blue-600"
            borderClass="bg-blue-500"
          />
          <div className="text-lg text-slate-600 mb-8 max-w-4xl">
            As the AI ecosystem expanded, the <strong>N-to-N integration problem</strong> became the primary bottleneck. Developers were forced to write custom logic for every combination of LLM framework (LangChain, LlamaIndex) and external service. In late 2024, Anthropic introduced MCP, inspired by the Language Server Protocol (LSP), to establish a universal standard.
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">The Three-Tier Architecture</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-blue-100 text-center shadow-sm">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-50">
                  <Box className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">1. MCP Host</h4>
                <p className="text-sm text-slate-600">The primary application housing the LLM (e.g., Claude Desktop, Cursor IDE, bespoke terminals).</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-blue-100 text-center shadow-sm">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-50">
                  <Network className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">2. MCP Client</h4>
                <p className="text-sm text-slate-600">Protocol translation layer directly within the host managing connections, routing, and lifecycle.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-blue-100 text-center shadow-sm">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-50">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">3. MCP Server</h4>
                <p className="text-sm text-slate-600">Lightweight programs exposing APIs via <strong>STDIO</strong> (highly secure, local) or <strong>HTTP+SSE</strong> (remote/cloud).</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <TutorialCard title="Tools" colorAccent="bg-blue-500">
              <p>Executable functions that alter state or perform external computations (e.g., executing a database query, submitting a trade order).</p>
            </TutorialCard>
            <TutorialCard title="Resources" colorAccent="bg-blue-500">
              <p>Read-only data sources that provide contextual info directly to the context window (e.g., PDF contents, live API responses).</p>
            </TutorialCard>
            <TutorialCard title="Prompts" colorAccent="bg-blue-500">
              <p>Reusable conversational templates that structure interactions and provide few-shot examples to optimize model behavior.</p>
            </TutorialCard>
          </div>
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-blue-900 flex gap-4 items-start">
            <Brain className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <strong>The Inherited Flaw:</strong> Despite solving interoperability (SDKs in Python/TS), MCP inherits token consumption vulnerabilities. Extracting massive datasets can cost 50,000+ tokens purely on raw intermediate data before the agent even begins core reasoning.
            </div>
          </div>
        </section>

        {/* Phase 3: Programmatic */}
        <section className="relative scroll-mt-24">
          <SectionHeader
            title="3. The Paradigm Shift"
            subtitle="Programmatic Tool Calling ('Code Mode' with Claude 4.6 / Sonnet 4.6)"
            icon={Terminal}
            colorClass="bg-emerald-100 text-emerald-600"
            borderClass="bg-emerald-500"
          />
          <div className="bg-emerald-900 rounded-3xl p-8 md:p-10 shadow-lg mb-10 text-emerald-50">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-4">The Turing-Complete Leap</h3>
                <p className="text-emerald-100 leading-relaxed text-lg mb-6">
                  Instead of predicting a JSON object for a single action, the model writes <strong>Turing-complete code</strong> (TypeScript/Python) to orchestrate entire multi-tool workflows natively. It shifts the execution burden to an isolated, secure computational sandbox (e.g., V8 JavaScript isolates or Daytona containers).
                </p>
                <div className="inline-flex items-center gap-2 bg-emerald-800/50 px-4 py-2 rounded-lg border border-emerald-700/50 text-sm">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Unlocks industry-leading scores on <strong>BrowseComp</strong> and <strong>DeepSearchQA</strong></span>
                </div>
              </div>
              <div className="w-full md:w-1/3 bg-emerald-950 p-6 rounded-2xl border border-emerald-800 shadow-inner">
                <h4 className="text-emerald-300 font-bold mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" /> Progressive Tool Discovery
                </h4>
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  Rather than loading all tool schemas upfront, the agent uses a <em>Tool Search Tool</em>. It queries to discover relevant libraries/MCP servers, imports them into its generated script, and executes locally.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Real-World Example: Filtering 10,000 Tick Data Records</h3>
            <p className="text-slate-600 mb-6">Suppose the user asks: <em>&ldquo;Find the 3 minutes with the highest trading volume for AAPL today.&rdquo;</em></p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-red-400" />
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-red-500" /> Legacy JSON Flow
                </h4>
                <p className="text-sm text-slate-500 mb-4 font-medium uppercase tracking-wide">Context Window Bloat</p>
                <ol className="space-y-3 text-sm text-slate-600 mb-4">
                  <li>1. Model calls <code className="bg-slate-100 px-1 rounded text-xs font-mono">get_intraday_data(ticker=&quot;AAPL&quot;)</code></li>
                  <li>2. The API returns <strong>10,000 rows of JSON</strong>.</li>
                  <li>3. All 10,000 rows are injected directly into the LLM&apos;s context window.</li>
                </ol>
                <CodeSnippet language="json" code={`[
  {"time": "09:30", "vol": 14500, "price": 150.2},
  {"time": "09:31", "vol": 12200, "price": 150.4},
  ... 9,998 more rows ...
]`} />
                <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm font-semibold flex items-start gap-2 mt-4">
                  <span className="mt-0.5">⚠️</span>
                  <div>Cost: ~80,000 tokens. High probability of the model &ldquo;forgetting&rdquo; instructions or hallucinating the sort order.</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-emerald-600" /> Programmatic Flow
                </h4>
                <p className="text-sm text-slate-500 mb-4 font-medium uppercase tracking-wide">Sandbox Execution</p>
                <ol className="space-y-3 text-sm text-slate-600 mb-4">
                  <li>1. Model writes a Python script and sends it to the runtime sandbox.</li>
                  <li>2. The <em>sandbox</em> fetches the data and processes it locally using pandas.</li>
                  <li>3. Only the final <code className="bg-slate-100 px-1 rounded text-xs font-mono">print()</code> output is sent back to the LLM.</li>
                </ol>
                <CodeSnippet language="python" code={`import mcp_finance as fin
import pandas as pd

# Executed in secure sandbox
data = fin.get_intraday_data("AAPL")
df = pd.DataFrame(data)
top_3 = df.nlargest(3, 'vol')
print(top_3.to_json())`} />
                <div className="bg-emerald-100 text-emerald-800 p-3 rounded-lg text-sm font-semibold flex items-start gap-2 mt-4">
                  <span className="mt-0.5">✅</span>
                  <div>Cost: ~50 tokens. The model only reads the 3 rows it requested. 99.9% reduction in latency and token usage.</div>
                </div>
              </div>
            </div>
          </div>

          <ComparisonTable
            headers={["Metric", "JSON Tool Calling", "Programmatic Tool Calling"]}
            rows={[
              ["Execution Medium", "Parsed JSON objects mapped to host functions", "Turing-complete scripts (Python/TypeScript)"],
              ["Context Window", "High; all intermediate data passes through LLM", "Minimal; data processing occurs within sandbox"],
              ["Token Reduction", "Baseline (1x)", "85% to 98% reduction in token consumption"],
              ["System Latency", "High; requires network round-trips per step", "Low; loops/conditionals execute at runtime speed"],
            ]}
          />
        </section>

        {/* Phase 4: Agent Harnesses */}
        <section className="relative scroll-mt-24">
          <SectionHeader
            title="4. Modern Execution Environments"
            subtitle="Agent Harnesses and Agentic Skills"
            icon={Cpu}
            colorClass="bg-purple-100 text-purple-600"
            borderClass="bg-purple-500"
          />
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Frameworks vs. Runtimes vs. Harnesses</h3>
            <p className="text-slate-600 mb-6 text-lg">
              While frameworks (LangChain) provide basic orchestration loops and runtimes provide computational sandboxes, the <strong>Agent Harness</strong> is the holistic wrapper managing system instructions, dynamic tools, conversational state, and persistence over multiple autonomous turns through <em>Agentic Skills</em>.
            </p>
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
              <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center gap-3">
                <FileJson className="w-5 h-5 text-purple-400" />
                <span className="font-mono text-slate-200 font-semibold">SKILL.md Standard Directory Structure</span>
              </div>
              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-purple-400 font-mono text-sm mb-2 font-bold">Level 1 (Metadata)</div>
                  <p className="text-slate-300 text-sm">YAML frontmatter (<code className="text-purple-300 font-mono text-xs">name</code>, <code className="text-purple-300 font-mono text-xs">description</code>, <code className="text-purple-300 font-mono text-xs">compatibility</code>). Loads on initialization. Consumes ~100 tokens. Lets the agent know capabilities exist.</p>
                </div>
                <div>
                  <div className="text-purple-400 font-mono text-sm mb-2 font-bold">Level 2 (Instructions)</div>
                  <p className="text-slate-300 text-sm">Detailed markdown instructions, constraints, and logic pulled via bash call <em>only</em> when a request matches the description.</p>
                </div>
                <div>
                  <div className="text-purple-400 font-mono text-sm mb-2 font-bold">Level 3 (Assets)</div>
                  <p className="text-slate-300 text-sm">Execution scripts (Python, Bash) housed in <code className="text-purple-300 font-mono text-xs">scripts/</code> or <code className="text-purple-300 font-mono text-xs">references/</code>. Never loaded into context; executed directly by sandbox runtime.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 px-2">Sample Implementations</h3>
            <TutorialCard title="Cursor Agent Harness (IDE Focus)" icon={Code} colorAccent="bg-purple-500" bgColor="bg-purple-50">
              <p>Cursor orchestrates instructions while tuning for specific foundational models (e.g., knowing one model prefers <code className="bg-white px-1 rounded text-xs font-mono">grep</code> while another needs linter nudges).</p>
              <p><strong>Lifecycle Hooks:</strong> Defined in <code className="bg-white px-1 rounded text-xs font-mono">.cursor/hooks.json</code>. Intercepts checkpoints like <code className="bg-white px-1 rounded text-xs font-mono">beforeShellExecution</code> or <code className="bg-white px-1 rounded text-xs font-mono">preToolUse</code>. Background command-based scripts execute returning JSON; exit code <code className="bg-white px-1 rounded text-xs font-mono">0</code> is success, <code className="bg-white px-1 rounded text-xs font-mono">2</code> actively blocks the proposed action.</p>
            </TutorialCard>

            <TutorialCard title="The OpenClaw Architecture (Persistent Daemon)" icon={Clock} colorAccent="bg-purple-500" bgColor="bg-purple-50">
              <p>OpenClaw rejects ephemeral chat sessions, establishing a long-lived Node.js gateway locally. It operates a <strong>heartbeat scheduler</strong> (waking every 30 mins to review <code className="bg-white px-1 rounded text-xs font-mono">HEARTBEAT.md</code>) to run background tasks.</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 font-medium">
                <li><strong>Channel Adapters:</strong> WhatsApp (Baileys), Telegram (gramm Y), CLI.</li>
                <li><strong>Session Manager &amp; Queue System:</strong> Serializes multi-step tool invocations.</li>
                <li><strong>Agent Runtime:</strong> Dynamically assembles context from <code className="bg-white px-1 rounded text-xs font-mono">AGENTS.md</code>, <code className="bg-white px-1 rounded text-xs font-mono">SOUL.md</code>.</li>
                <li><strong>Control Plane:</strong> WebSocket API on port <code className="bg-white px-1 rounded text-xs font-mono">:18789</code> for global state.</li>
              </ul>
            </TutorialCard>

            <TutorialCard title="Claude Code CLI (Terminal Focus)" icon={Terminal} colorAccent="bg-purple-500" bgColor="bg-purple-50">
              <p className="mb-4">Anthropic&apos;s official CLI tool brings the agentic loop directly into the developer&apos;s native environment. Rather than acting as a simple autocomplete, it operates as an autonomous sub-agent capable of exploring file systems, running tests, and executing multi-step refactoring.</p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                  <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> The Agentic REPL Loop
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">Claude Code doesn&apos;t just guess an answer; it iteratively searches, reads, modifies, and verifies code. If a test fails, it reads the error and tries again without human prompting.</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2 items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 shrink-0" />
                      <span><strong>Native Tools:</strong> Built-in primitives like <code className="bg-slate-100 px-1 rounded text-xs font-mono">Bash</code>, <code className="bg-slate-100 px-1 rounded text-xs font-mono">Glob</code>, <code className="bg-slate-100 px-1 rounded text-xs font-mono">Grep</code>, <code className="bg-slate-100 px-1 rounded text-xs font-mono">FileRead</code>, and <code className="bg-slate-100 px-1 rounded text-xs font-mono">FileEdit</code>.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 shrink-0" />
                      <span><strong>Context Injection:</strong> Automatically understands Git state, uncommitted changes, and project structures.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                  <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Security &amp; Customization
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">Operates with a strict permission model and highly configurable project-level instructions.</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2 items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 shrink-0" />
                      <span><strong>allowed-tools:</strong> Defined in SKILL.md to limit privileges. A &ldquo;code-reviewer&rdquo; skill can explicitly allow only Read/Grep, denying file modification tools.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 shrink-0" />
                      <span><strong>Slash Commands:</strong> Explicit invocation using commands like <code className="bg-slate-100 px-1 rounded text-xs font-mono">/bugfix</code> or <code className="bg-slate-100 px-1 rounded text-xs font-mono">/test</code>, which trigger specialized prompts.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 shrink-0" />
                      <span><strong>Human Approval:</strong> Destructive bash commands are trapped and require the user to press &lsquo;Enter&rsquo; before execution.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TutorialCard>
          </div>

          {/* Integration section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-3 px-2">How Harnesses Orchestrate Everything Together</h3>
            <p className="text-slate-600 text-lg mb-8 px-2 max-w-4xl">
              A harness is not a replacement for MCP, function calling, or programmatic execution — it is the <strong>conductor</strong> that decides which tool to reach for and when. Each layer has a distinct role, and the harness composes them into a single coherent workflow.
            </p>

            {/* Flow diagram */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 mb-8">
              <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-8 text-center">Full-Stack Execution Flow — Single User Request</p>
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-slate-700 hidden md:block" />

                <div className="space-y-4">

                  {/* Step 1 */}
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center z-10">
                      <span className="text-purple-300 text-sm font-bold">1</span>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 p-5 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                      <div>
                        <p className="text-purple-300 font-bold text-sm mb-2">Harness / Skill</p>
                        <p className="text-slate-400 text-sm leading-relaxed">User prompt arrives. Harness loads YAML metadata (~100 tokens), runs semantic trigger matching, and JIT-injects the matching skill&apos;s <code className="text-purple-300 font-mono text-xs">instructions.md</code>. Sets the active tool allowlist for this request only.</p>
                      </div>
                      <div className="hidden md:block w-px bg-slate-700 self-stretch mx-2" />
                      <div className="bg-slate-900/60 rounded-xl px-4 py-3 text-xs font-mono text-purple-400 self-start">
                        Role: Context assembly &amp; routing<br />
                        <span className="text-slate-500">Output: enriched system prompt + tool allowlist</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center z-10">
                      <span className="text-blue-300 text-sm font-bold">2</span>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 p-5 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                      <div>
                        <p className="text-blue-300 font-bold text-sm mb-2">MCP Server</p>
                        <p className="text-slate-400 text-sm leading-relaxed">LLM calls a tool exposed by an MCP server (e.g., <code className="text-blue-300 font-mono text-xs">get_ticker_history</code>). The server fetches raw data from the exchange API and returns a structured JSON payload — but <em>not</em> directly into the LLM context.</p>
                      </div>
                      <div className="hidden md:block w-px bg-slate-700 self-stretch mx-2" />
                      <div className="bg-slate-900/60 rounded-xl px-4 py-3 text-xs font-mono text-blue-400 self-start">
                        Role: Standardized data access<br />
                        <span className="text-slate-500">Output: raw JSON payload → sandbox</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center z-10">
                      <span className="text-emerald-300 text-sm font-bold">3</span>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 p-5 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                      <div>
                        <p className="text-emerald-300 font-bold text-sm mb-2">Programmatic Sandbox</p>
                        <p className="text-slate-400 text-sm leading-relaxed">The LLM writes a Python script that ingests the MCP payload, runs pandas/numpy computations, and <code className="text-emerald-300 font-mono text-xs">print()</code>s only the summary. The sandbox executes it in isolation. 10,000 rows become 3 lines of output.</p>
                      </div>
                      <div className="hidden md:block w-px bg-slate-700 self-stretch mx-2" />
                      <div className="bg-slate-900/60 rounded-xl px-4 py-3 text-xs font-mono text-emerald-400 self-start">
                        Role: Token-efficient computation<br />
                        <span className="text-slate-500">Output: summary result → LLM context</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center z-10">
                      <span className="text-orange-300 text-sm font-bold">4</span>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 p-5 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                      <div>
                        <p className="text-orange-300 font-bold text-sm mb-2">Function Call</p>
                        <p className="text-slate-400 text-sm leading-relaxed">For simple, low-volume lookups (e.g., <code className="text-orange-300 font-mono text-xs">get_company_name(ticker)</code>), the harness permits a direct JSON function call. No sandbox needed — the result is small enough to pass through the context safely.</p>
                      </div>
                      <div className="hidden md:block w-px bg-slate-700 self-stretch mx-2" />
                      <div className="bg-slate-900/60 rounded-xl px-4 py-3 text-xs font-mono text-orange-400 self-start">
                        Role: Lightweight atomic lookups<br />
                        <span className="text-slate-500">Output: small JSON → LLM context directly</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-slate-500/30 border border-slate-500/40 flex items-center justify-center z-10">
                      <span className="text-slate-300 text-sm font-bold">5</span>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 p-5 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                      <div>
                        <p className="text-slate-300 font-bold text-sm mb-2">CLI / Hook</p>
                        <p className="text-slate-400 text-sm leading-relaxed">Before the final response is committed, a <code className="text-slate-300 font-mono text-xs">post_tool_use</code> lifecycle hook fires a CLI command (e.g., <code className="text-slate-300 font-mono text-xs">pytest</code>, <code className="text-slate-300 font-mono text-xs">ruff</code>). If it exits non-zero, the harness blocks and re-prompts the LLM with the error output.</p>
                      </div>
                      <div className="hidden md:block w-px bg-slate-700 self-stretch mx-2" />
                      <div className="bg-slate-900/60 rounded-xl px-4 py-3 text-xs font-mono text-slate-400 self-start">
                        Role: Compliance &amp; quality gates<br />
                        <span className="text-slate-500">Output: pass → response / fail → re-prompt</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Integration cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Network className="w-4 h-4 text-blue-500" /> Harness + MCP
                </h4>
                <p className="text-xs text-slate-500 mb-3">Data access layer</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The harness&apos;s skill YAML declares which MCP servers are required (<code className="bg-slate-100 px-1 rounded text-xs font-mono">mcp_servers: [quant-db, alpha-vantage]</code>). When the skill activates, the harness spins up only those servers — not all registered ones. This means a &ldquo;risk-analysis&rdquo; skill never accidentally exposes the trade-execution MCP server to the LLM.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-orange-500" /> Harness + Function Calling
                </h4>
                <p className="text-xs text-slate-500 mb-3">Selective schema injection</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Instead of injecting all 50 tool schemas globally, the harness injects only the schemas relevant to the active skill. A &ldquo;portfolio-rebalancer&rdquo; skill exposes <code className="bg-slate-100 px-1 rounded text-xs font-mono">get_weights</code> and <code className="bg-slate-100 px-1 rounded text-xs font-mono">set_allocation</code>. A &ldquo;news-analyst&rdquo; skill exposes <code className="bg-slate-100 px-1 rounded text-xs font-mono">search_filings</code>. Context stays lean regardless of how many tools exist in the registry.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-500" /> Harness + Programmatic Execution
                </h4>
                <p className="text-xs text-slate-500 mb-3">Sandbox delegation</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The skill&apos;s <code className="bg-slate-100 px-1 rounded text-xs font-mono">instructions.md</code> explicitly tells the LLM: <em>&ldquo;For any dataset &gt; 1,000 rows, write a Python script and execute it via the sandbox tool. Never paste raw data into your response.&rdquo;</em> The harness enforces this by only granting the <code className="bg-slate-100 px-1 rounded text-xs font-mono">sandbox_exec</code> tool — not a raw data-dump tool — in the active allowlist.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-500" /> Harness + CLI Hooks
                </h4>
                <p className="text-xs text-slate-500 mb-3">Lifecycle enforcement</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Hooks are the harness&apos;s immune system. A <code className="bg-slate-100 px-1 rounded text-xs font-mono">pre_tool_use</code> hook intercepts every bash call and blocks commands containing <code className="bg-slate-100 px-1 rounded text-xs font-mono">DROP TABLE</code> or live API keys. A <code className="bg-slate-100 px-1 rounded text-xs font-mono">post_tool_use</code> hook auto-runs <code className="bg-slate-100 px-1 rounded text-xs font-mono">ruff</code> on any generated Python. The LLM never bypasses these — they execute at the harness layer, below the model&apos;s awareness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 5: Demo */}
        <section className="relative scroll-mt-24">
          <SectionHeader
            title="5. Demo: Anatomy of an Agentic Skill"
            subtitle="Building a highly-scoped 'Database Architect' Skill"
            icon={Code}
            colorClass="bg-indigo-100 text-indigo-600"
            borderClass="bg-indigo-500"
          />
          <div className="text-lg text-slate-600 mb-8 max-w-4xl">
            To understand how Harnesses work in practice, let&apos;s look at a concrete implementation. We will build a <strong>Database Architect Skill</strong>. Instead of bloating our default system prompt with SQL constraints, we encapsulate them in a skill directory.
          </div>
          <div className="space-y-8">
            {/* File 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-900">skill.yaml (The Metadata)</h3>
                  <p className="text-sm text-indigo-700">Loaded into the context window at startup. Costs ~40 tokens.</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">The Harness reads this file to understand <em>when</em> to activate the skill. The <code className="bg-slate-100 px-1 rounded text-xs font-mono">triggers</code> array acts as semantic routing hooks.</p>
                <CodeSnippet language="yaml" code={`name: database-architect
description: Expert in PostgreSQL schema design, migrations, and query optimization.
version: 1.0.0
triggers:
  - "create a table"
  - "write a migration"
  - "optimize this query"
  - "database schema"
allowed_tools:
  - bash
  - file_read
  - file_write
  - psql_eval
env_vars_required:
  - DATABASE_URL`} />
              </div>
            </div>

            {/* File 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-900">instructions.md (The Payload)</h3>
                  <p className="text-sm text-indigo-700">Dynamically injected ONLY when a trigger is matched.</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">This contains the heavy, specialized prompt engineering. By keeping this out of the global prompt, we save thousands of idle tokens and prevent the model from getting confused by irrelevant instructions.</p>
                <CodeSnippet language="markdown" code={`# Role: Senior Database Architect
You are responsible for modifying the PostgreSQL database.

## Strict Constraints:
1. NEVER use destructive commands (DROP TABLE, DELETE) without explicit user confirmation.
2. All new tables MUST include id (UUID), created_at, and updated_at columns.
3. Indexes MUST be created concurrently (CREATE INDEX CONCURRENTLY).
4. Always write migrations in the /supabase/migrations directory
   using the format YYYYMMDDHHMMSS_name.sql.

## Execution Protocol:
When asked to create a schema:
1. Use file_read to check existing schemas in /migrations.
2. Write the new SQL file using file_write.
3. Use the psql_eval tool to run a dry-run syntax check against the local DB.`} />
              </div>
            </div>

            {/* File 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-900">harness.ts (The Orchestrator)</h3>
                  <p className="text-sm text-indigo-700">The core loop that manages the skill injection.</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">This is a simplified view of how an Agent Harness (like OpenClaw or an IDE) processes user input, detects the need for a skill, and alters the context dynamically before calling the LLM.</p>
                <CodeSnippet language="typescript" code={`import { loadSkills, semanticMatch } from './skill-manager';
import { callLLM } from './llm-provider';

async function processUserRequest(userPrompt: string, messageHistory: any[]) {
  // 1. Load lightweight YAML metadata for all installed skills
  const availableSkills = await loadSkills();
  let activeSystemPrompt = "You are a helpful coding assistant.";
  let activeTools = ["bash", "file_read"]; // Default tools

  // 2. Check if user prompt matches any skill triggers
  for (const skill of availableSkills) {
    if (semanticMatch(userPrompt, skill.triggers)) {
      console.log(\`[Harness] Activating Skill: \${skill.name}\`);
      // 3. Dynamically read the heavy markdown instructions
      const skillInstructions = await readFile(\`skills/\${skill.name}/instructions.md\`);
      // 4. Augment the context window
      activeSystemPrompt += \`\\n\\n---\\n\${skillInstructions}\`;
      activeTools = [...new Set([...activeTools, ...skill.allowed_tools])];
    }
  }

  // 5. Execute LLM with the highly specific, JIT-loaded context
  return await callLLM({
    system: activeSystemPrompt,
    messages: [...messageHistory, { role: "user", content: userPrompt }],
    tools: activeTools
  });
}`} />
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 text-indigo-900 flex items-start gap-4">
              <Zap className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <div>
                <strong className="block text-lg mb-1">Why this architecture wins:</strong>
                <p className="text-sm leading-relaxed text-indigo-800">
                  If the user asks &ldquo;How do I center a div?&rdquo;, the Harness skips the Database Architect skill entirely. The model responds instantly using a tiny default context. If the user asks &ldquo;Add a users table&rdquo;, the Harness injects the strict SQL constraints and grants access to the <code className="bg-white px-1 rounded text-xs font-mono">psql_eval</code> tool. <strong>This guarantees high precision without context bloat.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Skill chaining section */}
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">How Skills Chain: Using Prompts to Decide the Next Skill</h3>
              <p className="text-slate-600 text-lg max-w-4xl">
                A single skill rarely completes a complex task alone. The real power emerges when a skill&apos;s <code className="bg-slate-100 px-1 rounded text-xs font-mono">instructions.md</code> explicitly tells the LLM <em>which skill to invoke next</em> based on what it finds — turning a flat list of skills into a dynamic decision tree.
              </p>
            </div>

            {/* Concept explanation */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-600" /> The Mechanism
                </h4>
                <p className="text-sm text-indigo-800 leading-relaxed mb-3">
                  Each skill&apos;s <code className="bg-white px-1 rounded text-xs font-mono">instructions.md</code> ends with a <strong>routing block</strong> — a conditional section that tells the LLM: &ldquo;If you find X, your next action is to invoke skill Y by emitting this exact phrase.&rdquo; The harness watches the LLM&apos;s output stream for these trigger phrases and activates the next skill automatically.
                </p>
                <p className="text-sm text-indigo-800 leading-relaxed">
                  This is not magic — it is structured prompt engineering. The LLM is instructed to be explicit about its intent, and the harness is wired to act on that intent.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <GitMerge className="w-4 h-4 text-slate-600" /> Why Not Just One Big Skill?
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Combining all logic into one skill bloats the context window and degrades precision. A &ldquo;data-fetcher&rdquo; skill has no business knowing SQL migration rules. Keeping skills small and single-purpose means each one is injected only when needed — and evicted the moment it is done.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Chaining also enables <strong>conditional branching</strong>: the path taken depends on what the previous skill actually found, not what was assumed upfront.
                </p>
              </div>
            </div>

            {/* Worked example */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h4 className="font-bold text-slate-900">Worked Example: &ldquo;Analyse AAPL earnings and flag any risk&rdquo;</h4>
                <p className="text-sm text-slate-500 mt-1">Three skills chain automatically from a single user prompt</p>
              </div>
              <div className="p-6 space-y-0">

                {/* Chain step A */}
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                      <span className="text-blue-700 font-bold text-xs">A</span>
                    </div>
                    <div className="w-0.5 h-full bg-slate-200 mt-1 mb-1 min-h-[2rem]" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-slate-900 text-sm">skill: earnings-fetcher</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">triggered by: &ldquo;analyse earnings&rdquo;</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Calls the MCP server to pull the last 4 quarters of AAPL earnings transcripts. Extracts revenue, EPS, and guidance figures into a structured JSON summary.</p>
                    <div className="bg-slate-900 rounded-xl overflow-hidden">
                      <div className="bg-slate-800 px-4 py-1.5 text-xs font-mono text-slate-400">earnings-fetcher/instructions.md — routing block</div>
                      <pre className="p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap">{`## After completing data extraction:
- If revenue growth YoY < 5%: emit "INVOKE: risk-assessor — slow growth detected"
- If guidance was revised downward: emit "INVOKE: risk-assessor — guidance cut detected"  
- If all metrics are within normal range: emit "INVOKE: report-writer — data clean"
- Always pass the extracted JSON as context to the next skill.`}</pre>
                    </div>
                  </div>
                </div>

                {/* Chain step B */}
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
                      <span className="text-orange-700 font-bold text-xs">B</span>
                    </div>
                    <div className="w-0.5 h-full bg-slate-200 mt-1 mb-1 min-h-[2rem]" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-slate-900 text-sm">skill: risk-assessor</span>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">triggered by: harness detecting &ldquo;INVOKE: risk-assessor&rdquo;</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Injected only because the previous skill flagged a condition. Runs a programmatic sandbox script to compute VaR, max drawdown delta, and compares guidance cut magnitude against historical precedents.</p>
                    <div className="bg-slate-900 rounded-xl overflow-hidden">
                      <div className="bg-slate-800 px-4 py-1.5 text-xs font-mono text-slate-400">risk-assessor/instructions.md — routing block</div>
                      <pre className="p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap">{`## After completing risk scoring:
- If risk_score > 7: emit "INVOKE: report-writer — HIGH RISK — include risk section"
- If risk_score 4-7: emit "INVOKE: report-writer — MODERATE RISK — summarise flags"
- If risk_score < 4: emit "INVOKE: report-writer — LOW RISK — brief mention only"
- Attach risk_score and flag_list to context for report-writer.`}</pre>
                    </div>
                  </div>
                </div>

                {/* Chain step C */}
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-xs">C</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-slate-900 text-sm">skill: report-writer</span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">triggered by: harness detecting &ldquo;INVOKE: report-writer&rdquo;</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Receives the earnings JSON and risk context from the shared state. Formats a structured investment memo with the appropriate risk section depth based on the flag passed by the risk-assessor. The final output is the only thing the user ever sees.</p>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
                      <strong>Key insight:</strong> The report-writer skill never ran any data fetching or risk math. It only knows how to write. Each skill stayed in its lane — and the harness stitched them together based entirely on what the LLM emitted in its output.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Rules for good chaining */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Rules for Reliable Skill Chaining
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <p className="text-indigo-300 font-bold text-xs font-mono mb-2">1. Explicit emit phrases</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Use a fixed, unambiguous prefix like <code className="text-indigo-300">INVOKE:</code> that the harness regex-matches. Never rely on the LLM to &ldquo;naturally&rdquo; say the right thing — constrain it.</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <p className="text-emerald-300 font-bold text-xs font-mono mb-2">2. Pass state explicitly</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Each skill must be instructed to attach its output to a shared context object. The next skill reads from that object — it never re-fetches data the previous skill already retrieved.</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <p className="text-orange-300 font-bold text-xs font-mono mb-2">3. Define a terminal condition</p>
                  <p className="text-slate-400 text-xs leading-relaxed">Every chain must have a skill that emits no further <code className="text-orange-300">INVOKE:</code> — the report-writer above. Without a terminal node, the harness can loop indefinitely.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Phase 6: Finance Applications */}
        <section className="relative scroll-mt-24">
          <SectionHeader
            title="6. Applications in Finance"
            subtitle="Quantitative Research and Algorithmic Execution"
            icon={TrendingUp}
            colorClass="bg-cyan-100 text-cyan-600"
            borderClass="bg-cyan-500"
          />
          <div className="text-lg text-slate-600 mb-8 max-w-4xl">
            The financial sector — characterized by massive unstructured datasets, strict regulatory boundaries, and demand for low latency — is the ultimate proving ground. Traditional LLMs make poor quantitative traders, but programmatic harnesses change everything.
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
            <div className="bg-cyan-50 px-6 py-4 border-b border-cyan-100 flex items-center gap-3">
              <Database className="w-6 h-6 text-cyan-600" />
              <h3 className="text-xl font-bold text-cyan-900">The Quantitative Data Layer (MCP Servers)</h3>
            </div>
            <ComparisonTable
              headers={["Provider", "Protocol", "Key Tools Exposed", "Primary Use Case"]}
              rows={[
                ["Alpha Vantage", "HTTP/STDIO", "TIME_SERIES, REALTIME_OPTIONS, EARNINGS_TRANSCRIPT", "Real-time pricing, greeks, sentiment via TOOL_CALL wrapper"],
                ["Financial Datasets", "HTTP", "get_income_statements, get_company_news", "Fundamental analysis & corporate filings"],
                ["EODHD", "HTTP", "get_us_tick_data, get_mp_illio_market_insights", "Macro forecasting, tick data, beta band distributions"],
                ["Octagon AI", "HTTP", "SEC filings, private market insights", "Institutional equity research gathering"],
                ["QuantConnect", "HTTP", "Historical Data access, Backtesting Engine", "Strategy transition from research to live brokerage"],
              ]}
            />
          </div>

          <div className="space-y-8 mb-10">
            <TutorialCard title="Agentic Quantitative Skills" icon={Calculator} colorAccent="bg-cyan-500">
              <p className="text-lg mb-6">
                Traditional LLMs fail at quantitative finance because text prediction cannot reliably perform complex mathematics. <strong>Agentic Quantitative Skills</strong> solve this by forcing the LLM to write, execute, and iterate on Python code natively within a secure sandbox (Programmatic Tool Calling), offloading the math to libraries like <code className="bg-slate-100 px-1 rounded text-xs font-mono">pandas</code>, <code className="bg-slate-100 px-1 rounded text-xs font-mono">numpy</code>, and <code className="bg-slate-100 px-1 rounded text-xs font-mono">scipy</code>.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <LineChart className="w-4 h-4 text-cyan-600" /> The Execution Pipeline
                  </h4>
                  <ol className="space-y-4 text-sm text-slate-700 relative border-l border-cyan-200 ml-2 pl-4">
                    <li className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-white"></div>
                      <strong>Data Ingestion:</strong> The agent writes code to fetch 10 years of OHLCV data via an MCP Resource (e.g., EODHD).
                    </li>
                    <li className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-white"></div>
                      <strong>Feature Engineering:</strong> It dynamically calculates rolling Z-scores, MACD, and Bollinger Bands using <code className="bg-slate-100 px-1 rounded text-xs font-mono">pandas_ta</code>.
                    </li>
                    <li className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-white"></div>
                      <strong>Statistical Validation:</strong> Runs ADF (Augmented Dickey-Fuller) tests for cointegration in pairs trading strategies.
                    </li>
                    <li className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-white"></div>
                      <strong>Metric Generation:</strong> Calculates Maximum Drawdown, Value at Risk (VaR), and Sharpe ratio.
                    </li>
                  </ol>
                </div>
                <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-inner">
                  <h4 className="font-mono text-cyan-400 text-sm mb-3 border-b border-slate-700 pb-2">skill-quant-analyst/</h4>
                  <ul className="font-mono text-xs text-slate-300 space-y-2">
                    <li className="flex items-center gap-2"><FileJson className="w-3 h-3 text-slate-500" /> skill.yaml <span className="text-slate-500 italic"># Invocation trigger</span></li>
                    <li className="flex items-center gap-2"><BookOpen className="w-3 h-3 text-slate-500" /> instructions.md <span className="text-slate-500 italic"># Enforces strict math</span></li>
                    <li className="pl-4 text-cyan-300">scripts/</li>
                    <li className="pl-8 flex items-center gap-2"><Code className="w-3 h-3 text-slate-500" /> backtest_engine.py <span className="text-slate-500 italic"># Sandbox target</span></li>
                    <li className="pl-8 flex items-center gap-2"><Code className="w-3 h-3 text-slate-500" /> risk_metrics.py</li>
                    <li className="pl-4 text-cyan-300">requirements.txt <span className="text-slate-500 italic"># statsmodels, pandas</span></li>
                  </ul>
                  <div className="mt-4 p-2 bg-slate-800 rounded text-xs text-slate-400">
                    * The agent never tries to guess the Sharpe ratio. It executes <code className="text-cyan-300">risk_metrics.py</code> and reads the standard output.
                  </div>
                </div>
              </div>
            </TutorialCard>

            <TutorialCard title="Multi-Agent Collaboration (FinRobot & LangGraph architectures)" icon={Users} colorAccent="bg-cyan-500">
              <p className="text-lg mb-6">
                Institutional complexity exceeds the capability of a single foundational model, no matter how large the context window. Modern financial AI leverages <strong>Multi-Agent Systems (MAS)</strong>, inspired by frameworks like FinRobot, where specialized sub-agents operate under a central orchestrator using shared memory and StateGraphs.
              </p>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 flex flex-col h-full">
                  <div className="w-8 h-8 rounded-full bg-cyan-200 text-cyan-800 flex items-center justify-center font-bold mb-3 shadow-sm">1</div>
                  <h5 className="font-bold text-cyan-900 mb-2">Supervisor Agent</h5>
                  <p className="text-xs text-cyan-800 leading-relaxed flex-grow">Receives the user intent (e.g., &ldquo;Analyze semiconductor supply chains&rdquo;). Breaks down the task, creates an execution plan, and routes sub-tasks to specialized agents.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold mb-3 shadow-sm">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-slate-900 mb-2">Data &amp; News Agent</h5>
                  <p className="text-xs text-slate-600 leading-relaxed flex-grow">Uses RAG and MCP to pull 10-K filings, earnings transcripts, and realtime news. Performs NLP sentiment analysis (FinBERT) to score qualitative market narratives.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold mb-3 shadow-sm">
                    <LineChart className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-slate-900 mb-2">Quantitative Agent</h5>
                  <p className="text-xs text-slate-600 leading-relaxed flex-grow">Receives historical data. Writes programmatic code to generate Discounted Cash Flow (DCF) models, Enterprise Value multiples, and backtests technical strategies.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold mb-3 shadow-sm">
                    <FileBarChart className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-slate-900 mb-2">Report Agent</h5>
                  <p className="text-xs text-slate-600 leading-relaxed flex-grow">Ingests the JSON state emitted by the News and Quant agents. Synthesizes conflicting data points into a cohesive, institutional-grade markdown investment memo.</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 flex items-start gap-3 mt-6">
                <Network className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <p><strong>State Management:</strong> These agents do not just chat; they pass a strictly typed <code className="bg-slate-100 px-1 rounded text-xs font-mono">State</code> object (often via LangGraph). If the Risk Agent flags that the Quant Agent&apos;s portfolio violates a volatility constraint, the state is passed back to the Quant Agent with an error flag, forcing a recalculation <em>before</em> the final report is generated.</p>
              </div>
            </TutorialCard>
          </div>
        </section>

        {/* Phase 7: Security */}
        <section className="relative scroll-mt-24">
          <SectionHeader
            title="7. Security & Governance"
            subtitle="Hardening Autonomous Systems"
            icon={ShieldCheck}
            colorClass="bg-red-100 text-red-600"
            borderClass="bg-red-500"
          />
          <div className="bg-red-50 p-8 rounded-3xl shadow-sm border border-red-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-red-900 mb-3 text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Strict Containment &amp; Secrets
                </h4>
                <p className="text-red-800 text-sm leading-relaxed mb-4">
                  As agents write/execute native code, boundaries become porous. Sandboxes must be hardened against unauthorized network access. Keys must be in secure vaults and rotated regularly — never exposed to the prompt.
                </p>
                <p className="text-red-800 text-sm leading-relaxed">
                  Skills use flags like <code className="bg-white px-1 rounded text-xs font-mono">disable-model-invocation: true</code> to ensure critical files are gated by explicit human triggers.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-red-900 mb-3 text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" /> Evaluation &amp; Policy (HITL)
                </h4>
                <p className="text-red-800 text-sm leading-relaxed mb-4">
                  Agents traverse non-linear workflows, making static unit testing obsolete. Continuous multivariate testing (simulating multi-turn financial scenarios) is mandatory for evaluating regulatory compliance.
                </p>
                <p className="text-red-800 text-sm leading-relaxed">
                  <strong>Agent OS Governance</strong> enforces kernel-level deterministic policy and immutable audit logs. High-stakes deployments always require Human-in-the-Loop (HITL) approval.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Architectural Synthesis */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-32 mb-16 relative">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-14 shadow-2xl overflow-hidden relative border border-slate-800">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/10 to-cyan-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="mb-14 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 mb-6 border border-blue-500/30 shadow-inner">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">Architectural Synthesis</h2>
              <p className="text-xl text-slate-300 font-medium max-w-3xl leading-relaxed">
                The evolution of AI harnesses represents a fundamental shift from probabilistic chatbots to <span className="text-blue-400">deterministic, autonomous institutional infrastructure</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-7 rounded-2xl hover:bg-slate-800 transition-colors">
                <Lightbulb className="w-8 h-8 text-yellow-400 mb-5" />
                <h4 className="text-lg text-white font-bold mb-3">1. The Context Economy</h4>
                <p className="text-slate-400 text-sm leading-relaxed">By deferring massive system prompts into modular <code className="text-yellow-300 font-mono text-xs">SKILL.md</code> files, systems maintain razor-sharp reasoning. Idle context cost drops to near-zero, enabling infinite horizontal scalability of agent capabilities without degrading performance.</p>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-7 rounded-2xl hover:bg-slate-800 transition-colors">
                <GitMerge className="w-8 h-8 text-emerald-400 mb-5" />
                <h4 className="text-lg text-white font-bold mb-3">2. Universal Interoperability</h4>
                <p className="text-slate-400 text-sm leading-relaxed">MCP establishes the &ldquo;USB-C standard&rdquo; for AI. Instead of writing brittle, custom API integrations per model, a single standardized server exposes data securely to any compliant harness (Cursor, Claude Desktop, OpenClaw).</p>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-7 rounded-2xl hover:bg-slate-800 transition-colors">
                <Rocket className="w-8 h-8 text-blue-400 mb-5" />
                <h4 className="text-lg text-white font-bold mb-3">3. Turing-Complete Action</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Models no longer guess at static JSON schemas. They write, compile, and execute Python or TypeScript natively in isolated runtimes. This formally shifts the paradigm from &ldquo;predicting answers&rdquo; to &ldquo;calculating truths&rdquo;.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">The Evolutionary Matrix</h3>
            <div className="space-y-4 mb-16">

              {/* Row 1: Legacy */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0"></span>
                  <span className="font-bold text-slate-200 text-base">Legacy Function Calling</span>
                  <span className="ml-auto text-xs text-slate-500 font-mono uppercase tracking-wider">mid-2023</span>
                </div>
                <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mechanism</p>
                    <p className="text-sm text-slate-300">Strict JSON Schema injected into the system prompt. The model acts as a semantic router, outputting a structured object that the host application maps to a real function call.</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">✓ Pros</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 marker:text-emerald-500">
                      <li>Simple to implement — just define a JSON schema</li>
                      <li>Highly predictable, deterministic output format</li>
                      <li>Works with any LLM that supports the tools API</li>
                    </ul>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">✗ Cons</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 marker:text-red-400">
                      <li>Every tool schema is injected on <em>every</em> turn — 50 tools = massive token burn</li>
                      <li>One network round-trip per action; sequential chains are slow</li>
                      <li>Raw API responses flood the context window (e.g., 10k rows of tick data)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Row 2: MCP */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0"></span>
                  <span className="font-bold text-slate-200 text-base">Model Context Protocol (MCP)</span>
                  <span className="ml-auto text-xs text-slate-500 font-mono uppercase tracking-wider">late 2024</span>
                </div>
                <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mechanism</p>
                    <p className="text-sm text-slate-300">JSON-RPC over STDIO or HTTP+SSE. Decouples the LLM host from data servers via a universal protocol — any compliant server works with any compliant client, eliminating N-to-N custom integrations.</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">✓ Pros</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 marker:text-emerald-500">
                      <li>Write one server, use it with Cursor, Claude Desktop, any harness</li>
                      <li>STDIO transport is fully local — no network exposure for sensitive data</li>
                      <li>Resources &amp; Prompts reduce repetitive prompt engineering</li>
                    </ul>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">✗ Cons</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 marker:text-red-400">
                      <li>Inherits the token bloat problem — large payloads still pass through the LLM</li>
                      <li>Server lifecycle management adds operational overhead</li>
                      <li>HTTP+SSE transport introduces latency and auth complexity in cloud deployments</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Row 3: Programmatic */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="font-bold text-slate-200 text-base">Programmatic Tool Calling</span>
                  <span className="ml-auto text-xs text-slate-500 font-mono uppercase tracking-wider">2025 — Claude 4.6</span>
                </div>
                <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mechanism</p>
                    <p className="text-sm text-slate-300">The model writes Turing-complete Python or TypeScript. An isolated sandbox (V8 isolate / Daytona container) executes the code, processes data locally, and returns only the final result to the LLM.</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">✓ Pros</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 marker:text-emerald-500">
                      <li>85–98% token reduction — only the output reaches the LLM, not raw data</li>
                      <li>Loops, conditionals, and math execute at CPU speed, not LLM inference speed</li>
                      <li>Progressive tool discovery avoids upfront schema bloat entirely</li>
                    </ul>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">✗ Cons</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 marker:text-red-400">
                      <li>Sandbox provisioning adds infrastructure complexity and cold-start latency</li>
                      <li>Generated code can have subtle bugs — requires robust error-feedback loops</li>
                      <li>Security hardening of the execution environment is non-trivial</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Row 4: Harnesses — highlighted */}
              <div className="rounded-2xl border border-blue-500/50 bg-slate-800/80 overflow-hidden ring-1 ring-blue-500/30">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-500/30 bg-blue-900/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0"></span>
                  <span className="font-bold text-blue-200 text-base">Agent Harnesses &amp; Skills</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">Current Best Practice</span>
                  <span className="ml-auto text-xs text-slate-500 font-mono uppercase tracking-wider">2025–present</span>
                </div>
                <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mechanism</p>
                    <p className="text-sm text-slate-300">JIT skill loading — only the YAML metadata (~100 tokens) is always present. Full instructions and execution scripts are injected dynamically when a semantic trigger matches, then evicted after the task completes.</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">✓ Pros</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 marker:text-emerald-500">
                      <li>Zero idle context cost — irrelevant skills never consume tokens</li>
                      <li>Lifecycle hooks enforce compliance gates before any tool executes</li>
                      <li>Persistent daemons enable proactive, scheduled, and event-driven workflows</li>
                      <li>Composable — stack multiple skills without degrading reasoning quality</li>
                    </ul>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">✗ Cons</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 marker:text-red-400">
                      <li>Higher upfront engineering cost to author and maintain skill libraries</li>
                      <li>Semantic trigger matching can misfire on ambiguous user prompts</li>
                      <li>Persistent daemon architecture requires robust process supervision (e.g., PM2)</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 border border-slate-700 shadow-inner">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Cpu className="w-6 h-6 text-purple-400" /> The Next Frontier
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-purple-100 block mb-2 text-lg">Hierarchical Swarms</strong>
                    <p className="text-slate-400 text-sm leading-relaxed">Moving beyond single-agent loops into vast organizational charts of AI. Supervisor agents will delegate to specialized sub-agents, orchestrating parallel workflows via persistent, shared state graphs (like LangGraph).</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-emerald-100 block mb-2 text-lg">Verifiable Execution</strong>
                    <p className="text-slate-400 text-sm leading-relaxed">As agents are entrusted with institutional capital, execution layers will integrate with Trusted Execution Environments (TEEs) and cryptographic proofs, ensuring an agent&apos;s logic cannot be tampered with mid-flight.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Doc CTA */}
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Read the Full Research Paper</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">Access the complete research document with extended architecture diagrams, MCP configuration templates, and detailed implementation guides for quantitative finance systems.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={GOOGLE_DOC}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-800 transition-colors duration-300"
            >
              <ExternalLink className="inline mr-2 h-5 w-5" />
              Read Full Research Paper
            </a>
            {currentArticle?.podcastUrl && (
              <a
                href={currentArticle.podcastUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
              >
                <Music className="inline mr-2 h-5 w-5" />
                Listen to Podcast
              </a>
            )}
          </div>
        </div>

      </div>
    </ArticleFrame>
  );
}
