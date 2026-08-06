import { ArticleLabel } from "@/data/articles/types";

export interface WikiEntry {
  path: string; // e.g. "option-strategy/gex"
  title: string;
  articleSlug: string;
  date: string; // ISO date
  labels?: ArticleLabel[];
  summary: string;
}

// Newest first. New entries are prepended here by the sophie-deep-research-article skill.
export const wikiEntries: WikiEntry[] = [
  {
    path: "quant/mechanics-of-alpha-raw-data-realized-returns",
    title: "The Mechanics of Alpha",
    articleSlug: "mechanics-of-alpha-raw-data-realized-returns",
    date: "2026-04-01",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive tutorial on factor engineering, signal processing, and performance attribution for quantitative trading.",
  },
  {
    path: "quant/navigating-bull-to-bear-regime-shift-quantitative-signals",
    title: "Navigating the Bull-to-Bear Regime Shift",
    articleSlug: "navigating-bull-to-bear-regime-shift-quantitative-signals",
    date: "2026-04-03",
    labels: [ArticleLabel.QUANT],
    summary:
      "A deep-dive tutorial into quantitative signals, systematic factor rotation, and convexity monetization during transitional market phases.",
  },
  {
    path: "quant/unified-theory-market-dynamics-order-flow-impact-volatility",
    title: "A Unified Theory of Market Dynamics",
    articleSlug: "unified-theory-market-dynamics-order-flow-impact-volatility",
    date: "2026-04-05",
    labels: [ArticleLabel.QUANT],
    summary:
      "Exploring the microstructural foundations of order flow, market impact, and volatility through a unified mathematical framework.",
  },
  {
    path: "quant/dark-index-dix-understanding-short-is-long-market-microstructure",
    title: "The Dark Index (DIX): Understanding Why Short is Long",
    articleSlug: "dark-index-dix-understanding-short-is-long-market-microstructure",
    date: "2026-04-07",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive deep dive into the Dark Index (DIX) and the counterintuitive 'Short is Long' hypothesis.",
  },
  {
    path: "quant/mechanics-esg-investing-technical-guide",
    title: "The Mechanics of ESG Investing: A Technical Guide",
    articleSlug: "mechanics-esg-investing-technical-guide",
    date: "2026-04-09",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive technical guide to ESG investing frameworks, regulations, and valuation models.",
  },
  {
    path: "quant/option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
    title: "Option Volatility Modeling: Calibration Dynamics",
    articleSlug: "option-volatility-modeling-calibration-dynamics-mathematical-frameworks",
    date: "2026-04-11",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive masterclass exploring the evolution from Black-Scholes to modern volatility surfaces.",
  },
  {
    path: "quant/supply-chain",
    title: "Theta.md: Cross-Industry Supply Chain Signal Analysis",
    articleSlug: "supply-chain",
    date: "2026-04-13",
    labels: [ArticleLabel.QUANT],
    summary:
      "An independent quant platform tackling isolating genuine cross-industry supply chain signals from market noise using rigorous multi-factor validation.",
  },
  {
    path: "quant/architecting-alpha-rag-evolution-quantitative-finance",
    title: "Architecting Alpha: The Evolution of RAG in Quantitative Finance",
    articleSlug: "architecting-alpha-rag-evolution-quantitative-finance",
    date: "2026-04-15",
    labels: [ArticleLabel.AI_ML],
    summary:
      "A deep dive into why Retrieval-Augmented Generation changed capital markets, where it catastrophically fails, and the autonomous Agentic future.",
  },
  {
    path: "quant/advanced-option-rolling-mechanics",
    title: "Advanced Option Rolling Mechanics",
    articleSlug: "advanced-option-rolling-mechanics",
    date: "2026-04-17",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive masterclass on option rolling mechanics, P&L accounting, systematic triggers, and volatility surface dynamics.",
  },
  {
    path: "quant/structural-dynamics-us-dollar-hegemony-dedollarization-macro-strategy",
    title: "Structural Dynamics of the U.S. Dollar",
    articleSlug: "structural-dynamics-us-dollar-hegemony-dedollarization-macro-strategy",
    date: "2026-04-21",
    labels: [ArticleLabel.MARCO, ArticleLabel.QUANT],
    summary:
      "An institutional framework exploring conflicting paradigms of dollar hegemony, quantitative forecasting, and global macro trade execution.",
  },
  {
    path: "quant/black-litterman-model-comprehensive-guide-portfolio-optimization",
    title: "The Black-Litterman Model",
    articleSlug: "black-litterman-model-comprehensive-guide-portfolio-optimization",
    date: "2026-04-23",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive guide to bridging the gap between mathematical rigor and human intuition in modern portfolio management.",
  },
  {
    path: "quant/structured-liquidity-hedging-equity-collars-pvsf",
    title: "Structured Liquidity & Hedging",
    articleSlug: "structured-liquidity-hedging-equity-collars-pvsf",
    date: "2026-04-24",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A masterclass on navigating concentrated wealth using Equity Collars and Prepaid Variable Share Forwards (PVSFs).",
  },
  {
    path: "quant/architecting-agentic-ai-quantitative-finance-wealth-management",
    title: "Agentic AI in Quant Finance",
    articleSlug: "architecting-agentic-ai-quantitative-finance-wealth-management",
    date: "2026-04-27",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "Exploring the paradigm shift from foundational LLMs to autonomous agentic systems in quantitative finance.",
  },
  {
    path: "quant/ontology-of-value-financial-data-classification-lifecycle-management",
    title: "The Ontology of Value",
    articleSlug: "ontology-of-value-financial-data-classification-lifecycle-management",
    date: "2026-04-29",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive interactive guide to financial data classification, architecture, and lifecycle management.",
  },
  {
    path: "quant/seagull-spread-options-strategy-architecture",
    title: "The Seagull Spread",
    articleSlug: "seagull-spread-options-strategy-architecture",
    date: "2026-05-02",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive institutional tutorial on the Seagull spread, exploring structural mechanics, Greeks dynamics, and volatility skew arbitrage.",
  },
  {
    path: "quant/integer-optimization-finance-continuous-theory-discrete-execution",
    title: "Integer Optimization in Finance",
    articleSlug: "integer-optimization-finance-continuous-theory-discrete-execution",
    date: "2026-05-04",
    labels: [ArticleLabel.QUANT],
    summary:
      "Bridging the gap between continuous theoretical models and discrete execution through Mixed-Integer Programming.",
  },
  {
    path: "quant/bond-term-premium-fixed-income-dynamics-pricing-models",
    title: "Decoding the Bond Term Premium",
    articleSlug: "bond-term-premium-fixed-income-dynamics-pricing-models",
    date: "2026-05-06",
    labels: [ArticleLabel.QUANT, ArticleLabel.MARCO],
    summary:
      "A comprehensive analysis of fixed income dynamics, pricing models, and portfolio strategy regarding the bond term premium.",
  },
  {
    path: "quant/sticky-strike-vs-sticky-delta-volatility-surface-dynamics",
    title: "Volatility Surface Dynamics",
    articleSlug: "sticky-strike-vs-sticky-delta-volatility-surface-dynamics",
    date: "2026-05-09",
    labels: [ArticleLabel.QUANT],
    summary:
      "Understanding the geometry of market risk, the volatility surface, and the Skew Stickiness Ratio.",
  },
  {
    path: "quant/model-context-protocol-quantitative-finance",
    title: "Model Context Protocol in Quant Finance",
    articleSlug: "model-context-protocol-quantitative-finance",
    date: "2026-05-11",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A comprehensive guide to the Model Context Protocol (MCP), System Architecture, and Interactive Agent Design.",
  },
  {
    path: "quant/unpacking-cds-granular-deep-dive-credit-default-swaps",
    title: "Unpacking CDS: A Granular Deep-Dive",
    articleSlug: "unpacking-cds-granular-deep-dive-credit-default-swaps",
    date: "2026-05-13",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive quantitative analysis of Credit Default Swaps from bilateral insurance mechanics to advanced Greeks.",
  },
  {
    path: "quant/advanced-dynamics-correlation-quantitative-finance",
    title: "Advanced Dynamics of Correlation",
    articleSlug: "advanced-dynamics-correlation-quantitative-finance",
    date: "2026-05-15",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive analysis of correlation as the most mathematically complex parameter in quantitative finance.",
  },
  {
    path: "quant/direct-indexing-tax-loss-harvesting-algorithmic-mechanics",
    title: "Direct Indexing & Tax-Loss Harvesting",
    articleSlug: "direct-indexing-tax-loss-harvesting-algorithmic-mechanics",
    date: "2026-05-18",
    labels: [ArticleLabel.QUANT],
    summary:
      "A deep dive into the algorithmic mechanics of tax-aware portfolio construction, SPX tracking optimization, and factor risk models.",
  },
  {
    path: "quant/alpha-factory-technical-blueprint-quantitative-hedge-funds",
    title: "The Alpha Factory Blueprint",
    articleSlug: "alpha-factory-technical-blueprint-quantitative-hedge-funds",
    date: "2026-05-20",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A comprehensive technical deep-dive into the architecture and systems powering modern quantitative hedge funds.",
  },
  {
    path: "quant/advanced-options-collar-strategies-structural-mechanics-tradeoffs",
    title: "Advanced Options Collar Strategies",
    articleSlug: "advanced-options-collar-strategies-structural-mechanics-tradeoffs",
    date: "2026-05-23",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive masterclass on options collar variants used by institutional portfolio managers.",
  },
  {
    path: "quant/conformal-prediction-portfolio-risk-var",
    title: "Conformal Prediction for Portfolio Risk",
    articleSlug: "conformal-prediction-portfolio-risk-var",
    date: "2026-05-26",
    labels: [ArticleLabel.QUANT],
    summary:
      "A distribution-free, mathematically rigorous alternative to standard VaR models.",
  },
  {
    path: "quant/primacy-domain-knowledge-quantitative-finance",
    title: "The Primacy of Domain Knowledge",
    articleSlug: "primacy-domain-knowledge-quantitative-finance",
    date: "2026-05-29",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "Exploration asserting that deep financial domain expertise and market intuition are indispensable in quantitative finance.",
  },
  {
    path: "quant/architecture-interoperability-agent-protocols-financial-systems",
    title: "The Architecture of Interoperability",
    articleSlug: "architecture-interoperability-agent-protocols-financial-systems",
    date: "2026-06-02",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A comprehensive guide to Agent-to-Agent (A2A) protocols, solving fragmentation, and orchestrating autonomous AI in modern finance.",
  },
  {
    path: "quant/factor-models-machine-learning-risk-alpha-prediction",
    title: "Factor Models in Machine Learning",
    articleSlug: "factor-models-machine-learning-risk-alpha-prediction",
    date: "2026-06-05",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A comprehensive deep dive into the mathematical bridge between risk management and alpha prediction in algorithmic trading systems. From the Fundamental Law of Active Management to conditional factor models.",
  },
  {
    path: "quant/entropy-methods-portfolio-construction",
    title: "Entropy Methods in Portfolio Construction",
    articleSlug: "entropy-methods-portfolio-construction",
    date: "2026-06-08",
    labels: [ArticleLabel.QUANT],
    summary:
      "The historical evolution from rigid mean-variance frameworks to flexible information-theoretic paradigms. Explore the deep intuition of the Entropy Pooling framework and its mapping to the classical Black-Litterman model.",
  },
  {
    path: "quant/autonomous-ai-agents-harness-engineering",
    title: "Autonomous AI Agents: Harness Engineering",
    articleSlug: "autonomous-ai-agents-architecture-harness-engineering",
    date: "2026-06-11",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A detailed architectural overview of Harness Engineering—the operational infrastructure that wraps around non-deterministic LLMs to deploy fault-tolerant, autonomous AI agents in rigorous domains like quantitative finance.",
  },
  {
    path: "stock-analysis/2026-mega-ipo-convergence",
    title: "The 2026 Mega-IPO Convergence",
    articleSlug: "2026-mega-ipo-convergence-market-analysis-systemic-risk",
    date: "2026-06-13",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary:
      "A diagnostic analysis of the unprecedented $4 Trillion tech listing wave in 2026, examining structural market mechanics, valuation excesses, and systemic risks.",
  },
  {
    path: "quant/strategy-decay-mrp",
    title: "Strategy Decay & Factor Fragility",
    articleSlug: "strategy-decay-factor-fragility-regime-aware-portfolio-construction",
    date: "2026-06-16",
    labels: [ArticleLabel.QUANT],
    summary:
      "A quantitative framework for identifying structural vulnerabilities in systematic strategies and building regime-aware portfolios through Minimum Regime Performance (MRP).",
  },
  {
    path: "stock-analysis/alibaba-baba-drawdown-analysis",
    title: "Alibaba (BABA) Quantitative Drawdown Analysis",
    articleSlug: "alibaba-baba-quantitative-analysis-drawdown-factor-exposures",
    date: "2026-06-18",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary:
      "A comprehensive quantitative analysis of Alibaba's severe multi-sigma equity drawdown in June 2026. Explores statistical return modeling, geopolitical risk premiums, market microstructure dynamics, and fundamental factor deterioration.",
  },
  {
    path: "option-strategy/american-call-early-exercise",
    title: "American Call Early Exercise",
    articleSlug: "optimal-early-exercise-american-call-options-dividend-stocks",
    date: "2026-06-20",
    labels: [ArticleLabel.QUANT],
    summary:
      "Understanding when it is mathematically optimal to early exercise an American call option, specifically focusing on the impact of discrete cash dividends and the trade-off between intrinsic and time value.",
  },
  {
    path: "quant/kelly-criterion",
    title: "The Kelly Criterion",
    articleSlug: "kelly-criterion-optimal-position-sizing-information-theory",
    date: "2026-06-23",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive guide to the Kelly Criterion and optimal position sizing. Master information theoretic foundations, the Merton Fraction for continuous markets, fractional Kelly adaptations for institutional portfolio management, and the catastrophic impacts of estimation error and volatility drag.",
  },
  {
    path: "macro/market-crash-mechanics",
    title: "Market Crash Mechanics",
    articleSlug: "anatomy-market-drop-systemic-risk-options-microstructure-crisis-alpha",
    date: "2026-06-26",
    labels: [ArticleLabel.QUANT],
    summary:
      "A deep dive into market crash mechanics, transitioning from institutional warnings and valuation overheating to options microstructure dynamics and volatility feedback effects. It covers how a market drop accelerates through forced liquidations and identifies what assets jump first and fastest during the initial shock and subsequent rebound.",
  },
  {
    path: "macro/cross-asset-contagion",
    title: "Cross-Asset Contagion",
    articleSlug: "june-2026-cross-asset-contagion",
    date: "2026-06-28",
    labels: [ArticleLabel.QUANT, ArticleLabel.MARCO],
    summary:
      "A comprehensive breakdown of macroeconomic catalysts, quantitative deleveraging, and the terminal phase of market overheating. Explore how uncorrelated assets collapsed simultaneously through rigorous structural analysis of Fed policy shifts, geopolitical resolution, and market microstructure vulnerabilities.",
  },
  {
    path: "ai-ml/formulaic-alpha-mining",
    title: "Formulaic Alpha Mining & Deep Search",
    articleSlug: "advancements-formulaic-alpha-mining-deep-search-mechanics",
    date: "2026-08-18",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A comprehensive guide to automated alpha discovery using Deep Reinforcement Learning and Monte Carlo Tree Search. Master formulaic operators, risk-seeking policy gradients, and the Deflated Sharpe Ratio to separate true structural alpha from backtest overfitting.",
  },
  {
    path: "finance101/repo-market",
    title: "The Repo Market & Treasury Basis Trade",
    articleSlug: "repo-market-dollar-funding-mechanics-strategies-systemic-risks",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive guide to the repurchase agreement market, SOFR, and the Treasury basis trade. Master the mechanics of repo financing, aggregate hedge fund leverage, and systemic risks exposed by historical dislocations and the FICC central clearing mandate.",
  },
  {
    path: "finance101/counterparty-credit-risk",
    title: "Counterparty Credit Risk & Margin Mechanics",
    articleSlug: "infrastructure-counterparty-credit-risk-margin-wcl-excess-shortfall-release",
    date: "2026-08-25",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive guide to the mathematical frameworks governing credit extension across Prime Brokerage and UHNW Wealth Management, exploring Margin, Worst Case Loss (WCL), House Excess, Shortfall, and Margin Release.",
  },
  {
    path: "quant/autonomous-agents-langchain",
    title: "Autonomous Quantitative Agents (LangChain)",
    articleSlug: "architecting-autonomous-quantitative-agents-langchain-ecosystem",
    date: "2026-07-01",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A comprehensive guide to the modern LangChain ecosystem. Build stateful, reliable, and secure multi-agent systems for financial modeling—without writing endless code. From LangChain frameworks to Deep Agents harness and MCP connectivity.",
  },
  {
    path: "quant/volatility-risk-premium",
    title: "Volatility Risk Premium (VRP) Decomposition",
    articleSlug: "decomposing-volatility-risk-premium-structural-arbitrage",
    date: "2026-07-03",
    labels: [ArticleLabel.QUANT],
    summary:
      "The Volatility Risk Premium (VRP) is the persistent tendency for option-implied volatility to exceed subsequent realized volatility. Advanced quantitative funds decompose the VRP into its constituent, orthogonal components (moneyness, term structure, and correlation) to target structural inefficiencies driven by non-economic flows.",
  },
  {
    path: "macro/transient-shock",
    title: "The Transient Shock & Disinflation",
    articleSlug: "anatomy-transient-shock-stagflation-fears-2026-disinflationary-trend",
    date: "2026-07-05",
    labels: [ArticleLabel.QUANT, ArticleLabel.MARCO],
    summary:
      "A macroeconomic analysis of the 2026 energy shock, exploring why the Strait of Hormuz crisis failed to trigger stagflation. Highlights structural economic resilience, the collapse of breakeven inflation rates, and the hawkish pivot known as the 'Warsh Effect' that reinforced a disinflationary trend.",
  },
  {
    path: "quant/ah-premium-puzzle",
    title: "Cross-Border Dual-Listed Equities & AH Premium Puzzle",
    articleSlug: "pricing-cross-border-dual-listed-equities",
    date: "2026-07-08",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "The Law of One Price is a foundational axiom in finance, asserting that two identical assets should trade at the same price. This law is systematically violated in the Chinese equity market, where companies simultaneously list \"A-shares\" on mainland exchanges and \"H-shares\" in Hong Kong. Despite identical dividend entitlements, A-shares historically trade at a massive, volatile premium to H-shares, known as the AH Premium Puzzle.",
  },
  {
    path: "finance101/etf-dynamics",
    title: "Dynamics of the Global ETF Market",
    articleSlug: "dynamics-global-etf-market-scale-strategic-utility-quantitative-mechanics",
    date: "2026-07-10",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "The global financial ecosystem has been fundamentally rearchitected by the proliferation of Exchange-Traded Funds (ETFs) over the past three decades. From simple broad-market passive equity exposure, ETFs have evolved into the primary conduit for institutional liquidity and complex active portfolio management, handling nearly $22 trillion globally.",
  },
  {
    path: "quant/ai-agent-testing",
    title: "AI Agent Testing in Quantitative Finance",
    articleSlug: "architecting-ai-agent-testing-quantitative-finance",
    date: "2026-07-13",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A framework for evaluating autonomous financial agents using mock models, temporal state control, and LLM-as-a-judge evaluation.",
  },
  {
    path: "quant/long-short-equity",
    title: "Long-Short Equity Portfolios",
    articleSlug: "quantitative-foundations-long-short-equity-portfolios",
    date: "2026-07-16",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive quantitative guide to the architecture of long-short equity strategies. By relaxing the long-only constraint, quantitative funds can exploit pricing inefficiencies on both the long (undervalued) and short (overvalued) sides of the market. This framework utilizes factor models, systematic research workflows, and portfolio optimization to maximize risk-adjusted returns (alpha) while controlling for systemic exposures (beta).",
  },
  {
    path: "option-strategy/variance-risk-premium",
    title: "Variance Risk Premium",
    articleSlug: "mastering-spx-option-selling-strategies-variance-risk-premium",
    date: "2026-07-18",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive guide to the empirical efficacy of technical, volatility, and macroeconomic indicators in harvesting the Variance Risk Premium. Covers the VIX/VXV ratio, Morning VVIX anomaly, mean-reverting tactical entries (RSI/Bollinger Bands), and dynamic VIX-Kelly position sizing.",
  },
  {
    path: "stock-analysis/spacex-systemic-risk",
    title: "SpaceX Systemic Risk & Public Market Integration",
    articleSlug: "spacex-public-market-integration-systemic-risk-analysis",
    date: "2026-07-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.STOCK_ANALYSIS],
    summary:
      "A structural analysis of the $1.77T SpaceX IPO — covering the bundled Starlink/xAI financial architecture, divergent Nasdaq-100 vs. S&P 500 index inclusion mechanics, extreme float scarcity (4.2%) driving sell-the-news dynamics, and the three-tier systemic risk of SpaceX's aerospace/defense/satellite monopoly position that makes it a critical single point of failure for the global economy.",
  },
  {
    path: "macro/korean-equity-crisis-2026",
    title: "2026 Korean Equity Crisis",
    articleSlug: "systemic-fragility-quantitative-contagion-2026-korean-crisis",
    date: "2026-07-27",
    labels: [ArticleLabel.QUANT],
    summary:
      "A microstructure post-mortem of the 2026 KOSPI crash — covering the AI-driven supercycle that pushed the index to 9,000, the toxic convergence of 38.6 trillion KRW in retail margin debt, 16 single-stock 2x leveraged ETFs on Samsung and SK Hynix, short-gamma dealer hedging spirals, and the global factor rotation from Momentum to Quality triggered by the July 2026 deleveraging cascade.",
  },
  {
    path: "quant/sdlc-quantitative-development",
    title: "SDLC for Quantitative Development",
    articleSlug: "advanced-gitlab-sdlc-quantitative-development-ci-cd-best-practices",
    date: "2026-07-30",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A structured DevSecOps lifecycle for quant finance teams — covering GitLab CI/CD pipelines, trunk-based development, Jupyter notebook tooling (nbstripout, Jupytext, ReviewNB), DVC for large data versioning, DAG-optimized pipeline execution, and continuous compliance via the Four Eyes principle, CODEOWNERS, SAST/DAST, and secret detection.",
  },
  {
    path: "option-strategy/volatility-surface",
    title: "The Volatility Surface",
    articleSlug: "decoding-volatility-surface-advanced-market-prediction-options-flow",
    date: "2026-08-01",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "A three-dimensional map of implied volatility across strikes and maturities. Covers skew morphology (smirk → flattening → forward/mania), sticky-strike vs. sticky-delta regimes, and the four quantitative compass metrics — 25Δ risk reversal, put-call ratio, normalized skew, and gamma exposure (GEX) — for identifying sustainable trends vs. fragile, leverage-fueled rallies.",
  },
  {
    path: "finance101/form-13f",
    title: "Form 13F Disclosures",
    articleSlug: "hidden-mechanics-form-13f-disclosures-microstructure-copycat-economics-systemic-risk",
    date: "2026-08-13",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "How the SEC's quarterly 13F disclosure regime creates predictable microstructure events — covering HFT latency arbitrage (~70ms parse times), the economics of copycat investing (5.5–8.5% excess alpha), the originator's performance tax (~2.6% drag), confidential treatment mechanics, and the systemic implications of Form SHO integration in 2026.",
  },
  {
    path: "macro/fixed-income-turning-points",
    title: "Fixed-Income Market Turning Points",
    articleSlug: "quantitative-assessment-fixed-income-market-turning-points",
    date: "2026-08-10",
    labels: [ArticleLabel.MARCO],
    summary:
      "A quantitative framework for identifying structural turning points in fixed-income markets — covering yield curve dynamics, term premium decomposition, the neutral rate (r*), OAS credit spread analysis, and technical signals for bear-market termination.",
  },
  {
    path: "finance101/etf-architecture",
    title: "ETF Architecture",
    articleSlug: "architecture-exchange-traded-funds-mechanisms-trading-strategies-structural-risks",
    date: "2026-08-07",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive deep dive into ETF mechanics — from regulatory frameworks and the dual-market architecture to tax efficiency via the heartbeat trade, execution strategies for low-liquidity ETFs, volatility decay in leveraged products, and the USO contango anomaly.",
  },
  {
    path: "quant/mean-reversion",
    title: "Mean Reversion & Statistical Arbitrage",
    articleSlug: "quantitative-trading-mean-reversion-factor-models-execution-dynamics",
    date: "2026-08-04",
    labels: [ArticleLabel.QUANT],
    summary:
      "A quantitative framework that exploits temporary pricing inefficiencies across diversified portfolios. Covers factor models, Ornstein-Uhlenbeck stochastic processes, execution dynamics, and robust research practices.",
  },
  {
    path: "option-strategy/vix",
    title: "Cboe Volatility Index (VIX)",
    articleSlug: "mathematics-microstructure-cboe-vix",
    date: "2026-07-24",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive quantitative guide to the VIX — from stochastic variance replication and discrete approximation to market microstructure dynamics, derivatives ecosystems, and the August 2024 liquidity shock.",
  },
  {
    path: "option-strategy/gex",
    title: "Gamma Exposure (GEX)",
    articleSlug: "gamma-exposure-gex-gps-market-volatility",
    date: "2026-08-02",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "How dealer gamma positioning drives market maker hedging flows, and why positive vs. negative gamma regimes dampen or amplify volatility.",
  },
];

export function getWikiEntryByPath(path: string): WikiEntry | undefined {
  return wikiEntries.find((entry) => entry.path === path);
}

export function getWikiEntryForArticle(articleSlug: string): WikiEntry | undefined {
  return wikiEntries.find((entry) => entry.articleSlug === articleSlug);
}

export function getWikiCategories(): string[] {
  const categories = wikiEntries.map((entry) => entry.path.split("/")[0]);
  return [...new Set(categories)];
}

export function getWikiEntriesByCategory(category: string): WikiEntry[] {
  return wikiEntries.filter((entry) => entry.path.split("/")[0] === category);
}
