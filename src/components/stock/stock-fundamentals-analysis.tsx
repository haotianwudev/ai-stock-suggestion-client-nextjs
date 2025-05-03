"use client";

import { type StockFundamentals } from "@/lib/graphql/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SignalType = "bullish" | "neutral" | "bearish";

interface StockFundamentalsAnalysisProps {
  fundamentals: StockFundamentals | null;
}

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
  return_on_equity: "Measures how efficiently a company uses shareholders' equity to generate profit. Threshold: >15% is strong.",
  net_margin: "The percentage of revenue that remains as profit after all expenses. Threshold: >20% is healthy.",
  operating_margin: "Profit from operations as a percentage of revenue, before interest and taxes. Threshold: >15% is efficient.",
  
  // Growth
  revenue_growth: "Year-over-year percentage increase in company sales. Threshold: >10% is strong.",
  earnings_growth: "Year-over-year percentage increase in company profits. Threshold: >10% is strong.",
  book_value_growth: "Year-over-year percentage increase in company equity value. Threshold: >10% is strong.",
  
  // Health
  current_ratio: "Measures ability to pay short-term obligations (current assets / current liabilities). Threshold: >1.5 indicates good liquidity.",
  debt_to_equity: "Ratio of total debt to shareholders' equity, indicating financial leverage. Threshold: <0.5 is conservative.",
  fcf_conversion: "Ratio of free cash flow to earnings, indicating quality of earnings. Threshold: >0.8 (80% of earnings) is healthy.",
  
  // Valuation
  pe_ratio: "Stock price divided by earnings per share. Threshold: <25 is reasonable, higher values may indicate overvaluation.",
  pb_ratio: "Stock price divided by book value per share. Threshold: <3 is reasonable, higher values may indicate overvaluation.",
  ps_ratio: "Stock price divided by revenue per share. Threshold: <5 is reasonable, higher values may indicate overvaluation."
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
      <div className="text-center p-4">
        <p>No fundamental analysis data available.</p>
      </div>
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

  // Get color based on value comparison to threshold
  const getComparisonColor = (value: number, threshold: number, isHigherBetter: boolean) => {
    if (isHigherBetter) {
      return value >= threshold ? "text-green-500" : "text-red-500";
    } else {
      return value <= threshold ? "text-green-500" : "text-red-500";
    }
  };

  // Render a metric row with value and threshold comparison
  const renderMetricRow = (metric: any) => {
    const formattedValue = metric.format(metric.value);
    const comparisonColor = getComparisonColor(metric.value, metric.threshold, metric.isHigherBetter);
    
    return (
      <div key={metric.name} className="space-y-1 mb-4">
        <div className="flex justify-between">
          <span className="font-medium">{metric.name}</span>
          <span className={`font-medium ${comparisonColor}`}>
            {formattedValue}
          </span>
        </div>
        <p className="text-xs text-muted-foreground break-words hyphens-auto">
          {metric.description}
        </p>
      </div>
    );
  };

  const renderDimension = (title: string, metrics: any[], score: number, signal: string, description: string) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${SIGNAL_COLORS[signal.toLowerCase() as SignalType]} capitalize`}>{signal}</span>
            <span className="text-sm text-muted-foreground ml-1">({score}/3 metrics)</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        <div className="space-y-2 mb-4">
          {metrics.map(renderMetricRow)}
        </div>

        <div className="mt-2">
          <Progress 
            value={(score / 3) * 100} 
            className="h-1.5" 
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Overall Fundamental Signal */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Fundamental Analysis</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Analysis Date:</span>
            <span className="font-medium">{date}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Ideal for long-term investment decisions based on company financial strength and business quality rather than short-term price movements
        </p>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${SIGNAL_BG_COLORS[fundamentals.overall_signal.toLowerCase() as SignalType]}`}></div>
            <div className="flex items-center gap-1">
              <span className={`font-semibold capitalize ${SIGNAL_COLORS[fundamentals.overall_signal.toLowerCase() as SignalType]}`}>{fundamentals.overall_signal}</span>
              <span className="text-sm text-muted-foreground">with {Math.round(fundamentals.confidence)}% confidence</span>
            </div>
          </div>

          {/* Dimension Overview Cards */}
          <div className="grid md:grid-cols-4 gap-2 mt-4">
            <div className="bg-muted/50 rounded-lg p-2 text-center">
              <div className={`text-xs font-semibold capitalize ${SIGNAL_COLORS[fundamentals.profitability_signal.toLowerCase() as SignalType]}`}>
                {fundamentals.profitability_signal}
              </div>
              <div className="text-xs text-muted-foreground">Profitability</div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-2 text-center">
              <div className={`text-xs font-semibold capitalize ${SIGNAL_COLORS[fundamentals.growth_signal.toLowerCase() as SignalType]}`}>
                {fundamentals.growth_signal}
              </div>
              <div className="text-xs text-muted-foreground">Growth</div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-2 text-center">
              <div className={`text-xs font-semibold capitalize ${SIGNAL_COLORS[fundamentals.health_signal.toLowerCase() as SignalType]}`}>
                {fundamentals.health_signal}
              </div>
              <div className="text-xs text-muted-foreground">Financial Health</div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-2 text-center">
              <div className={`text-xs font-semibold capitalize ${SIGNAL_COLORS[fundamentals.valuation_signal.toLowerCase() as SignalType]}`}>
                {fundamentals.valuation_signal}
              </div>
              <div className="text-xs text-muted-foreground">Valuation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Cards */}
      <div className="grid md:grid-cols-2 gap-6">
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

      {/* Methodology */}
      <div className="bg-muted/50 p-4 rounded-lg text-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold mb-2">Methodology:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Profitability (33% weight): Measures how effectively a company generates profit</li>
              <li>Growth (33% weight): Examines a company's expansion rates across revenue, earnings, and book value</li>
              <li>Financial Health (17% weight): Assesses stability, risk levels, and cash flow quality</li>
              <li>Valuation (17% weight): Determines if the current stock price is reasonably valued</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Signal Generation:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><span className="text-green-500 font-medium">Bullish:</span> More bullish than bearish dimensions</li>
              <li><span className="text-red-500 font-medium">Bearish:</span> More bearish than bullish dimensions</li>
              <li><span className="text-yellow-500 font-medium">Neutral:</span> Equal bullish and bearish dimensions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 