import { GA4_MEASUREMENT_ID } from '../config/analytics';

export const ANALYTICS_CONSENT_KEY = 'agl-analytics-consent';
export const ANALYTICS_CONSENT_DAYS = 180;
export type AnalyticsChoice = 'granted' | 'denied';
interface ConsentRecord { version: 1; choice: AnalyticsChoice; updatedAt: number }
type AnalyticsWindow = Window & { dataLayer?: unknown[] };
const installed = new WeakSet<Document>();
const permitted = new WeakSet<Document>();

export function parseAnalyticsConsent(raw: string | null, now = Date.now()): ConsentRecord | undefined {
  try {
    const record = JSON.parse(raw ?? 'null') as Partial<ConsentRecord> | null;
    if (!record || record.version !== 1 || !['granted', 'denied'].includes(String(record.choice))
      || typeof record.updatedAt !== 'number' || !Number.isFinite(record.updatedAt)
      || record.updatedAt > now || now - record.updatedAt >= ANALYTICS_CONSENT_DAYS * 86400000) return undefined;
    return record as ConsentRecord;
  } catch { return undefined; }
}

/** No pre-consent event queue: only this document's explicit/current permission qualifies. */
export const hasAnalyticsConsent = (doc: Document) => permitted.has(doc);

export function installAnalyticsConsent(doc: Document = document) {
  if (installed.has(doc) || !doc.defaultView) return;
  installed.add(doc);
  const win = doc.defaultView as AnalyticsWindow;
  const panel = doc.querySelector<HTMLElement>('[data-analytics-consent]');
  if (!panel) return; // Fail closed if the consent UI is unavailable.
  const status = panel.querySelector<HTMLElement>('[data-analytics-status]')!;
  const buttons = panel.querySelectorAll<HTMLButtonElement>('[data-analytics-choice]');
  const toggle = panel.querySelector<HTMLInputElement>('[data-analytics-toggle]')!;
  const options = panel.querySelector<HTMLElement>('[data-analytics-options-panel]')!;
  const optionsButton = panel.querySelector<HTMLButtonElement>('[data-analytics-options]')!;
  const actions = panel.querySelector<HTMLElement>('[data-analytics-actions]')!;
  const saveActions = panel.querySelector<HTMLElement>('[data-analytics-save-actions]')!;
  const saveButton = panel.querySelector<HTMLButtonElement>('[data-analytics-save]')!;
  const openers = doc.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>('[data-analytics-open], a[href="#analytics-preferences"]');
  // A body child cannot be clipped or repositioned by a transformed footer/container.
  doc.body.append(panel);
  // Leave scroll room for footer links behind the nonmodal card, including expanded options.
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => {
    const clearance = panel.hidden ? 0 : panel.getBoundingClientRect().height + parseFloat(win.getComputedStyle(panel).bottom) + 12;
    doc.body.style.setProperty('--analytics-consent-clearance', clearance + 'px');
  }).observe(panel);
  let returnFocus: HTMLElement | undefined;
  const show = (visible: boolean) => {
    panel.hidden = !visible;
    for (const opener of openers) opener.setAttribute('aria-expanded', String(visible));
  };
  const showOptions = (expanded: boolean) => {
    options.hidden = !expanded;
    actions.hidden = expanded;
    saveActions.hidden = !expanded;
    optionsButton.setAttribute('aria-expanded', String(expanded));
  };
  const close = () => {
    show(false);
    if (panel.contains(doc.activeElement)) {
      (returnFocus?.isConnected ? returnFocus : doc.querySelector<HTMLElement>('main'))?.focus({preventScroll:true});
    }
  };
  const french = doc.documentElement.lang === 'fr-CA';
  let choice: AnalyticsChoice | undefined;
  let loaded = false;
  const disable = (value: boolean) => {
    (win as unknown as Record<string, unknown>)['ga-disable-' + GA4_MEASUREMENT_ID] = value;
  };
  // A readable grant is insufficient when its store cannot remember a later withdrawal.
  // The fixed temporary value is a capability check, never an analytics identifier.
  const revocable = (storage: Storage) => {
    const probe = ANALYTICS_CONSENT_KEY + '-storage-check';
    try {
      storage.setItem(probe, 'check');
      const written = storage.getItem(probe) === 'check';
      storage.removeItem(probe);
      return written && storage.getItem(probe) === null;
    } catch { return false; }
  };
  const read = () => {
    const records: { record: ConsentRecord; storage: Storage }[] = [];
    for (const key of ['sessionStorage', 'localStorage'] as const) {
      try { const storage = win[key]; const record = parseAnalyticsConsent(storage.getItem(ANALYTICS_CONSENT_KEY)); if (record) records.push({ record, storage }); } catch { /* Storage is optional. */ }
    }
    // Denial wins simultaneous decisions; never fall back to an older grant.
    const latest = records.sort((a, b) => b.record.updatedAt - a.record.updatedAt
      || Number(b.record.choice === 'denied') - Number(a.record.choice === 'denied'))[0];
    if (!latest || (latest.record.choice === 'granted' && !revocable(latest.storage))) return undefined;
    return latest.record;
  };
  const save = (value: AnalyticsChoice) => {
    const record = JSON.stringify({version: 1, choice: value, updatedAt: Date.now()});
    // Persist denial where possible. Unrevocable remembered grants fail closed on the next load.
    for (const key of ['sessionStorage', 'localStorage'] as const) {
      try { win[key].setItem(ANALYTICS_CONSENT_KEY, record); } catch { /* This page's choice still applies. */ }
    }
  };
  const clearCookies = () => {
    const names = doc.cookie.split(';').map(value => value.trim().split('=')[0]!).filter(name => /^_ga(?:_|$)/.test(name));
    const parts = win.location.hostname.split('.');
    const domains = ['', ...parts.map((_, i) => parts.slice(i).join('.')).flatMap(domain => [domain, '.' + domain])];
    for (const name of names) for (const domain of domains) {
      doc.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
    }
  };
  const label = () => {
    status.textContent = choice === 'granted'
      ? (french ? 'L’analyse facultative est activée. Vous pouvez retirer votre accord.' : 'Optional analytics is on. You can withdraw your permission.')
      : choice === 'denied'
        ? (french ? 'L’analyse facultative est désactivée.' : 'Optional analytics is off.')
        : (french ? 'L’analyse facultative est désactivée tant que vous ne l’autorisez pas.' : 'Optional analytics is off until you allow it.');
    for (const button of buttons) { button.disabled = false; button.setAttribute('aria-pressed', String(button.dataset.analyticsChoice === choice)); }
    toggle.checked = choice === 'granted';
    optionsButton.disabled = false;
    saveButton.disabled = false;
  };
  const start = () => {
    if (loaded || doc.documentElement.dataset.languageRedirect === 'true') return;
    loaded = true;
    permitted.add(doc);
    disable(false);
    const queue = win.dataLayer = win.dataLayer ?? [];
    win.gtag = function () { queue.push(arguments); };
    win.gtag('consent', 'default', {analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    win.gtag('consent', 'update', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    win.gtag('js', new Date());
    let referrer = '';
    try { const url = new URL(doc.referrer); referrer = url.origin + url.pathname; } catch { /* No referrer. */ }
    win.gtag('config', GA4_MEASUREMENT_ID, {
      page_location: win.location.origin + win.location.pathname, page_referrer: referrer,
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_expires: ANALYTICS_CONSENT_DAYS * 86400, cookie_update: false,
    });
    const script = doc.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
    script.dataset.analyticsLoader = 'true';
    doc.head.append(script);
  };
  const apply = (value: AnalyticsChoice | undefined, persist = false) => {
    const wasLoaded = loaded;
    choice = value;
    if (persist && value) save(value);
    if (value === 'granted') start();
    else {
      permitted.delete(doc);
      disable(true);
      // Never send a denied-consent ping; stop our queue and remove known GA cookies.
      win.gtag = () => {};
      win.dataLayer = [];
      try { clearCookies(); } catch { /* Browser may deny cookie access; permission remains off. */ }
    }
    label();
    if (wasLoaded && value !== 'granted') win.location.reload(); // Unload third-party listeners too.
  };
  const stored = read();
  apply(stored?.choice);
  show(!stored);
  for (const opener of openers) {
    if (opener.tagName === 'BUTTON') (opener as HTMLButtonElement).disabled = false;
    opener.addEventListener('click', event => {
      event.preventDefault();
      returnFocus = opener;
      toggle.checked = choice === 'granted';
      showOptions(false);
      show(true);
      buttons[0]?.focus({preventScroll:true});
    });
  }
  for (const button of buttons) button.addEventListener('click', () => {
    apply(button.dataset.analyticsChoice as AnalyticsChoice, true);
    close();
  });
  optionsButton.addEventListener('click', () => {
    toggle.checked = choice === 'granted';
    showOptions(true);
    toggle.focus({preventScroll:true});
  });
  const back = () => { showOptions(false); optionsButton.focus({preventScroll:true}); };
  panel.querySelector('[data-analytics-back]')!.addEventListener('click', back);
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !options.hidden) { event.preventDefault(); back(); }
  });
  saveButton.addEventListener('click', () => {
    apply(toggle.checked ? 'granted' : 'denied', true);
    close();
  });
  win.addEventListener('storage', event => {
    if (event.key !== ANALYTICS_CONSENT_KEY && event.key !== null) return;
    const record = parseAnalyticsConsent(event.newValue);
    // Mirror cross-tab revocation so an older session grant cannot revive it.
    try { if (record) win.sessionStorage.setItem(ANALYTICS_CONSENT_KEY, JSON.stringify(record)); else win.sessionStorage.removeItem(ANALYTICS_CONSENT_KEY); } catch { /* Optional. */ }
    const current = record?.choice === 'granted' ? read() : record;
    apply(current?.choice);
    showOptions(false);
    show(!current);
  });
}
