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
          text: "When to Trade, and When NOT to Trade",
          url: "https://www.sophie-ai-finance.com/articles/strategic-options-utilization-risk-comprehensive-framework",
          videoUrl: "https://youtu.be/brQbdu19cbw",
          visualGuideUrl: "https://i.imgur.com/ln9KdrO.jpeg",
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
          text: "How to understand Greeks",
          url: "https://www.sophie-ai-finance.com/articles/option-greeks-traders-poetic-guide-risk",
          videoUrl: "https://youtu.be/specific-greeks-tutorial",
          visualGuideUrl: "https://i.imgur.com/greeks-detailed-guide.jpeg"
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
          text: "VRP Deep Dive Analysis",
          url: "https://www.sophie-ai-finance.com/articles/demystifying-volatility-risk-premium-theory-measurement-trading",
          videoUrl: "https://youtu.be/eHu9X04D7Ss",
          visualGuideUrl: "https://i.imgur.com/ZSPRHKw.jpeg"
        },
      ]
    }
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}