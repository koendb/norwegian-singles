'use client';

import { Activity, Heart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
        </CardContent>
      </Card>

      {/* All Training Zones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Alle trainingszones
          </CardTitle>
          <CardDescription>
            Overzicht van al je tempo&apos;s voor verschillende trainingstypen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.zones.map((zone) => (
              <div
                key={zone.name}
                className="flex flex-col gap-2 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: zone.color }}
                    />
                    <span className="font-medium">{zone.name}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {zone.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {formatZonePace(zone.maxPace)} - {formatZonePace(zone.minPace)}
                    </p>
                    <p className="text-xs text-muted-foreground">per {unit}</p>
                  </div>
                  {zone.hrPercentMin && zone.hrPercentMax && (
                    <Badge variant="outline" className="whitespace-nowrap">
                      {zone.hrPercentMin}-{zone.hrPercentMax}% HR
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
