import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { FaqPreview } from '@/components/faq-preview';
import { CtaSection } from '@/components/cta-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <FaqPreview />
      <CtaSection />
    </>
  );
}
