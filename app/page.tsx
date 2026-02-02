import { Hero } from '@/components/hero';
import { WhatIs } from '@/components/what-is';
import { Features } from '@/components/features';
import { ForWho } from '@/components/for-who';
import { HowItWorks } from '@/components/how-it-works';
import { CtaSection } from '@/components/cta-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIs />
      <ForWho />
      <Features />
      <HowItWorks />
      <CtaSection />
    </>
  );
}
