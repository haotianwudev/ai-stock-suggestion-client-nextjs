import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface TopicConfig extends BaseConfig {}

export const topicsConfig: Record<string, TopicConfig> = {
  'when-to-trade': {
    id: 'when-to-trade',
    title: 'When to Use Options',
    description: 'Understand the key scenarios where options can be an effective trading and investment tool.',
    videoUrl: 'https://youtu.be/brQbdu19cbw',
    infographicUrl: "https://i.imgur.com/ln9KdrO.jpeg",
    relatedArticles: [
      "strategic-options-utilization-risk-comprehensive-framework",
    ],
    studyGuide: {
      title: "Study Guide",
      items: [
        {
          text: "[Youtube] When to Trade, and When NOT to Trade",
          url: "https://youtu.be/brQbdu19cbw"
        },
        {
          text: "When to Trade, and When NOT to Trade",
          url: "https://www.sophie-ai-finance.com/articles/strategic-options-utilization-risk-comprehensive-framework"
        },
      ]
    }
  },
  
  'greeks': {
    id: 'greeks',
    title: 'Option Greeks',
    description: 'Master option pricing through interactive Greek calculations and visualizations. Learn Delta, Gamma, Theta, Vega, and Rho with real-time examples.',
    videoUrl: 'https://youtu.be/ZLUeCSLgw3Y',
    infographicUrl: "https://i.imgur.com/Fre6XfJ.jpeg",
    relatedArticles: [
      "option-greeks-poem",
      "option-greeks-traders-poetic-guide-risk",
    ],
    studyGuide: {
      title: "Study Guide",
      items: [
        {
          text: "[Youtube] Greeks Overview",
          url: "https://youtu.be/ZLUeCSLgw3Y",
          type: "video"
        },
        {
          text: "How to understand Greeks",
          url: "https://www.sophie-ai-finance.com/articles/option-greeks-traders-poetic-guide-risk",
          videoUrl: "https://youtu.be/specific-greeks-tutorial",
          visualGuideUrl: "https://i.imgur.com/greeks-detailed-guide.jpeg",
          type: "article"
        },
        {
          text: "Interactive Greeks Calculator",
          url: "https://www.optionsprofitcalculator.com/",
          type: "external"
        },
      ]
    }
  },
  
  'vrp': {
    id: 'vrp',
    title: 'Volatility Risk Premium (VRP)',
    description: 'Understanding the systematic edge in options markets where implied volatility consistently overstates realized volatility.',
    videoUrl: 'https://youtu.be/eHu9X04D7Ss',
    infographicUrl: 'https://i.imgur.com/ZSPRHKw.jpeg',
    relatedArticles: [
      "volatility-risk-premium-intro",
      'demystifying-volatility-risk-premium-theory-measurement-trading',
    ],
    studyGuide: {
      title: "Study Guide",
      items: [
        {
          text: "[Youtube] VRP Overview",
          url: "https://youtu.be/eHu9X04D7Ss",
          type: "video"
        },
        {
          text: "VRP Deep Dive Analysis",
          url: "https://www.sophie-ai-finance.com/articles/demystifying-volatility-risk-premium-theory-measurement-trading",
          videoUrl: "https://youtu.be/vrp-deep-dive-tutorial",
          visualGuideUrl: "https://i.imgur.com/vrp-detailed-analysis.jpeg",
          type: "article"
        },
        {
          text: "VRP Trading Strategies",
          url: "https://www.tastytrade.com/concepts-strategies/volatility-risk-premium",
          type: "guide"
        },
      ]
    }
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}