'use client';

import { Bot, FileSearch, Database, Users2, Plug, Repeat2, Newspaper, Code2, AlertTriangle, Layers, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-amber-900">{title}</h3>
    </div>
  );
}

export function AiInQuantContent() {
  // Get configuration for AI in quant
  const config = getTopicConfig('ai-in-quant');

  const heroColorScheme = {
    border: "border-amber-200",
    background: "bg-gradient-to-br from-amber-50 to-orange-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    titleColor: "text-amber-900",
    descriptionColor: "text-amber-700",
    cardBg: "bg-white",
    cardBorder: "border border-amber-100",
    cardText: "text-amber-900",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    sectionTitle: "text-amber-900"
  };

  const contentSections = (
    <>
      {/* 1. Foundations */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Foundations" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <FileSearch className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Why LLMs Entered Quant Workflows</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Traditional quant methods excel at structured, numerical data (prices, fundamentals) but have never
                handled unstructured text well — earnings call transcripts, SEC filings, news — at scale. Large language
                models are, for the first time, genuinely competent readers of that unstructured layer, which is why
                they've moved from a novelty to a real input into research pipelines.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Plug className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Function Calling / Tool Use</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                The mechanism underlying everything below: instead of only generating text, a model can emit a structured
                request to run a specific function — query a database, fetch a price, execute code — and receive the
                result back into its context. This is what turns a language model from a chatbot into something that can
                actually do work.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Capabilities */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Core Capabilities" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Users2 className="h-4 w-4 text-amber-600 flex-shrink-0" /> Multi-Agent Systems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
                Splits a complex workflow (research → risk check → execution) across specialized agents that each
                handle one narrow role well, coordinated by an orchestrator — generally more reliable than asking one
                model to do everything in a single pass.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Database className="h-4 w-4 text-amber-600 flex-shrink-0" /> Retrieval-Augmented Generation (RAG)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
                Retrieves relevant documents (filings, research notes, price history) at query time and feeds them into
                the model's context before it answers — grounding the response in real, current data instead of the
                model's frozen training-time memory, which meaningfully cuts down on fabricated facts.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Plug className="h-4 w-4 text-amber-600 flex-shrink-0" /> Model Context Protocol (MCP)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
                A standardized way for an agent to discover and call external tools/databases, so a new data source can
                be plugged into the stack once and used by every agent — instead of writing custom integration glue
                for each model-tool pairing.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Repeat2 className="h-4 w-4 text-amber-600 flex-shrink-0" /> Agentic Harnesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
                The loop wrapped around the model — plan a next step, call a tool, check the result, decide whether to
                retry or continue — that turns a single LLM call into a persistent agent capable of multi-step research
                or analysis tasks, with self-correction along the way.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Practical Applications */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Practical Applications" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Newspaper className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Document &amp; Sentiment Analysis</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Summarizing earnings calls, flagging tone shifts in management language quarter-over-quarter, and
                extracting structured data (guidance numbers, risk factor changes) from filings that would take an
                analyst hours to read manually.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Code2 className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Research &amp; Code Generation</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Drafting backtest code, generating first-pass hypotheses to test, and accelerating the exploratory phase
                of research — with a human still required to validate the logic and results, not to replace judgment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" /> Where AI Breaks in a Trading Context
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Hallucination on numbers:</span>
              <span>Models can state a confident, plausible-sounding financial figure that's simply wrong — any
                numerical claim used for a real decision needs independent verification against a source.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Non-determinism:</span>
              <span>The same prompt can produce different outputs on different runs, which conflicts with the
                reproducibility a rigorous backtest or audit trail requires.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Latency &amp; cost at scale:</span>
              <span>LLM inference is far too slow for high-frequency decisions and can get expensive fast when called
                on every tick or every filing — it fits research and periodic analysis workflows, not execution speed.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Brain className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Machine Learning</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                LLM-based tooling is a different discipline from the predictive ML models used directly in trading
                signals — see{" "}
                <Link href="/quant/quanttrading/machine-learning" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                  Machine Learning <ArrowRight className="h-3 w-3" />
                </Link>{" "}
                for that side of the stack.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Layers className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Systematic Strategies</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Any AI-assisted signal still needs to be wrapped in the same rule-based discipline — sizing, risk
                controls, validation — as a hand-built system — see{" "}
                <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                  Systematic Strategies <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Bot className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="AI in Quant Guide"
    />
  );
}
