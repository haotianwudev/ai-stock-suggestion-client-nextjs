import { StockDetailClient } from "@/app/stock/[ticker]/stock-detail-client";
import { Header } from "@/components/layout/header";

interface PageProps {
  params: {
    ticker: string;
  };
}

export default function StockDetailPage({ params }: PageProps) {
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