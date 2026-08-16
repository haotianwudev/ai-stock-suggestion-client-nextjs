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
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Sentiment Analysis</h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Analysis Date:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{formatDateString(sentiment.biz_date)}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          Sentiment analysis evaluates market perception through insider trading patterns (30% weight) and news sentiment (70% weight) to gauge overall market outlook on the stock.
        </p>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <div className={`w-3.5 h-3.5 rounded-full ${getSentimentColor(sentiment.overall_signal)}`}></div>
            <div className="flex items-center gap-1 text-sm">
              <span className={`font-semibold capitalize ${getSentimentTextColor(sentiment.overall_signal)}`}>{sentiment.overall_signal}</span>
              <span className="text-slate-500 dark:text-slate-400">with {confidenceLevel}% confidence</span>
            </div>
          </div>

          <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Bullish ({bullishPercentage}%)</span>
            <span>Bearish ({bearishPercentage}%)</span>
          </div>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="bg-emerald-500 h-full" style={{ width: `${bullishPercentage}%` }}></div>
            <div className="bg-rose-500 h-full" style={{ width: `${bearishPercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Insider Trading */}
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Insider Trading</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Insider trading activity represents purchases and sales by company executives and major shareholders.
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl p-3 border border-emerald-200/50 dark:border-emerald-800/40">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Bullish Transactions</span>
                  <div className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400">{sentiment.insider_bullish}</div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{formatLargeNumber(sentiment.insider_value_bullish)}</span>
                </div>
                <div className="bg-rose-50/70 dark:bg-rose-950/30 rounded-xl p-3 border border-rose-200/50 dark:border-rose-800/40">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Bearish Transactions</span>
                  <div className="text-lg sm:text-xl font-bold text-rose-700 dark:text-rose-400">{sentiment.insider_bearish}</div>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{formatLargeNumber(sentiment.insider_value_bearish)}</span>
                </div>
              </div>
              
              <div className="bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800 p-3 rounded-xl text-xs space-y-1">
                <div>Total Insider Transactions: <span className="font-semibold text-gray-900 dark:text-gray-100">{sentiment.insider_total}</span></div>
                <div>
                  Net Transaction Value: <span className={`font-semibold ${sentiment.insider_value_total >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{formatLargeNumber(sentiment.insider_value_total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Sentiment */}
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">News Sentiment</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              News sentiment analyzes recent articles for positive, negative, or neutral tones about the company.
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl p-3 border border-emerald-200/50 dark:border-emerald-800/40">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Bullish</span>
                  <div className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400">{sentiment.news_bullish}</div>
                </div>
                <div className="bg-rose-50/70 dark:bg-rose-950/30 rounded-xl p-3 border border-rose-200/50 dark:border-rose-800/40">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Bearish</span>
                  <div className="text-base sm:text-lg font-bold text-rose-700 dark:text-rose-400">{sentiment.news_bearish}</div>
                </div>
                <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-xl p-3 border border-amber-200/50 dark:border-amber-800/40">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Neutral</span>
                  <div className="text-base sm:text-lg font-bold text-amber-700 dark:text-amber-400">{sentiment.news_neutral}</div>
                </div>
              </div>
              
              <div className="bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800 p-3 rounded-xl text-xs">
                <div>Total News Articles: <span className="font-semibold text-gray-900 dark:text-gray-100">{sentiment.news_total}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Standalone Latest News Card */}
      {news && news.length > 0 && (
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Latest News</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <button 
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                  className={`p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 transition-colors ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <span className="font-medium px-1">Page {currentPage} of {maxPages}</span>
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === maxPages}
                  aria-label="Next Page"
                  className={`p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 transition-colors ${currentPage === maxPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              {paginatedNews.map((item, index) => (
                <div key={index} className="p-3 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-colors flex items-start gap-2.5">
                  <div className="flex-shrink-0 mt-0.5">
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
                      className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-[#A8672E] dark:hover:text-[#D08F52] line-clamp-1 block transition-colors"
                    >
                      {item.title}
                    </a>
                    <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      <span>{new Date(item.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                      <span className="truncate max-w-[150px]">{item.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Methodology */}
      <div className="bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm shadow-xs">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Sentiment Methodology:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400">
              <li>Insider Trading (30% weight): Tracks buying and selling by company insiders</li>
              <li>News Sentiment (70% weight): Analyzes tone and content of recent news coverage</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Signal Generation:</p>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400">
              <li><span className="text-emerald-600 dark:text-emerald-400 font-semibold">Bullish:</span> Significantly more positive than negative sentiment</li>
              <li><span className="text-rose-600 dark:text-rose-400 font-semibold">Bearish:</span> Significantly more negative than positive sentiment</li>
              <li><span className="text-amber-600 dark:text-amber-400 font-semibold">Neutral:</span> Balanced positive and negative sentiment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 