'use client';

import { LineChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function StockAnalysisContent() {
  // Get configuration for stock analysis
  const config = getTopicConfig('stock-analysis');

  const heroColorScheme = {
    border: "border-sky-200",
    background: "bg-gradient-to-br from-sky-50 to-blue-50",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    titleColor: "text-sky-900",
    descriptionColor: "text-sky-700",
    cardBg: "bg-white",
    cardBorder: "border border-sky-100",
    cardText: "text-sky-900",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-800",
    sectionTitle: "text-sky-900"
  };

  const contentSections = (
    <>
      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-sky-900">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-sky-100">
            <h4 className="font-semibold text-sky-900 mb-2">Valuation Frameworks</h4>
            <p className="text-sm text-sky-700">DCF, EV/EBITDA, and comparable multiples — knowing which lens fits which company.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-sky-100">
            <h4 className="font-semibold text-sky-900 mb-2">Analyst Consensus</h4>
            <p className="text-sm text-sky-700">Reading target prices critically — incentives, dispersion, and where consensus gets it wrong.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-sky-100">
            <h4 className="font-semibold text-sky-900 mb-2">Technical & Insider Signals</h4>
            <p className="text-sm text-sky-700">Trend vs. momentum, support levels, and what insider trading actually predicts.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-sky-100">
            <h4 className="font-semibold text-sky-900 mb-2">Case Studies</h4>
            <p className="text-sm text-sky-700">Deep dives on NVIDIA, Tesla, and Figma applying these frameworks to real names.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-sky-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-sky-100 text-sky-800">DCF Valuation</Badge>
          <Badge variant="secondary" className="bg-sky-100 text-sky-800">Analyst Consensus</Badge>
          <Badge variant="secondary" className="bg-sky-100 text-sky-800">Technical Analysis</Badge>
          <Badge variant="secondary" className="bg-sky-100 text-sky-800">Insider Trading</Badge>
          <Badge variant="secondary" className="bg-sky-100 text-sky-800">Fundamental Analysis</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<LineChart className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Stock Analysis Guide"
    />
  );
}
