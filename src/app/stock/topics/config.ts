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
          text: "Decoding the Analyst Consensus",
          articleSlug: "decoding-analyst-consensus-target-prices-conflicts-epistemology",
        },
        {
          text: "DCF Model Using AI",
          articleSlug: "decoding-stock-analysis-dcf-model-using-ai",
        },
        {
          text: "MSFT: EV/EBITDA vs DCF (Jun 2025)",
          articleSlug: "deep-research-microsoft-valuation-analysis",
        },
        {
          text: "DCF Valuation Analysis of Google (Jun 2025)",
          articleSlug: "interactive-alphabet-googl-valuation-analysis",
        },
        {
          text: "Apple's Financial Health (Jul 2025)",
          articleSlug: "apple-financial-health-analysis-traditional-metrics-mislead",
        },
        {
          text: "The Insider's Edge",
          articleSlug: "insiders-edge-comprehensive-analysis",
        },
        {
          text: "Trend vs. Momentum in Technical Analysis",
          articleSlug: "trend-vs-momentum-technical-analysis-guide",
        },
        {
          text: "Technical Analysis: Performance & Practice",
          articleSlug: "technical-analysis-portfolio-management-performance-practice",
        },
        {
          text: "Quantitative Support Level Modeling",
          articleSlug: "quantitative-support-level-modeling-machine-learning",
        },
        {
          text: "NVIDIA: The Crush Despite the Beat (Nov 2025)",
          articleSlug: "nvidia-deep-dive-crush-despite-beat-analyzing-valuation",
        },
        {
          text: "Tesla: The AI Binary Bet (Nov 2025)",
          articleSlug: "tesla-tsla-fundamental-dashboard-ai-binary-bet",
        },
        {
          text: "Alibaba: Stock Analysis (Aug 2025)",
          articleSlug: "alibaba-baba-stock-analysis-complex-era-growth-risk",
        },
        {
          text: "Alibaba: Drawdown Analysis (Jun 2026)",
          articleSlug: "alibaba-baba-quantitative-analysis-drawdown-factor-exposures",
        },
        {
          text: "Figma IPO Deep Dive (Aug 2025)",
          articleSlug: "figma-ipo-deep-dive-post-ipo-analysis-generational-saas",
        },
        {
          text: "The 2026 Mega-IPO Convergence (Jun 2026)",
          articleSlug: "2026-mega-ipo-convergence-market-analysis-systemic-risk",
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
          text: "Mastering Coattail Investing",
          articleSlug: "mastering-coattail-investing-sec-form-13f-analysis",
        },
        {
          text: "Unlocking SEC Form 13F",
          articleSlug: "unlocking-institutional-portfolios-strategic-guide-sec-form-13f",
        },
        {
          text: "Li Lu: Himalaya Capital (Feb 2026)",
          articleSlug: "masterclass-li-lu-himalaya-capital-investment-philosophy",
        },
        {
          text: "The Druckenmiller Doctrine (Aug 2025)",
          articleSlug: "druckenmiller-doctrine-asymmetric-returns",
        },
        {
          text: "Druckenmiller's Q4 2025 Shift",
          articleSlug: "duquesne-paradigm-druckenmiller-portfolio-shift-q4-2025",
        },
        {
          text: "Burry's Q2 2025 Reversal",
          articleSlug: "michael-burry-q2-2025-portfolio-analysis-cassandra-pivot",
        },
        {
          text: "Burry's Q3 2025 Pivot",
          articleSlug: "ai-antithesis-deconstructing-michael-burry-q3-2025-pivot",
        },
        {
          text: "David Tepper: The Contrarian Master (Nov 2025)",
          articleSlug: "david-tepper-contrarian-master-q3-2025-portfolio",
        },
        {
          text: "Buffett's Legacy and Succession (Nov 2025)",
          articleSlug: "buffett-legacy-berkshire-succession",
        },
        {
          text: "The Worldly Wisdom of Munger (Aug 2025)",
          articleSlug: "worldly-wisdom-charles-munger-multidisciplinary-approach",
        },
        {
          text: "Political Alpha (Aug 2025)",
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
          text: "The 2026 Macro Outlook (Dec 2025)",
          articleSlug: "navigating-2026-shift-comprehensive-macro-economic-outlook",
        },
        {
          text: "The Powell Pivot (Aug 2025)",
          articleSlug: "powell-pivot-navigating-market-crosscurrents-fed-easing-signal",
        },
        {
          text: "The Magnificent Seven Bubble? (Sep 2025)",
          articleSlug: "magnificent-seven-ai-titans-bubble-analysis",
        },
        {
          text: "Navigating the Turning Tide (Sep 2025)",
          articleSlug: "navigating-turning-tide-2025-macro-analysis",
        },
        {
          text: "The Multi-Asset Inflection Point (Sep 2025)",
          articleSlug: "navigating-inflection-point-multi-asset-strategy-peak-valuations",
        },
        {
          text: "The Market Cycle (Howard Marks)",
          articleSlug: "mastering-market-cycle-howard-marks-summary",
        },
        {
          text: "The New Golden Age (Sep 2025)",
          articleSlug: "new-golden-age-structural-bull-market-analysis",
        },
        {
          text: "Rarified Air: US Valuations (Sep 2025)",
          articleSlug: "navigating-rarified-air-quantitative-analysis-us-market-valuations",
        },
        {
          text: "2025 Fixed Income Turning Point (Sep 2025)",
          articleSlug: "navigating-turning-point-2025-fixed-income-analysis",
        },
        {
          text: "Trade War Redux (Oct 2025)",
          articleSlug: "trade-war-redux-october-10-market-shock-analysis",
        },
        {
          text: "High Altitude: US Valuations (Nov 2025)",
          articleSlug: "high-altitude-deconstructing-us-stock-market-valuation",
        },
        {
          text: "Grey Rhino: Yen Carry Trade (Dec 2025)",
          articleSlug: "grey-rhino-monetary-divergence-yen-carry-trade-unwind",
        },
        {
          text: "ES & NQ Futures (Dec 2025)",
          articleSlug: "es-nq-futures-engine-room-global-economy",
        },
        {
          text: "The 2025 Financial Market Retrospective (Dec 2025)",
          articleSlug: "2025-financial-market-retrospective-seven-pivotal-events",
        },
        {
          text: "The Great Decoupling (Jan 2026)",
          articleSlug: "great-decoupling-2026-asset-bubble-mathematical-analysis",
        },
        {
          text: "The Warsh Era (Feb 2026)",
          articleSlug: "warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism",
        },
        {
          text: "Calculating the Investment Clock (Apr 2026)",
          articleSlug: "quantitative-guide-calculate-investment-clock",
        },
        {
          text: "U.S. Dollar Dynamics (Apr 2026)",
          articleSlug: "structural-dynamics-us-dollar-hegemony-dedollarization-macro-strategy",
        },
        {
          text: "The Transient Shock (Jul 2026)",
          articleSlug: "anatomy-transient-shock-stagflation-fears-2026-disinflationary-trend",
        },
        {
          text: "2026 Fixed Income Turning Points (Aug 2026)",
          articleSlug: "quantitative-assessment-fixed-income-market-turning-points",
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
          text: "ETF Architecture",
          articleSlug: "architecture-exchange-traded-funds-mechanisms-trading-strategies-structural-risks",
        },
        {
          text: "Mutual Funds vs ETFs",
          articleSlug: "mutual-funds-vs-etfs-definitive-investment-guide",
        },
        {
          text: "ETF Alternatives to QQQ and VOO",
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
          text: "The Global ETF Market",
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
          text: "Trusts & Estate Planning",
          articleSlug: "comprehensive-guide-trusts-estate-planning",
        },
        {
          text: "Building a Secure Retirement",
          articleSlug: "retirement-architect-guide-secure-retirement",
        },
        {
          text: "Insurance for Retirement Security",
          articleSlug: "quantitative-analysis-insurance-products-retirement-security",
        },
        {
          text: "Tax-Loss Harvesting: Strategy & Execution",
          articleSlug: "comprehensive-analysis-tax-loss-harvesting-strategy-execution-risk-mitigation",
        },
        {
          text: "Direct Indexing & Tax-Loss Harvesting",
          articleSlug: "direct-indexing-tax-loss-harvesting-algorithmic-mechanics",
        },
        {
          text: "Wealth Preservation Allocation",
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
          text: "Prediction Markets",
          articleSlug: "prediction-markets-financialization-truth-complete-trading-guide",
        },
        {
          text: "The Phantom Trader",
          articleSlug: "gift-phantom-trader-psychology-winning-through-losing",
        },
        {
          text: "The Meme Stock Phenomenon",
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
          text: "The Digital Sovereign",
          articleSlug: "digital-sovereign-bitcoin-architecture-mining-investment-guide",
        },
        {
          text: "The Web3 Revolution",
          articleSlug: "web3-revolution-defi-retail-investors",
        },
        {
          text: "Guide to Stablecoins",
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
