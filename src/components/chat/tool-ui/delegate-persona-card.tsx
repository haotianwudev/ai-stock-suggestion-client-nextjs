"use client";

// Renders the `delegate` / `delegate_parallel` tool calls (DelegationToolkit,
// sophie_agent/toolkits/delegate/toolkit.py) as a distinct persona card in the thread, rather
// than the generic ToolInspector JSON view — this is the visible "SOPHIE handed this off to a
// specialist" moment. Registered directly in chat-thread.tsx's TOOL_BY_NAME (bypassing
// tool-ui/index.ts's TOOL_UI + wrapToolUi path) because delegate/delegate_parallel return plain
// text, never the {text, ui} envelope every other custom card expects.
//
// Persona metadata (display name, icon) comes from ChatConfigContext.personas, fetched once from
// GET /agents — see docs/SOPHIE_AGENT.md's "Persona-per-delegation" section. A profile the
// frontend hasn't heard of yet (a new specialist added server-side) still renders sensibly via
// personaFor()'s fallback, so adding an agent profile never requires a frontend change here.

import { useContext, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { ChatConfigContext, type AgentPersona } from "../chat-thread";
import { cn } from "@/lib/utils";

const miniMarkdownComponents: Components = {
  p: ({ children }) => <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-1.5 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5 text-sm text-gray-700 dark:text-gray-300">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5 text-sm text-gray-700 dark:text-gray-300">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
  code: ({ children }) => (
    <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-xs">{children}</code>
  ),
};

function MiniMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={miniMarkdownComponents}>
      {text}
    </ReactMarkdown>
  );
}

function titleCase(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function personaFor(personas: Record<string, AgentPersona>, key?: string): AgentPersona {
  if (key && personas[key]) return personas[key];
  return { displayName: key ? titleCase(key) : "Specialist", icon: "🤖" };
}

function isRunningStatus(status: unknown): boolean {
  return typeof status === "object" && status !== null
    ? (status as { type?: string }).type === "running"
    : status === "running";
}

function parseArgs<T>(args: unknown, argsText: unknown, fallback: T): T {
  if (args && typeof args === "object") return args as T;
  if (typeof argsText === "string") {
    try {
      return JSON.parse(argsText) as T;
    } catch {
      // still streaming / incomplete JSON — fall through to fallback
    }
  }
  return fallback;
}

interface DelegateArgs {
  agent?: string;
  task?: string;
  context?: string;
}

export function DelegatePersonaCard(props: unknown) {
  const { args, argsText, result, status, isError } = props as {
    args?: unknown;
    argsText?: string;
    result?: unknown;
    status?: unknown;
    isError?: boolean;
  };
  const { personas } = useContext(ChatConfigContext);
  const [expanded, setExpanded] = useState(true);

  const parsedArgs = parseArgs<DelegateArgs>(args, argsText, {});
  const persona = personaFor(personas, parsedArgs.agent);
  const running = isRunningStatus(status);
  const resultText = typeof result === "string" ? result : result ? JSON.stringify(result) : "";

  return (
    <div
      className={cn(
        "rounded-xl border my-1.5 overflow-hidden text-xs",
        isError
          ? "border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20"
          : "border-[#A8672E]/25 dark:border-[#D08F52]/25 bg-[#FDFBF7] dark:bg-[#1A1712]"
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-base leading-none shrink-0">{persona.icon}</span>
        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 shrink-0">
          {persona.displayName}
        </span>
        {parsedArgs.task && (
          <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate flex-1">
            {parsedArgs.task}
          </span>
        )}
        {running ? (
          <Loader2 className="size-3.5 animate-spin text-[#A8672E] dark:text-[#D08F52] shrink-0 ml-auto" />
        ) : expanded ? (
          <ChevronDown className="size-3.5 text-gray-400 shrink-0 ml-auto" />
        ) : (
          <ChevronRight className="size-3.5 text-gray-400 shrink-0 ml-auto" />
        )}
      </button>
      {expanded && (
        <div className="px-3 pb-2.5 pt-0.5 border-t border-gray-100 dark:border-gray-800/60">
          {resultText ? (
            <MiniMarkdown text={resultText} />
          ) : (
            <p className="text-xs text-gray-400 italic py-1">{persona.displayName} is working…</p>
          )}
        </div>
      )}
    </div>
  );
}

interface DelegateParallelArgs {
  tasks?: DelegateArgs[];
}

// delegate_parallel's result joins per-task answers as "[agentKey] answer text" blocks separated
// by a blank line (DelegationToolkit.delegate_parallel in toolkit.py) — split back apart so each
// specialist's answer renders under its own persona rather than one undifferentiated blob.
function splitParallelResult(resultText: string): Array<{ agent?: string; text: string }> {
  if (!resultText) return [];
  return resultText.split(/\n\n(?=\[)/).map((block) => {
    const match = block.match(/^\[([^\]]+)\]\s*([\s\S]*)$/);
    return match ? { agent: match[1], text: match[2] } : { agent: undefined, text: block };
  });
}

export function DelegateParallelPersonaCard(props: unknown) {
  const { args, argsText, result, status, isError } = props as {
    args?: unknown;
    argsText?: string;
    result?: unknown;
    status?: unknown;
    isError?: boolean;
  };
  const { personas } = useContext(ChatConfigContext);
  const [expanded, setExpanded] = useState(true);

  const parsedArgs = parseArgs<DelegateParallelArgs>(args, argsText, {});
  const tasks = parsedArgs.tasks ?? [];
  const running = isRunningStatus(status);
  const resultText = typeof result === "string" ? result : "";
  const segments = splitParallelResult(resultText);

  return (
    <div
      className={cn(
        "rounded-xl border my-1.5 overflow-hidden text-xs",
        isError
          ? "border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20"
          : "border-[#A8672E]/25 dark:border-[#D08F52]/25 bg-[#FDFBF7] dark:bg-[#1A1712]"
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex -space-x-1 shrink-0">
          {tasks.map((t, i) => (
            <span key={i} className="text-base leading-none">
              {personaFor(personas, t.agent).icon}
            </span>
          ))}
        </div>
        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 shrink-0">
          {tasks.length || ""} specialists working together
        </span>
        {running ? (
          <Loader2 className="size-3.5 animate-spin text-[#A8672E] dark:text-[#D08F52] shrink-0 ml-auto" />
        ) : expanded ? (
          <ChevronDown className="size-3.5 text-gray-400 shrink-0 ml-auto" />
        ) : (
          <ChevronRight className="size-3.5 text-gray-400 shrink-0 ml-auto" />
        )}
      </button>
      {expanded && (
        <div className="px-3 pb-2.5 pt-0.5 border-t border-gray-100 dark:border-gray-800/60 space-y-2.5">
          {tasks.map((t, i) => {
            const persona = personaFor(personas, t.agent);
            const seg = segments.find((s) => s.agent === t.agent) ?? segments[i];
            return (
              <div key={i}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm leading-none">{persona.icon}</span>
                  <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                    {persona.displayName}
                  </span>
                  {t.task && (
                    <span className="text-[10px] text-gray-400 truncate">{t.task}</span>
                  )}
                </div>
                {seg?.text ? (
                  <MiniMarkdown text={seg.text} />
                ) : (
                  <p className="text-xs text-gray-400 italic py-0.5">working…</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
