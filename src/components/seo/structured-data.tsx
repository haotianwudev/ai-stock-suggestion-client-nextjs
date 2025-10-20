import { Article } from '@/data/articles';

interface StructuredDataProps {
  article: Article;
}

export function StructuredData({ article }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.imageUrl || '/images/agents/SOPHIE.png',
    author: {
      '@type': 'Organization',
      name: "SOPHIE Daddy Quant Blog",
    },
    publisher: {
      '@type': 'Organization',
      name: "SOPHIE Daddy Quant Blog",
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
      ...(article.options ? ['options trading', 'put options', 'call options', 'options strategies'] : []),
      ...(article.deepResearch ? ['deep research', 'comprehensive analysis'] : []),
      ...(article.isVideo ? ['video', 'educational video'] : []),
      'stock analysis',
      'investment education',
      'financial analysis',
    ].join(', '),
    about: {
      '@type': 'Thing',
      name: article.options ? 'Options Trading' : 'Stock Analysis',
    },
    // Add video structured data if it's a video article
    ...(article.isVideo && article.youtubeUrl && {
      video: {
        '@type': 'VideoObject',
        name: article.title,
        description: article.description,
        thumbnailUrl: article.imageUrl,
        embedUrl: article.youtubeUrl,
        uploadDate: new Date(article.date).toISOString(),
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BreadcrumbProps {
  articleTitle: string;
  articleSlug: string;
}

export function BreadcrumbStructuredData({ articleTitle, articleSlug }: BreadcrumbProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sophie-ai-finance.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: 'https://sophie-ai-finance.com/#articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: articleTitle,
        item: `https://sophie-ai-finance.com/articles/${articleSlug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
} 