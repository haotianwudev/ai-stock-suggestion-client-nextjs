import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OptionsTabClient from './client';

const validTabs = ['viewer', 'topics', 'articles', 'strategies'];

export async function generateMetadata({ params }: { params: Promise<{ tab: string }> }): Promise<Metadata> {
  const { tab } = await params;
  
  if (!validTabs.includes(tab)) {
    return {};
  }
  
  const metadataMap: Record<string, Metadata> = {
    viewer: {
      title: 'Options Viewer',
      description: 'Interactive options chain viewer and analysis tool. Analyze real-time options data with advanced filtering and visualization capabilities.',
      keywords: ['options viewer', 'options chain', 'options analysis', 'trading tools', 'financial data'],
    },
    topics: {
      title: 'Options Topics',
      description: 'Explore essential options trading concepts including when to trade options and understanding the Greeks.',
      keywords: ['options education', 'options topics', 'when to use options', 'option greeks', 'options fundamentals'],
    },
    articles: {
      title: 'Options Research Articles',
      description: 'Comprehensive summaries of essential options trading books and research articles covering key concepts, strategies, and common pitfalls to avoid.',
      keywords: ['options research', 'options trading articles', 'options education', 'trading strategies', 'options analysis'],
    },
    strategies: {
      title: 'Options Strategies Explorer',
      description: 'Explore a comprehensive taxonomy of common options strategies. Filter by market outlook and view risk profiles for various trading scenarios.',
      keywords: ['options strategies', 'options trading', 'covered calls', 'protective puts', 'spreads', 'straddles', 'strangles'],
    },
  };

  const baseMetadata = metadataMap[tab] || metadataMap.strategies;
  // openGraph/twitter titles aren't run through the root layout's title template, so they
  // need the site-name suffix spelled out explicitly (unlike the top-level `title` below).
  const fullTitle = `${baseMetadata.title || 'Options Education'} | SOPHIE's Daddy Quant Blog`;

  return {
    ...baseMetadata,
    openGraph: {
      title: fullTitle,
      description: baseMetadata.description || 'Master options trading fundamentals',
      url: `https://sophie-ai-finance.com/option/${tab}`,
      siteName: 'SOPHIE\'s Daddy Quant Blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
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