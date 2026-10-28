import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { importedMedia, canPublishImportedAsset } from '../../../lib/imported-media';

export const getStaticPaths = (() => importedMedia.filter(asset => asset.category === 'outbreak' && canPublishImportedAsset(asset)).flatMap(asset =>
  ('variants' in asset ? asset.variants ?? [] : []).map(variant => ({
    params: {file:variant.src.split('/').at(-1)!.replace(/\.webp$/, '')}, props:{asset,variant},
  }))
)) satisfies GetStaticPaths;

export const GET: APIRoute = async ({props}) => {
  const {asset,variant}=props;
  if(!canPublishImportedAsset(asset) || !/^assets\/media\/outbreak\/[a-z0-9-]+\.webp$/.test(variant.file)) return new Response(null,{status:404});
  return new Response(new Uint8Array(await readFile(resolve(variant.file))),{headers:{'Content-Type':'image/webp'}});
};
