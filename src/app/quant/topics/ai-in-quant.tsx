'use client';

import { Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

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
      {/* Key Capabilities */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-amber-900">Key Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Multi-Agent Systems</h4>
            <p className="text-sm text-amber-700">Coordinate specialized autonomous agents that collaborate on research, execution, and risk workflows.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Retrieval-Augmented Generation</h4>
            <p className="text-sm text-amber-700">Ground LLM outputs in proprietary research, filings, and market data instead of relying on model memory alone.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Model Context Protocol</h4>
            <p className="text-sm text-amber-700">Standardize how agents discover and call tools, databases, and external systems across a trading stack.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Agentic Harnesses</h4>
            <p className="text-sm text-amber-700">Engineer the execution loop — planning, tool use, and self-correction — that turns an LLM into a reliable agent.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-amber-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">RAG</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Model Context Protocol</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">LangChain</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Function Calling</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Multi-Agent Systems</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Agent Testing</Badge>
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
