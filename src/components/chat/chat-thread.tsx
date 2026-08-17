"use client";

// Wires assistant-ui's runtime to the local AG-UI server (never a Next.js route — see
// sophie-pipeline/docs/SOPHIE_AGENT.md's Phase 2 section for why there is no proxy here) and
// renders the thread using assistant-ui's low-level primitives, styled with Sophie's own design
// tokens rather than a prebuilt theme.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
} from "react";
import { HttpAgent } from "@ag-ui/client";
import { useAgUiRuntime } from "@assistant-ui/react-ag-ui";
import {
  AssistantRuntimeProvider,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  type ToolCallMessagePartComponent,
} from "@assistant-ui/react";
import { Send, Loader2, Code2, Check } from "lucide-react";
import { ChatMarkdown } from "./chat-markdown";
import { TOOL_UI, parseEnvelope, ToolInspector } from "./tool-ui";
import { DelegatePersonaCard, DelegateParallelPersonaCard } from "./tool-ui/delegate-persona-card";
import { ModelSelector } from "./model-selector";
import { cn } from "@/lib/utils";

const AGENT_API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL ?? "http://localhost:8000";

// The chat always talks to SOPHIE (the `supervisor` profile, core/profiles.py) — she plans and
// delegates to specialist agents (option strategist, quant, ...) herself via the delegate/
// delegate_parallel tools rather than the user manually picking a profile chip. See
// docs/SOPHIE_AGENT.md's "Persona-per-delegation" section for the full design.
const SOPHIE_PROFILE = "supervisor";
const SOPHIE_DEFAULT_MODEL = "deepseek-chat";
const SOPHIE_DEFAULT_PROVIDER = "DeepSeek";

export interface AgentPersona {
  displayName: string;
  icon: string;
  description?: string;
}

interface ChatConfig {
  verbose: boolean;
  setVerbose: (v: boolean | ((prev: boolean) => boolean)) => void;
  selectedModel: string;
  setSelectedModel: (m: string) => void;
  selectedProvider: string;
  setSelectedProvider: (p: string) => void;
  personas: Record<string, AgentPersona>;
  sophiePersona: AgentPersona;
}

const DEFAULT_SOPHIE_PERSONA: AgentPersona = { displayName: "Sophie", icon: "✨" };

export const ChatConfigContext = createContext<ChatConfig>({
  verbose: false,
  setVerbose: () => {},
  selectedModel: "",
  setSelectedModel: () => {},
  selectedProvider: "",
  setSelectedProvider: () => {},
  personas: {},
  sophiePersona: DEFAULT_SOPHIE_PERSONA,
});

function wrapToolUi(Component: ComponentType<{ ui: any }>): ToolCallMessagePartComponent {
  return (props) => {
    const { toolName, result, args, argsText, isError, status } = props as any;
    const { verbose } = useContext(ChatConfigContext);
    const envelope = parseEnvelope(result);

    if (envelope) {
      return (
        <div className="space-y-1.5 my-1.5">
          <Component ui={envelope.ui} />
          {verbose && (
            <ToolInspector
              toolName={toolName}
              args={args}
              argsText={argsText}
              result={result}
              isError={isError}
              status={status}
              forceVerbose={true}
              hasCustomCard={true}
            />
          )}
        </div>
      );
    }

    return (
      <ToolInspector
        toolName={toolName}
        args={args}
        argsText={argsText}
        result={result}
        isError={isError}
        status={status}
        forceVerbose={verbose}
      />
    );
  };
}

const TOOL_BY_NAME: Record<string, ToolCallMessagePartComponent> = {
  ...Object.fromEntries(Object.entries(TOOL_UI).map(([name, Component]) => [name, wrapToolUi(Component)])),
  // delegate/delegate_parallel return plain text (a specialist's final answer), never the
  // {text, ui} envelope wrapToolUi()/parseEnvelope() expect, so they're registered directly
  // rather than routed through the TOOL_UI/wrapToolUi path every other custom card uses.
  delegate: DelegatePersonaCard as ToolCallMessagePartComponent,
  delegate_parallel: DelegateParallelPersonaCard as ToolCallMessagePartComponent,
};

const TOOL_FALLBACK: ToolCallMessagePartComponent = (props) => {
  const { toolName, result, args, argsText, isError, status } = props as any;
  const { verbose } = useContext(ChatConfigContext);
  return (
    <ToolInspector
      toolName={toolName}
      args={args}
      argsText={argsText}
      result={result}
      isError={isError}
      status={status}
      forceVerbose={verbose}
    />
  );
};

