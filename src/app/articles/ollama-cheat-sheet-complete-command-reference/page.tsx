'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Terminal, Database, Cloud, Copy, Check, Sparkles, Globe, Printer } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Component to handle print-specific CSS rules
const PrintStyles = () => (
  <style jsx={true} global={true}>{`
    @media print {
      @page {
        size: A4;
        margin: 0.5cm;
      }
      * {
        font-size: 11px !important;
        line-height: 1.2 !important;
      }
      html, body {
        background-color: #fff !important;
        color: #000 !important;
      }
      .container {
        max-width: none !important;
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .print-header {
        font-size: 20px !important;
        margin-bottom: 12px !important;
        text-align: center;
      }
      header img {
        height: 32px !important;
        margin-bottom: 8px !important;
      }
      .print-section-title {
        font-size: 14px !important;
        margin-bottom: 8px !important;
        margin-top: 12px !important;
      }
      .command-card {
        page-break-inside: avoid;
        margin-bottom: 6px !important;
        padding: 8px !important;
        border: 1px solid #ddd !important;
      }
      .command-card-command {
        color: #000 !important;
        background-color: #f3f4f6 !important;
        font-size: 10px !important;
        padding: 3px 5px !important;
        margin-bottom: 3px !important;
      }
      .command-card-description {
        font-size: 10px !important;
        margin-bottom: 3px !important;
      }
      .command-card-example-code {
        color: #000 !important;
        font-size: 9px !important;
      }
      .command-card-example-label {
        font-size: 10px !important;
        margin-bottom: 1px !important;
      }
      .command-card-example-container {
        padding: 3px !important;
        background-color: #f3f4f6 !important;
      }
      .print-grid {
        display: grid !important;
        grid-template-columns: repeat(4, 1fr) !important;
        gap: 8px !important;
        width: 100% !important;
      }
      .print-footer {
        font-size: 8px !important;
        margin-top: 12px !important;
        text-align: center;
      }
      a {
        color: #000 !important;
        text-decoration: none;
      }
      a[href^="http"]:after {
        content: " (" attr(href) ")";
        font-size: 6px !important;
        font-weight: normal;
        color: #333;
      }
      .print-hide {
        display: none !important;
      }
    }
  `}</style>
);

// Section Component
function CheatSheetSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 flex items-center print-section-title">
        <span className="print-hide">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

