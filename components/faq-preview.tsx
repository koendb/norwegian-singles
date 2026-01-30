import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { homeFaqPreview } from '@/content/home';

export function FaqPreview() {
  return (
    <section className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {homeFaqPreview.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {homeFaqPreview.description}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="mt-12">
          {homeFaqPreview.items.map((faq, index) => (
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
            <Link href={homeFaqPreview.cta.href}>
              {homeFaqPreview.cta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
