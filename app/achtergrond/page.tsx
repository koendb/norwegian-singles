import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  achtergrondCta,
  achtergrondHeader,
  achtergrondMeta,
  oorsprong,
  verderLezen,
} from "@/content/achtergrond";

export const metadata: Metadata = {
  title: achtergrondMeta.title,
  description: achtergrondMeta.description,
};

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
        <div className="mb-6">
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {oorsprong.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? undefined : "mt-4"}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <Card className="border-primary/30 bg-accent">
          <CardContent className="prose prose-sm max-w-none text-muted-foreground">
            <p>{oorsprong.placeholder}</p>
          </CardContent>
        </Card>
      </section>

      {/* Further Reading */}
      <section className="mb-16">
        {verderLezen.intro ? (
          <p className="mb-6 text-muted-foreground">{verderLezen.intro}</p>
        ) : null}
        <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-foreground">
          <BookOpen className="h-6 w-6 text-primary" />
          {verderLezen.title}
        </h2>
        <div className="space-y-4">
          {verderLezen.items.map((book) => (
            <Card key={book.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {book.url ? (
                    <Link
                      href={book.url}
                      className="text-foreground underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {book.title}
                    </Link>
                  ) : (
                    book.title
                  )}
                </CardTitle>
                {book.author !== "kanweg" ? (
                  <CardDescription>door {book.author}</CardDescription>
                ) : null}
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
