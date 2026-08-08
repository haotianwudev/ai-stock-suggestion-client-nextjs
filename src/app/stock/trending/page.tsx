import { Metadata } from 'next';
import StockTabClient from './client';

export const metadata: Metadata = {
  title: 'Trending Stocks & Tutorials | Stock & Investment | SOPHIE\'s Daddy Quant Blog',
  description: 'Pick a trending stock to see comprehensive analysis, AI agent suggestions, and tutorials.',
  keywords: ['stock analysis', 'trending stocks', 'stock tutorials', 'AI stock analysis'],
  openGraph: {
    title: 'Trending Stocks & Tutorials | Stock & Investment | SOPHIE\'s Daddy Quant Blog',
    description: 'Pick a trending stock to see comprehensive analysis, AI agent suggestions, and tutorials.',
    url: 'https://sophie-ai-finance.com/stock/trending',
    siteName: 'SOPHIE\'s Daddy Quant Blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trending Stocks & Tutorials | Stock & Investment | SOPHIE\'s Daddy Quant Blog',
    description: 'Pick a trending stock to see comprehensive analysis, AI agent suggestions, and tutorials.',
    site: '@sophies_daddy',
  },
  alternates: {
    canonical: 'https://sophie-ai-finance.com/stock/trending',
  },
};

export default function StockTrendingPage() {
  return <StockTabClient tab="trending" />;
}
