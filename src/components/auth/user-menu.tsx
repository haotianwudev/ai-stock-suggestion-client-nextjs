"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";

export function UserMenu() {
  const { user, profile, signOut } = useUser();
  const { t } = useLanguage();

  if (!user) return null;

  const initials = (profile?.displayName ?? user.email ?? "?")
    .charAt(0)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Avatar size="sm">
          <AvatarImage src={profile?.avatarUrl ?? undefined} alt={profile?.displayName ?? "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="truncate">
          {profile?.displayName ?? user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">{t("auth.editProfile")}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>{t("auth.signOut")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
