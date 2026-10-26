import { readdirSync, readFileSync } from 'node:fs';
import { productSchema } from '../src/lib/product-schema';
import { publicationIssues, RELEASE_HOLDS, isInformationalProduct } from '../src/lib/release-policy';
import type { Product } from '../src/lib/products';
import { AMAZON_ASSOCIATE_ENROLLED } from '../src/config/site';

const products = readdirSync('src/data/products').filter((file) => file.endsWith('.json')).map((file) => ({ id: file.replace(/\.json$/, ''), data: productSchema.parse(JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))) } as Product)).filter((product) => product.data.reviewStatus !== 'template');
const rows = products.map((product) => ({ slug: product.id, asin: product.data.links.amazonCa.asin, informationalVisible: isInformationalProduct(product), eligible: publicationIssues(product).length === 0, held: Boolean(RELEASE_HOLDS[product.id]), issues: publicationIssues(product) }));
console.log(JSON.stringify({ scope: 'Commercial eligibility; informational visibility is independent', amazonAssociatesConfirmed: AMAZON_ASSOCIATE_ENROLLED, informationalVisible: rows.filter((row) => row.informationalVisible).length, eligible: rows.filter((row) => row.eligible).length, held: rows.filter((row) => row.held).length, products: rows }, null, 2));
// Optional COMMERCIAL gate; never required to build public informational profiles.
if (process.argv.includes('--require-ready') && rows.every((row) => !row.eligible)) process.exitCode = 1;
