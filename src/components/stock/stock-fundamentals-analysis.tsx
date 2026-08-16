"use client";

import { type StockFundamentals } from "@/lib/graphql/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { VideoTutorial } from "@/components/ui/video-tutorial";

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

function formatRatio(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }
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
  const getComparisonColor = (value: number | null | undefined, threshold: number, isHigherBetter: boolean) => {
    if (value === null || value === undefined || isNaN(value)) {
      return "text-muted-foreground";
    }
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
      <div key={metric.name} className="space-y-1 mb-3 bg-gray-50/50 dark:bg-gray-800/30 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800/60">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{metric.name}</span>
          <span className={`text-xs sm:text-sm font-bold ${comparisonColor}`}>
            {formattedValue}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 break-words hyphens-auto leading-relaxed">
          {metric.description}
        </p>
      </div>
    );
  };

  const renderDimension = (title: string, metrics: any[], score: number, signal: string, description: string) => (
    <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <CardContent className="pt-5 sm:pt-6 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
            <span className={`font-bold ${SIGNAL_COLORS[signal.toLowerCase() as SignalType]} capitalize`}>{signal}</span>
            <span className="text-slate-400 dark:text-slate-500">({score}/3 metrics)</span>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
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
    <div className="space-y-5 sm:space-y-6">
      {/* Overall Fundamental Signal */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Fundamental Analysis</h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Analysis Date:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{date}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          Ideal for long-term investment decisions based on company financial strength and business quality rather than short-term price movements.
        </p>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <div className={`w-3.5 h-3.5 rounded-full ${SIGNAL_BG_COLORS[fundamentals.overall_signal.toLowerCase() as SignalType]}`}></div>
            <div className="flex items-center gap-1 text-sm">
              <span className={`font-semibold capitalize ${SIGNAL_COLORS[fundamentals.overall_signal.toLowerCase() as SignalType]}`}>{fundamentals.overall_signal}</span>
              <span className="text-slate-500 dark:text-slate-400">with {Math.round(fundamentals.confidence)}% confidence</span>
            </div>
          </div>

          {/* Dimension Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-2">
            <div className="bg-gray-50/70 dark:bg-gray-800/40 rounded-xl p-2.5 text-center border border-gray-200 dark:border-gray-800">
              <div className={`text-xs font-bold capitalize ${SIGNAL_COLORS[fundamentals.profitability_signal.toLowerCase() as SignalType]}`}>
                {fundamentals.profitability_signal}
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Profitability</div>
            </div>
            
            <div className="bg-gray-50/70 dark:bg-gray-800/40 rounded-xl p-2.5 text-center border border-gray-200 dark:border-gray-800">
              <div className={`text-xs font-bold capitalize ${SIGNAL_COLORS[fundamentals.growth_signal.toLowerCase() as SignalType]}`}>
                {fundamentals.growth_signal}
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Growth</div>
            </div>
            
            <div className="bg-gray-50/70 dark:bg-gray-800/40 rounded-xl p-2.5 text-center border border-gray-200 dark:border-gray-800">
              <div className={`text-xs font-bold capitalize ${SIGNAL_COLORS[fundamentals.health_signal.toLowerCase() as SignalType]}`}>
                {fundamentals.health_signal}
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Financial Health</div>
            </div>
            
            <div className="bg-gray-50/70 dark:bg-gray-800/40 rounded-xl p-2.5 text-center border border-gray-200 dark:border-gray-800">
              <div className={`text-xs font-bold capitalize ${SIGNAL_COLORS[fundamentals.valuation_signal.toLowerCase() as SignalType]}`}>
                {fundamentals.valuation_signal}
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Valuation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Cards */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
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
        
        {/* Enhanced Financial Health Section with Video Tutorial */}
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <CardContent className="pt-5 sm:pt-6 px-4 sm:px-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Financial Health</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <span className={`font-bold ${SIGNAL_COLORS[fundamentals.health_signal.toLowerCase() as SignalType]} capitalize`}>{fundamentals.health_signal}</span>
                <span className="text-slate-400 dark:text-slate-500">({fundamentals.health_score}/3 metrics)</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              {DIMENSION_DESCRIPTIONS.health}
            </p>
            
            {/* Video Tutorial Section */}
            <VideoTutorial
              title="Video Tutorial: Understanding Financial Health"
              description="Understand how financial health metrics work and why traditional metrics can sometimes mislead."
              videoId="qOzB4WtPRok"
              className="mb-5"
            />
            
            <div className="space-y-2 mb-4">
              {healthMetrics.map(renderMetricRow)}
            </div>

            <div className="mt-2">
              <Progress 
                value={(fundamentals.health_score / 3) * 100} 
                className="h-1.5" 
              />
            </div>
          </CardContent>
        </Card>
        
        {renderDimension(
          "Valuation", 
          valuationMetrics, 
          fundamentals.valuation_score, 
          fundamentals.valuation_signal,
          DIMENSION_DESCRIPTIONS.valuation
        )}
      </div>

      {/* Methodology */}
      <div className="bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm shadow-xs">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Methodology:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400">
              <li>Profitability (33% weight): Measures how effectively a company generates profit</li>
              <li>Growth (33% weight): Examines expansion across revenue, earnings, and book value</li>
              <li>Financial Health (17% weight): Assesses liquidity, leverage, and cash conversion</li>
              <li>Valuation (17% weight): Evaluates multiple ratios against fundamental baseline</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Signal Generation:</p>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400">
              <li><span className="text-emerald-600 dark:text-emerald-400 font-semibold">Bullish:</span> More bullish than bearish dimensions</li>
              <li><span className="text-rose-600 dark:text-rose-400 font-semibold">Bearish:</span> More bearish than bullish dimensions</li>
              <li><span className="text-amber-600 dark:text-amber-400 font-semibold">Neutral:</span> Equal bullish and bearish dimensions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 