import type { TranslationKey } from "@/lib/i18n/strings";

// Mirrors the tier semantics on the server (profiles.tier, 1-9). Tiers 1-4 are
// reachable today: 2-3 via the YouTube subscribe attestation
// (server/src/db/auth.js), 3-4 via the like ladder (server/src/db/engagement.js).
// Tiers 5-8 sit on the same like ladder (and a donation ladder that's built
// server-side but has no client entry point yet -- see DONATION_TIER_LADDER)
// but don't unlock a feature yet; they're rank-only until something is built
// for them. Tier 9 (Head Quant) is functionally the admin role (see ADMIN_TIER
// in app/admin/client.tsx and isAdmin checks in header.tsx/page.tsx), granted
// manually, not earned -- keep the display name as-is, it's shown as a rank
// badge to users, not just in the admin panel.
export const TIER_NAMES: Record<number, string> = {
  1: "Intern",
  2: "Analyst",
  3: "Associate",
  4: "Senior Quant",
  5: "Vice President",
  6: "Director",
  7: "Managing Director",
  8: "Partner",
  9: "Head Quant",
};

export function getTierName(tier: number): string {
  return TIER_NAMES[tier] ?? TIER_NAMES[1];
}

/** Tier required to view articles flagged with `premiumContent: true`. */
export const MIN_PREMIUM_TIER = 4;

/** Returns true when the given tier is allowed to read premium articles. */
export function canAccessPremiumContent(tier: number): boolean {
  return tier >= MIN_PREMIUM_TIER;
}

/** Tier required to comment or post in the forum. Mirrors MIN_COMMENT_TIER in
 * server/src/resolvers/forum.js -- keep both in sync. */
export const MIN_COMMENT_TIER = 3;

/** Tier required to view non-default topic pages (see TopicAccessGate). */
export const MIN_TOPIC_TIER = 2;

/** Tier required to set a preferred video platform (YouTube vs Bilibili) in
 * profile settings. Mirrors MIN_VIDEO_PREFERENCE_TIER in
 * server/src/resolvers/auth.js -- keep both in sync. */
export const MIN_VIDEO_PREFERENCE_TIER = 4;

/** Returns true when the given tier is allowed to set the video-source preference. */
export function canSetVideoPreference(tier: number): boolean {
  return tier >= MIN_VIDEO_PREFERENCE_TIER;
}

/** Returns true when the tier alone (no YouTube-subscription bypass) unlocks topic pages. */
export function canAccessTopicContentByTier(tier: number): boolean {
  return tier >= MIN_TOPIC_TIER;
}

// Honor-system rank-up ladder driven by liked_count (see attestLiked in
// server/src/db/engagement.js and setYoutubeSubscribed in server/src/db/auth.js
// -- keep both in sync). No verification that they liked it on YouTube, but
// idempotent per video: liking N distinct paired-video articles is trusted as
// N likes. Ladder stops at tier 7; 8-9 stay manual-only (see profiles.tier
// comment in the profile_tier migration).
export interface LikeTierStep {
  tier: number;
  likesNeeded: number;
  alsoNeedsSubscribe?: boolean;
}
export const LIKE_TIER_LADDER: LikeTierStep[] = [
  { tier: 3, likesNeeded: 1, alsoNeedsSubscribe: true },
  { tier: 4, likesNeeded: 5 },
  { tier: 5, likesNeeded: 25 },
  { tier: 6, likesNeeded: 100 },
  { tier: 7, likesNeeded: 200 },
];

// Cumulative donation totals that promote a supporter, independent of the like
// ladder above. Mirrors the CASE in server/src/db/donations.js -- keep both in
// sync. Promotion is one-way (GREATEST), so donating never lowers a tier earned
// another way, and the ladder stops at 7 like the engagement one.
export interface DonationTierStep {
  tier: number;
  minCents: number;
}
export const DONATION_TIER_LADDER: DonationTierStep[] = [
  { tier: 4, minCents: 999 },
  { tier: 5, minCents: 2999 },
  { tier: 6, minCents: 9999 },
  { tier: 7, minCents: 19999 },
];

/** The next rung above `tier` on the like ladder, or null once past tier 7. */
export function nextLikeMilestone(tier: number): LikeTierStep | null {
  return LIKE_TIER_LADDER.find((step) => step.tier > tier) ?? null;
}

/** Translation key for what (if anything) a given tier unlocks, for congrats copy --
 * callers resolve it via useLanguage()'s t(). Null when the tier is a rank-only
 * milestone with no feature behind it yet (5-7). Mirrors tierUnlock.* in
 * lib/i18n/strings.ts -- keep both in sync. */
export function tierUnlockKey(tier: number): TranslationKey | null {
  switch (tier) {
    case 2:
      return "tierUnlock.topicPages";
    case 3:
      return "tierUnlock.comments";
    case 4:
      return "tierUnlock.premiumAndVideoPlatform";
    default:
      return null;
  }
}
