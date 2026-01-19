import Link from 'next/link';
import { ArrowLeft, Rss, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function RSSPage() {
  const rssFeeds = [
    {
      title: 'All Articles',
      description: 'Complete feed of all articles from SOPHIE\'s Daddy Quant Blog',
      url: '/rss.xml',
      category: 'Main Feed',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Quantitative Finance',
      description: 'Advanced quantitative methods, mathematical models, and systematic trading strategies',
      url: '/rss/quantitative-finance',
      category: 'Specialized',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Options Trading',
      description: 'Options strategies, Greeks analysis, volatility trading, and derivatives',
      url: '/rss/options-trading',
      category: 'Specialized',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      title: 'Deep Research',
      description: 'Comprehensive analysis articles with detailed research and documentation',
      url: '/rss/deep-research',
      category: 'Content Type',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Video Content',
      description: 'YouTube tutorials and video explanations of complex financial concepts',
      url: '/rss/video-content',
      category: 'Content Type',
      color: 'bg-red-100 text-red-800'
    },
    {
      title: 'Podcast Episodes',
      description: 'Audio content and podcast episodes on Spotify',
      url: '/rss/podcast',
      category: 'Content Type',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Machine learning applications in finance, neural networks, and AI trading',
      url: '/rss/ai-ml',
      category: 'Specialized',
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      title: 'Stock Analysis',
      description: 'Individual stock analysis, DCF models, and equity research',
      url: '/rss/stock-analysis',
      category: 'Specialized',
      color: 'bg-teal-100 text-teal-800'
    },
    {
      title: 'Macro Views',
      description: 'Macroeconomic analysis, market outlook, and economic commentary',
      url: '/rss/macro-views',
      category: 'Specialized',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Cryptocurrency',
      description: 'Bitcoin, blockchain technology, and cryptocurrency analysis',
      url: '/rss/crypto',
      category: 'Specialized',
      color: 'bg-amber-100 text-amber-800'
    },
    {
      title: 'Finance 101',
      description: 'Educational content for beginners and foundational concepts',
      url: '/rss/finance-101',
      category: 'Educational',
      color: 'bg-cyan-100 text-cyan-800'
    },
    {
      title: 'Book Reviews',
      description: 'Reviews and summaries of finance and trading books',
      url: '/rss/book-review',
      category: 'Educational',
      color: 'bg-pink-100 text-pink-800'
    }
  ];

  const groupedFeeds = rssFeeds.reduce((acc, feed) => {
    if (!acc[feed.category]) {
      acc[feed.category] = [];
    }
    acc[feed.category].push(feed);
    return acc;
  }, {} as Record<string, typeof rssFeeds>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <Rss className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            RSS Feeds
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Stay updated with the latest quantitative finance insights, options strategies, and market analysis. 
            Choose from our specialized RSS feeds to get exactly the content you want.
          </p>
        </div>
      </div>

      {/* RSS Feeds */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        {Object.entries(groupedFeeds).map(([category, feeds]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feeds.map((feed) => (
                <div 
                  key={feed.url}
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Rss className="h-5 w-5 text-orange-500" />
                      <h3 className="text-lg font-semibold text-slate-900">{feed.title}</h3>
                    </div>
                    <Badge className={feed.color}>
                      {feed.category}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    {feed.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <Link
                      href={feed.url}
                      className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm font-medium"
                    >
                      <Rss className="mr-2 h-4 w-4" />
                      Subscribe
                    </Link>
                    <Link
                      href={feed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 text-sm font-medium"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View XML
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* How to Use Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use RSS Feeds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Popular RSS Readers</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• <strong>Feedly</strong> - Web-based RSS reader</li>
                <li>• <strong>Inoreader</strong> - Advanced RSS features</li>
                <li>• <strong>NewsBlur</strong> - Social RSS reader</li>
                <li>• <strong>Apple News</strong> - Built into iOS/macOS</li>
                <li>• <strong>Google News</strong> - Web and mobile</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Getting Started</h3>
              <ol className="space-y-2 text-slate-600">
                <li>1. Choose an RSS reader from the list</li>
                <li>2. Copy the RSS feed URL you want</li>
                <li>3. Add the feed to your RSS reader</li>
                <li>4. Get notified of new articles automatically</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            © 2026 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}