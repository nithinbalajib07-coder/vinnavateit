import { WardenAlert } from '../types/world';

export const ACTIVE_SURGE_ALERT: WardenAlert = {
  id: 'alert-gale-409',
  domainId: 'skydrift',
  surgeType: 'Gale-Shear',
  wardenName: 'Warden Vaelen Kael',
  wardenRank: 'Senior Wind-Sentry, 3rd Aerial Quadrant',
  station: 'Skyward Spire Mooring Outpost #19',
  urgency: 'CRITICAL',
  message:
    'Severe high-altitude atmospheric barometric inversion detected across Gale-Shear Pass. Updraft shear velocity climbing past 74 knots. Suspension cables risking harmonic rupture. All airborne skiffs and rope couriers must divert immediately.',
  countdownSeconds: 420, // 7:00 countdown timer
  affectedRegion: 'Gale-Shear Pass & High Suspension Ropewalks (Waypoints 4 to 5)',
  recommendedAction:
    'Sever payload sail kites immediately. Divert southwest toward Low-Altitude Aerie Hollow (Shelter Way-Station 12) via reinforced cliff-face stairs.',
  shelterWaypointId: 'wp-shelter-12',
  shelterName: 'Low-Altitude Aerie Hollow (Shelter 12)',
  barometricTrace: [42, 48, 55, 68, 85, 94, 98, 92, 97, 100],
};

export const ALL_CLEAR_STATE: WardenAlert = {
  id: 'alert-clear-000',
  domainId: 'skydrift',
  surgeType: 'Gale-Shear',
  wardenName: 'Warden Caelia Vael',
  wardenRank: 'Chief Vigilant of the Calm Shoals',
  station: 'Meridian Tower Central',
  urgency: 'ALL_CLEAR',
  message:
    'Current harmonics stabilized across all four quadrants. Updraft velocity steady at 14 knots WNW. Warding seals resonant and green. Safe passage permitted along marked courier routes.',
  countdownSeconds: 0,
  affectedRegion: 'No active threat sectors identified.',
  recommendedAction: 'Maintain standard travel velocity and inspect beeswax satchel seals at boundary gates.',
  shelterWaypointId: '',
  shelterName: 'Standard Route Active',
  barometricTrace: [15, 16, 14, 15, 14, 15, 14, 15],
};

export const DOMAIN_SURGE_PRESETS: Record<string, WardenAlert> = {
  skydriftGale: ACTIVE_SURGE_ALERT,
  tidereachBore: {
    id: 'alert-tide-201',
    domainId: 'tidereach',
    surgeType: 'Tidal Bore',
    wardenName: 'Warden Maren Shoal',
    wardenRank: 'Reef Sentinel Captain',
    station: 'Sunken Archway Mooring #4',
    urgency: 'WARNING',
    message:
      'Abyssal spring tide surging through lower canal conduits. Mooring pontoons submerged by 2.4 cubits. Reedway path washed out.',
    countdownSeconds: 680,
    affectedRegion: 'The Sinking Reedway Canal locks',
    recommendedAction: 'Tie off skiffs at upper terrace docks; do not attempt downstream navigation.',
    shelterWaypointId: 'wp-0',
    shelterName: 'Port Brinewater High Quay',
    barometricTrace: [20, 25, 40, 65, 80, 88, 82],
  },
  stonemarchQuake: {
    id: 'alert-lithic-803',
    domainId: 'stonemarch',
    surgeType: 'Lithic Quake',
    wardenName: 'Warden Torvald Khar',
    wardenRank: 'Deep Strata Seismic Seer',
    station: 'Basalt Bastion Shaft 7',
    urgency: 'CRITICAL',
    message:
      'Tectonic fracture propagating along the Sunken Foundry approach. Bedrock acoustic frequency dropped below 4 Hz. Heavy rockfall in descent tubes.',
    countdownSeconds: 310,
    affectedRegion: 'Sunken Foundry Outer Galleries',
    recommendedAction: 'Fall back into vaulted keystone galleries; plant iron anchor chocks.',
    shelterWaypointId: 'wp-5',
    shelterName: 'Crag-Anchor Under-Vault',
    barometricTrace: [30, 45, 60, 90, 95, 99, 93],
  },
  emberholdEruption: {
    id: 'alert-pyre-109',
    domainId: 'emberhold',
    surgeType: 'Magma Fracture',
    wardenName: 'Warden Kaelen Pyre',
    wardenRank: 'Crucible Flare Overseer',
    station: 'Obsidian Hearth Vent #12',
    urgency: 'CRITICAL',
    message:
      'Thermal Current resonance spiked to 114 ψ. Lava weir overflow imminent across northern crucible channels. Ash plume density 92%.',
    countdownSeconds: 240,
    affectedRegion: 'Northern Crucible Slagways',
    recommendedAction: 'Fasten heat-reflective cowls and divert into subterranean basalt tubes.',
    shelterWaypointId: 'wp-shelter-12',
    shelterName: 'Sub-Crust Basalt Tube 4',
    barometricTrace: [50, 70, 85, 96, 100, 100],
  },
};
