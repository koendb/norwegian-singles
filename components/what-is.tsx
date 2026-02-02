import { Target, Clock, Gauge } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { homeWhatIs, homePillars } from '@/content/home';

const pillarIcons = {
  target: Target,
  clock: Clock,
  gauge: Gauge,
} as const;

export function WhatIs() {
  return (
    <section className="bg-background pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {homeWhatIs.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {homeWhatIs.description}
          </p>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-bold text-foreground">
            {homePillars.title}
          </h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {homePillars.items.map((pillar) => {
              const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons];
              return (
                <Card key={pillar.title}>
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {pillar.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
