import type { TranslationKey } from "@/lib/i18n/strings";

// Mirrors the tier semantics on the server (profiles.tier, 1-9). Tiers 1-4 are
// reachable today: 2-3 via the YouTube subscribe attestation
// (server/src/db/auth.js), 3-4 via the like ladder (server/src/db/engagement.js).
// Tiers 5-7 are reachable via the like ladder or the donation ladder (see
// DONATION_TIER_LADDER, wired into /donate) as concierge perks fulfilled
// manually. Tier 8 stays rank-only until something is built for it. Tier 9
// (Head Quant) is functionally the admin role (see ADMIN_TIER
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

export type TierIconName =
  | "GraduationCap"
  | "BarChart3"
  | "TrendingUp"
  | "Brain"
  | "Award"
  | "Flame"
  | "Gem"
  | "Trophy"
  | "Crown";

export interface TierMetadata {
  tier: number;
  name: string;
  shortName: string;
  iconName: TierIconName;
  colorKey: string;
  classes: {
    badge: string;
    solid: string;
    outline: string;
    icon: string;
  };
}

export const TIER_METADATA: Record<number, TierMetadata> = {
  1: {
    tier: 1,
    name: "Intern",
    shortName: "T1",
    iconName: "GraduationCap",
    colorKey: "slate",
    classes: {
      badge: "bg-slate-100/90 text-slate-700 border-slate-300/80 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700",
      solid: "bg-slate-600 text-white border-transparent",
      outline: "bg-transparent text-slate-700 border-slate-300 dark:text-slate-300 dark:border-slate-700",
      icon: "text-slate-500 dark:text-slate-400",
    },
  },
  2: {
    tier: 2,
    name: "Analyst",
    shortName: "T2",
    iconName: "BarChart3",
    colorKey: "sky",
    classes: {
      badge: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800",
      solid: "bg-sky-600 text-white border-transparent",
      outline: "bg-transparent text-sky-700 border-sky-300 dark:text-sky-300 dark:border-sky-700",
      icon: "text-sky-600 dark:text-sky-400",
    },
  },
  3: {
    tier: 3,
    name: "Associate",
    shortName: "T3",
    iconName: "TrendingUp",
    colorKey: "teal",
    classes: {
      badge: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
      solid: "bg-teal-600 text-white border-transparent",
      outline: "bg-transparent text-teal-700 border-teal-300 dark:text-teal-300 dark:border-teal-700",
      icon: "text-teal-600 dark:text-teal-400",
    },
  },
  4: {
    tier: 4,
    name: "Senior Quant",
    shortName: "T4",
    iconName: "Brain",
    colorKey: "emerald",
    classes: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
      solid: "bg-emerald-600 text-white border-transparent",
      outline: "bg-transparent text-emerald-700 border-emerald-300 dark:text-emerald-300 dark:border-emerald-700",
      icon: "text-emerald-600 dark:text-emerald-400",
    },
  },
  5: {
    tier: 5,
    name: "Vice President",
    shortName: "T5",
    iconName: "Award",
    colorKey: "amber",
    classes: {
      badge: "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80",
      solid: "bg-amber-600 text-white border-transparent",
      outline: "bg-transparent text-amber-700 border-amber-400 dark:text-amber-300 dark:border-amber-700",
      icon: "text-amber-600 dark:text-amber-400",
    },
  },
  6: {
    tier: 6,
    name: "Director",
    shortName: "T6",
    iconName: "Flame",
    colorKey: "orange",
    classes: {
      badge: "bg-orange-50 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-700/80",
      solid: "bg-orange-600 text-white border-transparent",
      outline: "bg-transparent text-orange-700 border-orange-400 dark:text-orange-300 dark:border-orange-700",
      icon: "text-orange-600 dark:text-orange-400",
    },
  },
  7: {
    tier: 7,
    name: "Managing Director",
    shortName: "T7",
    iconName: "Gem",
    colorKey: "rose",
    classes: {
      badge: "bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700/80 ring-1 ring-rose-400/20",
      solid: "bg-rose-600 text-white border-transparent shadow-sm",
      outline: "bg-transparent text-rose-700 border-rose-400 dark:text-rose-300 dark:border-rose-700",
      icon: "text-rose-600 dark:text-rose-400",
    },
  },
  8: {
    tier: 8,
    name: "Partner",
    shortName: "T8",
    iconName: "Trophy",
    colorKey: "indigo",
    classes: {
      badge: "bg-indigo-50 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-700/80 ring-1 ring-indigo-400/20",
      solid: "bg-indigo-600 text-white border-transparent shadow-sm",
      outline: "bg-transparent text-indigo-700 border-indigo-400 dark:text-indigo-300 dark:border-indigo-700",
      icon: "text-indigo-600 dark:text-indigo-400",
    },
  },
  9: {
    tier: 9,
    name: "Head Quant",
    shortName: "T9",
    iconName: "Crown",
    colorKey: "purple",
    classes: {
      badge: "bg-purple-50 text-purple-900 border-purple-300/90 dark:bg-purple-950/70 dark:text-purple-200 dark:border-purple-600/80 shadow-sm ring-1 ring-purple-500/30",
      solid: "bg-gradient-to-r from-purple-700 to-indigo-700 text-white border-transparent shadow-sm",
      outline: "bg-transparent text-purple-700 border-purple-400 dark:text-purple-300 dark:border-purple-600",
      icon: "text-amber-500 dark:text-amber-400",
    },
  },
};

