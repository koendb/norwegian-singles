import Link from 'next/link';
import { ArrowRight, Timer, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { homeHero } from '@/content/home';

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
            <span>{homeHero.badgeText}</span>
          </div>

          {/* Headline */}
          <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {homeHero.titlePrefix}{' '}
            <span className="text-primary">{homeHero.titleHighlight}</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {homeHero.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={homeHero.primaryCta.href}>
                <Timer className="mr-2 h-5 w-5" />
                {homeHero.primaryCta.label}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              <Link href={homeHero.secondaryCta.href}>
                {homeHero.secondaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-10">
            {homeHero.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
