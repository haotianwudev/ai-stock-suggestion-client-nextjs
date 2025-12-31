import { BaseConfig, StudyGuideItem } from "@/components/shared/config-types";

export interface TopicConfig extends BaseConfig {}

export const topicsConfig: Record<string, TopicConfig> = {
  'option101': {
    id: 'option101',
    title: 'Options 101',
    description: 'Understand the key scenarios where options can be an effective trading and investment tool.',
    videoUrl: 'https://youtu.be/brQbdu19cbw',
    infographicUrl: "https://i.imgur.com/ln9KdrO.jpeg",
    relatedArticles: [
      "strategic-options-utilization-risk-comprehensive-framework",
      "option-when-to-trade",
    ],
    studyGuide: {
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
      items: [
        {
          text: "How to understand Greeks",
          url: "https://www.sophie-ai-finance.com/articles/option-greeks-traders-poetic-guide-risk",
          videoUrl: "https://youtu.be/specific-greeks-tutorial",
          visualGuideUrl: "https://i.imgur.com/greeks-detailed-guide.jpeg"
        },
        {
          text: "Barchart Volatility & Greeks",
          url: "https://www.barchart.com/stocks/quotes/$SPX/volatility-greeks",
        }
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
      items: [
        {
          text: "VRP Deep Dive Analysis",
          url: "https://www.sophie-ai-finance.com/articles/demystifying-volatility-risk-premium-theory-measurement-trading",
          videoUrl: "https://youtu.be/eHu9X04D7Ss",
          visualGuideUrl: "https://i.imgur.com/ZSPRHKw.jpeg"
        },
        {
          text: "Barchart Historical vs Implied Volatility",
          url: "https://www.barchart.com/stocks/quotes/$SPX/volatility-charts",
        }
      ]
    }
  },
  
  'gex': {
    id: 'gex',
    title: 'Gamma Exposure (GEX)',
    description: 'Understanding how market makers\' gamma exposure influences market volatility and price movements, creating predictable trading patterns.',
    videoUrl: 'https://youtu.be/t_5yWuxn0WY',
    infographicUrl: 'https://i.imgur.com/4FiUTqH.jpeg',
    relatedArticles: [
      "gamma-exposure-gex-gps-market-volatility",
      "gex-secret",
    ],
    studyGuide: {
      items: [
        {
          text: "GEX and Market Volatility Analysis",
          url: "https://www.sophie-ai-finance.com/articles/gamma-exposure-gex-gps-market-volatility",
          videoUrl: "https://youtu.be/t_5yWuxn0WY",
          visualGuideUrl: "https://i.imgur.com/4FiUTqH.jpeg"
        },
        {
          text: "Barchart GEX viewer",
          url: "https://www.barchart.com/stocks/quotes/$SPX/gamma-exposure",
        }
      ]
    }
  },

  'roll': {
    id: 'roll',
    title: 'Rolling Options',
    description: 'Master the strategic framework for rolling short option positions through defensive and offensive techniques. Learn when to roll, close, or hold using quantitative triggers and Greeks-based decision making.',
    videoUrl: 'https://youtu.be/q5FSpOKtcFM',
    infographicUrl: 'https://i.imgur.com/yDVJgI0.jpeg',
    relatedArticles: [
      "strategic-framework-rolling-options-quantitative-approach",
      "roll-option",
    ],
    studyGuide: {
      items: [
        {
          text: "Strategic Framework for Rolling Options",
          url: "https://www.sophie-ai-finance.com/articles/strategic-framework-rolling-options-quantitative-approach",
          videoUrl: "https://youtu.be/q5FSpOKtcFM",
          visualGuideUrl: "https://i.imgur.com/yDVJgI0.jpeg"
        },
      ]
    }
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}