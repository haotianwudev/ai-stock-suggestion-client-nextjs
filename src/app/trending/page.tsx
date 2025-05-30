"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getGraphQLUri } from "@/lib/apollo/gql-config";
import { AlertCircleIcon } from "lucide-react";
import { StockCard, StockCardSkeleton } from "@/components/stock/stock-card";
import Image from "next/image";

// TypeScript interfaces
interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  sophieScore?: number;
  color?: string;
}

interface BatchStockResponse {
  ticker: string;
  company: {
    name: string;
  };
  prices: {
    biz_date: string;
    close: number;
  }[];
  latestSophieAnalysis?: {
    overall_score: number;
  };
}

interface TopTickerResponse {
  ticker: string;
  score: number;
}

// Top tickers GraphQL query
const GET_TOP_TICKERS = gql`
  query GetTopTickers {
    coveredTickers {
      ticker
      score
    }
  }
`;

// Batch stocks GraphQL query
const BATCH_STOCKS_QUERY = gql`
  query GetBatchStocksWithDates($tickers: [String!]!, $startDate: String!, $endDate: String!) {
    batchStocks(
      tickers: $tickers
      start_date: $startDate
      end_date: $endDate
    ) {
      ticker
      company {
        name
      }
      prices {
        biz_date
        close
      }
      latestSophieAnalysis {
        overall_score
      }
    }
  }
`;

// Create Apollo client for direct use
const createApolloClient = () => {
  const graphqlUri = getGraphQLUri();
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: graphqlUri,
  });

  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });
};

// Get score color based on the value - matching the analysis section
function getScoreColor(score: number): string {
  if (score >= 80) return 'from-green-500 to-emerald-600 border-green-300';
  if (score >= 60) return 'from-blue-500 to-indigo-600 border-blue-300';
  if (score >= 40) return 'from-yellow-500 to-amber-600 border-yellow-300';
  return 'from-red-500 to-rose-600 border-red-300';
}

// Format color based on ticker for visual consistency with main page
function getTickerColor(ticker: string): string {
  const colorMap: Record<string, string> = {
    "AAPL": "from-blue-500 to-cyan-500",
    "MSFT": "from-emerald-500 to-green-500",
    "NVDA": "from-green-500 to-lime-500",
    "GS": "from-purple-500 to-indigo-500"
  };
  
  return colorMap[ticker] || "from-blue-400 to-blue-600";
}

// Function to generate a random SOPHIE score between 30 and 95 (fallback if API doesn't provide a score)
function generateSophieScore(ticker: string): number {
  // Seed the random generator based on ticker to get consistent scores
  const seed = ticker.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const rand = Math.sin(seed) * 10000;
  return Math.floor(30 + (rand - Math.floor(rand)) * 65); // Between 30-95
}

export default function TrendingPage() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stock data using GraphQL and fall back to mock data if that fails
  useEffect(() => {
    fetchTopStocks();
  }, []);

  // Fetch top tickers and then their stock data
  const fetchTopStocks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create Apollo client for direct use
      const client = createApolloClient();

      // First, get the top tickers
      const topTickersResult = await client.query({
        query: GET_TOP_TICKERS
      });
      
      if (!topTickersResult.data?.coveredTickers || topTickersResult.data.coveredTickers.length === 0) {
        setError("No top tickers available");
        setIsLoading(false);
        return;
      }
      
      // Extract tickers from the response
      const topTickers = topTickersResult.data.coveredTickers as TopTickerResponse[];
      const tickersToFetch = topTickers.map(t => t.ticker);
      
      // Get current date for GraphQL query
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      
      const endDate = today.toISOString().split('T')[0];
      const startDate = threeMonthsAgo.toISOString().split('T')[0];

      // Execute batch query for all top tickers at once
      const result = await client.query({
        query: BATCH_STOCKS_QUERY,
        variables: { 
          tickers: tickersToFetch, 
          startDate, 
          endDate 
        }
      });
      
      if (result.data?.batchStocks) {
        // Transform the results
        const batchResults = result.data.batchStocks;
        const validStocks: StockData[] = [];
        
        tickersToFetch.forEach(ticker => {
          // Find matching stock data in the response
          const stockData = batchResults.find((stock: BatchStockResponse) => 
            stock.ticker === ticker
          );
          
          // Skip if no data found
          if (!stockData || !stockData.prices || stockData.prices.length === 0) {
            console.log(`No data found for ${ticker}, skipping`);
            return;
          }
          
          // Get latest price data
          const prices = stockData.prices;
          
          // Sort prices by date to ensure correct order
          const sortedPrices = [...prices].sort((a, b) => 
            new Date(a.biz_date).getTime() - new Date(b.biz_date).getTime()
          );
          
          const latestPrice = sortedPrices[sortedPrices.length - 1];
          
          // Find the price closest to 3 months ago
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          const threeMonthsAgoTime = threeMonthsAgo.getTime();
          
          let closestPriceIndex = 0;
          let minTimeDiff = Infinity;
          
          sortedPrices.forEach((price, index) => {
            const priceDate = new Date(price.biz_date);
            const timeDiff = Math.abs(priceDate.getTime() - threeMonthsAgoTime);
            if (timeDiff < minTimeDiff) {
              minTimeDiff = timeDiff;
              closestPriceIndex = index;
            }
          });
          
          const threeMonthPrice = sortedPrices[closestPriceIndex];
          
          // Skip if price data is invalid
          if (!latestPrice || !latestPrice.close) {
            console.log(`Invalid price data for ${ticker}, skipping`);
            return;
          }
          
          // Calculate percentage change over the period
          let changePercent = 0;
          if (threeMonthPrice && threeMonthPrice.close) {
            changePercent = ((latestPrice.close - threeMonthPrice.close) / threeMonthPrice.close) * 100;
          }
          
          // Get the SOPHIE score from the top tickers response
          const topTickerData = topTickers.find(t => t.ticker === ticker);
          
          // Use the score from top tickers as the primary source
          // Only fall back to latestSophieAnalysis if no score is available from top tickers
          const sophieScore = topTickerData ? topTickerData.score : 
                             (stockData.latestSophieAnalysis?.overall_score || generateSophieScore(ticker));
          
          validStocks.push({
            ticker,
            name: stockData.company?.name || ticker,
            price: latestPrice.close,
            change: changePercent,
            sophieScore: sophieScore,
            color: getTickerColor(ticker)
          });
        });
        
        // Only update state if we have valid stocks
        if (validStocks.length > 0) {
          // Sort stocks to match the order from the topTickers query
          validStocks.sort((a, b) => {
            const aIndex = topTickers.findIndex(t => t.ticker === a.ticker);
            const bIndex = topTickers.findIndex(t => t.ticker === b.ticker);
            return aIndex - bIndex;
          });
          
          setStocks(validStocks);
        } else {
          setError("No valid stock data returned from API");
        }
      }
    } catch (err) {
      console.error("Error fetching from GraphQL:", err);
      setError("Unable to fetch stock data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Trending Stocks</h1>
            <p className="text-muted-foreground">
              More stocks supported soon!
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(i => (
                <StockCardSkeleton key={i} />
              ))}
            </div>
          ) : stocks.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stocks.map((stock) => (
                <StockCard key={stock.ticker} stock={stock} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 mb-4">
                <AlertCircleIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">No Stock Data Available</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                {error || "Unable to retrieve stock data at this time. Please check back later."}
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => fetchTopStocks()}
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 