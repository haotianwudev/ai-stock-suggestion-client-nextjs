import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface QuantTopicConfig extends BaseConfig {}

export const quantTopicsConfig: Record<string, QuantTopicConfig> = {
  'systematic-strategies': {
    id: 'systematic-strategies',
    title: 'Systematic Trading Strategies',
    description: 'Learn rule-based trading approaches, momentum strategies, mean reversion, and systematic portfolio construction methods.',
    //videoUrl: 'https://youtu.be/L0aVoPLqcFw',
    //infographicUrl: 'https://i.imgur.com/YourSystematicStrategiesInfographic.jpeg',
    relatedArticles: [
      "systematic-trading-strategies-quantitative-approach",
      "quantitative-momentum-strategies",
      "mean-reversion-trading-strategies",
    ],
    studyGuide: {
      title: "Study Guide",
      items: [
        {
          text: "Systematic Trading Strategies Overview",
          url: "https://www.sophie-ai-finance.com/articles/systematic-trading-strategies-quantitative-approach"
        },
        {
          text: "[Youtube] Systematic Trading Fundamentals",
          url: "https://youtu.be/L0aVoPLqcFw"
        },
        {
          text: "Quantitative Momentum Strategies",
          url: "https://www.sophie-ai-finance.com/articles/quantitative-momentum-strategies"
        },
        {
          text: "Mean Reversion Trading Strategies",
          url: "https://www.sophie-ai-finance.com/articles/mean-reversion-trading-strategies"
        },
        {
          text: "Factor Investing and Smart Beta",
          url: "https://www.investopedia.com/terms/f/factor-investing.asp"
        },
        {
          text: "Statistical Arbitrage Techniques",
          url: "https://www.quantstart.com/articles/statistical-arbitrage/"
        }
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
          text: "[Youtube] Deep Learning in Quant Trading",
          url: "https://youtu.be/s0Z3pl8DFDA"
        },
        {
          text: "Deep Learning in Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/evolution-deep-learning-quantitative-trading-mlps-transformers"
        },
      ]
    }
  }
};

export function getQuantTopicConfig(topicId: string): QuantTopicConfig | null {
  return quantTopicsConfig[topicId] || null;
}