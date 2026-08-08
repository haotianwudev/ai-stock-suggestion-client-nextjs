'use client';

import { PiggyBank } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function WealthPlanningContent() {
  // Get configuration for wealth & planning
  const config = getTopicConfig('wealth-planning');

  const heroColorScheme = {
    border: "border-amber-200",
    background: "bg-gradient-to-br from-amber-50 to-yellow-50",
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
      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-amber-900">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Estate Planning</h4>
            <p className="text-sm text-amber-700">Trusts and wealth-transfer structures for protecting and passing on assets.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Retirement Architecture</h4>
            <p className="text-sm text-amber-700">Building a durable retirement plan, including the role of insurance products.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Tax-Efficient Investing</h4>
            <p className="text-sm text-amber-700">Tax-loss harvesting and direct indexing as systematic, algorithmic tax-management tools.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Wealth Preservation</h4>
            <p className="text-sm text-amber-700">Strategic asset allocation frameworks built for multi-generational time horizons.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-amber-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Estate Planning</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Retirement Planning</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Tax-Loss Harvesting</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Direct Indexing</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Wealth Preservation</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<PiggyBank className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Wealth & Planning Guide"
    />
  );
}
