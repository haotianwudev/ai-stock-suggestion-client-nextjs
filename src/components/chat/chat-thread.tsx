"use client";

// Wires assistant-ui's runtime to the local AG-UI server (never a Next.js route — see
// sophie-pipeline/docs/SOPHIE_AGENT.md's Phase 2 section for why there is no proxy here) and
// renders the thread using assistant-ui's low-level primitives, styled with Sophie's own design
// tokens rather than a prebuilt theme — this is the intended pattern for this version of the
// library (its ready-made components ship via the shadcn registry as owned source, not an import).

import { useMemo, type ComponentType } from "react";
import { HttpAgent } from "@ag-ui/client";
import { useAgUiRuntime } from "@assistant-ui/react-ag-ui";
import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  type ToolCallMessagePartComponent,
} from "@assistant-ui/react";
import { Send, Loader2, Wrench } from "lucide-react";
import { ChatMarkdown } from "./chat-markdown";
import { TOOL_UI, parseEnvelope } from "./tool-ui";
import { cn } from "@/lib/utils";

const AGENT_API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL ?? "http://localhost:8000";

const PROFILES = [
  { key: "generalist", label: "Generalist" },
  { key: "option_strategist", label: "Option Strategist" },
  { key: "quant", label: "Quant" },
  { key: "wiki_researcher", label: "Wiki Researcher" },
  { key: "supervisor", label: "Supervisor" },
] as const;

// `MessagePrimitive.Parts`'s `tools.by_name` map is the current, supported way to register
// per-tool renderers — `useAssistantToolUI`/`makeAssistantToolUI` are marked @deprecated in this
// version and, empirically, don't wire into the AG-UI runtime adapter (the hook call succeeds but
// the tool-call parts still render assistant-ui's default view). See docs/SOPHIE_AGENT.md's Phase
// 2 section.
function toolFallback(toolName: string, result: unknown) {
  const preview = typeof result === "string" ? result : result != null ? JSON.stringify(result) : "";
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500 my-1">
      <Wrench className="size-3" />
      <span>{toolName}</span>
      {preview && <span className="truncate max-w-[220px]">— {preview.slice(0, 80)}</span>}
    </div>
  );
}

// No envelope means either a bulk tool (chains/SQL/df_python — deliberately markdown+handle only,
// never given a UI here) or a tool still mid-run; toolFallback is the graceful default either way.
function wrapToolUi(Component: ComponentType<{ ui: any }>): ToolCallMessagePartComponent {
  return ({ toolName, result }) => {
    const envelope = parseEnvelope(result);
    return envelope ? <Component ui={envelope.ui} /> : toolFallback(toolName, result);
  };
}

const TOOL_BY_NAME: Record<string, ToolCallMessagePartComponent> = Object.fromEntries(
  Object.entries(TOOL_UI).map(([name, Component]) => [name, wrapToolUi(Component)])
);

const TOOL_FALLBACK: ToolCallMessagePartComponent = ({ toolName, result }) => toolFallback(toolName, result);

export function ChatThread({ profile, onProfileChange }: { profile: string; onProfileChange: (p: string) => void }) {
  const agent = useMemo(
    () => new HttpAgent({ url: `${AGENT_API_URL}/agent/${profile}` }),
    [profile]
  );
  const runtime = useAgUiRuntime({ agent });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
          {PROFILES.map((p) => (
            <button
              key={p.key}
              onClick={() => onProfileChange(p.key)}
              className={cn(
                "text-[11px] px-2 py-1 rounded-full whitespace-nowrap transition-colors",
                profile === p.key
                  ? "bg-[#A8672E] text-white dark:bg-[#D08F52]"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <ThreadPrimitive.Root className="flex-1 flex flex-col min-h-0">
          <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            <ThreadPrimitive.Empty>
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-8">
                Ask Sophie anything about the wiki, option strategies, or market data.
              </p>
            </ThreadPrimitive.Empty>
            <ThreadPrimitive.Messages
              components={{
                UserMessage: () => (
                  <MessagePrimitive.Root className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#A8672E] dark:bg-[#D08F52] text-white px-3 py-2 text-sm">
                      <MessagePrimitive.Content components={{ Text: () => <MessagePrimitive.Parts /> }} />
                    </div>
                  </MessagePrimitive.Root>
                ),
                AssistantMessage: () => (
                  <MessagePrimitive.Root className="flex justify-start">
                    <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2">
                      <MessagePrimitive.Parts components={{ Text: ChatMarkdown, tools: { by_name: TOOL_BY_NAME, Fallback: TOOL_FALLBACK } }} />
                    </div>
                  </MessagePrimitive.Root>
                ),
              }}
            />
          </ThreadPrimitive.Viewport>

          <ComposerPrimitive.Root className="flex items-end gap-2 border-t border-gray-100 dark:border-gray-800 p-2.5">
            <ComposerPrimitive.Input
              placeholder="Ask Sophie..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52]"
            />
            <ThreadPrimitive.If running={false}>
              <ComposerPrimitive.Send className="shrink-0 rounded-xl bg-[#A8672E] dark:bg-[#D08F52] text-white p-2 disabled:opacity-40">
                <Send className="size-4" />
              </ComposerPrimitive.Send>
            </ThreadPrimitive.If>
            <ThreadPrimitive.If running>
              <div className="shrink-0 rounded-xl p-2 text-[#A8672E] dark:text-[#D08F52]">
                <Loader2 className="size-4 animate-spin" />
              </div>
            </ThreadPrimitive.If>
          </ComposerPrimitive.Root>
        </ThreadPrimitive.Root>
      </div>
    </AssistantRuntimeProvider>
  );
}
