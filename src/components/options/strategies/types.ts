export interface Strategy {
  id: string;
  category: 'Bullish' | 'Bearish' | 'Neutral' | 'Volatility';
  name: string;
  description: string;
  profile: string;
  volatility: string;
  time: string;
}

export interface StrategyDetailProps {
  strategy: Strategy;
  onBack: () => void;
}
