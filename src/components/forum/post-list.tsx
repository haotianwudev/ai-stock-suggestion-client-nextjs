"use client";

import { useQuery } from "@apollo/client";
import { GET_FORUM_POSTS } from "@/lib/graphql/queries";
import { ForumPostList as ForumPostListType, ForumPost } from "@/lib/graphql/types";
import { PostItem } from "@/components/forum/post-item";
import { Skeleton } from "@/components/ui/skeleton";

export function PostList({ threadId }: { threadId: string }) {
  const { data, loading } = useQuery<{ forumPosts: ForumPostListType }>(GET_FORUM_POSTS, {
    variables: { threadId, limit: 50, offset: 0 },
  });

  if (loading && !data) {
    return (
      <div className="space-y-3">
        {[0, 1].map((i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    );
  }

  const posts = data?.forumPosts.items ?? [];

  if (posts.length === 0) {
    return (
      <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
        No replies yet.
      </p>
    );
  }

  // v1 supports exactly one level of nesting: top-level posts, then their
  // direct replies indented once underneath.
  const topLevel = posts.filter((p) => !p.parentPostId);
  const repliesByParent = new Map<string, ForumPost[]>();
  for (const post of posts) {
    if (post.parentPostId) {
      const list = repliesByParent.get(post.parentPostId) ?? [];
      list.push(post);
      repliesByParent.set(post.parentPostId, list);
    }
  }

  return (
    <div className="space-y-4">
      {topLevel.map((post) => (
        <div key={post.id}>
          <PostItem post={post} />
          {(repliesByParent.get(post.id) ?? []).map((reply) => (
            <PostItem key={reply.id} post={reply} indented />
          ))}
        </div>
      ))}
    </div>
  );
}
