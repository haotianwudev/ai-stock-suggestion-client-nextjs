import { gql } from "@apollo/client";

export const SEARCH_STOCKS = gql`
  query SearchStocks($query: String!) {
    searchStocks(query: $query) {
      ticker
      name
    }
  }
`;

export const GET_STOCK_DETAILS = gql`
  query GetStockDetails($ticker: String!, $startDate: String!, $endDate: String!) {
    stock(ticker: $ticker) {
      company {
        ticker
        name
        sector
        industry
      }
      financialMetricsLatest {
        report_period
        period
        currency
        market_cap
        enterprise_value
        price_to_earnings_ratio
        price_to_book_ratio
      }
      prices(start_date: $startDate, end_date: $endDate) {
        biz_date
        close
        volume
      }       
      news {
        title
        date
        source
        url
      }
    }
  }
`;

export const GET_STOCK_VALUATIONS = gql`
  query GetLatestValuations($ticker: String!) {
    latestValuations(ticker: $ticker) {
      valuation_method
      intrinsic_value
      market_cap
      gap
      signal
      biz_date
    }
  }
`;

export const GET_STOCK_FUNDAMENTALS = gql`
  query GetLatestFundamentals($ticker: String!) {
    latestFundamentals(ticker: $ticker) {
      biz_date
      overall_signal
      confidence
      profitability_score
      profitability_signal
      growth_score  
      growth_signal
      health_score
      health_signal
      valuation_score
      valuation_signal
      return_on_equity
      net_margin
      operating_margin
      revenue_growth
      earnings_growth
      book_value_growth
      current_ratio
      debt_to_equity
      free_cash_flow_per_share
      earnings_per_share
      pe_ratio
      pb_ratio
      ps_ratio
    }
  }
`; 