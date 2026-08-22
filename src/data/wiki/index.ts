import { ArticleLabel } from "@/data/articles/types";

export interface WikiEntry {
  path: string; // e.g. "option-strategy/gex"
  title: string;
  articleSlug: string;
  date: string; // ISO date
  labels?: ArticleLabel[];
  /**
   * Sub-topic labels used to group and filter a category's pages.
   *
   * Deliberately separate from `labels`, which is the shared ArticleLabel enum: those are
   * coarse domain tags (Options Trading, Quantitative Finance) that a whole category shares,
   * so they carry no navigational signal once you are inside that category — all 44
   * option-strategy pages are "Options Trading". These are finer and wiki-only, so adding
   * them doesn't leak new values into the article taxonomy.
   *
   * Free-form strings rather than an enum so a category can grow its own vocabulary without
   * every other category inheriting it. Kept stable because they are user-visible filters.
   */
  topics?: string[];
  summary: string;
}

// Newest first. New entries are prepended here by the sophie-deep-research-article skill.
export const wikiEntries: WikiEntry[] = [
  {
    path: "stock-analysis/stock-analysis-methodology",
    title: "Stock Analysis & Trending Equities Methodology Guide",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.STOCK_ANALYSIS, ArticleLabel.MACRO],
    summary:
      "Complete mathematical specification and quantitative architecture for SOPHIE's Equities & Trending Analysis Suite: 4 valuation models (DCF, Owner Earnings, EV/EBITDA, Residual Income), 4-dimensional fundamental scoring, 5-strategy technical ensemble (EMAs, ADX, Z-score, RSI, Hurst exponent, Volatility regime), Form 4 insider trading + NLP sentiment weighting, 5 AI investor bots, and SOPHIE's master synthesis engine.",
  },
  {
    path: "option-strategy/options-viewer-methodology",
    topics: ["Platform Methodology"],
    title: "Options Viewer Calculation & Methodology Guide",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "Complete mathematical specification, calculation dictionary, and architectural guide for SOPHIE's Options Viewer across all three sub-tools: Option Chain & Matrix (spread %, liquidity score), Volatility Surface (forward IV, Breeden-Litzenberger RND, skew/butterfly), Positioning (Max Pain payout curves), GEX, SPX Payoff Builder (POP, T+0 curve, net Greeks), and VRP Research.",
  },
  {
    path: "option-strategy/gex-methodology",
    topics: ["Platform Methodology", "Greeks & Mechanics"],
    title: "GEX Calculation Methodology",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "Implementation spec for the Options Viewer's gamma exposure numbers: why dollar GEX needs S-squared rather than S, the naive dealer sign convention, whole-book scope, and how the gamma flip and call/put walls are actually computed — including the Black-Scholes repricing that replaced an arbitrary decay approximation.",
  },
  {
    path: "option-strategy/vol-regime-methodology",
    topics: ["Platform Methodology", "Volatility & VRP"],
    title: "Volatility Regime & VRP Methodology",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "How SOPHIE computes the daily volatility regime and variance risk premium: the four-regime taxonomy validated against COVID and the GFC, the convexity and downside-variance decompositions, and the finding that VRP level has near-zero power to time entries (IC ~0.008) while the regime label is a strong risk signal.",
  },
  {
    path: "option-strategy/options-hud-metrics",
    topics: ["Platform Methodology"],
    title: "Options HUD Metrics",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "Implementation spec for the Options Viewer's summary banner: Expected Move (ATM straddle vs. Black-Scholes fallback), Max Pain and why it's suppressed without open interest, Volume vs. OI put/call ratios, and how the ~55 SPX expirations get filtered and ranked by measured liquidity instead of just DTE.",
  },
  {
    path: "option-strategy/option-liquidity-scoring",
    topics: ["Platform Methodology"],
    title: "Option Liquidity Scoring",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "How SOPHIE's per-contract liquidity score works: why spread gates the score multiplicatively rather than being outvoted by open interest, the log-scaled volume/OI components, and how a contract with a wide unfillable quote can never be rescued by size.",
  },
  {
    path: "option-strategy/volatility-surface-analytics",
    topics: ["Platform Methodology", "Volatility & VRP"],
    title: "Volatility Surface Analytics",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "Implementation spec for the Volatility tab: the IV smile, term structure and forward implied vol, the Breeden-Litzenberger risk-neutral density (and why SPX's non-uniform strike grid needs the general three-point second derivative, not the textbook uniform formula), and 25-delta risk reversal/butterfly.",
  },
  {
    path: "option-strategy/options-positioning-analysis",
    topics: ["Platform Methodology", "Greeks & Mechanics"],
    title: "Options Positioning Analysis",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "Implementation spec for the OI/Volume tab: the full Max Pain cumulative payout curve (not just its minimum) and the cumulative open interest curve, plus how curve shape separates a real positioning signal from noise.",
  },
  {
    path: "option-strategy/spx-payoff-builder-methodology",
    topics: ["Platform Methodology", "Spreads & Structures"],
    title: "Multi-Leg Payoff & Probability of Profit Methodology",
    articleSlug: "",
    date: "2026-08-21",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "How the SPX Payoff Builder computes multi-leg expiration P&L, the T+0 mark-to-market curve, net position Greeks, risk-neutral probability of profit, and skew-adjusted implied price ranges — including why POP measures win rate, not expected value.",
  },
  {
    path: "form13f/appaloosa-q2-2026-rotation-hedge",
    title: "Tepper's Q2 2026 Rotation",
    articleSlug: "appaloosa-management-q2-2026-13f-institutional-analysis",
    date: "2026-08-18",
    labels: [ArticleLabel.FORM13F, ArticleLabel.MACRO],
    summary:
      "Appaloosa's Q2 2026 13F shows assets up to $7.47B as Tepper harvested cyclical memory-chip gains (Micron, SanDisk) for platform monopolies (Amazon, Alphabet), layered a $241.6M Apple put hedge, whipsawed back into airlines, and fully exited Chinese ADR exposure.",
  },
  {
    path: "quant/institutional-trading-landscape",
    title: "Institutional Trading Landscape",
    articleSlug: "modern-topography-quant-finance-institutional-trading",
    date: "2026-09-06",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "How institutional finance splits into fiduciary hedge funds, unregulated proprietary trading firms, and multi-manager pod platforms, plus the HFT latency arms race and the Avellaneda-Stoikov math behind algorithmic market making.",
  },
  {
    path: "macro/calculate-investment-clock",
    title: "Calculating the Investment Clock",
    articleSlug: "quantitative-guide-calculate-investment-clock",
    date: "2026-04-20",
    labels: [ArticleLabel.MACRO, ArticleLabel.QUANT],
    summary:
      "Mathematical specification for calculating the Merrill Lynch Investment Clock in real time: 10-indicator FRED pipeline, exponential rolling Z-scores, and phase angle cartesian mapping.",
  },
  {
    path: "form13f/druckenmiller-q2-2026-ai-infrastructure-rotation",
    title: "Druckenmiller's Q2 2026 Rotation",
    articleSlug: "duquesne-family-office-q2-2026-13f-rotation",
    date: "2026-08-15",
    labels: [ArticleLabel.FORM13F, ArticleLabel.MACRO],
    summary: "Duquesne's Q2 2026 13F shows AUM up 54% to $5.21B and 60% turnover, rotating out of broad semiconductors into AI infrastructure bottlenecks — cloud platform monopolies, stranded-power crypto miners, and high-density storage — barbelled against LatAm commodities, precision diagnostics, and aviation.",
  },
  {
    path: "quant/causal-inference-finance",
    title: "Causal Inference in Finance",
    articleSlug: "structural-revolution-quantitative-finance",
    date: "2026-08-08",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary: "Why correlation-only factor mining structurally fails across regime changes, and how Double Machine Learning, Deep IV, causal discovery (NOTEARS, LiNGAM, PC/FCI), and the Interventional Covariance Matrix replace it with causally-robust structure.",
  },
  {
    path: "finance101/wealth-preservation-tax-strategies",
    title: "Advanced Wealth Preservation",
    articleSlug: "strategic-wealth-considerations-tax-and-behavioral-finance",
    date: "2026-08-08",
    labels: [ArticleLabel.FINANCE101],
    summary: "The de minimis trap that flips municipal bond gains from capital-gains to ordinary-income rates, the Free Dividend Fallacy, phantom income from TIPS and the new OBBBA gambling-loss cap, and how DAFs and QCDs turn philanthropy into precision tax defense.",
  },
  {
    path: "stock-analysis/apple-aapl-quality-vs-price-neutral-thesis",
    title: "Gemini Deep Research on AAPL",
    articleSlug: "gemini-deep-research-aapl",
    date: "2025-05-31",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary: "A Neutral thesis on Apple built on separating business quality (56.7% ROIC, durable moat, sustained buybacks) from price (30.5x P/E, 3.3% FCF yield below the 4.5% Treasury yield, ~50% premium to intrinsic value) — quality is real, but there's no margin of safety.",
  },
  {
    path: "quant/technical-analysis-vs-machine-learning-trading",
    title: "Technical Analysis vs ML Trading",
    articleSlug: "deep-research-ta-vs-ml-trading",
    date: "2025-06-02",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary: "A head-to-head TA vs. ML comparison (radar chart across speed, accuracy, adaptability, scalability, interpretability, cost), the three ML paradigms (supervised, unsupervised, reinforcement), and how ML augments — not replaces — six classic TA functions.",
  },
  {
    path: "option-strategy/navigating-option-trading-strategies-taxonomy",
    topics: ["Practice & Tax"],
    title: "Navigating Option Trading Strategies",
    articleSlug: "navigating-option-trading-strategies",
    date: "2025-06-05",
    labels: [ArticleLabel.OPTIONS],
    summary: "A comprehensive taxonomy of option strategies organized by market attitude (directional, neutral, limited-risk/large-profit, conservative) — covering spreads, combinations, ratio/naked writing, volatility skew trading, and general risk-management principles.",
  },
  {
    path: "stock-analysis/alphabet-googl-dcf-interactive-valuation",
    title: "DCF Valuation Analysis of Google (Jun 2025)",
    articleSlug: "interactive-alphabet-googl-valuation-analysis",
    date: "2025-06-06",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary: "An interactive 10-year DCF of Alphabet implying ~$132/share (vs. $173 market price, ~31% overvalued) driven by terminal-value dominance, alongside peer P/E and EV/EBITDA multiples showing GOOGL as the cheapest of the major tech peers.",
  },
  {
    path: "option-strategy/losing-money-options-common-pitfalls",
    topics: ["Practice & Tax"],
    title: "Losing Money With Options: Common Pitfalls",
    articleSlug: "losing-money-with-options-common-pitfalls",
    date: "2025-06-07",
    labels: [ArticleLabel.OPTIONS],
    summary: "A six-category catalog of option-trading losses — directional/Greek ignorance, exercise and expiration mistakes, gamma hedging errors, volatility overpaying, corporate-action landmines, and fat-finger order entry — with a three-pillar prevention framework.",
  },
  {
    path: "option-strategy/writing-naked-puts-wolfinger",
    topics: ["Income & Writing"],
    title: "Writing Naked Puts: A Complete Guide",
    articleSlug: "writing-naked-puts-complete-interactive-guide",
    date: "2025-06-10",
    labels: [ArticleLabel.OPTIONS],
    summary: "Wolfinger's naked-put strategy guide: the two acceptable outcomes (earn premium or buy stock at a discount), repair strategies when a trade goes wrong, margin requirement mechanics, and the investor-vs-trader decision framework at expiration.",
  },
  {
    path: "stock-analysis/microsoft-msft-ev-ebitda-vs-dcf",
    title: "MSFT: EV/EBITDA vs DCF (Jun 2025)",
    articleSlug: "deep-research-microsoft-valuation-analysis",
    date: "2025-06-21",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary: "Microsoft's 23.8x EV/EBITDA multiple (an AI premium) versus a DCF base-case intrinsic value of ~$350/share — reconciling relative market optimism against fundamentals-based overvaluation, plus a WACC/terminal-growth sensitivity table.",
  },
  {
    path: "ai-ml/vector-storage-confluence-rag-comparison",
    title: "Vector Storage Solutions for Confluence RAG",
    articleSlug: "vector-storage-confluence-rag",
    date: "2025-06-22",
    labels: [ArticleLabel.GEN_AI],
    summary: "A feature-by-feature comparison of Chroma, FAISS, and Scikit-learn for hierarchical Confluence RAG — Chroma wins on architectural fit and end-to-end latency for filter-heavy queries despite FAISS's raw speed advantage.",
  },
  {
    path: "ai-ml/database-agents-mcp-langgraph",
    title: "Database Agents with MCP and LangChain",
    articleSlug: "database-agents-mcp-langchain",
    date: "2025-06-22",
    labels: [ArticleLabel.GEN_AI],
    summary: "Architecting production-grade database agents by fusing MCP (standardized tool communication) with LangGraph (stateful orchestration), covering context provisioning strategies and a defense-in-depth security posture across database, application, and LLM layers.",
  },
  {
    path: "option-strategy/option-traders-mindset-wolfinger",
    topics: ["Practice & Tax"],
    title: "The Option Trader's Mindset: Think Like a Winner",
    articleSlug: "option-traders-mindset-book-summary",
    date: "2025-06-23",
    labels: [ArticleLabel.OPTIONS, ArticleLabel.FINANCE101],
    summary: "A chapter-by-chapter summary of Wolfinger's guide to option-trading psychology: the bias blind spot, iron condor discipline, theta and the Greeks as risk tools, revenge trading, and the ultimate lesson — when you win the game, stop playing.",
  },
  {
    path: "stock-analysis/ark-invest-cathie-wood-strategy",
    title: "The ARK Invest Enigma: Cathie Wood's Strategy Decoded",
    articleSlug: "ark-invest-cathie-wood-strategy-analysis",
    date: "2025-06-23",
    labels: [ArticleLabel.STOCK_ANALYSIS, ArticleLabel.FORM13F],
    summary: "ARK Invest's five-platform disruptive-innovation thesis, its extreme boom-bust performance (ARKK +152.5% in 2020, -67.0% in 2022), the bull/bear debate, and landmark wins (Tesla, Nvidia) versus losses (Teladoc) that define its high-conviction strategy.",
  },
  {
    path: "ai-ml/confluence-dual-purpose-knowledge-base",
    title: "The Dual-Purpose Playbook: Confluence for Human and AI",
    articleSlug: "confluence-dual-purpose-playbook-human-ai-collaboration",
    date: "2025-06-27",
    labels: [ArticleLabel.GEN_AI],
    summary: "How to architect a Confluence knowledge base that's equally usable by humans and AI/RAG systems, via five principles: Architect, Atomize, Structure, Automate, Govern — plus a no-code database pattern using Page Properties macros.",
  },
  {
    path: "finance101/alternative-etfs-beyond-spy-qqq",
    title: "ETFs Beyond SPY and QQQ",
    articleSlug: "alternative-etfs-beyond-spy-qqq",
    date: "2025-06-30",
    labels: [ArticleLabel.STOCK_ANALYSIS, ArticleLabel.FINANCE101],
    summary: "A benchmarked survey of income-focused (SCHD, VYM, JEPI, JEPQ) and factor-based core (USMV, QUAL, RSP, VTV) ETF alternatives to SPY/QQQ, comparing yield, expense ratio, beta, and risk-adjusted returns.",
  },
  {
    path: "stock-analysis/stock-wipeout-probability-diversification",
    title: "Stock Wipeout Probability Analysis",
    articleSlug: "stock-wipeout-probability-analysis",
    date: "2025-07-01",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary: "Bessembinder's research shows a 100% loss is the single most common lifetime outcome for individual stocks, and only the top 2.4% of firms created all net global wealth from 1991-2020 — making diversification the primary defense against wipeout risk.",
  },
  {
    path: "ai-ml/ollama-cheat-sheet-command-reference",
    title: "Ollama Cheat Sheet: Complete Command Reference",
    articleSlug: "ollama-cheat-sheet-complete-command-reference",
    date: "2025-07-04",
    labels: [ArticleLabel.GEN_AI],
    summary: "A quick-reference for running LLMs locally with Ollama — model management, interactive chat, Modelfiles, the local HTTP API, and advanced tips like tool calling and Open WebUI.",
  },
  {
    path: "stock-analysis/apple-financial-health-metrics-mislead",
    title: "Apple's Financial Health (Jul 2025)",
    articleSlug: "apple-financial-health-analysis-traditional-metrics-mislead",
    date: "2025-07-05",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary: "Apple's below-1.0 Current Ratio and industry-high Debt-to-Equity ratio aren't distress signals but the deliberate results of a negative cash conversion cycle and an aggressive buyback program, backstopped by a 116% FCF conversion rate.",
  },
  {
    path: "finance101/rich-dad-poor-dad-kiyosaki-summary",
    title: "Rich Dad, Poor Dad: Key Stories and Lessons",
    articleSlug: "rich-dad-poor-dad-book-summary",
    date: "2025-07-05",
    labels: [ArticleLabel.FINANCE101],
    summary: "Ten pivotal stories from Kiyosaki's two father figures illustrating the core distinction between assets and liabilities, and why financial IQ and working to learn matter more than working for money.",
  },
  {
    path: "option-strategy/earnings-volatility-selling-strategy",
    topics: ["Income & Writing", "Volatility & VRP"],
    title: "Advanced Option Strategy: Earnings Volatility Selling",
    articleSlug: "earnings-volatility-selling-strategy-complete-guide",
    date: "2025-07-13",
    labels: [ArticleLabel.QUANT],
    summary: "A 72,500-event backtest (2007-2024) shows unfiltered earnings straddle/calendar selling returns ~0%, but filtering for term structure backwardation, high IV/RV ratio, and liquidity produces 7-9% mean returns with strict Kelly-based position sizing.",
  },
  {
    path: "finance101/essential-reading-value-investors",
    title: "Essential Reading for Value Investors",
    articleSlug: "essential-reading-for-investors",
    date: "2025-07-14",
    labels: [ArticleLabel.FINANCE101],
    summary: "A curated two-part reading list — value-investing frameworks (Housel, Marks, Munger, Spier) paired with life/mindset books (Clear, Holiday, Manson, Parrish) — built around the idea that psychological discipline is the real bottleneck.",
  },
  {
    path: "ai-ml/rag-metadata-filtering-architectures",
    title: "Architecting Advanced RAG Systems: Metadata-Driven Filtering",
    articleSlug: "rag-metadata-filtering-advanced-architectures",
    date: "2025-07-17",
    labels: [ArticleLabel.GEN_AI],
    summary: "Fusing semantic vector search with structured metadata filtering — pre- vs. post-filtering tradeoffs, vector database comparisons (Qdrant, Pinecone, Weaviate, pgvector), self-querying retrieval, RAG vs. NL-to-SQL, and secure multi-tenant RAG design.",
  },
  {
    path: "quant/technical-analysis-institutional-performance",
    title: "Technical Analysis in Portfolio Management: Performance and Practice",
    articleSlug: "technical-analysis-portfolio-management-performance-practice",
    date: "2025-07-18",
    labels: [ArticleLabel.QUANT, ArticleLabel.STOCK_ANALYSIS],
    summary: "A 10,000-manager survey study finds technical analysis users don't beat the market on average returns, but do show elevated skewness/kurtosis and a ~19bps/month downturn edge — the edge is in return-distribution shape, not raw outperformance.",
  },
  {
    path: "option-strategy/iron-condor-benklifa-summary",
    topics: ["Spreads & Structures", "Income & Writing"],
    title: "Profiting with Iron Condor Options: Trade the Math, Not the Myth",
    articleSlug: "profiting-iron-condor-options-book-summary",
    date: "2025-07-22",
    labels: [ArticleLabel.QUANT],
    summary: "Michael Hanania Benklifa's iron condor playbook — the Greeks as the only thing that matters once in a trade, three pillars of disciplined entry/adjustment/exit, and why sellers only need to be right about time while buyers need direction, distance, and time.",
  },
  {
    path: "finance101/sebi-jane-street-market-manipulation",
    title: "The Jane Street Precedent: Manipulation, Regulation, and India's Derivatives Market",
    articleSlug: "jane-street-precedent-market-manipulation",
    date: "2025-07-23",
    labels: [ArticleLabel.FINANCE101],
    summary: "SEBI's ₹4,844 crore case against Jane Street — an alleged cross-market 'pump-and-dump' vs. the firm's index-arbitrage defense — and the resulting overhaul of India's derivatives market (delta-based limits, fewer weekly expiries, algo IDs).",
  },
  {
    path: "finance101/meme-stock-phenomenon-guide",
    title: "The Meme Stock Phenomenon: Hype, Risk, and Strategy",
    articleSlug: "meme-stock-phenomenon-hype-risk-strategy",
    date: "2025-07-25",
    labels: [ArticleLabel.FINANCE101],
    summary: "The July 2025 meme stock resurgence (OPEN +440%, GPRO, KSS) versus the sobering 2021 Old Guard (AMC, GME, BB all down 80%+ from peak) — a risk checklist and exit-strategy discipline for treating this as speculation, not investing.",
  },
  {
    path: "finance101/stablecoin-investing-guide",
    title: "The Investor's Guide to Stablecoins: Profiting from Digital Dollars",
    articleSlug: "investors-guide-stablecoins-profiting-digital-dollars",
    date: "2025-07-26",
    labels: [ArticleLabel.FINANCE101],
    summary: "The four stablecoin types and their risk profiles, CeFi/DeFi yield vs. TradFi savings, the GENIUS Act's new reserve/audit mandates, and lessons from the Terra/UST collapse and other historical de-pegs and hacks.",
  },
  {
    path: "quant/trend-vs-momentum-indicators",
    title: "Trend vs. Momentum in Technical Analysis",
    articleSlug: "trend-vs-momentum-technical-analysis-guide",
    date: "2025-07-27",
    labels: [ArticleLabel.QUANT, ArticleLabel.STOCK_ANALYSIS],
    summary: "Trend indicators (MA, Parabolic SAR, ADX) lag but confirm direction; momentum indicators (RSI, Stochastic, ROC) lead but whipsaw in trends — plus MACD as the hybrid and two blueprint strategies for combining both.",
  },
  {
    path: "finance101/little-book-behavioral-investing-montier",
    title: "The Little Book of Behavioral Investing: How Not to Be Your Own Worst Enemy",
    articleSlug: "little-book-behavioral-investing-summary",
    date: "2025-07-30",
    labels: [ArticleLabel.FINANCE101],
    summary: "James Montier's twelve behavioral biases sabotaging investors (overconfidence, confirmation bias, loss aversion, groupthink, and more) and the systemic fixes — pre-commitment, checklists, 'kill the company,' investment diaries — that replace unreliable willpower.",
  },
  {
    path: "quant/backtrader-cheatsheet-python-framework",
    title: "The Definitive backtrader Cheatsheet",
    articleSlug: "definitive-backtrader-cheatsheet-guide",
    date: "2025-07-30",
    labels: [ArticleLabel.QUANT],
    summary: "A reference guide to the backtrader Python framework — the Cerebro engine, strategy lifecycle methods, sizers, indicators, performance analyzers, parameter optimization, and realistic commission/slippage modeling.",
  },
  {
    path: "ai-ml/advanced-rag-context-engineering",
    title: "Architectures of Intelligence: Advanced RAG and Context Engineering",
    articleSlug: "architectures-intelligence-advanced-rag-context-engineering",
    date: "2025-08-01",
    labels: [ArticleLabel.GEN_AI],
    summary: "A tiered framework for production RAG systems — chunking strategies, query transformation, two-stage re-ranking, prompting patterns, and agentic self-correction loops (CRAG, SELF-RAG) — organized around 'context failures, not model failures.'",
  },
  {
    path: "option-strategy/diagonal-spread-vs-covered-call-pmcc",
    topics: ["Spreads & Structures", "Income & Writing"],
    title: "Diagonal Spread vs. Covered Call: A Strategic and Quantitative Comparison",
    articleSlug: "diagonal-spread-vs-covered-call-strategic-quantitative-comparison",
    date: "2025-08-02",
    labels: [ArticleLabel.QUANT],
    summary: "Covered calls and the Poor Man's Covered Call (diagonal spread) diverge on capital efficiency and — critically — Vega sign: covered calls are short volatility, PMCCs are long volatility, making them suited to opposite IV regimes.",
  },
  {
    path: "stock-analysis/figma-ipo-post-ipo-analysis",
    title: "Figma: A Post-IPO Deep Dive (Aug 2025)",
    articleSlug: "figma-ipo-deep-dive-post-ipo-analysis-generational-saas",
    date: "2025-08-03",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary: "Figma's IPO closed +250% at a ~$68B valuation and ~75x P/S — elite PLG-driven SaaS metrics (132% NDR, >90% gross margin) collide with a valuation that prices in flawless execution, making this a watchlist name rather than an immediate buy.",
  },
  {
    path: "finance101/fooled-by-randomness-taleb-summary",
    title: "Fooled by Randomness: The Hidden Role of Chance in Life and Markets",
    articleSlug: "fooled-by-randomness-book-summary",
    date: "2025-08-03",
    labels: [ArticleLabel.FINANCE101],
    summary: "Taleb's core ideas from Fooled by Randomness — the lucky fool, survivorship bias, skewness (payoff over frequency), the Black Swan problem, and path-dependent nonlinearity — and why judging process over outcome is the practical antidote.",
  },
  {
    path: "form13f/druckenmiller-doctrine-asymmetric-returns",
    title: "The Druckenmiller Doctrine (Aug 2025)",
    articleSlug: "druckenmiller-doctrine-asymmetric-returns",
    date: "2025-08-04",
    labels: [ArticleLabel.FORM13F],
    summary: "Stanley Druckenmiller's four-pillar framework — macro-centric analysis, concentrated conviction, asymmetric risk management, and psychological discipline — illustrated through Breaking the Bank of England and the 2000 dot-com meltdown.",
  },
  {
    path: "finance101/calendar-anomalies-seasonality",
    title: "Seasons of the Market: Calendar Anomalies and Trading Adages",
    articleSlug: "seasons-market-calendar-anomalies-trading-adages",
    date: "2025-08-05",
    labels: [ArticleLabel.FINANCE101],
    summary: "Testing 'Sell in May', the January Effect, the Santa Claus Rally, and September weakness against S&P 500 data since 1950 — some hold up, some are decayed myths, and none should drive market-timing decisions.",
  },
  {
    path: "quant/quantitative-support-level-modeling",
    title: "Quantitative Support Level Modeling",
    articleSlug: "quantitative-support-level-modeling-machine-learning",
    date: "2025-08-06",
    labels: [ArticleLabel.QUANT, ArticleLabel.STOCK_ANALYSIS],
    summary: "Reframing support levels as a probabilistic zone rather than a fixed line, then building an ML pipeline (features, model families, walk-forward validation, and a DeepSupp attention model) to predict whether a level holds or breaks.",
  },
  {
    path: "option-strategy/global-covered-call-risk-decomposition",
    topics: ["Income & Writing"],
    title: "Global Evidence on Covered Calls: Risk Decomposition and Risk-Managed Strategies",
    articleSlug: "covering-world-global-evidence-covered-calls",
    date: "2025-08-07",
    labels: [ArticleLabel.QUANT],
    summary: "AQR's global covered call research decomposes returns into passive equity, short volatility, and uncompensated dynamic equity exposure — showing risk-managed hedging plus global diversification lifts the Sharpe ratio from 0.35 to 0.57.",
  },
  {
    path: "form13f/13f-manager-profiles-idea-generation-guide",
    title: "Unlocking SEC Form 13F",
    articleSlug: "unlocking-institutional-portfolios-strategic-guide-sec-form-13f",
    date: "2025-08-09",
    labels: [ArticleLabel.FORM13F, ArticleLabel.FINANCE101],
    summary: "How to use Form 13F for idea generation, not portfolio replication — the $100M filing threshold, critical limitations (45-day lag, no shorts), and Q1 2025 snapshots from Buffett, Druckenmiller, Klarman, Ackman, Burry, Li Lu, and Pabrai.",
  },
  {
    path: "quant/hedge-fund-desk-system-architecture",
    title: "Architecting the Modern Hedge Fund Desk",
    articleSlug: "architecting-modern-hedge-fund-desk-system-design",
    date: "2025-08-11",
    labels: [ArticleLabel.QUANT],
    summary: "A system design blueprint for a PM platform: Modular Monolith + Kafka/CQRS/Event Sourcing core, polyglot persistence, the Java/Python/C++ tech stack, security controls, and a phased 18-month implementation roadmap.",
  },
  {
    path: "quant/small-hedge-fund-cto-technology-stack",
    title: "The Small Hedge Fund CTO: Technology Leadership in Quantitative Trading",
    articleSlug: "small-hedge-fund-cto-technology-leadership-quant-trading",
    date: "2025-08-13",
    labels: [ArticleLabel.QUANT],
    summary: "A player-coach's guide to running technology at a small hedge fund: the build/buy/outsource calculus, the modern bilingual Python/C++ tech stack, on-prem vs. cloud infrastructure tradeoffs, and FIX connectivity as an operational-maturity signal.",
  },
  {
    path: "quant/aqr-factor-investing-research-legacy",
    title: "The Architecture of Quantitative Insight: AQR's Research Legacy",
    articleSlug: "architecture-quantitative-insight-aqr-research-legacy",
    date: "2025-08-14",
    labels: [ArticleLabel.QUANT],
    summary: "25+ years of AQR research distilled: the foundational value/momentum/quality/defensive factor papers, the debates defending them against skepticism, and the shift toward machine learning and tax-aware implementation.",
  },
  {
    path: "finance101/charlie-munger-worldly-wisdom",
    title: "The Worldly Wisdom of Munger (Aug 2025)",
    articleSlug: "worldly-wisdom-charles-munger-multidisciplinary-approach",
    date: "2025-08-15",
    labels: [ArticleLabel.FINANCE101, ArticleLabel.FORM13F],
    summary: "Charlie Munger's multidisciplinary 'latticework of mental models' from Poor Charlie's Almanack — inversion, the psychology of human misjudgment, and an investment philosophy built on focus over diversification.",
  },
  {
    path: "ai-ml/lstm-systematic-trading",
    title: "LSTM in Systematic Trading: Architecture, Application, and Performance",
    articleSlug: "lstm-systematic-trading-deep-dive-architecture-application-performance",
    date: "2025-08-15",
    labels: [ArticleLabel.MACHINE_LEARNING, ArticleLabel.QUANT],
    summary: "How LSTM networks solve the vanishing gradient problem to capture long-term dependencies in noisy, non-stationary financial time series, compared against GRU and Transformer architectures and the practical pitfalls of deploying them.",
  },
  {
    path: "stock-analysis/alibaba-baba-fundamental-analysis-2025",
    title: "Alibaba (BABA): Navigating a Complex New Era of Growth and Risk",
    articleSlug: "alibaba-baba-stock-analysis-complex-era-growth-risk",
    date: "2025-08-17",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary: "Alibaba trades at a persistent 'geopolitical discount' to Amazon and Tencent despite improving FY2025 fundamentals — 6% revenue growth, 77% net income growth, and a deliberate AI/cloud capex surge that cut free cash flow by 53%.",
  },
  {
    path: "form13f/druckenmiller-q2-2025-ai-america-conviction",
    title: "Druckenmiller's Q2 2025 Playbook: AI, America, and Aggressive Conviction",
    articleSlug: "druckenmiller-q2-2025-portfolio-analysis-ai-america-conviction",
    date: "2025-08-22",
    labels: [ArticleLabel.FORM13F],
    summary: "Duquesne Family Office's Q2 2025 13F shows total value up 33% to $4.07B with 69 holdings, driven by AI value-chain infrastructure bets, broad U.S. bullishness via SPY/IWM calls, and high-stakes healthcare positions like Insmed ahead of an FDA approval.",
  },
  {
    path: "option-strategy/automated-option-trading-five-pillars",
    topics: ["Practice & Tax"],
    title: "Automated Option Trading: The Five Pillars Framework",
    articleSlug: "automated-option-trading-comprehensive-guide",
    date: "2025-08-23",
    labels: [ArticleLabel.QUANT],
    summary: "A five-pillar framework for building automated options trading systems — strategy design, optimization, risk management, capital allocation, and backtesting — built around why options break the assumptions conventional trading tools rely on.",
  },
  {
    path: "form13f/burry-q2-2025-cassandra-pivot",
    title: "The Cassandra Pivot (Q2 2025)",
    articleSlug: "michael-burry-q2-2025-portfolio-analysis-cassandra-pivot",
    date: "2025-08-24",
    labels: [ArticleLabel.FORM13F],
    summary: "Scion Asset Management's Q2 2025 13F shows a complete reversal from Q1's all-puts bearish 'fortress' to a concentrated book of bullish call options on beaten-down leaders like UnitedHealth, Lululemon, and Estée Lauder.",
  },
  {
    path: "macro/powell-pivot-2025-fed-easing-signal",
    title: "The Powell Pivot: Insurance Cuts vs. Crisis Cuts",
    articleSlug: "powell-pivot-navigating-market-crosscurrents-fed-easing-signal",
    date: "2025-08-25",
    labels: [ArticleLabel.MACRO],
    summary:
      "Why Powell's August 2025 dovish pivot is a historical hybrid — comparing 1995/2019 insurance-cut soft landings vs. 2001/2007 crisis-cut hard landings, plus a 60/40 probability-weighted strategic outlook and portfolio positioning.",
  },
  {
    path: "option-strategy/risk-parity-call-writing-overlay",
    topics: ["Income & Writing"],
    title: "Risk Parity Through Call Writing (An Alternative to Leverage)",
    articleSlug: "beyond-leverage-risk-parity-call-writing",
    date: "2025-08-28",
    labels: [ArticleLabel.OPTIONS, ArticleLabel.QUANT],
    summary:
      "How a call-writing overlay achieves Equal Risk Contribution without leverage by 'powering down' risky assets instead of levering up safe ones, delta/strike calibration, and the Tail Risk Parity critique.",
  },
  {
    path: "form13f/congressional-stock-trading-political-alpha",
    title: "Political Alpha (Aug 2025)",
    articleSlug: "political-alpha-congressional-stock-trading-guide",
    date: "2025-08-28",
    labels: [ArticleLabel.FORM13F, ArticleLabel.FINANCE101],
    summary:
      "Nancy Pelosi's market-beating portfolio and other top congressional traders, the STOCK Act's disclosure flaws, a four-step framework for tracking political trades, and the legislative/crowded-trade risks of following them.",
  },
  {
    path: "ai-ml/transformers-systematic-trading",
    title: "Transformers in Systematic Trading",
    articleSlug: "transformer-systematic-trading-architecture-applications",
    date: "2025-08-28",
    labels: [ArticleLabel.MACHINE_LEARNING, ArticleLabel.QUANT],
    summary:
      "How Transformers adapt to finance via time-series patching, applications in forecasting/NLP/factor generation, a head-to-head comparison vs. LSTM and XGBoost, and case studies (Stockformer, Quantformer).",
  },
  {
    path: "option-strategy/covered-calls-vs-cash-secured-puts",
    topics: ["Income & Writing"],
    title: "Covered Calls vs. Cash-Secured Puts: Theory vs. Practice",
    articleSlug: "covered-calls-vs-cash-secured-puts",
    date: "2025-08-30",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "Put-call parity proves covered calls and cash-secured puts are mathematically identical, but capital requirements, tax treatment, and psychology make them practically different — plus how 'The Wheel' strategy connects the two.",
  },
  {
    path: "stock-analysis/magnificent-seven-q2-2025-earnings",
    title: "The Magnificent Seven: Q2 2025 Earnings and the AI Bubble Debate",
    articleSlug: "magnificent-seven-ai-titans-bubble-analysis",
    date: "2025-09-02",
    labels: [ArticleLabel.STOCK_ANALYSIS, ArticleLabel.MACRO],
    summary:
      "Q2 2025 earnings snapshot for the Magnificent Seven, the bifurcation between AI infrastructure enablers and application players, and the bull vs. bear case for whether current AI valuations are justified or a bubble.",
  },
  {
    path: "macro/2025-dollar-decline-equity-resilience",
    title: "The 2025 Dollar Decline and Equity Resilience",
    articleSlug: "navigating-turning-tide-2025-macro-analysis",
    date: "2025-09-04",
    labels: [ArticleLabel.MACRO],
    summary:
      "Why the U.S. Dollar fell ~9.83% YTD in 2025 while the S&P 500 gained ~9.84% — domestically-generated tariff policy risk inverting the dollar's usual safe-haven role, the FX-equity feedback loop, and an FX-aware investment framework.",
  },
  {
    path: "quant/hedge-fund-alternative-data-alpha",
    title: "How Hedge Funds Use Alternative Data for Alpha",
    articleSlug: "hedge-fund-data-driven-edge-alpha-generation",
    date: "2025-09-04",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary:
      "Why the institutional data edge is capital + technology + talent combined, not data access alone — alternative data categories and vendors, the data-to-signal ML pipeline, and a mosaic-theory short-thesis case study.",
  },
  {
    path: "macro/multi-asset-strategy-peak-valuations",
    title: "Multi-Asset Strategy for Peak Valuations and Monetary Easing (Sep 2025)",
    articleSlug: "navigating-inflection-point-multi-asset-strategy-peak-valuations",
    date: "2025-09-06",
    labels: [ArticleLabel.MACRO],
    summary:
      "A resilient portfolio blueprint for peak valuations meeting a Fed easing cycle — gold's real-yield sensitivity, fixed income duration extension, a soft-landing-contingent small-cap tactical bet, and an option-writing volatility overlay.",
  },
  {
    path: "macro/howard-marks-mastering-market-cycle",
    title: "Howard Marks: Mastering the Market Cycle (Sep 2025)",
    articleSlug: "mastering-market-cycle-howard-marks-summary",
    date: "2025-09-08",
    labels: [ArticleLabel.MACRO, ArticleLabel.FINANCE101],
    summary:
      "The six interlocking market cycles (economic, profit, psychology, risk attitude, credit, real estate), the three stages of a bull market, and a market-temperature checklist for calibrating portfolio aggressiveness vs. defensiveness.",
  },
  {
    path: "finance101/mutual-funds-vs-etfs",
    title: "Mutual Funds vs. ETFs: A Decision Framework",
    articleSlug: "mutual-funds-vs-etfs-definitive-investment-guide",
    date: "2025-09-09",
    labels: [ArticleLabel.FINANCE101],
    summary:
      "The structural differences between mutual funds and ETFs (pricing, tax efficiency via in-kind redemption, costs, automation) and a decision framework for which to use in retirement vs. taxable accounts.",
  },
  {
    path: "ai-ml/xgboost-vs-deep-learning-trading",
    title: "XGBoost vs. Deep Learning in Systematic Trading",
    articleSlug: "strategic-role-xgboost-systematic-trading-2025",
    date: "2025-09-11",
    labels: [ArticleLabel.MACHINE_LEARNING, ArticleLabel.QUANT],
    summary:
      "Why XGBoost remains the right tool for structured, tabular, feature-driven prediction problems (cross-sectional ranking, regime classification) even as deep learning advances, plus the hybrid LSTM-then-XGBoost architecture pattern.",
  },
  {
    path: "option-strategy/tax-efficient-option-writing",
    topics: ["Practice & Tax", "Income & Writing"],
    title: "Tax-Efficient Option Writing: Section 1256, the 60/40 Rule, and Common Traps",
    articleSlug: "tax-efficient-option-writing-comprehensive-guide",
    date: "2025-09-12",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "Why SPX vs. SPY can be a ~27% after-tax difference on an identical option-writing strategy — Section 1256's 60/40 rule and wash sale exemption, plus common traps (holding period resets, straddle loss deferral) to avoid.",
  },
  {
    path: "option-strategy/rolling-short-options-framework",
    topics: ["Greeks & Mechanics", "Income & Writing"],
    title: "Rolling Short Options: A Defensive and Offensive Framework",
    articleSlug: "strategic-framework-rolling-options-quantitative-approach",
    date: "2025-09-13",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "Universal rolling principles (net credit mandate, delta/DTE triggers), defensive vs. offensive rolling mechanics for puts and calls, a roll/close/hold decision framework, and the 80% and maximum-loss rules.",
  },
  {
    path: "quant/sp500-inclusion-anomaly-event-trading",
    title: "Trading the S&P 500 Inclusion Anomaly",
    articleSlug: "sp500-inclusion-anomaly-december-2025-deep-research",
    date: "2025-09-15",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "How the S&P 500 inclusion effect changed from a permanent re-rating into a short-term momentum + IV crush event, candidate screening criteria, why bull put spreads beat bull call spreads for this trade, and the critical event timeline.",
  },
  {
    path: "ai-ml/social-media-recommenders-vs-financial-ml",
    title: "Why Social Media Recommender Algorithms Can't Pick Stocks",
    articleSlug: "viral-videos-volatile-valuations-ai-algorithms-stock-picking",
    date: "2025-09-17",
    labels: [ArticleLabel.MACHINE_LEARNING, ArticleLabel.FINANCE101],
    summary:
      "Why engagement-optimized recommender systems (TikTok-style) are structurally incompatible with sound financial advice, the regulatory risks of applying them to markets, and the viable path forward (educational augmentation, not prescriptive recommendations).",
  },
  {
    path: "ai-ml/reinforcement-learning-quant-trading",
    title: "Reinforcement Learning in Quantitative Trading",
    articleSlug: "reinforcement-learning-quantitative-trading-optimal-action",
    date: "2025-09-19",
    labels: [ArticleLabel.MACHINE_LEARNING, ArticleLabel.QUANT],
    summary:
      "How RL shifts trading from predict-then-act to directly learning a cost-and-risk-aware policy, its core application domains (portfolio optimization, execution, market making), practical limitations, and a blueprint for building an RL trading system.",
  },
  {
    path: "option-strategy/option-collar-protective-strategy",
    topics: ["Spreads & Structures", "Income & Writing"],
    title: "The Option Collar: Protect Gains, Define Risk",
    articleSlug: "option-collar-strategy-protect-gains-define-risk",
    date: "2025-09-20",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "How the three-pillar option collar (long stock + protective put + covered call) caps both downside and upside, why volatility skew means 'zero-cost' collars still cost forgone upside, and rolling/management techniques.",
  },
  {
    path: "option-strategy/academic-vrp-option-writing-research",
    topics: ["Volatility & VRP", "Income & Writing"],
    title: "Academic Foundations of Option Writing: VRP, Performance, and Tail Risk",
    articleSlug: "academic-foundations-option-writing-research-review",
    date: "2025-09-21",
    labels: [ArticleLabel.OPTIONS, ArticleLabel.QUANT],
    summary:
      "A research synthesis on why systematic option selling is profitable (the Variance Risk Premium), empirical strategy performance evidence, index vs. equity option differences, and emerging tail-risk hedging research.",
  },
  {
    path: "macro/structural-gold-bull-market-2025",
    title: "The Structural Gold Bull Market: Drivers and Outlook",
    articleSlug: "new-golden-age-structural-bull-market-analysis",
    date: "2025-09-22",
    labels: [ArticleLabel.MACRO],
    summary:
      "Why gold's 2024 breakout confirmed a new secular bull market — central bank de-dollarization buying, persistent geopolitical risk premium, retail resurgence, and institutional price targets clustering near $4,000/oz by mid-2026.",
  },
  {
    path: "quant/smart-beta-factor-investing-guide",
    title: "Smart Beta: Factor Investing Between Passive and Active",
    articleSlug: "smart-beta-systematic-personal-investing-strategies",
    date: "2025-09-24",
    labels: [ArticleLabel.QUANT],
    summary:
      "How smart beta's rules-based factor investing (value, momentum, quality, low volatility, size) sits between passive and active management, factor performance by economic regime, and a practical guide to building a personal factor portfolio.",
  },
  {
    path: "quant/hft-market-making-avellaneda-stoikov",
    title: "Modern Market Making: The Avellaneda-Stoikov Model & HFT Infrastructure",
    articleSlug: "anatomy-of-speed-modern-market-making-hft",
    date: "2025-09-26",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary:
      "How electronic market makers price inventory risk and adverse selection with the Avellaneda-Stoikov model, the HFT latency infrastructure stack, and how machine learning extends alpha generation beyond quoting.",
  },
  {
    path: "option-strategy/spx-vs-spy-options-tax-pitfalls",
    topics: ["Practice & Tax"],
    title: "Common Options Trading Pitfalls: Greeks, Assignment, and SPX vs. SPY",
    articleSlug: "navigating-minefield-options-trading-pitfalls",
    date: "2025-09-28",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "The psychological, structural, and tax pitfalls that trap options traders — Theta/Vega decay, liquidity traps, early assignment risk, and the SPX vs. SPY tax and settlement differences that can be worth ~32% in tax savings.",
  },
  {
    path: "stock-analysis/us-market-valuation-metrics-2025",
    title: "U.S. Market Valuations: Reading the Overvaluation Signals",
    articleSlug: "navigating-rarified-air-quantitative-analysis-us-market-valuations",
    date: "2025-09-29",
    labels: [ArticleLabel.STOCK_ANALYSIS, ArticleLabel.MACRO],
    summary:
      "How Shiller P/E, the Buffett Indicator, and the earnings yield gap converge on the same overvaluation signal following Powell's 'fairly highly valued' remark, historical precedent for what follows valuation extremes, and a strategic playbook of value, quality, and diversification.",
  },
  {
    path: "macro/2025-fixed-income-income-paradigm",
    title: "2025 Fixed Income: The Shift to Income-Driven Returns",
    articleSlug: "navigating-turning-point-2025-fixed-income-analysis",
    date: "2025-09-30",
    labels: [ArticleLabel.MACRO],
    summary:
      "Why 2025 fixed income returns are being driven by coupon income rather than price appreciation, the 'stagflation-lite' backdrop behind an expected bull-steepening yield curve, and sector-by-sector positioning (favor quality corporates and munis, be cautious on high-yield).",
  },
  {
    path: "quant/quant-fund-alpha-to-execution-workflow",
    title: "The Anatomy of a Quant Fund: Alpha to Execution",
    articleSlug: "anatomy-quant-fund-alpha-discovery-automated-execution",
    date: "2025-10-02",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary:
      "The four-pillar systematic quant fund workflow — alpha discovery via ML, market-neutral portfolio construction, bias-aware backtesting, and low-latency execution — plus the technology stack and the perpetual challenge of alpha decay.",
  },
  {
    path: "option-strategy/cash-secured-puts-covered-calls",
    topics: ["Income & Writing"],
    title: "Cash-Secured Puts & Covered Calls: Disciplined Entry and Exit",
    articleSlug: "strategic-portfolio-management-option-writing",
    date: "2025-10-04",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "How cash-secured puts and covered calls turn options into disciplined entry/exit tools, covering the Greeks from a writer's perspective, worked scenario math, IV Rank timing, and a pre-trade risk checklist.",
  },
  {
    path: "stock-analysis/russell-2000-small-cap-benchmark",
    title: "The Russell 2000: Construction, Valuation, and Investment Case",
    articleSlug: "russell-2000-small-cap-engine-deep-dive",
    date: "2025-10-06",
    labels: [ArticleLabel.STOCK_ANALYSIS, ArticleLabel.FINANCE101],
    summary:
      "How the Russell 2000 is constructed and reconstituted, why its lack of a profitability screen leads to structural drag versus the S&P SmallCap 600, and the investment case for and against owning it directly.",
  },
  {
    path: "quant/volume-price-analysis",
    title: "Volume Price Analysis (VPA)",
    articleSlug: "volume-price-analysis-market-lore-algorithmic-execution",
    date: "2025-10-07",
    labels: [ArticleLabel.QUANT, ArticleLabel.STOCK_ANALYSIS],
    summary:
      "How Volume Price Analysis reads conviction behind price moves, from Dow and Wyckoff's foundational laws through modern indicators (OBV, VWAP, Volume Profile), institutional VWAP execution, and machine learning applications.",
  },
  {
    path: "quant/personal-quant-trading-strategies-toolkit",
    title: "Quantitative Trading for the Independent Analyst",
    articleSlug: "personal-quant-trading-strategies-independent-analysts",
    date: "2025-10-09",
    labels: [ArticleLabel.QUANT],
    summary:
      "A strategy toolkit for retail quants that avoids competing with institutions on speed or data, covering trend-following, mean-reversion, and volatility-selling strategies plus the backtesting/risk-management/position-sizing essentials.",
  },
  {
    path: "macro/geopolitical-shock-market-drawdown-playbook",
    title: "Trading Geopolitical Shocks: Historical Precedent and an Investor Playbook (Oct 2025)",
    articleSlug: "trade-war-redux-october-10-market-shock-analysis",
    date: "2025-10-10",
    labels: [ArticleLabel.MACRO],
    summary:
      "How to read a geopolitical market shock in historical context — sentiment vs. fundamentals-driven drawdowns, typical recovery timelines, asymmetric escalation tactics, and a five-point disciplined investor playbook for navigating the volatility.",
  },
  {
    path: "option-strategy/options-wheel-strategy-quantitative-rules",
    topics: ["Income & Writing"],
    title: "The Options Wheel: A Rules-Based Trading Plan",
    articleSlug: "options-wheel-trading-plan-quantitative-approach",
    date: "2025-10-11",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "A systematic rules-based approach to the options wheel strategy, covering underlyer selection criteria, DTE/delta rules for writing puts and calls, defensive vs. offensive rolling, and how it compares to buy-and-hold and credit spreads.",
  },
  {
    path: "option-strategy/grey-rhino-volatility-options-framework",
    topics: ["Volatility & VRP"],
    title: "Trading a Grey Rhino Sell-off: A Phased Options Framework",
    articleSlug: "options-strategy-report-october-10-market-event",
    date: "2025-10-12",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "A VIX-level-driven, three-phase options framework (bull put spreads, cash-secured puts, LEAP calls) for responding to a Grey Rhino sell-off — a foreseeable, high-impact event that markets neglected until it hit.",
  },
  {
    path: "quant/high-frequency-trading-strategies-technology",
    title: "High-Frequency Trading: Core Strategies and the Technology Arms Race",
    articleSlug: "microsecond-battlefield-competitive-strategies-high-frequency-trading",
    date: "2025-10-13",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary:
      "The four core HFT strategy pillars (market making, arbitrage, liquidity detection, directional), the latency/hardware technology arms race behind them, the ML techniques mapped to each strategy, and the regulatory fairness debate.",
  },
  {
    path: "finance101/institutional-retail-asymmetry-market-manipulation",
    title: "The Harvest: How Institutions Exploit Retail Investors",
    articleSlug: "the-harvest-institutional-exploitation-retail-investors",
    date: "2025-10-14",
    labels: [ArticleLabel.FINANCE101, ArticleLabel.QUANT],
    summary:
      "The structural asymmetries (capital, information, technology, regulation) between institutions and retail investors, common manipulation tactics (front-running, spoofing, stop-loss cascades, pump-and-dump), and a practical self-defense framework.",
  },
  {
    path: "quant/stock-factor-models-fama-french",
    title: "Stock Factor Models: From CAPM to the Fama-French Five-Factor Model",
    articleSlug: "stock-factor-models-comprehensive-guide",
    date: "2025-10-16",
    labels: [ArticleLabel.QUANT],
    summary:
      "The evolution of factor models from CAPM through the Fama-French three/five-factor models and Carhart's momentum factor, the Fama-French 2x3 sort construction, the 'Factor Zoo' data-snooping problem, and practical implementation challenges.",
  },
  {
    path: "option-strategy/volatility-smile-skew",
    topics: ["Volatility & VRP"],
    title: "The Volatility Smile and Skew: Why Black-Scholes Fails in Practice",
    articleSlug: "volatility-smile-quantitative-analysis-market-structure-sentiment-arbitrage",
    date: "2025-10-18",
    labels: [ArticleLabel.OPTIONS, ArticleLabel.QUANT],
    summary:
      "Why implied volatility varies by strike instead of staying flat as Black-Scholes predicts, what the smile/skew shape reveals about market sentiment, and the higher-order Greeks (Vanna, Volga, Charm) used to manage 'smile risk'.",
  },
  {
    path: "quant/vix-fear-gauge-guide",
    title: "The VIX Index: Reading the Market's Fear Gauge",
    articleSlug: "vix-index-comprehensive-guide-market-volatility",
    date: "2025-10-20",
    labels: [ArticleLabel.QUANT],
    summary:
      "How the VIX is constructed and interpreted — the asymmetric volatility feedback loop with the S&P 500, VIX Rank/Percentile for context, and why contango decay makes VIX ETPs unsuitable for long-term holding.",
  },
  {
    path: "stock-analysis/insider-trading-signal-form4",
    title: "Insider Trading: Form 4 Filings",
    articleSlug: "insiders-edge-comprehensive-analysis",
    date: "2025-10-22",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary:
      "How to read Form 4 insider trading filings as a sentiment signal — why insider buys are more informative than sells, the strongest bullish patterns (open-market purchases, cluster buys, contrarian buying), and landmark cases that shaped today's disclosure rules.",
  },
  {
    path: "quant/volatility-forecasting-garch-to-deep-learning",
    title: "Volatility Forecasting: From GARCH to Deep Learning",
    articleSlug: "quantitative-analyst-guide-volatility-forecasting",
    date: "2025-10-24",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary:
      "The evolution of volatility forecasting from GARCH and its asymmetric extensions (GJR-GARCH, EGARCH) through tree ensembles to deep learning, covering the Heston stochastic volatility model, volatility arbitrage deployment, and why no model is immune to black swans.",
  },
  {
    path: "option-strategy/vertical-credit-spreads",
    topics: ["Spreads & Structures", "Income & Writing"],
    title: "Vertical Credit Spreads: Defined-Risk Premium Selling",
    articleSlug: "vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling",
    date: "2025-10-25",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "How Bull Put and Bear Call credit spreads work as a defined-risk alternative to naked option selling, covering strike/width selection by delta, the 45 DTE / 50% profit / 21 DTE management rules, and common mistakes to avoid.",
  },
  {
    path: "finance101/retirement-planning-framework-accumulation-decumulation",
    title: "The Retirement Architect Framework: From Savings Target to Sustainable Income",
    articleSlug: "retirement-architect-guide-secure-retirement",
    date: "2025-10-27",
    labels: [ArticleLabel.FINANCE101],
    summary:
      "How the 25x/4%/80% rules interlock, why sequence-of-returns risk makes decumulation fundamentally different from accumulation, and practical frameworks (bucket strategy, Social Security timing, fiduciary vetting) for building a retirement plan.",
  },
  {
    path: "stock-analysis/premarket-gap-trading-framework",
    title: "Trading the Opening Gap: A Pre-Market Signal Framework",
    articleSlug: "quantitative-approach-predicting-market-direction-premarket-data",
    date: "2025-10-29",
    labels: [ArticleLabel.STOCK_ANALYSIS, ArticleLabel.QUANT],
    summary:
      "A multi-factor framework for reading pre-market signals (index futures, VIX, news catalyst quality, gap type) to decide between Gap and Go, Fading the Gap, and Buying the Dip strategies, plus the risk management rules for trading the open.",
  },
  {
    path: "ai-ml/ml-assumptions-quantitative-trading",
    title: "Why Machine Learning Assumptions Break in Financial Markets",
    articleSlug: "foundational-assumptions-machine-learning-quantitative-trading",
    date: "2025-10-31",
    labels: [ArticleLabel.MACHINE_LEARNING, ArticleLabel.QUANT],
    summary:
      "How non-stationarity, volatility clustering, and fat tails violate the core assumptions behind ML algorithms in financial markets, and how tree-based vs. deep learning models each handle (or fail to handle) these violations.",
  },
  {
    path: "option-strategy/volume-open-interest-analysis",
    topics: ["Greeks & Mechanics"],
    title: "Decoding Options Volume and Open Interest",
    articleSlug: "decoding-options-market-volume-open-interest-analysis",
    date: "2025-11-01",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "How to read options Volume and Open Interest together (not in isolation) to gauge conviction behind a price move, use the Put/Call Ratio as a contrarian sentiment gauge, and spot unusual options activity via Volume > OI signals.",
  },
  {
    path: "macro/stock-market-valuation-equity-risk-premium",
    title: "Beyond P/E: Reading Market Valuation Through the Equity Risk Premium and Fed Model",
    articleSlug: "high-altitude-deconstructing-us-stock-market-valuation",
    date: "2025-11-03",
    labels: [ArticleLabel.MACRO],
    summary:
      "Why absolute valuation metrics like P/E and CAPE only tell part of the story in late 2025 — how the Equity Risk Premium and Fed Model reframe valuation relative to bond yields, and what's supporting vs. threatening current market levels.",
  },
  {
    path: "finance101/retirement-insurance-products-annuities-ltc-lirp",
    title: "Annuities, LTC Insurance, and LIRPs: Risk Transfer vs. Investment Return",
    articleSlug: "quantitative-analysis-insurance-products-retirement-security",
    date: "2025-11-04",
    labels: [ArticleLabel.FINANCE101],
    summary:
      "A quantitative look at annuities, long-term care insurance, and life insurance retirement plans (LIRPs) as risk-transfer tools rather than investments, covering fee drag, tax-equivalent yield, and a suitability matrix by net worth.",
  },
  {
    path: "form13f/burry-circular-financing-ai-short-thesis",
    title: "Burry's Circular Financing Thesis (Nov 2025)",
    articleSlug: "ai-antithesis-deconstructing-michael-burry-q3-2025-pivot",
    date: "2025-11-05",
    labels: [ArticleLabel.FORM13F],
    summary:
      "How to read Scion Asset Management's Q3 2025 13F pivot from a bullish call-heavy portfolio to a concentrated short against Nvidia and Palantir, the 'circular financing' thesis behind it, and why 13F filings are always a lagging signal.",
  },
  {
    path: "macro/all-weather-risk-parity-strategy",
    title: "Ray Dalio's All Weather Strategy: Risk Parity in a New Economic Climate",
    articleSlug: "all-weather-strategy-new-economic-climate",
    date: "2025-11-06",
    labels: [ArticleLabel.FINANCE101, ArticleLabel.MACRO],
    summary:
      "How Ray Dalio's All Weather strategy uses risk parity and the Four Seasons framework to build resilience across economic regimes, why the 2022 stock-bond correlation breakdown stress-tested it, and whether the formula (vs. the underlying philosophy) still holds up today.",
  },
  {
    path: "option-strategy/option-greeks-overview",
    topics: ["Greeks & Mechanics"],
    title: "The Option Greeks: Delta, Gamma, Theta, Vega, and Rho Explained",
    articleSlug: "option-greeks-traders-poetic-guide-risk",
    date: "2025-11-07",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "A practical guide to the five Option Greeks — Delta, Gamma, Theta, Vega, and Rho — covering what each measures, how buyers and sellers are exposed differently, and the core trading applications for hedging, income, and volatility strategies.",
  },
  {
    path: "stock-analysis/tesla-ai-binary-bet-valuation",
    title: "Tesla's AI Binary Bet (Nov 2025)",
    articleSlug: "tesla-tsla-fundamental-dashboard-ai-binary-bet",
    date: "2025-11-09",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary:
      "Tesla trades at a tech-company multiple on an auto-company P&L, pricing in a binary bet on AI/robotics breakthroughs. Covers the valuation disconnect, the Chinese EV competitive threat, AI execution risk, and a probability-weighted scenario analysis.",
  },
  {
    path: "form13f/berkshire-succession-insurance-float-model",
    title: "Berkshire's Succession (Nov 2025)",
    articleSlug: "buffett-legacy-berkshire-succession",
    date: "2025-11-11",
    labels: [ArticleLabel.FORM13F],
    summary:
      "How Berkshire Hathaway's new triumvirate leadership (Abel, Combs, Weschler) and its ~$175B insurance float set it apart from a mutual fund, plus the bull/bear case on the stock following Buffett's transition to Chairman.",
  },
  {
    path: "finance101/core-satellite-etf-strategy",
    title: "Core-Satellite Investing: Balancing Benchmark ETFs with High-Growth Alternatives",
    articleSlug: "beyond-benchmarks-high-growth-etf-alternatives-qqq-voo",
    date: "2025-11-12",
    labels: [ArticleLabel.FINANCE101],
    summary:
      "A framework for balancing low-cost benchmark ETFs like VOO and QQQ against higher-growth alternatives like VGT, XLK, ARKK, and ICLN. Covers concentration risk, narrative risk, and the Core-Satellite strategy for capturing upside without abandoning portfolio stability.",
  },
  {
    path: "quant/signal-noise-filtering-techniques",
    title: "Signal in the Noise: Filtering Techniques for Quant Trading",
    articleSlug: "signal-noise-comprehensive-analysis-filtering-techniques-quantitative-trading",
    date: "2025-11-13",
    labels: [ArticleLabel.QUANT],
    summary:
      "A deep dive into the mathematical and computational techniques used in quantitative finance to extract durable, predictive patterns from chaotic market data. Explores moving averages, Kalman filters, Butterworth filters, HP filters, and their synergy with machine learning for robust alpha generation.",
  },
  {
    path: "option-strategy/short-straddles-strangles",
    topics: ["Spreads & Structures", "Income & Writing"],
    title: "Mastering Short Volatility: Straddles & Strangles",
    articleSlug: "mastering-short-volatility-straddles-strangles-systematic-premium-collection",
    date: "2025-11-15",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "A comprehensive quantitative framework for profiting from the Volatility Risk Premium through short straddles and strangles. Master the Greeks, position sizing, optimal market conditions, and defensive adjustments for harvesting theta decay while managing gamma risk in systematic options selling strategies.",
  },
  {
    path: "form-13f/druckenmiller-q3-2025-bessent-edge",
    title: "Druckenmiller Q3 2025: Rotation, Conviction & the Bessent Edge",
    articleSlug: "druckenmiller-q3-2025-rotation-conviction-bessent-edge",
    date: "2025-11-16",
    labels: [ArticleLabel.FORM13F],
    summary:
      "A deep dive into Stanley Druckenmiller's Q3 2025 portfolio reveals a masterclass in aggressive rotation, high-conviction concentration, and macro insights influenced by a unique 'Duquesne-Treasury Corridor.' Explore the 63% turnover, massive healthcare bet, and the strategic implications of the Bessent connection.",
  },
  {
    path: "form-13f/david-tepper-appaloosa-q3-2025",
    title: "The Contrarian Master (Q3 2025)",
    articleSlug: "david-tepper-contrarian-master-q3-2025-portfolio",
    date: "2025-11-18",
    labels: [ArticleLabel.FORM13F],
    summary:
      "An exhaustive analysis of David Tepper's investment philosophy, legendary trades, and Q3 2025 portfolio moves. From his $7 billion 2009 crisis trade to his latest contrarian bets on Whirlpool and American Airlines, explore the four pillars of the Appaloosa doctrine and actionable lessons for investors.",
  },
  {
    path: "ai-ml/deep-learning-quant-trading-evolution",
    title: "The Evolution of Deep Learning in Quantitative Trading",
    articleSlug: "evolution-deep-learning-quantitative-trading-mlps-transformers",
    date: "2025-11-20",
    labels: [ArticleLabel.MACHINE_LEARNING, ArticleLabel.QUANT],
    summary:
      "A comprehensive technical survey charting the evolution from traditional econometric models to sophisticated deep neural networks in quantitative finance. Explores MLPs, LSTMs, CNNs, Autoencoders, Deep Reinforcement Learning, GNNs, and Transformers—analyzing their unique properties, applications in trading, and critical limitations in high-noise, non-stationary financial markets.",
  },
  {
    path: "quant/vrp-theory-measurement",
    title: "Demystifying the Volatility Risk Premium: Theory & Measurement",
    articleSlug: "demystifying-volatility-risk-premium-theory-measurement-trading",
    date: "2025-11-22",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "A comprehensive deep research analysis of the Volatility Risk Premium (VRP)—the persistent tendency for implied volatility to exceed realized volatility. Explores the economic foundations, academic research, quantitative measurement techniques, and practical harvesting strategies from retail vertical spreads to institutional variance swaps.",
  },
  {
    path: "stock-analysis/nvidia-crush-despite-beat",
    title: "NVIDIA: The Crush Despite the Beat (Nov 2025)",
    articleSlug: "nvidia-deep-dive-crush-despite-beat-analyzing-valuation",
    date: "2025-11-23",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary:
      "A comprehensive quantitative analysis of NVIDIA's Q3 FY26 earnings, exploring the 'pricing for perfection' phenomenon, Michael Burry's short thesis, the Blackwell supercycle, and strategic implications for retail investors navigating the AI semiconductor landscape.",
  },
  {
    path: "finance101/tax-loss-harvesting",
    title: "Tax-Loss Harvesting: Strategy, Execution & Risk Mitigation",
    articleSlug: "comprehensive-analysis-tax-loss-harvesting-strategy-execution-risk-mitigation",
    date: "2025-11-24",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive deep research analysis of tax-loss harvesting as a sophisticated portfolio management discipline. Explores strategic implementation, wash-sale rule compliance, replacement security selection, and advanced techniques including direct indexing and automated execution for maximizing after-tax returns.",
  },
  {
    path: "quant/monte-carlo-finance-overview",
    title: "Monte Carlo Simulation for Quant Finance — Overview",
    articleSlug: "monte-carlo-simulation-quantitative-finance-stochastic-modeling",
    date: "2025-11-26",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive deep research analysis of Monte Carlo simulation as the cornerstone of modern quantitative finance. Explores stochastic differential equations, variance reduction techniques, risk management applications, and the critical limitations in capturing alpha—providing a rigorous framework for derivative pricing, VaR/CVaR calculation, and algorithmic strategy validation.",
  },
  {
    path: "option-strategy/vrp-spx-options-selling",
    topics: ["Volatility & VRP", "Income & Writing"],
    title: "Mastering the Volatility Risk Premium: SPX Options Selling",
    articleSlug: "mastering-volatility-risk-premium-spx-options-selling",
    date: "2025-11-28",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "An institutional-grade deep dive into selling SPX options to harvest the Volatility Risk Premium. Understand why institutions structurally overpay for protection, compare SPX vs XSP vs SPY instruments, master tax optimization with Section 1256, and discover the optimal strategy for your capital level and risk tolerance.",
  },
  {
    path: "stock-analysis/analyst-consensus-target-prices",
    title: "Decoding the Analyst Consensus",
    articleSlug: "decoding-analyst-consensus-target-prices-conflicts-epistemology",
    date: "2025-12-01",
    labels: [ArticleLabel.STOCK_ANALYSIS, ArticleLabel.FINANCE101],
    summary:
      "Target prices are not predictions—they are marketing tools. A forensic guide to TipRanks, Bloomberg, and the epistemology of Wall Street research. Explore the conflict engine, platform wars, leverage traps, and tactical strategies for the intelligent investor navigating analyst consensus.",
  },
  {
    path: "quant/monte-carlo-robustness-protocols",
    title: "Monte Carlo Simulation for Quant Trading Robustness",
    articleSlug: "monte-carlo-robustness-protocols-stress-testing-systematic-trading",
    date: "2025-12-03",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive framework for validating quantitative trading strategies through Monte Carlo simulation. Explores IID Bootstrap, Block Bootstrap, Permutation, and Surrogate Data methods to quantify the Probability of Backtest Overfitting (PBO), estimate true drawdown distributions, and calculate Deflated Sharpe Ratios for robust strategy deployment.",
  },
  {
    path: "macro/grey-rhino-yen-carry-trade",
    title: "The Grey Rhino: Yen Carry Trade Unwind (Dec 2025)",
    articleSlug: "grey-rhino-monetary-divergence-yen-carry-trade-unwind",
    date: "2025-12-07",
    labels: [ArticleLabel.MACRO],
    summary:
      "A comprehensive analysis of the Bessent Hypothesis examining how the Bank of Japan's rate hikes colliding with US Federal Reserve easing could trigger a historic unwind of the $20 trillion Yen Carry Trade. Explores the structural shift in global liquidity, the anatomy of the doom loop, and sector-specific implications for investors navigating this grey rhino event.",
  },
  {
    path: "finance101/trusts-estate-planning",
    title: "A Comprehensive Guide to Trusts: Estate Planning",
    articleSlug: "comprehensive-guide-trusts-estate-planning",
    date: "2025-12-09",
    labels: [ArticleLabel.FINANCE101],
    summary:
      "Master the power of trusts—a dynamic framework for managing, protecting, and transferring wealth across generations. Explore the anatomy of trusts, revocable vs. irrevocable structures, specialized trust types, strategic advantages, and practical implementation guidance for securing your financial legacy.",
  },
  {
    path: "quant/monte-carlo-derivative-pricing",
    title: "Monte Carlo Simulation for Derivative Pricing",
    articleSlug: "monte-carlo-advanced-stochastic-modeling-derivatives-cva",
    date: "2025-12-11",
    labels: [ArticleLabel.QUANT],
    summary:
      "An overview of the numerical techniques and stochastic models essential for pricing exotic derivatives and managing XVA risk. Explore jump-diffusion processes, stochastic volatility frameworks, and nested simulation for CVA.",
  },
  {
    path: "option-strategy/leap-put-selling",
    topics: ["Income & Writing"],
    title: "Selling LEAP Puts: Institutional Mechanics & Retail Traps",
    articleSlug: "selling-long-dated-put-options-leaps-institutional-mechanics-volatility-arbitrage",
    date: "2025-12-13",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "A comprehensive analysis of LEAP puts as instruments for strategic acquisition and volatility arbitrage, distinct from short-term income strategies. Explores the Greek profile dominance of Vega over Theta, institutional applications from Buffett's acquisition strategy to dividend arbitrage counterparties, and the quantitative pitfalls of illiquidity, capital inefficiency, and the Vega time bomb that destroy retail value.",
  },
  {
    path: "finance101/es-nq-futures",
    title: "ES & NQ Futures: The Engine Room of the Global Economy",
    articleSlug: "es-nq-futures-engine-room-global-economy",
    date: "2025-12-16",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive technical guide to S&P 500 and Nasdaq-100 E-mini futures for investors, traders, and observers. Master contract specifications, the micro revolution democratizing futures access, market structure, critical pitfalls, and the strategic utility of futures as economic dashboard indicators.",
  },
  {
    path: "quant/worldquant-alpha-factory",
    title: "The WorldQuant Alpha Factory",
    articleSlug: "worldquant-alpha-factory-industrialized-quantitative-signal-generation",
    date: "2025-12-18",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive deep research analysis of WorldQuant's revolutionary 'Alpha Factory' system—an industrial-scale platform designed to mass-produce predictive signals. Explores the crowdsourced BRAIN platform, the strategic solution to alpha decay through diversification, and the paradigm shift from finding brilliant strategies to manufacturing disposable, uncorrelated alphas at exponential scale.",
  },
  {
    path: "option-strategy/single-leg-long-put",
    topics: ["Spreads & Structures"],
    title: "The Single Leg Long Put: Asymmetric Utility",
    articleSlug: "single-leg-put-strategy-asymmetric-utility",
    date: "2025-12-20",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "The definitive instrument for asymmetric utility. Master the art of profiting from decline and hedging catastrophic tail risk through single leg long puts. A comprehensive deep research analysis exploring the mechanics, Greeks, strategic motivations, market demographics, and the structural 'crash premium' that makes puts expensive.",
  },
  {
    path: "quant/dspx-dispersion-index",
    title: "DSPX: The Cboe S&P 500 Dispersion Index",
    articleSlug: "dspx-measure-market-divergence-cboe-sp500-dispersion-index",
    date: "2025-12-22",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "While VIX measures how much the market fears a storm, DSPX measures how differently the ships are steering. A comprehensive deep research analysis of the Cboe S&P 500 Dispersion Index—the critical metric for understanding implied correlation, idiosyncratic risk, and the opportunity landscape for stock pickers versus passive indexers.",
  },
  {
    path: "crypto/web3-defi-retail-investors",
    title: "The Web3 Revolution: DeFi for Retail Investors",
    articleSlug: "web3-revolution-defi-retail-investors",
    date: "2025-12-23",
    labels: [ArticleLabel.FINANCE101],
    summary:
      "Web3 represents a fundamental paradigm shift towards a 'Read-Write-Own' internet built on blockchain, smart contracts, and cryptography. Explore how DeFi is transforming retail investors from passive consumers into active participants and co-owners of market infrastructure.",
  },
  {
    path: "quant/hedge-fund-performance-metrics",
    title: "Measuring the Immeasurable: Hedge Fund Performance Metrics",
    articleSlug: "measuring-immeasurable-hedge-fund-performance-metrics",
    date: "2025-12-25",
    labels: [ArticleLabel.QUANT],
    summary:
      "From Alpha generation to handling complex cash flows, understand the metrics that matter. Master Sharpe ratios, Sortino ratios, time-weighted vs money-weighted returns, VaR/CVaR, attribution analysis, and the art of benchmark selection for evaluating hedge fund strategies.",
  },
  {
    path: "options/utilization-risk-framework",
    title: "When to Use (and Avoid) Options: A Deployment Framework",
    articleSlug: "strategic-options-utilization-risk-comprehensive-framework",
    date: "2025-12-27",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "A comprehensive framework for understanding when to deploy options for hedging, income, and speculation—and crucially, when to avoid them to preserve capital. Covers contract anatomy, order mechanics, the Greeks, and the structural risks (IV crush, 0DTE gamma, liquidity traps) that turn options into a capital-destruction machine.",
  },
  {
    path: "macro/2025-retrospective",
    title: "2025 Financial Market Retrospective",
    articleSlug: "2025-financial-market-retrospective-seven-pivotal-events",
    date: "2025-12-29",
    labels: [ArticleLabel.MACRO],
    summary:
      "A comprehensive analysis of 2025's most market-moving events, from the DeepSeek efficiency shock to the gold super-cycle. Explore the tactical playbook that emerged from tariff threats, AI capex fatigue, and the death of linear market narratives.",
  },
  {
    path: "macro/2026-outlook",
    title: "2026 Macroeconomic Shift",
    articleSlug: "navigating-2026-shift-comprehensive-macro-economic-outlook",
    date: "2025-12-31",
    labels: [ArticleLabel.MACRO],
    summary:
      "As the global economy exits the post-pandemic recovery phase, 2026 is characterized by a Great Normalization where slowing growth meets sticky inflation, testing the soft-landing narrative.",
  },
  {
    path: "options/iron-condor",
    title: "The Iron Condor: A Quantitative Approach to Delta-Neutral Premium Harvesting",
    articleSlug: "iron-condor-quantitative-delta-neutral-premium-harvesting",
    date: "2026-01-02",
    labels: [ArticleLabel.OPTIONS, ArticleLabel.QUANT],
    summary:
      "A comprehensive analysis of the Iron Condor strategy, exploring the mathematical edge through variance risk premium, optimal execution parameters, and defensive management techniques. Master the art of selling overpriced volatility while managing the Greeks and structural risks.",
  },
  {
    path: "quant/architecture-structured-notes",
    title: "The Architecture of Structured Notes",
    articleSlug: "architecture-structured-notes-comprehensive-investors-guide",
    date: "2026-01-04",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "Deconstructing senior, unsecured debt obligations linked to market performance. Understand the mechanics, inherent risks, and strategic portfolio suitability of these hybrid instruments that combine zero-coupon bonds with derivative packages.",
  },
  {
    path: "quant/geometry-of-rates",
    title: "The Geometry of Rates: Principal Component Analysis in Modern Fixed Income Markets",
    articleSlug: "geometry-of-rates-pca-fixed-income-markets",
    date: "2026-01-06",
    labels: [ArticleLabel.QUANT],
    summary:
      "Mastering Principal Component Analysis (PCA) to decode the complex movements of the Fixed Income yield curve. Learn how to transform 30+ correlated yields into 3 independent factors for superior risk management and alpha generation.",
  },
  {
    path: "crypto/bitcoin",
    title: "The Digital Sovereign (Bitcoin Architecture)",
    articleSlug: "digital-sovereign-bitcoin-architecture-mining-investment-guide",
    date: "2026-01-12",
    labels: [ArticleLabel.FINANCE101],
    summary:
      "An interactive deep-dive into Bitcoin's technical architecture, mining mechanics, privacy considerations, and modern investment landscape. From UTXO models to computational lotteries, explore the complete ecosystem of the world's first cryptocurrency.",
  },
  {
    path: "quant/industrialization-volatility",
    title: "The Industrialization of Volatility",
    articleSlug: "industrialization-volatility-hedge-funds-operational-architecture",
    date: "2026-01-08",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive deep research analysis of the operational architecture powering modern volatility-focused hedge funds. From data hygiene and Greek attribution to algorithmic execution and AI-powered deep hedging, explore the systematic framework that transforms market volatility into alpha generation.",
  },
  {
    path: "stock-analysis/optionalpha-select",
    title: "OptionAlpha Select: Systematic Underlyer Selection for Premium-Selling Strategies",
    articleSlug: "optionalpha-select-systematic-underlyer-selection-premium-selling",
    date: "2026-01-10",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary:
      "A comprehensive framework for sustainable option selling success through disciplined underlyer selection. Master the three foundational pillars—asset quality, market liquidity, and volatility engine—to systematically harvest the Volatility Risk Premium while avoiding catastrophic losses from yield-reaching behavior.",
  },
  {
    path: "quant/systematic-vs-model",
    title: "Systematic vs. Model Quantitative Trading",
    articleSlug: "systematic-vs-model-quantitative-trading-evolution",
    date: "2026-01-14",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary:
      "A comprehensive deep dive into the fundamental differences between traditional systematic trading and modern model-based quantitative approaches. From deterministic rule-based strategies to probabilistic machine learning models, explore how algorithmic trading has evolved and where the industry is heading.",
  },
  {
    path: "macro/great-decoupling-2026",
    title: "The Great Decoupling (2026 Macro Analysis)",
    articleSlug: "great-decoupling-2026-asset-bubble-mathematical-analysis",
    date: "2026-08-07",
    labels: [ArticleLabel.MACRO],
    summary:
      "A deep dive into the 2026 'Everything Bubble', exploring the Four Pillars of Collapse, the Private Credit Minsky Moment, and scenario predictions ranging from a soft landing to a deflationary crash.",
  },
  {
    path: "option-strategy/single-leg-long-call",
    topics: ["Spreads & Structures"],
    title: "The Single-Leg Long Call",
    articleSlug: "single-leg-long-call-asymmetric-leverage-options-trading",
    date: "2026-01-16",
    labels: [ArticleLabel.OPTIONS, ArticleLabel.QUANT],
    summary:
      "Master the art of asymmetric leverage with the single-leg long call. Learn why retail traders lose with calls while institutions use them for risk management and capital efficiency. From convexity theory to strike selection strategies.",
  },
  {
    path: "finance101/gift-phantom-trader-psychology-winning-through-losing",
    title: "The Gift of the Phantom Trader",
    articleSlug: "gift-phantom-trader-psychology-winning-through-losing",
    date: "2026-01-20",
    labels: [ArticleLabel.FINANCE101, ArticleLabel.BOOK],
    summary:
      "A comprehensive analysis of Art Simpson's legendary trading philosophy from the Futures Magazine forums. Learn the three laws of survival, the 3:2:1 pyramiding ratio, and why successful trading is about superior behavior modification, not superior knowledge.",
  },
  {
    path: "quant/saa-framework",
    title: "Strategic Asset Allocation Quantitative Framework",
    articleSlug: "strategic-asset-allocation-quantitative-framework-wealth-preservation",
    date: "2026-08-07",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive guide to the institutional quantitative framework for Strategic Asset Allocation (SAA). Explores Human Capital integration, macroeconomic regime transitions (Growth & Inflation), and portfolio optimization mathematics like the Black-Litterman model.",
  },
  {
    path: "quant/efficient-frontier-portfolio-optimization-mathematics",
    title: "The Efficient Frontier",
    articleSlug: "efficient-frontier-portfolio-optimization-mathematics",
    date: "2026-01-22",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive deep dive into the mathematics, constraints, and software architecture used by hedge funds to transform raw signals into optimal portfolios. From Markowitz mean-variance optimization to advanced hierarchical risk parity models.",
  },
  {
    path: "quant/black-scholes-analytics-laboratory-axioms-option-pricing",
    title: "Black-Scholes Analytics",
    articleSlug: "black-scholes-analytics-laboratory-axioms-option-pricing",
    date: "2026-01-24",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive masterclass on the Black-Scholes-Merton model - from the stochastic engine of Itô's Lemma to the risk-neutral measure transformation. Master the mathematical axioms, Greek sensitivities, trader heuristics, and structural limitations of the standard ruler for pricing uncertainty.",
  },
  {
    path: "quant/science-robust-alpha-eliminating-overfitting-statistical-validation",
    title: "The Science of Robust Alpha",
    articleSlug: "science-robust-alpha-eliminating-overfitting-statistical-validation",
    date: "2026-01-28",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary:
      "A comprehensive masterclass on Financial Machine Learning (FML). Master the statistical armor needed to deflate performance claims, implement triple barrier labeling, and build robust alpha generation systems that survive extreme low signal-to-noise environments.",
  },
  {
    path: "quant/asset-allocation",
    title: "Strategic & Tactical Asset Allocation",
    articleSlug: "strategic-tactical-asset-allocation-comprehensive-guide",
    date: "2026-08-07",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive guide to the two primary frameworks for managing asset allocation: Strategic Asset Allocation (SAA) and Tactical Asset Allocation (TAA). Explores modern portfolio theory, sector rotation, and performance attribution analysis.",
  },
  {
    path: "quant/mastering-buffered-yield-strategies-defined-outcome-investing",
    title: "Mastering Buffered Yield Strategies",
    articleSlug: "mastering-buffered-yield-strategies-defined-outcome-investing",
    date: "2026-01-30",
    labels: [ArticleLabel.QUANT],
    summary:
      "Deconstruct the 'Defined Outcome' trade and learn how to engineer your own risk profile using Options, ETFs, and Structured Notes. Master the Put Spread Collar mechanics, understand the trade-offs between upside caps and downside buffers, and navigate the critical differences between ETFs and Structured Notes.",
  },
  {
    path: "macro/warsh-era",
    title: "The Warsh Era (Feb 2026)",
    articleSlug: "warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism",
    date: "2026-02-01",
    labels: [ArticleLabel.MACRO],
    summary:
      "A comprehensive analysis of Kevin Warsh's nomination as Federal Reserve Chair and the paradigm shift from financial dominance to supply-side monetarism.",
  },
  {
    path: "quant/prediction-markets-financialization-truth-complete-trading-guide",
    title: "Prediction Markets Complete Trading Guide",
    articleSlug: "prediction-markets-financialization-truth-complete-trading-guide",
    date: "2026-02-03",
    labels: [ArticleLabel.QUANT],
    summary:
      "Comprehensive analysis of prediction markets from Kalshi to Polymarket. Learn market mechanics, strategic trading approaches, risk management, and how to profit from the financialization of information.",
  },
  {
    path: "option-strategy/calendar-spreads",
    topics: ["Spreads & Structures"],
    title: "Calendar Spread Architecture",
    articleSlug: "calendar-spread-architecture-time-decay-options-trading",
    date: "2026-02-07",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "A multidimensional instrument arbitrage that exploits the distinct decay characteristics of options across different temporal horizons. Master the profit tent profile, Greek interactions, and quantitative reality of trading calendars.",
  },
  {
    path: "quant/convergence-analysis-quantitative-finance-measure-theory",
    title: "Convergence Analysis in Quantitative Finance",
    articleSlug: "convergence-analysis-quantitative-finance-measure-theory",
    date: "2026-02-09",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive exploration of functional analysis and convergence modes in quantitative finance. From Banach spaces to stochastic calculus, understand how mathematical limits shape derivative pricing, risk management, and computational methods.",
  },
  {
    path: "finance101/li-lu-himalaya",
    title: "Li Lu: Masterclass in Value Investing (Mar 2026)",
    articleSlug: "masterclass-li-lu-himalaya-capital-investment-philosophy",
    date: "2026-03-05",
    labels: [ArticleLabel.FINANCE101, ArticleLabel.STOCK_ANALYSIS],
    summary:
      "An in-depth look at the investment philosophy of Li Lu, Charlie Munger's sole outside manager, exploring his extreme portfolio concentration and investigative diligence.",
  },
  {
    path: "options/vertical-debit-spreads",
    title: "Vertical Debit Spreads: Strategic Architecture",
    articleSlug: "vertical-debit-spreads-strategic-architecture-defined-risk-trading",
    date: "2026-03-01",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "A comprehensive guide to why professionals trade defined-risk vertical debit spreads, covering the mathematics of advantage, the Greeks edge, and critical pre-flight checklists.",
  },
  {
    path: "equities/nvidia-earnings-paradox",
    title: "The Nvidia Earnings Paradox (Feb 2026)",
    articleSlug: "decoding-reversal-nvidia-february-2026-earnings-paradox",
    date: "2026-02-28",
    labels: [ArticleLabel.STOCK_ANALYSIS],
    summary:
      "A deep dive into why Nvidia's perfect Q4 2026 earnings report resulted in a violent intraday sell-off, driven by IV crush, negative gamma, and institutional positioning.",
  },
  {
    path: "macro/private-credit-architecture",
    title: "Private Credit Architecture & Vulnerabilities",
    articleSlug: "architecture-private-credit-structural-mechanics-vulnerabilities",
    date: "2026-02-12",
    labels: [ArticleLabel.MACRO],
    summary:
      "An exploration of the multi-trillion-dollar Private Credit market, focusing on the architecture of Direct Lending, systemic risks, and the implications of covenant-lite loans and retailization.",
  },
  {
    path: "quant/expected-returns-modeling",
    title: "Modeling Expected Returns & Portfolio Theory",
    articleSlug: "modeling-expected-returns-quantitative-foundation-modern-portfolio-theory",
    date: "2026-02-11",
    labels: [ArticleLabel.QUANT],
    summary:
      "A deep dive into the evolution of return modeling, from the precision paradox of discounted cash flows to the Bayesian elegance of the Black-Litterman framework.",
  },
  {
    path: "quant/structured-finance",
    title: "Structured Finance 2026",
    articleSlug: "structured-finance-2026-rmbs-cmbs-abs-pricing-models",
    date: "2026-02-12",
    labels: [ArticleLabel.QUANT],
    summary:
      "Advanced Tutorial on RMBS, CMBS, and ABS Pricing Models. Master the mechanics of credit enhancement and stochastic valuation in structured finance.",
  },
  {
    path: "quant/intraday-option-speculation",
    title: "The Microstructure of Intraday Option Speculation",
    articleSlug: "microstructure-intraday-option-speculation-mechanics-strategies-risks",
    date: "2026-02-13",
    labels: [ArticleLabel.QUANT],
    summary:
      "An exhaustive analysis of the option day trading ecosystem, deconstructing 0DTE contracts, Gamma Exposure (GEX), and the structural asymmetry between retail traders and institutional market makers.",
  },
  {
    path: "macro/investment-clock-framework",
    title: "The Investment Clock Framework",
    articleSlug: "investment-clock-framework-quantitative-macro-regime-detection",
    date: "2026-02-15",
    labels: [ArticleLabel.MACRO, ArticleLabel.QUANT],
    summary:
      "A comprehensive technical analysis of the Investment Clock—a quantitative framework for tactical asset allocation through growth and inflation cycle identification. Includes implementation methodology, statistical validation, and modern market adaptations.",
  },
  {
    path: "quant/stochastic-calculus-itos-lemma",
    title: "The Stochastic Calculus of Finance (Itô's Lemma)",
    articleSlug: "stochastic-calculus-finance-itos-lemma-comprehensive-treatise",
    date: "2026-02-17",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive treatise on Itô's Lemma: the mathematical bridge between the smooth world of Newton and the jagged reality of financial markets. Master the fundamental theorem that transforms stochastic differential equations into the Black-Scholes framework.",
  },
  {
    path: "quant/intraday-alpha-u-curve",
    title: "Intraday Alpha and the U-Curve Volatility Engine",
    articleSlug: "quantifying-intraday-alpha-u-curve-volatility-engine-institutional-flow",
    date: "2026-02-19",
    labels: [ArticleLabel.QUANT],
    summary:
      "A quantitative analysis of the U-Curve phenomenon in trading volume and volatility, exploring the mathematical framework and institutional flow dynamics that dictate intraday price action.",
  },
  {
    path: "ai-ml/agentic-rag-langchain",
    title: "Agentic RAG with LangChain",
    articleSlug: "architecting-agentic-retrieval-systems-langchain-proprietary-wikis",
    date: "2026-08-15",
    labels: [ArticleLabel.QUANT, ArticleLabel.GEN_AI],
    summary:
      "A technical guide to building agentic RAG systems that integrate LangChain with custom proprietary wikis — multi-hop reasoning, math-aware chunking, LangGraph workflows, and hierarchical agent swarms for quantitative finance.",
  },
  {
    path: "form-13f/coattail-investing",
    title: "Mastering Coattail Investing",
    articleSlug: "mastering-coattail-investing-sec-form-13f-analysis",
    date: "2026-02-21",
    labels: [ArticleLabel.FORM13F],
    summary:
      "A comprehensive tutorial on decoding institutional disclosures, avoiding latency traps, and following the Apex Allocators. Master the art of coattail investing through SEC Form 13F analysis and manager typology.",
  },
  {
    path: "form-13f/stanley-druckenmiller-duquesne",
    title: "The Duquesne Paradigm (Feb 2026)",
    articleSlug: "duquesne-paradigm-druckenmiller-portfolio-shift-q4-2025",
    date: "2026-02-23",
    labels: [ArticleLabel.FORM13F],
    summary:
      "Decoding Stanley Druckenmiller's $4.5B portfolio shift. A tutorial on macro-investing, the 'Warsh Effect,' and the pivot from AI hardware to energy infrastructure in the new economic regime.",
  },
  {
    path: "form-13f/li-lu-himalaya-capital",
    title: "Masterclass of Li Lu (Feb 2026)",
    articleSlug: "masterclass-li-lu-himalaya-capital-investment-philosophy",
    date: "2026-02-25",
    labels: [ArticleLabel.FORM13F],
    summary:
      "A comprehensive deep dive into Li Lu's investment philosophy, the four pillars of value investing, and the extreme portfolio concentration strategy that built Himalaya Capital into a multi-decade compounding machine.",
  },
  {
    path: "option-strategy/vertical-debit-spreads",
    topics: ["Spreads & Structures"],
    title: "Vertical Debit Spreads",
    articleSlug: "vertical-debit-spreads-strategic-architecture-defined-risk-trading",
    date: "2026-02-27",
    labels: [ArticleLabel.OPTIONS],
    summary:
      "Master the strategic architecture of defined-risk trading. A comprehensive guide to bull call spreads, bear put spreads, volatility regimes, the 70/30 strike selection rule, and the mathematics of advantage over naked options.",
  },
  {
    path: "stock-analysis/nvidia-earnings-paradox",
    title: "Nvidia's Feb 2026 Earnings Paradox",
    articleSlug: "decoding-reversal-nvidia-february-2026-earnings-paradox",
    date: "2026-03-01",
    labels: [ArticleLabel.STOCK_ANALYSIS, ArticleLabel.QUANT],
    summary:
      "An exhaustive, multi-disciplinary tutorial analyzing the complex market mechanics, macroeconomic headwinds, and structural forces that drove NVDA's severe post-earnings sell-off despite unprecedented fundamental success. Master the IV Crush, Gamma Flip, and institutional de-grossing dynamics.",
  },
  {
    path: "macro/private-credit",
    title: "Architecture of Private Credit",
    articleSlug: "architecture-private-credit-structural-mechanics-vulnerabilities",
    date: "2026-03-03",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive deep dive into the trillion-dollar private credit market. From direct lending mechanics to the retailization of illiquidity, explore the structural vulnerabilities, Wall Street realignment, and systemic risks in the shadow banking system.",
  },
  {
    path: "quant/modeling-expected-returns",
    title: "Modeling Expected Returns",
    articleSlug: "modeling-expected-returns-quantitative-foundation-modern-portfolio-theory",
    date: "2026-03-05",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive deep dive into the mathematical frameworks for estimating expected returns, from classical CAPM to advanced machine learning approaches. Explores the precision paradox, Black-Litterman evolution, and practical implementation strategies.",
  },
  {
    path: "option-strategy/tail-risk-skew",
    topics: ["Volatility & VRP"],
    title: "Quantitative Analysis of Tail Risk",
    articleSlug: "quantitative-analysis-tail-risk-cboe-skew-nations-skewdex",
    date: "2026-03-07",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive deep dive into CBOE SKEW and Nations SkewDex. Understanding the geometry of market fear beyond the VIX through model-free skewness estimation, fixed-strike parameterization, and the Vanna Crush mechanics that fuel market rallies.",
  },
  {
    path: "quant/advanced-pricing-models",
    title: "Advanced Quantitative Pricing Models",
    articleSlug: "beyond-black-scholes",
    date: "2026-03-09",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive guide to advanced quantitative pricing models bridging the gap between empirical reality and theoretical pricing via stochastic variance, discontinuous jumps, and affine term structures.",
  },
  {
    path: "quant/navigating-bull-to-bear",
    title: "Bull-to-Bear Regime Shifts",
    articleSlug: "navigating-bull-to-bear-regime-shift-quantitative-signals",
    date: "2026-04-03",
    labels: [ArticleLabel.QUANT],
    summary:
      "A deep-dive tutorial into quantitative signals, systematic factor rotation, and convexity monetization during transitional market phases.",
  },
  {
    path: "quant/institutional-hft",
    title: "Institutional HFT & Market Manipulation",
    articleSlug: "institutional-hft-market-manipulation-regulatory-framework",
    date: "2026-03-16",
    labels: [ArticleLabel.QUANT],
    summary:
      "A deconstruction of regulatory frameworks, quantitative strategies, and the Jane Street paradigm, exploring the boundary between algorithmic arbitrage and market manipulation.",
  },
  {
    path: "quant/order-flow-anomalies",
    title: "Order Flow Anomalies",
    articleSlug: "order-flow-anomalies-sweeps-footprint-mechanics-institutional-traps",
    date: "2026-03-11",
    labels: [ArticleLabel.QUANT],
    summary:
      "A deep analysis of market microstructure anomalies including intermarket sweeps, footprint chart mechanics, and the AMD framework to distinguish genuine accumulation from traps.",
  },
  {
    path: "quant/autocallable-strategy-engineered-yield-sideways-markets",
    title: "The Autocallable Strategy: Engineered Yield for Sideways Markets",
    articleSlug: "autocallable-strategy-engineered-yield-sideways-markets",
    date: "2026-03-14",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive technical guide to autocallable structured products and barrier mechanics.",
  },
  {
    path: "quant/institutional-hft-market-manipulation-regulatory-framework",
    title: "Institutional High-Frequency Trading & Market Manipulation",
    articleSlug: "institutional-hft-market-manipulation-regulatory-framework",
    date: "2026-03-16",
    labels: [ArticleLabel.QUANT],
    summary:
      "An exhaustive educational deconstruction of regulatory frameworks, quantitative strategies, and the contemporary Jane Street paradigm.",
  },
  {
    path: "ai-ml/evolution-autonomous-execution-function-calling-agentic-harnesses",
    title: "The Evolution of Autonomous Execution",
    articleSlug: "evolution-autonomous-execution-function-calling-agentic-harnesses",
    date: "2026-03-18",
    labels: [ArticleLabel.GEN_AI],
    summary:
      "A comprehensive technical deep-dive into the evolution of AI tool-calling architectures in quantitative finance.",
  },
  {
    path: "quant/mastering-volatility-definitive-guide-long-straddles-strangles",
    title: "Mastering Volatility",
    articleSlug: "mastering-volatility-definitive-guide-long-straddles-strangles",
    date: "2026-03-20",
    labels: [ArticleLabel.QUANT],
    summary:
      "The definitive technical guide to trading volatility as an asset class.",
  },
  {
    path: "quant/traders-guide-futures-specials-market-structure-anomalies",
    title: "The Trader's Guide to Futures Specials",
    articleSlug: "traders-guide-futures-specials-market-structure-anomalies",
    date: "2026-03-22",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive analysis of structural anomalies in futures markets - from the 'Widowmaker' spread to negative oil prices.",
  },
  {
    path: "ai-ml/claude-code-financial-cheatsheet-enterprise-reference",
    title: "Claude Code Financial Cheatsheet",
    articleSlug: "claude-code-financial-cheatsheet-enterprise-reference",
    date: "2026-03-24",
    labels: [ArticleLabel.GEN_AI],
    summary:
      "A comprehensive enterprise reference for using Claude Code in quantitative finance workflows.",
  },
  {
    path: "quant/risk-prism-architecture-modern-factor-models",
    title: "The Risk Prism",
    articleSlug: "risk-prism-architecture-modern-factor-models",
    date: "2026-03-26",
    labels: [ArticleLabel.QUANT],
    summary:
      "Master the architecture of modern factor models. Transition from asset-class silos to a surgical, multidimensional understanding of risk drivers.",
  },
  {
    path: "quant/unlocking-volatility-surface-risk-neutral-densities-butterfly-spread",
    title: "Unlocking the Volatility Surface",
    articleSlug: "unlocking-volatility-surface-risk-neutral-densities-butterfly-spread",
    date: "2026-03-28",
    labels: [ArticleLabel.QUANT],
    summary:
      "Master the theoretical framework of Risk-Neutral Densities (RND) and learn how to use the Butterfly Spread to extract market probabilities.",
  },
  {
    path: "ai-ml/building-interactive-financial-copilots-generative-ui-state-synchronization",
    title: "Building Interactive Financial Copilots",
    articleSlug: "building-interactive-financial-copilots-generative-ui-state-synchronization",
    date: "2026-03-30",
    labels: [ArticleLabel.GEN_AI],
    summary:
      "A comprehensive architectural masterclass on designing Generative UIs for financial dashboards.",
  },
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
    labels: [ArticleLabel.GEN_AI],
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
    title: "Structural Dynamics of the U.S. Dollar (Apr 2026)",
    articleSlug: "structural-dynamics-us-dollar-hegemony-dedollarization-macro-strategy",
    date: "2026-04-21",
    labels: [ArticleLabel.MACRO, ArticleLabel.QUANT],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.GEN_AI],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.MACRO],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.GEN_AI],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.GEN_AI],
    summary:
      "Exploration asserting that deep financial domain expertise and market intuition are indispensable in quantitative finance.",
  },
  {
    path: "quant/architecture-interoperability-agent-protocols-financial-systems",
    title: "The Architecture of Interoperability",
    articleSlug: "architecture-interoperability-agent-protocols-financial-systems",
    date: "2026-06-02",
    labels: [ArticleLabel.QUANT, ArticleLabel.GEN_AI],
    summary:
      "A comprehensive guide to Agent-to-Agent (A2A) protocols, solving fragmentation, and orchestrating autonomous AI in modern finance.",
  },
  {
    path: "quant/factor-models-machine-learning-risk-alpha-prediction",
    title: "Factor Models in Machine Learning",
    articleSlug: "factor-models-machine-learning-risk-alpha-prediction",
    date: "2026-06-05",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.GEN_AI],
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
    topics: ["Greeks & Mechanics"],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.MACRO],
    summary:
      "A comprehensive breakdown of macroeconomic catalysts, quantitative deleveraging, and the terminal phase of market overheating. Explore how uncorrelated assets collapsed simultaneously through rigorous structural analysis of Fed policy shifts, geopolitical resolution, and market microstructure vulnerabilities.",
  },
  {
    path: "ai-ml/formulaic-alpha-mining",
    title: "Formulaic Alpha Mining & Deep Search",
    articleSlug: "advancements-formulaic-alpha-mining-deep-search-mechanics",
    date: "2026-08-18",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.GEN_AI],
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
    title: "The Transient Shock & Disinflation (Jul 2026)",
    articleSlug: "anatomy-transient-shock-stagflation-fears-2026-disinflationary-trend",
    date: "2026-07-05",
    labels: [ArticleLabel.QUANT, ArticleLabel.MACRO],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.GEN_AI],
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
    topics: ["Volatility & VRP"],
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
    labels: [ArticleLabel.QUANT, ArticleLabel.MACHINE_LEARNING],
    summary:
      "A structured DevSecOps lifecycle for quant finance teams — covering GitLab CI/CD pipelines, trunk-based development, Jupyter notebook tooling (nbstripout, Jupytext, ReviewNB), DVC for large data versioning, DAG-optimized pipeline execution, and continuous compliance via the Four Eyes principle, CODEOWNERS, SAST/DAST, and secret detection.",
  },
  {
    path: "option-strategy/volatility-surface",
    topics: ["Volatility & VRP"],
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
    labels: [ArticleLabel.MACRO],
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
    topics: ["Volatility & VRP"],
    title: "Cboe Volatility Index (VIX)",
    articleSlug: "mathematics-microstructure-cboe-vix",
    date: "2026-07-24",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive quantitative guide to the VIX — from stochastic variance replication and discrete approximation to market microstructure dynamics, derivatives ecosystems, and the August 2024 liquidity shock.",
  },
  {
    path: "option-strategy/gex",
    topics: ["Greeks & Mechanics"],
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

/**
 * Display order for wiki categories, used by the index chips and the category sections.
 *
 * Explicit rather than derived: `wikiEntries` is maintained newest-first, so deriving the order
 * from first appearance made it a side effect of which category happened to publish most
 * recently — it would reshuffle on its own every time content was added. Categories not listed
 * here fall to the end, alphabetically, so a new category still renders without a code change.
 */
const CATEGORY_ORDER = [
  "option-strategy",
  "quant",
  "stock-analysis",
  "macro",
  "finance101",
  "ai-ml",
  "form13f",
  "form-13f",
  "crypto",
  "equities",
  "options",
];

/** Sort comparator for category slugs, following CATEGORY_ORDER. Exported so the index's
 *  filter chips and its grouped sections order identically — they are built from different
 *  sources (the category list vs. the filtered entries) and would otherwise disagree. */
export function compareWikiCategories(a: string, b: string): number {
  const ia = CATEGORY_ORDER.indexOf(a);
  const ib = CATEGORY_ORDER.indexOf(b);
  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;
  return a.localeCompare(b);
}

export function getWikiCategories(): string[] {
  const categories = [...new Set(wikiEntries.map((entry) => entry.path.split("/")[0]))];
  return categories.sort(compareWikiCategories);
}

export function getWikiEntriesByCategory(category: string): WikiEntry[] {
  return wikiEntries.filter((entry) => entry.path.split("/")[0] === category);
}
