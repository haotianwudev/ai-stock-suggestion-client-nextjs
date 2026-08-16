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
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { StockChart } from "@/components/stock/stock-chart";
import { StockCompanyInfo } from "@/components/stock/stock-company-info";
import { StockValuation as StockValuationComponent } from "@/components/stock/stock-valuation";
import { StockFundamentalsAnalysis } from "@/components/stock/stock-fundamentals-analysis";
import { StockSentimentAnalysis } from "@/components/stock/stock-sentiment";
import { StockTechnicalsAnalysis } from "@/components/stock/stock-technicals-analysis";
import { StockAgentSuggestions } from "@/components/stock/stock-agent-suggestions";
import { StockAnalysisSummary } from "@/components/stock/stock-analysis-summary";
import { StockSEO, createStockFAQStructuredData, createOrganizationStructuredData, createWebSiteStructuredData, createNavigationStructuredData } from "@/components/seo/stock-seo";

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
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <Loader2 className="h-8 w-8 animate-spin text-[#A8672E] dark:text-[#D08F52] mb-3" />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading stock information for {ticker}...</p>
    </div>
  );

  if (detailsError) return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-gray-900 shadow-sm text-center">
      <p className="text-base font-semibold text-red-600 dark:text-red-400 mb-2">Error loading stock information</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{detailsError.message}</p>
      <Link href="/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors">
        <ArrowLeft className="h-4 w-4" /> Return to Home
      </Link>
    </div>
  );

  if (!stockData) return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-center">
      <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">No stock data found for ticker: {ticker}</p>
      <Link href="/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors mt-2">
        <ArrowLeft className="h-4 w-4" /> Return to Home
      </Link>
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
    <>
      {/* SEO Components */}
      <StockSEO ticker={ticker} company={stockData.company} stockData={stockData}>
        {createStockFAQStructuredData(ticker, stockData.company.name)}
        {createOrganizationStructuredData()}
        {createWebSiteStructuredData()}
        {createNavigationStructuredData()}
      </StockSEO>
      
      <div className="space-y-6">
        {/* Navigation & Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-gray-700 dark:text-gray-300 hover:text-[#A8672E] dark:hover:text-[#D08F52] font-medium text-sm shadow-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#A8672E]/10 text-[#A8672E] dark:bg-[#D08F52]/20 dark:text-[#D08F52] border border-[#A8672E]/20 dark:border-[#D08F52]/30 uppercase tracking-wider">
              Stock Research
            </span>
          </div>
        </div>

        {/* Hero meta: ticker, company name, sector, and mini-disclaimer */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
              {stockData.company.ticker}
            </span>
            {stockData.company.sector && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                {stockData.company.sector}
              </span>
            )}
            {stockData.company.industry && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {stockData.company.industry}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0 gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 break-words">
                {stockData.company.name} <span className="text-[#A8672E] dark:text-[#D08F52]">({stockData.company.ticker})</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Quantitative fundamentals, valuation models, market sentiment, technical momentum, and AI bot signals.
              </p>
            </div>
            
            <div className="lg:max-w-md lg:flex-shrink-0">
              <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed shadow-sm">
                <p><strong>Disclaimer:</strong> SOPHIE analysis is for educational purposes only and does not constitute financial advice. All suggestions are generated by AI models and quantitative algorithms.</p>
              </div>
            </div>
          </div>
        </div>
      
        {/* Main analysis section with improved mobile grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3 xl:grid-cols-7">
          <StockCompanyInfo 
            company={stockData.company} 
            prices={stockData.prices} 
            financialMetrics={stockData.financialMetricsLatest} 
            className="lg:col-span-1 xl:col-span-2" 
          />
          <StockAnalysisSummary 
            technicals={technicals || mockTechnicals}
            sentiment={sentiment || mockSentiment}
            fundamentals={fundamentals || mockFundamentals}
            valuations={valuations}
            className="lg:col-span-2 xl:col-span-5"
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
      
        {/* Agent suggestions section */}
        {agentSuggestions.length > 0 && (
          <div className="space-y-4">
            <StockAgentSuggestions suggestions={agentSuggestions} />
          </div>
        )}
      
        {/* Loading state for agents */}
        {loadingAgents && (
          <div className="flex justify-center items-center h-24 sm:h-32 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <div className="text-center">
              <Loader2 className="animate-spin h-6 w-6 text-[#A8672E] dark:text-[#D08F52] mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Loading AI agent analysis...</p>
            </div>
          </div>
        )}
      
        {/* Analysis sections with improved mobile spacing and SEO structure */}
        <section className="space-y-4 sm:space-y-6">
          <Card id="technical-analysis" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">Technical Analysis</CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                Best for short-term trading decisions and timing market entry/exit points based on price patterns and momentum
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <StockTechnicalsAnalysis technicals={technicals || mockTechnicals} prices={stockData.prices} />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <Card id="sentiment-analysis" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">Market Sentiment Analysis</CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                Useful for gauging market psychology and institutional interest in the short to medium term
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <StockSentimentAnalysis sentiment={sentiment || mockSentiment} news={stockData.news} />
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="space-y-4 sm:space-y-6" id="fundamental-analysis">
          <StockFundamentalsAnalysis fundamentals={fundamentals || mockFundamentals} />
        </section>

        <section className="space-y-4 sm:space-y-6" id="valuation-analysis">
          <StockValuationComponent valuations={valuations} />
        </section>
      </div>
    </>
  );
} 