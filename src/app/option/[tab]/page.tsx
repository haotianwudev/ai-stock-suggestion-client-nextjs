import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OptionsTabClient from './client';

const validTabs = ['viewer', 'when-to-trade', 'greeks', 'articles', 'strategies'];

export async function generateMetadata({ params }: { params: Promise<{ tab: string }> }): Promise<Metadata> {
  const { tab } = await params;
  
  if (!validTabs.includes(tab)) {
    return {};
  }
  
  const metadataMap: Record<string, Metadata> = {
    viewer: {
      title: 'Options Viewer | SOPHIE\'s Daddy Quant Blog',
      description: 'Interactive options chain viewer and analysis tool. Analyze real-time options data with advanced filtering and visualization capabilities.',
      keywords: ['options viewer', 'options chain', 'options analysis', 'trading tools', 'financial data'],
    },
    'when-to-trade': {
      title: 'When to Use Options | SOPHIE\'s Daddy Quant Blog',
      description: 'Learn when options are the right trading tool. Understand key scenarios for hedging, speculation, income generation, and capital efficiency.',
      keywords: ['when to use options', 'options trading', 'hedging strategies', 'options education', 'risk management'],
    },
    greeks: {
      title: 'Option Greeks Calculator | SOPHIE\'s Daddy Quant Blog',
      description: 'Master option pricing through interactive Greek calculations and visualizations. Learn Delta, Gamma, Theta, Vega, and Rho with real-time examples.',
      keywords: ['option greeks', 'delta gamma theta', 'vega rho', 'options pricing', 'black scholes', 'options calculator'],
    },
    articles: {
      title: 'Options Research Articles | SOPHIE\'s Daddy Quant Blog',
      description: 'Comprehensive summaries of essential options trading books and research articles covering key concepts, strategies, and common pitfalls to avoid.',
      keywords: ['options research', 'options trading articles', 'options education', 'trading strategies', 'options analysis'],
    },
    strategies: {
      title: 'Options Strategies Explorer | SOPHIE\'s Daddy Quant Blog',
      description: 'Explore a comprehensive taxonomy of common options strategies. Filter by market outlook and view risk profiles for various trading scenarios.',
      keywords: ['options strategies', 'options trading', 'covered calls', 'protective puts', 'spreads', 'straddles', 'strangles'],
    },
  };

  const baseMetadata = metadataMap[tab] || metadataMap.strategies;
  
  return {
    ...baseMetadata,
    openGraph: {
      title: baseMetadata.title || 'Options Education | SOPHIE\'s Daddy Quant Blog',
      description: baseMetadata.description || 'Master options trading fundamentals',
      url: `https://sophie-ai-finance.com/option/${tab}`,
      siteName: 'SOPHIE\'s Daddy Quant Blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: baseMetadata.title || 'Options Education | SOPHIE\'s Daddy Quant Blog',
      description: baseMetadata.description || 'Master options trading fundamentals',
      site: '@sophies_daddy',
    },
    alternates: {
      canonical: `https://sophie-ai-finance.com/option/${tab}`,
    },
  };
}

export default async function OptionsTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  
  if (!validTabs.includes(tab)) {
    notFound();
  }

  return <OptionsTabClient tab={tab} />;
}