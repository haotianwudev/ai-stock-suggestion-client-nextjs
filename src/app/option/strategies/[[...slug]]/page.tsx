import { Metadata } from 'next';
import OptionsTabClient from '../../[tab]/client';

// Strategy ID mapping for metadata
const strategyMetadata: Record<string, { name: string; description: string }> = {
  'long-call': {
    name: 'Long Call',
    description: 'The most straightforward bullish strategy. Buy a call option expecting the underlying asset\'s price to rise significantly.',
  },
  'bull-call-spread': {
    name: 'Bull Call Spread',
    description: 'A moderately bullish strategy that reduces cost and risk while capping profit potential.',
  },
  'bull-put-spread': {
    name: 'Bull Put Spread',
    description: 'An income-generating bullish strategy that collects credit while defining risk.',
  },
  'covered-call': {
    name: 'Covered Call Writing',
    description: 'A conservative income strategy that generates premium by selling calls against owned stock.',
  },
  'sell-naked-put': {
    name: 'Sell Naked Put',
    description: 'A bullish income strategy that collects premium with substantial downside risk.',
  },
  'long-put': {
    name: 'Long Put',
    description: 'The most straightforward bearish strategy. Buy a put option expecting the underlying asset\'s price to fall.',
  },
  'bear-put-spread': {
    name: 'Bear Put Spread',
    description: 'A moderately bearish strategy that reduces cost and risk while capping profit.',
  },
  'bear-call-spread': {
    name: 'Bear Call Spread',
    description: 'An income-generating bearish strategy that collects credit while defining risk.',
  },
  'short-straddle': {
    name: 'Short Straddle',
    description: 'A bet on low volatility with unlimited risk and defined profit potential.',
  },
  'short-strangle': {
    name: 'Short Strangle',
    description: 'A high-probability neutral strategy that profits from range-bound markets with a wider profit zone than straddles.',
  },
  'iron-condor': {
    name: 'Iron Condor',
    description: 'A high-probability, risk-defined neutral strategy that profits from range-bound markets.',
  },
  'long-straddle': {
    name: 'Long Straddle',
    description: 'A bet on large price moves in either direction with defined risk and unlimited profit potential.',
  },
  'long-strangle': {
    name: 'Long Strangle',
    description: 'A cheaper alternative to the long straddle requiring larger price moves to profit.',
  },
  'wheel': {
    name: 'Wheel Strategy (Triple Income)',
    description: 'A systematic income-generating strategy creating three income sources: put premiums, call premiums, and dividends.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const strategyId = slug?.[0];
  
  if (strategyId && strategyMetadata[strategyId]) {
    const strategy = strategyMetadata[strategyId];
    return {
      title: `${strategy.name} Strategy | SOPHIE's Daddy Quant Blog`,
      description: strategy.description,
      keywords: ['options strategies', 'options trading', strategy.name.toLowerCase(), 'trading strategies', 'options education'],
      openGraph: {
        title: `${strategy.name} Strategy | SOPHIE's Daddy Quant Blog`,
        description: strategy.description,
        url: `https://sophie-ai-finance.com/option/strategies/${strategyId}`,
        siteName: 'SOPHIE\'s Daddy Quant Blog',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${strategy.name} Strategy | SOPHIE's Daddy Quant Blog`,
        description: strategy.description,
        site: '@sophies_daddy',
      },
      alternates: {
        canonical: `https://sophie-ai-finance.com/option/strategies/${strategyId}`,
      },
    };
  }
  
  // Default metadata for strategies overview
  return {
    title: 'Options Strategies Explorer | SOPHIE\'s Daddy Quant Blog',
    description: 'Explore a comprehensive taxonomy of common options strategies. Filter by market outlook and view risk profiles for various trading scenarios.',
    keywords: ['options strategies', 'options trading', 'covered calls', 'protective puts', 'spreads', 'straddles', 'strangles'],
    openGraph: {
      title: 'Options Strategies Explorer | SOPHIE\'s Daddy Quant Blog',
      description: 'Explore a comprehensive taxonomy of common options strategies.',
      url: 'https://sophie-ai-finance.com/option/strategies',
      siteName: 'SOPHIE\'s Daddy Quant Blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Options Strategies Explorer | SOPHIE\'s Daddy Quant Blog',
      description: 'Explore a comprehensive taxonomy of common options strategies.',
      site: '@sophies_daddy',
    },
    alternates: {
      canonical: 'https://sophie-ai-finance.com/option/strategies',
    },
  };
}

export default async function StrategiesPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const strategyId = slug?.[0];
  
  return <OptionsTabClient tab="strategies" strategyId={strategyId} />;
}
