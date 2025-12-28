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
  }
};

export function getAlgoTopicConfig(topicId: string): AlgoTopicConfig | null {
  return algoTopicsConfig[topicId] || null;
}