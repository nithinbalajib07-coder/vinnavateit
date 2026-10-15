import { DomainId, Waypoint } from '../types/world';

export const OPEN_WORLD_WAYPOINTS: Waypoint[] = [
  {
    id: 'wp-port-brinewater',
    name: 'Port Brinewater Quay',
    domainId: 'tidereach',
    isBorder: false,
    distanceFromStartKm: 0,
    currentStrength: 96,
    description: 'Home berth of the apprentice courier guild in the radiant delta canals of Tidereach. Skiffs glide quietly past submerged marble columns, and lanterns reflect off reed-banked lagoons.',
    hazards: ['Slick moss walkways'],
    x: 194,
    y: 515,
    placeType: 'Bioluminescent Port & Harbor',
    dangerStatus: {
      level: 'SAFE',
      label: 'Safe Haven · Resonant Tide 96%',
    },
    environmentalMetric: {
      label: 'Tidal Swell & Current Depth',
      value: '140 Fathoms · Sub-Oceanic Inflow',
      percent: 96,
    },
    sensoryQuote: 'Water-droplets resonate through submerged marble canals. The wake of skiffs rocks quietly against mossy reeds.',
  },
  {
    id: 'wp-sinking-roadway',
    name: 'The Sinking Roadway',
    domainId: 'tidereach',
    isBorder: false,
    distanceFromStartKm: 42.4,
    currentStrength: 64,
    description: 'Luminous underwater rail-barge tracks where the Tidal Current begins to thin. Submerged during high tide, leaving only glowing cyan track beacons visible to skilled wayfarers.',
    hazards: ['Thick morning reed fog'],
    x: 340,
    y: 448,
    placeType: 'Submerged Rail Track & Canal Causeway',
    dangerStatus: {
      level: 'SAFE',
      label: 'Low Tide Roadway · Signal 64%',
    },
    environmentalMetric: {
      label: 'Submergence Level & Reef Drift',
      value: '85 Fathoms · Slow Inflow',
      percent: 64,
    },
    sensoryQuote: 'Glowing cyan moss illuminates submerged iron rail tracks. Saltwater laps gently at wagon axles.',
  },
  {
    id: 'wp-shadowmere-rest',
    name: 'Shadowmere Rest',
    domainId: 'tidereach',
    isBorder: false,
    distanceFromStartKm: 98.0,
    currentStrength: 50,
    description: 'A tranquil sanctuary of weeping bioluminescent willows situated near the southern border crossing. Couriers pause here to dry wax satchels and steep aromatic kelp teas.',
    hazards: ['Damp swamp mist'],
    x: 470,
    y: 480,
    placeType: 'Tranquil Delta Willow Grove',
    dangerStatus: {
      level: 'SAFE',
      label: 'Tranquil Rest · Water Current 50%',
    },
    environmentalMetric: {
      label: 'Delta Moisture & Lagoon Salinity',
      value: '45 Fathoms · Brackish Shallows',
      percent: 50,
    },
    sensoryQuote: 'Luminescent weeping willows dip into tranquil brackish lagoons, shielding couriers from southern winds.',
  },
  {
    id: 'wp-mist-chasm',
    name: 'Border Gate VII: The Mist Chasm Bridge',
    domainId: 'skydrift',
    isBorder: true,
    borderTo: 'skydrift',
    borderGateName: 'Gate VII of the Seven Chasms',
    distanceFromStartKm: 78.8,
    currentStrength: 24,
    description: 'Titanic braided iron-cable suspension bridge hanging across deep vapor abysses between Tidereach and Skydrift. Border Wardens inspect cargo weights and verify diplomatic wax seals.',
    hazards: ['Shear canyon updrafts', 'Ledger frequency dampening'],
    x: 448,
    y: 340,
    shelterNearby: 'Mist Chasm Abutment Outpost',
    placeType: 'Border Gate VII · Suspended Cable Span',
    dangerStatus: {
      level: 'SAFE',
      label: 'Border Checkpoint · Signal Dampened',
    },
    environmentalMetric: {
      label: 'Canyon Crosswind & Cable Tension',
      value: '24.0 ψ · 18 Knots S',
      percent: 24,
    },
    sensoryQuote: 'Suspension cables thrum a mournful drone across the cloudy abyss. White vapors billow below wooden footboards.',
  },
  {
    id: 'wp-aerie-cloudweavers',
    name: 'Aerie of the Cloud-Weavers',
    domainId: 'skydrift',
    isBorder: false,
    distanceFromStartKm: 126.1,
    currentStrength: 91,
    description: 'Soaring limestone towers knit together with braided sky-silk bridges and cloud-catching waterfalls. Couriers glide between spires on feather-iron wings buoyed by perpetual thermal updrafts.',
    hazards: ['High rope sway'],
    x: 520,
    y: 240,
    placeType: 'Capital of the Cloud-Weavers · Floating Towers',
    dangerStatus: {
      level: 'SAFE',
      label: 'Safe Aloft Sanctuary · Air Current 91%',
    },
    environmentalMetric: {
      label: 'Atmospheric Updraft Velocity',
      value: '41.0 ψ · 28 Knots WNW',
      percent: 91,
    },
    sensoryQuote: 'High-altitude crosswinds whistle through braided suspension tethers. Clouds drift beneath swaying limestone walkways.',
  },
  {
    id: 'wp-gale-shear',
    name: 'Gale-Shear Pass (Surge Threat Area)',
    domainId: 'skydrift',
    isBorder: false,
    distanceFromStartKm: 168.5,
    currentStrength: 52,
    description: 'Treacherous wind tunnel engulfed in a turbulent gale-shear vortex. High crosswinds frequently snap guide lines, requiring couriers to divert to Low-Altitude Shelter 12 during alerts.',
    hazards: ['Catastrophic gale-shear surge', 'Snapping safety tethers'],
    x: 640,
    y: 195,
    shelterNearby: 'Low-Altitude Aerie Hollow (Shelter 12)',
    rerouteX: 605,
    rerouteY: 295,
    placeType: 'Hazardous Gale Tunnel & Vortex Chasm',
    dangerStatus: {
      level: 'CRITICAL',
      label: 'CRITICAL DANGER ZONE · Severe Gale Vortex',
      details: '74-knot crosswinds detected. Risk of cable rupture! Divert to Shelter 12.',
    },
    environmentalMetric: {
      label: 'Turbulent Shear Velocity',
      value: '74 Knots · Gale Surge Vortex',
      percent: 88,
    },
    sensoryQuote: 'Deafening howling winds whip through narrow limestone jaws. Safety carabiners screech under extreme strain.',
  },
  {
    id: 'wp-crag-anchor',
    name: 'Border Gate IV: Crag-Anchor Bastion',
    domainId: 'stonemarch',
    isBorder: true,
    borderTo: 'stonemarch',
    borderGateName: 'Gate IV of the Basalt Arch',
    distanceFromStartKm: 214.0,
    currentStrength: 28,
    description: 'Colossal granite buttresses bolting the lowest floating isle of Skydrift to the bedrock mountain shoulders of Stonemarch. Heavy stone seals and contract weight tallies are enforced here.',
    hazards: ['Strict contract inspection', 'Lithic pressure drop'],
    x: 740,
    y: 330,
    shelterNearby: 'Crag-Anchor Under-Vault',
    placeType: 'Border Gate IV · Monolithic Basalt Buttress',
    dangerStatus: {
      level: 'SAFE',
      label: 'Lithic Border Bastion · Keystone Fixed',
    },
    environmentalMetric: {
      label: 'Granite Anchor Tension & Lithic Load',
      value: '28.0 ψ · Keystone Fixed',
      percent: 28,
    },
    sensoryQuote: 'Massive forged iron chains anchor soaring cliffs into bedrock foundations. Silent sentinels stamp heavy clay seals.',
  },
  {
    id: 'wp-sunken-foundry',
    name: 'The Sunken Foundry of Deepvault',
    domainId: 'stonemarch',
    isBorder: false,
    distanceFromStartKm: 278.2,
    currentStrength: 94,
    description: 'Colossal subterranean caldera crater glowing with emerald geothermal energy and towering basalt pillars. Masters of the Lithic Cadre carve precision clocks and ballast keystones in these depths.',
    hazards: ['Heavy smelting fumes'],
    x: 818,
    y: 468,
    placeType: 'Subterranean Caldera Foundry & Deep Vaults',
    dangerStatus: {
      level: 'SAFE',
      label: 'Industrial Stronghold · Earth Current 94%',
    },
    environmentalMetric: {
      label: 'Bedrock Tectonic Resonance',
      value: '18.6 ψ · Keystone Fixed',
      percent: 94,
    },
    sensoryQuote: 'Subterranean geothermal heat hums through bedrock walls. Ancient chiseled tallies stand immutable.',
  },
  {
    id: 'wp-shadowmere-trail',
    name: 'Shadowmere Trail',
    domainId: 'stonemarch',
    isBorder: false,
    distanceFromStartKm: 160.0,
    currentStrength: 68,
    description: 'Dense coniferous forest path carpeted with moss and ancient granite megaliths. Cool mountain shade and quiet pine needles cushion the journey between the delta and mountain bastions.',
    hazards: ['Wild terrain roots'],
    x: 540,
    y: 490,
    placeType: 'Ancient Pine Forest & Megalith Trail',
    dangerStatus: {
      level: 'SAFE',
      label: 'Forested Trail · Earth Resonance 68%',
    },
    environmentalMetric: {
      label: 'Canopy Density & Soil Cohesion',
      value: '88% Cover · Deep Root Bastion',
      percent: 68,
    },
    sensoryQuote: 'Towering pine canopies drape over moss-veined megaliths. Deep loam dampens every footstep.',
  },
  {
    id: 'wp-border-chasm-bridge',
    name: 'Border Chasm Bridge',
    domainId: 'stonemarch',
    isBorder: true,
    borderTo: 'stonemarch',
    borderGateName: 'Gate of the Southern Meridian',
    distanceFromStartKm: 125.0,
    currentStrength: 30,
    description: 'Southern stone archway spanning the forested gorge between the lower marshlands and the Stonemarch plateaus. An ancient stone tally monument marks centuries of trade.',
    hazards: ['Narrow gorge crossing'],
    x: 450,
    y: 520,
    placeType: 'Southern Gorge Stone Archway',
    dangerStatus: {
      level: 'SAFE',
      label: 'Border Checkpoint · Earth Current 30%',
    },
    environmentalMetric: {
      label: 'Gorge Structural Stability',
      value: '30.0 ψ · Keystone Anchored',
      percent: 30,
    },
    sensoryQuote: 'Chiseled stone arches bridge the natural boundary rift between marshland and lithic plateaus.',
  },
  {
    id: 'wp-cinder-crag',
    name: 'Cinder Crag',
    domainId: 'emberhold',
    isBorder: false,
    distanceFromStartKm: 190.0,
    currentStrength: 88,
    description: 'Dramatic black volcanic outcrop overlooking sulfur terraces and glowing lava fractures. The air shimmers with dry heat, and ember-smiths forge heat-resistant crucible vials here.',
    hazards: ['Thermal ash bursts'],
    x: 145,
    y: 140,
    placeType: 'Obsidian Caldera Outcrop',
    dangerStatus: {
      level: 'SAFE',
      label: 'Caldera Outpost · Fire Current 88%',
    },
    environmentalMetric: {
      label: 'Crucible Thermal Radiance',
      value: '68.2 ψ · 640°C Hearth',
      percent: 88,
    },
    sensoryQuote: 'Black volcanic glass glistens beneath orange skies. Smoke plumes trail into smoldering horizon fissures.',
  },
  {
    id: 'wp-sulfur-vents',
    name: 'Sulfur Vents (Hazard Area)',
    domainId: 'emberhold',
    isBorder: false,
    distanceFromStartKm: 145.0,
    currentStrength: 75,
    description: 'Steaming yellow fumarole fields emitting scalding acidic vapors. The brittle sulfur crust crackles underfoot, demanding strict adherence to marked paths.',
    hazards: ['Acid steam jets', 'Fragile crust'],
    x: 240,
    y: 260,
    placeType: 'Boiling Sulfur Fumaroles & Acid Steam Terraces',
    dangerStatus: {
      level: 'WARNING',
      label: 'WARNING HAZARD ZONE · Acid Steam Fumaroles',
      details: 'High acid steam density. Fasten cowl filters before advancing.',
    },
    environmentalMetric: {
      label: 'Sulfur Gas Saturation & Heat',
      value: '480°C · Toxic Vapor Flumes',
      percent: 78,
    },
    sensoryQuote: 'Yellow crusted terraces hiss with scalding steam jets. Bitter sulfur coats traveler cowls and pack leather.',
  },
  {
    id: 'wp-ashfall-volcano',
    name: 'Ashfall Volcano (Crucible of Pyre-Peak)',
    domainId: 'emberhold',
    isBorder: false,
    distanceFromStartKm: 310.0,
    currentStrength: 98,
    description: 'The roaring incandescent heart of the Thermal Current. A towering active volcanic cone ejecting molten magma rivers that feed the legendary crucible forges of Emberhold.',
    hazards: ['Molten lava flows', 'Lethal heat'],
    x: 895,
    y: 175,
    placeType: 'Crucible of Pyre-Peak · Erupting Slag Caldera',
    dangerStatus: {
      level: 'CRITICAL',
      label: 'CRITICAL DANGER ZONE · Active Molten Slagflow',
      details: 'Thermal flare active! Slag channels overflowing. Extreme heat.',
    },
    environmentalMetric: {
      label: 'Magma Velocity & Core Temperature',
      value: '980°C Slagflow · Peak Thermal Flare',
      percent: 98,
    },
    sensoryQuote: 'Incandescent molten veins surge through basalt troughs. Scalding sulfur sparks crackle in the forge air.',
  },
];

