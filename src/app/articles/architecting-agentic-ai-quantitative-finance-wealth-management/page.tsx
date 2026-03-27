'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, TrendingUp, ShieldCheck, Layers, GitMerge, Users, Code, Database, Activity, Cpu, Briefcase, Zap, Target, Network, Server, LineChart, Eye, AlertOctagon, ChevronRight, Maximize2, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function AgenticAIArchitectureArticle() {
  const currentArticle = articles.find(article => article.slug === 'architecting-agentic-ai-quantitative-finance-wealth-management');
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

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* HERO SECTION */}
        <header className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-24 sm:py-32">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-8">
              <BrainCircuit className="w-4 h-4" />
              <span>Tutorial: The Paradigm Shift to Agentic AI</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Agentic AI</span> in<br />
              Quant Finance & Wealth Management
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-slate-600 max-w-3xl mx-auto">
              Unlike foundational LLMs that function as passive co-pilots, agentic AI systems possess autonomous reasoning, dynamic tool invocation, state persistence, and goal-directed execution.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/FXxn1Cs.jpeg" 
              alt="Agentic AI Architecture Infographic" 
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

        <FullScreenImageViewer
          src="https://i.imgur.com/FXxn1Cs.jpeg"
          alt="Agentic AI Architecture Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* STATS SECTION */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard value="73%" label="of tech incubator VC funding (Jan '24 - Jun '25) went to agentic AI startups." color="text-indigo-600" />
              <StatCard value="815%" label="Projected market expansion for AI agents in financial services by 2030." color="text-emerald-600" />
              <StatCard value="25-30%" label="Reduction in time required to gather data and generate analytical reports." color="text-amber-500" />
              <StatCard value="35%" label="Overall operational productivity gains driven by autonomous specialized agents." color="text-purple-600" />
            </div>
          </div>
        </section>

        {/* SPECIALIZED SKILLS - QUANT FINANCE */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader 
              title="Specialized AI Agent Skills" 
              subtitle="Bridging semantic reasoning with deterministic execution"
              description="An agent's effectiveness is entirely dependent upon its 'skills'—modular programmatic capabilities. Agents must never perform math via neural networks; they must select and parameterize deterministic skills."
            />

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <LineChart className="text-indigo-500 w-8 h-8" />
                Quantitative Finance & Algorithmic Trading
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkillCard 
                  title="Statistical Arbitrage & Signals"
                  icon={<Target className="w-6 h-6 text-emerald-500" />}
                  content="Identifying market inefficiencies by running cointegration tests (Johansen, ADF) for mean-reverting pairs, calculating half-lives, and utilizing technical indicators like MACD, RSI, and Bollinger Bands."
                  color="bg-emerald-50 border-emerald-100"
                />
                <SkillCard 
                  title="Derivatives Pricing & Modeling"
                  icon={<Activity className="w-6 h-6 text-blue-500" />}
                  content="Evaluating complex instruments by executing Black-Scholes equations, constructing binomial trees, and running Monte Carlo simulations for exotic derivatives and Greeks calculations."
                  color="bg-blue-50 border-blue-100"
                />
                <SkillCard 
                  title="Comprehensive Backtesting"
                  icon={<Server className="w-6 h-6 text-purple-500" />}
                  content="Ingesting historical data (Alpha Vantage, Yahoo) for event-driven simulations. Calculates Sharpe/Calmar ratios, max drawdown, and dynamically models slippage, commissions, and market impact."
                  color="bg-purple-50 border-purple-100"
                />
                <SkillCard 
                  title="Risk & Microstructure Analytics"
                  icon={<AlertOctagon className="w-6 h-6 text-amber-500" />}
                  content="Calculating Value at Risk (VaR), stress testing, scenario analysis, and managing correlations. For HFT, analyzing order books and optimizing latency for sub-millisecond execution (<1ms)."
                  color="bg-amber-50 border-amber-100"
                />
              </div>
            </div>

            {/* WEALTH MANAGEMENT & ALT DATA */}
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Briefcase className="text-teal-500 w-6 h-6" />
                  Wealth Management & Optimization
                </h3>
                <ul className="space-y-6">
                  <ListItem title="Automated Portfolio Optimization">
                    Consolidates fragmented account data. Compares allocations against target models and dynamically applies constraints (e.g., avoiding liquidation of legacy holdings) to generate precise execution lists.
                  </ListItem>
                  <ListItem title="Continuous Tax-Loss Harvesting (TLH)">
                    Monitors portfolios 24/7/365 to offset realized gains. Selects optimal tax lots and ensures the portfolio remains in a correlated, tax-neutral posture without triggering wash-sale violations.
                  </ListItem>
                  <ListItem title="Hyper-Personalized Client Profiling">
                    Synthesizes portfolio data with macro-economic news. Autonomously drafts customized communications quantifying the impact of events (like geopolitical shifts) for human advisor review.
                  </ListItem>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Eye className="text-fuchsia-500 w-6 h-6" />
                  Alternative Data Ingestion
                </h3>
                <p className="text-slate-600 mb-6">
                  Processing the "Four Vs" (Volume, Velocity, Variety, Veracity) of non-traditional data to extract actionable insights.
                </p>
                <ul className="space-y-6">
                  <ListItem title="Computer Vision Skills">
                    Parsing satellite imagery to estimate agricultural yields, monitor urban development, or track shipping port activity.
                  </ListItem>
                  <ListItem title="Consumer Behavior Analysis">
                    Processing anonymized credit card data, app downloads, and web traffic for precise retail demand forecasting ("nowcasting").
                  </ListItem>
                  <ListItem title="NLP & Evaluation Frameworks">
                    Monitoring global sentiment, parsing regulatory filings, and assessing alt-data for alpha potential, historical depth, and privacy compliance before integration.
                  </ListItem>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURAL BEST PRACTICES */}
        <section className="py-24 bg-indigo-900 text-indigo-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl mb-4">Architectural Best Practices</h2>
              <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
                Escaping the "demo trap" by moving away from monolithic prompts to robust, modular, and governed environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-indigo-800/50 rounded-2xl p-8 border border-indigo-700">
                <Layers className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Decoupling Logic & Modularizing</h3>
                <p className="text-indigo-100 mb-4 leading-relaxed">
                  Monolithic prompts exhaust context windows, causing reasoning drift and hallucinations. The industry best practice is a strict shift toward <strong>explicit task-decoupling</strong>.
                </p>
                <ul className="space-y-3 text-indigo-200">
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> 
                    Cognitive logic is separated from tool execution infrastructure.
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> 
                    Skills are discrete, pluggable modules registered in a central tool registry.
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> 
                    Tools filter and return compressed JSON to maximize token efficiency.
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> 
                    Namespaces define boundaries to prevent overlapping tool capabilities.
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-800/50 rounded-2xl p-8 border border-indigo-700">
                <ShieldCheck className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Security, Compliance & Guardrails</h3>
                <p className="text-indigo-100 mb-4 leading-relaxed">
                  Agents introduce enterprise risks like prompt injection and machine identity compromise. Comprehensive <strong>Agent Identity Governance (AIG)</strong> is required.
                </p>
                <ul className="space-y-3 text-indigo-200">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" /> 
                    Enforces Principle of Least Privilege via ABAC and OAuth2/OIDC.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" /> 
                    Explicit automated "kill switches" driven by real-time telemetry and aggregate portfolio limits.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" /> 
                    Monitoring "Decision Turn Count" (consecutive autonomous actions) to trigger safety protocols.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ORCHESTRATORS */}
        <section className="py-24 bg-white relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader 
              title="Building Financial Orchestrators" 
              subtitle="Multi-agent patterns, routing, and conflict resolution"
              description="A single agent is insufficient. Value is realized through multi-agent orchestration where diverse agents coordinate, delegate, and synthesize information using specific patterns."
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PatternCard 
                title="Sequential / Chain Pattern"
                desc="Linear, deterministic pipeline. Agent A passes state to Agent B without dynamic routing."
                useCase="Standardized compliance reporting, ETL pipelines, sequential KYC."
                color="border-blue-200 bg-blue-50"
                icon={<Network className="text-blue-500 w-6 h-6" />}
              />
              <PatternCard 
                title="Concurrent / Parallel Pattern"
                desc="Tasks dispatched simultaneously. Orchestrator waits for the slowest branch before merging outputs."
                useCase="Institutional stock analysis (technical, fundamental, and alt-data simultaneously)."
                color="border-emerald-200 bg-emerald-50"
                icon={<Layers className="text-emerald-500 w-6 h-6" />}
              />
              <PatternCard 
                title="Orchestrator-Worker Pattern"
                desc="Hierarchical design. Central supervisor decomposes problems and routes sub-tasks to workers."
                useCase="Portfolio rebalancing (Risk-Check, Equity-Optimizer, Trade-Executor agents)."
                color="border-purple-200 bg-purple-50"
                icon={<Cpu className="text-purple-500 w-6 h-6" />}
              />
              <PatternCard 
                title="Evaluator-Optimizer (Loop)"
                desc="Iterative cycle between a generator and a critic agent enforcing strict rubrics."
                useCase="Drafting highly regulated client communications (enforcing SEC/FINRA standards)."
                color="border-amber-200 bg-amber-50"
                icon={<GitMerge className="text-amber-500 w-6 h-6" />}
              />
              <PatternCard 
                title="Graph-Based Routing (DAGs)"
                desc="Complex, non-linear workflows with infinite state persistence and conditional loops."
                useCase="Autonomous claims adjudication and loan application processing."
                color="border-rose-200 bg-rose-50"
                icon={<BrainCircuit className="text-rose-500 w-6 h-6" />}
              />
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <GitMerge className="text-indigo-600 w-6 h-6" /> 
                  Resolving Conflict & State
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Agents will generate conflicting outputs (e.g., technical agent says buy, macro agent says sell). Advanced systems use a <strong>Team of Rivals</strong> architecture with a <strong>Reconciliation Node</strong>.
                </p>
                <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5 mb-6">
                  <li><strong>Format validation:</strong> Ensuring dates/currencies conform to database schemas.</li>
                  <li><strong>Cross-field consistency:</strong> Applying deterministic rules (Assets = Liabilities + Equity).</li>
                  <li><strong>Source grounding:</strong> Verifying figures have direct evidence in telemetry.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  State is maintained in an external database (e.g., PostgreSQL with vector search, LanceDB) rather than appending strings to a prompt, avoiding "context collapse."
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Users className="text-teal-600 w-6 h-6" /> 
                  Human-in-the-Loop (HITL)
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  HITL is triggered based on <strong>Product Risk</strong> rather than Model Confidence. Even if an agent is 99% confident, liquidating a massive position mandates human review.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Effective workflows target a 10-15% escalation rate. Orchestrators use pause/resume functions. When an exposure limit breaches, the state serializes and routes to a human operator. Their feedback is then captured as proprietary training data to refine vector routing and system robustness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE SOFTWARE TOOLKIT */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader 
              title="The Software Toolkit" 
              subtitle="Bridging cognitive AI with deterministic infrastructure"
              description="The development of enterprise-grade financial agents requires a specialized stack comprising quantitative libraries, frameworks, standardized protocols, and execution APIs."
            />

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Toolkit 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Python Libraries</h3>
                </div>
                <ul className="space-y-4">
                  <li className="text-slate-600">
                    <strong className="text-slate-900">QuantLib:</strong> Industry standard for pricing derivatives, fixed-income analysis, and yield curves.
                  </li>
                  <li className="text-slate-600">
                    <strong className="text-slate-900">TA-Lib & Pandas-ta:</strong> Vectorized implementations of 150+ technical indicators.
                  </li>
                  <li className="text-slate-600">
                    <strong className="text-slate-900">Zipline & Backtrader:</strong> Event-driven backtesting, realistic broker simulations preventing look-ahead bias.
                  </li>
                  <li className="text-slate-600">
                    <strong className="text-slate-900">PyFolio & Riskfolio-Lib:</strong> Mean-variance optimization, risk parity, and performance attribution.
                  </li>
                </ul>
              </div>

              {/* Toolkit 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                    <Network className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Multi-Agent Frameworks</h3>
                </div>
                <ul className="space-y-4">
                  <li className="text-slate-600">
                    <strong className="text-slate-900">LangGraph:</strong> State-centric, graph-based (DAGs) for fine-grained control, state persistence, and HITL.
                  </li>
                  <li className="text-slate-600">
                    <strong className="text-slate-900">CrewAI:</strong> Role-based collaboration mimicking human teams, built-in state via LanceDB and Pydantic.
                  </li>
                  <li className="text-slate-600">
                    <strong className="text-slate-900">BeeAI:</strong> Uses "Requirement Agents" for strictly enforcing compliance boundaries.
                  </li>
                  <li className="text-slate-600">
                    <strong className="text-slate-900">Pure Python:</strong> Minimalist transparent `while` loops for ReAct cycles to avoid framework bloat.
                  </li>
                </ul>
              </div>

              {/* Toolkit 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Model Context Protocol (MCP)</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The "USB-C of AI." An open standard by Anthropic using a JSON-RPC 2.0 transport layer. It provides a universal language for LLMs to securely communicate with external telemetry.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Exposes Tools, Resources, and Prompts. Allows agents to query deterministic data from <strong>Alpha Vantage</strong>, <strong>FactSet</strong>, and <strong>Bloomberg B-PIPE</strong> natively, drastically reducing hallucinations.
                </p>
              </div>

              {/* Toolkit 4 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Live Market APIs & FIX</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  <strong className="text-slate-900">Alpaca:</strong> Modern REST/WebSocket APIs for algorithmic testing, margin management, and crypto trading.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">FIX Protocol:</strong> The universal messaging standard for high-frequency, global cross-asset execution. Agents use FIX engine wrappers (QuickFIX) to connect to brokers like <strong>Interactive Brokers (IBKR)</strong>. A dedicated "Execution Agent" encapsulates this legacy plumbing complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION - GOOGLE DOC */}
        <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 py-16 my-8">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <p className="text-slate-600 mb-6">
              Dive deeper into the technical architecture and implementation details
            </p>
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
              >
                <FileText className="h-5 w-5" />
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>

        {/* FOOTER / CONCLUSION */}
        <footer className="bg-slate-900 py-16 text-center">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-6">Synthesizing the Future</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              The transition toward agentic AI is evolving from human-directed analysis to autonomous ecosystems capable of sub-millisecond precision. Success requires prioritizing architectural discipline, modular skill design, and reconciliation nodes over raw model capabilities. With universal standards like MCP and robust governance, agentic AI is poised to redefine alpha generation at scale.
            </p>
            <div className="mt-10 pt-10 border-t border-slate-800 text-slate-500 text-sm">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// -------------------------------------------------------------
