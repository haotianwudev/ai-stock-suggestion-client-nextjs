import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockFundamentals, StockSentiment, StockTechnicals, StockValuation } from "@/lib/graphql/types";
import { TrendingUp, TrendingDown, ArrowRight, BookOpen, BarChart3, Heart, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StockAnalysisSummaryProps {
  technicals?: StockTechnicals | null;
  sentiment?: StockSentiment | null;
  fundamentals?: StockFundamentals | null;
  valuations?: StockValuation[];
  className?: string;
}

export function StockAnalysisSummary({ 
  technicals, 
  sentiment, 
  fundamentals, 
  valuations,
  className
}: StockAnalysisSummaryProps) {
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

  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Analysis Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Technical Analysis */}
          <div 
            className="flex items-center justify-between p-2 rounded-md border cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => scrollToSection('technical-analysis')}
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">Technical Analysis</div>
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
            <div className="flex items-center gap-3">
              <div className="bg-pink-50 p-2 rounded-full">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <div className="font-medium">Market Sentiment</div>
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
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Fundamentals</div>
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
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-full">
                <Calculator className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium">Valuation</div>
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
      </CardContent>
    </Card>
  );
} 