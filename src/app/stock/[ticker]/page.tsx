import { StockDetailClient } from "@/app/stock/[ticker]/stock-detail-client";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";
import { use } from "react";

type Params = {
  ticker: string;
};

export default function StockDetailPage({ params }: { params: Params }) {
  // In Next.js 15, we need to handle params as a promise
  const ticker = params.ticker.toUpperCase();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <StockDetailClient ticker={ticker} />
      </main>
    </div>
  );
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  return {
    title: `${params.ticker.toUpperCase()} Stock Analysis | SOPHIE`,
    description: `Analysis of ${params.ticker.toUpperCase()} stock by SOPHIE AI`,
  }
}