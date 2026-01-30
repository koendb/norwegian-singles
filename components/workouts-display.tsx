'use client';

import { Dumbbell, Clock, Flame, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateWorkouts, type CalculatorResult } from '@/lib/pace-utils';

interface WorkoutsDisplayProps {
  result: CalculatorResult;
}

const difficultyColors = {
  makkelijk: 'bg-chart-1/10 text-chart-1 border-chart-1/30',
  gemiddeld: 'bg-chart-3/10 text-chart-3 border-chart-3/30',
  zwaar: 'bg-chart-5/10 text-chart-5 border-chart-5/30',
};

export function WorkoutsDisplay({ result }: WorkoutsDisplayProps) {
  const workouts = generateWorkouts(result);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyWorkout = (workout: (typeof workouts)[0], index: number) => {
    const text = `${workout.name}\n${workout.description}\n\nStructuur: ${workout.structure}\nTotale tijd: ${workout.totalTime}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />
          Voorbeeldworkouts
        </CardTitle>
        <CardDescription>
          Kies een workout die past bij je huidige fitnessniveau en doelen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2 lg:grid-cols-4">
            {workouts.map((workout, index) => (
              <TabsTrigger key={index} value={index.toString()} className="text-xs sm:text-sm">
                {workout.name.split(' ').slice(-1)[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {workouts.map((workout, index) => (
            <TabsContent key={index} value={index.toString()}>
              <div className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-semibold">{workout.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {workout.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={difficultyColors[workout.difficulty]}
                  >
                    {workout.difficulty}
                  </Badge>
                </div>

                <div className="mt-4 rounded-lg bg-secondary/50 p-4">
                  <p className="font-mono text-sm">{workout.structure}</p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{workout.totalTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Flame className="h-4 w-4" />
                      <span>{workout.difficulty}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyWorkout(workout, index)}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="mr-1 h-4 w-4" />
                        Gekopieerd
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-4 w-4" />
                        Kopieer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
