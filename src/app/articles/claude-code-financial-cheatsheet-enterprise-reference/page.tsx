'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Maximize2, ExternalLink, Terminal, Command, AlertTriangle, Database, Server, Cpu, FileCode, Code, Layers, ShieldAlert, Zap, Activity } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const SLUG = 'claude-code-financial-cheatsheet-enterprise-reference';
const GOOGLE_DOC = 'https://docs.google.com/document/d/e/2PACX-1vQKlh2hpEDIyjcw7VARLg-6m7hjsAtyEDLJlZ75LkWywZIkAkgl7KD-TTj9n1jqQeVTHEBNOlVIFt1Y/pub';
const INFOGRAPHIC = 'https://i.imgur.com/nc54SVr.png';

const Box = ({ color, icon: Icon, title, subtitle, children }: {
  color: string; icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string; subtitle: string; children: React.ReactNode;
}) => (
  <div className={`bg-${color}-50 border-t-4 border-${color}-500 rounded-xl p-6 shadow-sm`}>
    <h2 className={`text-xl font-bold text-${color}-900 mb-2 flex items-center gap-2`}>
      <Icon size={22} className={`text-${color}-600`} /> {title}
    </h2>
    <p className={`text-sm text-${color}-800 mb-4 border-b border-${color}-200 pb-2`}>{subtitle}</p>
    <div className="space-y-4">{children}</div>
  </div>
);

const Card = ({ title, children, color = 'blue' }: { title: string; children: React.ReactNode; color?: string }) => (
  <div className={`bg-white p-4 rounded-lg border border-${color}-100 shadow-sm`}>
    <h3 className={`font-bold text-${color}-900 text-sm mb-2`}>{title}</h3>
    {children}
  </div>
);

const CodeSnip = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
  <code className={`text-${color}-700 font-bold font-mono text-xs block mb-1`}>{children}</code>
);

const DarkCode = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
  <div className={`bg-slate-900 text-${color}-300 p-3 rounded mt-2 font-mono text-xs overflow-x-auto`}>{children}</div>
);

const Step = ({ n, title, children, color = 'rose' }: { n: number; title: string; children: React.ReactNode; color?: string }) => (
  <div className="bg-white p-4 rounded-lg border border-rose-100 shadow-sm">
    <h3 className={`font-bold text-${color}-900 text-sm flex items-center gap-2`}>
      <span className={`bg-${color}-100 text-${color}-800 w-5 h-5 flex items-center justify-center rounded-full text-xs`}>{n}</span>
      {title}
    </h3>
    <div className="text-sm text-slate-700 mt-2">{children}</div>
  </div>
);

