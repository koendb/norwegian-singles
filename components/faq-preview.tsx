import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const previewFaqs = [
  {
    question: 'Wat is het verschil tussen Norwegian Singles en normale intervallen?',
    answer:
      'Bij traditionele intervallen loop je vaak tot aan je limiet met volledige rust ertussen. Norwegian Singles zijn submaximaal (rond 85% inspanning) met actief herstel door rustig joggen. Dit zorgt voor meer trainingsvolume met minder belasting.',
  },
  {
    question: 'Hoe vaak moet ik Norwegian Singles trainen?',
    answer:
      'Voor de meeste hardlopers is 1-2 keer per week ideaal. Combineer dit met makkelijke duurlopen en eventueel één snellere training. Meer is niet altijd beter; herstel is essentieel.',
  },
  {
    question: 'Kan ik Norwegian Singles doen als beginner?',
    answer:
      'Ja, maar bouw eerst een goede basisconditie op met regelmatige duurlopen. Als je comfortabel 30 minuten aan één stuk kunt lopen, kun je beginnen met kortere Norwegian Singles varianten.',
  },
];

export function FaqPreview() {
  return (
    <section className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Veelgestelde vragen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Snelle antwoorden op de meest gestelde vragen over Norwegian Singles.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="mt-12">
          {previewFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Link to full FAQ */}
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/faq">
              Bekijk alle vragen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
