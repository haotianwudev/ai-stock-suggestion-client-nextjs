'use client';

import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function RiskManagementContent() {
  // Get configuration for risk management
  const config = getTopicConfig('risk-management');

  const heroColorScheme = {
    border: "border-rose-200",
    background: "bg-gradient-to-br from-rose-50 to-red-50",
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
            <h4 className="font-semibold text-rose-900 mb-2">Factor Risk Models</h4>
            <p className="text-sm text-rose-700">Decompose portfolio risk into systematic factor exposures rather than relying on realized volatility alone.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-rose-100">
            <h4 className="font-semibold text-rose-900 mb-2">Tail Risk & VaR</h4>
            <p className="text-sm text-rose-700">Go beyond Value-at-Risk with conformal prediction and skew-based measures of extreme downside.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-rose-100">
            <h4 className="font-semibold text-rose-900 mb-2">Counterparty & Credit Risk</h4>
            <p className="text-sm text-rose-700">Understand margin, collateral, and default exposure in derivatives and private credit markets.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-rose-100">
            <h4 className="font-semibold text-rose-900 mb-2">Systemic Contagion</h4>
            <p className="text-sm text-rose-700">See how localized shocks — a mega-IPO, a funding squeeze, a single-market crisis — propagate across asset classes.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-rose-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Factor Models</Badge>
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Value at Risk</Badge>
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Tail Risk</Badge>
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Correlation</Badge>
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Counterparty Credit Risk</Badge>
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">Systemic Contagion</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Shield className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Risk Management Guide"
    />
  );
}
