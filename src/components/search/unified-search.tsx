"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { articles } from "@/data/articles";
import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getGraphQLUri } from "@/lib/apollo/gql-config";

interface UnifiedSearchProps {
  onResultsChange?: (hasResults: boolean) => void;
}

interface StockSearchResult {
  ticker: string;
  name: string;
  type: 'stock';
}

interface ArticleSearchResult {
  title: string;
  slug: string;
  description: string;
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

export function UnifiedSearch({ onResultsChange }: UnifiedSearchProps) {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      onResultsChange?.(false);
      return;
    }

    setIsSearching(true);
    const searchResults: SearchResult[] = [];

    try {
      // Search articles locally - direct search without date filtering
      const searchLower = query.toLowerCase();
      const filteredArticles = articles
        .filter(article => 
          !article.bookSummary && 
          (article.title.toLowerCase().includes(searchLower) ||
           (article.description && article.description.toLowerCase().includes(searchLower)))
        )
        .slice(0, 5);
      
      filteredArticles.forEach(article => {
        if (article.slug) {
          searchResults.push({
            title: article.title,
            slug: article.slug,
            description: article.description || '',
            type: 'article'
          });
        }
      });

      // Show article results immediately (local search is instant)
      setResults([...searchResults]);
      setShowResults(true);
      onResultsChange?.(searchResults.length > 0);

      // Search stocks via GraphQL - requires at least 2 characters
      // This runs asynchronously and updates results when complete
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
            onResultsChange?.(searchResults.length + stockResults.length > 0);
          }
        } catch (error) {
          console.error("Stock search error:", error);
          // Continue with article results even if stock search fails
        }
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, [onResultsChange]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, performSearch]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'article') {
      router.push(`/articles/${result.slug}`);
    } else {
      router.push(`/stock/${result.ticker}`);
    }
    setShowResults(false);
    setSearchText('');
  };

  const clearSearch = () => {
    setSearchText('');
    setResults([]);
    setShowResults(false);
    onResultsChange?.(false);
  };

  // Group results by type
  const articleResults = results.filter(r => r.type === 'article') as ArticleSearchResult[];
  const stockResults = results.filter(r => r.type === 'stock') as StockSearchResult[];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search stocks or articles..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => searchText && setShowResults(true)}
          className="w-full pl-11 pr-10 py-3 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-base shadow-sm"
        />
        {searchText && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (searchText.trim() !== '') && (
        <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-xl shadow-2xl max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="py-2">
              {/* Stock Results */}
              {stockResults.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/50">
                    Stocks ({stockResults.length})
                  </div>
                  {stockResults.map((stock, index) => (
                    <button
                      key={`stock-${stock.ticker}-${index}`}
                      onClick={() => handleResultClick(stock)}
                      className="w-full px-4 py-3 text-left hover:bg-accent transition-colors duration-150 flex items-center gap-3 border-b border-border/50 last:border-0"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                        {stock.ticker}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{stock.ticker}</div>
                        <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Article Results */}
              {articleResults.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/50">
                    Articles ({articleResults.length})
                  </div>
                  {articleResults.map((article, index) => (
                    <button
                      key={`article-${article.slug}-${index}`}
                      onClick={() => handleResultClick(article)}
                      className="w-full px-4 py-3 text-left hover:bg-accent transition-colors duration-150 border-b border-border/50 last:border-0"
                    >
                      <div className="font-semibold text-sm mb-1">{article.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{article.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {showResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}
