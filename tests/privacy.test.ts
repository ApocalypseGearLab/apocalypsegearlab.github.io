import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAnalyticsConsent, ANALYTICS_CONSENT_DAYS } from '../src/lib/analytics-consent';
const now=Date.UTC(2026,10,7);
const record=(choice:unknown,updatedAt=now,version=1)=>JSON.stringify({version,choice,updatedAt});
test('only a current explicit analytics decision can be remembered',()=>{
  assert.equal(parseAnalyticsConsent(record('granted'),now)?.choice,'granted');
  assert.equal(parseAnalyticsConsent(record('denied'),now)?.choice,'denied');
  for(const raw of [null,'','garbage','null','true','{}',record('yes'),record(true),record('granted',now,2)])assert.equal(parseAnalyticsConsent(raw,now),undefined);
});
test('expired, future and malformed consent records fail closed',()=>{
  for(const raw of [record('granted',now-ANALYTICS_CONSENT_DAYS*86400000),record('granted',now+1),JSON.stringify({version:1,choice:'granted',updatedAt:'2026-11-07'})])assert.equal(parseAnalyticsConsent(raw,now),undefined);
  assert.equal(parseAnalyticsConsent(record('granted',now-ANALYTICS_CONSENT_DAYS*86400000+1),now)?.choice,'granted');
});

import {restoreReviewedHunks} from '../scripts/phase1-preservation.mjs';
test('reviewed source restoration treats replacement metacharacters as literal text',()=>{
 const original="literal $& and $` and $' and $$; unicode é\nnext line";
 assert.equal(restoreReviewedHunks('prefix candidate suffix',[{before:original,after:'candidate'}],'fixture'),'prefix '+original+' suffix');
 assert.equal(restoreReviewedHunks('final',[{before:'original',after:'intermediate'},{before:'intermediate',after:'final'}],'fixture'),'original');
 for(const source of ['missing','candidate candidate'])assert.throws(()=>restoreReviewedHunks(source,[{before:original,after:'candidate'}],'fixture'),/Exactly one reviewed Phase1 hunk/);
});
