import { StockDetailClient } from "@/app/stock/[ticker]/stock-detail-client";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Metadata } from "next";
import { generateStockMetadata, generateEnhancedStockMetadata } from "@/components/seo/stock-seo";

type Params = {
  ticker: string;
};

export default async function StockDetailPage({ params }: { params: Params }) {
  // In Next.js 15, we need to handle params as a promise
  const ticker = (await params).ticker.toUpperCase();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-4 sm:py-6 lg:py-8 px-4 sm:px-6">
        <StockDetailClient ticker={ticker} />
      </main>
      <Disclaimer />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const ticker = (await params).ticker.toUpperCase();
  
  // TODO: In a real application, you might want to fetch company data here
  // For now, we'll use the enhanced metadata generation for better SEO
  return generateEnhancedStockMetadata(ticker);
}
