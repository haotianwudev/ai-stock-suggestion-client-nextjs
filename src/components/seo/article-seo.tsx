import { Metadata } from 'next';
import { Article } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from './structured-data';

interface ArticleSEOProps {
  article: Article;
  children: React.ReactNode;
}

export function ArticleSEO({ article, children }: ArticleSEOProps) {
  return (
    <>
      <StructuredData article={article} />
      <BreadcrumbStructuredData articleTitle={article.title} articleSlug={article.slug} />
      {children}
    </>
  );
}

export function generateArticleMetadata(article: Article): Metadata {
  const keywords = [
    'stock analysis',
    'investment education',
    'financial analysis',
    "SOPHIE's Daddy Quant Blog",
    ...(article.options ? ['options trading', 'put options', 'call options', 'options strategies', 'covered calls', 'cash secured puts'] : []),
    ...(article.deepResearch ? ['deep research', 'comprehensive analysis', 'detailed study'] : []),
    ...(article.isVideo ? ['video', 'educational video', 'YouTube'] : []),
    ...(article.bookSummary ? ['book summary', 'trading books', 'investment books'] : []),
  ];

  const title = `${article.title} | SOPHIE's Daddy Quant Blog`;
  const description = article.description;
  const url = `https://sophie-ai-finance.com/articles/${article.slug}`;
  const imageUrl = article.imageUrl || '/images/agents/SOPHIE.png';

  return {
    title,
    description,
    keywords,
    authors: [{ name: "SOPHIE's Daddy Quant Blog" }],
    creator: "SOPHIE's Daddy Quant Blog",
    publisher: "SOPHIE's Daddy Quant Blog",
    robots: 'index, follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "SOPHIE's Daddy Quant Blog",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date(article.date).toISOString(),
      authors: ["SOPHIE's Daddy Quant Blog"],
      section: article.options ? 'Options Trading' : 'Stock Analysis',
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@sophies_daddy', // Add your Twitter handle
    },
    // Add article-specific structured data
    other: {
      'article:published_time': new Date(article.date).toISOString(),
      'article:modified_time': new Date(article.date).toISOString(),
      'article:section': article.options ? 'Options Trading' : 'Stock Analysis',
      'article:tag': keywords.join(', '),
    },
  };
}

export function createArticleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.imageUrl || '/images/agents/SOPHIE.png',
    author: {
      '@type': 'Organization',
      name: "SOPHIE's Daddy Quant Blog",
    },
    publisher: {
      '@type': 'Organization',
      name: "SOPHIE's Daddy Quant Blog",
      logo: {
        '@type': 'ImageObject',
        url: '/images/agents/SOPHIE.png',
      },
    },
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sophie-ai-finance.com/articles/${article.slug}`,
    },
    articleSection: article.options ? 'Options Trading' : 'Stock Analysis',
    keywords: [
      ...(article.options ? ['options trading', 'put options', 'call options'] : []),
      ...(article.deepResearch ? ['deep research', 'analysis'] : []),
      'stock analysis',
      'investment',
    ].join(', '),
  };
} 