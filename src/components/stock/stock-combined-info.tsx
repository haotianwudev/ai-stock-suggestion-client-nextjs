import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company, FinancialMetrics, StockPrice } from "@/lib/graphql/types";
import { ExternalLinkIcon } from "@/components/icons";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface StockCombinedInfoProps {
  company: Company;
  financialMetrics: FinancialMetrics;
  prices: StockPrice[];
  className?: string;
}

export function StockCombinedInfo({ company, financialMetrics, prices, className }: StockCombinedInfoProps) {
  // Debugging log for price data
  useEffect(() => {
    if (prices && prices.length > 0) {
      console.log("Sample price data:", prices[0]);
      console.log("Total prices:", prices.length);
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
  
  const formatRatio = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return "N/A";
    return value.toFixed(2);
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
  
  // Calculate dividend yield from payout ratio if available
  const getDividendInfo = () => {
    if (!financialMetrics.payout_ratio || 
        !financialMetrics.price_to_earnings_ratio || 
        !financialMetrics.earnings_per_share) {
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
  
  // Format the report date more nicely
  const formatReportDate = (): string => {
    try {
      if (!financialMetrics.report_period) return "N/A";
      
      const date = new Date(financialMetrics.report_period);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting report date:", error);
      return financialMetrics.report_period;
    }
  };
  
  const dividendInfo = getDividendInfo();

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Company and Financial Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Company Information Section */}
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Ticker</span>
                <span className="font-medium">{company.ticker}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Name</span>
                <span className="font-medium">{company.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Sector</span>
                <span className="font-medium">{company.sector}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Industry</span>
                <span className="font-medium">{company.industry}</span>
              </div>
              {company.website_url && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Website</span>
                  <a 
                    href={company.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    Visit Site <ExternalLinkIcon className="ml-1 h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
            
            {/* Market Statistics Section */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Market Statistics</h3>
                {metrics?.latestDate && (
                  <span className="text-xs text-muted-foreground">
                    As of {formatDate(metrics.latestDate)}
                  </span>
                )}
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Current Price</span>
                  <span className="font-medium">{metrics?.currentPrice ? formatCurrency(metrics.currentPrice) : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Daily Range</span>
                  <span className="font-medium">
                    {metrics?.dailyLow && metrics?.dailyHigh 
                      ? `${formatCurrency(metrics.dailyLow)} - ${formatCurrency(metrics.dailyHigh)}` 
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">52 Week Range</span>
                  <span className="font-medium">
                    {metrics?.low52Week && metrics?.high52Week 
                      ? `${formatCurrency(metrics.low52Week)} - ${formatCurrency(metrics.high52Week)}` 
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Volume</span>
                  <span className="font-medium">{metrics?.dailyVolume ? formatLargeNumber(metrics.dailyVolume) : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Financial Metrics Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Market Cap</p>
                <p className="text-xl font-bold">{formatLargeNumber(financialMetrics.market_cap)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">EPS</p>
                <p className="text-xl font-bold">{formatCurrency(financialMetrics.earnings_per_share)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">P/E Ratio</p>
                <p className="text-xl font-bold">{formatRatio(financialMetrics.price_to_earnings_ratio)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">P/B Ratio</p>
                <p className="text-xl font-bold">{formatRatio(financialMetrics.price_to_book_ratio)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">P/S Ratio</p>
                <p className="text-xl font-bold">{formatRatio(financialMetrics.price_to_sales_ratio)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Forward Dividend & Yield</p>
                <p className="text-xl font-bold">
                  {dividendInfo.forwardDividend !== "N/A" ? `$${dividendInfo.forwardDividend}` : "N/A"}
                  {dividendInfo.dividendYield !== "N/A" && dividendInfo.forwardDividend !== "N/A" 
                    ? ` (${dividendInfo.dividendYield})` 
                    : ""}
                </p>
              </div>
              
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Last Report Date</p>
                <p className="text-lg font-medium">{formatReportDate()} ({financialMetrics.period})</p>
              </div>
            </div>
            
            {/* Volatility/Risk Section */}
            {metrics?.volatility && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Volatility/Risk</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Annual Volatility</span>
                  <span className="font-medium">{formatPercent(metrics.volatility)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 