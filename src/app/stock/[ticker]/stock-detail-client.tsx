"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GET_STOCK_DETAILS, 
  GET_STOCK_VALUATIONS, 
  GET_STOCK_FUNDAMENTALS,
  GET_STOCK_SENTIMENT
} from "@/lib/graphql/queries";
import { 
  StockDetails, 
  type StockValuation, 
  type StockFundamentals,
  type StockSentiment
} from "@/lib/graphql/types";
import { StockChart } from "@/components/stock/stock-chart";
import { StockNews } from "@/components/stock/stock-news";
import { StockFinancials } from "@/components/stock/stock-financials";
import { StockCompanyInfo } from "@/components/stock/stock-company-info";
import { StockValuation as StockValuationComponent } from "@/components/stock/stock-valuation";
import { StockFundamentalsAnalysis } from "@/components/stock/stock-fundamentals-analysis";
import { StockSentimentAnalysis } from "@/components/stock/stock-sentiment";

interface StockDetailClientProps {
  ticker: string;
}

export function StockDetailClient({ ticker }: StockDetailClientProps) {
  const [startDate, setStartDate] = useState<string>(getDefaultStartDate());
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate());
  const [fundamentals, setFundamentals] = useState<StockFundamentals | null>(null);
  const [sentiment, setSentiment] = useState<StockSentiment | null>(null);

  function getDefaultStartDate() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
  }

  function getDefaultEndDate() {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  const { loading: detailsLoading, error: detailsError, data: detailsData } = useQuery(GET_STOCK_DETAILS, {
    variables: { ticker, startDate, endDate },
  });

  const { loading: valuationsLoading, error: valuationsError, data: valuationsData } = useQuery(GET_STOCK_VALUATIONS, {
    variables: { ticker },
  });

  const { loading: fundamentalsLoading, error: fundamentalsError, data: fundamentalsData } = useQuery(GET_STOCK_FUNDAMENTALS, {
    variables: { ticker },
  });

  const { loading: sentimentLoading, error: sentimentError, data: sentimentData } = useQuery(GET_STOCK_SENTIMENT, {
    variables: { ticker },
  });

  // For debugging
  useEffect(() => {
    if (fundamentalsData) {
      console.log("Fundamentals data:", fundamentalsData);
      
      // Try various possible formats
      const data = fundamentalsData?.latestFundamentals || 
                  (Array.isArray(fundamentalsData?.latestFundamentals) 
                    ? fundamentalsData?.latestFundamentals[0] 
                    : null);
                    
      setFundamentals(data);
    }
  }, [fundamentalsData]);

  // For sentiment data
  useEffect(() => {
    if (sentimentData) {
      console.log("Sentiment data:", sentimentData);
      
      // Try various possible formats
      const data = sentimentData?.latestSentiment || 
                  (Array.isArray(sentimentData?.latestSentiment) 
                    ? sentimentData?.latestSentiment[0] 
                    : null);
                    
      setSentiment(data);
    }
  }, [sentimentData]);

  const stockData: StockDetails | null = detailsData?.stock || null;
  const valuations: StockValuation[] = valuationsData?.latestValuations || [];

  // For debugging when user sees the issue
  if (fundamentalsError) {
    console.error("Fundamentals error:", fundamentalsError);
  }

  if (detailsLoading) return (
    <div className="flex justify-center items-center h-64">
      <p>Loading stock information...</p>
    </div>
  );

  if (detailsError) return (
    <div className="flex justify-center items-center h-64">
      <p>Error loading stock information: {detailsError.message}</p>
    </div>
  );

  if (!stockData) return (
    <div className="flex justify-center items-center h-64">
      <p>No stock data found for ticker: {ticker}</p>
    </div>
  );

  // Mock fundamentals data for testing the UI - will only be used if real data is missing
  const mockFundamentals: StockFundamentals = {
    biz_date: "2025-05-02",
    overall_signal: "neutral",
    confidence: 25.00,
    profitability_score: 3,
    profitability_signal: "bullish",
    growth_score: 1,
    growth_signal: "neutral",
    health_score: 1,
    health_signal: "neutral",
    valuation_score: 3,
    valuation_signal: "bearish",
    return_on_equity: 1.4530,
    net_margin: 0.2430,
    operating_margin: 0.3177,
    revenue_growth: 0.0121,
    earnings_growth: 0.0258,
    book_value_growth: 0.1722,
    current_ratio: 0.9200,
    debt_to_equity: 4.1500,
    free_cash_flow_per_share: 6.5200,
    earnings_per_share: 6.3600,
    pe_ratio: 40.1800,
    pb_ratio: 57.8700,
    ps_ratio: 9.7600
  };

  // Mock sentiment data for testing the UI - will only be used if real data is missing
  const mockSentiment: StockSentiment = {
    biz_date: "2025-05-03",
    overall_signal: "bullish",
    confidence: 47.00,
    insider_total: 537,
    insider_bullish: 244,
    insider_bearish: 293,
    insider_value_total: -54417304,
    insider_value_bullish: 1610410659,
    insider_value_bearish: -1664827963,
    insider_weight: 0.30,
    news_total: 100,
    news_bullish: 49,
    news_bearish: 18,
    news_neutral: 33,
    news_weight: 0.70,
    weighted_bullish: 107.50,
    weighted_bearish: 100.50
  };

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
        <StockFundamentalsAnalysis fundamentals={fundamentals || mockFundamentals} />
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <StockValuationComponent valuations={valuations} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>
              Insights from insider trading, news sentiment, and latest {stockData.company.name} coverage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <StockSentimentAnalysis sentiment={sentiment || mockSentiment} news={stockData.news} />
              
              <hr className="border-t border-gray-200 dark:border-gray-800 my-6" />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Latest News</h3>
                <StockNews news={stockData.news} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 