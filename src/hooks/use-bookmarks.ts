"use client";

import { useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { useUser } from "./use-user";
import { MY_BOOKMARKED_ARTICLES, TOGGLE_BOOKMARK } from "@/lib/graphql/queries";

export function useBookmarks() {
  const { user } = useUser();
  const { data } = useQuery<{ myBookmarkedArticleSlugs: string[] }>(MY_BOOKMARKED_ARTICLES, {
    skip: !user,
  });
  const bookmarkedSlugs = data?.myBookmarkedArticleSlugs ?? [];

  const [toggleBookmarkMutation, { loading: bookmarking }] = useMutation<{ toggleBookmark: boolean }>(
    TOGGLE_BOOKMARK,
    { refetchQueries: [{ query: MY_BOOKMARKED_ARTICLES }] }
  );

  const isBookmarked = (slug: string) => bookmarkedSlugs.includes(slug);

  const toggleBookmark = (slug: string) => {
    if (!user) {
      toast.error("Sign in to bookmark articles.");
      return;
    }
    toggleBookmarkMutation({ variables: { articleSlug: slug } })
      .then(({ data }) => {
        toast.success(data?.toggleBookmark ? "Bookmarked." : "Bookmark removed.");
      })
      .catch((e) => {
        toast.error(e instanceof Error ? e.message : "Something went wrong.");
      });
  };

  return { user, bookmarkedSlugs, isBookmarked, toggleBookmark, bookmarking };
}
