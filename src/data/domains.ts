import { DomainId, DomainInfo } from '../types/world';

export const DOMAINS: Record<DomainId, DomainInfo> = {
  tidereach: {
    id: 'tidereach',
    name: 'Tidereach',
    element: 'Water',
    title: 'Domain of the Abyssal Currents & Canal Cities',
    description:
      'A sprawling wetland empire of sunken marble palaces, winding reed canals, and floating market skiffs. Governed by tidal cycles and indirect diplomatic subtleties.',
    culture:
      'Fluid, deeply indirect, and hospitable. Stating a demand outright is considered crude; deals are settled through ritual tea-pouring and mutual compliments.',
    speakingStyle: 'Gentle cadence, poetic metaphors, rhetorical inversions, flowing vowel endings.',
    harmonicFreq: '32.4 ψ (Sub-oceanic hum)',
    capital: 'Port Brinewater',
    primaryColor: '#0a1f2c',
    accentColor: '#19728f',
    secondaryColor: '#876233',
    badgeSymbol: 'water_drop',
    wardenOrder: 'Keepers of the Resonant Shoals',
    lacks: ['Dry lamp fuel', 'Dense forge coal', 'High-altitude rope fiber'],
    produces: ['Salt-cured provisions', 'Waxed courier satchels', 'Medicinal kelp extracts', 'Tidal pearls'],
  },
  skydrift: {
    id: 'skydrift',
    name: 'Skydrift',
    element: 'Air',
    title: 'Domain of the Floating Archipelagos & Cable Bridges',
    description:
      'Luminous limestone isles suspended above deep oceanic vapors by perpetual updrafts. Couriers traverse sway-bridges and glide-skiffs across terrifying cloud chasms.',
    culture:
      'Inquisitive, weight-conscious, nimble, and superstitious about ballast. Oaths are sworn on suspension cords; asking after someone’s payload weight is standard greeting etiquette.',
    speakingStyle: 'Rapid, breathy, whistling consonants, short crisp clauses with buoyant tone.',
    harmonicFreq: '41.0 ψ (High-altitude whistle)',
    capital: 'The Aerie of Cloud-Weavers',
    primaryColor: '#0d1e33',
    accentColor: '#2b77a7',
    secondaryColor: '#aa743c',
    badgeSymbol: 'air',
    wardenOrder: 'Cloud Watch of the Skyward Spire',
    lacks: ['Anchoring ballast stone', 'High-tensile silk rope', 'Fresh sweetwater springs'],
    produces: ['Feather-iron gliders', 'Vapor-condenser silk', 'Cloud-amber pitch', 'Wind vane bearings'],
  },
  stonemarch: {
    id: 'stonemarch',
    name: 'Stonemarch',
    element: 'Earth',
    title: 'Domain of the Monolithic Bastions & Deep Vaults',
    description:
      'Massive tiered fortress-cities carved into sheer granite peaks and cavernous sub-surface shafts. Everything is built to withstand tectonic epochs.',
    culture:
      'Oath-bound, formal, stoic, and architectural. A broken verbal contract is punishable by civic exile. Stone seals and weight tallies replace all informal promises.',
    speakingStyle: 'Deliberate, low-pitched, concise, devoid of ornament, concluding with affirmation verbs.',
    harmonicFreq: '18.6 ψ (Bedrock seismic resonance)',
    capital: 'Sunken Foundry of Deepvault',
    primaryColor: '#1f1b16',
    accentColor: '#61503c',
    secondaryColor: '#8c572b',
    badgeSymbol: 'landscape',
    wardenOrder: 'Lithic Sentry Cadre',
    lacks: ['Fresh sweetwater', 'Sub-surface illumination oil', 'Lightweight cordage'],
    produces: ['Granite ballast blocks', 'Forged chisel alloys', 'Deep-vein minerals', 'Seismic pendulum clocks'],
  },
  emberhold: {
    id: 'emberhold',
    name: 'Emberhold',
    element: 'Heat',
    title: 'Domain of the Smoldering Calderas & Forge-Halls',
    description:
      'A volcanic rift land of basalt aqueducts, sulfur terraces, and towering obsidian crucible towers driven by the Thermal Current.',
    culture:
      'Proud, fiercely direct, competitive, and honor-bound. They despise equivocation. To speak around a point is interpreted as betrayal.',
    speakingStyle: 'Crisp, staccato, guttural plosives, imperative syntax, rapid affirmation.',
    harmonicFreq: '68.2 ψ (Thermal caldera vibration)',
    capital: 'Crucible of Pyre-Peak',
    primaryColor: '#25120c',
    accentColor: '#be3915',
    secondaryColor: '#9c672b',
    badgeSymbol: 'local_fire_department',
    wardenOrder: 'Pyre-Seers of the Obsidian Hearth',
    lacks: ['Glacial ice blocks', 'Sweet mountain water', 'Fireproof rope bindings'],
    produces: ['Refined sulfur oils', 'Crucible-tempered blades', 'Thermal glass vials', 'Cinder-charcoal briquettes'],
  },
};
