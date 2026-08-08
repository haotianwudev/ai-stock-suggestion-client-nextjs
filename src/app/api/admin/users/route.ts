import { NextResponse } from "next/server";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// auth.users isn't a stable public table (see sophie-develop-guide) and its
// email column has no RLS story, so we never mirror email into `profiles`
// (which is publicly readable). Instead pull it live, per request, from the
// Admin Auth API -- always current, and only reachable via the service-role
// client already gated behind the tier-9 check below.
async function fetchEmailById(admin: ReturnType<typeof createAdminClient>) {
  const emailById = new Map<string, string | null>();
  let page = 1;
  const perPage = 200;
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    for (const u of data.users) emailById.set(u.id, u.email ?? null);
    if (data.users.length < perPage) break;
    page += 1;
  }
  return emailById;
}

export async function GET() {
  if (!isAdminConfigured) {
    return NextResponse.json({ error: "Service key not configured" }, { status: 500 });
  }

  // 1. Verify caller is Tier 9
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (!profile || profile.tier !== 9) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  // 2. Fetch users using admin client
  try {
    const admin = createAdminClient();

    // Bypass RLS to get all users
    const { data, error } = await admin
      .from("profiles")
      .select("id, display_name, avatar_url, tier, youtube_subscribed, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const emailById = await fetchEmailById(admin);
    const withEmail = data.map((row) => ({
      ...row,
      email: emailById.get(row.id) ?? null,
    }));

    return NextResponse.json(withEmail);
  } catch (err: unknown) {
    const msg = (err as { message?: string })?.message ?? "Failed to load users";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
