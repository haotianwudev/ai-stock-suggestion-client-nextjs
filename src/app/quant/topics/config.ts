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
          text: "Monte Carlo for Trading Robustness",
          articleSlug: "monte-carlo-robustness-protocols-stress-testing-systematic-trading",
        },
        {
          text: "Monte Carlo for Derivative Pricing",
          articleSlug: "monte-carlo-advanced-stochastic-modeling-derivatives-cva",
        },
        {
          text: "Application of Convergence",
          articleSlug: "convergence-analysis-quantitative-finance-measure-theory",
        },
        {
          text: "Monte Carlo Simulation Tools",
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
          text: "The Geometry of Rates: PCA in Fixed Income",
          articleSlug: "geometry-of-rates-pca-fixed-income-markets",
        },
        {
          text: "StatQuest: PCA",
          url: "https://youtu.be/FgakZw6K1QQ",
          videoUrl: "https://youtu.be/FgakZw6K1QQ",
        },
        {
          text: "Python PCA Guide",
          url: "https://scikit-learn.org/stable/modules/decomposition.html#pca",
        },
        {
          text: "Advanced Dynamics of Correlation",
          articleSlug: "advanced-dynamics-correlation-quantitative-finance",
        },
        {
          text: "Correlation Matrix Tools",
          url: "https://www.portfoliovisualizer.com/factor-analysis",
        },
        {
          text: "Decoding the Bond Term Premium",
          articleSlug: "bond-term-premium-fixed-income-dynamics-pricing-models",
        },
        {
          text: "Conformal Prediction: Beyond VaR",
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
          text: "Black-Scholes Model",
          articleSlug: "black-scholes-analytics-laboratory-axioms-option-pricing",
        },
        {
          text: "Stochastic Calculus and Ito's Lemma",
          articleSlug: "stochastic-calculus-finance-itos-lemma-comprehensive-treatise",
        },
        {
          text: "Closed-Form Pricing Models",
          articleSlug: "beyond-black-scholes",
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
          text: "Monte Carlo for Derivative Pricing",
          articleSlug: "monte-carlo-advanced-stochastic-modeling-derivatives-cva",
        },
        {
          text: "SVI, Dupire & Heston Models",
          articleSlug: "option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
        },
        {
          text: "Sticky Strike vs. Sticky Delta",
          articleSlug: "sticky-strike-vs-sticky-delta-volatility-surface-dynamics",
        },
        {
          text: "Unpacking CDS: Credit Default Swaps",
          articleSlug: "unpacking-cds-granular-deep-dive-credit-default-swaps",
        },
        {
          text: "Optimal Early Exercise of American Calls",
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
          text: "The Evolution of Autonomous Execution",
          articleSlug: "evolution-autonomous-execution-function-calling-agentic-harnesses",
        },
        {
          text: "Harness Engineering Architecture",
          articleSlug: "autonomous-ai-agents-architecture-harness-engineering",
        },
        {
          text: "Model Context Protocol",
          articleSlug: "model-context-protocol-quantitative-finance",
        },
        {
          text: "Agent-to-Agent Protocols in Finance",
          articleSlug: "architecture-interoperability-agent-protocols-financial-systems",
        },
        {
          text: "The Evolution of RAG",
          articleSlug: "architecting-alpha-rag-evolution-quantitative-finance",
        },
        {
          text: "Advanced RAG and Context Engineering",
          articleSlug: "architectures-intelligence-advanced-rag-context-engineering",
        },
        {
          text: "RAG with Metadata Filtering",
          articleSlug: "rag-metadata-filtering-advanced-architectures",
        },
        {
          text: "Database Agents with MCP and LangChain",
          articleSlug: "database-agents-mcp-langchain",
        },
        {
          text: "Agentic Retrieval with LangChain",
          articleSlug: "architecting-agentic-retrieval-systems-langchain-proprietary-wikis",
        },
        {
          text: "Architecting Autonomous Agents",
          articleSlug: "architecting-autonomous-quantitative-agents-langchain-ecosystem",
        },
        {
          text: "Agentic AI in Wealth Management",
          articleSlug: "architecting-agentic-ai-quantitative-finance-wealth-management",
        },
        {
          text: "Interactive Financial Copilots",
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
          text: "The Risk Prism: Factor Models",
          articleSlug: "risk-prism-architecture-modern-factor-models",
        },
        {
          text: "Conformal Prediction: Beyond VaR",
          articleSlug: "conformal-prediction-portfolio-risk-var",
        },
        {
          text: "Advanced Dynamics of Correlation",
          articleSlug: "advanced-dynamics-correlation-quantitative-finance",
        },
        {
          text: "Tail Risk: CBOE SKEW",
          articleSlug: "quantitative-analysis-tail-risk-cboe-skew-nations-skewdex",
        },
        {
          text: "Unpacking CDS: Credit Default Swaps",
          articleSlug: "unpacking-cds-granular-deep-dive-credit-default-swaps",
        },
        {
          text: "Counterparty Credit Risk",
          articleSlug: "infrastructure-counterparty-credit-risk-margin-wcl-excess-shortfall-release",
        },
        {
          text: "The Repo Market & Dollar Funding",
          articleSlug: "repo-market-dollar-funding-mechanics-strategies-systemic-risks",
        },
        {
          text: "The Architecture of Private Credit",
          articleSlug: "architecture-private-credit-structural-mechanics-vulnerabilities",
        },
        {
          text: "Form 13F Disclosures and Systemic Risk",
          articleSlug: "hidden-mechanics-form-13f-disclosures-microstructure-copycat-economics-systemic-risk",
        },
        {
          text: "Example: The 2026 South Korean Equity Crisis",
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
