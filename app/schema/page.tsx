import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  schemaMeta,
  schemaHeader,
  buildSchema,
  weeklySchedule,
  voorbeeldSessieStats,
  voorbeeldSessieSteps,
  voorbeeldSessieTitle,
  paceGuidance,
  beginnersGuidance,
} from '@/content/schema';
import { homeHowItWorks } from '@/content/home';

export const metadata: Metadata = {
  title: schemaMeta.title,
  description: schemaMeta.description,
};

export default function SchemaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {schemaHeader.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {schemaHeader.description}
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {schemaHeader.intro}
        </p>
      </div>

      {/* Build Your Schema */}
      <section className="mb-16 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          {buildSchema.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {buildSchema.firstParagraph.beforeStrong}
          <strong>{buildSchema.firstParagraph.strong}</strong>
          {buildSchema.firstParagraph.afterStrong}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {buildSchema.secondParagraph}
        </p>
      </section>

      {/* Weekly Schedule */}
      <section className="mb-16 space-y-6">
        <div className="rounded-lg bg-accent p-4">
          <h4 className="font-semibold">{weeklySchedule.title}</h4>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-7">
            {weeklySchedule.days.map((day) => (
              <div
                key={day.day}
                className={`rounded-lg p-2 text-center ${
                  day.type === 'quality'
                    ? 'bg-primary text-primary-foreground'
                    : day.type === 'easy'
                      ? 'bg-secondary text-foreground'
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

      {/* Pace Guidance */}
      <section className="mb-16 space-y-4 text-muted-foreground">
        <h2 className="text-2xl font-bold text-foreground">
          {paceGuidance.title}
        </h2>
        <p>
          {paceGuidance.intro}
        </p>
        <p>
          {paceGuidance.linkParagraph.beforeLink}
          <a
            href="/calculator"
            className="text-primary underline underline-offset-4"
          >
            {paceGuidance.linkParagraph.linkText}
          </a>
          {paceGuidance.linkParagraph.afterLink}
        </p>
        <p>
          {paceGuidance.recoveryParagraph}
        </p>
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
                      stat.tone === "primary" ? "text-primary" : "text-foreground"
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

      {/* Beginners */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          {beginnersGuidance.title}
        </h2>
        <div className="space-y-4 text-muted-foreground">
          {beginnersGuidance.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="mb-16">
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {homeHowItWorks.steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < homeHowItWorks.steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
