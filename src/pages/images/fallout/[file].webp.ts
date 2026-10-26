import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { importedMedia, canPublishImportedAsset } from '../../../lib/imported-media';

export const getStaticPaths = (() => importedMedia.filter((asset) => asset.category === 'fallout' && canPublishImportedAsset(asset)).map((asset) => ({
  params: { file: asset.deliverySrc.split('/').at(-1)!.replace(/\.webp$/, '') }, props: { asset },
}))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const asset = props.asset as (typeof importedMedia)[number];
  if (!canPublishImportedAsset(asset) || !/^assets\/media\/fallout\/[a-z0-9-]+\.webp$/.test(asset.file)) return new Response(null, { status: 404 });
  // Static binary delivery: preserve the supplied WebP bytes and SEO filename.
  const bytes = await readFile(resolve(asset.file));
  return new Response(new Uint8Array(bytes), { headers: { 'Content-Type': 'image/webp' } });
};
