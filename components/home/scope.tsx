import Link from 'next/link';
import { Section } from './section';

const tested = [
  'Processors and connectors, in your pipeline order',
  'Routing between pipelines, including connectors',
  'Which exporter receives what, and how many items',
  'Attributes at item, scope and resource level',
  'Telemetry that is dropped, filtered or sampled away',
];

const notTested = [
  'Receiver behavior: filelog operators, Prometheus scraping',
  'Exporter behavior, backends and their authentication',
  'Span names and status, log bodies and severity, metric names and values',
  'Routing on request headers or client metadata',
  'Stateful processors that need a series of points over time',
];

export function Scope() {
  return (
    <Section labelledBy="scope-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Scope</p>
          <h2
            id="scope-title"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl"
          >
            What runs, and what doesn&apos;t.
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-mute">
            Tracelet tests what happens between your receivers and exporters. It is not an end-to-end test of your
            observability backends.
          </p>
          <Link
            href="/docs/advanced/limitations"
            className="mt-6 inline-block text-sm text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ember"
          >
            All known limitations
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 md:col-span-8">
          <div className="bg-canvas p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ok">Tested</h3>
            <ul className="mt-5 space-y-3">
              {tested.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-ok" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-canvas p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-dim">Not tested</h3>
            <ul className="mt-5 space-y-3">
              {notTested.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-mute">
                  <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-dim" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
