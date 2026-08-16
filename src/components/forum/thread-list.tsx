"use client";

import { useQuery } from "@apollo/client";
import { GET_FORUM_THREADS } from "@/lib/graphql/queries";
import { ForumThreadList as ForumThreadListType } from "@/lib/graphql/types";
import { ThreadCard } from "@/components/forum/thread-card";
import { Skeleton } from "@/components/ui/skeleton";

export interface ThreadListProps {
  categorySlug?: string;
  filterType?: "all" | "articles" | "feedback" | "forum";
}

export function ThreadList({ categorySlug, filterType }: ThreadListProps) {
  const isArticleFilter = categorySlug === "articles" || filterType === "articles";
  const isAllFilter = (!categorySlug && !filterType) || categorySlug === "all" || filterType === "all";

  const targetCategorySlug =
    isArticleFilter || isAllFilter
      ? null
      : filterType === "feedback"
      ? "site-feedback"
      : categorySlug;

  const { data, loading } = useQuery<{ forumThreads: ForumThreadListType }>(GET_FORUM_THREADS, {
    variables: {
      categorySlug: targetCategorySlug,
      limit: 50,
      offset: 0,
    },
  });

  if (loading && !data) {
    return (
      <div className="space-y-2">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  let threads = data?.forumThreads.items ?? [];

  if (isArticleFilter) {
    threads = threads.filter((t) => t.contentType === "article" || Boolean(t.contentSlug));
  } else if (filterType === "forum") {
    threads = threads.filter((t) => t.contentType !== "article" && !t.contentSlug);
  }

  if (threads.length === 0) {
    return (
      <p className="rounded-xl border border-dashed py-12 text-center text-sm text-muted-foreground">
        {targetCategorySlug === "site-feedback" || filterType === "feedback"
          ? "No feedback threads yet. Share your thoughts or suggestions!"
          : isArticleFilter
          ? "No article or topic comments yet. Leave a comment on any research article or strategy page to start the conversation!"
          : "No threads yet. Be the first to start a discussion."}
      </p>
    );
  }

  return (
    <div className="space-y-2.5">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
