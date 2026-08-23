"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_FORUM_CATEGORIES } from "@/lib/graphql/queries";
import { ForumCategory } from "@/lib/graphql/types";
import { ThreadList } from "@/components/forum/thread-list";
import { NewThreadForm } from "@/components/forum/new-thread-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Home, ChevronRight } from "lucide-react";

export function CategoryDetailClient({ categorySlug }: { categorySlug: string }) {
  const isArticleCategory = categorySlug === "articles";
  const { data, loading } = useQuery<{ forumCategories: ForumCategory[] }>(GET_FORUM_CATEGORIES);
  const category = data?.forumCategories.find((c) => c.slug === categorySlug);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
        <Link
          href="/forum"
          className="inline-flex items-center gap-1 font-medium hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
        >
          <Home className="size-3.5" />
          <span>Forum</span>
        </Link>
        <ChevronRight className="size-3 text-slate-400" />
        <span className="text-slate-700 dark:text-slate-300 font-medium">
          {isArticleCategory ? "Article Discussions" : category?.name ?? categorySlug}
        </span>
      </nav>
      {isArticleCategory ? (
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Article & Content Discussions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Reader comments and discussions from research articles, option strategies, and study guides.
          </p>
        </div>
      ) : loading && !data ? (
        <Skeleton className="h-8 w-48" />
      ) : (
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {category?.name ?? categorySlug}
          </h1>
          {category?.description && (
            <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
          )}
        </div>
      )}

      {category && !isArticleCategory && (
        <NewThreadForm categoryId={category.id} categorySlug={categorySlug} />
      )}

      <ThreadList categorySlug={categorySlug} filterType={isArticleCategory ? "articles" : undefined} />
    </div>
  );
}
