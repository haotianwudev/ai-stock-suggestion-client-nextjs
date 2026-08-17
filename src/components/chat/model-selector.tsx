"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, Cpu, Cloud, Check, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const AGENT_API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL ?? "http://localhost:8000";

export interface ModelItem {
  model_name: string;
  display_name: string;
  provider: string;
  supports_tool_calling: boolean;
  is_pulled?: boolean;
}

interface ModelsResponse {
  ollama: ModelItem[];
  remote: ModelItem[];
  default: { model_name: string; provider: string };
}

// The agent server's GET /models (sophie_agent/server/server.py) returns a flat
// { models: [{ name, provider, displayName, supportsToolCalling, isLocal, pulled }],
//   defaultModel, defaultProvider } — camelCase, ungrouped. This component's render logic
// (and its FALLBACK_MODELS) is built around the grouped { ollama, remote, default } /
// snake_case ModelItem shape instead, so the raw fetch response must be normalized before
// it goes into state. Without this, `data.ollama`/`data.remote` are undefined on the real
// response, silently emptying both lists down to just "Profile Default" in the dropdown.
function normalizeModelsResponse(raw: unknown): ModelsResponse {
  const list = Array.isArray((raw as { models?: unknown })?.models)
    ? ((raw as { models: Record<string, unknown>[] }).models)
    : [];
  const toItem = (m: Record<string, unknown>): ModelItem => ({
    model_name: String(m.name ?? ""),
    display_name: String(m.displayName ?? m.name ?? ""),
    provider: String(m.provider ?? ""),
    supports_tool_calling: !!m.supportsToolCalling,
    is_pulled: m.pulled === undefined ? undefined : !!m.pulled,
  });
  return {
    ollama: list.filter((m) => m.isLocal).map(toItem),
    remote: list.filter((m) => !m.isLocal).map(toItem),
    default: {
      model_name: String((raw as { defaultModel?: unknown })?.defaultModel ?? FALLBACK_MODELS.default.model_name),
      provider: String((raw as { defaultProvider?: unknown })?.defaultProvider ?? FALLBACK_MODELS.default.provider),
    },
  };
}

const FALLBACK_MODELS: ModelsResponse = {
  ollama: [
    { model_name: "qwen3.5:latest", display_name: "qwen3.5:latest (local)", provider: "Ollama", supports_tool_calling: true, is_pulled: true },
    { model_name: "gemma4:12b", display_name: "gemma4:12b (local)", provider: "Ollama", supports_tool_calling: true, is_pulled: true },
    { model_name: "deepseek-r1:14b", display_name: "deepseek-r1:14b (local)", provider: "Ollama", supports_tool_calling: false, is_pulled: true },
    { model_name: "llama3.1:latest", display_name: "llama3.1:latest", provider: "Ollama", supports_tool_calling: true, is_pulled: false },
  ],
  remote: [
    { model_name: "deepseek-chat", display_name: "DeepSeek Chat (deepseek-chat)", provider: "DeepSeek", supports_tool_calling: true },
    { model_name: "claude-3-5-sonnet-latest", display_name: "Claude 3.5 Sonnet", provider: "Anthropic", supports_tool_calling: true },
    { model_name: "claude-3-7-sonnet-latest", display_name: "Claude 3.7 Sonnet", provider: "Anthropic", supports_tool_calling: true },
    { model_name: "gpt-4o", display_name: "OpenAI GPT-4o", provider: "OpenAI", supports_tool_calling: true },
    { model_name: "gemini-2.0-flash", display_name: "Gemini 2.0 Flash", provider: "Gemini", supports_tool_calling: true },
  ],
  default: { model_name: "deepseek-chat", provider: "DeepSeek" },
};

interface ModelSelectorProps {
  selectedModel: string; // "" means profile default
  selectedProvider: string;
  onModelChange: (model: string, provider: string) => void;
  profileDefaultModel?: string;
  profileDefaultProvider?: string;
}

