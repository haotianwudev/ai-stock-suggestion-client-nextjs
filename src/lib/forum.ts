// Mirrors server/src/resolvers/forum.js. Tier 3+ isn't reachable through any
// self-service flow yet -- commenting is intentionally locked to everyone but
// manually-granted tier 9 accounts until a real tier-3 feature ships. Site
// Feedback is exempt: everyone should be able to leave feedback regardless
// of tier.
export const MIN_COMMENT_TIER = 3;
export const MIN_MODERATOR_TIER = 8; // Partner (Tier 8) & Admin (Tier 9)
export const SITE_FEEDBACK_CATEGORY_SLUG = "site-feedback";

export function canCommentInCategory(tier: number, categorySlug?: string | null): boolean {
  if (categorySlug === SITE_FEEDBACK_CATEGORY_SLUG) return true;
  return tier >= MIN_COMMENT_TIER;
}

export function canDeletePost(userId: string | undefined, postAuthorId: string, tier: number): boolean {
  if (!userId) return false;
  // Self (author of the comment/post)
  if (userId === postAuthorId) return true;
  // Partner (Tier 8) and Admin (Tier 9)
  return tier >= MIN_MODERATOR_TIER;
}
