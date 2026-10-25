import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_IDS } from './config/taxonomy';

const affiliateLink = z
  .object({
    url: z.url().nullable().default(null),
    asin: z
      .string()
      .regex(/^[A-Z0-9]{10}$/)
      .nullable()
      .default(null),
  })
  .default({ url: null, asin: null });

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/products' }),
  schema: z.object({
    name: z.string().min(1),
    brand: z.string().min(1),
    modelNumber: z.string().nullable().default(null),
    category: z.enum(CATEGORY_IDS),
    summary: z.string().min(1),
    description: z.string().default(''),
    specs: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          source: z.string().optional(),
        }),
      )
      .default([]),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    useCases: z.array(z.string()).default([]),
    image: z
      .object({
        src: z.string().nullable().default(null),
        alt: z.string(),
        credit: z.string().nullable().default(null),
        license: z.string().nullable().default(null),
      })
      .nullable()
      .default(null),
    merchant: z.object({ name: z.string(), notes: z.string().optional() }).nullable().default(null),
    links: z
      .object({
        amazonCa: affiliateLink,
        amazonCom: affiliateLink,
        partners: z.array(z.object({ name: z.string(), url: z.url().nullable().default(null) })).default([]),
      })
      .default({ amazonCa: { url: null, asin: null }, amazonCom: { url: null, asin: null }, partners: [] }),
    // Honesty guardrail: only 'hands-on' may be shown as "tested".
    testing: z.enum(['not-tested', 'hands-on']).default('not-tested'),
    reviewStatus: z.enum(['template', 'draft', 'researched', 'published']).default('draft'),
    lastVerified: z.coerce.date().nullable().default(null),
  }),
});

export const collections = { products };
