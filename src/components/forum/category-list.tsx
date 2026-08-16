"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_FORUM_CATEGORIES } from "@/lib/graphql/queries";
import { ForumCategory } from "@/lib/graphql/types";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

export function CategoryList() {
  const { data, loading } = useQuery<{ forumCategories: ForumCategory[] }>(GET_FORUM_CATEGORIES);

  if (loading && !data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  }

  const categories = data?.forumCategories ?? [];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Featured category for article and content discussions */}
      <Link href="/forum/articles" className="sm:col-span-2">
        <Card className="h-full border-primary/30 bg-gradient-to-r from-primary/5 via-amber-500/5 to-transparent transition-colors hover:bg-primary/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-primary font-bold">
              <BookOpen className="size-4.5 shrink-0" />
              Article & Content Discussions
            </CardTitle>
            <CardDescription className="text-sm">
              Explore discussions, reader comments, and debates directly from quantitative research articles, options topics, and trading strategies.
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>

      {categories.map((category) => (
        <Link key={category.id} href={`/forum/${category.slug}`}>
          <Card className="h-full transition-colors hover:bg-accent/50">
            <CardHeader>
              <CardTitle className="text-base">{category.name}</CardTitle>
              {category.description && (
                <CardDescription>{category.description}</CardDescription>
              )}
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
