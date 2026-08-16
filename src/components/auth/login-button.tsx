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
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:text-[#A8672E] dark:hover:text-[#D08F52] shadow-xs transition-colors"
        onClick={() => setOpen(true)}
      >
        {t("auth.signIn")}
      </button>
      <AuthDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
