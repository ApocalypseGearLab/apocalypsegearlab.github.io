import type { UniverseId } from './taxonomy';

export const SITE = {
  name: 'ApocalypseGearLab',
  tagline: 'Survival gear and preparedness guides',
  defaultDescription:
    'Practical survival gear guides and emergency preparedness checklists for blackouts, disasters and extended disruptions.',
  version: '0.1',
} as const;

/**
 * Initial-period linking requested by the owner with a declared Canadian site,
 * accessible account and a tracking tag recognized by Amazon's Link Checker.
 * Final review is not a prerequisite for initial-period Special Links.
 * This operational switch is NOT independent verification of private account
 * standing or final approval. Disable immediately for a known closure,
 * rejection or suspension. Per-product link review and concrete safety holds
 * remain mandatory; an active URL does not claim that its listing is verified.
 */
export const AMAZON_CA_LINKING_ENABLED = true;
export const AMAZON_CA_FINAL_APPROVAL_CONFIRMED = false;
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
    signal: 'Survival scenarios',
    tagline: 'General preparedness, plus clearly labelled fiction.',
    summary:
      'Long-term supply planning, storage and inventory management, alongside fictional scenario simulations that are never presented as real advice.',
    accent: 'var(--c-moss)',
    fiction: true,
    sourcingNote: 'Real preparedness content and fictional scenarios are kept visibly separate.',
  },
};
