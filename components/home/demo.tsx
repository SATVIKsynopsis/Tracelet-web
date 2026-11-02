import { Section } from './section';
import { Terminal } from './terminal';

export function Demo() {
  return (
    <Section labelledBy="demo-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Demo</p>
          <h2
            id="demo-title"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl"
          >
            Two commands to a passing suite.
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-mute">
            <code className="font-mono text-ink">otel-test init</code> writes a starter project: a Collector config
            that deletes passwords, hashes user names and drops health checks, with one test for each.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-mute">
            Break the config and the same suite tells you which item failed, at which exporter, and with what value.
          </p>
          <p className="mt-8 border-l border-line-strong pl-4 text-sm leading-relaxed text-dim">
            Output from the published v0.1.0 release. The first run also downloads the pinned Collector (about
            100 MB). Times depend on your machine and on each test&apos;s observation window.
          </p>
        </div>
        <div className="min-w-0 lg:col-span-8">
          <Terminal />
        </div>
      </div>
    </Section>
  );
}
