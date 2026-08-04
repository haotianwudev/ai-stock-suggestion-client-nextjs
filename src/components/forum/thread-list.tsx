"use client";

import { useQuery } from "@apollo/client";
import { GET_FORUM_THREADS } from "@/lib/graphql/queries";
import { ForumThreadList as ForumThreadListType } from "@/lib/graphql/types";
import { ThreadCard } from "@/components/forum/thread-card";
import { Skeleton } from "@/components/ui/skeleton";

export function ThreadList({ categorySlug }: { categorySlug: string }) {
  const { data, loading } = useQuery<{ forumThreads: ForumThreadListType }>(GET_FORUM_THREADS, {
    variables: { categorySlug, limit: 20, offset: 0 },
  });

  if (loading && !data) {
    return (
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    );
  }

  const threads = data?.forumThreads.items ?? [];

  if (threads.length === 0) {
    return (
      <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
        No threads yet. Be the first to start a discussion.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
