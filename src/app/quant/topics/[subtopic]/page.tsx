import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicConfig } from '../config';
import QuantTabClient from '@/app/quant/[tab]/client';

const validSubtopics = ['monte-carlo', 'statistical-analysis', 'derivatives-pricing', 'ai-in-quant', 'risk-management'];

export async function generateMetadata({ params }: { params: Promise<{ subtopic: string }> }): Promise<Metadata> {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    return {};
  }
  
  const topicConfig = getTopicConfig(subtopic);
  if (!topicConfig) {
    return {};
  }
  
  const title = `${topicConfig.title} | Quantitative Finance`;
  const fullTitle = `${title} | SOPHIE's Daddy Quant Blog`;
  const description = topicConfig.description;

  return {
    title,
    description,
    keywords: ['quantitative finance', topicConfig.title.toLowerCase(), 'quant methods', 'financial modeling', 'algorithmic trading'],
    openGraph: {
      title: fullTitle,
      description,
      url: `https://sophie-ai-finance.com/quant/topics/${subtopic}`,
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
      canonical: `https://sophie-ai-finance.com/quant/topics/${subtopic}`,
    },
  };
}

export default async function QuantSubtopicPage({ params }: { params: Promise<{ subtopic: string }> }) {
  const { subtopic } = await params;
  
  if (!validSubtopics.includes(subtopic)) {
    notFound();
  }

  return <QuantTabClient tab="topics" subtopic={subtopic} />;
}