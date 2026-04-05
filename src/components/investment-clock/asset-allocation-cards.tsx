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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ALL_PHASES.map((p) => {
        const data = PHASE_DATA[p];
        const isActive = p === phase;
        const sectors = isActive && recommendedSectors && recommendedSectors.length > 0
          ? recommendedSectors
          : data.sectors;

        return (
          <Card
            key={p}
            className={`transition-all ${isActive ? `${data.bgColor} border-2` : "opacity-40"}`}
          >
            <CardHeader className="pb-2 pt-3 px-3">
              <div className="flex items-center justify-between">
                <CardTitle className={`text-sm font-semibold ${isActive ? data.color : ""}`}>
                  {p}
                </CardTitle>
                {isActive && (
                  <Badge variant="secondary" className="text-[10px] px-1 py-0">
                    NOW
                  </Badge>
                )}
              </div>
              <p className={`text-xs font-medium mt-1 ${isActive ? data.color : "text-muted-foreground"}`}>
                {data.bestAsset}
              </p>
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-2">
              <div className="flex flex-wrap gap-1">
                {data.etfs.map((etf) => (
                  <Badge key={etf} variant="outline" className="text-[10px] px-1.5 py-0">
                    {etf}
                  </Badge>
                ))}
              </div>

              {/* Active card: show ETF-level rationale if available, else sector names */}
              {isActive && data.etfs.some((etf) => rationaleMap[etf]) ? (
                <div className="space-y-2 pt-0.5">
                  {data.etfs.map((etf) =>
                    rationaleMap[etf] ? (
                      <div key={etf}>
                        <span className="text-[11px] font-semibold text-foreground">{etf}</span>
                        <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                          {rationaleMap[etf]}
                        </p>
                      </div>
                    ) : null
                  )}
                </div>
              ) : (
                <div className="space-y-0.5">
                  {sectors.map((s) => (
                    <p key={s} className="text-[11px] text-muted-foreground leading-tight">
                      · {s}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-[10px] text-muted-foreground/70 pt-1">
                Yield curve: {data.yieldCurve}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
