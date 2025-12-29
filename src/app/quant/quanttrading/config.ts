export interface QuantTopicConfig {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  infographicUrl?: string;
  relatedArticles?: string[];
}

export const quantTopicsConfig: Record<string, QuantTopicConfig> = {
  'systematic-strategies': {
    id: 'systematic-strategies',
    title: 'Systematic Trading Strategies',
    description: 'Learn rule-based trading approaches, momentum strategies, mean reversion, and systematic portfolio construction methods.',
    //videoUrl: 'https://youtu.be/L0aVoPLqcFw',
    //infographicUrl: 'https://i.imgur.com/YourSystematicStrategiesInfographic.jpeg',
    relatedArticles: [

    ]
  },
  
  'machine-learning': {
    id: 'machine-learning',
    title: 'Machine Learning in Finance',
    description: 'Explore AI and machine learning applications in quantitative finance. From predictive modeling to quantitative trading and risk assessment.',
    //videoUrl: 'https://youtu.be/aViyh1n08v4',
    //infographicUrl: "https://i.imgur.com/YourMLInfographic.jpeg",
    relatedArticles: [
      "ai-powered-trading-algorithms-deep-learning",
      "machine-learning-portfolio-optimization",
      "neural-networks-financial-prediction",
    ]
  }
};

export function getQuantTopicConfig(topicId: string): QuantTopicConfig | null {
  return quantTopicsConfig[topicId] || null;
}