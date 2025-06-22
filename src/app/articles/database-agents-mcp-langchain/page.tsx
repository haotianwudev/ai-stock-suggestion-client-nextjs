'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Puzzle, Database, ShieldCheck, GitBranch, Share2, BrainCircuit, Terminal, FileCode, Beaker, Zap, Shield, Rss, Route, Menu, X, BookOpen } from 'lucide-react';

const navigationItems = [
  { id: 'mcp-foundation', label: 'MCP Foundation', icon: Share2 },
  { id: 'langgraph-brain', label: 'LangGraph Orchestration', icon: GitBranch },
  { id: 'context-provisioning', label: 'Context Provisioning', icon: Database },
  { id: 'architecture', label: 'Integrated Architecture', icon: Layers },
  { id: 'security', label: 'Security & Production', icon: Shield },
];

const Card = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <div id={id} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-cyan-300 mb-6 flex items-center">
        {icon}
        <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">{children}</span>
    </h2>
);

const CodeBlock = ({ title, code, language = 'python' }: { title: string; code: string; language?: string }) => (
  <div className="bg-gray-900/70 border border-gray-700 rounded-xl overflow-hidden my-6">
    <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-700 flex items-center">
      <FileCode className="w-4 h-4 mr-2 text-gray-400" />
      <span className="text-sm font-medium text-gray-300">{title}</span>
    </div>
    <pre className="p-4 text-sm overflow-x-auto">
      <code className={`language-${language} text-gray-300`}>{code.trim()}</code>
    </pre>
  </div>
);

const InfoCard = ({ title, children, icon }: { title: string; children: React.ReactNode; icon: React.ReactNode }) => (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 h-full flex flex-col">
        <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-700/50 rounded-lg mr-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-gray-400 space-y-2">{children}</div>
    </div>
);

