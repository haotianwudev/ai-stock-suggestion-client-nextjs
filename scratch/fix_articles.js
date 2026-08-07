const fs = require('fs');
const path = require('path');

function processArticle(filePath, slug, isWarsh) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace imports
  content = content.replace(
    /import \{ articles \} from '@\/data\/articles';[\s\S]*?import \{ FullScreenImageViewer \} from '@\/components\/ui\/full-screen-image-viewer';/g,
    `import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';`
  );

  // Remove the currentArticle and state
  content = content.replace(
    /const currentArticle = articles\.find\(.*?\);/,
    ''
  );
  content = content.replace(
    /const \[isImageViewerOpen, setIsImageViewerOpen\] = useState\(false\);/,
    ''
  );

  // For calendar spread
  if (!isWarsh) {
    // Replace from return ( down to <FullScreenImageViewer ... />
    content = content.replace(
      /return \([\s\S]*?<FullScreenImageViewer[\s\S]*?\/>/,
      `return (\n    <ArticleFrame slug="${slug}">\n      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">\n        <InfographicSlot alt="Calendar Spread Architecture Infographic" />\n      </section>`
    );
    // Replace the bottom part (Call to Action to footer)
    content = content.replace(
      /\{\/\* Call to Action - Google Doc \*\/\}[\s\S]*?<\/footer>\n    <\/div>/,
      `    </ArticleFrame>`
    );
  } else {
    // For warsh-era
    content = content.replace(
      /return \([\s\S]*?<\/header>/,
      `return (\n    <ArticleFrame slug="${slug}">`
    );
    // Remove the Executive Summary Hero completely or replace it with ArticleFrame + just keeping the content
    content = content.replace(
      /<main className="max-w-5xl mx-auto px-6 py-16 space-y-20">[\s\S]*?\{\/\* Executive Summary Hero \*\/\}[\s\S]*?<\/section>/,
      ''
    );
    // Replace the Infographic section and FullScreenImageViewer
    content = content.replace(
      /\{\/\* Strategic Infographic - Visual Summary of Key Concepts \*\/\}[\s\S]*?<FullScreenImageViewer[\s\S]*?\/>/,
      `<section className="max-w-5xl mx-auto px-6 py-12">\n        <InfographicSlot alt="Kevin Warsh Fed Analysis Infographic - Complete Framework Overview" />\n      </section>`
    );
    // Replace the bottom part
    content = content.replace(
      /\{\/\* Call-to-Action Section \*\/\}[\s\S]*?<\/main>\n      <\/div>\n    <\/>/,
      `    </ArticleFrame>`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`Processed ${slug}`);
}

processArticle(
  path.join(__dirname, '../src/app/articles/calendar-spread-architecture-time-decay-options-trading/page.tsx'),
  'calendar-spread-architecture-time-decay-options-trading',
  false
);

processArticle(
  path.join(__dirname, '../src/app/articles/warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism/page.tsx'),
  'warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism',
  true
);
