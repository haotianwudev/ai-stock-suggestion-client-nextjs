import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OptionsTabClient from '../../[tab]/client';

const validSubtopics = ['option101', 'greeks', 'vrp', 'gex', 'roll'];

export async function generateMetadata({ params }: { params: Promise<{ subtopic: string }> }): Promise<Metadata> {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    return {};
  }
  
  const metadataMap: Record<string, Metadata> = {
    'option101': {
      title: 'Options 101 | SOPHIE\'s Daddy Quant Blog',
      description: 'Learn when options are the right trading tool. Understand key scenarios for hedging, speculation, income generation, and capital efficiency.',
      keywords: ['options 101', 'options basics', 'when to use options', 'options trading', 'hedging strategies', 'options education', 'risk management'],
    },
    greeks: {
      title: 'Option Greeks Calculator | SOPHIE\'s Daddy Quant Blog',
      description: 'Master option pricing through interactive Greek calculations and visualizations. Learn Delta, Gamma, Theta, Vega, and Rho with real-time examples.',
      keywords: ['option greeks', 'delta gamma theta', 'vega rho', 'options pricing', 'black scholes', 'options calculator'],
    },
    vrp: {
      title: 'Volatility Risk Premium (VRP) | SOPHIE\'s Daddy Quant Blog',
      description: 'Master the systematic edge in options markets. Learn how implied volatility consistently overstates realized volatility and how to harvest this premium.',
      keywords: ['volatility risk premium', 'VRP', 'implied volatility', 'realized volatility', 'options selling', 'premium harvesting'],
    },
    gex: {
      title: 'Gamma Exposure (GEX) | SOPHIE\'s Daddy Quant Blog',
      description: 'Understanding how market makers\' gamma exposure influences market volatility and price movements, creating predictable trading patterns.',
      keywords: ['gamma exposure', 'GEX', 'market makers', 'volatility', 'options flow', 'gamma hedging'],
    },
    roll: {
      title: 'Rolling Options Strategy | SOPHIE\'s Daddy Quant Blog',
      description: 'Master the strategic framework for rolling short option positions through defensive and offensive techniques. Learn when to roll, close, or hold using quantitative triggers.',
      keywords: ['rolling options', 'options management', 'defensive rolling', 'offensive rolling', 'options repair', 'Greeks triggers'],
    },
  };

  const baseMetadata = metadataMap[subtopic];
  
  return {
    ...baseMetadata,
    openGraph: {
      title: baseMetadata.title || 'Options Topics | SOPHIE\'s Daddy Quant Blog',
      description: baseMetadata.description || 'Master options trading fundamentals',
      url: `https://sophie-ai-finance.com/option/topics/${subtopic}`,
      siteName: 'SOPHIE\'s Daddy Quant Blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: baseMetadata.title || 'Options Topics | SOPHIE\'s Daddy Quant Blog',
      description: baseMetadata.description || 'Master options trading fundamentals',
      site: '@sophies_daddy',
    },
    alternates: {
      canonical: `https://sophie-ai-finance.com/option/topics/${subtopic}`,
    },
  };
}

export default async function OptionsTopicsPage({ params }: { params: Promise<{ subtopic: string }> }) {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    notFound();
  }

  // Pass 'topics' as the main tab and subtopic for nested navigation
  return <OptionsTabClient tab="topics" subtopic={subtopic} />;
}