"use client";

import { useUser } from "@/hooks/use-user";
import { LoginButton } from "@/components/auth/login-button";
import { UserMenu } from "@/components/auth/user-menu";

export function AuthStatus() {
  const { user, loading } = useUser();

  if (loading) return null;
  return user ? <UserMenu /> : <LoginButton />;
}
