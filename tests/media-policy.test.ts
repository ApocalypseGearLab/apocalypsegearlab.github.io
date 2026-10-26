import assert from 'node:assert/strict';
import test from 'node:test';
import { canDisplayProductArtwork, canDisplayHeroArtwork, assetReview } from '../src/lib/media-policy';
import { importedMedia, importedArtwork, canPublishImportedAsset } from '../src/lib/imported-media';

test('rejected Explorer 300 artwork cannot render in development or production', () => {
  assert.equal(assetReview('jackery-explorer-300')?.accuracyStatus, 'rejected');
  assert.equal(canDisplayProductArtwork('jackery-explorer-300', true), false);
  assert.equal(canDisplayProductArtwork('jackery-explorer-300', false), false);
});

test('new owner-authorized pack maps eight products without publishing its extra headlamp or FALLOUT reserves', () => {
  assert.equal(importedMedia.length, 14);
  assert.equal(importedMedia.filter(asset => asset.productId).length, 8);
  assert.equal(new Set(importedMedia.filter(asset => asset.productId).map(asset => asset.productId)).size, 8);
  assert.equal(importedMedia.filter(canPublishImportedAsset).length, 7);
  assert.equal(canPublishImportedAsset(importedArtwork('jackery-explorer-300')!), false);
  for(const asset of importedMedia.filter(asset => !asset.productId)) assert.equal(canPublishImportedAsset(asset),false);
  const accepted=importedArtwork('fenix-cl26r-pro')!;
  assert.equal(canPublishImportedAsset({...accepted,rightsStatus:'pending-owner-confirmation'}),false);
  assert.equal(canPublishImportedAsset({...accepted,accuracyStatus:'pending-review'}),false);
});

test('owner confirmation permits the public bunker without authorizing product artwork', () => {
  assert.equal(canDisplayHeroArtwork(false), true);
  assert.equal(canDisplayHeroArtwork(true), true);
  for (const slug of ['fenix-cl26r-pro', 'jackery-explorer-1000-v2', 'midland-er310']) {
    assert.equal(canDisplayProductArtwork(slug, false), false);
  }
});
test('reference review allows editorial previews without granting commercial permissions', () => {
  for (const slug of ['fenix-cl26r-pro', 'jackery-explorer-1000-v2']) {
    assert.equal(assetReview(slug)?.accuracyStatus, 'reviewed-illustration');
    assert.equal(canDisplayProductArtwork(slug, true), true);
    assert.equal(canDisplayProductArtwork(slug, false), false);
  }
  assert.equal(canDisplayProductArtwork('midland-er310', false), false);
});
