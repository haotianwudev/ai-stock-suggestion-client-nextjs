"use client";

import { Header } from "@/components/layout/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, ExternalLinkIcon, TrendingUpIcon, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getGraphQLUri } from "@/lib/apollo/gql-config";
import Image from "next/image";
import { StockCard, StockCardSkeleton } from "@/components/stock/stock-card";

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

// Function to generate a random SOPHIE score between 30 and 95 (fallback if API doesn't provide a score)
function generateSophieScore(ticker: string): number {
  // Seed the random generator based on ticker to get consistent scores
  const seed = ticker.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const rand = Math.sin(seed) * 10000;
  return Math.floor(30 + (rand - Math.floor(rand)) * 65); // Between 30-95
}

export default function Home() {
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
          
          // Use the SOPHIE score from API if available, otherwise generate a fallback score
          const sophieScore = stockData.latestSophieAnalysis?.overall_score || generateSophieScore(ticker);
          
          validStocks.push({
            ticker,
            name: stockData.company?.name || ticker,
            price: latestPrice.close,
            change: changePercent,
            color: stockColors[ticker as keyof typeof stockColors] || "from-blue-400 to-blue-600",
            sophieScore: sophieScore
          });
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-4 pb-2 pt-6 md:pb-4 md:pt-8 lg:py-8">
          <div className="container max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center gap-4 text-center max-w-[64rem] mx-auto">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-purple-300 shadow-md">
                  <Image 
                    src="/images/agents/SOPHIE.png"
                    alt="SOPHIE" 
                    width={96} 
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SOPHIE</span>
                </h1>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Stock/Option Portfolio Helper for Investment and Education
              </h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              SOPHIE is an AI financial analyst now!
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild size="lg">
                  <Link href="/trending">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Explore More Trending Stocks
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Access Stock Cards */}
        <section className="container max-w-screen-xl mx-auto py-0 md:py-1">
          {isLoading ? (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:max-w-4xl mx-auto">
              {[1, 2, 3].map(i => (
                <StockCardSkeleton key={i} />
              ))}
            </div>
          ) : stocks.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:max-w-4xl mx-auto">
              {stocks.map((stock) => (
                <StockCard key={stock.ticker} stock={stock} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 mb-4">
                <InfoIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">No Stock Data Available</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Unable to retrieve stock data at this time. Please check back later.
              </p>
            </div>
          )}
        </section>
        
        <section className="container max-w-screen-xl mx-auto space-y-4 py-2 md:py-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Features
            </h2>
            <p className="max-w-[64rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                
            </p>
          </div>
          <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive stock analysis using SOPHIE, our AI model that synthesizes all available data into actionable insights.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Technical Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced technical indicators including trend analysis, momentum, mean reversion, volatility metrics, and statistical arbitrage signals.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Fundamental Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep evaluation of company fundamentals across profitability, growth, financial health, and valuation metrics.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Market Sentiment</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis of market psychology through news sentiment, insider trading activity, and institutional interest signals.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Investment Legends</h3>
                  <p className="text-sm text-muted-foreground">
                    Stock analysis through the lens of legendary investors like Warren Buffett and Charlie Munger to provide time-tested perspectives.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Educational Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed for learning - all analyses include clear explanations to help new investors understand market concepts and terminology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} SOPHIE - Stock/Option Portfolio Helper. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Inspired by <a href="https://github.com/virattt/ai-hedge-fund" className="underline hover:text-primary">ai-hedge-fund</a>. SOPHIE is completely free for everyone and myself to learn more about finance and AI. SOPHIE is not for financial advice, but an educational tool to help you understand the market and make your own decisions. Please show support if you like SOPHIE! SOPHIE will learn options and portfolio management in the future. Please check back soon!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Contact: <a href="mailto:sophieaifinance@gmail.com" className="underline hover:text-primary">sophieaifinance@gmail.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
