export interface TopicConfig {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  infographicUrl?: string;
  relatedArticles?: string[];
}

export const topicsConfig: Record<string, TopicConfig> = {
  'when-to-trade': {
    id: 'when-to-trade',
    title: 'When to Use Options',
    description: 'Understand the key scenarios where options can be an effective trading and investment tool.',
    videoUrl: 'https://youtu.be/brQbdu19cbw',
    infographicUrl: "https://i.imgur.com/ln9KdrO.jpeg",
    relatedArticles: [
      "strategic-options-utilization-risk-comprehensive-framework",
    ]
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
    ]
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
    ]
  }
};

export function getTopicConfig(topicId: string): TopicConfig | null {
  return topicsConfig[topicId] || null;
}