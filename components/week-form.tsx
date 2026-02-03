'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatSecondsToTime } from '@/lib/pace-utils';

export type WeekFormData = {
  weeklyKm: number;
  daysPerWeek: number;
  runDays: Record<string, boolean>;
  fiveKTime?: string | null;
};

export const WEEK_DAYS = [
  { key: 'ma', label: 'Maandag' },
  { key: 'di', label: 'Dinsdag' },
  { key: 'wo', label: 'Woensdag' },
  { key: 'do', label: 'Donderdag' },
  { key: 'vr', label: 'Vrijdag' },
  { key: 'za', label: 'Zaterdag' },
  { key: 'zo', label: 'Zondag' },
];

const WEEK_FORM_COOKIE_NAME = 'ns_week_form';
const WEEK_FORM_COOKIE_MAX_AGE_DAYS = 90;

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

const readCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ').filter(Boolean);
  const entry = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  if (!entry) return null;
  const value = entry.split('=').slice(1).join('=');
  return decodeURIComponent(value || '');
};

const writeCookie = (name: string, value: string, maxAgeDays: number) => {
  if (typeof document === 'undefined') return;
  const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/; samesite=lax`;
};

const buildRunDaysFromCookie = (rawRunDays: unknown) => {
  if (!rawRunDays || typeof rawRunDays !== 'object') {
    return WEEK_DAYS.reduce(
      (acc, day) => ({ ...acc, [day.key]: true }),
      {} as Record<string, boolean>,
    );
  }

  const runDays = WEEK_DAYS.reduce(
    (acc, day) => ({
      ...acc,
      [day.key]: Boolean((rawRunDays as Record<string, unknown>)[day.key]),
    }),
    {} as Record<string, boolean>,
  );

  const runDaysCount = Object.values(runDays).filter(Boolean).length;
  return runDaysCount >= 4
    ? runDays
    : WEEK_DAYS.reduce(
        (acc, day) => ({ ...acc, [day.key]: true }),
        {} as Record<string, boolean>,
      );
};

const inputClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-center text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

const selectClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

interface WeekFormProps {
  onSubmit: (data: WeekFormData) => void;
}

export function WeekForm({ onSubmit }: WeekFormProps) {
  const [weeklyKm, setWeeklyKm] = useState('');
  const [runDays, setRunDays] = useState<Record<string, boolean>>(() =>
    WEEK_DAYS.reduce(
      (acc, day) => ({ ...acc, [day.key]: true }),
      {} as Record<string, boolean>,
    ),
  );
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const hasHydratedFromCookie = useRef(false);
  const minRunDays = 4;
  const runDaysCount = Object.values(runDays).filter(Boolean).length;
  const daysPerWeek = runDaysCount;

  useEffect(() => {
    if (hasHydratedFromCookie.current) return;
    hasHydratedFromCookie.current = true;

    const cookieValue = readCookie(WEEK_FORM_COOKIE_NAME);
    if (!cookieValue) return;

    let parsed: {
      weeklyKm?: number;
      runDays?: Record<string, boolean>;
      fiveKTime?: string | null;
    };
    try {
      parsed = JSON.parse(cookieValue);
    } catch {
      return;
    }

    const nextWeeklyKm =
      typeof parsed.weeklyKm === 'number' && Number.isFinite(parsed.weeklyKm)
        ? parsed.weeklyKm
        : null;
    const nextRunDays = buildRunDaysFromCookie(parsed.runDays);
    const nextFiveKTime =
      typeof parsed.fiveKTime === 'string' && parsed.fiveKTime.includes(':')
        ? parsed.fiveKTime
        : null;

    if (nextWeeklyKm !== null) {
      setWeeklyKm(String(nextWeeklyKm));
    }
    setRunDays(nextRunDays);

    if (nextFiveKTime) {
      const [mins, secs] = nextFiveKTime.split(':');
      if (mins) {
        setMinutes(mins);
      }
      if (secs) {
        setSeconds(secs);
      }
    }

    const hydratedDaysPerWeek = Object.values(nextRunDays).filter(Boolean).length;
    onSubmit({
      weeklyKm: nextWeeklyKm ?? 0,
      daysPerWeek: hydratedDaysPerWeek,
      runDays: nextRunDays,
      fiveKTime: nextFiveKTime,
    });
  }, [onSubmit]);

  const buildFiveKTime = () => {
    const trimmedMinutes = minutes.trim();
    const trimmedSeconds = seconds.trim();
    if (!trimmedMinutes && !trimmedSeconds) {
      return null;
    }
    const safeMinutes = trimmedMinutes ? trimmedMinutes : '0';
    const safeSeconds = trimmedSeconds ? trimmedSeconds.padStart(2, '0') : '00';
    return `${safeMinutes}:${safeSeconds}`;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const kmValue = weeklyKm.trim() === '' ? 0 : Number(weeklyKm);
    let fiveKTime = buildFiveKTime();

    if (!fiveKTime) {
      const estimatedSeconds = getDefaultFiveKTimeSeconds(kmValue);
      fiveKTime = formatSecondsToTime(estimatedSeconds);
      const mins = Math.floor(estimatedSeconds / 60);
      const secs = estimatedSeconds % 60;
      setMinutes(String(mins));
      setSeconds(String(secs).padStart(2, '0'));
    }

    onSubmit({
      weeklyKm: Number.isNaN(kmValue) ? 0 : kmValue,
      daysPerWeek,
      runDays,
      fiveKTime,
    });

    writeCookie(
      WEEK_FORM_COOKIE_NAME,
      JSON.stringify({
        weeklyKm: Number.isNaN(kmValue) ? 0 : kmValue,
        runDays,
        fiveKTime,
      }),
      WEEK_FORM_COOKIE_MAX_AGE_DAYS,
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Weekplanner tool
        </CardTitle>
        <CardDescription>
          Vul je weekvolume, loopdagen en voorkeuren in om je week te plannen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-3">
            <Label htmlFor="weekly-km" className="flex items-center gap-2">
              Hoeveel km wil je per week lopen?
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Rond af op hele kilometers voor een duidelijk plan.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="relative">
              <input
                id="weekly-km"
                type="number"
                min="1"
                max="200"
                step="1"
                placeholder="60"
                value={weeklyKm}
                onChange={(event) => setWeeklyKm(event.target.value)}
                className={inputClassName}
                required
                aria-label="Kilometers per week"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                km
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Welke dagen zijn loopdagen?</Label>
            <p className="text-sm text-muted-foreground">
              Kies minimaal {minRunDays} loopdagen. Je loopt dan {daysPerWeek} dagen per week.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {WEEK_DAYS.map((day) => {
                const isRunDay = runDays[day.key];
                const isDisabled = isRunDay && runDaysCount <= minRunDays;
                return (
                  <label
                    key={day.key}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                  >
                    <span className="text-sm text-foreground">{day.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {isRunDay ? 'Loopdag' : 'Rustdag'}
                      </span>
                      <input
                        type="checkbox"
                        checked={isRunDay}
                        disabled={isDisabled}
                        onChange={() =>
                          setRunDays((prev) => ({
                            ...prev,
                            [day.key]: !prev[day.key],
                          }))
                        }
                        aria-label={`${day.label} loopdag`}
                        className="h-4 w-4 accent-primary"
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              5K-tijd (mm:ss) - optioneel
            </Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="12"
                  max="90"
                  placeholder="20"
                  value={minutes}
                  onChange={(event) => setMinutes(event.target.value)}
                  className={inputClassName}
                  aria-label="5K minuten"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  min
                </span>
              </div>
              <span className="text-2xl font-bold text-muted-foreground">:</span>
              <div className="relative flex-1">
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="00"
                  value={seconds}
                  onChange={(event) => setSeconds(event.target.value)}
                  className={inputClassName}
                  aria-label="5K seconden"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  sec
                </span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full cursor-pointer" size="lg">
            Maak mijn week
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
