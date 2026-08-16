"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Clock, BookOpen, MessagesSquare, Crown, User, LogOut, HeartHandshake } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { SearchBar } from "@/components/search/search-bar";
import { AuthStatus } from "@/components/auth/auth-status";
import { WelcomeGate } from "@/components/auth/welcome-gate";
import { RegisterServiceWorker } from "@/components/pwa/register-service-worker";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/shared/tier-badge";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";
import { getTierName } from "@/lib/tiers";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, profile, signOut } = useUser();
  const { t } = useLanguage();
  const isAdmin = profile?.tier === 9;
  const NAV_LINKS = [
    { href: "/investment-clock", label: t("header.navMacroClock"), icon: Clock },
    { href: "/wiki", label: t("header.navWiki"), icon: BookOpen },
    { href: "/forum/site-feedback", label: t("header.navFeedback"), icon: MessagesSquare },
    { href: "/donate", label: t("header.navDonate"), icon: HeartHandshake },
  ];
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-[#FDFBF7]/90 dark:bg-[#121110]/90 backdrop-blur-md transition-colors">
      <WelcomeGate />
      <RegisterServiceWorker />
      <div className="container mx-auto flex h-14 sm:h-16 max-w-screen-2xl items-center px-4 sm:px-6">
        <div className="flex items-center flex-1 min-w-0">
          <Link href="/" className="flex items-center space-x-2.5 min-w-0 group">
            <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full overflow-hidden border border-[#A8672E]/40 dark:border-[#D08F52]/40 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/agents/SOPHIE.png"
                alt="SOPHIE"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="font-serif font-bold text-sm sm:text-base lg:text-lg text-slate-900 dark:text-slate-100 truncate group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">
              <span className="sm:hidden">SOPHIE</span>
              <span className="hidden sm:inline">SOPHIE Daddy Quant Blog</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden sm:block w-40 md:w-48 lg:w-auto lg:flex-1 lg:max-w-md">
            <SearchBar />
          </div>

          {/* Desktop nav links */}
          <nav className="hidden sm:flex items-center gap-1.5 md:gap-2">
            {NAV_LINKS.map((link) => {
              const isDonate = link.href === "/donate";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap",
                    isDonate
                      ? "text-[#BC4128] dark:text-[#E2694A] hover:bg-[#BC4128]/10 dark:hover:bg-[#E2694A]/15 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] hover:bg-[#A8672E]/5 dark:hover:bg-[#D08F52]/10"
                  )}
                >
                  {isDonate && <link.icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#A8672E] dark:text-[#D08F52] hover:bg-[#A8672E]/10 dark:hover:bg-[#D08F52]/15 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <Crown className="h-3.5 w-3.5" />
                {t("header.admin")}
              </Link>
            )}
          </nav>

          {user && profile && (
            <TierBadge tier={profile.tier} size="sm" className="hidden sm:inline-flex" />
          )}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>

          {/* Auth status (Avatar / Login) accessible directly in header on both mobile & desktop */}
          <AuthStatus />

          {/* Mobile nav menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <button
                aria-label={t("header.openNavMenu")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-slate-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:text-[#A8672E] dark:hover:text-[#D08F52] shadow-xs transition-colors"
              >
                <Menu className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl border border-gray-200 dark:border-gray-800 bg-[#FDFBF7] dark:bg-[#14171B] p-1.5 shadow-lg">
              <div className="px-2 py-2 mb-1 sm:hidden">
                <SearchBar />
              </div>
              {NAV_LINKS.map((link) => {
                const isDonate = link.href === "/donate";
                return (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-300 hover:text-[#A8672E] dark:hover:text-[#D08F52]",
                        isDonate && "text-[#BC4128] dark:text-[#E2694A] font-semibold"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 text-xs font-semibold text-[#A8672E] dark:text-[#D08F52] rounded-xl">
                    <Crown className="h-4 w-4" />
                    {t("header.admin")}
                  </Link>
                </DropdownMenuItem>
              )}
              {user && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t("auth.editProfile")}
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              {user && profile && (
                <div className="flex items-center justify-between px-2 py-2 mt-1 border-t sm:hidden">
                  <span className="text-sm font-medium">{t("header.rank")}</span>
                  <TierBadge tier={profile.tier} size="sm" />
                </div>
              )}
              <div className="flex items-center justify-between px-2 py-2 border-t sm:hidden">
                <span className="text-sm font-medium">{t("header.theme")}</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between px-2 py-2 border-t sm:hidden">
                <span className="text-sm font-medium">{t("header.language")}</span>
                <LanguageToggle />
              </div>
              {user && (
                <div className="border-t sm:hidden">
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("auth.signOut")}
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}