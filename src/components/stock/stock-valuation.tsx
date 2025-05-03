"use client";

import { type StockValuation } from "@/lib/graphql/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { InfoIcon } from "@/components/ui/info-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StockValuationProps {
  valuations: StockValuation[];
}

const METHOD_NAMES: Record<string, string> = {
  "dcf": "Discounted Cash Flow",
  "ev_ebitda": "EV/EBITDA Multiple",
  "owner_earnings": "Owner Earnings",
  "residual_income": "Residual Income",
  "weighted": "Weighted Average"
};

const METHOD_WEIGHTS: Record<string, number> = {
  "dcf": 0.35,
  "ev_ebitda": 0.20,
  "owner_earnings": 0.35,
  "residual_income": 0.10
};

const METHOD_DESCRIPTIONS: Record<string, string> = {
  "dcf": "5-year free cash flow projection with 5% growth and 10% discount rates. Measures the present value of expected future cash flows.",
  "ev_ebitda": "Compares enterprise value to earnings before interest, taxes, depreciation & amortization using median historical multiple.",
  "owner_earnings": "Warren Buffett's preferred method: Net Income + Depreciation - Maintenance Capex, discounted with margin of safety.",
  "residual_income": "Accounts for cost of capital and is based on book value growth. Measures excess returns over required cost of capital.",
  "weighted": "A weighted average of the four valuation methods, with DCF and Owner Earnings weighted at 35%, EV/EBITDA at 20%, and Residual Income at 10%."
};

const SIGNAL_COLORS: Record<string, string> = {
  "bullish": "text-green-500",
  "neutral": "text-yellow-500",
  "bearish": "text-red-500"
};

const SIGNAL_BG_COLORS: Record<string, string> = {
  "bullish": "bg-green-500",
  "neutral": "bg-yellow-500",
  "bearish": "bg-red-500"
};

export function StockValuation({ valuations }: StockValuationProps) {
  if (!valuations || valuations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Valuation Analysis</CardTitle>
          <CardDescription>No valuation data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Find the weighted valuation
  const weightedValuation = valuations.find(v => v.valuation_method === "weighted");
  
  // Filter out the weighted from individual methods
  const methodValuations = valuations.filter(v => v.valuation_method !== "weighted");

  // Calculate confidence (capped at 30% absolute gap)
  const getConfidence = (gap: number) => {
    const absGap = Math.abs(gap);
    return Math.min(absGap, 0.3) / 0.3 * 100;
  };

  const confidence = weightedValuation ? getConfidence(weightedValuation.gap) : 0;
  const date = weightedValuation?.biz_date ? new Date(weightedValuation.biz_date).toLocaleDateString() : "";

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Valuation Analysis</CardTitle>
        <CardDescription>
          Multiple valuation methods as of {date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {weightedValuation && (
          <div className="mb-6 p-4 border rounded-lg bg-muted/40">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">Summary Valuation</h3>
                  <InfoIcon text={METHOD_DESCRIPTIONS["weighted"]} />
                </div>
                <span className={`font-bold ${SIGNAL_COLORS[weightedValuation.signal]}`}>
                  {weightedValuation.signal.toUpperCase()}
                </span>
              </div>
              
              <div className="flex flex-col space-y-1">
                <div className="text-sm text-muted-foreground">
                  Intrinsic Value: {formatCurrency(weightedValuation.intrinsic_value)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Market Cap: {formatCurrency(weightedValuation.market_cap)}
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex-1 mr-2">
                    <Progress 
                      value={50 + (weightedValuation.gap * 100)} 
                      max={100} 
                      className="h-2"
                    />
                  </div>
                  <span className={`text-sm font-medium ${weightedValuation.gap >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {formatPercent(weightedValuation.gap)}
                  </span>
                </div>
              </div>
              
              <div className="mt-1">
                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                  Confidence: {Math.round(confidence)}%
                  <InfoIcon text="Confidence is scaled based on gap magnitude (0-30%). A larger absolute gap indicates stronger mispricing confidence, capped at 30% difference." />
                </div>
                <Progress value={confidence} className="h-1.5" />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {methodValuations.map((valuation) => (
            <div 
              key={valuation.valuation_method} 
              className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium flex items-center gap-2">
                  {METHOD_NAMES[valuation.valuation_method]}
                  <InfoIcon text={METHOD_DESCRIPTIONS[valuation.valuation_method]} />
                </h4>
                <div 
                  className={`text-xs px-2 py-1 rounded-full ${SIGNAL_BG_COLORS[valuation.signal]} text-white font-medium`}
                >
                  {valuation.signal}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mb-1">
                <span className="inline-block w-28">Intrinsic Value:</span> 
                {formatCurrency(valuation.intrinsic_value)}
              </div>
              
              <div className="flex items-center mt-2">
                <div className="flex-1 mr-2">
                  <Progress 
                    value={50 + (valuation.gap * 100)} 
                    max={100} 
                    className="h-1.5"
                  />
                </div>
                <span className={`text-xs font-medium ${valuation.gap >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {formatPercent(valuation.gap)}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                Weight: {(METHOD_WEIGHTS[valuation.valuation_method] * 100)}%
                <InfoIcon text="Weight assigned to this valuation method in the weighted average calculation." className="ml-1"/>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            <b>Valuation Gap:</b> Percentage difference between intrinsic value and market cap.
            <span className="text-green-500 font-medium"> Positive gap → Undervalued. </span>
            <span className="text-red-500 font-medium"> Negative gap → Overvalued. </span>
          </p>
          <p className="mt-1">
            <b>Signal:</b> Bullish (&gt;+15%), Bearish (&lt;-15%), or Neutral (between)
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 