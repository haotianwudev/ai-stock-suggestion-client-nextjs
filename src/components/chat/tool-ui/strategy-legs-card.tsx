"use client";

// Renders build_strategy's `ui` envelope: legs table + a real payoff diagram + metrics. Feeds the
// client's own src/lib/options/payoff.ts directly — build_strategy emits legs in this exact
// OptionLeg shape by design (see sophie-pipeline/docs/SOPHIE_AGENT.md's Phase 2 section), so this
// is zero-conversion, not a reimplementation of the payoff math.

import { useMemo } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from "recharts";
import { legsPnL, findBreakevens, type OptionLeg } from "@/lib/options/payoff";
import { cn } from "@/lib/utils";

interface StrategyLegsUi {
  component: "strategy_legs";
  preset_id: string;
  expiration: string;
  dte: number;
  spot: number;
  backtested: boolean;
  legs: OptionLeg[];
  metrics: {
    net_credit: number;
    max_profit: number;
    max_loss: number;
    breakevens: number[];
    probability_of_profit: number;
    net_greeks: { delta: number; gamma: number; theta: number; vega: number };
  };
}

export function StrategyLegsCard({ ui }: { ui: StrategyLegsUi }) {
  const { legs, metrics, spot, preset_id, expiration, dte, backtested } = ui;

  const chartData = useMemo(() => {
    const lo = spot * 0.85;
    const hi = spot * 1.15;
    const steps = 60;
    const points = Array.from({ length: steps + 1 }, (_, i) => lo + ((hi - lo) * i) / steps);
    return points.map((price) => ({ price: Math.round(price), pnl: legsPnL(price, legs) }));
  }, [legs, spot]);

  const breakevens = useMemo(
    () => (metrics.breakevens.length ? metrics.breakevens : findBreakevens(chartData.map((d) => d.price), chartData.map((d) => d.pnl))),
    [chartData, metrics.breakevens]
  );

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 my-2 max-w-md">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-serif font-semibold text-gray-900 dark:text-gray-100">
          {preset_id.replace(/_/g, " ")}
        </h4>
        <span
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full",
            backtested
              ? "bg-[#A8672E]/10 text-[#A8672E] dark:bg-[#D08F52]/10 dark:text-[#D08F52]"
              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          )}
        >
          {backtested ? "backtested" : "conventional"}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        exp {expiration} (dte={dte}) · spot {spot.toLocaleString()}
      </p>

      <div className="h-40 -mx-1 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-100 dark:stroke-gray-800" />
            <XAxis dataKey="price" tick={{ fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} tickLine={false} width={40} />
            <Tooltip
              formatter={(v: number) => [`$${v.toFixed(0)}`, "P&L"]}
              labelFormatter={(l) => `spot ${l}`}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <ReferenceLine y={0} strokeDasharray="2 2" className="stroke-gray-300 dark:stroke-gray-700" />
            <ReferenceLine x={spot} strokeDasharray="2 2" stroke="#A8672E" />
            <Line type="monotone" dataKey="pnl" stroke="#A8672E" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <table className="w-full text-xs mb-3">
        <thead>
          <tr className="text-gray-400 dark:text-gray-500 text-left">
            <th className="font-normal pb-1">side</th>
            <th className="font-normal pb-1">type</th>
            <th className="font-normal pb-1 text-right">strike</th>
            <th className="font-normal pb-1 text-right">premium</th>
          </tr>
        </thead>
        <tbody>
          {legs.map((leg, i) => (
            <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
              <td className={cn("py-1", leg.side === "long" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
                {leg.side}
              </td>
              <td className="py-1 text-gray-700 dark:text-gray-300">{leg.type}</td>
              <td className="py-1 text-right font-mono text-gray-900 dark:text-gray-100">{leg.strike}</td>
              <td className="py-1 text-right font-mono text-gray-700 dark:text-gray-300">{leg.premium.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <Metric label="net credit" value={`$${metrics.net_credit.toFixed(2)}`} />
        <Metric label="max profit" value={`$${metrics.max_profit.toFixed(2)}`} />
        <Metric label="max loss" value={`$${metrics.max_loss.toFixed(2)}`} />
        <Metric label="POP" value={`${(metrics.probability_of_profit * 100).toFixed(0)}%`} />
        <Metric label="breakevens" value={breakevens.map((b) => b.toFixed(0)).join(" / ")} span />
      </div>
    </div>
  );
}

function Metric({ label, value, span }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? "col-span-2" : undefined}>
      <span className="text-gray-400 dark:text-gray-500">{label}: </span>
      <span className="font-mono text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}
