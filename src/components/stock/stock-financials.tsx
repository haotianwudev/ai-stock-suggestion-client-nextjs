import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialMetrics } from "@/lib/graphql/types";

interface StockFinancialsProps {
  financialMetrics: FinancialMetrics;
}

export function StockFinancials({ financialMetrics }: StockFinancialsProps) {
  const formatCurrency = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  const formatRatio = (value: number): string => {
    return value.toFixed(2);
  };

  return (
    <Card className="col-span-2">
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
            <p className="text-sm font-medium text-muted-foreground">Enterprise Value</p>
            <p className="text-xl font-bold">{formatCurrency(financialMetrics.enterprise_value)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">P/E Ratio</p>
            <p className="text-xl font-bold">{formatRatio(financialMetrics.price_to_earnings_ratio)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">P/B Ratio</p>
            <p className="text-xl font-bold">{formatRatio(financialMetrics.price_to_book_ratio)}</p>
          </div>
          <div className="space-y-1 col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Report Period</p>
            <p className="text-lg font-medium">{financialMetrics.report_period} ({financialMetrics.period})</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 