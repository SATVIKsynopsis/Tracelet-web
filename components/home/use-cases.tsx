import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { exampleSource, examples } from '@/lib/examples';
import { Section, SectionHeading } from './section';

export function UseCases() {
  return (
    <Section id="examples" labelledBy="examples-title">
      <SectionHeading id="examples-title" eyebrow="Use cases" title="Five production-style configs, tested.">
        Each example in the repository ships a realistic Collector config, its fixtures and tests, and a set of
        deliberate regressions that the suite must catch. They run against the pinned Collector with no mocks.
      </SectionHeading>

      <ul className="border-t border-line">
        {examples.map((e, i) => (
          <li key={e.slug} className="group border-b border-line">
            <div className="grid gap-6 py-9 transition-colors md:grid-cols-12 md:gap-8">
              <p className="font-mono text-xs text-dim md:col-span-1 md:pt-2">{String(i + 1).padStart(2, '0')}</p>
              <div className="md:col-span-6">
                <h3 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  <Link href={`/docs/examples/${e.slug}`} className="hover:text-ember">
                    {e.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-mute">{e.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Components">
                  {e.components.map((c) => (
                    <li key={c} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-mute">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between gap-6 md:col-span-5">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs text-dim">Tests</dt>
                    <dd className="mt-1 font-mono text-2xl text-ink">{e.tests}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-dim">Regressions caught</dt>
                    <dd className="mt-1 font-mono text-2xl text-ink">{e.regressions}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs text-dim">For example</dt>
                    <dd className="mt-1 text-sm text-mute">{e.catches}</dd>
                  </div>
                </dl>
                <div className="flex gap-5 text-sm">
                  <Link href={`/docs/examples/${e.slug}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ember">
                    Read the walkthrough
                  </Link>
                  <a href={exampleSource(e)} className="inline-flex items-center gap-1 text-mute hover:text-ink">
                    Source
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
