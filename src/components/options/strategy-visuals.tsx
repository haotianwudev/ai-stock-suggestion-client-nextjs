import { LucideIcon } from "lucide-react";

const toneClasses = {
  accent: "text-[#A8672E] dark:text-[#D08F52]",
  pos: "text-[#1D8A70] dark:text-[#3CBF9C]",
  neg: "text-[#BC4128] dark:text-[#E2694A]",
} as const;

export type SectionTone = keyof typeof toneClasses;

/**
 * Restyled replacement for the old per-strategy `bg-{color}-50` section template.
 * One reusable card shape (icon + uppercase kicker + prose body) instead of a
 * different hardcoded color per section, so migrating a strategy is a mechanical
 * content pass rather than a bespoke design pass each time.
 */
export function SectionCard({
  title,
  icon: Icon,
  tone = "accent",
  children,
}: {
  title: string;
  icon: LucideIcon;
  tone?: SectionTone;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6 shadow-sm">
      <h3 className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4 ${toneClasses[tone]}`}>
        <Icon className="h-4 w-4" />
        {title}
      </h3>
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ul]:list-inside [&_ol]:space-y-1.5 [&_ol]:list-decimal [&_ol]:list-inside [&_strong]:text-gray-900 dark:[&_strong]:text-gray-100 [&_h4]:font-semibold [&_h4]:text-gray-900 dark:[&_h4]:text-gray-100 [&_h4]:mb-1.5">
        {children}
      </div>
    </div>
  );
}
