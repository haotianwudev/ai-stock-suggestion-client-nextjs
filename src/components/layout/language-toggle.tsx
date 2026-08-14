"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLanguage, type Language } from "@/hooks/use-language";

/**
 * EN/中文 segmented pill, visually mirroring the YouTube/Bilibili source toggle in
 * VideoCard (article-frame.tsx) and the profile settings video-platform toggle.
 * Reads/writes the URL via window.location rather than useSearchParams() -- see
 * use-language.tsx for why.
 */
export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (lang: Language) => {
    if (lang === language) return;
    setLanguage(lang);
    const params = new URLSearchParams(window.location.search);
    params.set("lang", lang);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden text-[11px] font-semibold">
      {(["en", "zh"] as const).map((l) => (
        <button
          key={l}
          onClick={() => handleSelect(l)}
          className={`px-2.5 py-1 transition-colors ${
            language === l
              ? "bg-[#A8672E] dark:bg-[#D08F52] text-white"
              : "bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
        >
          {l === "en" ? "EN" : "中文"}
        </button>
      ))}
    </div>
  );
}
