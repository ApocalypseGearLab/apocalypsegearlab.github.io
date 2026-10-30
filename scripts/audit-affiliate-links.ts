import {readdirSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {auditCanadianCatalogue} from '../src/lib/affiliate-audit';
import {productSchema} from '../src/lib/product-schema';
import type {Product} from '../src/lib/products';

const products=readdirSync('src/data/products').filter(file=>file.endsWith('.json')).map(file=>({id:file.replace(/\.json$/,''),data:productSchema.parse(JSON.parse(readFileSync(`src/data/products/${file}`,'utf8')))} as Product));
const result=auditCanadianCatalogue(products);
const outputIndex=process.argv.indexOf('--output');
if(outputIndex>=0) {
  const output=process.argv[outputIndex+1];
  if(!output)throw Error('--output requires a path');
  const path=resolve(output);mkdirSync(dirname(path),{recursive:true});writeFileSync(path,JSON.stringify(result,null,2)+'\n');
}
console.log(JSON.stringify(result,null,2));
if(result.invalidUrls||result.duplicateAsins||result.duplicateUrls||result.undocumentedBlocks)process.exitCode=1;
