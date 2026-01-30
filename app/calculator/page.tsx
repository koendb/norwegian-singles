'use client';

import { useState, Suspense } from 'react';
import { CalculatorForm } from '@/components/calculator-form';
import { ZonesDisplay } from '@/components/zones-display';
import { WorkoutsDisplay } from '@/components/workouts-display';
import { type CalculatorResult } from '@/lib/pace-utils';

function CalculatorContent() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [useMiles, setUseMiles] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Norwegian Singles Calculator
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Voer je 5K-tijd in en ontvang je persoonlijke tempo&apos;s voor 
          effectieve Norwegian Singles trainingen.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Calculator Form - Sticky on desktop */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <CalculatorForm onCalculate={setResult} />
            
            {/* Unit toggle when results exist */}
            {result && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <button
                  onClick={() => setUseMiles(false)}
                  className={`rounded-md px-3 py-1 transition-colors ${
                    !useMiles
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  Kilometers
                </button>
                <button
                  onClick={() => setUseMiles(true)}
                  className={`rounded-md px-3 py-1 transition-colors ${
                    useMiles
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  Mijlen
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {result ? (
            <div className="space-y-8">
              <ZonesDisplay result={result} useMiles={useMiles} />
              <WorkoutsDisplay result={result} />
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 p-8 text-center">
              <div className="mx-auto max-w-sm">
                <h3 className="text-lg font-semibold text-foreground">
                  Voer je 5K-tijd in
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Zodra je je tijd hebt ingevoerd, verschijnen hier je 
                  persoonlijke tempo&apos;s en voorbeeldworkouts.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="mx-auto h-10 w-64 rounded bg-secondary" />
          <div className="mx-auto mt-4 h-6 w-96 rounded bg-secondary" />
        </div>
      </div>
    }>
      <CalculatorContent />
    </Suspense>
  );
}
