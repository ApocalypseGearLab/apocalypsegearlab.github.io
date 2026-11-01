import {readFileSync, readdirSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {productSchema} from '../src/lib/product-schema';
import {isPubliclyVisible} from '../src/lib/release-policy';
import {productVerificationAudit} from '../src/lib/product-verification';
import {AMAZON_CA_ACCOUNT_DECLARATION, AMAZON_CA_FINAL_APPROVAL_CONFIRMED, AMAZON_CA_LINKING_ENABLED} from '../src/config/site';
import type {Product} from '../src/lib/products';

const products=readdirSync('src/data/products').filter(file=>file.endsWith('.json')).map(file=>({id:file.replace(/\.json$/,''),data:productSchema.parse(JSON.parse(readFileSync('src/data/products/'+file,'utf8')))} as Product)).filter(isPubliclyVisible);
const rows=products.map(productVerificationAudit);
const result={
  scope:'Existing repository evidence audit; no fresh Amazon inspection, physical testing or certification is claimed.',
  account:{declaration:AMAZON_CA_ACCOUNT_DECLARATION, independentFinalApprovalConfirmed:AMAZON_CA_FINAL_APPROVAL_CONFIRMED, linkingEnabled:AMAZON_CA_LINKING_ENABLED},
  summary:{products:rows.length, manufacturerDocumented:rows.filter(r=>r.modelDocumented).length, ownerDocumentedListings:rows.filter(r=>r.listingStatus==='owner-documented').length, independentlyVerifiedListings:rows.filter(r=>r.identity.independentlyVerified).length, activeLinks:rows.filter(r=>r.linkActive).length, heldLinks:rows.filter(r=>!r.linkActive).length, safetyCleared:rows.filter(r=>r.safetyStatus==='cleared').length, safetyPending:rows.filter(r=>r.safetyStatus==='pending').length, safetyBlocked:rows.filter(r=>r.safetyStatus==='blocked').length, editorialApproved:rows.filter(r=>r.editorialApproved).length, fullyApproved:rows.filter(r=>r.fullyApproved).length},
  products:rows,
};
const output=process.argv.indexOf('--output');
if(output>=0){const file=process.argv[output+1];if(!file)throw Error('Output path required');mkdirSync(dirname(resolve(file)),{recursive:true});writeFileSync(file,JSON.stringify(result,null,2)+'\n');}
const markdown=process.argv.indexOf('--markdown');
if(markdown>=0){
 const file=process.argv[markdown+1];if(!file)throw Error('Markdown path required');
 const escape=(value:string)=>value.replaceAll('|','\\|').replaceAll('\n',' ');
 const lines=['# Per-product verification audit','','Repository evidence only; no fresh live Amazon inspection or physical product testing. The account declaration cannot satisfy any product requirement. All profiles remain informational drafts with noindex, nofollow.','','## Summary','','```json',JSON.stringify(result.summary,null,2),'```','','## Product decisions','','Every row has manufacturer-cited specifications, not an independently tested specification set. All rows still require independent Canadian listing/selected-variant review before full release. Thirty-two lack completed editorial model approval; four retain their existing model-documentation editorial and safety clearances. None is newly granted. The full JSON audit preserves every specification, citation, identity assessment, unverified claim, safety note and release blocker.','','| Product / ASIN | ASIN and variant evidence | Technical / safety requirements still open | Editorial | Canadian link |','| --- | --- | --- | --- | --- |'];
 for(const row of rows){
  const requirements=[...new Set([...row.technical.unresolvedClaims,...row.safety.outstanding,...row.editorial.outstanding])];
  lines.push(`| ${escape(row.name)} — ${row.asin} | ${row.listingStatus}; ${escape(row.identity.assessment)} | Safety: ${row.safetyStatus}. ${escape(requirements.join(' '))} | ${row.editorialApproved?'Model documentation approved; listing/release incomplete; noindex retained':'Pending; noindex retained'} | ${row.linkActive?'ACTIVE — existing documented permission':'HELD — '+escape(row.linkBlocker??'')} |`);
 }
 lines.push('','## Changes justified by existing evidence','','Midland ER310, S.O.S. two-pack and ReadyWise 84-serving bucket now have structured owner-document listingEvidence, normalised from their existing archived assessments. This is not independent current-offer verification. Their already permitted links remain active. Other product approvals are unchanged. No evidence supplied with the account declaration resolves the five product holds or the outstanding full-publication requirements.','','Account: owner-declared registered and approved, recorded 2026-10-31; independent Amazon confirmation remains false. Linking remains operational. No price, seller, stock, certification or hands-on test is newly asserted.');
 mkdirSync(dirname(resolve(file)),{recursive:true});writeFileSync(file,lines.join('\n')+'\n');
}
console.log(JSON.stringify({account:result.account,summary:result.summary},null,2));
if(!rows.length||rows.some(r=>r.linkActive&&r.commercial.outstanding.length))process.exitCode=1;
