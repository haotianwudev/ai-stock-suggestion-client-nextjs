import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicConfig } from '../../topics/config';
import StockTabClient from '../../trending/client';

const validSubtopics = ['stock-analysis', '13f-analysis', 'etf-mutual-fund'];

export async function generateMetadata({ params }: { params: Promise<{ subtopic: string }> }): Promise<Metadata> {
  const { subtopic } = await params;

  if (!validSubtopics.includes(subtopic)) {
    return {};
  }

  const topicConfig = getTopicConfig(subtopic);
  if (!topicConfig) {
    return {};
  }

  const title = `${topicConfig.title} | Stock Analysis`;
  const fullTitle = `${title} | SOPHIE's Daddy Quant Blog`;
  const description = topicConfig.description;

  return {
    title,
    description,
    keywords: ['stock analysis', topicConfig.title.toLowerCase(), '13F filings', 'ETF', 'institutional investors'],
    openGraph: {
      title: fullTitle,
      description,
      url: `https://www.sophie-ai-finance.com/stock/stock-analysis/${subtopic}`,
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
      canonical: `https://www.sophie-ai-finance.com/stock/stock-analysis/${subtopic}`,
    },
  };
}

export default async function StockAnalysisSubtopicPage({ params }: { params: Promise<{ subtopic: string }> }) {
  const { subtopic } = await params;

  if (!validSubtopics.includes(subtopic)) {
    notFound();
  }

  return <StockTabClient tab="stock-analysis" subtopic={subtopic} />;
}
