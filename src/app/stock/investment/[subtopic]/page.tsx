import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicConfig } from '../../topics/config';
import StockTabClient from '../../trending/client';

const validSubtopics = ['macro-analysis', 'wealth-planning', 'finance-101'];

export async function generateMetadata({ params }: { params: Promise<{ subtopic: string }> }): Promise<Metadata> {
  const { subtopic } = await params;

  if (!validSubtopics.includes(subtopic)) {
    return {};
  }

  const topicConfig = getTopicConfig(subtopic);
  if (!topicConfig) {
    return {};
  }

  const title = `${topicConfig.title} | Investment`;
  const fullTitle = `${title} | SOPHIE's Daddy Quant Blog`;
  const description = topicConfig.description;

  return {
    title,
    description,
    keywords: ['investment', topicConfig.title.toLowerCase(), 'macro analysis', 'wealth planning', 'finance 101'],
    openGraph: {
      title: fullTitle,
      description,
      url: `https://sophie-ai-finance.com/stock/investment/${subtopic}`,
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
      canonical: `https://sophie-ai-finance.com/stock/investment/${subtopic}`,
    },
  };
}

export default async function InvestmentSubtopicPage({ params }: { params: Promise<{ subtopic: string }> }) {
  const { subtopic } = await params;

  if (!validSubtopics.includes(subtopic)) {
    notFound();
  }

  return <StockTabClient tab="investment" subtopic={subtopic} />;
}