export function getTierMetadata(tier: number): TierMetadata {
  return TIER_METADATA[tier] ?? TIER_METADATA[1];
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

/** Tier required to moderate / remove comments and forum posts (Partner = 8, Head Quant / Admin = 9).
 * Mirrors MIN_MODERATOR_TIER in server/src/resolvers/forum.js. */
export const MIN_MODERATOR_TIER = 8;

/** Returns true when the user tier allows moderating / deleting any comment or forum post. */
export function canModerateComments(tier: number): boolean {
  return tier >= MIN_MODERATOR_TIER;
}

/** Tier required to view non-default topic pages (see TopicAccessGate). */
export const MIN_TOPIC_TIER = 2;

/** Tier required for Live Real-Time Options (SPX Cboe feed). */
export const MIN_LIVE_OPTIONS_TIER = 4;

/** Returns true when the given tier is allowed to access Live Real-Time options data. */
export function canAccessLiveOptions(tier: number): boolean {
  return tier >= MIN_LIVE_OPTIONS_TIER;
}

/** Tier required to set a preferred video platform (YouTube vs Bilibili) in
 * profile settings. Mirrors MIN_VIDEO_PREFERENCE_TIER in
 * server/src/resolvers/auth.js -- keep both in sync. */
export const MIN_VIDEO_PREFERENCE_TIER = 4;

/** Returns true when the given tier is allowed to set the video-source preference. */
export function canSetVideoPreference(tier: number): boolean {
  return tier >= MIN_VIDEO_PREFERENCE_TIER;
}

/** Tier required to default topic pages to the "Sidebar" layout instead of "Classic" (see
 * lib/topics/topic-layout-preference.ts). Purely a client-side/localStorage preference (no
 * server field), same shape as MIN_LIVE_OPTIONS_TIER below -- not tied to a DB column. */
export const MIN_TOPIC_LAYOUT_TIER = 4;

/** Returns true when the given tier is allowed to set the topic-layout preference. */
export function canSetTopicLayoutPreference(tier: number): boolean {
  return tier >= MIN_TOPIC_LAYOUT_TIER;
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

/** The next rung above `tier` on the donation ladder, or null once past tier 7. */
export function nextDonationMilestone(tier: number): DonationTierStep | null {
  return DONATION_TIER_LADDER.find((step) => step.tier > tier) ?? null;
}

/** Translation key for what (if anything) a given tier unlocks, for congrats copy --
 * callers resolve it via useLanguage()'s t(). Tiers 5-7 are concierge perks fulfilled
 * manually (not self-serve, see DONATION_TIER_LADDER) -- their copy points at Feedback
 * as the "reach out" channel rather than a dedicated contact form. Mirrors tierUnlock.*
 * in lib/i18n/strings.ts -- keep both in sync. */
export function tierUnlockKey(tier: number): TranslationKey | null {
  switch (tier) {
    case 2:
      return "tierUnlock.topicPages";
    case 3:
      return "tierUnlock.comments";
    case 4:
      return "tierUnlock.premiumAndVideoPlatform";
    case 5:
      return "tierUnlock.pageReview";
    case 6:
      return "tierUnlock.customVideo";
    case 7:
      return "tierUnlock.quantNeighborhoodPage";
    default:
      return null;
  }
}
