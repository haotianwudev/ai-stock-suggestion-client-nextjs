export interface Company {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
}

export interface FinancialMetrics {
  report_period: string;
  period: string;
  currency: string;
  market_cap: number;
  enterprise_value: number;
  price_to_earnings_ratio: number;
  price_to_book_ratio: number;
}

export interface StockPrice {
  biz_date: string;
  close: number;
  volume: number;
}

export interface StockValuation {
  valuation_method: string;
  intrinsic_value: number;
  market_cap: number;
  gap: number;
  signal: string;
  biz_date: string;
}

export interface StockFundamentals {
  biz_date: string;
  overall_signal: string;
  confidence: number;
  profitability_score: number;
  profitability_signal: string;
  growth_score: number;
  growth_signal: string;
  health_score: number;
  health_signal: string;
  valuation_score: number;
  valuation_signal: string;
  return_on_equity: number;
  net_margin: number;
  operating_margin: number;
  revenue_growth: number;
  earnings_growth: number;
  book_value_growth: number;
  current_ratio: number;
  debt_to_equity: number;
  free_cash_flow_per_share: number;
  earnings_per_share: number;
  pe_ratio: number;
  pb_ratio: number;
  ps_ratio: number;
}

export interface NewsItem {
  title: string;
  date: string;
  source: string;
  url: string;
  sentiment: string;
}

export interface StockDetails {
  company: Company;
  financialMetricsLatest: FinancialMetrics;
  prices: StockPrice[];
  news: NewsItem[];
}

export interface SearchResult {
  ticker: string;
  name: string;
}

export interface StockSentiment {
  biz_date: string;
  overall_signal: string;
  confidence: number;
  insider_total: number;
  insider_bullish: number;
  insider_bearish: number;
  insider_value_total: number;
  insider_value_bullish: number;
  insider_value_bearish: number;
  insider_weight: number;
  news_total: number;
  news_bullish: number;
  news_bearish: number;
  news_neutral: number;
  news_weight: number;
  weighted_bullish: number;
  weighted_bearish: number;
} 