"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock trending stocks data
const trendingStocks = [
  { ticker: "AAPL", name: "Apple Inc.", change: 2.34, price: 187.45 },
  { ticker: "MSFT", name: "Microsoft Corporation", change: 1.12, price: 324.82 },
  { ticker: "GOOGL", name: "Alphabet Inc.", change: -0.78, price: 142.17 },
  { ticker: "AMZN", name: "Amazon.com, Inc.", change: 3.56, price: 178.23 },
  { ticker: "META", name: "Meta Platforms, Inc.", change: 2.89, price: 435.89 },
  { ticker: "TSLA", name: "Tesla, Inc.", change: -2.45, price: 177.56 },
  { ticker: "NVDA", name: "NVIDIA Corporation", change: 4.67, price: 848.35 },
  { ticker: "JPM", name: "JPMorgan Chase & Co.", change: 0.34, price: 198.34 },
];

export default function TrendingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Trending Stocks</h1>
            <p className="text-muted-foreground">
              SOPHIE's selection of popular stocks currently gaining attention in the market.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trendingStocks.map((stock) => (
              <Card key={stock.ticker} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">{stock.ticker}</CardTitle>
                  <CardDescription>{stock.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
                    <div className={`font-medium ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/stock/${stock.ticker}`}>
                      View Analysis
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 