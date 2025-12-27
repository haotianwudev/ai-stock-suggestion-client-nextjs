import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAlgoTopicConfig } from '../config';
import QuantTabClient from '../../[tab]/client';

const validSubtopics = ['systematic-strategies', 'machine-learning', 'backtesting', 'execution'];

export async function generateMetadata({ params }: { params: Promise<{ subtopic: string }> }): Promise<Metadata> {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    return {};
  }
  
  const topicConfig = getAlgoTopicConfig(subtopic);
  if (!topicConfig) {
    return {};
  }
  
  const title = `${topicConfig.title} | Algorithmic Trading | SOPHIE's Daddy Quant Blog`;
  const description = topicConfig.description;
  
  return {
    title,
    description,
    keywords: ['algorithmic trading', topicConfig.title.toLowerCase(), 'systematic trading', 'backtesting', 'execution algorithms'],
    openGraph: {
      title,
      description,
      url: `https://sophie-ai-finance.com/quant/algotrading/${subtopic}`,
      siteName: 'SOPHIE\'s Daddy Quant Blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@sophies_daddy',
    },
    alternates: {
      canonical: `https://sophie-ai-finance.com/quant/algotrading/${subtopic}`,
    },
  };
}

export default async function AlgoTradingSubtopicPage({ params }: { params: Promise<{ subtopic: string }> }) {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    notFound();
  }

  return <QuantTabClient tab="algotrading" subtopic={subtopic} />;
}