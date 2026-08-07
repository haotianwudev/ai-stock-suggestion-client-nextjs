const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/articles/warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Imports
content = content.replace(
  /import \{ articles \} from '@\/data\/articles';\r?\nimport \{ StructuredData, BreadcrumbStructuredData \} from '@\/components\/seo\/structured-data';\r?\nimport \{ FullScreenImageViewer \} from '@\/components\/ui\/full-screen-image-viewer';/,
  `import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';`
);

// 2. Remove the currentArticle and SEO from export default function KevinWarshAnalysis()
content = content.replace(
  /export default function KevinWarshAnalysis\(\) \{\r?\n  const \[isImageViewerOpen, setIsImageViewerOpen\] = useState\(false\);\r?\n  \r?\n  \/\/ Find current article for SEO[\s\S]*?<main className="max-w-5xl mx-auto px-6 py-16 space-y-20">\r?\n          \{\/\* Executive Summary Hero \*\/\}\r?\n          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-2xl">\r?\n            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"><\/div>\r?\n            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"><\/div>\r?\n            <div className="relative p-12 md:p-16">\r?\n              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white\/10 backdrop-blur-sm border border-white\/20 text-sm font-medium text-teal-300 mb-6">\r?\n                <Activity size={16} \/>\r?\n                <span>Strategic Pivot: Jan 30, 2026<\/span>\r?\n              <\/div>\r?\n              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">\r?\n                The Reconfiguration of <br\/>\r?\n                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">American Monetary Policy<\/span>\r?\n              <\/h1>\r?\n              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">\r?\n                The nomination of Kevin Warsh as Federal Reserve Chair marks a definitive inflection point\. We are moving from "financial dominance" to a "barbell" strategy of aggressive rate cuts paired with balance sheet destruction\.\r?\n              <\/p>/,
  `export default function KevinWarshAnalysis() {\n  return (\n    <ArticleFrame slug="warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism">\n          {/* Executive Summary Hero */}\n          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-2xl mt-8 mb-12">\n            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>\n            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>\n            <div className="relative p-12 md:p-16">`
);

// 3. Infographic section
content = content.replace(
  /\{\/\* Strategic Infographic - Visual Summary of Key Concepts \*\/\}[\s\S]*?<FullScreenImageViewer[\s\S]*?\/>/,
  `<section className="max-w-5xl mx-auto py-12">\n        <InfographicSlot alt="Kevin Warsh Fed Analysis Infographic - Complete Framework Overview" />\n      </section>`
);

// 4. CTA and Footer
content = content.replace(
  /\{\/\* Call-to-Action Section \*\/\}[\s\S]*?<\/>/,
  `    </ArticleFrame>`
);

fs.writeFileSync(filePath, content);
console.log('Fixed warsh fully');
