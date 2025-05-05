import { StockDetailClient } from "@/app/stock/[ticker]/stock-detail-client";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";

type Props = {
  params: { ticker: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function StockDetailPage(props: Props) {
  const ticker = props.params.ticker.toUpperCase();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <StockDetailClient ticker={ticker} />
      </main>
    </div>
  );
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `${params.ticker.toUpperCase()} Stock Analysis | SOPHIE`,
    description: `Analysis of ${params.ticker.toUpperCase()} stock by SOPHIE AI`,
  }
}