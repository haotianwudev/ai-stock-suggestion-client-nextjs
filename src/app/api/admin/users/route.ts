import { NextResponse } from "next/server";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

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
    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = (err as { message?: string })?.message ?? "Failed to load users";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
