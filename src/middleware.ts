import { defineMiddleware } from 'astro:middleware';
import { languageOf } from './i18n/routes';
import { localizeHtml } from './i18n/translate';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (languageOf(context.url.pathname) !== 'fr' || !response.headers.get('content-type')?.includes('text/html')) return response;
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.set('content-language', 'fr-CA');
  return new Response(localizeHtml(await response.text(), context.site!, import.meta.env.PROD), { status: response.status, statusText: response.statusText, headers });
});
