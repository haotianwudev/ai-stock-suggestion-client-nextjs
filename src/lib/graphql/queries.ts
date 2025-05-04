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
        website_url
        market_cap
      }
      financialMetricsLatest {
        report_period
        period
        currency
        market_cap
        enterprise_value
        price_to_earnings_ratio
        price_to_book_ratio
        price_to_sales_ratio
        earnings_per_share
        free_cash_flow_yield
        payout_ratio
      }
      prices(start_date: $startDate, end_date: $endDate) {
        biz_date
        open
        high
        low
        close
        volume
      }       
      news (limit: 100) {
        title
        date
        source
        url
        sentiment
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

export const GET_STOCK_SENTIMENT = gql`
  query GetLatestSentiment($ticker: String!) {
    latestSentiment(ticker: $ticker) {
      biz_date
      overall_signal
      confidence
      insider_total
      insider_bullish
      insider_bearish
      insider_value_total
      insider_value_bullish
      insider_value_bearish
      insider_weight
      news_total
      news_bullish
      news_bearish
      news_neutral
      news_weight
      weighted_bullish
      weighted_bearish
    }
  }
`;

export const GET_STOCK_TECHNICALS = gql`
  query GetLatestTechnicals($ticker: String!) {
    latestTechnicals(ticker: $ticker) {
      biz_date
      signal
      confidence
      
      trend_signal
      trend_confidence
      trend_score
      trend_adx_threshold
      ema_8
      ema_21
      ema_55
      adx
      di_plus
      di_minus
      
      mr_signal
      mr_confidence
      mr_score
      z_score
      bb_upper
      bb_lower
      rsi_14
      rsi_28
      
      momentum_signal
      momentum_confidence
      momentum_score
      mom_1m
      mom_3m
      mom_6m
      volume_ratio
      
      volatility_signal
      volatility_confidence
      volatility_score
      hist_vol_21d
      vol_regime
      vol_z_score
      atr_ratio
      
      stat_arb_signal
      stat_arb_confidence
      stat_arb_score
      hurst_exp
      skewness
      kurtosis
    }
  }
`;

export const GET_LATEST_AGENT_SIGNAL = gql`
  query GetLatestAgentSignal($ticker: String!, $agent: String!) {
    latestAgentSignal(ticker: $ticker, agent: $agent) {
      ticker
      agent
      signal
      confidence
      reasoning
      biz_date
    }
  }
`;

// Old query - keeping for reference
/*
export const GET_STOCK_AGENT_SUGGESTIONS = gql`
  query GetStockAgentSuggestions($ticker: String!) {
    agentSuggestions(ticker: $ticker) {
      id
      ticker
      agent
      signal
      confidence
      reasoning
      biz_date
      created_at
      updated_at
    }
  }
`;
*/ 