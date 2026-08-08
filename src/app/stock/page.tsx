"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StockPage() {
  const router = useRouter();

  // Redirect to trending tab by default
  useEffect(() => {
    router.replace('/stock/trending');
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
