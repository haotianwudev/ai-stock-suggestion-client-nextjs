import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface TopicConfig extends BaseConfig {}

export const topicsConfig: Record<string, TopicConfig> = {
  'option101': {
    id: 'option101',
    title: 'Options 101',
    description: 'Understand the key scenarios where options can be an effective trading and investment tool.',
    videoUrl: 'https://youtu.be/brQbdu19cbw',
    infographicUrl: "https://i.imgur.com/ln9KdrO.jpeg",
    relatedArticles: [
      "strategic-options-utilization-risk-comprehensive-framework",
      "option-when-to-trade",
      "navigating-minefield-options-trading-pitfalls",
      "option-pitfalls",
      "options-strategy-report-october-10-market-event",
      "option-strategy-grey-rhino",
      "tax-efficient-option-writing-comprehensive-guide",
      "tax-efficient-option-writing",
      "decoding-options-market-volume-open-interest-analysis",
      "volume-oi",
      "index-effect",
      "sp500-inclusion-anomaly-december-2025-deep-research",
      "navigating-bull-to-bear-regime-shift-quantitative-signals",
      "institutional-investors-spot-survive-market-crash",
    ],
    studyGuide: {
      items: [
        {
          text: "When to Trade, and When NOT to Trade",
          url: "https://www.sophie-ai-finance.com/articles/strategic-options-utilization-risk-comprehensive-framework",
          videoUrl: "https://youtu.be/brQbdu19cbw",
          visualGuideUrl: "https://i.imgur.com/ln9KdrO.jpeg",
        },
        {
          text: "Common Pitfalls of Trading Options",
          url: "https://www.sophie-ai-finance.com/articles/navigating-minefield-options-trading-pitfalls",
          videoUrl: "https://youtu.be/IvWGgDNQoUk",
          visualGuideUrl: "https://i.imgur.com/Sbugskc.jpeg",
        },
        {
          text: "Option Strategies for Market Shock",
          url: "https://www.sophie-ai-finance.com/articles/options-strategy-report-october-10-market-event",
          videoUrl: "https://youtu.be/UTPVKLS87zg",
          visualGuideUrl: "https://i.imgur.com/pM6d7Cb.jpeg",
        },
        {
          text: "Tax-Efficient Option Writing and Common Pitfalls",
          url: "https://www.sophie-ai-finance.com/articles/tax-efficient-option-writing-comprehensive-guide",
          videoUrl: "https://youtu.be/PkibBIsGHzk",
          visualGuideUrl: "https://i.imgur.com/SlyV2Jv.jpeg",
        },
        {
          text: "Option Volume and Open Interest (OI)",
          url: "https://www.sophie-ai-finance.com/articles/decoding-options-market-volume-open-interest-analysis",
          videoUrl: "https://youtu.be/DOhaPf3eJXM",
          visualGuideUrl: "https://i.imgur.com/asowAEM.jpeg",
        },
        {
          text: "Index Inclusion",
          url: "https://www.sophie-ai-finance.com/articles/sp500-inclusion-anomaly-december-2025-deep-research",
          videoUrl: "https://youtu.be/IMS-1JMTbc0",
          visualGuideUrl: "https://i.imgur.com/tJfTSLl.jpeg",
        },
        {
          text: "Barchart Option Chain",
          url: "https://www.barchart.com/stocks/quotes/$SPX/options"
        },
        {
          text: "Yahoo Finance Option Chain",
          url: "https://finance.yahoo.com/quote/%5ESPX/options/"
        },
        {
          text: "Bull-to-Bear Regime Shift",
          url: "https://www.sophie-ai-finance.com/articles/navigating-bull-to-bear-regime-shift-quantitative-signals",
          videoUrl: "https://youtu.be/A16B5cx3_yc",
          visualGuideUrl: "https://i.imgur.com/zwJ2vHQ.jpeg",
        },
      ]
    }
  },
  
  'greeks': {
    id: 'greeks',
    title: 'Option Greeks',
    description: 'Master option pricing through interactive Greek calculations and visualizations. Learn Delta, Gamma, Theta, Vega, and Rho with real-time examples.',
    videoUrl: 'https://youtu.be/ZLUeCSLgw3Y',
    infographicUrl: "https://i.imgur.com/Fre6XfJ.jpeg",
    relatedArticles: [
      "option-greeks-poem",
      "option-greeks-traders-poetic-guide-risk",
      "black-scholes-option-pricing",
      "black-scholes-analytics-laboratory-axioms-option-pricing",
      "unlocking-volatility-surface-risk-neutral-densities-butterfly-spread",
      "butterfly-spreads-risk-neutral-density",
    ],
    studyGuide: {
      items: [
        {
          text: "How to understand Greeks",
          url: "https://www.sophie-ai-finance.com/articles/option-greeks-traders-poetic-guide-risk",
          videoUrl: "https://youtu.be/ZLUeCSLgw3Y",
          visualGuideUrl: "https://i.imgur.com/Fre6XfJ.jpeg"
        },
        {
          text: "Black Scholes Model and Risk Neutral Pricing",
          url: "https://www.sophie-ai-finance.com/articles/black-scholes-analytics-laboratory-axioms-option-pricing",
          videoUrl: "https://youtu.be/BfU9H60nepI",
          visualGuideUrl: "https://i.imgur.com/VVQWBaJ.jpeg"
        },
        {
          text: "Barchart Volatility & Greeks",
          url: "https://www.barchart.com/stocks/quotes/$SPX/volatility-greeks",
        },
        {
          text: "Risk-Neutral Densities",
          url: "https://www.sophie-ai-finance.com/articles/unlocking-volatility-surface-risk-neutral-densities-butterfly-spread",
          videoUrl: "https://youtu.be/KG66_1FnRSg",
          visualGuideUrl: "https://i.imgur.com/LniOyTx.jpeg",
        },
      ]
    }
  },
  
  'volatility': {
    id: 'volatility',
    title: 'Volatility',
    description: 'Deep dive into volatility concepts including the volatility smile, market structure analysis, and how volatility patterns reveal investor psychology and market dynamics.',
    videoUrl: 'https://youtu.be/p8nblr4NyNc',
    relatedArticles: [
      "volatility-smile",
      "volatility-smile-quantitative-analysis-market-structure-sentiment-arbitrage",
      "decode-vix",
      "vix-index-comprehensive-guide-market-volatility",
      "predict-volatility",
      "quantitative-analyst-guide-volatility-forecasting",
      "industrialization-volatility-hedge-funds-operational-architecture",
      "vol-hedge-fund",
      "industrialization-volatility-hedge-funds-operational-architecture",
      "nvdia-q4-2025",
      "decoding-reversal-nvidia-february-2026-earnings-paradox",
      "volatility-skew-index",
      "quantitative-analysis-tail-risk-cboe-skew-nations-skewdex",
      "option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
      "volatility-model-evolution-svi-dupire-heston",
      "sticky-strike-vs-sticky-delta-volatility-surface-dynamics",
      "vol-surface-sticky-delta-sticky-strike",
      "mathematics-microstructure-cboe-vix",
      "math-microstructure-vix",
    ],
    studyGuide: {
      items: [
        {
          text: "The Volatility Smile",
          url: "https://www.sophie-ai-finance.com/articles/volatility-smile-quantitative-analysis-market-structure-sentiment-arbitrage",
          videoUrl: "https://youtu.be/p8nblr4NyNc",
          visualGuideUrl: "https://i.imgur.com/vBYRuhI.jpeg"
        },
        {
          text: "The VIX Index",
          url: "https://www.sophie-ai-finance.com/articles/vix-index-comprehensive-guide-market-volatility",
          videoUrl: "https://youtu.be/_NDyPBYkZxg",
          visualGuideUrl: "https://i.imgur.com/cKQBMh7.jpeg"
        },
        {
          text: "Volatility Skew",
          url: "https://www.sophie-ai-finance.com/articles/quantitative-analysis-tail-risk-cboe-skew-nations-skewdex",
          videoUrl: "https://youtu.be/2LL3GzaFPWw",
          visualGuideUrl: "https://i.imgur.com/l4YH9xQ.jpeg",
        },
        {
          text: "Using Machine Learning to Predict Volatility",
          url: "https://www.sophie-ai-finance.com/articles/quantitative-analyst-guide-volatility-forecasting",
          videoUrl: "https://youtu.be/zLKCTVTfvo4",
          visualGuideUrl: "https://i.imgur.com/EE4Ch15.jpeg",
        },
        {
          text: "Volatility Hedge Fund",
          url: "https://www.sophie-ai-finance.com/articles/industrialization-volatility-hedge-funds-operational-architecture",
          videoUrl: "https://youtu.be/B4tJwZriwdY",
          visualGuideUrl: "https://i.imgur.com/a3KxgF2.jpeg",
        },
        {
          text: "Example: NVDA IV Crush and Gamma Flip",
          url: "https://www.sophie-ai-finance.com/articles/decoding-reversal-nvidia-february-2026-earnings-paradox",
          videoUrl: "https://youtu.be/vuTmzLnjfYc",
          visualGuideUrl: "https://i.imgur.com/ZmUUSF8.jpeg",
        },
        {
          text: "Yahoo Finance VIX Chart",
          url: "https://finance.yahoo.com/quote/%5EVIX/"
        },
        {
          text: "Barchart Volatility Charts",
          url: "https://www.barchart.com/stocks/quotes/$SPX/volatility-charts"
        },
        {
          text: "Option Volatility Modeling: SVI, Dupire and Heston",
          url: "https://www.sophie-ai-finance.com/articles/option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
          videoUrl: "https://youtu.be/EjaO4UaVLJA",
          visualGuideUrl: "https://i.imgur.com/UAZud6k.jpeg",
        },
        {
          text: "Sticky Strike vs. Sticky Delta: The Hidden Dynamics of the Volatility Surface",
          url: "https://www.sophie-ai-finance.com/articles/sticky-strike-vs-sticky-delta-volatility-surface-dynamics",
          videoUrl: "https://youtu.be/LgSXvwCOy0o",
          visualGuideUrl: "https://i.imgur.com/mdZbOrt.jpeg",
        },
        {
          text: "The Mathematics & Microstructure of the Cboe VIX",
          url: "https://www.sophie-ai-finance.com/articles/mathematics-microstructure-cboe-vix",
          videoUrl: "https://youtu.be/IXumgPJ5D-A",
          visualGuideUrl: "https://i.imgur.com/7aefF0v.jpeg",
        },
      ]
    }
  },

  'vrp': {
    id: 'vrp',
    title: 'Volatility Risk Premium (VRP)',
    description: 'Understanding the systematic edge in options markets where implied volatility consistently overstates realized volatility.',
    videoUrl: 'https://youtu.be/eHu9X04D7Ss',
    infographicUrl: 'https://i.imgur.com/ZSPRHKw.jpeg',
    relatedArticles: [
      "volatility-risk-premium-intro",
      'demystifying-volatility-risk-premium-theory-measurement-trading',
      "spx-option-underlyer",
      "mastering-volatility-risk-premium-spx-options-selling",
      "industrialization-volatility-hedge-funds-operational-architecture",
      "vol-hedge-fund",
      "industrialization-volatility-hedge-funds-operational-architecture",
      "decomposing-volatility-risk-premium-structural-arbitrage",
      "quant-edge-alpha-generation",
      "mastering-spx-option-selling-strategies-variance-risk-premium",
      "systematic-spx-option-selling",
    ],
    studyGuide: {
      items: [
        {
          text: "VRP Deep Dive Analysis",
          url: "https://www.sophie-ai-finance.com/articles/demystifying-volatility-risk-premium-theory-measurement-trading",
          videoUrl: "https://youtu.be/eHu9X04D7Ss",
          visualGuideUrl: "https://i.imgur.com/ZSPRHKw.jpeg"
        },
        {
          text: "VRP on SPX",
          url: "https://www.sophie-ai-finance.com/articles/mastering-volatility-risk-premium-spx-options-selling",
          videoUrl: "https://youtu.be/yThUZBJWKPM",
          visualGuideUrl: "https://i.imgur.com/Iz7lSu4.jpeg"
        },
        {
          text: "Volatility Hedge Fund",
          url: "https://www.sophie-ai-finance.com/articles/industrialization-volatility-hedge-funds-operational-architecture",
          videoUrl: "https://youtu.be/B4tJwZriwdY",
          visualGuideUrl: "https://i.imgur.com/a3KxgF2.jpeg",
        },
        {
          text: "Barchart Historical vs Implied Volatility",
          url: "https://www.barchart.com/stocks/quotes/$SPX/volatility-charts",
        },
        {
          text: "Decomposing the Volatility Risk Premium: A Sophisticated Framework for Structural Arbitrage",
          url: "https://www.sophie-ai-finance.com/articles/decomposing-volatility-risk-premium-structural-arbitrage",
          videoUrl: "https://youtu.be/tP1HJuVzuZU",
          visualGuideUrl: "https://i.imgur.com/R0dykvd.jpeg",
        },
        {
          text: "Mastering SPX Option Selling Strategies: A Quantitative Guide to Harvesting the Variance Risk Premium",
          url: "https://www.sophie-ai-finance.com/articles/mastering-spx-option-selling-strategies-variance-risk-premium",
          videoUrl: "https://youtu.be/uWmPazdgV4Q",
          visualGuideUrl: "https://i.imgur.com/ihkmf5U.jpeg",
        },
      ]
    }
  },

  'gex': {
    id: 'gex',
    title: 'Gamma Exposure (GEX)',
    description: 'Understanding how market makers\' gamma exposure influences market volatility and price movements, creating predictable trading patterns.',
    videoUrl: 'https://youtu.be/t_5yWuxn0WY',
    infographicUrl: 'https://i.imgur.com/4FiUTqH.jpeg',
    relatedArticles: [
      "gamma-exposure-gex-gps-market-volatility",
      "gex-secret",
      "microstructure-intraday-option-speculation-mechanics-strategies-risks",
      "option-0dte",
      "nvdia-q4-2025",
      "decoding-reversal-nvidia-february-2026-earnings-paradox",
      "dark-index-dix-understanding-short-is-long-market-microstructure",
      "dark-index-dix-tracking-smart-money",
      "anatomy-market-drop-systemic-risk-options-microstructure-crisis-alpha",
      "overheat-cool-down-markets-plunge",
    ],
    studyGuide: {
      items: [
        {
          text: "GEX and Market Volatility Analysis",
          url: "https://www.sophie-ai-finance.com/articles/gamma-exposure-gex-gps-market-volatility",
          videoUrl: "https://youtu.be/t_5yWuxn0WY",
          visualGuideUrl: "https://i.imgur.com/4FiUTqH.jpeg"
        },
        {
          text: "0DTE",
          url: "https://www.sophie-ai-finance.com/articles/microstructure-intraday-option-speculation-mechanics-strategies-risks",
          videoUrl: "https://youtu.be/94XcRcFfnxo",
          visualGuideUrl: "https://i.imgur.com/vQoeqIu.jpeg",
        },
        {
          text: "Example: NVDA IV Crush and Gamma Flip",
          url: "https://www.sophie-ai-finance.com/articles/decoding-reversal-nvidia-february-2026-earnings-paradox",
          videoUrl: "https://youtu.be/vuTmzLnjfYc",
          visualGuideUrl: "https://i.imgur.com/ZmUUSF8.jpeg",
        },
        {
          text: "Barchart GEX viewer",
          url: "https://www.barchart.com/stocks/quotes/$SPX/gamma-exposure",
        },
        {
          text: "The Dark Index (DIX)",
          url: "https://www.sophie-ai-finance.com/articles/dark-index-dix-understanding-short-is-long-market-microstructure",
          videoUrl: "https://youtu.be/f5yZ7wdjEOY",
          visualGuideUrl: "https://i.imgur.com/yLBeGqi.jpeg",
        },
        {
          text: "What happened in Markets Plunge?",
          url: "https://www.sophie-ai-finance.com/articles/anatomy-market-drop-systemic-risk-options-microstructure-crisis-alpha",
          videoUrl: "https://youtu.be/o9cu-VKCgY4",
          visualGuideUrl: "https://i.imgur.com/sjnGt0w.jpeg",
        },
      ]
    }
  },

  'roll': {
    id: 'roll',
    title: 'Rolling Options',
    description: 'Master the strategic framework for rolling short option positions through defensive and offensive techniques. Learn when to roll, close, or hold using quantitative triggers and Greeks-based decision making.',
    videoUrl: 'https://youtu.be/q5FSpOKtcFM',
    infographicUrl: 'https://i.imgur.com/yDVJgI0.jpeg',
    relatedArticles: [
      "strategic-framework-rolling-options-quantitative-approach",
      "roll-option",
      "advanced-option-rolling-mechanics",
      "art-rolling-options-hidden-trap",
      "optimal-early-exercise-american-call-options-dividend-stocks",
      "american-call-options-early-exercise",
      "kelly-criterion-optimal-position-sizing-information-theory",
      "kelly-criterion-position-sizing",
    ],
    studyGuide: {
      items: [
        {
          text: "Strategic Framework for Rolling Options",
          url: "https://www.sophie-ai-finance.com/articles/strategic-framework-rolling-options-quantitative-approach",
          videoUrl: "https://youtu.be/q5FSpOKtcFM",
          visualGuideUrl: "https://i.imgur.com/yDVJgI0.jpeg"
        },
        {
          text: "Advanced Option Rolling Mechanics",
          url: "https://www.sophie-ai-finance.com/articles/advanced-option-rolling-mechanics",
          videoUrl: "https://youtu.be/2L_UPaxTy_c",
          visualGuideUrl: "https://i.imgur.com/ORf3wI2.jpeg",
        },
        {
          text: "Optimal Early Exercise of American Call Options on Dividend-Paying Stocks",
          url: "https://www.sophie-ai-finance.com/articles/optimal-early-exercise-american-call-options-dividend-stocks",
          videoUrl: "https://youtu.be/v8iVbeIxVRc",
          visualGuideUrl: "https://i.imgur.com/yYUhUcF.jpeg",
        },
        {
          text: "The Kelly Criterion: Optimal Position Sizing from Information Theory to Practice",
          url: "https://www.sophie-ai-finance.com/articles/kelly-criterion-optimal-position-sizing-information-theory",
          videoUrl: "https://youtu.be/lLaqaSzIlP4",
          visualGuideUrl: "https://i.imgur.com/m9AINNC.jpeg",
        },
      ]
    }
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}