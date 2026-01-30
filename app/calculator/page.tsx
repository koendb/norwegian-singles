'use client';

import { useState, Suspense } from 'react';
import { CalculatorForm } from '@/components/calculator-form';
import { ZonesDisplay } from '@/components/zones-display';
import { type CalculatorResult } from '@/lib/pace-utils';
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
} from '@/content/calculator';
import {
  distanceBasedSection,
  notesSection,
  timeBasedSection,
} from '@/content/voorbeelden';

function CalculatorContent() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const useMiles = false;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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
        <div className="lg:col-span-2">
          <div id="calculator-form" className="lg:sticky lg:top-24">
            <CalculatorForm onCalculate={setResult} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {result ? (
            <div className="space-y-8">
              <ZonesDisplay result={result} useMiles={useMiles} />
              <Card>
                <CardHeader>
                  <CardTitle>{timeBasedSection.title}</CardTitle>
                  <CardDescription>{timeBasedSection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">
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
                            <TableCell className="font-medium">
                              {interval.workout}
                            </TableCell>
                            <TableCell>{interval.structure}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-primary">
                                  {interval.targetPace}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {interval.paceNote}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{interval.recovery}</TableCell>
                          </TableRow>
                        ))}
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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">
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
                            <TableCell className="font-medium">
                              {interval.workout}
                            </TableCell>
                            <TableCell>{interval.structure}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold text-primary">
                                  {interval.targetPace}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {interval.paceNote}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{interval.recovery}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{notesSection.title}</CardTitle>
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
              <div className="rounded-lg bg-accent p-4">
                <h4 className="font-semibold">Weekschema suggestie</h4>
                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-7">
                  {[
                    { day: 'Ma', workout: 'Rust of licht', type: 'rest' },
                    { day: 'Di', workout: 'Duurloop 40-60 min', type: 'easy' },
                    { day: 'Wo', workout: 'Norwegian Singles', type: 'key' },
                    { day: 'Do', workout: 'Rust of herstelloop', type: 'rest' },
                    { day: 'Vr', workout: 'Duurloop 30-45 min', type: 'easy' },
                    { day: 'Za', workout: 'Lange duurloop', type: 'long' },
                    { day: 'Zo', workout: 'Rust', type: 'rest' },
                  ].map((day) => (
                    <div
                      key={day.day}
                      className={`rounded-lg p-2 text-center ${
                        day.type === 'key'
                          ? 'bg-primary text-primary-foreground'
                          : day.type === 'rest'
                            ? 'bg-secondary'
                            : 'bg-background'
                      }`}
                    >
                      <p className="font-semibold">{day.day}</p>
                      <p className="mt-1 text-xs leading-tight">{day.workout}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
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
