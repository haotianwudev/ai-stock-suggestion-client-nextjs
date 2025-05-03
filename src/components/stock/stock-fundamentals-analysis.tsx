"use client";

import { type StockFundamentals } from "@/lib/graphql/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from "@/components/ui/info-icon";
import { Progress } from "@/components/ui/progress";

interface StockFundamentalsAnalysisProps {
  fundamentals: StockFundamentals | null;
}

type SignalType = 'bullish' | 'neutral' | 'bearish';

const SIGNAL_COLORS: Record<SignalType, string> = {
  "bullish": "text-green-500",
  "neutral": "text-yellow-500",
  "bearish": "text-red-500"
};

const SIGNAL_BG_COLORS: Record<SignalType, string> = {
  "bullish": "bg-green-500",
  "neutral": "bg-yellow-500",
  "bearish": "bg-red-500"
};

const DIMENSION_DESCRIPTIONS = {
  profitability: "Measures how effectively a company generates profits from its assets and operations. Considers Return on Equity, Net Margin, and Operating Margin.",
  growth: "Examines a company's expansion trajectory. Analyzes Revenue Growth, Earnings Growth, and Book Value Growth rates.",
  health: "Assesses financial stability and risk. Evaluates Current Ratio, Debt-to-Equity, and Free Cash Flow conversion.",
  valuation: "Determines if a stock is fairly priced. Examines Price-to-Earnings, Price-to-Book, and Price-to-Sales ratios."
};

const METRIC_DESCRIPTIONS = {
  // Profitability
  return_on_equity: "Return on Equity: Measures how efficiently a company uses shareholders' equity to generate profit. Threshold: >15% is strong.",
  net_margin: "Net Margin: The percentage of revenue that remains as profit after all expenses. Threshold: >20% is healthy.",
  operating_margin: "Operating Margin: Profit from operations as a percentage of revenue, before interest and taxes. Threshold: >15% is efficient.",
  
  // Growth
  revenue_growth: "Revenue Growth: Year-over-year percentage increase in company sales. Threshold: >10% is strong.",
  earnings_growth: "Earnings Growth: Year-over-year percentage increase in company profits. Threshold: >10% is strong.",
  book_value_growth: "Book Value Growth: Year-over-year percentage increase in company equity value. Threshold: >10% is strong.",
  
  // Health
  current_ratio: "Current Ratio: Measures ability to pay short-term obligations (current assets / current liabilities). Threshold: >1.5 indicates good liquidity.",
  debt_to_equity: "Debt-to-Equity: Ratio of total debt to shareholders' equity, indicating financial leverage. Threshold: <0.5 is conservative.",
  fcf_conversion: "Free Cash Flow Conversion: Ratio of free cash flow to earnings, indicating quality of earnings. Threshold: >0.8 (80% of earnings) is healthy.",
  
  // Valuation
  pe_ratio: "Price-to-Earnings: Stock price divided by earnings per share. Threshold: <25 is reasonable, higher values may indicate overvaluation.",
  pb_ratio: "Price-to-Book: Stock price divided by book value per share. Threshold: <3 is reasonable, higher values may indicate overvaluation.",
  ps_ratio: "Price-to-Sales: Stock price divided by revenue per share. Threshold: <5 is reasonable, higher values may indicate overvaluation."
};

const THRESHOLDS = {
  // Profitability
  return_on_equity: 0.15,
  net_margin: 0.20,
  operating_margin: 0.15,
  
  // Growth
  revenue_growth: 0.10,
  earnings_growth: 0.10,
  book_value_growth: 0.10,
  
  // Health
  current_ratio: 1.5,
  debt_to_equity: 0.5,
  fcf_conversion: 0.8,
  
  // Valuation
  pe_ratio: 25,
  pb_ratio: 3,
  ps_ratio: 5,
};

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function formatRatio(value: number): string {
  return value.toFixed(2);
}

