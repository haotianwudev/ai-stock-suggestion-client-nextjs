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
      <Link href="/forum/articles" className="sm:col-span-2 group">
        <div className="rounded-2xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 bg-white dark:bg-gray-900 p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-[#A8672E]/60 dark:hover:border-[#D08F52]/60 hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-[#A8672E] dark:text-[#D08F52] mb-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/15 shrink-0">
              <BookOpen className="size-4.5" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">
              Article & Content Discussions
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
            Explore discussions, reader comments, and debates directly from quantitative research articles, options topics, and trading strategies.
          </p>
        </div>
      </Link>

      {categories.map((category) => (
        <Link key={category.id} href={`/forum/${category.slug}`} className="group">
          <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:-translate-y-0.5">
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">
              {category.name}
            </h3>
            {category.description && (
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                {category.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
