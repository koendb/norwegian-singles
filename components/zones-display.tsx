'use client';

import Link from 'next/link';
import { Activity } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPace, kmPaceToMilePace, type CalculatorResult } from '@/lib/pace-utils';

interface ZonesDisplayProps {
  result: CalculatorResult;
  useMiles: boolean;
}

export function ZonesDisplay({ result, useMiles }: ZonesDisplayProps) {
  const unit = useMiles ? 'mi' : 'km';
  
  const formatZonePace = (pace: number) => {
    const displayPace = useMiles ? kmPaceToMilePace(pace) : pace;
    return formatPace(displayPace);
  };

  // Highlighted Norwegian Single info
  const singlePace = formatZonePace(result.singlePace);
  const recoveryPace = formatZonePace(result.recoveryPace);

  return (
    <div className="space-y-6">
      {/* Primary Result: Norwegian Single Pace */}
      <Card className="border-primary/30 bg-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Activity className="h-6 w-6 text-primary" />
            Jouw Norwegian Single Tempo
          </CardTitle>
          <CardDescription>
            Dit is het tempo voor je intervallen - uitdagend maar controleerbaar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg bg-background p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">Interval tempo</p>
              <p className="mt-1 text-4xl font-bold text-primary">{singlePace}</p>
              <p className="text-sm text-muted-foreground">per {unit}</p>
            </div>
            <div className="rounded-lg bg-background p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">Herstel tempo</p>
              <p className="mt-1 text-4xl font-bold text-foreground">{recoveryPace}</p>
              <p className="text-sm text-muted-foreground">per {unit}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <strong>Tip:</strong> Het herstel moet echt heel makkelijk voelen. Als je na 
            het herstel niet fris genoeg bent voor de volgende interval, jog dan langzamer.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="#calculator-form">Bereken mijn tempo&apos;s</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