// Command Card Component
function CommandCard({ command, description, example, isLinkList = false }: { command: string; description: string; example: string; isLinkList?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (textToCopy: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    document.body.removeChild(textArea);
  };

  const renderExample = () => {
    if (isLinkList) {
        const links = example.split('\n');
        return (
            <div className="flex flex-col space-y-2">
                {links.map((link: string, i: number) => (
                    <a 
                        key={i} 
                        href={`https://${link}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 font-mono text-sm hover:underline flex items-center"
                    >
                        <Globe className="w-3 h-3 mr-2 print:hidden" />
                        {link}
                    </a>
                ))}
            </div>
        )
    }
    return (
        <code className="text-green-700 font-mono text-sm whitespace-pre-wrap break-words command-card-example-code">
            {example}
        </code>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-shadow duration-300 print:shadow-none print:border-gray-400 command-card">
      <div>
        <div className="flex justify-between items-start mb-3">
          <code className="text-blue-600 font-mono bg-gray-100 px-2 py-1 rounded text-sm sm:text-base break-words command-card-command">
            {command}
          </code>
          <button
            onClick={() => handleCopy(command)}
            className={`p-2 rounded-md transition-colors duration-200 print-hide ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            aria-label="Copy command"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-4 command-card-description">{description}</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-500 text-sm mb-1 command-card-example-label">
          {isLinkList ? "Links:" : "Example:"}
        </h4>
        <div className="flex justify-between items-center bg-gray-100 rounded p-2 command-card-example-container">
            {renderExample()}
            {!isLinkList && (
              <button
                  onClick={() => handleCopy(example)}
                  className="ml-2 p-1.5 rounded-md bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700 transition-colors print-hide"
                  aria-label="Copy example"
              >
                  <Copy className="w-4 h-4" />
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

// Main Article Component
export default function OllamaCheatSheetArticle() {
  const currentArticle = articles.find(article => article.slug === 'ollama-cheat-sheet-complete-command-reference');

  const cheatSheetData = [
    {
      category: 'Model Management',
      icon: <Database className="w-6 h-6 mr-3 text-blue-500" />,
      commands: [
        {
          command: 'ollama pull <model_name>',
          description: 'Downloads a model from the Ollama library.',
          example: 'ollama pull llama3',
        },
        {
          command: 'ollama list',
          description: 'Lists all models that you have downloaded.',
          example: 'ollama list',
        },
        {
          command: 'ollama rm <model_name>',
          description: 'Deletes a model from your local machine.',
          example: 'ollama rm llama3',
        },
        {
          command: 'ollama cp <source_model> <new_name>',
          description: 'Creates a copy of a model.',
          example: 'ollama cp llama3 my-llama3-copy',
        },
      ],
    },
    {
      category: 'Running Models',
      icon: <Terminal className="w-6 h-6 mr-3 text-green-500" />,
      commands: [
        {
          command: 'ollama run <model_name>',
          description: 'Starts a conversation with a model.',
          example: 'ollama run llama3',
        },
        {
          command: 'ollama run <model_name> "Your prompt"',
          description: 'Runs a model with a single prompt and exits.',
          example: 'ollama run llama3 "What is the capital of France?"',
        },
        {
            command: '/set verbose',
            description: 'Inside a chat, toggles verbose mode to see more details.',
            example: '/set verbose'
        },
        {
            command: '/show info',
            description: 'Inside a chat, shows information about the current model.',
            example: '/show info'
        },
      ],
    },
    {
      category: 'Modelfile Commands',
      icon: <FileText className="w-6 h-6 mr-3 text-purple-500" />,
      commands: [
        {
          command: 'ollama create <model_name> -f ./Modelfile',
          description: 'Creates a model from a Modelfile.',
          example: 'ollama create my-custom-model -f ./Modelfile',
        },
        {
          command: 'FROM <base_model>',
          description: '(In Modelfile) Specifies the base model to use.',
          example: 'FROM llama3',
        },
        {
          command: 'PARAMETER <name> <value>',
          description: '(In Modelfile) Sets a parameter for the model.',
          example: 'PARAMETER temperature 0.7',
        },
        {
          command: 'SYSTEM """..."""',
          description: '(In Modelfile) Sets a system-level message.',
          example: 'SYSTEM """You are a helpful AI assistant."""',
        },
      ],
    },
    {
      category: 'API & Server',
      icon: <Cloud className="w-6 h-6 mr-3 text-yellow-500" />,
      commands: [
        {
          command: 'ollama serve',
          description: 'Starts the Ollama server. It usually runs in the background.',
          example: 'ollama serve',
        },
        {
          command: 'curl http://localhost:11434/api/generate -d \'{ ... }\'',
          description: 'Use the API to generate a response. (Check docs for JSON).',
          example: `curl http://localhost:11434/api/generate -d '{ "model": "llama3", "prompt": "Why is the sky blue?" }'`,
        },
         {
          command: 'curl http://localhost:11434/api/tags',
          description: 'Fetches the list of local models via the API.',
          example: `curl http://localhost:11434/api/tags`,
        },
      ],
    },
    {
      category: 'Advanced Tips & Useful Tools',
      icon: <Sparkles className="w-6 h-6 mr-3 text-cyan-500" />,
      commands: [
        {
          command: 'Tool Calling / Internet Access',
          description: 'Models can\'t access the internet directly. Use "Tool Calling" with a library like ollama-python to have the model request external data (e.g., search results), which your code provides.',
          example: `// Your Python code detects this request from the model\n// then calls a search API and feeds results back in.`,
        },
        {
          command: 'Open WebUI (Docker)',
          description: 'A powerful, self-hosted web UI for Ollama. Supports RAG, multi-model chat, and more. Run with Docker for an easy setup.',
          example: 'docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main',
        },
        {
          command: 'Important Websites',
          description: 'Official resources for documentation, updates, community tools, and SOPHIE\'s Daddy Blog.',
          example: 'ollama.com\ngithub.com/ollama/ollama\nopenwebui.com\nsophie-ai-finance.com',
        },
      ],
    },
  ];

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}
      
      <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
        <PrintStyles />
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {/* Return to Home Button */}
          <div className="flex items-center gap-4 mb-4 print-hide">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          <header className="text-center mb-8 sm:mb-12 print:mb-6">
            <div className="flex justify-center items-center mb-4">
              <img 
                src="https://ollama.com/public/ollama.png" 
                alt="Ollama Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 print-header">Ollama Cheat Sheet</h1>
            <p className="text-lg text-gray-600 print-hide">Your quick guide to Ollama commands and advanced usage.</p>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 print-hide"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Cheat Sheet
            </button>
          </header>

          <main className="space-y-12 print:space-y-8">
            {cheatSheetData.map((section, index) => (
              <CheatSheetSection key={index} title={section.category} icon={section.icon}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 print-grid">
                  {section.commands.map((cmd, cmdIndex) => (
                    <CommandCard
                      key={cmdIndex}
                      command={cmd.command}
                      description={cmd.description}
                      example={cmd.example}
                      isLinkList={cmd.command === 'Important Websites'}
                    />
                  ))}
                </div>
              </CheatSheetSection>
            ))}
          </main>
          
          <footer className="text-center mt-12 text-gray-500 print-footer">
            <p>Created for easy reference. For more details, check the official Ollama documentation. &copy; 2025 SOPHIE's Daddy Quant Blog (sophie-ai-finance.com). Educational content for informational purposes only.</p>
          </footer>
        </div>
      </div>
    </>
  );
} 