export function ModelSelector({
  selectedModel,
  selectedProvider,
  onModelChange,
  profileDefaultModel = "deepseek-chat",
  profileDefaultProvider = "DeepSeek",
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [modelsData, setModelsData] = useState<ModelsResponse>(FALLBACK_MODELS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${AGENT_API_URL}/models`);
      if (res.ok) {
        const data = await res.json();
        setModelsData(normalizeModelsResponse(data));
      }
    } catch {
      // Fallback silently if server offline
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  // Current active label
  const isDefault = !selectedModel;
  const currentDisplayName = isDefault
    ? `Profile Default (${profileDefaultModel})`
    : selectedModel;

  const currentIsLocal = isDefault
    ? profileDefaultProvider?.toLowerCase() === "ollama"
    : selectedProvider?.toLowerCase() === "ollama";

  // Filter models
  const filterFn = (m: ModelItem) =>
    !search ||
    m.model_name.toLowerCase().includes(search.toLowerCase()) ||
    m.display_name.toLowerCase().includes(search.toLowerCase()) ||
    m.provider.toLowerCase().includes(search.toLowerCase());

  const filteredOllama = (modelsData.ollama || []).filter(filterFn);
  const filteredRemote = (modelsData.remote || []).filter(filterFn);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-colors",
          "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
          open && "ring-1 ring-[#A8672E] dark:ring-[#D08F52]"
        )}
        title="Select LLM model"
      >
        {currentIsLocal ? (
          <Cpu className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
        ) : (
          <Cloud className="size-3 text-blue-600 dark:text-blue-400 shrink-0" />
        )}

        <span className="font-mono text-[11px] font-medium max-w-[150px] truncate">
          {currentDisplayName}
        </span>

        <ChevronDown className="size-3 text-gray-400 shrink-0" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-72 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-hidden flex flex-col text-xs">
          {/* Header & Search */}
          <div className="p-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/70 space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-[11px] uppercase tracking-wider">
                Select Model
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fetchModels();
                }}
                disabled={loading}
                className="p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                title="Refresh models from Ollama daemon"
              >
                <RefreshCw className={cn("size-3", loading && "animate-spin text-[#A8672E]")} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[#A8672E] text-gray-800 dark:text-gray-200"
              autoFocus
            />
          </div>

          {/* List of Models */}
          <div className="max-h-64 overflow-y-auto p-1.5 space-y-2">
            {/* Option 0: Profile Default */}
            <div>
              <button
                type="button"
                onClick={() => {
                  onModelChange("", "");
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors",
                  isDefault
                    ? "bg-[#A8672E]/10 text-[#A8672E] dark:bg-[#D08F52]/15 dark:text-[#D08F52] font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Sparkles className="size-3.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-[11px] truncate">
                      Profile Default ({profileDefaultModel})
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500">
                      Managed per specialist profile
                    </div>
                  </div>
                </div>
                {isDefault && <Check className="size-3.5 shrink-0" />}
              </button>
            </div>

            {/* Group 1: Ollama Local Models */}
            {filteredOllama.length > 0 && (
              <div className="space-y-1">
                <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <Cpu className="size-3" />
                  <span>Ollama (Local Models)</span>
                </div>
                {filteredOllama.map((m) => {
                  const isSelected = !isDefault && selectedModel === m.model_name;
                  return (
                    <button
                      key={`ollama-${m.model_name}`}
                      type="button"
                      onClick={() => {
                        onModelChange(m.model_name, "Ollama");
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors",
                        isSelected
                          ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[11px] font-medium truncate flex items-center gap-1.5">
                            <span>{m.model_name}</span>
                            {m.is_pulled && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-sans">
                                pulled
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            {m.supports_tool_calling ? (
                              <span className="text-emerald-600 dark:text-emerald-400">
                                Tool calling supported
                              </span>
                            ) : (
                              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                                <AlertCircle className="size-2.5" />
                                No tools (reasoning / chat only)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="size-3.5 shrink-0 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Group 2: Cloud Models */}
            {filteredRemote.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-gray-100 dark:border-gray-800">
                <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1">
                  <Cloud className="size-3" />
                  <span>Cloud API Models</span>
                </div>
                {filteredRemote.map((m) => {
                  const isSelected = !isDefault && selectedModel === m.model_name;
                  return (
                    <button
                      key={`remote-${m.model_name}`}
                      type="button"
                      onClick={() => {
                        onModelChange(m.model_name, m.provider);
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors",
                        isSelected
                          ? "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 font-semibold"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[11px] font-medium truncate">
                            {m.model_name}
                          </div>
                          <div className="text-[10px] text-gray-400 dark:text-gray-500">
                            {m.provider}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="size-3.5 shrink-0 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
