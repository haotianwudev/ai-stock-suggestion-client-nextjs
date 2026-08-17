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
import { ModelSelector } from "./model-selector";
import { cn } from "@/lib/utils";

const AGENT_API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL ?? "http://localhost:8000";

interface ChatConfig {
  verbose: boolean;
  setVerbose: (v: boolean | ((prev: boolean) => boolean)) => void;
  selectedModel: string;
  setSelectedModel: (m: string) => void;
  selectedProvider: string;
  setSelectedProvider: (p: string) => void;
}

export const ChatConfigContext = createContext<ChatConfig>({
  verbose: false,
  setVerbose: () => {},
  selectedModel: "",
  setSelectedModel: () => {},
  selectedProvider: "",
  setSelectedProvider: () => {},
});

const PROFILES = [
  { key: "generalist", label: "Generalist", defaultModel: "deepseek-chat", defaultProvider: "DeepSeek" },
  { key: "option_strategist", label: "Option Strategist", defaultModel: "deepseek-chat", defaultProvider: "DeepSeek" },
  { key: "quant", label: "Quant", defaultModel: "deepseek-chat", defaultProvider: "DeepSeek" },
  { key: "wiki_researcher", label: "Wiki Researcher", defaultModel: "qwen3.5:latest", defaultProvider: "Ollama" },
  { key: "supervisor", label: "Supervisor", defaultModel: "deepseek-chat", defaultProvider: "DeepSeek" },
] as const;

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

const TOOL_BY_NAME: Record<string, ToolCallMessagePartComponent> = Object.fromEntries(
  Object.entries(TOOL_UI).map(([name, Component]) => [name, wrapToolUi(Component)])
);

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

export function ChatThread({
  profile,
  onProfileChange,
}: {
  profile: string;
  onProfileChange: (p: string) => void;
}) {
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

  const activeProfileInfo = PROFILES.find((p) => p.key === profile) || PROFILES[0];

  const agentUrl = useMemo(() => {
    const url = new URL(`${AGENT_API_URL}/agent/${profile}`);
    if (selectedModel) {
      url.searchParams.set("model", selectedModel);
    }
    if (selectedProvider) {
      url.searchParams.set("provider", selectedProvider);
    }
    return url.toString();
  }, [profile, selectedModel, selectedProvider]);

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
    }),
    [verbose, selectedModel, selectedProvider]
  );

  return (
    <ChatConfigContext.Provider value={configValue}>
      <AssistantRuntimeProvider runtime={runtime}>
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
          {/* Controls Bar: Profiles, Model Selector & Verbose Toggle */}
          <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 bg-[#FDFBF7]/60 dark:bg-[#121110]/60 p-2 gap-2 shrink-0">
            {/* Top row: Model selector dropdown + Verbose toggle */}
            <div className="flex items-center justify-between gap-2">
              <ModelSelector
                selectedModel={selectedModel}
                selectedProvider={selectedProvider}
                onModelChange={handleModelChange}
                profileDefaultModel={activeProfileInfo.defaultModel}
                profileDefaultProvider={activeProfileInfo.defaultProvider}
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

            {/* Bottom row: Profile Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {PROFILES.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => onProfileChange(p.key)}
                  className={cn(
                    "text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors select-none font-medium",
                    profile === p.key
                      ? "bg-[#A8672E] text-white dark:bg-[#D08F52] shadow-xs"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-700/80"
                  )}
                >
                  {p.label}
                </button>
              ))}
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
