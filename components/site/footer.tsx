import Link from 'next/link';
import { repo, site } from '@/lib/site';
import { Wordmark } from './logo';

const columns = [
  {
    title: 'Product',
    links: [
      { href: '/#features', label: 'Features' },
      { href: '/#install', label: 'Installation' },
      { href: '/docs/examples', label: 'Examples' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/quick-start', label: 'Quick start' },
      { href: '/docs/cli', label: 'CLI reference' },
      { href: '/docs/advanced/limitations', label: 'Known limitations' },
    ],
  },
  {
    title: 'Project',
    links: [
      { href: repo.url, label: 'GitHub repository' },
      { href: repo.releases, label: 'Releases' },
      { href: repo.license, label: `License (${site.license})` },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Wordmark />
          <p className="max-w-xs text-sm leading-relaxed text-mute">
            Integration tests for OpenTelemetry Collector configurations. Open source under{' '}
            {site.license}.
          </p>
          <a
            href={repo.release}
            className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 font-mono text-xs text-mute transition-colors hover:border-line-strong hover:text-ink"
          >
            <span className="size-1.5 rounded-full bg-ember" aria-hidden="true" />
            {site.binary} {site.version}
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-dim">{col.title}</h2>
            <ul className="space-y-2.5">
              {col.links.map((l) =>
                l.href.startsWith('http') ? (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-mute transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-mute transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-dim sm:flex-row sm:justify-between sm:px-8">
          <p>Tracelet is not affiliated with the OpenTelemetry project or the CNCF.</p>
          <p>
            Pinned to otelcol-contrib {site.collectorVersion}
          </p>
        </div>
      </div>
    </footer>
  );
}
