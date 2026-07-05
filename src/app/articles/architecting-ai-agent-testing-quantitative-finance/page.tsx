'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Maximize2, Music } from 'lucide-react';
import { 
  BrainCircuit, 
  TestTube2, 
  Network, 
  RotateCcw, 
  Scale, 
  BarChart4, 
  Infinity as InfinityIcon,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  DatabaseZap,
  Target
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const SectionHeading = ({ icon: Icon, title, colorClass }: { icon: React.ElementType; title: string; colorClass: string }) => (
  <div className="flex items-center gap-4 mb-8 mt-16">
    <div className={`p-3 rounded-xl bg-white shadow-sm border border-slate-100 ${colorClass}`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const InfoBox = ({ 
  title, 
  children, 
  icon: Icon = AlertTriangle, 
  type = "warning" 
}: { 
  title: string; 
  children: React.ReactNode; 
  icon?: React.ElementType; 
  type?: "warning" | "info" | "success" 
}) => {
  const colors = {
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };
  
  return (
    <div className={`p-6 rounded-xl border ${colors[type]} my-6 shadow-sm`}>
      <div className="flex items-center gap-3 mb-3 font-semibold text-lg">
        <Icon size={24} />
        <h3>{title}</h3>
      </div>
      <div className="text-slate-700 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
};

const StyledTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm">
    <table className="w-full text-left border-collapse bg-white">
      <thead>
        <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
          {headers.map((header, i) => (
            <th key={i} className="py-4 px-6 font-semibold">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="text-slate-600 divide-y divide-slate-100">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="py-4 px-6 align-top">
                {j === 0 ? <strong className="text-slate-800">{cell}</strong> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function ArchitectingAIAgentTesting() {
  const currentArticle = articles.find(article => article.slug === 'architecting-ai-agent-testing-quantitative-finance');
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

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50 blur-3xl opacity-50"></div>
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 font-medium text-sm tracking-wide shadow-sm">
            Comprehensive Tutorial
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 tracking-tight leading-[1.1] mb-8">
            Architecting AI Agent Testing<br/>in Quantitative Finance
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
            Master the robust evaluation frameworks required to deploy autonomous financial agents safely, utilizing the LangChain and LangGraph ecosystems.
          </p>
        </div>
      </div>

      {/* Hero Infographic - Below Title with Full-Screen Capability */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img 
            src="https://i.imgur.com/tFpP7o5.png" 
            alt="AI Agent Testing Architecture Infographic" 
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
        src="https://i.imgur.com/tFpP7o5.png"
        alt="AI Agent Testing Architecture Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
          
          {/* Introduction */}
          <section className="prose prose-lg prose-slate max-w-none text-slate-600 mb-16">
            <p className="text-xl text-slate-700 font-medium leading-relaxed">
              The integration of Large Language Models (LLMs) into quantitative finance has precipitated a structural transformation from passive, reactive systems to dynamic, autonomous agents.
            </p>
            <p className="leading-relaxed">
              Unlike traditional algorithmic trading models that execute rigid, pre-defined rules, LLM-powered agents interpret unstructured multimodal data, synthesize conflicting macroeconomic indicators, and dynamically adjust their execution strategies. 
            </p>
            <div className="grid sm:grid-cols-2 gap-6 my-10">
              <Card className="p-6 border-l-4 border-l-rose-400">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-rose-400" size={20} />
                  The Probabilistic Risk
                </h4>
                <p className="text-sm">
                  Traditional software testing assumes determinism. AI agents fundamentally violate this. The same market query might yield multiple differently phrased valid responses, or confident but entirely hallucinated outputs.
                </p>
              </Card>
              <Card className="p-6 border-l-4 border-l-emerald-400">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <ShieldAlert className="text-emerald-500" size={20} />
                  The Multi-Layered Solution
                </h4>
                <p className="text-sm">
                  Ensuring reliability requires assessing the entire decision-making trajectory: prompt parsing, tool selection, parameter extraction, and risk compliance across Unit, Integration, and Evaluation layers.
                </p>
              </Card>
            </div>
          </section>

          {/* Unit Testing Section */}
          <section>
            <SectionHeading icon={TestTube2} title="Architecting Deterministic Unit Tests" colorClass="text-blue-500" />
            <div className="text-lg text-slate-700 space-y-6">
              <p>
                Unit testing for AI agents requires decoupling the application&apos;s deterministic orchestration logic from the inherent non-determinism of the underlying foundation models. In the LangChain ecosystem, this isolation is achieved by employing mock models, specialized testing fixtures, and rigorously controlled state persistence.
              </p>

              <Card className="p-8 bg-gradient-to-br from-white to-blue-50/30">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BrainCircuit className="text-blue-500" size={24} />
                  Decoupling via Mock Models
                </h3>
                <p className="mb-4">
                  To test orchestration without incurring API latency, engineers replace the live LLM with an in-memory fixture. The <code className="bg-slate-100 px-2 py-1 rounded text-sm">GenericFakeChatModel</code> (from <code className="bg-slate-100 px-2 py-1 rounded text-sm">langchain_core</code>) allows scripting exact sequences of text responses, tool calls, and artificial errors.
                </p>
                <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm text-slate-600 border border-slate-200">
                  <div className="text-slate-500 mb-2"># Overcoming LangGraph compilation hurdles</div>
                  <div>class ToolBindingFakeModel(GenericFakeChatModel):</div>
                  <div className="ml-4">def bind_tools(self, tools):</div>
                  <div className="ml-8">return self  # Self-returning no-op for ReAct loops</div>
                </div>
              </Card>

              <InfoBox title="Temporal Mocking & Look-Ahead Bias" icon={Clock} type="warning">
                <p>
                  A critical consideration unique to quantitative finance is the dimension of time. Financial time-series analysis is highly susceptible to <strong>look-ahead bias</strong>—inadvertently accessing future market data to make current predictions.
                </p>
                <p>
                  Testing environments must utilize time-mocking libraries like <code className="bg-amber-100 px-2 py-1 rounded text-sm">freezegun</code> or <code className="bg-amber-100 px-2 py-1 rounded text-sm">time-machine</code> to freeze the system clock to a historical date, ensuring historical queries remain temporally isolated. <em>Note: When using parallel runners like pytest-xdist, these fixtures must be applied explicitly within the test body to prevent non-deterministic node ID generation.</em>
                </p>
              </InfoBox>
            </div>
          </section>

          {/* Integration Testing Section */}
          <section>
            <SectionHeading icon={Network} title="Integration Testing & External Markets" colorClass="text-emerald-500" />
            <div className="text-lg text-slate-700 space-y-6">
              <p>
                While unit tests validate isolated logic, integration testing verifies correct functionality with real foundation models and external financial data providers (e.g., Alpha Vantage, proprietary SQL databases).
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <DatabaseZap className="text-emerald-500" size={20} />
                    Managing Cost & Latency
                  </h3>
                  <p className="text-base text-slate-600">
                    Running live LLM APIs on every CI/CD commit accumulates massive costs and introduces flaky non-deterministic failures. Quant teams use HTTP cassette libraries (<code className="bg-slate-100 px-1 rounded text-sm">vcrpy</code>, <code className="bg-slate-100 px-1 rounded text-sm">pytest-recording</code>) to record the initial network transaction and replay it instantly on subsequent runs.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    Validating Tool Schemas
                  </h3>
                  <p className="text-base text-slate-600">
                    Financial APIs demand strict contracts. Using libraries like Pydantic, tests systematically validate every argument against schemas (e.g., catching <code className="bg-slate-100 px-1 rounded text-sm">departure_date=&quot;next Friday&quot;</code> instead of strict ISO-8601), trapping malformed requests before they hit live exchanges.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Regression Evaluation Section */}
          <section>
            <SectionHeading icon={RotateCcw} title="Regression Evaluation Pipelines" colorClass="text-violet-500" />
            <div className="text-lg text-slate-700 space-y-6">
              <p>
                As an agent matures, optimizations for new capabilities often unintentionally degrade performance in legacy tasks. A robust regression suite requires a <strong>golden dataset</strong> of inputs and known-good expected outputs (e.g., historically verified support tickets or macro queries).
              </p>
              <p>
                Using <code className="bg-slate-100 px-2 py-1 rounded text-sm">@pytest.mark.langsmith</code>, developers define datasets as standard test cases. LangChain guidelines emphasize a strict separation between Capability and Regression evaluations:
              </p>
              
              <StyledTable 
                headers={["Evaluation Type", "Primary Objective", "Pass Rate Expectation", "Application in Quant Finance"]}
                rows={[
                  [
                    "Capability Evals",
                    "Answers \"what can the agent do?\" by targeting complex, aspirational tasks.",
                    "Low initial pass rate. Serves as a hill to climb for prompt engineering.",
                    "Testing a new workflow where a worker agent dynamically debates a supervisor over portfolio rebalancing."
                  ],
                  [
                    "Regression Evals",
                    "Answers \"does the agent still work?\" by verifying established workflows.",
                    "Near 100% pass rate. Catches backsliding and protects revenue-generating behavior.",
                    "Verifying adherence to hard-coded risk management stop-loss rules without deviation."
                  ]
                ]}
              />
            </div>
          </section>

          {/* Evaluation: Trajectories & LLM Judges Section */}
          <section>
            <SectionHeading icon={Scale} title="Evaluation: Trajectories & LLM Judges" colorClass="text-rose-500" />
            <div className="text-lg text-slate-700 space-y-6">
              <p>
                Asserting an exact string match is insufficient. A passing evaluation must verify both the final outcome and the multi-step execution path (trajectory) used to reach it.
              </p>
              
              <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Trajectory Match Modes</h3>
              <StyledTable 
                headers={["Matching Mode", "Evaluation Logic", "Quant Finance Application"]}
                rows={[
                  ["Strict", "Exact match of tool calls in the precise order specified.", "Enforcing mandatory KYC or risk limit checks before trade execution."],
                  ["Unordered", "Verifies presence of exact tool calls, regardless of sequence.", "Validating research tasks gathering data from independent sources (technical, macro, sentiment)."],
                  ["Subset", "Prohibits extra calls beyond the reference.", "Preventing querying restricted corporate ledgers unnecessarily."],
                  ["Superset", "Guarantees minimum tools called, permitting extra exploration.", "Verifying baseline due diligence (e.g., pulling SEC 10-K) while allowing extra context retrieval."]
                ]}
              />

              <InfoBox title="LLM-as-a-Judge & Mitigation of Bias" icon={BrainCircuit} type="info">
                <p className="mb-4">
                  While deterministic matching handles structure, assessing qualitative reasoning requires an LLM judge. However, judge models are susceptible to biases:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><strong>Verbosity Bias:</strong> Favoring longer, detailed answers even if factually irrelevant.</li>
                  <li><strong>Position Bias:</strong> Favoring the first or last options in pairwise comparisons.</li>
                  <li><strong>Self-Preference:</strong> Rating answers that match the judge&apos;s own writing style higher.</li>
                </ul>
                <p className="mt-4 pt-4 border-t border-blue-200">
                  <strong>Mitigation:</strong> Break broad quality assessments into narrow, highly specific pass/fail criteria (e.g., &quot;Did the response cite the max_connections value?&quot;).
                </p>
              </InfoBox>
            </div>
          </section>

          {/* Domain-Specific Benchmarks Section */}
          <section>
            <SectionHeading icon={BarChart4} title="Domain-Specific Benchmarks" colorClass="text-amber-500" />
            <div className="text-lg text-slate-700 space-y-6">
              <p>
                General benchmarks fail to stress-test algorithmic trading agents. Frameworks like <strong>FinToolBench</strong> evaluate agents against 760 real-world APIs based on strict compliance metrics:
              </p>
              
              <StyledTable 
                headers={["Metric", "Description", "Financial Significance"]}
                rows={[
                  ["Tool Invocation Rate (TIR)", "Frequency of tool use attempts.", "High TIR with poor execution indicates dangerous eagerness."],
                  ["Conditional Execution Rate (CER)", "Success rate when a tool is invoked.", "Indicates precision in argument instantiation."],
                  ["Intent Mismatch Rate (IMR)", "Deviation from explicit constraints.", "Prevents catastrophic errors like executing live trades during a backtest."]
                ]}
              />

              <Card className="p-8 mt-8 border-t-4 border-t-amber-400">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Target className="text-amber-500" size={24} />
                  Time Series Augmented Generation (TSAG)
                </h3>
                <p>
                  LLMs hallucinate mathematical reasoning over time-series data. TSAG transforms the agent into an &quot;Alpha-Miner&quot; orchestrator, testing its ability to delegate complex statistical calculations (like GARCH or GAF) to verifiable external tools rather than predicting prices from raw text.
                </p>
              </Card>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="mt-20">
            <div className="p-10 bg-indigo-900 rounded-3xl text-indigo-50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 text-indigo-800 opacity-50">
                <InfinityIcon size={200} />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                  <InfinityIcon className="text-indigo-400" />
                  Closing the Quality Loop
                </h2>
                <div className="text-lg leading-relaxed space-y-4 text-indigo-200">
                  <p>
                    The evaluation framework does not end upon deployment. Online real-time monitoring utilizes reference-free heuristic checks and LLM-as-a-judge scorers to analyze production traces. 
                  </p>
                  <p>
                    Using platforms like LangSmith Engine, failing traces are autonomously routed, evaluated, and converted into permanent offline regression tests. This comprehensive approach transforms the inherent unpredictability of large language models into a transparent, auditable, and highly reliable financial decision-making engine.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Call to Action - Google Doc Link */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {currentArticle?.googleDoc && (
            <a 
              href={currentArticle.googleDoc}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Read Full Research Paper
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm">
            © 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </div>
      </footer>
    </>
  );
}
