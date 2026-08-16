"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SearchIcon } from "@/components/icons";
import { articles } from "@/data/articles";
import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getGraphQLUri } from "@/lib/apollo/gql-config";
import { useUser } from "@/hooks/use-user";
import { canAccessPremiumContent } from "@/lib/tiers";

interface StockSearchResult {
  ticker: string;
  name: string;
  type: 'stock';
}

interface ArticleSearchResult {
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  youtubeUrl?: string;
  isVideo?: boolean;
  type: 'article';
}

type SearchResult = StockSearchResult | ArticleSearchResult;

// GraphQL query to search stocks
const SEARCH_STOCKS_QUERY = gql`
  query SearchStocks($query: String!) {
    searchStocks(query: $query) {
      ticker
      name
    }
  }
`;

// Create Apollo client
const createApolloClient = () => {
  const graphqlUri = getGraphQLUri();
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) =>
        console.error(`[GraphQL error]: ${message}`),
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: graphqlUri,
  });

  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { profile } = useUser();
  const canViewPremium = canAccessPremiumContent(profile?.tier ?? 1);

  // Perform search
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const searchResults: SearchResult[] = [];

    // Search articles locally
    const searchLower = query.toLowerCase();
    const filteredArticles = articles
      .filter(article => 
        (canViewPremium || !article.premiumContent) && 
        (article.title.toLowerCase().includes(searchLower) ||
         (article.description && article.description.toLowerCase().includes(searchLower))))
      .slice(0, 5);
    
    filteredArticles.forEach(article => {
      if (article.slug) {
        searchResults.push({
          title: article.title,
          slug: article.slug,
          description: article.description || '',
          imageUrl: article.imageUrl,
          youtubeUrl: article.youtubeUrl,
          isVideo: article.isVideo,
          type: 'article'
        });
      }
    });

    // Show article results immediately (local search is instant)
    setResults([...searchResults]);
    setIsSearching(false); // Stop loading immediately after showing articles

    // Search stocks via GraphQL in background - requires at least 2 characters
    // This runs asynchronously without blocking the UI
    if (query.length >= 2) {
      try {
        const client = createApolloClient();
        const { data } = await client.query({
          query: SEARCH_STOCKS_QUERY,
          variables: { query: query.toUpperCase() }
        });

        if (data?.searchStocks) {
          const stockResults: SearchResult[] = [];
          data.searchStocks.slice(0, 5).forEach((stock: any) => {
            stockResults.push({
              ticker: stock.ticker,
              name: stock.name,
              type: 'stock'
            });
          });
          
          // Add stock results to existing article results
          setResults([...searchResults, ...stockResults]);
        }
      } catch (error) {
        console.error("Stock search error:", error);
      }
    }
  }, [canViewPremium]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setSearchQuery("");
    if (result.type === 'article') {
      // If it's a video article with YouTube URL, open YouTube directly
      if (result.isVideo && result.youtubeUrl) {
        window.open(result.youtubeUrl, '_blank');
      } else {
        router.push(`/articles/${result.slug}`);
      }
    } else {
      router.push(`/stock/${result.ticker}`);
    }
  };

  // Group results by type
  const stockResults = results.filter(r => r.type === 'stock') as StockSearchResult[];
  const articleResults = results.filter(r => r.type === 'article') as ArticleSearchResult[];

  return (
    <>
      <button
        type="button"
        className="relative flex items-center h-9 w-full justify-start rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 text-xs font-normal text-slate-500 dark:text-slate-400 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:text-slate-900 dark:hover:text-slate-100 shadow-xs sm:pr-12 md:w-40 lg:w-64 transition-colors"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="mr-2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400 opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search stocks or articles..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {isSearching ? (
            <CommandEmpty>Searching...</CommandEmpty>
          ) : results.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <>
              {stockResults.length > 0 && (
                <CommandGroup heading="Stocks">
                  {stockResults.map((stock) => (
                    <CommandItem
                      key={stock.ticker}
                      value={stock.ticker}
                      onSelect={() => handleSelect(stock)}
                    >
                      <div className="flex items-center">
                        <span className="mr-2 font-bold">{stock.ticker}</span>
                        <span className="text-sm text-muted-foreground">{stock.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {articleResults.length > 0 && (
                <CommandGroup heading="Articles">
                  {articleResults.map((article) => (
                    <CommandItem
                      key={article.slug}
                      value={article.slug}
                      onSelect={() => handleSelect(article)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        {article.imageUrl && (
                          <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-12 h-12 object-cover rounded flex-shrink-0"
                          />
                        )}
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-semibold text-sm truncate">{article.title}</span>
                          <span className="text-xs text-muted-foreground line-clamp-1">{article.description}</span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
} 