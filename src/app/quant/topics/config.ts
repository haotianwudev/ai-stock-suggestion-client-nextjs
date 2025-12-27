export interface TopicConfig {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  infographicUrl?: string;
  relatedArticles?: string[];
}

export const topicsConfig: Record<string, TopicConfig> = {
  'monte-carlo': {
    id: 'monte-carlo',
    title: 'Monte Carlo Simulation',
    description: 'Master Monte Carlo methods for financial modeling, risk assessment, and portfolio optimization. Learn to simulate complex financial scenarios and price derivatives using probabilistic approaches.',
    videoUrl: 'https://youtu.be/5gA1ifx7wPg',
    infographicUrl: "https://i.imgur.com/vGkVKOa.jpeg",
    relatedArticles: [
      "monte-carlo-simulation-1",
      "monte-carlo-simulation-quantitative-finance-stochastic-modeling",
      "monte-carlo-simulation-2",
      "monte-carlo-robustness-protocols-stress-testing-systematic-trading",
      "monte-carlo-simulation-3",
      "monte-carlo-advanced-stochastic-modeling-derivatives-cva"
    ]
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}