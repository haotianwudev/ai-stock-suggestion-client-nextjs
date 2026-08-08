'use client';

import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function ThirteenFAnalysisContent() {
  // Get configuration for 13F analysis
  const config = getTopicConfig('13f-analysis');

  const heroColorScheme = {
    border: "border-violet-200",
    background: "bg-gradient-to-br from-violet-50 to-purple-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    titleColor: "text-violet-900",
    descriptionColor: "text-violet-700",
    cardBg: "bg-white",
    cardBorder: "border border-violet-100",
    cardText: "text-violet-900",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-800",
    sectionTitle: "text-violet-900"
  };

  const contentSections = (
    <>
      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-violet-900">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-violet-100">
            <h4 className="font-semibold text-violet-900 mb-2">Reading Form 13F</h4>
            <p className="text-sm text-violet-700">What institutional filings disclose, what they omit, and the reporting lag that matters for coattail investors.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-violet-100">
            <h4 className="font-semibold text-violet-900 mb-2">Coattail Investing</h4>
            <p className="text-sm text-violet-700">Systematic frameworks for following institutional conviction without chasing stale positions.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-violet-100">
            <h4 className="font-semibold text-violet-900 mb-2">Investor Philosophies</h4>
            <p className="text-sm text-violet-700">How Druckenmiller, Burry, Buffett, and Munger actually think about position sizing and conviction.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-violet-100">
            <h4 className="font-semibold text-violet-900 mb-2">Political Alpha</h4>
            <p className="text-sm text-violet-700">Congressional stock trading disclosures as another public signal of institutional-grade conviction.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-violet-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-violet-100 text-violet-800">SEC Form 13F</Badge>
          <Badge variant="secondary" className="bg-violet-100 text-violet-800">Coattail Investing</Badge>
          <Badge variant="secondary" className="bg-violet-100 text-violet-800">Institutional Portfolios</Badge>
          <Badge variant="secondary" className="bg-violet-100 text-violet-800">Hedge Fund Strategy</Badge>
          <Badge variant="secondary" className="bg-violet-100 text-violet-800">Congressional Trading</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<FileText className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="13F Analysis Guide"
    />
  );
}
