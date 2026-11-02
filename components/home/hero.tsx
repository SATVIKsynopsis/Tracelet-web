import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GithubIcon } from '@/components/site/github-icon';
import { InstallCommand } from '@/components/site/install-command';
import { repo, site } from '@/lib/site';
import { TraceCard } from './trace-card';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8 md:pb-32 md:pt-24">
        <a
          href={repo.release}
          className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-raised/60 py-1 pl-1.5 pr-3 text-xs text-mute transition-colors hover:border-line-strong hover:text-ink"
        >
          <span className="rounded-full bg-ember/15 px-2 py-0.5 font-mono font-medium text-ember">{site.version}</span>
          <span>First release, pinned to otelcol-contrib {site.collectorVersion}</span>
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>

        <h1
          id="hero-title"
          className="mt-8 max-w-5xl text-balance text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-ink"
        >
          Test your telemetry pipelines<span className="text-ember">.</span>
        </h1>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-6">
            <p className="text-pretty text-xl leading-snug text-ink sm:text-2xl">
              Catch broken OpenTelemetry Collector configurations before they reach production.
            </p>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-mute">
              Tracelet runs the real <code className="font-mono text-[0.9em] text-ink">otelcol-contrib</code> binary
              with your processors and connectors, injects OTLP fixtures you write, captures what each exporter would
              have sent, and checks it against declarative assertions in YAML.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/quick-start"
                className="inline-flex items-center gap-2 rounded-md bg-ember px-4 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ember-soft"
              >
                Get started
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={repo.url}
                className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-mute hover:bg-white/[0.03]"
              >
                <GithubIcon className="size-4" />
                View on GitHub
              </a>
            </div>

            <div className="mt-10 max-w-xl">
              <p className="mb-2.5 text-xs text-dim">macOS and Linux</p>
              <InstallCommand />
              <p className="mt-3 text-xs leading-relaxed text-dim">
                Installs <code className="font-mono text-mute">{site.binary}</code> to{' '}
                <code className="font-mono text-mute">~/.local/bin</code>. On Windows,{' '}
                <Link href="/docs/installation#windows" className="text-mute underline decoration-line-strong underline-offset-4 hover:text-ink">
                  download the .zip
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-6 lg:pl-4">
            <TraceCard />
          </div>
        </div>
      </div>
    </section>
  );
}
