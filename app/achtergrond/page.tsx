import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Beaker, Brain, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  aanpassingen,
  achtergrondCta,
  achtergrondHeader,
  achtergrondMeta,
  fysiologie,
  intensiteitsverdeling,
  oorsprong,
  verderLezen,
} from "@/content/achtergrond";

export const metadata: Metadata = {
  title: achtergrondMeta.title,
  description: achtergrondMeta.description,
};

const topicIcons = {
  beaker: Beaker,
  brain: Brain,
  trendingUp: TrendingUp,
} as const;

export default function AchtergrondPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {achtergrondHeader.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {achtergrondHeader.description}
        </p>
      </div>

      {/* Origin Story */}
      <section className="mb-16">
        <Card className="border-primary/30 bg-accent">
          <CardHeader>
            <CardTitle className="text-xl">{oorsprong.title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-muted-foreground">
            {oorsprong.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? undefined : "mt-4"}>
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Science Topics */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          {fysiologie.title}
        </h2>
        <div className="space-y-8">
          {fysiologie.topics.map((topic) => {
            const Icon = topicIcons[topic.icon as keyof typeof topicIcons];
            return (
              <Card key={topic.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {topic.content}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Adaptations */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          {aanpassingen.title}
        </h2>
        <p className="mb-6 text-muted-foreground">
          {aanpassingen.intro}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {aanpassingen.items.map((adaptation) => (
            <div
              key={adaptation.title}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h3 className="font-semibold text-foreground">{adaptation.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {adaptation.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intensity Distribution */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          {intensiteitsverdeling.title}
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {intensiteitsverdeling.zones.map((zone) => (
                <div key={zone.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{zone.label}</span>
                    <span className="font-medium">{zone.percentage}</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full ${zone.barClass}`}
                      style={{ width: zone.barWidth }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {intensiteitsverdeling.note}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Further Reading */}
      <section className="mb-16">
        <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-foreground">
          <BookOpen className="h-6 w-6 text-primary" />
          {verderLezen.title}
        </h2>
        <div className="space-y-4">
          {verderLezen.items.map((book) => (
            <Card key={book.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <CardDescription>door {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{book.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-secondary/50 p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {achtergrondCta.title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          {achtergrondCta.description}
        </p>
        <div className="mt-6">
          <Button asChild size="lg">
            <Link href={achtergrondCta.button.href}>
              {achtergrondCta.button.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
