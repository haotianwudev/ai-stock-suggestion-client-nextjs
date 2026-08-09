'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';
import { GitMerge, Database, ShieldAlert, Calculator, Network, Cpu, Activity, BookOpen, CheckCircle2, XCircle, Code } from 'lucide-react';

function ParadigmShiftSection() {
  return (
    <section className="py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
          <GitMerge className="size-6" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Paradigm Shift: RAG vs. Agentic RAG</h2>
      </div>

      <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none mb-12">
        <p>
          Standard keyword search algorithms and rudimentary vector similarity lookups are insufficient for extracting actionable intelligence from dense stochastic calculus formulations, theoretical proofs, and empirical backtesting datasets. We must shift from viewing retrieval as a static function to treating it as a dynamic, autonomous workflow.
        </p>
      </div>

      <ComparisonGrid>
        <ComparisonCard
          title="The Ceiling of Standard RAG"
          tone="neg"
          items={[
            "Linear, single-shot, deterministic pipeline.",
            "Fails at multi-hop reasoning (e.g., synthesizing baseline VaR with emerging market addendums).",
            "Susceptible to silent hallucinations when semantic matches fail.",
            "Context stuffing degrades LLM reasoning and increases token costs."
          ]}
        />
        <ComparisonCard
          title="The Agentic RAG Control Loop"
          tone="pos"
          items={[
            "Operates as a continuous control loop (Retrieve → Reason → Decide → Act).",
            "Autonomously evaluates evidence, rewrites queries, and decomposes problems.",
            "Loud Failure: Refuses to answer prematurely and backtracks if evidence is insufficient.",
            "Prevents severe portfolio mismanagement caused by hallucinated mathematical parameters."
          ]}
        />
      </ComparisonGrid>

      <div className="mt-12 overflow-x-auto min-w-0">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 dark:border-slate-800">
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Feature</th>
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Standard RAG</th>
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Agentic RAG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {[
              ["Architectural Flow", "Linear pipeline (Retrieve → Generate)", "Iterative control loop (Retrieve → Reason → Decide → Act)"],
              ["Query Processing", "Single-pass semantic match", "Multi-hop reasoning and query decomposition"],
              ["Failure Mode", "Silent hallucination (synthesizes answers from weak context)", "Loud failure (backtracks, rewrites queries, or escalates)"],
              ["Tool Utilization", "None (fixed database connection)", "Dynamic selection of multiple specialized retrieval tools"],
              ["Optimal Use Case", "Fast lookups, simple FAQs, static documentation", "Complex research, multi-document synthesis, mathematical proofs"]
            ].map(([feature, standard, agentic], i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-900 dark:text-slate-300">{feature}</td>
                <td className="py-4 px-4">{standard}</td>
                <td className="py-4 px-4">{agentic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EngineeringSection() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
          <Database className="size-6" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Engineering the Custom Wiki Tool</h2>
      </div>

      <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none mb-12">
        <p>
          Querying a highly specific, permission-gated internal wiki (like Confluence or MediaWiki) necessitates a bespoke implementation that deeply extends LangChain's core abstractions. The agent shouldn't have a monolithic "search everything" tool; it requires a specialized toolkit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: "Semantic Search", desc: "Accepts natural language queries and returns relevant text chunks based on vector similarity." },
          { title: "Direct Page Lookup", desc: "Bypasses vector search entirely to retrieve full-text content via specific Document IDs." },
          { title: "Metadata Filtering", desc: "Enforces strict lexical filtering (authors, asset classes, dates) before semantic search." }
        ].map((tool, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#A8672E]/10 flex items-center justify-center text-[#A8672E] dark:text-[#D08F52] mb-6">
              <Code size={24} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">{tool.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto min-w-0 mb-12">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 dark:border-slate-800">
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Tool Creation Method</th>
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Implementation Strategy</th>
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Optimal Enterprise Use Case</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {[
              ["@tool Decorator", "Wraps a Python function; infers schema from hints.", "Rapid prototyping, simple single-input retrieval."],
              ["StructuredTool", "Utilizes from_function, injects Pydantic schemas.", "Complex, multi-parameter inputs and strict validation."],
              ["BaseTool Subclassing", "Extends base class for manual _run implementation.", "Custom tools needing state management and deep error handling."],
              ["BaseToolkit", "Groups multiple BaseTool instances together.", "Exposing an entire wiki API to the agent."]
            ].map(([method, strategy, usecase], i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-900 dark:text-slate-300">{method}</td>
                <td className="py-4 px-4">{strategy}</td>
                <td className="py-4 px-4">{usecase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8 flex gap-6 items-start min-w-0">
        <ShieldAlert className="text-rose-600 dark:text-rose-500 shrink-0 mt-1" size={28} />
        <div className="min-w-0">
          <h4 className="text-xl font-bold text-rose-900 dark:text-rose-300 mb-3">Access Control &amp; Entitlement Drift</h4>
          <p className="text-rose-800 dark:text-rose-200/80 leading-relaxed">
            Proprietary quant wikis contain alpha-generating signals. Applying access controls exclusively at ingestion creates <strong>entitlement drift</strong>. The custom wiki tool must enforce access control dynamically at query time, passing the invoking user's identity matrix to physically filter unpermitted vector chunks before returning context to the LLM.
          </p>
        </div>
      </div>
    </section>
  );
}

function IngestionSection() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
          <Calculator className="size-6" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Ingestion: Parsing Quantitative Mathematics</h2>
      </div>

      <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none mb-12">
        <p>
          The most profound technical hurdle is preserving mathematical and logical integrity. Standard text processing irreparably fragments dense LaTeX formulas, nested fractions, and matrix representations.
        </p>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 mb-12 shadow-xl border border-slate-800 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Calculator size={120} className="text-white" />
        </div>
        <h4 className="text-emerald-400 font-mono text-sm mb-6 tracking-wide">THE VULNERABILITY OF MATH PARSING: BLACK-SCHOLES-MERTON</h4>
        <div className="space-y-6 text-slate-300 text-sm md:text-base min-w-0 overflow-x-auto">
          <MathBlock math="C = S_t N(d_1) - K e^{-rt} N(d_2)" className="text-white" />
          <p className="text-rose-400 bg-rose-900/30 py-2 -mx-4 px-4 border-l-4 border-rose-500 font-mono text-xs md:text-sm my-4">
            {`// A naive RecursiveCharacterTextSplitter splits here at \\n`}
          </p>
          <MathBlock math="d_1 = \frac{\ln(S_t/K) + (r + \sigma^2/2)t}{\sigma\sqrt{t}}" className="text-white" />
          <MathBlock math="d_2 = d_1 - \sigma\sqrt{t}" className="text-white" />
        </div>
        <p className="mt-8 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-6">
          If split abruptly, the LLM receives <InlineMath math="d_2" className="text-emerald-300" /> without the vital preceding context of <InlineMath math="d_1" className="text-emerald-300" />, and isolated variables lose their application in the primary equation, guaranteeing hallucinated mathematical proofs.
        </p>
      </div>

      <div className="overflow-x-auto min-w-0">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 dark:border-slate-800">
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Chunking Strategy</th>
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Mechanism of Action</th>
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Quantitative Application</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {[
              ["RecursiveCharacterTextSplitter", "Splits sequentially by \\n\\n, \\n, space.", "Highly detrimental to math; breaks multi-line equations."],
              ["LatexTextSplitter", "Splits along LaTeX environments and layout tags.", "Preserves complex equations, mathematical proofs, and matrices."],
              ["MarkdownHeaderTextSplitter", "Groups text by explicit heading hierarchy.", "Maintains structural integrity of comprehensive research papers."],
              ["Semantic Chunking", "Groups based on embedding similarity scores.", "Keeps explanatory text coupled with relevant formulas."]
            ].map(([strategy, mechanism, application], i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-900 dark:text-slate-300">{strategy}</td>
                <td className="py-4 px-4">{mechanism}</td>
                <td className="py-4 px-4">{application}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LangGraphSection() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
          <Network className="size-6" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">LangGraph Patterns &amp; Swarm Architecture</h2>
      </div>

      <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none mb-12">
        <p>
          Transitioning from simple <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">AgentExecutor</code> loops to stateful <strong>LangGraph</strong> architectures enables deep, multi-step financial reasoning. LangGraph provides persistent state, explicit checkpointing (human-in-the-loop), and strictly controlled loop budgets.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12 min-w-0">
        {[
          {
            title: "Plan-then-Execute",
            desc: "Decouples planning from action. A planner maps sequential steps (e.g., historical methodology search), creating a deterministic blueprint for execution agents."
          },
          {
            title: "Reflection & Critique",
            desc: "An 'LLM-as-a-Judge' Critic Agent explicitly validates drafted formulas against raw retrieved LaTeX, forcing re-evaluation if mathematical hallucinations are detected."
          },
          {
            title: "Hierarchical Swarms",
            desc: "Decouples cognitive load into specialized entities (Orchestrator, Quant Researcher, Code Generator, Risk Analyst) communicating via Pydantic schemas."
          }
        ].map((pattern, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#A8672E]/10 flex items-center justify-center text-[#A8672E] dark:text-[#D08F52] mb-6">
              <Activity size={24} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">{pattern.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{pattern.desc}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto min-w-0">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 dark:border-slate-800">
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Agent Role</th>
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Primary Function in Quant Workflow</th>
              <th className="py-4 px-4 font-bold text-slate-900 dark:text-slate-100">Assigned LangChain Tools</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {[
              ["Manager/Orchestrator", "Task delegation, workflow planning, final synthesis.", "Delegation tools, routing logic."],
              ["Quant Researcher", "Multi-hop information retrieval and evidence extraction.", "Custom Wiki Tool, Semantic Search, Metadata Filter."],
              ["Code Generator", "Translating mathematical concepts into executable algorithms.", "Python REPL, IDE integrations."],
              ["Risk Control/Critic", "Validating outputs against mathematical proofs and risk limits.", "Evaluation rubrics, LLM-as-a-Judge prompts."]
            ].map(([role, func, tools], i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-900 dark:text-slate-300">{role}</td>
                <td className="py-4 px-4">{func}</td>
                <td className="py-4 px-4">{tools}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ExecutionSection() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
          <Cpu className="size-6" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Agentic Execution Workflow</h2>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto my-16 min-w-0">
        {[
          { step: 1, title: "Query Decomposition", desc: "The Manager breaks 'Monte Carlo Expected Shortfall vs Parametric VaR' into discrete retrieval concepts." },
          { step: 2, title: "Iterative Tool Invocation", desc: "The Researcher agent fetches Monte Carlo docs, identifies missing correlation parameters, and re-queries for Parametric VaR baselines." },
          { step: 3, title: "Cross-Document Synthesis", desc: "Synthesizes nonlinear random return paths against static normal distribution assumptions." },
          { step: 4, title: "Mathematical Validation", desc: "The Critic agent verifies that Expected Shortfall (average tail loss) wasn't mistakenly conflated with VaR (absolute threshold)." },
          { step: 5, title: "Final Output Delivery", desc: "Delivers comprehensive response with inline citations directly linking to internal Confluence pages." },
        ].map((item, idx) => (
          <div key={idx} className="flex gap-6 items-start group">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-110 group-hover:bg-[#A8672E] group-hover:text-white transition-all">
                {item.step}
              </div>
              {idx !== 4 && <div className="w-0.5 h-16 bg-slate-200 dark:bg-slate-800 mt-4"></div>}
            </div>
            <div className="pt-2">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#14171B] dark:bg-[#05070A] rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl min-w-0 mt-8">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <BookOpen className="mx-auto mb-6 text-[#A8672E] dark:text-[#D08F52]" size={48} />
        <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif">Proactive Memory &amp; Observability</h3>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
          True enterprise systems require <strong>proactive memory</strong> (monitoring Git/Confluence to autonomously update vector stores) and rigorous <strong>observability</strong> (using LangSmith to trace Pydantic inputs, latency, and LLM reasoning alterations).
        </p>
        <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">
          When a mathematical parameter is missing, the system must <span className="text-rose-400">fail loudly</span>, not approximate.
        </p>
      </div>
    </section>
  );
}

export default function ArchitectingAgenticRetrievalArticle() {
  return (
    <ArticleFrame slug="architecting-agentic-retrieval-systems-langchain-proprietary-wikis">
      <div className="pb-24">
        <InfographicSlot alt="Agentic Retrieval Systems Infographic" />
        <div className="max-w-4xl mx-auto">
          <ParadigmShiftSection />
          <EngineeringSection />
          <IngestionSection />
          <LangGraphSection />
          <ExecutionSection />
        </div>
      </div>
    </ArticleFrame>
  );
}
