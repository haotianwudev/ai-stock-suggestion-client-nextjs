import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialMetrics, StockPrice } from "@/lib/graphql/types";
import { cn } from "@/lib/utils";

interface StockFinancialsProps {
  financialMetrics: FinancialMetrics;
  prices?: StockPrice[];
  className?: string;
}

export function StockFinancials({ financialMetrics, prices = [], className }: StockFinancialsProps) {
  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return "N/A";
    
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  const formatRatio = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return "N/A";
    return value.toFixed(2);
  };
  
  const formatPercent = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return "N/A";
    return `${(value * 100).toFixed(2)}%`;
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
    <Card className={cn("col-span-2", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Financial Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Market Cap</p>
            <p className="text-xl font-bold">{formatCurrency(financialMetrics.market_cap)}</p>
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
      </CardContent>
    </Card>
  );
} 