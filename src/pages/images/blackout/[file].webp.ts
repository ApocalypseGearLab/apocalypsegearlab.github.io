import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { importedMedia, canPublishImportedAsset } from '../../../lib/imported-media';

export const getStaticPaths = (() => importedMedia.filter((asset) => asset.category === 'blackout' && canPublishImportedAsset(asset)).flatMap((asset) => {
  const variants = ('variants' in asset && asset.variants) || [{file: asset.file, src: asset.deliverySrc}];
  return variants.map(variant => ({params: {file: variant.src.split('/').at(-1)!.replace(/\.webp$/, '')}, props: {asset, variant}}));
})) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const asset = props.asset as (typeof importedMedia)[number];
  const variant = props.variant as {file: string};
  if (!canPublishImportedAsset(asset) || !/^assets\/media\/blackout\/[a-z0-9-]+\.webp$/.test(variant.file)) return new Response(null, { status: 404 });
  // Static binary delivery: preserve the supplied WebP bytes and SEO filename.
  const bytes = await readFile(resolve(variant.file));
  return new Response(new Uint8Array(bytes), { headers: { 'Content-Type': 'image/webp' } });
};
