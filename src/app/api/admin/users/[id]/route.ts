import { NextResponse } from "next/server";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  // 2. Extract payload
  try {
    const body = await request.json();
    const { tier } = body;
    
    if (typeof tier !== "number" || tier < 1 || tier > 9) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const { id: targetUserId } = await params;

    // 3. Update user using admin client
    const admin = createAdminClient();
    const { error } = await admin
      .from("profiles")
      .update({ tier })
      .eq("id", targetUserId);

    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = (err as { message?: string })?.message ?? "Failed to update user";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
