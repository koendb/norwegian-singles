import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Bepaal je 5K-tijd',
    description:
      'Gebruik je recente 5K-wedstrijdtijd of doe een tijdrit. Dit is de basis voor al je berekeningen.',
  },
  {
    number: '02',
    title: 'Bereken je zones',
    description:
      'Onze calculator bepaalt je Norwegian Single tempo en hersteltempo op basis van je 5K-tijd.',
  },
  {
    number: '03',
    title: 'Voer de workout uit',
    description:
      'Loop 5-6 intervallen van 5-8 minuten op je Single tempo, met 1 minuut rustig joggen ertussen.',
  },
  {
    number: '04',
    title: 'Herhaal & verbeter',
    description:
      'Train 1-2x per week met Norwegian Singles. Na enkele weken zul je verbetering merken.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hoe werkt het?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            In vier eenvoudige stappen naar effectievere trainingen.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
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
            <Link href="/calculator">
              Start nu met de calculator
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
