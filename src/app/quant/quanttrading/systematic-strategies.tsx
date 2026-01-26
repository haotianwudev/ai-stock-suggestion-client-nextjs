'use client';

import { Activity, TrendingUp, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

export function SystematicStrategiesContent() {
  // Get configuration for systematic strategies
  const config = getQuantTopicConfig('systematic-strategies');

  const heroColorScheme = {
    border: "border-green-200",
    background: "bg-gradient-to-br from-green-50 to-emerald-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    descriptionColor: "text-green-700",
    cardBg: "bg-white",
    cardBorder: "border border-green-100",
    cardText: "text-green-900",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    sectionTitle: "text-green-900"
  };

  const contentSections = (
    <>
      {/* Core Strategy Types */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Rule-Based Strategy Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 md:p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2 text-sm md:text-base">Momentum Systems</h4>
            <p className="text-xs md:text-sm text-green-700 leading-relaxed">Systematic rules to capture trending markets and price momentum patterns without discretionary decisions.</p>
          </div>
          <div className="p-3 md:p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2 text-sm md:text-base">Mean Reversion</h4>
            <p className="text-xs md:text-sm text-green-700 leading-relaxed">Algorithmic approaches to profit from price reversals and statistical arbitrage opportunities.</p>
          </div>
          <div className="p-3 md:p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2 text-sm md:text-base">Factor Models</h4>
            <p className="text-xs md:text-sm text-green-700 leading-relaxed">Systematic exposure to risk factors using quantitative scoring and ranking systems.</p>
          </div>
          <div className="p-3 md:p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2 text-sm md:text-base">Calendar Effects</h4>
            <p className="text-xs md:text-sm text-green-700 leading-relaxed">Exploit seasonal patterns and calendar anomalies through systematic timing rules.</p>
          </div>
        </div>
      </div>

      {/* Systematic Approach Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Systematic Trading Framework</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-green-800 mb-4 leading-relaxed">
            Systematic trading removes emotional bias by following predefined rules and algorithms. 
            Unlike machine learning approaches, these strategies use transparent, interpretable rules 
            that can be easily understood and implemented by individual traders.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded border border-green-100">
              <h5 className="font-semibold text-green-900 mb-1 text-sm">Signal Generation</h5>
              <p className="text-xs text-green-700 leading-relaxed">Clear rules for entry/exit signals</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-100">
              <h5 className="font-semibold text-green-900 mb-1 text-sm">Risk Management</h5>
              <p className="text-xs text-green-700 leading-relaxed">Systematic position sizing and stops</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-100">
              <h5 className="font-semibold text-green-900 mb-1 text-sm">Execution Rules</h5>
              <p className="text-xs text-green-700 leading-relaxed">Automated order management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Implementation Components</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Rule Definition</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Signal Processing</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Backtesting</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Risk Controls</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Performance Tracking</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Regime Detection</Badge>
        </div>
      </div>
    </>
  );

  const fallbackInfographic = (
    <div 
      className="relative rounded-xl overflow-hidden shadow-lg border border-green-200 cursor-pointer group"
    >
      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
        <div className="text-center p-6">
          <Activity className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-green-800 font-medium">Systematic Strategies Framework</p>
          <p className="text-green-600 text-sm mt-2">Visual guide coming soon</p>
        </div>
      </div>
    </div>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Activity className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      fallbackInfographic={fallbackInfographic}
    />
  );
}