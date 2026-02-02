import Link from 'next/link';
import { Timer, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { homeCta } from '@/content/home';

export function CtaSection() {
  return (
    <section className="bg-primary pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          {homeCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
          {homeCta.description}
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            <Link href={homeCta.primary.href}>
              <Timer className="mr-2 h-5 w-5" />
              {homeCta.primary.label}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto bg-transparent"
          >
            <Link href={homeCta.secondary.href}>
              <BookOpen className="mr-2 h-5 w-5" />
              {homeCta.secondary.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
