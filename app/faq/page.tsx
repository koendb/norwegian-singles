import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Veelgestelde vragen over Norwegian Singles: frequentie, tempo, herstel en meer.',
};

const faqs = [
  {
    question: 'Wat is het verschil tussen Norwegian Singles en normale intervallen?',
    answer:
      'Bij traditionele intervallen loop je vaak tot aan je limiet (95-100% inspanning) met volledige rust ertussen. Norwegian Singles zijn submaximaal (rond 85% inspanning) met actief herstel door rustig joggen. Dit zorgt voor meer trainingsvolume met minder belasting op je lichaam en zenuwstelsel.',
  },
  {
    question: 'Hoe vaak moet ik Norwegian Singles trainen?',
    answer:
      'Voor de meeste hardlopers is 1-2 keer per week ideaal. Combineer dit met makkelijke duurlopen en eventueel één snellere training (tempo of korte intervallen). Meer is niet altijd beter; je lichaam heeft tijd nodig om te herstellen en aan te passen.',
  },
  {
    question: 'Kan ik Norwegian Singles doen als beginner?',
    answer:
      'Ja, maar bouw eerst een goede basisconditie op met regelmatige duurlopen. Als je comfortabel 30-40 minuten aan één stuk kunt lopen, kun je beginnen met kortere Norwegian Singles varianten (bijvoorbeeld 4x4 minuten in plaats van 5x6 minuten). Verhoog geleidelijk.',
  },
  {
    question: 'Hoe weet ik of ik het juiste tempo loop?',
    answer:
      'Het juiste tempo voelt "comfortabel hard" - je kunt nog praten in korte zinnen, maar een gesprek voeren is moeilijk. Na elke interval moet je het gevoel hebben dat je er nog 1-2 zou kunnen doen. Als je na de sessie volledig uitgeput bent, was het te hard.',
  },
  {
    question: 'Moet ik een hartslagmeter gebruiken?',
    answer:
      'Een hartslagmeter kan nuttig zijn, maar is niet noodzakelijk. Norwegian Singles vallen typisch in de 70-80% van je maximale hartslag zone. Echter, hartslag kan variëren door warmte, stress, slaap en andere factoren. Leren luisteren naar je lichaam (Rate of Perceived Exertion) is minstens zo waardevol.',
  },
  {
    question: 'Wat als ik geen recente 5K-tijd heb?',
    answer:
      'Je kunt een schatting maken op basis van andere tijden: trek ongeveer 2-3 minuten af van je 10K-tijd, of voeg 5-6 minuten toe aan je beste 3K-tijd. Je kunt ook een tijdrit doen: loop na een goede warming-up 5 kilometer zo hard als je kunt volhouden.',
  },
  {
    question: 'Kan ik Norwegian Singles op de loopband doen?',
    answer:
      'Ja, de loopband is zelfs ideaal voor Norwegian Singles omdat je het tempo exact kunt instellen. Zet de band op 1-2% helling om het verschil met buiten lopen te compenseren. Het nadeel is dat het mentaal uitdagender kan zijn.',
  },
  {
    question: 'Hoe combineer ik Norwegian Singles met wedstrijdvoorbereiding?',
    answer:
      'Norwegian Singles zijn uitstekend voor de basisperiode en vroege wedstrijdvoorbereiding. Dichter bij je doel wedstrijd kun je ze vervangen door meer specifieke workouts (wedstrijdtempo, snellere intervallen). In de laatste 2 weken voor een belangrijke wedstrijd is het beter om de intensiteit te verminderen.',
  },
  {
    question: 'Wat als ik de intervallen niet volhoud?',
    answer:
      'Als je de laatste intervallen niet meer op tempo kunt lopen, zijn er drie mogelijkheden: (1) je begon te snel - start conservatiever, (2) je conditie is nog niet klaar voor dit volume - begin met kortere/minder intervallen, of (3) je bent niet voldoende hersteld van eerdere training - neem meer rustdagen.',
  },
  {
    question: 'Zijn Norwegian Singles geschikt voor elke afstand?',
    answer:
      'Norwegian Singles zijn het meest effectief voor afstanden van 5K tot marathon. Voor kortere wedstrijden (800m-1500m) heb je meer snelheidswerk nodig. Voor ultralopers kunnen de principes worden aangepast met langere, nog minder intense intervallen.',
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Veelgestelde vragen
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Antwoorden op de meest gestelde vragen over Norwegian Singles.
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Still have questions */}
      <section className="mt-16 rounded-xl bg-secondary/50 p-8 text-center">
        <h2 className="text-xl font-bold text-foreground">
          Vraag niet beantwoord?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Bekijk de uitleg of achtergrondpagina voor meer gedetailleerde informatie 
          over de methode.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="outline">
            <Link href="/uitleg">
              Bekijk uitleg
            </Link>
          </Button>
          <Button asChild>
            <Link href="/calculator">
              Start calculator
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
