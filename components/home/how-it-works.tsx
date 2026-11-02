import { Section, SectionHeading } from './section';

const steps = [
  ['Analyze', 'Parse otel-test.yaml, the Collector config and every fixture. Report every problem at once, with its location.'],
  ['Rewrite', 'Replace each receiver with a local OTLP/HTTP endpoint and each exporter with a capture exporter that keeps its ID.'],
  ['Validate', 'Run otelcol validate on the rewritten config before anything starts.'],
  ['Run', 'Start a fresh Collector for each test and wait until it reports ready.'],
  ['Inject', 'POST the fixture to the chosen receiver. The Collector must accept it.'],
  ['Capture', 'Record what reaches each exporter during the observation window and the graceful shutdown.'],
  ['Report', 'Evaluate assertions and print expected vs. actual for every failure.'],
] as const;

function Arrow() {
  return (
    <div className="flex items-center justify-center py-2 lg:px-1 lg:py-0" aria-hidden="true">
      <svg viewBox="0 0 40 12" className="hidden h-3 w-10 text-line-strong lg:block">
        <path d="M0 6h36M31 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      <svg viewBox="0 0 12 28" className="h-7 w-3 text-line-strong lg:hidden">
        <path d="M6 0v24M1 19l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </div>
  );
}

function Node({
  label,
  title,
  children,
  accent = false,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        'flex flex-col rounded-lg border p-4 ' +
        (accent ? 'border-ember/40 bg-ember/[0.04]' : 'border-line bg-raised/70')
      }
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">{label}</p>
      <p className={'mt-1 text-sm font-medium ' + (accent ? 'text-ember' : 'text-ink')}>{title}</p>
      <div className="mt-3 flex-1 space-y-1.5 font-mono text-[11.5px] leading-snug text-mute">{children}</div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title">
      <SectionHeading id="how-title" eyebrow="How it works" title="Only the edges change.">
        Receivers and exporters are swapped for local endpoints. Processors, connectors, pipeline IDs and processor
        order are copied verbatim, so the code in the middle is exactly what runs in production.
      </SectionHeading>

      <figure>
        <div className="grid items-stretch lg:grid-cols-[1fr_auto_0.9fr_auto_1.5fr_auto_1fr_auto_0.9fr]">
          <Node label="Inputs" title="Your project">
            <p>collector.yaml</p>
            <p>fixtures/*.json</p>
            <p>otel-test.yaml</p>
          </Node>
          <Arrow />
          <Node label="Tracelet" title="otel-test" accent>
            <p>analyze</p>
            <p>rewrite</p>
            <p>validate</p>
          </Node>
          <Arrow />
          <div className="rounded-lg border border-line bg-raised/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">Real process</p>
            <p className="mt-1 text-sm font-medium text-ink">otelcol-contrib</p>
            <div className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 font-mono text-[11px]">
              <span className="rounded border border-dashed border-line-strong px-1.5 py-1 text-dim">receiver</span>
              <span className="rounded border border-ember/40 bg-ember/[0.06] px-2 py-1 text-center text-ink">
                processors · connectors
              </span>
              <span className="rounded border border-dashed border-line-strong px-1.5 py-1 text-dim">exporter</span>
            </div>
            <p className="mt-3 font-mono text-[11px] leading-snug text-mute">
              dashed: replaced
              <br />
              solid: copied verbatim
            </p>
          </div>
          <Arrow />
          <Node label="Capture" title="Exporter boundary">
            <p>otlp_http/backend</p>
            <p>datadog</p>
            <p>kafka/shared</p>
          </Node>
          <Arrow />
          <Node label="Results" title="Assertions">
            <p className="text-ok">✓ passed</p>
            <p className="text-bad">✗ failed</p>
            <p>exit code</p>
          </Node>
        </div>
        <figcaption className="mt-5 text-xs text-dim">
          Captured telemetry is reported under your original exporter IDs.
        </figcaption>
      </figure>

      <ol className="mt-20 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([title, body], i) => (
          <li key={title} className="border-t border-line pt-5">
            <p className="font-mono text-xs text-ember">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 font-medium text-ink">{title}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-mute">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
