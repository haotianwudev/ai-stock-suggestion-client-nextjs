'use client';

import { ExternalLink, Terminal, Command, AlertTriangle, Database, Server, Cpu, FileCode, Code, Layers, ShieldAlert, Zap, Activity } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const SLUG = 'claude-code-financial-cheatsheet-enterprise-reference';

const Box = ({ color, icon: Icon, title, subtitle, children }: {
  color: string; icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string; subtitle: string; children: React.ReactNode;
}) => {
  const colorMap: Record<string, string> = {
    blue: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 dark:bg-blue-950/20 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52]/50 text-blue-900 dark:text-[#A8672E] dark:text-[#D08F52] text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900/50 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]",
    cyan: "bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-500 dark:border-cyan-500/50 text-cyan-900 dark:text-cyan-400 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900/50 text-cyan-600 dark:text-cyan-400",
    rose: "bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 dark:bg-rose-950/20 border-[#BC4128] dark:border-[#E2694A] dark:border-[#BC4128] dark:border-[#E2694A]/50 text-rose-900 dark:text-[#BC4128] dark:text-[#E2694A] text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900/50 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]",
    fuchsia: "bg-fuchsia-50/50 dark:bg-fuchsia-950/20 border-fuchsia-500 dark:border-fuchsia-500/50 text-fuchsia-900 dark:text-fuchsia-400 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-900/50 text-fuchsia-600 dark:text-fuchsia-400",
    emerald: "bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/50 dark:bg-emerald-950/20 border-[#1D8A70] dark:border-[#3CBF9C] dark:border-[#1D8A70] dark:border-[#3CBF9C]/50 text-emerald-900 dark:text-[#1D8A70] dark:text-[#3CBF9C] text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]",
    purple: "bg-purple-50/50 dark:bg-purple-950/20 border-purple-500 dark:border-purple-500/50 text-purple-900 dark:text-purple-400 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-900/50 text-purple-600 dark:text-purple-400",
    teal: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 dark:bg-teal-950/20 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52]/50 text-teal-900 dark:text-[#A8672E] dark:text-[#D08F52] text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-900/50 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]",
    amber: "bg-amber-50/50 dark:bg-amber-950/20 border-amber-500 dark:border-amber-500/50 text-amber-900 dark:text-amber-400 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400",
    indigo: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 dark:bg-indigo-950/20 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52]/50 text-indigo-900 dark:text-[#A8672E] dark:text-[#D08F52] text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/50 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]",
    slate: "bg-slate-50 dark:bg-[#14171B]/50 dark:bg-slate-900 border-slate-500 dark:border-slate-500/50 text-slate-900 dark:text-slate-200 text-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
  };
  const c = colorMap[color] || colorMap.blue;
  const classes = c.split(' ');
  return (
    <div className={`${classes[0]} ${classes[1]} border-t-4 ${classes[2]} ${classes[3]} rounded-xl p-6 shadow-sm border-l border-r border-b`}>
      <h2 className={`text-xl font-bold ${classes[4]} ${classes[5]} mb-2 flex items-center gap-2`}>
        <Icon size={22} className={`${classes[10]} ${classes[11]}`} /> {title}
      </h2>
      <p className={`text-sm ${classes[6]} ${classes[7]} mb-4 border-b ${classes[8]} ${classes[9]} pb-2`}>{subtitle}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

const Card = ({ title, children, color = 'blue' }: { title: string; children: React.ReactNode; color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: "border-blue-100 dark:border-blue-900/50 text-blue-900 dark:text-[#A8672E] dark:text-[#D08F52]",
    cyan: "border-cyan-100 dark:border-cyan-900/50 text-cyan-900 dark:text-cyan-400",
    rose: "border-rose-100 dark:border-rose-900/50 text-rose-900 dark:text-[#BC4128] dark:text-[#E2694A]",
    fuchsia: "border-fuchsia-100 dark:border-fuchsia-900/50 text-fuchsia-900 dark:text-fuchsia-400",
    emerald: "border-emerald-100 dark:border-emerald-900/50 text-emerald-900 dark:text-[#1D8A70] dark:text-[#3CBF9C]",
    purple: "border-purple-100 dark:border-purple-900/50 text-purple-900 dark:text-purple-400",
    teal: "border-teal-100 dark:border-teal-900/50 text-teal-900 dark:text-[#A8672E] dark:text-[#D08F52]",
    amber: "border-amber-100 dark:border-amber-900/50 text-amber-900 dark:text-amber-400",
    indigo: "border-indigo-100 dark:border-indigo-900/50 text-indigo-900 dark:text-[#A8672E] dark:text-[#D08F52]",
    slate: "border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200",
  };
  const c = colorMap[color] || colorMap.blue;
  const classes = c.split(' ');
  return (
    <div className={`bg-white dark:bg-[#14171B] p-4 rounded-lg border ${classes[0]} ${classes[1]} shadow-sm`}>
      <h3 className={`font-bold ${classes[2]} ${classes[3]} text-sm mb-2`}>{title}</h3>
      {children}
    </div>
  );
};

const CodeSnip = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: "text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]",
    cyan: "text-cyan-700 dark:text-cyan-400",
    rose: "text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]",
    fuchsia: "text-fuchsia-700 dark:text-fuchsia-400",
    emerald: "text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]",
    purple: "text-purple-700 dark:text-purple-400",
    teal: "text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]",
    amber: "text-amber-700 dark:text-amber-400",
    indigo: "text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]",
    slate: "text-slate-700 dark:text-slate-400",
  };
  return (
    <code className={`${colorMap[color] || colorMap.blue} font-bold font-mono text-xs block mb-1 bg-slate-50 dark:bg-black/50 p-1.5 rounded border border-black/5 dark:border-white/5`}>{children}</code>
  );
};

