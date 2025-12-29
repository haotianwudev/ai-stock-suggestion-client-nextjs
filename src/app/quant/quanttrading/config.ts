import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface QuantTopicConfig extends BaseConfig {}

export const quantTopicsConfig: Record<string, QuantTopicConfig> = {
  'systematic-strategies': {
    id: 'systematic-strategies',
    title: 'Systematic Trading Strategies',
    description: 'Learn rule-based trading approaches, momentum strategies, mean reversion, smart beta factor investing, and systematic portfolio construction methods.',
    videoUrl: 'https://youtu.be/xZY-O9-4AUs',
    infographicUrl: 'https://i.imgur.com/1HBWYfN.jpeg',
    relatedArticles: [
      "smart-beta-systematic-personal-investing-strategies",
    ],
    studyGuide: {
      title: "Study Guide",
      items: [
        {
          text: "Smart Beta & Systematic Personal Investing",
          url: "https://www.sophie-ai-finance.com/articles/smart-beta-systematic-personal-investing-strategies"
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
    ],
    studyGuide: {
      title: "Study Guide",
      items: [
        {
          text: "[Youtube] Deep Learning Evolution in Quant Trading",
          url: "https://youtu.be/s0Z3pl8DFDA"
        },
        {
          text: "Deep Learning Evolution in Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/evolution-deep-learning-quantitative-trading-mlps-transformers"
        },
      ]
    }
  }
};

export function getQuantTopicConfig(topicId: string): QuantTopicConfig | null {
  return quantTopicsConfig[topicId] || null;
}