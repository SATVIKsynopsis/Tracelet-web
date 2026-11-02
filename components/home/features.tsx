import Link from 'next/link';
import {
  ArrowRight,
  Binary,
  Layers,
  Braces,
  FileBraces,
  GitCompareArrows,
  ListChecks,
  ScanSearch,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Section, SectionHeading } from './section';

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  detail: string;
}

const features: Feature[] = [
  {
    icon: Workflow,
    title: 'Real Collector execution',
    body: 'Your processors, connectors and pipeline order run unchanged in the real otelcol-contrib binary. Nothing is simulated.',
    detail: 'pinned v0.164.0 · SHA-256 verified',
  },
  {
    icon: FileBraces,
    title: 'Custom telemetry fixtures',
    body: 'Fixtures are standard OTLP/JSON request bodies for traces, logs or metrics, posted byte for byte to the Collector’s own receiver.',
    detail: 'resourceSpans · resourceLogs · resourceMetrics',
  },
  {
    icon: ListChecks,
    title: 'Declarative assertions',
    body: 'Check that attributes are present, absent, equal to a typed value or match a regex, that telemetry was dropped, or how many items reached an exporter.',
    detail: 'present · absent · equals · matches · dropped · count',
  },
  {
    icon: ScanSearch,
    title: 'Pipeline configuration analysis',
    body: 'Specs, configs and fixtures are checked before anything runs. Every problem is reported at once with its location, and the rewritten config must pass otelcol validate.',
    detail: 'otel-test validate',
  },
  {
    icon: GitCompareArrows,
    title: 'Regression testing',
    body: 'Each test runs in a fresh Collector. Attribute checks fail when nothing arrived, so a redaction test cannot pass because the data never came.',
    detail: '17 deliberate regressions caught in the examples',
  },
  {
    icon: Braces,
    title: 'CI-friendly CLI',
    body: 'Distinct exit codes for failed assertions, invalid specs, invalid configs, Collector problems and execution errors. Color and downloads are controllable.',
    detail: '--offline · --filter · NO_COLOR · exit 0–5',
  },
  {
    icon: Binary,
    title: 'Rust-powered',
    body: 'One self-contained binary with a built-in OTLP/HTTP and OTLP/gRPC capture server. Release builds for macOS, Linux and Windows.',
    detail: 'otel-test · ~5 MB archive',
  },
];

export function Features() {
  return (
    <Section id="features" labelledBy="features-title">
      <SectionHeading id="features-title" eyebrow="Features" title="Policy you can run in CI.">
        Collector configs decide what is redacted, sampled, dropped and routed. Tracelet turns those decisions into
        tests that fail loudly when a config change breaks them.
      </SectionHeading>

      <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <li
            key={f.title}
            className="group relative border-b border-r border-line p-7 transition-colors hover:bg-raised/60 md:p-8"
          >
            <div className="flex items-center justify-between">
              <f.icon className="size-5 text-ember" strokeWidth={1.6} aria-hidden="true" />
              <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-8 text-lg font-medium tracking-tight text-ink">{f.title}</h3>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-mute">{f.body}</p>
            <p className="mt-6 font-mono text-[11px] text-dim">{f.detail}</p>
          </li>
        ))}
        <li className="border-b border-r border-line p-7 transition-colors hover:bg-raised/60 md:p-8">
          <div className="flex items-center justify-between">
            <Layers className="size-5 text-ember" strokeWidth={1.6} aria-hidden="true" />
            <span className="font-mono text-xs text-dim">08</span>
          </div>
          <h3 className="mt-8 text-lg font-medium tracking-tight text-ink">Traces, logs and metrics</h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-mute">
            All three signals are tested end to end through the real Collector, including routing between them with
            connectors. Profiles pipelines are rejected.
          </p>
          <p className="mt-6 font-mono text-[11px] text-dim">spans · log records · data points</p>
        </li>
        <li className="hidden border-b border-r border-line lg:block">
          <Link
            href="/docs"
            className="group flex h-full flex-col justify-between p-8 transition-colors hover:bg-raised/60"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Documentation</span>
            <span>
              <span className="block text-2xl font-medium leading-tight tracking-tight text-ink">
                Read how every assertion works.
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-mute group-hover:text-ink">
                Open the docs
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
