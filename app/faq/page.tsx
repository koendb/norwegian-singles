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
import { faqCta, faqHeader, faqMeta, faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: faqMeta.title,
  description: faqMeta.description,
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {faqHeader.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {faqHeader.description}
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
          {faqCta.title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {faqCta.description}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="outline">
            <Link href={faqCta.buttons[0].href}>{faqCta.buttons[0].label}</Link>
          </Button>
          <Button asChild>
            <Link href={faqCta.buttons[1].href}>
              {faqCta.buttons[1].label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
