'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Database, GitMerge, ShieldAlert, Calculator, Network, Cpu, Activity, BookOpen, CheckCircle2, XCircle, Code, Maximize2, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const SectionTitle = ({ title, icon: Icon, gradient }: { title: string; icon: React.ElementType; gradient: string }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 ${className}`}>
    {children}
  </div>
);

const FeatureList = ({ title, items, isPro = true }: { title: string; items: string[]; isPro?: boolean }) => (
  <div className="space-y-4">
    <h4 className="text-lg font-bold text-slate-800">{title}</h4>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          {isPro ? (
            <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={20} />
          ) : (
            <XCircle className="text-rose-500 mt-0.5 shrink-0" size={20} />
          )}
          <span className="text-slate-600 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const DataTable = ({ headers, rows, headerColor = "bg-indigo-50 text-indigo-900" }: { headers: string[]; rows: string[][]; headerColor?: string }) => (
  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
    <table className="w-full text-left text-sm text-slate-600">
      <thead className={`${headerColor} font-semibold`}>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="px-6 py-4">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-white">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="px-6 py-4 align-top">
                {j === 0 ? <strong className="text-slate-800">{cell}</strong> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function AgenticRetrievalSystemsArticle() {
  const currentArticle = articles.find(article => article.slug === 'architecting-agentic-retrieval-systems-langchain-proprietary-wikis');
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

      <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 font-sans">
        
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-8 left-8 z-20">
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
            Deep Research
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white border-b border-slate-200">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-[100px] rounded-full mix-blend-multiply" />
          </div>
          
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium text-sm mb-8 shadow-sm">
              <BrainCircuit size={16} />
              <span>Advanced Quantitative AI Architecture</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Agentic Retrieval</span> Systems
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
              Integrating LangChain with custom proprietary wikis to build dynamic, reasoning-capable intelligence layers for high-stakes quantitative finance and mathematical modeling.
            </p>
          </div>
        </div>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Agentic Retrieval Systems Infographic" 
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
        )}

        {/* Full-screen image viewer */}
        {currentArticle?.imageUrl && (
          <FullScreenImageViewer
            src={currentArticle.imageUrl}
            alt="Agentic Retrieval Systems Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        {/* Main Content Container */}
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-32">

          {/* Section 1: The Paradigm Shift */}
          <section>
            <SectionTitle 
              title="The Paradigm Shift: RAG vs. Agentic RAG" 
              icon={GitMerge} 
              gradient="from-blue-500 to-indigo-500" 
            />
            <div className="prose prose-slate max-w-none text-lg text-slate-600 mb-10 leading-relaxed">
              <p>
                Standard keyword search algorithms and rudimentary vector similarity lookups are insufficient for extracting actionable intelligence from dense stochastic calculus formulations, theoretical proofs, and empirical backtesting datasets. We must shift from viewing retrieval as a static function to treating it as a dynamic, autonomous workflow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-t-4 border-t-rose-400 bg-gradient-to-b from-rose-50/50 to-white">
                <FeatureList 
                  title="The Ceiling of Standard RAG" 
                  isPro={false}
                  items={[
                    "Linear, single-shot, deterministic pipeline.",
                    "Fails at multi-hop reasoning (e.g., synthesizing baseline VaR with emerging market addendums).",
                    "Susceptible to silent hallucinations when semantic matches fail.",
                    "Context stuffing degrades LLM reasoning and increases token costs."
                  ]}
                />
              </Card>
              <Card className="border-t-4 border-t-emerald-400 bg-gradient-to-b from-emerald-50/50 to-white">
                <FeatureList 
                  title="The Agentic RAG Control Loop" 
                  isPro={true}
                  items={[
                    "Operates as a continuous control loop (Retrieve → Reason → Decide → Act).",
                    "Autonomously evaluates evidence, rewrites queries, and decomposes problems.",
                    "Loud Failure: Refuses to answer prematurely and backtracks if evidence is insufficient.",
                    "Prevents severe portfolio mismanagement caused by hallucinated mathematical parameters."
                  ]}
                />
              </Card>
            </div>

            <DataTable 
              headerColor="bg-indigo-50 text-indigo-900"
              headers={["Feature", "Standard RAG", "Agentic RAG"]}
              rows={[
                ["Architectural Flow", "Linear pipeline (Retrieve → Generate)", "Iterative control loop (Retrieve → Reason → Decide → Act)"],
                ["Query Processing", "Single-pass semantic match", "Multi-hop reasoning and query decomposition"],
                ["Failure Mode", "Silent hallucination (synthesizes answers from weak context)", "Loud failure (backtracks, rewrites queries, or escalates)"],
                ["Tool Utilization", "None (fixed database connection)", "Dynamic selection of multiple specialized retrieval tools"],
                ["Optimal Use Case", "Fast lookups, simple FAQs, static documentation", "Complex research, multi-document synthesis, mathematical proofs"]
              ]}
            />
          </section>

          {/* Section 2: Engineering the Custom Wiki Tool */}
          <section>
            <SectionTitle 
              title="Engineering the Custom Wiki Tool" 
              icon={Database} 
              gradient="from-purple-500 to-pink-500" 
            />
            <div className="prose prose-slate max-w-none text-lg text-slate-600 mb-10 leading-relaxed">
              <p>
                Querying a highly specific, permission-gated internal wiki (like Confluence or MediaWiki) necessitates a bespoke implementation that deeply extends LangChain&apos;s core abstractions. The agent shouldn&apos;t have a monolithic &quot;search everything&quot; tool; it requires a specialized toolkit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Semantic Search", desc: "Accepts natural language queries and returns relevant text chunks based on vector similarity." },
                { title: "Direct Page Lookup", desc: "Bypasses vector search entirely to retrieve full-text content via specific Document IDs." },
                { title: "Metadata Filtering", desc: "Enforces strict lexical filtering (authors, asset classes, dates) before semantic search." }
              ].map((tool, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-purple-100 shadow-md shadow-purple-900/5 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                    <Code size={20} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{tool.title}</h4>
                  <p className="text-sm text-slate-600">{tool.desc}</p>
                </div>
              ))}
            </div>

            <DataTable 
              headerColor="bg-purple-50 text-purple-900"
              headers={["Tool Creation Method", "Implementation Strategy", "Optimal Enterprise Use Case"]}
              rows={[
                ["@tool Decorator", "Wraps a Python function; infers schema from hints.", "Rapid prototyping, simple single-input retrieval."],
                ["StructuredTool", "Utilizes from_function, injects Pydantic schemas.", "Complex, multi-parameter inputs and strict validation."],
                ["BaseTool Subclassing", "Extends base class for manual _run implementation.", "Custom tools needing state management and deep error handling."],
                ["BaseToolkit", "Groups multiple BaseTool instances together.", "Exposing an entire wiki API to the agent."]
              ]}
            />

            <Card className="mt-12 bg-gradient-to-r from-rose-50 to-orange-50 border-rose-100">
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <ShieldAlert className="text-rose-500" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-rose-900 mb-2">Access Control & Entitlement Drift</h4>
                  <p className="text-rose-800 leading-relaxed">
                    Proprietary quant wikis contain alpha-generating signals. Applying access controls exclusively at ingestion creates <strong>entitlement drift</strong>. The custom wiki tool must enforce access control dynamically at query time, passing the invoking user&apos;s identity matrix to physically filter unpermitted vector chunks before returning context to the LLM.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Section 3: Data Ingestion & Math Chunking */}
          <section>
            <SectionTitle 
              title="Ingestion: Parsing Quantitative Mathematics" 
              icon={Calculator} 
              gradient="from-teal-500 to-emerald-500" 
            />
            <div className="prose prose-slate max-w-none text-lg text-slate-600 mb-8 leading-relaxed">
              <p>
                The most profound technical hurdle is preserving mathematical and logical integrity. Standard text processing irreparably fragments dense LaTeX formulas, nested fractions, and matrix representations. 
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 mb-12 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Calculator size={120} className="text-white" />
              </div>
              <h4 className="text-teal-400 font-mono text-sm mb-4">The Vulnerability of Math Parsing: Black-Scholes-Merton</h4>
              <div className="font-mono text-slate-300 space-y-3 text-sm md:text-base overflow-x-auto">
                <p>C = S<sub>t</sub> N(d<sub>1</sub>) - K e<sup>-rt</sup> N(d<sub>2</sub>)</p>
                <p className="text-rose-400 bg-rose-900/30 py-1 -mx-2 px-2 border-l-4 border-rose-500">
                  {`// A naive RecursiveCharacterTextSplitter splits here at \\n`}
                </p>
                <p>d<sub>1</sub> = [ln(S<sub>t</sub>/K) + (r + σ²/2)t] / (σ√t)</p>
                <p>d<sub>2</sub> = d<sub>1</sub> - σ√t</p>
              </div>
              <p className="mt-6 text-slate-400 text-sm leading-relaxed">
                If split abruptly, the LLM receives <code className="text-teal-300">d<sub>2</sub></code> without the vital preceding context of <code className="text-teal-300">d<sub>1</sub></code>, and isolated variables lose their application in the primary equation, guaranteeing hallucinated mathematical proofs.
              </p>
            </div>

            <DataTable 
              headerColor="bg-teal-50 text-teal-900"
              headers={["Chunking Strategy", "Mechanism of Action", "Quantitative Application"]}
              rows={[
                ["RecursiveCharacterTextSplitter", "Splits sequentially by \\n\\n, \\n, space.", "Highly detrimental to math; breaks multi-line equations."],
                ["LatexTextSplitter", "Splits along LaTeX environments and layout tags.", "Preserves complex equations, mathematical proofs, and matrices."],
                ["MarkdownHeaderTextSplitter", "Groups text by explicit heading hierarchy.", "Maintains structural integrity of comprehensive research papers."],
                ["Semantic Chunking", "Groups based on embedding similarity scores.", "Keeps explanatory text coupled with relevant formulas."]
              ]}
            />
          </section>

          {/* Section 4: Multi-Agent Systems & LangGraph */}
          <section>
            <SectionTitle 
              title="LangGraph Patterns & Swarm Architecture" 
              icon={Network} 
              gradient="from-amber-500 to-orange-500" 
            />
            <div className="prose prose-slate max-w-none text-lg text-slate-600 mb-10 leading-relaxed">
              <p>
                Transitioning from simple <code className="bg-slate-100 px-2 py-1 rounded text-slate-800">AgentExecutor</code> loops to stateful <strong>LangGraph</strong> architectures enables deep, multi-step financial reasoning. LangGraph provides persistent state, explicit checkpointing (human-in-the-loop), and strictly controlled loop budgets.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                <Card key={i} className="bg-gradient-to-b from-white to-amber-50/30">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <Activity size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">{pattern.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{pattern.desc}</p>
                </Card>
              ))}
            </div>

            <DataTable 
              headerColor="bg-amber-50 text-amber-900"
              headers={["Agent Role", "Primary Function in Quant Workflow", "Assigned LangChain Tools"]}
              rows={[
                ["Manager/Orchestrator", "Task delegation, workflow planning, final synthesis.", "Delegation tools, routing logic."],
                ["Quant Researcher", "Multi-hop information retrieval and evidence extraction.", "Custom Wiki Tool, Semantic Search, Metadata Filter."],
                ["Code Generator", "Translating mathematical concepts into executable algorithms.", "Python REPL, IDE integrations."],
                ["Risk Control/Critic", "Validating outputs against mathematical proofs and risk limits.", "Evaluation rubrics, LLM-as-a-Judge prompts."]
              ]}
            />
          </section>

          {/* Section 5: Workflow Execution */}
          <section>
            <SectionTitle 
              title="The Agentic Execution Workflow" 
              icon={Cpu} 
              gradient="from-blue-600 to-cyan-500" 
            />
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                { step: 1, title: "Query Decomposition", desc: "The Manager breaks 'Monte Carlo Expected Shortfall vs Parametric VaR' into discrete retrieval concepts." },
                { step: 2, title: "Iterative Tool Invocation", desc: "The Researcher agent fetches Monte Carlo docs, identifies missing correlation parameters, and re-queries for Parametric VaR baselines." },
                { step: 3, title: "Cross-Document Synthesis", desc: "Synthesizes nonlinear random return paths against static normal distribution assumptions." },
                { step: 4, title: "Mathematical Validation", desc: "The Critic agent verifies that Expected Shortfall (average tail loss) wasn't mistakenly conflated with VaR (absolute threshold)." },
                { step: 5, title: "Final Output Delivery", desc: "Delivers comprehensive response with inline citations directly linking to internal Confluence pages." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {item.step}
                    </div>
                    {idx !== 4 && <div className="w-0.5 h-16 bg-blue-100 mt-2"></div>}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <BookOpen className="mx-auto mb-6 text-cyan-400" size={48} />
              <h3 className="text-3xl font-bold mb-6">Proactive Memory & Observability</h3>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                True enterprise systems require <strong>proactive memory</strong> (monitoring Git/Confluence to autonomously update vector stores) and rigorous <strong>observability</strong> (using LangSmith to trace Pydantic inputs, latency, and LLM reasoning alterations). 
              </p>
              <p className="text-slate-400">
                When a mathematical parameter is missing, the system must <em>fail loudly</em>, not approximate.
              </p>
            </div>
          </section>
        </div>

        {/* Call to Action - Read Full Research Paper */}
        {currentArticle?.googleDoc && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Continue Your Deep Dive</h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Access the complete research paper with detailed technical implementations, code examples, and mathematical proofs.
              </p>
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FileText size={24} />
                Read Full Research Paper
              </a>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
          <p>© 2026 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>

      </div>
    </>
  );
}
