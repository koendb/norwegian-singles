import Link from 'next/link';
import { ArrowRight, Timer, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(252,82,0,0.08),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>De trainingsmethode van Noorse topatleten</span>
          </div>

          {/* Headline */}
          <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Train slimmer met{' '}
            <span className="text-primary">Norwegian Singles</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Verbeter je uithoudingsvermogen met gecontroleerde intervallen. 
            Bereken je persoonlijke tempo&apos;s en start vandaag nog met deze 
            bewezen trainingsmethode.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/calculator">
                <Timer className="mr-2 h-5 w-5" />
                Bereken je tempo
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              <Link href="/uitleg">
                Leer de methode
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-10">
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl">5-8</p>
              <p className="mt-1 text-sm text-muted-foreground">Minuten per interval</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl">70-80%</p>
              <p className="mt-1 text-sm text-muted-foreground">Van max hartslag</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl">25+</p>
              <p className="mt-1 text-sm text-muted-foreground">Min totale training</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
