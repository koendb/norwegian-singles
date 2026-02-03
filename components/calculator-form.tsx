'use client';

import React from "react"

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calculator, Info } from 'lucide-react';
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
import {
  parseTimeToSeconds,
  calculateZones,
  type CalculatorResult,
  timePartsToSeconds,
  validateFiveKTime,
  formatSecondsToTime,
} from '@/lib/pace-utils';
import {
  GOATCOUNTER_EVENT_CALCULATE_PACES_PATH,
  GOATCOUNTER_EVENT_CALCULATE_PACES_TITLE,
} from "@/content/analytics";

interface CalculatorFormProps {
  onCalculate: (result: CalculatorResult) => void;
}

const CALCULATOR_COOKIE_NAME = 'ns_5k_time';
const CALCULATOR_COOKIE_MAX_AGE_DAYS = 90;

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

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const searchParams = useSearchParams();
  
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [error, setError] = useState<string | null>(null);
  const hasHydratedFromCookie = useRef(false);

  // Handle prefilled time from URL or cookie
  useEffect(() => {
    if (hasHydratedFromCookie.current) return;
    hasHydratedFromCookie.current = true;

    const timeParam = searchParams.get('tijd');
    const cookieTime = timeParam ? null : readCookie(CALCULATOR_COOKIE_NAME);
    const timeValue = timeParam ?? cookieTime;
    if (!timeValue) return;

    const totalSeconds = parseTimeToSeconds(timeValue);
    if (!totalSeconds) return;

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    setMinutes(mins.toString());
    setSeconds(secs.toString().padStart(2, '0'));

    const validationError = validateFiveKTime(totalSeconds);
    if (!validationError) {
      const result = calculateZones(totalSeconds);
      onCalculate(result);
    }
  }, [searchParams, onCalculate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isEmptyInput = minutes.trim() === '' && seconds.trim() === '';
    const mins = isEmptyInput ? 20 : parseInt(minutes, 10) || 0;
    const secs = isEmptyInput ? 0 : parseInt(seconds, 10) || 0;

    if (isEmptyInput) {
      setMinutes('20');
      setSeconds('00');
    }
    const totalSeconds = timePartsToSeconds(mins, secs);

    const validationError = validateFiveKTime(totalSeconds);
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = calculateZones(totalSeconds);
    onCalculate(result);
    writeCookie(
      CALCULATOR_COOKIE_NAME,
      formatSecondsToTime(totalSeconds),
      CALCULATOR_COOKIE_MAX_AGE_DAYS,
    );

    const goatcounter = typeof window !== "undefined" ? (window as any).goatcounter : undefined;
    if (goatcounter && typeof goatcounter.count === "function") {
      goatcounter.count({
        path: GOATCOUNTER_EVENT_CALCULATE_PACES_PATH,
        title: GOATCOUNTER_EVENT_CALCULATE_PACES_TITLE,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Voer je 5K-tijd in
        </CardTitle>
        <CardDescription>
          Gebruik je meest recente 5K-wedstrijdtijd of je huidige geschatte 5k tijd in om jouw tempo's te berekenen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Time Input */}
          <div className="space-y-3">
            <Label htmlFor="minutes" className="flex items-center gap-2">
              5K-tijd (mm:ss)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      Gebruik je wedstrijdtijd of een schatting. Eventueel kun je een recente 10km tijd x 0,48 doen.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="minutes"
                  type="number"
                  min="12"
                  max="60"
                  placeholder="20"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-center text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  aria-label="Minuten"
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
                  onChange={(e) => setSeconds(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-center text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  aria-label="Seconden"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  sec
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full cursor-pointer" size="lg">
            Bereken mijn tempo&apos;s
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
