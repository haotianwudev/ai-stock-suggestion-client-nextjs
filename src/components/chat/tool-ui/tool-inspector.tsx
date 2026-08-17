"use client";

import { useState } from "react";
import {
  Wrench,
  Database,
  Terminal,
  BookOpen,
  Layers,
  Users,
  LineChart,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { parseEnvelope } from "./envelope";
import { cn } from "@/lib/utils";

export interface ToolInspectorProps {
  toolName: string;
  args?: unknown;
  argsText?: string;
  result?: unknown;
  isError?: boolean;
  status?: { type?: string; reason?: string } | string;
  forceVerbose?: boolean;
  hasCustomCard?: boolean;
}

function getToolIcon(toolName: string) {
  const name = toolName.toLowerCase();
  if (name.includes("sql")) return Database;
  if (name.includes("python") || name.includes("df")) return Terminal;
  if (name.includes("chain") || name.includes("gex") || name.includes("option")) return LineChart;
  if (name.includes("wiki")) return BookOpen;
  if (name.includes("strategy") || name.includes("preset")) return Layers;
  if (name.includes("delegate")) return Users;
  return Wrench;
}

function formatPayload(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") {
    // If string is JSON, pretty-print it
    try {
      const parsed = JSON.parse(value);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return value;
    }
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function ToolInspector({
  toolName,
  args,
  argsText,
  result,
  isError,
  status,
  forceVerbose = false,
  hasCustomCard = false,
}: ToolInspectorProps) {
  const [expanded, setExpanded] = useState(forceVerbose);
  const [copiedSection, setCopiedSection] = useState<"args" | "result" | null>(null);

  const Icon = getToolIcon(toolName);

  // Extract parsed arguments
  let parsedArgs: unknown = args;
  if (!parsedArgs && argsText) {
    try {
      parsedArgs = JSON.parse(argsText);
    } catch {
      parsedArgs = argsText;
    }
  }

  // Format arguments string
  const argsString = formatPayload(parsedArgs);

  // Determine result content & text
  const envelope = parseEnvelope(result);
  const rawResultString = envelope ? envelope.text : formatPayload(result);

  // Status computation
  const isRunning = typeof status === "object" ? status?.type === "running" : status === "running";
  const isComplete = !isRunning && (result != null || status === "complete");

  const copyToClipboard = (text: string, section: "args" | "result") => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Extract a 1-line argument summary for the header chip
  let argsSummary = "";
  if (parsedArgs && typeof parsedArgs === "object") {
    const entries = Object.entries(parsedArgs as Record<string, unknown>);
    if (entries.length > 0) {
      const [k, v] = entries[0];
      const strVal = typeof v === "string" ? v : JSON.stringify(v);
      argsSummary = `${k}=${strVal.length > 40 ? strVal.slice(0, 37) + "..." : strVal}`;
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border transition-all my-1.5 overflow-hidden text-xs",
        isError
          ? "border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20"
          : hasCustomCard
          ? "border-amber-200/70 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10"
          : "border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80"
      )}
    >
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-left transition-colors select-none",
          "hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
        )}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div
            className={cn(
              "p-1 rounded-md shrink-0",
              isError
                ? "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
                : "bg-gray-200/80 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            )}
          >
            <Icon className="size-3.5" />
          </div>

          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
              {toolName}
            </span>
            {argsSummary && (
              <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                ({argsSummary})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {isRunning && (
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              <Loader2 className="size-3 animate-spin" />
              Running
            </span>
          )}
          {isComplete && !isError && (
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="size-3" />
              {hasCustomCard ? "Rendered UI" : "Done"}
            </span>
          )}
          {isError && (
            <span className="inline-flex items-center gap-1 text-[10px] text-red-600 dark:text-red-400 font-medium">
              <AlertCircle className="size-3" />
              Failed
            </span>
          )}

          <div className="text-gray-400 dark:text-gray-500">
            {expanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          </div>
        </div>
      </button>

      {/* Expanded Inspector Panel */}
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-100 dark:border-gray-800/80 space-y-2.5">
          {/* Arguments Section */}
          {argsString && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                <span>Arguments (Input)</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(argsString, "args");
                  }}
                  className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  {copiedSection === "args" ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-2 rounded-lg bg-gray-100 dark:bg-gray-950 font-mono text-[11px] text-gray-800 dark:text-gray-200 overflow-x-auto max-h-48 whitespace-pre-wrap break-all leading-relaxed">
                {argsString}
              </pre>
            </div>
          )}

          {/* Result / Output Section */}
          {rawResultString ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                <span>Result (Tool Output)</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(rawResultString, "result");
                  }}
                  className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  {copiedSection === "result" ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-2 rounded-lg bg-gray-100 dark:bg-gray-950 font-mono text-[11px] text-gray-800 dark:text-gray-200 overflow-x-auto max-h-60 whitespace-pre-wrap break-all leading-relaxed">
                {rawResultString}
              </pre>
            </div>
          ) : (
            <div className="text-[11px] text-gray-400 italic py-1">
              {isRunning ? "Waiting for tool execution to complete..." : "No output returned."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
