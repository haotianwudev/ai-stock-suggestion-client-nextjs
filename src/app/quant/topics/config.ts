import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface TopicConfig extends BaseConfig {}

export const topicsConfig: Record<string, TopicConfig> = {
  "monte-carlo": {
    id: "monte-carlo",
    title: "Monte Carlo Simulation",
    description: "Master Monte Carlo methods for financial modeling, risk assessment, and portfolio optimization. Learn to simulate complex financial scenarios and price derivatives using probabilistic approaches.",
    primaryArticleSlug: "monte-carlo-simulation-quantitative-finance-stochastic-modeling",
    studyGuide: {
      items: [
        {
          text: "Monte Carlo Simulation Overview",
          articleSlug: "monte-carlo-simulation-quantitative-finance-stochastic-modeling",
        },
        {
          text: "Monte Carlo Simulation for Trading Robustness",
          articleSlug: "monte-carlo-robustness-protocols-stress-testing-systematic-trading",
        },
        {
          text: "Monte Carlo Simulation for Derivative Pricing and Simulation Models",
          articleSlug: "monte-carlo-advanced-stochastic-modeling-derivatives-cva",
        },
        {
          text: "Application of Convergence",
          articleSlug: "convergence-analysis-quantitative-finance-measure-theory",
        },
        {
          text: "Portfolio Monte Carlo Simulation Tools",
          url: "https://www.portfoliovisualizer.com/monte-carlo-simulation",
        },
      ]
    }
  },

  "statistical-analysis": {
    id: "statistical-analysis",
    title: "Statistical Analysis",
    description: "Master advanced statistical methods for financial markets including Principal Component Analysis (PCA), factor modeling, and dimensionality reduction. Learn to decode complex market relationships and build robust quantitative models.",
    primaryArticleSlug: "geometry-of-rates-pca-fixed-income-markets",
    studyGuide: {
      items: [
        {
          text: "The Geometry of Rates: Principal Component Analysis in Fixed Income",
          articleSlug: "geometry-of-rates-pca-fixed-income-markets",
        },
        {
          text: "StatQuest: PCA",
          url: "https://youtu.be/FgakZw6K1QQ",
          videoUrl: "https://youtu.be/FgakZw6K1QQ",
        },
        {
          text: "Correlation Matrix Analysis Tools",
          url: "https://www.portfoliovisualizer.com/factor-analysis",
        },
        {
          text: "Python PCA Implementation Guide",
          url: "https://scikit-learn.org/stable/modules/decomposition.html#pca",
        },
        {
          text: "Decoding the Bond Term Premium",
          articleSlug: "bond-term-premium-fixed-income-dynamics-pricing-models",
        },
        {
          text: "Advanced Dynamics of Correlation in Quantitative Finance",
          articleSlug: "advanced-dynamics-correlation-quantitative-finance",
        },
        {
          text: "Conformal Prediction for Portfolio Risk: Beyond VaR",
          articleSlug: "conformal-prediction-portfolio-risk-var",
        },
      ]
    }
  },

  "derivatives-pricing": {
    id: "derivatives-pricing",
    title: "Derivatives Pricing",
    description: "Master the mathematical foundations of derivatives pricing including Black-Scholes models, structured products, and complex financial instruments. Learn to value options, bonds, and hybrid securities using advanced quantitative methods.",
    primaryArticleSlug: "black-scholes-analytics-laboratory-axioms-option-pricing",
    studyGuide: {
      items: [
        {
          text: "Black Scholes Model and Risk Neutral Pricing",
          articleSlug: "black-scholes-analytics-laboratory-axioms-option-pricing",
        },
        {
          text: "Structured Notes",
          articleSlug: "architecture-structured-notes-comprehensive-investors-guide",
        },
        {
          text: "Structured Products",
          articleSlug: "structured-finance-2026-rmbs-cmbs-abs-pricing-models",
        },
        {
          text: "Autocallable & Snowball Notes",
          articleSlug: "autocallable-strategy-engineered-yield-sideways-markets",
        },
        {
          text: "Monte Carlo Simulation for Derivative Pricing and Simulation Models",
          articleSlug: "monte-carlo-advanced-stochastic-modeling-derivatives-cva",
        },
        {
          text: "Stochastic Calculus and Ito's Lemma",
          articleSlug: "stochastic-calculus-finance-itos-lemma-comprehensive-treatise",
        },
        {
          text: "Pricing Models with closed form solutions",
          articleSlug: "beyond-black-scholes",
        },
        {
          text: "Option Volatility Modeling: SVI, Dupire and Heston",
          articleSlug: "option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
        },
        {
          text: "Sticky Strike vs. Sticky Delta: The Hidden Dynamics of the Volatility Surface",
          articleSlug: "sticky-strike-vs-sticky-delta-volatility-surface-dynamics",
        },
        {
          text: "Unpacking CDS: A Granular Deep-Dive into Credit Default Swaps",
          articleSlug: "unpacking-cds-granular-deep-dive-credit-default-swaps",
        },
        {
          text: "Optimal Early Exercise of American Call Options on Dividend-Paying Stocks",
          articleSlug: "optimal-early-exercise-american-call-options-dividend-stocks",
        },
      ]
    }
  },
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}
