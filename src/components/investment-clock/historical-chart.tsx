"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { InvestmentClockDataPoint } from "@/lib/graphql/types";

interface HistoricalChartProps {
  history: InvestmentClockDataPoint[];
}

const PHASE_COLOR: Record<string, string> = {
  Recovery: "#16a34a",
  Overheat: "#dc2626",
  Stagflation: "#d97706",
  Reflation: "#2563eb",
};

const PHASE_BG: Record<string, string> = {
  Recovery: "#16a34a",
  Overheat: "#dc2626",
  Stagflation: "#d97706",
  Reflation: "#2563eb",
};

interface ChartRow {
  month: string;
  bizDate: string;
  growthZScore: number;
  inflationZScore: number;
  dataPhase: string;
}

interface PhaseSegment {
  x1: string;
  x2: string;
  phase: string;
}

function buildPhaseSegments(rows: ChartRow[]): PhaseSegment[] {
  const segments: PhaseSegment[] = [];
  for (const row of rows) {
    const last = segments[segments.length - 1];
    if (last && last.phase === row.dataPhase) {
      last.x2 = row.month;
    } else {
      segments.push({ x1: row.month, x2: row.month, phase: row.dataPhase });
    }
  }
  return segments;
}

/**
 * Indices worth a dot. Over a 10-year window a dot per month collides with its
 * neighbours on two overlapping series, so mark only the months that say something:
 * where the phase turned over, plus the latest reading. Short windows keep every dot.
 */
function markedIndices(rows: ChartRow[]): Set<number> {
  if (rows.length <= 36) return new Set(rows.map((_, i) => i));
  const marks = new Set<number>();
  rows.forEach((row, i) => {
    if (i === 0 || row.dataPhase !== rows[i - 1].dataPhase) marks.add(i);
  });
  marks.add(rows.length - 1);
  return marks;
}

function PhaseDot(props: {
  cx?: number;
  cy?: number;
  payload?: ChartRow;
  index?: number;
  rowCount: number;
  marks: Set<number>;
}) {
  const { cx, cy, payload, index, rowCount, marks } = props;
  if (cx == null || cy == null || !payload || index == null) return null;
  const isLatest = index === rowCount - 1;
  if (!isLatest && !marks.has(index)) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={isLatest ? 4.5 : 2.5}
      fill={PHASE_COLOR[payload.dataPhase] ?? "#94a3b8"}
      stroke="#fff"
      strokeWidth={isLatest ? 1.5 : 0.6}
    />
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const row: ChartRow = payload[0].payload;
  return (
    <div className="bg-background border border-border rounded-md px-3 py-2 text-xs shadow-lg">
      <div className="flex items-center justify-between gap-4 mb-1">
        <span className="font-mono font-semibold">{label}</span>
        <span className="font-semibold" style={{ color: PHASE_COLOR[row.dataPhase] }}>
          {row.dataPhase}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 text-green-600">
        <span>Growth Z</span>
        <span className="font-mono">{row.growthZScore >= 0 ? "+" : ""}{row.growthZScore.toFixed(3)}</span>
      </div>
      <div className="flex items-center justify-between gap-4 text-orange-500">
        <span>Inflation Z</span>
        <span className="font-mono">{row.inflationZScore >= 0 ? "+" : ""}{row.inflationZScore.toFixed(3)}</span>
      </div>
    </div>
  );
}

export function HistoricalChart({ history }: HistoricalChartProps) {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  if (history.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-sm text-muted-foreground">
        No historical data yet
      </div>
    );
  }

  const rows: ChartRow[] = history.map((d) => ({
    month: d.bizDate.slice(0, 7),
    bizDate: d.bizDate,
    growthZScore: Number(d.growthZScore.toFixed(3)),
    inflationZScore: Number(d.inflationZScore.toFixed(3)),
    dataPhase: d.dataPhase,
  }));

  const segments = buildPhaseSegments(rows);
  const marks = markedIndices(rows);

  return (
    <div className="space-y-3">
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
            {segments.map((seg, i) => (
              <ReferenceArea
                key={`${seg.phase}-${seg.x1}-${i}`}
                x1={seg.x1}
                x2={seg.x2}
                fill={PHASE_BG[seg.phase] ?? "#94a3b8"}
                fillOpacity={hoveredPhase == null || hoveredPhase === seg.phase ? 0.08 : 0.02}
                stroke="none"
                ifOverflow="visible"
              />
            ))}
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={44}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={34}
            />
            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="growthZScore"
              name="Growth Z"
              stroke="#16a34a"
              strokeWidth={2}
              dot={({ cx, cy, payload, index }: any) => (
                <PhaseDot
                  key={`g-${index}`}
                  cx={cx}
                  cy={cy}
                  payload={payload}
                  index={index}
                  rowCount={rows.length}
                  marks={marks}
                />
              )}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="inflationZScore"
              name="Inflation Z"
              stroke="#d97706"
              strokeWidth={2}
              dot={({ cx, cy, payload, index }: any) => (
                <PhaseDot
                  key={`i-${index}`}
                  cx={cx}
                  cy={cy}
                  payload={payload}
                  index={index}
                  rowCount={rows.length}
                  marks={marks}
                />
              )}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend: lines + phase color key */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: "#16a34a" }} />
          <span className="text-muted-foreground">Growth Z-Score</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: "#d97706" }} />
          <span className="text-muted-foreground">Inflation Z-Score</span>
        </div>
        <span className="text-muted-foreground/50">|</span>
        {Object.entries(PHASE_COLOR).map(([phase, color]) => (
          <button
            key={phase}
            type="button"
            className="flex items-center gap-1.5 cursor-pointer"
            onMouseEnter={() => setHoveredPhase(phase)}
            onMouseLeave={() => setHoveredPhase(null)}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-muted-foreground">{phase}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
