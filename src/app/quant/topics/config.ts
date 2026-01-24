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
      items: [
        {
          text: "Monte Carlo Simulation Overview",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-simulation-quantitative-finance-stochastic-modeling",
          videoUrl: "https://youtu.be/5gA1ifx7wPg",
          visualGuideUrl: "https://i.imgur.com/vGkVKOa.jpeg",
        },
        {
          text: "Monte Carlo Simulation for Trading Robustness",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-robustness-protocols-stress-testing-systematic-trading",
          videoUrl: "https://youtu.be/sA57KkA-v-Q",
          visualGuideUrl: "https://i.imgur.com/2mKX2vD.jpeg",
        },
        {
          text: "Monte Carlo Simulation for Derivative Pricing and Simulation Models",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-advanced-stochastic-modeling-derivatives-cva",
          videoUrl: "https://youtu.be/nBAnWHAzD6I",
          visualGuideUrl: "https://i.imgur.com/K3gkRdn.jpeg",
        },
        {
          text: "Portfolio Monte Carlo Simulation Tools",
          url: "https://www.portfoliovisualizer.com/monte-carlo-simulation",
        }
      ]
    }
  },
  'statistical-analysis': {
    id: 'statistical-analysis',
    title: 'Statistical Analysis',
    description: 'Master advanced statistical methods for financial markets including Principal Component Analysis (PCA), factor modeling, and dimensionality reduction. Learn to decode complex market relationships and build robust quantitative models.',
    videoUrl: 'https://youtu.be/WL_YzTImNzs', // PCA Explained video as placeholder
    infographicUrl: "https://i.imgur.com/XEfr0iF.jpeg",
    relatedArticles: [
      "pca-yield-curve",
      "geometry-of-rates-pca-fixed-income-markets"
    ],
    studyGuide: {
      items: [
        {
          text: "The Geometry of Rates: Principal Component Analysis in Fixed Income",
          url: "https://www.sophie-ai-finance.com/articles/geometry-of-rates-pca-fixed-income-markets",
          visualGuideUrl: "https://i.imgur.com/XEfr0iF.jpeg",
          videoUrl: "https://youtu.be/WL_YzTImNzs"
        },
        {
          text: "StatQuest: PCA",
          url: "https://youtu.be/FgakZw6K1QQ",
          videoUrl: "https://youtu.be/FgakZw6K1QQ",
        },
        {
          text: "Correlation Matrix Analysis Tools",
          url: "https://www.portfoliovisualizer.com/factor-analysis"
        },
        {
          text: "Python PCA Implementation Guide",
          url: "https://scikit-learn.org/stable/modules/decomposition.html#pca"
        },
      ]
    }
  },
  'derivatives-pricing': {
    id: 'derivatives-pricing',
    title: 'Derivatives Pricing',
    description: 'Master the mathematical foundations of derivatives pricing including Black-Scholes models, structured products, and complex financial instruments. Learn to value options, bonds, and hybrid securities using advanced quantitative methods.',
    videoUrl: 'https://youtu.be/BfU9H60nepI',
    infographicUrl: "https://i.imgur.com/VVQWBaJ.jpeg",
    relatedArticles: [
      "stochastic-calculus-finance-itos-lemma-comprehensive-treatise",
      "structured-notes",
      "architecture-structured-notes-comprehensive-investors-guide",
      "monte-carlo-simulation-3",
      "monte-carlo-advanced-stochastic-modeling-derivatives-cva",
      "black-scholes-option-pricing",
      "black-scholes-analytics-laboratory-axioms-option-pricing",
    ],
    studyGuide: {
      items: [
        {
          text: "Black Scholes Model and Risk Neutral Pricing",
          url: "https://www.sophie-ai-finance.com/articles/black-scholes-analytics-laboratory-axioms-option-pricing",
          videoUrl: "https://youtu.be/BfU9H60nepI",
          visualGuideUrl: "https://i.imgur.com/VVQWBaJ.jpeg"
        },
        {
          text: "Structured Notes",
          url: "https://www.sophie-ai-finance.com/articles/architecture-structured-notes-comprehensive-investors-guide",
          visualGuideUrl: "https://i.imgur.com/kmqdUcW.jpeg",
          videoUrl: "https://youtu.be/eK2moYsTJrE"
        },
        {
          text: "Monte Carlo Simulation for Derivative Pricing and Simulation Models",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-advanced-stochastic-modeling-derivatives-cva",
          videoUrl: "https://youtu.be/nBAnWHAzD6I",
          visualGuideUrl: "https://i.imgur.com/K3gkRdn.jpeg",
        },
        {
          text: "Stochastic Calculus and Ito's Lemma",
          url: "https://www.sophie-ai-finance.com/articles/stochastic-calculus-finance-itos-lemma-comprehensive-treatise",
          visualGuideUrl: "https://i.imgur.com/Gmd3y5O.jpeg",
        },
      ]
    }
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}