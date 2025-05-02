"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_STOCK_DETAILS } from "@/lib/graphql/queries";
import { StockDetails } from "@/lib/graphql/types";
import { StockChart } from "@/components/stock/stock-chart";
import { StockNews } from "@/components/stock/stock-news";
import { StockFinancials } from "@/components/stock/stock-financials";
import { StockCompanyInfo } from "@/components/stock/stock-company-info";

interface StockDetailClientProps {
  ticker: string;
}

export function StockDetailClient({ ticker }: StockDetailClientProps) {
  const [startDate, setStartDate] = useState<string>(getDefaultStartDate());
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate());

  function getDefaultStartDate() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
  }

  function getDefaultEndDate() {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  const { loading, error, data } = useQuery(GET_STOCK_DETAILS, {
    variables: { ticker, startDate, endDate },
  });

  const stockData: StockDetails | null = data?.stock || null;

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p>Loading stock information...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <p>Error loading stock information: {error.message}</p>
    </div>
  );

  if (!stockData) return (
    <div className="flex justify-center items-center h-64">
      <p>No stock data found for ticker: {ticker}</p>
    </div>
  );

  return (
    <div className="grid gap-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{stockData.company.name} ({stockData.company.ticker})</h1>
        <p className="text-muted-foreground">
          {stockData.company.sector} - {stockData.company.industry}
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StockCompanyInfo company={stockData.company} />
        <StockFinancials financialMetrics={stockData.financialMetricsLatest} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Stock Price Chart</CardTitle>
            <CardDescription>
              Price data from {startDate} to {endDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StockChart prices={stockData.prices} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
            <CardDescription>
              Recent news and updates about {stockData.company.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StockNews news={stockData.news} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 