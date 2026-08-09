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
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";
import { getTierName } from "@/lib/tiers";
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
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <WelcomeGate />
      <RegisterServiceWorker />
      <div className="container mx-auto flex h-14 sm:h-16 max-w-screen-2xl items-center px-4 sm:px-6">
        <div className="flex items-center flex-1 min-w-0">
          <Link href="/" className="flex items-center space-x-2 min-w-0">
            <div className="relative h-6 w-6 sm:h-8 sm:w-8 rounded-full overflow-hidden border border-primary/40 shadow-sm flex-shrink-0">
              <Image
                src="/images/agents/SOPHIE.png"
                alt="SOPHIE"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="font-bold text-sm sm:text-lg lg:text-xl truncate">
              <span className="sm:hidden">SOPHIE</span>
              <span className="hidden sm:inline">SOPHIE Daddy Quant Blog</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="hidden sm:block w-40 md:w-48 lg:w-auto lg:flex-1 lg:max-w-md">
            <SearchBar />
          </div>

          {/* Desktop nav links */}
          <nav className="hidden sm:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors whitespace-nowrap"
              >
                <Crown className="h-3 w-3" />
                {t("header.admin")}
              </Link>
            )}
          </nav>

          {user && profile && (
            <Badge variant="outline" className="hidden sm:inline-flex whitespace-nowrap">
              {getTierName(profile.tier)}
            </Badge>
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
              <Button variant="ghost" size="icon" aria-label={t("header.openNavMenu")}>
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-2 mb-2 sm:hidden">
                <SearchBar />
              </div>
              {NAV_LINKS.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="flex items-center gap-2">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
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
                  <Badge variant="outline">{getTierName(profile.tier)}</Badge>
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