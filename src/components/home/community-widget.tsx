"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_FORUM_THREADS } from "@/lib/graphql/queries";
import { ForumThreadList } from "@/lib/graphql/types";
import { ThreadCard } from "@/components/forum/thread-card";
import { Button } from "@/components/ui/button";
import { MessagesSquare, ArrowRight } from "lucide-react";

export function CommunityWidget() {
  const { data, loading } = useQuery<{ forumThreads: ForumThreadList }>(GET_FORUM_THREADS, {
    variables: { limit: 3, offset: 0 },
    fetchPolicy: "cache-and-network",
  });

  const threads = data?.forumThreads?.items ?? [];
  const totalCount = data?.forumThreads?.totalCount ?? 0;

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <MessagesSquare className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Community Discussions</h2>
          {totalCount > 0 && (
            <span className="text-xs text-muted-foreground">({totalCount} threads)</span>
          )}
        </div>
        <Button asChild variant="ghost" size="sm" className="shrink-0">
          <Link href="/forum">
            Join the discussion
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </div>

      {loading && !data ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-lg border bg-muted/40 h-14" />
          ))}
        </div>
      ) : threads.length > 0 ? (
        <div className="space-y-2">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-3">
            No discussions yet — be the first to start one.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/forum">Start a discussion</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default CommunityWidget;
