import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuantTopicConfig } from '../config';
import QuantTabClient from '../../[tab]/client';

const validSubtopics = ['systematic-strategies', 'machine-learning', 'backtest', 'trading-system', 'asset-allocation'];

export async function generateMetadata({ params }: { params: Promise<{ subtopic: string }> }): Promise<Metadata> {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    return {};
  }
  
  const topicConfig = getQuantTopicConfig(subtopic);
  if (!topicConfig) {
    return {};
  }
  
  const title = `${topicConfig.title} | Quantitative Trading`;
  const fullTitle = `${title} | SOPHIE's Daddy Quant Blog`;
  const description = topicConfig.description;

  return {
    title,
    description,
    keywords: ['quantitative trading', topicConfig.title.toLowerCase(), 'systematic trading', 'machine learning'],
    openGraph: {
      title: fullTitle,
      description,
      url: `https://sophie-ai-finance.com/quant/quanttrading/${subtopic}`,
      siteName: 'SOPHIE\'s Daddy Quant Blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: '@sophies_daddy',
    },
    alternates: {
      canonical: `https://sophie-ai-finance.com/quant/quanttrading/${subtopic}`,
    },
  };
}

export default async function QuantTradingSubtopicPage({ params }: { params: Promise<{ subtopic: string }> }) {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    notFound();
  }

  return <QuantTabClient tab="quanttrading" subtopic={subtopic} />;
}