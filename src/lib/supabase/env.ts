// @supabase/ssr throws at client-creation time if the URL/key are missing.
// Until Phase 0 (Supabase project provisioning) is done, these env vars
// won't exist yet — callers should check this first and degrade to a
// logged-out state instead of crashing.
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
