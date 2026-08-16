"use client";

import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FORUM_THREAD, GET_FORUM_POSTS, REPLY_TO_POST } from "@/lib/graphql/queries";
import { ForumThread } from "@/lib/graphql/types";
import { PostList } from "@/components/forum/post-list";
import { PostComposer } from "@/components/forum/post-composer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, BookOpen, ExternalLink } from "lucide-react";

export function ThreadDetailClient({ threadId }: { threadId: string }) {
  const { data, loading } = useQuery<{ forumThread: ForumThread | null }>(GET_FORUM_THREAD, {
    variables: { id: threadId },
  });
  const [replyToPost] = useMutation(REPLY_TO_POST, {
    refetchQueries: [
      { query: GET_FORUM_POSTS, variables: { threadId, limit: 50, offset: 0 } },
    ],
  });

  const thread = data?.forumThread;
  const categorySlug = thread?.categorySlug ?? (thread?.contentSlug ? "articles" : "general");

  let contentUrl: string | null = null;
  let contentLabel = "Article";
  if (thread?.contentSlug) {
    if (thread.contentSlug.startsWith("strategy-")) {
      contentUrl = `/option/strategies/${thread.contentSlug.replace(/^strategy-/, "")}`;
      contentLabel = "Option Strategy";
    } else if (["option101", "greeks", "volatility", "vrp", "gex", "roll", "books"].includes(thread.contentSlug)) {
      contentUrl = `/option/topics/${thread.contentSlug}`;
      contentLabel = "Option Topic";
    } else {
      contentUrl = `/articles/${thread.contentSlug}`;
      contentLabel = "Article";
    }
  }

  return (
    <div className="space-y-6">
      <Link
        href={thread?.contentSlug ? "/forum/articles" : `/forum/${categorySlug}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Back to {thread?.contentSlug ? "Article Discussions" : "Discussions"}
      </Link>

      {loading && !data ? (
        <Skeleton className="h-8 w-2/3" />
      ) : thread ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {thread.title}
            </h1>
            {thread.locked && <Badge variant="outline">Locked</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">
            Started by {thread.authorDisplayName ?? "Anonymous"} on{" "}
            {new Date(thread.createdAt).toLocaleDateString()}
          </p>

          {contentUrl && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-sm">
              <div className="flex items-center gap-2 text-primary font-medium min-w-0">
                <BookOpen className="size-4 shrink-0" />
                <span className="truncate">
                  Discussion on {contentLabel}: <strong>{thread.title}</strong>
                </span>
              </div>
              <Link
                href={contentUrl}
                className="shrink-0 inline-flex items-center gap-1 font-semibold text-primary underline hover:opacity-80 text-xs"
              >
                <span>Read {contentLabel}</span>
                <ExternalLink className="size-3" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Thread not found.</p>
      )}

      {thread && <PostList threadId={thread.id} />}

      {thread && (
        <PostComposer
          placeholder="Write a reply..."
          submitLabel="Reply"
          disabled={thread.locked}
          disabledMessage="This discussion is locked."
          categorySlug={thread.categorySlug}
          onSubmit={async (body) => {
            await replyToPost({ variables: { threadId: thread.id, parentPostId: null, body } });
          }}
        />
      )}
    </div>
  );
}
