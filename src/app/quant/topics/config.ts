import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface TopicConfig extends BaseConfig {}

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
    ],
    studyGuide: {
      title: "Study Guide",
      items: [
        {
          text: "Monte Carlo Simulation Overview",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-simulation-quantitative-finance-stochastic-modeling",
          videoUrl: "https://youtu.be/5gA1ifx7wPg",
          visualGuideUrl: "https://i.imgur.com/vGkVKOa.jpeg",
          type: "article"
        },
        {
          text: "Monte Carlo Simulation for Trading Robustness",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-robustness-protocols-stress-testing-systematic-trading",
          videoUrl: "https://youtu.be/sA57KkA-v-Q",
          visualGuideUrl: "https://i.imgur.com/2mKX2vD.jpeg",
          type: "article"
        },
        {
          text: "Monte Carlo Simulation for Derivative Pricing and Simulation Models",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-advanced-stochastic-modeling-derivatives-cva",
          videoUrl: "https://youtu.be/nBAnWHAzD6I",
          visualGuideUrl: "https://i.imgur.com/K3gkRdn.jpeg",
          type: "article"
        },
        {
          text: "Portfolio Monte Carlo Simulation Tools",
          url: "https://www.portfoliovisualizer.com/monte-carlo-simulation",
          type: "external"
        }
      ]
    }
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}