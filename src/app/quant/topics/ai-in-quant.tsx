import { Bot, FileSearch, Database, Users2, Plug, Repeat2, Newspaper, Code2, AlertTriangle, Layers, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function AiInQuantContent() {
  const config = getTopicConfig('ai-in-quant');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Bot}>
      <div className="space-y-8">
        {/* 1. Foundations */}
        <SectionCard title="Foundations" icon={FileSearch} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Why LLMs Entered Quant Workflows</h4>
              <p>
                Traditional quant methods excel at structured, numerical data (prices, fundamentals) but have never
                handled unstructured text well — earnings call transcripts, SEC filings, news — at scale. Large
                language models are, for the first time, genuinely competent readers of that unstructured layer, which
                is why they&apos;ve moved from a novelty to a real input into research pipelines.
              </p>
            </div>
            <div>
              <h4>Function Calling / Tool Use</h4>
              <p>
                The mechanism underlying everything below: instead of only generating text, a model can emit a
                structured request to run a specific function — query a database, fetch a price, execute code — and
                receive the result back into its context. This is what turns a language model from a chatbot into
                something that can actually do work.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 2. Core Capabilities */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Core Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Multi-Agent Systems" icon={Users2}>
              Splits a complex workflow (research → risk check → execution) across specialized agents that each
              handle one narrow role well, coordinated by an orchestrator — generally more reliable than asking one
              model to do everything in a single pass.
            </StatTile>
            <StatTile title="Retrieval-Augmented Generation (RAG)" icon={Database}>
              Retrieves relevant documents (filings, research notes, price history) at query time and feeds them into
              the model&apos;s context before it answers — grounding the response in real, current data instead of the
              model&apos;s frozen training-time memory, which meaningfully cuts down on fabricated facts.
            </StatTile>
            <StatTile title="Model Context Protocol (MCP)" icon={Plug}>
              A standardized way for an agent to discover and call external tools/databases, so a new data source can
              be plugged into the stack once and used by every agent — instead of writing custom integration glue for
              each model-tool pairing.
            </StatTile>
            <StatTile title="Agentic Harnesses" icon={Repeat2}>
              The loop wrapped around the model — plan a next step, call a tool, check the result, decide whether to
              retry or continue — that turns a single LLM call into a persistent agent capable of multi-step research
              or analysis tasks, with self-correction along the way.
            </StatTile>
          </div>
        </div>

        {/* 3. Practical Applications */}
        <SectionCard title="Practical Applications" icon={Newspaper} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Document &amp; Sentiment Analysis</h4>
              <p>
                Summarizing earnings calls, flagging tone shifts in management language quarter-over-quarter, and
                extracting structured data (guidance numbers, risk factor changes) from filings that would take an
                analyst hours to read manually.
              </p>
            </div>
            <div>
              <h4>Research &amp; Code Generation</h4>
              <p>
                Drafting backtest code, generating first-pass hypotheses to test, and accelerating the exploratory
                phase of research — with a human still required to validate the logic and results, not to replace
                judgment.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Common Pitfalls */}
        <SectionCard title="Where AI Breaks in a Trading Context" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Hallucination on numbers:</strong> Models can state a confident, plausible-sounding financial figure that&apos;s simply wrong — any numerical claim used for a real decision needs independent verification against a source.</li>
            <li><strong>Non-determinism:</strong> The same prompt can produce different outputs on different runs, which conflicts with the reproducibility a rigorous backtest or audit trail requires.</li>
            <li><strong>Latency &amp; cost at scale:</strong> LLM inference is far too slow for high-frequency decisions and can get expensive fast when called on every tick or every filing — it fits research and periodic analysis workflows, not execution speed.</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Code2} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Brain className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Machine Learning</h4>
                <p>
                  LLM-based tooling is a different discipline from the predictive ML models used directly in trading
                  signals — see{" "}
                  <Link href="/quant/quanttrading/machine-learning" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Machine Learning <ArrowRight className="h-3 w-3" />
                  </Link>{" "}
                  for that side of the stack.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Layers className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Systematic Strategies</h4>
                <p>
                  Any AI-assisted signal still needs to be wrapped in the same rule-based discipline — sizing, risk
                  controls, validation — as a hand-built system — see{" "}
                  <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Systematic Strategies <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