const SecurityTable = ({ data }: { data: any }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead className="border-b border-gray-700">
        <tr>
          {data.headers.map((header: string, i: number) => (
            <th key={i} className="p-4 text-sm font-semibold text-gray-300">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: string[], i: number) => (
          <tr key={i} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/40">
            {row.map((cell, j) => (
              <td key={j} className="p-4 text-gray-400 text-sm align-top">
                {j === 0 ? <span className="font-semibold text-cyan-400">{cell}</span> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Sample code blocks based on the research
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

// Security data based on the research
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
        <SectionTitle icon={<Share2 size={32} className="text-cyan-400" />}>The MCP Foundation</SectionTitle>
        <div className="space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
                The Model Context Protocol (MCP) is an open standard that solves the M×N integration problem. Instead of building custom connectors for every model-to-tool pair, MCP creates a universal interface, turning the problem into a scalable M+N solution.
            </p>
            
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-6 rounded-lg border border-indigo-400/30">
                <h3 className="text-xl font-semibold text-indigo-300 mb-3">🔌 The "USB-C for AI"</h3>
                <p className="text-white">
                    MCP standardizes communication between AI applications and external systems, creating a universal connector that eliminates the need for proprietary adapters. Any compliant AI agent can discover, understand, and utilize external tools in a consistent manner.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-400/30">
                    <h4 className="font-bold text-cyan-300 mb-3">🏗️ Client-Server Architecture</h4>
                    <p className="text-gray-400 text-sm">MCP clients (AI agents) initiate requests for information or tool execution. MCP servers expose APIs, tools, or data sources, processing requests and returning structured responses.</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-400/30">
                    <h4 className="font-bold text-cyan-300 mb-3">⚙️ Core Primitives</h4>
                    <p className="text-gray-400 text-sm">Tools (executable functions), Resources (structured data streams), and Prompts (reusable instruction templates) form the foundation of MCP interactions.</p>
                </div>
            </div>

            <CodeBlock title="sql_server.py - MCP Database Server Implementation" code={mcpServerCode} />
        </div>
    </Card>
);

const LangGraphBrain = () => (
    <Card id="langgraph-brain">
        <SectionTitle icon={<GitBranch size={32} className="text-purple-400" />}>The LangGraph Brain</SectionTitle>
        <div className="space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
                LangChain has evolved from simple chains to LangGraph, a framework for building stateful, cyclic agents. This gives developers full, transparent control over the agent's reasoning loop with explicit state management and error recovery.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30">
                    <h4 className="font-bold text-purple-300 mb-3">🧠 Explicit State</h4>
                    <p className="text-gray-400 text-sm">Define exactly what information the agent carries between steps, ensuring transparency and debuggability.</p>
                </div>
                <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30">
                    <h4 className="font-bold text-purple-300 mb-3">🔄 Cyclic Workflows</h4>
                    <p className="text-gray-400 text-sm">Create complex, multi-step reasoning loops that can adapt and recover from errors dynamically.</p>
                </div>
                <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30">
                    <h4 className="font-bold text-purple-300 mb-3">🎯 Production Ready</h4>
                    <p className="text-gray-400 text-sm">Full control over the agent's decision-making process enables robust error handling and observability.</p>
                </div>
            </div>

            <CodeBlock title="agent_graph.py - LangGraph Workflow Implementation" code={langGraphCode} />
        </div>
    </Card>
);

const ContextProvisioning = () => (
    <Card id="context-provisioning">
        <SectionTitle icon={<Database size={32} className="text-orange-400" />}>Mastering Context Provisioning</SectionTitle>
        <div className="space-y-8">
            <p className="text-gray-300 text-lg leading-relaxed">
                The quality of generated SQL is entirely dependent on the context provided to the LLM. A successful strategy requires a multi-stage pipeline to overcome challenges like model hallucination, context window limits, and the semantic gap between technical schemas and business concepts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard title="Dynamic Schema Selection" icon={<Route className="w-6 h-6 text-indigo-400"/>}>
                    <p>To avoid overwhelming the LLM, the agent first identifies the relevant tables for a user's query. It then retrieves the schema for only that small subset of tables, keeping the context focused and efficient.</p>
                </InfoCard>
                
                <InfoCard title="Semantic Layer" icon={<Rss className="w-6 h-6 text-teal-400"/>}>
                    <p>Enrich raw database schemas with business context using techniques like database comments, curated views, or a RAG pipeline on enterprise documentation. This bridges the gap between cryptic column names and their real-world meaning.</p>
                </InfoCard>
                
                <InfoCard title="Few-Shot Prompting" icon={<Beaker className="w-6 h-6 text-amber-400"/>}>
                    <p>Dynamically select a few high-quality examples of similar questions and their corresponding correct SQL queries. This guides the model on structure, dialect specifics, and formatting, improving accuracy.</p>
                </InfoCard>
                
                <InfoCard title="Error Correction Tools" icon={<Puzzle className="w-6 h-6 text-rose-400"/>}>
                    <p>Equip the agent with retriever tools to correct common errors, like user misspellings of names in high-cardinality columns, before the SQL query is even generated.</p>
                </InfoCard>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-amber-900/20 p-6 rounded-lg border border-orange-400/30">
                <h3 className="text-xl font-semibold text-orange-300 mb-3">💡 Key Strategy</h3>
                <p className="text-white">
                    Context provisioning is not just about providing more information—it's about providing the <em>right</em> information at the <em>right</em> time. The best agents use a multi-stage approach: schema discovery → semantic enrichment → few-shot guidance → error correction.
                </p>
            </div>
        </div>
    </Card>
);

const Architecture = () => (
    <Card id="architecture">
        <SectionTitle icon={<Layers size={32} className="text-teal-400" />}>The Integrated Architecture</SectionTitle>
        <div className="space-y-8">
            <p className="text-gray-300 text-lg leading-relaxed">
                Fusing LangGraph and MCP creates a powerful, decoupled system. LangGraph acts as the orchestration "brain," managing the agent's state and reasoning. MCP provides the standardized "nervous system," allowing the brain to communicate with tool "limbs" via a universal protocol.
            </p>
            
            <div className="w-full max-w-2xl mx-auto p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                <h3 className="text-xl font-bold text-center text-white mb-4">End-to-End Flow</h3>
                <div className="flex flex-col space-y-2 text-center text-sm font-mono">
                    <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 text-gray-300">User Interface</div>
                    <div className="text-gray-500">▼ HTTP Request</div>
                    <div className="p-3 rounded-lg border border-purple-500/50 bg-purple-500/10 text-purple-300">LangGraph Agent (Brain)</div>
                    <div className="text-gray-500">▼ MCP Tool Call (via Adapter)</div>
                    <div className="p-3 rounded-lg border border-cyan-500/50 bg-cyan-500/10 text-cyan-300">MCP Client</div>
                    <div className="text-gray-500">▼ HTTP / stdio</div>
                    <div className="p-3 rounded-lg border border-green-500/50 bg-green-500/10 text-green-300">Custom MCP Server (Limb)</div>
                    <div className="text-gray-500">▼ DB Operation</div>
                    <div className="p-3 rounded-lg border border-orange-500/50 bg-orange-500/10 text-orange-300">Database</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-teal-400/30">
                    <h4 className="font-bold text-teal-300 mb-3">🧠 Separation of Concerns</h4>
                    <p className="text-gray-400 text-sm">The orchestration logic (LangGraph) is completely separate from the tool implementation (MCP servers), enabling independent scaling and updates.</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-teal-400/30">
                    <h4 className="font-bold text-teal-300 mb-3">🔄 Tool Interoperability</h4>
                    <p className="text-gray-400 text-sm">Any MCP-compliant tool can be plugged into any LangGraph agent, fostering a modular ecosystem of AI-ready microservices.</p>
                </div>
            </div>
        </div>
    </Card>
);

const Security = () => (
    <Card id="security">
        <SectionTitle icon={<Shield size={32} className="text-red-400" />}>Productionization & Security</SectionTitle>
        <div className="space-y-8">
            <p className="text-gray-300 text-lg leading-relaxed">
                Executing LLM-generated code against a database is inherently risky. A production-grade system requires a rigorous, defense-in-depth security posture, applying constraints at every layer of the stack. Relying on prompt instructions alone is not enough.
            </p>
            
            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30">
                <h3 className="text-xl font-semibold text-red-300 mb-3">⚠️ Defense-in-Depth Strategy</h3>
                <p className="text-white">
                    Security cannot be an afterthought. Every layer—from database permissions to application logic to LLM prompts—must implement appropriate controls to prevent unauthorized access and malicious queries.
                </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-2">
                <SecurityTable data={securityData} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-red-400/30">
                    <ShieldCheck className="text-red-400 mb-3" size={32} />
                    <h4 className="text-lg font-bold text-white mb-3">Database Layer</h4>
                    <p className="text-gray-300 text-sm">
                        Read-only permissions, row-level security, and dedicated agent users form the foundation of database security.
                    </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-yellow-400/30">
                    <Terminal className="text-yellow-400 mb-3" size={32} />
                    <h4 className="text-lg font-bold text-white mb-3">Application Layer</h4>
                    <p className="text-gray-300 text-sm">
                        Keyword filtering, query validation, and pre-execution checks provide additional safety nets.
                    </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-green-400/30">
                    <BrainCircuit className="text-green-400 mb-3" size={32} />
                    <h4 className="text-lg font-bold text-white mb-3">LLM Layer</h4>
                    <p className="text-gray-300 text-sm">
                        Prompt guardrails and user-based context filtering ensure the model operates within intended boundaries.
                    </p>
                </div>
            </div>
        </div>
    </Card>
);

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('mcp-foundation');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-cyan-600 text-white p-3 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Sidebar */}
      <nav className={`fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-md border-r border-white/10 p-6 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-80`}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-300 mb-6">Table of Contents</h3>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  activeSection === item.id
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default function DatabaseAgentsMCPLangChain() {
  const [activeSection, setActiveSection] = useState('mcp-foundation');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <div className="relative isolate overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_45rem_at_top_right,_#1e3a8a_20%,_transparent_100%)] opacity-30"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 -mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>

        {/* Header */}
        <header className="py-6 px-4 border-b border-white/10 relative">
          <div className="container max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-200 border border-purple-400">
                  Deep Research
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-gray-800 p-3 rounded-xl mb-4 border border-gray-700">
                <BrainCircuit className="w-10 h-10 text-cyan-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500">
                Database Agents with MCP and LangChain
              </h1>
              <p className="mt-2 text-lg text-gray-300">Architecting Production-Grade Database Agents</p>
              <p className="mt-2 text-sm text-gray-400">A synergistic approach using Model Context Protocol and LangGraph</p>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="md:ml-80 px-4 py-8 md:py-12">
          <div className="container max-w-4xl mx-auto space-y-12">
            <MCPFoundation />
            <LangGraphBrain />
            <ContextProvisioning />
            <Architecture />
            <Security />
          </div>
        </main>

        {/* Footer */}
        <footer className="md:ml-80 text-center py-6 mt-12 border-t border-white/10">
          <div className="container max-w-4xl mx-auto px-4">
            <p className="text-sm text-gray-500 mb-4">
              This analysis is for educational and informational purposes only. 
              Implement appropriate security measures and testing for production database agents.
            </p>
            <div className="flex justify-center">
              <a
                href="https://docs.google.com/document/d/e/2PACX-1vQbotcpzfYJwup5fVXlooM7bPuG6Q_6nP8Af-ZJB558XCuJz0rOE1mJf_NUte_7dnNC3BiUamG_m7AH/pub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Read Full Research Document
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 