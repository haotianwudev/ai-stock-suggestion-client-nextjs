"use client";

import { useQuery } from "@apollo/client";
import { GET_FORUM_CATEGORIES } from "@/lib/graphql/queries";
import { ForumCategory } from "@/lib/graphql/types";
import { ThreadList } from "@/components/forum/thread-list";
import { NewThreadForm } from "@/components/forum/new-thread-form";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryDetailClient({ categorySlug }: { categorySlug: string }) {
  const { data, loading } = useQuery<{ forumCategories: ForumCategory[] }>(GET_FORUM_CATEGORIES);
  const category = data?.forumCategories.find((c) => c.slug === categorySlug);

  return (
    <div className="space-y-4">
      {loading && !data ? (
        <Skeleton className="h-8 w-48" />
      ) : (
        <div>
          <h1 className="text-xl font-bold tracking-tight">{category?.name ?? categorySlug}</h1>
          {category?.description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{category.description}</p>
          )}
        </div>
      )}

      {category && <NewThreadForm categoryId={category.id} categorySlug={categorySlug} />}

      <ThreadList categorySlug={categorySlug} />
    </div>
  );
}
