/** English URLs are permanent; French is a static GitHub Pages directory tree. */
export type Language = 'en' | 'fr';
export const languageOf = (pathname: string): Language => /^\/fr(?:\/|$)/.test(pathname) ? 'fr' : 'en';
export function englishPath(pathname: string): string {
  const path = pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
  return path === '/404/' ? '/404.html' : path;
}
export function localizedPath(pathname: string, language: Language): string {
  const path = englishPath(pathname);
  return language === 'en' ? path : path === '/404.html' ? '/fr/404/' : '/fr' + path;
}
