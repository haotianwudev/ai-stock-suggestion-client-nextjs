import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicConfig } from '../config';
import StockTabClient from '../../trending/client';

const validSubtopics = ['13f-analysis', 'macro-analysis', 'etf-mutual-fund', 'wealth-planning', 'finance-101'];

export async function generateMetadata({ params }: { params: Promise<{ subtopic: string }> }): Promise<Metadata> {
  const { subtopic } = await params;

  if (!validSubtopics.includes(subtopic)) {
    return {};
  }

  const topicConfig = getTopicConfig(subtopic);
  if (!topicConfig) {
    return {};
  }

  const title = `${topicConfig.title} | Stock Analysis | SOPHIE's Daddy Quant Blog`;
  const description = topicConfig.description;

  return {
    title,
    description,
    keywords: ['stock analysis', topicConfig.title.toLowerCase(), '13F filings', 'macro analysis', 'institutional investors'],
    openGraph: {
      title,
      description,
      url: `https://sophie-ai-finance.com/stock/topics/${subtopic}`,
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
      canonical: `https://sophie-ai-finance.com/stock/topics/${subtopic}`,
    },
  };
}

export default async function StockSubtopicPage({ params }: { params: Promise<{ subtopic: string }> }) {
  const { subtopic } = await params;

  if (!validSubtopics.includes(subtopic)) {
    notFound();
  }

  return <StockTabClient tab="topics" subtopic={subtopic} />;
}
