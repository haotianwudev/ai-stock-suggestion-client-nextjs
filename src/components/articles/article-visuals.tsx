import { useState } from "react";
import { MathBlock } from "@/components/articles/math";

/**
 * Inline jargon term with a dashed-underline hover/focus tooltip.
 * Shared across article bodies so the tooltip markup/behavior stays consistent
 * instead of being redefined per-article.
 */
export function Jargon({ term, definition }: { term: string; definition: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <span
        className="border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] transition-colors"
        tabIndex={0}
      >
        {term}
      </span>
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 shadow-xl rounded-md border border-gray-200 dark:border-gray-700 z-10 pointer-events-none font-sans text-left">
          {definition}
          <svg className="absolute text-white dark:text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </span>
      )}
    </span>
  );
}

const comparisonTone = {
  pos: {
    border: "border-[#1D8A70]/30 dark:border-[#3CBF9C]/30",
    text: "text-[#1D8A70] dark:text-[#3CBF9C]",
    borderB: "border-[#1D8A70]/20 dark:border-[#3CBF9C]/20",
  },
  neg: {
    border: "border-[#BC4128]/30 dark:border-[#E2694A]/30",
    text: "text-[#BC4128] dark:text-[#E2694A]",
    borderB: "border-[#BC4128]/20 dark:border-[#E2694A]/20",
  },
  neutral: {
    border: "border-[#A8672E]/30 dark:border-[#D08F52]/30",
    text: "text-[#A8672E] dark:text-[#D08F52]",
    borderB: "border-[#A8672E]/20 dark:border-[#D08F52]/20",
  },
} as const;

/**
 * Two-column-grid wrapper for a paired comparison (regime A vs regime B, before/after).
 * Pair with two <ComparisonCard> children, one per side.
 */
export function ComparisonGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-6">{children}</div>;
}

export function ComparisonCard({
  title,
  tone,
  type,
  items,
  children,
}: {
  title: string;
  tone?: keyof typeof comparisonTone;
  type?: keyof typeof comparisonTone;
  items?: string[];
  children?: React.ReactNode;
}) {
  const actualTone = tone ?? type ?? "neutral";
  const s = comparisonTone[actualTone];
  return (
    <div className={`bg-white dark:bg-gray-900 border ${s.border} rounded-xl p-6 shadow-sm`}>
      <h3 className={`font-serif text-xl ${s.text} mb-4 border-b ${s.borderB} pb-2 flex items-center gap-2`}>
        <span className="w-2 h-2 rounded-full bg-current flex-none" />
        {title}
      </h3>
      <div className="space-y-4 text-sm md:text-base">
        {items ? (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-none" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

interface WorkedExample {
  label: string;
  rows: { label: string; value: string }[];
  result: { label?: string; value: string };
  note?: string;
}

interface FormulaPanelProps {
  title?: string;
  formula: string;
  legend?: string | { label: string; value: string }[];
  example?: WorkedExample;
}

/**
 * Dark "terminal" panel for a core formula plus an optional worked example.
 * The worked example renders as aligned label/operator/value rows (a grid),
 * never as a single block of pre-formatted text with manual line breaks —
 * manual spacing doesn't survive font/width changes and reads as unfinished.
 */
export function FormulaPanel({ title = "Core Exposure Formula", formula, legend, example }: FormulaPanelProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-lg">
      <div className="bg-[#14171B] dark:bg-[#05070A] p-6 min-w-[600px]">
        <h4 className="font-sans text-xs uppercase tracking-wider text-gray-400 mb-3">{title}</h4>
        <MathBlock math={formula} className="text-white text-lg" />
        
        {legend && (
          <div className="mt-4 border-t border-gray-800 pt-3">
            {typeof legend === 'string' ? (
              <p className="font-sans text-xs text-gray-400">{legend}</p>
            ) : (
              <div className="space-y-1">
                {legend.map((item, idx) => (
                  <div key={idx} className="font-mono text-xs text-gray-300 flex items-baseline gap-2">
                    <span className="text-[#A8672E] dark:text-[#D08F52] w-12 text-right">{item.label}</span>
                    <span className="text-gray-500">=</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {example && (
          <div className={legend ? "mt-6" : "mt-2"}>
            <h4 className="font-sans text-xs uppercase tracking-wider text-gray-400 mb-2">{example.label}</h4>
            <div className="border-l-2 border-[#A8672E] dark:border-[#D08F52] pl-4 space-y-1.5">
              {example.rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_20px_1fr] gap-2 items-baseline font-mono text-sm text-gray-300"
                >
                  <span>{row.label}</span>
                  <span className="text-[#A8672E] dark:text-[#D08F52]">=</span>
                  <span className="tabular-nums">{row.value}</span>
                </div>
              ))}
              <div className="grid grid-cols-[auto_20px_1fr] gap-2 items-baseline font-mono text-base font-bold text-white pt-1">
                <span>{example.result.label ?? ""}</span>
                <span className="text-[#A8672E] dark:text-[#D08F52]">=</span>
                <span className="tabular-nums text-[#A8672E] dark:text-[#D08F52]">{example.result.value}</span>
              </div>
            </div>
            {example.note && (
              <p className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-300">{example.note}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface LevelLadderPoint {
  label: string;
  value: string;
  /** 0–100, position along the track. */
  position: number;
  tone?: "neg" | "neutral" | "pos";
}

const toneDot: Record<NonNullable<LevelLadderPoint["tone"]>, string> = {
  neg: "bg-rose-500",
  neutral: "bg-slate-400 dark:bg-slate-500",
  pos: "bg-emerald-500",
};

/**
 * Horizontal marker track for 2-4 comparable numeric levels (support/resistance,
 * before/pivot/after). Plots the relationship directly instead of leaving the
 * reader to reconstruct it from prose or a plain list.
 */
export function LevelLadder({ points, caption }: { points: LevelLadderPoint[]; caption?: string }) {
  return (
    <div className="my-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm px-6 pt-6 pb-14">
        <div className="relative h-1 mx-2 rounded-full bg-gradient-to-r from-rose-400 via-slate-200 dark:via-slate-700 to-emerald-400">
          {points.map((point, i) => (
            <div
              key={i}
              className="absolute -top-1 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${point.position}%` }}
            >
              <span
                className={`w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 shadow ${toneDot[point.tone ?? "neutral"]}`}
              />
              <span className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 text-center leading-tight whitespace-nowrap">
                {point.label}
                <span className="block font-mono tabular-nums text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                  {point.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      {caption && <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-2 text-center">{caption}</p>}
    </div>
  );
}