const DarkCode = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: "text-blue-300",
    cyan: "text-cyan-300",
    rose: "text-rose-300",
    fuchsia: "text-fuchsia-300",
    emerald: "text-emerald-300",
    purple: "text-purple-300",
    teal: "text-teal-300",
    amber: "text-amber-300",
    indigo: "text-indigo-300",
    slate: "text-slate-300",
  };
  return (
    <div className={`bg-slate-900 dark:bg-black ${colorMap[color] || colorMap.blue} p-3 rounded mt-2 font-mono text-xs overflow-x-auto border border-slate-700 dark:border-white/10`}>{children}</div>
  );
};

const Step = ({ n, title, children, color = 'rose' }: { n: number; title: string; children: React.ReactNode; color?: string }) => {
  const colorMap: Record<string, string> = {
    rose: "border-rose-100 dark:border-rose-900/50 text-rose-900 dark:text-[#BC4128] dark:text-[#E2694A] bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300",
  };
  const c = colorMap[color] || colorMap.rose;
  const classes = c.split(' ');
  return (
    <div className={`bg-white dark:bg-[#14171B] p-4 rounded-lg border ${classes[0]} ${classes[1]} shadow-sm`}>
      <h3 className={`font-bold ${classes[2]} ${classes[3]} text-sm flex items-center gap-2`}>
        <span className={`${classes[4]} ${classes[5]} ${classes[6]} ${classes[7]} w-5 h-5 flex items-center justify-center rounded-full text-xs`}>{n}</span>
        {title}
      </h3>
      <div className="text-sm text-slate-700 dark:text-slate-300 mt-2">{children}</div>
    </div>
  );
};

