import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { ForumClient } from "./forum-client";

export const metadata: Metadata = {
  title: "Forum | SOPHIE",
  description: "Discuss markets, options strategies, and the platform with other SOPHIE readers.",
};

export default function ForumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <ForumClient />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
