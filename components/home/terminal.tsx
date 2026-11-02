'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'cmd' | 'bold' | 'ok' | 'bad' | 'dim' | 'plain' | 'err';
type Line = [Tone, string];

const passing: Line[] = [
  ['cmd', 'otel-test init'],
  ['bold', 'otel-test v0.1.0'],
  ['plain', ''],
  ['dim', '  created ./otel-test.yaml'],
  ['dim', '  created ./collector.yaml'],
  ['dim', '  created ./fixtures/login-span.json'],
  ['dim', '  created ./fixtures/login-log.json'],
  ['dim', '  created ./fixtures/healthz-span.json'],
  ['plain', ''],
  ['cmd', 'otel-test test'],
  ['bold', 'otel-test v0.1.0'],
  ['plain', ''],
  ['plain', 'Collector: v0.164.0'],
  ['plain', 'Config:    collector.yaml'],
  ['plain', 'Tests:     3'],
  ['plain', ''],
  ['ok', '✓ passwords are removed from spans'],
  ['ok', '✓ passwords are removed from logs'],
  ['ok', '✓ health checks are dropped'],
  ['plain', ''],
  ['plain', '3 passed, 0 failed'],
  ['plain', ''],
  ['plain', 'Time: 8.50s'],
];

const failing: Line[] = [
  ['cmd', 'otel-test test'],
  ['bold', 'otel-test v0.1.0'],
  ['plain', ''],
  ['plain', 'Collector: v0.164.0'],
  ['plain', 'Config:    collector.yaml'],
  ['plain', 'Tests:     3'],
  ['plain', ''],
  ['bad', '✗ passwords are removed from spans'],
  ['plain', ''],
  ['bad', '    ✗ attribute password is absent'],
  ['plain', '      Expected: password absent from every span'],
  ['plain', '      Actual:   1 of 1 spans failed'],
  ['dim', '                  span "POST /login" at otlp_http/backend: password = "hunter2" (item)'],
  ['plain', ''],
  ['bad', '✗ passwords are removed from logs'],
  ['plain', ''],
  ['bad', '    ✗ attribute password is absent'],
  ['plain', '      Expected: password absent from every log record'],
  ['plain', '      Actual:   1 of 1 log records failed'],
  ['dim', '                  log record "login attempt" at otlp_http/backend: password = "hunter2" (item)'],
  ['plain', ''],
  ['ok', '✓ health checks are dropped'],
  ['plain', ''],
  ['plain', '1 passed, 2 failed'],
  ['plain', ''],
  ['plain', 'Time: 9.27s'],
  ['err', 'error: 2 test(s) failed'],
];

const tabs = [
  {
    key: 'pass',
    label: 'Starter project',
    caption: 'otel-test init, then otel-test test on the generated project.',
    lines: passing,
  },
  {
    key: 'fail',
    label: 'Regression caught',
    caption: 'The same project after deleting the password rule from attributes/redact. Exit code 1.',
    lines: failing,
  },
] as const;

const toneClass: Record<Tone, string> = {
  cmd: 'text-ink',
  bold: 'font-semibold text-ink',
  ok: 'text-ok',
  bad: 'text-bad',
  dim: 'text-dim',
  plain: 'text-mute',
  err: 'text-bad',
};

export function Terminal() {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  const tab = tabs[active];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-sunken">
      <div className="flex items-center gap-4 border-b border-line bg-raised/70 px-4">
        <div className="flex gap-1.5 py-3.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <div role="tablist" aria-label="Terminal examples" className="flex gap-1" onKeyDown={onKeyDown}>
          {tabs.map((t, i) => (
            <button
              key={t.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${t.key}`}
              aria-selected={i === active}
              aria-controls={`${base}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'relative px-3 py-3.5 font-mono text-xs transition-colors',
                i === active ? 'text-ink' : 'text-dim hover:text-mute',
              )}
            >
              {t.label}
              {i === active ? <span className="absolute inset-x-3 -bottom-px h-px bg-ember" aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${tab.key}`}
        tabIndex={0}
        className="overflow-x-auto px-5 py-5"
      >
        <pre className="min-h-[34rem] font-mono text-[12.5px] leading-[1.65]">
          {tab.lines.map(([tone, text], i) => (
            <div key={i} className={toneClass[tone]}>
              {tone === 'cmd' ? (
                <>
                  <span className="select-none text-ember">$ </span>
                  {text}
                </>
              ) : (
                text || ' '
              )}
            </div>
          ))}
          <div aria-hidden="true">
            <span className="select-none text-ember">$ </span>
            <span className="caret inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] bg-ink/70" />
          </div>
        </pre>
      </div>
      <p className="border-t border-line px-5 py-3 text-xs text-dim">{tab.caption}</p>
    </div>
  );
}
