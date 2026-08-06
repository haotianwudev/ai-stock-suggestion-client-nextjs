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
