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

// Types for stock data
interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  color: string;
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
    }
  }
`;

// Color themes for each stock
const stockColors = {
  "AAPL": "from-blue-500 to-cyan-500",
  "MSFT": "from-emerald-500 to-green-500",
  "NVDA": "from-green-500 to-lime-500"
};

// Fallback data as a last resort
const fallbackStocks: StockData[] = [
  { 
    ticker: "AAPL", 
    name: "Apple Inc.", 
    price: 187.45, 
    change: 2.34, 
    color: "from-blue-500 to-cyan-500" 
  },
  { 
    ticker: "MSFT", 
    name: "Microsoft Corporation", 
    price: 324.82, 
    change: 1.12,
    color: "from-emerald-500 to-green-500" 
  },
  { 
    ticker: "NVDA", 
    name: "NVIDIA Corporation", 
    price: 848.35, 
    change: 4.67,
    color: "from-green-500 to-lime-500" 
  }
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

export default function Home() {
  const [stocks, setStocks] = useState<StockData[]>(fallbackStocks);
  const TICKERS = ["AAPL", "MSFT", "NVDA"];
  
  useEffect(() => {
    // Fetch real stock data on component mount
    fetchStockData();
  }, []);
  
  const fetchStockData = async () => {
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
            color: stockColors[ticker as keyof typeof stockColors] || "from-blue-400 to-blue-600"
          });
        });
        
        // Only update state if we have valid stocks
        if (validStocks.length > 0) {
          setStocks(validStocks);
        }
      }
    } catch (err) {
      console.error("Error fetching from GraphQL:", err);
      // Keep using fallback data if GraphQL fails
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-4 pt-6 md:pb-6 md:pt-10 lg:py-12">
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
        <section className="container max-w-screen-xl mx-auto py-2 md:py-4">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:max-w-4xl mx-auto">
            {stocks.map((stock) => (
              <Link key={stock.ticker} href={`/stock/${stock.ticker}`} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className={`h-2 bg-gradient-to-r ${stock.color}`}></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold">{stock.ticker}</CardTitle>
                      <CardDescription>{stock.name}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex flex-col">
                        <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">Current close price</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`flex items-center font-medium ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change >= 0 ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
                          {stock.change.toFixed(2)}%
                        </div>
                        <div className="text-xs text-muted-foreground">3-month change</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Analysis <ExternalLinkIcon className="ml-1 h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        <section className="container max-w-screen-xl mx-auto space-y-6 py-4 md:py-8">
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
