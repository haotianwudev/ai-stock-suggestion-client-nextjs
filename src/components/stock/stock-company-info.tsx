import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/lib/graphql/types";

interface StockCompanyInfoProps {
  company: Company;
}

export function StockCompanyInfo({ company }: StockCompanyInfoProps) {
  return (
    <Card>
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
        </div>
      </CardContent>
    </Card>
  );
} 