import fs from 'fs';
import path from 'path';

const srcDir = path.resolve(import.meta.dirname, 'dist');
const destDir = path.resolve(import.meta.dirname, 'docs');

if (!fs.existsSync(srcDir)) {
  console.error('dist directory does not exist. Run vite build first.');
  process.exit(1);
}

// Remove previous docs folder if exists
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}

// Copy dist to docs
fs.cpSync(srcDir, destDir, { recursive: true });

// Ensure .nojekyll exists in docs to prevent GitHub Pages Jekyll processing from ignoring assets
fs.writeFileSync(path.join(destDir, '.nojekyll'), '');
fs.writeFileSync(path.join(srcDir, '.nojekyll'), '');

console.log('Successfully copied dist to docs/ with .nojekyll for GitHub Pages compatibility.');
