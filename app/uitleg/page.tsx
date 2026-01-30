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

export const metadata: Metadata = {
  title: 'Uitleg',
  description:
    'Leer wat Norwegian Singles zijn, hoe je ze uitvoert, en voor wie deze trainingsmethode geschikt is.',
};

const keyPrinciples = [
  {
    icon: Target,
    title: 'Submaximale intensiteit',
    description:
      'Je loopt op ongeveer 85% van je maximale inspanning. Hard genoeg om effect te hebben, maar niet zo hard dat je volledig uitgeput raakt.',
  },
  {
    icon: Clock,
    title: 'Langere intervallen',
    description:
      'Intervallen van 5-8 minuten in plaats van de traditionele korte sprints. Dit traint je lichaam om lactaat efficiënt te verwerken.',
  },
  {
    icon: Gauge,
    title: 'Actief herstel',
    description:
      'Tussen de intervallen jog je rustig door (60-90 seconden). Dit houdt je bloedsomloop actief en versnelt het herstel.',
  },
];

const rulesChecklist = [
  'Loop de intervallen op een tempo dat je als "comfortabel hard" ervaart',
  'Je moet na elke interval nog 1-2 kunnen herhalen',
  'Het herstel is ECHT rustig - langzamer dan je denkt',
  'Gebruik een stopwatch of GPS, geen afstand',
  'Begin met kortere intervallen en bouw op',
  'Doe niet meer dan 1-2 Norwegian Singles per week',
  'Combineer met makkelijke duurlopen op andere dagen',
  'Luister naar je lichaam en pas aan indien nodig',
];

const suitableFor = [
  'Hardlopers met een goede basisconditie (30+ min aan één stuk)',
  'Marathonlopers die hun tempo willen verbeteren',
  'Lopers die blessures willen voorkomen',
  'Atleten die meer volume willen toevoegen',
  'Mensen die van gestructureerde training houden',
];

const notSuitableFor = [
  'Complete beginners (bouw eerst basis op)',
  'Lopers met acute blessures',
  'Tijdens een verkoudheid of ziekte',
  'Direct voor of na een wedstrijd',
  'Als vervanging voor ALLE andere training',
];

export default function UitlegPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Wat zijn Norwegian Singles?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Norwegian Singles zijn een intervaltrainingsmethode die populair is 
          geworden door Noorse topatleten. De methode combineert hoog volume met 
          gecontroleerde intensiteit voor maximale aanpassing met minimaal risico.
        </p>
      </div>

      {/* Key Principles */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          De drie pijlers
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {keyPrinciples.map((principle) => (
            <Card key={principle.title}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <principle.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {principle.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Example Session */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Voorbeeld sessie
        </h2>
        <Card className="border-primary/30 bg-accent">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg bg-background p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium">Warming-up</p>
                  <p className="text-sm text-muted-foreground">
                    10-15 minuten makkelijk joggen + dynamisch rekken
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 rounded-lg bg-primary p-4 text-primary-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 text-sm font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium">Hoofdtraining</p>
                  <p className="text-sm text-primary-foreground/80">
                    5× (6 min op tempo + 1 min makkelijk joggen)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 rounded-lg bg-background p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium">Cooling-down</p>
                  <p className="text-sm text-muted-foreground">
                    10-15 minuten uitlopen + stretchen
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">35</p>
                <p className="text-xs text-muted-foreground">min hoofdtraining</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">55-65</p>
                <p className="text-xs text-muted-foreground">min totaal</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">30</p>
                <p className="text-xs text-muted-foreground">min op tempo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Rules Checklist */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          De regels
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {rulesChecklist.map((rule, index) => (
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
          Voor wie?
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Suitable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Geschikt voor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {suitableFor.map((item, index) => (
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
                Niet geschikt voor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {notSuitableFor.map((item, index) => (
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

      {/* CTA */}
      <section className="rounded-xl bg-secondary/50 p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Klaar om te beginnen?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Bereken je persoonlijke tempo&apos;s op basis van je 5K-tijd.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/calculator">
              Naar de calculator
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/achtergrond">
              Lees de wetenschap
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
