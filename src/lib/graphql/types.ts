export interface Company {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  category?: string;
  exchange?: string;
  cik?: string;
  is_active?: number;
  listing_date?: string;
  location?: string;
  market_cap?: number;
  number_of_employees?: number;
  sec_filings_url?: string;
  sic_code?: string;
  sic_industry?: string;
  sic_sector?: string;
  website_url?: string;
  weighted_average_shares?: number;
}

export interface FinancialMetrics {
  report_period: string;
  period: string;
  currency: string;
  market_cap: number;
  enterprise_value: number;
  price_to_earnings_ratio: number;
  price_to_book_ratio: number;
  price_to_sales_ratio?: number;
  earnings_per_share?: number;
  free_cash_flow_yield?: number;
  payout_ratio?: number;
}

export interface StockPrice {
  biz_date: string;
  open: number;
  high: number;
  low: number;
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

export interface StockTechnicals {
  biz_date: string;
  signal: string;
  confidence: number;
  
  trend_signal: string;
  trend_confidence: number;
  trend_score: number;
  trend_adx_threshold: number;
  ema_8: number;
  ema_21: number;
  ema_55: number;
  adx: number;
  di_plus: number;
  di_minus: number;
  
  mr_signal: string;
  mr_confidence: number;
  mr_score: number;
  z_score: number;
  bb_upper: number;
  bb_lower: number;
  rsi_14: number;
  rsi_28: number;
  
  momentum_signal: string;
  momentum_confidence: number;
  momentum_score: number;
  mom_1m: number;
  mom_3m: number;
  mom_6m: number;
  volume_ratio: number;
  
  volatility_signal: string;
  volatility_confidence: number;
  volatility_score: number;
  hist_vol_21d: number;
  vol_regime: number;
  vol_z_score: number;
  atr_ratio: number;
  
  stat_arb_signal: string;
  stat_arb_confidence: number;
  stat_arb_score: number;
  hurst_exp: number;
  skewness: number;
  kurtosis: number;
}

export interface StockAgentSuggestion {
  id?: number;
  ticker: string;
  agent: string;
  signal: string;
  confidence: number;
  reasoning: string;
  biz_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface SophieAnalysis {
  id: number;
  ticker: string;
  biz_date: string;
  signal: string;
  confidence: number;
  overall_score: number;
  reasoning: string;
  short_term_outlook: string;
  medium_term_outlook: string;
  long_term_outlook: string;
  bullish_factors: string[];
  bearish_factors: string[];
  risks: string[];
  model_name: string;
  model_display_name: string;
  created_at: string;
  updated_at: string;
}

export interface InvestmentClockDataPoint {
  bizDate: string;
  growthZScore: number;
  inflationZScore: number;
  dataPhase: string;
  clockAngle: number;
  gdpValue?: number;
  cpiValue?: number;
  indproValue?: number;
  tcuValue?: number;
  unrateValue?: number;
  cliValue?: number;
  icsaValue?: number;
  cpiYoy?: number;
  cpiMomAnn?: number;
  t5yieValue?: number;
  ppiYoy?: number;
  gdpYoyPct?: number;
  cpiYoyPct?: number;
  indproYoyPct?: number;
  cliYoyChange?: number;
  icsaYoyPct?: number;
  unrateYoyChange?: number;
}

export interface PhaseProbability {
  phase: string;
  probability: number;
}

export interface MonitoringTrigger {
  indicator: string;
  threshold: string;
  meaning: string;
}

export interface SectorRationale {
  etf: string;
  rationale: string;
}

export interface InvestmentClockEvaluation {
  bizDate: string;
  finalPhase: string;
  phaseConfidence?: number;
  phaseDirection?: string;
  reasoning?: string;
  outlook?: string;
  keyIndicators?: string[];
  risks?: string[];
  bestAsset?: string;
  recommendedSectors?: string[];
  geminiResearchSummary?: string;
  phaseProbabilities?: PhaseProbability[];
  monitoringTriggers?: MonitoringTrigger[];
  sectorRationale?: SectorRationale[];
}

export interface InvestmentClockResult {
  current?: InvestmentClockEvaluation;
  latestData?: InvestmentClockDataPoint;
  history: InvestmentClockDataPoint[];
}

export interface QuantTrendingItem {
  id: number;
  source: string;
  title: string;
  url: string;
  description?: string;
  author?: string;
  heatScore: number;
  rawScore: number;
  tags: string[];
  publishedAt?: string;
  fetchedAt: string;
}

export interface QuantTrendingResult {
  items: QuantTrendingItem[];
  lastUpdated?: string;
  total: number;
}

export interface User {
  id: string;
  email?: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  youtubeSubscribed: boolean;
  likedCount: number;
  tier: number;
}

export interface LikeResult {
  wasNewLike: boolean;
  likedCount: number;
  tier: number;
}

export interface ForumCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  sortOrder: number;
}

export interface ForumThread {
  id: string;
  categoryId?: string;
  categorySlug?: string;
  contentType?: string;
  contentSlug?: string;
  title: string;
  authorId?: string;
  authorDisplayName?: string;
  authorAvatarUrl?: string;
  status: string;
  pinned: boolean;
  locked: boolean;
  createdAt: string;
  updatedAt: string;
  postCount: number;
}

export interface ForumThreadList {
  items: ForumThread[];
  totalCount: number;
}

export interface ForumPost {
  id: string;
  threadId: string;
  parentPostId?: string;
  authorId: string;
  authorDisplayName?: string;
  authorAvatarUrl?: string;
  body: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  editedAt?: string;
}

export interface ForumPostList {
  items: ForumPost[];
  totalCount: number;
}