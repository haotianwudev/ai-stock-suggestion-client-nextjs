"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StockPage() {
  const router = useRouter();

  // Default to the Investment tab rather than Trending Stocks — Trending Stocks does a live
  // GraphQL fetch (skeleton loading state), which is a worse landing experience than the
  // Investment tab's static content.
  useEffect(() => {
    router.replace('/stock/investment/macro-analysis');
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container max-w-screen-2xl mx-auto py-4 px-4 md:py-8 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Redirecting...</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Taking you to the Stock &amp; Investment page.
            </p>
          </div>
        </div>
      </main>

      <Disclaimer />
    </div>
  );
}
