import { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { ForumClient } from "./forum-client";

export const metadata: Metadata = {
  title: "Forum & Quant Trending | SOPHIE",
  description:
    "Discuss quantitative finance, market regimes, option strategies, and explore real-time trending quant topics from ArXiv, GitHub, Reddit, and Hacker News.",
};

export default function ForumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Suspense fallback={<div className="animate-pulse h-96 rounded-2xl bg-muted/40" />}>
            <ForumClient />
          </Suspense>
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
