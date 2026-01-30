import Link from 'next/link';
import { Timer, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Klaar om te beginnen?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
          Bereken je persoonlijke tempo&apos;s of lees meer over de methode. 
          Binnen enkele minuten kun je aan de slag met je eerste Norwegian Singles workout.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            <Link href="/calculator">
              <Timer className="mr-2 h-5 w-5" />
              Open Calculator
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto bg-transparent"
          >
            <Link href="/uitleg">
              <BookOpen className="mr-2 h-5 w-5" />
              Lees de Uitleg
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
