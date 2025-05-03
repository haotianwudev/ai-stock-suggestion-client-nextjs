import { StockSentiment, NewsItem } from "@/lib/graphql/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface StockSentimentProps {
  sentiment: StockSentiment | null;
  news: NewsItem[];
}

export function StockSentimentAnalysis({ sentiment, news }: StockSentimentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPages = Math.ceil((news?.length || 0) / itemsPerPage);

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
    switch(signal?.toLowerCase()) {
      case 'bullish': return 'bg-green-500';
      case 'bearish': return 'bg-red-500';
      case 'neutral': return 'bg-yellow-500';
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSentimentTextColor = (signal: string) => {
    switch(signal?.toLowerCase()) {
      case 'bullish': return 'text-green-500';
      case 'bearish': return 'text-red-500';
      case 'neutral': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch(sentiment?.toLowerCase()) {
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

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const confidenceLevel = Math.round(sentiment.confidence);
  const bullishPercentage = Math.round(
    (sentiment.weighted_bullish / (sentiment.weighted_bullish + sentiment.weighted_bearish)) * 100
  );
  const bearishPercentage = 100 - bullishPercentage;

  const paginatedNews = news ? news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Sentiment */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Sentiment Analysis</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Analysis Date:</span>
            <span className="font-medium">{formatDateString(sentiment.biz_date)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 break-words hyphens-auto">
          Sentiment analysis evaluates market perception through insider trading patterns (30% weight) and news sentiment (70% weight) to gauge overall market outlook on the stock.
        </p>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${getSentimentColor(sentiment.overall_signal)}`}></div>
            <div className="flex items-center gap-1">
              <span className={`font-semibold capitalize ${getSentimentTextColor(sentiment.overall_signal)}`}>{sentiment.overall_signal}</span>
              <span className="text-sm text-muted-foreground">with {confidenceLevel}% confidence</span>
            </div>
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
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-bold">Insider Trading</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 break-words hyphens-auto">
              Insider trading activity represents purchases and sales by company executives, directors, and major shareholders. Strong insider buying often indicates confidence in the company's future.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Bullish Transactions</span>
                  <div className="text-xl font-bold">{sentiment.insider_bullish}</div>
                  <span className="text-sm text-green-600">{formatLargeNumber(sentiment.insider_value_bullish)}</span>
                </div>
                <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Bearish Transactions</span>
                  <div className="text-xl font-bold">{sentiment.insider_bearish}</div>
                  <span className="text-sm text-red-600">{formatLargeNumber(sentiment.insider_value_bearish)}</span>
                </div>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-sm mb-1">Latest Insider Transactions: {sentiment.insider_total}</div>
                <div className="text-sm">
                  Net Transaction Value: <span className={sentiment.insider_value_total >= 0 ? "text-green-600" : "text-red-600"}>{formatLargeNumber(sentiment.insider_value_total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Sentiment */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">News Sentiment</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 break-words hyphens-auto">
              News sentiment analyzes recent articles for positive, negative, or neutral tones about the company. Media perception can significantly influence market sentiment.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Bullish</span>
                  <div className="text-xl font-bold">{sentiment.news_bullish}</div>
                </div>
                <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Bearish</span>
                  <div className="text-xl font-bold">{sentiment.news_bearish}</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-3">
                  <span className="text-sm text-muted-foreground">Neutral</span>
                  <div className="text-xl font-bold">{sentiment.news_neutral}</div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-sm">Total News Articles: {sentiment.news_total}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Standalone Latest News Card */}
      {news && news.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Latest News</h3>
              <div className="flex items-center text-xs">
                <button 
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`p-1 rounded ${currentPage === 1 ? 'text-muted-foreground' : 'hover:bg-muted'}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="mx-2">Page {currentPage} of {maxPages}</span>
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === maxPages}
                  className={`p-1 rounded ${currentPage === maxPages ? 'text-muted-foreground' : 'hover:bg-muted'}`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              {paginatedNews.map((item, index) => (
                <div key={index} className="p-2 border rounded flex items-start gap-2">
                  <div className="flex-shrink-0">
                    {item.sentiment && (
                      <Badge className={`${getSentimentColor(item.sentiment)} text-[10px] px-1.5 py-0.5`}>
                        {item.sentiment?.toLowerCase() === 'positive' ? 'Bullish' : 
                         item.sentiment?.toLowerCase() === 'negative' ? 'Bearish' : 
                         item.sentiment}
                      </Badge>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-medium hover:underline line-clamp-1 block"
                    >
                      {item.title}
                    </a>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{new Date(item.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                      <span>{item.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Methodology */}
      <div className="bg-muted/50 p-4 rounded-lg text-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold mb-2">Sentiment Methodology:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Insider Trading (30% weight): Tracks buying and selling by company insiders</li>
              <li>News Sentiment (70% weight): Analyzes tone and content of recent news coverage</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Signal Generation:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><span className="text-green-500 font-medium">Bullish:</span> Significantly more positive than negative sentiment</li>
              <li><span className="text-red-500 font-medium">Bearish:</span> Significantly more negative than positive sentiment</li>
              <li><span className="text-yellow-500 font-medium">Neutral:</span> Balanced positive and negative sentiment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 