import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface QuantTopicConfig extends BaseConfig {}

export const quantTopicsConfig: Record<string, QuantTopicConfig> = {
  'systematic-strategies': {
    id: 'systematic-strategies',
    title: 'Systematic Trading Strategies',
    description: 'Learn rule-based trading approaches, momentum strategies, mean reversion, smart beta factor investing, and systematic portfolio construction methods.',
    videoUrl: 'https://youtu.be/z32X0C5F5JE',
    infographicUrl: 'https://i.imgur.com/1HBWYfN.jpeg',
    relatedArticles: [
      "systematic-vs-model-quantitative-trading-evolution",
      "smart-beta",
      "smart-beta-systematic-personal-investing-strategies",
      "factor-models",
      "stock-factor-models-comprehensive-guide",
      "personal-quant-trading-strategies-independent-analysts",
    ],
    studyGuide: {
      items: [
        {
          text: "Systematic Trading vs Machine Learning Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/systematic-vs-model-quantitative-trading-evolution",
          visualGuideUrl: "https://i.imgur.com/1HBWYfN.jpeg",
        },
        {
          text: "Smart Beta",
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
          text: "Rule Based Strategies",
          url: "https://www.sophie-ai-finance.com/articles/personal-quant-trading-strategies-independent-analysts",
          visualGuideUrl: "https://i.imgur.com/JbYaRHq.jpeg",
        },
        {
          text: "Portfolio Optimization",
          url: "https://www.sophie-ai-finance.com/articles/efficient-frontier-portfolio-optimization-mathematics",
          visualGuideUrl: "https://i.imgur.com/7fzYQ0K.jpeg",
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
      "definitive-backtrader-cheatsheet-guide",
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
          text: "Backtrader Cheatsheet",
          url: "https://www.sophie-ai-finance.com/articles/definitive-backtrader-cheatsheet-guide",
          visualGuideUrl: "https://i.imgur.com/hHbVXLF.jpeg",
        },
      ]
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
          text: "WorldQuant Alpha Factory",
          url: "https://www.sophie-ai-finance.com/articles/worldquant-alpha-factory-industrialized-quantitative-signal-generation",
          videoUrl: "https://youtu.be/L0aVoPLqcFw",
          visualGuideUrl: "https://i.imgur.com/boJhFsQ.jpeg",
        },
        {
          text: "Alternative Data for trading",
          url: "https://www.sophie-ai-finance.com/articles/hedge-fund-data-driven-edge-alpha-generation",
          videoUrl: "https://youtu.be/L0aVoPLqcFw",
          visualGuideUrl: "https://i.imgur.com/EOSdL9d.jpeg",
        },
      ]
    }
  }
};

export function getQuantTopicConfig(topicId: string): QuantTopicConfig | null {
  return quantTopicsConfig[topicId] || null;
}