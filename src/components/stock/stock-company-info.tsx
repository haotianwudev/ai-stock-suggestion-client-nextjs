import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company, StockPrice, FinancialMetrics } from "@/lib/graphql/types";
import { ExternalLinkIcon } from "@/components/icons";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface StockCompanyInfoProps {
  company: Company;
  prices: StockPrice[];
  financialMetrics?: FinancialMetrics;
  className?: string;
}

export function StockCompanyInfo({ company, prices, financialMetrics, className }: StockCompanyInfoProps) {
  // Debugging log for price data
  useEffect(() => {
    if (prices && prices.length > 0) {
      console.log("Sample price data:", prices[0]);
      console.log("Total prices:", prices.length);
      console.log("Prices with high field:", prices.filter(p => typeof p.high === 'number').length);
      console.log("Prices with low field:", prices.filter(p => typeof p.low === 'number').length);
      console.log("Prices with open field:", prices.filter(p => typeof p.open === 'number').length);
    } else {
      console.log("No price data available");
    }
  }, [prices]);

  // Calculate financial metrics from price data
  const calculateMetrics = () => {
    if (!prices || prices.length === 0) return null;

    // Create a copy of prices array with complete data
    const processPrices = prices.map(price => {
      // If the price is missing critical fields, create a complete version
      if (typeof price.high === 'undefined' || 
          typeof price.low === 'undefined' || 
          typeof price.open === 'undefined') {
        
        // For missing fields, use close price as a fallback
        return {
          ...price,
          high: typeof price.high === 'number' ? price.high : price.close,
          low: typeof price.low === 'number' ? price.low : price.close,
          open: typeof price.open === 'number' ? price.open : price.close
        };
      }
      return price;
    });

    // Sort prices by date (ascending)
    const sortedPrices = [...processPrices].sort((a, b) => 
      new Date(a.biz_date).getTime() - new Date(b.biz_date).getTime()
    );
    
    // Get most recent price
    const latestPrice = sortedPrices[sortedPrices.length - 1];
    const latestDate = latestPrice ? new Date(latestPrice.biz_date) : null;
    
    // Make sure the latest price has valid numbers
    if (!latestPrice || 
        typeof latestPrice.close !== 'number' || 
        typeof latestPrice.high !== 'number' || 
        typeof latestPrice.low !== 'number' || 
        typeof latestPrice.volume !== 'number' ||
        isNaN(latestPrice.close) ||
        isNaN(latestPrice.high) ||
        isNaN(latestPrice.low) ||
        isNaN(latestPrice.volume)) {
      return { latestDate };
    }
    
    // Get 1yr data
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const yearPrices = sortedPrices.filter(p => 
      new Date(p.biz_date) >= oneYearAgo && 
      typeof p.high === 'number' && !isNaN(p.high) &&
      typeof p.low === 'number' && !isNaN(p.low)
    );
    
    if (yearPrices.length === 0) {
      // If no valid year prices, just return current price info
      return {
        latestDate,
        currentPrice: latestPrice.close,
        dailyHigh: latestPrice.high,
        dailyLow: latestPrice.low,
        dailyVolume: latestPrice.volume,
        high52Week: null,
        low52Week: null,
        volatility: null
      };
    }
    
    // Calculate 52-week high/low
    const high52Week = Math.max(...yearPrices.map(p => p.high));
    const low52Week = Math.min(...yearPrices.map(p => p.low));
    
    // Calculate average volume
    const validVolumes = yearPrices.filter(p => typeof p.volume === 'number' && !isNaN(p.volume));
    let averageVolume = null;
    if (validVolumes.length > 0) {
      const totalVolume = validVolumes.reduce((sum, price) => sum + price.volume, 0);
      averageVolume = totalVolume / validVolumes.length;
    }
    
    // Calculate volatility (standard deviation of daily returns)
    let volatility = null;
    try {
      const validPrices = yearPrices.filter((p, i) => 
        i > 0 && 
        yearPrices[i-1].close > 0 && 
        !isNaN(yearPrices[i-1].close) &&
        !isNaN(p.close)
      );
      
      if (validPrices.length > 5) { // Need reasonable number of data points
        const dailyReturns = [];
        for (let i = 1; i < validPrices.length; i++) {
          const prevClose = validPrices[i-1].close;
          const currClose = validPrices[i].close;
          if (prevClose > 0) {
            const dailyReturn = (currClose / prevClose) - 1;
            dailyReturns.push(dailyReturn);
          }
        }
        
        if (dailyReturns.length > 5) {
          const avgReturn = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
          const squaredDiffs = dailyReturns.map(r => Math.pow(r - avgReturn, 2));
          const variance = squaredDiffs.reduce((a, b) => a + b, 0) / squaredDiffs.length;
          const stdDev = Math.sqrt(variance);
          volatility = stdDev * Math.sqrt(252); // 252 trading days in a year
        }
      }
    } catch (error) {
      console.error("Error calculating volatility:", error);
    }
    
    return {
      latestDate,
      currentPrice: latestPrice.close,
      dailyHigh: latestPrice.high,
      dailyLow: latestPrice.low,
      dailyVolume: latestPrice.volume,
      averageVolume,
      high52Week,
      low52Week,
      volatility
    };
  };
  
  const metrics = calculateMetrics();
  
  const formatCurrency = (value: number | null | undefined): string => {
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const formatLargeNumber = (value: number | null | undefined): string => {
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(2)}K`;
    } else {
      return value.toString();
    }
  };
  
  const formatPercent = (value: number | null | undefined): string => {
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }
    return `${(value * 100).toFixed(2)}%`;
  };
  
  const formatDate = (date: Date | null): string => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format the report date more nicely
  const formatReportDate = (): string => {
    try {
      if (!financialMetrics?.report_period) return "N/A";
      
      const date = new Date(financialMetrics.report_period);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting report date:", error);
      return financialMetrics?.report_period || "N/A";
    }
  };

  // Calculate dividend yield from payout ratio if available
  const getDividendInfo = () => {
    if (!financialMetrics?.payout_ratio || 
        !financialMetrics?.price_to_earnings_ratio || 
        !financialMetrics?.earnings_per_share) {
      return { dividendYield: "N/A", forwardDividend: "N/A" };
    }
    
    try {
      // Dividend Yield = Payout Ratio / Price-to-Earnings Ratio
      const dividendYield = financialMetrics.payout_ratio / financialMetrics.price_to_earnings_ratio;
      
      // Forward Annual Dividend = EPS * Payout Ratio
      const forwardDividend = financialMetrics.earnings_per_share * financialMetrics.payout_ratio;
    
      return { 
        dividendYield: formatPercent(dividendYield),
        forwardDividend: forwardDividend.toFixed(2)
      };
    } catch (error) {
      console.error("Error calculating dividend info:", error);
      return { dividendYield: "N/A", forwardDividend: "N/A" };
    }
  };

  const dividendInfo = getDividendInfo();

  return (
    <Card className={cn("w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm", className)}>
      <CardHeader className="pb-2 sm:pb-3 border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">Company Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-2.5 sm:gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Ticker</span>
            <span className="text-xs sm:text-sm font-bold px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">{company.ticker}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Name</span>
            <span className="text-sm sm:text-base font-medium text-right text-gray-900 dark:text-gray-100 break-words">{company.name}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Sector</span>
            <span className="text-sm sm:text-base font-medium text-right text-gray-900 dark:text-gray-100 break-words">{company.sector}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Industry</span>
            <span className="text-sm sm:text-base font-medium text-right text-gray-900 dark:text-gray-100 break-words">{company.industry}</span>
          </div>
          {company.website_url && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Website</span>
              <a 
                href={company.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-[#A8672E] dark:text-[#D08F52] hover:text-[#8f5726] dark:hover:text-[#e2a877] font-medium text-xs sm:text-sm hover:underline transition-colors"
              >
                Visit Site <ExternalLinkIcon className="ml-1 h-3 w-3" />
              </a>
            </div>
          )}
          
          {/* Market Statistics Section - Always displayed */}
          <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">Market Statistics</span>
              {metrics?.latestDate && (
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {formatDate(metrics.latestDate)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Current Price</span>
            <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 text-right">{metrics?.currentPrice ? formatCurrency(metrics.currentPrice) : 'N/A'}</span>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Daily Range</span>
            <span className="text-xs sm:text-sm font-medium text-right text-slate-700 dark:text-slate-300">
              {metrics?.dailyLow ? formatCurrency(metrics.dailyLow) : 'N/A'} - {metrics?.dailyHigh ? formatCurrency(metrics.dailyHigh) : 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">52 Week Range</span>
            <span className="text-xs sm:text-sm font-medium text-right text-slate-700 dark:text-slate-300">
              {metrics?.low52Week ? formatCurrency(metrics.low52Week) : 'N/A'} - {metrics?.high52Week ? formatCurrency(metrics.high52Week) : 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Volume</span>
            <span className="text-xs sm:text-sm font-medium text-right text-slate-700 dark:text-slate-300">{metrics?.dailyVolume ? formatLargeNumber(metrics.dailyVolume) : 'N/A'}</span>
          </div>
          
          {metrics?.averageVolume && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Volume</span>
              <span className="text-xs sm:text-sm font-medium text-right text-slate-700 dark:text-slate-300">{formatLargeNumber(metrics.averageVolume)}</span>
            </div>
          )}
          
          {metrics?.volatility && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Volatility</span>
              <span className="text-xs sm:text-sm font-medium text-right text-slate-700 dark:text-slate-300">{formatPercent(metrics.volatility)}</span>
            </div>
          )}
          
          {/* Financial Metrics Section */}
          {financialMetrics && (
            <>
              <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">Financial Metrics</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {formatReportDate()} ({financialMetrics.period})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Market Cap</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">{formatLargeNumber(financialMetrics.market_cap)}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">EPS</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">{formatCurrency(financialMetrics.earnings_per_share)}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">P/E Ratio</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">{financialMetrics.price_to_earnings_ratio?.toFixed(2) || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">P/B Ratio</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">{financialMetrics.price_to_book_ratio?.toFixed(2) || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">P/S Ratio</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">{financialMetrics.price_to_sales_ratio?.toFixed(2) || 'N/A'}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Forward Dividend & Yield</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">
                  {dividendInfo.forwardDividend !== "N/A" ? `$${dividendInfo.forwardDividend}` : "N/A"}
                  {dividendInfo.dividendYield !== "N/A" && dividendInfo.forwardDividend !== "N/A" 
                    ? ` (${dividendInfo.dividendYield})` 
                    : ""}
                </span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 