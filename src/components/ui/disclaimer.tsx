"use client"

import { useLanguage } from "@/hooks/use-language";

export function Disclaimer() {
  const { t } = useLanguage();
  return (
    <div className="bg-yellow-50 border-t border-yellow-200 py-4 px-4">
      <div className="container mx-auto">
        <p className="text-xs text-yellow-800 text-center">
          {t("disclaimer.text")}
        </p>
      </div>
    </div>
  )
}
