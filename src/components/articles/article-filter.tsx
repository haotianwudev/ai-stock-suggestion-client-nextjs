"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Filter } from "lucide-react";

// Configuration-based approach for easy expansion
const FILTER_CONFIG = {
  all: { label: 'All Articles', icon: '📚' },
  deepResearch: { label: 'Deep Research', icon: '🔍', property: 'deepResearch' },
  options: { label: 'Options Trading', icon: '📈', property: 'options' },
  video: { label: 'Video Content', icon: '🎥', property: 'isVideo' },
  // Easy to add new labels here:
  // ai: { label: 'AI Content', icon: '🤖', property: 'ai' },
  // crypto: { label: 'Crypto', icon: '₿', property: 'crypto' },
  // etfs: { label: 'ETFs', icon: '📊', property: 'etfs' },
} as const;

export type ArticleFilter = keyof typeof FILTER_CONFIG;

interface ArticleFilterProps {
  selectedFilter: ArticleFilter;
  onFilterChange: (filter: ArticleFilter) => void;
}

// Generate filter options dynamically from config
const filterOptions = Object.entries(FILTER_CONFIG).map(([key, config]) => ({
  value: key as ArticleFilter,
  label: config.label,
  icon: config.icon,
}));

export function ArticleFilter({ selectedFilter, onFilterChange }: ArticleFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = filterOptions.find(option => option.value === selectedFilter);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 min-w-[200px] justify-between"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">
            {selectedOption?.icon} {selectedOption?.label}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="py-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilterChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200 ${
                  selectedFilter === option.value ? 'bg-accent text-accent-foreground' : ''
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Utility function to check if article date is in the future
function isArticleDateInFuture(articleDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
  
  const articleDateObj = new Date(articleDate);
  articleDateObj.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
  
  return articleDateObj > today;
}

// Utility function to check if running on localhost
function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

// Dynamic filtering function - no more switch statements!
export function getFilteredArticles(articles: any[], filter: ArticleFilter) {
  // Skip date filtering on localhost for development
  const shouldFilterByDate = !isLocalhost();
  
  // First filter out articles with future dates (unless on localhost)
  const publishedArticles = shouldFilterByDate 
    ? articles.filter(article => !isArticleDateInFuture(article.date))
    : articles;
  
  if (filter === 'all') return publishedArticles;
  
  const config = FILTER_CONFIG[filter];
  if (!config.property) return publishedArticles;
  
  return publishedArticles.filter(article => article[config.property] === true);
} 