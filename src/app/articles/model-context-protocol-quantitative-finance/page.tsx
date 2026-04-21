'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Activity, Database, ShieldCheck, Cpu, Layers, Code,
  Zap, Server, LayoutDashboard, Terminal, CheckCircle2, AlertCircle,
  ExternalLink, FileText,
} from 'lucide-react';
import { Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// ─── Reusable Components ───────────────────────────────────────────────────────

const colorMap: Record<string, string> = {
  indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  rose: 'text-rose-600 bg-rose-50 border-rose-100',
  amber: 'text-amber-600 bg-amber-50 border-amber-100',
  sky: 'text-sky-600 bg-sky-50 border-sky-100',
  violet: 'text-violet-600 bg-violet-50 border-violet-100',
};

const Section = ({
  title,
  icon: Icon,
  children,
  color = 'indigo',
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  color?: string;
}) => {
  const headerColors = colorMap[color] || colorMap.indigo;
  const [bg, border, iconText] = headerColors.split(' ');
  return (
    <section className="mb-16 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className={`px-8 py-6 border-b flex items-center gap-4 ${bg} ${border}`}>
        <div className={`p-3 bg-white rounded-xl shadow-sm ${iconText}`}>
          <Icon size={28} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="p-8 md:p-10 space-y-6 text-slate-600 leading-relaxed text-lg">
        {children}
      </div>
    </section>
  );
};

const Card = ({
  title,
  description,
  highlight,
  color = 'blue',
}: {
  title: string;
  description: string;
  highlight?: string;
  color?: string;
}) => {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-emerald-50 border-emerald-200',
    orange: 'bg-orange-50 border-orange-200',
    purple: 'bg-purple-50 border-purple-200',
  };
  const textColors: Record<string, string> = {
    blue: 'text-blue-700',
    green: 'text-emerald-700',
    orange: 'text-orange-700',
    purple: 'text-purple-700',
  };
  return (
    <div className={`p-6 rounded-2xl border ${bgColors[color]} hover:-translate-y-1 transition-transform duration-300`}>
      <h3 className={`text-xl font-bold mb-3 ${textColors[color]}`}>{title}</h3>
      <p className="text-slate-700 mb-4">{description}</p>
      {highlight && (
        <div className="mt-auto inline-block px-3 py-1 bg-white rounded-full text-sm font-semibold shadow-sm text-slate-600">
          {highlight}
        </div>
      )}
    </div>
  );
};

const Callout = ({
  title,
  children,
  type = 'info',
}: {
  title: string;
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success';
}) => {
  const styles: Record<string, string> = {
    info: 'border-blue-300 bg-blue-50 text-blue-900',
    warning: 'border-amber-300 bg-amber-50 text-amber-900',
    success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  };
  const Icon = type === 'warning' ? AlertCircle : CheckCircle2;
  return (
    <div className={`p-6 rounded-2xl border-l-4 ${styles[type]}`}>
      <div className="flex items-center gap-3 mb-2 font-bold">
        <Icon size={20} />
        <h4>{title}</h4>
      </div>
      <div className="text-opacity-90">{children}</div>
    </div>
  );
};

