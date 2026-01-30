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

export const metadata: Metadata = {
  title: 'Achtergrond',
  description:
    'De wetenschappelijke achtergrond van Norwegian Singles: lactaatdynamiek, aerobe aanpassingen en trainingstheorie.',
};

const scienceTopics = [
  {
    icon: Beaker,
    title: 'Lactaatdynamiek',
    content: `Bij inspanning produceert je lichaam lactaat als bijproduct van anaerobe energieproductie. 
    Traditioneel werd lactaat gezien als "afvalstof", maar we weten nu dat het een belangrijke 
    energiebron is. Norwegian Singles trainen je lichaam om lactaat efficiënter te verwerken en 
    als brandstof te gebruiken.
    
    Door te trainen net onder je lactaatdrempel, verbeter je je vermogen om lactaat te klaren 
    terwijl je doorloopt. Het korte actieve herstel tussen de intervallen houdt de bloedsomloop 
    actief, wat de lactaatverwerking versnelt.`,
  },
  {
    icon: Brain,
    title: 'Centrale vermoeidheid',
    content: `Niet alle vermoeidheid is fysiek. Je zenuwstelsel speelt een grote rol in hoe lang en 
    hard je kunt presteren. Extreme intervallen (zoals 400m herhalingen) veroorzaken significante 
    centrale vermoeidheid, wat langer herstel vereist.
    
    Norwegian Singles zijn submaximaal ontworpen om deze centrale vermoeidheid te minimaliseren. 
    Je traint hard genoeg voor fysiologische aanpassingen, maar niet zo hard dat je zenuwstelsel 
    dagen nodig heeft om te herstellen.`,
  },
  {
    icon: TrendingUp,
    title: 'Trainingsvolume',
    content: `Een van de grootste voordelen van Norwegian Singles is het hoge trainingsvolume bij 
    gecontroleerde belasting. In één sessie kun je 25-30 minuten op tempo lopen, verspreid over 
    meerdere intervallen.
    
    Dit volume zou moeilijk haalbaar zijn met traditionele intervallen, waar de intensiteit zo 
    hoog is dat je minder herhalingen aankunt. Door slim met intensiteit om te gaan, kun je meer 
    totale werkbelasting opbouwen zonder overtraining.`,
  },
];

const adaptations = [
  {
    title: 'Mitochondriale dichtheid',
    description: 'Meer en efficiëntere energiefabriekjes in je spiercellen',
  },
  {
    title: 'Capillaire dichtheid',
    description: 'Betere bloedtoevoer naar werkende spieren',
  },
  {
    title: 'Lactaatdrempel',
    description: 'Hogere snelheid voordat lactaat zich ophoopt',
  },
  {
    title: 'VO2max',
    description: 'Verbeterde maximale zuurstofopname',
  },
  {
    title: 'Looeconomie',
    description: 'Minder energie nodig voor dezelfde snelheid',
  },
  {
    title: 'Mentale weerbaarheid',
    description: 'Beter kunnen omgaan met ongemak tijdens wedstrijden',
  },
];

const furtherReading = [
  {
    title: 'The Science of Running',
    author: 'Steve Magness',
    description: 'Diepgaande analyse van trainingsmethoden en fysiologie',
  },
  {
    title: 'Daniels Running Formula',
    author: 'Jack Daniels',
    description: 'Klassiek werk over trainingszones en periodisering',
  },
  {
    title: 'Training for the Uphill Athlete',
    author: 'House, Johnston & Jornet',
    description: 'Moderne trainingswetenschap toegepast op duursporten',
  },
];

export default function AchtergrondPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          De wetenschap achter Norwegian Singles
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Waarom werkt deze methode zo goed? Een duik in de fysiologie en 
          trainingswetenschap die Norwegian Singles tot een effectieve 
          trainingsmethode maken.
        </p>
      </div>

      {/* Origin Story */}
      <section className="mb-16">
        <Card className="border-primary/30 bg-accent">
          <CardHeader>
            <CardTitle className="text-xl">De Noorse oorsprong</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              De methode is gepopulariseerd door Noorse topatleten en hun coaches, 
              met name in langlaufen en hardlopen. Namen als Jakob Ingebrigtsen en 
              de Noorse langlaufploeg hebben de aandacht gevestigd op hun aanpak: 
              hoog volume, gecontroleerde intensiteit, en veel rust.
            </p>
            <p className="mt-4">
              Het principe is simpel maar krachtig: door onder de rode zone te 
              blijven kun je meer totale trainingsbelasting aan zonder het risico 
              op overtraining. De Noren combineren dit met een &quot;80/20&quot; aanpak 
              waarbij 80% van de training makkelijk is en slechts 20% intensief.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Science Topics */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          De fysiologie
        </h2>
        <div className="space-y-8">
          {scienceTopics.map((topic) => (
            <Card key={topic.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <topic.icon className="h-5 w-5 text-primary" />
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {topic.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Adaptations */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          Fysiologische aanpassingen
        </h2>
        <p className="mb-6 text-muted-foreground">
          Regelmatige Norwegian Singles training leidt tot de volgende aanpassingen:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {adaptations.map((adaptation) => (
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
          Intensiteitsverdeling
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Zone 1-2 (makkelijk)</span>
                  <span className="font-medium">75-80%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[77.5%] bg-chart-1" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Zone 3 (Norwegian Singles)</span>
                  <span className="font-medium">15-20%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[17.5%] bg-chart-3" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Zone 4-5 (hard/max)</span>
                  <span className="font-medium">3-5%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[4%] bg-chart-5" />
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              De klassieke &quot;80/20&quot; verdeling: het overgrote deel van je training 
              is makkelijk, met strategisch geplaatste intensievere sessies. Norwegian 
              Singles vallen in die middenzone - hard genoeg voor aanpassing, niet zo 
              hard dat ze je kapotmaken.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Further Reading */}
      <section className="mb-16">
        <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-foreground">
          <BookOpen className="h-6 w-6 text-primary" />
          Verder lezen
        </h2>
        <div className="space-y-4">
          {furtherReading.map((book) => (
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
          Van theorie naar praktijk
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Nu je de wetenschap kent, is het tijd om aan de slag te gaan.
        </p>
        <div className="mt-6">
          <Button asChild size="lg">
            <Link href="/calculator">
              Bereken je tempo&apos;s
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
