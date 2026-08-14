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
    <footer className="border-t bg-white dark:bg-slate-900 dark:border-slate-800 py-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center gap-3 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
