import { Check } from 'lucide-react';

const rows = [
  { kind: 'inject', label: 'fixtures/login-span.json', start: 0, width: 16, tone: 'ink' },
  { kind: 'processor', label: 'filter/healthz', start: 14, width: 18, tone: 'mute' },
  { kind: 'processor', label: 'attributes/redact', start: 30, width: 22, tone: 'mute' },
  { kind: 'processor', label: 'batch', start: 50, width: 30, tone: 'mute' },
  { kind: 'exporter', label: 'otlp_http/backend', start: 78, width: 14, tone: 'ember' },
] as const;

const assertions = [
  'attribute password is absent',
  'attribute http.route equals "/login"',
  'exporter otlp_http/backend receives 1 item(s)',
];

export function TraceCard() {
  return (
    <figure className="relative overflow-hidden rounded-xl border border-line bg-raised/80 shadow-[0_40px_120px_-40px_rgb(245_158_59/0.25)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="font-mono text-xs text-mute">
          test <span className="text-ink">&ldquo;passwords are removed from spans&rdquo;</span>
        </p>
        <span className="font-mono text-[11px] text-dim">traces</span>
      </div>

      <div className="space-y-2.5 px-4 py-5">
        {rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 sm:grid-cols-[9.5rem_1fr]">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">{r.kind}</p>
              <p className="truncate font-mono text-xs text-ink">{r.label}</p>
            </div>
            <div className="relative h-5">
              <div className="absolute inset-y-[9px] left-0 right-0 border-t border-dashed border-line" />
              <div
                className={
                  'span-bar absolute inset-y-0.5 rounded-[3px] ' +
                  (r.tone === 'ember'
                    ? 'bg-ember'
                    : r.tone === 'ink'
                      ? 'bg-ink/80'
                      : 'bg-line-strong')
                }
                style={{
                  left: `${r.start}%`,
                  width: `${r.width}%`,
                  ['--delay' as string]: `${i * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <ul className="space-y-1.5 border-t border-line bg-sunken/60 px-4 py-4 font-mono text-xs">
        {assertions.map((a) => (
          <li key={a} className="flex items-start gap-2 text-mute">
            <Check className="mt-0.5 size-3.5 shrink-0 text-ok" aria-hidden="true" />
            <span>{a}</span>
          </li>
        ))}
      </ul>
      <figcaption className="sr-only">
        Illustration of one test: a span fixture is injected, passes through the filter, attributes and batch
        processors of the starter configuration, is captured at the otlp_http/backend exporter, and three assertions
        pass.
      </figcaption>
    </figure>
  );
}
