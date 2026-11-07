import { languageOf } from './routes';

const header = document.querySelector<HTMLElement>('.site-header');
if (header && typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(() => document.documentElement.style.setProperty('--site-header-height', header.getBoundingClientRect().height + 'px')).observe(header);
}

const selector = document.querySelector<HTMLDetailsElement>('[data-language-selector]');
if (selector) {
  const summary = selector.querySelector<HTMLElement>('summary')!;
  const options = [...selector.querySelectorAll<HTMLAnchorElement>('[data-language-option]')];
  const close = (focus = false) => { selector.open = false; if (focus) summary.focus(); };
  selector.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); selector.open = true;
    const index = options.indexOf(document.activeElement as HTMLAnchorElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : event.key === 'ArrowDown' ? (index + 1) % options.length : index < 0 ? options.length - 1 : (index - 1 + options.length) % options.length;
    options[next]?.focus();
  });
  document.addEventListener('pointerdown', event => { if (!selector.contains(event.target as Node)) close(); });
  // Safari can blur the summary with no relatedTarget when an option is tapped.
  // Keep the link visible until its native click; close on actual outside focus.
  document.addEventListener('focusin', event => { if (!selector.contains(event.target as Node)) close(); });
  const targetFor = (link: HTMLAnchorElement) => {
    const url = new URL(link.href);
    url.search = location.search; url.hash = location.hash;
    const form = document.querySelector<HTMLFormElement>('[data-catalogue-controls]');
    if (form) for (const [field, parameter] of [['query', 'q'], ['sector', 'sector'], ['category', 'category']] as const) {
      const value = (form.elements.namedItem(field) as HTMLInputElement | HTMLSelectElement).value;
      if (value) url.searchParams.set(parameter, value); else url.searchParams.delete(parameter);
    }
    return url;
  };
  // Keep real hrefs useful for context-menu and modified-click navigation too.
  // Native details toggle events can arrive during WebKit's synthetic touch
  // sequence. Do not mutate an already-correct destination while it is tapped.
  const refresh = () => { for (const link of options) {
    const href = targetFor(link).href;
    if (link.href !== href) link.href = href;
  } };
  selector.addEventListener('toggle', refresh);
  window.addEventListener('hashchange', refresh);
  document.addEventListener('input', refresh);
  refresh();
  for (const link of options) link.addEventListener('click', event => {
    const url = targetFor(link);
    if (link.href !== url.href) link.href = url.href;
    const language = link.dataset.languageOption!;
    try { localStorage.setItem('agl-language', language); } catch { /* Optional preference. */ }
    // Preserve this tab's explicit choice even if persistent storage is read-only.
    try { sessionStorage.setItem('agl-language', language); } catch { /* Native navigation still works. */ }
    if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    try { sessionStorage.setItem('agl-language-position', JSON.stringify({ target: url.pathname + url.search + url.hash, x: window.scrollX, y: window.scrollY })); } catch { /* Native fragment navigation remains available. */ }
  });
}
try {
  const stored = sessionStorage.getItem('agl-language-position');
  if (stored) {
    sessionStorage.removeItem('agl-language-position');
    const state = JSON.parse(stored);
    if (state.target === location.pathname + location.search + location.hash && Number.isFinite(state.x) && Number.isFinite(state.y)) {
      // WebKit applies its initial fragment scroll in the first paint frame.
      const restore = () => requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ left: state.x, top: state.y, behavior: 'instant' })));
      if (document.readyState === 'complete') restore(); else window.addEventListener('load', restore, { once: true });
    }
  }
} catch { /* Storage can be blocked without disabling navigation. */ }
// The URL is the content language. An explicit French deep link remains French,
// regardless of an English preference saved on an earlier visit.
export const currentLanguage = languageOf(location.pathname);
