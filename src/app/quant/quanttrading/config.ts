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
      "smart-beta",
      "smart-beta-systematic-personal-investing-strategies",
    ],
    studyGuide: {
      items: [
        {
          text: "Smart Beta & Systematic Personal Investing",
          url: "https://www.sophie-ai-finance.com/articles/smart-beta-systematic-personal-investing-strategies",
          videoUrl: 'https://youtu.be/xZY-O9-4AUs',
          visualGuideUrl: "https://i.imgur.com/CWJK4x1.jpeg",
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
      "foundational-assumptions-machine-learning-quantitative-trading",
      "ml-assumption",
    ],
    studyGuide: {
      items: [
        {
          text: "Deep Learning Evolution in Quant Trading",
          url: "https://www.sophie-ai-finance.com/articles/evolution-deep-learning-quantitative-trading-mlps-transformers",
          videoUrl: "https://youtu.be/s0Z3pl8DFDA",
          visualGuideUrl: "https://i.imgur.com/8ZF0tTX.jpeg",
        },
        {
          text: "Assumptions of Machine Learning in Quantitative Trading",
          url: "https://www.sophie-ai-finance.com/articles/foundational-assumptions-machine-learning-quantitative-trading",
          videoUrl: "https://youtu.be/pR821HLbl3c",
          visualGuideUrl: "https://i.imgur.com/Yq4MVgM.jpeg",
        },
        
      ]
    }
  },

  'backtest': {
    id: 'backtest',
    title: 'Backtesting & Performance Analysis',
    description: 'Master the art of strategy validation through rigorous backtesting. Learn performance metrics, risk assessment, and how to avoid common pitfalls in quantitative strategy evaluation.',
    videoUrl: 'https://youtu.be/WBUxNZZzwnY',
    infographicUrl: 'https://i.imgur.com/wLwP2HW.jpeg',
    relatedArticles: [
      "strategy-performance",
      "measuring-immeasurable-hedge-fund-performance-metrics",
      "definitive-backtrader-cheatsheet-guide",
    ],
    studyGuide: {
      items: [
        {
          text: "Measuring the Immeasurable: Hedge Fund Performance Metrics",
          url: "https://www.sophie-ai-finance.com/articles/measuring-immeasurable-hedge-fund-performance-metrics",
          videoUrl: "https://youtu.be/WBUxNZZzwnY",
          visualGuideUrl: "https://i.imgur.com/wLwP2HW.jpeg",
        },
        {
          text: "Backtrader Cheatsheet",
          url: "https://www.sophie-ai-finance.com/articles/definitive-backtrader-cheatsheet-guide",
          visualGuideUrl: "https://i.imgur.com/hHbVXLF.jpeg",
        },
      ]
    }
  },

  'trading-system': {
    id: 'trading-system',
    title: 'Trading System Architecture',
    description: 'Explore the complete anatomy of quantitative trading systems. From alpha discovery through machine learning to automated execution, understand how modern quant funds operate end-to-end.',
    videoUrl: 'https://youtu.be/QQjvEWV9-WQ',
    infographicUrl: 'https://i.imgur.com/rUsDCw7.jpeg',
    relatedArticles: [
      "hedge-fund-workflow",
      "anatomy-quant-fund-alpha-discovery-automated-execution",
    ],
    studyGuide: {
      items: [
        {
          text: "The Anatomy of a Quant Fund: From Alpha Discovery to Automated Execution",
          url: "https://sophie-ai-finance.com/articles/anatomy-quant-fund-alpha-discovery-automated-execution",
          videoUrl: "https://youtu.be/QQjvEWV9-WQ",
          visualGuideUrl: "https://i.imgur.com/rUsDCw7.jpeg",
        },
      ]
    }
  }
};

export function getQuantTopicConfig(topicId: string): QuantTopicConfig | null {
  return quantTopicsConfig[topicId] || null;
}