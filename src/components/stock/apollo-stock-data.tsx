"use client";

import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getGraphQLUri } from "@/lib/apollo/gql-config";
import { StockCard, StockCardSkeleton } from "@/components/stock/stock-card";
import { InfoIcon } from "lucide-react";

// Types for stock data
interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  color: string;
  sophieScore?: number;
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

// GraphQL query for batch stock data
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

// Top tickers GraphQL query to get SOPHIE scores
const GET_TOP_TICKERS = gql`
  query GetTopTickers {
    coveredTickers {
      ticker
      score
    }
  }
`;

// Color themes for each stock
const stockColors = {
  "AAPL": "from-blue-500 to-cyan-500",
  "MSFT": "from-emerald-500 to-green-500",
  "NVDA": "from-green-500 to-lime-500"
};

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
        fetchPolicy: 'cache-first',
      },
      query: {
        fetchPolicy: 'cache-first',
      },
    },
  });
};

export default function ApolloStockData() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const TICKERS = ["AAPL", "MSFT", "NVDA"];
  
  useEffect(() => {
    // Fetch real stock data on component mount
    fetchStockData();
  }, []);
  
  const fetchStockData = async () => {
    try {
      setIsLoading(true);
      // Get current date for GraphQL query
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      
      const endDate = today.toISOString().split('T')[0];
      const startDate = threeMonthsAgo.toISOString().split('T')[0];

      // Create Apollo client for direct use
      const client = createApolloClient();

      // First, get the top tickers with scores
      const topTickersResult = await client.query({
        query: GET_TOP_TICKERS
      });
      
      const topTickers = topTickersResult.data?.coveredTickers as TopTickerResponse[] || [];

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
          
          // Get the SOPHIE score from the top tickers response (primary source)
          const topTickerData = topTickers.find(t => t.ticker === ticker);
          
          // Only use the SOPHIE score from API if it exists and is a valid number
          let sophieScore: number | undefined;
          if (topTickerData && typeof topTickerData.score === 'number' && !isNaN(topTickerData.score)) {
            sophieScore = topTickerData.score;
          } else {
            // Fallback to latestSophieAnalysis
            const apiScore = stockData.latestSophieAnalysis?.overall_score;
            if (typeof apiScore === 'number' && !isNaN(apiScore)) {
              sophieScore = apiScore;
            }
          }
          
          const stockItem: StockData = {
            ticker,
            name: stockData.company?.name || ticker,
            price: latestPrice.close,
            change: changePercent,
            color: stockColors[ticker as keyof typeof stockColors] || "from-blue-400 to-blue-600"
          };
          
          // Only add sophieScore if we have a valid score from the API
          if (sophieScore !== undefined) {
            stockItem.sophieScore = sophieScore;
          }
          
          validStocks.push(stockItem);
        });
        
        // Only update state if we have valid stocks
        if (validStocks.length > 0) {
          setStocks(validStocks);
        }
      }
    } catch (err) {
      console.error("Error fetching from GraphQL:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:max-w-4xl mx-auto">
        {[1, 2, 3].map(i => (
          <StockCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 mb-4">
          <InfoIcon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium">No Stock Data Available</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          Unable to retrieve stock data at this time. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:max-w-4xl mx-auto">
      {stocks.map((stock) => (
        <StockCard key={stock.ticker} stock={stock} />
      ))}
    </div>
  );
}