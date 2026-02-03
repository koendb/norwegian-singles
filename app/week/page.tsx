'use client';

import { useState, Suspense } from 'react';
import { CalendarCheck } from 'lucide-react';
import { WeekForm, WEEK_DAYS, type WeekFormData } from '@/components/week-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { weekHeader, weekSummary } from '@/content/week';
import {
  schemaHeader,
  buildSchema,
  weeklySchedule,
  voorbeeldSessieStats,
  voorbeeldSessieSteps,
  voorbeeldSessieTitle,
  paceGuidance,
  beginnersGuidance,
} from '@/content/schema';
import { homeHowItWorks } from '@/content/home';
import { calculateZones, formatPace, formatSecondsToTime, parseTimeToSeconds } from '@/lib/pace-utils';

const riegelExponent = 1.06;
const paceTargetsByWorkout = {
  short: 15,
  medium: 21.0975,
  long: 30,
} as const;

const predictTimeSeconds = (
  baseTimeSeconds: number,
  baseDistanceKm: number,
  targetDistanceKm: number,
) => baseTimeSeconds * Math.pow(targetDistanceKm / baseDistanceKm, riegelExponent);

const formatPaceRange = (minSecondsPerKm: number, maxSecondsPerKm: number) => {
  const minPace = formatPace(minSecondsPerKm);
  const maxPace = formatPace(maxSecondsPerKm);
  return `${minPace}-${maxPace}/km`;
};

const DEFAULT_FIVE_K_TIME = {
  under50: 22 * 60,
  between50And70: 20 * 60,
  over70: 18 * 60,
};

const getDefaultFiveKTimeSeconds = (kilometers: number) => {
  if (kilometers < 50) {
    return DEFAULT_FIVE_K_TIME.under50;
  }
  if (kilometers <= 70) {
    return DEFAULT_FIVE_K_TIME.between50And70;
  }
  return DEFAULT_FIVE_K_TIME.over70;
};

const getFiveKTimeSeconds = (weekData: WeekFormData) => {
  if (weekData.fiveKTime) {
    const parsed = parseTimeToSeconds(weekData.fiveKTime);
    if (parsed) {
      return parsed;
    }
  }
  return getDefaultFiveKTimeSeconds(weekData.weeklyKm);
};

const getTrainingTimeSeconds = (kilometers: number, fiveKTimeSeconds: number) => {
  // Formule: (kilometers per week) / 5 * 5k tijd / 0.73
  return Math.round((kilometers / 5) * fiveKTimeSeconds / 0.73);
};

