"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();
  const FOOTER_LINKS = [
    { href: "/about", label: t("footer.about") },
    { href: "/privacy", label: t("footer.privacyPolicy") },
    { href: "/terms", label: t("footer.termsOfService") },
    { href: "/forum/site-feedback", label: t("footer.feedback") },
  ];

  return (
    <footer className="border-t border-gray-200/80 dark:border-gray-800/80 bg-[#FDFBF7] dark:bg-[#121110] py-8 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center gap-3 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
