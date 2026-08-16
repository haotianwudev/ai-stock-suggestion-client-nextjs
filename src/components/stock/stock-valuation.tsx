"use client";

import { type StockValuation } from "@/lib/graphql/types";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { VideoTutorial } from "@/components/ui/video-tutorial";

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
    <div className="space-y-5 sm:space-y-6">
      {/* Overall Valuation Summary */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Valuation Analysis</h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Analysis Date:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{weightedValuation ? formatDateString(weightedValuation.biz_date) : "N/A"}</span>
          </div>
        </div>

        {weightedValuation && (
          <>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Best for determining a stock's fair value and identifying margin of safety for value investors focused on buying quality businesses at reasonable prices.
            </p>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded-full ${SIGNAL_BG_COLORS[weightedValuation.signal]}`}></div>
                <div className="flex items-center gap-1 text-sm">
                  <span className={`font-semibold capitalize ${SIGNAL_COLORS[weightedValuation.signal]}`}>{weightedValuation.signal}</span>
                  <span className="text-slate-500 dark:text-slate-400">with {Math.round(confidence)}% confidence</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800 p-4 rounded-xl">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Intrinsic Value:</div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(weightedValuation.intrinsic_value)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Current Market Value:</div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(weightedValuation.market_cap)}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400">Undervalued</span>
                  <span className="text-rose-600 dark:text-rose-400">Overvalued</span>
                </div>
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="absolute inset-0 flex">
                    <div className="bg-emerald-500 h-full" style={{ width: "50%" }}></div>
                    <div className="bg-rose-500 h-full" style={{ width: "50%" }}></div>
                  </div>
                  <div 
                    className="absolute top-0 bottom-0 w-2.5 bg-gray-900 dark:bg-white transform -translate-x-1/2 rounded-full border-2 border-white dark:border-gray-900 shadow"
                    style={{ left: `${Math.max(5, Math.min(95, 50 + (weightedValuation.gap * 100)))}%` }}
                  ></div>
                </div>
                <div className="flex justify-center mt-1.5">
                  <span className={`text-xs font-bold ${weightedValuation.gap >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {formatPercent(weightedValuation.gap)} {weightedValuation.gap >= 0 ? "Undervalued" : "Overvalued"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Individual Valuation Methods */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {methodValuations.map((valuation) => (
          <Card key={valuation.valuation_method} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <CardContent className="pt-5 sm:pt-6 px-4 sm:px-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">{METHOD_NAMES[valuation.valuation_method] || valuation.valuation_method}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-xs sm:text-sm ${SIGNAL_COLORS[valuation.signal]} capitalize`}>{valuation.signal}</span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 break-words hyphens-auto leading-relaxed">
                {METHOD_DESCRIPTIONS[valuation.valuation_method]}
              </p>

              {/* DCF Video Tutorial Section */}
              {valuation.valuation_method === "dcf" && (
                <VideoTutorial
                  title="DCF Tutorial: Step-by-Step Guide"
                  description="Learn absolute valuation and how to build DCF model to derive intrinsic value from scratch."
                  videoId="DEzMJY7dJ6o"
                  startTime={6}
                  className="mb-4"
                />
              )}

              {/* EV/EBITDA Video Tutorial Section */}
              {valuation.valuation_method === "ev_ebitda" && (
                <VideoTutorial
                  title="EV/EBITDA Tutorial: Complete Guide"
                  description="Learn relative valuation and EV/EBITDA multiples that compares to historical values and peers."
                  videoId="7_cJfQ_qKmM"
                  startTime={15}
                  className="mb-4"
                />
              )}
              
              <div className="space-y-3 bg-gray-50/50 dark:bg-gray-800/30 p-3 rounded-xl border border-gray-100 dark:border-gray-800/60">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Intrinsic Value:</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">{formatCurrency(valuation.intrinsic_value)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Market Value:</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">{formatCurrency(valuation.market_cap)}</div>
                  </div>
                </div>
              
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Valuation Gap:</span>
                    <span className={`${valuation.gap >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"} font-bold`}>
                      {formatPercent(valuation.gap)} {valuation.gap >= 0 ? "Undervalued" : "Overvalued"}
                    </span>
                  </div>
                  <Progress 
                    value={50 + (valuation.gap * 100)}
                    max={100} 
                    className="h-1.5"
                  />
                </div>
                
                <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-1 border-t border-gray-200/50 dark:border-gray-700/50">
                  Weight: {(METHOD_WEIGHTS[valuation.valuation_method] * 100)}% of weighted calculation
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Methodology */}
      <div className="bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm shadow-xs">
        <div className="mb-3">
          <p className="font-bold text-gray-900 dark:text-gray-100 mb-1.5">Valuation Methodology:</p>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Each valuation method calculates intrinsic value differently, considering various aspects of a company's financials.
            The weighted average combines all methods with appropriate weights to produce a balanced final estimate.
          </p>
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-gray-100 mb-1.5">Signal Generation:</p>
          <ul className="space-y-1 text-slate-500 dark:text-slate-400">
            <li><span className="text-emerald-600 dark:text-emerald-400 font-semibold">Bullish:</span> Gap &gt; +15% (significantly undervalued)</li>
            <li><span className="text-rose-600 dark:text-rose-400 font-semibold">Bearish:</span> Gap &lt; -15% (significantly overvalued)</li>
            <li><span className="text-amber-600 dark:text-amber-400 font-semibold">Neutral:</span> Gap between -15% and +15% (fairly valued)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 