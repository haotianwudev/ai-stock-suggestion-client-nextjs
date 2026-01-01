'use client';

import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

export function TradingSystemContent() {
  const config = getQuantTopicConfig('trading-system');
  
  if (!config) return null;

  // Define color scheme for Trading System (teal theme)
  const heroColorScheme = {
    border: "border-teal-200",
    background: "bg-gradient-to-br from-teal-50 to-cyan-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    titleColor: "text-teal-900",
    descriptionColor: "text-teal-700",
    cardBg: "bg-white",
    cardBorder: "border border-teal-100",
    cardText: "text-teal-900",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-800",
    sectionTitle: "text-teal-900"
  };

  // Define custom content sections
  const contentSections = (
    <>
      {/* Four Pillars of Quant Trading */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">The Four Pillars of Quantitative Trading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">1. Alpha Discovery & Research</h4>
            <p className="text-sm text-teal-700">Data collection, feature engineering, and machine learning model development to identify predictive signals in market data.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">2. Portfolio Construction</h4>
            <p className="text-sm text-teal-700">Risk management, market-neutral positioning, and systematic hedging to create robust trading strategies.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">3. Rigorous Backtesting</h4>
            <p className="text-sm text-teal-700">Historical simulation with realistic market frictions, avoiding biases, and comprehensive performance evaluation.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">4. Automated Execution</h4>
            <p className="text-sm text-teal-700">Low-latency trading systems, algorithmic execution, and transaction cost analysis for optimal market impact.</p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Core Technologies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-lg border border-teal-100 text-center">
            <div className="font-semibold text-teal-800 text-sm">Python</div>
            <div className="text-xs text-teal-600">Research & Modeling</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-teal-100 text-center">
            <div className="font-semibold text-teal-800 text-sm">C++/Rust</div>
            <div className="text-xs text-teal-600">Low-Latency Execution</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-teal-100 text-center">
            <div className="font-semibold text-teal-800 text-sm">KDB+/q</div>
            <div className="text-xs text-teal-600">Time-Series Data</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-teal-100 text-center">
            <div className="font-semibold text-teal-800 text-sm">Cloud</div>
            <div className="text-xs text-teal-600">Scalable Compute</div>
          </div>
        </div>
      </div>

      {/* Key Challenges */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Perpetual Challenges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">Alpha Decay</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">Market Adaptation</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">Continuous Research</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">Risk Management</Badge>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">Execution Quality</Badge>
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Implementation Approach</h3>
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-teal-800 mb-1">Data Pipeline</div>
              <div className="text-teal-700">Alternative data sources, feature engineering, real-time processing</div>
            </div>
            <div>
              <div className="font-semibold text-teal-800 mb-1">Model Development</div>
              <div className="text-teal-700">ML algorithms, cross-validation, ensemble methods</div>
            </div>
            <div>
              <div className="font-semibold text-teal-800 mb-1">Production System</div>
              <div className="text-teal-700">Monitoring, risk controls, performance tracking</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Settings className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Trading System Architecture Infographic"
    />
  );
}