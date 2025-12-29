import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuantTabClient from '@/app/quant/[tab]/client';

const validTabs = ['topics', 'quanttrading', 'articles'];

export async function generateMetadata({ params }: { params: Promise<{ tab: string }> }): Promise<Metadata> {
  const { tab } = await params;
  
  if (!validTabs.includes(tab)) {
    return {};
  }
  
  const metadataMap: Record<string, Metadata> = {
    topics: {
      title: 'Quantitative Finance Topics | SOPHIE\'s Daddy Quant Blog',
      description: 'Explore essential quantitative finance concepts including Monte Carlo simulation and financial modeling techniques.',
      keywords: ['quantitative finance', 'monte carlo simulation', 'financial modeling', 'quant methods'],
    },
    quanttrading: {
      title: 'Quantitative Trading | SOPHIE\'s Daddy Quant Blog',
      description: 'Master quantitative trading strategies and machine learning applications for systematic trading.',
      keywords: ['quantitative trading', 'systematic trading', 'machine learning finance', 'quantitative strategies'],
    },
    articles: {
      title: 'Quantitative Finance Research Articles | SOPHIE\'s Daddy Quant Blog',
      description: 'Comprehensive research articles covering quantitative finance, machine learning applications, and financial modeling.',
      keywords: ['quantitative finance research', 'quant articles', 'machine learning finance', 'financial modeling'],
    },
  };

  const baseMetadata = metadataMap[tab] || metadataMap.topics;
  
  return {
    ...baseMetadata,
    openGraph: {
      title: baseMetadata.title || 'Quantitative Finance Education | SOPHIE\'s Daddy Quant Blog',
      description: baseMetadata.description || 'Master quantitative finance fundamentals',
      url: `https://sophie-ai-finance.com/quant/${tab}`,
      siteName: 'SOPHIE\'s Daddy Quant Blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: baseMetadata.title || 'Quantitative Finance Education | SOPHIE\'s Daddy Quant Blog',
      description: baseMetadata.description || 'Master quantitative finance fundamentals',
      site: '@sophies_daddy',
    },
    alternates: {
      canonical: `https://sophie-ai-finance.com/quant/${tab}`,
    },
  };
}

export default async function QuantTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  
  if (!validTabs.includes(tab)) {
    notFound();
  }

  return <QuantTabClient tab={tab} />;
}