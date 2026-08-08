"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { Youtube, Lock } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { ME, SET_YOUTUBE_SUBSCRIBED } from "@/lib/graphql/queries";
import { User as MeResult } from "@/lib/graphql/types";
import { canAccessTopicContentByTier, MIN_PREMIUM_TIER, getTierName } from "@/lib/tiers";

export const SOPHIE_YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@SOPHIEAIFinance";

// One free topic per section, left open so visitors get a real preview of what a topic guide
// looks like before hitting the gate — the rest require tier 2+ or a self-attested subscription.
export const FREE_TOPIC_IDS = [
  "option101",
  "monte-carlo",
  "systematic-strategies",
  "stock-analysis",
  "macro-analysis",
];

// Topics held to a stricter bar than the rest: tier 4+ only, no honor-system YouTube-subscribe
// bypass. Currently just the cross-section Books topic.
export const PREMIUM_TOPIC_IDS = ["books"];

/**
 * Gates topic-page content (video/study guide/infographic/related articles) behind tier 2+ or,
 * same honor-system self-attestation the Watch card's Like button uses, a logged-in reader
 * self-attesting they're subscribed on YouTube. Unlike the Watch card's per-video like, this
 * isn't tied to one specific video, so the primary CTA opens the channel itself rather than a video.
 *
 * `enabled` lets callers pass every topic through unconditionally and only have this gate
 * actually apply to non-free topics (see FREE_TOPIC_IDS) — when false, children render as-is,
 * skipping the loading/auth check entirely so free topics never flash a gate.
 *
 * `strictTierOnly` (see PREMIUM_TOPIC_IDS) raises the bar to `MIN_PREMIUM_TIER` and removes the
 * self-attest/click-through bypass entirely — access is tier alone, no honor system.
 */
export function TopicAccessGate({
  enabled,
  strictTierOnly = false,
  children,
}: {
  enabled: boolean;
  strictTierOnly?: boolean;
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useUser();
  const [unlocked, setUnlocked] = useState(false);
  const [setYoutubeSubscribed, { loading: confirming }] = useMutation<{
    setYoutubeSubscribed: MeResult;
  }>(SET_YOUTUBE_SUBSCRIBED, { refetchQueries: [{ query: ME }] });

  if (!enabled) return <>{children}</>;
  if (loading) return null;

  const tier = profile?.tier ?? 1;
  const hasAccess = strictTierOnly
    ? tier >= MIN_PREMIUM_TIER
    : canAccessTopicContentByTier(tier) || (!!user && !!profile?.youtubeSubscribed);
  if (hasAccess || (!strictTierOnly && unlocked)) return <>{children}</>;

  // Blur ramps in starting ~1/3 of the way down instead of covering the content from
  // the very top, so readers get a real, readable lead-in before hitting the gate.
  const blurMask =
    "linear-gradient(to bottom, transparent 0%, transparent 33%, black 55%, black 100%)";

  if (strictTierOnly) {
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
            <div className="flex items-center justify-center size-14 rounded-full bg-amber-600/10 text-amber-600 dark:text-amber-500">
              <Lock className="size-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {getTierName(MIN_PREMIUM_TIER)}+ access required
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This topic is reserved for {getTierName(MIN_PREMIUM_TIER)} tier and above — there&apos;s no self-serve unlock for it.
              </p>
            </div>
            {!user && (
              <Link
                href="/settings/profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm shadow-sm transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const confirmSubscribed = async () => {
    try {
      await setYoutubeSubscribed({ variables: { subscribed: true } });
      setUnlocked(true);
      toast.success("Thanks for subscribing!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

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
              Subscribe to unlock this topic
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This topic guide is available to subscribed members — visit and subscribe to the SOPHIE YouTube channel to unlock it.
            </p>
          </div>
          <button
            onClick={() => {
              window.open(SOPHIE_YOUTUBE_CHANNEL_URL, "_blank", "noopener,noreferrer");
              setUnlocked(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm shadow-sm transition-colors"
          >
            <Youtube className="size-4" />
            Visit my YouTube channel
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
              We don&apos;t verify this — honor system. Unlocks topics going forward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