export const ILAN_ROUTE = OPEN_WORLD_WAYPOINTS;

export const SHELTER_REROUTE_WAYPOINT: Waypoint = {
  id: 'wp-shelter-12',
  name: 'Low-Altitude Aerie Hollow (Shelter 12)',
  domainId: 'skydrift',
  isBorder: false,
  distanceFromStartKm: 154.0,
  currentStrength: 45,
  description: 'Reinforced cavern bunker anchored into the cliff face, protected from gale-shear winds.',
  hazards: ['Sub-cloud dampening'],
  x: 605,
  y: 295,
};

// Continuous open-world violet path network coordinates matching the map's neon violet lines
export const VIOLET_PATHS: Array<Array<{ x: number; y: number }>> = [
  // 1. Tidereach Delta Loop to Port Brinewater & Sinking Roadway
  [
    { x: 194, y: 515 },
    { x: 250, y: 485 },
    { x: 300, y: 465 },
    { x: 340, y: 448 },
    { x: 380, y: 410 },
    { x: 415, y: 375 },
    { x: 448, y: 340 }, // Border Gate VII
  ],
  // 2. Fork to Shadowmere from Sinking Roadway
  [
    { x: 340, y: 448 },
    { x: 390, y: 465 },
    { x: 470, y: 480 }, // Shadowmere Rest
    { x: 505, y: 485 },
    { x: 540, y: 490 }, // Shadowmere Trail
    { x: 620, y: 515 },
    { x: 670, y: 550 },
    { x: 730, y: 570 },
    { x: 780, y: 520 },
    { x: 818, y: 468 }, // Sunken Foundry of Deepvault
  ],
  // 3. West Coast Path from Tidereach to West Emberhold
  [
    { x: 194, y: 515 },
    { x: 160, y: 540 },
    { x: 120, y: 560 },
    { x: 70, y: 540 },
    { x: 50, y: 480 },
    { x: 40, y: 390 },
    { x: 40, y: 300 },
    { x: 60, y: 240 },
    { x: 90, y: 180 },
    { x: 145, y: 140 }, // Cinder Crag
    { x: 170, y: 210 },
    { x: 240, y: 260 }, // Sulfur Vents
    { x: 330, y: 280 },
    { x: 380, y: 310 },
    { x: 448, y: 340 }, // Joins Border Gate VII
  ],
  // 4. Border Gate VII up into Skydrift Archipelago
  [
    { x: 448, y: 340 }, // Border Gate VII
    { x: 480, y: 285 },
    { x: 520, y: 240 }, // Aerie of Cloud-Weavers
    { x: 575, y: 215 },
    { x: 640, y: 195 }, // Gale-Shear Pass
  ],
  // 5. Skydrift Archway Loop
  [
    { x: 520, y: 240 },
    { x: 450, y: 230 },
    { x: 380, y: 250 },
    { x: 340, y: 285 },
    { x: 448, y: 340 },
  ],
  // 6. Skydrift East into Ashfall Volcano (East Emberhold)
  [
    { x: 640, y: 195 }, // Gale-Shear Pass
    { x: 700, y: 185 },
    { x: 760, y: 190 },
    { x: 820, y: 195 },
    { x: 895, y: 175 }, // Ashfall Volcano
  ],
  // 7. Skydrift to Border Gate IV Crag-Anchor & Sunken Foundry
  [
    { x: 520, y: 240 },
    { x: 570, y: 290 },
    { x: 630, y: 310 },
    { x: 740, y: 330 }, // Border Gate IV Crag-Anchor
    { x: 770, y: 385 },
    { x: 805, y: 435 },
    { x: 818, y: 468 }, // Sunken Foundry of Deepvault
  ],
  // 8. Connecting Path from Shadowmere Rest to Border Gate IV
  [
    { x: 470, y: 480 },
    { x: 540, y: 440 },
    { x: 630, y: 370 },
    { x: 740, y: 330 },
  ],
  // 9. Southern Tidereach Delta Loop connecting through Border Chasm Bridge to Shadowmere Rest
  [
    { x: 194, y: 515 },
    { x: 230, y: 580 },
    { x: 280, y: 620 },
    { x: 350, y: 580 },
    { x: 450, y: 520 }, // Border Chasm Bridge
    { x: 470, y: 480 }, // Shadowmere Rest
  ],
];

