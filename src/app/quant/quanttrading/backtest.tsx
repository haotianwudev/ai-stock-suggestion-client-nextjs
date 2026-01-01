'use client';

import { BarChart3, TrendingUp, AlertTriangle, Target, Shield, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

export function BacktestContent() {
  // Get configuration for backtest
  const config = getQuantTopicConfig('backtest');

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
      {/* Key Performance Metrics */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Essential Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Sharpe Ratio</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">Risk-adjusted return measurement</p>
            <code className="text-xs bg-blue-50 px-2 py-1 rounded">(Return - Risk-free) / Volatility</code>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Sortino Ratio</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">Downside risk-adjusted returns</p>
            <code className="text-xs bg-blue-50 px-2 py-1 rounded">(Return - Risk-free) / Downside Dev</code>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Maximum Drawdown</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">Largest peak-to-trough decline</p>
            <code className="text-xs bg-blue-50 px-2 py-1 rounded">Max(Peak - Trough) / Peak</code>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Alpha & Beta</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">Excess return vs market sensitivity</p>
            <code className="text-xs bg-blue-50 px-2 py-1 rounded">α = Return - β × Market Return</code>
          </div>
        </div>
      </div>

      {/* Backtesting Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Backtesting Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Data Quality</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Survivorship bias</li>
              <li>• Look-ahead bias</li>
              <li>• Point-in-time data</li>
              <li>• Corporate actions</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Transaction Costs</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Bid-ask spreads</li>
              <li>• Commission fees</li>
              <li>• Market impact</li>
              <li>• Slippage modeling</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Risk Controls</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Position sizing</li>
              <li>• Stop-loss rules</li>
              <li>• Exposure limits</li>
              <li>• Correlation checks</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Common Pitfalls to Avoid</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h4 className="font-semibold text-red-900">Critical Biases</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <strong className="text-red-800">Overfitting:</strong>
              <span className="text-red-700"> Too many parameters for limited data</span>
            </div>
            <div>
              <strong className="text-red-800">Data Snooping:</strong>
              <span className="text-red-700"> Testing multiple strategies on same data</span>
            </div>
            <div>
              <strong className="text-red-800">Regime Changes:</strong>
              <span className="text-red-700"> Market structure evolution</span>
            </div>
            <div>
              <strong className="text-red-800">Liquidity Assumptions:</strong>
              <span className="text-red-700"> Unrealistic execution assumptions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Tools */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Implementation Tools</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Python (Backtrader)</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">R (quantstrat)</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">MATLAB</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">QuantConnect</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Zipline</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">TradingView</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">MetaTrader</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Bloomberg Terminal</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<BarChart3 className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Backtesting and Performance Analysis Guide"
    />
  );
}