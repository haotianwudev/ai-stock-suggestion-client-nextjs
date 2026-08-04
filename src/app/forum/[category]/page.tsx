import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { CategoryDetailClient } from "./category-detail-client";
import { ChevronLeft } from "lucide-react";

type Params = {
  category: string;
};

export default async function ForumCategoryPage({ params }: { params: Params }) {
  const { category } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
          <Link
            href="/forum"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            All categories
          </Link>
          <CategoryDetailClient categorySlug={category} />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category} | Forum | SOPHIE`,
  };
}
