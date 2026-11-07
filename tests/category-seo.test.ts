import {beforeFourUniverses} from '../scripts/four-universes-preservation.mjs';
import { PHASE6_INTEGRATION_FILES } from './phase6-fixture';
import {PHASE55_INTEGRATION_FILES} from './phase55-fixture';
import {BOUGERV_INTEGRATION_FILES} from './bougerv-fixture';
import {accountStatusFileChanged} from './account-status-fixture';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {CATALOGUE_EDITORIAL_READY,categoryPageCanBeIndexed} from '../src/lib/category-seo';
import {isCommerciallyApproved} from '../src/lib/release-policy';
import {productSchema} from '../src/lib/product-schema';
import type {Product} from '../src/lib/products';

test('category indexability depends only on its own editorial readiness and preview status',()=>{
 assert.equal(CATALOGUE_EDITORIAL_READY,true);
 assert.equal(categoryPageCanBeIndexed(true),true);
 assert.equal(categoryPageCanBeIndexed(true,true),false);
 assert.equal(categoryPageCanBeIndexed(false),false);
 assert.equal(categoryPageCanBeIndexed(false,true),false);
});

test('a catalogue of entirely unapproved informational profiles remains independently indexable',()=>{
 const products=readdirSync('src/data/products').filter(f=>f.endsWith('.json')&&!f.startsWith('template')).map(f=>({id:f.replace(/\.json$/,''),data:productSchema.parse(JSON.parse(readFileSync('src/data/products/'+f,'utf8')))}as Product));
 assert.equal(products.length,52);assert.equal(products.some(isCommerciallyApproved),false);
 assert.equal(categoryPageCanBeIndexed(CATALOGUE_EDITORIAL_READY),true);
 // The actual production HTML assertion is in test:site and Playwright. Keep
 // the renderer free of the old catalogue-wide commercial approval predicate.
 const component=readFileSync('src/components/ProductCatalogue.astro','utf8');
 assert.doesNotMatch(component,/isCommerciallyApproved|hasPublished|publicationApproved|listingVerified/);
 assert.match(component,/categoryPageCanBeIndexed\(CATALOGUE_EDITORIAL_READY, releasePreview\)/);
 assert.match(component,/data-editorial-guide/);
});

test('core SEO correction preserves every product, affiliate/safety policy, image, tracking implementation and other page source',()=>{
 const before=JSON.parse(readFileSync('docs/qa/core-indexation/before.json','utf8'));
 assert.equal(before.baseCommit,'beeb6e8219b59bfc7dd99292060cb301f81f608e');assert.equal(before.capturedBeforeImplementation,true);
 assert.equal(before.pages.find((p:any)=>p.path==='/gear/').robots,'noindex, nofollow');
 for(const row of before.files){if(PHASE6_INTEGRATION_FILES.has(row.file))continue;if(PHASE55_INTEGRATION_FILES.has(row.file))continue;if(BOUGERV_INTEGRATION_FILES.has(row.file))continue;if(accountStatusFileChanged(row.file))continue;const b=beforeFourUniverses(row.file,readFileSync(row.file));const value=row.normaliseNewlines?b.toString('utf8').replace(/\r\n/g,'\n'):b;assert.equal(createHash('sha256').update(value).digest('hex'),row.sha256,row.file);}
});
