'use client';

import { Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function MacroAnalysisContent() {
  // Get configuration for macro analysis
  const config = getTopicConfig('macro-analysis');

  const heroColorScheme = {
    border: "border-emerald-200",
    background: "bg-gradient-to-br from-emerald-50 to-green-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    titleColor: "text-emerald-900",
    descriptionColor: "text-emerald-700",
    cardBg: "bg-white",
    cardBorder: "border border-emerald-100",
    cardText: "text-emerald-900",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    sectionTitle: "text-emerald-900"
  };

  const contentSections = (
    <>
      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-emerald-900">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-emerald-100">
            <h4 className="font-semibold text-emerald-900 mb-2">Macro Regime Detection</h4>
            <p className="text-sm text-emerald-700">Frameworks like the Investment Clock for mapping growth and inflation to asset allocation.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-emerald-100">
            <h4 className="font-semibold text-emerald-900 mb-2">Monetary Policy</h4>
            <p className="text-sm text-emerald-700">Fed policy shifts, dollar dynamics, and their transmission into equity and fixed-income markets.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-emerald-100">
            <h4 className="font-semibold text-emerald-900 mb-2">Market Cycle Theory</h4>
            <p className="text-sm text-emerald-700">Reading where markets sit in the cycle — a la Howard Marks — rather than reacting to headlines.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-emerald-100">
            <h4 className="font-semibold text-emerald-900 mb-2">Shocks & Regime Shifts</h4>
            <p className="text-sm text-emerald-700">Case studies on stagflation fears, trade shocks, and carry-trade unwinds that reshaped portfolios.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-emerald-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Investment Clock</Badge>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Monetary Policy</Badge>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Market Cycles</Badge>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Dollar Dynamics</Badge>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Asset Allocation</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Landmark className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Macro Analysis Guide"
    />
  );
}
