// Mirrors the tier semantics on the server (profiles.tier, 1-9). Only 1, 2, and
// 9 are reachable today -- 3-8 are named placeholders for tiers that don't
// have a feature behind them yet (see MIN_COMMENT_TIER in
// server/src/resolvers/forum.js and PostComposer/NewThreadForm on the client).
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

/** Tier required to view non-default topic pages (see TopicAccessGate). */
export const MIN_TOPIC_TIER = 2;

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

/** The next rung above `tier` on the like ladder, or null once past tier 7. */
export function nextLikeMilestone(tier: number): LikeTierStep | null {
  return LIKE_TIER_LADDER.find((step) => step.tier > tier) ?? null;
}

/** What (if anything) a given tier unlocks, for congrats copy. Null when the
 * tier is a rank-only milestone with no feature behind it yet (5-7). */
export function tierUnlockMessage(tier: number): string | null {
  switch (tier) {
    case 2:
      return "Topic pages are now unlocked.";
    case 3:
      return "Comments are now unlocked.";
    case 4:
      return "Premium articles are now unlocked.";
    default:
      return null;
  }
}
