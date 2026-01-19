import { generateRSSFeed } from '@/lib/rss';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rssContent = generateRSSFeed();
    
    return new NextResponse(rssContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'CDN-Cache-Control': 'public, max-age=86400', // Cache on CDN for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}

// Enable static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour