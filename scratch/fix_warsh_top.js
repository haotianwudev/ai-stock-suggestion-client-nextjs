const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/articles/warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace imports
content = content.replace(
  /import \{ articles \} from '@\/data\/articles';[\s\S]*?import \{ FullScreenImageViewer \} from '@\/components\/ui\/full-screen-image-viewer';/,
  `import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';`
);

// Replace currentArticle logic up to <main ...>
content = content.replace(
  /const currentArticle = articles\.find\([\s\S]*?<main className="max-w-5xl mx-auto px-6 py-16 space-y-20">/,
  `return (\n    <ArticleFrame slug="warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism">\n      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">`
);

// We need to also remove the H1 and P tags in the Hero Section
content = content.replace(
  /<div className="inline-flex items-center gap-2[\s\S]*?<\/p>/,
  ''
);

// Replace the Infographic Section
content = content.replace(
  /\{\/\* Strategic Infographic - Visual Summary of Key Concepts \*\/\}[\s\S]*?<FullScreenImageViewer[\s\S]*?\/>/,
  `<section className="max-w-5xl mx-auto py-12">\n        <InfographicSlot alt="Kevin Warsh Fed Analysis Infographic - Complete Framework Overview" />\n      </section>`
);

// Replace the Call-to-Action and Footer
content = content.replace(
  /\{\/\* Call-to-Action Section \*\/\}[\s\S]*?<\/>/,
  `      </div>\n    </ArticleFrame>`
);

fs.writeFileSync(filePath, content);
console.log('Fixed warsh top');
