"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, ExternalLinkIcon, TrendingUpIcon, InfoIcon, LineChart } from "lucide-react";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getGraphQLUri } from "@/lib/apollo/gql-config";
import Image from "next/image";
import { StockCard, StockCardSkeleton } from "@/components/stock/stock-card";
import { TrendingUp, Trophy, GraduationCap, LucideLineChart, Shield, Users, BookOpen } from "lucide-react";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";
import { useRouter } from "next/navigation";

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

export default function Home() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const TICKERS = ["AAPL", "MSFT", "NVDA"];
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookPassword, setBookPassword] = useState("");
  const [bookError, setBookError] = useState("");
  const router = useRouter();
  
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-4 pb-2 pt-6 md:pb-4 md:pt-8 lg:py-8">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center max-w-[64rem] mx-auto">
              <div className="flex items-center gap-4">
                <Link href="/about">
                  <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-purple-300 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200">
                    <Image 
                      src="/images/agents/SOPHIE.png"
                      alt="SOPHIE" 
                      width={96} 
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </Link>
                <Link href="/about">
                  <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl cursor-pointer hover:scale-105 transition-transform duration-200">
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SOPHIE</span>
                  </h1>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row gap-3 max-w-[64rem] flex-wrap justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-purple-100 dark:border-purple-900/30">
                  <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
                  <p className="leading-normal text-muted-foreground text-sm sm:text-lg">
                    <span className="hidden sm:inline">SOPHIE is an AI stock analyst now!</span>
                    <span className="sm:hidden">AI Stock Analyst</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border border-pink-100 dark:border-pink-900/30">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 flex-shrink-0" />
                  <p className="leading-normal text-muted-foreground text-sm sm:text-lg">
                    <span className="hidden sm:inline">SOPHIE's Daddy is a youtuber now!</span>
                    <span className="sm:hidden">YouTube Creator</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-100 dark:border-blue-900/30">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                  <p className="leading-normal text-muted-foreground text-sm sm:text-lg">
                    <span className="hidden sm:inline">SOPHIE's Daddy is teaching SOPHIE option strategies and machine learning!</span>
                    <span className="sm:hidden">Teaching AI & Finance</span>
                  </p>
                </div>
        
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/trending">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Explore Stocks Analysis</span>
                    <span className="sm:hidden">Stocks Analysis</span>
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/option">
                    <LineChart className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Explore Option Strategies</span>
                    <span className="sm:hidden">Option Strategies</span>
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/about">
                    <Users className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Meet Sophie's Daddy</span>
                    <span className="sm:hidden">Meet Creator</span>
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a 
                    href="https://www.youtube.com/@SOPHIEAIFinance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a2.991 2.991 0 0 0-2.11-2.11C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.576A2.991 2.991 0 0 0 .502 6.186C-.074 8.07-.074 12-.074 12s0 3.93.576 5.814a2.991 2.991 0 0 0 2.11 2.11C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.576a2.991 2.991 0 0 0 2.11-2.11C23.574 15.93 23.574 12 23.574 12s0-3.93-.576-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="hidden sm:inline">YouTube Channel</span>
                    <span className="sm:hidden">YouTube</span>
                  </a>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a 
                    href="https://expo.dev/artifacts/eas/suf2rGRxaZbbecneq36JrS.apk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12" y2="20" />
                    </svg>
                    <span className="hidden sm:inline">Download Android App</span>
                    <span className="sm:hidden">Android App</span>
                  </a>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/book-summary">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Hidden Articles (password required)
                  </Link>
                </Button>
                
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Access Stock Cards */}
        <section className="container max-w-screen-xl mx-auto py-0 md:py-1 px-4">
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
        
        {/* Articles Section */}
        <section className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 border-t border-border px-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Articles
            </h2>
          </div>
          {/* Pinned Article as Featured */}
          {articles.find(article => article.pinned && !article.bookSummary) && (
            <div className="mb-8 relative">
              <div className="absolute -top-3 left-3 z-10">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded shadow">Featured</span>
              </div>
              <ArticleCard
                key={articles.find(article => article.pinned && !article.bookSummary)!.slug}
                title={articles.find(article => article.pinned && !article.bookSummary)!.title}
                description={articles.find(article => article.pinned && !article.bookSummary)!.description}
                slug={articles.find(article => article.pinned && !article.bookSummary)!.slug}
                date={articles.find(article => article.pinned && !article.bookSummary)!.date}
                imageUrl={articles.find(article => article.pinned && !article.bookSummary)!.imageUrl}
                googleDoc={articles.find(article => article.pinned && !article.bookSummary)!.googleDoc}
                deepResearch={articles.find(article => article.pinned && !article.bookSummary)!.deepResearch}
                youtubeUrl={articles.find(article => article.pinned && !article.bookSummary)!.youtubeUrl}
                isVideo={articles.find(article => article.pinned && !article.bookSummary)!.isVideo}
                options={articles.find(article => article.pinned && !article.bookSummary)!.options}
              />
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.filter(article => !article.pinned && !article.bookSummary).map((article) => (
              <ArticleCard 
                key={article.slug}
                title={article.title}
                description={article.description}
                slug={article.slug}
                date={article.date}
                imageUrl={article.imageUrl}
                googleDoc={article.googleDoc}
                deepResearch={article.deepResearch}
                youtubeUrl={article.youtubeUrl}
                isVideo={article.isVideo}
                options={article.options}
              />
            ))}
          </div>
        </section>
        
        {/* Discord Community Section */}
        <section className="container max-w-screen-xl mx-auto space-y-4 py-8 md:py-12 px-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Join the Community
            </h2>
            <Button asChild size="lg" className="mt-4 bg-[#5865F2] hover:bg-[#4752C4] text-white">
              <a 
                href="https://discord.com/channels/1379865130665250927/1379865132213076051" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249a18.767 18.767 0 00-5.487 0 12.683 12.683 0 00-.617-1.25.07.07 0 00-.073-.035A19.736 19.736 0 003.683 4.369a.064.064 0 00-.03.027C.533 9.09-.32 13.579.099 18.021a.07.07 0 00.028.048c2.052 1.507 4.042 2.422 5.992 3.029a.07.07 0 00.076-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 00-.038-.098c-.652-.247-1.27-.549-1.872-.892a.07.07 0 01-.007-.117c.126-.094.252-.192.372-.291a.07.07 0 01.071-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 01.072.009c.12.099.246.198.372.292a.07.07 0 01-.006.117 12.298 12.298 0 01-1.873.891.07.07 0 00-.038.099c.36.698.772 1.362 1.225 1.993a.07.07 0 00.076.028c1.95-.607 3.94-1.522 5.992-3.029a.07.07 0 00.028-.048c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 00-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" fill="currentColor"/></svg>
                Join Discord
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Disclaimer />
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} SOPHIE. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Stock analysis inspired and built on top of <a href="https://github.com/virattt/ai-hedge-fund" className="underline hover:text-primary">ai-hedge-fund</a>. SOPHIE is a completely free, open source, personal hobby website, running on free database, free server. Developer paid for data and AI cost all from public sources. The app is not intended to give any financial advise or use for any commercial purposes. Please leave a comment or send me an email if you like SOPHIE! Please check back soon!
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
