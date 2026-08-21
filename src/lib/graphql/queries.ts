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

export const GET_LATEST_SOPHIE_ANALYSIS = gql`
  query GetLatestSophieAnalysis($ticker: String!) {
    latestSophieAnalysis(ticker: $ticker) {
      id
      ticker
      biz_date
      signal
      confidence
      overall_score
      reasoning
      short_term_outlook
      medium_term_outlook
      long_term_outlook
      bullish_factors
      bearish_factors
      risks
      model_name
      model_display_name
      created_at
      updated_at
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

export const GET_QUANT_TRENDING = gql`
  query GetQuantTrending($source: String, $limit: Int) {
    quantTrending(source: $source, limit: $limit) {
      items {
        id
        source
        title
        url
        description
        author
        heatScore
        rawScore
        tags
        publishedAt
        fetchedAt
      }
      lastUpdated
      total
    }
  }
`;

export const GET_FORUM_CATEGORIES = gql`
  query GetForumCategories {
    forumCategories {
      id
      slug
      name
      description
      sortOrder
    }
  }
`;

const FORUM_THREAD_FIELDS = `
  id
  categoryId
  categorySlug
  contentType
  contentSlug
  title
  authorId
  authorDisplayName
  authorAvatarUrl
  status
  pinned
  locked
  createdAt
  updatedAt
  postCount
`;

export const GET_FORUM_THREADS = gql`
  query GetForumThreads($categorySlug: String, $limit: Int, $offset: Int) {
    forumThreads(categorySlug: $categorySlug, limit: $limit, offset: $offset) {
      items {
        ${FORUM_THREAD_FIELDS}
      }
      totalCount
    }
  }
`;

export const GET_FORUM_THREAD = gql`
  query GetForumThread($id: ID!) {
    forumThread(id: $id) {
      ${FORUM_THREAD_FIELDS}
    }
  }
`;

export const GET_ARTICLE_COMMENTS = gql`
  query GetArticleComments($contentSlug: String!) {
    articleComments(contentSlug: $contentSlug) {
      ${FORUM_THREAD_FIELDS}
    }
  }
`;

const FORUM_POST_FIELDS = `
  id
  threadId
  parentPostId
  authorId
  authorDisplayName
  authorAvatarUrl
  body
  status
  createdAt
  updatedAt
  editedAt
`;

export const GET_FORUM_POSTS = gql`
  query GetForumPosts($threadId: ID!, $limit: Int, $offset: Int) {
    forumPosts(threadId: $threadId, limit: $limit, offset: $offset) {
      items {
        ${FORUM_POST_FIELDS}
      }
      totalCount
    }
  }
`;

export const CREATE_FORUM_THREAD = gql`
  mutation CreateForumThread($categoryId: ID!, $title: String!, $body: String!) {
    createForumThread(categoryId: $categoryId, title: $title, body: $body) {
      ${FORUM_THREAD_FIELDS}
    }
  }
`;

export const POST_COMMENT = gql`
  mutation PostComment($contentSlug: String!, $title: String!, $body: String!) {
    postComment(contentSlug: $contentSlug, title: $title, body: $body) {
      ${FORUM_POST_FIELDS}
    }
  }
`;

export const REPLY_TO_POST = gql`
  mutation ReplyToPost($threadId: ID!, $parentPostId: ID, $body: String!) {
    replyToPost(threadId: $threadId, parentPostId: $parentPostId, body: $body) {
      ${FORUM_POST_FIELDS}
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost($id: ID!, $body: String!) {
    editPost(id: $id, body: $body) {
      ${FORUM_POST_FIELDS}
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      email
      displayName
      avatarUrl
      youtubeSubscribed
      likedCount
      donatedCents
      tier
      preferredVideoSource
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($displayName: String!, $avatarUrl: String!) {
    updateProfile(displayName: $displayName, avatarUrl: $avatarUrl) {
      id
      email
      displayName
      avatarUrl
      youtubeSubscribed
      likedCount
      donatedCents
      tier
      preferredVideoSource
    }
  }
`;

export const SET_YOUTUBE_SUBSCRIBED = gql`
  mutation SetYoutubeSubscribed($subscribed: Boolean!) {
    setYoutubeSubscribed(subscribed: $subscribed) {
      id
      email
      displayName
      avatarUrl
      youtubeSubscribed
      likedCount
      donatedCents
      tier
      preferredVideoSource
    }
  }
`;

export const SET_PREFERRED_VIDEO_SOURCE = gql`
  mutation SetPreferredVideoSource($source: String!) {
    setPreferredVideoSource(source: $source) {
      id
      email
      displayName
      avatarUrl
      youtubeSubscribed
      likedCount
      tier
      preferredVideoSource
    }
  }
`;

export const MY_LIKED_ARTICLES = gql`
  query MyLikedArticles {
    myLikedArticleSlugs
  }
`;

export const MY_BOOKMARKED_ARTICLES = gql`
  query MyBookmarkedArticles {
    myBookmarkedArticleSlugs
  }
`;

export const ATTEST_LIKED = gql`
  mutation AttestLiked($articleSlug: String!) {
    attestLiked(articleSlug: $articleSlug) {
      wasNewLike
      likedCount
      tier
    }
  }
`;

export const TOGGLE_BOOKMARK = gql`
  mutation ToggleBookmark($articleSlug: String!) {
    toggleBookmark(articleSlug: $articleSlug)
  }
`;

export const CREATE_DONATION_CHECKOUT = gql`
  mutation CreateDonationCheckout($amountCents: Int!) {
    createDonationCheckout(amountCents: $amountCents) {
      checkoutUrl
    }
  }
`;

export const GET_INVESTMENT_CLOCK = gql`
  query GetInvestmentClock {
    investmentClock {
      current {
        bizDate
        finalPhase
        phaseConfidence
        phaseDirection
        reasoning
        outlook
        keyIndicators
        risks
        bestAsset
        recommendedSectors
        geminiResearchSummary
        phaseProbabilities { phase probability }
        monitoringTriggers { indicator threshold meaning }
        sectorRationale { etf rationale }
      }
      latestData {
        bizDate
        growthZScore
        inflationZScore
        dataPhase
        clockAngle
        gdpValue
        cpiValue
        indproValue
        tcuValue
        unrateValue
        cliValue
        icsaValue
        cpiYoy
        cpiMomAnn
        t5yieValue
        ppiYoy
        gdpYoyPct
        cpiYoyPct
        indproYoyPct
        cliYoyChange
        icsaYoyPct
        unrateYoyChange
      }
      history {
        bizDate
        growthZScore
        inflationZScore
        dataPhase
        clockAngle
      }
    }
  }
`; 
export const GET_VOL_REGIME = gql`
  query GetVolRegime($days: Int) {
    volRegime(days: $days) {
      latestData {
        bizDate
        spxClose
        vix
        vix3m
        realizedVol20d
        realizedVol10d
        vrp
        vrpZ
        vrpPercentile
        vrpVariance
        downsideVarianceShare
        fwdRealizedVol21d
        fwdEarnedPremium
        vixRank
        termSlope
        termStructure
        regime
        regimeScore
      }
      history {
        bizDate
        vix
        realizedVol20d
        vrp
        vrpZ
        vixRank
        regime
      }
      stats {
        regime
        days
        avgVrp
        avgVrpVariance
        avgDownsideVarianceShare
        avgVix
        avgVixRank
        pctOfDays
      }
      vrpQuintiles {
        quintile
        days
        vrpZMin
        vrpZMax
        avgForwardEarned
        hitRatePct
      }
      transitions {
        fromRegime
        toRegime
        count
        probability
      }
    }
  }
`;
