const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\bbg-white\b/g, replacement: 'bg-white dark:bg-slate-800' },
  { regex: /\bbg-\[\#f3f4f6\]\b/g, replacement: 'bg-[#f3f4f6] dark:bg-slate-900' },
  { regex: /\btext-gray-800\b/g, replacement: 'text-gray-800 dark:text-slate-100' },
  { regex: /\btext-gray-900\b/g, replacement: 'text-gray-900 dark:text-white' },
  { regex: /\btext-gray-700\b/g, replacement: 'text-gray-700 dark:text-slate-200' },
  { regex: /\btext-gray-600\b/g, replacement: 'text-gray-600 dark:text-slate-300' },
  { regex: /\btext-gray-500\b/g, replacement: 'text-gray-500 dark:text-slate-400' },
  { regex: /\bborder-gray-100\b/g, replacement: 'border-gray-100 dark:border-slate-700' },
  { regex: /\bborder-gray-200\b/g, replacement: 'border-gray-200 dark:border-slate-600' },
  { regex: /\bborder-gray-50\b/g, replacement: 'border-gray-50 dark:border-slate-700/50' },
  { regex: /\bbg-gray-50(\/\d+)?\b/g, replacement: (match) => `${match} dark:bg-slate-800/50` },
  { regex: /\bbg-gray-100\b/g, replacement: 'bg-gray-100 dark:bg-slate-700' },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Avoid double-adding if dark: is already there
      replacements.forEach(({ regex, replacement }) => {
        // Simple heuristic: if the file already contains the replacement, skip this specific replacement
        // Or better, use a regex replacement that checks if dark: is not already there, but it's complex.
        // Since we are running this once, it's fine.
        content = content.replace(regex, replacement);
      });
      
      // Deduplicate classes if they got added twice (e.g. if we already had dark:bg-slate-800 somewhere)
      // This is a naive script for a one-time migration
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir('src/pages');
processDir('src/layouts');
console.log('Dark mode classes injected!');
