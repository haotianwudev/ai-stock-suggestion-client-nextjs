'use client';

import { Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function EtfMutualFundContent() {
  // Get configuration for ETF & mutual fund
  const config = getTopicConfig('etf-mutual-fund');

  const heroColorScheme = {
    border: "border-indigo-200",
    background: "bg-gradient-to-br from-indigo-50 to-blue-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    titleColor: "text-indigo-900",
    descriptionColor: "text-indigo-700",
    cardBg: "bg-white",
    cardBorder: "border border-indigo-100",
    cardText: "text-indigo-900",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
    sectionTitle: "text-indigo-900"
  };

  const contentSections = (
    <>
      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-indigo-900">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">ETF Mechanics</h4>
            <p className="text-sm text-indigo-700">Creation/redemption, tracking error, and the structural risks unique to exchange-traded products.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">ETFs vs Mutual Funds</h4>
            <p className="text-sm text-indigo-700">Tax efficiency, liquidity, and cost differences that determine which vehicle fits which goal.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">Beyond the Benchmarks</h4>
            <p className="text-sm text-indigo-700">Alternatives to SPY, QQQ, and VOO for investors seeking differentiated exposure.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">Index Products</h4>
            <p className="text-sm text-indigo-700">How small-cap and global index funds fit into a diversified portfolio.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-indigo-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">ETF Structure</Badge>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Mutual Funds</Badge>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Index Investing</Badge>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Tracking Error</Badge>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Passive Investing</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Layers className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="ETF & Mutual Fund Guide"
    />
  );
}
