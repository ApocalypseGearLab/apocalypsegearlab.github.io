import { categoryUniverse, type CategoryId } from '../config/taxonomy';
/** Context links explain planning, never assert cross-product compatibility. */
export function planningContext(category: CategoryId) {
  const links: Partial<Record<CategoryId, [string, string]>> = {
    'power-stations': ['/blackout/#planning-4', 'estimate power-station runtime and charging reserve'],
    'solar': ['/blackout/#planning-8', 'check electrical inputs and charging compatibility'],
    'portable-refrigeration': ['/blackout/#planning-6', 'plan cooling power and independent temperature monitoring'],
    'temperature-monitoring': ['/blackout/#planning-6', 'understand refrigeration and temperature-history limits'],
    'rechargeable-batteries': ['/blackout/#planning-7', 'check device battery chemistry and charger requirements'],
    'lighting': ['/blackout/#planning-5', 'prioritize lighting and communication power'],
    'weather-radios': ['/blackout/#planning-5', 'plan radio power alongside lighting and phone charging'],
    'water': ['/fallout/#planning-7', 'understand water-treatment and contamination limits'],
    'food': ['/fallout/#planning-2', 'compare preparation needs and actual food quantities'],
    'food-rations': ['/fallout/#planning-2', 'compare preparation needs and actual food quantities'],
    'tactical-backpacks': ['/outbreak/#planning-7', 'build a manageable evacuation supply checklist'],
    'respiratory-protection': ['/outbreak/#planning-6', 'understand respirator fit and approved component selection'],
    'satellite-navigation': ['/outbreak/#planning-3', 'prepare navigation and communication backups'],
  };
  const [href, label] = links[category] ?? [`/${categoryUniverse(category)}/#sector-guide`, 'read the sector preparedness guide'];
  return { href, label };
}
