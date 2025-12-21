import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OptionsTabClient from '../../[tab]/client';

const validSubtopics = ['when-to-trade', 'greeks'];

export async function generateMetadata({ params }: { params: Promise<{ subtopic: string }> }): Promise<Metadata> {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    return {};
  }
  
  const metadataMap: Record<string, Metadata> = {
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