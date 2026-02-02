'use client';

import React from "react"

import { useState, useEffect } from 'react';
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
} from '@/lib/pace-utils';

interface CalculatorFormProps {
  onCalculate: (result: CalculatorResult) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const searchParams = useSearchParams();
  
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handle prefilled time from URL
  useEffect(() => {
    const timeParam = searchParams.get('tijd');
    if (timeParam) {
      const totalSeconds = parseTimeToSeconds(timeParam);
      if (totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        setMinutes(mins.toString());
        setSeconds(secs.toString().padStart(2, '0'));
      }
    }
  }, [searchParams]);

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
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Voer je 5K-tijd in
        </CardTitle>
        <CardDescription>
          Gebruik je meest recente 5K-wedstrijdtijd of een recente tijdrit voor 
          de meest nauwkeurige berekeningen.
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
                      Gebruik je wedstrijdtijd of een recente tijdrit. Als je geen 
                      recente 5K hebt, kun je een schatting maken op basis van je 
                      10K-tijd minus 2-3 minuten.
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
          <Button type="submit" className="w-full" size="lg">
            Bereken mijn tempo&apos;s
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
