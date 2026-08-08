import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface TopicConfig extends BaseConfig {}

export const topicsConfig: Record<string, TopicConfig> = {
  "stock-analysis": {
    id: "stock-analysis",
    title: "Stock Analysis",
    description: "Master the frameworks behind rigorous stock analysis — from reading (and questioning) analyst consensus to building DCF valuations, reading technical trends, and diagnosing single-stock risk.",
    primaryArticleSlug: "decoding-analyst-consensus-target-prices-conflicts-epistemology",
    studyGuide: {
      items: [
        {
          text: "Decoding the Analyst Consensus: Target Prices & Conflicts",
          articleSlug: "decoding-analyst-consensus-target-prices-conflicts-epistemology",
        },
        {
          text: "Decoding Stock Analysis: DCF Model Using AI",
          articleSlug: "decoding-stock-analysis-dcf-model-using-ai",
        },
        {
          text: "MSFT: EV/EBITDA vs DCF",
          articleSlug: "deep-research-microsoft-valuation-analysis",
        },
        {
          text: "DCF Valuation Analysis of Google",
          articleSlug: "interactive-alphabet-googl-valuation-analysis",
        },
        {
          text: "Apple's Financial Health: When Traditional Metrics Mislead",
          articleSlug: "apple-financial-health-analysis-traditional-metrics-mislead",
        },
        {
          text: "The Insider's Edge: Signal from Insider Trading",
          articleSlug: "insiders-edge-comprehensive-analysis",
        },
        {
          text: "Trend vs. Momentum in Technical Analysis",
          articleSlug: "trend-vs-momentum-technical-analysis-guide",
        },
        {
          text: "Quantitative Support Level Modeling",
          articleSlug: "quantitative-support-level-modeling-machine-learning",
        },
        {
          text: "NVIDIA Deep Dive: Why the Crush Despite the Beat?",
          articleSlug: "nvidia-deep-dive-crush-despite-beat-analyzing-valuation",
        },
        {
          text: "Tesla (TSLA) Fundamental Dashboard: The AI Binary Bet",
          articleSlug: "tesla-tsla-fundamental-dashboard-ai-binary-bet",
        },
        {
          text: "Figma IPO Deep Dive",
          articleSlug: "figma-ipo-deep-dive-post-ipo-analysis-generational-saas",
        },
        {
          text: "Stock Wipeout Probability Analysis",
          articleSlug: "stock-wipeout-probability-analysis",
        },
      ]
    }
  },

  "13f-analysis": {
    id: "13f-analysis",
    title: "13F Analysis",
    description: "Learn to read SEC Form 13F filings like an institutional analyst — coattail investing methodology, and the portfolio philosophies of the investors who move markets: Druckenmiller, Burry, Buffett, Munger, and more.",
    primaryArticleSlug: "mastering-coattail-investing-sec-form-13f-analysis",
    studyGuide: {
      items: [
        {
          text: "Mastering Coattail Investing: SEC Form 13F Analysis",
          articleSlug: "mastering-coattail-investing-sec-form-13f-analysis",
        },
        {
          text: "Unlocking SEC Form 13F",
          articleSlug: "unlocking-institutional-portfolios-strategic-guide-sec-form-13f",
        },
        {
          text: "The Masterclass of Li Lu: Himalaya Capital",
          articleSlug: "masterclass-li-lu-himalaya-capital-investment-philosophy",
        },
        {
          text: "The Duquesne Paradigm: Druckenmiller's Q4 2025 Shift",
          articleSlug: "duquesne-paradigm-druckenmiller-portfolio-shift-q4-2025",
        },
        {
          text: "The Druckenmiller Doctrine: Asymmetric Returns",
          articleSlug: "druckenmiller-doctrine-asymmetric-returns",
        },
        {
          text: "The Cassandra Pivot: Michael Burry's Q2 2025 Reversal",
          articleSlug: "michael-burry-q2-2025-portfolio-analysis-cassandra-pivot",
        },
        {
          text: "The AI Antithesis: Michael Burry's Q3 2025 Pivot",
          articleSlug: "ai-antithesis-deconstructing-michael-burry-q3-2025-pivot",
        },
        {
          text: "David Tepper: The Contrarian Master",
          articleSlug: "david-tepper-contrarian-master-q3-2025-portfolio",
        },
        {
          text: "Warren Buffett's Legacy and Berkshire's Succession",
          articleSlug: "buffett-legacy-berkshire-succession",
        },
        {
          text: "The Worldly Wisdom of Charles T. Munger",
          articleSlug: "worldly-wisdom-charles-munger-multidisciplinary-approach",
        },
        {
          text: "Political Alpha: Congressional Stock Trading",
          articleSlug: "political-alpha-congressional-stock-trading-guide",
        },
      ]
    }
  },

  "macro-analysis": {
    id: "macro-analysis",
    title: "Macro Analysis",
    description: "Understand the macroeconomic forces driving markets — monetary policy, dollar dynamics, market cycle theory, and the shocks and regime shifts that reshape asset allocation.",
    primaryArticleSlug: "navigating-2026-shift-comprehensive-macro-economic-outlook",
    studyGuide: {
      items: [
        {
          text: "Navigating the 2026 Shift: Comprehensive Macro Outlook",
          articleSlug: "navigating-2026-shift-comprehensive-macro-economic-outlook",
        },
        {
          text: "A Quantitative Guide to Calculate the Investment Clock",
          articleSlug: "quantitative-guide-calculate-investment-clock",
        },
        {
          text: "Structural Dynamics of the U.S. Dollar",
          articleSlug: "structural-dynamics-us-dollar-hegemony-dedollarization-macro-strategy",
        },
        {
          text: "The Warsh Era: American Monetary Policy",
          articleSlug: "warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism",
        },
        {
          text: "The Grey Rhino: Yen Carry Trade Unwind",
          articleSlug: "grey-rhino-monetary-divergence-yen-carry-trade-unwind",
        },
        {
          text: "The Anatomy of a Transient Shock: 2026 Stagflation Fears",
          articleSlug: "anatomy-transient-shock-stagflation-fears-2026-disinflationary-trend",
        },
        {
          text: "The Great Decoupling: 2026 Asset Bubble Analysis",
          articleSlug: "great-decoupling-2026-asset-bubble-mathematical-analysis",
        },
        {
          text: "Navigating the Turning Point: 2025 Fixed Income Analysis",
          articleSlug: "navigating-turning-point-2025-fixed-income-analysis",
        },
        {
          text: "Mastering the Market Cycle (Howard Marks)",
          articleSlug: "mastering-market-cycle-howard-marks-summary",
        },
        {
          text: "Navigating the Inflection Point: Multi-Asset Strategy",
          articleSlug: "navigating-inflection-point-multi-asset-strategy-peak-valuations",
        },
        {
          text: "Trade War Redux: October 10th Market Shock",
          articleSlug: "trade-war-redux-october-10-market-shock-analysis",
        },
        {
          text: "The 2025 Financial Market Retrospective",
          articleSlug: "2025-financial-market-retrospective-seven-pivotal-events",
        },
      ]
    }
  },

  "etf-mutual-fund": {
    id: "etf-mutual-fund",
    title: "ETF & Mutual Fund",
    description: "Understand the mechanics of the investment vehicles most portfolios are built from — ETF structure and trading, mutual funds vs ETFs, and the index products that dominate passive investing.",
    primaryArticleSlug: "architecture-exchange-traded-funds-mechanisms-trading-strategies-structural-risks",
    studyGuide: {
      items: [
        {
          text: "The Architecture of Exchange-Traded Funds",
          articleSlug: "architecture-exchange-traded-funds-mechanisms-trading-strategies-structural-risks",
        },
        {
          text: "Mutual Funds vs ETFs: The Definitive Investment Guide",
          articleSlug: "mutual-funds-vs-etfs-definitive-investment-guide",
        },
        {
          text: "Beyond the Benchmarks: High-Growth ETF Alternatives to QQQ and VOO",
          articleSlug: "beyond-benchmarks-high-growth-etf-alternatives-qqq-voo",
        },
        {
          text: "ETFs Beyond SPY and QQQ",
          articleSlug: "alternative-etfs-beyond-spy-qqq",
        },
        {
          text: "Russell 2000: The Small-Cap Engine",
          articleSlug: "russell-2000-small-cap-engine-deep-dive",
        },
        {
          text: "Dynamics of the Global ETF Market",
          articleSlug: "dynamics-global-etf-market-scale-strategic-utility-quantitative-mechanics",
        },
      ]
    }
  },

  "wealth-planning": {
    id: "wealth-planning",
    title: "Wealth & Planning",
    description: "Frameworks for building and protecting wealth beyond stock-picking — estate planning and trusts, retirement architecture, insurance, and tax-efficient strategies like tax-loss harvesting and direct indexing.",
    primaryArticleSlug: "comprehensive-guide-trusts-estate-planning",
    studyGuide: {
      items: [
        {
          text: "A Comprehensive Guide to Trusts: Estate Planning",
          articleSlug: "comprehensive-guide-trusts-estate-planning",
        },
        {
          text: "The Architect's Guide to a Secure Retirement",
          articleSlug: "retirement-architect-guide-secure-retirement",
        },
        {
          text: "Insurance Products for Retirement Security",
          articleSlug: "quantitative-analysis-insurance-products-retirement-security",
        },
        {
          text: "Tax-Loss Harvesting: Strategy, Execution, and Risk Mitigation",
          articleSlug: "comprehensive-analysis-tax-loss-harvesting-strategy-execution-risk-mitigation",
        },
        {
          text: "Direct Indexing & Algorithmic Tax-Loss Harvesting",
          articleSlug: "direct-indexing-tax-loss-harvesting-algorithmic-mechanics",
        },
        {
          text: "Strategic Asset Allocation for Wealth Preservation",
          articleSlug: "strategic-asset-allocation-quantitative-framework-wealth-preservation",
        },
      ]
    }
  },

  "finance-101": {
    id: "finance-101",
    title: "Finance 101",
    description: "Foundational finance for every investor — trading psychology, market structure and manipulation, ESG and prediction markets, an introduction to crypto, and the classic books every investor should read.",
    primaryArticleSlug: "prediction-markets-financialization-truth-complete-trading-guide",
    studyGuide: {
      items: [
        {
          text: "Prediction Markets: The Financialization of Truth",
          articleSlug: "prediction-markets-financialization-truth-complete-trading-guide",
        },
        {
          text: "The Gift of the Phantom Trader: Trading Psychology",
          articleSlug: "gift-phantom-trader-psychology-winning-through-losing",
        },
        {
          text: "The Meme Stock Phenomenon: Hype, Risk, and Strategy",
          articleSlug: "meme-stock-phenomenon-hype-risk-strategy",
        },
        {
          text: "Can AI Algorithms Pick Your Next Stock?",
          articleSlug: "viral-videos-volatile-valuations-ai-algorithms-stock-picking",
        },
        {
          text: "India's Option Market and Jane Street",
          articleSlug: "jane-street-precedent-market-manipulation",
        },
        {
          text: "The Mechanics of ESG Investing",
          articleSlug: "mechanics-esg-investing-technical-guide",
        },
        {
          text: "The Digital Sovereign: Bitcoin's Architecture",
          articleSlug: "digital-sovereign-bitcoin-architecture-mining-investment-guide",
        },
        {
          text: "The Web3 Revolution: Deconstructing DeFi",
          articleSlug: "web3-revolution-defi-retail-investors",
        },
        {
          text: "The Investor's Guide to Stablecoins",
          articleSlug: "investors-guide-stablecoins-profiting-digital-dollars",
        },
        {
          text: "Fooled by Randomness",
          articleSlug: "fooled-by-randomness-book-summary",
        },
        {
          text: "The Little Book of Behavioral Investing",
          articleSlug: "little-book-behavioral-investing-summary",
        },
        {
          text: "Rich Dad, Poor Dad",
          articleSlug: "rich-dad-poor-dad-book-summary",
        },
        {
          text: "Essential Reading for Value Investors",
          articleSlug: "essential-reading-for-investors",
        },
      ]
    }
  },
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}
