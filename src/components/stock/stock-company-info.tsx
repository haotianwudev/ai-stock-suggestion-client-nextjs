import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company, StockPrice } from "@/lib/graphql/types";
import { ExternalLinkIcon } from "@/components/icons";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface StockCompanyInfoProps {
  company: Company;
  prices: StockPrice[];
  className?: string;
}

export function StockCompanyInfo({ company, prices, className }: StockCompanyInfoProps) {
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

  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Company Information</CardTitle>
      </CardHeader>
      <CardContent>
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
          
          {/* Market Statistics Section - Always displayed */}
          <div className="mt-4 border-t pt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Market Statistics</span>
              {metrics?.latestDate && (
                <span className="text-xs text-muted-foreground">
                  As of {formatDate(metrics.latestDate)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Current Price</span>
            <span className="font-medium">{metrics?.currentPrice ? formatCurrency(metrics.currentPrice) : 'N/A'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Daily Range</span>
            <span className="font-medium">
              {metrics?.dailyLow !== undefined && metrics?.dailyHigh !== undefined 
                && metrics.dailyLow !== null && metrics.dailyHigh !== null ? 
                `${formatCurrency(metrics.dailyLow)} - ${formatCurrency(metrics.dailyHigh)}` : 
                'Not available'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">52-Week Range</span>
            <span className="font-medium">
              {metrics?.low52Week !== undefined && metrics?.high52Week !== undefined 
                && metrics.low52Week !== null && metrics.high52Week !== null ? 
                `${formatCurrency(metrics.low52Week)} - ${formatCurrency(metrics.high52Week)}` : 
                'Not available'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Volume</span>
            <span className="font-medium">{metrics?.dailyVolume ? formatLargeNumber(metrics.dailyVolume) : 'N/A'}</span>
          </div>
          
          {metrics?.averageVolume !== undefined && metrics.averageVolume !== null && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Avg. Volume</span>
              <span className="font-medium">{formatLargeNumber(metrics.averageVolume)}</span>
            </div>
          )}
          
          {metrics?.volatility !== undefined && metrics.volatility !== null && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Volatility (Ann.)</span>
              <span className="font-medium">{formatPercent(metrics.volatility)}</span>
            </div>
          )}
          
          {company.market_cap && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Market Cap</span>
              <span className="font-medium">${formatLargeNumber(company.market_cap)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 