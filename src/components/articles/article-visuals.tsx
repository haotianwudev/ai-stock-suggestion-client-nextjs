import { MathBlock } from "@/components/articles/math";

interface WorkedExample {
  label: string;
  rows: { label: string; value: string }[];
  result: { label?: string; value: string };
  note?: string;
}

interface FormulaPanelProps {
  title?: string;
  formula: string;
  legend?: string;
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
        {legend && <p className="font-sans text-xs text-gray-400 mt-2">{legend}</p>}

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
