import { StockSentiment, NewsItem } from "@/lib/graphql/types";
import { Card, CardContent } from "@/components/ui/card";
import * as Tooltip from "@radix-ui/react-tooltip";
import { InfoIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface StockSentimentProps {
  sentiment: StockSentiment | null;
  news: NewsItem[];
}

export function StockSentimentAnalysis({ sentiment, news }: StockSentimentProps) {
  if (!sentiment) {
    return (
      <div className="text-center p-4">
        <p>No sentiment data available.</p>
      </div>
    );
  }

  const formatLargeNumber = (num: number) => {
    if (Math.abs(num) >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    } else if (Math.abs(num) >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    } else if (Math.abs(num) >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const getSentimentColor = (signal: string) => {
    switch(signal.toLowerCase()) {
      case 'bullish': return 'bg-green-500';
      case 'bearish': return 'bg-red-500';
      case 'neutral': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch(sentiment.toLowerCase()) {
      case 'bullish':
      case 'positive':
        return <Badge className="bg-green-500">Bullish</Badge>;
      case 'bearish':
      case 'negative':
        return <Badge className="bg-red-500">Bearish</Badge>;
      case 'neutral':
        return <Badge className="bg-yellow-500">Neutral</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const TooltipDemo = ({ content, children }: { content: string, children: React.ReactNode }) => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 overflow-hidden rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-w-sm"
            sideOffset={5}
          >
            <p>{content}</p>
            <Tooltip.Arrow className="fill-popover" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );

  const confidenceLevel = Math.round(sentiment.confidence);
  const bullishPercentage = Math.round(
    (sentiment.weighted_bullish / (sentiment.weighted_bullish + sentiment.weighted_bearish)) * 100
  );
  const bearishPercentage = 100 - bullishPercentage;

  return (
    <div className="space-y-6">
      {/* Overall Sentiment */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Sentiment Summary</h3>
            <TooltipDemo content="Market sentiment combines insider trading (30% weight) and news sentiment (70% weight) to provide an overall market outlook.">
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
            </TooltipDemo>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <span className="font-bold">{confidenceLevel}%</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${getSentimentColor(sentiment.overall_signal)}`}></div>
            <span className="font-semibold capitalize">{sentiment.overall_signal}</span>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <div>Bullish ({bullishPercentage}%)</div>
            <div>Bearish ({bearishPercentage}%)</div>
          </div>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="bg-green-500 h-full" style={{ width: `${bullishPercentage}%` }}></div>
            <div className="bg-red-500 h-full" style={{ width: `${bearishPercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Insider Trading */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold">Insider Trading</h3>
              <TooltipDemo content="Insider trading activity represents purchases and sales by company executives, directors, and major shareholders. Weight: 30% of sentiment score.">
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipDemo>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Bullish</span>
                  <div className="text-xl font-bold">{sentiment.insider_bullish}</div>
                  <span className="text-sm text-green-600">{formatLargeNumber(sentiment.insider_value_bullish)}</span>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Bearish</span>
                  <div className="text-xl font-bold">{sentiment.insider_bearish}</div>
                  <span className="text-sm text-red-600">{formatLargeNumber(sentiment.insider_value_bearish)}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Latest Insider Transactions: {sentiment.insider_total}</div>
                <div className="text-sm text-muted-foreground">Net Value: {formatLargeNumber(sentiment.insider_value_total)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Sentiment */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold">News Sentiment</h3>
              <TooltipDemo content="News sentiment analyzes recent articles for positive, negative, or neutral tones about the company. Weight: 70% of sentiment score.">
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipDemo>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-50 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Bullish</span>
                  <div className="text-xl font-bold">{sentiment.news_bullish}</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Bearish</span>
                  <div className="text-xl font-bold">{sentiment.news_bearish}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Neutral</span>
                  <div className="text-xl font-bold">{sentiment.news_neutral}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Latest News Articles: {sentiment.news_total}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 