export function StockFundamentalsAnalysis({ fundamentals }: StockFundamentalsAnalysisProps) {
  if (!fundamentals) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fundamental Analysis</CardTitle>
          <CardDescription>No fundamental data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const date = new Date(fundamentals.biz_date).toLocaleDateString();
  
  // Calculate free cash flow conversion
  const fcfConversion = fundamentals.free_cash_flow_per_share / fundamentals.earnings_per_share;

  // Organize metrics for display
  const profitabilityMetrics = [
    { name: "Return on Equity", value: fundamentals.return_on_equity, format: formatPercent, threshold: THRESHOLDS.return_on_equity, description: METRIC_DESCRIPTIONS.return_on_equity, isHigherBetter: true },
    { name: "Net Margin", value: fundamentals.net_margin, format: formatPercent, threshold: THRESHOLDS.net_margin, description: METRIC_DESCRIPTIONS.net_margin, isHigherBetter: true },
    { name: "Operating Margin", value: fundamentals.operating_margin, format: formatPercent, threshold: THRESHOLDS.operating_margin, description: METRIC_DESCRIPTIONS.operating_margin, isHigherBetter: true },
  ];
  
  const growthMetrics = [
    { name: "Revenue Growth", value: fundamentals.revenue_growth, format: formatPercent, threshold: THRESHOLDS.revenue_growth, description: METRIC_DESCRIPTIONS.revenue_growth, isHigherBetter: true },
    { name: "Earnings Growth", value: fundamentals.earnings_growth, format: formatPercent, threshold: THRESHOLDS.earnings_growth, description: METRIC_DESCRIPTIONS.earnings_growth, isHigherBetter: true },
    { name: "Book Value Growth", value: fundamentals.book_value_growth, format: formatPercent, threshold: THRESHOLDS.book_value_growth, description: METRIC_DESCRIPTIONS.book_value_growth, isHigherBetter: true },
  ];
  
  const healthMetrics = [
    { name: "Current Ratio", value: fundamentals.current_ratio, format: formatRatio, threshold: THRESHOLDS.current_ratio, description: METRIC_DESCRIPTIONS.current_ratio, isHigherBetter: true },
    { name: "Debt-to-Equity", value: fundamentals.debt_to_equity, format: formatRatio, threshold: THRESHOLDS.debt_to_equity, description: METRIC_DESCRIPTIONS.debt_to_equity, isHigherBetter: false },
    { name: "FCF Conversion", value: fcfConversion, format: formatRatio, threshold: THRESHOLDS.fcf_conversion, description: METRIC_DESCRIPTIONS.fcf_conversion, isHigherBetter: true },
  ];
  
  const valuationMetrics = [
    { name: "P/E Ratio", value: fundamentals.pe_ratio, format: formatRatio, threshold: THRESHOLDS.pe_ratio, description: METRIC_DESCRIPTIONS.pe_ratio, isHigherBetter: false },
    { name: "P/B Ratio", value: fundamentals.pb_ratio, format: formatRatio, threshold: THRESHOLDS.pb_ratio, description: METRIC_DESCRIPTIONS.pb_ratio, isHigherBetter: false },
    { name: "P/S Ratio", value: fundamentals.ps_ratio, format: formatRatio, threshold: THRESHOLDS.ps_ratio, description: METRIC_DESCRIPTIONS.ps_ratio, isHigherBetter: false },
  ];

  const renderMetricRow = (metric: any) => {
    const isGood = metric.isHigherBetter 
      ? metric.value >= metric.threshold 
      : metric.value <= metric.threshold;
    
    const compareText = metric.isHigherBetter 
      ? `>${metric.format(metric.threshold)} is good` 
      : `<${metric.format(metric.threshold)} is good`;
    
    return (
      <div key={metric.name} className="flex items-center justify-between py-2 border-b last:border-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{metric.name}</span>
          <InfoIcon text={metric.description} />
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-sm ${isGood ? "text-green-500 font-medium" : "text-red-500 font-medium"}`}>
            {metric.format(metric.value)}
          </span>
        </div>
      </div>
    );
  };

  const renderDimension = (title: string, metrics: any[], score: number, signal: string, description: string) => (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold">{title}</h3>
          <InfoIcon text={description} />
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-medium text-sm ${SIGNAL_COLORS[signal.toLowerCase() as SignalType]}`}>
            {signal.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        {metrics.map(renderMetricRow)}
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
          <span>Score: {score}/3 metrics meet thresholds</span>
          <span className={`px-2 py-0.5 rounded-full ${SIGNAL_BG_COLORS[signal.toLowerCase() as SignalType]} text-white font-medium`}>
            {signal}
          </span>
        </div>
        <Progress 
          value={(score / 3) * 100} 
          className="h-1.5" 
        />
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Fundamental Analysis</CardTitle>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${SIGNAL_COLORS[(fundamentals.overall_signal.toLowerCase() as SignalType) || 'neutral']}`}>
              {fundamentals.overall_signal.toUpperCase()}
            </span>
            <span className="text-sm text-muted-foreground">
              {fundamentals.confidence}% confidence
            </span>
          </div>
        </div>
        <CardDescription>
          Multi-dimensional fundamental analysis as of {date}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderDimension(
            "Profitability", 
            profitabilityMetrics, 
            fundamentals.profitability_score, 
            fundamentals.profitability_signal,
            DIMENSION_DESCRIPTIONS.profitability
          )}
          
          {renderDimension(
            "Growth", 
            growthMetrics, 
            fundamentals.growth_score, 
            fundamentals.growth_signal,
            DIMENSION_DESCRIPTIONS.growth
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderDimension(
            "Financial Health", 
            healthMetrics, 
            fundamentals.health_score, 
            fundamentals.health_signal,
            DIMENSION_DESCRIPTIONS.health
          )}
          
          {renderDimension(
            "Valuation", 
            valuationMetrics, 
            fundamentals.valuation_score, 
            fundamentals.valuation_signal,
            DIMENSION_DESCRIPTIONS.valuation
          )}
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold mb-1">Methodology:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Profitability (33% weight): Measures how effectively a company generates profit</li>
                <li>Growth (33% weight): Examines a company's expansion rates across revenue, earnings, and book value</li>
                <li>Financial Health (17% weight): Assesses stability, risk levels, and cash flow quality</li>
                <li>Valuation (17% weight): Determines if the current stock price is reasonably valued</li>
              </ul>
            </div>
            <div className="text-right">
              <p className="font-semibold mb-1">Signal Generation:</p>
              <p>Bullish: More bullish than bearish dimensions</p>
              <p>Bearish: More bearish than bullish dimensions</p>
              <p>Neutral: Equal bullish and bearish dimensions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 