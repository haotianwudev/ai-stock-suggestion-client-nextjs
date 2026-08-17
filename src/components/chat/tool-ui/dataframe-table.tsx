"use client";

// Generic fallback for any UI-enabled tool result that isn't a dedicated component below
// (list_strategy_presets, compare_strategy_variants) — renders whatever tabular rows the envelope
// carries. Never used for bulk chain/SQL/df_python results; those stay markdown+handle only.

interface TableUi {
  component: string;
  [key: string]: unknown;
}

function firstArrayField(ui: TableUi): Record<string, unknown>[] | null {
  for (const value of Object.values(ui)) {
    if (Array.isArray(value) && value.length && typeof value[0] === "object") {
      return value as Record<string, unknown>[];
    }
  }
  return null;
}

export function DataFrameTable({ ui }: { ui: TableUi }) {
  const rows = firstArrayField(ui);
  if (!rows) return null;
  const columns = Object.keys(rows[0]);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 my-2 max-w-md">
      <table className="min-w-full text-xs">
        <thead className="bg-gray-50 dark:bg-gray-800/80">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-2.5 py-1.5 text-left font-medium text-gray-700 dark:text-gray-300">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 20).map((row, i) => (
            <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
              {columns.map((c) => (
                <td key={c} className="px-2.5 py-1.5 font-mono text-gray-700 dark:text-gray-300">
                  {String(row[c] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
