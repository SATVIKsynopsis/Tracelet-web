import { Demo } from '@/components/home/demo';
import { Features } from '@/components/home/features';
import { FinalCta } from '@/components/home/final-cta';
import { Hero } from '@/components/home/hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { Install } from '@/components/home/install';
import { Scope } from '@/components/home/scope';
import { UseCases } from '@/components/home/use-cases';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Demo />
      <Features />
      <HowItWorks />
      <UseCases />
      <Scope />
      <Install />
      <FinalCta />
    </>
  );
}
