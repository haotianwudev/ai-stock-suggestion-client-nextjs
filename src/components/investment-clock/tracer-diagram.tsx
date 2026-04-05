"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { InvestmentClockDataPoint } from "@/lib/graphql/types";

interface TracerDiagramProps {
  history: InvestmentClockDataPoint[];
  hoveredIndex?: number | null;
  onHoverIndex?: (i: number | null) => void;
}

const PHASE_COLOR: Record<string, string> = {
  Recovery:    "#16a34a",
  Overheat:    "#dc2626",
  Stagflation: "#d97706",
  Reflation:   "#2563eb",
};

const PHASE_BG: Record<string, string> = {
  Recovery:    "#bbf7d0",
  Overheat:    "#fecaca",
  Stagflation: "#fde68a",
  Reflation:   "#bfdbfe",
};

const VW = 420;
const VH = 340;

export function TracerDiagram({ history, hoveredIndex, onHoverIndex }: TracerDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  // Use a ref so D3 event handlers always call the latest callback without
  // needing to re-run the expensive drawing effect.
  const onHoverIndexRef = useRef(onHoverIndex);
  useEffect(() => { onHoverIndexRef.current = onHoverIndex; }, [onHoverIndex]);

  // ── Main drawing effect (runs when history changes) ───────────────────────
  useEffect(() => {
    if (!svgRef.current || history.length === 0) return;

    const margin = { top: 24, right: 28, bottom: 44, left: 52 };
    const innerW = VW - margin.left - margin.right;
    const innerH = VH - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // ── Defs ────────────────────────────────────────────────────────────
    const defs = svg.append("defs");

    Object.entries(PHASE_COLOR).forEach(([phase, color]) => {
      defs.append("marker")
        .attr("id", `arrow-${phase}`)
        .attr("markerWidth", 6).attr("markerHeight", 6)
        .attr("refX", 5).attr("refY", 3)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,0 L0,6 L6,3 z")
        .attr("fill", color);
    });

    const pulseFilter = defs.append("filter").attr("id", "pulse-glow")
      .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    pulseFilter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "blur");
    const pm = pulseFilter.append("feMerge");
    pm.append("feMergeNode").attr("in", "blur");
    pm.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // ── Scales ───────────────────────────────────────────────────────────
    const allGrowth    = history.map((d) => d.growthZScore);
    const allInflation = history.map((d) => d.inflationZScore);
    const pad = 0.4;

    const xScale = d3.scaleLinear()
      .domain([
        Math.min(d3.min(allInflation)! - pad, -pad),
        Math.max(d3.max(allInflation)! + pad,  pad),
      ])
      .range([0, innerW]);

    const yScale = d3.scaleLinear()
      .domain([
        Math.min(d3.min(allGrowth)! - pad, -pad),
        Math.max(d3.max(allGrowth)! + pad,  pad),
      ])
      .range([innerH, 0]);

    const x0 = xScale(0);
    const y0 = yScale(0);

    // ── Quadrant backgrounds ─────────────────────────────────────────────
    const quadrants = [
      { x: 0,  y: 0,  w: x0,          h: y0,            phase: "Recovery"    }, // upper-left
      { x: x0, y: 0,  w: innerW - x0, h: y0,            phase: "Overheat"    }, // upper-right
      { x: x0, y: y0, w: innerW - x0, h: innerH - y0,   phase: "Stagflation" }, // lower-right
      { x: 0,  y: y0, w: x0,          h: innerH - y0,   phase: "Reflation"   }, // lower-left
    ];

    quadrants.forEach(({ x, y, w, h, phase }) => {
      g.append("rect")
        .attr("x", x).attr("y", y).attr("width", w).attr("height", h)
        .attr("fill", PHASE_BG[phase])
        .attr("opacity", 0.35);

      g.append("text")
        .attr("x", x + w / 2).attr("y", y + h / 2)
        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
        .attr("fill", PHASE_COLOR[phase])
        .attr("font-size", 11).attr("font-weight", "700")
        .attr("opacity", 0.55)
        .text(phase.toUpperCase());
    });

    // ── Crosshair axes ───────────────────────────────────────────────────
    g.append("line")
      .attr("x1", 0).attr("y1", y0).attr("x2", innerW).attr("y2", y0)
      .attr("stroke", "#94a3b8").attr("stroke-width", 1).attr("stroke-dasharray", "4,3");
    g.append("line")
      .attr("x1", x0).attr("y1", 0).attr("x2", x0).attr("y2", innerH)
      .attr("stroke", "#94a3b8").attr("stroke-width", 1).attr("stroke-dasharray", "4,3");

    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).ticks(4).tickSize(4))
      .call((a) => a.select(".domain").attr("stroke", "#e2e8f0"))
      .call((a) => a.selectAll("text").attr("font-size", 10).attr("fill", "#94a3b8"))
      .call((a) => a.selectAll(".tick line").attr("stroke", "#e2e8f0"));

    g.append("g")
      .call(d3.axisLeft(yScale).ticks(4).tickSize(4))
      .call((a) => a.select(".domain").attr("stroke", "#e2e8f0"))
      .call((a) => a.selectAll("text").attr("font-size", 10).attr("fill", "#94a3b8"))
      .call((a) => a.selectAll(".tick line").attr("stroke", "#e2e8f0"));

    g.append("text")
      .attr("x", innerW / 2).attr("y", innerH + 36)
      .attr("text-anchor", "middle").attr("fill", "#64748b")
      .attr("font-size", 11).attr("font-weight", "600")
      .text("Inflation Z-Score →");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2).attr("y", -40)
      .attr("text-anchor", "middle").attr("fill", "#64748b")
      .attr("font-size", 11).attr("font-weight", "600")
      .text("Growth Z-Score →");

    // ── Phase-colored trail ───────────────────────────────────────────────
    for (let i = 1; i < history.length; i++) {
      const prev = history[i - 1];
      const curr = history[i];
      const opacity = 0.25 + (i / history.length) * 0.75;
      const color = PHASE_COLOR[curr.dataPhase] ?? "#94a3b8";
      const isLast = i === history.length - 1;

      g.append("line")
        .attr("x1", xScale(prev.inflationZScore))
        .attr("y1", yScale(prev.growthZScore))
        .attr("x2", xScale(curr.inflationZScore))
        .attr("y2", yScale(curr.growthZScore))
        .attr("stroke", color)
        .attr("stroke-width", isLast ? 2.5 : 1.8)
        .attr("stroke-linecap", "round")
        .attr("opacity", opacity)
        .attr("marker-end", isLast ? `url(#arrow-${curr.dataPhase})` : null);
    }

    // ── History dots ─────────────────────────────────────────────────────
    const labelFromIdx = history.length - 6;

    history.slice(0, -1).forEach((d, i) => {
      const opacity = 0.25 + (i / history.length) * 0.6;
      const cx = xScale(d.inflationZScore);
      const cy = yScale(d.growthZScore);
      const color = PHASE_COLOR[d.dataPhase] ?? "#94a3b8";

      g.append("circle")
        .attr("cx", cx).attr("cy", cy).attr("r", 4)
        .attr("fill", color).attr("opacity", opacity)
        .attr("stroke", "#fff").attr("stroke-width", 0.8)
        .attr("cursor", "pointer")
        .attr("data-dot", "history")
        .attr("data-idx", i)
        .on("mouseenter", function (event) {
          d3.select(this).attr("r", 7).attr("stroke-width", 2);
          const rect = svgRef.current!.getBoundingClientRect();
          setTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            content: `${d.bizDate.slice(0, 7)}  ${d.dataPhase}\nGrowth: ${d.growthZScore >= 0 ? "+" : ""}${d.growthZScore.toFixed(3)}   Inflation: ${d.inflationZScore >= 0 ? "+" : ""}${d.inflationZScore.toFixed(3)}`,
          });
          onHoverIndexRef.current?.(i);
        })
        .on("mouseleave", function () {
          d3.select(this).attr("r", 4).attr("stroke-width", 0.8);
          setTooltip(null);
          onHoverIndexRef.current?.(null);
        });

      if (i >= labelFromIdx) {
        const labelAbove = cy > innerH / 2;
        g.append("text")
          .attr("x", cx + 5).attr("y", labelAbove ? cy - 7 : cy + 14)
          .attr("font-size", 9).attr("fill", color).attr("font-weight", "600")
          .attr("opacity", 0.85)
          .text(d.bizDate.slice(0, 7));
      }
    });

    // ── Current point (pulsing) ───────────────────────────────────────────
    const latest = history[history.length - 1];
    const lx = xScale(latest.inflationZScore);
    const ly = yScale(latest.growthZScore);
    const lColor = PHASE_COLOR[latest.dataPhase] ?? "#94a3b8";
    const latestIdx = history.length - 1;

    const pulseRing = g.append("circle")
      .attr("cx", lx).attr("cy", ly).attr("r", 10)
      .attr("fill", "none").attr("stroke", lColor).attr("stroke-width", 2)
      .attr("opacity", 0.6)
      .attr("filter", "url(#pulse-glow)");

    pulseRing.append("animate")
      .attr("attributeName", "r").attr("values", "8;16;8").attr("dur", "2s").attr("repeatCount", "indefinite");
    pulseRing.append("animate")
      .attr("attributeName", "opacity").attr("values", "0.7;0;0.7").attr("dur", "2s").attr("repeatCount", "indefinite");

    g.append("circle")
      .attr("cx", lx).attr("cy", ly).attr("r", 7)
      .attr("fill", lColor).attr("stroke", "#fff").attr("stroke-width", 2)
      .attr("cursor", "pointer")
      .attr("data-dot", "latest")
      .attr("data-idx", latestIdx)
      .on("mouseenter", function (event) {
        d3.select(this).attr("r", 10).attr("stroke-width", 2.5);
        const rect = svgRef.current!.getBoundingClientRect();
        setTooltip({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          content: `${latest.bizDate.slice(0, 7)}  ${latest.dataPhase}  ← NOW\nGrowth: ${latest.growthZScore >= 0 ? "+" : ""}${latest.growthZScore.toFixed(3)}   Inflation: ${latest.inflationZScore >= 0 ? "+" : ""}${latest.inflationZScore.toFixed(3)}`,
        });
        onHoverIndexRef.current?.(latestIdx);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("r", 7).attr("stroke-width", 2);
        setTooltip(null);
        onHoverIndexRef.current?.(null);
      });

    g.append("text")
      .attr("x", lx + 10).attr("y", ly - 8)
      .attr("font-size", 10).attr("fill", lColor).attr("font-weight", "700")
      .text(`${latest.bizDate.slice(0, 7)} ◀ NOW`);

  }, [history]);

  // ── Highlight effect (runs when hoveredIndex changes from table) ──────────
  useEffect(() => {
    if (!svgRef.current || history.length === 0) return;
    const svg = d3.select(svgRef.current);

    // Reset all dots to base size
    svg.selectAll<SVGCircleElement, unknown>("circle[data-dot='history']")
      .attr("r", 4).attr("stroke-width", 0.8);
    svg.select("circle[data-dot='latest']")
      .attr("r", 7).attr("stroke-width", 2);

    if (hoveredIndex == null) return;

    const isLatest = hoveredIndex === history.length - 1;
    svg.select(`circle[data-idx="${hoveredIndex}"]`)
      .attr("r", isLatest ? 10 : 7)
      .attr("stroke-width", 2.5);
  }, [hoveredIndex, history.length]);

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full text-foreground"
        style={{ height: "auto" }}
      />
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 bg-background border border-border rounded-md px-2.5 py-1.5 text-xs whitespace-pre leading-relaxed shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y - 12 }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
