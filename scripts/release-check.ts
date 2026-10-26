import { readdirSync, readFileSync } from 'node:fs';
import { productSchema } from '../src/lib/product-schema';
import { publicationIssues, RELEASE_HOLDS } from '../src/lib/release-policy';
import type { Product } from '../src/lib/products';
import { AMAZON_ASSOCIATE_ENROLLED } from '../src/config/site';

const products = readdirSync('src/data/products').filter((file) => file.endsWith('.json')).map((file) => ({ id: file.replace(/\.json$/, ''), data: productSchema.parse(JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))) } as Product)).filter((product) => product.data.reviewStatus !== 'template');
const rows = products.map((product) => ({ slug: product.id, asin: product.data.links.amazonCa.asin, eligible: publicationIssues(product).length === 0, held: Boolean(RELEASE_HOLDS[product.id]), issues: publicationIssues(product) }));
console.log(JSON.stringify({ amazonAssociatesConfirmed: AMAZON_ASSOCIATE_ENROLLED, eligible: rows.filter((row) => row.eligible).length, held: rows.filter((row) => row.held).length, products: rows }, null, 2));
// Optional release gate, separate from the normal build of a safe, empty catalogue.
if (process.argv.includes('--require-ready') && rows.every((row) => !row.eligible)) process.exitCode = 1;