const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <div className="rounded-2xl overflow-hidden bg-slate-900 shadow-lg my-6">
    <div className="flex items-center px-4 py-2 bg-slate-800 text-slate-400 text-xs font-mono border-b border-slate-700">
      <Terminal size={14} className="mr-2" />
      {language.toUpperCase()}
    </div>
    <pre className="p-6 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function McpQuantFinancePage() {
  const currentArticle = articles.find(
    (a) => a.slug === 'model-context-protocol-quantitative-finance'
  );
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const infographicUrl = 'https://i.imgur.com/d1fcUzy.png';
  const googleDocUrl =
    'https://docs.google.com/document/d/e/2PACX-1vScLUqi2s9JY-4AM3YeJDQsZw2zEs--j9ocLVE_BPdWL8jaxTCrlavQF3OFJ0Tds9NM8HnEi0caTv2a/pub';

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200 selection:text-indigo-900">
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
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-br from-indigo-50/80 via-sky-50/60 to-emerald-50/60 -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] -z-10" />
      <div className="absolute top-12 -left-12 w-72 h-72 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-[100px] -z-10" />

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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-sm font-semibold text-indigo-600 mb-8">
          <Zap size={16} fill="currentColor" />
          Interactive Protocol Tutorial
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Model Context Protocol in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
            Quantitative Finance
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          A comprehensive guide to System Architecture, State Management, and Interactive Agent Design
          for financial enterprise ecosystems.
        </p>
      </header>

      {/* Infographic */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img
            src={infographicUrl}
            alt="Model Context Protocol in Quantitative Finance Infographic"
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
        alt="Model Context Protocol in Quantitative Finance Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pb-24">

        {/* Intro */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 mb-16 text-slate-600 leading-relaxed text-lg space-y-6">
          <p className="text-xl text-slate-800 font-medium">
            The integration of Large Language Models (LLMs) into quantitative finance, enterprise trading
            systems, and rigorous data analysis environments has historically been constrained by the
            profound fragmentation of application programming interfaces (APIs).
          </p>
          <p>
            Often characterized metaphorically as the <strong>&ldquo;USB-C for AI agents,&rdquo;</strong> MCP
            operates as an open, standardized protocol that standardizes the integration of external context.
            While LSP (Language Server Protocol) is primarily a reactive system responding to explicit human
            inputs, MCP is fundamentally agent-centric — designed to support autonomous workflows where
            language models must reason, select appropriate tools, and iteratively chain actions together to
            achieve complex analytical objectives.
          </p>
          <Callout title="The ROI of MCP in Finance" type="success">
            Financial institutions deploying MCP have reported remarkable outcomes, including average
            productivity gains of 20% resulting from AI automation, with certain organizations recording a
            333% return on investment over a three-year horizon. It transforms AI deployment from a severe
            compliance vulnerability into a rigorously managed, zero-trust system.
          </Callout>
        </div>

        {/* Section 1 – Ecosystem & Workflow */}
        <Section title="Ecosystem &amp; Workflow Automation" icon={Activity} color="indigo">
          <p>
            The deployment of MCP within quantitative finance necessitates profound, low-latency integration
            with existing algorithmic trading libraries, time-series data feeds, and institutional execution
            engines.
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-6">
            Algorithmic Backtesting Frameworks
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              color="blue"
              title="VectorBT"
              description="Array-based architecture, fully vectorized utilizing NumPy and Numba for Just-In-Time (JIT) compilation."
              highlight="Massive parameter sweeps"
            />
            <Card
              color="green"
              title="Zipline"
              description="Event-driven simulation engine, historically aligned with the Quantopian ecosystem. Simulates realistic slippage."
              highlight="Live-trading transition"
            />
            <Card
              color="purple"
              title="Backtrader"
              description="Event-driven, highly flexible framework boasting extensive built-in technical indicator support."
              highlight="Multi-indicator building"
            />
          </div>

          <p className="mt-6">
            Through an MCP interface, an LLM can be instructed to conduct an entire quantitative lifecycle.
            Advanced skills enable the implementation of standardized performance metrics, calculating Sharpe
            ratios, maximum drawdowns, and executing rigorous out-of-sample walk-forward analyses.
          </p>
        </Section>

        {/* Section 2 – Massive Datasets */}
        <Section title="Architecting for Scale: Massive Datasets" icon={Database} color="emerald">
          <p>
            Perhaps the most formidable architectural challenge is mitigating the strict constraints of the
            language model context window. Financial data payloads can instantly exhaust available tokens.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
                <Layers size={20} className="text-emerald-500" />
                Context Compaction
              </h4>
              <p className="text-base">
                Servers must prioritize highly compact contexts. When returning wide schemas, servers
                implement automated downsampling, pagination hints, and intelligent truncation. A critical
                best practice is explicit &ldquo;result provenance&rdquo; metadata.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3">
                <Code size={20} className="text-emerald-500" />
                The Surrogate File Pattern
              </h4>
              <p className="text-base">
                Instead of returning a monolithic, gigabyte-sized result string, the tool writes it to a
                local file or object storage and returns a highly compressed response to the LLM with
                instructions to use a specialized <code className="bg-slate-100 px-1 rounded">read_chunk</code> tool.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Streaming Partial Updates</h3>
          <p>
            For long-running models such as Monte Carlo simulations, MCP supports incremental streaming via
            standard Server-Sent Events (SSE) or WebSockets to transmit partial results.
          </p>
          <CodeBlock
            language="json"
            code={`{
  "jsonrpc": "2.0",
  "method": "tool/resultChunk",
  "params": {
    "toolCallId": "uuid-of-request",
    "sequenceId": "uuid-for-this-execution",
    "stepId": "monte_carlo_phase_1",
    "index": 0,
    "content": { /* quantitative data */ },
    "final": false,
    "elapsedMs": 2450
  }
}`}
          />
        </Section>

        {/* Section 3 – Stateful Architecture */}
        <Section title="Stateful Architecture &amp; Memory" icon={Server} color="rose">
          <p>
            Unlike traditional REST APIs, advanced AI workflows require profound continuity. An AI agent
            tasked with conducting a forensic audit must retain memory and learn dynamically over sessions
            spanning hours.
          </p>

          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <div className="flex-1 bg-white border border-rose-100 p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-rose-500">
                <Cpu size={64} />
              </div>
              <h4 className="text-xl font-bold text-rose-700 mb-3">L1: Process-Bound Memory</h4>
              <p className="text-base relative z-10">
                Data is stored directly within the MCP server&apos;s active process memory utilizing
                dictionaries or local variables. Provides ultra-fast, sub-millisecond retrieval times.
                However, it is ephemeral — data is lost if the server process restarts.
              </p>
            </div>
            <div className="flex-1 bg-rose-600 text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
                <Layers size={64} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">L2: Distributed Multi-Graph</h4>
              <p className="text-base text-rose-100 relative z-10">
                Migrates state to external, distributed caching layers (Redis / Vector DBs). Advanced
                servers like MemCP bifurcate storage into &ldquo;Memory&rdquo; (insights) and
                &ldquo;Contexts&rdquo; (massive artifacts), routing the model back to relevant files and
                optimizing token burn.
              </p>
            </div>
          </div>
        </Section>

        {/* Section 4 – Session-Aware Primitives */}
        <Section title="Session-Aware Primitives" icon={Cpu} color="amber">
          <p>
            Successful stateful connection unlocks three extraordinarily powerful client capabilities:{' '}
            <strong>Elicitation</strong>, <strong>Sampling</strong>, and{' '}
            <strong>Progress Notifications</strong>.
          </p>

          <div className="space-y-6 mt-8">
            <Callout title="1. Elicitation: Human-in-the-Loop" type="info">
              Enables an MCP server to pause execution mid-tool call to proactively request structured
              input or explicit authorization from the human user. Used for confirming live market orders
              or OAuth2 flows.
            </Callout>

            <Callout title="2. Sampling: Reversing Dependencies" type="info">
              Allows the server to tap into the intelligence of the client&apos;s already-connected LLM.
              The client controls which model to deploy, distributing operational costs and allowing for
              sophisticated nested agentic loops.
            </Callout>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-3">
                <Activity size={20} />
                3. Progress Notifications
              </h4>
              <p className="text-base text-amber-800 mb-4">
                The MCP specification provides native, optional progress tracking for long-running
                operations. The client intercepts these asynchronous emissions to render real-time
                progress bars.
              </p>
              <CodeBlock
                language="python"
                code={`# Example of setting an MCP progress handler
async def progress_handler(
    progress: float,
    total: float | None,
    message: str | None
) -> None:
    if total is not None:
        percentage = (progress / total) * 100
        print(f"Progress: {percentage:.1f}% - {message or ''}")

async with client:
    result = await client.call_tool(
        "run_complex_quant_sim",
        {"iterations": 100000},
        progress_handler=progress_handler
    )`}
              />
            </div>
          </div>
        </Section>

        {/* Section 5 – Zero-Trust Security */}
        <Section title="Zero-Trust Security &amp; Kubernetes" icon={ShieldCheck} color="violet">
          <p>
            MCP servers represent a critical node within modern enterprise architectures. If a malicious
            actor compromises an MCP server, they gain indirect control over tool execution.
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Tool Capability Modeling</h3>
          <ul className="space-y-3 mb-10 list-disc list-inside text-slate-700">
            <li>
              <strong>Read vs. Write Segregation:</strong> Explicit separation to prevent accidental data
              modification. Tools must operate in read-only mode by default.
            </li>
            <li>
              <strong>Strict Resource Limits:</strong> Bound by CPU, memory, and execution time limits to
              prevent resource exhaustion (e.g., aggressive query timeouts).
            </li>
            <li>
              <strong>Explicit Side Effects Validation:</strong> Tools must assume permission checks have
              already occurred at the server boundary.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mb-4">
            K8s Transport Dilemma: WebSockets vs SSE
          </h3>
          <div className="overflow-x-auto rounded-xl border border-violet-100 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-violet-50 text-violet-900 border-b border-violet-100">
                <tr>
                  <th className="p-4 font-bold">Protocol</th>
                  <th className="p-4 font-bold">Directionality</th>
                  <th className="p-4 font-bold">K8s Ingress Complexity</th>
                </tr>
              </thead>
              <tbody className="bg-white text-slate-700 divide-y divide-violet-50">
                <tr>
                  <td className="p-4 font-semibold">HTTP + SSE</td>
                  <td className="p-4">Unidirectional (Server &rarr; Client); requires separate POSTs.</td>
                  <td className="p-4 text-rose-600 font-medium">High; vulnerable to round-robin issues.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Streamable HTTP</td>
                  <td className="p-4">Bidirectional (via GET/POST).</td>
                  <td className="p-4 text-rose-600 font-medium">High; requires precise session tracking.</td>
                </tr>
                <tr className="bg-emerald-50 text-emerald-900">
                  <td className="p-4 font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} /> WebSockets
                  </td>
                  <td className="p-4 font-medium">
                    Fully Bidirectional over a persistent TCP connection.
                  </td>
                  <td className="p-4 font-medium">Low; connection fixed to a single pod.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 6 – UX Engineering */}
        <Section title="UX Engineering for &lsquo;Slow AI&rsquo;" icon={LayoutDashboard} color="sky">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="mb-6">
                The traditional software expectation of immediate, highly consistent UI is upended by the
                non-deterministic, asynchronous batch processing nature of LLMs — categorized as{' '}
                <strong>&ldquo;Slow AI&rdquo;</strong>.
              </p>
              <Callout title="The 'Zombie UX'" type="warning">
                Waiting extended periods generates acute psychological anxiety. UX must explicitly embrace{' '}
                <strong>task handoff</strong>. The UI must release its &ldquo;hostage&rdquo; state,
                allowing analysts to navigate away while the agent computes in the background.
              </Callout>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl text-slate-300 shadow-lg border border-slate-700">
              <h4 className="text-white font-bold mb-4 text-lg border-b border-slate-700 pb-2">
                Conceptual Breadcrumbs
              </h4>
              <p className="text-sm leading-relaxed mb-6">
                The system must provide early, progressive glimpses into the AI&apos;s active reasoning
                process.
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  [Progress: 40%] Analyzing covariance matrices...
                </div>
                <div className="text-sky-400 flex items-center gap-2 opacity-50">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  [Progress: 85%] Simulating historical slippage...
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Google Doc CTA */}
        <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 p-8 rounded-2xl border border-indigo-100 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Read the Full Research Paper</h3>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Access the complete deep-dive document covering MCP architecture, implementation patterns,
            and enterprise deployment strategies for quantitative finance.
          </p>
          <a
            href={googleDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-300 transform hover:scale-105"
          >
            <FileText size={20} />
            Read Full Research Paper
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-slate-100 rounded-2xl border border-slate-200 text-sm text-slate-500 text-center">
          <p>
            This article is for educational and informational purposes only. It does not constitute
            investment advice or a recommendation to buy or sell any financial instrument.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 text-center text-slate-500">
        <p className="font-medium">
          &copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
        </p>
      </footer>
    </div>
  );
}
