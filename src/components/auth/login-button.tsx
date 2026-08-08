"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function LoginButton() {
  const [open, setOpen] = useState(false);
  if (!isSupabaseConfigured) return null;

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Sign in
      </Button>
      <AuthDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
