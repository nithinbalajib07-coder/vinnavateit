export type DomainId = 'tidereach' | 'skydrift' | 'stonemarch' | 'emberhold';

export interface DomainInfo {
  id: DomainId;
  name: string;
  element: 'Water' | 'Air' | 'Earth' | 'Heat';
  title: string;
  description: string;
  culture: string;
  speakingStyle: string;
  harmonicFreq: string;
  capital: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  badgeSymbol: string;
  wardenOrder: string;
  lacks: string[];
  produces: string[];
}

export interface Waypoint {
  id: string;
  name: string;
  domainId: DomainId;
  isBorder: boolean;
  borderTo?: DomainId;
  borderGateName?: string;
  distanceFromStartKm: number;
  currentStrength: number; // 0 to 100%
  description: string;
  hazards: string[];
  x: number; // SVG map coordinates (0-1000)
  y: number; // SVG map coordinates (0-700)
  shelterNearby?: string;
  rerouteX?: number;
  rerouteY?: number;
  placeType?: string;
  dangerStatus?: {
    level: 'SAFE' | 'WARNING' | 'CRITICAL';
    label: string;
    details?: string;
  };
  environmentalMetric?: {
    label: string;
    value: string;
    percent: number;
  };
  sensoryQuote?: string;
}

export interface PhraseTranslation {
  id: string;
  category: 'Greeting' | 'Gratitude' | 'Commerce' | 'Emergency' | 'Protocol' | 'Shelter';
  commonText: string;
  domainTranslations: Record<
    DomainId,
    {
      nativeText: string;
      phonetic: string;
      literalMeaning: string;
      etiquetteWarning?: string;
      isTaboo?: boolean;
    }
  >;
}

export interface VocabularyWord {
  english: string;
  native: string;
  phonetic: string;
  meaning: string;
  category: string;
}

export interface DomainLanguage {
  domainId: DomainId;
  languageName: string;
  scriptName: string;
  scriptDescription: string;
  grammarRules: string;
  etiquetteSummary: string;
  tabooPhrases: string[];
  vocabulary: VocabularyWord[];
}

export interface WardenAlert {
  id: string;
  domainId: DomainId;
  surgeType: 'Gale-Shear' | 'Tidal Bore' | 'Magma Fracture' | 'Lithic Quake';
  wardenName: string;
  wardenRank: string;
  station: string;
  urgency: 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'ALL_CLEAR';
  message: string;
  countdownSeconds: number;
  affectedRegion: string;
  recommendedAction: string;
  shelterWaypointId: string;
  shelterName: string;
  barometricTrace: number[];
}
