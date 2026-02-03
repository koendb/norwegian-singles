'use client';

import { useState, Suspense, useCallback } from 'react';
import { Lightbulb } from 'lucide-react';
import { CalculatorForm } from '@/components/calculator-form';
import { formatPace, type CalculatorResult } from '@/lib/pace-utils';
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
import {
  calculatorHeader,
  distanceBasedSection,
  notesSection,
  timeBasedSection,
} from '@/content/calculator';

function CalculatorContent() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [calculationKey, setCalculationKey] = useState(0);
  const useMiles = false;
  const riegelExponent = 1.06;
  const paceTargetsByWorkout = {
    "korte intervallen": { type: "single", km: 15 },
    "medium intervallen": { type: "single", km: 21.0975 },
    "lange intervallen": { type: "single", km: 30 },
    "1k intervallen": { type: "single", km: 15 },
    "2k intervallen": { type: "single", km: 21.0975 },
    "3k intervallen": { type: "single", km: 30 },
  } as const;

  const predictTimeSeconds = (
    baseTimeSeconds: number,
    baseDistanceKm: number,
    targetDistanceKm: number,
  ) => baseTimeSeconds * Math.pow(targetDistanceKm / baseDistanceKm, riegelExponent);

  const getRecoveryRunPace = (currentResult: CalculatorResult | null) => {
    if (!currentResult) {
      return "n.v.t.";
    }
    const recoveryPaceSeconds = currentResult.fiveKPace / 0.67;
    return `+/- ${formatPace(recoveryPaceSeconds)}/km`;
  };

  const formatPaceRange = (minSecondsPerKm: number, maxSecondsPerKm: number) => {
    const minPace = formatPace(minSecondsPerKm);
    const maxPace = formatPace(maxSecondsPerKm);
    return `${minPace}-${maxPace}/km`;
  };

  const getPaceTargetFromInterval = (interval: {
    paceTarget?: { type: "range"; minKm: number; maxKm: number } | { type: "single"; km: number };
    paceNote?: string;
  }) => {
    if (interval.paceTarget) {
      return interval.paceTarget;
    }

    if (!interval.paceNote) {
      return null;
    }

    const note = interval.paceNote.toLowerCase();
    if (note.includes("15k")) {
      return { type: "single", km: 15 } as const;
    }
    if (note.includes("hm") || note.includes("half")) {
      return { type: "single", km: 21.0975 } as const;
    }
    if (note.includes("30k")) {
      return { type: "single", km: 30 } as const;
    }

    return null;
  };

  const getIntervalPace = (interval: {
    targetPace: string;
    workout?: string;
    paceTarget?: { type: "range"; minKm: number; maxKm: number } | { type: "single"; km: number };
    paceNote?: string;
  }) => {
    const workoutKey = interval.workout?.trim().toLowerCase();
    const paceTarget =
      (workoutKey ? paceTargetsByWorkout[workoutKey as keyof typeof paceTargetsByWorkout] : null) ||
      interval.paceTarget ||
      getPaceTargetFromInterval(interval);
    if (!result || !paceTarget) {
      return interval.targetPace;
    }

    const fiveKTimeSeconds = result.fiveKPace * 5;

    if (paceTarget.type === "range") {
      const minPaceSeconds =
        predictTimeSeconds(fiveKTimeSeconds, 5, paceTarget.minKm) /
        paceTarget.minKm;
      const maxPaceSeconds =
        predictTimeSeconds(fiveKTimeSeconds, 5, paceTarget.maxKm) /
        paceTarget.maxKm;
      return formatPaceRange(minPaceSeconds, maxPaceSeconds);
    }

    const paceSeconds =
      predictTimeSeconds(fiveKTimeSeconds, 5, paceTarget.km) / paceTarget.km;

    if (paceTarget.km === 15) {
      return formatPaceRange(paceSeconds - 2, paceSeconds + 6);
    }

    if (paceTarget.km === 21.0975 || paceTarget.km === 30) {
      return formatPaceRange(paceSeconds - 1, paceSeconds + 7);
    }

    return `${formatPace(paceSeconds)}/km`;
  };

  const notesCard = (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          {notesSection.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {notesSection.items.map((note, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-muted-foreground">{note}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const handleCalculate = useCallback((nextResult: CalculatorResult) => {
    setResult(nextResult);
    setCalculationKey((prev) => prev + 1);
  }, []);

  return (
    <div className="mx-auto max-w-6xl overflow-x-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {calculatorHeader.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {calculatorHeader.description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Calculator Form - Sticky on desktop */}
        <div className="lg:col-span-2 min-w-0">
          <div id="calculator-form" className="lg:sticky lg:top-24">
            <CalculatorForm onCalculate={handleCalculate} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 min-w-0">
          {result ? (
            <div key={calculationKey} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{timeBasedSection.title}</CardTitle>
                  <CardDescription>{timeBasedSection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden font-semibold sm:table-cell">
                            {timeBasedSection.tableHeaders.workout}
                          </TableHead>
                          <TableHead className="font-semibold">
                            {timeBasedSection.tableHeaders.structure}
                          </TableHead>
                          <TableHead className="font-semibold">
                            {timeBasedSection.tableHeaders.targetPace}
                          </TableHead>
                          <TableHead className="font-semibold">
                            {timeBasedSection.tableHeaders.recovery}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeBasedSection.rows.map((interval) => (
                          <TableRow key={interval.workout}>
                            <TableCell className="hidden font-medium sm:table-cell">
                              {interval.workout}
                            </TableCell>
                            <TableCell>{interval.structure}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-primary">
                                  {getIntervalPace(interval)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {interval.paceNote}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{interval.recovery}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow key="herstelloop-tijd">
                          <TableCell className="hidden font-medium sm:table-cell">
                            Herstelloop
                          </TableCell>
                          <TableCell>n.v.t.</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-semibold text-primary">
                                {getRecoveryRunPace(result)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                herstel
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>n.v.t.</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{distanceBasedSection.title}</CardTitle>
                  <CardDescription>{distanceBasedSection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden font-semibold sm:table-cell">
                            {distanceBasedSection.tableHeaders.workout}
                          </TableHead>
                          <TableHead className="font-semibold">
                            {distanceBasedSection.tableHeaders.structure}
                          </TableHead>
                          <TableHead className="font-semibold">
                            {distanceBasedSection.tableHeaders.targetPace}
                          </TableHead>
                          <TableHead className="font-semibold">
                            {distanceBasedSection.tableHeaders.recovery}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {distanceBasedSection.rows.map((interval) => (
                          <TableRow key={interval.workout}>
                            <TableCell className="hidden font-medium sm:table-cell">
                              {interval.workout}
                            </TableCell>
                            <TableCell>{interval.structure}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-primary">
                                  {getIntervalPace(interval)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {interval.paceNote}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{interval.recovery}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow key="herstelloop-afstand">
                          <TableCell className="hidden font-medium sm:table-cell">
                            Herstelloop
                          </TableCell>
                          <TableCell>n.v.t.</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-semibold text-primary">
                                {getRecoveryRunPace(result)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                herstel
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>n.v.t.</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              {notesCard}
            </div>
          ) : (
            <div className="space-y-8">
              {notesCard}
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
