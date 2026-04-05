"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ClockFaceProps {
  clockAngle: number;
  phase: string;
  size?: number;
}

const PHASES = [
  {
    name: "Recovery",
    startAngle: -Math.PI / 2,
    endAngle: 0,
    color: "#16a34a",
    colorLight: "#bbf7d0",
    label: "RECOVERY",
    asset: "Equities",
  },
  {
    name: "Overheat",
    startAngle: 0,
    endAngle: Math.PI / 2,
    color: "#dc2626",
    colorLight: "#fecaca",
    label: "OVERHEAT",
    asset: "Commodities",
  },
  {
    name: "Stagflation",
    startAngle: Math.PI / 2,
    endAngle: Math.PI,
    color: "#d97706",
    colorLight: "#fde68a",
    label: "STAGFLATION",
    asset: "Cash",
  },
  {
    name: "Reflation",
    startAngle: Math.PI,
    endAngle: (3 * Math.PI) / 2,
    color: "#2563eb",
    colorLight: "#bfdbfe",
    label: "REFLATION",
    asset: "Gov Bonds",
  },
];

export function ClockFace({ clockAngle, phase, size = 320 }: ClockFaceProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const cx      = size / 2;
    const cy      = size / 2;
    const outerR  = size * 0.42;
    const innerR  = size * 0.17;
    const labelR  = size * 0.305;
    const bezelR  = size * 0.46;
    const tickInR = size * 0.425;

    const activePhase = PHASES.find((p) => p.name === phase);

    // ── Defs ──────────────────────────────────────────────────────────────
    const defs = svg.append("defs");

    // Gradient per phase (light → vivid, inner to outer)
    PHASES.forEach((p) => {
      const gr = defs.append("linearGradient")
        .attr("id", `grad-${p.name}`)
        .attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%");
      gr.append("stop").attr("offset", "0%")  .attr("stop-color", p.colorLight);
      gr.append("stop").attr("offset", "100%").attr("stop-color", p.color);
    });

    // Glow filter (active arc)
    const glow = defs.append("filter")
      .attr("id", "arc-glow").attr("x", "-40%").attr("y", "-40%").attr("width", "180%").attr("height", "180%");
    glow.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "blur");
    const fm = glow.append("feMerge");
    fm.append("feMergeNode").attr("in", "blur");
    fm.append("feMergeNode").attr("in", "SourceGraphic");

    // Hand drop shadow
    const hs = defs.append("filter").attr("id", "hand-shadow");
    hs.append("feDropShadow")
      .attr("dx", "0").attr("dy", "1.5")
      .attr("stdDeviation", "2")
      .attr("flood-color", "rgba(0,0,0,0.25)");

    // ── Background circle ─────────────────────────────────────────────────
    const g = svg.append("g").attr("transform", `translate(${cx},${cy})`);

    // Outer bezel (light ring)
    g.append("circle").attr("r", bezelR)
      .attr("fill", "#f8fafc")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", size * 0.022);

    // Inner track background
    g.append("circle").attr("r", outerR + 2)
      .attr("fill", "#f1f5f9");

    // ── Tick marks ────────────────────────────────────────────────────────
    const tickOutR = bezelR - size * 0.008;
    for (let i = 0; i < 48; i++) {
      const angle   = (i / 48) * 2 * Math.PI - Math.PI / 2;
      const isMajor = i % 4 === 0;
      const inR     = isMajor ? tickInR - size * 0.022 : tickInR;
      g.append("line")
        .attr("x1", Math.cos(angle) * inR)
        .attr("y1", Math.sin(angle) * inR)
        .attr("x2", Math.cos(angle) * tickOutR)
        .attr("y2", Math.sin(angle) * tickOutR)
        .attr("stroke", isMajor ? "#64748b" : "#cbd5e1")
        .attr("stroke-width", isMajor ? 1.5 : 0.8)
        .attr("stroke-linecap", "round");
    }

    // ── Quadrant arcs ─────────────────────────────────────────────────────
    const arc = d3.arc<{ startAngle: number; endAngle: number }>()
      .innerRadius(innerR + 3)
      .outerRadius(outerR)
      .padAngle(0.022)
      .cornerRadius(5);

    PHASES.forEach((p) => {
      const isActive = p.name === phase;

      // Glow halo for active
      if (isActive) {
        const haloArc = d3.arc<{ startAngle: number; endAngle: number }>()
          .innerRadius(innerR)
          .outerRadius(outerR + size * 0.022)
          .padAngle(0.012)
          .cornerRadius(7);
        g.append("path")
          .datum({ startAngle: p.startAngle, endAngle: p.endAngle })
          .attr("d", haloArc)
          .attr("fill", p.color)
          .attr("opacity", 0.18)
          .attr("filter", "url(#arc-glow)");
      }

      g.append("path")
        .datum({ startAngle: p.startAngle, endAngle: p.endAngle })
        .attr("d", arc)
        .attr("fill", isActive ? `url(#grad-${p.name})` : p.colorLight)
        .attr("opacity", isActive ? 1 : 0.7)
        .attr("stroke", isActive ? p.color : "#e2e8f0")
        .attr("stroke-width", isActive ? 1.5 : 0.5);
    });

    // ── Phase labels ──────────────────────────────────────────────────────
    PHASES.forEach((p) => {
      const mid  = (p.startAngle + p.endAngle) / 2;
      const lx   = Math.sin(mid) * labelR;
      const ly   = -Math.cos(mid) * labelR;
      const isActive = p.name === phase;
      const textColor = isActive ? "#ffffff" : p.color;
      const subColor  = isActive ? "rgba(255,255,255,0.85)" : "#64748b";

      g.append("text")
        .attr("x", lx).attr("y", ly - size * 0.036)
        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
        .attr("fill", textColor)
        .attr("font-size", isActive ? size * 0.058 : size * 0.046)
        .attr("font-weight", isActive ? "800" : "600")
        .attr("letter-spacing", "0.04em")
        .text(p.label);

      g.append("text")
        .attr("x", lx).attr("y", ly + size * 0.033)
        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
        .attr("fill", subColor)
        .attr("font-size", size * 0.036)
        .attr("font-weight", "500")
        .text(p.asset);
    });

    // ── Axis labels ───────────────────────────────────────────────────────
    const axisR    = outerR + size * 0.057;
    const axisFont = size * 0.044;

    [
      { x: 0,       y: -axisR,             anchor: "middle", baseline: "auto",    text: "Growth ▲" },
      { x: 0,       y:  axisR + size*0.02, anchor: "middle", baseline: "hanging", text: "Growth ▼" },
      { x:  axisR,  y:  0,                 anchor: "start",  baseline: "middle",  text: "CPI ▲"   },
      { x: -axisR,  y:  0,                 anchor: "end",    baseline: "middle",  text: "CPI ▼"   },
    ].forEach(({ x, y, anchor, baseline, text }) => {
      g.append("text")
        .attr("x", x).attr("y", y)
        .attr("text-anchor", anchor)
        .attr("dominant-baseline", baseline)
        .attr("fill", "#374151")
        .attr("font-size", axisFont)
        .attr("font-weight", "700")
        .text(text);
    });

    // ── Center hub ────────────────────────────────────────────────────────
    g.append("circle").attr("r", innerR)
      .attr("fill", "#ffffff")
      .attr("stroke", activePhase?.color ?? "#94a3b8")
      .attr("stroke-width", 2);

    g.append("circle").attr("r", innerR - size * 0.025)
      .attr("fill", "none")
      .attr("stroke", activePhase?.colorLight ?? "#e2e8f0")
      .attr("stroke-width", 1);

    g.append("text")
      .attr("x", 0).attr("y", 0)
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("fill", activePhase?.color ?? "#374151")
      .attr("font-size", size * 0.048)
      .attr("font-weight", "700")
      .text(phase);

    // ── Clock hand ────────────────────────────────────────────────────────
    const handAngleRad = ((clockAngle - 90) * Math.PI) / 180;
    const handLen = outerR - size * 0.018;
    const baseW   = size * 0.015;

    const perpX = -Math.sin(handAngleRad) * baseW;
    const perpY =  Math.cos(handAngleRad) * baseW;
    const tipX  =  Math.cos(handAngleRad) * handLen;
    const tipY  =  Math.sin(handAngleRad) * handLen;

    const handG = g.append("g").attr("filter", "url(#hand-shadow)");

    // Main hand body
    handG.append("polygon")
      .attr("points", `${perpX},${perpY} ${-perpX},${-perpY} ${tipX},${tipY}`)
      .attr("fill", "#1e293b")
      .attr("opacity", 0.9);

    // Counter-tail
    handG.append("line")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", -Math.cos(handAngleRad) * size * 0.055)
      .attr("y2", -Math.sin(handAngleRad) * size * 0.055)
      .attr("stroke", "#64748b")
      .attr("stroke-width", baseW * 0.85)
      .attr("stroke-linecap", "round");

    // Tip dot (phase-colored)
    handG.append("circle")
      .attr("cx", tipX).attr("cy", tipY)
      .attr("r", size * 0.016)
      .attr("fill", activePhase?.color ?? "#1e293b")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5);

    // Center pivot
    g.append("circle").attr("r", size * 0.03)
      .attr("fill", "#1e293b")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2);
    g.append("circle").attr("r", size * 0.012)
      .attr("fill", "#ffffff");

  }, [clockAngle, phase, size]);

  const pad = Math.round(size * 0.12);
  return (
    <svg
      ref={svgRef}
      viewBox={`-${pad} -${pad} ${size + pad * 2} ${size + pad * 2}`}
      className="mx-auto drop-shadow-md w-full h-auto"
    />
  );
}
