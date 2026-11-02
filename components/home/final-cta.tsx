import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GithubIcon } from '@/components/site/github-icon';
import { repo } from '@/lib/site';

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line">
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom,black_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
        <h2
          id="cta-title"
          className="max-w-4xl text-balance text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
        >
          Your next config change should come with a test<span className="text-ember">.</span>
        </h2>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/docs/first-test"
            className="inline-flex items-center gap-2 rounded-md bg-ember px-4 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ember-soft"
          >
            Write your first test
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href={repo.url}
            className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-mute hover:bg-white/[0.03]"
          >
            <GithubIcon className="size-4" />
            Star or fork on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
