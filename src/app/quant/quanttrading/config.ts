import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface QuantTopicConfig extends BaseConfig {}

export const quantTopicsConfig: Record<string, QuantTopicConfig> = {
  'systematic-strategies': {
    id: 'systematic-strategies',
    title: 'Systematic & Rule-Based Trading',
    description: 'Learn systematic trading approaches using rule-based strategies, momentum systems, mean reversion, factor models, and algorithmic signal generation without machine learning complexity.',
    videoUrl: 'https://youtu.be/72sh2YIWD8U',
    infographicUrl: 'https://i.imgur.com/1HBWYfN.jpeg',
    relatedArticles: [
      "systematic-vs-quant-trading",
      "systematic-vs-model-quantitative-trading-evolution",
      "factor-models",
      "stock-factor-models-comprehensive-guide",
      "volume-price-analysis",
      "volume-price-analysis-market-lore-algorithmic-execution",
      "personal-quant-trading-strategies-independent-analysts",
      "pre-market-prediction",
      "quantitative-approach-predicting-market-direction-premarket-data",
      "index-effect",
      "intraday-u-shape",
      "quantifying-intraday-alpha-u-curve-volatility-engine-institutional-flow",
      "sp500-inclusion-anomaly-december-2025-deep-research",
      "seasons-market-calendar-anomalies-trading-adages",
      "order-flow-anomalies-sweeps-footprint-mechanics-institutional-traps",
      "order-flow-anomalies",
      "traders-guide-futures-specials-market-structure-anomalies",
      "future-trading-basic",
      "navigating-bull-to-bear-regime-shift-quantitative-signals",
      "institutional-investors-spot-survive-market-crash",
      "unified-theory-market-dynamics-order-flow-impact-volatility",
      "order-flow-market-impact-rough-volatility",
    ],
    studyGuide: {
      items: [
        {
          text: "Systematic Trading vs Machine Learning Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/systematic-vs-model-quantitative-trading-evolution",
          visualGuideUrl: "https://i.imgur.com/1HBWYfN.jpeg",
          videoUrl: 'https://youtu.be/72sh2YIWD8U',
        },
        {
          text: "Stock Factor Models",
          url: "https://www.sophie-ai-finance.com/articles/stock-factor-models-comprehensive-guide",
          videoUrl: 'https://youtu.be/z32X0C5F5JE',
          visualGuideUrl: "https://i.imgur.com/ZkYTvd0.jpeg",
        },
        {
          text: "Rule Based Strategies",
          url: "https://www.sophie-ai-finance.com/articles/personal-quant-trading-strategies-independent-analysts",
          visualGuideUrl: "https://i.imgur.com/JbYaRHq.jpeg",
          videoUrl: 'https://youtu.be/72sh2YIWD8U',
        },
        {
          text: "Volume Price Analysis",
          url: "https://www.sophie-ai-finance.com/articles/volume-price-analysis-market-lore-algorithmic-execution",
          videoUrl: 'https://youtu.be/VjOsdoln7Bo',
          visualGuideUrl: "https://i.imgur.com/gy3HaKW.jpeg",
        },
        {
          text: "Pre-market Prediction Strategies",
          url: "https://www.sophie-ai-finance.com/articles/quantitative-approach-predicting-market-direction-premarket-data",
          videoUrl: "https://youtu.be/5WuCFfwFCd4",
          visualGuideUrl: "https://i.imgur.com/jwesLgi.jpeg",
        },
        {
          text: "Intra-day price movement",
          url: "https://www.sophie-ai-finance.com/articles/quantifying-intraday-alpha-u-curve-volatility-engine-institutional-flow",
          videoUrl: "https://youtu.be/ij2nWJXmb04",
          visualGuideUrl: "https://i.imgur.com/C6fWtuH.jpeg",
        },
        {
          text: "Index Inclusion Effects",
          url: "https://www.sophie-ai-finance.com/articles/sp500-inclusion-anomaly-december-2025-deep-research",
          videoUrl: "https://youtu.be/IMS-1JMTbc0",
          visualGuideUrl: "https://i.imgur.com/tJfTSLl.jpeg",
        },
        {
          text: "Order Flow Anomalies: Sweeps and Traps",
          url: "https://www.sophie-ai-finance.com/articles/order-flow-anomalies-sweeps-footprint-mechanics-institutional-traps",
          videoUrl: "https://youtu.be/NqY0oXpdsX8",
          visualGuideUrl: "https://i.imgur.com/enU8l7J.jpeg",
        },
        {
          text: "Futures Trading Basics",
          url: "https://www.sophie-ai-finance.com/articles/traders-guide-futures-specials-market-structure-anomalies",
          videoUrl: "https://youtu.be/bC2Fb6yIOlA",
          visualGuideUrl: "https://i.imgur.com/ayrGomS.jpeg",
        },
        {
          text: "Calendar Anomalies & Seasonal Patterns",
          url: "https://www.sophie-ai-finance.com/articles/seasons-market-calendar-anomalies-trading-adages",
        },
        {
          text: "Bull-to-Bear Regime Shift",
          url: "https://www.sophie-ai-finance.com/articles/navigating-bull-to-bear-regime-shift-quantitative-signals",
          videoUrl: "https://youtu.be/A16B5cx3_yc",
          visualGuideUrl: "https://i.imgur.com/zwJ2vHQ.jpeg",
        },
        {
          text: "Research Paper: A Unified Theory of Market Dynamics: Order Flow, Market Impact, and Volatility",
          url: "https://www.sophie-ai-finance.com/articles/unified-theory-market-dynamics-order-flow-impact-volatility",
          videoUrl: "https://youtu.be/wF1vaW8WwzU",
          visualGuideUrl: "https://i.imgur.com/FaKCNB2.jpeg",
        },
      ]
    }
  },

  'machine-learning': {
    id: 'machine-learning',
    title: 'Machine Learning in Finance',
    description: 'Explore AI and machine learning applications in quantitative finance. From predictive modeling to quantitative trading and risk assessment.',
    videoUrl: 'https://youtu.be/s0Z3pl8DFDA',
    infographicUrl: "https://i.imgur.com/8ZF0tTX.jpeg",
    relatedArticles: [
      "evolution-deep-learning-quantitative-trading-mlps-transformers",
      "deep-learning-evolution",
      "foundational-assumptions-machine-learning-quantitative-trading",
      "ml-assumption",
      "overfitting-illusion",
      "science-robust-alpha-eliminating-overfitting-statistical-validation",
      "quantitative-analyst-guide-volatility-forecasting",
      "predict-volatility",
      "xgboost-lead",
      "strategic-role-xgboost-systematic-trading-2025",
      "lstm-systematic-trading-deep-dive-architecture-application-performance",
      "predict-unpredictable-lstm-systematic-trading",
      "transformer-in-systematic-trading",
      "transformer-systematic-trading-architecture-applications",
      "reinforcement-learning",
      "reinforcement-learning-quantitative-trading-optimal-action",
    ],
    studyGuide: {
      items: [
        {
          text: "Deep Learning Evolution in Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/evolution-deep-learning-quantitative-trading-mlps-transformers",
          videoUrl: "https://youtu.be/s0Z3pl8DFDA",
          visualGuideUrl: "https://i.imgur.com/8ZF0tTX.jpeg",
        },
        {
          text: "Battle the Overfitting",
          url: "https://www.sophie-ai-finance.com/articles/science-robust-alpha-eliminating-overfitting-statistical-validation",
          videoUrl: "https://youtu.be/PvE1DqLAxGU",
          visualGuideUrl: "https://i.imgur.com/N9P4ssC.jpeg",
        },
        {
          text: "Assumptions of Machine Learning in Quantitative Trading",
          url: "https://www.sophie-ai-finance.com/articles/foundational-assumptions-machine-learning-quantitative-trading",
          videoUrl: "https://youtu.be/pR821HLbl3c",
          visualGuideUrl: "https://i.imgur.com/Yq4MVgM.jpeg",
        },
        {
          text: "Volatility Forecasting",
          url: "https://www.sophie-ai-finance.com/articles/quantitative-analyst-guide-volatility-forecasting",
          videoUrl: "https://youtu.be/zLKCTVTfvo4",
          visualGuideUrl: "https://i.imgur.com/EE4Ch15.jpeg",
        },
        {
          text: "Boosted Tree in Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/strategic-role-xgboost-systematic-trading-2025",
          videoUrl: "https://youtu.be/6mXc-7dDLS0",
          visualGuideUrl: "https://i.imgur.com/5HSxp3O.jpeg",
        },
        {
          text: "LSTM in Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/lstm-systematic-trading-deep-dive-architecture-application-performance",
          videoUrl: "https://youtu.be/smYKvopeg1Q",
          visualGuideUrl: "https://i.imgur.com/pldvBTi.jpeg",
        },
        {
          text: "Transformer in Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/transformer-systematic-trading-architecture-applications",
          videoUrl: "https://youtu.be/2JlReeYdFxA",
          visualGuideUrl: "https://i.imgur.com/Ee6p93j.jpeg",
        },
        {
          text: "Reinforcement Learning in Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/reinforcement-learning-quantitative-trading-optimal-action",
          videoUrl: "https://youtu.be/sSu4emL_mOU",
          visualGuideUrl: "https://i.imgur.com/UCv1dCZ.jpeg",
        },
      ]
    }
  },

  'backtest': {
    id: 'backtest',
    title: 'Backtesting & Performance Analysis',
    description: 'Master the art of strategy validation through rigorous backtesting. Learn performance metrics, risk assessment, and how to avoid common pitfalls in quantitative strategy evaluation.',
    videoUrl: 'https://youtu.be/WBUxNZZzwnY',
    infographicUrl: 'https://i.imgur.com/wLwP2HW.jpeg',
    relatedArticles: [
      "strategy-performance",
      "measuring-immeasurable-hedge-fund-performance-metrics",
      "asset-allocation-performance-attribution",
      "strategic-tactical-asset-allocation-comprehensive-guide",
      "definitive-backtrader-cheatsheet-guide",
      "mechanics-of-alpha-raw-data-realized-returns",
      "backtest-lie-quant-strategies-fail",
    ],
    studyGuide: {
      items: [
        {
          text: "Strategy Performance Metrics",
          url: "https://www.sophie-ai-finance.com/articles/measuring-immeasurable-hedge-fund-performance-metrics",
          videoUrl: "https://youtu.be/WBUxNZZzwnY",
          visualGuideUrl: "https://i.imgur.com/wLwP2HW.jpeg",
        },
        {
          text: "Performance Attribution",
          visualGuideUrl: "https://i.imgur.com/MhIheV4.jpeg",
          videoUrl: "https://youtu.be/Ef2bnyet0wA",
          url: "https://www.sophie-ai-finance.com/articles/strategic-tactical-asset-allocation-comprehensive-guide",
        },
        {
          text: "Backtrader Cheatsheet",
          url: "https://www.sophie-ai-finance.com/articles/definitive-backtrader-cheatsheet-guide",
          visualGuideUrl: "https://i.imgur.com/hHbVXLF.jpeg",
        },
        {
          text: "Backtest with AI",
          url: "https://app.statisfund.com",
        },
        {
          text: "Portfolio Visualizer",
          url: "https://www.portfoliovisualizer.com/",
        },
        {
          text: "Backtest Lie",
          url: "https://www.sophie-ai-finance.com/articles/mechanics-of-alpha-raw-data-realized-returns",
          videoUrl: "https://youtu.be/rv_9yM5vn6k",
          visualGuideUrl: "https://i.imgur.com/Yqby0EQ.jpeg",
        },
      ],
    }
  },

  'trading-system': {
    id: 'trading-system',
    title: 'Trading System Architecture',
    description: 'Explore the complete anatomy of quantitative trading systems. From alpha discovery through machine learning to automated execution, understand how modern quant funds operate end-to-end.',
    videoUrl: 'https://youtu.be/QQjvEWV9-WQ',
    infographicUrl: 'https://i.imgur.com/rUsDCw7.jpeg',
    relatedArticles: [
      "hedge-fund-workflow",
      "anatomy-quant-fund-alpha-discovery-automated-execution",
      "worldquant-alpha-factor",
      "worldquant-alpha-factory-industrialized-quantitative-signal-generation",
      "hedge-fund-edge-data",
      "hedge-fund-data-driven-edge-alpha-generation",
      "industrialization-volatility-hedge-funds-operational-architecture",
      "quant-filters",
      "signal-noise-comprehensive-analysis-filtering-techniques-quantitative-trading",
      "high-frequency-trading",
      "microsecond-battlefield-competitive-strategies-high-frequency-trading",
      "market-making",
      "anatomy-of-speed-modern-market-making-hft",
      "harvest-investor",
      "the-harvest-institutional-exploitation-retail-investors",
      "vol-hedge-fund",
      "industrialization-volatility-hedge-funds-operational-architecture",
      "jane-st-paradigm",
      "institutional-hft-market-manipulation-regulatory-framework",
    ],
    studyGuide: {
      items: [
        {
          text: "Quantitative Trading Workflow",
          url: "https://sophie-ai-finance.com/articles/anatomy-quant-fund-alpha-discovery-automated-execution",
          videoUrl: "https://youtu.be/QQjvEWV9-WQ",
          visualGuideUrl: "https://i.imgur.com/rUsDCw7.jpeg",
        },
        {
          text: "High Frequency Trading",
          url: "https://sophie-ai-finance.com/articles/microsecond-battlefield-competitive-strategies-high-frequency-trading",
          videoUrl: "https://youtu.be/Zp-ZmWc1G3A",
          visualGuideUrl: "https://i.imgur.com/1HIyqvy.jpeg",
        },
        {
          text: "Modern Market Making in HFT",
          url: "https://sophie-ai-finance.com/articles/anatomy-of-speed-modern-market-making-hft",
          videoUrl: "https://youtu.be/waY0tFW49VY",
          visualGuideUrl: "https://i.imgur.com/WZbpiQT.jpeg",
        },
        {
          text: "WorldQuant Alpha Factory",
          url: "https://www.sophie-ai-finance.com/articles/worldquant-alpha-factory-industrialized-quantitative-signal-generation",
          videoUrl: "https://youtu.be/L0aVoPLqcFw",
          visualGuideUrl: "https://i.imgur.com/boJhFsQ.jpeg",
        },
        {
          text: "Volatility Hedge Fund",
          url: "https://www.sophie-ai-finance.com/articles/industrialization-volatility-hedge-funds-operational-architecture",
          videoUrl: "https://youtu.be/B4tJwZriwdY",
          visualGuideUrl: "https://i.imgur.com/a3KxgF2.jpeg",
        },
        {
          text: "Alternative Data for trading",
          url: "https://www.sophie-ai-finance.com/articles/hedge-fund-data-driven-edge-alpha-generation",
          videoUrl: "https://youtu.be/U5iJM-xrGLs",
          visualGuideUrl: "https://i.imgur.com/EOSdL9d.jpeg",
        },
        {
          text: "The Institutional Playbook for Exploiting the Common Investor",
          url: "https://www.sophie-ai-finance.com/articles/the-harvest-institutional-exploitation-retail-investors",
          videoUrl: "https://youtu.be/xMaKA2lIn8c",
          visualGuideUrl: "https://i.imgur.com/4qzGj8K.jpeg",
        },
        {
          text: "Filtering Techniques Explained",
          url: "https://www.sophie-ai-finance.com/articles/signal-noise-comprehensive-analysis-filtering-techniques-quantitative-trading",
          videoUrl: "https://youtu.be/xtwugnNA6Ac",
          visualGuideUrl: "https://i.imgur.com/w5OLmL3.jpeg",
        },
        {
          text: "Jane Street",
          url: "https://www.sophie-ai-finance.com/articles/institutional-hft-market-manipulation-regulatory-framework",
          videoUrl: "https://youtu.be/eIpC4b_4cAM",
          visualGuideUrl: "https://i.imgur.com/UjnivYW.jpeg",
        },
      ]
    }
  },

  'asset-allocation': {
    id: 'asset-allocation',
    title: 'Portfolio Construction & Asset Allocation',
    description: 'Master portfolio construction techniques including strategic/tactical asset allocation, smart beta factor investing, risk parity, portfolio optimization, and quantitative wealth management frameworks.',
    videoUrl: 'https://youtu.be/IvgZO_QcUJs',
    infographicUrl: 'https://i.imgur.com/CrXmbad.jpeg',
    relatedArticles: [
      "strategic-asset-allocation",
      "strategic-asset-allocation-quantitative-framework-wealth-preservation",
      "asset-allocation-performance-attribution",
      "strategic-tactical-asset-allocation-comprehensive-guide",
      "portfolio-optimization",
      "efficient-frontier-portfolio-optimization-mathematics",
      "black-litterman-model-comprehensive-guide-portfolio-optimization",
      "all-weather-strategy",
      "all-weather-strategy-new-economic-climate",
      "beyond-leverage-risk-parity-call-writing",
      "investment-clock",
      "investment-clock-framework-quantitative-macro-regime-detection",
      "stock-factor-models-comprehensive-guide",
      "expected-return",
      "modeling-expected-returns-quantitative-foundation-modern-portfolio-theory",
      "risk-prism-architecture-modern-factor-models",
      "diversification-deep-dive-factor-based-risk-models",
    ],
    studyGuide: {
      items: [
        {
          text: "Strategic Asset Allocation Framework",
          url: "https://www.sophie-ai-finance.com/articles/strategic-asset-allocation-quantitative-framework-wealth-preservation",
          videoUrl: "https://youtu.be/IvgZO_QcUJs",
          visualGuideUrl: "https://i.imgur.com/CrXmbad.jpeg",
        },
        {
          text: "Strategic vs Tactical Asset Allocation",
          visualGuideUrl: "https://i.imgur.com/MhIheV4.jpeg",
          videoUrl: "https://youtu.be/Ef2bnyet0wA",
          url: "https://www.sophie-ai-finance.com/articles/strategic-tactical-asset-allocation-comprehensive-guide",
        },
        {
          text: "Smart Beta Factor Investing",
          url: "https://www.sophie-ai-finance.com/articles/smart-beta-systematic-personal-investing-strategies",
          videoUrl: 'https://youtu.be/xZY-O9-4AUs',
          visualGuideUrl: "https://i.imgur.com/CWJK4x1.jpeg",
        },
        {
          text: "Stock Factor Models",
          url: "https://www.sophie-ai-finance.com/articles/stock-factor-models-comprehensive-guide",
          videoUrl: 'https://youtu.be/z32X0C5F5JE',
          visualGuideUrl: "https://i.imgur.com/ZkYTvd0.jpeg",
        },
        {
          text: "Efficient Frontier & Portfolio Optimization",
          url: "https://www.sophie-ai-finance.com/articles/efficient-frontier-portfolio-optimization-mathematics",
          videoUrl: "https://youtu.be/_XSExYXACic",
          visualGuideUrl: "https://i.imgur.com/7fzYQ0K.jpeg",
        },
        {
          text: "Black-Litterman Model",
          visualGuideUrl: "https://i.imgur.com/5ZI6OUm.jpeg",
          url: "https://www.sophie-ai-finance.com/articles/black-litterman-model-comprehensive-guide-portfolio-optimization",
        },
        {
          text: "All Weather Strategy (Risk Parity)",
          url: "https://www.sophie-ai-finance.com/articles/all-weather-strategy-new-economic-climate",
          videoUrl: "https://youtu.be/NCVI6IDwz2c",
        },
        {
          text: "Modeling Expected Returns",
          visualGuideUrl: "https://i.imgur.com/5ZI6OUm.jpeg",
          videoUrl: "https://youtu.be/i0WiCcwcsFs",
          url: "https://www.sophie-ai-finance.com/articles/modeling-expected-returns-quantitative-foundation-modern-portfolio-theory",
        },
        {
          text: "Risk Model",
          url: "https://www.sophie-ai-finance.com/articles/risk-prism-architecture-modern-factor-models",
          videoUrl: "https://youtu.be/UNmo7ERzI8o",
          visualGuideUrl: "https://i.imgur.com/QwAjISy.jpeg",
        },
        {
          text: "Investment Clock Framework",
          visualGuideUrl: "https://i.imgur.com/E1ZKfSA.jpeg",
          videoUrl: "https://youtu.be/ns0nlaE74Ac",
          url: "https://www.sophie-ai-finance.com/articles/investment-clock-framework-quantitative-macro-regime-detection",
        },
        {
          text: "Portfolio Visualizer Tool",
          url: "https://www.portfoliovisualizer.com/",
        },
      ]
    }
  }
};

export function getQuantTopicConfig(topicId: string): QuantTopicConfig | null {
  return quantTopicsConfig[topicId] || null;
}