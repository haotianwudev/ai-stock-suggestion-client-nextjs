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
    description: 'Master Monte Carlo methods for financial modeling, risk assessment, and portfolio optimization. Learn to simulate complex financial scenarios and price derivatives.',
    videoUrl: 'https://youtu.be/7ESK5SaP-bc',
    infographicUrl: "https://i.imgur.com/YourMonteCarloInfographic.jpeg",
    relatedArticles: [
      "monte-carlo-simulation-financial-modeling",
      "risk-management-monte-carlo-methods",
    ]
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}