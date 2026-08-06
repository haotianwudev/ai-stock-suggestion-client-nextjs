// Mirrors server/src/resolvers/forum.js. Tier 3+ isn't reachable through any
// self-service flow yet -- commenting is intentionally locked to everyone but
// manually-granted tier 9 accounts until a real tier-3 feature ships. Site
// Feedback is exempt: everyone should be able to leave feedback regardless
// of tier.
export const MIN_COMMENT_TIER = 3;
export const SITE_FEEDBACK_CATEGORY_SLUG = "site-feedback";

export function canCommentInCategory(tier: number, categorySlug?: string | null): boolean {
  if (categorySlug === SITE_FEEDBACK_CATEGORY_SLUG) return true;
  return tier >= MIN_COMMENT_TIER;
}
