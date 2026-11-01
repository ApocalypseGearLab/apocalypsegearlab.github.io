import type { Product } from './products';
import { getMerchantLinks, canadianAffiliateIssues } from './affiliate';
import { isCommerciallyApproved, publicationIssues, mandatoryHold } from './release-policy';

/** Evidence coverage, link permission and editorial release are different axes.
 * Reading this status never changes product approvals or claims a fresh review.
 */
export function productVerification(product: Product) {
  const { data } = product;
  const research = data.research;
  const evidence = research?.listingEvidence;
  const manufacturer = data.sources.filter(source => source.kind === 'manufacturer');
  const citedSpecifications = data.specs.filter(spec => manufacturer.some(source => source.url === spec.source)).length;
  const manufacturerFacts = research?.confirmed.filter(fact => fact.sourceIds.some(id => manufacturer.some(source => source.id === id))).length ?? 0;
  const modelDocumented = citedSpecifications > 0 && citedSpecifications === data.specs.length && manufacturerFacts > 0;
  const matchingEvidence = Boolean(evidence && evidence.url === `https://www.amazon.ca/dp/${data.links.amazonCa.asin}`
    && evidence.matchedAsin === data.links.amazonCa.asin
    && evidence.matchedModel === (data.modelNumber ?? data.name));
  const listingStatus = research?.listingVerified && matchingEvidence && evidence?.method === 'live-page' ? 'independently-verified'
    : matchingEvidence && evidence?.method === 'owner-document' ? 'owner-documented' : 'not-independently-verified';
  const listingLabel = listingStatus === 'independently-verified' ? 'Listing independently verified'
    : listingStatus === 'owner-documented' ? 'Listing documented by owner' : 'Listing not independently verified';
  const link = getMerchantLinks(product).find(link => link.key === 'amazon-ca');
  const fullyApproved = isCommerciallyApproved(product);
  return {
    modelDocumented, citedSpecifications, manufacturerFacts, listingStatus, listingLabel,
    evidenceLabel: modelDocumented ? 'Manufacturer sources cited' : 'Documentation incomplete',
    profileLabel: fullyApproved ? 'Editorially reviewed profile' : 'Information only',
    editorialLabel: research?.publicationApproved ? 'Model documentation reviewed' : 'Editorial verification incomplete',
    editorialApproved: Boolean(research?.publicationApproved), fullyApproved,
    safetyStatus: research?.safetyStatus ?? 'pending',
    linkActive: Boolean(link?.href),
    linkLabel: link?.href ? 'Amazon.ca link available' : 'Amazon.ca link on hold',
    linkBlocker: link?.href ? null : link?.unavailableReason ?? 'No Canadian retailer link recorded',
  } as const;
}

/** Audit details stay in reports; public cards use concise, truthful labels. */
export function productVerificationAudit(product: Product) {
  const { data } = product, research = data.research;
  const status = productVerification(product);
  return {
    id: product.id, name: data.name, asin: data.links.amazonCa.asin, model: data.modelNumber,
    url: data.links.amazonCa.url, ...status,
    identity: {
      independentlyVerified: status.listingStatus === 'independently-verified',
      evidence: research?.listingEvidence ?? null,
      assessment: research?.identityNotes ?? 'No identity assessment recorded.',
      outstanding: status.listingStatus === 'independently-verified' ? [] : ['Independent current Canadian ASIN/selected-variant verification is not recorded.'],
    },
    technical: {
      status: status.modelDocumented ? 'manufacturer-documented-not-physically-tested' : 'documentation-incomplete',
      specifications: data.specs,
      confirmed: research?.confirmed ?? [],
      // Preserve the precise unresolved claims, including technical conflicts.
      unresolvedClaims: research?.unverifiedClaims ?? [],
      sources: data.sources,
    },
    safety: {
      status: status.safetyStatus, mandatoryHold: mandatoryHold(product) ?? null,
      limitations: research?.safetyNotes ?? [],
      outstanding: status.safetyStatus === 'cleared' ? [] : [
        status.safetyStatus === 'blocked' ? 'Resolve the documented safety/certification hold.' : 'Complete the recorded product-specific safety review.',
        ...(research?.publicationBlockers ?? []),
      ],
    },
    editorial: {
      reviewStatus: data.reviewStatus, publicationApproved: status.editorialApproved,
      outstanding: publicationIssues(product),
      independentlyIndexable: status.fullyApproved,
    },
    commercial: {
      decision: research?.affiliateReview ?? null, active: status.linkActive,
      blocker: status.linkBlocker, outstanding: canadianAffiliateIssues(product),
    },
    physicalTesting: data.testing,
  };
}