export function ChatThread() {
  const [personas, setPersonas] = useState<Record<string, AgentPersona>>({});
  const [sophiePersona, setSophiePersona] = useState<AgentPersona>(DEFAULT_SOPHIE_PERSONA);

  useEffect(() => {
    let cancelled = false;
    fetch(`${AGENT_API_URL}/agents`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const list = Array.isArray(data.agents) ? data.agents : [];
        setPersonas(
          Object.fromEntries(
            list.map((a: { key: string; displayName: string; icon: string; description?: string }) => [
              a.key,
              { displayName: a.displayName, icon: a.icon, description: a.description },
            ])
          )
        );
        if (data.supervisor?.displayName) {
          setSophiePersona({ displayName: data.supervisor.displayName, icon: data.supervisor.icon ?? "✨" });
        }
      })
      .catch(() => {
        // Best-effort — DelegatePersonaCard's personaFor() fallback covers an empty registry.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [selectedModel, setSelectedModel] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sophie_agent_model") || "";
    }
    return "";
  });

  const [selectedProvider, setSelectedProvider] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sophie_agent_provider") || "";
    }
    return "";
  });

  const [verbose, setVerbose] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sophie_agent_verbose") === "true";
    }
    return false;
  });

  const handleModelChange = (model: string, provider: string) => {
    setSelectedModel(model);
    setSelectedProvider(provider);
    if (typeof window !== "undefined") {
      localStorage.setItem("sophie_agent_model", model);
      localStorage.setItem("sophie_agent_provider", provider);
    }
  };

  const handleToggleVerbose = () => {
    setVerbose((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("sophie_agent_verbose", String(next));
      }
      return next;
    });
  };

  const agentUrl = useMemo(() => {
    const url = new URL(`${AGENT_API_URL}/agent/${SOPHIE_PROFILE}`);
    if (selectedModel) {
      url.searchParams.set("model", selectedModel);
    }
    if (selectedProvider) {
      url.searchParams.set("provider", selectedProvider);
    }
    return url.toString();
  }, [selectedModel, selectedProvider]);

  const agent = useMemo(() => new HttpAgent({ url: agentUrl }), [agentUrl]);
  const runtime = useAgUiRuntime({ agent });

  const configValue = useMemo(
    () => ({
      verbose,
      setVerbose,
      selectedModel,
      setSelectedModel,
      selectedProvider,
      setSelectedProvider,
      personas,
      sophiePersona,
    }),
    [verbose, selectedModel, selectedProvider, personas, sophiePersona]
  );

  return (
    <ChatConfigContext.Provider value={configValue}>
      <AssistantRuntimeProvider runtime={runtime}>
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
          {/* Controls Bar: Model Selector & Verbose Toggle. No profile chips — the chat always
              talks to SOPHIE, who delegates to specialists herself; see DelegatePersonaCard. */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 bg-[#FDFBF7]/60 dark:bg-[#121110]/60 p-2 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-base leading-none">{sophiePersona.icon}</span>
              <span className="font-serif font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">
                {sophiePersona.displayName}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <ModelSelector
                selectedModel={selectedModel}
                selectedProvider={selectedProvider}
                onModelChange={handleModelChange}
                profileDefaultModel={SOPHIE_DEFAULT_MODEL}
                profileDefaultProvider={SOPHIE_DEFAULT_PROVIDER}
              />

              <button
                type="button"
                onClick={handleToggleVerbose}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all select-none",
                  verbose
                    ? "bg-[#A8672E]/10 border-[#A8672E]/30 text-[#A8672E] dark:bg-[#D08F52]/15 dark:border-[#D08F52]/40 dark:text-[#D08F52] shadow-xs"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
                title="Toggle verbose mode to view full tool execution details & raw outputs"
              >
                <Code2 className="size-3.5" />
                <span>Verbose</span>
                {verbose && <Check className="size-3 ml-0.5 text-[#A8672E] dark:text-[#D08F52]" />}
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <ThreadPrimitive.Root className="flex-1 flex flex-col min-h-0">
            <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3.5">
              <ThreadPrimitive.Empty>
                <div className="text-center mt-10 space-y-2 px-4">
                  <p className="font-serif text-base font-semibold text-gray-700 dark:text-gray-300">
                    How can Sophie help you today?
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Ask about option strategy pricing, backtest evidence, live SPX chains, or
                    macroeconomic wiki concepts.
                  </p>
                </div>
              </ThreadPrimitive.Empty>
              <ThreadPrimitive.Messages
                components={{
                  UserMessage: () => (
                    <MessagePrimitive.Root className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#A8672E] dark:bg-[#D08F52] text-white px-3.5 py-2.5 text-sm shadow-xs">
                        <MessagePrimitive.Content components={{ Text: () => <MessagePrimitive.Parts /> }} />
                      </div>
                    </MessagePrimitive.Root>
                  ),
                  AssistantMessage: () => (
                    <MessagePrimitive.Root className="flex justify-start">
                      <div className="max-w-[94%] rounded-2xl rounded-bl-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm shadow-xs space-y-2">
                        <MessagePrimitive.Parts
                          components={{
                            Text: ChatMarkdown,
                            tools: { by_name: TOOL_BY_NAME, Fallback: TOOL_FALLBACK },
                          }}
                        />
                      </div>
                    </MessagePrimitive.Root>
                  ),
                }}
              />
            </ThreadPrimitive.Viewport>

            {/* Input Composer */}
            <ComposerPrimitive.Root className="flex items-end gap-2 border-t border-gray-100 dark:border-gray-800 p-3 bg-[#FDFBF7]/40 dark:bg-[#121110]/40 shrink-0">
              <ComposerPrimitive.Input
                placeholder="Ask Sophie..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52]"
              />
              <ThreadPrimitive.If running={false}>
                <ComposerPrimitive.Send className="shrink-0 rounded-xl bg-[#A8672E] dark:bg-[#D08F52] text-white p-2.5 shadow-xs hover:opacity-90 disabled:opacity-40 transition-opacity">
                  <Send className="size-4" />
                </ComposerPrimitive.Send>
              </ThreadPrimitive.If>
              <ThreadPrimitive.If running>
                <div className="shrink-0 rounded-xl p-2.5 text-[#A8672E] dark:text-[#D08F52]">
                  <Loader2 className="size-4 animate-spin" />
                </div>
              </ThreadPrimitive.If>
            </ComposerPrimitive.Root>
          </ThreadPrimitive.Root>
        </div>
      </AssistantRuntimeProvider>
    </ChatConfigContext.Provider>
  );
}
