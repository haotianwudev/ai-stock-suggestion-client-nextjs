"use client";

import { type StockValuation } from "@/lib/graphql/types";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercent } from "@/lib/utils";

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
  "dcf": "Projects future cash flows over 5 years with 5% growth and 10% discount rate. Calculates the present value of expected future cash flows.",
  "ev_ebitda": "Compares enterprise value to earnings before interest, taxes, depreciation & amortization using historical multiples.",
  "owner_earnings": "Warren Buffett's method: Net Income + Depreciation - Maintenance Capex, with a margin of safety applied.",
  "residual_income": "Based on book value plus excess returns over required cost of capital, focusing on economic profit.",
  "weighted": "Combines all methods: DCF (35%), Owner Earnings (35%), EV/EBITDA (20%), and Residual Income (10%)."
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
      <div className="text-center p-4">
        <p>No valuation data available.</p>
      </div>
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

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Overall Valuation Summary */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Valuation Analysis</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Analysis Date:</span>
            <span className="font-medium">{weightedValuation ? formatDateString(weightedValuation.biz_date) : "N/A"}</span>
          </div>
        </div>

        {weightedValuation && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Best for determining a stock's fair value and identifying margin of safety for value investors focused on buying quality businesses at reasonable prices
            </p>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${SIGNAL_BG_COLORS[weightedValuation.signal]}`}></div>
                <div className="flex items-center gap-1">
                  <span className={`font-semibold capitalize ${SIGNAL_COLORS[weightedValuation.signal]}`}>{weightedValuation.signal}</span>
                  <span className="text-sm text-muted-foreground">with {Math.round(confidence)}% confidence</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-muted/30 p-3 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Intrinsic Value:</div>
                  <div className="text-xl font-semibold">{formatCurrency(weightedValuation.intrinsic_value)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Market Value:</div>
                  <div className="text-xl font-semibold">{formatCurrency(weightedValuation.market_cap)}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Undervalued</span>
                  <span>Overvalued</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="absolute inset-0 flex">
                    <div className="bg-green-500 h-full" style={{ width: "50%" }}></div>
                    <div className="bg-red-500 h-full" style={{ width: "50%" }}></div>
                  </div>
                  <div 
                    className="absolute top-0 bottom-0 w-2 bg-black transform -translate-x-1/2 border-2 border-white"
                    style={{ left: `${50 + (weightedValuation.gap * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-center mt-1">
                  <span className={`text-sm font-medium ${weightedValuation.gap >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {formatPercent(weightedValuation.gap)} {weightedValuation.gap >= 0 ? "Undervalued" : "Overvalued"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Individual Valuation Methods */}
      <div className="grid md:grid-cols-2 gap-6">
        {methodValuations.map((valuation) => (
          <Card key={valuation.valuation_method}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{METHOD_NAMES[valuation.valuation_method] || valuation.valuation_method}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-sm ${SIGNAL_COLORS[valuation.signal]} capitalize`}>{valuation.signal}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 break-words hyphens-auto">
                {METHOD_DESCRIPTIONS[valuation.valuation_method]}
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Intrinsic Value:</div>
                    <div className="text-lg font-medium">{formatCurrency(valuation.intrinsic_value)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Market Value:</div>
                    <div className="text-lg font-medium">{formatCurrency(valuation.market_cap)}</div>
                  </div>
                </div>
              
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Valuation Gap:</span>
                    <span className={`${valuation.gap >= 0 ? "text-green-500" : "text-red-500"} font-medium`}>
                      {formatPercent(valuation.gap)} {valuation.gap >= 0 ? "Undervalued" : "Overvalued"}
                    </span>
                  </div>
                  <Progress 
                    value={50 + (valuation.gap * 100)}
                    max={100} 
                    className="h-1.5"
                  />
                </div>
                
                <div className="text-xs text-muted-foreground mt-2">
                  Weight: {(METHOD_WEIGHTS[valuation.valuation_method] * 100)}% of weighted average calculation
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Methodology */}
      <div className="bg-muted/50 p-4 rounded-lg text-sm">
        <div className="mb-2">
          <p className="font-semibold mb-2">Valuation Methodology:</p>
          <p className="text-muted-foreground">
            Each valuation method calculates intrinsic value differently, considering various aspects of a company's financials.
            The weighted average combines all methods with appropriate weights to produce a balanced final estimate.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-1">Signal Generation:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li><span className="text-green-500 font-medium">Bullish:</span> Gap &gt; +15% (significantly undervalued)</li>
            <li><span className="text-red-500 font-medium">Bearish:</span> Gap &lt; -15% (significantly overvalued)</li>
            <li><span className="text-yellow-500 font-medium">Neutral:</span> Gap between -15% and +15% (fairly valued)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 