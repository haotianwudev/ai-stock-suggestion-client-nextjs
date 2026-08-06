"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { Youtube } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { ME, SET_YOUTUBE_SUBSCRIBED } from "@/lib/graphql/queries";
import { User as MeResult } from "@/lib/graphql/types";

/**
 * Gates an article's body behind a self-serve "like on YouTube" click --
 * only used when the article has a paired video (callers should skip this
 * entirely otherwise, since there'd be nothing to redirect to). There's no
 * verification: clicking through opens that specific video (where liking/
 * subscribing actually happens -- the embedded iframe player can't do either,
 * YouTube doesn't expose that in embeds) and unlocks the current render only
 * (component state, not localStorage), so anonymous readers see this on
 * every article, every visit. Signed-in visitors get a second option instead:
 * self-confirm right here (same unverified honor-system claim as the
 * checkbox on /settings/profile -- this just saves the trip there), which
 * sets `profile.youtubeSubscribed` and unlocks every article going forward.
 * Signed-out visitors get a plain link to sign in instead, since we can't
 * attach the claim to an account that doesn't exist yet.
 */
export function YoutubeSubscribeGate({
  videoUrl,
  children,
}: {
  videoUrl: string;
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useUser();
  const [unlocked, setUnlocked] = useState(false);
  const [setYoutubeSubscribed, { loading: confirming }] = useMutation<{
    setYoutubeSubscribed: MeResult;
  }>(SET_YOUTUBE_SUBSCRIBED, { refetchQueries: [{ query: ME }] });

  if (loading) return null;
  if (profile?.youtubeSubscribed || unlocked) return <>{children}</>;

  const confirmSubscribed = async () => {
    try {
      await setYoutubeSubscribed({ variables: { subscribed: true } });
      setUnlocked(true);
      toast.success("Thanks for subscribing!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  // Blur ramps in starting ~1/3 of the way down instead of covering the content from
  // the very top, so readers get a real, readable lead-in before hitting the gate.
  const blurMask =
    "linear-gradient(to bottom, transparent 0%, transparent 33%, black 55%, black 100%)";

  return (
    <div className="relative max-h-[640px] overflow-hidden">
      <div aria-hidden className="pointer-events-none select-none">
        {children}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 backdrop-blur-md"
        style={{ maskImage: blurMask, WebkitMaskImage: blurMask }}
      />
      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent from-33% via-white/85 via-60% to-white dark:via-gray-950/85 dark:to-gray-950">
        <div className="flex flex-col items-center text-center gap-4 pb-10 px-6 max-w-md">
          <div className="flex items-center justify-center size-14 rounded-full bg-red-600/10 text-red-600 dark:text-red-500">
            <Youtube className="size-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Like to keep reading
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Like this video on the SOPHIE YouTube channel to unlock the rest of the article.
            </p>
          </div>
          <button
            onClick={() => {
              window.open(videoUrl, "_blank", "noopener,noreferrer");
              setUnlocked(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm shadow-sm transition-colors"
          >
            <Youtube className="size-4" />
            Like on YouTube
          </button>
          <div className="flex flex-col items-center gap-2 w-full">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
              or
            </span>
            {user ? (
              <button
                onClick={confirmSubscribed}
                disabled={confirming}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-red-600 text-red-600 dark:text-red-500 font-semibold text-sm hover:bg-red-600 hover:text-white dark:hover:text-white transition-colors disabled:opacity-50"
              >
                {confirming ? "Confirming..." : "I'm already subscribed — confirm"}
              </button>
            ) : (
              <Link
                href="/settings/profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-red-600 text-red-600 dark:text-red-500 font-semibold text-sm hover:bg-red-600 hover:text-white dark:hover:text-white transition-colors"
              >
                I&apos;m already subscribed — log in
              </Link>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-600">
              We don&apos;t verify this — honor system. Unlocks articles going forward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
