import { Heart, Zap, Shield, Target, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { homeFeatures } from '@/content/home';

const featureIcons = {
  heart: Heart,
  zap: Zap,
  shield: Shield,
  target: Target,
  clock: Clock,
  barChart3: BarChart3,
} as const;

export function Features() {
  return (
    <section className="bg-secondary/30 pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {homeFeatures.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {homeFeatures.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeFeatures.items.map((feature) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons];
            return (
              <Card
                key={feature.title}
                className="border-border bg-card transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
