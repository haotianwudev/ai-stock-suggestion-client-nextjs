import Link from 'next/link';
import { Rss } from 'lucide-react';

interface RSSLinkProps {
  variant?: 'button' | 'icon' | 'text';
  className?: string;
  showText?: boolean;
}

export function RSSLink({ variant = 'icon', className = '', showText = true }: RSSLinkProps) {
  const baseClasses = "inline-flex items-center transition-colors duration-200";
  
  const variantClasses = {
    button: "px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium",
    icon: "text-orange-600 hover:text-orange-700 p-2 rounded-lg hover:bg-orange-50",
    text: "text-orange-600 hover:text-orange-700 underline"
  };

  return (
    <Link 
      href="/rss" 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      title="Subscribe to RSS feeds"
    >
      <Rss className={`h-4 w-4 ${showText && variant !== 'text' ? 'mr-2' : ''}`} />
      {showText && variant !== 'icon' && 'RSS'}
    </Link>
  );
}

// Quick RSS subscription component for articles
export function QuickRSSSubscribe({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm text-slate-600 ${className}`}>
      <span>Stay updated:</span>
      <Link 
        href="/rss.xml" 
        className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Rss className="h-3 w-3 mr-1" />
        RSS
      </Link>
    </div>
  );
}