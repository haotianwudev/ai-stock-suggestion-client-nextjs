import { generateCategoryRSSFeed } from '@/lib/rss';
import { NextResponse } from 'next/server';
import { ArticleLabel } from '@/data/articles/types';

// Define available RSS categories
const RSS_CATEGORIES = [
  'quantitative-finance',
  'options-trading', 
  'deep-research',
  'video-content',
  'podcast',
  'ai-ml',
  'stock-analysis',
  'macro-views',
  'crypto',
  'finance-101',
  'book-review'
];

// Map URL slugs to display names
const CATEGORY_MAP: Record<string, string> = {
  'quantitative-finance': 'Quantitative Finance',
  'options-trading': 'Options Trading',
  'deep-research': 'Deep Research',
  'video-content': 'Video Content',
  'podcast': 'Podcast',
  'ai-ml': 'AI & Machine Learning',
  'stock-analysis': 'Stock Analysis',
  'macro-views': 'Macro Views',
  'crypto': 'Crypto',
  'finance-101': 'Finance 101',
  'book-review': 'Book Review'
};

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    
    // Validate category
    if (!RSS_CATEGORIES.includes(category)) {
      return new NextResponse('Category not found', { status: 404 });
    }
    
    const categoryName = CATEGORY_MAP[category];
    const rssContent = generateCategoryRSSFeed(categoryName);
    
    return new NextResponse(rssContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'CDN-Cache-Control': 'public, max-age=86400', // Cache on CDN for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating category RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}

// Generate static params for all categories
export async function generateStaticParams() {
  return RSS_CATEGORIES.map((category) => ({
    category,
  }));
}

// Enable static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour