'use client';

import { useState } from 'react';
import { ChevronDown, Database, Brain, Zap, Settings, Target, RefreshCw } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Helper component for colored keyword highlighting
const Highlight = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const colorClasses: { [key: string]: string } = {
    blue: 'text-[#A8672E] dark:text-[#D08F52]',
    teal: 'text-[#A8672E] dark:text-[#D08F52]',
    amber: 'text-amber-600',
    fuchsia: 'text-fuchsia-600',
    lime: 'text-lime-600',
    purple: 'text-purple-600',
    orange: 'text-[#BC4128] dark:text-[#E2694A]',
  };
  return <span className={`font-semibold ${colorClasses[color] || 'text-[#A8672E] dark:text-[#D08F52]'}`}>{children}</span>;
};

// Component for a styled table
const StyledTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:bg-[#0A0D14]/50 my-6 backdrop-blur-sm">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-[#0A0D14] divide-y divide-gray-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-pre-wrap align-top">
                <div className="text-gray-700">{cell}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Component for a collapsible section
const CollapsibleSection = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white dark:bg-[#0A0D14]/80 border border-gray-200/80 rounded-2xl shadow-lg backdrop-blur-xl mb-8 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-xl md:text-2xl font-bold text-gray-800 p-6 focus:outline-none transition-colors duration-300 hover:bg-gray-100/60"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{title}</span>
        </div>
        <ChevronDown
          className={`w-6 h-6 transform transition-transform duration-300 text-gray-500 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? 'max-h-[10000px]' : 'max-h-0'
        }`}
      >
        <div className="prose prose-lg max-w-none text-gray-600 p-6 pt-0">{children}</div>
      </div>
    </div>
  );
};

