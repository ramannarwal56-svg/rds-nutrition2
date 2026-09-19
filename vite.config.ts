import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Automatically duplicate dist/index.html to dist/404.html, generate .nojekyll, and mirror to docs/
function githubPagesDeploymentHelper() {
  return {
    name: 'github-pages-deployment-helper',
    closeBundle() {
      const distPath = path.resolve(import.meta.dirname, 'dist');
      const docsPath = path.resolve(import.meta.dirname, 'docs');
      const indexPath = path.join(distPath, 'index.html');
      const fallbackPath = path.join(distPath, '404.html');
      const nojekyllPath = path.join(distPath, '.nojekyll');

      if (!fs.existsSync(distPath)) return;

      // 1. Create .nojekyll in dist/ so GitHub Pages bypasses Jekyll
      fs.writeFileSync(nojekyllPath, '');

      // 2. Create 404.html in dist/ for SPA fallback routing
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath);
      }

      // 3. Mirror everything to docs/ so users can also deploy via "Branch: main, Folder: /docs"
      try {
        if (fs.existsSync(docsPath)) {
          fs.rmSync(docsPath, { recursive: true, force: true });
        }
        fs.cpSync(distPath, docsPath, { recursive: true });
      } catch (err) {
        console.warn('Could not mirror dist to docs:', err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), githubPagesDeploymentHelper()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
