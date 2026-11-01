'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import {
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Scale,
  GitCommit,
  FileCode2,
  Lock,
  Layers,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface JargonProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

const Jargon: React.FC<JargonProps> = ({ term, definition, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        tabIndex={0}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-zinc-900 dark:text-zinc-100 font-medium focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm px-0.5 transition-colors"
      >
        {children || term}
      </span>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 rounded-lg bg-[#14171B] dark:bg-[#05070A] text-zinc-100 dark:text-zinc-100 text-xs leading-relaxed shadow-xl border border-zinc-700 dark:border-zinc-800 z-50 pointer-events-none block font-sans font-normal"
        >
          <span className="block font-mono uppercase tracking-wider text-[10px] text-[#D08F52] dark:text-[#D08F52] mb-1">
            {term}
          </span>
          {definition}
        </span>
      )}
    </span>
  );
};

interface FormulaCardProps {
  title: string;
  badge?: string;
  formula: string;
  exampleLabel?: string;
  exampleContent?: string;
  notes?: string[];
}

const FormulaCard: React.FC<FormulaCardProps> = ({
  title,
  badge,
  formula,
  exampleLabel,
  exampleContent,
  notes,
}) => {
  return (
    <div className="bg-[#14171B] dark:bg-[#05070A] text-white dark:text-white rounded-xl border border-zinc-800 dark:border-zinc-800/90 p-4 sm:p-5 my-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-zinc-800 dark:border-zinc-800/80 pb-2.5">
        <span className="font-mono text-xs uppercase tracking-wider text-[#D08F52] dark:text-[#D08F52]">
          {title}
        </span>
        {badge && (
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-400 tabular-nums">
            {badge}
          </span>
        )}
      </div>
      <div className="overflow-x-auto py-1">
        <pre className="font-mono text-xs sm:text-sm tabular-nums text-zinc-100 dark:text-zinc-100 leading-relaxed whitespace-pre-wrap break-words">
          {formula}
        </pre>
      </div>
      {exampleContent && (
        <div className="mt-3 pt-3 border-t border-zinc-800/90 dark:border-zinc-900 text-xs font-mono tabular-nums">
          <span className="text-[#3CBF9C] dark:text-[#3CBF9C] uppercase tracking-wider block mb-1">
            {exampleLabel || 'Paper Numerical Benchmark / Constraint:'}
          </span>
          <p className="text-zinc-300 dark:text-zinc-300 leading-relaxed">{exampleContent}</p>
        </div>
      )}
      {notes && notes.length > 0 && (
        <ul className="mt-3 pt-3 border-t border-zinc-800/90 dark:border-zinc-900 space-y-1 text-xs font-sans text-zinc-300 dark:text-zinc-400">
          {notes.map((n, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#D08F52] dark:text-[#D08F52] font-mono">&bull;</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function ArticlePage() {
  const [selectedRole, setSelectedRole] = useState<'all' | 'researcher' | 'trader' | 'risk'>('all');

  return (
    <ArticleFrame slug="post-syntax-quant-paradigm-adversarial-verification">
      <div className="space-y-12 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
        
        {/* Compact Stat Row: 4 Standout Figures from the Paper */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
            <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">
              2x&ndash;4x
            </div>
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-1">
              Code Generation Speedup
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-500 font-mono tabular-nums mt-0.5">
              4h (2022) &rarr; 30m (2026) workflows
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
            <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">
              20%&ndash;30%
            </div>
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-1">
              Overall Desk Productivity Lift
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-500 font-mono tabular-nums mt-0.5">
              XML/JSON parsers: 15m &rarr; seconds
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
            <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#BC4128] dark:text-[#E2694A]">
              ~70%
            </div>
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-1">
              AI Scripts Needing Debugging
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-500 font-mono tabular-nums mt-0.5">
              Due to idealized frictionless assumptions
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
            <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#BC4128] dark:text-[#E2694A]">
              0.59 &rarr; 5.07
            </div>
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-1">
              Corrupted Sharpe Inflation
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-500 font-mono tabular-nums mt-0.5">
              From a single unshifted column leak
            </div>
          </div>
        </section>

        {/* Bulleted Key Takeaways Card */}
        <section className="bg-white dark:bg-zinc-900 border-l-4 border-[#A8672E] dark:border-[#D08F52] rounded-r-xl p-5 shadow-sm border-y border-r border-zinc-200 dark:border-zinc-800">
          <h2 className="font-serif text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />
            <span>Executive Takeaways</span>
          </h2>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-2.5">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>
                <strong className="text-zinc-900 dark:text-zinc-100">Inverted Desk Bottleneck:</strong> Quantitative headcount at leading institutions has expanded rather than contracted, reallocating human cognitive bandwidth from syntactic plumbing to causal inference, formal specification, and adversarial verification.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono mt-0.5">&bull;</span>
              <span>
                <strong className="text-zinc-900 dark:text-zinc-100">Specification-Driven Development (SDD):</strong> Code is downgraded to a disposable, machine-synthesized commodity while the formal four-tuple specification <InlineMath math="S = (F, Q, K, \Sigma)" /> becomes the sole version-controlled source of truth.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#BC4128] dark:text-[#E2694A] font-mono mt-0.5">&bull;</span>
              <span>
                <strong className="text-zinc-900 dark:text-zinc-100">Regulatory Perimeter Shift (SR 26-2):</strong> Issued April 17, 2026 to replace SR 11-7, Footnote 3 of SR 26-2 expressly excludes generative and agentic AI from classic validation perimeters&mdash;forcing a shift to continuous runtime behavioral telemetry.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono mt-0.5">&bull;</span>
              <span>
                <strong className="text-zinc-900 dark:text-zinc-100">Six-Tier Verification Arsenal:</strong> Quants replace simple example unit tests with compile-time phantom types, formal verification (OxCaml/Dafny), Property-Based Testing (PBT), Metamorphic Testing, QR/Cholesky numerical stability gates, and Temporal Non-Interference audits.
              </span>
            </li>
          </ul>
        </section>

        {/* SECTION 1: The Structural Realignment of Quantitative Finance */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100">
              The Structural Realignment of Quantitative Finance
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Empirical evidence across multi-manager platforms, market makers, and systematic hedge funds reveals a sharp bifurcation between AI as a standalone signal predictor versus AI as an engineering and research accelerator.
            </p>
          </div>

          {/* Dichotomy Card: Standalone Signal Generation vs Engineering Accelerator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Negative / Volatile Column */}
            <div className="bg-white dark:bg-zinc-900 border border-[#BC4128]/40 dark:border-[#E2694A]/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] font-medium">
                  Direct Signal Generation (Failed Baseline)
                </span>
                <XCircle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" />
              </div>
              <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
                Standalone LLM Return Prediction &amp;{' '}
                <Jargon
                  term="The Alpha Illusion"
                  definition="Apparent in-sample profitability from naive LLM trading agents that is actually an artifact of pre-training memorization and survivorship bias baked into model weights."
                >
                  The Alpha Illusion
                </Jargon>
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">&bull;</span>
                  <span>
                    Prompting models directly with price histories and news to predict asset returns consistently fails to beat simple momentum or mean-reversion baselines net of transaction costs over <span className="font-mono tabular-nums">3 years</span> of live and out-of-sample evaluations.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">&bull;</span>
                  <span>
                    Apparent in-sample backtest profitability stems from pre-training weight memorization and look-ahead survivorship bias rather than true economic edge.
                  </span>
                </li>
              </ul>
            </div>

            {/* Positive / Stabilizing Column */}
            <div className="bg-white dark:bg-zinc-900 border border-[#1D8A70]/40 dark:border-[#3CBF9C]/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] font-medium">
                  Engineering &amp; Research Accelerator (Proven Lift)
                </span>
                <CheckCircle2 className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C]" />
              </div>
              <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
                Productivity Infrastructure &amp; Cross-Language Synthesis
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                  <span>
                    Delivers a <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">2x to 4x</span> speedup in code generation and iteration, compressing <span className="font-mono tabular-nums">4-hour</span> 2022 literature and data-scaffolding workflows into <span className="font-mono tabular-nums">30-minute</span> tasks by 2026.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                  <span>
                    Reduces custom XML or JSON data parser authoring from <span className="font-mono tabular-nums">15 minutes</span> to seconds and lifts overall desk productivity by <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">20% to 30%</span>.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Three Architectural Pillars */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-4">
            <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
              Three Foundational Architectural Pillars of Institutional AI Infrastructure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1.5">
                <div className="font-mono text-xs uppercase text-[#A8672E] dark:text-[#D08F52]">
                  Pillar I: Context Grounding
                </div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                  Internal Catalogs &amp; Schemas
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Connected directly to internal data catalogs, schema registries, and proprietary codebases to generate environment-specific implementations rather than generic textbook code.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1.5">
                <div className="font-mono text-xs uppercase text-[#A8672E] dark:text-[#D08F52]">
                  Pillar II: Tool-Integrated Agents
                </div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                  <Jargon
                    term="Model Context Protocol (MCP)"
                    definition="A standardized protocol enabling AI agents to connect with external tools, query Apache Iceberg data lakes, run code in isolated sandboxes, and invoke automated validation harnesses."
                  >
                    Model Context Protocol (MCP)
                  </Jargon>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Replaces stateless chat interfaces with agents that query Apache Iceberg data lakes, execute code in isolated sandboxes, and invoke automated validation harnesses.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1.5">
                <div className="font-mono text-xs uppercase text-[#A8672E] dark:text-[#D08F52]">
                  Pillar III: Air-Gapped Compute
                </div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                  Stateful Private Inference
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Operates via bring-your-own-key routing or dedicated on-premise GPU clusters (exemplified by Jane Street&apos;s multi-billion-dollar CoreWeave commitments) so proprietary OCaml/C++ source and raw tick data never traverse public networks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Role Evolution Across the Quantitative Desk */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100">
                Role Evolution Across the Quantitative Desk
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Recruiting at elite firms such as Citadel now provides candidates with internal LLMs during coding assessments, evaluating constrained reasoning, prompt specification, and verification under pressure rather than rote memorization.
              </p>
            </div>

            {/* Interactive Role Filter */}
            <div className="inline-flex rounded-lg p-1 bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 self-start">
              {(
                [
                  { id: 'all', label: 'All Roles' },
                  { id: 'researcher', label: 'Researcher' },
                  { id: 'trader', label: 'Trader' },
                  { id: 'risk', label: 'Risk Manager' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRole(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    selectedRole === tab.id
                      ? 'bg-white dark:bg-zinc-800 text-[#A8672E] dark:text-[#D08F52] shadow-sm font-medium'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role Evolution Matrix Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 font-mono text-xs uppercase text-zinc-600 dark:text-zinc-400">
                  <th className="py-3.5 px-4">Quantitative Role</th>
                  <th className="py-3.5 px-4 text-[#BC4128] dark:text-[#E2694A]">
                    Legacy Pre-AI Work Style (Pre-2023)
                  </th>
                  <th className="py-3.5 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">
                    AI-Native Work Style (2026 Standard)
                  </th>
                  <th className="py-3.5 px-4 text-[#A8672E] dark:text-[#D08F52]">
                    Primary Cognitive Bottleneck &amp; Accountability
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {(selectedRole === 'all' || selectedRole === 'researcher') && (
                  <tr className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 px-4 font-serif font-medium text-zinc-900 dark:text-zinc-100 align-top whitespace-nowrap">
                      Quantitative Researcher
                    </td>
                    <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400 align-top">
                      Writing boilerplate Python/R/SQL data pipelines, coding custom backtesters from scratch, manually parsing unstructured filings, and debugging syntax.
                    </td>
                    <td className="py-4 px-4 text-zinc-800 dark:text-zinc-200 align-top">
                      Authoring formal mathematical specifications, editing declarative YAML agent configs, designing causal experiments, and auditing for overfitting and look-ahead bias.
                    </td>
                    <td className="py-4 px-4 text-zinc-700 dark:text-zinc-300 align-top">
                      Distinguishing genuine economic edge from AI-accelerated curve-fitting and multiple-testing p-hacking.
                    </td>
                  </tr>
                )}
                {(selectedRole === 'all' || selectedRole === 'trader') && (
                  <tr className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 px-4 font-serif font-medium text-zinc-900 dark:text-zinc-100 align-top whitespace-nowrap">
                      Quantitative Trader
                    </td>
                    <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400 align-top">
                      Manually coding execution scripts, monitoring basic static alerts, and hand-tuning order routing parameters across venues.
                    </td>
                    <td className="py-4 px-4 text-zinc-800 dark:text-zinc-200 align-top">
                      Supervising tiered AI-to-hardware pipelines, stress-testing broker error state machines, and managing cross-asset exposure during regime shifts.
                    </td>
                    <td className="py-4 px-4 text-zinc-700 dark:text-zinc-300 align-top">
                      Auditing live market microstructure pathologies (variable spreads, latency, partial fills, requotes) omitted by AI generators.
                    </td>
                  </tr>
                )}
                {(selectedRole === 'all' || selectedRole === 'risk') && (
                  <tr className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 px-4 font-serif font-medium text-zinc-900 dark:text-zinc-100 align-top whitespace-nowrap">
                      Risk Manager &amp; Validator
                    </td>
                    <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400 align-top">
                      Conducting periodic (annual/quarterly) document reviews, manually re-deriving closed-form equations, and maintaining static model inventories.
                    </td>
                    <td className="py-4 px-4 text-zinc-800 dark:text-zinc-200 align-top">
                      Enforcing continuous runtime behavioral telemetry, decomposing hybrid workflows under SR 26-2, and governing non-deterministic agent tool chains.
                    </td>
                    <td className="py-4 px-4 text-zinc-700 dark:text-zinc-300 align-top">
                      Bounding unbounded input spaces, preventing cascading agentic execution errors, and maintaining version-pinned fallbacks.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Role Deep-Dive Cards */}
          <div className="space-y-6">
            {/* 2.1 Quantitative Researcher */}
            {(selectedRole === 'all' || selectedRole === 'researcher') && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                    The Quantitative Researcher: Specification Architect &amp; Causal Auditor
                  </h3>
                  <span className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                    Signal Discovery
                  </span>
                </div>

                <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#A8672E] dark:text-[#D08F52] font-mono">&bull;</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">Declarative Agent Configs:</strong> Writing boilerplate parsers from scratch is viewed as a misallocation of capital; researchers steer multi-agent discovery systems via centralized YAML configurations specifying Information Coefficient (IC) thresholds, forward-return horizons, custom mathematical operators, and optimization loop depths.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">Unstructured Data Ingestion:</strong> LLMs automate the ingestion of unstructured alternative data&mdash;representing over <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-medium">80%</span> of enterprise information (SEC filings, earnings call transcripts, fundamental analyst notes)&mdash;and synthesize academic literature into testable specifications within minutes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">&bull;</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">Industrialized P-Hacking Hazard:</strong> Because multi-agent loops can generate, code, and test hundreds of candidate alpha factors per hour, local optimization without economic causality threatens severe in-sample overfitting&mdash;requiring strict multiple-testing corrections like the{' '}
                      <Jargon
                        term="Deflated Sharpe Ratio"
                        definition="A statistical multiple-testing correction that adjusts a strategy's observed Sharpe ratio for the total number of independent trials, non-normal return skewness/kurtosis, and sample length."
                      >
                        Deflated Sharpe Ratio
                      </Jargon>
                      .
                    </span>
                  </li>
                </ul>

                <FormulaCard
                  title="Sealed Out-of-Sample Evaluation Protocol (Quant-Arena Standard)"
                  badge="Max 5 In-Sample Revisions"
                  formula="s_t = f(H_t)   [Cryptographically Frozen Feature Set & Source Code]"
                  exampleLabel="Sealed Protocol Constraint:"
                  exampleContent="An autonomous research workflow is granted a strictly bounded experimentation budget (e.g., at most 5 strategy revisions across an in-sample window) before its source code, execution environment, and declared feature set f(H_t) are cryptographically frozen and executed exactly once against a sealed out-of-sample period, with zero feedback returned for further tuning."
                />
              </div>
            )}

            {/* 2.2 Quantitative Trader */}
            {(selectedRole === 'all' || selectedRole === 'trader') && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                    The Quantitative Trader: Microstructure Realism &amp; Tiered Execution Supervision
                  </h3>
                  <span className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                    Execution &amp; Microstructure
                  </span>
                </div>

                <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">Tiered AI-to-Silicon Pipeline:</strong> High-level analytical signals and real-time sentiment extracted by frontier models are distilled into lightweight, deterministic instructions executing on co-located FPGAs, ASICs, and ultra-low-latency OCaml or C++ engines.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">&bull;</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-100">Microstructure Blindness (<span className="font-mono tabular-nums">~70%</span> Failure Rate):</strong> Roughly <span className="font-mono tabular-nums">70%</span> of AI-generated trading scripts (Python, C++, MQL4, Pine Script) require manual debugging prior to deployment because LLMs default to fixed bid-ask spreads, zero-latency fills at bar close, and infinite top-of-book liquidity.
                    </span>
                  </li>
                </ul>

                {/* Mandatory 3-Point Execution Hardening Protocol */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                    <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                      Hardening Gate I
                    </div>
                    <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                      2x Cost Stress-Testing
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Explicitly model commissions, variable spread widening during session opens/macro releases, and non-linear market impact; verify profitability when simulated transaction costs and slippage are <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">doubled (2x)</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                    <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                      Hardening Gate II
                    </div>
                    <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                      Async Exception State Machines
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Inject explicit retry, backoff, and cancellation logic for live venue pathologies omitted by AI: requotes (<code className="font-mono text-[11px] text-[#BC4128] dark:text-[#E2694A]">ERR_REQUOTE</code>), off-quote rejections (<code className="font-mono text-[11px] text-[#BC4128] dark:text-[#E2694A]">ERR_OFF_QUOTES</code>), invalid stops (<code className="font-mono text-[11px] text-[#BC4128] dark:text-[#E2694A]">ERR_INVALID_STOPS</code>), busy trade contexts, and partial fills.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                    <div className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                      Hardening Gate III
                    </div>
                    <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                      Data Granularity &amp; Halts
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Bind queue-position or spread-sensitive strategies to raw Level-2 depth or tick feeds (never consolidated OHLC candles) and enforce a strict <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-medium">skip-trading policy</span> across missing data intervals rather than linear price interpolation across halts.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2.3 Risk Manager & SR 26-2 */}
            {(selectedRole === 'all' || selectedRole === 'risk') && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                    The Risk Manager: Navigating SR 26-2 &amp; Runtime Behavioral Governance
                  </h3>
                  <span className="font-mono text-xs text-[#A8672E] dark:text-[#D08F52] uppercase">
                    Model Risk Management (MRM)
                  </span>
                </div>

                {/* Dichotomy Comparison Card: SR 11-7 vs SR 26-2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400">
                        Legacy Regime (April 2011 &ndash; April 2026)
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        SR 11-7
                      </span>
                    </div>
                    <h4 className="font-serif text-base text-zinc-900 dark:text-zinc-100">
                      Static Closed-Form Validation
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <li>&bull; Assumed a model is a static system of closed-form equations taking a finite vector of numerical inputs.</li>
                      <li>&bull; Validated annually or quarterly by manually re-deriving math and reviewing static documentation.</li>
                      <li>&bull; Relied on a human decision-maker acting as a containment buffer between model output and execution.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-[#A8672E]/50 dark:border-[#D08F52]/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase text-[#A8672E] dark:text-[#D08F52]">
                        Current Regime (Issued April 17, 2026)
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15 text-[#A8672E] dark:text-[#D08F52]">
                        SR 26-2 &amp; OCC 2026-13
                      </span>
                    </div>
                    <h4 className="font-serif text-base text-zinc-900 dark:text-zinc-100">
                      <Jargon
                        term="SR 26-2 Footnote 3 Exclusion"
                        definition="Issued April 17, 2026 by the Federal Reserve, OCC, and FDIC to supersede SR 11-7; Footnote 3 expressly excludes generative AI and agentic AI systems from traditional MRM perimeters because their outputs are stochastic and emergent."
                      >
                        Footnote 3 Exclusion
                      </Jargon>{' '}
                      &amp; Runtime Telemetry
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                      <li>&bull; Supersedes SR 11-7 for complex quantitative models and non-generative ML, while <strong>Footnote 3 expressly excludes generative &amp; agentic AI</strong>.</li>
                      <li>&bull; Addresses Gartner&apos;s projection that <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">&gt;40%</span> of agentic AI projects will be canceled by end of <span className="font-mono tabular-nums">2027</span> due to inadequate risk controls.</li>
                      <li>&bull; Replaces static validation with decomposition across 4 component classes and live behavioral distributions.</li>
                    </ul>
                  </div>
                </div>

                {/* 4 Component Classifications under SR 26-2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="font-mono text-[11px] text-[#A8672E] dark:text-[#D08F52] uppercase">
                      Class 1: In-Scope Models
                    </div>
                    <div className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
                      Statistical &amp; Alpha Engines
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Governed under SR 26-2 principles: conceptual soundness evaluation, outcome analysis, and independent effective challenge.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="font-mono text-[11px] text-[#1D8A70] dark:text-[#3CBF9C] uppercase">
                      Class 2: Deterministic Rules
                    </div>
                    <div className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
                      Limits, Margin &amp; Routing
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Excluded from SR 26-2 complex model scope; governed via strict software change-control and formal verification.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="font-mono text-[11px] text-[#A8672E] dark:text-[#D08F52] uppercase">
                      Class 3: Generative AI
                    </div>
                    <div className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
                      Prompts, RAG &amp; Parsers
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Inventoried under NIST GenAI Profile; tracks hallucination/faithfulness, source-level provenance, and re-validates on prompt/index/weight changes.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="font-mono text-[11px] text-[#BC4128] dark:text-[#E2694A] uppercase">
                      Class 4: Agentic Systems
                    </div>
                    <div className="font-medium text-xs text-zinc-900 dark:text-zinc-100">
                      Autonomous Tool Chains
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Characterizes real-time behavioral distributions; enforces action-authority bounds, version-pinned fallbacks, regression gates, and kill-switches.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Infographic Slot placed inline to anchor the transition from Role Evolution to SDD */}
        <InfographicSlot alt="The Post-Syntax Quantitative Paradigm: Role Evolution, Adversarial Verification, and Governance" />

        {/* SECTION 3: Replacing Traditional Code Review: Specification-Driven Development (SDD) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100">
              Replacing Traditional Code Review: Specification-Driven Development (SDD)
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              When an LLM generates <span className="font-mono tabular-nums">500 lines</span> of plausible Python or C++ in <span className="font-mono tabular-nums">10 seconds</span>, the human author lacks the mental model built during manual coding. Software engineering research in 2026 (Alenezi, <code className="font-mono text-xs">arXiv:2607.16680</code>) identifies two systemic failure modes of informal conversational prompting.
            </p>
          </div>

          {/* Dichotomy Card: Conversational Vibe Coding vs Specification-Driven Development */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-[#BC4128]/40 dark:border-[#E2694A]/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A]">
                  Conversational &ldquo;Vibe Coding&rdquo; (Pathological)
                </span>
                <AlertTriangle className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A]" />
              </div>
              <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">&bull;</span>
                  <span>
                    <strong>
                      <Jargon
                        term="Productivity–Reliability Paradox"
                        definition="A failure mode identified in Alenezi (arXiv:2607.16680) where high LLM generation velocity incentivizes 'acceptance by observation'—subconsciously accepting syntactically clean code because it executes without error and yields a plausible equity curve."
                      >
                        Productivity&ndash;Reliability Paradox
                      </Jargon>
                      :
                    </strong>{' '}
                    High generation velocity incentivizes <em>acceptance by observation</em>; clean syntax and comments mask deep semantic and mathematical flaws.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">&bull;</span>
                  <span>
                    <strong>Architectural Erosion &amp;{' '}
                      <Jargon
                        term="Cognitive Debt"
                        definition="The cumulative atrophy of a quantitative team's internal mental models of system invariants and mathematical edge cases caused by habitual mental offloading to coding agents."
                      >
                        Cognitive Debt
                      </Jargon>
                      :
                    </strong>{' '}
                    LLMs optimize strictly within localized context windows, compounding local approximations across edits while human reviewers accumulate cognitive debt.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-[#1D8A70]/40 dark:border-[#3CBF9C]/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C]">
                  Specification-Driven Development (SDD)
                </span>
                <ShieldCheck className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" />
              </div>
              <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                  <span>
                    <strong>Inversion of the Software Lifecycle:</strong> Code is downgraded to a disposable, machine-synthesized commodity; the structured, machine-readable specification becomes the sole version-controlled source of truth.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                  <span>
                    <strong>Closed-Loop Monotonic Contraction:</strong> Strengthening any component of the automated validator <InlineMath math="V" /> monotonically shrinks the acceptance set <InlineMath math="A(S)" /> of candidate programs before human review.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Dark Formula Panel: Four-Tuple Specification S */}
          <FormulaCard
            title="Layer 1: The Formal Four-Tuple Specification & Closed-Loop Architecture"
            badge="arXiv:2607.16680"
            formula={`S = (F, Q, K, Σ)
Layer 1 (Spec S) ──► Layer 2 (Generator G(S, C)) ──► Layer 3 (Validator V) ──► Acceptance Set A(S)`}
            notes={[
              'F (Functional & Economic Semantics): Exact mathematical definitions of universe, point-in-time frequency, signal formulas, state ("price above EMA") vs. event ("price crosses above EMA") triggers, sizing, and rebalancing.',
              'Q (Quality & Numerical Attributes): Explicit tolerances for floating-point precision, matrix conditioning thresholds, maximum latency jitter, and missing-data policies.',
              'K (Constitutional Risk & Regulatory Constraints): Pre-trade gross/net leverage caps (L_max), max drawdown kill-switches, venue spread bounds, and Meyer Design-by-Contract data lineage rules.',
              'Σ (Architectural Structure): Strict interface contracts forbidding unauthorized network calls, unapproved third-party imports, or global state mutations.',
            ]}
          />

          {/* Multi-Agent Separation of Duties & Shared Immutable Backtesting Engine */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-4">
            <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
              Layer 2 Multi-Agent Separation of Duties &amp; The Shared Immutable Engine Core (<code className="font-mono text-sm text-[#A8672E] dark:text-[#D08F52]">engine.py</code>)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="font-mono text-[#A8672E] dark:text-[#D08F52] uppercase mb-1">1. Strategist Agent</div>
                <p className="text-zinc-600 dark:text-zinc-400">Translates specification <span className="font-mono">S</span> into a structured execution plan.</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="font-mono text-[#A8672E] dark:text-[#D08F52] uppercase mb-1">2. Coder Agent</div>
                <p className="text-zinc-600 dark:text-zinc-400">Synthesizes modular signal code restricted to <InlineMath math="s_t = f(H_t)" />.</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="font-mono text-[#A8672E] dark:text-[#D08F52] uppercase mb-1">3. RiskCoder Agent</div>
                <p className="text-zinc-600 dark:text-zinc-400">Injects transaction costs, slippage tolerances, and stop-loss guards.</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="font-mono text-[#A8672E] dark:text-[#D08F52] uppercase mb-1">4. Reviewer Agent</div>
                <p className="text-zinc-600 dark:text-zinc-400">Independently audits generated artifacts against specification <span className="font-mono">S</span>.</p>
              </div>
            </div>

            <FormulaCard
              title="Immutable Backtesting Kernel Contract (engine.py)"
              badge="Agents Forbidden from Touching Accounting"
              formula="s_t = f(H_t)   ──►   Shared Immutable Backtesting Engine (engine.py)"
              exampleLabel="Deterministic Engine Guarantees:"
              exampleContent="Agents are never permitted to generate backtest accounting or execution-timing engines from scratch. Agent code emits only target weights/scores s_t = f(H_t) at epoch t. engine.py deterministically enforces a 1-session execution shift (signals from day t close cannot earn day t return), models natural portfolio weight drift between rebalances, and applies standardized transaction cost and Sharpe formulas."
            />
          </div>
        </section>

        {/* SECTION 4: The New Verification Arsenal (Six-Tier Verification Ladder) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100">
              The New Verification Arsenal: The Six-Tier Verification Ladder
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Because example-based unit tests only check cases anticipated by the author, quants engineer harsher, mathematically exhaustive verification oracles at Layer 3.
            </p>
          </div>

          {/* Tier 1: Compile-Time Type Contracts & Veri-Coding */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                Tier I: Compile-Time Type Contracts &amp; Formal Verification (&ldquo;Veri-Coding&rdquo;)
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]">
                Rust &bull; OCaml / OxCaml &bull; Dafny &bull; PyRight
              </span>
            </div>

            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">Branded Types &amp; Newtypes (NautilusTrader Pattern):</strong> Core primitives like <code className="font-mono text-xs">Price</code>, <code className="font-mono text-xs">Quantity</code>, and <code className="font-mono text-xs">UnixNanos</code> are distinct types rather than raw 64-bit floats or integers&mdash;making it a compile-time error for an LLM to add a price to a quantity or mix millisecond and nanosecond timestamps.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    <Jargon
                      term="Phantom Types"
                      definition="Compile-time type parameters that carry state transition constraints without runtime memory overhead, ensuring illegal order lifecycle transitions fail to compile."
                    >
                      Phantom Types
                    </Jargon>{' '}
                    &amp; Exhaustive Pattern Matching:
                  </strong>{' '}
                  Enforces valid order-lifecycle transitions at compile time and forces AI code to handle every venue rejection state via <code className="font-mono text-xs">Result</code> types.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono">&bull;</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    From Vibe-Coding to{' '}
                    <Jargon
                      term="Veri-Coding (OxCaml & Dafny)"
                      definition="Formal mathematical verification of software where coding agents synthesize machine-checkable mathematical proofs of preconditions, postconditions, and accounting invariants alongside executable code."
                    >
                      Veri-Coding
                    </Jargon>
                    :
                  </strong>{' '}
                  In 2026, Jane Street reversed its historical stance on formal methods, investing heavily in <strong>OxCaml</strong> (an extended OCaml dialect with integrated proof techniques), alongside Microsoft Research&apos;s <em>Dafny</em> and startups like <em>&amp;Truth</em> (co-founded by Citadel verification alumni).
                </span>
              </li>
            </ul>

            <FormulaCard
              title="Compile-Time Phantom Type State Machine"
              badge="Zero Runtime Overhead"
              formula="UnvalidatedOrder ──► RiskCheckedOrder ──► SubmittedOrder ──► CancelledOrder"
              exampleLabel="Compile-Time Guarantee:"
              exampleContent="Any AI-generated function attempting to submit an UnvalidatedOrder directly to an execution gateway without passing through the RiskCheckedOrder transition fails at compilation."
            />
          </div>

          {/* Tier 2: Property-Based Testing (PBT) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                Tier II: Property-Based Testing (PBT) for Market Data &amp; Engine Invariants
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]">
                Hypothesis (Python) &bull; proptest (Rust) &bull; QCheck (OCaml)
              </span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Instead of testing single hard-coded inputs, quants write mathematical invariants that must hold across thousands of randomized synthetic market scenarios (prices near zero, extreme volatility spikes, session boundaries, corporate splits) with automatic counterexample shrinking.
            </p>

            <FormulaCard
              title="Market Data, Corporate Action & Engine Accounting Invariants"
              badge="500+ Randomized Scenarios per CI Run"
              formula={`1. OHLC Bar Consistency:         low ≤ open ≤ high   AND   low ≤ close ≤ high
2. Timestamp Monotonicity:       t_i > t_{i-1}
3. Quote Spread Non-Negativity:  Ask - Bid ≥ 0
4. Split-Adjusted Continuity:    |P_post × R - P_pre| < 0.01
5. Total Return Consistency:     |(P_t^adj / P_{t-1}^adj) - 1 - r_t^total| < 10^{-6}
6. Algebraic Round-Trip:         parse(to_string(x)) = x   AND   (A + B) - B = A
7. Linear Risk Additivity:       Σ_{i=1}^N DV01_i = DV01_portfolio`}
              exampleLabel="Worked Numeric Benchmark: Single-Buy Turnover Conservation Invariant"
              exampleContent="If a portfolio weight matrix initiates a 1.0 allocation to a single asset at t_0 and never rebalances, total cumulative turnover across the entire backtest horizon must equal exactly 1.0000—proving ordinary price appreciation drift is never double-counted as fresh trading."
              notes={[
                'Diagnostic Oracle — Systematic failures across entire dataset: Pipeline engineering bug.',
                'Diagnostic Oracle — Sporadic failures clustered on specific dates: Market microstructure anomalies (earnings halts/splits) requiring wider tolerances.',
                'Diagnostic Oracle — Failures growing monotonically over time: Model or regime drift.',
              ]}
            />
          </div>

          {/* Tier 3: Metamorphic Testing */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                Tier III: Metamorphic Testing &mdash; Solving the Quantitative Oracle Problem
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]">
                Relational Invariance T(x)
              </span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              A quant reviewing an AI momentum backtest does not know a priori whether the true historical Sharpe ratio is <span className="font-mono tabular-nums">1.15</span> or <span className="font-mono tabular-nums">1.42</span>.{' '}
              <Jargon
                term="Metamorphic Testing"
                definition="A verification methodology that resolves the Oracle Problem by executing a system multiple times under mathematically related inputs x and T(x) and verifying that the outputs obey a strict Metamorphic Relation (MR)."
              >
                Metamorphic Testing
              </Jargon>{' '}
              resolves this Oracle Problem by verifying relational invariance across controlled input transformations <InlineMath math="T(x)" />.
            </p>

            <FormulaCard
              title="Metamorphic Relations (MR) Across Backtesters & PDE Solvers"
              badge="Oracle-Free Verification"
              formula={`Fee Monotonicity MR:     c_2 > c_1  ⟹  Perf(S, c_2) ≤ Perf(S, c_1)
Scale Invariance MR:     C_0' = α · C_0 (α > 0)  ⟹  Sharpe(C_0') = Sharpe(C_0)
Periodic Boundary MR:    x' = x + π  ⟹  PDE_Surface(x') = PDE_Surface(x)`}
            />

            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 font-mono text-xs uppercase text-zinc-600 dark:text-zinc-400">
                    <th className="py-3 px-4">Quantitative Domain</th>
                    <th className="py-3 px-4">Metamorphic Transformation T(x)</th>
                    <th className="py-3 px-4 text-[#1D8A70] dark:text-[#3CBF9C]">
                      Required Metamorphic Relation (MR)
                    </th>
                    <th className="py-3 px-4 text-[#BC4128] dark:text-[#E2694A]">
                      Subtle AI Bugs Exposed by Violation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100 align-top">
                      Backtesting Engine (Fee Monotonicity)
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-zinc-700 dark:text-zinc-300 align-top">
                      Increase fee/slippage rate from c_1 to c_2 (c_2 &gt; c_1)
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] align-top">
                      Perf(S, c_2) &le; Perf(S, c_1)
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400 align-top">
                      Sign inversion in fee deduction, broken multi-leg spread cost calculation, or threshold interaction bugs.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100 align-top">
                      Backtesting Engine (Cash &amp; Scale Invariance)
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-zinc-700 dark:text-zinc-300 align-top">
                      Multiply initial capital C_0 by &alpha; &gt; 0 and scale target sizes
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] align-top">
                      Sharpe, Sortino, and % drawdown remain invariant
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400 align-top">
                      Integer share lot-rounding discontinuities, unscaled fixed fee components, or fractional share sizing errors.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100 align-top">
                      Derivative Pricing &amp; PDE Solvers
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-zinc-700 dark:text-zinc-300 align-top">
                      Apply symmetry, currency inversion, or shift x&apos; = x + &pi;
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] align-top">
                      Put-call parity, degree-1 homogeneity, periodic invariance
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400 align-top">
                      Discretization grid alignment errors, improper boundary condition clamping, or numerical drift.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100 align-top">
                      LLM Sentiment &amp; RAG Pipelines (MetaRAG)
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-zinc-700 dark:text-zinc-300 align-top">
                      Paraphrase text, reorder clauses, mutate to synonyms/antonyms
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] align-top">
                      Invariant under synonym; predictable inversion under antonym
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400 align-top">
                      Prompt brittleness, tokenization schema bugs, or ungrounded hallucination in retrieval pipelines.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tier 4: Deterministic Logic & Numerical Linear Algebra */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                Tier IV: Validating Deterministic Logic &amp; Numerical Linear Algebra
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]">
                N &gt; T_lb (1,000+ Stock Universe)
              </span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              In a <span className="font-mono tabular-nums">1,000+</span> stock universe where assets <InlineMath math="N" /> exceed lookback days <InlineMath math="T_{\text{lb}}" />, sample covariance matrices suffer from the{' '}
              <Jargon
                term="Markowitz Curse"
                definition="The numerical pathology where highly correlated assets that necessitate portfolio diversification simultaneously cause the empirical covariance matrix to become severely ill-conditioned or singular, making direct matrix inversion explosive."
              >
                Markowitz curse
              </Jargon>
              . LLMs routinely generate textbook formulas that explode numerically on ill-conditioned financial matrices.
            </p>

            {/* Two-Column Comparison: Naive AI Linear Algebra vs Verified Quant Numerical Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-[#BC4128]/40 dark:border-[#E2694A]/40 space-y-2">
                <div className="font-mono text-xs uppercase text-[#BC4128] dark:text-[#E2694A]">
                  Forbidden Naive AI Translations (Linter-Rejected)
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <li>
                    &bull; <strong>Explicit Matrix Inversion:</strong> Translating <InlineMath math="x = A^{-1}b" /> literally as <code className="font-mono text-[#BC4128] dark:text-[#E2694A]">np.linalg.inv(A) @ b</code>.
                  </li>
                  <li>
                    &bull; <strong>Normal Equations in OLS:</strong> Forming Gram matrix <InlineMath math="X^T X" /> via <InlineMath math="\hat{\beta} = (X^T X)^{-1}X^T y" />, which squares the condition number <InlineMath math="\kappa(X^T X) = \kappa(X)^2" /> and wipes out floating-point precision under factor collinearity.
                  </li>
                  <li>
                    &bull; <strong>Unregularized Sample Covariance:</strong> Passing raw singular sample covariance <InlineMath math="S" /> with tiny negative eigenvalues directly into <code className="font-mono">cvxpy</code> or <code className="font-mono">SCS</code>.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-[#1D8A70]/40 dark:border-[#3CBF9C]/40 space-y-2">
                <div className="font-mono text-xs uppercase text-[#1D8A70] dark:text-[#3CBF9C]">
                  Mandatory Verified Quant Numerical Stack
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <li>
                    &bull; <strong>LU / Cholesky Solvers:</strong> Mandate <code className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">np.linalg.solve(A, b)</code> (<InlineMath math="PA = LU" /> with partial pivoting) or Cholesky decomposition (<InlineMath math="\Sigma = L L^T" />).
                  </li>
                  <li>
                    &bull; <strong>QR &amp; SVD Factor Regression:</strong> Enforce QR decomposition (<InlineMath math="X = QR \implies R\hat{\beta} = Q^T y" />) or SVD-backed <code className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">lstsq</code> solvers.
                  </li>
                  <li>
                    &bull; <strong>Shrinkage, PSD Clamping &amp; Fallbacks:</strong> Apply Ledoit-Wolf or Quadratic-Inverse Shrinkage (QIS), clamp eigenvalues at <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">10⁻¹⁰</span>, and enforce deterministic Equal Weight (<InlineMath math="w_{\text{EW}}" />) fallbacks.
                  </li>
                </ul>
              </div>
            </div>

            <FormulaCard
              title="Cholesky Quadratic Forms, Ledoit-Wolf Shrinkage & Deterministic Optimizer Fallbacks"
              badge="PSD Cone Floor: 10⁻¹⁰"
              formula={`Cholesky Quadratic Form & Log-Det (No Inverse):
  Σ = L Lᵀ  ⟹  rᵀ Σ⁻¹ r = ‖L⁻¹ r‖₂²   and   log det(Σ) = 2 Σ_i log L_{ii}

OLS Factor Regression Conditioning vs. QR:
  Forbidden Normal Eq:  β̂ = (XᵀX)⁻¹ Xᵀy    [Condition Number Squared: κ(XᵀX) = κ(X)²]
  Mandated QR Solver:   X = Q R  ⟹  R β̂ = Qᵀy

Covariance Shrinkage & PSD Eigenvalue Floor:
  Σ̂ = T + (λ_conf · Ω_obs) ⊙ (S - T)       [Clamp Eigenvalues: λ_min(Σ̂) ≥ 10^{-10}]

Deterministic Crisis Optimizer Fallbacks:
  1. Collapsed Covariance Guard:  If 1ᵀ x_mvp ≤ 0  ⟹  Fallback deterministically to w_EW
  2. Gross Leverage Shrinkage:    If ‖w_base‖₁ > L_max  ⟹  w = α w_base + (1 - α) w_EW`}
              exampleLabel="Closed-Form Iterative Reconciliation Check:"
              exampleContent="Wherever an iterative simulation loop is generated (compounding balances or recursive volatility), the verification suite runs synthetic constant-return inputs and asserts that the final iterative state agrees with the exact closed-form analytical formula to within machine epsilon."
            />
          </div>

          {/* Tier 5: Eradicating Look-Ahead Bias */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                Tier V: Eradicating Look-Ahead Bias &mdash; Temporal Non-Interference &amp; Future-Mutation
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#BC4128]/10 text-[#BC4128] dark:text-[#E2694A]">
                Fonseca (July 2026, arXiv:2607.04958)
              </span>
            </div>

            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">&bull;</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">Catastrophic Impact of Unshifted Leaks:</strong> Omitting a single <code className="font-mono text-xs">.shift(1)</code>, fitting <code className="font-mono text-xs">scikit-learn</code> scalers prior to chronological splitting (<code className="font-mono text-xs">shuffle=False</code>), or indexing fundamentals by period-end rather than release timestamp can inflate a strategy&apos;s Sharpe ratio from <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">0.59 to 5.07</span>, or turn a <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">-5.60%</span> loser into an apparent <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">+8.01%</span> winner.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A8672E] dark:text-[#D08F52] font-mono">&bull;</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Bitemporal Coordinates &amp;{' '}
                    <Jargon
                      term="Temporal Non-Interference"
                      definition="Formalized by Fonseca (arXiv:2607.04958): mapping datum availability times onto a security lattice so that look-ahead bias is proven identical to an information-flow violation where high-timestamp data (t' > t) interferes with low-timestamp decisions (t)."
                    >
                      Temporal Non-Interference
                    </Jargon>
                    :
                  </strong>{' '}
                  Every datum carries both a <em>reference time</em> (the historical instant described) and an <em>availability time</em> (when it becomes knowable after ingestion lag).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">&bull;</span>
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-100">Fonseca&apos;s Theorem 3 (<InlineMath math="\Pi^0_1" />-Hard Undecidability Boundary):</strong> If a pipeline computes temporal availability dynamically from data values, look-ahead freedom is formally undecidable (<InlineMath math="\Pi^0_1" />-hard). Quants therefore restrict AI code to a <em>value-independent availability fragment</em> (causal folds, bitemporal reads, fixed windows) certified at compile time by Lucassen-Gifford type-and-effect systems.
                </span>
              </li>
            </ul>

            <FormulaCard
              title="Adversarial Future-Mutation Oracle (Shift & Clamping Invariance)"
              badge="Byte-Identical Historical Agreement"
              formula="M_T(D)|_{F_T} = D|_{F_T}   ⟹   A_T(M_T(D)) ≡ A_T(D)"
              exampleLabel="Adversarial Clamping Protocol (Why Gaussian Noise Fails):"
              exampleContent="Adding small random Gaussian noise to future prices (t > T) is a weak adversary that often fails to excite hidden threshold dependencies. Standard practice applies aggressive clamping mutations—zeroing out future volume, clamping future price changes to zero, or injecting extreme synthetic spikes at T + 1 across normalization, universe selection, and label generation—and asserts exact byte-identical signals up to T."
            />
          </div>

          {/* Tier 6: Testing the Tester (Adversarial Mutation Testing) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-xl text-zinc-900 dark:text-zinc-100">
                Tier VI: Testing the Tester &mdash; Adversarial Mutation Testing of AI Test Suites
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 text-[#A8672E] dark:text-[#D08F52]">
                Near-100% Mutant Kill Rate
              </span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              When AI generates unit and property tests alongside implementation code, it frequently writes tautological suites that achieve <span className="font-mono tabular-nums">100%</span> line coverage while pinning almost no actual behavior. Quants eliminate two critical test-adequacy failures:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="font-mono text-xs uppercase text-[#A8672E] dark:text-[#D08F52]">
                  1. Eradicating &ldquo;Weakening Mutants&rdquo; on Compound Guards
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  In a compound risk check like <code className="font-mono text-xs">if spread &lt;= max_spread and volatility &lt; vol_cap and not is_halted:</code>, an AI test suite often stays green if <code className="font-mono text-xs">and volatility &lt; vol_cap</code> is silently dropped. Quants configure a{' '}
                  <Jargon
                    term="Conjunct-Dropping Operator"
                    definition="An adversarial mutation testing operator that individually removes each sub-condition of a compound boolean guard (e.g., A and B and C) to verify that every clause is independently pinned by a failing test."
                  >
                    conjunct-dropping operator
                  </Jargon>{' '}
                  that removes each clause individually, requiring every sub-condition to be independently pinned by a failing branch-distinguishing test.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="font-mono text-xs uppercase text-[#A8672E] dark:text-[#D08F52]">
                  2. Three-Point Boundary &amp; Literal Constant Pinning
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  When testing quote staleness (<code className="font-mono text-xs">age &gt; BOUND</code>), AI tests routinely check <code className="font-mono text-xs">age = 0</code> and symbolic <code className="font-mono text-xs">age = BOUND + tick</code>. If <code className="font-mono text-xs">BOUND</code> is mutated from <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">50ms to 5000ms</span>, symbolic tests stay green! Standard practice mandates a 3-point pinning protocol.
                </p>
              </div>
            </div>

            <FormulaCard
              title="Mandatory Three-Point Numerical Threshold Pinning Protocol"
              badge="Prevents 50ms → 5000ms Silent Drift"
              formula={`1. Exact On-Boundary Success:      assert evaluate_quote(age = BOUND) == VALID
2. Immediate 1-Tick Refusal:       assert evaluate_quote(age = BOUND + 1_tick) == REJECTED_STALE
3. Standalone Literal Pinning:     assert BOUND == 50   # Prevents symbolic constant drift`}
            />
          </div>
        </section>

        {/* SECTION 5: Institutional Governance and Standard Practice Going Forward */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100">
              Institutional Governance and Standard Practice Going Forward
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              As model coding capabilities converge across providers, institutional alpha and survival depend on a five-part standard operating protocol across research, trading, and risk management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Protocol 1 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#A8672E] dark:text-[#D08F52] font-mono text-xs uppercase">
                <FileCode2 className="w-4 h-4" />
                <span>Protocol Pillar I</span>
              </div>
              <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
                Enforce &ldquo;Spec-as-Source&rdquo; &amp; Ban Production Vibe-Coding
              </h3>
              <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                <li>&bull; Ban unrecorded chat-prompted code from research or production repositories.</li>
                <li>&bull; Originate every module as a version-controlled specification <InlineMath math="S = (F, Q, K, \Sigma)" /> approved by a human Specification Review Board.</li>
                <li>&bull; Write type signatures, interface contracts, and PBT harnesses first; use AI strictly to synthesize implementations satisfying the pre-written oracle.</li>
              </ul>
            </div>

            {/* Protocol 2 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#1D8A70] dark:text-[#3CBF9C] font-mono text-xs uppercase">
                <Lock className="w-4 h-4" />
                <span>Protocol Pillar II</span>
              </div>
              <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
                Immutable Evaluation Cores &amp; Sealed Out-of-Sample Protocols
              </h3>
              <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                <li>&bull; Restrict AI coding agents to emitting portfolio weights or order intents evaluated exclusively by human-verified <code className="font-mono text-xs">engine.py</code>.</li>
                <li>&bull; Enforce hard trial caps, log every failed run to compute the Deflated Sharpe Ratio, and require a single irreversible execution on a cryptographically sealed OOS dataset.</li>
              </ul>
            </div>

            {/* Protocol 4 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#A8672E] dark:text-[#D08F52] font-mono text-xs uppercase">
                <Scale className="w-4 h-4" />
                <span>Protocol Pillar IV</span>
              </div>
              <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
                Component-Level Governance &amp; Replayable Evidence Chains
              </h3>
              <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                <li>&bull; Maintain a unified enterprise inventory under SR 26-2 and the NIST GenAI Profile separating statistical models, deterministic rules, RAG pipelines, and agents.</li>
                <li>&bull; Version-pin prompts, retrieval configs, and foundation weights; maintain hot-standby fallback models and log source-level provenance for every override.</li>
              </ul>
            </div>

            {/* Protocol 5 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#BC4128] dark:text-[#E2694A] font-mono text-xs uppercase">
                <Cpu className="w-4 h-4" />
                <span>Protocol Pillar V</span>
              </div>
              <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">
                Cultivate Deep Mathematical Fundamentals Against Cognitive Debt
              </h3>
              <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                <li>&bull; Combat mental offloading by deepening training in numerical linear algebra (<InlineMath math="\kappa(X^T X) = \kappa(X)^2" />, Ledoit-Wolf shrinkage when <InlineMath math="N > T_{\text{lb}}" />), market microstructure, causal inference, and bitemporal semantics.</li>
                <li>&bull; Transform the quant from a writer of fragile syntax into an architect of provably correct financial systems.</li>
              </ul>
            </div>
          </div>

          {/* Protocol 3 Full-Width Card: Automated CI Gate & Human Spot-Audit */}
          <div className="bg-[#14171B] dark:bg-[#05070A] text-white rounded-xl border border-zinc-800 p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-[#D08F52]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#D08F52]">
                  Protocol Pillar III: Automated Continuous Integration (CI) Verification Gate
                </span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-[#3CBF9C] tabular-nums">
                All AI Code Treated as Untrusted External Input
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
                <div className="text-[#D08F52]">Stage 1: Static AST</div>
                <p className="text-zinc-300 font-sans text-xs">
                  Certify value-independent availability and type-and-effect temporal non-interference (<InlineMath math="t' > t" /> blocked).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
                <div className="text-[#D08F52]">Stage 2: Linear Algebra Lint</div>
                <p className="text-zinc-300 font-sans text-xs">
                  Auto-reject <code className="font-mono">np.linalg.inv</code>, unregularized <InlineMath math="N > T_{\text{lb}}" /> covariances, or unprojected non-PSD matrices.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
                <div className="text-[#D08F52]">Stage 3: 500+ PBT &amp; MR</div>
                <p className="text-zinc-300 font-sans text-xs">
                  Execute <span className="font-mono tabular-nums">500+</span> randomized Hypothesis/proptest/QCheck scenarios for OHLC, DV01 additivity, Fee Monotonicity, and Scale Invariance.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
                <div className="text-[#D08F52]">Stage 4: Mutation Scoring</div>
                <p className="text-zinc-300 font-sans text-xs">
                  Clamp future prices/volumes beyond <InlineMath math="T" /> for byte-identical invariance; run conjunct-drop &amp; boundary-shift operators for <span className="font-mono tabular-nums">~100%</span> mutant kill rate.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/90 border border-[#3CBF9C]/40 space-y-1">
                <div className="text-[#3CBF9C]">Stage 5: Human 5-Date Audit</div>
                <p className="text-zinc-300 font-sans text-xs">
                  Select <span className="font-mono tabular-nums">5</span> historical chart dates by eye (volatility spikes &amp; corporate actions) to manually reconcile entry/exit/fill logs; run prompt <span className="font-mono tabular-nums">2x</span> for compile stability.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
