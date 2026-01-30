import { Heart, Zap, Shield, Target, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Heart,
    title: 'Lactaatdrempel verbeteren',
    description:
      'Train je lichaam om lactaat efficiënter te verwerken. Zo kun je langer een hoger tempo volhouden.',
  },
  {
    icon: Zap,
    title: 'Hoog volume, lage belasting',
    description:
      'Bouw meer trainingsvolume op zonder het risico op blessures. De korte herstelperiodes houden je fris.',
  },
  {
    icon: Shield,
    title: 'Blessurepreventie',
    description:
      'Door onder de rode zone te blijven, voorkom je overbelasting terwijl je toch effectief traint.',
  },
  {
    icon: Target,
    title: 'Gecontroleerde intensiteit',
    description:
      'Train op het juiste tempo met behulp van onze calculator. Geen giswerk, alleen resultaten.',
  },
  {
    icon: Clock,
    title: 'Tijdsefficiënt',
    description:
      'Een volledige Norwegian Singles sessie duurt 35-45 minuten inclusief warming-up en cooling-down.',
  },
  {
    icon: BarChart3,
    title: 'Meetbare vooruitgang',
    description:
      'Volg je ontwikkeling met steeds snellere 5K-tijden en verbeterde duurlooptempo\'s.',
  },
];

export function Features() {
  return (
    <section className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Waarom Norwegian Singles?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Een bewezen methode die door Noorse topatleten is geperfectioneerd 
            en nu beschikbaar is voor elke hardloper.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
