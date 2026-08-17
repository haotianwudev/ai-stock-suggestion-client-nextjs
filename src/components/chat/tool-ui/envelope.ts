// Mirrors sophie-pipeline/src/sophie_agent/toolkits/ui_envelope.py's `{text, ui}` JSON shape.
// Tools without a UI-enabled envelope (bulk chain/SQL/df_python results) return plain strings —
// parsing must degrade gracefully to "no UI, just text" rather than throwing.
//
// `result` arrives as EITHER a raw JSON string (that's what the Python tool actually returns, and
// what a raw curl against the AG-UI SSE stream shows in TOOL_CALL_RESULT.content) OR an
// already-parsed object — assistant-ui's AG-UI adapter auto-JSON-parses tool result strings that
// look like JSON before handing them to tool-part renderers. Confirmed empirically via a
// browser-console debug pass (see docs/SOPHIE_AGENT.md's Phase 2 section) after the object case
// silently fell through to `null` here and no card ever rendered. Handle both.

export interface ToolUiEnvelope<T = Record<string, unknown>> {
  text: string;
  ui: { component: string } & T;
}

function isEnvelopeShaped(value: unknown): value is ToolUiEnvelope {
  return !!value && typeof value === "object" && "ui" in (value as object) && "text" in (value as object);
}

export function parseEnvelope<T = Record<string, unknown>>(
  result: unknown
): ToolUiEnvelope<T> | null {
  if (isEnvelopeShaped(result)) return result as ToolUiEnvelope<T>;
  if (typeof result !== "string") return null;
  try {
    const parsed = JSON.parse(result);
    if (isEnvelopeShaped(parsed)) return parsed as ToolUiEnvelope<T>;
  } catch {
    // Not JSON — a plain-text tool result (chains, SQL, df_python). Expected, not an error.
  }
  return null;
}
