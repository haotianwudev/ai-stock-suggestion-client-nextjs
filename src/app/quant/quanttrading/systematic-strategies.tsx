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

  const keyConceptsItems = [
    { icon: <TrendingUp className="h-4 w-4" />, text: "Momentum Strategies" },
    { icon: <BarChart3 className="h-4 w-4" />, text: "Mean Reversion" },
    { icon: <Activity className="h-4 w-4" />, text: "Smart Beta Factors" }
  ];

  const contentSections = (
    <>
      {/* Strategy Types */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Core Strategy Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Momentum Strategies</h4>
            <p className="text-sm text-green-700">Capitalize on trending markets and price momentum patterns using systematic rules.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Mean Reversion</h4>
            <p className="text-sm text-green-700">Profit from price reversals and statistical arbitrage opportunities.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Smart Beta Factors</h4>
            <p className="text-sm text-green-700">Systematic exposure to risk factors like value, quality, momentum, and low volatility.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-900 mb-2">Statistical Arbitrage</h4>
            <p className="text-sm text-green-700">Exploit statistical relationships between correlated assets systematically.</p>
          </div>
        </div>
      </div>

      {/* Smart Beta Deep Dive */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Smart Beta Factor Investing</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800 mb-4">
            Smart Beta combines the benefits of passive indexing with active management by systematically 
            tilting portfolios toward specific risk factors that have historically delivered excess returns.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded border border-green-100">
              <h5 className="font-semibold text-green-900 mb-1">Value Factor</h5>
              <p className="text-xs text-green-700">Low P/E, P/B ratios outperform over long term</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-100">
              <h5 className="font-semibold text-green-900 mb-1">Quality Factor</h5>
              <p className="text-xs text-green-700">High ROE, low debt, stable earnings</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-100">
              <h5 className="font-semibold text-green-900 mb-1">Momentum Factor</h5>
              <p className="text-xs text-green-700">Recent winners continue outperforming</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-100">
              <h5 className="font-semibold text-green-900 mb-1">Low Volatility</h5>
              <p className="text-xs text-green-700">Lower risk stocks with better risk-adjusted returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-green-900">Implementation Framework</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">Signal Generation</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Factor Scoring</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Portfolio Construction</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Risk Management</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Rebalancing Rules</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">Performance Attribution</Badge>
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
      keyConceptsItems={keyConceptsItems}
      contentSections={contentSections}
      videoTitle="Video Tutorial"
      fallbackInfographic={fallbackInfographic}
    />
  );
}