import { Metadata } from 'next';
import { Company, StockDetails } from '@/lib/graphql/types';

interface StockSEOProps {
  ticker: string;
  company?: Company;
  stockData?: StockDetails;
  children: React.ReactNode;
}

export function StockSEO({ ticker, company, stockData, children }: StockSEOProps) {
  return (
    <>
      {company && <StockStructuredData ticker={ticker} company={company} stockData={stockData} />}
      <StockBreadcrumbStructuredData ticker={ticker} companyName={company?.name} />
      {children}
    </>
  );
}

interface StockStructuredDataProps {
  ticker: string;
  company: Company;
  stockData?: StockDetails;
}

export function StockStructuredData({ ticker, company, stockData }: StockStructuredDataProps) {
  const currentPrice = stockData?.prices && stockData.prices.length > 0 
    ? stockData.prices[stockData.prices.length - 1]?.close 
    : null;

  const marketCap = stockData?.financialMetricsLatest?.market_cap;
  const pe = stockData?.financialMetricsLatest?.price_to_earnings_ratio;
  const eps = stockData?.financialMetricsLatest?.earnings_per_share;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: company.name,
    tickerSymbol: ticker,
    description: `${company.name} stock analysis and financial information. Real-time data, technical analysis, and AI-powered insights from SOPHIE.`,
    url: company.website_url,
    industry: company.industry,
    sector: company.sector,
    // Add stock quote data if available
    ...(currentPrice && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Stock Quote',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Stock',
              name: `${company.name} Stock`,
              tickerSymbol: ticker,
              price: currentPrice,
              priceCurrency: 'USD',
            },
          },
        ],
      },
    }),
    // Add financial metrics if available
    ...(marketCap && {
      marketCapitalization: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: marketCap,
      },
    }),
    // Add additional financial data
    ...(pe && eps && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Price to Earnings Ratio',
          value: pe,
        },
        {
          '@type': 'PropertyValue',
          name: 'Earnings Per Share',
          value: eps,
          unitCode: 'USD',
        },
      ],
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sophie-ai-finance.com/stock/${ticker}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface StockBreadcrumbProps {
  ticker: string;
  companyName?: string;
}

export function StockBreadcrumbStructuredData({ ticker, companyName }: StockBreadcrumbProps) {
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
        name: 'Stock Analysis',
        item: 'https://sophie-ai-finance.com/#stock-analysis',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${ticker} - ${companyName || 'Stock Analysis'}`,
        item: `https://sophie-ai-finance.com/stock/${ticker}`,
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

export function generateStockMetadata(
  ticker: string,
  company?: Company,
  stockData?: StockDetails
): Metadata {
  const companyName = company?.name || ticker;
  const title = `${ticker} Stock Analysis - ${companyName} | SOPHIE Daddy Quant Blog`;
  const description = `Comprehensive analysis of ${ticker} (${companyName}) stock with AI-powered insights from SOPHIE. Technical analysis, fundamentals, sentiment analysis, and expert AI agent recommendations.`;
  const url = `https://sophie-ai-finance.com/stock/${ticker}`;
  const imageUrl = '/images/agents/SOPHIE.png';

  const keywords = [
    `${ticker} stock`,
    `${ticker} analysis`,
    `${companyName} stock`,
    'stock analysis',
    'technical analysis',
    'fundamental analysis',
    'sentiment analysis',
    'AI stock analysis',
    'SOPHIE AI',
    'stock recommendations',
    'investment research',
    'financial analysis',
    ...(company?.sector ? [`${company.sector} stocks`] : []),
    ...(company?.industry ? [`${company.industry} analysis`] : []),
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "SOPHIE Daddy Quant Blog" }],
    creator: "SOPHIE Daddy Quant Blog",
    publisher: "SOPHIE Daddy Quant Blog",
    robots: 'index, follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "SOPHIE Daddy Quant Blog",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${ticker} Stock Analysis`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@sophies_daddy',
    },
    // Add stock-specific meta tags
    other: {
      'stock:ticker': ticker,
      'stock:company': companyName,
      ...(company?.sector && { 'stock:sector': company.sector }),
      ...(company?.industry && { 'stock:industry': company.industry }),
      'analysis:type': 'comprehensive',
      'analysis:ai': 'SOPHIE',
    },
  };
}

