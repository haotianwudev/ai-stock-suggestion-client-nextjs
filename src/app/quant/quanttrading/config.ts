import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface QuantTopicConfig extends BaseConfig {}

export const quantTopicsConfig: Record<string, QuantTopicConfig> = {
  "systematic-strategies": {
    id: "systematic-strategies",
    title: "Systematic & Rule-Based Trading",
    description: "Learn systematic trading approaches using rule-based strategies, momentum systems, mean reversion, factor models, and algorithmic signal generation without machine learning complexity.",
    primaryArticleSlug: "systematic-vs-model-quantitative-trading-evolution",
    studyGuide: {
      items: [
        {
          text: "Systematic vs. ML Quant Trading",
          articleSlug: "systematic-vs-model-quantitative-trading-evolution",
        },
        {
          text: "Stock Factor Models",
          articleSlug: "stock-factor-models-comprehensive-guide",
        },
        {
          text: "Rule Based Strategies",
          articleSlug: "personal-quant-trading-strategies-independent-analysts",
          videoUrl: "https://youtu.be/72sh2YIWD8U",
        },
        {
          text: "Mean Reversion Trading",
          articleSlug: "quantitative-trading-mean-reversion-factor-models-execution-dynamics",
        },
        {
          text: "Formulaic Alpha Mining",
          articleSlug: "advancements-formulaic-alpha-mining-deep-search-mechanics",
        },
        {
          text: "Volume Price Analysis",
          articleSlug: "volume-price-analysis-market-lore-algorithmic-execution",
        },
        {
          text: "Pre-market Prediction Strategies",
          articleSlug: "quantitative-approach-predicting-market-direction-premarket-data",
        },
        {
          text: "Intra-day price movement",
          articleSlug: "quantifying-intraday-alpha-u-curve-volatility-engine-institutional-flow",
        },
        {
          text: "Order Flow Anomalies",
          articleSlug: "order-flow-anomalies-sweeps-footprint-mechanics-institutional-traps",
        },
        {
          text: "Futures Trading Basics",
          articleSlug: "traders-guide-futures-specials-market-structure-anomalies",
        },
        {
          text: "Index Inclusion Effects",
          articleSlug: "sp500-inclusion-anomaly-december-2025-deep-research",
        },
        {
          text: "Calendar Anomalies",
          articleSlug: "seasons-market-calendar-anomalies-trading-adages",
        },
        {
          text: "Bull-to-Bear Regime Shift",
          articleSlug: "navigating-bull-to-bear-regime-shift-quantitative-signals",
        },
        {
          text: "The Dark Index (DIX)",
          articleSlug: "dark-index-dix-understanding-short-is-long-market-microstructure",
        },
        {
          text: "A Unified Theory of Market Dynamics",
          articleSlug: "unified-theory-market-dynamics-order-flow-impact-volatility",
        },
        {
          text: "Supply Chain Trading Signals",
          articleSlug: "supply-chain",
          visualGuideUrl: "https://i.imgur.com/vqAxsnD.png",
        },
        {
          text: "Direct Indexing & Tax-Loss Harvesting",
          articleSlug: "direct-indexing-tax-loss-harvesting-algorithmic-mechanics",
        },
        {
          text: "The Kelly Criterion: Optimal Position Sizing",
          articleSlug: "kelly-criterion-optimal-position-sizing-information-theory",
        },
        {
          text: "Cross-Border Dual-Listed Equities",
          articleSlug: "pricing-cross-border-dual-listed-equities",
        },
        {
          text: "Long-Short Equity Portfolios",
          articleSlug: "quantitative-foundations-long-short-equity-portfolios",
        },
      ]
    }
  },

  "machine-learning": {
    id: "machine-learning",
    title: "Machine Learning in Finance",
    description: "Explore AI and machine learning applications in quantitative finance. From predictive modeling to quantitative trading and risk assessment.",
    primaryArticleSlug: "evolution-deep-learning-quantitative-trading-mlps-transformers",
    studyGuide: {
      items: [
        {
          text: "Deep Learning Evolution",
          articleSlug: "evolution-deep-learning-quantitative-trading-mlps-transformers",
        },
        {
          text: "Technical Analysis vs ML Trading",
          articleSlug: "deep-research-ta-vs-ml-trading",
        },
        {
          text: "Assumptions of ML in Quant Trading",
          articleSlug: "foundational-assumptions-machine-learning-quantitative-trading",
        },
        {
          text: "Battle the Overfitting",
          articleSlug: "science-robust-alpha-eliminating-overfitting-statistical-validation",
        },
        {
          text: "Volatility Forecasting",
          articleSlug: "quantitative-analyst-guide-volatility-forecasting",
        },
        {
          text: "Boosted Tree in Quant Trading",
          articleSlug: "strategic-role-xgboost-systematic-trading-2025",
        },
        {
          text: "LSTM in Quant Trading",
          articleSlug: "lstm-systematic-trading-deep-dive-architecture-application-performance",
        },
        {
          text: "Transformer in Quant Trading",
          articleSlug: "transformer-systematic-trading-architecture-applications",
        },
        {
          text: "Reinforcement Learning in Quant Trading",
          articleSlug: "reinforcement-learning-quantitative-trading-optimal-action",
        },
      ]
    }
  },

  "backtest": {
    id: "backtest",
    title: "Backtesting & Performance Analysis",
    description: "Master the art of strategy validation through rigorous backtesting. Learn performance metrics, risk assessment, and how to avoid common pitfalls in quantitative strategy evaluation.",
    primaryArticleSlug: "measuring-immeasurable-hedge-fund-performance-metrics",
    studyGuide: {
      items: [
        {
          text: "Strategy Performance Metrics",
          articleSlug: "measuring-immeasurable-hedge-fund-performance-metrics",
        },
        {
          text: "Performance Attribution",
          articleSlug: "strategic-tactical-asset-allocation-comprehensive-guide",
        },
        {
          text: "Backtrader Cheatsheet",
          articleSlug: "definitive-backtrader-cheatsheet-guide",
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
          articleSlug: "mechanics-of-alpha-raw-data-realized-returns",
        },
        {
          text: "Strategy Decay & Factor Fragility",
          articleSlug: "strategy-decay-factor-fragility-regime-aware-portfolio-construction",
        },
      ]
    }
  },

  "trading-system": {
    id: "trading-system",
    title: "Trading System Architecture",
    description: "Explore the complete anatomy of quantitative trading systems. From alpha discovery through machine learning to automated execution, understand how modern quant funds operate end-to-end.",
    primaryArticleSlug: "anatomy-quant-fund-alpha-discovery-automated-execution",
    studyGuide: {
      items: [
        {
          text: "Quantitative Trading Workflow",
          articleSlug: "anatomy-quant-fund-alpha-discovery-automated-execution",
        },
        {
          text: "High Frequency Trading",
          articleSlug: "microsecond-battlefield-competitive-strategies-high-frequency-trading",
        },
        {
          text: "Modern Market Making in HFT",
          articleSlug: "anatomy-of-speed-modern-market-making-hft",
        },
        {
          text: "WorldQuant Alpha Factory",
          articleSlug: "worldquant-alpha-factory-industrialized-quantitative-signal-generation",
        },
        {
          text: "Alpha Factory Blueprint",
          articleSlug: "alpha-factory-technical-blueprint-quantitative-hedge-funds",
        },
        {
          text: "Volatility Hedge Fund",
          articleSlug: "industrialization-volatility-hedge-funds-operational-architecture",
        },
        {
          text: "Alternative Data for trading",
          articleSlug: "hedge-fund-data-driven-edge-alpha-generation",
        },
        {
          text: "The Institutional Playbook",
          articleSlug: "the-harvest-institutional-exploitation-retail-investors",
        },
        {
          text: "Filtering Techniques",
          articleSlug: "signal-noise-comprehensive-analysis-filtering-techniques-quantitative-trading",
        },
        {
          text: "Jane Street",
          articleSlug: "institutional-hft-market-manipulation-regulatory-framework",
        },
        {
          text: "The Ontology of Value",
          articleSlug: "ontology-of-value-financial-data-classification-lifecycle-management",
        },
        {
          text: "AQR's Research Legacy",
          articleSlug: "architecture-quantitative-insight-aqr-research-legacy",
        },
        {
          text: "The Small Hedge Fund CTO",
          articleSlug: "small-hedge-fund-cto-technology-leadership-quant-trading",
        },
        {
          text: "Architecting the Modern Trading Desk",
          articleSlug: "architecting-modern-hedge-fund-desk-system-design",
        },
        {
          text: "Advanced GitLab SDLC",
          articleSlug: "advanced-gitlab-sdlc-quantitative-development-ci-cd-best-practices",
        },
      ]
    }
  },

  "asset-allocation": {
    id: "asset-allocation",
    title: "Portfolio Construction & Asset Allocation",
    description: "Master portfolio construction techniques including strategic/tactical asset allocation, smart beta factor investing, risk parity, portfolio optimization, and quantitative wealth management frameworks.",
    primaryArticleSlug: "strategic-asset-allocation-quantitative-framework-wealth-preservation",
    studyGuide: {
      items: [
        {
          text: "Strategic Asset Allocation Framework",
          articleSlug: "strategic-asset-allocation-quantitative-framework-wealth-preservation",
        },
        {
          text: "Strategic vs Tactical Asset Allocation",
          articleSlug: "strategic-tactical-asset-allocation-comprehensive-guide",
        },
        {
          text: "Smart Beta Factor Investing",
          articleSlug: "smart-beta-systematic-personal-investing-strategies",
        },
        {
          text: "Stock Factor Models",
          articleSlug: "stock-factor-models-comprehensive-guide",
        },
        {
          text: "The Efficient Frontier",
          articleSlug: "efficient-frontier-portfolio-optimization-mathematics",
        },
        {
          text: "Black-Litterman Model",
          articleSlug: "black-litterman-model-comprehensive-guide-portfolio-optimization",
        },
        {
          text: "All Weather Strategy (Risk Parity)",
          articleSlug: "all-weather-strategy-new-economic-climate",
        },
        {
          text: "Risk Parity Through Call Writing",
          articleSlug: "beyond-leverage-risk-parity-call-writing",
        },
        {
          text: "Modeling Expected Returns",
          articleSlug: "modeling-expected-returns-quantitative-foundation-modern-portfolio-theory",
        },
        {
          text: "Risk Model",
          articleSlug: "risk-prism-architecture-modern-factor-models",
        },
        {
          text: "Investment Clock Framework",
          articleSlug: "investment-clock-framework-quantitative-macro-regime-detection",
        },
        {
          text: "Investment Clock Methodology",
          articleSlug: "investment-clock-website",
          videoUrl: "https://youtu.be/Zzi1cuaPs7M",
          visualGuideUrl: "https://i.imgur.com/TnhLYe5.png",
        },
        {
          text: "Portfolio Visualizer Tool",
          url: "https://www.portfoliovisualizer.com/",
        },
        {
          text: "Integer Optimization in Finance",
          articleSlug: "integer-optimization-finance-continuous-theory-discrete-execution",
        },
        {
          text: "Factor Models in Machine Learning",
          articleSlug: "factor-models-machine-learning-risk-alpha-prediction",
        },
        {
          text: "Entropy Methods in Portfolio Construction",
          articleSlug: "entropy-methods-portfolio-construction",
        },
        {
          text: "Dynamics of the Global ETF Market",
          articleSlug: "dynamics-global-etf-market-scale-strategic-utility-quantitative-mechanics",
        },
      ]
    }
  },

  "books": {
    id: "books",
    title: "Books",
    description: "Curated summaries of quant-focused books — systematic trading, factor investing, and quantitative research, distilled from cover to cover. Coming soon.",
  },
};

export function getQuantTopicConfig(topicId: string): QuantTopicConfig | null {
  return quantTopicsConfig[topicId] || null;
}