export default function ArchitecturesOfIntelligence() {
  // Data for the tables
  const chunkingStrategiesData = {
    headers: ["Strategy", "Core Mechanism", "Pros", "Cons", "Ideal Use Cases"],
    rows: [
      ["Fixed-Size Chunking", "Splits text into segments of a fixed number of characters or tokens, with an optional overlap.", "Simple to implement; predictable chunk sizes; computationally efficient.", "Can arbitrarily cut sentences or semantic units, leading to loss of context at boundaries.", "Unstructured or homogeneous text where semantic boundaries are not clear or critical. Quick prototyping."],
      ["Recursive Chunking", "Iteratively splits text using a prioritized list of separators (e.g., \\n\\n, \\n, ., ' ') until chunks are under a specified size.", "Attempts to preserve semantic integrity by splitting along natural boundaries like paragraphs and sentences. Good balance of simplicity and effectiveness.", "Can still result in awkward splits if the text lacks standard formatting.", "General-purpose text documents (articles, reports). Often the best default choice."],
      ["Document-Based Chunking", "Splits text based on its inherent structure, such as Markdown headers, HTML tags, or code function/class definitions.", "Creates highly coherent, context-aware chunks that align with the document's logical organization.", "Brittle; highly dependent on the consistency of the document format. Fails if the structure deviates.", "Highly structured documents like technical manuals, legal texts with articles/sections, or codebases."],
      ["Semantic Chunking", "Uses embedding models to group semantically similar, contiguous sentences together into a single chunk.", "Produces the most thematically coherent chunks, as boundaries are based on meaning rather than syntax or structure.", "Computationally more expensive during the indexing phase; requires an extra model call.", "Narrative text, user-generated content (e.g., reviews), or any text where thematic consistency is more important than structural boundaries."],
      ["Agentic Chunking", "Employs an LLM to analyze the document and decide on the most logical way to split it, simulating human reasoning.", "Potentially the most effective method, as it can understand nuanced context and structure that rule-based methods cannot.", "Highly experimental; extremely high computational cost and latency during indexing.", "Complex, high-value documents where the cost of indexing is justified by the need for maximum retrieval accuracy."],
    ],
  };

  const queryTransformationData = {
    headers: ["Technique", "Core Principle", "Impact on Retrieval", "Computational Cost", "Best For..."],
    rows: [
      ["Multi-Query Retrieval", "Use an LLM to generate multiple query variations from the original input and merge the results.", "Increases recall by covering different facets and phrasings of a user's intent.", "Medium (multiple retrieval operations per user query).", "Complex, multifaceted questions that implicitly contain several sub-questions."],
      ["RAG-Fusion", "Generate multiple queries, retrieve in parallel, then use Reciprocal Rank Fusion (RRF) to re-rank the combined results.", "Improves precision over Multi-Query by intelligently merging and prioritizing results from different query variations.", "Medium-High (adds a re-ranking computation step).", "Applications where the relevance ordering of retrieved documents is critical for the final answer quality."],
      ["Step-Back Prompting", "Use an LLM to generate a more general, abstract question from a specific one. Retrieve using both queries.", "Provides both high-level context and specific details, improving the generator's ability to form a comprehensive answer.", "Medium (requires two retrieval operations).", "Highly specific or jargon-heavy queries that may fail to retrieve broader, explanatory context."],
      ["Hypothetical Document Embeddings (HyDE)", "Use an LLM to generate a \"fake\" answer to the query, then use the embedding of that answer for retrieval.", "Bridges the semantic and structural gap between short queries and long documents, significantly improving retrieval relevance.", "Medium (requires one LLM call before retrieval).", "Short, ambiguous, or keyword-poor queries, especially in specialized domains."],
      ["Query Routing", "Use an LLM to analyze the query and select the most appropriate data source (e.g., vector DB, SQL DB) to query.", "Enables RAG over multiple, heterogeneous knowledge bases by directing the query to the correct tool.", "Low (one LLM call for the routing decision).", "Complex enterprise systems with multiple, distinct and structured/unstructured data sources."],
    ],
  };

  const rerankersData = {
    headers: ["Architecture", "Core Mechanism", "Relative Performance", "Relative Latency/Cost", "Key Examples"],
    rows: [
      ["Cross-Encoders", "Takes the query and a document as a single, concatenated input and passes them through a transformer model to output a single relevance score.", "Very High", "High (Requires a full inference pass per document).", "BGE-Reranker, sentence-transformers, Mixedbread"],
      ["Late Interaction Models", "Encodes the query and document into token-level embeddings separately, then performs a cheap but fine-grained interaction (e.g., max-similarity) between the token embeddings.", "High", "Medium (Document representations can be pre-computed).", "ColBERT"],
      ["LLM-based Re-rankers", "Uses a large language model to perform the re-ranking, prompted with the query and a list of documents (listwise), pairs of documents (pairwise), or single documents (pointwise).", "Very High", "Very High (Most expensive option, multiple LLM calls).", "RankGPT, RankZephyr, RankT5"],
      ["Private APIs", "Managed, proprietary re-ranking models offered as a service.", "High to Very High", "Medium (Cost is per API call, not infrastructure).", "Cohere Rerank, Jina AI, Mixedbread AI"],
    ],
  };

  const promptTemplatesData = {
    headers: ["Template Name/Pattern", "Example Prompt Structure", "Impact on Output (Pros)", "Potential Pitfalls (Cons)"],
    rows: [
      ["Direct Retrieval Pattern", "Using only the provided context below, answer the question. Do not use any prior knowledge.\nCONTEXT: ...\nQUESTION: [User Query]", "Maximizes factual grounding and minimizes hallucination by strictly constraining the model to the provided documents.", "Can lead to overly cautious or \"I don't know\" responses if the context is incomplete or the instruction is too restrictive."],
      ["Chain-of-Thought (CoT) Inspired", "CONTEXT: ...\nQUESTION: [User Query]\nINSTRUCTIONS: First, identify the key points in the context relevant to the question. Second, create an outline for the answer based on these points. Finally, write the full answer.", "Improves reasoning transparency and logical flow. Can lead to more accurate and well-structured answers by forcing a step-by-step process.", "Increases response latency and token consumption due to the intermediate reasoning steps. Can be verbose if not carefully tuned."],
      ["Persona-Based Pattern", "You are an expert financial analyst. Using the following financial reports, answer the user's question in a professional tone, providing clear, data-driven insights.\nCONTEXT: ...\nQUESTION: [User Query]", "Guides the model's tone, style, and domain-specific focus. Enhances personalization and reduces ambiguity in the desired output.", "An overly simplistic persona (e.g., \"explain like I'm a beginner\") might cause the model to omit crucial nuances relevant to an expert user."],
      ["Error Handling (\"I Don't Know\") Pattern", "Use the provided documents to answer the question. If the documents do not contain enough information to form a confident answer, respond with: \"The provided materials are not sufficient to answer this question.\"", "Provides a clear, safe \"escape hatch\" for the model, significantly reducing the likelihood of hallucination when information is absent.", "May encourage the model to default to the \"I don't know\" response too easily if not balanced with strong grounding instructions."],
      ["Multi-Pass Refinement", "Generate an initial answer based on the retrieved context. Then, review your initial answer for factual consistency with the source documents and refine it to improve accuracy and clarity.", "Encourages the model to self-correct and iterate, improving the factual consistency and overall quality of the final response.", "Significantly increases processing time and cost as it involves multiple generation steps for a single query."],
    ],
  };

  return (
    <ArticleFrame
      slug="architectures-intelligence-advanced-rag-context-engineering"
      additionalDisclaimer="The techniques and architectures discussed require careful implementation and testing in production environments. Always validate approaches with your specific use case and data."
    >
      <CollapsibleSection
        title="The Evolution: From Prompting to Context Engineering"
        icon={<Brain className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />}
      >
        <h3>Defining the Modern AI Stack</h3>
        <p>Production-grade AI systems are more than an API call. Foundational models are powerful but have key limitations:</p>
        <ul>
          <li><Highlight color="amber">Static Knowledge:</Highlight> Information is frozen in time, leading to outdated or &ldquo;hallucinated&rdquo; responses.</li>
          <li><Highlight color="amber">Lack of Specificity:</Highlight> They lack proprietary, domain-specific knowledge (e.g., your company&apos;s internal docs).</li>
          <li><Highlight color="amber">High Cost of Retraining:</Highlight> Fine-tuning is prohibitively expensive and slow for continuous updates.</li>
        </ul>
        <p><Highlight color="fuchsia">Retrieval-Augmented Generation (RAG)</Highlight> is the architectural solution, dynamically providing the LLM with up-to-date, external knowledge at inference time.</p>

        <h3>From Prompt Engineering to Context Engineering</h3>
        <p>The field has matured from a narrow focus on prompts to a holistic architectural discipline.</p>
        <ul>
          <li><Highlight color="teal">Prompt Engineering:</Highlight> The art of designing a single textual input to guide an AI. Essential, but insufficient for complex, stateful applications.</li>
          <li><Highlight color="blue">Context Engineering:</Highlight> The science of designing systems to provide the LLM with the right information, tools, and memory. It&apos;s about architecting <Highlight color="blue">what the model knows</Highlight>. This engineered context is a dynamic composite of:
            <ul>
              <li>System Instructions (Persona, Goals)</li>
              <li>Chat History (Short-term memory)</li>
              <li>Retrieved Information (Long-term memory via RAG)</li>
              <li>Tool Definitions & API Responses</li>
            </ul>
          </li>
        </ul>
        <p>This reframes AI development as a systems design problem, where failures are often <Highlight color="amber">context failures</Highlight>, not model failures.</p>
      </CollapsibleSection>

      <CollapsibleSection
        title="Pre-Retrieval: Optimizing the Knowledge Corpus"
        icon={<Database className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />}
      >
        <h3>The Critical Role of Document Chunking</h3>
        <p>Chunking is splitting large documents into smaller, semantically meaningful snippets. The core challenge is balancing <Highlight color="lime">precision</Highlight> (small chunks for specific queries) and <Highlight color="lime">context</Highlight> (large chunks to preserve meaning). The ideal chunk is large enough to be coherent but small enough to be topically focused.</p>

        <StyledTable headers={chunkingStrategiesData.headers} rows={chunkingStrategiesData.rows} />

        <h3>Embedding Strategies for Semantic Fidelity</h3>
        <p>Embedding converts text chunks into numerical vectors. The choice of embedding model is critical (see MTEB leaderboard). An advanced technique is <Highlight color="blue">Contextual Embeddings</Highlight>, where an LLM generates a summary of a chunk&apos;s surrounding context *before* embedding, dramatically improving retrieval performance by enriching the vector with necessary context.</p>
      </CollapsibleSection>

      <CollapsibleSection
        title="Enhancing Retrieval: Advanced Query Transformation"
        icon={<Zap className="w-6 h-6 text-amber-600" />}
      >
        <p>User queries are often ambiguous. Query transformation uses an LLM to refine the user&apos;s query <Highlight color="amber">before</Highlight> retrieval to bridge the &ldquo;vocabulary gap.&rdquo;</p>

        <StyledTable headers={queryTransformationData.headers} rows={queryTransformationData.rows} />
      </CollapsibleSection>

      <CollapsibleSection
        title="Post-Retrieval: Curation and Refinement"
        icon={<Target className="w-6 h-6 text-purple-600" />}
      >
        <h3>The &ldquo;Lost in the Middle&rdquo; Problem</h3>
        <p>LLMs recall information at the beginning and end of a long context window far better than information in the middle. This positional bias can cause the model to ignore relevant retrieved documents.</p>
        <ul>
          <li><strong>The Solution:</strong> <Highlight color="lime">Context Re-ranking</Highlight>. A re-ranker scores each document for relevance, then reorders them to place the most important ones at the start and end of the context, moving them into the LLM&apos;s attentional &ldquo;spotlight&rdquo;.</li>
        </ul>

        <h3>Re-ranking for Precision</h3>
        <p>A two-stage process to balance speed and accuracy:</p>
        <ol>
          <li><strong>First-Stage Retriever:</strong> Fast, optimized for <Highlight color="lime">recall</Highlight> (finds all potential candidates).</li>
          <li><strong>Second-Stage Re-ranker:</strong> Slower, more powerful model optimized for <Highlight color="lime">precision</Highlight> (sorts the truly relevant documents to the top).</li>
        </ol>

        <StyledTable headers={rerankersData.headers} rows={rerankersData.rows} />
      </CollapsibleSection>

      <CollapsibleSection
        title="The Augmentation Stage: Advanced Prompting for RAG"
        icon={<Settings className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]" />}
      >
        <h3>Structuring the Augmented Prompt</h3>
        <p>A well-structured prompt uses delimiters (e.g., XML tags like `&lt;context&gt;`) to help the LLM distinguish between system instructions, retrieved context, and the user query. Formatting the context itself by numbering chunks or prepending metadata also improves clarity.</p>

        <StyledTable headers={promptTemplatesData.headers} rows={promptTemplatesData.rows} />

        <h3>The Power of Instructional Phrasing</h3>
        <ul>
          <li><strong>Grounding:</strong> Explicitly instruct the model to base its answer <Highlight color="amber">only</Highlight> on the provided documents.</li>
          <li><strong>Handling Uncertainty:</strong> Give the model a safe &ldquo;escape hatch.&rdquo; Instead of &ldquo;do not hallucinate,&rdquo; provide a positive directive: &ldquo;If the information is not in the documents, state that it is unavailable.&rdquo;</li>
          <li><strong>Explaining the &ldquo;Why&rdquo;:</strong> Explaining the rationale behind an instruction (e.g., &ldquo;Be concise *because the user needs a summary*&rdquo;) improves compliance.</li>
        </ul>
      </CollapsibleSection>

      <CollapsibleSection
        title="Agentic RAG: Self-Correction and Critique Loops"
        icon={<RefreshCw className="w-6 h-6 text-fuchsia-600" />}
      >
        <h3>Moving Beyond Linear Pipelines</h3>
        <p>Advanced RAG moves beyond linear pipelines (`retrieve &rarr; augment &rarr; generate`) to cyclical, agentic systems. This requires modeling the process as a <Highlight color="blue">state machine</Highlight> or graph, where the system can loop back and self-correct (e.g., rewrite a query if retrieval fails). Frameworks like <Highlight color="teal">LangGraph</Highlight> facilitate building these complex flows.</p>

        <h3>Key Agentic Techniques</h3>
        <ul>
          <li><Highlight color="fuchsia">Corrective RAG (CRAG):</Highlight> Introduces a lightweight &ldquo;retrieval evaluator&rdquo; that acts as a quality gate. If retrieved docs are irrelevant, it triggers a corrective action, like a web search.</li>
          <li><Highlight color="fuchsia">SELF-RAG:</Highlight> A framework where the LLM controls its own process by generating special &ldquo;reflection tokens&rdquo; to decide if retrieval is needed, grade document relevance, and critique its own generated sentences for factual support.</li>
        </ul>

        <h3>The Core Loop: Generate &rarr; Critique &rarr; Refine</h3>
        <p>This iterative cycle is the future of reliable AI. The model produces a draft, which is then evaluated (by the LLM itself or an external tool like a code interpreter). The feedback is used to generate an improved response.</p>
      </CollapsibleSection>

      <CollapsibleSection
        title="Conclusion and Strategic Recommendations"
        icon={<Brain className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />}
      >
        <h3>A Unified Framework for RAG Optimization</h3>
        <p>The optimal RAG architecture is a holistic system following a multi-stage pipeline with embedded feedback loops: <Highlight color="lime">Pre-Retrieval &rarr; Retrieval &rarr; Post-Retrieval &rarr; Generation &rarr; Refinement</Highlight>.</p>

        <h3>Recommendations for Practitioners (Tiered Approach)</h3>
        <ul>
          <li><strong>Level 1 (Baseline RAG):</strong> Simple pipeline for proofs-of-concept.</li>
          <li><strong>Level 2 (Optimized Retrieval RAG):</strong> Adds a <Highlight color="lime">re-ranker</Highlight> and <Highlight color="teal">query transformation</Highlight>. Ideal for most production systems.</li>
          <li><strong>Level 3 (Advanced Context RAG):</strong> Adds <Highlight color="blue">context compression</Highlight> and advanced reasoning patterns like <Highlight color="teal">Chain-of-Thought</Highlight>.</li>
          <li><strong>Level 4 (Agentic RAG):</strong> Implements <Highlight color="fuchsia">self-correction loops</Highlight> for mission-critical applications requiring maximum reliability.</li>
        </ul>
      </CollapsibleSection>
    </ArticleFrame>
  );
}
