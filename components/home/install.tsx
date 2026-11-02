'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { CopyButton } from '@/components/site/copy-button';
import { InstallCommand } from '@/components/site/install-command';
import { cn } from '@/lib/cn';
import { repo, site } from '@/lib/site';

const windowsScript = `Invoke-WebRequest -OutFile otel-test.zip \`
  https://github.com/SATVIKsynopsis/Tracelet/releases/download/v0.1.0/otel-test-x86_64-pc-windows-msvc.zip
Expand-Archive otel-test.zip -DestinationPath .
.\\otel-test-x86_64-pc-windows-msvc\\otel-test.exe --version`;

const platforms = [
  {
    key: 'macos',
    label: 'macOS',
    targets: ['aarch64-apple-darwin (Apple Silicon)', 'x86_64-apple-darwin (Intel)'],
  },
  {
    key: 'linux',
    label: 'Linux',
    targets: ['x86_64-unknown-linux-gnu', 'aarch64-unknown-linux-gnu'],
  },
  {
    key: 'windows',
    label: 'Windows',
    targets: ['x86_64-pc-windows-msvc'],
  },
] as const;

export function Install() {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = platforms[active];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : -1) + platforms.length) % platforms.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <section id="install" aria-labelledby="install-title" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Install</p>
            <h2
              id="install-title"
              className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl"
            >
              One binary. One command.
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-mute">
              The installer detects your OS and architecture, downloads the matching release archive, checks its
              SHA-256 and copies <code className="font-mono text-ink">{site.binary}</code> to{' '}
              <code className="font-mono text-ink">~/.local/bin</code>.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-mute">
              On first use, <code className="font-mono text-ink">{site.binary}</code> downloads otelcol-contrib{' '}
              {site.collectorVersion} for your platform (about 100 MB), verifies it against a checksum compiled into
              the binary, and caches it.
            </p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm">
              <Link href="/docs/installation" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ember">
                Installation guide
              </Link>
              <a href={repo.releases} className="inline-flex items-center gap-1 text-mute hover:text-ink">
                GitHub Releases
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="min-w-0 md:col-span-7">
            <div className="overflow-hidden rounded-xl border border-line bg-raised/60">
              <div role="tablist" aria-label="Platform" className="flex border-b border-line" onKeyDown={onKeyDown}>
                {platforms.map((pl, i) => (
                  <button
                    key={pl.key}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`${base}-${pl.key}`}
                    aria-selected={i === active}
                    aria-controls={`${base}-panel`}
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      'relative flex-1 px-4 py-3.5 text-sm transition-colors',
                      i === active ? 'text-ink' : 'text-dim hover:text-mute',
                    )}
                  >
                    {pl.label}
                    {i === active ? <span className="absolute inset-x-0 -bottom-px h-px bg-ember" aria-hidden="true" /> : null}
                  </button>
                ))}
              </div>
              <div
                role="tabpanel"
                id={`${base}-panel`}
                aria-labelledby={`${base}-${p.key}`}
                className="space-y-6 p-6"
              >
                {p.key === 'windows' ? (
                  <>
                    <p className="text-sm leading-relaxed text-mute">
                      The shell installer does not support Windows. Download the .zip from the release and put{' '}
                      <code className="font-mono text-ink">otel-test.exe</code> on your PATH. In PowerShell:
                    </p>
                    <div className="relative rounded-lg border border-line bg-sunken">
                      <pre className="overflow-x-auto p-4 pr-12 font-mono text-[12.5px] leading-relaxed text-ink">
                        {windowsScript}
                      </pre>
                      <CopyButton value={windowsScript} label="Copy PowerShell commands" className="absolute right-2 top-2" />
                    </div>
                    <p className="text-xs leading-relaxed text-dim">
                      Windows has no graceful stop signal for the Collector, so it is killed at the end of each test
                      and telemetry still buffered in <code className="font-mono">batch</code> or{' '}
                      <code className="font-mono">tail_sampling</code> is not flushed. Treat Windows support as early.
                    </p>
                  </>
                ) : (
                  <>
                    <InstallCommand />
                    <p className="text-xs leading-relaxed text-dim">
                      Set <code className="font-mono text-mute">OTEL_TEST_INSTALL_DIR</code> to install elsewhere, or{' '}
                      <code className="font-mono text-mute">OTEL_TEST_VERSION=v0.1.0</code> to pin a release. Needs
                      curl or wget, and sha256sum or shasum.
                    </p>
                  </>
                )}
                <div>
                  <p className="text-xs text-dim">Release targets</p>
                  <ul className="mt-2 space-y-1">
                    {p.targets.map((t) => (
                      <li key={t} className="font-mono text-xs text-mute">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-line p-6">
              <p className="text-xs text-dim">Then</p>
              <div className="mt-3 flex items-center gap-3 font-mono text-[13px]">
                <span className="select-none text-ember" aria-hidden="true">
                  $
                </span>
                <code className="flex-1 text-ink">otel-test init &amp;&amp; otel-test test</code>
                <CopyButton value="otel-test init && otel-test test" label="Copy quick start commands" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
