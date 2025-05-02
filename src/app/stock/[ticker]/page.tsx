import { use } from "react";
import { StockDetailClient } from "@/app/stock/[ticker]/stock-detail-client";
import { Header } from "@/components/layout/header";

export default function StockDetailPage({ params }: { params: { ticker: string } }) {
  const resolvedParams = use(Promise.resolve(params));
  const ticker = resolvedParams.ticker;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <StockDetailClient ticker={ticker} />
      </main>
    </div>
  );
}