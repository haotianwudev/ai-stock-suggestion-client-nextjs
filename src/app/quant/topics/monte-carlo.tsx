'use client';

import { Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { TopicConfig } from "./config";

export function MonteCarloContent({ config }: { config?: TopicConfig }) {
  const heroColorScheme = {
    border: "border-blue-200",
    background: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    descriptionColor: "text-blue-700",
    cardBg: "bg-white",
    cardBorder: "border border-blue-100",
    cardText: "text-blue-900",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    sectionTitle: "text-blue-900"
  };



  const contentSections = (
    <>
      {/* Monte Carlo Applications */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Key Applications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Option Pricing</h4>
            <p className="text-sm text-blue-700">Price complex derivatives using stochastic processes and random sampling.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Risk Management</h4>
            <p className="text-sm text-blue-700">Assess portfolio risk through scenario analysis and stress testing.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Portfolio Optimization</h4>
            <p className="text-sm text-blue-700">Optimize asset allocation using probabilistic return distributions.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Credit Risk</h4>
            <p className="text-sm text-blue-700">Model default probabilities and credit value adjustments (CVA).</p>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Implementation Framework</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Random Sampling</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Stochastic Processes</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Convergence Analysis</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Variance Reduction</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Statistical Analysis</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Scenario Generation</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Calculator className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Monte Carlo Simulation in Quantitative Finance"
    />
  );
}