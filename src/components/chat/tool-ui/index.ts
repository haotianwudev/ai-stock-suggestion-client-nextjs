// Tool -> UI component registry. Adding a component is a data edit: add the tool name here.
// Any tool not listed (or whose result doesn't parse as the {text, ui} envelope) falls back to
// plain markdown text — see chat-thread.tsx's tool-part renderer.

import type { ComponentType } from "react";
import { StrategyLegsCard } from "./strategy-legs-card";
import { WikiCitationList } from "./wiki-citation-list";
import { GexChart } from "./gex-chart";
import { DataFrameTable } from "./dataframe-table";

export { parseEnvelope, type ToolUiEnvelope } from "./envelope";
export { ToolInspector, type ToolInspectorProps } from "./tool-inspector";

export const TOOL_UI: Record<string, ComponentType<{ ui: any }>> = {
  build_strategy: StrategyLegsCard,
  spx_gex: GexChart,
  wiki_search: WikiCitationList,
  compare_strategy_variants: DataFrameTable,
  list_strategy_presets: DataFrameTable,
};
