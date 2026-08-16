"use client";

import { Search, X, Bookmark } from "lucide-react";
import { ArticleLabel } from "@/data/articles/types";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";

interface ArticleFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedLabels: string[];
  onLabelsChange: (labels: string[]) => void;
  availableLabels: string[];
  bookmarkedOnly: boolean;
  onBookmarkedOnlyChange: (bookmarkedOnly: boolean) => void;
}

export function ArticleFilter({
  searchText,
  onSearchChange,
  selectedLabels,
  onLabelsChange,
  availableLabels,
  bookmarkedOnly,
  onBookmarkedOnlyChange
}: ArticleFilterProps) {
  const { user } = useUser();
  const { t } = useLanguage();

  const toggleLabel = (label: string) => {
    if (selectedLabels.includes(label)) {
      onLabelsChange(selectedLabels.filter(l => l !== label));
    } else {
      onLabelsChange([...selectedLabels, label]);
    }
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onLabelsChange([]);
    onBookmarkedOnlyChange(false);
  };

  const hasActiveFilters = searchText !== '' || selectedLabels.length > 0 || bookmarkedOnly;

  return (
    <div className="w-full space-y-3">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder={t("articleFilter.searchPlaceholder")}
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#A8672E]/60 dark:focus:border-[#D08F52]/60 focus:ring-2 focus:ring-[#A8672E]/20 dark:focus:ring-[#D08F52]/20 shadow-xs transition-all duration-200 text-sm"
          />
          {searchText && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-xl transition-colors duration-200 whitespace-nowrap"
          >
            <X className="h-3.5 w-3.5" />
            <span>{t("articleFilter.clearAll")}</span>
          </button>
        )}
      </div>

      {/* Label Filter Pills */}
      {(availableLabels.length > 0 || user) && (
        <div className="flex flex-wrap gap-2">
          {user && (
            <button
              onClick={() => onBookmarkedOnlyChange(!bookmarkedOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                bookmarkedOnly
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-slate-700 dark:text-slate-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:text-[#A8672E] dark:hover:text-[#D08F52]'
              }`}
            >
              <Bookmark className="h-3 w-3" fill={bookmarkedOnly ? "currentColor" : "none"} />
              {t("articleFilter.bookmarked")}
              {bookmarkedOnly && <X className="h-3 w-3" />}
            </button>
          )}
          {availableLabels.map((label) => {
            const isSelected = selectedLabels.includes(label);
            return (
              <button
                key={label}
                onClick={() => toggleLabel(label)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-slate-700 dark:text-slate-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:text-[#A8672E] dark:hover:text-[#D08F52]'
                }`}
              >
                {label}
                {isSelected && <X className="h-3 w-3" />}
              </button>
            );
          })}
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
  if (typeof window === 'undefined') {
    // Server-side: check NODE_ENV or assume localhost for development
    return process.env.NODE_ENV === 'development';
  }
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

// Get all available labels from the enum dynamically
export function getAllLabels(): string[] {
  return Object.values(ArticleLabel);
}

// Simplified filtering function with text search, label, and bookmarked-only support
export function getFilteredArticles(
  articles: any[],
  searchText: string = '',
  selectedLabels: string[] = [],
  bookmarkedSlugs: string[] = [],
  bookmarkedOnly: boolean = false
) {
  // Skip date filtering on localhost for development
  const shouldFilterByDate = !isLocalhost();
  
  // First filter out articles with future dates (unless on localhost)
  let filteredArticles = shouldFilterByDate 
    ? articles.filter(article => !isArticleDateInFuture(article.date))
    : articles;
  
  // Apply text search
  if (searchText.trim() !== '') {
    const searchLower = searchText.toLowerCase();
    filteredArticles = filteredArticles.filter(article => 
      article.title.toLowerCase().includes(searchLower) ||
      article.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply label filter
  if (selectedLabels.length > 0) {
    filteredArticles = filteredArticles.filter(article => {
      if (!article.labels || !Array.isArray(article.labels)) return false;
      // Article must have at least one of the selected labels
      return selectedLabels.some(label => article.labels.includes(label));
    });
  }

  // Apply bookmarked-only filter
  if (bookmarkedOnly) {
    filteredArticles = filteredArticles.filter(article =>
      article.slug && bookmarkedSlugs.includes(article.slug)
    );
  }

  return filteredArticles;
}