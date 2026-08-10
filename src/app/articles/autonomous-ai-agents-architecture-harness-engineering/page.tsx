'use client';

import React from 'react';
import { Brain, Cpu, Database, Network, Shield, Activity, Code, GitBranch, Layers, Bot, Target, Wrench, Workflow, Lock, Zap, Repeat, FileCode2, ArrowRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function AutonomousAIAgentsArticle() {
  return (
    <ArticleFrame slug="autonomous-ai-agents-architecture-harness-engineering">
      <div className="pb-24">
        <InfographicSlot alt="Autonomous AI Agents Architecture Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1: The Concept of a Harness */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">What is a Harness?</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  A raw language model is fundamentally a non-deterministic, stateless text predictor. It lacks the intrinsic capability to maintain long-term state, execute code dynamically, or interface with secure proprietary databases.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">Harness Engineering</strong> is the systematic discipline of designing the scaffolding that surrounds an AI model. It provides deterministic constraints, progressive context delivery, and self-correcting feedback loops.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-400 dark:border-amber-600 p-6 rounded-r-2xl min-w-0">
                  <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed font-semibold">
                    Operational Mantra: "Debug the environment, not the model." If an agent acts destructively, the engineering failure is attributed to the harness's lack of guardrails, not the model's intelligence.
                  </p>
                </div>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-8 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#A8672E] dark:bg-[#D08F52]/10 rounded-full blur-3xl" />
                  <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-8 text-center relative z-10 font-serif">The Autonomy Equation</h3>
                  <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
                    <div className="flex items-center justify-center gap-4 w-full">
                      <div className="flex flex-col items-center p-4 bg-white dark:bg-[#0A0D14]/5 border border-white/10 rounded-2xl w-28">
                        <Brain className="text-purple-400 mb-2" size={28} />
                        <span className="text-slate-300 font-semibold text-sm">Model</span>
                      </div>
                      <span className="text-slate-500 text-2xl">+</span>
                      <div className="flex flex-col items-center p-4 bg-[#A8672E] dark:bg-[#D08F52]/10 border border-[#A8672E] dark:border-[#D08F52]/20 rounded-2xl w-28">
                        <Shield className="text-[#A8672E] dark:text-[#D08F52] mb-2" size={28} />
                        <span className="text-blue-300 font-semibold text-sm">Harness</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-600 dark:text-slate-400">=</div>
                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-[#A8672E] dark:border-[#D08F52]/30 rounded-2xl w-full text-white">
                      <Bot size={36} className="mb-3 text-[#A8672E] dark:text-[#D08F52]" />
                      <span className="text-lg font-bold tracking-wide">Autonomous Agent</span>
                      <span className="text-xs text-slate-400 mt-2 text-center">Capable of real-world, long-horizon tasks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Standard Components */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Standard Harness Components</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              A production-grade harness architecture is a highly engineered, compound AI system. These deterministic layers dictate the system's resilience, security, and operational cost-efficiency.
            </p>

            <ComparisonGrid>
              <ComparisonCard
                title="Execution Runtime"
                type="neutral"
                items={[
                  "The foundational loop that intercepts intents, invokes tools, enforces timeouts, and verifies programmatic outputs."
                ]}
              />
              <ComparisonCard
                title="Secure Sandboxes"
                type="neutral"
                items={[
                  "Highly isolated environments (e.g., E2B MicroVMs, Daytona OCI-containers) for secure code compilation and dynamic algorithmic testing."
                ]}
              />
              <ComparisonCard
                title="Memory & Compaction"
                type="neutral"
                items={[
                  "Mitigates 'context rot' by dynamically summarizing historical actions and offloading massive datasets to durable filesystems."
                ]}
              />
              <ComparisonCard
                title="Authorization Fabric"
                type="neutral"
                items={[
                  "Deterministic security gates enforcing strict policy constraints and permissioning via OAuth/RBAC protocols."
                ]}
              />
              <ComparisonCard
                title="Observability Tracing"
                type="neutral"
                items={[
                  "Instrumentation layers (like OpenLLMetry) capturing real-time execution metrics, reasoning trees, and latency data."
                ]}
              />
              <ComparisonCard
                title="Filesystem Workspace"
                type="neutral"
                items={[
                  "Durable storage acting as the agent's collaboration surface and state tracker across multi-day backtest iterations."
                ]}
              />
            </ComparisonGrid>
          </section>

          {/* Section 3: Tools, Skills & MCP */}
          <section className="py-16">
            <div className="bg-[#14171B] dark:bg-[#05070A] rounded-3xl p-8 md:p-12 text-slate-100 shadow-2xl relative overflow-hidden min-w-0 border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D08F52]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-white dark:bg-[#0A0D14]/10 rounded-xl text-[#D08F52]">
                    <Wrench size={28} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-serif tracking-tight">Tools, Skills &amp; The MCP</h2>
                </div>
                <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                  To interact with external software, autonomous agents require sophisticated toolkits. The harness differentiates between raw tools and curated skills, connecting them via universal protocols.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12 min-w-0">
                  <div className="bg-white dark:bg-[#0A0D14]/5 border border-white/10 p-8 rounded-3xl min-w-0">
                    <h3 className="text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-2 font-serif">
                      <Code size={20}/> Raw Tools
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      Atomic, generic computational capabilities like <code className="text-sm bg-black/30 px-1.5 py-0.5 rounded text-blue-300">execute_bash</code> or <code className="text-sm bg-black/30 px-1.5 py-0.5 rounded text-blue-300">query_database</code>. They represent mechanical actions but lack guidance on <em className="text-white">how</em> or <em className="text-white">when</em> they should be used effectively.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border border-purple-500/30 p-8 rounded-3xl min-w-0">
                    <h3 className="text-xl font-bold text-[#D08F52] mb-4 flex items-center gap-2 font-serif">
                      <Network size={20}/> Curated Skills
                    </h3>
                    <p className="text-purple-100 leading-relaxed">
                      Highly curated execution strategies and behavioral wrappers encapsulating domain expertise (e.g., a "Database Migration" skill). They teach an agent how to intelligently combine raw tools according to organizational conventions.
                    </p>
                  </div>
                </div>
                
                <div className="bg-black/40 border border-slate-700/50 p-8 rounded-3xl text-center min-w-0">
                  <h3 className="text-2xl font-bold text-white mb-4 font-serif">Model Context Protocol (MCP)</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                    MCP has emerged as the universal, open-source standard for connecting AI agents to external data sources. Instead of hard-coding API scripts, MCP standardizes how agents discover, authenticate, and invoke tools dynamically—drastically reducing token expenditure and improving latency via progressive disclosure.
                  </p>
                  <div className="inline-flex items-center gap-3 text-sm font-mono bg-black/60 border border-slate-800 text-[#D08F52] px-6 py-4 rounded-2xl overflow-x-auto max-w-full">
                    <Database size={18} className="shrink-0" /> 
                    <span className="whitespace-nowrap">MCP Server</span>
                    <span className="text-slate-500">⟷</span> 
                    <span className="whitespace-nowrap">Universal Adapter</span>
                    <span className="text-slate-500">⟷</span> 
                    <span className="whitespace-nowrap">Any AI Agent</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Recursive Autonomy */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Repeat className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Recursive Autonomy: Skills Calling Skills</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center min-w-0">
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 flex flex-col justify-center min-w-0">
                <p className="leading-relaxed">
                  The most advanced harnesses empower AI to autonomously use skills to call other skills, creating highly adaptable execution patterns managed by local server architectures.
                </p>
                <p className="leading-relaxed">
                  To prevent infinite recursive loops, harnesses employ strict <strong className="text-slate-900 dark:text-white">Recursion Guards</strong>. These programmatic budgets track "Max Depth" and "Max Children" to prevent runaway compute costs, ensuring safety constraints are inherited by all spawned sub-agents.
                </p>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl min-w-0 mt-4">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white">Skill Distillation (SkillRL):</strong> When an agent succeeds through trial and error, the harness captures the context tree and autonomously generates a new, optimized <code className="text-sm bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">SKILL.md</code> file, recursively evolving capabilities without model fine-tuning.
                  </p>
                </div>
              </div>

              <div className="relative min-w-0">
                {/* Visual Representation of Tree */}
                <div className="absolute left-8 top-12 bottom-12 w-1 bg-slate-200 dark:bg-slate-800 z-0 rounded-full"></div>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800/50 shadow-sm relative z-10">
                      <Bot size={32}/>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. Router Mechanism</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Evaluates current context and dynamically loads minimal metadata of available skills to avoid context window exhaustion.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pl-12 relative">
                    <div className="absolute left-0 top-8 w-12 h-1 bg-slate-200 dark:bg-slate-800 -z-10"></div>
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800/50 shadow-sm relative z-10">
                      <Network size={32}/>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. Parent Skill <code className="text-xs font-normal bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-purple-600 dark:text-purple-400">Risk_Metrics</code></h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Harness creates a localized "scratchpad", binding specific tools for this micro-task. Agent realizes it needs external data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pl-24 relative">
                    <div className="absolute left-12 top-8 w-12 h-1 bg-slate-200 dark:bg-slate-800 -z-10"></div>
                    <div className="w-16 h-16 rounded-2xl bg-[#D08F52]/20 text-[#D08F52] flex items-center justify-center shrink-0 border border-[#D08F52]/30 shadow-sm relative z-10">
                      <Code size={32}/>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. Sub-Skill <code className="text-xs font-normal bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[#D08F52]">Market_Data</code></h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Parent recursively invokes a sub-skill. Harness initializes a clean context window, executes extraction, and returns structured payload up the tree.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: LangGraph Example */}
          <section className="py-16">
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-3xl p-8 md:p-12 min-w-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#A8672E] dark:bg-[#D08F52] dark:bg-[#A8672E] dark:bg-[#D08F52] rounded-2xl text-white shadow-md">
                  <Workflow className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif tracking-tight">LangGraph: Graph-Based Harness</h2>
              </div>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-12">
                LangGraph deliberately departs from linear sequential chaining by conceptualizing the agent's workflow as a cyclical, directed graph. Unconstrained agency introduces unacceptable risks; LangGraph localizes autonomy within strictly bounded nodes.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 min-w-0">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-indigo-800 dark:text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-3 font-serif">
                    <div className="w-3 h-3 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div> Nodes
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Represent discrete logical steps or specialized sub-agents (e.g., <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Alpha_Signal</code>). The AI has total autonomy <em className="text-slate-900 dark:text-white">inside</em> the node.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-indigo-800 dark:text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-3 font-serif">
                    <GitBranch className="text-[#A8672E] dark:text-[#D08F52] w-5 h-5"/> Edges
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Define the execution flow. Conditional edges empower complex routing, guaranteeing that outputs pass through compliance verification before market execution.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-indigo-800 dark:text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-3 font-serif">
                    <Repeat className="text-[#A8672E] dark:text-[#D08F52] w-5 h-5"/> Ralph Loops
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Middleware patterns that intercept premature exit attempts (often from context anxiety), forcing the agent to meticulously review its proposed solution against original specs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Real World Application */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-6">Real-World Deployments in Quant Finance</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                The convergence of foundation models and harness engineering unlocks powerful autonomous workflows across institutional finance.
              </p>
            </div>
            
            <div className="space-y-8 min-w-0">
              <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-8 items-start min-w-0">
                <div className="p-5 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-950/30 rounded-2xl shrink-0 border border-emerald-100 dark:border-emerald-900/50">
                  <Activity className="text-[#1D8A70] dark:text-[#3CBF9C] w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Multi-Agent Trading Pipelines</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    Trading lifecycles are mapped onto specialized agents operating within a unified harness. <strong className="text-slate-900 dark:text-white">Alpha Agents</strong> extract predictive signals, <strong className="text-slate-900 dark:text-white">Risk Agents</strong> calculate VaR/CVaR enforcing limits, and <strong className="text-slate-900 dark:text-white">Execution Agents</strong> manage slippage via MCP connections to brokerages.
                  </p>
                  <div className="text-sm bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 text-[#1D8A70] dark:text-[#3CBF9C] border border-emerald-200 dark:border-emerald-800/50 px-4 py-2 rounded-xl inline-block font-semibold">
                    Result: Outperformed baseline indices with significantly lower drawdowns via strict temporal sequences.
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-8 items-start min-w-0">
                <div className="p-5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl shrink-0 border border-amber-100 dark:border-amber-900/50">
                  <Target className="text-amber-600 dark:text-amber-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Autonomous Backtesting (e.g., Aurora)</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Raw LLMs fail at backtesting due to missing massive historical data context. Specialized harnesses provide curated MCP toolkits connected to market data vendors. The agent autonomously writes code, invokes backtest engines, and analyzes Sharpe ratios in deterministic sandboxes.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-8 items-start min-w-0">
                <div className="p-5 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-950/30 rounded-2xl shrink-0 border border-blue-100 dark:border-blue-900/50">
                  <Shield className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Enterprise CI/CD &amp; Institutional Automation</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Agents act as first-class steps within deployment pipelines. <strong className="text-slate-900 dark:text-white">AI Expense Agents</strong> leverage Skills and MCP to parse receipts, update budgets, route exceptions for human approval, and push entries to ERPs—with the harness guaranteeing no database interaction occurs without passing validation nodes.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
