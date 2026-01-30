export function parseTimeToSeconds(timeStr: string): number | null {
  const parts = timeStr.split(':').map(Number);
  if (parts.some(isNaN)) return null;
  
  if (parts.length === 2) {
    // mm:ss format
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  } else if (parts.length === 3) {
    // hh:mm:ss format
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  return null;
}

export function timePartsToSeconds(minutes: number, seconds: number): number {
  return Math.max(0, minutes) * 60 + Math.max(0, seconds);
}

export function validateFiveKTime(totalSeconds: number): string | null {
  if (totalSeconds < 12 * 60) {
    return 'Een 5K-tijd onder de 12 minuten is onrealistisch. Controleer je invoer.';
  }
  if (totalSeconds > 45 * 60) {
    return 'Een 5K-tijd boven de 45 minuten is wellicht te langzaam voor intervallen. Overweeg eerst je basisconditie op te bouwen.';
  }
  if (totalSeconds === 0) {
    return 'Voer je 5K-tijd in.';
  }
  return null;
}

/**
 * Format seconds to mm:ss or hh:mm:ss string
 */
export function formatSecondsToTime(totalSeconds: number, includeHours = false): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);
  
  if (includeHours || hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format pace as mm:ss per km or per mile
 */
export function formatPace(secondsPerKm: number): string {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Convert km pace to mile pace
 */
export function kmPaceToMilePace(secondsPerKm: number): number {
  return secondsPerKm * 1.60934;
}

/**
 * Convert mile pace to km pace
 */
export function milePaceToKmPace(secondsPerMile: number): number {
  return secondsPerMile / 1.60934;
}

/**
 * Calculate pace (seconds per km) from distance and time
 */
export function calculatePace(distanceKm: number, totalSeconds: number): number {
  return totalSeconds / distanceKm;
}

/**
 * Calculate speed in km/h from pace (seconds per km)
 */
export function paceToSpeed(secondsPerKm: number): number {
  return 3600 / secondsPerKm;
}

/**
 * Norwegian Singles zone calculations
 * Based on 5K race pace as reference
 */
export interface ZoneData {
  name: string;
  description: string;
  minPace: number; // seconds per km
  maxPace: number; // seconds per km
  hrPercentMin?: number;
  hrPercentMax?: number;
  color: string;
}

export interface CalculatorResult {
  fiveKPace: number; // seconds per km
  zones: ZoneData[];
  singlePace: number; // The main Norwegian Single pace
  recoveryPace: number;
}

/**
 * Calculate Norwegian Singles zones from 5K time
 * 
 * Norwegian Singles are typically run at around 10K pace (slightly slower than 5K pace)
 * With very easy recovery jogs between intervals
 */
export function calculateZones(fiveKTimeSeconds: number): CalculatorResult {
  // 5K pace in seconds per km
  const fiveKPace = fiveKTimeSeconds / 5;
  
  // Norwegian Single pace is approximately 5K pace + 10-15 seconds (around 10K pace)
  // This is the "comfortably hard" effort - sustainable but challenging
  const singlePace = fiveKPace * 1.03; // ~3% slower than 5K pace
  
  // Recovery is very easy - about 60-70% of 5K pace effort
  // Typically 1:30-2:00 min/km slower than single pace
  const recoveryPace = singlePace * 1.25; // 25% slower than single pace
  
  const zones: ZoneData[] = [
    {
      name: 'Zone 1 - Herstel',
      description: 'Zeer makkelijk, actief herstel',
      minPace: fiveKPace * 1.35,
      maxPace: fiveKPace * 1.45,
      hrPercentMin: 50,
      hrPercentMax: 60,
      color: 'var(--chart-1)',
    },
    {
      name: 'Zone 2 - Duurloop',
      description: 'Comfortabel, conversatiepas',
      minPace: fiveKPace * 1.20,
      maxPace: fiveKPace * 1.35,
      hrPercentMin: 60,
      hrPercentMax: 70,
      color: 'var(--chart-2)',
    },
    {
      name: 'Zone 3 - Tempo',
      description: 'Norwegian Single tempo, drempelpas',
      minPace: fiveKPace * 1.05,
      maxPace: fiveKPace * 1.15,
      hrPercentMin: 70,
      hrPercentMax: 80,
      color: 'var(--chart-3)',
    },
    {
      name: 'Zone 4 - Threshold',
      description: 'Wedstrijdtempo 10K-HM',
      minPace: fiveKPace * 0.98,
      maxPace: fiveKPace * 1.05,
      hrPercentMin: 80,
      hrPercentMax: 88,
      color: 'var(--chart-4)',
    },
    {
      name: 'Zone 5 - VO2max',
      description: 'Wedstrijdtempo 5K en sneller',
      minPace: fiveKPace * 0.92,
      maxPace: fiveKPace * 0.98,
      hrPercentMin: 88,
      hrPercentMax: 95,
      color: 'var(--chart-5)',
    },
  ];
  
  return {
    fiveKPace,
    zones,
    singlePace,
    recoveryPace,
  };
}

/**
 * Generate example workout sessions based on calculated zones
 */
export interface WorkoutSession {
  name: string;
  description: string;
  structure: string;
  totalTime: string;
  difficulty: 'makkelijk' | 'gemiddeld' | 'zwaar';
}

export function generateWorkouts(result: CalculatorResult): WorkoutSession[] {
  const singlePaceStr = formatPace(result.singlePace);
  const recoveryPaceStr = formatPace(result.recoveryPace);
  
  return [
    {
      name: 'Klassieke Norwegian Single',
      description: '5x 6 minuten met 1 minuut herstel',
      structure: `5× (6 min @ ${singlePaceStr}/km + 1 min jog @ ${recoveryPaceStr}/km)`,
      totalTime: '35 minuten',
      difficulty: 'gemiddeld',
    },
    {
      name: 'Korte Singles',
      description: '6x 4 minuten met 1 minuut herstel',
      structure: `6× (4 min @ ${singlePaceStr}/km + 1 min jog @ ${recoveryPaceStr}/km)`,
      totalTime: '30 minuten',
      difficulty: 'makkelijk',
    },
    {
      name: 'Lange Singles',
      description: '4x 8 minuten met 90 sec herstel',
      structure: `4× (8 min @ ${singlePaceStr}/km + 90 sec jog @ ${recoveryPaceStr}/km)`,
      totalTime: '38 minuten',
      difficulty: 'zwaar',
    },
    {
      name: 'Progressieve Singles',
      description: 'Opbouwend in intensiteit',
      structure: `2× 5 min (makkelijk) + 2× 5 min (gemiddeld) + 2× 5 min (tempo)`,
      totalTime: '36 minuten',
      difficulty: 'zwaar',
    },
  ];
}

/**
 * Example 5K times for the voorbeelden page
 */
export const exampleTimes = [
  { label: '18:00', seconds: 18 * 60, level: 'Gevorderd' },
  { label: '20:00', seconds: 20 * 60, level: 'Gemiddeld gevorderd' },
  { label: '22:30', seconds: 22 * 60 + 30, level: 'Gemiddeld' },
  { label: '25:00', seconds: 25 * 60, level: 'Recreatief' },
  { label: '28:00', seconds: 28 * 60, level: 'Beginner' },
  { label: '32:00', seconds: 32 * 60, level: 'Starter' },
];
