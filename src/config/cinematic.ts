import type { UniverseId } from './taxonomy';
export const CINEMATIC: Record<UniverseId, { title: string; alt: string; position: string }> = {
  blackout: { title: 'The Last Light', alt: 'Fictional frozen city with failed power lines and a survivor lighting the road with a flashlight', position: '82% center' },
  fallout: { title: 'The Contaminated World', alt: 'Fictional ruined industrial exclusion zone with radiation signs and a survivor wearing a protective suit and respirator', position: '75% center' },
  outbreak: { title: 'The Last Quarantine', alt: 'Fictional abandoned hospital quarantine ward with a person in a blue protective suit carrying a flashlight', position: '86% center' },
  whiteout: { title: 'The Frozen Extinction', alt: 'Fictional arctic expedition climbing through a blizzard beside an icebound research complex', position: '76% center' },
};
export const cinematicSrc = (id: UniverseId, width: number) => `/images/universes/${id}-survival-hero-${width}.webp`;
export const cinematicSrcset = (id: UniverseId) => [768, 1280, 1600].map(width => `${cinematicSrc(id, width)} ${width}w`).join(', ');