// Create FAQ structured data for stock pages
export function createStockFAQStructuredData(ticker: string, companyName: string) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${ticker} stock?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${ticker} is the stock ticker symbol for ${companyName}. Our AI analysis provides comprehensive insights including technical analysis, fundamental analysis, and sentiment analysis.`,
        },
      },
      {
        '@type': 'Question',
        name: `How does SOPHIE analyze ${ticker} stock?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `SOPHIE uses advanced AI algorithms to analyze ${ticker} across multiple dimensions: technical indicators, fundamental metrics, market sentiment, and combines insights from legendary investors like Warren Buffett and Charlie Munger.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is ${ticker} stock analysis investment advice?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `No, our ${ticker} analysis is for educational purposes only. SOPHIE provides insights and analysis to help you learn about investing, but this is not financial advice. Always consult with a qualified financial advisor before making investment decisions.`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}

// Create organization structured data
export function createOrganizationStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "SOPHIE Daddy Quant Blog",
    url: 'https://sophie-ai-finance.com',
    logo: 'https://sophie-ai-finance.com/images/agents/SOPHIE.png',
    description: 'AI-powered stock analysis and investment education platform featuring SOPHIE and legendary investor insights.',
    foundingDate: '2025',
    sameAs: [
      'https://twitter.com/sophies_daddy',
      // Add other social media profiles
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://sophie-ai-finance.com',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Stock Analysis Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Stock Analysis',
            description: 'Comprehensive AI-powered stock analysis and insights',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

// Create WebSite structured data for search functionality
export function createWebSiteStructuredData() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "SOPHIE Daddy Quant Blog",
    url: 'https://sophie-ai-finance.com',
    description: 'AI-powered stock analysis and investment education platform',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://sophie-ai-finance.com/stock/{search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    author: {
      '@type': 'Organization',
      name: "SOPHIE Daddy Quant Blog",
    },
    publisher: {
      '@type': 'Organization',
      name: "SOPHIE Daddy Quant Blog",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

// Create ItemList structured data for navigation
export function createNavigationStructuredData() {
  const navigationData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stock Analysis Navigation',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'WebPage',
          '@id': 'https://sophie-ai-finance.com',
          name: 'Home',
          description: 'AI-powered stock analysis and investment education',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'WebPage',
          '@id': 'https://sophie-ai-finance.com/trending',
          name: 'Trending Stocks',
          description: 'Currently trending stocks and market analysis',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'WebPage',
          '@id': 'https://sophie-ai-finance.com/option',
          name: 'Options Trading',
          description: 'Options trading strategies and analysis',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationData) }}
    />
  );
}

// Enhanced stock metadata with more SEO features
export function generateEnhancedStockMetadata(
  ticker: string,
  company?: Company,
  stockData?: StockDetails
): Metadata {
  const companyName = company?.name || ticker;
  const title = `${ticker} Stock Analysis - ${companyName} | SOPHIE Daddy Quant Blog`;
  const description = `${ticker} (${companyName}) comprehensive stock analysis with AI insights. Technical analysis, fundamentals, sentiment analysis, and expert recommendations. Updated ${new Date().toLocaleDateString()}.`;
  const url = `https://sophie-ai-finance.com/stock/${ticker}`;
  const imageUrl = '/images/agents/SOPHIE.png';
  
  const currentPrice = stockData?.prices && stockData.prices.length > 0 
    ? stockData.prices[stockData.prices.length - 1]?.close 
    : null;

  const keywords = [
    `${ticker} stock analysis`,
    `${ticker} stock price`,
    `${ticker} financial analysis`,
    `${companyName} stock`,
    `${companyName} analysis`,
    'AI stock analysis',
    'SOPHIE AI',
    'stock research',
    'investment analysis',
    'technical analysis',
    'fundamental analysis',
    'sentiment analysis',
    'stock recommendations',
    'financial insights',
    ...(company?.sector ? [`${company.sector} sector analysis`, `${company.sector} stocks`] : []),
    ...(company?.industry ? [`${company.industry} industry`, `${company.industry} stocks`] : []),
    ...(currentPrice ? [`${ticker} price ${currentPrice.toFixed(2)}`] : []),
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "SOPHIE Daddy Quant Blog" }],
    creator: "SOPHIE Daddy Quant Blog",
    publisher: "SOPHIE Daddy Quant Blog",
    robots: 'index, follow, max-image-preview:large',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "SOPHIE Daddy Quant Blog",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${ticker} Stock Analysis by SOPHIE AI`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@sophies_daddy',
    },
    // Enhanced meta tags for better SEO
    other: {
      'stock:ticker': ticker,
      'stock:company': companyName,
      'stock:exchange': 'NASDAQ/NYSE', // You might want to make this dynamic
      ...(company?.sector && { 'stock:sector': company.sector }),
      ...(company?.industry && { 'stock:industry': company.industry }),
      ...(currentPrice && { 'stock:price': currentPrice.toString() }),
      'analysis:type': 'comprehensive',
      'analysis:ai': 'SOPHIE',
      'analysis:updated': new Date().toISOString(),
      'content:type': 'stock-analysis',
      'content:language': 'en',
      'geo:region': 'US',
      'geo:placename': 'United States',
      'content:author': "SOPHIE Daddy Quant Blog",
      'content:publisher': "SOPHIE Daddy Quant Blog",
    },
  };
} 