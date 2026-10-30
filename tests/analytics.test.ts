import test from 'node:test';
import assert from 'node:assert/strict';
import { affiliateClickParameters } from '../src/lib/affiliate-analytics';

const link = {href:'https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20', productId:'midland-er310',merchant:'amazon-ca',marketplace:'ca'};
test('affiliate parameters identify the recorded Canadian destination without page query data', () => {
  assert.deepEqual(affiliateClickParameters(link, 'https://apocalypsegearlab.github.io/gear/?email=private#secret'), {
    product_id:'midland-er310',asin:'B015QIC1PW',merchant:'amazon-ca',marketplace:'ca',destination_url:link.href,page_location:'https://apocalypsegearlab.github.io/gear/',
  });
});
test('malformed, foreign, retagged and incomplete destinations cannot be tracked as affiliate clicks', () => {
  for (const href of ['', '/gear/', link.href.replace('amazon.ca','amazon.ca.evil.example'),link.href.replace('https:','http:'),link.href.replace('apocalypsegear-20','other-20'),link.href+'&tag=apocalypsegear-20',link.href+'#x',link.href+'&email=private',link.href.replace('/dp/','/gp/')]) {
    assert.equal(affiliateClickParameters({...link,href},'https://apocalypsegearlab.github.io/'),undefined,href);
  }
  for (const override of [{merchant:'amazon-us'},{marketplace:'us'},{productId:''}]) assert.equal(affiliateClickParameters({...link,...override},'https://apocalypsegearlab.github.io/'),undefined);
});
