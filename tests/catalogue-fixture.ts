// Independent expected identities and link decisions for this release.
export const OUTBREAK = {
  '511-tactical-rush72-2-backpack':['B0D9R239MT','tactical-backpacks'],
  '3m-aura-9205-n95-respirator':['B09FM2P1KF','respiratory-protection'],
  '3m-gogglegear-500-safety-goggles':['B016L26QS0','protective-eyewear'],
  'mechanix-m-pact-work-gloves':['B00939MRAA','work-gloves'],
  'merrell-moab-3-mid-waterproof-boots':['B0987Z7CKY','hiking-footwear'],
  'marmot-precip-rain-jacket':['B0CMS33YXX','rainwear'],
  'garmin-gpsmap-67i-satellite-gps':['B0C3WQPQPL','satellite-navigation'],
  '3m-6800-full-facepiece-respirator':['B00MA4K4C8','respiratory-protection'],
} as const;
export const PHASE43_FALLOUT = {
  'fnirsi-gc-01-geiger-counter':['B0BHH9X1WG','radiation-detection'],
  'readywise-84-servings-emergency-food-bucket':['B00TX5J74S','food-storage'],
  'datrex-dx2400f-emergency-food-ration':['B08T57RVBY','food-rations'],
  'sos-3600-calorie-emergency-food-rations':['B00W20PIHQ','food-rations'],
} as const;
export const ACTIVE_PRODUCTS = ['jackery-explorer-1000-v2','fenix-cl26r-pro','jackery-solarsaga-100w-air','sawyer-squeeze-sp129-water-filter','reliance-aqua-tainer-7-gallon','leatherman-wave-plus-multitool','sol-emergency-bivvy','fenix-hm50r-v2-headlamp','datrex-dx2400f-emergency-food-ration','fnirsi-gc-01-geiger-counter','midland-er310','sos-3600-calorie-emergency-food-rations',...Object.keys(OUTBREAK)];
