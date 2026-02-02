import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Users,
  AlertTriangle,
  Target,
  Clock,
  Gauge,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  cta,
  geschiktTitle,
  geschiktVoor,
  keyPrinciples,
  keyPrinciplesTitle,
  nietGeschiktTitle,
  nietGeschiktVoor,
  regels,
  regelsTitle,
  uitlegHeaderTitle,
  uitlegIntro,
  uitlegMeta,
  voorWie,
  voorWieTitle,
  voorbeeldSessieStats,
  voorbeeldSessieSteps,
  voorbeeldSessieTitle,
} from "@/content/uitleg";

export const metadata: Metadata = {
  title: uitlegMeta.title,
  description: uitlegMeta.description,
};

const principleIcons = {
  target: Target,
  clock: Clock,
  gauge: Gauge,
} as const;

export default function UitlegPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {uitlegHeaderTitle}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {uitlegIntro.trim()}
        </p>
      </div>

      {/* Key Principles */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          {keyPrinciplesTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {keyPrinciples.map((principle) => {
            const Icon =
              principleIcons[principle.icon as keyof typeof principleIcons];
            return (
              <Card key={principle.title}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Example Session */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          {voorbeeldSessieTitle}
        </h2>
        <Card className="border-primary/30 bg-accent">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {voorbeeldSessieSteps.map((step, index) => {
                const isPrimary = step.variant === "primary";
                return (
                  <div
                    key={step.title}
                    className={`flex items-center gap-4 rounded-lg p-4 ${
                      isPrimary
                        ? "bg-primary text-primary-foreground"
                        : "bg-background"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                        isPrimary ? "bg-primary-foreground/20" : "bg-secondary"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p
                        className={`text-sm ${
                          isPrimary
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-6">
              {voorbeeldSessieStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className={`text-2xl font-bold ${
                      stat.tone === "primary"
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Rules Checklist */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          {regelsTitle}
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {regels.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* For Whom */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          {voorWieTitle}
        </h2>
        <p className="mb-6 text-muted-foreground">{voorWie.trim()}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Suitable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                {geschiktTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {geschiktVoor.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Not Suitable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                {nietGeschiktTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {nietGeschiktVoor.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="mb-16">
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
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-secondary/50 p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {cta.title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          {cta.description}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href={cta.primary.href}>
              {cta.primary.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={cta.secondary.href}>
              {cta.secondary.label}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
