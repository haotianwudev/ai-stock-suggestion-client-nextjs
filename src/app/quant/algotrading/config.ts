export interface AlgoTopicConfig {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  infographicUrl?: string;
  relatedArticles?: string[];
}

export const algoTopicsConfig: Record<string, AlgoTopicConfig> = {
  'systematic-strategies': {
    id: 'systematic-strategies',
    title: 'Systematic Trading Strategies',
    description: 'Learn rule-based trading approaches, momentum strategies, mean reversion, and systematic portfolio construction methods.',
    videoUrl: 'https://youtu.be/L0aVoPLqcFw',
    infographicUrl: 'https://i.imgur.com/YourSystematicStrategiesInfographic.jpeg',
    relatedArticles: [
      "systematic-trading-strategies-quantitative-approach",
      "quantitative-momentum-strategies",
      "mean-reversion-trading-strategies",
    ]
  },
  
  'machine-learning': {
    id: 'machine-learning',
    title: 'Machine Learning in Finance',
    description: 'Explore AI and machine learning applications in quantitative finance. From predictive modeling to algorithmic trading and risk assessment.',
    videoUrl: 'https://youtu.be/aViyh1n08v4',
    infographicUrl: "https://i.imgur.com/YourMLInfographic.jpeg",
    relatedArticles: [
      "ai-powered-trading-algorithms-deep-learning",
      "machine-learning-portfolio-optimization",
      "neural-networks-financial-prediction",
    ]
  },
  
  'backtesting': {
    id: 'backtesting',
    title: 'Backtesting & Validation',
    description: 'Master backtesting methodologies, performance metrics, and validation techniques for algorithmic trading strategies.',
    videoUrl: 'https://youtu.be/BacktestingVideoId',
    infographicUrl: 'https://i.imgur.com/YourBacktestingInfographic.jpeg',
    relatedArticles: [
      "backtesting-trading-algorithms",
      "performance-metrics-trading-strategies",
      "overfitting-prevention-backtesting",
    ]
  },

  'execution': {
    id: 'execution',
    title: 'Execution & Implementation',
    description: 'Learn about trade execution algorithms, market microstructure, slippage management, and implementation shortfall.',
    videoUrl: 'https://youtu.be/ExecutionVideoId',
    infographicUrl: 'https://i.imgur.com/YourExecutionInfographic.jpeg',
    relatedArticles: [
      "algorithmic-execution-strategies",
      "market-microstructure-trading",
      "slippage-transaction-costs",
    ]
  }
};

export function getAlgoTopicConfig(topicId: string): AlgoTopicConfig | null {
  return algoTopicsConfig[topicId] || null;
}