export default function ClaudeCodeCheatsheet() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(a => a.slug === SLUG);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={SLUG} />
        </>
      )}

      {/* Return to Home */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero */}
      <header className="bg-white border-b border-slate-100 mt-6">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-14">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full uppercase tracking-wider">Deep Research</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">AI &amp; Machine Learning</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider">May 21, 2026</span>
          </div>
          <div className="inline-flex items-center gap-3 mb-4">
            <Activity className="text-indigo-600" size={36} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Claude Code Financial Cheatsheet
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl font-medium">
            Quantitative Finance &amp; Architecture Detailed Reference — CLI flags, slash commands, MCP, sub-agents, security guardrails, and more.
          </p>
        </div>
      </header>

      {/* Infographic */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img src={INFOGRAPHIC} alt="Claude Code Financial Cheatsheet Infographic" className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]" />
          <button
            onClick={(e) => { e.stopPropagation(); setIsImageViewerOpen(true); }}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            title="View full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">Click to view full screen</div>
          </div>
        </div>
      </section>

      <FullScreenImageViewer src={INFOGRAPHIC} alt="Claude Code Financial Cheatsheet Infographic" isOpen={isImageViewerOpen} onClose={() => setIsImageViewerOpen(false)} />

      {/* Main Content Grid */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* BOX 1: CLI Execution Flags */}
          <Box color="blue" icon={Terminal} title="CLI Execution Flags" subtitle="Mastering the headless execution and context configuration flags.">
            <Card title="Headless ETL Pipelines" color="blue">
              <CodeSnip color="blue">{`claude -p "query" --json-schema '{"type":"object", ...}'`}</CodeSnip>
              <p className="text-slate-700 text-sm">Forces Claude to exit immediately after outputting strictly validated JSON. Ideal for scheduled cron jobs extracting structured sentiment analysis from raw market news.</p>
            </Card>
            <Card title="Compute Allocation" color="blue">
              <CodeSnip color="blue">claude --effort max --model claude-3-7-sonnet</CodeSnip>
              <p className="text-slate-700 text-sm">Triggers extended thinking tokens. Mandatory when asking Claude to debug complex math in stochastic calculus or Black-Scholes pricing models.</p>
            </Card>
            <Card title="State Branching" color="blue">
              <CodeSnip color="blue">claude -r &lt;id&gt; --fork-session</CodeSnip>
              <p className="text-slate-700 text-sm">Resumes an existing trading algorithm discussion but forks the memory. Allows you to test two different neural network architectures without cross-contaminating the original session.</p>
            </Card>
            <Card title="Cross-Repo Integration" color="blue">
              <CodeSnip color="blue">claude --mcp-config ./mcp.json --add-dir ../lib</CodeSnip>
              <p className="text-slate-700 text-sm">Mount external libraries (like your proprietary C++ quant modules) and load specific Model Context Protocol configurations in one command.</p>
            </Card>
            <Card title="Runaway Protection" color="blue">
              <CodeSnip color="blue">claude -p "Refactor" --max-turns 5 --max-budget-usd 2.00</CodeSnip>
              <p className="text-slate-700 text-sm">Caps the autonomous agent loop in print mode. Prevents the model from burning budget if it gets stuck debugging a persistent Python compilation error.</p>
            </Card>
          </Box>

          {/* BOX 2: Slash Commands */}
          <Box color="cyan" icon={Command} title="Slash Commands (REPL)" subtitle="In-session state, budget, and context management controls.">
            <Card title="Context Compression & Wipes" color="cyan">
              <p className="text-sm text-slate-700 mb-2">
                <code className="text-cyan-700 font-bold bg-cyan-50 px-1 border border-cyan-200 rounded text-xs font-mono">/compact</code>: Summarizes conversation history into a single dense prompt, clearing the raw backlog. <strong>Crucial</strong> when Claude accidentally ingests a massive API payload and approaches the 200k token limit.
              </p>
              <p className="text-sm text-slate-700">
                <code className="text-cyan-700 font-bold bg-cyan-50 px-1 border border-cyan-200 rounded text-xs font-mono">/clear</code>: Nukes the entire thread history but keeps the CLI open. Use when hard-pivoting from back-end C++ risk modeling to writing React front-end components to prevent context pollution.
              </p>
            </Card>
            <Card title="Thread Multi-Tasking" color="cyan">
              <p className="text-sm text-slate-700 mb-2">
                <code className="text-cyan-700 font-bold bg-cyan-50 px-1 border border-cyan-200 rounded text-xs font-mono">/history</code>: Displays a list of recent REPL sessions with their unique IDs.
              </p>
              <p className="text-sm text-slate-700">
                <code className="text-cyan-700 font-bold bg-cyan-50 px-1 border border-cyan-200 rounded text-xs font-mono">/resume &lt;id&gt;</code>: Hot-swaps your current context into a previous thread. Maintain one persistent thread for "AlphaVantage Pipeline Debugging" and another for "Options Greeks Math", switching seamlessly without losing momentum.
              </p>
            </Card>
            <Card title="Budgeting & Diagnostics" color="cyan">
              <p className="text-sm text-slate-700 mb-2">
                <code className="text-cyan-700 font-bold bg-cyan-50 px-1 border border-cyan-200 rounded text-xs font-mono">/cost</code>: Prints exact token usage, session duration, and API spend in USD. Mandatory before and after asking Claude to index large directories of Parquet files.
              </p>
              <p className="text-sm text-slate-700 mb-2">
                <code className="text-cyan-700 font-bold bg-cyan-50 px-1 border border-cyan-200 rounded text-xs font-mono">/init</code>: Bootstraps a fresh <code className="text-xs font-mono">CLAUDE.md</code> architecture file in the root directory.
              </p>
              <p className="text-sm text-slate-700">
                <code className="text-cyan-700 font-bold bg-cyan-50 px-1 border border-cyan-200 rounded text-xs font-mono">/bug</code>: Packages terminal errors, current state, and prompt history to report systemic tool failures directly to Anthropic.
              </p>
            </Card>
          </Box>

          {/* BOX 3: Resolving "Thinking Too Long" */}
          <Box color="rose" icon={AlertTriangle} title='Resolving "Thinking Too Long"' subtitle="Infinite tool-use loops are caused by Context Rot (token bloat), silent script failures, or overly restrictive negative prompting.">
            <Step n={1} title="Safe Interruption vs. Force Kill">
              Never force-kill (<kbd className="bg-slate-100 text-slate-500 px-1 rounded border border-slate-200 text-xs font-mono shadow-sm">Ctrl+C</kbd>) a runaway session — it severs the connection mid-tool-use and corrupts session state. Instead, press <kbd className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200 font-mono text-xs shadow-sm">Alt+T</kbd> (or <kbd className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200 font-mono text-xs shadow-sm">Opt+T</kbd>). This gracefully bypasses the extended thinking phase, forcing the model to output its current thought process and halting the loop safely.
            </Step>
            <Step n={2} title="Diagnosing Tool Failure Loops">
              If Claude gets stuck, it is often trying to execute a bash script or Python file that is failing silently (e.g., swallowing <code className="text-xs bg-slate-100 px-1 rounded">stderr</code>). Claude will blindly retry the tool indefinitely. Interrupt the model, manually read the script it wrote, fix the syntax error or missing dependency, and type <code className="text-rose-600 font-bold bg-rose-50 px-1 rounded border border-rose-200 text-xs font-mono">/resume</code>.
            </Step>
            <Step n={3} title="Context Purging & Token Limits">
              When Claude starts randomly re-reading unchanged files like <code className="text-xs font-mono">models.py</code> over and over, its attention mechanism has degraded due to token bloat. Immediately run <code className="text-rose-600 font-bold bg-rose-50 px-1 rounded border border-rose-200 text-xs font-mono">/compact</code> to squash the history, or use <code className="text-rose-600 font-bold bg-rose-50 px-1 rounded border border-rose-200 text-xs font-mono">/clear</code> to keep your repo context but wipe the conversation thread.
            </Step>
            <Step n={4} title="The @ Inclusion Trap">
              Avoid using global <code className="text-rose-600 font-bold">@</code> file references in your <code className="text-xs bg-slate-100 px-1 rounded">CLAUDE.md</code> system prompt (e.g., <code className="text-xs bg-slate-100 px-1 rounded">@utils.py</code>). This forces Claude to load the entire file into its context window on <em>every single turn</em>, rapidly exhausting the context limit and causing severe latency. Let Claude discover files via tools.
            </Step>
          </Box>

          {/* BOX 4: Handling Massive Data */}
          <Box color="fuchsia" icon={Database} title="Handling Massive Data" subtitle="Strategies to prevent token exhaustion when analyzing gigabytes of historical market data.">
            <Card title="1. The Context Limit vs. RAM Reality" color="fuchsia">
              <p className="text-sm text-slate-700">Claude&apos;s context window is ~200,000 tokens. A mere 5MB CSV of tick data will instantly crash the agent with a <code className="bg-slate-100 px-1 rounded text-xs text-red-600 font-mono">ContextLengthExceeded</code> error. <strong>Never</strong> use <code className="text-fuchsia-700 font-mono text-xs bg-fuchsia-50 px-1 border border-fuchsia-200 rounded">claude "read data.csv"</code> or dump raw API JSON arrays into the chat.</p>
            </Card>
            <Card title="2. Bash Pipeline Sampling" color="fuchsia">
              <p className="text-sm text-slate-700">Strictly constrain output using standard Unix tools before passing to Claude:</p>
              <DarkCode color="fuchsia">
                # DO NOT do this:<br/>
                cat market_data.log<br/>
                <br/>
                # INSTEAD prompt Claude to execute:<br/>
                tail -n 1000 market_data.log | grep &quot;ORDER_REJECTED&quot; | head -n 20
              </DarkCode>
            </Card>
            <Card title="3. Force DuckDB & Polars Usage" color="fuchsia">
              <p className="text-sm text-slate-700 mb-2">Add explicit instructions to your <code className="font-mono text-xs bg-slate-100 px-1 rounded">CLAUDE.md</code>: <em>&quot;When analyzing datasets &gt; 100MB, write a standalone Python script using DuckDB or Polars. Do not use Pandas. Execute the script to compute aggregate statistics and print only the resulting summary table.&quot;</em></p>
              <p className="text-sm text-slate-700">This forces Claude to utilize memory-efficient SQL on Parquet files, reading only the results rather than the raw rows.</p>
            </Card>
            <Card title="4. Implement Python Generators" color="fuchsia">
              <p className="text-sm text-slate-700">When asking Claude to build backtesters for high-frequency strategies, instruct it to use lazy evaluation. Mandate the use of Python generators (<code className="text-fuchsia-700 font-mono text-xs font-bold">yield</code>) and memory-mapped files (<code className="text-fuchsia-700 font-mono text-xs font-bold">np.memmap</code>) to stream prices into the pricing model chunk-by-chunk, rather than loading millions of ticks into a list in RAM.</p>
            </Card>
          </Box>

          {/* BOX 5: MCP Architecture */}
          <Box color="emerald" icon={Server} title="MCP Architecture" subtitle="Model Context Protocol securely exposes internal APIs and databases directly to Claude's reasoning engine.">
            <Card title="1. Global MCP Configuration (mcp.json)" color="emerald">
              <p className="text-sm text-slate-700 mb-2">Bind local or remote data servers to the CLI via configuration files rather than hardcoded scripts.</p>
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
              <p className="text-sm text-slate-700">Instead of asking Claude to write brittle Python <code className="text-xs bg-slate-100 px-1 rounded">requests</code> wrappers for Alpha Vantage or Polygon, connect an MCP server. Claude can dynamically call predefined tools like <code className="text-emerald-700 font-mono text-xs bg-emerald-50 px-1 rounded">get_ticker_history(sym=&quot;AAPL&quot;)</code>, ingesting the JSON output cleanly without writing networking code.</p>
            </Card>
            <Card title="3. Secure Data Warehouse Queries" color="emerald">
              <p className="text-sm text-slate-700">Provide Claude secure, read-only SQL access to Snowflake, Dolt, or PostgreSQL via MCP. This allows Claude to query proprietary Monte Carlo simulation results or portfolio state while keeping the actual database credentials entirely outside the LLM context window.</p>
            </Card>
          </Box>

          {/* BOX 6: Sub-Agents & Plugins */}
          <Box color="purple" icon={Cpu} title="Sub-Agents & Plugins" subtitle="Delegate tasks to isolated sandbox environments to parallelize workloads and protect context limits.">
            <Card title="1. Defining Sub-Agents (.claude/agents/)" color="purple">
              <p className="text-sm text-slate-700 mb-2">Define bespoke workers. Container isolation is crucial when running untrusted Python generated by the LLM.</p>
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
              <p className="text-sm text-slate-700">Use <strong className="text-purple-900">Claude 3.5 Haiku</strong> as a high-speed, low-cost indexing agent. When onboarding to a massive legacy C++ HFT codebase, dispatch a Haiku sub-agent to traverse millions of lines of code to locate the specific slippage calculation functions, returning only the exact file paths to the main Opus/Sonnet reasoning agent.</p>
            </Card>
            <Card title="3. Jupyter Integration Plugin" color="purple">
              <p className="text-sm text-slate-700">Utilize plugins like <code className="text-purple-700 font-mono text-xs bg-purple-50 px-1 rounded">claude-jupyter</code>. This allows Claude to spin up a headless Jupyter kernel, execute Python DataFrames for quantitative analysis in memory, and analyze generated Matplotlib/Seaborn charts without cluttering your local filesystem with <code className="text-xs font-mono">.py</code> scripts.</p>
            </Card>
          </Box>

          {/* BOX 7: Financial Project Setup */}
          <Box color="teal" icon={FileCode} title="Financial Project Setup" subtitle="Architecting the repo for deterministic LLM interaction.">
            <Card title="CLAUDE.md (System Architecture)" color="teal">
              <p className="text-sm text-slate-700 mb-2">The core global prompt. Organize into strict sections to govern agent behavior.</p>
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
              <p className="text-sm text-slate-700 mb-2">Critically important to prevent autonomous search from reading massive binaries, crashing the context window, or leaking secrets.</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-teal-800 bg-teal-50 p-3 rounded border border-teal-100">
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
              <p className="text-sm text-slate-700 mb-2">Executable scripts that intercept Claude&apos;s tool usage.</p>
              <ul className="space-y-3 text-sm text-slate-700 list-disc pl-4 marker:text-amber-500">
                <li><strong className="text-amber-800">pre_tool_use.sh:</strong> Compliance Gates. Intercept the <code className="bg-slate-100 px-1 rounded text-xs">Bash</code> tool. If the proposed command contains <code className="bg-slate-100 px-1 rounded text-xs">rm -rf</code> or attempts to read <code className="bg-slate-100 px-1 rounded text-xs">AWS_ACCESS_KEY</code>, exit with status 1 to block execution.</li>
                <li><strong className="text-amber-800">post_tool_use.py:</strong> Auditing &amp; Formatting. Automatically pipe generated Python files through <code className="bg-slate-100 px-1 rounded text-xs">black</code> and <code className="bg-slate-100 px-1 rounded text-xs">ruff</code>.</li>
                <li><strong className="text-amber-800">stop.sh:</strong> Triggers when Claude finishes. Force-run <code className="bg-slate-100 px-1 rounded text-xs">pytest tests/pricing/</code> before allowing the session to conclude.</li>
              </ul>
            </Card>
            <Card title="Declarative Skills (SKILL.md)" color="amber">
              <p className="text-sm text-slate-700 mb-2">Stored globally in <code className="bg-slate-100 px-1 rounded text-amber-700 text-xs">~/.claude/skills/</code>. Used to package complex analytical workflows.</p>
              <p className="text-sm text-slate-700 bg-amber-50 p-3 rounded border border-amber-200">
                <strong>Example (<code className="text-amber-700 font-bold text-xs">backtest-analyzer.md</code>):</strong><br/>
                Contains a predefined prompt template outlining the formula for Sharpe and Sortino ratios. When invoked via <code className="text-amber-700 font-bold bg-white px-1 border border-amber-200 rounded text-xs">/backtest-analyzer result.json</code>, Claude automatically ingests the JSON and outputs standardized risk metrics without needing manual prompt engineering.
              </p>
            </Card>
          </Box>

          {/* BOX 9: Plan Mode & Workflows */}
          <Box color="indigo" icon={Layers} title="Plan Mode & Workflows" subtitle="Strategies for safely managing massive architectural refactors and backtest deployments.">
            <Card title="Plan vs. Auto Mode Workflow" color="indigo">
              <p className="text-sm text-slate-700 mb-2">Launch with <code className="bg-indigo-50 text-indigo-700 font-bold px-1 rounded border border-indigo-100 text-xs font-mono">claude --permission-mode plan --model claude-3-7-sonnet</code> for read-only analysis. Claude will search files and generate architectural diagrams detailing how it intends to implement a new multi-leg options strategy.</p>
              <p className="text-sm text-slate-700">Because it lacks write permissions, it cannot accidentally overwrite legacy pricing logic. Once the proposed plan is approved by the human quant, run <code className="bg-indigo-50 text-indigo-700 font-bold px-1 rounded border border-indigo-100 text-xs font-mono">/act</code> for the rote execution phase.</p>
            </Card>
            <Card title={`"Wave-Based" CI/CD Implementation`} color="indigo">
              <p className="text-xs text-slate-500 mb-3 italic">Essential for massive codebases where single sessions hit the 200k token context limit.</p>
              <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-3 marker:text-indigo-500 marker:font-bold">
                <li><strong className="text-indigo-900 block">The Architect (Core Agent)</strong> Reads quant requirements, creates the structural plan, and breaks the mathematical implementation down into isolated, sequential GitHub Issues.</li>
                <li><strong className="text-indigo-900 block">The Execution Wave (Sub-Agents)</strong> The Core agent spawns isolated sub-agents (Haiku models for speed) to write the code for each issue in parallel worktrees. <strong>Crucially</strong>, these agents are given a strict kill-switch at 75% context capacity to force a commit and prevent hallucination loops.</li>
                <li><strong className="text-indigo-900 block">The Review Loop</strong> The Core agent aggregates sub-agent outputs and runs Pytest suites. If the math fails, it wipes the specific Haiku context and spawns a fresh agent with the exact test failure logs.</li>
              </ol>
            </Card>
          </Box>

          {/* BOX 10: Security & Compliance */}
          <Box color="slate" icon={ShieldAlert} title="Security & Compliance" subtitle="Mandatory institutional guardrails. Treat the CLI as a privileged user.">
            <Card title='The "Compiler" Analogy (Reproducibility)' color="slate">
              <p className="text-sm text-slate-700 mb-2"><strong>Never let the LLM execute live trades autonomously via an MCP tool.</strong> LLM outputs are inherently non-deterministic. Treat Claude purely as a &quot;compiler&quot; and code generator.</p>
              <p className="text-sm text-slate-700">All actual order routing must occur via highly-tested, deterministic C++/Python runtimes triggered by standard CI/CD deployment jobs, keeping the LLM entirely isolated from the exchange API keys.</p>
            </Card>
            <Card title="PII, PCI & Config Scrubbing" color="slate">
              <p className="text-sm text-slate-700 mb-2">Because Claude Code sends local file context to Anthropic&apos;s cloud servers, ensure <code className="bg-slate-100 px-1 rounded text-xs font-mono">.claudeignore</code> aggressively blocks:</p>
              <ul className="text-sm text-slate-700 list-disc pl-5 marker:text-slate-500 space-y-1">
                <li>Local development databases (SQLite, .db files).</li>
                <li><code className="bg-slate-100 px-1 rounded text-xs">~/.aws/credentials</code> or <code className="bg-slate-100 px-1 rounded text-xs">.env</code> files containing live account numbers.</li>
                <li>Directories containing unanonymized client trade histories.</li>
              </ul>
            </Card>
            <Card title="OS Sandboxing & Network Routing" color="slate">
              <p className="text-sm text-slate-700 mb-2">Run the Claude CLI within strictly configured OS-level sandboxes:</p>
              <ul className="text-sm text-slate-700 list-disc pl-5 marker:text-slate-500 space-y-1">
                <li><strong>Linux:</strong> Run via <code className="bg-slate-100 px-1 rounded text-xs font-mono">bwrap</code> (Bubblewrap) or inside a minimal, unprivileged Docker container.</li>
                <li><strong>macOS:</strong> Utilize Apple <code className="bg-slate-100 px-1 rounded text-xs font-mono">sandbox-exec</code> (Seatbelt).</li>
                <li><strong>Network:</strong> Use <code className="bg-slate-100 px-1 rounded text-xs font-mono">HTTP_PROXY=http://10.x.x.x claude</code> to forcefully route traffic through corporate VPC gateways, enforcing strict &quot;Deny All&quot; outbound policies to unapproved domains.</li>
              </ul>
            </Card>
          </Box>

        </div>

        {/* Google Doc CTA */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Read the Full Research Paper</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">Access the complete reference document with extended CLI examples, MCP configuration templates, and detailed security implementation guides.</p>
          <a
            href={GOOGLE_DOC}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-800 transition-colors duration-300"
          >
            <ExternalLink className="inline mr-2 h-5 w-5" />
            Read Full Research Paper
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
          <p className="text-slate-500 text-sm leading-relaxed">
            This article is for educational and informational purposes only. It does not constitute financial, investment, or legal advice. All code examples are illustrative and should be reviewed by qualified engineers before production deployment.
          </p>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-6 mt-8 text-center border-t border-slate-200 pt-10 pb-16">
        <p className="text-slate-500 text-sm">
          &copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
        </p>
      </footer>
    </div>
  );
}
