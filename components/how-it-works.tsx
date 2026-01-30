import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { homeHowItWorks } from '@/content/home';

export function HowItWorks() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {homeHowItWorks.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {homeHowItWorks.description}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {homeHowItWorks.steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on last item and mobile) */}
              {index < homeHowItWorks.steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
              )}
              
              <div className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                
                {/* Content */}
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href={homeHowItWorks.cta.href}>
              {homeHowItWorks.cta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
