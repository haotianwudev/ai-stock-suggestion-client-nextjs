import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockFundamentals, StockSentiment, StockTechnicals, StockValuation } from "@/lib/graphql/types";
import { TrendingUp, TrendingDown, ArrowRight, BookOpen, BarChart3, Heart, Calculator, Clock, ChartBar, LineChart, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RobotIcon } from "@/components/icons";
import Image from "next/image";
import { useState } from "react";

interface SophieAnalysisProps {
  technicals?: StockTechnicals | null;
  sentiment?: StockSentiment | null;
  fundamentals?: StockFundamentals | null;
  valuations?: StockValuation[];
  className?: string;
  // New fields from sample data
  sophieData?: {
    signal: string;
    confidence: number;
    overall_score: number;
    reasoning: string;
    short_term_outlook: string;
    medium_term_outlook: string;
    long_term_outlook: string;
    bullish_factors: string[];
    bearish_factors: string[];
    risks: string[];
    model_name: string;
    model_display_name: string;
  }
  loading?: boolean;
}

// SOPHIE placeholder image (purple gradient with "S" initial)
const SOPHIE_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDEzNSkiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NzNhYjciIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOWMyN2IwIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCI+UzwvdGV4dD48L3N2Zz4=';

export function StockAnalysisSummary({ 
  technicals, 
  sentiment, 
  fundamentals, 
  valuations,
  className,
  sophieData = {
    signal: "neutral",
    confidence: 60,
    overall_score: 55,
    reasoning: "This stock presents a mixed picture across various metrics. Please analyze detailed data for more insights.",
    short_term_outlook: "Neutral with caution recommended",
    medium_term_outlook: "Potential for improvement based on upcoming catalysts",
    long_term_outlook: "Consider within a diversified portfolio",
    bullish_factors: ["Strong financials", "Market leadership", "Innovation pipeline"],
    bearish_factors: ["Valuation concerns", "Competitive pressures", "Regulatory risks"],
    risks: ["Market volatility", "Sector rotation", "Macroeconomic headwinds"],
    model_name: "sophie",
    model_display_name: "SOPHIE"
  },
  loading = false
}: SophieAnalysisProps) {
  const [showMethodology, setShowMethodology] = useState(false);

  const getSignalColor = (signal: string): string => {
    switch(signal?.toLowerCase()) {
      case 'bullish': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'bearish': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'neutral': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default: return 'bg-slate-100 text-slate-800 hover:bg-slate-200';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch(signal?.toLowerCase()) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'bearish': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'neutral': return <ArrowRight className="h-4 w-4 text-yellow-600" />;
      default: return <ArrowRight className="h-4 w-4 text-slate-600" />;
    }
  };

  // Function to scroll to a specific section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get valuation signal
  const getValuationSignal = () => {
    if (!valuations || valuations.length === 0) return "N/A";
    
    // Count signals to determine overall
    const signals = valuations.map(v => v.signal);
    const bullishCount = signals.filter(s => s.toLowerCase() === 'bullish').length;
    const bearishCount = signals.filter(s => s.toLowerCase() === 'bearish').length;
    
    if (bullishCount > bearishCount) return "bullish";
    if (bearishCount > bullishCount) return "bearish";
    return "neutral";
  };

  // Get background color for SOPHIE comment bubble
  const getCommentBubbleStyle = (signal: string) => {
    switch (signal.toLowerCase()) {
      case 'bullish':
        return {
          background: 'bg-gradient-to-br from-emerald-50 to-green-50/40 dark:from-emerald-950/40 dark:to-green-950/20',
          border: 'border-emerald-200 dark:border-emerald-800/60',
          text: 'text-emerald-900 dark:text-emerald-200'
        };
      case 'bearish':
        return {
          background: 'bg-gradient-to-br from-rose-50 to-red-50/40 dark:from-rose-950/40 dark:to-red-950/20',
          border: 'border-rose-200 dark:border-rose-800/60',
          text: 'text-rose-900 dark:text-rose-200'
        };
      case 'neutral':
        return {
          background: 'bg-gradient-to-br from-amber-50 to-yellow-50/40 dark:from-amber-950/40 dark:to-yellow-950/20',
          border: 'border-amber-200 dark:border-amber-800/60',
          text: 'text-amber-900 dark:text-amber-200'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-slate-50 to-gray-50/40 dark:from-slate-900/60 dark:to-gray-900/40',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-900 dark:text-gray-100'
        };
    }
  };

  const commentStyle = getCommentBubbleStyle(sophieData.signal);

  // Get score color based on the value
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-green-600 border-emerald-300 dark:border-emerald-600';
    if (score >= 60) return 'from-blue-500 to-indigo-600 border-blue-300 dark:border-blue-600';
    if (score >= 40) return 'from-amber-500 to-yellow-600 border-amber-300 dark:border-amber-600';
    return 'from-rose-500 to-red-600 border-rose-300 dark:border-rose-600';
  };

  return (
    <Card className={cn("w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm", className)}>
      <CardHeader className="pb-2 sm:pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 lg:h-18 lg:w-18 rounded-full overflow-hidden shadow-md border-2 border-[#A8672E]/40 dark:border-[#D08F52]/50 flex-shrink-0">
              <Image 
                src="/images/agents/SOPHIE.png"
                alt="SOPHIE" 
                width={80} 
                height={80}
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#A8672E] to-[#D08F52] dark:from-[#D08F52] dark:to-[#E5A974] bg-clip-text text-transparent">
                SOPHIE
              </CardTitle>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Confidence: <span className="font-semibold text-gray-900 dark:text-gray-100">{sophieData.confidence}%</span>
              </p>
            </div>
          </div>
          
          {/* Score component */}
          <div className="relative flex flex-col items-center justify-center self-center sm:self-auto">
            <div 
              className={`
                w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-xl border-2 shadow-md flex items-center justify-center
                bg-gradient-to-br ${getScoreColor(sophieData.overall_score)}
              `}
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow">
                {sophieData.overall_score}
              </span>
            </div>
            <div className="absolute -bottom-2 w-16 sm:w-20 lg:w-22 bg-gray-900 dark:bg-gray-800 border border-gray-700 rounded-full py-0.5 text-[8px] sm:text-[9px] font-bold text-center text-white tracking-wider shadow">
              SCORE
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 sm:h-64 gap-3">
            <div className="animate-pulse flex space-x-2">
              <div className="h-3 w-3 bg-[#A8672E] rounded-full"></div>
              <div className="h-3 w-3 bg-[#D08F52] rounded-full"></div>
              <div className="h-3 w-3 bg-[#E5A974] rounded-full"></div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading SOPHIE Analysis...</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {/* SOPHIE Commentary */}
            <div className={`relative rounded-2xl border p-4 sm:p-5 ${commentStyle.background} ${commentStyle.border} shadow-sm`}>
              <div className="absolute -top-2.5 -left-2.5">
                <div className={`rounded-full p-1.5 shadow-sm ${commentStyle.background} ${commentStyle.border}`}>
                  <RobotIcon className={`h-4 w-4 ${commentStyle.text}`} />
                </div>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${commentStyle.text} font-medium`}>
                {sophieData.reasoning}
              </p>
            </div>

            {/* Analysis Jump Buttons */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {/* Technical Analysis */}
              <div 
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 cursor-pointer transition-all shadow-xs"
                onClick={() => scrollToSection('technical-analysis')}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 dark:bg-blue-950/40 p-1.5 rounded-lg border border-blue-200/50 dark:border-blue-800/40">
                    <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-900 dark:text-gray-100">Technical Analysis</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Price patterns & momentum</div>
                  </div>
                </div>
                <Badge className={`${getSignalColor(technicals?.signal || '')} text-xs font-semibold px-2 py-0.5`}>
                  <div className="flex items-center gap-1">
                    {getSignalIcon(technicals?.signal || '')}
                    <span className="capitalize">{technicals?.signal || 'N/A'}</span>
                  </div>
                </Badge>
              </div>

              {/* Sentiment Analysis */}
              <div 
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 cursor-pointer transition-all shadow-xs"
                onClick={() => scrollToSection('sentiment-analysis')}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-pink-50 dark:bg-pink-950/40 p-1.5 rounded-lg border border-pink-200/50 dark:border-pink-800/40">
                    <Heart className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-900 dark:text-gray-100">Market Sentiment</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">News & psychology</div>
                  </div>
                </div>
                <Badge className={`${getSignalColor(sentiment?.overall_signal || '')} text-xs font-semibold px-2 py-0.5`}>
                  <div className="flex items-center gap-1">
                    {getSignalIcon(sentiment?.overall_signal || '')}
                    <span className="capitalize">{sentiment?.overall_signal || 'N/A'}</span>
                  </div>
                </Badge>
              </div>

              {/* Fundamental Analysis */}
              <div 
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 cursor-pointer transition-all shadow-xs"
                onClick={() => scrollToSection('fundamental-analysis')}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-50 dark:bg-green-950/40 p-1.5 rounded-lg border border-green-200/50 dark:border-green-800/40">
                    <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-900 dark:text-gray-100">Fundamentals</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Financial health & growth</div>
                  </div>
                </div>
                <Badge className={`${getSignalColor(fundamentals?.overall_signal || '')} text-xs font-semibold px-2 py-0.5`}>
                  <div className="flex items-center gap-1">
                    {getSignalIcon(fundamentals?.overall_signal || '')}
                    <span className="capitalize">{fundamentals?.overall_signal || 'N/A'}</span>
                  </div>
                </Badge>
              </div>

              {/* Valuation Analysis */}
              <div 
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 cursor-pointer transition-all shadow-xs"
                onClick={() => scrollToSection('valuation-analysis')}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-amber-50 dark:bg-amber-950/40 p-1.5 rounded-lg border border-amber-200/50 dark:border-amber-800/40">
                    <Calculator className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-900 dark:text-gray-100">Valuation</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Fair value models</div>
                  </div>
                </div>
                <Badge className={`${getSignalColor(getValuationSignal())} text-xs font-semibold px-2 py-0.5`}>
                  <div className="flex items-center gap-1">
                    {getSignalIcon(getValuationSignal())}
                    <span className="capitalize">{getValuationSignal()}</span>
                  </div>
                </Badge>
              </div>
            </div>

            {/* Time Horizon Analysis */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {/* Short Term */}
              <div className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3 shadow-xs">
                <div className="flex items-center gap-1.5 mb-1 text-[#A8672E] dark:text-[#D08F52]">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Short-Term</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sophieData.short_term_outlook}</p>
              </div>
              
              {/* Medium Term */}
              <div className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3 shadow-xs">
                <div className="flex items-center gap-1.5 mb-1 text-[#A8672E] dark:text-[#D08F52]">
                  <ChartBar className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Medium-Term</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sophieData.medium_term_outlook}</p>
              </div>
              
              {/* Long Term */}
              <div className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3 shadow-xs">
                <div className="flex items-center gap-1.5 mb-1 text-[#A8672E] dark:text-[#D08F52]">
                  <LineChart className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Long-Term</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sophieData.long_term_outlook}</p>
              </div>
            </div>

            {/* Bullish and Bearish Factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Bullish Factors */}
              <div className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3.5 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Bullish Factors</span>
                </h4>
                <ul className="text-xs space-y-1.5">
                  {sophieData.bullish_factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-1.5">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Bearish Factors */}
              <div className="border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-3.5 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-2">
                  <TrendingDown className="h-3.5 w-3.5" />
                  <span>Bearish Factors</span>
                </h4>
                <ul className="text-xs space-y-1.5">
                  {sophieData.bearish_factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-1.5">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Methodology Section */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setShowMethodology(!showMethodology)}
                className="w-full flex items-center justify-between py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
                  <span>SOPHIE Methodology</span>
                </div>
                {showMethodology ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {showMethodology && (
                <div className="pt-2 pb-1 text-xs text-muted-foreground space-y-2 animate-in fade-in-50 duration-300">
                  <p className="font-medium">SOPHIE Agent Methodology</p>
                  <p>
                    SOPHIE provides comprehensive stock analysis by combining multiple analytical approaches:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-medium mb-1">Valuation Analysis:</p>
                      <ul className="list-disc ml-4 space-y-0.5">
                        <li>Discounted Cash Flow (DCF)</li>
                        <li>EV/EBITDA</li>
                        <li>Owner Earnings</li>
                        <li>Residual Income</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Technical Analysis:</p>
                      <ul className="list-disc ml-4 space-y-0.5">
                        <li>Trend indicators</li>
                        <li>Momentum signals</li>
                        <li>Volatility metrics</li>
                        <li>Mean reversion patterns</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Fundamental Analysis:</p>
                      <ul className="list-disc ml-4 space-y-0.5">
                        <li>Financial statement evaluation</li>
                        <li>Profitability metrics (ROE, margins)</li>
                        <li>Growth rates (revenue, earnings)</li>
                        <li>Financial health (liquidity, leverage)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Sentiment Analysis:</p>
                      <ul className="list-disc ml-4 space-y-0.5">
                        <li>News sentiment scoring</li>
                        <li>Insider trading activity</li>
                        <li>Social media trends</li>
                        <li>Market psychology indicators</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p>
                    SOPHIE produces a confidence score (0-100%) and overall rating (1-100), 
                    with specific insights for short, medium, and long-term time horizons.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 