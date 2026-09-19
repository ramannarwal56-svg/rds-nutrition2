/**
 * Utility to resolve static asset paths correctly across both local dev,
 * production root domains, and GitHub Pages (subpath repositories like https://user.github.io/repo-name/).
 */
let cachedBaseUrl: string | null = null;

export const getBaseUrl = (): string => {
  if (cachedBaseUrl) return cachedBaseUrl;

  if (typeof window === 'undefined') {
    const base = import.meta.env.BASE_URL || './';
    return base.endsWith('/') ? base : `${base}/`;
  }

  // Priority 1: Check runtime <script> tag that loaded Vite assets
  // In a Vite build, index.html contains: <script type="module" crossorigin src="./assets/index-xxx.js"></script>
  // Or <script type="module" crossorigin src="/repo/assets/index-xxx.js"></script>
  // The browser resolves this to an absolute .src property, e.g. "https://user.github.io/repo/assets/index.js"
  const scripts = Array.from(document.querySelectorAll('script[src]')) as HTMLScriptElement[];
  for (const s of scripts) {
    if (s.src && s.src.includes('/assets/')) {
      const assetIdx = s.src.indexOf('/assets/');
      if (assetIdx !== -1) {
        cachedBaseUrl = s.src.substring(0, assetIdx + 1);
        return cachedBaseUrl;
      }
    }
  }

  // Priority 2: Check for <base href="...">
  const baseTag = document.querySelector('base');
  if (baseTag && baseTag.href) {
    cachedBaseUrl = baseTag.href.endsWith('/') ? baseTag.href : `${baseTag.href}/`;
    return cachedBaseUrl;
  }

  // Priority 3: GitHub Pages detection (hostname ending in github.io)
  if (window.location.hostname.endsWith('github.io')) {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length > 0) {
      const repo = parts[0];
      if (parts[1] === 'docs') {
        cachedBaseUrl = `${window.location.origin}/${repo}/docs/`;
      } else {
        cachedBaseUrl = `${window.location.origin}/${repo}/`;
      }
      return cachedBaseUrl;
    }
  }

  // Priority 4: Vite configured BASE_URL if non-relative
  const envBase = import.meta.env.BASE_URL;
  if (envBase && envBase !== './' && envBase !== '.') {
    const norm = envBase.endsWith('/') ? envBase : `${envBase}/`;
    if (norm.startsWith('http')) {
      cachedBaseUrl = norm;
      return cachedBaseUrl;
    }
    cachedBaseUrl = `${window.location.origin}${norm.startsWith('/') ? norm : '/' + norm}`;
    return cachedBaseUrl;
  }

  // Priority 5: Fallback based on pathname directory
  const cleanPathname = window.location.pathname.replace(/\/[^/]+\.html$/, '');
  const dir = cleanPathname.endsWith('/') ? cleanPathname : `${cleanPathname}/`;
  cachedBaseUrl = `${window.location.origin}${dir}`;
  return cachedBaseUrl;
};

export const assetUrl = (path: string | undefined | null): string => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, '');
  const base = getBaseUrl();
  return `${base}${cleanPath}`;
};
