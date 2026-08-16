import { LucideIcon } from "lucide-react";

const toneClasses = {
  accent: "text-[#A8672E] dark:text-[#D08F52]",
  pos: "text-[#1D8A70] dark:text-[#3CBF9C]",
  neg: "text-[#BC4128] dark:text-[#E2694A]",
} as const;

export type SectionTone = keyof typeof toneClasses;

/**
 * Generic ArticleFrame-styled section card: icon + uppercase kicker + prose body. Shared across
 * any page family that needs the same restyled-content-block primitive (topics, strategies) —
 * not specific to one feature area, so it lives under components/shared rather than being
 * duplicated per feature.
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

/** Compact stat/definition tile — the restyled replacement for the small colored info boxes
 * (e.g. "Positive GEX" / "Historical Volatility") scattered through topic content. */
export function StatTile({
  title,
  icon: Icon,
  tone = "accent",
  children,
}: {
  title: string;
  icon?: LucideIcon;
  tone?: SectionTone;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
      <h4 className={`flex items-center gap-1.5 text-sm font-semibold mb-1.5 ${toneClasses[tone]}`}>
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        {title}
      </h4>
      <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{children}</div>
    </div>
  );
}

/** Numbered chapter/section heading, matching the "1. 2. 3." walkthrough structure most topic
 * pages already use — restyled to the bronze accent instead of each topic's own rainbow color. */
export function ChapterHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-[#14171B] text-xs md:text-sm font-bold flex-shrink-0">
        {number}
      </span>
      <h3 className="font-serif text-lg md:text-xl text-gray-900 dark:text-gray-100">{title}</h3>
    </div>
  );
}
