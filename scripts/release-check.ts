import { readdirSync, readFileSync } from 'node:fs';
import { productSchema } from '../src/lib/product-schema';
import { publicationIssues, RELEASE_HOLDS, isInformationalProduct } from '../src/lib/release-policy';
import type { Product } from '../src/lib/products';
import { getMerchantLinks, canadianAffiliateIssues } from '../src/lib/affiliate';
import { AMAZON_CA_LINKING_ENABLED, AMAZON_CA_FINAL_APPROVAL_CONFIRMED } from '../src/config/site';

const products = readdirSync('src/data/products').filter((file) => file.endsWith('.json')).map((file) => ({ id: file.replace(/\.json$/, ''), data: productSchema.parse(JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))) } as Product)).filter((product) => product.data.reviewStatus !== 'template');
const rows = products.map((product) => ({ slug: product.id, asin: product.data.links.amazonCa.asin, url: product.data.links.amazonCa.url, amazonCaActive: Boolean(getMerchantLinks(product)[0]?.href), buttonReason: getMerchantLinks(product)[0]?.unavailableReason, informationalVisible: isInformationalProduct(product), eligible: canadianAffiliateIssues(product).length === 0, held: Boolean(RELEASE_HOLDS[product.id]), issues: publicationIssues(product) }));
console.log(JSON.stringify({ scope: 'Commercial eligibility; informational visibility is independent', amazonCaLinkingEnabled: AMAZON_CA_LINKING_ENABLED, finalApprovalConfirmed: AMAZON_CA_FINAL_APPROVAL_CONFIRMED, privateAccountStanding: 'not-independently-confirmed', informationalVisible: rows.filter((row) => row.informationalVisible).length, eligible: products.filter((product) => canadianAffiliateIssues(product).length === 0).length, held: rows.filter((row) => row.held).length, products: rows.map((row, index) => ({ ...row, issues: canadianAffiliateIssues(products[index]!) })) }, null, 2));
// Optional COMMERCIAL gate; never required to build public informational profiles.
if (process.argv.includes('--require-ready') && rows.every((row) => !row.eligible)) process.exitCode = 1;
