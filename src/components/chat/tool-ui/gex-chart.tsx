"use client";

// Renders spx_gex's `ui` envelope as a by-strike net GEX bar chart — same shape the site's own
// GEX tab already plots (see src/components/options/options-viewer.tsx's 'gex' tab).

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";

interface GexChartUi {
  component: "gex_chart";
  spot: number;
  expiration: string;
  total_net_gex_m: number;
  total_call_gex_m: number;
  total_put_gex_m: number;
  strikes: Array<{ strike: number; net_gex_m: number }>;
}

export function GexChart({ ui }: { ui: GexChartUi }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 my-2 max-w-md">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-serif font-semibold text-gray-900 dark:text-gray-100">SPX Net GEX</h4>
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">spot {ui.spot.toLocaleString()}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        exp {ui.expiration} · net {ui.total_net_gex_m.toFixed(1)}M
      </p>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ui.strikes} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-100 dark:stroke-gray-800" />
            <XAxis dataKey="strike" tick={{ fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} tickLine={false} width={40} />
            <Tooltip
              formatter={(v: number) => [`${v.toFixed(2)}M`, "net GEX"]}
              labelFormatter={(l) => `strike ${l}`}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <ReferenceLine x={ui.spot} strokeDasharray="2 2" stroke="#A8672E" />
            <Bar dataKey="net_gex_m">
              {ui.strikes.map((s, i) => (
                <Cell key={i} fill={s.net_gex_m >= 0 ? "#16a34a" : "#dc2626"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
