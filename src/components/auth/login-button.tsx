"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { useLanguage } from "@/hooks/use-language";

export function LoginButton() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  if (!isSupabaseConfigured) return null;

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        {t("auth.signIn")}
      </Button>
      <AuthDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
