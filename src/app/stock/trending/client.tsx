"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getGraphQLUri } from "@/lib/apollo/gql-config";
import { StockCard, StockCardSkeleton } from "@/components/stock/stock-card";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { StockAnalysisContent } from "../topics/stock-analysis";
import { ThirteenFAnalysisContent } from "../topics/13f-analysis";
import { EtfMutualFundContent } from "../topics/etf-mutual-fund";
import { MacroAnalysisContent } from "../topics/macro-analysis";
import { WealthPlanningContent } from "../topics/wealth-planning";
import { Finance101Content } from "../topics/finance-101";

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

// Valid subtopics per tab — used to guard against a `subtopic` value from one tab leaking into
// the other (both StockAnalysisTab and InvestmentTab receive the same `subtopic` prop since Radix
// Tabs keeps inactive TabsContent mounted, and StockTabClient's handleTabChange only knows the
// currently-active subtopic from whichever tab you're navigating *away* from).
const STOCK_ANALYSIS_SUBTOPICS = ['stock-analysis', '13f-analysis', 'etf-mutual-fund'];
const INVESTMENT_SUBTOPICS = ['macro-analysis', 'wealth-planning', 'finance-101'];

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

// Trending Stocks Tab — the live GraphQL-backed stock-card grid, moved verbatim
// (data fetching + rendering) from the former standalone /trending page.
function TrendingStocksTab() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopStocks();
  }, []);

  const fetchTopStocks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const client = createApolloClient();

      const topTickersResult = await client.query({
        query: GET_TOP_TICKERS
      });

      if (!topTickersResult.data?.coveredTickers || topTickersResult.data.coveredTickers.length === 0) {
        setError("No top tickers available");
        setIsLoading(false);
        return;
      }

      const topTickers = topTickersResult.data.coveredTickers as TopTickerResponse[];
      const tickersToFetch = topTickers.map(t => t.ticker);

      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);

      const endDate = today.toISOString().split('T')[0];
      const startDate = threeMonthsAgo.toISOString().split('T')[0];

      const result = await client.query({
        query: BATCH_STOCKS_QUERY,
        variables: {
          tickers: tickersToFetch,
          startDate,
          endDate
        }
      });

      if (result.data?.batchStocks) {
        const batchResults = result.data.batchStocks;
        const validStocks: StockData[] = [];

        tickersToFetch.forEach(ticker => {
          const stockData = batchResults.find((stock: BatchStockResponse) =>
            stock.ticker === ticker
          );

          if (!stockData || !stockData.prices || stockData.prices.length === 0) {
            console.log(`No data found for ${ticker}, skipping`);
            return;
          }

          const prices = stockData.prices;

          const sortedPrices = [...prices].sort((a, b) =>
            new Date(a.biz_date).getTime() - new Date(b.biz_date).getTime()
          );

          const latestPrice = sortedPrices[sortedPrices.length - 1];

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

          if (!latestPrice || !latestPrice.close) {
            console.log(`Invalid price data for ${ticker}, skipping`);
            return;
          }

          let changePercent = 0;
          if (threeMonthPrice && threeMonthPrice.close) {
            changePercent = ((latestPrice.close - threeMonthPrice.close) / threeMonthPrice.close) * 100;
          }

          const topTickerData = topTickers.find(t => t.ticker === ticker);

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

        if (validStocks.length > 0) {
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
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Stock Analysis & Tutorials</h2>
        <p className="text-muted-foreground">
          Pick a trending stock to see comprehensive analysis, AI agent suggestions, and tutorials.
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
  );
}

// Stock Analysis Tab — its own sub-navigation for the stock-research-focused topics
// (Stock Analysis, 13F Analysis, ETF & Mutual Fund), promoted to a top-level tab
// alongside the Investment tab rather than being one item inside it.
function StockAnalysisTab({ subtopic }: { subtopic?: string }) {
  const router = useRouter();
  const [activeSubtopic, setActiveSubtopic] = useState(
    subtopic && STOCK_ANALYSIS_SUBTOPICS.includes(subtopic) ? subtopic : 'stock-analysis'
  );

  useEffect(() => {
    if (subtopic && STOCK_ANALYSIS_SUBTOPICS.includes(subtopic)) {
      setActiveSubtopic(subtopic);
    }
  }, [subtopic]);

  const handleSubtopicChange = (value: string) => {
    setActiveSubtopic(value);
    const newUrl = `/stock/stock-analysis/${value}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div>
      <Tabs value={activeSubtopic} onValueChange={handleSubtopicChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 bg-slate-100 border-t touch-manipulation">
          <TabsTrigger
            value="stock-analysis"
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Stocks</span>
            <span className="hidden sm:block">Stock Analysis</span>
          </TabsTrigger>
          <TabsTrigger
            value="13f-analysis"
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">13F</span>
            <span className="hidden sm:block">13F Analysis</span>
          </TabsTrigger>
          <TabsTrigger
            value="etf-mutual-fund"
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">ETF</span>
            <span className="hidden sm:block">ETF & Mutual Fund</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stock-analysis" className="mt-0">
          <StockAnalysisContent />
        </TabsContent>

        <TabsContent value="13f-analysis" className="mt-0">
          <ThirteenFAnalysisContent />
        </TabsContent>

        <TabsContent value="etf-mutual-fund" className="mt-0">
          <EtfMutualFundContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Investment Tab Component with Sub-navigation — the broader topics not specific to
// stock research (Macro Analysis, Wealth & Planning, Finance 101).
function InvestmentTab({ subtopic }: { subtopic?: string }) {
  const router = useRouter();
  const [activeSubtopic, setActiveSubtopic] = useState(
    subtopic && INVESTMENT_SUBTOPICS.includes(subtopic) ? subtopic : 'macro-analysis'
  );

  useEffect(() => {
    if (subtopic && INVESTMENT_SUBTOPICS.includes(subtopic)) {
      setActiveSubtopic(subtopic);
    }
  }, [subtopic]);

  const handleSubtopicChange = (value: string) => {
    setActiveSubtopic(value);
    const newUrl = `/stock/investment/${value}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div>
      <Tabs value={activeSubtopic} onValueChange={handleSubtopicChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 bg-slate-100 border-t touch-manipulation">
          <TabsTrigger
            value="macro-analysis"
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Macro</span>
            <span className="hidden sm:block">Macro Analysis</span>
          </TabsTrigger>
          <TabsTrigger
            value="wealth-planning"
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Wealth</span>
            <span className="hidden sm:block">Wealth & Planning</span>
          </TabsTrigger>
          <TabsTrigger
            value="finance-101"
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">101</span>
            <span className="hidden sm:block">Finance 101</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="macro-analysis" className="mt-0">
          <MacroAnalysisContent />
        </TabsContent>

        <TabsContent value="wealth-planning" className="mt-0">
          <WealthPlanningContent />
        </TabsContent>

        <TabsContent value="finance-101" className="mt-0">
          <Finance101Content />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StockTabClientProps {
  tab: string;
  subtopic?: string;
}

export default function StockTabClient({ tab, subtopic }: StockTabClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'stock-analysis') {
      // `subtopic` is whatever was active on the *previous* tab — only reuse it here if it's
      // actually a valid Stock Analysis subtopic, otherwise it can leak in a value like
      // "macro-analysis" from the Investment tab and 404.
      const defaultSubtopic = subtopic && STOCK_ANALYSIS_SUBTOPICS.includes(subtopic) ? subtopic : 'stock-analysis';
      router.push(`/stock/stock-analysis/${defaultSubtopic}`, { scroll: false });
    } else if (value === 'investment') {
      const defaultSubtopic = subtopic && INVESTMENT_SUBTOPICS.includes(subtopic) ? subtopic : 'macro-analysis';
      router.push(`/stock/investment/${defaultSubtopic}`, { scroll: false });
    } else {
      router.push('/stock/trending', { scroll: false });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container max-w-screen-2xl mx-auto py-2 px-3 md:py-8 md:px-6">
          <div className="text-center mb-4 md:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4">
              <div
                className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full overflow-hidden shadow-md border-2 border-blue-300 flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow duration-200 group"
                onClick={() => setIsImageViewerOpen(true)}
                title="Click to view full screen"
              >
                <Image
                  src="/images/agents/SOPHIE.png"
                  alt="SOPHIE AI Agent"
                  width={80}
                  height={80}
                  className="object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Stock & Investment
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-blue-600 font-medium">SOPHIE Daddy Quant Blog</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 touch-manipulation">
              <TabsTrigger
                value="trending"
                className="text-sm sm:text-xs md:text-sm py-4 md:py-1.5 px-2 sm:px-2 md:px-3 min-h-[52px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                <span className="block sm:hidden">Trending</span>
                <span className="hidden sm:block">Trending Stocks</span>
              </TabsTrigger>
              <TabsTrigger
                value="stock-analysis"
                className="text-sm sm:text-xs md:text-sm py-4 md:py-1.5 px-2 sm:px-2 md:px-3 min-h-[52px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                Stock Analysis
              </TabsTrigger>
              <TabsTrigger
                value="investment"
                className="text-sm sm:text-xs md:text-sm py-4 md:py-1.5 px-2 sm:px-2 md:px-3 min-h-[52px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                Investment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-2 md:mt-6">
              <TrendingStocksTab />
            </TabsContent>

            <TabsContent value="stock-analysis" className="mt-0">
              <StockAnalysisTab subtopic={subtopic} />
            </TabsContent>

            <TabsContent value="investment" className="mt-0">
              <InvestmentTab subtopic={subtopic} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FullScreenImageViewer
        src="/images/agents/SOPHIE.png"
        alt="SOPHIE AI Agent"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      <Disclaimer />
    </div>
  );
}
