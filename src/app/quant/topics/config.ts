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
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-simulation-quantitative-finance-stochastic-modeling"
        },
        {
          text: "[Youtube] Monte Carlo Simulation in Risk Management",
          url: "https://youtu.be/5gA1ifx7wPg"
        },
        {
          text: "Monte Carlo Simulation for Trading Robustness",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-robustness-protocols-stress-testing-systematic-trading"
        },
        {
          text: "[Youtube] Monte Carlo Simulation for Quant Trading",
          url: "https://youtu.be/sA57KkA-v-Q"
        },
        {
          text: "Monte Carlo Simulation for Derivative Pricing and Simulation Models",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-advanced-stochastic-modeling-derivatives-cva"
        },
        {
          text: "[Youtube] Monte Carlo Simulation in Derivative Pricing and CVA",
          url: "https://youtu.be/nBAnWHAzD6I"
        },
        {
          text: "Portfolio Monte Carlo Simulation Tools",
          url: "https://www.portfoliovisualizer.com/monte-carlo-simulation"
        }
      ]
    }
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}