// UI COMPONENTS
// -------------------------------------------------------------

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

function SectionHeader({ title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">{subtitle}</h2>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</p>
      <p className="mt-4 text-lg text-slate-600">{description}</p>
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  color: string;
}

function StatCard({ value, label, color }: StatCardProps) {
  return (
    <div className="flex flex-col p-6 text-center rounded-2xl bg-slate-50 border border-slate-100">
      <dt className="order-2 mt-4 text-sm font-medium leading-6 text-slate-500">{label}</dt>
      <dd className={`order-1 text-5xl font-extrabold tracking-tight ${color}`}>{value}</dd>
    </div>
  );
}

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  color: string;
}

function SkillCard({ title, icon, content, color }: SkillCardProps) {
  return (
    <div className={`p-6 rounded-2xl border ${color} transition duration-300 hover:shadow-md`}>
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      </div>
      <p className="text-slate-700 text-sm leading-relaxed">{content}</p>
    </div>
  );
}

interface ListItemProps {
  title: string;
  children: React.ReactNode;
}

function ListItem({ title, children }: ListItemProps) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1">
        <ChevronRight className="w-5 h-5 text-indigo-500" />
      </div>
      <div>
        <strong className="block text-slate-900 font-semibold mb-1">{title}</strong>
        <p className="text-slate-600 text-sm leading-relaxed">{children}</p>
      </div>
    </li>
  );
}

interface PatternCardProps {
  title: string;
  desc: string;
  useCase: string;
  color: string;
  icon: React.ReactNode;
}

function PatternCard({ title, desc, useCase, color, icon }: PatternCardProps) {
  return (
    <div className={`p-6 rounded-xl border ${color} flex flex-col h-full`}>
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h4 className="font-bold text-slate-900">{title}</h4>
      </div>
      <p className="text-sm text-slate-700 mb-4 flex-grow">{desc}</p>
      <div className="bg-white/60 p-3 rounded-lg text-xs text-slate-800 font-medium">
        <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px]">Ideal Use Case</span>
        {useCase}
      </div>
    </div>
  );
}
