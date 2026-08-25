'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable Components ---

const Tooltip = ({ term, definition }: { term: string; definition: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  // Close tooltip on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <span className="relative inline-block" ref={tooltipRef}>
      <span
        tabIndex={0}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] cursor-help transition-colors"
      >
        {term}
      </span>
      {isOpen && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 dark:bg-slate-700 text-slate-100 text-sm rounded shadow-lg pointer-events-none text-left">
          {definition}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800 dark:border-t-slate-700"></span>
        </span>
      )}
    </span>
  );
};

const StatCard = ({ label, value, subtext }: { label: string; value: string; subtext?: React.ReactNode }) => (
  <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex flex-col justify-center items-start">
    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</div>
    <div className="font-mono text-3xl font-semibold tabular-nums text-[#A8672E] dark:text-[#D08F52]">{value}</div>
    {subtext && <div className="text-xs mt-1 text-slate-500 dark:text-slate-400">{subtext}</div>}
  </div>
);

export default function AgentCompilerReport() {
  return (
    <ArticleFrame slug="agent-compiler-framework-deterministic-ai-analysts">
      <div className="max-w-5xl mx-auto px-4 py-4 text-slate-900 dark:text-slate-100 font-sans">
        
        {/* Stat Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatCard 
            label="Market Encoding Legacy" 
            value="50 yrs" 
            subtext="Compounding systems" 
          />
          <StatCard 
            label="Search Accuracy" 
            value="90%" 
            subtext={<span>Up from <span className="text-[#BC4128] dark:text-[#E2694A]">50%</span> base</span>} 
          />
          <StatCard 
            label="Generation Speed" 
            value="4x" 
            subtext="Over sequential tools" 
          />
          <StatCard 
            label="Target Reproducibility" 
            value="95%" 
            subtext="Identical code output" 
          />
        </div>

        {/* Section: The Paradigm Shift */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Paradigm Shift
          </h2>
          <p className="mb-4">
            In high-stakes macro hedge funds, <Tooltip term="&ldquo;vibes-based&rdquo; agentic workflows" definition="Workflows where outcomes are unpredictable and audit trails are non-existent." /> are a profound <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold">liability</span>. 
            Transitioning to an &ldquo;Agent as a Compiler&rdquo; mindset means treating natural language not as conversational prompts, but as high-level source code.
          </p>
          <ul className="list-none space-y-4 mb-6">
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <div>
                <strong>Determinism:</strong> Must produce <span className="text-[#1D8A70] dark:text-[#3CBF9C]">reproducible</span> code and results across distinct runs for the same input.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <div>
                <strong>Correctness:</strong> Outputs must be free of logical or syntax errors and strictly adhere to internal frameworks.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">▪</span>
              <div>
                <strong>Reliability:</strong> System must function as a <span className="text-[#1D8A70] dark:text-[#3CBF9C]">dependable</span> component for managing billions in capital.
              </div>
            </li>
          </ul>
        </section>

        {/* Section: Decoupled Architecture */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Decoupled Architecture
          </h2>
          <p className="mb-6">
            Separating investment domain expertise from technical execution prevents <span className="text-[#BC4128] dark:text-[#E2694A]">context dilution</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-serif text-xl font-semibold mb-4 text-[#A8672E] dark:text-[#D08F52]">
                The Chat Agent (Domain Expert)
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Built on <Tooltip term="LangGraph" definition="Framework used to leverage persistent state for seamless cancellations and continuations." /> for state persistence.</li>
                <li>&ldquo;Talks like a coworker&rdquo; using proprietary jargon and causal frameworks.</li>
                <li>Replaces standard RAG with <strong>&ldquo;human-like inspection&rdquo;</strong> (evaluates frequency, currency, and investment priors).</li>
                <li>Employs individualized security harnesses to protect sensitive IP.</li>
              </ul>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-serif text-xl font-semibold mb-4 text-[#A8672E] dark:text-[#D08F52]">
                The Coding Agent (Implementation Detail)
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Code generation is hidden entirely behind a professional interface.</li>
                <li>Operates in a <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">clean context</span>.</li>
                <li>Free from the distraction of conversational history or market theory.</li>
                <li>Sole focus: Generating accurate Python code based on an Analysis Plan.</li>
              </ul>
            </div>
          </div>

          {/* Infographic Slot */}
          <div className="my-8">
            <InfographicSlot alt="The Agent as a Compiler Architecture: Decoupled Domain Expert and Coding Implementation" />
          </div>
        </section>

        {/* Section: The Analysis Plan */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Analysis Plan
          </h2>
          <p className="mb-4">
            The <Tooltip term="Analysis Plan" definition="A highly structured blueprint mapping natural language tasks to single Python functions before execution." /> is the digital evolution of the &ldquo;yellow pad&rdquo; philosophy, decomposing goals into discrete tasks.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4 font-semibold w-1/3">Component</th>
                  <th className="p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-4 font-mono text-[#A8672E] dark:text-[#D08F52]">Task Name</td>
                  <td className="p-4">A unique identifier for the specific analytical module.</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-[#A8672E] dark:text-[#D08F52]">Description</td>
                  <td className="p-4">A natural language explanation of the causal logic and calculation.</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-[#A8672E] dark:text-[#D08F52]">Structural Information</td>
                  <td className="p-4">Technical requirements of the data frame (e.g., column names, index, dtypes).</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-[#A8672E] dark:text-[#D08F52]">Semantic Information</td>
                  <td className="p-4">The intended meaning of the values and their alignment with investment priors.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Parallelized Code Generation */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Parallelized Code Generation
          </h2>
          <p className="mb-4">
            By defining dependencies upfront, the system maps out a <Tooltip term="DAG" definition="Directed Acyclic Graph: A structural mapping of upstream dependencies and downstream schemas to enable parallel execution." /> allowing sub-agents to generate dozens of data frames simultaneously.
          </p>

          {/* Formula Panel */}
          <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-6 rounded-lg font-mono text-sm shadow-xl overflow-x-auto mb-6">
            <div className="text-slate-400 mb-2"># Time Complexity of Generation via DAG Parallelization</div>
            <div className="mb-4">
              <span className="text-blue-400">T</span>(generation) &asymp; <span className="text-purple-400">O(1)</span> <span className="text-slate-500">/* relative to Analysis Plan size */</span>
            </div>
            
            <div className="border-t border-slate-800 pt-4 mt-4">
              <div className="text-slate-400 mb-3"># Worked Numeric Example (from paper)</div>
              <div className="grid grid-cols-[auto_20px_1fr] gap-x-3 gap-y-1.5 items-baseline">
                <span className="text-slate-400">Data_Frames_Required_A</span>
                <span className="text-[#A8672E] dark:text-[#D08F52]">=</span>
                <span className="text-[#3CBF9C] tabular-nums">3</span>
                
                <span className="text-slate-400">Data_Frames_Required_B</span>
                <span className="text-[#A8672E] dark:text-[#D08F52]">=</span>
                <span className="text-[#3CBF9C] tabular-nums">30</span>
                
                <div className="col-span-3 border-t border-slate-800 my-1"></div>
                
                <span className="text-slate-200 font-semibold">Execution_Time(A)</span>
                <span className="text-[#A8672E] dark:text-[#D08F52]">&asymp;</span>
                <span className="text-blue-400 font-semibold">Execution_Time(B)</span>
              </div>
            </div>
          </div>

          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Bypasses the sequential, slow &ldquo;thought-action-observation&rdquo; loops of standard LLM coding agents.</li>
            <li>Enforces <Tooltip term="Semantic equivalence" definition="Ensuring that even if code structures differ between LLM runs, they must yield the exact same numerical output." /> to meet the 95% identical code standard.</li>
          </ul>
        </section>

        {/* Section: Automated Validation */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Automated Validation &amp; Learning
          </h2>
          <p className="mb-4">
            Validation is a structural requirement, not an agentic choice. Validated outputs enable <Tooltip term="Data compounding" definition="Where an agent&rsquo;s validated research output becomes the pristine input for the next analyst or agent." />, continuously enriching internal databases.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="font-serif text-lg font-semibold mb-3">The User-Driven &ldquo;Teach&rdquo; Flywheel</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Create failing benchmark:</strong> Agent reproduces the identified behavioral mistake in a test environment.</li>
              <li><strong>Iterate context/harness:</strong> System adjusts internal guardrails until the benchmark passes.</li>
              <li><strong>Verify suite stability:</strong> System runs its entire test suite to ensure no regressions occur.</li>
              <li><strong>Automated PR generation:</strong> A pull request is sent via Slack for human audit, allowing firm-wide logic updates deterministically.</li>
            </ol>
          </div>
        </section>

        {/* Section: Execution Optimization */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Execution Optimization
          </h2>
          <ul className="list-disc pl-5 space-y-3 mb-6">
            <li>
              <strong>Bypassing Tool-Call Latency:</strong> Standard agents call a terminal per step, risking <span className="text-[#BC4128] dark:text-[#E2694A]">context drifting</span> and <span className="text-[#BC4128] dark:text-[#E2694A]">getting lost</span>. 
              The Pocket Analyst Tool (PAT) framework executes Python directly to bypass this overhead.
            </li>
            <li>
              <strong>Intelligent Caching:</strong> Static analysis injects caching annotations into generated code. 
              Minor tweaks (e.g., chart titles, single variables) result in a nearly <span className="text-[#1D8A70] dark:text-[#3CBF9C]">instantaneous</span> second run without double-loading massive datasets.
            </li>
          </ul>
        </section>

        {/* Section: Key Takeaways */}
        <section className="mb-8">
          <div className="border-l-4 border-[#A8672E] dark:border-[#D08F52] pl-6 py-2">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Key Strategic Takeaways
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] mt-1 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Specialization over Generalization:</strong> Decoupled specialized agents outpace generalist monolithic models in professional environments.
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] mt-1 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Architecture-Enforced Correctness:</strong> Reliability is a hard-coded structural property, eliminating vibe-based stochastic failures.
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] mt-1 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>The Power of Detailed Planning:</strong> Shifting the &ldquo;intelligence cost&rdquo; upfront to the planning phase enables hyper-scaling, parallelization, and auditability.
                </div>
              </li>
            </ul>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