function WeekContent() {
  const [weekData, setWeekData] = useState<WeekFormData>(() => ({
    weeklyKm: 60,
    daysPerWeek: 7,
    runDays: WEEK_DAYS.reduce(
      (acc, day) => ({ ...acc, [day.key]: true }),
      {} as Record<string, boolean>,
    ),
    fiveKTime: '20:00',
  }));

  return (
    <div className="mx-auto max-w-6xl overflow-x-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {weekHeader.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {weekHeader.description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2 min-w-0">
          <div className="lg:sticky lg:top-24">
            <WeekForm onSubmit={setWeekData} />
          </div>
        </div>

        <div className="lg:col-span-3 min-w-0">
          {weekData ? (
            <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-primary" />
                  {weekSummary.title}
                </CardTitle>
                <CardDescription>
                  Bekijk je ingevulde gegevens voor de weekplanning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  {/*
                    const fiveKTimeSeconds = getFiveKTimeSeconds(weekData);
                    const trainingTimeSeconds = getTrainingTimeSeconds(
                      weekData.weeklyKm,
                      fiveKTimeSeconds,
                    );
                    const subthresholdMinSeconds = Math.round(trainingTimeSeconds * 0.2);
                    const subthresholdMaxSeconds = Math.round(trainingTimeSeconds * 0.25);

                    // Bepaal aantal subthreshold trainingen op basis van min tijd
                    const subthresholdMinMinutes = subthresholdMinSeconds / 60;
                    const subthresholdMaxMinutes = subthresholdMaxSeconds / 60;
                    let numberOfSubthresholdTrainings: number;
                    const threeSessionThreshold =
                      weekData.daysPerWeek >= 6 ? 72 : 90;

                    if (weekData.daysPerWeek <= 5) {
                      numberOfSubthresholdTrainings =
                        subthresholdMinMinutes <= 40 ? 1 : 2;
                    } else if (subthresholdMinMinutes <= 40) {
                      numberOfSubthresholdTrainings = 1;
                    } else if (weekData.daysPerWeek >= 6) {
                      numberOfSubthresholdTrainings =
                        subthresholdMaxMinutes >= threeSessionThreshold ? 3 : 2;
                    } else if (subthresholdMinMinutes <= threeSessionThreshold) {
                      numberOfSubthresholdTrainings = 2;
                    } else {
                      numberOfSubthresholdTrainings = 3;
                    }

                    const subthresholdSessionOptions = [
                      {
                        key: 'short',
                        title: 'Korte intervallen',
                        detail: '8-12 x 3-4min',
                        repsMin: 8,
                        repsMax: 12,
                        intervalMin: 3,
                        intervalMax: 4,
                        minTotalMinutes: 8 * 3,
                        maxTotalMinutes: 12 * 4,
                      },
                      {
                        key: 'medium',
                        title: 'Medium intervallen',
                        detail: '4-6 x 6-8min',
                        repsMin: 4,
                        repsMax: 6,
                        intervalMin: 6,
                        intervalMax: 8,
                        minTotalMinutes: 4 * 6,
                        maxTotalMinutes: 6 * 8,
                      },
                      {
                        key: 'long',
                        title: 'Lange intervallen',
                        detail: '3-4 x 10-12min',
                        repsMin: 3,
                        repsMax: 4,
                        intervalMin: 10,
                        intervalMax: 12,
                        minTotalMinutes: 3 * 10,
                        maxTotalMinutes: 4 * 12,
                      },
                    ];

                    const targetSessionMinMinutes =
                      subthresholdMinMinutes / numberOfSubthresholdTrainings;
                    const targetSessionMaxMinutes =
                      subthresholdMaxMinutes / numberOfSubthresholdTrainings;
                    const targetSessionMidMinutes =
                      (targetSessionMinMinutes + targetSessionMaxMinutes) / 2;

                    const suggestedSessions = [...subthresholdSessionOptions]
                      .sort((a, b) => {
                        const aMid = (a.minTotalMinutes + a.maxTotalMinutes) / 2;
                        const bMid = (b.minTotalMinutes + b.maxTotalMinutes) / 2;
                        return Math.abs(aMid - targetSessionMidMinutes) -
                          Math.abs(bMid - targetSessionMidMinutes);
                      })
                      .slice(0, numberOfSubthresholdTrainings);

                    const buildIntervalSuggestion = (session: {
                      repsMin: number;
                      repsMax: number;
                      intervalMin: number;
                      intervalMax: number;
                    }) => {
                      const targetMid = (targetSessionMinMinutes + targetSessionMaxMinutes) / 2;
                      let best = {
                        reps: session.repsMin,
                        interval: session.intervalMin,
                        total: session.repsMin * session.intervalMin,
                      };

                      for (let reps = session.repsMin; reps <= session.repsMax; reps += 1) {
                        for (
                          let interval = session.intervalMin;
                          interval <= session.intervalMax;
                          interval += 1
                        ) {
                          const total = reps * interval;
                          const inRange =
                            total >= targetSessionMinMinutes &&
                            total <= targetSessionMaxMinutes;
                          const bestInRange =
                            best.total >= targetSessionMinMinutes &&
                            best.total <= targetSessionMaxMinutes;
                          const distance = Math.abs(total - targetMid);
                          const bestDistance = Math.abs(best.total - targetMid);

                          if (inRange && !bestInRange) {
                            best = { reps, interval, total };
                            continue;
                          }
                          if (inRange === bestInRange && distance < bestDistance) {
                            best = { reps, interval, total };
                          }
                        }
                      }

                      return best;
                    };

                    const suggestedIntervals = suggestedSessions.map((session) => ({
                      ...session,
                      suggestion: buildIntervalSuggestion(session),
                    }));
                    const totalSuggestedMinutes = suggestedIntervals.reduce(
                      (total, session) => total + session.suggestion.total,
                      0,
                    );
                    const totalSuggestedSeconds = totalSuggestedMinutes * 60;

                    const subthresholdSessionSummary =
                      numberOfSubthresholdTrainings === 1
                        ? 'Suggestie: 1 sessie'
                        : numberOfSubthresholdTrainings === 2
                          ? 'Suggestie: 2 sessies'
                          : 'Suggestie: 3 sessies';

                    const getSlowestSubthresholdPaceSeconds = (
                      sessionKey?: 'short' | 'medium' | 'long',
                    ) => {
                      if (!sessionKey) {
                        return null;
                      }
                      const targetKm = paceTargetsByWorkout[sessionKey];
                      const paceSeconds =
                        predictTimeSeconds(fiveKTimeSeconds, 5, targetKm) / targetKm;
                      if (targetKm === 15) {
                        return paceSeconds + 6;
                      }
                      if (targetKm === 21.0975 || targetKm === 30) {
                        return paceSeconds + 7;
                      }
                      return paceSeconds;
                    };

                    const runDayKeys = WEEK_DAYS.filter((day) => weekData.runDays?.[day.key]).map(
                      (day) => day.key,
                    );
                    const totalTrainingDays = runDayKeys.length;
                    const recoveryRuns = Math.max(
                      totalTrainingDays - 1 - numberOfSubthresholdTrainings,
                      0,
                    );
                    const baseSubthresholdKm = suggestedIntervals.reduce((total, session) => {
                      const slowestPaceSeconds = getSlowestSubthresholdPaceSeconds(
                        session.key as 'short' | 'medium' | 'long' | undefined,
                      );
                      if (!slowestPaceSeconds) {
                        return total;
                      }
                      const intervalSeconds = session.suggestion.total * 60;
                      const intervalKm = intervalSeconds / slowestPaceSeconds;
                      return total + intervalKm + 3;
                    }, 0);
                    const averageSubthresholdKm =
                      numberOfSubthresholdTrainings > 0
                        ? baseSubthresholdKm / numberOfSubthresholdTrainings
                        : 0;
                    const adjustedKmThreshold = averageSubthresholdKm * (totalTrainingDays + 1);
                    const useAdjustedKm =
                      numberOfSubthresholdTrainings > 0 &&
                      weekData.weeklyKm > adjustedKmThreshold;
                    const baseKm = useAdjustedKm
                      ? weekData.weeklyKm / (totalTrainingDays + 0.8)
                      : 0;
                    const totalSubthresholdKm = useAdjustedKm
                      ? baseKm * numberOfSubthresholdTrainings
                      : baseSubthresholdKm;
                    const remainingKm = Math.max(weekData.weeklyKm - totalSubthresholdKm, 0);
                    const recoveryKm = useAdjustedKm
                      ? baseKm
                      : recoveryRuns > 0
                        ? remainingKm / (recoveryRuns + 1.8)
                        : remainingKm / 1.8;
                    const longRunKm = useAdjustedKm ? baseKm * 1.8 : recoveryKm * 1.8;
                    const formatDistanceKm = (distanceKm: number) => {
                      const rounded = Math.round(distanceKm * 10) / 10;
                      return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)} km`;
                    };
                    const recoveryPaceSeconds = fiveKTimeSeconds / 5 / 0.67;
                    const recoveryPace = `${formatPace(recoveryPaceSeconds)}/km`;
                    const getSubthresholdPace = (sessionKey?: 'short' | 'medium' | 'long') => {
                      if (!sessionKey) {
                        return '-';
                      }
                      const targetKm = paceTargetsByWorkout[sessionKey];
                      const paceSeconds =
                        predictTimeSeconds(fiveKTimeSeconds, 5, targetKm) / targetKm;
                      if (targetKm === 15) {
                        return formatPaceRange(paceSeconds - 2, paceSeconds + 6);
                      }
                      if (targetKm === 21.0975 || targetKm === 30) {
                        return formatPaceRange(paceSeconds - 1, paceSeconds + 7);
                      }
                      return `${formatPace(paceSeconds)}/km`;
                    };

                    const runTypes: Array<'subthreshold' | 'recovery'> = [];
                    let remainingSubthresholds = numberOfSubthresholdTrainings;
                    for (let index = 0; index < Math.max(totalTrainingDays - 1, 0); index += 1) {
                      if (index % 2 === 0 && remainingSubthresholds > 0) {
                        runTypes.push('subthreshold');
                        remainingSubthresholds -= 1;
                      } else {
                        runTypes.push('recovery');
                      }
                    }

                    let subthresholdIndex = 0;
                    let runIndex = 0;
                    type WeeklyScheduleRow = {
                      day: string;
                      training: string;
                      trainingDetail?: string | null;
                      interval: string;
                      pace: string;
                    };

                    const weeklySchedule: WeeklyScheduleRow[] = WEEK_DAYS.map((day) => {
                      const isRunDay = weekData.runDays?.[day.key];
                      if (!isRunDay) {
                        return {
                          day: day.label,
                          training: 'Rustdag',
                          trainingDetail: null,
                          interval: '-',
                          pace: '-',
                        };
                      }

                      const isLastRunDay = runIndex === totalTrainingDays - 1;
                      if (isLastRunDay) {
                        runIndex += 1;
                        return {
                          day: day.label,
                          training: 'Long run',
                          trainingDetail: null,
                          interval: formatDistanceKm(longRunKm),
                          pace: recoveryPace,
                        };
                      }

                      const runType = runTypes[runIndex] ?? 'recovery';
                      runIndex += 1;

                      if (runType === 'subthreshold') {
                        const intervalSession = suggestedIntervals[subthresholdIndex];
                        subthresholdIndex += 1;
                        const intervalText = intervalSession
                          ? `${intervalSession.suggestion.reps} x ${intervalSession.suggestion.interval}m`
                          : 'Interval';

                        return {
                          day: day.label,
                          training: 'Subthreshold',
                          trainingDetail: intervalText,
                          interval: '+3km wu/cd',
                          pace: getSubthresholdPace(intervalSession?.key as 'short' | 'medium' | 'long' | undefined),
                        };
                      }

                      return {
                        day: day.label,
                        training: 'Herstelloop',
                        trainingDetail: null,
                        interval: formatDistanceKm(recoveryKm),
                        pace: recoveryPace,
                      };
                    });

                    return (
                      <div className="order-last rounded-lg border border-border bg-background px-4 py-3">
                        <p className="text-sm text-muted-foreground">
                          Trainingstijd per week
                        </p>
                        <p className="text-2xl font-semibold text-foreground">
                          {formatSecondsToTime(trainingTimeSeconds, true)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Gebaseerd op 5K-tijd {formatSecondsToTime(fiveKTimeSeconds)}
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Totale subthreshold tijd per week (20-25%):
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatSecondsToTime(subthresholdMinSeconds, true)} -{' '}
                          {formatSecondsToTime(subthresholdMaxSeconds, true)}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Totale subthreshold afstand:
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatDistanceKm(totalSubthresholdKm)}
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Aantal subthreshold trainingen:
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {numberOfSubthresholdTrainings}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Selectie: 1 sessie bij ≤ 40 min; 2 sessies bij &gt; 40 min. Bij 4 dagen
                          max 2 sessies; bij 6-7 dagen wordt 3 sessies als de bovenkant
                          van de range ≥ {threeSessionThreshold} min.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gekozen subthreshold sessies:
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {subthresholdSessionSummary}
                        </p>
                        <div className="mt-2 space-y-2">
                          {suggestedIntervals.map((session, index) => (
                            <div
                              key={session.key}
                              className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                            >
                              <span className="text-sm text-foreground">
                                Interval {index + 1}:
                              </span>
                              <span className="text-sm font-semibold text-primary">
                                {session.suggestion.reps}x{session.suggestion.interval} minuten
                                {' '}(
                                {session.suggestion.reps * session.suggestion.interval} min
                                )
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Totale tijd van alle intervallen:
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatSecondsToTime(totalSuggestedSeconds, true)}
                        </p>
                      </div>
                    );
                  */}

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">Kilometers per week</p>
                      <p className="mt-1 text-xl font-semibold text-foreground">
                      {weekData.weeklyKm} km
                    </p>
                  </div>
                    <div className="rounded-lg border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">5K-tijd</p>
                      <p className="mt-1 text-xl font-semibold text-foreground">
                      {weekData.fiveKTime ?? 'Niet ingevuld'}
                    </p>
                  </div>
                    <div className="rounded-lg border border-border bg-background px-4 py-3">
                      <p className="text-xs text-muted-foreground">Dagen per week</p>
                      <p className="mt-1 text-xl font-semibold text-foreground">
                        {weekData.daysPerWeek} dagen
                      </p>
                    </div>
                  </div>

                  {(() => {
                    const fiveKTimeSeconds = getFiveKTimeSeconds(weekData);
                    const trainingTimeSeconds = getTrainingTimeSeconds(
                      weekData.weeklyKm,
                      fiveKTimeSeconds,
                    );
                    const subthresholdMinSeconds = Math.round(trainingTimeSeconds * 0.2);
                    const subthresholdMaxSeconds = Math.round(trainingTimeSeconds * 0.25);

                    const subthresholdMinMinutes = subthresholdMinSeconds / 60;
                    const subthresholdMaxMinutes = subthresholdMaxSeconds / 60;
                    let numberOfSubthresholdTrainings: number;
                    const threeSessionThreshold = weekData.daysPerWeek >= 6 ? 72 : 90;

                    if (weekData.daysPerWeek <= 4) {
                      numberOfSubthresholdTrainings =
                        subthresholdMinMinutes <= 40 ? 1 : 2;
                    } else if (subthresholdMinMinutes <= 40) {
                      numberOfSubthresholdTrainings = 1;
                    } else if (weekData.daysPerWeek >= 6) {
                      numberOfSubthresholdTrainings =
                        subthresholdMaxMinutes >= threeSessionThreshold ? 3 : 2;
                    } else if (subthresholdMinMinutes <= threeSessionThreshold) {
                      numberOfSubthresholdTrainings = 2;
                    } else {
                      numberOfSubthresholdTrainings = 3;
                    }

                    const subthresholdSessionOptions = [
                      {
                        key: 'short',
                        title: 'Korte intervallen',
                        detail: '8-12 x 3-4min',
                        repsMin: 8,
                        repsMax: 12,
                        intervalMin: 3,
                        intervalMax: 4,
                        minTotalMinutes: 8 * 3,
                        maxTotalMinutes: 12 * 4,
                      },
                      {
                        key: 'medium',
                        title: 'Medium intervallen',
                        detail: '4-6 x 6-8min',
                        repsMin: 4,
                        repsMax: 6,
                        intervalMin: 6,
                        intervalMax: 8,
                        minTotalMinutes: 4 * 6,
                        maxTotalMinutes: 6 * 8,
                      },
                      {
                        key: 'long',
                        title: 'Lange intervallen',
                        detail: '3-4 x 10-12min',
                        repsMin: 3,
                        repsMax: 4,
                        intervalMin: 10,
                        intervalMax: 12,
                        minTotalMinutes: 3 * 10,
                        maxTotalMinutes: 4 * 12,
                      },
                    ];

                    const targetSessionMinMinutes =
                      subthresholdMinMinutes / numberOfSubthresholdTrainings;
                    const targetSessionMaxMinutes =
                      subthresholdMaxMinutes / numberOfSubthresholdTrainings;
                    const targetSessionMidMinutes =
                      (targetSessionMinMinutes + targetSessionMaxMinutes) / 2;

                    const suggestedSessions = [...subthresholdSessionOptions]
                      .sort((a, b) => {
                        const aMid = (a.minTotalMinutes + a.maxTotalMinutes) / 2;
                        const bMid = (b.minTotalMinutes + b.maxTotalMinutes) / 2;
                        return Math.abs(aMid - targetSessionMidMinutes) -
                          Math.abs(bMid - targetSessionMidMinutes);
                      })
                      .slice(0, numberOfSubthresholdTrainings);

                    const buildIntervalSuggestion = (session: {
                      repsMin: number;
                      repsMax: number;
                      intervalMin: number;
                      intervalMax: number;
                    }) => {
                      const targetMid = (targetSessionMinMinutes + targetSessionMaxMinutes) / 2;
                      let best = {
                        reps: session.repsMin,
                        interval: session.intervalMin,
                        total: session.repsMin * session.intervalMin,
                      };

                      for (let reps = session.repsMin; reps <= session.repsMax; reps += 1) {
                        for (
                          let interval = session.intervalMin;
                          interval <= session.intervalMax;
                          interval += 1
                        ) {
                          const total = reps * interval;
                          const inRange =
                            total >= targetSessionMinMinutes &&
                            total <= targetSessionMaxMinutes;
                          const bestInRange =
                            best.total >= targetSessionMinMinutes &&
                            best.total <= targetSessionMaxMinutes;
                          const distance = Math.abs(total - targetMid);
                          const bestDistance = Math.abs(best.total - targetMid);

                          if (inRange && !bestInRange) {
                            best = { reps, interval, total };
                            continue;
                          }
                          if (inRange === bestInRange && distance < bestDistance) {
                            best = { reps, interval, total };
                          }
                        }
                      }

                      return best;
                    };

                    const suggestedIntervals = suggestedSessions.map((session) => ({
                      ...session,
                      suggestion: buildIntervalSuggestion(session),
                    }));

                    const getSlowestSubthresholdPaceSeconds = (
                      sessionKey?: 'short' | 'medium' | 'long',
                    ) => {
                      if (!sessionKey) {
                        return null;
                      }
                      const targetKm = paceTargetsByWorkout[sessionKey];
                      const paceSeconds =
                        predictTimeSeconds(fiveKTimeSeconds, 5, targetKm) / targetKm;
                      if (targetKm === 15) {
                        return paceSeconds + 6;
                      }
                      if (targetKm === 21.0975 || targetKm === 30) {
                        return paceSeconds + 7;
                      }
                      return paceSeconds;
                    };

                    const runDayKeys = WEEK_DAYS.filter((day) => weekData.runDays?.[day.key]).map(
                      (day) => day.key,
                    );
                    const totalTrainingDays = runDayKeys.length;
                    const recoveryRuns = Math.max(
                      totalTrainingDays - 1 - numberOfSubthresholdTrainings,
                      0,
                    );
                    const baseSubthresholdKm = suggestedIntervals.reduce((total, session) => {
                      const slowestPaceSeconds = getSlowestSubthresholdPaceSeconds(
                        session.key as 'short' | 'medium' | 'long' | undefined,
                      );
                      if (!slowestPaceSeconds) {
                        return total;
                      }
                      const intervalSeconds = session.suggestion.total * 60;
                      const intervalKm = intervalSeconds / slowestPaceSeconds;
                      return total + intervalKm + 3;
                    }, 0);
                    const averageSubthresholdKm =
                      numberOfSubthresholdTrainings > 0
                        ? baseSubthresholdKm / numberOfSubthresholdTrainings
                        : 0;
                    const adjustedKmThreshold = averageSubthresholdKm * (totalTrainingDays + 1);
                    const useAdjustedKm =
                      numberOfSubthresholdTrainings > 0 &&
                      weekData.weeklyKm > adjustedKmThreshold;
                    const baseKm = useAdjustedKm
                      ? weekData.weeklyKm / (totalTrainingDays + 0.8)
                      : 0;
                    const totalSubthresholdKm = useAdjustedKm
                      ? baseKm * numberOfSubthresholdTrainings
                      : baseSubthresholdKm;
                    const remainingKm = Math.max(weekData.weeklyKm - totalSubthresholdKm, 0);
                    const recoveryKm = useAdjustedKm
                      ? baseKm
                      : recoveryRuns > 0
                        ? remainingKm / (recoveryRuns + 1.8)
                        : remainingKm / 1.8;
                    const longRunKm = useAdjustedKm ? baseKm * 1.8 : recoveryKm * 1.8;
                    const formatDistanceKm = (distanceKm: number) => {
                      const rounded = Math.round(distanceKm * 10) / 10;
                      return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)} km`;
                    };
                    const recoveryPaceSeconds = fiveKTimeSeconds / 5 / 0.67;
                    const recoveryPace = `${formatPace(recoveryPaceSeconds)}/km`;
                    const getSubthresholdPace = (sessionKey?: 'short' | 'medium' | 'long') => {
                      if (!sessionKey) {
                        return '-';
                      }
                      const targetKm = paceTargetsByWorkout[sessionKey];
                      const paceSeconds =
                        predictTimeSeconds(fiveKTimeSeconds, 5, targetKm) / targetKm;
                      if (targetKm === 15) {
                        return formatPaceRange(paceSeconds - 2, paceSeconds + 6);
                      }
                      if (targetKm === 21.0975 || targetKm === 30) {
                        return formatPaceRange(paceSeconds - 1, paceSeconds + 7);
                      }
                      return `${formatPace(paceSeconds)}/km`;
                    };

                    const runTypes: Array<'subthreshold' | 'recovery'> = [];
                    let remainingSubthresholds = numberOfSubthresholdTrainings;
                    for (let index = 0; index < Math.max(totalTrainingDays - 1, 0); index += 1) {
                      if (index % 2 === 0 && remainingSubthresholds > 0) {
                        runTypes.push('subthreshold');
                        remainingSubthresholds -= 1;
                      } else {
                        runTypes.push('recovery');
                      }
                    }

                    let subthresholdIndex = 0;
                    let runIndex = 0;
                    type WeeklyScheduleRow = {
                      day: string;
                      training: string;
                      trainingDetail?: string | null;
                      interval: string;
                      pace: string;
                    };

                    const weeklySchedule: WeeklyScheduleRow[] = WEEK_DAYS.map((day) => {
                      const isRunDay = weekData.runDays?.[day.key];
                      if (!isRunDay) {
                        return {
                          day: day.label,
                          training: 'Rustdag',
                          trainingDetail: null,
                          interval: '-',
                          pace: '-',
                        };
                      }

                      const isLastRunDay = runIndex === totalTrainingDays - 1;
                      if (isLastRunDay) {
                        runIndex += 1;
                        return {
                          day: day.label,
                          training: 'Long run',
                          trainingDetail: null,
                          interval: formatDistanceKm(longRunKm),
                          pace: recoveryPace,
                        };
                      }

                      const runType = runTypes[runIndex] ?? 'recovery';
                      runIndex += 1;

                      if (runType === 'subthreshold') {
                        const intervalSession = suggestedIntervals[subthresholdIndex];
                        subthresholdIndex += 1;
                        const intervalText = intervalSession
                          ? `${intervalSession.suggestion.reps} x ${intervalSession.suggestion.interval}m`
                          : 'Interval';
                        const slowestPaceSeconds = getSlowestSubthresholdPaceSeconds(
                          intervalSession?.key as 'short' | 'medium' | 'long' | undefined,
                        );
                        const intervalSeconds = intervalSession
                          ? intervalSession.suggestion.total * 60
                          : 0;
                        const intervalKm =
                          slowestPaceSeconds && intervalSeconds
                            ? intervalSeconds / slowestPaceSeconds
                            : 0;
                        const wuCdKm = useAdjustedKm
                          ? Math.max(baseKm - intervalKm, 0)
                          : 3;
                        const wuCdText = useAdjustedKm
                          ? `+WU/CD: ${formatDistanceKm(wuCdKm)}`
                          : '+WU/CD: 3 km';

                        return {
                          day: day.label,
                          training: 'Subthreshold',
                          trainingDetail: intervalText,
                          interval: wuCdText,
                          pace: getSubthresholdPace(
                            intervalSession?.key as 'short' | 'medium' | 'long' | undefined,
                          ),
                        };
                      }

                      return {
                        day: day.label,
                        training: 'Herstelloop',
                        trainingDetail: null,
                        interval: formatDistanceKm(recoveryKm),
                        pace: recoveryPace,
                      };
                    });

                    return (
                  <div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {weeklySchedule.map((row) => (
                            <div
                              key={`${row.day}-card`}
                              className="rounded-lg border border-border bg-background p-4"
                            >
                              <div className="text-base font-medium text-foreground">
                                {row.day}
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">
                                Training
                              </div>
                              <div className="text-sm text-foreground">
                                {row.trainingDetail
                                  ? `${row.training} (${row.trainingDetail})`
                                  : row.training}
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">Pace</div>
                              <div className="text-sm text-foreground">{row.pace}</div>
                              <div className="mt-2 text-sm text-muted-foreground">Afstand</div>
                              <div className="text-sm text-foreground">{row.interval}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
              {/*
              <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Checken gegevens</p>
              {(() => {
                const fiveKTimeSeconds = getFiveKTimeSeconds(weekData);
                const trainingTimeSeconds = getTrainingTimeSeconds(
                  weekData.weeklyKm,
                  fiveKTimeSeconds,
                );
                const subthresholdMinSeconds = Math.round(trainingTimeSeconds * 0.2);
                const subthresholdMaxSeconds = Math.round(trainingTimeSeconds * 0.25);

                // Bepaal aantal subthreshold trainingen op basis van min tijd
                const subthresholdMinMinutes = subthresholdMinSeconds / 60;
                const subthresholdMaxMinutes = subthresholdMaxSeconds / 60;
                let numberOfSubthresholdTrainings: number;
                const threeSessionThreshold =
                  weekData.daysPerWeek >= 6 ? 72 : 90;

                if (weekData.daysPerWeek <= 5) {
                  numberOfSubthresholdTrainings =
                    subthresholdMinMinutes <= 40 ? 1 : 2;
                } else if (subthresholdMinMinutes <= 40) {
                  numberOfSubthresholdTrainings = 1;
                } else if (weekData.daysPerWeek >= 6) {
                  numberOfSubthresholdTrainings =
                    subthresholdMaxMinutes >= threeSessionThreshold ? 3 : 2;
                } else if (subthresholdMinMinutes <= threeSessionThreshold) {
                  numberOfSubthresholdTrainings = 2;
                } else {
                  numberOfSubthresholdTrainings = 3;
                }

                const subthresholdSessionOptions = [
                  {
                    key: 'short',
                    title: 'Korte intervallen',
                    detail: '8-12 x 3-4min',
                    repsMin: 8,
                    repsMax: 12,
                    intervalMin: 3,
                    intervalMax: 4,
                    minTotalMinutes: 8 * 3,
                    maxTotalMinutes: 12 * 4,
                  },
                  {
                    key: 'medium',
                    title: 'Medium intervallen',
                    detail: '4-6 x 6-8min',
                    repsMin: 4,
                    repsMax: 6,
                    intervalMin: 6,
                    intervalMax: 8,
                    minTotalMinutes: 4 * 6,
                    maxTotalMinutes: 6 * 8,
                  },
                  {
                    key: 'long',
                    title: 'Lange intervallen',
                    detail: '3-4 x 10-12min',
                    repsMin: 3,
                    repsMax: 4,
                    intervalMin: 10,
                    intervalMax: 12,
                    minTotalMinutes: 3 * 10,
                    maxTotalMinutes: 4 * 12,
                  },
                ];

                const targetSessionMinMinutes =
                  subthresholdMinMinutes / numberOfSubthresholdTrainings;
                const targetSessionMaxMinutes =
                  subthresholdMaxMinutes / numberOfSubthresholdTrainings;
                const targetSessionMidMinutes =
                  (targetSessionMinMinutes + targetSessionMaxMinutes) / 2;

                const suggestedSessions = [...subthresholdSessionOptions]
                  .sort((a, b) => {
                    const aMid = (a.minTotalMinutes + a.maxTotalMinutes) / 2;
                    const bMid = (b.minTotalMinutes + b.maxTotalMinutes) / 2;
                    return Math.abs(aMid - targetSessionMidMinutes) -
                      Math.abs(bMid - targetSessionMidMinutes);
                  })
                  .slice(0, numberOfSubthresholdTrainings);

                const buildIntervalSuggestion = (session: {
                  repsMin: number;
                  repsMax: number;
                  intervalMin: number;
                  intervalMax: number;
                }) => {
                  const targetMid = (targetSessionMinMinutes + targetSessionMaxMinutes) / 2;
                  let best = {
                    reps: session.repsMin,
                    interval: session.intervalMin,
                    total: session.repsMin * session.intervalMin,
                  };

                  for (let reps = session.repsMin; reps <= session.repsMax; reps += 1) {
                    for (
                      let interval = session.intervalMin;
                      interval <= session.intervalMax;
                      interval += 1
                    ) {
                      const total = reps * interval;
                      const inRange =
                        total >= targetSessionMinMinutes &&
                        total <= targetSessionMaxMinutes;
                      const bestInRange =
                        best.total >= targetSessionMinMinutes &&
                        best.total <= targetSessionMaxMinutes;
                      const distance = Math.abs(total - targetMid);
                      const bestDistance = Math.abs(best.total - targetMid);

                      if (inRange && !bestInRange) {
                        best = { reps, interval, total };
                        continue;
                      }
                      if (inRange === bestInRange && distance < bestDistance) {
                        best = { reps, interval, total };
                      }
                    }
                  }

                  return best;
                };

                const suggestedIntervals = suggestedSessions.map((session) => ({
                  ...session,
                  suggestion: buildIntervalSuggestion(session),
                }));
                const totalSuggestedMinutes = suggestedIntervals.reduce(
                  (total, session) => total + session.suggestion.total,
                  0,
                );
                const totalSuggestedSeconds = totalSuggestedMinutes * 60;

                const subthresholdSessionSummary =
                  numberOfSubthresholdTrainings === 1
                    ? 'Suggestie: 1 sessie'
                    : numberOfSubthresholdTrainings === 2
                      ? 'Suggestie: 2 sessies'
                      : 'Suggestie: 3 sessies';
                const getSlowestSubthresholdPaceSeconds = (
                  sessionKey?: 'short' | 'medium' | 'long',
                ) => {
                  if (!sessionKey) {
                    return null;
                  }
                  const targetKm = paceTargetsByWorkout[sessionKey];
                  const paceSeconds =
                    predictTimeSeconds(fiveKTimeSeconds, 5, targetKm) / targetKm;
                  if (targetKm === 15) {
                    return paceSeconds + 6;
                  }
                  if (targetKm === 21.0975 || targetKm === 30) {
                    return paceSeconds + 7;
                  }
                  return paceSeconds;
                };
                const totalSubthresholdKm = suggestedIntervals.reduce((total, session) => {
                  const slowestPaceSeconds = getSlowestSubthresholdPaceSeconds(
                    session.key as 'short' | 'medium' | 'long' | undefined,
                  );
                  if (!slowestPaceSeconds) {
                    return total;
                  }
                  const intervalSeconds = session.suggestion.total * 60;
                  const intervalKm = intervalSeconds / slowestPaceSeconds;
                  return total + intervalKm + 3;
                }, 0);
                const formatDistanceKm = (distanceKm: number) => {
                  const rounded = Math.round(distanceKm * 10) / 10;
                  return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)} km`;
                };
                const totalTrainingDays = WEEK_DAYS.filter(
                  (day) => weekData.runDays?.[day.key],
                ).length;
                const recoveryRuns = Math.max(
                  totalTrainingDays - 1 - numberOfSubthresholdTrainings,
                  0,
                );
                const averageSubthresholdKm =
                  numberOfSubthresholdTrainings > 0
                    ? totalSubthresholdKm / numberOfSubthresholdTrainings
                    : 0;
                const adjustedKmThreshold = averageSubthresholdKm * (totalTrainingDays + 1);
                const useAdjustedKm =
                  numberOfSubthresholdTrainings > 0 &&
                  weekData.weeklyKm > adjustedKmThreshold;
                const baseKm = useAdjustedKm
                  ? weekData.weeklyKm / (totalTrainingDays + 0.8)
                  : 0;
                const recoveryKm = useAdjustedKm
                  ? baseKm
                  : Math.max(weekData.weeklyKm - totalSubthresholdKm, 0) /
                    (recoveryRuns > 0 ? recoveryRuns + 1.8 : 1.8);
                const longRunKm = useAdjustedKm ? baseKm * 1.8 : recoveryKm * 1.8;
                const subthresholdKmBreakdown = suggestedIntervals.map((session, index) => {
                  const slowestPaceSeconds = getSlowestSubthresholdPaceSeconds(
                    session.key as 'short' | 'medium' | 'long' | undefined,
                  );
                  const intervalMinutes = session.suggestion.total;
                  if (!slowestPaceSeconds) {
                    return {
                      label: `SubT ${index + 1}`,
                      intervalMinutes,
                      slowestPace: '-',
                      intervalKm: '-',
                      totalKm: '-',
                      wuCdKm: '-',
                    };
                  }
                  const intervalSeconds = intervalMinutes * 60;
                  const intervalKm = intervalSeconds / slowestPaceSeconds;
                  const wuCdKm = useAdjustedKm ? Math.max(baseKm - intervalKm, 0) : 3;
                  const totalKm = intervalKm + wuCdKm;
                  return {
                    label: `SubT ${index + 1}`,
                    intervalMinutes,
                    slowestPace: `${formatPace(slowestPaceSeconds)}/km`,
                    intervalKm: formatDistanceKm(intervalKm),
                    totalKm: formatDistanceKm(totalKm),
                    wuCdKm: formatDistanceKm(wuCdKm),
                  };
                });

                return (
                  <div className="mt-3 rounded-lg border border-border bg-background px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                      Trainingstijd per week
                    </p>
                    <p className="text-2xl font-semibold text-foreground">
                      {formatSecondsToTime(trainingTimeSeconds, true)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Gebaseerd op 5K-tijd {formatSecondsToTime(fiveKTimeSeconds)}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Totale subthreshold tijd per week (20-25%):
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {formatSecondsToTime(subthresholdMinSeconds, true)} -{' '}
                      {formatSecondsToTime(subthresholdMaxSeconds, true)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Totale subthreshold afstand:
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {formatDistanceKm(totalSubthresholdKm)}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Aantal subthreshold trainingen:
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {numberOfSubthresholdTrainings}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Selectie: 1 sessie bij ≤ 40 min; 2 sessies bij &gt; 40 min. Bij 4 dagen
                      max 2 sessies; bij 6-7 dagen wordt 3 sessies als de bovenkant
                      van de range ≥ {threeSessionThreshold} min.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Gekozen subthreshold sessies:
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {subthresholdSessionSummary}
                    </p>
                    <div className="mt-2 space-y-2">
                      {suggestedIntervals.map((session, index) => (
                        <div
                          key={session.key}
                          className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                        >
                          <span className="text-sm text-foreground">
                            Interval {index + 1}:
                          </span>
                          <span className="text-sm font-semibold text-primary">
                            {session.suggestion.reps}x{session.suggestion.interval} minuten
                            {' '}(
                            {session.suggestion.reps * session.suggestion.interval} min
                            )
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Totale tijd van alle intervallen:
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {formatSecondsToTime(totalSuggestedSeconds, true)}
                    </p>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-semibold text-foreground">
                        Variabelen voor km per training
                      </p>
                      <div className="text-sm text-muted-foreground">
                        weeklyKm = {formatDistanceKm(weekData.weeklyKm)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        trainingsdagen = {totalTrainingDays}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        aantal subT = {numberOfSubthresholdTrainings}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        herstelruns = trainingsdagen - 1 - subT = {recoveryRuns}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        threshold = (subT_km / subT) × (trainingsdagen + 1) = {formatDistanceKm(adjustedKmThreshold)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        aangepast = weeklyKm &gt; threshold = {useAdjustedKm ? 'ja' : 'nee'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        subT_km = som(interval_km + 3 km) = {formatDistanceKm(totalSubthresholdKm)}
                      </div>
                      {useAdjustedKm ? (
                        <>
                          <div className="text-sm text-muted-foreground">
                            basis_km = weeklyKm / (trainingsdagen + 0.8) = {formatDistanceKm(baseKm)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            herstel_km = basis_km = {formatDistanceKm(recoveryKm)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            longrun_km = basis_km × 1.8 = {formatDistanceKm(longRunKm)}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm text-muted-foreground">
                            remaining_km = weeklyKm - subT_km = {formatDistanceKm(
                              Math.max(weekData.weeklyKm - totalSubthresholdKm, 0),
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            herstel_km = remaining_km / (herstelruns + 1.8) = {formatDistanceKm(
                              recoveryKm,
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            longrun_km = herstel_km × 1.8 = {formatDistanceKm(longRunKm)}
                          </div>
                        </>
                      )}
                      <div className="mt-2 space-y-1">
                        {subthresholdKmBreakdown.map((row) => (
                          <div key={row.label} className="text-sm text-muted-foreground">
                            {row.label}: interval = {row.intervalMinutes} min, langzaamste pace = {row.slowestPace},
                            interval_km = {row.intervalKm}, WU/CD = {row.wuCdKm} ⇒ {row.totalKm}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
              </div>
              */}
            </>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl space-y-16">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {schemaHeader.title}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {schemaHeader.description}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {schemaHeader.intro}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {buildSchema.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {buildSchema.firstParagraph.beforeStrong}
            <strong>{buildSchema.firstParagraph.strong}</strong>
            {buildSchema.firstParagraph.afterStrong}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {buildSchema.secondParagraph}
          </p>
        </section>

        <section className="space-y-6">
          <div className="rounded-lg bg-accent p-4">
            <h4 className="font-semibold">{weeklySchedule.title}</h4>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-7">
              {weeklySchedule.days.map((day) => (
                <div
                  key={day.day}
                  className={`rounded-lg p-2 text-center ${
                    day.type === 'quality'
                      ? 'bg-primary text-primary-foreground'
                      : day.type === 'easy'
                        ? 'bg-secondary text-foreground'
                        : 'bg-background'
                  }`}
                >
                  <p className="font-semibold">{day.day}</p>
                  <p className="mt-1 text-xs leading-tight">{day.workout}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">
            {paceGuidance.title}
          </h2>
          <p>{paceGuidance.intro}</p>
          <p>
            {paceGuidance.linkParagraph.beforeLink}
            <a
              href="/calculator"
              className="text-primary underline underline-offset-4"
            >
              {paceGuidance.linkParagraph.linkText}
            </a>
            {paceGuidance.linkParagraph.afterLink}
          </p>
          <p>{paceGuidance.recoveryParagraph}</p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            {voorbeeldSessieTitle}
          </h2>
          <Card className="border-primary/30 bg-accent">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {voorbeeldSessieSteps.map((step, index) => {
                  const isPrimary = step.variant === "primary";
                  return (
                    <div
                      key={step.title}
                      className={`flex items-center gap-4 rounded-lg p-4 ${
                        isPrimary
                          ? "bg-primary text-primary-foreground"
                          : "bg-background"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                          isPrimary
                            ? "bg-primary-foreground/20"
                            : "bg-secondary"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{step.title}</p>
                        <p
                          className={`text-sm ${
                            isPrimary
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-6">
                {voorbeeldSessieStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p
                      className={`text-2xl font-bold ${
                        stat.tone === "primary"
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">De marathon</h2>
          <p>
            Het schema kan aangepast worden om te dienen als marathontraining. Lees hier meer
            over op{" "}
            <a
              href="https://www.reddit.com/r/NorwegianSinglesRun/comments/1ly8x68/breakdown_of_sirpocs_marathon_training_block/"
              className="text-primary underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              reddit
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            {beginnersGuidance.title}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            {beginnersGuidance.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {homeHowItWorks.steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < homeHowItWorks.steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
                )}
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function WeekPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mx-auto h-10 w-64 rounded bg-secondary" />
            <div className="mx-auto mt-4 h-6 w-96 rounded bg-secondary" />
          </div>
        </div>
      }
    >
      <WeekContent />
    </Suspense>
  );
}
