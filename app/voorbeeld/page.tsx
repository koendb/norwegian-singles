'use client';

import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function VoorbeeldPage() {
  // Example: 22:30 5K time - calculated values
  const exampleTimeFormatted = '22:30';

  // Time-based intervals data
  const timeBasedIntervals = [
    {
      workout: 'Short Intervals',
      structure: '8-12 x 3-4min',
      targetPace: '4:00-4:07/km',
      paceNote: '15K pace',
      recovery: '60s rest',
    },
    {
      workout: 'Medium Intervals',
      structure: '4-6 x 6-8min',
      targetPace: '4:06-4:13/km',
      paceNote: 'Half Marathon pace',
      recovery: '60s rest',
    },
    {
      workout: 'Long Intervals',
      structure: '3 x 10-12min',
      targetPace: '4:12-4:19/km',
      paceNote: '30K pace',
      recovery: '60s rest',
    },
  ];

  // Distance-based intervals data
  const distanceBasedIntervals = [
    {
      workout: '1K Repeats',
      structure: '8-12 x 1K',
      targetPace: '4:00-4:07/km',
      paceNote: '15K pace',
      recovery: '60s rest',
    },
    {
      workout: '2K Repeats',
      structure: '4-6 x 2K',
      targetPace: '4:06-4:13/km',
      paceNote: 'Half Marathon pace',
      recovery: '60s rest',
    },
    {
      workout: '3K Repeats',
      structure: '3 x 3K',
      targetPace: '4:12-4:19/km',
      paceNote: '30K pace',
      recovery: '60s rest',
    },
  ];

  const notes = [
    'Keep rest periods short to maintain lactate state',
    'Rest can be standing, walking, or easy jogging',
    'Total quality running time should be 20-25% of weekly mileage',
    'Easy runs should be extremely easy (max 70% max heart rate)',
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Voorbeeld: Calculator Resultaat
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Zo ziet de calculator eruit na het invullen van een 5K-tijd van{' '}
          <span className="font-semibold text-foreground">{exampleTimeFormatted}</span>.
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-8 rounded-lg border border-primary/30 bg-accent p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-foreground">Dit is een voorbeeldresultaat</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Deze pagina toont hoe de calculator eruitziet met een ingevulde 5K-tijd van {exampleTimeFormatted}. 
              Wil je je eigen tempo&apos;s berekenen?{' '}
              <Link href="/calculator" className="font-medium text-primary hover:underline">
                Ga naar de calculator
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Time-based Intervals */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Time-based Intervals</CardTitle>
          <CardDescription>Intervallen gebaseerd op tijd</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Workout</TableHead>
                  <TableHead className="font-semibold">Structure</TableHead>
                  <TableHead className="font-semibold">Target Pace</TableHead>
                  <TableHead className="font-semibold">Recovery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeBasedIntervals.map((interval) => (
                  <TableRow key={interval.workout}>
                    <TableCell className="font-medium">{interval.workout}</TableCell>
                    <TableCell>{interval.structure}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{interval.targetPace}</span>
                        <span className="text-sm text-muted-foreground">{interval.paceNote}</span>
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

      {/* Distance-based Intervals */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Distance-based Intervals</CardTitle>
          <CardDescription>Intervallen gebaseerd op afstand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Workout</TableHead>
                  <TableHead className="font-semibold">Structure</TableHead>
                  <TableHead className="font-semibold">Target Pace</TableHead>
                  <TableHead className="font-semibold">Recovery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {distanceBasedIntervals.map((interval) => (
                  <TableRow key={interval.workout}>
                    <TableCell className="font-medium">{interval.workout}</TableCell>
                    <TableCell>{interval.structure}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{interval.targetPace}</span>
                        <span className="text-sm text-muted-foreground">{interval.paceNote}</span>
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

      {/* Notes */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{note}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Klaar om je eigen tempo&apos;s te berekenen?
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/calculator">
            Naar de Calculator
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
