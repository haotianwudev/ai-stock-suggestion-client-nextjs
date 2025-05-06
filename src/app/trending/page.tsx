"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getGraphQLUri } from "@/lib/apollo/gql-config";
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from "lucide-react";

// TypeScript interfaces
interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  dayChange?: number;
  volume?: number;
  marketCap?: number;
}

interface BatchStockResponse {
  ticker: string;
  company: {
    name: string;
    market_cap?: number;
  };
  prices: {
    biz_date: string;
    close: number;
    volume?: number;
  }[];
}

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
        market_cap
      }
      prices {
        biz_date
        close
        volume
      }
    }
  }
`;

// Fallback data in case API isn't working
const fallbackStocks: StockData[] = [
  { ticker: "AAPL", name: "Apple Inc.", change: 2.34, price: 187.45, dayChange: 0.5, volume: 45782390, marketCap: 2970000000000 },
  { ticker: "MSFT", name: "Microsoft Corporation", change: 1.12, price: 324.82, dayChange: 0.3, volume: 28576230, marketCap: 2420000000000 },
  { ticker: "NVDA", name: "NVIDIA Corporation", change: 4.67, price: 848.35, dayChange: 1.2, volume: 53892140, marketCap: 2090000000000 },
  { ticker: "GS", name: "Goldman Sachs Group Inc.", change: 0.78, price: 456.92, dayChange: -0.2, volume: 2341520, marketCap: 148000000000 }
];

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

// Format large numbers for market cap
function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1000000000000) {
    return `$${(marketCap / 1000000000000).toFixed(2)}T`;
  } else if (marketCap >= 1000000000) {
    return `$${(marketCap / 1000000000).toFixed(2)}B`;
  } else if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(2)}M`;
  }
  return `$${marketCap.toLocaleString()}`;
}

// Format volume numbers
function formatVolume(volume: number): string {
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(2)}M`;
  } else if (volume >= 1000) {
    return `${(volume / 1000).toFixed(2)}K`;
  }
  return volume.toLocaleString();
}

export default function TrendingPage() {
  // We want to display specifically AAPL, MSFT, NVDA, GS
  const TICKERS = ["AAPL", "MSFT", "NVDA", "GS"];
  const [stocks, setStocks] = useState<StockData[]>(fallbackStocks);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch stock data using GraphQL and fall back to mock data if that fails
  useEffect(() => {
    fetchStocksFromGraphQL();
  }, []);

  // Fetch stock data using our GraphQL endpoint with batchStocks query
  const fetchStocksFromGraphQL = async () => {
    try {
      // Get current date for GraphQL query
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      
      const endDate = today.toISOString().split('T')[0];
      const startDate = threeMonthsAgo.toISOString().split('T')[0];

      // Create Apollo client for direct use
      const client = createApolloClient();

      // Execute batch query for all tickers at once
      const result = await client.query({
        query: BATCH_STOCKS_QUERY,
        variables: { 
          tickers: TICKERS, 
          startDate, 
          endDate 
        }
      });
      
      if (result.data?.batchStocks) {
        // Transform the results
        const batchResults = result.data.batchStocks;
        const validStocks: StockData[] = [];
        
        TICKERS.forEach(ticker => {
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
          const latestPrice = prices[prices.length - 1];
          const firstPrice = prices[0];
          
          // Skip if price data is invalid
          if (!latestPrice || !latestPrice.close) {
            console.log(`Invalid price data for ${ticker}, skipping`);
            return;
          }
          
          // Get previous day price if available (second to last element)
          let dayChange = 0;
          if (prices.length > 1) {
            const prevDayPrice = prices[prices.length - 2];
            dayChange = prevDayPrice.close 
              ? ((latestPrice.close - prevDayPrice.close) / prevDayPrice.close) * 100
              : 0;
          }
          
          // Calculate percentage change over the period
          let changePercent = 0;
          if (firstPrice && firstPrice.close) {
            changePercent = ((latestPrice.close - firstPrice.close) / firstPrice.close) * 100;
          }
          
          validStocks.push({
            ticker,
            name: stockData.company?.name || ticker,
            price: latestPrice.close,
            change: changePercent,
            dayChange: dayChange,
            volume: latestPrice.volume,
            marketCap: stockData.company?.market_cap
          });
        });
        
        // Only update state if we have valid stocks
        if (validStocks.length > 0) {
          setStocks(validStocks);
        } else {
          console.error("No valid stock data returned from API");
        }
      }
    } catch (err) {
      console.error("Error fetching from GraphQL:", err);
      // Keep using fallback data if GraphQL fails
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
              Real-time data for AAPL, MSFT, NVDA, and GS.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="opacity-70 animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stocks.map((stock) => (
                <Card key={stock.ticker} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-bold">{stock.ticker}</CardTitle>
                        <CardDescription>{stock.name}</CardDescription>
                      </div>
                      {stock.marketCap && (
                        <div className="text-xs text-muted-foreground">
                          <div>Market Cap</div>
                          <div className="font-medium">{formatMarketCap(stock.marketCap)}</div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Price</div>
                        <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">3-Month Change</div>
                        <div className={`flex items-center font-semibold ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change >= 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
                          {stock.change.toFixed(2)}%
                        </div>
                      </div>
                      
                      {stock.dayChange !== undefined && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Daily Change</div>
                          <div className={`flex items-center font-semibold ${stock.dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.dayChange >= 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
                            {stock.dayChange.toFixed(2)}%
                          </div>
                        </div>
                      )}
                      
                      {stock.volume && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Volume</div>
                          <div className="font-medium">{formatVolume(stock.volume)}</div>
                        </div>
                      )}
                    </div>
                    
                    <Button asChild className="w-full">
                      <Link href={`/stock/${stock.ticker}`}>
                        <TrendingUpIcon className="mr-2 h-4 w-4" /> 
                        View Analysis
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 