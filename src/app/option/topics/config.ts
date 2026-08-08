import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface TopicConfig extends BaseConfig {}

export const topicsConfig: Record<string, TopicConfig> = {
  "option101": {
    id: "option101",
    title: "Options 101",
    description: "Understand the key scenarios where options can be an effective trading and investment tool.",
    primaryArticleSlug: "strategic-options-utilization-risk-comprehensive-framework",
    studyGuide: {
      items: [
        {
          text: "When to Trade, and When NOT to Trade",
          articleSlug: "strategic-options-utilization-risk-comprehensive-framework",
        },
        {
          text: "Common Pitfalls of Trading Options",
          articleSlug: "navigating-minefield-options-trading-pitfalls",
        },
        {
          text: "Option Strategies for Market Shock",
          articleSlug: "options-strategy-report-october-10-market-event",
        },
        {
          text: "Tax-Efficient Option Writing",
          articleSlug: "tax-efficient-option-writing-comprehensive-guide",
        },
        {
          text: "Option Volume and Open Interest (OI)",
          articleSlug: "decoding-options-market-volume-open-interest-analysis",
        },
        {
          text: "Index Inclusion",
          articleSlug: "sp500-inclusion-anomaly-december-2025-deep-research",
        },
        {
          text: "Barchart Option Chain",
          url: "https://www.barchart.com/stocks/quotes/$SPX/options",
        },
        {
          text: "Yahoo Finance Option Chain",
          url: "https://finance.yahoo.com/quote/%5ESPX/options/",
        },
        {
          text: "Bull-to-Bear Regime Shift",
          articleSlug: "navigating-bull-to-bear-regime-shift-quantitative-signals",
        },
      ]
    }
  },

  "greeks": {
    id: "greeks",
    title: "Option Greeks",
    description: "Master option pricing through interactive Greek calculations and visualizations. Learn Delta, Gamma, Theta, Vega, and Rho with real-time examples.",
    videoUrl: "https://youtu.be/ZLUeCSLgw3Y",
    infographicUrl: "https://i.imgur.com/Fre6XfJ.jpeg",
    studyGuide: {
      items: [
        {
          text: "How to understand Greeks",
          articleSlug: "option-greeks-traders-poetic-guide-risk",
          visualGuideUrl: "https://i.imgur.com/Fre6XfJ.jpeg",
        },
        {
          text: "Black-Scholes Model",
          articleSlug: "black-scholes-analytics-laboratory-axioms-option-pricing",
        },
        {
          text: "Barchart Volatility & Greeks",
          url: "https://www.barchart.com/stocks/quotes/$SPX/volatility-greeks",
        },
        {
          text: "Risk-Neutral Densities",
          articleSlug: "unlocking-volatility-surface-risk-neutral-densities-butterfly-spread",
        },
      ]
    }
  },

  "volatility": {
    id: "volatility",
    title: "Volatility",
    description: "Deep dive into volatility concepts including the volatility smile, market structure analysis, and how volatility patterns reveal investor psychology and market dynamics.",
    primaryArticleSlug: "volatility-smile-quantitative-analysis-market-structure-sentiment-arbitrage",
    studyGuide: {
      items: [
        {
          text: "The Volatility Smile",
          articleSlug: "volatility-smile-quantitative-analysis-market-structure-sentiment-arbitrage",
        },
        {
          text: "The VIX Index",
          articleSlug: "vix-index-comprehensive-guide-market-volatility",
        },
        {
          text: "Volatility Skew",
          articleSlug: "quantitative-analysis-tail-risk-cboe-skew-nations-skewdex",
        },
        {
          text: "Volatility Forecasting",
          articleSlug: "quantitative-analyst-guide-volatility-forecasting",
        },
        {
          text: "Volatility Hedge Fund",
          articleSlug: "industrialization-volatility-hedge-funds-operational-architecture",
        },
        {
          text: "Example: NVDA IV Crush and Gamma Flip",
          articleSlug: "decoding-reversal-nvidia-february-2026-earnings-paradox",
        },
        {
          text: "Yahoo Finance VIX Chart",
          url: "https://finance.yahoo.com/quote/%5EVIX/",
        },
        {
          text: "Barchart Volatility Charts",
          url: "https://www.barchart.com/stocks/quotes/$SPX/volatility-charts",
        },
        {
          text: "SVI, Dupire & Heston Models",
          articleSlug: "option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
        },
        {
          text: "Sticky Strike vs. Sticky Delta",
          articleSlug: "sticky-strike-vs-sticky-delta-volatility-surface-dynamics",
        },
        {
          text: "Cboe VIX Microstructure",
          articleSlug: "mathematics-microstructure-cboe-vix",
        },
      ]
    }
  },

  "vrp": {
    id: "vrp",
    title: "Volatility Risk Premium (VRP)",
    description: "Understanding the systematic edge in options markets where implied volatility consistently overstates realized volatility.",
    primaryArticleSlug: "demystifying-volatility-risk-premium-theory-measurement-trading",
    studyGuide: {
      items: [
        {
          text: "VRP Deep Dive Analysis",
          articleSlug: "demystifying-volatility-risk-premium-theory-measurement-trading",
        },
        {
          text: "VRP on SPX",
          articleSlug: "mastering-volatility-risk-premium-spx-options-selling",
        },
        {
          text: "Volatility Hedge Fund",
          articleSlug: "industrialization-volatility-hedge-funds-operational-architecture",
        },
        {
          text: "Barchart Historical vs Implied Volatility",
          url: "https://www.barchart.com/stocks/quotes/$SPX/volatility-charts",
        },
        {
          text: "Decomposing the Volatility Risk Premium",
          articleSlug: "decomposing-volatility-risk-premium-structural-arbitrage",
        },
        {
          text: "Mastering SPX Option Selling Strategies",
          articleSlug: "mastering-spx-option-selling-strategies-variance-risk-premium",
        },
      ]
    }
  },

  "gex": {
    id: "gex",
    title: "Gamma Exposure (GEX)",
    description: "Understanding how market makers' gamma exposure influences market volatility and price movements, creating predictable trading patterns.",
    videoUrl: "https://youtu.be/t_5yWuxn0WY",
    infographicUrl: "https://i.imgur.com/4FiUTqH.jpeg",
    studyGuide: {
      items: [
        {
          text: "GEX and Market Volatility Analysis",
          articleSlug: "gamma-exposure-gex-gps-market-volatility",
          visualGuideUrl: "https://i.imgur.com/4FiUTqH.jpeg",
        },
        {
          text: "0DTE",
          articleSlug: "microstructure-intraday-option-speculation-mechanics-strategies-risks",
        },
        {
          text: "Example: NVDA IV Crush and Gamma Flip",
          articleSlug: "decoding-reversal-nvidia-february-2026-earnings-paradox",
        },
        {
          text: "Barchart GEX viewer",
          url: "https://www.barchart.com/stocks/quotes/$SPX/gamma-exposure",
        },
        {
          text: "The Dark Index (DIX)",
          articleSlug: "dark-index-dix-understanding-short-is-long-market-microstructure",
        },
        {
          text: "What happened in Markets Plunge?",
          articleSlug: "anatomy-market-drop-systemic-risk-options-microstructure-crisis-alpha",
        },
      ]
    }
  },

  "roll": {
    id: "roll",
    title: "Rolling Options",
    description: "Master the strategic framework for rolling short option positions through defensive and offensive techniques. Learn when to roll, close, or hold using quantitative triggers and Greeks-based decision making.",
    primaryArticleSlug: "strategic-framework-rolling-options-quantitative-approach",
    studyGuide: {
      items: [
        {
          text: "Strategic Framework for Rolling Options",
          articleSlug: "strategic-framework-rolling-options-quantitative-approach",
        },
        {
          text: "Advanced Option Rolling Mechanics",
          articleSlug: "advanced-option-rolling-mechanics",
        },
        {
          text: "Optimal Early Exercise of American Calls",
          articleSlug: "optimal-early-exercise-american-call-options-dividend-stocks",
        },
        {
          text: "The Kelly Criterion: Optimal Position Sizing",
          articleSlug: "kelly-criterion-optimal-position-sizing-information-theory",
        },
      ]
    }
  },
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}
