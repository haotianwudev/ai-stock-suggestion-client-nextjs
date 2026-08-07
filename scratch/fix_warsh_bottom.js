const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/articles/warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/\{\/\* Call-to-Action Section \*\/\}[\s\S]*$/, '    </ArticleFrame>\n  );\n}\n');

fs.writeFileSync(filePath, content);
console.log('Fixed warsh bottom');
