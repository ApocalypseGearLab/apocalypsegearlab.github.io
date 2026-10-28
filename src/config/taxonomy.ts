export const UNIVERSE_IDS = ['blackout', 'fallout', 'outbreak'] as const;
export type UniverseId = (typeof UNIVERSE_IDS)[number];

export const CATEGORIES = [
  { id: 'power-stations', label: 'Emergency power stations', universe: 'blackout' },
  { id: 'solar', label: 'Solar generators and panels', universe: 'blackout' },
  { id: 'battery-banks', label: 'Portable battery banks', universe: 'blackout' },
  { id: 'lighting', label: 'Emergency lighting', universe: 'blackout' },
  { id: 'weather-radios', label: 'Weather radios', universe: 'blackout' },
  { id: 'backup-comms', label: 'Backup communication', universe: 'blackout' },
  { id: 'outage-kits', label: 'Power outage kits', universe: 'blackout' },
  { id: 'home-outage-planning', label: 'Home power outage preparedness', universe: 'blackout' },
  { id: 'evacuation-bags', label: 'Emergency evacuation bags', universe: 'fallout' },
  { id: 'water', label: 'Water storage and purification', universe: 'fallout' },
  { id: 'food', label: 'Emergency food supplies', universe: 'fallout' },
  { id: 'tools', label: 'Emergency repair tools', universe: 'fallout' },
  { id: 'first-aid', label: 'First aid supplies', universe: 'fallout' },
  { id: 'shelter', label: 'Emergency shelter', universe: 'fallout' },
  { id: 'protective-equipment', label: 'Protective equipment', universe: 'fallout' },
  { id: 'household-planning', label: 'Household emergency planning', universe: 'fallout' },
  { id: 'readiness-checklists', label: 'Disaster readiness checklists', universe: 'fallout' },
  { id: 'urban-gear', label: 'Urban survival equipment', universe: 'outbreak' },
  { id: 'tactical-backpacks', label: 'Evacuation backpacks', universe: 'outbreak' },
  { id: 'respiratory-protection', label: 'Particulate respirators', universe: 'outbreak' },
  { id: 'protective-eyewear', label: 'Protective eyewear', universe: 'outbreak' },
  { id: 'work-gloves', label: 'Protective work gloves', universe: 'outbreak' },
  { id: 'hiking-footwear', label: 'Hiking footwear', universe: 'outbreak' },
  { id: 'rainwear', label: 'Rain shells', universe: 'outbreak' },
  { id: 'satellite-navigation', label: 'Satellite navigation and communication', universe: 'outbreak' },
  { id: 'long-term-supply', label: 'Long-term supply planning', universe: 'outbreak' },
  { id: 'shelter-storage', label: 'Emergency shelter and storage', universe: 'outbreak' },
  { id: 'inventory-management', label: 'Survival inventory management', universe: 'outbreak' },
  { id: 'scenario-preparedness', label: 'Scenario-based preparedness', universe: 'outbreak' },
  { id: 'simulations', label: 'Fictional outbreak simulations', universe: 'outbreak' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];
export const CATEGORY_IDS = CATEGORIES.map((c) => c.id) as [CategoryId, ...CategoryId[]];

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
export function categoryUniverse(id: CategoryId): UniverseId {
  const found = CATEGORIES.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown category: ${id}`);
  return found.universe;
}
