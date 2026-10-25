import assert from 'node:assert/strict';
import test from 'node:test';
import { canDisplayProductArtwork, assetReview } from '../src/lib/media-policy';

test('rejected Explorer 300 artwork cannot render in development or production', () => {
  assert.equal(assetReview('jackery-explorer-300')?.accuracyStatus, 'rejected');
  assert.equal(canDisplayProductArtwork('jackery-explorer-300', true), false);
  assert.equal(canDisplayProductArtwork('jackery-explorer-300', false), false);
});
test('reference review allows editorial previews without granting commercial permissions', () => {
  for (const slug of ['fenix-cl26r-pro', 'jackery-explorer-1000-v2']) {
    assert.equal(assetReview(slug)?.accuracyStatus, 'reviewed-illustration');
    assert.equal(canDisplayProductArtwork(slug, true), true);
    assert.equal(canDisplayProductArtwork(slug, false), false);
  }
  assert.equal(canDisplayProductArtwork('midland-er310', false), false);
});
