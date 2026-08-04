"use client";

import { useMutation, useQuery } from "@apollo/client";
import { GET_ARTICLE_COMMENTS, GET_FORUM_POSTS, POST_COMMENT } from "@/lib/graphql/queries";
import { ForumThread, ForumPost } from "@/lib/graphql/types";
import { PostList } from "@/components/forum/post-list";
import { PostComposer } from "@/components/forum/post-composer";
import { MessageSquare } from "lucide-react";

export function CommentSection({ contentSlug, title }: { contentSlug: string; title: string }) {
  const { data } = useQuery<{ articleComments: ForumThread | null }>(GET_ARTICLE_COMMENTS, {
    variables: { contentSlug },
  });

  const [postComment] = useMutation<{ postComment: ForumPost }>(POST_COMMENT, {
    // The thread may not exist until the first comment creates it, so contentSlug
    // (known upfront) drives the article-comments refetch; the post-list refetch
    // only makes sense once we know the (possibly newly created) thread id.
    refetchQueries: (result) => {
      const threadId = result.data?.postComment?.threadId;
      return [
        { query: GET_ARTICLE_COMMENTS, variables: { contentSlug } },
        ...(threadId
          ? [{ query: GET_FORUM_POSTS, variables: { threadId, limit: 50, offset: 0 } }]
          : []),
      ];
    },
  });

  const thread = data?.articleComments;

  return (
    <section className="mt-10 border-t pt-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight">
        <MessageSquare className="size-5" />
        Comments{thread ? ` (${thread.postCount})` : ""}
      </h2>

      {thread && (
        <div className="mb-4">
          <PostList threadId={thread.id} />
        </div>
      )}

      <PostComposer
        placeholder="Share your thoughts..."
        submitLabel="Comment"
        onSubmit={async (body) => {
          await postComment({ variables: { contentSlug, title, body } });
        }}
      />
    </section>
  );
}
