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
    //videoUrl: 'https://youtu.be/aViyh1n08v4',
    //infographicUrl: "https://i.imgur.com/YourMLInfographic.jpeg",
    relatedArticles: [
      "ai-powered-trading-algorithms-deep-learning",
      "machine-learning-portfolio-optimization",
      "neural-networks-financial-prediction",
    ],
    studyGuide: {
      title: "Study Guide",
      items: [
        {
          text: "AI-Powered Trading Algorithms",
          url: "https://www.sophie-ai-finance.com/articles/ai-powered-trading-algorithms-deep-learning"
        },
        {
          text: "[Youtube] Machine Learning in Finance",
          url: "https://youtu.be/aViyh1n08v4"
        },
        {
          text: "Machine Learning Portfolio Optimization",
          url: "https://www.sophie-ai-finance.com/articles/machine-learning-portfolio-optimization"
        },
        {
          text: "Neural Networks for Financial Prediction",
          url: "https://www.sophie-ai-finance.com/articles/neural-networks-financial-prediction"
        },
        {
          text: "Reinforcement Learning in Trading",
          url: "https://www.quantstart.com/articles/reinforcement-learning-for-trading/"
        },
        {
          text: "Deep Learning for Finance",
          url: "https://www.tensorflow.org/tutorials/structured_data/time_series"
        },
        {
          text: "Sentiment Analysis for Trading",
          url: "https://www.investopedia.com/articles/active-trading/041814/four-most-commonlyused-indicators-trend-trading.asp"
        }
      ]
    }
  }
};

export function getQuantTopicConfig(topicId: string): QuantTopicConfig | null {
  return quantTopicsConfig[topicId] || null;
}