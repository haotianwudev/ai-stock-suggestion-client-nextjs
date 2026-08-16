import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { ProfileSettingsClient } from "./profile-settings-client";

export const metadata: Metadata = {
  title: "Profile Settings | SOPHIE",
  description: "Change your display name and avatar.",
};

export default function ProfileSettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-xl px-4 py-8 md:py-12">
          <ProfileSettingsClient />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