// Snap cursor strictly along neon violet path line segments
export function snapToClosestVioletPath(
  cursorX: number,
  cursorY: number,
  threshold: number = 75
): { x: number; y: number; dist: number; isNearPath: boolean } {
  let closestPoint = { x: cursorX, y: cursorY };
  let minDistance = Infinity;

  for (const path of VIOLET_PATHS) {
    for (let i = 0; i < path.length - 1; i++) {
      const p1 = path[i];
      const p2 = path[i + 1];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const lenSq = dx * dx + dy * dy;

      let t = 0;
      if (lenSq > 0) {
        t = Math.max(0, Math.min(1, ((cursorX - p1.x) * dx + (cursorY - p1.y) * dy) / lenSq));
      }

      const projX = p1.x + t * dx;
      const projY = p1.y + t * dy;
      const dist = Math.hypot(cursorX - projX, cursorY - projY);

      if (dist < minDistance) {
        minDistance = dist;
        closestPoint = { x: projX, y: projY };
      }
    }
  }

  return {
    x: closestPoint.x,
    y: closestPoint.y,
    dist: minDistance,
    isNearPath: minDistance <= threshold,
  };
}

export function getDomainAtCoordinate(x: number, y: number): DomainId {
  if ((x < 360 && y < 380) || (x > 700 && y < 270)) {
    return 'emberhold';
  }
  if (x >= 320 && x <= 720 && y <= 330) {
    return 'skydrift';
  }
  if (x >= 580 && y > 320) {
    return 'stonemarch';
  }
  return 'tidereach';
}

