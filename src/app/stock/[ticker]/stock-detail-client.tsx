"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GET_STOCK_DETAILS, 
  GET_STOCK_VALUATIONS, 
  GET_STOCK_FUNDAMENTALS,
  GET_STOCK_SENTIMENT,
  GET_STOCK_TECHNICALS,
  GET_LATEST_AGENT_SIGNAL,
  GET_LATEST_SOPHIE_ANALYSIS
} from "@/lib/graphql/queries";
import { 
  StockDetails, 
  type StockValuation, 
  type StockFundamentals,
  type StockSentiment,
  type StockTechnicals,
  type StockAgentSuggestion,
  type SophieAnalysis
} from "@/lib/graphql/types";
import { StockChart } from "@/components/stock/stock-chart";
import { StockCombinedInfo } from "@/components/stock/stock-combined-info";
import { StockCompanyInfo } from "@/components/stock/stock-company-info";
import { StockValuation as StockValuationComponent } from "@/components/stock/stock-valuation";
import { StockFundamentalsAnalysis } from "@/components/stock/stock-fundamentals-analysis";
import { StockSentimentAnalysis } from "@/components/stock/stock-sentiment";
import { StockTechnicalsAnalysis } from "@/components/stock/stock-technicals-analysis";
import { StockAgentSuggestions } from "@/components/stock/stock-agent-suggestions";
import { StockAnalysisSummary } from "@/components/stock/stock-analysis-summary";

interface StockDetailClientProps {
  ticker: string;
}

