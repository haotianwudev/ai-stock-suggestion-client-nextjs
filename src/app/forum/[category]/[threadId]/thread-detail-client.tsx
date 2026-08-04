"use client";

import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FORUM_THREAD, GET_FORUM_POSTS, REPLY_TO_POST } from "@/lib/graphql/queries";
import { ForumThread } from "@/lib/graphql/types";
import { PostList } from "@/components/forum/post-list";
import { PostComposer } from "@/components/forum/post-composer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

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
  const categorySlug = thread?.categorySlug ?? "general";

  return (
    <div className="space-y-6">
      <Link
        href={`/forum/${categorySlug}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Back
      </Link>

      {loading && !data ? (
        <Skeleton className="h-8 w-2/3" />
      ) : thread ? (
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">{thread.title}</h1>
            {thread.locked && <Badge variant="outline">Locked</Badge>}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Started by {thread.authorDisplayName ?? "Anonymous"} on{" "}
            {new Date(thread.createdAt).toLocaleDateString()}
          </p>
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
          onSubmit={async (body) => {
            await replyToPost({ variables: { threadId: thread.id, parentPostId: null, body } });
          }}
        />
      )}
    </div>
  );
}
