export interface Article {
  title: string;
  description: string;
  slug: string;
  date: string;
  imageUrl?: string;
  googleDoc?: string;
  deepResearch?: boolean;
  youtubeUrl?: string;
  isVideo?: boolean;
  options?: boolean;
  pinned?: boolean;
}

export const articles: Article[] = [
  {
    title: "Systematic Options Strategy Selection: From Technical Analysis to Machine Learning",
    description: "A comprehensive deep research article and interactive guide to systematic options strategy selection. Covers a taxonomy of options strategies, technical indicator signals, machine learning features, and quant evaluation metrics. Includes interactive strategy explorer, analyst toolkit, ML engine, and quant playbook. Full document and research links provided.",
    slug: "deep-research-options-strategy-selection",
    date: "June 13, 2025",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    googleDoc: "https://docs.google.com/document/d/e/2PACX-1vRYw1t12BokYTuE9Q3t5FngMQpAYDSrLfQVh5znjIbbwdDkDpaBpL77GPHJLMKrp_tS9gTU0paRCShO/pub",
    deepResearch: true
  },
  {
    title: "Matt Levine's Market Opinions",
    description: "A regularly updated collection of Matt Levine's Bloomberg market opinions, covering market structure, regulation, and financial innovation. Click to read the latest and past briefings.",
    slug: "matt-levine-opinions",
    date: "June 12, 2025",
    imageUrl: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iE8O2RXbXRhw/v6/piUjdcePl62Og/200x200.jpg",
    pinned: true
  },
  {
    title: "Writing Naked Puts: A Complete Interactive Guide",
    description: "An interactive comprehensive guide to writing naked puts based on Mark D. Wolfinger's book. Learn the strategy, risk management, and practical implementation with an intuitive navigation system covering all aspects from basic concepts to advanced repair strategies.",
    slug: "writing-naked-puts-complete-interactive-guide",
    date: "June 10, 2025",
    imageUrl: "https://m.media-amazon.com/images/I/5165u8eVyZL._SY445_SX342_PQ35_.jpg",
    options: true
  },
  {
    title: "Enhancing the Sell Put Strategy: Advanced Techniques for Optimal Performance",
    description: "A comprehensive deep research analysis of advanced put-selling techniques and strategic optimizations. Covers refined strategic objectives, cash-secured vs naked puts analysis, advanced risk management frameworks, position sizing methodologies, rolling strategies, and multi-leg structures like bull put spreads and the wheel strategy. Essential reading for traders seeking to elevate their put-selling methodology beyond basic execution.",
    slug: "enhancing-sell-put-strategy",
    date: "June 9, 2025",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    googleDoc: "https://docs.google.com/document/d/e/2PACX-1vTk9wrfRXDHiChW36eqp7876n9TpPKmhAUjzEIQ6MHV_ixFMD0eyHy5yKTezL_Oje4fZ_PZr6aV3P2N/pub",
    deepResearch: true,
    options: true
  },
  {
    title: "Decoding Stock Analysis DCF model using AI",
    description: "In this video, we're decoding the DCF model, the powerhouse of absolute stock valuation. Forget the jargon and complex spreadsheets; we're making this simple, fun, and accessible for everyone.",
    slug: "decoding-stock-analysis-dcf-model-using-ai",
    date: "June 8, 2025",
    imageUrl: "/images/Decoding Stock Analysis - DCF model using AI.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=DEzMJY7dJ6o",
    isVideo: true
  },
  {
    title: "Losing Money With Options: Common Pitfalls",
    description: "A comprehensive summary of common pitfalls discussed in options trading literature, where losses arise from technical ignorance, errors, and misunderstanding the nuances of options behavior. Covers directional trading mistakes, exercise and expiration errors, gamma trading pitfalls, volatility trading issues, and order entry disasters. Learn how to avoid these costly mistakes through technical knowledge, alertness, and proper risk management systems.",
    slug: "losing-money-with-options-common-pitfalls",
    date: "June 7, 2025",
    imageUrl: "https://m.media-amazon.com/images/I/7153sgbC9sL._SY522_.jpg",
    options: true
  },
  {
    title: "DCF Valuation Analysis of Google",
    description: "An in-depth DCF valuation analysis of Alphabet Inc. featuring interactive modeling tools. Includes comprehensive business segment analysis, historical performance review, peer comparisons, and a dynamic DCF calculator that lets you adjust WACC and growth assumptions to see real-time valuation impacts. Current analysis suggests potential overvaluation at market prices.",
    slug: "interactive-alphabet-googl-valuation-analysis",
    date: "June 6, 2025",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Wa-f0wMNP_3C3Z6eRuWoULhTlQkRkjIwnw&s",
    googleDoc: "https://docs.google.com/document/d/e/2PACX-1vQIySlwr9C6e6277NouqPQYxsBhYVb7AN-7eHAqjBlVFwbS8yIHQ3aHHm8Il4o6Mep7nYwjerScTiD4/pub",
    deepResearch: true
  },
  {
    title: "Navigating Option Trading Strategies",
    description: "Summary of Options as a Strategic Investment. A comprehensive guide covering option trading strategies from basic directional approaches to advanced volatility trading and arbitrage techniques.",
    slug: "navigating-option-trading-strategies",
    date: "June 5, 2025",
    imageUrl: "https://m.media-amazon.com/images/I/41Eq0i5hoQL._PQ35_.jpg",
    options: true
  },
  {
    title: "Decoding AI-Hedge-Fund Charlie Munger AI Agent Stock Analyst",
    description: "Can AI think like Charlie Munger? Join SOPHIE's Daddy to explore the AI-Hedge-Fund's \"Charlie Bot Munger\" agent and its Deep Research!",
    slug: "sophie-youtube-introduction",
    date: "June 4, 2025",
    imageUrl: "/images/charlie-munger-ai-hedge-fund-thumbnail.png",
    youtubeUrl: "https://www.youtube.com/watch?v=QkRPgEI5PZM",
    isVideo: true
  },
  {
    title: "Technical Analysis vs. Machine Learning Trading",
    description: "An interactive, in-depth comparison of Technical Analysis and Machine Learning trading strategies. Includes radar chart, paradigm tabs, and synergy explorer. Explore the strengths, weaknesses, and future of each approach.",
    slug: "deep-research-ta-vs-ml-trading",
    date: "June 2, 2025",
    googleDoc: "https://docs.google.com/document/d/e/2PACX-1vTgDx1bHxlh7TPZ9e1mrBkPGKYSu25L2ju5K142JniqOrxR_8BLOkTyleG-nicehKOxOAF8aKBOZ5uR/pub",
    deepResearch: true,
    imageUrl: "https://images.unsplash.com/photo-1518183214770-9cffbec72538?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Gemini Deep Research on AAPL",
    description: "This analysis presents the central conflict in evaluating Apple today: it is an undeniably wonderful business, yet it trades at a price that appears to offer little-to-no margin of safety.",
    slug: "gemini-deep-research-aapl",
    date: "May 31, 2025",
    imageUrl: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1000",
    googleDoc: "https://docs.google.com/document/d/e/2PACX-1vRxLdxU6sD0jgrNS_o0oMDXkYBHaotgVCj7Olli85c5P-YBIBHjH_cwF8pe01zuh_4R85NlBZram6WY/pub",
    deepResearch: true
  },
  {
    title: "Stock Analysis AI Agent Prompt Example",
    description: `A full prompt and data example for a Charlie Munger-style AI stock analysis agent. Includes all rules, mental models, and a real JSON analysis for AAPL.\n\nPrompt:\n\nYou are a Charlie Munger AI agent, making investment decisions using his principles:\n\n1. Focus on the quality and predictability of the business.\n2. Rely on mental models from multiple disciplines to analyze investments.\n3. Look for strong, durable competitive advantages (moats).\n4. Emphasize long-term thinking and patience.\n5. Value management integrity and competence.\n6. Prioritize businesses with high returns on invested capital.\n7. Pay a fair price for wonderful businesses.\n8. Never overpay, always demand a margin of safety.\n9. Avoid complexity and businesses you don't understand.\n10. "Invert, always invert" - focus on avoiding stupidity rather than seeking brilliance.\n\nRules:\n- Praise businesses with predictable, consistent operations and cash flows.\n- Value businesses with high ROIC and pricing power.\n- Prefer simple businesses with understandable economics.\n- Admire management with skin in the game and shareholder-friendly capital allocation.\n- Focus on long-term economics rather than short-term metrics.\n- Be skeptical of businesses with rapidly changing dynamics or excessive share dilution.\n- Avoid excessive leverage or financial engineering.\n- Provide a rational, data-driven recommendation (bullish, bearish, or neutral).\n\nWhen providing your reasoning, be thorough and specific by:\n1. Explaining the key factors that influenced your decision the most (both positive and negative)\n2. Applying at least 2-3 specific mental models or disciplines to explain your thinking\n3. Providing quantitative evidence where relevant (e.g., specific ROIC values, margin trends)\n4. Citing what you would "avoid" in your analysis (invert the problem)\n5. Using Charlie Munger's direct, pithy conversational style in your explanation\n\nTask:\nBased on the following analysis, create a Munger-style investment signal.\n\nAnalysis Data for AAPL:\n\n{\n  "AAPL": {\n    "signal": "neutral",\n    "score": 7.06,\n    "max_score": 10,\n    "moat_analysis": {\n      "score": 8.89,\n      "details": "Excellent ROIC: >15% in 10/10 periods; Good pricing power: Average gross margin 45.0%; Low capital requirements: Avg capex 2.7% of revenue; Invests in R&D, building intellectual property; Significant goodwill/intangible assets, suggesting brand value or IP"\n    },\n    "management_analysis": {\n      "score": 5.0,\n      "details": "Good cash conversion: FCF/NI ratio of 1.04; Moderate debt level: D/E ratio of 1.47; Acceptable cash position: Cash/Revenue ratio of 0.07; No recorded insider transactions; Shareholder-friendly: Reducing share count over time"\n    },\n    "predictability_analysis": {\n      "score": 9.0,\n      "details": "Moderately predictable revenue: 0.4% avg growth with some volatility; Highly predictable operations: Operating income positive in all periods; Highly predictable margins: 30.4% avg with minimal volatility; Highly predictable cash generation: Positive FCF in all periods"\n    },\n    "valuation_analysis": {\n      "score": 3.0,\n      "details": "Fair value: 3.3% FCF yield; Expensive: 50.3% premium to reasonable value; Stable to growing FCF supports valuation",\n      "intrinsic_value_range": {\n        "conservative": 1023700000000.0,\n        "reasonable": 1535550000000.0,\n        "optimistic": 2047400000000.0\n      },\n      "fcf_yield": 0.033,\n      "normalized_fcf": 102370000000.0\n    },\n    "news_sentiment": "Qualitative review of 100 recent news items would be needed"\n  }\n}\n\nReturn the trading signal in this JSON format:\n\n{\n  "signal": "bullish/bearish/neutral",\n  "confidence": float (0-100),\n  "reasoning": "string"\n}`,
    slug: "stock-analysis-ai-agent-prompt-example",
    date: "May 31, 2025",
    imageUrl: "/images/agents/charlie_munger.png"
  }
]; 