export default function ClaudeCodeCheatsheet() {
  return (
    <ArticleFrame slug={SLUG}>
      <InfographicSlot alt="Claude Code Financial Cheatsheet Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12 space-y-24">
        
        <div className="text-center mb-16">
          
          <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">Enterprise-grade workflows for algorithmic trading, quantitative research, and complex system orchestration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* BOX 1: CLI Execution Flags */}
          <Box color="blue" icon={Terminal} title="CLI Execution Flags" subtitle="Mastering the headless execution and context configuration flags.">
            <Card title="Headless ETL Pipelines" color="blue">
              <CodeSnip color="blue">{`claude -p "query" --json-schema '{"type":"object", ...}'`}</CodeSnip>
              <p className="text-slate-700 dark:text-slate-400 text-sm">Forces Claude to exit immediately after outputting strictly validated JSON. Ideal for scheduled cron jobs extracting structured sentiment analysis from raw market news.</p>
            </Card>
            <Card title="Compute Allocation" color="blue">
              <CodeSnip color="blue">claude --effort max --model claude-3-7-sonnet</CodeSnip>
              <p className="text-slate-700 dark:text-slate-400 text-sm">Triggers extended thinking tokens. Mandatory when asking Claude to debug complex math in stochastic calculus or Black-Scholes pricing models.</p>
            </Card>
            <Card title="State Branching" color="blue">
              <CodeSnip color="blue">claude -r &lt;id&gt; --fork-session</CodeSnip>
              <p className="text-slate-700 dark:text-slate-400 text-sm">Resumes an existing trading algorithm discussion but forks the memory. Allows you to test two different neural network architectures without cross-contaminating the original session.</p>
            </Card>
            <Card title="Cross-Repo Integration" color="blue">
              <CodeSnip color="blue">claude --mcp-config ./mcp.json --add-dir ../lib</CodeSnip>
              <p className="text-slate-700 dark:text-slate-400 text-sm">Mount external libraries (like your proprietary C++ quant modules) and load specific Model Context Protocol configurations in one command.</p>
            </Card>
            <Card title="Runaway Protection" color="blue">
              <CodeSnip color="blue">claude -p "Refactor" --max-turns 5 --max-budget-usd 2.00</CodeSnip>
              <p className="text-slate-700 dark:text-slate-400 text-sm">Caps the autonomous agent loop in print mode. Prevents the model from burning budget if it gets stuck debugging a persistent Python compilation error.</p>
            </Card>
          </Box>

          {/* BOX 2: Slash Commands */}
          <Box color="cyan" icon={Command} title="Slash Commands (REPL)" subtitle="In-session state, budget, and context management controls.">
            <Card title="Context Compression & Wipes" color="cyan">
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                <code className="text-cyan-700 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-900/30 px-1 border border-cyan-200 dark:border-cyan-800 rounded text-xs font-mono">/compact</code>: Summarizes conversation history into a single dense prompt, clearing the raw backlog. <strong className="dark:text-white">Crucial</strong> when Claude accidentally ingests a massive API payload and approaches the 200k token limit.
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <code className="text-cyan-700 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-900/30 px-1 border border-cyan-200 dark:border-cyan-800 rounded text-xs font-mono">/clear</code>: Nukes the entire thread history but keeps the CLI open. Use when hard-pivoting from back-end C++ risk modeling to writing React front-end components to prevent context pollution.
              </p>
            </Card>
            <Card title="Thread Multi-Tasking" color="cyan">
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                <code className="text-cyan-700 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-900/30 px-1 border border-cyan-200 dark:border-cyan-800 rounded text-xs font-mono">/history</code>: Displays a list of recent REPL sessions with their unique IDs.
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <code className="text-cyan-700 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-900/30 px-1 border border-cyan-200 dark:border-cyan-800 rounded text-xs font-mono">/resume &lt;id&gt;</code>: Hot-swaps your current context into a previous thread. Maintain one persistent thread for "AlphaVantage Pipeline Debugging" and another for "Options Greeks Math", switching seamlessly without losing momentum.
              </p>
            </Card>
            <Card title="Budgeting & Diagnostics" color="cyan">
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                <code className="text-cyan-700 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-900/30 px-1 border border-cyan-200 dark:border-cyan-800 rounded text-xs font-mono">/cost</code>: Prints exact token usage, session duration, and API spend in USD. Mandatory before and after asking Claude to index large directories of Parquet files.
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                <code className="text-cyan-700 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-900/30 px-1 border border-cyan-200 dark:border-cyan-800 rounded text-xs font-mono">/init</code>: Bootstraps a fresh <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded">CLAUDE.md</code> architecture file in the root directory.
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <code className="text-cyan-700 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-900/30 px-1 border border-cyan-200 dark:border-cyan-800 rounded text-xs font-mono">/bug</code>: Packages terminal errors, current state, and prompt history to report systemic tool failures directly to Anthropic.
              </p>
            </Card>
          </Box>

          {/* BOX 3: Resolving "Thinking Too Long" */}
          <Box color="rose" icon={AlertTriangle} title='Resolving "Thinking Too Long"' subtitle="Infinite tool-use loops are caused by Context Rot (token bloat), silent script failures, or overly restrictive negative prompting.">
            <Step n={1} title="Safe Interruption vs. Force Kill">
              Never force-kill (<kbd className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 px-1 rounded border border-slate-200 dark:border-slate-700 text-xs font-mono shadow-sm">Ctrl+C</kbd>) a runaway session — it severs the connection mid-tool-use and corrupts session state. Instead, press <kbd className="bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-800 font-mono text-xs shadow-sm">Alt+T</kbd> (or <kbd className="bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-800 font-mono text-xs shadow-sm">Opt+T</kbd>). This gracefully bypasses the extended thinking phase, forcing the model to output its current thought process and halting the loop safely.
            </Step>
            <Step n={2} title="Diagnosing Tool Failure Loops">
              If Claude gets stuck, it is often trying to execute a bash script or Python file that is failing silently (e.g., swallowing <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded dark:text-slate-300">stderr</code>). Claude will blindly retry the tool indefinitely. Interrupt the model, manually read the script it wrote, fix the syntax error or missing dependency, and type <code className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/30 px-1 rounded border border-rose-200 dark:border-rose-800 text-xs font-mono">/resume</code>.
            </Step>
            <Step n={3} title="Context Purging & Token Limits">
              When Claude starts randomly re-reading unchanged files like <code className="text-xs font-mono dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1 rounded">models.py</code> over and over, its attention mechanism has degraded due to token bloat. Immediately run <code className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/30 px-1 rounded border border-rose-200 dark:border-rose-800 text-xs font-mono">/compact</code> to squash the history, or use <code className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/30 px-1 rounded border border-rose-200 dark:border-rose-800 text-xs font-mono">/clear</code> to keep your repo context but wipe the conversation thread.
            </Step>
            <Step n={4} title="The @ Inclusion Trap">
              Avoid using global <code className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold">@</code> file references in your <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded dark:text-slate-300">CLAUDE.md</code> system prompt (e.g., <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded dark:text-slate-300">@utils.py</code>). This forces Claude to load the entire file into its context window on <em className="dark:text-white">every single turn</em>, rapidly exhausting the context limit and causing severe latency. Let Claude discover files via tools.
            </Step>
          </Box>

          {/* BOX 4: Handling Massive Data */}
          <Box color="fuchsia" icon={Database} title="Handling Massive Data" subtitle="Strategies to prevent token exhaustion when analyzing gigabytes of historical market data.">
            <Card title="1. The Context Limit vs. RAM Reality" color="fuchsia">
              <p className="text-sm text-slate-700 dark:text-slate-400">Claude&apos;s context window is ~200,000 tokens. A mere 5MB CSV of tick data will instantly crash the agent with a <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-mono">ContextLengthExceeded</code> error. <strong className="dark:text-white">Never</strong> use <code className="text-fuchsia-700 dark:text-fuchsia-400 font-mono text-xs bg-fuchsia-50 dark:bg-fuchsia-900/30 px-1 border border-fuchsia-200 dark:border-fuchsia-800 rounded">claude "read data.csv"</code> or dump raw API JSON arrays into the chat.</p>
            </Card>
            <Card title="2. Bash Pipeline Sampling" color="fuchsia">
              <p className="text-sm text-slate-700 dark:text-slate-400">Strictly constrain output using standard Unix tools before passing to Claude:</p>
              <DarkCode color="fuchsia">
                # DO NOT do this:<br/>
                cat market_data.log<br/>
                <br/>
                # INSTEAD prompt Claude to execute:<br/>
                tail -n 1000 market_data.log | grep &quot;ORDER_REJECTED&quot; | head -n 20
              </DarkCode>
            </Card>
            <Card title="3. Force DuckDB & Polars Usage" color="fuchsia">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Add explicit instructions to your <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded">CLAUDE.md</code>: <em className="dark:text-slate-300">&quot;When analyzing datasets &gt; 100MB, write a standalone Python script using DuckDB or Polars. Do not use Pandas. Execute the script to compute aggregate statistics and print only the resulting summary table.&quot;</em></p>
              <p className="text-sm text-slate-700 dark:text-slate-400">This forces Claude to utilize memory-efficient SQL on Parquet files, reading only the results rather than the raw rows.</p>
            </Card>
            <Card title="4. Implement Python Generators" color="fuchsia">
              <p className="text-sm text-slate-700 dark:text-slate-400">When asking Claude to build backtesters for high-frequency strategies, instruct it to use lazy evaluation. Mandate the use of Python generators (<code className="text-fuchsia-700 dark:text-fuchsia-400 font-mono text-xs font-bold">yield</code>) and memory-mapped files (<code className="text-fuchsia-700 dark:text-fuchsia-400 font-mono text-xs font-bold">np.memmap</code>) to stream prices into the pricing model chunk-by-chunk, rather than loading millions of ticks into a list in RAM.</p>
            </Card>
          </Box>

          {/* BOX 5: MCP Architecture */}
          <Box color="emerald" icon={Server} title="MCP Architecture" subtitle="Model Context Protocol securely exposes internal APIs and databases directly to Claude's reasoning engine.">
            <Card title="1. Global MCP Configuration (mcp.json)" color="emerald">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Bind local or remote data servers to the CLI via configuration files rather than hardcoded scripts.</p>
              <DarkCode color="emerald">
                &#123;<br/>
                &nbsp;&nbsp;&quot;mcpServers&quot;: &#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;quant-db&quot;: &#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;command&quot;: &quot;uvx&quot;,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;args&quot;: [&quot;mcp-server-sqlite&quot;, &quot;--db&quot;, &quot;historical_ticks.db&quot;]<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                &nbsp;&nbsp;&#125;<br/>
                &#125;
              </DarkCode>
            </Card>
            <Card title="2. Market Data Abstraction" color="emerald">
              <p className="text-sm text-slate-700 dark:text-slate-400">Instead of asking Claude to write brittle Python <code className="text-xs bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded">requests</code> wrappers for Alpha Vantage or Polygon, connect an MCP server. Claude can dynamically call predefined tools like <code className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-mono text-xs bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/30 px-1 rounded">get_ticker_history(sym=&quot;AAPL&quot;)</code>, ingesting the JSON output cleanly without writing networking code.</p>
            </Card>
            <Card title="3. Secure Data Warehouse Queries" color="emerald">
              <p className="text-sm text-slate-700 dark:text-slate-400">Provide Claude secure, read-only SQL access to Snowflake, Dolt, or PostgreSQL via MCP. This allows Claude to query proprietary Monte Carlo simulation results or portfolio state while keeping the actual database credentials entirely outside the LLM context window.</p>
            </Card>
          </Box>

          {/* BOX 6: Sub-Agents & Plugins */}
          <Box color="purple" icon={Cpu} title="Sub-Agents & Plugins" subtitle="Delegate tasks to isolated sandbox environments to parallelize workloads and protect context limits.">
            <Card title="1. Defining Sub-Agents (.claude/agents/)" color="purple">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Define bespoke workers. Container isolation is crucial when running untrusted Python generated by the LLM.</p>
              <DarkCode color="purple">
                # .claude/agents/backtest-runner.yaml<br/>
                name: backtest-runner<br/>
                model: claude-3-7-sonnet<br/>
                isolation: container<br/>
                tools: [&quot;bash&quot;, &quot;file_read&quot;, &quot;file_write&quot;]<br/>
                system: &quot;Run the backtrader suite. If Sharpe ratio &lt; 1.5, adjust MACD params and rerun.&quot;
              </DarkCode>
            </Card>
            <Card title="2. The 'Explore Agent' Pattern" color="purple">
              <p className="text-sm text-slate-700 dark:text-slate-400">Use <strong className="text-purple-900 dark:text-purple-300">Claude 3.5 Haiku</strong> as a high-speed, low-cost indexing agent. When onboarding to a massive legacy C++ HFT codebase, dispatch a Haiku sub-agent to traverse millions of lines of code to locate the specific slippage calculation functions, returning only the exact file paths to the main Opus/Sonnet reasoning agent.</p>
            </Card>
            <Card title="3. Jupyter Integration Plugin" color="purple">
              <p className="text-sm text-slate-700 dark:text-slate-400">Utilize plugins like <code className="text-purple-700 dark:text-purple-400 font-mono text-xs bg-purple-50 dark:bg-purple-900/30 px-1 rounded">claude-jupyter</code>. This allows Claude to spin up a headless Jupyter kernel, execute Python DataFrames for quantitative analysis in memory, and analyze generated Matplotlib/Seaborn charts without cluttering your local filesystem with <code className="text-xs font-mono dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1 rounded">.py</code> scripts.</p>
            </Card>
          </Box>

          {/* BOX 7: Financial Project Setup */}
          <Box color="teal" icon={FileCode} title="Financial Project Setup" subtitle="Architecting the repo for deterministic LLM interaction.">
            <Card title="CLAUDE.md (System Architecture)" color="teal">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">The core global prompt. Organize into strict sections to govern agent behavior.</p>
              <DarkCode color="teal">
                # Quant Role<br/>
                You are a senior algorithmic trader. Optimize for speed.<br/>
                <br/>
                # Stack<br/>
                - Python 3.11, Polars (NOT Pandas), Numpy, Pytest.<br/>
                <br/>
                # Constraints<br/>
                - Never use float for currency; use decimal.Decimal.<br/>
                - Do not mock market data; use /tests/fixtures/
              </DarkCode>
            </Card>
            <Card title=".claudeignore Configuration" color="teal">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Critically important to prevent autonomous search from reading massive binaries, crashing the context window, or leaking secrets.</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-teal-800 dark:text-teal-300 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-teal-900/30 p-3 rounded border border-teal-100 dark:border-teal-800">
                <ul className="list-disc pl-4 space-y-1">
                  <li>*.csv / *.parquet</li>
                  <li>*.sqlite / *.db</li>
                  <li>*.h5 / *.feather</li>
                </ul>
                <ul className="list-disc pl-4 space-y-1">
                  <li>/historical_tick_data/</li>
                  <li>/notebooks/.ipynb_checkpoints/</li>
                  <li>.env.production</li>
                </ul>
              </div>
            </Card>
          </Box>

          {/* BOX 8: Hooks & Declarative Skills */}
          <Box color="amber" icon={Code} title="Hooks & Declarative Skills" subtitle="Injecting guardrails and reusable mathematical workflows.">
            <Card title="Lifecycle Hooks (.claude/hooks/)" color="amber">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Executable scripts that intercept Claude&apos;s tool usage.</p>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-400 list-disc pl-4 marker:text-amber-500">
                <li><strong className="text-amber-800 dark:text-amber-300">pre_tool_use.sh:</strong> Compliance Gates. Intercept the <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs">Bash</code> tool. If the proposed command contains <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs">rm -rf</code> or attempts to read <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs">AWS_ACCESS_KEY</code>, exit with status 1 to block execution.</li>
                <li><strong className="text-amber-800 dark:text-amber-300">post_tool_use.py:</strong> Auditing &amp; Formatting. Automatically pipe generated Python files through <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs">black</code> and <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs">ruff</code>.</li>
                <li><strong className="text-amber-800 dark:text-amber-300">stop.sh:</strong> Triggers when Claude finishes. Force-run <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs">pytest tests/pricing/</code> before allowing the session to conclude.</li>
              </ul>
            </Card>
            <Card title="Declarative Skills (SKILL.md)" color="amber">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Stored globally in <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-amber-700 dark:text-amber-400 text-xs">~/.claude/skills/</code>. Used to package complex analytical workflows.</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 bg-amber-50 dark:bg-amber-900/30 p-3 rounded border border-amber-200 dark:border-amber-800">
                <strong>Example (<code className="text-amber-700 dark:text-amber-400 font-bold text-xs">backtest-analyzer.md</code>):</strong><br/>
                Contains a predefined prompt template outlining the formula for Sharpe and Sortino ratios. When invoked via <code className="text-amber-700 dark:text-amber-400 font-bold bg-white dark:bg-[#14171B] px-1 border border-amber-200 dark:border-amber-800 rounded text-xs">/backtest-analyzer result.json</code>, Claude automatically ingests the JSON and outputs standardized risk metrics without needing manual prompt engineering.
              </p>
            </Card>
          </Box>

          {/* BOX 9: Plan Mode & Workflows */}
          <Box color="indigo" icon={Layers} title="Plan Mode & Workflows" subtitle="Strategies for safely managing massive architectural refactors and backtest deployments.">
            <Card title="Plan vs. Auto Mode Workflow" color="indigo">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Launch with <code className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold px-1 rounded border border-indigo-100 dark:border-indigo-800 text-xs font-mono">claude --permission-mode plan --model claude-3-7-sonnet</code> for read-only analysis. Claude will search files and generate architectural diagrams detailing how it intends to implement a new multi-leg options strategy.</p>
              <p className="text-sm text-slate-700 dark:text-slate-400">Because it lacks write permissions, it cannot accidentally overwrite legacy pricing logic. Once the proposed plan is approved by the human quant, run <code className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold px-1 rounded border border-indigo-100 dark:border-indigo-800 text-xs font-mono">/act</code> for the rote execution phase.</p>
            </Card>
            <Card title={`"Wave-Based" CI/CD Implementation`} color="indigo">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 italic">Essential for massive codebases where single sessions hit the 200k token context limit.</p>
              <ol className="list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-3 marker:text-[#A8672E] dark:text-[#D08F52] marker:font-bold">
                <li><strong className="text-indigo-900 dark:text-indigo-300 block">The Architect (Core Agent)</strong> Reads quant requirements, creates the structural plan, and breaks the mathematical implementation down into isolated, sequential GitHub Issues.</li>
                <li><strong className="text-indigo-900 dark:text-indigo-300 block">The Execution Wave (Sub-Agents)</strong> The Core agent spawns isolated sub-agents (Haiku models for speed) to write the code for each issue in parallel worktrees. <strong className="dark:text-white">Crucially</strong>, these agents are given a strict kill-switch at 75% context capacity to force a commit and prevent hallucination loops.</li>
                <li><strong className="text-indigo-900 dark:text-indigo-300 block">The Review Loop</strong> The Core agent aggregates sub-agent outputs and runs Pytest suites. If the math fails, it wipes the specific Haiku context and spawns a fresh agent with the exact test failure logs.</li>
              </ol>
            </Card>
          </Box>

          {/* BOX 10: Security & Compliance */}
          <Box color="slate" icon={ShieldAlert} title="Security & Compliance" subtitle="Mandatory institutional guardrails. Treat the CLI as a privileged user.">
            <Card title='The "Compiler" Analogy (Reproducibility)' color="slate">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2"><strong className="dark:text-white">Never let the LLM execute live trades autonomously via an MCP tool.</strong> LLM outputs are inherently non-deterministic. Treat Claude purely as a &quot;compiler&quot; and code generator.</p>
              <p className="text-sm text-slate-700 dark:text-slate-400">All actual order routing must occur via highly-tested, deterministic C++/Python runtimes triggered by standard CI/CD deployment jobs, keeping the LLM entirely isolated from the exchange API keys.</p>
            </Card>
            <Card title="PII, PCI & Config Scrubbing" color="slate">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Because Claude Code sends local file context to Anthropic&apos;s cloud servers, ensure <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs font-mono">.claudeignore</code> aggressively blocks:</p>
              <ul className="text-sm text-slate-700 dark:text-slate-400 list-disc pl-5 marker:text-slate-500 space-y-1">
                <li>Local development databases (SQLite, .db files).</li>
                <li><code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs">~/.aws/credentials</code> or <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs">.env</code> files containing live account numbers.</li>
                <li>Directories containing unanonymized client trade histories.</li>
              </ul>
            </Card>
            <Card title="OS Sandboxing & Network Routing" color="slate">
              <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">Run the Claude CLI within strictly configured OS-level sandboxes:</p>
              <ul className="text-sm text-slate-700 dark:text-slate-400 list-disc pl-5 marker:text-slate-500 space-y-1">
                <li><strong className="dark:text-white">Linux:</strong> Run via <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs font-mono">bwrap</code> (Bubblewrap) or inside a minimal, unprivileged Docker container.</li>
                <li><strong className="dark:text-white">macOS:</strong> Utilize Apple <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs font-mono">sandbox-exec</code> (Seatbelt).</li>
                <li><strong className="dark:text-white">Network:</strong> Use <code className="bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1 rounded text-xs font-mono">HTTP_PROXY=http://10.x.x.x claude</code> to forcefully route traffic through corporate VPC gateways, enforcing strict &quot;Deny All&quot; outbound policies to unapproved domains.</li>
              </ul>
            </Card>
          </Box>

        </div>
      </main>
    </ArticleFrame>
  );
}
