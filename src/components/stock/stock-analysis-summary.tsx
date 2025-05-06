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

  // Get background color for SOPHIE's comment bubble
  const getCommentBubbleStyle = (signal: string) => {
    switch (signal.toLowerCase()) {
      case 'bullish':
        return {
          background: 'bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900 dark:to-emerald-950',
          border: 'border-green-300 dark:border-green-700',
          text: 'text-green-900 dark:text-green-50'
        };
      case 'bearish':
        return {
          background: 'bg-gradient-to-br from-red-100 to-rose-50 dark:from-red-900 dark:to-rose-950',
          border: 'border-red-300 dark:border-red-700',
          text: 'text-red-900 dark:text-red-50'
        };
      case 'neutral':
        return {
          background: 'bg-gradient-to-br from-amber-100 to-yellow-50 dark:from-amber-900 dark:to-yellow-950',
          border: 'border-amber-300 dark:border-amber-700',
          text: 'text-amber-900 dark:text-amber-50'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-gray-100 to-slate-50 dark:from-gray-800 dark:to-slate-950',
          border: 'border-gray-300 dark:border-gray-700',
          text: 'text-gray-900 dark:text-gray-50'
        };
    }
  };

  const commentStyle = getCommentBubbleStyle(sophieData.signal);

  // Get score color based on the value
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600 border-green-300';
    if (score >= 60) return 'from-blue-500 to-indigo-600 border-blue-300';
    if (score >= 40) return 'from-yellow-500 to-amber-600 border-yellow-300';
    return 'from-red-500 to-rose-600 border-red-300';
  };

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader className="pb-0 mb-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full overflow-hidden shadow-md border-2 border-purple-300">
              <Image 
                src="/images/agents/SOPHIE.png"
                alt="SOPHIE" 
                width={96} 
                height={96}
                className="object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">SOPHIE</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Confidence: {sophieData.confidence}%</p>
            </div>
          </div>
          
          {/* IGN-style score component - now with margin to move it slightly left */}
          <div className="relative flex flex-col items-center justify-center mr-2 sm:mr-4 md:mr-8">
            <div 
              className={`
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md border-2 shadow-lg flex items-center justify-center
                bg-gradient-to-br ${getScoreColor(sophieData.overall_score)}
              `}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{sophieData.overall_score}</span>
            </div>
            <div className="absolute -bottom-2 w-20 sm:w-24 md:w-28 bg-black rounded-sm py-0.5 text-xs font-bold text-center text-white">
              SOPHIE SCORE
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <div className="animate-pulse flex space-x-2">
              <div className="h-3 w-3 bg-purple-400 rounded-full"></div>
              <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
              <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
            </div>
            <p className="text-sm text-muted-foreground">Loading SOPHIE Analysis...</p>
          </div>
        ) : (
          <div className="space-y-4 -mt-4">
            {/* SOPHIE's Commentary */}
            <div className={`relative rounded-lg border p-4 ${commentStyle.background} ${commentStyle.border}`}>
              <div className="absolute -top-2 -left-2">
                <div className={`rounded-full p-1 shadow-sm ${commentStyle.background} ${commentStyle.border}`}>
                  <RobotIcon className={`h-4 w-4 ${commentStyle.text}`} />
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${commentStyle.text}`}>
                {sophieData.reasoning}
              </p>
            </div>

            {/* Existing Analysis Components */}
            <div className="grid grid-cols-2 gap-2">
              {/* Technical Analysis */}
              <div 
                className="flex items-center justify-between p-2 rounded-md border cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => scrollToSection('technical-analysis')}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 p-1.5 rounded-full">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-xs">Technical Analysis</div>
                    <div className="text-xs text-muted-foreground">Price patterns & momentum</div>
                  </div>
                </div>
                <Badge className={`${getSignalColor(technicals?.signal || '')}`}>
                  <div className="flex items-center gap-1">
                    {getSignalIcon(technicals?.signal || '')}
                    <span className="capitalize">{technicals?.signal || 'N/A'}</span>
                  </div>
                </Badge>
              </div>

              {/* Sentiment Analysis */}
              <div 
                className="flex items-center justify-between p-2 rounded-md border cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => scrollToSection('sentiment-analysis')}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-pink-50 p-1.5 rounded-full">
                    <Heart className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <div className="font-medium text-xs">Market Sentiment</div>
                    <div className="text-xs text-muted-foreground">News & investor psychology</div>
                  </div>
                </div>
                <Badge className={`${getSignalColor(sentiment?.overall_signal || '')}`}>
                  <div className="flex items-center gap-1">
                    {getSignalIcon(sentiment?.overall_signal || '')}
                    <span className="capitalize">{sentiment?.overall_signal || 'N/A'}</span>
                  </div>
                </Badge>
              </div>

              {/* Fundamental Analysis */}
              <div 
                className="flex items-center justify-between p-2 rounded-md border cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => scrollToSection('fundamental-analysis')}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-50 p-1.5 rounded-full">
                    <BookOpen className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-xs">Fundamentals</div>
                    <div className="text-xs text-muted-foreground">Financial health & growth</div>
                  </div>
                </div>
                <Badge className={`${getSignalColor(fundamentals?.overall_signal || '')}`}>
                  <div className="flex items-center gap-1">
                    {getSignalIcon(fundamentals?.overall_signal || '')}
                    <span className="capitalize">{fundamentals?.overall_signal || 'N/A'}</span>
                  </div>
                </Badge>
              </div>

              {/* Valuation Analysis */}
              <div 
                className="flex items-center justify-between p-2 rounded-md border cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => scrollToSection('valuation-analysis')}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-purple-50 p-1.5 rounded-full">
                    <Calculator className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-xs">Valuation</div>
                    <div className="text-xs text-muted-foreground">Fair value assessment</div>
                  </div>
                </div>
                <Badge className={`${getSignalColor(getValuationSignal())}`}>
                  <div className="flex items-center gap-1">
                    {getSignalIcon(getValuationSignal())}
                    <span className="capitalize">{getValuationSignal()}</span>
                  </div>
                </Badge>
              </div>
            </div>

            {/* Time Horizon Analysis */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {/* Short Term */}
              <div className="border rounded-md p-2">
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-medium">Short-Term</span>
                </div>
                <p className="text-xs text-muted-foreground">{sophieData.short_term_outlook}</p>
              </div>
              
              {/* Medium Term */}
              <div className="border rounded-md p-2">
                <div className="flex items-center gap-1 mb-1">
                  <ChartBar className="h-3 w-3 text-purple-500" />
                  <span className="text-xs font-medium">Medium-Term</span>
                </div>
                <p className="text-xs text-muted-foreground">{sophieData.medium_term_outlook}</p>
              </div>
              
              {/* Long Term */}
              <div className="border rounded-md p-2">
                <div className="flex items-center gap-1 mb-1">
                  <LineChart className="h-3 w-3 text-indigo-500" />
                  <span className="text-xs font-medium">Long-Term</span>
                </div>
                <p className="text-xs text-muted-foreground">{sophieData.long_term_outlook}</p>
              </div>
            </div>

            {/* Bullish and Bearish Factors */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {/* Bullish Factors */}
              <div className="border rounded-md p-3">
                <h4 className="text-xs font-medium flex items-center gap-1 mb-2">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span>Bullish Factors</span>
                </h4>
                <ul className="text-xs space-y-1">
                  {sophieData.bullish_factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-1.5">
                      <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Bearish Factors */}
              <div className="border rounded-md p-3">
                <h4 className="text-xs font-medium flex items-center gap-1 mb-2">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span>Bearish Factors</span>
                </h4>
                <ul className="text-xs space-y-1">
                  {sophieData.bearish_factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-1.5">
                      <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Methodology Section */}
            <div className="pt-2 border-t">
              <button 
                onClick={() => setShowMethodology(!showMethodology)}
                className="w-full flex items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" />
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