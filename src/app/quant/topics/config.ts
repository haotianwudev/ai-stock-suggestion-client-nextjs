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
      "monte-carlo-advanced-stochastic-modeling-derivatives-cva",
      "convergence-analysis-quantitative-finance-measure-theory",
      "convergence-quant-modeling",
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
          text: "Application of Convergence",
          url: "https://www.sophie-ai-finance.com/articles/convergence-analysis-quantitative-finance-measure-theory",
          videoUrl: "https://youtu.be/p38CVckTJqU",
          visualGuideUrl: "https://i.imgur.com/4ZQR4Ri.jpeg",
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
      "ito-lemma",
      "stochastic-calculus-finance-itos-lemma-comprehensive-treatise",
      "structured-notes",
      "architecture-structured-notes-comprehensive-investors-guide",
      "monte-carlo-simulation-3",
      "monte-carlo-advanced-stochastic-modeling-derivatives-cva",
      "black-scholes-option-pricing",
      "black-scholes-analytics-laboratory-axioms-option-pricing",
      "structured-finance-2026-rmbs-cmbs-abs-pricing-models",
      "abs-cmbs-rmbs",
      "autocallable-snowball-notes",
      "autocallable-strategy-engineered-yield-sideways-markets",
      "solution-beyond-black-scholes",
      "beyond-black-scholes",
      "option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
      "volatility-model-evolution-svi-dupire-heston",
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
          text: "Structured Products",
          url: "https://www.sophie-ai-finance.com/articles/structured-finance-2026-rmbs-cmbs-abs-pricing-models",
          visualGuideUrl: "https://i.imgur.com/I51V5fc.jpeg",
          videoUrl: "https://youtu.be/vpiIPto8Mao",
        },
        {
          text: "Autocallable & Snowball Notes",
          videoUrl: "https://youtu.be/Y2zHP9umJXo",
          url: "https://www.sophie-ai-finance.com/articles/autocallable-strategy-engineered-yield-sideways-markets",
          visualGuideUrl: "https://i.imgur.com/4Fy8XfA.jpeg",
        },
        {
          text: "Monte Carlo Simulation for Derivative Pricing and Simulation Models",
          url: "https://www.sophie-ai-finance.com/articles/monte-carlo-advanced-stochastic-modeling-derivatives-cva",
          videoUrl: "https://youtu.be/nBAnWHAzD6I",
          visualGuideUrl: "https://i.imgur.com/K3gkRdn.jpeg",
        },
        {
          text: "Stochastic Calculus and Ito's Lemma",
          videoUrl: "https://youtu.be/3-RdnIsr3f4",
          url: "https://www.sophie-ai-finance.com/articles/stochastic-calculus-finance-itos-lemma-comprehensive-treatise",
          visualGuideUrl: "https://i.imgur.com/Gmd3y5O.jpeg",
        },
        {
          text: "Pricing Models with closed form solutions",
          videoUrl: "https://youtu.be/zS43HPjsDtc",
          url: "https://www.sophie-ai-finance.com/articles/beyond-black-scholes",
          visualGuideUrl: "https://i.imgur.com/yjdtBGR.jpeg",
        },
        {
          text: "Option Volatility Modeling: SVI, Dupire and Heston",
          url: "https://www.sophie-ai-finance.com/articles/option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
          videoUrl: "https://youtu.be/EjaO4UaVLJA",
          visualGuideUrl: "https://i.imgur.com/UAZud6k.jpeg",
        },
      ]
    }
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}