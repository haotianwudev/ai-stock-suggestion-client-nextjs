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
import { TrendingUp, Trophy, GraduationCap, LucideLineChart, Shield, Users } from "lucide-react";
import { ArticleCard } from "@/components/articles/article-card";

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

// Articles data
const articles = [
  {
    title: "Gemini Deep Research on AAPL",
    description: "This analysis presents the central conflict in evaluating Apple today: it is an undeniably wonderful business, yet it trades at a price that appears to offer little-to-no margin of safety.",
    slug: "gemini-deep-research-aapl",
    date: "May 31, 2025",
    imageUrl: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1000",
    googleDoc: "https://docs.google.com/document/d/e/2PACX-1vRxLdxU6sD0jgrNS_o0oMDXkYBHaotgVCj7Olli85c5P-YBIBHjH_cwF8pe01zuh_4R85NlBZram6WY/pub",
    deepResearch: true
  },
  {
    title: "Stock Analysis AI Agent Prompt Example",
    description: `A full prompt and data example for a Charlie Munger-style AI stock analysis agent. Includes all rules, mental models, and a real JSON analysis for AAPL.\n\nPrompt:\n\nYou are a Charlie Munger AI agent, making investment decisions using his principles:\n\n1. Focus on the quality and predictability of the business.\n2. Rely on mental models from multiple disciplines to analyze investments.\n3. Look for strong, durable competitive advantages (moats).\n4. Emphasize long-term thinking and patience.\n5. Value management integrity and competence.\n6. Prioritize businesses with high returns on invested capital.\n7. Pay a fair price for wonderful businesses.\n8. Never overpay, always demand a margin of safety.\n9. Avoid complexity and businesses you don't understand.\n10. "Invert, always invert" - focus on avoiding stupidity rather than seeking brilliance.\n\nRules:\n- Praise businesses with predictable, consistent operations and cash flows.\n- Value businesses with high ROIC and pricing power.\n- Prefer simple businesses with understandable economics.\n- Admire management with skin in the game and shareholder-friendly capital allocation.\n- Focus on long-term economics rather than short-term metrics.\n- Be skeptical of businesses with rapidly changing dynamics or excessive share dilution.\n- Avoid excessive leverage or financial engineering.\n- Provide a rational, data-driven recommendation (bullish, bearish, or neutral).\n\nWhen providing your reasoning, be thorough and specific by:\n1. Explaining the key factors that influenced your decision the most (both positive and negative)\n2. Applying at least 2-3 specific mental models or disciplines to explain your thinking\n3. Providing quantitative evidence where relevant (e.g., specific ROIC values, margin trends)\n4. Citing what you would "avoid" in your analysis (invert the problem)\n5. Using Charlie Munger's direct, pithy conversational style in your explanation\n\nTask:\nBased on the following analysis, create a Munger-style investment signal.\n\nAnalysis Data for AAPL:\n\n{\n  "AAPL": {\n    "signal": "neutral",\n    "score": 7.06,\n    "max_score": 10,\n    "moat_analysis": {\n      "score": 8.89,\n      "details": "Excellent ROIC: >15% in 10/10 periods; Good pricing power: Average gross margin 45.0%; Low capital requirements: Avg capex 2.7% of revenue; Invests in R&D, building intellectual property; Significant goodwill/intangible assets, suggesting brand value or IP"\n    },\n    "management_analysis": {\n      "score": 5.0,\n      "details": "Good cash conversion: FCF/NI ratio of 1.04; Moderate debt level: D/E ratio of 1.47; Acceptable cash position: Cash/Revenue ratio of 0.07; No recorded insider transactions; Shareholder-friendly: Reducing share count over time"\n    },\n    "predictability_analysis": {\n      "score": 9.0,\n      "details": "Moderately predictable revenue: 0.4% avg growth with some volatility; Highly predictable operations: Operating income positive in all periods; Highly predictable margins: 30.4% avg with minimal volatility; Highly predictable cash generation: Positive FCF in all periods"\n    },\n    "valuation_analysis": {\n      "score": 3.0,\n      "details": "Fair value: 3.3% FCF yield; Expensive: 50.3% premium to reasonable value; Stable to growing FCF supports valuation",\n      "intrinsic_value_range": {\n        "conservative": 1023700000000.0,\n        "reasonable": 1535550000000.0,\n        "optimistic": 2047400000000.0\n      },\n      "fcf_yield": 0.033,\n      "normalized_fcf": 102370000000.0\n    },\n    "news_sentiment": "Qualitative review of 100 recent news items would be needed"\n  }\n}\n\nReturn the trading signal in this JSON format:\n\n{\n  "signal": "bullish/bearish/neutral",\n  "confidence": float (0-100),\n  "reasoning": "string"\n}`,
    slug: "stock-analysis-ai-agent-prompt-example",
    date: "May 31, 2025",
    imageUrl: "/images/agents/charlie_munger.png"
  },
  {
    title: "Technical Analysis vs. Machine Learning Trading",
    description: "An interactive, in-depth comparison of Technical Analysis and Machine Learning trading strategies. Includes radar chart, paradigm tabs, and synergy explorer. Explore the strengths, weaknesses, and future of each approach.",
    slug: "deep-research-ta-vs-ml-trading",
    date: "June 2, 2025",
    googleDoc: "https://docs.google.com/document/d/e/2PACX-1vTgDx1bHxlh7TPZ9e1mrBkPGKYSu25L2ju5K142JniqOrxR_8BLOkTyleG-nicehKOxOAF8aKBOZ5uR/pub",
    deepResearch: true,
    imageUrl: "https://images.unsplash.com/photo-1518183214770-9cffbec72538?auto=format&fit=crop&w=800&q=80"
  }
];

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
              <div className="flex flex-col md:flex-row gap-3 max-w-[64rem] flex-wrap justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-purple-100 dark:border-purple-900/30">
                  <LineChart className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <p className="leading-normal text-muted-foreground sm:text-lg">
                    SOPHIE is an AI stock analyst now!
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border border-pink-100 dark:border-pink-900/30">
                  <TrendingUp className="h-5 w-5 text-pink-500 flex-shrink-0" />
                  <p className="leading-normal text-muted-foreground sm:text-lg">
                    SOPHIE is a youtuber now!
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-100 dark:border-blue-900/30">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <p className="leading-normal text-muted-foreground sm:text-lg">
                    SOPHIE is going to be a option expert soon!
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-950/30 dark:to-lime-950/30 border border-green-100 dark:border-lime-900/30">
                  <LucideLineChart className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="leading-normal text-muted-foreground sm:text-lg">
                    SOPHIE is going to be a quant researcher soon!
                  </p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button asChild size="lg">
                  <Link href="/trending">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Explore More Trending Stocks
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline">
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
                    Download Android App
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/option">
                    <LineChart className="mr-2 h-4 w-4" />
                    Option Page To Be Updated
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
        
        {/* Articles Section */}
        <section className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 border-t border-border">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Articles
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard 
                key={article.slug}
                title={article.title}
                description={article.description}
                slug={article.slug}
                date={article.date}
                imageUrl={article.imageUrl}
                googleDoc={article.googleDoc}
                deepResearch={article.deepResearch}
              />
            ))}
          </div>
        </section>
        
        {/* Discord Community Section */}
        <section className="container max-w-screen-xl mx-auto space-y-4 py-8 md:py-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Join the Community
            </h2>
            <p className="max-w-[64rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Connect with other SOPHIE users and discuss stocks, options, and more on Discord
            </p>
            <Button asChild size="lg" className="mt-4 bg-[#5865F2] hover:bg-[#4752C4] text-white">
              <a 
                href="https://discord.com/channels/1379865130665250927/1379865132213076051" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249a18.767 18.767 0 00-5.487 0 12.683 12.683 0 00-.617-1.25.07.07 0 00-.073-.035A19.736 19.736 0 003.683 4.369a.064.064 0 00-.03.027C.533 9.09-.32 13.579.099 18.021a.07.07 0 00.028.048c2.052 1.507 4.042 2.422 5.992 3.029a.07.07 0 00.076-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 00-.038-.098c-.652-.247-1.27-.549-1.872-.892a.07.07 0 01-.007-.117c.126-.094.252-.192.372-.291a.07.07 0 01.071-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 01.072.009c.12.099.246.198.372.292a.07.07 0 01-.006.117 12.298 12.298 0 01-1.873.891.07.07 0 00-.038.099c.36.698.772 1.362 1.225 1.993a.07.07 0 00.076.028c1.95-.607 3.94-1.522 5.992-3.029a.07.07 0 00.028-.048c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 00-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" fill="currentColor"/></svg>
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
              © {new Date().getFullYear()} SOPHIE - Stock/Option Portfolio Helper. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Inspired and built on top of <a href="https://github.com/virattt/ai-hedge-fund" className="underline hover:text-primary">ai-hedge-fund</a>. SOPHIE is a completely free, open source, personal hobby website, running on free database, free server. Developer paid for data and AI cost all from public sources. The app is not intended to give any financial advise or use for any commercial purposes. Please leave a comment or send me an email if you like SOPHIE! SOPHIE will learn options and portfolio management as the name given in the future. Please check back soon!
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