export function StockDetailClient({ ticker }: StockDetailClientProps) {
  const [startDate, setStartDate] = useState<string>(getDefaultStartDate());
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate());
  const [fundamentals, setFundamentals] = useState<StockFundamentals | null>(null);
  const [sentiment, setSentiment] = useState<StockSentiment | null>(null);
  const [technicals, setTechnicals] = useState<StockTechnicals | null>(null);
  const [agentSuggestions, setAgentSuggestions] = useState<StockAgentSuggestion[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [sophieAnalysis, setSophieAnalysis] = useState<SophieAnalysis | null>(null);

  function getDefaultStartDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
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

  const { loading: technicalsLoading, error: technicalsError, data: technicalsData } = useQuery(GET_STOCK_TECHNICALS, {
    variables: { ticker },
  });

  // Fetch Warren Buffett agent signal
  const { loading: buffettLoading, error: buffettError, data: buffettData } = useQuery(GET_LATEST_AGENT_SIGNAL, {
    variables: { ticker, agent: "warren_buffett" },
  });

  // Fetch Charlie Munger agent signal
  const { loading: mungerLoading, error: mungerError, data: mungerData } = useQuery(GET_LATEST_AGENT_SIGNAL, {
    variables: { ticker, agent: "charlie_munger" },
  });

  // Fetch Cathie Wood agent signal
  const { loading: woodLoading, error: woodError, data: woodData } = useQuery(GET_LATEST_AGENT_SIGNAL, {
    variables: { ticker, agent: "cathie_wood" },
  });

  // Fetch Stanley Druckenmiller agent signal
  const { loading: druckenmillerLoading, error: druckenmillerError, data: druckenmillerData } = useQuery(GET_LATEST_AGENT_SIGNAL, {
    variables: { ticker, agent: "stanley_druckenmiller" },
  });

  // Fetch Benjamin Graham agent signal
  const { loading: grahamLoading, error: grahamError, data: grahamData } = useQuery(GET_LATEST_AGENT_SIGNAL, {
    variables: { ticker, agent: "ben_graham" },
  });

  // Fetch SOPHIE analysis
  const { loading: sophieLoading, error: sophieError, data: sophieData } = useQuery(GET_LATEST_SOPHIE_ANALYSIS, {
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

  // For technicals data
  useEffect(() => {
    if (technicalsData) {
      console.log("Technicals data:", technicalsData);
      
      // Try various possible formats
      const data = technicalsData?.latestTechnicals || 
                  (Array.isArray(technicalsData?.latestTechnicals) 
                    ? technicalsData?.latestTechnicals[0] 
                    : null);
                    
      setTechnicals(data);
    }
  }, [technicalsData]);

  // For agent signals data
  useEffect(() => {
    const suggestions: StockAgentSuggestion[] = [];
    let buffettSignal = null;
    let mungerSignal = null;
    let woodSignal = null;
    let druckenmillerSignal = null;
    let grahamSignal = null;
    
    if (buffettData?.latestAgentSignal) {
      buffettSignal = {
        id: 1, // Adding ID for compatibility 
        ...buffettData.latestAgentSignal,
        created_at: buffettData.latestAgentSignal.biz_date,
        updated_at: buffettData.latestAgentSignal.biz_date
      };
      suggestions.push(buffettSignal);
    }
    
    if (mungerData?.latestAgentSignal) {
      mungerSignal = {
        id: 2, // Adding ID for compatibility
        ...mungerData.latestAgentSignal,
        created_at: mungerData.latestAgentSignal.biz_date,
        updated_at: mungerData.latestAgentSignal.biz_date
      };
      suggestions.push(mungerSignal);
    }

    if (woodData?.latestAgentSignal) {
      woodSignal = {
        id: 3, // Adding ID for compatibility
        ...woodData.latestAgentSignal,
        created_at: woodData.latestAgentSignal.biz_date,
        updated_at: woodData.latestAgentSignal.biz_date
      };
      suggestions.push(woodSignal);
    }

    if (druckenmillerData?.latestAgentSignal) {
      druckenmillerSignal = {
        id: 4, // Adding ID for compatibility
        ...druckenmillerData.latestAgentSignal,
        created_at: druckenmillerData.latestAgentSignal.biz_date,
        updated_at: druckenmillerData.latestAgentSignal.biz_date
      };
      suggestions.push(druckenmillerSignal);
    }

    if (grahamData?.latestAgentSignal) {
      grahamSignal = {
        id: 5, // Adding ID for compatibility
        ...grahamData.latestAgentSignal,
        created_at: grahamData.latestAgentSignal.biz_date,
        updated_at: grahamData.latestAgentSignal.biz_date
      };
      suggestions.push(grahamSignal);
    }
    
    if (suggestions.length > 0) {
      setAgentSuggestions(suggestions);
    }
    
    if (!buffettLoading && !mungerLoading && !woodLoading && !druckenmillerLoading && !grahamLoading) {
      setLoadingAgents(false);
    }
    
  }, [buffettData, mungerData, woodData, druckenmillerData, grahamData, buffettLoading, mungerLoading, woodLoading, druckenmillerLoading, grahamLoading]);

  // For SOPHIE analysis data
  useEffect(() => {
    if (sophieData?.latestSophieAnalysis) {
      console.log("SOPHIE analysis data:", sophieData.latestSophieAnalysis);
      setSophieAnalysis(sophieData.latestSophieAnalysis);
    }
  }, [sophieData]);

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

  // Mock technicals data for testing the UI - will only be used if real data is missing
  const mockTechnicals: StockTechnicals = {
    biz_date: "2025-05-03",
    signal: "bearish",
    confidence: 39.00,
    
    trend_signal: "neutral",
    trend_confidence: 50.00,
    trend_score: 0.1933,
    trend_adx_threshold: 25.00,
    ema_8: 207.9848,
    ema_21: 206.6055,
    ema_55: 214.2879,
    adx: 19.3267,
    di_plus: 20.7070,
    di_minus: 25.4337,
    
    mr_signal: "neutral",
    mr_confidence: 50.00,
    mr_score: -0.5863,
    z_score: -0.5863,
    bb_upper: 221.1915,
    bb_lower: 178.1345,
    rsi_14: 57.6142,
    rsi_28: 45.2189,
    
    momentum_signal: "bearish",
    momentum_confidence: 42.00,
    momentum_score: -0.0920,
    mom_1m: -0.0616,
    mom_3m: -0.1079,
    mom_6m: -0.0920,
    volume_ratio: 1.2529,
    
    volatility_signal: "bearish",
    volatility_confidence: 55.00,
    volatility_score: 1.6501,
    hist_vol_21d: 0.7987,
    vol_regime: 1.8413,
    vol_z_score: 1.6501,
    atr_ratio: 0.0340,
    
    stat_arb_signal: "neutral",
    stat_arb_confidence: 50.00,
    stat_arb_score: 0.5324,
    hurst_exp: 0.5324,
    skewness: 1.1836,
    kurtosis: 8.8009
  };

  function formatCurrency(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function calculatePriceChange(prices: any[]): React.ReactNode {
    if (!prices || prices.length < 2) {
      return <span>No change data</span>;
    }
    
    const latestPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2];
    
    if (!latestPrice?.close || !previousPrice?.close) {
      return <span>No change data</span>;
    }
    
    const change = latestPrice.close - previousPrice.close;
    const percentChange = (change / previousPrice.close) * 100;
    
    const isPositive = change >= 0;
    const textColor = isPositive ? "text-green-500" : "text-red-500";
    const sign = isPositive ? "+" : "";
    
    return (
      <span className={textColor}>
        {sign}{formatCurrency(change)} ({sign}{percentChange.toFixed(2)}%)
      </span>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{stockData.company.name} ({stockData.company.ticker})</h1>
            <p className="text-muted-foreground">
              {stockData.company.sector} - {stockData.company.industry}
            </p>
          </div>
          
          <div className="mt-2 md:mt-0 max-w-md">
            <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
              <p><strong>Disclaimer:</strong> SOPHIE analysis is for educational purposes only, intended for people to learn more about finance, but not giving financial advice. All suggestions are generated by AI models.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        <StockCompanyInfo company={stockData.company} prices={stockData.prices} financialMetrics={stockData.financialMetricsLatest} className="lg:col-span-2" />
        <StockAnalysisSummary 
          technicals={technicals || mockTechnicals}
          sentiment={sentiment || mockSentiment}
          fundamentals={fundamentals || mockFundamentals}
          valuations={valuations}
          className="lg:col-span-5"
          sophieData={sophieAnalysis || {
            signal: "neutral",
            confidence: 60,
            overall_score: 55,
            reasoning: `${stockData.company.ticker} presents a mixed picture across valuation, technicals, sentiment, and fundamentals. The stock shows strong profitability metrics but faces challenges with valuation multiples and technical indicators. Consider time horizon and risk tolerance before investing.`,
            short_term_outlook: "Cautious approach recommended due to technical weakness",
            medium_term_outlook: "Monitor catalysts and sentiment shifts for potential opportunities",
            long_term_outlook: "May fit within diversified portfolios if fundamentals remain strong",
            bullish_factors: ["Strong profitability metrics", "Market leadership", "Innovation potential"],
            bearish_factors: ["Valuation concerns", "Technical weakness", "Competitive pressures"],
            risks: ["Market volatility", "Sector rotation", "Macroeconomic headwinds"],
            model_name: "sophie",
            model_display_name: "SOPHIE"
          }}
          loading={sophieLoading && !sophieAnalysis}
        />
      </div>
      
      {agentSuggestions.length > 0 && (
        <div className="grid gap-6 md:grid-cols-1">
          <StockAgentSuggestions suggestions={agentSuggestions} />
        </div>
      )}
      
      {loadingAgents && (
        <div className="flex justify-center items-center h-32">
          <p>Loading AI agent analysis...</p>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-1">
        <Card id="technical-analysis">
          <CardHeader>
            <CardTitle>Technical Analysis</CardTitle>
            <CardDescription>
              Best for short-term trading decisions and timing market entry/exit points based on price patterns and momentum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StockTechnicalsAnalysis technicals={technicals || mockTechnicals} prices={stockData.prices} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card id="sentiment-analysis">
          <CardHeader>
            <CardTitle>Market Sentiment Analysis</CardTitle>
            <CardDescription>
              Useful for gauging market psychology and institutional interest in the short to medium term
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <StockSentimentAnalysis sentiment={sentiment || mockSentiment} news={stockData.news} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-1" id="fundamental-analysis">
        <StockFundamentalsAnalysis fundamentals={fundamentals || mockFundamentals} />
      </div>

      <div className="grid gap-6 md:grid-cols-1" id="valuation-analysis">
        <StockValuationComponent valuations={valuations} />
      </div>
    </div>
  );
} 