// Active danger check returning alert message ONLY if moving through dangerous zones
export function checkHazardZoneAlert(x: number, y: number): {
  type: 'CRITICAL' | 'WARNING';
  title: string;
  message: string;
} | null {
  // 1. Gale-Shear Pass Vortex (radius ~58 around 640, 195)
  if (Math.hypot(x - 640, y - 195) < 58) {
    return {
      type: 'CRITICAL',
      title: 'CRITICAL GALE-SHEAR VORTEX',
      message: '74-knot hurricane updrafts detected! Extreme risk of cable rupture. Divert to Shelter 12.',
    };
  }

  // 2. Sulfur Vents (radius ~48 around 240, 260)
  if (Math.hypot(x - 240, y - 260) < 48) {
    return {
      type: 'WARNING',
      title: 'SULFUR FUMAROLE HAZARD',
      message: 'High acid steam density and brittle crust! Fasten cowl filters before advancing.',
    };
  }

  // 3. Ashfall Volcano / Crucible of Pyre-Peak (radius ~68 around 895, 175)
  if (Math.hypot(x - 895, y - 175) < 68) {
    return {
      type: 'CRITICAL',
      title: 'MOLTEN CALDERA ZONE',
      message: 'Active magma eruption! Slag channels overflowing at 980°C. Catastrophic thermal flare.',
    };
  }

  // Pop-ups appear ONLY when moving through dangerous zones - everything else remains strictly on the sidepane!
  return null;
}

