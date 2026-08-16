import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectorRationale } from "@/lib/graphql/types";

interface AssetAllocationCardsProps {
  phase: string;
  bestAsset?: string;
  recommendedSectors?: string[];
  sectorRationale?: SectorRationale[];
}

const PHASE_DATA: Record<string, {
  color: string;
  bgColor: string;
  bestAsset: string;
  etfs: string[];
  sectors: string[];
  yieldCurve: string;
}> = {
  Reflation: {
    color: "text-blue-500",
    bgColor: "border-blue-500/30 bg-blue-500/5",
    bestAsset: "Government Bonds",
    etfs: ["IYF", "IYK", "IYC"],
    sectors: ["Financials", "Consumer Staples", "Consumer Discretionary"],
    yieldCurve: "Steepening",
  },
  Recovery: {
    color: "text-green-500",
    bgColor: "border-green-500/30 bg-green-500/5",
    bestAsset: "Equities",
    etfs: ["IYW", "IYZ", "IYM"],
    sectors: ["Technology", "Telecom", "Materials"],
    yieldCurve: "Normalizing",
  },
  Overheat: {
    color: "text-red-500",
    bgColor: "border-red-500/30 bg-red-500/5",
    bestAsset: "Commodities",
    etfs: ["IYE", "IYJ", "IYM"],
    sectors: ["Energy", "Industrials", "Materials"],
    yieldCurve: "Flattening",
  },
  Stagflation: {
    color: "text-yellow-500",
    bgColor: "border-yellow-500/30 bg-yellow-500/5",
    bestAsset: "Cash / Equivalents",
    etfs: ["IDU", "IYH", "IYK"],
    sectors: ["Utilities", "Healthcare", "Consumer Staples"],
    yieldCurve: "Inverting / Flat",
  },
};

const ALL_PHASES = ["Reflation", "Recovery", "Overheat", "Stagflation"] as const;

export function AssetAllocationCards({ phase, recommendedSectors, sectorRationale }: AssetAllocationCardsProps) {
  const rationaleMap = Object.fromEntries((sectorRationale ?? []).map((r) => [r.etf, r.rationale]));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ALL_PHASES.map((p) => {
        const data = PHASE_DATA[p];
        const isActive = p === phase;
        const sectors = isActive && recommendedSectors && recommendedSectors.length > 0
          ? recommendedSectors
          : data.sectors;

        return (
          <div
            key={p}
            className={`rounded-2xl border transition-all p-4 flex flex-col justify-between ${
              isActive
                ? "bg-white dark:bg-gray-900 border-[#A8672E] dark:border-[#D08F52] shadow-md ring-2 ring-[#A8672E]/20"
                : "bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 opacity-60 hover:opacity-90"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-bold font-serif ${isActive ? "text-[#A8672E] dark:text-[#D08F52]" : "text-gray-900 dark:text-gray-100"}`}>
                  {p}
                </span>
                {isActive && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] border border-[#A8672E]/30">
                    CURRENT
                  </span>
                )}
              </div>

              <div className="mb-3">
                <p className="text-xs text-muted-foreground">Optimal Asset:</p>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">{data.bestAsset}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {data.etfs.map((etf) => (
                  <span
                    key={etf}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                      isActive
                        ? "bg-[#A8672E]/5 border-[#A8672E]/20 text-[#A8672E] dark:text-[#D08F52]"
                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-muted-foreground"
                    }`}
                  >
                    {etf}
                  </span>
                ))}
              </div>

              {/* Active card: show ETF-level rationale if available, else sector names */}
              {isActive && data.etfs.some((etf) => rationaleMap[etf]) ? (
                <div className="space-y-2 pt-1 border-t border-gray-100 dark:border-gray-800">
                  {data.etfs.map((etf) =>
                    rationaleMap[etf] ? (
                      <div key={etf} className="text-xs">
                        <span className="font-semibold text-foreground">{etf}</span>
                        <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                          {rationaleMap[etf]}
                        </p>
                      </div>
                    ) : null
                  )}
                </div>
              ) : (
                <div className="space-y-1 pt-1 border-t border-gray-100 dark:border-gray-800">
                  {sectors.map((s) => (
                    <p key={s} className="text-xs text-muted-foreground leading-tight">
                      • {s}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <p className="text-[10px] text-muted-foreground/70 pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
              Yield curve: <span className="font-medium text-foreground">{data.yieldCurve}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
