import { z } from 'astro/zod';
import { CATEGORY_IDS } from '../config/taxonomy';

const httpsUrl = z.url().refine((url) => {
  const parsed = new URL(url);
  return parsed.protocol === 'https:' && !parsed.username && !parsed.password;
}, 'Use a credential-free HTTPS URL');
const affiliateLink = z.object({
  url: z.url().nullable().default(null),
  asin: z.string().regex(/^[A-Z0-9]{10}$/).nullable().default(null),
}).default({ url: null, asin: null });

/** Shared with tests so production and editorial validation use one schema. */
export const productSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  modelNumber: z.string().nullable().default(null),
  category: z.enum(CATEGORY_IDS),
  summary: z.string().min(1),
  description: z.string().default(''),
  editorial: z.object({ purchaseChecks: z.array(z.string().min(1)).default([]) }).optional(),
  specs: z.array(z.object({ label: z.string(), value: z.string(), source: z.string().optional() })).default([]),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  useCases: z.array(z.string()).default([]),
  image: z.object({
    src: z.string().nullable().default(null), alt: z.string(),
    credit: z.string().nullable().default(null), license: z.string().nullable().default(null),
  }).nullable().default(null),
  merchant: z.object({ name: z.string(), notes: z.string().optional() }).nullable().default(null),
  links: z.object({
    amazonCa: affiliateLink, amazonCom: affiliateLink,
    partners: z.array(z.object({ name: z.string(), url: z.url().nullable().default(null) })).default([]),
  }).default({ amazonCa: { url: null, asin: null }, amazonCom: { url: null, asin: null }, partners: [] }),
  testing: z.enum(['not-tested', 'hands-on']).default('not-tested'),
  reviewStatus: z.enum(['template', 'draft', 'researched', 'published']).default('draft'),
  // Public reference visibility never implies commercial or safety approval.
  visibility: z.enum(['internal', 'informational']).default('internal'),
  lastVerified: z.coerce.date().nullable().default(null),
  sources: z.array(z.object({
    id: z.string().regex(/^[a-z0-9-]+$/), title: z.string().min(1), url: httpsUrl,
    kind: z.enum(['manufacturer', 'official-safety', 'official-recall']),
  })).default([]),
  relatedProducts: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
  research: z.object({
    checkedAt: z.iso.date(),
    identityNotes: z.string().min(1),
    listingVerified: z.boolean().default(false),
    confirmed: z.array(z.object({ text: z.string().min(1), sourceIds: z.array(z.string()).min(1) })),
    unverifiedClaims: z.array(z.string()).default([]),
    safetyNotes: z.array(z.string()).default([]),
    safetyStatus: z.enum(['pending', 'blocked', 'cleared']),
    publicationApproved: z.boolean().default(false),
    publicationBlockers: z.array(z.string()).default([]),
  }).optional(),
}).superRefine((product, context) => {
  const ids = new Set(product.sources.map((source) => source.id));
  if (ids.size !== product.sources.length) context.addIssue({ code: 'custom', path: ['sources'], message: 'Source IDs must be unique' });
  for (const [index, fact] of (product.research?.confirmed ?? []).entries()) {
    if (fact.sourceIds.some((id) => !ids.has(id))) context.addIssue({ code: 'custom', path: ['research', 'confirmed', index], message: 'Evidence must reference an existing source' });
  }
  for (const marketplace of ['amazonCa', 'amazonCom'] as const) {
    const link = product.links[marketplace];
    if (!link.asin || !link.url) continue;
    const url = new URL(link.url);
    if (url.hostname === 'amzn.to') continue;
    const host = marketplace === 'amazonCa' ? 'amazon.ca' : 'amazon.com';
    if (!['https:'].includes(url.protocol) || url.username || url.password || !(url.hostname === host || url.hostname.endsWith(`.${host}`)) || url.pathname !== `/dp/${link.asin}`) {
      context.addIssue({ code: 'custom', path: ['links', marketplace], message: 'Amazon marketplace URL must match its ASIN and domain' });
    }
  }
  if ((product.reviewStatus === 'published' || product.visibility === 'informational') && !product.research) {
    context.addIssue({ code: 'custom', path: ['research'], message: 'Published products require documented research and approval' });
  }
  if ((product.reviewStatus === 'published' || product.visibility === 'informational') && (!product.specs.length || product.specs.some((spec) => !product.sources.some((source) => source.kind === 'manufacturer' && source.url === spec.source)))) {
    context.addIssue({ code: 'custom', path: ['specs'], message: 'Published specifications must cite an included manufacturer source' });
  }
  if (product.reviewStatus === 'published' && product.research && (
    !product.research.publicationApproved || !product.research.listingVerified ||
    product.research.safetyStatus !== 'cleared' || product.research.publicationBlockers.length > 0
  )) context.addIssue({ code: 'custom', path: ['reviewStatus'], message: 'Research, listing verification, safety clearance and owner approval are required before publication' });
  if (product.visibility === 'informational' && product.reviewStatus === 'template') context.addIssue({ code: 'custom', path: ['visibility'], message: 'Templates cannot be public informational profiles' });
});
