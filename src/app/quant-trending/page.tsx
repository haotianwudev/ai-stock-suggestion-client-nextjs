import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { QuantTrendingClient } from "./quant-trending-client";

export const metadata: Metadata = {
  title: "Quant Trending | SOPHIE",
  description:
    "Trending quant finance topics from ArXiv, GitHub, Reddit, and Hacker News — updated every few hours.",
};

export default function QuantTrendingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <QuantTrendingClient />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
