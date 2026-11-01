import type { UniverseId } from './taxonomy';

export const SITE = {
  name: 'ApocalypseGearLab',
  tagline: 'Survival gear and preparedness guides',
  defaultDescription:
    'Practical survival gear guides and emergency preparedness checklists for blackouts, disasters and extended disruptions.',
  version: '0.1',
} as const;

/**
 * Operational permission to use Canadian Special Links. The owner now reports
 * registration and approval; provenance is recorded separately below.
 * This operational switch is NOT independent verification of private account
 * standing or final approval. Disable immediately for a known closure,
 * rejection or suspension. Per-product link review and concrete safety holds
 * remain mandatory; an active URL does not claim that its listing is verified.
 */
export const AMAZON_CA_LINKING_ENABLED = true;
/** Independent Amazon confirmation only; an owner declaration cannot set this. */
export const AMAZON_CA_FINAL_APPROVAL_CONFIRMED = false;
export const AMAZON_CA_ACCOUNT_DECLARATION = {
  registration: 'registered',
  approval: 'approved',
  source: 'owner-declaration',
  recordedOn: '2026-10-31',
  marketplace: 'ca',
  site: 'https://apocalypsegearlab.github.io',
  trackingId: 'apocalypsegear-20',
  statement: 'The site owner declares that the Amazon Associates account is registered and approved.',
  independentlyConfirmed: false,
} as const;
export const AMAZON_ASSOCIATE_STATEMENT = 'As an Amazon Associate I earn from qualifying purchases.';

export const NAV = [
  { label: 'Blackout', href: '/blackout/' },
  { label: 'Fallout', href: '/fallout/' },
  { label: 'Outbreak', href: '/outbreak/' },
  { label: 'Gear catalogue', href: '/gear/' },
] as const;

export interface Universe {
  id: UniverseId;
  name: string;
  signal: string;
  tagline: string;
  summary: string;
  accent: string;
  fiction: boolean;
  sourcingNote: string;
}

export const UNIVERSES: Record<UniverseId, Universe> = {
  blackout: {
    id: 'blackout',
    name: 'Blackout',
    signal: 'Grid failure',
    tagline: 'Keep light, power and communication running when the grid does not.',
    summary:
      'Practical preparedness for extended electrical outages: power, lighting, radios, communication and household planning.',
    accent: 'var(--c-amber)',
    fiction: false,
    sourcingNote: 'Electrical and battery safety guidance will cite manufacturer documentation and official safety agencies.',
  },
  fallout: {
    id: 'fallout',
    name: 'Fallout',
    signal: 'Disaster response',
    tagline: 'Kits, water, food and shelter for real-world emergencies.',
    summary:
      'Responsible disaster and crisis preparedness: evacuation bags, water, food, first aid, shelter and household plans.',
    accent: 'var(--c-rust)',
    fiction: false,
    sourcingNote:
      'Guidance on radiation, chemical hazards or medical treatment will link to official emergency-management sources (for example Ready.gov, FEMA and the Government of Canada). We do not make unsupported safety claims.',
  },
  outbreak: {
    id: 'outbreak',
    name: 'Outbreak',
    signal: 'Field readiness',
    tagline: 'Carry, protect and navigate. Fiction stays clearly labelled.',
    summary:
      'Equipment profiles for evacuation, outdoor travel and practical protection. Plan your load, understand each item’s limits and follow the manufacturer instructions.',
    accent: 'var(--c-moss)',
    fiction: true,
    sourcingNote: 'Equipment guidance cites manufacturer documents. Respirator fit, eye protection and satellite subscriptions have specific limits; fictional scenarios are kept separate from real safety advice.',
  },
};
