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

export interface NewsItem {
  title: string;
  date: string;
  source: string;
  url: string;
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