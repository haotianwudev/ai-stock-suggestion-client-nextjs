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

  "ai-in-quant": {
    id: "ai-in-quant",
    title: "AI in Quant",
    description: "Explore how large language models and autonomous AI agents are reshaping quantitative finance — from Retrieval-Augmented Generation and the Model Context Protocol to multi-agent architectures, agentic harnesses, and rigorous agent testing.",
    primaryArticleSlug: "evolution-autonomous-execution-function-calling-agentic-harnesses",
    studyGuide: {
      items: [
        {
          text: "The Evolution of Autonomous Execution: Function Calling to Agentic Harnesses",
          articleSlug: "evolution-autonomous-execution-function-calling-agentic-harnesses",
        },
        {
          text: "The Architecture of Harness Engineering",
          articleSlug: "autonomous-ai-agents-architecture-harness-engineering",
        },
        {
          text: "Model Context Protocol in Quantitative Finance",
          articleSlug: "model-context-protocol-quantitative-finance",
        },
        {
          text: "Agent-to-Agent Protocols in Multi-Agent Financial Systems",
          articleSlug: "architecture-interoperability-agent-protocols-financial-systems",
        },
        {
          text: "The Evolution of RAG in Quantitative Finance",
          articleSlug: "architecting-alpha-rag-evolution-quantitative-finance",
        },
        {
          text: "Advanced RAG and Context Engineering",
          articleSlug: "architectures-intelligence-advanced-rag-context-engineering",
        },
        {
          text: "RAG Systems with Metadata-Driven Filtering",
          articleSlug: "rag-metadata-filtering-advanced-architectures",
        },
        {
          text: "Database Agents with MCP and LangChain",
          articleSlug: "database-agents-mcp-langchain",
        },
        {
          text: "Agentic Retrieval Systems with LangChain",
          articleSlug: "architecting-agentic-retrieval-systems-langchain-proprietary-wikis",
        },
        {
          text: "Architecting Autonomous Quantitative Agents",
          articleSlug: "architecting-autonomous-quantitative-agents-langchain-ecosystem",
        },
        {
          text: "Agentic AI in Wealth Management",
          articleSlug: "architecting-agentic-ai-quantitative-finance-wealth-management",
        },
        {
          text: "Building Interactive Financial Copilots",
          articleSlug: "building-interactive-financial-copilots-generative-ui-state-synchronization",
        },
        {
          text: "Architecting AI Agent Testing",
          articleSlug: "architecting-ai-agent-testing-quantitative-finance",
        },
        {
          text: "The Primacy of Domain Knowledge",
          articleSlug: "primacy-domain-knowledge-quantitative-finance",
        },
      ]
    }
  },

  "risk-management": {
    id: "risk-management",
    title: "Risk Management",
    description: "Master the quantitative frameworks behind portfolio and systemic risk — factor risk models, correlation dynamics, tail risk, counterparty credit exposure, and the structural vulnerabilities that turn localized shocks into market-wide contagion.",
    primaryArticleSlug: "risk-prism-architecture-modern-factor-models",
    studyGuide: {
      items: [
        {
          text: "The Risk Prism: Architecture of Modern Factor Models",
          articleSlug: "risk-prism-architecture-modern-factor-models",
        },
        {
          text: "Conformal Prediction for Portfolio Risk: Beyond VaR",
          articleSlug: "conformal-prediction-portfolio-risk-var",
        },
        {
          text: "Advanced Dynamics of Correlation in Quantitative Finance",
          articleSlug: "advanced-dynamics-correlation-quantitative-finance",
        },
        {
          text: "Quantitative Analysis of Tail Risk: CBOE SKEW",
          articleSlug: "quantitative-analysis-tail-risk-cboe-skew-nations-skewdex",
        },
        {
          text: "Unpacking CDS: A Granular Deep-Dive into Credit Default Swaps",
          articleSlug: "unpacking-cds-granular-deep-dive-credit-default-swaps",
        },
        {
          text: "The Infrastructure of Counterparty Credit Risk",
          articleSlug: "infrastructure-counterparty-credit-risk-margin-wcl-excess-shortfall-release",
        },
        {
          text: "The Repo Market & Dollar Funding: Systemic Risks",
          articleSlug: "repo-market-dollar-funding-mechanics-strategies-systemic-risks",
        },
        {
          text: "The Architecture of Private Credit: Emerging Vulnerabilities",
          articleSlug: "architecture-private-credit-structural-mechanics-vulnerabilities",
        },
        {
          text: "Form 13F Disclosures: Copycat Economics and Systemic Risk",
          articleSlug: "hidden-mechanics-form-13f-disclosures-microstructure-copycat-economics-systemic-risk",
        },
        {
          text: "Example: Systemic Fragility — the 2026 South Korean Equity Crisis",
          articleSlug: "systemic-fragility-quantitative-contagion-2026-korean-crisis",
        },
        {
          text: "Example: The June 2026 Cross-Asset Contagion",
          articleSlug: "june-2026-cross-asset-contagion",
        },
        {
          text: "Example: SpaceX Mega-IPO Systemic Risk Analysis",
          articleSlug: "spacex-public-market-integration-systemic-risk-analysis",
        },
      ]
    }
  },
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}
