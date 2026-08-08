'use client';

import { Layers, Puzzle, Database, ShieldCheck, GitBranch, Share2, BrainCircuit, Terminal, FileCode, Beaker, Shield, Rss, Route } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const Card = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <div id={id} className={`bg-gray-50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-cyan-700 dark:text-cyan-300 mb-6 flex items-center">
    {icon}
    <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-300 dark:to-blue-400">{children}</span>
  </h2>
);

const CodeBlock = ({ title, code, language = 'python' }: { title: string; code: string; language?: string }) => (
  <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden my-6">
    <div className="px-4 py-2 bg-gray-800/70 border-b border-gray-700 flex items-center">
      <FileCode className="w-4 h-4 mr-2 text-gray-400" />
      <span className="text-sm font-medium text-gray-300">{title}</span>
    </div>
    <pre className="p-4 text-sm overflow-x-auto">
      <code className={`language-${language} text-gray-300`}>{code.trim()}</code>
    </pre>
  </div>
);

const InfoCard = ({ title, children, icon }: { title: string; children: React.ReactNode; icon: React.ReactNode }) => (
  <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 h-full flex flex-col">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-gray-200 dark:bg-gray-700/50 rounded-lg mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <div className="text-gray-600 dark:text-gray-400 space-y-2">{children}</div>
  </div>
);

const DataTable = ({ data, highlightFirstColumn = true }: { data: any; highlightFirstColumn?: boolean }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead className="border-b border-gray-300 dark:border-gray-700">
        <tr>
          {data.headers.map((header: string, i: number) => (
            <th key={i} className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: string[], i: number) => (
          <tr key={i} className="border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-100 dark:hover:bg-gray-800/40">
            {row.map((cell, j) => (
              <td key={j} className="p-4 text-gray-600 dark:text-gray-400 text-sm align-top">
                {j === 0 && highlightFirstColumn ?
                  <span className="font-semibold text-cyan-700 dark:text-cyan-400">{cell}</span> :
                  cell
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const mcpServerCode = `# sql_server.py
import sqlite3
from mcp.server.fastmcp import FastMCP
from sqlalchemy import create_engine, text
from langchain_community.utilities import SQLDatabase

# Initialize the MCP server with a descriptive name
mcp = FastMCP("DatabaseQueryServer")

# --- Database Connection Setup ---
DB_FILE = "Chinook.db"
engine = create_engine(f"sqlite:///{DB_FILE}")
db = SQLDatabase(engine=engine)

@mcp.tool()
def list_tables() -> str:
    """
    Returns a comma-separated list of available table names in the database.
    Use this tool first to understand what tables you can query.
    """
    return ", ".join(db.get_usable_table_names())

@mcp.tool()
def get_schema_for_tables(tables: str) -> str:
    """
    Returns the schema (CREATE TABLE statement) for a comma-separated list of table names.
    Example input: "Album, Artist"
    """
    try:
        table_list = [table.strip() for table in tables.split(',')]
        return db.get_table_info(table_names=table_list)
    except Exception as e:
        return f"Error retrieving schema: {e}."

@mcp.tool()
def execute_safe_query(sql_query: str) -> str:
    """
    Executes a read-only SQL query and returns the result.
    IMPORTANT: This tool ONLY supports SELECT statements.
    """
    if not sql_query.strip().upper().startswith("SELECT"):
        return "Error: Only SELECT queries are allowed."

    try:
        with engine.connect() as connection:
            result = connection.execute(text(sql_query))
            return str(result.fetchall())
    except Exception as e:
        return f"Error executing query: {e}"

if __name__ == "__main__":
    mcp.run()`;

const langGraphCode = `# agent_graph.py
from typing import List, TypedDict
from langchain_core.messages import BaseMessage
from langgraph.prebuilt import create_react_agent
from langgraph.graph import StateGraph, END
from langchain_community.agent_toolkits import SQLDatabaseToolkit

# 1. Define Agent State
class AgentState(TypedDict):
    question: str
    chat_history: List
    agent_scratchpad: List

# 2. Setup Toolkit and Agent Runnable
toolkit = SQLDatabaseToolkit(db=db, llm=llm)
tools = toolkit.get_tools()
agent_runnable = create_react_agent(llm, tools)

# 3. Define Graph Nodes
def run_agent_reasoning(state: AgentState):
    agent_outcome = agent_runnable.invoke(state)
    return {"agent_scratchpad": agent_outcome.return_values["messages"]}

def execute_tools(state: AgentState):
    tool_calls = state["agent_scratchpad"][-1].tool_calls
    # ... logic to execute tool calls ...
    return {"agent_scratchpad": [tool_output]}

def should_continue(state: AgentState):
    if "final_answer" in state["agent_scratchpad"][-1].content:
        return "end"
    return "continue"

# 4. Build the Graph
workflow = StateGraph(AgentState)
workflow.add_node("agent", run_agent_reasoning)
workflow.add_node("action", execute_tools)
workflow.set_entry_point("agent")
workflow.add_conditional_edges(
    "agent",
    should_continue,
    {"continue": "action", "end": END},
)
workflow.add_edge("action", "agent")

# 5. Compile and run
app = workflow.compile()
inputs = {"question": "How many employees are there?", "chat_history": []}
for s in app.stream(inputs):
    print(s)`;

const contextTechniquesData = {
  headers: ["Technique", "Description", "Implementation", "Pros", "Cons"],
  rows: [
    [
      "Prompt Engineering",
      "Manually embedding descriptions of tables, columns, business rules, and value mappings directly into the agent's system prompt.",
      "The system_message string in the prompt template is augmented with detailed, human-readable explanations of the schema.",
      "Simple to implement for small, stable schemas; offers fine-grained control over the context provided.",
      "Becomes unmanageable and quickly exceeds token limits for large or evolving databases; context is hardcoded and difficult to maintain."
    ],
    [
      "Database Comments",
      "Storing metadata directly within the database using standard SQL COMMENT ON TABLE or COMMENT ON COLUMN statements.",
      "The database schema is modified to include these comments. The application must then include a function to extract these comments and inject them into the table_info string provided to the LLM.",
      "Metadata lives with the data, ensuring it is version-controlled and maintained alongside the schema itself.",
      "Requires database modification permissions; may not be expressive enough for complex business rules or multi-step logic."
    ],
    [
      "RAG on Documentation",
      "Creating a vector store from existing enterprise documentation, such as data dictionaries, business glossaries, or internal wikis. The agent is given a retriever tool to query this knowledge base.",
      "An embedding model (e.g., from Hugging Face) and a vector store (e.g., FAISS, Chroma) are used to index the documentation. A retriever tool is created that the agent can call to 'look up' the business meaning of a table or column before generating SQL.",
      "Can handle vast amounts of unstructured context; effectively decouples documentation from the agent's core prompt, making both easier to maintain.",
      "Adds architectural complexity (vector store, embedding model); introduces the possibility of retrieval errors or irrelevant context being returned."
    ],
    [
      "Curated Views",
      "Creating simplified, denormalized database views with clean, human-readable column names (e.g., customer_status instead of cust_stat_cd) specifically for the LLM to query.",
      "This is a database administration task. The agent is then configured to only see and query these curated views, hiding the complexity of the underlying base tables.",
      "Drastically simplifies the schema the LLM has to reason about, which significantly improves accuracy and query generation performance.",
      "High initial setup and ongoing maintenance effort; may not cover all possible ad-hoc query needs, limiting flexibility."
    ]
  ]
};

const securityData = {
  headers: ["Layer", "Control", "Implementation Details", "Rationale"],
  rows: [
    ["Database", "Strict Read-Only Permissions", "Create a dedicated DB user for the agent with SELECT privileges only. Deny all DML/DDL permissions.", "The most critical line of defense. Prevents any destructive changes to data or schema at the source."],
    ["Database", "Row-Level Security / Views", "Grant the agent access only to database views that pre-filter data based on the user's role.", "Enforces data segregation and 'need-to-know' access policies at the most secure level."],
    ["Application", "Keyword Filtering", "Hardcode a check to reject any query containing forbidden keywords like DELETE, DROP, UPDATE.", "A fast, deterministic failsafe that is not susceptible to prompt injection attacks."],
    ["Application", "Pre-Execution Validation", "Use a tool like LangChain's QuerySQLCheckerTool to have an LLM 'lint' the query for errors before execution.", "A cost-effective circuit breaker to catch syntax errors and reduce failed database calls."],
    ["LLM", "Prompt-Level Guardrails", "Firmly instruct the agent in its system prompt to never generate DML/DDL statements.", "Hardens the model's default behavior, reducing the likelihood of generating harmful code."],
    ["Access", "User-Based Context", "Dynamically filter the schema and examples provided to the LLM based on the authenticated user's permissions.", "Prevents the LLM from even becoming aware of data structures the user is not authorized to see."]
  ]
};

const MCPFoundation = () => (
  <Card id="mcp-foundation">
    <SectionTitle icon={<Share2 size={32} className="text-cyan-600 dark:text-cyan-400" />}>The MCP Foundation</SectionTitle>
    <div className="space-y-6 text-gray-700 dark:text-gray-300">
      <p className="text-lg leading-relaxed">
        The Model Context Protocol (MCP) is an open standard that solves the M×N integration problem. Instead of building custom connectors for every model-to-tool pair, MCP creates a universal interface, turning the problem into a scalable M+N solution.
      </p>

      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 p-6 rounded-lg border border-indigo-300 dark:border-indigo-400/30">
        <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-3">🔌 The &ldquo;USB-C for AI&rdquo;</h3>
        <p className="text-gray-900 dark:text-white">
          MCP standardizes communication between AI applications and external systems, creating a universal connector that eliminates the need for proprietary adapters. Any compliant AI agent can discover, understand, and utilize external tools in a consistent manner.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
          <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-3">🏗️ Client-Server Architecture</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">MCP clients (AI agents) initiate requests for information or tool execution. MCP servers expose APIs, tools, or data sources, processing requests and returning structured responses.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
          <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-3">⚙️ Core Primitives</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Tools (executable functions), Resources (structured data streams), and Prompts (reusable instruction templates) form the foundation of MCP interactions.</p>
        </div>
      </div>

      <CodeBlock title="sql_server.py - MCP Database Server Implementation" code={mcpServerCode} />
    </div>
  </Card>
);

const LangGraphBrain = () => (
  <Card id="langgraph-brain">
    <SectionTitle icon={<GitBranch size={32} className="text-purple-600 dark:text-purple-400" />}>The LangGraph Brain</SectionTitle>
    <div className="space-y-6 text-gray-700 dark:text-gray-300">
      <p className="text-lg leading-relaxed">
        LangChain has evolved from simple chains to LangGraph, a framework for building stateful, cyclic agents. This gives developers full, transparent control over the agent&apos;s reasoning loop with explicit state management and error recovery.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-300 dark:border-purple-400/30">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3">🧠 Explicit State</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Define exactly what information the agent carries between steps, ensuring transparency and debuggability.</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-300 dark:border-purple-400/30">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3">🔄 Cyclic Workflows</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Create complex, multi-step reasoning loops that can adapt and recover from errors dynamically.</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-300 dark:border-purple-400/30">
          <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3">🎯 Production Ready</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Full control over the agent&apos;s decision-making process enables robust error handling and observability.</p>
        </div>
      </div>

      <CodeBlock title="agent_graph.py - LangGraph Workflow Implementation" code={langGraphCode} />
    </div>
  </Card>
);

const ContextProvisioning = () => (
  <Card id="context-provisioning">
    <SectionTitle icon={<Database size={32} className="text-orange-600 dark:text-orange-400" />}>Mastering Context Provisioning</SectionTitle>
    <div className="space-y-8">
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        The quality of generated SQL is entirely dependent on the context provided to the LLM. A successful strategy requires a multi-stage pipeline to overcome challenges like model hallucination, context window limits, and the semantic gap between technical schemas and business concepts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Dynamic Schema Selection" icon={<Route className="w-6 h-6 text-indigo-500"/>}>
          <p>To avoid overwhelming the LLM, the agent first identifies the relevant tables for a user&apos;s query. It then retrieves the schema for only that small subset of tables, keeping the context focused and efficient.</p>
        </InfoCard>

        <InfoCard title="Semantic Layer" icon={<Rss className="w-6 h-6 text-teal-500"/>}>
          <p>Enrich raw database schemas with business context using techniques like database comments, curated views, or a RAG pipeline on enterprise documentation. This bridges the gap between cryptic column names and their real-world meaning.</p>
        </InfoCard>

        <InfoCard title="Few-Shot Prompting" icon={<Beaker className="w-6 h-6 text-amber-500"/>}>
          <p>Dynamically select a few high-quality examples of similar questions and their corresponding correct SQL queries. This guides the model on structure, dialect specifics, and formatting, improving accuracy.</p>
        </InfoCard>

        <InfoCard title="Error Correction Tools" icon={<Puzzle className="w-6 h-6 text-rose-500"/>}>
          <p>Equip the agent with retriever tools to correct common errors, like user misspellings of names in high-cardinality columns, before the SQL query is even generated.</p>
        </InfoCard>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">📋 Context Provisioning Techniques Comparison</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Each approach to context provisioning has distinct trade-offs in terms of implementation complexity, maintenance overhead, and effectiveness. Choose the right combination based on your database size, team capabilities, and accuracy requirements.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-2">
          <DataTable data={contextTechniquesData} highlightFirstColumn={true} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/20 p-6 rounded-lg border border-orange-300 dark:border-orange-400/30">
        <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300 mb-3">💡 Key Strategy</h3>
        <p className="text-gray-900 dark:text-white">
          Context provisioning is not just about providing more information&mdash;it&apos;s about providing the <em>right</em> information at the <em>right</em> time. The best agents use a multi-stage approach: schema discovery → semantic enrichment → few-shot guidance → error correction.
        </p>
      </div>
    </div>
  </Card>
);

const Architecture = () => (
  <Card id="architecture">
    <SectionTitle icon={<Layers size={32} className="text-teal-600 dark:text-teal-400" />}>The Integrated Architecture</SectionTitle>
    <div className="space-y-8">
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        Fusing LangGraph and MCP creates a powerful, decoupled system. LangGraph acts as the orchestration &ldquo;brain,&rdquo; managing the agent&apos;s state and reasoning. MCP provides the standardized &ldquo;nervous system,&rdquo; allowing the brain to communicate with tool &ldquo;limbs&rdquo; via a universal protocol.
      </p>

      <div className="w-full max-w-2xl mx-auto p-6 bg-gray-100 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50">
        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">End-to-End Flow</h3>
        <div className="flex flex-col space-y-2 text-center text-sm font-mono">
          <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">User Interface</div>
          <div className="text-gray-500">▼ HTTP Request</div>
          <div className="p-3 rounded-lg border border-purple-400 dark:border-purple-500/50 bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300">LangGraph Agent (Brain)</div>
          <div className="text-gray-500">▼ MCP Tool Call (via Adapter)</div>
          <div className="p-3 rounded-lg border border-cyan-400 dark:border-cyan-500/50 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">MCP Client</div>
          <div className="text-gray-500">▼ HTTP / stdio</div>
          <div className="p-3 rounded-lg border border-green-400 dark:border-green-500/50 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-300">Custom MCP Server (Limb)</div>
          <div className="text-gray-500">▼ DB Operation</div>
          <div className="p-3 rounded-lg border border-orange-400 dark:border-orange-500/50 bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300">Database</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-teal-300 dark:border-teal-400/30">
          <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-3">🧠 Separation of Concerns</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">The orchestration logic (LangGraph) is completely separate from the tool implementation (MCP servers), enabling independent scaling and updates.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-teal-300 dark:border-teal-400/30">
          <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-3">🔄 Tool Interoperability</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Any MCP-compliant tool can be plugged into any LangGraph agent, fostering a modular ecosystem of AI-ready microservices.</p>
        </div>
      </div>
    </div>
  </Card>
);

const Security = () => (
  <Card id="security">
    <SectionTitle icon={<Shield size={32} className="text-red-600 dark:text-red-400" />}>Productionization & Security</SectionTitle>
    <div className="space-y-8">
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        Executing LLM-generated code against a database is inherently risky. A production-grade system requires a rigorous, defense-in-depth security posture, applying constraints at every layer of the stack. Relying on prompt instructions alone is not enough.
      </p>

      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-300 dark:border-red-400/30">
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-3">⚠️ Defense-in-Depth Strategy</h3>
        <p className="text-gray-900 dark:text-white">
          Security cannot be an afterthought. Every layer&mdash;from database permissions to application logic to LLM prompts&mdash;must implement appropriate controls to prevent unauthorized access and malicious queries.
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-2">
        <DataTable data={securityData} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-red-300 dark:border-red-400/30">
          <ShieldCheck className="text-red-600 dark:text-red-400 mb-3" size={32} />
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Database Layer</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Read-only permissions, row-level security, and dedicated agent users form the foundation of database security.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-yellow-300 dark:border-yellow-400/30">
          <Terminal className="text-yellow-600 dark:text-yellow-400 mb-3" size={32} />
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Application Layer</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Keyword filtering, query validation, and pre-execution checks provide additional safety nets.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-green-300 dark:border-green-400/30">
          <BrainCircuit className="text-green-600 dark:text-green-400 mb-3" size={32} />
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">LLM Layer</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Prompt guardrails and user-based context filtering ensure the model operates within intended boundaries.
          </p>
        </div>
      </div>
    </div>
  </Card>
);

export default function DatabaseAgentsMCPLangChain() {
  return (
    <ArticleFrame
      slug="database-agents-mcp-langchain"
      additionalDisclaimer="Implement appropriate security measures and testing for production database agents."
    >
      <div className="space-y-12">
        <MCPFoundation />
        <LangGraphBrain />
        <ContextProvisioning />
        <Architecture />
        <Security />
      </div>
    </ArticleFrame>
  );
}
