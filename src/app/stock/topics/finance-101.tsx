'use client';

import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function Finance101Content() {
  // Get configuration for finance 101
  const config = getTopicConfig('finance-101');

  const heroColorScheme = {
    border: "border-rose-200",
    background: "bg-gradient-to-br from-rose-50 to-pink-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    titleColor: "text-rose-900",
    descriptionColor: "text-rose-700",
    cardBg: "bg-white",
    cardBorder: "border border-rose-100",
    cardText: "text-rose-900",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    sectionTitle: "text-rose-900"
  };

  const contentSections = (
    <>
      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-rose-900">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-rose-100">
            <h4 className="font-semibold text-rose-900 mb-2">Trading Psychology</h4>
            <p className="text-sm text-rose-700">Why most investors lose money to their own behavior before they lose it to the market.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-rose-100">
            <h4 className="font-semibold text-rose-900 mb-2">Market Structure & Hype</h4>
            <p className="text-sm text-rose-700">Meme stocks, viral AI stock-picking claims, and real cases of market manipulation.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-rose-100">
            <h4 className="font-semibold text-rose-900 mb-2">New Frontiers</h4>
            <p className="text-sm text-rose-700">ESG investing, prediction markets, and an introduction to Bitcoin, DeFi, and stablecoins.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-rose-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Trading Psychology</Badge>
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">ESG Investing</Badge>
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Crypto Basics</Badge>
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Prediction Markets</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<GraduationCap className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Finance 101 Guide"
    />
  );
}
